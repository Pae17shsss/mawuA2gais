/* ========== V1.0 ARENA · 句子大作戰 Duel Kalimat (game 'kal') ==========
   Boss battle anime: Hacimi (gadis penyihir) melawan 3 boss + boss final 2 fase.
   Tiap giliran = 1 tugas kalimat: Susun kartu-kata, Isi kata yang hilang, atau Dengar & susun.
   Benar → cut-in + serangan sihir (damage naik dengan kecepatan, panjang kalimat, combo).
   Salah / waktu habis → boss menyerang (nyawa berkurang), lalu kalimat benar ditampilkan + pinyin + arti + audio. */
Object.assign(I18N, {
  'Duel Kalimat': ['Sentence Duel', 'Duelo ng Pangungusap'],
  'Susun kartu-kata jadi kalimat, isi yang hilang, dengar lalu susun — kalahkan boss anime!': ['Arrange word cards into sentences, fill the gap, listen & build — defeat the anime bosses!', 'Ayusin ang mga card bilang pangungusap, punan ang patlang, makinig at buuin — talunin ang mga boss!'],
  'Kalimat': ['Sentences', 'Pangungusap'], 'Tata bahasa': ['Grammar', 'Gramatika'], 'Dengar': ['Listen', 'Pakinig'], 'Susun': ['Build', 'Buuin'], 'Isi': ['Fill', 'Punan'], 'Campur': ['Mixed', 'Halo'],
  'Mudah': ['Easy', 'Madali'], 'Normal': ['Normal', 'Normal'], 'Sulit': ['Hard', 'Mahirap'],
  'Mode': ['Mode', 'Mode'], 'Tingkat': ['Difficulty', 'Antas'],
  'Mulai duel': ['Start duel', 'Simulan ang duelo'],
  '3–5 kartu, pinyin tampil, tanpa timer': ['3–5 cards, pinyin shown, no timer', '3–5 card, may pinyin, walang timer'],
  'Kalimat lebih panjang, tanpa pinyin': ['Longer sentences, no pinyin', 'Mas mahabang pangungusap, walang pinyin'],
  'Tanpa pinyin, kartu pengecoh lebih banyak, ada timer': ['No pinyin, more decoys, timer on', 'Walang pinyin, mas maraming panlinlang, may timer'],
  'Susun kalimat': ['Build the sentence', 'Buuin ang pangungusap'], 'Isi yang kosong': ['Fill the gap', 'Punan ang patlang'], 'Dengar & susun': ['Listen & build', 'Makinig at buuin'],
  'Serang!': ['Attack!', 'Atake!'], 'Hapus satu': ['Undo', 'Bawiin'], 'Ulang susun': ['Reset', 'Ulitin'],
  'Dengar lagi': ['Listen again', 'Makinig muli'], 'Pelan': ['Slow', 'Mabagal'],
  'Benar!': ['Correct!', 'Tama!'], 'Belum tepat': ['Not quite', 'Hindi pa tama'], 'Waktu habis!': ['Time is up!', 'Ubos na ang oras!'],
  'Jawabanmu': ['Your answer', 'Sagot mo'], 'Lanjut': ['Continue', 'Ituloy'],
  'Nyawa': ['Lives', 'Buhay'], 'Skor': ['Score', 'Iskor'], 'Akurasi': ['Accuracy', 'Katumpakan'], 'Combo maks': ['Max combo', 'Pinakamataas na combo'],
  'Rekor baru!': ['New record!', 'Bagong rekord!'], 'Main lagi': ['Play again', 'Maglaro muli'], 'Kembali': ['Back', 'Bumalik'],
  'Kalimat yang perlu diulang': ['Sentences to review', 'Mga pangungusap na uulitin'], 'Semua benar — sempurna!': ['All correct — perfect!', 'Lahat tama — perpekto!'],
  'MENANG!': ['VICTORY!', 'PANALO!'], 'KALAH…': ['DEFEATED…', 'TALO…'], 'Boss dikalahkan': ['Bosses defeated', 'Natalong boss'],
  'Jeda': ['Paused', 'Nakahinto'], 'Keluar': ['Quit', 'Lumabas'],
  'STAGE BERES!': ['STAGE CLEAR!', 'TAPOS ANG STAGE!'], '+1 nyawa': ['+1 life', '+1 buhay'], 'BOSS FINAL': ['FINAL BOSS', 'HULING BOSS'],
  'Fase 2 · Sang Raja murka!': ['Phase 2 · The King is furious!', 'Phase 2 · Galit na ang Hari!'],
  'Awan Cemberut': ['Grumpy Cloud', 'Masungit na Ulap'], 'Harimau Pasar Malam': ['Night Market Tiger', 'Tigre ng Night Market'], 'Naga Kuil': ['Temple Dragon', 'Dragon ng Templo'], 'Raja Kalimat Kacau': ['King of Scrambled Sentences', 'Hari ng Gulong Pangungusap'],
  'Kastel Langit': ['Sky Castle', 'Kastilyo sa Langit'], 'Pasar Malam': ['Night Market', 'Night Market'], 'Kuil Senja': ['Twilight Temple', 'Templo sa Dapithapon'], 'Langit Bintang': ['Starry Void', 'Mabituing Kalawakan'],
  'Ketik angka untuk memilih kartu · Backspace hapus · Enter serang': ['Number keys pick cards · Backspace undo · Enter attack', 'Numero para pumili · Backspace bawiin · Enter atake'],
  'Suara mati di Pengaturan — tugas Dengar memakai pinyin.': ['Sound is off in Settings — Listen tasks show pinyin.', 'Naka-off ang tunog — pinyin ang ipapakita sa Pakinig.'],
  'Musik': ['Music', 'Musika'], 'Tutup': ['Close', 'Isara'], 'Pinyin': ['Pinyin', 'Pinyin'], 'Arti': ['Meaning', 'Kahulugan'],
  'Kamu mengalahkan {n} boss': ['You defeated {n} bosses', 'Natalo mo ang {n} boss'], 'Pilih kata yang tepat': ['Choose the right word', 'Piliin ang tamang salita'],
  'Kalimat dari: {s}': ['Sentences from: {s}', 'Pangungusap mula sa: {s}'], 'semua lesson + tema': ['all lessons + themes', 'lahat ng lesson + tema'],
  'Tebasan Bintang': ['Star Slash', 'Hiwa ng Bituin'], 'Ledakan Sakura': ['Sakura Burst', 'Pagsabog ng Sakura'], 'Meriam Pelangi': ['Rainbow Cannon', 'Kanyon ng Bahaghari'], 'Hujan Meteor': ['Meteor Shower', 'Ulan ng Bulalakaw'], 'Tinju Cakar Kucing': ['Cat Paw Punch', 'Suntok ng Paa ng Pusa'], 'Gelombang Bulan': ['Moonlight Wave', 'Alon ng Buwan']
});
Object.assign(I18N_VI, {
  'Duel Kalimat': 'Đấu câu', 'Susun kartu-kata jadi kalimat, isi yang hilang, dengar lalu susun — kalahkan boss anime!': 'Xếp thẻ từ thành câu, điền chỗ trống, nghe rồi xếp — đánh bại boss anime!',
  'Kalimat': 'Câu', 'Tata bahasa': 'Ngữ pháp', 'Dengar': 'Nghe', 'Susun': 'Xếp câu', 'Isi': 'Điền', 'Campur': 'Trộn', 'Mudah': 'Dễ', 'Normal': 'Thường', 'Sulit': 'Khó',
  'Mode': 'Chế độ', 'Tingkat': 'Độ khó', 'Mulai duel': 'Bắt đầu đấu',
  '3–5 kartu, pinyin tampil, tanpa timer': '3–5 thẻ, có pinyin, không giới hạn giờ', 'Kalimat lebih panjang, tanpa pinyin': 'Câu dài hơn, không pinyin', 'Tanpa pinyin, kartu pengecoh lebih banyak, ada timer': 'Không pinyin, nhiều thẻ gây nhiễu, có giờ',
  'Susun kalimat': 'Xếp câu', 'Isi yang kosong': 'Điền chỗ trống', 'Dengar & susun': 'Nghe & xếp', 'Serang!': 'Tấn công!', 'Hapus satu': 'Hoàn tác', 'Ulang susun': 'Xếp lại',
  'Dengar lagi': 'Nghe lại', 'Pelan': 'Chậm', 'Benar!': 'Đúng rồi!', 'Belum tepat': 'Chưa đúng', 'Waktu habis!': 'Hết giờ!', 'Jawabanmu': 'Bạn trả lời', 'Lanjut': 'Tiếp',
  'Nyawa': 'Mạng', 'Skor': 'Điểm', 'Akurasi': 'Độ chính xác', 'Combo maks': 'Combo cao nhất', 'Rekor baru!': 'Kỷ lục mới!', 'Main lagi': 'Chơi lại', 'Kembali': 'Quay lại',
  'Kalimat yang perlu diulang': 'Câu cần ôn lại', 'Semua benar — sempurna!': 'Đúng hết — hoàn hảo!', 'MENANG!': 'CHIẾN THẮNG!', 'KALAH…': 'THUA…', 'Boss dikalahkan': 'Boss đã hạ',
  'Jeda': 'Tạm dừng', 'Keluar': 'Thoát', 'STAGE BERES!': 'QUA MÀN!', '+1 nyawa': '+1 mạng', 'BOSS FINAL': 'BOSS CUỐI', 'Fase 2 · Sang Raja murka!': 'Giai đoạn 2 · Ma vương nổi giận!',
  'Awan Cemberut': 'Mây Cau Có', 'Harimau Pasar Malam': 'Hổ Chợ Đêm', 'Naga Kuil': 'Rồng Đền', 'Raja Kalimat Kacau': 'Ma Vương Câu Rối',
  'Kastel Langit': 'Lâu đài trên mây', 'Pasar Malam': 'Chợ đêm', 'Kuil Senja': 'Đền hoàng hôn', 'Langit Bintang': 'Bầu trời sao',
  'Ketik angka untuk memilih kartu · Backspace hapus · Enter serang': 'Phím số chọn thẻ · Backspace hoàn tác · Enter tấn công',
  'Suara mati di Pengaturan — tugas Dengar memakai pinyin.': 'Âm thanh đang tắt — phần Nghe sẽ hiện pinyin.',
  'Musik': 'Nhạc', 'Tutup': 'Đóng', 'Pinyin': 'Pinyin', 'Arti': 'Nghĩa', 'Kamu mengalahkan {n} boss': 'Bạn đã hạ {n} boss', 'Pilih kata yang tepat': 'Chọn từ đúng',
  'Kalimat dari: {s}': 'Câu từ: {s}', 'semua lesson + tema': 'mọi bài + chủ đề',
  'Tebasan Bintang': 'Chém Sao', 'Ledakan Sakura': 'Bùng nổ Sakura', 'Meriam Pelangi': 'Pháo Cầu vồng', 'Hujan Meteor': 'Mưa Sao băng', 'Tinju Cakar Kucing': 'Cú đấm Móng mèo', 'Gelombang Bulan': 'Sóng Ánh trăng'
});

/* ---------- data & konstanta ---------- */
const KAL_OL = '#2a1638';
const KAL_HF = '"Noto Sans TC","PingFang TC","Hiragino Sans GB","Microsoft JhengHei",sans-serif';
const KAL_B = [
  { k: 'cloud', zh: '烏雲怪', py: 'wū yún guài', name: 'Awan Cemberut', place: 'Kastel Langit', hp: 120, c1: '#7fb2ff', c2: '#ff9fd0' },
  { k: 'tiger', zh: '夜市虎', py: 'yè shì hǔ', name: 'Harimau Pasar Malam', place: 'Pasar Malam', hp: 150, c1: '#ffb347', c2: '#ff4f7e' },
  { k: 'dragon', zh: '廟口龍', py: 'miào kǒu lóng', name: 'Naga Kuil', place: 'Kuil Senja', hp: 180, c1: '#2fd3b0', c2: '#ff8a5c' },
  { k: 'king', zh: '亂序魔王', py: 'luàn xù mó wáng', name: 'Raja Kalimat Kacau', place: 'Langit Bintang', hp: 260, c1: '#8b5cff', c2: '#ff3d7f', fin: 1 }
];
const KAL_D = {
  easy: { max: 5, min: 3, dis: 1, py: 1, hearts: 6, timer: 0, gapN: 3, len: [5, 6, 7, 8], mul: 1 },
  normal: { max: 6, min: 3, dis: 2, py: 0, hearts: 5, timer: 0, gapN: 4, len: [6, 7, 9, 10], mul: 1.15 },
  hard: { max: 7, min: 4, dis: 3, py: 0, hearts: 4, timer: 1, gapN: 4, len: [7, 9, 10, 12], mul: 1.3 }
};
const KAL_MODES = [['mix', 'Campur'], ['build', 'Susun'], ['gap', 'Isi'], ['listen', 'Dengar']];
const KAL_DIFFS = [['easy', 'Mudah', '3–5 kartu, pinyin tampil, tanpa timer'], ['normal', 'Normal', 'Kalimat lebih panjang, tanpa pinyin'], ['hard', 'Sulit', 'Tanpa pinyin, kartu pengecoh lebih banyak, ada timer']];
/* kata tata bahasa yang diuji di mode Isi + pengecoh yang jelas salah di posisi itu (arti kalimat ditampilkan sebagai petunjuk) */
const KAL_GAP = {
  '的': ['得', '了', '在'], '得': ['的', '了', '很'], '了': ['的', '嗎', '得'], '在': ['再', '的', '嗎'], '嗎': ['呢', '的', '了'], '很': ['的', '得', '在'],
  '也': ['都', '很', '在'], '都': ['也', '很', '的'], '不': ['沒', '很', '的'], '沒': ['不', '很', '也'], '呢': ['嗎', '吧', '的'], '吧': ['嗎', '呢', '的'],
  '過': ['了', '著', '得'], '有': ['是', '在', '很'], '是': ['有', '在', '很'], '給': ['在', '和', '的'], '還': ['也', '很', '的'], '太': ['的', '在', '得'], '再': ['在', '的', '很']
};
const KAL_TIMEW = /^((今|明|昨|每|後|前|天)天((早|晚)上|中午|下午|上午)?|(早|上|中|下|晚)(上|午)|(上|下|這)?(個)?(星期|禮拜)[一二三四五六日天]?|週末|(今|明|去|每)年|現在|最近|剛才|有時候|平常|以前|以後|(上|下|這)個?月|[一二三四五六七八九十兩]+點(半|鐘|[一二三四五六七八九十]+分)?|常常|經常|總是|偶爾)$/;
const KAL_SPELLS = [['星光斬', 'Tebasan Bintang'], ['櫻花爆', 'Ledakan Sakura'], ['彩虹砲', 'Meriam Pelangi'], ['流星雨', 'Hujan Meteor'], ['貓爪拳', 'Tinju Cakar Kucing'], ['月光波', 'Gelombang Bulan']];
const KAL_TC = ['#8a8aa0', '#ff5a7a', '#ffb02e', '#3cc87a', '#4c8dff', '#a38cff'];
let KAL = null;

/* ---------- ikon glass (garis putih) ---------- */
const KAL_IP = {
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  music: '<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
  mute: '<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/><path d="M3 3l18 18"/>',
  pause: '<path d="M8.5 5v14M15.5 5v14"/>', play: '<path d="M7 5l12 7-12 7z"/>',
  undo: '<path d="M9 14L4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/>', reset: '<path d="M4 12a8 8 0 1 0 2.3-5.6"/><path d="M4 4v4h4"/>',
  spk: '<path d="M4 10v4h4l5 4V6L8 10z"/><path d="M16.5 9a4 4 0 0 1 0 6M19 6.5a7.5 7.5 0 0 1 0 11"/>',
  slow: '<path d="M4.5 17a8 8 0 1 1 15 0"/><path d="M12 14l-4.5-3.5"/><circle cx="12" cy="14" r="1"/>',
  star: '<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4l-5.3 3 1.2-6-4.5-4.1 6-.7z"/>',
  build: '<rect x="3" y="4" width="7.5" height="7" rx="1.6"/><rect x="13.5" y="4" width="7.5" height="7" rx="1.6"/><rect x="8.2" y="13.5" width="7.5" height="7" rx="1.6"/>',
  gap: '<path d="M3 12h4M17 12h4"/><rect x="8.5" y="7" width="7" height="10" rx="1.6" stroke-dasharray="2.4 2.2"/>',
  ear: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><path d="M4 15h3v5H5.2A1.2 1.2 0 0 1 4 18.8zM20 15h-3v5h1.8a1.2 1.2 0 0 0 1.2-1.2z"/>',
  flame: '<path d="M12 3c1 4 5 5.2 5 10a5 5 0 0 1-10 0c0-2.6 1.4-4 2.4-5 .1 2 1 3 2.6 3.2C12 8.4 11 6 12 3z"/>',
  net: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-3.2 3.6-3.2 14.4 0 18M12 3c3.2 3.6 3.2 14.4 0 18"/>',
  wifioff: '<path d="M3 3l18 18"/><path d="M8.5 16.4a5 5 0 0 1 7 0M5 12.9a10 10 0 0 1 4.2-2.5M14.8 10.4A10 10 0 0 1 19 12.9M2 9.3a15 15 0 0 1 4.3-2.8M11 5.1A15 15 0 0 1 22 9.3"/><circle cx="12" cy="19.6" r=".6"/>',
  back: '<path d="M15 5l-7 7 7 7"/>', crown: '<path d="M4 8l4 4 4-7 4 7 4-4-2 11H6z"/>',
  swords: '<path d="M4 4l9.5 9.5M4 4h3.5M4 4v3.5M20 4l-9.5 9.5M20 4h-3.5M20 4v3.5"/><path d="M7 17l-2.5 2.5M17 17l2.5 2.5M8.5 14.5l1 1M15.5 14.5l-1 1"/><path d="M6 15.5l2.5 2.5M18 15.5L15.5 18"/>'
};
const kI = n => `<svg class="kal-i" viewBox="0 0 24 24" aria-hidden="true">${KAL_IP[n] || ''}</svg>`;
const kHeart = on => `<svg class="kal-ht ${on ? 'on' : ''}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-8-4.7-8-10.6A4.4 4.4 0 0 1 12 7.3a4.4 4.4 0 0 1 8 2.6c0 5.9-8 10.6-8 10.6z"/><path class="g" d="M7.2 8.4a2.6 2.6 0 0 1 2.4-1.2"/></svg>`;

