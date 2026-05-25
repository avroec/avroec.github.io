/* === Main JavaScript for MD Sumon Mia Replica === */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initServiceDropdown();
  initScrollAnimations();
  initCounterAnimation();
  initServiceTabs();
  initPricingTabs();
  initFAQ();
  initContactForm();
  initMarquee();
  initSmoothScroll();
  initSkillBars();
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

/* === Service Tabs === */
function initServiceTabs() {
  const tabs = document.querySelectorAll('.services-tab');
  const grid = document.querySelector('.services-grid');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.dataset.tab;
      const cards = grid.querySelectorAll('.service-card');

      cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* === Pricing Platform Tabs === */
function initPricingTabs() {
  const tabs = document.querySelectorAll('.pricing-platform-tab');
  const container = document.querySelector('.pricing-content');

  if (!container || tabs.length === 0) return;

  const platforms = {
    wordpress: {
      halfPrice: '$400', fullPrice: '$800',
      halfDisc: '$360', fullDisc: '$720',
      halfDesc: 'Perfect for startups — a clean, professional WordPress website ready to launch fast.',
      fullDesc: 'The complete WordPress solution with SEO, e-commerce, and everything to grow online.',
      name: 'WordPress'
    },
    shopify: {
      halfPrice: '$400', fullPrice: '$800',
      halfDisc: '$360', fullDisc: '$720',
      halfDesc: 'Perfect for startups — a clean, professional Shopify website ready to launch fast.',
      fullDesc: 'The complete Shopify solution with SEO, e-commerce, and everything to grow online.',
      name: 'Shopify'
    },
    webflow: {
      halfPrice: '$400', fullPrice: '$800',
      halfDisc: '$360', fullDisc: '$720',
      halfDesc: 'Perfect for startups — a clean, professional Webflow website ready to launch fast.',
      fullDesc: 'The complete Webflow solution with SEO, e-commerce, and everything to grow online.',
      name: 'Webflow'
    },
    framer: {
      halfPrice: '$400', fullPrice: '$800',
      halfDisc: '$360', fullDisc: '$720',
      halfDesc: 'Perfect for startups — a clean, professional Framer website ready to launch fast.',
      fullDesc: 'The complete Framer solution with SEO, e-commerce, and everything to grow online.',
      name: 'Framer'
    },
    wix: {
      halfPrice: '$400', fullPrice: '$800',
      halfDisc: '$360', fullDisc: '$720',
      halfDesc: 'Perfect for startups — a clean, professional Wix website ready to launch fast.',
      fullDesc: 'The complete Wix solution with SEO, e-commerce, and everything to grow online.',
      name: 'Wix'
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const platform = tab.dataset.platform;
      const data = platforms[platform];
      if (!data) return;

      // Update pricing cards
      container.querySelectorAll('.pricing-card').forEach(card => {
        const type = card.dataset.pkg; // half or full
        if (type === 'half') {
          card.querySelector('.price').innerHTML = data.halfPrice;
          card.querySelector('.discount').innerHTML = '🎉 10% OFF first order → ' + data.halfDisc;
          card.querySelector('.pkg-desc').textContent = data.halfDesc;
        } else if (type === 'full') {
          card.querySelector('.price').innerHTML = data.fullPrice;
          card.querySelector('.discount').innerHTML = '🎉 10% OFF first order → ' + data.fullDisc;
          card.querySelector('.pkg-desc').textContent = data.fullDesc;
        }
      });
    });
  });
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

/* === Contact Form === */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const successEl = document.getElementById('formSuccess');
    const formInner = form.querySelector('.form-inner');

    // Simulate submission
    btn.disabled = true;
    btn.textContent = 'Sending...';

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Send Message';
      if (formInner) formInner.style.display = 'none';
      if (successEl) successEl.classList.add('show');
    }, 1500);
  });
}

/* === Skill Bar Animation === */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.dataset.width;
        bar.style.width = width + '%';
        bar.classList.add('animated');
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
}
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* === Marquee Clone for infinite scroll === */
function initMarquee() {
  document.querySelectorAll('.marquee-track').forEach(track => {
    const clone = track.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.parentElement.appendChild(clone);
  });
}
