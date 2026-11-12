/* =====================================================================
   KUIS BEBAS & ARCADE KELAS
   ===================================================================== */
const QTYPES = [
  ['mean', 'Arti kata', 'book'], ['hz', 'Pilih hanzi', 'hanzi'], ['listen', 'Dengar', 'headphone'], ['tone', 'Nada', 'tone'], ['type', 'Ketik pinyin', 'keyboard'],
  ['gram', 'Isi kalimat', 'puzzle'], ['build', 'Susun kalimat', 'blocks'], ['dlg', 'Dialog & jawaban', 'chat'], ['tf', 'Benar/salah', 'check'],
  ['time', 'Jam', 'clock'], ['date', 'Tanggal', 'calendar'], ['mw', 'Kata ukur', 'layers'], ['pos', 'Posisi', 'target'], ['price', 'Harga', 'grid']
];
function buildQuiz(cfg) {
  const ns = cfg.ns.length ? cfg.ns : [1]; const types = cfg.types.length ? cfg.types : ['mean']; const N = cfg.n || 20;
  const ws = shuffle(klWords(ns, cfg.scope)); const out = []; let wi = 0; let g = 0;
  const mcqs = shuffle(ns.flatMap(n => KL(n).mcq.map(m => [n, m]))); const ros = shuffle(ns.flatMap(n => KL(n).reorder.map(r => [n, r])));
  const prs = shuffle(ns.flatMap(n => KL(n).pairs.map(p => [n, p, KL(n).pairs]))); const tfs = shuffle(ns.flatMap(n => KL(n).tf.flatMap(tf => tf.items.map(x => [n, tf.passage && tf.passage.zh ? tf.passage : null, x]))));
  const dl = shuffle(ns.flatMap(n => KL(n).dialog.slice(0, -1).map((_, i) => [n, i])));
  while (out.length < N && g++ < N * 6) {
    const tp = types[g % types.length]; let it = null;
    if (['mean', 'hz', 'listen', 'tone', 'type'].includes(tp)) { if (!ws.length) continue; it = wItem(ws[wi++ % ws.length], { mean: 'mc_mean', hz: 'mc_hanzi', listen: 'listen', tone: 'tone', type: 'type' }[tp]); }
    else if (tp === 'gram' && mcqs.length) { const [n, m] = mcqs.shift(); it = mcqItem(n, m); }
    else if (tp === 'build' && ros.length) { const [n, r] = ros.shift(); it = reorderItem(n, r); }
    else if (tp === 'dlg') { if (Math.random() < .5 && prs.length) { const [n, p, all] = prs.shift(); it = pairItem(n, p, all); } else if (dl.length) { const [n, i] = dl.shift(); it = dlgNextItem(n, i); } }
    else if (tp === 'tf' && tfs.length) { const [n, pas, x] = tfs.shift(); it = tfItem(n, pas, x); }
    else if (DRILLS[tp]) it = DRILLS[tp]();
    if (it) out.push(it);
  }
  return shuffle(out);
}
function runQuiz(cfg) { klState().qCfg = cfg; save(); const b = () => buildQuiz(cfg); startKls(b(), { ns: cfg.ns, title: t('Kuis kelas'), rebuild: b }); }
let ARC_KLS = null;
const arcPoolK = arcPool;
arcPool = function () {
  if (!ARC_KLS) return arcPoolK();
  const seen = new Set(); return ARC_KLS.filter(i => { const w = W[i]; if (!w || !w.m) return false; const m = meanP(w); if (seen.has(m) || seen.has(w.w)) return false; seen.add(m); seen.add(w.w); return true; });
};
const arcCloseK = arcClose;
arcClose = function () { arcCloseK(); if (ARC_KLS) { ARC_KLS = null; KLS_ON = false; render(); } };
function runArcade(ns) { klState().aNs = ns; save(); ARC_KLS = klWords(ns); KLS_ON = true; KLS_POOL = ARC_KLS; openArcade(); }
