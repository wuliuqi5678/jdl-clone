/* News search, category/year filtering and real client-side pagination. */
import { $, $$, clamp, reduceMotion } from '../core/dom.js';

const PER_PAGE = 5;
let initialized = false;

export function initNews() {
  if (initialized) return;
  initialized = true;

  const list = $('#newsList');
  if (!list) return;

  const rows = $$('.news-row', list);
  const filters = $$('[data-news-filter]');
  const search = $('#newsSearchInput');
  const year = $('#newsYear');
  const count = $('#newsCount');
  const empty = $('#newsEmpty');
  const pagination = $('#newsPagination');
  if (!rows.length) return;

  const state = { category: 'all', query: '', year: 'all', page: 1 };
  const items = rows.map((row) => ({
    row,
    category: row.dataset.category || '',
    year: row.dataset.year || '',
    search: (row.textContent || '').toLowerCase()
  }));

  function filtered() {
    const tokens = state.query.toLowerCase().split(/\s+/).filter(Boolean);
    return items.filter((item) => {
      if (state.category !== 'all' && item.category !== state.category) return false;
      if (state.year !== 'all' && item.year !== state.year) return false;
      return tokens.every((token) => item.search.includes(token));
    });
  }

  function scrollToList() {
    window.scrollTo({
      top: Math.max(0, list.getBoundingClientRect().top + window.scrollY - 160),
      behavior: reduceMotion.matches ? 'auto' : 'smooth'
    });
  }

  function makePageButton(label, page, options = {}) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.setAttribute('aria-label', options.label || `第 ${page} 页`);
    if (options.current) {
      button.classList.add('is-current');
      button.setAttribute('aria-current', 'page');
    }
    if (options.disabled) button.disabled = true;
    else button.addEventListener('click', () => {
      state.page = page;
      render();
      scrollToList();
    });
    return button;
  }

  function renderPagination(totalPages) {
    pagination.innerHTML = '';
    if (totalPages <= 1) return;
    pagination.append(makePageButton('‹', state.page - 1, { label: '上一页', disabled: state.page === 1 }));
    for (let page = 1; page <= totalPages; page += 1) {
      pagination.append(makePageButton(String(page), page, { current: page === state.page }));
    }
    pagination.append(makePageButton('›', state.page + 1, { label: '下一页', disabled: state.page === totalPages }));
  }

  function render() {
    const matched = filtered();
    const totalPages = Math.max(1, Math.ceil(matched.length / PER_PAGE));
    state.page = clamp(state.page, 1, totalPages);
    const start = (state.page - 1) * PER_PAGE;
    const visible = new Set(matched.slice(start, start + PER_PAGE));

    items.forEach((item) => {
      item.row.hidden = !visible.has(item);
    });

    if (count) {
      count.textContent = matched.length
        ? `共 ${matched.length} 条 · 第 ${state.page}/${totalPages} 页`
        : '共 0 条';
    }
    if (empty) empty.hidden = matched.length > 0;
    renderPagination(totalPages);
  }

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      state.category = button.dataset.newsFilter || 'all';
      state.page = 1;
      filters.forEach((item) => item.classList.toggle('is-active', item === button));
      render();
    });
  });

  search?.addEventListener('input', () => {
    state.query = search.value.trim();
    state.page = 1;
    render();
  });

  year?.addEventListener('change', () => {
    state.year = year.value;
    state.page = 1;
    render();
  });

  render();
}
