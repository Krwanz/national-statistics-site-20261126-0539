// Data statistik nasional Indonesia — angka-angka di bawah ini berasal dari
// publikasi Badan Pusat Statistik (BPS) dan disajikan apa adanya beserta
// tahun rujukannya. Nilai provinsi adalah perkiraan BPS 2024 yang dibulatkan.
export const SOURCE_NOTE = 'Sumber: Badan Pusat Statistik (BPS), 2020–2024.';

export const YEARS = [2020, 2021, 2022, 2023, 2024];

// Seri nasional 2020–2024. Satuan dicatat di setiap seri.
export const NATIONAL = {
  population: {
    label: 'Jumlah Penduduk',
    unit: 'juta jiwa',
    source: 'BPS, Hasil Sensus Penduduk 2020 dan Proyeksi Penduduk 2024',
    values: { 2020: 270.2, 2021: 272.7, 2022: 275.8, 2023: 278.7, 2024: 281.6 },
  },
  gdpGrowth: {
    label: 'Pertumbuhan Ekonomi (PDB)',
    unit: '% per tahun',
    source: 'BPS, Berita Resmi Statistik Pertumbuhan Ekonomi',
    values: { 2020: -2.07, 2021: 3.7, 2022: 5.31, 2023: 5.05, 2024: 5.03 },
  },
  inflation: {
    label: 'Inflasi (y-on-y, Desember)',
    unit: '%',
    source: 'BPS, Berita Resmi Statistik Inflasi',
    values: { 2020: 1.68, 2021: 1.87, 2022: 5.51, 2023: 2.61, 2024: 1.57 },
  },
  unemployment: {
    label: 'Tingkat Pengangguran Terbuka',
    unit: '%',
    source: 'BPS, Survei Angkatan Kerja Nasional (Sakernas), Agustus',
    values: { 2020: 7.07, 2021: 6.49, 2022: 5.86, 2023: 5.32, 2024: 4.91 },
  },
  poverty: {
    label: 'Penduduk Miskin',
    unit: '%',
    source: 'BPS, Profil Kemiskinan, September',
    values: { 2020: 10.19, 2021: 9.71, 2022: 9.57, 2023: 9.36, 2024: 8.57 },
  },
  lifeExpectancy: {
    label: 'Angka Harapan Hidup',
    unit: 'tahun',
    source: 'BPS, Indeks Pembangunan Manusia',
    values: { 2020: 71.47, 2021: 71.57, 2022: 71.85, 2023: 73.93, 2024: 74.15 },
  },
  literacy: {
    label: 'Angka Melek Huruf (15 tahun ke atas)',
    unit: '%',
    source: 'BPS, Statistik Pendidikan',
    values: { 2020: 96.04, 2021: 96.08, 2022: 96.39, 2023: 96.84, 2024: 96.93 },
  },
  hdi: {
    label: 'Indeks Pembangunan Manusia',
    unit: 'skor 0–100',
    source: 'BPS, Indeks Pembangunan Manusia',
    values: { 2020: 71.94, 2021: 72.29, 2022: 73.37, 2023: 74.39, 2024: 75.02 },
  },
  gini: {
    label: 'Rasio Gini',
    unit: 'skor 0–1',
    source: 'BPS, Distribusi Pendapatan, Maret',
    values: { 2020: 0.381, 2021: 0.384, 2022: 0.381, 2023: 0.379, 2024: 0.379 },
  },
};

// Nilai PDB harga berlaku (triliun rupiah) — BPS, Berita Resmi Statistik.
export const GDP_NOMINAL = { 2020: 15443, 2021: 16976, 2022: 19542, 2023: 20892, 2024: 22139 };

// Komposisi PDB 2024 menurut lapangan usaha utama (persen) — BPS.
export const GDP_SECTORS_2024 = [
  { sector: 'Industri pengolahan', share: 18.67 },
  { sector: 'Perdagangan', share: 12.85 },
  { sector: 'Pertanian, kehutanan, perikanan', share: 12.55 },
  { sector: 'Konstruksi', share: 9.71 },
  { sector: 'Pertambangan dan penggalian', share: 9.49 },
  { sector: 'Transportasi dan pergudangan', share: 5.85 },
  { sector: 'Informasi dan komunikasi', share: 4.32 },
  { sector: 'Lainnya', share: 26.56 },
];

// Provinsi: penduduk 2024 (juta jiwa, perkiraan BPS), luas (km²), ibu kota.
export const PROVINCES = [
  { name: 'Jawa Barat', capital: 'Bandung', population: 50.35, area: 35378 },
  { name: 'Jawa Timur', capital: 'Surabaya', population: 41.81, area: 47803 },
  { name: 'Jawa Tengah', capital: 'Semarang', population: 37.89, area: 32800 },
  { name: 'Sumatera Utara', capital: 'Medan', population: 16.01, area: 72981 },
  { name: 'Banten', capital: 'Serang', population: 12.43, area: 9662 },
  { name: 'DKI Jakarta', capital: 'Jakarta', population: 10.68, area: 664 },
  { name: 'Sulawesi Selatan', capital: 'Makassar', population: 9.52, area: 46717 },
  { name: 'Lampung', capital: 'Bandar Lampung', population: 9.44, area: 34623 },
  { name: 'Sumatera Selatan', capital: 'Palembang', population: 9.03, area: 91592 },
  { name: 'Riau', capital: 'Pekanbaru', population: 7.01, area: 87024 },
  { name: 'Sumatera Barat', capital: 'Padang', population: 6.01, area: 42013 },
  { name: 'Kalimantan Barat', capital: 'Pontianak', population: 5.82, area: 147307 },
  { name: 'Nusa Tenggara Timur', capital: 'Kupang', population: 5.66, area: 48718 },
  { name: 'Nusa Tenggara Barat', capital: 'Mataram', population: 5.6, area: 18572 },
  { name: 'Kalimantan Timur', capital: 'Samarinda', population: 4.05, area: 127347 },
  { name: 'Bali', capital: 'Denpasar', population: 4.41, area: 5780 },
  { name: 'Aceh', capital: 'Banda Aceh', population: 5.55, area: 57956 },
  { name: 'Kalimantan Selatan', capital: 'Banjarmasin', population: 4.29, area: 38744 },
  { name: 'DI Yogyakarta', capital: 'Yogyakarta', population: 3.76, area: 3133 },
  { name: 'Sulawesi Utara', capital: 'Manado', population: 2.74, area: 13892 },
];

export function provinceDensity(province) {
  return Math.round((province.population * 1000000) / province.area);
}

export function provinceShare(province) {
  return ((province.population / NATIONAL.population.values[2024]) * 100).toFixed(2);
}

export function formatNumber(value, decimals = 2) {
  return value.toLocaleString('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// Selisih nilai sebuah seri nasional antara dua tahun, beserta arahnya.
export function nationalChange(key, fromYear, toYear) {
  const series = NATIONAL[key];
  if (!series || series.values[fromYear] == null || series.values[toYear] == null) return null;
  const delta = series.values[toYear] - series.values[fromYear];
  return { delta, up: delta > 0, down: delta < 0, flat: delta === 0 };
}

// Titik-titik (tahun, nilai) sebuah seri, siap digambar sebagai grafik garis.
export function seriesPoints(key) {
  return YEARS.map((year) => ({ year, value: NATIONAL[key].values[year] }));
}
