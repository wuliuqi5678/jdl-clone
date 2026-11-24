/* Build the second- and third-level pages from the shared shell + page data. */
const fs = require('fs');
const path = require('path');
const {
  services,
  products,
  industries,
  featuredNews,
  listNews,
  aboutTimeline
} = require('./page-data');

const root = process.cwd();
const headerBase = fs.readFileSync(path.join(root, 'partials', 'header.html'), 'utf8');
const footerBase = fs.readFileSync(path.join(root, 'partials', 'footer.html'), 'utf8')
  .replace('id="about"', 'id="siteFooter"');
const commonUi = fs.readFileSync(path.join(root, 'partials', 'common-ui.html'), 'utf8');
const sprite = fs.readFileSync(path.join(root, 'partials', 'sprite.html'), 'utf8');

const esc = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');
const attr = esc;

function icon(name, className = 'icon') {
  return `<svg class="${className}" aria-hidden="true"><use href="#${name}"></use></svg>`;
}

function action(label, href, kind = 'primary', attrs = '') {
  const classes = kind === 'outline'
    ? 'btn btn--outline-light'
    : kind === 'soft'
      ? 'btn btn--soft'
      : 'btn btn--primary';
  return `<a class="${classes}" href="${attr(href)}" ${attrs}>${label}${icon('i-arrow-right', 'icon icon--xs')}</a>`;
}

function crumb(items) {
  return `<nav class="breadcrumbs" aria-label="面包屑"><a href="index.html">首页</a><span>/</span>${items.map((item, index) => {
    const isLast = index === items.length - 1;
    return `${isLast
      ? `<strong>${esc(item)}</strong>`
      : `<a href="${attr(item[1])}">${esc(item[0])}</a><span>/</span>`}`;
  }).join('')}</nav>`;
}

function darkCrumb(items) {
  return `<nav class="breadcrumbs breadcrumbs--dark" aria-label="面包屑"><a href="index.html">首页</a><span>/</span>${items.map((item, index) => {
    const isLast = index === items.length - 1;
    return `${isLast
      ? `<strong>${esc(item)}</strong>`
      : `<a href="${attr(item[1])}">${esc(item[0])}</a><span>/</span>`}`;
  }).join('')}</nav>`;
}

function sectionHead(title, subtitle = '', options = {}) {
  const left = Boolean(options.left);
  const pill = options.pill ? `<span class="section-pill">${esc(options.pill)}</span>` : '';
  return `<div class="page-section__head${left ? ' page-section__head--left' : ''}">
    ${pill}
    <div class="section-heading${left ? ' section-heading--left' : ''}">
      <span class="section-heading__line" aria-hidden="true"></span>
      <h2>${esc(title)}</h2>
      <span class="section-heading__line" aria-hidden="true"></span>
    </div>
    ${subtitle ? `<p class="section-subheading">${esc(subtitle)}</p>` : ''}
  </div>`;
}

function pageHero(config) {
  const classes = [
    'page-hero',
    config.variant ? `page-hero--${config.variant}` : '',
    config.size ? `page-hero--${config.size}` : '',
    config.className || ''
  ].filter(Boolean).join(' ');
  const actions = (config.actions || []).map((item) => action(item.label, item.href, item.kind, item.attrs || '')).join('');
  const meta = config.meta?.length
    ? `<div class="page-hero__meta">${config.meta.map(([value, label]) => `<div><strong>${esc(value)}</strong><span>${esc(label)}</span></div>`).join('')}</div>`
    : '';
  const titleTag = config.titleTag === 'p' ? 'p' : 'h1';
  return `<section class="${classes}">
    <div class="page-hero__bg" style="background-image:url('${attr(config.image)}')" aria-hidden="true"></div>
    <div class="page-hero__overlay" aria-hidden="true"></div>
    <div class="container page-hero__inner">
      ${crumb(config.breadcrumb)}
      ${config.eyebrow ? `<p class="page-hero__eyebrow">${esc(config.eyebrow)}</p>` : ''}
      <${titleTag} class="page-hero__title">${config.title}</${titleTag}>
      <p class="page-hero__lead">${config.subtitle}</p>
      ${actions ? `<div class="page-hero__actions">${actions}</div>` : ''}
      ${meta}
    </div>
  </section>`;
}

function ctaLight() {
  return `<section class="page-cta">
    <div class="container page-cta__inner">
      <div class="page-cta__brand">
        <img src="assets/img/logo.png" width="132" height="22" alt="JDL 京东物流">
        <span class="page-cta__divider" aria-hidden="true"></span>
        <div class="page-cta__slogan"><strong>技术驱动，引领全球高效流通</strong>专属顾问为您定制供应链方案</div>
      </div>
      <div class="page-cta__right">
        <a class="page-cta__phone" href="tel:950616">${icon('i-phone')}<span>950616 <em>7×24 小时服务</em></span></a>
        <a class="btn btn--primary page-cta__btn" href="contact.html">合作咨询 ${icon('i-arrow-right', 'icon icon--xs')}</a>
      </div>
    </div>
  </section>`;
}

function ctaMedia(image, title, text, sectionId = 'contact') {
  return `<section class="page-cta page-cta--media" id="${sectionId}" style="background-image:linear-gradient(90deg,rgba(19,25,34,.88),rgba(19,25,34,.52) 57%,rgba(19,25,34,.28)),url('${attr(image)}')">
    <div class="container page-cta__inner">
      <div>
        <p class="page-cta__eyebrow">LET'S BUILD THE SUPPLY CHAIN TOGETHER</p>
        <h2>${esc(title)}</h2>
        <p>${esc(text)}</p>
      </div>
      <div class="page-cta__right">
        <a class="page-cta__phone" href="tel:950616">${icon('i-phone')}<span>950616 <em>7×24 小时服务</em></span></a>
        <a class="btn btn--primary page-cta__btn" href="contact.html">获取方案 ${icon('i-arrow-right', 'icon icon--xs')}</a>
      </div>
    </div>
  </section>`;
}

function relatedCards(items) {
  return `<div class="related-grid">${items.map(([title, desc, image, href]) => `<a class="related-card" href="${attr(href)}">
    <div class="related-card__media"><img src="${attr(image)}" alt="${attr(title)}" loading="lazy"></div>
    <div class="related-card__body"><h3>${esc(title)}</h3><p>${esc(desc)}</p><span class="link-arrow">了解详情 ${icon('i-arrow-right', 'icon icon--xs')}</span></div>
  </a>`).join('')}</div>`;
}

function advantageCards(items, compact = false) {
  return `<div class="adv-grid">${items.map(([image, title, desc]) => `<article class="adv-card${compact ? ' adv-card--compact' : ''}">
    <div class="adv-card__icon"><img src="${attr(image)}" alt="" loading="lazy"></div>
    <h3>${esc(title)}</h3>
    <p>${esc(desc)}</p>
  </article>`).join('')}</div>`;
}

