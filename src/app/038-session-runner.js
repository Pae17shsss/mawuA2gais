/* ========== SESSION RUNNER ========== */
let SES = null;
function startSession(items, opts = {}) {
  if (!items || !items.length) { toast(t('Belum ada soal untuk mode ini — pelajari beberapa kata dulu 🌱')); return; }
  FX.ensure();
  if (SES) { clearInterval(SES.mtimer); SES = null; }
  hushAll();
  items = items.filter(it => it && (it.lx || it.type === 'checkpoint' ? true : it.type === 'match' ? it.ids && it.ids.length >= 3 : (it.type === 'hz' || it.type === 'write' || it.type === 'tonepair' || it.type === 'part' || it.type === 'slang' || it.type === 'slangintro') ? !!it.ch : (it.type === 'cloze' || it.type === 'build' || it.type === 'lfill' || it.type === 'lmean') ? !!it.sent : (it.type === 'story' || it.type === 'lq') ? !!STORIES.find(x => x.k === it.st) : !!W[it.wid]));
  if (!items.length) { toast(t('Belum ada soal untuk mode ini — pelajari beberapa kata dulu 🌱')); return; }
  const backY = window.scrollY;
  SES = { backY, items, i: 0, title: opts.title || t('Sesi pintar'), ok: 0, bad: 0, combo: 0, maxCombo: 0, xp: 0, t0: Date.now(), newN: 0, answered: false, rq: {}, revSeen: {}, opts, placeOk: 0 };
  planToday(); checkQuests(); closeModal(); if (typeof stopLoops === 'function') stopLoops(true);
  let el = $('#session'); if (el) el.remove();
  el = document.createElement('div'); el.id = 'session'; el.className = 'session';
  el.innerHTML = `<div class="s-top"><button class="btn ghost" data-s="quit" aria-label="${t('Keluar sesi')}">✕</button><div class="bar"><i id="sbar" style="width:0"></i></div><div class="combo" id="scombo"></div></div>
  <div class="s-body" id="sbody"></div><div class="s-foot" id="sfoot"></div>`;
  document.body.appendChild(el); document.body.classList.add('in-session'); window.scrollTo(0, 0);
  el.addEventListener('click', sessionClick);
  renderItem();
}
function sessionClick(e) {
  try { _sessionClick(e); } catch (err) { recoverSession(err); }
}
function recoverSession(err) {
  console.error('session error', err);
  if (!SES) return;
  try { toast(t('🩹 Ada gangguan kecil — soal dilewati')); SES.answered = true; SES.i++; if (SES.i >= SES.items.length) showSummary(); else renderItem(); }
  catch (e2) { try { endSession(false); } catch (e3) { const el = $('#session'); if (el) el.remove(); document.body.classList.remove('in-session'); SES = null; render(); } }
}
function _sessionClick(e) {
  const b = e.target.closest('[data-s]'); if (!b || !SES) return;
  if (b.dataset.s === 'hum') { e.stopPropagation(); FX.ensure(); TONE.play(b.dataset.v.split('').map(Number), { force: true }); return; }
  if (b.dataset.s === 'hum4') { FX.ensure(); TONE.compare(); return; }
  if (b.dataset.s === 'saysent') { FX.ensure(); TTS.speak(b.dataset.v, b.dataset.slow ? 0.55 : undefined); return; }
  if (b.dataset.s === 'wauto') { S.settings.wauto = !wAuto(); save(); b.classList.toggle('on', wAuto()); b.setAttribute('aria-pressed', wAuto()); b.innerHTML = `${ICON(wAuto() ? 'bolt' : 'clock')} ${t('Lanjut otomatis')}`; toast(wAuto() ? t('Lanjut otomatis nyala') : t('Lanjut otomatis mati — tekan Lanjut sendiri'), 1800, 'wauto'); return; }
  if (b.dataset.s === 'wretry') { const it = cur(); const j = SES.items.findIndex((x, k) => k > SES.i && x.type === 'write' && x.ch === it.ch && x.retry); if (j > 0) SES.items.splice(j, 1); SES.answered = false; progressBar(); return renderWrite(it); }
  if (b.dataset.s === 'wagain') { if (SES.answered) return; TRACE = null; return renderWrite(cur()); }
  if (b.dataset.s === 'wclear') { if (TRACE) TRACE.clear(); return; }
  if (b.dataset.s === 'wdone') { if (TRACE) TRACE.done(); return; }
  if (b.dataset.s === 'wshow') { if (WHW && !SES.answered) { const it = cur(); const h = $('#whint'); if (h) h.textContent = t('perhatikan urutannya…'); WHW.animateCharacter({ onComplete: () => { if (SES && cur() === it && !SES.answered) renderWrite(it); } }); } return; }
  if (b.dataset.s === 'wskip') { if (SES.answered) return; cur().retry = 1; return answer(false, t('Dilewati.')); }
  if (b.dataset.s === 'k') return pkbIns(b.dataset.v);
  if (b.dataset.s === 'ktone') return pkbTone(+b.dataset.v);
  if (b.dataset.s === 'kbs') return pkbBack();
  if (b.dataset.s === 'kspace') return pkbIns(' ');
  if (b.dataset.s === 'ksys') return pkbSys();
  if (b.dataset.s === 'reveal') return recallReveal();
  if (b.dataset.s === 'rate') return recallRate(+b.dataset.v);
  if (b.dataset.s === 'rhint') return recallHint();
  if (b.dataset.s === 'splay') return storyPlay();
  if (b.dataset.s === 'sline') { stopLines(); return storyPlay(+b.dataset.v); }
  if (b.dataset.s === 'srate') { SES.srate = +b.dataset.v; stopLines(); return renderStory(cur()); }
  if (b.dataset.s === 'stxt') { SES.stxt = +b.dataset.v; stopLines(); return renderStory(cur()); }
  if (b.dataset.s === 'lplay') { FX.ensure(); return TTS.speak(cur().sent.zh, b.dataset.slow ? 0.55 : undefined); }
  if (b.dataset.s === 'slsayex') { FX.ensure(); return TTS.speak(slangOf(cur().ch).ex[0].replace(/—/g, '，')); }
  if (b.dataset.s === 'slslow') { FX.ensure(); return TTS.speak(slangOf(cur().ch).zh.replace(/[～~]/g, ''), 0.55); }
  if (b.dataset.s === 'slsay') { FX.ensure(); return TTS.speak(slangOf(cur().ch).zh.replace(/[～~]/g, '')); }
  if (b.dataset.s === 'tpsay') { FX.ensure(); return TTS.speak(cur().ch); }
  if (b.dataset.s === 'tphum') { FX.ensure(); return TONE.play([charTone(cur().ch)], { force: true }); }
  if (b.dataset.s === 'bchunk') return buildTap(b);
  if (b.dataset.s === 'bundo') return buildUndo();
  if (b.dataset.s === 'bcheck') return buildCheck();
  const a = b.dataset.s; const v = b.dataset.v;
  if (a === 'quit') return endSession(true);
  if (a === 'next') return nextItem();
  if (a === 'say') { FX.ensure(); return say(v || W[SES.items[SES.i].wid], b.dataset.slow); }
  if (a === 'opt') return pickOpt(b);
  if (a === 'check') return checkType();
  if (a === 'mt') return matchTap(b);
  if (a === 'again') { const o = SES.opts; endSession(false, true); return startSession(o.rebuild ? o.rebuild() : buildSmart(), o); }
  if (a === 'home') return endSession(false);
  if (a === 'routego') { const s = routeNext(); endSession(false, true); render(); if (s && ACT[s.a]) setTimeout(() => ACT[s.a](), 60); return; }
  if (a === 'hzstory') { closeModal(); openChar(v); }
}
document.addEventListener('keydown', e => {
  if (!SES || $('.overlay')) return;
  if (e.repeat) return;
  if (e.target && e.target.id === 'tin' && !sysKbd()) {
    if (/^[a-z]$/i.test(e.key)) { e.preventDefault(); pkbIns(e.key.toLowerCase() === 'v' ? 'ü' : e.key.toLowerCase()); return; }
    if (/^[1-4]$/.test(e.key)) { e.preventDefault(); pkbTone(+e.key); return; }
    if (e.key === 'Backspace') { e.preventDefault(); pkbBack(); return; }
    if (e.key === ' ') { e.preventDefault(); pkbIns(' '); return; }
    if (e.key === 'Enter') { e.preventDefault(); checkType(); return; }
  }
  if (e.target.tagName === 'INPUT') { if (e.key === 'Enter') { e.preventDefault(); SES.answered ? nextItem() : checkType(); } return; }
  const ci = SES.items[SES.i];
  if (ci && ci.type === 'recall') {
    if (!SES.flipped && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); recallReveal(); return; }
    if (SES.flipped && /^[1-4]$/.test(e.key)) { e.preventDefault(); recallRate(+e.key); return; }
  }
  if (ci && ci.type === 'story' && e.key === ' ') { e.preventDefault(); storyPlay(); return; }
  if (e.key === 'Enter') { e.preventDefault(); const n = $('[data-s="next"]'); if (n) n.click(); }
  else if (/^[1-6]$/.test(e.key)) { const o = document.querySelectorAll('#sbody [data-s="opt"],#sbody [data-s="mt"]')[+e.key - 1]; if (o) o.click(); }
  else if (e.key === ' ' && SES.items[SES.i] && SES.items[SES.i].wid !== undefined) { e.preventDefault(); say(W[SES.items[SES.i].wid]); }
  else if (e.key === 'Escape') endSession(true);
});
const cur = () => SES.items[SES.i];
/* ucapkan setelah jeda — batal otomatis kalau soal sudah berganti atau sesi ditutup */
function speakFor(it, text, ms) { setTimeout(() => { if (SES && cur() === it && voiceOK()) TTS.speak(text); }, ms); }
function xpPop(txt) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const e = document.createElement('div'); e.className = 'xp-pop'; e.textContent = txt;
  document.body.appendChild(e); setTimeout(() => e.remove(), 1000);
}
function progressBar() { if (!$('#sbar')) return; $('#sbar').style.width = (SES.i / SES.items.length * 100) + '%'; $('#scombo').textContent = SES.combo >= 3 ? `⚡${SES.combo}` : ''; }
function nextItem() {
  if (!SES) return;
  const now = Date.now(); if (now - (SES.lastNext || 0) < 280) return; SES.lastNext = now; // ignore double taps
  if (!SES.answered && cur() && cur().type !== 'intro' && cur().type !== 'slangintro' && cur().type !== 'checkpoint') return;
  FX.play('tap'); hushAll(); clearInterval(SES.mtimer); SES.i++;
  if (SES.i >= SES.items.length) return showSummary();
  renderItem();
}

