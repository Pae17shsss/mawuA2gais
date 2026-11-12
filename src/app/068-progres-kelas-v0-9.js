/* ========== PROGRES (Kelas V0.9) ==========
   Satu model status untuk kata, grammar, hanzi & lesson — bisa dilacak DAN dikendalikan sendiri.
   Kata:    0 Baru · 1 Belajar · 2 Kenal · 3 Paham · 4 Hafal · -1 Abaikan  (otomatis dari kartu FSRS, bisa diubah manual)
   Grammar: 0 Belum · 1 Ragu · 2 Paham                                      (dari skor latihan, bisa diubah manual)
   Data manual disimpan di S.prog dengan kunci STABIL: bentuk kata (W[i].w), id grammar, karakter.        */

Object.assign(I18N, {
  'Progres': ['Progress', 'Progreso'], 'Progres belajar': ['Learning progress', 'Progreso sa pag-aaral'],
  'Lacak & atur kata, grammar, hanzi': ['Track & control words, grammar, hanzi', 'Subaybayan ang salita, grammar, hanzi'],
  'Baru': ['New', 'Bago'], 'Belajar': ['Learning', 'Nag-aaral'], 'Kenal': ['Familiar', 'Kilala'], 'Paham': ['Understood', 'Naiintindihan'], 'Hafal': ['Mastered', 'Kabisado'], 'Abaikan': ['Ignore', 'Laktawan'], 'Diabaikan': ['Ignored', 'Nilaktawan'],
  'Belum': ['Not yet', 'Hindi pa'], 'Ragu': ['Unsure', 'Alanganin'],
  'Ringkasan': ['Summary', 'Buod'], 'Kosakata': ['Vocabulary', 'Bokabularyo'], 'Grammar': ['Grammar', 'Grammar'], 'Hanzi': ['Hanzi', 'Hanzi'], 'Lesson': ['Lessons', 'Mga aralin'],
  'Sudah paham': ['I know this', 'Alam ko na'], 'Belum paham': ["Don't know yet", 'Hindi pa alam'], 'Reset ke baru': ['Reset to new', 'Ibalik sa bago'],
  'Latih yang lemah': ['Practice weak ones', 'Sanayin ang mahihina'], 'Latih pilihan': ['Practice selection', 'Sanayin ang napili'],
  'Semua': ['All', 'Lahat'], 'Semua kata': ['All words', 'Lahat ng salita'], 'Urutan': ['Default order', 'Default na ayos'], 'Terlemah dulu': ['Weakest first', 'Pinakamahina muna'], 'Jatuh tempo': ['Due soonest', 'Pinakamalapit na due'], 'Terakhir dipelajari': ['Recently studied', 'Kamakailang pinag-aralan'],
  'Akurasi 30 hari': ['30-day accuracy', 'Katumpakan 30 araw'], 'Menit 30 hari': ['Minutes (30 days)', 'Minuto (30 araw)'], 'Ingatan rata-rata': ['Average recall', 'Karaniwang alaala'], 'Jatuh tempo hari ini': ['Due today', 'Due ngayon'],
  'Tren 30 hari': ['30-day trend', 'Takbo ng 30 araw'], 'Jawaban per hari': ['Answers per day', 'Sagot bawat araw'], 'Kata baru per hari': ['New words per day', 'Bagong salita bawat araw'], 'Akurasi harian': ['Daily accuracy', 'Araw-araw na katumpakan'],
  'Ramalan ulangan 7 hari': ['7-day review forecast', 'Hula ng review sa 7 araw'], 'Penguasaan per level TOCFL': ['Mastery by TOCFL level', 'Kahusayan bawat level ng TOCFL'], 'Penguasaan per lesson': ['Mastery by lesson', 'Kahusayan bawat aralin'],
  'kata ≥ Paham': ['words ≥ Understood', 'salita ≥ Naiintindihan'], 'langkah': ['steps', 'hakbang'], 'Buka lesson': ['Open lesson', 'Buksan ang aralin'], 'Buka': ['Open', 'Buksan'], 'Latih': ['Practice', 'Sanayin'],
  'Cari hanzi, pinyin, arti…': ['Search hanzi, pinyin, meaning…', 'Hanapin ang hanzi, pinyin, kahulugan…'], 'Sumber': ['Source', 'Pinagmulan'], 'Urutkan': ['Sort', 'Ayusin'],
  'Ulang berikutnya': ['Next review', 'Susunod na review'], 'Tidak ada kata yang cocok.': ['No matching words.', 'Walang tugmang salita.'],
  'Pola umum': ['General patterns', 'Pangkalahatang pattern'], 'dari latihan': ['from practice', 'mula sa pagsasanay'], 'manual': ['manual', 'manwal'],
  'Sudah ditulis': ['Written', 'Naisulat na'], 'Belum ditulis': ['Not written', 'Hindi pa naisulat'], 'Latih tulis': ['Practice writing', 'Sanayin ang pagsulat'], 'Detail hanzi': ['Hanzi details', 'Detalye ng hanzi'],
  'Lihat progres': ['See progress', 'Tingnan ang progreso'], 'Kata di sesi ini': ['Words in this session', 'Mga salita sa sesyong ito'],
  'maks': ['max', 'max'], 'rata-rata': ['average', 'karaniwan'], 'kartu': ['cards', 'card'], 'streak': ['streak', 'streak'], 'lupa': ['lapses', 'nakalimutan'], 'Otomatis': ['Automatic', 'Awtomatiko'],
  'Halaman': ['Page', 'Pahina'], 'hari ini': ['today', 'ngayon'], 'besok': ['tomorrow', 'bukas'], 'Telat': ['Overdue', 'Huli na'],
  'kata': ['words', 'salita'], 'pola': ['patterns', 'pattern'], 'huruf': ['characters', 'titik'], 'Kartu kata': ['Word card', 'Card ng salita'],
  'Ubah status {n} kata ini?': ['Change the status of these {n} words?', 'Palitan ang status ng {n} salitang ito?'],
  'Status diubah: {n} kata': ['Status changed: {n} words', 'Napalitan ang status: {n} salita'],
  'Status hanzi': ['Hanzi status', 'Status ng hanzi'], 'Kata dengan huruf ini': ['Words with this character', 'Mga salitang may ganitong titik'],
  'Kamu yang pegang kendali: tap status untuk mengubahnya. Status otomatis ikut hasil latihan berikutnya.': ['You are in control: tap a status to change it. Automatic status follows your next practice.', 'Ikaw ang may kontrol: i-tap ang status para palitan. Susunod ito sa susunod mong pagsasanay.']
});
Object.assign(I18N_VI, {
  'Progres': 'Tiến độ', 'Progres belajar': 'Tiến độ học', 'Lacak & atur kata, grammar, hanzi': 'Theo dõi & điều chỉnh từ, ngữ pháp, chữ Hán',
  'Baru': 'Mới', 'Belajar': 'Đang học', 'Kenal': 'Quen', 'Paham': 'Hiểu', 'Hafal': 'Thuộc', 'Abaikan': 'Bỏ qua', 'Diabaikan': 'Đã bỏ qua', 'Belum': 'Chưa', 'Ragu': 'Phân vân',
  'Ringkasan': 'Tổng quan', 'Kosakata': 'Từ vựng', 'Lesson': 'Bài học', 'Sudah paham': 'Đã biết', 'Belum paham': 'Chưa biết', 'Reset ke baru': 'Đặt lại là mới',
  'Latih yang lemah': 'Luyện từ yếu', 'Latih pilihan': 'Luyện phần đã chọn', 'Semua': 'Tất cả', 'Semua kata': 'Tất cả từ', 'Urutan': 'Thứ tự mặc định', 'Terlemah dulu': 'Yếu nhất trước', 'Jatuh tempo': 'Sắp đến hạn', 'Terakhir dipelajari': 'Học gần đây',
  'Akurasi 30 hari': 'Độ chính xác 30 ngày', 'Menit 30 hari': 'Phút (30 ngày)', 'Ingatan rata-rata': 'Trí nhớ trung bình', 'Jatuh tempo hari ini': 'Đến hạn hôm nay',
  'Tren 30 hari': 'Xu hướng 30 ngày', 'Jawaban per hari': 'Câu trả lời mỗi ngày', 'Kata baru per hari': 'Từ mới mỗi ngày', 'Akurasi harian': 'Độ chính xác hằng ngày',
  'Ramalan ulangan 7 hari': 'Dự báo ôn tập 7 ngày', 'Penguasaan per level TOCFL': 'Mức thành thạo theo cấp TOCFL', 'Penguasaan per lesson': 'Mức thành thạo theo bài',
  'kata ≥ Paham': 'từ ≥ Hiểu', 'langkah': 'bước', 'Buka lesson': 'Mở bài', 'Buka': 'Mở', 'Latih': 'Luyện', 'Cari hanzi, pinyin, arti…': 'Tìm chữ Hán, pinyin, nghĩa…', 'Sumber': 'Nguồn', 'Urutkan': 'Sắp xếp',
  'Ulang berikutnya': 'Ôn lần tới', 'Tidak ada kata yang cocok.': 'Không có từ phù hợp.', 'Pola umum': 'Mẫu câu chung', 'dari latihan': 'từ bài luyện', 'manual': 'thủ công',
  'Sudah ditulis': 'Đã viết', 'Belum ditulis': 'Chưa viết', 'Latih tulis': 'Luyện viết', 'Detail hanzi': 'Chi tiết chữ Hán', 'Lihat progres': 'Xem tiến độ', 'Kata di sesi ini': 'Từ trong buổi học này',
  'maks': 'tối đa', 'rata-rata': 'trung bình', 'kartu': 'thẻ', 'streak': 'chuỗi', 'lupa': 'quên', 'Otomatis': 'Tự động',
  'Halaman': 'Trang', 'hari ini': 'hôm nay', 'besok': 'ngày mai', 'Telat': 'Quá hạn', 'kata': 'từ', 'pola': 'mẫu', 'huruf': 'chữ', 'Kartu kata': 'Thẻ từ',
  'Ubah status {n} kata ini?': 'Đổi trạng thái {n} từ này?', 'Status diubah: {n} kata': 'Đã đổi trạng thái: {n} từ', 'Status hanzi': 'Trạng thái chữ Hán', 'Kata dengan huruf ini': 'Từ có chữ này',
  'Kamu yang pegang kendali: tap status untuk mengubahnya. Status otomatis ikut hasil latihan berikutnya.': 'Bạn làm chủ: chạm vào trạng thái để đổi. Trạng thái tự động sẽ theo kết quả luyện tập tiếp theo.'
});

