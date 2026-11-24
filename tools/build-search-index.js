/* Generate a static site-search index from the final HTML pages. */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'assets', 'data', 'search-index.json');
const htmlFiles = fs.readdirSync(root).filter((name) => name.endsWith('.html')).sort();

const knownPages = {
  'index.html': { title: '京东物流首页', type: '首页', priority: 1 },
  'services.html': { title: '服务与产品', type: '服务', priority: 2 },
  'express.html': { title: '快递服务', type: '服务', priority: 2 },
  'freight.html': { title: '快运服务', type: '服务', priority: 2 },
  'supply-chain.html': { title: '仓配一体服务', type: '服务', priority: 2 },
  'express-jd-fastest.html': { title: '京东特快', type: '产品', priority: 3 },
  'express-jd-standard.html': { title: '京东标快', type: '产品', priority: 3 },
  'freight-fast-cargo.html': { title: '重货标快', type: '产品', priority: 3 },
  'freight-vehicle.html': { title: '整车直达', type: '产品', priority: 3 },
  'solutions.html': { title: '行业解决方案', type: '解决方案', priority: 2 },
  'consumer-goods.html': { title: '快消行业解决方案', type: '行业方案', priority: 3 },
  'apparel.html': { title: '服饰行业解决方案', type: '行业方案', priority: 3 },
  'appliance.html': { title: '家电行业解决方案', type: '行业方案', priority: 3 },
  'digital.html': { title: '3C 行业解决方案', type: '行业方案', priority: 3 },
  'auto.html': { title: '汽车行业解决方案', type: '行业方案', priority: 3 },
  'fresh.html': { title: '生鲜行业解决方案', type: '行业方案', priority: 3 },
  'news.html': { title: '新闻中心', type: '新闻中心', priority: 2 },
  'about.html': { title: '公司介绍', type: '关于', priority: 3 },
  'contact.html': { title: '联系我们', type: '服务支持', priority: 3 },
  'esg.html': { title: '可持续发展', type: '可持续发展', priority: 3 },
  'sitemap.html': { title: '网站地图', type: '页面', priority: 2 }
};

function stripTags(value) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function firstMatch(html, regex) {
  return html.match(regex)?.[1]?.trim() || '';
}

function entryFor(file) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const known = knownPages[file];
  const isArticle = /^news-[a-z0-9-]+\.html$/i.test(file);
  const title = firstMatch(html, /<title>([\s\S]*?)<\/title>/i);
  const h1 = stripTags(firstMatch(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i));
  const description = firstMatch(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
  const category = stripTags(firstMatch(html, /<span class="page-tag">([\s\S]*?)<\/span>/i));
  const main = firstMatch(html, /<main\b[^>]*>([\s\S]*?)<\/main>/i);
  const text = stripTags(main).slice(0, 1600);
  const displayTitle = known?.title || (isArticle ? h1 : h1 || title.replace(/_.*$/, ''));
  const type = known?.type || (isArticle ? '新闻' : '页面');
  return {
    title: displayTitle,
    url: file,
    type,
    category: category || type,
    summary: description || h1,
    text,
    priority: known?.priority || (isArticle ? 4 : 5)
  };
}

const items = htmlFiles.map(entryFor).sort((a, b) => {
  if (a.priority !== b.priority) return a.priority - b.priority;
  return a.title.localeCompare(b.title, 'zh-CN');
});

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${JSON.stringify({
  version: 1,
  generatedAt: new Date().toISOString().slice(0, 10),
  items
}, null, 2)}\n`, 'utf8');
console.log(`Wrote ${path.relative(root, output)} with ${items.length} entries`);