function speakBtn(w, cls = '') { return voiceOK() ? `<button class="speak ${cls}" data-s="say" aria-label="${t('Putar suara')}">🔊</button>` : ''; }
function charsBlock(w, limit = 6) {
  const cs = [...new Set([...w.s].filter(isHan))].slice(0, limit);
  return `<div class="chars">${cs.map(c => { return `<button class="chr" data-s="hzstory" data-v="${c}"><div class="c hz">${c}</div><div><b>${esc(charMean(c))}</b> <span class="small t${charTone(c)}">${esc(charPy(c))}</span><p>${esc(charStory(c) || t('Belum ada cerita — tap untuk menulis versimu.'))}</p></div></button>`; }).join('')}</div>`;
}
function renderItem() {
  try { _renderItem(); } catch (err) { console.error('render item', err); SES.items.splice(SES.i, 1); if (SES.i >= SES.items.length) return showSummary(); if ((SES.errN = (SES.errN || 0) + 1) > 5) return endSession(false); renderItem(); }
}
function _renderItem() {
  progressBar(); SES.answered = false; SES.shown = Date.now(); SES.m = null;
  const it = cur(); const body = $('#sbody'); const foot = $('#sfoot'); foot.innerHTML = '';
  const w = it.wid !== undefined ? W[it.wid] : null;
  let h = '';
  if (it.type === 'intro') {
    const c = card(it.wid);
    if (!c) { introduce(it.wid); if (w.l < 4) dayRec().new++; else dayRec().newx = (dayRec().newx || 0) + 1; SES.newN++; addXP(5); }
    const u = UNIT_OF[w.i]; const cx = u && u.ctx ? CTX[u.ctx] : null;
    h = `<div class="s-card glass"><div class="q-kind">✨ ${t('Kata baru')} ${cx ? '· ' + cx[3] + ' ' + esc(cx[0]) : ''}</div>
      <div class="q-hz hz ${w.w.length > 3 ? 'sm' : ''}">${hzHTML(w)}</div>
      <div class="row" style="justify-content:center;gap:14px"><div class="q-py">${pinyinHTML(w, 'mark')}</div>${aligned(w) ? contourSVG(w.t, 26) : ''}</div>
      <div class="row" style="justify-content:center">${speakBtn(w)}${voiceOK() ? `<button class="btn ghost small" data-s="say" data-slow="1">🐢 ${t('per suku kata')}</button>` : ''}</div>
      ${subsHTML(w, true)}
      <div class="pill-row" style="justify-content:center"><span class="chip">${esc(posLabel(w.o))}</span>${w.v ? `<span class="chip">${t('juga')}: <span class="hz">${esc(w.v.join(' · '))}</span></span>` : ''}</div>
      ${multiHan(w) ? charBreak(w, { inSession: true }) : ''}
      ${charsBlock(w)}</div>`;
    foot.innerHTML = `<div class="inner"><button class="btn pri big wide" data-s="next">${t('Sudah kuingat, lanjut')}</button></div>`;
    body.innerHTML = h; body.scrollTop = 0; if (S.settings.autoplay) sayLater(w, 250); FX.play('flip'); checkQuests(); save(); return;
  }
  if (it.type === 'match') return renderMatch(it);
  if (it.type === 'hz') return renderHz(it);
  if (it.type === 'write') return renderWrite(it);
  if (it.type === 'cloze') return renderCloze(it);
  if (it.type === 'build') return renderBuild(it);
  if (it.type === 'recall') return renderRecall(it);
  if (it.type === 'story') return renderStory(it);
  if (it.type === 'lq') return renderLQ(it);
  if (it.type === 'lfill') return renderLFill(it);
  if (it.type === 'lmean') return renderLMean(it);
  if (it.type === 'tonepair') return renderTonePair(it);
  if (it.type === 'slang') return renderSlang(it);
  if (it.type === 'slangintro') return renderSlangIntro(it);
  if (it.type === 'checkpoint') return renderCheckpoint(it);
  if (it.type === 'part') return renderPart(it);
  if (it.type === 'combine') { if (combineOK(w)) return renderCombine(it); it.type = safeType(w.i); }
  const hint = it.hint ? `<div class="notice">🧠 ${t('Kata bandel — ingat ceritanya:')} ${[...w.s].filter(isHan).slice(0, 2).map(c => `<b class="hz">${c}</b> ${esc(charStory(c))}`).join(' ')}</div>` : '';
  if ((it.type === 'mc_mean' || it.type === 'mc_hanzi') && !w.m) it.type = safeType(w.i);
  if (it.type === 'tone' && !toneQuizOK(w)) it.type = safeType(w.i);
  if (it.type === 'type' && !aligned(w)) it.type = safeType(w.i);
  if (it.type === 'listen' && !voiceOK()) it.type = safeType(w.i);
  if (it.type === 'mc_mean') {
    const ds = distract(w, 3, meanP); const opts = shuffle([w, ...ds]); SES.correct = w.i;
    const showPy = it.isNew || mastery(card(it.wid)) <= 2;
    h = `<div class="s-card glass"><div class="q-kind">📖 ${t('Apa artinya?')}</div>${hint}
      <div class="q-hz hz ${w.w.length > 3 ? 'sm' : ''}">${hzHTML(w, !showPy)}</div>
      ${showPy ? `<div class="q-py">${pinyinHTML(w)}</div>` : ''}${speakBtn(w, 'mini')}
      <div class="opts">${opts.map((o, k) => `<button class="opt" data-s="opt" data-v="${o.i}"><kbd>${k + 1}</kbd>${esc(meanP(o))}</button>`).join('')}</div></div>`;
    body.innerHTML = h; if (S.settings.autoplay && voiceOK()) sayLater(w, 200);
  } else if (it.type === 'mc_hanzi') {
    const ds = distract(w, 3, x => x.w); const opts = shuffle([w, ...ds]); SES.correct = w.i;
    h = `<div class="s-card glass"><div class="q-kind">🔎 ${t('Pilih hanzinya')}</div>${hint}${subsHTML(w, true)}
      <div class="opts">${opts.map((o, k) => `<button class="opt" data-s="opt" data-v="${o.i}"><kbd>${k + 1}</kbd><span class="hz">${esc(o.w)}</span></button>`).join('')}</div></div>`;
    body.innerHTML = h;
  } else if (it.type === 'listen') {
    const ds = distract(w, 3, x => x.w, true); const opts = shuffle([w, ...ds]); SES.correct = w.i;
    h = `<div class="s-card glass"><div class="q-kind">🎧 ${t('Dengar, lalu pilih')}</div>${hint}
      <div style="padding:18px 0">${speakBtn(w, 'huge')}</div><div class="row" style="justify-content:center"><button class="btn ghost small" data-s="say" data-slow="1">🐢 ${t('per suku kata')}</button></div>
      <div class="opts">${opts.map((o, k) => `<button class="opt" data-s="opt" data-v="${o.i}"><kbd>${k + 1}</kbd><span class="hz">${esc(o.w)}</span></button>`).join('')}</div></div>`;
    body.innerHTML = h; sayLater(w, 250);
  } else if (it.type === 'tone') {
    const pats = tonePatterns(w.t); SES.correctT = w.t.join('');
    h = `<div class="s-card glass"><div class="q-kind">🎵 ${t('Nada apa?')}</div>${hint}
      <div class="q-hz hz ${w.w.length > 3 ? 'sm' : ''}">${esc(w.w.replace(/[()]/g, ''))}</div>
      <div class="q-py">${esc(w.y.map(stripTone).join(' '))}</div>${speakBtn(w, 'mini')}
      <div class="row" style="justify-content:center;gap:8px;flex-wrap:wrap"><button class="btn ghost small" data-s="say" data-slow="1">🐢 ${t('per suku kata')}</button><button class="btn ghost small" data-s="hum4">🎼 ${t('dengar 4 nada')}</button></div>
      <div class="opts">${pats.map((p, k) => `<button class="opt" data-s="opt" data-v="${p.join('')}"><kbd>${k + 1}</kbd>${contourSVG(p, 28)}<div class="small muted">${p.map(x => (x === 5 ? '·' : x)).join(' – ')}</div><span class="hum" data-s="hum" data-v="${p.join('')}" role="button" aria-label="${t('dengar kontur')}">🎧</span></button>`).join('')}</div></div>`;
    body.innerHTML = h; if (voiceOK()) sayLater(w, 250);
  } else if (it.type === 'type') {
    h = `<div class="s-card glass"><div class="q-kind">⌨️ ${t('Ketik pinyin-nya')}</div>${hint}
      <div class="q-hz hz ${w.w.length > 3 ? 'sm' : ''}">${esc(w.w.replace(/[()]/g, ''))}</div>
      <div class="q-mean">${esc(meanP(w))}</div>
      <input class="type-in" id="tin" autocomplete="off" autocapitalize="off" spellcheck="false" inputmode="${sysKbd() ? 'text' : 'none'}" ${sysKbd() ? '' : 'readonly'} placeholder="${t('contoh: nǐ hǎo')}" aria-label="Pinyin">
      <div class="small muted" style="text-align:center">${sysKbd() ? t('Angka 1–4 untuk nada, tanpa angka untuk nada netral. Huruf ü bisa diketik v.') : t('Ketuk huruf, lalu ketuk nada 1–4 untuk memberi tanda pada suku kata itu.')}</div></div>`;
    body.innerHTML = h;
    foot.innerHTML = pkbHTML();
    if (sysKbd()) setTimeout(() => $('#tin') && $('#tin').focus(), 60);
  }
  body.scrollTop = 0;
}
function distract(w, n, key, sameLen) {
  let pool = A2.filter(x => x.i !== w.i && x.m && key(x) !== key(w) && x.w !== w.w);
  if (sameLen) { const L = w.s.length; const p2 = pool.filter(x => x.s.length === L); if (p2.length > 20) pool = p2; }
  const near = pool.filter(x => Math.abs(x.l - w.l) <= 1);
  const pos = (w.o || '').split('/')[0]; const same = pos ? near.filter(x => (x.o || '').split('/')[0] === pos) : near;
  const known = same.filter(x => S.cards[x.i]);
  const out = [];
  for (const src of [shuffle(known), shuffle(same), shuffle(near), shuffle(pool)]) for (const x of src) { if (out.length >= n) break; if (!out.some(o => key(o) === key(x))) out.push(x); }
  return out;
}
function tonePatterns(t) {
  if (t.length === 1) return shuffle(t[0] === 5 ? [[5], [1], [3], [4]] : [[1], [2], [3], [4]]);
  const set = new Set([t.join('')]); const out = [t];
  let guard = 0;
  while (out.length < 4 && guard++ < 60) {
    const p = t.slice(); const k = Math.floor(Math.random() * p.length);
    if (p[k] === 5 && Math.random() < .7) continue;
    const tc = S.adapt.tc; const actual = p[k];
    let nt = 1 + Math.floor(Math.random() * 4);
    if (actual < 5 && Math.random() < .5) { const row = tc[actual - 1]; const mx = row.slice(0, 4).indexOf(Math.max(...row.slice(0, 4))); if (row[mx] > 0 && mx + 1 !== actual) nt = mx + 1; }
    if (Math.random() < .25 && out.length > 1) { const k2 = (k + 1) % p.length; if (p[k2] !== 5) p[k2] = 1 + Math.floor(Math.random() * 4); }
    p[k] = nt; const s = p.join('');
    if (!set.has(s)) { set.add(s); out.push(p); }
  }
  return shuffle(out);
}
function pickOpt(b) {
  if (!SES || SES.answered) return;
  const it = cur(); let ok;
  if (it.type === 'tone') {
    ok = b.dataset.v === SES.correctT;
    if (ok) W[it.wid].t.forEach(tn => { if (tn < 5) S.adapt.tc[tn - 1] = S.adapt.tc[tn - 1].map(v => Math.floor(v * 0.85 * 100) / 100); });
    if (!ok) { const w = W[it.wid]; const chosen = b.dataset.v.split('').map(Number); w.t.forEach((t, k) => { if (t < 5 && chosen[k] < 5 && t !== chosen[k]) S.adapt.tc[t - 1][chosen[k] - 1]++; }); }
    document.querySelectorAll('#sbody [data-s="opt"]').forEach(o => { if (o.dataset.v === SES.correctT) o.classList.add('ok'); else if (o !== b) o.classList.add('dim'); });
  } else if (it.type === 'lq' || it.type === 'lmean') {
    ok = +b.dataset.k === SES.correctK;
    document.querySelectorAll('#sbody [data-s="opt"]').forEach(o => { if (+o.dataset.k === SES.correctK) o.classList.add('ok'); else if (o !== b) o.classList.add('dim'); });
  } else if (it.type === 'cloze' || it.type === 'lfill') {
    ok = +b.dataset.k === SES.correctK;
    document.querySelectorAll('#sbody [data-s="opt"]').forEach(o => { if (+o.dataset.k === SES.correctK) o.classList.add('ok'); else if (o !== b) o.classList.add('dim'); });
    const cell = $('#blank'); if (cell) { const c = it.sent.chunks[it.blank]; cell.textContent = c.hz; cell.classList.add(ok ? 'fill-ok' : 'fill-bad'); }
  } else if (it.type === 'hz' || it.type === 'tonepair' || it.type === 'part' || it.type === 'slang') {
    ok = b.dataset.v === it.ch;
    document.querySelectorAll('#sbody [data-s="opt"]').forEach(o => { if (o.dataset.v === it.ch) o.classList.add('ok'); else if (o !== b) o.classList.add('dim'); });
  } else {
    ok = +b.dataset.v === SES.correct;
    document.querySelectorAll('#sbody [data-s="opt"]').forEach(o => { if (+o.dataset.v === SES.correct) o.classList.add('ok'); else if (o !== b) o.classList.add('dim'); });
  }
  if (!ok) b.classList.add('bad');
  answer(ok);
}
function normNum(s) { return s.toLowerCase().replace(/u:|v/g, 'ü').replace(/[\s'’\-·.()]/g, '').replace(/[05]/g, ''); }
function checkType() {
  if (!SES || SES.answered) return; const inp = $('#tin'); if (!inp) return;
  const it = cur(); const w = W[it.wid]; const raw = inp.value.trim(); if (!raw) { inp.focus(); return; }
  const expMark = normNum(w.y.join('').normalize('NFC'));
  const expNum = w.y.map((s, k) => stripTone(s) + (w.t[k] < 5 ? w.t[k] : '')).join('');
  let ok;
  if (hasMarks(raw)) ok = normNum(raw.normalize('NFC')) === expMark;
  else ok = normNum(raw) === expNum;
  const near = !ok && stripTone(normNum(raw)).replace(/\d/g, '') === stripTone(expMark);
  inp.disabled = true; inp.style.borderColor = ok ? 'var(--t2)' : 'var(--t4)';
  answer(ok, near ? t('Hurufnya sudah benar — tinggal nadanya.') : '');
}
function answer(ok, note) {
  if (!SES || SES.answered) return; SES.answered = true;
  const it = cur(); const ms = Date.now() - SES.shown; const day = dayRec();
  recAnswer(it.type, ok, ms);
  if (ok) { SES.ok++; day.ok++; SES.combo++; SES.maxCombo = Math.max(SES.maxCombo, SES.combo); day.combo = Math.max(day.combo, SES.combo); if (it.type === 'tone') day.tone++; if (it.type === 'listen') day.listen++; if (it.type === 'type') day.type++; if (it.type === 'hz') { day.hz++; S.hzKnown[it.ch] = 1; } if (it.type === 'combine') day.cmb = (day.cmb || 0) + 1; if (it.type === 'tonepair') { day.tp = (day.tp || 0) + 1; day.tone++; } if (it.type === 'part') { day.pt = (day.pt || 0) + 1; day.hz++; } }
  else { SES.bad++; day.bad++; SES.combo = 0; }
  if (it.type === 'cloze' || it.type === 'build') { day.sent = (day.sent || 0) + 1; }
  if (ok && (it.type === 'lq' || it.type === 'lfill' || it.type === 'lmean')) day.listen++;
  if (it.type === 'lq') SES.lqOk = (SES.lqOk || 0) + (ok ? 1 : 0);
  if (it.type === 'recall') day.recall = (day.recall || 0) + 1;
  if (it.place) { if (ok) SES.placeOk++; }
  else if (it.wid !== undefined) {
    const c = card(it.wid); const wasRev = c && c.iv >= 1;
    if (!c) introduce(it.wid);
    grade(it.wid, ok, ms > S.adapt.rt * 2.5 ? 'slow' : true, it.type === 'recall' ? SES.rating : undefined);
    if (wasRev && !SES.revSeen[it.wid]) { SES.revSeen[it.wid] = 1; day.rev++; }
    const k = SES.rq[it.wid] || 0;
    if (!ok && k < 2) { SES.rq[it.wid] = k + 1; SES.items.splice(Math.min(SES.i + 3, SES.items.length), 0, it.type === 'recall' ? { type: 'recall', wid: it.wid, dir: it.dir } : { type: safeType(it.wid, chooseType(it.wid)), wid: it.wid, hint: true }); }
    if (ok && it.isNew && !it.second) SES.items.splice(Math.min(SES.i + 4, SES.items.length), 0, { type: safeType(it.wid, voiceOK() && Math.random() < .5 ? 'listen' : 'mc_hanzi'), wid: it.wid, isNew: true, second: true });
  }
  const gain = ok ? 10 + (SES.combo >= 5 ? 5 : 0) : 2; SES.xp += gain; addXP(gain);
  if (ok) xpPop('+' + gain + ' XP' + (SES.combo >= 3 ? '  x' + SES.combo : ''));
  FX.play(ok ? 'ok' : 'bad', SES.combo); if (ok && SES.combo >= 5 && SES.combo % 5 === 0) { const cb = SES.combo; setTimeout(() => FX.play('combo', cb), 180); if (typeof comboCheer === 'function') comboCheer(SES.combo); }
  progressBar();
  let fb = '';
  if (it.type === 'recall') {
    // alur cepat seperti kartu flash: langsung ke kartu berikutnya
    $('#sfoot').innerHTML = ''; checkQuests(); save();
    setTimeout(() => { if (SES && cur() === it) { SES.lastNext = 0; nextItem(); } }, 160);
    return;
  }
  if (it.type === 'lq' || it.type === 'lfill' || it.type === 'lmean') {
    fb = listenFeedback(it, ok);
    if (it.type !== 'lq' && voiceOK() && !ok) speakFor(it, it.sent.zh, 320);
  } else if (it.type === 'write') {
    writeFeedback(it, ok, note); checkQuests(); save(); return;
  } else if (it.type === 'cloze' || it.type === 'build') {
    const sn = it.sent;
    fb = `<div class="fb ${ok ? 'ok' : 'bad'}"><div style="flex:1;min-width:0">${ok ? t('Benar!') : t('Kalimat yang benar:')}
      <small><span class="hz" style="font-size:19px">${esc(sn.zh)}</span></small>
      <small>${esc(sn.py)} · ${esc(sentTr(sn))}</small></div>
      <button class="btn ghost small" data-s="saysent" data-v="${esc(sn.zh)}">🔊</button></div>`;
    if (voiceOK()) speakFor(it, sn.zh, 320);
  } else if (it.type === 'slang') {
    fb = slangFeedback(it, ok); if (ok) day.slang = (day.slang || 0) + 1;
  } else if (it.type === 'tonepair' || it.type === 'part') {
    fb = fb8(it, ok);
    if (voiceOK() && it.type === 'part') speakFor(it, it.ch, 300);
  } else if (it.type === 'hz') {
    const d = CH[it.ch];
    fb = `<div class="fb ${ok ? 'ok' : 'bad'}"><span class="hz" style="font-size:34px">${it.ch}</span><div>${ok ? t('Benar!') : t('Artinya') + ': ' + esc(charMean(it.ch))} · <b class="t${charTone(it.ch)}">${esc(charPy(it.ch))}</b><small>${esc(charStory(it.ch))}</small></div></div>`;
  } else {
    const w = W[it.wid];
    fb = `<div class="fb ${ok ? 'ok' : 'bad'}"><div style="flex:1;min-width:0">${ok ? (SES.combo >= 3 ? `${t('Mantap!')} ⚡${SES.combo}` : t(pick(['Benar!', 'Tepat!', 'Pintar!', 'Nah itu dia!', 'Keren!']))) : t('Belum tepat —') + ' ' + (note || t('lihat jawabannya:'))}
      <small><span class="hz" style="font-size:18px">${hzHTML(w)}</span> · ${pinyinHTML(w, 'mark')} · ${esc(meanP(w))}</small>
      ${!ok && !it.place ? `<small>🧠 ${[...w.s].filter(isHan).slice(0, 2).map(c => `<b class="hz">${c}</b>: ${esc(charStory(c) || '—')}`).join(' ')}</small>` : ''}</div></div>`;
    if (voiceOK() && (it.type !== 'listen' || !ok)) sayLater(w, 350);
  }
  fb = fb.replace(/^<div class="fb (ok|bad)">/, (m0, k) => `<div class="fb ${k}">${mascot(k === 'ok' ? (SES.combo >= 5 ? 'wow' : 'joy') : 'oops', 46, 'fbm')}`);
  $('#sfoot').innerHTML = `<div class="inner">${fb}<button class="btn pri big" data-s="next">${t('Lanjut')}</button></div>`;
  checkQuests(); save();
}

/* ----- hanzi item ----- */
function renderHz(it) {
  const d = CH[it.ch]; if (!d) throw new Error('no char data ' + it.ch);
  const pool = []; const seenM = new Set([charMean(it.ch)]); for (const c of shuffle(CHAR_ORDER)) { if (pool.length >= 3) break; const m = charMean(c); if (c !== it.ch && CH[c] && m && !seenM.has(m)) { seenM.add(m); pool.push(c); } }
  const opts = shuffle([it.ch, ...pool]);
  $('#sbody').innerHTML = `<div class="s-card glass"><div class="q-kind">🀄 ${t('Hanzi ini artinya?')}</div><div class="q-hz hz">${it.ch}</div>
    <div class="opts">${opts.map((c, k) => `<button class="opt" data-s="opt" data-v="${c}"><kbd>${k + 1}</kbd>${esc(charMean(c))}</button>`).join('')}</div></div>`;
}

/* ----- match game ----- */
function renderMatch(it) {
  const ws = it.ids.map(i => W[i]).filter(w => w && w.m);
  if (ws.length < 3) throw new Error('match too small');
  const L = shuffle(ws.map(w => ({ k: w.i, t: `<span class="hz" style="font-size:26px">${esc(w.w)}</span>` })));
  const R = shuffle(ws.map(w => ({ k: w.i, t: esc(meanP(w)) })));
  SES.m = { sel: null, left: ws.length, t0: Date.now(), miss: 0 };
  $('#sbody').innerHTML = `<div class="s-card glass"><div class="q-kind">🧩 ${t('Pasangkan hanzi dengan artinya')} <span class="grow"></span><span id="mtime">0 ${t('dtk')}</span></div>
    <div class="match">${L.map((a, k) => `<button class="opt" data-s="mt" data-side="L" data-v="${a.k}">${a.t}</button><button class="opt" data-s="mt" data-side="R" data-v="${R[k].k}">${R[k].t}</button>`).join('')}</div></div>`;
  clearInterval(SES.mtimer); const t0 = SES.m.t0;
  SES.mtimer = setInterval(() => { const e = $('#mtime'); if (!e || !SES || !SES.m) { clearInterval(SES && SES.mtimer); return; } e.textContent = Math.round((Date.now() - t0) / 1000) + ' ' + t('dtk'); }, 1000);
}
function matchTap(b) {
  const m = SES && SES.m; if (!m || m.lock || !m.left || b.classList.contains('gone') || b.classList.contains('ok')) return;
  if (b.dataset.side === 'L' && voiceOK()) say(W[+b.dataset.v]);
  if (m.sel === b) { b.classList.remove('sel'); m.sel = null; return; }
  if (!m.sel || m.sel.dataset.side === b.dataset.side) { if (m.sel) m.sel.classList.remove('sel'); m.sel = b; b.classList.add('sel'); FX.play('tap'); return; }
  if (m.sel.dataset.v === b.dataset.v) {
    FX.play('ok', 5 - m.left); [m.sel, b].forEach(x => { x.classList.remove('sel'); x.classList.add('ok'); setTimeout(() => x.classList.add('gone'), 260); }); m.sel = null; m.left--;
    if (!m.left) {
      clearInterval(SES.mtimer); const sec = Math.round((Date.now() - m.t0) / 1000); const day = dayRec(); day.match++; const g = Math.max(8, Math.max(15, 45 - sec) - m.miss * 3); SES.xp += g; addXP(g); SES.ok++; if (m.miss >= 2) SES.bad++;
      $('#sfoot').innerHTML = `<div class="inner"><div class="fb ok"><div>${t('Selesai dalam {s} detik!', { s: sec })} ${m.miss ? `(${t('{n} salah', { n: m.miss })})` : t('Tanpa salah 🌟')}<small>+${g} XP</small></div></div><button class="btn pri big" data-s="next">${t('Lanjut')}</button></div>`;
      SES.answered = true; checkQuests(); save();
    }
  } else { FX.play('bad'); m.miss++; const s = m.sel; m.sel = null; s.classList.remove('sel'); b.classList.remove('bad'); void b.offsetWidth; b.classList.add('bad'); setTimeout(() => b.classList.remove('bad'), 380); }
}

/* ----- papan tik pinyin sendiri ----- */
const sysKbd = () => S.settings.kbd === 'system';
const PKB_ROWS = [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'ü']];
const TONE_MARKS = { a: 'āáǎà', e: 'ēéěè', i: 'īíǐì', o: 'ōóǒò', u: 'ūúǔù', 'ü': 'ǖǘǚǜ' };
const BASE_OF = { 'ā': 'a', 'á': 'a', 'ǎ': 'a', 'à': 'a', 'ē': 'e', 'é': 'e', 'ě': 'e', 'è': 'e', 'ī': 'i', 'í': 'i', 'ǐ': 'i', 'ì': 'i', 'ō': 'o', 'ó': 'o', 'ǒ': 'o', 'ò': 'o', 'ū': 'u', 'ú': 'u', 'ǔ': 'u', 'ù': 'u', 'ǖ': 'ü', 'ǘ': 'ü', 'ǚ': 'ü', 'ǜ': 'ü' };
function pkbHTML() {
  if (sysKbd()) return `<div class="inner"><button class="btn sec" data-s="say">${ICON('speaker')}</button><button class="btn sec" data-s="ksys">${ICON('keyboard')}</button><button class="btn pri big wide" data-s="check">${t('Periksa')}</button></div>`;
  const key = (v, lbl, cls = '') => `<button class="pk ${cls}" data-s="k" data-v="${v}">${lbl || v}</button>`;
  return `<div class="pkb">
    <div class="pkb-tones">
      ${[1, 2, 3, 4].map(n => `<button class="pk tone t${n}" data-s="ktone" data-v="${n}"><b>${'āáǎà'[n - 1]}</b><span>${n}</span></button>`).join('')}
      <button class="pk tone t5" data-s="ktone" data-v="0"><b>a</b><span>·</span></button>
      <button class="pk wide" data-s="kspace">${t('spasi')}</button>
      <button class="pk wide" data-s="kbs">⌫</button>
    </div>
    ${PKB_ROWS.map((r, k) => `<div class="pkb-row r${k}">${r.map(c => key(c)).join('')}</div>`).join('')}
    <div class="pkb-act">
      <button class="pk fn" data-s="say">${ICON('speaker')}</button>
      <button class="pk fn" data-s="ksys" title="${t('Pakai keyboard HP')}">${ICON('keyboard')}</button>
      <button class="pk go" data-s="check">${t('Periksa')}</button>
    </div></div>`;
}
function pkbIns(ch) {
  const inp = $('#tin'); if (!inp || inp.disabled) return;
  inp.value += ch; FX.play('tap'); pkbFlash(inp);
}
function pkbFlash(inp) { inp.classList.remove('hit'); void inp.offsetWidth; inp.classList.add('hit'); }
function pkbBack() { const inp = $('#tin'); if (!inp || inp.disabled) return; inp.value = inp.value.slice(0, -1); FX.play('flip'); pkbFlash(inp); }
// nada dipasang pada vokal utama suku kata terakhir (aturan pinyin: a > o > e > vokal terakhir)
function pkbTone(n) {
  const inp = $('#tin'); if (!inp || inp.disabled) return;
  const v = inp.value; const sp = Math.max(v.lastIndexOf(' '), v.lastIndexOf("'"));
  const head = v.slice(0, sp + 1); let syl = v.slice(sp + 1);
  if (!syl) return;
  syl = syl.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/g, c => BASE_OF[c] || c); // bersihkan nada lama
  const chars = [...syl];
  let idx = -1;
  const find = c => chars.lastIndexOf(c);
  if (find('a') >= 0) idx = find('a');
  else if (find('o') >= 0 && find('u') === find('o') - 1) idx = find('o');
  else if (find('o') >= 0) idx = find('o');
  else if (find('e') >= 0) idx = find('e');
  else { for (let k = chars.length - 1; k >= 0; k--) if ('iuü'.includes(chars[k])) { idx = k; break; } }
  if (idx < 0) return;
  if (n > 0) chars[idx] = TONE_MARKS[chars[idx]][n - 1];
  inp.value = head + chars.join('');
  FX.play(n ? 'ok' : 'tap', 1); pkbFlash(inp);
}
function pkbSys() {
  S.settings.kbd = sysKbd() ? 'app' : 'system'; save();
  const foot = $('#sfoot'); const inp = $('#tin');
  if (foot) foot.innerHTML = pkbHTML();
  if (inp) {
    if (sysKbd()) { inp.removeAttribute('readonly'); inp.setAttribute('inputmode', 'text'); setTimeout(() => inp.focus(), 40); }
    else { inp.setAttribute('readonly', ''); inp.setAttribute('inputmode', 'none'); inp.blur(); }
  }
  toast(sysKbd() ? t('Keyboard HP dipakai') : t('Keyboard pinyin app dipakai'));
}

/* ----- menulis hanzi ----- */
let WHW = null;
function writeCard(ch, opts = {}) {
  const d = CH[ch] || ['', ''];
  const n = (S.hzWrite || {})[ch] || 0;
  return `<div class="s-card glass"><div class="q-kind">${ICON('write')} ${t('Tulis hanzi ini')}</div>
    <div class="write-wrap">
      <div style="text-align:center"><b style="font-size:18px">${esc(charMean(ch) || ch)}</b>${n ? `<div class="small muted">${t('sudah ditulis {n}×', { n })}</div>` : ''}</div>
      <div class="write-box ${opts.big ? 'big' : ''}" id="wbox"><span class="hz" id="wfb" style="font-size:110px;opacity:.12">${ch}</span><span class="write-hint" id="whint">${t('memuat papan tulis…')}</span></div>
      <div class="row wrap" style="justify-content:center;gap:8px">
        <button class="btn sec small" data-s="wshow">${ICON('play')} ${t('lihat urutan')}</button>
        <button class="btn sec small" data-s="wagain">${ICON('refresh')} ${t('ulangi')}</button>
        ${opts.skip ? `<button class="btn ghost small" data-s="wskip">${t('lewati')}</button>` : ''}</div>
      ${charStory(ch) ? `<div class="gtip">${ICON('lightbulb')}<span>${esc(charStory(ch))}</span></div>` : ''}
    </div></div>`;
}
function mountWriter(ch, onDone) {
  WHW = null;
  const start = () => {
    const box = $('#wbox'); if (!box || !window.HanziWriter) return;
    box.innerHTML = '<div id="wtarget"></div><span class="write-hint" id="whint">' + t('ikuti goresan dengan jarimu') + '</span>';
    const dark = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim().startsWith('#f');
    try {
      WHW = HanziWriter.create('wtarget', ch, {
        width: 210, height: 210, padding: 6, showCharacter: false, showOutline: true, showHintAfterMisses: 2,
        strokeColor: dark ? '#f2f3f5' : '#16171a', outlineColor: dark ? '#3a4048' : '#d9dbe0', drawingColor: dark ? '#7fb0e6' : '#3a6ea5',
        drawingWidth: 26, strokeAnimationSpeed: 1.1, delayBetweenStrokes: 140,
        onLoadCharDataError: () => { WHW = null; tracePad(ch, onDone); }
      });
      WHW.quiz({
        onMistake: dat => { const h = $('#whint'); if (h) h.textContent = t('goresan ke-{n}, coba lagi', { n: dat.strokeNum + 1 }); FX.play('bad'); },
        onCorrectStroke: dat => { FX.play('tap'); const h = $('#whint'); if (h) h.textContent = `${dat.strokesRemaining} ${t('goresan tersisa')}`; },
        onComplete: dat => { FX.play('ok', 4); onDone(dat.totalMistakes); }
      });
    } catch (e) { WHW = null; }
  };
  const box0 = $('#wbox');
  loadHanziWriter(() => { if (box0 && box0.isConnected) start(); });
  // cadangan luring: papan jiplak sederhana kalau data goresan tidak bisa diunduh
  const wait = (loadHanziWriter.failed || !navigator.onLine) ? 0 : 2200;   // sudah tahu gagal/luring → papan jiplak langsung
  setTimeout(() => { if (box0 && box0.isConnected && !WHW && !window.HanziWriter) tracePad(ch, onDone); }, wait);
}
function tracePad(ch, onDone) {
  const box = $('#wbox'); if (!box || box.dataset.trace) return; box.dataset.trace = '1';
  box.innerHTML = `<span class="hz" id="tghost" style="position:absolute;font-size:170px;opacity:.1;pointer-events:none">${ch}</span>
    <canvas id="tcanvas" width="420" height="420" style="width:100%;height:100%;touch-action:none;position:relative"></canvas>
    <span class="write-hint">${t('Jiplak bentuknya dengan jarimu, lalu tekan Selesai.')}</span>`;
  const foot = $('#sfoot');
  if (foot) foot.innerHTML = `<div class="inner"><button class="btn sec" data-s="wclear">${t('Bersihkan')}</button><button class="btn pri big wide" data-s="wdone">${t('Selesai')}</button></div>`;
  const cv = $('#tcanvas'); const x = cv.getContext('2d');
  x.lineWidth = 16; x.lineCap = 'round'; x.lineJoin = 'round';
  x.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#16171a';
  let drawing = false, strokes = 0;
  const pos = e => { const r = cv.getBoundingClientRect(); const p = e.touches ? e.touches[0] : e; return [(p.clientX - r.left) * cv.width / r.width, (p.clientY - r.top) * cv.height / r.height]; };
  const down = e => { e.preventDefault(); drawing = true; strokes++; const [a2, b2] = pos(e); x.beginPath(); x.moveTo(a2, b2); FX.play('tap'); };
  const move = e => { if (!drawing) return; e.preventDefault(); const [a2, b2] = pos(e); x.lineTo(a2, b2); x.stroke(); };
  const up = () => { drawing = false; };
  cv.addEventListener('pointerdown', down); cv.addEventListener('pointermove', move);
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => cv.addEventListener(ev, up));
  TRACE = { ch, clear: () => { x.clearRect(0, 0, cv.width, cv.height); strokes = 0; }, done: () => { if (!strokes) { toast(t('Jiplak dulu bentuknya ✎')); return; } onDone(0); } };
}
let TRACE = null;
function renderWrite(it) {
  TRACE = null;
  $('#sbody').innerHTML = writeCard(it.ch, { skip: true });
  $('#sfoot').innerHTML = '';
  mountWriter(it.ch, miss => {
    S.hzWrite = S.hzWrite || {}; S.hzWrite[it.ch] = (S.hzWrite[it.ch] || 0) + 1;
    dayRec().write = (dayRec().write || 0) + 1;
    answer(miss <= 2, miss ? t('{n} koreksi — goresannya makin rapi.', { n: miss }) : '');
  });
}

