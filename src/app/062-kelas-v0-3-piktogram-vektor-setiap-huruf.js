/* ========== Kelas V0.3: piktogram vektor — setiap huruf punya gambar dari bagian-bagiannya ========== */
const PG_ALT = { '亻': '人', '人': '亻', '扌': '手', '手': '扌', '忄': '心', '心': '忄', '氵': '水', '水': '氵', '糹': '糸', '糸': '糹', '飠': '食', '食': '飠', '衤': '衣', '衣': '衤', '礻': '示', '示': '礻', '犭': '犬', '犬': '犭', '刂': '刀', '刀': '刂', '灬': '火', '火': '灬', '訁': '言', '言': '訁', '王': '玉', '玉': '王', '罒': '网', '网': '罒', '耂': '老', '戶': '户', '户': '戶', '⺈': '勹', '冖': '宀', '丷': '八', '龰': '止', '夊': '夂', '攴': '攵' };
const pgOf = p => PICTO[p] || (PG_ALT[p] && PICTO[PG_ALT[p]]) || null;
const pgSVG = (p, size = 64, cls = '') => { const d = pgOf(p); return d ? `<svg class="pg ${cls}" viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">${d[1]}</svg>` : ''; };
/* gambar yang "berubah" jadi hanzi (berulang) */
function pgMorph(p, glyph, size = 96) {
  if (!pgOf(p)) return '';
  return `<span class="pgm" style="--s:${size}px">${pgSVG(p, size, 'pgm-p')}<span class="hz pgm-g" style="font-size:${Math.round(size * .78)}px">${esc(glyph || p)}</span></span>`;
}
/* susunan gambar untuk satu huruf: gambar huruf itu sendiri, atau gambar tiap bagiannya */
function pgParts(c) {
  if (pgOf(c)) return { whole: true, parts: [{ p: c, role: 'one' }] };
  const R = charRoles(c); if (!R.parts.length) return { whole: false, parts: [] };
  return { whole: false, parts: R.parts.map(o => ({ p: o.p, role: o.role, mean: o.mean, py: o.py })) };
}
const pgCoverage = c => { const P = pgParts(c); return P.whole ? 2 : P.parts.some(x => pgOf(x.p)) ? 1 : 0; };
function pgPartTile(o, size) {
  const pic = pgOf(o.p);
  const lbl = o.role === 'sound' ? `🔊 ${esc(o.py || '')}` : esc(shortMean(o.mean || (pic ? pic[0] : '')) || '');
  return `<span class="pgt r-${o.role}">${pic ? pgSVG(o.p, size) : `<span class="pgt-x hz" style="width:${size}px;height:${size}px;font-size:${Math.round(size * .62)}px">${esc(o.p)}</span>`}<b class="hz">${esc(o.p)}</b><small>${lbl}</small></span>`;
}
/* blok besar di modal huruf */
function pgBlock(c) {
  const P = pgParts(c); if (!P.parts.length || !P.parts.some(x => pgOf(x.p))) return '';
  const mn = charMean(c) || (pgOf(c) ? pgOf(c)[0] : '');
  if (P.whole) {
    return `<div class="pgb"><div class="pgb-h"><span class="gpill">${ICON('sparkle')} ${t('Gambar pengingat')}</span><span class="small muted">${t('Lihat gambarnya berubah jadi huruf — bentuknya sama!')}</span></div>
      <div class="pgb-row">${pgMorph(c, c, 120)}<div class="pgb-t"><b class="hz">${esc(c)}</b> <span class="t${charTone(c)}">${esc(charPy(c))}</span><p><b>${esc(mn)}</b></p><p class="small muted">${esc(compOrigin(c) || '')}</p></div></div></div>`;
  }
  const key = P.parts.find(x => x.role === 'key' && pgOf(x.p)) || P.parts.find(x => pgOf(x.p));
  return `<div class="pgb"><div class="pgb-h"><span class="gpill">${ICON('sparkle')} ${t('Gambar pengingat')}</span><span class="small muted">${t('Huruf ini = gambar-gambar kecil yang disusun. Bagian 🔊 memberi bunyi, bukan arti.')}</span></div>
    <div class="pgb-row">${pgMorph(key.p, key.p, 96)}<div class="pgb-eq">${P.parts.map(o => pgPartTile(o, 54)).join('<span class="pg-op">+</span>')}<span class="pg-op">=</span><span class="pgt r-sum"><span class="pgt-x hz" style="width:54px;height:54px;font-size:40px">${esc(c)}</span><b class="hz t${charTone(c)}">${esc(charPy(c))}</b><small>${esc(shortMean(mn))}</small></span></div></div></div>`;
}
/* strip ringkas untuk satu kata (flashcard, daftar kosakata) */
function wordPicto(wid) {
  const w = W[wid]; if (!w) return '';
  const cs = [...new Set([...(w.s || w.w)].filter(x => /[㐀-鿿]/.test(x)))].slice(0, 5).filter(c => pgCoverage(c));
  if (!cs.length) return '';
  return `<div class="pgw">${cs.map(c => { const P = pgParts(c); const pics = P.whole ? pgSVG(c, 44) : P.parts.filter(x => pgOf(x.p)).slice(0, 3).map(x => pgSVG(x.p, 36)).join('<i>+</i>');
    return `<button class="pgw-c" data-a="char" data-v="${c}"><span class="pgw-p">${pics}</span><span class="hz">${esc(c)}</span></button>`; }).join('')}</div>`;
}
/* modal huruf: gambar pengingat di paling atas penalaran bentuk */
const openCharP = openChar;
openChar = function (c) {
  openCharP(c);
  const r = $('.overlay .rsn'); const h = pgBlock(c);
  if (r && h) r.insertAdjacentHTML('beforebegin', h);
};
/* kartu kata baru & modal kata: gambar kecil di tiap baris huruf */
const reasonRowP = reasonRow;
reasonRow = function (w, inSession) {
  return reasonRowP(w, inSession).replace(/(<button class="rz" [^>]*data-v="([^"]+)">)<svg class="laysvg mini"/g, (m, open, c) => {
    const P = pgParts(c); const k = P.whole ? c : (P.parts.find(x => x.role === 'key' && pgOf(x.p)) || P.parts.find(x => pgOf(x.p)) || {}).p;
    return k ? `${open}<span class="rz-pg">${pgMorph(k, k, 62)}</span><svg class="laysvg mini rz-lay2"` : m;
  });
};