/* ---------- materi kalimat ---------- */
function kalNorm(zh) { return String(zh || '').trim().replace(/\s+/g, '').replace(/,/g, '，').replace(/\?/g, '？').replace(/!/g, '！').replace(/\.$/, '。'); }
function kalSegRaw(h) {
  const X = lgIdx(); const has = f => (typeof vcIndex === 'function' ? vcIndex().has(f) : X.form.has(f)); const out = [];
  for (let i = 0; i < h.length;) { let L = Math.min(4, h.length - i); for (; L > 1; L--) if (has(h.substr(i, L))) break; out.push(h.substr(i, L)); i += L; }
  return out;
}
function kalPyOf(text) {
  const X = lgIdx(); const i = X.form.get(text);
  if (i !== undefined && X.syl[i] && X.syl[i].length === text.length) return X.syl[i].map(s => ({ y: s.y, tone: s.tone }));
  return [...text].map(c => { const r = X.cp.get(c); return r ? { y: r[0].y, tone: r[0].tone } : { y: '', tone: 5 }; });
}
/* pengecoh tidak boleh bersinonim dengan jawaban (mis. 讀書/看書) supaya hanya ada satu kalimat benar */
const KAL_STOP = new Set(['yang', 'untuk', 'dengan', 'sesuatu', 'something', 'orang', 'person', 'sangat', 'very', 'tidak', 'from', 'dari', 'kepada', 'about', 'tentang', 'have', 'punya', 'adalah', 'atau', 'kata', 'bentuk', 'measure', 'word', 'classifier']);
function kalMeanTok(i) { const w = W[i]; if (!w) return new Set(); const km = w.km && typeof w.km === 'object' ? [w.km.id, w.km.en] : []; const m = [].concat((w.m || []).slice(0, 2), km).filter(x => typeof x === 'string').join(' ').toLowerCase(); return new Set(m.split(/[^a-zà-ÿ]+/).filter(x => x.length >= 4 && !KAL_STOP.has(x))); }
function kalSyn(a, b) {
  if (!a || !b) return false; if (a.includes(b) || b.includes(a)) return true; const X = lgIdx(); const ia = X.form.get(a), ib = X.form.get(b);
  if (ia === undefined || ib === undefined) return false; const A = kalMeanTok(ia); for (const x of kalMeanTok(ib)) if (A.has(x)) return true; return false;
}
function kalSents(pool) {
  const seen = new Set(); const out = [];
  const add = (s, own) => {
    if (!s || !s.zh) return; const zh = kalNorm(s.zh);
    if (!/^[\u3400-\u9fff，。？！、：；]+$/.test(zh)) return; const h = lgHanOnly(zh);
    if (h.length < 4 || h.length > 16 || seen.has(h) || !s.tr) return; seen.add(h);
    out.push({ zh, py: s.py || '', tr: String(s.tr), ch: s.ch || null, h, own: own ? 1 : 0 });
  };
  (pool.sents || []).forEach(s => add(s, 1));
  const lesson = /^k:\d+$/.test(pool.src || '');
  if (!lesson || out.length < 16) {
    lgLessons().forEach(L => { try { lgSentsOf('k:' + L.n).forEach(s => add(s, 0)); } catch (e) {} });
    try { if (typeof TEMA !== 'undefined') TEMA.forEach(T => (T.sets || []).forEach(st => (st.words || []).forEach(w => w && w.ex && add({ zh: w.ex.zh, py: w.ex.py, tr: lgTr(w.ex) }, 0)))); } catch (e) {}
  }
  return out;
}
/* potongan kartu: pakai chunk bawaan / lgSeg, lalu kunci urutan yang bisa ditukar (kata waktu, X和Y, 跟+X) */
function kalChunks(s, max) {
  let ch = (s.ch ? s.ch.map(c => lgHanOnly(c)).filter(Boolean) : null);
  if (!ch || ch.join('') !== s.h) ch = lgSeg(s.zh);
  { const X = lgIdx(); const has = f => (typeof vcIndex === 'function' ? vcIndex().has(f) : X.form.has(f));
    for (let j = 0; j < ch.length - 1; j++) { const a = ch[j], b = ch[j + 1]; if (a.length === 2 && b.length === 1 && has(a.slice(-1) + b) && !KAL_GAP[b]) { ch.splice(j, 2, a[0], a[1] + b); } } }
  for (let j = 0; j < ch.length - 1; j++) for (const L of [3, 2]) { if (j + L <= ch.length && KAL_TIMEW.test(ch.slice(j, j + L).join(''))) { ch.splice(j, L, ch.slice(j, j + L).join('')); break; } }
  for (let j = 1; j < ch.length - 1; j++) if (ch[j] === '和') { ch.splice(j - 1, 3, ch[j - 1] + ch[j] + ch[j + 1]); j = 0; }
  for (let j = 0; j < ch.length - 1; j++) if (ch[j] === '跟') { ch.splice(j, 2, ch[j] + ch[j + 1]); }
  for (let j = 0; j < ch.length; j++) {
    if (KAL_TIMEW.test(ch[j])) { if (j < ch.length - 1) { ch.splice(j, 2, ch[j] + ch[j + 1]); j--; } else if (j > 0) { ch.splice(j - 1, 2, ch[j - 1] + ch[j]); } }
  }
  while (ch.length > max) { let bi = 0, bl = 1e9; for (let j = 0; j < ch.length - 1; j++) { const l = ch[j].length + ch[j + 1].length; if (l < bl) { bl = l; bi = j; } } ch.splice(bi, 2, ch[bi] + ch[bi + 1]); }
  return ch;
}
function kalSyl(s) { if (!s.sy) { try { s.sy = lgSylOf(s.zh, s.py); } catch (e) { s.sy = [...s.h].map(() => ({ y: '', tone: 5 })); } } return s.sy; }
function kalPyStr(s) { const p = String(s.py || '').trim(); return p || kalSyl(s).map(x => x.y).join(' '); }
function kalGapCands(s) {
  const toks = kalSegRaw(s.h); const out = []; let off = 0; const X = lgIdx();
  toks.forEach(tk => {
    if (KAL_GAP[tk]) out.push({ off, w: tk, g: 1 });
    else if (tk.length >= 1 && tk.length <= 3) { const i = X.form.get(tk); if (i !== undefined && lgOkW(i) && !/^[我你他她它您們]+$/.test(tk)) out.push({ off, w: tk, i, g: 0 }); }
    off += tk.length;
  });
  return out;
}
function kalPrep() {
  const K = KAL; const D = KAL_D[K.diff]; const idw = new Set((K.pool.ids || []).map(i => W[i] && W[i].w).filter(Boolean));
  K.cands = kalSents(K.pool).map(s => {
    s.chunks = kalChunks(s, D.max);
    s.bOK = s.chunks.length >= D.min && !/[，、：；]/.test(s.zh.replace(/[。？！]+$/, '')) && new Set(s.chunks).size >= 2;
    s.gaps = kalGapCands(s);
    const tk = kalSegRaw(s.h); s.wt = 1 + (s.own ? 3 : 0) + 2 * (tk.filter(x => idw.has(x)).length / Math.max(1, tk.length));
    return s;
  }).filter(s => s.bOK || s.gaps.length);
  K.used = new Set(); K.retry = [];
}
function kalPickSent(type) {
  const K = KAL; const D = KAL_D[K.diff]; const need = type === 'gap' ? (s => s.gaps.length) : (s => s.bOK);
  const due = K.retry.findIndex(r => r.due <= K.qn && need(r.s));
  if (due >= 0) { const r = K.retry.splice(due, 1)[0]; return r.s; }
  let list = K.cands.filter(s => need(s) && !K.used.has(s.h));
  if (!list.length) { K.used.clear(); list = K.cands.filter(need); }
  if (!list.length) return null;
  const tgt = D.len[Math.min(3, K.stage)] + (K.fphase === 2 ? 1 : 0);
  list.sort((a, b) => (Math.abs(a.h.length - tgt) - a.wt + Math.random() * 3.2) - (Math.abs(b.h.length - tgt) - b.wt + Math.random() * 3.2));
  const s = list[0]; K.used.add(s.h); return s;
}
function kalMakeTask() {
  const K = KAL; const D = KAL_D[K.diff]; const vok = kalVoice();
  let type = K.mode;
  if (type === 'mix') { const r = Math.random(); type = r < .44 ? 'build' : r < .74 ? 'gap' : 'listen'; if (K.fphase === 2 && Math.random() < .35) type = 'listen'; }
  if (type === 'listen' && !vok && K.mode === 'mix') type = 'build';
  let s = kalPickSent(type);
  if (!s && type === 'gap') { type = 'build'; s = kalPickSent(type); }
  if (!s && type !== 'gap') { type = 'gap'; s = kalPickSent('gap'); }
  if (!s) return null;
  const T = { type, s, t0: performance.now(), el: 0, lim: 0, left: 0 };
  if (type === 'gap') {
    const gs = s.gaps; const gram = gs.filter(g => g.g); const g = (gram.length && (Math.random() < .62 || gram.length === gs.length)) ? gram[Math.random() * gram.length | 0] : gs[Math.random() * gs.length | 0];
    let opts = [];
    if (g.g) opts = shuffle(KAL_GAP[g.w]).slice(0, D.gapN - 1);
    else { try { opts = lgDistract(g.i, D.gapN + 2, K.diff === 'hard' ? 3 : 1).map(k => lgTxt(W[k])).filter(x => LG_HAN.test(x) && x !== g.w && !s.h.includes(x) && !kalSyn(x, g.w)).slice(0, D.gapN - 1); } catch (e) { opts = []; } }
    if (opts.length < D.gapN - 1) { const pool = shuffle(Object.keys(KAL_GAP)).filter(x => x !== g.w && !opts.includes(x)); opts = opts.concat(pool.slice(0, D.gapN - 1 - opts.length)); }
    T.g = g; T.opts = shuffle([g.w].concat(opts)); T.n = 2 + (g.w.length > 1 ? 1 : 0);
    T.par = 3.5 + s.h.length * .15;
  } else {
    const ch = s.chunks; const sy = kalSyl(s); let off = 0;
    const cards = ch.map(c => { const py = sy.slice(off, off + c.length); off += c.length; return { t: c, py, real: 1 }; });
    const dis = []; const X = lgIdx(); const real = new Set(ch);
    const tryAdd = x => { if (x && LG_HAN.test(x) && !real.has(x) && !dis.includes(x) && x.length <= 4 && !ch.some(c => kalSyn(c, x))) dis.push(x); };
    shuffle(ch).forEach(c => {
      if (dis.length >= D.dis) return;
      if (KAL_GAP[c]) tryAdd(KAL_GAP[c][Math.random() * 2 | 0]);
      else { const i = X.form.get(c); if (i !== undefined && lgOkW(i)) { try { lgDistract(i, 2, K.diff === 'hard' ? 3 : 1).forEach(k => dis.length < D.dis && tryAdd(lgTxt(W[k]))); } catch (e) {} } }
    });
    let guard = 0; while (dis.length < D.dis && guard++ < 12) tryAdd(shuffle(Object.keys(KAL_GAP))[0]);
    dis.forEach(x => cards.push({ t: x, py: kalPyOf(x), real: 0 }));
    let order = shuffle(cards.map((c, j) => j)); let g2 = 0;
    while (g2++ < 8 && order.slice(0, ch.length).every((v, j) => v === j)) order = shuffle(order);
    T.cards = order.map(j => cards[j]); T.n = ch.length; T.placed = [];
    T.par = 3 + ch.length * 1.5 + (type === 'listen' ? 2 : 0);
  }
  const fin = K.stage === 3;
  if (D.timer) T.lim = type === 'gap' ? 9 : 6 + T.n * 2.2 + (type === 'listen' ? 2.5 : 0);
  else if (K.diff === 'normal' && fin && K.fphase === 2) T.lim = type === 'gap' ? 13 : 10 + T.n * 3;
  T.left = T.lim; K.qn++;
  return T;
}
function kalVoice() { try { return !!(S.settings.sound && typeof voiceOK === 'function' && voiceOK()); } catch (e) { return false; } }

/* ---------- audio: musik battle anime + sfx (Web Audio) ---------- */
const KM = { c: null, out: null, mus: null, sfx: null, timer: 0, step: 0, nt: 0, bpm: 132, theme: 'menu', duck: -1, mel: {} };
const kmF = m => 440 * Math.pow(2, (m - 69) / 12);
function kmInit() {
  if (!S.settings.sound) return null; let c; try { c = FX.ensure(); } catch (e) { c = null; } if (!c) return null;
  if (KM.c === c && KM.out) return c;
  KM.c = c; const comp = c.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 4; comp.attack.value = .004; comp.release.value = .2;
  KM.out = c.createGain(); KM.out.gain.value = .85; KM.mus = c.createGain(); KM.mus.gain.value = 0; KM.sfx = c.createGain(); KM.sfx.gain.value = .62;
  KM.mus.connect(KM.out); KM.sfx.connect(KM.out); KM.out.connect(comp); comp.connect(c.destination); KM.comp = comp; KM.duck = -1;
  if (!c._kalNoise) { const b = c.createBuffer(1, c.sampleRate, c.sampleRate); const d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; c._kalNoise = b; }
  return c;
}
function kmKill() {
  clearInterval(KM.timer); KM.timer = 0; const c = KM.c;
  if (c && KM.out) { const o = KM.out, cp = KM.comp; try { o.gain.setTargetAtTime(0, c.currentTime, .05); } catch (e) {} setTimeout(() => { try { o.disconnect(); cp.disconnect(); } catch (e) {} }, 400); }
  KM.out = KM.mus = KM.sfx = KM.comp = null; KM.c = null;
}
function kmOsc(type, f, t, d, v, dest, o = {}) {
  const c = KM.c; const os = c.createOscillator(); const g = c.createGain(); os.type = type; os.frequency.setValueAtTime(f, t);
  if (o.det) os.detune.value = o.det; if (o.to) os.frequency.exponentialRampToValueAtTime(o.to, t + (o.toT || d));
  const a = o.a || .008; g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + a);
  if (o.hold) g.gain.setValueAtTime(v, t + Math.max(a, d - (o.rel || .08))); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
  let last = os; if (o.lp) { const f2 = c.createBiquadFilter(); f2.type = 'lowpass'; f2.frequency.setValueAtTime(o.lp, t); if (o.lpTo) f2.frequency.exponentialRampToValueAtTime(o.lpTo, t + d * .8); f2.Q.value = o.q || .8; os.connect(f2); last = f2; }
  if (o.vib) { const l = c.createOscillator(); const lg = c.createGain(); l.frequency.value = 5.5; lg.gain.value = o.vib; l.connect(lg); lg.connect(os.frequency); l.start(t + .08); l.stop(t + d + .05); }
  last.connect(g); g.connect(dest || KM.mus); os.start(t); os.stop(t + d + .05);
}
function kmNoise(t, d, v, type, f, dest, q) {
  const c = KM.c; const s = c.createBufferSource(); s.buffer = c._kalNoise; const fl = c.createBiquadFilter(); fl.type = type; fl.frequency.value = f; fl.Q.value = q || .7;
  const g = c.createGain(); g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.0001, t + d); s.connect(fl); fl.connect(g); g.connect(dest || KM.mus); s.start(t, Math.random() * .5); s.stop(t + d + .02);
}
const kmKick = (t, v = .9, dest) => kmOsc('sine', 160, t, .28, v, dest, { to: 42, toT: .14 });
const kmSnare = (t, v = .45, dest) => { kmNoise(t, .18, v, 'bandpass', 1900, dest, .6); kmOsc('triangle', 210, t, .1, v * .55, dest, { to: 150 }); };
const kmHat = (t, v = .12, open) => kmNoise(t, open ? .18 : .045, v, 'highpass', 7600);
/* lagu: progresi 王道進行 (IV–V–iii–vi) untuk stage, i–VI–VII–V (harmonic minor) untuk boss final */
const KM_SONGS = {
  stage: { A: [[53, 57, 60, 64], [55, 59, 62, 65], [52, 55, 59, 62], [57, 60, 64, 67]], B: [[53, 57, 60, 64], [55, 59, 62, 67], [48, 52, 55, 59], [57, 60, 64, 69]], sc: [60, 62, 64, 67, 69, 72, 74, 76, 79, 81, 84], seed: 7 },
  final: { A: [[50, 53, 57, 62], [46, 50, 53, 58], [48, 52, 55, 60], [45, 49, 52, 57]], B: [[43, 46, 50, 55], [46, 50, 53, 58], [45, 49, 52, 57], [50, 53, 57, 62]], sc: [62, 64, 65, 67, 69, 70, 73, 74, 76, 77, 81], seed: 13 }
};
function kmMelody(song, sec) {
  const key = song.seed + sec; if (KM.mel[key]) return KM.mel[key];
  let r = key * 9301 + 49297; const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  const chords = sec === 'A' ? song.A : song.B; const bars = [];
  let pos = sec === 'A' ? 4 : 6;
  const rh = sec === 'A' ? [1, 0, 1, 1, 0, 1, 1, 0] : [1, 1, 0, 1, 1, 0, 1, 1];
  chords.forEach((ch, bi) => {
    const notes = [];
    for (let e = 0; e < 8; e++) {
      if (!rh[e] && !(bi === 3 && e === 7 && rnd() < .5)) { notes.push(null); continue; }
      const tones = ch.map(n => n % 12);
      let step = rnd() < .5 ? 1 : -1; if (rnd() < .3) step *= 2; pos = clamp(pos + step, 1, song.sc.length - 2);
      if (e % 4 === 0) { let best = pos, bd = 99; for (let k = 0; k < song.sc.length; k++) if (tones.includes(song.sc[k] % 12) && Math.abs(k - pos) < bd) { bd = Math.abs(k - pos); best = k; } pos = best; }
      notes.push(song.sc[pos]);
    }
    bars.push(notes);
  });
  return (KM.mel[key] = bars);
}
function kmStart(theme) {
  if (!kmInit()) return; KM.theme = theme;
  KM.bpm = theme === 'menu' ? 118 : theme === 'final2' ? 170 : theme === 'final' ? 158 : 134 + (KAL ? KAL.stage * 6 : 0);
  if (!KM.timer) { KM.step = 0; KM.nt = KM.c.currentTime + .1; KM.timer = setInterval(kmTick, 25); }
}
function kmStop() { clearInterval(KM.timer); KM.timer = 0; }
function kmTick() {
  const c = KM.c; if (!c || !KM.mus || !KAL) return;
  let want = (KAL.musOn && !KAL.paused) ? .3 : 0;
  try { if (want && window.speechSynthesis && speechSynthesis.speaking) want = .08; } catch (e) {}
  if (want !== KM.duck) { KM.duck = want; KM.mus.gain.setTargetAtTime(want, c.currentTime, .12); }
  if (KAL.paused) return;
  if (!KAL.musOn) { KM.nt = c.currentTime + .05; return; }
  if (KM.nt < c.currentTime - .25) KM.nt = c.currentTime + .05;
  while (KM.nt < c.currentTime + .14) { kmStep(KM.step, KM.nt); KM.nt += 60 / KM.bpm / 4; KM.step++; }
}
function kmStep(st, t) {
  const th = KM.theme; const fin = th === 'final' || th === 'final2'; const song = fin ? KM_SONGS.final : KM_SONGS.stage;
  const bar = (st >> 4) % 16; const s = st & 15; const sec = bar < 8 ? 'A' : 'B'; const bi = bar % 4; const vari = (bar & 4) !== 0;
  const ch = (sec === 'A' ? song.A : song.B)[bi]; const sp = 60 / KM.bpm / 4; const menu = th === 'menu';
  /* drum */
  if (!menu) {
    const fill = bi === 3 && vari && s >= 12;
    if (fin) { if (s % 4 === 0 || s === 14 || (th === 'final2' && s === 7)) kmKick(t, .85); }
    else if (s === 0 || s === 8 || (sec === 'B' && (s === 6 || s === 11)) || (s === 10 && vari)) kmKick(t, .85);
    if (fill) { if (s % 1 === 0) kmSnare(t, .18 + (s - 12) * .07); }
    else if (s === 4 || s === 12) kmSnare(t, .42);
    if (sec === 'B' || fin) kmHat(t, s % 2 ? .06 : .11, s === 14 && !fin); else if (s % 2 === 0) kmHat(t, .1, s === 14);
    if (bar === 0 && s === 0 || (bar === 8 && s === 0)) kmNoise(t, 1.2, .16, 'highpass', 5200);
  } else if (s % 4 === 2) kmHat(t, .05);
  /* bass: 8th pumping */
  if (s % 2 === 0) { const root = ch[0] - 24 + (s % 4 === 2 && sec === 'B' ? 12 : 0); const bt = fin ? 'sawtooth' : 'square'; if (!menu || s % 8 === 0) kmOsc(bt, kmF(root), t, sp * 1.8, menu ? .09 : .12, null, { lp: fin ? 900 : 700, lpTo: 260, q: 3 }); }
  /* string pad per bar */
  if (s === 0) ch.forEach((n, k) => { if (k > 2) return; kmOsc('sawtooth', kmF(n), t, sp * 16, .03, null, { a: .22, hold: 1, rel: .2, det: (k - 1) * 9, lp: 1700 }); kmOsc('sawtooth', kmF(n + 12), t, sp * 16, .015, null, { a: .3, hold: 1, rel: .2, det: 7 - k * 6, lp: 2400 }); });
  /* brass stabs (anime) */
  const stabs = fin ? [0, 3, 6, 10] : sec === 'B' ? [0, 3, 6, 10, 12] : [0, 6];
  if (!menu && stabs.includes(s)) ch.slice(0, 3).forEach((n, k) => kmOsc('sawtooth', kmF(n + 12), t, sp * 1.6, .045, null, { lp: 900, lpTo: 3200, q: 2, det: k * 4 - 4 }));
  /* arpeggio sparkle */
  if (sec === 'A' || menu || th === 'final2') { const ar = [0, 1, 2, 3, 2, 1]; const n = ch[ar[s % 6] % ch.length] + 24; kmOsc('square', kmF(n), t, sp * .9, menu ? .025 : .018, null, { lp: 3600 }); }
  /* melodi lead */
  if (s % 2 === 0) {
    const mel = kmMelody(song, sec); let n = mel[bi][s >> 1];
    if (vari && bi === 3 && n) n += (s >> 1) > 4 ? 2 : 0;
    if (n) {
      const v = menu ? .045 : .055;
      if (sec === 'A') kmOsc('square', kmF(n), t, sp * 1.7, v, null, { lp: 2600, vib: 4 });
      else { kmOsc('sawtooth', kmF(n), t, sp * 1.8, v, null, { lp: 1500, lpTo: 4200, vib: 5 }); kmOsc('triangle', kmF(n + 12), t, sp * 1.5, v * .5); }
    }
  }
}
function kfx(name, n = 0) {
  if (!KAL || !kmInit() || KM.c.state !== 'running') return; const c = KM.c; const t = c.currentTime + .01; const d = KM.sfx;
  const P = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24, 26, 28];
  switch (name) {
    case 'tap': kmOsc('triangle', 1250 + n * 70, t, .06, .12, d); kmOsc('sine', 2500 + n * 140, t, .04, .05, d); break;
    case 'place': kmOsc('sine', kmF(72 + P[Math.min(n, 10)]), t, .12, .18, d, { to: kmF(72 + P[Math.min(n, 10)]) * 1.02 }); kmOsc('triangle', kmF(84 + P[Math.min(n, 10)]), t, .06, .05, d); break;
    case 'undo': kmOsc('sine', 900, t, .1, .12, d, { to: 450 }); break;
    case 'ok': { const b = Math.min(n, 7); [0, 1, 2, 3].forEach((k, i) => kmOsc('square', kmF(72 + P[b + k]), t + i * .05, .16, .07, d, { lp: 4000 })); kmOsc('sine', kmF(84 + P[b + 3]), t + .2, .4, .12, d); break; }
    case 'cast': kmNoise(t, .55, .25, 'bandpass', 1200, d, 1.4); kmOsc('sawtooth', 300, t, .5, .07, d, { to: 1800, lp: 2400 }); break;
    case 'hit': kmOsc('sine', 130, t, .32, .7, d, { to: 40 }); kmNoise(t, .22, .5, 'lowpass', 3200, d); kmOsc('square', 880, t, .08, .06, d, { to: 220 }); break;
    case 'crit': kmOsc('sine', 110, t, .5, .8, d, { to: 32 }); kmNoise(t, .45, .55, 'lowpass', 4200, d); [0, 4, 7, 12].forEach((k, i) => kmOsc('triangle', kmF(84 + k), t + .05 + i * .04, .25, .06, d)); break;
    case 'bad': kmOsc('triangle', 330, t, .16, .16, d); kmOsc('triangle', 247, t + .1, .3, .14, d); break;
    case 'boss': kmOsc('sawtooth', 90, t, .45, .16, d, { to: 60, lp: 700 }); kmNoise(t + .05, .4, .22, 'bandpass', 500, d, 2); break;
    case 'hurt': kmOsc('sine', 220, t, .25, .45, d, { to: 70 }); kmNoise(t, .18, .3, 'lowpass', 1500, d); break;
    case 'tick': kmOsc('square', 1500, t, .05, .05, d); break;
    case 'count': kmOsc('square', n ? 1046 : 523, t, n ? .5 : .16, .09, d, { lp: 3000 }); break;
    case 'whoosh': kmNoise(t, .4, .3, 'bandpass', 900, d, 2.5); break;
    case 'heart': [0, 4, 7, 12].forEach((k, i) => kmOsc('sine', kmF(79 + k), t + i * .06, .3, .1, d)); break;
    case 'clear': [0, 4, 7, 12, 16, 19, 24].forEach((k, i) => kmOsc('square', kmF(67 + k), t + i * .07, .22, .06, d, { lp: 3500 })); kmOsc('sawtooth', kmF(55), t + .5, 1, .06, d, { lp: 1200, hold: 1 }); break;
    case 'roar': kmOsc('sawtooth', 70, t, 1.2, .22, d, { to: 45, lp: 600 }); kmNoise(t, 1.1, .3, 'bandpass', 380, d, 1.5); kmOsc('square', 55, t + .2, .9, .08, d, { lp: 400 }); break;
    case 'win': {
      const fan = [[67, 0], [67, .12], [67, .24], [72, .36], [76, .72], [74, .96], [76, 1.08], [79, 1.32]];
      fan.forEach(([m, o]) => { kmOsc('sawtooth', kmF(m), t + o, .3, .07, d, { lp: 1800, lpTo: 3800, q: 2 }); kmOsc('square', kmF(m + 12), t + o, .2, .025, d); });
      [72, 76, 79, 84].forEach(m => kmOsc('sawtooth', kmF(m), t + 1.32, 1.6, .045, d, { lp: 2600, hold: 1, rel: .5 })); kmKick(t + 1.32, .7, d); kmNoise(t + 1.32, 1.6, .2, 'highpass', 5000, d); break;
    }
    case 'lose': [72, 70, 67, 63].forEach((m, i) => kmOsc('triangle', kmF(m), t + i * .22, .4, .12, d)); kmOsc('sine', kmF(48), t + .9, 1.2, .1, d); break;
  }
}

