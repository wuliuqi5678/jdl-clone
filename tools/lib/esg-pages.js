/* ESG page builder. */
const { icon, pageHero, sectionHead, pageDocument, writePage } = require('./page-shell');

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

module.exports = { buildEsg };
