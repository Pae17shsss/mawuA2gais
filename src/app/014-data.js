/* ========== DATA ========== */
const D = window.XB_DATA;
const W = D.words; W.forEach((w, i) => (w.i = i));
const CH = D.chars;
// deck semikonduktor ASE: disambung ke daftar kata utama supaya memakai SRS, kuis, dan suara yang sama
if (typeof SEMI !== 'undefined') {
  SEMI_CATS.forEach(cat => {
    (SEMI[cat.k] || []).forEach(e => {
      W.push({ i: W.length, l: SEMI_LV, w: e[0], s: e[0], p: e[1], y: e[1].split(' '), t: e[2], o: 'N', c: cat.k, m: [e[3], e[4], e[5]], semi: 1 });
    });
  });
}
// materi kelas (build khusus): kata lesson disambung ke daftar utama
if (typeof klsInject === 'function') klsInject(W);
let KLS_ON = false;   // selama sesi kelas: arti kata diambil dari lesson
const A2 = W.filter(w => w.l < 4);
const A2N = A2.length;
const DAY = 864e5;
const LANGS = ['id', 'en', 'tl'];
const MEAN_LANGS = ['id', 'en', 'tl', 'vi'];          // bahasa arti: data asli id/en/tl + lapisan Vietnam (vi.js)
const LANG_LABEL = { id: 'ID', en: 'EN', tl: 'PH', vi: 'VI' };
const LANG_NAME = { id: 'Indonesia', en: 'English', tl: 'Filipino', vi: 'Tiếng Việt' };
const UI_LANGS = ['id', 'en', 'tl', 'vi'];
// bahasa arti kata mengikuti bahasa utama; Vietnam diterjemahkan dari teks Inggris lewat VIX
const meanLang = () => (MEAN_LANGS.includes(S.settings.primary) ? S.settings.primary : 'en');
const isVI = () => meanLang() === 'vi';
const VX_MISS = new Set();   // teks yang belum punya terjemahan Vietnam (untuk pengecekan)
const vx = en => { if (!en) return en; const v = typeof VIX !== 'undefined' && VIX[en]; if (!v && /[a-z]/i.test(en)) VX_MISS.add(en); return v || en; };
/* ambil teks dari larik [id, en, tl] (mulai di indeks base) sesuai bahasa arti */
function L3(arr, base = 0) { if (!arr) return ''; if (isVI()) return vx(arr[base + 1]) || arr[base]; return arr[base + primIdx()] || arr[base]; }
/* arti kata dalam bahasa tertentu */
function wMean(w, l = meanLang()) { if (w.km && (KLS_ON || w.kls)) return w.km[l] || w.km.en; if (!w.m) return ''; if (l === 'vi') return w.mv || vx(w.m[1]); return w.m[LANGS.indexOf(l)] || w.m[1]; }
const LEVELS = [
  { name: '準備一級', en: 'Novice 1', cefr: 'Pre-A1', nick: 'Tunas', e: '🌱' },
  { name: '準備二級', en: 'Novice 2', cefr: 'A1−', nick: 'Kuncup', e: '🌿' },
  { name: '入門級', en: 'Level 1', cefr: 'A1', nick: 'Mekar', e: '🌸' },
  { name: '基礎級', en: 'Level 2', cefr: 'A2', nick: 'Berbuah', e: '🍑' },
  { name: '進階級', en: 'Level 3', cefr: 'B1', nick: 'Pohon', e: '🌳' },
  { name: '高階級', en: 'Level 4', cefr: 'B2', nick: 'Hutan', e: '⛰️' },
  { name: '流利級', en: 'Level 5', cefr: 'C1', nick: 'Langit', e: '🌌' },
  { name: '半導體', en: 'ASE Semikonduktor', cefr: 'Kerja', nick: 'Pabrik', e: '🏭' }
];
const CTX = {
  '個人資料': ['Diri & keluarga', 'Personal', 'Sarili at pamilya', '🙋'],
  '健康及身體照護': ['Tubuh & kesehatan', 'Health & body', 'Katawan at kalusugan', '🩺'],
  '其他': ['Kata penting lain', 'Other essentials', 'Iba pa', '✨'],
  '工作': ['Pekerjaan', 'Work', 'Trabaho', '💼'],
  '房屋與家庭、環境': ['Rumah & lingkungan', 'Home & environment', 'Bahay at paligid', '🏠'],
  '教育': ['Sekolah & belajar', 'Education', 'Eskwela', '📚'],
  '旅行': ['Jalan-jalan & arah', 'Travel', 'Biyahe', '🧭'],
  '日常生活': ['Keseharian', 'Daily life', 'Araw-araw', '☀️'],
  '與他人的關係': ['Bergaul', 'Social', 'Pakikisama', '🤝'],
  '購物': ['Belanja', 'Shopping', 'Pamimili', '🛍️'],
  '閒暇時間、娛樂': ['Santai & hiburan', 'Leisure', 'Libangan', '🎈'],
  '飲食': ['Makan & minum', 'Food & drink', 'Pagkain', '🍜']
};
Object.assign(CTX, {"半導體前段": ["Fab: proses wafer", "Fab: wafer process", "Fab: proseso ng wafer", "🏭"], "無塵室": ["Cleanroom & keselamatan", "Cleanroom & safety", "Cleanroom at kaligtasan", "🧪"], "半導體基礎": ["Dasar semikonduktor", "Semiconductor basics", "Batayan ng semiconductor", "🔬"], "封裝測試": ["Packaging & testing", "Packaging & testing", "Packaging at testing", "📦"], "設備維護": ["Perawatan mesin", "Equipment maintenance", "Maintenance ng makina", "🔧"], "工廠生活": ["Kerja di pabrik", "Factory life", "Buhay sa pabrika", "👷"], "課堂學習": ["Kuliah & kelas", "Classes & studying", "Klase at pag-aaral", "🎓"], "電學電路": ["Listrik & rangkaian", "Electricity & circuits", "Kuryente at circuit", "⚡"], "量測儀器": ["Alat ukur", "Measuring instruments", "Instrumento ng sukat", "📏"], "機電控制": ["Mekatronika & kontrol", "Mechatronics & control", "Mechatronics at kontrol", "⚙️"], "程式與嵌入式": ["Pemrograman & embedded", "Programming & embedded", "Programming at embedded", "💻"], "實驗室安全": ["Lab & keselamatan", "Lab & safety", "Lab at kaligtasan", "🥽"], "口語表達": ["Ungkapan lisan", "Spoken expressions", "Pananalita", "💬"], "動詞補語": ["Kata kerja + pelengkap", "Verb complements", "Pandiwa + komplemento", "🔗"], "生活情境": ["Hidup di Taiwan", "Living in Taiwan", "Buhay sa Taiwan", "🏠"]});
const POS = { N: 'kata benda', V: 'kata kerja', Vi: 'kata kerja intransitif', Vs: 'kata sifat', 'Vs-attr': 'kata sifat (atributif)', 'Vs-pred': 'kata sifat (predikat)', Vst: 'kata kerja keadaan', Vp: 'kata kerja proses', Vpt: 'kata kerja proses', Vaux: 'kata kerja bantu', 'V-sep': 'kata kerja pisah', 'Vs-sep': 'sifat pisah', 'Vp-sep': 'proses pisah', Adv: 'kata keterangan', M: 'kata bantu bilangan', Ptc: 'partikel', Conj: 'konjungsi', conj: 'konjungsi', Prep: 'preposisi', Det: 'penentu' };
const posLabel = o => (o || '').split('/').map(x => (POS[x.trim()] ? t(POS[x.trim()]) : x)).filter(Boolean).join(' · ');

