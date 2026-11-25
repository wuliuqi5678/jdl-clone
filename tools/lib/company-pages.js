/* About page builder. */
const { esc, attr, icon, pageHero, sectionHead, pageDocument, writePage } = require('./page-shell');
const { aboutTimeline } = require('../page-data');

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


module.exports = { buildAbout };
