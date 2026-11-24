/* Shared overlays and delegated data-* actions. */
import { $, $$ } from '../core/dom.js';
import {
  openModal,
  closeModal,
  getActiveModal,
  trapFocus,
  showToast
} from '../core/ui.js';
import { closeDrawer, closeLanguage } from './navigation.js';

const qrData = {
  wechat: {
    title: '微信公众号',
    image: 'assets/img/qr-wechat.jpg',
    note: '扫码关注京东物流官方公众号'
  },
  mini: {
    title: '京东物流小程序',
    image: 'assets/img/qr-mini.jpg',
    note: '扫码使用京东物流小程序'
  },
  qiwei: {
    title: '企业微信',
    image: 'assets/img/qr-qiwei.png',
    note: '扫码添加企业客户专属顾问'
  },
  'qiwei-float': {
    title: '企业微信',
    image: 'assets/img/qr-qiwei.png',
    note: '扫码添加企业客户专属顾问'
  }
};

let initialized = false;

export function openTrackModal(waybill) {
  const number = waybill || 'JDVA00000000000';
  const numberEl = $('#trackNumber');
  if (numberEl) numberEl.textContent = number;
  openModal($('#trackModal'), document.activeElement);
}

export function openLoginModal(trigger) {
  const message = $('#loginMessage');
  if (message) {
    message.textContent = '';
    message.classList.remove('is-success');
  }
  openModal($('#loginModal'), trigger);
}

export function openConsultModal(trigger) {
  const message = $('#consultMessage');
  if (message) {
    message.textContent = '';
    message.classList.remove('is-success');
  }
  openModal($('#consultModal'), trigger);
}

export function openQrModal(type, trigger) {
  const data = qrData[type] || qrData.qiwei;
  const title = $('#qrModalTitle');
  const image = $('#qrModalImage');
  const note = $('.qr-modal__note');
  if (title) title.textContent = data.title;
  if (image) {
    image.src = data.image;
    image.alt = `${data.title}二维码`;
  }
  if (note) note.textContent = data.note;
  openModal($('#qrModal'), trigger);
}

function initModalEvents() {
  $$('.modal').forEach((modal) => {
    modal.addEventListener('click', (event) => {
      if (event.target.closest('[data-modal-close]')) closeModal();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (getActiveModal()) {
        event.preventDefault();
        closeModal();
        return;
      }
      if ($('#mobileDrawer')?.classList.contains('is-open')) {
        event.preventDefault();
        closeDrawer();
        return;
      }
      closeLanguage();
    }

    const modal = getActiveModal();
    if (modal) {
      trapFocus(event, modal);
    } else {
      const drawer = $('#mobileDrawer');
      if (drawer?.classList.contains('is-open')) trapFocus(event, $('.mobile-drawer__panel', drawer));
    }
  });
}

function initDelegatedActions() {
  document.addEventListener('click', (event) => {
    const demo = event.target.closest('[data-demo]');
    if (demo && !event.target.closest('.modal')) {
      event.preventDefault();
      const label = demo.dataset.demo || demo.textContent.trim();
      showToast(`演示页面：${label}尚未接入真实业务系统`);
      return;
    }

    const trackOpen = event.target.closest('[data-track-open]');
    if (trackOpen) {
      event.preventDefault();
      closeDrawer(false);
      openTrackModal();
      return;
    }

    const loginTrigger = event.target.closest('[data-login]');
    if (loginTrigger) {
      event.preventDefault();
      openLoginModal(loginTrigger);
      return;
    }

    const consultTrigger = event.target.closest('[data-consult]');
    if (consultTrigger) {
      event.preventDefault();
      closeDrawer(false);
      openConsultModal(consultTrigger);
      return;
    }

    const qrTrigger = event.target.closest('[data-qr]');
    if (qrTrigger) {
      event.preventDefault();
      openQrModal(qrTrigger.dataset.qr, qrTrigger);
    }
  });
}

export function initOverlays() {
  if (initialized) return;
  initialized = true;
  initModalEvents();
  initDelegatedActions();

  if (new URLSearchParams(window.location.search).get('track') === '1') {
    window.setTimeout(() => openTrackModal(), 320);
  }
}
