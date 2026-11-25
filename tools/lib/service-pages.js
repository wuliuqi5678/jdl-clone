/* Service, product and industry page builders. */
const {
  esc, attr, icon, pageHero, sectionHead, darkCrumb, advantageCards, matrixCards,
  relatedCards, pageDocument, writePage, ctaMedia
} = require('./page-shell');

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


module.exports = { buildServicePage, buildProductPage, buildIndustryPage };
