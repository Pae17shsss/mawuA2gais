/* ========== V1.5 b1core.js — fondasi A2 → B1: data grammar baru, ranah (Sehari-hari · Kampus · Pabrik), sumber kata, migrasi indeks ==========
   Dimuat sesudah semua modul lama (sebelum boot). Hanya membungkus/menambah fungsi global — tidak mengubah base.
   Data: GRAM2 (gram2data.js), CONV (convdata.js), kata baru di W (w.dom = 'semi' | 'ee' | 'daily'). */

/* ---------- 0. migrasi indeks kartu: kata baru disisipkan sebelum istilah ASE & kata Kelas ---------- */
const B1_LAY = { n0: +(D && D.n0) || 0, add: +(D && D.add) || 0 };
function b1Migrate() {
  if (!S || !S.cards || !B1_LAY.n0) return;
  const cur = B1_LAY.n0 + ':' + B1_LAY.add;
  const old = S.wlay;
  if (old === cur) return;
  if (!old && B1_LAY.add) {
    /* tata letak lama (V1.4): [kata data.js] [istilah ASE] [kata Kelas yang tidak ada di kamus] */
    const N0 = B1_LAY.n0, ADD = B1_LAY.add;
    const semiN = W.filter(w => w.semi).length;
    const map = {};
    for (let j = 0; j < semiN; j++) map[N0 + j] = N0 + ADD + j;
    try {
      if (typeof KLS !== 'undefined') {
        const idx = {}; const forms = w => [String(w.w).replace(/[()]/g, ''), String(w.w).replace(/\(.*?\)/g, ''), w.s].concat(w.v || []);
        for (let i = 0; i < N0; i++) forms(W[i]).forEach(f => { if (f && idx[f] === undefined) idx[f] = i; });
        for (let j = 0; j < semiN; j++) forms(W[N0 + ADD + j]).forEach(f => { if (f && idx[f] === undefined) idx[f] = N0 + j; });
        let nx = N0 + semiN;
        KLS.forEach(L => (L.vocab || []).forEach(v => {
          let i = idx[v.hz]; if (i === undefined && v.alt) i = idx[v.alt];
          if (i === undefined) { i = nx++; idx[v.hz] = i; if (v.wid !== undefined) map[i] = v.wid; }
        }));
      }
    } catch (e) { console.warn('b1 migrate kls', e); }
    const nc = {};
    /* kartu bercap hanzi (c.h, sejak V0.9) sudah dipindah benar oleh savefix (sfRemap) — jangan dipindah lagi; kartu tanpa pemetaan tetap disimpan */
    Object.keys(S.cards).forEach(k => { const i = +k; const c = S.cards[k]; let to = i;
      if (B1_RAW[k] && i >= N0 && map[i] !== undefined) to = map[i];
      if (W[to] && !nc[to]) { nc[to] = c; if ((to !== i || c.h === undefined) && typeof sfKey === 'function') c.h = sfKey(W[to]); } else if (!nc[i]) nc[i] = c; });
    S.cards = nc;
  }
  S.wlay = cur;
}
const b1LoadBase = load;
let B1_RAW = {};
load = function () { B1_RAW = {}; try { const o = JSON.parse(localStorage.getItem(KEY) || 'null'); if (o && o.cards && !o.wlay) Object.keys(o.cards).forEach(k => { if (o.cards[k] && !o.cards[k].h) B1_RAW[k] = 1; }); } catch (e) {} const r = b1LoadBase.apply(this, arguments); try { b1Migrate(); } catch (e) { console.warn('b1 migrate', e); } return r; };

