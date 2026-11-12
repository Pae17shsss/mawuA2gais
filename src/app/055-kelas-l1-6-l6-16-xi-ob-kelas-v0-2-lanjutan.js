/* =====================================================================
   BABAK (6 babak per lesson) + mode kilat + kuis bebas
   ===================================================================== */
function buildRound(n, k) {
  const L = KL(n); const core = klWords(n, 'core'); const all = klWords(n); const out = [];
  if (k === 1) {
    const fresh = core.filter(i => !S.cards[i]); const part = (fresh.length ? fresh : shuffle(core)).slice(0, 20);
    for (let j = 0; j < part.length; j += 5) {
      const ch = part.slice(j, j + 5);
      ch.forEach(i => out.push({ type: 'intro', wid: i }));
      shuffle(ch).forEach(i => out.push(wItem(i, 'mc_mean')));
    }
  } else if (k === 2) {
    const pool = core.concat(shuffle(all.filter(i => !core.includes(i))).slice(0, 8));
    shuffle(pool).slice(0, 22).forEach((i, j) => out.push(wItem(i, ['listen', 'mc_hanzi', 'tone', 'listen', 'mc_mean'][j % 5])));
    if (typeof pictoItem === 'function') for (let j = 0; j < 3; j++) { const x = pictoItem([n]); if (x) out.splice(Math.floor(Math.random() * out.length), 0, x); }
  } else if (k === 3) {
    shuffle(all).slice(0, 30).forEach((i, j) => out.push({ type: 'recall', wid: i, dir: j % 3 === 2 ? 'mean' : 'hz' }));
  } else if (k === 4) {
    L.grammar.forEach((g, gi) => {
      out.push({ lx: 1, type: 'lread', kind: 'gram', n, gi });
    });
    shuffle(L.mcq).slice(0, 10).forEach(m => out.push(mcqItem(n, m)));
    shuffle(L.reorder).slice(0, 6).forEach(r => out.push(reorderItem(n, r)));
    if (n === 3) for (let j = 0; j < 3; j++) out.push(timeItem());
    if (n === 6) { for (let j = 0; j < 3; j++) out.push(posItem()); for (let j = 0; j < 2; j++) out.push(mwItem()); }
    if (n === 2) for (let j = 0; j < 2; j++) out.push(mwItem());
    if (n === 5) { out.push(priceItem()); out.push(dateItem()); }
  } else if (k === 5) {
    out.push({ lx: 1, type: 'lread', kind: 'dlg', n });
    const d = L.dialog; shuffle(d.map((_, i) => i).slice(0, d.length - 1)).slice(0, 4).forEach(i => { const x = dlgNextItem(n, i); if (x) out.push(x); });
    shuffle(L.pairs).slice(0, 6).forEach(p => out.push(pairItem(n, p, L.pairs)));
    L.tf.forEach(tf => { if (tf.passage && tf.passage.zh) out.push({ lx: 1, type: 'lread', kind: 'pas', n, pas: tf.passage }); tf.items.forEach(x => out.push(tfItem(n, tf.passage && tf.passage.zh ? tf.passage : null, x))); });
  } else if (k === 6) {
    shuffle(all).slice(0, 7).forEach((i, j) => out.push(wItem(i, ['mc_mean', 'mc_hanzi', 'listen', 'mc_mean', 'tone', 'mc_hanzi', 'listen'][j])));
    shuffle(L.mcq).slice(0, 5).forEach(m => out.push(mcqItem(n, m)));
    shuffle(L.reorder).slice(0, 3).forEach(r => out.push(reorderItem(n, r)));
    shuffle(L.pairs).slice(0, 3).forEach(p => out.push(pairItem(n, p, L.pairs)));
    const tfs = L.tf.flatMap(tf => tf.items.map(x => tfItem(n, tf.passage && tf.passage.zh ? tf.passage : null, x)));
    shuffle(tfs).slice(0, 2).forEach(x => { x.pasOpen = true; out.push(x); });
    return out.filter(Boolean).map(x => Object.assign(x, { noRetry: 1 }));
  }
  return out.filter(Boolean);
}
/* mode kilat: satu sesi berisi inti semua babak */
function buildFast(n) {
  const L = KL(n); const core = klWords(n, 'core'); const out = [];
  shuffle(core).forEach((i, j) => out.push(wItem(i, ['mc_mean', 'listen', 'mc_hanzi'][j % 3])));
  out.push({ lx: 1, type: 'lread', kind: 'gram', n, gi: 0 });
  shuffle(L.mcq).slice(0, 5).forEach(m => out.push(mcqItem(n, m)));
  shuffle(L.reorder).slice(0, 3).forEach(r => out.push(reorderItem(n, r)));
  shuffle(L.pairs).slice(0, 3).forEach(p => out.push(pairItem(n, p, L.pairs)));
  return out.filter(Boolean);
}
function startKls(items, opts) {
  const ns = opts.ns || [opts.n]; KLS_POOL = klWords(ns);
  startSession(items, Object.assign({ kls: 1 }, opts));
  if (!SES) KLS_ON = false;
}
function runRound(n, k) {
  klState().last = n; save();
  const R = KROUNDS[k - 1];
  const b = () => buildRound(n, k);
  startKls(b(), { n, round: k, title: `${lnShort(n)} · ${t(R.ti)}`, rebuild: b, cat: R.cat, retry: k !== 6 });
}
function runFast(n) { const b = () => buildFast(n); startKls(b(), { n, round: 'fast', title: `${lnShort(n)} · ${t('Kilat')}`, rebuild: b }); }
/* hasil babak disimpan saat ringkasan muncul */
const showSummaryK = showSummary;
showSummary = function () {
  const o = SES && SES.opts; const tot = SES ? SES.ok + SES.bad : 0; const acc = tot ? Math.round(SES.ok / tot * 100) : 0;
  showSummaryK();
  if (!o || !o.kls || !o.n) return;
  const st = klState(); let msg = '';
  if (o.round && o.round !== 'fast') {
    const key = o.n + '-' + o.round; const prev = st.r[key] || 0; st.r[key] = Math.max(prev, acc);
    const pass = acc >= KPASS[o.round];
    if (o.round === 6 && pass && !st.done[o.n]) { st.done[o.n] = todayKey(); msg = `<div class="kl-khatam">${ICON('crown')}<div><b>${t('Lesson {n} khatam!', { n: o.n })}</b><span>${t('Semua kata & pola lesson ini sudah kamu kuasai. Mahkota disimpan di peta kelas.')}</span></div></div>`; setTimeout(() => confetti(), 300); }
    else msg = `<div class="notice">${pass ? t('Babak lulus ({a}%) ✓', { a: acc }) : t('Skor {a}% — butuh {p}% untuk lulus babak ini. Coba sekali lagi, pasti naik!', { a: acc, p: KPASS[o.round] })}</div>`;
  } else if (o.round === 'fast') { st.r[o.n + '-fast'] = Math.max(st.r[o.n + '-fast'] || 0, acc); msg = `<div class="notice">${t('Mode kilat selesai ({a}%). Untuk khatam, kerjakan Ujian khatam (babak 6).', { a: acc })}</div>`; }
  save();
  const sum = $('#sbody .summary'); if (sum && msg) { const k = sum.querySelector('.kpis'); (k || sum).insertAdjacentHTML('afterend', msg); }
  const nr = nextRound(o.n);
  const row = sum && sum.querySelector('.row.wrap:last-child');
  if (row && nr && o.round !== 6) row.insertAdjacentHTML('beforeend', `<button class="btn pri" data-s="klnext" data-n="${o.n}" data-k="${nr.k}">${t('Babak {k}', { k: nr.k })}: ${t(nr.ti)} ${ICON('chevron')}</button>`);
};
document.addEventListener('click', e => {
  const b = e.target.closest('[data-s="klnext"]'); if (!b || !SES) return;
  const n = +b.dataset.n, k = +b.dataset.k; endSession(false, true); render(); setTimeout(() => runRound(n, k), 60);
});
const endSessionK = endSession;
endSession = function (quit, silent) { const was = SES && SES.opts && SES.opts.kls; endSessionK(quit, silent); if (was) KLS_ON = false; };
