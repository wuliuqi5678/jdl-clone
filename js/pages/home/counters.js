/* Animated network counters. */
import { $$, reduceMotion } from '../../core/dom.js';

export function initCounters() {
  const counters = $$('[data-count]');
  if (!counters.length) return;

  const format = (value, mode) => mode === 'comma'
    ? Math.round(value).toLocaleString('en-US')
    : String(Math.round(value));
  const finish = (element) => {
    element.textContent = format(Number(element.dataset.count), element.dataset.format);
  };

  function animate(element) {
    if (element.dataset.animated === 'true') return;
    element.dataset.animated = 'true';
    if (reduceMotion.matches) {
      finish(element);
      return;
    }
    const target = Number(element.dataset.count);
    const mode = element.dataset.format;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min(1, (now - start) / 1450);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = format(target * eased, mode);
      if (progress < 1) window.requestAnimationFrame(tick);
      else finish(element);
    }
    window.requestAnimationFrame(tick);
  }

  if (!('IntersectionObserver' in window) || reduceMotion.matches) {
    counters.forEach(finish);
    return;
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animate(entry.target);
      obs.unobserve(entry.target);
    });
  }, { threshold: .35 });
  counters.forEach((counter) => observer.observe(counter));
}
