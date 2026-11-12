/* sambungkan kata lesson ke daftar kata utama (dipanggil dari core.js sebelum unit dibangun) */
function klsInject(W) {
  const idx = {};
  W.forEach((w, i) => [w.w.replace(/[()]/g, ''), w.w.replace(/\(.*?\)/g, ''), w.s].concat(w.v || []).forEach(f => { if (f && idx[f] === undefined) idx[f] = i; }));
  KLS.forEach(L => L.vocab.forEach(v => {
    let i = idx[v.hz]; if (i === undefined && v.alt) i = idx[v.alt];
    if (i === undefined) {
      i = W.length;
      W.push({ i, l: 4, w: v.hz, s: v.hz, p: v.y.join(''), y: v.y, t: v.t, o: v.pos === 'Phr' ? '' : v.pos, c: '其他', m: [v.id, v.en, v.tl], kls: L.n });
      idx[v.hz] = i;
    }
    v.wid = i; const w = W[i];
    if (!w.km) w.km = { id: v.id, en: v.en, tl: v.tl, vi: v.vi };
    if (!w.kl) w.kl = L.n;
  }));
}
/* Kelas V0.6: 時代華語 Modern Chinese 1 (L1–15) — data dari sd.js (dimuat sebelum app.js) */
if (Array.isArray(window.XB_SD)) window.XB_SD.forEach(L => { if (L && L.n && !KLS.some(x => x.n === L.n)) KLS.push(L); });
'use strict';