ICON_PATHS.progress = '<path d="M4 20h16"/><rect x="5.5" y="12" width="3" height="5.5" rx="1"/><rect x="10.5" y="8.5" width="3" height="9" rx="1"/><rect x="15.5" y="4.5" width="3" height="13" rx="1"/>';

/* ---------- konstanta & state ---------- */
const PST = ['Baru', 'Belajar', 'Kenal', 'Paham', 'Hafal'];
const PGST = ['Belum', 'Ragu', 'Paham'];
const PST_IV = { 2: 3, 3: 12, 4: 45 };           // stabilitas (hari) saat ditandai manual
const PG_PER = 50, PH_PER = 120;
const PV = { tab: 'dash', st: 'all', src: 'all', q: '', sort: 'order', page: 0, open: null, gst: 'all', gsrc: 'all', hst: 'all', hw: 'all', hpage: 0 };
const pstName = s => t(s === -1 ? 'Diabaikan' : PST[s] || PST[0]);
const pgName = s => t(PGST[s] || PGST[0]);

function progS() {
  if (!S.prog || typeof S.prog !== 'object' || Array.isArray(S.prog)) S.prog = {};
  const p = S.prog; ['w', 'g', 'c'].forEach(k => { if (!p[k] || typeof p[k] !== 'object' || Array.isArray(p[k])) p[k] = {}; });
  return p;
}
const isIgn = c => !!c && !!c.ign && !(c.lr > (c.ignT || 0));

/* ---------- status kata ---------- */
function wordAuto(c, now = Date.now()) {
  if (!c) return 0;
  if (isIgn(c)) return -1;
  fsrsMigrate(c);
  if ((!c.lrated && !(c.r > 0)) || c.ph !== 'rev') return 1;
  const R = fsrsR((now - (c.lr || now)) / DAY, c.s);
  let st = c.s >= 21 && R >= 0.8 ? 4 : c.s >= 7 && R >= 0.7 ? 3 : 2;
  if (c.lp >= 3 && st > 2 && c.s < 21) st = 2;    // kata "bandel" belum boleh dianggap paham
  return st;
}
function wordStatus(i) {
  const w = W[i]; if (!w) return 0;
  const c = S.cards[i]; const o = S.prog && S.prog.w && S.prog.w[w.w];
  if (o && (!c || !(c.lr > o.t))) return o.s === -1 ? -1 : (c || o.s === 0 ? o.s : 0);
  return wordAuto(c);
}
const wordManual = i => { const w = W[i]; const o = w && S.prog && S.prog.w && S.prog.w[w.w]; const c = S.cards[i]; return !!o && (!c || !(c.lr > o.t)); };
function setWordStatus(i, s, quiet) {
  const w = W[i]; if (!w) return;
  s = s === 'known' ? 3 : s === 'unknown' ? 1 : s === 'ign' ? -1 : +s;
  const P = progS(); const now = Date.now(); let c = S.cards[i];
  if (s === -1) {
    if (!c) c = S.cards[i] = { iv: 3650, ef: 2.4, due: now + 3650 * DAY, r: 0, lp: 0, st: 0, ls: now, add: todayKey(), ign: 1, ignT: now };
    else { if (!isIgn(c)) c.ignDue = c.due; c.ign = 1; c.ignT = now; c.due = now + 3650 * DAY; }
    P.w[w.w] = { s: -1, t: now };
  } else if (s === 0) {
    delete S.cards[i]; delete P.w[w.w];
  } else {
    if (!c) c = introduce(i);
    fsrsMigrate(c);
    const wasIgn = !!c.ign; delete c.ign; delete c.ignT;
    if (s === 1) { c.ph = 'learn'; c.step = 0; c.s = Math.min(c.s || 0.4, 0.4); c.iv = 0; c.due = now; }
    else if (wordAuto(c, now) !== s || wasIgn) {
      c.s = PST_IV[s]; c.d = clamp(c.d || 5, 1, 10); c.ph = 'rev'; c.lrated = 1; c.r = Math.max(c.r || 0, 1);
      c.lr = now; c.ls = now; c.iv = Math.max(1, Math.round(fsrsIvl(c.s))); c.due = now + c.iv * DAY;
      if (s >= 3) c.lp = Math.min(c.lp || 0, 2);
    }
    if (wasIgn && c.ignDue && s !== 1 && c.due > now + 3000 * DAY) c.due = c.ignDue;
    delete c.ignDue;
    P.w[w.w] = { s, t: now + 1 };
  }
  PG_C = null; if (!quiet) save();
}
function progSetMany(ids, s) { ids.forEach(i => setWordStatus(i, s, true)); PG_C = null; save(); }

/* ---------- grammar ---------- */
let PG_GL = null;
function progGramList() {
  if (PG_GL) return PG_GL;
  const out = [];
  if (typeof GRAMMAR !== 'undefined') GRAMMAR.forEach(g => out.push({ id: g.k, src: 'gp', lv: g.lv, form: g.form, name: () => gramTxt(g.name) }));
  if (typeof KLS !== 'undefined') KLS.forEach(L => { const seen = {}; (L.grammar || []).forEach((g, gi) => { let k = g.k || String(gi); if (seen[k]) k += '_' + gi; seen[k] = 1; out.push({ id: 'L' + L.n + ':' + k, src: 'L', n: L.n, gi, form: g.form, name: () => kx(g.t) }); }); });
  return (PG_GL = out);
}
const gramItem = gid => progGramList().find(g => g.id === gid);
function lessonGramScore(n) {
  const L = KL(n); if (!L) return undefined;
  if (L.course === 'sd' && typeof kbScore === 'function') return kbScore(n, 'gram');
  return klState().r[n + '-4'];
}
function gramAuto(g) {
  if (!g) return 0;
  if (g.src === 'gp') return gramSeen(g.id) ? 2 : 0;
  const sc = lessonGramScore(g.n); if (sc === undefined) return 0;
  return sc >= 80 ? 2 : 1;
}
function gramStatus(gid) { const o = S.prog && S.prog.g && S.prog.g[gid]; if (o) return o.s; return gramAuto(gramItem(gid)); }
function setGramStatus(gid, s) {
  s = +s; const P = progS(); P.g[gid] = { s, t: Date.now() };
  const g = gramItem(gid); if (g && g.src === 'gp' && s === 2) gramMark(gid);
  PG_C = null; save();
}

