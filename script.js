const menu = [
  // Salades
  ['Composée fumée','salades','9 000 FCFA','Œuf dur, tomate, concombre, chou croquant et sticks de mozzarella fumée croustillants'],
  ['Som Tam Gambas','salades','12 000 FCFA',''],
  ['Som Tam Nature','salades','8 500 FCFA',''],

  // Poke bowl
  ['Bol poké gambas (L)','poke','19 500 FCFA',''],
  ['Bol poké gambas (S)','poke','12 500 FCFA',''],
  ['Bol poké thon & sauce Teriyaki (L)','poke','17 000 FCFA',''],
  ['Bol poké thon & sauce Teriyaki (S)','poke','11 000 FCFA',''],

  // Soul food
  ["Mérou à l'étouffée",'soul','20 000 FCFA','Au lait de coco dans une feuille de banane'],
  ["N'dole mixte",'soul','18 500 FCFA','Au jarret de bœuf & gambas'],
  ["N'dole océane",'soul','18 500 FCFA','Mérou & gambas'],
  ['Poulet au lait de coco','soul','16 000 FCFA',''],
  ['Pépé soupe','soul','16 500 FCFA','Tripes et pieds de mouton - jarret de bœuf'],
  ['Sauce feuille de patate','soul','18 500 FCFA','Queue de bœuf - crabe - maquereau fumé - crevettes'],
  ['Soupe du pêcheur','soul','18 500 FCFA','Mérou - gambas - escargots'],

  // Tapas
  ['Fritto misto','tapas','12 000 FCFA','Soupions et crevettes'],
  ['Poulet Coréen','tapas','10 000 FCFA','Sauce aigre douce gingembre citronnelle'],
  ['Quesadillas mexicain','tapas','10 000 FCFA','Poulet et mozzarella'],
  ['Tortilla de blé','tapas','9 000 FCFA','Omelette, pleurotes, mozzarella'],
  ['Capitaine & magret fumé','tapas','12 000 FCFA','Pré-fou'],
  ['Croquettes croustillantes','tapas','10 000 FCFA','Purée fumée - effiloché de poulet braisé mozzarella'],

  // Comfort food / pasta
  ['Mac&cheese','comfort','16 000 FCFA','Cheddar | Emmental | Comté'],
  ['Tartiflette au fromage de chèvre','comfort','18 500 FCFA','Pommes de terre au vin blanc et crème chorizo de bœuf | salade'],
  ['Rigatoni aux gambas','pasta','16 000 FCFA','Bisque'],
  ['Rigatoni à la crème de truffe','pasta','16 000 FCFA',''],

  // Choukoyas
  ['Filet de bœuf (200g)','choukoyas','16 000 FCFA',''],
  ['Poulet (400g)','choukoyas','15 000 FCFA','30-minute attente'],
  ['Queue de bœuf (400g)','choukoyas','16 000 FCFA',''],
  ["Suyas d'escargots",'choukoyas','18 000 FCFA',''],

  // La mer
  ['Brochettes de mérou','mer','20 000 FCFA',"Aux zests d'agrumes et ail"],
  ['Filets de sole panés','mer','18 500 FCFA','Sauce tartare'],

  // La ferme
  ["Côtelettes d'agneau import (250g)",'ferme','22 500 FCFA',''],
  ['Filet de boeuf du Brésil (200g)','ferme','24 000 FCFA',''],
  ['Magret de canard (Bassam - 250g)','ferme','24 000 FCFA',''],

  // Suppléments - sauces
  ["Mayonnaise à l'ail",'sauces','500 FCFA',''],
  ["Sauce crème d'ail & pleurotes",'sauces','500 FCFA',''],
  ['Sauce poivre vert','sauces','500 FCFA',''],

  // Suppléments - garnitures
  ["Alloco à l'huile rouge ou normal",'garnitures','3 000 FCFA',''],
  ['Attiéké','garnitures','3 000 FCFA',''],
  ["Frites d'igname",'garnitures','3 000 FCFA',''],
  ['Frites de pommes de terre','garnitures','3 000 FCFA',''],
  ['Jardinière de légumes au pistou','garnitures','3 000 FCFA',''],
  ['Miyondo','garnitures','3 000 FCFA',''],
  ['Pommes de terre sautées','garnitures','3 000 FCFA',''],
  ['Purée de pommes de terre fumée et truffée','garnitures','5 000 FCFA','Additionnel 2 000'],
  ['Purée pommes de terre fumée','garnitures','3 000 FCFA',''],
  ['Riz blanc','garnitures','3 000 FCFA',''],

  // Desserts
  ['Café gourmand','desserts','6 000 FCFA',''],
  ['Coupe de glace trois boules','desserts','7 000 FCFA','Chantilly'],
  ['Fettuccine de crêpes','desserts','7 000 FCFA','Coulis fraise & chocolat | Glace vanille | Chantilly'],
  ['Fondant au chocolat','desserts','7 000 FCFA','Glace vanille'],
  ['Riz au lait crémeux à la vanille','desserts','7 000 FCFA','Glace vanille'],
  ['Salade de fruits de saison','desserts','5 000 FCFA',''],

  // Bières — éléments visibles
  ['Beaufort','bieres','3 000 FCFA',''],
  ['Castel','bieres','3 000 FCFA',''],
  ['Desperados','bieres','4 000 FCFA',''],
  ['Guinness','bieres','4 000 FCFA',''],
  ['Heineken','bieres','3 000 FCFA',''],

  // Vins rouges
  ['Antoine Sanzay la paterne','vin-rouge','29 000 FCFA',''],
  ["Barbera d'Asti Superiore DOCG",'vin-rouge','28 000 FCFA',''],
  ['Château Pontet Barrail','vin-rouge','28 000 FCFA','Médoc'],
  ['Château cheval noir','vin-rouge','22 000 FCFA',''],
  ['G. Meffre Laurus','vin-rouge','32 000 FCFA','Croze Hermitage'],
  ['J. Moreau & fils Pinot Noir','vin-rouge','30 000 FCFA',''],
  ['Pascal Jolivet','vin-rouge','29 000 FCFA','Attitude pinot noir'],

  // Vins blancs
  ['Chardonnay Ardèche','vin-blanc','22 000 FCFA',''],
  ['Gustave Lorentz','vin-blanc','30 000 FCFA','Riesling'],
  ['Gustave Lorentz','vin-blanc','28 000 FCFA','Pinot blanc'],
  ['Haut Reys','vin-blanc','26 000 FCFA','Grave'],
  ['J. Moreau & fils','vin-blanc','26 000 FCFA','Bourgogne Aligoté'],
  ['Pascal Jolivet','vin-blanc','26 000 FCFA','Attitude Sauvignon'],

  // Vins rosés
  ['Abbazia Moscato rosé','vin-rose','22 000 FCFA','Pétillant & sucré'],
  ['Bleu de mer','vin-rose','22 000 FCFA',"Pays d'OC"],
  ['Whispering angel','vin-rose','35 000 FCFA',''],

  // Tisanes & cafés
  ['Citronnelle du jardin','tisanes','1 500 FCFA',''],
  ['Décaféiné','tisanes','2 500 FCFA',''],
  ['Ristretto','tisanes','2 500 FCFA',''],
  ['Tisane Mùn Fraîcheur','tisanes','2 500 FCFA','Menthe poivrée, verveine, queues de cerises'],
  ['Tisane Mùn acidulée','tisanes','2 500 FCFA','Agrumes, citronnelle, bissap blanc'],
  ['Tisane Mùn gourmande','tisanes','2 500 FCFA','Rose, verveine, vétiver, citronnelle'],

  // Sodas
  ['Coca-cola','sodas','2 000 FCFA',''],
  ['Redbull','sodas','4 000 FCFA',''],
  ['Schweppes tonic','sodas','2 000 FCFA',''],

  // Liqueurs - alcools (éléments entièrement visibles)
  ['Ricard','liqueurs','5 000 FCFA','1 Awa – 50cl'],
  ['Téquila Olmeca blanc','liqueurs','5 000 FCFA',''],
  ['Téquila Olmeca gold','liqueurs','6 000 FCFA',''],
  ['Vodka Absolut','liqueurs','5 000 FCFA',''],
  ['Vodka Belvedere','liqueurs','6 000 FCFA',''],
  ['Vodka Grey Goose','liqueurs','9 000 FCFA',''],
  ['Whisky Chivas 12 ans','liqueurs','8 000 FCFA',''],
  ['Whisky Glenmorangie 12 ans','liqueurs','8 000 FCFA',''],
  ['Whisky Jack Daniel N°7','liqueurs','6 000 FCFA',''],
  ['Whisky Johnny Walker black','liqueurs','8 000 FCFA',''],
  ['Whisky Johnny Walker red','liqueurs','5 000 FCFA',''],

  // Champagne & pétillants
  ['Billecart-Salmon','champagne','80 000 FCFA','Brut réserve'],
  ['Billecart-Salmon','champagne','80 000 FCFA','Demi-sec'],
  ['Moët & Chandon','champagne','75 000 FCFA','Nectar demi-sec'],
  ['Moët & Chandon','champagne','70 000 FCFA','Impérial brut'],
  ['Roger Desivry','champagne','55 000 FCFA','Demi-sec'],
  ['Veuve Clicquot','champagne','80 000 FCFA','Brut'],

  // Cocktails
  ['Margarita séductrice','cocktails','8 000 FCFA','Téquila | campari | sirop passion | schweppes'],
  ['Mojito « l’original »','cocktails','8 000 FCFA',''],
  ['Ouragan de passion','cocktails','8 000 FCFA','Rhum blanc & ambré | jus orange & citron | sirop passion & grenadine'],
  ["Reflet d'été",'cocktails','7 000 FCFA','Gin | jus ananas | touche de bissap'],
  ['Vermouth compressor','cocktails','8 000 FCFA','Vodka | Martini blanc | Litchi'],

  // Cocktails chauds
  ['Grog','cocktails-chauds','8 000 FCFA','Rhum planteur | gingembre | citronnelle | citron | curcuma | cannelle | Miel'],
  ['Vin chaud','cocktails-chauds','9 000 FCFA',"Vin rouge | cointreau | poudre cannelle & vanille | jus d'orange | Miel"],

  // Cocktails granités
  ['Desperados givrée','granites','6 000 FCFA','Bière desperados | sirop passion | jus citron'],
  ['Lagon bleu','granites','7 000 FCFA','Vodka | curaçao | liqueur litchi | jus ananas'],
  ['Passion fraise','granites','10 000 FCFA','Rhum blanc | Baileys | fraise | glace'],
  ['Piña colada','granites','10 000 FCFA','Rhum | jus ananas | glace vanille | lait de coco']
];