/* ---------- gambar: helper ---------- */
function kOL(g, lw) { g.lineJoin = 'round'; g.lineCap = 'round'; g.lineWidth = lw; g.strokeStyle = KAL_OL; g.stroke(); }
function kFill(g, c, lw) { g.fillStyle = c; g.fill(); if (lw) kOL(g, lw); }
function kEl(g, x, y, rx, ry, rot = 0) { g.beginPath(); g.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2); }
function kEye(g, x, y, r, mood, iris, side, t) {
  if (mood === 'hurt') { g.beginPath(); const d = side < 0 ? 1 : -1; g.moveTo(x - r * .7 * d, y - r * .6); g.lineTo(x + r * .6 * d, y); g.lineTo(x - r * .7 * d, y + r * .6); kOL(g, r * .32); return; }
  if (mood === 'ko') { g.beginPath(); for (let a = 0; a < 12; a += .3) { const rr = r * a / 12; g.lineTo(x + Math.cos(a + t * 6) * rr, y + Math.sin(a + t * 6) * rr); } kOL(g, r * .18); return; }
  kEl(g, x, y, r * .82, r); kFill(g, '#fff', r * .22);
  kEl(g, x + side * r * .08, y + r * .1, r * .6, r * .78); g.fillStyle = iris; g.fill();
  kEl(g, x + side * r * .08, y + r * .2, r * .34, r * .46); g.fillStyle = KAL_OL; g.fill();
  kEl(g, x + side * r * .08 - r * .22, y - r * .3, r * .22, r * .26); g.fillStyle = '#fff'; g.fill();
  kEl(g, x + side * r * .08 + r * .22, y + r * .42, r * .1, r * .1); g.fill();
  g.beginPath(); g.ellipse(x, y, r * .86, r * 1.04, 0, Math.PI * 1.08, Math.PI * 1.92); kOL(g, r * .3);
}
function kBrow(g, x, y, r, side, ang) { g.beginPath(); g.moveTo(x - side * r * 1.1, y - r * 1.5 - ang * r * .5); g.lineTo(x + side * r * .5, y - r * 1.15 + ang * r * .2); kOL(g, r * .34); }
function kBlush(g, x, y, r) { g.save(); g.globalAlpha = .55; kEl(g, x, y, r * 1.1, r * .55); g.fillStyle = '#ff7fa8'; g.fill(); g.restore(); }
function kMouth(g, x, y, r, mood) {
  if (mood === 'atk' || mood === 'roar') { kEl(g, x, y + r * .2, r * .8, r * .7); kFill(g, '#7a1838', r * .2); kEl(g, x, y + r * .55, r * .45, r * .22); g.fillStyle = '#ff7a9a'; g.fill(); return; }
  if (mood === 'hurt' || mood === 'ko') { g.beginPath(); g.moveTo(x - r * .7, y + r * .2); for (let k = 1; k <= 4; k++) g.lineTo(x - r * .7 + k * r * .35, y + (k % 2 ? -1 : 1) * r * .2); kOL(g, r * .2); return; }
  g.beginPath(); g.moveTo(x - r * .55, y + r * .15); g.quadraticCurveTo(x, y - r * .35, x + r * .55, y + r * .15); kOL(g, r * .22);
}
function kStar(g, x, y, r, rot) { g.beginPath(); for (let k = 0; k < 10; k++) { const a = rot + k * Math.PI / 5 - Math.PI / 2; const rr = k % 2 ? r * .45 : r; g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } g.closePath(); }
function kSpark(g, x, y, r) { g.beginPath(); g.moveTo(x, y - r); g.quadraticCurveTo(x, y, x + r, y); g.quadraticCurveTo(x, y, x, y + r); g.quadraticCurveTo(x, y, x - r, y); g.quadraticCurveTo(x, y, x, y - r); g.fill(); }

