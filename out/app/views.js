// Perender halaman: tiap rute hash menghasilkan markup HTML lengkap,
// termasuk kartu indikator, grafik SVG, dan tabel data.
import { NATIONAL, YEARS, GDP_NOMINAL, GDP_SECTORS_2024, PROVINCES, SOURCE_NOTE, formatNumber, provinceDensity, provinceShare, nationalChange, seriesPoints } from './data.js';
import { lineChart, barChart } from './charts.js';

function kpiCard(key, year) {
  const series = NATIONAL[key];
  const value = series.values[year];
  const change = year > YEARS[0] ? nationalChange(key, year - 1, year) : null;
  const arrow = change ? (change.up ? '▲' : change.down ? '▼' : '—') : '';
  const deltaText = change ? `${arrow} ${formatNumber(Math.abs(change.delta))} dari ${year - 1}` : 'Tahun dasar';
  return `<article class="kpi">
    <h3>${series.label}</h3>
    <p class="kpi-value">${formatNumber(value)} <span>${series.unit}</span></p>
    <p class="kpi-delta">${deltaText}</p>
    <p class="kpi-source">${series.source}</p>
  </article>`;
}

function yearSelect(current) {
  return `<label class="control">Tahun
    <select id="year-select" data-control="year">${YEARS.map((y) => `<option value="${y}"${y === current ? ' selected' : ''}>${y}</option>`).join('')}</select>
  </label>`;
}

function viewToggle(current) {
  return `<div class="control toggle" role="group" aria-label="Tampilan">
    <button type="button" data-control="view" data-view="chart" class="${current === 'chart' ? 'active' : ''}">Grafik</button>
    <button type="button" data-control="view" data-view="table" class="${current === 'table' ? 'active' : ''}">Tabel</button>
  </div>`;
}

function seriesTable(key) {
  const series = NATIONAL[key];
  const rows = YEARS.map((y) => `<tr><td>${y}</td><td>${formatNumber(series.values[y])}</td><td>${series.unit}</td></tr>`).join('');
  return `<table class="data-table"><thead><tr><th>Tahun</th><th>Nilai</th><th>Satuan</th></tr></thead><tbody>${rows}</tbody></table>
  <p class="source">${series.source}</p>`;
}

function chartOrTable(key, state) {
  if (state.view === 'table') return seriesTable(key);
  return `<div class="chart-wrap">${lineChart(seriesPoints(key), { label: NATIONAL[key].label, format: (v) => formatNumber(v) })}</div>
  <p class="source">${NATIONAL[key].source}</p>`;
}

export function renderHome(state) {
  const year = state.year;
  const cards = ['population', 'gdpGrowth', 'inflation', 'unemployment', 'poverty', 'lifeExpectancy']
    .map((key) => kpiCard(key, year)).join('');
  return `<section class="hero">
    <h1>Indonesia dalam Angka</h1>
    <p class="lede">Gambaran statistik nasional Indonesia 2020–2024: penduduk, ekonomi, kesehatan, dan pendidikan — dari data resmi Badan Pusat Statistik.</p>
    <div class="hero-controls">${yearSelect(year)}</div>
  </section>
  <section class="kpi-grid">${cards}</section>
  <section class="panel">
    <h2>Tren Penduduk 2020–2024</h2>
    ${chartOrTable('population', state)}
    <p class="panel-note">Penduduk Indonesia bertambah sekitar 2–3 juta jiwa setiap tahun. Pilih tahun di atas untuk melihat angka per tahun, atau buka halaman <a href="#/penduduk">Penduduk</a> untuk rincian lengkap.</p>
  </section>
  <section class="panel">
    <h2>Jelajahi Data</h2>
    <nav class="explore-links">
      <a href="#/penduduk">Penduduk →</a>
      <a href="#/ekonomi">Ekonomi →</a>
      <a href="#/kesehatan">Kesehatan →</a>
      <a href="#/pendidikan">Pendidikan →</a>
      <a href="#/daerah">Daerah →</a>
    </nav>
  </section>`;
}

