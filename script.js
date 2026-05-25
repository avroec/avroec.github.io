/* =====================================================
   shadcn/ui Pure CSS & JS — Component Behaviors
   ===================================================== */

/* ---- Utility: cn (class merge) ---- */
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/* ---- Dark Mode ---- */
function initTheme() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  function setTheme(t) {
    if (t === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      btn.textContent = '☀️';
      btn.setAttribute('aria-label', 'Switch to light mode');
    } else {
      document.documentElement.removeAttribute('data-theme');
      btn.textContent = '🌙';
      btn.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  setTheme(saved || (prefersDark ? 'dark' : 'light'));

  btn.addEventListener('click', () => {
    const isDark = document.documentElement.hasAttribute('data-theme');
    const next = isDark ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
  });
}

/* ---- Tabs ---- */
function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabs => {
    const list = tabs.querySelector('.tabs-list');
    const triggers = list.querySelectorAll('.tabs-trigger');
    const panels = tabs.querySelectorAll('.tabs-panel');

    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const value = trigger.getAttribute('data-value');
        triggers.forEach(t => t.setAttribute('aria-selected', 'false'));
        trigger.setAttribute('aria-selected', 'true');
        panels.forEach(p => p.classList.toggle('active', p.getAttribute('data-value') === value));
      });
    });
  });
}

/* ---- Accordion ---- */
function initAccordion() {
  document.querySelectorAll('.accordion').forEach(acc => {
    const items = acc.querySelectorAll('.accordion-item');
    items.forEach(item => {
      const trigger = item.querySelector('.accordion-trigger');
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Optional: close others (comment out for multi-open)
        items.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  });
}

/* ---- Collapsible ---- */
function initCollapsible() {
  document.querySelectorAll('.collapsible').forEach(col => {
    const trigger = col.querySelector('.collapsible-trigger');
    trigger.addEventListener('click', () => {
      col.classList.toggle('open');
    });
  });
}

/* ---- Dialog ---- */
function initDialog() {
  document.querySelectorAll('[data-dialog-trigger]').forEach(trigger => {
    const id = trigger.getAttribute('data-dialog-trigger');
    const overlay = document.querySelector(`[data-dialog-overlay="${id}"]`);
    const closeBtns = overlay?.querySelectorAll('[data-dialog-close]') || [];

    trigger.addEventListener('click', () => overlay?.classList.add('open'));
    closeBtns.forEach(btn => btn.addEventListener('click', () => overlay?.classList.remove('open')));
    overlay?.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });
  });
}

/* ---- Sheet / Drawer ---- */
function initSheet() {
  document.querySelectorAll('[data-sheet-trigger]').forEach(trigger => {
    const id = trigger.getAttribute('data-sheet-trigger');
    const overlay = document.querySelector(`[data-sheet-overlay="${id}"]`);
    const sheet = document.querySelector(`[data-sheet="${id}"]`);
    const closeBtns = sheet?.querySelectorAll('[data-sheet-close]') || [];

    function open() {
      overlay?.classList.add('open');
      sheet?.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      overlay?.classList.remove('open');
      sheet?.classList.remove('open');
      document.body.style.overflow = '';
    }

    trigger.addEventListener('click', open);
    closeBtns.forEach(btn => btn.addEventListener('click', close));
    overlay?.addEventListener('click', e => { if (e.target === overlay) close(); });
  });
}

/* ---- Tooltip ---- */
function initTooltip() {
  document.querySelectorAll('.tooltip').forEach(tip => {
    const trigger = tip.querySelector('.tooltip-trigger');
    const content = tip.querySelector('.tooltip-content');
    if (!trigger || !content) return;

    const show = () => content.classList.add('show');
    const hide = () => content.classList.remove('show');

    trigger.addEventListener('mouseenter', show);
    trigger.addEventListener('mouseleave', hide);
    trigger.addEventListener('focus', show);
    trigger.addEventListener('blur', hide);
  });
}

/* ---- Popover ---- */
function initPopover() {
  document.querySelectorAll('.popover').forEach(pop => {
    const trigger = pop.querySelector('.popover-trigger');
    const content = pop.querySelector('.popover-content');
    if (!trigger || !content) return;

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = content.classList.contains('show');
      // Close all other popovers
      document.querySelectorAll('.popover-content.show').forEach(c => c.classList.remove('show'));
      if (!isOpen) content.classList.add('show');
    });
  });

  document.addEventListener('click', (e) => {
    document.querySelectorAll('.popover-content.show').forEach(content => {
      if (!content.contains(e.target)) content.classList.remove('show');
    });
  });
}

