-- Kajazoma table floor management v1
create table if not exists public.restaurant_tables (
  id uuid primary key default gen_random_uuid(),
  table_number text not null,
  capacity integer not null,
  zone text not null,
  status text not null default 'libre',
  active boolean not null default true,
  position_x numeric,
  position_y numeric,
  shape text not null default 'square',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint restaurant_tables_table_number_key unique (table_number),
  constraint restaurant_tables_capacity_check check (capacity > 0 and capacity <= 50),
  constraint restaurant_tables_status_check check (status in ('libre','reservee','arrivee','en_service','a_liberer')),
  constraint restaurant_tables_shape_check check (shape in ('square','round','rectangle'))
);

create table if not exists public.reservation_table_assignments (
  id uuid primary key default gen_random_uuid(),
  reservation_id uuid not null references public.reservations(id) on delete restrict,
  table_id uuid not null references public.restaurant_tables(id) on delete restrict,
  assigned_by uuid not null references auth.users(id) on delete restrict,
  assigned_at timestamptz not null default now(),
  released_at timestamptz,
  released_by uuid references auth.users(id) on delete restrict,
  release_reason text,
  created_at timestamptz not null default now(),
  constraint reservation_table_assignments_release_check check (
    (released_at is null and released_by is null)
    or (released_at is not null and released_by is not null)
  ),
  constraint reservation_table_assignments_release_reason_check check (
    release_reason is null or char_length(btrim(release_reason)) between 2 and 2000
  )
);

create unique index if not exists one_active_assignment_per_reservation
on public.reservation_table_assignments (reservation_id) where released_at is null;

create unique index if not exists one_active_assignment_per_table
on public.reservation_table_assignments (table_id) where released_at is null;

create index if not exists restaurant_tables_status_idx on public.restaurant_tables (status);
create index if not exists restaurant_tables_active_idx on public.restaurant_tables (active);
create index if not exists restaurant_tables_zone_idx on public.restaurant_tables (zone);
create index if not exists reservation_table_assignments_reservation_idx on public.reservation_table_assignments (reservation_id);
create index if not exists reservation_table_assignments_table_idx on public.reservation_table_assignments (table_id);
create index if not exists reservation_table_assignments_assigned_at_idx on public.reservation_table_assignments (assigned_at);

create table if not exists public.table_status_history (
  id uuid primary key default gen_random_uuid(),
  table_id uuid not null references public.restaurant_tables(id) on delete restrict,
  reservation_id uuid references public.reservations(id) on delete set null,
  old_status text,
  new_status text not null,
  changed_by uuid not null references auth.users(id) on delete restrict,
  changed_by_role private.staff_role not null,
  reason text,
  metadata jsonb,
  created_at timestamptz not null default now(),
  constraint table_status_history_old_status_check check (
    old_status is null or old_status in ('libre','reservee','arrivee','en_service','a_liberer')
  ),
  constraint table_status_history_new_status_check check (
    new_status in ('libre','reservee','arrivee','en_service','a_liberer')
  ),
  constraint table_status_history_reason_check check (
    reason is null or char_length(btrim(reason)) between 2 and 2000
  )
);

create index if not exists table_status_history_table_idx on public.table_status_history (table_id, created_at desc);
create index if not exists table_status_history_reservation_idx on public.table_status_history (reservation_id, created_at desc);
create index if not exists table_status_history_created_at_idx on public.table_status_history (created_at desc);

create or replace function private.can_transition_table(p_old text, p_new text)
returns boolean language sql immutable set search_path = ''
as $$
  select (p_old = 'libre' and p_new = 'reservee')
      or (p_old = 'reservee' and p_new in ('libre','arrivee'))
      or (p_old = 'arrivee' and p_new = 'en_service')
      or (p_old = 'en_service' and p_new = 'a_liberer')
      or (p_old = 'a_liberer' and p_new = 'libre');
$$;

create or replace function private.enforce_table_status_transition()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  if new.status = old.status then return new; end if;
  if coalesce(current_setting('kajazoma.table_operation', true), '') <> 'on' then
    raise exception 'TABLE_STATUS_TRANSITION_NOT_ALLOWED';
  end if;
  if not (select private.can_transition_table(old.status, new.status)) then
    raise exception 'INVALID_TABLE_STATUS_TRANSITION'
      using detail = format('Transition %s -> %s is not allowed.', old.status, new.status);
  end if;
  return new;
end;
$$;

drop trigger if exists trg_enforce_table_status_transition on public.restaurant_tables;
create trigger trg_enforce_table_status_transition
before update of status on public.restaurant_tables
for each row execute function private.enforce_table_status_transition();

create or replace function private.record_table_status_change()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare
  v_reservation_id uuid;
  v_role private.staff_role;
