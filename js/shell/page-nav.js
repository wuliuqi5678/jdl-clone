/* Sticky in-page navigation, FAQ accordions and smooth anchors. */
import { $, $$, reduceMotion } from '../core/dom.js';

let initialized = false;

function initSubnav() {
  const subnav = $('.page-subnav');
  if (!subnav) return;

  const links = $$('a[href^="#"]', subnav);
  const sections = links.map((link) => {
    const id = link.getAttribute('href').slice(1);
    const section = document.getElementById(id);
    return section ? { link, section } : null;
  }).filter(Boolean);

  const setActive = (target) => {
    links.forEach((link) => {
      const active = link === target;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  links.forEach((link) => link.addEventListener('click', () => setActive(link)));

  if (sections.length) {
    const headerHeight = () => ($('.site-header')?.offsetHeight || 74) + (subnav.offsetHeight || 48) + 110;
    let ticking = false;

    const updateActive = () => {
      let current = sections[0];
      const line = headerHeight();
      sections.forEach((item) => {
        if (item.section.getBoundingClientRect().top <= line) current = item;
      });
      setActive(current.link);
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateActive);
    }, { passive: true });

    updateActive();
  }

  const hash = window.location.hash;
  if (hash) {
    const target = subnav.querySelector(`a[href="${hash}"]`);
    if (target) setActive(target);
  }

  document.addEventListener('click', (event) => {
    const anchor = event.target.closest('.page-subnav a[href^="#"]');
    if (!anchor) return;
    const target = document.getElementById(anchor.getAttribute('href').slice(1));
    if (target && !reduceMotion.matches) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', anchor.getAttribute('href'));
    }
  });
}

function initFaq() {
  const items = $$('.faq-list details');
  items.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      items.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });
}

export function initPageNav() {
  if (initialized) return;
  initialized = true;
  initSubnav();
  initFaq();
}