/* ---- Hover Card ---- */
function initHoverCard() {
  document.querySelectorAll('.hover-card').forEach(hc => {
    const trigger = hc.querySelector('.hover-card-trigger');
    const content = hc.querySelector('.hover-card-content');
    if (!trigger || !content) return;

    trigger.addEventListener('mouseenter', () => content.classList.add('show'));
    trigger.addEventListener('mouseleave', () => content.classList.remove('show'));
    trigger.addEventListener('focus', () => content.classList.add('show'));
    trigger.addEventListener('blur', () => content.classList.remove('show'));
  });
}

/* ---- Custom Select ---- */
function initCustomSelect() {
  document.querySelectorAll('.custom-select').forEach(sel => {
    const trigger = sel.querySelector('.custom-select-trigger');
    const menu = sel.querySelector('.custom-select-menu');
    const options = menu.querySelectorAll('.custom-select-option');
    const placeholder = trigger.querySelector('.select-value');

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = sel.classList.contains('open');
      document.querySelectorAll('.custom-select.open').forEach(s => s.classList.remove('open'));
      sel.classList.toggle('open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        options.forEach(o => o.setAttribute('aria-selected', 'false'));
        opt.setAttribute('aria-selected', 'true');
        if (placeholder) placeholder.textContent = opt.textContent.trim();
        sel.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      });
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select.open').forEach(s => {
      s.classList.remove('open');
      const t = s.querySelector('.custom-select-trigger');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---- Toggle & Toggle Group ---- */
function initToggle() {
  document.querySelectorAll('.toggle[aria-pressed]').forEach(t => {
    t.addEventListener('click', () => {
      const pressed = t.getAttribute('aria-pressed') === 'true';
      t.setAttribute('aria-pressed', String(!pressed));
    });
  });

  document.querySelectorAll('.toggle-group').forEach(group => {
    const toggles = group.querySelectorAll('.toggle');
    toggles.forEach(t => {
      t.addEventListener('click', () => {
        // Single-select mode by default for groups
        toggles.forEach(btn => btn.setAttribute('aria-pressed', 'false'));
        t.setAttribute('aria-pressed', 'true');
      });
    });
  });
}

/* ---- Toast / Sonner ---- */
const Toaster = {
  container: null,
  init() {
    if (this.container) return;
    this.container = document.createElement('div');
    this.container.className = 'toaster toaster-bottom-right';
    document.body.appendChild(this.container);
  },
  show({ title, description, variant = 'default', duration = 5000 }) {
    this.init();
    const toast = document.createElement('div');
    toast.className = `toast toast-${variant}`;
    toast.innerHTML = `
      <div>
        <div class="toast-title">${title}</div>
        ${description ? `<div class="toast-description">${description}</div>` : ''}
      </div>
      <button class="toast-close" aria-label="Close">×</button>
    `;

    toast.querySelector('.toast-close').addEventListener('click', () => this.dismiss(toast));
    this.container.appendChild(toast);

    if (duration > 0) {
      setTimeout(() => this.dismiss(toast), duration);
    }
  },
  dismiss(toast) {
    toast.classList.add('removing');
    toast.addEventListener('animationend', () => toast.remove());
  }
};

function initToastTriggers() {
  document.querySelectorAll('[data-toast]').forEach(btn => {
    btn.addEventListener('click', () => {
      const data = JSON.parse(btn.getAttribute('data-toast'));
      Toaster.show(data);
    });
  });
}

/* ---- Calendar ---- */
function initCalendar() {
  document.querySelectorAll('.calendar').forEach(cal => {
    const grid = cal.querySelector('.calendar-grid');
    const monthLabel = cal.querySelector('.calendar-month');
    const prev = cal.querySelector('.calendar-prev');
    const next = cal.querySelector('.calendar-next');
    if (!grid) return;

    let current = new Date();
    let selected = null;

    function render() {
      const year = current.getFullYear();
      const month = current.getMonth();
      if (monthLabel) monthLabel.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });

      grid.innerHTML = '';
      const dayNames = ['Su','Mo','Tu','We','Th','Fr','Sa'];
      dayNames.forEach(d => {
        const el = document.createElement('div');
        el.className = 'calendar-day-name';
        el.textContent = d;
        grid.appendChild(el);
      });

      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const prevDays = new Date(year, month, 0).getDate();

      for (let i = firstDay - 1; i >= 0; i--) {
        const el = document.createElement('button');
        el.className = 'calendar-day outside';
        el.textContent = prevDays - i;
        grid.appendChild(el);
      }
      for (let d = 1; d <= daysInMonth; d++) {
        const el = document.createElement('button');
        const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();
        const isSelected = selected && selected.toDateString() === new Date(year, month, d).toDateString();
        el.className = cn('calendar-day', isToday && 'today', isSelected && 'selected');
        el.textContent = d;
        el.addEventListener('click', () => {
          selected = new Date(year, month, d);
          render();
        });
        grid.appendChild(el);
      }
      const total = firstDay + daysInMonth;
      const remaining = (7 - (total % 7)) % 7;
      for (let i = 1; i <= remaining; i++) {
        const el = document.createElement('button');
        el.className = 'calendar-day outside';
        el.textContent = i;
        grid.appendChild(el);
      }
    }

    prev?.addEventListener('click', () => { current.setMonth(current.getMonth() - 1); render(); });
    next?.addEventListener('click', () => { current.setMonth(current.getMonth() + 1); render(); });
    render();
  });
}

