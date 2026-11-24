/* Full contact-page consultation form. */
import { $ } from '../core/dom.js';

let initialized = false;

export function initContact() {
  if (initialized) return;
  initialized = true;

  const form = $('#pageConsultForm');
  const message = $('#pageConsultMessage');
  if (!form) return;

  const setMessage = (text, success = false) => {
    if (!message) return;
    message.textContent = text;
    message.classList.toggle('is-success', success);
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const company = String(data.get('company') || '').trim();

    if (name.length < 2) {
      setMessage('请填写您的称呼');
      form.elements.name?.focus();
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      setMessage('请输入正确的 11 位手机号');
      form.elements.phone?.focus();
      return;
    }
    if (!company) {
      setMessage('请填写公司名称');
      form.elements.company?.focus();
      return;
    }

    const submit = $('button[type="submit"]', form);
    setMessage('提交成功！物流顾问将尽快与您联系（演示数据，不会真实发送）。', true);
    if (submit) {
      submit.disabled = true;
      submit.textContent = '已提交';
    }

    window.setTimeout(() => {
      form.reset();
      if (submit) {
        submit.disabled = false;
        submit.innerHTML = '提交咨询 <svg class="icon icon--xs" aria-hidden="true"><use href="#i-arrow-right"></use></svg>';
      }
      setMessage('');
    }, 2600);
  });
}
