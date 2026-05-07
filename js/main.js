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
        ? (window.innerWidth > 768 ? '14px 60px' : '12px 24px')
        : (window.innerWidth > 768 ? '20px 60px' : '16px 24px');
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

  /* ── Inquiry form — submits to Netlify Forms ── */
  const inquiryForm = document.querySelector('.inquiry-form');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', e => {
      e.preventDefault();
      const card = inquiryForm.closest('.form-card');
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(inquiryForm)).toString(),
      })
      .then(() => {
        inquiryForm.style.display = 'none';
        if (card) {
          const success = card.querySelector('.form-success');
          if (success) success.style.display = 'block';
        }
      })
      .catch(() => {
        alert('Something went wrong — please email us directly at solscaperetreats@gmail.com');
      });
    });
  }

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
