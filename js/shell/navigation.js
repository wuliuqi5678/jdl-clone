/* Global navigation, language menu, drawer, footer accordions and scroll state. */
import { $, $$, body, mobileQuery, reduceMotion } from '../core/dom.js';
import { setBodyLock, showToast } from '../core/ui.js';

const header = $('#siteHeader');
const navItems = $$('.nav-item');
const drawer = $('#mobileDrawer');
const drawerPanel = $('.mobile-drawer__panel', drawer);
const menuOpenButton = $('[data-menu-open]');
const topButton = $('.rail-btn--top');

let lastDrawerTrigger = null;
let initialized = false;

const sectionNavMap = {
  home: 0,
  services: 1,
  solutions: 2,
  contact: 3,
  about: 5
};

const pageNavMap = {
  home: 0,
  services: 1,
  solutions: 2,
  support: 3,
  esg: 4,
  about: 5
};

export function closeLanguage() {
  const lang = $('.lang');
  if (!lang) return;
  lang.classList.remove('is-open');
  $('.lang__trigger')?.setAttribute('aria-expanded', 'false');
}

export function openDrawer() {
  if (!drawer) return;
  lastDrawerTrigger = document.activeElement;
  drawer.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');
  menuOpenButton?.setAttribute('aria-expanded', 'true');
  setBodyLock();
  window.setTimeout(() => $('.drawer-close', drawer)?.focus({ preventScroll: true }), 80);
}

export function closeDrawer(restoreFocus = true) {
  if (!drawer || !drawer.classList.contains('is-open')) return;
  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
  menuOpenButton?.setAttribute('aria-expanded', 'false');
  setBodyLock();
  if (restoreFocus) {
    const target = lastDrawerTrigger && document.contains(lastDrawerTrigger) ? lastDrawerTrigger : menuOpenButton;
    window.setTimeout(() => target?.focus({ preventScroll: true }), 20);
  }
}

function updateScrollUI() {
  const y = window.scrollY || window.pageYOffset;
  header?.classList.toggle('is-scrolled', y > 8);
  topButton?.classList.toggle('is-visible', y > 430);

  if (!document.getElementById('home')) {
    const navIndex = pageNavMap[body.dataset.nav];
    navItems.forEach((item, index) => {
      item.classList.toggle('is-active', typeof navIndex === 'number' && index === navIndex);
    });
    return;
  }

  let current = 'home';
  ['home', 'services', 'solutions', 'network', 'news', 'contact', 'about'].forEach((id) => {
    const section = document.getElementById(id);
    if (section && section.getBoundingClientRect().top <= (header ? header.offsetHeight + 170 : 190)) {
      current = id;
    }
  });
  const navIndex = sectionNavMap[current];
  if (typeof navIndex !== 'number') return;
  navItems.forEach((item, index) => item.classList.toggle('is-active', index === navIndex));
}

function initScrollState() {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      updateScrollUI();
      ticking = false;
    });
  }, { passive: true });
  updateScrollUI();
  window.addEventListener('pageshow', updateScrollUI);
  topButton?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  });
}

function initMegaMenus() {
  navItems.forEach((item) => {
    const trigger = $('.nav-link', item);
    if (!trigger || !$('.mega-panel', item)) return;
    const setExpanded = (value) => trigger.setAttribute('aria-expanded', String(value));

    item.addEventListener('mouseenter', () => setExpanded(true));
    item.addEventListener('mouseleave', () => setExpanded(false));
    item.addEventListener('focusin', () => setExpanded(true));
    item.addEventListener('focusout', (event) => {
      if (!item.contains(event.relatedTarget)) setExpanded(false);
    });
  });
}

function initLanguageMenu() {
  const lang = $('.lang');
  const trigger = $('.lang__trigger');
  const buttons = $$('.lang__menu button');

  trigger?.addEventListener('click', (event) => {
    event.stopPropagation();
    if (!lang) return;
    const open = !lang.classList.contains('is-open');
    lang.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', String(open));
  });

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const language = button.dataset.lang;
      buttons.forEach((item) => item.classList.toggle('is-current', item === button));
      closeLanguage();
      if (language === 'zh-CN') {
        showToast('当前已选择简体中文');
      } else {
        showToast('演示站当前为简体中文内容，多语言切换为交互预览');
      }
    });
  });

  document.addEventListener('click', (event) => {
    if (lang && !lang.contains(event.target)) closeLanguage();
  });

  $('[data-lang-quick]')?.addEventListener('click', () => {
    showToast('演示站当前为简体中文内容，多语言切换为交互预览');
  });
}

function initDrawer() {
  menuOpenButton?.addEventListener('click', openDrawer);
  $$('[data-menu-close]').forEach((element) => {
    element.addEventListener('click', () => closeDrawer());
  });

  $$('.drawer-group').forEach((group) => {
    const toggle = $('.drawer-toggle', group);
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      const open = !group.classList.contains('is-open');
      group.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
  });

  window.addEventListener('resize', () => {
    if (mobileQuery.matches) return;
    closeDrawer(false);
    $$('.drawer-group.is-open').forEach((group) => {
      group.classList.remove('is-open');
      $('.drawer-toggle', group)?.setAttribute('aria-expanded', 'false');
    });
  });
}

function initFooterAccordions() {
  $$('.footer-column__title').forEach((button) => {
    button.addEventListener('click', () => {
      if (!mobileQuery.matches) return;
      const column = button.closest('.footer-column');
      if (!column) return;
      const open = !column.classList.contains('is-open');
      column.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
    });
  });
}

export function initNavigation() {
  if (initialized) return;
  initialized = true;
  initScrollState();
  initMegaMenus();
  initLanguageMenu();
  initDrawer();
  initFooterAccordions();
}
