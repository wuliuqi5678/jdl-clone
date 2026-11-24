const fs = require('fs');
const path = require('path');

const root = process.cwd();

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const sourceFiles = [
  ...fs.readdirSync(root).filter((name) => name.endsWith('.html')),
  ...walk(path.join(root, 'css')).map((name) => path.relative(root, name).replace(/\\/g, '/')),
  ...walk(path.join(root, 'js')).map((name) => path.relative(root, name).replace(/\\/g, '/'))
];
const haystack = sourceFiles.map((name) => fs.readFileSync(path.join(root, name), 'utf8')).join('\n');

const files = walk(path.join(root, 'assets'));
const unused = files.filter((file) => {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  return !haystack.includes(rel);
});
console.log(`assets: ${files.length}, unused: ${unused.length}`);
unused.forEach((file) => {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  console.log(`${(fs.statSync(file).size / 1024).toFixed(1).padStart(8)} KB  ${rel}`);
});