/* ---------- 1. ranah ---------- */
/* tag kalimat/dialog: daily | campus | fab  ·  ranah kata: daily | ee | semi */
const B1_DOM = {
  daily: { w: 'daily', ic: 'chat', c: 'c1', name: 'Sehari-hari', long: 'Hidup sehari-hari di Taiwan' },
  campus: { w: 'ee', ic: 'class', c: 'c6', name: 'Kampus Elektro', long: 'Kampus Equipment Engineering' },
  fab: { w: 'semi', ic: 'chip', c: 'c4', name: 'Pabrik Semikonduktor', long: 'Fab & industri semikonduktor' }
};
const B1_TAG_OF_W = { daily: 'daily', ee: 'campus', semi: 'fab' };
const B1_TAGNAME = { daily: 'Sehari-hari', campus: 'Kampus', fab: 'Pabrik' };
const b1TagChip = tag => `<span class="b1-tag ${tag}">${ICON(B1_DOM[tag] ? B1_DOM[tag].ic : 'chat')}${t(B1_TAGNAME[tag] || tag)}</span>`;
/* kategori baru (dari ctxlabels) per ranah kata */
let B1_CATS = null;
function b1Cats() {
  if (B1_CATS) return B1_CATS;
  const m = { daily: {}, ee: {}, semi: {} };
  W.forEach(w => { if (w.dom && m[w.dom]) (m[w.dom][w.c] = m[w.dom][w.c] || []).push(w.i); });
  B1_CATS = {}; for (const d in m) B1_CATS[d] = Object.entries(m[d]).sort((a, b) => b[1].length - a[1].length).map(([c, ids]) => ({ c, ids }));
  return B1_CATS;
}
/* sumber kata: 'dom:semi' | 'dom:ee' | 'dom:daily' | 'c:<kategori>' | 'c:<dom>:<kategori>' | 'b1' | 'st:<id tahap>' */
function b1SrcIds(src) {
  src = String(src || '');
  let m;
  if ((m = /^dom:(\w+)$/.exec(src))) { const d = m[1]; return W.filter(w => w.dom === d || (d === 'semi' && w.semi)).map(w => w.i); }
  if ((m = /^c:(\w+):(.+)$/.exec(src))) return W.filter(w => w.dom === m[1] && w.c === m[2]).map(w => w.i);
  if ((m = /^c:(.+)$/.exec(src))) return W.filter(w => w.c === m[1]).map(w => w.i);
  if (src === 'b1') return W.filter(w => w.l === 4 && w.m && !w.kls).map(w => w.i);
  if ((m = /^st:(.+)$/.exec(src)) && typeof b1Stage === 'function') { const s = b1Stage(m[1]); return s ? s.words.slice() : []; }
  return [];
}
const b1IsSrc = src => /^(dom:|c:|st:)/.test(String(src || '')) || src === 'b1';
function b1SrcName(src) {
  src = String(src || ''); let m;
  if ((m = /^dom:(\w+)$/.exec(src))) { const tag = B1_TAG_OF_W[m[1]]; return t(B1_DOM[tag] ? B1_DOM[tag].name : m[1]); }
  if ((m = /^c:(?:\w+:)?(.+)$/.exec(src))) return ctxName(m[1]);
  if (src === 'b1') return t('Kosakata B1');
  if ((m = /^st:(.+)$/.exec(src)) && typeof b1Stage === 'function') { const s = b1Stage(m[1]); return s ? t('Tahap') + ' ' + s.code : src; }
  return src;
}
/* kalimat untuk sumber ranah: dialog + contoh grammar dengan tag yang sama + kalimat nyata kata-katanya */
function b1SrcSents(src) {
  const out = []; const seen = new Set();
  const add = (zh, py, tr) => { zh = String(zh || '').trim(); const h = [...zh].filter(isHan).join(''); if (h.length < 2 || h.length > 22 || seen.has(h) || /[＿_]/.test(zh)) return; seen.add(h); out.push({ zh, py: py || '', tr: tr || '', ch: null, h }); };
  let m = /^dom:(\w+)$/.exec(String(src)); let tag = m ? B1_TAG_OF_W[m[1]] : null;
  const st = /^st:(.+)$/.exec(String(src)); const stg = st && typeof b1Stage === 'function' ? b1Stage(st[1]) : null;
  const dlgs = stg ? [b1Conv(stg.conv)].filter(Boolean) : tag ? CONV.filter(d => d.dom === tag) : [];
  dlgs.forEach(d => d.lines.forEach(x => add(x.zh, x.py, b1Tr(x))));
  const gs = stg ? stg.gram.map(gOf).filter(Boolean) : tag ? GRAMMAR : [];
  gs.forEach(g => (g.ex || []).forEach(e => { if (!tag || (e[5] || 'daily') === tag) add(e[0], e[1], L3(e, 2)); }));
  const ids = b1SrcIds(src);
  if (typeof CXD !== 'undefined' && CXD) ids.forEach(i => { const c = ctxOf(i); if (c && c[0]) add(c[0][0], c[0][1], ({ id: c[0][3], en: c[0][4], tl: c[0][5], vi: c[0][6] })[meanLang()] || c[0][4]); });
  return out;
}

