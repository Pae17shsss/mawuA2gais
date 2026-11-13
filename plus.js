/* ========== plus.js — Xiǎobù Kelas V1.8 ==========
   Tiga tambahan di sisi murid, dimuat sesudah app.js dan sebelum peak.js:
     1. Buku kesalahan  — setiap jawaban salah di sesi mana pun dicatat, lalu diulang sampai dua kali benar.
     2. Latihan bicara  — ucapkan kata, app menilai per suku kata (mesin penilai milik game "Ucapkan!").
     3. Sambungan guru  — HP murid tersambung ke app Guru (guru.html) lewat kode: profil belajar dikirim,
                          tes dari guru diterima, jawaban dan hasil dikirim balik secara langsung.
   Pola sama dengan modul lain: membungkus fungsi global lama (answer, showSummary, render, boot). */
(function () {
  'use strict';
  const PL = window.XB_PLUS = {};
  const isObj = x => !!x && typeof x === 'object' && !Array.isArray(x);
  ICON_PATHS.send = ICON_PATHS.send || '<path d="M21 3 10.2 13.8M21 3l-6.8 18-4-7.2L3 9.8z"/>';
  ICON_PATHS.wifi = ICON_PATHS.wifi || '<path d="M2.5 9a14 14 0 0 1 19 0M5.6 12.4a9.4 9.4 0 0 1 12.8 0M8.8 15.8a4.8 4.8 0 0 1 6.4 0"/><circle cx="12" cy="19" r="1"/>';

  /* =====================================================================
     1. BUKU KESALAHAN
     S.mis = { 'w:<id kata>' | 'c:<huruf>': { n: berapa kali salah, ok: benar berturut sesudahnya, d: hari terakhir salah, ty: jenis soal } }
     ===================================================================== */
  const MIS_MAX = 300, MIS_CLEAR = 2;
  function misS() { if (!isObj(S.mis)) S.mis = {}; return S.mis; }
  function misKey(it) {
    if (!it || it.place) return null;
    if (it.wid !== undefined && W[it.wid]) return 'w:' + it.wid;
    if (it.type === 'hz' && typeof it.ch === 'string' && it.ch) return 'c:' + it.ch;
    return null;
  }
  function misNote(it, ok) {
    const k = misKey(it); if (!k) return; const m = misS();
    if (!ok) {
      const e = m[k] || (m[k] = { n: 0 }); e.n++; e.ok = 0; e.d = todayKey(); e.ty = it.type;
      const ks = Object.keys(m);
      if (ks.length > MIS_MAX) ks.sort((a, b) => (m[a].d < m[b].d ? -1 : 1)).slice(0, ks.length - MIS_MAX).forEach(x => delete m[x]);
    } else if (m[k]) { m[k].ok = (m[k].ok || 0) + 1; if (m[k].ok >= MIS_CLEAR) delete m[k]; }
  }
  function misList() {
    const m = misS();
    return Object.keys(m).filter(k => (k[0] === 'w' ? !!W[+k.slice(2)] : !!k.slice(2))).map(k => [k, m[k]]).sort((a, b) => b[1].n - a[1].n || (a[1].d < b[1].d ? 1 : -1));
  }
  const typeOK = (ty, i) => { const w = W[i]; return ty === 'tone' ? toneQuizOK(w) : ty === 'type' ? aligned(w) : ty === 'listen' ? voiceOK() : (ty === 'mc_mean' || ty === 'mc_hanzi') ? !!w.m : false; };
  function misBuild(n = 15) {
    return misList().slice(0, n).map(([k, e]) => {
      if (k[0] === 'c') return { type: 'hz', ch: k.slice(2) };
      const i = +k.slice(2); return { type: typeOK(e.ty, i) ? e.ty : safeType(i), wid: i, hint: e.n >= 3 };
    });
  }
  PL.mis = { note: misNote, list: misList, build: misBuild, key: misKey };

  /* =====================================================================
     2. LATIHAN BICARA
     S.spk = { <id kata>: { p: nilai terbaik terakhir (0–100), n: berapa kali dilatih, d: hari, s: 1 bila dinilai sendiri } }
     ===================================================================== */
  function spkS() { if (!isObj(S.spk)) S.spk = {}; return S.spk; }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  let SPK = null;
  function spkPick(n = 8) {
    const s = spkS(); const learned = Object.keys(S.cards).map(Number).filter(i => W[i] && lgOkW(i));
    const weak = learned.filter(i => s[i] && s[i].p < 80).sort((a, b) => s[a].p - s[b].p);
    const fresh = shuffle(learned.filter(i => !s[i]));
    const rest = shuffle(learned.filter(i => s[i] && s[i].p >= 80));
    return [...new Set([...weak.slice(0, Math.ceil(n / 2)), ...fresh, ...rest])].slice(0, n);
  }
  function spkOpen(ids, opts = {}) {
    const items = (ids || []).filter(i => W[i] && lgOkW(i)).map(i => lgWItem(i));
    if (!items.length) { toast(t('Belum ada kata untuk dilatih — pelajari beberapa kata dulu 🌱')); if (opts.onDone) opts.onDone([]); return; }
    spkClose(true); closeModal(); hushAll(); FX.ensure();
    SPK = { items, i: 0, res: [], opts, mode: SR ? 'sr' : 'self', q: null, lang: 'zh-TW', run: Math.random() };
    const el = document.createElement('div'); el.id = 'plspk'; el.className = 'pl-spk'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true');
    document.body.appendChild(el); document.body.classList.add('pl-lock');
    el.addEventListener('click', spkClick);
    spkAsk();
  }
  function spkClose(silent) {
    const el = document.getElementById('plspk'); if (el) el.remove(); document.body.classList.remove('pl-lock');
    if (SPK && SPK.q && SPK.q.rec) { try { SPK.q.rec.abort(); } catch (e) {} }
    const s = SPK; SPK = null; try { TTS.stop(); } catch (e) {}
    if (s && !silent && s.opts.onDone) s.opts.onDone(s.res);
  }
  function spkAsk() {
    SPK.q = { item: SPK.items[SPK.i], best: null, tries: 0, listening: false, heard: '', msg: '' };
    spkDraw(); const run = SPK.run, i = SPK.i; setTimeout(() => { if (SPK && SPK.run === run && SPK.i === i && !SPK.opts.noModel) lgSay(SPK.q.item.zh); }, 300);
  }
  function spkDraw() {
    const el = document.getElementById('plspk'); if (!el || !SPK) return;
    const q = SPK.q, it = q.item, r = q.best; const hz = [...it.zh].filter(isHan);
    const chars = hz.map((c, k) => `<span class="${r && r.marks ? 'm-' + r.marks[k] : ''}">${esc(c)}</span>`).join('');
    const syl = it.sy.map((x, k) => `<span class="pl-syl ${r && r.marks ? 'm-' + r.marks[k] : ''}"><b class="t${x.tone}">${esc(x.y)}</b></span>`).join('');
    let mic;
    if (SPK.mode === 'sr') mic = `<button class="pl-mic ${q.listening ? 'on' : ''}" data-p="mic" aria-label="${t('Tekan lalu ucapkan')}">${ICON('mic')}</button><div class="pl-mict">${q.listening ? `<b>${t('Mendengarkan…')}</b> <span class="hz" id="plheard">${esc(q.heard)}</span>` : esc(t(q.tries ? 'Coba lagi?' : 'Tekan lalu ucapkan'))}</div>`;
    else mic = `<div class="pl-mict">${t('Ucapkan keras-keras sambil mendengar model, lalu nilai sendiri.')}</div><div class="pl-rate"><button class="btn sec ok" data-p="rate" data-v="100">${t('Pas')}</button><button class="btn sec" data-p="rate" data-v="65">${t('Mirip')}</button><button class="btn sec bad" data-p="rate" data-v="25">${t('Belum')}</button></div>`;
    const res = r ? `<div class="pl-res ${r.pct >= 80 ? 'ok' : r.pct >= 50 ? 'part' : 'bad'}"><b class="pl-pct">${r.pct}%</b><div class="grow"><b>${r.pct >= 80 ? t('Pas! Pelafalanmu jelas.') : r.pct >= 50 ? t('Mirip! Perhatikan suku kata berwarna.') : t('Belum pas. Dengar model lalu coba lagi.')}</b><div class="small muted">${t('Terdengar')}: <span class="hz">${esc(r.heard || '—')}</span></div>${r.marks && r.marks.includes('tone') ? `<div class="small">${t('Kuning = bunyinya benar, nadanya kemungkinan meleset.')}</div>` : ''}</div></div>` : '';
    el.innerHTML = `<div class="pl-top"><button class="btn ghost" data-p="quit" aria-label="${t('Tutup')}">✕</button><div class="bar"><i style="width:${Math.round(SPK.i / SPK.items.length * 100)}%"></i></div><span class="small muted">${SPK.i + 1}/${SPK.items.length}</span></div>
      <div class="pl-body"><div class="s-card glass pl-ucard">
        <div class="q-kind">${ICON('mic')} ${esc(SPK.opts.title || t('Latihan bicara'))}</div>
        <div class="pl-uhz hz ${hz.length > 4 ? 'long' : ''}">${chars}</div>
        <div class="pl-syls">${syl}</div>
        ${it.tr ? `<div class="muted">${esc(it.tr)}</div>` : ''}
        <div class="row" style="justify-content:center;gap:8px"><button class="btn sec small" data-p="say">${ICON('speaker')} ${t('Model')}</button><button class="btn ghost small" data-p="slow">🐢 ${t('pelan')}</button></div>
      </div>
      <div class="pl-micw">${mic}${q.msg ? `<div class="notice">${q.msg}</div>` : ''}${res}</div></div>
      <div class="pl-foot"><button class="btn ghost" data-p="skip">${t('Lewati')}</button>${r ? `<button class="btn pri" data-p="next">${SPK.i + 1 >= SPK.items.length ? t('Selesai') : t('Lanjut')} ${ICON('chevron')}</button>` : ''}</div>`;
  }
  function spkMic() {
    const q = SPK.q; if (q.listening) { try { q.rec.stop(); } catch (e) {} return; }
    let rec; try { TTS.stop(); rec = new SR(); } catch (e) { SPK.mode = 'self'; return spkDraw(); }
    const run = SPK.run; rec.lang = SPK.lang; rec.interimResults = true; rec.maxAlternatives = 5; rec.continuous = false;
    q.listening = true; q.rec = rec; q.heard = ''; q.err = null; q.msg = ''; let got = null;
    rec.onresult = e => {
      let interim = ''; const alts = [];
      for (let k = e.resultIndex || 0; k < e.results.length; k++) { const R = e.results[k]; if (R.isFinal) { for (let a = 0; a < R.length; a++) alts.push(R[a].transcript); } else interim += R[0].transcript; }
      if (alts.length) got = alts; if (interim) { q.heard = interim; const h = document.getElementById('plheard'); if (h) h.textContent = interim; }
    };
    rec.onerror = e => { q.err = e && e.error; };
    rec.onend = () => {
      clearTimeout(q.recT); if (!SPK || SPK.run !== run || SPK.q !== q) return; q.listening = false;
      if (!got && q.heard) got = [q.heard];
      if (got && got.some(x => lgHanOnly(x))) { q.tries++; const r = lgPron(q.item, got); if (!q.best || r.pct >= q.best.pct) q.best = r; FX.play(r.pct >= 80 ? 'ok' : r.pct >= 50 ? 'flip' : 'bad', 3); return spkDraw(); }
      if (q.err === 'language-not-supported' && SPK.lang !== 'zh-CN') { SPK.lang = 'zh-CN'; spkDraw(); return spkMic(); }
      if (['not-allowed', 'service-not-allowed', 'audio-capture'].includes(q.err)) { SPK.mode = 'self'; q.msg = t('Mikrofon tidak bisa dipakai (izin ditolak atau tidak ada). Ucapkan keras-keras, lalu nilai sendiri — atau lewati.'); return spkDraw(); }
      if (q.err === 'network') { SPK.mode = 'self'; q.msg = t('Pengenal suara butuh internet. Ucapkan keras-keras, lalu nilai sendiri.'); return spkDraw(); }
      q.msg = t('Belum terdengar. Tekan mikrofon lalu ucapkan dengan jelas.'); spkDraw();
    };
    try { rec.start(); } catch (e) { q.listening = false; SPK.mode = 'self'; return spkDraw(); }
    q.recT = setTimeout(() => { try { rec.stop(); } catch (e) {} }, 9000);
    spkDraw();
  }
  function spkScore(pct, self, skipped) {
    const q = SPK.q; const i = q.item.i; const rec = { i, pct: skipped ? null : pct, self: self ? 1 : 0, heard: q.best ? q.best.heard : '' };
    SPK.res.push(rec);
    if (!skipped) {
      const s = spkS(); const e = s[i] || (s[i] = { n: 0 }); e.p = pct; e.n++; e.d = todayKey(); if (self) e.s = 1; else delete e.s;
      const d = dayRec(); d.spk = (d.spk || 0) + 1; if (pct >= 80) d.ok++; else d.bad++;
      addXP(pct >= 80 ? 8 : 3); save();
    }
    if (SPK.opts.onItem) { try { SPK.opts.onItem(rec, SPK.i); } catch (e) {} }
    SPK.i++; if (SPK.i >= SPK.items.length) return spkEnd(); spkAsk();
  }
  function spkEnd() {
    const el = document.getElementById('plspk'); const rs = SPK.res.filter(r => r.pct !== null); const avg = rs.length ? Math.round(rs.reduce((a, r) => a + r.pct, 0) / rs.length) : 0;
    SPK.done = true;
    el.innerHTML = `<div class="pl-body"><div class="s-card glass summary"><div class="sum-hero">${mascot(avg >= 80 ? 'wow' : avg >= 50 ? 'joy' : 'think', 130)}</div><h1>${t(avg >= 80 ? 'Pelafalanmu jelas!' : avg >= 50 ? 'Sudah mirip, lanjutkan!' : 'Butuh latihan lagi — itu wajar.')}</h1>
      <div class="kpis"><div class="kpi"><b>${avg}%</b><span>${t('rata-rata')}</span></div><div class="kpi"><b>${rs.filter(r => r.pct >= 80).length}/${SPK.res.length}</b><span>${t('pas')}</span></div></div>
      <div class="pl-list">${SPK.res.map(r => `<span class="chip ${r.pct === null ? '' : r.pct >= 80 ? 'ok' : r.pct >= 50 ? 'part' : 'bad'}"><span class="hz">${esc(W[r.i].w)}</span> ${r.pct === null ? '–' : r.pct + '%'}</span>`).join('')}</div>
      <div class="row wrap" style="justify-content:center"><button class="btn pri" data-p="quit">${t('Selesai')}</button></div></div></div>`;
    FX.play('level');
  }
  function spkClick(e) {
    const b = e.target.closest('[data-p]'); if (!b || !SPK) return; const a = b.dataset.p;
    if (a === 'quit') return spkClose();
    if (SPK.done) return;
    if (a === 'say') return lgSay(SPK.q.item.zh);
    if (a === 'slow') return lgSay(SPK.q.item.zh, true);
    if (a === 'mic') return spkMic();
    if (a === 'rate') return spkScore(+b.dataset.v, true);
    if (a === 'skip') return spkScore(0, false, true);
    if (a === 'next' && SPK.q.best) return spkScore(SPK.q.best.pct, false);
  }
  PL.spk = { open: spkOpen, close: spkClose, pick: spkPick, state: () => SPK };

  /* =====================================================================
     3. SAMBUNGAN GURU (sisi murid)
     S.guru = { code, log: [hasil tes], out: [hasil yang belum diterima guru], pend: tes yang belum dikerjakan, msg }
     Saluran: Supabase Realtime yang sama dengan Duel (NET), topik xbduel-guru-<KODE>.
     ===================================================================== */
  const G_TOPIC = c => 'xbduel-guru-' + c;
  const G_TYPES = ['mc_mean', 'mc_hanzi', 'listen', 'tone', 'type'];
  const GL = { ch: null, st: 'off', guru: false, busy: false, nm: '' };
  let GT = null;   // tes yang sedang dikerjakan
  function gS() {
    if (!isObj(S.guru)) S.guru = {}; const g = S.guru;
    if (typeof g.code !== 'string') g.code = ''; if (!Array.isArray(g.log)) g.log = []; if (!Array.isArray(g.out)) g.out = [];
    return g;
  }
  const gCode = v => String(v || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
  function gProfile() {
    const tk = todayKey(); const c = []; const rec = [];
    Object.keys(S.cards).forEach(k => { const i = +k, cd = S.cards[k]; if (!W[i] || !cd) return; c.push(i, mastery(cd), Math.min(9, cd.lp || 0)); if (cd.add && keyDiff(cd.add, tk) <= 7) rec.push(i); });
    const days = []; for (let d = 0; d < 7; d++) { const r = S.days[keyAdd(tk, -d)] || {}; days.push([Math.round((r.ms || 0) / 60000), r.new || 0, r.ok || 0, r.bad || 0]); }
    let kd = [], kr = {}, kb = [];
    try { const k = klState(); kd = Object.keys(k.done).filter(n => k.done[n]).map(Number); kr = k.r; } catch (e) {}
    try { kb = Object.keys(kbS().done || {}).filter(n => kbS().done[n]).map(Number); } catch (e) {}
    return { v: 1, nm: S.name || '', xp: S.xp || 0, st: (S.streak && S.streak.cur) || 0, c, rec, days, kd, kr, kb,
      mis: misList().slice(0, 80).map(([k, e]) => [k, e.n]), spk: Object.keys(spkS()).map(i => [+i, spkS()[i].p]), at: Date.now() };
  }
  const gSend = p => { try { NET.send(GL.ch, p); } catch (e) {} };
  /* jalur cadangan tanpa server: tautan (tes & hasil) dan file (profil), dikirim lewat aplikasi obrolan apa pun */
  const b64u = o => btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const unb64u = s => JSON.parse(decodeURIComponent(escape(atob(String(s).replace(/-/g, '+').replace(/_/g, '/')))));
  const gBase = () => location.origin + location.pathname.replace(/index\.html$/, '');
  async function gShare(data, okMsg) {
    try { if (navigator.share && (!data.files || (navigator.canShare && navigator.canShare({ files: data.files })))) { await navigator.share(data); return true; } } catch (e) { if (e && e.name === 'AbortError') return false; }
    try {
      if (data.files) { const a = document.createElement('a'); a.href = URL.createObjectURL(data.files[0]); a.download = data.files[0].name; document.body.appendChild(a); a.click(); a.remove(); toast(t('File diunduh — kirimkan ke gurumu.'), 4000); return true; }
      await navigator.clipboard.writeText(data.url); toast(okMsg || t('Tautan disalin — tempel di obrolan dengan gurumu.'), 4000); return true;
    } catch (e) { toast(data.url || t('Tidak bisa membagikan dari browser ini.'), 6000); return false; }
  }
  PL.codec = { b64u, unb64u };
  function gFlush() { if (!GL.ch || !GL.guru) return; gS().out.forEach(r => gSend({ t: 'hasil', r })); }
  function gHello() { if (!GL.ch || !GL.guru) return; gSend({ t: 'profil', p: gProfile() }); gFlush(); }
  function gConnect() {
    const g = gS(); if (!g.code || GL.busy || GL.ch) return;
    if (typeof NET === 'undefined') return;
    GL.busy = true; GL.st = 'wait'; gPaint();
    NET.open(G_TOPIC(g.code), { id: DLX.id, role: 'murid', nm: S.name || '' }, {
      msg: gMsg,
      sync: ps => { const was = GL.guru; const gu = ps.find(p => p.role === 'guru'); GL.guru = !!gu; GL.nm = gu ? gu.nm || '' : GL.nm; if (GL.guru && !was) gHello(); gPaint(); },
      status: s => { GL.st = s === 'up' ? 'on' : 'down'; gPaint(); if (s === 'up') gHello(); }
    }).then(ch => { GL.busy = false; if (!gS().code) { NET.close(ch); return; } GL.ch = ch; GL.st = 'on'; gPaint(); gHello(); })
      .catch(() => { GL.busy = false; GL.st = 'fail'; gPaint(); });
  }
  function gDisconnect() { if (GL.ch) NET.close(GL.ch); GL.ch = null; GL.guru = false; GL.st = 'off'; gPaint(); }
  function gMsg(p) {
    if (!p || !p.t) return; const g = gS();
    if (p.t === 'halo') return gHello();
    if (p.t === 'ack') { g.out = g.out.filter(r => r.id !== p.id); save(); return gPaint(); }
    if (p.t === 'pesan' && typeof p.txt === 'string') { g.msg = { txt: p.txt.slice(0, 300), at: Date.now() }; save(); toast('💌 ' + t('Guru') + ': ' + esc(g.msg.txt), 6000, 'guru'); return decorate(); }
    if (p.t === 'soal') return gSoal(p);
    if (p.t === 'lisan' && p.r && p.r.id) return gLisan(p);
    if (p.t === 'tes' && p.tes && Array.isArray(p.tes.items)) {
      const T = p.tes; const items = T.items.filter(x => x && W[x.w] && (x.k === 'ucap' || G_TYPES.includes(x.k))).slice(0, 60).map(x => ({ k: x.k, w: +x.w }));
      if (!items.length) return;
      g.pend = { id: String(T.id).slice(0, 24), ti: String(T.ti || '').slice(0, 80), note: String(T.note || '').slice(0, 200), items, at: Date.now() }; save();
      gSend({ t: 'terima', id: g.pend.id }); gOffer(); decorate();
    }
  }
  /* tes lisan: soal yang sedang ditanyakan guru ikut tampil di HP murid */
  function gSoal(q) {
    let el = document.getElementById('plsoal');
    if (q.end) { if (el) el.remove(); return; }
    if (SES || SPK) return;
    if (!el) { el = document.createElement('div'); el.id = 'plsoal'; el.className = 'pl-soal'; el.setAttribute('role', 'dialog'); document.body.appendChild(el); el.addEventListener('click', e => { if (e.target.closest('[data-x]')) el.remove(); }); closeModal(); }
    el.innerHTML = `<div class="pl-stop"><span class="small muted">🎤 ${esc(String(q.ti || t('Tes lisan')).slice(0, 60))} · ${+q.i || 1}/${+q.n || 1}</span><button class="btn ghost" data-x="1" aria-label="${t('Tutup')}">✕</button></div>
      <div class="pl-sbody"><p class="pl-sask">${esc(String(q.ask || '').slice(0, 120))}</p><div class="pl-sbig ${q.hz ? 'hz' : ''}">${esc(String(q.big || '').slice(0, 200)).replace(/\n/g, '<br>')}</div></div>`;
  }
  /* hasil tes lisan dari guru: masuk riwayat, dan kata yang salah masuk buku kesalahan */
  function gLisan(q) {
    const g = gS(); const r = q.r; const id = String(r.id).slice(0, 24); const dup = g.log.some(x => x.id === id);
    const salah = (Array.isArray(q.salah) ? q.salah : []).filter(i => W[i]).slice(0, 60);
    if (!dup) salah.forEach(i => misNote({ type: 'mc_mean', wid: +i }, false));
    g.log = [{ id, ti: String(r.ti || t('Tes lisan')).slice(0, 80), n: +r.n || 0, ok: +r.ok || 0, spk: null, at: +r.at || Date.now(), lisan: 1 }].concat(g.log.filter(x => x.id !== id)).slice(0, 30);
    save(); gSoal({ end: 1 }); decorate();
    const tags = q.tags && typeof q.tags === 'object' ? Object.keys(q.tags).slice(0, 6).map(k => `<span class="chip">${esc(k)} ×${+q.tags[k] || 1}</span>`).join('') : '';
    if (SES || SPK) return toast(t('🎤 Hasil tes lisan: {a}/{n}', { a: g.log[0].ok, n: g.log[0].n }), 5000, 'guru');
    openModal(`<div class="pl-offer">${mascot(g.log[0].n && g.log[0].ok / g.log[0].n >= 0.8 ? 'wow' : 'joy', 96)}<h2>${t('Hasil tes lisan')}</h2><p><b>${esc(g.log[0].ti)}</b></p><div class="kpis"><div class="kpi"><b>${g.log[0].ok}/${g.log[0].n}</b><span>${t('benar')}</span></div></div>
      ${tags ? `<p class="small muted">${t('Catatan guru')}:</p><div class="pl-list" style="justify-content:center">${tags}</div>` : ''}
      ${salah.length ? `<p class="muted">${t('{n} kata yang salah masuk ke Buku kesalahan.', { n: salah.length })}</p>` : ''}
      <div class="row wrap" style="justify-content:center"><button class="btn sec" data-a="close">${t('Tutup')}</button>${salah.length ? `<button class="btn pri" data-a="misrun">${t('Ulang sekarang')}</button>` : ''}</div></div>`);
  }
  function gOffer() {
    const T = gS().pend; if (!T) return;
    if (SES || SPK || GT) return toast(t('📨 Guru mengirim tes — selesaikan dulu yang sedang berjalan'), 4000, 'guru');
    const nu = T.items.filter(x => x.k === 'ucap').length; const nw = T.items.length - nu;
    openModal(`<div class="pl-offer">${mascot('wow', 96)}<h2>${t('Tes dari guru')}</h2><p><b>${esc(T.ti || t('Tes kosakata'))}</b></p>
      <p class="muted">${nw ? t('{n} soal', { n: nw }) : ''}${nw && nu ? ' + ' : ''}${nu ? t('{n} ucapan', { n: nu }) : ''}${T.note ? '<br>' + esc(T.note) : ''}</p>
      <div class="row wrap" style="justify-content:center"><button class="btn sec" data-a="close">${t('Nanti')}</button><button class="btn pri" data-a="gurustart">${t('Mulai tes')} ${ICON('chevron')}</button></div></div>`);
  }
  function gStart() {
    const g = gS(); const T = g.pend; if (!T) return; closeModal();
    if (SES) return toast(t('Selesaikan atau tutup sesi yang sedang berjalan dulu ✨'));
    GT = { id: T.id, ti: T.ti, items: T.items, res: T.items.map(() => null), t0: Date.now(), spk: T.items.map((x, k) => (x.k === 'ucap' ? k : -1)).filter(k => k >= 0), wdone: false };
    const items = T.items.map((x, k) => (x.k === 'ucap' ? null : { type: typeOK(x.k, x.w) ? x.k : safeType(x.w), wid: x.w, gi: k })).filter(Boolean);
    if (items.length) startSession(items, { title: t('Tes dari guru'), guru: T.id });
    else gSpeak();
  }
  function gNote(it, ok, ms) {
    if (!GT || !SES || SES.opts.guru !== GT.id || it.gi === undefined || GT.res[it.gi]) return;
    GT.res[it.gi] = [ok ? 1 : 0, Math.round(ms / 100) / 10]; gSend({ t: 'jwb', id: GT.id, i: it.gi, ok: ok ? 1 : 0 });
  }
  function gSpeak() {
    if (!GT) return; const ids = GT.spk.map(k => GT.items[k].w);
    spkOpen(ids, { title: t('Tes dari guru · bicara'), onItem: (r, n) => { const gi = GT.spk.find(k => GT.items[k].w === r.i && !GT.res[k]); if (gi === undefined) return; GT.res[gi] = [r.pct !== null && r.pct >= 80 ? 1 : 0, 0, r.pct === null ? -1 : r.pct, r.self]; gSend({ t: 'jwb', id: GT.id, i: gi, ok: GT.res[gi][0], pct: GT.res[gi][2] }); },
      onDone: () => gFinish(true) });
  }
  function gFinish(all) {
    if (!GT) return; const g = gS(); const n = GT.items.length; const ok = GT.res.filter(r => r && r[0]).length; const done = GT.res.filter(Boolean).length;
    const sp = GT.res.filter(r => r && r[2] >= 0).map(r => r[2]); const avg = sp.length ? Math.round(sp.reduce((a, b) => a + b, 0) / sp.length) : null;
    const r = { id: GT.id, ti: GT.ti, n, ok, done, det: GT.res, spk: avg, dur: Math.round((Date.now() - GT.t0) / 1000), at: Date.now(), part: all ? 0 : 1 };
    g.out = g.out.filter(x => x.id !== r.id).concat([r]).slice(-10);
    g.log = [{ id: r.id, ti: r.ti, n, ok, spk: avg, at: r.at }].concat(g.log.filter(x => x.id !== r.id)).slice(0, 30);
    if (all || !GT.spk.length) { if (g.pend && g.pend.id === GT.id) g.pend = null; GT = null; }
    save(); gFlush(); decorate();
  }
  PL.guru = { state: gS, link: GL, profile: gProfile, connect: gConnect, disconnect: gDisconnect, msg: gMsg, start: gStart, test: () => GT };

  /* ---------- kait ke mesin sesi ---------- */
  const answer0 = answer;
  answer = function (ok) {
    const live = !!SES && !SES.answered; const it = live ? cur() : null; const ms = live ? Date.now() - SES.shown : 0;
    const r = answer0.apply(this, arguments);
    if (it) { try { misNote(it, !!ok); gNote(it, !!ok, ms); } catch (e) { console.warn('plus answer', e); } }
    return r;
  };
  const showSummary0 = showSummary;
  showSummary = function () {
    const ses = SES; const fresh = ses && !ses.summarized;
    const r = showSummary0.apply(this, arguments);
    if (!fresh || !ses.opts) return r;
    try {
      const sum = document.querySelector('#sbody .summary'); const k0 = sum && sum.querySelector('.kpis');
      if (ses.opts.mis && k0) { const left = misList().length; k0.insertAdjacentHTML('afterend', `<div class="notice">${left ? t('{n} kesalahan masih di buku — dua kali benar baru dicoret.', { n: left }) : t('Buku kesalahan kosong. Mantap! 🎉')}</div>`); }
      if (ses.opts.guru && GT && GT.id === ses.opts.guru) {
        const more = GT.spk.length; gFinish(!more);
        if (k0) k0.insertAdjacentHTML('afterend', `<div class="notice">${GL.guru ? t('Hasil dikirim ke guru ✓') : t('Hasil disimpan — dikirim otomatis saat guru tersambung.')}</div>${more ? `<div class="row" style="justify-content:center"><button class="btn pri" id="pl-gspk">${ICON('mic')} ${t('Lanjut: bagian bicara ({n})', { n: more })}</button></div>` : ''}`);
        const b = document.getElementById('pl-gspk'); if (b) b.onclick = () => { endSession(false, true); gSpeak(); };
      }
      if (GL.ch && GL.guru) gSend({ t: 'profil', p: gProfile() });   // guru selalu melihat keadaan sesudah sesi terakhir
    } catch (e) { console.warn('plus summary', e); }
    return r;
  };

  /* ---------- aksi ---------- */
  Object.assign(ACT, {
    misrun: () => startSession(misBuild(), { title: t('Buku kesalahan'), mis: 1, rebuild: () => misBuild() }),
    misdrop: b => { delete misS()[b.dataset.v]; save(); render(); },
    spkgo: () => spkOpen(spkPick(8), { onDone: () => render() }),
    spkweak: () => { const s = spkS(); spkOpen(Object.keys(s).map(Number).filter(i => s[i].p < 80).sort((a, b) => s[a].p - s[b].p).slice(0, 8), { onDone: () => render() }); },
    guruset: () => { const el = document.getElementById('pl-gcode'); const c = gCode(el && el.value); if (c.length < 4) return toast(t('Masukkan kode dari app Guru (minimal 4 huruf).')); gDisconnect(); gS().code = c; save(); gConnect(); render(); },
    guruoff: () => { gDisconnect(); gS().code = ''; save(); render(); },
    gururetry: () => { gDisconnect(); gConnect(); },
    gurustart: () => gStart(),
    gurufile: () => gShare({ files: [new File([JSON.stringify({ xbg: 1, p: gProfile() })], 'xiaobu-profil-' + todayKey() + '.json', { type: 'application/json' })], title: 'Xiǎobù', text: t('Profil belajar Xiǎobù saya — buka di app Guru lewat "Impor file murid".') }),
    guruout: async b => { const g = gS(); const r = g.out.find(x => x.id === b.dataset.v); if (!r) return; if (await gShare({ title: 'Xiǎobù', text: t('Hasil tes saya: {a}/{n}', { a: r.ok, n: r.n }), url: gBase() + 'guru.html?hasil=' + b64u(r) })) { g.out = g.out.filter(x => x.id !== r.id); save(); render(); } },
    guruoffer: () => gOffer()
  });
  ['misrun', 'spkgo', 'spkweak', 'gurustart'].forEach(a => START_ACTS.add(a));

  /* ---------- kartu di halaman ---------- */
  const gStatus = () => (!gS().code ? '' : GL.st === 'wait' ? t('menyambung…') : GL.st === 'fail' || GL.st === 'down' ? t('tidak tersambung') : GL.ch ? (GL.guru ? t('guru sedang online') : t('tersambung — guru belum membuka app')) : t('belum tersambung'));
  function gPaint() { const el = document.getElementById('pl-gst'); if (el) { el.textContent = gStatus(); el.className = 'pl-gst ' + (GL.guru ? 'on' : GL.ch ? 'mid' : 'off'); } }
  function misCard() {
    const L = misList(); const top = L.slice(0, 10);
    return `<section class="card glass pl-x pl-card" id="pl-mis"><div class="row" style="gap:12px;align-items:center">${TILE('undo', 'lg tint c8')}<div class="grow" style="min-width:0"><h2 style="margin:0">${t('Buku kesalahan')} · <span class="hz">錯題本</span></h2><p class="small muted" style="margin:2px 0 0">${t('Jawaban salah dari semua menu terkumpul di sini. Dua kali benar, baru dicoret.')}</p></div></div>
      ${L.length ? `<div class="pl-list">${top.map(([k, e]) => { const w = k[0] === 'w' ? W[+k.slice(2)] : null; return `<span class="chip"><span class="hz">${esc(w ? w.w : k.slice(2))}</span>${w ? ' ' + esc(shortMean(meanP(w))) : ''} <b class="pl-n">×${e.n}</b></span>`; }).join('')}${L.length > top.length ? `<span class="chip muted">+${L.length - top.length}</span>` : ''}</div>
      <div class="row wrap" style="margin-top:12px"><button class="btn pri" data-a="misrun">${ICON('undo')} ${t('Ulang {n} kesalahan', { n: Math.min(15, L.length) })}</button></div>` : `<div class="notice" style="margin-top:12px">${t('Belum ada kesalahan tercatat. Saat kamu salah menjawab, soalnya otomatis masuk ke sini.')}</div>`}</section>`;
  }
  function spkCard() {
    const s = spkS(); const ids = Object.keys(s).map(Number).filter(i => W[i]); const weak = ids.filter(i => s[i].p < 80).sort((a, b) => s[a].p - s[b].p);
    const avg = ids.length ? Math.round(ids.reduce((a, i) => a + s[i].p, 0) / ids.length) : null;
    return `<section class="card glass pl-x pl-card" id="pl-spk"><div class="row" style="gap:12px;align-items:center">${TILE('mic', 'lg tint c1')}<div class="grow" style="min-width:0"><h2 style="margin:0">${t('Latihan bicara')} · <span class="hz">口說</span></h2><p class="small muted" style="margin:2px 0 0">${SR ? t('Ucapkan kata yang sudah kamu pelajari — app menilai tiap suku kata.') : t('Browser ini tidak punya pengenal suara: kamu menilai sendiri setelah mendengar model.')}</p></div></div>
      ${ids.length ? `<div class="small muted" style="margin-top:10px">${t('{n} kata pernah dilatih · rata-rata {p}%', { n: ids.length, p: avg })}</div>` : ''}
      ${weak.length ? `<div class="pl-list">${weak.slice(0, 8).map(i => `<span class="chip"><span class="hz">${esc(W[i].w)}</span> <b class="pl-n">${s[i].p}%</b></span>`).join('')}</div>` : ''}
      <div class="row wrap" style="margin-top:12px"><button class="btn pri" data-a="spkgo">${ICON('mic')} ${t('Latih 8 kata')}</button>${weak.length ? `<button class="btn sec" data-a="spkweak">${t('Ulang yang belum pas ({n})', { n: Math.min(8, weak.length) })}</button>` : ''}</div></section>`;
  }
  function guruCard() {
    const g = gS();
    const log = g.log.slice(0, 5).map(r => `<div class="set"><span class="grow" style="min-width:0">${esc(r.ti || t('Tes kosakata'))}<span class="small muted" style="display:block">${new Date(r.at).toLocaleDateString(LOCALE[S.settings.ui] || 'id-ID', { day: 'numeric', month: 'short' })}</span></span><b>${r.lisan ? '🎤 ' : ''}${r.ok}/${r.n}${r.spk !== null && r.spk !== undefined ? ' · 🎤 ' + r.spk + '%' : ''}</b></div>`).join('');
    return `<section class="card glass pl-x pl-card" id="pl-guru"><div class="row" style="gap:12px;align-items:center">${TILE('class', 'lg tint c4')}<div class="grow" style="min-width:0"><h2 style="margin:0">${t('Guru saya')} · <span class="hz">老師</span></h2><p class="small muted" style="margin:2px 0 0">${t('Sambungkan ke app Guru: guru melihat apa yang sudah kamu pelajari dan mengirim tes ke HP ini.')}</p></div></div>
      ${g.code ? `<div class="set" style="margin-top:12px"><span class="grow">${t('Kode guru')} <b>${esc(g.code)}</b><span class="pl-gst" id="pl-gst" style="display:block">${gStatus()}</span></span><button class="btn ghost small" data-a="gururetry">${ICON('refresh')}</button><button class="btn sec small" data-a="guruoff">${t('Putuskan')}</button></div>`
      : `<div class="row" style="margin-top:12px;gap:8px"><input class="search grow" id="pl-gcode" placeholder="${t('Kode dari app Guru')}" autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="8" style="min-width:0;text-transform:uppercase"><button class="btn pri" data-a="guruset">${t('Sambungkan')}</button></div>`}
      ${g.pend ? `<div class="notice" style="margin-top:12px">📨 ${t('Ada tes menunggu')}: <b>${esc(g.pend.ti || t('Tes kosakata'))}</b> <button class="btn pri small" data-a="guruoffer" style="margin-left:6px">${t('Buka')}</button></div>` : ''}
      ${g.msg ? `<div class="notice" style="margin-top:12px">💌 ${esc(g.msg.txt)}</div>` : ''}
      ${g.out.map(r => `<div class="set" style="margin-top:8px"><span class="grow" style="min-width:0">${t('Hasil belum sampai ke guru')}: <b>${esc(r.ti || t('Tes kosakata'))}</b> ${r.ok}/${r.n}<span class="small muted" style="display:block">${t('Terkirim otomatis saat guru online, atau kirim sekarang lewat tautan.')}</span></span><button class="btn sec small" data-a="guruout" data-v="${esc(r.id)}">${ICON('send')} ${t('Kirim')}</button></div>`).join('')}
      <div class="row wrap" style="margin-top:12px"><button class="btn ghost small" data-a="gurufile">${ICON('send')} ${t('Kirim profil lewat file')}</button></div>
      ${log ? `<h3 class="pk-h3">${t('Tes terakhir')}</h3>${log}` : ''}
      <p class="small muted" style="margin:10px 0 0">${t('Yang dikirim ke guru: nama, kata yang sudah dipelajari, lesson yang khatam, buku kesalahan, nilai bicara, dan menit belajar 7 hari terakhir.')}</p></section>`;
  }
  function decorate() {
    const m = document.getElementById('main'); if (!m || typeof ROUTE === 'undefined') return;
    m.querySelectorAll('.pl-x').forEach(x => x.remove());
    const first = m.querySelector('section') || m.firstElementChild; const put = html => { if (first) first.insertAdjacentHTML('afterend', html); else m.insertAdjacentHTML('beforeend', html); };
    if (ROUTE === 'memory') { put(spkCard()); put(misCard()); }
    if (ROUTE === 'me') put(guruCard());
    if (ROUTE === 'home' && gS().pend) put(`<section class="card glass pl-x pl-card pl-pend"><div class="row" style="gap:12px;align-items:center"><span style="font-size:26px">📨</span><div class="grow" style="min-width:0"><b>${t('Tes dari guru menunggu')}</b><div class="small muted">${esc(gS().pend.ti || t('Tes kosakata'))} · ${t('{n} soal', { n: gS().pend.items.length })}</div></div><button class="btn pri" data-a="guruoffer">${t('Buka')}</button></div></section>`);
  }
  PL.decorate = decorate;
  const render0 = render;
  render = function () { const r = render0.apply(this, arguments); try { decorate(); } catch (e) { console.warn('plus render', e); } return r; };

  /* ---------- nyala saat app selesai boot ---------- */
  const boot0 = boot;
  boot = function () {
    const r = boot0.apply(this, arguments);
    try {
      const u = new URL(location.href); const c = gCode(u.searchParams.get('guru'));
      const tes = u.searchParams.get('tes'); let clean = false;
      if (c.length >= 4) { gS().code = c; save(); u.searchParams.delete('guru'); clean = true; toast(t('Kode guru {c} tersimpan — menyambungkan…', { c }), 3500); }
      if (tes) { u.searchParams.delete('tes'); clean = true; try { const T = unb64u(tes); setTimeout(() => gMsg({ t: 'tes', tes: T }), 600); } catch (e) { toast(t('Tautan tes tidak terbaca.')); } }
      const ls = u.searchParams.get('lisan');
      if (ls) { u.searchParams.delete('lisan'); clean = true; try { const q = unb64u(ls); setTimeout(() => gMsg(Object.assign({ t: 'lisan' }, q)), 600); } catch (e) { toast(t('Tautan hasil tidak terbaca.')); } }
      if (clean) history.replaceState(null, '', u.pathname + u.search + u.hash);
      setTimeout(() => { if (gS().code && navigator.onLine !== false) gConnect(); }, 3000);
      document.addEventListener('visibilitychange', () => { if (!document.hidden && gS().code && !GL.ch && !GL.busy && navigator.onLine !== false) gConnect(); });
      addEventListener('online', () => { if (gS().code && !GL.ch) gConnect(); });
    } catch (e) { console.warn('plus boot', e); }
    return r;
  };
})();
