/* ========== v10: STUDIO MENULIS ==========
   Papan besar (tablet: dua panel), input pena/jari dengan penolakan telapak, dan
   tangga penguasaan per huruf:
     L0 Kenalan (tonton + jiplak) → L1 Jiplak → L2 Petunjuk awal → L3 Ingat sendiri → L4 Hafal (ulangan berjarak).
   Data: S.hzWrite[ch] = jumlah ditulis (lama, tetap dipakai) · S.hzw[ch] = {lv, iv, due, n, g, last, h}.
   Global untuk dasbor: hzLevel(ch) → 0–4 · hzStats() → {total, byLevel, due, practiced, mastered}.       */

/* ---------- terjemahan ---------- */
Object.assign(I18N, {
  'Kenalan': ['Meet', 'Kilalanin'], 'Jiplak': ['Trace', 'Bakatin'], 'Petunjuk awal': ['First-stroke hint', 'Unang guhit'],
  'Ingat sendiri': ['Recall', 'Alalahanin'], 'Hafal': ['Mastered', 'Kabisado'],
  'Tonton urutannya, lalu jiplak di atas garis abu-abu.': ['Watch the order, then trace over the grey outline.', 'Panoorin ang pagkakasunod, saka bakatin ang abong balangkas.'],
  'Jiplak di atas garis bantu.': ['Trace over the guide outline.', 'Bakatin ang gabay na balangkas.'],
  'Tulis tanpa garis bantu — goresan pertama ditandai.': ['Write without the outline — the first stroke is marked.', 'Isulat nang walang balangkas — may marka ang unang guhit.'],
  'Tulis dari ingatan: hanya arti dan bunyi.': ['Write from memory: meaning and sound only.', 'Isulat mula sa alaala: kahulugan at tunog lang.'],
  'Ulangan: tulis dari ingatan.': ['Review: write from memory.', 'Balik-aral: isulat mula sa alaala.'],
  'Petunjuk': ['Hint', 'Hint'], 'Garis': ['Outline', 'Balangkas'], 'Putar': ['Replay', 'Ulitin'], 'Undo': ['Undo', 'Undo'],
  'Ulang': ['Restart', 'Ulit'], 'Lewati': ['Skip', 'Laktawan'], 'Atur': ['Settings', 'Ayos'],
  'Sempurna!': ['Perfect!', 'Perpekto!'], 'Rapi!': ['Neat!', 'Maayos!'], 'Selesai — masih perlu latihan': ['Done — needs more practice', 'Tapos — kailangan pa ng praktis'],
  'Belum rapi': ['Not there yet', 'Hindi pa maayos'], 'Dilewati': ['Skipped', 'Nilaktawan'],
  'naik ke {l}': ['up to {l}', 'umakyat sa {l}'], 'turun ke {l}': ['down to {l}', 'bumaba sa {l}'], 'tetap {l}': ['stays {l}', 'nananatili sa {l}'],
  '{n} koreksi': ['{n} corrections', '{n} pagwawasto'], 'tanpa koreksi': ['no corrections', 'walang pagwawasto'],
  '{n} petunjuk': ['{n} hints', '{n} hint'], 'latihan ulang — level tidak berubah': ['extra practice — level unchanged', 'dagdag na praktis — hindi nagbago ang level'],
  'Ulangi': ['Again', 'Ulitin'], 'Lanjut': ['Next', 'Susunod'],
  'goresan {a}/{b}': ['stroke {a}/{b}', 'guhit {a}/{b}'], '{n} goresan': ['{n} strokes', '{n} guhit'],
  'Goresan ke-{n}: coba lagi': ['Stroke {n}: try again', 'Guhit {n}: subukan ulit'], 'Arahnya terbalik': ['Wrong direction', 'Baligtad ang direksyon'],
  'ketuk papan untuk langsung menulis': ['tap the board to start writing', 'pindutin ang board para magsimula'],
  'memuat papan tulis…': ['loading the board…', 'nilo-load ang board…'],
  'Huruf {a}/{b}': ['Character {a}/{b}', 'Titik {a}/{b}'],
  'Kata selesai!': ['Word complete!', 'Tapos ang salita!'],
  'Data goresan tidak bisa dimuat (offline?). Jiplak bebas di bawah, lalu bandingkan — atau lewati.': ['Stroke data could not load (offline?). Trace freely below, then compare — or skip.', 'Hindi ma-load ang datos ng guhit (offline?). Bakatin nang malaya, saka ihambing — o laktawan.'],
  'Coba muat lagi': ['Try loading again', 'Subukang i-load ulit'], 'Bersihkan': ['Clear', 'Burahin'], 'Bandingkan': ['Compare', 'Ihambing'],
  'Mirip': ['Looks right', 'Kahawig'], 'Belum mirip': ['Not yet', 'Hindi pa'],
  'Kecepatan animasi': ['Animation speed', 'Bilis ng animasyon'], 'Lambat': ['Slow', 'Mabagal'], 'Normal': ['Normal', 'Normal'], 'Cepat': ['Fast', 'Mabilis'],
  'Lanjut otomatis': ['Auto-advance', 'Kusang tuloy'], 'Suara goresan': ['Stroke sounds', 'Tunog ng guhit'], 'Nyala': ['On', 'Bukas'], 'Mati': ['Off', 'Sarado'],
  'Mode stylus': ['Stylus mode', 'Stylus mode'], 'Otomatis': ['Auto', 'Awto'], 'Abaikan jari': ['Ignore finger', 'Huwag pansinin ang daliri'],
  'Kotak': ['Grid', 'Grid'], 'Polos': ['Plain', 'Payak'], 'Tutup': ['Close', 'Isara'],
  'Stylus terdeteksi — sentuhan telapak tangan diabaikan.': ['Stylus detected — palm touches are ignored.', 'Nakita ang stylus — hindi papansinin ang palad.'],
  'Mode stylus: jari diabaikan. Ubah di Atur.': ['Stylus mode: finger ignored. Change it in Settings.', 'Stylus mode: hindi pinapansin ang daliri. Baguhin sa Ayos.'],
  'Belum ada goresan untuk dibatalkan': ['No stroke to undo yet', 'Wala pang guhit na ia-undo'],
  'Studio menulis hanzi': ['Hanzi writing studio', 'Studio sa pagsulat ng hanzi'],
  'Tiap huruf naik tangga: tonton → jiplak → petunjuk awal → ingat sendiri → hafal. Huruf yang sudah hafal kembali untuk diulang tepat sebelum lupa.': ['Each character climbs a ladder: watch → trace → first-stroke hint → recall → mastered. Mastered characters come back for review right before you forget.', 'Umaakyat ang bawat titik: panoorin → bakatin → unang guhit → alalahanin → kabisado. Babalik ang kabisado para sa balik-aral bago makalimutan.'],
  'dikuasai': ['mastered', 'kabisado'], 'sedang dilatih': ['in progress', 'sinasanay'], 'jatuh tempo': ['due', 'takdang balik-aral'], 'hari ini': ['today', 'ngayon'],
  'Ulang tulisan': ['Review writing', 'Balik-aral sa pagsulat'], '{n} huruf jatuh tempo': ['{n} characters due', '{n} titik na takda'], 'Tidak ada yang jatuh tempo': ['Nothing due', 'Walang takda'],
  'Tulis kata hari ini': ["Write today's words", 'Isulat ang mga salita ngayon'], '{n} kata baru hari ini': ['{n} new words today', '{n} bagong salita ngayon'], 'kata yang baru dipelajari': ['recently learned words', 'mga bagong natutunang salita'],
  'Tulis dari lesson Kelas': ['Write from a class lesson', 'Isulat mula sa lesson ng klase'], 'pilih lesson → kosakatanya': ['pick a lesson → its vocabulary', 'pumili ng lesson → bokabularyo nito'],
  'Latihan campur': ['Mixed practice', 'Halo-halong praktis'], 'jatuh tempo + kata yang dipelajari': ['due + learned words', 'takda + natutunang salita'],
  'Latihan bebas': ['Free practice', 'Malayang praktis'], 'Ketik hanzi, pinyin (ma3), atau arti…': ['Type hanzi, pinyin (ma3) or a meaning…', 'I-type ang hanzi, pinyin (ma3) o kahulugan…'],
  'Tulis': ['Write', 'Isulat'], 'Tidak ketemu — coba hanzi langsung atau pinyin lain.': ['Nothing found — try hanzi directly or other pinyin.', 'Walang nahanap — subukan ang hanzi o ibang pinyin.'],
  'Peta penguasaan': ['Mastery map', 'Mapa ng kabisado'], 'Ketuk tangga untuk menyaring. Titik merah = jatuh tempo.': ['Tap a step to filter. Red dot = due.', 'Pindutin ang hakbang para salain. Pulang tuldok = takda.'],
  'Semua': ['All', 'Lahat'], 'Belum ada huruf di level ini.': ['No characters at this level yet.', 'Wala pang titik sa level na ito.'],
  'Pilih lesson. Kata-kata yang hurufnya paling belum dikuasai muncul lebih dulu.': ['Pick a lesson. Words with the least-mastered characters come first.', 'Pumili ng lesson. Unang lalabas ang mga salitang hindi pa kabisado.'],
  'Lanjut lesson terakhir': ['Continue last lesson', 'Ituloy ang huling lesson'],
  'Hasil menulis': ['Writing results', 'Resulta ng pagsulat'], '{n} huruf naik level': ['{n} characters levelled up', '{n} titik ang umakyat'], '{n} sempurna': ['{n} perfect', '{n} perpekto'],
  'Ulangan berikutnya: {n} huruf besok': ['Next review: {n} characters tomorrow', 'Susunod na balik-aral: {n} titik bukas'],
  'Satu huruf naik maksimal satu level per sesi.': ['A character climbs at most one level per session.', 'Isang level lang ang akyat ng titik bawat session.'],
  'Bagian': ['Parts', 'Bahagi'], 'Dengar': ['Listen', 'Pakinggan'],
  'Belum ada huruf untuk mode ini — pelajari beberapa kata dulu.': ['No characters for this mode yet — learn a few words first.', 'Wala pang titik para rito — mag-aral muna ng ilang salita.'],
  'Pintasan: H petunjuk · O garis · P putar · U/← undo · R ulang · S lewati · Spasi/Enter lanjut': ['Shortcuts: H hint · O outline · P replay · U/← undo · R restart · S skip · Space/Enter next', 'Shortcut: H hint · O balangkas · P ulitin · U/← undo · R ulit · S laktawan · Space/Enter susunod']
});
Object.assign(I18N_VI, {
  'Kenalan': 'Làm quen', 'Jiplak': 'Đồ theo', 'Petunjuk awal': 'Gợi ý nét đầu', 'Ingat sendiri': 'Tự nhớ', 'Hafal': 'Thuộc',
  'Tonton urutannya, lalu jiplak di atas garis abu-abu.': 'Xem thứ tự nét, rồi đồ theo nét mờ.', 'Jiplak di atas garis bantu.': 'Đồ theo nét mờ.',
  'Tulis tanpa garis bantu — goresan pertama ditandai.': 'Viết không có nét mờ — nét đầu được đánh dấu.', 'Tulis dari ingatan: hanya arti dan bunyi.': 'Viết theo trí nhớ: chỉ có nghĩa và âm.',
  'Ulangan: tulis dari ingatan.': 'Ôn tập: viết theo trí nhớ.', 'Petunjuk': 'Gợi ý', 'Garis': 'Nét mờ', 'Putar': 'Xem lại', 'Undo': 'Hoàn tác', 'Ulang': 'Viết lại', 'Lewati': 'Bỏ qua', 'Atur': 'Cài đặt',
  'Sempurna!': 'Hoàn hảo!', 'Rapi!': 'Đẹp!', 'Selesai — masih perlu latihan': 'Xong — cần luyện thêm', 'Belum rapi': 'Chưa đẹp', 'Dilewati': 'Đã bỏ qua',
  'naik ke {l}': 'lên {l}', 'turun ke {l}': 'xuống {l}', 'tetap {l}': 'giữ {l}', '{n} koreksi': '{n} lần sửa', 'tanpa koreksi': 'không sửa lần nào', '{n} petunjuk': '{n} gợi ý',
  'latihan ulang — level tidak berubah': 'luyện thêm — không đổi cấp', 'Ulangi': 'Làm lại', 'Lanjut': 'Tiếp', 'goresan {a}/{b}': 'nét {a}/{b}', '{n} goresan': '{n} nét',
  'Goresan ke-{n}: coba lagi': 'Nét {n}: thử lại', 'Arahnya terbalik': 'Ngược chiều', 'ketuk papan untuk langsung menulis': 'chạm bảng để viết ngay', 'memuat papan tulis…': 'đang tải bảng viết…',
  'Huruf {a}/{b}': 'Chữ {a}/{b}', 'Kata selesai!': 'Xong từ!',
  'Data goresan tidak bisa dimuat (offline?). Jiplak bebas di bawah, lalu bandingkan — atau lewati.': 'Không tải được dữ liệu nét (ngoại tuyến?). Hãy tự đồ bên dưới rồi so sánh — hoặc bỏ qua.',
  'Coba muat lagi': 'Thử tải lại', 'Bersihkan': 'Xoá', 'Bandingkan': 'So sánh', 'Mirip': 'Giống rồi', 'Belum mirip': 'Chưa giống',
  'Kecepatan animasi': 'Tốc độ hoạt ảnh', 'Lambat': 'Chậm', 'Normal': 'Thường', 'Cepat': 'Nhanh', 'Lanjut otomatis': 'Tự chuyển tiếp', 'Suara goresan': 'Âm thanh nét', 'Nyala': 'Bật', 'Mati': 'Tắt',
  'Mode stylus': 'Chế độ bút', 'Otomatis': 'Tự động', 'Abaikan jari': 'Bỏ qua ngón tay', 'Kotak': 'Ô', 'Polos': 'Trơn', 'Tutup': 'Đóng',
  'Stylus terdeteksi — sentuhan telapak tangan diabaikan.': 'Đã nhận bút — chạm lòng bàn tay sẽ bị bỏ qua.', 'Mode stylus: jari diabaikan. Ubah di Atur.': 'Chế độ bút: bỏ qua ngón tay. Đổi trong Cài đặt.',
  'Belum ada goresan untuk dibatalkan': 'Chưa có nét để hoàn tác', 'Studio menulis hanzi': 'Phòng luyện viết chữ Hán',
  'Tiap huruf naik tangga: tonton → jiplak → petunjuk awal → ingat sendiri → hafal. Huruf yang sudah hafal kembali untuk diulang tepat sebelum lupa.': 'Mỗi chữ leo thang: xem → đồ → gợi ý nét đầu → tự nhớ → thuộc. Chữ đã thuộc sẽ quay lại ôn ngay trước khi quên.',
  'dikuasai': 'đã thuộc', 'sedang dilatih': 'đang luyện', 'jatuh tempo': 'đến hạn', 'hari ini': 'hôm nay', 'Ulang tulisan': 'Ôn viết', '{n} huruf jatuh tempo': '{n} chữ đến hạn', 'Tidak ada yang jatuh tempo': 'Chưa có chữ đến hạn',
  'Tulis kata hari ini': 'Viết từ hôm nay', '{n} kata baru hari ini': '{n} từ mới hôm nay', 'kata yang baru dipelajari': 'từ vừa học', 'Tulis dari lesson Kelas': 'Viết theo bài học', 'pilih lesson → kosakatanya': 'chọn bài → từ vựng',
  'Latihan campur': 'Luyện tổng hợp', 'jatuh tempo + kata yang dipelajari': 'đến hạn + từ đã học', 'Latihan bebas': 'Luyện tự do', 'Ketik hanzi, pinyin (ma3), atau arti…': 'Gõ chữ Hán, pinyin (ma3) hoặc nghĩa…',
  'Tulis': 'Viết', 'Tidak ketemu — coba hanzi langsung atau pinyin lain.': 'Không tìm thấy — thử gõ chữ Hán hoặc pinyin khác.', 'Peta penguasaan': 'Bản đồ thành thạo',
  'Ketuk tangga untuk menyaring. Titik merah = jatuh tempo.': 'Chạm bậc để lọc. Chấm đỏ = đến hạn.', 'Semua': 'Tất cả', 'Belum ada huruf di level ini.': 'Chưa có chữ ở cấp này.',
  'Pilih lesson. Kata-kata yang hurufnya paling belum dikuasai muncul lebih dulu.': 'Chọn bài. Từ có chữ chưa thuộc nhất sẽ ra trước.', 'Lanjut lesson terakhir': 'Tiếp bài gần nhất',
  'Hasil menulis': 'Kết quả viết', '{n} huruf naik level': '{n} chữ lên cấp', '{n} sempurna': '{n} hoàn hảo', 'Ulangan berikutnya: {n} huruf besok': 'Ôn tiếp: {n} chữ ngày mai',
  'Satu huruf naik maksimal satu level per sesi.': 'Mỗi chữ lên tối đa một cấp mỗi buổi.', 'Bagian': 'Bộ phận', 'Dengar': 'Nghe',
  'Belum ada huruf untuk mode ini — pelajari beberapa kata dulu.': 'Chưa có chữ cho chế độ này — hãy học vài từ trước.',
  'Pintasan: H petunjuk · O garis · P putar · U/← undo · R ulang · S lewati · Spasi/Enter lanjut': 'Phím tắt: H gợi ý · O nét mờ · P xem lại · U/← hoàn tác · R viết lại · S bỏ qua · Space/Enter tiếp'
});