/* ---------- boss (kotak lokal ±100, kaki di y≈95) ---------- */
function kalDrawBoss(g, k, mood, t, ph) {
  g.save();
  if (k === 'cloud') {
    const C = [[-60, 14, 40], [-24, -16, 52], [28, -22, 50], [64, 10, 40], [30, 36, 42], [-22, 38, 42]];
    const bob = Math.sin(t * 3) * 2;
    if (mood === 'atk' || Math.sin(t * 1.7) > .6) { g.save(); g.translate(Math.sin(t * 30) * 2, 0); g.beginPath(); g.moveTo(-4, 70); g.lineTo(-22, 104); g.lineTo(-6, 102); g.lineTo(-16, 132); g.lineTo(14, 94); g.lineTo(-2, 96); g.lineTo(10, 70); g.closePath(); kFill(g, '#ffd84a', 4); g.restore(); }
    g.fillStyle = KAL_OL; C.forEach(([x, y, r]) => { kEl(g, x, y + bob, r + 5, r + 5); g.fill(); });
    g.fillStyle = mood === 'atk' ? '#d8d2f5' : '#eeeaff'; C.forEach(([x, y, r]) => { kEl(g, x, y + bob, r, r); g.fill(); });
    g.save(); g.beginPath(); C.forEach(([x, y, r]) => { g.moveTo(x + r, y + bob); g.arc(x, y + bob, r, 0, Math.PI * 2); }); g.clip();
    kEl(g, 14, 86 + bob, 130, 48); g.fillStyle = '#b4abe6'; g.fill(); kEl(g, -40, -40 + bob, 34, 18, -.4); g.fillStyle = 'rgba(255,255,255,.9)'; g.fill(); g.restore();
    const ex = 26, ey = 6 + bob;
    kEye(g, -ex, ey, 15, mood, '#5b7bff', -1, t); kEye(g, ex, ey, 15, mood, '#5b7bff', 1, t);
    if (mood !== 'hurt' && mood !== 'ko') { kBrow(g, -ex, ey, 15, -1, 1); kBrow(g, ex, ey, 15, 1, 1); }
    kBlush(g, -46, 26 + bob, 11); kBlush(g, 46, 26 + bob, 11); kMouth(g, 0, 30 + bob, 14, mood === 'atk' ? 'atk' : mood);
    g.fillStyle = '#7ec8ff'; g.strokeStyle = KAL_OL; for (let i = 0; i < 4; i++) { const yy = 80 + ((t * 70 + i * 23) % 50); const xx = -50 + i * 32; g.beginPath(); g.moveTo(xx, yy - 8); g.quadraticCurveTo(xx + 6, yy + 2, xx, yy + 4); g.quadraticCurveTo(xx - 6, yy + 2, xx, yy - 8); g.fill(); g.lineWidth = 2; g.stroke(); }
  } else if (k === 'tiger') {
    const bob = Math.sin(t * 4) * 2.5; const sw = Math.sin(t * 2.5) * 10;
    g.beginPath(); g.moveTo(40, 75); g.quadraticCurveTo(95, 70, 88 + sw * .3, 20 + sw); kOL(g, 20); g.strokeStyle = '#ffa53a'; g.lineWidth = 12; g.stroke();
    kEl(g, 0, 58 + bob * .5, 48, 38); kFill(g, '#ffa53a', 5); kEl(g, 0, 66 + bob * .5, 28, 24); g.fillStyle = '#fff6ea'; g.fill();
    g.save(); g.translate(50, 60 + bob * .5); g.rotate(.42 + (mood === 'atk' ? .35 : 0));
    g.beginPath(); g.moveTo(0, 30); g.lineTo(0, -88); kOL(g, 7); g.strokeStyle = '#c98a4b'; g.lineWidth = 3.5; g.stroke();
    for (let i = 0; i < 4; i++) { kEl(g, 0, -80 + i * 19, 10, 10); kFill(g, '#e8193c', 3.5); kEl(g, -3, -84 + i * 19, 3.4, 2.4); g.fillStyle = 'rgba(255,255,255,.85)'; g.fill(); }
    g.restore();
    kEl(g, -30, 86, 15, 11); kFill(g, '#ffa53a', 4); kEl(g, 30, 86, 15, 11); kFill(g, '#ffa53a', 4); kEl(g, 40, 56 + bob * .5, 13, 12); kFill(g, '#ffa53a', 4);
    const hy = -14 + bob;
    [-1, 1].forEach(sd => { kEl(g, sd * 52, hy - 46, 21, 21); kFill(g, '#ffa53a', 5); kEl(g, sd * 52, hy - 44, 11, 11); g.fillStyle = '#ffb2c4'; g.fill(); });
    kEl(g, 0, hy, 76, 60); kFill(g, '#ffa53a', 5.5);
    g.save(); kEl(g, 0, hy, 76, 60); g.clip(); kEl(g, 10, hy + 62, 92, 40); g.fillStyle = '#ec7f1e'; g.fill();
    g.fillStyle = '#4a2412'; [-1, 1].forEach(sd => { for (let i = 0; i < 3; i++) { g.beginPath(); g.moveTo(sd * 78, hy - 8 + i * 13); g.lineTo(sd * 52, hy - 4 + i * 11); g.lineTo(sd * 78, hy + 2 + i * 13); g.fill(); } });
    kEl(g, -30, hy - 40, 20, 10, -.3); g.fillStyle = 'rgba(255,255,255,.35)'; g.fill(); g.restore();
    g.beginPath(); g.moveTo(-14, hy - 46); g.lineTo(14, hy - 46); g.moveTo(-11, hy - 37); g.lineTo(11, hy - 37); g.moveTo(-15, hy - 27); g.lineTo(15, hy - 27); g.moveTo(0, hy - 46); g.lineTo(0, hy - 27); g.lineWidth = 4.5; g.lineCap = 'round'; g.strokeStyle = '#4a2412'; g.stroke();
    kEl(g, 0, hy + 22, 34, 22); kFill(g, '#fff6ea', 3.5);
    kEye(g, -30, hy - 4, 15, mood, '#3ccf6e', -1, t); kEye(g, 30, hy - 4, 15, mood, '#3ccf6e', 1, t);
    if (mood === 'atk' || mood === 'idle') { kBrow(g, -30, hy - 4, 14, -1, mood === 'atk' ? 1.2 : .5); kBrow(g, 30, hy - 4, 14, 1, mood === 'atk' ? 1.2 : .5); }
    g.beginPath(); g.moveTo(-7, hy + 10); g.quadraticCurveTo(0, hy + 7, 7, hy + 10); g.quadraticCurveTo(0, hy + 20, -7, hy + 10); kFill(g, '#ff6f91', 2.5);
    if (mood === 'atk') { kMouth(g, 0, hy + 26, 12, 'atk'); }
    else if (mood === 'hurt' || mood === 'ko') kMouth(g, 0, hy + 28, 10, mood);
    else { g.beginPath(); g.moveTo(-12, hy + 24); g.quadraticCurveTo(-6, hy + 31, 0, hy + 22); g.quadraticCurveTo(6, hy + 31, 12, hy + 24); kOL(g, 3); g.beginPath(); g.moveTo(-8, hy + 27); g.lineTo(-5, hy + 35); g.lineTo(-2, hy + 27); g.moveTo(8, hy + 27); g.lineTo(5, hy + 35); g.lineTo(2, hy + 27); g.fillStyle = '#fff'; g.fill(); kOL(g, 2); }
    kBlush(g, -50, hy + 16, 10); kBlush(g, 50, hy + 16, 10);
    g.strokeStyle = KAL_OL; g.lineWidth = 2; [-1, 1].forEach(sd => { for (let i = 0; i < 2; i++) { g.beginPath(); g.moveTo(sd * 30, hy + 20 + i * 6); g.lineTo(sd * 54, hy + 16 + i * 10); g.stroke(); } });
  } else if (k === 'dragon') {
    const w = Math.sin(t * 2.2) * 8;
    [[-50, 92, 30], [-14, 98, 34], [26, 94, 30], [60, 98, 24]].forEach(([x, y, r]) => { kEl(g, x, y, r + 4, r * .55 + 4); g.fillStyle = KAL_OL; g.fill(); });
    [[-50, 92, 30], [-14, 98, 34], [26, 94, 30], [60, 98, 24]].forEach(([x, y, r]) => { kEl(g, x, y, r, r * .55); g.fillStyle = '#fff3f8'; g.fill(); });
    const body = () => { g.beginPath(); g.moveTo(-4, -6); g.bezierCurveTo(70, 0 + w, 90, 50, 40, 70 - w * .5); g.bezierCurveTo(0, 88, -60, 70, -80, 40 + w); g.quadraticCurveTo(-96, 18, -84, 0 - w); };
    body(); kOL(g, 42); body(); g.strokeStyle = '#2fbf9f'; g.lineWidth = 32; g.stroke();
    body(); g.strokeStyle = '#ffe9a8'; g.lineWidth = 11; g.setLineDash([7, 6]); g.stroke(); g.setLineDash([]);
    g.save(); g.translate(-84, -2 - w); g.beginPath(); g.moveTo(0, 0); g.lineTo(-16, -22); g.lineTo(6, -8); g.lineTo(-4, -28); g.lineTo(14, -4); kFill(g, '#ff6a3d', 3.5); g.restore();
    const hx = -10, hy = -30;
    g.fillStyle = '#ff6a3d'; g.beginPath(); for (let i = 0; i <= 8; i++) { const a = -.3 + i * .4; const rr = i % 2 ? 50 : 76 + Math.sin(t * 8 + i) * 4; g.lineTo(hx + 18 + Math.cos(a) * rr, hy + Math.sin(a) * rr * .9); } g.closePath(); kFill(g, '#ff6a3d', 4.5);
    [-1, 1].forEach(sd => { g.beginPath(); g.moveTo(hx + sd * 22, hy - 36); g.quadraticCurveTo(hx + sd * 30, hy - 70, hx + sd * 46, hy - 82); g.moveTo(hx + sd * 31, hy - 60); g.lineTo(hx + sd * 50, hy - 62); kOL(g, 12); g.strokeStyle = '#ffd25a'; g.lineWidth = 6; g.beginPath(); g.moveTo(hx + sd * 22, hy - 36); g.quadraticCurveTo(hx + sd * 30, hy - 70, hx + sd * 46, hy - 82); g.moveTo(hx + sd * 31, hy - 60); g.lineTo(hx + sd * 50, hy - 62); g.stroke(); });
    kEl(g, hx, hy, 52, 44); kFill(g, '#2fbf9f', 5);
    g.save(); kEl(g, hx, hy, 52, 44); g.clip(); kEl(g, hx + 10, hy + 46, 60, 26); g.fillStyle = '#1f9a80'; g.fill(); kEl(g, hx - 18, hy - 26, 18, 8, -.3); g.fillStyle = 'rgba(255,255,255,.4)'; g.fill(); g.restore();
    kEl(g, hx - 40, hy + 14, 30, 22); kFill(g, '#7ae6c9', 4.5);
    kEl(g, hx - 52, hy + 8, 3.5, 2.5); g.fillStyle = KAL_OL; g.fill(); kEl(g, hx - 38, hy + 6, 3.5, 2.5); g.fill();
    if (mood === 'atk') { kEl(g, hx - 42, hy + 28, 16, 9); kFill(g, '#7a1838', 3); } else { g.beginPath(); g.moveTo(hx - 64, hy + 22); g.quadraticCurveTo(hx - 44, hy + 32, hx - 22, hy + 22); kOL(g, 3); }
    g.strokeStyle = '#ffd25a'; g.lineWidth = 3; [-1, 1].forEach(sd => { g.beginPath(); g.moveTo(hx - 58, hy + 10); g.bezierCurveTo(hx - 90, hy + 10 + sd * 10, hx - 80 + Math.sin(t * 3 + sd) * 10, hy + 46 + sd * 14, hx - 110, hy + 40 + sd * 22 + Math.sin(t * 3) * 6); g.stroke(); });
    kEye(g, hx - 4, hy - 8, 12, mood, '#ff5a3c', -1, t); kEye(g, hx + 26, hy - 6, 12, mood, '#ff5a3c', 1, t);
    if (mood === 'atk' || mood === 'idle') { kBrow(g, hx - 4, hy - 8, 11, -1, .8); kBrow(g, hx + 26, hy - 6, 11, 1, .8); }
    kBlush(g, hx + 30, hy + 16, 8);
    const pr = 13 + Math.sin(t * 4) * 1.5; const pg = g.createRadialGradient(56, 30, 2, 56, 30, pr); pg.addColorStop(0, '#fff'); pg.addColorStop(.6, '#9ff3ff'); pg.addColorStop(1, '#3fb6ff');
    kEl(g, 56, 30, pr, pr); g.fillStyle = pg; g.fill(); kOL(g, 3.5); g.fillStyle = '#fff'; kSpark(g, 52, 25, 5);
  } else if (k === 'king') {
    const p2 = ph === 2; const bob = Math.sin(t * 2) * 3;
    if (p2) { g.save(); g.globalCompositeOperation = 'lighter'; for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2 + t; const rr = 92 + Math.sin(t * 7 + i * 2) * 10; g.beginPath(); g.moveTo(Math.cos(a - .2) * 60, Math.sin(a - .2) * 60 + 10); g.quadraticCurveTo(Math.cos(a) * (rr + 20), Math.sin(a) * (rr + 20) + 10, Math.cos(a + .25) * 60, Math.sin(a + .25) * 60 + 10); g.fillStyle = `rgba(255,${60 + i * 8},60,.35)`; g.fill(); } g.restore(); }
    const cape = () => { g.beginPath(); g.moveTo(-34, -16 + bob); g.quadraticCurveTo(-84, 40, -92, 96); for (let i = 0; i <= 6; i++) g.lineTo(-92 + i * 30.6, 96 + (i % 2 ? -12 : 0) + (p2 ? Math.sin(t * 9 + i) * 4 : 0)); g.quadraticCurveTo(84, 40, 34, -16 + bob); g.closePath(); };
    cape(); kFill(g, p2 ? '#4a1030' : '#3b1f6e', 5.5);
    g.save(); cape(); g.clip(); g.beginPath(); g.moveTo(-10, 0); g.lineTo(-30, 100); g.lineTo(30, 100); g.lineTo(10, 0); g.fillStyle = p2 ? '#ff3d5c' : '#d22d5a'; g.fill(); kEl(g, 60, 70, 50, 60); g.fillStyle = 'rgba(0,0,0,.25)'; g.fill(); g.restore();
    g.save(); g.translate(-62, 40 + bob); g.rotate(-.25); g.beginPath(); g.moveTo(0, 50); g.lineTo(0, -60); kOL(g, 9); g.strokeStyle = '#ffd25a'; g.lineWidth = 4.5; g.stroke();
    const og = g.createRadialGradient(0, -68, 2, 0, -68, 16); og.addColorStop(0, '#fff'); og.addColorStop(.5, p2 ? '#ff6a8a' : '#c48bff'); og.addColorStop(1, p2 ? '#c4002a' : '#6a2bd8'); kEl(g, 0, -68, 15, 15); g.fillStyle = og; g.fill(); kOL(g, 4); g.restore();
    const hy = -36 + bob;
    [-1, 1].forEach(sd => { g.beginPath(); g.moveTo(sd * 26, hy - 30); g.quadraticCurveTo(sd * 52, hy - 50, sd * 58, hy - 88); g.quadraticCurveTo(sd * 36, hy - 60, sd * 12, hy - 40); g.closePath(); kFill(g, '#fff2d6', 4.5); });
    kEl(g, 0, hy, 50, 44); kFill(g, p2 ? '#ffe1ea' : '#efe3ff', 5);
    g.beginPath(); g.moveTo(-52, hy + 4); g.quadraticCurveTo(-52, hy - 52, 0, hy - 50); g.quadraticCurveTo(52, hy - 52, 52, hy + 4); g.quadraticCurveTo(30, hy - 20, 12, hy - 22); g.lineTo(0, hy - 8); g.lineTo(-12, hy - 22); g.quadraticCurveTo(-30, hy - 20, -52, hy + 4); kFill(g, p2 ? '#5a1838' : '#2e1858', 4.5);
    g.beginPath(); g.moveTo(-26, hy - 44); g.lineTo(-30, hy - 70); g.lineTo(-14, hy - 56); g.lineTo(0, hy - 78); g.lineTo(14, hy - 56); g.lineTo(30, hy - 70); g.lineTo(26, hy - 44); g.closePath(); kFill(g, '#ffd25a', 4);
    kEl(g, 0, hy - 56, 5, 5); g.fillStyle = p2 ? '#ff2a4a' : '#ff5ab0'; g.fill();
    if (p2) { g.beginPath(); g.moveTo(8, hy - 70); g.lineTo(4, hy - 58); g.lineTo(10, hy - 52); kOL(g, 2.5); }
    if (mood === 'hurt' || mood === 'ko') { kEye(g, -20, hy + 2, 11, mood, '#ff2a4a', -1, t); kEye(g, 20, hy + 2, 11, mood, '#ff2a4a', 1, t); }
    else {
      [-1, 1].forEach(sd => {
        const ex = sd * 20, ey = hy + 2; g.beginPath(); g.moveTo(ex - 13, ey - sd * 0 - 4); g.quadraticCurveTo(ex, ey - 12, ex + 13, ey - 4 + (sd > 0 ? -5 : 5)); g.quadraticCurveTo(ex, ey + 12, ex - 13, ey - 4); kFill(g, '#fff', 3.5);
        g.save(); if (p2) { g.shadowColor = '#ff2a4a'; g.shadowBlur = 12; } kEl(g, ex + sd * 2, ey, 5.5, p2 ? 7.5 : 6.5); g.fillStyle = '#ff2a4a'; g.fill(); g.restore();
        kEl(g, ex + sd * 2 - 2, ey - 2.5, 1.8, 1.8); g.fillStyle = '#fff'; g.fill();
      });
    }
    if (mood === 'atk') kMouth(g, 0, hy + 22, 12, 'atk');
    else if (mood === 'hurt' || mood === 'ko') kMouth(g, 0, hy + 24, 10, mood);
    else { g.beginPath(); g.moveTo(-16, hy + 18); g.quadraticCurveTo(0, hy + 32, 16, hy + 16); kOL(g, 3.5); g.beginPath(); g.moveTo(6, hy + 23); g.lineTo(9, hy + 31); g.lineTo(12, hy + 21); g.fillStyle = '#fff'; g.fill(); kOL(g, 2); }
    kBlush(g, -32, hy + 16, 8); kBlush(g, 32, hy + 16, 8);
    g.font = `900 22px ${KAL_HF}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round';
    ['亂', '序', '句', '字', '錯'].forEach((ch, i) => { const a = t * (p2 ? 1.4 : .8) + i / 5 * Math.PI * 2; const x = Math.cos(a) * 112, y = Math.sin(a) * 34 - 6; if (Math.sin(a) < -.2) g.globalAlpha = .55; g.lineWidth = 5; g.strokeStyle = p2 ? '#7a0a22' : '#3b1f6e'; g.strokeText(ch, x, y); g.fillStyle = p2 ? '#ffc2cf' : '#e9d8ff'; g.fillText(ch, x, y); g.globalAlpha = 1; });
  }
  g.restore();
}

/* ---------- latar per stage (statis di-cache, animasi digambar per frame) ---------- */
function kalBgStatic(g, w, h, k) {
  const gr = (a, b, c) => { const x = g.createLinearGradient(0, 0, 0, h); x.addColorStop(0, a); x.addColorStop(.6, b); x.addColorStop(1, c); return x; };
  const r = Math.min(w, h * 1.6);
  if (k === 0) {
    g.fillStyle = gr('#6fa6ff', '#b9c8ff', '#ffd1e6'); g.fillRect(0, 0, w, h);
    const sg = g.createRadialGradient(w * .18, h * .22, 4, w * .18, h * .22, r * .45); sg.addColorStop(0, 'rgba(255,255,240,.95)'); sg.addColorStop(.25, 'rgba(255,240,220,.5)'); sg.addColorStop(1, 'rgba(255,240,220,0)'); g.fillStyle = sg; g.fillRect(0, 0, w, h);
    const isl = (x, y, s, castle) => {
      g.save(); g.translate(x, y); g.scale(s, s);
      g.beginPath(); g.moveTo(-60, 0); g.quadraticCurveTo(-20, 70, 0, 80); g.quadraticCurveTo(20, 70, 60, 0); g.closePath(); kFill(g, '#9a87d8', 3); g.beginPath(); g.moveTo(-60, 0); g.lineTo(60, 0); g.quadraticCurveTo(0, -12, -60, 0); kEl(g, 0, 0, 62, 10); kFill(g, '#8fe3a8', 3);
      if (castle) {
        [[-34, 46, 16], [34, 46, 16], [0, 70, 22]].forEach(([cx, ch, cw]) => { g.beginPath(); g.rect(cx - cw / 2, -ch, cw, ch); kFill(g, '#fff6fb', 3); g.beginPath(); g.moveTo(cx - cw / 2 - 5, -ch); g.lineTo(cx, -ch - cw * 1.4); g.lineTo(cx + cw / 2 + 5, -ch); g.closePath(); kFill(g, '#ff7fae', 3); g.beginPath(); g.rect(cx - 3, -ch + 10, 6, 9); g.fillStyle = '#7b6cd9'; g.fill(); });
        g.beginPath(); g.rect(-30, -30, 60, 30); kFill(g, '#fff6fb', 3); g.beginPath(); g.arc(0, 0, 9, Math.PI, 0); g.fillStyle = '#7b6cd9'; g.fill();
        g.beginPath(); g.moveTo(0, -70 - 31); g.lineTo(0, -122); g.lineTo(16, -116); g.lineTo(0, -110); kFill(g, '#ffd25a', 2);
      }
      g.restore();
    };
    isl(w * .5, h * .42, Math.max(.5, h / 520), 1); isl(w * .12, h * .55, Math.max(.3, h / 900), 0); isl(w * .9, h * .3, Math.max(.3, h / 1000), 0);
    g.fillStyle = '#fff'; for (let i = 0; i < Math.ceil(w / 60) + 2; i++) { const x = i * 60 - 20; kEl(g, x, h * .94 + (i % 2) * 8, 52, 34); g.fill(); }
    g.fillStyle = 'rgba(214,200,255,.6)'; for (let i = 0; i < Math.ceil(w / 80) + 2; i++) { kEl(g, i * 80 + 20, h * 1.02, 60, 30); g.fill(); }
  } else if (k === 1) {
    g.fillStyle = gr('#1b1240', '#4a1f5e', '#b4467a'); g.fillRect(0, 0, w, h);
    g.fillStyle = 'rgba(255,255,255,.8)'; for (let i = 0; i < 50; i++) { const x = (i * 97.3) % w, y = (i * 53.7) % (h * .45); g.fillRect(x, y, 1.6, 1.6); }
    for (let i = 0; i < Math.ceil(w / 50); i++) { const bw = 40 + (i * 37) % 30, bh = h * (.28 + ((i * 53) % 30) / 100); const x = i * 50 - 10; g.fillStyle = '#2a1650'; g.fillRect(x, h * .72 - bh, bw, bh + 4); g.fillStyle = 'rgba(255,214,120,.75)'; for (let yy = h * .72 - bh + 10; yy < h * .68; yy += 14) for (let xx = x + 6; xx < x + bw - 8; xx += 12) if ((xx * 7 + yy * 3) % 5 < 2) g.fillRect(xx, yy, 5, 6); }
    const sign = (x, y, txt, col) => { g.save(); g.font = `900 ${Math.round(h * .07)}px ${KAL_HF}`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.shadowColor = col; g.shadowBlur = 18; g.fillStyle = col; const ww = g.measureText(txt).width + 18; g.lineWidth = 3; g.strokeStyle = col; g.strokeRect(x - ww / 2, y - h * .05, ww, h * .1); g.fillStyle = '#fff'; g.fillText(txt, x, y + 1); g.restore(); };
    sign(w * .22, h * .3, '夜市', '#ff4fa3'); sign(w * .78, h * .22, '小吃', '#4ff3ff'); if (w > 600) sign(w * .52, h * .16, '珍珠奶茶', '#ffd84a');
    const sh = h * .78; g.fillStyle = '#3a1c4a'; g.fillRect(0, sh, w, h - sh);
    for (let i = 0; i < Math.ceil(w / 120) + 1; i++) {
      const x = i * 120 - 30; g.beginPath(); g.rect(x + 6, sh - h * .1, 100, h * .1 + 2); kFill(g, '#5b2a5e', 3);
      for (let j = 0; j < 5; j++) { g.beginPath(); g.moveTo(x + j * 22, sh - h * .1); g.lineTo(x + j * 22 + 22, sh - h * .1); g.lineTo(x + j * 22 + 11, sh - h * .1 + 16); g.closePath(); g.fillStyle = j % 2 ? '#fff4f0' : '#ff4f6e'; g.fill(); g.lineWidth = 2.5; g.strokeStyle = KAL_OL; g.stroke(); }
    }
    g.fillStyle = 'rgba(255,120,180,.18)'; g.fillRect(0, sh, w, 6);
  } else if (k === 2) {
    g.fillStyle = gr('#5a3c9a', '#ff7f91', '#ffc27a'); g.fillRect(0, 0, w, h);
    const sg = g.createRadialGradient(w * .5, h * .62, 4, w * .5, h * .62, r * .5); sg.addColorStop(0, 'rgba(255,240,190,.95)'); sg.addColorStop(.3, 'rgba(255,200,150,.45)'); sg.addColorStop(1, 'rgba(255,190,150,0)'); g.fillStyle = sg; g.fillRect(0, 0, w, h);
    const mt = (y, col, amp, n) => { g.beginPath(); g.moveTo(0, h); for (let i = 0; i <= n; i++) { const x = i / n * w; g.lineTo(x, y - (i % 2 ? amp : amp * .3) * (0.7 + ((i * 37) % 10) / 20)); } g.lineTo(w, h); g.closePath(); g.fillStyle = col; g.fill(); };
    mt(h * .62, '#9a5aa8', h * .2, 7); mt(h * .72, '#7a3f8e', h * .14, 11);
    const tx = w * .5, ty = h * .74, s = Math.max(.6, h / 420);
    g.save(); g.translate(tx, ty); g.scale(s, s);
    g.beginPath(); g.rect(-70, -60, 140, 60); kFill(g, '#c9374b', 3);
    for (let i = -3; i <= 3; i++) { g.beginPath(); g.rect(i * 20 - 4, -58, 8, 58); g.fillStyle = '#e8495f'; g.fill(); }
    g.beginPath(); g.rect(-18, -40, 36, 40); g.fillStyle = '#4a1630'; g.fill();
    const roof = (y, wd, hh) => { g.beginPath(); g.moveTo(-wd - 22, y + 4); g.quadraticCurveTo(-wd, y - 2, -wd + 20, y - hh * .6); g.lineTo(wd - 20, y - hh * .6); g.quadraticCurveTo(wd, y - 2, wd + 22, y + 4); g.quadraticCurveTo(0, y - 6, -wd - 22, y + 4); g.closePath(); kFill(g, '#3a6b5e', 3); g.beginPath(); g.moveTo(-wd + 20, y - hh * .6); g.lineTo(wd - 20, y - hh * .6); kOL(g, 6); g.strokeStyle = '#ffd25a'; g.lineWidth = 3; g.stroke(); };
    roof(-60, 90, 34); g.beginPath(); g.rect(-46, -104, 92, 28); kFill(g, '#c9374b', 3); roof(-102, 62, 30);
    g.save(); g.beginPath(); g.arc(0, -126, 8, 0, 7); kFill(g, '#ffd25a', 2.5); g.restore();
    g.restore();
    g.fillStyle = '#6a2f6e'; g.fillRect(0, h * .86, w, h * .14); g.fillStyle = 'rgba(255,220,180,.25)'; g.fillRect(0, h * .86, w, 3);
  } else {
    const rg = g.createRadialGradient(w * .62, h * .45, 10, w * .62, h * .45, r * .8); rg.addColorStop(0, '#4a1d7a'); rg.addColorStop(.5, '#22104a'); rg.addColorStop(1, '#0b0620'); g.fillStyle = rg; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 90; i++) { const x = (i * 131.7) % w, y = (i * 71.3) % h; g.fillStyle = `rgba(255,255,255,${.3 + (i % 5) / 8})`; g.fillRect(x, y, i % 7 ? 1.5 : 2.6, i % 7 ? 1.5 : 2.6); }
    g.fillStyle = 'rgba(160,110,255,.12)'; kEl(g, w * .3, h * .3, w * .5, h * .12, -.3); g.fill(); g.fillStyle = 'rgba(255,90,170,.1)'; kEl(g, w * .7, h * .7, w * .5, h * .1, .2); g.fill();
    g.save(); g.translate(w / 2, h * .9); g.scale(1, .22); const pg = g.createRadialGradient(0, 0, 10, 0, 0, w * .6); pg.addColorStop(0, 'rgba(190,140,255,.55)'); pg.addColorStop(1, 'rgba(190,140,255,0)'); g.fillStyle = pg; kEl(g, 0, 0, w * .6, w * .6); g.fill(); g.restore();
  }
}
function kalBgAnim(g, w, h, k, t, ph) {
  if (k === 0) {
    g.fillStyle = 'rgba(255,255,255,.92)';
    for (let i = 0; i < 4; i++) { const x = ((t * (10 + i * 5) + i * 300) % (w + 240)) - 120; const y = h * (.12 + i * .1); g.save(); g.globalAlpha = .85; [[0, 0, 26], [24, -10, 30], [50, 0, 24]].forEach(([dx, dy, rr]) => { kEl(g, x + dx, y + dy, rr, rr * .8); g.fill(); }); g.restore(); }
    g.fillStyle = '#fff'; for (let i = 0; i < 10; i++) { const a = Math.sin(t * 2 + i * 1.7); if (a < .2) continue; g.globalAlpha = a; kSpark(g, (i * 173) % w, (i * 97) % (h * .7), 3 + a * 4); } g.globalAlpha = 1;
  } else if (k === 1) {
    const n = Math.ceil(w / 70) + 1;
    g.strokeStyle = 'rgba(40,20,60,.9)'; g.lineWidth = 2; g.beginPath(); g.moveTo(0, h * .1); for (let i = 0; i <= n; i++) g.quadraticCurveTo(i * 70 - 35, h * .18, i * 70, h * .1); g.stroke();
    for (let i = 0; i < n; i++) {
      const x = i * 70 + 35, y = h * .16 + Math.sin(t * 2 + i) * 2; const sw = Math.sin(t * 1.6 + i * .8) * .12;
      g.save(); g.translate(x, y); g.rotate(sw);
      const gl = g.createRadialGradient(0, 12, 2, 0, 12, 34); gl.addColorStop(0, 'rgba(255,120,80,.55)'); gl.addColorStop(1, 'rgba(255,120,80,0)'); g.fillStyle = gl; kEl(g, 0, 12, 34, 34); g.fill();
      kEl(g, 0, 12, 11, 13); kFill(g, i % 3 === 1 ? '#ffb02e' : '#ff3d4f', 2.5); g.beginPath(); g.moveTo(-6, -1); g.lineTo(6, -1); g.moveTo(-6, 25); g.lineTo(6, 25); kOL(g, 3.5); g.restore();
    }
    g.fillStyle = 'rgba(255,255,255,.18)'; for (let i = 0; i < 6; i++) { const ph2 = (t * .4 + i * .17) % 1; kEl(g, (i * 211) % w + Math.sin(t + i) * 8, h * .72 - ph2 * h * .3, 10 + ph2 * 16, 8 + ph2 * 12); g.globalAlpha = (1 - ph2) * .6; g.fill(); } g.globalAlpha = 1;
  } else if (k === 2) {
    for (let i = 0; i < 16; i++) { const x = ((i * 97 + t * 30) % (w + 40)) - 20 + Math.sin(t * 1.5 + i) * 18; const y = ((i * 61 + t * (26 + i % 4 * 6)) % (h + 30)) - 15; g.save(); g.translate(x, y); g.rotate(t * 2 + i); kEl(g, 0, 0, 5, 3); g.fillStyle = i % 3 ? '#ffc0d8' : '#fff0f6'; g.fill(); g.restore(); }
    for (let i = 0; i < 3; i++) { const x = w * (.15 + i * .35), y = h * (.3 + Math.sin(t * .8 + i) * .04); g.save(); g.translate(x, y); const gl = g.createRadialGradient(0, 0, 2, 0, 0, 26); gl.addColorStop(0, 'rgba(255,200,120,.6)'); gl.addColorStop(1, 'rgba(255,200,120,0)'); g.fillStyle = gl; kEl(g, 0, 0, 26, 26); g.fill(); g.beginPath(); g.rect(-7, -9, 14, 18); kFill(g, '#ffcf6a', 2); g.restore(); }
  } else {
    const cx = w * .66, cy = h * .48; const red = ph === 2;
    g.save(); g.translate(cx, cy); g.globalCompositeOperation = 'lighter';
    [[h * .48, .25, 24], [h * .36, -.4, 16]].forEach(([rr, sp, n], j) => {
      g.save(); g.rotate(t * sp); g.strokeStyle = red ? 'rgba(255,80,110,.35)' : 'rgba(170,120,255,.35)'; g.lineWidth = 2; g.beginPath(); g.arc(0, 0, rr, 0, 7); g.stroke(); g.beginPath(); g.arc(0, 0, rr * .9, 0, 7); g.stroke();
      for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; g.beginPath(); g.moveTo(Math.cos(a) * rr * .9, Math.sin(a) * rr * .9); g.lineTo(Math.cos(a + Math.PI * 2 / n * 3) * rr * .9, Math.sin(a + Math.PI * 2 / n * 3) * rr * .9); if (j) g.stroke(); }
      g.restore();
    });
    g.restore();
    for (let i = 0; i < 7; i++) { const x = (i * 157) % w, y = h * .2 + ((i * 89) % (h * .6)) + Math.sin(t * 1.3 + i) * 10; g.save(); g.translate(x, y); g.rotate(Math.sin(t + i) * .4); g.beginPath(); g.moveTo(0, -14); g.lineTo(7, 0); g.lineTo(0, 14); g.lineTo(-7, 0); g.closePath(); kFill(g, red ? 'rgba(255,120,150,.8)' : 'rgba(180,150,255,.8)', 2); g.restore(); }
    if (red) { g.fillStyle = `rgba(255,30,60,${.08 + Math.sin(t * 3) * .04})`; g.fillRect(0, 0, w, h); }
  }
}

/* ---------- layout & loop ---------- */
function kalResize() {
  const K = KAL; if (!K) return; const st = $('#kalstage'); if (!st) return; const r = st.getBoundingClientRect();
  const dpr = Math.min(2, window.devicePixelRatio || 1); K.W = Math.max(10, r.width); K.H = Math.max(10, r.height); K.dpr = dpr;
  [K.cv, K.fx].forEach(c => { c.width = Math.round(K.W * dpr); c.height = Math.round(K.H * dpr); c.style.width = K.W + 'px'; c.style.height = K.H + 'px'; });
  K.bgc = null;
  const hs = clamp(K.H * .44, 74, 210); const half = Math.min(K.W * .34, 360);
  K.hx = Math.max(hs * .56, K.W / 2 - half + hs * .1); K.hs = hs; K.hy = K.H * .9 - hs / 2;
  K.bs = Math.min(K.H * .66, K.W * .44, 330) / 200; K.bx = K.W / 2 + Math.min(K.W * .24, 300); K.by = K.H * .9 - 98 * K.bs;
  if (K.ol) { K.bs = hs / 200; K.bx = K.W - K.hx; K.by = K.hy + 10 * K.bs; olPlace(); }
  const he = $('#kalhero'); if (he) { he.style.width = hs + 'px'; he.style.height = hs + 'px'; he.style.left = (K.hx - hs / 2) + 'px'; he.style.top = (K.hy - hs / 2) + 'px'; }
}
function kalBG() {
  const K = KAL; if (K.bgc && K.bgk === K.stage) return K.bgc;
  const c = document.createElement('canvas'); c.width = K.cv.width; c.height = K.cv.height; const g = c.getContext('2d'); g.scale(K.dpr, K.dpr);
  kalBgStatic(g, K.W, K.H, K.stage); K.bgc = c; K.bgk = K.stage; return c;
}
function kalFrame(now) {
  const K = KAL; if (!K) return; K.raf = requestAnimationFrame(kalFrame);
  const dt = Math.min(.05, (now - (K.last || now)) / 1000); K.last = now; if (K.paused) return;
  K.time += dt; const t = K.time;
  const T = K.task;
  if (T && K.state === 'play') {
    T.el += dt;
    if (T.lim) { const prev = T.left; T.left -= dt; if (Math.ceil(prev) !== Math.ceil(T.left) && T.left <= 3 && T.left > 0) kfx('tick'); if (T.left <= 0) { T.left = 0; kalSubmit(null, 'time'); } }
    const bar = $('#kalbar'); if (bar) { const f = T.lim ? T.left / T.lim : clamp(1 - Math.max(0, T.el - T.par * .4) / (T.par * 1.2), 0, 1); bar.style.transform = `scaleX(${f.toFixed(3)})`; bar.parentNode.classList.toggle('low', !!T.lim && T.left < 3.2); }
  }
  const g = K.cv.getContext('2d'); const f = K.fx.getContext('2d'); const W = K.W, H = K.H;
  g.setTransform(K.dpr, 0, 0, K.dpr, 0, 0); f.setTransform(K.dpr, 0, 0, K.dpr, 0, 0); f.clearRect(0, 0, W, H);
  K.shake = Math.max(0, K.shake - dt * 30); const sx = (Math.random() - .5) * K.shake, sy = (Math.random() - .5) * K.shake;
  g.save(); g.translate(sx, sy); g.drawImage(kalBG(), -6, -6, W + 12, H + 12); kalBgAnim(g, W, H, K.stage, t, K.fphase);
  /* platform glow */
  g.save(); g.globalAlpha = .5; g.fillStyle = 'rgba(30,10,50,.45)'; kEl(g, K.hx, K.hy + K.hs * .48, K.hs * .4, K.hs * .08); g.fill(); if (K.ol) kEl(g, K.bx, K.hy + K.hs * .48, K.hs * .4, K.hs * .08); else kEl(g, K.bx, K.H * .9 + 2, 80 * K.bs, 14 * K.bs); g.fill(); g.restore();
  /* boss */
  const B = K.boss;
  if (B && B.vis) {
    B.hurt = Math.max(0, B.hurt - dt); B.atk = Math.max(0, B.atk - dt);
    let mood = B.ko ? 'ko' : B.hurt > 0 ? 'hurt' : B.atk > 0 ? 'atk' : 'idle';
    const lunge = B.atk > 0 ? Math.sin((1 - B.atk / .6) * Math.PI) * -36 : 0; const kb = B.hurt > 0 ? Math.sin(B.hurt * 40) * 6 + B.hurt * 30 : 0;
    const sq = 1 + Math.sin(t * 3.2) * .025; let sc = K.bs * (B.intro < 1 ? (B.intro = Math.min(1, B.intro + dt * 2.5)) : 1);
    if (B.ko) { B.kot += dt; sc *= Math.max(0, 1 - B.kot * .55); }
    g.save(); g.translate(K.bx + lunge + kb, K.by + (B.ko ? -B.kot * 30 : 0)); if (B.ko) g.rotate(B.kot * 5);
    g.scale(sc * (2 - sq), sc * sq);
    if (B.hurt > .12 && 'filter' in g) g.filter = 'brightness(1.9) saturate(.6)';
    kalDrawBoss(g, B.k, mood, t, K.fphase); g.filter = 'none'; g.restore();
  }
  g.restore();
  /* fx */
  f.save(); f.translate(sx, sy);
  K.fxs = K.fxs.filter(e => { e.t += dt; return kalDrawFx(f, e) !== false && e.t < e.d; });
  f.globalCompositeOperation = 'lighter';
  K.parts = K.parts.filter(p => { p.t += dt; if (p.t >= p.d) return false; p.vy += (p.gr || 0) * dt; p.x += p.vx * dt; p.y += p.vy * dt; const a = 1 - p.t / p.d; f.globalAlpha = a; f.fillStyle = p.c; if (p.s === 'spark') kSpark(f, p.x, p.y, p.r * (0.6 + a * .6)); else if (p.s === 'star') { kStar(f, p.x, p.y, p.r, p.t * 6); f.fill(); } else { kEl(f, p.x, p.y, p.r * a + .5, p.r * a + .5); f.fill(); } return true; });
  f.globalAlpha = 1; f.globalCompositeOperation = 'source-over';
  K.txts = K.txts.filter(x => {
    x.t += dt; if (x.t > x.d) return false; const k = x.t / x.d; const pop = k < .15 ? .6 + k / .15 * .7 : 1.3 - Math.min(.3, (k - .15) * 1.2);
    f.save(); f.translate(x.x, x.y - k * 46); f.scale(pop, pop); f.globalAlpha = k > .75 ? (1 - k) / .25 : 1; f.font = `900 ${x.sz}px ${KAL_HF}`; f.textAlign = 'center'; f.textBaseline = 'middle'; f.lineJoin = 'round';
    f.lineWidth = x.sz * .22; f.strokeStyle = KAL_OL; f.strokeText(x.s, 0, 0); const gg = f.createLinearGradient(0, -x.sz / 2, 0, x.sz / 2); gg.addColorStop(0, '#fff'); gg.addColorStop(.5, x.c1 || '#ffe14d'); gg.addColorStop(1, x.c2 || '#ff8a3d'); f.fillStyle = gg; f.fillText(x.s, 0, 0); f.restore(); return true;
  });
  f.restore();
  if (K.flash > 0) { K.flash = Math.max(0, K.flash - dt * 2.5); f.fillStyle = K.flashC || '#fff'; f.globalAlpha = Math.min(.7, K.flash); f.fillRect(0, 0, W, H); f.globalAlpha = 1; }
  if (K.hpLag > K.bossHp) { K.hpLag = Math.max(K.bossHp, K.hpLag - dt * K.bossMax * .5); const lg = $('#kalhplag'); if (lg) lg.style.transform = `scaleX(${(K.hpLag / K.bossMax).toFixed(3)})`; }
}
function kalPart(x, y, n, o = {}) {
  const K = KAL; if (K.parts.length > 170) K.parts.splice(0, K.parts.length - 120);
  for (let i = 0; i < n; i++) { const a = (o.a0 || 0) + Math.random() * (o.spread || Math.PI * 2); const sp = (o.sp || 160) * (.4 + Math.random() * .8); K.parts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - (o.up || 0), gr: o.gr || 0, t: 0, d: (o.d || .7) * (.6 + Math.random() * .6), r: (o.r || 5) * (.6 + Math.random() * .8), c: o.cols ? o.cols[i % o.cols.length] : (o.c || '#fff'), s: o.s || (i % 3 ? 'dot' : 'spark') }); }
}
function kalDrawFx(f, e) {
  const K = KAL; const k = Math.min(1, e.t / e.d);
  if (e.k === 'ring') {
    const r = e.r * (k < .2 ? k / .2 : 1); f.save(); f.translate(e.x, e.y); f.scale(1, .42); f.globalAlpha = k > .7 ? (1 - k) / .3 : 1; f.globalCompositeOperation = 'lighter';
    f.rotate(e.t * 2.4); f.strokeStyle = e.c; f.lineWidth = 3; f.beginPath(); f.arc(0, 0, r, 0, 7); f.stroke(); f.beginPath(); f.arc(0, 0, r * .78, 0, 7); f.stroke();
    f.beginPath(); for (let i = 0; i <= 5; i++) { const a = i * Math.PI * 4 / 5; f.lineTo(Math.cos(a) * r * .78, Math.sin(a) * r * .78); } f.stroke();
    f.font = `900 ${Math.round(r * .2)}px ${KAL_HF}`; f.fillStyle = e.c; f.textAlign = 'center'; f.textBaseline = 'middle';
    const chs = e.chs || []; chs.forEach((ch, i) => { const a = i / chs.length * Math.PI * 2; f.save(); f.translate(Math.cos(a) * r * .89, Math.sin(a) * r * .89); f.rotate(a + Math.PI / 2); f.fillText(ch, 0, 0); f.restore(); });
    f.restore();
  } else if (e.k === 'beam') {
    if (k < .15) return; const p = Math.min(1, (k - .15) / .35); const x1 = e.x0 + (e.x1 - e.x0) * p, y1 = e.y0 + (e.y1 - e.y0) * p; const wd = (k < .5 ? 1 : (1 - k) / .5) * e.w;
    f.save(); f.globalCompositeOperation = 'lighter'; f.lineCap = 'round';
    [[wd * 2.2, e.c, .35], [wd, e.c, .9], [wd * .45, '#fff', 1]].forEach(([lw, c, a]) => { f.globalAlpha = a; f.strokeStyle = c; f.lineWidth = Math.max(1, lw); f.beginPath(); f.moveTo(e.x0, e.y0); f.lineTo(x1, y1); f.stroke(); });
    f.restore(); if (p < 1 && Math.random() < .7) kalPart(x1, y1, 1, { c: e.c, sp: 60, d: .4, r: 4 });
  } else if (e.k === 'star') {
    const p = Math.min(1, k / .55); const x = e.x0 + (e.x1 - e.x0) * p, y = e.y0 + (e.y1 - e.y0) * p - Math.sin(p * Math.PI) * e.arc;
    if (p < 1) { f.save(); f.translate(x, y); f.rotate(e.t * 12); kStar(f, 0, 0, e.r, 0); f.fillStyle = e.c; f.fill(); f.lineWidth = 3; f.strokeStyle = KAL_OL; f.stroke(); f.restore(); if (Math.random() < .8) kalPart(x, y, 1, { c: e.c, sp: 40, d: .45, r: 4, s: 'spark' }); }
  } else if (e.k === 'bolt') {
    if (k > .5) return; f.save(); f.globalCompositeOperation = 'lighter'; const n = 9; const pts = []; for (let i = 0; i <= n; i++) { const q = i / n; pts.push([e.x0 + (e.x1 - e.x0) * q + (i && i < n ? (Math.random() - .5) * 40 : 0), e.y0 + (e.y1 - e.y0) * q + (i && i < n ? (Math.random() - .5) * 20 : 0)]); }
    [[12, 'rgba(255,230,90,.45)'], [5, '#ffe14d'], [2, '#fff']].forEach(([lw, c]) => { f.strokeStyle = c; f.lineWidth = lw; f.beginPath(); pts.forEach(([x, y], i) => i ? f.lineTo(x, y) : f.moveTo(x, y)); f.stroke(); }); f.restore();
  } else if (e.k === 'claw') {
    f.save(); f.translate(e.x, e.y); f.globalCompositeOperation = 'lighter'; const p = Math.min(1, k / .4); const a = k > .5 ? (1 - k) / .5 : 1;
    for (let i = -1; i <= 1; i++) { f.globalAlpha = a; f.strokeStyle = '#ffd0a0'; f.lineWidth = 9 - Math.abs(i) * 2; f.lineCap = 'round'; f.beginPath(); f.moveTo(-50 + i * 22, -55); f.lineTo(-50 + i * 22 + 100 * p, -55 + 110 * p); f.stroke(); f.strokeStyle = '#fff'; f.lineWidth = 3; f.stroke(); }
    f.restore();
  } else if (e.k === 'orb') {
    const p = Math.min(1, k / .6); const x = e.x0 + (e.x1 - e.x0) * p, y = e.y0 + (e.y1 - e.y0) * p + Math.sin(p * Math.PI) * e.arc;
    if (p < 1) { const og = f.createRadialGradient(x, y, 1, x, y, e.r); og.addColorStop(0, '#fff'); og.addColorStop(.4, e.c); og.addColorStop(1, 'rgba(0,0,0,0)'); f.fillStyle = og; kEl(f, x, y, e.r, e.r); f.fill(); if (Math.random() < .7) kalPart(x, y, 1, { c: e.c, sp: 30, d: .4, r: 5 }); }
  } else if (e.k === 'wave') {
    f.save(); f.globalCompositeOperation = 'lighter'; f.globalAlpha = 1 - k; f.strokeStyle = e.c; f.lineWidth = 8 * (1 - k) + 1; f.beginPath(); f.arc(e.x, e.y, e.r * (.2 + k), 0, 7); f.stroke(); f.restore();
  }
}

/* ---------- shell ---------- */
function kalShell() {
  const old = $('#arkal'); if (old) old.remove();
  const el = document.createElement('div'); el.id = 'arkal'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', t('Duel Kalimat'));
  el.innerHTML = `<div class="kal-top">
      <button class="kal-gb" data-k="close" aria-label="${t('Tutup')}">${kI('x')}</button>
      <div class="kal-boss" id="kalbossbar"></div>
      <button class="kal-gb" data-k="mus" id="kalmus" aria-label="${t('Musik')}">${kI('music')}</button>
      <button class="kal-gb" data-k="pause" aria-label="${t('Jeda')}">${kI('pause')}</button></div>
    <div class="kal-stage" id="kalstage"><canvas id="kalcv"></canvas><div class="kal-hero" id="kalhero"></div><canvas id="kalfx"></canvas>
      <div class="kal-hud"><div class="kal-hearts" id="kalhearts"></div><div class="kal-sc"><b id="kalscore">0</b><span id="kalcombo"></span></div></div>
      <div class="kal-cut" id="kalcut"></div></div>
    <div class="kal-panel" id="kalpanel"></div>
    <div class="kal-scr" id="kalscr"></div>`;
  document.body.appendChild(el); return el;
}
function kalHeroHTML() {
  return `<svg class="kal-wing" viewBox="0 0 160 160" aria-hidden="true"><g stroke="${KAL_OL}" stroke-width="3" stroke-linejoin="round">
    <path d="M44 104 C10 86 6 54 18 46 C30 66 40 70 52 86 Z" fill="rgba(255,255,255,.85)"/><path d="M46 112 C18 112 10 96 14 88 C28 100 40 100 52 102 Z" fill="rgba(255,214,236,.9)"/>
    <path d="M116 104 C150 86 154 54 142 46 C130 66 120 70 108 86 Z" fill="rgba(255,255,255,.85)"/><path d="M114 112 C142 112 150 96 146 88 C132 100 120 100 108 102 Z" fill="rgba(255,214,236,.9)"/></g></svg>
    <div class="kal-mas">${mascot('happy', 160)}</div>
    <svg class="kal-wand" viewBox="0 0 160 160" aria-hidden="true"><g stroke="${KAL_OL}" stroke-linejoin="round" stroke-linecap="round">
    <path d="M118 134 L142 70" stroke-width="9"/><path d="M118 134 L142 70" stroke="#fff6fb" stroke-width="4"/>
    <path d="M130 104 q-12 -2 -16 6 q10 4 16 -6 q4 10 14 8 q-2 -10 -14 -8z" fill="#ff7fae" stroke-width="2.5"/>
    <path d="M144 44 l5.5 12 13 1.4 -9.8 8.8 2.8 12.8 -11.5 -6.6 -11.5 6.6 2.8 -12.8 -9.8 -8.8 13 -1.4z" fill="#ffd84a" stroke-width="3.5"/>
    <circle cx="140" cy="57" r="2.6" fill="#fff" stroke="none"/></g></svg>`;
}
function kalSetHero(expr) { const m = $('#kalhero .kal-mas'); if (m && KAL.hexpr !== expr) { KAL.hexpr = expr; m.innerHTML = mascot(expr, 160); } }
function kalHeroAnim(cls, ms) { const h = $('#kalhero'); if (!h) return; h.classList.remove('atk', 'hurt', 'cast', 'win'); void h.offsetWidth; h.classList.add(cls); kalLater(() => h.classList.remove(cls), ms || 600); }
function kalLater(fn, ms) { const K = KAL; if (!K) return; const run = K.run; const id = setTimeout(() => { K.tm.delete(id); if (KAL === K && K.run === run) fn(); }, ms); K.tm.add(id); }
function kalClearTimers() { if (!KAL) return; KAL.tm.forEach(id => clearTimeout(id)); KAL.tm.clear(); }

/* ---------- HUD ---------- */
function kalBossBar() {
  const K = KAL; const el = $('#kalbossbar'); if (!el) return; const B = KAL_B[K.stage];
  const f = K.bossMax ? K.bossHp / K.bossMax : 1;
  el.innerHTML = `<div class="kal-bn"><span class="hz">${B.zh}</span><b>${esc(t(B.name))}</b>${B.fin ? `<i class="kal-fin">${K.fphase === 2 ? 'PHASE 2' : 'FINAL'}</i>` : `<i>${K.stage + 1}/4</i>`}</div>
    <div class="kal-hp" style="--b1:${B.c1};--b2:${B.c2}"><i class="lag" id="kalhplag" style="transform:scaleX(${(K.hpLag / (K.bossMax || 1)).toFixed(3)})"></i><i class="fill" id="kalhpfill" style="transform:scaleX(${f.toFixed(3)})"></i>${B.fin ? '<s></s>' : ''}</div>`;
}
function kalHP() { const K = KAL; const fl = $('#kalhpfill'); if (fl) fl.style.transform = `scaleX(${(K.bossHp / K.bossMax).toFixed(3)})`; }
function kalHearts(pop) {
  const K = KAL; const el = $('#kalhearts'); if (!el) return; let h = '';
  for (let i = 0; i < K.maxHearts; i++) h += kHeart(i < K.hearts).replace('class="kal-ht', `class="kal-ht${pop === i ? ' pop' : ''}`);
  el.innerHTML = h;
}
function kalScore() {
  const K = KAL; const s = $('#kalscore'); if (s) s.textContent = fmtN(K.score);
  const c = $('#kalcombo'); if (c) { c.innerHTML = K.combo >= 2 ? `${kI('flame')}<b>${K.combo}</b> COMBO` : ''; c.classList.remove('bump'); void c.offsetWidth; if (K.combo >= 2) c.classList.add('bump'); }
}
function kalMusBtn() { const b = $('#kalmus'); if (b) { b.innerHTML = kI(KAL.musOn ? 'music' : 'mute'); b.classList.toggle('off', !KAL.musOn); b.disabled = !S.settings.sound; } }