const categoryLabels = {
  salades:'Salades',
  poke:'Poke bowl',
  soul:'Soul food',
  tapas:'Tapas',
  comfort:'Comfort food',
  pasta:'Pasta',
  choukoyas:'Les Choukouyas',
  mer:'La mer',
  ferme:'La ferme',
  sauces:'Suppléments · Sauces',
  garnitures:'Suppléments · Garnitures',
  desserts:'Desserts',
  bieres:'Bières',
  'vin-rouge':'Vin rouge',
  'vin-blanc':'Vin blanc',
  'vin-rose':'Vin rosé',
  tisanes:'Tisane & cafés',
  sodas:'Sodas',
  liqueurs:'Liqueurs · alcools',
  champagne:'Champagne & pétillants',
  cocktails:'Cocktails',
  'cocktails-chauds':'Cocktails chauds',
  granites:'Cocktails granités'
};

const groups = {
  food:['salades','poke','soul','tapas','comfort','pasta','choukoyas','mer','ferme'],
  sides:['sauces','garnitures'],
  drinks:['bieres','vin-rouge','vin-blanc','vin-rose','sodas','liqueurs','champagne','tisanes'],
  cocktails:['cocktails','cocktails-chauds','granites'],
  desserts:['desserts']
};

const menuGrid = document.querySelector('#menuGrid');

