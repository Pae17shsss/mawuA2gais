/* ===== 3. DIKTE KILAT ===== */
function lgParseIn(str, mode) {
  const X = lgIdx(); const ok = sub => X.set.has(lgNorm(sub)); const out = []; let cur = [];
  const seg = letters => {
    const s = letters.map(x => x.c).join(''); const n = s.length; const best = new Array(n + 1).fill(null); best[0] = [];
    for (let a = 0; a < n; a++) { if (!best[a]) continue; for (let L = Math.min(6, n - a); L >= 1; L--) { if (!ok(s.substr(a, L))) continue; const c = best[a].concat([[a, a + L]]); const o = best[a + L]; if (!o || (mode === 'max' ? c.length > o.length : c.length < o.length)) best[a + L] = c; } }
    return best[n] || [[0, n]];
  };
  const flush = tone => { if (!cur.length) return; const sg = seg(cur); sg.forEach(([a, b], k) => { const sub = cur.slice(a, b); let tn = null; sub.forEach(x => { if (x.t) tn = x.t; }); if (k === sg.length - 1 && tone) tn = tone; out.push({ b: lgNorm(sub.map(x => x.c).join('')), tone: tn, y: sub.map(x => x.o).join('') }); }); cur = []; };
  for (const ch of String(str || '').normalize('NFC').toLowerCase().replace(/u:/g, 'ü')) {
    if (/[0-5]/.test(ch)) flush(+ch === 0 ? 5 : +ch);
    else if (/[a-z]/.test(ch)) cur.push({ c: ch === 'ü' ? 'v' : ch, o: ch });
    else if (ch === 'ü') cur.push({ c: 'v', o: ch });
    else if (MARKS[ch]) cur.push({ c: MARKS[ch][0] === 'ü' ? 'v' : MARKS[ch][0], t: MARKS[ch][1], o: ch });
    else flush(null);
  }
  flush(null); return out;
}
function lgAlign(n, m, sc) {
  const D = Array.from({ length: n + 1 }, () => new Float32Array(m + 1));
  for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) { const s = sc(i - 1, j - 1); D[i][j] = Math.max(D[i - 1][j], D[i][j - 1], s > 0 ? D[i - 1][j - 1] + s : -1); }
  const map = new Array(n).fill(-1); let i = n, j = m;
  while (i > 0 && j > 0) { const s = sc(i - 1, j - 1); if (s > 0 && D[i][j] === D[i - 1][j - 1] + s) { map[i - 1] = j - 1; i--; j--; } else if (D[i][j] === D[i - 1][j]) i--; else j--; }
  return map;
}
function lgGradePy(it, input) {
  const T = it.sy; const n = T.length; let H = lgParseIn(input, 'min');
  if (H.length !== n) { const H2 = lgParseIn(input, 'max'); if (Math.abs(H2.length - n) < Math.abs(H.length - n)) H = H2; }
  const chars = [...lgHanOnly(it.zh)]; const tones = T.map(s => s.tone); const sp = lgSpoken(chars, tones); const dc = lgDict(chars, tones);
  const map = lgAlign(n, H.length, (a, b) => (T[a].b === H[b].b ? 1 : 0));
  const marks = T.map((s, k) => { const j = map[k]; if (j < 0) return 'bad'; const tn = H[j].tone; const okT = tn === s.tone || tn === sp[k] || tn === dc[k] || (s.tone === 5 && (tn === null || tn === 5)); return okT ? 'ok' : 'tone'; });
  const score = marks.reduce((a, m) => a + (m === 'ok' ? 1 : m === 'tone' ? 0.5 : 0), 0) / Math.max(n, H.length);
  return { marks, frac: score, H };
}
function lgQDikte(keep) {
  const s = lgS(); const lv = LG.lv; let it = keep || null;
  if (lv >= 4 && LG.sents.length && Math.random() < 0.5) { const c = LG.sents.filter(x => x.h.length >= 3 && x.h.length <= 6 && lgPyToks(x.py).length === x.h.length); if (c.length) it = lgSItem(pick(c)); }
  if (!it) { const [mn, mx] = [[1, 2], [2, 2], [2, 3], [3, 4], [3, 4]][lv]; it = lgWItem(lgPickW(mn, mx)); }
  LG.q = { item: it, done: false, sel: [], mode: s.dk };
  const tabs = `<div class="seg lg-dkm">${[['type', 'Ketik pinyin'], ['tile', 'Pilih hanzi']].map(([k, l]) => `<button class="${s.dk === k ? 'on' : ''}" data-lg="dkmode" data-v="${k}">${t(l)}</button>`).join('')}</div>`;
  let body;
  if (s.dk === 'tile') {
    const chars = [...lgHanOnly(it.zh)]; const X = lgIdx(); const extra = new Set();
    const pool = it.i !== undefined ? lgDistract(it.i, 4, lv) : [];
    pool.forEach(k => [...lgTxt(W[k])].forEach(c => { if (!chars.includes(c)) extra.add(c); }));
    chars.forEach(c => { const r = X.cp.get(c); if (r) for (const [ch, rs] of X.cp) { if (extra.size > 12) break; if (!chars.includes(ch) && rs.some(x => x.b === r[0].b) && Math.random() < 0.02) extra.add(ch); } });
    const nx = clamp(2 + lv, 2, 5); LG.q.tiles = shuffle(chars.concat(shuffle([...extra]).slice(0, nx)));
    body = `<div class="lg-slots" id="lgslots"></div><div class="lg-bank" id="lgbank"></div>`;
  } else {
    body = `<form class="lg-dkf" autocomplete="off"><input id="lgin" class="lg-in" type="text" inputmode="latin" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="${t('mis. ni3hao3 / nǐ hǎo')}" aria-label="${t('Ketik pinyin')}"><button class="btn pri" type="submit">${t('Cek')}</button></form>
      <div class="lg-tk" aria-hidden="true">${[1, 2, 3, 4].map(k => `<button type="button" class="lg-tkb t${k}" data-lg="tkey" data-v="${k}">${k}</button>`).join('')}<button type="button" class="lg-tkb" data-lg="tkey" data-v=" ">${t('spasi')}</button></div>`;
  }
  $('#lgst').innerHTML = `${lgPromptHTML(lgNoVoice(it.sy) + `<div class="lg-hide" id="lgrev"></div>`, `${it.sy.length} ${t('suku kata')}${it.i === undefined ? ' · ' + t('frasa') : ''}`)}
    <div class="lg-dk">${tabs}${body}<button class="btn ghost small lg-skip" data-lg="skip">${ICON('skip')} ${t('Lewati')}</button></div><div class="lg-fb" id="lgfb"></div>`;
  if (s.dk === 'tile') lgTilesRender(); else { const inp = $('#lgin'); if (inp && matchMedia('(pointer:fine)').matches) setTimeout(() => { try { inp.focus({ preventScroll: true }); } catch (e) {} }, 120); }
  lgAutoSay(it.zh);
}
function lgTilesRender() {
  const q = LG.q; const used = new Set(q.sel); const n = [...lgHanOnly(q.item.zh)].length;
  $('#lgslots').innerHTML = Array.from({ length: n }, (_, k) => q.sel[k] !== undefined ? `<button class="lg-slot f hz" data-lg="unsel" data-v="${k}">${esc(q.tiles[q.sel[k]])}</button>` : `<span class="lg-slot"></span>`).join('');
  $('#lgbank').innerHTML = q.tiles.map((c, k) => `<button class="lg-tile hz ${used.has(k) ? 'used' : ''}" data-lg="tsel" data-v="${k}" ${used.has(k) ? 'disabled' : ''}>${esc(c)}</button>`).join('');
}
function lgDikteCheck(skip) {
  const q = LG && LG.q; if (!q || q.done || LG.phase !== 'play') return; const it = q.item;
  let res;
  if (skip) res = { marks: it.sy.map(() => 'bad'), frac: 0 };
  else if (q.mode === 'tile') { const chars = [...lgHanOnly(it.zh)]; const got = q.sel.map(k => q.tiles[k]); const marks = chars.map((c, k) => (got[k] === c ? 'ok' : 'bad')); res = { marks, frac: marks.filter(m => m === 'ok').length / chars.length }; }
  else { const v = ($('#lgin') || {}).value || ''; if (!v.trim()) { const inp = $('#lgin'); if (inp) { inp.classList.remove('lg-shk'); void inp.offsetWidth; inp.classList.add('lg-shk'); inp.focus(); } return; } res = lgGradePy(it, v); }
  q.done = true; const ok = res.frac >= 0.999;
  document.querySelectorAll('#lgst .lg-dk button, #lgst .lg-dk input').forEach(b => (b.disabled = true));
  const rv = $('#lgrev'); if (rv) { rv.innerHTML = `<span class="hz">${esc(it.zh)}</span><span class="lg-syls">${it.sy.map((s, k) => `<span class="lg-syl ${res.marks[k]}"><b class="t${s.tone}">${esc(s.y)}</b></span>`).join('')}</span>`; rv.classList.add('on'); }
  lgAnswer(ok, res.frac, it, rv);
  const legend = `<div class="lg-leg"><span class="lg-syl ok">${t('tepat')}</span><span class="lg-syl tone">${t('nada beda')}</span><span class="lg-syl bad">${t('bunyi beda')}</span></div>`;
  if (ok) { lgFB(true, `<div class="lg-fbrow"><span class="hz">${esc(it.zh)}</span><span class="lg-cpy">${lgPyHTML(it.sy)}</span><span class="muted">${esc(it.tr)}</span></div>`); lgAfter(true, 950); return; }
  const typed = q.mode === 'tile' ? q.sel.map(k => q.tiles[k]).join('') : (($('#lgin') || {}).value || '');
  lgFB(false, `${skip ? '' : `<div class="small">${t('Kamu')}: <b>${esc(typed) || '—'}</b> · ${Math.round(res.frac * 100)}%</div>`}${legend}<div class="small muted">${esc(it.tr)}</div>
    <div class="row wrap lg-fbtn"><button class="btn sec small" data-lg="say" data-v="${esc(it.zh)}">${ICON('speaker')} ${t('Dengar lagi')}</button><button class="btn sec small" data-lg="slow">${ICON('slow')} 0.6×</button></div>`, res.frac);
  lgAfter(false);
}
