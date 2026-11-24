const fs = require('fs');
const p = 'partials/common-ui.html';
let s = fs.readFileSync(p, 'utf8');
const needle = '<script src="js/main.js"></script>';
const before = s.length;
s = s.split(needle).join('');
fs.writeFileSync(p, s, 'utf8');
console.log({ before, after: s.length, removed: before - s.length, stillHas: s.includes(needle) });
