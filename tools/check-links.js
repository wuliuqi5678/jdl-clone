/* Lightweight local link and asset audit for the static build. */
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const htmlFiles = fs.readdirSync(root).filter((name) => name.endsWith('.html'));

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const cssFiles = walk(path.join(root, 'css'))
  .filter((name) => name.endsWith('.css'))
  .map((name) => path.relative(root, name).replace(/\\/g, '/'));
const missing = [];
const checked = new Set();
const links = new Set();

function checkReference(ref, from, kind) {
  if (!ref || ref.startsWith('#') || ref.startsWith('http') || ref.startsWith('//') || ref.startsWith('tel:') || ref.startsWith('mailto:') || ref.startsWith('javascript:')) return;
  const clean = ref.split('#')[0].split('?')[0];
  if (!clean) return;
  const key = `${from} -> ${clean}`;
  if (checked.has(key)) return;
  checked.add(key);
  links.add(clean);
  if (!fs.existsSync(path.join(root, clean))) missing.push({ from, kind, ref, clean });
}

htmlFiles.forEach((file) => {
  const text = fs.readFileSync(path.join(root, file), 'utf8');
  for (const match of text.matchAll(/(?:href|src)="([^"]+)"/g)) checkReference(match[1], file, 'html');
  for (const match of text.matchAll(/url\(['"]?([^'")]+)['"]?\)/g)) {
    const ref = match[1].trim();
    if (ref.startsWith('data:')) continue;
    const clean = ref.replace(/^\.\.\//, '');
    if (!fs.existsSync(path.join(root, clean))) missing.push({ from: file, kind: 'inline-css', ref: clean });
  }
});

cssFiles.forEach((file) => {
  const text = fs.readFileSync(path.join(root, file), 'utf8');
  for (const match of text.matchAll(/url\(['"]?([^'")]+)['"]?\)/g)) {
    let ref = match[1].trim();
    if (ref.startsWith('data:') || ref.startsWith('http')) continue;
    const clean = path.normalize(path.join(path.dirname(file), ref)).replace(/\\/g, '/');
    checkReference(clean, file, 'css');
  }
});

console.log(`HTML files: ${htmlFiles.length}`);
console.log(`Unique local references: ${links.size}`);
if (missing.length) {
  console.log(`MISSING (${missing.length}):`);
  missing.forEach((item) => console.log(`  ${item.from} [${item.kind}] ${item.ref} -> ${item.clean}`));
  process.exitCode = 1;
} else {
  console.log('All local links and assets resolve.');
}
