/* ========== FSRS (Free Spaced Repetition Scheduler) ==========
   Model ingatan DSR: Difficulty (1–10), Stability (hari sampai peluang ingat turun ke 90%),
   Retrievability (peluang ingat saat ini). Bobot default FSRS-5.
   Rating: 1 Lupa · 2 Sulit · 3 Bisa · 4 Mudah                                  */
const FSRS_W = [0.40255, 1.18385, 3.173, 15.69105, 7.1949, 0.5345, 1.4604, 0.0046, 1.54575, 0.1192, 1.01925, 1.9395, 0.11, 0.29605, 2.2698, 0.2315, 2.9898, 0.51655, 0.6621];
const F_DECAY = -0.5, F_FACTOR = 19 / 81;
const F_TARGET = 0.9;                       // peluang ingat yang dijaga
const F_MIN = 60e3;                         // 1 menit
const fsrsR = (t, s) => Math.pow(1 + F_FACTOR * Math.max(0, t) / Math.max(0.01, s), F_DECAY);
/* V1.7: target ingatan bisa dipilih pengguna (S.settings.retain, 0,80–0,95); bawaan tetap F_TARGET */
const fTarget = () => { const v = typeof S !== 'undefined' && S && S.settings ? +S.settings.retain : 0; return v >= 0.8 && v <= 0.95 ? v : F_TARGET; };
const fsrsIvl = s => clamp(s / F_FACTOR * (Math.pow(fTarget(), 1 / F_DECAY) - 1), 0.01, 3650);
const fsrsD0 = g => clamp(FSRS_W[4] - Math.exp(FSRS_W[5] * (g - 1)) + 1, 1, 10);
function fsrsNextD(d, g) {
  const dd = -FSRS_W[6] * (g - 3);
  const d1 = d + dd * (10 - d) / 9;                        // linear damping
  return clamp(FSRS_W[7] * fsrsD0(4) + (1 - FSRS_W[7]) * d1, 1, 10); // mean reversion
}
function fsrsRecallS(d, s, r, g) {
  const hard = g === 2 ? FSRS_W[15] : 1, easy = g === 4 ? FSRS_W[16] : 1;
  return s * (Math.exp(FSRS_W[8]) * (11 - d) * Math.pow(s, -FSRS_W[9]) * (Math.exp(FSRS_W[10] * (1 - r)) - 1) * hard * easy + 1);
}
function fsrsForgetS(d, s, r) {
  return Math.min(s, FSRS_W[11] * Math.pow(d, -FSRS_W[12]) * (Math.pow(s + 1, FSRS_W[13]) - 1) * Math.exp(FSRS_W[14] * (1 - r)));
}
const fsrsShortS = (s, g) => s * Math.exp(FSRS_W[17] * (g - 3 + FSRS_W[18]));

