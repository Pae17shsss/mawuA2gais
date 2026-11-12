/* ========== KELAS · 華語準備級課程(一) L1–6 + 當代中文課程 第一冊 L6–16 — Xiǎobù Kelas V0.2 ==========
   Materi diambil dari PDF kelas: kosakata (inti + tambahan), dialog, grammar, latihan.
   Semua kata lesson memakai mesin yang sama (SRS, suara, arcade), tapi arti & pengecoh diambil dari lesson. */
const KLS_VER = 'V1.7';
ICON_PATHS.class = '<path d="M3 8.2 12 4l9 4.2-9 4.2z"/><path d="M6.6 10v4.6c0 1.6 2.4 3 5.4 3s5.4-1.4 5.4-3V10"/><path d="M21 8.2v5.4"/>';
ICON_PATHS.cards = '<rect x="3.2" y="6.4" width="12.4" height="14" rx="2.2"/><path d="M8.4 6.4V5a1.8 1.8 0 0 1 1.8-1.8h8.6A1.8 1.8 0 0 1 20.6 5v11.2a1.8 1.8 0 0 1-1.8 1.8h-3.2"/>';
ICON_PATHS.mic = '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.6 11a6.4 6.4 0 0 0 12.8 0M12 17.4V21M8.6 21h6.8"/>';
ICON_PATHS.crown = '<path d="M3.6 8.4 8 12l4-6.4 4 6.4 4.4-3.6-1.8 9.2H5.4z"/><path d="M5.4 20.4h13.2"/>';

const KLM = {}; KLS.forEach(L => { KLM[L.n] = L; });
const KL = n => KLM[n];
const COURSES = [
  { k: 'prep', zh: '華語準備級課程(一)', en: 'Basic Mandarin', ic: 'seed' },
  { k: 'b1', zh: '當代中文課程 第一冊', en: 'A Course in Contemporary Chinese 1', ic: 'book' },
  { k: 'sd', zh: '時代華語 1', en: 'Modern Chinese 1 · Khatam Band A', ic: 'award', own: true }
];
const isOwnL = L => { const C = COURSES.find(c => c.k === L.course); return !!(C && C.own); };
const lnShort = n => { const L = KL(n); return L.course === 'b1' ? 'B1-L' + L.num : L.course === 'sd' ? 'MC-L' + L.num : 'L' + L.num; };
const lnLong = n => { const L = KL(n); return (L.course === 'b1' ? 'Book 1 · ' : L.course === 'sd' ? '時代華語 1 · ' : '') + 'Lesson ' + L.num + ' · 第' + numZh(L.num) + '課'; };
const CORE_G = ['core', 'd1', 'd2'];
const isCore = v => CORE_G.includes(v.g);
const KN = () => KLS.length;
const kx = o => (o ? o[meanLang()] || o.en || o.id || '' : '');
const kT = o => (o ? [o.id, o.en, o.tl, o.vi] : ['', '', '', '']);
function klState() {
  if (!S.kls || typeof S.kls !== 'object') S.kls = {};
  const k = S.kls; ['r', 'fc', 'done', 'seen'].forEach(x => { if (!k[x] || typeof k[x] !== 'object') k[x] = {}; });
  if (!k.mode) k.mode = 'step';
  return k;
}
const KROUNDS = [
  { k: 1, ic: 'seed', ti: 'Kenalan kata', sub: 'Maks. 20 kata inti per sesi, lalu cek cepat arti', cat: 'kenal' },
  { k: 2, ic: 'headphone', ti: 'Dengar & bedakan', sub: 'Tebak dari suara, nada, dan bentuk hanzi', cat: 'hafal' },
  { k: 3, ic: 'brain', ti: 'Kartu ingat', sub: 'Ingat dulu tanpa melihat, lalu nilai sendiri', cat: 'hafal' },
  { k: 4, ic: 'grammar', ti: 'Pola kalimat', sub: 'Grammar lesson, isi titik-titik, susun kalimat', cat: 'paham' },
  { k: 5, ic: 'chat', ti: 'Dialog & bacaan', sub: 'Pahami percakapan, pilih jawaban, benar/salah', cat: 'paham' },
  { k: 6, ic: 'crown', ti: 'Ujian khatam', sub: '20 soal campur — lulus ≥ 80% = lesson khatam', cat: 'latih' }
];
const KPASS = { 1: 70, 2: 70, 3: 60, 4: 70, 5: 70, 6: 80 };
const roundScore = (n, k) => klState().r[n + '-' + k];
const coreLeft = n => klWords(n, 'core').filter(i => !S.cards[i]).length;
const roundDone = (n, k) => (roundScore(n, k) || 0) >= KPASS[k] && !(k === 1 && coreLeft(n) > 0);
const lessonDone = n => !!klState().done[n];
const lessonPct = n => KROUNDS.filter(r => roundDone(n, r.k)).length / KROUNDS.length;
const nextRound = n => KROUNDS.find(r => !roundDone(n, r.k)) || null;
function nextLesson(course) { for (const L of KLS) if ((course ? L.course === course : !isOwnL(L)) && !lessonDone(L.n)) return L.n; return null; }