/* ---------- hanzi ---------- */
function charStatus(ch, idx) {
  const o = S.prog && S.prog.c && S.prog.c[ch]; if (o) return o.s;
  const X = idx || progIdx(); return X.chMax[ch] || 0;
}
function charWrite(ch) {
  if (typeof hzLevel === 'function') { try { const v = hzLevel(ch); if (typeof v === 'number' && isFinite(v)) return { lv: v, n: (S.hzWrite || {})[ch] || 0 }; } catch (e) { } }
  return { lv: null, n: (S.hzWrite || {})[ch] || 0 };
}
function setCharStatus(ch, s) { const P = progS(); if (s === null || s === undefined || s === '') delete P.c[ch]; else P.c[ch] = { s: +s, t: Date.now() }; PG_C = null; save(); }

/* ---------- indeks turunan (di-cache per render) ---------- */
let PG_C = null;
function progIdx() {
  if (PG_C) return PG_C;
  const now = Date.now(); const n = W.length;
  const st = new Int8Array(n); const str = new Float32Array(n);
  const cnt = { '-1': 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 }; const lv = {};
  const P = S.prog && S.prog.w || {};
  const chMax = {}; const chWords = {};
  let sumR = 0, nR = 0;
  for (let i = 0; i < n; i++) {
    const w = W[i]; const c = S.cards[i]; const o = P[w.w];
    let s;
    if (o && (!c || !(c.lr > o.t))) s = o.s === -1 ? -1 : (c || o.s === 0 ? o.s : 0); else s = wordAuto(c, now);
    st[i] = s; cnt[s]++;
    if (c && s > 0) { const R = recallProb(i, now); str[i] = clamp(Math.log2(1 + (c.s || 0)) / Math.log2(61), 0, 1) * (0.4 + 0.6 * R); sumR += R; nR++; }
    const L = lv[w.l] || (lv[w.l] = [0, 0, 0, 0, 0, 0, 0]); L[s + 1]++;
    if (s > 0) for (const ch of w.w) { if (!isHan(ch)) continue; if (!(chMax[ch] >= s)) chMax[ch] = s; (chWords[ch] || (chWords[ch] = [])).push(i); }
  }
  return (PG_C = { st, str, cnt, lv, chMax, chWords, avgR: nR ? sumR / nR : 0, now });
}
function progSummary() {
  const X = progIdx(); const c = X.cnt;
  const g = progGramList(); const gc = [0, 0, 0]; g.forEach(x => gc[clamp(gramStatus(x.id), 0, 2)]++);
  const hc = [0, 0, 0, 0, 0]; Object.keys(X.chMax).concat(Object.keys((S.prog && S.prog.c) || {})).forEach((ch, k, a) => { if (a.indexOf(ch) !== k) return; hc[clamp(charStatus(ch, X), 0, 4)]++; });
  return { words: { new: c[0], learning: c[1], familiar: c[2], understood: c[3], mastered: c[4], ignored: c[-1], studied: c[1] + c[2] + c[3] + c[4], total: W.length },
    grammar: { not: gc[0], unsure: gc[1], understood: gc[2], total: g.length }, hanzi: { seen: hc.reduce((a, b) => a + b, 0) - hc[0], understood: hc[3] + hc[4], byStatus: hc }, avgRecall: X.avgR };
}

/* ---------- sumber kata & lesson ---------- */
const lessonCourseName = c => { const C = typeof COURSES !== 'undefined' && COURSES.find(x => x.k === c); return C ? C.zh : c; };
function progSrcIds(src) {
  if (src === 'all') return null;
  if (src === 'a2') { const o = []; for (let i = 0; i < W.length; i++) if (W[i].l < 4) o.push(i); return o; }
  if (/^l\d$/.test(src)) { const l = +src[1]; const o = []; for (let i = 0; i < W.length; i++) if (W[i].l === l) o.push(i); return o; }
  if (/^k\d+$/.test(src) && KL(+src.slice(1))) return klWords(+src.slice(1));
  return null;
}
function progSrcLabel(src) {
  if (src === 'all') return t('Semua kata'); if (src === 'a2') return 'TOCFL A2';
  if (/^l\d$/.test(src)) { const L = LEVELS[+src[1]]; return L ? L.en + ' · ' + L.name : src; }
  if (/^k\d+$/.test(src)) { const n = +src.slice(1); return KL(n) ? lnShort(n) + ' ' + KL(n).title.zh : src; }
  return src;
}
function lessonStats(n, X = progIdx()) {
  const L = KL(n); const ids = klWords(n); let ok = 0, seen = 0;
  ids.forEach(i => { const s = X.st[i]; if (s >= 3) ok++; if (s > 0) seen++; });
  const gs = progGramList().filter(g => g.src === 'L' && g.n === n); const gOk = gs.filter(g => gramStatus(g.id) === 2).length;
  let steps = 0, stepsT = 0;
  if (L.course === 'sd' && typeof kbStages === 'function') { const sts = kbStages(n); stepsT = sts.length; steps = sts.filter(k => kbStageDone(n, k)).length; }
  else if (typeof KROUNDS !== 'undefined') { stepsT = KROUNDS.length; steps = KROUNDS.filter(r => roundDone(n, r.k)).length; }
  return { n: ids.length, ok, seen, pct: ids.length ? ok / ids.length : 0, g: gs.length, gOk, steps, stepsT };
}

/* ---------- komponen kecil ---------- */
const pPill = (s, attrs = '') => `<button class="pg-pill ps${s < 0 ? 'x' : s}" ${attrs}>${esc(pstName(s))}</button>`;
function pStack(arr, total) {
  // arr = jumlah per status [ign, 0,1,2,3,4]; batang bertumpuk berlabel (judul = tooltip)
  const tot = total || arr.reduce((a, b) => a + b, 0) || 1; const ord = [4, 3, 2, 1];
  return `<div class="pg-stack" role="img" aria-label="${ord.map(s => pstName(s) + ' ' + arr[s + 1]).join(', ')}">${ord.map(s => arr[s + 1] ? `<i class="ps${s}" style="width:${(arr[s + 1] / tot * 100).toFixed(2)}%" title="${esc(pstName(s))}: ${arr[s + 1]}"></i>` : '').join('')}</div>`;
}
function dueLabel(c, now) {
  if (!c || isIgn(c)) return '—';
  const d = c.due - now; if (d <= 0) return `<span class="pg-late">${t('Telat')}</span>`;
  const days = keyDiff(todayKey(), todayKey(new Date(c.due)));
  if (days === 0) return t('hari ini'); if (days === 1) return t('besok');
  return fmtIvl(d);
}
const pyPlain = w => (w.y && w.y.length ? w.y.join(' ') : w.p || '');

/* ---------- grafik (SVG inline, warna dari token) ---------- */
function pgBars(vals, labels, o = {}) {
  const Wd = 300, H = o.h || 70, pad = 2; const n = vals.length; const mx = Math.max(o.min || 1, ...vals);
  const bw = Wd / n; const tot = vals.reduce((a, b) => a + b, 0);
  const bars = vals.map((v, k) => { const h = v ? Math.max(2, v / mx * (H - 4)) : 0; const x = k * bw + pad / 2; return `<g><rect class="pg-hit" x="${k * bw}" y="0" width="${bw}" height="${H}"/>${h ? `<rect class="${o.cls || 'pg-bar'} ${k === n - 1 && o.today ? 'today' : ''}" x="${x.toFixed(1)}" y="${(H - h).toFixed(1)}" width="${Math.max(1, bw - pad).toFixed(1)}" height="${h.toFixed(1)}" rx="${Math.min(3, (bw - pad) / 2).toFixed(1)}"/>` : ''}<title>${esc(labels[k])}: ${v}${o.unit || ''}</title></g>`; }).join('');
  return `<div class="pg-chart"><div class="pg-ch-h"><b>${esc(o.title || '')}</b><span>${o.sub !== undefined ? o.sub : `${t('maks')} ${mx}${o.unit || ''} · ${t('total')} ${fmtN(tot)}`}</span></div>
    <svg viewBox="0 0 ${Wd} ${H}" preserveAspectRatio="none" class="pg-svg" style="height:${H}px"><line class="pg-base" x1="0" x2="${Wd}" y1="${H - 0.5}" y2="${H - 0.5}"/>${bars}</svg></div>`;
}
function pgLine(vals, labels, o = {}) {
  const Wd = 300, H = o.h || 56; const n = vals.length; const bw = Wd / n;
  const y = v => (H - 6) - v * (H - 12) + 3;
  const pts = vals.map((v, k) => v === null ? null : [k * bw + bw / 2, y(v)]);
  let d = ''; let pen = false; pts.forEach(p => { if (!p) { pen = false; return; } d += (pen ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + ' '; pen = true; });
  const real = vals.filter(v => v !== null); const avg = real.length ? real.reduce((a, b) => a + b, 0) / real.length : null;
  return `<div class="pg-chart"><div class="pg-ch-h"><b>${esc(o.title || '')}</b><span>${avg === null ? '—' : t('rata-rata') + ' ' + Math.round(avg * 100) + '%'} · ┄ 50/100%</span></div>
    <svg viewBox="0 0 ${Wd} ${H}" preserveAspectRatio="none" class="pg-svg" style="height:${H}px">
    <line class="pg-grid" x1="0" x2="${Wd}" y1="${y(1)}" y2="${y(1)}"/><line class="pg-grid" x1="0" x2="${Wd}" y1="${y(0.5)}" y2="${y(0.5)}"/><line class="pg-base" x1="0" x2="${Wd}" y1="${H - 0.5}" y2="${H - 0.5}"/>
    <path class="pg-line" d="${d}" vector-effect="non-scaling-stroke"/>
    ${pts.map((p, k) => `<g><rect class="pg-hit" x="${k * bw}" y="0" width="${bw}" height="${H}"/>${p ? `<circle class="pg-dot" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="0.01" vector-effect="non-scaling-stroke"/>` : ''}<title>${esc(labels[k])}: ${vals[k] === null ? '—' : Math.round(vals[k] * 100) + '%'}</title></g>`).join('')}</svg>
</div>`;
}
const dayShort = k => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d).toLocaleDateString(LOCALE[S.settings.ui] || 'id-ID', { weekday: 'short' }); };