/* ----- kalimat: lengkapi (cloze) & susun (build) ----- */
function sentTr(sent) { return isVI() ? (sent.tr[3] || sent.tr[1]) : (sent.tr[primIdx()] || sent.tr[0]); }
function sentPyHTML(sent) { return sent.chunks.map(c => `<span>${esc(c.py)}</span>`).join(' '); }
function renderCloze(it) {
  SES.correctK = it.opts.findIndex(o => o[0] === it.sent.chunks[it.blank].hz);
  const line = it.sent.chunks.map((c, k) => k === it.blank
    ? `<span class="blank" id="blank">▢</span>`
    : `<span class="hz">${esc(c.hz)}</span>`).join('');
  $('#sbody').innerHTML = `<div class="s-card glass"><div class="q-kind">🧩 ${t('Lengkapi kalimatnya')}</div>
    <div class="sent">${line}</div>
    <div class="q-mean">${esc(sentTr(it.sent))}</div>
    <div class="opts">${it.opts.map((o, k) => `<button class="opt" data-s="opt" data-k="${k}" data-v="${esc(o[0])}"><kbd>${k + 1}</kbd><span class="hz" style="font-size:22px">${esc(o[0])}</span><span class="small muted" style="margin-left:10px">${esc(o[1])}</span></button>`).join('')}</div></div>`;
}
function renderBuild(it) {
  const order = shuffle(it.sent.chunks.map((c, k) => k));
  SES.b = { picked: [], pool: order };
  $('#sbody').innerHTML = `<div class="s-card glass"><div class="q-kind">🧱 ${t('Susun jadi kalimat yang benar')}</div>
    <div class="q-mean" style="margin-top:4px">${esc(sentTr(it.sent))}</div>
    <div class="build-line" id="bline"><span class="ph small muted">${t('ketuk kata sesuai urutan')}</span></div>
    <div class="build-pool" id="bpool">${order.map(k => `<button class="chunk hz" data-s="bchunk" data-v="${k}">${esc(it.sent.chunks[k].hz)}</button>`).join('')}</div>
    <div class="row" style="justify-content:center;gap:8px;margin-top:6px"><button class="btn ghost small" data-s="bundo">↩︎ ${t('hapus satu')}</button></div></div>`;
  $('#sfoot').innerHTML = `<div class="inner"><button class="btn pri big wide" data-s="bcheck">${t('Periksa')}</button></div>`;
}
function buildRefresh() {
  const it = cur(); const b = SES.b; const line = $('#bline');
  line.innerHTML = b.picked.length ? b.picked.map(k => `<span class="chunk hz set">${esc(it.sent.chunks[k].hz)}</span>`).join('') : `<span class="ph small muted">${t('ketuk kata sesuai urutan')}</span>`;
  $('#bpool').querySelectorAll('.chunk').forEach(el => { el.classList.toggle('used', b.picked.includes(+el.dataset.v)); });
}
function buildTap(el) {
  if (!SES || SES.answered || !SES.b) return;
  const k = +el.dataset.v; if (SES.b.picked.includes(k)) return;
  SES.b.picked.push(k); FX.play('tap'); buildRefresh();
  const it = cur(); if (SES.b.picked.length === it.sent.chunks.length) setTimeout(() => { if (SES && cur() === it && SES.b && SES.b.picked.length === it.sent.chunks.length) buildCheck(); }, 260);
}
function buildUndo() { if (!SES || SES.answered || !SES.b || !SES.b.picked.length) return; SES.b.picked.pop(); FX.play('flip'); buildRefresh(); }
function buildCheck() {
  if (!SES || SES.answered || !SES.b || !cur() || cur().type !== 'build') return;
  const it = cur(); const got = SES.b.picked.map(k => it.sent.chunks[k].hz).join('');
  const ok = got === it.sent.zh;
  const bl = $('#bline'); if (bl) bl.querySelectorAll('.chunk').forEach((el, j) => { const pk = it.sent.chunks[SES.b.picked[j]]; el.classList.add(pk && it.sent.chunks[j] && pk.hz === it.sent.chunks[j].hz ? 'ok' : 'bad'); });
  answer(ok);
}

