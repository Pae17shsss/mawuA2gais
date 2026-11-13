/* ========== guru.js — Xiǎobù Guru ==========
   App pendamping untuk guru. Memuat data & mesin yang sama dengan app murid (data.js, app.js tanpa boot),
   jadi kosakata, lesson, suara, dan aturan soal persis sama dengan yang dipelajari murid.
   Tersambung ke HP murid lewat Supabase Realtime (saluran yang sama dengan Duel), topik xbduel-guru-<KODE>.

   Pesan:  guru → murid : halo · tes {id, ti, note, items:[{k: jenis, w: id kata}]} · ack {id} · pesan {txt}
           murid → guru : profil {p} · terima {id} · jwb {id, i, ok, pct?} · hasil {r}
   Penyimpanan guru: localStorage 'xiaobu.guru.v1' (terpisah dari progres belajar; app ini tidak pernah menulis ke sana). */
(function () {
  'use strict';
  const KEY = 'xiaobu.guru.v1';
  const root = document.getElementById('guru');
  try { load(); } catch (e) { console.warn('guru load', e); }
  try { TTS.init(); } catch (e) {}
  const unlock = () => { try { FX.ensure(); TTS.unlock(); } catch (e) {} };
  ['touchend', 'pointerdown', 'click'].forEach(ev => addEventListener(ev, unlock, { once: true, passive: true }));
  ICON_PATHS.send = ICON_PATHS.send || '<path d="M21 3 10.2 13.8M21 3l-6.8 18-4-7.2L3 9.8z"/>';

  const TL = { mc_mean: ['意思', 'Arti'], mc_hanzi: ['漢字', 'Pilih hanzi'], listen: ['聽', 'Dengar'], tone: ['聲調', 'Nada'], type: ['拼音', 'Ketik pinyin'], ucap: ['口說', 'Ucapkan'],
    kal: ['句子', 'Terjemahkan kalimat'], baca: ['朗讀', 'Baca kalimat'], tj: ['問答', 'Tanya-jawab'], dlg: ['對話', 'Dialog peran'] };
  const WT = ['mc_mean', 'mc_hanzi', 'listen', 'tone', 'type', 'ucap'];   // jenis soal per kata
  const FORMS = {
    kata: ['Kata', 'tanya arti, hanzi, nada, atau ucapan — satu kata per soal'],
    kal: ['Terjemahkan kalimat', 'Anda menyebut artinya, murid mengucapkan kalimat Mandarinnya'],
    baca: ['Baca kalimat', 'murid membaca kalimat contoh dengan lantang, Anda menilai nada dan kelancaran'],
    tj: ['Tanya-jawab', 'Anda bertanya dalam Mandarin, murid menjawab dengan pola lesson'],
    dlg: ['Dialog peran', 'Anda dan murid memerankan dialog lesson, bergantian baris demi baris']
  };
  const OTAGS = ['Nada', 'Pelafalan', 'Lupa kata', 'Susunan kalimat', 'Ragu-ragu'];
  const ORAL = {
    mc_mean: ['Apa artinya?', 'hz'], mc_hanzi: ['Bahasa Mandarinnya apa?', 'mean'], listen: ['Dengarkan, lalu sebut artinya', 'audio'],
    tone: ['Baca dengan nada yang tepat', 'hz'], type: ['Sebutkan pinyinnya', 'hz'], ucap: ['Ucapkan dengan jelas', 'hzpy'],
    kal: ['Katakan dalam bahasa Mandarin', 'sent'], baca: ['Baca dengan lantang', 'sent'], tj: ['Jawab pertanyaan gurumu dalam bahasa Mandarin', 'sent'], dlg: ['Giliranmu — katakan dalam bahasa Mandarin', 'sent']
  };
  const SRC = { all: 'Semua yang sudah dipelajari', rec: 'Baru dipelajari (7 hari)', weak: 'Kata lemah', les: 'Per lesson', miss: 'Salah di tes sebelumnya' };

  /* ---------- penyimpanan ---------- */
  function newCode() { const a = new Uint32Array(6); crypto.getRandomValues(a); return [...a].map(x => DL_CODE_CH[x % DL_CODE_CH.length]).join(''); }
  function loadG() {
    let g = null; try { g = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) {}
    if (!g || typeof g !== 'object') g = {};
    if (typeof g.code !== 'string' || g.code.length < 4) g.code = newCode();
    if (typeof g.nm !== 'string') g.nm = '';
    if (!Array.isArray(g.tests)) g.tests = [];
    const d = g.draft && typeof g.draft === 'object' ? g.draft : {};
    g.draft = { src: SRC[d.src] ? d.src : 'all', les: Array.isArray(d.les) ? d.les : [], types: Array.isArray(d.types) && d.types.length ? d.types.filter(k => WT.includes(k)) : ['mc_mean', 'mc_hanzi', 'listen'], n: [10, 15, 20, 30].includes(d.n) ? d.n : 10, ti: typeof d.ti === 'string' ? d.ti : '', note: typeof d.note === 'string' ? d.note : '', mode: d.mode === 'lisan' ? 'lisan' : 'hp', form: FORMS[d.form] ? d.form : 'kata', role: d.role === 0 ? 0 : 1, mirror: d.mirror !== false };
    return g;
  }
  let G = loadG();
  const saveG = () => { try { localStorage.setItem(KEY, JSON.stringify(G)); } catch (e) { toast('Penyimpanan penuh — hasil tes terbaru mungkin tidak tersimpan.'); } };
  const U = { tab: 'murid', ch: null, st: 'off', busy: false, online: false, stuNm: '', oral: null, les: null, open: null, lm: null, lmAt: 0, dirty: false, recode: false, msg: '' };
  saveG();

  /* ---------- profil murid ---------- */
  const P = () => (G.stu && G.stu.p) || null;
  function LM() {
    const p = P(); if (!p) return new Map();
    if (U.lm && U.lmAt === G.stu.at) return U.lm;
    const m = new Map(); const c = p.c || [];
    for (let k = 0; k + 2 < c.length; k += 3) if (W[c[k]]) m.set(c[k], { m: c[k + 1], lp: c[k + 2] });
    U.lm = m; U.lmAt = G.stu.at; return m;
  }
  const misIds = () => { const p = P(); return p ? (p.mis || []).filter(x => x[0][0] === 'w' && W[+x[0].slice(2)]).map(x => +x[0].slice(2)) : []; };
  function missedInTests() {
    const n = {}; G.tests.forEach(T => { const d = T.res && T.res.det; if (!d) return; T.items.forEach((x, k) => { if (d[k] && !d[k][0] && x.w !== undefined) n[x.w] = (n[x.w] || 0) + 1; }); });
    return Object.keys(n).map(Number).filter(i => W[i]).sort((a, b) => n[b] - n[a]).map(i => [i, n[i]]);
  }
  function pool(src) {
    const lm = LM(); const p = P(); if (!p) return [];
    if (src === 'all') return [...lm.keys()];
    if (src === 'rec') return (p.rec || []).filter(i => lm.has(i));
    if (src === 'weak') return [...new Set([...misIds(), ...[...lm.keys()].filter(i => lm.get(i).lp >= 2 || lm.get(i).m <= 1)])];
    if (src === 'les') return [...new Set(G.draft.les.filter(n => KL(n)).flatMap(n => klWords(n)))].filter(i => lm.has(i));
    if (src === 'miss') return missedInTests().map(x => x[0]);
    return [];
  }
  function lessonStats() {
    const lm = LM(); const p = P() || {}; const kd = new Set([...(p.kd || []), ...(p.kb || [])]);
    return KLS.map(L => { const ids = klWords(L.n); const got = ids.filter(i => lm.has(i)).length; return { L, n: L.n, tot: ids.length, got, done: kd.has(L.n) }; });
  }
  const typeValid = (k, i) => { const w = W[i]; return k === 'ucap' ? lgOkW(i) : k === 'tone' ? toneQuizOK(w) : k === 'type' ? aligned(w) : k === 'listen' ? true : !!w.m; };
  function buildItems() {
    const lm = LM(); const d = G.draft; const types = d.types.length ? d.types : ['mc_mean'];
    const ids = shuffle(pool(d.src).slice()).map(i => [i, (lm.has(i) ? lm.get(i).m - lm.get(i).lp * 0.4 : 2) + Math.random() * 2.5]).sort((a, b) => a[1] - b[1]).slice(0, d.n).map(x => x[0]);
    const items = shuffle(ids).map((i, k) => { let ty = types[k % types.length]; if (!typeValid(ty, i)) ty = types.find(x => typeValid(x, i)) || (W[i].m ? 'mc_mean' : 'listen'); return { k: ty, w: i }; });
    return items.filter(x => x.k !== 'ucap').concat(items.filter(x => x.k === 'ucap'));
  }

  /* ---------- bahan tes lisan: kalimat contoh, tanya-jawab, dan dialog dari lesson ---------- */
  function oralLessons() { const touched = lessonStats().filter(x => x.got > 0).map(x => x.n); const pick = G.draft.les.filter(n => touched.includes(n)); return pick.length ? pick : touched; }
  function buildOral() {
    const d = G.draft; const lm = LM(); const ns = oralLessons();
    if (d.form === 'kal' || d.form === 'baca') {
      const ids = d.les.length ? [...new Set(ns.flatMap(n => klWords(n)))].filter(i => lm.has(i)) : [...lm.keys()];
      const seen = new Set(); const out = [];
      shuffle(ids.slice()).forEach(i => { const v = klVocab(i); if (!v || !v.ex || !v.ex.zh || seen.has(v.ex.zh)) return; seen.add(v.ex.zh); out.push({ k: d.form, w: i, zh: v.ex.zh, py: v.ex.py || '', tr: kx(v.ex) }); });
      return out.slice(0, d.n);
    }
    if (d.form === 'tj') return shuffle(ns.flatMap(n => (KL(n).speak || []).filter(s => s && s.q).map(s => ({ k: 'tj', n, zh: s.q, py: s.qpy || '', tr: kx(s), tpl: s.tpl || '', tplpy: s.tplpy || '' })))).slice(0, d.n);
    if (d.form === 'dlg') {
      const n = ns[0]; if (n === undefined) return []; const lines = (KL(n).dialog || []).filter(x => x && x.zh); const sps = [...new Set(lines.map(x => x.sp))]; const me = sps[Math.min(d.role, sps.length - 1)];
      return lines.map((x, k) => (x.sp === me ? { k: 'dlg', n, sp: x.sp || '', zh: x.zh, py: x.py || '', tr: kx(x), cue: k > 0 && lines[k - 1].sp !== me ? { sp: lines[k - 1].sp || '', zh: lines[k - 1].zh, py: lines[k - 1].py || '', tr: kx(lines[k - 1]) } : null } : null)).filter(Boolean);
    }
    return [];
  }
  const iHz = x => x.zh || (W[x.w] ? W[x.w].w : '?');
  const iPy = x => x.py || (W[x.w] ? W[x.w].p : '');
  const iTr = x => x.tr || (x.w !== undefined && W[x.w] ? wMeanS(x.w) : '');

  /* ---------- jaringan ---------- */
  const send = p => { try { NET.send(U.ch, p); } catch (e) {} };
  const b64u = o => btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const unb64u = s => JSON.parse(decodeURIComponent(escape(atob(String(s).replace(/-/g, '+').replace(/_/g, '/')))));
  const baseUrl = () => location.origin + location.pathname.replace(/guru\.html$/, '');
  async function share(data) {
    try { if (navigator.share) { await navigator.share(data); return true; } } catch (e) { if (e && e.name === 'AbortError') return false; }
    try { await navigator.clipboard.writeText(data.url); toast('Tautan disalin — tempel di obrolan dengan murid.', 4000); return true; } catch (e) { toast(data.url, 8000); return false; }
  }
  function connect() {
    if (U.busy || U.ch) return; U.busy = true; U.st = 'wait'; soft();
    NET.open('xbduel-guru-' + G.code, { id: DLX.id, role: 'guru', nm: G.nm || '' }, { msg: onMsg, sync: onSync, status: s => { U.st = s === 'up' ? 'on' : 'down'; if (s === 'up') hello(); soft(); } })
      .then(ch => { U.busy = false; U.ch = ch; U.st = 'on'; hello(); soft(); })
      .catch(() => { U.busy = false; U.st = 'fail'; soft(); setTimeout(connect, 30000); });
  }
  function disconnect() { if (U.ch) NET.close(U.ch); U.ch = null; U.online = false; U.st = 'off'; }
  function onSync(ps) { const was = U.online; const m = ps.find(p => p.role === 'murid'); U.online = !!m; if (m && m.nm) U.stuNm = m.nm; if (U.online && !was) hello(); soft(); }
  function hello() { if (!U.ch || !U.online) return; send({ t: 'halo' }); G.tests.filter(T => T.mode === 'hp' && T.st === 'antre').forEach(sendTest); saveG(); }
  function sendTest(T) { if (!U.ch || !U.online) { T.st = 'antre'; return; } send({ t: 'tes', tes: { id: T.id, ti: T.ti, note: T.note, items: T.items } }); T.st = 'terkirim'; }
  function onMsg(p) {
    if (!p || !p.t) return;
    if (p.t === 'profil' && p.p && Array.isArray(p.p.c)) { G.stu = { p: p.p, at: Date.now() }; U.lm = null; saveG(); return soft(); }
    const T = G.tests.find(x => x.id === (p.id || (p.r && p.r.id)));
    if (p.t === 'terima' && T) { if (T.st !== 'selesai') T.st = 'diterima'; saveG(); return soft(); }
    if (p.t === 'jwb' && T) { T.live = T.live || []; T.live[p.i] = [p.ok ? 1 : 0, p.pct === undefined ? null : p.pct]; if (T.st !== 'selesai') T.st = 'jalan'; return soft(); }
    if (p.t === 'hasil' && p.r && p.r.id) {
      const r = p.r; let X = T;
      if (!X) { X = { id: r.id, ti: r.ti || 'Tes', note: '', items: [], mode: 'hp', at: r.at || Date.now() }; G.tests.unshift(X); }
      X.res = r; X.st = r.part ? 'jalan' : 'selesai'; send({ t: 'ack', id: r.id }); saveG();
      if (!r.part) toast(`Hasil masuk: ${r.ok}/${r.n}`, 3500, 'hasil');
      return soft();
    }
  }

  /* ---------- gambar ulang ---------- */
  function soft() { const a = document.activeElement; if (a && root.contains(a) && /^(INPUT|TEXTAREA)$/.test(a.tagName)) { U.dirty = true; return; } draw(); }
  root.addEventListener('focusout', () => setTimeout(() => { if (U.dirty) soft(); }, 60));
  const when = at => new Date(at).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  const wMeanS = i => shortMean(meanP(W[i]));
  const stuName = () => (P() && P().nm) || U.stuNm || 'Murid';
  const linkUrl = () => baseUrl() + '?guru=' + G.code;
  const testUrl = T => baseUrl() + '?guru=' + G.code + '&tes=' + b64u({ id: T.id, ti: T.ti, note: T.note, items: T.items });
  function draw() {
    U.dirty = false; const y = scrollY;
    const st = U.online ? ['on', stuName() + ' online'] : U.st === 'on' ? ['mid', 'Menunggu murid'] : U.st === 'wait' ? ['mid', 'Menyambung…'] : ['off', 'Tidak tersambung'];
    root.innerHTML = `<header class="gu-top"><div class="gu-brand"><span class="hz">老師</span><b>Xiǎobù Guru</b></div><button class="gu-st ${st[0]}" data-g="tab" data-v="murid"><i></i>${esc(st[1])}</button></header>
      <main class="gu-main">${U.oral ? vOral() : ({ murid: vMurid, tes: vTes, riwayat: vRiwayat, materi: vMateri })[U.tab]()}</main>
      ${U.oral ? '' : `<nav class="gu-tabs" aria-label="Menu">${[['murid', 'user', 'Murid'], ['tes', 'target', 'Tes'], ['riwayat', 'calendar', 'Riwayat'], ['materi', 'book', 'Materi']].map(([k, ic, l]) => `<button class="${U.tab === k ? 'on' : ''}" data-g="tab" data-v="${k}" ${U.tab === k ? 'aria-current="page"' : ''}>${ICON(ICON_PATHS[ic] ? ic : 'class')}<span>${l}</span></button>`).join('')}</nav>`}`;
    scrollTo(0, y);
    const cv = document.getElementById('gu-qr'); if (cv) drawQR(cv);
  }
  let qrP = null;
  function drawQR(cv) {
    qrP = qrP || new Promise(res => { if (window.qrcode) return res(true); const s = document.createElement('script'); s.src = 'qr.js?v=k170'; s.onload = () => res(!!window.qrcode); s.onerror = () => { qrP = null; res(false); }; document.head.appendChild(s); });
    qrP.then(ok => {
      if (!ok || !cv.isConnected) return; const q = qrcode(0, 'M'); q.addData(linkUrl()); q.make(); const n = q.getModuleCount(); const sc = 6, pad = 4; cv.width = cv.height = (n + pad * 2) * sc;
      const x = cv.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, cv.width, cv.height); x.fillStyle = '#17231d';
      for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.isDark(r, c)) x.fillRect((c + pad) * sc, (r + pad) * sc, sc, sc);
    });
  }

  /* ---------- tab: Murid ---------- */
  function vConnect(open) {
    return `<details class="gu-card gu-conn" ${open ? 'open' : ''}><summary><b>Sambungan ke HP murid</b><span class="gu-code">${esc(G.code)}</span></summary>
      <div class="gu-conn-b"><canvas id="gu-qr" class="gu-qr" width="10" height="10" aria-label="Kode QR tautan sambungan"></canvas>
      <ol class="gu-steps"><li>Di HP murid, buka Xiǎobù → <b>Saya</b> → <b>Guru saya</b>.</li><li>Ketik kode <b>${esc(G.code)}</b>, atau pindai QR ini dengan kamera HP murid.</li><li>Selama kedua app terbuka dan ada internet, profil dan tes terkirim otomatis.</li></ol></div>
      <label class="gu-f"><span>Nama Anda (tampil di HP murid)</span><input data-i="nm" value="${esc(G.nm)}" maxlength="24" placeholder="mis. 老師" autocomplete="off"></label>
      <p class="gu-note">Internet sedang bermasalah? Di HP murid tekan <b>Kirim profil lewat file</b>, kirim filenya ke Anda, lalu impor di sini. Tes dan hasilnya bisa dikirim lewat tautan.</p>
      <div class="gu-row"><button class="gu-btn" data-g="share">${ICON('send')} Bagikan tautan</button><label class="gu-btn gu-file">Impor file murid<input type="file" accept=".json,application/json" data-i="file" hidden></label><button class="gu-btn ghost" data-g="recode">${U.recode ? 'Yakin? Murid harus memasukkan kode baru' : 'Buat kode baru'}</button></div></details>`;
  }
  function vMurid() {
    const p = P(); if (!p) return `<section class="gu-hero"><h1>Belum ada murid tersambung</h1><p>Sambungkan sekali, lalu app ini selalu tahu apa saja yang sudah dipelajari murid Anda.</p></section>${vConnect(true)}`;
    const lm = LM(); const ids = [...lm.keys()]; const byM = [1, 2, 3, 4].map(m => ids.filter(i => lm.get(i).m === m).length);
    const mins = (p.days || []).map(d => d[0]); const wk = mins.reduce((a, b) => a + b, 0); const mx = Math.max(10, ...mins);
    const okW = (p.days || []).reduce((a, d) => a + d[2], 0), badW = (p.days || []).reduce((a, d) => a + d[3], 0); const acc = okW + badW ? Math.round(okW / (okW + badW) * 100) : null;
    const dn = k => new Date(Date.now() - k * 864e5).toLocaleDateString('id-ID', { weekday: 'narrow' });
    const ls = lessonStats().filter(x => x.got > 0 || x.done); const weak = pool('weak'); const mis = misIds();
    const sp = (p.spk || []).filter(x => W[x[0]]); const spAvg = sp.length ? Math.round(sp.reduce((a, x) => a + x[1], 0) / sp.length) : null; const spWeak = sp.filter(x => x[1] < 80).sort((a, b) => a[1] - b[1]);
    const names = ['Baru kenal', 'Mulai ingat', 'Hafal', 'Mantap'];
    return `<section class="gu-hero"><p class="gu-eyebrow">Diperbarui ${when(G.stu.at)}</p><h1>${esc(stuName())}</h1>
        <div class="gu-kpis"><div><b>${ids.length}</b><span>kata dipelajari</span></div><div><b>${byM[2] + byM[3]}</b><span>sudah hafal</span></div><div><b>${p.st || 0}</b><span>hari beruntun</span></div><div><b>${wk}</b><span>menit · 7 hari</span></div></div>
        <div class="gu-row"><button class="gu-btn pri" data-g="tab" data-v="tes">${ICON('target')} Buat tes</button><button class="gu-btn" data-g="ask" ${U.online ? '' : 'disabled'}>${ICON('refresh')} Minta data terbaru</button></div></section>
      <section class="gu-card"><h2>Seberapa kuat ingatannya</h2>
        <div class="gu-mbar" role="img" aria-label="Sebaran penguasaan kata">${byM.map((n, k) => (n ? `<i class="m${k + 1}" style="flex:${n}"></i>` : '')).join('')}</div>
        <div class="gu-leg">${byM.map((n, k) => `<span><i class="m${k + 1}"></i>${names[k]} <b>${n}</b></span>`).join('')}</div></section>
      <section class="gu-card"><h2>Tujuh hari terakhir</h2>
        <div class="gu-week">${mins.map((m, k) => [m, k]).reverse().map(([m, k]) => `<div><span class="gu-wv">${m || ''}</span><i style="height:${Math.round(m / mx * 56) + 3}px" class="${m ? '' : 'z'}"></i><span class="gu-wd">${dn(k)}</span></div>`).join('')}</div>
        <p class="gu-note">${acc === null ? 'Belum ada jawaban minggu ini.' : `Ketepatan jawaban minggu ini <b>${acc}%</b> dari ${okW + badW} soal.`} Angka di atas batang = menit belajar.</p></section>
      <section class="gu-card"><h2>Lesson</h2>${ls.length ? `<div class="gu-les">${ls.map(x => `<button data-g="les" data-v="${x.n}"><span class="gu-ln">${esc(lnShort(x.n))}</span><span class="grow"><b class="hz">${esc(x.L.title.zh)}</b><span class="gu-pb"><i style="width:${Math.round(x.got / Math.max(1, x.tot) * 100)}%"></i></span></span><span class="gu-lp">${x.done ? '<em>khatam</em>' : ''}${x.got}/${x.tot}</span></button>`).join('')}</div>` : '<p class="gu-note">Murid belum membuka lesson kelas. Kosakata di atas berasal dari sesi harian.</p>'}</section>
      <section class="gu-card"><h2>Perlu perhatian</h2>
        ${mis.length ? `<h3>Sering salah (${mis.length})</h3><div class="gu-chips">${(p.mis || []).filter(x => x[0][0] === 'w' && W[+x[0].slice(2)]).slice(0, 14).map(x => chipW(+x[0].slice(2), '×' + x[1])).join('')}</div>` : '<p class="gu-note">Buku kesalahan murid masih kosong.</p>'}
        ${spWeak.length ? `<h3>Pelafalan belum pas (${spWeak.length}) · rata-rata bicara ${spAvg}%</h3><div class="gu-chips">${spWeak.slice(0, 12).map(x => chipW(x[0], x[1] + '%')).join('')}</div>` : sp.length ? `<p class="gu-note">Rata-rata nilai bicara ${spAvg}% dari ${sp.length} kata.</p>` : ''}
        ${weak.length ? `<div class="gu-row"><button class="gu-btn" data-g="src" data-v="weak">Tes ${Math.min(weak.length, G.draft.n)} kata lemah</button></div>` : ''}</section>
      <section class="gu-card"><h2>Kirim pesan</h2><div class="gu-msg"><input data-i="msg" value="${esc(U.msg)}" maxlength="200" placeholder="mis. 加油！ Besok kita tes Lesson 3 ya" autocomplete="off"><button class="gu-btn pri" data-g="msg" ${U.online ? '' : 'disabled'}>${ICON('send')} Kirim</button></div>${U.online ? '' : '<p class="gu-note">Pesan hanya terkirim saat murid sedang online.</p>'}</section>
      ${vConnect(false)}`;
  }
  const chipW = (i, tag) => `<button class="gu-chip" data-g="say" data-v="${i}"><span class="hz">${esc(W[i].w)}</span><span>${esc(wMeanS(i))}</span>${tag ? `<b>${tag}</b>` : ''}</button>`;

  /* ---------- tab: Tes ---------- */
  const stLabel = T => (T.mode === 'lisan' ? (T.res ? 'lisan · selesai' : 'lisan · belum selesai') : { antre: 'menunggu murid online', terkirim: 'terkirim', diterima: 'sudah muncul di HP murid', jalan: 'sedang dikerjakan', selesai: 'selesai' }[T.st] || T.st);
  function vLive(T) {
    const live = T.res ? T.res.det : T.live || []; const done = live.filter(Boolean).length; const ok = live.filter(x => x && x[0]).length;
    return `<section class="gu-card gu-live"><p class="gu-eyebrow">${esc(stLabel(T))}</p><h2>${esc(T.ti)}</h2>
      <div class="gu-dots">${T.items.map((x, k) => `<i class="${live[k] ? (live[k][0] ? 'ok' : 'no') : ''}" title="${esc(W[x.w].w)}"></i>`).join('')}</div>
      <p class="gu-note"><b>${done}/${T.items.length}</b> dijawab · <b class="gu-red">${ok} benar</b>${T.st === 'antre' ? ' · tes terkirim otomatis begitu murid membuka Xiǎobù' : ''}</p>
      <div class="gu-row">${T.st === 'selesai' ? `<button class="gu-btn pri" data-g="detail" data-v="${T.id}">Lihat hasil</button>` : `<button class="gu-btn" data-g="resend" data-v="${T.id}" ${U.online ? '' : 'disabled'}>Kirim ulang</button><button class="gu-btn" data-g="sharetest" data-v="${T.id}">${ICON('send')} Kirim lewat tautan</button><button class="gu-btn ghost" data-g="cancel" data-v="${T.id}">Batalkan</button>`}</div></section>`;
  }
  function vTes() {
    const p = P(); if (!p) return `<section class="gu-hero"><h1>Tes</h1><p>Sambungkan HP murid dulu. Tes disusun hanya dari kata yang sudah ia pelajari.</p></section>${vConnect(true)}`;
    const d = G.draft; const active = G.tests.find(T => T.mode === 'hp' && T.st !== 'selesai'); const cnt = k => pool(k).length; const n = pool(d.src).length;
    const ls = lessonStats().filter(x => x.got > 0); const lisan = d.mode === 'lisan'; const ox = lisan && d.form !== 'kata';
    const total = ox ? buildOral().length : Math.min(n, d.n);
    const lesChips = `<div class="gu-chips gu-pick">${ls.map(x => `<button class="gu-chip ${d.les.includes(x.n) ? 'on' : ''}" data-g="lespick" data-v="${x.n}" aria-pressed="${d.les.includes(x.n)}"><span>${esc(lnShort(x.n))}</span><span class="hz">${esc(x.L.title.zh)}</span><b>${x.got}</b></button>`).join('')}</div>`;
    const dn = ox && d.form === 'dlg' ? oralLessons()[0] : undefined; const sps = dn !== undefined ? [...new Set((KL(dn).dialog || []).map(x => x.sp))] : [];
    return `${active ? vLive(active) : ''}
      <section class="gu-hero"><h1>Susun tes</h1><p>Semua soal diambil dari yang sudah dipelajari ${esc(stuName())}. Kata yang paling lemah didahulukan.</p></section>
      <section class="gu-card"><h2>Cara tes</h2><div class="gu-opts two"><button class="${d.mode === 'hp' ? 'on' : ''}" data-g="mode" data-v="hp"><b>Kirim ke HP murid</b><span>murid menjawab sendiri, Anda melihat langsung</span></button><button class="${lisan ? 'on' : ''}" data-g="mode" data-v="lisan"><b>Tes lisan</b><span>Anda bertanya langsung dan menilai di sini</span></button></div>
        ${lisan ? `<h3>Bentuk tes lisan</h3><div class="gu-opts">${Object.keys(FORMS).map(k => `<button class="${d.form === k ? 'on' : ''}" data-g="form" data-v="${k}"><b>${FORMS[k][0]}</b><span>${FORMS[k][1]}</span></button>`).join('')}</div>` : ''}</section>
      ${ox ? `<section class="gu-card"><h2>Lesson</h2>${ls.length ? lesChips : '<p class="gu-note">Murid belum membuka lesson kelas, jadi belum ada bahan untuk bentuk ini.</p>'}
          <p class="gu-note">${d.form === 'dlg' ? (dn !== undefined ? `Dialog yang dipakai: <b>${esc(lnShort(dn))} · <span class="hz">${esc(KL(dn).title.zh)}</span></b>. Pilih satu lesson untuk menggantinya.` : '') : 'Tidak memilih apa pun = semua lesson yang sudah dibuka murid.'}</p>
          ${d.form === 'dlg' && sps.length > 1 ? `<h3>Murid memerankan</h3><div class="gu-seg">${sps.slice(0, 2).map((s, k) => `<button class="${Math.min(d.role, sps.length - 1) === k ? 'on' : ''} hz" data-g="role" data-v="${k}">${esc(s || '?')}</button>`).join('')}</div>` : ''}</section>`
      : `<section class="gu-card"><h2>Materi</h2><div class="gu-opts">${Object.keys(SRC).map(k => { const c = k === 'les' ? ls.length : cnt(k); return `<button class="${d.src === k ? 'on' : ''}" data-g="src" data-v="${k}" ${c ? '' : 'disabled'}><b>${SRC[k]}</b><span>${k === 'les' ? c + ' lesson' : c + ' kata'}</span></button>`; }).join('')}</div>
        ${d.src === 'les' ? lesChips : ''}</section>
      <section class="gu-card"><h2>Jenis soal</h2><div class="gu-chips gu-pick">${WT.map(k => `<button class="gu-chip ${d.types.includes(k) ? 'on' : ''}" data-g="type" data-v="${k}" aria-pressed="${d.types.includes(k)}"><span class="hz">${TL[k][0]}</span><span>${TL[k][1]}</span></button>`).join('')}</div></section>`}
      <section class="gu-card">${ox && d.form === 'dlg' ? '' : `<h2>Jumlah soal</h2><div class="gu-seg" style="margin-bottom:14px">${[10, 15, 20, 30].map(x => `<button class="${d.n === x ? 'on' : ''}" data-g="n" data-v="${x}">${x}</button>`).join('')}</div>`}
        <label class="gu-f"><span>Judul tes</span><input data-i="ti" value="${esc(d.ti)}" maxlength="60" placeholder="${esc(defTitle())}" autocomplete="off"></label>
        ${d.mode === 'hp' ? `<label class="gu-f"><span>Catatan untuk murid (boleh kosong)</span><input data-i="note" value="${esc(d.note)}" maxlength="160" placeholder="mis. Jangan lihat catatan ya" autocomplete="off"></label>` : `<label class="gu-check"><input type="checkbox" data-i="mirror" ${d.mirror ? 'checked' : ''}><span>Tampilkan tiap soal di HP murid juga ${U.online ? '' : '(murid sedang offline)'}</span></label>`}
        <div class="gu-row"><button class="gu-btn pri big" data-g="make" ${total ? '' : 'disabled'}>${d.mode === 'hp' ? ICON('send') + ' Kirim ' : ICON('mic') + ' Mulai '}${total} soal</button></div>
        <p class="gu-note">${total ? (!ox && n < d.n ? `Materi ini hanya punya ${n} kata, jadi tesnya ${n} soal.` : '') : 'Belum ada bahan untuk pilihan ini. Pilih materi atau lesson lain.'}${d.mode === 'hp' && !U.online ? ' Murid sedang offline: tes masuk antrean dan terkirim saat ia membuka Xiǎobù.' : ''}</p></section>`;
  }
  const defTitle = () => { const d = G.draft; if (d.mode === 'lisan' && d.form !== 'kata') return FORMS[d.form][0] + (d.form === 'dlg' && oralLessons().length ? ' ' + lnShort(oralLessons()[0]) : ''); return d.src === 'les' && d.les.length ? 'Tes ' + d.les.map(lnShort).join(', ') : 'Tes ' + SRC[d.src].toLowerCase(); };
  function makeTest() {
    const d = G.draft; const items = d.mode === 'lisan' && d.form !== 'kata' ? buildOral() : buildItems(); if (!items.length) return toast('Belum ada bahan untuk pilihan ini.');
    if (d.mode === 'hp' && G.tests.some(T => T.mode === 'hp' && T.st !== 'selesai')) return toast('Masih ada tes yang belum selesai. Batalkan dulu atau tunggu hasilnya.');
    const T = { id: 't' + Date.now().toString(36), ti: d.ti.trim() || defTitle(), note: d.mode === 'hp' ? d.note.trim() : '', items, mode: d.mode, at: Date.now(), st: 'antre', live: [], res: null };
    G.tests.unshift(T); G.tests = G.tests.slice(0, 80); d.ti = '';
    if (d.mode === 'hp') { sendTest(T); toast(T.st === 'terkirim' ? 'Tes terkirim ke HP murid' : 'Murid offline — tes masuk antrean', 3000); }
    else { T.st = 'lisan'; U.oral = { id: T.id, i: 0, det: items.map(() => null), show: false, t0: Date.now(), tags: [] }; }
    saveG(); draw(); scrollTo(0, 0); mirror();
  }

  /* ---------- tes lisan ---------- */
  /* satu soal lisan → apa yang dilihat guru, kunci jawabannya, dan apa yang boleh dilihat murid */
  function oralView(it) {
    const w = it.w !== undefined ? W[it.w] : null; const ask = ORAL[it.k][0]; const mode = ORAL[it.k][1]; const kv = w ? klVocab(it.w) : null;
    const sent = (zh, py) => `<div class="gu-psent hz">${esc(zh)}</div>${py ? `<div class="gu-ppy">${esc(py)}</div>` : ''}`;
    const keyW = () => `<div class="gu-keyr"><b class="hz">${esc(w.w)}</b><span>${esc(w.p)}</span><button class="gu-ic" data-g="say" data-v="${it.w}" aria-label="Putar suara">${ICON('speaker')}</button></div><p>${esc(meanP(w))}</p>${kv ? `<p class="gu-note">${esc(lnShort(kv.n))}${kv.ex && kv.ex.zh ? ` · <span class="hz">${esc(kv.ex.zh)}</span>` : ''}</p>` : ''}`;
    const keyS = (zh, py, tr) => `<div class="gu-keyr"><b class="hz gu-ks">${esc(zh)}</b><button class="gu-ic" data-g="saytxt" data-v="${esc(zh)}" aria-label="Putar suara">${ICON('speaker')}</button></div><p>${esc(py)}</p>${tr ? `<p class="gu-note">${esc(tr)}</p>` : ''}`;
    if (it.k === 'kal') return { tag: TL.kal, you: 'Sebutkan artinya, murid mengucapkan kalimat Mandarinnya', prompt: `<div class="gu-pmean">${esc(it.tr)}</div>`, key: keyS(it.zh, it.py, w ? 'Kata: ' + w.w + ' ' + w.p : ''), stu: { ask, big: it.tr } };
    if (it.k === 'baca') return { tag: TL.baca, you: 'Murid membaca kalimat ini dengan lantang', prompt: sent(it.zh), key: keyS(it.zh, it.py, it.tr), stu: { ask, big: it.zh, hz: 1 } };
    if (it.k === 'tj') return { tag: TL.tj, you: 'Tanyakan ini ke murid', prompt: sent(it.zh, it.py) + `<p class="gu-note">${esc(it.tr)}</p><button class="gu-ic" data-g="saytxt" data-v="${esc(it.zh)}" aria-label="Putar pertanyaan">${ICON('speaker')}</button>`, key: `<div class="gu-keyr"><b class="hz gu-ks">${esc(it.tpl || '—')}</b></div><p>${esc(it.tplpy)}</p><p class="gu-note">Pola jawaban dari ${esc(lnShort(it.n))}. Isinya bebas, asal polanya benar.</p>`, stu: { ask, big: '🎧' } };
    if (it.k === 'dlg') return { tag: TL.dlg, you: it.cue ? `Anda (${it.cue.sp}) mengucapkan baris ini, lalu murid (${it.sp}) menjawab` : `Murid (${it.sp}) membuka dialog`, prompt: it.cue ? sent(it.cue.zh, it.cue.py) + `<p class="gu-note">${esc(it.cue.tr)}</p><button class="gu-ic" data-g="saytxt" data-v="${esc(it.cue.zh)}" aria-label="Putar baris Anda">${ICON('speaker')}</button>` : `<div class="gu-pmean">${esc(it.tr)}</div>`, key: keyS(it.zh, it.py, it.tr), stu: { ask, big: it.tr } };
    const prompt = mode === 'mean' ? `<div class="gu-pmean">${esc(wMeanS(it.w))}</div>` : mode === 'audio' ? `<button class="gu-play" data-g="say" data-v="${it.w}" aria-label="Putar suara">${ICON('speaker')}</button>` : `<div class="gu-phz hz">${esc(w.w)}</div>${mode === 'hzpy' ? `<div class="gu-ppy">${esc(w.p)}</div>` : ''}`;
    return { tag: TL[it.k], you: ask, prompt, key: keyW(), stu: mode === 'mean' ? { ask, big: wMeanS(it.w) } : mode === 'audio' ? { ask, big: '🔊' } : { ask, big: w.w + (mode === 'hzpy' ? '\n' + w.p : ''), hz: 1 } };
  }
  function mirror(end) {
    if (!U.online) return; if (end) return send({ t: 'soal', end: 1 });
    const o = U.oral; if (!o || !G.draft.mirror) return; const T = G.tests.find(x => x.id === o.id); const v = oralView(T.items[o.i]);
    send({ t: 'soal', ti: T.ti, i: o.i + 1, n: T.items.length, ask: v.stu.ask, big: v.stu.big, hz: v.stu.hz ? 1 : 0 });
  }
  function vOral() {
    const o = U.oral; const T = G.tests.find(x => x.id === o.id); const it = T.items[o.i]; const v = oralView(it);
    if (o.show) return `<section class="gu-stu"><p>${esc(v.stu.ask)}</p><div class="${v.stu.hz ? 'gu-phz hz' : 'gu-pmean'}">${esc(v.stu.big).replace(/\n/g, '<br>')}</div><button class="gu-btn" data-g="oshow">Kembali ke layar guru</button></section>`;
    return `<section class="gu-oral"><div class="gu-otop"><button class="gu-btn ghost" data-g="oquit">✕ Akhiri</button><span>${o.i + 1} / ${T.items.length}</span><span class="gu-red"><b>${o.det.filter(x => x && x[0]).length}</b> benar</span></div>
      <div class="gu-ocard"><p class="gu-eyebrow"><span class="hz">${v.tag[0]}</span> ${esc(v.you)}</p>${v.prompt}
        <div class="gu-row" style="justify-content:center;margin-top:4px"><button class="gu-btn" data-g="oshow">Balik layar ke murid</button>${G.draft.mirror && U.online ? '<span class="gu-note" style="margin:0;align-self:center">· tampil juga di HP murid</span>' : ''}</div></div>
      <div class="gu-key"><p class="gu-eyebrow">${it.k === 'tj' ? 'Pola jawaban' : 'Kunci jawaban'}</p>${v.key}</div>
      <div class="gu-tags" role="group" aria-label="Catatan penilaian"><span class="gu-note" style="margin:0">Yang perlu diperbaiki (boleh kosong):</span>${OTAGS.map(k => `<button class="gu-chip ${o.tags.includes(k) ? 'on' : ''}" data-g="otag" data-v="${k}" aria-pressed="${o.tags.includes(k)}">${k}</button>`).join('')}</div>
      <div class="gu-grade"><button class="no" data-g="ograde" data-v="0">✗<span>Salah</span></button><button class="half" data-g="ograde" data-v="60">△<span>Hampir</span></button><button class="ok" data-g="ograde" data-v="100">✓<span>Benar</span></button></div></section>`;
  }
  function oralGrade(pct) {
    const o = U.oral; const T = G.tests.find(x => x.id === o.id); o.det[o.i] = [pct >= 80 ? 1 : 0, 0, pct, o.tags.slice()]; o.tags = []; o.i++;
    if (o.i >= T.items.length) return oralEnd(true); draw(); scrollTo(0, 0); mirror();
  }
  function oralPack(T) {
    const d = T.res.det || []; const salah = [...new Set(T.items.filter((x, k) => d[k] && !d[k][0] && x.w !== undefined).map(x => x.w))]; const tags = {};
    d.forEach(x => (x && x[3] || []).forEach(k => { tags[k] = (tags[k] || 0) + 1; }));
    return { r: { id: T.id, ti: T.ti, n: T.res.done, ok: T.res.ok, at: T.res.at }, salah, tags };
  }
  function oralEnd(full) {
    const o = U.oral; const T = G.tests.find(x => x.id === o.id); const done = o.det.filter(Boolean).length; U.oral = null; mirror(true);
    if (!done) { G.tests = G.tests.filter(x => x !== T); saveG(); return draw(); }
    T.res = { id: T.id, ti: T.ti, n: T.items.length, ok: o.det.filter(x => x && x[0]).length, done, det: o.det, spk: null, dur: Math.round((Date.now() - o.t0) / 1000), at: Date.now(), part: full ? 0 : 1 };
    T.st = 'selesai'; T.sent = U.online ? 1 : 0; saveG(); U.tab = 'riwayat'; U.open = T.id; draw(); scrollTo(0, 0);
    if (U.online) send(Object.assign({ t: 'lisan' }, oralPack(T)));
  }

  /* ---------- tab: Riwayat ---------- */
  function vDetail(T) {
    const r = T.res; const det = r.det || [];
    const rows = T.items.map((x, k) => { const d = det[k]; const tags = d && d[3] && d[3].length ? d[3].join(', ') : ''; const long = x.zh !== undefined;
      return `<button class="gu-item ${d ? (d[0] ? 'ok' : 'no') : 'skip'} ${long ? 'long' : ''}" data-g="${long ? 'saytxt' : 'say'}" data-v="${long ? esc(x.zh) : x.w}"><span class="gu-mark">${d ? (d[0] ? '✓' : d[2] === 60 ? '△' : '✗') : '–'}</span>${long ? '' : `<span class="hz">${esc(iHz(x))}</span>`}<span class="grow">${long ? `<b class="hz">${esc(x.zh)}</b>` : `<b>${esc(iPy(x))}</b>`}<span>${esc(long ? iPy(x) + ' · ' + iTr(x) : iTr(x))}</span>${tags ? `<span class="gu-red">${esc(tags)}</span>` : ''}</span><span class="gu-ty">${TL[x.k] ? TL[x.k][1] : ''}${d && x.k === 'ucap' && d[2] >= 0 ? ' ' + d[2] + '%' : ''}</span></button>`; }).join('');
    const wrong = T.items.filter((x, k) => det[k] && !det[k][0] && x.w !== undefined).length; const tg = T.mode === 'lisan' ? oralPack(T).tags : {};
    return `<div class="gu-det">${Object.keys(tg).length ? `<p class="gu-note">Catatan Anda: ${Object.keys(tg).map(k => `<b>${esc(k)}</b> ×${tg[k]}`).join(' · ')}</p>` : ''}${rows || '<p class="gu-note">Rincian soal tidak tersimpan di perangkat ini.</p>'}
      <div class="gu-row">${wrong ? `<button class="gu-btn pri" data-g="retest" data-v="${T.id}">Tes ulang ${wrong} kata yang salah</button>` : ''}${T.mode === 'lisan' ? `<button class="gu-btn" data-g="sendres" data-v="${T.id}">${ICON('send')} ${T.sent ? 'Kirim ulang hasil ke murid' : 'Kirim hasil ke murid'}</button>` : ''}<button class="gu-btn ghost" data-g="del" data-v="${T.id}">Hapus</button></div></div>`;
  }
  function vRiwayat() {
    const done = G.tests.filter(T => T.res); const miss = missedInTests().slice(0, 12);
    if (!done.length) return `<section class="gu-hero"><h1>Riwayat</h1><p>Hasil tes muncul di sini begitu murid selesai mengerjakan.</p></section>`;
    const tot = done.reduce((a, T) => a + (T.res.done || T.res.n), 0), ok = done.reduce((a, T) => a + T.res.ok, 0);
    return `<section class="gu-hero"><h1>Riwayat</h1><div class="gu-kpis"><div><b>${done.length}</b><span>tes</span></div><div><b class="gu-red">${tot ? Math.round(ok / tot * 100) : 0}%</b><span>rata-rata benar</span></div><div><b>${tot}</b><span>soal dijawab</span></div></div></section>
      ${miss.length ? `<section class="gu-card"><h2>Paling sering salah di tes</h2><div class="gu-chips">${miss.map(x => chipW(x[0], '×' + x[1])).join('')}</div><div class="gu-row"><button class="gu-btn" data-g="src" data-v="miss">Tes kata-kata ini</button></div></section>` : ''}
      <section class="gu-card"><h2>Semua tes</h2><div class="gu-hist">${done.map(T => { const r = T.res; const tot1 = r.done || r.n; const pct = tot1 ? Math.round(r.ok / tot1 * 100) : 0; const open = U.open === T.id; return `<div class="gu-h ${open ? 'open' : ''}"><button class="gu-hh" data-g="detail" data-v="${T.id}" aria-expanded="${open}"><span class="gu-score ${pct >= 80 ? 'hi' : pct >= 60 ? 'mid' : 'lo'}">${pct}</span><span class="grow"><b>${esc(T.ti)}</b><span>${when(r.at)} · ${T.mode === 'lisan' ? 'lisan' : 'di HP murid'}${r.part ? ' · belum selesai' : ''}${r.spk !== null && r.spk !== undefined ? ' · bicara ' + r.spk + '%' : ''}</span></span><span class="gu-frac">${r.ok}/${tot1}</span></button>${open ? vDetail(T) : ''}</div>`; }).join('')}</div></section>`;
  }

  /* ---------- tab: Materi ---------- */
  function vLesson(n) {
    const L = KL(n); const lm = LM(); const lines = (L.dialog || []).flatMap(x => (x && Array.isArray(x.lines) ? x.lines : [x])).filter(x => x && x.zh);
    const got = klWords(n).filter(i => lm.has(i)).length;
    return `<section class="gu-hero"><button class="gu-btn ghost" data-g="lesback">‹ Semua lesson</button><p class="gu-eyebrow">${esc(lnLong(n))}</p><h1 class="hz">${esc(L.title.zh)}</h1><p>${esc(L.title.py || '')}<br>${esc(kx(L.title))}</p>
        ${P() ? `<div class="gu-row"><button class="gu-btn pri" data-g="testles" data-v="${n}" ${got ? '' : 'disabled'}>${ICON('target')} Tes lesson ini (${got} kata dikuasai murid)</button></div>` : ''}</section>
      <section class="gu-card"><h2>生詞 Kosakata (${L.vocab.length})</h2><div class="gu-voc">${L.vocab.map(v => { const k = v.wid !== undefined && lm.get(v.wid); return `<button data-g="${v.wid !== undefined ? 'say' : 'saytxt'}" data-v="${v.wid !== undefined ? v.wid : esc(v.hz)}"><i class="gu-m ${k ? 'm' + k.m : ''}" title="${k ? 'sudah dipelajari' : 'belum'}"></i><b class="hz">${esc(v.hz)}</b><span>${esc(v.py || '')}</span><span class="grow">${esc(kx(v))}</span></button>`; }).join('')}</div>
        <p class="gu-note">Titik berwarna = murid sudah mempelajari kata itu (makin gelap makin hafal). Ketuk baris untuk mendengar.</p></section>
      ${lines.length ? `<section class="gu-card"><h2>對話 Dialog</h2><div class="gu-dlg">${lines.map(x => `<button data-g="saytxt" data-v="${esc(x.zh)}">${x.sp ? `<em class="hz">${esc(x.sp)}</em>` : ''}<span class="grow"><b class="hz">${esc(x.zh)}</b><span>${esc(x.py || '')}</span><span>${esc(kx(x))}</span></span></button>`).join('')}</div></section>` : ''}
      ${(L.grammar || []).length ? `<section class="gu-card"><h2>語法 Grammar</h2>${L.grammar.map(g => `<div class="gu-gr"><b class="hz">${esc(g.form || '')}</b><span>${esc(kx(g.t))}</span><p>${esc(kx(g.note))}</p></div>`).join('')}</section>` : ''}`;
  }
  function vMateri() {
    if (U.les !== null && KL(U.les)) return vLesson(U.les);
    const st = lessonStats(); const has = !!P();
    return `<section class="gu-hero"><h1>Materi</h1><p>Lesson yang sama dengan di HP murid: kosakata, dialog, dan grammar — untuk bahan mengajar dan bertanya.</p></section>
      ${COURSES.map(C => { const ls = st.filter(x => x.L.course === C.k); if (!ls.length) return ''; return `<section class="gu-card"><h2 class="hz">${esc(C.zh)}</h2><div class="gu-les">${ls.map(x => `<button data-g="les" data-v="${x.n}"><span class="gu-ln">${x.L.num}</span><span class="grow"><b class="hz">${esc(x.L.title.zh)}</b><span class="gu-sub">${esc(kx(x.L.title))}</span>${has ? `<span class="gu-pb"><i style="width:${Math.round(x.got / Math.max(1, x.tot) * 100)}%"></i></span>` : ''}</span><span class="gu-lp">${x.done ? '<em>khatam</em>' : ''}${has ? x.got + '/' + x.tot : x.tot + ' kata'}</span></button>`).join('')}</div></section>`; }).join('')}`;
  }

  /* ---------- aksi ---------- */
  const A = {
    tab: b => { U.tab = b.dataset.v; U.les = U.tab === 'materi' ? U.les : null; draw(); scrollTo(0, 0); },
    say: b => { const w = W[+b.dataset.v]; if (w) say(w); },
    saytxt: b => { try { TTS.speak(b.dataset.v); } catch (e) {} },
    sharetest: async b => { const T = G.tests.find(x => x.id === b.dataset.v); if (T && await share({ title: 'Xiǎobù', text: 'Tes dari gurumu: ' + T.ti, url: testUrl(T) })) { if (T.st === 'antre') T.st = 'terkirim'; saveG(); draw(); } },
    share: async () => { const url = linkUrl(); try { if (navigator.share) return await navigator.share({ title: 'Xiǎobù Guru', text: 'Buka tautan ini di HP untuk tersambung dengan gurumu di Xiǎobù:', url }); await navigator.clipboard.writeText(url); toast('Tautan disalin'); } catch (e) { if (e && e.name !== 'AbortError') toast(url, 6000); } },
    recode: () => { if (!U.recode) { U.recode = true; return draw(); } U.recode = false; disconnect(); G.code = newCode(); saveG(); connect(); draw(); },
    ask: () => { send({ t: 'halo' }); toast('Meminta data terbaru…', 1500); },
    msg: () => { const v = U.msg.trim(); if (!v) return; if (!U.online) return toast('Murid sedang offline.'); send({ t: 'pesan', txt: v }); U.msg = ''; toast('Pesan terkirim'); draw(); },
    src: b => { G.draft.src = b.dataset.v; U.tab = 'tes'; saveG(); draw(); },
    lespick: b => { const n = +b.dataset.v; const l = G.draft.les; G.draft.les = l.includes(n) ? l.filter(x => x !== n) : l.concat(n); saveG(); draw(); },
    type: b => { const k = b.dataset.v; const l = G.draft.types; G.draft.types = l.includes(k) ? l.filter(x => x !== k) : l.concat(k); if (!G.draft.types.length) G.draft.types = [k]; saveG(); draw(); },
    n: b => { G.draft.n = +b.dataset.v; saveG(); draw(); },
    mode: b => { G.draft.mode = b.dataset.v; saveG(); draw(); },
    make: () => makeTest(),
    resend: b => { const T = G.tests.find(x => x.id === b.dataset.v); if (T) { sendTest(T); saveG(); toast('Tes dikirim ulang'); draw(); } },
    cancel: b => { G.tests = G.tests.filter(x => x.id !== b.dataset.v); saveG(); draw(); },
    detail: b => { U.tab = 'riwayat'; U.open = U.open === b.dataset.v ? null : b.dataset.v; draw(); },
    del: b => { G.tests = G.tests.filter(x => x.id !== b.dataset.v); U.open = null; saveG(); draw(); },
    retest: b => { const T = G.tests.find(x => x.id === b.dataset.v); if (!T || !T.res) return; G.draft.src = 'miss'; G.draft.ti = 'Ulang: ' + T.ti; U.tab = 'tes'; saveG(); draw(); scrollTo(0, 0); },
    les: b => { U.les = +b.dataset.v; U.tab = 'materi'; draw(); scrollTo(0, 0); },
    lesback: () => { U.les = null; draw(); },
    testles: b => { G.draft.src = 'les'; G.draft.les = [+b.dataset.v]; U.tab = 'tes'; saveG(); draw(); scrollTo(0, 0); },
    oshow: () => { U.oral.show = !U.oral.show; draw(); },
    otag: b => { const o = U.oral; const k = b.dataset.v; o.tags = o.tags.includes(k) ? o.tags.filter(x => x !== k) : o.tags.concat(k); draw(); },
    form: b => { G.draft.form = b.dataset.v; saveG(); draw(); },
    role: b => { G.draft.role = +b.dataset.v; saveG(); draw(); },
    sendres: async b => { const T = G.tests.find(x => x.id === b.dataset.v); if (!T || !T.res) return; const pk = oralPack(T);
      if (U.online) { send(Object.assign({ t: 'lisan' }, pk)); T.sent = 1; saveG(); toast('Hasil terkirim ke HP murid'); return draw(); }
      if (await share({ title: 'Xiǎobù', text: `Hasil tes lisan "${T.ti}": ${pk.r.ok}/${pk.r.n}`, url: baseUrl() + '?lisan=' + b64u(pk) })) { T.sent = 1; saveG(); draw(); } },
    ograde: b => oralGrade(+b.dataset.v),
    oquit: () => oralEnd(false)
  };
  root.addEventListener('click', e => { const b = e.target.closest('[data-g]'); if (!b || b.disabled) return; const f = A[b.dataset.g]; if (f) { try { f(b); } catch (err) { console.error('guru', b.dataset.g, err); toast('Ups, ada gangguan kecil. Coba lagi.'); } } });
  root.addEventListener('input', e => { const k = e.target.dataset && e.target.dataset.i; if (!k) return; const v = e.target.value; if (k === 'nm') { G.nm = v.slice(0, 24); saveG(); } else if (k === 'msg') U.msg = v; else if (k === 'ti' || k === 'note') { G.draft[k] = v; saveG(); } else if (k === 'mirror') { G.draft.mirror = !!e.target.checked; saveG(); } });
  root.addEventListener('change', e => {
    if (!e.target.dataset || e.target.dataset.i !== 'file' || !e.target.files[0]) return; const fr = new FileReader();
    fr.onload = () => { try { const d = JSON.parse(fr.result); if (!d || !d.p || !Array.isArray(d.p.c)) throw 0; onMsg({ t: 'profil', p: d.p }); toast('Profil murid diperbarui'); U.tab = 'murid'; draw(); } catch (err) { toast('File ini bukan profil Xiǎobù.'); } };
    fr.readAsText(e.target.files[0]);
  });
  root.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.dataset && e.target.dataset.i === 'msg') { e.target.blur(); A.msg(); } });

  window.XB_GURU = { G: () => G, U, onMsg, onSync, buildItems, buildOral, oralPack, pool, draw, connect, disconnect };
  try {
    const u = new URL(location.href); const h = u.searchParams.get('hasil');
    if (h) { u.searchParams.delete('hasil'); history.replaceState(null, '', u.pathname + u.search + u.hash); const r = unb64u(h); if (r && r.id) { onMsg({ t: 'hasil', r }); U.tab = 'riwayat'; U.open = r.id; } }
  } catch (e) { toast('Tautan hasil tidak terbaca.'); }
  draw();
  if (!/[?&]offline=1/.test(location.search)) connect();
  document.addEventListener('visibilitychange', () => { if (!document.hidden && !U.ch && !U.busy) connect(); });
  addEventListener('online', () => { if (!U.ch) connect(); });
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
})();
