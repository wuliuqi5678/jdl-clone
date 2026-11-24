/* Shared UI primitives: toast, scroll lock, modal focus management. */
import { $, $$, body } from './dom.js';

let toastTimer = 0;
let activeModal = null;
let lastModalTrigger = null;

const toastElement = () => document.getElementById('toast');

export function showToast(message) {
  const toast = toastElement();
  if (!toast) return;
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('is-show');
  toastTimer = window.setTimeout(() => {
    toast.classList.remove('is-show');
  }, 2900);
}

export function setBodyLock() {
  const hasOverlay = document.querySelector('.modal.is-open') || document.querySelector('.mobile-drawer.is-open');
  body.classList.toggle('no-scroll', Boolean(hasOverlay));
}

export function getActiveModal() {
  return activeModal;
}

export function openModal(modal, trigger) {
  if (!modal) return;
  if (activeModal && activeModal !== modal) closeModal(false);

  activeModal = modal;
  lastModalTrigger = trigger || document.activeElement;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  setBodyLock();

  window.setTimeout(() => {
    const focusTarget = $('input:not([type="hidden"]), select, textarea', modal)
      || $('.modal__close', modal);
    focusTarget?.focus({ preventScroll: true });
  }, 110);
}

export function closeModal(restoreFocus = true) {
  if (!activeModal) return;
  const modal = activeModal;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  activeModal = null;
  setBodyLock();

  if (restoreFocus) {
    const target = lastModalTrigger && document.contains(lastModalTrigger) ? lastModalTrigger : null;
    window.setTimeout(() => target?.focus({ preventScroll: true }), 20);
  }
}

export function focusableElements(container) {
  return $$('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', container)
    .filter((element) => element.offsetParent !== null || element === document.activeElement);
}

export function trapFocus(event, container) {
  if (event.key !== 'Tab') return;
  const focusables = focusableElements(container);
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
