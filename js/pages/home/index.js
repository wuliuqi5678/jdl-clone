/* Homepage composition root. */
import { initHero } from './hero.js';
import { initServices } from './services.js';
import { initIndustries } from './industries.js';
import { initCounters } from './counters.js';
import { initReveal } from './reveal.js';

let initialized = false;

export function initHome() {
  if (initialized || !document.getElementById('home')) return;
  initialized = true;
  initHero();
  initServices();
  initIndustries();
  initCounters();
  initReveal();
}