/* ---------- 2. teks & pinyin ---------- */
const b1Tr = o => (o ? (o[meanLang()] || (meanLang() === 'vi' && o.en ? vx(o.en) : '') || o.en || o.id || '') : '');
const b1TrId = o => (o ? (S.settings.ui === 'id' || meanLang() === 'id' ? o.id || o.en : b1Tr(o)) : '');
/* baris hanzi + pinyin per huruf (ruby) — pinyin: satu suku kata per hanzi */
function b1Line(zh, py, o = {}) {
  const ys = String(py || '').split(/\s+/).filter(Boolean); const hz = [...zh].filter(isHan);
  const ok = ys.length === hz.length; let k = 0;
  const cls = 'b1-zh' + (o.cls ? ' ' + o.cls : '');
  if (!ok || o.py === false) return `<span class="${cls}">${esc(zh)}</span>` + (ok || o.py === false || !py ? '' : `<span class="py b1-pyl">${esc(py)}</span>`);
  return `<span class="${cls} ruby">${[...zh].map(c => { if (!isHan(c)) return `<span class="b1-pn">${esc(c)}</span>`; const y = ys[k++]; return `<ruby>${esc(c)}<rt class="py t${toneOfPy(y)}">${esc(y)}</rt></ruby>`; }).join('')}</span>`;
}
const b1PyPlain = py => String(py || '').trim();

/* ---------- 3. suara: nada (pitch) per tokoh, tetap suara pilihan pengguna ---------- */
const CVP = { on: 0, pitch: 1 };
if (typeof VOICE !== 'undefined' && typeof VOICE.pitch === 'function') {
  const vp0 = VOICE.pitch.bind(VOICE);
  VOICE.pitch = function (v) { const p = vp0(v); return CVP.on ? Math.max(0.5, Math.min(1.6, p * CVP.pitch)) : p; };
}
const B1_PITCH = { A: 1, B: 0.82, C: 1.18, D: 0.92 };
function b1Speak(text, o = {}) {
  const done = () => { CVP.on = 0; if (o.onend) o.onend(); };
  CVP.on = 1; CVP.pitch = o.pitch || 1;
  try {
    if (TTS.cloud && TTS.cloud.enabled() && !TTS.cloud.down()) {
      TTS.stop(); TTS.cloud.play(String(text), o.rate).then(done, () => TTS.speakWith(TTS.voice, text, o.rate, done)); return;
    }
    if (!TTS.ok || typeof TTS.speakWith !== 'function') { CVP.on = 0; if (o.onend) setTimeout(o.onend, 500 + String(text).length * 140); return; }
    TTS.speakWith(TTS.voice, text, o.rate, done);
  } catch (e) { done(); }
}

