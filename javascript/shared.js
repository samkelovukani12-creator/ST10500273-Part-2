/* Mhlanga Holdings — shared.js */

// ── Hamburger Menu ──
(function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.submenu-toggle').forEach(toggle => {
    toggle.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const submenu = toggle.nextElementSibling;
        submenu.classList.toggle('open');
      }
    });
  });

  // Close nav on outside click
  document.addEventListener('click', e => {
    if (!e.target.closest('.navbar')) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
})();

// ── Slideshow ──
(function () {
  const slides = document.querySelectorAll('.mySlides');
  const dots   = document.querySelectorAll('.dot');
  if (!slides.length) return;

  let idx = 0;
  let timer;

  function showSlide(n) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    idx = (n + slides.length) % slides.length;

    const slide = slides[idx];
    // Force animation to re-trigger by removing and re-adding the fade class
    slide.classList.remove('fade');
    void slide.offsetWidth; // reflow flush
    slide.classList.add('active', 'fade');

    if (dots[idx]) dots[idx].classList.add('active');
  }

  function next() { showSlide(idx + 1); }
  function prev() { showSlide(idx - 1); }

  function startAuto() { timer = setInterval(next, 4500); }
  function resetAuto()  { clearInterval(timer); startAuto(); }

  // Expose for inline onclick
  window.currentSlide = n => { showSlide(n - 1); resetAuto(); };

  document.querySelectorAll('.slide-next').forEach(b => b.addEventListener('click', () => { next(); resetAuto(); }));
  document.querySelectorAll('.slide-prev').forEach(b => b.addEventListener('click', () => { prev(); resetAuto(); }));

  showSlide(0);
  startAuto();
})();
