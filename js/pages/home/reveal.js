/* Progressive scroll-reveal animation. */
import { $$, reduceMotion } from '../../core/dom.js';

export function initReveal() {
  if (reduceMotion.matches || !('IntersectionObserver' in window)) return;
  const targets = $$([
    '.section-heading', '.section-subheading', '.service-carousel', '.service-panel',
    '.industry-head', '.industry-content', '.industry-tabs', '.network-stats',
    '.network-visual', '.news-layout', '.contact__copy', '.contact__channels', '.footer-columns'
  ].join(','));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
      window.setTimeout(() => entry.target.classList.remove('will-reveal', 'is-visible'), 820);
    });
  }, { threshold: .08, rootMargin: '0px 0px -30px 0px' });
  targets.forEach((target) => {
    target.classList.add('will-reveal');
    observer.observe(target);
  });
}
