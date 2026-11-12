/* ========== V0.9 method.js — Metode belajar Khatam Band A (時代華語 1) ==========
   Lapisan di atas khatam.js:
   - Bagian mikro (5–8 menit) per langkah + "Rencana hari ini" (1+ bagian baru + ulang campur), intensitas Santai/Normal/Ngebut
   - Ulang buku: successive relearning 1·3·7·14·30 hari, soal diselang-seling antar lesson (interleaving)
   - Tes lompat (pre-test): lulus ≥ 85% = langkah boleh dilewati
   - Dialog: dukungan bertahap (audio → pinyin → hanzi → arti), mode bayangan (shadowing) + rekam & bandingkan
   - Grammar: pola → 2 contoh → susun kalimat sendiri → isi → "kenapa" (self-explanation)
   - Bicara dengan pola jawaban + nilai diri; dek "Kesalahan saya" diulang di akhir sesi & besok
   Data baru di S.kb: rv (jadwal ulang), pt (skor bagian), pl (log harian), mis (dek kesalahan), dsup (level bantuan dialog), shd (shadowing). */

Object.assign(I18N, {
  'Rencana hari ini': ['Today\'s plan', 'Plano ngayon'],
  'Ulang buku': ['Book review', 'Repaso ng libro'],
  'Kesalahan saya': ['My mistakes', 'Mga mali ko'],
  'Tes lompat': ['Skip test', 'Skip test'],
  'Kenapa ini efektif?': ['Why does this work?', 'Bakit ito epektibo?'],
  'Bagian': ['Part', 'Bahagi'],
  'Rekam': ['Record', 'I-record'],
  'Suaraku': ['My voice', 'Boses ko'],
  'Bandingkan': ['Compare', 'Ihambing'],
  'Lancar': ['Fluent', 'Maayos'],
  'Hampir': ['Almost', 'Halos'],
  'Belum bisa': ['Not yet', 'Hindi pa'],
  'Dengar': ['Listen', 'Makinig'],
  'Bayangan': ['Shadowing', 'Shadowing'],
  'Main peran': ['Role play', 'Role play'],
  'Pelan': ['Slow', 'Mabagal'],
  'Paham': ['Got it', 'Naintindihan'],
  'Masih bingung': ['Still unsure', 'Nalilito pa'],
  'Lihat penjelasan': ['Show explanation', 'Ipakita ang paliwanag']
});

const MT_IV = [1, 3, 7, 14, 30];
const MT_RVK = ['voc', 'dlg', 'gram', 'read'];
const MT_PRE = 85;
const MT_VOC_N = 12;
KB_META.voc.sub = 'Kata lesson dalam bagian kecil (±12 kata): kenali, lalu langsung diuji arti, suara & hanzi';
Object.assign(KB_PACE.santai, { n: 1, mix: 8, sub: '1 bagian baru + ulang campur · ±12 menit', min: 12 });
Object.assign(KB_PACE.normal, { n: 2, mix: 12, sub: '2 bagian baru + ulang campur · ±22 menit', min: 22 });
Object.assign(KB_PACE.ngebut, { n: 4, mix: 18, sub: '4 bagian baru + ulang campur · ±40 menit', min: 40 });

/* ---------- "kenapa ini efektif" — ringkasan riset ---------- */
const MT_WHY = {
  retrieval: ['Mengingat sendiri (bukan membaca ulang) membuat ingatan jauh lebih awet. Makanya tiap bagian penuh soal, bukan cuma daftar kata.', 'Retrieval practice — Roediger & Karpicke 2006'],
  spacing: ['Isi lesson muncul lagi setelah 1, 3, 7, 14 hari. Diulang tepat saat mulai lupa = ingatan jangka panjang.', 'Successive relearning — Rawson & Dunlosky 2011; Cepeda dkk. 2006'],
  interleave: ['Soal dari beberapa lesson dicampur, jadi kamu belajar memilih pola yang tepat, bukan sekadar mengulang satu pola.', 'Interleaving — Rohrer & Taylor 2007'],
  pretest: ['Mencoba menjawab sebelum belajar membuat otak "siap menerima" jawabannya — meski salah. Kalau sudah lulus, lewati saja.', 'Pretesting — Richland, Kornell & Kao 2009; mastery learning — Bloom 1968'],
  input: ['Dengar dulu tanpa teks, baru tambah bantuan kalau perlu. Masukan yang hampir dipahami adalah bahan bakar utama pemerolehan bahasa.', 'Comprehensible input — Krashen 1982'],
  shadow: ['Menirukan kalimat penutur segera setelah mendengarnya melatih nada, ritme dan kecepatan memahami.', 'Shadowing — Hamada 2016; Kadota 2019'],
  worked: ['Melihat 2 contoh lengkap dulu lebih efektif untuk pemula daripada langsung menebak.', 'Worked examples — Sweller & Cooper 1985'],
  generate: ['Menyusun kalimat sendiri lebih nempel daripada membaca kalimat jadi.', 'Generation effect — Slamecka & Graf 1978'],
  explain: ['Menjelaskan "kenapa" dengan kata-katamu sendiri memperdalam pemahaman pola.', 'Self-explanation — Chi dkk. 1989'],
  dual: ['Kata + gambar disimpan di dua jalur ingatan, jadi lebih mudah dipanggil.', 'Dual coding — Paivio 1971'],
  output: ['Berbicara memaksa kamu menyadari celah bahasa yang belum dikuasai. Pakai pola, rekam, nilai dirimu.', 'Output hypothesis — Swain 1985'],
  micro: ['Sesi pendek 5–8 menit tiap hari lebih efektif daripada satu sesi panjang seminggu sekali.', 'Distributed practice — Cepeda dkk. 2006; Dunlosky dkk. 2013'],
  errors: ['Salah itu bagus kalau segera dikoreksi — kesalahan diulang di akhir sesi dan besoknya.', 'Hypercorrection — Butterfield & Metcalfe 2001'],
  mastery: ['Lanjut setelah benar-benar menguasai (≥ 80%) membuat lesson berikutnya jauh lebih ringan.', 'Mastery learning — Bloom 1968']
};
function mtWhy(keys, cls = '') {
  const ks = [].concat(keys).filter(k => MT_WHY[k]); if (!ks.length) return '';
  return `<details class="mt-why ${cls}"><summary>${ICON('lightbulb')} <span>${t('Kenapa ini efektif?')}</span>${ICON('chevron')}</summary>${ks.map(k => `<p>${esc(t(MT_WHY[k][0]))}<cite>${esc(MT_WHY[k][1])}</cite></p>`).join('')}</details>`;
}

/* ---------- state + migrasi ---------- */
const kbSMT = kbS;
kbS = function () {
  const k = kbSMT();
  ['rv', 'pt', 'pl', 'dsup', 'shd'].forEach(x => { if (!k[x] || typeof k[x] !== 'object' || Array.isArray(k[x])) k[x] = {}; });
  if (!Array.isArray(k.mis)) k.mis = [];
  if (!k.v3) { /* langkah yang sudah lulus sebelum V0.9 → masuk jadwal ulang mulai besok */
    k.v3 = 1; const tm = keyAdd(todayKey(), 1);
    Object.entries(k.st).forEach(([key, sc]) => { const [n, st] = key.split('-'); if (MT_RVK.includes(st) && KB_META[st] && sc >= KB_META[st].pass && !k.rv[key] && KL(+n)) k.rv[key] = { s: 0, due: tm }; });
  }
  return k;
};
function mtDay() { const S0 = kbS(); const d = todayKey(); if (!S0.pl[d] || typeof S0.pl[d] !== 'object') S0.pl[d] = { c: 0, r: 0, m: 0 }; return S0.pl[d]; }
const mtDayGet = () => kbS().pl[todayKey()] || { c: 0, r: 0, m: 0 };
function mtSched(n, k) { const S0 = kbS(); const key = n + '-' + k; if (!MT_RVK.includes(k) || S0.rv[key]) return; S0.rv[key] = { s: 0, due: keyAdd(todayKey(), 1) }; save(); }
const kbMarkMT = kbMark;
kbMark = function (n, k, score) { const r = kbMarkMT(n, k, score); if (r.now) mtSched(n, k); return r; };

/* ---------- bagian mikro ---------- */
const mtPK = (n, k, p) => n + '-' + k + '-' + p;
const mtPassOf = k => (KB_META[k] || {}).pass || 70;
function mtGramGroups(n) {
  const G = KL(n).grammar; if (!G.length) return [];
  const np = Math.ceil(G.length / 3); const sz = Math.ceil(G.length / np); const out = [];
  for (let j = 0; j < G.length; j += sz) out.push(G.slice(j, j + sz).map((_, x) => j + x));
  return out;
}
function mtParts(n, k) {
  if (k === 'voc') {
    const all = kbAllWords(n); const out = [];
    for (let j = 0; j < all.length; j += MT_VOC_N) { const ids = all.slice(j, j + MT_VOC_N); out.push({ id: 'v' + j / MT_VOC_N, ids, ti: t('Kata {a}–{b}', { a: j + 1, b: j + ids.length }), min: 6 }); }
    return out.length ? out : [{ id: 'v0', ids: [], ti: t('Kosakata'), min: 3 }];
  }
  if (k === 'dlg') return kbBook(n).dialogs.map(D => ({ id: D.k, ti: D.label, min: 7, hz: 1 }));
  if (k === 'gram') return mtGramGroups(n).map((gis, j) => ({ id: 'g' + j, gis, idx: j, ti: gis.map(gi => { const g = KL(n).grammar[gi]; return (g.src === 'd2' ? '二' : g.src === 'd1' ? '一' : '') + (g.no || gi + 1); }).join(' · '), hz: 1, min: Math.min(8, 2 + gis.length * 2) }));
  if (k === 'read') return [{ id: 'rd', ti: t('Bacaan & bicara'), min: 8 }];
  return [{ id: 'all', ti: t(KB_META[k].ti), min: KB_META[k].min }];
}
function mtPartDone(n, k, p) {
  if (kbStageDone(n, k)) return true; if (p === 'all') return false;
  const s = kbS().pt[mtPK(n, k, p)]; return s !== undefined && s >= mtPassOf(k);
}
function mtStageParts(n, k) { const P = mtParts(n, k); return { P, done: P.filter(p => mtPartDone(n, k, p.id)).length }; }
function mtNextPart(n) {
  for (const k of kbStages(n)) { if (kbStageDone(n, k)) continue; const P = mtParts(n, k); const i = Math.max(0, P.findIndex(p => !mtPartDone(n, k, p.id))); const p = P[i]; return { n, k, p: p.id, ti: p.ti, min: p.min, hz: p.hz, i, of: P.length }; }
  return null;
}
function mtPath(cnt) {
  const out = [];
  for (const L of kbLessons()) {
    if (kbLessonDone(L.n)) continue;
    for (const k of kbStages(L.n)) {
      if (kbStageDone(L.n, k)) continue;
      const P = mtParts(L.n, k);
      P.forEach((p, i) => { if (!mtPartDone(L.n, k, p.id)) out.push({ n: L.n, k, p: p.id, ti: p.ti, min: p.min, hz: p.hz, i, of: P.length }); });
      if (out.length >= cnt) return out.slice(0, cnt);
    }
  }
  return out.slice(0, cnt);
}
function mtTotals() {
  let tot = 0, done = 0;
  kbLessons().forEach(L => kbStages(L.n).forEach(k => { const P = mtParts(L.n, k); tot += P.length; done += P.filter(p => mtPartDone(L.n, k, p.id)).length; }));
  return { tot, done };
}
kbEta = function () {
  const T = mtTotals(); const left = T.tot - T.done; const per = KB_PACE[kbS().pace].n;
  const days = Math.ceil(left / per); return { left, days, date: keyAdd(todayKey(), Math.max(0, days - 1)) };
};

/* ---------- kata lemah (pakai status Progress kalau ada) ---------- */
function mtWeakScore(i) {
  let s = 0; const c = S.cards[i];
  if (typeof wordStatus === 'function') { try { const st = wordStatus(i); if (typeof st === 'number') { if (st === -1) s -= 5; else if (st <= 1) s += 3; else if (st === 2) s += 1; else s -= 2; } else { const x = String(st || ''); if (/lemah|weak|lupa|baru|new|belajar/i.test(x)) s += 3; else if (/hafal|paham|master|known/i.test(x)) s -= 2; } } catch (e) {} }
  if (c) { s += Math.min(3, c.lp || 0) * 1.5; if ((c.iv || 0) < 3) s += 1; if (c.due && c.due <= Date.now()) s += 1; } else s += 2;
  if (kbS().mis.some(m => m.r.t === 'w' && W[i] && m.r.w === W[i].w)) s += 2;
  return s + Math.random() * 0.8;
}
const mtWeakFirst = ids => ids.map(i => [i, mtWeakScore(i)]).sort((a, b) => b[1] - a[1]).map(x => x[0]);
function mtGramStatus(n, gis) { /* Progress agent: gid 'L<n>:<k>' (k unik per lesson), status 2 = Paham */
  if (typeof setGramStatus !== 'function') return;
  const L = KL(n); const seen = {}; const ids = L.grammar.map((g, gi) => { let k = g.k || String(gi); if (seen[k]) k += '_' + gi; seen[k] = 1; return 'L' + n + ':' + k; });
  gis.forEach(gi => { const id = ids[gi]; if (!id) return; try { const cur0 = typeof gramStatus === 'function' ? +gramStatus(id) || 0 : 0; if (cur0 < 2) setGramStatus(id, 2); } catch (e) { console.warn('setGramStatus', e); } });
}

