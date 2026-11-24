/* One-time refactor: extract shared chrome from index.html, update its
   navigation to the new multi-page structure, and write reusable partials. */
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const indexPath = path.join(root, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

fs.mkdirSync(path.join(root, 'partials'), { recursive: true });
fs.mkdirSync(path.join(root, 'reference'), { recursive: true });
fs.writeFileSync(path.join(root, 'reference', 'index.pre-subpages.html'), html, 'utf8');

function cut(startMarker, endMarker) {
  const start = html.indexOf(startMarker);
  if (start === -1) throw new Error(`start marker not found: ${startMarker}`);
  const end = html.indexOf(endMarker, start);
  if (end === -1) throw new Error(`end marker not found: ${endMarker}`);
  return { start, end: end + endMarker.length, text: html.slice(start, end + endMarker.length) };
}

const spriteBlock = cut('<svg class="svg-sprite"', '</svg>');
const headerBlock = cut('  <div class="topbar">', '  </header>');
const footerBlock = cut('  <footer class="site-footer"', '  </footer>');
const commonBlock = cut('  <div class="float-rail"', '  <script src="js/main.js"></script>');

const replacements = [
  // Generic anchors converted to standalone page URLs.
  ['href="#home"', 'href="index.html"'],
  ['href="#services"', 'href="services.html"'],
  ['href="#solutions"', 'href="solutions.html"'],
  ['href="#contact"', 'href="contact.html"'],
  ['href="#about"', 'href="about.html"'],
  ['href="#news"', 'href="news.html"'],
  ['href="#network"', 'href="services.html#technology"'],

  // Service and product destinations.
  ['href="services.html">快递快运服务', 'href="express.html">快递快运服务'],
  ['href="services.html">仓配一体服务', 'href="supply-chain.html">仓配一体服务'],
  ['href="services.html">大件服务', 'href="services.html#bulky">大件服务'],
  ['href="services.html">送仓服务', 'href="supply-chain.html#warehouse">送仓服务'],
  ['href="services.html">冷链服务', 'href="services.html#coldchain">冷链服务'],
  ['href="services.html">医药服务', 'href="services.html#medical">医药服务'],
  ['href="services.html">国际物流', 'href="services.html#global">国际物流'],
  ['href="services.html">寄快递', 'href="express.html">寄快递'],
  ['href="services.html">京东服务', 'href="services.html#service-plus">京东服务'],
  ['href="services.html">京东特快', 'href="express-jd-fastest.html">京东特快'],
  ['href="services.html">京东标快', 'href="express-jd-standard.html">京东标快'],
  ['href="services.html">查快递 <span>Track</span>', 'href="index.html?track=1" data-track-open>查快递 <span>Track</span>'],
  ['href="services.html#technology">专线包仓', 'href="services.html#capacity">专线包仓'],
  ['href="services.html#technology">全货机包机', 'href="services.html#capacity">全货机包机'],

  // Industry destinations.
  ['href="solutions.html" data-industry-jump="0">快消', 'href="consumer-goods.html">快消'],
  ['href="solutions.html" data-industry-jump="1">服装', 'href="solutions.html#apparel">服装'],
  ['href="solutions.html" data-industry-jump="2">家电', 'href="solutions.html#appliance">家电'],
  ['href="solutions.html" data-industry-jump="3">3C', 'href="digital.html">3C'],
  ['href="solutions.html" data-industry-jump="4">汽车', 'href="solutions.html#auto">汽车'],
  ['href="solutions.html" data-industry-jump="5">生鲜', 'href="fresh.html">生鲜'],

  // Service support destinations.
  ['href="services.html">运费时效查询 <span>Price &amp; time</span>', 'href="contact.html#support">运费时效查询 <span>Price &amp; time</span>'],
  ['href="services.html#technology">网点查询 <span>Network</span>', 'href="contact.html#support">网点查询 <span>Network</span>'],
  ['href="services.html#technology">服务范围查询 <span>Coverage</span>', 'href="contact.html#support">服务范围查询 <span>Coverage</span>'],
  ['href="index.html" data-demo="个人寄件"', 'href="express.html" data-demo="个人寄件"'],
  ['href="index.html" data-demo="批量下单"', 'href="contact.html" data-demo="批量下单"'],
  ['href="index.html" data-demo="企业寄件"', 'href="contact.html" data-demo="企业寄件"'],
  ['href="index.html" data-track-open>运单查询', 'href="index.html?track=1" data-track-open>运单查询'],

  // Sustainability destinations.
  ['<a class="nav-link" href="services.html#technology" aria-expanded="false">可持续发展</a>', '<a class="nav-link" href="esg.html" aria-expanded="false">可持续发展</a>'],
  ['href="services.html#technology">ESG 报告 <span>Report</span>', 'href="esg.html#reports">ESG 报告 <span>Report</span>'],
  ['href="services.html#technology">我们的承诺 <span>Commitment</span>', 'href="esg.html#commitment">我们的承诺 <span>Commitment</span>'],
  ['href="services.html#technology">我们的行动 <span>Action</span>', 'href="esg.html#actions">我们的行动 <span>Action</span>'],
  ['href="services.html#technology">青流计划 <span>Green</span>', 'href="esg.html#green">青流计划 <span>Green</span>'],
  ['href="news.html">环保资讯 <span>News</span>', 'href="news.html">环保资讯 <span>News</span>'],
  ['href="services.html#technology">碳足迹计算 <span>Carbon</span>', 'href="esg.html#carbon">碳足迹计算 <span>Carbon</span>'],

  // About destinations.
  ['href="about.html">视频中心', 'href="about.html#video">视频中心'],

  // Drawer + footer specifics.
  ['href="services.html" data-menu-close>快递快运服务', 'href="express.html" data-menu-close>快递快运服务'],
  ['href="services.html" data-menu-close>仓配一体服务', 'href="supply-chain.html" data-menu-close>仓配一体服务'],
  ['href="services.html" data-menu-close>大件服务', 'href="services.html#bulky" data-menu-close>大件服务'],
  ['href="services.html" data-menu-close>冷链服务', 'href="services.html#coldchain" data-menu-close>冷链服务'],
  ['href="services.html" data-menu-close>国际物流', 'href="services.html#global" data-menu-close>国际物流'],
  ['href="solutions.html" data-menu-close>快消行业', 'href="consumer-goods.html" data-menu-close>快消行业'],
  ['href="solutions.html" data-menu-close>服装行业', 'href="solutions.html#apparel" data-menu-close>服装行业'],
  ['href="solutions.html" data-menu-close>家电行业', 'href="solutions.html#appliance" data-menu-close>家电行业'],
  ['href="solutions.html" data-menu-close>3C 行业', 'href="digital.html" data-menu-close>3C 行业'],
  ['href="solutions.html" data-menu-close>汽车行业', 'href="solutions.html#auto" data-menu-close>汽车行业'],
  ['href="solutions.html" data-menu-close>生鲜行业', 'href="fresh.html" data-menu-close>生鲜行业'],
  ['href="services.html" data-menu-close>运费时效查询', 'href="contact.html#support" data-menu-close>运费时效查询'],
  ['href="contact.html" data-menu-close>在线客服', 'href="contact.html" data-menu-close>在线客服'],
  ['href="services.html#technology" data-menu-close>网点查询', 'href="contact.html#support" data-menu-close>网点查询'],
  ['href="services.html#technology" data-menu-close>可持续发展', 'href="esg.html" data-menu-close>可持续发展'],
  ['href="about.html" data-menu-close>关于京东物流', 'href="about.html" data-menu-close>关于京东物流'],
  ['href="contact.html" data-consult data-menu-close>合作咨询', 'href="contact.html" data-consult data-menu-close>合作咨询'],
  ['href="contact.html" aria-label="联系我们"', 'href="contact.html" aria-label="联系我们"']
];

function transform(block) {
  let out = block;
  for (const [from, to] of replacements) out = out.split(from).join(to);
  return out;
}

const newHeader = transform(headerBlock.text);
const newFooter = transform(footerBlock.text);
const newCommon = transform(commonBlock.text);

// Footer-specific link upgrades (less ambiguous than global replacements).
let footerOut = newFooter
  .replace('href="services.html">寄快递</a>', 'href="express.html">寄快递</a>')
  .replace('href="services.html#technology">服务范围查询</a>', 'href="contact.html#support">服务范围查询</a>')
  .replace('href="services.html#technology">ESG</a>', 'href="esg.html">ESG</a>')
  .replace('href="services.html#technology" data-demo="碳足迹计算">碳足迹计算</a>', 'href="esg.html#carbon">碳足迹计算</a>')
  .replace('href="services.html#technology">绿色物流</a>', 'href="esg.html#actions">绿色物流</a>')
  .replace('href="news.html">环保资讯</a>', 'href="news.html#green">环保资讯</a>')
  .replace('href="contact.html" data-demo="服务细则">服务细则</a>', 'href="contact.html#support">服务细则</a>');

const newSprite = spriteBlock.text;

// Rebuild index.html with the shared chrome and new links.
let rebuilt = html;
const parts = [
  [commonBlock, newCommon],
  [footerBlock, footerOut],
  [headerBlock, newHeader],
  [spriteBlock, newSprite]
].sort((a, b) => b[0].start - a[0].start);

for (const [block, replacement] of parts) {
  rebuilt = rebuilt.slice(0, block.start) + replacement + rebuilt.slice(block.end);
}

// Mark the home page and point homepage content into the new page graph.
rebuilt = rebuilt.replace('<body>', '<body class="home-page" data-nav="home">');

const homeBodyReplacements = [
  ['<a href="#services" class="quick-link">\n                <span class="quick-link__icon quick-link__icon--send"', '<a href="express.html" class="quick-link">\n                <span class="quick-link__icon quick-link__icon--send"'],
  ['<a href="#services" class="quick-link">\n                <span class="quick-link__icon quick-link__icon--aging"', '<a href="express.html#products" class="quick-link">\n                <span class="quick-link__icon quick-link__icon--aging"'],
  ['<a href="#network" class="quick-link">\n                <span class="quick-link__icon quick-link__icon--range"', '<a href="contact.html#support" class="quick-link">\n                <span class="quick-link__icon quick-link__icon--range"'],
  ['<a href="#network" class="quick-link">\n                <span class="quick-link__icon quick-link__icon--network"', '<a href="contact.html#support" class="quick-link">\n                <span class="quick-link__icon quick-link__icon--network"'],
  ['href="#news" data-demo="新闻详情：一图看懂前三季度业绩"', 'href="news-8364.html"'],
  ['href="#news" data-demo="新闻详情：2025年ESG报告"', 'href="news-7577.html"'],
  ['href="#news" data-demo="新闻详情：国际软件研发诺贝尔奖"', 'href="news-7569.html"'],
  ['href="#news" data-demo="新闻详情：香港海关AEO认证"', 'href="news-6402.html"'],
  ['href="#news" data-demo="更多新闻列表"', 'href="news.html"'],
  ['href="#news" data-demo="更多活动列表"', 'href="news.html#activities"']
];
for (const [from, to] of homeBodyReplacements) rebuilt = rebuilt.split(from).join(to);

// Add a service-detail link and an industry-detail link on the home page.
rebuilt = rebuilt.replace(
  '<button class="btn btn--primary service-consult" type="button" data-consult>立即咨询 <svg class="icon icon--xs"><use href="#i-arrow-right"></use></svg></button>',
  '<div class="service-panel__actions"><button class="btn btn--primary service-consult" type="button" data-consult>立即咨询 <svg class="icon icon--xs"><use href="#i-arrow-right"></use></svg></button><a class="text-link service-page-link" id="servicePageLink" href="express.html">查看服务详情 <svg class="icon icon--xs"><use href="#i-arrow-right"></use></svg></a></div>'
);
rebuilt = rebuilt.replace(
  '<button class="btn btn--primary btn--industry" type="button" data-consult>了解更多 <svg class="icon icon--xs"><use href="#i-arrow-right"></use></svg></button>',
  '<a class="btn btn--primary btn--industry" id="industryMoreLink" href="consumer-goods.html">了解更多 <svg class="icon icon--xs"><use href="#i-arrow-right"></use></svg></a>'
);

fs.writeFileSync(indexPath, rebuilt, 'utf8');
fs.writeFileSync(path.join(root, 'partials', 'sprite.html'), newSprite, 'utf8');
fs.writeFileSync(path.join(root, 'partials', 'header.html'), newHeader, 'utf8');
fs.writeFileSync(path.join(root, 'partials', 'footer.html'), footerOut, 'utf8');
fs.writeFileSync(path.join(root, 'partials', 'common-ui.html'), newCommon, 'utf8');

console.log(`index.html updated: ${html.length} -> ${rebuilt.length} bytes`);
console.log(`sprite: ${newSprite.length}, header: ${newHeader.length}, footer: ${footerOut.length}, common: ${newCommon.length}`);