// units: per level, grouped by context, chunks of up to 8
const UNITS = [];
for (let lv = 0; lv < 8; lv++) {
  const ws = W.filter(w => w.l === lv);
  const groups = [];
  if (lv < 4 || lv === 7) {
    const order = [];
    const by = {};
    ws.forEach(w => { if (!by[w.c]) { by[w.c] = []; order.push(w.c); } by[w.c].push(w.i); });
    order.forEach(c => { const ids = by[c]; const n = Math.ceil(ids.length / 8); const size = Math.ceil(ids.length / n); for (let k = 0; k < n; k++) groups.push({ ctx: c, ids: ids.slice(k * size, (k + 1) * size), part: n > 1 ? k + 1 : 0 }); });
  } else {
    for (let k = 0; k < ws.length; k += 40) groups.push({ ctx: null, ids: ws.slice(k, k + 40).map(w => w.i), part: k / 40 + 1 });
  }
  groups.forEach((g, k) => { g.lv = lv; g.k = k; g.id = lv + '-' + k; });
  UNITS.push(groups);
}
const A2_ORDER = [].concat(...UNITS.slice(0, 4).map(us => [].concat(...us.map(u => u.ids))));
const UNIT_OF = {}; UNITS.forEach(us => us.forEach(u => u.ids.forEach(i => (UNIT_OF[i] = u))));

const isHan = c => /[\u3400-\u9fff]/.test(c);
const CHAR_LV = {}; const CHAR_WORDS = {};
A2_ORDER.forEach(i => { const w = W[i]; [...w.s].forEach(c => { if (!isHan(c)) return; if (CHAR_LV[c] === undefined) CHAR_LV[c] = w.l; (CHAR_WORDS[c] = CHAR_WORDS[c] || []).push(i); }); });
const CHAR_ORDER = Object.keys(CHAR_LV);