function matrixCards(items) {
  return `<div class="matrix-grid">${items.map(([title, desc, image, href, tag]) => `<a class="matrix-card" href="${attr(href)}">
    <div class="matrix-card__media"><img src="${attr(image)}" alt="${attr(title)}" loading="lazy"><span class="matrix-card__tag">${esc(tag)}</span></div>
    <div class="matrix-card__body"><div><h3>${esc(title)}</h3><p>${esc(desc)}</p></div><span class="matrix-card__arrow">${icon('i-arrow-right')}</span></div>
  </a>`).join('')}</div>`;
}

function newsDateParts(date) {
  const [year, month, day] = date.split('-');
  return { day, month: `${Number(month)}月`, year };
}

function articleData() {
  const merged = new Map();
  featuredNews.forEach((item) => merged.set(item.id, item));
  listNews.forEach((item) => {
    if (!merged.has(item.id)) {
      merged.set(item.id, {
        ...item,
        body: [
          item.excerpt,
          '京东物流持续以技术驱动供应链效率提升，围绕客户需求完善仓配、快递快运、大件、冷链与国际物流等服务能力，帮助合作伙伴提升履约体验。',
          '面向未来，京东物流将继续推进数字化、自动化与绿色供应链建设，与行业伙伴共同探索更高效、更有韧性的物流基础设施。'
        ],
        tags: [item.category, '京东物流', '供应链']
      });
    }
  });
  return [...merged.values()];
}

const allArticles = articleData();

const DRY_RUN = process.argv.includes('--dry-run');
const featureStyles = [
  'css/features/search.css',
  'css/features/quote.css',
  'css/features/news.css',
  'css/features/article.css',
  'css/features/sitemap.css'
];

