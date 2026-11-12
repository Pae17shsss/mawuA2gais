/* ================= v10.7: mekanik hafalan arcade ================= */
/* kata jatuh tempo yang dijawab di arcade dihitung sebagai ulangan FSRS sungguhan */
function arcReview(i, ok, ms) {
  const c = S.cards[i]; if (!c || c.due > Date.now()) return; G.revd = G.revd || {}; if (G.revd[i]) return; G.revd[i] = 1;
  const wasRev = c.iv >= 1; grade(i, ok, ok && ms > 6000 ? 'slow' : true);
  if (wasRev) dayRec().rev++; G.reviews = (G.reviews || 0) + 1;
  const fx = $('#afx'); if (fx) { const d = document.createElement('div'); d.className = 'revtag ' + (ok ? 'ok' : 'bad'); d.textContent = ok ? `⚔ ${t('ulangan +1')}` : `⚔ ${t('diulang lagi')}`; fx.appendChild(d); setTimeout(() => d.remove(), 1200); }
}
function arcRevenge(i) { if (i === undefined) return; G.revenge = G.revenge || []; if (!G.revenge.includes(i)) G.revenge.push(i); }
function arcFever(on) {
  if (!G) return; if (!!G.fever === on) return; G.fever = on; const sc = $('#ascreen'); if (sc) sc.classList.toggle('fever', on);
  if (on) { G.fevers = (G.fevers || 0) + 1; arcBanner('🔥 FEVER ×2 🔥', false); GA.play('item'); }
  arcHud();
}
/* bonus nada: setelah serangan, tebak nada satu suku kata untuk koin ekstra */
function arcToneBonus(i) {
  arcStopLoop(); G.busy = true; const w = W[i];
  const ks = w.t.map((tn, k) => [tn, k]).filter(x => x[0] < 5); const [tn, k] = pick(ks);
  G.bonus = { i, k, tn, t0: performance.now() };
  const hz = [...w.s]; const py = aligned(w) ? w.y : [];
  $('#aovl').innerHTML = `<div class="ov-card tb"><div class="tb-h">⚡ ${t('BONUS NADA')}</div>
    <div class="tb-w hz">${hz.map((c, j) => `<span class="${j === k ? 'on' : ''}">${esc(c)}</span>`).join('')}</div>
    <div class="small">${t('Nada suku kata yang menyala?')} ${py.length ? `<b>${esc(stripTone(py[k] || ''))}</b>` : ''}</div>
    <div class="tb-o">${[1, 2, 3, 4].map(n => `<button data-g="tone" data-v="${n}"><span class="tb-n">${n}</span>${contourSVG([n], 26)}</button>`).join('')}</div>
    <div class="tb-bar"><i></i></div></div>`;
  if (voiceOK()) setTimeout(() => { if (G && G.bonus) TTS.speak(hz[k]); }, 150);
  G.bonusT = setTimeout(() => arcToneAnswer(0), 4200);
}
function arcToneAnswer(n) {
  if (!G || !G.bonus) return; clearTimeout(G.bonusT); const b = G.bonus; G.bonus = null; const w = W[b.i];
  const ok = n === b.tn;
  $('#aovl').querySelectorAll('[data-g="tone"]').forEach(x => { if (+x.dataset.v === b.tn) x.classList.add('ok'); else if (+x.dataset.v === n) x.classList.add('bad'); });
  if (ok) { const g2 = 3 * (G.fever ? 2 : 1); G.coins += g2; G.score += 150; G.toneOk = (G.toneOk || 0) + 1; GA.play('crit'); arcFx(`${t('NADA PAS!')} +${g2}🪙`, true, w); TONE.play([b.tn], { force: true }); }
  else { GA.play('wrong'); arcFx(`${t('nada')} ${b.tn}`, false, w, true); }
  arcHud();
  setTimeout(() => { if (!G) return; $('#aovl').innerHTML = ''; G.busy = false; if (G.phase === 'play') { arcResetTimer(150); if (G.diff === 'hard') setTimeout(() => arcSayNext(), 300); } }, ok ? 700 : 1100);
}
/* rampasan: rangkuman kata yang baru mengalahkan monster (pengulangan singkat) */
function arcLoot() {
  if (!G) return; G.phase = 'loot';
  const ws = G.mon.need.map(i => W[i]);
  $('#aovl').innerHTML = `<div class="ov-card loot"><div class="tb-h">🎁 ${t('Kata yang kamu pakai')}</div>
    <div class="loot-l">${ws.map(w => `<button class="mw" data-g="say" data-v="${w.i}"><span class="hz">${esc(w.w.replace(/[()]/g, ''))}</span><small><b>${esc(aligned(w) ? w.y.join(' ') : w.p)}</b> · ${esc(meanP(w))}</small></button>`).join('')}</div>
    <button class="btn-arc" data-g="next">${t('Monster berikutnya')} ▶</button><div class="loot-bar"><i></i></div></div>`;
  if (voiceOK()) { let k = 0; const say = () => { if (!G || G.phase !== 'loot' || k >= ws.length) return; TTS.speak(ws[k++].s); G.lootT = setTimeout(say, 900); }; G.lootT = setTimeout(say, 200); }
  G.lootN = setTimeout(() => arcLootNext(), 900 * ws.length + 1600);
}
function arcLootNext() { if (!G || G.phase !== 'loot') return; clearTimeout(G.lootT); clearTimeout(G.lootN); $('#aovl').innerHTML = ''; arcNextStage(); }