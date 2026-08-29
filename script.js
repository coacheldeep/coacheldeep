/* ---------- lightbox (certificates only) ---------- */
function openLightbox(src) {
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox').classList.add('active');
  document.body.classList.add('no-scroll');
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.classList.remove('no-scroll');
}
document.addEventListener('DOMContentLoaded', function () {
  var lb = document.getElementById('lightbox');
  if (lb) {
    lb.addEventListener('click', function (e) {
      if (e.target === this) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });
});

/* ---------- mobile nav ---------- */
function toggleMobileNav() {
  var mnav = document.getElementById('mnav');
  var burger = document.querySelector('.burger');
  var isOpen = mnav.classList.toggle('active');
  document.body.classList.toggle('no-scroll', isOpen);
  if (burger) burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

/* ---------- scroll reveal animation ---------- */
document.addEventListener('DOMContentLoaded', function () {
  var revealEls = document.querySelectorAll('.reveal, .client-card, .cert-card, .program, .price-card, .stat');

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(function (el, i) {
    el.style.setProperty('--reveal-delay', (i % 6) * 70 + 'ms');
    observer.observe(el);
  });
});

/* ---------- graceful fallback for missing client photos ---------- */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.client-photo img').forEach(function (img) {
    img.addEventListener('error', function () {
      this.closest('.client-photo').classList.add('img-missing');
    }, { once: true });
  });
});