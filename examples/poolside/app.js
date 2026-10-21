// Poolside — a fictional pool water-testing log. All data below is sample data.
'use strict';

// ---------- platform: real window in Electron, drawn frame in a browser ----------
const root = document.documentElement;
const host = window.kernHost;
const params = new URLSearchParams(location.search);
const os = host ? (host.platform === 'darwin' ? 'mac' : 'win')
  : (params.get('os') || (/Win/.test(navigator.platform) ? 'win' : 'mac'));
root.classList.add(`os-${os}`);
if (!host) root.classList.add('preview');

// ---------- sample data ----------
const INTERVAL = 120; // minutes between tests (sample policy)
const now = Date.now();
const ago = (min) => new Date(now - min * 60000);

const RANGES = {
  freeCl: { label: 'Free chlorine', unit: 'mg/L', min: 0, max: 5, step: 0.1, digits: 1 },
  combCl: { label: 'Combined chlorine', unit: 'mg/L', min: 0, max: 1.5, step: 0.1, digits: 1 },
  ph: { label: 'pH', unit: '', min: 6.8, max: 8.2, step: 0.1, digits: 1 },
  temp: { label: 'Water', unit: '°C', min: 20, max: 40, step: 0.5, digits: 1 },
};

const pools = [
  { id: 'main', name: 'Main pool', detail: '25 m, 1–2 m deep',
    safe: { freeCl: [1.0, 2.0], combCl: [0, 0.5], ph: [7.2, 7.6], temp: [27, 29.5] },
    readings: [
      { at: ago(86), freeCl: 1.4, combCl: 0.3, ph: 7.4, temp: 28.5, who: 'RK' },
      { at: ago(204), freeCl: 1.6, combCl: 0.3, ph: 7.3, temp: 28.5, who: 'MO' },
      { at: ago(331), freeCl: 1.2, combCl: 0.4, ph: 7.5, temp: 28.0, who: 'MO' },
      { at: ago(449), freeCl: 1.8, combCl: 0.2, ph: 7.4, temp: 28.0, who: 'JT' },
    ] },
  { id: 'learner', name: 'Learner pool', detail: '0.9 m deep',
    safe: { freeCl: [1.0, 2.0], combCl: [0, 0.5], ph: [7.2, 7.6], temp: [29, 31] },
    readings: [
      { at: ago(128), freeCl: 1.1, combCl: 0.4, ph: 7.5, temp: 30.0, who: 'RK' },
      { at: ago(252), freeCl: 1.3, combCl: 0.3, ph: 7.4, temp: 30.0, who: 'MO' },
    ] },
  { id: 'spa', name: 'Spa', detail: '36 °C · 8 seats',
    safe: { freeCl: [3.0, 5.0], combCl: [0, 0.5], ph: [7.2, 7.6], temp: [35, 38] },
    readings: [
      { at: ago(22), freeCl: 3.2, combCl: 0.6, ph: 8.4, temp: 36.5, who: 'JT' },
      { at: ago(141), freeCl: 3.6, combCl: 0.4, ph: 7.6, temp: 36.5, who: 'JT' },
    ] },
];

const staff = ['RK', 'MO', 'JT'];
const names = { RK: 'Rhian K.', MO: 'Marcus O.', JT: 'Jess T.' };

// ---------- comparator colours: the reading's own colour ----------
const PH_STOPS = [[6.8, '#efd24f'], [7.2, '#eba246'], [7.4, '#e27a3e'], [7.6, '#d9573f'], [7.8, '#c93d4c'], [8.2, '#a8215e']];
const DPD_STOPS = [[0, '#f8e9f0'], [0.5, '#f2c6d8'], [1.0, '#eb9fc0'], [1.5, '#df77a5'], [2.5, '#cf4f88'], [5.0, '#a92a68']];
const hexToRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
function lerpStops(stops, v) {
  if (v <= stops[0][0]) return stops[0][1];
  for (let i = 1; i < stops.length; i++) {
    const [v1, c1] = stops[i];
    if (v <= v1) {
      const [v0, c0] = stops[i - 1];
      const t = (v - v0) / (v1 - v0);
      const a = hexToRgb(c0), b = hexToRgb(c1);
      return '#' + a.map((x, j) => Math.round(x + (b[j] - x) * t).toString(16).padStart(2, '0')).join('');
    }
  }
  return stops[stops.length - 1][1];
}
function inkFor(bg) {
  const lum = hexToRgb(bg).map((c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; });
  const L = 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
  return (L + 0.05) / 0.05 > 1.05 / (L + 0.05) ? '#17222b' : '#ffffff';
}
const reagent = { ph: (v) => lerpStops(PH_STOPS, v), freeCl: (v) => lerpStops(DPD_STOPS, v) };

