/* ===== 4. SUSUN KALIMAT DENGAR ===== */
function lgQSusun() {
  const lv = LG.lv; const maxC = [4, 5, 6, 7, 8][lv]; const maxH = [9, 12, 15, 18, 22][lv];
  const s = lgPickS(maxH); if (!s) { lgEnd(); return; }
  let ch = lgChunks(s, maxC); if (ch.length < 2) ch = [...s.h].slice(0, 1).concat(s.h.slice(1));
  let bank = ch.map((c, k) => ({ c, k }));
  if (lv >= 3) { const ex = lgSeg(pick(LG.sents).zh).filter(c => !ch.includes(c) && c.length <= 3); if (ex.length) bank.push({ c: pick(ex), k: -1 }); }
  bank = shuffle(bank); if (bank.map(b => b.c).join('') === ch.join('') && bank.length > 1) bank.push(bank.shift());
  const it = lgSItem(s); LG.q = { item: it, ch, bank, sel: [], done: false };
  $('#lgst').innerHTML = `${lgPromptHTML(lgNoVoice(it.sy) + `<div class="lg-hide" id="lgrev"></div>`, `${ch.length} ${t('potongan')}`)}
    <div class="lg-ss"><div class="lg-ans" id="lgans"></div><div class="lg-bank" id="lgbank"></div>
    <div class="row lg-ssb"><button class="btn ghost small" data-lg="clear">${ICON('undo')} ${t('Ulang')}</button><span class="grow"></span><button class="btn ghost small" data-lg="skip">${ICON('skip')} ${t('Lewati')}</button><button class="btn pri" data-lg="check" id="lgchk" disabled>${t('Cek')}</button></div></div>
    <div class="lg-fb" id="lgfb"></div>`;
  lgSusunRender(); lgAutoSay(s.zh);
}
function lgSusunRender() {
  const q = LG.q; const used = new Set(q.sel);
  $('#lgans').innerHTML = q.sel.length ? q.sel.map((k, x) => `<button class="lg-chip hz" data-lg="unsel" data-v="${x}">${esc(q.bank[k].c)}</button>`).join('') : `<span class="lg-ansph">${t('Ketuk potongan kata sesuai urutan yang kamu dengar')}</span>`;
  $('#lgbank').innerHTML = q.bank.map((b, k) => `<button class="lg-chip hz ${used.has(k) ? 'used' : ''}" data-lg="tsel" data-v="${k}" ${used.has(k) ? 'disabled' : ''}>${esc(b.c)}</button>`).join('');
  const chk = $('#lgchk'); if (chk) chk.disabled = !q.sel.length;
}
function lgSusunCheck(skip) {
  const q = LG.q; if (!q || q.done) return; q.done = true; const it = q.item;
  const got = q.sel.map(k => q.bank[k].c).join(''); const want = q.ch.join(''); const ok = !skip && got === want;
  let frac = 0; if (!ok && !skip) { const map = lgAlign(q.ch.length, q.sel.length, (a, b) => (q.ch[a] === q.bank[q.sel[b]].c ? 1 : 0)); let inPlace = 0; q.ch.forEach((c, k) => { if (q.bank[q.sel[k]] && q.bank[q.sel[k]].c === c) inPlace++; }); frac = Math.min(0.8, Math.max(inPlace, map.filter(x => x >= 0).length * 0.6) / q.ch.length); }
  document.querySelectorAll('#lgst .lg-ss button').forEach(b => (b.disabled = true));
  document.querySelectorAll('#lgans .lg-chip').forEach((b, x) => b.classList.add(q.bank[q.sel[x]].c === q.ch[x] ? 'ok' : 'bad'));
  const rv = $('#lgrev'); if (rv) { rv.innerHTML = `<span class="hz lg-szh">${esc(it.zh)}</span><span class="lg-rpy">${lgPyHTML(it.sy)}</span>`; rv.classList.add('on'); }
  lgAnswer(ok, frac, it, $('#lgans'));
  const tr = it.tr ? `<div class="small muted">${esc(it.tr)}</div>` : '';
  if (ok) { lgFB(true, `${tr}`); lgAfter(true, 1300); return; }
  lgFB(false, `<div class="lg-sol">${q.ch.map(c => `<span class="lg-chip hz ok">${esc(c)}</span>`).join('')}</div>${tr}
    <div class="row wrap lg-fbtn"><button class="btn sec small" data-lg="say" data-v="${esc(it.zh)}">${ICON('speaker')} ${t('Dengar lagi')}</button><button class="btn sec small" data-lg="slow">${ICON('slow')} 0.6×</button></div>`, frac);
  lgAfter(false);
}
