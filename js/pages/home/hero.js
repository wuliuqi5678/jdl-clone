/* Hero carousel and video behavior. */
import { $, $$, mobileQuery, reduceMotion } from '../../core/dom.js';

export function initHero() {
  const hero = $('.hero');
  const slides = $$('.hero-slide');
  const dots = $$('.hero-dot');
  const prev = $('.hero-arrow--prev');
  const next = $('.hero-arrow--next');
  const video = $('.hero-video');
  if (!hero || !slides.length) return;

  let index = 0;
  let timer = 0;
  let visible = true;
  let paused = false;
  let touchStartX = null;

  function playVideo() {
    if (!video || mobileQuery.matches || reduceMotion.matches) {
      video?.pause();
      return;
    }
    if (slides[index]?.dataset.slide === '1' && visible && !document.hidden) {
      const promise = video.play();
      if (promise && typeof promise.catch === 'function') promise.catch(() => {});
    } else {
      video.pause();
    }
  }

  function setHero(nextIndex, restart = true) {
    index = (nextIndex + slides.length) % slides.length;
    hero.classList.toggle('hero--light-dots', index > 0);
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    dots.forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', String(active));
      dot.setAttribute('tabindex', active ? '0' : '-1');
    });
    playVideo();
    if (restart) startTimer();
  }

  function startTimer() {
    window.clearInterval(timer);
    if (reduceMotion.matches || paused) return;
    timer = window.setInterval(() => setHero(index + 1), 7200);
  }

  setHero(0, false);
  next?.addEventListener('click', () => setHero(index + 1));
  prev?.addEventListener('click', () => setHero(index - 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => setHero(i)));

  hero.addEventListener('mouseenter', () => {
    paused = true;
    window.clearInterval(timer);
  });
  hero.addEventListener('mouseleave', () => {
    paused = false;
    startTimer();
  });
  hero.addEventListener('focusin', () => {
    paused = true;
    window.clearInterval(timer);
  });
  hero.addEventListener('focusout', (event) => {
    if (!hero.contains(event.relatedTarget)) {
      paused = false;
      startTimer();
    }
  });
  hero.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse') return;
    touchStartX = event.clientX;
  });
  hero.addEventListener('pointerup', (event) => {
    if (touchStartX === null) return;
    const delta = event.clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(delta) < 42) return;
    setHero(index + (delta < 0 ? 1 : -1));
  });

  new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      visible = entry.isIntersecting;
      playVideo();
    });
  }, { threshold: .1 }).observe(hero);

  document.addEventListener('visibilitychange', playVideo);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) window.clearInterval(timer);
    else startTimer();
  });
  reduceMotion.addEventListener?.('change', () => {
    if (reduceMotion.matches) {
      window.clearInterval(timer);
      video?.pause();
    } else {
      playVideo();
      startTimer();
    }
  });
  startTimer();
}
