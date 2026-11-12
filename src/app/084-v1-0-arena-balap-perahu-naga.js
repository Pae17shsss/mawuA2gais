/* ========== V1.0 ARENA · 競舟 Balap Perahu Naga ==========
   Balap perahu naga 3 jalur (端午節): pemain (Hacimi) vs 2 rival AI. Tiap beberapa detik muncul soal;
   jawaban benar & cepat = dorongan, 5 benar beruntun = NITRO, salah = kecipratan & melambat.
   Semua digambar di kanvas (parallax), musik & sfx disintesis dengan Web Audio. Root: #arboat. */
Object.assign(I18N, {
  'Balap Perahu Naga': ['Dragon Boat Race', 'Karera ng Dragon Boat'],
  'Jawab cepat, perahumu ngebut! Kalahkan 2 perahu rival sampai garis finis.': ['Answer fast and your boat speeds up! Beat 2 rival boats to the finish line.', 'Sumagot nang mabilis at bibilis ang bangka mo! Talunin ang 2 karibal hanggang finish line.'],
  'Campur': ['Mixed', 'Halo'], 'Baca': ['Read', 'Basa'], 'Arti': ['Meaning', 'Kahulugan'], 'Dengar': ['Listen', 'Pakinig'], 'Pinyin': ['Pinyin', 'Pinyin'],
  'Mudah': ['Easy', 'Madali'], 'Normal': ['Normal', 'Normal'], 'Sulit': ['Hard', 'Mahirap'], 'Mode': ['Mode', 'Mode'], 'Tingkat': ['Level', 'Antas'],
  'Mulai balapan': ['Start race', 'Simulan ang karera'], 'Pilih arti yang benar': ['Choose the right meaning', 'Piliin ang tamang kahulugan'],
  'Pilih hanzi yang benar': ['Choose the right hanzi', 'Piliin ang tamang hanzi'], 'Dengar, lalu pilih hanzinya': ['Listen, then pick the hanzi', 'Makinig, saka piliin ang hanzi'],
  'Pilih pinyin yang benar': ['Choose the right pinyin', 'Piliin ang tamang pinyin'], 'Kamu': ['You', 'Ikaw'], 'Waktu habis!': ['Time up!', 'Ubos na ang oras!'],
  'Benar!': ['Correct!', 'Tama!'], 'Kurang tepat': ['Not quite', 'Hindi tama'], 'Jeda': ['Paused', 'Naka-pause'], 'Lanjut': ['Resume', 'Ituloy'], 'Keluar': ['Quit', 'Lumabas'],
  'Musik': ['Music', 'Musika'], 'Main lagi': ['Play again', 'Maglaro ulit'], 'Kembali': ['Back', 'Bumalik'], 'Skor': ['Score', 'Iskor'], 'Akurasi': ['Accuracy', 'Katumpakan'],
  'Kombo maks': ['Max combo', 'Max combo'], 'Waktu': ['Time', 'Oras'], 'Kata yang perlu diulang': ['Words to review', 'Mga salitang uulitin'],
  'Semua benar — mantap!': ['All correct — awesome!', 'Lahat tama — galing!'], 'Rekor baru!': ['New record!', 'Bagong rekord!'],
  'Juara 1': ['1st place', 'Unang puwesto'], 'Juara 2': ['2nd place', 'Ikalawang puwesto'], 'Juara 3': ['3rd place', 'Ikatlong puwesto'],
  'Dengar lagi': ['Listen again', 'Pakinggan ulit'], 'Pelan': ['Slow', 'Mabagal'], 'Jawab cepat = dorongan lebih besar': ['Faster answer = bigger boost', 'Mas mabilis na sagot = mas malakas na tulak'],
  '5 benar beruntun = NITRO': ['5 correct in a row = NITRO', '5 sunod-sunod na tama = NITRO'], 'Salah = perahu kecipratan & melambat': ['Wrong = splash & slow down', 'Mali = tilamsik at babagal'],
  'kata': ['words', 'salita'], 'Tekan 1–4 atau ketuk jawaban': ['Press 1–4 or tap an answer', 'Pindutin ang 1–4 o i-tap ang sagot'],
  'Lihat hanzi': ['See hanzi', 'Tingnan ang hanzi'], 'Lihat arti': ['See meaning', 'Tingnan ang kahulugan'], 'Dengar kata': ['Hear the word', 'Pakinggan ang salita'], 'Nada & pinyin': ['Tones & pinyin', 'Tono at pinyin'], 'Semua jenis': ['All types', 'Lahat ng uri'],
  'Putaran terakhir!': ['Final stretch!', 'Huling bahagi!'], 'Tertinggal': ['Behind', 'Nahuhuli'], 'Memimpin': ['Leading', 'Nangunguna'], 'Peringkat': ['Rank', 'Ranggo'],
  'Juara 4': ['4th place', 'Ikaapat na puwesto'], 'Hasil balapan': ['Race results', 'Resulta ng karera'], 'Menunggu pemain lain…': ['Waiting for the others…', 'Hinihintay ang iba…'],
  'Finis ditutup {n} dtk': ['Finish closes in {n}s', 'Sasara ang finish sa {n}s'], 'Balap 2–4 pemain, tiap HP sendiri': ['Race 2–4 players, each on their own phone', 'Karera ng 2–4, kanya-kanyang phone'],
  'Koneksi terputus…': ['Connection lost…', 'Naputol ang koneksyon…'], 'Terhubung lagi': ['Reconnected', 'Nakakonekta ulit'], 'Belum finis': ['Did not finish', 'Hindi natapos'], 'Bot': ['Bot', 'Bot']
});
Object.assign(I18N_VI, {
  'Balap Perahu Naga': 'Đua thuyền rồng', 'Jawab cepat, perahumu ngebut! Kalahkan 2 perahu rival sampai garis finis.': 'Trả lời nhanh, thuyền bạn tăng tốc! Đánh bại 2 thuyền đối thủ về đích.',
  'Campur': 'Trộn', 'Baca': 'Đọc', 'Arti': 'Nghĩa', 'Dengar': 'Nghe', 'Pinyin': 'Pinyin', 'Mudah': 'Dễ', 'Normal': 'Thường', 'Sulit': 'Khó', 'Mode': 'Chế độ', 'Tingkat': 'Cấp độ',
  'Mulai balapan': 'Bắt đầu đua', 'Pilih arti yang benar': 'Chọn nghĩa đúng', 'Pilih hanzi yang benar': 'Chọn chữ Hán đúng', 'Dengar, lalu pilih hanzinya': 'Nghe rồi chọn chữ Hán',
  'Pilih pinyin yang benar': 'Chọn pinyin đúng', 'Kamu': 'Bạn', 'Waktu habis!': 'Hết giờ!', 'Benar!': 'Đúng!', 'Kurang tepat': 'Chưa đúng', 'Jeda': 'Tạm dừng', 'Lanjut': 'Tiếp tục', 'Keluar': 'Thoát',
  'Musik': 'Nhạc', 'Main lagi': 'Chơi lại', 'Kembali': 'Quay lại', 'Skor': 'Điểm', 'Akurasi': 'Độ chính xác', 'Kombo maks': 'Combo cao nhất', 'Waktu': 'Thời gian',
  'Kata yang perlu diulang': 'Từ cần ôn lại', 'Semua benar — mantap!': 'Đúng hết — tuyệt vời!', 'Rekor baru!': 'Kỷ lục mới!', 'Juara 1': 'Hạng nhất', 'Juara 2': 'Hạng nhì', 'Juara 3': 'Hạng ba',
  'Dengar lagi': 'Nghe lại', 'Pelan': 'Chậm', 'Jawab cepat = dorongan lebih besar': 'Trả lời nhanh = tăng tốc mạnh hơn', '5 benar beruntun = NITRO': '5 câu đúng liên tiếp = NITRO',
  'Salah = perahu kecipratan & melambat': 'Sai = thuyền bị té nước & chậm lại', 'kata': 'từ', 'Tekan 1–4 atau ketuk jawaban': 'Nhấn 1–4 hoặc chạm vào đáp án',
  'Lihat hanzi': 'Xem chữ Hán', 'Lihat arti': 'Xem nghĩa', 'Dengar kata': 'Nghe từ', 'Nada & pinyin': 'Thanh điệu & pinyin', 'Semua jenis': 'Mọi loại',
  'Putaran terakhir!': 'Chặng cuối!', 'Tertinggal': 'Bị bỏ lại', 'Memimpin': 'Dẫn đầu', 'Peringkat': 'Hạng',
  'Juara 4': 'Hạng tư', 'Hasil balapan': 'Kết quả cuộc đua', 'Menunggu pemain lain…': 'Đang chờ người khác…', 'Finis ditutup {n} dtk': 'Đích đóng sau {n} giây',
  'Balap 2–4 pemain, tiap HP sendiri': 'Đua 2–4 người, mỗi người một điện thoại', 'Koneksi terputus…': 'Mất kết nối…', 'Terhubung lagi': 'Đã kết nối lại', 'Belum finis': 'Chưa về đích', 'Bot': 'Bot'
});

