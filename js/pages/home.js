/* Homepage controller: hero, service tabs, industry tabs, counters and reveal. */
import { $, $$, escapeHtml, mobileQuery, reduceMotion } from '../core/dom.js';

const services = [
  {
    title: '快递快运服务',
    desc: '向企业及个人客户提供安全可靠、时效领先、专业贴心的快递及快运服务，以及在此基础上的多种增值服务',
    image: 'assets/img/svc-express.png',
    icon: 'assets/icons/svc-express.png',
    groups: [
      { name: '快递', items: ['京东特快', '京东标快', '增值服务', '查看更多'] },
      { name: '快运', items: ['重货标快', '整车直达', '增值服务'] }
    ]
  },
  {
    title: '仓配一体服务',
    desc: '以京仓 / 云仓 + 京配 / 云配服务不同需求的客户，为电商仓平台商家提供高品质以及高性价比的仓配一体物流服务',
    image: 'assets/img/svc-supplychain.png',
    icon: 'assets/icons/svc-supplychain.png',
    groups: [{ name: '仓配产品', items: ['商务仓', '电商仓', '更多'] }]
  },
  {
    title: '大件服务',
    desc: '面向家电、家居、电动车、健身器材行业，为客户提供全渠道正、逆向全链路一体化的仓 & 配供应链服务。',
    image: 'assets/img/svc-bulky.png',
    icon: 'assets/icons/svc-bulky.png',
    groups: [{ name: '大件产品', items: ['大件商务仓', '大件备件仓', '更多'] }]
  },
  {
    title: '送仓服务',
    desc: '为企业客户提供从货源地到收货仓之间的收货、暂存、分仓调度、运输、送仓、退仓的一体化供应链物流服务。',
    image: 'assets/img/svc-warehouse.png',
    icon: 'assets/icons/svc-warehouse.png',
    groups: [{ name: '送仓产品', items: ['特快到仓', '极速到仓', '更多'] }]
  },
  {
    title: '冷链服务',
    desc: '专注于生鲜食品，通过构建社会化冷链协同网络，打造全流程、全场景的 F2B2C 一体化供应链服务平台，实现对商家与消费终端的安心交付。',
    image: 'assets/img/svc-coldchain.png',
    icon: 'assets/icons/svc-coldchain.png',
    groups: [{ name: '冷链产品', items: ['生鲜商务仓', '冷链卡班', '更多'] }]
  },
  {
    title: '医药服务',
    desc: '面向受国家药监监管的医药行业，以覆盖全国的仓 & 配资源、全程追溯控温的数字化能力，为客户提供合规专业、安全高效的多温层履约服务。',
    image: 'assets/img/svc-medicine.png',
    icon: 'assets/icons/svc-medicine.png',
    groups: [{ name: '医药产品', items: ['医药商务仓', '医冷快递', '更多'] }]
  },
  {
    title: '京东服务',
    desc: '京东物流旗下行业领先的一站式服务平台，覆盖安装、维修、清洗、保养与机器人服务，为家庭和企业提供高品质服务体验。',
    image: 'assets/img/svc-serviceplus.png',
    icon: 'assets/icons/svc-serviceplus.png',
    groups: [{ name: '服务产品', items: ['安装', '维修', '机器人服务'] }]
  },
  {
    title: '运力服务',
    desc: '整合公路、铁路、航空、基础设施设备等资源，提供全方位、多层次的物流运输服务。',
    image: 'assets/img/svc-capacity.png',
    icon: 'assets/icons/svc-capacity.png',
    groups: [{ name: '运力产品', items: ['专线包仓', '全货机包机', '更多'] }]
  },
  {
    title: '国际物流',
    desc: '助力中国制造和中国品牌一站出海，并为全球客户提供优质、高效、全面的一体化供应链解决方案。',
    image: 'assets/img/svc-inter.png',
    icon: 'assets/icons/svc-inter.png',
    groups: [{ name: '国际产品', items: ['跨境端到端', '国际运输', '更多'] }]
  },
  {
    title: '物流科技',
    desc: '致力于创新技术服务与多元场景的有机结合，通过自动化、数字化、智能化的物流科技产品和解决方案，推动高效协同的生态赋能与多元价值共赢。',
    image: 'assets/img/svc-technology.png',
    icon: 'assets/icons/svc-technology.png',
    groups: [{ name: '科技产品', items: ['智能仓储', '智能物流园区', '更多'] }]
  }
];

const servicePageMap = {
  '快递快运服务': 'express.html',
  '仓配一体服务': 'supply-chain.html',
  '大件服务': 'services.html#bulky',
  '送仓服务': 'supply-chain.html#warehouse',
  '冷链服务': 'services.html#coldchain',
  '医药服务': 'services.html#medical',
  '京东服务': 'services.html#service-plus',
  '运力服务': 'services.html#capacity',
  '国际物流': 'services.html#global',
  '物流科技': 'services.html#technology'
};

