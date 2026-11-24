/* Static quality audit: links, anchors, ids, metadata, images, scripts. */
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const pages = fs.readdirSync(root).filter((n) => n.endsWith('.html')).sort();
const pageSet = new Set(pages);
const issues = [];
const pageDetails = [];

function readPage(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function add(file, type, detail) {
  issues.push({ file, type, detail });
}

for (const file of pages) {
  const html = readPage(file);
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const idSet = new Set(ids);
  const duplicateIds = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
  if (duplicateIds.length) add(file, 'duplicate-id', duplicateIds.join(', '));

  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '';
  if (!title.trim()) add(file, 'title', 'missing');
  if (title.length > 80) add(file, 'title-length', `${title.length} chars`);

  const description = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] || '';
  if (!description) add(file, 'description', 'missing');
  if (description.length > 160) add(file, 'description-length', `${description.length} chars`);

  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] || '';
  if (!/lang="zh-CN"/.test(htmlTag)) add(file, 'lang', htmlTag);
  if (!/<meta\s+name="viewport"[^>]*width=device-width/i.test(html)) add(file, 'viewport', 'missing');

  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (h1s.length !== 1) add(file, 'h1-count', String(h1s.length));
  if (h1s[0] && /<img|class="logo"|sr-only/.test(h1s[0][1])) add(file, 'h1-content', h1s[0][1].slice(0, 80));

  const images = [...html.matchAll(/<img\b([^>]*)>/gi)];
  for (const match of images) {
    const attrs = match[1];
    const src = attrs.match(/\ssrc="([^"]+)"/)?.[1] || '';
    if (!/\salt=/.test(attrs)) add(file, 'img-alt', src);
  }

  const anchors = [...html.matchAll(/<a\b([^>]*)>/gi)];
  for (const match of anchors) {
    const attrs = match[1];
    const href = attrs.match(/\shref="([^"]+)"/)?.[1];
    if (!href) {
      add(file, 'anchor-href', match[0].slice(0, 100));
      continue;
    }
    if (href === '#') {
      if (!/data-demo=/.test(attrs) && !/data-modal-open=/.test(attrs) && !/data-track-open=/.test(attrs) && !/data-consult/.test(attrs)) {
        add(file, 'placeholder-link', match[0].slice(0, 120));
      }
      continue;
    }
    if (href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
    if (href.startsWith('http')) continue;
    const [targetPart, rawHash] = href.split('#');
    const targetFile = targetPart.split('?')[0] || file;
    if (!targetFile) continue;
    if (!pageSet.has(targetFile)) {
      add(file, 'missing-page', href);
      continue;
    }
    if (rawHash && targetFile.endsWith('.html')) {
      const targetHtml = readPage(targetFile);
      const targetIds = new Set([...targetHtml.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
      if (!targetIds.has(rawHash)) add(file, 'missing-anchor', href);
    }
  }

  const scriptSrcs = [...html.matchAll(/<script\b[^>]*\ssrc="([^"]+)"/gi)].map((m) => m[1]);
  if (scriptSrcs.filter((s) => /js\/app\.js$/.test(s)).length !== 1) add(file, 'app-script', scriptSrcs.join(', '));
  if (scriptSrcs.some((s) => /(?:^|\/)(main|pages)\.js$/.test(s))) add(file, 'legacy-script', scriptSrcs.join(', '));

  const bodyMatch = html.match(/<body\b([^>]*)>/i);
  pageDetails.push({
    file,
    title,
    descriptionLength: description.length,
    h1: h1s[0]?.[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() || '',
    bodyClass: bodyMatch?.[1].match(/class="([^"]*)"/)?.[1] || '',
    nav: bodyMatch?.[1].match(/data-nav="([^"]*)"/)?.[1] || '',
    anchors: [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]).length,
    images: images.length
  });
}

const cssFiles = walk(path.join(root, 'css'))
  .filter((f) => f.endsWith('.css'))
  .map((f) => path.relative(root, f).replace(/\\/g, '/'));
const cssText = cssFiles.map((f) => fs.readFileSync(path.join(root, f), 'utf8')).join('\n');
const mediaQueries = [...cssText.matchAll(/@media\s*\(([^)]*)\)/g)].map((m) => m[1]).filter((v) => /max-width|min-width/.test(v));
const breakpoints = [...new Set(mediaQueries.map((q) => q.match(/(?:max|min)-width:\s*([^)]+)/)?.[1]).filter(Boolean))].sort();

console.log(JSON.stringify({ pageCount: pages.length, issues, breakpoints, pages: pageDetails }, null, 2));
