// Titik masuk situs: router hash, state tampilan (tahun, mode grafik/tabel,
// pencarian dan urutan provinsi), dan pengikatan kontrol ke perender.
import { renderHome, renderPopulation, renderEconomy, renderHealth, renderEducation, renderRegions, renderAbout } from './views.js';

const ROUTES = {
  '': renderHome,
  '/': renderHome,
  '/penduduk': renderPopulation,
  '/ekonomi': renderEconomy,
  '/kesehatan': renderHealth,
  '/pendidikan': renderEducation,
  '/daerah': renderRegions,
  '/tentang': renderAbout,
};

const state = {
  year: 2024,
  view: 'chart',
  search: '',
  sort: 'population',
};

const app = document.getElementById('app');

function currentRoute() {
  const hash = window.location.hash.replace(/^#/, '');
  return hash === '' ? '/' : hash;
}

function render() {
  const route = currentRoute();
  const page = ROUTES[route] ?? renderHome;
  app.innerHTML = page(state);
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href') ?? '';
    link.classList.toggle('active', href === `#${route}`);
  });
  bindControls();
  window.scrollTo(0, 0);
}

function bindControls() {
  const yearSelect = document.querySelector('[data-control="year"]');
  if (yearSelect) {
    yearSelect.addEventListener('change', (event) => {
      state.year = Number(event.target.value);
      render();
    });
  }
  // Tombol tampilan grafik/tabel: tekan Enter atau Spasi juga memicunya.
  document.querySelectorAll('[data-control="view"]').forEach((button) => {
    button.addEventListener('click', () => {
      state.view = button.dataset.view;
      render();
    });
  });
  const search = document.querySelector('[data-control="search"]');
  if (search) {
    search.addEventListener('input', (event) => {
      state.search = event.target.value;
      render();
      const again = document.querySelector('[data-control="search"]');
      if (again) {
        again.focus();
        again.setSelectionRange(again.value.length, again.value.length);
      }
    });
  }
  const sort = document.querySelector('[data-control="sort"]');
  if (sort) {
    sort.addEventListener('change', (event) => {
      state.sort = event.target.value;
      render();
    });
  }
}

window.addEventListener('hashchange', render);
render();
