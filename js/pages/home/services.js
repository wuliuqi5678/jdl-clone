/* Homepage service tabs and product links. */
import { $, $$, escapeHtml, reduceMotion } from '../../core/dom.js';
import { services, servicePageMap, productDestinations } from './data.js';

function productMarkup(groups) {
  return groups.map((group) => `<div class="product-group">
    <span class="product-group__name">${escapeHtml(group.name)}</span>
    ${group.items.map((item) => {
      const href = productDestinations[item] || 'services.html';
      return `<a href="${href}">${escapeHtml(item)}</a>`;
    }).join('')}
  </div>`).join('');
}

export function initServices() {
  const tabs = $$('.service-tab');
  const tabWrap = $('#serviceTabs');
  const panel = $('#servicePanel');
  const title = $('#serviceTitle');
  const desc = $('#serviceDesc');
  const products = $('#serviceProducts');
  const image = $('#serviceImage');
  const detailIcon = $('#serviceDetailIcon');
  const pageLink = $('#servicePageLink');
  if (!tabs.length) return;

  let index = 0;
  let timer = 0;

  function scrollTab(i) {
    if (!tabWrap || !tabs[i]) return;
    const tab = tabs[i];
    tabWrap.scrollTo({
      left: Math.max(0, tab.offsetLeft - (tabWrap.clientWidth - tab.offsetWidth) / 2),
      behavior: reduceMotion.matches ? 'auto' : 'smooth'
    });
  }

  function apply(data) {
    if (!panel) return;
    if (title) title.textContent = data.title;
    if (desc) desc.textContent = data.desc;
    if (products) products.innerHTML = productMarkup(data.groups);
    if (image) {
      image.src = data.image;
      image.alt = data.title;
    }
    if (detailIcon) {
      detailIcon.src = data.icon;
      detailIcon.alt = '';
    }
    if (pageLink) pageLink.href = servicePageMap[data.title] || 'services.html';
    panel.setAttribute('aria-labelledby', `serviceTab${index}`);
  }

  function setService(nextIndex, focusTab = false) {
    index = (nextIndex + tabs.length) % tabs.length;
    const data = services[index];
    tabs.forEach((tab, i) => {
      const active = i === index;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.setAttribute('tabindex', active ? '0' : '-1');
    });
    if (focusTab) tabs[index].focus();
    scrollTab(index);
    window.clearTimeout(timer);
    if (reduceMotion.matches) {
      apply(data);
      return;
    }
    panel?.classList.add('is-changing');
    timer = window.setTimeout(() => {
      apply(data);
      panel?.classList.remove('is-changing');
    }, 150);
  }

  tabs.forEach((tab, i) => tab.addEventListener('click', () => setService(i)));
  tabWrap?.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') setService(0, true);
    else if (event.key === 'End') setService(services.length - 1, true);
    else setService(index + (event.key === 'ArrowRight' ? 1 : -1), true);
  });

  const previous = $('.round-arrow--prev');
  const next = $('.round-arrow--next');
  const amount = () => Math.max(180, (tabWrap?.clientWidth || 600) * .75);
  previous?.addEventListener('click', () => tabWrap?.scrollBy({ left: -amount(), behavior: 'smooth' }));
  next?.addEventListener('click', () => tabWrap?.scrollBy({ left: amount(), behavior: 'smooth' }));
  setService(0);

  window.addEventListener('resize', () => {
    if (document.activeElement?.closest('.service-tabs')) scrollTab(index);
  });

  const preload = () => services.forEach((item) => {
    const img = new Image();
    img.src = item.image;
  });
  if ('requestIdleCallback' in window) window.requestIdleCallback(preload, { timeout: 2200 });
  else window.setTimeout(preload, 1200);
}