// ---------- helpers ----------
// The page's CSP forbids inline style attributes, so dynamic styles travel as data-css and are applied via the CSSOM.
const applyCss = (el) => el.querySelectorAll('[data-css]').forEach((n) => { n.style.cssText = n.dataset.css; n.removeAttribute('data-css'); });
const $ = (id) => document.getElementById(id);
const clock = (d) => d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
const fmt = (k, v) => v.toFixed(RANGES[k].digits);
const span = (k, [lo, hi]) => `${fmt(k, lo)}–${fmt(k, hi)}`;
const inRange = (pool, k, v) => v >= pool.safe[k][0] && v <= pool.safe[k][1];
const outKeys = (pool, r) => ['ph', 'freeCl', 'combCl'].filter((k) => !inRange(pool, k, r[k]));
const latest = (pool) => pool.readings[0];
function state(pool) {
  const r = latest(pool);
  const since = (Date.now() - r.at) / 60000;
  const left = INTERVAL - since;
  if (outKeys(pool, r).length) return { kind: 'crit', flag: 'Closed', since, left };
  if (left < 0) return { kind: 'crit', flag: `Overdue ${Math.ceil(-left)} min`, since, left };
  if (left <= 20) return { kind: 'due', flag: `Due ${Math.ceil(left)} min`, since, left };
  return { kind: 'ok', flag: 'In range', since, left };
}

let current = pools.find((p) => p.id === location.hash.slice(1)) || pools[0];
let view = 'now';

// ---------- render ----------
function renderPools() {
  $('pools').innerHTML = '';
  pools.forEach((p, i) => {
    const s = state(p);
    const b = document.createElement('button');
    b.className = 'pool';
    b.setAttribute('aria-current', String(p === current));
    b.title = `${p.name} (${navigator.platform.includes('Mac') ? '⌘' : 'Ctrl+'}${i + 1})`;
    b.innerHTML = `<span><b>${p.name}</b><small>${p.detail}</small></span><span class="flag ${s.kind}">${s.flag}</span>`;
    b.addEventListener('click', () => { current = p; closeEntry(); render(); });
    $('pools').appendChild(b);
  });
}

function renderRota() {
  const h = new Date().getHours();
  const start = h % 2 === 0 ? h : h - 1;
  $('rota').innerHTML = [0, 2, 4].map((o, i) => {
    const a = (start + o) % 24, z = (start + o + 2) % 24;
    const who = staff[(Math.floor(start / 2) + i) % 3];
    return `<li class="${i === 0 ? 'now' : ''}"><span class="initials">${who}</span><span>${names[who]}${i === 0 ? ', now' : ''}</span><time>${String(a).padStart(2, '0')}–${String(z).padStart(2, '0')}</time></li>`;
  }).join('');
}

function renderStatus() {
  const r = latest(current), s = state(current);
  const out = outKeys(current, r);
  const circ = 2 * Math.PI * 15;
  const frac = Math.min(1, Math.max(0, s.since / INTERVAL));
  let title, next;
  if (out.length) {
    title = `${RANGES[out[0]].label} ${fmt(out[0], r[out[0]])} is outside the safe range (${span(out[0], current.safe[out[0]])}). Close the pool and tell the duty manager.`;
    next = `<span class="next">Closed<small>since ${clock(r.at)}</small></span>`;
  } else if (s.left < 0) {
    title = 'Test overdue';
    next = `<span class="next">${Math.ceil(-s.left)} min<small>late</small></span>`;
  } else {
    title = s.kind === 'due' ? 'Next test due soon' : 'In range';
    next = `<span class="next">${Math.ceil(s.left)} min<small>until next test</small></span>`;
  }
  $('status').className = `status ${s.kind}`;
  $('status').innerHTML = `
    <svg class="ring" viewBox="0 0 34 34" aria-hidden="true"><circle class="track" cx="17" cy="17" r="15"/>
      <circle class="fill" cx="17" cy="17" r="15" stroke-dasharray="${circ}" stroke-dashoffset="${circ * (1 - frac)}"/></svg>
    <span class="status-text"><b>${title}</b><span>Tested at ${clock(r.at)} by ${names[r.who]}</span></span>${next}`;
}

