/* ========== premode.js — "Mode" sebelum mulai aktivitas ==========
   Lembar mode (sheet di HP, dialog di desktop) muncul tiap kali aktivitas belajar dimulai.
   Pilihan disimpan per jenis aktivitas (S.xmode.k[kind]) di atas bawaan global (S.xmode.def),
   yang sendiri berangkat dari pengaturan lama (S.settings.pinyin / autoplay / rate).
   Efek diterapkan lewat atribut <html data-xpy|xtr|xhz|xtc|xch> + selektor CSS yang disuntik (XM_PY/XM_TR)
   yang berlaku di dalam layar aktivitas (sesi, kartu, game, Huruf Kembar, …). */

Object.assign(I18N, {
  'Mode': ['Mode', 'Mode'],
  'Mode belajar': ['Study mode', 'Mode ng pag-aaral'],
  'Mode sebelum mulai': ['Mode before you start', 'Mode bago magsimula'],
  'Pinyin': ['Pinyin', 'Pinyin'],
  'Tampil': ['Show', 'Ipakita'],
  'Sembunyi': ['Hide', 'Itago'],
  'Setelah jawab': ['After answer', 'Pagkasagot'],
  'Ketuk pinyin yang buram untuk melihatnya': ['Tap the blurred pinyin to see it', 'Pindutin ang malabong pinyin para makita'],
  'Pinyin muncul sendiri setelah kamu menjawab': ['Pinyin appears once you answer', 'Lalabas ang pinyin pagkasagot mo'],
  'Pinyin selalu terlihat': ['Pinyin always visible', 'Laging kita ang pinyin'],
  'Warna nada': ['Tone colors', 'Kulay ng tono'],
  'Nyala': ['On', 'Bukas'],
  'Mati': ['Off', 'Sarado'],
  'Arti': ['Meaning', 'Kahulugan'],
  'Sampai menjawab': ['Until answered', 'Hanggang sumagot'],
  'Terjemahan kalimat & arti tambahan': ['Sentence translations & extra meanings', 'Salin ng pangungusap at dagdag na kahulugan'],
  'Hanzi': ['Hanzi', 'Hanzi'],
  'Besar': ['Large', 'Malaki'],
  'Suara': ['Audio', 'Tunog'],
  'Putar otomatis': ['Autoplay', 'Kusang i-play'],
  'Kecepatan': ['Speed', 'Bilis'],
  'Pilih suara': ['Choose voice', 'Pumili ng boses'],
  'Tantangan': ['Challenge', 'Hamon'],
  'Santai': ['Relaxed', 'Relaks'],
  'Tanpa timer, bantuan lengkap': ['No timer, full help', 'Walang timer, buong tulong'],
  'Seperti biasa': ['As usual', 'Gaya ng dati'],
  'Timer tiap soal, tanpa bantuan': ['Timer per question, no help', 'May timer bawat tanong, walang tulong'],
  'Jumlah soal': ['Questions', 'Bilang ng tanong'],
  'Jumlah kartu': ['Cards', 'Bilang ng kard'],
  'Auto': ['Auto', 'Auto'],
  'Mulai': ['Start', 'Simulan'],
  'Terapkan': ['Apply', 'Ilapat'],
  'Batal': ['Cancel', 'Kanselahin'],
  'Simpan': ['Save', 'I-save'],
  'Jangan tanya lagi untuk menu ini': ["Don't ask again for this menu", 'Huwag nang itanong para sa menu na ito'],
  'Ubah kapan saja lewat tombol Mode di sesi, atau Saya → Mode belajar.': ['Change it anytime with the Mode button in a session, or Me → Study mode.', 'Baguhin anumang oras gamit ang Mode button sa sesyon, o Ako → Mode ng pag-aaral.'],
  'Mode bawaan': ['Default mode', 'Default na mode'],
  'Dipakai untuk semua menu yang belum punya pilihan sendiri.': ['Used for every menu without its own choice.', 'Gamit sa lahat ng menu na walang sariling pili.'],
  'Tanya mode sebelum mulai': ['Ask for mode before starting', 'Itanong ang mode bago magsimula'],
  'Lembar kecil untuk memilih pinyin, arti, suara & tantangan sebelum tiap aktivitas': ['A small sheet to pick pinyin, meaning, audio & challenge before each activity', 'Maliit na sheet para pumili ng pinyin, kahulugan, tunog at hamon bago ang bawat aktibidad'],
  'Atur mode bawaan': ['Set default mode', 'Itakda ang default na mode'],
  'Tanya lagi di semua menu': ['Ask again in every menu', 'Itanong muli sa lahat ng menu'],
  'Hapus pilihan per menu': ['Clear per-menu choices', 'Burahin ang pili bawat menu'],
  '{n} menu punya pilihan sendiri · {m} tidak ditanya lagi': ['{n} menus have their own choice · {m} not asked again', '{n} menu ang may sariling pili · {m} hindi na itatanong'],
  'Pilihan per menu dihapus': ['Per-menu choices cleared', 'Nabura ang pili bawat menu'],
  'Semua menu akan bertanya lagi': ['Every menu will ask again', 'Magtatanong muli ang lahat ng menu'],
  'Mode diterapkan': ['Mode applied', 'Nailapat ang mode'],
  'Waktu habis': ["Time's up", 'Ubos na ang oras'],
  'Ketuk untuk lihat': ['Tap to see', 'Pindutin para makita'],
  'contoh': ['preview', 'halimbawa'],
  'halo': ['hello', 'kumusta'],
  'Sesi pintar': ['Smart session', 'Matalinong sesyon'],
  'Belajar kata baru': ['Learn new words', 'Matuto ng bagong salita'],
  'Ulangan': ['Review', 'Repaso'],
  'Latihan': ['Practice', 'Pagsasanay'],
  'Latihan dengar': ['Listening practice', 'Pagsasanay sa pakikinig'],
  'Latihan nada': ['Tone practice', 'Pagsasanay sa tono'],
  'Ketik pinyin': ['Type pinyin', 'I-type ang pinyin'],
  'Kalimat': ['Sentences', 'Pangungusap'],
  'Menulis': ['Writing', 'Pagsulat'],
  'Speedrun': ['Speedrun', 'Speedrun'],
  'Kelas': ['Class', 'Klase'],
  'Kuis Kelas': ['Class quiz', 'Pagsusulit sa klase'],
  'Flashcard': ['Flashcards', 'Flashcard'],
  'Khatam buku': ['Book walkthrough', 'Buong aklat'],
  'Metode': ['Method', 'Pamamaraan'],
  'Kelas Tema': ['Theme class', 'Klase ayon sa tema'],
  'Ujian tema': ['Theme exam', 'Pagsusulit sa tema'],
  'Dengar 50': ['Listen 50', 'Makinig 50'],
  'Game Dengar': ['Listening Games', 'Mga Laro sa Pakikinig'],
  'Arena': ['Arena', 'Arena'],
  'Arcade': ['Arcade', 'Arcade'],
  'Huruf Kembar': ['Twin characters', 'Kambal na titik'],
  'Slang Taiwan': ['Taiwan slang', 'Slang ng Taiwan'],
  'Simulasi TOCFL': ['TOCFL mock test', 'TOCFL mock test'],
  'Aktivitas': ['Activity', 'Aktibidad'],
  'bawaan': ['default', 'default']
});
Object.assign(I18N_VI, {
  'Mode': 'Chế độ', 'Mode belajar': 'Chế độ học', 'Mode sebelum mulai': 'Chế độ trước khi bắt đầu', 'Pinyin': 'Pinyin', 'Tampil': 'Hiện', 'Sembunyi': 'Ẩn',
  'Setelah jawab': 'Sau khi trả lời', 'Ketuk pinyin yang buram untuk melihatnya': 'Chạm vào pinyin bị mờ để xem', 'Pinyin muncul sendiri setelah kamu menjawab': 'Pinyin tự hiện sau khi bạn trả lời',
  'Pinyin selalu terlihat': 'Luôn hiện pinyin', 'Warna nada': 'Màu thanh điệu', 'Nyala': 'Bật', 'Mati': 'Tắt', 'Arti': 'Nghĩa', 'Sampai menjawab': 'Đến khi trả lời',
  'Terjemahan kalimat & arti tambahan': 'Bản dịch câu & nghĩa phụ', 'Hanzi': 'Hán tự', 'Besar': 'Lớn', 'Suara': 'Âm thanh', 'Putar otomatis': 'Tự phát', 'Kecepatan': 'Tốc độ',
  'Pilih suara': 'Chọn giọng', 'Tantangan': 'Thử thách', 'Santai': 'Thư thả', 'Tanpa timer, bantuan lengkap': 'Không hẹn giờ, trợ giúp đầy đủ', 'Seperti biasa': 'Như thường lệ',
  'Timer tiap soal, tanpa bantuan': 'Hẹn giờ mỗi câu, không trợ giúp', 'Jumlah soal': 'Số câu', 'Jumlah kartu': 'Số thẻ', 'Auto': 'Tự động', 'Mulai': 'Bắt đầu', 'Terapkan': 'Áp dụng',
  'Batal': 'Hủy', 'Simpan': 'Lưu', 'Jangan tanya lagi untuk menu ini': 'Không hỏi lại cho mục này',
  'Ubah kapan saja lewat tombol Mode di sesi, atau Saya → Mode belajar.': 'Đổi bất cứ lúc nào bằng nút Chế độ trong phiên, hoặc Tôi → Chế độ học.',
  'Mode bawaan': 'Chế độ mặc định', 'Dipakai untuk semua menu yang belum punya pilihan sendiri.': 'Dùng cho mọi mục chưa có lựa chọn riêng.',
  'Tanya mode sebelum mulai': 'Hỏi chế độ trước khi bắt đầu', 'Lembar kecil untuk memilih pinyin, arti, suara & tantangan sebelum tiap aktivitas': 'Bảng nhỏ để chọn pinyin, nghĩa, âm thanh & thử thách trước mỗi hoạt động',
  'Atur mode bawaan': 'Đặt chế độ mặc định', 'Tanya lagi di semua menu': 'Hỏi lại ở mọi mục', 'Hapus pilihan per menu': 'Xóa lựa chọn từng mục',
  '{n} menu punya pilihan sendiri · {m} tidak ditanya lagi': '{n} mục có lựa chọn riêng · {m} không hỏi lại', 'Pilihan per menu dihapus': 'Đã xóa lựa chọn từng mục',
  'Semua menu akan bertanya lagi': 'Mọi mục sẽ hỏi lại', 'Mode diterapkan': 'Đã áp dụng chế độ', 'Waktu habis': 'Hết giờ', 'Ketuk untuk lihat': 'Chạm để xem', 'contoh': 'xem trước', 'halo': 'xin chào',
  'Sesi pintar': 'Phiên thông minh', 'Belajar kata baru': 'Học từ mới', 'Ulangan': 'Ôn tập', 'Latihan': 'Luyện tập', 'Latihan dengar': 'Luyện nghe', 'Latihan nada': 'Luyện thanh điệu',
  'Ketik pinyin': 'Gõ pinyin', 'Kalimat': 'Câu', 'Menulis': 'Viết', 'Speedrun': 'Speedrun', 'Kelas': 'Lớp', 'Kuis Kelas': 'Kiểm tra lớp', 'Flashcard': 'Thẻ ghi nhớ', 'Khatam buku': 'Học hết sách',
  'Metode': 'Phương pháp', 'Kelas Tema': 'Lớp chủ đề', 'Ujian tema': 'Thi chủ đề', 'Dengar 50': 'Nghe 50', 'Game Dengar': 'Trò chơi nghe', 'Arena': 'Đấu trường', 'Arcade': 'Arcade',
  'Huruf Kembar': 'Chữ sinh đôi', 'Slang Taiwan': 'Tiếng lóng Đài Loan', 'Simulasi TOCFL': 'Thi thử TOCFL', 'Aktivitas': 'Hoạt động', 'bawaan': 'mặc định'
});

