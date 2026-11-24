/* Site-wide static search. */
import { $, escapeHtml } from '../core/dom.js';
import { openModal } from '../core/ui.js';
import { closeDrawer } from '../shell/navigation.js';

const INDEX_URL = 'assets/data/search-index.json';
let initialized = false;

export function initSearch() {
  if (initialized) return;
  initialized = true;

  const modal = $('#searchModal');
  const form = $('#siteSearchForm');
  const input = $('#siteSearchInput');
  const results = $('#searchResults');
  const summary = $('#searchSummary');
  const empty = $('#searchEmpty');
  if (!modal || !form || !input || !results || !summary || !empty) return;

  let items = [];
  let loading = null;
  let loaded = false;

  async function loadIndex() {
    if (loaded) return items;
    if (loading) return loading;
    summary.textContent = '正在加载搜索索引…';
    loading = fetch(INDEX_URL, { cache: 'force-cache' })
      .then((response) => {
        if (!response.ok) throw new Error(`Search index ${response.status}`);
        return response.json();
      })
      .then((data) => {
        items = Array.isArray(data.items) ? data.items : [];
        loaded = true;
        return items;
      })
      .catch(() => {
        items = [];
        loaded = true;
        summary.textContent = '搜索索引加载失败，请刷新页面重试。';
        empty.textContent = '暂时无法加载站内搜索索引。';
        empty.hidden = false;
        return items;
      })
      .finally(() => {
        loading = null;
      });
    return loading;
  }

  function highlight(text, query) {
    const safe = escapeHtml(text);
    const tokens = [...new Set(query.toLowerCase().split(/\s+/).filter(Boolean))];
    if (!tokens.length) return safe;
    const pattern = tokens
      .map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|');
    try {
      return safe.replace(new RegExp(`(${pattern})`, 'gi'), '<mark>$1</mark>');
    } catch {
      return safe;
    }
  }

  function score(item, query) {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!tokens.length) return 0;
    const title = String(item.title || '').toLowerCase();
    const category = `${item.category || ''} ${item.type || ''}`.toLowerCase();
    const summaryText = String(item.summary || '').toLowerCase();
    const text = String(item.text || '').toLowerCase();
    const haystack = `${title} ${category} ${summaryText} ${text}`;
    if (!tokens.every((token) => haystack.includes(token))) return 0;

    let value = 0;
    tokens.forEach((token) => {
      if (title.includes(token)) value += 100;
      if (category.includes(token)) value += 30;
      if (summaryText.includes(token)) value += 25;
      if (text.includes(token)) value += 8;
    });
    return value - Math.min(Number(item.priority) || 5, 5);
  }

  function resultMarkup(item, query) {
    const summaryText = String(item.summary || item.text || '').slice(0, 120);
    return `<a class="search-result" href="${escapeHtml(item.url)}" role="listitem">
      <span class="search-result__type">${escapeHtml(item.type || '页面')}</span>
      <span class="search-result__body">
        <span class="search-result__title">${highlight(item.title || '', query)}</span>
        <span class="search-result__summary">${highlight(summaryText, query)}</span>
      </span>
      <span class="search-result__arrow" aria-hidden="true">→</span>
    </a>`;
  }

  function render(list, query) {
    results.innerHTML = list.map((item) => resultMarkup(item, query)).join('');
    results.setAttribute('aria-busy', 'false');
    empty.hidden = list.length > 0;
    if (!list.length) {
      empty.textContent = '没有找到匹配页面，试试“京东特快”“冷链”或“ESG”。';
      summary.textContent = '没有找到匹配结果';
    } else {
      summary.textContent = query ? `找到 ${list.length} 个结果` : `推荐 ${list.length} 个页面`;
    }
  }

  function showFeatured() {
    const list = [...items].sort((a, b) => (a.priority || 5) - (b.priority || 5)).slice(0, 6);
    render(list, '');
  }

  function search() {
    const query = input.value.trim();
    if (!loaded) {
      loadIndex().then(() => search());
      return;
    }
    if (!query) {
      showFeatured();
      return;
    }
    const ranked = items
      .map((item) => ({ item, score: score(item, query) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || (a.item.priority || 5) - (b.item.priority || 5))
      .slice(0, 8)
      .map((entry) => entry.item);
    render(ranked, query);
  }

  function openSearch(trigger) {
    closeDrawer(false);
    openModal(modal, trigger);
    window.setTimeout(() => input.focus({ preventScroll: true }), 120);
    if (loaded) {
      if (input.value.trim()) search();
      else showFeatured();
    } else {
      summary.textContent = '正在加载搜索索引…';
      results.innerHTML = '';
      empty.hidden = true;
      loadIndex().then(() => {
        if (!modal.classList.contains('is-open')) return;
        if (input.value.trim()) search();
        else showFeatured();
      });
    }
  }

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-search-open]');
    if (!trigger) return;
    event.preventDefault();
    openSearch(trigger);
  });

  document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      openSearch(document.activeElement);
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    search();
  });

  input.addEventListener('input', () => {
    if (input.value.trim() === '') {
      if (loaded) showFeatured();
      else loadIndex().then(showFeatured);
      return;
    }
    if (loaded) search();
  });

  document.querySelectorAll('[data-search-suggestion]').forEach((button) => {
    button.addEventListener('click', () => {
      input.value = button.dataset.searchSuggestion || '';
      search();
      input.focus({ preventScroll: true });
    });
  });
}