function scale(k, v) {
  const R = RANGES[k], [lo, hi] = current.safe[k];
  const pos = (x) => ((Math.min(R.max, Math.max(R.min, x)) - R.min) / (R.max - R.min)) * 100;
  return `<div class="scale" aria-hidden="true"><div class="bar"><span class="safe" data-css="left:${pos(lo)}%;right:${100 - pos(hi)}%"></span>
    <span class="mark" data-css="left:${pos(v)}%"></span></div><div class="labels"><span>safe ${span(k, current.safe[k])}</span><span>${R.min}–${R.max}</span></div></div>`;
}

function renderTiles() {
  const r = latest(current);
  $('tiles').innerHTML = ['freeCl', 'ph', 'combCl', 'temp'].map((k) => {
    const R = RANGES[k], v = r[k];
    const colour = reagent[k]?.(v);
    const style = colour ? `data-css="background:${colour};color:${inkFor(colour)}"` : '';
    const out = k !== 'temp' && !inRange(current, k, v);
    return `<article class="tile ${colour ? 'reagent' : ''} ${out ? 'out' : ''}" ${style}>
      <h3>${R.label}${out ? ' · out of range' : ''}</h3>
      <p class="value" aria-label="${R.label} ${fmt(k, v)} ${R.unit}">${fmt(k, v)}${R.unit ? `<small>${R.unit}</small>` : ''}</p>
      ${scale(k, v)}</article>`;
  }).join('');
}

function row(pool, r, withPool) {
  const out = outKeys(pool, r);
  const cell = (k) => `<td class="num ${out.includes(k) ? 'out' : ''}">${reagent[k] ? `<span class="chip" data-css="background:${reagent[k](r[k])}" aria-hidden="true"></span>` : ''}${fmt(k, r[k])}</td>`;
  return `<tr><td class="time">${clock(r.at)}</td>${withPool ? `<td>${pool.name}</td>` : ''}${cell('freeCl')}${cell('combCl')}${cell('ph')}<td class="num">${fmt('temp', r.temp)}</td><td class="who" title="${names[r.who]}">${r.who}</td></tr>`;
}
const head = (withPool) => `<thead><tr><th>Time</th>${withPool ? '<th>Pool</th>' : ''}<th class="num">Free Cl</th><th class="num">Combined</th><th class="num">pH</th><th class="num">°C</th><th>By</th></tr></thead>`;

function renderLogs() {
  $('today').innerHTML = head(false) + '<tbody>' + (current.readings.length
    ? current.readings.map((r) => row(current, r, false)).join('')
    : '<tr class="empty"><td colspan="6">No readings yet today. The first test is due when the pool opens.</td></tr>') + '</tbody>';
  const all = pools.flatMap((p) => p.readings.map((r) => [p, r])).sort((a, b) => b[1].at - a[1].at);
  $('log').innerHTML = head(true) + '<tbody>' + all.map(([p, r]) => row(p, r, true)).join('') + '</tbody>';
}

function render() {
  $('pool-title').innerHTML = `${current.name} <span>· ${current.detail}</span>`;
  document.title = `${current.name} — Poolside`;
  renderPools(); renderRota(); renderStatus(); renderTiles(); renderLogs();
  applyCss(document.body);
  $('view-now').hidden = view !== 'now';
  $('view-log').hidden = view !== 'log';
  $('tab-now').setAttribute('aria-selected', String(view === 'now'));
  $('tab-log').setAttribute('aria-selected', String(view === 'log'));
}

