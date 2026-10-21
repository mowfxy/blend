// Wren Street Seed Library: the month chooser filters the drawer; borrowing stamps the card.
const $ = (s) => document.querySelector(s);
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const cards = [...document.querySelectorAll('.card')];
const live = $('#live');

// ---------- what goes in the ground this month ----------
const tabs = $('#tabs');
tabs.innerHTML = MONTHS.map((m, n) => `<button class="tab" role="tab" type="button" id="tab-${n}" aria-selected="false" tabindex="-1" aria-controls="cards">${m.slice(0, 3)}<span class="long">${m.slice(3)}</span></button>`).join('');
const tabEls = [...tabs.children];
let month = new Date().getMonth();

function names(list) {
  const en = list.map((c) => c.querySelector('.en').firstChild.textContent.replace(/\s·\s$/, '').toLowerCase());
  return en.length < 2 ? en.join('') : `${en.slice(0, -1).join(', ')} and ${en.at(-1)}`;
}
function choose(m, focus = false) {
  month = m;
  tabEls.forEach((t, n) => { t.setAttribute('aria-selected', String(n === m)); t.tabIndex = n === m ? 0 : -1; });
  if (focus) tabEls[m].focus();
  $('#month-name').textContent = MONTHS[m];
  const apply = () => {
    const shown = [];
    cards.forEach((c) => {
      const on = c.dataset.sow.split(',').map(Number).includes(m);
      c.hidden = !on;
      c.querySelectorAll('.months-v span').forEach((s, n) => s.classList.toggle('now', n === m));
      if (on) { c.style.setProperty('--i', shown.length); shown.push(c); }
    });
    const res = $('#sow-result');
    if (!shown.length) {
      res.innerHTML = `Nothing in the drawer goes in the ground in ${MONTHS[m]}. Come to the seed swap instead, first Saturday of the month, 10–12. <button class="btn undo" type="button" id="show-all">Show the whole drawer</button>`;
    } else {
      res.innerHTML = `${shown.length} of ${cards.length} go in now: ${names(shown)}. <button class="btn undo" type="button" id="show-all">Show the whole drawer</button>`;
    }
  };
  if (document.startViewTransition && !reduce.matches) document.startViewTransition(apply); else apply();
}
tabs.addEventListener('click', (e) => { const t = e.target.closest('.tab'); if (t) choose(tabEls.indexOf(t)); });
tabs.addEventListener('keydown', (e) => {
  const d = { ArrowRight: 1, ArrowLeft: -1, Home: -month, End: 11 - month }[e.key];
  if (d === undefined) return;
  e.preventDefault(); choose((month + d + 12) % 12, true);
});
$('#sow-result').addEventListener('click', (e) => {
  if (!e.target.closest('#show-all')) return;
  cards.forEach((c, n) => { c.hidden = false; c.style.setProperty('--i', n); });
  tabEls.forEach((t) => t.setAttribute('aria-selected', 'false'));
  $('#month-name').textContent = 'any month';
  $('#sow-result').textContent = `All ${cards.length} varieties in the drawer.`;
});

// ---------- borrowing: the date stamp ----------
const KEY = 'wren-street-borrowed';
let borrowed = new Set();
try { borrowed = new Set(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch { /* storage unavailable */ }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify([...borrowed])); } catch { /* storage unavailable */ } };
const due = new Date(); due.setFullYear(due.getFullYear() + 1);
const dueText = `${MONTHS[due.getMonth()].slice(0, 3)} ${due.getFullYear()}`;

function render(card, landing = false) {
  const no = card.dataset.no, have = Number(card.dataset.have), on = borrowed.has(no);
  const loan = card.querySelector('.loan'), stamp = card.querySelector('.stamp');
  card.classList.toggle('borrowed', on);
  stamp.innerHTML = `Due back<br>${dueText}<br>Wren St.`;
  stamp.classList.toggle('landing', landing);
  card.querySelector('.have').textContent = String(have - (on ? 1 : 0));
  const btn = loan.querySelector('.borrow');
  if (have === 0) return;
  btn.textContent = on ? 'On your card' : 'Borrow this packet';
  btn.disabled = on;
  let undo = loan.querySelector('.undo');
  if (on && !undo) {
    undo = document.createElement('button'); undo.type = 'button'; undo.className = 'btn undo'; undo.textContent = 'Undo';
    loan.appendChild(undo);
  } else if (!on && undo) undo.remove();
}
document.addEventListener('click', (e) => {
  const card = e.target.closest('.card'); if (!card) return;
  const name = card.querySelector('.fr').textContent;
  if (e.target.closest('.borrow') && !borrowed.has(card.dataset.no)) {
    if (borrowed.size >= 3) {
      const b = card.querySelector('.borrow'); b.textContent = 'Three a season · undo one first';
      live.textContent = 'Three packets a season is the limit. Undo one to swap.';
      setTimeout(() => render(card), 2400); return;
    }
    borrowed.add(card.dataset.no); save(); render(card, true);
    card.querySelector('.undo')?.focus();
    live.textContent = `${name} is on your card. Due back ${dueText}.`;
  } else if (e.target.closest('.undo') && card.contains(e.target)) {
    borrowed.delete(card.dataset.no); save(); render(card);
    card.querySelector('.borrow').focus();
    live.textContent = `${name} returned to the drawer.`;
  }
});

cards.forEach((c) => render(c));
choose(month);