/* ---- Command Palette ---- */
function initCommand() {
  document.querySelectorAll('.command').forEach(cmd => {
    const input = cmd.querySelector('input');
    const items = cmd.querySelectorAll('.command-item');
    const empty = cmd.querySelector('.command-empty');
    if (!input) return;

    input.addEventListener('input', () => {
      const q = input.value.toLowerCase();
      let hasVisible = false;
      items.forEach(item => {
        const match = item.textContent.toLowerCase().includes(q);
        item.style.display = match ? 'flex' : 'none';
        if (match) hasVisible = true;
      });
      if (empty) empty.style.display = hasVisible ? 'none' : 'block';
    });

    // Simple keyboard nav
    let idx = -1;
    input.addEventListener('keydown', e => {
      const visible = Array.from(items).filter(i => i.style.display !== 'none');
      if (e.key === 'ArrowDown') { e.preventDefault(); idx = Math.min(idx + 1, visible.length - 1); }
      if (e.key === 'ArrowUp') { e.preventDefault(); idx = Math.max(idx - 1, 0); }
      if (e.key === 'Enter' && visible[idx]) { visible[idx].click(); }
      visible.forEach((v, i) => v.classList.toggle('selected', i === idx));
    });
  });
}

/* ---- Slider (range fill) ---- */
function initSlider() {
  document.querySelectorAll('.slider[type="range"]').forEach(slider => {
    function updateFill() {
      const min = parseFloat(slider.min) || 0;
      const max = parseFloat(slider.max) || 100;
      const val = parseFloat(slider.value) || 0;
      const pct = ((val - min) / (max - min)) * 100;
      slider.style.setProperty('--slider-fill', pct + '%');
    }
    updateFill();
    slider.addEventListener('input', updateFill);
  });
}

/* ---- Carousel ---- */
function initCarousel() {
  document.querySelectorAll('.carousel').forEach(car => {
    const track = car.querySelector('.carousel-track');
    const prev = car.querySelector('.carousel-prev');
    const next = car.querySelector('.carousel-next');
    const dots = car.querySelectorAll('.carousel-dot');
    const slides = car.querySelectorAll('.carousel-slide');
    if (!track || slides.length === 0) return;

    let index = 0;

    function go(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, di) => d.classList.toggle('active', di === index));
    }

    prev?.addEventListener('click', () => go(index - 1));
    next?.addEventListener('click', () => go(index + 1));
    dots.forEach((d, di) => d.addEventListener('click', () => go(di)));

    // Auto-play optional
    const autoplay = car.hasAttribute('data-autoplay');
    if (autoplay) {
      setInterval(() => go(index + 1), 4000);
    }
  });
}