/* ---------- jenis aktivitas ----------
   flag: p pinyin+warna nada · t arti · h hanzi · a putar otomatis · r kecepatan · v pilih suara · c tantangan · n jumlah soal */
const XM_KIND = {
  smart: ['Sesi pintar', 'sparkle', 'pthavrc'],
  learn: ['Belajar kata baru', 'seed', 'pthavr'],
  review: ['Ulangan', 'refresh', 'pthavrcn'],
  practice: ['Latihan', 'target', 'pthavrcn'],
  listen: ['Latihan dengar', 'headphone', 'pthavrcn'],
  tones: ['Latihan nada', 'tone', 'pthavrcn'],
  type: ['Ketik pinyin', 'keyboard', 'thavrcn'],
  sent: ['Kalimat', 'blocks', 'pthavrcn'],
  hanzi: ['Hanzi', 'hanzi', 'pthavrcn'],
  write: ['Menulis', 'write', 'ptavrn'],
  speed: ['Speedrun', 'bolt', 'pthavr'],
  kelas: ['Kelas', 'book', 'pthavrc'],
  kelasq: ['Kuis Kelas', 'puzzle', 'pthavrcn'],
  kelasfc: ['Flashcard', 'layers', 'pthavrn'],
  khatam: ['Khatam buku', 'book', 'pthavrc'],
  method: ['Metode', 'path', 'pthavrc'],
  tema: ['Kelas Tema', 'grid', 'pthavrc'],
  temaexam: ['Ujian tema', 'award', 'pthavrc'],
  l50: ['Dengar 50', 'headphone', 'pthrv'],
  game: ['Game Dengar', 'game', 'pavr'],
  arena: ['Arena', 'swords', 'pavr'],
  arcade: ['Arcade', 'game', 'avrc'],
  twins: ['Huruf Kembar', 'twins', 'pthv'],
  slang: ['Slang Taiwan', 'chat', 'pthavrcn'],
  tocfl: ['Simulasi TOCFL', 'award', 'ptrv']
};
const XM_ACT = {};
(function () {
  const m = {
    smart: 'smart route-next', learn: 'q-new ulearn learnone semilearn place slanglearn',
    review: 'q-rev leech rescue bedtime recall drill-recall klrev kbrev wrdue',
    practice: 'q-prac q-prac2 uprac semiprac q-combo q-match match drill-mc_mean drill-mc_hanzi pgpracsel',
    listen: 'q-listen drill-listen lfill lmean lmix drill-lfill drill-lmean route-ear', tones: 'q-tone tones-drill drill-tone tonepair drill-tonepair',
    type: 'q-type drill-type', sent: 'q-sent cloze build sent drill-cloze drill-build q-story story ctxday ctxmine ctxword',
    hanzi: 'q-hz hzquiz drill-hz partquiz drill-combine drill-part route-hz', write: 'writedrill writetoday writeword writechar drill-write q-write wrklsgo pghwrite',
    speed: 'speedgo', kelas: 'klround klfast klgo klset', kelasq: 'klqg klqgo klqpreset kldrillgo klpicq', kelasfc: 'klfcl klfcg klfcgo kbfc',
    khatam: 'kbgo kbrun kbunit', method: 'mtgo mtgo2 mtpre mtmix mtmixfree mtmis', tema: 'tmlearn tmprac tmgpr', temaexam: 'tmexam',
    l50: 'l50', game: 'lgplay lgweak', arena: 'arplay', arcade: 'arcade klarcl klarcgo', twins: 'twstart twopen twmix twquiz',
    slang: 'slangquiz slanglisten', tocfl: 'tfgo'
  };
  for (const k in m) m[k].split(' ').forEach(a => { XM_ACT[a] = k; });
})();
const XM_ROOTS = '#session,#klfc,#lgx,#l50,#arcade,#arboat,#arbeat,#arkal,#tf,.tw-pl,.tw-quiz';
const XM_PY = ['.q-py', '.py', '.pinyin', 'rt', '.cx-py', '.kl-qpy', '.fc-py', '.spy', '.tm-py', '.tm-hpy', '.tm-rvpy', '.tm-c-py', '.tm-rcp', '.l50-py', '.lg-opy', '.lg-syls', '.lg-mpy',
  '.tw-ipy', '#twPy', '.tw-chip > span', '.t-py', '.wr-wpy', '.wr-cell small', '.sl-py', '.mt-pyl', '.kb-vp', '.bpy', '.cb-py', '.kal-spy', '.kal-opt small', '.mt-tpl small', '.kl-tpl small', '.bo-mi-py', '.chr .small', '.tw-mini2 > span:not(.m)'].join(',');
const XM_TR = ['#session[data-xit="intro"] .subs', '.dl-tr', '.str', '.lg-utr', '.kb-rdtr', '.tm-ext', '#twMean', '.tw-im', '.t-m', '.l50-mean', '.fc-ex > .small', '.kl-ex .small', '.kl-pas > .small',
  '.kl-pasq .small', '.kl-sq .small', '.mt-spq .small', '.bo-mi-tr', '.tw-mini2 > .m'].join(',');