/* ---------- tampilan: ringkasan ---------- */
function progDash() {
  const X = progIdx(); const c = X.cnt; const tk = todayKey(); const now = Date.now();
  const days30 = []; for (let k = -29; k <= 0; k++) days30.push(keyAdd(tk, k));
  let ok = 0, nAns = 0, ms = 0; days30.forEach(k => { const d = S.days[k]; if (d) { ok += d.ok || 0; nAns += (d.ok || 0) + (d.bad || 0); ms += d.ms || 0; } });
  const lab = days30.map(k => fmtDate(k));
  const ans = days30.map(k => { const d = S.days[k]; return d ? (d.ok || 0) + (d.bad || 0) : 0; });
  const nw = days30.map(k => { const d = S.days[k]; return d ? (d.new || 0) + (d.newx || 0) : 0; });
  const acc = days30.map(k => { const d = S.days[k]; const n = d ? (d.ok || 0) + (d.bad || 0) : 0; return n >= 3 ? d.ok / n : null; });
  // ramalan 7 hari: hari ini termasuk yang telat
  const fc = new Array(7).fill(0); const end0 = endOfToday();
  for (const k in S.cards) { const cd = S.cards[k]; if (isIgn(cd)) continue; const due = cd.due; if (due <= end0) fc[0]++; else { const dd = Math.ceil((due - end0) / DAY); if (dd < 7) fc[dd]++; } }
  const fcLab = fc.map((_, k) => k === 0 ? t('hari ini') : k === 1 ? t('besok') : dayShort(keyAdd(tk, k)));
  const studied = c[1] + c[2] + c[3] + c[4];
  const arr = [c[-1], c[0], c[1], c[2], c[3], c[4]];
  const lvKeys = Object.keys(X.lv).map(Number).sort((a, b) => a - b);
  const kpi = (v, l, a = '') => `<div class="kpi pg-kpi"${a}><b>${v}</b><span>${l}</span></div>`;
  return `<section class="card glass pg-hero">
      <div class="pg-hero-h"><div><div class="pg-big">${fmtN(c[3] + c[4])}</div><div class="small muted">${t('kata ≥ Paham')} · ${fmtN(studied)} ${t('kata')} ${t('Belajar').toLowerCase()}+</div></div>
        <div class="row wrap" style="gap:8px"><button class="btn pri small" data-a="pgweak">${ICON('target')} ${t('Latih yang lemah')}</button></div></div>
      ${pStack(arr, studied || 1)}
      <div class="pg-legend">${[4, 3, 2, 1, 0, -1].map(s => `<button class="pg-lg" data-a="pgst" data-v="${s}"><i class="ps${s < 0 ? 'x' : s}"></i>${esc(pstName(s))} <b>${fmtN(c[s])}</b></button>`).join('')}</div>
    </section>
    <section class="kpis pg-kpis">
      ${kpi(nAns ? Math.round(ok / nAns * 100) + '%' : '—', t('Akurasi 30 hari'))}
      ${kpi(Math.round(X.avgR * 100) + '%', t('Ingatan rata-rata'))}
      ${kpi(streakNow(), t('streak') + ' · ' + t('hari'))}
      ${kpi(fmtN(Math.round(ms / 60000)), t('Menit 30 hari'))}
      ${kpi(fmtN(fc[0]), t('Jatuh tempo hari ini'))}
      ${kpi(progGramList().filter(g => gramStatus(g.id) === 2).length + '/' + progGramList().length, t('Grammar') + ' · ' + t('Paham'))}
    </section>
    <div class="pg-grid2">
      <section class="card glass"><h2>${t('Tren 30 hari')}</h2>
        ${pgBars(ans, lab, { title: t('Jawaban per hari'), today: 1 })}
        ${pgBars(nw, lab, { title: t('Kata baru per hari'), cls: 'pg-bar2', h: 44, today: 1 })}
        ${pgLine(acc, lab, { title: t('Akurasi harian') })}
        <div class="pg-xl"><span>${fmtDate(days30[0])}</span><span>${fmtDate(days30[15])}</span><span>${t('hari ini')}</span></div></section>
      <section class="card glass"><h2>${t('Ramalan ulangan 7 hari')}</h2>
        ${pgBars(fc, fcLab, { title: t('kartu'), h: 90, sub: fmtN(fc.reduce((a, b) => a + b, 0)) + ' ' + t('kartu') })}
        <div class="pg-xl pg-xl7">${fcLab.map(l => `<span>${esc(l)}</span>`).join('')}</div>
        <h2 style="margin-top:18px">${t('Penguasaan per level TOCFL')}</h2>
        <div class="pg-lvs">${lvKeys.map(l => { const a = X.lv[l]; const tot = a.reduce((x, y) => x + y, 0) - a[0]; const pct = tot ? Math.round((a[4] + a[5]) / tot * 100) : 0; const L = LEVELS[l] || { en: 'Lv ' + l, name: '' };
          return `<button class="pg-lv" data-a="pgsrc" data-v="l${l}"><span class="pg-lvn"><b>${lvBadge(l, { cls: 'pre' })}${esc(L.en)}</b><small class="hz">${esc(L.name)}</small></span>${pStack(a, tot)}<span class="pg-pct">${pct}%</span></button>`; }).join('')}</div>
      </section>
    </div>
    <section class="card glass"><h2>${t('Penguasaan per lesson')}</h2><p class="small muted" style="margin:-4px 0 10px">${t('kata ≥ Paham')} · ${t('Grammar')} · ${t('langkah')}</p>
      ${['prep', 'b1', 'sd'].map(ck => { const ls = KLS.filter(L => L.course === ck); if (!ls.length) return '';
        const ss = ls.map(L => [L, lessonStats(L.n, X)]); const tot = ss.reduce((a, [, s]) => a + s.n, 0), okc = ss.reduce((a, [, s]) => a + s.ok, 0);
        return `<details class="pg-course" ${ck === (PV.openC || 'sd') ? 'open' : ''}><summary><span class="hz">${esc(lessonCourseName(ck))}</span><span class="pg-pct">${tot ? Math.round(okc / tot * 100) : 0}%</span></summary>
          <div class="pg-lrows">${ss.map(([L, s]) => `<button class="pg-lrow" data-a="pglesson" data-v="${L.n}"><span class="pg-ln">${esc(lnShort(L.n))}</span><span class="hz pg-lt">${esc(L.title.zh)}</span><span class="pg-mbar"><i style="width:${Math.round(s.pct * 100)}%"></i></span><span class="pg-lnum">${Math.round(s.pct * 100)}%</span><span class="pg-lnum">${s.gOk}/${s.g}</span><span class="pg-lnum">${s.steps}/${s.stepsT}</span></button>`).join('')}</div></details>`; }).join('')}
    </section>`;
}

