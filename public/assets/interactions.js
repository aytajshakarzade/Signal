(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Persistent light/dark theme. All buttons share one preference.
  const themeRoot = document.documentElement;
  function applyTheme(theme) {
    const selected = theme === 'dark' ? 'dark' : 'light';
    themeRoot.dataset.theme = selected;
    try { localStorage.setItem('signalStudioThemeV10', selected); } catch { /* private browsing may block storage */ }
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      const dark = selected === 'dark';
      button.innerHTML = dark ? '☀ <span>İşıqlı rejim</span>' : '☾ <span>Gecə rejimi</span>';
      button.setAttribute('aria-label', dark ? 'İşıqlı rejimə keç' : 'Gecə rejiminə keç');
      button.setAttribute('aria-pressed', String(dark));
    });
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = selected === 'dark' ? '#1c1428' : '#fffaf8';
  }
  let initialTheme = 'light';
  try { initialTheme = localStorage.getItem('signalStudioThemeV10') || 'light'; } catch { /* use default */ }
  applyTheme(initialTheme);
  document.querySelectorAll('[data-theme-toggle]').forEach(button => button.addEventListener('click', () => applyTheme(themeRoot.dataset.theme === 'dark' ? 'light' : 'dark')));

  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const siteHeader = document.getElementById('site-header');
  if (mobileNavToggle && siteHeader) {
    mobileNavToggle.addEventListener('click', () => {
      const open = siteHeader.classList.toggle('mobile-nav-open');
      mobileNavToggle.setAttribute('aria-expanded', String(open));
      mobileNavToggle.setAttribute('aria-label', open ? 'Menyunu bağla' : 'Menyunu aç');
      mobileNavToggle.textContent = open ? '×' : '☰';
    });
    siteHeader.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', () => {
      siteHeader.classList.remove('mobile-nav-open');
      mobileNavToggle.setAttribute('aria-expanded', 'false');
      mobileNavToggle.textContent = '☰';
    }));
  }

  const progress = document.getElementById('scroll-progress-bar');
  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();

  const revealTargets = document.querySelectorAll('#landing-view .section-heading, #landing-view .predictor-grid, #landing-view .feature-card, #landing-view .steps-grid article, #landing-view .final-cta, #workspace-view .workspace-card, #workspace-view .kpi-card');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach((entry, index) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealTargets.forEach(el => { el.classList.add('js-reveal'); revealObserver.observe(el); });
  }

  const finePointer = window.matchMedia('(pointer: fine)').matches;
  if (!reduceMotion && finePointer) {
    document.querySelectorAll('[data-tilt], .feature-card').forEach(card => {
      card.addEventListener('pointermove', event => {
        if (event.pointerType !== 'mouse') return;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        const tiltX = Math.max(-4, Math.min(4, -y * 5));
        const tiltY = Math.max(-4, Math.min(4, x * 5));
        card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-3px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
    document.querySelectorAll('.hero-visual, .feature-card').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
        card.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
      }, { passive: true });
    });
  }

  // Keep the workspace navigable while giving the dashboard an optional compact rail.
  const workspace = document.getElementById('workspace-view');
  const sidebarToggle = document.getElementById('sidebar-collapse-toggle');
  function applySidebarMode(compact) {
    if (!workspace || !sidebarToggle) return;
    workspace.classList.toggle('sidebar-compact', compact);
    sidebarToggle.setAttribute('aria-pressed', String(compact));
    sidebarToggle.setAttribute('aria-label', compact ? 'Menyunu genişləndir' : 'Menyunu yığ');
    sidebarToggle.title = compact ? 'Menyunu genişləndir' : 'Menyunu yığ';
    sidebarToggle.innerHTML = compact
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 5 7 7-7 7"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7"/></svg>';
  }
  let compactSidebar = false;
  try { compactSidebar = localStorage.getItem('signalStudioSidebarCompactV1') === 'true'; } catch { /* local preference is optional */ }
  applySidebarMode(compactSidebar);
  sidebarToggle?.addEventListener('click', () => {
    compactSidebar = !workspace?.classList.contains('sidebar-compact');
    applySidebarMode(compactSidebar);
    try { localStorage.setItem('signalStudioSidebarCompactV1', String(compactSidebar)); } catch { /* keep the in-memory choice */ }
  });

  // Give the action cards a subtle light-follow effect on precise pointers.
  if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.overview-action-card, .overview-kpis .kpi-card').forEach(card => {
      card.addEventListener('pointermove', event => {
        if (event.pointerType !== 'mouse') return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
        card.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
      }, { passive: true });
    });
  }

  const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver(entries => {
      const current = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!current) return;
      navLinks.forEach(link => link.classList.toggle('is-current', link.getAttribute('href') === `#${current.target.id}`));
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, .2, .5] });
    sections.forEach(section => navObserver.observe(section));
  }
})();
