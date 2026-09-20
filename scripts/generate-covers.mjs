import { writeFileSync, readdirSync, readFileSync } from 'node:fs';

const PALETTES = [
  { bg: '#e6ece0', ink: '#2f5d3f', soft: '#d2ddc7', line: '#6f9b7d' },
  { bg: '#f2e9e3', ink: '#a8412a', soft: '#e6d5cb', line: '#c07a5e' },
  { bg: '#e9eee6', ink: '#16241c', soft: '#d5ded0', line: '#5d7264' },
  { bg: '#e7ece9', ink: '#2a5f56', soft: '#d1ded9', line: '#5f9187' },
  { bg: '#f0e8e7', ink: '#8a3a32', soft: '#e0d0cd', line: '#b0655c' },
  { bg: '#eaefe4', ink: '#5a6b2e', soft: '#dae2cc', line: '#8a9b58' },
];

const hash = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

const W = 800;
const H = 500;

const rnd = (seed) => {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
};

const calendarGrid = (p, r) => {
  const cols = 7;
  const rows = 4;
  const cell = 62;
  const gap = 10;
  const gw = cols * cell + (cols - 1) * gap;
  const gh = rows * cell + (rows - 1) * gap;
  const x0 = (W - gw) / 2;
  const y0 = (H - gh) / 2 + 10;
  let out = '';
  const filled = new Set();
  while (filled.size < 5) filled.add(Math.floor(r() * cols * rows));
  for (let i = 0; i < cols * rows; i++) {
    const cx = x0 + (i % cols) * (cell + gap);
    const cy = y0 + Math.floor(i / cols) * (cell + gap);
    const on = filled.has(i);
    out += `<rect x="${cx}" y="${cy}" width="${cell}" height="${cell}" rx="12" fill="${on ? p.ink : p.soft}" opacity="${on ? 1 : 0.85}"/>`;
    if (on) out += `<rect x="${cx + 14}" y="${cy + 26}" width="${cell - 28}" height="8" rx="4" fill="${p.bg}" opacity="0.9"/>`;
  }
  return out;
};

const slotStack = (p, r) => {
  let out = '';
  const n = 6;
  const w = 460;
  const h = 46;
  const x = (W - w) / 2;
  const y0 = (H - (n * h + (n - 1) * 14)) / 2;
  const hot = Math.floor(r() * n);
  for (let i = 0; i < n; i++) {
    const y = y0 + i * (h + 14);
    const on = i === hot;
    out += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${on ? p.ink : p.soft}"/>`;
    out += `<rect x="${x + 20}" y="${y + 18}" width="${90 + Math.floor(r() * 90)}" height="10" rx="5" fill="${on ? p.bg : p.line}" opacity="${on ? 0.92 : 0.55}"/>`;
    if (on) out += `<circle cx="${x + w - 34}" cy="${y + h / 2}" r="9" fill="${p.bg}" opacity="0.92"/>`;
  }
  return out;
};

const arcs = (p, r) => {
  let out = `<circle cx="${W / 2}" cy="${H / 2}" r="150" fill="none" stroke="${p.soft}" stroke-width="26"/>`;
  const start = r() * 360;
  const sweep = 90 + r() * 140;
  const rad = (d) => ((d - 90) * Math.PI) / 180;
  const R = 150;
  const x1 = W / 2 + R * Math.cos(rad(start));
  const y1 = H / 2 + R * Math.sin(rad(start));
  const x2 = W / 2 + R * Math.cos(rad(start + sweep));
  const y2 = H / 2 + R * Math.sin(rad(start + sweep));
  out += `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${R} ${R} 0 ${sweep > 180 ? 1 : 0} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${p.ink}" stroke-width="26" stroke-linecap="round"/>`;
  out += `<circle cx="${W / 2}" cy="${H / 2}" r="64" fill="${p.bg}"/>`;
  out += `<circle cx="${W / 2}" cy="${H / 2}" r="7" fill="${p.ink}"/>`;
  out += `<path d="M ${W / 2} ${H / 2} L ${W / 2} ${H / 2 - 40} M ${W / 2} ${H / 2} L ${W / 2 + 30} ${H / 2 + 16}" stroke="${p.ink}" stroke-width="8" stroke-linecap="round" fill="none"/>`;
  return out;
};

const bars = (p, r) => {
  let out = '';
  const n = 9;
  const w = 48;
  const gap = 18;
  const total = n * w + (n - 1) * gap;
  const x0 = (W - total) / 2;
  const base = H - 110;
  for (let i = 0; i < n; i++) {
    const h = 44 + r() * 210;
    const x = x0 + i * (w + gap);
    out += `<rect x="${x}" y="${(base - h).toFixed(1)}" width="${w}" height="${h.toFixed(1)}" rx="12" fill="${i % 3 === 1 ? p.ink : p.soft}"/>`;
  }
  out += `<rect x="${x0 - 20}" y="${base + 18}" width="${total + 40}" height="8" rx="4" fill="${p.line}" opacity="0.4"/>`;
  return out;
};

const nodes = (p, r) => {
  const pts = Array.from({ length: 7 }, () => ({
    x: 120 + r() * (W - 240),
    y: 110 + r() * (H - 220),
  }));
  let out = '';
  for (let i = 0; i < pts.length - 1; i++) {
    out += `<path d="M ${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)} L ${pts[i + 1].x.toFixed(1)} ${pts[i + 1].y.toFixed(1)}" stroke="${p.line}" stroke-width="3" opacity="0.5" fill="none"/>`;
  }
  pts.forEach((pt, i) => {
    const R = i % 3 === 0 ? 30 : 18;
    out += `<circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="${R}" fill="${i % 3 === 0 ? p.ink : p.soft}"/>`;
  });
  return out;
};

const shapes = [calendarGrid, slotStack, arcs, bars, nodes];

const cover = (slug) => {
  const h = hash(slug);
  const p = PALETTES[h % PALETTES.length];
  const draw = shapes[(h >>> 4) % shapes.length];
  const r = rnd(h);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img"><rect width="${W}" height="${H}" fill="${p.bg}"/>${draw(p, r)}</svg>`;
};

const jobs = [
  ['seed/blog', 'src/assets/blog'],
  ['seed/resources', 'src/assets/resources'],
];

let made = 0;
for (const [from, to] of jobs) {
  for (const file of readdirSync(from).filter((f) => f.endsWith('.md'))) {
    const slug = file.replace(/\.md$/, '');
    writeFileSync(`${to}/${slug}.svg`, cover(slug));
    made++;
  }
}
console.log('covers written:', made);