const productDestinations = {
  '京东特快': 'express-jd-fastest.html',
  '京东标快': 'express-jd-standard.html',
  '重货标快': 'freight-fast-cargo.html',
  '整车直达': 'freight-vehicle.html',
  '商务仓': 'supply-chain.html#products',
  '电商仓': 'supply-chain.html#products',
  '大件商务仓': 'services.html#bulky',
  '大件备件仓': 'services.html#bulky',
  '特快到仓': 'supply-chain.html#warehouse',
  '极速到仓': 'supply-chain.html#warehouse',
  '生鲜商务仓': 'services.html#coldchain',
  '冷链卡班': 'services.html#coldchain',
  '医药商务仓': 'services.html#medical',
  '医冷快递': 'services.html#medical',
  '安装': 'services.html#service-plus',
  '维修': 'services.html#service-plus',
  '机器人服务': 'services.html#service-plus',
  '专线包仓': 'services.html#capacity',
  '全货机包机': 'services.html#capacity',
  '跨境端到端': 'services.html#global',
  '国际运输': 'services.html#global',
  '智能仓储': 'services.html#technology',
  '智能物流园区': 'services.html#technology',
  '增值服务': 'contact.html#support',
  '查看更多': 'services.html',
  '更多': 'services.html'
};

const industries = [
  {
    title: '快消',
    desc: '为消费品行业客户提供数字化、可视化、智能化的一体解决方案，向客户提供全渠道 E2E 服务，实现供应链升级。',
    features: ['多渠道多场景的供应链服务能力', '广泛的物流网络覆盖能力']
  },
  {
    title: '服装',
    desc: '深耕服饰行业供应链场景，提供从入仓、库内运营、出库到末端配送的标准化与定制化解决方案，助力品牌提升全渠道履约效率。',
    features: ['标准化库内运营与高效出库', '覆盖全国的仓网与运输能力']
  },
  {
    title: '家电',
    desc: '面向家电行业提供仓配一体、送装一体、逆向服务与数字化库存管理，以柔性履约能力支撑大促与日常销售。',
    features: ['送装一体与 100% 送货上门', '全渠道一盘货与智能分仓']
  },
  {
    title: '3C',
    desc: '运用智能供应链能力，为 3C 品牌提供从工厂、总仓、分仓到门店与消费者的端到端仓运配一体化服务。',
    features: ['唯一码 / 串码精细化库存管理', '线上线下一盘货与正逆一体']
  },
  {
    title: '汽车',
    desc: '为汽车行业客户提供入厂物流、售后备件、整车运输与供应链数字化服务，打造柔性、高效、敏捷的精益物流。',
    features: ['入厂物流与售后备件一体化', '数字化预测与全链路可视']
  },
  {
    title: '生鲜',
    desc: '依托覆盖全国的冷链仓运配网络，为生鲜客户提供从原产地、加工源头到末端消费者的一站式冷链供应链服务。',
    features: ['多温层仓储与精准温控', '全程可追溯的冷链履约网络']
  }
];

const industryPageMap = {
  '快消': 'consumer-goods.html',
  '服装': 'apparel.html',
  '家电': 'appliance.html',
  '3C': 'digital.html',
  '汽车': 'auto.html',
  '生鲜': 'fresh.html'
};

let initialized = false;

function productMarkup(groups) {
  return groups.map((group) => `<div class="product-group">
    <span class="product-group__name">${escapeHtml(group.name)}</span>
    ${group.items.map((item) => {
      const href = productDestinations[item] || 'services.html';
      return `<a href="${href}">${escapeHtml(item)}</a>`;
    }).join('')}
  </div>`).join('');
}

