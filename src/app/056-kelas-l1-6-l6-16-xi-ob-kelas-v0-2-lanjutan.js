/* =====================================================================
   FLASHCARD (kartu bolak-balik, sistem kotak Leitner)
   ===================================================================== */
let FC = null;
function fcBox(i) { return (klState().fc[i] && klState().fc[i].b) || 0; }
function openFC(cfg) {
  const st = klState(); st.fcCfg = cfg; save();
  let ids = klWords(cfg.ns, cfg.scope);
  if (cfg.only === 'weak') ids = ids.filter(i => fcBox(i) < 3);
  if (!ids.length) { toast(t('Semua kartu di pilihan ini sudah kuat 💪 — pilih "Semua kartu".')); return; }
  ids = shuffle(ids).sort((a, b) => fcBox(a) - fcBox(b)).slice(0, cfg.max || 999);
  KLS_ON = true; KLS_POOL = klWords(cfg.ns);
  FC = { ids, i: 0, flip: false, cfg, ok: 0, again: 0, t0: Date.now(), seen: 0 };
  hushAll(); closeModal();
  let el = $('#klfc'); if (el) el.remove();
  el = document.createElement('div'); el.id = 'klfc'; el.className = 'klfc'; document.body.appendChild(el); document.body.classList.add('in-session');
  el.addEventListener('click', fcClick); fcBindSwipe(el); fcRender();
}
function fcFace(i, side) {
  const w = W[i]; const v = klVocab(i) || {}; const dir = FC.cfg.dir;
  const hz = `<div class="fc-hz hz ${w.w.length > 3 ? 'sm' : ''}">${esc(v.hz || w.w)}${v.alt ? `<small> / ${esc(v.alt)}</small>` : ''}${lvBadgeW(i, 'sm')}</div>`;
  const py = `<div class="fc-py">${w.y ? w.y.map((s, k) => `<span class="t${w.t[k]}">${esc(s)}</span>`).join(' ') : esc(w.p)}</div>`;
  const mean = `<div class="fc-m">${esc(v.hz ? kx(v) : meanP(w))}</div>`;
  if (side === 'front') {
    if (dir === 'mean') return `<div class="fc-ask">${t('Hanzi & bunyinya?')}</div>${mean}`;
    if (dir === 'audio') return `<div class="fc-ask">${t('Dengar — apa artinya?')}</div><button class="speak huge" data-f="say">${ICON('speaker')}</button>`;
    return `<div class="fc-ask">${t('Apa artinya?')}</div>${hz}`;
  }
  return `${hz}${py}${mean}${typeof wordPicto === 'function' ? wordPicto(i) : ''}${v.pos ? `<div class="chip" style="margin:6px auto 0">${esc(posLabel(v.pos))}</div>` : ''}
    ${v.ex ? `<div class="fc-ex">${klLine(v.ex.zh, v.ex.py, { tg: v.hz })}<div class="small">${esc(kx(v.ex))}</div><button class="btn ghost small" data-f="sayex">${ICON('speaker')} ${t('kalimat')}</button></div>` : ''}
    ${v.tip && kx(v.tip) ? `<div class="gtip" style="text-align:left">${ICON('lightbulb')}<span>${esc(kx(v.tip))}</span></div>` : ''}`;
}
function fcRender() {
  const el = $('#klfc'); if (!el || !FC) return;
  if (FC.i >= FC.ids.length) return fcDone();
  const i = FC.ids[FC.i]; const bx = fcBox(i);
  el.innerHTML = `<div class="s-top"><button class="btn ghost" data-f="quit" aria-label="${t('Tutup')}">✕</button><div class="bar"><i style="width:${FC.i / FC.ids.length * 100}%"></i></div><span class="fc-cnt">${FC.i + 1}/${FC.ids.length}</span></div>
    <div class="fc-stage"><div class="fc-card ${FC.flip ? 'flip' : ''}" data-f="flip" role="button" aria-label="${t('Balik kartu')}">
      <div class="fc-face front"><span class="fc-box">${'●'.repeat(bx)}${'○'.repeat(5 - bx)}</span>${fcFace(i, 'front')}<div class="fc-hint">${t('Ketuk kartu untuk membalik')}</div></div>
      <div class="fc-face back"><span class="fc-box">${'●'.repeat(bx)}${'○'.repeat(5 - bx)}</span>${fcFace(i, 'back')}</div></div></div>
    <div class="fc-foot">${FC.flip ? `<button class="btn fc-no" data-f="no">✗ ${t('Belum hafal')}</button><button class="btn fc-yes" data-f="yes">✓ ${t('Sudah hafal')}</button>` : `<button class="btn sec" data-f="say">${ICON('speaker')}</button><button class="btn pri big" data-f="flip">${t('Balik kartu')}</button>`}</div>
    <div class="fc-keys small muted">${t('Spasi = balik · ← belum · → hafal · geser kartu juga bisa')}</div>`;
  if (FC.cfg.dir === 'audio' && !FC.flip) setTimeout(() => { if (FC && FC.ids[FC.i] === i && !FC.flip) say(W[i]); }, 250);
}
function fcRate(ok) {
  if (!FC || !FC.flip) return; const i = FC.ids[FC.i]; const st = klState(); const c = st.fc[i] || { b: 0 };
  c.b = ok ? Math.min(5, c.b + 1) : 0; c.t = Date.now(); st.fc[i] = c;
  grade(i, ok, true, ok ? 3 : 1); if (ok) FC.ok++; else { FC.again++; FC.ids.splice(Math.min(FC.i + 4, FC.ids.length), 0, i); }
  dayRec().recall = (dayRec().recall || 0) + 1; addXP(ok ? 6 : 1, true);
  FX.play(ok ? 'ok' : 'flip'); FC.i++; FC.flip = false; save(true); fcRender();
}
function fcDone() {
  const el = $('#klfc'); const tot = FC.ok + FC.again;
  el.innerHTML = `<div class="s-top"><button class="btn ghost" data-f="quit">✕</button></div><div class="s-body"><div class="s-card glass summary"><div class="sum-hero">${mascot(FC.again ? 'joy' : 'wow', 140)}</div>
    <h1>${t('Dek selesai!')}</h1><div class="kpis"><div class="kpi"><b>${FC.ok}</b><span>${t('hafal')}</span></div><div class="kpi"><b>${FC.again}</b><span>${t('diulang')}</span></div><div class="kpi"><b>${Math.max(1, Math.round((Date.now() - FC.t0) / 60000))}′</b><span>${t('waktu')}</span></div></div>
    <div class="row wrap" style="justify-content:center"><button class="btn sec" data-f="quit">${t('Kembali')}</button><button class="btn pri" data-f="again">${ICON('refresh')} ${t('Ulang dek')}</button></div></div></div>`;
  if (tot >= 8 && !FC.again) confetti();
}
function fcClose() {
  if (!FC) return; const ms = Math.min(Date.now() - FC.t0, 3.6e6); addCat('hafal', ms); dayRec().ms += ms; dayRec().sess++;
  FC = null; KLS_ON = false; const el = $('#klfc'); if (el) el.remove(); document.body.classList.remove('in-session'); hushAll(); save(true); render();
}
function fcClick(e) {
  const b = e.target.closest('[data-f]'); if (!b || !FC) return; const a = b.dataset.f; FX.ensure();
  if (a === 'quit') return fcClose();
  if (a === 'again') { const cfg = FC.cfg; fcClose(); return openFC(cfg); }
  if (a === 'say') { e.stopPropagation(); return say(W[FC.ids[FC.i]]); }
  if (a === 'sayex') { e.stopPropagation(); const v = klVocab(FC.ids[FC.i]); if (v && v.ex) TTS.speak(v.ex.zh); return; }
  if (a === 'flip') { FC.flip = !FC.flip; FX.play('flip'); fcRender(); if (FC.flip && S.settings.autoplay) say(W[FC.ids[FC.i]]); return; }
  if (a === 'yes') return fcRate(true);
  if (a === 'no') return fcRate(false);
}
function fcBindSwipe(el) {
  let x0 = null, y0 = null;
  el.addEventListener('pointerdown', e => { if (!e.target.closest('.fc-card')) return; x0 = e.clientX; y0 = e.clientY; });
  el.addEventListener('pointerup', e => {
    if (x0 === null || !FC) return; const dx = e.clientX - x0, dy = e.clientY - y0; x0 = null;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.4) { e.preventDefault(); if (!FC.flip) { FC.flip = true; fcRender(); return; } fcRate(dx > 0); }
  });
}
document.addEventListener('keydown', e => {
  if (!FC || $('.overlay')) return;
  if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); FC.flip = !FC.flip; fcRender(); }
  else if (e.key === 'ArrowRight') fcRate(true); else if (e.key === 'ArrowLeft') fcRate(false); else if (e.key === 'Escape') fcClose();
});