function renderMenu(group='all') {
  const visible = menu.filter(item => group === 'all' || (groups[group] || []).includes(item[1]));
  menuGrid.innerHTML = visible.map(([name,cat,price,description]) => `
    <article class="menu-card">
      <span class="tag">${categoryLabels[cat]}</span>
      <h3>${name}</h3>
      ${description ? `<p>${description}</p>` : ''}
      <div class="menu-meta"><span></span><strong class="price">${price}</strong></div>
    </article>
  `).join('');
}

renderMenu();

document.querySelectorAll('.tab').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    renderMenu(button.dataset.cat);
  });
});

const gallery=document.querySelector('#gallery');
const photos=[
  ['images/kajazoma-terrasse-piscine.webp','Terrasse et piscine du Kajazoma à Abidjan'],
  ['images/kajazoma-entree.webp','Entrée du restaurant Kajazoma à Deux-Plateaux'],
  ['images/kajazoma-plat-brochettes.webp','Brochettes servies au restaurant Kajazoma'],
  ['images/kajazoma-filet-boeuf.webp','Filet de bœuf servi au Kajazoma'],
  ['images/kajazoma-dessert.webp','Dessert servi au restaurant Kajazoma'],
  ['images/kajazoma-salle.webp','Salle intérieure du Kajazoma à Abidjan'],
  ['images/kajazoma-piscine-nuit.webp','Piscine du Kajazoma en soirée'],
  ['images/kajazoma-paillote.webp','Paillote et espace extérieur du Kajazoma'],
  ['images/kajazoma-patio.webp','Patio du restaurant Kajazoma'],
  ['images/kajazoma-salon.webp','Salon du Kajazoma à Abidjan']
];
gallery.innerHTML=photos.map((p,i)=>`<button type="button" aria-label="Ouvrir la photo ${i+1}" data-src="${p[0]}"><img loading="lazy" src="${p[0]}" alt="${p[1]}"></button>`).join('');

