/* Homepage industry solution tabs. */
import { $, $$, escapeHtml, reduceMotion } from '../../core/dom.js';
import { industries, industryPageMap } from './data.js';

export function initIndustries() {
  const tabs = $$('.industry-tab');
  const bgs = $$('.industry-bg');
  const panel = $('#industryPanel');
  const title = $('#industryTitle');
  const desc = $('#industryDesc');
  const features = $('#industryFeatures');
  const more = $('#industryMoreLink');
  if (!tabs.length) return;

  let index = 0;
  let timer = 0;

  function apply(nextIndex) {
    const data = industries[nextIndex];
    if (!data) return;
    index = nextIndex;
    tabs.forEach((tab, i) => {
      const active = i === index;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.setAttribute('tabindex', active ? '0' : '-1');
      if (!tab.id) tab.id = `industryTab${i}`;
    });
    bgs.forEach((bg, i) => bg.classList.toggle('is-active', i === index));
    if (title) title.textContent = data.title;
    if (desc) desc.textContent = data.desc;
    if (features) features.innerHTML = data.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join('');
    if (more) more.href = industryPageMap[data.title] || 'solutions.html';
    if (panel) panel.setAttribute('aria-labelledby', `industryTab${index}`);
  }

  function setIndustry(nextIndex, focusTab = false) {
    const next = (nextIndex + tabs.length) % tabs.length;
    if (next === index) {
      if (focusTab) tabs[next].focus();
      return;
    }
    window.clearTimeout(timer);
    if (focusTab) tabs[next].focus();
    if (reduceMotion.matches) {
      apply(next);
      return;
    }
    panel?.classList.add('is-changing');
    timer = window.setTimeout(() => {
      apply(next);
      panel?.classList.remove('is-changing');
    }, 150);
  }

  tabs.forEach((tab, i) => {
    tab.id = `industryTab${i}`;
    tab.setAttribute('tabindex', i === 0 ? '0' : '-1');
    tab.setAttribute('aria-controls', 'industryPanel');
    tab.addEventListener('click', () => setIndustry(i));
  });
  $('#industryTabs')?.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') setIndustry(0, true);
    else if (event.key === 'End') setIndustry(industries.length - 1, true);
    else setIndustry(index + (event.key === 'ArrowRight' ? 1 : -1), true);
  });
  panel?.setAttribute('aria-labelledby', 'industryTab0');

  $$('[data-industry-jump]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      apply(Number(link.dataset.industryJump));
      document.getElementById('solutions')?.scrollIntoView({
        behavior: reduceMotion.matches ? 'auto' : 'smooth',
        block: 'start'
      });
    });
  });

  industries.forEach((item, i) => {
    const img = new Image();
    img.src = `assets/img/industry-${['consumer', 'dress', 'appliance', 'digital', 'car', 'fresh'][i]}.jpg`;
  });
}
