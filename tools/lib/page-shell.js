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
} = require('../page-data');

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

module.exports = {
  root, esc, attr, icon, action, crumb, darkCrumb, sectionHead, pageHero,
  ctaLight, ctaMedia, relatedCards, advantageCards, matrixCards, newsDateParts,
  articleData, allArticles, DRY_RUN, featureStyles, pageDocument, setActiveNav, writePage
};
