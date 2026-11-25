/* Build second/third-level pages from the shared shell and builder modules. */
const { services, products, industries } = require('./page-data');
const {
  buildServicePage,
  buildProductPage,
  buildIndustryPage
} = require('./lib/service-pages');
const { buildServicesHub, buildSolutionsHub } = require('./lib/hubs');
const { buildNewsList, buildArticle } = require('./lib/news-pages');
const { buildAbout } = require('./lib/company-pages');
const { buildContact } = require('./lib/contact-pages');
const { buildEsg } = require('./lib/esg-pages');
const { buildSitemap } = require('./lib/sitemap-page');
const { allArticles } = require('./lib/page-shell');

Object.values(services).forEach(buildServicePage);
Object.values(products).forEach(buildProductPage);
Object.values(industries).forEach(buildIndustryPage);
buildServicesHub();
buildSolutionsHub();
buildNewsList();
allArticles.forEach(buildArticle);
buildAbout();
buildContact();
buildEsg();
buildSitemap();

console.log(`\nGenerated ${allArticles.length} news article pages and 1 sitemap page.`);