/* ---------- tampilan: kosakata ---------- */
function progWordIds() {
  const X = progIdx(); const src = progSrcIds(PV.src); let ids = src || Array.from({ length: W.length }, (_, i) => i);
  const st = PV.st; if (st !== 'all') { if (st === 'studied') ids = ids.filter(i => X.st[i] > 0); else { const s = +st; ids = ids.filter(i => X.st[i] === s); } }
  const q = PV.q.trim().toLowerCase();
  if (q) { const qn = stripTone(q).replace(/\s+/g, ''); ids = ids.filter(i => { const w = W[i]; return w.w.includes(q) || (w.s && w.s.includes(q)) || stripTone((w.p || '').toLowerCase()).replace(/\s+/g, '').includes(qn) || String(wMean(w) || '').toLowerCase().includes(q) || (w.m && w.m[1] && w.m[1].toLowerCase().includes(q)); }); }
  const sc = PV.sort; const C = S.cards;
  if (sc === 'weak') ids = ids.slice().sort((a, b) => { const sa = X.st[a] > 0 ? X.str[a] : 9, sb = X.st[b] > 0 ? X.str[b] : 9; return sa - sb || a - b; });
  else if (sc === 'due') ids = ids.slice().sort((a, b) => { const da = C[a] && X.st[a] > 0 ? C[a].due : Infinity, db = C[b] && X.st[b] > 0 ? C[b].due : Infinity; return da - db || a - b; });
  else if (sc === 'recent') ids = ids.slice().sort((a, b) => ((C[b] && C[b].ls) || 0) - ((C[a] && C[a].ls) || 0) || a - b);
  return ids;
}
function progWordRow(i, X, now) {
  const w = W[i]; const s = X.st[i]; const c = S.cards[i]; const open = PV.open === i; const man = wordManual(i);
  const pct = Math.round(X.str[i] * 100);
  return `<div class="pg-wr ${open ? 'open' : ''}" data-i="${i}">
    <button class="pg-wmain" data-a="pgopen" data-v="${i}" aria-expanded="${open}"><span class="hz pg-wh">${esc(w.w)}${lvBadgeW(i)}</span><span class="pg-wt"><span class="pg-wp">${esc(pyPlain(w))}</span><span class="pg-wm">${esc(meanP(w))}</span></span></button>
    <span class="pg-ws"><span class="pg-sbar" title="${pct}%"><i class="ps${s < 0 ? 'x' : s}" style="width:${s > 0 ? Math.max(6, pct) : 0}%"></i></span><span class="pg-due">${s > 0 ? dueLabel(c, now) : ''}</span></span>
    ${pPill(s, `data-a="pgopen" data-v="${i}" aria-label="${esc(pstName(s))}"`)}${man ? `<span class="pg-man" title="${t('manual')}">${ICON('user')}</span>` : ''}
    ${open ? `<div class="pg-wctl"><div class="pg-seg">${[1, 2, 3, 4].map(k => `<button class="ps${k} ${s === k ? 'on' : ''}" data-a="pgset" data-i="${i}" data-v="${k}">${esc(pstName(k))}</button>`).join('')}</div>
      <div class="row wrap" style="gap:6px"><button class="btn ghost small" data-a="pgset" data-i="${i}" data-v="-1">${ICON('close')} ${t('Abaikan')}</button>${s !== 0 ? `<button class="btn ghost small" data-a="pgset" data-i="${i}" data-v="0">${ICON('undo')} ${t('Reset ke baru')}</button>` : ''}<button class="btn ghost small" data-a="word" data-v="${i}">${ICON('search')} ${t('Kartu kata')}</button><button class="btn ghost small" data-a="pgprac1" data-v="${i}">${ICON('play')} ${t('Latih')}</button></div>
      ${c && s > 0 ? `<div class="small muted">${t('Ulang berikutnya')}: ${dueLabel(c, now)} · ${t('Ingatan')} ${Math.round(recallProb(i) * 100)}% · ${c.r || 0}× · ${t('lupa')} ${c.lp || 0}×</div>` : ''}</div>` : ''}
  </div>`;
}
function progWordsList() {
  const X = progIdx(); const ids = progWordIds(); const now = Date.now();
  const pages = Math.max(1, Math.ceil(ids.length / PG_PER)); PV.page = clamp(PV.page, 0, pages - 1);
  const view = ids.slice(PV.page * PG_PER, PV.page * PG_PER + PG_PER);
  const src = progSrcIds(PV.src); const cs = { all: 0, studied: 0, '-1': 0, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
  (src || Array.from({ length: W.length }, (_, i) => i)).forEach(i => { cs.all++; cs[X.st[i]]++; if (X.st[i] > 0) cs.studied++; });
  const pager = pages > 1 ? `<div class="pg-pager"><button class="btn ghost small" data-a="pgpage" data-v="${PV.page - 1}" ${PV.page ? '' : 'disabled'} aria-label="‹">‹</button><span class="small">${t('Halaman')} <b>${PV.page + 1}</b> / ${pages}</span><button class="btn ghost small" data-a="pgpage" data-v="${PV.page + 1}" ${PV.page < pages - 1 ? '' : 'disabled'} aria-label="›">›</button></div>` : '';
  return `<div class="pg-chips">${[['all', 'Semua'], ['studied', 'Belajar'], [1], [2], [3], [4], [0], [-1]].map(([k, l]) => `<button class="chip ${String(PV.st) === String(k) ? 'on' : ''}" data-a="pgst" data-v="${k}">${typeof k === 'number' ? `<i class="pg-dotc ps${k < 0 ? 'x' : k}"></i>${esc(pstName(k))}` : esc(t(l)) + (k === 'studied' ? '+' : '')} <b>${fmtN(cs[k])}</b></button>`).join('')}</div>
    <div class="pg-bulk"><span class="small muted grow">${fmtN(ids.length)} ${t('kata')} · ${esc(progSrcLabel(PV.src))}</span>
      <button class="btn pri small" data-a="pgpracsel" ${ids.length ? '' : 'disabled'}>${ICON('play')} ${t('Latih pilihan')}</button>
      <button class="btn sec small" data-a="pgbulk" data-v="3" ${ids.length ? '' : 'disabled'}>${ICON('check')} ${t('Sudah paham')}</button>
      <button class="btn sec small" data-a="pgbulk" data-v="1" ${ids.length ? '' : 'disabled'}>${ICON('refresh')} ${t('Belum paham')}</button></div>
    ${view.length ? `<div class="pg-wl">${view.map(i => progWordRow(i, X, now)).join('')}</div>` : `<p class="muted" style="text-align:center;padding:24px 0">${t('Tidak ada kata yang cocok.')}</p>`}
    ${pager}`;
}
function progSrcOptions(sel) {
  const lv = [...new Set(W.map(w => w.l))].sort((a, b) => a - b);
  const course = ck => KLS.filter(L => L.course === ck).map(L => `<option value="k${L.n}" ${sel === 'k' + L.n ? 'selected' : ''}>${esc(lnShort(L.n) + ' · ' + L.title.zh)}</option>`).join('');
  return `<option value="all" ${sel === 'all' ? 'selected' : ''}>${t('Semua kata')}</option><option value="a2" ${sel === 'a2' ? 'selected' : ''}>TOCFL A2</option>
    <optgroup label="TOCFL">${lv.map(l => `<option value="l${l}" ${sel === 'l' + l ? 'selected' : ''}>${esc(progSrcLabel('l' + l))}</option>`).join('')}</optgroup>
    ${['prep', 'b1', 'sd'].map(ck => KLS.some(L => L.course === ck) ? `<optgroup label="${esc(lessonCourseName(ck))}">${course(ck)}</optgroup>` : '').join('')}`;
}
function progWords() {
  return `<section class="card glass pg-words">
    <div class="pg-filters">
      <div class="search glass pg-search"><span>${ICON('search')}</span><input id="pgq" value="${esc(PV.q)}" placeholder="${esc(t('Cari hanzi, pinyin, arti…'))}" aria-label="${esc(t('Cari'))}" data-pgin="q" autocomplete="off"></div>
      <label class="pg-sel"><span>${t('Sumber')}</span><select class="sel" data-pgin="src">${progSrcOptions(PV.src)}</select></label>
      <label class="pg-sel"><span>${t('Urutkan')}</span><select class="sel" data-pgin="sort">${[['order', 'Urutan'], ['weak', 'Terlemah dulu'], ['due', 'Jatuh tempo'], ['recent', 'Terakhir dipelajari']].map(([k, l]) => `<option value="${k}" ${PV.sort === k ? 'selected' : ''}>${t(l)}</option>`).join('')}</select></label>
    </div>
    <p class="small muted pg-hint">${ICON('info')} ${t('Kamu yang pegang kendali: tap status untuk mengubahnya. Status otomatis ikut hasil latihan berikutnya.')}</p>${lvLegend('pg-lvlg')}
    <div id="pg-wl">${progWordsList()}</div></section>`;
}
function progListUpdate() { const el = $('#pg-wl'); if (el) el.innerHTML = progWordsList(); else render(); }

/* ---------- tampilan: grammar ---------- */
function progGram() {
  const all = progGramList(); const src = PV.gsrc;
  let list = all.filter(g => src === 'all' ? true : src === 'gp' ? g.src === 'gp' : g.src === 'L' && 'k' + g.n === src);
  const cs = [0, 0, 0]; list.forEach(g => cs[clamp(gramStatus(g.id), 0, 2)]++);
  if (PV.gst !== 'all') list = list.filter(g => gramStatus(g.id) === +PV.gst);
  const groups = []; list.forEach(g => { const key = g.src === 'gp' ? 'gp' : 'k' + g.n; let G = groups.find(x => x.k === key); if (!G) groups.push(G = { k: key, items: [] }); G.items.push(g); });
  const ttl = k => k === 'gp' ? t('Pola umum') + ' · ' + t('Tata bahasa') : `${esc(lnShort(+k.slice(1)))} <span class="hz">${esc(KL(+k.slice(1)).title.zh)}</span>`;
  return `<section class="card glass">
    <div class="pg-filters"><label class="pg-sel"><span>${t('Sumber')}</span><select class="sel" data-pgin="gsrc"><option value="all">${t('Semua')}</option><option value="gp" ${src === 'gp' ? 'selected' : ''}>${t('Pola umum')}</option>${KLS.filter(L => (L.grammar || []).length).map(L => `<option value="k${L.n}" ${src === 'k' + L.n ? 'selected' : ''}>${esc(lnShort(L.n) + ' · ' + L.title.zh)}</option>`).join('')}</select></label></div>
    <div class="pg-chips">${[['all', t('Semua'), list.length], [0, pgName(0), cs[0]], [1, pgName(1), cs[1]], [2, pgName(2), cs[2]]].map(([k, l, n]) => `<button class="chip ${String(PV.gst) === String(k) ? 'on' : ''}" data-a="pggst" data-v="${k}">${typeof k === 'number' ? `<i class="pg-dotc pg${k}"></i>` : ''}${esc(l)} <b>${k === 'all' ? cs[0] + cs[1] + cs[2] : n}</b></button>`).join('')}</div>
    ${groups.length ? groups.map(G => `<div class="pg-gg"><h3>${ttl(G.k)}</h3>${G.items.map(g => { const s = gramStatus(g.id); const man = !!(S.prog && S.prog.g && S.prog.g[g.id]); const sc = g.src === 'L' ? lessonGramScore(g.n) : undefined;
      return `<div class="pg-gr"><div class="pg-gt"><div class="hz pg-gf">${esc(g.form || '')}</div><div class="small">${esc(g.name())}</div><div class="small muted">${man ? t('manual') : sc !== undefined ? `${t('dari latihan')}: ${sc}%` : g.src === 'gp' && gramSeen(g.id) ? t('Sudah dipahami') : ''}</div></div>
        <div class="pg-gact"><div class="pg-seg pg-seg3">${[0, 1, 2].map(k => `<button class="pg${k} ${s === k ? 'on' : ''}" data-a="pggset" data-g="${esc(g.id)}" data-v="${k}" aria-pressed="${s === k}">${esc(pgName(k))}</button>`).join('')}</div>
        <button class="btn ghost small" data-a="pggopen" data-g="${esc(g.id)}">${ICON('book')} ${t('Buka')}</button></div></div>`; }).join('')}</div>`).join('') : `<p class="muted" style="text-align:center;padding:24px 0">${t('Tidak ada kata yang cocok.')}</p>`}
  </section>`;
}

/* ---------- tampilan: hanzi ---------- */
function progHanzi() {
  const X = progIdx(); const P = (S.prog && S.prog.c) || {};
  let chs = Object.keys(X.chMax); Object.keys(P).forEach(c => { if (!(c in X.chMax)) chs.push(c); });
  const order = typeof CHAR_ORDER !== 'undefined' ? CHAR_ORDER : []; const oi = {}; order.forEach((c, k) => { oi[c] = k; });
  chs.sort((a, b) => (oi[a] ?? 1e6) - (oi[b] ?? 1e6));
  const info = chs.map(c => ({ c, s: charStatus(c, X), w: charWrite(c) }));
  const cs = [0, 0, 0, 0, 0]; let wr = 0; info.forEach(x => { cs[clamp(x.s, 0, 4)]++; if (x.w.n > 0) wr++; });
  let list = info;
  if (PV.hst !== 'all') list = list.filter(x => x.s === +PV.hst);
  if (PV.hw === 'yes') list = list.filter(x => x.w.n > 0); else if (PV.hw === 'no') list = list.filter(x => !x.w.n);
  const pages = Math.max(1, Math.ceil(list.length / PH_PER)); PV.hpage = clamp(PV.hpage, 0, pages - 1);
  const view = list.slice(PV.hpage * PH_PER, PV.hpage * PH_PER + PH_PER);
  let hs = ''; if (typeof hzStats === 'function') { try { const o = hzStats(); if (o && typeof o === 'object') hs = Object.entries(o).filter(([, v]) => typeof v === 'number').slice(0, 4).map(([k, v]) => `<span class="chip">${esc(k)} <b>${fmtN(Math.round(v))}</b></span>`).join(''); } catch (e) { } }
  return `<section class="card glass">
    <div class="kpis pg-kpis pg-k3"><div class="kpi"><b>${fmtN(info.length)}</b><span>${t('huruf')}</span></div><div class="kpi"><b>${fmtN(cs[3] + cs[4])}</b><span>${t('Paham')}+</span></div><div class="kpi"><b>${fmtN(wr)}</b><span>${t('Sudah ditulis')}</span></div></div>
    ${hs ? `<div class="row wrap" style="gap:6px;margin-top:10px">${hs}</div>` : ''}
    <div class="pg-chips" style="margin-top:12px">${[['all', 'Semua'], [1], [2], [3], [4]].map(([k, l]) => `<button class="chip ${String(PV.hst) === String(k) ? 'on' : ''}" data-a="pghst" data-v="${k}">${typeof k === 'number' ? `<i class="pg-dotc ps${k}"></i>${esc(pstName(k))} <b>${cs[k]}</b>` : esc(t(l)) + ` <b>${info.length}</b>`}</button>`).join('')}</div>
    <div class="pg-chips">${[['all', 'Semua'], ['yes', 'Sudah ditulis'], ['no', 'Belum ditulis']].map(([k, l]) => `<button class="chip ${PV.hw === k ? 'on' : ''}" data-a="pghw" data-v="${k}">${k === 'yes' ? ICON('write') : ''}${esc(t(l))}</button>`).join('')}</div>
    ${view.length ? `<div class="pg-hz">${view.map(x => `<button class="pg-hc ps${x.s}" data-a="pghz" data-v="${esc(x.c)}" title="${esc(pstName(x.s))}"><span class="hz">${esc(x.c)}</span><i class="pg-hbar"><i style="width:${x.s * 25}%"></i></i>${x.w.n ? `<span class="pg-hw">${x.w.lv !== null ? 'L' + x.w.lv : x.w.n + '×'}</span>` : ''}</button>`).join('')}</div>` : `<p class="muted" style="text-align:center;padding:24px 0">—</p>`}
    ${pages > 1 ? `<div class="pg-pager"><button class="btn ghost small" data-a="pghpage" data-v="${PV.hpage - 1}" ${PV.hpage ? '' : 'disabled'}>‹</button><span class="small">${t('Halaman')} <b>${PV.hpage + 1}</b> / ${pages}</span><button class="btn ghost small" data-a="pghpage" data-v="${PV.hpage + 1}" ${PV.hpage < pages - 1 ? '' : 'disabled'}>›</button></div>` : ''}
  </section>`;
}
function progHzSheet(ch) {
  const X = progIdx(); const s = charStatus(ch, X); const man = !!(S.prog && S.prog.c && S.prog.c[ch]); const wv = charWrite(ch);
  const ws = (X.chWords[ch] || []).slice(0, 12);
  const py = typeof charPy === 'function' ? charPy(ch) : '';
  openModal(`<div class="pg-hzs"><div class="hz pg-hzbig">${esc(ch)}</div><div><div class="pg-hzpy">${esc(py)}</div><div class="small muted">${t('Status hanzi')}: <b>${esc(pstName(s))}</b>${man ? ' · ' + t('manual') : ''}</div>
      <div class="small muted">${ICON('write')} ${wv.lv !== null ? 'Lv ' + wv.lv + ' · ' : ''}${wv.n}×</div></div></div>
    <div class="pg-seg" style="margin:14px 0 8px">${[1, 2, 3, 4].map(k => `<button class="ps${k} ${s === k ? 'on' : ''}" data-a="pghset" data-c="${esc(ch)}" data-v="${k}">${esc(pstName(k))}</button>`).join('')}</div>
    ${man ? `<button class="btn ghost small" data-a="pghset" data-c="${esc(ch)}" data-v="">${ICON('undo')} ${t('Otomatis')}</button>` : ''}
    ${ws.length ? `<h3 style="margin:14px 0 6px">${t('Kata dengan huruf ini')}</h3><div class="pg-hzw">${ws.map(i => `<button class="pg-hzwi" data-a="word" data-v="${i}"><span class="hz">${esc(W[i].w)}${lvBadgeW(i)}</span><span class="small muted">${esc(meanP(W[i]))}</span><span class="pg-pill pg-pill-s ps${X.st[i] < 0 ? 'x' : X.st[i]}">${esc(pstName(X.st[i]))}</span></button>`).join('')}</div>` : ''}
    <div class="row wrap" style="gap:8px;margin-top:14px">${CH[ch] ? `<button class="btn sec" data-a="char" data-v="${esc(ch)}">${ICON('hanzi')} ${t('Detail hanzi')}</button>` : ''}<button class="btn pri" data-a="pghwrite" data-v="${esc(ch)}">${ICON('write')} ${t('Latih tulis')}</button></div>`, 'pg-sheet');
}

/* ---------- tampilan: lesson ---------- */
function progLessons() {
  const X = progIdx();
  return ['prep', 'b1', 'sd'].map(ck => { const ls = KLS.filter(L => L.course === ck); if (!ls.length) return '';
    return `<section class="card glass"><h2 class="hz" style="margin-top:0">${esc(lessonCourseName(ck))}</h2><div class="pg-lcards">${ls.map(L => { const s = lessonStats(L.n, X); const p = Math.round(s.pct * 100);
      return `<div class="pg-lc"><div class="pg-lch"><span class="pg-ln">${esc(lnShort(L.n))}</span><b class="hz">${esc(L.title.zh)}</b></div><div class="small muted pg-lsub">${esc(kx(L.title))}</div>
        <div class="pg-lm"><span>${t('Kosakata')}</span><span class="pg-mbar"><i style="width:${p}%"></i></span><b>${p}%</b></div>
        <div class="pg-lm"><span>${t('Grammar')}</span><span class="pg-mbar"><i class="g" style="width:${s.g ? Math.round(s.gOk / s.g * 100) : 0}%"></i></span><b>${s.gOk}/${s.g}</b></div>
        <div class="pg-lm"><span>${t('langkah')}</span><span class="pg-mbar"><i class="s" style="width:${s.stepsT ? Math.round(s.steps / s.stepsT * 100) : 0}%"></i></span><b>${s.steps}/${s.stepsT}</b></div>
        <div class="pg-lbtn"><button class="btn ghost small" data-a="pglesson" data-v="${L.n}">${ICON('book')} ${t('Kosakata')}</button><button class="btn ghost small" data-a="pglgram" data-v="${L.n}">${ICON('grammar')} ${t('Grammar')}</button><button class="btn ghost small" data-a="pglopen" data-v="${L.n}">${ICON('class')} ${t('Buka')}</button></div></div>`; }).join('')}</div></section>`; }).join('');
}

/* ---------- halaman utama ---------- */
const PG_TABS = [['dash', 'progress', 'Ringkasan'], ['words', 'book', 'Kosakata'], ['gram', 'grammar', 'Grammar'], ['hz', 'hanzi', 'Hanzi'], ['lesson', 'class', 'Lesson']];
function vProg() {
  const tab = PG_TABS.some(x => x[0] === PV.tab) ? PV.tab : 'dash';
  const body = tab === 'words' ? progWords() : tab === 'gram' ? progGram() : tab === 'hz' ? progHanzi() : tab === 'lesson' ? progLessons() : progDash();
  return `<section class="card glass pg-head"><h1>${t('Progres belajar')}</h1>
    <nav class="pg-tabs" role="tablist">${PG_TABS.map(([k, ic, l]) => `<button role="tab" class="${tab === k ? 'on' : ''}" aria-selected="${tab === k}" data-a="pgtab" data-v="${k}">${ICON(ic)}<span>${t(l)}</span></button>`).join('')}</nav></section>
    <div class="pg-body">${body}</div>`;
}
XVIEWS.prog = vProg;

/* ---------- latihan ---------- */
function progPracItems(ids, n = 20) {
  const X = progIdx(); ids = ids.filter(i => X.st[i] >= 0 && W[i]);
  const news = ids.filter(i => !S.cards[i]).slice(0, Math.min(8, n));
  const revs = ids.filter(i => S.cards[i]).slice(0, Math.max(0, n - news.length * 2)).map(i => ({ type: chooseType(i), wid: i, hint: isLeech(S.cards[i]) }));
  return interleave(news, revs);
}
function progPractice(ids, title) {
  const pick = ids.slice(0, 20);
  startSession(progPracItems(pick), { title: title || t('Latih pilihan'), rebuild: () => progPracItems(pick) });
}
function progWeakIds(base) {
  const X = progIdx(); const src = base || Object.keys(S.cards).map(Number);
  return src.filter(i => X.st[i] > 0 && X.st[i] < 4).sort((a, b) => X.str[a] - X.str[b]);
}

/* ---------- aksi ---------- */
function pgGoTab(tab) { PV.tab = tab; PV.open = null; if (ROUTE !== 'prog') go('prog'); else { render(); } window.scrollTo(0, 0); }
Object.assign(ACT, {
  pgtab: b => { PV.tab = b.dataset.v; PV.open = null; render(); window.scrollTo(0, 0); },
  pgst: b => { const v = b.dataset.v; PV.st = v === 'all' || v === 'studied' ? v : +v; PV.page = 0; PV.open = null; if (PV.tab !== 'words' || ROUTE !== 'prog') pgGoTab('words'); else progListUpdate(); },
  pgsrc: b => { PV.src = b.dataset.v; PV.st = 'all'; PV.page = 0; pgGoTab('words'); },
  pgpage: b => { PV.page = +b.dataset.v; PV.open = null; progListUpdate(); const el = $('#pg-wl'); if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: 'start' }); },
  pgopen: b => { const i = +b.dataset.v; PV.open = PV.open === i ? null : i; progListUpdate(); },
  pgset: b => { const i = +b.dataset.i, s = +b.dataset.v; setWordStatus(i, s); FX.play(s >= 3 ? 'ok' : 'tap'); toast(`<span class="hz">${esc(W[i].w)}</span> → ${esc(pstName(s))}`, 1600, 'pgset'); if ($('#pg-wl')) progListUpdate(); else render(); },
  pgbulk: b => { const s = +b.dataset.v; const ids = progWordIds().filter(i => progIdx().st[i] !== s); if (!ids.length) return toast(t('Status diubah: {n} kata', { n: 0 })); if (ids.length > 3 && !confirm(t('Ubah status {n} kata ini?', { n: fmtN(ids.length) }) + ' → ' + pstName(s))) return; progSetMany(ids, s); toast(t('Status diubah: {n} kata', { n: fmtN(ids.length) })); render(); },
  pgpracsel: () => { const ids = progWordIds(); const weak = PV.sort === 'order' ? ids.filter(i => progIdx().st[i] !== 4) : ids; progPractice(weak.length ? weak : ids, t('Latih pilihan')); },
  pgprac1: b => { const i = +b.dataset.v; progPractice([i].concat(progWeakIds().filter(x => x !== i).slice(0, 7)), t('Latih')); },
  pgweak: () => { const ids = progWeakIds(); if (!ids.length) return toast(t('Belum ada soal untuk mode ini — pelajari beberapa kata dulu 🌱')); progPractice(ids, t('Latih yang lemah')); },
  pglesson: b => { PV.src = 'k' + b.dataset.v; PV.st = 'all'; PV.q = ''; PV.page = 0; PV.openC = (KL(+b.dataset.v) || {}).course; pgGoTab('words'); },
  pglgram: b => { PV.gsrc = 'k' + b.dataset.v; PV.gst = 'all'; pgGoTab('gram'); },
  pglopen: b => { const n = +b.dataset.v; const L = KL(n); if (!L) return; if (L.course === 'sd' && typeof KBV !== 'undefined') { KBV.n = n; VK.view = 'kbl'; } else { VK.view = 'lesson'; VK.n = n; VK.tab = 'babak'; VK.grp = 'all'; VK.role = ''; } go('kelas'); window.scrollTo(0, 0); },
  pggst: b => { const v = b.dataset.v; PV.gst = v === 'all' ? v : +v; render(); },
  pggset: b => { setGramStatus(b.dataset.g, +b.dataset.v); render(); },
  pggopen: b => { const g = gramItem(b.dataset.g); if (!g) return;
    if (g.src === 'gp') { GVS.tier = g.lv || 1; GVS.open = g.id; go('grammar'); window.scrollTo(0, 0); return; }
    const L = KL(g.n); if (L.course === 'sd' && typeof KBV !== 'undefined') { KBV.n = g.n; VK.view = 'kbl'; } else { VK.view = 'lesson'; VK.n = g.n; VK.tab = 'gram'; }
    go('kelas'); window.scrollTo(0, 0); },
  pghst: b => { const v = b.dataset.v; PV.hst = v === 'all' ? v : +v; PV.hpage = 0; render(); },
  pghw: b => { PV.hw = b.dataset.v; PV.hpage = 0; render(); },
  pghpage: b => { PV.hpage = +b.dataset.v; render(); },
  pghz: b => progHzSheet(b.dataset.v),
  pghset: b => { const ch = b.dataset.c; setCharStatus(ch, b.dataset.v === '' ? null : +b.dataset.v); render(); progHzSheet(ch); },
  pghwrite: b => { closeModal(); startSession(buildWrite(1, [b.dataset.v]), { title: t('Latih tulis') }); },
  'goto-prog': () => pgGoTab('dash')
});
let pgInT = 0;
document.addEventListener('input', e => {
  const k = e.target.dataset && e.target.dataset.pgin; if (k !== 'q' || e.isComposing) return;
  PV.q = e.target.value; PV.page = 0; PV.open = null; clearTimeout(pgInT); pgInT = setTimeout(progListUpdate, 160);
});
document.addEventListener('change', e => {
  const k = e.target.dataset && e.target.dataset.pgin; if (!k || k === 'q') return;
  if (k === 'src') { PV.src = e.target.value; PV.page = 0; PV.open = null; progListUpdate(); }
  else if (k === 'sort') { PV.sort = e.target.value; PV.page = 0; PV.open = null; progListUpdate(); }
  else if (k === 'gsrc') { PV.gsrc = e.target.value; render(); }
});

