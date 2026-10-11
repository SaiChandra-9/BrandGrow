(() => {
  const header = document.querySelector('.site-header');
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');
  const year = document.getElementById('year');
  const form = document.getElementById('inquiry-form');
  const serviceSelect = document.getElementById('service');
  const status = document.getElementById('form-status');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (year) year.textContent = new Date().getFullYear();

  const onScroll = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  function closeMenu() {
    if (!menuBtn || !nav) return;
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  }

  menuBtn?.addEventListener('click', () => {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!isOpen));
    menuBtn.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    nav?.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 800) closeMenu();
  }, { passive: true });

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));
  }

  document.querySelectorAll('[data-service]').forEach(button => {
    button.addEventListener('click', () => {
      if (serviceSelect) serviceSelect.value = button.dataset.service || '';
      document.querySelector('#contact')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
      window.setTimeout(() => document.querySelector('#name')?.focus({ preventScroll: true }), reduceMotion ? 0 : 450);
    });
  });

  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const business = String(data.get('business') || '').trim();
    const email = String(data.get('email') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const service = String(data.get('service') || '').trim();
    const message = String(data.get('message') || '').trim();
    const subject = encodeURIComponent('BrandGrow campaign enquiry — ' + business);
    const body = encodeURIComponent(
      'Hello BrandGrow,\n\nI would like to discuss a theatre advertising campaign.\n\n' +
      'Name: ' + name + '\nBusiness / brand: ' + business + '\nEmail: ' + email +
      '\nPhone: ' + (phone || 'Not provided') + '\nCampaign type: ' + service +
      '\n\nCampaign details:\n' + (message || 'Not provided') + '\n\nThank you.'
    );
    if (status) status.textContent = 'Your email app should open with the enquiry prepared. Review it and press Send to contact BrandGrow.';
    window.location.href = 'mailto:brandgrow9@gmail.com?subject=' + subject + '&body=' + body;
  });
})();