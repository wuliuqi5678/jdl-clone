/* Raise text contrast for WCAG AA without changing the visual hierarchy. */
const fs = require('fs');

const accessibleGray = '#5f626a';
const lightGrays = [
  '#a1a3aa', '#bcbec5', '#858890', '#a7aab1', '#a9abb2', '#a0a3aa',
  '#9fa2a9', '#989ba3', '#858891', '#b5b8bf', '#83868e', '#a4a7ae',
  '#a2a5ac', '#94979e', '#b6b8be', '#aeb1b7', '#b5b8be', '#b5b7be',
  '#aaacb3', '#9699a1', '#a3a5ac', '#9296a0', '#c3c5ca', '#92959d',
  '#8b8e96', '#93969e', '#bcbfc6', '#8f929a', '#a1a4ab', '#90939b',
  '#9b9ea5', '#898c94', '#91949c', '#878b94', '#9a9da5', '#b0b2b9',
  '#a3a6ad', '#b3b5bc', '#999ca4', '#c3c5cb', '#8c8f97', '#b1b3ba',
  '#8d9098', '#aeb1b8', '#8e9199', '#72767e', '#a3a6ae'
];

const files = ['css/style.css', 'css/pages.css'];
for (const file of files) {
  let css = fs.readFileSync(file, 'utf8');
  const before = css;
  for (const gray of lightGrays) {
    const re = new RegExp(`(color:\\s*)${gray.replace('#', '#')};`, 'g');
    css = css.replace(re, `$1${accessibleGray};`);
  }
  css = css.replace('--muted-light: #a3a6ae;', `--muted-light: ${accessibleGray};`);

  if (file.endsWith('style.css')) {
    const whiteAlpha = [
      ['.footer-brand__slogan', 'rgba(255, 255, 255, .37)', 'rgba(255, 255, 255, .68)'],
      ['.footer-column li a', 'rgba(255, 255, 255, .46)', 'rgba(255, 255, 255, .68)'],
      ['.footer-bottom {', 'rgba(255, 255, 255, .32)', 'rgba(255, 255, 255, .62)'],
      ['.footer-bottom a', 'rgba(255, 255, 255, .36)', 'rgba(255, 255, 255, .64)'],
      ['.footer-disclaimer', 'rgba(255, 255, 255, .26)', 'rgba(255, 255, 255, .58)'],
      ['.footer-disclaimer strong', 'rgba(255, 255, 255, .42)', 'rgba(255, 255, 255, .75)'],
      ['.footer-column__title .icon', 'rgba(255, 255, 255, .36)', 'rgba(255, 255, 255, .62)']
    ];
    for (const [, oldValue, newValue] of whiteAlpha) {
      css = css.split(oldValue).join(newValue);
    }
    css = css.replace('color: rgba(255, 255, 255, .35);\n}', 'color: rgba(255, 255, 255, .75);\n}');
    css = css.replace('color: rgba(255, 255, 255, .42);\n}', 'color: rgba(255, 255, 255, .75);\n}');
    css = css.replace('color: rgba(255, 255, 255, .45);\n}', 'color: rgba(255, 255, 255, .75);\n}');
    css = css.replace('color: rgba(255, 255, 255, .57);\n}', 'color: rgba(255, 255, 255, .78);\n}');
    css = css.replace('color: rgba(255, 255, 255, .5);\n  font-size: 10.5px;', 'color: rgba(255, 255, 255, .72);\n  font-size: 10.5px;');
    css = css.replace('color: rgba(255, 255, 255, .58);\n}', 'color: rgba(255, 255, 255, .82);\n}');
  }

  if (file.endsWith('pages.css')) {
    const whiteAlpha = [
      ['rgba(255, 255, 255, .53)', 'rgba(255, 255, 255, .75)'],
      ['rgba(255, 255, 255, .28)', 'rgba(255, 255, 255, .55)'],
      ['rgba(255, 255, 255, .58)', 'rgba(255, 255, 255, .78)'],
      ['rgba(255, 255, 255, .55)', 'rgba(255, 255, 255, .78)'],
      ['rgba(255, 255, 255, .48)', 'rgba(255, 255, 255, .75)'],
      ['rgba(255, 255, 255, .52)', 'rgba(255, 255, 255, .75)'],
      ['rgba(255, 255, 255, .57)', 'rgba(255, 255, 255, .76)'],
      ['rgba(255, 255, 255, .46)', 'rgba(255, 255, 255, .72)'],
      ['rgba(255, 255, 255, .59)', 'rgba(255, 255, 255, .8)']
    ];
    for (const [oldValue, newValue] of whiteAlpha) {
      css = css.split(oldValue).join(newValue);
    }
  }

  fs.writeFileSync(file, css, 'utf8');
  console.log(`${file}: ${before.length} -> ${css.length}`);
}
