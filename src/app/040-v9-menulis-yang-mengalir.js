/* ========== v9: MENULIS YANG MENGALIR ==========
   - Latihan berbasis kata: tiap kata dipecah jadi huruf-hurufnya, ditulis berurutan.
   - Berhasil → cahaya ✓ singkat, suara, lalu otomatis lanjut (bisa dimatikan).
   - Kata selesai → ringkasan kata sebentar, lalu kata berikutnya.
   - Terlalu banyak koreksi → berhenti, pilih "Ulangi" atau "Lanjut".              */
const wAuto = () => S.settings.wauto !== false;

/* satu kata → item tulis per huruf, urut kiri ke kanan */
function writeItemsFor(i) {
  const w = W[i]; if (!w) return [];
  const cs = [...w.s].map((c, k) => ({ c, k })).filter(o => isHan(o.c));
  return cs.map((o, j) => ({ type: 'write', ch: o.c, ww: i, wk: o.k, wj: j, wn: cs.length }));
}
function writeWordPool() {
  const ids = Object.keys(S.cards).map(Number).filter(i => W[i] && W[i].m && !S.cards[i].skip && [...W[i].s].some(isHan));
  const src = ids.length >= 3 ? ids : A2_ORDER.slice(0, 30);
  // utamakan kata yang hurufnya belum pernah ditulis
  const fresh = src.filter(i => [...W[i].s].filter(isHan).some(c => !(S.hzWrite || {})[c]));
  return fresh.length >= 3 ? fresh : src;
}
function buildWriteWords(nWords = 4, ids) {
  const pool = ids && ids.length ? ids : shuffle(writeWordPool());
  const out = []; let words = 0;
  for (const i of pool) { if (words >= nWords || out.length >= 14) break; const its = writeItemsFor(i); if (!its.length) continue; out.push(...its); words++; }
  return out;
}

/* kartu tulis: konteks kata di atas, papan di tengah */
function writeCard(ch, opts = {}) {
  const it = opts.it || {}; const n = (S.hzWrite || {})[ch] || 0;
  const py = charPy(ch); const tn = charTone(ch);
  let ctx = '';
  if (it.ww !== undefined && W[it.ww]) {
    const w = W[it.ww];
    const cells = [...w.s].map((c, k) => {
      if (!isHan(c)) return '';
      const st = k < it.wk ? 'done' : k === it.wk ? 'now' : 'next';
      return `<span class="wc ${st}"><span class="hz">${c}</span><small>${esc(aligned(w) && w.y[k] ? w.y[k] : charPy(c))}</small></span>`;
    }).join('');
    ctx = `<div class="wword"><div class="wcells">${cells}</div><div class="small muted">${esc(meanP(w))}${it.wn > 1 ? ` · ${t('huruf {a} dari {b}', { a: it.wj + 1, b: it.wn })}` : ''}</div></div>`;
  }
  return `<div class="s-card glass wcard"><div class="q-kind">${ICON('write')} ${t('Tulis hanzi ini')}<span class="grow"></span>
      <button class="wauto ${wAuto() ? 'on' : ''}" data-s="wauto" aria-pressed="${wAuto()}">${ICON(wAuto() ? 'bolt' : 'clock')} ${t('Lanjut otomatis')}</button></div>
    ${ctx}
    <div class="write-wrap">
      <div class="wmeta"><b class="t${tn}">${esc(py)}</b> · <b>${esc(charMean(ch) || ch)}</b>${n ? `<span class="small muted"> · ${t('sudah ditulis {n}×', { n })}</span>` : ''}</div>
      <div class="write-box ${opts.big ? 'big' : ''}" id="wbox"><span class="hz" id="wfb" style="font-size:110px;opacity:.12">${ch}</span><span class="write-hint" id="whint">${t('memuat papan tulis…')}</span></div>
      <div class="row wrap" style="justify-content:center;gap:8px">
        <button class="btn sec small" data-s="wshow">${ICON('play')} ${t('lihat urutan')}</button>
        <button class="btn sec small" data-s="wagain">${ICON('refresh')} ${t('ulangi')}</button>
        ${opts.skip ? `<button class="btn ghost small" data-s="wskip">${t('lewati')}</button>` : ''}</div>
      ${charStory(ch) ? `<div class="gtip">${ICON('lightbulb')}<span>${esc(charStory(ch))}</span></div>` : ''}
    </div></div>`;
}
function renderWrite(it) {
  TRACE = null;
  $('#sbody').innerHTML = writeCard(it.ch, { skip: true, it });
  $('#sfoot').innerHTML = '';
  mountWriter(it.ch, miss => {
    if (!SES || cur() !== it || SES.answered) return;
    if (miss <= 2) { S.hzWrite = S.hzWrite || {}; S.hzWrite[it.ch] = (S.hzWrite[it.ch] || 0) + 1; dayRec().write = (dayRec().write || 0) + 1; }
    answer(miss <= 2, miss ? t('{n} koreksi — goresannya makin rapi.', { n: miss }) : '');
  });
}
/* umpan balik tulis — dipanggil dari answer() */
function writeFeedback(it, ok, note) {
  const box = $('#wbox'); if (box) box.classList.add(ok ? 'wok' : 'wbad');
  const w = it.ww !== undefined ? W[it.ww] : null; const wordDone = w && it.wj === it.wn - 1;
  const cell = document.querySelector('.wc.now'); if (cell && ok) { cell.classList.remove('now'); cell.classList.add('done'); }
  if (ok) {
    if (voiceOK()) { if (wordDone && it.wn > 1) speakFor(it, w.s, 150); else speakFor(it, it.ch, 120); }
    const sum = wordDone ? `<div class="wdone"><span class="hz">${esc(w.w.replace(/[()]/g, ''))}</span><b>${esc(aligned(w) ? w.y.join('') : w.p || '')}</b><span>${esc(meanP(w))}</span></div>` : '';
    const auto = wAuto(); const ms = wordDone && it.wn > 1 ? 1500 : 800;
    $('#sfoot').innerHTML = `<div class="inner wfoot">
      <div class="fb ok slim">${mascot(SES.combo >= 5 ? 'wow' : 'joy', 40, 'fbm')}<div style="flex:1;min-width:0">${wordDone && it.wn > 1 ? t('Kata selesai!') : t(pick(['Rapi!', 'Bagus!', 'Mantap!']))}${note ? `<small>${esc(note)}</small>` : ''}</div>${sum}</div>
      <button class="btn pri big wnext ${auto ? 'counting' : ''}" data-s="next" style="--ms:${ms}ms">${t('Lanjut')}<i class="autobar"></i></button></div>`;
    if (auto) setTimeout(() => { if (SES && cur() === it && SES.answered) { SES.lastNext = 0; nextItem(); } }, ms);
  } else {
    // coba lagi nanti sekali, dan beri pilihan jelas sekarang
    if (!it.retry) { SES.items.splice(Math.min(SES.i + 2, SES.items.length), 0, Object.assign({}, it, { retry: 1 })); }
    $('#sfoot').innerHTML = `<div class="inner wfoot"><div class="fb bad slim">${mascot('think', 40, 'fbm')}<div style="flex:1;min-width:0">${t('Belum rapi — tidak apa-apa.')}<small>${esc(note || t('Huruf ini akan muncul sekali lagi sebentar lagi.'))}</small></div></div>
      <button class="btn sec" data-s="wretry">${ICON('refresh')} ${t('Ulangi')}</button><button class="btn pri big" data-s="next">${t('Lanjut')}</button></div>`;
  }
}