/* News list and article page builders. */
const { esc, attr, icon, pageHero, newsDateParts, allArticles, pageDocument, writePage } = require('./page-shell');
const { listNews } = require('../page-data');

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


module.exports = { buildNewsList, buildArticle };
