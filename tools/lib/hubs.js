/* Services and solutions hub builders. */
const { esc, attr, icon, pageHero, sectionHead, pageDocument, writePage } = require('./page-shell');

const serviceHub = [
  ['express', 'assets/icons/svc-express.png', '快递快运服务', '面向企业及个人客户，提供安全可靠、时效领先的快递及快运服务。', 'express.html'],
  ['supply', 'assets/icons/svc-supplychain.png', '仓配一体服务', '京仓 / 云仓 + 京配 / 云配，为电商商家提供高性价比仓配服务。', 'supply-chain.html'],
  ['bulky', 'assets/icons/svc-bulky.png', '大件服务', '家电、家居、电动车、健身器材行业的全渠道仓配供应链服务。', 'services.html#bulky'],
  ['warehouse', 'assets/icons/svc-warehouse.png', '送仓服务', '从货源地到收货仓的收货、暂存、运输、送仓一体化服务。', 'supply-chain.html#warehouse'],
  ['coldchain', 'assets/icons/svc-coldchain.png', '冷链服务', '全流程、全场景的 F2B2C 一站式冷链服务平台。', 'services.html#coldchain'],
  ['medical', 'assets/icons/svc-medicine.png', '医药服务', '合规、专业、安全高效的多温层医药供应链履约服务。', 'services.html#medical'],
  ['service-plus', 'assets/icons/svc-serviceplus.png', '京东服务', '安装、维修、清洗、保养与机器人服务的一站式服务平台。', 'services.html#service-plus'],
  ['capacity', 'assets/icons/svc-capacity.png', '运力服务', '整合公路、铁路、航空资源，提供多层次运输服务。', 'services.html#capacity'],
  ['global', 'assets/icons/svc-inter.png', '国际物流', '助力中国制造和中国品牌一站出海，提供全球供应链服务。', 'services.html#global'],
  ['technology', 'assets/icons/svc-technology.png', '物流科技', '自动化、数字化、智能化的物流科技产品与解决方案。', 'services.html#technology']
];

function buildServicesHub() {
  const hero = pageHero({
    variant: 'orange',
    image: 'assets/pages/express-hero.jpg',
    breadcrumb: [['服务与产品']],
    eyebrow: 'JDL SERVICES & PRODUCTS',
    title: '服务与产品',
    subtitle: '从一体化供应链到末端配送，从国内履约到全球网络，为企业和个人提供省心高效的物流服务。',
    actions: [
      { label: '联系物流顾问', href: 'contact.html' },
      { label: '查看行业方案', href: 'solutions.html', kind: 'outline' }
    ],
    meta: [['10', '大服务类别'], ['3,600+', '仓库资源'], ['99%', '人口覆盖'], ['7×24', '服务响应']]
  });

  const family = `<section class="page-section" id="families">
    <div class="container">
      ${sectionHead('服务矩阵', '围绕企业供应链与个人寄递场景，提供可组合的物流产品', { pill: 'SERVICE FAMILIES' })}
      <div class="service-family-grid">${serviceHub.map(([id, image, title, desc, href]) => `<a class="service-family-card" id="${id}" href="${attr(href)}">
        <div class="service-family-card__icon"><img src="${attr(image)}" alt="" loading="lazy"></div>
        <h3>${esc(title)}</h3><p>${esc(desc)}</p><span class="link-arrow">了解详情 ${icon('i-arrow-right', 'icon icon--xs')}</span>
      </a>`).join('')}</div>
    </div>
  </section>`;

  const technology = `<section class="page-section page-section--soft" id="technology-detail">
    <div class="container">
      ${sectionHead('物流科技', '以软件、硬件与算法能力，推动供应链数智化升级', { pill: 'LOGISTICS TECHNOLOGY' })}
      <div class="feature-panel">
        <div>
          <h2>让技术成为供应链的<br>确定性能力</h2>
          <p>从智能仓储、智能园区到数智化供应链，京东物流将长期技术投入转化为可落地的行业解决方案。</p>
          <div class="feature-panel__tags"><span>智能仓储</span><span>物流机器人</span><span>数智供应链</span><span>低碳供应链</span></div>
        </div>
        <div class="feature-list">
          <div class="feature-item"><strong>自动化仓储</strong><p>货到人、穿梭车、自动分播等设备与系统协同。</p></div>
          <div class="feature-item"><strong>数字化园区</strong><p>园区运营、安防、能耗与月台调度一体化管理。</p></div>
          <div class="feature-item"><strong>供应链履约</strong><p>订单、库存、仓网与运输计划智能协同。</p></div>
          <div class="feature-item"><strong>绿色低碳</strong><p>碳能管理与绿色包装，支撑可持续供应链。</p></div>
        </div>
      </div>
    </div>
  </section>
  <section class="page-section" id="process">
    <div class="container">
      ${sectionHead('服务流程', '从需求诊断到持续优化，专属团队全程陪伴', { pill: 'HOW WE WORK' })}
      <div class="steps-grid">
        <article class="step-card"><div class="step-card__num">01</div><h3>需求诊断</h3><p>梳理业务场景、履约目标与当前供应链痛点。</p></article>
        <article class="step-card"><div class="step-card__num">02</div><h3>方案设计</h3><p>匹配仓网、运力、系统与服务组合，形成可落地方案。</p></article>
        <article class="step-card"><div class="step-card__num">03</div><h3>落地运营</h3><p>专业团队完成系统对接、入仓与日常运营管理。</p></article>
        <article class="step-card"><div class="step-card__num">04</div><h3>持续优化</h3><p>基于数据复盘履约表现，持续优化成本与体验。</p></article>
      </div>
    </div>
  </section>`;

  writePage('services.html', pageDocument({
    filename: 'services.html',
    title: '服务与产品_京东物流官网复刻',
    description: '京东物流服务与产品二级页面复刻：快递快运、仓配一体、大件、冷链、医药、国际物流与物流科技。',
    nav: 'services',
    body: hero + family + technology
  }), 'services hub');
}