/* ---------- navigasi ---------- */
(function () {
  if (!ROUTES.some(r => r[0] === 'prog')) { const k = ROUTES.findIndex(r => r[0] === 'kelas'); ROUTES.splice(k >= 0 ? k + 1 : 1, 0, ['prog', 'progress', 'Progres']); }
  TAB_SHORT.prog = 'Progres'; ROUTE_DESC.prog = 'Lacak & atur kata, grammar, hanzi'; ROUTE_COLOR.prog = 'c3';
})();
const renderPG = render;
render = function () { PG_C = null; return renderPG.apply(this, arguments); };

/* kartu abaikan tidak ikut dihitung sebagai kata yang dipelajari / latihan */
const countsPG = counts;
counts = function () {
  const ign = []; for (const k in S.cards) if (isIgn(S.cards[k])) ign.push(k);
  if (!ign.length) return countsPG();
  const keep = {}; ign.forEach(k => { keep[k] = S.cards[k]; delete S.cards[k]; });
  try { return countsPG(); } finally { Object.assign(S.cards, keep); }
};
const buildPracticePG = buildPractice;
buildPractice = function () { return buildPracticePG.apply(this, arguments).filter(it => !(it.wid !== undefined && isIgn(S.cards[it.wid]))); };

/* ---------- kartu masuk: Beranda & Statistik ---------- */
function progEntryCard(compact) {
  const X = progIdx(); const c = X.cnt; const studied = c[1] + c[2] + c[3] + c[4];
  return `<section class="card glass pg-entry"><button class="pg-entry-b" data-a="goto-prog">${TILE('progress', 'tint c3')}<span class="grow" style="min-width:0"><b>${t('Progres belajar')}</b><span class="small muted">${fmtN(c[3] + c[4])} ${t('kata ≥ Paham')} · ${fmtN(studied)} ${t('kata')}</span></span><span class="pg-entry-go">${t('Lihat progres')} ${ICON('chevron')}</span></button>
    ${pStack([c[-1], c[0], c[1], c[2], c[3], c[4]], studied || 1)}
    ${compact ? '' : `<div class="pg-legend pg-legend-s">${[4, 3, 2, 1].map(s => `<button class="pg-lg" data-a="pgst" data-v="${s}"><i class="ps${s}"></i>${esc(pstName(s))} <b>${fmtN(c[s])}</b></button>`).join('')}</div>`}</section>`;
}
function pgInsertAfter(h, nth, card) {
  let k = -1; for (let j = 0; j < nth; j++) { const x = h.indexOf('</section>', k + 1); if (x < 0) break; k = x; }
  return k < 0 ? h + card : h.slice(0, k + 10) + card + h.slice(k + 10);
}
const vHomePG = vHome;
vHome = function () { const h = vHomePG(); try { return Object.keys(S.cards).length ? pgInsertAfter(h, 2, progEntryCard(true)) : h; } catch (e) { return h; } };
const vStatsPG = vStats;
vStats = function () { const h = vStatsPG(); try { return pgInsertAfter(h, 1, progEntryCard()); } catch (e) { return h; } };