/* ---------- 4. GRAMMAR: 21 pola lama + pola A2→B1+ ---------- */
const B1_ICON_FIX = { arrows: 'swap', no: 'close', pin: 'flag', scale: 'stats', star: 'sparkle' };
(GRAM2 || []).forEach(g => {
  if (GRAMMAR.some(x => x.k === g.k)) return;
  const icon = ICON_PATHS[g.icon] ? g.icon : (B1_ICON_FIX[g.icon] || 'grammar');
  GRAMMAR.push(Object.assign({}, g, { icon, lv: Math.max(3, Math.min(5, g.lv | 0)), b1: 1 }));
});
GRAMMAR.forEach(g => { if (g.lv <= 2) g.tier = g.lv; else if (g.lv === 3) g.tier = 3; else g.tier = g.lv; });
GRAM_TIER.length = 0;
GRAM_TIER.push(
  ['Dasar · rangka kalimat', 'Basics · sentence frame', 'Batayan · balangkas'],
  ['A1 · urutan & waktu', 'A1 · order & time', 'A1 · ayos at oras'],
  ['A2 · kalimat majemuk & aspek', 'A2 · complex sentences & aspect', 'A2 · masalimuot at aspeto'],
  ['B1 · aspek, pelengkap & penghubung', 'B1 · aspect, complements & connectors', 'B1 · aspeto, komplemento at pang-ugnay'],
  ['B1+ · nuansa lisan & formal', 'B1+ · spoken & formal nuance', 'B1+ · nuance ng pananalita']
);
/* label pendek pola baru: hanzi dalam kurung di akhir nama, atau bagian nama yang berisi hanzi, atau awal rumus */
function b1Short(g) {
  const nm = String((g.name || [])[0] || ''); const han = x => /[\u3400-\u9fff]/.test(x);
  let m = /\(([^()]*[\u3400-\u9fff][^()]*)\)\s*$/.exec(nm); let s = m ? m[1] : '';
  if (!s && nm.includes(':')) { const [a, ...b] = nm.split(':'); s = han(a) ? a : han(b.join(':')) ? b.join(':') : ''; }
  if (!s) s = String(g.form).split(/[（(；;]/)[0];
  s = s.trim(); return s.length > 18 ? s.slice(0, 17) + '…' : s;
}
GRAMMAR.forEach(g => { if (g.b1 && !G_SHORT[g.k]) G_SHORT[g.k] = b1Short(g); });
if (typeof ROUTE_DESC !== 'undefined') ROUTE_DESC.grammar = GRAMMAR.length + ' pola · Dasar → B1+';
/* label pola kosong (kalimat baru tanpa tag) tidak ditampilkan */
const b1GchipBase = gchip;
gchip = function (k, inSes) { if (!k) return ''; return b1GchipBase(k, inSes); };

/* ---------- 5. sumber kata di Game Dengar & Arena ---------- */
const b1LgWordsBase = lgWordsOf;
lgWordsOf = function (src) { if (b1IsSrc(src)) return [...new Set(b1SrcIds(src))].filter(lgOkW); return b1LgWordsBase(src); };
const b1LgSentsBase = lgSentsOf;
lgSentsOf = function (src) {
  if (!b1IsSrc(src)) return b1LgSentsBase(src);
  const out = b1SrcSents(src);
  if (out.length < 6) { try { b1LgSentsBase('a2').slice(0, 30).forEach(x => out.push(x)); } catch (e) {} }
  return out;
};
const b1LgNameBase = lgSrcName;
lgSrcName = function (src) { return b1IsSrc(src) ? b1SrcName(src) : b1LgNameBase(src); };
const b1LgOKBase = lgSrcOK;
lgSrcOK = function (src) { return b1IsSrc(src) ? b1SrcIds(src).length > 0 : b1LgOKBase(src); };
function b1SrcChips(cur, act, count) {
  const doms = [['dom:daily', 'chat', 'Sehari-hari'], ['dom:ee', 'class', 'Kampus Elektro'], ['dom:semi', 'chip', 'Industri semikonduktor'], ['b1', 'path', 'Kosakata B1']];
  return doms.map(([k, ic, l]) => `<button class="chip ${act === 'lgsrc' ? 'lg-src' : 'ar-src'} ${cur === k ? 'on' : ''}" data-a="${act}" data-v="${k}">${ICON(ic)} ${esc(t(l))} <b>${fmtN(count(k))}</b></button>`).join('');
}
const b1VLGameBase = XVIEWS.lgame;
XVIEWS.lgame = function () {
  const h = b1VLGameBase();
  try {
    const s = lgS(); const key = '<div class="lg-srow lg-sels">'; const k = h.indexOf(key); if (k < 0) return h;
    const row = `<div class="lg-srow b1-srow"><span class="small muted b1-srl">${t('Ranah & level')}</span>${b1SrcChips(s.src, 'lgsrc', x => lgWordsOf(x).length)}</div>`;
    let out = h.slice(0, k) + row + h.slice(k);
    if (b1IsSrc(s.src)) out = out.replace(`${t('kalimat dibuat dari pola sesuai levelmu')}`, `${fmtN(lgSentsOf(s.src).length)} ${t('kalimat dari dialog & contoh')}`);
    return out;
  } catch (e) { console.error('b1 lgame', e); return h; }
};
const b1VArenaBase = XVIEWS.arena;
XVIEWS.arena = function () {
  const h = b1VArenaBase();
  try {
    const a = arS(); const key = '<select class="ar-sel"'; let k = h.indexOf(key);
    if (k < 0) { k = h.indexOf('</section>', h.indexOf('ar-src')); }
    if (k < 0) return h;
    const row = `<div class="row wrap b1-arrow" style="gap:8px;margin-top:8px">${b1SrcChips(a.src, 'arsrc', x => arenaWordsN(x))}</div>`;
    return h.slice(0, k) + row + h.slice(k);
  } catch (e) { console.error('b1 arena', e); return h; }
};

/* ---------- 6. Kamus kata: filter ranah & kategori ---------- */
VS.dom = VS.dom || ''; VS.dc = VS.dc || '';
const b1WMBase = wordMatches;
wordMatches = function () {
  if (!VS.dom) return b1WMBase();
  let ids = b1SrcIds(VS.dc ? 'c:' + VS.dom + ':' + VS.dc : 'dom:' + VS.dom);
  if (VS.lv === 4) ids = ids.filter(i => W[i].l >= 4); else if (VS.lv >= 0) ids = ids.filter(i => W[i].l === VS.lv);
  const q = VS.q.trim().toLowerCase(); const qn = stripTone(q).replace(/[\s\d]/g, '');
  if (VS.st === 'known') ids = ids.filter(i => S.cards[i]);
  else if (VS.st === 'new') ids = ids.filter(i => !S.cards[i]);
  else if (VS.st === 'leech') ids = ids.filter(i => isLeech(card(i)));
  else if (VS.st === 'master') ids = ids.filter(i => mastery(card(i)) >= 3);
  if (q) ids = ids.filter(i => { const w = W[i]; return w.w.includes(q) || (qn && stripTone(w.p).replace(/\s/g, '').includes(qn)) || (w.m && w.m.some(x => String(x).toLowerCase().includes(q))); });
  return ids;
};
const b1VWordsBase = vWords;
vWords = function () {
  const h = b1VWordsBase();
  try {
    const key = '<div class="row small muted" style="margin-top:12px;gap:14px;flex-wrap:wrap">'; const k = h.indexOf(key); if (k < 0) return h;
    const opts = [['', 'Semua ranah'], ['daily', 'Sehari-hari'], ['ee', 'Kampus Elektro'], ['semi', 'Industri']];
    const cats = VS.dom ? (b1Cats()[VS.dom] || []) : [];
    const src = VS.dom ? (VS.dc ? 'c:' + VS.dom + ':' + VS.dc : 'dom:' + VS.dom) : '';
    const row = `<div class="b1-wdom"><div class="seg b1-seg">${opts.map(([v, l]) => `<button class="${VS.dom === v ? 'on' : ''}" data-a="b1wdom" data-v="${v}">${t(l)}</button>`).join('')}</div>
      ${cats.length ? `<div class="b1-cats">${cats.map(c => `<button class="chip ${VS.dc === c.c ? 'on' : ''}" data-a="b1wcat" data-v="${esc(c.c)}">${esc(ctxName(c.c))} <b>${c.ids.length}</b></button>`).join('')}</div>` : ''}
      ${src ? `<div class="row wrap b1-wact">${b1SrcBtns(src)}</div>` : ''}</div>`;
    return h.slice(0, k) + row + h.slice(k);
  } catch (e) { console.error('b1 words', e); return h; }
};
/* tombol belajar untuk satu sumber (kategori/ranah/tahap) */
function b1SrcBtns(src, o = {}) {
  const ids = b1SrcIds(src); const kn = ids.filter(i => S.cards[i]).length; const nw = ids.filter(i => !S.cards[i] && W[i].m).length;
  return `${nw ? `<button class="btn pri small" data-a="domlearn" data-v="${esc(src)}">${ICON('seed')} ${t('Pelajari {n} kata baru', { n: Math.min(8, nw) })}</button>` : ''}
    ${kn >= 4 ? `<button class="btn sec small" data-a="domprac" data-v="${esc(src)}">${ICON('target')} ${t('Latih')}</button><button class="btn sec small" data-a="domrec" data-v="${esc(src)}">${ICON('cards')} ${t('Kartu ingat')}</button>` : ''}
    ${o.game === false ? '' : `<button class="btn ghost small" data-a="domgame" data-v="${esc(src)}">${ICON('lgame')} ${t('Game Dengar')}</button>`}
    <span class="small muted b1-cnt">${kn}/${ids.length} ${t('dikenal')}</span>`;
}

/* ---------- 7. Kalimat nyata: kata B1 & ranah ---------- */
VS11.dom = VS11.dom || '';
const b1CxPoolBase = cxPool;
cxPool = function (tab) {
  if (!CXD) return [];
  const has = i => !!ctxOf(i) && W[i];
  const q = VS11.q.trim().toLowerCase();
  if (q) {
    const base = b1CxPoolBase(tab); const set = new Set(base); const qb = stripTone(q).replace(/\s+/g, '');
    const extra = W.filter(w => (w.l >= 4 || w.dom) && !set.has(w.i) && has(w.i)).filter(w => w.w.includes(q) || (w.s || '').includes(q) || stripTone(String(w.p || '')).replace(/\s+/g, '').startsWith(qb) || (w.m || []).some(m => String(m).toLowerCase().includes(q))).map(w => w.i);
    return base.concat(extra);
  }
  if (tab === 'b1') return W.filter(w => w.l >= 4 && w.l <= 5 && !w.dom).map(w => w.i).filter(has);
  if (tab === 'dom') { const d = VS11.dom || 'semi'; return W.filter(w => w.dom === d).map(w => w.i).filter(has); }
  return b1CxPoolBase(tab);
};
const b1VKalBase = vKalimat;
vKalimat = function () {
  const h = b1VKalBase();
  try {
    const k = h.indexOf('data-a="cxtab" data-v="all"'); if (k < 0) return h;
    const e = h.indexOf('</button>', k) + 9;
    const on = (x) => (VS11.tab === x && !VS11.q ? 'on' : '');
    let add = `<button class="${on('b1')}" data-a="cxtab" data-v="b1">B1</button><button class="${on('dom')}" data-a="cxtab" data-v="dom">${t('Ranah')}</button>`;
    let out = h.slice(0, e) + add + h.slice(e);
    if (VS11.tab === 'dom' && !VS11.q) {
      const k2 = out.indexOf('<input class="search" id="cxq"');
      const seg = `<div class="seg b1-seg b1-cxdom">${[['daily', 'Sehari-hari'], ['ee', 'Kampus'], ['semi', 'Industri']].map(([v, l]) => `<button class="${(VS11.dom || 'semi') === v ? 'on' : ''}" data-a="b1cxdom" data-v="${v}">${t(l)}</button>`).join('')}</div>`;
      if (k2 > 0) out = out.slice(0, k2) + seg + out.slice(k2);
    }
    return out;
  } catch (e) { console.error('b1 kalimat', e); return h; }
};

/* ---------- 8. Jalur kata: level ≥ B1 sekarang punya arti ---------- */
const b1VPathWords = vPath;
vPath = function () {
  let h = b1VPathWords();
  try {
    [4, 5, 6].forEach(lv => {
      const old = t('Level lanjutan setelah A2 ({n} kata, paket 40). Pinyin & suara sudah siap; arti 3 bahasa masih fokus di jalur A2.', { n: fmtN(lvTotal(lv)) });
      const withM = UNITS[lv].flatMap(u => u.ids).filter(i => W[i].m).length;
      h = h.replace(old, t('Level lanjutan setelah A2 ({n} kata, paket 40). {m} kata sudah punya arti & contoh kalimat — pelajari bertahap lewat tab A2 → B1.', { n: fmtN(lvTotal(lv)), m: fmtN(withM) }));
    });
  } catch (e) {}
  return h;
};

/* ---------- 9. sesi: susun kalimat dari teks bebas, pengait ringkasan ---------- */
function b1Chunks(zh, py) {
  const hz = [...zh].filter(isHan).join(''); const ys = String(py || '').split(/\s+/).filter(Boolean);
  let parts; try { parts = lgSeg(hz); } catch (e) { parts = [...hz]; }
  while (parts.length > 7) { let bi = 0, bl = 99; for (let j = 0; j < parts.length - 1; j++) { const l = parts[j].length + parts[j + 1].length; if (l < bl) { bl = l; bi = j; } } parts.splice(bi, 2, parts[bi] + parts[bi + 1]); }
  let k = 0; const al = ys.length === hz.length;
  return parts.map(p => { const c = { hz: p, py: al ? ys.slice(k, k + p.length).join(' ') : '', slot: null }; k += p.length; return c; });
}
/* item 'build' (susun kalimat) dari kalimat dialog/contoh — null bila terlalu pendek/panjang */
function b1BuildItem(zh, py, tr) {
  const chunks = b1Chunks(zh, py); if (chunks.length < 3) return null;
  const uniq = new Set(chunks.map(c => c.hz)); if (uniq.size !== chunks.length) return null;
  const id = tr.id || tr.en || '', en = tr.en || tr.id || '';
  return { type: 'build', sent: { chunks, zh: chunks.map(c => c.hz).join(''), py: chunks.map(c => c.py).join(' '), tr: [id, en, tr.tl || en, vx(en)] } };
}
/* pilihan ganda bebas (renderer lx milik Kelas) */
function b1Mcq(o) { return Object.assign({ lx: 1, type: 'lmcq', ic: 'target', label: 'Pilih jawabannya', one: 0 }, o); }
/* setelah sesi selesai: opts.xbDone(acc, ses) → html tambahan di ringkasan */
const b1SumBase = showSummary;
showSummary = function () {
  const X = SES; const f = X && !X.summarized && X.opts && X.opts.xbDone;
  let acc = 100; if (f) { const n = X.ok + X.bad; acc = n ? Math.round(X.ok / n * 100) : 100; }
  const r = b1SumBase.apply(this, arguments);
  if (f) { try { const html = f(acc, X); const k = document.querySelector('#sbody .summary .kpis'); if (k && html) k.insertAdjacentHTML('afterend', html); } catch (e) { console.error('xbDone', e); } }
  return r;
};
/* soal dengar: putar otomatis saat soal tampil */
const b1RenderItemBase = renderItem;
renderItem = function () {
  /* soal lx (pilihan ganda bebas) tidak mengosongkan footer sendiri: buang umpan balik soal sebelumnya */
  try { const it0 = SES && SES.items[SES.i]; const f = it0 && it0.lx && document.getElementById('sfoot'); if (f) f.innerHTML = ''; } catch (e) {}
  const r = b1RenderItemBase.apply(this, arguments);
  try { const it = SES && SES.items[SES.i]; if (it && it.b1say && !SES.answered && voiceOK()) speakFor(it, it.b1say, 350); } catch (e) {}
  return r;
};

/* ---------- 10. sesi per sumber (kategori / ranah / tahap) ---------- */
Object.assign(ACT, {
  domlearn: b => { const src = b.dataset.v; const fresh = b1SrcIds(src).filter(i => !S.cards[i] && W[i].m).slice(0, 8); closeModal(); if (!fresh.length) return toast(t('Semua kata di sini sudah kamu kenal — lanjut latih saja.')); startSession(interleave(fresh, []), { title: b1SrcName(src) }); },
  domprac: b => { const src = b.dataset.v; const kn = b1SrcIds(src).filter(i => S.cards[i]); closeModal(); if (kn.length < 4) return toast(t('Pelajari beberapa kata dulu ya.')); const mk = () => shuffle(kn.slice()).slice(0, 14).map(i => ({ type: chooseType(i), wid: i })); startSession(mk(), { title: b1SrcName(src), rebuild: mk }); },
  domrec: b => { const src = b.dataset.v; const kn = b1SrcIds(src).filter(i => S.cards[i] && W[i].m); closeModal(); if (kn.length < 3) return toast(t('Belum ada kata untuk diingat — pelajari beberapa kata dulu 🌱')); const mk = () => buildRecall(20, shuffle(kn.slice())); startSession(mk(), { title: t('Kartu ingat') + ' · ' + b1SrcName(src), rebuild: mk }); },
  domgame: b => { const s = lgS(); s.src = b.dataset.v; save(); closeModal(); go('lgame'); },
  b1wdom: b => { VS.dom = b.dataset.v; VS.dc = ''; VS.lim = 120; render(); },
  b1wcat: b => { VS.dc = VS.dc === b.dataset.v ? '' : b.dataset.v; VS.lim = 120; render(); },
  b1cxdom: b => { VS11.dom = b.dataset.v; VS11.sel = null; VS11.lim = 60; render(); }
});
['domlearn', 'domprac', 'domrec'].forEach(a => START_ACTS.add(a));
/* premode: jenis aktivitas baru + pemetaan tombol mulai */
Object.assign(XM_KIND, { gram: ['Tata bahasa', 'grammar', 'pthavrcn'], conv: ['Percakapan', 'chat', 'pthavrc'], b1: ['Jalur A2 → B1', 'path', 'pthavrc'] });
Object.assign(XM_ACT, { domlearn: 'learn', domprac: 'practice', domrec: 'review' });

/* ---------- 11. teks UI ---------- */
Object.assign(I18N, {
  'Sehari-hari': ['Everyday', 'Pang-araw-araw'], 'Kampus Elektro': ['EE campus', 'EE campus'], 'Pabrik Semikonduktor': ['Semiconductor fab', 'Semiconductor fab'],
  'Hidup sehari-hari di Taiwan': ['Everyday life in Taiwan', 'Buhay sa Taiwan'], 'Kampus Equipment Engineering': ['Equipment Engineering campus', 'Kampus ng Equipment Engineering'],
  'Fab & industri semikonduktor': ['Fab & semiconductor industry', 'Fab at industriya ng semiconductor'], 'Kampus': ['Campus', 'Kampus'], 'Pabrik': ['Fab', 'Pabrika'],
  'Kosakata B1': ['B1 vocabulary', 'B1 na bokabularyo'], 'Tahap': ['Stage', 'Yugto'], 'Ranah & level': ['Domain & level', 'Larangan at antas'],
  'Industri semikonduktor': ['Semiconductor industry', 'Industriya ng semiconductor'], 'Semua ranah': ['All domains', 'Lahat ng larangan'], 'Industri': ['Industry', 'Industriya'],
  'Pelajari {n} kata baru': ['Learn {n} new words', 'Matuto ng {n} bagong salita'], 'dikenal': ['known', 'kilala'], 'Ranah': ['Domain', 'Larangan'],
  'Semua kata di sini sudah kamu kenal — lanjut latih saja.': ['You know every word here — keep practising.', 'Kilala mo na lahat dito — magsanay na lang.'],
  'Level lanjutan setelah A2 ({n} kata, paket 40). {m} kata sudah punya arti & contoh kalimat — pelajari bertahap lewat tab A2 → B1.': ['Advanced level after A2 ({n} words, packs of 40). {m} words now have meanings & example sentences — learn them step by step in the A2 → B1 tab.', 'Mataas na antas pagkatapos ng A2 ({n} salita). {m} salita ay may kahulugan at halimbawa na — pag-aralan sa tab na A2 → B1.'],
  'Pilih jawabannya': ['Choose the answer', 'Piliin ang sagot'], 'Jalur A2 → B1': ['A2 → B1 path', 'Landas A2 → B1']
});
Object.assign(I18N_VI, {
  'Sehari-hari': 'Đời thường', 'Kampus Elektro': 'Khoa Điện', 'Pabrik Semikonduktor': 'Nhà máy bán dẫn', 'Hidup sehari-hari di Taiwan': 'Đời sống ở Đài Loan',
  'Kampus Equipment Engineering': 'Khoa Kỹ thuật thiết bị', 'Fab & industri semikonduktor': 'Fab & ngành bán dẫn', 'Kampus': 'Trường', 'Pabrik': 'Nhà máy', 'Kosakata B1': 'Từ vựng B1',
  'Tahap': 'Chặng', 'Ranah & level': 'Lĩnh vực & cấp độ', 'Industri semikonduktor': 'Ngành bán dẫn', 'Semua ranah': 'Mọi lĩnh vực', 'Industri': 'Công nghiệp',
  'Pelajari {n} kata baru': 'Học {n} từ mới', 'dikenal': 'đã biết', 'Ranah': 'Lĩnh vực', 'Semua kata di sini sudah kamu kenal — lanjut latih saja.': 'Bạn đã biết hết từ ở đây — tiếp tục luyện nhé.',
  'Level lanjutan setelah A2 ({n} kata, paket 40). {m} kata sudah punya arti & contoh kalimat — pelajari bertahap lewat tab A2 → B1.': 'Cấp độ sau A2 ({n} từ, gói 40). {m} từ đã có nghĩa & câu ví dụ — học dần trong thẻ A2 → B1.',
  'Pilih jawabannya': 'Chọn đáp án', 'Jalur A2 → B1': 'Lộ trình A2 → B1'
});