/* ---------- panel tugas ---------- */
function kalPyHTML(sy) { return (sy || []).map(s => `<span style="color:${KAL_TC[s.tone] || KAL_TC[0]}">${esc(s.y)}</span>`).join(' '); }
function kalPanel() {
  const K = KAL; const T = K.task; const el = $('#kalpanel'); if (!el || !T) return; const D = KAL_D[K.diff]; const s = T.s;
  const vok = kalVoice(); const lis = T.type === 'listen';
  const tag = T.type === 'gap' ? `${kI('gap')} ${t('Isi yang kosong')}` : lis ? `${kI('ear')} ${t('Dengar & susun')}` : `${kI('build')} ${t('Susun kalimat')}`;
  const aud = vok ? `<button class="kal-gb kal-say" data-k="say" aria-label="${t('Dengar lagi')}">${kI('spk')}</button><button class="kal-gb" data-k="slow" aria-label="${t('Pelan')}">${kI('slow')}</button>` : '';
  let mean = lis ? (vok ? `<button class="kal-lis" data-k="say">${kI('spk')}<span>${t('Dengar lagi')}</span></button>` : `<div class="kal-mean kal-lpy">${kalPyHTML(kalSyl(s))}</div>`) : `<div class="kal-mean">${esc(s.tr)}</div>`;
  let body = '';
  if (T.type === 'gap') {
    const g = T.g; const pre = s.h.slice(0, g.off), post = s.h.slice(g.off + g.w.length); const end = (s.zh.match(/[。？！]+$/) || [''])[0];
    const py = D.py ? `<div class="kal-spy">${kalPyHTML(kalSyl(s).slice(0, g.off))} <b>＿</b> ${kalPyHTML(kalSyl(s).slice(g.off + g.w.length))}</div>` : '';
    body = `<div class="kal-sent hz">${esc(pre)}<span class="kal-blank">${'？'.repeat(Math.max(1, g.w.length))}</span>${esc(post)}${esc(end)}</div>${py}
      <div class="kal-opts n${T.opts.length}">${T.opts.map((o, j) => `<button class="kal-card kal-opt" data-k="opt" data-v="${j}"><i class="n">${j + 1}</i>${D.py ? `<small>${kalPyHTML(kalPyOf(o))}</small>` : ''}<b class="hz">${esc(o)}</b></button>`).join('')}</div>`;
  } else {
    const sl = []; for (let i = 0; i < T.n; i++) { const j = T.placed[i]; sl.push(j === undefined ? `<span class="kal-slot ${i === T.placed.length ? 'cur' : ''}"></span>` : `<button class="kal-card kal-in ${i === T.placed.length - 1 ? 'new' : ''}" data-k="unplace" data-v="${i}">${D.py ? `<small>${kalPyHTML(T.cards[j].py)}</small>` : ''}<b class="hz">${esc(T.cards[j].t)}</b></button>`); }
    const full = T.placed.length === T.n;
    body = `<div class="kal-slots">${sl.join('')}<span class="kal-end hz">${esc((s.zh.match(/[。？！]+$/) || ['。'])[0])}</span></div>
      <div class="kal-cards">${T.cards.map((c, j) => `<button class="kal-card ${T.placed.includes(j) ? 'used' : ''}" data-k="pick" data-v="${j}" ${T.placed.includes(j) ? 'disabled' : ''}><i class="n">${j + 1}</i>${D.py ? `<small>${kalPyHTML(c.py)}</small>` : ''}<b class="hz">${esc(c.t)}</b></button>`).join('')}</div>
      <div class="kal-act"><button class="kal-gb2" data-k="undo" ${T.placed.length ? '' : 'disabled'}>${kI('undo')}<span>${t('Hapus satu')}</span></button><button class="kal-gb2" data-k="reset" ${T.placed.length ? '' : 'disabled'}>${kI('reset')}<span>${t('Ulang susun')}</span></button>
      <button class="kal-go ${full ? 'ready' : ''}" data-k="go" ${full ? '' : 'disabled'}>${kI('star')}<span>${t('Serang!')}</span></button></div>`;
  }
  el.innerHTML = `<div class="kal-q kal-${T.type}"><div class="kal-qh"><span class="kal-tag">${tag}</span>${lvBadgeS(s.zh, { size: 'sm', cls: 'kal-lvb solid' })}<div class="kal-bar ${T.lim ? 'tm' : ''}"><i id="kalbar"></i></div>${aud}</div>${mean}${body}
    <div class="kal-keys">${t('Ketik angka untuk memilih kartu · Backspace hapus · Enter serang')}</div></div>`;
}
function kalPick(j) {
  const K = KAL; const T = K.task; if (!T || K.state !== 'play' || T.type === 'gap') return;
  if (T.placed.includes(j) || !T.cards[j] || T.placed.length >= T.n) return;
  T.placed.push(j); kfx('place', T.placed.length - 1); kalPanel();
}
function kalUndo(i) { const K = KAL; const T = K.task; if (!T || K.state !== 'play' || T.type === 'gap' || !T.placed.length) return; if (i === undefined) T.placed.pop(); else T.placed.splice(i, 1); kfx('undo'); kalPanel(); }
function kalSay(slow) { const K = KAL; const T = K.task || K.lastT; if (!T) return; try { lgSay(T.s.zh, slow); } catch (e) {} const b = $('#kalpanel .kal-say, #kalpanel .kal-lis'); if (b) { b.classList.remove('on'); void b.offsetWidth; b.classList.add('on'); } }