/* isi yang justru menjadi soal/jawaban, umpan balik & ringkasan — tidak pernah disembunyikan */
const XM_KEEP = '.tw-opt,.tw-qpy,.tw-qm,.tm-qpy,.tm-qmean,.dl-pm,.rb-pp,.rb-pm,.kal-lpy,.lg-pyh,.lg-pyt,.fb,.lg-fb,.tw-fbin,.rb-rv,.bo-rv,.kal-rv,.summary,.tw-end,.xm-chip,[data-xm-keep]';
const XM_IO = ':is(.opt,.lg-opt,.kal-opt,.tw-opt,[data-s="opt"],.wr-chip)';
const XM_ANS = '.fb,.lg-fb.on,.tw-fbin,.fc-card.flip,.rb-prompt.rv';
/* selektor "sedang buram" — dipakai bersama oleh CSS (disuntik) dan JS (ketuk untuk lihat) */
function xmHideSel(attr, list) {
  const R = `:is(${XM_ROOTS})`, L = `:is(${list})`, K = `:not(:is(${XM_KEEP}),:is(${XM_KEEP}) *)`;
  return [`html[data-${attr}="hide"] ${R} ${L}${K}:not(.xm-rev):not(${XM_IO} *)`, `html[data-${attr}="hide"] ${R}:not(.xm-ans) ${XM_IO} ${L}${K}`,
    `html[data-${attr}="after"] ${R}:not(.xm-ans) ${L}${K}:not(.xm-rev)`];
}
const XM_HPY = xmHideSel('xpy', XM_PY), XM_HTR = xmHideSel('xtr', XM_TR);
(function () {
  const R = `:is(${XM_ROOTS})`; const all = XM_HPY.concat(XM_HTR);
  const css = `${all.join(',')}{color:transparent!important;text-shadow:0 0 .5em color-mix(in srgb,var(--ink2) 80%,transparent)!important;background:color-mix(in srgb,var(--acc) 10%,transparent);border-radius:.55em;cursor:pointer;-webkit-user-select:none;user-select:none;transition:color .25s,text-shadow .25s,background .25s}
${all.map(x => x + ' *').join(',')}{color:transparent!important;text-shadow:0 0 .5em color-mix(in srgb,var(--ink2) 80%,transparent)!important}
html[data-xtc="off"] ${R} :is(.t1,.t2,.t3,.t4,.t5):not(.pk){color:inherit}
html[data-xhz="big"] ${R} :is(.q-hz,.kl-qz,.fc-hz,.l50-hz,.tw-big,.lg-uhz,.tm-det-hz,.wr-q .hz){zoom:1.25}
html[data-xhz="big"] ${R} :is(.cx-zh,.kb-zh,.opt .hz,.tm-rc b,.lg-ohz,.kal-sent){zoom:1.14}
html[data-xch="hard"] #session :is([data-slow],[data-s="hum4"],[data-s="rhint"],.kl-trq,.s-card>.notice,.tm-kbn){display:none!important}`;
  const st = document.createElement('style'); st.id = 'xm-dyn'; st.textContent = css; document.head.appendChild(st);
})();
const XM_READ = new Set(['intro', 'lread', 'tmgram', 'tmrecap', 'checkpoint', 'slangintro', 'story']);
const XM = { cur: null, kind: null, pending: null, endT: 0, base: null, tmr: 0, sheet: null, chipT: 0 };

/* ---------- penyimpanan ---------- */
function xmStore() {
  if (!S.xmode || typeof S.xmode !== 'object') S.xmode = {};
  const x = S.xmode; if (x.ask === undefined) x.ask = true;
  ['def', 'k', 'skip'].forEach(k => { if (!x[k] || typeof x[k] !== 'object') x[k] = {}; });
  return x;
}
function xmBase(kind) {
  const b = XM.base || { ap: S.settings.autoplay, rate: S.settings.rate };
  const dd = (S.game && S.game.diff) || 'normal';
  return { py: S.settings.pinyin === 'none' ? 'hide' : 'show', tc: 'on', tr: 'show', hz: 'n', ap: b.ap !== false, rate: null, ch: kind === 'arcade' ? ({ easy: 'easy', hard: 'hard' }[dd] || 'normal') : 'normal', n: 0 };
}
function xmGet(kind) {
  const x = xmStore(); const m = Object.assign(xmBase(kind), x.def, kind && kind !== '_def' ? x.k[kind] : null);
  if (kind === 'arcade' && !(x.k.arcade && x.k.arcade.ch)) m.ch = xmBase('arcade').ch;
  return m;
}
const xmFlags = kind => (XM_KIND[kind] ? XM_KIND[kind][2] : kind === '_def' ? 'pthavrc' : 'pthavr');

/* ---------- autoplay & kecepatan: ditimpa selama aktivitas berjalan, tanpa mengubah pengaturan tersimpan ---------- */
function xmActive() { return !!(XM.cur && document.querySelector(XM_ROOTS)); }
function xmInstall() {
  const st = S && S.settings; if (!st || st.__xm) return;
  const base = { ap: st.autoplay, rate: st.rate }; XM.base = base;
  try {
    Object.defineProperty(st, 'autoplay', { configurable: true, enumerable: true, get() { return xmActive() ? XM.cur.ap !== false : base.ap; }, set(v) { base.ap = v; } });
    Object.defineProperty(st, 'rate', { configurable: true, enumerable: true, get() { return xmActive() && XM.cur.rate ? XM.cur.rate : base.rate; }, set(v) { base.rate = v; } });
    Object.defineProperty(st, 'toJSON', { configurable: true, enumerable: false, value() { const o = {}; for (const k of Object.keys(this)) o[k] = this[k]; o.autoplay = base.ap; o.rate = base.rate; return o; } });
    Object.defineProperty(st, '__xm', { configurable: true, enumerable: false, value: 1 });
  } catch (e) { console.warn('xm install', e); }
}
const xmLoadBase = load;
load = function () { const r = xmLoadBase.apply(this, arguments); try { xmInstall(); xmStore(); } catch (e) {} return r; };

/* ---------- menerapkan mode ---------- */
function xmApply(mode, kind) {
  const el = document.documentElement; const m = mode || xmGet(kind);
  const hard = m.ch === 'hard' && kind !== 'arcade';
  el.dataset.xpy = hard && m.py === 'show' ? 'after' : m.py;
  el.dataset.xtr = hard && m.tr === 'show' ? 'after' : m.tr;
  el.dataset.xhz = m.hz === 'big' ? 'big' : 'n';
  el.dataset.xtc = m.tc === 'off' ? 'off' : 'on';
  el.dataset.xch = kind === 'arcade' ? 'normal' : m.ch || 'normal';
  XM.cur = m; XM.kind = kind || XM.kind;
  document.querySelectorAll('.xm-rev').forEach(x => x.classList.remove('xm-rev'));
  if (kind === 'arcade' && m.ch) { try { arcState().diff = m.ch; S.game.diff = m.ch; } catch (e) {} }
  xmProcess();
}
function xmTestSkip() { try { return !!(window.XM_SKIP || localStorage.getItem('xiaobu.xmskip')); } catch (e) { return !!window.XM_SKIP; } }

/* ---------- penanda di dalam layar aktivitas ---------- */
let xmQ = 0, xmLast = 0;
function xmSchedule() {
  if (xmQ) return; const wait = Math.max(0, 90 - (Date.now() - xmLast));
  xmQ = setTimeout(() => requestAnimationFrame(() => { xmQ = 0; xmLast = Date.now(); xmProcess(); }), wait);
}
function xmSesAns() {
  if (typeof SES === 'undefined' || !SES) return false; const it = SES.items && SES.items[SES.i];
  if (SES.flipped) return true; return !!(SES.answered && it && !XM_READ.has(it.type));
}
function xmProcess() {
  const roots = document.querySelectorAll(XM_ROOTS); if (!roots.length) return;
  roots.forEach(r => {
    if (!r.classList.contains('xm-root')) r.classList.add('xm-root');
    if (r.id === 'session' && typeof SES !== 'undefined' && SES) { const it = SES.items[SES.i]; const k = it ? it.type : ''; if (r.dataset.xit !== k) r.dataset.xit = k; }
    xmChip(r);
    const ans = !!r.querySelector(XM_ANS) || (r.id === 'session' && xmSesAns());
    if (r.classList.contains('xm-ans') !== ans) r.classList.toggle('xm-ans', ans);
  });
}
const xmIsHidden = el => { try { return XM_HPY.concat(XM_HTR).some(q => el.matches(q)); } catch (e) { return false; } };
/* tombol "Mode" kecil di header aktivitas */
function xmChip(r) {
  let host = null;
  if (r.id === 'session' || r.id === 'klfc') host = r.querySelector(':scope > .s-top');
  else if (r.id === 'l50') host = r.querySelector('.l50-top');
  else if (r.classList.contains('tw-pl')) host = r.querySelector('.tw-top');
  else if (r.id === 'tf') host = r.querySelector('.tf-meta');
  if (!host || host.querySelector('.xm-chip')) return;
  const b = document.createElement('button'); b.type = 'button'; b.className = 'xm-chip'; b.dataset.xm = 'live';
  b.setAttribute('aria-label', t('Mode belajar')); b.title = t('Mode belajar');
  b.innerHTML = `${ICON('settings')}<span>${t('Mode')}</span>`;
  if (r.id === 'tf') host.insertBefore(b, host.lastElementChild); else host.appendChild(b);
}

