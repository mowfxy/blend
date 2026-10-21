// Skarvet 58: one generated massif, measured. Every number on the page comes from this terrain.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const $ = (s) => document.querySelector(s);
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const dark = matchMedia('(prefers-color-scheme: dark)');
const coarse = matchMedia('(pointer: coarse)');
const fmt = (n) => Math.round(n).toLocaleString('en-GB').replace(/,/g, ' ');

// ---------- terrain ----------
const N = 257;
function hash(ix, iy) {
  let h = (Math.imul(ix, 374761393) + Math.imul(iy, 668265263) + 0x5bd1e995) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
function vnoise(x, y) {
  const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy;
  const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
  const a = hash(ix, iy), b = hash(ix + 1, iy), c = hash(ix, iy + 1), d = hash(ix + 1, iy + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fbm(x, y, oct) { let s = 0, a = 0.5, f = 1, n = 0; for (let i = 0; i < oct; i++) { s += a * vnoise(x * f, y * f); n += a; a *= 0.5; f *= 2.03; } return s / n; }
function ridged(x, y, oct) {
  let s = 0, a = 0.5, f = 1, n = 0, w = 1;
  for (let i = 0; i < oct; i++) { let r = 1 - Math.abs(vnoise(x * f + 31.7, y * f + 11.3) * 2 - 1); r *= r * w; w = Math.min(1, r * 1.7); s += a * r; n += a; a *= 0.5; f *= 2.1; }
  return s / n;
}
const raw = new Float32Array(N * N);
let lo = Infinity, hi = -Infinity;
for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
  const x = i / (N - 1), y = j / (N - 1);
  const massif = Math.exp(-((x - 0.5) ** 2 + (y - 0.45) ** 2) / 0.07);
  const e = 0.16 * fbm(x * 3.2 + 4, y * 3.2 + 9, 5) + 0.6 * ridged(x * 2.4 + 2, y * 2.4 + 5, 6) * (0.35 + 0.8 * massif) + 0.32 * massif;
  raw[j * N + i] = e; lo = Math.min(lo, e); hi = Math.max(hi, e);
}
const ELEV = new Float32Array(N * N);
for (let k = 0; k < raw.length; k++) ELEV[k] = 420 + Math.pow((raw[k] - lo) / (hi - lo), 1.4) * 1640;
const sorted = Float32Array.from(ELEV).sort();
const WATER = sorted[Math.floor(sorted.length * 0.04)];
function elevAt(x, y) {
  const fx = Math.min(N - 1.001, Math.max(0, x * (N - 1))), fy = Math.min(N - 1.001, Math.max(0, y * (N - 1)));
  const i = Math.floor(fx), j = Math.floor(fy), u = fx - i, v = fy - j;
  const a = ELEV[j * N + i], b = ELEV[j * N + i + 1], c = ELEV[(j + 1) * N + i], d = ELEV[(j + 1) * N + i + 1];
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
}

// ---------- the course ----------
function highest(cx, cy, r) {
  let best = [cx, cy], be = -Infinity;
  for (let y = cy - r; y <= cy + r; y += 0.004) for (let x = cx - r; x <= cx + r; x += 0.004) { const e = elevAt(x, y); if (e > be) { be = e; best = [x, y]; } }
  return best;
}
const WAY = [[0.24, 0.74], [0.3, 0.6], [0.37, 0.5], highest(0.5, 0.43, 0.07), [0.6, 0.32], [0.72, 0.35], [0.76, 0.5], [0.69, 0.63], [0.55, 0.7], [0.38, 0.77]]
  .map(([x, y]) => [0.5 + (x - 0.5) * 0.92, 0.5 + (y - 0.5) * 0.92]);
const curve2 = new THREE.CatmullRomCurve3(WAY.map(([x, y]) => new THREE.Vector3(x, y, 0)), true, 'centripetal');
const S = 1400;
// A trail is not a spline: it wanders a little either side of the line between waymarks.
const flat = curve2.getSpacedPoints(S).map((p, k, all) => {
  const q = all[(k + 1) % S], dx = q.x - p.x, dy = q.y - p.y, l = Math.hypot(dx, dy) || 1;
  const off = (vnoise(k * 0.045, 7.3) - 0.5) * 0.03 + (vnoise(k * 0.21, 2.1) - 0.5) * 0.006;
  return { x: p.x - dy / l * off, y: p.y + dx / l * off };
});
flat[S] = flat[0];
const horiz = (sc) => { let t = 0; for (let k = 1; k <= S; k++) t += Math.hypot(flat[k].x - flat[k - 1].x, flat[k].y - flat[k - 1].y) * sc; return t; };
// Scale the map so the course measures 58 km over the ground, climbs included.
let MAP_KM = 58 / horiz(1);
for (let pass = 0; pass < 3; pass++) {
  let t = 0;
  for (let k = 1; k <= S; k++) {
    const dh = Math.hypot(flat[k].x - flat[k - 1].x, flat[k].y - flat[k - 1].y) * MAP_KM * 1000;
    t += Math.hypot(dh, elevAt(flat[k].x, flat[k].y) - elevAt(flat[k - 1].x, flat[k - 1].y));
  }
  MAP_KM *= 58000 / t;
}
const route = flat.map((p) => ({ x: p.x, y: p.y, e: Math.max(elevAt(p.x, p.y), WATER + 4) }));
const cum = [0];
for (let k = 1; k <= S; k++) {
  const dh = Math.hypot(route[k].x - route[k - 1].x, route[k].y - route[k - 1].y) * MAP_KM * 1000;
  cum.push(cum[k - 1] + Math.hypot(dh, route[k].e - route[k - 1].e));
}
const TOTAL_KM = cum[S] / 1000;
const smooth = route.map((_, k) => { let s = 0, n = 0; for (let d = -6; d <= 6; d++) { const q = route[(k + d + S) % S]; s += q.e; n++; } return s / n; });
const climbTo = [0];
for (let k = 1; k <= S; k++) climbTo.push(climbTo[k - 1] + Math.max(0, smooth[k] - smooth[k - 1]));
const CLIMB = Math.round(climbTo[S] / 10) * 10;
const HIGH = Math.max(...route.map((r) => r.e));
const iHigh = route.findIndex((r) => r.e === HIGH);
let iLow = iHigh; for (let k = iHigh; k < S * 0.7; k++) if (route[k].e < route[iLow].e) iLow = k;

const at = (frac) => Math.round(frac * S);
const CPS = [
  { name: 'Skarvbu', note: 'Start, the hut by the lake', i: 0, served: 'Registration · bag drop' },
  { name: 'Grønlia', note: 'Top of the birch', i: at(0.16), served: 'Water' },
  { name: 'Skarvet', note: 'Summit cairn', i: iHigh, served: 'Marshal · radio' },
  { name: 'Djupdalen', note: 'Valley floor', i: iLow, served: 'Water · food · medic · drop bag' },
  { name: 'Raudberget', note: 'Ridge shoulder', i: at(0.73), served: 'Water' },
  { name: 'Breiskaret', note: 'The last col', i: at(0.87), served: 'Water · marshal' },
  { name: 'Skarvbu', note: 'Finish', i: S, served: 'Food · showers · sauna' }
];
// Cut-offs: ten minutes a kilometre plus a minute per ten metres of climb, scaled so the finish is at 16 hours.
const rawT = (i) => cum[i] / 1000 * 10 + climbTo[i] / 10;
const scaleT = 960 / rawT(S);
CPS.forEach((c) => {
  c.km = cum[c.i] / 1000; c.e = route[c.i % S].e;
  const m = c.i === 0 ? null : Math.floor(rawT(c.i) * scaleT / 15) * 15;
  c.cut = m == null ? '05:00 start' : `${String(5 + Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
});

// ---------- numbers into the page ----------
$('#stat-climb').textContent = `${fmt(CLIMB)} m`;
$('#stat-high').textContent = `${fmt(HIGH)} m`;
$('#stat-km').textContent = String(Math.round(TOTAL_KM));
const T_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v4h-7v11h-4V10H3z"/></svg>';
$('#cp-rows').innerHTML = CPS.map((c, n) => `<tr>
  <td><div class="name"><span class="blaze">${T_SVG}</span><div>${c.name}<small>${c.note}</small></div></div></td>
  <td class="num">${c.km.toFixed(1)}</td><td class="num">${fmt(c.e)} m</td>
  <td class="num ${n ? 'cut' : ''}">${c.cut}</td><td class="served">${c.served}</td>
  <td><button class="sign sign-ghost" type="button" data-cp="${n}">Show<span class="sr-only"> ${c.name} on the model</span></button></td></tr>`).join('');

const seg = (a, b) => ({ km: (cum[CPS[b].i] - cum[CPS[a].i]) / 1000, up: climbTo[CPS[b].i] - climbTo[CPS[a].i], down: (climbTo[CPS[b].i] - climbTo[CPS[a].i]) - (smooth[CPS[b].i % S] - smooth[CPS[a].i])});
// Each stretch drawn from the same profile, at one shared vertical scale so the climbs compare honestly.
function miniProfile([a, b]) {
  const i0 = CPS[a].i, i1 = CPS[b].i, lo = 380, hi = 2100, span = cum[i1] - cum[i0];
  const pts = []; for (let k = i0; k <= i1; k += 2) pts.push(`${((cum[k] - cum[i0]) / span * 300).toFixed(1)} ${(64 - (route[k % S].e - lo) / (hi - lo) * 60).toFixed(1)}`);
  return `<svg class="mini" viewBox="0 0 300 64" preserveAspectRatio="none" aria-hidden="true"><path class="mini-area" d="M${pts.join('L')}L300 64L0 64Z"/><path class="mini-line" d="M${pts.join('L')}"/></svg>`;
}
const s1 = seg(0, 1), s2 = seg(1, 2), s3 = seg(2, 3), s4 = seg(3, 6);
$('#terrain-notes').innerHTML = [
  ['0–' + CPS[1].km.toFixed(0), 'Birch, boardwalk, heath', `${s1.km.toFixed(1)} km and ${fmt(s1.up)} m of climbing through birch forest and over boardwalk, then onto open heath. The easiest running of the day, and the place to hold back.`],
  [CPS[1].km.toFixed(0) + '–' + CPS[2].km.toFixed(0), 'Boulders to the cairn', `${fmt(s2.up)} m up in ${s2.km.toFixed(1)} km. The path gives out to a boulder field marked by cairns and painted red T's; expect hands on rock below the summit at ${fmt(HIGH)} m.`],
  [CPS[2].km.toFixed(0) + '–' + CPS[3].km.toFixed(0), 'Scree into the valley', `${fmt(s3.down)} m of descent in ${s3.km.toFixed(1)} km on loose scree, then a wet valley floor at ${fmt(CPS[3].e)} m. Most retirements happen at Djupdalen; the medic tent is there for a reason.`],
  [CPS[3].km.toFixed(0) + '–' + Math.round(TOTAL_KM), 'Ridge, col, run-in', `${fmt(s4.up)} m more on the ridge path over Raudberget and through Breiskaret, then the long run-in back to the hut. The red T's stop at the col; orange flags take you home.`]
].map(([km, h, p], n) => `<div>${miniProfile([[0, 1], [1, 2], [2, 3], [3, 6]][n])}<h3><span>km ${km}</span>${h}</h3><p>${p}</p></div>`).join('');

// ---------- profile ----------
const minE = Math.min(...route.map((r) => r.e)), maxE = HIGH;
const px = (k) => (cum[k] / cum[S]) * 1000;
const py = (e) => 132 - ((e - minE) / (maxE - minE)) * 118;
const line = route.map((r, k) => `${k ? 'L' : 'M'}${px(k).toFixed(1)} ${py(r.e).toFixed(1)}`).join('');
const profile = $('#profile');
profile.innerHTML = `<path class="area" d="${line}L1000 140L0 140Z"/>${CPS.slice(1, -1).map((c) => `<line class="cpline" x1="${px(c.i)}" x2="${px(c.i)}" y1="${py(c.e)}" y2="140"/>`).join('')}<path class="line" d="${line}"/><path class="done" d=""/><line class="now" x1="0" x2="0" y1="0" y2="140"/>`;
$('#ticks').innerHTML = CPS.map((c) => `<span style="left:${(px(c.i) / 10).toFixed(2)}%">${c.name}</span>`).join('');
const doneEl = profile.querySelector('.done'), nowEl = profile.querySelector('.now');
const scrub = $('#scrub');
scrub.max = String(Math.round(TOTAL_KM * 10));

function indexAtKm(km) {
  const m = km * 1000; let a = 0, b = S;
  while (a < b) { const mid = (a + b) >> 1; if (cum[mid] < m) a = mid + 1; else b = mid; }
  return a;
}
function showReadout(k) {
  const km = cum[k] / 1000, e = route[k % S].e;
  const next = CPS.find((c) => c.i > k) ?? CPS[CPS.length - 1];
  const toGo = (cum[next.i] - cum[k]) / 1000;
  $('#readout').innerHTML = `<div class="big">km ${km.toFixed(1)}<small>${fmt(e)} m</small></div>
    <div class="next">${toGo > 0.05 ? `Next: <b>${next.name}</b> in ${toGo.toFixed(1)} km · leave by ${next.cut}` : `At <b>${next.name}</b> · ${next.served}`}</div>`;
  doneEl.setAttribute('d', route.slice(0, k + 1).map((r, n) => `${n ? 'L' : 'M'}${px(n).toFixed(1)} ${py(r.e).toFixed(1)}`).join(''));
  nowEl.setAttribute('x1', px(k)); nowEl.setAttribute('x2', px(k));
  scrub.setAttribute('aria-valuetext', `Kilometre ${km.toFixed(1)}, ${fmt(e)} metres, ${toGo > 0.05 ? `${toGo.toFixed(1)} kilometres to ${next.name}` : `at ${next.name}`}`);
}

// ---------- poster: the same terrain, shaded flat, shown before and instead of WebGL ----------
const COLORS = () => dark.matches
  ? { bg: [20, 24, 27], low: [64, 82, 70], mid: [94, 98, 88], high: [130, 128, 122], snow: [190, 192, 192], water: [36, 64, 86], contour: [196, 140, 85], route: [226, 58, 71] }
  : { bg: [238, 236, 230], low: [176, 192, 160], mid: [214, 212, 184], high: [222, 216, 204], snow: [248, 247, 243], water: [146, 184, 208], contour: [143, 94, 47], route: [196, 31, 46] };
function tint(c, e) {
  const t = (e - 420) / 1640, lerp = (a, b, f) => a.map((v, n) => v + (b[n] - v) * f);
  if (t < 0.35) return lerp(c.low, c.mid, t / 0.35);
  if (t < 0.7) return lerp(c.mid, c.high, (t - 0.35) / 0.35);
  return lerp(c.high, c.snow, Math.min(1, (t - 0.7) / 0.3));
}
function drawPoster() {
  const cv = $('#poster'), c = COLORS(), W = N - 1;
  cv.width = W; cv.height = W;
  const g = cv.getContext('2d'), img = g.createImageData(W, W);
  for (let j = 0; j < W; j++) for (let i = 0; i < W; i++) {
    const e = ELEV[j * N + i], dx = ELEV[j * N + i + 1] - e, dy = ELEV[(j + 1) * N + i] - e;
    const shade = Math.max(0.35, Math.min(1.25, 0.85 - (dx - dy) * 0.012));
    let rgb = e < WATER ? c.water : tint(c, e).map((v) => v * shade);
    if (e >= WATER && Math.floor(e / 100) !== Math.floor(ELEV[j * N + i + 1] / 100)) rgb = rgb.map((v, n) => v * 0.55 + c.contour[n] * 0.45);
    const o = (j * W + i) * 4; img.data[o] = rgb[0]; img.data[o + 1] = rgb[1]; img.data[o + 2] = rgb[2]; img.data[o + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  g.strokeStyle = `rgb(${c.route})`; g.lineWidth = 2.2; g.beginPath();
  route.forEach((r, k) => (k ? g.lineTo : g.moveTo).call(g, r.x * W, r.y * W)); g.stroke();
}
drawPoster();

// ---------- the model ----------
const stage = $('#stage'), canvas = $('#gl'), labelsEl = $('#labels');
const UNIT = MAP_KM * 10;              // metres per world unit
const EXAG = 1.6;
const wx = (x) => (x - 0.5) * 100, wz = (y) => (y - 0.5) * 100, wy = (e) => (e / UNIT) * EXAG;

let renderer;
try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' }); } catch { renderer = null; }

if (renderer) {
  renderer.setPixelRatio(Math.min(devicePixelRatio, coarse.matches ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 1, 1200);

  const geo = new THREE.PlaneGeometry(100, 100, N - 1, N - 1);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position, elevAttr = new Float32Array(N * N);
  for (let k = 0; k < N * N; k++) { pos.setY(k, wy(Math.max(ELEV[k], WATER))); elevAttr[k] = ELEV[k]; }
  geo.setAttribute('elev', new THREE.BufferAttribute(elevAttr, 1));
  geo.computeVertexNormals();

  const v3 = (a) => new THREE.Color(`rgb(${a.join(',')})`);
  const uniforms = {
    uBg: { value: new THREE.Color() }, uLow: { value: new THREE.Color() }, uMid: { value: new THREE.Color() }, uHigh: { value: new THREE.Color() },
    uSnow: { value: new THREE.Color() }, uWater: { value: new THREE.Color() }, uContour: { value: new THREE.Color() },
    uSun: { value: new THREE.Vector3(-0.55, 0.62, -0.55).normalize() }, uWaterLevel: { value: WATER }, uDark: { value: 0 }
  };
  const theme = () => {
    const c = COLORS();
    for (const k of ['bg', 'low', 'mid', 'high', 'snow', 'water', 'contour']) uniforms['u' + k[0].toUpperCase() + k.slice(1)].value.copy(v3(c[k]));
    uniforms.uDark.value = dark.matches ? 1 : 0;
    scene.background = uniforms.uBg.value;
    routeMat.color.copy(v3(c.route)); pinMat.color.copy(v3(c.route));
    drawPoster(); dirty = true;
  };
  const terrainMat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `
      attribute float elev; varying float vElev; varying vec3 vN; varying vec2 vUv; varying float vDepth;
      void main() { vElev = elev; vN = normal; vUv = uv; vec4 mv = modelViewMatrix * vec4(position, 1.0); vDepth = -mv.z; gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `
      uniform vec3 uBg, uLow, uMid, uHigh, uSnow, uWater, uContour, uSun; uniform float uWaterLevel, uDark;
      varying float vElev; varying vec3 vN; varying vec2 vUv; varying float vDepth;
      float iso(float h, float step) { float f = h / step; return 1.0 - min(abs(fract(f - 0.5) - 0.5) / fwidth(f), 1.0); }
      void main() {
        float t = (vElev - 420.0) / 1640.0;
        vec3 c = t < 0.35 ? mix(uLow, uMid, t / 0.35) : t < 0.7 ? mix(uMid, uHigh, (t - 0.35) / 0.35) : mix(uHigh, uSnow, clamp((t - 0.7) / 0.3, 0.0, 1.0));
        float shade = clamp(dot(normalize(vN), uSun), 0.0, 1.0);
        c *= mix(0.62, 1.12, shade) + uDark * 0.08;
        float minor = iso(vElev, 50.0), major = iso(vElev, 250.0);
        c = mix(c, uContour, max(minor * mix(0.32, 0.2, uDark), major * mix(0.7, 0.5, uDark)));
        if (vElev < uWaterLevel) c = uWater * mix(0.92, 1.04, shade);
        float edge = smoothstep(0.36, 0.5, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
        float fog = smoothstep(140.0, 330.0, vDepth);
        gl_FragColor = vec4(mix(c, uBg, max(edge, fog * 0.85)), 1.0);
      }`
  });
  scene.add(new THREE.Mesh(geo, terrainMat));

  const path3 = new THREE.CatmullRomCurve3(route.map((r) => new THREE.Vector3(wx(r.x), wy(r.e) + 0.35, wz(r.y))), true);
  const tube = new THREE.TubeGeometry(path3, S, 0.32, 6, true);
  const routeMat = new THREE.MeshBasicMaterial();
  scene.add(new THREE.Mesh(tube, routeMat));
  const TUBE_COUNT = tube.index.count;

  const pinMat = new THREE.MeshBasicMaterial();
  const pin = new THREE.Group();
  const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 6, 8), pinMat); stick.position.y = 3;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.9, 20, 14), pinMat); head.position.y = 6.6;
  pin.add(stick, head); scene.add(pin);
  const pointOf = (k) => { const r = route[k % S]; return new THREE.Vector3(wx(r.x), wy(r.e), wz(r.y)); };

  // Checkpoint labels: DOM, so they stay sharp and readable.
  const cpLabels = CPS.slice(0, -1).map((c) => {
    const el = document.createElement('div'); el.className = 'lbl';
    el.innerHTML = `<span>${c.name} · ${c.km.toFixed(0)}</span><i></i>`; labelsEl.appendChild(el);
    return { el, p: pointOf(c.i).add(new THREE.Vector3(0, 0.6, 0)) };
  });

  const controls = new OrbitControls(camera, canvas);
  Object.assign(controls, { enableDamping: true, dampingFactor: 0.08, enablePan: false, enableZoom: false, rotateSpeed: 0.55, minPolarAngle: 0.45, maxPolarAngle: 1.2 });
  if (coarse.matches) {
    controls.touches = { ONE: -1, TWO: THREE.TOUCH.DOLLY_ROTATE };
    $('.how').textContent = 'Two fingers turn the massif. Scrub the profile to follow the course.';
  }
  canvas.style.touchAction = 'pan-y';
  controls.target.set(0, 5, -3);
  camera.position.set(58, 78, 108);

  let dirty = true, w = 0, h = 0, framed = false;
  function resize() {
    w = stage.clientWidth; h = stage.clientHeight;
    if (!framed && w < 640) camera.position.sub(controls.target).multiplyScalar(1.45).add(controls.target);
    framed = true;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Shift the massif right on wide screens so the bib and the model share the frame.
    if (w > 900) camera.setViewOffset(w, h, -w * 0.12, h * 0.04, w, h); else camera.setViewOffset(w, h, 0, h * 0.06, w, h);
    camera.fov = w < 640 ? 42 : 30;
    camera.updateProjectionMatrix(); dirty = true;
  }
  new ResizeObserver(resize).observe(stage);

  const tmp = new THREE.Vector3();
  function placeLabels() {
    for (const l of cpLabels) {
      tmp.copy(l.p).project(camera);
      const hidden = tmp.z > 1 || Math.abs(tmp.x) > 1.05 || Math.abs(tmp.y) > 1.05;
      l.el.classList.toggle('hidden', hidden);
      if (!hidden) l.el.style.translate = `${((tmp.x + 1) / 2 * w).toFixed(1)}px ${((1 - tmp.y) / 2 * h).toFixed(1)}px`;
    }
  }

  // Signature: the route draws itself round the massif once, from the hut.
  let intro = reduce.matches ? null : { t0: performance.now(), dur: 3600 };
  tube.setDrawRange(0, intro ? 0 : TUBE_COUNT);
  let fly = null;
  function flyTo(k) {
    const target = pointOf(k);
    pin.position.copy(target);
    const from = controls.target.clone(), camFrom = camera.position.clone(), delta = target.clone().sub(from);
    delta.multiplyScalar(0.55);
    if (reduce.matches) { controls.target.add(delta); camera.position.add(delta); dirty = true; return; }
    fly = { t0: performance.now(), dur: 650, from, camFrom, delta };
  }
  const ease = (t) => 1 - Math.pow(1 - t, 3);

  let visible = true, raf = 0;
  function loop(now) {
    raf = requestAnimationFrame(loop);
    if (!visible || document.hidden) return;
    let changed = controls.update();
    if (intro) {
      const t = Math.min(1, (now - intro.t0) / intro.dur);
      tube.setDrawRange(0, Math.floor(ease(t) * TUBE_COUNT / 6) * 6);
      const k = Math.floor(ease(t) * S); pin.position.copy(pointOf(k));
      if (t >= 1) intro = null;
      changed = true;
    }
    if (fly) {
      const t = Math.min(1, (now - fly.t0) / fly.dur), f = ease(t);
      controls.target.copy(fly.from).addScaledVector(fly.delta, f);
      camera.position.copy(fly.camFrom).addScaledVector(fly.delta, f);
      if (t >= 1) fly = null;
      changed = true;
    }
    if (changed || dirty) { renderer.render(scene, camera); placeLabels(); dirty = false; }
  }
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(stage);
  dark.addEventListener('change', theme);
  reduce.addEventListener('change', () => { if (reduce.matches) { intro = null; tube.setDrawRange(0, TUBE_COUNT); dirty = true; } });

  scrub.addEventListener('input', () => {
    if (intro) { intro = null; tube.setDrawRange(0, TUBE_COUNT); }
    const k = indexAtKm(Number(scrub.value) / 10); showReadout(k); flyTo(k);
  });
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-cp]'); if (!b) return;
    const c = CPS[Number(b.dataset.cp)];
    scrub.value = String(Math.round(c.km * 10)); showReadout(c.i);
    if (intro) { intro = null; tube.setDrawRange(0, TUBE_COUNT); }
    $('#course').scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth' });
    flyTo(c.i);
  });

  theme(); resize(); pin.position.copy(pointOf(0));
  renderer.compile(scene, camera);
  requestAnimationFrame((t) => { canvas.classList.add('ready'); $('#poster').hidden = true; loop(t); });
} else {
  scrub.addEventListener('input', () => showReadout(indexAtKm(Number(scrub.value) / 10)));
  $('.how').textContent = 'Scrub the profile to follow the course.';
}
showReadout(0);

// ---------- kit ----------
const KIT = [
  ['Waterproof jacket', 'Taped seams and a hood'], ['Waterproof trousers', 'Taped seams'],
  ['Warm layer', 'Long sleeves, 200 g wool or equivalent'], ['Hat and gloves', 'It snows on Skarvet in August'],
  ['Headtorch', 'With spare batteries'], ['Foil blanket', 'At least 1.4 × 2 m'],
  ['1 litre of water', 'Bottles or bladder'], ['500 kcal of food', 'Kept for emergencies'],
  ['Whistle', 'Most packs have one on the strap'], ['Course map and compass', 'The map is in your race pack']
];
const KEY = 'skarvet58-kit';
let packed = new Set();
try { packed = new Set(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch { /* storage unavailable */ }
const kitEl = $('#kit');
kitEl.innerHTML = KIT.map(([item, note], n) => `<li><label><input type="checkbox" data-n="${n}" ${packed.has(n) ? 'checked' : ''}><span>${item}<small>${note}</small></span></label></li>`).join('');
function count() {
  const left = KIT.length - packed.size;
  $('#kit-count').textContent = left ? `${packed.size} of ${KIT.length} packed · ${left} to go` : `All ${KIT.length} packed. See you at Skarvbu.`;
}
kitEl.addEventListener('change', (e) => {
  const n = Number(e.target.dataset.n);
  e.target.checked ? packed.add(n) : packed.delete(n);
  try { localStorage.setItem(KEY, JSON.stringify([...packed])); } catch { /* storage unavailable */ }
  count();
});
count();

// ---------- calendar ----------
$('#ics').addEventListener('click', () => {
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Skarvet 58//Ballot//EN', 'BEGIN:VEVENT', `UID:skarvet58-ballot-2027@example.invalid`,
    'DTSTAMP:20261021T120000Z', 'DTSTART;VALUE=DATE:20270201', 'DTEND;VALUE=DATE:20270301', 'SUMMARY:Skarvet 58 ballot open (1–28 Feb)',
    'DESCRIPTION:400 places. Qualifier: one finished race of 40 km and 2000 m+ since January 2025.', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' })); a.download = 'skarvet58-ballot.ics';
  a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
});