/* ---------- referensi soal (untuk dek kesalahan & jadwal ulang) ---------- */
const mcqItemMT = mcqItem; mcqItem = function (n, m) { const it = mcqItemMT(n, m); const i = KL(n) ? KL(n).mcq.indexOf(m) : -1; if (it && i >= 0) it.mr = { t: 'q', n, i }; return it; };
const reorderItemMT = reorderItem; reorderItem = function (n, r) { const it = reorderItemMT(n, r); const i = KL(n) ? KL(n).reorder.indexOf(r) : -1; if (it && i >= 0) it.mr = { t: 'o', n, i }; return it; };
const pairItemMT = pairItem; pairItem = function (n, p, all) { const it = pairItemMT(n, p, all); const i = KL(n) ? KL(n).pairs.indexOf(p) : -1; if (it && i >= 0) it.mr = { t: 'p', n, i }; return it; };
const tfItemMT = tfItem; tfItem = function (n, pas, x) { const it = tfItemMT(n, pas, x); const L = KL(n); if (it && L) L.tf.forEach((f, j) => { const i = f.items.indexOf(x); if (i >= 0) it.mr = { t: 'f', n, j, i }; }); return it; };
function mtLineRef(n, line) { for (const D of kbBook(n).dialogs) { const li = D.lines.filter(x => x.sp).indexOf(line); if (li >= 0) return { dk: D.k, li }; } return null; }
const kbClozeMT = kbCloze; kbCloze = function (n, line, pool) { const it = kbClozeMT(n, line, pool); const r = mtLineRef(n, line); if (it && r) it.mr = { t: 'c', n, dk: r.dk, li: r.li }; return it; };
const kbNextItemMT = kbNextItem; kbNextItem = function (n, lines, i) { const it = kbNextItemMT(n, lines, i); const r = mtLineRef(n, lines[i]); if (it && r) it.mr = { t: 'x2', n, dk: r.dk, li: r.li }; return it; };
const kbExItemsMT = kbExItems; kbExItems = function (n, gi) { const ex = (KL(n).grammar[gi] || {}).exercise; return kbExItemsMT(n, gi).map(it => Object.assign(it, { mr: { t: 'x', n, gi, i: ex.items.indexOf(it.x) } })); };
const mtKey = r => Object.keys(r).sort().map(k => k + '=' + r[k]).join('|');
const mtRefOf = it => it ? (it.mr || (it.wid !== undefined && W[it.wid] ? { t: 'w', w: W[it.wid].w } : null)) : null;
let MT_WMAP = null;
function mtWid(form) { if (!MT_WMAP) { MT_WMAP = new Map(); W.forEach((w, i) => { if (w && !MT_WMAP.has(w.w)) MT_WMAP.set(w.w, i); }); } return MT_WMAP.get(form); }
function mtItem(r) {
  try {
    if (!r) return null;
    if (r.t === 'w') { const i = mtWid(r.w); return i === undefined ? null : wItem(i, pick(['mc_mean', 'mc_hanzi', voiceOK() ? 'listen' : 'mc_mean'])); }
    const L = KL(r.n); if (!L) return null; let it = null;
    if (r.t === 'q' && L.mcq[r.i]) it = mcqItem(r.n, L.mcq[r.i]);
    else if (r.t === 'o' && L.reorder[r.i]) it = reorderItem(r.n, L.reorder[r.i]);
    else if (r.t === 'p' && L.pairs[r.i]) it = pairItem(r.n, L.pairs[r.i], L.pairs);
    else if (r.t === 'f' && L.tf[r.j] && L.tf[r.j].items[r.i]) it = tfItem(r.n, null, L.tf[r.j].items[r.i]);
    else if (r.t === 'x') it = kbExItems(r.n, r.gi).find(x => x.mr.i === r.i) || null;
    else if (r.t === 'c' || r.t === 'x2') { const D = kbDlg(r.n, r.dk); const lines = D ? D.lines.filter(x => x.sp) : []; if (lines[r.li]) it = r.t === 'c' ? kbCloze(r.n, lines[r.li], [...new Set(L.vocab.map(v => v.hz))]) : kbNextItem(r.n, lines, r.li); }
    else if (r.t === 'g') it = mtGramBuild(r.n, r.gi);
    else if (r.t === 's') it = mtSpeakItem(r.n, r.i);
    if (it) it.mr = r; return it;
  } catch (e) { console.warn('mtItem', e); return null; }
}
function mtMisAdd(r) {
  const S0 = kbS(); const k = mtKey(r); const d = todayKey(); const e = S0.mis.find(x => x.k === k);
  if (e) { e.d = d; e.c = 0; } else { S0.mis.unshift({ k, r, d, c: 0 }); if (S0.mis.length > 60) S0.mis.length = 60; }
}
function mtMisOk(r) {
  const S0 = kbS(); const k = mtKey(r); const j = S0.mis.findIndex(x => x.k === k); if (j < 0) return;
  if (S0.mis[j].d < todayKey()) S0.mis.splice(j, 1); else S0.mis[j].c = 1;
}
const mtMisOld = () => kbS().mis.filter(x => x.d < todayKey());

/* ---------- jawaban: catat kesalahan & hasil ulang ---------- */
const mtTracked = o => !!(o && (o.kb || o.kbpart || o.kbmix || o.kbpre || o.kbmis || o.kbu !== undefined));
const answerMT = answer;
answer = function (ok, note) {
  const it = SES && !SES.answered ? cur() : null; const o = SES && SES.opts;
  const r = answerMT(ok, note);
  try {
    if (it && SES && mtTracked(o) && SES.answered) {
      if (it.misRe || it.nocount) { if (ok) SES.ok = Math.max(0, SES.ok - 1); else SES.bad = Math.max(0, SES.bad - 1); }
      const ref = mtRefOf(it);
      if (ref) {
        if (!ok) { mtMisAdd(ref); if (!it.again && !it.misRe) { SES.mtMis = SES.mtMis || []; const k = mtKey(ref); if (!SES.mtMis.some(x => mtKey(x) === k)) SES.mtMis.push(ref); } }
        else mtMisOk(ref);
      }
      if (it.rvk && !it.again && !it.misRe) { SES.mtRv = SES.mtRv || {}; const v = SES.mtRv[it.rvk] = SES.mtRv[it.rvk] || { ok: 0, bad: 0 }; v[ok ? 'ok' : 'bad']++; }
      save();
    }
  } catch (e) { console.warn('mt answer', e); }
  return r;
};
/* akhir sesi: ulangi kesalahan sekali lagi sebelum ringkasan */
const nextItemMT = nextItem;
nextItem = function () {
  try {
    const o = SES && SES.opts;
    if (SES && !SES.summarized && SES.answered && SES.i + 1 >= SES.items.length && mtTracked(o) && !o.kbpre && o.kb !== 'test' && o.kbu === undefined && !SES.misDone && (SES.mtMis || []).length) {
      SES.misDone = 1;
      const its = SES.mtMis.slice(0, 8).map(r => mtItem(r)).filter(Boolean).map(x => Object.assign(x, { misRe: 1, again: 1, noRetry: 1 }));
      its.forEach(x => { if (x.wid !== undefined) SES.rq[x.wid] = 2; });
      if (its.length) SES.items.push({ lx: 1, type: 'mtmis', cnt: its.length }, ...its);
    }
  } catch (e) { console.warn('mt next', e); }
  return nextItemMT();
};

/* ---------- pembangun sesi per bagian ---------- */
const MT_GA = {};
function mtGramAssign(n) {
  if (MT_GA[n]) return MT_GA[n];
  const L = KL(n); const toks = L.grammar.map(g => (String(g.form || '').match(/[㐀-鿿]+/g) || []).sort((a, b) => b.length - a.length));
  const A = { mcq: L.grammar.map(() => []), ro: L.grammar.map(() => []), restQ: [], restR: [] };
  const best = txt => { let bi = -1, bl = 0; toks.forEach((ts, gi) => ts.forEach(tk => { if (txt.includes(tk) && tk.length > bl) { bl = tk.length; bi = gi; } })); return bi; };
  L.mcq.forEach((m, i) => { const gi = best(String(m.opts[m.a] || '')); (gi >= 0 ? A.mcq[gi] : A.restQ).push(i); });
  L.reorder.forEach((r, i) => { const gi = best(r.chunks.join('')); (gi >= 0 ? A.ro[gi] : A.restR).push(i); });
  return (MT_GA[n] = A);
}
function mtSplitAB(s) {
  s = String(s || ''); const m = s.split(/\s*B\s*[：:]\s*/);
  if (m.length > 1) return { a: m[0].replace(/^\s*A\s*[：:]\s*/, '').trim(), b: m.slice(1).join(' ').trim() };
  return { a: '', b: s.replace(/^\s*[A-Z]\s*[：:]\s*/, '').trim() };
}
const mtNoPar = s => String(s || '').replace(/（[^）]*）|\([^)]*\)/g, '').replace(/\s{2,}/g, ' ').trim();
function mtSeg(s) {
  const m = vcIndex(); const out = [];
  for (let i = 0; i < s.length;) {
    const c = s[i];
    if (!/[㐀-鿿]/.test(c)) { if (/[，。？！、：；,.?!」』]/.test(c) && out.length) out[out.length - 1] += c; else if (c.trim()) { if (out.length && /^[0-9A-Za-z]+$/.test(out[out.length - 1]) && /[0-9A-Za-z]/.test(c)) out[out.length - 1] += c; else out.push(c); } i++; continue; }
    let L = Math.min(4, s.length - i); for (; L > 1; L--) if (m.has(s.substr(i, L))) break;
    out.push(s.substr(i, L)); i += L;
  }
  while (out.length > 6) { let bi = 0, bl = 1e9; for (let j = 0; j < out.length - 1; j++) { const l = out[j].length + out[j + 1].length; if (l < bl) { bl = l; bi = j; } } out.splice(bi, 2, out[bi] + out[bi + 1]); }
  return out;
}
function mtGramBuild(n, gi) {
  const g = KL(n).grammar[gi]; if (!g || !g.ex || !g.ex.length) return null;
  const order = [2, 1, 0].filter(j => g.ex[j]);
  for (const j of order) {
    const e = g.ex[j]; const zh = mtSplitAB(e.zh); const b = mtNoPar(zh.b); if (!b || b.length > 26) continue;
    const ch = mtSeg(b); if (ch.length < 3) continue;
    const tr = o => mtSplitAB(o).b || o || '';
    return { type: 'build', kn: n, mr: { t: 'g', n, gi }, mtctx: zh.a ? mtNoPar(zh.a) : '', mtform: g.form, sent: { chunks: ch.map(h => ({ hz: h, py: '' })), zh: ch.join(''), py: mtNoPar(tr(e.py)), tr: [tr(e.id), tr(e.en), tr(e.en), tr(e.vi || e.en)] } };
  }
  return null;
}
function mtSpeakItem(n, i) { const q = KL(n).speak[i]; if (!q) return null; return { lx: 1, type: 'mtsp', n, i, opts: [], a: -1, mr: { t: 's', n, i } }; }
function mtBuild(n, k, part) {
  const L = KL(n); const B = kbBook(n); const out = [];
  if (k === 'voc') {
    const ids = part.ids; const fresh = ids.filter(i => !S.cards[i]);
    for (let j = 0; j < fresh.length; j += 4) { const ch = fresh.slice(j, j + 4); ch.forEach(i => out.push({ type: 'intro', wid: i })); shuffle(ch).forEach(i => out.push(wItem(i, 'mc_mean'))); }
    mtWeakFirst(ids).slice(0, fresh.length ? 10 : 12).forEach((i, j) => out.push(wItem(i, ['listen', 'mc_hanzi', 'tone', 'mc_mean'][j % 4])));
    return out.filter(Boolean);
  }
  if (k === 'dlg') {
    const D = kbDlg(n, part.id) || B.dialogs[0]; const pool = [...new Set(L.vocab.map(v => v.hz))];
    const lines = D.lines.filter(x => x.sp); const sps = [...new Set(lines.map(x => x.sp))];
    out.push({ lx: 1, type: 'kbd', n, k: D.k });
    shuffle(lines.map((_, i) => i)).slice(0, 3).forEach(i => { const x = kbCloze(n, lines[i], pool); if (x) out.push(x); });
    shuffle(lines.map((_, i) => i).slice(0, lines.length - 1)).slice(0, 2).forEach(i => { const x = kbNextItem(n, lines, i); if (x) out.push(x); });
    if (sps.length >= 2) out.push(kbWhoItem(n, pick(lines), sps));
    const pi = B.dialogs.indexOf(D); shuffle(L.pairs.filter((_, j) => j % Math.max(1, B.dialogs.length) === Math.max(0, pi))).slice(0, 2).forEach(p => out.push(pairItem(n, p, L.pairs)));
    return out.filter(Boolean);
  }
  if (k === 'gram') {
    const A = mtGramAssign(n); const tail = []; const nP = mtGramGroups(n).length;
    part.gis.forEach(gi => {
      out.push({ lx: 1, type: 'mtg', n, gi });
      const bi = mtGramBuild(n, gi); if (bi) out.push(bi); else if (A.ro[gi][0] !== undefined) out.push(reorderItem(n, L.reorder[A.ro[gi][0]]));
      const fills = A.mcq[gi].slice(0, 1).map(i => mcqItem(n, L.mcq[i]));
      kbExItems(n, gi).slice(0, fills.length ? 1 : 2).forEach(x => fills.push(x));
      out.push(...fills);
      out.push({ lx: 1, type: 'mtwhy', n, gi });
      const ex = A.mcq[gi][1] !== undefined ? mcqItem(n, L.mcq[A.mcq[gi][1]]) : A.ro[gi][bi ? 0 : 1] !== undefined ? reorderItem(n, L.reorder[A.ro[gi][bi ? 0 : 1]]) : null;
      if (ex) tail.push(ex);
    });
    A.restQ.filter(i => i % nP === part.idx).slice(0, 2).forEach(i => tail.push(mcqItem(n, L.mcq[i])));
    A.restR.filter(i => i % nP === part.idx).slice(0, 1).forEach(i => tail.push(reorderItem(n, L.reorder[i])));
    return out.concat(shuffle(tail)).filter(Boolean);
  }
  if (k === 'read') {
    mtWeakFirst(kbWid(n, 'core')).slice(0, 4).forEach((i, j) => out.push(wItem(i, ['mc_mean', 'listen', 'mc_hanzi'][j % 3])));
    if (B.reading) out.push({ lx: 1, type: 'lread', kind: 'pas', n, pas: { zh: B.reading.zh, py: B.reading.py, id: B.reading.id, en: B.reading.en } });
    const tf = L.tf[0]; if (tf) shuffle(tf.items).slice(0, 6).forEach(x => out.push(tfItem(n, null, x)));
    shuffle(L.pairs).slice(0, 2).forEach(p => out.push(pairItem(n, p, L.pairs)));
    shuffle(L.speak.map((_, i) => i)).slice(0, 2).forEach(i => out.push(mtSpeakItem(n, i)));
    return out.filter(Boolean);
  }
  return kbBuild(n, k);
}
function mtRun(n, k, p) {
  if (!['voc', 'dlg', 'gram', 'read'].includes(k)) return kbRunMT(n, k);
  const P = mtParts(n, k); const part = P.find(x => x.id === p) || P.find(x => !mtPartDone(n, k, x.id)) || P[0];
  klState().last = n; KBV.n = n; save(); const M = KB_META[k];
  const b = () => { const items = mtBuild(n, k, part); const own = new Set(klWords(n)); shuffle(kbDue().filter(i => !own.has(i))).slice(0, 3).forEach(i => items.unshift({ type: 'recall', wid: i, dir: 'hz' })); return items; };
  startKls(b(), { n, kbpart: k, kbp: part.id, title: `${lnShort(n)} · ${M.zh} ${t(M.ti)}${P.length > 1 ? ' · ' + (P.indexOf(part) + 1) + '/' + P.length : ''}`, rebuild: b, cat: k === 'voc' ? 'kenal' : 'paham', retry: true, noCover: k === 'voc' ? 1 : 0 });
}
const kbRunMT = kbRun;
kbRun = function (n, k) { if (['voc', 'dlg', 'gram', 'read'].includes(k)) return mtRun(n, k); return kbRunMT(n, k); };