const ARBOAT = (() => {
  'use strict';
  /* ---------- ikon kaca (garis putih) ---------- */
  const SV = (p, cls = '') => `<svg class="bo-ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const IC = {
    x: SV('<path d="M6 6l12 12M18 6L6 18"/>'),
    music: SV('<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>'),
    mute: SV('<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/><path d="M3 3l18 18"/>'),
    pause: SV('<path d="M9 6v12M15 6v12"/>'),
    play: SV('<path d="M8 5.5v13l10.5-6.5z"/>'),
    spk: SV('<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>'),
    slow: SV('<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 10.2a2.4 2.4 0 0 1 0 3.6"/><path d="M19 9l2 3-2 3"/>'),
    replay: SV('<path d="M4 12a8 8 0 1 0 2.5-5.8"/><path d="M4 4v4h4"/>'),
    flag: SV('<path d="M5 21V4"/><path d="M5 4h12l-2.5 4L17 12H5"/>'),
    eye: SV('<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
    book: SV('<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 21H20"/><path d="M9 8h7M9 11.5h5"/>'),
    ear: SV('<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>'),
    tone: SV('<path d="M3 6h5"/><path d="M10 12l4-6"/><path d="M16 7q2.5 7 5 0"/><path d="M3 18h18"/>'),
    mix: SV('<path d="M3 7h3.5c3 0 4 10 7 10H21"/><path d="M3 17h3.5c1.4 0 2.3-2 3.1-4.2M13.2 11c.8-2.2 1.7-4 3.3-4H21"/><path d="M18 4l3 3-3 3M18 14l3 3-3 3"/>'),
    bolt: SV('<path d="M13 2.5L4.5 13.5H12L11 21.5l8.5-11H12z"/>'),
    drop: SV('<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>'),
    fast: SV('<circle cx="13" cy="13" r="8"/><path d="M13 9v4l2.5 2M2 9h4M1.5 13h3M2 17h4"/>'),
    back: SV('<path d="M15 18l-6-6 6-6"/>'),
    trophy: SV('<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4"/><path d="M12 13v4M8.5 20h7"/>'),
    users: SV('<circle cx="9" cy="8" r="3.3"/><path d="M2.5 19.5c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><circle cx="17.2" cy="8.8" r="2.6"/><path d="M16.5 13.6c3 .1 5 2.1 5 5"/>'),
    wifi: SV('<path d="M2 8.8a15 15 0 0 1 20 0"/><path d="M5.3 12.3a10.2 10.2 0 0 1 13.4 0"/><path d="M8.7 15.8a5.2 5.2 0 0 1 6.6 0"/><circle cx="12" cy="19.2" r=".9"/>'),
    wifioff: SV('<path d="M2 8.8a15 15 0 0 1 6-3.4M13.5 5.1A15 15 0 0 1 22 8.8"/><path d="M5.3 12.3a10 10 0 0 1 4-2.2M8.7 15.8a5.2 5.2 0 0 1 6.6 0"/><circle cx="12" cy="19.2" r=".9"/><path d="M3 3l18 18"/>'),
    crown: SV('<path d="M3.5 8l4.5 4 4-7 4 7 4.5-4-2 10.5h-13z"/><path d="M6 21h12"/>'),
    boat: SV('<path d="M2.5 13.5h14.5l2.6-4.2"/><path d="M19.6 9.3l1.9-1.1-.4 2.3"/><path d="M3.5 13.5q1 3 4.5 3h7q3 0 4-3"/><path d="M8 13.5v-3M11.5 13.5v-3"/><path d="M2 20q2.5-1.6 5 0t5 0 5 0 5 0"/>')
  };
  const MODES = [
    { k: 'mix', n: 'Campur', zh: '混合', ic: 'mix', d: 'Semua jenis' },
    { k: 'baca', n: 'Baca', zh: '讀', ic: 'eye', d: 'Lihat hanzi' },
    { k: 'arti', n: 'Arti', zh: '義', ic: 'book', d: 'Lihat arti' },
    { k: 'dengar', n: 'Dengar', zh: '聽', ic: 'ear', d: 'Dengar kata' },
    { k: 'pinyin', n: 'Pinyin', zh: '拼', ic: 'tone', d: 'Nada & pinyin' }
  ];
  const DIFF = [
    { n: 'Mudah', zh: '易', T: 7.5, pace: 8.9, D: 650, lv: 0 },
    { n: 'Normal', zh: '中', T: 5.8, pace: 10.2, D: 750, lv: 2 },
    { n: 'Sulit', zh: '難', T: 4.5, pace: 11.6, D: 850, lv: 4 }
  ];
  const TYPE_INFO = {
    baca: { ic: 'eye', n: 'Baca', zh: '讀', how: 'Pilih arti yang benar' },
    arti: { ic: 'book', n: 'Arti', zh: '義', how: 'Pilih hanzi yang benar' },
    dengar: { ic: 'ear', n: 'Dengar', zh: '聽', how: 'Dengar, lalu pilih hanzinya' },
    pinyin: { ic: 'tone', n: 'Pinyin', zh: '拼', how: 'Pilih pinyin yang benar' }
  };
  const BOATS = [
    { name: '阿龍 Along', col: '#2f9bff', hi: '#8fd3ff', dk: '#123a7a', acc: '#ffd23f', acc2: '#ff8a3d', hair: '#2a3b8f', shirt: '#ffffff', band: '#2f9bff', lane: 0, k: 0.97 },
    { name: '小虎 Xiaohu', col: '#ffb020', hi: '#ffe08a', dk: '#7a3a06', acc: '#ff4d4d', acc2: '#ffef9a', hair: '#ff7a2f', shirt: '#2b2b4a', band: '#ff4d4d', lane: 1, k: 1.03 },
    { name: 'Hacimi', col: '#ff4f8b', hi: '#ffb3cc', dk: '#7a1a40', acc: '#ffd23f', acc2: '#8a5cff', lane: 2, me: true }
  ];
  const PLACE = ['1st', '2nd', '3rd', '4th'], PLACE_ZH = ['第一名', '第二名', '第三名', '第四名'], PLACE_ID = ['Juara 1', 'Juara 2', 'Juara 3', 'Juara 4'];
  const GRACE = 25000;           // ms setelah finisher pertama (online)
  const LANES = { 2: [[0.45, 0.84], [0.82, 1]], 3: [[0.33, 0.6, 0.87], [0.74, 0.87, 1]], 4: [[0.24, 0.46, 0.68, 0.9], [0.64, 0.76, 0.88, 1]] };
  let ONP = null;                // pool untuk sesi online

  let G = null; // satu-satunya sesi aktif
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = a => a[Math.random() * a.length | 0];
  const nfmt = n => (typeof fmtN === 'function' ? fmtN(n) : String(n));

  /* ---------- pinyin ---------- */
  const VW = { a: 'āáǎà', e: 'ēéěè', i: 'īíǐì', o: 'ōóǒò', u: 'ūúǔù', 'ü': 'ǖǘǚǜ' };
  const plain = y => [...String(y || '').toLowerCase()].map(c => (MARKS[c] ? MARKS[c][0] : c)).join('').replace(/v/g, 'ü').replace(/[^a-zü]/g, '');
  function mark(p, tn) {
    if (!(tn >= 1 && tn <= 4)) return p;
    let k = p.indexOf('a'); if (k < 0) k = p.indexOf('e'); if (k < 0) k = p.indexOf('ou');
    if (k < 0) for (let j = p.length - 1; j >= 0; j--) if ('iouü'.includes(p[j])) { k = j; break; }
    return k < 0 ? p : p.slice(0, k) + VW[p[k]][tn - 1] + p.slice(k + 1);
  }
  const pyJoin = arr => arr.map((s, k) => (k && /^[aeoāáǎàēéěèōóǒò]/.test(s) ? "'" : '') + s).join('');
  const pyOf = sy => pyJoin(sy.map(s => mark(plain(s.y), s.tone)));
  const SWAP = [['zh', 'z'], ['ch', 'c'], ['sh', 's'], ['n', 'l'], ['b', 'p'], ['d', 't'], ['g', 'k'], ['j', 'q'], ['q', 'x'], ['f', 'h'], ['l', 'r'], ['zh', 'ch'], ['z', 'c']];
  function swapIni(p) {
    const m = p.match(/^(zh|ch|sh|[bpmfdtnlgkhjqxrzcs])/); if (!m) return null;
    const ini = m[1], fin = p.slice(ini.length);
    const opts = SWAP.filter(g => g.includes(ini)).map(g => g[0] === ini ? g[1] : g[0]).filter(n => {
      if ('jqx'.includes(n) && !/^[iuü]/.test(fin)) return false;
      if ('jqx'.includes(ini) !== 'jqx'.includes(n)) return false;
      if (n === 'f' && /^u./.test(fin)) return false;
      return true;
    });
    return opts.length ? pick(opts) + fin : null;
  }
  function pyOpts(sy, n, hard) {
    const base = sy.map(s => ({ p: plain(s.y), t: s.tone >= 1 && s.tone <= 4 ? s.tone : 5 }));
    const str = v => pyJoin(v.map(o => mark(o.p, o.t)));
    const right = str(base); const seen = new Set([right]); const res = [];
    for (let k = 0; k < 80 && res.length < n; k++) {
      const v = base.map(o => ({ ...o })); const j = Math.random() * v.length | 0;
      const ini = !hard && k % 3 === 2;
      if (ini) { const s2 = swapIni(v[j].p); if (s2) v[j].p = s2; else v[j].t = pick([1, 2, 3, 4].filter(x => x !== v[j].t)); }
      else {
        v[j].t = pick([1, 2, 3, 4].filter(x => x !== v[j].t));
        if (v.length > 1 && Math.random() < 0.3) { const j2 = (j + 1) % v.length; v[j2].t = pick([1, 2, 3, 4].filter(x => x !== v[j2].t)); }
      }
      const s = str(v); if (!seen.has(s)) { seen.add(s); res.push(s); }
    }
    return { right, wrong: res };
  }

  /* ---------- soal ---------- */
  function item(i) { try { const it = lgWItem(i); if (!it || !it.sy || !it.zh) return null; it.py = pyOf(it.sy); if (!/[A-Za-zÀ-ɏ\u1EA0-\u1EF9]{2}/.test(it.tr || '')) it.tr = ''; return it; } catch (e) { return null; } }
  function nextId() {
    const P = G.pool.ids;
    if (G.retry.length && G.retry[0].at <= G.qn) return G.retry.shift().i;
    if (!G.deck.length) G.deck = shuffle(P.slice());
    let i = G.deck.pop();
    if (G.recent.includes(i) && G.deck.length) { G.deck.unshift(i); i = G.deck.pop(); }
    return i;
  }
  function makeQ() {
    let type = G.mode;
    if (type === 'mix') { if (!G.tdeck.length) G.tdeck = shuffle(['baca', 'arti', 'dengar', 'pinyin', 'baca', 'arti']); type = G.tdeck.pop(); }
    if (type === 'dengar' && !(typeof TTS !== 'undefined' && TTS.ok)) type = 'arti';
    let it = null; for (let k = 0; k < 10 && !it; k++) { it = item(nextId()); if (it && !it.tr) it = null; }
    if (!it) return null;
    G.recent.push(it.i); if (G.recent.length > 4) G.recent.shift();
    const lv = DIFF[G.diff].lv; let opts, ans;
    const others = () => { let d = []; try { d = lgDistract(it.i, 10, lv); } catch (e) {} if (d.length < 6) d = d.concat(shuffle(G.pool.ids.filter(x => x !== it.i)).slice(0, 14)); return d; };
    if (type === 'pinyin') {
      const r = pyOpts(it.sy, 3, G.diff >= 2);
      /* buang bacaan lain yang sah dari kata yang sama (huruf polifonik, mis. 背 bèi/bēi) */
      try { const alt = new Set(W.filter(x => x !== W[it.i] && (x.w === W[it.i].w || x.s === W[it.i].s) && x.y && x.t).map(x => pyJoin(x.y.map((y, k) => mark(plain(y), x.t[k] >= 1 && x.t[k] <= 4 ? x.t[k] : 5))))); r.wrong = r.wrong.filter(o => !alt.has(o)); } catch (e) {}
      if (r.wrong.length < 3) type = 'baca';
      else { opts = shuffle([r.right].concat(r.wrong.slice(0, 3))); ans = opts.indexOf(r.right); }
    }
    if (type !== 'pinyin') {
      const key = type === 'baca' ? 'tr' : 'zh'; const seen = new Set([it[key]]); const wr = [];
      for (const d of others()) { if (wr.length >= 3) break; const o = item(d); if (!o || !o[key] || seen.has(o[key])) continue; if (key === 'tr' && o.zh === it.zh) continue; seen.add(o[key]); wr.push(o[key]); }
      if (wr.length < 3) return null;
      opts = shuffle([it[key]].concat(wr)); ans = opts.indexOf(it[key]);
    }
    return { type, it, opts, ans, el: 0, done: false };
  }

  /* ---------- audio ---------- */
  const mf = m => 440 * Math.pow(2, (m - 69) / 12);
  function auInit() {
    if (!S.settings.sound) return null;
    const ctx = FX.ensure(); if (!ctx) return null;
    try {
      const bus = ctx.createGain(); bus.gain.value = 0.9;
      const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -12; comp.ratio.value = 4; comp.attack.value = 0.004; comp.release.value = 0.2;
      bus.connect(comp); comp.connect(ctx.destination);
      const mus = ctx.createGain(); mus.gain.value = 0.0001; mus.connect(bus);
      const sfx = ctx.createGain(); sfx.gain.value = 0.8; sfx.connect(bus);
      if (!ctx.__abN) { const len = ctx.sampleRate * 2; const b = ctx.createBuffer(1, len, ctx.sampleRate); const d = b.getChannelData(0); for (let k = 0; k < len; k++) d[k] = Math.random() * 2 - 1; ctx.__abN = b; }
      if (!ctx.__abPW) { const n = 24, re = new Float32Array(n + 1), im = new Float32Array(n + 1); for (let k = 1; k <= n; k++) { re[k] = Math.sin(2 * Math.PI * k * 0.25) / (k * Math.PI); im[k] = (1 - Math.cos(2 * Math.PI * k * 0.25)) / (k * Math.PI); } ctx.__abPW = ctx.createPeriodicWave(re, im); }
      return { ctx, bus, comp, mus, sfx, N: ctx.__abN, pw: ctx.__abPW, next: 0, step: 0, hold: true, timer: 0, duck: -1 };
    } catch (e) { return null; }
  }
  function tone(dest, type, f, t, d, v, o = {}) {
    const A = G && G.au; if (!A) return; const c = A.ctx;
    const os = c.createOscillator(); if (type === 'pulse') os.setPeriodicWave(A.pw); else os.type = type;
    os.frequency.setValueAtTime(f, t); if (o.to) os.frequency.exponentialRampToValueAtTime(o.to, t + (o.tt || d)); if (o.det) os.detune.value = o.det;
    const g = c.createGain(); const a = o.a || 0.005; g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    let n = os; if (o.lp) { const fl = c.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = o.lp; fl.Q.value = o.q || 0.8; os.connect(fl); n = fl; }
    n.connect(g); g.connect(dest); os.start(t); os.stop(t + d + 0.03);
  }
  function noise(dest, t, d, v, ft, f, q, o = {}) {
    const A = G && G.au; if (!A) return; const c = A.ctx;
    const s = c.createBufferSource(); s.buffer = A.N; const fl = c.createBiquadFilter(); fl.type = ft; fl.frequency.setValueAtTime(f, t); fl.Q.value = q || 0.8;
    if (o.to) fl.frequency.exponentialRampToValueAtTime(o.to, t + d);
    const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + (o.a || 0.003)); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    s.connect(fl); fl.connect(g); g.connect(dest); s.start(t, Math.random() * 1.2); s.stop(t + d + 0.03);
  }
  /* instrumen */
  const I = {
    kick: (t, v = 0.9) => { const A = G.au; tone(A.mus, 'sine', 150, t, 0.32, v, { to: 42, tt: 0.13 }); noise(A.mus, t, 0.02, 0.25 * v, 'highpass', 1500); },
    snare: (t, v = 0.42) => { const A = G.au; noise(A.mus, t, 0.17, v, 'bandpass', 1900, 0.7); tone(A.mus, 'triangle', 210, t, 0.09, v * 0.5, { to: 160 }); },
    hat: (t, v = 0.1, open) => noise(G.au.mus, t, open ? 0.2 : 0.045, v, 'highpass', 7600, 0.9),
    crash: (t, v = 0.2) => noise(G.au.mus, t, 1.3, v, 'highpass', 4200, 0.5),
    taiko: (t, v = 0.95) => { const A = G.au; tone(A.mus, 'sine', 118, t, 0.62, v, { to: 52, tt: 0.32 }); tone(A.mus, 'triangle', 236, t, 0.12, v * 0.25, { to: 120 }); noise(A.mus, t, 0.11, v * 0.5, 'lowpass', 420, 1); },
    ka: (t, v = 0.2) => noise(G.au.mus, t, 0.035, v, 'bandpass', 3200, 3),
    bass: (t, m, d, v = 0.17) => { const A = G.au; tone(A.mus, 'square', mf(m), t, d, v * 0.55, { lp: 700 }); tone(A.mus, 'triangle', mf(m), t, d, v); },
    stab: (t, ms, d = 0.13, v = 0.045) => ms.forEach((m, k) => tone(G.au.mus, 'sawtooth', mf(m), t, d, v, { lp: 2200, det: k * 4 - 4 })),
    pad: (t, ms, d, v = 0.03) => ms.forEach((m, k) => { tone(G.au.mus, 'sawtooth', mf(m), t, d, v, { lp: 1100, a: 0.25, det: -7 }); tone(G.au.mus, 'sawtooth', mf(m), t, d, v * 0.7, { lp: 1100, a: 0.25, det: 7 }); }),
    lead: (t, m, d, v = 0.075) => { const A = G.au; tone(A.mus, 'pulse', mf(m), t, d, v, { lp: 4200 }); tone(A.mus, 'square', mf(m + 12), t, d * 0.7, v * 0.14, { lp: 5000, det: 6 }); },
    arp: (t, m, v = 0.028) => tone(G.au.mus, 'square', mf(m), t, 0.07, v, { lp: 5200 })
  };
  /* progresi: A = 王道進行 IV–V–iii–vi, B = vi–IV–I–V (C mayor) */
  const PA = [[53, 'M'], [55, 'M'], [52, 'm'], [57, 'm']], PB = [[57, 'm'], [53, 'M'], [48, 'M'], [55, 'M']];
  const triad = (r, q) => [r, r + (q === 'M' ? 4 : 3), r + 7];
  function mulberry(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const PENT = [67, 69, 72, 74, 76, 79, 81, 84, 86, 88];
  const RH = [[1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0], [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0], [1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0], [0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0]];
  const RH_END = [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0];
  function genMel(seed, prog) {
    const R = mulberry(seed); let idx = 4; const bars = [];
    const chordPC = b => triad(prog[b % 4][0], prog[b % 4][1]).map(m => m % 12);
    const near = (pcs) => { let best = idx, bd = 99; PENT.forEach((m, k) => { if (pcs.includes(m % 12)) { const d = Math.abs(k - idx) + R() * 0.8; if (d < bd) { bd = d; best = k; } } }); return best; };
    for (let b = 0; b < 4; b++) {
      const rh = b === 3 ? RH_END : RH[(seed + b * 3 + (R() * 2 | 0)) % RH.length]; const notes = [];
      for (let s = 0; s < 16; s++) if (rh[s]) {
        if (s % 4 === 0) idx = near(chordPC(b)); else idx = clamp(idx + pick([-2, -1, -1, 1, 1, 2]), 0, PENT.length - 1);
        let l = 1; while (s + l < 16 && !rh[s + l] && l < 4) l++; if (b === 3 && s === 8) l = 8;
        notes.push({ s, m: PENT[idx], l });
      }
      bars.push(notes);
    }
    const v = bars[3].map(n => ({ ...n })); v.forEach((n, k) => { if (k === v.length - 1) n.m = PENT[near([prog[3][0] % 12])]; else n.m = PENT[clamp(PENT.indexOf(n.m) + 1, 0, PENT.length - 1)]; });
    return bars.concat([bars[0], bars[1], bars[2].map(n => ({ ...n, m: PENT[clamp(PENT.indexOf(n.m) + (R() < 0.5 ? 1 : -1), 0, PENT.length - 1)] })), v]);
  }
  const MEL = [genMel(7, PA), genMel(23, PB)];
  function musStep(step, t) {
    const A = G.au; const inten = G.inten; const bar = step >> 4, s = step & 15; const sec = (bar >> 3) % 4, kind = [0, 1, 0, 2][sec], bi = bar & 7;
    const prog = kind === 0 ? PA : PB; const [r, q] = prog[bi & 3]; const tri = triad(r, q); const sd = 60 / G.bpm / 4;
    if (inten === 0) {
      if (s === 0) { I.pad(t, tri.map(m => m + 12), sd * 16 * 1.02, 0.022); I.bass(t, r - 12, sd * 7, 0.12); }
      if (s === 8) I.bass(t, r - 12, sd * 6, 0.1);
      if (s % 4 === 2) I.hat(t, 0.05);
      if (s === 0 && bi % 4 === 0) I.taiko(t, 0.45);
      const mel = MEL[kind === 0 ? 0 : 1][bi]; for (const n of mel) if (n.s === s) I.lead(t, n.m, sd * n.l * 0.95, 0.04);
      return;
    }
    const hot = inten >= 2 || kind === 2;
    if (s === 0 && bi === 0) I.crash(t, 0.16);
    const kicks = inten >= 2 ? [0, 4, 8, 12] : [0, 7, 8];
    if (kicks.includes(s)) I.kick(t);
    if (s === 4 || s === 12) I.snare(t);
    if (bi === 7 && s >= 12) I.snare(t, 0.16 + (s - 12) * 0.08);
    if (inten >= 2) I.hat(t, s % 2 ? 0.05 : 0.09); else if (s % 2 === 0) I.hat(t, s % 4 === 2 ? 0.09 : 0.06, s % 8 === 6);
    if (s === 0 && bi % 2 === 0) I.taiko(t, 0.8);
    if (bi === 7 && (s === 8 || s === 11 || s === 14)) I.taiko(t, 0.7);
    if (hot && (s === 6 || s === 14)) I.ka(t, 0.16);
    if (s % 2 === 0) I.bass(t, r - 12 + ((s >> 1) % 2 ? 12 : 0), sd * 1.7, 0.15);
    if (s % 4 === 2) I.stab(t, tri.map(m => m + 12), sd * 1.4);
    const mel = MEL[kind === 0 ? 0 : 1][bi]; for (const n of mel) if (n.s === s) I.lead(t, n.m + (kind === 2 ? 12 : 0), sd * n.l * 0.92, kind === 2 ? 0.06 : 0.075);
    if (hot) I.arp(t, tri[s % 3] + 24 + (s % 6 >= 3 ? 12 : 0));
  }
  function musTick() {
    if (!G || !G.au || G.paused) return; const A = G.au;
    if (A.hold) return;
    const now = A.ctx.currentTime; if (A.next < now - 0.2) A.next = now + 0.04;
    while (A.next < now + 0.14) { try { musStep(A.step, A.next); } catch (e) { if (!A.err) { A.err = 1; console.warn('boat music', e); } } A.next += 60 / G.bpm / 4; A.step++; }
  }
  function musGo(fromStart) { const A = G && G.au; if (!A) return; A.hold = false; if (fromStart) A.step = 0; A.next = A.ctx.currentTime + 0.05; }
  /* sfx */
  const SFX = {
    ok(c) { const A = G.au; if (!A) return; const t = A.ctx.currentTime + 0.01; const b = Math.min(c, 9); const P = [72, 74, 76, 79, 81, 84, 86, 88, 91, 93, 96, 98];
      [0, 1, 2].forEach(k => { tone(A.sfx, 'square', mf(P[b + k]), t + k * 0.055, 0.16, 0.06, { lp: 5000 }); tone(A.sfx, 'sine', mf(P[b + k] + 12), t + k * 0.055, 0.22, 0.08); }); },
    bad() { const A = G.au; if (!A) return; const t = A.ctx.currentTime + 0.01; tone(A.sfx, 'sine', 170, t, 0.3, 0.4, { to: 70 }); tone(A.sfx, 'triangle', 220, t + 0.06, 0.22, 0.12, { to: 160 }); },
    splash() { const A = G.au; if (!A) return; const t = A.ctx.currentTime + 0.01; noise(A.sfx, t, 0.5, 0.32, 'bandpass', 1400, 0.9, { to: 300 }); noise(A.sfx, t + 0.05, 0.25, 0.15, 'highpass', 5000); },
    whoosh(big) { const A = G.au; if (!A) return; const t = A.ctx.currentTime + 0.01; noise(A.sfx, t, big ? 0.7 : 0.38, big ? 0.32 : 0.18, 'bandpass', 500, 1.2, { to: big ? 4200 : 2800, a: 0.08 }); },
    nitro() { const A = G.au; if (!A) return; const t = A.ctx.currentTime + 0.01; SFX.whoosh(true); [60, 64, 67, 72].forEach((m, k) => tone(A.sfx, 'sawtooth', mf(m + 12), t + k * 0.04, 0.5, 0.05, { lp: 3000, to: mf(m + 24), tt: 0.4 })); I.taiko(t, 0.9); },
    count(n) { const A = G.au; if (!A) return; const t = A.ctx.currentTime + 0.01; I.taiko(t, 1); if (n > 0) tone(A.sfx, 'square', 523, t, 0.22, 0.07, { lp: 3000 }); else { [72, 76, 79, 84].forEach(m => tone(A.sfx, 'square', mf(m), t, 0.55, 0.05, { lp: 4000 })); I.crash(t, 0.22); } },
    pass() { const A = G.au; if (!A) return; const t = A.ctx.currentTime + 0.01; tone(A.sfx, 'square', mf(84), t, 0.08, 0.05); tone(A.sfx, 'square', mf(91), t + 0.07, 0.14, 0.05); },
    win() { const A = G.au; if (!A) return; const t = A.ctx.currentTime + 0.05; const seq = [[72, 0, 0.14], [72, 0.15, 0.14], [72, 0.3, 0.14], [76, 0.45, 0.4], [74, 0.9, 0.14], [77, 1.05, 0.14], [76, 1.2, 0.14], [79, 1.35, 0.9]];
      seq.forEach(([m, d, l]) => { tone(A.sfx, 'sawtooth', mf(m), t + d, l + 0.1, 0.06, { lp: 2600 }); tone(A.sfx, 'square', mf(m + 12), t + d, l, 0.03, { lp: 4000 }); });
      [[48, 0], [53, 0.45], [55, 0.9], [60, 1.35]].forEach(([m, d]) => { tone(A.sfx, 'triangle', mf(m), t + d, 0.5, 0.2); I.taiko(t + d, 0.7); }); I.crash(t + 1.35, 0.25); },
    lose() { const A = G.au; if (!A) return; const t = A.ctx.currentTime + 0.05; [[76, 0], [74, 0.18], [72, 0.36], [69, 0.54], [71, 0.8]].forEach(([m, d], k) => tone(A.sfx, 'triangle', mf(m), t + d, k === 4 ? 0.8 : 0.22, 0.14)); tone(A.sfx, 'sine', mf(45), t, 1.2, 0.12); }
  };

  /* ---------- DOM ---------- */
  const $q = s => G && G.root.querySelector(s);
  function hudHTML() {
    return `<div class="bo-top">
      <button class="bo-gb bo-x" data-bo="close" aria-label="${t('Keluar')}">${IC.x}</button>
      <div class="bo-mid">
        <div class="bo-track"><div class="bo-fill"></div><span class="bo-fin">${IC.flag}</span></div>
        <div class="bo-stat"><span class="bo-pos"><b>3</b><i>rd</i></span><span class="bo-dist">0 m</span><span class="grow"></span><span class="bo-combo"></span><span class="bo-score">0</span></div>
      </div>
      <button class="bo-gb bo-pz" data-bo="pause" aria-label="${t('Jeda')}">${IC.pause}</button>
      <span class="bo-gb bo-net" aria-hidden="true">${IC.wifi}</span>
      <button class="bo-gb bo-mu" data-bo="music" aria-label="${t('Musik')}">${IC.music}</button>
    </div>
    <div class="bo-q" aria-live="polite"><div class="bo-qin"></div><div class="bo-tbar"><i></i></div></div>
    <div class="bo-sp"></div>
    <div class="bo-opts">${[0, 1, 2, 3].map(k => `<button class="bo-opt" data-bo="ans" data-v="${k}"><kbd>${k + 1}</kbd><span></span></button>`).join('')}</div>
    <div class="bo-wait" aria-live="polite"></div>
    <div class="bo-ov"></div>`;
  }
  function open(pool, ctx) {
    if (G) close(true);
    const a = arS(); a.bo = a.bo || { m: 'mix', d: 1, mu: 1 };
    const root = document.createElement('div'); root.id = 'arboat'; root.dataset.ph = 'setup';
    root.innerHTML = `<canvas class="bo-cv"></canvas><div class="bo-lb" aria-hidden="true"></div><div class="bo-note" aria-live="polite"></div><div class="bo-ui">${hudHTML()}</div><div class="bo-cut" aria-hidden="true"></div><div class="bo-banner" aria-hidden="true"></div>`;
    document.body.appendChild(root); document.body.classList.add('bo-open');
    G = {
      pool, root, cv: root.querySelector('canvas'), mode: a.bo.m || 'mix', diff: clamp(+a.bo.d || 1, 0, 2), musicOn: a.bo.mu !== 0,
      phase: 'setup', t: 0, last: 0, raf: 0, evts: [], parts: [], floats: [], speed: [], paused: false, alive: true, shake: 0, flash: 0,
      inten: 0, bpm: 118, focus: 0, sel: -1, cam: 0
    };
    G.cx = G.cv.getContext('2d');
    try { G.hzf = getComputedStyle(document.body).getPropertyValue('--hz').trim() || 'sans-serif'; } catch (e) { G.hzf = 'sans-serif'; }
    if (ctx) onInit(ctx);
    G.au = auInit();
    if (G.au) G.au.timer = setInterval(musTick, 40);
    G.onKey = onKey; G.onVis = onVis; G.onRes = () => resize();
    document.addEventListener('keydown', G.onKey, true); document.addEventListener('visibilitychange', G.onVis); window.addEventListener('resize', G.onRes);
    root.addEventListener('click', onClick);
    buildImgs(); resetRace(); resize(); setMusicBtn();
    if (G.au) { G.inten = 0; G.bpm = 118; musGo(true); }
    if (G.on) startRace(); else showSetup();
    G.raf = requestAnimationFrame(loop);
  }
  function close(silent) {
    if (!G) return; const g = G; g.alive = false;
    if (!silent && g.on) { try { g.on.ctx.leave(); } catch (e) {} }
    clearTimeout(g.noteT);
    cancelAnimationFrame(g.raf);
    document.removeEventListener('keydown', g.onKey, true); document.removeEventListener('visibilitychange', g.onVis); window.removeEventListener('resize', g.onRes);
    if (g.au) { clearInterval(g.au.timer); const A = g.au; try { A.mus.gain.setTargetAtTime(0.0001, A.ctx.currentTime, 0.03); A.sfx.gain.setTargetAtTime(0.0001, A.ctx.currentTime, 0.05); } catch (e) {} setTimeout(() => { try { A.bus.disconnect(); A.comp.disconnect(); } catch (e) {} }, 400); }
    try { TTS.stop(); } catch (e) {}
    g.root.remove(); document.body.classList.remove('bo-open'); G = null;
    if (!silent) { if (location.hash !== '#arena') go('arena'); else render(); }
  }
  function buildMarkers() {
    const tr = $q('.bo-track'); if (!tr) return; tr.querySelectorAll('.bo-mk').forEach(e => e.remove()); const fin = tr.querySelector('.bo-fin');
    G.boats.forEach((b, k) => { const e = document.createElement('span'); e.className = 'bo-mk bo-mk' + k + (b.me ? ' me' : ''); e.style.setProperty('--c', b.col); tr.insertBefore(e, fin); });
    G.mk = null;
  }
  function later(sec, fn) { G.evts.push({ at: G.t + sec, fn }); }
  function setMusicBtn() { const b = $q('.bo-mu'); if (b) { b.innerHTML = G.musicOn ? IC.music : IC.mute; b.classList.toggle('off', !G.musicOn); } }

  /* ---------- gambar: sprite ---------- */
  function svgImg(svg) { const im = new Image(); im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ')); return im; }
  function buildImgs() {
    G.img = {}; ['happy', 'joy', 'oops', 'wow'].forEach(e => { try { G.img[e] = svgImg(mascot(e, 160)); } catch (er) {} });
  }
  function resize() {
    if (!G) return; const W = window.innerWidth, H = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, W * H > 900000 ? 1.5 : 2);
    G.W = W; G.H = H; G.dpr = dpr; G.cv.width = Math.round(W * dpr); G.cv.height = Math.round(H * dpr);
    G.cv.style.width = W + 'px'; G.cv.style.height = H + 'px';
    const q = $q('.bo-q'), o = $q('.bo-opts');
    const qb = q ? q.getBoundingClientRect().bottom : H * 0.3; const ot = o ? o.getBoundingClientRect().top : H * 0.8;
    G.y0 = clamp(qb, H * 0.18, H * 0.5); G.y1 = clamp(ot, G.y0 + 160, H);
    const band = G.y1 - G.y0;
    G.hz = G.y0 + band * (W > H ? 0.14 : 0.24);
    const wat = G.y1 - G.hz;
    const LC = LANES[clamp((G.boats || BOATS).length, 2, 4)];
    G.lanes = LC[0].map(f => G.hz + wat * f);
    G.ls = LC[1].slice();
    G.L = clamp(Math.min(W * 0.3, wat * (W > H ? 0.52 : 0.75)), 104, 240) * (G.lanes.length > 3 ? 0.88 : 1);
    const lb = $q('.bo-lb'); if (lb) lb.style.top = Math.round(G.y0 + 12) + 'px'; const nt = $q('.bo-note'); if (nt) nt.style.top = Math.round(G.y0 + 12) + 'px';
    G.ppuB = G.L / 7; G.ppu = G.ppu ? clamp(G.ppu, G.ppuB * 0.5, G.ppuB) : G.ppuB; G.px0 = W * 0.36;
    buildScenery();
  }
  function buildScenery() {
    const W = G.W, dpr = G.dpr; const R = mulberry(11);
    G.clouds = [];
    for (let k = 0; k < 7; k++) {
      const s = 0.6 + R() * 0.8; const cw = Math.round(170 * s), ch = Math.round(80 * s);
      const c = document.createElement('canvas'); c.width = Math.round(cw * dpr); c.height = Math.round(ch * dpr); const x = c.getContext('2d'); x.scale(dpr, dpr);
      const blobs = []; const n = 5 + (R() * 3 | 0);
      for (let j = 0; j < n; j++) { const bx = cw * (0.18 + 0.64 * j / (n - 1)); const r = ch * (0.22 + R() * 0.2) * (1 - Math.abs(j / (n - 1) - 0.5) * 0.7); blobs.push([bx, ch * 0.72 - r * 0.8, r]); }
      blobs.push([cw * 0.5, ch * 0.74, ch * 0.2]);
      x.lineWidth = 3; x.strokeStyle = 'rgba(120,150,215,.55)'; blobs.forEach(([bx, by, r]) => { x.beginPath(); x.arc(bx, by, r, 0, 7); x.stroke(); });
      x.fillStyle = '#fff'; blobs.forEach(([bx, by, r]) => { x.beginPath(); x.arc(bx, by, r, 0, 7); x.fill(); });
      x.globalCompositeOperation = 'source-atop'; const gr = x.createLinearGradient(0, ch * 0.35, 0, ch); gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(1, 'rgba(196,208,255,.9)'); x.fillStyle = gr; x.fillRect(0, 0, cw, ch);
      x.fillStyle = 'rgba(255,214,236,.5)'; x.fillRect(0, ch * 0.78, cw, ch);
      G.clouds.push({ c, w: cw, h: ch, u: R() * 1.6, v: 0.04 + R() * 0.3, p: 0.02 + R() * 0.05 });
    }
    G.sparks = []; for (let k = 0; k < 46; k++) G.sparks.push({ u: R(), d: 0.15 + R() * 0.85, ph: R() * 7, s: 1.5 + R() * 3 });
    G.speed = []; for (let k = 0; k < 22; k++) G.speed.push({ y: R(), x: R() * W, l: 60 + R() * 160, v: 1 + R() * 1.4 });
    G.mtn = [0, 1, 2].map(k => { const ph = [R() * 6, R() * 6, R() * 6, R() * 6]; return x => Math.sin(x * 2 + ph[0]) * 0.45 + Math.sin(x * 5 + ph[1]) * 0.25 + Math.sin(x * 11 + ph[2]) * 0.12 + Math.sin(x * 23 + ph[3]) * 0.05 + k * 0; });
    const bl = []; let bx = 0; const R2 = mulberry(5); while (bx < 1400) { const w = 18 + R2() * 34; bl.push([bx, w, 18 + R2() * 46]); bx += w + 2 + R2() * 8; } G.bld = bl;
  }

  /* ---------- balapan ---------- */
  function resetRace() {
    const D = DIFF[G.diff];
    G.D = D.D; G.T = D.T; G.t = 0; G.rt = 0; G.evts = []; G.parts = []; G.floats = [];
    G.boats = (G.on ? G.on.boats0 : BOATS).map((b, k) => ({ ...b, idx: k, x: 0, v: 0, boost: 0, nitro: 0, slow: 0, fin: 0, ph: k * 1.7, row: k, face: 'happy', faceT: 0, surge: 0, surgeT: 4 + k * 3, spray: 0, tx: 0, tv: 0, tt: 0 }));
    G.me = G.boats.find(b => b.me) || G.boats[G.boats.length - 1]; G.cam = 0; G.scroll = 0; if (G.ppuB) G.ppu = G.ppuB;
    buildMarkers();
    G.q = null; G.qn = 0; G.nextQ = 0; G.combo = 0; G.maxCombo = 0; G.score = 0; G.nOk = 0; G.nAns = 0; G.missed = new Map();
    G.deck = []; G.tdeck = []; G.recent = []; G.retry = []; G.final = false; G.cruise = false; G.place = G.boats.length; G.finishAt = 0; G.ended = false; G.inten = G.phase === 'setup' ? 0 : 1;
    { const e = $q('.bo-pos'); if (e) { e.innerHTML = `<b>${G.place}</b><i>${PLACE[G.place - 1].slice(1)}</i>`; e.dataset.p = G.place; } }
  }
  function startRace() {
    if (!G.on) { const a = arS(); a.bo = { m: G.mode, d: G.diff, mu: G.musicOn ? 1 : 0 }; save(); }
    resetRace(); G.phase = 'count'; G.root.dataset.ph = 'count'; ov('');
    $q('.bo-qin').innerHTML = ''; optsReset(true);
    requestAnimationFrame(() => resize());
    if (G.au) G.au.hold = true;
    const cd = n => () => { banner(n > 0 ? String(n) : 'GO!', n > 0 ? 'cd' : 'go', n > 0 ? ['', '一', '二', '三'][n] : '出發'); SFX.count(n); if (n === 0) { G.phase = 'race'; G.root.dataset.ph = 'race'; G.inten = 1; G.bpm = 142; musGo(true); G.nextQ = 0.5; G.shake = 6; } };
    later(0.25, cd(3)); later(1.05, cd(2)); later(1.85, cd(1)); later(2.65, cd(0));
  }
  function update(dt) {
    G.t += dt;
    for (let k = 0; k < G.evts.length; k++) { const e = G.evts[k]; if (e.at <= G.t) { G.evts.splice(k--, 1); try { e.fn(); } catch (er) { console.error(er); } if (!G || !G.alive) return; } }
    const racing = G.phase === 'race' || G.phase === 'end';
    if (racing) G.rt += dt;
    if (G.phase === 'race') {
      if (G.q && !G.q.done) { G.q.el += dt; const f = 1 - G.q.el / G.T; const b = G.tbar || (G.tbar = $q('.bo-tbar i')); if (b) { b.style.transform = `scaleX(${Math.max(0, f)})`; b.classList.toggle('low', f < 0.3); } if (G.q.el >= G.T) answer(-1); }
      else if (!G.q && !G.me.fin && !G.cruise) { G.nextQ -= dt; if (G.nextQ <= 0) newQ(); }
      if (!G.on && !G.cruise && !G.me.fin && G.boats.every(b => b.me || b.fin)) { G.cruise = true; later(G.q && !G.q.done ? 0 : 0.2, () => { if (G.q && !G.q.done) { G.q.done = true; G.q = null; } optsReset(true); $q('.bo-qin').innerHTML = ''; G.root.dataset.ph = 'fin'; }); }
    }
    const me = G.me; const lead = Math.max(...G.boats.map(b => b.x));
    if (racing && !G.final && lead > G.D * 0.8 && !me.fin) { G.final = true; G.inten = 2; G.bpm = 158; banner(t('Putaran terakhir!'), 'final', '最後衝刺'); }
    for (const b of G.boats) {
      b.faceT -= dt; if (b.faceT <= 0) b.face = 'happy';
      b.nitro = Math.max(0, b.nitro - dt); b.slow = Math.max(0, b.slow - dt); b.boost *= Math.exp(-dt / 2.2); b.surge = Math.max(0, b.surge - dt);
      let tv = 0;
      const net = G.on && !b.me && (b.human || !G.on.auth);
      if (net) netBoat(b, dt);
      else if (racing) {
        if (b.me) { tv = 7 + b.boost + (b.nitro > 0 ? 9 : 0); if (b.slow > 0) tv *= 0.42; if (G.cruise && !b.fin) tv = Math.max(tv, 24); if (b.fin) tv = Math.max(3, tv * 0.4); }
        else {
          const gap = (G.on ? G.on.refX : me.x) - b.x; const rb = G.final ? 0.12 : 0.3; const f = clamp(gap / 40, -1, 1);
          b.surgeT -= dt; if (b.surgeT <= 0 && !b.fin) { b.surge = 1.5; b.surgeT = rnd(5, 10); }
          tv = DIFF[G.diff].pace * b.k * (1 + 0.06 * Math.sin(G.t * 0.7 + b.ph)) * (1 + f * rb) * (b.surge > 0 ? 1.3 : 1);
          if (G.phase === 'end' && !b.fin && !G.on) tv *= 1.25; if (b.fin) tv = Math.max(3, tv * 0.4);
        }
      }
      if (!net) { const acc = b.slow > 0 ? 6 : 2.2; b.v += (tv - b.v) * Math.min(1, dt * acc); b.x += b.v * dt; }
      b.row += dt * (2.2 + b.v * 0.35);
      if (racing && !net && !b.fin && b.x >= G.D) { b.fin = G.rt || 0.01; onFinish(b); }
      if (racing && b.v > 1) emitWake(b, dt);
    }
    { const xs = G.boats.map(b => b.x); const mn = Math.min(...xs), mx = Math.max(...xs);
      const tp = clamp(G.W * 0.6 / Math.max(1, mx - mn), G.ppuB * 0.5, G.ppuB); G.ppu += (tp - G.ppu) * Math.min(1, dt * 1.6);
      const lim = Math.max(G.W * 0.08, G.W * 0.5 - G.L * 0.78) / G.ppu; const tc = clamp((mn + mx) / 2 + G.W * 0.14 / G.ppu, me.x - lim, me.x + lim);
      G.cam += (tc - G.cam) * Math.min(1, dt * 3); G.scroll = (G.scroll || 0) + me.v * dt * G.ppuB; }
    // posisi
    if (G.phase === 'race') {
      const pl = order().indexOf(me) + 1;
      if (pl !== G.place) { if (pl < G.place && G.rt > 1) { floatTxt('OVERTAKE!', me, '#ffd23f', 1.1); SFX.pass(); } G.place = pl; setPos(pl); }
    }
    // partikel
    for (let k = G.parts.length - 1; k >= 0; k--) { const p = G.parts[k]; p.life -= dt; if (p.life <= 0) { G.parts.splice(k, 1); continue; } p.x += p.vx * dt; p.y += p.vy * dt; if (p.g) p.vy += p.g * dt; if (p.kind === 'foam') { p.r += dt * 6; } }
    for (let k = G.floats.length - 1; k >= 0; k--) { const f = G.floats[k]; f.life -= dt; if (f.life <= 0) G.floats.splice(k, 1); }
    G.shake = Math.max(0, G.shake - dt * 30); G.flash = Math.max(0, G.flash - dt * 2.5); G.focus = Math.max(0, G.focus - dt);
    // HUD
    const W = 100 / G.D;
    if (!G.mk) G.mk = G.boats.map((b, k) => $q('.bo-mk' + k)); G.fillEl = G.fillEl || $q('.bo-fill');
    G.boats.forEach((b, k) => { if (G.mk[k]) G.mk[k].style.left = clamp(b.x * W, 0, 100) + '%'; });
    G.fillEl.style.transform = `scaleX(${clamp(me.x / G.D, 0, 1)})`;
    const dEl = G.dEl || (G.dEl = $q('.bo-dist')); const left = Math.max(0, Math.ceil(G.D - me.x)); if (dEl._v !== left) { dEl._v = left; dEl.textContent = left + ' m'; }
    // musik ducking
    if (G.on) onTick(dt);
    if (G.au) { const sp = typeof TTS !== 'undefined' && TTS.ok && speechSynthesis.speaking; const tg = !G.musicOn || G.paused ? 0.0001 : sp ? 0.09 : 0.32; if (tg !== G.au.duck) { G.au.duck = tg; try { G.au.mus.gain.setTargetAtTime(tg, G.au.ctx.currentTime, sp ? 0.05 : 0.25); } catch (e) {} } }
  }
  function onFinish(b) {
    if (G.on) return onFinishNet(b);
    if (b.me) {
      const pl = G.boats.filter(x => x.fin && !x.me).length + 1; G.place = pl; setPos(pl);
      G.score += [1500, 800, 300][pl - 1]; scoreEl();
      banner('FINISH!', 'fin', pl === 1 ? '優勝' : PLACE_ZH[pl - 1]);
      if (G.au) G.au.hold = true; if (pl === 1) SFX.win(); else SFX.lose();
      burst(b, 40, ['#ffd23f', '#ff4f8b', '#8fd3ff', '#fff']);
      G.q = null; optsReset(true); $q('.bo-qin').innerHTML = '';
      G.phase = 'end'; G.root.dataset.ph = 'fin';
      later(2.4, endScreen);
    } else if (G.phase === 'race') floatTxt('FINISH', b, b.col, 1);
  }
  function emitWake(b, dt) {
    if (G.parts.length > 230) return;
    const n = b.v * dt * (b.nitro > 0 || b.surge > 0 ? 1.4 : 0.55);
    b.spray += n;
    while (b.spray >= 1) {
      b.spray--; const s = G.ls[b.lane];
      G.parts.push({ kind: 'foam', x: b.x - 3.3 * s + rnd(-0.3, 0.3), y: G.lanes[b.lane] + rnd(-2, 4) * s, vx: -rnd(0.5, 2), vy: rnd(-3, 3), r: rnd(2, 5) * s, life: rnd(0.5, 1.1), max: 1.1, s });
      if (b.nitro > 0 || b.surge > 0 || Math.random() < 0.25) G.parts.push({ kind: 'drop', x: b.x - 3.2 * s, y: G.lanes[b.lane] - 4 * s, vx: -rnd(2, 6), vy: -rnd(40, 110) * s, g: 300, r: rnd(1.5, 3.6) * s, life: rnd(0.4, 0.8), max: 0.8, col: '#ffffff' });
    }
  }
  function burst(b, n, cols) {
    const s = G.ls[b.lane];
    for (let k = 0; k < n && G.parts.length < 300; k++) { const a = rnd(-Math.PI, 0); const sp = rnd(80, 260) * s; G.parts.push({ kind: 'star', x: b.x + rnd(-2, 3), y: G.lanes[b.lane] - 30 * s, vx: Math.cos(a) * sp / G.ppu, vy: Math.sin(a) * sp, g: 260, r: rnd(3, 7) * s, life: rnd(0.6, 1.2), max: 1.2, col: pick(cols) }); }
  }
  function splash(b, n) {
    const s = G.ls[b.lane];
    for (let k = 0; k < n && G.parts.length < 300; k++) G.parts.push({ kind: 'drop', x: b.x + rnd(1, 4.5), y: G.lanes[b.lane] - 6 * s, vx: rnd(-5, 5), vy: -rnd(90, 260) * s, g: 420, r: rnd(2.5, 6.5) * s, life: rnd(0.6, 1.1), max: 1.1, col: pick(['#ffffff', '#bdf0ff', '#7fd8ff']) });
  }
  function floatTxt(txt, b, col, sz = 1) { G.floats.push({ txt, x: b.x, lane: b.lane, col, sz, life: 1.1, max: 1.1 }); }

  /* ---------- soal & jawaban ---------- */
  function newQ() {
    let q = null; if (G.on) q = netQ(); else for (let k = 0; k < 6 && !q; k++) q = makeQ();
    if (!q) { G.nextQ = 1; return; }
    G.q = q; G.qn++; G.sel = -1; G.tbar = null;
    const ti = TYPE_INFO[q.type]; const it = q.it;
    let prompt;
    if (q.type === 'baca') prompt = `<div class="bo-phz hz">${esc(it.zh)}</div>`;
    else if (q.type === 'pinyin') prompt = `<div class="bo-phz hz">${esc(it.zh)}</div><div class="bo-pmean">${esc(it.tr)}</div>`;
    else if (q.type === 'arti') prompt = `<div class="bo-ptr">${esc(it.tr)}</div>`;
    else prompt = `<div class="bo-pls"><button class="bo-gb bo-big" data-bo="say" aria-label="${t('Dengar lagi')}">${IC.spk}</button><button class="bo-gb bo-sm" data-bo="slow" aria-label="${t('Pelan')}">${IC.slow}</button></div>`;
    $q('.bo-qin').innerHTML = `<div class="bo-qh">${lvItemBadge(it, 'bo-lvb')}<span class="bo-chip">${IC[ti.ic]}<b>${t(ti.n)}</b><i class="hz">${ti.zh}</i></span><span class="bo-how">${t(ti.how)}</span></div><div class="bo-pr">${prompt}</div>`;
    const q0 = $q('.bo-q'); q0.classList.remove('ok', 'bad', 'in'); void q0.offsetWidth; q0.classList.add('in');
    const cls = q.type === 'baca' ? 'tr' : q.type === 'pinyin' ? 'py' : 'hz';
    const os = G.root.querySelectorAll('.bo-opt');
    os.forEach((b, k) => { b.className = 'bo-opt t-' + cls; b.disabled = false; b.querySelector('span').innerHTML = esc(q.opts[k]); b.style.animationDelay = (k * 0.04) + 's'; b.style.animation = 'none'; void b.offsetWidth; b.style.animation = ''; });
    G.root.querySelector('.bo-opts').classList.add('on');
    if (q.type === 'dengar') lgSay(it.zh);
  }
  function optsReset(hide) { if (!G) return; G.root.querySelectorAll('.bo-opt').forEach(b => { b.disabled = true; b.classList.remove('sel'); }); if (hide) G.root.querySelector('.bo-opts').classList.remove('on'); }
  function answer(k) {
    const q = G.q; if (!q || q.done || G.phase !== 'race') return; q.done = true; G.nAns++;
    const me = G.me; const ok = k === q.ans; const it = q.it;
    const os = G.root.querySelectorAll('.bo-opt'); os.forEach((b, j) => { b.disabled = true; if (j === q.ans) b.classList.add('right'); else if (j === k) b.classList.add('wrong'); else b.classList.add('dim'); });
    const qe = $q('.bo-q');
    if (ok) {
      G.combo++; G.maxCombo = Math.max(G.maxCombo, G.combo); G.nOk++;
      const quick = clamp(1 - q.el / G.T, 0, 1);
      me.boost += (3.2 + 6.5 * quick) * (1 + Math.min(G.combo, 8) * 0.04);
      const pts = Math.round((100 + 100 * quick) * (1 + Math.min(G.combo, 10) * 0.1)); G.score += pts; scoreEl();
      const j = quick > 0.72 ? ['PERFECT!', '#ffd23f'] : quick > 0.4 ? ['GREAT!', '#7dffb0'] : ['GOOD', '#bfe9ff'];
      floatTxt(j[0], me, j[1], 1.15); G.floats.push({ txt: '+' + pts, x: me.x - 1.5, lane: me.lane, col: '#fff', sz: 0.7, life: 0.9, max: 0.9, dy: 30 });
      me.face = 'joy'; me.faceT = 1; SFX.ok(G.combo); SFX.whoosh(false); me.spray += 6;
      try { lgHitRec(it.i); } catch (e) {}
      comboEl();
      if (G.combo % 5 === 0) nitro();
      qe.classList.add('ok'); reveal(true, q);
      if (q.type !== 'dengar') lgSay(it.zh);
      later(0.95, () => { G.q = null; G.nextQ = 0.15; });
    } else {
      G.combo = 0; comboEl(); me.slow = 1.3; me.boost *= 0.4; me.face = 'oops'; me.faceT = 1.4; G.shake = 12; G.flash = 0.6;
      SFX.bad(); SFX.splash(); splash(me, 26);
      floatTxt(k < 0 ? 'TIME UP' : 'SPLASH!', me, '#ff6f91', 1);
      try { lgMissRec(it.i); } catch (e) {}
      G.missed.set(it.i, it); G.retry.push({ i: it.i, at: G.qn + 3 });
      qe.classList.add('bad'); reveal(false, q, k < 0);
      lgSay(it.zh);
      later(2.1, () => { G.q = null; G.nextQ = 0.1; });
    }
    optsDone();
  }
  function optsDone() { setTimeout(() => { if (G && G.q && G.q.done) G.root.querySelector('.bo-opts').classList.add('done'); }, 0); }
  function reveal(ok, q, timeout) {
    const it = q.it;
    const head = ok ? `<span class="bo-rv-h ok">${IC.bolt}${t('Benar!')}</span>` : `<span class="bo-rv-h bad">${IC.drop}${timeout ? t('Waktu habis!') : t('Kurang tepat')}</span>`;
    $q('.bo-qin').innerHTML = `<div class="bo-rv ${ok ? 'ok' : 'bad'}">${head}<div class="bo-rv-w"><b class="hz">${esc(it.zh)}</b>${lvItemBadge(it, '', 'xs')}<span class="bo-rv-py">${esc(it.py)}</span></div><div class="bo-rv-tr">${esc(it.tr)}</div>${ok ? '' : `<button class="bo-gb bo-sm bo-rv-s" data-bo="sayw" data-v="${esc(it.zh)}" aria-label="${t('Dengar lagi')}">${IC.spk}</button>`}</div>`;
  }
  function nitro() {
    const me = G.me; me.nitro = 3.6; me.face = 'wow'; me.faceT = 3.6; G.focus = 1.4; G.shake = 8;
    SFX.nitro(); burst(me, 18, ['#ffd23f', '#fff', '#ff9ad0']);
    const c = G.root.querySelector('.bo-cut');
    c.innerHTML = `<div class="bo-cut-band"><div class="bo-cut-lines"></div><div class="bo-cut-m">${mascot('wow', 150)}</div><div class="bo-cut-t"><b>NITRO!</b><span class="hz">全速前進</span><i>${G.combo} COMBO</i></div></div>`;
    c.classList.remove('on'); void c.offsetWidth; c.classList.add('on');
  }
  function scoreEl() { const e = $q('.bo-score'); if (e) { e.textContent = nfmt(G.score); e.classList.remove('pop'); void e.offsetWidth; e.classList.add('pop'); } }
  function comboEl() { const e = $q('.bo-combo'); if (!e) return; e.innerHTML = G.combo >= 2 ? `<b>${G.combo}</b>COMBO` : ''; e.classList.toggle('hot', G.combo >= 4); if (G.combo >= 2) { e.classList.remove('pop'); void e.offsetWidth; e.classList.add('pop'); } }
  function setPos(pl) { const e = $q('.bo-pos'); if (!e) return; e.innerHTML = `<b>${pl}</b><i>${PLACE[pl - 1].slice(1)}</i>`; e.dataset.p = pl; e.classList.remove('pop'); void e.offsetWidth; e.classList.add('pop'); }
  function banner(txt, cls, zh) {
    const b = G.root.querySelector('.bo-banner'); b.className = 'bo-banner ' + cls; b.innerHTML = `<div><b>${esc(txt)}</b>${zh ? `<span class="hz">${esc(zh)}</span>` : ''}</div>`;
    void b.offsetWidth; b.classList.add('on');
  }
  function ov(html) { const o = $q('.bo-ov'); o.innerHTML = html; o.classList.toggle('on', !!html); }

  /* ---------- ONLINE (2–4 pemain, ARNET) ----------
     Host membuat soal di makeGo → semua HP mendapat urutan soal yang sama. Fisika perahu lokal; posisi disiarkan ~6 Hz.
     "Otoritas" = pemain manusia dengan slot terkecil yang masih ada (awalnya host): menyimulasikan bot & mengumumkan hasil. */
  const QTYPES = ['baca', 'arti', 'dengar', 'pinyin'];
  function hexMix(a, b, k) { const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) || 0); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * k).toString(16).padStart(2, '0')).join(''); }
  const fmtT = s => { s = Math.max(0, +s || 0); const m = Math.floor(s / 60); return m + ':' + (s - m * 60).toFixed(1).padStart(4, '0'); };
  const AVS = () => (typeof DL_AV !== 'undefined' ? DL_AV : [['龍', '', '#ff3d6e', '#ffb03a']]);
  function goOnline() {
    if (typeof ARNET === 'undefined' || !G) return;
    const a = arS(); a.bo = { m: G.mode, d: G.diff, mu: G.musicOn ? 1 : 0 }; save();
    ONP = G.pool;
    ARNET.open('boat', { max: 4, min: 2, title: 'Balap Perahu Naga', c1: '#ff4f8b', c2: '#2f9bff', makeGo, onStart: netStart });
  }
  function makeGo(players) {
    if (!G) open(ONP);
    const sv = { deck: G.deck, tdeck: G.tdeck, recent: G.recent, retry: G.retry, qn: G.qn };
    G.deck = []; G.tdeck = []; G.recent = []; G.retry = []; G.qn = 0;
    const qs = [];
    for (let k = 0; k < 140 && qs.length < 48; k++) { const q = makeQ(); if (q) { qs.push({ t: q.type, i: q.it.i, o: q.opts, a: q.ans }); G.qn++; } }
    Object.assign(G, sv);
    return { m: G.mode, d: G.diff, qs, bot: (players || []).length < 3 ? 1 : 0 };
  }
  function netStart(ctx) {
    const pool = (G && G.pool) || ONP; if (!pool) return;
    ONP = pool; if (G) close(true);
    open(pool, ctx);
  }
  function onInit(ctx) {
    const go = ctx.go || {};
    G.mode = MODES.some(m => m.k === go.m) ? go.m : 'mix'; G.diff = clamp(go.d | 0, 0, 2);
    const qs = (Array.isArray(go.qs) ? go.qs : []).filter(r => r && QTYPES.includes(r.t) && Array.isArray(r.o) && r.o.length === 4).slice(0, 80);
    const ps = (ctx.players || []).slice(0, 4).sort((a, b) => a.slot - b.slot); const AV = AVS(); const used = new Set();
    const hum = ps.map(p => {
      const av = clamp(p.av | 0, 0, AV.length - 1); let ca = av; for (let k = 0; k < AV.length && used.has(ca); k++) ca = (ca + 1) % AV.length; used.add(ca);
      const c1 = AV[ca][2], c2 = AV[ca][3];
      return { id: p.id, slot: p.slot, name: String(p.name || '').slice(0, 16) || t('Pemain'), av, glyph: AV[av][0], human: true, me: p.id === ctx.me.id,
        col: c1, hi: hexMix(c1, '#ffffff', 0.55), dk: hexMix(c1, '#1a0830', 0.62), acc: c2, acc2: hexMix(c2, '#ffffff', 0.35), hair: hexMix(c1, '#1a1030', 0.45), shirt: '#ffffff', band: c1, k: 1 };
    });
    if (!hum.some(b => b.me)) hum.push({ ...BOATS[2], id: ctx.me.id, slot: 9, name: ctx.me.name || t('Kamu'), human: true, me: true, glyph: '' });
    const blue = hum.some(b => b.av === 5 || b.av === 4);   // pilih warna bot yang beda dari pemain
    const bots = go.bot ? [{ ...BOATS[blue ? 1 : 0], me: false, id: 'bot0', name: t('Bot') + (blue ? ' 小虎' : ' 阿龍'), bot: true, glyph: '機', k: 1 }] : [];
    const all = [...bots, ...hum.filter(b => !b.me), hum.find(b => b.me)].map((b, k) => ({ ...b, lane: k }));
    G.on = { ctx, qs, qi: 0, boats0: all, auth: false, sendT: 0, lbT: 0, first: 0, done: false, fb: 0, refX: 0, ids: hum.map(b => b.id), res: null };
    G.on.auth = netAuth() === ctx.me.id;
    G.root.classList.add('online');
    const on = G.on;
    ctx.on(m => { if (G && G.on === on) try { netMsg(m); } catch (e) { console.warn('boat net', e); } });
    ctx.onLeave(id => { if (G && G.on === on) netLeave(id); });
    ctx.onStatus(st => { if (G && G.on === on) netStatus(st); });
  }
  function netAuth() { const O = G.on; const left = new Set((G.boats || []).filter(b => b.left).map(b => b.id)); return O.ids.find(id => !left.has(id)); }
  function netQ() {
    const O = G.on; if (!O.qs.length) return null;
    for (let k = 0; k < O.qs.length; k++) {
      const r = O.qs[O.qi++ % O.qs.length]; const it = item(r.i); if (!it) continue;
      let type = r.t; if (type === 'dengar' && !(typeof TTS !== 'undefined' && TTS.ok)) type = 'arti';
      if (type === 'arti' && !it.tr) continue;
      return { type, it, opts: r.o.map(x => String(x).slice(0, 80)), ans: clamp(r.a | 0, 0, 3), el: 0, done: false };
    }
    return null;
  }
  function netBoat(b, dt) {
    const age = Math.min(0.6, (performance.now() - b.tt) / 1000);
    const pred = b.left || !b.tt ? b.tx : b.tx + b.tv * age;
    if (Math.abs(pred - b.x) > 60) b.x = pred; else b.x += (pred - b.x) * Math.min(1, dt * 5);
    b.v += ((b.left ? 0 : b.tv) - b.v) * Math.min(1, dt * 4);
  }
  function netApply(b, m) {
    b.tx = clamp(+m.x || 0, 0, G.D + 400); b.tv = clamp(+m.v || 0, 0, 45); b.tt = performance.now();
    if (m.n) b.nitro = Math.max(b.nitro, 0.35); if (m.s) b.slow = Math.max(b.slow, 0.3);
    const f = clamp(+m.f || 0, 0, 7200); if (f > 0 && !b.fin) { b.fin = f; netFin(b); }
  }
  function netFin(b) {
    const O = G.on; if (!O.first) O.first = performance.now();
    if (!b.me && G.phase !== 'count') { floatTxt('FINISH', b, b.col, 1); }
    O.lbK = '';
  }
  function netMsg(m) {
    const O = G.on; if (!m || O.done && m.e !== 'res') return;
    const b = G.boats.find(x => x.id === m.from && x.human && !x.me);
    if (m.e === 'st') {
      if (!b || b.left) return; netApply(b, m);
      if (!O.auth && Array.isArray(m.b)) { const bots = G.boats.filter(x => x.bot); m.b.slice(0, bots.length).forEach((a, k) => { if (Array.isArray(a)) netApply(bots[k], { x: a[0], v: a[1], f: a[2], n: a[3] }); }); }
    } else if (m.e === 'fin') { if (b && !b.left) netApply(b, { x: m.x, v: b.tv, f: m.t }); }
    else if (m.e === 'res') {
      if (O.done || !Array.isArray(m.r)) return;
      const ids = new Set(G.boats.map(x => x.id));
      const r = m.r.filter(e => e && ids.has(e.id)).slice(0, 5).map(e => ({ id: e.id, f: clamp(+e.f || 0, 0, 7200), x: clamp(Math.round(+e.x || 0), 0, 99999), l: e.l ? 1 : 0 }));
      G.boats.forEach(x => { if (!r.some(e => e.id === x.id)) r.push({ id: x.id, f: x.fin, x: Math.round(x.x), l: x.left ? 1 : 0 }); });
      netFinalize(r);
    }
  }
  function netLeave(id) {
    const O = G.on; if (id === 'host') id = O.ids[0];
    const b = G.boats.find(x => x.id === id && x.human && !x.me); if (!b || b.left) return;
    b.left = true; b.tv = 0; b.tx = b.x; O.lbK = '';
    note(t('{n} keluar', { n: b.name }));
    O.auth = netAuth() === O.ctx.me.id;
  }
  function netStatus(st) {
    const n = $q('.bo-net'); if (!n) return; const down = st === 'down';
    if (down === !!G.on.down) return; G.on.down = down;
    n.classList.toggle('down', down); n.innerHTML = down ? IC.wifioff : IC.wifi;
    note(down ? t('Koneksi terputus…') : t('Terhubung lagi'), down ? 'bad' : 'ok');
    if (!down) G.on.sendT = 0;
  }
  function note(txt, cls = '') {
    const e = $q('.bo-note'); if (!e) return; e.className = 'bo-note ' + cls; e.textContent = txt; void e.offsetWidth; e.classList.add('on');
    clearTimeout(G.noteT); const g = G; G.noteT = setTimeout(() => { if (G === g) e.classList.remove('on'); }, 2800);
  }
  function order() { return G.boats.slice().sort((a, b) => (!!a.left - !!b.left) || (a.fin && b.fin ? a.fin - b.fin : a.fin ? -1 : b.fin ? 1 : b.x - a.x)); }
  function crestH(b, cls = '') { return `<span class="bo-cr ${cls}" style="--c1:${b.col};--c2:${b.acc}"><span class="hz">${esc(b.glyph || '')}</span></span>`; }
  function onFinishNet(b) {
    const O = G.on; if (O.done) return; netFin(b);
    if (!b.me) return;   // bot (otoritas): status finis ikut terkirim di siaran berikutnya
    const pl = G.boats.filter(x => x !== b && x.fin && x.fin <= b.fin && !x.left).length + 1; G.place = pl; setPos(pl);
    G.score += [1500, 800, 300, 150][pl - 1] || 100; scoreEl();
    banner('FINISH!', 'fin', pl === 1 ? '優勝' : PLACE_ZH[pl - 1]);
    if (G.au) G.au.hold = true; if (pl === 1) SFX.win(); else SFX.lose();
    burst(b, 40, ['#ffd23f', '#ff4f8b', '#8fd3ff', '#fff']);
    G.q = null; optsReset(true); $q('.bo-qin').innerHTML = '';
    G.phase = 'end'; G.root.dataset.ph = 'fin';
    try { O.ctx.send({ e: 'fin', t: +b.fin.toFixed(2), x: Math.round(b.x) }); } catch (e) {}
    O.sendT = 0;
    later(2.3, () => { if (G && G.on === O && !O.done) G.root.classList.add('bo-waiting'); });
  }
  function onTick(dt) {
    const O = G.on; const now = performance.now(); const racing = G.phase === 'race' || G.phase === 'end';
    const hum = G.boats.filter(b => b.human && !b.left);
    if (O.auth) { const xs = hum.map(b => b.x); O.refX = xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : G.me.x; }
    if (racing && !O.done && now - O.sendT > 160) {
      O.sendT = now; const me = G.me;
      const m = { e: 'st', x: +me.x.toFixed(1), v: +me.v.toFixed(1), n: me.nitro > 0 ? 1 : 0, s: me.slow > 0 ? 1 : 0, f: me.fin ? +me.fin.toFixed(2) : 0 };
      if (O.auth) { const bots = G.boats.filter(b => b.bot); if (bots.length) m.b = bots.map(b => [+b.x.toFixed(1), +b.v.toFixed(1), b.fin ? +b.fin.toFixed(2) : 0, b.surge > 0 ? 1 : 0]); }
      try { O.ctx.send(m); } catch (e) {}
    }
    O.lbT -= dt; if (O.lbT <= 0) { O.lbT = 0.25; netHUD(now); }
    if (O.done || !racing) return;
    const allDone = hum.length > 0 && hum.every(b => b.fin);
    const grace = O.first && now - O.first > GRACE;
    const alone = hum.length <= 1 && !G.boats.some(b => b.bot) && G.boats.some(b => b.left);
    if (O.auth) { if (allDone || grace || alone) { const r = netList(); try { O.ctx.send({ e: 'res', r }); } catch (e) {} netFinalize(r); } }
    else if (allDone || grace) { if (!O.fb) O.fb = now + (grace ? 3000 : 2500); else if (now > O.fb) netFinalize(netList()); }
  }
  function netList() { return order().map(b => ({ id: b.id, f: b.fin ? +b.fin.toFixed(2) : 0, x: Math.round(b.x), l: b.left ? 1 : 0 })); }
  function netHUD(now) {
    const O = G.on; const lb = $q('.bo-lb'); const ord = order();
    const gl = O.first && !O.done ? Math.max(0, Math.ceil((GRACE - (now - O.first)) / 1000)) : -1;
    const key = ord.map(b => b.id + (b.fin ? 'f' : '') + (b.left ? 'l' : '')).join() + '|' + (G.me.fin ? -1 : gl);
    if (lb && key !== O.lbK) {
      O.lbK = key;
      lb.innerHTML = (gl >= 0 && !G.me.fin ? `<div class="bo-lbg">${IC.fast}${t('Finis ditutup {n} dtk', { n: gl })}</div>` : '') + ord.map((b, k) => `<div class="bo-lbr${b.me ? ' me' : ''}${b.left ? ' left' : ''}${b.fin ? ' fin' : ''}" style="--c:${b.col}"><b>${k + 1}</b>${crestH(b)}<span>${esc(b.me ? t('Kamu') : b.name)}</span>${b.fin ? `<i>${fmtT(b.fin)}</i>` : b.left ? `<i>${t('Keluar')}</i>` : ''}</div>`).join('');
    }
    const w = $q('.bo-wait');
    if (w && G.root.classList.contains('bo-waiting')) {
      const pl = ord.indexOf(G.me) + 1; const total = GRACE / 1000; const f = gl >= 0 ? gl / total : 1;
      const k2 = pl + '|' + gl; if (w._k !== k2) { w._k = k2;
        w.innerHTML = `<div class="bo-wt"><span class="bo-wp p${pl}"><b>${pl}</b><i>${PLACE[pl - 1].slice(1)}</i></span><div><b>FINISH · ${fmtT(G.me.fin)}</b><span>${t('Menunggu pemain lain…')}${gl >= 0 ? ` <em>${gl}s</em>` : ''}</span></div></div><div class="bo-wbar"><i style="transform:scaleX(${f.toFixed(3)})"></i></div>`; }
    }
  }
  function netFinalize(r) {
    const O = G.on; if (O.done) return; O.done = true; O.res = r;
    G.root.classList.remove('bo-waiting');
    r.forEach(e => { const b = G.boats.find(x => x.id === e.id); if (b && e.f && !b.fin) b.fin = e.f; });
    let delay = 0.5;
    if (!G.me.fin) { G.q = null; optsReset(true); $q('.bo-qin').innerHTML = ''; G.phase = 'end'; G.root.dataset.ph = 'fin'; if (G.au) G.au.hold = true; banner('FINISH', 'fin', '比賽結束'); delay = 1.8; }
    else if (G.rt - G.me.fin < 2.3) delay = 2.4 - (G.rt - G.me.fin);
    later(delay, () => netEnd(r));
  }
  function netAgain() {
    if (!G || !G.on) return; const ctx = G.on.ctx; const pool = G.pool;
    close(true); open(pool); try { ctx.rematch(); } catch (e) {}
  }
  function netEnd(r) {
    if (!G || !G.on) return; G.ended = true; G.root.dataset.ph = 'end'; G.root.classList.remove('bo-waiting');
    const rows = r.map(e => ({ ...e, b: G.boats.find(x => x.id === e.id) })).filter(e => e.b);
    const pl = Math.max(1, rows.findIndex(e => e.b.me) + 1); G.place = pl;
    const acc = G.nAns ? G.nOk / G.nAns : 0;
    let pb = false; try { pb = arenaRecord('boat', G.score, acc); } catch (e) {}
    const xp = Math.max(2, Math.round(G.nOk * 2 + ([15, 8, 4, 2][pl - 1] || 2) + (rows.length - pl) * 2)); try { addXP(xp); } catch (e) {}
    const lab = e => e.l ? t('Keluar') : e.f ? fmtT(e.f) : `${e.x} m`;
    const nm = b => b.me ? t('Kamu') : b.name;
    const pc = (e, k) => e ? `<div class="bo-pc p${k + 1}${e.b.me ? ' me' : ''}${e.l ? ' left' : ''}" style="--c:${e.b.col}">
        ${k === 0 ? `<span class="bo-crown">${IC.crown}</span>` : ''}${crestH(e.b, 'big')}<b class="bo-pn">${esc(nm(e.b))}</b><span class="bo-pt">${lab(e)}</span>
        <div class="bo-ped"><span class="bo-medal m${k + 1}"><b>${k + 1}</b></span><i>${PLACE[k]}</i></div></div>` : '<div class="bo-pc empty"></div>';
    const expr = pl === 1 ? 'joy' : pl === 2 ? 'happy' : 'oops';
    const miss = [...G.missed.values()];
    ov(`<div class="bo-panel bo-end bo-oend">
      <div class="bo-ohead"><div class="bo-oh-m">${mascot(expr, 84)}</div><div><small>${t('Hasil balapan')} · 競舟</small><div class="bo-place p${pl}"><b>${pl}<sup>${PLACE[pl - 1].slice(1)}</sup></b><span class="hz">${PLACE_ZH[pl - 1]}</span></div></div></div>
      <div class="bo-pod"><div class="bo-burst"></div>${pc(rows[1], 1)}${pc(rows[0], 0)}${pc(rows[2], 2)}</div>
      ${rows.slice(3).map((e, k) => `<div class="bo-orow${e.b.me ? ' me' : ''}"><span class="bo-medal m4"><b>${k + 4}</b></span>${crestH(e.b)}<b>${esc(nm(e.b))}</b><span>${lab(e)}</span></div>`).join('')}
      ${pb ? `<div class="bo-pb">${IC.trophy}${t('Rekor baru!')}</div>` : ''}
      <div class="bo-stats"><div><b>${nfmt(G.score)}</b><span>${t('Skor')}</span></div><div><b>${Math.round(acc * 100)}%</b><span>${t('Akurasi')}</span></div><div><b>${G.maxCombo}</b><span>${t('Kombo maks')}</span></div><div><b>${G.me.fin ? fmtT(G.me.fin) : '—'}</b><span>${t('Waktu')}</span></div></div>
      <div class="bo-xp">+${xp} XP</div>
      ${miss.length ? `<div class="bo-lab">${t('Kata yang perlu diulang')}</div><div class="bo-miss">${miss.map(it => `<div class="bo-mi"><b class="hz">${esc(it.zh)}${lvItemBadge(it, '', 'xs')}</b><span class="bo-mi-py">${esc(it.py)}</span><span class="bo-mi-tr">${esc(it.tr)}</span><button class="bo-gb bo-sm" data-bo="sayw" data-v="${esc(it.zh)}" aria-label="${t('Dengar lagi')}">${IC.spk}</button></div>`).join('')}</div>` : ''}
      <div class="bo-ends"><button class="bo-go" data-bo="oagain">${IC.replay}<span>${t('Main lagi')}</span></button><button class="bo-btn2" data-bo="close">${IC.back}<span>${t('Keluar')}</span></button></div>
    </div>`);
    if (pl === 1 && !G.me.fin) SFX.win();
    if (G.au) { G.inten = 0; G.bpm = 112; later(2.2, () => { if (G && G.ended) musGo(true); }); }
  }

  /* ---------- layar: setup / jeda / akhir ---------- */
  function showSetup() {
    G.phase = 'setup'; G.root.dataset.ph = 'setup';
    const best = (arS().best || {}).boat || 0;
    ov(`<div class="bo-panel bo-setup" role="dialog" aria-label="${t('Balap Perahu Naga')}">
      <div class="bo-logo"><div class="bo-logo-m">${mascot('wave', 92)}</div><div><div class="bo-logo-zh hz">競舟</div><div class="bo-logo-t">${t('Balap Perahu Naga')}</div><div class="bo-logo-s hz">端午節 · Dragon Boat Race</div></div></div>
      <p class="bo-lead">${t('Jawab cepat, perahumu ngebut! Kalahkan 2 perahu rival sampai garis finis.')}</p>
      <div class="bo-lab">${t('Mode')}</div>
      <div class="bo-modes">${MODES.map(m => `<button class="bo-mode ${G.mode === m.k ? 'on' : ''}" data-bo="mode" data-v="${m.k}">${IC[m.ic]}<b>${t(m.n)}</b><i class="hz">${m.zh}</i><small>${t(m.d)}</small></button>`).join('')}</div>
      <div class="bo-lab">${t('Tingkat')}</div>
      <div class="bo-seg">${DIFF.map((d, k) => `<button class="${G.diff === k ? 'on' : ''}" data-bo="diff" data-v="${k}"><b>${t(d.n)}</b><i class="hz">${d.zh}</i><small>${d.D} m</small></button>`).join('')}</div>
      <ul class="bo-tips"><li>${IC.fast}${t('Jawab cepat = dorongan lebih besar')}</li><li>${IC.bolt}${t('5 benar beruntun = NITRO')}</li><li>${IC.drop}${t('Salah = perahu kecipratan & melambat')}</li></ul>
      <div class="bo-starts"><button class="bo-go" data-bo="go">${IC.play}<span>${t('Mulai balapan')}</span></button>${typeof ARNET !== 'undefined' ? `<button class="bo-onl" data-bo="online">${IC.users}<span><b>${t('Main online')}</b><small>${t('Balap 2–4 pemain, tiap HP sendiri')}</small></span></button>` : ''}</div>
      <div class="bo-meta">${best ? `${IC.trophy}<span>${t('Rekor')} <b>${nfmt(best)}</b></span> · ` : ''}<span>${esc(G.pool.name || '')} · ${G.pool.ids.length} ${t('kata')}</span></div>
    </div>`);
  }
  function pause(on) {
    if (!G || G.phase === 'setup' || G.ended || G.on) return;
    if (on === G.paused) return; G.paused = on;
    if (on) { try { TTS.stop(); } catch (e) {} ov(`<div class="bo-panel bo-pause"><div class="bo-pz-m">${mascot('sleepy', 96)}</div><h2>${t('Jeda')}<span class="hz">暫停</span></h2><button class="bo-go" data-bo="resume">${IC.play}<span>${t('Lanjut')}</span></button><button class="bo-btn2" data-bo="close">${IC.back}<span>${t('Keluar')}</span></button></div>`); }
    else { ov(''); G.last = 0; if (G.au && !G.au.hold) G.au.next = G.au.ctx.currentTime + 0.05; }
  }
  function endScreen() {
    if (!G) return; G.ended = true; G.root.dataset.ph = 'end';
    const pl = G.place; const acc = G.nAns ? G.nOk / G.nAns : 0;
    const rank = pl === 1 && acc >= 0.9 ? 'S' : pl === 1 || acc >= 0.8 ? 'A' : pl <= 2 || acc >= 0.6 ? 'B' : 'C';
    let pb = false; try { pb = arenaRecord('boat', G.score, acc); } catch (e) {}
    const xp = Math.max(2, Math.round(G.nOk * 2 + [15, 8, 4][pl - 1] + (rank === 'S' ? 10 : 0)));
    try { addXP(xp); } catch (e) {}
    const expr = rank === 'S' || rank === 'A' ? 'joy' : rank === 'B' ? 'happy' : 'oops';
    const mm = Math.floor(G.me.fin / 60), ss = Math.round(G.me.fin % 60);
    const miss = [...G.missed.values()];
    ov(`<div class="bo-panel bo-end r-${rank}">
      <div class="bo-res"><div class="bo-burst"></div><div class="bo-rk"><span>${rank}</span><small>RANK</small></div><div class="bo-res-m">${mascot(expr, 118)}</div></div>
      <div class="bo-place p${pl}"><b>${pl}<sup>${PLACE[pl - 1].slice(1)}</sup></b><span class="hz">${PLACE_ZH[pl - 1]}</span><em>${t(PLACE_ID[pl - 1])}</em></div>
      ${pb ? `<div class="bo-pb">${IC.trophy}${t('Rekor baru!')}</div>` : ''}
      <div class="bo-stats"><div><b>${nfmt(G.score)}</b><span>${t('Skor')}</span></div><div><b>${Math.round(acc * 100)}%</b><span>${t('Akurasi')}</span></div><div><b>${G.maxCombo}</b><span>${t('Kombo maks')}</span></div><div><b>${mm}:${String(ss).padStart(2, '0')}</b><span>${t('Waktu')}</span></div></div>
      <div class="bo-xp">+${xp} XP</div>
      ${miss.length ? `<div class="bo-lab">${t('Kata yang perlu diulang')}</div><div class="bo-miss">${miss.map(it => `<div class="bo-mi"><b class="hz">${esc(it.zh)}${lvItemBadge(it, '', 'xs')}</b><span class="bo-mi-py">${esc(it.py)}</span><span class="bo-mi-tr">${esc(it.tr)}</span><button class="bo-gb bo-sm" data-bo="sayw" data-v="${esc(it.zh)}" aria-label="${t('Dengar lagi')}">${IC.spk}</button></div>`).join('')}</div>` : `<div class="bo-allok">${IC.bolt}${t('Semua benar — mantap!')}</div>`}
      <div class="bo-ends"><button class="bo-go" data-bo="again">${IC.replay}<span>${t('Main lagi')}</span></button><button class="bo-btn2" data-bo="close">${IC.back}<span>${t('Kembali')}</span></button></div>
    </div>`);
    if (G.au) { G.inten = 0; G.bpm = 112; later(2.6, () => { if (G && G.ended) musGo(true); }); }
  }

  /* ---------- input ---------- */
  function onClick(e) {
    const b = e.target.closest('[data-bo]'); if (!b || !G) return; const a = b.dataset.bo, v = b.dataset.v;
    FX.ensure();
    if (a === 'close') return close();
    if (a === 'online') { if (typeof TTS !== 'undefined' && TTS.unlock) TTS.unlock(); return goOnline(); }
    if (a === 'oagain') return netAgain();
    if (a === 'music') { G.musicOn = !G.musicOn; setMusicBtn(); const s = arS(); s.bo = s.bo || {}; s.bo.mu = G.musicOn ? 1 : 0; save(); return; }
    if (a === 'pause') return pause(!G.paused);
    if (a === 'resume') return pause(false);
    if (a === 'mode') { G.mode = v; G.root.querySelectorAll('.bo-mode').forEach(x => x.classList.toggle('on', x.dataset.v === v)); click(); return; }
    if (a === 'diff') { G.diff = +v; G.root.querySelectorAll('.bo-seg button').forEach(x => x.classList.toggle('on', x.dataset.v === v)); click(); return; }
    if ((a === 'go' || a === 'again') && !G.on) { if (typeof TTS !== 'undefined' && TTS.unlock) TTS.unlock(); return startRace(); }
    if (a === 'ans') return answer(+v);
    if (a === 'say') return G.q && lgSay(G.q.it.zh);
    if (a === 'slow') return G.q && lgSay(G.q.it.zh, true);
    if (a === 'sayw') return lgSay(v);
  }
  function click() { const A = G.au; if (A) tone(A.sfx, 'triangle', 1400, A.ctx.currentTime + 0.005, 0.05, 0.06); }
  function onKey(e) {
    if (!G) return; const k = e.key; let used = true;
    const lob = document.getElementById('arnet'); if (lob && lob.classList.contains('on')) return;   // lobby online di atas
    if (G.on && G.ended && (k === 'Enter' || k === ' ')) { e.preventDefault(); return; }
    if (k === 'Escape') { if (G.paused) pause(false); else close(); }
    else if (G.paused) { if (k === 'Enter' || k === ' ') pause(false); else used = false; }
    else if (G.phase === 'setup') { if (k === 'Enter' || k === ' ') startRace(); else if (/^[1-5]$/.test(k)) { const m = MODES[+k - 1]; G.mode = m.k; showSetup(); } else used = false; }
    else if (G.ended) { if (k === 'Enter' || k === ' ') startRace(); else used = false; }
    else if (G.phase === 'race' && G.q && !G.q.done) {
      const wide = window.innerWidth >= 760;
      if (/^[1-4]$/.test(k)) answer(+k - 1);
      else if (k === 'ArrowLeft' || k === 'ArrowRight' || k === 'ArrowUp' || k === 'ArrowDown') {
        let s = G.sel < 0 ? 0 : G.sel;
        if (G.sel >= 0) { if (k === 'ArrowLeft') s = Math.max(0, s - 1); if (k === 'ArrowRight') s = Math.min(3, s + 1); if (k === 'ArrowUp') s = wide ? s : s >= 2 ? s - 2 : s; if (k === 'ArrowDown') s = wide ? s : s < 2 ? s + 2 : s; }
        G.sel = s; G.root.querySelectorAll('.bo-opt').forEach((b, j) => b.classList.toggle('sel', j === s));
      } else if ((k === 'Enter' || k === ' ') && G.sel >= 0) answer(G.sel);
      else if (k === 'r' || k === 'R') lgSay(G.q.it.zh);
      else used = false;
    } else if (k === ' ' || k === 'Enter') { } else used = false;
    if (used) { e.preventDefault(); e.stopPropagation(); }
  }
  function onVis() {
    if (!G) return;
    if (!G.on) { if (document.hidden) pause(true); return; }
    // online: tidak boleh jeda — saat kembali, sinkronkan waktu balapan
    const O = G.on; if (document.hidden) { O.hid = performance.now(); return; }
    if (!O.hid) return; const gap = Math.min(600, (performance.now() - O.hid) / 1000); O.hid = 0; G.last = 0;
    if (G.phase === 'race' || G.phase === 'end') { G.rt += gap; if (O.auth) G.boats.forEach(b => { if (b.bot && !b.fin) b.x += b.v * gap; }); }
    O.sendT = 0;
  }

  /* ---------- render kanvas ---------- */
  function loop(ts) {
    if (!G || !G.alive) return;
    if (G.on) {   // online: waktu nyata (HP lambat tidak boleh "memperlambat" jam balapan) → langkah fisika ≤ 50 ms
      let rd = G.last ? Math.min(0.5, (ts - G.last) / 1000) : 0.016; G.last = ts;
      while (rd > 0 && G && G.alive) { const st = Math.min(0.05, rd); rd -= st; update(st); }
    } else {
      const dt = G.last ? Math.min(0.05, (ts - G.last) / 1000) : 0.016; G.last = ts;
      if (!G.paused) update(dt);
    }
    if (!G || !G.alive) return;
    try { draw(); } catch (e) { console.error(e); }
    G.raf = requestAnimationFrame(loop);
  }
  const sxOf = x => G.W / 2 + (x - G.cam) * G.ppu;
  function draw() {
    const c = G.cx, W = G.W, H = G.H, hz = G.hz, T = G.t;
    c.setTransform(G.dpr, 0, 0, G.dpr, 0, 0);
    if (G.shake > 0.3) c.translate(rnd(-1, 1) * G.shake * 0.5, rnd(-1, 1) * G.shake * 0.5);
    const camPx = G.scroll || 0;
    // langit
    let g = c.createLinearGradient(0, 0, 0, hz); g.addColorStop(0, '#3f8ef0'); g.addColorStop(0.45, '#7cc4ff'); g.addColorStop(0.8, '#cdeaff'); g.addColorStop(1, '#ffe0ef');
    c.fillStyle = g; c.fillRect(-20, -20, W + 40, hz + 22);
    // matahari
    const sx = W * 0.8, sy = Math.max(70, hz * 0.42);
    g = c.createRadialGradient(sx, sy, 0, sx, sy, 140); g.addColorStop(0, 'rgba(255,250,220,.95)'); g.addColorStop(0.25, 'rgba(255,240,190,.55)'); g.addColorStop(1, 'rgba(255,230,200,0)');
    c.fillStyle = g; c.fillRect(sx - 140, sy - 140, 280, 280); c.fillStyle = '#fffbe8'; c.beginPath(); c.arc(sx, sy, 26, 0, 7); c.fill();
    // awan
    for (const cl of G.clouds) {
      const span = W + cl.w + 60; let x = ((cl.u * span - camPx * cl.p - T * 6 * cl.v) % span + span) % span - cl.w - 30;
      const y = 40 + cl.v * Math.max(60, hz - 140) * 1.6; c.drawImage(cl.c, x, Math.min(y, hz - cl.h * 0.6), cl.w, cl.h);
    }
    // gunung jauh, kota, bukit
    const mt = (k, par, base, amp, col, edge, per) => {
      const off = camPx * par; c.beginPath(); c.moveTo(-10, hz + 2);
      for (let x = -10; x <= W + 20; x += 14) { const u = (x + off) / per * Math.PI * 2 / 2; c.lineTo(x, base - (G.mtn[k](u) * 0.5 + 0.55) * amp); }
      c.lineTo(W + 20, hz + 2); c.closePath(); c.fillStyle = col; c.fill(); if (edge) { c.strokeStyle = edge; c.lineWidth = 2; c.stroke(); }
    };
    const mh = Math.min(140, (hz - G.y0) + 60);
    mt(0, 0.04, hz, mh * 1.0, '#a9c6f0', 'rgba(255,255,255,.6)', 1300);
    mt(1, 0.08, hz, mh * 0.72, '#8db2e6', 'rgba(255,255,255,.45)', 900);
    drawCity(c, hz, camPx * 0.13);
    mt(2, 0.22, hz + 1, mh * 0.34, '#4fbf8f', '#2c8a63', 620);
    // air
    const H2 = H + 20;
    g = c.createLinearGradient(0, hz, 0, H); g.addColorStop(0, '#8fe6f7'); g.addColorStop(0.12, '#4cc6ec'); g.addColorStop(0.55, '#2a8fd6'); g.addColorStop(1, '#1652a3');
    c.fillStyle = g; c.fillRect(-20, hz, W + 40, H2 - hz);
    c.fillStyle = 'rgba(255,255,255,.75)'; c.fillRect(-20, hz, W + 40, 1.5);
    // pantulan matahari
    c.fillStyle = 'rgba(255,255,240,.55)';
    for (let k = 0; k < 9; k++) { const yy = hz + 4 + k * k * 2.2; const w = (14 + k * 6) * (0.6 + 0.4 * Math.sin(T * 3 + k)); c.fillRect(sx - w / 2 + Math.sin(T * 2 + k * 1.7) * 6, yy, w, 1.6 + k * 0.15); }
    // gelombang berlapis
    const N = 10;
    for (let j = 0; j < N; j++) {
      const d = (j + 1) / N; const y = hz + (H - hz) * Math.pow(j / N, 1.35) + 6; const A = 1 + 5.5 * d; const lam = 50 + 150 * d; const off = camPx * (0.25 + 0.85 * d) + T * 18 * d;
      c.beginPath(); for (let x = -20; x <= W + 20; x += 12) { const yy = y + Math.sin((x + off) / lam * 6.283) * A; x === -20 ? c.moveTo(x, yy) : c.lineTo(x, yy); }
      c.strokeStyle = `rgba(255,255,255,${0.12 + 0.22 * d})`; c.lineWidth = 0.8 + 2.4 * d; c.stroke();
      if (j % 2) { c.lineTo(W + 20, y + 30 * d + 8); c.lineTo(-20, y + 30 * d + 8); c.closePath(); c.fillStyle = 'rgba(255,255,255,.035)'; c.fill(); }
    }
    // kilau
    for (const s of G.sparks) {
      const y = hz + (H - hz) * s.d * 0.98; const par = 0.25 + 0.85 * s.d; const span = W + 40; const x = ((s.u * span * 3 - camPx * par) % span + span) % span - 20;
      const a = Math.max(0, Math.sin(T * 3.2 + s.ph)); if (a < 0.15) continue; star(c, x, y, s.s * (0.5 + s.d) * a, `rgba(255,255,255,${a * 0.9})`);
    }
    // tali lintasan & pelampung
    const rope = (y, sc) => {
      const st = Math.floor((G.cam - W / 2 / G.ppu) / 2.5) - 1;
      for (let k = st; k * 2.5 < G.cam + W / 2 / G.ppu + 3; k++) { const x = sxOf(k * 2.5); if (k * 2.5 < -6 || k * 2.5 > G.D + 6) continue; const yy = y + Math.sin(T * 2 + k) * 1.5; c.fillStyle = k % 2 ? '#ff4d6d' : '#ffffff'; c.strokeStyle = '#7a2340'; c.lineWidth = 1.4; c.beginPath(); c.ellipse(x, yy, 5 * sc, 3.4 * sc, 0, 0, 7); c.fill(); c.stroke(); }
    };
    // tanda jarak
    const marks = (y, sc) => {
      for (let m = 100; m < G.D; m += 100) { const x = sxOf(m); if (x < -60 || x > W + 60) continue; c.save(); c.translate(x, y); c.scale(sc, sc); c.fillStyle = '#fff'; c.strokeStyle = '#1d3b7a'; c.lineWidth = 2.5; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -46); c.stroke(); rr(c, -24, -66, 48, 22, 7); c.fill(); c.stroke(); c.fillStyle = '#1d3b7a'; c.font = '800 13px system-ui,sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(m + ' m', 0, -55); c.fillStyle = '#ffd23f'; c.beginPath(); c.arc(0, 0, 6, 0, 7); c.fill(); c.stroke(); c.restore(); }
    };
    const L = G.lanes;
    marks(hz + (L[0] - hz) * 0.42, G.ls[0] * 0.8);
    drawGate(c, -5, 'START', '起點', false); drawGate(c, G.D, 'FINISH', '終點', false);
    // perahu per jalur (jauh → dekat)
    for (let ln = 0; ln < L.length; ln++) {
      if (ln > 0) rope((L[ln - 1] + L[ln]) / 2 + 4, G.ls[ln] * 0.95);
      const b = G.boats.find(x => x.lane === ln); if (b) drawBoat(c, b);
    }
    // partikel
    for (const p of G.parts) {
      const x = sxOf(p.x); if (x < -30 || x > W + 30) continue; const a = clamp(p.life / p.max, 0, 1);
      if (p.kind === 'foam') { c.fillStyle = `rgba(255,255,255,${a * 0.75})`; c.beginPath(); c.ellipse(x, p.y, p.r * 1.6, p.r * 0.7, 0, 0, 7); c.fill(); }
      else if (p.kind === 'drop') { c.globalAlpha = a; c.fillStyle = p.col; c.strokeStyle = 'rgba(20,90,170,.8)'; c.lineWidth = 1.2; c.beginPath(); c.arc(x, p.y, p.r, 0, 7); c.fill(); c.stroke(); c.globalAlpha = 1; }
      else if (p.kind === 'star') { c.globalAlpha = a; star(c, x, p.y, p.r * 1.6, p.col); c.globalAlpha = 1; }
    }
    drawGate(c, -5, 'START', '起點', true); drawGate(c, G.D, 'FINISH', '終點', true);
    // label & indikator luar layar
    for (const b of G.boats) labelBoat(c, b);
    // teks melayang
    for (const f of G.floats) {
      const a = clamp(f.life / f.max, 0, 1); const p = 1 - a; const x = sxOf(f.x); const y = G.lanes[f.lane] - G.L * 0.62 * G.ls[f.lane] - p * 40 - (f.dy || 0);
      const sc = (p < 0.15 ? 0.6 + p / 0.15 * 0.55 : 1.15 - Math.min(0.15, (p - 0.15))) * f.sz;
      c.save(); c.globalAlpha = Math.min(1, a * 2); c.translate(x, y); c.scale(sc, sc); c.rotate(-0.06); animeText(c, f.txt, 0, 0, 30, f.col); c.restore();
    }
    // garis kecepatan
    const me = G.me; const sp = clamp((me.v - 9) / 10, 0, 1) + (me.nitro > 0 ? 0.6 : 0);
    if (sp > 0.05 && G.phase !== 'setup') {
      c.strokeStyle = `rgba(255,255,255,${Math.min(0.55, sp * 0.45)})`; c.lineCap = 'round';
      for (const l of G.speed) { l.x -= l.v * (600 + me.v * 40) * 0.016; if (l.x + l.l < 0) { l.x = W + rnd(0, 200); l.y = Math.random(); } const y = G.y0 + (H - G.y0) * l.y; c.lineWidth = 1 + l.v; c.beginPath(); c.moveTo(l.x, y); c.lineTo(l.x + l.l * (0.6 + sp), y); c.stroke(); }
    }
    // garis fokus (集中線) saat nitro
    if (G.focus > 0) {
      const a = Math.min(1, G.focus) * 0.5; const cx = sxOf(G.me.x), cy = G.lanes[G.me.lane] - G.L * 0.3; const R0 = Math.min(W, H) * 0.32, R1 = Math.hypot(W, H);
      c.fillStyle = `rgba(255,255,255,${a})`;
      for (let k = 0; k < 56; k++) { const an = k / 56 * 6.283 + rnd(-0.03, 0.03); const w = rnd(0.004, 0.014); const r0 = R0 * rnd(0.9, 1.4); c.beginPath(); c.moveTo(cx + Math.cos(an) * r0, cy + Math.sin(an) * r0); c.lineTo(cx + Math.cos(an - w) * R1, cy + Math.sin(an - w) * R1); c.lineTo(cx + Math.cos(an + w) * R1, cy + Math.sin(an + w) * R1); c.fill(); }
    }
    if (G.flash > 0) { c.fillStyle = `rgba(255,60,100,${G.flash * 0.22})`; c.fillRect(-20, -20, W + 40, H + 40); }
  }
  function rr(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
  function star(c, x, y, r, col) { c.fillStyle = col; c.beginPath(); c.moveTo(x, y - r); c.quadraticCurveTo(x, y, x + r, y); c.quadraticCurveTo(x, y, x, y + r); c.quadraticCurveTo(x, y, x - r, y); c.quadraticCurveTo(x, y, x, y - r); c.fill(); }
  function animeText(c, txt, x, y, size, col) {
    c.font = `italic 900 ${size}px "Arial Black",system-ui,sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round';
    c.lineWidth = size * 0.32; c.strokeStyle = '#2a1050'; c.strokeText(txt, x, y + 2);
    c.lineWidth = size * 0.16; c.strokeStyle = '#fff'; c.strokeText(txt, x, y);
    c.fillStyle = col; c.fillText(txt, x, y);
  }
  function drawCity(c, hz, off) {
    const per = 1400; const base = hz - 2; const sc = clamp((hz - G.y0 + 40) / 200, 0.45, 1);
    c.fillStyle = '#7d93cf'; c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 1.2;
    for (let rep = -1; rep <= Math.ceil(G.W / per) + 1; rep++) {
      const ox = rep * per - (off % per);
      if (ox > G.W + 50 || ox + per < -50) continue;
      c.beginPath();
      for (const [x, w, h] of G.bld) { const X = ox + x; if (X > G.W + 40 || X + w < -40) continue; c.rect(X, base - h * sc, w, h * sc); }
      c.fill();
      // Taipei 101
      const tx = ox + 880; if (tx > -80 && tx < G.W + 80) {
        const k1 = clamp((hz - G.y0 + 40) / 220, 0.45, 1); const bw = 34 * k1, h = 14 * k1; let y = base; const Lp = [];
        Lp.push([tx - bw / 2, y]); y -= 22 * k1; Lp.push([tx - bw / 2, y]);
        for (let k = 0; k < 8; k++) { Lp.push([tx - bw * 0.4, y]); Lp.push([tx - bw * 0.52, y - h]); y -= h; }
        Lp.push([tx - bw * 0.3, y]); y -= 12 * k1; Lp.push([tx - bw * 0.3, y]); Lp.push([tx - 2 * k1, y]); Lp.push([tx - 1 * k1, y - 34 * k1]);
        const P = Lp.concat(Lp.slice().reverse().map(([x, yy]) => [2 * tx - x, yy]));
        c.beginPath(); P.forEach(([x, yy], k) => k ? c.lineTo(x, yy) : c.moveTo(x, yy)); c.closePath(); c.fillStyle = '#6f86c6'; c.fill(); c.stroke();
        c.fillStyle = 'rgba(255,255,255,.22)'; c.fillRect(tx - bw * 0.08, y + 8 * k1, bw * 0.16, base - y - 30 * k1); c.fillStyle = '#7d93cf';
      }
      // 85 Sky Tower (Kaohsiung)
      const kx = ox + 300; if (kx > -80 && kx < G.W + 80) {
        c.beginPath(); c.moveTo(kx - 22 * sc, base); c.lineTo(kx - 18 * sc, base - 92 * sc); c.lineTo(kx - 6 * sc, base - 92 * sc); c.lineTo(kx - 6 * sc, base - 60 * sc); c.lineTo(kx + 6 * sc, base - 60 * sc); c.lineTo(kx + 6 * sc, base - 92 * sc); c.lineTo(kx + 18 * sc, base - 92 * sc); c.lineTo(kx + 22 * sc, base);
        c.closePath(); c.rect(kx - 9 * sc, base - 150 * sc, 18 * sc, 60 * sc); c.rect(kx - 1.5 * sc, base - 172 * sc, 3 * sc, 22 * sc); c.fillStyle = '#7389c9'; c.fill(); c.stroke(); c.fillStyle = '#7d93cf';
      }
    }
  }
  function drawGate(c, xw, label, zh, front) {
    const x = sxOf(xw); if (x < -G.W * 0.6 || x > G.W * 1.6) return;
    const L = G.lanes, hz = G.hz; const s = G.L / 200;
    const far = { x: x + 26 * s, y: hz + (L[0] - hz) * 0.25, h: G.L * 1.05 }, near = { x: x - 18 * s, y: G.H + 10, h: (G.H + 10 - L[0]) + G.L * 0.75 };
    const ft = { x: far.x, y: far.y - far.h }, nt = { x: near.x, y: near.y - near.h };
    if (!front) {
      // garis kotak-kotak di air
      const n = 14; for (let k = 0; k < n; k++) { const a = k / n, b = (k + 1) / n; const ya = far.y + (L[L.length - 1] + 20 - far.y) * a, yb = far.y + (L[L.length - 1] + 20 - far.y) * b; const xa = far.x + (near.x - far.x) * a, xb = far.x + (near.x - far.x) * b; const w = (6 + 10 * a) * s * 1.4;
        c.fillStyle = k % 2 ? 'rgba(255,255,255,.85)' : 'rgba(30,30,60,.75)'; c.beginPath(); c.moveTo(xa - w, ya); c.lineTo(xa + w, ya); c.lineTo(xb + w, yb); c.lineTo(xb - w, yb); c.fill(); }
      pole(c, far.x, far.y, far.h, 8 * s);
      return;
    }
    pole(c, near.x, near.y, near.h, 14 * s);
    // tali + spanduk
    const mx = (ft.x + nt.x) / 2, my = (ft.y + nt.y) / 2 + 10 * s;
    c.strokeStyle = '#5a1a1a'; c.lineWidth = 3 * s; c.beginPath(); c.moveTo(ft.x, ft.y + 8 * s); c.quadraticCurveTo(mx, my + 30 * s, nt.x, nt.y + 8 * s); c.stroke();
    // spanduk sebagai panel tegak dekat tiang atas
    const bw = Math.max(110, G.L * 0.9), bh = bw * 0.36; const bx = nt.x - bw * 0.08, by = nt.y + 12 * s;
    c.save(); c.translate(bx, by); c.rotate(-0.04 + Math.sin(G.t * 1.6) * 0.015);
    c.fillStyle = 'rgba(0,0,0,.18)'; rr(c, 4, 5, bw, bh, 8); c.fill();
    const gg = c.createLinearGradient(0, 0, 0, bh); gg.addColorStop(0, '#ff3d5e'); gg.addColorStop(1, '#c4123a'); c.fillStyle = gg; rr(c, 0, 0, bw, bh, 8); c.fill();
    c.strokeStyle = '#ffd23f'; c.lineWidth = 3; c.stroke(); c.strokeStyle = '#5a0d1e'; c.lineWidth = 1.5; rr(c, -2, -2, bw + 4, bh + 4, 9); c.stroke();
    c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.font = `900 ${bh * 0.42}px "Noto Sans TC","PingFang TC",system-ui,sans-serif`; c.fillStyle = '#ffe9a8'; c.fillText(zh, bw / 2, bh * 0.36);
    c.font = `italic 900 ${bh * 0.26}px "Arial Black",system-ui,sans-serif`; c.fillStyle = '#fff'; c.fillText(label, bw / 2, bh * 0.76);
    c.restore();
    // lampion
    for (let k = 1; k <= 4; k++) {
      const a = k / 5; const lx = ft.x + (nt.x - ft.x) * a; const ly = ft.y + (nt.y - ft.y) * a + Math.sin(a * Math.PI) * 30 * s + 8 * s;
      const r = (8 + 8 * a) * s * 1.3; c.save(); c.translate(lx, ly); c.rotate(Math.sin(G.t * 2 + k) * 0.12);
      c.strokeStyle = '#5a1a1a'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, r * 0.6); c.stroke();
      const lg = c.createRadialGradient(-r * 0.3, r * 1.3, 1, 0, r * 1.5, r * 1.4); lg.addColorStop(0, '#ffef9a'); lg.addColorStop(0.35, '#ff5a4a'); lg.addColorStop(1, '#b3122e');
      c.fillStyle = lg; c.beginPath(); c.ellipse(0, r * 1.6, r, r * 1.05, 0, 0, 7); c.fill(); c.strokeStyle = '#5a0d1e'; c.lineWidth = 2; c.stroke();
      c.fillStyle = '#ffd23f'; c.fillRect(-r * 0.45, r * 0.5, r * 0.9, r * 0.16); c.fillRect(-r * 0.45, r * 2.55, r * 0.9, r * 0.16);
      c.strokeStyle = '#ffd23f'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, r * 2.7); c.lineTo(0, r * 3.3); c.stroke();
      c.restore();
    }
  }
  function pole(c, x, y, h, w) {
    const g = c.createLinearGradient(x - w, 0, x + w, 0); g.addColorStop(0, '#9b1230'); g.addColorStop(0.4, '#ff4d6d'); g.addColorStop(1, '#a8112f');
    c.fillStyle = g; c.strokeStyle = '#4a0818'; c.lineWidth = 2; c.beginPath(); c.rect(x - w / 2, y - h, w, h); c.fill(); c.stroke();
    c.fillStyle = '#ffd23f'; c.beginPath(); c.arc(x, y - h, w * 0.85, 0, 7); c.fill(); c.stroke();
    for (let k = 1; k < 4; k++) { c.fillStyle = '#ffd23f'; c.fillRect(x - w / 2, y - h + h * k / 4, w, Math.max(2, w * 0.25)); }
  }
  function drawBoat(c, b) {
    const sx = sxOf(b.x), sc = G.ls[b.lane] * G.L / 200; if (sx < -G.L || sx > G.W + G.L) return;
    if (b.left) { c.save(); c.globalAlpha = 0.42; }
    const y = G.lanes[b.lane]; const T = G.t; const bob = Math.sin(T * 2.6 + b.ph) * 2.5 * G.ls[b.lane];
    const tilt = Math.sin(T * 2.1 + b.ph) * 0.025 - (b.nitro > 0 || b.surge > 0 ? 0.05 : 0) + (b.slow > 0 ? 0.06 * Math.sin(T * 30) : 0);
    // bayangan & riak
    c.fillStyle = 'rgba(10,40,100,.25)'; c.beginPath(); c.ellipse(sx, y + 8 * sc, 110 * sc, 10 * sc, 0, 0, 7); c.fill();
    // jejak buih
    const wl = clamp(b.v * 9, 0, 160) * sc; if (wl > 4) { const gr = c.createLinearGradient(sx - 95 * sc - wl, 0, sx - 90 * sc, 0); gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(1, 'rgba(255,255,255,.85)'); c.fillStyle = gr; c.beginPath(); c.moveTo(sx - 90 * sc, y - 2 * sc); c.quadraticCurveTo(sx - 90 * sc - wl * 0.5, y + 10 * sc + Math.sin(T * 9) * 2, sx - 92 * sc - wl, y + 4 * sc); c.quadraticCurveTo(sx - 90 * sc - wl * 0.5, y + 16 * sc, sx - 80 * sc, y + 10 * sc); c.fill(); }
    c.save(); c.translate(sx, y + bob); c.rotate(tilt); c.scale(sc, sc);
    c.lineJoin = 'round'; c.lineCap = 'round';
    const OL = b.dk; const lw = 5;
    // ekor
    c.strokeStyle = OL; c.lineWidth = 15; c.beginPath(); c.moveTo(-88, -10); c.quadraticCurveTo(-116, -18, -114, -40); c.quadraticCurveTo(-112, -58, -98, -56); c.quadraticCurveTo(-88, -52, -94, -44); c.stroke();
    c.strokeStyle = b.col; c.lineWidth = 9; c.stroke();
    c.fillStyle = b.acc; c.strokeStyle = OL; c.lineWidth = 3; c.beginPath(); c.moveTo(-112, -30); c.lineTo(-130, -40); c.lineTo(-120, -24); c.lineTo(-132, -16); c.lineTo(-110, -16); c.closePath(); c.fill(); c.stroke();
    // bendera
    c.strokeStyle = OL; c.lineWidth = 3; c.beginPath(); c.moveTo(-74, -12); c.lineTo(-74, -78); c.stroke();
    const fw = Math.sin(T * 8 + b.ph) * 4; c.fillStyle = b.acc; c.beginPath(); c.moveTo(-74, -78); c.quadraticCurveTo(-92, -76 + fw, -108, -70 + fw); c.quadraticCurveTo(-92, -64 - fw, -74, -60); c.closePath(); c.fill(); c.lineWidth = 2.5; c.stroke();
    // pengayuh (di belakang lambung)
    const rowA = Math.sin(b.row * 1.0);
    // lambung
    c.beginPath(); c.moveTo(-92, -12); c.lineTo(86, -12); c.quadraticCurveTo(100, -12, 104, 2); c.quadraticCurveTo(78, 20, 0, 19); c.quadraticCurveTo(-78, 19, -98, 4); c.quadraticCurveTo(-104, -8, -92, -12); c.closePath();
    const hg = c.createLinearGradient(0, -12, 0, 19); hg.addColorStop(0, b.hi); hg.addColorStop(0.35, b.col); hg.addColorStop(1, b.dk);
    c.fillStyle = hg; c.fill(); c.strokeStyle = OL; c.lineWidth = lw; c.stroke();
    // sisik
    c.save(); c.clip(); c.strokeStyle = b.acc; c.lineWidth = 2.2; c.globalAlpha = 0.85;
    for (let x = -84; x < 90; x += 12) { c.beginPath(); c.arc(x, 0, 6, Math.PI * 0.05, Math.PI * 0.95); c.stroke(); c.beginPath(); c.arc(x + 6, 7, 6, Math.PI * 0.05, Math.PI * 0.95); c.stroke(); }
    c.globalAlpha = 1; c.fillStyle = 'rgba(255,255,255,.45)'; c.fillRect(-90, -10, 180, 3); c.restore();
    c.fillStyle = b.acc; c.strokeStyle = OL; c.lineWidth = 3; rr(c, -92, -17, 182, 7, 3); c.fill(); c.stroke();
    // kepala naga
    c.fillStyle = b.col; c.strokeStyle = OL; c.lineWidth = lw;
    c.beginPath(); c.moveTo(78, -14); c.quadraticCurveTo(96, -20, 98, -44); c.lineTo(108, -40); c.quadraticCurveTo(104, -18, 92, -12); c.closePath(); c.fill(); c.stroke();
    // surai
    c.fillStyle = b.acc2; c.beginPath(); c.moveTo(98, -52); c.lineTo(80, -62); c.lineTo(92, -50); c.lineTo(76, -46); c.lineTo(92, -42); c.lineTo(80, -32); c.lineTo(98, -36); c.closePath(); c.fill(); c.lineWidth = 3; c.stroke();
    // tanduk
    c.fillStyle = b.acc; c.beginPath(); c.moveTo(104, -58); c.quadraticCurveTo(98, -76, 84, -80); c.quadraticCurveTo(96, -70, 98, -56); c.closePath(); c.fill(); c.stroke();
    const jaw = b.nitro > 0 || b.face === 'joy' ? 4 : 0;
    c.fillStyle = b.col; c.lineWidth = lw;
    c.beginPath(); c.moveTo(94, -46); c.quadraticCurveTo(98, -63, 116, -61); c.lineTo(136, -56); c.quadraticCurveTo(143, -52, 137, -48); c.lineTo(122, -47); c.lineTo(134, -41 + jaw); c.quadraticCurveTo(128, -34 + jaw, 114, -36); c.quadraticCurveTo(100, -36, 94, -46); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.45)'; c.beginPath(); c.ellipse(112, -57, 9, 2.5, -0.15, 0, 7); c.fill();
    c.fillStyle = '#fff'; c.beginPath(); c.moveTo(123, -47); c.lineTo(126, -42 + jaw * 0.5); c.lineTo(129, -47); c.fill();
    c.fillStyle = '#fff'; c.strokeStyle = OL; c.lineWidth = 2.5; c.beginPath(); c.ellipse(111, -53, 5, 5.5, 0, 0, 7); c.fill(); c.stroke();
    c.fillStyle = '#1a1030'; c.beginPath(); c.arc(112.5, -53, 2.8, 0, 7); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(113.5, -54.5, 1, 0, 7); c.fill();
    c.strokeStyle = OL; c.lineWidth = 3; c.beginPath(); c.moveTo(104, -60); c.lineTo(118, -62); c.stroke();
    c.fillStyle = OL; c.beginPath(); c.arc(134, -53, 1.6, 0, 7); c.fill();
    c.strokeStyle = b.acc2; c.lineWidth = 2.5; const wh = Math.sin(T * 5 + b.ph) * 4; c.beginPath(); c.moveTo(138, -51); c.quadraticCurveTo(150, -60 + wh, 160, -50 + wh); c.stroke(); c.beginPath(); c.moveTo(134, -42); c.quadraticCurveTo(146, -36 - wh, 154, -42 - wh); c.stroke();
    // tambur
    c.fillStyle = '#c4123a'; c.strokeStyle = OL; c.lineWidth = 3; rr(c, 38, -30, 22, 16, 4); c.fill(); c.stroke(); c.fillStyle = '#ffe2b0'; c.beginPath(); c.ellipse(49, -30, 11, 3, 0, 0, 7); c.fill(); c.stroke();
    // pengemudi
    if (b.me) drawHacimi(c, b, rowA); else drawChibi(c, b, rowA);
    c.restore();
    // ombak haluan
    const bw = clamp(b.v * 1.6, 0, 26) * sc; if (bw > 2) { c.fillStyle = 'rgba(255,255,255,.9)'; c.beginPath(); c.moveTo(sx + 96 * sc, y + bob + 2 * sc); c.quadraticCurveTo(sx + 110 * sc + bw, y + bob - bw * 0.7, sx + 118 * sc + bw, y + bob + 8 * sc); c.quadraticCurveTo(sx + 104 * sc, y + bob + 12 * sc, sx + 80 * sc, y + bob + 12 * sc); c.fill(); }
    // aura nitro
    if (b.left) c.restore();
    if (!b.left && (b.nitro > 0 || b.surge > 0)) { const a = b.me ? 0.35 + 0.15 * Math.sin(T * 20) : 0.18; const gl = c.createRadialGradient(sx, y - 20 * sc, 10, sx, y - 20 * sc, 150 * sc); gl.addColorStop(0, `rgba(255,230,120,${a})`); gl.addColorStop(1, 'rgba(255,120,200,0)'); c.fillStyle = gl; c.fillRect(sx - 160 * sc, y - 170 * sc, 320 * sc, 260 * sc); }
  }
  function paddle(c, rowA, x0, y0, col) {
    const an = 0.5 + rowA * 0.55; const len = 64; const ex = x0 - Math.sin(an) * len * 0.5, ey = y0 + Math.cos(an) * len;
    c.strokeStyle = '#3a2410'; c.lineWidth = 7; c.beginPath(); c.moveTo(x0 + Math.sin(an) * 14, y0 - Math.cos(an) * 14); c.lineTo(ex, ey); c.stroke();
    c.strokeStyle = '#c98a4a'; c.lineWidth = 4; c.stroke();
    c.save(); c.translate(ex, ey); c.rotate(-Math.atan2(ex - x0, ey - y0)); c.fillStyle = col; c.strokeStyle = '#3a2410'; c.lineWidth = 3; c.beginPath(); c.ellipse(0, 6, 7, 14, 0, 0, 7); c.fill(); c.stroke(); c.restore();
    return { ex, ey };
  }
  function drawHacimi(c, b, rowA) {
    paddle(c, rowA, 8, -40, '#ffd23f');
    const im = G.img && (G.img[b.face] || G.img.happy);
    const bounce = Math.abs(Math.sin(b.row * 1.0)) * 3;
    if (im && im.complete && im.naturalWidth) c.drawImage(im, -44, -100 - bounce, 84, 84);
    else { c.fillStyle = '#F4A9BC'; c.beginPath(); c.arc(0, -56, 30, 0, 7); c.fill(); }
    // ikat kepala
    c.strokeStyle = '#ff2d55'; c.lineWidth = 4; const fl = Math.sin(G.t * 12) * 4; c.beginPath(); c.moveTo(-26, -78 - bounce); c.quadraticCurveTo(-40, -84 + fl - bounce, -52, -78 + fl - bounce); c.stroke(); c.beginPath(); c.moveTo(-26, -76 - bounce); c.quadraticCurveTo(-38, -70 - fl - bounce, -50, -72 - fl - bounce); c.stroke();
  }
  function drawChibi(c, b, rowA) {
    const bounce = Math.abs(Math.sin(b.row)) * 3; const OL = '#2a1a3a'; const T = G.t;
    c.save(); c.translate(-6, -bounce);
    // badan
    c.fillStyle = b.shirt; c.strokeStyle = OL; c.lineWidth = 3.5; c.beginPath(); c.moveTo(-14, -14); c.quadraticCurveTo(-16, -40, 0, -42); c.quadraticCurveTo(16, -40, 14, -14); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = b.band; c.fillRect(-13, -30, 26, 5);
    // ikat kepala berkibar (di belakang kepala)
    const fl = Math.sin(T * 12 + b.ph) * 4; c.strokeStyle = b.band; c.lineWidth = 5; c.beginPath(); c.moveTo(-16, -66); c.quadraticCurveTo(-30, -72 + fl, -44, -64 + fl); c.stroke(); c.beginPath(); c.moveTo(-16, -63); c.quadraticCurveTo(-28, -56 - fl, -40, -58 - fl); c.stroke();
    // kepala
    c.fillStyle = '#ffe3cf'; c.strokeStyle = OL; c.lineWidth = 3.5; c.beginPath(); c.arc(2, -60, 20, 0, 7); c.fill(); c.stroke();
    // rambut runcing
    c.fillStyle = b.hair; c.beginPath(); c.moveTo(-19, -58); c.lineTo(-24, -74); c.lineTo(-12, -72); c.lineTo(-14, -88); c.lineTo(-2, -78); c.lineTo(4, -92); c.lineTo(10, -78); c.lineTo(22, -86); c.lineTo(18, -72); c.lineTo(26, -66); c.quadraticCurveTo(20, -70, 14, -68); c.lineTo(10, -62); c.lineTo(6, -68); c.quadraticCurveTo(-6, -70, -12, -60); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = b.band; c.strokeStyle = OL; c.lineWidth = 2.5; c.beginPath(); c.moveTo(-18, -68); c.quadraticCurveTo(2, -76, 22, -68); c.lineTo(22, -63); c.quadraticCurveTo(2, -71, -18, -63); c.closePath(); c.fill(); c.stroke();
    // mata anime
    const ey = -56; [[6, ey], [16, ey]].forEach(([x, y]) => { c.fillStyle = OL; c.beginPath(); c.ellipse(x, y, 3, 4.6, 0, 0, 7); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(x + 1, y - 1.8, 1.4, 0, 7); c.fill(); });
    c.fillStyle = 'rgba(255,120,150,.6)'; c.beginPath(); c.ellipse(2, -49, 4, 2.2, 0, 0, 7); c.fill(); c.beginPath(); c.ellipse(20, -49, 3, 2, 0, 0, 7); c.fill();
    c.strokeStyle = OL; c.lineWidth = 2; c.beginPath(); c.arc(12, -48, 3, 0.2, Math.PI - 0.2); c.stroke();
    c.restore();
    paddle(c, rowA, 4, -36 - bounce, b.acc);
    c.fillStyle = '#ffe3cf'; c.strokeStyle = OL; c.lineWidth = 2.5; c.beginPath(); c.arc(6 + Math.sin(0.5 + rowA * 0.55) * -8, -34 - bounce + Math.cos(0.5 + rowA * 0.55) * 10, 4.5, 0, 7); c.fill(); c.stroke();
  }
  function labelBoat(c, b) {
    const sx = sxOf(b.x), y = G.lanes[b.lane], s = G.ls[b.lane]; const W = G.W;
    const name = b.me ? t('Kamu') : b.name;
    if (b.me && (sx < 0 || sx > W)) return;
    if (sx < -G.L * 0.4 || sx > W + G.L * 0.4) {
      const left = sx < 0; const d = Math.round(b.x - G.me.x); const x = left ? 8 : W - 8; const yy = y - 40 * s;
      c.save(); c.translate(x, yy); c.fillStyle = 'rgba(255,255,255,.85)'; c.strokeStyle = b.dk; c.lineWidth = 2;
      const w = 74; c.beginPath(); if (left) { c.moveTo(0, 0); c.lineTo(12, -14); c.lineTo(w, -14); c.lineTo(w, 14); c.lineTo(12, 14); } else { c.moveTo(0, 0); c.lineTo(-12, -14); c.lineTo(-w, -14); c.lineTo(-w, 14); c.lineTo(-12, 14); } c.closePath(); c.fill(); c.stroke();
      c.fillStyle = b.col; c.beginPath(); c.arc(left ? 22 : -22, 0, 6, 0, 7); c.fill(); c.fillStyle = b.dk; c.font = '800 12px system-ui,sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText((d > 0 ? '+' : '') + d + 'm', left ? 50 : -48, 0.5); c.restore();
      return;
    }
    if (G.phase === 'end' && G.ended) return;
    const ty = y - G.L * 0.62 * s - 6; c.font = `800 ${Math.round(11 + 2 * s)}px system-ui,sans-serif`; const tw = c.measureText(name).width; const cr = G.on ? 20 : 0; const w = tw + 22 + cr;
    if (b.left) c.globalAlpha = 0.55;
    c.fillStyle = b.me ? (G.on ? b.col : 'rgba(255,79,139,.92)') : 'rgba(255,255,255,.86)'; c.strokeStyle = b.me ? '#fff' : b.dk; c.lineWidth = 1.5; rr(c, sx - w / 2, ty - 11, w, 22, 11); c.fill(); c.stroke();
    if (cr) {   // lambang (crest) pemain
      const cx = sx - w / 2 + 12; const g = c.createLinearGradient(cx - 8, ty - 8, cx + 8, ty + 8); g.addColorStop(0, b.acc); g.addColorStop(1, b.col);
      c.fillStyle = g; c.strokeStyle = '#fff'; c.lineWidth = 1.5; c.beginPath(); c.arc(cx, ty, 8.5, 0, 7); c.fill(); c.stroke();
      c.fillStyle = '#fff'; c.font = `900 10px ${G.hzf}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(b.glyph || '', cx, ty + 0.5);
      c.font = `800 ${Math.round(11 + 2 * s)}px system-ui,sans-serif`;
    }
    c.fillStyle = b.me ? '#fff' : b.dk; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(name, sx + cr / 2, ty + 0.5);
    c.fillStyle = b.me ? '#fff' : b.col; c.beginPath(); c.moveTo(sx - 5, ty + 11); c.lineTo(sx + 5, ty + 11); c.lineTo(sx, ty + 17); c.fill();
    c.globalAlpha = 1;
  }

  /* ---------- kartu hub ---------- */
  const ART = `<svg class="ar-ill" viewBox="0 0 320 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><linearGradient id="boSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f8ef0"/><stop offset=".6" stop-color="#9fd6ff"/><stop offset="1" stop-color="#ffd6ea"/></linearGradient>
    <linearGradient id="boSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fdcf5"/><stop offset=".5" stop-color="#2a9fd8"/><stop offset="1" stop-color="#1652a3"/></linearGradient>
    <linearGradient id="boHull" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb3cc"/><stop offset=".4" stop-color="#ff4f8b"/><stop offset="1" stop-color="#7a1a40"/></linearGradient>
    <radialGradient id="boSun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fffbe8"/><stop offset=".3" stop-color="#fff2c0" stop-opacity=".8"/><stop offset="1" stop-color="#fff2c0" stop-opacity="0"/></radialGradient></defs>
    <rect width="320" height="150" fill="url(#boSky)"/><circle cx="262" cy="34" r="40" fill="url(#boSun)"/><circle cx="262" cy="34" r="12" fill="#fffbe8"/>
    <g fill="#fff" stroke="#9fb6e8" stroke-width="1.2" opacity=".95"><path d="M40 40a11 11 0 0 1 20-6 13 13 0 0 1 24 4 9 9 0 0 1 4 17H38a8 8 0 0 1 2-15z"/><path d="M180 24a8 8 0 0 1 15-4 10 10 0 0 1 18 3 7 7 0 0 1 3 13h-37a6 6 0 0 1 1-12z"/></g>
    <path d="M0 86 L30 70 60 78 95 60 130 74 170 58 210 72 250 62 290 74 320 66 V92 H0z" fill="#a9c6f0" stroke="#fff" stroke-opacity=".6"/>
    <g fill="#93abdb"><rect x="200" y="74" width="10" height="18"/><rect x="212" y="68" width="8" height="24"/><rect x="236" y="76" width="12" height="16"/><path d="M226 92V80l-2-4h8l-2 4v12z"/><path d="M224 76l-1.5-5h11l-1.5 5zM223 71l-1.5-5h12l-1.5 5zM222 66l-1.5-5h13l-1.5 5z"/><rect x="226" y="53" width="4" height="8"/><rect x="227.5" y="40" width="1" height="13"/></g>
    <path d="M0 92 Q40 84 80 90 T160 88 T240 90 T320 86 V96 H0z" fill="#4fbf8f" stroke="#2c8a63" stroke-width="1"/>
    <rect y="94" width="320" height="56" fill="url(#boSea)"/><rect y="94" width="320" height="1.4" fill="#fff" opacity=".8"/>
    <g stroke="#fff" fill="none" stroke-linecap="round"><path d="M0 104q15-3 30 0t30 0 30 0 30 0 30 0 30 0 30 0 30 0 30 0 30 0 30 0" stroke-opacity=".35"/><path d="M-10 122q20-5 40 0t40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0" stroke-opacity=".45" stroke-width="1.6"/><path d="M-20 142q25-6 50 0t50 0 50 0 50 0 50 0 50 0 50 0" stroke-opacity=".55" stroke-width="2.2"/></g>
    <g transform="translate(70 104) scale(.42)"><path d="M-92 -12 L86 -12 Q100 -12 104 2 Q78 20 0 19 Q-78 19 -98 4 Q-104 -8 -92 -12Z" fill="#ffb020" stroke="#7a3a06" stroke-width="5"/><path d="M78 -14 Q96 -20 98 -44 L108 -40 Q104 -18 92 -12Z M94 -46 Q98 -63 116 -61 L136 -56 Q143 -52 137 -48 L122 -47 L134 -41 Q128 -34 114 -36 Q100 -36 94 -46Z" fill="#ffb020" stroke="#7a3a06" stroke-width="5" stroke-linejoin="round"/><circle cx="111" cy="-53" r="4" fill="#fff" stroke="#7a3a06" stroke-width="2"/></g>
    <g stroke="#fff" stroke-linecap="round" opacity=".85"><path d="M18 116h40M8 128h56M30 138h44" stroke-width="2.4"/></g>
    <g transform="translate(176 130) scale(.62)"><path d="M-160 4 Q-120 14 -90 8" stroke="#fff" stroke-width="8" fill="none" opacity=".8"/><path d="M-88 -10 Q-116 -18 -114 -40 Q-112 -58 -98 -56 Q-88 -52 -94 -44" stroke="#7a1a40" stroke-width="15" fill="none" stroke-linecap="round"/><path d="M-88 -10 Q-116 -18 -114 -40 Q-112 -58 -98 -56 Q-88 -52 -94 -44" stroke="#ff4f8b" stroke-width="9" fill="none" stroke-linecap="round"/>
      <path d="M-92 -12 L86 -12 Q100 -12 104 2 Q78 20 0 19 Q-78 19 -98 4 Q-104 -8 -92 -12Z" fill="url(#boHull)" stroke="#7a1a40" stroke-width="5" stroke-linejoin="round"/><rect x="-92" y="-17" width="182" height="7" rx="3" fill="#ffd23f" stroke="#7a1a40" stroke-width="3"/>
      <g fill="none" stroke="#ffd23f" stroke-width="2.2" opacity=".85"><path d="M-80 2a6 6 0 0 0 12 0M-56 2a6 6 0 0 0 12 0M-32 2a6 6 0 0 0 12 0M-8 2a6 6 0 0 0 12 0M16 2a6 6 0 0 0 12 0M40 2a6 6 0 0 0 12 0M64 2a6 6 0 0 0 12 0"/></g>
      <path d="M98 -52 L80 -62 92 -50 76 -46 92 -42 80 -32 98 -36Z" fill="#8a5cff" stroke="#7a1a40" stroke-width="3" stroke-linejoin="round"/><path d="M104 -58 Q98 -76 84 -80 Q96 -70 98 -56Z" fill="#ffd23f" stroke="#7a1a40" stroke-width="3"/>
      <path d="M78 -14 Q96 -20 98 -44 L108 -40 Q104 -18 92 -12Z M94 -46 Q98 -63 116 -61 L136 -56 Q143 -52 137 -48 L122 -47 L134 -38 Q128 -31 114 -35 Q100 -36 94 -46Z" fill="#ff4f8b" stroke="#7a1a40" stroke-width="5" stroke-linejoin="round"/>
      <ellipse cx="111" cy="-53" rx="5" ry="5.5" fill="#fff" stroke="#7a1a40" stroke-width="2.5"/><circle cx="112.5" cy="-53" r="2.8" fill="#1a1030"/><path d="M138 -51 Q150 -60 160 -50" stroke="#8a5cff" stroke-width="2.5" fill="none"/>
      <path d="M8 -40 L-18 30" stroke="#3a2410" stroke-width="7" stroke-linecap="round"/><ellipse cx="-20" cy="34" rx="7" ry="14" fill="#ffd23f" stroke="#3a2410" stroke-width="3" transform="rotate(20 -20 34)"/>
      <g transform="translate(-42 -102) scale(.52)"><path d="M30 60 L22 16 Q24 8 33 12 L64 34Z M130 60 L138 16 Q136 8 127 12 L96 34Z" fill="#F4A9BC" stroke="#F4A9BC" stroke-width="8" stroke-linejoin="round"/><ellipse cx="80" cy="78" rx="58" ry="52" fill="#F4A9BC"/><ellipse cx="80" cy="86" rx="43" ry="37" fill="#FFFDFC"/><path d="M53 87 Q62 76 71 87 M89 87 Q98 76 107 87" fill="none" stroke="#9C3F5C" stroke-width="3.6" stroke-linecap="round"/><ellipse cx="55" cy="95" rx="8.5" ry="4.6" fill="#FBB9C9"/><ellipse cx="105" cy="95" rx="8.5" ry="4.6" fill="#FBB9C9"/><path d="M72 104 Q80 114 88 104" fill="#E8628A"/><path d="M28 48 Q80 30 132 48" stroke="#ff2d55" stroke-width="8" fill="none"/></g></g>
    <g fill="#fff" stroke="#2a9fd8" stroke-width="1"><circle cx="292" cy="118" r="4"/><circle cx="300" cy="108" r="2.6"/><circle cx="284" cy="106" r="3"/><circle cx="306" cy="122" r="2"/></g>
    <g><path d="M0 8 Q80 26 160 10 T320 12" stroke="#5a1a1a" stroke-width="1.5" fill="none"/>${[40, 100, 160, 220, 280].map((x, k) => `<g transform="translate(${x} ${[16, 20, 12, 16, 14][k]})"><path d="M0 0v4" stroke="#5a1a1a"/><ellipse cx="0" cy="11" rx="7" ry="7.5" fill="#ff4a4a" stroke="#5a0d1e" stroke-width="1.4"/><rect x="-3.5" y="3" width="7" height="1.8" fill="#ffd23f"/><rect x="-3.5" y="17.5" width="7" height="1.8" fill="#ffd23f"/></g>`).join('')}</g>
    <g fill="#fff"><path d="M150 52l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/><path d="M120 30l1.4 3.6 3.6 1.4-3.6 1.4-1.4 3.6-1.4-3.6-3.6-1.4 3.6-1.4z"/></g></svg>`;

  if (typeof ARENA !== 'undefined') ARENA.reg({
    k: 'boat', ord: 1, title: 'Balap Perahu Naga', zh: '競舟 · 端午龍舟', desc: 'Jawab cepat, perahumu ngebut! Kalahkan 2 perahu rival sampai garis finis.',
    tags: ['Baca', 'Arti', 'Dengar', 'Pinyin'], c1: '#ff4f8b', c2: '#2f9bff', icon: IC.boat.replace('class="bo-ic "', ''), art: ART,
    start(pool) { open(pool); }
  });
  return { open, close, get G() { return G; }, answer: k => G && answer(k), pyOpts, pyOf, online: () => G && goOnline() };
})();