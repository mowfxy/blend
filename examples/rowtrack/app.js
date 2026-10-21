// Rowtrack example: the pattern editor, synth, scope and keyboard are real.
// The pattern is text; the page renders it on a character grid and scrolls it a row at a time.

const ROWS = 64, BPM = 125, SPEED = 6;
const TICK = 2.5 / BPM;              // seconds per tick
const ROW_DUR = TICK * SPEED;        // 0.12 s per row
const CURSOR = 10;                   // the cursor bar sits on the 11th visible row
const NAMES = ['KICK·SNR', 'HATS', 'BASS', 'LEAD', 'CHORD'];
const NOTE_IDX = { 'C-': 0, 'C#': 1, 'D-': 2, 'D#': 3, 'E-': 4, 'F-': 5, 'F#': 6, 'G-': 7, 'G#': 8, 'A-': 9, 'A#': 10, 'B-': 11 };
const reduce = matchMedia('(prefers-reduced-motion: reduce)');

const $ = (s) => document.querySelector(s);
const hex = (n) => n.toString(16).toUpperCase().padStart(2, '0');
const midiOf = (note) => 12 * (Number(note[2]) + 1) + NOTE_IDX[note.slice(0, 2)];
const freqOf = (note) => 440 * 2 ** ((midiOf(note) - 69) / 12);

// ---------- the pattern: "Low Tide" ----------
const cell = () => ({ note: null, ins: null, vol: null, fx: null });
const pat = NAMES.map(() => Array.from({ length: ROWS }, cell));
const put = (ch, row, note, ins, vol, fx) => Object.assign(pat[ch][row], { note, ins, vol, fx });

for (let r = 0; r < ROWS; r++) {
  const b = r % 16;
  if (b === 0 || b === 8 || b === 10) put(0, r, 'C-2', 1, b === 10 ? 0x30 : 0x40, null);
  if (r % 8 === 4) put(0, r, 'D-2', 2, 0x38, null);
  if (r % 2 === 0) put(1, r, b === 14 ? 'A#5' : 'F#5', 3, r % 4 === 0 ? 0x24 : 0x14, null);
}
put(0, 61, 'D-2', 2, 0x18, null); put(0, 62, 'D-2', 2, 0x24, null); put(0, 63, 'D-2', 2, 0x30, null);

const chords = [['A-1', 'A-3', '037'], ['F-1', 'F-3', '047'], ['C-2', 'C-4', '047'], ['G-1', 'G-3', '047']];
chords.forEach(([root, chord, arp], bar) => {
  const o = bar * 16, up = root[0] + root[1] + (Number(root[2]) + 1);
  [[0, root], [3, root], [6, up], [8, root], [11, root], [14, up]].forEach(([d, n]) => put(2, o + d, n, 4, 0x34, null));
  put(4, o, chord, 6, 0x16, arp);
  for (let d = 1; d < 16; d++) pat[4][o + d].fx = arp;
});

const melody = [
  [0, 'E-4'], [4, 'A-4'], [6, 'C-5'], [8, 'B-4'], [12, 'A-4', 0x30, '462'], [15, '==='],
  [16, 'C-5'], [18, 'A-4'], [20, 'F-4'], [24, 'A-4'], [26, 'C-5', 0x34, 'A04'],
  [32, 'G-4'], [36, 'E-4'], [38, 'G-4'], [40, 'C-5'], [44, 'E-5', 0x30, '462'], [47, '==='],
  [48, 'D-5'], [50, 'B-4'], [52, 'G-4'], [56, 'B-4'], [58, 'D-5', 0x30, '310'], [62, '===']
];
for (const [r, n, v, fx] of melody) n === '===' ? put(3, r, '===', null, null, null) : put(3, r, n, 5, v ?? 0x2c, fx ?? null);
for (const r of [13, 14, 45, 46]) pat[3][r].fx = '462';
for (const r of [27, 28, 29, 30]) pat[3][r].fx = 'A04';
for (const r of [59, 60, 61]) pat[3][r].fx = '310';

// ---------- rendering on the character grid ----------
const patternEl = $('#pattern'), wellEl = $('#well'), vuEl = $('#vu'), scopeEl = $('#scope'), posEl = $('#pos'), stateEl = $('#state');
let visibleCh = NAMES.length;

