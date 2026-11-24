/* Shared DOM and platform helpers. */
export const $ = (selector, scope = document) => scope.querySelector(selector);
export const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
export const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
export const mobileQuery = window.matchMedia('(max-width: 760px)');
export const body = document.body;

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