begin
  if new.status = old.status then return new; end if;
  if coalesce(current_setting('kajazoma.skip_table_history', true), '') = 'on' then return new; end if;

  select a.reservation_id into v_reservation_id
  from public.reservation_table_assignments a
  where a.table_id = new.id and a.released_at is null
  order by a.assigned_at desc limit 1;

  v_role := private.current_staff_role();

  insert into public.table_status_history (
    table_id, reservation_id, old_status, new_status, changed_by, changed_by_role, metadata
  ) values (
    new.id, v_reservation_id, old.status, new.status, auth.uid(), v_role,
    jsonb_build_object('source', 'table_operation')
  );
  return new;
end;
$$;

drop trigger if exists trg_record_table_status_change on public.restaurant_tables;
create trigger trg_record_table_status_change
after update of status on public.restaurant_tables
for each row execute function private.record_table_status_change();

create or replace function private.touch_restaurant_table_updated_at()
returns trigger language plpgsql security invoker set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_touch_restaurant_table_updated_at on public.restaurant_tables;
create trigger trg_touch_restaurant_table_updated_at
before update on public.restaurant_tables
for each row execute function private.touch_restaurant_table_updated_at();

create or replace function public.assign_reservation_table(p_reservation_id uuid, p_table_id uuid)
returns public.reservation_table_assignments
language plpgsql security definer set search_path = ''
as $$
declare
  v_role private.staff_role;
  v_reservation public.reservations%rowtype;
  v_table public.restaurant_tables%rowtype;
  v_assignment public.reservation_table_assignments%rowtype;
  v_target_status text;
begin
  v_role := private.current_staff_role();
  if v_role is null or v_role not in ('reception','service','direction') then raise exception 'STAFF_ACCESS_REQUIRED'; end if;

  select * into v_reservation from public.reservations where id = p_reservation_id for update;
  if not found then raise exception 'RESERVATION_NOT_FOUND'; end if;
  if v_reservation.status not in ('pending','confirmed','arrived') then raise exception 'RESERVATION_STATUS_NOT_ASSIGNABLE'; end if;

  if exists (select 1 from public.reservation_table_assignments where reservation_id = p_reservation_id and released_at is null) then
    raise exception 'RESERVATION_ALREADY_ASSIGNED';
  end if;

  select * into v_table from public.restaurant_tables where id = p_table_id and active = true for update;
  if not found then raise exception 'TABLE_NOT_FOUND_OR_INACTIVE'; end if;
  if v_table.status <> 'libre' then raise exception 'TABLE_NOT_AVAILABLE'; end if;
  if v_reservation.party_size > v_table.capacity then raise exception 'TABLE_CAPACITY_TOO_SMALL'; end if;

  v_target_status := case when v_reservation.status = 'arrived' then 'arrivee' else 'reservee' end;
  perform set_config('kajazoma.table_operation', 'on', true);

  insert into public.reservation_table_assignments (reservation_id, table_id, assigned_by)
  values (p_reservation_id, p_table_id, auth.uid()) returning * into v_assignment;

  update public.restaurant_tables set status = v_target_status where id = p_table_id;
  return v_assignment;
end;
$$;

create or replace function public.change_reservation_table(p_reservation_id uuid, p_new_table_id uuid, p_reason text default null)
returns public.reservation_table_assignments
language plpgsql security definer set search_path = ''
as $$
declare
  v_role private.staff_role;
  v_reservation public.reservations%rowtype;
  v_current public.reservation_table_assignments%rowtype;
  v_old_table public.restaurant_tables%rowtype;
  v_new_table public.restaurant_tables%rowtype;
  v_assignment public.reservation_table_assignments%rowtype;
  v_target_status text;
begin
  v_role := private.current_staff_role();
  if v_role is null or v_role not in ('reception','service','direction') then raise exception 'STAFF_ACCESS_REQUIRED'; end if;
  if p_reason is not null and char_length(btrim(p_reason)) > 2000 then raise exception 'REASON_TOO_LONG'; end if;

  select * into v_reservation from public.reservations where id = p_reservation_id for update;
  if not found then raise exception 'RESERVATION_NOT_FOUND'; end if;

  select * into v_current from public.reservation_table_assignments
  where reservation_id = p_reservation_id and released_at is null for update;
  if not found then raise exception 'ACTIVE_ASSIGNMENT_NOT_FOUND'; end if;
  if v_current.table_id = p_new_table_id then raise exception 'SAME_TABLE'; end if;

  select * into v_old_table from public.restaurant_tables where id = v_current.table_id for update;
  select * into v_new_table from public.restaurant_tables where id = p_new_table_id and active = true for update;
  if not found then raise exception 'NEW_TABLE_NOT_FOUND_OR_INACTIVE'; end if;
  if v_new_table.status <> 'libre' then raise exception 'NEW_TABLE_NOT_AVAILABLE'; end if;
  if v_reservation.party_size > v_new_table.capacity then raise exception 'TABLE_CAPACITY_TOO_SMALL'; end if;

  v_target_status := case when v_reservation.status = 'arrived' then 'arrivee' else 'reservee' end;
  perform set_config('kajazoma.table_operation', 'on', true);

  update public.reservation_table_assignments
  set released_at = now(), released_by = auth.uid(),
      release_reason = coalesce(nullif(btrim(p_reason), ''), 'Changement de table')
  where id = v_current.id;

  update public.restaurant_tables set status = 'libre' where id = v_old_table.id;

  insert into public.reservation_table_assignments (reservation_id, table_id, assigned_by)
  values (p_reservation_id, p_new_table_id, auth.uid()) returning * into v_assignment;

  update public.restaurant_tables set status = v_target_status where id = v_new_table.id;
  return v_assignment;
