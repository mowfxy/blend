#!/usr/bin/env node
// Kern by M4 Labs — measuring tools for the Kern design practice.
// These tools measure; they never choose a design. No dependencies, Node 18+.
//
//   kern palette <color> [--steps 11] [--neutral] [--json]
//   kern contrast <fg> <bg> [--json]
//   kern ledger add|check --fingerprint .kern/fingerprint.json [--threshold 0.6]
//   kern ledger compare <a.json> <b.json>
//   kern ledger list
//   kern audit [path ...] [--json]

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync, appendFileSync } from 'node:fs';
import { join, extname, basename, relative, resolve } from 'node:path';
import { homedir } from 'node:os';

const argv = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const next = argv[i + 1];
  return next === undefined || next.startsWith('--') ? true : next;
};
const VALUE_FLAGS = new Set(['--steps', '--fingerprint', '--threshold']);
const positional = argv.filter((a, i) => !a.startsWith('--') && !(i > 0 && VALUE_FLAGS.has(argv[i - 1])));
const asJson = flag('json', false) === true;
const die = (msg) => { console.error(`kern: ${msg}`); process.exit(2); };

// ---------- colour ----------

const clamp01 = (x) => Math.min(1, Math.max(0, x));
const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const fromLinear = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

function parseColor(input) {
  const s = String(input).trim().toLowerCase();
  let m = s.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/);
  if (m) {
    let h = m[1];
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  }
  m = s.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/);
  if (m) return [m[1], m[2], m[3]].map((v) => Number(v) / 255);
  m = s.match(/^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)/);
  if (m) {
    const L = Number(m[1]) / (m[2] ? 100 : 1);
    return oklchToRgb([L, Number(m[3]), Number(m[4])]);
  }
  die(`cannot parse colour "${input}" (use #hex, rgb(), or oklch(L C H))`);
}

function rgbToOklab([r, g, b]) {
  const [lr, lg, lb] = [r, g, b].map(toLinear);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}
function oklabToLinear([L, a, b]) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}
const rgbToOklch = (rgb) => {
  const [L, a, b] = rgbToOklab(rgb);
  const C = Math.hypot(a, b);
  const H = ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360;
  return [L, C, H];
};
const inGamut = (lin) => lin.every((v) => v >= -1e-4 && v <= 1 + 1e-4);
function oklchToRgb([L, C, H]) {
  // Reduce chroma until the colour fits sRGB, keeping lightness and hue.
  let c = C;
  for (let i = 0; i < 40; i++) {
    const h = (H * Math.PI) / 180;
    const lin = oklabToLinear([L, c * Math.cos(h), c * Math.sin(h)]);
    if (inGamut(lin) || c < 1e-4) return lin.map((v) => clamp01(fromLinear(clamp01(v))));
    c *= 0.95;
  }
  return [L, L, L];
}
const hex = (rgb) => '#' + rgb.map((v) => Math.round(clamp01(v) * 255).toString(16).padStart(2, '0')).join('');
const fmtOklch = ([L, C, H]) => `oklch(${(L * 100).toFixed(1)}% ${C.toFixed(3)} ${H.toFixed(1)})`;