/* ---------- tangga penguasaan per huruf ---------- */
const WR_LV = ['Kenalan', 'Jiplak', 'Petunjuk awal', 'Ingat sendiri', 'Hafal'];
const WR_TASK = ['Tonton urutannya, lalu jiplak di atas garis abu-abu.', 'Jiplak di atas garis bantu.', 'Tulis tanpa garis bantu — goresan pertama ditandai.', 'Tulis dari ingatan: hanya arti dan bunyi.', 'Ulangan: tulis dari ingatan.'];
const WR_IV = [0, 1, 2, 4, 8];   // hari sampai ulangan berikutnya, per level baru
function hzwStore() {
  if (!S.hzw || typeof S.hzw !== 'object' || Array.isArray(S.hzw)) S.hzw = {};
  if (!S.hzwMig) {   // data lama: hanya hitungan → level awal yang wajar, jatuh tempo disebar 0–3 hari
    S.hzwMig = 1; const now = Date.now(); const hw = S.hzWrite || {};
    for (const c in hw) { const n = +hw[c] || 0; if (!n || S.hzw[c]) continue; S.hzw[c] = { lv: n >= 3 ? 2 : 1, iv: 1, due: now + Math.random() * 3 * DAY, n, g: -1, last: 0, h: '' }; }
  }
  return S.hzw;
}
function hzRec(c) {
  const r = hzwStore()[c]; if (!r || typeof r !== 'object') return null;
  if (!(r.lv >= 0 && r.lv <= 4)) r.lv = Math.max(0, Math.min(4, r.lv | 0));
  if (!isFinite(r.due)) r.due = 0; if (!isFinite(r.iv)) r.iv = 1;
  return r;
}
function hzLevel(c) { const r = hzRec(c); return r ? r.lv | 0 : 0; }
function hzDue(c, now = Date.now()) { const r = hzRec(c); return !!r && r.lv >= 1 && r.due <= now; }
function hzLearnSet() {
  const set = new Set(CHAR_ORDER.filter(c => (CHAR_WORDS[c] || []).some(i => S.cards[i])));
  Object.keys(hzwStore()).forEach(c => { if (isHan(c)) set.add(c); });
  return [...set];
}
function hzStats() {
  const now = Date.now(); const all = hzLearnSet(); const byLevel = [0, 0, 0, 0, 0]; let due = 0, practiced = 0;
  all.forEach(c => { byLevel[hzLevel(c)]++; if (hzDue(c, now)) due++; const r = hzRec(c); if (r && (r.n || r.lv)) practiced++; });
  return { total: all.length, byLevel, due, practiced, mastered: byLevel[4] };
}
window.hzLevel = hzLevel; window.hzStats = hzStats;

