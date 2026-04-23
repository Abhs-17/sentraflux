// Sidebar active link on scroll
(function () {
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const menuBtn = document.getElementById('menuBtn');
  const sideNav = document.getElementById('sideNav');
  const headerH = 56;

  // Debounce function for scroll performance
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = function () {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Highlight active nav link based on scroll position
  function onScroll() {
    let current = '';
    sections.forEach(function (sec) {
      const top = sec.getBoundingClientRect().top;
      if (top <= headerH + 16) {
        current = sec.id;
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === '#' + current
      );
    });
  }

  const debouncedScroll = debounce(onScroll, 50);
  window.addEventListener('scroll', debouncedScroll, { passive: true });
  onScroll(); // run once on load

  // Mobile menu toggle
  if (menuBtn && sideNav) {
    menuBtn.addEventListener('click', function () {
      const isOpen = sideNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close nav when a link is tapped on mobile
    sideNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        sideNav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', false);
      });
    });

    // Close nav when clicking outside
    document.addEventListener('click', function (e) {
      if (
        sideNav.classList.contains('open') &&
        !sideNav.contains(e.target) &&
        !menuBtn.contains(e.target)
      ) {
        sideNav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', false);
      }
    });
  }
})();
