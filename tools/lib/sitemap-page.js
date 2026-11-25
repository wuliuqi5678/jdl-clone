/* Sitemap page builder. */
const { esc, attr, allArticles, pageHero, sectionHead, pageDocument, writePage } = require('./page-shell');

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

module.exports = { buildSitemap };