/* ---------- lembar mode ---------- */
function xmLabel(kind) { return kind === '_def' ? t('Mode bawaan') : XM_KIND[kind] ? t(XM_KIND[kind][0]) : t('Aktivitas'); }
function xmVoiceLabel() { try { if (typeof voiceLabel === 'function') return voiceLabel() || ''; } catch (e) {} return TTS && TTS.voice ? TTS.voice.name.replace(/\s*\(.*\)\s*/, '').slice(0, 26) : ''; }
function xmRateOpts() {
  const r = XM.base ? XM.base.rate : S.settings.rate; const o = [[0.6, '0.6×'], [0.8, '0.8×'], [1, '1.0×']];
  if (![0.6, 0.8, 1].includes(+r)) { o.push([null, `${r}×`]); o.sort((a, b) => (a[0] === null ? +r : a[0]) - (b[0] === null ? +r : b[0])); } return o;
}
function xmSeg(key, opts, val, lab) {
  return `<div class="seg xm-seg" role="radiogroup" aria-label="${esc(lab)}">${opts.map(([v, l]) => { const on = (v === null ? '' : String(v)) === String(val); return `<button type="button" role="radio" aria-checked="${on}" class="${on ? 'on' : ''}" data-xk="${key}" data-xv="${v === null ? '' : v}">${l}</button>`; }).join('')}</div>`;
}
function xmRow(ic, lab, sub, ctl, cls = '') { return `<div class="xm-row ${cls}"><div class="xm-l">${ICON(ic)}<div><b>${lab}</b>${sub ? `<span>${sub}</span>` : ''}</div></div>${ctl}</div>`; }
function xmBody() {
  const X = XM.sheet; const m = X.mode; const f = xmFlags(X.kind); const out = [];
  const pySub = { show: t('Pinyin selalu terlihat'), hide: t('Ketuk pinyin yang buram untuk melihatnya'), after: t('Pinyin muncul sendiri setelah kamu menjawab') }[m.py];
  const prev = `<div class="xm-prev" aria-hidden="true" data-py="${m.py}" data-tr="${m.tr}" data-tc="${m.tc}" data-hz="${m.hz}"><small>${t('contoh')}</small><span class="xm-pv-hz hz"><span class="t3">你</span><span class="t3">好</span></span><span class="xm-pv-py"><span class="t3">nǐ</span> <span class="t3">hǎo</span></span><span class="xm-pv-tr">${t('halo')}</span></div>`;
  if (f.includes('p') || f.includes('t') || f.includes('h')) {
    const g = [];
    if (f.includes('p')) {
      g.push(xmRow('eye', t('Pinyin'), pySub, xmSeg('py', [['show', t('Tampil')], ['hide', t('Sembunyi')], ['after', t('Setelah jawab')]], m.py, t('Pinyin')), 'wide'));
      g.push(xmRow('tone', t('Warna nada'), '', xmSeg('tc', [['on', t('Nyala')], ['off', t('Mati')]], m.tc, t('Warna nada'))));
    }
    if (f.includes('t')) g.push(xmRow('globe', t('Arti'), t('Terjemahan kalimat & arti tambahan'), xmSeg('tr', [['show', t('Tampil')], ['after', t('Sampai menjawab')]], m.tr === 'hide' ? 'after' : m.tr, t('Arti'))));
    if (f.includes('h')) g.push(xmRow('hanzi', t('Hanzi'), '', xmSeg('hz', [['n', t('Normal')], ['big', t('Besar')]], m.hz, t('Hanzi'))));
    out.push(`<section class="xm-grp">${prev}${g.join('')}</section>`);
  }
  if (f.includes('a') || f.includes('r') || f.includes('v')) {
    const g = [];
    if (f.includes('a')) g.push(xmRow('speaker', t('Putar otomatis'), '', xmSeg('ap', [['true', t('Nyala')], ['false', t('Mati')]], String(m.ap !== false), t('Putar otomatis'))));
    if (f.includes('r')) g.push(xmRow('slow', t('Kecepatan'), '', xmSeg('rate', xmRateOpts(), m.rate === null || m.rate === undefined ? (xmRateOpts().some(o => o[0] === null) ? '' : XM.base ? XM.base.rate : S.settings.rate) : m.rate, t('Kecepatan'))));
    if (f.includes('v') && (typeof ACT.voicepick === 'function' || (TTS && TTS.voices && TTS.voices.length))) {
      const vl = xmVoiceLabel();
      g.push(xmRow('user', t('Suara'), '', `<button type="button" class="btn sec small xm-vbtn" data-xm="voice">${ICON('speaker')} <span class="xm-vl">${esc(vl || t('Pilih suara'))}</span>${ICON('chevron')}</button>`));
    }
    out.push(`<section class="xm-grp">${g.join('')}</section>`);
  }
  if (f.includes('c') || f.includes('n')) {
    const g = [];
    if (f.includes('c')) {
      const cs = X.kind === 'arcade' ? [['easy', t('Santai')], ['normal', t('Normal')], ['hard', t('Tantangan')]] : [['easy', t('Santai')], ['normal', t('Normal')], ['hard', t('Tantangan')]];
      g.push(xmRow('bolt', t('Tantangan'), { easy: t('Tanpa timer, bantuan lengkap'), normal: t('Seperti biasa'), hard: t('Timer tiap soal, tanpa bantuan') }[m.ch || 'normal'], xmSeg('ch', cs, m.ch || 'normal', t('Tantangan')), 'wide'));
    }
    if (f.includes('n') && !X.live) {
      const fc = X.kind === 'kelasfc'; const ns = fc ? [0, 10, 20, 40] : [0, 10, 20, 30];
      g.push(xmRow('layers', t(fc ? 'Jumlah kartu' : 'Jumlah soal'), '', xmSeg('n', ns.map(n => [n, n ? String(n) : t('Auto')]), m.n || 0, t('Jumlah soal'))));
    }
    if (g.length) out.push(`<section class="xm-grp">${g.join('')}</section>`);
  }
  return out.join('');
}
function xmOpen(o) {
  xmClose(true);
  const kind = o.kind; const live = !!o.live; const isDef = kind === '_def';
  XM.sheet = { kind, act: o.act, b: o.b, live, isDef, mode: Object.assign({}, live && XM.cur ? XM.cur : xmGet(kind)), back: document.activeElement };
  const x = xmStore(); const tile = XM_KIND[kind] ? XM_KIND[kind][1] : 'settings';
  const ov = document.createElement('div'); ov.id = 'xmode'; ov.className = 'xm-ov';
  ov.innerHTML = `<div class="xm-sheet" role="dialog" aria-modal="true" aria-labelledby="xmT">
    <div class="xm-grab" aria-hidden="true"></div>
    <header class="xm-h">${TILE(tile, 'tint c1')}<div class="grow" style="min-width:0"><small>${isDef ? t('Mode belajar') : live ? t('Mode belajar') : t('Mode sebelum mulai')}</small><h2 id="xmT">${esc(xmLabel(kind))}</h2></div>
      <button type="button" class="xm-x" data-xm="cancel" aria-label="${t('Tutup')}">${ICON('close')}</button></header>
    ${isDef ? `<p class="xm-desc small muted">${t('Dipakai untuk semua menu yang belum punya pilihan sendiri.')}</p>` : ''}
    <div class="xm-body" id="xmBody">${xmBody()}</div>
    <footer class="xm-f">
      ${!live && !isDef ? `<label class="xm-ck"><input type="checkbox" id="xmSkip" ${x.skip[kind] ? 'checked' : ''}><span class="xm-box" aria-hidden="true">${ICON('check')}</span><span>${t('Jangan tanya lagi untuk menu ini')}</span></label>` : ''}
      <div class="xm-btns"><button type="button" class="btn ghost" data-xm="cancel">${t('Batal')}</button>
        <button type="button" class="btn pri big xm-go" data-xm="go">${ICON(live || isDef ? 'check' : 'play')} ${t(live ? 'Terapkan' : isDef ? 'Simpan' : 'Mulai')}<kbd aria-hidden="true">↵</kbd></button></div>
      ${!live && !isDef ? `<p class="xm-note">${t('Ubah kapan saja lewat tombol Mode di sesi, atau Saya → Mode belajar.')}</p>` : ''}
    </footer></div>`;
  document.body.appendChild(ov); document.documentElement.classList.add('xm-open'); XM.openT = Date.now();
  ov.addEventListener('click', xmSheetClick);
  requestAnimationFrame(() => { const g = ov.querySelector('.xm-go'); if (g) try { g.focus({ preventScroll: true }); } catch (e) {} });
  XM.vT = setInterval(() => { const l = ov.querySelector('.xm-vl'); if (l) { const v = xmVoiceLabel(); if (v && l.textContent !== v) l.textContent = v; } if (ov.classList.contains('xm-away') && !document.querySelector('.overlay')) { ov.classList.remove('xm-away'); requestAnimationFrame(() => { const g = ov.querySelector('.xm-go'); if (g) try { g.focus({ preventScroll: true }); } catch (e) {} }); } }, 400);
}
function xmClose(silent) {
  const ov = $('#xmode'); clearInterval(XM.vT); if (!ov) { XM.sheet = null; return; }
  const back = XM.sheet && XM.sheet.back; XM.sheet = null; document.documentElement.classList.remove('xm-open');
  if (silent || matchMedia('(prefers-reduced-motion: reduce)').matches) ov.remove();
  else { ov.classList.add('out'); setTimeout(() => ov.remove(), 180); }
  if (!silent && back && back.isConnected && back.focus) try { back.focus({ preventScroll: true }); } catch (e) {}
}
function xmSheetKey(e) {
  if (e.key === 'Escape') { e.preventDefault(); xmClose(); return; }
  if (e.key === 'Enter' && !e.isComposing) {
    if (e.repeat || Date.now() - XM.openT < 250) { e.preventDefault(); return; }
    const tg = e.target; if (tg && tg.tagName === 'BUTTON' && tg.dataset.xm && tg.dataset.xm !== 'go') return;
    e.preventDefault(); xmGo(); return;
  }
  if (e.key === 'Tab') {
    const f = [...$('#xmode').querySelectorAll('button,input')].filter(x => !x.disabled && x.offsetParent !== null); if (!f.length) return;
    const i = f.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
  }
}
function xmSheetClick(e) {
  const ov = $('#xmode'); if (!ov || !XM.sheet) return;
  if (e.target === ov) { if (Date.now() - XM.openT > 450) xmClose(); return; }
  const b = e.target.closest('button'); if (!b) return;
  try { FX.play('tap'); } catch (er) {}
  if (b.dataset.xk) {
    const k = b.dataset.xk; let v = b.dataset.xv; const m = XM.sheet.mode;
    if (k === 'ap') v = v === 'true'; else if (k === 'rate') v = v === '' ? null : +v; else if (k === 'n') v = +v;
    m[k] = v;
    if (k === 'rate' && TTS && TTS.speak) { try { TTS.speak('你好', v || (XM.base ? XM.base.rate : S.settings.rate)); } catch (er) {} }
    const y = $('#xmBody').scrollTop; $('#xmBody').innerHTML = xmBody(); $('#xmBody').scrollTop = y;
    const nb = $('#xmBody').querySelector(`[data-xk="${k}"].on`); if (nb) nb.focus({ preventScroll: true });
    return;
  }
  const a = b.dataset.xm;
  if (a === 'cancel') return xmClose();
  if (a === 'go') return xmGo();
  if (a === 'voice') {
    if (typeof ACT.voicepick === 'function') { ov.classList.add('xm-away'); try { ACT.voicepick(b); } catch (er) { ov.classList.remove('xm-away'); }  }
    else xmVoiceCycle(b);
  }
}
/* tanpa pemilih suara: putar daftar suara Mandarin yang tersedia */
function xmVoiceCycle(b) {
  const vs = (TTS.ranked || TTS.voices || []).filter(v => /^zh|cmn/i.test(v.lang)); if (!vs.length) return;
  const i = (vs.indexOf(TTS.voice) + 1) % vs.length; TTS.voice = vs[i]; S.settings.voice = vs[i].name; save(); TTS.speak('你好');
  const l = b.querySelector('.xm-vl'); if (l) l.textContent = xmVoiceLabel();
}
function xmGo() {
  const X = XM.sheet; if (!X) return; const x = xmStore(); const m = X.mode;
  const keep = { py: m.py, tc: m.tc, tr: m.tr, hz: m.hz, ap: m.ap, rate: m.rate, ch: m.ch, n: m.n };
  if (X.isDef) { delete keep.n; x.def = keep; save(); xmClose(); toast(t('Mode diterapkan'), 1600, 'xm'); if (typeof ROUTE !== 'undefined' && ROUTE === 'me') render(); return; }
  x.k[X.kind] = keep;
  const sk = $('#xmSkip'); if (sk) { if (sk.checked) x.skip[X.kind] = 1; else delete x.skip[X.kind]; }
  save();
  if (X.live) { xmApply(Object.assign({}, m), X.kind); xmClose(); xmTimerItem(); toast(t('Mode diterapkan'), 1400, 'xm'); return; }
  const act = X.act, b = X.b; xmClose(true);
  xmRun(act, b, Object.assign({}, m), X.kind);
}
function xmRun(act, b, mode, kind) {
  xmApply(mode, kind); XM.pending = { kind, mode, t: Date.now() };
  const f = ACT[act]; if (!f) return;
  try { FX.ensure(); } catch (e) {}
  try { f(b || document.createElement('button'), { target: b }); } catch (err) { console.error('action', act, err); toast(t('🩹 Ups, ada gangguan kecil. Coba lagi ya.')); }
  setTimeout(() => { if (XM.pending && Date.now() - XM.pending.t >= 1400) XM.pending = null; }, 1500);
}

