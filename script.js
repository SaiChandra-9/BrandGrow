const header=document.querySelector('.site-header');
const glow=document.querySelector('.cursor-glow');
const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('.nav');

window.addEventListener('scroll',()=>{
  if(header) header.style.boxShadow=window.scrollY>12?'0 8px 30px rgba(7,17,31,.06)':'none';
},{passive:true});

if(glow&&window.matchMedia('(pointer:fine)').matches){
  window.addEventListener('pointermove',e=>{
    glow.style.left=`${e.clientX}px`;
    glow.style.top=`${e.clientY}px`;
    glow.style.opacity='1';
  },{passive:true});
}

const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reducedMotion&&'IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}else{
  document.querySelectorAll('.reveal').forEach(el=>el.classList.add('is-visible'));
}

function closeMenu(){
  if(!nav||!menuBtn)return;
  nav.removeAttribute('style');
  menuBtn.setAttribute('aria-expanded','false');
  menuBtn.setAttribute('aria-label','Open menu');
}
menuBtn?.addEventListener('click',()=>{
  const open=menuBtn.getAttribute('aria-expanded')==='true';
  if(open){closeMenu();return;}
  nav.style.display='flex';
  nav.style.position='absolute';
  nav.style.top='68px';
  nav.style.left='12px';
  nav.style.right='12px';
  nav.style.padding='18px';
  nav.style.borderRadius='18px';
  nav.style.background='rgba(255,255,255,.98)';
  nav.style.boxShadow='0 20px 50px rgba(7,17,31,.12)';
  nav.style.flexDirection='column';
  nav.style.gap='16px';
  menuBtn.setAttribute('aria-expanded','true');
  menuBtn.setAttribute('aria-label','Close menu');
});
document.querySelectorAll('.nav a').forEach(link=>link.addEventListener('click',closeMenu));
window.addEventListener('resize',()=>{if(window.innerWidth>900)closeMenu();},{passive:true});

const year=document.getElementById('year');
if(year)year.textContent=new Date().getFullYear();
