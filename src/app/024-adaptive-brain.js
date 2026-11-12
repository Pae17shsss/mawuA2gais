/* ========== ADAPTIVE BRAIN ========== */
const TYPE_NAME = { combine: 'Gabung huruf', tonepair: 'Beda nada', part: 'Tebak dari bagian', recall: 'Kartu ingat', lq: 'Simak cerita', lfill: 'Dengar & isi', lmean: 'Dengar & pahami', write: 'Tulis tangan', mc_mean: 'Arti kata', mc_hanzi: 'Pilih hanzi', listen: 'Mendengar', tone: 'Nada', type: 'Ketik pinyin', hz: 'Arti hanzi', cloze: 'Lengkapi kalimat', build: 'Susun kalimat' };
function recAnswer(type, ok, ms) {
  const a = S.adapt; const t = a.type[type] || (a.type[type] = { acc: .8, n: 0 });
  t.n++; t.acc = t.acc * .9 + (ok ? 1 : 0) * .1;
  t.c2 = (t.c2 || 0) + 1; t.k2 = (t.k2 || 0) + (ok ? 1 : 0);   // hitungan nyata untuk ditampilkan
  const h = new Date().getHours(); a.hours[h]++; if (ok) a.hoursOk[h]++;
  if (ok && ms < 30000) a.rt = a.rt * .92 + ms * .08;
}
function typeAcc(k) { const x = S.adapt.type[k]; if (!x) return null; return x.c2 ? x.k2 / x.c2 : x.acc; }
/* susun ulang misi hari ini tanpa memberi hadiah ulang untuk misi yang sudah beres */
function replanDay() {
  const d = dayRec(); const oldQd = d.qd || {};
  if (d.qaw === undefined) d.qaw = Object.keys(oldQd).length;
  delete d.plan; delete d.q; planToday();
  d.qd = {}; d.qdi = {}; d.q.forEach((q, k) => { if (questDone(q, d)) { d.qd[k] = 1; d.qdi[q.id + ':' + q.t] = 1; } });
  save();
}
function weakestType() {
  let best = null; for (const k in S.adapt.type) { const t = S.adapt.type[k]; if (t.n >= 8 && (!best || t.acc < best.acc)) best = { k, acc: t.acc }; }
  return best;
}
function goldenHour() {
  const a = S.adapt; let best = -1, bs = 0;
  a.hours.forEach((n, h) => { if (n >= 15) { const s = (a.hoursOk[h] / n) * Math.log(n); if (s > bs) { bs = s; best = h; } } });
  return best;
}
function toneConfusion() {
  const tc = S.adapt.tc; let best = null;
  for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) if (a !== b && tc[a][b] >= 3 && (!best || tc[a][b] > best.n)) best = { a: a + 1, b: b + 1, n: tc[a][b] };
  return best;
}
function insights() {
  const out = []; const wt = weakestType(); const tc = toneConfusion(); const gh = goldenHour();
  const leeches = Object.keys(S.cards).filter(i => isLeech(S.cards[i]));
  if (tc) out.push({ e: '🎵', t: t('Nada {a} sering kamu kira nada {b}.', { a: tc.a, b: tc.b }), a: 'drill-tone', b: t('Latih nada') });
  if (wt && wt.acc < .78) out.push({ e: '🎯', t: t('Bagian terlemahmu: {k} ({p}%). Sesi berikutnya akan lebih sering melatihnya.', { k: t(TYPE_NAME[wt.k] || wt.k), p: Math.round((typeAcc(wt.k) ?? wt.acc) * 100) }), a: 'drill-' + wt.k, b: t('Latih sekarang') });
  if (leeches.length) out.push({ e: '🧠', t: t('{n} kata bandel sering lupa. Buat cerita sendiri untuk hanzinya — cerita pribadi paling nempel.', { n: leeches.length }), a: 'leech', b: t('Lihat') });
  if (gh >= 0) out.push({ e: '⏰', t: t('Jam emasmu sekitar pukul {h}.00 — akurasimu paling tinggi di jam itu.', { h: String(gh).padStart(2, '0') }) });
  const ret = retention7(); if (ret !== null) out.push({ e: ret > .85 ? '🌟' : '🌧️', t: t('Akurasi 7 hari terakhir {p}%.', { p: Math.round(ret * 100) }) + ' ' + (ret > .85 ? t('Tempo kata baru bisa naik.') : t('Tempo kata baru diperlambat supaya ingatan mantap.')) });
  if (!out.length) out.push({ e: '🌱', t: t('Makin sering kamu pakai, makin pintar app ini membaca kebiasaanmu: jam belajar, nada yang tertukar, dan jenis soal terlemah.') });
  return out;
}