export function renderPopulation(state) {
  return `<section class="page-head"><h1>Penduduk</h1>
  <p class="lede">Jumlah penduduk Indonesia mencapai ${formatNumber(NATIONAL.population.values[2024], 1)} juta jiwa pada 2024.</p></section>
  <div class="controls-row">${yearSelect(state.year)}${viewToggle(state.view)}</div>
  <section class="panel"><h2>Pertumbuhan Penduduk</h2>${chartOrTable('population', state)}</section>
  <section class="panel"><h2>Kepadatan menurut Provinsi (2024)</h2>
    <p>DKI Jakarta adalah provinsi terpadat dengan sekitar ${formatNumber(provinceDensity(PROVINCES.find((p) => p.name === 'DKI Jakarta')), 0)} jiwa per km², sementara provinsi di Kalimantan dan Papua paling jarang penduduknya. Rincian lengkap ada di halaman <a href="#/daerah">Daerah</a>.</p>
    ${barChart([...PROVINCES].sort((a, b) => b.population - a.population).slice(0, 8).map((p) => ({ label: p.name, value: p.population })), { label: 'Provinsi berpenduduk terbanyak', format: (v) => formatNumber(v, 1), suffix: ' jt' })}
    <p class="source">${SOURCE_NOTE} Penduduk provinsi: perkiraan BPS 2024.</p>
  </section>`;
}

export function renderEconomy(state) {
  const year = state.year;
  const gdpRows = YEARS.map((y) => `<tr><td>${y}</td><td>Rp ${formatNumber(GDP_NOMINAL[y], 0)} triliun</td><td>${formatNumber(NATIONAL.gdpGrowth.values[y])}%</td></tr>`).join('');
  return `<section class="page-head"><h1>Ekonomi</h1>
  <p class="lede">PDB Indonesia 2024 mencapai Rp ${formatNumber(GDP_NOMINAL[2024], 0)} triliun dengan pertumbuhan ${formatNumber(NATIONAL.gdpGrowth.values[2024])}%.</p></section>
  <div class="controls-row">${yearSelect(year)}${viewToggle(state.view)}</div>
  <section class="kpi-grid">${kpiCard('gdpGrowth', year)}${kpiCard('inflation', year)}${kpiCard('unemployment', year)}${kpiCard('poverty', year)}</section>
  <section class="panel"><h2>Pertumbuhan Ekonomi 2020–2024</h2>${chartOrTable('gdpGrowth', state)}</section>
  <section class="panel"><h2>Inflasi 2020–2024</h2>${chartOrTable('inflation', state)}</section>
  <section class="panel"><h2>PDB Harga Berlaku dan Pertumbuhan</h2>
    <table class="data-table"><thead><tr><th>Tahun</th><th>PDB Harga Berlaku</th><th>Pertumbuhan</th></tr></thead><tbody>${gdpRows}</tbody></table>
    <p class="source">BPS, Berita Resmi Statistik Pertumbuhan Ekonomi.</p></section>
  <section class="panel"><h2>Struktur PDB 2024 menurut Lapangan Usaha</h2>
    ${barChart(GDP_SECTORS_2024.map((s) => ({ label: s.sector, value: s.share })), { label: 'Pangsa PDB 2024', format: (v) => formatNumber(v, 1), suffix: '%' })}
    <p class="source">BPS, Produk Domestik Bruto 2024. Industri pengolahan tetap menjadi penyumbang terbesar.</p></section>`;
}

