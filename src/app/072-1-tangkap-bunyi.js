/* ===== 1. TANGKAP BUNYI ===== */
function lgQTangkap() {
  const [mn, mx] = [[1, 2], [1, 3], [1, 4], [2, 4], [2, 4]][LG.lv];
  const i = lgPickW(mn, mx); const opts = shuffle([i, ...lgDistract(i, 3, LG.lv)]);
  LG.q = { item: lgWItem(i), opts, done: false };
  $('#lgst').innerHTML = `${lgPromptHTML(lgNoVoice(LG.q.item.sy))}
    <div class="lg-opts">${opts.map((k, j) => `<button class="lg-opt" data-lg="pick" data-v="${j}"><span class="lg-key">${j + 1}</span><span class="hz lg-ohz">${esc(lgTxt(W[k]))}</span><span class="lg-opy">${lgPyHTML(lgIdx().syl[k])}</span></button>`).join('')}</div>
    <div class="lg-fb" id="lgfb"></div>`;
  lgAutoSay(LG.q.item.zh);
}
function lgPickTangkap(j, btn) {
  const q = LG.q; if (!q || q.done) return; q.done = true; const k = q.opts[j]; const ok = k === q.item.i;
  document.querySelectorAll('#lgst .lg-opt').forEach((b, x) => { b.classList.add(q.opts[x] === q.item.i ? 'ok' : x === j ? 'bad' : 'dim'); b.disabled = true; });
  lgAnswer(ok, 0, q.item, btn);
  if (ok) { lgFB(true, `<div class="lg-fbrow"><span class="hz">${esc(q.item.zh)}</span><span class="lg-cpy">${lgPyHTML(q.item.sy)}</span><span class="muted">${esc(q.item.tr)}</span></div>`); lgAfter(true, 800); return; }
  const w2 = lgWItem(k);
  lgFB(false, `<div class="lg-cmp">${lgCmpRow(q.item, t('Yang diucapkan'))}${lgCmpRow(w2, t('Pilihanmu'))}</div><div class="small muted">${t('Bandingkan kedua bunyi: dengar bedanya di nada atau konsonannya.')}</div>`);
  lgAfter(false);
}
function lgCmpRow(it, lab) { return `<div class="lg-cr"><button class="speak mini" data-lg="say" data-v="${esc(it.zh)}" aria-label="${t('Putar')}">${ICON('speaker')}</button><div class="grow"><small>${esc(lab)}</small><div><span class="hz">${esc(it.zh)}</span> <span class="lg-cpy">${lgPyHTML(it.sy)}</span></div><small class="muted">${esc(it.tr || '')}</small></div></div>`; }