function buildSolutionsHub() {
  const cards = [
    ['consumer', '快消', '消费品行业解决方案', 'assets/img/industry-consumer.jpg', 'consumer-goods.html', '全渠道 E2E 与 BC 同仓'],
    ['apparel', '服装', '服饰行业解决方案', 'assets/img/industry-dress.jpg', 'apparel.html', '入仓、库内运营与柔性履约'],
    ['appliance', '家电', '家电行业解决方案', 'assets/img/industry-appliance.jpg', 'appliance.html', '仓配一体与送装一体'],
    ['digital', '3C', '3C 行业解决方案', 'assets/img/industry-digital.jpg', 'digital.html', '全渠道一盘货与串码管理'],
    ['auto', '汽车', '汽车行业解决方案', 'assets/img/industry-car.jpg', 'auto.html', '入厂物流与售后备件'],
    ['fresh', '生鲜', '生鲜行业解决方案', 'assets/img/industry-fresh.jpg', 'fresh.html', '冷链仓运配与产地直发']
  ];

  const hero = pageHero({
    variant: 'blue',
    image: 'assets/pages/consumer-hero.jpg',
    breadcrumb: [['解决方案']],
    eyebrow: 'INDUSTRY SOLUTIONS',
    title: '行业解决方案',
    subtitle: '深入行业场景，以标准化能力与定制化方案，帮助企业构建更高效、更有韧性的供应链。',
    actions: [
      { label: '联系行业顾问', href: 'contact.html' },
      { label: '查看物流服务', href: 'services.html', kind: 'outline' }
    ]
  });

  const grid = `<section class="page-section" id="industries">
    <div class="container">
      ${sectionHead('服务行业', '从消费品到生鲜，以行业化能力回应不同供应链挑战', { pill: 'INDUSTRIES' })}
      <div class="solutions-hub-grid">${cards.map(([id, title, subtitle, image, href, desc]) => `<a class="solution-hub-card" id="${id}" href="${attr(href)}">
        <div class="solution-hub-card__media"><img src="${attr(image)}" alt="${attr(title)}行业解决方案" loading="lazy"></div>
        <div class="solution-hub-card__content"><span class="solution-hub-card__category">${esc(subtitle)}</span><h3>${esc(title)}</h3><p>${esc(desc)}</p><span class="link-arrow">了解详情 ${icon('i-arrow-right', 'icon icon--xs')}</span></div>
      </a>`).join('')}</div>
    </div>
  </section>`;

  const stats = `<section class="page-section page-section--soft page-section--last" id="why">
    <div class="container">
      ${sectionHead('为什么选择京东物流', '以基础设施、行业经验与数字化能力，为复杂供应链提供确定性', { pill: 'WHY JDL' })}
      <div class="stats-band">
        <div class="stat-box"><strong>3,600+</strong><span>仓库资源，覆盖全国</span></div>
        <div class="stat-box"><strong>99%</strong><span>物流网络人口覆盖</span></div>
        <div class="stat-box"><strong>25</strong><span>海外仓覆盖国家和地区</span></div>
        <div class="stat-box"><strong>7×24</strong><span>小时客户服务响应</span></div>
      </div>
      <div class="section-actions"><a class="btn btn--primary" href="contact.html">获取行业解决方案 ${icon('i-arrow-right', 'icon icon--xs')}</a></div>
    </div>
  </section>`;

  writePage('solutions.html', pageDocument({
    filename: 'solutions.html',
    title: '行业解决方案_京东物流官网复刻',
    description: '京东物流行业解决方案二级页面复刻：快消、服饰、家电、3C、汽车与生鲜行业供应链服务。',
    nav: 'solutions',
    body: hero + grid + stats
  }), 'solutions hub');
}


module.exports = { buildServicesHub, buildSolutionsHub };
