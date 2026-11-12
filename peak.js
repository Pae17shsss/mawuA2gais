/* ========== V1.7 peak.js — lapisan "puncak potensi" ==========
   Dimuat SESUDAH app.js dan SEBELUM boot() (lihat index.html: XB_DEFER_BOOT).
   Isi:
     1. Ketahanan data  — penjaga antar-tab, snapshot berjenjang, kode progres XB2 ber-checksum,
                          status penyimpanan, pemulihan dari karantina, log jawaban (IndexedDB)
     2. Mesin belajar   — nilai FSRS 4 tingkat dari waktu jawab, peluruhan matriks nada,
                          pembaca kelelahan yang meringankan Sesi pintar
     3. Rasa            — getar, garis nada pada jawaban benar, transisi antar rute, tema Malam
   Semua dibungkus satu IIFE supaya tidak menambah nama global. Kalau file ini gagal dimuat,
   index.html tetap memanggil boot() dan app berjalan seperti V1.6. */
(function () {
  const PK = { last: null, foreign: 0, dirty: false, dt: 0, unloading: false, booted: false, rev: [], revT: 0 };
  window.XB_PEAK = PK;

  /* ---------- teks ---------- */
  Object.assign(I18N, {
    'Malam': ['Night', 'Gabi'],
    'Penyimpanan & keamanan progres': ['Storage & progress safety', 'Storage at kaligtasan ng progress'],
    'Penyimpanan permanen': ['Persistent storage', 'Permanenteng storage'],
    'aktif — browser tidak akan menghapus progresmu sendiri': ['on — the browser will not clear your progress by itself', 'naka-on — hindi buburahin ng browser ang progress mo'],
    'belum aktif — pasang app ke layar utama supaya progres tidak dihapus browser': ['not yet — install the app to your home screen so the browser cannot clear your progress', 'hindi pa — i-install ang app sa home screen para hindi mabura ng browser ang progress'],
    'Aktifkan': ['Turn on', 'I-on'],
    'Terpakai': ['Used', 'Nagamit'],
    'Cadangan terakhir': ['Last backup', 'Huling backup'],
    'belum pernah': ['never', 'hindi pa'],
    'hari ini': ['today', 'ngayon'],
    '{n} hari lalu': ['{n} days ago', '{n} araw na ang nakalipas'],
    'Riwayat jawaban tersimpan': ['Answers on record', 'Mga sagot na naka-record'],
    'Getar': ['Vibration', 'Vibration'],
    'Getaran halus saat menjawab (HP Android).': ['A light buzz when you answer (Android phones).', 'Mahinang vibrate kapag sumasagot (Android).'],
    'Sesi menyesuaikan diri': ['Sessions that adapt', 'Session na umaangkop'],
    'Saat kamu mulai berat, Sesi pintar menunda kata baru dan memendekkan diri.': ['When it gets heavy, Smart session holds new words and shortens itself.', 'Kapag bumibigat na, ipinagpapaliban ng Smart session ang bagong salita at umiikli ito.'],
    'Nyala': ['On', 'On'], 'Mati': ['Off', 'Off'],
    'Kata baru disimpan untuk nanti — sekarang cukup mengulang.': ['New words are saved for later — reviewing is enough for now.', 'Itinabi muna ang mga bagong salita — sapat na ang pag-uulit ngayon.'],
    'Tiga soal lagi, lalu istirahat. Sisanya menunggu sampai kamu segar.': ['Three more, then take a break. The rest will wait until you are fresh.', 'Tatlo pa, tapos pahinga. Maghihintay ang iba hanggang presko ka na.'],
    'Data lama tidak terbaca': ['Old data could not be read', 'Hindi mabasa ang lumang data'],
    'Salinannya sudah diamankan dan tidak ditimpa. Pulihkan dari snapshot atau unduh salinannya.': ['A copy has been kept and was not overwritten. Restore from a snapshot or download the copy.', 'Naitabi ang kopya at hindi na-overwrite. I-restore mula sa snapshot o i-download ang kopya.'],
    'Penyimpanan dijeda supaya data lama tetap utuh. Unduh salinannya dulu.': ['Saving is paused so the old data stays intact. Download the copy first.', 'Naka-pause ang pag-save para buo pa ang lumang data. I-download muna ang kopya.'],
    'Buka cadangan': ['Open backups', 'Buksan ang backup'],
    'Unduh salinan': ['Download copy', 'I-download ang kopya'],
    'Tutup': ['Close', 'Isara'],
    'Hapus': ['Delete', 'Burahin'],
    'Data yang diamankan': ['Rescued data', 'Na-rescue na data'],
    'Hapus salinan ini? Tidak bisa dibatalkan.': ['Delete this copy? This cannot be undone.', 'Burahin ang kopyang ito? Hindi na maibabalik.'],
    'Progres dari tab lain dimuat': ['Loaded progress from another tab', 'Na-load ang progress mula sa ibang tab'],
    '⚠️ Kode progres terpotong — salin ulang seluruh kodenya': ['⚠️ The progress code is cut off — copy the whole code again', '⚠️ Putol ang progress code — kopyahin ulit ang buong code'],
    'Pulihkan cadangan': ['Restore backup', 'I-restore ang backup'],
    'Cadangan berisi {a} kata. Di perangkat ini sudah ada {b} kata.': ['The backup has {a} words. This device already has {b} words.', 'May {a} salita ang backup. May {b} salita na sa device na ito.'],
    'Gabungkan keduanya': ['Merge both', 'Pagsamahin ang dalawa'],
    'Tiap kata memakai ulangan yang paling baru. Tidak ada yang hilang.': ['Each word keeps its most recent review. Nothing is lost.', 'Ang pinakabagong review ng bawat salita ang gagamitin. Walang mawawala.'],
    'Ganti dengan cadangan': ['Replace with the backup', 'Palitan ng backup'],
    'Progres di perangkat ini diganti. Salinannya tetap ada di snapshot.': ['Progress on this device is replaced. A copy stays in the snapshots.', 'Papalitan ang progress sa device na ito. May kopya pa rin sa snapshot.'],
    'Progresmu masih tersimpan': ['Your progress is still saved', 'Naka-save pa ang progress mo'],
    'Cadangan otomatis di perangkat ini berisi {n} kata dan {x} XP.': ['The automatic backup on this device has {n} words and {x} XP.', 'May {n} salita at {x} XP ang awtomatikong backup sa device na ito.'],
    'Mulai baru': ['Start fresh', 'Magsimula ulit'],
    'Pindah HP': ['Move to another phone', 'Lumipat ng phone'],
    'Pindahkan progres lewat kamera, tanpa internet dan tanpa mengetik.': ['Move your progress with the camera — no internet, no typing.', 'Ilipat ang progress gamit ang camera — walang internet, walang pagta-type.'],
    'Kirim lewat QR': ['Send by QR', 'Ipadala gamit ang QR'], 'Terima lewat QR': ['Receive by QR', 'Tanggapin gamit ang QR'],
    'Kirim progres ke HP lain': ['Send progress to another phone', 'Ipadala ang progress sa ibang phone'],
    'Di HP baru: buka Xiǎobù → Terima lewat QR, lalu arahkan kameranya ke kode ini sampai selesai.': ['On the new phone: open Xiǎobù → Receive by QR, then point its camera at this code until it finishes.', 'Sa bagong phone: buksan ang Xiǎobù → Tanggapin gamit ang QR, tapos itutok ang camera sa code na ito hanggang matapos.'],
    'satu putaran ±{s} detik': ['one round ≈ {s} seconds', 'isang ikot ≈ {s} segundo'],
    'Naikkan kecerahan layar. Progres tidak dikirim ke internet.': ['Turn up the screen brightness. Your progress is not sent to the internet.', 'Lakasan ang liwanag ng screen. Hindi ipinapadala sa internet ang progress.'],
    'Terima progres lewat QR': ['Receive progress by QR', 'Tanggapin ang progress gamit ang QR'],
    'Di HP lama: buka Saya → Kirim lewat QR. Arahkan kamera ini ke kodenya dan tahan sampai penuh.': ['On the old phone: open Me → Send by QR. Point this camera at the code and hold until the bar is full.', 'Sa lumang phone: buksan ang Ako → Ipadala gamit ang QR. Itutok ang camera sa code hanggang mapuno.'],
    'Menyalakan kamera…': ['Starting the camera…', 'Binubuksan ang camera…'],
    'Kamera tidak bisa dipakai. Izinkan akses kamera, atau pakai Tempel kode progres.': ['The camera cannot be used. Allow camera access, or use Paste progress code.', 'Hindi magamit ang camera. Payagan ang camera, o gamitin ang I-paste ang progress code.'],
    'Arahkan ke kode QR di HP lama': ['Point at the QR code on the old phone', 'Itutok sa QR code ng lumang phone'],
    '{a} dari {b} bagian': ['{a} of {b} parts', '{a} sa {b} bahagi'],
    'Fitur QR belum bisa dimuat — cek koneksi, lalu coba lagi.': ['The QR feature could not load — check your connection and try again.', 'Hindi ma-load ang QR — tingnan ang koneksyon at subukan ulit.'],
    'Target ingatan': ['Memory target', 'Target ng memorya'],
    'Seberapa kuat kata dijaga sebelum diulang. Makin tinggi, makin sering mengulang.': ['How firmly words are kept before a review. Higher means more frequent reviews.', 'Gaano katibay iniingatan ang salita bago ulitin. Mas mataas, mas madalas ang pag-uulit.'],
    'Santai': ['Relaxed', 'Relaks'], 'Seimbang': ['Balanced', 'Balanse'], 'Kuat': ['Strong', 'Matibay'],
    'Langit harian': ['Daily sky', 'Langit ng araw'],
    'Latar bergaris nada yang berganti tiap hari. Digambar sekali, tidak memberatkan HP.': ['A background of tone lines that changes every day. Drawn once, so it does not slow your phone.', 'Background na may mga linya ng tono na nagbabago araw-araw. Isang beses lang iginuguhit.']
  });
  Object.assign(I18N_VI, {
    'Malam': 'Đêm', 'Penyimpanan & keamanan progres': 'Lưu trữ & an toàn tiến độ', 'Penyimpanan permanen': 'Lưu trữ lâu dài',
    'aktif — browser tidak akan menghapus progresmu sendiri': 'đã bật — trình duyệt sẽ không tự xoá tiến độ',
    'belum aktif — pasang app ke layar utama supaya progres tidak dihapus browser': 'chưa bật — hãy cài ứng dụng ra màn hình chính để trình duyệt không xoá tiến độ',
    'Aktifkan': 'Bật', 'Terpakai': 'Đã dùng', 'Cadangan terakhir': 'Sao lưu gần nhất', 'belum pernah': 'chưa có', 'hari ini': 'hôm nay', '{n} hari lalu': '{n} ngày trước',
    'Riwayat jawaban tersimpan': 'Số câu trả lời đã lưu', 'Getar': 'Rung', 'Getaran halus saat menjawab (HP Android).': 'Rung nhẹ khi trả lời (điện thoại Android).',
    'Sesi menyesuaikan diri': 'Buổi học tự điều chỉnh', 'Saat kamu mulai berat, Sesi pintar menunda kata baru dan memendekkan diri.': 'Khi bạn bắt đầu đuối, buổi học thông minh hoãn từ mới và tự rút ngắn.',
    'Nyala': 'Bật', 'Mati': 'Tắt',
    'Kata baru disimpan untuk nanti — sekarang cukup mengulang.': 'Từ mới để dành sau — bây giờ ôn lại là đủ.',
    'Tiga soal lagi, lalu istirahat. Sisanya menunggu sampai kamu segar.': 'Ba câu nữa rồi nghỉ. Phần còn lại chờ đến khi bạn tỉnh táo.',
    'Data lama tidak terbaca': 'Không đọc được dữ liệu cũ',
    'Salinannya sudah diamankan dan tidak ditimpa. Pulihkan dari snapshot atau unduh salinannya.': 'Bản sao đã được giữ lại và không bị ghi đè. Khôi phục từ bản lưu hoặc tải bản sao về.',
    'Penyimpanan dijeda supaya data lama tetap utuh. Unduh salinannya dulu.': 'Tạm dừng lưu để dữ liệu cũ còn nguyên. Hãy tải bản sao về trước.',
    'Buka cadangan': 'Mở sao lưu', 'Unduh salinan': 'Tải bản sao', 'Tutup': 'Đóng', 'Hapus': 'Xoá', 'Data yang diamankan': 'Dữ liệu đã giữ lại',
    'Hapus salinan ini? Tidak bisa dibatalkan.': 'Xoá bản sao này? Không thể hoàn tác.',
    'Progres dari tab lain dimuat': 'Đã tải tiến độ từ tab khác',
    '⚠️ Kode progres terpotong — salin ulang seluruh kodenya': '⚠️ Mã tiến độ bị cắt — hãy sao chép lại toàn bộ mã',
    'Pulihkan cadangan': 'Khôi phục bản sao lưu', 'Cadangan berisi {a} kata. Di perangkat ini sudah ada {b} kata.': 'Bản sao lưu có {a} từ. Thiết bị này đã có {b} từ.',
    'Gabungkan keduanya': 'Gộp cả hai', 'Tiap kata memakai ulangan yang paling baru. Tidak ada yang hilang.': 'Mỗi từ giữ lần ôn mới nhất. Không mất gì cả.',
    'Ganti dengan cadangan': 'Thay bằng bản sao lưu', 'Progres di perangkat ini diganti. Salinannya tetap ada di snapshot.': 'Tiến độ trên thiết bị này sẽ bị thay. Bản sao vẫn còn trong các bản lưu.',
    'Progresmu masih tersimpan': 'Tiến độ của bạn vẫn còn', 'Cadangan otomatis di perangkat ini berisi {n} kata dan {x} XP.': 'Bản sao lưu tự động trên thiết bị này có {n} từ và {x} XP.',
    'Mulai baru': 'Bắt đầu mới', 'Langit harian': 'Bầu trời mỗi ngày',
    'Pindah HP': 'Chuyển sang máy khác', 'Pindahkan progres lewat kamera, tanpa internet dan tanpa mengetik.': 'Chuyển tiến độ bằng camera — không cần mạng, không cần gõ.',
    'Kirim lewat QR': 'Gửi bằng QR', 'Terima lewat QR': 'Nhận bằng QR', 'Kirim progres ke HP lain': 'Gửi tiến độ sang máy khác',
    'Di HP baru: buka Xiǎobù → Terima lewat QR, lalu arahkan kameranya ke kode ini sampai selesai.': 'Trên máy mới: mở Xiǎobù → Nhận bằng QR, rồi hướng camera vào mã này cho đến khi xong.',
    'satu putaran ±{s} detik': 'một vòng ≈ {s} giây', 'Naikkan kecerahan layar. Progres tidak dikirim ke internet.': 'Hãy tăng độ sáng màn hình. Tiến độ không được gửi lên mạng.',
    'Terima progres lewat QR': 'Nhận tiến độ bằng QR', 'Di HP lama: buka Saya → Kirim lewat QR. Arahkan kamera ini ke kodenya dan tahan sampai penuh.': 'Trên máy cũ: mở Tôi → Gửi bằng QR. Hướng camera này vào mã và giữ đến khi đầy.',
    'Menyalakan kamera…': 'Đang bật camera…', 'Kamera tidak bisa dipakai. Izinkan akses kamera, atau pakai Tempel kode progres.': 'Không dùng được camera. Hãy cho phép camera, hoặc dùng Dán mã tiến độ.',
    'Arahkan ke kode QR di HP lama': 'Hướng vào mã QR trên máy cũ', '{a} dari {b} bagian': '{a} trên {b} phần',
    'Fitur QR belum bisa dimuat — cek koneksi, lalu coba lagi.': 'Chưa tải được tính năng QR — kiểm tra kết nối rồi thử lại.',
    'Target ingatan': 'Mục tiêu ghi nhớ', 'Seberapa kuat kata dijaga sebelum diulang. Makin tinggi, makin sering mengulang.': 'Mức giữ từ trước khi ôn lại. Càng cao thì ôn càng thường xuyên.',
    'Santai': 'Thư thả', 'Seimbang': 'Cân bằng', 'Kuat': 'Chắc',
    'Latar bergaris nada yang berganti tiap hari. Digambar sekali, tidak memberatkan HP.': 'Nền với các đường thanh điệu, đổi mỗi ngày. Chỉ vẽ một lần nên không làm chậm máy.'
  });

  /* =====================================================================
     1. KETAHANAN DATA
     ===================================================================== */

  /* ---------- 1a. penjaga antar-tab ----------
     save() menulis seluruh S. Tanpa penjaga, tab lama yang ditutup menimpa progres tab baru.
     Aturan: tab yang melihat tulisan tab lain (event 'storage') tidak boleh menulis sebelum
     memuat ulang (bila ia sendiri tidak punya perubahan) atau menggabung (bila punya). */
  /* gabung dua state: `base` jadi dasar (pengaturan dll. miliknya), `other` ditumpangkan.
     Kartu: ulangan terbaru menang · hari: angka terbesar · XP: terbesar · irisan lain: isi yang belum ada. */
  const isObj = x => x && typeof x === 'object' && !Array.isArray(x);
  function mergeStates(base, other) {
    const stamp = c => (c && (c.lr || c.ls)) || 0;
    base.cards = base.cards || {};
    for (const k in other.cards || {}) {
      const a = other.cards[k], b = base.cards[k];
      if (!b || stamp(a) > stamp(b) || (stamp(a) === stamp(b) && (a.r || 0) > (b.r || 0))) base.cards[k] = a;
    }
    base.days = base.days || {};
    for (const k in other.days || {}) {
      const a = other.days[k], b = base.days[k];
      if (!isObj(a)) continue;
      if (!b) { base.days[k] = a; continue; }
      for (const f in a) { if (typeof a[f] === 'number') b[f] = Math.max(+b[f] || 0, a[f]); else if (b[f] === undefined) b[f] = a[f]; }
    }
    base.xp = Math.max(+base.xp || 0, +other.xp || 0);
    if (isObj(other.streak) && isObj(base.streak)) {
      const best = Math.max(base.streak.best || 0, other.streak.best || 0);
      if ((other.streak.last || '') > (base.streak.last || '')) base.streak = other.streak;
      base.streak.best = best;
    } else if (isObj(other.streak) && !base.streak) base.streak = other.streak;
    for (const k in other) {                           // progres per butir (hanzi, grammar, tema, percakapan, …)
      if (['cards', 'days', 'xp', 'streak', 'settings', 'adapt'].includes(k)) continue;
      if (base[k] === undefined || base[k] === null) { base[k] = other[k]; continue; }
      if (isObj(base[k]) && isObj(other[k])) for (const kk in other[k]) if (base[k][kk] === undefined) base[k][kk] = other[k][kk];
    }
    return base;
  }
  PK.mergeStates = mergeStates;
  function pkMerge() {
    let disk = null;
    try { disk = JSON.parse(localStorage.getItem(KEY)); } catch (e) { disk = null; }
    if (!disk || typeof disk !== 'object' || !disk.cards || !disk.settings) return;
    S = mergeStates(disk, S);
  }
  function pkAdopt(quiet) {
    clearTimeout(saveT); PK.foreign = 0; PK.dirty = false;
    load(); applyTheme(); render();
    if (!quiet) toast(t('Progres dari tab lain dimuat'), 2200, 'pkadopt');
  }
  const saveBase = save;
  save = function (now) {
    const passive = document.hidden || PK.unloading;
    if (PK.foreign) {
      if (PK.foreign === 'adopt' && passive) return;    // tab ini tidak punya perubahan sendiri: jangan timpa
      pkMerge(); PK.foreign = 0;
    }
    PK.dirty = true; clearTimeout(PK.dt);
    const r = saveBase(now);
    if (now) PK.dirty = false; else PK.dt = setTimeout(() => { PK.dirty = false; }, 420);
    clearTimeout(PK.mt); PK.mt = setTimeout(pkMirror, 5000);
    return r;
  };
  /* cermin langsung: salinan terkini di IndexedDB (kunci 'terkini'), terpisah dari localStorage.
     Kalau localStorage hilang tapi IndexedDB selamat, app menawarkan pemulihan saat dibuka. */
  async function pkMirror() {
    try {
      if (SAVE_LOCK || !S || !S.cards || !Object.keys(S.cards).length) return;
      const db = await sfDb();
      db.transaction('s', 'readwrite').objectStore('s').put({ d: JSON.stringify(S), n: Object.keys(S.cards).length, xp: S.xp || 0, t: Date.now() }, 'terkini');
    } catch (e) {}
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) { clearTimeout(PK.mt); pkMirror(); } });
  window.addEventListener('pagehide', () => { PK.unloading = true; }, true);
  window.addEventListener('pageshow', () => { PK.unloading = false; });
  window.addEventListener('storage', e => {
    if (e.key !== KEY || SAVE_LOCK) return;
    if (e.newValue === null) { if (!SES) location.reload(); return; }       // tab lain me-reset
    if (PK.dirty) { PK.foreign = 'merge'; clearTimeout(saveT); save(true); return; }
    PK.foreign = 'adopt';
    if (!SES && !document.hidden) pkAdopt();
  });
  document.addEventListener('visibilitychange', () => { if (!document.hidden && PK.foreign === 'adopt' && !SES) pkAdopt(); });

  /* ---------- 1b. snapshot berjenjang: 7 harian · 4 mingguan · 6 bulanan (+3 berlabel) ---------- */
  function pkKeep(keys) {
    const keep = new Set();
    const daily = keys.filter(k => /^\d{4}-\d{2}-\d{2}$/.test(k)).sort().reverse();
    daily.slice(0, 7).forEach(k => keep.add(k));
    const weeks = new Set(), months = new Set();
    daily.slice(7).forEach(k => {
      const [y, m, d] = k.split('-').map(Number); const dt = new Date(y, m - 1, d);
      const wk = y + '-w' + Math.floor((dt - new Date(y, 0, 1)) / 6048e5);
      const mo = k.slice(0, 7);
      if (weeks.size < 4 && !weeks.has(wk)) { weeks.add(wk); keep.add(k); }
      else if (months.size < 6 && !months.has(mo)) { months.add(mo); keep.add(k); }
    });
    keys.filter(k => !/^\d{4}-\d{2}-\d{2}$/.test(k) && k !== 'terkini').sort().reverse().slice(0, 3).forEach(k => keep.add(k));
    keep.add('terkini');
    return keep;
  }
  PK.keep = pkKeep;
  sfSnap = async function (label) {
    try {
      if (!S || !S.cards || !Object.keys(S.cards).length) return;
      const k = (typeof label === 'string' && label ? label + '-' : '') + todayKey();
      const db = await sfDb(); const st = db.transaction('s', 'readwrite').objectStore('s');
      st.put({ d: JSON.stringify(S), n: Object.keys(S.cards).length, xp: S.xp || 0 }, k);
      const keys = await new Promise(res => { const r = st.getAllKeys ? st.getAllKeys() : null; if (!r) return res([]); r.onsuccess = () => res(r.result || []); r.onerror = () => res([]); });
      const keep = pkKeep(keys.map(String));
      keys.forEach(x => { if (!keep.has(String(x))) st.delete(x); });
    } catch (e) {}
  };

  /* ---------- 1c. kode progres XB2: 'XB2:' + z + crc32(8 hex) + ':' + base64 ----------
     Kode yang terpotong saat ditempel terdeteksi sebelum menimpa apa pun. XB0/XB1 tetap terbaca. */
  const CRC_T = (() => { const tb = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; tb[n] = c >>> 0; } return tb; })();
  function crcHex(u8) { let c = 0xFFFFFFFF; for (let i = 0; i < u8.length; i++) c = CRC_T[(c ^ u8[i]) & 255] ^ (c >>> 8); return ((c ^ 0xFFFFFFFF) >>> 0).toString(16).padStart(8, '0'); }
  PK.crcHex = crcHex;
  const readCodeBase = readCode;
  progressCode = async function () {
    let body = new TextEncoder().encode(JSON.stringify(S)), z = '0';
    if (typeof CompressionStream === 'function') {
      try { const cs = new Blob([body]).stream().pipeThrough(new CompressionStream('gzip')); body = new Uint8Array(await new Response(cs).arrayBuffer()); z = '1'; } catch (e) {}
    }
    return 'XB2:' + z + crcHex(body) + ':' + b64(body);
  };
  readCode = async function (code) {
    code = String(code || '').trim().replace(/\s+/g, '');
    if (!code.startsWith('XB2:')) return readCodeBase(code);
    const z = code[4], crc = code.slice(5, 13), body = code.slice(14);
    let u8; try { u8 = unb64(body); } catch (e) { throw new Error('xb-cut'); }
    if (code[13] !== ':' || crcHex(u8) !== crc) throw new Error('xb-cut');
    if (z === '1') { const ds = new Blob([u8]).stream().pipeThrough(new DecompressionStream('gzip')); return JSON.parse(await new Response(ds).text()); }
    return JSON.parse(new TextDecoder().decode(u8));
  };
  applyCode = async function (code) {
    let d;
    try { d = await readCode(code); if (!d || !d.cards || !d.settings) throw new Error('bad'); }
    catch (e) { toast(t(e && e.message === 'xb-cut' ? '⚠️ Kode progres terpotong — salin ulang seluruh kodenya' : '⚠️ Kode progres tidak valid'), 4200); return; }
    pkOfferRestore(d);
  };
  /* tulis state hasil pulih/gabung, dengan snapshot pengaman lebih dulu */
  async function pkWrite(d) {
    const n = Object.keys(d.cards).length;
    try { await sfSnap('pra-pulih'); } catch (e) {}
    SAVE_LOCK = true; clearTimeout(saveT); clearTimeout(PK.mt);
    try { localStorage.setItem(KEY, JSON.stringify(d)); }
    catch (e) { SAVE_LOCK = false; toast(t('⚠️ Progres tidak bisa disimpan di browser ini. Di iPhone, matikan mode Penjelajahan Pribadi, lalu buka ulang app.'), 5000); return; }
    toast(t('✅ Progres dipulihkan: {n} kata', { n })); setTimeout(() => location.reload(), 700);
  }
  /* perangkat ini kosong → langsung pulihkan; sudah ada progres → pilih Gabungkan atau Ganti */
  function pkOfferRestore(d) {
    const a = Object.keys(d.cards).length, b = Object.keys(S.cards).length;
    if (!b) return pkWrite(d);
    PK.pending = d;
    openModal(`<h2>${t('Pulihkan cadangan')}</h2>
      <p class="muted" style="margin:0 0 14px">${t('Cadangan berisi {a} kata. Di perangkat ini sudah ada {b} kata.', { a: fmtN(a), b: fmtN(b) })}</p>
      <button class="btn pri wide" data-pk="rmerge">${t('Gabungkan keduanya')}</button>
      <p class="small muted" style="margin:6px 4px 14px">${t('Tiap kata memakai ulangan yang paling baru. Tidak ada yang hilang.')}</p>
      <button class="btn sec wide" data-pk="rreplace">${t('Ganti dengan cadangan')}</button>
      <p class="small muted" style="margin:6px 4px 0">${t('Progres di perangkat ini diganti. Salinannya tetap ada di snapshot.')}</p>`);
  }
  PK.offerRestore = pkOfferRestore;
  /* file cadangan: ambil alih penangan lama (yang langsung menimpa) */
  ['input', 'change'].forEach(ev => document.addEventListener(ev, e => {
    const el = e.target; if (!el || !el.dataset || el.dataset.in !== 'import') return;
    e.stopImmediatePropagation(); if (ev !== 'change') return;
    const f = el.files && el.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = async () => {
      try {
        const tx = String(r.result || ''); let d;
        try { d = JSON.parse(tx); } catch (x) { d = await readCode(tx); }      // file .json, atau file berisi kode progres
        if (!d || !d.cards || !d.settings) throw 0; pkOfferRestore(d);
      }
      catch (x) { toast(t('⚠️ File cadangan tidak valid')); }
      el.value = '';
    };
    r.readAsText(f);
  }, true));

  /* ---------- 1d. log jawaban (hanya-tambah, IndexedDB 'xiaobu-rev') ----------
     Bahan untuk menyetel FSRS per pengguna nanti. Tidak ikut kode progres supaya kode tetap pendek. */
  function revDb() {
    return new Promise((res, rej) => { if (!window.indexedDB) return rej(0); const r = indexedDB.open('xiaobu-rev', 1);
      r.onupgradeneeded = () => r.result.createObjectStore('r', { autoIncrement: true }); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
  }
  async function revFlush() {
    if (!PK.rev.length) return; const rows = PK.rev.splice(0);
    try { const db = await revDb(); const st = db.transaction('r', 'readwrite').objectStore('r'); rows.forEach(x => st.add(x)); } catch (e) {}
  }
  function revLog(i, g, L) {
    try { const w = W[i]; if (!w) return; PK.rev.push([Date.now(), w.w, g, L ? Math.round(L.ms) : 0, L ? L.type : '']); clearTimeout(PK.revT); PK.revT = setTimeout(revFlush, 2500); } catch (e) {}
  }
  PK.revCount = async function () { try { const db = await revDb(); return await new Promise(res => { const r = db.transaction('r').objectStore('r').count(); r.onsuccess = () => res(r.result); r.onerror = () => res(0); }); } catch (e) { return 0; } };
  document.addEventListener('visibilitychange', () => { if (document.hidden) revFlush(); });

  /* ---------- 1e. status penyimpanan + pengaturan V1.7 di menu Saya ---------- */
  const fmtMB = b => (b / 1048576 < 10 ? (b / 1048576).toFixed(1) : Math.round(b / 1048576)) + ' MB';
  function quarantineKeys() { const out = []; try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.startsWith('xiaobu.karantina.')) out.push(k); } } catch (e) {} return out.sort().reverse(); }
  function pkSeg(k, cur) { return `<div class="seg">${[['on', t('Nyala')], ['off', t('Mati')]].map(([v, l]) => `<button class="${cur === v ? 'on' : ''}" data-a="set" data-k="${k}" data-v="${v}">${l}</button>`).join('')}</div>`; }
  function pkMeCard() {
    if (ROUTE !== 'me' || document.getElementById('pk-store')) return;
    const anchor = document.querySelector('#main [data-a="export"]'); const host = anchor && anchor.closest('section'); if (!host) return;
    const lb = S.lastBackup ? Math.floor((Date.now() - S.lastBackup) / 864e5) : -1;
    const qs = quarantineKeys();
    const el = document.createElement('section'); el.className = 'card glass'; el.id = 'pk-store';
    el.innerHTML = `<h2>${t('Penyimpanan & keamanan progres')}</h2>
      <div class="set"><div class="l"><b>${t('Penyimpanan permanen')}</b><span id="pk-pers">…</span></div><button class="btn sec small" data-pk="persist" id="pk-persbtn" hidden>${t('Aktifkan')}</button></div>
      <div class="set"><div class="l"><b>${t('Terpakai')}</b><span id="pk-use">…</span></div></div>
      <div class="set"><div class="l"><b>${t('Cadangan terakhir')}</b><span>${lb < 0 ? t('belum pernah') : lb === 0 ? t('hari ini') : t('{n} hari lalu', { n: lb })}</span></div></div>
      <div class="set"><div class="l"><b>${t('Riwayat jawaban tersimpan')}</b><span id="pk-rev">…</span></div></div>
      <div class="set"><div class="l"><b>${t('Pindah HP')}</b><span>${t('Pindahkan progres lewat kamera, tanpa internet dan tanpa mengetik.')}</span></div></div>
      <div class="row wrap" style="margin:0 0 6px"><button class="btn sec" data-pk="qrsend">${ICON('grid')} ${t('Kirim lewat QR')}</button><button class="btn sec" data-pk="qrrecv">${ICON('grid')} ${t('Terima lewat QR')}</button></div>
      <div class="set"><div class="l"><b>${t('Sesi menyesuaikan diri')}</b><span>${t('Saat kamu mulai berat, Sesi pintar menunda kata baru dan memendekkan diri.')}</span></div>${pkSeg('pace', S.settings.pace === 'off' ? 'off' : 'on')}</div>
      <div class="set"><div class="l"><b>${t('Target ingatan')}</b><span>${t('Seberapa kuat kata dijaga sebelum diulang. Makin tinggi, makin sering mengulang.')}</span></div><div class="seg">${[['0.85', t('Santai') + ' 85%'], ['0.9', t('Seimbang') + ' 90%'], ['0.93', t('Kuat') + ' 93%']].map(([v, l]) => `<button class="${String(+S.settings.retain || 0.9) === v ? 'on' : ''}" data-a="set" data-k="retain" data-v="${v}">${l}</button>`).join('')}</div></div>
      <div class="set"><div class="l"><b>${t('Langit harian')}</b><span>${t('Latar bergaris nada yang berganti tiap hari. Digambar sekali, tidak memberatkan HP.')}</span></div><div class="seg">${[['on', t('Nyala')], ['off', t('Mati')]].map(([v, l]) => `<button class="${(S.settings.sky === 'off' ? 'off' : 'on') === v ? 'on' : ''}" data-pk="sky" data-v="${v}">${l}</button>`).join('')}</div></div>
      <div class="set"><div class="l"><b>${t('Getar')}</b><span>${t('Getaran halus saat menjawab (HP Android).')}</span></div>${pkSeg('haptic', S.settings.haptic === 'off' ? 'off' : 'on')}</div>
      ${qs.length ? `<h3 class="pk-h3">${t('Data yang diamankan')}</h3>` + qs.map(k => { const ts = +k.split('.').pop(); let n = 0; try { n = (localStorage.getItem(k) || '').length; } catch (e) {} return `<div class="sfrow"><b>${esc(new Date(ts).toLocaleString(LOCALE[S.settings.ui] || 'id-ID'))}</b><span class="grow">${fmtMB(n * 2)}</span><button class="btn sec small" data-pk="qdl" data-v="${esc(k)}">${t('Unduh salinan')}</button><button class="btn ghost small" data-pk="qrm" data-v="${esc(k)}">${t('Hapus')}</button></div>`; }).join('') : ''}`;
    host.after(el);
    pkFillStore();
  }
  async function pkFillStore() {
    const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
    let pers = false;
    try { if (navigator.storage && navigator.storage.persisted) pers = await navigator.storage.persisted(); } catch (e) {}
    set('pk-pers', t(pers ? 'aktif — browser tidak akan menghapus progresmu sendiri' : 'belum aktif — pasang app ke layar utama supaya progres tidak dihapus browser'));
    const b = document.getElementById('pk-persbtn'); if (b && !pers && navigator.storage && navigator.storage.persist) b.hidden = false;
    try {
      if (navigator.storage && navigator.storage.estimate) { const e = await navigator.storage.estimate(); set('pk-use', fmtMB(e.usage || 0) + (e.quota ? ' / ' + fmtMB(e.quota) : '')); }
      else set('pk-use', fmtMB(((localStorage.getItem(KEY) || '').length) * 2));
    } catch (e) { set('pk-use', '—'); }
    set('pk-rev', fmtN(await PK.revCount()));
  }
  function download(name, text) {
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' })); a.download = name;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }
  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('[data-pk]'); if (!b) return;
    const a = b.dataset.pk, v = b.dataset.v;
    if (a === 'persist') { navigator.storage.persist().then(() => pkFillStore()).catch(() => {}); }
    else if (a === 'qdl') { let tx = ''; try { tx = localStorage.getItem(v) || ''; } catch (x) {} if (tx) download('xiaobu-data-lama-' + todayKey() + '.json', tx); }
    else if (a === 'qrm') { if (!/^xiaobu\.karantina\./.test(v || '') || !confirm(t('Hapus salinan ini? Tidak bisa dibatalkan.'))) return; try { localStorage.removeItem(v); } catch (x) {} const c = document.getElementById('pk-store'); if (c) c.remove(); pkMeCard(); }
    else if (a === 'rmerge' && PK.pending) { const base = JSON.parse(JSON.stringify(S)); const d = PK.pending; PK.pending = null; closeModal(); pkWrite(mergeStates(base, d)); }
    else if (a === 'rreplace' && PK.pending) { const d = PK.pending; PK.pending = null; closeModal(); pkWrite(d); }
    else if (a === 'mrestore') { sfSnapGet(v).then(r => { const d = JSON.parse(r.d); if (d && d.cards && d.settings) pkWrite(d); }).catch(() => toast(t('⚠️ File cadangan tidak valid'))); }
    else if (a === 'qrsend') qrSend();
    else if (a === 'qrrecv') qrRecv();
    else if (a === 'sky') { S.settings.sky = v; save(); pkSky(true); const c = document.getElementById('pk-store'); if (c) c.remove(); pkMeCard(); }
    else if (a === 'qclose') { const n = b.closest('.pk-q'); if (n) { if (n.id === 'pk-m') { S.pkNoOffer = 1; save(); } n.remove(); } }
    else if (a === 'qgo') { const n = document.getElementById('pk-q'); if (n) n.remove(); go('me'); }
  });
  /* api streak: terisi bertahap mengikuti misi hari ini (0–3), menyala sekali saat misi ketiga selesai */
  function pkFlame() {
    const d = S.days[todayKey()]; const lit = Math.min(3, d && d.qd ? Object.keys(d.qd).length : 0);
    const els = document.querySelectorAll('.streak-mini,.chip.stat-fire,.streak .flame');
    els.forEach(el => { el.dataset.lit = lit; });
    if (lit >= 3 && d && !d.ign && els.length) {
      d.ign = 1; save();
      els.forEach(el => { el.classList.add('pk-ignite'); setTimeout(() => el.classList.remove('pk-ignite'), 1200); });
      buzz('win');
    }
  }
  PK.flame = pkFlame;
  const afterRenderBase = afterRender;
  afterRender = function () {
    const r = afterRenderBase.apply(this, arguments);
    try { pkMeCard(); } catch (e) { console.warn('pk me', e); }
    try { pkFlame(); } catch (e) {}
    return r;
  };

  /* ---------- 1f. pita pemulihan bila data lama dikarantina saat muat ---------- */
  function pkQuarantineBanner() {
    const q = window.__xbQuarantine; if (!q || document.getElementById('pk-q')) return;
    const el = document.createElement('div'); el.id = 'pk-q'; el.className = 'pk-q'; el.setAttribute('role', 'alert');
    el.innerHTML = `<b>${t('Data lama tidak terbaca')}</b><p>${t(q.locked ? 'Penyimpanan dijeda supaya data lama tetap utuh. Unduh salinannya dulu.' : 'Salinannya sudah diamankan dan tidak ditimpa. Pulihkan dari snapshot atau unduh salinannya.')}</p>
      <div class="row wrap"><button class="btn pri small" data-pk="qgo">${t('Buka cadangan')}</button><button class="btn sec small" data-pk="qdl" data-v="${esc(q.key)}">${t('Unduh salinan')}</button><button class="btn ghost small" data-pk="qclose">${t('Tutup')}</button></div>`;
    document.body.appendChild(el);
  }

  /* ---------- 1g. localStorage kosong tapi cadangan otomatis masih ada → tawarkan pemulihan ---------- */
  async function pkOfferMirror() {
    if (window.__xbQuarantine || S.pkNoOffer || Object.keys(S.cards).length || document.getElementById('pk-m')) return;
    let list = []; try { list = await sfSnapList(); } catch (e) {}
    const best = list.filter(s => s.n > 0).sort((a, b) => (b.k === 'terkini') - (a.k === 'terkini') || (a.k < b.k ? 1 : -1))[0];
    if (!best) return;
    const el = document.createElement('div'); el.id = 'pk-m'; el.className = 'pk-q pk-m'; el.setAttribute('role', 'alert');
    el.innerHTML = `<b>${t('Progresmu masih tersimpan')}</b><p>${t('Cadangan otomatis di perangkat ini berisi {n} kata dan {x} XP.', { n: fmtN(best.n), x: fmtN(best.xp || 0) })}</p>
      <div class="row wrap"><button class="btn pri small" data-pk="mrestore" data-v="${esc(best.k)}">${t('Pulihkan')}</button><button class="btn ghost small" data-pk="qclose">${t('Mulai baru')}</button></div>`;
    document.body.appendChild(el);
  }

  /* =====================================================================
     2. MESIN BELAJAR
     ===================================================================== */

  /* ---------- 2a. waktu jawab per jenis soal → skor z pribadi ---------- */
  const recBase = recAnswer;
  recAnswer = function (type, ok, ms) {
    try {
      const a = S.adapt; const rz = a.rtz || (a.rtz = {});
      const st = rz[type] || (rz[type] = { m: Math.log(4000), v: 0.25, n: 0 });
      const x = Math.log(clamp(+ms || 4000, 300, 60000));
      const z = st.n >= 8 ? (x - st.m) / Math.sqrt(Math.max(st.v, 0.04)) : 0;
      PK.last = { type, ok, ms, z, n: st.n, at: Date.now() };
      if (ok && ms < 60000) { const al = st.n < 20 ? 0.15 : 0.06; const d = x - st.m; st.m += al * d; st.v = (1 - al) * (st.v + al * d * d); st.n++; }
    } catch (e) { PK.last = null; }
    return recBase.apply(this, arguments);
  };

  /* ---------- 2b. nilai FSRS 4 tingkat ----------
     Sebelumnya: salah = 1, benar = 3, benar tapi sangat lambat = 2; "Mudah" (4) tidak pernah dipakai.
     Sekarang, dibandingkan dengan kecepatan pengguna sendiri pada jenis soal yang sama:
       benar & z > +1  → 2 Sulit · benar & z < −1 pada kartu matang, tanpa petunjuk → 4 Mudah · selain itu 3. */
  const gradeBase = grade;
  grade = function (i, ok, fast, rating) {
    const L = PK.last && Date.now() - PK.last.at < 120 ? PK.last : null;
    let g = rating || (!ok ? 1 : fast === 'slow' ? 2 : 3);
    try {
      if (!rating && ok && L && L.ok) {
        const c = S.cards[i]; const it = SES && SES.items ? SES.items[SES.i] : null;
        if (fast === 'slow' || L.z > 1) g = 2;
        else if (L.z < -1 && L.n >= 30 && c && c.ph === 'rev' && !(it && it.hint)) g = 4;
        else g = 3;
        rating = g;
      }
    } catch (e) {}
    revLog(i, g, L);
    return gradeBase.call(this, i, ok, fast, rating);
  };

  /* ---------- 2c. matriks kekeliruan nada meluruh 3% per hari ---------- */
  function pkToneDecay() {
    const a = S.adapt; const today = todayKey();
    if (a.tcDay && a.tcDay !== today && Array.isArray(a.tc)) {
      const d = clamp(keyDiff(a.tcDay, today), 1, 90); const f = Math.pow(0.97, d);
      a.tc = a.tc.map(r => r.map(v => Math.round(v * f * 100) / 100));
    }
    a.tcDay = today;
  }

  /* ---------- 2c'. pengecoh nada terarah ----------
     app.js sudah memakai nada yang paling sering tertukar pada separuh pengecoh acaknya. Di sini dijamin:
     pasangan tertukar terkuat pengguna (dari matriks 5×5) SELALU muncul sebagai salah satu pilihan salah. */
  const tonePatBase = tonePatterns;
  tonePatterns = function (tn) {
    const out = tonePatBase.apply(this, arguments);
    try {
      if (!Array.isArray(tn) || tn.length < 2 || !Array.isArray(out) || out.length < 4) return out;
      const tc = S.adapt.tc; let best = null;
      tn.forEach((a, k) => { if (a >= 1 && a <= 4) tc[a - 1].slice(0, 4).forEach((v, j) => { if (j + 1 !== a && v >= 1 && (!best || v > best.v)) best = { k, to: j + 1, v }; }); });
      if (!best) return out;
      const p = tn.slice(); p[best.k] = best.to; const key = p.join(''), right = tn.join('');
      if (out.some(x => x.join('') === key)) return out;
      const wrong = out.map((x, i) => i).filter(i => out[i].join('') !== right);
      out[wrong[Math.floor(Math.random() * wrong.length)]] = p;
    } catch (e) {}
    return out;
  };

  /* ---------- 2d. pembaca kelelahan ----------
     Beban per jawaban (0–1) = 0,35·pelambatan + 0,25·salah-kilat + 0,25·lupa kartu matang + 0,15·salah,
     dihaluskan (EWMA 0,25). Hanya meringankan, tidak pernah mengunci; hanya untuk Sesi pintar. */
  function pkFatigue(ok, it, pre) {
    const L = PK.last && Date.now() - PK.last.at < 400 ? PK.last : null;
    const f = SES.fat || (SES.fat = { L: 0, n: 0, lvl: 0 });
    const fastWrong = !ok && pre.ms < 0.4 * (S.adapt.rt || 4000);
    const matureLapse = !ok && pre.r !== null && pre.r > 0.9;
    const s = 0.35 * clamp((L ? L.z : 0) / 2, 0, 1) + 0.25 * (fastWrong ? 1 : 0) + 0.25 * (matureLapse ? 1 : 0) + 0.15 * (ok ? 0 : 1);
    f.n++; f.L = f.L * 0.75 + s * 0.25;
    if (S.settings.pace === 'off' || !SES.opts || !SES.opts.rebuild) return;
    if (f.lvl < 1 && f.n >= 10 && f.L >= 0.28) {
      f.lvl = 1; const gone = new Set(); const keep = [];
      SES.items.forEach((x, k) => {
        if (k > SES.i && x && x.isNew && (x.type === 'intro' || gone.has(x.wid))) { gone.add(x.wid); return; }
        keep.push(x);
      });
      // buang juga soal lanjutan dari kata yang perkenalannya ditunda
      const out = keep.filter((x, k) => !(k > SES.i && x && x.isNew && gone.has(x.wid)));
      if (gone.size) { SES.items = out; toast(t('Kata baru disimpan untuk nanti — sekarang cukup mengulang.'), 3200, 'pkfat'); progressBar(); }
    }
    if (f.lvl < 2 && f.n >= 14 && f.L >= 0.42) {
      f.lvl = 2;
      if (SES.items.length - (SES.i + 1) > 3) { SES.items.length = SES.i + 4; toast(t('Tiga soal lagi, lalu istirahat. Sisanya menunggu sampai kamu segar.'), 4200, 'pkfat'); progressBar(); }
      S.adapt.fatN = (S.adapt.fatN || 0) + 1;
    }
  }
  PK.fatigue = pkFatigue;

  /* =====================================================================
     3. RASA: getar, garis nada, transisi rute, tema Malam
     ===================================================================== */
  const BUZZ = { tap: 8, ok: 12, bad: [20, 40, 20], win: [10, 30, 10, 30, 40] };
  function buzz(k) { try { if (S.settings.haptic === 'off' || !navigator.vibrate) return; navigator.vibrate(BUZZ[k]); } catch (e) {} }
  PK.buzz = buzz;

  /* garis nada: kontur tiap suku kata digambar di bawah jawaban yang benar */
  const TONE_D = { 1: 'M1 3.5H19', 2: 'M1 11 19 3', 3: 'M1 5 8 11 19 4', 4: 'M1 3 19 11' };
  function toneSvg(tones) {
    const ts = (tones || []).filter(x => x >= 1 && x <= 5).slice(0, 6); if (!ts.length) return '';
    const w = ts.length * 24;
    return `<svg class="pk-tone" viewBox="0 0 ${w} 14" width="${w}" height="14" aria-hidden="true">${ts.map((tn, k) => tn === 5
      ? `<circle class="pk-td" cx="${k * 24 + 12}" cy="8" r="2" style="fill:var(--t5);animation-delay:${k * 90}ms"/>`
      : `<path d="${TONE_D[tn]}" transform="translate(${k * 24 + 2} 0)" pathLength="1" style="stroke:var(--t${tn});animation-delay:${k * 90}ms"/>`).join('')}</svg>`;
  }
  PK.toneSvg = toneSvg;
  function pkToneOnAnswer(it) {
    if (!it || it.wid === undefined || !W[it.wid] || !W[it.wid].t) return;
    const el = document.querySelector('#sbody [data-s="opt"].ok'); if (!el || el.querySelector('.pk-tone')) return;
    el.insertAdjacentHTML('beforeend', toneSvg(W[it.wid].t)); el.classList.add('pk-hastone');
  }

  const answerBase = answer;
  answer = function (ok, note) {
    let it = null, pre = null;
    try {
      if (SES && !SES.answered) {
        it = SES.items[SES.i]; let r = null;
        if (it && it.wid !== undefined && S.cards[it.wid] && S.cards[it.wid].ph === 'rev') r = recallProb(it.wid);
        pre = { ms: Date.now() - SES.shown, r };
      }
    } catch (e) { it = null; }
    const out = answerBase.apply(this, arguments);
    if (it && pre && SES) {
      buzz(ok ? 'ok' : 'bad');
      try { if (ok) pkToneOnAnswer(it); } catch (e) {}
      try { pkFatigue(ok, it, pre); } catch (e) { console.warn('pk fatigue', e); }
    }
    return out;
  };
  document.addEventListener('pointerdown', e => { if (e.target.closest && e.target.closest('.tab,.nav,.seg button')) buzz('tap'); }, { passive: true });

  /* transisi antar rute (View Transitions API); tanpa dukungan → render biasa */
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const renderBase = render;
  render = function () {
    const next = location.hash.slice(1) || 'home';
    if (PK.booted && !PK.noVT && document.startViewTransition && !reduce.matches && !SES && next !== ROUTE && !document.hidden && !document.querySelector('.overlay,#session')) {
      try {
        const order = ROUTES.map(r => r[0]); const a = order.indexOf(ROUTE), b = order.indexOf(next);
        document.documentElement.dataset.nav = b >= 0 && a >= 0 && b < a ? 'back' : 'fwd';
        const tr = document.startViewTransition(() => { renderBase(); window.scrollTo(0, 0); });
        // transisi yang dilewati (navigasi beruntun, tab disembunyikan) menolak ketiga promise ini; itu bukan galat
        if (tr) ['ready', 'finished', 'updateCallbackDone'].forEach(k => { if (tr[k] && tr[k].catch) tr[k].catch(() => {}); });
        return;
      } catch (e) {}
    }
    return renderBase.apply(this, arguments);
  };

  /* tema Malam: memakai semua aturan tema Redup (data-theme="dark") + token yang lebih gelap (data-night) */
  const themeBase = applyTheme;
  applyTheme = function () {
    themeBase.apply(this, arguments);
    const r = document.documentElement; const night = S && S.settings && S.settings.theme === 'night';
    if (night) { r.setAttribute('data-theme', 'dark'); r.dataset.night = '1'; const m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = '#0f0b10'; }
    else delete r.dataset.night;
  };

  /* ---------- pindah HP lewat QR ----------
     HP lama menampilkan kode QR yang berganti-ganti; HP baru memindainya lewat kamera. Tanpa internet,
     tanpa server: progres berpindah lewat cahaya layar saja.
     Muatan  = [1 byte: 1 = gzip, 0 = polos] + JSON progres
     Bingkai = "XQ1:<id 4>:<nomor>:<jumlah>:<CRC32 muatan>:<potongan base45>:" (mode alfanumerik QR, ±97% efisien)
     Bingkai boleh tiba acak dan berulang; HP baru menunggu sampai semua nomor terkumpul lalu memeriksa CRC. */
  const B45 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:';
  function b45enc(u8) {
    let s = '';
    for (let i = 0; i < u8.length; i += 2) {
      if (i + 1 < u8.length) { let x = u8[i] * 256 + u8[i + 1]; s += B45[x % 45]; x = (x / 45) | 0; s += B45[x % 45] + B45[(x / 45) | 0]; }
      else { const x = u8[i]; s += B45[x % 45] + B45[(x / 45) | 0]; }
    }
    return s;
  }
  function b45dec(s) {
    const out = new Uint8Array(Math.floor(s.length / 3) * 2 + (s.length % 3 ? 1 : 0)); let o = 0;
    for (let i = 0; i < s.length; i += 3) {
      const a = B45.indexOf(s[i]), b = B45.indexOf(s[i + 1]);
      if (i + 2 < s.length) { const c = B45.indexOf(s[i + 2]); const x = a + b * 45 + c * 2025; if (a < 0 || b < 0 || c < 0 || x > 65535) throw new Error('b45'); out[o++] = x >> 8; out[o++] = x & 255; }
      else { if (a < 0 || b < 0 || a + b * 45 > 255) throw new Error('b45'); out[o++] = a + b * 45; }
    }
    return out;
  }
  const QR_CHUNK = 630;                      // karakter base45 per bingkai → QR versi 15 (77×77), masih mudah dipindai dari layar HP
  async function qrPayload(state) {
    const raw = new TextEncoder().encode(JSON.stringify(state || S));
    if (typeof CompressionStream === 'function') {
      try { const z = new Uint8Array(await new Response(new Blob([raw]).stream().pipeThrough(new CompressionStream('gzip'))).arrayBuffer()); const out = new Uint8Array(z.length + 1); out[0] = 1; out.set(z, 1); return out; } catch (e) {}
    }
    const out = new Uint8Array(raw.length + 1); out[0] = 0; out.set(raw, 1); return out;
  }
  async function qrUnpack(bytes) {
    const body = bytes.subarray(1);
    if (bytes[0] === 1) return JSON.parse(await new Response(new Blob([body]).stream().pipeThrough(new DecompressionStream('gzip'))).text());
    return JSON.parse(new TextDecoder().decode(body));
  }
  function qrFrames(bytes) {
    const s = b45enc(bytes); const n = Math.max(1, Math.ceil(s.length / QR_CHUNK)); const crc = crcHex(bytes).toUpperCase();
    let id = ''; for (let i = 0; i < 4; i++) id += B45[Math.floor(Math.random() * 36)];
    const out = []; for (let k = 0; k < n; k++) out.push(`XQ1:${id}:${k + 1}:${n}:${crc}:${s.slice(k * QR_CHUNK, (k + 1) * QR_CHUNK)}:`);
    return out;
  }
  /* terima satu teks hasil pindai; mengembalikan status. st = {id, n, crc, parts:{}} (diisi di tempat) */
  function qrFeed(st, text) {
    const m = /^XQ1:([0-9A-Z]{4}):(\d{1,4}):(\d{1,4}):([0-9A-F]{8}):([\s\S]*):$/.exec(String(text || ''));
    if (!m) return { ok: false, have: Object.keys(st.parts || {}).length, total: st.n || 0 };
    const k = +m[2], n = +m[3];
    if (st.id !== m[1] || st.n !== n || st.crc !== m[4]) { st.id = m[1]; st.n = n; st.crc = m[4]; st.parts = {}; }   // sesi baru
    if (k >= 1 && k <= n && st.parts[k] === undefined) st.parts[k] = m[5];
    const have = Object.keys(st.parts).length;
    if (have < n) return { ok: true, have, total: n };
    let bytes; try { let s = ''; for (let i = 1; i <= n; i++) s += st.parts[i]; bytes = b45dec(s); } catch (e) { st.parts = {}; return { ok: false, have: 0, total: n, rusak: true }; }
    if (crcHex(bytes).toUpperCase() !== st.crc) { st.parts = {}; return { ok: false, have: 0, total: n, rusak: true }; }
    return { ok: true, have, total: n, done: true, bytes };
  }
  let qrLibP = null;
  function qrLib() {
    if (window.qrcode && window.jsQR) return Promise.resolve();
    return qrLibP || (qrLibP = new Promise((res, rej) => {
      const s = document.createElement('script'); s.src = 'qr.js?v=k170'; s.async = true;
      s.onload = () => (window.qrcode && window.jsQR ? res() : rej(new Error('qr'))); s.onerror = () => { qrLibP = null; s.remove(); rej(new Error('qr')); };
      document.head.appendChild(s);
    }));
  }
  function qrDraw(cv, text) {
    const q = window.qrcode(0, 'L'); q.addData(text, 'Alphanumeric'); q.make();
    const m = q.getModuleCount(), quiet = 4, cell = Math.max(2, Math.floor(cv.width / (m + quiet * 2))), off = Math.floor((cv.width - cell * m) / 2);
    const g = cv.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, cv.width, cv.height); g.fillStyle = '#000';
    for (let r = 0; r < m; r++) for (let c = 0; c < m; c++) if (q.isDark(r, c)) g.fillRect(off + c * cell, off + r * cell, cell, cell);
    return m;
  }
  PK.qr = { b45enc, b45dec, payload: qrPayload, unpack: qrUnpack, frames: qrFrames, feed: qrFeed, lib: qrLib, draw: qrDraw };

  async function qrSend() {
    try { await qrLib(); } catch (e) { toast(t('Fitur QR belum bisa dimuat — cek koneksi, lalu coba lagi.'), 3600); return; }
    const frames = qrFrames(await qrPayload()); const n = frames.length; const secs = Math.ceil(n / 5);
    openModal(`<h2>${t('Kirim progres ke HP lain')}</h2>
      <p class="muted" style="margin:0 0 10px">${t('Di HP baru: buka Xiǎobù → Terima lewat QR, lalu arahkan kameranya ke kode ini sampai selesai.')}</p>
      <canvas id="pk-qr" class="pk-qr" width="720" height="720" aria-label="QR"></canvas>
      <p class="small muted" style="text-align:center;margin:8px 0 0"><span id="pk-qrn">1</span> / ${n} · ${t('satu putaran ±{s} detik', { s: secs })}</p>
      <p class="small muted" style="text-align:center;margin:4px 0 0">${t('Naikkan kecerahan layar. Progres tidak dikirim ke internet.')}</p>`, 'pk-qrsheet');
    const cv = document.getElementById('pk-qr'), lab = document.getElementById('pk-qrn'); let k = 0;
    S.lastBackup = Date.now(); save();
    const tick = () => { if (!document.body.contains(cv)) return; try { qrDraw(cv, frames[k]); lab.textContent = k + 1; } catch (e) {} k = (k + 1) % n; setTimeout(tick, 200); };
    tick();
  }
  async function qrRecv() {
    try { await qrLib(); } catch (e) { toast(t('Fitur QR belum bisa dimuat — cek koneksi, lalu coba lagi.'), 3600); return; }
    openModal(`<h2>${t('Terima progres lewat QR')}</h2>
      <p class="muted" style="margin:0 0 10px">${t('Di HP lama: buka Saya → Kirim lewat QR. Arahkan kamera ini ke kodenya dan tahan sampai penuh.')}</p>
      <div class="pk-cam"><video id="pk-vid" playsinline muted></video></div>
      <div class="pk-bar"><i id="pk-qrbar"></i></div>
      <p class="small muted" style="text-align:center;margin:6px 0 0" id="pk-qrst">${t('Menyalakan kamera…')}</p>`, 'pk-qrsheet');
    const vid = document.getElementById('pk-vid'), bar = document.getElementById('pk-qrbar'), stEl = document.getElementById('pk-qrst');
    let stream = null; const stop = () => { try { stream && stream.getTracks().forEach(x => x.stop()); } catch (e) {} };
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) throw new Error('nocam');
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
    } catch (e) { if (stEl) stEl.textContent = t('Kamera tidak bisa dipakai. Izinkan akses kamera, atau pakai Tempel kode progres.'); return; }
    if (!document.body.contains(vid)) { stop(); return; }
    vid.srcObject = stream; try { await vid.play(); } catch (e) {}
    stEl.textContent = t('Arahkan ke kode QR di HP lama');
    let det = null; try { if ('BarcodeDetector' in window) det = new window.BarcodeDetector({ formats: ['qr_code'] }); } catch (e) { det = null; }
    const cv = document.createElement('canvas'); const g = cv.getContext('2d', { willReadFrequently: true });
    const st = { parts: {} }; let busy = false, last = 0, finished = false;
    const scan = async now => {
      if (finished) return;
      if (!document.body.contains(vid)) { stop(); return; }
      requestAnimationFrame(scan);
      if (busy || now - last < 70 || vid.readyState < 2 || !vid.videoWidth) return;
      busy = true; last = now; let text = '';
      try {
        if (det) { const r = await det.detect(vid); if (r && r[0]) text = r[0].rawValue || ''; }
        if (!text) {
          const w = Math.min(720, vid.videoWidth), h = Math.round(w * vid.videoHeight / vid.videoWidth); if (cv.width !== w) { cv.width = w; cv.height = h; }
          g.drawImage(vid, 0, 0, w, h); const im = g.getImageData(0, 0, w, h); const r = window.jsQR(im.data, w, h, { inversionAttempts: 'dontInvert' }); if (r) text = r.data;
        }
      } catch (e) { if (det) det = null; }
      busy = false; if (!text) return;
      const r = qrFeed(st, text);
      if (r.total) { bar.style.width = (r.have / r.total * 100) + '%'; stEl.textContent = t('{a} dari {b} bagian', { a: r.have, b: r.total }); }
      if (r.done) {
        finished = true; stop(); buzz('win');
        try { const d = await qrUnpack(r.bytes); if (!d || !d.cards || !d.settings) throw 0; closeModal(); pkOfferRestore(d); }
        catch (e) { stEl.textContent = t('⚠️ Kode progres tidak valid'); }
      }
    };
    requestAnimationFrame(scan);
  }
  /* tombol "Terima lewat QR" di layar perkenalan (HP baru biasanya mulai dari sini) */
  function pkOnbQr() {
    const b = document.querySelector('#onb [data-a="onbpaste"]'); if (!b || document.querySelector('#onb [data-pk="qrrecv"]')) return;
    const n = document.createElement('button'); n.className = b.className; n.dataset.pk = 'qrrecv'; n.innerHTML = `${ICON('grid')} ${t('Terima lewat QR')}`;
    b.parentNode.insertBefore(n, b);
  }
  document.addEventListener('click', () => setTimeout(() => { try { pkOnbQr(); } catch (e) {} }, 60), true);

  /* ---------- langit harian: "Aliran Nada" ----------
     Medan aliran dari derau berbenih (benih = tanggal). Tiap garis membawa satu nada dan condong mengikuti
     konturnya: nada 1 mendatar, 2 naik, 3 melekuk, 4 turun. Perbandingan warna mengikuti nada kata-kata
     yang sedang kamu pelajari. Digambar SEKALI ke kanvas kecil lalu dipasang sebagai gambar diam. */
  function mulberry(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let x = Math.imul(a ^ a >>> 15, 1 | a); x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x; return ((x ^ x >>> 14) >>> 0) / 4294967296; }; }
  function skyToneMix() {
    const m = [1, 1, 1, 1]; let n = 0;
    try { for (const k in S.cards) { const w = W[k]; if (!w || !w.t) continue; w.t.forEach(x => { if (x >= 1 && x <= 4) m[x - 1]++; }); if (++n > 400) break; } } catch (e) {}
    const s = m.reduce((a, b) => a + b, 0); return m.map(x => x / s);
  }
  function skyDraw(seedStr, dark) {
    let seed = 0; for (let i = 0; i < seedStr.length; i++) seed = Math.imul(seed ^ seedStr.charCodeAt(i), 16777619) >>> 0;
    const rnd = mulberry(seed || 1);
    const Wd = 480, Hd = 860; const c = document.createElement('canvas'); c.width = Wd; c.height = Hd; const g = c.getContext('2d');
    // derau nilai halus 2D (kisi 8×14, interpolasi smoothstep)
    const GX = 9, GY = 15; const grid = new Float32Array(GX * GY); for (let i = 0; i < grid.length; i++) grid[i] = rnd();
    const noise = (x, y) => {
      const fx = x / Wd * (GX - 1), fy = y / Hd * (GY - 1); const x0 = Math.max(0, Math.min(GX - 2, fx | 0)), y0 = Math.max(0, Math.min(GY - 2, fy | 0));
      let tx = fx - x0, ty = fy - y0; tx = tx * tx * (3 - 2 * tx); ty = ty * ty * (3 - 2 * ty);
      const a = grid[y0 * GX + x0], b = grid[y0 * GX + x0 + 1], d = grid[(y0 + 1) * GX + x0], e = grid[(y0 + 1) * GX + x0 + 1];
      return (a + (b - a) * tx) * (1 - ty) + (d + (e - d) * tx) * ty;
    };
    const cs = getComputedStyle(document.documentElement); const col = [1, 2, 3, 4].map(n => cs.getPropertyValue('--t' + n).trim() || '#999');
    const mix = skyToneMix(); const pick = () => { let r = rnd(); for (let i = 0; i < 4; i++) { if ((r -= mix[i]) <= 0) return i; } return 3; };
    // sudut dasar tiap nada sepanjang umur garis (p = 0…1); y kanvas ke bawah, jadi "naik" = sudut negatif
    const lean = [p => 0, p => -0.42, p => (p < 0.45 ? 0.5 : -0.55), p => 0.46];
    // garis lahir di sekitar satu pita diagonal berbenih; sisanya dibiarkan tenang
    const bx = 0.15 + rnd() * 0.2, by = 0.1 + rnd() * 0.25, ex = 0.75 + rnd() * 0.2, ey = 0.6 + rnd() * 0.3;
    g.lineCap = 'round'; g.lineJoin = 'round';
    const N = 150;
    for (let i = 0; i < N; i++) {
      const tn = pick(); const u = rnd(); const spread = (rnd() + rnd() + rnd() - 1.5) * 0.3;
      let x = (bx + (ex - bx) * u + spread * 0.9) * Wd - 60, y = (by + (ey - by) * u - spread) * Hd;
      const steps = 46 + (rnd() * 40 | 0), len = 3.4 + rnd() * 1.6;
      g.beginPath(); g.moveTo(x, y);
      for (let s = 0; s < steps; s++) {
        const p = s / steps; const a = lean[tn](p) + (noise(x, y) - 0.5) * 1.5;
        x += Math.cos(a) * len; y += Math.sin(a) * len; g.lineTo(x, y);
      }
      g.strokeStyle = col[tn]; g.globalAlpha = (dark ? 0.2 : 0.13) * (0.45 + rnd() * 0.55); g.lineWidth = 0.8 + rnd() * 1.9; g.stroke();
    }
    return c;
  }
  function pkSky(force) {
    const r = document.documentElement; let el = document.getElementById('pk-sky');
    const off = S.settings.sky === 'off' || r.classList.contains('lite');
    if (off) { if (el) el.remove(); return; }
    const dark = r.getAttribute('data-theme') === 'dark' || (!r.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
    const key = todayKey() + '|' + (dark ? (r.dataset.night ? 'n' : 'd') : 'l');
    if (el && el.dataset.k === key && !force) return;
    const run = () => {
      try {
        const c = skyDraw(todayKey(), dark);
        if (!el) { el = document.createElement('div'); el.id = 'pk-sky'; el.setAttribute('aria-hidden', 'true'); document.body.prepend(el); }
        el.dataset.k = key;
        c.toBlob(b => { if (!b || !el) return; const old = el.dataset.u; const u = URL.createObjectURL(b); el.style.backgroundImage = `url(${u})`; el.dataset.u = u; if (old) URL.revokeObjectURL(old); }, 'image/webp', 0.86);
      } catch (e) {}
    };
    (window.requestIdleCallback || (f => setTimeout(f, 60)))(run);
  }
  PK.sky = pkSky; PK.skyDraw = skyDraw;
  const themeBase2 = applyTheme;
  applyTheme = function () { const out = themeBase2.apply(this, arguments); try { if (PK.booted) pkSky(); } catch (e) {} return out; };

  /* ---------- suara: penjaga untuk ucapan yang dipanggil langsung lewat speechSynthesis ----------
     TTS.speak() milik app sudah punya penjaga sendiri. Ini menutup jalur lain (dialog, tes, game):
     kalau sebuah ucapan mulai tapi tak pernah selesai, ia dihentikan dan 'end' dikirim supaya alur lanjut. */
  if ('speechSynthesis' in window) {
    const spBase = speechSynthesis.speak.bind(speechSynthesis);
    speechSynthesis.speak = function (u) {
      try {
        if (u && u.text && u.text.trim() && u.volume !== 0) {
          let done = false, tm = 0;
          const est = () => (u.text.length * 520) / Math.max(0.4, u.rate || 1) + 6000;
          const fin = () => { done = true; clearTimeout(tm); };
          const bite = () => { if (done) return; try { speechSynthesis.cancel(); } catch (e) {} setTimeout(() => { if (!done) { done = true; try { u.dispatchEvent(new Event('end')); } catch (e) {} } }, 400); };
          u.addEventListener('end', fin); u.addEventListener('error', fin);
          u.addEventListener('start', () => { clearTimeout(tm); tm = setTimeout(bite, est()); });
          // antrean kosong tapi ucapan tak pernah mulai (terjadi di sebagian Android)
          if (!speechSynthesis.speaking && !speechSynthesis.pending) tm = setTimeout(bite, est() + 4000);
        }
      } catch (e) {}
      return spBase(u);
    };
  }

  /* ---------- kanvas game: batasi kerapatan piksel ----------
     HP ber-DPR 3 menggambar 9× piksel per frame. Game membaca devicePixelRatio saat mengatur kanvas;
     di sini nilainya dibatasi 2 (mode ringan: 1,5). CSS dan teks biasa tidak terpengaruh. */
  try {
    const desc = Object.getOwnPropertyDescriptor(window, 'devicePixelRatio') || Object.getOwnPropertyDescriptor(Window.prototype, 'devicePixelRatio');
    const real0 = window.devicePixelRatio || 1;
    const real = () => { try { return desc && desc.get ? desc.get.call(window) : real0; } catch (e) { return real0; } };
    Object.defineProperty(window, 'devicePixelRatio', { configurable: true, get() { return Math.min(real(), document.documentElement.classList.contains('lite') ? 1.5 : 2); } });
    PK.realDpr = real;
  } catch (e) {}

  /* =====================================================================
     BOOT
     ===================================================================== */
  window.__xbBooted = 1;
  boot();
  PK.booted = true;
  try { pkToneDecay(); } catch (e) {}
  try { pkQuarantineBanner(); } catch (e) {}
  try { pkSky(); } catch (e) {}
  setTimeout(() => { pkOfferMirror().catch(() => {}); }, 900);
  try { if (ROUTE === 'me') pkMeCard(); } catch (e) {}
  // minta penyimpanan permanen lagi pada sentuhan pertama (beberapa browser hanya mengabulkan setelah interaksi)
  addEventListener('pointerdown', () => { try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {}); } catch (e) {} }, { once: true, passive: true });
})();
