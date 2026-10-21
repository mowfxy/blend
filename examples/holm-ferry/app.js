// Holm Ferry — the one live thing: the next sailing, computed from the published (sample) timetable
// and the visitor's clock. It is a timetable time, not live tracking, and the page reads fully without it.
'use strict';

const places = { holm: { pier: 'Holm Pier', to: 'Skerra', other: 'skerra' }, skerra: { pier: 'Skerra Slip', to: 'Holm', other: 'holm' } };
const times = (dir) => [...document.querySelectorAll(`#rows-${dir} tr`)].map((tr) => tr.dataset.t);
const toMin = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
const $ = (id) => document.getElementById(id);

let from = 'holm';
try { from = localStorage.getItem('holm-ferry-from') || from; } catch { /* storage unavailable */ }

function render() {
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const list = times(from);
  const upcoming = list.filter((t) => toMin(t) >= nowMin);
  const place = places[from];

  document.querySelectorAll('.direction button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.from === from)));
  $('from-name').textContent = place.pier;

  if (upcoming.length) {
    const next = upcoming[0];
    const wait = toMin(next) - nowMin;
    const arrive = toMin(next) + 25;
    const hhmm = (m) => `${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
    $('next-time').textContent = next;
    $('next-detail').innerHTML = wait === 0
      ? `<b>Boarding now.</b> Arrives ${place.to} at ${hhmm(arrive)}.`
      : `<b>In ${wait < 60 ? `${wait} minute${wait === 1 ? '' : 's'}` : `${Math.floor(wait / 60)} h ${wait % 60} min`}.</b> Arrives ${place.to} at ${hhmm(arrive)}.`;
    $('then').textContent = upcoming.length > 1 ? `Then ${upcoming.slice(1, 4).join(', ')}` : `This is the last boat from ${place.pier} today.`;
    $('chart-note').textContent = `${next} to ${place.to} · 25 min`;
  } else {
    $('next-time').textContent = list[0];
    $('next-detail').innerHTML = `<b>No more boats today.</b> The first boat tomorrow leaves at ${list[0]}.`;
    $('then').textContent = '';
    $('chart-note').textContent = `${list[0]} tomorrow to ${place.to}`;
  }

  for (const dir of ['holm', 'skerra']) {
    const next = times(dir).find((t) => toMin(t) >= nowMin);
    document.querySelectorAll(`#rows-${dir} tr`).forEach((tr) => {
      tr.classList.toggle('is-next', tr.dataset.t === next);
      tr.classList.toggle('is-gone', toMin(tr.dataset.t) < nowMin);
    });
  }
}

document.querySelector('.direction').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-from]');
  if (!b) return;
  from = b.dataset.from;
  try { localStorage.setItem('holm-ferry-from', from); } catch { /* storage unavailable */ }
  render();
});

render();
setInterval(render, 20000);