/* ---------- tes lompat ---------- */
function mtPreItems(n, k) {
  const L = KL(n); const B = kbBook(n); const out = []; const pool = [...new Set(L.vocab.map(v => v.hz))];
  if (k === 'voc') shuffle(klWords(n)).slice(0, 10).forEach((i, j) => out.push(wItem(i, ['mc_mean', 'mc_hanzi', voiceOK() ? 'listen' : 'mc_mean'][j % 3])));
  else if (k === 'dlg') { const lines = B.dialogs.flatMap(D => D.lines.filter(x => x.sp)); shuffle(lines).slice(0, 4).forEach(x => out.push(kbCloze(n, x, pool))); B.dialogs.forEach(D => { const ls = D.lines.filter(x => x.sp); out.push(kbNextItem(n, ls, Math.floor(Math.random() * Math.max(1, ls.length - 1)))); }); shuffle(L.pairs).slice(0, 3).forEach(p => out.push(pairItem(n, p, L.pairs))); }
  else if (k === 'gram') { shuffle(L.mcq).slice(0, 6).forEach(m => out.push(mcqItem(n, m))); shuffle(L.reorder).slice(0, 3).forEach(r => out.push(reorderItem(n, r))); }
  else if (k === 'read') { const tf = L.tf[0]; if (tf) shuffle(tf.items).slice(0, 6).forEach(x => out.push(tfItem(n, null, x))); shuffle(kbWid(n, 'core')).slice(0, 3).forEach(i => out.push(wItem(i, 'mc_mean'))); }
  else if (k === 'mix') return kbExam([n], { w: 3, m: 3, r: 2, p: 2, f: 0 });
  return out.filter(Boolean).map(x => Object.assign(x, { noRetry: 1 }));
}
function mtPre(n, k) {
  const M = KB_META[k]; const b = () => mtPreItems(n, k);
  startKls(b(), { n, kbpre: k, title: `${lnShort(n)} · ${t('Tes lompat')} · ${M.zh}`, rebuild: b, cat: 'latih', retry: false, noCover: 1 });
  if (SES) SES.items.forEach(it => { if (it.wid !== undefined) SES.rq[it.wid] = 2; });
}

/* ---------- ulang buku (campur antar lesson) & dek kesalahan ---------- */
function mtDueList() {
  const S0 = kbS(); const td = todayKey();
  return Object.entries(S0.rv).filter(([key, v]) => v && v.due <= td && KL(+key.split('-')[0])).map(([key, v]) => ({ key, n: +key.split('-')[0], k: key.split('-')[1], s: v.s, due: v.due })).sort((a, b) => (a.due < b.due ? -1 : a.due > b.due ? 1 : a.n - b.n));
}
function mtNextDue() { const v = Object.values(kbS().rv).map(x => x.due).sort(); return v[0] || null; }
function mtItemsFor(n, k, q) {
  const L = KL(n); const B = kbBook(n); let c = [];
  if (k === 'voc') { const own = klWords(n); const known = own.filter(i => S.cards[i]); mtWeakFirst(known.length >= q ? known : own).slice(0, q).forEach((i, j) => c.push(j % 3 === 2 ? { type: 'recall', wid: i, dir: j % 2 ? 'mean' : 'hz' } : wItem(i, ['listen', 'mc_hanzi', 'mc_mean', 'tone'][j % 4]))); }
  else if (k === 'dlg') { const pool = [...new Set(L.vocab.map(v => v.hz))]; B.dialogs.forEach(D => { const ls = D.lines.filter(x => x.sp); shuffle(ls).slice(0, 2).forEach(x => c.push(kbCloze(n, x, pool))); if (ls.length > 1) c.push(kbNextItem(n, ls, Math.floor(Math.random() * (ls.length - 1)))); }); shuffle(L.pairs).slice(0, 2).forEach(p => c.push(pairItem(n, p, L.pairs))); }
  else if (k === 'gram') { shuffle(L.mcq).slice(0, 3).forEach(m => c.push(mcqItem(n, m))); shuffle(L.reorder).slice(0, 2).forEach(r => c.push(reorderItem(n, r))); const gi = Math.floor(Math.random() * L.grammar.length); const bi = L.grammar.length && mtGramBuild(n, gi); if (bi) c.push(bi); }
  else if (k === 'read') { const tf = L.tf[0]; if (tf) shuffle(tf.items).slice(0, 3).forEach(x => c.push(tfItem(n, null, x))); if (L.speak.length) c.push(mtSpeakItem(n, Math.floor(Math.random() * L.speak.length))); }
  c = shuffle(c.filter(Boolean)).slice(0, q);
  return c.map(x => Object.assign(x, { rvk: n + '-' + k }));
}
function mtInterleave(lists) { const out = []; let any = true; for (let r = 0; any; r++) { any = false; lists.forEach(l => { if (l[r]) { out.push(l[r]); any = true; } }); } return out; }
function mtMixPlan(free) {
  const size = KB_PACE[kbS().pace].mix || 12; let due = mtDueList(); let isFree = false;
  if (!due.length || free) { isFree = true; const all = Object.entries(kbS().rv).map(([key, v]) => ({ key, n: +key.split('-')[0], k: key.split('-')[1], s: v.s })).filter(x => KL(x.n)); due = shuffle(all).sort((a, b) => a.s - b.s).slice(0, 3); }
  due = due.slice(0, Math.max(2, Math.floor(size / 2)));
  return { due, size, free: isFree };
}
function mtMixRun(free) {
  const P = mtMixPlan(free); if (!P.due.length) { toast(t('Belum ada bagian yang lulus — selesaikan satu bagian dulu, nanti muncul di sini.')); return; }
  const b = () => {
    const q = Math.max(2, Math.ceil(P.size / P.due.length));
    let items = mtInterleave(P.due.map(d => mtItemsFor(d.n, d.k, q))).slice(0, P.size);
    const old = mtMisOld().slice(0, 2).map(m => mtItem(m.r)).filter(Boolean); items = old.concat(items);
    return items;
  };
  startKls(b(), { ns: [...new Set(P.due.map(d => d.n))], n: P.due[0].n, kbmix: 1, rvKeys: P.free ? [] : P.due.map(d => d.key), title: `${t('Ulang buku')} · 複習`, rebuild: b, cat: 'hafal', retry: true, noCover: 1 });
}
function mtMisRun() {
  const S0 = kbS(); const ms = mtMisOld().concat(S0.mis.filter(x => x.d >= todayKey())).slice(0, 12);
  if (!ms.length) { toast(t('Dek kesalahan kosong — mantap!')); return; }
  const b = () => shuffle(ms.map(m => mtItem(m.r)).filter(Boolean));
  const ns = [...new Set(ms.map(m => m.r.n).filter(Boolean))];
  startKls(b(), { ns: ns.length ? ns : kbLessons().map(L => L.n), n: ns[0] || kbLessons()[0].n, kbmis: 1, title: `${t('Kesalahan saya')} · 錯題本`, rebuild: b, cat: 'hafal', retry: true, noCover: 1 });
}
const mtStageName = (n, k) => `${lnShort(n)} ${KB_META[k] ? KB_META[k].zh : k}`;

