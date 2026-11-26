// Grafik SVG buatan sendiri — tanpa library luar. Dua pembangun grafik:
// garis tren (lineChart) dan batang (barChart), keduanya mengembalikan
// markup SVG lengkap dengan label sumbu dan nilai.
function svgOpen(width, height, label) {
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="${label}" preserveAspectRatio="xMidYMid meet">`;
}

function niceTicks(min, max, count = 4) {
  if (min === max) { min -= 1; max += 1; }
  const step = (max - min) / count;
  const ticks = [];
  for (let i = 0; i <= count; i += 1) ticks.push(min + step * i);
  return ticks;
}

export function lineChart(points, options = {}) {
  const width = options.width ?? 640;
  const height = options.height ?? 260;
  const padLeft = 56;
  const padRight = 16;
  const padTop = 18;
  const padBottom = 34;
  const values = points.map((p) => p.value);
  let min = Math.min(...values);
  let max = Math.max(...values);
  const span = max - min || 1;
  min -= span * 0.15;
  max += span * 0.15;
  const ticks = niceTicks(min, max);
  const innerW = width - padLeft - padRight;
  const innerH = height - padTop - padBottom;
  const xFor = (i) => padLeft + (innerW * i) / (points.length - 1);
  const yFor = (v) => padTop + innerH * (1 - (v - min) / (max - min));
  const fmt = options.format ?? ((v) => String(v));

  let out = svgOpen(width, height, options.label ?? 'Grafik garis');
  ticks.forEach((t) => {
    const y = yFor(t);
    out += `<line x1="${padLeft}" y1="${y}" x2="${width - padRight}" y2="${y}" class="grid-line"/>`;
    out += `<text x="${padLeft - 8}" y="${y + 4}" text-anchor="end" class="axis-label">${fmt(t)}</text>`;
  });
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${xFor(i).toFixed(1)},${yFor(p.value).toFixed(1)}`).join(' ');
  const area = `${path} L${xFor(points.length - 1).toFixed(1)},${padTop + innerH} L${xFor(0).toFixed(1)},${padTop + innerH} Z`;
  out += `<path d="${area}" class="area-fill"/>`;
  out += `<path d="${path}" class="line-path" fill="none"/>`;
  // Garis penanda nilai terakhir: memudahkan membaca posisi terkini.
  const lastY = yFor(points[points.length - 1].value);
  out += `<line x1="${padLeft}" y1="${lastY}" x2="${width - padRight}" y2="${lastY}" class="last-line"/>`;
  points.forEach((p, i) => {
    out += `<circle cx="${xFor(i)}" cy="${yFor(p.value)}" r="4.5" class="dot"/>`;
    out += `<text x="${xFor(i)}" y="${yFor(p.value) - 10}" text-anchor="middle" class="value-label">${fmt(p.value)}</text>`;
    out += `<text x="${xFor(i)}" y="${height - 10}" text-anchor="middle" class="axis-label">${p.year}</text>`;
  });
  out += '</svg>';
  return out;
}

export function barChart(items, options = {}) {
  const width = options.width ?? 640;
  const rowH = 34;
  const height = options.height ?? (items.length * rowH + 46);
  const padLeft = options.labelWidth ?? 210;
  const padRight = 64;
  const padTop = 12;
  const maxValue = Math.max(...items.map((item) => item.value), 1);
  const innerW = width - padLeft - padRight;
  const fmt = options.format ?? ((v) => String(v));
  const barH = 20;

  let out = svgOpen(width, height, options.label ?? 'Grafik batang');
  items.forEach((item, i) => {
    const y = padTop + i * rowH;
    const barW = Math.max(2, (innerW * item.value) / maxValue);
    out += `<text x="${padLeft - 10}" y="${y + 15}" text-anchor="end" class="bar-label">${item.label}</text>`;
    out += `<rect x="${padLeft}" y="${y}" width="${barW}" height="${barH}" rx="4" class="bar-rect"/>`;
    out += `<text x="${padLeft + barW + 8}" y="${y + 15}" class="value-label">${fmt(item.value)}${options.suffix ?? ''}</text>`;
  });
  out += '</svg>';
  return out;
}
