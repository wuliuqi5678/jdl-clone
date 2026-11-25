/* Contact page builder. */
const { icon, darkCrumb, sectionHead, pageDocument, writePage } = require('./page-shell');

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


module.exports = { buildContact };