/* ----- summary / end ----- */
function showSummary() {
  if (!SES || SES.summarized) return; SES.summarized = true; SES.answered = true;
  clearInterval(SES.mtimer); hushAll();
  const n = SES.ok + SES.bad; const acc = n ? Math.round(SES.ok / n * 100) : 100; const mins = Math.max(1, Math.round((Date.now() - SES.t0) / 60000));
  recordSession(true);
  $('#sbar').style.width = '100%';
  let extra = SES.opts.speed && typeof speedSummary === 'function' ? speedSummary() : '';
  if (SES.opts.placeLv !== undefined) {
    const lv = SES.opts.placeLv; const pass = SES.placeOk >= 10;
    if (pass) { const now = Date.now(); UNITS[lv].flatMap(u => u.ids).forEach(i => { if (!S.cards[i]) { const due = now + (2 + Math.random() * 8) * DAY; S.cards[i] = { iv: 3, ef: 2.5, due, r: 1, lp: 0, st: 2, ls: now, add: todayKey(), skip: 1, s: (due - now) / DAY, d: 5, lr: now, ph: 'rev', lrated: 1 }; } }); replanDay(); save(); }
    extra = `<div class="notice">${pass ? t('Lulus {n}/12 🎉 Semua kata {lv} ditandai dikenal dan akan muncul sebagai ulangan ringan dalam beberapa hari.', { n: SES.placeOk, lv: LEVELS[lv].en }) : t('Skor {n}/12 — butuh 10 untuk lompat. Belajar per unit dulu, kamu pasti cepat menyusul.', { n: SES.placeOk })}</div>`;
  }
  const emo = `<div class="sum-hero">${speedLinesSVG()}${mascot(acc >= 90 ? 'wow' : acc >= 70 ? 'joy' : 'think', 150)}</div>`;
  const stIt = SES.items.find(x => x.type === 'story');
  if (stIt) { storyMark(stIt.st, SES.lqOk || 0); }
  const left = Math.max(0, planToday().new - dayRec().new);
  $('#sbody').innerHTML = `<div class="s-card glass summary">${emo}<h1>${t(acc >= 90 ? 'Sesi yang cantik!' : acc >= 70 ? 'Sesi selesai, makin nempel!' : 'Selesai — pengulangan bikin kuat.')}</h1>
    <div class="kpis"><div class="kpi"><b>${acc}%</b><span>${t('akurasi')}</span></div><div class="kpi"><b>⚡${SES.maxCombo}</b><span>${t('combo terbaik')}</span></div><div class="kpi"><b>+${SES.xp}</b><span>XP · ${mins} ${t('mnt')}</span></div></div>
    ${SES.newN ? `<div class="muted">${t('{n} kata baru masuk ingatan.', { n: SES.newN })} ${left ? t('Sisa target hari ini: {n} kata.', { n: left }) : t('Target kata baru hari ini tercapai ✅')}</div>` : ''}${extra}
    ${routeNudge()}
    <div class="row wrap" style="justify-content:center"><button class="btn sec" data-s="home">${t('Kembali')}</button>${SES.opts.placeLv === undefined && SES.opts.rebuild ? `<button class="btn ${routeNext() ? 'sec' : 'pri'}" data-s="again">${t('Sesi lagi')}</button>` : ''}${routeNext() ? `<button class="btn pri" data-s="routego">${t('Lanjut')}: ${t('Langkah {n}', { n: routeNext().n })} ${ICON('chevron')}</button>` : ''}</div></div>`;
  $('#sfoot').innerHTML = ''; FX.play('level'); if (acc >= 90 && n >= 8) confetti();
  checkQuests(); save();
}
function recordSession(complete) {
  if (SES.recorded) return; SES.recorded = true;
  const a = S.adapt; const ms = Date.now() - SES.t0; const day = dayRec();
  day.sess++; day.ms += Math.max(0, Math.min(ms, 3.6e6) - (SES.flushed || 0));
  a.sessions.push({ d: todayKey(), ms, n: SES.ok + SES.bad, c: complete ? 1 : 0 }); if (a.sessions.length > 40) a.sessions.shift();
  if (complete) { a.done++; if (ms < 7 * 60000 && SES.items.length >= a.size) a.size = Math.min(30, a.size + 2); }
  else if (SES.i < SES.items.length * .5 && SES.ok + SES.bad > 0) { a.quit++; a.size = Math.max(10, a.size - 2); }
}
function endSession(quit, silent) {
  if (!SES) return; clearInterval(SES.mtimer); hushAll();
  if (quit) recordSession(false);
  const el = $('#session'); if (el) el.remove(); document.body.classList.remove('in-session');
  const cb = SES.opts.onEnd; const backY = SES.backY || 0; SES = null; save(true);
  if (window.__xbUpdate && !silent) { window.__xbUpdate = false; toast(t('✨ Versi baru terpasang')); setTimeout(() => location.reload(), 600); return; }
  if (!silent) { render(); if (backY) requestAnimationFrame(() => window.scrollTo(0, backY)); if (cb) cb(); }
}