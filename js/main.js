/* SolScape Retreats — Shared JS */

(function () {
  /* ── Mobile menu ── */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Sticky nav shrink ── */
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.padding = window.scrollY > 60
        ? (window.innerWidth > 768 ? '6px 60px' : '6px 24px')
        : (window.innerWidth > 768 ? '8px 60px' : '8px 24px');
    }, { passive: true });
  }

  /* ── Testimonial carousel ── */
  const track = document.querySelector('.testimonial-track');
  const dots = document.querySelectorAll('.carousel-dot');
  let current = 0;

  function goTo(index) {
    current = index;
    if (track) track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  if (track && track.children.length > 1) {
    setInterval(() => goTo((current + 1) % track.children.length), 5500);
  }

  /* ── Newsletter form ── */
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input || !input.value) return;
      const success = form.closest('section, .newsletter')?.querySelector('.newsletter-success');
      form.style.display = 'none';
      const fine = form.closest('section, .newsletter')?.querySelector('.newsletter-fine');
      if (fine) fine.style.display = 'none';
      if (success) success.style.display = 'block';
    });
  });

  /* ── Inquiry forms — submit to Netlify silently, show success message ── */
  document.querySelectorAll('.inquiry-form').forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const data = new FormData(form);
      try {
        await fetch('/', { method: 'POST', body: data });
      } catch (_) { /* network error — still show success */ }
      const card = form.closest('.form-card');
      form.style.display = 'none';
      if (card) {
        const success = card.querySelector('.form-success');
        if (success) success.style.display = 'block';
      }
    });
  });

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