/* ---- Alert Dialog ---- */
function initAlertDialog() {
  document.querySelectorAll('[data-alert-dialog-trigger]').forEach(trigger => {
    const id = trigger.getAttribute('data-alert-dialog-trigger');
    const overlay = document.querySelector(`[data-alert-dialog-overlay="${id}"]`);
    if (!overlay) return;

    const dialog = overlay.querySelector('.alert-dialog');
    const cancelBtn = overlay.querySelector('[data-alert-dialog-cancel]');
    const actionBtn = overlay.querySelector('[data-alert-dialog-action]');
    const focusable = () => dialog?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

    function open() {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      // Focus cancel button after animation
      setTimeout(() => {
        const el = cancelBtn || actionBtn;
        el?.focus();
      }, 150);
    }

    function close() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      trigger.focus();
    }

    trigger.addEventListener('click', open);
    cancelBtn?.addEventListener('click', close);
    actionBtn?.addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

    // Focus trap
    overlay.addEventListener('keydown', e => {
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab') return;
      const f = Array.from(focusable() || []).filter(el => el.offsetParent !== null);
      if (f.length === 0) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  });
}

/* ---- Dropdown Menu ---- */
function initDropdownMenu() {
  document.querySelectorAll('.dropdown-menu').forEach(menu => {
    const trigger = menu.querySelector('.dropdown-menu-trigger');
    const content = menu.querySelector('.dropdown-menu-content');
    const items = menu.querySelectorAll('.dropdown-menu-item, .dropdown-menu-sub-trigger');
    if (!trigger || !content) return;

    let highlightedIdx = -1;

    function closeAllSubs() {
      menu.querySelectorAll('.dropdown-menu-sub.open-sub').forEach(s => s.classList.remove('open-sub'));
    }

    function open() {
      closeAllDropdowns();
      menu.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
      highlightedIdx = -1;
      updateHighlight();
    }

    function close() {
      menu.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
      closeAllSubs();
      highlightedIdx = -1;
    }

    function closeAllDropdowns() {
      document.querySelectorAll('.dropdown-menu.open').forEach(m => {
        m.classList.remove('open');
        const t = m.querySelector('.dropdown-menu-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
        m.querySelectorAll('.dropdown-menu-sub.open-sub').forEach(s => s.classList.remove('open-sub'));
      });
    }

    function getVisibleItems() {
      return Array.from(content.querySelectorAll('.dropdown-menu-item, .dropdown-menu-sub-trigger'))
        .filter(el => el.offsetParent !== null && !el.closest('.dropdown-menu-sub-content'));
    }

    function updateHighlight(candidates = getVisibleItems()) {
      menu.querySelectorAll('.highlighted').forEach(el => el.classList.remove('highlighted'));
      if (candidates[highlightedIdx]) {
        candidates[highlightedIdx].classList.add('highlighted');
      }
    }

    trigger.addEventListener('click', e => {
      e.stopPropagation();
      menu.classList.contains('open') ? close() : open();
    });

    content.addEventListener('keydown', e => {
      if (e.key === 'Escape') { e.preventDefault(); close(); trigger.focus(); return; }

      // Check if we're in a submenu
      const sub = e.target.closest('.dropdown-menu-sub');
      const scope = sub || content;
      const candidates = Array.from(scope.querySelectorAll(':scope > .dropdown-menu-item, :scope > .dropdown-menu-sub-trigger'))
        .filter(el => el.offsetParent !== null);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        highlightedIdx = Math.min(highlightedIdx + 1, candidates.length - 1);
        updateHighlight(candidates);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        highlightedIdx = Math.max(highlightedIdx - 1, 0);
        updateHighlight(candidates);
      } else if (e.key === 'ArrowRight' && e.target.classList.contains('dropdown-menu-sub-trigger')) {
        e.preventDefault();
        e.target.closest('.dropdown-menu-sub')?.classList.add('open-sub');
      } else if (e.key === 'ArrowLeft') {
        const subEl = e.target.closest('.dropdown-menu-sub');
        if (subEl) {
          e.preventDefault();
          subEl.classList.remove('open-sub');
          subEl.querySelector('.dropdown-menu-sub-trigger')?.focus();
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        candidates[highlightedIdx]?.click();
      }
    });

    // Item clicks
    items.forEach(item => {
      item.addEventListener('click', e => {
        // If this is a sub-trigger, toggle sub
        const sub = item.closest('.dropdown-menu-sub');
        if (sub && item.classList.contains('dropdown-menu-sub-trigger')) {
          e.stopPropagation();
          sub.classList.toggle('open-sub');
          return;
        }
        // Regular item click closes
        setTimeout(() => close(), 50);
      });
    });

    // Click outside
    document.addEventListener('click', e => {
      if (!menu.contains(e.target)) close();
    });
  });
}

/* ---- Context Menu ---- */
function initContextMenu() {
  let activeContextMenu = null;

  document.querySelectorAll('[data-context-menu-target]').forEach(target => {
    const id = target.getAttribute('data-context-menu-target');
    const menu = document.getElementById(id);
    if (!menu) return;

    let highlightedIdx = -1;
    const items = menu.querySelectorAll('.context-menu-item');

    function updateHighlight() {
      items.forEach((el, i) => el.classList.toggle('highlighted', i === highlightedIdx));
    }

    function show(e) {
      e.preventDefault();
      closeAll();

      let x = e.clientX, y = e.clientY;
      menu.style.display = 'block';

      // Reposition if off-screen
      const rect = menu.getBoundingClientRect();
      if (x + menu.offsetWidth > window.innerWidth) x = window.innerWidth - menu.offsetWidth - 8;
      if (y + menu.offsetHeight > window.innerHeight) y = window.innerHeight - menu.offsetHeight - 8;
      if (x < 8) x = 8;
      if (y < 8) y = 8;

      menu.style.left = x + 'px';
      menu.style.top = y + 'px';
      menu.classList.add('open');
      highlightedIdx = -1;
      updateHighlight();
      activeContextMenu = menu;

      menu.addEventListener('click', hide, { once: true });
    }

    function hide() {
      menu.classList.remove('open');
      menu.style.display = 'none';
      highlightedIdx = -1;
      activeContextMenu = null;
    }

    function closeAll() {
      document.querySelectorAll('.context-menu.open').forEach(m => {
        m.classList.remove('open');
        m.style.display = 'none';
      });
      activeContextMenu = null;
    }

    target.addEventListener('contextmenu', show);

    menu.addEventListener('keydown', e => {
      if (e.key === 'Escape') { e.preventDefault(); hide(); target.focus(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); highlightedIdx = Math.min(highlightedIdx + 1, items.length - 1); updateHighlight(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); highlightedIdx = Math.max(highlightedIdx - 1, 0); updateHighlight(); }
      if (e.key === 'Enter' && highlightedIdx >= 0) { e.preventDefault(); items[highlightedIdx]?.click(); hide(); }
    });

    // Close on scroll/window resize
    window.addEventListener('scroll', () => { if (activeContextMenu === menu) hide(); });
    window.addEventListener('resize', () => { if (activeContextMenu === menu) hide(); });
  });

  document.addEventListener('click', e => {
    if (activeContextMenu && !activeContextMenu.contains(e.target)) {
      activeContextMenu.classList.remove('open');
      activeContextMenu.style.display = 'none';
      activeContextMenu = null;
    }
  });
}

/* ---- Menubar ---- */
function initMenubar() {
  document.querySelectorAll('.menubar').forEach(bar => {
    const triggers = bar.querySelectorAll('.menubar-trigger');
    triggers.forEach(trigger => {
      const menu = trigger.nextElementSibling;
      if (!menu?.classList.contains('menubar-menu')) return;

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = menu.classList.contains('open');
        bar.querySelectorAll('.menubar-menu').forEach(m => m.classList.remove('open'));
        triggers.forEach(t => t.setAttribute('aria-expanded', 'false'));
        if (!isOpen) {
          menu.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.menubar-menu').forEach(m => m.classList.remove('open'));
    document.querySelectorAll('.menubar-trigger').forEach(t => t.setAttribute('aria-expanded', 'false'));
  });
}

/* ---- ScrollSpy for demo sidebar ---- */
function initScrollSpy() {
  const links = document.querySelectorAll('.demo-sidebar a[href^="#"]');
  if (!links.length) return;

  const sections = Array.from(links).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.demo-sidebar a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ---- Global keyboard: Escape closes overlays ---- */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.alert-dialog-overlay.open').forEach(d => d.classList.remove('open'));
    document.querySelectorAll('.dropdown-menu.open').forEach(d => {
      d.classList.remove('open');
      const t = d.querySelector('.dropdown-menu-trigger');
      if (t) t.setAttribute('aria-expanded', 'false');
      d.querySelectorAll('.dropdown-menu-sub.open-sub').forEach(s => s.classList.remove('open-sub'));
    });
    document.querySelectorAll('.dialog-overlay.open').forEach(d => d.classList.remove('open'));
    document.querySelectorAll('.sheet-overlay.open').forEach(o => o.classList.remove('open'));
    document.querySelectorAll('.sheet.open').forEach(s => s.classList.remove('open'));
    document.querySelectorAll('.popover-content.show').forEach(p => p.classList.remove('show'));
    document.querySelectorAll('.custom-select.open').forEach(s => s.classList.remove('open'));
    document.querySelectorAll('.menubar-menu').forEach(m => m.classList.remove('open'));
    document.body.style.overflow = '';
  }
});

/* ---- Initialize all on DOM ready ---- */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTabs();
  initAccordion();
  initCollapsible();
  initDialog();
  initSheet();
  initTooltip();
  initPopover();
  initHoverCard();
  initCustomSelect();
  initToggle();
  initToastTriggers();
  initCalendar();
  initCommand();
  initSlider();
  initCarousel();
  initAlertDialog();
  initDropdownMenu();
  initContextMenu();
  initMenubar();
  initScrollSpy();
});
