const procedures=[['Harmonização facial','Planejamento para valorizar o equilíbrio e as proporções do rosto.','✧'],['Preenchimento labial','Valorização do contorno e volume dos lábios com naturalidade.','◡'],['Toxina botulínica','Cuidado com linhas de expressão a partir de uma avaliação individual.','⌁'],['Bioestimuladores','Uma possibilidade de cuidado para a qualidade e firmeza da pele.','✳'],['Contorno facial','Atenção às linhas e proporções que compõem sua identidade.','◇'],['Tratamentos corporais','Protocolos definidos conforme as necessidades de cada pessoa.','≈'],['Rejuvenescimento facial','Um olhar cuidadoso para as mudanças da pele ao longo do tempo.','☼'],['Protocolos para pele','Cuidados direcionados à textura, hidratação e aspecto da pele.','✦']];
const message='Olá! Gostaria de saber mais sobre a avaliação e os procedimentos estéticos.';
const clinicWhatsApp='';
function waLink(text){return clinicWhatsApp?'https://wa.me/'+clinicWhatsApp+'?text='+encodeURIComponent(text):'https://api.whatsapp.com/send?text='+encodeURIComponent(text)}
document.getElementById('procedure-grid').innerHTML=procedures.map(([name,description,icon],i)=>`<article class="procedure-card reveal" style="transition-delay:${i%4*60}ms"><div class="procedure-icon" aria-hidden="true">${icon}</div><h3>${name}</h3><p>${description}</p><a href="${waLink('Olá! Gostaria de saber mais sobre '+name.toLowerCase()+'.')}" target="_blank" rel="noopener noreferrer">Conversar sobre o cuidado</a></article>`).join('');
document.querySelectorAll('[data-wa]').forEach(a=>{a.href=waLink(message);a.target='_blank';a.rel='noopener noreferrer'});
const toggle=document.querySelector('.menu-toggle'),menu=document.getElementById('menu');function closeMenu(){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');toggle.textContent='☰'}toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');toggle.textContent=open?'×':'☰'});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();toggle.focus()}});document.addEventListener('click',e=>{if(!document.querySelector('header').contains(e.target))closeMenu()});
addEventListener('scroll',()=>document.getElementById('header').classList.toggle('scrolled',scrollY>15),{passive:true});
const motionAllowed=!matchMedia('(prefers-reduced-motion: reduce)').matches;
if('IntersectionObserver' in window && motionAllowed){
 document.documentElement.classList.add('js-motion');
 const gallery=document.querySelector('.gallery');gallery.classList.remove('reveal');
 gallery.querySelectorAll('figure').forEach((el,i)=>{el.classList.add('reveal');el.style.setProperty('--reveal-delay',i*100+'ms')});
 document.querySelectorAll('.difference-grid article').forEach((el,i)=>el.style.setProperty('--reveal-delay',(i%3)*100+'ms'));
 document.querySelectorAll('.hero-copy > *').forEach((el,i)=>{el.classList.add('hero-step');el.style.setProperty('--step-delay',i*130+'ms')});
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});
 document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
document.querySelectorAll('details').forEach(detail=>detail.addEventListener('toggle',()=>{if(detail.open)document.querySelectorAll('details').forEach(other=>{if(other!==detail)other.open=false})}));document.getElementById('year').textContent=new Date().getFullYear();

// Animate the native accordion while retaining its keyboard behavior.
if(motionAllowed && typeof Element.prototype.animate==='function'){
 document.querySelectorAll('details').forEach(detail=>{
  const summary=detail.querySelector('summary');let running=null;
  summary.addEventListener('click',event=>{
   event.preventDefault();if(running)return;
   const expanding=!detail.open;const before=detail.getBoundingClientRect().height;
   if(expanding)detail.open=true;
   const after=expanding?detail.getBoundingClientRect().height:summary.getBoundingClientRect().height;
   detail.style.overflow='hidden';
   running=detail.animate([{height:before+'px'},{height:after+'px'}],{duration:320,easing:'cubic-bezier(.22,1,.36,1)'});
   running.onfinish=()=>{if(!expanding)detail.open=false;detail.style.overflow='';running=null;};
  });
 });
}
