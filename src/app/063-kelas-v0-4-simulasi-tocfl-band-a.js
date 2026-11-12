/* ========== Kelas V0.4: Simulasi TOCFL Band A (聽力 + 閱讀) ==========
   Format mengikuti brosur resmi TOCFL Band A: Listening 50 soal (4 bagian, ±60 menit),
   Reading 50 soal (5 bagian, 45 pilihan ganda + 5 mencocokkan, 60 menit), skala skor 0–80,
   batas Level 1 = 42 (L) / 41 (R), Level 2 = 60. Soal orisinal, bukan soal resmi. */
const TF_CUT = { L: [42, 60], R: [41, 60] };
const TF_PARTS = {
  L: [
    { p: 1, zh: '第一部分：看圖辨義', id: 'Deskripsi gambar', en: 'Picture description', tl: 'Paglalarawan ng larawan', vi: 'Mô tả tranh', how: { id: 'Lihat gambar, dengarkan 3 kalimat (A, B, C). Pilih kalimat yang sesuai dengan gambar.', en: 'Look at the picture and listen to 3 sentences (A, B, C). Choose the one that matches the picture.', tl: 'Tingnan ang larawan at pakinggan ang 3 pangungusap (A, B, C). Piliin ang tugma sa larawan.', vi: 'Nhìn tranh, nghe 3 câu (A, B, C). Chọn câu đúng với tranh.' } },
    { p: 2, zh: '第二部分：單輪對話', id: 'Dialog satu putaran', en: 'Single-round dialogue', tl: 'Isang-palitang diyalogo', vi: 'Hội thoại một lượt', how: { id: 'Dengarkan dialog pendek dan pertanyaannya. Pilih gambar yang benar (A, B, C).', en: 'Listen to a short dialogue and the question. Choose the correct picture (A, B, C).', tl: 'Pakinggan ang maikling diyalogo at tanong. Piliin ang tamang larawan (A, B, C).', vi: 'Nghe đoạn hội thoại ngắn và câu hỏi. Chọn tranh đúng (A, B, C).' } },
    { p: 3, zh: '第三部分：多輪對話', id: 'Dialog beberapa putaran', en: 'Multiple-round dialogue', tl: 'Maramihang-palitang diyalogo', vi: 'Hội thoại nhiều lượt', how: { id: 'Dialog lebih panjang. Perhatikan perubahan rencana & detail. Pilih gambar yang benar.', en: 'Longer dialogues. Watch for changes of plan and details. Choose the correct picture.', tl: 'Mas mahabang diyalogo. Bantayan ang pagbabago ng plano at detalye. Piliin ang tamang larawan.', vi: 'Hội thoại dài hơn. Chú ý thay đổi kế hoạch và chi tiết. Chọn tranh đúng.' } },
    { p: 4, zh: '第四部分：對話（文字選項）', id: 'Dialog (pilihan teks)', en: 'Dialogue (text options)', tl: 'Diyalogo (tekstong pagpipilian)', vi: 'Hội thoại (đáp án chữ)', how: { id: 'Dengarkan dialog dan pertanyaan. Baca 4 pilihan jawaban, pilih yang benar.', en: 'Listen to the dialogue and question. Read the 4 options and choose the correct one.', tl: 'Pakinggan ang diyalogo at tanong. Basahin ang 4 na pagpipilian at piliin ang tama.', vi: 'Nghe hội thoại và câu hỏi. Đọc 4 đáp án và chọn câu đúng.' } }
  ],
  R: [
    { p: 1, zh: '第一部分：單句理解', id: 'Pemahaman kalimat', en: 'Sentence comprehension', tl: 'Pag-unawa sa pangungusap', vi: 'Hiểu câu', how: { id: 'Baca kalimatnya, pilih gambar yang sesuai (A, B, C).', en: 'Read the sentence and choose the matching picture (A, B, C).', tl: 'Basahin ang pangungusap at piliin ang tugmang larawan.', vi: 'Đọc câu, chọn tranh phù hợp (A, B, C).' } },
    { p: 2, zh: '第二部分：看圖填詞', id: 'Deskripsi gambar', en: 'Picture description', tl: 'Paglalarawan ng larawan', vi: 'Mô tả tranh', how: { id: 'Lihat gambar, pilih kata untuk mengisi kalimat agar sesuai gambar.', en: 'Look at the picture and choose the word that completes the sentence to match it.', tl: 'Tingnan ang larawan at piliin ang salitang bubuo sa pangungusap.', vi: 'Nhìn tranh, chọn từ điền vào câu cho đúng với tranh.' } },
    { p: 3, zh: '第三部分：選詞填空', id: 'Isian', en: 'Gap filling', tl: 'Pagpuno ng patlang', vi: 'Điền từ', how: { id: 'Pilih kata yang paling tepat untuk mengisi bagian kosong.', en: 'Choose the best word for the blank.', tl: 'Piliin ang pinakaangkop na salita para sa patlang.', vi: 'Chọn từ thích hợp nhất điền vào chỗ trống.' } },
    { p: 4, zh: '第四部分：完成段落', id: 'Melengkapi paragraf', en: 'Paragraph completion', tl: 'Pagbuo ng talata', vi: 'Hoàn thành đoạn văn', how: { id: 'Bacaan dengan 5 bagian kosong. Pilih kata dari kotak kata (A–F); tiap kata dipakai sekali, satu kata tidak dipakai.', en: 'A passage with 5 blanks. Choose words from the word bank (A–F); each used once, one is not used.', tl: 'Talatang may 5 patlang. Pumili sa word bank (A–F); isang beses lang bawat salita, may isang hindi gagamitin.', vi: 'Đoạn văn có 5 chỗ trống. Chọn từ trong khung (A–F); mỗi từ dùng một lần, một từ thừa.' } },
    { p: 5, zh: '第五部分：閱讀理解', id: 'Pemahaman bacaan', en: 'Reading comprehension', tl: 'Pag-unawa sa binasa', vi: 'Đọc hiểu', how: { id: 'Baca pengumuman, menu, pesan, jadwal, atau buku harian, lalu jawab 3 pertanyaan.', en: 'Read notices, menus, messages, schedules or diaries, then answer 3 questions each.', tl: 'Basahin ang paunawa, menu, mensahe, iskedyul o diary, saka sagutin ang 3 tanong.', vi: 'Đọc thông báo, thực đơn, tin nhắn, lịch trình hoặc nhật ký, rồi trả lời 3 câu hỏi.' } }
  ]
};
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
let TFD = null; let TF_BUSY = false;
function loadTF(cb) {
  if (window.TF_FORMS) { TFD = { icons: window.TF_ICONS, forms: window.TF_FORMS }; return cb && cb(); }
  if (TF_BUSY) return; TF_BUSY = true;
  const s = document.createElement('script'); s.src = 'tocfl.js?v=k170'; s.async = true;
  s.onload = () => { TF_BUSY = false; TFD = { icons: window.TF_ICONS, forms: window.TF_FORMS }; if (cb) cb(); };
  s.onerror = () => { TF_BUSY = false; s.remove(); toast(t('Soal TOCFL belum bisa dimuat — cek koneksi, lalu coba lagi.')); };
  document.head.appendChild(s);
}
function tfState() { const k = klState(); if (!Array.isArray(k.tf)) k.tf = []; return k.tf; }