/* ---------- kartu khusus di dalam sesi ---------- */
function mtPicto(texts) {
  if (typeof pgCoverage !== 'function') return '';
  const cs = [...new Set(texts.join('').split('').filter(c => /[㐀-鿿]/.test(c)))].filter(c => pgCoverage(c) === 2).slice(0, 4);
  return cs.length ? `<div class="mt-picto" aria-hidden="true">${cs.map(c => `<span>${pgSVG(c, 34)}<b class="hz">${esc(c)}</b></span>`).join('')}</div>` : '';
}
function mtPattern(g) {
  return g.table && g.table.length ? `<div class="kb-tbw"><table class="kb-tb">${g.table.map((r, ri) => `<tr>${(Array.isArray(r) ? r : [r]).map(c => `<${ri === 0 ? 'th' : 'td'} class="hz">${esc(c)}</${ri === 0 ? 'th' : 'td'}>`).join('')}</tr>`).join('')}</table></div>` : `<div class="kl-gform hz">${esc(g.form)}</div>`;
}
function renderMtG(it) {
  const g = KL(it.n).grammar[it.gi]; const exs = g.ex.slice(0, 2);
  return `<div class="q-kind">${ICON('grammar')} <span class="hz">語法</span> · ${t('Pola')} ${esc(g.no || '')} <span class="kl-ln">${lnShort(it.n)}</span></div>
    <h3 class="mt-gt">${esc(kx(g.t))}</h3>${g.table && g.table.length ? `<div class="kl-gform hz">${esc(g.form)}</div>` : ''}${mtPattern(g)}
    <div class="mt-wk"><div class="mt-wkh">${ICON('eye')} ${t('2 contoh lengkap — perhatikan posisi tiap bagian')}</div>
    ${exs.map((e, j) => `<div class="kl-ex"><span class="mt-exn">${j + 1}</span><div class="grow" style="min-width:0">${klLine(e.zh, e.py)}<div class="small">${esc(kx(e))}</div></div><button class="speak mini" data-s="saysent" data-v="${esc(e.zh)}">${ICON('speaker')}</button></div>`).join('')}</div>
    ${mtPicto(exs.map(e => e.zh))}
    <div class="small muted mt-next">${ICON('blocks')} ${t('Berikutnya: kamu susun kalimat sendiri dengan pola ini.')}</div>
    ${mtWhy(['worked', 'generate'].concat(mtPicto(exs.map(e => e.zh)) ? ['dual'] : []))}`;
}
function renderMtWhy(it) {
  const g = KL(it.n).grammar[it.gi]; const A = mtGramAssign(it.n); const L = KL(it.n);
  const whys = A.mcq[it.gi].map(i => L.mcq[i].why).filter(w => w && kx(w)).slice(0, 2);
  return `<div class="q-kind">${ICON('lightbulb')} ${t('Kenapa begitu?')} <span class="kl-ln">${lnShort(it.n)}</span></div>
    <div class="kl-gform hz">${esc(g.form)}</div>
    <p class="mt-ask">${t('Jelaskan dulu dalam hati (atau keras-keras): kapan pola ini dipakai, dan kenapa urutannya begitu? Lalu bandingkan dengan penjelasan.')}</p>
    <div class="mt-ans ${it.rev ? '' : 'hid'}" id="mtwa"><p>${esc(kx(g.note))}</p>${whys.map(w => `<p class="small">${ICON('check')} ${esc(kx(w))}</p>`).join('')}</div>
    ${mtWhy('explain')}`;
}
function renderMtSp(it) {
  const q = KL(it.n).speak[it.i]; const rk = 'sp' + it.n + '-' + it.i;
  const tpl = esc(q.tpl || '').replace(/＿+|_{2,}/g, '<span class="mt-gap">＿＿</span>');
  return `<div class="q-kind">${ICON('mic')} <span class="hz">說說看</span> · ${t('Bicara')} <span class="kl-ln">${lnShort(it.n)}</span></div>
    <div class="mt-spq"><div class="grow" style="min-width:0">${klLine(q.q, q.qpy)}<div class="small muted">${esc(kx(q))}</div></div><button class="speak mini" data-s="saysent" data-v="${esc(q.q)}">${ICON('speaker')}</button></div>
    <div class="mt-tpl"><small>${t('Pola jawaban')}</small><div class="hz">${tpl}</div><small>${esc(q.tplpy || '')}</small></div>
    <ol class="mt-steps small"><li>${t('Dengar pertanyaannya')}</li><li>${t('Jawab keras-keras pakai pola di atas, isi dengan info tentang dirimu')}</li><li>${t('Rekam & dengarkan lagi (opsional), lalu nilai dirimu')}</li></ol>
    <div class="row wrap mt-recrow" id="mtrr">${mtRecBtns(rk, 'data-s')}</div>
    ${mtWhy('output')}`;
}
function mtSesCard(it) {
  progressBar(); SES.shown = Date.now(); SES.m = null;
  let body = '', foot = '';
  if (it.type === 'mtg') { SES.answered = true; body = renderMtG(it); foot = `<button class="btn pri big wide" data-s="next">${t('Paham, coba susun')}</button>`; }
  else if (it.type === 'mtwhy') { SES.answered = !!it.rev; body = renderMtWhy(it); foot = it.rev ? `<div class="row" style="gap:10px"><button class="btn sec big grow" data-s="mtwno">${t('Masih bingung')}</button><button class="btn pri big grow" data-s="mtwok">${ICON('check')} ${t('Paham')}</button></div>` : `<button class="btn pri big wide" data-s="mtwrev">${ICON('eye')} ${t('Lihat penjelasan')}</button>`; }
  else if (it.type === 'mtsp') { SES.answered = false; body = renderMtSp(it); foot = `<div class="mt-rate"><span class="small muted">${t('Seberapa lancar jawabanmu?')}</span><div class="row" style="gap:8px"><button class="btn sec grow" data-s="mtsr" data-v="0">${t('Belum bisa')}</button><button class="btn sec grow" data-s="mtsr" data-v="1">${t('Hampir')}</button><button class="btn pri grow" data-s="mtsr" data-v="2">${t('Lancar')}</button></div></div>`; }
  else if (it.type === 'mtmis') { SES.answered = true; body = `<div class="mt-misc">${TILE('undo', 'tint c4')}<h2>${t('Kesalahan saya')} · <span class="hz">錯題本</span></h2><p>${t('{n} soal tadi masih salah. Coba sekali lagi sekarang — besok soal ini muncul lagi di dek kesalahan.', { n: it.cnt })}</p></div>${mtWhy('errors', 'open')}`; foot = `<button class="btn pri big wide" data-s="next">${ICON('play')} ${t('Ulangi kesalahan')}</button>`; }
  $('#sbody').innerHTML = `<div class="s-card glass kl-read mt-card">${it.type === 'mtg' || it.type === 'mtwhy' ? `<div class="kl-gram">${body}</div>` : body}</div>`;
  $('#sfoot').innerHTML = `<div class="inner">${foot}</div>`;
  $('#sbody').scrollTop = 0;
}
const _renderItemMT = _renderItem;
_renderItem = function () {
  const it = cur();
  if (it && ['mtg', 'mtwhy', 'mtsp', 'mtmis'].includes(it.type)) return mtSesCard(it);
  const r = _renderItemMT();
  if (it && it.type === 'build' && (it.mtctx || it.mtform)) {
    const qm = $('#sbody .q-mean'); const qk = $('#sbody .q-kind');
    if (qk && it.mtform) qk.insertAdjacentHTML('afterend', `<div class="mt-bform small"><span class="muted">${t('Pola')}:</span> <span class="hz">${esc(it.mtform)}</span></div>`);
    if (qm && it.mtctx) qm.insertAdjacentHTML('beforebegin', `<div class="mt-bctx"><b>A：</b><span class="hz">${esc(it.mtctx)}</span> <button class="cx-sp" data-s="saysent" data-v="${esc(it.mtctx)}">${ICON('speaker')}</button><small>${t('Susun jawaban B')}</small></div>`);
  }
  return r;
};
const _sessionClickMT = _sessionClick;
_sessionClick = function (e) {
  const b = e.target.closest('[data-s]');
  if (b && SES) {
    const s = b.dataset.s; const it = cur();
    if (s === 'mtwrev' && it && it.type === 'mtwhy') { it.rev = true; FX.play('flip'); return mtSesCard(it); }
    if ((s === 'mtwok' || s === 'mtwno') && it && it.type === 'mtwhy') {
      const g = KL(it.n).grammar[it.gi];
      if (s === 'mtwno') { const r = { t: 'g', n: it.n, gi: it.gi }; mtMisAdd(r); SES.mtMis = SES.mtMis || []; if (!SES.mtMis.some(x => mtKey(x) === mtKey(r))) SES.mtMis.push(r); SES.mtConf = SES.mtConf || {}; SES.mtConf[it.gi] = 0; toast(t('Oke — pola ini masuk dek kesalahan dan muncul lagi nanti.')); }
      else { addXP(5); SES.xp += 5; }
      SES.answered = true; SES.lastNext = 0; save(); return nextItem();
    }
    if (s === 'mtsr' && it && it.type === 'mtsp') {
      const v = +b.dataset.v; if (v === 0) { const r = { t: 's', n: it.n, i: it.i }; mtMisAdd(r); SES.mtMis = SES.mtMis || []; if (!SES.mtMis.some(x => mtKey(x) === mtKey(r))) SES.mtMis.push(r); }
      else mtMisOk({ t: 's', n: it.n, i: it.i });
      const day = dayRec(); day.sent = (day.sent || 0) + 1; addXP(v ? 8 : 4); SES.xp += v ? 8 : 4; FX.play(v ? 'ok' : 'tap');
      SES.answered = true; SES.lastNext = 0; save(); return nextItem();
    }
    if (s === 'mtrec') { const k = b.dataset.v; return mtRec(k, () => { const el = $('#mtrr'); if (el) el.innerHTML = mtRecBtns(k, 'data-s'); }); }
    if (s === 'mtplay') return mtPlayRec(b.dataset.v);
    if (s === 'mtnext') { const n = +b.dataset.n, k = b.dataset.k, p = b.dataset.p; endSession(false, true); render(); setTimeout(() => mtGo(n, k, p), 60); return; }
    if (s === 'mtgo2') { const a = b.dataset.v; endSession(false, true); render(); setTimeout(() => { if (a === 'mix') mtMixRun(); else if (a === 'mis') mtMisRun(); }, 60); return; }
  }
  return _sessionClickMT(e);
};

/* ---------- perekam suara (aman kalau tidak didukung) ---------- */
const MTR = { mr: null, url: {}, k: null };
const mtRecOK = () => !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
async function mtRec(k, onChange) {
  if (MTR.mr && MTR.mr.state === 'recording') { MTR.mr.stop(); return; }
  if (!mtRecOK()) { toast(t('Perekam suara tidak didukung di browser ini.')); return; }
  try {
    const st = await navigator.mediaDevices.getUserMedia({ audio: true }); const ch = [];
    const mr = new MediaRecorder(st); MTR.mr = mr; MTR.k = k;
    mr.ondataavailable = e => ch.push(e.data);
    mr.onstop = () => { st.getTracks().forEach(x => x.stop()); if (MTR.url[k]) URL.revokeObjectURL(MTR.url[k]); MTR.url[k] = URL.createObjectURL(new Blob(ch, { type: mr.mimeType || 'audio/webm' })); MTR.mr = null; MTR.k = null; if (onChange) onChange(); mtPlayRec(k); };
    mr.start(); if (onChange) onChange();
    setTimeout(() => { if (MTR.mr === mr && mr.state === 'recording') mr.stop(); }, 12000);
  } catch (e) { MTR.mr = null; MTR.k = null; toast(t('Izin mikrofon ditolak — aktifkan di pengaturan browser.')); if (onChange) onChange(); }
}
function mtPlayRec(k) { const u = MTR.url[k]; if (u) { const a = new Audio(u); a.play().catch(() => {}); return a; } return null; }
function mtRecBtns(k, at) {
  if (!mtRecOK()) return `<span class="small muted mt-norec">${ICON('info')} ${t('Perekam tidak tersedia di sini — ucapkan keras-keras saja.')}</span>`;
  const on = MTR.k === k && MTR.mr;
  return `<button class="btn ${on ? 'pri' : 'sec'} small mt-rec ${on ? 'rec' : ''}" ${at}="mtrec" data-v="${k}">${ICON(on ? 'close' : 'mic')} ${on ? t('Stop') : t('Rekam')}</button>${MTR.url[k] ? `<button class="btn ghost small" ${at}="mtplay" data-v="${k}">${ICON('play')} ${t('Suaraku')}</button>` : ''}`;
}

