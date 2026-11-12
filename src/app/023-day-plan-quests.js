/* ========== DAY / PLAN / QUESTS ========== */
function dayRec(k = todayKey()) {
  return S.days[k] || (S.days[k] = { xp: 0, new: 0, rev: 0, ok: 0, bad: 0, tone: 0, listen: 0, type: 0, hz: 0, match: 0, story: 0, sent: 0, write: 0, recall: 0, combo: 0, ms: 0, sess: 0 });
}
function targetDate() { return keyAdd(S.start, S.targetDays); }
function retention7() {
  let ok = 0, n = 0; for (let d = 0; d < 7; d++) { const r = S.days[keyAdd(todayKey(), -d)]; if (r) { ok += r.ok || 0; n += (r.ok || 0) + (r.bad || 0); } }
  return n >= 20 ? ok / n : null;
}
function planToday() {
  const day = dayRec();
  if (day.plan) return day.plan;
  const remaining = A2_ORDER.filter(i => !S.cards[i]).length;
  const daysLeft = Math.max(1, keyDiff(todayKey(), targetDate()));
  let n = Math.ceil(remaining / daysLeft);
  const backlog = dueIds(endOfToday()).filter(i => S.cards[i].iv >= 1).length;
  const ret = retention7();
  let why = 'sesuai target';
  if (backlog > 150) { n *= .5; why = 'ulangan menumpuk — fokus mengulang dulu'; }
  else if (backlog > 80) { n *= .75; why = 'ulangan agak banyak'; }
  if (ret !== null && ret < .72) { n *= .8; why = 'akurasi turun — tempo diperlambat sedikit'; }
  else if (ret !== null && ret > .9 && backlog < 60) { n *= 1.12; why = 'akurasi tinggi — tempo dinaikkan'; }
  n = remaining === 0 ? 0 : clamp(Math.round(n), Math.min(6, remaining), 40);
  day.plan = { new: n, rev: backlog, why };
  const weakest = weakestType();
  const bonusPool = [
    { id: 'combo', t: 12 }, { id: 'match', t: 1 }, { id: 'sent', t: 8 }, { id: 'write', t: 5 }, { id: 'story', t: 1 }, { id: 'listen', t: 12 }, { id: 'type', t: 8 }
  ];
  let bonus;
  if (weakest && weakest.acc < .75 && ['listen', 'type'].includes(weakest.k)) bonus = bonusPool.find(b => b.id === weakest.k);
  else bonus = bonusPool[(keyDiff('2026-01-01', todayKey()) % bonusPool.length + bonusPool.length) % bonusPool.length];
  day.q = [
    { id: 'new', t: n },
    backlog > 0 ? { id: 'rev', t: Math.min(backlog, 200) } : { id: 'prac', t: 15 },
    { id: 'tone', t: 10 },
    { id: 'hz', t: 5 },
    { id: bonus.id, t: bonus.t }
  ];
  if (n === 0) day.q[0] = { id: 'prac2', t: 25 };
  save();
  return day.plan;
}
const QMETA = {
  new: ['🌱', n => t('Pelajari {n} kata baru', { n }), 'new'],
  rev: ['🔁', n => t('Bereskan {n} ulangan hari ini', { n }), 'rev'],
  prac: ['🎯', n => t('Jawab {n} soal latihan', { n }), 'answers'],
  prac2: ['🎯', n => t('Jawab {n} soal latihan', { n }), 'answers'],
  tone: ['🎵', n => t('{n} jawaban nada benar', { n }), 'tone'],
  hz: ['🀄', n => t('Kenali {n} hanzi lewat ceritanya', { n }), 'hz'],
  combo: ['⚡', n => t('Capai combo {n} berturut-turut', { n }), 'combo'],
  match: ['🧩', () => t('Selesaikan 1 game pasangkan kata'), 'match'],
  story: ['✍️', () => t('Tulis cerita sendiri untuk 1 hanzi'), 'story'],
  listen: ['🎧', n => t('{n} soal dengar benar', { n }), 'listen'],
  type: ['⌨️', n => t('Ketik {n} pinyin dengan benar', { n }), 'type'],
  write: ['✍️', n => t('Tulis {n} hanzi dengan tangan', { n }), 'write'],
  sent: ['🧱', n => t('Selesaikan {n} soal kalimat', { n }), 'sent']
};
function questProg(q, day = dayRec()) {
  if (!q || !QMETA[q.id]) return 0;
  if (day.qdi && day.qdi[q.id + ':' + q.t]) return q.t;   // sekali selesai, tetap selesai hari itu
  const f = QMETA[q.id][2];
  let v = f === 'answers' ? day.ok + day.bad : day[f] || 0;
  if (q.id === 'rev' && dueIds(endOfToday()).filter(i => S.cards[i].iv >= 1).length === 0 && day.rev > 0) v = q.t;   // tidak ada lagi ulangan sampai malam
  return Math.min(v, q.t);
}
const questDone = (q, day) => !!q && (q.t === 0 || questProg(q, day) >= q.t);
function questsDoneCount(day = dayRec()) { planToday(); return (day.q || []).filter(q => questDone(q, day)).length; }
let lastDoneSnapshot = null;
function checkQuests() { try { _checkQuests(); } catch (e) { console.warn('quests', e); } }
function _checkQuests() {
  const day = dayRec(); planToday();
  const done = day.q.map(q => questDone(q, day));
  day.qd = day.qd || {};
  if (!day.qdi) { day.qdi = {}; Object.keys(day.qd).forEach(k => { const q = day.q[k]; if (q) day.qdi[q.id + ':' + q.t] = 1; }); }
  if (day.qaw === undefined) day.qaw = Object.keys(day.qd).length;
  const fresh = [];
  done.forEach((d, k) => {
    if (d) (day.qdi = day.qdi || {})[day.q[k].id + ':' + day.q[k].t] = 1;
    if (!d || day.qd[k]) return;
    day.qd[k] = 1;
    if (day.qaw >= 5) return;                       // sudah dapat hadiah 5 misi hari ini
    day.qaw++; addXP(40, true); fresh.push(k);
  });
  if (fresh.length) {                              // satu notifikasi untuk semua misi yang selesai bersamaan
    FX.play('quest');
    const names = fresh.map(k => QMETA[day.q[k].id][1](day.q[k].t));
    toast(`${typeof mascot === 'function' ? mascot('joy', 30) : ''}${t('Misi selesai')}: ${names.join(' · ')} · +${40 * fresh.length} XP`, 2800, 'quest');
  }
  const n = done.filter(Boolean).length;
  if (n >= 3 && S.streak.last !== todayKey()) bumpStreak();
  if (n === 5 && !day.bloom) { day.bloom = 1; addXP(100, true); setTimeout(() => { confetti(); FX.play('level'); toast(t('🌸 Bunga plum hari ini mekar penuh! +100 XP'), 3000, 'bloom'); }, 700); }
  if (typeof routeSync === 'function') routeSync(!!SES);
  checkBadges(); save();
}
const RANKS = [
  [0, '種子', 'Benih', '🌰'], [150, '嫩芽', 'Tunas', '🌱'], [400, '幼苗', 'Kecambah', '🌿'], [800, '小花', 'Bunga kecil', '🌼'],
  [1400, '花園', 'Taman', '🌷'], [2200, '竹子', 'Bambu', '🎋'], [3200, '小樹', 'Pohon muda', '🌲'], [4500, '果樹', 'Pohon buah', '🍑'],
  [6000, '山丘', 'Bukit', '⛰️'], [8000, '高山', 'Gunung', '🏔️'], [10500, '河流', 'Sungai', '🏞️'], [13500, '大海', 'Laut', '🌊'],
  [17000, '星星', 'Bintang', '⭐'], [21500, '月亮', 'Bulan', '🌙'], [27000, '太陽', 'Matahari', '☀️'], [34000, '銀河', 'Galaksi', '🌌']
];
function rankOf(xp = S.xp) {
  let k = 0; for (let j = 0; j < RANKS.length; j++) if (xp >= RANKS[j][0]) k = j;
  const cur = RANKS[k]; const nxt = RANKS[k + 1] || null;
  const base = cur[0]; const need = nxt ? nxt[0] - base : 1;
  return { n: k + 1, zh: cur[1], name: cur[2], e: cur[3], xp, into: xp - base, need, pct: nxt ? clamp((xp - base) / need, 0, 1) : 1, next: nxt, toNext: nxt ? nxt[0] - xp : 0, max: !nxt };
}
function addXP(n, silent) {
  const before = rankOf().n;
  S.xp += n; dayRec().xp += n;
  const r = rankOf();
  if (r.n > before) {
    S.rankSeen = r.n;
    setTimeout(() => { if (typeof showLevelUp === 'function') showLevelUp(r); else { confetti(); FX.play('level'); toast(`${t('Naik level {n}', { n: r.n })} · <b>${r.zh} ${t(r.name)}</b>`, 3600); } if (typeof render === 'function' && !SES) render(); }, 500);
  }
}
function bumpStreak() {
  const tk = todayKey(); const st = S.streak;
  if (st.last === tk) return;
  const gap = st.last ? keyDiff(st.last, tk) : 99;
  if (gap === 1) st.cur++;
  else if (st.last && gap > 1 && gap - 1 <= st.freeze) { st.freeze -= gap - 1; st.cur++; toast(t('🧊 Pelindung api dipakai — streak aman!')); }
  else st.cur = 1;
  st.last = tk; st.best = Math.max(st.best, st.cur);
  if (st.cur % 7 === 0 && st.freeze < 2) { st.freeze++; toast(t('🧊 Dapat 1 pelindung api (maks 2)')); }
  FX.play('level'); toast(t('🔥 Streak {n} hari! Api tetap menyala.', { n: st.cur }));
}
function streakNow() {
  const st = S.streak; const t = todayKey();
  if (!st.last) return 0;
  const gap = keyDiff(st.last, t);
  if (gap <= 1) return st.cur;
  if (gap - 1 <= st.freeze) return st.cur;
  return 0;
}