const dots = (n) => `<span class="dot">${'·'.repeat(n)}</span>`;
function cellHtml(c) {
  if (c.note === '===') return `<span class="c-note">===</span> ${dots(2)} ${dots(2)} ${c.fx ? `<span class="c-fx">${c.fx}</span>` : dots(3)}`;
  return [
    c.note ? `<span class="c-note">${c.note}</span>` : dots(3),
    c.ins != null ? `<span class="c-ins">${hex(c.ins)}</span>` : dots(2),
    c.vol != null ? `<span class="c-vol">${hex(c.vol)}</span>` : dots(2),
    c.fx ? `<span class="c-fx">${c.fx}</span>` : dots(3)
  ].join(' ');
}
function rowHtml(r, live) {
  const cls = r % 16 === 0 ? 'r bar1' : r % 4 === 0 ? 'r beat' : 'r';
  const cells = [];
  for (let ch = 0; ch < visibleCh; ch++) {
    const inner = cellHtml(pat[ch][r]);
    if (ch === 0) {
      const c = pat[0][r], what = c.ins === 1 ? 'kick' : c.ins === 2 ? 'snare' : 'empty';
      cells.push(live
        ? `<button type="button" class="hit" data-row="${r}" aria-label="Row ${hex(r)}, ${what}. Click to change.">${inner}</button>`
        : `<span class="hit" data-row="${r}">${inner}</span>`);
    } else cells.push(inner);
  }
  return `<span class="${cls}"><span class="n">${hex(r)}</span> <span class="sep">│</span>${cells.join('<span class="sep">│</span>')}</span>`;
}
function renderPattern() {
  // Ten rows of the previous loop above, the loop itself, and eleven rows of the next below,
  // so the window never shows a gap when row 3F wraps to 00.
  const out = [];
  for (let i = -CURSOR; i < ROWS + 11; i++) out.push(rowHtml((i + ROWS) % ROWS, i >= 0 && i < ROWS));
  patternEl.innerHTML = out.join('');
  patternEl.querySelectorAll('span.hit').forEach((s) => s.setAttribute('aria-hidden', 'true'));
}
function fitChannels() {
  const probe = document.createElement('span');
  probe.textContent = '0'.repeat(10);
  patternEl.appendChild(probe);
  const chW = probe.getBoundingClientRect().width / 10;
  probe.remove();
  const usable = wellEl.clientWidth - 24;
  const n = Math.max(2, Math.min(NAMES.length, Math.floor((usable / chW - 5) / 14)));
  if (n !== visibleCh) { visibleCh = n; renderPattern(); }
  return chW;
}

const rowH = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--row-h'));
let shownRow = -1;
function showRow(r) {
  if (r === shownRow) return;
  shownRow = r;
  patternEl.style.transform = `translateY(${-r * rowH()}px)`;
  posEl.textContent = `ROW ${hex(r)}`;
}

patternEl.addEventListener('click', (e) => {
  const btn = e.target.closest('button.hit');
  if (!btn) return;
  const r = Number(btn.dataset.row), c = pat[0][r];
  if (c.ins === 1) put(0, r, 'D-2', 2, 0x38, null);
  else if (c.ins === 2) put(0, r, null, null, null, null);
  else put(0, r, 'C-2', 1, 0x40, null);
  renderPattern();
  if (ctx) trigger(0, r, ctx.currentTime);
});

// ---------- levels, VU and scope ----------
const level = NAMES.map(() => 0);
const voiceFreq = NAMES.map(() => 0);
const EIGHTHS = ' ▏▎▍▌▋▊▉█';
function bar(v, w) {
  const units = Math.round(Math.max(0, Math.min(1, v)) * w * 8);
  return '█'.repeat(Math.floor(units / 8)) + (units % 8 ? EIGHTHS[units % 8] : '') + ' '.repeat(Math.max(0, w - Math.ceil(units / 8)));
}
function renderVu() {
  const names = [], meters = [];
  for (let ch = 0; ch < visibleCh; ch++) {
    names.push(NAMES[ch].padEnd(13).slice(0, 13));
    meters.push(bar(level[ch], 13));
  }
  vuEl.textContent = `   ${names.join(' ')}\n   ${meters.join(' ')}`;
}