/* ---------- gambar soal: latar + ikon + label ---------- */
const TF_BG = {
  none: '<rect width="160" height="120" class="bg-n"/>',
  home: '<rect width="160" height="120" class="bg-home"/><rect y="92" width="160" height="28" class="bg-floor"/><rect x="118" y="14" width="30" height="26" rx="3" class="bg-win"/><path d="M133 14v26M118 27h30" class="bg-line"/>',
  street: '<rect width="160" height="120" class="bg-sky"/><rect y="88" width="160" height="32" class="bg-road"/><path d="M8 104h18M40 104h18M72 104h18M104 104h18M136 104h18" class="bg-dash"/><circle cx="20" cy="18" r="8" class="bg-cloud"/><circle cx="30" cy="16" r="10" class="bg-cloud"/>',
  school: '<rect width="160" height="120" class="bg-school"/><rect x="10" y="10" width="44" height="26" rx="3" class="bg-board"/><rect y="96" width="160" height="24" class="bg-floor"/>',
  shop: '<rect width="160" height="120" class="bg-shop"/><path d="M0 30h160M0 62h160" class="bg-shelf"/><rect y="98" width="160" height="22" class="bg-floor"/>',
  park: '<rect width="160" height="120" class="bg-sky"/><rect y="86" width="160" height="34" class="bg-grass"/><circle cx="138" cy="18" r="9" class="bg-sun"/><circle cx="24" cy="20" r="8" class="bg-cloud"/><circle cx="34" cy="18" r="10" class="bg-cloud"/>',
  rain: '<rect width="160" height="120" class="bg-rainsky"/><path d="M12 8l-5 12M38 14l-5 12M70 6l-5 12M104 12l-5 12M140 8l-5 12M24 60l-5 12M150 52l-5 12M8 96l-5 12M154 94l-5 12" class="bg-drop"/>',
  night: '<rect width="160" height="120" class="bg-night"/><circle cx="136" cy="18" r="9" class="bg-moon"/><circle cx="18" cy="16" r="1.6" class="bg-star"/><circle cx="44" cy="10" r="1.3" class="bg-star"/><circle cx="96" cy="20" r="1.4" class="bg-star"/><circle cx="150" cy="44" r="1.2" class="bg-star"/>',
  sea: '<rect width="160" height="120" class="bg-sky"/><rect y="80" width="160" height="40" class="bg-sea"/><path d="M0 86q10-6 20 0t20 0 20 0 20 0 20 0 20 0 20 0 20 0" class="bg-wave"/><circle cx="138" cy="18" r="9" class="bg-sun"/>',
  office: '<rect width="160" height="120" class="bg-office"/><rect x="112" y="10" width="38" height="30" rx="2" class="bg-win"/><path d="M131 10v30M112 25h38" class="bg-line"/><rect y="96" width="160" height="24" class="bg-floor"/>',
  hospital: '<rect width="160" height="120" class="bg-hosp"/><rect x="128" y="10" width="22" height="22" rx="4" class="bg-crossbg"/><path d="M139 14v14M132 21h14" class="bg-cross"/><rect y="96" width="160" height="24" class="bg-floor"/>'
};
function tfPic(spec, cls = '') {
  if (!spec || !TFD) return '';
  const ic = (spec.i || []).slice(0, 3).filter(n => TFD.icons[n]); const n = ic.length;
  const place = n === 1 ? [[34, 16, 92]] : n === 2 ? [[6, 24, 76], [78, 24, 76]] : [[2, 34, 58], [51, 34, 58], [100, 34, 58]];
  const icons = ic.map((name, k) => { const [x, y, s] = place[k]; return `<svg x="${x}" y="${y}" width="${s}" height="${s}" viewBox="0 0 96 96">${TFD.icons[name]}</svg>`; }).join('');
  const b = spec.b ? String(spec.b).slice(0, 9) : '';
  const bw = b.length * 12.4 + 16; const badge = b ? `<g class="tf-badge"><rect x="${154 - bw}" y="5" width="${bw}" height="32" rx="10"/><text x="${154 - bw / 2}" y="28" text-anchor="middle">${esc(b)}</text></g>` : '';
  return `<svg class="tfp ${cls}" viewBox="0 0 160 120" role="img" aria-label="${esc((spec.i || []).join(', ') + (b ? ' ' + b : ''))}">${TF_BG[spec.bg] || TF_BG.none}${icons}${badge}</svg>`;
}

/* ---------- suara: narator + pria + wanita ---------- */
const TFA = { run: 0, playing: false, ctx: null };
function tfVoices() {
  let vs = []; try { vs = speechSynthesis.getVoices().filter(v => /^zh|^cmn/i.test(v.lang) && !/HK|yue/i.test(v.lang + v.name)); } catch (e) {}
  const tw = vs.filter(v => /TW|Hant/i.test(v.lang)); const pool = tw.length ? tw : vs;
  const fem = pool.find(v => /Mei-?Jia|Yating|HsiaoChen|HsiaoYu|Hanhan|female|女/i.test(v.name)) || pool[0] || null;
  const male = pool.find(v => /Zhiwei|Yunjhe|Kangkang|Yunxi|male|男/i.test(v.name) && v !== fem) || null;
  const nar = TTS.voice || fem;
  return { nar, F: fem || nar, M: male || fem || nar, sameMF: !male };
}
function tfBeep(kind = 'q') {
  try {
    if (!TFA.ctx) TFA.ctx = new (window.AudioContext || window.webkitAudioContext)();
    const c = TFA.ctx; const o = c.createOscillator(); const g = c.createGain(); o.connect(g); g.connect(c.destination);
    o.frequency.value = kind === 'end' ? 523 : 880; o.type = 'sine'; g.gain.setValueAtTime(0.0001, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.18, c.currentTime + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + (kind === 'end' ? 0.6 : 0.35));
    o.start(); o.stop(c.currentTime + 0.65);
  } catch (e) {}
}
/* memutar daftar ucapan berurutan; who = 'N' | 'M' | 'F'; jeda dalam ms */
function tfPlay(seq, onDone, onStep) {
  const run = ++TFA.run; TFA.playing = true; const V = tfVoices(); let j = 0;
  try { speechSynthesis.cancel(); } catch (e) {}
  const next = () => {
    if (run !== TFA.run) return;
    if (j >= seq.length) { TFA.playing = false; if (onDone) onDone(); return; }
    const s = seq[j++]; if (onStep) onStep(s, j - 1);
    if (s.pause) return setTimeout(next, s.pause);
    if (s.beep) { tfBeep(s.beep); return setTimeout(next, 650); }
    if (!TTS.ok) return setTimeout(next, 900);
    const u = new SpeechSynthesisUtterance(String(s.zh).replace(/[()（）＿]/g, '').replace(/\n/g, '，'));
    const v = V[s.who] || V.nar; u.lang = v ? v.lang : 'zh-TW'; try { if (v) u.voice = v; } catch (e) {}
    u.rate = s.who === 'N' ? 0.92 : (S.settings.tfRate || 0.88);
    u.pitch = V.sameMF ? (s.who === 'M' ? 0.72 : s.who === 'F' ? 1.22 : 1) : 1;
    let done = false; const fin = () => { if (done) return; done = true; clearTimeout(dog); if (run === TFA.run) setTimeout(next, s.gap || 420); };
    u.onend = fin; u.onerror = fin; TFA.u = u;
    const dog = setTimeout(fin, 2500 + String(s.zh).length * 420);
    try { if (speechSynthesis.paused) speechSynthesis.resume(); speechSynthesis.speak(u); } catch (e) { fin(); }
  };
  next();
}
function tfStop() { TFA.run++; TFA.playing = false; try { speechSynthesis.cancel(); } catch (e) {} }

