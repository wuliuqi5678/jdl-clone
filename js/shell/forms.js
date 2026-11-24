/* Shared demo forms: tracking, login and consultation. */
import { $ } from '../core/dom.js';
import { closeModal, getActiveModal, showToast } from '../core/ui.js';
import { openTrackModal } from './overlays.js';

let initialized = false;
let codeCountdownTimer = 0;

function initTrackingForm() {
  const form = $('#trackForm');
  const input = $('#waybillInput');
  const error = $('#trackError');
  if (!form || !input) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value.trim();

    if (!value) {
      error.textContent = '请输入运单号或包裹号';
      form.classList.remove('has-error');
      void form.offsetWidth;
      form.classList.add('has-error');
      input.focus();
      return;
    }

    if (value.length < 6) {
      error.textContent = '运单号长度不足，请检查后重试';
      form.classList.add('has-error');
      input.focus();
      return;
    }

    form.classList.remove('has-error');
    error.textContent = '';
    openTrackModal(value.toUpperCase());
  });

  input.addEventListener('input', () => {
    form.classList.remove('has-error');
    if (error) error.textContent = '';
  });
}

function initLoginForm() {
  const form = $('#loginForm');
  const message = $('#loginMessage');
  const sendCodeButton = $('#sendCode');
  const modal = $('#loginModal');
  if (!form) return;

  sendCodeButton?.addEventListener('click', () => {
    const account = form.elements.account?.value.trim();
    if (!account) {
      message.textContent = '请先输入手机号或账号';
      message.classList.remove('is-success');
      form.elements.account?.focus();
      return;
    }

    form.elements.code.value = '888888';
    showToast('演示验证码已填入：888888');
    let seconds = 60;
    sendCodeButton.disabled = true;
    sendCodeButton.textContent = `${seconds}s 后重试`;
    window.clearInterval(codeCountdownTimer);
    codeCountdownTimer = window.setInterval(() => {
      seconds -= 1;
      if (seconds <= 0) {
        window.clearInterval(codeCountdownTimer);
        sendCodeButton.disabled = false;
        sendCodeButton.textContent = '获取验证码';
      } else {
        sendCodeButton.textContent = `${seconds}s 后重试`;
      }
    }, 1000);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const account = form.elements.account.value.trim();
    const code = form.elements.code.value.trim();

    if (account.length < 4) {
      message.textContent = '请输入正确的手机号或账号';
      message.classList.remove('is-success');
      form.elements.account.focus();
      return;
    }
    if (!/^\d{6}$/.test(code)) {
      message.textContent = '请输入 6 位数字验证码（演示码 888888）';
      message.classList.remove('is-success');
      form.elements.code.focus();
      return;
    }

    message.textContent = '演示登录成功，正在进入工作台…';
    message.classList.add('is-success');
    window.setTimeout(() => {
      if (getActiveModal() === modal) closeModal();
      form.reset();
      message.textContent = '';
      message.classList.remove('is-success');
      showToast('演示登录成功（未连接真实账号系统）');
    }, 650);
  });
}

function initConsultForm() {
  const form = $('#consultForm');
  const message = $('#consultMessage');
  const modal = $('#consultModal');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = form.elements.name.value.trim();
    const phone = form.elements.phone.value.trim();
    const company = form.elements.company.value.trim();

    if (name.length < 2) {
      message.textContent = '请填写您的称呼';
      message.classList.remove('is-success');
      form.elements.name.focus();
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      message.textContent = '请输入正确的 11 位手机号';
      message.classList.remove('is-success');
      form.elements.phone.focus();
      return;
    }
    if (!company) {
      message.textContent = '请填写公司名称';
      message.classList.remove('is-success');
      form.elements.company.focus();
      return;
    }

    message.textContent = '提交成功！物流顾问将尽快与您联系（演示数据，不会真实发送）。';
    message.classList.add('is-success');
    const submitButton = $('button[type="submit"]', form);
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = '已提交';
    }

    window.setTimeout(() => {
      if (getActiveModal() === modal) closeModal();
      form.reset();
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = '提交咨询';
      }
      message.textContent = '';
      message.classList.remove('is-success');
      showToast('咨询已模拟提交，感谢您的关注');
    }, 1500);
  });
}

export function initForms() {
  if (initialized) return;
  initialized = true;
  initTrackingForm();
  initLoginForm();
  initConsultForm();
}
