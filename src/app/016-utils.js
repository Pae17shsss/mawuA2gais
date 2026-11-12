/* ========== UTILS ========== */
function todayKey(d = new Date()) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
function keyAdd(k, n) { const [y, m, d] = k.split('-').map(Number); return todayKey(new Date(y, m - 1, d + n)); }
function keyDiff(a, b) { const p = k => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d).getTime(); }; return Math.round((p(b) - p(a)) / DAY); }
const $ = (s, el = document) => el.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const endOfToday = () => { const d = new Date(); d.setHours(23, 59, 59, 999); return d.getTime(); };
/* notifikasi: antre (maks 2 tampil), pesan yang sama tidak dobel, pesan sejenis (key) saling mengganti */
const TOASTQ = []; let TOAST_LAST = {};
function toast(msg, ms = 2400, key) {
  const now = Date.now(); const id = key || msg;
  if (TOAST_LAST[id] && now - TOAST_LAST[id] < 1500) return;       // cegah dobel dari klik/render beruntun
  TOAST_LAST[id] = now;
  let box = document.getElementById('toasts');
  if (!box) { box = document.createElement('div'); box.id = 'toasts'; box.setAttribute('aria-live', 'polite'); document.body.appendChild(box); }
  const same = key && box.querySelector(`.toast[data-k="${key}"]`);
  if (same) { same.innerHTML = msg; clearTimeout(same._t); same._t = setTimeout(() => toastOut(same), ms); return; }
  const live = [...box.children].filter(x => !x.classList.contains('out'));
  if (live.length >= 2) { TOASTQ.push([msg, ms, key]); if (TOASTQ.length > 4) TOASTQ.shift(); return; }
  const el = document.createElement('div'); el.className = 'toast'; if (key) el.dataset.k = key; el.innerHTML = msg;
  el.addEventListener('click', () => toastOut(el)); box.appendChild(el);
  el._t = setTimeout(() => toastOut(el), ms);
}
function toastOut(el) {
  if (!el || el.classList.contains('out')) return; clearTimeout(el._t); el.classList.add('out');
  setTimeout(() => { el.remove(); const nx = TOASTQ.shift(); if (nx) { TOAST_LAST[nx[2] || nx[0]] = 0; toast(nx[0], nx[1], nx[2]); } }, 280);
}
function confetti() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || document.querySelector('.confetti')) return;
  const c = document.createElement('canvas'); c.className = 'confetti'; document.body.appendChild(c);
  const x = c.getContext('2d'); if (!x) { c.remove(); return; } const dpr = Math.min(2, devicePixelRatio || 1); c.width = innerWidth * dpr; c.height = innerHeight * dpr; x.scale(dpr, dpr);
  const cols = ['#b7a6ff', '#ffb8a3', '#8fe0c0', '#9cc6ff', '#ffe08a', '#ff9fb4'];
  const P = Array.from({ length: document.documentElement.classList.contains('lite') ? 45 : 80 }, () => ({ x: innerWidth / 2 + (Math.random() - .5) * 120, y: innerHeight * .35, vx: (Math.random() - .5) * 11, vy: -Math.random() * 11 - 4, r: Math.random() * 6 + 4, c: pick(cols), a: Math.random() * 6, s: Math.random() < .5 }));
  let f = 0; (function tick() { x.clearRect(0, 0, innerWidth, innerHeight); P.forEach(p => { p.vy += .32; p.x += p.vx; p.y += p.vy; p.a += .12; x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.fillStyle = p.c; if (p.s) { x.beginPath(); x.arc(0, 0, p.r / 1.6, 0, 7); x.fill(); } else x.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); x.restore(); }); if (++f < 110) requestAnimationFrame(tick); else c.remove(); })();
}
