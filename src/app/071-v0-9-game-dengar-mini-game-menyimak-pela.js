/* ========== V0.9 · GAME DENGAR — mini-game menyimak + pelafalan ==========
   Rute baru `lgame`: hub (pilih sumber + game) dan 6 game layar penuh (#lgx):
   Tangkap Bunyi · Pemburu Nada · Dikte Kilat · Susun Kalimat Dengar · Ucapkan! · Hujan Kata.
   Data per kata disimpan di S.lg dengan kunci bentuk kata (W[i].w), bukan indeks. */

ICON_PATHS.lgame = '<path d="M4 14.6v-2.4a8 8 0 0 1 16 0v2.4"/><rect x="2.6" y="13.6" width="4.4" height="6.4" rx="2"/><rect x="17" y="13.6" width="4.4" height="6.4" rx="2"/><path d="M10.4 9.6v5l4-2.5z" fill="currentColor"/>';
ICON_PATHS.ear = '<path d="M7 9.4a5.4 5.4 0 1 1 10.8 0c0 2.6-1.6 3.6-2.6 4.6-.9.9-1 1.6-1.2 2.8-.3 1.9-1.6 3.2-3.4 3.2A3.2 3.2 0 0 1 7.4 17"/><path d="M10 9.6a2.4 2.4 0 0 1 4.8 0c0 1.2-1.2 1.6-1.6 2.6"/>';
ICON_PATHS.rain = '<path d="M7 14.4a4 4 0 0 1-.4-8A5.4 5.4 0 0 1 17 6.8a3.8 3.8 0 0 1 .4 7.6z"/><path d="M8.4 17.4 7.6 19.6M12.4 17.4l-.8 2.2M16.4 17.4l-.8 2.2"/>';
ICON_PATHS.heart = '<path d="M12 20.2s-7.6-4.6-7.6-10.2A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7.6 2.4c0 5.6-7.6 10.2-7.6 10.2z" fill="currentColor"/>';
ICON_PATHS.eye = '<path d="M2.6 12S6 5.6 12 5.6 21.4 12 21.4 12 18 18.4 12 18.4 2.6 12 2.6 12z"/><circle cx="12" cy="12" r="2.8"/>';
ICON_PATHS.skip = '<path d="M5.4 5.6 14 12l-8.6 6.4z"/><path d="M18.4 5.6v12.8"/>';
if (!ICON_PATHS.mic) ICON_PATHS.mic = '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.6 11a6.4 6.4 0 0 0 12.8 0M12 17.4V21M8.6 21h6.8"/>';
if (!ICON_PATHS.pause) ICON_PATHS.pause = '<rect x="6.5" y="5" width="3.6" height="14" rx="1.2"/><rect x="13.9" y="5" width="3.6" height="14" rx="1.2"/>';

const LG_GAMES = [
  { k: 'tangkap', ic: 'ear', c: 'c6', ti: 'Tangkap Bunyi', sub: 'Dengar kata, pilih hanzi + pinyin yang tepat di antara bunyi yang mirip', dur: 75, ty: 'listen' },
  { k: 'nada', ic: 'tone', c: 'c8', ti: 'Pemburu Nada', sub: 'Dengar kata, ketuk pola nadanya — termasuk jebakan sandhi', dur: 75, ty: 'tone' },
  { k: 'dikte', ic: 'keyboard', c: 'c4', ti: 'Dikte Kilat', sub: 'Dengar, lalu ketik pinyinnya atau susun hanzinya', dur: 100, ty: 'type' },
  { k: 'susun', ic: 'blocks', c: 'c2', ti: 'Susun Kalimat Dengar', sub: 'Dengar kalimat dari dialog & contoh, susun potongannya', dur: 120, ty: 'build', sent: 1 },
  { k: 'ucap', ic: 'mic', c: 'c1', ti: 'Ucapkan!', sub: 'Tiru suara model — app menilai pelafalan & nadamu', n: 8 },
  { k: 'hujan', ic: 'rain', c: 'c5', ti: 'Hujan Kata', sub: 'Kata berjatuhan — ketuk yang kamu dengar sebelum menyentuh tanah', dur: 120, lives: 3, ty: 'listen' }
];
const LG_G = k => LG_GAMES.find(g => g.k === k) || LG_GAMES[0];
const LG_HAN = /^[\u3400-\u9fff]+$/;
const LG_SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;
let LG = null;

/* ---------- state ---------- */
function lgS() {
  if (!S.lg || typeof S.lg !== 'object' || Array.isArray(S.lg)) S.lg = {};
  const s = S.lg; ['best', 'lv', 'plays', 'miss', 'last'].forEach(k => { if (!s[k] || typeof s[k] !== 'object' || Array.isArray(s[k])) s[k] = {}; });
  if (typeof s.src !== 'string') s.src = lgLearnedIds().length >= 8 ? 'learned' : 'a2'; if (s.dk !== 'tile') s.dk = 'type';
  return s;
}