export function renderHealth(state) {
  return `<section class="page-head"><h1>Kesehatan</h1>
  <p class="lede">Angka harapan hidup penduduk Indonesia mencapai ${formatNumber(NATIONAL.lifeExpectancy.values[2024])} tahun pada 2024.</p></section>
  <div class="controls-row">${yearSelect(state.year)}${viewToggle(state.view)}</div>
  <section class="kpi-grid">${kpiCard('lifeExpectancy', state.year)}${kpiCard('hdi', state.year)}${kpiCard('gini', state.year)}</section>
  <section class="panel"><h2>Angka Harapan Hidup 2020–2024</h2>${chartOrTable('lifeExpectancy', state)}</section>
  <section class="panel"><h2>Indeks Pembangunan Manusia 2020–2024</h2>${chartOrTable('hdi', state)}</section>
  <section class="panel"><h2>Yang Perlu Diketahui</h2>
    <ul class="facts">
      <li>Angka harapan hidup naik dari ${formatNumber(NATIONAL.lifeExpectancy.values[2020])} tahun (2020) menjadi ${formatNumber(NATIONAL.lifeExpectancy.values[2024])} tahun (2024).</li>
      <li>IPM 2024 sebesar ${formatNumber(NATIONAL.hdi.values[2024])} menempatkan Indonesia pada kategori pembangunan manusia tinggi menurut klasifikasi BPS.</li>
      <li>Rasio gini stabil di ${formatNumber(NATIONAL.gini.values[2024], 3)} pada Maret 2024, menunjukkan ketimpangan yang relatif terjaga.</li>
    </ul>
    <p class="source">${SOURCE_NOTE}</p></section>`;
}

export function renderEducation(state) {
  return `<section class="page-head"><h1>Pendidikan</h1>
  <p class="lede">Angka melek huruf penduduk usia 15 tahun ke atas mencapai ${formatNumber(NATIONAL.literacy.values[2024])}% pada 2024.</p></section>
  <div class="controls-row">${yearSelect(state.year)}${viewToggle(state.view)}</div>
  <section class="kpi-grid">${kpiCard('literacy', state.year)}${kpiCard('hdi', state.year)}</section>
  <section class="panel"><h2>Angka Melek Huruf 2020–2024</h2>${chartOrTable('literacy', state)}</section>
  <section class="panel"><h2>Yang Perlu Diketahui</h2>
    <ul class="facts">
      <li>Melek huruf naik dari ${formatNumber(NATIONAL.literacy.values[2020])}% (2020) menjadi ${formatNumber(NATIONAL.literacy.values[2024])}% (2024).</li>
      <li>Harapan lama sekolah dan rata-rata lama sekolah menjadi komponen IPM di bidang pendidikan menurut BPS.</li>
      <li>Ketimpangan melek huruf antarwilayah masih menjadi pekerjaan rumah: wilayah timur tertinggal dari Jawa dan Bali.</li>
    </ul>
    <p class="source">BPS, Statistik Pendidikan dan Indeks Pembangunan Manusia.</p></section>`;
}

function provinceRows(list) {
  return list.map((p) => `<tr>
    <td>${p.name}</td><td>${p.capital}</td>
    <td>${formatNumber(p.population, 2)}</td>
    <td>${formatNumber(provinceDensity(p), 0)}</td>
    <td>${provinceShare(p)}%</td>
  </tr>`).join('');
}