/* kualitas satu huruf: 3 sempurna · 2 rapi · 1 selesai dengan usaha · 0 belum */
function wrGrade(o) {
  if (o.skip) return 0;
  const N = Math.max(1, o.N || 1); const allow = Math.max(1, Math.ceil(N / (o.mode <= 1 ? 4 : 6)));
  let g = !o.mis && !o.hints ? 3 : o.mis <= allow && !o.hints ? 2 : o.mis <= N + 1 && o.hints <= 2 ? 1 : 0;
  if (o.peek && o.mode >= 2) g = Math.min(g, 1);
  return g;
}
/* naik/turun level + jadwal ulang. opts.noUp: sudah naik di sesi ini · opts.off: dinilai sendiri (luring) → tidak pernah turun */
function wrApply(c, g, opts = {}) {
  const st = hzwStore(); const now = Date.now();
  const r = hzRec(c) || (st[c] = { lv: 0, iv: 0, due: 0, n: 0, g: -1, last: 0, h: '' });
  const from = r.lv | 0; let to = from;
  if (g >= 2 || (from === 0 && g >= 1)) to = Math.min(4, from + 1);
  else if (g === 0 && from >= 2 && !opts.off) to = from - 1;
  if (opts.off && to > from && from >= 1) to = from;
  if (to > from && opts.noUp) to = from;
  let iv = +r.iv || 0;
  if (to > from) iv = to < 4 ? WR_IV[to] : Math.max(8, iv * 2.3);
  else if (to < from) iv = 0.5;
  else if (g >= 2) iv = to === 4 ? Math.max(8, iv * (g === 3 ? 2.6 : 2)) : Math.max(iv, WR_IV[to] || 1);
  else if (g === 1) iv = Math.max(1, Math.min(iv || 1, 3));
  else iv = to ? 0.5 : 0;
  iv = Math.min(120, Math.round(iv * 100) / 100);
  r.lv = to; r.iv = iv; r.due = now + iv * DAY; r.last = now; r.g = g;
  if (g >= 1) r.n = (r.n || 0) + 1;
  r.h = ((r.h || '') + g).slice(-8);
  return { from, to };
}

/* ---------- membangun sesi ---------- */
function wrItemsForWord(i) {
  const w = W[i]; if (!w) return [];
  const cs = [...w.s].map((c, k) => ({ c, k })).filter(o => isHan(o.c));
  return cs.map((o, j) => ({ type: 'write', ch: o.c, ww: i, wk: o.k, wj: j, wn: cs.length }));
}
writeItemsFor = wrItemsForWord;
function wrCtxWord(c) {
  const ws = (CHAR_WORDS[c] || []).filter(i => W[i] && W[i].m);
  const known = ws.filter(i => S.cards[i]);
  const pickW = known.length ? known : ws;
  return pickW.length ? pickW.slice().sort((a, b) => W[a].s.length - W[b].s.length)[0] : undefined;
}
function wrItemsForChars(cs) {
  return cs.map(c => { const cw = wrCtxWord(c); const w = cw !== undefined ? W[cw] : null; return { type: 'write', ch: c, cw, wk: w ? [...w.s].indexOf(c) : -1, wj: 0, wn: 1 }; });
}
function wrItemsForText(s) {
  const hs = [...s].filter(isHan).join('').slice(0, 12); if (!hs) return [];
  const w = W.find(x => x && x.m && (x.s === hs || x.w === hs));
  if (w) return wrItemsForWord(w.i);
  if (hs.length === 1) return wrItemsForChars([hs]);
  return [...hs].map((c, j) => ({ type: 'write', ch: c, fw: hs, wk: j, wj: j, wn: hs.length }));
}
function wrWordNeed(i) {
  const cs = [...W[i].s].filter(isHan); if (!cs.length) return 99;
  return Math.min(...cs.map(c => hzLevel(c) - (hzDue(c) ? 0.6 : 0)));
}
function wrSortNeed(ids) { return shuffle(ids).map(i => [i, wrWordNeed(i)]).sort((a, b) => a[1] - b[1]).map(x => x[0]); }
function wrPack(ids, nWords = 4, cap = 14) {
  const out = []; let n = 0;
  for (const i of ids) {
    if (n >= nWords || out.length >= cap) break;
    const its = wrItemsForWord(i); if (!its.length || out.length + its.length > cap + 2) continue;
    out.push(...its); n++;
  }
  return out;
}
function wrLearnedIds() {
  const ids = Object.keys(S.cards).map(Number).filter(i => W[i] && W[i].m && !S.cards[i].skip && [...W[i].s].some(isHan));
  return ids.length >= 3 ? ids : A2_ORDER.slice(0, 30).filter(i => W[i] && W[i].m);
}
function wrTodayIds() { const tk = todayKey(); return Object.keys(S.cards).map(Number).filter(i => W[i] && W[i].m && S.cards[i].add === tk && !S.cards[i].skip && [...W[i].s].some(isHan)); }
function wrRecentIds(n = 16) { return wrLearnedIds().filter(i => S.cards[i]).sort((a, b) => (S.cards[b].add || '').localeCompare(S.cards[a].add || '') || (S.cards[b].ls || 0) - (S.cards[a].ls || 0)).slice(0, n); }
buildWriteWords = function (nWords = 4, ids) { return wrPack(wrSortNeed(ids && ids.length ? ids : wrLearnedIds()), nWords); };
function wrDueChars(n = 12) { const now = Date.now(); return Object.keys(hzwStore()).filter(c => isHan(c) && hzDue(c, now)).sort((a, b) => hzRec(a).due - hzRec(b).due).slice(0, n); }
function wrBuildDue() { return wrItemsForChars(shuffle(wrDueChars(12))); }
function wrBuildToday() { const td = wrTodayIds(); return buildWriteWords(5, td.length ? td : wrRecentIds()); }
function wrBuildMix() {
  const due = wrDueChars(6); const items = wrItemsForChars(shuffle(due));
  return items.concat(buildWriteWords(due.length >= 4 ? 2 : 4)).slice(0, 18);
}
function wrLessonIds(n) { return typeof klWords === 'function' && typeof KL === 'function' && KL(n) ? klWords(n).filter(i => W[i] && [...W[i].s].some(isHan)) : []; }
function wrBuildLesson(n) { return wrPack(wrSortNeed(wrLessonIds(n)), 5, 16); }
function wrLessonPct(n) {
  const cs = [...new Set(wrLessonIds(n).flatMap(i => [...W[i].s].filter(isHan)))]; if (!cs.length) return 0;
  return Math.round(cs.reduce((a, c) => a + hzLevel(c), 0) / (cs.length * 4) * 100);
}
function wrStart(items, title, rebuild) {
  if (!items || !items.length) { toast(t('Belum ada huruf untuk mode ini — pelajari beberapa kata dulu.')); return; }
  startSession(items, { title: title || t('Latihan menulis'), rebuild });
}
Object.assign(ACT, {
  writedrill: () => wrStart(wrBuildMix(), t('Latihan campur'), wrBuildMix),
  writetoday: () => wrStart(wrBuildToday(), t('Tulis kata hari ini'), wrBuildToday),
  writeword: b => { const i = +b.dataset.v; closeModal(); wrStart(wrItemsForWord(i), t('Latihan menulis'), () => wrItemsForWord(i)); },
  writechar: b => { const c = b.dataset.v; closeModal(); wrStart(wrItemsForChars([c]), t('Latihan menulis'), () => wrItemsForChars([c])); },
  wrdue: () => { if (!wrDueChars(1).length) { toast(t('Tidak ada yang jatuh tempo')); return; } wrStart(wrBuildDue(), t('Ulang tulisan'), wrBuildDue); },
  wrkls: () => wrKlsPicker(),
  wrklsgo: b => { const n = +b.dataset.v; closeModal(); S.settings.wkl = n; save(); wrStart(wrBuildLesson(n), typeof lnShort === 'function' ? lnShort(n) + ' · ' + t('Tulis') : t('Latihan menulis'), () => wrBuildLesson(n)); },
  wrfree: b => { const s = b.dataset.v || ''; closeModal(); wrStart(wrItemsForText(s), t('Latihan bebas'), () => wrItemsForText(s)); },
  wrf: b => { VWR.f = +b.dataset.v; render(); }
});
['wrdue', 'wrklsgo', 'wrfree'].forEach(a => START_ACTS.add(a));
const VWR = { f: -1 };

