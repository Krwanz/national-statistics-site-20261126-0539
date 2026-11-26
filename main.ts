// Statistik Nusantara — entry make.fun (Node 22, stdlib saja).
// Situsnya adalah berkas statis di app/ (HTML, CSS, modul ES, tanpa build
// step dan tanpa request jaringan). Program ini menyerahkan situs tersebut:
// menyalin app/ dan screenshots/ dari samping berkas ini ke direktori
// keluaran, lalu menulis dossier.json memakai buildDossier dari
// vendor/makefun-frontend.ts. Di luar grader, MAKEFUN_OUTPUT_DIR
// menggantikan /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// Batas-batas scorer (app/ maks. 993 berkas dan 16 MiB; maks. 4 screenshot,
// masing-masing maks. 256 KiB) dijaga di sini supaya entri yang diserahkan
// tidak melewati batas yang akan ditolak grader. buildDossier sendiri yang
// menghitung ringkasan muat pertama dan daftar sumber untuk juri.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
