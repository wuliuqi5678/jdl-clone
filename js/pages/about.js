/* Company timeline controller. */
import { $, $$ } from '../core/dom.js';

let initialized = false;

export function initAbout() {
  if (initialized) return;
  initialized = true;

  const timeline = $('#companyTimeline');
  const dataElement = $('#timelineData');
  if (!timeline || !dataElement) return;

  let items = [];
  try {
    items = JSON.parse(dataElement.textContent || '[]');
  } catch {
    return;
  }
  if (!items.length) return;

  const buttons = $$('.timeline-year', timeline);
  const image = $('#timelineImage', timeline);
  const year = $('#timelineYear', timeline);
  const title = $('#timelineTitle', timeline);
  const text = $('#timelineText', timeline);

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const item = items.find((entry) => entry.year === button.dataset.year) || items[index];
      if (!item) return;
      buttons.forEach((entry) => {
        entry.classList.toggle('is-active', entry === button);
        entry.setAttribute('aria-selected', String(entry === button));
      });
      if (image) {
        image.src = item.image;
        image.alt = `${item.year}年京东物流发展历程`;
      }
      if (year) year.textContent = item.year;
      if (title) title.textContent = item.title;
      if (text) text.textContent = item.text;
    });
  });
}