/* ---------- menyusun ujian ---------- */
function tfShuffleOpts(opts, a) { const idx = shuffle(opts.map((_, k) => k)); return { opts: idx.map(k => opts[k]), a: idx.indexOf(a) }; }
function tfBuild(formN, sec) {
  const F = TFD.forms.find(f => f.form === formN) || TFD.forms[0]; const out = [];
  F[sec].forEach(part => part.items.forEach((it, k) => {
    const p = part.p; const base = { sec, p, k, form: F.form, src: it };
    if (sec === 'L') {
      if (p === 1) { const s = tfShuffleOpts(it.opts, it.a); out.push(Object.assign(base, { type: 'L1', pic: it.pic, opts: s.opts, a: s.a })); }
      else if (p === 4) { const s = tfShuffleOpts(it.opts, it.a); out.push(Object.assign(base, { type: 'Ltxt', dlg: it.dlg, q: it.q, opts: s.opts, a: s.a })); }
      else { const s = tfShuffleOpts(it.opts, it.a); out.push(Object.assign(base, { type: 'Lpic', dlg: it.dlg, q: it.q, opts: s.opts, a: s.a })); }
    } else {
      if (p === 1) { const s = tfShuffleOpts(it.opts, it.a); out.push(Object.assign(base, { type: 'Rpic', opts: s.opts, a: s.a })); }
      else if (p === 2 || p === 3) { const s = tfShuffleOpts(it.opts, it.a); out.push(Object.assign(base, { type: 'Rfill', pic: it.pic, opts: s.opts, a: s.a })); }
      else if (p === 4) { it.ans.forEach((ai, b) => out.push(Object.assign({}, base, { type: 'Rmatch', blank: b, opts: it.bank, a: ai }))); }
      else if (p === 5) { it.qs.forEach((q, b) => { const s = tfShuffleOpts(q.opts, q.a); out.push(Object.assign({}, base, { type: 'Rcomp', qi: b, q, opts: s.opts, a: s.a })); }); }
    }
  }));
  out.forEach((q, n) => { q.n = n + 1; q.user = null; q.flag = false; });
  return out;
}
let TF = null;
function tfSeq(q, twice) {
  const one = [];
  if (q.type === 'L1') q.opts.forEach((o, k) => one.push({ who: 'N', zh: LETTERS[k] + '。', gap: 250 }, { who: k % 2 ? 'F' : 'M', zh: o.zh, gap: 650 }));
  else { q.dlg.forEach(l => one.push({ who: l.sp === 'M' ? 'M' : 'F', zh: l.zh, gap: 380 })); one.push({ pause: 250 }, { who: 'N', zh: '問：' + q.q.zh, gap: 500 }); if (q.type === 'Ltxt') {} }
  const head = [{ beep: 'q' }, { who: 'N', zh: '第' + numZh(q.n) + '題。', gap: 350 }];
  return twice ? head.concat(one, [{ pause: 1300 }], one) : head.concat(one);
}