/* ---------- ringkasan sesi: atur status kata yang baru dilatih ---------- */
const showSummaryPG = showSummary;
showSummary = function () {
  const ses = SES; const was = ses && ses.summarized;
  showSummaryPG.apply(this, arguments);
  if (!ses || was) return;
  try {
    const seen = []; ses.items.forEach(it => { if (it && it.wid !== undefined && W[it.wid] && !seen.includes(it.wid)) seen.push(it.wid); });
    if (!seen.length) return;
    const box = $('#sbody .summary') || $('#sbody'); if (!box) return;
    const row = i => { const s = wordStatus(i); return `<div class="pg-sr" data-i="${i}"><span class="hz pg-wh">${esc(W[i].w)}${lvBadgeW(i)}</span><span class="pg-wt"><span class="pg-wp">${esc(pyPlain(W[i]))}</span><span class="pg-wm">${esc(meanP(W[i]))}</span></span><span class="pg-pill ps${s < 0 ? 'x' : s}">${esc(pstName(s))}</span>
      <span class="pg-srb"><button class="btn ghost small" data-ps="1" data-i="${i}" title="${esc(t('Belum paham'))}" aria-label="${esc(t('Belum paham'))}">${ICON('refresh')}</button><button class="btn ghost small" data-ps="3" data-i="${i}" title="${esc(t('Sudah paham'))}" aria-label="${esc(t('Sudah paham'))}">${ICON('check')}</button></span></div>`; };
    const el = document.createElement('div'); el.className = 'pg-sum';
    el.innerHTML = `<details ${seen.length <= 12 ? 'open' : ''}><summary><b>${t('Kata di sesi ini')}</b> <span class="small muted">${seen.length}</span></summary><div class="pg-srl">${seen.slice(0, 30).map(row).join('')}</div></details>`;
    const rows = [...box.children].filter(x => x.classList.contains('row')); const btns = rows[rows.length - 1]; if (btns) box.insertBefore(el, btns); else box.appendChild(el);
    el.addEventListener('click', e => { const b = e.target.closest('[data-ps]'); if (!b) return; e.stopPropagation(); const i = +b.dataset.i; const s = +b.dataset.ps; setWordStatus(i, s); FX.play(s >= 3 ? 'ok' : 'tap'); const r = el.querySelector(`.pg-sr[data-i="${i}"]`); if (r) r.outerHTML = row(i); });
  } catch (e) { console.warn('pg summary', e); }
};