function initHero() {
  const hero = $('.hero');
  const slides = $$('.hero-slide');
  const dots = $$('.hero-dot');
  const prev = $('.hero-arrow--prev');
  const next = $('.hero-arrow--next');
  const video = $('.hero-video');
  if (!hero || !slides.length) return;

  let index = 0;
  let timer = 0;
  let visible = true;
  let paused = false;
  let touchStartX = null;

  function playVideo() {
    if (!video || mobileQuery.matches || reduceMotion.matches) {
      video?.pause();
      return;
    }
    if (slides[index]?.dataset.slide === '1' && visible && !document.hidden) {
      const promise = video.play();
      if (promise && typeof promise.catch === 'function') promise.catch(() => {});
    } else {
      video.pause();
    }
  }

  function setHero(nextIndex, restart = true) {
    index = (nextIndex + slides.length) % slides.length;
    hero.classList.toggle('hero--light-dots', index > 0);
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    dots.forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', String(active));
      dot.setAttribute('tabindex', active ? '0' : '-1');
    });
    playVideo();
    if (restart) startTimer();
  }

  function startTimer() {
    window.clearInterval(timer);
    if (reduceMotion.matches || paused) return;
    timer = window.setInterval(() => setHero(index + 1), 7200);
  }

  setHero(0, false);
  next?.addEventListener('click', () => setHero(index + 1));
  prev?.addEventListener('click', () => setHero(index - 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => setHero(i)));

  hero.addEventListener('mouseenter', () => {
    paused = true;
    window.clearInterval(timer);
  });
  hero.addEventListener('mouseleave', () => {
    paused = false;
    startTimer();
  });
  hero.addEventListener('focusin', () => {
    paused = true;
    window.clearInterval(timer);
  });
  hero.addEventListener('focusout', (event) => {
    if (!hero.contains(event.relatedTarget)) {
      paused = false;
      startTimer();
    }
  });
  hero.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse') return;
    touchStartX = event.clientX;
  });
  hero.addEventListener('pointerup', (event) => {
    if (touchStartX === null) return;
    const delta = event.clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(delta) < 42) return;
    setHero(index + (delta < 0 ? 1 : -1));
  });

  new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      visible = entry.isIntersecting;
      playVideo();
    });
  }, { threshold: .1 }).observe(hero);

  document.addEventListener('visibilitychange', playVideo);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) window.clearInterval(timer);
    else startTimer();
  });
  reduceMotion.addEventListener?.('change', () => {
    if (reduceMotion.matches) {
      window.clearInterval(timer);
      video?.pause();
    } else {
      playVideo();
      startTimer();
    }
  });
  startTimer();
}

function initServices() {
  const tabs = $$('.service-tab');
  const tabWrap = $('#serviceTabs');
  const panel = $('#servicePanel');
  const title = $('#serviceTitle');
  const desc = $('#serviceDesc');
  const products = $('#serviceProducts');
  const image = $('#serviceImage');
  const detailIcon = $('#serviceDetailIcon');
  const pageLink = $('#servicePageLink');
  if (!tabs.length) return;

  let index = 0;
  let timer = 0;

  function scrollTab(i) {
    if (!tabWrap || !tabs[i]) return;
    const tab = tabs[i];
    tabWrap.scrollTo({
      left: Math.max(0, tab.offsetLeft - (tabWrap.clientWidth - tab.offsetWidth) / 2),
      behavior: reduceMotion.matches ? 'auto' : 'smooth'
    });
  }

  function apply(data) {
    if (!panel) return;
    if (title) title.textContent = data.title;
    if (desc) desc.textContent = data.desc;
    if (products) products.innerHTML = productMarkup(data.groups);
    if (image) {
      image.src = data.image;
      image.alt = data.title;
    }
    if (detailIcon) {
      detailIcon.src = data.icon;
      detailIcon.alt = '';
    }
    if (pageLink) pageLink.href = servicePageMap[data.title] || 'services.html';
    panel.setAttribute('aria-labelledby', `serviceTab${index}`);
  }

  function setService(nextIndex, focusTab = false) {
    index = (nextIndex + tabs.length) % tabs.length;
    const data = services[index];
    tabs.forEach((tab, i) => {
      const active = i === index;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.setAttribute('tabindex', active ? '0' : '-1');
    });
    if (focusTab) tabs[index].focus();
    scrollTab(index);
    window.clearTimeout(timer);
    if (reduceMotion.matches) {
      apply(data);
      return;
    }
    panel?.classList.add('is-changing');
    timer = window.setTimeout(() => {
      apply(data);
      panel?.classList.remove('is-changing');
    }, 150);
  }

  tabs.forEach((tab, i) => tab.addEventListener('click', () => setService(i)));
  tabWrap?.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') setService(0, true);
    else if (event.key === 'End') setService(services.length - 1, true);
    else setService(index + (event.key === 'ArrowRight' ? 1 : -1), true);
  });

  const previous = $('.round-arrow--prev');
  const next = $('.round-arrow--next');
  const amount = () => Math.max(180, (tabWrap?.clientWidth || 600) * .75);
  previous?.addEventListener('click', () => tabWrap?.scrollBy({ left: -amount(), behavior: 'smooth' }));
  next?.addEventListener('click', () => tabWrap?.scrollBy({ left: amount(), behavior: 'smooth' }));
  setService(0);

  window.addEventListener('resize', () => {
    if (document.activeElement?.closest('.service-tabs')) scrollTab(index);
  });

  const preload = () => services.forEach((item) => {
    const img = new Image();
    img.src = item.image;
  });
  if ('requestIdleCallback' in window) window.requestIdleCallback(preload, { timeout: 2200 });
  else window.setTimeout(preload, 1200);
}

function initIndustries() {
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

function initCounters() {
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

function initReveal() {
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

export function initHome() {
  if (initialized || !document.getElementById('home')) return;
  initialized = true;
  initHero();
  initServices();
  initIndustries();
  initCounters();
  initReveal();
}