/* ---------- pinyin: suku kata, kemiripan bunyi ---------- */
const LG_INI = ['zh', 'ch', 'sh', 'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'r', 'z', 'c', 's', 'y', 'w'];
function lgSplit(b) { let ini = ''; for (const I of LG_INI) if (b.startsWith(I)) { ini = I; break; } let fin = b.slice(ini.length); if (/^[jqxy]$/.test(ini) && fin[0] === 'u') fin = 'v' + fin.slice(1); return [ini, fin]; }
function lgNorm(b) { const [i, f] = lgSplit(b); return i + f; }
function lgSyl(y, tn) {
  const raw = String(y || ''); let tone = tn;
  if (!(tone >= 1 && tone <= 5)) { tone = 5; for (const c of raw) if (MARKS[c]) tone = MARKS[c][1]; }
  const b0 = stripTone(raw.toLowerCase()).replace(/ü/g, 'v').replace(/[^a-z]/g, '');
  const [ini, fin] = lgSplit(b0);
  return { b: ini + fin, ini, fin, tone, y: raw };
}
const LG_IG = [['zh', 'z', 'j'], ['ch', 'c', 'q'], ['sh', 's', 'x'], ['n', 'l'], ['l', 'r'], ['b', 'p'], ['d', 't'], ['g', 'k'], ['f', 'h']];
const LG_FG = [['an', 'ang'], ['en', 'eng'], ['in', 'ing'], ['ian', 'iang'], ['uan', 'uang'], ['u', 'v'], ['un', 'vn'], ['ue', 've'], ['eng', 'ong'], ['uo', 'ou'], ['ei', 'ui'], ['ie', 've'], ['van', 'uan'], ['i', 'v']];
const lgSimI = (a, b) => a !== b && LG_IG.some(g => g.includes(a) && g.includes(b));
const lgSimF = (a, b) => a !== b && LG_FG.some(g => g.includes(a) && g.includes(b));
function lgSylD(a, b) {
  if (a.b === b.b) return a.tone === b.tone ? 0 : 1;
  const td = a.tone === b.tone ? 0 : 0.5; const ie = a.ini === b.ini, fe = a.fin === b.fin;
  if (ie && lgSimF(a.fin, b.fin)) return 1.5 + td;
  if (fe && lgSimI(a.ini, b.ini)) return 1.5 + td;
  if (lgSimI(a.ini, b.ini) && lgSimF(a.fin, b.fin)) return 2.5 + td;
  if (ie || fe) return 3 + td;
  return 5;
}
/* indeks: suku kata tiap kata, kata per jumlah suku kata, bacaan per huruf */
let LGX = null;
const lgTxt = w => String((w && (w.s || w.w)) || '').replace(/[()（）]/g, '');
function lgIdx() {
  if (LGX) return LGX;
  const X = { syl: {}, byN: {}, cp: new Map(), set: new Set(), form: new Map() };
  W.forEach((w, i) => {
    if (!w) return; if (w.w && !X.form.has(w.w)) X.form.set(w.w, i);
    const s = lgTxt(w); if (!LG_HAN.test(s) || !aligned(w) || w.y.length !== s.length || !w.t || w.t.length !== s.length) return;
    const sy = w.y.map((y, k) => lgSyl(y, w.t[k])); X.syl[i] = sy; (X.byN[s.length] || (X.byN[s.length] = [])).push(i);
    sy.forEach((o, k) => { X.set.add(o.b); const c = s[k]; let a = X.cp.get(c); if (!a) X.cp.set(c, a = []); const e = a.find(r => r.b === o.b && r.tone === o.tone); if (e) e.n++; else a.push({ b: o.b, tone: o.tone, y: o.y, n: 1 }); });
  });
  X.cp.forEach(a => a.sort((p, q) => q.n - p.n));
  ['er', 'a', 'o', 'e', 'ai', 'ei', 'ao', 'ou', 'an', 'en', 'ang', 'eng'].forEach(b => X.set.add(b));
  LGX = X; return X;
}
function lgOkW(i) { const w = W[i]; return !!(w && (w.m || w.km) && lgIdx().syl[i]); }
const lgKey = sy => sy.map(s => s.b + s.tone).join(' ');
/* nada yang benar-benar terdengar: 3-3 → 2-3, 不/一 berubah */
function lgSpoken(chars, tones) {
  const r = tones.slice();
  for (let j = 0; j < r.length - 1; j++) {
    const c = chars[j], nx = tones[j + 1];
    if (c === '不' && tones[j] === 4 && nx === 4) r[j] = 2;
    else if (c === '一' && tones[j] === 1) { if (nx === 4) r[j] = 2; else if (nx >= 1 && nx <= 3) r[j] = 4; }
    else if (tones[j] === 3 && nx === 3) r[j] = 2;
  }
  return r;
}
function lgDict(chars, tones) { return tones.map((x, j) => ((chars[j] === '一' && (x === 2 || x === 4)) ? 1 : (chars[j] === '不' && x === 2) ? 4 : x)); }
function lgToneAlts(chars, tones) { const a = new Set([tones.join('-'), lgSpoken(chars, tones).join('-'), lgDict(chars, tones).join('-')]); return a; }
const lgHasSandhi = (chars, tones) => lgToneAlts(chars, tones).size > 1;

/* pengecoh berbunyi mirip (nada lain, zh/z/j, an/ang, …) */
function lgDistract(i, n, lv) {
  const X = lgIdx(); const me = X.syl[i]; if (!me) return shuffle(Object.keys(X.syl).map(Number).filter(k => k !== i)).slice(0, n);
  const L = me.length; const myKey = lgKey(me); const myTxt = lgTxt(W[i]);
  const cands = []; const seen = new Set([myKey]);
  for (const k of X.byN[L] || []) {
    if (k === i) continue; const sk = X.syl[k]; let d = 0;
    for (let j = 0; j < L; j++) { d += lgSylD(me[j], sk[j]); if (d > 4 + L * 2) break; }
    if (d > 4 + L * 2) continue; cands.push([k, d]);
  }
  cands.sort((a, b) => a[1] - b[1] || (W[a[0]].l - W[b[0]].l));
  const out = [];
  const take = list => { for (const [k] of list) { if (out.length >= n) break; const ky = lgKey(X.syl[k]); const tx = lgTxt(W[k]); if (seen.has(ky) || tx === myTxt || out.some(o => lgTxt(W[o]) === tx)) continue; seen.add(ky); out.push(k); } };
  const win = [40, 18, 10, 6, 4][clamp(lv | 0, 0, 4)];
  take(shuffle(cands.slice(0, Math.max(win, n * 2))));
  if (out.length < n) take(cands);
  if (out.length < n) take(shuffle(X.byN[L] || []).slice(0, 60).map(k => [k, 9]));
  if (out.length < n) take(shuffle(Object.keys(X.syl).map(Number)).slice(0, 80).map(k => [k, 9]));
  return out.slice(0, n);
}

/* ---------- sumber: kata & kalimat ---------- */
function lgLearnedIds() { return Object.keys(S.cards).map(Number).filter(i => W[i] && !(typeof isIgn === 'function' && isIgn(S.cards[i]))); }
function lgMissIds() {
  const s = lgS(); const X = lgIdx();
  return Object.entries(s.miss).filter(([, r]) => r && r.m > 0).sort((a, b) => b[1].m - a[1].m || b[1].t - a[1].t).map(([f]) => X.form.get(f)).filter(i => i !== undefined && lgOkW(i));
}
function lgLessons() { try { return typeof KLS !== 'undefined' ? KLS : []; } catch (e) { return []; } }
const lgIsSD = L => L.course === 'sd';
function lgLessonName(n) { const L = lgLessons().find(x => x.n === n); if (!L) return '?'; const sh = typeof lnShort === 'function' ? lnShort(n) : 'L' + (L.num || n); return sh + ' · ' + ((L.title && L.title.zh) || ''); }
function lgSrcName(src) {
  if (src === 'learned') return t('Kata yang sudah dipelajari'); if (src === 'a2') return t('Kosakata A2'); if (src === 'miss') return t('Salah dengar');
  const m = /^k:(\d+)$/.exec(src); if (m) return lgLessonName(+m[1]); return src;
}
function lgWordsOf(src) {
  let ids = [];
  if (src === 'learned') ids = lgLearnedIds();
  else if (src === 'a2') ids = typeof A2_ORDER !== 'undefined' ? A2_ORDER.slice() : W.filter(w => w.l < 4).map(w => w.i);
  else if (src === 'miss') ids = lgMissIds();
  else { const m = /^k:(\d+)$/.exec(src); if (m && typeof klWords === 'function') { try { ids = klWords(+m[1]); } catch (e) { ids = []; } } }
  return [...new Set(ids)].filter(lgOkW);
}
const lgTr = o => (o ? o[meanLang()] || o.en || o.id || '' : '');
const lgHanOnly = s => [...String(s || '')].filter(c => isHan(c)).join('');
function lgSentsOf(src) {
  const out = []; const seen = new Set();
  const add = (zh, py, tr, ch) => { zh = String(zh || '').trim(); const h = lgHanOnly(zh); if (h.length < 2 || h.length > 22 || seen.has(h) || /[＿_]/.test(zh)) return; seen.add(h); out.push({ zh, py: py || '', tr: tr || '', ch: ch || null, h }); };
  const m = /^k:(\d+)$/.exec(src); const L = m && lgLessons().find(x => x.n === +m[1]);
  if (L) {
    (L.reorder || []).forEach(r => r && r.chunks && add(r.chunks.join('') + (r.end || ''), r.py, lgTr(r), r.chunks));
    (L.dialog || []).forEach(x => add(x.zh, x.py, lgTr(x)));
    if (L.book && Array.isArray(L.book.dialogs)) L.book.dialogs.forEach(D => (D.lines || []).forEach(x => add(x.zh, x.py, lgTr(x))));
    (L.pairs || []).forEach(p => { add(p.q, p.qpy, ''); add(p.a, p.apy, ''); });
    (L.grammar || []).forEach(g => (g.ex || []).forEach(x => add(x.zh, x.py, lgTr(x))));
    (L.vocab || []).forEach(v => v.ex && add(v.ex.zh, v.ex.py, lgTr(v.ex)));
  }
  if (out.length < 6 && typeof makeSentence === 'function') {
    const li = { id: 0, en: 1, tl: 2, vi: 3 }[meanLang()] || 0;
    for (let k = 0; k < 40 && out.length < 30; k++) { try { const s = makeSentence(); add(s.zh + '。', s.py, s.tr[li] || s.tr[1], s.chunks.map(c => c.hz)); } catch (e) { break; } }
  }
  return out;
}
/* potongan kata untuk Susun: pakai pemenggal kata dari kamus W */
function lgSeg(zh) {
  const h = lgHanOnly(zh); const X = lgIdx(); const out = [];
  const has = f => (typeof vcIndex === 'function' ? vcIndex().has(f) : X.form.has(f));
  for (let i = 0; i < h.length;) { let L = Math.min(4, h.length - i); for (; L > 1; L--) if (has(h.substr(i, L))) break; out.push(h.substr(i, L)); i += L; }
  const P = new Set(['的', '了', '嗎', '呢', '吧', '啊', '喔', '呀', '們']);
  for (let j = out.length - 1; j > 0; j--) if (P.has(out[j])) { out[j - 1] += out[j]; out.splice(j, 1); }
  return out;
}
function lgChunks(s, max) {
  let ch = (s.ch ? s.ch.slice() : lgSeg(s.zh)).map(c => lgHanOnly(c)).filter(Boolean);
  while (ch.length > max) { let bi = 0, bl = 1e9; for (let j = 0; j < ch.length - 1; j++) { const l = ch[j].length + ch[j + 1].length; if (l < bl) { bl = l; bi = j; } } ch.splice(bi, 2, ch[bi] + ch[bi + 1]); }
  return ch;
}
function lgPyToks(py) { return String(py || '').replace(/[^A-Za-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüÜĀÁǍÀĒÉĚÈĪÍǏÌŌÓǑÒŪÚǓÙ\s]/g, ' ').split(/\s+/).filter(Boolean); }
/* suku kata (dengan nada) untuk teks bebas: pakai pinyin kalimat kalau sejajar, kalau tidak bacaan terumum per huruf */
function lgSylOf(zh, py) {
  const h = [...lgHanOnly(zh)]; const tk = lgPyToks(py);
  if (tk.length === h.length) return tk.map(y => lgSyl(y));
  const X = lgIdx(); return h.map(c => { const r = X.cp.get(c); return r ? { b: r[0].b, tone: r[0].tone, y: r[0].y, ini: '', fin: '' } : { b: '?', tone: 5, y: c }; });
}
const lgPyHTML = sy => sy.map(s => `<span class="t${s.tone}">${esc(s.y)}</span>`).join(' ');
function lgWItem(i) { const w = W[i]; const sy = lgIdx().syl[i]; return { i, zh: lgTxt(w), sy, tones: w.t.slice(), tr: shortMean(meanP(w)) }; }
function lgSItem(s) { return { zh: s.zh, h: s.h, sy: lgSylOf(s.zh, s.py), tr: s.tr, s }; }

/* ---------- suara ---------- */
function lgSay(text, slow) {
  if (!text) return; FX.ensure(); if (TTS.unlock) TTS.unlock();
  clearTimeout(TTS.seq); TTS.speak(String(text), slow ? 0.6 : undefined);
  const b = document.querySelector(slow ? '#lgx .lg-slowb' : '#lgx .lg-play'); if (b) { b.classList.remove('on'); void b.offsetWidth; b.classList.add('on'); clearTimeout(b._t); b._t = setTimeout(() => b.classList.remove('on'), 500 + lgHanOnly(text).length * (slow ? 520 : 300)); }
}
function lgBeep(f, d = 0.12, type = 'sine', v = 0.09) { try { if (!S.settings.sound) return; const c = FX.ensure(); if (!c || c.state !== 'running') return; FX.note(f, 0, d, type, v); } catch (e) {} }

/* ---------- catatan salah dengar (kunci = bentuk kata) ---------- */
function lgMissRec(i) {
  const w = W[i]; if (!w) return; const s = lgS(); const r = s.miss[w.w] || (s.miss[w.w] = { m: 0, n: 0 });
  r.m = Math.min(9, (r.m || 0) + 1); r.n = (r.n || 0) + 1; r.t = Date.now();
  if (r.m >= 3 && !r.dg && S.cards[i] && typeof setWordStatus === 'function' && typeof wordStatus === 'function') {
    try { if (wordStatus(i) >= 2) { setWordStatus(i, 1, true); r.dg = 1; toast(t('{w} sering salah dengar — statusnya kembali ke Belajar supaya lebih sering diulang.', { w: `<b class="hz">${esc(lgTxt(w))}</b>` }), 3200, 'lgdg'); } } catch (e) {}
  }
  const keys = Object.keys(s.miss); if (keys.length > 400) keys.sort((a, b) => (s.miss[a].t || 0) - (s.miss[b].t || 0)).slice(0, keys.length - 400).forEach(k => delete s.miss[k]);
}
function lgHitRec(i) { const w = W[i]; if (!w) return; const s = lgS(); const r = s.miss[w.w]; if (!r) return; r.m = Math.max(0, (r.m || 0) - 1); if (!r.m) delete s.miss[w.w]; }

/* ---------- membuka game ---------- */
function lgPool(game, src) {
  const G0 = LG_G(game); let words = lgWordsOf(src); let note = '';
  if (words.length < 8 && src !== 'a2') { const base = lgWordsOf('a2').filter(i => !words.includes(i)).slice(0, Math.max(0, 24 - words.length)); if (words.length < 4) note = t('Kata di sumber ini belum cukup — ditambah kata A2 dasar.'); words = words.concat(base); }
  const sents = G0.sent || game === 'ucap' || game === 'dikte' ? lgSentsOf(src) : [];
  return { words, sents, note };
}
function lgOpen(game, opts = {}) {
  if (typeof SES !== 'undefined' && SES) { toast(t('Selesaikan atau tutup sesi yang sedang berjalan dulu ✨')); return; }
  const s = lgS(); const G0 = LG_G(game); const src = opts.src || s.src;
  hushAll(); closeModal(); lgKill();
  const P = lgPool(game, src);
  if (P.words.length < 4) { toast(t('Kata belum cukup untuk game ini. Pelajari beberapa kata dulu, atau pilih sumber A2.')); return; }
  if (P.note) toast(P.note, 2600, 'lgnote');
  s.plays[game] = (s.plays[game] || 0) + 1;
  LG = { g: G0, k: game, src, words: P.words, sents: P.sents, focus: opts.focus || null, lv: clamp(s.lv[game] || 0, 0, 4), score: 0, combo: 0, maxC: 0, hits: 0, ans: 0, frac: 0,
    lives: G0.lives || 0, missed: [], recent: [], up: 0, down: 0, n: 0, phase: 'count', paused: false, hold: 0, raf: 0, tEnd: 0, t0: Date.now(), q: null, run: 0, best0: s.best[game] || 0, auto: S.settings.autoplay !== false };
  let el = document.getElementById('lgx'); if (el) el.remove();
  el = document.createElement('div'); el.id = 'lgx'; el.className = 'lgx lg-' + game; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', t(G0.ti));
  document.body.appendChild(el); document.body.classList.add('in-session');
  el.addEventListener('click', lgClick); el.addEventListener('submit', e => { e.preventDefault(); if (LG && LG.k === 'dikte') lgDikteCheck(); });
  lgShell(); lgCountdown();
}
function lgKill() {
  if (!LG) return; LG.run++; cancelAnimationFrame(LG.raf); clearTimeout(LG.nx); clearTimeout(LG.cd);
  const q = LG.q; if (q) { try { q.rec && q.rec.abort && q.rec.abort(); } catch (e) {} try { q.mr && q.mr.state === 'recording' && q.mr.stop(); } catch (e) {} lgStopStream(q); }
}
function lgStopStream(q) { try { if (q && q.stream) { q.stream.getTracks().forEach(tr => tr.stop()); q.stream = null; } } catch (e) {} }
function lgClose(toHub) {
  if (LG && ['play', 'count', 'pause'].includes(LG.phase) && LG.ans > 0) lgFinish(true);
  lgKill(); hushAll(); const el = document.getElementById('lgx'); if (el) el.remove();
  document.body.classList.remove('in-session'); LG = null;
  if (toHub && ROUTE !== 'lgame') go('lgame'); else render();
}

/* ---------- kerangka layar ---------- */
function lgShell() {
  const G0 = LG.g; const el = document.getElementById('lgx');
  el.innerHTML = `<div class="lgx-in">
    <header class="lg-hud">
      <button class="lg-ib" data-lg="close" aria-label="${t('Tutup')}">${ICON('close')}</button>
      <div class="lg-ttl"><div class="lg-tt"><span class="lg-gi">${ICON(G0.ic)}</span><b>${t(G0.ti)}</b><span class="lg-tsec" id="lgsec"></span></div><div class="lg-time"><i id="lgbar"></i></div></div>
      <div class="lg-sc"><b id="lgsc">0</b><small>${t('poin')}</small></div>
      <button class="lg-ib" data-lg="pause" aria-label="${t('Jeda')}">${ICON('pause')}</button>
    </header>
    <div class="lg-sub"><span class="lg-lives" id="lglv"></span><span class="lg-combo" id="lgcb"></span><span class="grow"></span><span class="lg-lvd" id="lglvl"></span></div>
    <main class="lg-stage" id="lgst"></main>
    <div class="lg-ovl" id="lgov"></div>
  </div>`;
  lgHud();
}
function lgHud() {
  if (!LG) return; const sc = $('#lgsc'); if (sc) sc.textContent = fmtN(Math.round(LG.score));
  const lv = $('#lglv'); if (lv) lv.innerHTML = LG.g.lives ? Array.from({ length: LG.g.lives }, (_, k) => `<i class="${k < LG.lives ? '' : 'off'}">${ICON('heart')}</i>`).join('') : (LG.g.n ? `<span class="lg-prog">${Math.min(LG.n + (LG.phase === 'play' ? 1 : 0), LG.g.n)}/${LG.g.n}</span>` : '');
  const cb = $('#lgcb'); if (cb) { cb.innerHTML = LG.combo >= 2 ? `${ICON('flame')}<b>${LG.combo}</b> combo` : ''; cb.classList.toggle('hot', LG.combo >= 5); }
  const ld = $('#lglvl'); if (ld) ld.innerHTML = `<small>${t('Level')}</small>` + [0, 1, 2, 3, 4].map(k => `<i class="${k <= LG.lv ? 'on' : ''}"></i>`).join('');
}
function lgCountdown() {
  const ov = $('#lgov'); const G0 = LG.g; const run = LG.run;
  const how = { tangkap: 'Dengarkan, lalu pilih kata yang tepat. Pengecohnya berbunyi mirip!', nada: 'Dengarkan, lalu ketuk pola nada kamus (nada tulisan).', dikte: 'Dengarkan, lalu ketik pinyinnya (ni3hao3 atau nǐ hǎo) — atau susun hanzinya.', susun: 'Dengarkan kalimatnya, lalu ketuk potongan kata sesuai urutan.', ucap: 'Dengar model, tekan mikrofon, lalu ucapkan. 8 kata/kalimat.', hujan: 'Dengarkan katanya, ketuk hanzi yang jatuh sebelum menyentuh tanah. 3 nyawa.' }[LG.k];
  ov.innerHTML = `<div class="lg-cd"><div class="lg-cdc">${mascot('wave', 110)}<h2>${t(G0.ti)}</h2><p>${t(how)}</p><div class="lg-cdn" id="lgcdn"></div><div class="small muted">${esc(lgSrcName(LG.src))} · ${LG.focus ? LG.focus.length : (G0.sent ? Math.max(LG.sents.length, 1) : LG.words.length)} ${G0.sent ? t('kalimat') : t('kata')}</div></div></div>`;
  ov.classList.add('on');
  const seq = ['3', '2', '1', t('Mulai!')]; let k = 0;
  const step = () => {
    if (!LG || LG.run !== run) return; const n = $('#lgcdn'); if (!n) return;
    if (k >= seq.length) { ov.classList.remove('on'); ov.innerHTML = ''; lgBegin(); return; }
    n.textContent = seq[k]; n.classList.remove('pop'); void n.offsetWidth; n.classList.add('pop');
    lgBeep(k < 3 ? 660 : 990, k < 3 ? 0.1 : 0.25, 'triangle', 0.08); k++; LG.cd = setTimeout(step, k === seq.length ? 520 : 640);
  };
  LG.cd = setTimeout(step, 450);
}
function lgBegin() {
  LG.phase = 'play'; LG.t0 = Date.now();
  if (LG.g.dur) LG.tEnd = performance.now() + LG.g.dur * 1000;
  LG.last = performance.now(); LG.raf = requestAnimationFrame(lgTick);
  lgNext();
}
function lgTick(now) {
  if (!LG) return; const dt = Math.min(0.05, (now - LG.last) / 1000); LG.last = now;
  if (LG.phase === 'play' && !LG.paused) {
    if (LG.g.dur) {
      if (LG.hold) LG.tEnd += dt * 1000;
      const left = Math.max(0, LG.tEnd - now); const bar = $('#lgbar'); if (bar) bar.style.width = (left / (LG.g.dur * 1000) * 100) + '%';
      const sec = $('#lgsec'); if (sec) { const s = Math.ceil(left / 1000); if (sec._s !== s) { sec._s = s; sec.textContent = s + 's'; sec.classList.toggle('low', s <= 10); if (s <= 5 && s > 0) lgBeep(880, 0.05, 'square', 0.025); } }
      if (left <= 0) { lgEnd(); return; }
    } else { const bar = $('#lgbar'); if (bar) bar.style.width = (Math.min(LG.n, LG.g.n) / LG.g.n * 100) + '%'; }
    if (LG.k === 'hujan') lgRainStep(dt);
  }
  LG.raf = requestAnimationFrame(lgTick);
}
function lgPause(on) {
  if (!LG || !['play', 'pause'].includes(LG.phase)) return;
  if (on && LG.phase === 'play') { LG.phase = 'pause'; LG.paused = true; LG.pauseAt = performance.now(); TTS.stop();
    $('#lgov').innerHTML = `<div class="lg-cd"><div class="lg-cdc">${mascot('sleepy', 100)}<h2>${t('Jeda')}</h2><p>${t('Ambil napas. Game menunggu kamu.')}</p><div class="lg-acts"><button class="btn pri big" data-lg="resume">${ICON('play')} ${t('Lanjut')}</button><button class="btn sec" data-lg="quit">${t('Akhiri ronde')}</button></div></div></div>`; $('#lgov').classList.add('on'); }
  else if (!on && LG.phase === 'pause') { LG.phase = 'play'; LG.paused = false; if (LG.tEnd) LG.tEnd += performance.now() - LG.pauseAt; LG.last = performance.now(); $('#lgov').classList.remove('on'); $('#lgov').innerHTML = ''; }
}

/* ---------- maskot ---------- */
const LG_OK_LINES = ['好棒！ Mantap!', '對了！ Benar!', '太厲害了！', 'Telingamu tajam!', '沒錯！', 'Pas sekali!'];
const LG_BAD_LINES = ['沒關係～ Dengar lagi ya', 'Hampir! Coba bandingkan bunyinya', 'Pelan-pelan saja, pasti bisa', '再聽一次！'];
function lgMood(expr, line) {
  const box = $('#lgmas'); if (!box) return; const sv = box.querySelector('svg.mascot'); const size = sv ? +sv.getAttribute('width') || 64 : 64;
  if (sv) sv.outerHTML = mascot(expr, size); box.classList.remove('hop', 'shake'); void box.offsetWidth; box.classList.add(expr === 'oops' ? 'shake' : 'hop');
  const b = $('#lgbub'); if (b && line) { b.innerHTML = esc(t(line)); b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); clearTimeout(b._t); b._t = setTimeout(() => b.classList.remove('pop'), 1800); }
}
function lgMasHTML(size = 64) { return `<div class="lg-mas" id="lgmas">${mascot('happy', size)}</div><div class="lg-bub" id="lgbub"></div>`; }
function lgFloat(txt, el, bad) {
  const st = $('#lgst'); if (!st) return; const f = document.createElement('div'); f.className = 'lg-float' + (bad ? ' bad' : ''); f.textContent = txt;
  const r = el && el.getBoundingClientRect ? el.getBoundingClientRect() : null; const sr = st.getBoundingClientRect();
  f.style.left = (r ? r.left - sr.left + r.width / 2 : sr.width / 2) + 'px'; f.style.top = (r ? r.top - sr.top : sr.height / 3) + 'px';
  st.appendChild(f); setTimeout(() => f.remove(), 900);
}