/* ---------- alur permainan ---------- */
function kalSubmit(optJ, why) {
  const K = KAL; const T = K.task; if (!T || K.state !== 'play') return;
  if (K.ol) return olSubmit(optJ, why);
  let ok = false, given = '';
  if (T.type === 'gap') { if (why === 'time') given = ''; else { given = T.opts[optJ]; ok = given === T.g.w; } }
  else { if (why !== 'time' && T.placed.length < T.n) return; given = T.placed.map(j => T.cards[j].t).join(''); ok = why !== 'time' && given === T.s.h; }
  K.state = 'anim'; K.canNext = 0; K.wantNext = 0; K.lastT = T; K.tot++;
  if (T.type === 'gap' && optJ !== null && optJ !== undefined) { const bs = document.querySelectorAll('#kalpanel .kal-opt'); bs.forEach((b, j) => { b.disabled = true; if (T.opts[j] === T.g.w) b.classList.add('ok'); else if (j === optJ) b.classList.add('bad'); }); }
  const X = lgIdx(); const words = kalSegRaw(T.s.h).map(w => X.form.get(w)).filter(i => i !== undefined && lgOkW(i));
  if (ok) {
    K.ok++; K.combo++; K.maxCombo = Math.max(K.maxCombo, K.combo); words.forEach(i => { try { lgHitRec(i); } catch (e) {} });
    const sp = clamp(1 - Math.max(0, T.el - T.par * .4) / (T.par * 1.2), 0, 1); const n = T.type === 'gap' ? T.n : T.n;
    let dmg = (6 + 2.4 * n + .4 * T.s.h.length) * (1 + .6 * sp) * (1 + .1 * Math.min(10, K.combo - 1));
    if (T.type === 'listen') dmg *= 1.15; dmg = Math.round(dmg); const crit = sp > .75 || K.combo % 5 === 0;
    K.score += Math.round(dmg * 10 * KAL_D[K.diff].mul); kalReveal(true, given, why);
    kalAttack(dmg, crit, T);
  } else {
    K.combo = 0; K.miss.push({ s: T.s, g: T.type === 'gap' ? T.g.w : '' });
    K.retry.push({ s: T.s, due: K.qn + 4 });
    if (T.type === 'gap' && T.g.i !== undefined) { try { lgMissRec(T.g.i); } catch (e) {} }
    else if (T.type !== 'gap') { const ch = T.s.chunks; let k = 0; while (k < T.placed.length && k < ch.length && T.cards[T.placed[k]].t === ch[k]) k++; const wi = kalSegRaw(ch[Math.min(k, ch.length - 1)]).map(w => X.form.get(w)).find(i => i !== undefined && lgOkW(i)); if (wi !== undefined) { try { lgMissRec(wi); } catch (e) {} } }
    kalReveal(false, given, why); kalBossAttack();
  }
  kalScore();
}
function kalReveal(ok, given, why) {
  const K = KAL; const T = K.lastT; const s = T.s; const el = $('#kalpanel'); if (!el) return;
  const ch = T.type === 'gap' ? null : s.chunks; const end = (s.zh.match(/[。？！]+$/) || [''])[0];
  let hz;
  if (T.type === 'gap') hz = `${esc(s.h.slice(0, T.g.off))}<u>${esc(T.g.w)}</u>${esc(s.h.slice(T.g.off + T.g.w.length))}${esc(end)}`;
  else hz = ch.map(c => `<span>${esc(c)}</span>`).join('<i></i>') + esc(end);
  const mine = !ok && given && why !== 'time' ? `<div class="kal-mine">${t('Jawabanmu')}: <s class="hz">${esc(T.type === 'gap' ? s.h.slice(0, T.g.off) + given + s.h.slice(T.g.off + T.g.w.length) : given)}</s></div>` : '';
  el.innerHTML = `<div class="kal-rev ${ok ? 'ok' : 'bad'}"><div class="kal-rh"><b>${ok ? t('Benar!') : why === 'time' ? t('Waktu habis!') : t('Belum tepat')}</b>${lvBadgeS(s.zh, { size: 'sm', cls: 'kal-lvb solid' })}
      ${kalVoice() ? `<button class="kal-gb kal-say" data-k="say" aria-label="${t('Dengar lagi')}">${kI('spk')}</button><button class="kal-gb" data-k="slow" aria-label="${t('Pelan')}">${kI('slow')}</button>` : ''}</div>
    <div class="kal-rz hz">${hz}</div><div class="kal-rpy">${esc(kalPyStr(s))}</div><div class="kal-rtr">${esc(s.tr)}</div>${mine}
    <button class="kal-next" data-k="next" ${ok ? 'data-auto="1"' : ''}>${t('Lanjut')} ${kI('play')}</button></div>`;
  if (!(K.ol && ok)) kalLater(() => { if (kalVoice() && K.lastT === T) kalSay(false); }, ok ? 700 : 900);
}
function kalAttack(dmg, crit, T) {
  const K = KAL; const sp = KAL_SPELLS[(K.ok - 1) % KAL_SPELLS.length]; const B = KAL_B[K.stage];
  kfx('ok', K.combo); kalSetHero('joy');
  const cut = $('#kalcut'); const big = crit || T.s.h.length >= 9 || K.combo % 3 === 0;
  if (cut) { cut.className = 'kal-cut'; cut.innerHTML = `<div class="kal-cutb" style="--c1:${B.c2};--c2:${B.c1}"><div class="kal-sl"></div><div class="kal-cm">${mascot('wow', 150)}</div><div class="kal-ct"><b class="hz">${sp[0]}</b><span>${esc(t(sp[1]))}</span>${K.combo >= 2 ? `<i>${K.combo} COMBO!</i>` : ''}</div></div>`; void cut.offsetWidth; cut.classList.add('on', big ? 'big' : 'small'); }
  kfx('cast');
  kalLater(() => { if (cut) cut.classList.remove('on'); kalHeroAnim('atk', 650); K.fxs.push({ k: 'ring', x: K.hx, y: K.hy + K.hs * .42, r: K.hs * .62, c: '#ff9fd0', chs: [...T.s.h], t: 0, d: 1.1 }); }, big ? 620 : 420);
  kalLater(() => {
    const y0 = K.hy - K.hs * .08, x0 = K.hx + K.hs * .4; const x1 = K.bx, y1 = K.by - 10 * K.bs;
    K.fxs.push({ k: 'beam', x0, y0, x1, y1, w: 16 + Math.min(20, dmg / 3), c: crit ? '#ffd84a' : '#ff7fd0', t: 0, d: .6 });
    for (let i = 0; i < 3; i++) K.fxs.push({ k: 'star', x0, y0, x1: x1 + (i - 1) * 20, y1: y1 + (i - 1) * 16, arc: 40 + i * 30, r: 12, c: ['#ffd84a', '#7fe3ff', '#ff9fd0'][i], t: -i * .06, d: .7 });
    kfx('whoosh');
  }, big ? 760 : 560);
  kalLater(() => {
    const Bs = K.boss; Bs.hurt = .5; K.shake = crit ? 16 : 9; K.flash = crit ? .5 : .25; K.flashC = '#fff';
    kfx(crit ? 'crit' : 'hit');
    const x1 = K.bx, y1 = K.by - 10 * K.bs;
    kalPart(x1, y1, crit ? 34 : 22, { cols: ['#fff', '#ffd84a', '#ff9fd0', '#7fe3ff'], sp: 260, d: .8, r: 7 });
    K.fxs.push({ k: 'wave', x: x1, y: y1, r: 120 * K.bs, c: '#ffe14d', t: 0, d: .5 });
    K.txts.push({ s: (crit ? '!' : '') + dmg, x: x1 + (Math.random() - .5) * 40, y: y1 - 50 * K.bs, sz: crit ? 48 : 38, t: 0, d: 1.2, c1: crit ? '#ffe14d' : '#ffd0ea', c2: crit ? '#ff5a3d' : '#ff4f9a' });
    if (crit) K.txts.push({ s: 'CRITICAL!', x: x1, y: y1 - 100 * K.bs, sz: 22, t: 0, d: 1.1, c1: '#fff7b0', c2: '#ffb02e' });
    K.bossHp = Math.max(0, K.bossHp - dmg); kalHP();
    if (K.bossHp <= 0) kalLater(kalBossDown, 650);
    else if (KAL_B[K.stage].fin && K.fphase === 1 && K.bossHp / K.bossMax <= .5) kalLater(kalPhase2, 700);
    else { K.canNext = 1; if (K.wantNext) kalLater(() => kalNext(), 250); else kalLater(() => { if (K.state === 'anim') kalNext(); }, 1500); }
  }, big ? 1020 : 820);
}
function kalBossAttack() {
  const K = KAL; const B = K.boss; kfx('bad'); kalSetHero('oops');
  kalLater(() => {
    B.atk = .6; kfx('boss'); const x0 = K.bx - 40 * K.bs, y0 = K.by, x1 = K.hx, y1 = K.hy;
    if (B.k === 'cloud') K.fxs.push({ k: 'bolt', x0: K.bx, y0: K.by + 60 * K.bs, x1, y1: y1 - K.hs * .3, t: 0, d: .7 });
    else if (B.k === 'tiger') K.fxs.push({ k: 'claw', x: x1, y: y1, t: -.25, d: .8 });
    else if (B.k === 'dragon') K.fxs.push({ k: 'orb', x0, y0: y0 - 20 * K.bs, x1, y1, arc: -40, r: 30, c: '#ff7a2a', t: 0, d: .6 });
    else for (let i = 0; i < 3; i++) K.fxs.push({ k: 'orb', x0, y0, x1: x1 + (i - 1) * 16, y1: y1 + (i - 1) * 14, arc: (i - 1) * 60, r: 24, c: K.fphase === 2 ? '#ff2a4a' : '#a46bff', t: -i * .1, d: .7 });
  }, 150);
  kalLater(() => {
    K.hearts = Math.max(0, K.hearts - 1); K.shake = 14; K.flash = .45; K.flashC = '#ff2a4a'; kfx('hurt'); kalHeroAnim('hurt', 700); kalHearts(K.hearts);
    kalPart(K.hx, K.hy, 16, { cols: ['#ff5a7a', '#fff', '#ffb0c0'], sp: 180, d: .6, r: 6 });
    K.txts.push({ s: '-1', x: K.hx, y: K.hy - K.hs * .5, sz: 34, t: 0, d: 1, c1: '#ffd0d8', c2: '#ff2a4a' });
    K.canNext = 1;
  }, 600);
}
function kalNext(force) {
  const K = KAL; if (!K || K.state !== 'anim') return;
  if (K.ol) return olNext();
  if (!force && !K.canNext) { if (K.task && K.lastT === K.task && K.ok && K.combo) K.wantNext = 1; return; }
  kalClearTimers();
  if (K.hearts <= 0) { kalKO(); return; }
  if (K.bossHp <= 0) return;
  kalSetHero('happy'); kalTurn();
}
function kalTurn() {
  const K = KAL; const T = kalMakeTask(); if (!T) { kalEnd(false); return; }
  K.task = T; K.state = 'play'; kalPanel();
  if (T.type === 'listen' && kalVoice()) kalLater(() => kalSay(false), 350);
}
function kalBossDown() {
  const K = KAL; const B = K.boss; B.ko = 1; B.kot = 0; K.state = 'trans'; kalClearTimers(); K.bossesDown++;
  kfx('clear'); K.flash = .7; K.flashC = '#fff'; kalPart(K.bx, K.by, 40, { cols: ['#ffd84a', '#ff9fd0', '#7fe3ff', '#fff'], sp: 320, d: 1.1, r: 8, s: 'star' }); kalHeroAnim('win', 1600); kalSetHero('joy');
  if (KAL_B[K.stage].fin) { kalLater(() => kalEnd(true), 1500); return; }
  kalLater(() => {
    K.hearts = Math.min(K.maxHearts, K.hearts + 1); kfx('heart'); kalHearts(K.hearts - 1);
    kalBanner(`<b>${t('STAGE BERES!')}</b><span>${kI('star')} ${t('+1 nyawa')}</span>`, 'clear', 1900);
  }, 700);
  kalLater(() => { K.stage++; kalStage(); }, 2900);
}
function kalPhase2() {
  const K = KAL; K.state = 'trans'; kalClearTimers(); K.fphase = 2; K.boss.hurt = 0; K.boss.atk = 1.2; K.shake = 22; K.flash = .8; K.flashC = '#ff2a4a';
  kfx('roar'); kalBanner(`<b>PHASE 2</b><span>${t('Fase 2 · Sang Raja murka!')}</span>`, 'p2', 2000); kalBossBar(); kmStart('final2');
  kalPart(K.bx, K.by, 40, { cols: ['#ff2a4a', '#ff8a3d', '#ffd84a'], sp: 300, d: 1, r: 8 });
  kalLater(() => { K.state = 'anim'; kalNext(1); }, 2300);
}
function kalBanner(html, cls, ms) {
  const sc = $('#kalscr'); if (!sc) return; const b = document.createElement('div'); b.className = 'kal-banner ' + cls; b.innerHTML = `<div class="kal-bsl"></div><div class="kal-bt">${html}</div>`;
  sc.appendChild(b); kalLater(() => b.remove(), ms);
}
function kalStage() {
  const K = KAL; const B = KAL_B[K.stage]; K.bossMax = B.hp; K.bossHp = B.hp; K.hpLag = B.hp; K.fphase = B.fin ? 1 : 0;
  K.boss = { k: B.k, vis: 1, hurt: 0, atk: 0, intro: 0, ko: 0, kot: 0 }; K.bgc = null; K.state = 'trans'; K.task = null;
  kalBossBar(); kmStart(B.fin ? 'final' : 'stage');
  const pn = $('#kalpanel'); if (pn) pn.innerHTML = `<div class="kal-wait"><span class="hz">${B.zh}</span><b>${esc(t(B.name))}</b></div>`;
  const sc = $('#kalscr'); const vs = document.createElement('div'); vs.className = 'kal-vs' + (B.fin ? ' fin' : '');
  vs.style.cssText = `--b1:${B.c1};--b2:${B.c2}`;
  vs.innerHTML = `<div class="kal-vl"><div class="kal-vm">${mascot('wave', 170)}</div><b>Hacimi</b></div><div class="kal-vr"><canvas class="kal-vc" width="360" height="360"></canvas><b><span class="hz">${B.zh}</span> ${esc(t(B.name))}</b></div>
    <div class="kal-vx">VS</div><div class="kal-vst">${B.fin ? t('BOSS FINAL') : 'STAGE ' + (K.stage + 1)}<small>${esc(t(B.place))}</small></div>`;
  sc.appendChild(vs); kalPortrait(vs.querySelector('canvas'), B.k, 'idle', 1);
  kfx('whoosh');
  const fin = () => { vs.classList.add('out'); kalLater(() => { vs.remove(); }, 400); };
  kalLater(() => kfx('count', 0), 900); kalLater(() => kfx('count', 0), 1300); kalLater(() => kfx('count', 1), 1700);
  kalLater(() => { fin(); K.state = 'anim'; kalNext(1); }, 2100);
}
function kalPortrait(cv, k, mood, ph) { if (!cv) return; const g = cv.getContext('2d'); g.clearRect(0, 0, cv.width, cv.height); g.save(); g.translate(cv.width / 2, cv.height / 2 + cv.height * .02); const s = cv.width / 275; g.scale(s, s); kalDrawBoss(g, k, mood, 0.4, ph); g.restore(); }
function kalKO() {
  const K = KAL; K.state = 'trans'; kalClearTimers(); kalSetHero('oops'); kalHeroAnim('hurt', 900); kfx('lose'); kmStop();
  kalBanner(`<b>K.O.</b><span>${esc(t(KAL_B[K.stage].name))}</span>`, 'ko', 1700); kalLater(() => kalEnd(false), 1700);
}

/* ---------- menu, hasil, buka/tutup ---------- */
function kalCfg() { const a = arS(); a.kal = a.kal && typeof a.kal === 'object' ? a.kal : {}; const c = a.kal; if (!KAL_D[c.diff]) c.diff = 'easy'; if (!KAL_MODES.some(m => m[0] === c.mode)) c.mode = 'mix'; if (c.mus === undefined) c.mus = true; return c; }
function kalMenu() {
  const K = KAL; const c = kalCfg(); K.state = 'menu'; K.stage = 0; K.boss = null; K.bgc = null; K.fphase = 0; kmStart('menu');
  const pn = $('#kalpanel'); if (pn) pn.innerHTML = ''; const bb = $('#kalbossbar'); if (bb) bb.innerHTML = `<div class="kal-bn"><span class="hz">句子大作戰</span><b>${t('Duel Kalimat')}</b></div>`;
  const best = arS().best.kal || 0; const n = K.cands.length;
  const sc = $('#kalscr'); sc.innerHTML = `<div class="kal-menu"><div class="kal-mcard">
    <div class="kal-title"><div class="kal-tz hz">句子大作戰</div><div class="kal-te">${t('Duel Kalimat')}</div></div>
    <div class="kal-bosses">${KAL_B.map(B => `<div class="kal-bp" style="--b1:${B.c1};--b2:${B.c2}"><canvas width="160" height="160"></canvas><span class="hz">${B.zh}</span></div>`).join('')}</div>
    <div class="kal-lab">${t('Mode')}</div><div class="kal-seg">${KAL_MODES.map(([k, l]) => `<button class="${c.mode === k ? 'on' : ''}" data-k="mode" data-v="${k}">${kI(k === 'gap' ? 'gap' : k === 'listen' ? 'ear' : k === 'build' ? 'build' : 'swords')}<span>${t(l)}</span></button>`).join('')}</div>
    <div class="kal-lab">${t('Tingkat')}</div><div class="kal-seg kal-dif">${KAL_DIFFS.map(([k, l, d]) => `<button class="${c.diff === k ? 'on' : ''}" data-k="diff" data-v="${k}"><span>${t(l)}</span><small>${t(d)}</small></button>`).join('')}</div>
    ${c.mode === 'listen' && !kalVoice() ? `<p class="kal-warn">${t('Suara mati di Pengaturan — tugas Dengar memakai pinyin.')}</p>` : ''}
    <div class="kal-mrow"><button class="kal-start" data-k="start">${kI('swords')}<span>${t('Mulai duel')}</span></button><button class="kal-onl" data-k="online">${kI('net')}<span>${t('Main online')}<small>1 vs 1</small></span></button></div>
    <div class="kal-mfoot"><span>${t('Kalimat dari: {s}', { s: esc(/^k:/.test(K.pool.src) ? K.pool.name : t('semua lesson + tema')) })} · <b>${n}</b></span>${best ? `<span>${kI('crown')} ${t('Rekor')} <b>${fmtN(best)}</b></span>` : ''}</div>
  </div></div>`;
  sc.querySelectorAll('.kal-bp canvas').forEach((cv, i) => kalPortrait(cv, KAL_B[i].k, 'idle', 1));
}
function kalBegin() {
  const K = KAL; const c = kalCfg(); K.mode = c.mode; K.diff = c.diff; kalPrep();
  if (!K.cands.length) { kalEnd(false); return; }
  Object.assign(K, { score: 0, ok: 0, tot: 0, combo: 0, maxCombo: 0, miss: [], qn: 0, bossesDown: 0, stage: 0, fphase: 0, task: null });
  K.maxHearts = KAL_D[K.diff].hearts; K.hearts = K.maxHearts; kalHearts(); kalScore();
  $('#kalscr').innerHTML = ''; K.run++; kalSetHero('happy'); kalStage();
}
function kalEnd(win) {
  const K = KAL; K.state = 'end'; kalClearTimers(); K.task = null; kmStop();
  const acc = K.tot ? K.ok / K.tot : 0; if (win) K.score += K.hearts * 500;
  const rank = !K.tot ? 'C' : win ? (acc >= .9 ? 'S' : acc >= .78 ? 'A' : acc >= .6 ? 'B' : 'C') : (acc >= .75 ? 'B' : 'C');
  const pb = K.tot ? arenaRecord('kal', K.score, acc) : false; const xp = K.tot ? Math.min(90, 4 + K.ok * 2 + K.bossesDown * 4 + (win ? 12 : 0)) : 0;
  if (xp) { try { addXP(xp, true); } catch (e) {} }
  kalLater(() => kfx(win ? 'win' : 'lose'), 200);
  const seen = new Set(); const miss = K.miss.filter(m => !seen.has(m.s.h) && seen.add(m.s.h));
  const B = KAL_B[Math.min(3, K.stage)];
  const sc = $('#kalscr'); sc.innerHTML = `<div class="kal-res ${win ? 'win' : 'lose'}"><div class="kal-rcard">
    <div class="kal-rart"><div class="kal-rays"></div><canvas width="220" height="220"></canvas><div class="kal-rm">${mascot(win ? 'joy' : 'oops', 150)}</div><div class="kal-rank r${rank}">${rank}</div></div>
    <h2>${win ? t('MENANG!') : t('KALAH…')}</h2><p class="kal-rsub">${t('Kamu mengalahkan {n} boss', { n: K.bossesDown })}${pb ? ` · <b class="kal-pb">${t('Rekor baru!')}</b>` : ''}</p>
    <div class="kal-stats"><div><small>${t('Skor')}</small><b>${fmtN(K.score)}</b></div><div><small>${t('Akurasi')}</small><b>${Math.round(acc * 100)}%</b></div><div><small>${t('Combo maks')}</small><b>${K.maxCombo}</b></div><div><small>XP</small><b>+${xp}</b></div></div>
    <div class="kal-miss"><h4>${t('Kalimat yang perlu diulang')}</h4>${miss.length ? miss.slice(0, 12).map((m, i) => `<div class="kal-mi"><button class="kal-gb" data-k="msay" data-v="${i}" aria-label="${t('Dengar lagi')}">${kI('spk')}</button><div><b class="hz">${m.g ? esc(m.s.h).replace(esc(m.g), `<u>${esc(m.g)}</u>`) : esc(m.s.h)}${esc((m.s.zh.match(/[。？！]+$/) || [''])[0])}${lvBadgeS(m.s.zh, { cls: 'solid' })}</b><small>${esc(kalPyStr(m.s))}</small><span>${esc(m.s.tr)}</span></div></div>`).join('') : `<p class="kal-perf">${kI('star')} ${t('Semua benar — sempurna!')}</p>`}</div>
    <div class="kal-rbtn"><button class="kal-gb2" data-k="close">${kI('back')}<span>${t('Kembali')}</span></button><button class="kal-start" data-k="again">${kI('reset')}<span>${t('Main lagi')}</span></button></div>
  </div></div>`;
  K.missL = miss; kalPortrait(sc.querySelector('.kal-rart canvas'), B.k, win ? 'ko' : 'atk', K.fphase || 1);
}
function kalPause(on) {
  const K = KAL; if (!K || K.state === 'menu' || K.state === 'end') return; if (on === K.paused) return; K.paused = on;
  const sc = $('#kalscr'); const old = sc && sc.querySelector('.kal-pause');
  if (on) { try { TTS.stop(); } catch (e) {} if (sc && !old) { const p = document.createElement('div'); p.className = 'kal-pause'; p.innerHTML = `<div class="kal-pcard"><b>${t('Jeda')}</b><button class="kal-start" data-k="resume">${kI('play')}<span>${t('Lanjut')}</span></button><button class="kal-gb2" data-k="close">${kI('x')}<span>${t('Keluar')}</span></button></div>`; sc.appendChild(p); } }
  else { if (old) old.remove(); K.last = 0; if (KM.c) KM.nt = KM.c.currentTime + .05; }
}
function kalClick(e) {
  const b = e.target.closest('[data-k]'); const K = KAL; if (!b || !K || b.disabled) return; const k = b.dataset.k, v = b.dataset.v;
  try { FX.ensure(); } catch (er) {}
  switch (k) {
    case 'close': if (K.ol) { if (K.state === 'end') olQuit(); else olConfirm(true); } else kalClose(); break;
    case 'online': kfx('tap', 3); olLobby(); break;
    case 'olquit': olQuit(); break;
    case 'olstay': olConfirm(false); break;
    case 'olagain': olAgain(); break;
    case 'mus': K.musOn = !K.musOn; kalCfg().mus = K.musOn; save(); kalMusBtn(); if (K.musOn && !KM.timer && K.state !== 'end') kmStart(K.state === 'menu' ? 'menu' : KAL_B[K.stage].fin ? (K.fphase === 2 ? 'final2' : 'final') : 'stage'); break;
    case 'pause': kalPause(!K.paused); break;
    case 'resume': kalPause(false); break;
    case 'mode': kalCfg().mode = v; save(); kfx('tap'); kalMenu(); break;
    case 'diff': kalCfg().diff = v; save(); kfx('tap', 2); kalMenu(); break;
    case 'start': case 'again': kfx('tap', 4); if (k === 'again') kalMenu(); kalBegin(); break;
    case 'pick': kalPick(+v); break;
    case 'unplace': kalUndo(+v); break;
    case 'undo': kalUndo(); break;
    case 'reset': if (K.task && K.task.placed) { K.task.placed = []; kfx('undo'); kalPanel(); } break;
    case 'go': kalSubmit(); break;
    case 'opt': kalSubmit(+v); break;
    case 'say': kalSay(false); break;
    case 'slow': kalSay(true); break;
    case 'next': kalNext(); break;
    case 'osay': { const m = K.missL && K.missL[+v]; if (m) { try { lgSay(m.s.zh); } catch (er) {} } break; }
    case 'msay': { const m = K.missL && K.missL[+v]; if (m) { try { lgSay(m.s.zh); } catch (er) {} } break; }
  }
}
function kalKey(e) {
  const K = KAL; if (!K) return; const k = e.key;
  if (K.ol) { if (k === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); if (K.state === 'end') olQuit(); else olConfirm(!K.olConf); return; } if (K.olConf) { if (k === 'Enter') { e.preventDefault(); olConfirm(false); } return; } if (K.state === 'end' || K.state === 'wait' || K.state === 'trans') return; }
  if (k === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); if (K.paused || K.state === 'menu' || K.state === 'end') kalClose(); else kalPause(true); return; }
  if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
  let used = true;
  if (K.paused) { if (k === 'Enter' || k === ' ') kalPause(false); else used = false; }
  else if (K.state === 'menu') { if (k === 'Enter') { kalBegin(); } else used = false; }
  else if (K.state === 'play' && K.task) {
    const T = K.task;
    if (/^[0-9]$/.test(k)) { const j = k === '0' ? 9 : +k - 1; if (T.type === 'gap') { if (j < T.opts.length) kalSubmit(j); } else kalPick(j); }
    else if (k === 'Backspace') kalUndo();
    else if (k === 'Enter') { if (T.type !== 'gap') kalSubmit(); }
    else if (k === ' ' || k === 'r' || k === 'R') kalSay(e.shiftKey);
    else used = false;
  } else if (K.state === 'anim') { if (k === 'Enter' || k === ' ' || k === 'ArrowRight') kalNext(); else used = false; }
  else if (K.state === 'end') { if (k === 'Enter') { kalMenu(); kalBegin(); } else used = false; }
  else used = false;
  if (used) { e.preventDefault(); e.stopImmediatePropagation(); }
}
function kalVis() { if (!KAL) return; if (KAL.ol) { if (!document.hidden) olResync(); return; } if (document.hidden) kalPause(true); }
function kalOpen(pool, ol) {
  if (KAL) kalClose(true);
  const el = kalShell(); const c = kalCfg();
  KAL = { pool, el, run: 1, tm: new Set(), fxs: [], parts: [], txts: [], shake: 0, flash: 0, time: 0, last: 0, paused: false, musOn: c.mus !== false, stage: 0, fphase: 0, state: 'menu', hexpr: '', hearts: 0, maxHearts: 5, score: 0, combo: 0, bossHp: 1, bossMax: 1, hpLag: 1, mode: c.mode, diff: c.diff };
  KAL.cv = $('#kalcv'); KAL.fx = $('#kalfx'); $('#kalhero').innerHTML = kalHeroHTML(); kalSetHero('happy');
  if (ol) { KAL.ol = ol; KAL.cands = []; el.classList.add('ol'); } else kalPrep();
  kalResize(); kalMusBtn();
  KAL.onRes = () => kalResize(); window.addEventListener('resize', KAL.onRes); try { KAL.ro = new ResizeObserver(() => kalResize()); KAL.ro.observe($('#kalstage')); } catch (e) {} el.addEventListener('click', kalClick);
  window.addEventListener('keydown', kalKey, true); document.addEventListener('visibilitychange', kalVis);
  KAL.prevOv = document.body.style.overflow; document.body.style.overflow = 'hidden';
  KAL.raf = requestAnimationFrame(kalFrame); if (ol) olBegin(ol); else kalMenu();
}
function kalClose(silent) {
  const K = KAL; if (!K) return; kalClearTimers(); cancelAnimationFrame(K.raf); kmKill();
  window.removeEventListener('resize', K.onRes); try { if (K.ro) K.ro.disconnect(); } catch (e) {} window.removeEventListener('keydown', kalKey, true); document.removeEventListener('visibilitychange', kalVis);
  try { TTS.stop(); } catch (e) {}
  document.body.style.overflow = K.prevOv || ''; if (K.el) K.el.remove(); K.bgc = null; KAL = null;
  if (!silent) { if (location.hash !== '#arena') go('arena'); else render(); }
}