export function renderRegions(state) {
  const query = (state.search ?? '').toLowerCase();
  let list = PROVINCES.filter((p) => p.name.toLowerCase().includes(query) || p.capital.toLowerCase().includes(query));
  const sortKey = state.sort ?? 'population';
  list = [...list].sort((a, b) => {
    if (sortKey === 'name') return a.name.localeCompare(b.name, 'id');
    if (sortKey === 'density') return provinceDensity(b) - provinceDensity(a);
    if (sortKey === 'area') return b.area - a.area;
    return b.population - a.population;
  });
  const totalListed = list.reduce((sum, p) => sum + p.population, 0);
  return `<section class="page-head"><h1>Daerah</h1>
  <p class="lede">Penduduk per provinsi, 2024 — ${PROVINCES.length} provinsi ditampilkan. Cari provinsi atau urutkan tabel sesuai kebutuhan.</p></section>
  <div class="controls-row">
    <label class="control">Cari provinsi
      <input type="search" id="province-search" data-control="search" value="${state.search ?? ''}" placeholder="Mis. Jawa, Bali, Papua…" aria-label="Cari provinsi">
    </label>
    <label class="control">Urutkan
      <select id="sort-select" data-control="sort">
        <option value="population"${sortKey === 'population' ? ' selected' : ''}>Penduduk terbanyak</option>
        <option value="density"${sortKey === 'density' ? ' selected' : ''}>Terpadat</option>
        <option value="area"${sortKey === 'area' ? ' selected' : ''}>Wilayah terluas</option>
        <option value="name"${sortKey === 'name' ? ' selected' : ''}>Nama (A–Z)</option>
      </select>
    </label>
  </div>
  <section class="panel">
    <h2>Tabel Provinsi</h2>
    <p class="result-count">${list.length} provinsi cocok — total ${formatNumber(totalListed, 2)} juta jiwa.</p>
    <div class="table-scroll"><table class="data-table"><thead><tr><th>Provinsi</th><th>Ibu Kota</th><th>Penduduk (juta)</th><th>Kepadatan (jiwa/km²)</th><th>Pangsa Nasional</th></tr></thead><tbody>${provinceRows(list)}</tbody></table></div>
    <p class="source">${SOURCE_NOTE} Penduduk provinsi: perkiraan BPS 2024. Kepadatan dan pangsa dihitung dari angka tersebut.</p>
  </section>
  <section class="panel"><h2>Provinsi Berpenduduk Terbanyak</h2>
    ${barChart([...PROVINCES].sort((a, b) => b.population - a.population).slice(0, 8).map((p) => ({ label: p.name, value: p.population })), { label: 'Penduduk provinsi 2024', format: (v) => formatNumber(v, 1), suffix: ' jt' })}
    <p class="source">${SOURCE_NOTE}</p>
  </section>`;
}

export function renderAbout() {
  return `<section class="page-head"><h1>Tentang Data</h1>
  <p class="lede">Dari mana angka-angka di situs ini berasal dan bagaimana cara membacanya.</p></section>
  <section class="panel"><h2>Sumber Data</h2>
    <p>Seluruh angka di situs ini berasal dari <strong>Badan Pusat Statistik (BPS)</strong>, lembaga resmi statistik Indonesia, melalui publikasi berikut:</p>
    <ul class="facts">
      <li>Sensus Penduduk 2020 dan Proyeksi Penduduk — jumlah penduduk nasional dan provinsi.</li>
      <li>Berita Resmi Statistik Pertumbuhan Ekonomi — PDB dan pertumbuhan ekonomi.</li>
      <li>Berita Resmi Statistik Inflasi — inflasi tahunan.</li>
      <li>Survei Angkatan Kerja Nasional (Sakernas) — tingkat pengangguran terbuka.</li>
      <li>Profil Kemiskinan — persentase penduduk miskin.</li>
      <li>Indeks Pembangunan Manusia — angka harapan hidup dan IPM.</li>
      <li>Statistik Pendidikan — angka melek huruf.</li>
    </ul>
    <p>Setiap angka di situs ini mencantumkan sumber dan tahun rujukannya.</p></section>
  <section class="panel"><h2>Metodologi</h2>
    <ul class="facts">
      <li>Angka provinsi 2024 adalah perkiraan BPS yang dibulatkan; kepadatan dan pangsa nasional dihitung dari angka tersebut.</li>
      <li>Inflasi yang ditampilkan adalah inflasi tahunan (year-on-year) bulan Desember.</li>
      <li>Tingkat pengangguran diukur dari Sakernas bulan Agustus setiap tahun.</li>
      <li>Persentase penduduk miskin diukur dari Profil Kemiskinan bulan September setiap tahun.</li>
      <li>Situs ini statis: semua data tersimpan di dalam berkas situs dan tidak mengambil data dari internet saat dibuka.</li>
    </ul></section>
  <section class="panel"><h2>Tentang Situs Ini</h2>
    <p><strong>Statistik Nusantara</strong> adalah situs statistik nasional Indonesia yang dibuat secara independen untuk menampilkan data resmi BPS dengan cara yang mudah dibaca di ponsel maupun desktop. Situs ini bukan situs resmi BPS dan tidak berafiliasi dengan BPS.</p></section>`;
}