/* ---------- kata per lesson (id kata di daftar utama W) ---------- */
function klWords(ns, scope = 'all') {
  const out = []; const seen = new Set();
  [].concat(ns).forEach(n => KL(n).vocab.forEach(v => { if (scope === 'core' && !isCore(v)) return; if (v.wid === undefined || seen.has(v.wid)) return; seen.add(v.wid); out.push(v.wid); }));
  return out;
}
function klVocab(wid) { for (const L of KLS) { const v = L.vocab.find(x => x.wid === wid); if (v) return Object.assign({ n: L.n }, v); } return null; }
/* arti & pengecoh diambil dari lesson selama sesi kelas berjalan */
let KLS_POOL = [];
const distractK = distract;
distract = function (w, n, key, sameLen) {
  if (KLS_ON && KLS_POOL.length > n + 2) {
    const k0 = key(w); const out = [];
    let pool = KLS_POOL.map(i => W[i]).filter(x => x && x.i !== w.i && x.m && key(x) !== k0 && x.w !== w.w);
    if (sameLen) { const p2 = pool.filter(x => x.s.length === w.s.length); if (p2.length >= n) pool = p2; }
    const pos = (w.o || '').split('/')[0]; const same = pool.filter(x => (x.o || '').split('/')[0] === pos);
    for (const src of [shuffle(same), shuffle(pool)]) for (const x of src) { if (out.length >= n) break; if (!out.some(o => key(o) === key(x))) out.push(x); }
    if (out.length >= n) return out;
  }
  return distractK(w, n, key, sameLen);
};

/* ---------- kalimat lesson → token ruby (pakai cxLine dari v11) ---------- */
const isHanK = c => /[㐀-鿿〇]/.test(c);
function klS(zh, py, target) {
  const syl = String(py || '').split(/\s+/).filter(x => /[\p{L}]/u.test(x)); const toks = []; let si = 0;
  for (const ch of zh) { if (isHanK(ch)) { const raw = syl[si++] || ''; toks.push({ c: ch, py: raw.replace(/[^\p{L}\p{M}]/gu, ''), han: 1 }); } else toks.push({ c: ch, han: 0 }); }
  if (toks[0] && toks[0].han && toks[0].py) toks[0].py = toks[0].py.charAt(0).toLowerCase() + toks[0].py.slice(1);
  const zs = toks.map(x => x.c).join(''); const tg = new Array(toks.length).fill(false);
  if (target) { const at = zs.indexOf(target); if (at >= 0) for (let j = at; j < at + target.length; j++) tg[j] = true; }
  return { zh: zs, toks, tg };
}
const klLine = (zh, py, o = {}) => cxLine(klS(zh, py, o.tg), { mode: o.mode || 'ruby', tap: o.tap, nolv: o.nolv });
function klTrRows(o, main) {
  const L = cxLangs(); const sp = (l, v) => (TTS.ok ? `<button class="cx-sp" data-cx="sayl" data-l="${l}" data-v="${esc(v)}" aria-label="${t('dengar')}">${ICON('speaker')}</button>` : '');
  return `<div class="cx-tr"><div class="cx-main"><span class="lg">${LANG_LABEL[L[0]]}</span><span class="grow">${esc(o[L[0]] || '')}</span>${sp(L[0], o[L[0]])}</div>
    ${main ? '' : `<div class="cx-oth">${L.slice(1).filter(l => o[l]).map(l => `<div><span class="lg">${LANG_LABEL[l]}</span><span class="grow">${esc(o[l])}</span>${sp(l, o[l])}</div>`).join('')}</div>`}</div>`;
}
function klSay(zh, inSes) {
  const a = inSes ? 'data-s="saysent"' : 'data-cx="say"';
  return `<button class="speak mini" ${a} data-v="${esc(zh)}" aria-label="${t('Putar suara')}">${ICON('speaker')}</button><button class="btn ghost small" ${a} data-slow="1" data-v="${esc(zh)}">${ICON('slow')} ${t('pelan')}</button>`;
}
