/* ========== SRS ========== */
const card = i => S.cards[i];
function introduce(i) {
  if (S.cards[i]) return S.cards[i];
  S.cards[i] = { iv: 0, ef: 2.4, due: Date.now() + 6e5, r: 0, lp: 0, st: 0, ls: Date.now(), add: todayKey() };
  return S.cards[i];
}
/* grade(): lihat fsrs.js */
const mastery = c => (!c ? 0 : c.iv >= 21 ? 4 : c.iv >= 7 ? 3 : c.iv >= 1 ? 2 : 1);
const MASTERY_NAME = ['Belum', 'Baru dikenal', 'Dikenal', 'Kuat', 'Dikuasai'];
const isLeech = c => !!c && c.lp >= 3 && (c.iv || 0) < 21;
function dueIds(until = Date.now()) { return Object.keys(S.cards).map(Number).filter(i => S.cards[i].due <= until).sort((a, b) => S.cards[a].due - S.cards[b].due); }
function counts() {
  let intro = 0, strong = 0, master = 0; const lv = [0, 0, 0, 0, 0, 0, 0, 0], lvM = [0, 0, 0, 0, 0, 0, 0, 0];
  let a2 = 0, a2m = 0;
  for (const k in S.cards) { const w = W[k]; const c = S.cards[k]; intro++; if (w.l < 4) a2++; if (c.iv >= 7) strong++; if (c.iv >= 21) { master++; lvM[w.l]++; if (w.l < 4) a2m++; } lv[w.l]++; }
  return { intro, strong, master, lv, lvM, a2, a2m };
}
const nextNew = n => A2_ORDER.filter(i => !S.cards[i]).slice(0, n);