function pageDocument({ filename, title, description, nav, body, extraClass = '', cta = ctaLight() }) {
  const activeHeader = setActiveNav(headerBase, nav);
  const styleLinks = ['css/style.css', 'css/pages.css', ...featureStyles]
    .map((href) => `  <link rel="stylesheet" href="${href}">`)
    .join('\n');
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${attr(description)}">
  <meta name="theme-color" content="#e1251b">
  <meta property="og:title" content="${attr(title)}">
  <meta property="og:description" content="${attr(description)}">
  <meta property="og:type" content="website">
  <link rel="icon" href="assets/img/logo.png">
${styleLinks}
</head>
<body class="subpage page-${filename.replace(/\.html$/, '').replace(/[^a-z0-9-]/gi, '-')} ${extraClass}" data-nav="${attr(nav)}">
  <a class="skip-link" href="#main">跳到主要内容</a>
  ${sprite}
  ${activeHeader}
  <main id="main" class="page-main" tabindex="-1">
    ${body}
  </main>
  ${cta}
  ${footerBase}
  ${commonUi}
  <script type="module" src="js/app.js"></script>
</body>
</html>
`;
}

function setActiveNav(header, navKey) {
  if (!navKey) {
    return header.replace(/<li class="nav-item is-active">/, '<li class="nav-item">');
  }
  const hrefMap = {
    home: 'index.html',
    services: 'services.html',
    solutions: 'solutions.html',
    support: 'contact.html',
    esg: 'esg.html',
    about: 'about.html'
  };
  const href = hrefMap[navKey] || 'index.html';
  let out = header.replace(/<li class="nav-item is-active">/, '<li class="nav-item">');
  const escapedHref = href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  out = out.replace(
    new RegExp(`<li class="nav-item( has-mega)?">(\\s*<a class="nav-link" href="${escapedHref}")`),
    '<li class="nav-item$1 is-active">$2'
  );
  return out;
}

function writePage(filename, html, summary = '') {
  if (!DRY_RUN) {
    fs.writeFileSync(path.join(root, filename), html, 'utf8');
  }
  const prefix = DRY_RUN ? '[dry-run] WOULD WRITE' : 'WROTE';
  console.log(`${prefix} ${filename.padEnd(33)} ${(html.length / 1024).toFixed(1).padStart(7)} KB  ${summary}`);
}

/* --------------------------------------------------------------------------
   Level 2: service pages
   -------------------------------------------------------------------------- */

function buildServicePage(config) {
  const hero = pageHero({
    variant: config.heroVariant,
    size: 'service',
    image: config.heroImage,
    breadcrumb: [['服务与产品', 'services.html'], config.title],
    eyebrow: config.eyebrow,
    title: config.title,
    subtitle: config.subtitle,
    actions: [
      { label: '联系顾问', href: 'contact.html' },
      { label: '查看产品', href: '#products', kind: 'outline' }
    ],
    meta: config.heroMeta
  });

  const overview = `<section class="page-section service-overview" id="overview">
    <div class="container">
      ${sectionHead(config.overviewTitle, config.overviewText, { pill: 'SERVICE CAPABILITY' })}
      <div class="process-layout">
        <div class="process-copy">
          <h3>全链路服务保障</h3>
          <p>从揽收到送达，关键节点透明可控</p>
          <div class="process-stats">${config.stats.map(([value, label]) => `<div class="process-stat"><strong>${esc(value)}</strong><span>${esc(label)}</span></div>`).join('')}</div>
        </div>
        <div class="process-visual"><img src="${attr(config.processImage)}" alt="${attr(config.processAlt)}" loading="lazy"></div>
      </div>
    </div>
  </section>`;

  const advantages = `<section class="page-section page-section--soft" id="advantages">
    <div class="container">
      ${sectionHead('产品优势', '以稳定的网络、专业的运营与数字化能力，为每一次交付提供保障', { pill: 'WHY JDL' })}
      ${advantageCards(config.advantages)}
    </div>
  </section>`;

  const productsSection = `<section class="page-section" id="products">
    <div class="container">
      ${config.key === 'supply' ? '<span id="warehouse" class="anchor-target" aria-hidden="true"></span>' : ''}
      ${sectionHead('产品矩阵', '按业务场景选择更匹配的物流产品', { pill: 'PRODUCT MATRIX' })}
      ${matrixCards(config.products)}
      <div class="section-actions"><a class="link-arrow" href="contact.html">获取定制化方案 ${icon('i-arrow-right', 'icon icon--xs')}</a></div>
    </div>
  </section>`;

  const related = `<section class="page-section page-section--soft page-section--last" id="related">
    <div class="container">
      ${sectionHead('相关推荐', '围绕您的业务场景，组合更完整的物流服务', { pill: 'RELATED SERVICES' })}
      ${relatedCards(config.related)}
    </div>
  </section>`;

  writePage(config.page, pageDocument({
    filename: config.page,
    title: config.seoTitle,
    description: config.seoDesc,
    nav: 'services',
    body: hero + overview + advantages + productsSection + related
  }), 'service page');
}

Object.values(services).forEach(buildServicePage);

/* --------------------------------------------------------------------------
   Level 3: product pages
   -------------------------------------------------------------------------- */

function buildProductPage(config) {
  const breadcrumbItems = [
    ['服务与产品', 'services.html'],
    [config.parent[0], config.parent[1]],
    [config.title]
  ];

  const hero = `<section class="product-hero">
    <div class="container">
      ${darkCrumb(breadcrumbItems)}
      <div class="product-hero__panel">
        <div class="product-hero__media"><img src="${attr(config.image)}" alt="${attr(config.title)}"></div>
        <div class="product-hero__content">
          <span class="section-pill">${esc(config.category)}</span>
          <h1>${esc(config.title)}</h1>
          <p>${esc(config.subtitle)}</p>
          <div class="tag-row">${config.tags.map((tag) => `<span class="page-tag">${esc(tag)}</span>`).join('')}</div>
          <div class="page-actions">
            <a class="btn btn--primary" href="contact.html">立即咨询 ${icon('i-arrow-right', 'icon icon--xs')}</a>
            <a class="btn btn--soft" href="${attr(config.parent[1])}">查看${esc(config.parent[0])}</a>
          </div>
          <p class="product-hero__note">${esc(config.heroNote)}</p>
        </div>
      </div>
      <div class="spec-strip">${config.specs.map(([label, value]) => `<div class="spec-item"><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`).join('')}</div>
    </div>
  </section>`;

  const advantages = `<section class="page-section" id="advantages">
    <div class="container">
      ${sectionHead('产品优势', '以稳定的服务能力，满足不同场景下的寄递需求', { pill: 'PRODUCT ADVANTAGES' })}
      ${advantageCards(config.advantages)}
    </div>
  </section>`;

  const info = `<section class="page-section page-section--soft" id="intro">
    <div class="container">
      ${sectionHead('产品介绍', '从时效、覆盖、服务到价格的完整说明', { pill: 'PRODUCT DETAILS' })}
      <div class="info-layout">
        <div class="info-list">${config.info.map(([iconName, title, text]) => `<div class="info-row">
          <div class="info-row__icon">${iconName.startsWith('i-') ? icon(iconName) : `<img src="${attr(iconName)}" alt="" loading="lazy">`}</div>
          <div><h3>${esc(title)}</h3><p>${esc(text)}</p></div>
        </div>`).join('')}</div>
        <aside class="info-aside">
          <p class="info-aside__eyebrow">TAILORED SOLUTION</p>
          <h3>${esc(config.asideTitle)}</h3>
          <p>${esc(config.asideText)}</p>
          <a class="btn btn--primary" href="contact.html">咨询物流顾问 ${icon('i-arrow-right', 'icon icon--xs')}</a>
          <div class="price-note">本页面为课程作业复刻，产品价格、时效与赔付规则均为学习展示，不构成真实服务承诺。</div>
        </aside>
      </div>
    </div>
  </section>`;

  const related = `<section class="page-section page-section--last" id="related">
    <div class="container">
      ${sectionHead('相关推荐', '根据时效、覆盖与货量，组合适合您的产品', { pill: 'RELATED PRODUCTS' })}
      ${relatedCards(config.related)}
    </div>
  </section>`;

  writePage(config.page, pageDocument({
    filename: config.page,
    title: config.seoTitle,
    description: config.seoDesc,
    nav: 'services',
    body: hero + advantages + info + related
  }), 'product page');
}

Object.values(products).forEach(buildProductPage);

/* --------------------------------------------------------------------------
   Level 2: industry pages
   -------------------------------------------------------------------------- */

function buildIndustryPage(config) {
  const hero = pageHero({
    variant: config.heroVariant,
    size: 'industry',
    image: config.heroImage,
    breadcrumb: [['解决方案', 'solutions.html'], config.title],
    eyebrow: 'INDUSTRY SOLUTION',
    title: config.title,
    subtitle: config.subtitle,
    actions: [
      { label: '联系我们', href: 'contact.html' },
      { label: '下载方案详情', href: '#', kind: 'outline', attrs: 'data-demo="下载行业方案（演示）"' }
    ]
  });

  const subnav = `<nav class="page-subnav" aria-label="页面章节">
    <div class="container page-subnav__inner">
      ${config.navItems.map(([id, label], index) => `<a href="#${id}"${index === 0 ? ' class="is-active"' : ''}>${esc(label)}</a>`).join('')}
    </div>
  </nav>`;

  const intro = `<section class="page-section" id="intro">
    <div class="container">
      ${sectionHead('方案介绍', '以一体化供应链能力，回应行业真实业务场景', { pill: 'SOLUTION OVERVIEW' })}
      <div class="industry-intro">
        <div class="industry-intro__media"><img src="${attr(config.diagram)}" alt="${attr(config.title)}流程示意" loading="lazy"></div>
        <div class="industry-quote">
          <strong>${esc(config.intro.strong)}</strong>
          ${config.intro.paragraphs.map((text) => `<p>${esc(text)}</p>`).join('')}
          <div class="industry-note">${icon('i-check')} ${esc(config.intro.note)}</div>
        </div>
      </div>
    </div>
  </section>`;

  const advantages = `<section class="page-section page-section--soft" id="advantages">
    <div class="container">
      ${sectionHead('方案优势', '围绕效率、成本、体验与可持续，构建端到端竞争力', { pill: 'SOLUTION VALUE' })}
      <div class="industry-capabilities">${config.advantages.map(([image, title, desc]) => `<article class="capability-card">
        <div class="capability-card__icon"><img src="${attr(image)}" alt="" loading="lazy"></div>
        <h3>${esc(title)}</h3><p>${esc(desc)}</p>
      </article>`).join('')}</div>
    </div>
  </section>`;

  const scenario = `<section class="page-section" id="scenario">
    <div class="container">
      ${sectionHead('应用场景', '从典型业务痛点出发，让方案真正落地', { pill: 'USE CASES' })}
      <div class="scenario-panel">
        <div class="scenario-panel__media"><img src="${attr(config.scenario.image)}" alt="${attr(config.scenario.imageAlt)}" loading="lazy"></div>
        <div class="scenario-panel__body">
          <h3>${esc(config.scenario.title)}</h3>
          <p>${esc(config.scenario.text)}</p>
          <ul class="check-list">${config.scenario.bullets.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
        </div>
      </div>
    </div>
  </section>`;

  const related = `<section class="page-section page-section--soft page-section--last" id="related">
    <div class="container">
      ${sectionHead('相关推荐', '将行业方案与具体物流产品组合使用', { pill: 'RELATED SERVICES' })}
      ${relatedCards(config.related)}
    </div>
  </section>`;

  const cta = ctaMedia('assets/pages/consumer-cta.jpg', config.ctaTitle, config.ctaText, 'contact');

  writePage(config.page, pageDocument({
    filename: config.page,
    title: config.seoTitle,
    description: config.seoDesc,
    nav: 'solutions',
    body: hero + subnav + intro + advantages + scenario + related,
    cta
  }), 'industry page');
}

Object.values(industries).forEach(buildIndustryPage);

/* --------------------------------------------------------------------------
   Services / solutions hubs
   -------------------------------------------------------------------------- */

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

buildServicesHub();
buildSolutionsHub();

/* --------------------------------------------------------------------------
   News centre + article pages
   -------------------------------------------------------------------------- */

function buildNewsList() {
  const hero = pageHero({
    variant: 'blue',
    size: 'compact',
    className: 'news-page-hero',
    image: 'assets/pages/news-hero.jpg',
    breadcrumb: [['关于京东物流', 'about.html'], ['新闻中心']],
    eyebrow: 'JDL NEWSROOM',
    title: '新闻中心',
    subtitle: '了解京东物流最新资讯、行业洞察与可持续发展实践。',
    actions: [{ label: '联系我们', href: 'contact.html' }]
  });

  const newsFeed = [...allArticles].sort((a, b) => String(b.date).localeCompare(String(a.date)));
  const years = [...new Set(newsFeed.map((item) => String(item.date).slice(0, 4)))].sort((a, b) => b.localeCompare(a));
  const yearOptions = years.map((year) => `<option value="${year}">${year} 年</option>`).join('');
  const rows = newsFeed.map((item) => {
    const d = newsDateParts(item.date);
    const year = String(item.date).slice(0, 4);
    return `<a class="news-row" href="${attr(item.slug)}" data-category="${attr(item.category)}" data-year="${attr(year)}">
      <span class="news-row__thumb"><img src="${attr(item.thumb || item.image)}" alt="${attr(item.title)}" loading="lazy"></span>
      <span class="news-row__body"><h2>${esc(item.title)}</h2><p>${esc(item.excerpt)}</p><span class="news-row__meta"><span class="page-tag">${esc(item.category)}</span><span>京东物流</span></span></span>
      <span class="news-row__date"><strong>${d.day}</strong><small>${d.month}<br>${d.year}</small></span>
    </a>`;
  }).join('');

  const body = `<section class="page-section">
    <div class="container">
      <span id="green" class="anchor-target" aria-hidden="true"></span>
      <div class="news-filter" aria-label="新闻分类">
        <button class="filter-btn is-active" type="button" data-news-filter="all">全部</button>
        <button class="filter-btn" type="button" data-news-filter="企业动态">企业动态</button>
        <button class="filter-btn" type="button" data-news-filter="行业洞察">行业洞察</button>
        <button class="filter-btn" type="button" data-news-filter="ESG">ESG</button>
        <button class="filter-btn" type="button" data-news-filter="服务公告">服务公告</button>
      </div>
      <div class="news-toolbar">
        <label class="news-search" for="newsSearchInput">
          <svg class="icon" aria-hidden="true"><use href="#i-search"></use></svg>
          <span class="sr-only">搜索新闻</span>
          <input id="newsSearchInput" type="search" placeholder="搜索标题或关键词" autocomplete="off" aria-controls="newsList">
        </label>
        <label class="news-year" for="newsYear">
          <span>年份</span>
          <select id="newsYear"><option value="all">全部年份</option>${yearOptions}</select>
        </label>
        <p class="news-count" id="newsCount" aria-live="polite">共 ${newsFeed.length} 条</p>
      </div>
      <div class="news-list" id="newsList">${rows}</div>
      <div class="news-empty" id="newsEmpty" hidden>没有找到匹配的新闻，请调整关键词或筛选条件。</div>
      <span id="activities" class="anchor-target" aria-hidden="true"></span>
      <nav class="pagination" id="newsPagination" aria-label="新闻分页"></nav>
    </div>
  </section>`;

  writePage('news.html', pageDocument({
    filename: 'news.html',
    title: '新闻中心_京东物流最新资讯_京东物流官网复刻',
    description: '京东物流新闻中心二级页面复刻，展示企业动态、行业洞察、ESG 与服务公告。',
    nav: 'about',
    body: hero + body
  }), 'news list');
}

function buildArticle(item) {
  const d = newsDateParts(item.date);
  const latest = listNews.slice(0, 5);
  const index = allArticles.findIndex((article) => article.id === item.id);
  const prev = allArticles[index - 1];
  const next = allArticles[index + 1];
  const hero = pageHero({
    variant: 'blue',
    size: 'compact',
    className: 'news-page-hero',
    image: 'assets/pages/news-hero.jpg',
    breadcrumb: [['关于京东物流', 'about.html'], ['新闻中心', 'news.html'], ['文章详情']],
    eyebrow: 'JDL NEWSROOM',
    title: '新闻中心',
    titleTag: 'p',
    subtitle: '了解京东物流最新资讯、行业洞察与可持续发展实践。',
    actions: [{ label: '返回新闻列表', href: 'news.html', kind: 'outline' }]
  });

  const stats = item.stats ? `<div class="article-stats">${item.stats.map(([value, label]) => `<div><strong>${esc(value)}</strong><span>${esc(label)}</span></div>`).join('')}</div>` : '';
  const tags = (item.tags || [item.category, '京东物流']).map((tag) => `<span>${esc(tag)}</span>`).join('');

  const readingProgress = `<div class="reading-progress" id="readingProgress" role="progressbar" aria-label="文章阅读进度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span class="reading-progress__bar"></span></div>`;

  const body = `${readingProgress}
  <div class="container article-shell">
    <article class="article-main" id="articleContent">
      <header class="article-head">
        <h1>${esc(item.title)}</h1>
        <div class="article-meta"><span class="page-tag">${esc(item.category)}</span><span>${esc(item.dateLabel)}</span><span>京东物流</span><span class="article-reading-time" id="articleReadingTime"></span></div>
        <div class="article-actions" aria-label="文章工具">
          <button class="article-action" type="button" data-copy-link>复制链接</button>
          <button class="article-action" type="button" data-share-article>分享</button>
          <button class="article-action" type="button" data-print-article>打印本文</button>
        </div>
      </header>
      <p class="article-excerpt">${esc(item.excerpt)}</p>
      <figure class="article-cover"><img src="${attr(item.image)}" alt="${attr(item.title)}" loading="eager"></figure>
      <div class="article-body">
        ${(item.body || []).map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}
        ${stats}
        <blockquote class="article-quote">以技术驱动供应链效率提升，让每一次交付更可靠、更高效、更可持续。</blockquote>
        <p>本页面为软件工程课程作业的学习性复刻。新闻正文用于展示三级详情页的信息结构，不作为真实新闻稿使用。</p>
      </div>
      <div class="article-tags">${tags}</div>
      <nav class="article-nav" aria-label="文章导航">
        ${prev ? `<a rel="prev" href="${attr(prev.slug)}">${icon('i-arrow-left')}<span>${esc(prev.title)}</span></a>` : '<span></span>'}
        ${next ? `<a rel="next" href="${attr(next.slug)}"><span>${esc(next.title)}</span>${icon('i-arrow-right')}</a>` : '<span></span>'}
      </nav>
    </article>
    <aside class="article-side">
      <div class="article-side__box">
        <div class="article-side__head"><h2>最新资讯</h2><a href="news.html">更多</a></div>
        <div class="latest-list">${latest.map((news) => `<a class="latest-item" href="${attr(news.slug)}"><img src="${attr(news.image)}" alt="" loading="lazy"><div><p>${esc(news.title)}</p><span>${esc(news.dateLabel)}</span></div></a>`).join('')}</div>
      </div>
      <div class="article-side__cta"><p>希望进一步了解京东物流的供应链服务？</p><a class="btn btn--primary" href="contact.html">联系物流顾问</a></div>
    </aside>
  </div>`;

  writePage(item.slug, pageDocument({
    filename: item.slug,
    title: `${item.title}_京东物流新闻中心复刻`,
    description: item.excerpt,
    nav: 'about',
    body: hero + body
  }), 'news article');
}

buildNewsList();
allArticles.forEach(buildArticle);

/* --------------------------------------------------------------------------
   About
   -------------------------------------------------------------------------- */

function buildAbout() {
  const hero = pageHero({
    variant: 'blue',
    size: 'compact',
    image: 'assets/pages/about-hero.png',
    breadcrumb: [['关于京东物流']],
    eyebrow: 'ABOUT JDL',
    title: '关于京东物流',
    subtitle: '中国领先的技术驱动的供应链解决方案及物流服务商，致力于成为全球最值得信赖的供应链基础设施服务商。',
    actions: [
      { label: '联系我们', href: 'contact.html' },
      { label: '查看新闻中心', href: 'news.html', kind: 'outline' }
    ]
  });

  const subnav = `<nav class="page-subnav" aria-label="关于京东物流章节">
    <div class="container page-subnav__inner">
      <a href="#intro" class="is-active">公司简介</a><a href="#mission">使命及愿景</a><a href="#sustainability">可持续发展</a><a href="#history">发展历程</a><a href="#info">其他信息</a>
    </div>
  </nav>`;

  const intro = `<section class="page-section" id="intro">
    <div class="container">
      ${sectionHead('公司简介', '技术驱动，引领全球高效流通和可持续发展', { pill: 'COMPANY PROFILE' })}
      <div class="about-intro">
        <div class="about-video" id="video">
          <video controls preload="none" poster="assets/pages/about-hero.png" aria-label="京东物流品牌介绍视频">
            <source src="assets/video/hero.mp4" type="video/mp4">
          </video>
          <span class="about-video__badge">${icon('i-play')} JDL 品牌视频</span>
        </div>
        <div class="about-text">
          <h2>中国领先的技术驱动的<br>供应链解决方案及物流服务商</h2>
          <p>京东集团 2007 年开始自建物流，2017 年 4 月正式成立京东物流集团，2021 年 5 月于香港联交所主板上市。</p>
          <p>京东物流以“技术驱动，引领全球高效流通和可持续发展”为使命，致力于成为全球最值得信赖的供应链基础设施服务商，为商家与消费者提供一体化供应链与物流服务。</p>
          <div class="about-stats">
            <div><strong>2007</strong><span>开始自建物流</span></div>
            <div><strong>2021</strong><span>香港联交所上市</span></div>
            <div><strong>3,600+</strong><span>仓库资源</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>`;

  const mission = `<section class="page-section page-section--soft" id="mission">
    <div class="container">
      ${sectionHead('使命及愿景', '以客户为中心，用可信赖的供应链服务持续创造价值', { pill: 'MISSION & VISION' })}
      <div class="mission-grid">
        <article class="mission-card"><div class="mission-card__icon"><img src="assets/pages/about-mission-1.png" alt="" loading="lazy"></div><div class="mission-card__body"><h3>企业使命</h3><p>技术驱动，引领全球高效流通和可持续发展</p></div></article>
        <article class="mission-card"><div class="mission-card__icon"><img src="assets/pages/about-mission-2.png" alt="" loading="lazy"></div><div class="mission-card__body"><h3>企业愿景</h3><p>成为全球最值得信赖的供应链基础设施服务商</p></div></article>
        <article class="mission-card"><div class="mission-card__icon"><img src="assets/pages/about-mission-3.png" alt="" loading="lazy"></div><div class="mission-card__body"><h3>经营理念</h3><p>以客户为中心，用可信赖的供应链服务持续创造价值</p></div></article>
      </div>
    </div>
  </section>`;

  const sustainability = `<section class="page-section" id="sustainability">
    <div class="container">
      ${sectionHead('可持续发展', '助力绿色减排、实体经济、乡村振兴与高质量服务保障', { pill: 'SUSTAINABILITY' })}
      <div class="sustainability-grid">
        <article class="sustain-card"><img src="assets/pages/about-history-1.jpg" alt="绿色可持续发展" loading="lazy"><div class="sustain-card__content"><h3>助力绿色减排，推动绿色供应链发展</h3><p>可循环包装、新能源运力与数字化管理协同推进。</p></div></article>
        <article class="sustain-card"><img src="assets/pages/about-history-2.jpg" alt="助力实体经济" loading="lazy"><div class="sustain-card__content"><h3>助力实体经济，实现高质量发展</h3><p>将数智化供应链能力持续向实体经济开放。</p></div></article>
        <article class="sustain-card"><img src="assets/pages/about-history-3.jpg" alt="助力乡村振兴" loading="lazy"><div class="sustain-card__content"><h3>助力乡村振兴，推进产销高效对接</h3><p>为产地产业带打造更高效的物流新基建。</p></div></article>
        <article class="sustain-card"><img src="assets/pages/about-sustain-2.jpg" alt="高质量服务保障" loading="lazy"><div class="sustain-card__content"><h3>高质量保障，体育赛事服务</h3><p>以专业物流能力服务大型赛事与公共活动。</p></div></article>
      </div>
      <div class="section-actions"><a class="link-arrow" href="esg.html">查看可持续发展专题 ${icon('i-arrow-right', 'icon icon--xs')}</a></div>
    </div>
  </section>`;

  const initial = aboutTimeline[0];
  const timeline = `<section class="page-section page-section--soft" id="history">
    <div class="container">
      ${sectionHead('发展历程', '从自建物流到开放供应链，持续拓展服务边界', { pill: 'MILESTONES' })}
      <div class="company-timeline" id="companyTimeline">
        <div class="timeline-years" role="tablist" aria-label="公司发展年份">
          ${aboutTimeline.map((item, index) => `<button class="timeline-year${index === 0 ? ' is-active' : ''}" type="button" role="tab" aria-selected="${index === 0}" data-year="${esc(item.year)}">${esc(item.year)}</button>`).join('')}
        </div>
        <div class="timeline-panel">
          <div class="timeline-panel__media"><img id="timelineImage" src="${attr(initial.image)}" alt="${attr(initial.year)}年京东物流发展历程" loading="lazy"></div>
          <div class="timeline-panel__body"><span id="timelineYear">${esc(initial.year)}</span><h3 id="timelineTitle">${esc(initial.title)}</h3><p id="timelineText">${esc(initial.text)}</p></div>
        </div>
      </div>
    </div>
  </section>
  <script type="application/json" id="timelineData">${JSON.stringify(aboutTimeline)}</script>`;

  const info = `<section class="page-section page-section--last" id="info">
    <div class="container">
      ${sectionHead('其他信息', '了解更多关于京东物流的能力与责任', { pill: 'MORE ABOUT US' })}
      <div class="other-grid">
        <article class="other-card"><img src="assets/pages/about-other-1.jpg" alt="企业荣誉" loading="lazy"><div class="other-card__content"><h3>企业荣誉</h3><p>了解京东物流在行业与社会责任方面获得的认可。</p><a class="link-arrow" href="news.html">了解详情 ${icon('i-arrow-right', 'icon icon--xs')}</a></div></article>
        <article class="other-card"><img src="assets/pages/about-other-2.jpg" alt="信息安全" loading="lazy"><div class="other-card__content"><h3>信息安全</h3><p>以完善的安全管理体系守护客户数据与业务连续性。</p><a class="link-arrow" href="contact.html">了解详情 ${icon('i-arrow-right', 'icon icon--xs')}</a></div></article>
      </div>
    </div>
  </section>`;

  writePage('about.html', pageDocument({
    filename: 'about.html',
    title: '公司介绍_京东物流官网复刻',
    description: '京东物流公司介绍二级页面复刻：公司简介、使命愿景、可持续发展、发展历程与企业信息。',
    nav: 'about',
    body: hero + subnav + intro + mission + sustainability + timeline + info
  }), 'about page');
}

buildAbout();

/* --------------------------------------------------------------------------
   Contact + support
   -------------------------------------------------------------------------- */

function buildContact() {
  const hero = `<section class="contact-page-hero">
    <div class="container">
      ${darkCrumb([['服务支持', 'contact.html'], ['联系我们']])}
      <div class="contact-page-hero__inner">
        <div><p class="section-pill">CONTACT JDL</p><h1>联系我们</h1><p>无论是个人寄件、企业合作还是供应链咨询，京东物流都愿意倾听您的需求，为您提供专业支持。</p></div>
        <div class="contact-page-hero__phone"><span>全国客户服务热线</span><a href="tel:950616">${icon('i-phone')}950616</a></div>
      </div>
    </div>
  </section>`;

  const contact = `<section class="container contact-grid">
    <div class="contact-info">
      <div class="contact-info__head"><p class="section-pill">GET IN TOUCH</p><h2>让专业团队<br>回应您的物流需求</h2><p>提交需求后，物流顾问将根据业务场景与您进一步沟通。</p></div>
      <div class="contact-info-list">
        <div class="contact-info-item"><span class="contact-info-item__icon">${icon('i-phone')}</span><div><h3>全国客服热线</h3><p>950616 · 7×24 小时客户服务</p></div></div>
        <div class="contact-info-item"><span class="contact-info-item__icon">${icon('i-location')}</span><div><h3>总部地址</h3><p>北京市大兴区亦庄经济开发区京东物流大厦</p></div></div>
        <div class="contact-info-item"><span class="contact-info-item__icon">${icon('i-clock')}</span><div><h3>服务时间</h3><p>客服 7×24 小时在线；企业合作工作日 9:00-18:00</p></div></div>
        <div class="contact-info-item"><span class="contact-info-item__icon">${icon('i-headset')}</span><div><h3>企业合作</h3><p>仓配、快递、冷链、国际物流与行业解决方案咨询</p></div></div>
      </div>
      <div class="qr-strip">
        <div class="qr-strip__copy"><h3>关注京东物流</h3><p>获取服务资讯与专属顾问支持</p></div>
        <div class="qr-strip__items">
          <div class="qr-strip__item"><img src="assets/img/qr-wechat.jpg" alt="微信公众号二维码" loading="lazy"><span>公众号</span></div>
          <div class="qr-strip__item"><img src="assets/img/qr-mini.jpg" alt="小程序二维码" loading="lazy"><span>小程序</span></div>
          <div class="qr-strip__item"><img src="assets/img/qr-qiwei.png" alt="企业微信二维码" loading="lazy"><span>企业微信</span></div>
        </div>
      </div>
    </div>
    <div class="contact-form-card">
      <div class="contact-form-card__head"><p class="section-pill">BUSINESS CONSULTATION</p><h2>合作咨询</h2><p>请填写以下信息，我们会尽快与您联系。此表单为课程作业演示，不会发送真实数据。</p></div>
      <form id="pageConsultForm" novalidate>
        <div class="form-grid">
          <label class="field"><span>您的称呼</span><input type="text" name="name" autocomplete="name" placeholder="请输入姓名"></label>
          <label class="field"><span>联系电话</span><input type="tel" name="phone" inputmode="tel" autocomplete="tel" placeholder="请输入手机号"></label>
        </div>
        <label class="field"><span>公司名称</span><input type="text" name="company" autocomplete="organization" placeholder="请输入公司名称"></label>
        <label class="field"><span>咨询方向</span><select name="topic"><option>仓配一体服务</option><option>快递快运服务</option><option>大件 / 冷链服务</option><option>行业解决方案</option><option>国际物流服务</option><option>其他合作</option></select></label>
        <label class="field"><span>需求描述 <small>选填</small></span><textarea name="message" rows="4" placeholder="简单描述您的业务场景与物流需求"></textarea></label>
        <p class="form-message" id="pageConsultMessage" role="alert"></p>
        <button class="btn btn--primary btn--block" type="submit">提交咨询 ${icon('i-arrow-right', 'icon icon--xs')}</button>
      </form>
    </div>
  </section>`;

  const support = `<section class="page-section page-section--soft" id="support">
    <div class="container">
      ${sectionHead('服务支持', '快速找到您需要的查询工具与常见问题解答', { pill: 'SERVICE SUPPORT' })}
      <div class="support-grid">
        <a class="support-card" href="index.html?track=1" data-track-open>${icon('i-search')}<h3>运单查询</h3><p>输入运单号或包裹号，查看模拟物流轨迹。</p></a>
        <a class="support-card" href="contact.html#support" data-quote-open>${icon('i-clock')}<h3>运费时效查询</h3><p>获取寄件价格与服务时效参考。</p></a>
        <a class="support-card" href="contact.html#support">${icon('i-map')}<h3>网点查询</h3><p>查询附近服务网点与覆盖范围。</p></a>
        <a class="support-card" href="contact.html#support">${icon('i-help')}<h3>服务范围查询</h3><p>了解寄件与配送服务覆盖区域。</p></a>
      </div>
      <div class="faq-layout" style="margin-top:42px">
        <div class="faq-layout__intro"><p class="section-pill">FAQ</p><h2>常见问题</h2><p>以下为复刻页面中的服务说明与演示内容，如需真实业务支持请联系官方客服。</p></div>
        <div class="faq-list">
          <details class="faq-item" open><summary>如何查询运单？</summary><p>在首页或本页点击“运单查询”，输入演示运单号即可查看模拟物流轨迹。该功能不连接真实物流接口。</p></details>
          <details class="faq-item"><summary>企业合作如何联系？</summary><p>您可以通过本页合作咨询表单留下需求，或拨打 950616 联系客服。课程作业页面的表单仅作演示。</p></details>
          <details class="faq-item"><summary>是否支持冷链、大件或国际物流？</summary><p>京东物流提供冷链、大件、国际物流等服务。本复刻站已整理服务与产品入口，可在“服务与产品”页面查看。</p></details>
          <details class="faq-item"><summary>页面上的价格和时效是真实数据吗？</summary><p>不是。页面内容用于课程作业展示，产品价格、时效、赔付与服务承诺均不代表真实业务信息。</p></details>
        </div>
      </div>
    </div>
  </section>`;

  writePage('contact.html', pageDocument({
    filename: 'contact.html',
    title: '联系我们_京东物流官网复刻',
    description: '京东物流联系我们与服务支持页面复刻：客服热线、合作咨询、运单查询与常见问题。',
    nav: 'support',
    body: hero + contact + support
  }), 'contact page');
}

buildContact();

/* --------------------------------------------------------------------------
   ESG
   -------------------------------------------------------------------------- */

function buildEsg() {
  const hero = pageHero({
    variant: 'green',
    image: 'assets/pages/about-sustain-1.jpg',
    breadcrumb: [['可持续发展']],
    eyebrow: 'SUSTAINABILITY',
    title: '可持续发展',
    subtitle: '围绕碳中和目标，以可循环包装、绿色园区和新能源运力，构建绿色、数字化、全量化的可持续供应链。',
    actions: [
      { label: '查看 ESG 报告', href: '#reports', kind: 'outline' },
      { label: '联系我们', href: 'contact.html' }
    ]
  });

  const subnav = `<nav class="page-subnav" aria-label="可持续发展章节">
    <div class="container page-subnav__inner"><a href="#commitment" class="is-active">我们的承诺</a><a href="#actions">绿色行动</a><a href="#green">青流计划</a><a href="#reports">报告与数据</a><a href="#carbon">碳足迹</a></div>
  </nav>`;

  const commitment = `<section class="page-section" id="commitment">
    <div class="container">
      ${sectionHead('我们的承诺', '让物流更绿色，让增长更可持续', { pill: 'OUR COMMITMENT' })}
      <div class="industry-intro">
        <div class="industry-quote" style="padding-top:0">
          <strong>将可持续发展融入每一个物流环节</strong>
          <p>京东物流长期推进绿色供应链建设，携手上下游合作伙伴推广循环包装、清洁能源车辆与数字化运营管理，探索更加低碳的物流基础设施。</p>
          <p>通过绿色仓储、绿色运输、绿色包装与绿色园区的协同，减少全链路资源消耗与环境影响。</p>
          <div class="industry-note">${icon('i-leaf')} 以技术驱动绿色供应链，兼顾效率、成本与环境价值。</div>
        </div>
        <div class="esg-stat-grid" style="margin-top:0">
          <div class="esg-stat"><strong>2017</strong><span>青流计划启动</span></div>
          <div class="esg-stat"><strong>25</strong><span>海外仓覆盖国家和地区</span></div>
          <div class="esg-stat"><strong>3,400</strong><span>万平方米仓储管理面积</span></div>
        </div>
      </div>
    </div>
  </section>`;

  const actions = `<section class="page-section page-section--soft" id="actions">
    <div class="container">
      ${sectionHead('绿色行动', '从包装、园区到运力，持续拓展低碳实践', { pill: 'GREEN ACTIONS' })}
      <div class="esg-action-grid">
        <a class="esg-action" href="news.html#green"><img src="assets/pages/about-history-1.jpg" alt="绿色供应链" loading="lazy"><div class="esg-action__content"><span>GREEN SUPPLY CHAIN</span><h3>绿色供应链</h3><p>可循环器具、智能园区与新能源运力协同减碳。</p></div></a>
        <a class="esg-action" href="news.html#green"><img src="assets/pages/about-history-3.jpg" alt="乡村振兴" loading="lazy"><div class="esg-action__content"><span>RURAL REVITALIZATION</span><h3>乡村振兴</h3><p>为产地产业带提供物流新基建。</p></div></a>
        <a class="esg-action" href="news.html#green"><img src="assets/pages/about-sustain-2.jpg" alt="高质量保障" loading="lazy"><div class="esg-action__content"><span>QUALITY SERVICE</span><h3>高质量保障</h3><p>以专业能力服务大型活动与多元场景。</p></div></a>
        <a class="esg-action" href="news.html#green"><img src="assets/pages/about-history-2.jpg" alt="实体经济" loading="lazy"><div class="esg-action__content"><span>REAL ECONOMY</span><h3>实体经济</h3><p>供应链能力向产业带与实体企业开放。</p></div></a>
        <a class="esg-action" href="news.html#green"><img src="assets/pages/about-sustain-3.jpg" alt="绿色包装" loading="lazy"><div class="esg-action__content"><span>GREEN PACKAGING</span><h3>绿色包装</h3><p>推广可循环包装与减量化设计。</p></div></a>
      </div>
    </div>
  </section>`;

  const green = `<section class="page-section" id="green">
    <div class="container">
      ${sectionHead('青流计划', '携手合作伙伴，推动绿色物流规模化落地', { pill: 'GREEN INITIATIVE' })}
      <div class="feature-panel">
        <div><h2>让绿色成为<br>供应链的长期能力</h2><p>从包装减量、循环使用到新能源运输，青流计划联合品牌商、供应商与消费者，共同推动物流绿色转型。</p><div class="feature-panel__tags"><span>循环包装</span><span>新能源运力</span><span>绿色园区</span><span>碳能管理</span></div></div>
        <div class="feature-list"><div class="feature-item"><strong>包装减量</strong><p>减少一次性包装使用，推广可循环包装。</p></div><div class="feature-item"><strong>绿色运输</strong><p>新能源车辆与清洁能源在物流场景应用。</p></div><div class="feature-item"><strong>绿色园区</strong><p>园区能耗、碳排与资源使用数字化管理。</p></div><div class="feature-item"><strong>协同减碳</strong><p>与上下游伙伴共同推进供应链减排。</p></div></div>
      </div>
    </div>
  </section>`;

  const reports = `<section class="page-section page-section--soft" id="reports">
    <div class="container">
      ${sectionHead('报告与数据', '以透明披露回应利益相关方关注', { pill: 'REPORTS & DATA' })}
      <div class="report-list">
        <div class="report-row"><span class="report-row__title">京东物流 2025 年 ESG 报告</span><span class="report-row__meta">2026.04</span><a class="report-row__link" href="#" data-demo="下载 ESG 报告（演示）">下载报告 PDF</a></div>
        <div class="report-row"><span class="report-row__title">京东物流 2024 年 ESG 报告</span><span class="report-row__meta">2025.04</span><a class="report-row__link" href="#" data-demo="下载 ESG 报告（演示）">下载报告 PDF</a></div>
        <div class="report-row"><span class="report-row__title">标普全球 CSA 评分与可持续发展年鉴</span><span class="report-row__meta">2026.10</span><a class="report-row__link" href="#" data-demo="查看报告（演示）">查看详情</a></div>
      </div>
    </div>
  </section>
  <section class="page-section" id="carbon">
    <div class="container">
      <div class="feature-panel" style="grid-template-columns:1fr .8fr">
        <div><h2>碳足迹计算</h2><p>通过物流数据估算运输与包装环节的碳排放，为绿色供应链决策提供参考。本复刻站仅展示入口，不提供真实计算。</p><a class="btn btn--outline-light" href="#" data-demo="碳足迹计算（演示）" style="margin-top:20px">开始计算 ${icon('i-arrow-right', 'icon icon--xs')}</a></div>
        <div class="feature-list"><div class="feature-item"><strong>运输排放</strong><p>按运输方式与里程估算。</p></div><div class="feature-item"><strong>包装排放</strong><p>按包装材质与使用量估算。</p></div><div class="feature-item"><strong>仓储能耗</strong><p>按仓储面积与运营时间估算。</p></div><div class="feature-item"><strong>绿色建议</strong><p>提供减碳路径与优化方向。</p></div></div>
      </div>
    </div>
  </section>`;

  writePage('esg.html', pageDocument({
    filename: 'esg.html',
    title: '可持续发展_京东物流官网复刻',
    description: '京东物流可持续发展页面复刻：绿色供应链、青流计划、ESG 报告与碳足迹计算。',
    nav: 'esg',
    body: hero + subnav + commitment + actions + green + reports
  }), 'esg page');
}

function buildSitemap() {
  const hero = pageHero({
    variant: 'blue',
    size: 'compact',
    image: 'assets/pages/news-hero.jpg',
    breadcrumb: [['网站地图']],
    eyebrow: 'SITE MAP',
    title: '网站地图',
    subtitle: '从服务、产品、行业方案到新闻与公司信息，一页浏览京东物流复刻站的全部内容。'
  });

  const articleLinks = [...allArticles]
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
    .map((article) => [article.title, article.slug, `${article.dateLabel} · ${article.category}`]);

  const groups = [
    {
      id: 'home',
      title: '首页',
      links: [
        ['京东物流首页', 'index.html', '品牌首屏、服务、行业、物流网络与新闻']
      ]
    },
    {
      id: 'services',
      title: '服务与产品',
      links: [
        ['服务与产品', 'services.html', '全部服务能力总览'],
        ['快递服务', 'express.html', '快递、快运与增值服务'],
        ['快运服务', 'freight.html', '20KG 以上大件物流运输'],
        ['仓配一体服务', 'supply-chain.html', '仓运配一体化供应链服务'],
        ['京东特快', 'express-jd-fastest.html', '时效领先的门到门寄递服务'],
        ['京东标快', 'express-jd-standard.html', '时效稳定的门到门寄递服务'],
        ['重货标快', 'freight-fast-cargo.html', '20KG 以上大件运输服务'],
        ['整车直达', 'freight-vehicle.html', '3000KG 以上专车运输']
      ]
    },
    {
      id: 'solutions',
      title: '行业解决方案',
      links: [
        ['行业解决方案', 'solutions.html', '行业方案总览'],
        ['快消行业解决方案', 'consumer-goods.html', '全渠道 E2E 供应链服务'],
        ['服饰行业解决方案', 'apparel.html', '入仓、库内运营与全渠道履约'],
        ['家电行业解决方案', 'appliance.html', '仓配装一体化与售后网络'],
        ['3C 行业解决方案', 'digital.html', '全渠道一盘货与串码管理'],
        ['汽车行业解决方案', 'auto.html', '入厂物流与售后备件'],
        ['生鲜行业解决方案', 'fresh.html', '冷链一体化与产地直发']
      ]
    },
    {
      id: 'news',
      title: '新闻中心',
      links: [
        ['新闻中心', 'news.html', '分类筛选、搜索与新闻列表'],
        ...articleLinks
      ]
    },
    {
      id: 'about',
      title: '关于与支持',
      links: [
        ['公司介绍', 'about.html', '公司简介、使命愿景、可持续发展与发展历程'],
        ['联系我们', 'contact.html', '客服热线、合作咨询与服务支持'],
        ['可持续发展', 'esg.html', '绿色行动、青流计划、ESG 报告与碳足迹']
      ]
    }
  ];

  const groupsMarkup = groups.map((group) => `
    <section class="sitemap-group" aria-labelledby="sitemap-${group.id}">
      <h2 id="sitemap-${group.id}">${esc(group.title)}</h2>
      <div class="sitemap-links">
        ${group.links.map(([title, href, desc]) => `<a class="sitemap-link" href="${attr(href)}"><span class="sitemap-link__title">${esc(title)}</span><span class="sitemap-link__desc">${esc(desc)}</span><span class="sitemap-link__arrow" aria-hidden="true">→</span></a>`).join('')}
      </div>
    </section>`).join('');
  const total = groups.reduce((sum, group) => sum + group.links.length, 0);

  const body = `<section class="page-section">
    <div class="container">
      ${sectionHead('站点导航', '一个页面浏览全部复刻内容', { pill: 'SITE MAP' })}
      <div class="sitemap-groups">${groupsMarkup}</div>
      <p class="sitemap-note">本页共收录 ${total} 个内容页面（不含网站地图自身）。所有页面均为课程作业复刻，不代表京东物流官方内容。</p>
    </div>
  </section>`;

  writePage('sitemap.html', pageDocument({
    filename: 'sitemap.html',
    title: '网站地图_京东物流官网复刻',
    description: '京东物流复刻站网站地图，汇总服务、产品、行业解决方案、新闻、公司与支持页面。',
    nav: '',
    body: hero + body
  }), 'sitemap page');
}

buildEsg();
buildSitemap();

console.log(`\nGenerated ${allArticles.length} news article pages and 1 sitemap page.`);