const modal=document.createElement('div');
modal.className='modal';
modal.innerHTML='<button class="close" aria-label="Fermer">×</button><img alt="">';
document.body.appendChild(modal);
gallery.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;modal.querySelector('img').src=b.dataset.src;modal.querySelector('img').alt=b.querySelector('img').alt;modal.classList.add('open')});
modal.addEventListener('click',e=>{if(e.target===modal||e.target.classList.contains('close'))modal.classList.remove('open')});

const hamburger=document.querySelector('.hamburger'),nav=document.querySelector('#nav');
hamburger?.addEventListener('click',()=>{const open=nav.classList.toggle('open');hamburger.setAttribute('aria-expanded',open)});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.querySelector('#year').textContent=new Date().getFullYear();


// ─── GA4 engagement tracking ────────────────────────────────────────────────
const track = (name, params = {}) => {
  if (typeof window.kajazomaTrack === 'function') window.kajazomaTrack(name, params);
};

document.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link) return;

  const href = link.getAttribute('href') || '';
  let placement = 'other';

  if (link.closest('.hero')) placement = 'hero';
  else if (link.closest('#menu')) placement = 'menu';
  else if (link.closest('.reserve-cta')) placement = 'reservation_cta';
  else if (link.closest('#contact')) placement = 'contact';
  else if (link.closest('.footer')) placement = 'footer';
  else if (link.closest('.header')) placement = 'header';

  if (href.includes('wa.me')) {
    track('whatsapp_click', { placement });
  } else if (href.startsWith('tel:')) {
    track('phone_click', { placement });
  } else if (href.includes('reservation.html')) {
    track('reservation_start', { placement });
  } else if (href.includes('maps.app.goo.gl')) {
    track('directions_click', { placement });
  }
});

const menuSection = document.querySelector('#menu');
if (menuSection && 'IntersectionObserver' in window) {
  let menuTracked = false;
  const menuObserver = new IntersectionObserver((entries) => {
    if (menuTracked) return;
    if (entries.some(entry => entry.isIntersecting)) {
      menuTracked = true;
      track('menu_view', { section: 'menu' });
      menuObserver.disconnect();
    }
  }, { threshold: 0.2 });
  menuObserver.observe(menuSection);
}