function wcag(fg, bg) {
  const lum = (rgb) => { const [r, g, b] = rgb.map(toLinear); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
  const [a, b] = [lum(fg), lum(bg)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}
function apca(fg, bg) {
  // APCA-W3 0.0.98G-4g constants. Lc is a guide to perceived contrast; WCAG 2 remains the conformance test.
  const Y = ([r, g, b]) => 0.2126729 * r ** 2.4 + 0.7151522 * g ** 2.4 + 0.072175 * b ** 2.4;
  const soft = (y) => (y < 0.022 ? y + (0.022 - y) ** 1.414 : y);
  const t = soft(Y(fg)), b = soft(Y(bg));
  if (Math.abs(b - t) < 0.0005) return 0;
  let out;
  if (b > t) { const s = (b ** 0.56 - t ** 0.57) * 1.14; out = s < 0.1 ? 0 : s - 0.027; }
  else { const s = (b ** 0.65 - t ** 0.62) * 1.14; out = s > -0.1 ? 0 : s + 0.027; }
  return out * 100;
}
const grade = (ratio) => (ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA large/UI' : 'fail');

function cmdContrast() {
  const [, fgIn, bgIn] = positional;
  if (!fgIn || !bgIn) die('usage: kern contrast <fg> <bg>');
  const fg = parseColor(fgIn), bg = parseColor(bgIn);
  const ratio = wcag(fg, bg), lc = apca(fg, bg);
  const result = { fg: hex(fg), bg: hex(bg), wcag: Number(ratio.toFixed(2)), grade: grade(ratio), apcaLc: Number(lc.toFixed(1)) };
  if (asJson) return console.log(JSON.stringify(result, null, 2));
  console.log(`${result.fg} on ${result.bg}`);
  console.log(`  WCAG 2  ${result.wcag}:1  ${result.grade}   (text ≥ 4.5, large text and UI ≥ 3)`);
  console.log(`  APCA    Lc ${result.apcaLc}   (body ≥ 75, large ≥ 60, non-text ≥ 45; sign shows polarity)`);
}

function cmdPalette() {
  const input = positional[1];
  if (!input) die('usage: kern palette <color> [--steps 11] [--neutral]');
  const steps = Math.max(3, Math.min(21, Number(flag('steps', 11)) || 11));
  const neutral = flag('neutral', false) === true;
  const [L0, C0, H] = rgbToOklch(parseColor(input));
  const C = neutral ? Math.min(Math.max(C0, 0.004), 0.02) : C0;
  const names = steps === 11 ? [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] : Array.from({ length: steps }, (_, i) => i + 1);
  const white = [1, 1, 1], black = [0, 0, 0];
  const rows = names.map((name, i) => {
    const t = i / (steps - 1);
    const L = 0.975 - t * (0.975 - 0.16);
    // Chroma peaks near the source lightness and tapers at the ends, so tints don't go fluorescent and shades don't go muddy.
    const taper = Math.max(0.12, 1 - Math.abs(L - L0) * 1.35) * Math.sin(Math.PI * Math.min(0.98, Math.max(0.02, L)));
    const c = C * Math.min(1.05, taper / Math.max(0.3, Math.sin(Math.PI * L0)));
    const rgb = oklchToRgb([L, c, H]);
    const actual = rgbToOklch(rgb);
    return { token: name, hex: hex(rgb), oklch: fmtOklch(actual), onWhite: Number(wcag(rgb, white).toFixed(2)), onBlack: Number(wcag(rgb, black).toFixed(2)) };
  });
  const source = { input, oklch: fmtOklch([L0, C0, H]) };
  if (asJson) return console.log(JSON.stringify({ source, neutral, ramp: rows }, null, 2));
  console.log(`Source ${input} = ${source.oklch}${neutral ? '  (neutral: chroma capped at 0.02)' : ''}`);
  console.log('token  hex      oklch                        vs white  vs black');
  for (const r of rows) console.log(`${String(r.token).padEnd(6)} ${r.hex}  ${r.oklch.padEnd(28)} ${String(r.onWhite).padStart(6)}  ${String(r.onBlack).padStart(8)}`);
  console.log('\nThe ramp is a starting point. Tune individual steps by eye on the real surface, then re-check contrast.');
}

// ---------- ledger ----------

const KERN_HOME = process.env.KERN_HOME || join(homedir(), '.kern');
const LEDGER = join(KERN_HOME, 'ledger.jsonl');
const FIELDS = { platform: 1, structure: 2, register: 1, materials: 1.5, type: 2, colorSource: 1.5, colorStance: 1.5, theme: 0.5, density: 1, shape: 1, controls: 1, motion: 1, imagery: 1.5, risk: 1 };
const STOP = new Set(['a', 'an', 'the', 'and', 'or', 'with', 'of', 'in', 'on', 'for', 'to', 'one', 'no', 'none', 'plus']);
const words = (v) => new Set(String(Array.isArray(v) ? v.join(' ') : v ?? '').toLowerCase().split(/[^a-z0-9]+/).filter((w) => w && !STOP.has(w)));
function fieldSim(a, b) {
  const A = words(a), B = words(b);
  if (!A.size && !B.size) return null;
  if (!A.size || !B.size) return 0;
  let inter = 0; for (const w of A) if (B.has(w)) inter++;
  return inter / (A.size + B.size - inter);
}
function similarity(a, b) {
  let num = 0, den = 0; const detail = {};
  for (const [f, w] of Object.entries(FIELDS)) {
    const s = fieldSim(a[f], b[f]);
    if (s === null) continue;
    detail[f] = Number(s.toFixed(2)); num += s * w; den += w;
  }
  return { score: den ? num / den : 0, detail };
}
const readJson = (p) => { try { return JSON.parse(readFileSync(p, 'utf8')); } catch (e) { die(`cannot read ${p}: ${e.message}`); } };
const readLedger = () => (existsSync(LEDGER) ? readFileSync(LEDGER, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)) : []);

function cmdLedger() {
  const sub = positional[1];
  const threshold = Number(flag('threshold', 0.6));
  if (sub === 'list') {
    const rows = readLedger();
    if (asJson) return console.log(JSON.stringify(rows, null, 2));
    if (!rows.length) return console.log(`Ledger is empty (${LEDGER}).`);
    for (const r of rows) console.log(`${r.added?.slice(0, 10) ?? '          '}  ${String(r.project).padEnd(24)} ${r.platform ?? ''} · ${[].concat(r.type ?? []).join(' + ')} · ${r.colorSource ?? ''}`);
    return;
  }
  if (sub === 'compare') {
    const [a, b] = positional.slice(2).map(readJson);
    if (!a || !b) die('usage: kern ledger compare <a.json> <b.json>');
    const { score, detail } = similarity(a, b);
    if (asJson) return console.log(JSON.stringify({ score: Number(score.toFixed(2)), detail }, null, 2));
    console.log(`Similarity ${(score * 100).toFixed(0)}%  (${score >= threshold ? 'near-duplicate' : 'distinct'} at threshold ${threshold * 100}%)`);
    for (const [f, s] of Object.entries(detail)) console.log(`  ${f.padEnd(12)} ${(s * 100).toFixed(0).padStart(3)}%`);
    return;
  }
  if (sub !== 'add' && sub !== 'check') die('usage: kern ledger add|check|compare|list');
  const fpPath = flag('fingerprint', '.kern/fingerprint.json');
  const fp = readJson(fpPath);
  if (!fp.project) die('fingerprint needs a "project" field');
  const others = readLedger().filter((r) => r.project !== fp.project);
  const hits = others.map((r) => ({ r, ...similarity(fp, r) })).sort((x, y) => y.score - x.score);
  const close = hits.filter((h) => h.score >= threshold && !(fp.brand && h.r.brand && fp.brand === h.r.brand));
  if (asJson && sub === 'check') return console.log(JSON.stringify({ nearest: hits.slice(0, 3).map((h) => ({ project: h.r.project, score: Number(h.score.toFixed(2)), detail: h.detail })), nearDuplicates: close.length }, null, 2));
  if (hits.length) {
    console.log(`Nearest projects in the ledger (${others.length} other${others.length === 1 ? '' : 's'}):`);
    for (const h of hits.slice(0, 3)) {
      const same = Object.entries(h.detail).filter(([, s]) => s >= 0.5).map(([f]) => f);
      console.log(`  ${(h.score * 100).toFixed(0).padStart(3)}%  ${h.r.project}${same.length ? `  — shares ${same.join(', ')}` : ''}`);
    }
  } else console.log('No other projects in the ledger yet.');
  if (close.length) {
    console.log(`\n✗ ${close.length} near-duplicate${close.length > 1 ? 's' : ''} of an unrelated project (≥ ${threshold * 100}%). Change at least three axes, starting with the shared ones, and record why.`);
    if (sub === 'check') process.exitCode = 1;
  } else console.log('\n✓ Distinct from every unrelated project in the ledger.');
  if (sub === 'add') {
    if (close.length && flag('force', false) !== true) { console.log('Not added. Re-derive the system, or pass --force if the resemblance is intended.'); process.exitCode = 1; return; }
    mkdirSync(KERN_HOME, { recursive: true });
    const keep = readLedger().filter((r) => r.project !== fp.project);
    writeFileSync(LEDGER, keep.map((r) => JSON.stringify(r) + '\n').join(''));
    appendFileSync(LEDGER, JSON.stringify({ ...fp, added: new Date().toISOString() }) + '\n');
    console.log(`Recorded ${fp.project} in ${LEDGER}`);
  }
}

// ---------- audit ----------

const SKIP = new Set(['node_modules', '.git', '.next', '.nuxt', '.svelte-kit', 'dist', 'build', 'out', '.vercel', '.kern', 'coverage', '.turbo', 'vendor', 'target', 'Pods', 'DerivedData', '.gradle', 'bin', 'obj']);
const TEXT = new Set(['.html', '.htm', '.css', '.scss', '.sass', '.less', '.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs', '.vue', '.svelte', '.astro', '.json', '.swift', '.cs', '.xaml', '.kt', '.kts', '.java', '.dart', '.xml', '.plist']);
const MEDIAN_FACES = ['inter', 'geist', 'space grotesk', 'poppins', 'manrope', 'dm sans', 'playfair display'];

function walk(paths) {
  const out = [];
  const visit = (p) => {
    let st; try { st = statSync(p); } catch { return; }
    if (st.isDirectory()) { if (!SKIP.has(basename(p))) for (const e of readdirSync(p)) visit(join(p, e)); }
    else if (TEXT.has(extname(p).toLowerCase()) && st.size < 1_500_000) out.push(p);
  };
  paths.forEach((p) => visit(resolve(p)));
  return out;
}

function hueOfHex(h) {
  const [L, C, H] = rgbToOklch(parseColor(h));
  return { L, C, H };
}

function cmdAudit() {
  const roots = positional.slice(1).length ? positional.slice(1) : ['.'];
  const files = walk(roots);
  const findings = [];
  const add = (level, rule, file, line, message) => findings.push({ level, rule, file: relative(process.cwd(), file) || basename(file), line, message });
  const sources = new Map(files.map((f) => [f, readFileSync(f, 'utf8')]));
  const all = [...sources.values()].join('\n');
  const hasDrag = /(-webkit-)?app-region\s*:\s*drag/.test(all);
  const hasTauriDrag = /data-tauri-drag-region/.test(all);
  const hasReducedMotion = /prefers-reduced-motion|useReducedMotion|reducedMotion|accessibilityReduceMotion|ANIMATOR_DURATION_SCALE/.test(all);
  const isNative = files.some((f) => /\.(swift|kt|kts|xaml|dart)$/.test(f));
  let revealCount = 0; let revealFile = null; let motionAt = null;

  for (const [file, text] of sources) {
    const ext = extname(file).toLowerCase();
    const lines = text.split(/\r?\n/);
    const isStyle = ['.css', '.scss', '.sass', '.less', '.html', '.htm', '.vue', '.svelte', '.astro', '.jsx', '.tsx'].includes(ext);
    lines.forEach((ln, i) => {
      if (/kern-ignore/.test(ln)) return;
      const n = i + 1;
      if (isStyle || ['.js', '.ts'].includes(ext)) {
        const ff = ln.match(/font-family\s*:\s*["']?([^"',;]+)/i) || ln.match(/fontFamily\s*:\s*["'`]([^"'`,]+)/);
        if (ff && MEDIAN_FACES.includes(ff[1].trim().toLowerCase())) add('WARN', 'median-face', file, n, `${ff[1].trim()} is a median face. Keep it only if a specimen comparison chose it (kern-type).`);
        if (/transition(-property)?\s*:\s*all\b/i.test(ln)) add('WARN', 'transition-all', file, n, 'transition: all. Name the properties that animate (kern-motion).');
        if (/background-clip\s*:\s*text|bg-clip-text/.test(ln)) add('WARN', 'gradient-text', file, n, 'Gradient text is a median tell. Keep it only with a product reason.');
        const grad = ln.match(/(linear|radial|conic)-gradient\(([^;]*)/i);
        if (grad) {
          const hues = (grad[2].match(/#[0-9a-f]{6}\b|#[0-9a-f]{3}\b/gi) || []).map(hueOfHex);
          if (hues.some((h) => h.C > 0.08 && h.H >= 265 && h.H <= 320)) add('WARN', 'violet-gradient', file, n, 'A violet or indigo gradient is the most common generated palette. Derive colour from a source (kern-color).');
        }
        if (/\b(from|via|to)-(violet|indigo|purple)-\d{3}\b/.test(ln)) add('WARN', 'violet-gradient', file, n, 'A violet or indigo gradient is the most common generated palette. Derive colour from a source (kern-color).');
        if (/href=["']#["']/.test(ln)) add('WARN', 'dead-link', file, n, 'href="#" — give it a real destination or make it a button (kern-ship).');
        // Stock parts: the fastest way for unrelated products to look identical (kern-controls).
        const lib = ln.match(/from\s+["'](lucide-react|lucide-vue-next|lucide|@heroicons\/[\w-]+|react-icons\/\w+|react-feather|feather-icons|@tabler\/icons-react|@phosphor-icons\/react|@radix-ui\/react-icons)["']|(unpkg\.com|cdn\.jsdelivr\.net\/npm)\/(lucide|feather-icons|@tabler\/icons|@phosphor-icons)/);
        if (lib && !isNative) add('WARN', 'stock-icons', file, n, `${lib[1] || lib[3]} at its defaults. Draw the icons from the domain, or tune the set's stroke, size and corners to the system and record why (kern-controls).`);
        if (/inline-flex items-center justify-center (gap-2 )?whitespace-nowrap rounded-md text-sm font-medium/.test(ln)) add('WARN', 'kit-button', file, n, 'The component kit\'s default button classes. Derive the button anatomy from the domain (kern-controls).');
        if (/[✨\u{1F680}\u{1F525}⚡\u{1F4A1}✅\u{1F3AF}\u{1F4C8}]/u.test(ln) && /<(button|li|h[1-6]|span|div|a)\b|label|title/.test(ln)) add('WARN', 'emoji-icon', file, n, 'Emoji standing in for an icon (kern-controls).');
        if (/\banimate-(pulse|bounce|ping)\b/.test(ln)) add('WARN', 'loop-for-life', file, n, 'A looping pulse or bounce to look alive. Loop only the product\'s real material or a real process (kern-motion).');
        if (/\b(data-aos|whileInView|reveal|fade-?up|fadeInUp)\b/i.test(ln)) { revealCount++; revealFile ??= [file, n]; }
        if (/@keyframes|requestAnimationFrame|\.animate\(|gsap\.|animation\s*:|motion\.\w+|withSpring|withTiming|animate\s*=\s*\{/.test(ln)) motionAt ??= [file, n];
        if (/setPixelRatio\(\s*(window\.)?devicePixelRatio\s*\)/.test(ln)) add('WARN', '3d-pixel-ratio', file, n, 'Uncapped pixel ratio. Use Math.min(devicePixelRatio, 2) or lower so 3D stays smooth on dense phones (kern-imagery).');
      }
      if (/lorem ipsum/i.test(ln)) add('FAIL', 'placeholder', file, n, 'Lorem ipsum. Use the real content or a labelled sample.');
    });

    if ((ext === '.html' || ext === '.htm') && /<head[\s>]/i.test(text)) {
      if (!/name=["']theme-color["']/i.test(text)) add('WARN', 'theme-color', file, 1, 'No theme-color meta. Let the browser and app chrome continue the page surface (canon 6).');
      if (/<title>\s*(Vite \+ React|React App|Vite App|Document|Create Next App)\s*<\/title>/i.test(text)) add('FAIL', 'starter-title', file, 1, 'Starter title left in place (kern-ship).');
    }

    // Electron
    if (/new\s+BrowserWindow\s*\(/.test(text)) {
      const n = lines.findIndex((l) => /new\s+BrowserWindow\s*\(/.test(l)) + 1;
      if (!/titleBarStyle/.test(text)) add('FAIL', 'chrome-default', file, n, 'Electron window uses the default title bar. Set titleBarStyle and titleBarOverlay so the app surface runs to the top (kern-desktop/references/chrome.md).');
      else {
        if (!hasDrag) add('FAIL', 'chrome-drag', file, n, 'Title bar hidden but no -webkit-app-region: drag anywhere, so the window cannot be moved.');
        if (!/titleBarOverlay/.test(text)) add('WARN', 'chrome-windows', file, n, 'No titleBarOverlay. On Windows and Linux the caption buttons will not match the toolbar.');
        if (/titleBarOverlay/.test(text) && !/setTitleBarOverlay/.test(all)) add('WARN', 'chrome-theme', file, n, 'titleBarOverlay is never updated. Call setTitleBarOverlay when nativeTheme changes.');
      }
      if (!/backgroundColor/.test(text)) add('WARN', 'launch-flash', file, n, 'No backgroundColor on BrowserWindow, so a white flash appears before first paint.');
    }

    // Tauri
    if (/tauri\.conf\.json$/.test(file)) {
      try {
        const conf = JSON.parse(text);
        const wins = conf?.app?.windows ?? conf?.tauri?.windows ?? [];
        wins.forEach((w) => {
          if (w.decorations === false) { if (!hasTauriDrag) add('FAIL', 'chrome-drag', file, 1, 'decorations: false but no data-tauri-drag-region, so the window cannot be moved.'); }
          else if (!w.titleBarStyle) add('WARN', 'chrome-default', file, 1, `Window "${w.label ?? w.title ?? 'main'}" uses the default title bar. On macOS use titleBarStyle "Overlay" + hiddenTitle (kern-desktop/references/chrome.md).`);
        });
      } catch { /* not valid JSON; skip */ }
    }

    // SwiftUI on macOS
    if (ext === '.swift' && /WindowGroup/.test(text) && /(os\(macOS\)|NSApplication|\.commands\s*\{|Settings\s*\{|MenuBarExtra|windowStyle)/.test(all)) {
      if (!/(windowToolbarStyle|windowStyle|NavigationSplitView|toolbarBackgroundVisibility)/.test(all)) add('WARN', 'chrome-default', file, lines.findIndex((l) => /WindowGroup/.test(l)) + 1, 'macOS window without a unified toolbar, hidden title bar or NavigationSplitView. Integrate the title bar (kern-desktop).');
    }

    // WinUI 3
    if (ext === '.cs' && /Microsoft\.UI\.Xaml/.test(text) && /:\s*Window\b/.test(text) && !/ExtendsContentIntoTitleBar/.test(all)) {
      add('WARN', 'chrome-default', file, lines.findIndex((l) => /:\s*Window\b/.test(l)) + 1, 'WinUI window keeps the default title bar. Set ExtendsContentIntoTitleBar and SetTitleBar (kern-desktop).');
    }

    // Android edge-to-edge
    if (['.kt', '.java'].includes(ext) && /:\s*ComponentActivity\(\)|extends\s+ComponentActivity/.test(text) && !/enableEdgeToEdge/.test(text)) {
      add('WARN', 'edge-to-edge', file, lines.findIndex((l) => /ComponentActivity/.test(l)) + 1, 'Activity does not call enableEdgeToEdge(). System bars should continue the app surface (kern-android).');
    }
  }

  if (revealCount >= 6) add('WARN', 'same-entrance', revealFile[0], revealFile[1], `${revealCount} elements share one reveal. Choreograph each section by its content, or let most of them simply be there (kern-motion).`);
  if (motionAt && !hasReducedMotion) add('FAIL', 'reduced-motion', motionAt[0], motionAt[1], 'Animation with no reduced-motion handling anywhere. Give every moving thing a composed still (kern-motion).');
  if (/new\s+(THREE\.)?WebGLRenderer\s*\(/.test(all) && !/(IntersectionObserver|visibilitychange|setAnimationLoop\(\s*null\s*\))/.test(all)) {
    const [file, n] = [...sources].map(([f, t]) => [f, t.split(/\r?\n/).findIndex((l) => /WebGLRenderer\s*\(/.test(l)) + 1]).find(([, n]) => n > 0);
    add('WARN', '3d-offscreen', file, n, 'WebGL renders without pausing offscreen or in hidden tabs (kern-imagery).');
  }

  const fails = findings.filter((f) => f.level === 'FAIL').length;
  if (asJson) console.log(JSON.stringify({ files: files.length, fails, warns: findings.length - fails, findings }, null, 2));
  else {
    for (const f of findings) console.log(`${f.level.padEnd(4)}  ${f.rule.padEnd(16)} ${f.file}:${f.line}  ${f.message}`);
    console.log(`\nKern audit: ${files.length} files, ${fails} FAIL, ${findings.length - fails} WARN.`);
    console.log('Findings are evidence, not a verdict: an authorised brand choice stays, noted. Add "kern-ignore" to a line to keep a flagged pattern on purpose.');
    console.log('A clean audit measures the absence of tells, not the presence of taste. Look at the render (kern-critique).');
  }
  if (fails) process.exitCode = 1;
}

// ---------- main ----------

const commands = { palette: cmdPalette, contrast: cmdContrast, ledger: cmdLedger, audit: cmdAudit };
const cmd = positional[0];
if (!cmd || !commands[cmd]) {
  console.log(`Kern by M4 Labs — design measuring tools

  kern palette <color> [--steps 11] [--neutral] [--json]   OKLCH ramp from a source colour
  kern contrast <fg> <bg> [--json]                        WCAG 2 ratio and APCA Lc
  kern ledger check|add --fingerprint <file>              Compare against past projects; record this one
  kern ledger compare <a.json> <b.json>                   Field-by-field similarity of two fingerprints
  kern ledger list                                        Projects recorded on this machine (~/.kern)
  kern audit [path ...] [--json]                          Median tells, stock parts, motion safety, chrome, placeholders`);
  process.exit(cmd ? 2 : 0);
}
commands[cmd]();