/* ---------- mencegat tombol mulai ---------- */
document.addEventListener('click', e => {
  const xb = e.target.closest && e.target.closest('[data-xm]');
  if (xb && !xb.closest('#xmode')) {
    e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
    const k = XM.kind && XM_KIND[XM.kind] ? XM.kind : 'smart';
    xmOpen({ kind: xb.dataset.xm === 'live' ? k : xb.dataset.xm, live: xb.dataset.xm === 'live' }); return;
  }
  /* pinyin/arti buram: ketuk untuk lihat (sekelompok satu baris) */
  const hz = e.target.closest && (e.target.closest(XM_PY) || e.target.closest(XM_TR));
  if (hz && hz.closest(XM_ROOTS) && !hz.closest(XM_IO) && xmIsHidden(hz)) {
    e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
    const isTr = hz.matches(XM_TR); const grp = hz.closest('.cx-zh,.dl-l,.kl-ex,.tm-ex,.lg-syls,.q-py,.cx-py') || hz;
    (grp === hz ? [] : grp.querySelectorAll(isTr ? XM_TR : XM_PY)).forEach(x => x.classList.add('xm-rev')); hz.classList.add('xm-rev');
    try { FX.play('flip'); } catch (er) {} return;
  }
  const b = e.target.closest && e.target.closest('[data-a]'); if (!b) return;
  const act = b.dataset.a; const kind = XM_ACT[act]; if (!kind || !ACT[act] || b.disabled) return;
  if (b.closest('#session') && !b.closest('.overlay')) return;
  if (typeof SES !== 'undefined' && SES) return;
  const x = xmStore();
  if (!x.ask || x.skip[kind] || xmTestSkip()) { xmApply(xmGet(kind), kind); XM.pending = { kind, mode: XM.cur, t: Date.now() }; return; }
  e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
  try { FX.ensure(); FX.play('tap'); } catch (er) {}
  xmOpen({ kind, act, b });
}, true);
document.addEventListener('keydown', e => {
  const ov = $('#xmode'); if (!ov || !XM.sheet || ov.classList.contains('xm-away')) return;
  e.stopImmediatePropagation(); xmSheetKey(e);   // lembar terbuka: tombol keyboard tidak boleh menjawab soal di belakangnya
}, true);

/* ---------- sesi: mode, jumlah soal, timer tantangan ---------- */
function xmGuessKind(opts) {
  if (opts && opts.tema) return opts.tmExam ? 'temaexam' : 'tema';
  if (typeof FC !== 'undefined' && FC) return 'kelasfc';
  return null;
}
const xmStartSession = startSession;
startSession = function (items, opts = {}) {
  let P = XM.pending; XM.pending = null;
  const keep = (typeof SES !== 'undefined' && SES) || Date.now() - XM.endT < 2500;
  if (!P && !(keep && XM.cur)) { const k = xmGuessKind(opts) || XM.kind || 'smart'; xmApply(xmGet(k), k); }
  if (P && P.mode && P.mode.n && Array.isArray(items) && xmFlags(P.kind).includes('n') && P.kind !== 'kelasfc' && items.length > P.mode.n) items = items.slice(0, P.mode.n);
  return xmStartSession(items, opts);
};
const xmEndSession = endSession;
endSession = function () { XM.endT = Date.now(); xmTimerStop(); return xmEndSession.apply(this, arguments); };
const xmRenderItem = renderItem;
renderItem = function () { xmTimerStop(); const r = xmRenderItem.apply(this, arguments); try { xmAfterItem(); } catch (e) {} return r; };
const xmAnswer = answer;
answer = function () { xmTimerStop(); const r = xmAnswer.apply(this, arguments); xmProcess(); return r; };
if (typeof openFC === 'function') {
  const xmOpenFC = openFC;
  openFC = function (cfg) {
    const P = XM.pending; if (P && P.kind === 'kelasfc' && P.mode && P.mode.n && cfg) cfg = Object.assign({}, cfg, { max: P.mode.n });
    if (!P && !XM.cur) xmApply(xmGet('kelasfc'), 'kelasfc'); XM.pending = null;
    return xmOpenFC(cfg);
  };
}
function xmAfterItem() {
  const it = SES && SES.items[SES.i]; if (!it || !XM.cur) return;
  /* santai: pinyin selalu ada di soal arti */
  if (XM.cur.ch === 'easy' && it.type === 'mc_mean' && it.wid !== undefined && !$('#sbody .q-py')) { const hz = $('#sbody .q-hz'); if (hz) hz.insertAdjacentHTML('afterend', `<div class="q-py">${pinyinHTML(W[it.wid], 'mark')}</div>`); }
  xmProcess(); xmTimerItem();
}
function xmTimerStop() { clearTimeout(XM.tmr); XM.tmr = 0; const b = $('#xmtm'); if (b) b.remove(); }
function xmTimerItem() {
  xmTimerStop();
  if (!XM.cur || XM.cur.ch !== 'hard' || XM.kind === 'arcade' || XM.kind === 'speed' || typeof SES === 'undefined' || !SES || SES.answered) return;
  const it = SES.items[SES.i]; if (!it || it.type === 'write' || XM_READ.has(it.type)) return;
  const body = $('#sbody'); const top = $('#session .s-top'); if (!body || !top) return;
  if (!body.querySelector('[data-s="opt"],#tin,#tmin,[data-s="bchunk"],[data-s="mt"]')) return;
  const long = body.querySelector('#tin,#tmin,[data-s="bchunk"],[data-s="mt"]'); const ms = long ? 30000 : 12000;
  const bar = document.createElement('div'); bar.className = 'xm-tm'; bar.id = 'xmtm'; bar.setAttribute('role', 'timer'); bar.setAttribute('aria-label', t('Tantangan')); bar.innerHTML = '<i></i>';
  top.appendChild(bar); const i = bar.firstChild; i.style.transitionDuration = ms + 'ms'; requestAnimationFrame(() => requestAnimationFrame(() => { i.style.transform = 'scaleX(0)'; }));
  XM.tmr = setTimeout(() => { XM.tmr = 0; if (SES && SES.items[SES.i] === it && !SES.answered) { toast(t('Waktu habis'), 1400, 'xmt'); answer(false, t('Waktu habis')); } }, ms);
}

