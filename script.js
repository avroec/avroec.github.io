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