/* ---------- kuis: tebak huruf dari gambar ---------- */
function pictoItem(ns) {
  const chars = [...new Set(klWords(ns || KLS.map(L => L.n)).flatMap(i => [...(W[i].s || W[i].w)]).filter(c => /[㐀-鿿]/.test(c)))];
  const good = chars.filter(c => pgCoverage(c) === 2 || (pgCoverage(c) === 1 && pgParts(c).parts.filter(x => pgOf(x.p)).length >= 1 && pgParts(c).parts.length >= 2));
  if (good.length < 4) return null;
  const c = pick(good); const P = pgParts(c);
  const pics = P.whole ? pgSVG(c, 110) : P.parts.map(o => pgOf(o.p) ? pgSVG(o.p, 78) : `<span class="pgt-x hz" style="width:78px;height:78px;font-size:52px">${esc(o.p)}</span>`).join('<span class="pg-op">+</span>');
  const others = shuffle(good.filter(x => x !== c)).slice(0, 12);
  const { opts, a } = optsWith(c, others);
  const hint = P.whole ? '' : P.parts.map(o => o.role === 'sound' ? `🔊 ${esc(o.py || o.p)}` : esc(shortMean(o.mean || '') || o.p)).join(' + ');
  return mk({ kind: 'drill', label: 'Huruf apa ini? · 這是什麼字？', ic: 'sparkle', vis: `<div class="kl-vis pgq">${pics}</div>${hint ? `<div class="small muted" style="text-align:center">${hint}</div>` : ''}`, q: '', opts: opts.map(x => ({ t: x, hz: 1 })), a, say: c, fb: `<span class="hz kl-fbz">${esc(c)} ${esc(charPy(c))} · ${esc(charMean(c) || '')}</span>${pgBlockMini(c)}` });
}
function pgBlockMini(c) { const P = pgParts(c); return `<div class="pgw" style="margin-top:4px">${P.parts.map(o => pgOf(o.p) ? pgSVG(o.p, 34) : `<b class="hz">${esc(o.p)}</b>`).join('<i>+</i>')}<i>=</i><b class="hz" style="font-size:24px">${esc(c)}</b></div>`; }
DRILLS.picto = () => pictoItem(VK.q && VK.q.ns);
QTYPES.unshift(['picto', 'Tebak dari gambar', 'sparkle']);

/* ---------- galeri gambar ---------- */
function vKPicto() {
  const st = klState(); const ns = st.last ? [st.last] : [KLS[0].n];
  const lessonChars = new Set(klWords(KLS.map(L => L.n)).flatMap(i => [...(W[i].s || W[i].w)]));
  const list = Object.keys(PICTO).sort((a, b) => (lessonChars.has(b) ? 1 : 0) - (lessonChars.has(a) ? 1 : 0));
  const cov = [...lessonChars].filter(c => /[㐀-鿿]/.test(c)); const covN = cov.filter(c => pgCoverage(c)).length;
  return `<section class="card glass"><button class="btn ghost small" data-a="klback">‹ ${t('Kelas')}</button><h1 style="margin:6px 0 4px">${ICON('sparkle')} ${t('Galeri gambar hanzi')}</h1>
      <p class="small muted" style="margin:0 0 10px">${t('{n} gambar vektor untuk bagian-bagian huruf. Arahkan/ketuk gambar untuk melihatnya berubah jadi huruf. {a} dari {b} huruf di kelasmu sudah punya gambar pengingat.', { n: list.length, a: covN, b: cov.length })}</p>
      <div class="row wrap" style="gap:8px"><button class="btn pri" data-a="klpicq">${ICON('play')} ${t('Kuis tebak dari gambar (12)')}</button></div></section>
    <section class="card glass"><div class="pg-grid">${list.map(g => `<button class="pg-cell" ${CH[g] ? `data-a="char" data-v="${g}"` : ''}>${pgMorph(g, g, 72)}<b class="hz">${esc(g)}</b><small>${esc(CH[g] ? shortMean(charMean(g)) : COMP[g] ? (meanLang() === 'id' ? COMP[g][1] : COMP[g][2]) : PICTO[g][0])}</small></button>`).join('')}</div></section>`;
}
XVIEWS.kelas = function () { return VK.view === 'pic' ? vKPicto() : vKelas(); };
Object.assign(ACT, {
  klpic: () => { VK.view = 'pic'; render(); window.scrollTo(0, 0); },
  klpicq: () => { const mk2 = () => Array.from({ length: 12 }, () => pictoItem(KLS.map(L => L.n))).filter(Boolean); startKls(mk2(), { ns: KLS.map(L => L.n), title: t('Tebak dari gambar'), rebuild: mk2, cat: 'kenal' }); }
});
START_ACTS.add('klpicq');