/* ---------- memuat HanziWriter + data goresan (dengan cache luring) ---------- */
const WR_LIB = 'https://cdn.jsdelivr.net/npm/hanzi-writer@3.7.2/dist/hanzi-writer.min.js';
const WR_DATA = c => `https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/${encodeURIComponent(c)}.json`;
function hwLib() {
  if (window.HanziWriter) return Promise.resolve(window.HanziWriter);
  if (hwLib.p) return hwLib.p;
  if (hwLib.failAt && Date.now() - hwLib.failAt < 30000) return Promise.reject(new Error('lib'));
  hwLib.p = new Promise((res, rej) => {
    let s = document.createElement('script'); s.src = 'hw.js?v=k170'; s.async = true; let local = true;
    let tm = setTimeout(() => fail(), 10000);
    function fail() { clearTimeout(tm);
      if (local) { local = false; s.remove(); s = document.createElement('script'); s.src = WR_LIB; s.async = true; s.onload = onl; s.onerror = () => { s.remove(); fail(); }; tm = setTimeout(() => fail(), 10000); document.head.appendChild(s); return; } hwLib.p = null; hwLib.failAt = Date.now(); loadHanziWriter.failed = true; rej(new Error('lib')); }
    const onl = () => { clearTimeout(tm); if (window.HanziWriter) { hwLib.failAt = 0; loadHanziWriter.failed = false; res(window.HanziWriter); } else fail(); }; s.onload = onl;
    s.onerror = () => { s.remove(); fail(); };
    document.head.appendChild(s);
  });
  return hwLib.p;
}
/* pemuat lama (modal huruf, lensa) ikut memakai jalur yang sama */
loadHanziWriter = function (cb) { hwLib().then(() => { try { cb(); } catch (e) {} }).catch(() => {}); };
const WRD = { mem: {}, bad: {}, KEY: 'xiaobu.hwd', ls: null, t: 0 };
function wrLS() {
  if (WRD.ls) return WRD.ls;
  try { WRD.ls = JSON.parse(localStorage.getItem(WRD.KEY)) || {}; } catch (e) { WRD.ls = {}; }
  if (!WRD.ls || typeof WRD.ls !== 'object' || Array.isArray(WRD.ls)) WRD.ls = {};
  return WRD.ls;
}
function wrLSSave() {
  for (let k = 0; k < 5; k++) {
    try { localStorage.setItem(WRD.KEY, JSON.stringify(WRD.ls)); return; }
    catch (e) { const ks = Object.keys(WRD.ls); if (!ks.length) return; ks.slice(0, Math.ceil(ks.length / 3)).forEach(x => delete WRD.ls[x]); }
  }
}
function wrLSPut(c, d) { const o = wrLS(); delete o[c]; o[c] = d; const ks = Object.keys(o); while (ks.length > 320) delete o[ks.shift()]; clearTimeout(WRD.t); WRD.t = setTimeout(wrLSSave, 900); }
const wrOkData = d => d && Array.isArray(d.strokes) && Array.isArray(d.medians) && d.strokes.length && d.strokes.length === d.medians.length;
function wrCharData(c) {
  const hit = WRD.mem[c] || wrLS()[c];
  if (wrOkData(hit)) { WRD.mem[c] = hit; return Promise.resolve(hit); }
  if (WRD.bad[c] && Date.now() - WRD.bad[c] < 60000) return Promise.reject(new Error('data'));
  if (WRD.mem['p:' + c]) return WRD.mem['p:' + c];
  const ctl = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const tm = setTimeout(() => { try { ctl && ctl.abort(); } catch (e) {} }, 9000);
  const p = fetch(WR_DATA(c), ctl ? { signal: ctl.signal } : undefined)
    .then(r => { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
    .then(d => { if (!wrOkData(d)) throw new Error('bad'); WRD.mem[c] = d; wrLSPut(c, d); return d; })
    .catch(e => { WRD.bad[c] = Date.now(); throw e; })
    .finally(() => { clearTimeout(tm); delete WRD.mem['p:' + c]; });
  WRD.mem['p:' + c] = p;
  return p;
}
const wrLoader = c => wrCharData(c);

/* ---------- pengaturan papan ---------- */
const wrSet = k => { const s = S.settings; const d = { wspeed: 1, wsnd: true, wpen: 'auto', wgrid: 'mi' }; return s[k] === undefined ? d[k] : s[k]; };
function wrColor(v, a) {
  try {
    const el = document.createElement('i'); el.style.color = `var(${v})`; el.style.display = 'none'; document.body.appendChild(el);
    const c = getComputedStyle(el).color; el.remove();
    const cv = wrColor.cv || (wrColor.cv = document.createElement('canvas')); cv.width = cv.height = 1;
    const x = cv.getContext('2d', { willReadFrequently: true }); x.clearRect(0, 0, 1, 1); x.fillStyle = '#808080'; x.fillStyle = c; x.fillRect(0, 0, 1, 1);
    const d = x.getImageData(0, 0, 1, 1).data;
    return `rgba(${d[0]},${d[1]},${d[2]},${a === undefined ? 1 : a})`;
  } catch (e) { return a === undefined ? '#333333' : `rgba(128,128,128,${a})`; }
}
function wrColors() {
  return { ink: wrColor('--ink'), outline: wrColor('--ink', 0.13), draw: wrColor('--c6'), hint: wrColor('--c3', 0.85), ok: wrColor('--ok') };
}
function wrSnd(kind, k = 0) {
  if (!wrSet('wsnd')) return;
  try {
    if (!S.settings.sound || !FX.ensure() || FX.ctx.state !== 'running') return;
    const P = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.5, 1568];
    if (kind === 'ok') FX.note(P[Math.min(8, k)], 0, 0.11, 'sine', 0.07);
    else if (kind === 'bad') { FX.note(247, 0, 0.12, 'triangle', 0.06); FX.note(208, 0.07, 0.16, 'triangle', 0.05); }
    else if (kind === 'hint') FX.note(988, 0, 0.08, 'sine', 0.04);
  } catch (e) {}
}

/* ---------- papan tulis ---------- */
let WS = null, WTOK = 0;
const WPEN = { seen: false, last: 0, told: false, warnT: 0 };
const wrAlive = tok => !!(WS && WS.tok === tok && !WS.dead && SES && SES.items[SES.i] === WS.it && document.getElementById('wrboard'));
function wrUnmount() {
  if (!WS) return; const o = WS; WS = null; o.dead = true;
  [o.tAuto, o.tLoad, o.tFlash, o.tMsg].forEach(clearTimeout);
  try { o.ro && o.ro.disconnect(); } catch (e) {}
  try { o.hw && o.hw.cancelQuiz && o.hw.cancelQuiz(); } catch (e) {}
}
function wrGridSVG() {
  const g = wrSet('wgrid'); if (g === 'none') return '<svg class="wr-grid" viewBox="0 0 100 100" preserveAspectRatio="none"></svg>';
  return `<svg class="wr-grid" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M50 0V100M0 50H100" class="wr-gl"/>${g === 'mi' ? '<path d="M0 0L100 100M100 0L0 100" class="wr-gl wr-gd"/>' : ''}</svg>`;
}
function wrWordOf(it) { return it.ww !== undefined ? W[it.ww] : it.cw !== undefined ? W[it.cw] : null; }
function wrCtxHTML(it) {
  const m = it.mode; const blind = m >= 3 && !(WS && WS.done) && !(SES && SES.answered);
  const ch = it.ch; const w = wrWordOf(it); const seq = it.ww !== undefined || !!it.fw;
  const text = w ? w.s : it.fw || ch;
  const cells = [...text].map((c, k) => {
    if (!isHan(c)) return '';
    const now = k === it.wk || (!w && !it.fw && c === ch);
    const st = now ? 'now' : seq ? (k < it.wk ? 'done' : 'next') : 'other';
    const py = w && aligned(w) && w.y[k] ? w.y[k] : charPy(c); const tn = w && aligned(w) ? w.t[k] : charTone(c);
    return `<span class="wr-cell ${st}"${now ? ' id="wrnow"' : ''}><span class="hz">${now && blind ? '？' : c}</span><small class="t${tn}">${esc(py || '')}</small></span>`;
  }).join('');
  const solo = [...text].filter(isHan).length === 1;
  const mean = w ? meanP(w) : it.fw ? '' : charMean(ch);
  const wpy = w ? (aligned(w) ? w.y.join(' ') : w.p || '') : solo ? charPy(ch) : '';
  const kp = keyPart(ch), sp = soundPart(ch);
  const parts = !blind && (kp || sp) ? `<div class="wr-parts"><span class="wr-pl">${t('Bagian')}</span>${[kp, sp].filter(Boolean).map(o => `<span class="wr-part r-${o.role}"><b class="hz">${o.p}</b>${esc(partMean(o) || o.py || '')}</span>`).join('')}</div>` : '';
  const story = m <= 2 && charStory(ch) ? `<div class="wr-tip">${ICON('lightbulb')}<span>${esc(charStory(ch))}</span></div>` : '';
  const say = voiceOK() ? `<button class="wr-say" data-s="wr-say" aria-label="${t('Dengar')}">${ICON('speaker')}</button>` : '';
  const dots = [0, 1, 2, 3, 4].map(k => `<i class="${k < m ? 'on' : k === m ? 'cur' : ''}"></i>`).join('');
  return `<div class="wr-lvb l${m}"><span class="wr-lvn">L${m}</span><b>${t(WR_LV[m])}</b><span class="wr-dots" aria-hidden="true">${dots}</span><span class="grow"></span><span class="wr-cnt">${t('Huruf {a}/{b}', { a: SES.i + 1, b: SES.items.length })}</span></div>
    <p class="wr-task">${t(WR_TASK[m])}</p>
    <div class="wr-word"><div class="wr-cells">${cells}</div>
      <div class="wr-wm">${wpy ? `<b class="wr-wpy">${esc(wpy)}</b>` : ''}<span class="wr-mean">${esc(mean)}</span>${w ? lvBadgeW(w.i, 'sm') : it.fw ? '' : lvBadgeW(ch, 'sm')}${say}</div></div>
    <div class="wr-char">${solo ? '' : `<b class="t${charTone(ch)}">${esc(charPy(ch))}</b><span>${esc(charMean(ch) || '')}</span>`}<span class="wr-n" id="wrN"></span></div>
    ${parts}${story}
    <p class="wr-keys">${t('Pintasan: H petunjuk · O garis · P putar · U/← undo · R ulang · S lewati · Spasi/Enter lanjut')}</p>`;
}
function wrStageHTML(it) {
  return `<div class="wr-stage" id="wrstage">
    <aside class="wr-ctx" id="wrctx">${wrCtxHTML(it)}</aside>
    <div class="wr-bw" id="wrbw">
      <div class="wr-board" id="wrboard">
        ${wrGridSVG()}
        <div class="wr-target" id="wtarget"></div>
        <div class="wr-msg on" id="wrmsg" aria-live="polite"><span class="wr-spin"></span>${t('memuat papan tulis…')}</div>
        <div class="wr-pad" id="wrpad"></div>
        <div class="wr-sc" id="wrsc"></div>
        <div class="wr-stamp" id="wrstamp"></div>
      </div>
    </div>
    <div class="wr-setp" id="wrsetp" hidden></div>
  </div>`;
}
function wrTB(s, ic, lbl, extra = '') { return `<button class="wr-tb" data-s="${s}" aria-label="${esc(lbl)}" ${extra}>${ICON(ic)}<span>${esc(lbl)}</span></button>`; }
function wrBarHTML() {
  return `<div class="inner wr-bar">
    ${wrTB('wr-hint', 'lightbulb', t('Petunjuk'))}
    ${wrTB('wr-outline', 'grid', t('Garis'), `aria-pressed="${WS && WS.outline}" id="wrob"`)}
    ${wrTB('wr-replay', 'play', t('Putar'))}
    ${wrTB('wr-undo', 'undo', t('Undo'))}
    ${wrTB('wr-restart', 'refresh', t('Ulang'))}
    ${wrTB('wr-skip', 'chevron', t('Lewati'))}
    ${wrTB('wr-set', 'settings', t('Atur'))}</div>`;
}
function wrMsg(html, ms) {
  if (!WS) return; const el = document.getElementById('wrmsg'); if (!el) return;
  clearTimeout(WS.tMsg); el.innerHTML = html; el.classList.toggle('on', !!html);
  if (ms && html) { const tok = WS.tok; WS.tMsg = setTimeout(() => { if (WS && WS.tok === tok) { el.classList.remove('on'); } }, ms); }
}
function wrCount() {
  const el = document.getElementById('wrsc'); if (!el || !WS) return;
  el.textContent = WS.N ? t('goresan {a}/{b}', { a: Math.min(WS.si, WS.N), b: WS.N }) : '';
  const n = document.getElementById('wrN'); if (n && WS.N) n.textContent = t('{n} goresan', { n: WS.N });
}
function wrFlash(k) {
  const b = document.getElementById('wrboard'); if (!b || !WS) return;
  b.classList.remove('f-ok', 'f-bad'); void b.offsetWidth; b.classList.add(k);
  clearTimeout(WS.tFlash); WS.tFlash = setTimeout(() => b.classList.remove(k), 420);
}

renderWrite = function (it) {
  wrUnmount(); TRACE = null; WHW = null;
  const tok = ++WTOK; const practice = !!(SES && SES.answered);
  if (it.mode === undefined) { it.lv0 = hzLevel(it.ch); it.mode = it.lv0; }
  WS = { tok, it, ch: it.ch, mode: it.mode, phase: 'load', si: 0, N: 0, mis: 0, hints: 0, peek: false, outline: it.mode <= 1, done: false, practice, size: 300, act: {}, off: false };
  const ses = document.getElementById('session'); if (ses) ses.classList.add('wr');
  $('#sbody').innerHTML = wrStageHTML(it); $('#sbody').scrollTop = 0;
  $('#sfoot').innerHTML = wrBarHTML();
  wrBindPad(); wrLayout();
  try { WS.ro = new ResizeObserver(() => { if (!WS || WS.tok !== tok) return; cancelAnimationFrame(WS.raf); WS.raf = requestAnimationFrame(wrLayout); }); WS.ro.observe(document.getElementById('wrstage')); } catch (e) {}
  if (it.wj === 0 && !it.retry) SES.wrWordG = [];
  WS.tLoad = setTimeout(() => { if (wrAlive(tok) && WS.phase === 'load') wrFallback(tok, 'slow'); }, 15000);
  hwLib().then(() => { if (wrAlive(tok)) wrCreate(tok); }).catch(() => { if (wrAlive(tok)) wrFallback(tok, 'lib'); });
};
function wrLayout() {
  if (!WS) return; const st = document.getElementById('wrstage'); const bw = document.getElementById('wrbw'); const bd = document.getElementById('wrboard'); if (!st || !bw || !bd) return;
  const W0 = st.clientWidth, H0 = st.clientHeight;
  st.classList.toggle('land', W0 >= 700 && W0 >= H0 * 1.12);
  st.classList.toggle('tight', H0 < 560);
  const land = st.classList.contains('land'); const cx = document.getElementById('wrctx');
  bw.style.width = land ? Math.max(200, Math.min(st.clientHeight, W0 - (cx ? cx.offsetWidth : 0) - 22)) + 'px' : '';
  const cap = Math.max(300, innerHeight * 0.8);
  const s = Math.max(200, Math.floor(Math.min(bw.clientWidth, bw.clientHeight, cap) - 2));
  bd.style.width = bd.style.height = s + 'px';
  if (s === WS.size && WS.sized) return; WS.size = s; WS.sized = true;
  const hw = WS.hw;
  if (hw && typeof hw.updateDimensions === 'function') { try { hw.updateDimensions({ width: s, height: s, padding: Math.round(s * 0.05) }); } catch (e) {} }
}
function wrCreate(tok) {
  const it = WS.it; const sp = +wrSet('wspeed') || 1; const col = wrColors();
  const box = document.getElementById('wtarget'); if (!box) return;
  box.innerHTML = '';
  try {
    WS.hw = HanziWriter.create(box, it.ch, {
      width: WS.size, height: WS.size, padding: Math.round(WS.size * 0.05), showCharacter: false, showOutline: WS.outline,
      strokeColor: col.ink, outlineColor: col.outline, drawingColor: col.draw, highlightColor: col.hint, highlightCompleteColor: col.ok,
      drawingWidth: 46, drawingFadeDuration: 260, strokeAnimationSpeed: sp, delayBetweenStrokes: Math.round(320 / sp), strokeFadeDuration: 260,
      strokeHighlightSpeed: 1.1, strokeHighlightDuration: 380,
      charDataLoader: wrLoader,
      onLoadCharDataSuccess: d => wrReady(tok, d),
      onLoadCharDataError: () => wrFallback(tok, 'data')
    });
  } catch (e) { wrFallback(tok, 'lib'); }
}
function wrReady(tok, d) {
  if (!wrAlive(tok) || WS.phase !== 'load') return;
  clearTimeout(WS.tLoad); WS.N = (d && d.strokes && d.strokes.length) || 0;
  wrMsg(''); wrCount();
  const it = WS.it;
  if (WS.mode === 0 && !WS.practice) {
    WS.phase = 'watch'; wrMsg(`${ICON('play')} ${t('ketuk papan untuk langsung menulis')}`);
    try { WS.hw.animateCharacter({ onComplete: () => { if (wrAlive(tok) && WS.phase === 'watch') wrQuiz(tok, 0); } }); } catch (e) { wrQuiz(tok, 0); }
  } else wrQuiz(tok, 0);
  if (WS.mode >= 3 && voiceOK() && S.settings.autoplay !== false) speakFor(it, it.ch, 300);
  // siapkan data huruf berikutnya
  SES.items.slice(SES.i + 1, SES.i + 4).forEach(x => { if (x && x.type === 'write') wrCharData(x.ch).catch(() => {}); });
}
function wrQuiz(tok, from) {
  if (!wrAlive(tok) || !WS.hw) return;
  const m = WS.mode; WS.phase = 'write'; WS.si = from; wrMsg(''); wrCount();
  try {
    WS.hw.quiz({
      quizStartStrokeNum: from, leniency: [1.35, 1.2, 1.08, 1, 1][m], showHintAfterMisses: [1, 2, 2, 3, 3][m],
      markStrokeCorrectAfterMisses: m <= 1 ? 4 : 5, highlightOnComplete: true, acceptBackwardsStrokes: false,
      onCorrectStroke: dt => { if (!wrAlive(tok)) return; WS.si = dt.strokeNum + 1; wrFlash('f-ok'); wrSnd('ok', Math.round(WS.si / Math.max(1, WS.N) * 7)); wrCount(); },
      onMistake: dt => {
        if (!wrAlive(tok)) return; WS.mis++; wrFlash('f-bad'); wrSnd('bad');
        wrMsg(dt.isBackwards ? t('Arahnya terbalik') : t('Goresan ke-{n}: coba lagi', { n: dt.strokeNum + 1 }), 1400);
      },
      onComplete: () => { if (wrAlive(tok)) setTimeout(() => wrFinish(tok, {}), 60); }
    });
    if (m === 2 && from === 0 && !WS.firstHint) { WS.firstHint = 1; setTimeout(() => { if (wrAlive(tok) && WS.phase === 'write' && WS.si === 0) try { WS.hw.highlightStroke(0); } catch (e) {} }, 350); }
  } catch (e) { wrFallback(tok, 'lib'); }
}

/* ---------- input: pointer events, satu goresan sekaligus, penolakan telapak ---------- */
function wrRejectTouch(e) {
  const m = wrSet('wpen');
  if (m === 'off') return false;
  if (m === 'on') { if (Date.now() - WPEN.warnT > 6000) { WPEN.warnT = Date.now(); toast(t('Mode stylus: jari diabaikan. Ubah di Atur.'), 2600, 'wpen'); } return true; }
  if (!WPEN.seen) return false;
  if (Date.now() - WPEN.last < 2500) return true;           // tangan yang memegang pena masih di layar
  return (e.width || 0) > 36 && (e.height || 0) > 36;        // bidang sentuh besar = telapak
}
function wrBindPad() {
  const pad = document.getElementById('wrpad'); if (!pad) return;
  let act = null;
  const pt = e => { const r = pad.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  pad.addEventListener('pointerdown', e => {
    if (!WS) return;
    if (e.pointerType === 'pen') { WPEN.last = Date.now(); if (!WPEN.seen) { WPEN.seen = true; if (wrSet('wpen') === 'auto' && !WPEN.told) { WPEN.told = true; toast(t('Stylus terdeteksi — sentuhan telapak tangan diabaikan.'), 2600, 'wpen'); } } }
    if (act) return;                                         // jari/telapak kedua diabaikan selama menggores
    if (e.pointerType === 'touch' && wrRejectTouch(e)) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.preventDefault();
    if (WS.phase === 'watch' || WS.phase === 'anim') { wrQuiz(WS.tok, WS.si); }
    if (WS.phase !== 'write' && WS.phase !== 'fallback') return;
    act = { id: e.pointerId };
    try { pad.setPointerCapture(e.pointerId); } catch (err) {}
    wrFeed('start', pt(e));
  }, { passive: false });
  pad.addEventListener('pointermove', e => {
    if (e.pointerType === 'pen') WPEN.last = Date.now();
    if (!act || e.pointerId !== act.id) return; e.preventDefault();
    const evs = typeof e.getCoalescedEvents === 'function' ? e.getCoalescedEvents() : null;
    (evs && evs.length ? evs : [e]).forEach(ev => wrFeed('move', pt(ev)));
  }, { passive: false });
  const end = e => { if (!act || e.pointerId !== act.id) return; act = null; if (e.pointerType === 'pen') WPEN.last = Date.now(); wrFeed('end'); };
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(k => pad.addEventListener(k, end));
  ['touchstart', 'touchmove', 'touchend', 'touchcancel'].forEach(k => pad.addEventListener(k, e => { if (e.cancelable) e.preventDefault(); e.stopPropagation(); }, { passive: false }));
  ['mousedown', 'mouseup', 'mousemove', 'dblclick', 'contextmenu', 'selectstart', 'dragstart'].forEach(k => pad.addEventListener(k, e => { e.preventDefault(); e.stopPropagation(); }));
}
function wrFeed(kind, p) {
  if (!WS) return;
  if (WS.phase === 'fallback') return wrInk(kind, p);
  if (WS.phase !== 'write' || !WS.hw) return;
  const q = WS.hw._quiz;
  if (q && typeof q.startUserStroke === 'function') {
    try { if (kind === 'start') q.startUserStroke(p); else if (kind === 'move') q.continueUserStroke(p); else q.endUserStroke(); } catch (e) {}
    return;
  }
  // cadangan bila struktur internal berubah: kirim kejadian mouse ke svg HanziWriter
  const node = document.querySelector('#wtarget svg'); if (!node) return; const r = node.getBoundingClientRect();
  const o = p ? { bubbles: true, cancelable: true, clientX: r.left + p.x, clientY: r.top + p.y, button: 0 } : { bubbles: true };
  if (kind === 'start') node.dispatchEvent(new MouseEvent('mousedown', o));
  else if (kind === 'move') node.dispatchEvent(new MouseEvent('mousemove', o));
  else document.dispatchEvent(new MouseEvent('mouseup', o));
}

/* ---------- selesai satu huruf ---------- */
function wrFinish(tok, o = {}) {
  if (!wrAlive(tok) || WS.done) return;
  WS.done = true; WS.phase = 'done'; clearTimeout(WS.tLoad);
  const it = WS.it; const skip = !!o.skip;
  const g = o.g !== undefined ? o.g : wrGrade({ N: WS.N, mis: WS.mis, hints: WS.hints, peek: WS.peek, mode: WS.mode, skip });
  let lv = { from: hzLevel(it.ch), to: hzLevel(it.ch) };
  if (!WS.practice && !(skip && WS.off)) {
    SES.wrUp = SES.wrUp || {};
    lv = wrApply(it.ch, g, { noUp: !!SES.wrUp[it.ch], off: WS.off });
    if (lv.to > lv.from) SES.wrUp[it.ch] = 1;
    if (g >= 1) { S.hzWrite = S.hzWrite || {}; S.hzWrite[it.ch] = (S.hzWrite[it.ch] || 0) + 1; const d = dayRec(); d.write = (d.write || 0) + 1; }
    (SES.wrLog = SES.wrLog || []).push({ ch: it.ch, g, from: lv.from, to: lv.to, skip });
    if (it.ww !== undefined || it.fw) (SES.wrWordG = SES.wrWordG || []).push(g);
  }
  WS.res = { g, from: lv.from, to: lv.to, skip, mis: WS.mis, hints: WS.hints };
  const ctx = document.getElementById('wrctx'); if (ctx) { ctx.innerHTML = wrCtxHTML(it); wrCount(); }
  const cell = document.getElementById('wrnow'); if (cell && g >= 1) cell.classList.add('ok');
  if (WS.practice) { wrShowResult(); return; }
  if (g === 0 && !skip && !it.retry && SES.items.length < 60) {
    SES.items.splice(Math.min(SES.i + 2, SES.items.length), 0, { type: 'write', ch: it.ch, cw: it.ww !== undefined ? it.ww : it.cw, wk: it.wk, wj: 0, wn: 1, retry: 1 });
  }
  answer(g >= 1, '');   // XP, combo, progres → writeFeedback
}
writeFeedback = function (it) { if (WS && WS.it === it && WS.res) wrShowResult(); else $('#sfoot').innerHTML = `<div class="inner"><button class="btn pri big wide" data-s="next">${t('Lanjut')}</button></div>`; };
const WR_GN = ['Belum rapi', 'Selesai — masih perlu latihan', 'Rapi!', 'Sempurna!'];
function wrShowResult() {
  if (!WS || !WS.res) return; const r = WS.res; const it = WS.it; const tok = WS.tok;
  const w = wrWordOf(it); const wordDone = (it.ww !== undefined || it.fw) && it.wn > 1 && it.wj === it.wn - 1 && !WS.practice;
  const lvTxt = r.to > r.from ? `<span class="wr-up">${ICON('chevron')} ${t('naik ke {l}', { l: 'L' + r.to + ' ' + t(WR_LV[r.to]) })}</span>`
    : r.to < r.from ? `<span class="wr-down">${t('turun ke {l}', { l: 'L' + r.to })}</span>` : `<span>${t('tetap {l}', { l: 'L' + r.to })}</span>`;
  const det = r.skip ? t('Dilewati') : WS.practice ? t('latihan ulang — level tidak berubah')
    : [r.mis ? t('{n} koreksi', { n: r.mis }) : t('tanpa koreksi'), r.hints ? t('{n} petunjuk', { n: r.hints }) : ''].filter(Boolean).join(' · ');
  const stars = [1, 2, 3].map(k => `<i class="${r.g >= k ? 'on' : ''}"></i>`).join('');
  const auto = wAuto() && r.g >= 1 && !WS.practice; const ms = wordDone ? 1900 : 1150;
  $('#sfoot').innerHTML = `<div class="inner wr-bar wr-done">
    <div class="wr-res g${r.g}"><span class="wr-stars">${stars}</span><div><b>${t(r.skip ? 'Dilewati' : WR_GN[r.g])}</b><small>${det}${WS.practice || r.skip ? '' : ' · '}${WS.practice || r.skip ? '' : lvTxt}</small></div></div>
    <button class="btn sec wr-again" data-s="wr-redo">${ICON('refresh')} <span>${t('Ulangi')}</span></button>
    <button class="btn pri big wnext ${auto ? 'counting' : ''}" data-s="next" style="--ms:${ms}ms">${t('Lanjut')}<i class="autobar"></i></button></div>`;
  const stamp = document.getElementById('wrstamp');
  if (stamp) {
    stamp.className = 'wr-stamp on g' + r.g;
    stamp.innerHTML = wordDone && w ? `<div class="wr-wsum"><b>${t('Kata selesai!')}</b><span class="hz">${esc((w.w || w.s).replace(/[()]/g, ''))}</span><em>${esc(aligned(w) ? w.y.join(' ') : w.p || '')}</em><small>${esc(meanP(w))}</small><span class="wr-wg">${(SES.wrWordG || []).map(g => `<i class="g${g}"></i>`).join('')}</span></div>`
      : wordDone && it.fw ? `<div class="wr-wsum"><b>${t('Kata selesai!')}</b><span class="hz">${esc(it.fw)}</span></div>`
      : `<span class="wr-big g${r.g}">${r.g >= 2 ? ICON('check') : r.g === 1 ? ICON('check') : ICON('refresh')}</span>`;
  }
  if (voiceOK() && !r.skip) { if (wordDone && w) speakFor(it, w.s, 160); else speakFor(it, it.ch, 140); }
  if (auto) WS.tAuto = setTimeout(() => { if (WS && WS.tok === tok && SES && cur() === it && SES.answered) { SES.lastNext = 0; nextItem(); } }, ms);
}

/* ---------- cadangan luring: jiplak bebas + nilai sendiri ---------- */
function wrFallback(tok, why) {
  if (!wrAlive(tok) || WS.done || WS.phase === 'fallback') return;
  clearTimeout(WS.tLoad); try { WS.hw && WS.hw.cancelQuiz && WS.hw.cancelQuiz(); } catch (e) {}
  WS.hw = null; WS.phase = 'fallback'; WS.off = true; WS.fbCmp = false; WS.ink = 0;
  const box = document.getElementById('wtarget'); if (!box) return;
  const ghost = WS.mode <= 2;
  box.innerHTML = `<span class="hz wr-ghost ${ghost ? 'on' : ''}" id="wrghost">${WS.ch}</span><canvas class="wr-ink" id="wrink"></canvas>`;
  wrMsg(`<span>${t('Data goresan tidak bisa dimuat (offline?). Jiplak bebas di bawah, lalu bandingkan — atau lewati.')}</span><button class="btn small sec" data-s="wr-reload">${ICON('refresh')} ${t('Coba muat lagi')}</button>`);
  document.getElementById('wrmsg').classList.add('fb');
  wrFbBar();
}
function wrFbBar() {
  if (!WS) return;
  $('#sfoot').innerHTML = WS.fbCmp
    ? `<div class="inner wr-bar wr-done">${wrTB('wr-fb-clear', 'refresh', t('Bersihkan'))}<button class="btn sec" data-s="wr-fb-no">${t('Belum mirip')}</button><button class="btn pri big" data-s="wr-fb-ok">${ICON('check')} ${t('Mirip')}</button></div>`
    : `<div class="inner wr-bar">${wrTB('wr-fb-clear', 'refresh', t('Bersihkan'))}${wrTB('wr-skip', 'chevron', t('Lewati'))}<button class="btn pri big wr-cmp" data-s="wr-fb-cmp">${t('Bandingkan')}</button></div>`;
}
function wrInk(kind, p) {
  const cv = document.getElementById('wrink'); if (!cv || !WS) return;
  const r = cv.getBoundingClientRect(); const dpr = Math.min(2, window.devicePixelRatio || 1);
  if (cv.width !== Math.round(r.width * dpr)) { cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr); }
  const x = cv.getContext('2d'); x.setTransform(dpr, 0, 0, dpr, 0, 0);
  x.lineCap = x.lineJoin = 'round'; x.lineWidth = Math.max(6, r.width / 26); x.strokeStyle = wrInk.c || (wrInk.c = wrColor('--ink'));
  if (kind === 'start') { if (WS.ink === 0) wrMsg(''); WS.lp = p; WS.mp = p; WS.ink++; x.beginPath(); x.arc(p.x, p.y, x.lineWidth / 2, 0, 7); x.fillStyle = x.strokeStyle; x.fill(); }
  else if (kind === 'move' && WS.lp) { const mid = { x: (WS.lp.x + p.x) / 2, y: (WS.lp.y + p.y) / 2 }; x.beginPath(); x.moveTo(WS.mp.x, WS.mp.y); x.quadraticCurveTo(WS.lp.x, WS.lp.y, mid.x, mid.y); x.stroke(); WS.mp = mid; WS.lp = p; }
  else if (kind === 'end') { WS.lp = null; }
}

/* ---------- aksi papan (klik & tombol keyboard) ---------- */
function wrAct(a, b) {
  if (!SES || !WS) return;
  const key = a === 'wr-opt' && b ? a + b.dataset.k : a;
  const now = Date.now(); if (now - (WS.act[key] || 0) < 260) return; WS.act[key] = now;
  const tok = WS.tok; const hw = WS.hw; const ph = WS.phase;
  if (a === 'wr-set') return wrSetPanel();
  if (a === 'wr-opt') return wrOpt(b.dataset.k, b.dataset.v);
  if (a === 'wr-say') { FX.ensure(); const w = wrWordOf(WS.it); return TTS.speak(w && !(WS.mode >= 3 && !WS.done && !SES.answered) ? w.s : WS.ch); }
  if (a === 'wr-redo') { clearTimeout(WS.tAuto); return renderWrite(cur()); }
  if (a === 'wr-reload') { hwLib.failAt = 0; delete WRD.bad[WS.ch]; if (SES.answered && !WS.practice) return; return renderWrite(cur()); }
  if (a === 'wr-skip') { if (WS.done) return; if (ph === 'load') WS.off = true; return wrFinish(tok, { skip: true }); }
  if (ph === 'fallback') {
    if (a === 'wr-fb-clear' || a === 'wr-restart') { const cv = document.getElementById('wrink'); if (cv) cv.getContext('2d').clearRect(0, 0, cv.width, cv.height); WS.ink = 0; return; }
    if (a === 'wr-fb-cmp') { if (!WS.ink) { toast(t('Jiplak dulu bentuknya ✎')); return; } WS.fbCmp = true; const gh = document.getElementById('wrghost'); if (gh) gh.classList.add('on', 'cmp'); wrMsg(''); return wrFbBar(); }
    if (a === 'wr-fb-ok') return wrFinish(tok, { g: 1 });
    if (a === 'wr-fb-no') return wrFinish(tok, { g: 0 });
    if (a === 'wr-hint' || a === 'wr-outline') { const gh = document.getElementById('wrghost'); if (gh) { gh.classList.toggle('on'); WS.hints++; } return; }
    return;
  }
  if (!hw || WS.done && a !== 'wr-replay') return;
  try {
    if (a === 'wr-hint') {
      if (ph !== 'write') return;
      WS.hints++; wrSnd('hint'); hw.highlightStroke(WS.si);
      wrMsg(t('goresan {a}/{b}', { a: WS.si + 1, b: WS.N }), 1200);
    } else if (a === 'wr-outline') {
      WS.outline = !WS.outline; if (WS.outline) { hw.showOutline(); if (WS.mode >= 2) WS.peek = true; } else hw.hideOutline();
      const ob = document.getElementById('wrob'); if (ob) ob.setAttribute('aria-pressed', WS.outline);
    } else if (a === 'wr-replay') {
      if (WS.done) { hw.animateCharacter(); return; }
      if (WS.mode >= 2) WS.peek = true;
      WS.phase = 'anim'; wrMsg(`${ICON('play')} ${t('ketuk papan untuk langsung menulis')}`);
      hw.animateCharacter({ onComplete: () => { if (wrAlive(tok) && WS.phase === 'anim') wrQuiz(tok, WS.si); } });
    } else if (a === 'wr-undo') {
      if (ph !== 'write') return;
      if (WS.si <= 0) { wrMsg(t('Belum ada goresan untuk dibatalkan'), 1200); return; }
      wrQuiz(tok, WS.si - 1);
    } else if (a === 'wr-restart') {
      wrQuiz(tok, 0);
    }
  } catch (e) { console.warn('write action', a, e); }
}
function wrSetPanel(close) {
  const p = document.getElementById('wrsetp'); if (!p) return;
  if (close || !p.hidden) { p.hidden = true; return; }
  const seg = (k, opts) => `<div class="seg wr-seg">${opts.map(([v, l]) => `<button data-s="wr-opt" data-k="${k}" data-v="${v}" class="${String(k === 'wauto' ? wAuto() : wrSet(k)) === String(v) ? 'on' : ''}">${esc(l)}</button>`).join('')}</div>`;
  p.innerHTML = `<div class="wr-setc glass"><div class="wr-seth"><b>${ICON('settings')} ${t('Atur')}</b><button class="btn ghost small" data-s="wr-set">${t('Tutup')}</button></div>
    <label>${t('Kecepatan animasi')}</label>${seg('wspeed', [[0.6, t('Lambat')], [1, t('Normal')], [1.7, t('Cepat')]])}
    <label>${t('Lanjut otomatis')}</label>${seg('wauto', [[true, t('Nyala')], [false, t('Mati')]])}
    <label>${t('Suara goresan')}</label>${seg('wsnd', [[true, t('Nyala')], [false, t('Mati')]])}
    <label>${t('Mode stylus')}</label>${seg('wpen', [['auto', t('Otomatis')], ['on', t('Abaikan jari')], ['off', t('Mati')]])}
    <label>${t('Kotak')}</label>${seg('wgrid', [['mi', '米'], ['tian', '田'], ['none', t('Polos')]])}
    <p class="small muted">${t('Satu huruf naik maksimal satu level per sesi.')}</p></div>`;
  p.hidden = false;
}
function wrOpt(k, v) {
  if (v === 'true') v = true; else if (v === 'false') v = false; else if (k === 'wspeed') v = +v;
  S.settings[k] = v; save();
  if (k === 'wspeed' && WS && WS.hw && WS.hw._options) { WS.hw._options.strokeAnimationSpeed = v; WS.hw._options.delayBetweenStrokes = Math.round(320 / v); }
  if (k === 'wgrid') { const g = document.querySelector('#wrboard .wr-grid'); if (g) g.outerHTML = wrGridSVG(); }
  if (k === 'wauto' && WS && WS.done && !v) { clearTimeout(WS.tAuto); const n = document.querySelector('.wnext'); if (n) n.classList.remove('counting'); }
  const p = document.getElementById('wrsetp'); if (p) { p.hidden = true; wrSetPanel(); }
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-s^="wr-"]'); if (!b || !SES || !b.closest('#session')) return;
  e.stopPropagation(); e.preventDefault();
  try { wrAct(b.dataset.s, b); } catch (err) { console.error('write', err); }
}, true);
window.addEventListener('keydown', e => {
  if (!SES || !WS || !document.querySelector('#session.wr') || document.querySelector('.overlay')) return;
  const tg = e.target; if (tg && (/^(INPUT|TEXTAREA|SELECT)$/.test(tg.tagName) || tg.isContentEditable)) return;
  if (e.metaKey || e.altKey) return;
  const k = e.key.toLowerCase(); let a = null;
  if (k === 'escape') { const p = document.getElementById('wrsetp'); if (p && !p.hidden) { e.preventDefault(); e.stopImmediatePropagation(); p.hidden = true; } return; }
  if (e.ctrlKey && k !== 'z') return;
  if (k === 'h') a = 'wr-hint'; else if (k === 'r') a = 'wr-restart'; else if (k === 'o') a = 'wr-outline'; else if (k === 'p') a = 'wr-replay';
  else if (k === 'u' || k === 'backspace' || k === 'arrowleft' || (e.ctrlKey && k === 'z')) a = WS.phase === 'fallback' ? 'wr-fb-clear' : 'wr-undo';
  else if (k === 's') a = 'wr-skip';
  else if (k === ' ' || k === 'enter' || k === 'arrowright') {
    if (WS.done || (SES.answered && !WS.practice)) a = 'next';
    else if (WS.phase === 'fallback' && k === 'enter') a = WS.fbCmp ? 'wr-fb-ok' : 'wr-fb-cmp';
    else if (k === ' ') a = 'wr-say';
  }
  if (!a) { if (k === ' ' || k === 'enter') { e.preventDefault(); e.stopImmediatePropagation(); } return; }
  e.preventDefault(); e.stopImmediatePropagation(); if (e.repeat) return;
  if (a === 'next') { clearTimeout(WS.tAuto); nextItem(); return; }
  wrAct(a);
}, true);
document.addEventListener('gesturestart', e => { if (document.querySelector('#session.wr')) e.preventDefault(); }, { passive: false });