/* kartu lama (SM-2) → FSRS, dijalankan sekali saat dibaca */
function fsrsMigrate(c) {
  if (c.s !== undefined) return c;
  c.s = c.iv >= 1 ? Math.max(1, c.iv) : 0.4;
  c.d = clamp(9 - ((c.ef || 2.4) - 1.3) / 1.7 * 6, 1, 10);
  c.lr = c.ls || Date.now();
  c.ph = c.iv >= 1 ? 'rev' : 'learn';
  c.lrated = c.r > 0 ? 1 : 0;          // sudah pernah diulang → jangan dianggap kartu baru
  return c;
}
/* peluang ingat saat ini (0–1) */
function recallProb(i, now = Date.now()) {
  const c = S.cards[i]; if (!c) return 0;
  fsrsMigrate(c);
  const r = fsrsR((now - (c.lr || now)) / DAY, c.s);
  return isFinite(r) ? clamp(r, 0, 1) : 0;
}
/* simulasi: berapa lama jeda berikutnya untuk tiap rating (untuk label tombol) */
function fsrsPreview(i) {
  const out = {}; const c0 = S.cards[i];
  [1, 2, 3, 4].forEach(g => { const c = c0 ? Object.assign({}, c0) : null; out[g] = fsrsApply(c, g, Date.now(), true).due - Date.now(); });
  return out;
}
function fsrsApply(c, g, now, dry) {
  if (!c) c = { iv: 0, ef: 2.4, r: 0, lp: 0, st: 0, add: todayKey() };
  fsrsMigrate(c);
  const t = (now - (c.lr || now)) / DAY;
  if (!c.lrated) {
    // penilaian pertama kartu ini
    c.s = FSRS_W[g - 1]; c.d = fsrsD0(g);
    c.ph = 'learn'; c.step = 0;
  } else if (t < 0.5) {
    // ulangan di hari yang sama
    c.s = Math.max(0.05, fsrsShortS(c.s, g)); c.d = fsrsNextD(c.d, g);
  } else {
    const r = fsrsR(t, c.s);
    c.s = g === 1 ? Math.max(0.1, fsrsForgetS(c.d, c.s, r)) : fsrsRecallS(c.d, c.s, r, g);
    c.d = fsrsNextD(c.d, g);
  }
  let ivl;
  if (g === 1) {
    if (c.ph === 'rev') { c.lp = (c.lp || 0) + 1; }
    c.ph = c.ph === 'rev' ? 'relearn' : 'learn'; c.step = 0; c.st = 0;
    ivl = F_MIN / DAY;                                     // tampilkan lagi ± 1 menit
  } else if (c.ph === 'learn' || c.ph === 'relearn') {
    c.st = (c.st || 0) + 1;
    c.step = (c.step || 0) + (g === 4 ? 2 : 1);
    if (c.step >= 2 || g === 4 || c.ph === 'relearn') { c.ph = 'rev'; ivl = Math.max(1, Math.round(fsrsIvl(c.s))); }
    else ivl = (g === 2 ? 5 : 10) * 60e3 / DAY;           // langkah belajar 5–10 menit
  } else {
    c.st = (c.st || 0) + 1;
    ivl = fsrsIvl(c.s);
    if (ivl >= 2) ivl = Math.round(ivl * (0.95 + Math.random() * 0.1)); // sebar supaya tidak menumpuk
    ivl = Math.max(1, ivl);
  }
  if (!dry) { c.r = (c.r || 0) + 1; c.lr = now; c.ls = now; c.lrated = 1; }
  c.iv = ivl; c.due = now + ivl * DAY;
  return c;
}
/* dipakai semua jenis soal: rating otomatis dari benar/salah & kecepatan */
function grade(i, ok, fast, rating) {
  const c = S.cards[i] || introduce(i);
  const g = rating || (!ok ? 1 : fast === 'slow' ? 2 : 3);
  fsrsApply(c, g, Date.now());
  (S.memLog = S.memLog || []).push([todayKey(), g]); if (S.memLog.length > 400) S.memLog.splice(0, S.memLog.length - 400);
}
const fmtIvl = ms => {
  const m = ms / 60e3;
  if (m < 60) return Math.max(1, Math.round(m)) + ' ' + t('mnt');
  const h = m / 60; if (h < 24) return Math.round(h) + ' ' + t('jam');
  const d = h / 24; if (d < 31) return Math.round(d) + ' ' + t('hr');
  const mo = d / 30; if (mo < 12) return (Math.round(mo * 10) / 10) + ' ' + t('bln');
  return (Math.round(d / 365 * 10) / 10) + ' ' + t('thn');
};
/* statistik ingatan untuk halaman Ingatan */
function memStats(now = Date.now()) {
  const ids = Object.keys(S.cards).map(Number);
  let sumR = 0, n = 0; const risk = []; const weak = [];
  ids.forEach(i => { const r = recallProb(i, now); sumR += r; n++; if (S.cards[i].ph === 'rev' && r < 0.85) risk.push([i, r]); });
  risk.sort((a, b) => a[1] - b[1]);
  const fc = []; for (let d = 0; d < 7; d++) { const end = new Date(); end.setHours(23, 59, 59, 999); const lim = end.getTime() + d * DAY; const st = d ? lim - DAY : 0; fc.push(ids.filter(i => S.cards[i].due > st && S.cards[i].due <= lim).length); }
  const curve = [0, 1, 3, 7, 14, 30].map(d => { let s = 0; ids.forEach(i => { s += recallProb(i, now + d * DAY); }); return n ? s / n : 0; });
  return { avg: n ? sumR / n : 0, n, risk, forecast: fc, curve };
}