/* ---------- ringkasan ---------- */
const showSummaryMT = showSummary;
showSummary = function () {
  if (!SES || SES.summarized) return showSummaryMT();
  const o = SES.opts; const tot = SES.ok + SES.bad; const acc = tot ? Math.round(SES.ok / tot * 100) : 100;
  const mis = (SES.mtMis || []).length; const rvRes = SES.mtRv || {};
  showSummaryMT();
  if (!mtTracked(o)) return;
  try {
    const sum = $('#sbody .summary'); if (!sum) return;
    sum.querySelectorAll('[data-s="klnext"]').forEach(x => x.remove());
    const row = sum.querySelector('.row.wrap:last-child'); const S0 = kbS(); let msg = '';
    const nextBtn = (x, pri = true) => x ? `<button class="btn ${pri ? 'pri' : 'sec'}" data-s="mtnext" data-n="${x.n}" data-k="${x.k}" data-p="${x.p}">${t('Berikutnya')}: <span class="hz">${KB_META[x.k].zh}</span>${x.of > 1 ? ' ' + (x.i + 1) + '/' + x.of : ''} ${ICON('chevron')}</button>` : '';
    if (o.kbpart) {
      const n = o.n, k = o.kbpart, p = o.kbp; const key = mtPK(n, k, p); const pass = mtPassOf(k);
      const was = mtPartDone(n, k, p); S0.pt[key] = Math.max(S0.pt[key] || 0, acc); const now = mtPartDone(n, k, p);
      if (now && !was) mtDay().c++;
      if (k === 'gram' && acc >= pass) { const part = mtParts(n, k).find(x => x.id === p); if (part) mtGramStatus(n, part.gis.filter(gi => !(SES.mtConf && SES.mtConf[gi] === 0))); }
      const P = mtParts(n, k); let stage = null;
      if (!kbStageDone(n, k) && P.every(x => (S0.pt[mtPK(n, k, x.id)] || 0) >= pass)) { const avg = Math.round(P.reduce((a, x) => a + S0.pt[mtPK(n, k, x.id)], 0) / P.length); stage = kbMark(n, k, avg); }
      msg = `<div class="notice">${acc >= pass ? t('Bagian lulus ({a}%) ✓', { a: acc }) : t('Skor {a}% — butuh {p}% untuk lulus bagian ini. Ulangi sekali lagi, pasti naik!', { a: acc, p: pass })}${stage && stage.first ? ' ' + t('Langkah {s} selesai — masuk jadwal Ulang buku besok.', { s: KB_META[k].zh }) : ''}</div>`;
      const nx = mtNextPart(n); if (row && (acc >= pass || now) && nx) row.insertAdjacentHTML('beforeend', nextBtn(nx));
      if (stage && stage.first) { addXP(15); }
    } else if (o.kbpre) {
      const n = o.n, k = o.kbpre; const pass = acc >= MT_PRE;
      if (pass) {
        const P = mtParts(n, k); const before = P.filter(x => mtPartDone(n, k, x.id)).length;
        P.forEach(x => { if (x.id !== 'all') S0.pt[mtPK(n, k, x.id)] = Math.max(S0.pt[mtPK(n, k, x.id)] || 0, acc); });
        const r = kbMark(n, k, acc); if (r.first) mtDay().c += Math.max(1, Math.min(2, P.length - before));
        if (k === 'gram') mtGramStatus(n, KL(n).grammar.map((_, gi) => gi));
        msg = `<div class="kl-khatam">${ICON('bolt')}<div><b>${t('Lulus tes lompat ({a}%)!', { a: acc })}</b><span>${t('Langkah {s} ditandai selesai. Isinya tetap muncul di Ulang buku supaya tidak lupa.', { s: KB_META[k].zh + ' ' + t(KB_META[k].ti) })}</span></div></div>`;
        const nx = mtNextPart(n); if (row && nx) row.insertAdjacentHTML('beforeend', nextBtn(nx));
      } else {
        msg = `<div class="notice">${t('Skor {a}% (perlu {p}% untuk melompat). Tidak apa — mencoba dulu justru membuat materinya lebih mudah masuk. Ayo pelajari langkahnya sekarang.', { a: acc, p: MT_PRE })}</div>`;
        const P = mtParts(n, k); const p = P.find(x => !mtPartDone(n, k, x.id)) || P[0];
        if (row) row.insertAdjacentHTML('beforeend', nextBtn({ n, k, p: p.id, i: P.indexOf(p), of: P.length }));
      }
    } else if (o.kbmix) {
      const td = todayKey(); const lines = [];
      (o.rvKeys || []).forEach(key => {
        const v = S0.rv[key]; const r = rvRes[key]; if (!v || !r || r.ok + r.bad === 0) return;
        const a = r.ok / (r.ok + r.bad); const [n, k] = key.split('-');
        if (a >= 0.8) { v.s = Math.min(v.s + 1, MT_IV.length - 1); v.due = keyAdd(td, MT_IV[v.s]); } else { v.s = 0; v.due = keyAdd(td, 1); }
        v.last = td; lines.push(`<li><b>${mtStageName(+n, k)}</b> <span>${Math.round(a * 100)}%</span> <em class="${a >= 0.8 ? 'ok' : 'bad'}">${a >= 0.8 ? t('lagi {d} hari', { d: MT_IV[v.s] }) : t('ulang besok')}</em></li>`);
      });
      if (!o.free) mtDay().r++;
      msg = lines.length ? `<div class="mt-sched"><b>${ICON('calendar')} ${t('Jadwal ulang berikutnya')}</b><ul>${lines.join('')}</ul></div>` : `<div class="notice">${t('Latihan campur selesai ({a}%).', { a: acc })}</div>`;
    } else if (o.kbmis) {
      mtDay().m++;
      const left = mtMisOld().length; msg = `<div class="notice">${left ? t('{n} kesalahan lama masih perlu diulang.', { n: left }) : t('Kesalahan lama sudah beres. Yang salah hari ini akan dicek lagi besok.')}</div>`;
    }
    if (mis && !o.kbmis) msg += `<div class="mt-misnote">${ICON('undo')} ${t('{n} soal masuk dek "Kesalahan saya" — muncul lagi besok.', { n: mis })}</div>`;
    const k0 = sum.querySelector('.kpis'); if (msg) (k0 || sum).insertAdjacentHTML('afterend', msg);
    save();
  } catch (e) { console.warn('mt summary', e); }
};

/* ---------- navigasi ---------- */
function mtGo(n, k, p) {
  kbStopAudio(); KBV.n = n;
  if (k === 'dlg') { const B = kbBook(n); KBV.k = B.dialogs.some(d => d.k === p) ? p : (B.dialogs[0] || {}).k || 'd1'; KBV.mode = 'listen'; KBV.role = ''; KBV.si = 0; KBV.peek = {}; VK.view = 'kbd'; render(); window.scrollTo(0, 0); return; }
  if (k === 'read') { VK.view = 'kbr'; render(); window.scrollTo(0, 0); return; }
  mtRun(n, k, p);
}
const kbGoMT = kbGo;
kbGo = function (n, k) { if (k === 'dlg') { const P = mtParts(n, 'dlg'); const p = P.find(x => !mtPartDone(n, 'dlg', x.id)) || P[0]; return mtGo(n, 'dlg', p ? p.id : 'd1'); } return kbGoMT(n, k); };