/* ---------- integrasi runner sesi ---------- */
const wrRenderItemBase = renderItem;
renderItem = function () {
  const it = SES && SES.items[SES.i];
  if (!it || it.type !== 'write') { wrUnmount(); const s = document.getElementById('session'); if (s) s.classList.remove('wr'); }
  return wrRenderItemBase.apply(this, arguments);
};
const wrEndBase = endSession;
endSession = function () { wrUnmount(); return wrEndBase.apply(this, arguments); };
const wrSumBase = showSummary;
showSummary = function () {
  const log = SES && SES.wrLog && !SES.summarized ? SES.wrLog.slice() : null;
  wrUnmount(); const s = document.getElementById('session'); if (s) s.classList.remove('wr');
  const r = wrSumBase.apply(this, arguments);
  if (log && log.length) { const k = document.querySelector('#sbody .summary .kpis'); if (k) k.insertAdjacentHTML('afterend', wrSumHTML(log)); }
  return r;
};
function wrSumHTML(log) {
  const last = {}; log.forEach(x => { const p = last[x.ch]; last[x.ch] = p ? { ch: x.ch, g: x.g, from: p.from, to: x.to, skip: x.skip } : Object.assign({}, x); });
  const xs = Object.values(last); const up = xs.filter(x => x.to > x.from).length; const perfect = log.filter(x => x.g === 3).length;
  const tm = Date.now() + DAY; const dueTom = Object.keys(hzwStore()).filter(c => hzDue(c, tm) && !hzDue(c)).length;
  const st = hzStats();
  return `<div class="wr-sum"><h3>${ICON('write')} ${t('Hasil menulis')}</h3>
    <div class="row wrap" style="gap:6px;justify-content:center"><span class="chip">${ICON('chevron')} ${t('{n} huruf naik level', { n: up })}</span><span class="chip">${ICON('sparkle')} ${t('{n} sempurna', { n: perfect })}</span>${dueTom ? `<span class="chip">${ICON('calendar')} ${t('Ulangan berikutnya: {n} huruf besok', { n: dueTom })}</span>` : ''}</div>
    <div class="wr-sgrid">${xs.map(x => `<span class="wr-sch l${x.to} ${x.to > x.from ? 'up' : x.to < x.from ? 'down' : ''}"><span class="hz">${x.ch}</span><small>${x.to !== x.from ? `L${x.from}→L${x.to}` : 'L' + x.to}</small><i class="g${x.g}"></i></span>`).join('')}</div>
    ${wrLadder(st, false)}</div>`;
}