/* ---------- Saya / Pengaturan ---------- */
function xmMeCard() {
  const x = xmStore(); const nk = Object.keys(x.k).length; const ns = Object.keys(x.skip).length; const d = xmGet('_def');
  const pyL = { show: t('Tampil'), hide: t('Sembunyi'), after: t('Setelah jawab') }[d.py];
  return `<section class="card glass xm-me"><h2>${ICON('settings')} ${t('Mode belajar')}</h2>
    <div class="set"><div class="l"><b>${t('Tanya mode sebelum mulai')}</b><span>${t('Lembar kecil untuk memilih pinyin, arti, suara & tantangan sebelum tiap aktivitas')}</span></div><button class="toggle ${x.ask ? 'on' : ''}" data-a="xmask" role="switch" aria-checked="${x.ask}" aria-label="${t('Tanya mode sebelum mulai')}"></button></div>
    <div class="set"><div class="l"><b>${t('Mode bawaan')}</b><span>${t('Pinyin')}: ${pyL} · ${t('Arti')}: ${d.tr === 'show' ? t('Tampil') : t('Sampai menjawab')} · ${t('Tantangan')}: ${t({ easy: 'Santai', normal: 'Normal', hard: 'Tantangan' }[d.ch] || 'Normal')}</span></div><button class="btn sec small" data-a="xmdef">${ICON('settings')} ${t('Atur mode bawaan')}</button></div>
    ${nk || ns ? `<p class="small muted" style="margin:10px 0 8px">${t('{n} menu punya pilihan sendiri · {m} tidak ditanya lagi', { n: nk, m: ns })}</p><div class="row wrap" style="gap:8px">${ns ? `<button class="btn sec small" data-a="xmaskall">${ICON('refresh')} ${t('Tanya lagi di semua menu')}</button>` : ''}${nk ? `<button class="btn ghost small" data-a="xmclear">${ICON('trash')} ${t('Hapus pilihan per menu')}</button>` : ''}</div>` : ''}
  </section>`;
}
const xmVMe = vMe;
vMe = function () {
  const h = xmVMe(); const key = `<h2>${t('Suara & nada')}</h2>`; const k = h.indexOf(key); if (k < 0) return h + xmMeCard();
  const s = h.lastIndexOf('<section', k); return s < 0 ? h + xmMeCard() : h.slice(0, s) + xmMeCard() + h.slice(s);
};
Object.assign(ACT, {
  xmode: b => xmOpen({ kind: (b && b.dataset && b.dataset.v) || '_def' }),
  xmdef: () => xmOpen({ kind: '_def' }),
  xmask: () => { const x = xmStore(); x.ask = !x.ask; save(); render(); },
  xmaskall: () => { xmStore().skip = {}; save(); toast(t('Semua menu akan bertanya lagi')); render(); },
  xmclear: () => { const x = xmStore(); x.k = {}; x.skip = {}; save(); toast(t('Pilihan per menu dihapus')); render(); }
});
window.xmOpen = xmOpen; window.xmApply = xmApply; window.xmGet = xmGet;