/* ---------- inti penilaian ---------- */
function lgPickW(min = 1, max = 9) {
  const pool = LG.focus && LG.focus.length ? LG.focus : LG.words; const X = lgIdx(); const s = lgS();
  const len = i => X.syl[i].length;
  let c = pool.filter(i => len(i) >= min && len(i) <= max && !LG.recent.includes(i));
  if (!c.length) c = pool.filter(i => !LG.recent.includes(i)); if (!c.length) c = pool.slice();
  const wt = i => 1 + ((s.miss[W[i].w] || {}).m || 0) * 2;
  let tot = 0; c.forEach(i => (tot += wt(i))); let r = Math.random() * tot; let pick0 = c[0];
  for (const i of c) { r -= wt(i); if (r <= 0) { pick0 = i; break; } }
  LG.recent.push(pick0); if (LG.recent.length > Math.min(8, Math.floor(pool.length / 2))) LG.recent.shift();
  return pick0;
}
function lgPickS(maxH) {
  let c = LG.sents.filter(s => s.h.length <= maxH && !LG.recent.includes(s.h)); if (!c.length) c = LG.sents.filter(s => s.h.length <= maxH + 6); if (!c.length) c = LG.sents.slice(); if (!c.length) return null;
  const s = pick(c); LG.recent.push(s.h); if (LG.recent.length > Math.min(8, Math.floor(LG.sents.length / 2))) LG.recent.shift(); return s;
}
function lgAnswer(ok, frac, item, el) {
  if (!LG) return 0; frac = ok ? 1 : clamp(frac || 0, 0, 0.99);
  const ms = performance.now() - (LG.qT || performance.now()); const lim = { susun: 14000, dikte: 9000, ucap: 15000 }[LG.k] || 5000;
  const fast = clamp(1 - ms / lim, 0, 1); LG.ans++; LG.frac += frac;
  const d = dayRec(); const G0 = LG.g; let pts = 0;
  if (ok) {
    LG.combo++; LG.maxC = Math.max(LG.maxC, LG.combo); LG.hits++; d.ok++;
    pts = Math.round((100 + 60 * fast) * (1 + Math.min(LG.combo - 1, 10) * 0.1)); LG.score += pts;
    if (item && item.i !== undefined) lgHitRec(item.i);
    if (G0.ty === 'listen' || LG.k === 'susun' || LG.k === 'dikte') d.listen = (d.listen || 0) + 1;
    if (LG.k === 'nada') d.tone = (d.tone || 0) + 1; if (LG.k === 'dikte') d.type = (d.type || 0) + 1; if (LG.k === 'susun') d.sent = (d.sent || 0) + 1;
    d.combo = Math.max(d.combo || 0, LG.combo);
    LG.up++; LG.down = 0; if (LG.up >= 3 && LG.lv < 4) { LG.lv++; LG.up = 0; lgLevelPop(true); }
    FX.play('ok', Math.min(LG.combo, 8));
    if (LG.combo > 0 && LG.combo % 5 === 0) { setTimeout(() => FX.play('combo', LG ? LG.combo : 5), 160); lgMood('wow', `${LG.combo} combo! 連擊！`); lgComboPop(); }
    else lgMood('joy', pick(LG_OK_LINES));
    lgFloat('+' + pts, el);
  } else {
    LG.combo = 0; d.bad++; LG.up = 0; LG.down++;
    if (frac > 0) { pts = Math.round(100 * frac); LG.score += pts; lgFloat('+' + pts, el); }
    if (LG.down >= 2 && LG.lv > 0) { LG.lv--; LG.down = 0; lgLevelPop(false); }
    if (item) { if (item.i !== undefined) lgMissRec(item.i); if (!LG.missed.some(x => x.zh === item.zh)) LG.missed.push({ i: item.i, zh: item.zh, py: item.sy ? item.sy.map(s => s.y).join(' ') : '', tr: item.tr || '' }); }
    if (LG.g.lives) LG.lives = Math.max(0, LG.lives - 1);
    FX.play('bad'); lgMood('oops', pick(LG_BAD_LINES));
    const st = $('#lgst'); if (st && !matchMedia('(prefers-reduced-motion: reduce)').matches) { st.classList.remove('lg-shk'); void st.offsetWidth; st.classList.add('lg-shk'); }
  }
  if (G0.ty && typeof recAnswer === 'function') try { recAnswer(G0.ty, ok, ms); } catch (e) {}
  lgHud(); return pts;
}
function lgLevelPop(up) { const ld = $('#lglvl'); if (ld) { ld.classList.remove('pop'); void ld.offsetWidth; ld.classList.add('pop'); } if (up) lgBeep(1320, 0.12, 'triangle', 0.05); }
function lgComboPop() { const st = $('#lgst'); if (!st) return; const c = document.createElement('div'); c.className = 'lg-cpop'; c.innerHTML = `${ICON('flame')} ${LG.combo} COMBO`; st.appendChild(c); setTimeout(() => c.remove(), 1100); }
/* lanjut ke soal berikutnya */
function lgNext() {
  if (!LG || LG.phase !== 'play') return;
  clearTimeout(LG.nx); LG.hold = 0;
  if (LG.g.n && LG.n >= LG.g.n) { lgEnd(); return; }
  if (LG.g.lives && LG.lives <= 0) { lgEnd(); return; }
  LG.qT = performance.now();
  ({ tangkap: lgQTangkap, nada: lgQNada, dikte: lgQDikte, susun: lgQSusun, ucap: lgQUcap, hujan: lgQHujan })[LG.k]();
  lgHud();
}
function lgAfter(ok, ms) { LG.n++; if (ok) { LG.nx = setTimeout(lgNext, ms || 750); } else LG.hold = 1; }
function lgFB(ok, html, frac) {
  const fb = $('#lgfb'); if (!fb) return;
  const part = !ok && frac >= 0.5; fb.className = 'lg-fb on ' + (ok ? 'ok' : part ? 'part' : 'bad');
  fb.innerHTML = `<div class="lg-fbh">${ICON(ok ? 'check' : part ? 'target' : 'close')}<b>${ok ? t('Benar!') : part ? t('Hampir!') : t('Belum tepat')}</b></div><div class="lg-fbb">${html || ''}</div>${ok ? '' : `<button class="btn pri lg-nx" data-lg="next">${t('Lanjut')} ${ICON('chevron')}</button>`}`;
  if (!ok) { const b = fb.querySelector('.lg-nx'); if (b) setTimeout(() => { try { b.focus({ preventScroll: true }); } catch (e) {} }, 60); }
}
function lgPromptHTML(extra = '', label) {
  return `<div class="lg-prompt">${lgMasHTML(64)}
    <div class="lg-spk"><button class="speak huge lg-play" data-lg="play" aria-label="${t('Putar')}">${ICON('speaker')}</button>
      <button class="speak lg-pill lg-slowb" data-lg="slow" aria-label="${t('Putar pelan')}">${ICON('slow')}<span>0.6×</span></button></div>
    <div class="lg-ph">${label || (voiceOK() ? t('Dengarkan baik-baik') : t('Suara belum tersedia — baca pinyin di bawah'))}</div>${extra}</div>`;
}
function lgAutoSay(txt) { if (LG.auto || LG.k === 'hujan') { const run = LG.run; setTimeout(() => { if (LG && LG.run === run && LG.phase === 'play') lgSay(txt); }, 260); } }
const lgNoVoice = sy => (voiceOK() ? '' : `<div class="lg-novo">${lgPyHTML(sy)}</div>`);
