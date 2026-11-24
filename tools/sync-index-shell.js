/* Keep the hand-maintained homepage shell in sync with shared partials. */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const write = (relative, content) => fs.writeFileSync(path.join(root, relative), content, 'utf8');

function replaceBetween(html, startMarker, endMarker, replacement, includeEnd = true) {
  const start = html.indexOf(startMarker);
  if (start < 0) throw new Error(`Start marker not found: ${startMarker}`);
  const end = html.indexOf(endMarker, start);
  if (end < 0) throw new Error(`End marker not found: ${endMarker}`);
  const stop = includeEnd ? end + endMarker.length : end;
  return html.slice(0, start) + replacement + html.slice(stop);
}

const header = read('partials/header.html').trimEnd();
const footer = read('partials/footer.html').trimEnd();
const commonUi = read('partials/common-ui.html').trimEnd();
const sprite = read('partials/sprite.html').trimEnd();

let index = read('index.html');

index = index.replace(/<svg class="svg-sprite"[\s\S]*?<\/svg>/, sprite);
index = replaceBetween(index, '  <div class="topbar">', '  </header>', header);
index = replaceBetween(index, '  <footer class="site-footer"', '  </footer>', footer);
index = replaceBetween(index, '  <div class="float-rail"', '\n  <script', `${commonUi}\n`, false);

const featureLinks = [
  'css/style.css',
  'css/features/search.css',
  'css/features/quote.css',
  'css/features/news.css',
  'css/features/article.css',
  'css/features/sitemap.css'
].map((href) => `  <link rel="stylesheet" href="${href}">`).join('\n');
index = index.replace('  <link rel="stylesheet" href="css/style.css">', featureLinks);
index = index.replace(
  '<a href="express.html#products" class="quick-link">',
  '<a href="contact.html#support" class="quick-link" data-quote-open>'
);
index = index.replace(
  /\s*<script[^>]*src="js\/(?:main|pages)\.js"[^>]*><\/script>/g,
  ''
);
if (!/src="js\/app\.js"/.test(index)) {
  index = index.replace(/\s*<\/body>/i, '\n  <script type="module" src="js/app.js"></script>\n</body>');
}

write('index.html', index);
console.log(`Synced index.html shell (${(index.length / 1024).toFixed(1)} KB)`);
