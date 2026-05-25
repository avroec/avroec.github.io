/* === Main JavaScript for MD Sumon Mia Portfolio === */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initServiceDropdown();
  initScrollAnimations();
  initCounterAnimation();
  initFAQ();
  initContactForm();
  initFreeQuoteForm();
  initMarquee();
  initSmoothScroll();
  initSkillBars();
  initScrollIndicator();
  initThemeToggle();
});

/* === Navbar Scroll Effect === */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  });
}

/* === Mobile Menu === */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  toggle?.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('active');
  });
  // Close on link click
  links?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('active');
    });
  });
}

/* === Service Dropdown === */
function initServiceDropdown() {
  const dropdown = document.querySelector('.nav-dropdown');
  const toggle = dropdown?.querySelector('.nav-dropdown-toggle');
  toggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
  document.addEventListener('click', (e) => {
    if (!dropdown?.contains(e.target)) {
      dropdown?.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });
}

/* === Scroll Animations (Intersection Observer) === */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.animate').forEach(el => observer.observe(el));
}

/* === Counter Animation === */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.hero-stat h3, .counter');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        animateCounter(el);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const text = el.textContent;
  const match = text.match(/(\d+)([+%]?)/);
  if (!match) return;
  const target = parseInt(match[1]);
  const suffix = match[2] || '';
  const prefix = text.startsWith('$') ? '$' : '';
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out
    const current = Math.floor(eased * target);
    el.textContent = prefix + current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* === FAQ Accordion === */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasActive = item.classList.contains('active');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      // Open clicked if it wasn't active
      if (!wasActive) item.classList.add('active');
    });
  });
}

/* === Generic Form Handler === */
function initGenericForm(formId, nameId, emailId, msgId, successId, errorId, btnText) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const successEl = document.getElementById(successId);
    const errorEl = document.getElementById(errorId);
    const formInner = form.closest('.form-inner, .free-quote-form-inner');
    const name = document.getElementById(nameId);
    const email = document.getElementById(emailId);
    const message = document.getElementById(msgId);

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      if (errorEl) {
        errorEl.querySelector('p').textContent = '⚠️ Please fill in all required fields and try again.';
        errorEl.classList.add('show');
      }
      return;
    }

    if (errorEl) errorEl.classList.remove('show');

    btn.disabled = true;
    btn.textContent = 'Sending...';

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = btnText;
      if (formInner) formInner.style.display = 'none';
      if (successEl) successEl.classList.add('show');
    }, 1500);
  });
}

/* === Contact Form === */
function initContactForm() {
  initGenericForm('contactForm', 'name', 'email', 'message', 'formSuccess', 'formError', 'Send Message');
}

/* === Free Quote Form === */
function initFreeQuoteForm() {
  initGenericForm('freeQuoteForm', 'fq-name', 'fq-email', 'fq-message', 'freeQuoteSuccess', 'freeQuoteError', 'Send Request');
}

/* === Scroll Indicator Hide on Scroll === */
function initScrollIndicator() {
  const indicator = document.querySelector('.scroll-indicator');
  if (!indicator) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      indicator.style.opacity = '0';
      indicator.style.transition = 'opacity 0.3s ease';
    } else {
      indicator.style.opacity = '1';
    }
  });
}

/* === Smooth Scroll for Nav Links === */
function initSmoothScroll() {
  const NAV_HEIGHT = 72;

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const targetTop = target.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = targetTop - NAV_HEIGHT - 16;

      // Update URL hash so users can share section links
      history.pushState(null, null, targetId);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/* === Marquee auto-clone for seamless loop === */
function initMarquee() {
  const wrap = document.querySelector('.marquee-wrap');
  if (!wrap) return;

  const track = wrap.querySelector('.marquee-track');
  if (!track) return;

  // Auto-clone if not already duplicated
  if (wrap.querySelectorAll('.marquee-track').length < 2) {
    const clone = track.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    wrap.appendChild(clone);
  }
}

/* === Dark Mode Toggle === */
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  // Detect saved preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      toggle.textContent = '☀️';
      toggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
      document.documentElement.removeAttribute('data-theme');
      toggle.textContent = '🌙';
      toggle.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  // Apply initial theme
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (systemDark) {
    setTheme('dark');
  }

  // Toggle on click
  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
  });

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}

/* === Skill Bar Animation on Scroll === */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width') || '0';
        bar.style.width = width + '%';
        bar.classList.add('animated');
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
}
