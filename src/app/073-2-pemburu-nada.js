/* ===== 2. PEMBURU NADA ===== */
function lgToneOpts(chars, tones, n) {
  const ban = lgToneAlts(chars, tones); const key = tones.join('-'); const L = tones.length; const out = [tones.slice()]; const have = new Set([key]);
  const ok = p => { const k = p.join('-'); if (have.has(k) || ban.has(k)) return false; have.add(k); out.push(p); return true; };
  if (L === 1) { [1, 2, 3, 4].forEach(x => ok([x])); if (tones[0] === 5) { out.length = 0; have.clear(); have.add('5'); out.push([5]); shuffle([1, 2, 3, 4]).slice(0, n - 1).forEach(x => ok([x])); } return shuffle(out.slice(0, n)); }
  const tv = j => (j > 0 ? [1, 2, 3, 4, 5] : [1, 2, 3, 4]);
  const one = []; for (let j = 0; j < L; j++) tv(j).forEach(x => { if (x !== tones[j]) { const p = tones.slice(); p[j] = x; one.push(p); } });
  shuffle(one).forEach(p => out.length < n && ok(p));
  for (let g = 0; out.length < n && g < 80; g++) ok(tones.map((x, j) => (Math.random() < 0.5 ? pick(tv(j)) : x)));
  return shuffle(out.slice(0, n));
}
const lgPatHTML = p => `<span class="lg-pat">${contourSVG(p, 26)}</span><span class="lg-patn">${p.map(x => `<b class="t${x}">${x === 5 ? '·' : x}</b>`).join('<i>-</i>')}</span>`;
function lgQNada() {
  const [mn, mx, n] = [[1, 1, 4], [2, 2, 4], [2, 2, 6], [2, 3, 6], [3, 4, 6]][LG.lv];
  const i = lgPickW(mn, mx); const it = lgWItem(i); const chars = [...it.zh];
  const opts = lgToneOpts(chars, it.tones, it.tones.length === 1 ? Math.min(n, 4) : n);
  LG.q = { item: it, opts, done: false };
  $('#lgst').innerHTML = `${lgPromptHTML(`<div class="lg-hide" id="lgrev"><span class="hz">${'？'.repeat(chars.length)}</span></div>${lgNoVoice(it.sy).replace(/class="t\d"/g, '')}`)}
    <div class="lg-opts lg-tones n${opts.length}">${opts.map((p, j) => `<button class="lg-opt lg-topt" data-lg="pick" data-v="${j}"><span class="lg-key">${j + 1}</span>${lgPatHTML(p)}</button>`).join('')}</div>
    <div class="lg-fb" id="lgfb"></div>`;
  lgAutoSay(it.zh);
}
function lgPickNada(j, btn) {
  const q = LG.q; if (!q || q.done) return; q.done = true; const it = q.item; const chars = [...it.zh];
  const p = q.opts[j]; const alts = lgToneAlts(chars, it.tones); const ok = alts.has(p.join('-'));
  document.querySelectorAll('#lgst .lg-opt').forEach((b, x) => { b.classList.add(alts.has(q.opts[x].join('-')) ? 'ok' : x === j ? 'bad' : 'dim'); b.disabled = true; });
  const rv = $('#lgrev'); if (rv) { rv.innerHTML = `<span class="hz">${hzHTML({ w: it.zh, y: it.sy.map(s => s.y), t: it.tones })}</span><span class="lg-rpy">${lgPyHTML(it.sy)}</span><small class="muted">${esc(it.tr)}</small>`; rv.classList.add('on'); }
  if (!ok) { const tc = S.adapt && S.adapt.tc; if (tc) it.tones.forEach((c, k) => { const a = p[k]; if (c >= 1 && c <= 4 && a >= 1 && a <= 4 && c !== a) tc[c - 1][a - 1]++; }); }
  lgAnswer(ok, 0, it, btn);
  const sandhi = lgHasSandhi(chars, it.tones) ? `<div class="lg-hint">${ICON('lightbulb')} <span>${lgSandhiHint(chars, it.tones)}</span></div>` : '';
  if (ok) { lgFB(true, `<div class="lg-fbrow">${lgPatHTML(it.tones)}<span class="hz">${esc(it.zh)}</span><span class="muted">${esc(it.tr)}</span></div>${sandhi}`); lgAfter(true, sandhi ? 1500 : 850); return; }
  lgFB(false, `<div class="lg-cmpn"><div><small>${t('Jawaban')}</small>${lgPatHTML(it.tones)}</div><div><small>${t('Pilihanmu')}</small>${lgPatHTML(p)}</div></div>
    <div class="row wrap lg-fbtn"><button class="btn sec small" data-lg="hum" data-v="${it.tones.join(',')}">${ICON('wave')} ${t('Dengar kontur nada')}</button><button class="btn sec small" data-lg="say" data-v="${esc(it.zh)}">${ICON('speaker')} ${t('Dengar kata')}</button></div>${sandhi}`);
  lgAfter(false);
}
function lgSandhiHint(chars, tones) {
  const sp = lgSpoken(chars, tones);
  if (chars.includes('不')) return t('不 berubah jadi bú sebelum nada 4. Pilih nada kamusnya.');
  if (chars.includes('一')) return t('一 berubah: yí sebelum nada 4, yì sebelum nada 1/2/3. Pilih nada kamusnya.');
  return t('Sandhi 3-3: ditulis {a}, tapi diucapkan {b}. Pilih nada tulisannya.', { a: tones.join('-'), b: sp.join('-') });
}
