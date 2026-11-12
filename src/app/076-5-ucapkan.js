/* ===== 5. UCAPKAN! ===== */
function lgQUcap() {
  const lv = LG.lv; const nS = [0, 2, 3, 4, 4][lv]; const sentTurn = LG.sents.length && (LG.n % 8) >= 8 - nS;
  let it = null; if (sentTurn) { const s = lgPickS([8, 10, 12, 14, 16][lv]); if (s) it = lgSItem(s); }
  if (!it) it = lgWItem(lgPickW(1, [2, 3, 4, 4, 4][lv]));
  LG.q = { item: it, tries: 0, best: null, done: false, mode: LG.micDenied ? 'self' : LG_SR && !LG.srBroken ? 'sr' : 'rec' };
  lgUcapRender(); lgAutoSay(it.zh);
}
function lgUcapRender(msg) {
  const q = LG.q; const it = q.item; const s = lgS(); const st = $('#lgst'); if (!st) return;
  const r = q.best;
  const sylHTML = it.sy.map((x, k) => `<span class="lg-syl ${r && r.marks ? r.marks[k] : ''}"><b class="t${x.tone}">${esc(x.y)}</b></span>`).join('');
  const hz = [...it.zh].map(c => (isHan(c) ? c : '')).join('');
  const charHTML = [...hz].map((c, k) => `<span class="${r && r.marks ? 'm-' + r.marks[k] : ''}">${esc(c)}</span>`).join('');
  let mic = '';
  if (q.mode === 'sr') mic = `<button class="lg-mic ${q.listening ? 'on' : ''}" data-lg="mic" aria-label="${t('Tekan lalu ucapkan')}">${ICON('mic')}<span class="lg-ring"></span></button><div class="lg-mict">${q.listening ? `<b>${t('Mendengarkan…')}</b> <span id="lgheard">${esc(q.heard || '')}</span>` : esc(t(q.tries ? 'Coba lagi?' : 'Tekan lalu ucapkan'))}</div>`;
  else if (q.mode === 'rec') mic = `<button class="lg-mic ${q.recording ? 'on rec' : ''}" data-lg="rec" aria-label="${t('Rekam suaraku')}">${ICON('mic')}<span class="lg-ring"></span></button><div class="lg-mict">${q.recording ? `<b>${t('Merekam… ketuk lagi untuk berhenti')}</b>` : t('Rekam suaramu, lalu bandingkan dengan model')}</div>`;
  else mic = `<div class="lg-mict">${t('Ucapkan keras-keras sambil mendengar model, lalu nilai sendiri.')}</div>`;
  const cmp = q.url || q.mode === 'self' ? `<div class="lg-pair"><button class="btn sec" data-lg="say" data-v="${esc(it.zh)}">${ICON('speaker')} ${t('Model')}</button>${q.url ? `<button class="btn sec" data-lg="mine">${ICON('play')} ${t('Suaraku')}</button>` : ''}</div>
    <div class="lg-rate"><span class="small muted">${t('Seberapa mirip?')}</span><div class="lg-rbt"><button class="lg-rb ok" data-lg="rate" data-v="100">${t('Pas')}</button><button class="lg-rb part" data-lg="rate" data-v="65">${t('Mirip')}</button><button class="lg-rb bad" data-lg="rate" data-v="25">${t('Belum')}</button></div></div>` : '';
  const res = r && r.pct !== undefined && q.mode === 'sr' ? `<div class="lg-res ${r.pct >= 80 ? 'ok' : r.pct >= 50 ? 'part' : 'bad'}"><div class="lg-pct" style="--p:${r.pct}"><b>${r.pct}</b><small>%</small></div><div class="grow"><b>${r.pct >= 80 ? t('Pas! Pelafalanmu jelas.') : r.pct >= 50 ? t('Mirip! Perhatikan suku kata berwarna.') : t('Belum pas. Dengar model lalu coba lagi.')}</b><div class="small muted">${t('Terdengar')}: <span class="hz">${esc(r.heard || '—')}</span></div>${r.marks && r.marks.includes('tone') ? `<div class="small">${t('Kuning = bunyinya benar, nadanya kemungkinan meleset.')}</div>` : ''}</div></div>` : '';
  st.innerHTML = `<div class="lg-ucard">${lgMasHTML(64)}
      <div class="lg-uhz hz ${hz.length > 6 ? 'long' : ''}">${charHTML}</div>
      ${s.hidePy ? `<button class="lg-pyh" data-lg="pytog">${ICON('eye')} ${t('Tampilkan pinyin')}</button>` : `<div class="lg-syls big">${sylHTML}</div>`}
      ${it.tr ? `<div class="lg-utr">${esc(it.tr)}</div>` : ''}
      <div class="lg-spk sm"><button class="speak lg-play" data-lg="play" aria-label="${t('Putar')}">${ICON('speaker')}</button><button class="speak lg-pill lg-slowb" data-lg="slow" aria-label="${t('Putar pelan')}">${ICON('slow')}<span>0.6×</span></button>${s.hidePy ? '' : `<button class="chip lg-pyt" data-lg="pytog">${ICON('eye')} ${t('Sembunyikan pinyin')}</button>`}</div>
    </div>
    <div class="lg-micw">${mic}${msg ? `<div class="lg-msg">${msg}</div>` : ''}${res}${cmp}</div>
    <div class="row lg-ub"><button class="btn ghost small" data-lg="skip">${ICON('skip')} ${t('Lewati')}</button><span class="grow"></span>${r && r.pct !== undefined && q.mode === 'sr' ? `<button class="btn pri" data-lg="unext">${LG.n + 1 >= LG.g.n ? t('Selesai') : t('Lanjut')} ${ICON('chevron')}</button>` : ''}</div>`;
}
function lgMic() {
  const q = LG.q; if (!q || q.done) return;
  if (q.listening) { try { q.rec.stop(); } catch (e) {} return; }
  if (!LG_SR) { q.mode = 'rec'; return lgRecToggle(); }
  TTS.stop(); let rec; try { rec = new LG_SR(); } catch (e) { LG.srBroken = 1; q.mode = 'rec'; lgUcapRender(); return; }
  const run = LG.run; rec.lang = LG.srLang || 'zh-TW'; rec.interimResults = true; rec.maxAlternatives = 5; rec.continuous = false;
  q.listening = true; q.rec = rec; q.heard = ''; q.err = null; let got = null;
  rec.onresult = e => {
    let interim = ''; const alts = [];
    for (let k = e.resultIndex || 0; k < e.results.length; k++) { const R = e.results[k]; if (R.isFinal) { for (let a = 0; a < R.length; a++) alts.push(R[a].transcript); } else interim += R[0].transcript; }
    if (alts.length) got = alts; if (interim) { q.heard = interim; const h = $('#lgheard'); if (h) h.textContent = interim; }
  };
  rec.onerror = e => { q.err = e && e.error; };
  rec.onend = () => {
    clearTimeout(q.recT); if (!LG || LG.run !== run || LG.q !== q) return; q.listening = false;
    if (!got && q.heard) got = [q.heard];
    if (got && got.some(x => lgHanOnly(x))) { q.tries++; const r = lgPron(q.item, got); if (!q.best || r.pct >= q.best.pct) q.best = r; lgUcapRender(); lgMood(r.pct >= 80 ? 'joy' : r.pct >= 50 ? 'think' : 'oops', r.pct >= 80 ? pick(LG_OK_LINES) : ''); FX.play(r.pct >= 80 ? 'ok' : r.pct >= 50 ? 'flip' : 'bad', 3); return; }
    if (q.err === 'language-not-supported' && LG.srLang !== 'zh-CN') { LG.srLang = 'zh-CN'; lgUcapRender(); lgMic(); return; }
    if (['not-allowed', 'service-not-allowed', 'audio-capture'].includes(q.err)) { LG.micDenied = true; LG.srBroken = 1; q.mode = 'self'; lgUcapRender(`${ICON('info')} ${t('Mikrofon tidak bisa dipakai (izin ditolak atau tidak ada). Ucapkan keras-keras, lalu nilai sendiri — atau lewati.')}`); return; }
    if (q.err === 'network') { LG.srBroken = 1; q.mode = 'rec'; lgUcapRender(`${ICON('info')} ${t('Pengenal suara butuh internet. Pakai mode rekam & bandingkan.')}`); return; }
    lgUcapRender(`${ICON('info')} ${t('Belum terdengar. Tekan mikrofon lalu ucapkan dengan jelas.')}`);
  };
  try { rec.start(); } catch (e) { q.listening = false; LG.srBroken = 1; q.mode = 'rec'; lgUcapRender(); return; }
  q.recT = setTimeout(() => { try { rec.stop(); } catch (e) {} }, 9000);
  lgUcapRender(); lgBeep(784, 0.08, 'sine', 0.06);
}
async function lgRecToggle() {
  const q = LG.q; if (!q || q.done) return; const run = LG.run;
  if (q.recording) { try { q.mr.stop(); } catch (e) {} return; }
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || typeof MediaRecorder === 'undefined') { q.mode = 'self'; lgUcapRender(`${ICON('info')} ${t('Perangkat ini tidak bisa merekam. Ucapkan keras-keras, lalu nilai sendiri.')}`); return; }
  TTS.stop();
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); if (!LG || LG.run !== run || LG.q !== q) { stream.getTracks().forEach(x => x.stop()); return; }
    q.stream = stream; const mr = new MediaRecorder(stream); const parts = []; q.mr = mr;
    mr.ondataavailable = e => { if (e.data && e.data.size) parts.push(e.data); };
    mr.onstop = () => { clearTimeout(q.recT); q.recording = false; lgStopStream(q); if (!LG || LG.q !== q) return; try { if (q.url) URL.revokeObjectURL(q.url); q.url = URL.createObjectURL(new Blob(parts, { type: mr.mimeType || 'audio/webm' })); } catch (e) {} lgUcapRender(); };
    mr.start(); q.recording = true; q.recT = setTimeout(() => { try { mr.state === 'recording' && mr.stop(); } catch (e) {} }, 7000); lgUcapRender();
  } catch (e) { LG.micDenied = true; q.mode = 'self'; lgUcapRender(`${ICON('info')} ${t('Mikrofon tidak bisa dipakai (izin ditolak atau tidak ada). Ucapkan keras-keras, lalu nilai sendiri — atau lewati.')}`); }
}
/* nilai ucapan: cocokkan huruf, lalu bunyi (pinyin) per suku kata lewat bacaan huruf dari W */
function lgPron(it, alts) {
  const X = lgIdx(); const T = [...lgHanOnly(it.zh)]; const n = T.length; let best = null;
  alts.forEach(a => {
    const H = [...lgHanOnly(a)]; if (!H.length) return;
    const rd = H.map(c => X.cp.get(c) || []);
    const sc = (i, j) => { if (T[i] === H[j]) return 2; const tb = it.sy[i] && it.sy[i].b; return rd[j].some(r => r.b === tb) ? 1.2 : 0; };
    const map = lgAlign(n, H.length, sc);
    const marks = T.map((c, i) => { const j = map[i]; if (j < 0) return 'bad'; if (H[j] === c) return 'ok'; const s = it.sy[i]; return rd[j].some(r => r.b === s.b && r.tone === s.tone) ? 'ok' : 'tone'; });
    const got = marks.reduce((x, m) => x + (m === 'ok' ? 1 : m === 'tone' ? 0.6 : 0), 0); const matched = map.filter(x => x >= 0).length;
    const pct = Math.round(100 * (0.85 * got / n + 0.15 * (matched / Math.max(H.length, 1))));
    if (!best || pct > best.pct) best = { pct: clamp(pct, 0, 100), marks, heard: a.trim() };
  });
  return best || { pct: 0, marks: T.map(() => 'bad'), heard: alts[0] || '' };
}
function lgUcapDone(pct) {
  const q = LG.q; if (!q || q.done) return; q.done = true; lgStopStream(q);
  const ok = pct >= 80; lgAnswer(ok, ok ? 1 : pct / 100 * 0.9, q.item, $('#lgst .lg-uhz'));
  LG.n++; if (LG.n >= LG.g.n) { LG.nx = setTimeout(lgEnd, ok ? 700 : 900); return; }
  LG.nx = setTimeout(lgNext, ok ? 700 : 900);
}