/* ---------- layar ujian ---------- */
function tfShell() {
  const secName = TF.sec === 'L' ? '聽力測驗' : '閱讀測驗';
  return `<div class="tf-top"><div class="tf-brand"><span class="tf-logo">TOCFL</span><div><b>華語文能力測驗 · ${secName}</b><small>Band A · ${t('Simulasi')} ${TF.form ? 'Form ' + TF.form : ''} · ${TF.mode === 'exam' ? t('Mode ujian') : t('Mode latihan')}</small></div></div>
    <div class="tf-meta"><span class="tf-cnt" id="tfcnt"></span><span class="tf-timer" id="tftime">--:--</span><button class="tf-x" data-t="quit" aria-label="${t('Keluar')}">✕</button></div></div>
    <div class="tf-prog"><i id="tfbar"></i></div><div class="tf-body" id="tfbody"></div><div class="tf-foot" id="tffoot"></div>`;
}
function tfOpen(cfg) {
  loadTF(() => {
    const sec = cfg.sec === 'full' ? 'L' : cfg.sec; const form = cfg.form === 'mix' ? pick(TFD.forms).form : cfg.form;
    TF = { cfg, form, sec, mode: cfg.mode, qs: tfBuild(form, sec), i: 0, phase: 'cover', t0: 0, deadline: 0, results: [], twice: cfg.twice !== false };
    hushAll(); closeModal(); tfStop();
    let el = $('#tf'); if (el) el.remove();
    el = document.createElement('div'); el.id = 'tf'; el.className = 'tf'; el.innerHTML = tfShell(); document.body.appendChild(el); document.body.classList.add('in-session');
    el.addEventListener('click', tfClick);
    tfCover();
  });
}
function tfSetHead() {
  const c = $('#tfcnt'); if (c) c.textContent = TF.phase === 'q' ? `${t('Soal')} ${TF.i + 1} / ${TF.qs.length}` : '';
  const b = $('#tfbar'); if (b) b.style.width = (TF.phase === 'q' ? (TF.i / TF.qs.length * 100) : TF.phase === 'end' ? 100 : 0) + '%';
}
function tfCover() {
  TF.phase = 'cover'; tfSetHead(); const L = TF.sec === 'L';
  $('#tfbody').innerHTML = `<div class="tf-cover tf-in"><div class="tf-seal">${ICON(L ? 'headphone' : 'book')}</div>
    <div class="tf-kicker">TOCFL · Band A · ${L ? 'Listening' : 'Reading'}</div><h1>${L ? '聽力測驗' : '閱讀測驗'}</h1>
    <div class="tf-facts"><div><b>50</b><span>${t('soal')}</span></div><div><b>${L ? '±40' : '60'}</b><span>${t('menit')}</span></div><div><b>${L ? 4 : 5}</b><span>${t('bagian')}</span></div><div><b>0–80</b><span>${t('skala skor')}</span></div></div>
    <ol class="tf-rules">${(L ? [
      t('Setiap soal didahului bunyi "ding" dan nomor soal, lalu audio diputar') + ' ' + (TF.twice ? t('dua kali') : t('satu kali')) + '.',
      t('Tidak bisa mundur atau memutar ulang (seperti ujian asli). Pilih jawaban sebelum waktu soal habis.'),
      t('Gunakan headset/earphone dan cari tempat tenang. Naikkan volume sekarang.')
    ] : [
      t('Waktu 60 menit untuk 50 soal. Kamu bebas pindah soal, menandai, dan mengubah jawaban.'),
      t('Bagian 4 memakai kotak kata A–F; bagian 5 berisi 5 bacaan dengan 3 pertanyaan masing-masing.'),
      t('Klik 交卷 untuk mengumpulkan. Jika waktu habis, jawaban otomatis dikumpulkan.')
    ]).map(x => `<li>${x}</li>`).join('')}</ol>
    ${L ? `<div class="tf-sound"><button class="btn sec" data-t="soundtest">${ICON('speaker')} ${t('Tes suara')}</button><span class="small muted" id="tfvoice">${tfVoiceInfo()}</span></div>` : ''}
    ${TF.mode === 'practice' ? `<p class="small muted">${t('Mode latihan: jawaban & pembahasan muncul setelah setiap soal, audio bisa diputar ulang.')}</p>` : ''}
    <button class="btn pri big tf-start" data-t="start">${t('Mulai')} ${ICON('chevron')}</button></div>`;
  $('#tffoot').innerHTML = '';
}
function tfVoiceInfo() {
  const V = tfVoices(); if (!V.nar) return t('Suara Mandarin tidak ditemukan di perangkat ini — soal listening tidak akan terdengar. Pasang suara 中文(台灣) di pengaturan perangkat.');
  return `${t('Suara')}: ${esc(V.nar.name)}${V.sameMF ? ' · ' + t('pria/wanita dibedakan dengan nada') : ''}`;
}
function tfCountdown(cb) {
  let n = 3; const body = $('#tfbody');
  const tick = () => { if (!TF) return; if (n === 0) return cb(); body.innerHTML = `<div class="tf-count"><b>${n}</b><span>${TF.sec === 'L' ? t('Siapkan telingamu…') : t('Siapkan matamu…')}</span></div>`; tfBeep(n === 1 ? 'end' : 'q'); n--; setTimeout(tick, 850); };
  tick();
}
function tfStart() {
  tfCountdown(() => {
    TF.t0 = Date.now(); TF.deadline = TF.sec === 'R' ? Date.now() + 60 * 60000 : 0; TF.i = 0;
    clearInterval(TF.tick); TF.tick = setInterval(tfClock, 500); tfClock();
    tfPartIntro(TF.qs[0].p, () => tfShow(0));
  });
}
function tfClock() {
  if (!TF) return; const el = $('#tftime'); if (!el) return;
  if (TF.sec === 'R') { const left = TF.deadline - Date.now(); el.textContent = fmtClock(left); el.classList.toggle('warn', left < 5 * 60000); if (left <= 0 && TF.phase === 'q') tfSubmit(true); }
  else el.textContent = fmtClock(Date.now() - TF.t0);
}
function tfPartIntro(p, cb) {
  const P = TF_PARTS[TF.sec].find(x => x.p === p); TF.phase = 'part'; tfSetHead(); tfStop();
  const cnt = TF.qs.filter(q => q.p === p).length; const from = TF.qs.find(q => q.p === p).n;
  $('#tfbody').innerHTML = `<div class="tf-part tf-in"><div class="tf-pnum">${p}</div><h2>${P.zh}</h2><div class="tf-psub">${esc(kx(P))} · ${t('Soal {a}–{b}', { a: from, b: from + cnt - 1 })}</div><p>${esc(kx(P.how))}</p>
    ${TF.sec === 'L' && TF.mode === 'exam' ? `<div class="tf-auto"><i></i></div><small class="muted">${t('Mulai otomatis…')}</small>` : `<button class="btn pri" data-t="partgo">${t('Mulai bagian ini')} ${ICON('chevron')}</button>`}</div>`;
  $('#tffoot').innerHTML = '';
  TF.partCb = cb;
  if (TF.sec === 'L' && TF.mode === 'exam') { clearTimeout(TF.pt); TF.pt = setTimeout(() => { if (TF && TF.phase === 'part') { TF.partCb = null; cb(); } }, 6500); }
}
function tfOptsHTML(q, review) {
  const sel = q.user; const pics = q.type === 'Lpic' || q.type === 'Rpic';
  const letterOnly = q.type === 'L1';
  return `<div class="tf-opts ${pics ? 'pics' : ''} ${letterOnly ? 'letters' : ''} ${q.type === 'Rmatch' ? 'bank' : ''}">${q.opts.map((o, k) => {
    const st = review ? (k === q.a ? 'ok' : k === sel ? 'bad' : '') : (k === sel ? 'on' : '');
    const body = pics ? tfPic(o) : letterOnly ? (review ? `<span class="hz">${esc(o.zh)}</span>` : '') : `<span class="hz">${esc(typeof o === 'string' ? o : o.zh)}</span>`;
    return `<button class="tf-opt ${st}" data-t="pick" data-v="${k}" style="--d:${k * 60}ms" ${review ? 'disabled' : ''}><span class="tf-let">${LETTERS[k]}</span>${body}</button>`; }).join('')}</div>`;
}
function tfStem(q) {
  const s = q.src;
  if (q.type === 'L1') return `<div class="tf-stem">${tfPic(q.pic, 'big')}</div>`;
  if (q.type === 'Lpic' || q.type === 'Ltxt') return `<div class="tf-stem"><div class="tf-wave ${TFA.playing ? 'on' : ''}" id="tfwave">${'<i></i>'.repeat(18)}</div><div class="tf-ask">${t('Dengarkan dialog dan pertanyaannya.')}</div></div>`;
  if (q.type === 'Rpic') return `<div class="tf-stem"><div class="tf-sent hz">${esc(s.zh)}</div></div>`;
  if (q.type === 'Rfill') return `<div class="tf-stem">${q.pic ? tfPic(q.pic, 'mid') : ''}<div class="tf-sent hz">${esc(s.zh).replace(/＿+|_{2,}/, '<span class="tf-blank">（　　）</span>')}</div></div>`;
  if (q.type === 'Rmatch') {
    const txt = esc(s.zh).replace(/（(\d)）/g, (m, d) => `<span class="tf-gap ${+d - 1 === q.blank ? 'cur' : ''}">(${d})${TF.qs.find(x => x.src === s && x.blank === +d - 1 && x.user !== null) ? ' ' + LETTERS[TF.qs.find(x => x.src === s && x.blank === +d - 1).user] : ''}</span>`);
    return `<div class="tf-stem tf-split"><div class="tf-pass hz">${txt}</div><div class="tf-bankbox"><b>${t('Kotak kata')}</b>${s.bank.map((w, k) => `<span><i>${LETTERS[k]}</i><span class="hz">${esc(w)}</span></span>`).join('')}</div></div><div class="tf-qline">${t('Bagian kosong ({n}) diisi dengan…', { n: q.blank + 1 })}</div>`;
  }
  if (q.type === 'Rcomp') return `<div class="tf-stem tf-split"><div class="tf-doc ${s.kind}"><div class="tf-doc-h">${esc(s.title || '')}</div><div class="tf-doc-b hz">${esc(s.zh).replace(/\n/g, '<br>')}</div></div><div class="tf-qline hz">${q.qi + 1}. ${esc(q.q.zh)}</div></div>`;
  return '';
}
function tfShow(i) {
  if (!TF) return; TF.i = i; TF.phase = 'q'; tfSetHead(); tfStop(); clearTimeout(TF.at); clearInterval(TF.ai);
  const q = TF.qs[i]; const prevP = i > 0 ? TF.qs[i - 1].p : null;
  if (prevP !== null && prevP !== q.p && !TF.introDone?.[q.sec + q.p]) { TF.introDone = TF.introDone || {}; TF.introDone[q.sec + q.p] = 1; return tfPartIntro(q.p, () => tfShow(i)); }
  TF.introDone = TF.introDone || {}; TF.introDone[q.sec + q.p] = 1;
  const L = TF.sec === 'L';
  $('#tfbody').innerHTML = `<div class="tf-q tf-slide"><div class="tf-qh"><span class="tf-qn">${q.n}</span><span class="tf-qp">${TF_PARTS[TF.sec].find(x => x.p === q.p).zh}</span>${!L ? `<button class="tf-flag ${q.flag ? 'on' : ''}" data-t="flag">⚑ ${t('Tandai')}</button>` : ''}</div>
    ${tfStem(q)}${tfOptsHTML(q, false)}${L ? `<div class="tf-answin"><div class="tf-ring" id="tfring"><i></i></div><span id="tfstate">${t('Mendengarkan…')}</span></div>` : ''}<div id="tffb"></div></div>`;
  tfFoot();
  if (L) tfListen(q);
}
function tfFoot() {
  const L = TF.sec === 'L'; const q = TF.qs[TF.i];
  if (L) { $('#tffoot').innerHTML = TF.mode === 'practice' ? `<button class="btn sec" data-t="replay">${ICON('refresh')} ${t('Putar ulang')}</button><span class="grow"></span><button class="btn pri" data-t="next">${TF.i === TF.qs.length - 1 ? t('Selesai') : t('Soal berikutnya')} ${ICON('chevron')}</button>` : `<span class="small muted">${t('Ujian listening berjalan otomatis — tidak bisa mundur.')}</span><span class="grow"></span><button class="btn ghost small" data-t="next">${t('Lewati')} ›</button>`; return; }
  const ans = TF.qs.filter(x => x.user !== null).length;
  $('#tffoot').innerHTML = `<button class="btn sec tf-nav" data-t="prev" aria-label="${t('Sebelumnya')}" ${TF.i === 0 ? 'disabled' : ''}>‹<span class="tf-lbl"> ${t('Sebelumnya')}</span></button><button class="btn sec tf-gridbtn" data-t="grid">${ICON('grid')} ${ans}/${TF.qs.length}</button><span class="grow"></span>${TF.i < TF.qs.length - 1 ? `<button class="btn pri tf-nav" data-t="next" aria-label="${t('Berikutnya')}"><span class="tf-lbl">${t('Berikutnya')} </span>›</button>` : ''}<button class="btn ${TF.i === TF.qs.length - 1 ? 'pri' : 'sec'} tf-submit" data-t="submit">交卷<span class="tf-lbl"> · ${t('Kumpulkan')}</span></button>`;
}
/* listening: putar audio → jendela jawab → otomatis lanjut */
function tfListen(q) {
  const wave = () => $('#tfwave'); const st = $('#tfstate');
  const seq = tfSeq(q, TF.twice);
  if (wave()) wave().classList.add('on');
  tfPlay(seq, () => {
    if (!TF || TF.qs[TF.i] !== q) return; if (wave()) wave().classList.remove('on');
    if (TF.mode === 'practice') { if (st) st.textContent = q.user === null ? t('Pilih jawabanmu') : ''; return; }
    const win = q.type === 'L1' || q.type === 'Lpic' ? 9000 : 12000; const t0 = Date.now(); const ring = $('#tfring');
    if (st) st.textContent = t('Waktu menjawab');
    clearInterval(TF.ai); TF.ai = setInterval(() => { const r = Math.min(1, (Date.now() - t0) / win); if (ring) ring.style.setProperty('--p', r); if (r >= 1) { clearInterval(TF.ai); tfAdvance(); } }, 100);
  }, s => { if (st && s.who === 'N' && /^問/.test(s.zh)) st.textContent = t('Pertanyaan…'); });
}
function tfAdvance() { if (!TF) return; tfStop(); clearInterval(TF.ai); if (TF.i >= TF.qs.length - 1) return tfSubmit(false); tfShow(TF.i + 1); }
function tfPick(k) {
  const q = TF.qs[TF.i]; if (TF.mode === 'practice' && q.done) return;
  q.user = k; FX.play('tap');
  document.querySelectorAll('#tfbody .tf-opt').forEach((b, j) => b.classList.toggle('on', j === k));
  if (TF.mode === 'practice') {
    q.done = true; tfStop(); const ok = k === q.a; FX.play(ok ? 'ok' : 'bad');
    document.querySelectorAll('#tfbody .tf-opt').forEach((b, j) => { b.classList.remove('on'); if (j === q.a) b.classList.add('ok'); else if (j === k) b.classList.add('bad'); b.disabled = true; });
    if (q.type === 'L1') document.querySelectorAll('#tfbody .tf-opt').forEach((b, j) => { if (!b.querySelector('.hz')) b.insertAdjacentHTML('beforeend', `<span class="hz">${esc(q.opts[j].zh)}</span>`); });
    $('#tffb').innerHTML = tfExplain(q, ok);
  } else if (TF.sec === 'R') { tfFoot(); if (q.type === 'Rmatch') { const st = $('#tfbody .tf-gap.cur'); if (st) st.textContent = `(${q.blank + 1}) ${LETTERS[k]}`; } }
}
function tfTranscript(q) {
  const s = q.src;
  if (q.type === 'L1') return q.opts.map((o, k) => `<div class="tf-tl"><b>${LETTERS[k]}</b>${klLine(o.zh, o.py, { nolv: 1 })}</div>`).join('');
  if (q.type === 'Lpic' || q.type === 'Ltxt') return s.dlg.map(l => `<div class="tf-tl ${l.sp}"><b>${l.sp === 'M' ? '男' : '女'}</b>${klLine(l.zh, l.py)}</div>`).join('') + `<div class="tf-tl N"><b>問</b>${klLine(s.q.zh, s.q.py)}</div>`;
  if (q.type === 'Rcomp') return `<div class="tf-tl">${klLine(q.q.zh, q.q.py)}</div>`;
  if (s.py && s.zh && q.type !== 'Rmatch') return `<div class="tf-tl">${klLine(s.zh.replace(/＿+|_{2,}/, q.opts[q.a] && typeof q.opts[q.a] === 'string' ? q.opts[q.a] : '＿'), s.py)}</div>`;
  return '';
}
function tfExplain(q, ok) {
  const s = q.src; const exp = q.type === 'Rcomp' ? q.q.exp : s.exp; const tr = s.tr;
  const say = q.type === 'L1' ? q.opts.map(o => o.zh).join('，') : q.type === 'Lpic' || q.type === 'Ltxt' ? s.dlg.map(l => l.zh).join('') + s.q.zh : '';
  return `<div class="tf-exp ${ok ? 'ok' : 'bad'} tf-in"><div class="tf-exph"><b>${ok ? '✓ ' + t('Benar') : '✗ ' + t('Salah')}</b> · ${t('Jawaban')}: <b>${LETTERS[q.a]}</b>${say ? `<button class="btn ghost small" data-cx="say" data-v="${esc(say)}">${ICON('speaker')}</button>` : ''}</div>
    ${tfTranscript(q)}${tr ? `<div class="small tf-tr">${esc(kx(tr))}</div>` : ''}${exp ? `<div class="gtip">${ICON('lightbulb')}<span>${esc(kx(exp))}</span></div>` : ''}</div>`;
}
function tfGrid() {
  const g = TF.qs.map((q, k) => `<button class="tf-gc ${q.user !== null ? 'ans' : ''} ${q.flag ? 'flag' : ''} ${k === TF.i ? 'cur' : ''}" data-t="go" data-v="${k}">${q.n}</button>`).join('');
  const parts = TF_PARTS.R.map(P => `<span class="small muted">${P.p}: ${P.zh.split('：')[1]}</span>`).join(' · ');
  openModal(`<h2 style="margin:0 0 6px">${t('Ringkasan soal')}</h2><p class="small muted" style="margin:0 0 10px">${parts}</p><div class="tf-grid">${g}</div>
    <div class="row wrap small" style="gap:12px;margin-top:10px"><span><i class="tf-dot ans"></i> ${t('dijawab')}</span><span><i class="tf-dot flag"></i> ${t('ditandai')}</span><span><i class="tf-dot"></i> ${t('belum')}</span></div>`);
}
function tfSubmit(auto) {
  if (!TF || TF.phase === 'end') return;
  const left = TF.qs.filter(q => q.user === null).length;
  if (!auto && TF.sec === 'R' && TF.mode === 'exam' && left && !TF.confirm) { TF.confirm = 1; openModal(`<h2>${t('Kumpulkan sekarang?')}</h2><p>${t('Masih ada {n} soal yang belum dijawab.', { n: left })}</p><div class="row wrap" style="gap:8px"><button class="btn sec" data-a="close">${t('Kembali mengerjakan')}</button><button class="btn pri" data-a="tfsubmitok">交卷 · ${t('Kumpulkan')}</button></div>`); return; }
  closeModal(); tfStop(); clearInterval(TF.tick); clearInterval(TF.ai); clearTimeout(TF.pt);
  TF.phase = 'end'; tfSetHead(); tfBeep('end');
  const res = tfScore(TF.sec, TF.qs); res.ms = Date.now() - TF.t0; res.form = TF.form; res.mode = TF.mode; res.d = todayKey(); res.ts = Date.now();
  TF.results.push({ res, qs: TF.qs, sec: TF.sec });
  tfState().push(res); if (tfState().length > 40) tfState().shift();
  addCat(TF.sec === 'L' ? 'hafal' : 'paham', Math.min(res.ms, 3.6e6)); dayRec().ms += Math.min(res.ms, 3.6e6); TF.xp = (TF.xp || 0) + res.c * 4; save(true);
  if (TF.cfg.sec === 'full' && TF.sec === 'L') return tfBreak();
  tfResult();
}
function tfScore(sec, qs) {
  const c = qs.filter(q => q.user === q.a).length; const n = qs.length;
  const scaled = Math.round(c / n * 80); const [l1, l2] = TF_CUT[sec];
  const parts = {}; qs.forEach(q => { const p = parts[q.p] || (parts[q.p] = [0, 0]); p[1]++; if (q.user === q.a) p[0]++; });
  return { sec, c, n, scaled, level: scaled >= l2 ? 2 : scaled >= l1 ? 1 : 0, parts };
}
function tfBreak() {
  const r = TF.results[0].res; TF.phase = 'break'; $('#tffoot').innerHTML = '';
  $('#tfbody').innerHTML = `<div class="tf-cover tf-in"><div class="tf-seal">${ICON('check')}</div><div class="tf-kicker">${t('Listening selesai')}</div><h1>${t('Istirahat sejenak')}</h1>
    <p>${t('Skor listening sementara')}: <b>${r.scaled}/80</b> (${r.c}/${r.n})</p><p class="small muted">${t('Di ujian asli ada jeda sebelum bagian reading. Minum dulu, lalu lanjut ketika siap.')}</p>
    <button class="btn pri big tf-start" data-t="toR">${t('Lanjut ke Reading')} ${ICON('chevron')}</button></div>`;
}
function tfToReading() {
  TF.sec = 'R'; TF.qs = tfBuild(TF.form, 'R'); TF.i = 0; TF.introDone = {}; TF.confirm = 0;
  $('#tf').innerHTML = tfShell(); tfCover();
}
const LV_NAME = ['Belum mencapai Level 1', 'Level 1 · 入門級 (A1)', 'Level 2 · 基礎級 (A2)'];
function tfResult() {
  TF.phase = 'result'; $('#tffoot').innerHTML = ''; const R = TF.results;
  const lvAll = Math.min(...R.map(x => x.res.level)); const full = R.length === 2;
  const card = x => { const r = x.res; const [l1, l2] = TF_CUT[r.sec];
    return `<div class="tf-sc ${r.sec}"><div class="tf-sch">${r.sec === 'L' ? '聽力 Listening' : '閱讀 Reading'}</div>
      <div class="tf-gauge" style="--p:${r.scaled / 80}"><svg viewBox="0 0 120 70"><path d="M10 64a50 50 0 0 1 100 0" class="g0"/><path d="M10 64a50 50 0 0 1 100 0" class="g1" pathLength="1"/><line x1="${60 + Math.cos(Math.PI * (1 - l1 / 80)) * 50}" y1="${64 - Math.sin(Math.PI * (1 - l1 / 80)) * 50}" x2="${60 + Math.cos(Math.PI * (1 - l1 / 80)) * 58}" y2="${64 - Math.sin(Math.PI * (1 - l1 / 80)) * 58}" class="gm"/><line x1="${60 + Math.cos(Math.PI * (1 - l2 / 80)) * 50}" y1="${64 - Math.sin(Math.PI * (1 - l2 / 80)) * 50}" x2="${60 + Math.cos(Math.PI * (1 - l2 / 80)) * 58}" y2="${64 - Math.sin(Math.PI * (1 - l2 / 80)) * 58}" class="gm"/></svg><b class="tf-num" data-to="${r.scaled}">0</b><small>/ 80</small></div>
      <div class="tf-lv l${r.level}">${t(LV_NAME[r.level])}</div><div class="small muted">${r.c}/${r.n} ${t('benar')} · L1 ≥ ${l1} · L2 ≥ ${l2}</div>
      <div class="tf-pbars">${TF_PARTS[r.sec].map(P => { const p = r.parts[P.p] || [0, 1]; return `<div><span>${P.p}. ${esc(kx(P))}</span><div class="tf-pb"><i style="width:${p[0] / p[1] * 100}%"></i></div><b>${p[0]}/${p[1]}</b></div>`; }).join('')}</div>
      <button class="btn sec small" data-t="review" data-v="${r.sec}">${ICON('search')} ${t('Lihat pembahasan')}</button></div>`; };
  const weak = []; R.forEach(x => TF_PARTS[x.res.sec].forEach(P => { const p = x.res.parts[P.p]; if (p && p[0] / p[1] < .6) weak.push(`${x.res.sec === 'L' ? 'Listening' : 'Reading'} ${P.p} · ${kx(P)}`); }));
  $('#tfbody').innerHTML = `<div class="tf-result tf-in"><div class="tf-cert"><div class="tf-cert-h"><span class="tf-logo">TOCFL</span><div><b>${t('Hasil simulasi')}</b><small>Band A · Form ${TF.form} · ${new Date().toLocaleDateString(LOCALE[S.settings.ui] || 'id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</small></div>
      ${full ? `<div class="tf-stamp l${lvAll}">${lvAll ? 'Level ' + lvAll : '—'}</div>` : ''}</div>
      <div class="tf-scs">${R.map(card).join('')}</div>
      ${weak.length ? `<div class="gtip">${ICON('target')}<span><b>${t('Fokus latihan berikutnya')}:</b> ${esc(weak.join(' · '))}</span></div>` : `<div class="gtip">${ICON('award')}<span>${t('Semua bagian di atas 60% — pertahankan!')}</span></div>`}
      <p class="small muted" style="margin:8px 0 0">${t('Skor 0–80 adalah perkiraan dari persentase jawaban benar. Skor resmi TOCFL dikalibrasi secara statistik, jadi hasil asli bisa sedikit berbeda.')}</p></div>
    <div class="row wrap" style="gap:8px;justify-content:center;margin-top:14px"><button class="btn sec" data-t="quit">${t('Selesai')}</button><button class="btn pri" data-t="again">${ICON('refresh')} ${t('Tes lagi (form lain)')}</button></div></div>`;
  document.querySelectorAll('#tfbody .tf-num').forEach(el => { const to = +el.dataset.to; const t0 = performance.now(); const step = now => { const r = Math.min(1, (now - t0) / 1200); el.textContent = Math.round(to * (1 - Math.pow(1 - r, 3))); if (r < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); });
  if (lvAll >= 1 && full) setTimeout(() => confetti(), 400);
}
function tfReview(sec) {
  const x = TF.results.find(r => r.sec === sec); if (!x) return;
  $('#tfbody').innerHTML = `<div class="tf-rev tf-in"><div class="row" style="gap:8px;align-items:center;margin-bottom:10px"><button class="btn ghost small" data-t="back">‹ ${t('Hasil')}</button><h2 style="margin:0">${sec === 'L' ? '聽力' : '閱讀'} · ${t('Pembahasan')}</h2></div>
    ${x.qs.map(q => `<div class="tf-rq ${q.user === q.a ? 'ok' : 'bad'}"><div class="tf-qh"><span class="tf-qn">${q.n}</span><span class="tf-qp">${TF_PARTS[sec].find(P => P.p === q.p).zh}</span><span class="tf-mark">${q.user === q.a ? '✓' : q.user === null ? '—' : '✗'}</span></div>
      ${q.type === 'Rcomp' && q.qi === 0 || q.type === 'Rmatch' && q.blank === 0 || !['Rcomp', 'Rmatch'].includes(q.type) ? (q.type === 'Lpic' || q.type === 'Ltxt' ? '' : tfStem(q)) : `<div class="tf-qline hz">${q.type === 'Rcomp' ? (q.qi + 1) + '. ' + esc(q.q.zh) : t('Bagian kosong ({n}) diisi dengan…', { n: q.blank + 1 })}</div>`}
      ${tfOptsHTML(q, true)}${tfExplain(q, q.user === q.a)}</div>`).join('')}</div>`;
  $('#tfbody').scrollTop = 0;
}
function tfClose() {
  if (TF) { clearInterval(TF.tick); clearInterval(TF.ai); clearTimeout(TF.pt); if (TF.xp) { const x = TF.xp; TF.xp = 0; setTimeout(() => addXP(x), 400); } }
  tfStop(); TF = null; const el = $('#tf'); if (el) el.remove(); document.body.classList.remove('in-session'); closeModal(); render();
}
function tfClick(e) {
  const b = e.target.closest('[data-t]'); if (!b || !TF) return; const a = b.dataset.t;
  if (a === 'quit') { if (TF.phase === 'q' && !confirm(t('Keluar dari tes? Jawaban yang belum dikumpulkan akan hilang.'))) return; return tfClose(); }
  if (a === 'soundtest') { tfPlay([{ beep: 'q' }, { who: 'N', zh: '第一題。' }, { who: 'M', zh: '請問，捷運站在哪裡？' }, { who: 'F', zh: '在那家便利商店的旁邊。' }]); const v = $('#tfvoice'); if (v) v.innerHTML = tfVoiceInfo(); return; }
  if (a === 'start') return tfStart();
  if (a === 'partgo') { const cb = TF.partCb; TF.partCb = null; if (cb) cb(); return; }
  if (a === 'pick') return tfPick(+b.dataset.v);
  if (a === 'next') { if (TF.sec === 'L') return tfAdvance(); if (TF.i < TF.qs.length - 1) tfShow(TF.i + 1); return; }
  if (a === 'prev') { if (TF.i > 0) tfShow(TF.i - 1); return; }
  if (a === 'replay') { const q = TF.qs[TF.i]; tfStop(); tfListen(q); return; }
  if (a === 'flag') { const q = TF.qs[TF.i]; q.flag = !q.flag; b.classList.toggle('on', q.flag); return; }
  if (a === 'grid') return tfGrid();
  if (a === 'submit') return tfSubmit(false);
  if (a === 'toR') return tfToReading();
  if (a === 'review') return tfReview(b.dataset.v);
  if (a === 'back') return tfResult();
  if (a === 'again') { if (TF.xp) { addXP(TF.xp, true); TF.xp = 0; } const cfg = Object.assign({}, TF.cfg); const used = TF.form; const others = TFD.forms.map(f => f.form).filter(f => f !== used); cfg.form = others.length ? pick(others) : used; tfClose(); return tfOpen(cfg); }
}
document.addEventListener('click', e => { const g = e.target.closest('[data-t="go"]'); if (g && TF) { closeModal(); tfShow(+g.dataset.v); } });
document.addEventListener('keydown', e => {
  if (!TF || TF.phase !== 'q' || $('.overlay')) return;
  const k = e.key.toUpperCase(); const q = TF.qs[TF.i];
  if (/^[1-6]$/.test(e.key) && +e.key <= q.opts.length) { e.preventDefault(); tfPick(+e.key - 1); }
  else if (LETTERS.includes(k) && LETTERS.indexOf(k) < q.opts.length) { e.preventDefault(); tfPick(LETTERS.indexOf(k)); }
  else if (TF.sec === 'R' && e.key === 'ArrowRight' && TF.i < TF.qs.length - 1) tfShow(TF.i + 1);
  else if (TF.sec === 'R' && e.key === 'ArrowLeft' && TF.i > 0) tfShow(TF.i - 1);
});

/* ---------- halaman pengaturan tes ---------- */
function tfHistSVG(list, sec) {
  const pts = list.filter(r => r.sec === sec).slice(-10); if (pts.length < 2) return '';
  const W = 280, H = 90; const x = k => 10 + k * (W - 20) / (pts.length - 1); const y = v => H - 8 - v / 80 * (H - 16);
  const [l1, l2] = TF_CUT[sec];
  return `<svg class="tf-hist" viewBox="0 0 ${W} ${H}"><line x1="0" x2="${W}" y1="${y(l1)}" y2="${y(l1)}" class="h1"/><line x1="0" x2="${W}" y1="${y(l2)}" y2="${y(l2)}" class="h2"/><polyline points="${pts.map((r, k) => x(k) + ',' + y(r.scaled)).join(' ')}" class="hl"/>${pts.map((r, k) => `<circle cx="${x(k)}" cy="${y(r.scaled)}" r="3.5" class="hp"/>`).join('')}</svg>`;
}
function vTocfl() {
  const st = klState(); VK.tf = VK.tf || st.tfCfg || { form: 1, sec: 'full', mode: 'exam', twice: true };
  const c = VK.tf; const hist = tfState(); const best = s => Math.max(0, ...hist.filter(r => r.sec === s && r.mode === 'exam').map(r => r.scaled));
  const lastL = [...hist].reverse().find(r => r.sec === 'L'); const lastR = [...hist].reverse().find(r => r.sec === 'R');
  const seg = (key, arr) => `<div class="seg">${arr.map(([v, l]) => `<button class="${c[key] === v ? 'on' : ''}" data-a="tfset" data-k="${key}" data-v="${v}">${l}</button>`).join('')}</div>`;
  return `<section class="card glass tf-hero"><button class="btn ghost small" data-a="klback">‹ ${t('Kelas')}</button>
      <div class="tf-hero-in"><div><span class="tf-logo big">TOCFL</span><h1>${t('Simulasi Tes TOCFL')}</h1><p class="muted">華語文能力測驗 · Band A (Level 1–2 · A1–A2) — ${t('format, jumlah soal, waktu, dan batas skor mengikuti panduan resmi; soalnya orisinal.')}</p></div>
        <div class="tf-best"><div><small>${t('Listening terbaik')}</small><b>${best('L') || '—'}</b><span>/80</span></div><div><small>${t('Reading terbaik')}</small><b>${best('R') || '—'}</b><span>/80</span></div></div></div></section>
    <section class="card glass"><h2>${t('Format ujian')}</h2><div class="tf-fmt">
      <div class="tf-fcol"><h3>${ICON('headphone')} 聽力 Listening</h3><p class="small muted">50 ${t('soal')} · ±60 ${t('menit')} · 0–80 · L1 ≥ 42 · L2 ≥ 60</p>${TF_PARTS.L.map(P => `<div class="tf-fp"><b>${P.p}</b><span>${P.zh.split('：')[1]}<small>${esc(kx(P))} · ${[10, 15, 15, 10][P.p - 1]} ${t('soal')}</small></span></div>`).join('')}</div>
      <div class="tf-fcol"><h3>${ICON('book')} 閱讀 Reading</h3><p class="small muted">50 ${t('soal')} · 60 ${t('menit')} · 0–80 · L1 ≥ 41 · L2 ≥ 60</p>${TF_PARTS.R.map(P => `<div class="tf-fp"><b>${P.p}</b><span>${P.zh.split('：')[1]}<small>${esc(kx(P))} · ${[10, 10, 10, 5, 15][P.p - 1]} ${t('soal')}</small></span></div>`).join('')}</div></div></section>
    <section class="card glass"><h2>${t('Atur tes')}</h2>
      <div class="tf-set"><label>${t('Paket soal')}</label>${seg('form', [[1, 'Form 1'], [2, 'Form 2'], [3, 'Form 3'], ['mix', t('Acak')]])}</div>
      <div class="tf-set"><label>${t('Bagian')}</label>${seg('sec', [['full', t('Lengkap (L + R)')], ['L', '聽力 Listening'], ['R', '閱讀 Reading']])}</div>
      <div class="tf-set"><label>${t('Mode')}</label>${seg('mode', [['exam', t('Ujian (seperti asli)')], ['practice', t('Latihan + pembahasan')]])}</div>
      <div class="tf-set"><label>${t('Audio')}</label>${seg('twice', [[true, t('Diputar 2×')], [false, t('Diputar 1×')]])}</div>
      <div class="row wrap" style="gap:8px;margin-top:14px"><button class="btn pri big" data-a="tfgo">${ICON('play')} ${t('Mulai tes')}</button></div>
      <p class="small muted" style="margin:10px 0 0">${t('Tips: pakai earphone, tutup aplikasi lain, dan kerjakan sekali duduk. Hasil disimpan otomatis.')}</p></section>
    ${hist.length ? `<section class="card glass"><h2>${t('Riwayat skor')}</h2><div class="tf-hrow">${['L', 'R'].map(s => `<div><b>${s === 'L' ? 'Listening' : 'Reading'}</b>${tfHistSVG(hist, s) || `<p class="small muted">${t('Kerjakan 2 tes untuk melihat grafik.')}</p>`}</div>`).join('')}</div>
      <div class="tf-hl">${[...hist].reverse().slice(0, 8).map(r => `<div><span>${esc(r.d)}</span><span>Form ${r.form}</span><span>${r.sec === 'L' ? '聽力' : '閱讀'}</span><b>${r.scaled}/80</b><span class="tf-lv l${r.level}">${r.level ? 'L' + r.level : '—'}</span><small>${r.mode === 'exam' ? t('ujian') : t('latihan')}</small></div>`).join('')}</div></section>` : ''}`;
}
const XVIEWS_K = XVIEWS.kelas;
function tfBanner() {
  const h = tfState(); const last = h[h.length - 1];
  return `<section class="tf-banner" data-a="kltocfl" role="button"><span class="tf-logo">TOCFL</span><div class="grow" style="min-width:0"><b>${t('Simulasi Tes TOCFL Band A')}</b><span>${t('Listening 50 soal + Reading 50 soal, timer & skor 0–80 seperti ujian asli.')}${last ? ' · ' + t('Terakhir') + `: ${last.sec === 'L' ? '聽力' : '閱讀'} ${last.scaled}/80` : ''}</span></div><span class="btn pri small">${t('Mulai')} ${ICON('chevron')}</span></section>`;
}
XVIEWS.kelas = function () {
  if (VK.view === 'tocfl') return vTocfl();
  const h = XVIEWS_K(); if (VK.view !== 'map' && VK.view) return h;
  const k = h.indexOf('</section>'); return k < 0 ? h : h.slice(0, k + 10) + tfBanner() + h.slice(k + 10);
};
Object.assign(ACT, {
  kltocfl: () => { VK.view = 'tocfl'; render(); window.scrollTo(0, 0); loadTF(); },
  tfset: b => { const k = b.dataset.k; let v = b.dataset.v; if (k === 'form') v = v === 'mix' ? 'mix' : +v; if (k === 'twice') v = v === 'true'; VK.tf[k] = v; render(); },
  tfgo: () => { klState().tfCfg = Object.assign({}, VK.tf); save(); FX.ensure(); TTS.unlock && TTS.unlock(); tfOpen(Object.assign({}, VK.tf)); },
  tfsubmitok: () => { closeModal(); tfSubmit(true); }
});
START_ACTS.add('tfgo');