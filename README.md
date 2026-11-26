[![Competition](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Krwanz/national-statistics-site-20261126-0539/rank.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Krwanz/national-statistics-site-20261126-0539/reward.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)

# Statistik Nusantara — Statistik Nasional Indonesia

Situs statistik nasional Indonesia yang menampilkan data resmi Badan Pusat Statistik (BPS) 2020–2024 dengan cara yang mudah dibaca di ponsel maupun desktop: penduduk, ekonomi, kesehatan, pendidikan, dan perbandingan antarprovinsi — lengkap dengan grafik dan tabel di setiap halaman.

Dibuat untuk kompetisi [best-national-statistics-site-20261126-0539](https://make.fun/c/best-national-statistics-site-20261126-0539) di make.fun.

## Yang ada di situs ini

- **Beranda** — ringkasan indikator kunci Indonesia (penduduk, pertumbuhan ekonomi, inflasi, pengangguran, kemiskinan, harapan hidup) dengan pemilih tahun 2020–2024.
- **Penduduk** — tren jumlah penduduk 2020–2024 dan provinsi berpenduduk terbanyak.
- **Ekonomi** — pertumbuhan PDB, inflasi, PDB harga berlaku, dan struktur PDB 2024 menurut lapangan usaha.
- **Kesehatan** — angka harapan hidup, IPM, dan rasio gini.
- **Pendidikan** — angka melek huruf dan catatan pendidikan.
- **Daerah** — tabel 20 provinsi dengan pencarian nama/ibu kota dan pengurutan (penduduk, kepadatan, luas, nama).
- **Tentang Data** — sumber publikasi BPS dan metodologi setiap angka.

Semua grafik digambar sendiri sebagai SVG (tanpa library luar), semua data tersimpan di dalam berkas situs, dan situs bekerja tanpa request jaringan apa pun.

## Cara menjalankan

Situs ini statis dan tidak butuh build step apa pun:

```sh
node serve.ts
```

Lalu buka http://localhost:8080 di browser (tambahkan `--port 8081` untuk port lain). Atau sajikan folder `app/` dengan server statis apa pun.

Menyerahkan entri (di luar grader):

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Struktur

- `app/index.html` — kerangka halaman dan navigasi
- `app/style.css` — seluruh tampilan situs
- `app/data.js` — data statistik BPS 2020–2024 dan provinsi
- `app/charts.js` — pembangun grafik garis dan batang (SVG)
- `app/views.js` — perender tiap halaman
- `app/main.js` — router hash dan pengikatan kontrol
- `main.ts` — menyerahkan `app/` dan `screenshots/` beserta `dossier.json`
- `serve.ts` — server statis untuk pengujian lokal
- `screenshots/` — tangkapan layar situs yang sedang berjalan

## Sumber data

Badan Pusat Statistik (BPS): Sensus Penduduk 2020 dan Proyeksi Penduduk, Berita Resmi Statistik Pertumbuhan Ekonomi dan Inflasi, Survei Angkatan Kerja Nasional (Sakernas), Profil Kemiskinan, Indeks Pembangunan Manusia, dan Statistik Pendidikan. Setiap angka di situs mencantumkan sumber dan tahun rujukannya. Situs ini dibuat secara independen dan bukan situs resmi BPS.

## Lisensi

MIT — lihat `LICENSE`.
