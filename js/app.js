/* Front-end entry: assemble the layered modules for every static page. */
import { initNavigation } from './shell/navigation.js';
import { initOverlays } from './shell/overlays.js';
import { initForms } from './shell/forms.js';
import { initPageNav } from './shell/page-nav.js';
import { initSearch } from './features/search.js';
import { initQuote } from './features/quote.js';
import { initNews } from './features/news.js';
import { initArticle } from './features/article.js';
import { initHome } from './pages/home.js';
import { initAbout } from './pages/about.js';
import { initContact } from './pages/contact.js';

function boot() {
  initNavigation();
  initOverlays();
  initForms();
  initPageNav();
  initSearch();
  initQuote();
  initNews();
  initArticle();
  initHome();
  initAbout();
  initContact();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
