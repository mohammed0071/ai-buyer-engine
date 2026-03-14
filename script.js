/* ============================================
   The Heart Shaman â€” Scripts
   ============================================ */

(function () {
  'use strict';

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  function handleScroll() {
    const y = window.scrollY;
    if (y > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = y;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // initial check

  // --- Mobile nav toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (navLinks.classList.contains('active') &&
          !navLinks.contains(e.target) &&
          !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = navbar.offsetHeight + 16;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // --- Intersection Observer for animations ---
  var animElements = document.querySelectorAll('[data-aos]');

  if ('IntersectionObserver' in window && animElements.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    animElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything
    animElements.forEach(function (el) {
      el.classList.add('aos-animate');
    });
  }

})();

// --- Modal Functions ---
function openModal(modalId) {
  var modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// Close modal on outside click
window.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
    document.body.style.overflow = '';
  }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal').forEach(function(modal) {
      modal.style.display = 'none';
    });
    document.body.style.overflow = '';
  }
});
// Exit intent (desktop only)
let exitShown = false;

document.addEventListener('mouseout', function(e) {
  if (e.clientY < 5 && !exitShown && true) {
    document.getElementById('exitModal').classList.add('show');
    exitShown = true;
  }
});

// Scroll trigger (desktop only)
let scrollShown = false;

window.addEventListener('scroll', function() {
  if (!scrollShown && true) {
    var scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercent > 40) {
      document.getElementById('exitModal').classList.add('show');
      scrollShown = true;
    }
  }
});

// Scroll-triggered CTAs at different points (desktop only)
let scroll20Shown = false;
let scroll50Shown = false;

window.addEventListener('scroll', function() {
  if (true) {
    var scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    // At 20% - Early engagement CTA
    if (scrollPercent > 20 && !scroll20Shown) {
      document.getElementById('scrollCta').classList.add('show');
      scroll20Shown = true;
      setTimeout(function() {
        document.getElementById('scrollCta').classList.remove('show');
      }, 8000);
    }
    
    // At 50% - Mid-page CTA
    if (scrollPercent > 50 && !scroll50Shown) {
      document.getElementById('scrollCta').classList.add('show');
      scroll50Shown = true;
      setTimeout(function() {
        document.getElementById('scrollCta').classList.remove('show');
      }, 8000);
    }
  }
});

// Timed popup after 30 seconds
setTimeout(function() {
  if (true) {
    document.getElementById('timedModal').classList.add('show');
  }
}, 30000);