new MutationObserver(xmSchedule).observe(document.documentElement, { childList: true, subtree: true });
/* V0.9: tema bawaan Terang (sekali saja untuk pengguna lama yang masih "Auto"), warna bar status ikut palet baru */
Object.assign(I18N, { 'Redup': ['Dim', 'Dim'] }); Object.assign(I18N_VI, { 'Redup': 'Dịu' });
const thApplyBase = applyTheme;
applyTheme = function () {
  try { if (S && S.settings && !S.settings.th9) { S.settings.th9 = 1; if (S.settings.theme === 'auto') S.settings.theme = 'light'; save(); } } catch (e) {}
  thApplyBase();
  const th = S.settings.theme; const dark = th === 'dark' || (th === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  const m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = dark ? '#2a2130' : '#fffafc';
};
/* V0.9: Progres masuk bar bawah HP (menggantikan Kata, yang tetap ada di Lainnya) */
(function () { const k = TABS.indexOf('words'); if (k >= 0 && !TABS.includes('prog')) TABS[k] = 'prog'; if (typeof TAB_SHORT === 'object' && !TAB_SHORT.prog) TAB_SHORT.prog = 'Progres'; })();
/* ui2.js — V0.9 "Rapi": arsitektur informasi + Beranda bento + Kelas mode grid.
   Hanya membungkus/menimpa fungsi global (vHome, XVIEWS.kelas, moreSheet, afterRender) — semua data-a tetap sama. */
Object.assign(I18N, {
  'Belajar': ['Learn', 'Matuto'], 'Latihan': ['Practice', 'Pagsasanay'], 'Main': ['Play', 'Laro'], 'Saya': ['Me', 'Ako'],
  'Hari ini': ['Today', 'Ngayon'], 'Jelajahi': ['Explore', 'Galugarin'], 'Latihan kilat': ['Quick drills', 'Mabilisang drill'], 'Perjalananmu': ['Your journey', 'Iyong paglalakbay'],
  'Lanjutkan': ['Continue', 'Ituloy'], 'Mode belajar': ['Study modes', 'Mga paraan ng pag-aaral'], 'Peta lesson': ['Lesson map', 'Mapa ng aralin'],
  'Unggulan': ['Featured', 'Tampok'], 'Alat kelas': ['Class tools', 'Mga kagamitan sa klase'], 'Amankan progresmu': ['Secure your progress', 'I-secure ang progreso'],
  '{n} kata belum dicadangkan': ['{n} words not backed up', '{n} salitang walang backup'], 'Salin kode': ['Copy code', 'Kopyahin ang code'],
  'Tutup': ['Dismiss', 'Isara'], 'Menu lainnya': ['More', 'Iba pa'], 'Semua fitur, dikelompokkan': ['Every feature, grouped', 'Lahat ng feature, naka-grupo'],
  'Progres belajar': ['Learning progress', 'Progreso sa pag-aaral'], 'Lihat tingkat tiap kata': ['See each word’s level', 'Tingnan ang antas ng bawat salita'],
  'Kartu ingat': ['Recall cards', 'Recall cards'], 'Ingat dulu, baru lihat jawaban': ['Recall first, then check', 'Alalahanin muna, saka tingnan'],
  'Tips belajar efektif': ['Study tips', 'Mga tip sa pag-aaral']
});
if (typeof I18N_VI !== 'undefined') Object.assign(I18N_VI, {
  'Belajar': 'Học', 'Latihan': 'Luyện tập', 'Main': 'Chơi', 'Saya': 'Tôi', 'Hari ini': 'Hôm nay', 'Jelajahi': 'Khám phá', 'Latihan kilat': 'Luyện nhanh',
  'Perjalananmu': 'Hành trình của bạn', 'Lanjutkan': 'Tiếp tục', 'Mode belajar': 'Chế độ học', 'Peta lesson': 'Bản đồ bài học', 'Unggulan': 'Nổi bật', 'Alat kelas': 'Công cụ lớp',
  'Amankan progresmu': 'Bảo vệ tiến độ', '{n} kata belum dicadangkan': '{n} từ chưa sao lưu', 'Salin kode': 'Sao chép mã', 'Tutup': 'Đóng', 'Menu lainnya': 'Thêm',
  'Semua fitur, dikelompokkan': 'Mọi tính năng, theo nhóm', 'Progres belajar': 'Tiến độ học', 'Lihat tingkat tiap kata': 'Xem cấp độ từng từ', 'Kartu ingat': 'Thẻ nhớ',
  'Ingat dulu, baru lihat jawaban': 'Nhớ trước, rồi xem đáp án', 'Tips belajar efektif': 'Mẹo học hiệu quả'
});

/* ---------- 1. Arsitektur informasi ---------- */
const U2_GROUPS = [
  ['', ['home']],
  ['Belajar', ['kelas', 'path', 'words', 'kalimat', 'hanzi', 'grammar']],
  ['Latihan', ['memory', 'listen', 'write', 'tones', 'twins']],
  ['Main', ['lgame', 'arena', 'arcade', 'slang', 'fab']],
  ['Saya', ['prog', 'stats', 'me']]
];
function u2Groups() {
  const seen = new Set(); const R = r => ROUTES.find(x => x[0] === r);
  const out = U2_GROUPS.map(([g, rs]) => [g, rs.map(R).filter(Boolean)]);
  out.forEach(([, l]) => l.forEach(x => seen.add(x[0])));
  const rest = ROUTES.filter(r => !seen.has(r[0]));
  if (rest.length) { const m = out.find(g => g[0] === 'Main'); m[1].push(...rest); }
  return out.filter(g => g[1].length);
}
function u2NavA([r, ic, lbl]) {
  return `<a class="nav ${ROUTE === r ? 'on' : ''}" href="#${r}" data-a="tap" title="${esc(t(lbl))}" ${ROUTE === r ? 'aria-current="page"' : ''}><span class="ic">${ICON(ic)}</span><span class="lbl">${t(lbl)}</span></a>`;
}
function u2Nav() {
  const n = document.querySelector('.side .navs'); if (!n) return;
  const st = n.scrollTop;
  n.innerHTML = u2Groups().map(([g, l]) => (g ? `<div class="u2-nh" role="presentation"><span>${t(g)}</span></div>` : '') + l.map(u2NavA).join('')).join('');
  n.scrollTop = st;
  const on = n.querySelector('.nav.on'); if (!on) return;
  const r = on.getBoundingClientRect(), rn = n.getBoundingClientRect();
  if (r.top < rn.top || r.bottom > rn.bottom) n.scrollTop += r.top - rn.top - (rn.height - r.height) / 2;
}
moreSheet = function () {
  const rk = rankOf(); const st = streakNow();
  const groups = u2Groups().map(([g, l]) => [g, l.filter(r => !TABS.includes(r[0]))]).filter(g => g[1].length);
  openModal(`<div class="u2-more">
    <div class="u2-more-h"><div class="grow" style="min-width:0"><div class="q-kind">${t('Menu lainnya')}</div><h2>Xiǎobù</h2><span class="small muted">${t('Semua fitur, dikelompokkan')}</span></div></div>
    <div class="u2-more-st"><span>${ICON('award')} <b>${rk.n}</b> ${esc(t(rk.name))}</span><span>${ICON('flame')} <b>${st}</b> ${t('hari')}</span><span><b>${fmtN(S.xp)}</b> XP</span><button class="btn sec small" data-a="gobackup">${ICON('download')} ${t('Simpan progres')}</button></div>
    ${groups.map(([g, l]) => `<div class="u2-mg"><h3 class="u2-eyebrow">${t(g || 'Belajar')}</h3><div class="u2-ml">${l.map(([r, ic, lbl]) => `<button class="u2-mi ${ROUTE === r ? 'on' : ''}" data-a="goto" data-v="${r}">${TILE(ic, 'tint ' + (ROUTE_COLOR[r] || 'c0'))}<span class="grow" style="min-width:0"><b>${t(TAB_SHORT[r] || lbl)}</b><span>${t(ROUTE_DESC[r] || '')}</span></span></button>`).join('')}</div></div>`).join('')}
  </div>`, 'u2-sheet');
};

/* ---------- util DOM ---------- */
function u2Frag(h) { const tp = document.createElement('template'); tp.innerHTML = h; return tp.content; }
function u2Take(F, test) { const e = [...F.children].find(test); if (e) e.remove(); return e || null; }
function u2TakeAll(F, test) { const l = [...F.children].filter(test); l.forEach(e => e.remove()); return l; }
const u2Is = sel => e => e.matches(sel);
function u2Out(nodes) { return nodes.filter(Boolean).map(n => typeof n === 'string' ? n : n.outerHTML).join(''); }
function u2Txt(e) { return e ? e.textContent.replace(/\s+/g, ' ').trim() : ''; }
function u2Attrs(e) { return ['a', 'v', 'n', 'k'].filter(k => e.dataset[k] !== undefined).map(k => `data-${k}="${esc(e.dataset[k])}"`).join(' '); }
const u2Head = (ti, extra = '') => `<div class="u2-head"><h2 class="u2-eyebrow">${t(ti)}</h2>${extra}</div>`;
function u2Tile(o) {
  return `<button class="u2-tile ${o.cls || ''}" ${o.attrs}>${o.icon}<span class="u2-tx"><b>${o.title}</b>${o.sub ? `<span>${o.sub}</span>` : ''}</span>${o.badge ? `<span class="u2-badge">${o.badge}</span>` : ''}</button>`;
}

/* ---------- 2. Beranda ---------- */
const U2 = { pOpen: false };
document.addEventListener('toggle', e => { const d = e.target; if (d && d.classList && d.classList.contains('u2-portion')) U2.pOpen = d.open; }, true);
const U2_HOME_IC = { lgame: ['lgame', 'c5'], arena: ['arena', 'c1'] };
function u2Home(h) {
  const F = u2Frag(h);
  const hero = u2Take(F, u2Is('.hero'));
  const nag = u2Take(F, u2Is('.bknag'));
  const klh = u2Take(F, u2Is('.kl-home'));
  const pg = u2Take(F, u2Is('.pg-entry'));
  const entries = u2TakeAll(F, e => e.matches('section[data-a]'));
  const route = u2Take(F, u2Is('.route'));
  const quest = u2Take(F, u2Is('.qcard'));
  const feats = u2Take(F, e => !!e.querySelector('.feats'));
  const modes = u2Take(F, e => !!e.querySelector('.modes'));
  const a2 = u2Take(F, e => e.matches('section') && e.querySelectorAll('.acc').length >= 3);
  const rails = u2TakeAll(F, u2Is('.rail-inline'));
  const rest = [...F.children]; rest.forEach(e => e.remove());

  /* hero: satu CTA utama "Lanjutkan" */
  if (hero) {
    hero.classList.add('u2-hero');
    const pri = hero.querySelector('.btn.pri');
    if (pri) { pri.classList.add('u2-cta'); const inner = pri.innerHTML; pri.innerHTML = `<span class="u2-cta-t"><small>${t('Lanjutkan')}</small><span>${inner}</span></span>${ICON('chevron')}`; }
    hero.querySelectorAll('.btn.sec').forEach(b => { b.classList.remove('sec'); b.classList.add('ghost', 'u2-cta2'); });
  }
  /* rute: porsi belajar dilipat (progressive disclosure) */
  const por = route && route.querySelector('.portion');
  if (por) {
    const head = por.querySelector('.pt-head'); const g = head && head.querySelector('.grow');
    const d = document.createElement('details'); d.className = 'portion u2-portion'; if (U2.pOpen) d.open = true;
    d.innerHTML = `<summary>${g ? g.outerHTML : ''}${ICON('chevron')}</summary>`;
    if (g) g.remove();
    const body = document.createElement('div'); body.className = 'u2-pbody'; body.innerHTML = por.innerHTML; d.appendChild(body);
    por.replaceWith(d);
  }
  /* pengingat cadangan -> chip kecil yang bisa ditutup */
  let chip = '';
  if (nag) {
    const n = Object.keys(S.cards).length;
    chip = `<div class="u2-nag" role="status">${TILE('download', 'tint c3')}<span class="grow"><b>${t('Amankan progresmu')}</b><span>${t('{n} kata belum dicadangkan', { n: fmtN(n) })}</span></span><button class="btn pri small" data-a="copycode">${t('Salin kode')}</button><button class="u2-x" data-a="bksnooze" aria-label="${t('Tutup')}" title="${t('Nanti')}">${ICON('close')}</button></div>`;
  }
  /* bento */
  const tiles = [];
  if (klh) {
    const ring = klh.querySelector('svg.ring'); const ti = klh.querySelector('h2'); const sub = klh.querySelector('.small.muted');
    const btns = [...klh.querySelectorAll('button[data-a]')];
    tiles.push(`<div class="u2-tile u2-xl u2-kelas" data-a="goto-kelas" role="button" tabindex="0"><div class="u2-kh">${ring ? ring.outerHTML : ''}<span class="u2-tx"><b>${esc(u2Txt(ti))}</b><span>${esc(u2Txt(sub))}</span></span></div>
      <div class="u2-kb">${btns.map((b, i) => `<button class="btn ${i ? 'ghost' : 'pri'} small" ${u2Attrs(b)}>${b.innerHTML}</button>`).join('')}</div></div>`);
  }
  if (pg) {
    const b = pg.querySelector('.pg-entry-b'); const meta = b ? b.querySelector('.small') : null; b && b.remove();
    tiles.push(`<div class="u2-tile u2-wide u2-prog" data-a="goto-prog" role="button" tabindex="0"><div class="u2-row">${TILE('progress', 'tint c3')}<span class="u2-tx"><b>${t('Progres belajar')}</b><span>${esc(u2Txt(meta))}</span></span>${ICON('chevron')}</div>${pg.innerHTML}</div>`);
  } else if (ROUTES.some(r => r[0] === 'prog')) {
    tiles.push(u2Tile({ attrs: 'data-a="goto-prog"', icon: TILE('progress', 'lg tint c3'), title: t('Progres belajar'), sub: t('Lihat tingkat tiap kata') }));
  }
  const featBtns = feats ? [...feats.querySelectorAll('.feat[data-a]')] : [];
  const fb = a => featBtns.find(b => b.dataset.a === a);
  const featTileOf = (b, cls = '') => { const ic = b.querySelector('.ic-tile'); const bd = b.querySelector('.fbadge'); const bt = /^\d+$/.test(u2Txt(bd)) ? u2Txt(bd) : '';
    return u2Tile({ cls, attrs: u2Attrs(b), icon: ic ? ic.outerHTML : '', title: esc(u2Txt(b.querySelector('b'))), sub: esc(u2Txt(b.querySelector('.grow > span'))), badge: bt }); };
  const used = new Set();
  ['recall', 'speedrun'].forEach(a => { const b = fb(a); if (b) { tiles.push(featTileOf(b)); used.add(a); } });
  entries.forEach(e => {
    const a = e.dataset.a; const [ic, c] = U2_HOME_IC[a] || ['sparkle', 'c4'];
    const sub = e.querySelector('.grow span, .grow > span'); const ti = e.querySelector('b');
    tiles.push(u2Tile({ cls: 'u2-game u2-' + a, attrs: u2Attrs(e), icon: TILE(ic, 'lg tint ' + c), title: esc(u2Txt(ti)), sub: esc(u2Txt(sub)) }));
  });
  featBtns.forEach(b => { if (!used.has(b.dataset.a)) tiles.push(featTileOf(b)); });
  const quick = modes ? [...modes.querySelectorAll('[data-a]')].map(b => { const ic = b.querySelector('.ic-tile'); return `<button class="u2-q" ${u2Attrs(b)}>${ic ? ic.outerHTML : ''}<b>${esc(u2Txt(b.querySelector('b')))}</b></button>`; }).join('') : '';

  return u2Out([hero]) + chip
    + (route || quest ? `<div class="u2-group">${u2Head('Hari ini')}${u2Out([route, quest])}</div>` : '')
    + (tiles.length ? `<div class="u2-group">${u2Head('Jelajahi')}<div class="u2-bento">${tiles.join('')}</div></div>` : '')
    + (quick ? `<div class="u2-group">${u2Head('Latihan kilat')}<div class="u2-quick">${quick}</div></div>` : '')
    + u2Out(rest)
    + (a2 || rails.length ? `<div class="u2-group">${u2Head('Perjalananmu')}${u2Out(rails)}${u2Out([a2])}</div>` : '');
}
const u2HomeBase = vHome;
vHome = function () { const h = u2HomeBase(); try { return u2Home(h); } catch (e) { console.error('u2Home', e); return h; } };
document.addEventListener('keydown', e => {
  const el = e.target; if ((e.key === 'Enter' || e.key === ' ') && el && el.classList && el.classList.contains('u2-tile') && el.tagName === 'DIV') { e.preventDefault(); el.click(); }
});

/* ---------- 3. Kelas (peta) ---------- */
const U2_KL = {
  kbhome: ['book', 'c1', 'Khatam'], tmhub: ['grid', 'c6'], twhome: ['twins', 'c4'], arena: ['arena', 'c8'], klduel: ['game', 'c7'], kltocfl: ['award', 'c3'], l50: ['headphone', 'c2']
};
function u2Kelas(h) {
  if (h.indexOf('kl-hero') < 0) return h;
  const F = u2Frag(h);
  const hero = u2Take(F, u2Is('.kl-hero'));
  if (!hero) return h;
  const banners = u2TakeAll(F, e => e.matches('section[data-a]'));
  const tools = u2Take(F, u2Is('.kl-tools'));
  const courses = u2TakeAll(F, u2Is('.kl-course'));
  const tips = u2Take(F, e => e.matches('section.card') && !!e.querySelector('.steps-mini'));
  const rest = [...F.children]; rest.forEach(e => e.remove());
  hero.classList.add('u2-klhero');
  const seen = new Set();
  const feat = banners.map(e => {
    const a = e.dataset.a; seen.add(a); const [ic, c] = U2_KL[a] || ['sparkle', 'c4'];
    const ti = e.querySelector('b'); const sub = e.querySelector('.grow > span') || e.querySelector('.grow span');
    return u2Tile({ cls: 'u2-feat', attrs: u2Attrs(e) + ` style="--tc:var(--${c})"`, icon: TILE(ic, 'lg tint ' + c), title: esc(u2Txt(ti)), sub: esc(u2Txt(sub)) });
  });
  const small = tools ? [...tools.querySelectorAll('[data-a]')].filter(b => !seen.has(b.dataset.a)).map(b => {
    const ic = b.querySelector('.ic-tile'); return u2Tile({ cls: 'u2-sm', attrs: u2Attrs(b), icon: ic ? ic.outerHTML : '', title: esc(u2Txt(b.querySelector('b'))), sub: esc(u2Txt(b.querySelector('span:not(.ic-tile)'))) });
  }) : [];
  let tipsH = '';
  if (tips) { const h2 = tips.querySelector('h2'); const t2 = u2Txt(h2); h2 && h2.remove(); tipsH = `<details class="card glass u2-tips"><summary>${TILE('lightbulb', 'tint c3')}<b class="grow">${esc(t2 || t('Tips belajar efektif'))}</b>${ICON('chevron')}</summary>${tips.innerHTML}</details>`; }
  return hero.outerHTML
    + (feat.length || small.length ? `<div class="u2-group">${u2Head('Mode belajar')}${feat.length ? `<div class="u2-feats">${feat.join('')}</div>` : ''}${small.length ? `<div class="u2-tools">${small.join('')}</div>` : ''}</div>` : '')
    + u2Out(rest)
    + (courses.length ? `<div class="u2-group">${u2Head('Peta lesson')}${u2Out(courses)}</div>` : '')
    + tipsH;
}
const u2KelasBase = XVIEWS.kelas;
XVIEWS.kelas = function () { const h = u2KelasBase(); try { return u2Kelas(h); } catch (e) { console.error('u2Kelas', e); return h; } };

/* ---------- 4. setelah render ---------- */
/* judul halaman (h1) selalu di atas: banner/kartu tambahan pindah ke bawahnya */
function u2HeadFirst() {
  if (ROUTE === 'home' || ROUTE === 'kelas') return;
  const m = document.getElementById('main'); if (!m) return;
  const kids = [...m.children].filter(e => !e.matches('.topbar'));
  const first = kids[0]; if (!first || first.querySelector('h1')) return;
  const hd = kids.slice(1, 5).find(e => e.matches('section') && e.querySelector(':scope > h1, :scope h1'));
  if (hd) first.before(hd);
}
/* isi sel kosong terakhir di grid bento/fitur supaya baris terakhir tidak bolong */
function u2Fill() {
  document.querySelectorAll('.u2-bento, .u2-feats, .u2-tools').forEach(g => {
    const kids = [...g.children]; kids.forEach(k => { k.style.gridColumn = ''; });
    const cols = getComputedStyle(g).gridTemplateColumns.split(' ').filter(Boolean).length; if (cols < 2) return;
    let cells = 0; kids.forEach(k => { const span = k.classList.contains('u2-xl') || k.classList.contains('u2-wide') ? 2 : 1; const rows = 1; cells += span * rows; });
    const r = cells % cols; const last = kids[kids.length - 1];
    if (r && last && !last.classList.contains('u2-xl') && !last.classList.contains('u2-wide')) last.style.gridColumn = `span ${cols - r + 1}`;
  });
}
let u2RT = 0; window.addEventListener('resize', () => { clearTimeout(u2RT); u2RT = setTimeout(u2Fill, 120); });
const u2AfterBase = afterRender;
afterRender = function () {
  u2AfterBase();
  try { u2Nav(); u2HeadFirst(); u2Fill(); const app = document.getElementById('app'); if (app) app.dataset.route = ROUTE; } catch (e) { console.error('u2Nav', e); }
};
