/* Freight estimator demo with deterministic local calculation. */
import { $, clamp } from '../core/dom.js';
import { openModal } from '../core/ui.js';
import { closeDrawer } from '../shell/navigation.js';

const CITY = {
  北京: [116.4074, 39.9042],
  上海: [121.4737, 31.2304],
  广州: [113.2644, 23.1291],
  深圳: [114.0579, 22.5431],
  成都: [104.0665, 30.5723],
  武汉: [114.3054, 30.5928],
  杭州: [120.1551, 30.2741],
  西安: [108.9398, 34.3416],
  南京: [118.7969, 32.0603]
};

const PRODUCTS = {
  fastest: { label: '京东特快', base: 20, perKg: 13, perKm: 0.12, min: 28, dayOffset: -1 },
  standard: { label: '京东标快', base: 12, perKg: 7.5, perKm: 0.08, min: 18, dayOffset: 0 },
  freight: { label: '重货标快', base: 60, perKg: 3.4, perKm: 0.35, min: 80, dayOffset: 1 },
  vehicle: { label: '整车直达', base: 600, perKg: 1.2, perKm: 4.2, min: 800, dayOffset: 2 }
};

let initialized = false;

function distanceBetween(from, to) {
  const [lon1, lat1] = CITY[from];
  const [lon2, lat2] = CITY[to];
  const rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad;
  const dLon = (lon2 - lon1) * rad;
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatMoney(value) {
  return Math.max(0, Math.round(value / 10) * 10).toLocaleString('zh-CN');
}

export function initQuote() {
  if (initialized) return;
  initialized = true;

  const modal = $('#quoteModal');
  const form = $('#quoteForm');
  const message = $('#quoteMessage');
  const result = $('#quoteResult');
  if (!modal || !form || !message || !result) return;

  const price = $('#quotePrice');
  const eta = $('#quoteEta');
  const weight = $('#quoteWeight');
  const product = $('#quoteProduct');
  const note = $('#quoteNote');
  const formWeight = form.elements.namedItem('weight');

  function resetQuote(focus = false) {
    form.reset();
    result.hidden = true;
    message.textContent = '';
    message.classList.remove('is-success');
    if (focus) formWeight?.focus({ preventScroll: true });
  }

  function openQuote(trigger) {
    closeDrawer(false);
    resetQuote();
    openModal(modal, trigger);
  }

  function estimate() {
    const origin = form.elements.namedItem('origin').value;
    const destination = form.elements.namedItem('destination').value;
    const productKey = form.elements.namedItem('product').value;
    const weightValue = Number(form.elements.namedItem('weight').value);
    const volumeValue = Number(form.elements.namedItem('volume').value || 0);
    const declaredValue = Number(form.elements.namedItem('value').value || 0);
    const config = PRODUCTS[productKey];

    if (origin === destination) {
      message.textContent = '始发城市和目的城市不能相同';
      form.elements.namedItem('origin').focus();
      return;
    }
    if (!config || !Number.isFinite(weightValue) || weightValue < 1 || weightValue > 5000) {
      message.textContent = '请输入 1–5000 kg 之间的计费重量';
      formWeight?.focus();
      return;
    }
    if (!Number.isFinite(volumeValue) || volumeValue < 0 || volumeValue > 100) {
      message.textContent = '体积请输入 0–100 m³ 之间的数字';
      form.elements.namedItem('volume').focus();
      return;
    }
    if (!Number.isFinite(declaredValue) || declaredValue < 0) {
      message.textContent = '声明价值不能为负数';
      form.elements.namedItem('value').focus();
      return;
    }

    message.textContent = '';
    const distance = distanceBetween(origin, destination);
    const volumeWeight = volumeValue * 166.7;
    const chargeWeight = Math.max(weightValue, volumeWeight);
    const insurance = declaredValue > 0 ? Math.max(5, declaredValue * 0.005) : 0;
    const rawPrice = Math.max(
      config.min,
      config.base + distance * config.perKm + chargeWeight * config.perKg + insurance
    );
    const low = rawPrice * 0.94;
    const high = rawPrice * 1.06;

    const baseDays = distance < 600 ? 1 : distance < 1400 ? 2 : distance < 2400 ? 3 : 4;
    const firstDay = Math.max(1, baseDays + config.dayOffset);
    const lastDay = firstDay + (productKey === 'fastest' ? 1 : 2);

    price.textContent = `¥ ${formatMoney(low)}–${formatMoney(high)}`;
    eta.textContent = `${firstDay}–${lastDay} 天`;
    weight.textContent = `${Math.ceil(chargeWeight).toLocaleString('zh-CN')} kg`;
    product.textContent = config.label;
    note.textContent = insurance > 0
      ? `含基础运费、计费重量与保价演示费用 ¥${formatMoney(insurance)}；结果不构成真实报价。`
      : '结果按基础运费、距离与计费重量演示计算，不构成真实报价。';
    result.hidden = false;
    result.setAttribute('aria-live', 'polite');
    result.setAttribute('tabindex', '-1');
    window.requestAnimationFrame(() => result.focus({ preventScroll: true }));
  }

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-quote-open]');
    if (trigger) {
      event.preventDefault();
      openQuote(trigger);
      return;
    }
    if (event.target.closest('[data-quote-reset]')) {
      resetQuote(true);
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    estimate();
  });

  form.addEventListener('input', () => {
    message.textContent = '';
  });
}