const SCOPE_ROWS = 3, BRAILLE = [[0x1, 0x8], [0x2, 0x10], [0x4, 0x20], [0x40, 0x80]];
let scopeBuf = null;
function renderScope(chars) {
  const W = chars * 2, H = SCOPE_ROWS * 4, ys = new Array(W);
  if (analyser && playing) {
    scopeBuf ??= new Float32Array(analyser.fftSize);
    analyser.getFloatTimeDomainData(scopeBuf);
    // Trigger on a rising zero crossing so the trace stands still, like a real scope.
    let start = 0;
    for (let i = 1; i < scopeBuf.length / 2; i++) if (scopeBuf[i - 1] < 0 && scopeBuf[i] >= 0) { start = i; break; }
    for (let x = 0; x < W; x++) ys[x] = scopeBuf[start + x * 4] * 2.2;
  } else {
    // Muted preview: the same voices, computed instead of heard.
    const t0 = performance.now() / 1000;
    for (let x = 0; x < W; x++) {
      const t = t0 + x / W * 0.02;
      let y = 0;
      for (let ch = 2; ch < NAMES.length; ch++) if (voiceFreq[ch]) y += level[ch] * Math.sin(2 * Math.PI * voiceFreq[ch] * t) * (ch === 2 ? 0.9 : 0.5);
      y += (level[0] + level[1] * 0.4) * (Math.random() - 0.5) * 0.6;
      ys[x] = y;
    }
    const peak = Math.max(0.35, ...ys.map(Math.abs));
    for (let x = 0; x < W; x++) ys[x] = ys[x] / peak * 0.85;
  }
  const grid = Array.from({ length: SCOPE_ROWS }, () => new Array(chars).fill(0));
  let prev = null;
  for (let x = 0; x < W; x++) {
    const y = Math.round((1 - Math.max(-1, Math.min(1, ys[x]))) / 2 * (H - 1));
    const lo = prev == null ? y : Math.min(prev, y), hi = prev == null ? y : Math.max(prev, y);
    for (let yy = lo; yy <= hi; yy++) grid[yy >> 2][x >> 1] |= BRAILLE[yy & 3][x & 1];
    prev = y;
  }
  scopeEl.textContent = grid.map((row) => '   ' + row.map((b) => String.fromCharCode(0x2800 + b)).join('')).join('\n');
}

// ---------- the synth ----------
let ctx = null, master = null, analyser = null, noise = null;
const held = NAMES.map(() => null);

function audio() {
  if (ctx) return ctx;
  ctx = new AudioContext();
  const comp = ctx.createDynamicsCompressor();
  master = ctx.createGain(); master.gain.value = 0.55;
  analyser = ctx.createAnalyser(); analyser.fftSize = 2048;
  master.connect(comp).connect(analyser).connect(ctx.destination);
  noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const d = noise.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return ctx;
}
function env(g, t, peak, decay) {
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
}
function noiseHit(t, type, freq, peak, decay) {
  const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
  s.buffer = noise; f.type = type; f.frequency.value = freq;
  s.connect(f).connect(g).connect(master); env(g, t, peak, decay);
  s.start(t, Math.random()); s.stop(t + decay + 0.05);
}
function release(ch, t) {
  const v = held[ch];
  if (!v) return;
  v.g.gain.cancelScheduledValues(t);
  v.g.gain.setTargetAtTime(0.0001, t, 0.03);
  v.osc.stop(t + 0.3);
  held[ch] = null;
}
function tone(ch, t, note, ins, vol) {
  release(ch, t);
  const osc = ctx.createOscillator(), f = ctx.createBiquadFilter(), g = ctx.createGain();
  const v = vol / 64, hz = freqOf(note);
  osc.type = ins === 4 ? 'square' : ins === 5 ? 'sawtooth' : 'square';
  osc.frequency.setValueAtTime(hz, t);
  f.type = 'lowpass'; f.Q.value = ins === 4 ? 5 : 1;
  f.frequency.setValueAtTime(ins === 4 ? 2200 : 2600, t);
  f.frequency.exponentialRampToValueAtTime(ins === 4 ? 380 : 1400, t + 0.25);
  const peak = (ins === 4 ? 0.34 : ins === 5 ? 0.16 : 0.07) * v;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + 0.008);
  g.gain.setTargetAtTime(peak * 0.7, t + 0.05, 0.1);
  osc.connect(f).connect(g).connect(master);
  osc.start(t);
  held[ch] = { osc, g, hz, peak };
}
function trigger(ch, r, t) {
  const c = pat[ch][r];
  if (c.note === '===') { release(ch, t); level[ch] = 0; voiceFreq[ch] = 0; return; }
  if (c.note) {
    const vol = c.vol ?? 0x40;
    if (c.ins === 1) {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.12);
      o.connect(g).connect(master); env(g, t, 0.95 * vol / 64, 0.32); o.start(t); o.stop(t + 0.35);
    } else if (c.ins === 2) {
      noiseHit(t, 'bandpass', 1900, 0.75 * vol / 64, 0.18);
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'triangle'; o.frequency.value = 190; o.connect(g).connect(master); env(g, t, 0.35 * vol / 64, 0.09); o.start(t); o.stop(t + 0.12);
    } else if (c.ins === 3) {
      noiseHit(t, 'highpass', 7200, 0.32 * vol / 64, c.note === 'A#5' ? 0.26 : 0.045);
    } else if (c.note !== '===' && c.ins) {
      if (c.fx && c.fx[0] === '3' && held[ch]) {
        held[ch].osc.frequency.setTargetAtTime(freqOf(c.note), t, 0.06);
        held[ch].hz = freqOf(c.note);
      } else tone(ch, t, c.note, c.ins, vol);
    }
  }
  const v = held[ch];
  if (v && c.fx) {
    const [cmd, x, y] = [c.fx[0], parseInt(c.fx[1], 16), parseInt(c.fx[2], 16)];
    if (cmd === '0') for (let k = 0; k < SPEED; k++) v.osc.frequency.setValueAtTime(v.hz * 2 ** ([0, x, y][k % 3] / 12), t + k * TICK);
    if (cmd === '4') for (let k = 0; k < SPEED; k++) v.osc.frequency.setValueAtTime(v.hz * 2 ** (Math.sin((k + r * SPEED) * x * 0.4) * y / 96), t + k * TICK);
    if (cmd === 'A') v.g.gain.setTargetAtTime(Math.max(0.0001, v.g.gain.value * (1 - y / 24)), t, 0.06);
  }
}