const RADICALS = [
  ['亻', 'orang', 'Orang berdiri menyamping — hampir selalu soal manusia.'],
  ['氵', 'air', 'Tiga tetes air di pinggir: sungai, laut, cuci, sup.'],
  ['扌', 'tangan', 'Tangan dengan jari: memukul, menarik, mengambil.'],
  ['口', 'mulut', 'Kotak kecil = mulut terbuka: bicara, makan, partikel.'],
  ['木', 'pohon', 'Pohon dengan akar: kayu, meja, kursi, rak.'],
  ['艹', 'rumput', 'Dua tunas di atas kepala: bunga, sayur, teh, obat.'],
  ['忄', 'hati', 'Hati berdiri tegak di kiri: perasaan (sibuk, takut).'],
  ['心', 'hati', 'Jantung dengan tiga titik di bawah: pikiran & rasa.'],
  ['訁', 'kata', 'Mulut dengan garis suara: bicara, bahasa, tanya.'],
  ['糹', 'benang', 'Gulungan benang: ikat, kertas, warna, hubungan.'],
  ['金', 'logam', 'Tumpukan emas di tambang: uang, jam, cermin, kunci.'],
  ['月', 'tubuh / bulan', 'Di kiri biasanya daging tubuh (腳 kaki, 臉 wajah).'],
  ['日', 'matahari', 'Jendela matahari: waktu, terang, hari.'],
  ['辶', 'jalan', 'Seperti orang naik skuter di bawah: pergi, dekat, jauh.'],
  ['宀', 'atap', 'Atap rumah dengan cerobong: rumah, kamar, aman.'],
  ['女', 'wanita', 'Wanita berlutut: ibu, kakak, nama keluarga.'],
  ['子', 'anak', 'Bayi dibedong: anak, belajar, huruf.'],
  ['土', 'tanah', 'Gundukan tanah: tempat, kota, lokasi.'],
  ['灬', 'api', 'Empat api kompor di bawah: panas, masak, hitam.'],
  ['火', 'api', 'Api unggun: lampu, bakar, panggang.'],
  ['貝', 'uang', 'Kerang kuno = uang: beli, mahal, jual.'],
  ['車', 'kendaraan', 'Mobil dari atas: roda + poros.'],
  ['門', 'pintu', 'Pintu saloon dua daun: tanya, antara, buka.'],
  ['足', 'kaki', 'Lutut + telapak: lari, lompat, jalan.'],
  ['目', 'mata', 'Mata berdiri: lihat, tidur, mata.'],
  ['石', 'batu', 'Batu jatuh dari tebing: nomor, mangkuk.'],
  ['禾', 'padi', 'Padi merunduk: waktu panen, musim, jenis.'],
  ['⺮', 'bambu', 'Dua daun bambu di atas: sumpit, pena, kotak.'],
  ['飠', 'makanan', 'Tudung saji: nasi, lapar, kenyang, pangsit.'],
  ['衤', 'baju', 'Baju dengan kerah: celana, rok, kaus kaki.'],
  ['礻', 'dewa / altar', 'Meja sesajen: berkah, upacara, doa.'],
  ['疒', 'sakit', 'Ranjang rumah sakit: sakit, nyeri, kurus.'],
  ['阝', 'kota / bukit', 'Seperti telinga di sisi: kota (kanan) atau bukit (kiri).'],
  ['刂', 'pisau', 'Pisau berdiri di kanan: potong, sampai, depan.'],
  ['攵', 'tangan memukul', 'Tangan memegang tongkat: ajar, ubah.'],
  ['彳', 'langkah', 'Dua orang melangkah: jalan, belakang, mendapat.'],
  ['广', 'bangunan', 'Atap tanpa dinding kanan: toko, dapur, ranjang.'],
  ['犭', 'binatang', 'Anjing berdiri: anjing, kucing-kucingan.'],
  ['雨', 'hujan', 'Tetes air di bawah langit: hujan, salju, listrik.'],
  ['頁', 'kepala', 'Kepala dengan leher: kepala, soal, warna wajah.'],
  ['隹', 'burung', 'Burung ekor pendek: siapa, ayam, sulit.'],
  ['鳥', 'burung', 'Burung lengkap dengan kaki: burung, gagak.'],
  ['馬', 'kuda', 'Kuda berlari dengan 4 kaki: ibu (bunyi mā), tanya (ma).'],
  ['力', 'tenaga', 'Lengan kekar: usaha, bantu, bergerak.'],
  ['囗', 'pagar', 'Pagar besar mengelilingi: negara, taman, gambar.'],
  ['冫', 'es', 'Dua tetes beku: dingin, es, sejuk.']
];