end;
$$;

create or replace function public.start_table_service(p_table_id uuid)
returns public.restaurant_tables
language plpgsql security definer set search_path = ''
as $$
declare
  v_role private.staff_role;
  v_table public.restaurant_tables%rowtype;
begin
  v_role := private.current_staff_role();
  if v_role is null or v_role not in ('service','direction') then raise exception 'ROLE_NOT_ALLOWED'; end if;
  select * into v_table from public.restaurant_tables where id = p_table_id for update;
  if not found then raise exception 'TABLE_NOT_FOUND'; end if;
  if v_table.status <> 'arrivee' then raise exception 'TABLE_NOT_READY_FOR_SERVICE'; end if;
  perform set_config('kajazoma.table_operation', 'on', true);
  update public.restaurant_tables set status = 'en_service' where id = p_table_id returning * into v_table;
  return v_table;
end;
$$;

create or replace function public.finish_table_service(p_table_id uuid)
returns public.restaurant_tables
language plpgsql security definer set search_path = ''
as $$
declare
  v_role private.staff_role;
  v_table public.restaurant_tables%rowtype;
begin
  v_role := private.current_staff_role();
  if v_role is null or v_role not in ('service','direction') then raise exception 'ROLE_NOT_ALLOWED'; end if;
  select * into v_table from public.restaurant_tables where id = p_table_id for update;
  if not found then raise exception 'TABLE_NOT_FOUND'; end if;
  if v_table.status <> 'en_service' then raise exception 'TABLE_NOT_IN_SERVICE'; end if;
  perform set_config('kajazoma.table_operation', 'on', true);
  update public.restaurant_tables set status = 'a_liberer' where id = p_table_id returning * into v_table;
  return v_table;
end;
$$;

create or replace function public.mark_table_ready(p_table_id uuid)
returns public.restaurant_tables
language plpgsql security definer set search_path = ''
as $$
declare
  v_role private.staff_role;
  v_table public.restaurant_tables%rowtype;
begin
  v_role := private.current_staff_role();
  if v_role is null or v_role not in ('service','direction') then raise exception 'ROLE_NOT_ALLOWED'; end if;
  select * into v_table from public.restaurant_tables where id = p_table_id for update;
  if not found then raise exception 'TABLE_NOT_FOUND'; end if;
  if v_table.status <> 'a_liberer' then raise exception 'TABLE_NOT_READY_TO_RELEASE'; end if;
  perform set_config('kajazoma.table_operation', 'on', true);
  update public.restaurant_tables set status = 'libre' where id = p_table_id returning * into v_table;
  update public.reservation_table_assignments
  set released_at = coalesce(released_at, now()),
      released_by = coalesce(released_by, auth.uid()),
      release_reason = coalesce(release_reason, 'Table libérée')
  where table_id = p_table_id and released_at is null;
  return v_table;
end;
$$;

alter table public.restaurant_tables enable row level security;
alter table public.reservation_table_assignments enable row level security;
alter table public.table_status_history enable row level security;

revoke all on table public.restaurant_tables from anon, authenticated;
revoke all on table public.reservation_table_assignments from anon, authenticated;
revoke all on table public.table_status_history from anon, authenticated;

grant select on table public.restaurant_tables to authenticated;
grant select on table public.reservation_table_assignments to authenticated;
grant select on table public.table_status_history to authenticated;

drop policy if exists "staff read restaurant tables" on public.restaurant_tables;
create policy "staff read restaurant tables" on public.restaurant_tables for select to authenticated
using ((select private.is_staff()));

drop policy if exists "staff read reservation table assignments" on public.reservation_table_assignments;
create policy "staff read reservation table assignments" on public.reservation_table_assignments for select to authenticated
using ((select private.is_staff()));

drop policy if exists "staff read table status history" on public.table_status_history;
create policy "staff read table status history" on public.table_status_history for select to authenticated
using ((select private.is_staff()));

revoke execute on function public.assign_reservation_table(uuid, uuid) from public, anon;
revoke execute on function public.change_reservation_table(uuid, uuid, text) from public, anon;
revoke execute on function public.start_table_service(uuid) from public, anon;
revoke execute on function public.finish_table_service(uuid) from public, anon;
revoke execute on function public.mark_table_ready(uuid) from public, anon;

grant execute on function public.assign_reservation_table(uuid, uuid) to authenticated;
grant execute on function public.change_reservation_table(uuid, uuid, text) to authenticated;
grant execute on function public.start_table_service(uuid) to authenticated;
grant execute on function public.finish_table_service(uuid) to authenticated;
grant execute on function public.mark_table_ready(uuid) to authenticated;