// ---------- the clock: audio when playing, a quiet preview otherwise ----------
let playing = false, previewing = false, row = 0, nextTime = 0, queue = [], timer = 0, previewStart = 0, onScreen = true;

function noteEvent(ch, r) {
  const c = pat[ch][r];
  if (c.note === '===') { level[ch] = 0; voiceFreq[ch] = 0; }
  else if (c.note) { level[ch] = (c.vol ?? 0x40) / 64; if (ch >= 2) voiceFreq[ch] = freqOf(c.note); }
}
function schedule() {
  while (nextTime < ctx.currentTime + 0.1) {
    for (let ch = 0; ch < NAMES.length; ch++) trigger(ch, row, nextTime);
    queue.push({ row, time: nextTime });
    nextTime += ROW_DUR; row = (row + 1) % ROWS;
  }
}
function start() {
  audio(); ctx.resume();
  stopPreview();
  playing = true; row = 0; queue = []; nextTime = ctx.currentTime + 0.06;
  schedule(); timer = setInterval(schedule, 25);
  setState(true);
}
function stop() {
  if (playing) {
    clearInterval(timer); playing = false;
    const t = ctx.currentTime; for (let ch = 0; ch < NAMES.length; ch++) release(ch, t);
  }
  stopPreview();
  level.fill(0); voiceFreq.fill(0);
  showRow(0); renderVu(); renderScope(scopeChars);
  setState(false);
}
function startPreview() {
  if (playing || reduce.matches || !onScreen || document.hidden) return;
  previewing = true; previewStart = performance.now() - shownRow * ROW_DUR * 1000;
}
function stopPreview() { previewing = false; }

let lastRow = -1;
function frame(now) {
  let r = null;
  if (playing) {
    while (queue.length && queue[0].time <= ctx.currentTime) r = queue.shift().row;
  } else if (previewing) {
    r = ((Math.floor((now - previewStart) / (ROW_DUR * 1000)) % ROWS) + ROWS) % ROWS;
  }
  if (r != null && r !== lastRow) {
    for (let ch = 0; ch < NAMES.length; ch++) noteEvent(ch, r);
    lastRow = r; showRow(r);
  }
  if ((playing || previewing) && onScreen) {
    const decay = Math.exp(-1 / 60 * 7);
    for (let ch = 0; ch < 2; ch++) level[ch] *= decay;
    for (let ch = 2; ch < NAMES.length; ch++) level[ch] *= 0.996;
    renderVu(); renderScope(scopeChars);
  }
  requestAnimationFrame(frame);
}

