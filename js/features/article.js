/* Article reading progress, reading time, copy/share/print tools. */
import { $, $$, clamp } from '../core/dom.js';
import { showToast } from '../core/ui.js';

let initialized = false;

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  const copied = document.execCommand('copy');
  area.remove();
  if (!copied) throw new Error('Copy failed');
}

function copyLink() {
  copyText(window.location.href)
    .then(() => showToast('文章链接已复制'))
    .catch(() => showToast('复制失败，请手动复制浏览器地址栏链接'));
}

export function initArticle() {
  if (initialized) return;
  initialized = true;

  const article = $('#articleContent');
  if (!article) return;

  const progress = $('#readingProgress');
  const bar = $('.reading-progress__bar', progress);
  const readingTime = $('#articleReadingTime');

  const bodyText = article.querySelector('.article-body')?.textContent?.replace(/\s+/g, '') || '';
  if (readingTime && bodyText) {
    readingTime.textContent = `预计阅读 ${Math.max(1, Math.ceil(bodyText.length / 450))} 分钟`;
  }

  let ticking = false;
  function updateProgress() {
    if (!progress || !bar) return;
    const rect = article.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const available = Math.max(1, article.offsetHeight - window.innerHeight + 160);
    const value = clamp(((window.scrollY - top + 160) / available) * 100, 0, 100);
    bar.style.width = `${value.toFixed(1)}%`;
    progress.setAttribute('aria-valuenow', String(Math.round(value)));
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateProgress);
  }, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  $$('[data-copy-link]').forEach((button) => button.addEventListener('click', copyLink));

  $$('[data-share-article]').forEach((button) => {
    button.addEventListener('click', async () => {
      if (navigator.share) {
        try {
          await navigator.share({ title: document.title, url: window.location.href });
          return;
        } catch (error) {
          if (error?.name === 'AbortError') return;
        }
      }
      copyLink();
    });
  });

  $$('[data-print-article]').forEach((button) => {
    button.addEventListener('click', () => window.print());
  });
}
