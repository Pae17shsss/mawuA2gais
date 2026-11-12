/* Uji otomatis Xiǎobù Kelas — dijalankan di browser lewat tes.html (tanpa Node).
   Penyimpanan dikunci (SAVE_LOCK) sebelum boot, jadi progres di perangkat tidak tersentuh.
   Hasil juga tersedia di window.__tes = { ok, gagal, daftar } untuk dibaca alat otomatis. */
(async function () {
  const list = document.getElementById('tes-list'), sum = document.getElementById('tes-sum');
  const res = []; const sl = ms => new Promise(r => setTimeout(r, ms));
  const eq = (a, b, m) => { if (a !== b) throw new Error((m || 'tidak sama') + ': ' + JSON.stringify(a) + ' ≠ ' + JSON.stringify(b)); };
  const ya = (c, m) => { if (!c) throw new Error(m || 'syarat tidak terpenuhi'); };
  async function T(nama, fn) {
    let ok = true, err = '';
    try { await fn(); } catch (e) { ok = false; err = (e && e.message) || String(e); }
    res.push({ nama, ok, err });
    const li = document.createElement('li'); li.className = ok ? 'ok' : 'no'; li.textContent = nama + (ok ? '' : ' — ' + err); list.appendChild(li);
  }
  const PK = window.XB_PEAK;
  const kartu = (g, now) => fsrsApply(null, g, now, true);
  const NOW = Date.UTC(2026, 10, 1, 12);

  await T('app dan lapisan V1.7 berhasil boot', () => { ya(PK && PK.booted, 'peak.js tidak boot'); ya(Array.isArray(W) && W.length > 10000, 'daftar kata tidak termuat'); ya(SAVE_LOCK === true, 'penyimpanan harus terkunci'); });

  /* ---------- FSRS ---------- */
  await T('FSRS: kartu baru memakai stabilitas awal sesuai nilai', () => { [1, 2, 3, 4].forEach(g => eq(kartu(g, NOW).s, FSRS_W[g - 1], 'nilai ' + g)); });
  await T('FSRS: peluang ingat 100% saat baru diulang, 90% saat t = stabilitas', () => { eq(fsrsR(0, 5), 1); ya(Math.abs(fsrsR(5, 5) - 0.9) < 1e-9, 'R(s,s) = ' + fsrsR(5, 5)); ya(fsrsR(30, 5) < fsrsR(10, 5), 'R harus turun'); });
  await T('FSRS: benar memperpanjang jeda, lupa memendekkannya', () => {
    const base = () => ({ iv: 10, ef: 2.4, r: 3, lp: 0, st: 3, s: 10, d: 5, lr: NOW - 10 * DAY, ls: NOW - 10 * DAY, ph: 'rev', lrated: 1, due: NOW });
    const g1 = fsrsApply(base(), 1, NOW, true), g2 = fsrsApply(base(), 2, NOW, true), g3 = fsrsApply(base(), 3, NOW, true), g4 = fsrsApply(base(), 4, NOW, true);
    ya(g1.s < 10, 'lupa harus menurunkan stabilitas'); ya(g2.s > 10 && g3.s > g2.s && g4.s > g3.s, 'urutan stabilitas Sulit < Bisa < Mudah');
    eq(g1.ph, 'relearn'); ya(g1.iv < 0.01, 'lupa → muncul lagi dalam menit');
  });
  await T('FSRS: target ingatan mengubah jeda (85% > 90% > 93%)', () => {
    const lama = S.settings.retain; const iv = v => { S.settings.retain = v; return fsrsIvl(20); };
    const a = iv('0.85'), b = iv('0.9'), c = iv('0.93'); S.settings.retain = 'aneh'; const d = fsrsIvl(20); S.settings.retain = lama;
    ya(a > b && b > c, `${a} > ${b} > ${c}`); ya(Math.abs(b - 20) < 1e-6, 'pada 90% jeda = stabilitas'); eq(d, b, 'nilai tak sah → bawaan');
  });

  /* ---------- kode progres ---------- */
  await T('kode progres: bolak-balik utuh (XB2)', async () => { const c = await progressCode(); ya(c.startsWith('XB2:'), c.slice(0, 6)); eq(JSON.stringify(await readCode(c)), JSON.stringify(S)); });
  await T('kode progres: terpotong atau berubah → ditolak', async () => {
    const c = await progressCode(); let a = '', b = '';
    try { await readCode(c.slice(0, -7)); } catch (e) { a = e.message; }
    try { await readCode(c.slice(0, 30) + (c[30] === 'A' ? 'B' : 'A') + c.slice(31)); } catch (e) { b = e.message; }
    eq(a, 'xb-cut'); eq(b, 'xb-cut');
  });
  await T('kode progres: format lama XB0 masih terbaca', async () => { const d = await readCode('XB0:' + btoa(JSON.stringify({ cards: { 1: { iv: 1 } }, settings: {} }))); eq(d.cards[1].iv, 1); });

  /* ---------- pindah HP lewat QR ---------- */
  await T('QR: base45 bolak-balik untuk semua panjang dan nilai byte', () => {
    for (const n of [0, 1, 2, 3, 255, 256, 1001]) { const a = new Uint8Array(n); for (let i = 0; i < n; i++) a[i] = (i * 151 + 7) & 255; const b = PK.qr.b45dec(PK.qr.b45enc(a)); eq(b.length, n, 'panjang ' + n); for (let i = 0; i < n; i++) if (a[i] !== b[i]) throw new Error('byte ' + i + ' pada panjang ' + n); }
    const all = new Uint8Array(512); for (let i = 0; i < 512; i++) all[i] = i < 256 ? i : 255; const s = PK.qr.b45enc(all); ya(/^[0-9A-Z $%*+\-./:]*$/.test(s), 'di luar abjad alfanumerik QR');
  });
  await T('QR: bingkai acak + berulang tersusun kembali jadi progres yang sama', async () => {
    const besar = JSON.parse(JSON.stringify(S)); besar.cards = {}; for (let i = 0; i < 600; i++) besar.cards[i] = { iv: i % 30, ef: 2.4, r: i % 7, lp: 0, st: 2, due: 1794400000000 + i * 977, s: 3.1 + i / 10, d: 5.2, lr: 1794000000000 + i * 131, ph: 'rev', lrated: 1, h: W[i].w };
    const fr = PK.qr.frames(await PK.qr.payload(besar)); ya(fr.length >= 3, 'harus lebih dari satu bingkai: ' + fr.length);
    const urut = fr.concat(fr.slice(0, 2)).sort(() => Math.random() - 0.5); const st = { parts: {} }; let r;
    for (const f of urut) { r = PK.qr.feed(st, f); if (r.done) break; }
    ya(r && r.done, 'tidak selesai'); eq(JSON.stringify(await PK.qr.unpack(r.bytes)), JSON.stringify(besar));
  });
  await T('QR: teks asing diabaikan, bingkai rusak ditolak oleh CRC', async () => {
    const fr = PK.qr.frames(await PK.qr.payload({ cards: { 1: { iv: 1 } }, settings: {}, isi: 'x'.repeat(4000) + Math.random() }));
    const st = { parts: {} }; eq(PK.qr.feed(st, 'https://contoh.id').ok, false); eq(PK.qr.feed(st, 'XQ1:rusak').ok, false);
    const p = fr[0].split(':'); const body = p.slice(5, -1).join(':'); const ganti = body[10] === '0' ? '1' : '0';
    const jelek = p.slice(0, 5).join(':') + ':' + body.slice(0, 10) + ganti + body.slice(11) + ':';
    let r; [jelek].concat(fr.slice(1)).forEach(f => { r = PK.qr.feed(st, f); });
    ya(r.rusak && !r.done, 'bingkai rusak harus ditolak');
    fr.forEach(f => { r = PK.qr.feed(st, f); }); ya(r.done, 'setelah ditolak, pindai ulang harus berhasil');
  });
  await T('QR: gambar kode terbaca kembali oleh pembaca (tiap bingkai)', async () => {
    await PK.qr.lib(); ya(window.qrcode && window.jsQR, 'pustaka QR tidak termuat');
    const fr = PK.qr.frames(await PK.qr.payload()); const cv = document.createElement('canvas'); cv.width = cv.height = 720; const g = cv.getContext('2d');
    const st = { parts: {} }; let r, modul = 0;
    for (const f of fr.slice(0, 6)) { modul = PK.qr.draw(cv, f); const im = g.getImageData(0, 0, 720, 720); const d = window.jsQR(im.data, 720, 720, { inversionAttempts: 'dontInvert' }); ya(d, 'bingkai tidak terbaca'); eq(d.data, f, 'isi bingkai'); r = PK.qr.feed(st, d.data); }
    ya(modul <= 81, 'kode terlalu rapat: ' + modul + ' modul'); if (fr.length <= 6) { ya(r.done, 'tidak selesai'); eq(JSON.stringify(await PK.qr.unpack(r.bytes)), JSON.stringify(S)); }
  });

  await T('QR pasang: kode alamat app terbaca kembali sebagai alamat yang sama', async () => {
    await PK.qr.lib(); const url = 'https://xiaobu-kelas.netlify.app/'; const cv = document.createElement('canvas'); cv.width = cv.height = 720;
    PK.qr.draw(cv, url, 'Byte', 'M'); const im = cv.getContext('2d').getImageData(0, 0, 720, 720); const d = window.jsQR(im.data, 720, 720);
    ya(d, 'kode tidak terbaca'); eq(d.data, url); ya(/^https?:\/\//.test(PK.appUrl()) && !/index\.html$/.test(PK.appUrl()), 'alamat app: ' + PK.appUrl());
  });

  /* ---------- gabung ---------- */
  await T('gabung: ulangan terbaru menang, tidak ada kartu hilang', () => {
    const a = { cards: { 1: { lr: 100, r: 1, x: 'a' }, 2: { lr: 300, r: 2, x: 'a' } }, days: { d1: { ok: 5, xp: 10 } }, xp: 50, streak: { cur: 2, best: 4, last: '2026-11-01' }, settings: { rate: 1 }, stories: { 我: 'punyaku' } };
    const b = { cards: { 1: { lr: 200, r: 2, x: 'b' }, 2: { lr: 250, r: 5, x: 'b' }, 3: { lr: 50, r: 1, x: 'b' } }, days: { d1: { ok: 3, xp: 40 }, d2: { ok: 1 } }, xp: 30, streak: { cur: 1, best: 9, last: '2026-10-20' }, settings: { rate: 0.5 }, stories: { 你: 'dari cadangan' }, tema: { t1: 1 } };
    const m = PK.mergeStates(a, b);
    eq(m.cards[1].x, 'b'); eq(m.cards[2].x, 'a'); eq(m.cards[3].x, 'b');
    eq(m.days.d1.ok, 5); eq(m.days.d1.xp, 40); eq(m.days.d2.ok, 1); eq(m.xp, 50);
    eq(m.streak.last, '2026-11-01'); eq(m.streak.best, 9); eq(m.settings.rate, 1, 'pengaturan milik dasar');
    eq(m.stories['我'], 'punyaku'); eq(m.stories['你'], 'dari cadangan'); eq(m.tema.t1, 1);
  });

  /* ---------- snapshot ---------- */
  await T('snapshot: 400 hari → paling banyak 7 harian + 4 mingguan + 6 bulanan', () => {
    const keys = []; const d0 = new Date(2026, 10, 12);
    for (let i = 0; i < 400; i++) { const d = new Date(d0 - i * 864e5); keys.push(d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0')); }
    keys.push('terkini', 'pra-pulih-2026-11-01', 'pra-pulih-2026-11-02', 'pra-pulih-2026-11-03', 'pra-pulih-2026-11-04');
    const k = PK.keep(keys); const harian = [...k].filter(x => /^\d{4}-/.test(x));
    ya(harian.length <= 17 && harian.length >= 15, 'jumlah harian ' + harian.length);
    keys.slice(0, 7).forEach(x => ya(k.has(x), '7 hari terakhir harus ada: ' + x));
    ya(k.has('terkini')); eq([...k].filter(x => x.startsWith('pra-pulih')).length, 3); ya(!k.has('pra-pulih-2026-11-01'), 'label tertua dibuang');
  });

  /* ---------- nada ---------- */
  await T('soal nada: 4 pilihan unik, jawaban benar ada, pasangan tertukar dijamin muncul', () => {
    const lama = S.adapt.tc; S.adapt.tc = [[0, 0, 0, 0, 0], [0, 0, 6, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
    try { for (let i = 0; i < 100; i++) { const p = tonePatterns([2, 4]).map(x => x.join('')); eq(new Set(p).size, 4); ya(p.includes('24'), 'jawaban benar hilang'); ya(p.includes('34'), 'pengecoh 2→3 tidak muncul'); } }
    finally { S.adapt.tc = lama; }
  });
  await T('garis nada: satu bentuk per suku kata', () => { const s = PK.toneSvg([3, 5, 1]); eq((s.match(/<path/g) || []).length, 2); eq((s.match(/<circle/g) || []).length, 1); eq(PK.toneSvg([]), ''); });

  /* ---------- kelelahan ---------- */
  await T('kelelahan: kata baru ditunda, lalu sesi dipendekkan jadi 3 soal', () => {
    const lamaSES = SES, lamaPace = S.settings.pace, lamaN = S.adapt.fatN; S.settings.pace = 'on';
    try {
      const items = [{ type: 'mc_mean', wid: 1 }, { type: 'mc_mean', wid: 2 }, { type: 'intro', wid: 30, isNew: true }, { type: 'mc_mean', wid: 30, isNew: true }];
      for (let i = 3; i < 12; i++) items.push({ type: 'mc_mean', wid: i });
      SES = { items, i: 0, opts: { rebuild: () => [] }, combo: 0 };
      for (let k = 0; k < 16; k++) { PK.last = { type: 'mc_mean', ok: false, ms: 9000, z: 2.2, n: 40, at: Date.now() }; PK.fatigue(false, items[0], { ms: 9000, r: 0.95 }); }
      ya(!SES.items.some(x => x.isNew), 'kata baru masih ada'); eq(SES.items.length - 1, 3, 'sisa soal'); eq(SES.fat.lvl, 2);
    } finally { SES = lamaSES; S.settings.pace = lamaPace; S.adapt.fatN = lamaN; }
  });
  await T('kelelahan: jawaban lancar tidak mengubah sesi', () => {
    const lamaSES = SES;
    try {
      const items = []; for (let i = 0; i < 12; i++) items.push({ type: 'mc_mean', wid: i, isNew: i % 3 === 0 });
      SES = { items, i: 0, opts: { rebuild: () => [] }, combo: 0 };
      for (let k = 0; k < 30; k++) { PK.last = { type: 'mc_mean', ok: true, ms: 1500, z: -0.2, n: 40, at: Date.now() }; PK.fatigue(true, items[0], { ms: 1500, r: 0.95 }); }
      eq(SES.items.length, 12); eq(SES.fat.lvl, 0);
    } finally { SES = lamaSES; }
  });

  /* ---------- karantina ---------- */
  await T('karantina: data rusak disalin, bukan dibuang', () => {
    const lamaQ = window.__xbQuarantine, lamaLock = SAVE_LOCK;
    try { quarantineState('{"rusak', 'uji'); const q = window.__xbQuarantine; ya(q && q.key.startsWith('xiaobu.karantina.'), 'kunci karantina'); eq(localStorage.getItem(q.key), '{"rusak'); localStorage.removeItem(q.key); }
    finally { window.__xbQuarantine = lamaQ; SAVE_LOCK = lamaLock; }
  });

  /* ---------- rencana & sesi ---------- */
  await T('rencana harian: kata baru 0–40', () => { const p = planToday(); ya(p && p.new >= 0 && p.new <= 40, 'new = ' + (p && p.new)); });
  await T('sesi pintar: bisa disusun, dibuka, dan ditutup', async () => {
    const items = buildSmart(); ya(Array.isArray(items) && items.length > 0, 'sesi kosong');
    startSession(items, { rebuild: () => buildSmart() }); await sl(250); ya(SES && document.getElementById('session'), 'sesi tidak terbuka');
    endSession(true, true); await sl(100); ya(!SES && !document.getElementById('session'), 'sesi tidak tertutup');
  });

  /* ---------- semua halaman ---------- */
  // Dari baris perintah (uji.mjs → ?cli=1) browser tanpa jendela tidak menggambar frame,
  // jadi transisi antar halaman tidak pernah selesai di sana: dimatikan khusus untuk jalur itu.
  if (/[?&]cli=1/.test(location.search)) PK.noVT = true;
  for (const r of ROUTES.map(x => x[0])) {
    await T('halaman terbuka: ' + r, async () => {
      go(r); for (let k = 0; k < 25 && ROUTE !== r; k++) await sl(100); await sl(280);
      const m = document.querySelector('#main'); eq(ROUTE, r, 'rute'); ya(m && m.innerText.length > 40, 'halaman kosong'); ya(!m.innerText.includes('Halaman gagal dimuat'), 'halaman gagal dimuat');
    });
  }

  const gagal = res.filter(x => !x.ok);
  sum.textContent = gagal.length ? `${gagal.length} dari ${res.length} uji GAGAL` : `Semua ${res.length} uji lolos`;
  sum.style.color = gagal.length ? '#c73b55' : '#1b8560';
  window.__tes = { ok: res.length - gagal.length, gagal: gagal.length, daftar: res };
})();
