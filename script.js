const menu=[
['La Salade de Fruits','desserts','Sur demande'],['Filet de Ferke','plats','Sur demande'],['Fondant Au Chocolat','desserts','Sur demande'],["Sauce N'dole",'plats','Sur demande'],['Crevettes Sautées Aux Épices','plats','9 000 FCFA'],['Huîtres Chaudes','plats','Sur demande'],['Filet de Bœuf','plats','Sur demande'],['Jus d’Orange','boissons','Sur demande'],['Banane Chaud','desserts','Sur demande'],['Cocktail Kajazoma','cocktails','Sur demande'],['Bloody Mary','cocktails','Sur demande'],['Coconut Milk Fish','plats','Sur demande'],["Banane Plantain Sautée à L’Huile Rouge",'accomp','3 000 FCFA'],['Fondant Chocolat & Baobab','desserts','Sur demande'],['Brochettes de Poisson Et Miombos','plats','Sur demande'],['Cocktail Issa','cocktails','Sur demande'],['Cocktail Cécile','cocktails','Sur demande'],['Mojito','cocktails','Sur demande'],['Americano','cocktails','Sur demande'],['Grog','cocktails','Sur demande'],['Black Russian','cocktails','Sur demande'],['Daiquiri','cocktails','Sur demande'],['Gin Tonic','cocktails','Sur demande'],['Gin Fizz','cocktails','Sur demande']
];
const menuGrid=document.querySelector('#menuGrid');
function renderMenu(cat='all'){menuGrid.innerHTML=menu.filter(x=>cat==='all'||x[1]===cat).map(x=>`<article class="menu-card"><span class="tag">${x[1]}</span><h3>${x[0]}</h3><p>Préparation Kajazoma — détail et disponibilité à confirmer auprès du restaurant.</p><div class="menu-meta"><span></span><strong class="price">${x[2]}</strong></div></article>`).join('')}
renderMenu();
document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderMenu(b.dataset.cat)}));
const gallery=document.querySelector('#gallery');
const photos=[
['images/kajazoma-terrasse-piscine.webp','Terrasse et piscine'],
['images/kajazoma-entree.webp','Entrée du restaurant'],
['images/kajazoma-plat-brochettes.webp','Plat signature'],
['images/kajazoma-filet-boeuf.webp','Filet de bœuf'],
['images/kajazoma-dessert.webp','Dessert'],
['images/kajazoma-salle.webp','Salle intérieure'],
['images/kajazoma-piscine-nuit.webp','Piscine de nuit'],
['images/kajazoma-paillote.webp','Paillote'],
['images/kajazoma-patio.webp','Patio'],
['images/kajazoma-salon.webp','Salon']
];
gallery.innerHTML=photos.map((p,i)=>`<button type="button" aria-label="Ouvrir la photo ${i+1}" data-src="${p[0]}"><img loading="lazy" src="${p[0]}" alt="${p[1]}"></button>`).join('');
const modal=document.createElement('div');modal.className='modal';modal.innerHTML='<button class="close" aria-label="Fermer">×</button><img alt="">';document.body.appendChild(modal);
gallery.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;modal.querySelector('img').src=b.dataset.src;modal.querySelector('img').alt=b.querySelector('img').alt;modal.classList.add('open')});modal.addEventListener('click',e=>{if(e.target===modal||e.target.classList.contains('close'))modal.classList.remove('open')});
const hamburger=document.querySelector('.hamburger'),nav=document.querySelector('#nav');hamburger?.addEventListener('click',()=>{const open=nav.classList.toggle('open');hamburger.setAttribute('aria-expanded',open)});document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));document.querySelector('#year').textContent=new Date().getFullYear();