const playBtn = $('#play'), live = $('#live');
let announced = null;
function setState(on) {
  playBtn.setAttribute('aria-pressed', String(on));
  playBtn.querySelector('.lbl').textContent = on ? 'Playing' : 'Play with sound';
  stateEl.textContent = on ? '▶ PLAYING' : previewing ? 'PREVIEW · MUTED' : 'STOPPED';
  const msg = on ? 'Playing Low Tide with sound.' : 'Stopped.';
  if (announced !== null && announced !== msg) live.textContent = msg;
  announced = msg;
}
playBtn.addEventListener('click', () => (playing ? stop() : start()));
$('#stop').addEventListener('click', stop);

// ---------- the QWERTY piano ----------
const LOWER = [['Z', 'C-3'], ['S', 'C#3'], ['X', 'D-3'], ['D', 'D#3'], ['C', 'E-3'], ['V', 'F-3'], ['G', 'F#3'], ['B', 'G-3'], ['H', 'G#3'], ['N', 'A-3'], ['J', 'A#3'], ['M', 'B-3']];
const UPPER = [['Q', 'C-4'], ['2', 'C#4'], ['W', 'D-4'], ['3', 'D#4'], ['E', 'E-4'], ['R', 'F-4'], ['5', 'F#4'], ['T', 'G-4'], ['6', 'G#4'], ['Y', 'A-4'], ['7', 'A#4'], ['U', 'B-4']];
const keyEls = new Map();
const piano = $('#piano');
piano.style.gridTemplateColumns = 'repeat(14, minmax(0, 1fr))';
[[UPPER, 1], [LOWER, 3]].forEach(([oct, top]) => {
  let white = 0;
  for (const [k, note] of oct) {
    const sharp = note[1] === '#';
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'pk' + (sharp ? ' sharp' : '');
    b.innerHTML = `${k}<small>${note}</small>`;
    b.setAttribute('aria-label', `${note.replace('-', '')}, key ${k}`);
    b.style.gridRow = String(sharp ? top : top + 1);
    b.style.gridColumn = sharp ? `${white * 2} / span 2` : `${white * 2 + 1} / span 2`;
    if (!sharp) white++;
    b.addEventListener('pointerdown', () => playKey(k));
    b.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); playKey(k); } });
    piano.appendChild(b); keyEls.set(k, [b, note]);
  }
});
function playKey(k) {
  const entry = keyEls.get(k);
  if (!entry) return;
  const [el, note] = entry;
  audio(); ctx.resume();
  const t = ctx.currentTime, o = ctx.createOscillator(), f = ctx.createBiquadFilter(), g = ctx.createGain();
  o.type = 'sawtooth'; o.frequency.value = freqOf(note); f.type = 'lowpass'; f.frequency.value = 2400;
  o.connect(f).connect(g).connect(master); env(g, t, 0.2, 0.5); o.start(t); o.stop(t + 0.55);
  el.classList.add('on'); setTimeout(() => el.classList.remove('on'), 140);
}

addEventListener('keydown', (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
  const onControl = e.target.closest?.('button, a, input, textarea, select');
  if (e.key === ' ' && !onControl) { e.preventDefault(); playing ? stop() : start(); return; }
  if (e.key === 'Escape') { stop(); return; }
  if (!onControl || e.target.closest('.pk')) playKey(e.key.toUpperCase());
});

// ---------- copy ----------
document.querySelectorAll('.copy').forEach((b) => b.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(b.dataset.copy); } catch { return; }
  const lbl = b.querySelector('.lbl'); b.classList.add('done'); lbl.textContent = 'Copied';
  setTimeout(() => { b.classList.remove('done'); lbl.textContent = 'Copy'; }, 1600);
}));

// ---------- lifecycle ----------
let scopeChars = 40;
function layout() {
  const chW = fitChannels();
  scopeChars = Math.max(20, Math.min(120, Math.floor((wellEl.clientWidth - 24) / chW) - 3));
  renderVu(); renderScope(scopeChars);
  shownRow = -1; showRow(Math.max(0, lastRow));
}
new ResizeObserver(layout).observe(wellEl);
new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; if (onScreen) startPreview(); else stopPreview(); if (!playing) setState(false); }).observe($('.screen'));
document.addEventListener('visibilitychange', () => { if (document.hidden) stopPreview(); else startPreview(); if (!playing) setState(false); });
reduce.addEventListener('change', () => { if (reduce.matches) stopPreview(); else startPreview(); if (!playing) setState(false); });

renderPattern(); layout(); showRow(0); startPreview(); setState(false);
requestAnimationFrame(frame);