// ---------- entry ----------
let draft = null;
function openEntry() {
  const r = latest(current);
  const onChair = $('rota').querySelector('.now .initials')?.textContent || staff[0];
  draft = { freeCl: r.freeCl, combCl: r.combCl, ph: r.ph, temp: r.temp, who: onChair };
  $('entry-title').textContent = `New reading · ${current.name}`;
  $('steppers').innerHTML = ['freeCl', 'combCl', 'ph', 'temp'].map((k) => `
    <div class="stepper" data-k="${k}">
      <label id="lbl-${k}">${RANGES[k].label}<small>${k === 'temp' ? RANGES[k].unit : `safe ${span(k, current.safe[k])}${RANGES[k].unit ? ' ' + RANGES[k].unit : ''}`}</small></label>
      <button type="button" data-d="-1" aria-label="Lower ${RANGES[k].label}">−</button>
      <output aria-labelledby="lbl-${k}" aria-live="polite"></output>
      <button type="button" data-d="1" aria-label="Raise ${RANGES[k].label}">+</button>
    </div>`).join('');
  $('who').innerHTML = staff.map((s) => `<button type="button" aria-pressed="${s === draft.who}" title="${names[s]}">${s}</button>`).join('');
  $('entry').hidden = false;
  updateEntry();
  $('steppers').querySelector('button').focus();
}
function closeEntry() { $('entry').hidden = true; draft = null; }
function updateEntry() {
  $('steppers').querySelectorAll('.stepper').forEach((el) => {
    const k = el.dataset.k, v = draft[k];
    const out = el.querySelector('output');
    out.textContent = fmt(k, v);
    const colour = reagent[k]?.(v);
    out.style.background = colour || 'transparent';
    out.style.color = colour ? inkFor(colour) : '';
  });
  $('who').querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.textContent === draft.who)));
  const out = outKeys(current, draft);
  $('entry-warning').hidden = !out.length;
  if (out.length) $('entry-warning').textContent = `${RANGES[out[0]].label} ${fmt(out[0], draft[out[0]])} is outside the safe range (${span(out[0], current.safe[out[0]])}). Close the pool and tell the duty manager.`;
  $('entry-save').textContent = out.length ? 'Save reading and close the pool' : 'Save reading';
}
$('steppers').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-d]'); if (!b) return;
  const k = b.closest('.stepper').dataset.k, R = RANGES[k];
  draft[k] = Math.round(Math.min(R.max + 0.6, Math.max(R.min - 0.6, draft[k] + R.step * Number(b.dataset.d))) * 10) / 10;
  updateEntry();
});
$('who').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { draft.who = b.textContent; updateEntry(); } });
$('entry').addEventListener('submit', (e) => {
  e.preventDefault();
  current.readings.unshift({ ...draft, at: new Date() });
  closeEntry(); view = 'now'; render();
  $('new-reading').focus();
});
$('entry-cancel').addEventListener('click', () => { closeEntry(); $('new-reading').focus(); });
$('new-reading').addEventListener('click', openEntry);
$('tab-now').addEventListener('click', () => { view = 'now'; render(); });
$('tab-log').addEventListener('click', () => { view = 'log'; render(); });

document.addEventListener('keydown', (e) => {
  const mod = e.metaKey || e.ctrlKey;
  if (e.key === 'Escape' && !$('entry').hidden) { closeEntry(); $('new-reading').focus(); }
  else if (mod && /^[1-3]$/.test(e.key)) { e.preventDefault(); current = pools[Number(e.key) - 1]; closeEntry(); render(); }
  else if (mod && e.key.toLowerCase() === 'n') { e.preventDefault(); openEntry(); }
});

// Native menu commands (Electron only). In a browser the same commands are on the keyboard.
host?.onMenu?.((command) => {
  if (command === 'new-reading') openEntry();
  else if (command === 'view-now' || command === 'view-log') { view = command.slice(5); render(); }
  else if (command.startsWith('pool-')) { current = pools[Number(command.slice(5)) - 1] || current; closeEntry(); render(); }
});

render();
setInterval(() => { renderPools(); renderStatus(); applyCss(document.body); }, 30000);
