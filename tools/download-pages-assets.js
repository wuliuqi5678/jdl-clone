/* Download subpage assets for the study replica. Run from project root. */
const fs = require('fs');
const path = require('path');

const BASE = 'https://jdl-oss.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/';
const CMS = 'https://jdl-cms-pro.s3-cache-accelerate.cn-north-1.jdcloud-oss.com/';

const assets = [
  ['static/v4/product/express/express-pc.jpg', 'express-hero.jpg'],
  ['static/v3/product/express/service-process.png', 'express-process.png'],
  ['static/v3/product/express/icon-kuaisu.png', 'express-adv-1.png'],
  ['static/v3/product/express/icon-wennuan.png', 'express-adv-2.png'],
  ['static/v3/product/express/icon-chanpin.png', 'express-adv-3.png'],
  ['static/v3/product/express/icon-kefu.png', 'express-adv-4.png'],
  ['static/v3/product/express/jdFastest.jpeg', 'express-matrix-1.jpg'],
  ['static/v4/product/express/jdStandard_VI.jpg', 'express-matrix-2.jpg'],
  ['static/v4/product/express/freshFastest_VI.jpg', 'express-matrix-3.jpg'],
  ['static/v4/product/express/freshStandard_VI.jpg', 'express-matrix-4.jpg'],
  ['static/v3/product/express/same-city.jpeg', 'express-matrix-5.jpg'],
  ['static/v3/product/product-addvalue-m.jpeg', 'express-matrix-6.jpg'],
  ['static/v3/product/serviceplus/serviceplus-m.jpeg', 'related-serviceplus.jpg'],
  ['static/v4/product/freight/freight-m.jpg', 'related-freight.jpg'],
  ['static/v4/product/warehouse/warehouse-m.jpg', 'related-warehouse.jpg'],

  ['static/v4/product/freight/freight-pc.jpg', 'freight-hero.jpg'],
  ['static/v3/product/freight/service-process.png', 'freight-process.png'],
  ['static/v3/product/freight/icon-quanguo.png', 'freight-adv-1.png'],
  ['static/v3/product/freight/icon-shixiao.png', 'freight-adv-2.png'],
  ['static/v3/product/freight/icon-hangye.png', 'freight-adv-3.png'],
  ['static/v3/product/freight/tekuai-zhonghuo.jpeg', 'freight-matrix-1.jpg'],
  ['static/v4/product/freight/zhengche.jpg', 'freight-matrix-2.jpg'],
  ['static/v4/product/freight/freight-m.jpg', 'freight-matrix-3.jpg'],

  ['static/v3/product/supplyChain/supply-chain-pc.jpeg', 'supply-hero.jpg'],
  ['static/v3/product/supplyChain/supply-chain-process.png', 'supply-process.png'],
  ['static/v3/product/supplyChain/icon-ziying.png', 'supply-adv-1.png'],
  ['static/v3/product/supplyChain/icon-shengtai.png', 'supply-adv-2.png'],
  ['static/v3/product/supplyChain/icon-kefu.png', 'supply-adv-3.png'],
  ['static/v3/product/supplyChain/icon-gouwuche.png', 'supply-adv-4.png'],

  ['static/v3/product/express/icon-sxcn.png', 'fastest-adv-1.png'],
  ['static/v3/product/express/icon-aqkk.png', 'fastest-adv-2.png'],
  ['static/v3/product/express/icon-cspf.png', 'fastest-adv-3.png'],
  ['static/v3/product/express/icon-fwbz.png', 'fastest-adv-4.png'],
  ['static/v3/product/icons-info/icon-shixiao-cn.png', 'fastest-info-1.png'],
  ['static/v3/product/icons-info/icon-fugai-fw.png', 'fastest-info-2.png'],
  ['static/v3/product/icons-info/icon-add-fw.png', 'fastest-info-3.png'],
  ['static/v3/product/icons-info/icon-range.png', 'fastest-info-4.png'],
  ['static/v3/product/icons-info/icon-fee.png', 'fastest-info-5.png'],

  ['static/v3/product/freight/icon-kuai.png', 'fastcargo-adv-1.png'],
  ['static/v3/product/freight/icon-zhun.png', 'fastcargo-adv-2.png'],
  ['static/v3/product/freight/icon-wen.png', 'fastcargo-adv-3.png'],
  ['static/v3/product/freight/icon-hao.png', 'fastcargo-adv-4.png'],
  ['static/v3/product/freight/icon-ksxy.png', 'vehicle-adv-1.png'],
  ['static/v3/product/freight/icon-lhjf.png', 'vehicle-adv-2.png'],
  ['static/v3/product/freight/icon-cyff.png', 'vehicle-adv-3.png'],
  ['static/v3/product/freight/icon-aqkk.png', 'vehicle-adv-4.png'],

  ['static/v3/product/contact-cn-v2.jpg', 'contact-cta.jpg'],

  ['image-1725607001020.jpg', 'consumer-hero.jpg', CMS],
  ['static/images/images/solution/img-xfp-01.png', 'consumer-diagram.png'],
  ['static/images/product/icon-adv-01.png', 'consumer-adv-1.png'],
  ['static/images/product/icon-adv-02.png', 'consumer-adv-2.png'],
  ['static/images/product/icon-adv-03.png', 'consumer-adv-3.png'],
  ['static/images/product/icon-adv-04.png', 'consumer-adv-4.png'],
  ['static/images/product/icon-adv-05.png', 'consumer-adv-5.png'],
  ['static/images/product/icon-adv-06.png', 'consumer-adv-6.png'],
  ['static/images/product/icon-adv-07.png', 'consumer-adv-7.png'],
  ['static/images/product/icon-adv-08.png', 'consumer-adv-8.png'],
  ['image-1726126629076.jpg', 'consumer-related-1.jpg', CMS],
  ['image-1726126635267.jpg', 'consumer-related-2.jpg', CMS],
  ['image-1726126641663.jpg', 'consumer-related-3.jpg', CMS],
  ['static/images/product/banner-bottom.jpg', 'consumer-cta.jpg'],

  ['image-1725607004333.jpg', 'digital-hero.jpg', CMS],
  ['static/images/images/solution/img-3c-01.png', 'digital-diagram.png'],
  ['image-1725607021794.jpg', 'fresh-hero.jpg', CMS],
  ['static/images/solution/img-sx-01.png', 'fresh-diagram.png'],

  ['static/images/about/img-banner-aboutus.png', 'about-hero.png'],
  ['static/images/about/icon-mission-01.png', 'about-mission-1.png'],
  ['static/images/about/icon-mission-02.png', 'about-mission-2.png'],
  ['static/images/about/icon-mission-03.png', 'about-mission-3.png'],
  ['static/images/about/img-course-01.jpg', 'about-sustain-1.jpg'],
  ['static/images/about/img-course-04.jpg', 'about-sustain-2.jpg'],
  ['static/images/about/img-course-06.jpg', 'about-sustain-3.jpg'],
  ['static/images/about/img-course-07.jpg', 'about-sustain-4.jpg'],
  ['static/images/about/img-develop-01.jpg', 'about-history-1.jpg'],
  ['static/images/about/img-develop-02.jpg', 'about-history-2.jpg'],
  ['static/images/about/img-develop-03.jpg', 'about-history-3.jpg'],
  ['static/images/about/img-other-01.jpg', 'about-other-1.jpg'],
  ['static/images/about/img-other-02.jpg', 'about-other-2.jpg'],
  ['static/images/home/banner-01.jpg', 'about-cta.jpg'],

  ['static/images/about/img-banner-news.jpg', 'news-hero.jpg'],
  ['image-1794911843966.jpg', 'news-thumb-1.jpg', CMS],
  ['image-1794801112019.jpg', 'news-thumb-2.jpg', CMS],
  ['image-1794211947460.jpg', 'news-thumb-3.jpg', CMS],
  ['image-1793355167631.jpg', 'news-thumb-4.jpg', CMS],
  ['image-1793353626744.png', 'news-thumb-5.png', CMS],
  ['image-1793353174038.jpg', 'news-thumb-6.jpg', CMS],
  ['image-1792123815908.jpeg', 'news-thumb-7.jpg', CMS],
  ['image-1791599047300.jpg', 'news-thumb-8.jpg', CMS],
  ['image-1789121684910.jpeg', 'news-thumb-9.jpg', CMS],
  ['image-1787632482934.png', 'news-thumb-10.png', CMS]
];

const outDir = path.resolve('assets/pages');
fs.mkdirSync(outDir, { recursive: true });

async function download(url, outPath) {
  const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (JDL study replica)' } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 1000) throw new Error(`too small: ${buf.length}`);
  fs.writeFileSync(outPath, buf);
  return buf.length;
}

(async () => {
  let ok = 0, fail = 0, total = 0;
  for (const [src, name, base] of assets) {
    const url = (base || BASE) + src;
    const outPath = path.join(outDir, name);
    try {
      const bytes = await download(url, outPath);
      ok += 1;
      total += bytes;
      console.log(`OK  ${(bytes / 1024).toFixed(1).padStart(8)} KB  ${name}`);
    } catch (error) {
      fail += 1;
      console.error(`ERR ${name}: ${error.message} ${url}`);
    }
  }
  console.log(`\nDONE ok=${ok} fail=${fail} total=${(total / 1048576).toFixed(2)} MB`);
})();
