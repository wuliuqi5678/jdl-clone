/* Crawl every deployed page and referenced asset on the public static host. */
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const base = (process.argv[2] || 'https://deep-coil-keen-pan-rmxdiect3cboytjva.paged.net/').replace(/\/?$/, '/');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const deployFiles = [
  ...fs.readdirSync(root).filter((name) => name.endsWith('.html')),
  ...walk(path.join(root, 'css')).map((file) => path.relative(root, file).replace(/\\/g, '/')),
  ...walk(path.join(root, 'js')).map((file) => path.relative(root, file).replace(/\\/g, '/')),
  ...walk(path.join(root, 'assets')).map((file) => path.relative(root, file).replace(/\\/g, '/'))
].sort();

const expectedTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'javascript',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

async function checkOne(rel) {
  const url = base + rel.split('/').map(encodeURIComponent).join('/');
  try {
    const res = await fetch(url, { redirect: 'follow', cache: 'no-store' });
    const contentType = res.headers.get('content-type') || '';
    const body = await res.arrayBuffer();
    const ext = path.extname(rel).toLowerCase();
    const expected = expectedTypes[ext] || '';
    const localSize = fs.statSync(path.join(root, rel)).size;
    return {
      rel,
      status: res.status,
      bytes: body.byteLength,
      localSize,
      contentType,
      typeOk: !expected || contentType.includes(expected),
      url
    };
  } catch (error) {
    return { rel, status: 'ERR', error: error.message, url };
  }
}

(async () => {
  const results = [];
  const batchSize = 8;
  for (let i = 0; i < deployFiles.length; i += batchSize) {
    const batch = deployFiles.slice(i, i + batchSize);
    results.push(...(await Promise.all(batch.map(checkOne))));
    process.stdout.write(`\rchecked ${Math.min(i + batchSize, deployFiles.length)}/${deployFiles.length}`);
  }
  process.stdout.write('\n');
  const failures = results.filter((r) => r.status !== 200 || !r.typeOk);
  console.log(JSON.stringify({
    base,
    checked: results.length,
    ok: results.length - failures.length,
    failures,
    totalBytes: results.reduce((sum, r) => sum + (r.bytes || 0), 0)
  }, null, 2));
  if (failures.length) process.exitCode = 1;
})();