/* ---------- halaman Menulis ---------- */
function wrLadder(st, click) {
  return `<div class="wr-ladder">${[0, 1, 2, 3, 4].map(k => `<${click ? 'button' : 'span'} class="wr-step l${k} ${click && VWR.f === k ? 'on' : ''}" ${click ? `data-a="wrf" data-v="${VWR.f === k ? -1 : k}"` : ''}><b>${st.byLevel[k]}</b><small>L${k} · ${t(WR_LV[k])}</small></${click ? 'button' : 'span'}>`).join('')}</div>`;
}
function wrKlsPicker() {
  if (typeof KLS === 'undefined' || typeof COURSES === 'undefined') return;
  const last = S.settings.wkl;
  const groups = COURSES.map(C => {
    const ls = KLS.filter(L => L.course === C.k && wrLessonIds(L.n).length); if (!ls.length) return '';
    return `<h3 class="wr-kh">${ICON(C.ic)} <span class="hz">${esc(C.zh)}</span></h3><div class="wr-kgrid">${ls.map(L => { const p = wrLessonPct(L.n); return `<button class="wr-kl ${L.n === last ? 'last' : ''}" data-a="wrklsgo" data-v="${L.n}"><b>${esc(lnShort(L.n))}</b><span class="hz">${esc(L.title.zh)}</span><i class="wr-kbar"><i style="width:${p}%"></i></i></button>`; }).join('')}</div>`;
  }).join('');
  openModal(`<div class="q-kind">${ICON('class')} ${t('Tulis dari lesson Kelas')}</div><p class="small muted" style="margin:6px 0 4px">${t('Pilih lesson. Kata-kata yang hurufnya paling belum dikuasai muncul lebih dulu.')}</p>${groups}`, 'wr-kmod');
}
function wrSearch(q) {
  const box = document.getElementById('wrres'); if (!box) return;
  q = (q || '').trim(); if (!q) { box.innerHTML = ''; return; }
  const chip = c => `<button class="wr-chip l${hzLevel(c)}" data-a="writechar" data-v="${c}"><span class="hz">${c}</span><small><b class="t${charTone(c)}">${esc(charPy(c))}</b> ${esc(charMean(c) || '')}</small></button>`;
  const hs = [...q].filter(isHan).join('').slice(0, 12); let html = '';
  if (hs) {
    const w = W.find(x => x && x.m && (x.s === hs || x.w === hs));
    html = `<div class="row wrap" style="gap:8px;align-items:center"><button class="btn pri" data-a="wrfree" data-v="${esc(hs)}">${ICON('write')} ${t('Tulis')} <span class="hz">${esc(hs)}</span></button>${w ? `<span class="small muted">${esc(aligned(w) ? w.y.join(' ') : w.p || '')} · ${esc(meanP(w))}</span>` : ''}</div>`;
    if (hs.length > 1) html += `<div class="wr-chips">${[...new Set(hs)].map(chip).join('')}</div>`;
  } else {
    const qq = q.toLowerCase().normalize('NFC'); const m = qq.replace(/v/g, 'ü').match(/^([a-zü]+)([1-5])?$/);
    let res = [];
    const pool = [...new Set(hzLearnSet().concat(CHAR_ORDER))];
    if (m) {
      const exact = pool.filter(c => charBase(c) === m[1] && (!m[2] || charTone(c) === +m[2]));
      const pre = m[1].length >= 2 ? pool.filter(c => !exact.includes(c) && charBase(c).startsWith(m[1]) && (!m[2] || charTone(c) === +m[2])) : [];
      res = exact.concat(pre);
    }
    if (!res.length && /[a-zà-ỹ]{2,}/i.test(qq)) { const ql = stripTone(qq); res = pool.filter(c => { const p = charPy(c); return p && stripTone(p) === ql; }); }
    if (qq.length >= 2) res = res.concat(pool.filter(c => !res.includes(c) && (charMean(c) || '').toLowerCase().includes(qq)));
    html = res.length ? `<div class="wr-chips">${res.slice(0, 48).map(chip).join('')}</div>` : `<p class="small muted">${t('Tidak ketemu — coba hanzi langsung atau pinyin lain.')}</p>`;
  }
  box.innerHTML = html;
}
document.addEventListener('input', e => { if (e.target && e.target.id === 'wrq' && !e.isComposing) { VWR.q = e.target.value; wrSearch(e.target.value); } });
document.addEventListener('compositionend', e => { if (e.target && e.target.id === 'wrq') { VWR.q = e.target.value; wrSearch(e.target.value); } });
vWrite = function () {
  const st = hzStats(); const today = dayRec().write || 0; const td = wrTodayIds().length;
  const inProg = st.byLevel[1] + st.byLevel[2] + st.byLevel[3];
  const set = hzLearnSet(); const shown = (set.length ? set : CHAR_ORDER.slice(0, 40));
  const list = (VWR.f >= 0 ? shown.filter(c => hzLevel(c) === VWR.f) : shown).slice(0, 240);
  const now = Date.now(); const lastL = S.settings.wkl && typeof KL === 'function' && KL(S.settings.wkl) ? S.settings.wkl : null;
  const tile = (a, ic, ti, sub, cls = '', v = '') => `<button class="wr-mode ${cls}" data-a="${a}" ${v !== '' ? `data-v="${v}"` : ''}><span class="wr-mi">${ICON(ic)}</span><span class="wr-mt"><b>${ti}</b><small>${sub}</small></span></button>`;
  setTimeout(() => { const q = document.getElementById('wrq'); if (q && VWR.q) { q.value = VWR.q; wrSearch(VWR.q); } }, 0);
  return `<section class="card glass wr-hero"><h1>${t('Studio menulis hanzi')}</h1>
    <p class="muted" style="margin:6px 0 14px">${t('Tiap huruf naik tangga: tonton → jiplak → petunjuk awal → ingat sendiri → hafal. Huruf yang sudah hafal kembali untuk diulang tepat sebelum lupa.')}</p>
    <div class="wr-kpis"><div><b>${st.mastered}</b><span>${t('dikuasai')}</span></div><div><b>${inProg}</b><span>${t('sedang dilatih')}</span></div><div class="${st.due ? 'hot' : ''}"><b>${st.due}</b><span>${t('jatuh tempo')}</span></div><div><b>${today}</b><span>${t('hari ini')}</span></div></div>
    <div class="wr-modes">
      ${tile('wrdue', 'clock', t('Ulang tulisan'), st.due ? t('{n} huruf jatuh tempo', { n: st.due }) : t('Tidak ada yang jatuh tempo'), st.due ? 'hot' : 'dim')}
      ${tile('writetoday', 'seed', t('Tulis kata hari ini'), td ? t('{n} kata baru hari ini', { n: td }) : t('kata yang baru dipelajari'))}
      ${tile('wrkls', 'class', t('Tulis dari lesson Kelas'), t('pilih lesson → kosakatanya'))}
      ${tile('writedrill', 'layers', t('Latihan campur'), t('jatuh tempo + kata yang dipelajari'))}
      ${lastL ? tile('wrklsgo', 'book', t('Lanjut lesson terakhir'), `${esc(lnShort(lastL))} · <span class="hz">${esc(KL(lastL).title.zh)}</span>`, '', lastL) : ''}
    </div>
    ${navigator.onLine ? '' : `<div class="notice" style="margin-top:12px">${t('Papan tulis butuh internet sekali saja untuk mengunduh data goresan.')}</div>`}</section>
  <section class="card glass"><h2>${t('Latihan bebas')}</h2>
    <input id="wrq" class="wr-q" type="search" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${t('Ketik hanzi, pinyin (ma3), atau arti…')}" lang="zh-Hant">
    <div id="wrres" class="wr-resbox"></div></section>
  <section class="card glass"><h2>${t('Peta penguasaan')}</h2><p class="small muted" style="margin:-4px 0 12px">${t('Ketuk tangga untuk menyaring. Titik merah = jatuh tempo.')}</p>
    ${wrLadder(st, true)}
    <div class="hzgrid wr-grid2">${list.length ? list.map(c => { const lv = hzLevel(c); return `<button class="hzcell wr-hc l${lv} ${hzDue(c, now) ? 'due' : ''}" data-a="writechar" data-v="${c}"><span class="c hz">${c}</span><span class="m">${esc(charMean(c))}</span></button>`; }).join('') : `<p class="small muted">${t('Belum ada huruf di level ini.')}</p>`}</div></section>
  <section class="card glass"><h2>${t('6 aturan urutan goresan')}</h2><p class="small muted" style="margin:-4px 0 12px">${t('Hampir semua hanzi patuh pada enam pola ini. Hafal polanya, bukan tiap karakternya.')}</p>
    <div class="grid2">${STROKE_RULES.map(([n, c, d], k) => `<button class="unit" data-a="writechar" data-v="${c}" style="align-items:flex-start;min-height:0"><span class="u-t">${k + 1}. ${t(n)}</span><span class="hz" style="font-size:34px">${c}</span><span class="u-t">${t(d)}</span></button>`).join('')}</div></section>`;
};