/* ---------- ONLINE 1v1 (ARNET): dua pemain saling serang, tugas sama & urutan sama ----------
   Host membuat daftar tugas lengkap di makeGo → semua HP mendapat soal identik. Tiap pemain berpacu sendiri.
   Benar → 'atk' (damage = rumus solo) diterapkan oleh penerima (di-clamp). Salah → -10 HP diri + combo putus.
   Selesai bila HP salah satu 0, atau keduanya selesai (HP lebih tinggi menang; seri → lebih cepat). */
Object.assign(I18N, {
  'Duel online': ['Online duel', 'Online na duelo'], 'Lawan': ['Rival', 'Kalaban'], 'Soal': ['Task', 'Tanong'],
  'Keluar dari duel?': ['Leave the duel?', 'Umalis sa duelo?'], 'Lawanmu akan menang.': ['Your rival will win.', 'Mananalo ang kalaban mo.'],
  'Semua kalimat selesai!': ['All sentences done!', 'Tapos lahat ng pangungusap!'], 'Menunggu {n}…': ['Waiting for {n}…', 'Hinihintay si {n}…'],
  'SELESAI!': ['FINISHED!', 'TAPOS!'], 'Salah: -{n} HP': ['Wrong: -{n} HP', 'Mali: -{n} HP'],
  '{n} K.O.!': ['{n} K.O.!', '{n} K.O.!'], 'HP lebih tinggi menang': ['Higher HP wins', 'Mas mataas na HP ang panalo'], 'HP seri — yang lebih cepat menang': ['HP tied — the faster one wins', 'Tabla ang HP — mas mabilis ang panalo'],
  '{n} keluar — kamu menang': ['{n} left — you win', 'Umalis si {n} — panalo ka'], 'HP tersisa': ['HP left', 'Natitirang HP'], 'Benar': ['Correct', 'Tama'], 'Waktu': ['Time', 'Oras'],
  'Koneksi terputus…': ['Connection lost…', 'Nawala ang koneksyon…'], 'Serangan lawan': ['Rival attack', 'Atake ng kalaban']
});
Object.assign(I18N_VI, {
  'Duel online': 'Đấu trực tuyến', 'Lawan': 'Đối thủ', 'Soal': 'Câu', 'Keluar dari duel?': 'Rời trận đấu?', 'Lawanmu akan menang.': 'Đối thủ sẽ thắng.',
  'Semua kalimat selesai!': 'Đã xong mọi câu!', 'Menunggu {n}…': 'Đang chờ {n}…', 'SELESAI!': 'XONG!', 'Salah: -{n} HP': 'Sai: -{n} HP',
  '{n} K.O.!': '{n} K.O.!', 'HP lebih tinggi menang': 'HP cao hơn thắng', 'HP seri — yang lebih cepat menang': 'HP bằng nhau — ai nhanh hơn thắng',
  '{n} keluar — kamu menang': '{n} đã rời — bạn thắng', 'HP tersisa': 'HP còn lại', 'Benar': 'Đúng', 'Waktu': 'Thời gian', 'Koneksi terputus…': 'Mất kết nối…', 'Serangan lawan': 'Đòn của đối thủ'
});
const KAL_OL_N = 16, KAL_OL_HP = 400, KAL_OL_SELF = 10;
let KAL_OLPOOL = null;
function olCrest(av) { const a = (typeof DL_AV !== 'undefined' && DL_AV[av | 0]) || ['龍', '', '#ff3d6e', '#ffb03a']; return { zh: a[0], c1: a[2], c2: a[3] }; }
function olMascot(expr, size, av) {
  const c = olCrest(av);
  return mascot(expr, size).replace(/#F4A9BC/g, c.c1).replace(/#E58AA2/g, c.c2).replace(/#FCD5DF/g, c.c2).replace(/#D9577A/g, c.c1).replace('>小<', '>' + c.zh + '<');
}
function olCrestHTML(av, cls) { try { return dlCrest(av | 0, cls || 'xs'); } catch (e) { return ''; } }
/* lobby */
function olLobby() {
  const K = KAL; KAL_OLPOOL = K ? K.pool : null; kalClose(true);
  ARNET.open('kal', { max: 2, min: 2, title: 'Duel Kalimat', c1: '#8b5cff', c2: '#ff4f9a', makeGo: olMakeGo, onStart: olStart });
}
function olPool() { if (KAL_OLPOOL) return KAL_OLPOOL; try { return arenaPool(); } catch (e) { return { src: '', ids: [], sents: [], name: '' }; } }
/* host: susun daftar tugas lengkap (JSON polos) */
function olMakeGo() {
  const c = kalCfg(); const old = KAL; const tmp = { pool: olPool(), mode: c.mode, diff: c.diff, stage: 0, fphase: 0, qn: 0 }; const tasks = [];
  KAL = tmp;
  try {
    kalPrep();
    for (let i = 0; i < KAL_OL_N; i++) { tmp.stage = Math.min(3, Math.floor(i * 4 / KAL_OL_N)); tmp.retry = []; const T = kalMakeTask(); if (!T) break; tasks.push(olPack(T)); }
  } catch (e) { console.warn('kal online', e); }
  KAL = old;
  return { kal: { v: 1, mode: c.mode, diff: c.diff, bg: Math.floor(Math.random() * 4), hp: KAL_OL_HP, tasks } };
}
function olPack(T) {
  const s = T.s; const o = { y: T.type, s: { zh: s.zh, py: kalPyStr(s), tr: s.tr, h: s.h, ch: s.chunks } };
  if (T.type === 'gap') { o.g = { off: T.g.off, w: T.g.w }; o.o = T.opts; }
  else o.c = T.cards.map(c => [c.t, c.real ? 1 : 0, (c.py || []).map(p => [p.y, p.tone])]);
  return o;
}
function olUnpack(o, D) {
  try {
    const str = (x, n) => String(x == null ? '' : x).slice(0, n);
    const type = ['build', 'gap', 'listen'].includes(o.y) ? o.y : null; if (!type || !o.s) return null;
    const zh = str(o.s.zh, 60), h = str(o.s.h, 40); if (!h) return null;
    const s = { zh, py: str(o.s.py, 200), tr: str(o.s.tr, 300), h, chunks: (Array.isArray(o.s.ch) ? o.s.ch : [h]).slice(0, 12).map(x => str(x, 12)), own: 0 };
    const T = { type, s, t0: 0, el: 0, lim: 0, left: 0 };
    if (type === 'gap') {
      const w = str(o.g && o.g.w, 6); if (!w) return null; const off = clamp((o.g.off | 0), 0, h.length);
      T.g = { off, w, g: KAL_GAP[w] ? 1 : 0, i: lgIdx().form.get(w) }; T.opts = (Array.isArray(o.o) ? o.o : []).slice(0, 6).map(x => str(x, 6)); if (!T.opts.includes(w)) T.opts.push(w);
      T.n = 2 + (w.length > 1 ? 1 : 0); T.par = 3.5 + h.length * .15;
    } else {
      T.cards = (Array.isArray(o.c) ? o.c : []).slice(0, 14).map(c => ({ t: str(c[0], 12), real: c[1] ? 1 : 0, py: (Array.isArray(c[2]) ? c[2] : []).slice(0, 12).map(p => ({ y: str(p[0], 10), tone: clamp(p[1] | 0, 0, 5) })) }));
      T.n = s.chunks.length; T.placed = []; T.par = 3 + T.n * 1.5 + (type === 'listen' ? 2 : 0);
      if (T.cards.filter(c => c.real).length < T.n) return null;
    }
    if (D.timer) T.lim = type === 'gap' ? 9 : 6 + T.n * 2.2 + (type === 'listen' ? 2.5 : 0);
    return T;
  } catch (e) { return null; }
}
function olStart(ctx) { if (KAL) kalClose(true); kalOpen(olPool(), ctx); }
function olBegin(ctx) {
  const K = KAL; const go = (ctx.go && ctx.go.kal) || {};
  K.diff = KAL_D[go.diff] ? go.diff : 'easy'; K.mode = go.mode || 'mix'; const D = KAL_D[K.diff];
  K.olTasks = (Array.isArray(go.tasks) ? go.tasks : []).slice(0, 40).map(o => olUnpack(o, D)).filter(Boolean);
  K.me = ctx.me; K.opp = ctx.players.find(p => p.id !== ctx.me.id) || { id: '?', name: t('Lawan'), av: 1 };
  K.maxHp = clamp(go.hp | 0 || KAL_OL_HP, 100, 999); K.hp = K.maxHp;
  K.os = { hp: K.maxHp, q: 0, cb: 0, ok: 0, tot: 0, sn: 0, rx: 0, dn: 0, tm: 0, mc: 0 };
  Object.assign(K, { score: 0, ok: 0, tot: 0, combo: 0, maxCombo: 0, miss: [], qi: 0, sn: 0, rx: 0, land: 0, sent: [], dealt: 0, done: 0, doneT: 0, frozen: '', fin: null, ofin: null, resShown: 0, oppLeft: 0, olConf: 0, net: 'up', hot: 0, stT: 0, task: null, stage: clamp(go.bg | 0, 0, 3), fphase: 0, maxHearts: 0, hearts: 0 });
  K.boss = null; K.bgc = null; K.state = 'trans';
  ctx.on(m => { if (KAL === K) olMsg(m); }); ctx.onLeave(id => { if (KAL === K) olLeave(id); }); ctx.onStatus(s => { if (KAL === K) olStatus(s); });
  olRivMake(); kalResize(); olTop(); kalScore(); $('#kalhearts').innerHTML = '';
  kmStart('stage');
  if (!K.olTasks.length) { K.state = 'wait'; olFreeze('done'); return; }
  olIntro();
}
/* lawan: Hacimi diwarnai ulang dengan warna crest lawan, menghadap kiri */
function olRivMake() {
  const K = KAL; const st = $('#kalstage'); if (!st || $('#kalriv')) return; const c = olCrest(K.opp.av);
  const r = document.createElement('div'); r.className = 'kal-hero kal-riv'; r.id = 'kalriv';
  r.innerHTML = `<div class="kal-rin">${kalHeroHTML().replace(/<div class="kal-mas">[\s\S]*?<\/svg><\/div>/, `<div class="kal-mas">${olMascot('happy', 160, K.opp.av)}</div>`).replace(/#ff7fae/g, c.c1).replace(/#ffd84a/g, c.c2)}</div>`;
  st.insertBefore(r, $('#kalfx'));
  const mk = (id, name, av, cls) => { const n = document.createElement('div'); n.className = 'kal-ntag ' + cls; n.id = id; const cc = olCrest(av); n.style.cssText = `--c1:${cc.c1};--c2:${cc.c2}`; n.innerHTML = `${olCrestHTML(av)}<b>${esc(name)}</b>`; st.appendChild(n); };
  mk('kalnme', K.me.name || t('Kamu'), K.me.av, 'me'); mk('kalnop', K.opp.name || t('Lawan'), K.opp.av, 'op');
}
function olPlace() {
  const K = KAL; const hs = K.hs; const r = $('#kalriv');
  if (r) { r.style.width = hs + 'px'; r.style.height = hs + 'px'; r.style.left = (K.bx - hs / 2) + 'px'; r.style.top = (K.hy - hs / 2) + 'px'; }
  const a = $('#kalnme'), b = $('#kalnop'); const y = Math.max(46, K.hy - hs / 2 - 6);
  if (a) { a.style.left = K.hx + 'px'; a.style.top = y + 'px'; } if (b) { b.style.left = K.bx + 'px'; b.style.top = y + 'px'; }
}
function olRivSet(expr) { const K = KAL; const m = $('#kalriv .kal-mas'); if (m && K.rexpr !== expr) { K.rexpr = expr; m.innerHTML = olMascot(expr, 160, K.opp.av); } }
function olRivAnim(cls, ms) { const h = $('#kalriv'); if (!h) return; h.classList.remove('atk', 'hurt', 'win'); void h.offsetWidth; h.classList.add(cls); kalLater(() => h.classList.remove(cls), ms || 600); }
/* HUD atas: HP kedua pemain + progres lawan */
function olTop() {
  const K = KAL; const el = $('#kalbossbar'); if (!el) return; const a = olCrest(K.me.av), b = olCrest(K.opp.av);
  el.innerHTML = `<div class="kal-vb"><div class="kal-pl me" style="--c1:${a.c1};--c2:${a.c2}"><div class="kal-pn">${olCrestHTML(K.me.av)}<b>${esc(K.me.name || t('Kamu'))}</b><span class="kal-pq" id="kalmyq"></span></div>
      <div class="kal-hp"><i class="lag" id="kalmylag"></i><i class="fill" id="kalmyhp"></i><em id="kalmyn"></em></div></div>
    <div class="kal-vbx">VS<i id="kalnet"></i></div>
    <div class="kal-pl op" style="--c1:${b.c1};--c2:${b.c2}"><div class="kal-pn">${olCrestHTML(K.opp.av)}<b>${esc(K.opp.name || t('Lawan'))}</b><span class="kal-pq" id="kalopq"></span></div>
      <div class="kal-hp"><i class="lag" id="kaloplag"></i><i class="fill" id="kalophp"></i><em id="kalopn"></em></div></div></div>`;
  olBars();
}
function olOppHp() { const K = KAL; let p = 0; for (let i = K.os.rx; i < K.land && i < K.sent.length; i++) p += K.sent[i]; return Math.max(0, K.os.hp - p); }
function olBars() {
  const K = KAL; if (!K || !K.ol) return; const N = K.olTasks.length; const oh = olOppHp();
  const set = (id, v) => { const e = document.getElementById(id); if (e) e.style.transform = `scaleX(${clamp(v / K.maxHp, 0, 1).toFixed(3)})`; };
  set('kalmyhp', K.hp); set('kalophp', oh);
  const lagSet = (id, v) => { const e = document.getElementById(id); if (!e) return; clearTimeout(e._t); e._t = setTimeout(() => { e.style.transform = `scaleX(${clamp(v / K.maxHp, 0, 1).toFixed(3)})`; }, 420); };
  lagSet('kalmylag', K.hp); lagSet('kaloplag', oh);
  const tx = (id, s) => { const e = document.getElementById(id); if (e && e.innerHTML !== s) e.innerHTML = s; };
  tx('kalmyn', String(Math.ceil(K.hp))); tx('kalopn', String(Math.ceil(oh)));
  tx('kalmyq', `${Math.min(N, K.qi)}/${N}`);
  tx('kalopq', `${K.os.cb >= 2 ? `<s>${kI('flame')}${K.os.cb}</s>` : ''}${K.os.dn ? kI('star') : ''}${Math.min(N, K.os.q)}/${N}`);
  const lowMe = K.hp / K.maxHp < .3, lowOp = oh / K.maxHp < .3;
  const pm = document.querySelector('#kalbossbar .kal-pl.me'), po = document.querySelector('#kalbossbar .kal-pl.op'); if (pm) pm.classList.toggle('low', lowMe); if (po) po.classList.toggle('low', lowOp);
  if ((lowMe || lowOp) && !K.hot && K.state !== 'end') { K.hot = 1; kmStart('final'); }
  if (K.state === 'wait' && !K.frozen) olWaitPanel();
}
function olSt(now) {
  const K = KAL; if (!K || !K.ol || K.resShown) return;
  const fire = () => { if (KAL !== K) return; K.stT = 0; K.lastSt = performance.now(); K.ol.send({ e: 'st', hp: Math.ceil(K.hp), q: K.qi, cb: K.combo, ok: K.ok, tot: K.tot, sn: K.sn, rx: K.rx, dn: K.done, tm: K.doneT, mc: K.maxCombo }); };
  if (now) { clearTimeout(K.stT); fire(); return; }
  if (K.stT) return; const wait = Math.max(0, 160 - (performance.now() - (K.lastSt || 0))); K.stT = setTimeout(fire, wait);
}
function olResync() { const K = KAL; if (!K || !K.ol || K.resShown) return; try { K.ol.send({ e: 'rq' }); } catch (e) {} olSt(true); if (K.frozen) olSendFin(); }
function olIntro() {
  const K = KAL; const sc = $('#kalscr'); const a = olCrest(K.me.av), b = olCrest(K.opp.av);
  const pn = $('#kalpanel'); if (pn) pn.innerHTML = `<div class="kal-wait"><span class="hz">對戰</span><b>${t('Duel online')} · ${K.olTasks.length} ${t('Kalimat').toLowerCase()}</b></div>`;
  const vs = document.createElement('div'); vs.className = 'kal-vs ol'; vs.style.cssText = `--a1:${a.c1};--a2:${a.c2};--b1:${b.c1};--b2:${b.c2}`;
  vs.innerHTML = `<div class="kal-vl"><div class="kal-vm">${mascot('wave', 170)}</div><b>${olCrestHTML(K.me.av)} ${esc(K.me.name || t('Kamu'))}</b></div><div class="kal-vr"><div class="kal-vm r">${olMascot('wave', 170, K.opp.av)}</div><b>${esc(K.opp.name || t('Lawan'))} ${olCrestHTML(K.opp.av)}</b></div>
    <div class="kal-vx">VS</div><div class="kal-vst">ONLINE DUEL<small>${t(KAL_DIFFS.find(d => d[0] === K.diff)[1])} · ${t((KAL_MODES.find(m => m[0] === K.mode) || KAL_MODES[0])[1])}</small></div>`;
  sc.appendChild(vs); kfx('whoosh');
  kalLater(() => kfx('count', 0), 900); kalLater(() => kfx('count', 0), 1300); kalLater(() => kfx('count', 1), 1700);
  kalLater(() => { vs.classList.add('out'); kalLater(() => vs.remove(), 400); K.olT0 = performance.now(); olTurn(); olSt(true); }, 2100);
}
function olTurn() {
  const K = KAL; if (K.frozen) return;
  if (K.qi >= K.olTasks.length) { olDoneAll(); return; }
  const T = K.olTasks[K.qi]; T.el = 0; T.placed = T.type === 'gap' ? undefined : []; T.left = T.lim;
  K.task = T; K.state = 'play'; kalSetHero('happy'); kalPanel(); olBars();
  if (T.type === 'listen' && kalVoice()) kalLater(() => { if (K.task === T) kalSay(false); }, 300);
}
function olNext() { const K = KAL; if (!K || K.state !== 'anim' || K.frozen) return; olTurn(); }
function olSubmit(optJ, why) {
  const K = KAL; const T = K.task; if (!T || K.state !== 'play' || K.frozen) return;
  let ok = false, given = '';
  if (T.type === 'gap') { if (why !== 'time') { given = T.opts[optJ]; if (given === undefined) return; ok = given === T.g.w; } }
  else { if (why !== 'time' && T.placed.length < T.n) return; given = T.placed.map(j => T.cards[j].t).join(''); ok = why !== 'time' && given === T.s.h; }
  K.state = 'anim'; K.lastT = T; K.tot++; K.qi++;
  if (T.type === 'gap' && optJ !== null && optJ !== undefined) document.querySelectorAll('#kalpanel .kal-opt').forEach((b, j) => { b.disabled = true; if (T.opts[j] === T.g.w) b.classList.add('ok'); else if (j === optJ) b.classList.add('bad'); });
  const X = lgIdx(); const words = kalSegRaw(T.s.h).map(w => X.form.get(w)).filter(i => i !== undefined && lgOkW(i));
  if (ok) {
    K.ok++; K.combo++; K.maxCombo = Math.max(K.maxCombo, K.combo); words.forEach(i => { try { lgHitRec(i); } catch (e) {} });
    const sp = clamp(1 - Math.max(0, T.el - T.par * .4) / (T.par * 1.2), 0, 1);
    let dmg = (6 + 2.4 * T.n + .4 * T.s.h.length) * (1 + .6 * sp) * (1 + .1 * Math.min(10, K.combo - 1));
    if (T.type === 'listen') dmg *= 1.15; dmg = clamp(Math.round(dmg), 1, 120); const crit = sp > .75 || K.combo % 5 === 0;
    K.score += Math.round(dmg * 10 * KAL_D[K.diff].mul); kalReveal(true, given, why); olAttack(dmg, crit, T);
    kalLater(() => { if (K.state === 'anim' && K.lastT === T) olNext(); }, 1000);
  } else {
    K.combo = 0; K.miss.push({ s: T.s, g: T.type === 'gap' ? T.g.w : '' });
    if (T.type === 'gap' && T.g.i !== undefined) { try { lgMissRec(T.g.i); } catch (e) {} }
    else if (T.type !== 'gap') { const ch = T.s.chunks; let k = 0; while (k < T.placed.length && k < ch.length && T.cards[T.placed[k]].t === ch[k]) k++; const wi = kalSegRaw(ch[Math.min(k, ch.length - 1)]).map(w => X.form.get(w)).find(i => i !== undefined && lgOkW(i)); if (wi !== undefined) { try { lgMissRec(wi); } catch (e) {} } }
    kalReveal(false, given, why); olSelfHit();
  }
  kalScore(); olBars(); olSt();
}
function olCutIn(mine, combo) {
  const K = KAL; const cut = $('#kalcut'); if (!cut) return; const sp = KAL_SPELLS[(combo + (mine ? 0 : 3)) % KAL_SPELLS.length];
  const c = mine ? { c1: '#ff4f9a', c2: '#8b5cff' } : olCrest(K.opp.av);
  cut.className = 'kal-cut' + (mine ? '' : ' rv');
  cut.innerHTML = `<div class="kal-cutb" style="--c1:${c.c1};--c2:${c.c2}"><div class="kal-sl"></div><div class="kal-cm">${mine ? mascot('wow', 150) : olMascot('wow', 150, K.opp.av)}</div><div class="kal-ct"><b class="hz">${sp[0]}</b><span>${esc(mine ? t(sp[1]) : (K.opp.name || t('Lawan')) + ' · ' + t(sp[1]))}</span><i>${combo} COMBO!</i></div></div>`;
  void cut.offsetWidth; cut.classList.add('on', 'small');
  kalLater(() => cut.classList.remove('on'), 520);
}
function olAttack(dmg, crit, T) {
  const K = KAL; K.sn++; K.sent.push(dmg); K.dealt += dmg; const k = K.sn;
  K.ol.send({ e: 'atk', k, q: K.qi - 1, d: dmg, c: crit ? 1 : 0, cb: K.combo });
  kfx('ok', K.combo); kalSetHero('joy');
  const big = K.combo >= 3 && K.combo % 3 === 0; if (big) { olCutIn(true, K.combo); kfx('cast'); }
  const d0 = big ? 480 : 60;
  kalLater(() => { kalHeroAnim('atk', 650); K.fxs.push({ k: 'ring', x: K.hx, y: K.hy + K.hs * .42, r: K.hs * .62, c: '#ff9fd0', chs: [...T.s.h], t: 0, d: 1 }); }, d0);
  kalLater(() => {
    const x0 = K.hx + K.hs * .4, y0 = K.hy - K.hs * .08, x1 = K.bx, y1 = K.hy - K.hs * .05;
    K.fxs.push({ k: 'beam', x0, y0, x1, y1, w: 14 + Math.min(18, dmg / 3), c: crit ? '#ffd84a' : '#ff7fd0', t: 0, d: .55 });
    for (let i = 0; i < (big ? 3 : 2); i++) K.fxs.push({ k: 'star', x0, y0, x1: x1 + (i - 1) * 16, y1: y1 + (i - 1) * 14, arc: 36 + i * 28, r: 11, c: ['#ffd84a', '#7fe3ff', '#ff9fd0'][i], t: -i * .06, d: .65 });
    kfx('whoosh');
  }, d0 + 120);
  kalLater(() => {
    if (KAL !== K) return; K.land = Math.max(K.land, k); K.shake = crit ? 13 : 7; K.flash = crit ? .35 : .15; K.flashC = '#fff'; kfx(crit ? 'crit' : 'hit');
    const x1 = K.bx, y1 = K.hy - K.hs * .05; olRivAnim('hurt', 600); olRivSet('oops'); kalLater(() => { if (!K.frozen) olRivSet('happy'); }, 700);
    kalPart(x1, y1, crit ? 28 : 18, { cols: ['#fff', '#ffd84a', '#ff9fd0', '#7fe3ff'], sp: 240, d: .7, r: 6 });
    K.fxs.push({ k: 'wave', x: x1, y: y1, r: K.hs * .6, c: '#ffe14d', t: 0, d: .45 });
    K.txts.push({ s: (crit ? '!' : '') + dmg, x: x1 + (Math.random() - .5) * 30, y: y1 - K.hs * .3, sz: crit ? 44 : 34, t: 0, d: 1.1, c1: crit ? '#ffe14d' : '#ffd0ea', c2: crit ? '#ff5a3d' : '#ff4f9a' });
    if (crit) K.txts.push({ s: 'CRITICAL!', x: x1, y: y1 - K.hs * .55, sz: 20, t: 0, d: 1, c1: '#fff7b0', c2: '#ffb02e' });
    olBars();
  }, d0 + 420);
}
function olSelfHit() {
  const K = KAL; kfx('bad'); kalSetHero('oops'); K.hp = Math.max(0, K.hp - KAL_OL_SELF);
  kalHeroAnim('hurt', 600); K.shake = 6; K.flash = .2; K.flashC = '#ff2a4a';
  K.txts.push({ s: '-' + KAL_OL_SELF, x: K.hx, y: K.hy - K.hs * .45, sz: 28, t: 0, d: 1, c1: '#ffd0d8', c2: '#ff2a4a' });
  olBars(); if (K.hp <= 0) olFreeze('ko');
}
function olRecvAtk(m) {
  const K = KAL; if (K.frozen) return;
  const k = m.k | 0; if (k <= K.rx || k > 999) return; K.rx = k; K.os.sn = Math.max(K.os.sn, k);
  const d = clamp(Math.round(+m.d || 0), 0, 120); const crit = !!m.c; const cb = clamp(m.cb | 0, 0, 99); const c = olCrest(K.opp.av);
  K.hp = Math.max(0, K.hp - d); K.os.cb = cb; olBars(); olSt();
  const big = cb >= 3 && cb % 3 === 0; if (big) olCutIn(false, cb);
  const d0 = big ? 420 : 0;
  kalLater(() => {
    olRivAnim('atk', 650); olRivSet('joy'); kfx('boss');
    const x0 = K.bx - K.hs * .35, y0 = K.hy - K.hs * .08;
    for (let i = 0; i < (big ? 3 : 2); i++) K.fxs.push({ k: 'orb', x0, y0, x1: K.hx + (i - 1) * 14, y1: K.hy + (i - 1) * 12, arc: (i - 1) * 50, r: 20 + (crit ? 6 : 0), c: c.c1, t: -i * .08, d: .55 });
  }, d0);
  kalLater(() => {
    if (KAL !== K) return; K.shake = crit ? 14 : 9; K.flash = crit ? .4 : .25; K.flashC = c.c1; kfx('hurt'); kalHeroAnim('hurt', 650); if (K.state !== 'anim') kalSetHero('oops');
    kalPart(K.hx, K.hy, crit ? 22 : 14, { cols: [c.c1, c.c2, '#fff'], sp: 200, d: .6, r: 6 });
    K.txts.push({ s: '-' + d, x: K.hx, y: K.hy - K.hs * .45, sz: crit ? 40 : 32, t: 0, d: 1.1, c1: '#ffd0d8', c2: '#ff2a4a' });
    kalLater(() => { if (!K.frozen) olRivSet('happy'); if (K.state === 'play') kalSetHero('happy'); }, 700);
  }, d0 + 380);
  if (K.hp <= 0) kalLater(() => olFreeze('ko'), d0 + 450);
}
function olMsg(m) {
  const K = KAL; if (!K || !K.ol || !m || m.from !== K.opp.id) return;
  if (m.e === 'st') olApplySt(m);
  else if (m.e === 'atk') olRecvAtk(m);
  else if (m.e === 'fin') { if (!K.ofin) K.ofin = olFinOf(m, K.opp.id); olApplySt(m); if (!K.frozen) olFreeze('opp'); olCheckRes(); return; }
  else if (m.e === 'rq') { olSt(true); }
  if (K.frozen && !K.resShown && !K.ofin) olSendFin();
}
function olFinOf(m, id) { const K = KAL; return { hp: clamp(Math.ceil(+m.hp || 0), 0, K.maxHp), ok: clamp(m.ok | 0, 0, 99), tot: clamp(m.tot | 0, 0, 99), mc: clamp(m.mc | 0, 0, 99), tm: clamp(+m.tm || 0, 0, 36e5), dn: m.dn ? 1 : 0, id }; }
function olApplySt(m) {
  const K = KAL; const o = K.os; const N = K.olTasks.length;
  o.hp = Math.min(o.hp, clamp(Math.ceil(+m.hp || 0), 0, K.maxHp)); o.q = Math.max(o.q, clamp(m.q | 0, 0, N)); o.cb = clamp(m.cb | 0, 0, 99);
  o.ok = clamp(m.ok | 0, 0, 99); o.tot = clamp(m.tot | 0, 0, 99); o.sn = Math.max(o.sn, clamp(m.sn | 0, 0, 999)); o.rx = Math.max(o.rx, clamp(m.rx | 0, 0, K.sn));
  o.dn = o.dn || (m.dn ? 1 : 0); if (m.dn) o.tm = clamp(+m.tm || 0, 0, 36e5); o.mc = clamp(m.mc | 0, 0, 99);
  olBars();
  if (o.hp <= 0 && !K.frozen) { olRivAnim('hurt', 900); olRivSet('oops'); olFreeze('win'); }
  olCheckDone();
}
function olCheckDone() { const K = KAL; if (!K.frozen && K.done && K.os.dn && K.os.rx >= K.sn && K.rx >= K.os.sn) olFreeze('done'); }
function olDoneAll() {
  const K = KAL; K.done = 1; K.doneT = Math.round(performance.now() - (K.olT0 || performance.now())); K.state = 'wait'; K.task = null;
  kfx('clear'); kalBanner(`<b>${t('SELESAI!')}</b><span>${kI('star')} ${t('Semua kalimat selesai!')}</span>`, 'clear', 1800); kalHeroAnim('win', 1600); kalSetHero('joy');
  olWaitPanel(); olSt(true); olCheckDone();
}
function olWaitPanel() {
  const K = KAL; const pn = $('#kalpanel'); if (!pn) return; const N = K.olTasks.length;
  const h = `<div class="kal-wait ol"><span class="hz">等一下</span><b>${t('Menunggu {n}…', { n: esc(K.opp.name || t('Lawan')) })}</b><div class="kal-wprog"><i style="transform:scaleX(${(N ? Math.min(N, K.os.q) / N : 0).toFixed(3)})"></i></div><small>${t('Soal')} ${Math.min(N, K.os.q)}/${N}</small></div>`;
  if (pn.innerHTML !== h) pn.innerHTML = h;
}
function olMyFin() { const K = KAL; return { hp: Math.ceil(K.hp), ok: K.ok, tot: K.tot, mc: K.maxCombo, tm: K.doneT, dn: K.done, id: K.me.id }; }
function olSendFin() { const K = KAL; if (!K || !K.fin || K.resShown) return; try { K.ol.send(Object.assign({ e: 'fin', q: K.qi, sn: K.sn, rx: K.rx, cb: 0 }, K.fin)); } catch (e) {} }
function olFreeze(why) {
  const K = KAL; if (!K || K.frozen) return; K.frozen = why; K.state = 'wait'; K.task = null; clearTimeout(K.stT);
  K.fin = olMyFin(); olSendFin();
  if (why === 'ko') { kfx('lose'); kalSetHero('oops'); kalHeroAnim('hurt', 900); olRivSet('joy'); kalBanner(`<b>K.O.</b><span>${esc(K.me.name || t('Kamu'))}</span>`, 'ko', 1700); }
  else if (why === 'win' || why === 'opp' && K.os.hp <= 0) { kfx('clear'); kalSetHero('joy'); kalHeroAnim('win', 1600); olRivSet('oops'); kalBanner(`<b>K.O.!</b><span>${esc(K.opp.name || t('Lawan'))}</span>`, 'clear', 1700); }
  const pn = $('#kalpanel'); if (pn) pn.innerHTML = `<div class="kal-wait ol"><span class="hz">${why === 'ko' ? '倒下' : '結束'}</span><b>${t('Menunggu {n}…', { n: esc(K.opp.name || t('Lawan')) })}</b><div class="kal-spin2"></div></div>`;
  const rs = () => { if (KAL === K && !K.resShown) { olSendFin(); kalLater(rs, 1500); } }; kalLater(rs, 1500);
  kalLater(() => { if (KAL === K && !K.resShown && !K.ofin) { K.ofin = olFinOf(Object.assign({}, K.os), K.opp.id); olResults(); } }, 7000);
  olCheckRes();
}
function olCheckRes() { const K = KAL; if (K.fin && K.ofin && !K.resShown && !K.resPend) { K.resPend = 1; kalLater(olResults, 1500); } }
function olLeave(id) {
  const K = KAL; if (!K || !K.ol || K.oppLeft) return; if (id !== 'host' && id !== K.opp.id) return;
  K.oppLeft = 1; try { toast(t('{n} keluar', { n: K.opp.name || t('Lawan') })); } catch (e) {}
  if (K.resShown) { const b = document.querySelector('#kalscr [data-k=olagain]'); if (b) b.disabled = !K.ol.host; return; }
  if (!K.frozen) { K.frozen = 'left'; K.state = 'wait'; K.task = null; K.fin = olMyFin(); }
  K.ofin = olFinOf(Object.assign({}, K.os), K.opp.id); olResults();
}
function olStatus(s) {
  const K = KAL; K.net = s; const n = $('#kalnet'); if (n) n.innerHTML = s === 'down' ? kI('wifioff') : '';
  const b = $('#kalbossbar'); if (b) b.classList.toggle('down', s === 'down');
  if (s === 'down') { try { toast(t('Koneksi terputus…')); } catch (e) {} } else olResync();
}
function olCmp(a, b) {
  const al = a.hp > 0, bl = b.hp > 0; if (al !== bl) return al ? 1 : -1;
  if (a.hp !== b.hp) return a.hp - b.hp;
  if (a.dn && b.dn && a.tm !== b.tm) return b.tm - a.tm;
  if (a.ok !== b.ok) return a.ok - b.ok;
  return String(a.id) < String(b.id) ? 1 : -1;
}
function olFmtT(ms, dn) { if (!dn) return '—'; const s = Math.round(ms / 1000); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
function olResults() {
  const K = KAL; if (!K || K.resShown) return; K.resShown = 1; kalClearTimers(); clearTimeout(K.stT); K.state = 'end'; K.task = null; kmStop();
  try { TTS.stop(); } catch (e) {}
  const me = K.fin || olMyFin(), op = K.ofin || olFinOf(K.os, K.opp.id); const win = K.oppLeft ? true : olCmp(me, op) > 0;
  const acc = K.tot ? K.ok / K.tot : 0; if (win && K.tot) K.score += 1000 + me.hp * 5;
  const pb = K.tot ? arenaRecord('kal', K.score, acc) : false; const xp = K.tot ? Math.min(90, 6 + K.ok * 2 + (win ? 15 : 0)) : 0;
  if (xp) { try { addXP(xp, true); } catch (e) {} }
  kalLater(() => kfx(win ? 'win' : 'lose'), 200); kalSetHero(win ? 'joy' : 'oops'); olRivSet(win ? 'oops' : 'joy');
  const nm = esc(K.opp.name || t('Lawan')), mine = esc(K.me.name || t('Kamu'));
  const why = K.oppLeft ? t('{n} keluar — kamu menang', { n: nm }) : (me.hp <= 0 || op.hp <= 0) ? t('{n} K.O.!', { n: op.hp <= 0 && me.hp > 0 ? nm : me.hp <= 0 && op.hp > 0 ? mine : nm + ' & ' + mine }) : me.hp === op.hp ? t('HP seri — yang lebih cepat menang') : t('HP lebih tinggi menang');
  const a = olCrest(K.me.av), b = olCrest(K.opp.av);
  const rows = [[t('HP tersisa'), me.hp, op.hp, 1], [t('Benar'), `${me.ok}/${me.tot}`, `${op.ok}/${op.tot}`, 0, me.ok, op.ok], [t('Akurasi'), `${me.tot ? Math.round(me.ok / me.tot * 100) : 0}%`, `${op.tot ? Math.round(op.ok / op.tot * 100) : 0}%`, 0, me.tot ? me.ok / me.tot : 0, op.tot ? op.ok / op.tot : 0], [t('Combo maks'), me.mc, op.mc, 1], [t('Waktu'), olFmtT(me.tm, me.dn), olFmtT(op.tm, op.dn), 0, me.dn ? -me.tm : -1e9, op.dn ? -op.tm : -1e9]];
  const seen = new Set(); const miss = K.miss.filter(m => !seen.has(m.s.h) && seen.add(m.s.h)); K.missL = miss;
  const sc = $('#kalscr'); sc.querySelectorAll('.kal-pause').forEach(x => x.remove()); K.olConf = 0;
  sc.insertAdjacentHTML('beforeend', `<div class="kal-res ol ${win ? 'win' : 'lose'}"><div class="kal-rcard">
    <div class="kal-ovs"><div class="kal-rays"></div>
      <div class="kal-os me ${win ? 'w' : 'l'}" style="--c1:${a.c1};--c2:${a.c2}"><div class="kal-oa">${mascot(win ? 'joy' : 'oops', 130)}</div><div class="kal-on">${olCrestHTML(K.me.av)}<b>${mine}</b></div><i>${win ? 'WIN' : 'LOSE'}</i></div>
      <div class="kal-ovx">VS</div>
      <div class="kal-os op ${win ? 'l' : 'w'}" style="--c1:${b.c1};--c2:${b.c2}"><div class="kal-oa r">${olMascot(win ? 'oops' : 'joy', 130, K.opp.av)}</div><div class="kal-on">${olCrestHTML(K.opp.av)}<b>${nm}</b></div><i>${K.oppLeft ? t('Keluar') : win ? 'LOSE' : 'WIN'}</i></div></div>
    <h2>${win ? t('MENANG!') : t('KALAH…')}</h2><p class="kal-rsub">${why}${pb ? ` · <b class="kal-pb">${t('Rekor baru!')}</b>` : ''}</p>
    <div class="kal-otab">${rows.map(r => { const va = r[3] ? +r[1] : r[4], vb = r[3] ? +r[2] : r[5]; return `<div class="kal-or"><b class="${va > vb ? 'best' : ''}">${r[1]}</b><small>${r[0]}</small><b class="${vb > va ? 'best' : ''}">${r[2]}</b></div>`; }).join('')}</div>
    <div class="kal-stats ol"><div><small>${t('Skor')}</small><b>${fmtN(K.score)}</b></div><div><small>XP</small><b>+${xp}</b></div></div>
    <div class="kal-miss"><h4>${t('Kalimat yang perlu diulang')}</h4>${miss.length ? miss.slice(0, 16).map((m, i) => `<div class="kal-mi"><button class="kal-gb" data-k="osay" data-v="${i}" aria-label="${t('Dengar lagi')}">${kI('spk')}</button><div><b class="hz">${m.g ? esc(m.s.h).replace(esc(m.g), `<u>${esc(m.g)}</u>`) : esc(m.s.h)}${esc((m.s.zh.match(/[。？！]+$/) || [''])[0])}${lvBadgeS(m.s.zh, { cls: 'solid' })}</b><small>${esc(kalPyStr(m.s))}</small><span>${esc(m.s.tr)}</span></div></div>`).join('') : `<p class="kal-perf">${kI('star')} ${t('Semua benar — sempurna!')}</p>`}</div>
    <div class="kal-rbtn"><button class="kal-gb2" data-k="olquit">${kI('back')}<span>${t('Keluar')}</span></button><button class="kal-start" data-k="olagain" ${K.oppLeft && !K.ol.host ? 'disabled' : ''}>${kI('reset')}<span>${t('Main lagi')}</span></button></div>
  </div></div>`);
}
function olConfirm(on) {
  const K = KAL; if (!K || !K.ol) return; const sc = $('#kalscr'); const old = sc && sc.querySelector('.kal-pause'); K.olConf = on ? 1 : 0;
  if (!on) { if (old) old.remove(); return; }
  if (old || !sc) return; const p = document.createElement('div'); p.className = 'kal-pause ol';
  p.innerHTML = `<div class="kal-pcard"><b>${t('Keluar dari duel?')}</b><p>${t('Lawanmu akan menang.')}</p><button class="kal-start" data-k="olstay">${kI('play')}<span>${t('Lanjut')}</span></button><button class="kal-gb2" data-k="olquit">${kI('x')}<span>${t('Keluar')}</span></button></div>`;
  sc.appendChild(p);
}
function olQuit() { const K = KAL; const ctx = K && K.ol; try { if (ctx) ctx.leave(); } catch (e) {} kalClose(); }
function olAgain() { const K = KAL; const ctx = K && K.ol; kalClose(true); try { if (ctx) ctx.rematch(); } catch (e) {} }

/* ---------- daftar di hub Arena ---------- */
ARENA.reg({
  k: 'kal', ord: 3, title: 'Duel Kalimat', zh: '句子大作戰', desc: 'Susun kartu-kata jadi kalimat, isi yang hilang, dengar lalu susun — kalahkan boss anime!',
  tags: ['Kalimat', 'Tata bahasa', 'Dengar'], c1: '#8b5cff', c2: '#ff4f9a',
  icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="10" height="14" rx="2.2"/><path d="M6.5 11h3M6.5 15h2"/><path d="M15.5 6.5l2-3.5M19 9.5l2.5-1M17 13.5l3 1.5"/><path d="M13 9l3 1.2"/></svg>',
  art: `<svg class="ar-ill" viewBox="0 0 320 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><radialGradient id="kalg1" cx=".72" cy=".45" r=".6"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><linearGradient id="kalg2" x1="0" x2="1"><stop offset="0" stop-color="#ffd84a"/><stop offset="1" stop-color="#ff7fd0"/></linearGradient></defs>
    <rect width="320" height="150" fill="url(#kalg1)"/>
    <g stroke="#fff" stroke-opacity=".28" stroke-width="2">${Array.from({ length: 14 }, (_, i) => { const a = i / 14 * Math.PI * 2; return `<path d="M${226 + Math.cos(a) * 40} ${66 + Math.sin(a) * 40}L${226 + Math.cos(a) * 190} ${66 + Math.sin(a) * 190}"/>`; }).join('')}</g>
    <g transform="translate(232 70)" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="2"><ellipse rx="64" ry="24"/><ellipse rx="50" ry="18"/><path d="M-50 0L25 -15 -15 17 30 12 -40 -12" stroke-opacity=".5"/></g>
    <g stroke="${KAL_OL}" stroke-width="3.5" stroke-linejoin="round">
      <path d="M200 92h34l-8 22 26-34h-26l10-18z" fill="#ffd84a"/>
      <g fill="#eeeaff"><circle cx="205" cy="62" r="22"/><circle cx="232" cy="46" r="28"/><circle cx="262" cy="58" r="22"/><circle cx="246" cy="76" r="20"/><circle cx="218" cy="78" r="19"/></g></g>
    <g fill="#eeeaff"><circle cx="205" cy="62" r="19"/><circle cx="232" cy="46" r="25"/><circle cx="262" cy="58" r="19"/><circle cx="246" cy="76" r="17"/><circle cx="218" cy="78" r="16"/></g>
    <g stroke="${KAL_OL}" stroke-linecap="round" stroke-width="3.5"><path d="M210 46l14 6M256 46l-14 6"/></g>
    <ellipse cx="219" cy="58" rx="6" ry="7.5" fill="#fff" stroke="${KAL_OL}" stroke-width="2.5"/><ellipse cx="247" cy="58" rx="6" ry="7.5" fill="#fff" stroke="${KAL_OL}" stroke-width="2.5"/><circle cx="220" cy="60" r="3.6" fill="#5b7bff"/><circle cx="248" cy="60" r="3.6" fill="#5b7bff"/>
    <path d="M226 72q7 -6 14 0" fill="none" stroke="${KAL_OL}" stroke-width="3" stroke-linecap="round"/><ellipse cx="208" cy="70" rx="5" ry="2.6" fill="#ff7fa8" opacity=".6"/><ellipse cx="258" cy="70" rx="5" ry="2.6" fill="#ff7fa8" opacity=".6"/>
    <g font-family='${KAL_HF}' font-weight="900" font-size="22" text-anchor="middle" stroke="${KAL_OL}" stroke-width="3">
      <g transform="rotate(-12 96 46)"><rect x="76" y="22" width="40" height="48" rx="8" fill="#fff"/><text x="96" y="56" fill="#d93a74" stroke="none">句</text></g>
      <g transform="rotate(6 140 70)"><rect x="120" y="46" width="40" height="48" rx="8" fill="#fff"/><text x="140" y="80" fill="#8b5cff" stroke="none">子</text></g>
      <g transform="rotate(-8 112 112)"><rect x="92" y="88" width="40" height="48" rx="8" fill="#fff"/><text x="112" y="122" fill="#ff8a2a" stroke="none">戰</text></g></g>
    <path d="M118 30L188 58" stroke="url(#kalg2)" stroke-width="7" stroke-linecap="round"/><path d="M118 30L188 58" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
    <g fill="#fff"><path d="M30 30q0 8 8 8q-8 0 -8 8q0 -8 -8 -8q8 0 8 -8z"/><path d="M296 120q0 6 6 6q-6 0 -6 6q0 -6 -6 -6q6 0 6 -6z"/><path d="M170 120q0 5 5 5q-5 0 -5 5q0 -5 -5 -5q5 0 5 -5z"/></g>
    <g font-family="sans-serif" font-weight="900" font-size="15" fill="#fff" stroke="${KAL_OL}" stroke-width="3" paint-order="stroke"><text x="200" y="128">-42!</text></g>
  </svg>`,
  start(pool) { kalOpen(pool); }
});
/* twindata.js — generated by /tmp/claude-0/v9/twin/gen.py (stroke data: hanzi-writer-data, Arphic PL licence) */