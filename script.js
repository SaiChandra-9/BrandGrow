(() => {
 const header=document.querySelector('.site-header'),menuBtn=document.querySelector('.menu-btn'),nav=document.querySelector('.nav'),year=document.getElementById('year');
 if(year)year.textContent=new Date().getFullYear();
 const closeMenu=()=>{if(!menuBtn||!nav)return;menuBtn.setAttribute('aria-expanded','false');menuBtn.setAttribute('aria-label','Open menu');nav.classList.remove('is-open');document.body.classList.remove('menu-open')};
 menuBtn?.addEventListener('click',()=>{const open=menuBtn.getAttribute('aria-expanded')==='true';menuBtn.setAttribute('aria-expanded',String(!open));menuBtn.setAttribute('aria-label',open?'Open menu':'Close menu');nav?.classList.toggle('is-open',!open)});
 nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});window.addEventListener('resize',()=>{if(innerWidth>620)closeMenu()},{passive:true});
 const cards=document.getElementById('solution-cards');document.querySelectorAll('[data-scroll]').forEach(b=>b.addEventListener('click',()=>cards?.scrollBy({left:Number(b.dataset.scroll)*Math.max(240,cards.clientWidth*.72),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})));
 const headerScroll=()=>header?.classList.toggle('is-scrolled',window.scrollY>10);headerScroll();window.addEventListener('scroll',headerScroll,{passive:true});
})();