/* ---------- tampilan: halaman utama ---------- */
const MT_STAGE_WHY = { voc: ['retrieval', 'dual'], dlg: ['input', 'shadow'], gram: ['worked', 'generate', 'explain'], read: ['input', 'output'], mix: ['interleave', 'retrieval'], test: ['mastery'] };
function mtPlanRow(o) {
  return `<button class="mt-pr ${o.cls || ''}" data-a="${o.a}" ${o.attrs || ''}><span class="mt-pri">${o.done ? ICON('check') : ICON(o.ic)}</span><span class="grow" style="min-width:0"><b>${o.ti}</b><span class="small muted">${o.sub}</span></span><span class="mt-prm">${o.done ? t('selesai') : '±' + o.min + ' ' + t('mnt')}</span></button>`;
}
function mtPlan() {
  const S0 = kbS(); const P0 = KB_PACE[S0.pace]; const day = mtDayGet(); const rows = []; let mins = 0; let first = true;
  const nx = () => { const c = first ? 'next' : ''; first = false; return c; };
  const old = mtMisOld();
  if (old.length || day.m) { const m = Math.min(12, old.length); const done = !old.length && day.m > 0; if (!done) mins += Math.ceil(m * 0.4) + 1; rows.push(mtPlanRow({ a: 'mtmis', ic: 'undo', ti: `${t('Kesalahan saya')} · <span class="hz">錯題本</span>`, sub: done ? t('Kesalahan kemarin sudah diulang') : t('{n} soal yang kemarin salah', { n: old.length }), min: Math.ceil(m * 0.4) + 1, done, cls: done ? 'done' : nx() })); }
  const due = mtDueList(); const learned = Object.keys(S0.rv).length;
  if (due.length) { const size = P0.mix; mins += Math.ceil(size * 0.4) + 1; const names = [...new Set(due.map(d => mtStageName(d.n, d.k)))]; rows.push(mtPlanRow({ a: 'mtmix', ic: 'refresh', ti: `${t('Ulang buku')} · <span class="hz">複習</span>`, sub: `${t('{n} bagian jatuh tempo', { n: due.length })}: <span class="hz">${esc(names.slice(0, 4).join(', '))}${names.length > 4 ? '…' : ''}</span>`, min: Math.ceil(size * 0.4) + 1, cls: nx() })); }
  else if (learned) { const nd = mtNextDue(); rows.push(mtPlanRow({ a: 'mtmixfree', ic: 'refresh', ti: `${t('Ulang buku')} · <span class="hz">複習</span>`, sub: day.r ? t('Ulangan hari ini beres') + (nd ? ' · ' + t('berikutnya {d}', { d: nd.slice(5).replace('-', '/') }) : '') : t('Belum ada yang jatuh tempo{d} — boleh latihan campur bebas', { d: nd ? ' (' + nd.slice(5).replace('-', '/') + ')' : '' }), min: 4, done: !!day.r, cls: day.r ? 'done' : '' })); }
  const target = P0.n; const left = Math.max(0, target - day.c);
  const path = mtPath(Math.max(1, left));
  for (let j = 0; j < day.c && j < target; j++) rows.push(`<div class="mt-pr done mt-prdone"><span class="mt-pri">${ICON('check')}</span><span class="grow"><b>${t('Bagian baru #{n} selesai', { n: j + 1 })}</b></span></div>`);
  path.forEach((x, j) => { const M = KB_META[x.k]; const extra = j >= left; if (!extra) mins += x.min; rows.push(mtPlanRow({ a: 'mtgo', attrs: `data-n="${x.n}" data-k="${x.k}" data-p="${x.p}"`, ic: M.ic, ti: `${lnShort(x.n)} · <span class="hz">${M.zh}</span> ${t(M.ti)}`, sub: `${x.of > 1 ? t('Bagian {a}/{b}', { a: x.i + 1, b: x.of }) + ' · ' : ''}${x.of > 1 ? `<span class="${x.hz ? 'hz' : ''}">${esc(x.ti)}</span>` : esc(t(M.sub))}${extra ? ' · ' + t('bonus (target sudah tercapai)') : ''}`, min: x.min, cls: (extra ? 'extra ' : '') + nx() })); });
  if (!path.length) rows.push(`<div class="notice">${t('Semua bagian baru selesai! Fokus di Ulang buku & ujian bab.')}</div>`);
  const allDone = !rows.some(r => /class="mt-pr (?!done)/.test(r) && !/extra/.test(r));
  return `<section class="card glass mt-plan"><div class="mt-ph"><div class="grow" style="min-width:0"><span class="kl-badge">${ICON('calendar')} 今日計畫</span><h2>${t('Rencana hari ini')}</h2><span class="small muted">${allDone ? t('Rencana hari ini selesai — hebat! Bonus boleh, istirahat juga boleh.') : t('±{m} menit · kerjakan dari atas', { m: Math.max(5, mins) })}</span></div></div>
    <div class="seg mt-pace" role="group" aria-label="${t('Intensitas')}">${Object.entries(KB_PACE).map(([k, p]) => `<button class="${S0.pace === k ? 'on' : ''}" data-a="kbpace" data-v="${k}"><b>${t(p.ti)}</b><small>±${p.min} ${t('mnt')}</small></button>`).join('')}</div>
    <div class="mt-pl">${rows.join('')}</div>
    <div class="mt-planf">${S0.mis.length ? `<button class="chip" data-a="mtmis">${ICON('undo')} ${t('Kesalahan saya')} · ${S0.mis.length}</button>` : ''}${learned ? `<button class="chip" data-a="mtmixfree">${ICON('layers')} ${t('Latihan campur bebas')}</button>` : ''}</div>
    ${mtWhy(['micro', 'spacing', 'interleave'])}</section>`;
}
function mtLessonCard(L, isNext) {
  const n = L.n; const sts = kbStages(n); let tot = 0, dn = 0; sts.forEach(k => { const x = mtStageParts(n, k); tot += x.P.length; dn += x.done; });
  const done = kbLessonDone(n); const due = mtDueList().filter(d => d.n === n).length;
  return `<button class="mt-lc ${done ? 'done' : ''} ${isNext ? 'next' : ''}" data-a="kbopen" data-v="${n}"><span class="kb-ln">${done ? ICON('crown') : L.num}</span>
    <span class="grow" style="min-width:0"><b class="hz">${esc(L.title.zh)}</b><span class="small muted mt-lct">${esc(kx(L.title))}</span>
    <span class="mt-bar"><i style="width:${Math.round(dn / Math.max(1, tot) * 100)}%"></i></span>
    <span class="mt-lcm small">${sts.map(k => `<i class="${kbStageDone(n, k) ? 'on' : ''}" title="${KB_META[k].zh}">${KB_META[k].zh.slice(0, 1)}</i>`).join('')}${due ? `<em>${ICON('refresh')} ${t('ulang')}</em>` : ''}${isNext && !done ? `<em class="nx">${t('berikutnya')}</em>` : ''}</span></span></button>`;
}
vKb = function () {
  const S0 = kbS(); const T = mtTotals(); const K = kbTotals(); const eta = kbEta(); const day = mtDayGet(); const per = KB_PACE[S0.pace].n;
  const pct = Math.round(T.done / Math.max(1, T.tot) * 100); const nl = kbNextLesson();
  const curU = nl ? KB_UNITS.findIndex(u => u.includes(KL(nl).num)) : KB_UNITS.length - 1;
  const hero = `<section class="card glass kb-hero mt-hero"><button class="btn ghost small" data-a="klback">‹ ${t('Kelas')}</button>
    <div class="kb-ht"><span class="kb-seal hz">時代<br>華語</span><div class="grow" style="min-width:0"><span class="kl-badge">${ICON('award')} Khatam Band A</span><h1 class="hz" style="margin:4px 0 0">時代華語 1</h1><p class="muted small" style="margin:2px 0 0">${t('Lesson 1–15 sesuai buku, dipecah jadi bagian 5–8 menit. Semua bisa dibuka kapan saja — jalur yang disarankan ditandai.')}</p></div>${kbRing(T.done / Math.max(1, T.tot), 64)}</div>
    <div class="kb-kpi"><div><b>${pct}%</b><span>${t('selesai')}</span></div><div><b>${K.khatam}/${K.lessons}</b><span>${t('lesson khatam')}</span></div><div><b>${Math.min(day.c, per)}/${per}</b><span>${t('bagian baru hari ini')}</span></div><div><b>${eta.left ? eta.date.slice(5).replace('-', '/') : '✓'}</b><span>${eta.left ? t('perkiraan tamat') : t('buku tamat!')}</span></div></div></section>`;
  const units = KB_UNITS.map((u, ui) => {
    const ls = u.map(x => kbLessons().find(L => L.num === x)).filter(Boolean);
    const ready = ls.every(L => kbLessonDone(L.n)); const us = S0.unit[ui]; const dn = ls.filter(L => kbLessonDone(L.n)).length;
    return `<details class="kb-unit mt-unit" ${ui === curU ? 'open' : ''}><summary><b>${t('Bab {u}', { u: ui + 1 })}</b><span class="small muted">Lesson ${u[0]}–${u[u.length - 1]} · ${dn}/${ls.length} ${t('khatam')}${us !== undefined ? ' · ' + t('ujian') + ' ' + us + '%' : ''}</span>${ICON('chevron')}</summary>
      <div class="mt-lgrid">${ls.map(L => mtLessonCard(L, L.n === nl)).join('')}
      <button class="kb-boss ${ready ? 'ready' : ''} ${us >= 80 ? 'won' : ''}" data-a="kbunit" data-v="${ui}"><span class="kb-bi">${us >= 80 ? ICON('crown') : ICON('target')}</span><span class="grow" style="min-width:0"><b>${t('Ujian bab {u}', { u: ui + 1 })} · <span class="hz">單元測驗</span></b><span class="small">${us !== undefined ? t('Skor terbaik {s}%', { s: us }) : ready ? t('30 soal gaya TOCFL Band A — siap!') : t('Disarankan setelah semua lesson bab ini khatam')}</span></span>${ICON('chevron')}</button></div></details>`;
  }).join('');
  const how = `<details class="card glass kb-how mt-how"><summary><b>${t('Cara belajar di sini & kenapa efektif')}</b>${ICON('chevron')}</summary><div class="mt-hgrid">
    ${[['seed', '生詞', 'Kata dulu, langsung diuji', 'retrieval'], ['headphone', '對話', 'Dengar dulu, bantuan bertahap', 'input'], ['mic', '跟讀', 'Bayangan: dengar → tirukan → rekam', 'shadow'], ['grammar', '語法', 'Pola → 2 contoh → susun sendiri → kenapa', 'generate'], ['chat', '說說看', 'Bicara pakai pola, nilai dirimu', 'output'], ['refresh', '複習', 'Ulang buku 1·3·7·14 hari', 'spacing'], ['layers', '混合', 'Soal antar lesson dicampur', 'interleave'], ['bolt', '跳級', 'Tes lompat ≥ 85% = boleh lewati', 'pretest'], ['undo', '錯題本', 'Kesalahan diulang akhir sesi & besok', 'errors']].map(([ic, zh, a, k]) => `<div class="mt-hm">${TILE(ic, 'tint c' + (1 + zh.length % 6))}<div><b><span class="hz">${zh}</span> · ${t(a)}</b><p>${esc(t(MT_WHY[k][0]))}</p><cite>${esc(MT_WHY[k][1])}</cite></div></div>`).join('')}</div>
    <p class="small muted" style="margin:10px 0 0">${t('Catatan: scan buku berhenti di tengah Lesson 15, jadi bacaan & kegiatan Lesson 15 belum ada.')}</p></details>`;
  return `<div class="mt-home"><div class="mt-top">${hero}${mtPlan()}</div>${units}${how}</div>`;
};

/* ---------- tampilan: halaman lesson ---------- */
vKbLesson = function (n) {
  const L = KL(n); const B = kbBook(n); const sts = kbStages(n); const nx = mtNextPart(n);
  let tot = 0, dn = 0; sts.forEach(k => { const x = mtStageParts(n, k); tot += x.P.length; dn += x.done; });
  const cards = sts.map((k, i) => {
    const M = KB_META[k]; const sc = kbScore(n, k); const ok = kbStageDone(n, k); const rec = nx && nx.k === k; const { P, done } = mtStageParts(n, k);
    const rv = kbS().rv[n + '-' + k];
    const chip = ok ? `<span class="chip on">${ICON('check')} ${sc !== undefined ? sc + '%' : ''}</span>` : P.length > 1 ? `<span class="chip">${done}/${P.length}</span>` : sc !== undefined ? `<span class="chip">${sc}%</span>` : '';
    const parts = P.length > 1 || k === 'dlg' ? `<div class="mt-parts">${P.map((p, j) => { const pd = mtPartDone(n, k, p.id); const ps = kbS().pt[mtPK(n, k, p.id)]; const isN = rec && nx.p === p.id; return `<button class="mt-pc ${pd ? 'done' : ''} ${isN ? 'next' : ''}" data-a="mtgo" data-n="${n}" data-k="${k}" data-p="${p.id}">${pd ? ICON('check') : `<i>${j + 1}</i>`}<span class="${p.hz ? 'hz' : ''}">${esc(p.ti)}</span><small>${pd && ps !== undefined ? ps + '%' : '±' + p.min + "'"}</small></button>`; }).join('')}</div>` : '';
    const goP = (rec ? nx.p : (P.find(p => !mtPartDone(n, k, p.id)) || P[0]).id);
    const verb = ok ? t('Ulangi') : rec ? (done ? t('Lanjut') : t('Mulai')) : t('Buka');
    return `<section class="card glass mt-stage ${ok ? 'ok' : ''} ${rec ? 'rec' : ''}"><div class="mt-sh"><span class="mt-si">${ok ? ICON('check') : ICON(M.ic)}</span><div class="grow" style="min-width:0"><small class="muted">${t('Langkah {i}', { i: i + 1 })} · ±${P.reduce((a, p) => a + p.min, 0)} ${t('menit')}</small><b><span class="hz">${M.zh}</span> · ${t(M.ti)}</b></div>${chip}</div>
      <p class="small muted mt-ss">${t(M.sub)}${rv ? ` · <span class="mt-rvd">${ICON('refresh')} ${t('ulang {d}', { d: rv.due <= todayKey() ? t('hari ini') : rv.due.slice(5).replace('-', '/') })}</span>` : ''}</p>
      ${parts}
      <div class="mt-sa"><button class="btn ${rec ? 'pri' : 'sec'} small" data-a="mtgo" data-n="${n}" data-k="${k}" data-p="${goP}">${ICON(ok ? 'refresh' : 'play')} ${verb}</button>${!ok && k !== 'test' ? `<button class="btn ghost small" data-a="mtpre" data-n="${n}" data-k="${k}" title="${t('Lulus ≥ {p}% = langkah ini dilewati', { p: MT_PRE })}">${ICON('bolt')} ${t('Tes lompat')}</button>` : ''}</div>
      ${mtWhy(MT_STAGE_WHY[k] || [], 'mini')}</section>`;
  }).join('');
  return `<section class="card glass kb-lhero mt-lhero"><button class="btn ghost small" data-a="kbhome">‹ Khatam Band A</button>
    <div class="kb-lh"><span class="kb-ln big">${L.num}</span><div class="grow" style="min-width:0"><small class="muted">${lnLong(n)}</small><h1 class="hz" style="margin:2px 0">${esc(L.title.zh)}</h1><div class="small muted">${esc(L.title.py || '')} · ${esc(kx(L.title))}</div></div>${kbRing(dn / Math.max(1, tot), 54)}</div>
    ${kx(L.goal) ? `<div class="gtip">${ICON('target')}<span><b>${t('Target')}:</b> ${esc(kx(L.goal))}</span></div>` : ''}
    ${B.incomplete ? `<div class="notice">${t('Scan buku berakhir di tengah lesson ini — yang tersedia: dialog 1, dialog 2 dan sebagian grammarnya.')}</div>` : ''}
    ${nx ? `<button class="mt-nextbar" data-a="mtgo" data-n="${n}" data-k="${nx.k}" data-p="${nx.p}"><span class="mt-pri">${ICON(KB_META[nx.k].ic)}</span><span class="grow" style="min-width:0"><small>${t('Langkah disarankan')}</small><b><span class="hz">${KB_META[nx.k].zh}</span> ${t(KB_META[nx.k].ti)}${nx.of > 1 ? ' · ' + t('Bagian {a}/{b}', { a: nx.i + 1, b: nx.of }) : ''}</b></span><span class="btn pri small">${ICON('play')} ±${nx.min}'</span></button>` : `<div class="kl-khatam">${ICON('crown')}<div><b>${t('{n} khatam!', { n: lnShort(n) })}</b><span>${t('Isi lesson ini akan terus muncul di Ulang buku.')}</span></div></div>`}
    <div class="kb-tools"><button class="btn sec small" data-a="kbbook" data-v="${n}">${ICON('book')} ${t('Buka buku')}</button><button class="btn ghost small" data-a="kbfc" data-v="${n}">${ICON('cards')} ${t('Flashcard')}</button></div>
    <p class="small muted mt-free">${ICON('info')} ${t('Tidak ada kunci: buka langkah mana pun. Sudah menguasai? Pakai "Tes lompat".')}</p></section>
    <div class="mt-sts">${cards}</div>`;
};

/* ---------- tampilan: dialog (dukungan bertahap + bayangan) ---------- */
const MT_LV = [['headphone', 'Dengar saja'], ['tone', '+ Pinyin'], ['hanzi', '+ Hanzi'], ['globe', '+ Arti']];
function mtLv(n, k) { const S0 = kbS(); const v = S0.dsup[n + '-' + k]; return v !== undefined ? v : mtPartDone(n, 'dlg', k) ? 2 : 0; }
function mtLineBody(x, lv, peek) {
  const L2 = Math.max(lv, peek ? 2 : 0);
  if (L2 === 0) return `<div class="mt-hide"><span class="mt-wv"><i></i><i></i><i></i><i></i><i></i></span><span class="small muted">${t('dengar dulu…')}</span></div>`;
  if (L2 === 1) return `<div class="mt-pyl">${esc(x.py || '')}</div>`;
  return `<div class="dl-l">${kbS().py ? klLine(x.zh, x.py) : `<span class="hz kb-zh">${esc(x.zh)}</span>${lvBadgeS(x.zh)}`}</div>${L2 >= 3 ? `<div class="dl-tr">${esc(kx(x))}</div>` : ''}`;
}
function mtLineHTML(x, i, o) {
  if (!x.sp) return o.lv >= 2 ? `<div class="kb-sd">${esc(x.zh)}</div>` : '';
  const me = o.role && o.role === x.sp; const pk = KBV.peek && KBV.peek[i];
  return `<div class="dl ${spCls(x.sp)} ${me ? 'me' : ''} ${o.play === i ? 'playing' : ''}" data-i="${i}"><span class="dl-sp">${esc(x.sp)}</span>
    <div class="dl-b">${me ? `<button class="dl-rev" data-a="kbrevl">${t('Giliranmu! Ucapkan, lalu ketuk')}</button><div class="mt-rl">${mtLineBody(x, Math.max(2, o.lv), true)}</div>` : mtLineBody(x, o.lv, pk)}${!me && o.lv < 2 && !pk ? `<button class="mt-peek" data-a="mtpeek" data-v="${i}">${ICON('eye')} ${t('intip')}</button>` : ''}</div>
    <button class="speak mini" data-a="kbsay" data-v="${esc(x.zh)}" data-sp="${esc(x.sp)}">${ICON('speaker')}</button></div>`;
}
function mtShadowHTML(n, k, D, lv) {
  const lines = D.lines.filter(x => x.sp); const i = clamp(KBV.si || 0, 0, lines.length - 1); const x = lines[i]; const rk = 'sh' + n + '-' + k + '-' + i;
  const done = kbS().shd[n + '-' + k];
  return `<div class="mt-shadow"><div class="mt-shp">${lines.map((_, j) => `<i class="${j < i ? 'on' : ''} ${j === i ? 'cur' : ''}"></i>`).join('')}<small>${i + 1}/${lines.length}${done ? ' · ' + t('pernah selesai') : ''}</small></div>
    <div class="mt-shl ${spCls(x.sp)}"><span class="dl-sp">${esc(x.sp)}</span><div class="grow" style="min-width:0">${mtLineBody(x, Math.max(1, lv), KBV.peek && KBV.peek['s' + i])}${lv < 2 && !(KBV.peek && KBV.peek['s' + i]) ? `<button class="mt-peek" data-a="mtpeek" data-v="s${i}">${ICON('eye')} ${t('lihat hanzi')}</button>` : ''}</div></div>
    <ol class="mt-steps small"><li>${t('Dengar kalimatnya')}</li><li>${t('Langsung tirukan — ikuti nada & ritmenya')}</li><li>${t('Rekam & bandingkan dengan suara asli (opsional)')}</li></ol>
    <div class="row wrap mt-shc"><button class="btn pri" data-a="mtshsay" data-v="${i}">${ICON('play')} ${t('Dengar')}</button><button class="btn sec" data-a="mtshsay" data-v="${i}" data-slow="1">${ICON('slow')} ${t('Pelan')}</button>${mtRecBtns(rk, 'data-a')}${MTR.url[rk] ? `<button class="btn ghost small" data-a="mtcmp" data-v="${i}">${ICON('swap')} ${t('Bandingkan')}</button>` : ''}</div>
    <div class="row mt-shn"><button class="btn ghost" data-a="mtshnav" data-v="-1" ${i === 0 ? 'disabled' : ''}>${ICON('chevron', 'flip')} ${t('Sebelumnya')}</button><button class="btn sec grow" data-a="mtshnav" data-v="1">${i + 1 >= lines.length ? ICON('check') + ' ' + t('Selesai') : t('Berikutnya') + ' ' + ICON('chevron')}</button></div></div>`;
}
vKbDialog = function (n, k) {
  const B = kbBook(n); if (!B.dialogs.find(d => d.k === k)) k = KBV.k = B.dialogs[0].k;
  const D = kbDlg(n, k); const L = KL(n); const sps = [...new Set(D.lines.filter(x => x.sp).map(x => x.sp))];
  const mode = KBV.mode || 'listen'; const lv = mtLv(n, k); const done = mtPartDone(n, 'dlg', k); const sc = kbS().pt[mtPK(n, 'dlg', k)];
  const lvSeg = `<div class="mt-lv"><span class="small muted">${t('Bantuan')}:</span><div class="seg">${MT_LV.map(([ic, l], j) => `<button class="${lv === j ? 'on' : ''} ${j < lv ? 'past' : ''}" data-a="mtsup" data-v="${j}" aria-pressed="${lv === j}">${ICON(ic)}<span>${t(l)}</span></button>`).join('')}</div>${lv < 3 ? `<button class="btn ghost small" data-a="mtsup" data-v="${lv + 1}">${t('Tambah bantuan')} ${ICON('chevron')}</button>` : ''}</div>`;
  let body = '';
  if (mode === 'shadow') body = mtShadowHTML(n, k, D, lv);
  else {
    const ctl = mode === 'role' ? `<div class="kb-roles"><span class="small muted">${t('Pilih tokohmu')}:</span>${sps.map(s => `<button class="chip ${KBV.role === s ? 'on' : ''}" data-a="kbrole" data-v="${esc(s)}">${esc(s)}</button>`).join('')}</div>` : '';
    body = `${ctl}<div class="kb-ctl"><button class="btn pri" data-a="kbplay">${ICON(KBV.play >= 0 ? 'close' : 'play')} ${KBV.play >= 0 ? t('Stop') : mode === 'role' && KBV.role ? t('Mulai main peran') : t('Putar semua')}</button>${kbS().py !== undefined && lv >= 2 ? `<button class="chip ${kbS().py ? 'on' : ''}" data-a="kbtog" data-v="py">拼音</button>` : ''}</div>
      <div class="kl-dlg kb-dlg">${D.lines.map((x, i) => mtLineHTML(x, i, { role: mode === 'role' ? KBV.role : '', play: KBV.play, lv })).join('')}</div>`;
  }
  return `<section class="card glass mt-dlgv"><button class="btn ghost small" data-a="kbopen" data-v="${n}">‹ ${lnShort(n)} <span class="hz">${esc(L.title.zh)}</span></button>
    <h1 style="margin:6px 0 8px"><span class="hz">對話</span> · ${t('Dialog')}</h1>
    ${B.dialogs.length > 1 ? `<div class="seg kb-dtab">${B.dialogs.map(d => `<button class="${d.k === k ? 'on' : ''}" data-a="kbdtab" data-v="${d.k}">${mtPartDone(n, 'dlg', d.k) ? ICON('check') : ''}<span class="hz">${esc(d.label)}</span></button>`).join('')}</div>` : ''}
    ${D.place ? `<div class="kb-place hz">${esc(D.place.zh || '')} <span class="small muted">${esc(kx(D.place) || '')}</span></div>` : ''}
    <div class="seg mt-mode">${[['listen', 'headphone', 'Dengar'], ['shadow', 'mic', 'Bayangan'], ['role', 'chat', 'Peran']].map(([m, ic, l]) => `<button class="${mode === m ? 'on' : ''}" data-a="mtmode" data-v="${m}">${ICON(ic)} ${t(l)}</button>`).join('')}</div>
    ${lvSeg}
    ${body}
    ${mtWhy(mode === 'shadow' ? ['shadow'] : mode === 'role' ? ['output'] : ['input'])}</section>
    <section class="card glass kb-cta"><div class="grow"><b>${t('Sudah paham {d}?', { d: D.label })}</b><span class="small muted">${done && sc !== undefined ? t('Skor terbaik {s}%', { s: sc }) + ' · ' : ''}${t('Cek pemahaman ±5 menit: isi kata hilang, lanjutkan percakapan, tanya-jawab.')}</span></div><button class="btn ${done ? 'sec' : 'pri'}" data-a="kbrun" data-n="${n}" data-k="dlg" data-p="${k}">${ICON(done ? 'refresh' : 'play')} ${done ? t('Ulangi cek') : t('Cek pemahaman')}</button></section>
    ${kbVocabList(n, k)}`;
};
const vKbReadingMT = vKbReading;
vKbReading = function (n) {
  const h = vKbReadingMT(n); const i = h.indexOf('</h1>');
  const pre = !kbStageDone(n, 'read') ? `<button class="btn ghost small" data-a="mtpre" data-n="${n}" data-k="read">${ICON('bolt')} ${t('Tes lompat')}</button>` : '';
  return i < 0 ? h : h.slice(0, i + 5) + `<div class="mt-rtop">${mtWhy(['input', 'output'])}${pre}</div>` + h.slice(i + 5);
};

Object.assign(ACT, {
  mtgo: b => mtGo(+b.dataset.n, b.dataset.k, b.dataset.p),
  mtgo2: b => { kbStopAudio(); mtRun(+b.dataset.n, 'dlg', b.dataset.p); },
  kbrun: b => { kbStopAudio(); const n = +b.dataset.n, k = b.dataset.k; if (b.dataset.p) mtRun(n, k, b.dataset.p); else kbRun(n, k); },
  mtpre: b => { kbStopAudio(); mtPre(+b.dataset.n, b.dataset.k); },
  mtmix: () => mtMixRun(false),
  mtmixfree: () => mtMixRun(true),
  mtmis: () => mtMisRun(),
  mtsup: b => { const S0 = kbS(); S0.dsup[KBV.n + '-' + KBV.k] = clamp(+b.dataset.v, 0, 3); KBV.peek = {}; save(); render(); },
  mtmode: b => { kbStopAudio(); KBV.mode = b.dataset.v; KBV.role = ''; KBV.si = KBV.si || 0; render(); },
  mtpeek: b => { KBV.peek = KBV.peek || {}; KBV.peek[b.dataset.v] = 1; render(); },
  mtshsay: b => { FX.ensure(); if (TTS.unlock) TTS.unlock(); const D = kbDlg(KBV.n, KBV.k); const x = D.lines.filter(y => y.sp)[+b.dataset.v]; if (!x) return; if (b.dataset.slow) TTS.speak(x.zh, 0.55); else tfPlay([{ who: kbVoice(x.sp, kbVoiceMap(D.lines)), zh: x.zh }]); },
  mtshnav: b => {
    const D = kbDlg(KBV.n, KBV.k); const lines = D.lines.filter(y => y.sp); const i = (KBV.si || 0) + +b.dataset.v;
    if (i >= lines.length) { kbS().shd[KBV.n + '-' + KBV.k] = todayKey(); save(); KBV.si = 0; addXP(10); toast(t('Shadowing dialog selesai ✓ +10 XP')); KBV.mode = 'listen'; render(); return; }
    KBV.si = clamp(i, 0, lines.length - 1); render(); const x = lines[KBV.si]; if (voiceOK()) setTimeout(() => tfPlay([{ who: kbVoice(x.sp, kbVoiceMap(D.lines)), zh: x.zh }]), 150);
  },
  mtrec: b => mtRec(b.dataset.v, () => render()),
  mtplay: b => mtPlayRec(b.dataset.v),
  mtcmp: b => { FX.ensure(); const D = kbDlg(KBV.n, KBV.k); const i = +b.dataset.v; const x = D.lines.filter(y => y.sp)[i]; const rk = 'sh' + KBV.n + '-' + KBV.k + '-' + i; tfPlay([{ who: kbVoice(x.sp, kbVoiceMap(D.lines)), zh: x.zh, gap: 300 }], () => mtPlayRec(rk)); }
});
['mtgo', 'mtgo2', 'mtpre', 'mtmix', 'mtmixfree', 'mtmis'].forEach(a => START_ACTS.add(a));

/* ---------- gaya ---------- */
(function () {
  if (document.getElementById('mt-css')) return;
  const st = document.createElement('style'); st.id = 'mt-css';
  st.textContent = `
.mt-why{margin-top:10px;border-radius:var(--r-md);background:color-mix(in srgb,var(--acc) 7%,transparent);border:1px solid color-mix(in srgb,var(--acc) 18%,transparent);font-size:13px}
.mt-why>summary{list-style:none;display:flex;align-items:center;gap:8px;padding:8px 12px;cursor:pointer;color:var(--acc);font-weight:700;min-height:40px}
.mt-why>summary::-webkit-details-marker{display:none}
.mt-why>summary .ic-svg{width:18px;height:18px;flex:none}
.mt-why>summary span{flex:1}
.mt-why>summary .ic-svg:last-child{transition:transform .2s}
.mt-why[open]>summary .ic-svg:last-child{transform:rotate(90deg)}
.mt-why p{margin:0;padding:0 12px 10px;color:var(--ink2);line-height:1.45}
.mt-why cite{display:block;font-style:normal;font-size:11.5px;color:var(--ink3);margin-top:2px}
.mt-home{display:flex;flex-direction:column;gap:14px}
.mt-home>*{margin:0!important}
.mt-top{display:grid;gap:14px;align-items:start}
.mt-top>*{margin:0!important}
@media (min-width:900px){.mt-top{grid-template-columns:minmax(0,1fr) minmax(0,1.1fr)}}
.mt-plan .mt-ph{display:flex;gap:12px;align-items:flex-start}
.mt-plan h2{margin:6px 0 2px;font-size:20px}
.mt-pace{display:flex;margin:12px 0 4px;width:100%}
.mt-pace button{flex:1;display:flex;flex-direction:column;align-items:center;gap:0;padding:6px 4px;min-height:46px;line-height:1.15}
.mt-pace button small{font-size:11px;opacity:.75;font-weight:500}
.mt-pl{display:flex;flex-direction:column;gap:8px;margin-top:10px}
.mt-pr{display:flex;align-items:center;gap:12px;width:100%;text-align:left;padding:10px 12px;border-radius:var(--r-md);border:1px solid var(--line);background:var(--surface);color:var(--ink);cursor:pointer;min-height:56px;font:inherit;transition:transform .15s,border-color .15s}
.mt-pr:hover{border-color:var(--acc-line)}
.mt-pr:active{transform:scale(.99)}
.mt-pr b{display:block;font-size:14.5px;line-height:1.3}
.mt-pr .small{display:block;line-height:1.35;margin-top:1px}
.mt-pri{width:38px;height:38px;flex:none;border-radius:12px;display:grid;place-items:center;background:var(--acc-soft);color:var(--acc)}
.mt-pri .ic-svg{width:20px;height:20px}
.mt-prm{flex:none;font-size:12px;font-weight:700;color:var(--ink3);white-space:nowrap}
.mt-pr.next{border:1.5px solid var(--acc);background:color-mix(in srgb,var(--acc) 8%,var(--surface));box-shadow:0 4px 14px color-mix(in srgb,var(--acc) 18%,transparent)}
.mt-pr.next .mt-pri{background:var(--acc);color:var(--on-acc)}
.mt-pr.next .mt-prm{color:var(--acc)}
.mt-pr.done{opacity:.72;background:transparent;border-style:dashed}
.mt-pr.done .mt-pri{background:color-mix(in srgb,var(--ok) 16%,transparent);color:var(--ok)}
.mt-prdone{cursor:default;min-height:44px;padding:6px 12px}
.mt-prdone .mt-pri{width:28px;height:28px;border-radius:9px}
.mt-pr.extra:not(.next){opacity:.85}
.mt-planf{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
.mt-planf .chip{min-height:40px}
.mt-unit>summary{min-height:48px}
.mt-lgrid{display:grid;gap:10px;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));padding-top:6px}
.mt-lgrid .kb-boss{grid-column:1/-1;margin:0}
.mt-lc{display:flex;gap:12px;align-items:flex-start;text-align:left;padding:12px;border-radius:var(--r-md);border:1px solid var(--line);background:var(--surface);color:var(--ink);font:inherit;cursor:pointer;min-height:64px;width:100%;transition:border-color .15s,transform .15s}
.mt-lc:hover{border-color:var(--acc-line)}
.mt-lc b{display:block;font-size:17px;line-height:1.25}
.mt-lc .mt-lct{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mt-lc.next{border:1.5px solid var(--acc);box-shadow:0 4px 14px color-mix(in srgb,var(--acc) 15%,transparent)}
.mt-lc.done .kb-ln{background:color-mix(in srgb,var(--ok) 18%,transparent);color:var(--ok)}
.mt-bar{display:block;height:6px;border-radius:9px;background:var(--line);margin:8px 0 6px;overflow:hidden}
.mt-bar i{display:block;height:100%;border-radius:9px;background:var(--acc);transition:width .4s}
.mt-lc.done .mt-bar i{background:var(--ok)}
.mt-lcm{display:flex;flex-wrap:wrap;gap:4px;align-items:center}
.mt-lcm i{font-style:normal;font-family:var(--hz);width:22px;height:22px;border-radius:7px;display:grid;place-items:center;font-size:12px;background:var(--surface2);color:var(--ink3)}
.mt-lcm i.on{background:color-mix(in srgb,var(--ok) 18%,transparent);color:var(--ok)}
.mt-lcm em{font-style:normal;font-size:11px;font-weight:700;color:var(--acc);display:inline-flex;align-items:center;gap:3px;margin-left:4px}
.mt-lcm em .ic-svg{width:13px;height:13px}
.mt-lcm em.nx{background:var(--acc);color:var(--on-acc);padding:2px 8px;border-radius:99px}
.mt-hgrid{display:grid;gap:10px;margin-top:10px}
@media (min-width:760px){.mt-hgrid{grid-template-columns:1fr 1fr}}
@media (min-width:1100px){.mt-hgrid{grid-template-columns:1fr 1fr 1fr}}
.mt-hm{display:flex;gap:10px;align-items:flex-start;padding:10px;border-radius:var(--r-md);background:var(--surface2)}
.mt-hm p{margin:2px 0;font-size:13px;color:var(--ink2);line-height:1.4}
.mt-hm cite{font-style:normal;font-size:11px;color:var(--ink3)}
.mt-lhero .mt-free{display:flex;gap:6px;align-items:center;margin:8px 0 0}
.mt-lhero .mt-free .ic-svg{width:15px;height:15px;flex:none}
.mt-nextbar{display:flex;align-items:center;gap:12px;width:100%;margin:12px 0 4px;padding:10px 12px;border-radius:var(--r-md);border:1.5px solid var(--acc);background:color-mix(in srgb,var(--acc) 8%,var(--surface));color:var(--ink);text-align:left;font:inherit;cursor:pointer;min-height:56px}
.mt-nextbar .mt-pri{background:var(--acc);color:var(--on-acc)}
.mt-nextbar small{display:block;color:var(--ink3);font-size:12px}
.mt-nextbar b{display:block;font-size:15px}
.mt-sts{display:grid;gap:12px;margin-top:12px}
@media (min-width:760px){.mt-sts{grid-template-columns:1fr 1fr}}
.mt-sts>.card{margin:0}
.mt-stage{display:flex;flex-direction:column}
.mt-stage.rec{border:1.5px solid var(--acc);box-shadow:0 6px 20px color-mix(in srgb,var(--acc) 14%,transparent)}
.mt-stage.ok .mt-si{background:color-mix(in srgb,var(--ok) 16%,transparent);color:var(--ok)}
.mt-sh{display:flex;gap:12px;align-items:center}
.mt-sh b{display:block;font-size:16px}
.mt-si{width:42px;height:42px;flex:none;border-radius:13px;display:grid;place-items:center;background:var(--acc-soft);color:var(--acc)}
.mt-si .ic-svg{width:22px;height:22px}
.mt-stage.rec .mt-si{background:var(--acc);color:var(--on-acc)}
.mt-ss{margin:8px 0 0;line-height:1.4}
.mt-rvd{display:inline-flex;gap:3px;align-items:center;color:var(--acc);font-weight:600}
.mt-rvd .ic-svg{width:13px;height:13px}
.mt-rec-chip{border-color:var(--acc);color:var(--acc)}
.mt-parts{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.mt-pc{display:inline-flex;align-items:center;gap:6px;min-height:40px;padding:4px 10px 4px 6px;border-radius:99px;border:1px solid var(--line);background:var(--surface);color:var(--ink2);font:inherit;font-size:13px;cursor:pointer;max-width:100%}
.mt-pc>span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mt-pc i{font-style:normal;width:24px;height:24px;border-radius:50%;display:grid;place-items:center;background:var(--surface2);font-size:12px;font-weight:700;flex:none}
.mt-pc .ic-svg{width:22px;height:22px;padding:3px;border-radius:50%;background:color-mix(in srgb,var(--ok) 18%,transparent);color:var(--ok);flex:none}
.mt-pc small{color:var(--ink3);font-size:11px}
.mt-pc.done{border-color:color-mix(in srgb,var(--ok) 35%,transparent)}
.mt-pc.next{border:1.5px solid var(--acc);color:var(--ink);background:color-mix(in srgb,var(--acc) 8%,var(--surface))}
.mt-pc.next i{background:var(--acc);color:var(--on-acc)}
.mt-sa{display:flex;flex-wrap:wrap;gap:8px;margin-top:auto;padding-top:12px}
.mt-sa .btn{min-height:40px}
.mt-dlgv .mt-mode{display:flex;width:100%;margin:10px 0 6px}
.mt-dlgv .mt-mode button{flex:1;display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:42px}
.mt-dlgv .mt-mode .ic-svg,.mt-lv .seg .ic-svg{width:17px;height:17px}
.mt-lv{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:8px 0 10px}
.mt-lv .seg{display:flex;flex:1 1 300px;min-width:0}
.mt-lv .seg button{flex:1;display:inline-flex;flex-direction:column;align-items:center;gap:1px;min-height:46px;font-size:11.5px;padding:4px 2px;line-height:1.1}
.mt-lv .seg button.past{color:var(--acc)}
.mt-hide{display:flex;align-items:center;gap:8px;min-height:30px}
.mt-wv{display:inline-flex;gap:3px;align-items:center;height:18px}
.mt-wv i{width:4px;border-radius:3px;background:color-mix(in srgb,var(--acc) 45%,transparent);height:40%}
.mt-wv i:nth-child(2){height:80%}.mt-wv i:nth-child(3){height:100%}.mt-wv i:nth-child(4){height:65%}
.dl.playing .mt-wv i{animation:mtwv .8s ease-in-out infinite alternate;background:var(--acc)}
.dl.playing .mt-wv i:nth-child(2n){animation-delay:.25s}
@keyframes mtwv{to{height:20%}}
.mt-pyl{font-size:16px;color:var(--ink);line-height:1.5}
.mt-peek{display:inline-flex;align-items:center;gap:4px;margin-top:4px;border:0;background:none;color:var(--acc);font:inherit;font-size:12.5px;font-weight:700;cursor:pointer;padding:6px 0;min-height:32px}
.mt-peek .ic-svg{width:15px;height:15px}
.dl.me .mt-rl{display:none}.dl.me.rev .mt-rl{display:block}
.mt-shadow{margin-top:6px}
.mt-shp{display:flex;align-items:center;gap:4px;flex-wrap:wrap;margin-bottom:10px}
.mt-shp i{width:18px;height:6px;border-radius:9px;background:var(--line)}
.mt-shp i.on{background:color-mix(in srgb,var(--acc) 55%,transparent)}
.mt-shp i.cur{background:var(--acc);width:28px}
.mt-shp small{margin-left:6px;color:var(--ink3)}
.mt-shl{display:flex;gap:10px;align-items:flex-start;padding:14px;border-radius:var(--r-lg);background:var(--surface2);border:1px solid var(--line)}
.mt-shl .dl-l{font-size:22px}
.mt-steps{margin:10px 0 6px;padding-left:20px;color:var(--ink2);line-height:1.5}
.mt-shc,.mt-shn,.mt-recrow{gap:8px;margin-top:8px;align-items:center}
.mt-shc .btn,.mt-shn .btn{min-height:42px}
.mt-rec.rec{animation:mtpulse 1s ease-in-out infinite}
@keyframes mtpulse{50%{box-shadow:0 0 0 6px color-mix(in srgb,var(--bad) 25%,transparent)}}
.mt-norec{display:inline-flex;gap:6px;align-items:center}
.mt-norec .ic-svg{width:15px;height:15px}
.mt-card .mt-gt{margin:6px 0 8px;font-size:17px}
.mt-wk{margin-top:10px;padding:10px;border-radius:var(--r-md);background:var(--surface2)}
.mt-wkh{display:flex;gap:6px;align-items:center;font-size:12.5px;font-weight:700;color:var(--ink2);margin-bottom:4px}
.mt-wkh .ic-svg{width:16px;height:16px}
.mt-exn{width:22px;height:22px;flex:none;border-radius:50%;display:grid;place-items:center;background:var(--acc-soft);color:var(--acc);font-size:12px;font-weight:800;margin-top:4px}
.mt-picto{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
.mt-picto span{display:flex;align-items:center;gap:4px;padding:4px 8px;border-radius:12px;background:var(--surface2);color:var(--acc)}
.mt-picto b{color:var(--ink);font-size:18px}
.mt-next{display:flex;gap:6px;align-items:center;margin-top:10px}
.mt-next .ic-svg{width:16px;height:16px}
.mt-ask{font-size:15px;line-height:1.5;margin:10px 0}
.mt-ans{padding:12px;border-radius:var(--r-md);background:color-mix(in srgb,var(--ok) 9%,transparent);border:1px solid color-mix(in srgb,var(--ok) 25%,transparent)}
.mt-ans p{margin:0 0 6px;line-height:1.5}.mt-ans p:last-child{margin:0}
.mt-ans .ic-svg{width:14px;height:14px;color:var(--ok);vertical-align:-2px}
.mt-ans.hid{display:none}
.mt-spq{display:flex;gap:10px;align-items:flex-start;margin-top:6px}
.mt-tpl{margin-top:12px;padding:12px;border-radius:var(--r-md);border:1.5px dashed var(--acc-line);background:color-mix(in srgb,var(--acc) 5%,transparent)}
.mt-tpl small{display:block;color:var(--ink3)}
.mt-tpl .hz{font-size:21px;margin:4px 0}
.mt-gap{color:var(--acc);font-weight:800;border-bottom:2px solid var(--acc);padding:0 4px}
.mt-rate{width:100%;display:flex;flex-direction:column;gap:6px;text-align:center}
.mt-rate .btn{min-height:48px}
.mt-misc{text-align:center;padding:10px 0}
.mt-misc .ic-tile{margin:0 auto 6px}
.mt-misc h2{margin:6px 0}
.mt-bctx{display:flex;flex-wrap:wrap;gap:6px;align-items:center;justify-content:center;margin:6px 0;padding:8px 10px;border-radius:var(--r-md);background:var(--surface2)}
.mt-bctx .hz{font-size:18px}
.mt-bctx small{flex-basis:100%;text-align:center;color:var(--ink3)}
.mt-bform{text-align:center;margin-top:4px}
.mt-sched{margin:12px 0;padding:12px;border-radius:var(--r-md);background:var(--surface2);text-align:left}
.mt-sched b{display:flex;gap:6px;align-items:center}
.mt-sched b .ic-svg{width:17px;height:17px}
.mt-sched ul{margin:6px 0 0;padding:0;list-style:none}
.mt-sched li{display:flex;gap:8px;align-items:center;padding:4px 0;border-top:1px solid var(--line);font-size:14px}
.mt-sched li b{flex:1;font-family:var(--hz);font-weight:600}
.mt-sched em{font-style:normal;font-weight:700;font-size:12.5px}
.mt-sched em.ok{color:var(--ok)}.mt-sched em.bad{color:var(--bad)}
.mt-misnote{display:flex;gap:6px;align-items:center;justify-content:center;margin:8px 0;font-size:13px;color:var(--ink2)}
.mt-misnote .ic-svg{width:16px;height:16px}
.mt-rtop{display:flex;flex-wrap:wrap;gap:8px;align-items:flex-start;margin-bottom:6px}

.mt-why.mini{background:none;border:0;margin-top:6px}
.mt-why.mini>summary{padding:4px 0;min-height:36px;font-size:12.5px;font-weight:600}
.mt-why.mini>summary span{flex:0 1 auto}
.mt-why.mini p{padding:0 0 8px}
.mt-shl .dl-sp{flex:none;padding:3px 9px;border-radius:99px;background:var(--acc);color:var(--on-acc);font-size:12.5px;font-weight:700;font-family:var(--hz)}
.mt-pr .small .hz{font-size:inherit}
.mt-pr>.grow>.small{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.mt-rate .btn{white-space:nowrap;padding-left:8px;padding-right:8px}
.mt-rtop .mt-why{flex:1 1 260px;margin:0}
@media (max-width:420px){.mt-lv .seg button span{font-size:10.5px}.mt-pace button{font-size:13px}.mt-pr{gap:10px;padding:10px}}
`;
  document.head.appendChild(st);
})();