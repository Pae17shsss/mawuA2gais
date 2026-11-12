/* =====================================================================
   SOAL
   ===================================================================== */
function tmDis(T, x, n, key, extra) {
  const w = W[x.wid]; const pos = tmPos(w); const m0 = meanP(w); const out = []; const seen = new Set([key(w)]);
  const tw = tmWords(T).map(y => W[y.wid]);
  const oth = tmAll().filter(U => U !== T).flatMap(U => tmWords(U).map(y => W[y.wid]));
  const ok = o => o && o.i !== w.i && o.m && tmHz(o) !== tmHz(w) && meanP(o) !== m0 && !seen.has(key(o)) && (!extra || extra(o));
  const pools = [tw.filter(o => tmPos(o) === pos), tw, oth.filter(o => tmPos(o) === pos && Math.abs(tmLvOf(o) - tmLvOf(w)) <= 1), oth, A2.filter(o => tmPos(o) === pos && Math.abs(o.l - w.l) <= 1)];
  for (const src of pools) for (const o of shuffle(src)) { if (out.length >= n) return out; if (ok(o)) { seen.add(key(o)); out.push(o); } }
  return out;
}
const tmFbW = w => `<span class="hz kl-fbz">${esc(tmHz(w))}</span><small>${esc(tmPyTxt(w))} · ${esc(meanP(w))}</small>`;
const tmFbS = (ex, f) => `<div class="tm-fbs">${klLine(ex.zh, ex.py, { tg: f })}</div><small>${esc(kx(ex))}</small>`;
const TM_QT = { cloze: ['Lengkapi kalimat', 'kal'], py2hz: ['Pinyin → hanzi', 'baca'], mean2hz: ['Arti → hanzi', 'baca'], hz2mean: ['Hanzi → arti', 'baca'], audio2hz: ['Dengar → hanzi', 'dengar'], typehz: ['Ketik hanzi', 'tulis'], typesent: ['Ketik kata yang hilang', 'tulis'], order: ['Susun kalimat', 'kal'], listenpy: ['Dengar → ketik pinyin', 'dengar'], typepy: ['Ketik pinyin', 'dengar'] };
const TM_CAT = { baca: 'Membaca', dengar: 'Mendengar', tulis: 'Mengetik', kal: 'Kalimat' };
const tmPyKey = o => tmPyTxt(o).replace(/\s+/g, '');
function tmMcq(T, x, qt, learn) {
  const w = W[x.wid]; const base = { lx: 1, type: 'lmcq', tm: 1, qt, wid: x.wid, x, kind: 'tm' };
  if (qt === 'hz2mean') {
    const os = shuffle([w, ...tmDis(T, x, 3, o => meanP(o))]);
    return Object.assign(base, { label: 'Apa artinya?', ic: 'book', q: esc(tmHz(w)), qhz: 1, qpy: learn ? tmPyTxt(w) : '', opts: os.map(o => ({ t: meanP(o) })), a: os.indexOf(w), say: tmHz(w), fb: tmFbW(w) });
  }
  if (qt === 'mean2hz' || qt === 'py2hz' || qt === 'audio2hz') {
    const os = shuffle([w, ...tmDis(T, x, 3, o => tmHz(o), o => tmPyKey(o) !== tmPyKey(w))]);
    const o = Object.assign(base, { opts: os.map(z => ({ t: tmHz(z), hz: 1 })), a: os.indexOf(w), say: tmHz(w), fb: tmFbW(w) });
    if (qt === 'mean2hz') return Object.assign(o, { label: 'Pilih hanzinya', ic: 'search', q: `<span class="tm-qmean">${esc(meanP(w))}</span>` });
    if (qt === 'py2hz') return Object.assign(o, { label: 'Pinyin ini hanzinya yang mana?', ic: 'tone', q: `<span class="tm-qpy">${pinyinHTML(w, 'mark')}</span>` });
    return Object.assign(o, { label: 'Dengar, lalu pilih hanzinya', ic: 'headphone', auto: tmHz(w), vis: `<div class="tm-aud"><button class="speak huge" data-s="saysent" data-v="${esc(tmHz(w))}" aria-label="${t('Putar suara')}">${ICON('speaker')}</button><button class="btn ghost small" data-s="saysent" data-slow="1" data-v="${esc(tmHz(w))}">${ICON('slow')} ${t('pelan')}</button></div>` });
  }
  return null;
}
function tmCloze(T, x) {
  const w = W[x.wid]; const ex = x.ex; if (!ex || !ex.zh) return null; const f = tmForm(w, ex.zh, x.hz); const at = f ? ex.zh.indexOf(f) : -1; if (at < 0) return null;
  const ds = tmDis(T, x, 3, o => tmHz(o), o => !ex.zh.includes(tmHz(o)));
  const os = shuffle([{ t: f, hz: 1, ok: 1 }, ...ds.map(o => ({ t: tmHz(o), hz: 1 }))]);
  return { lx: 1, type: 'lmcq', tm: 1, qt: 'cloze', wid: x.wid, x, kind: 'tm', label: 'Lengkapi kalimatnya', ic: 'puzzle', q: esc(ex.zh.slice(0, at)) + '<span class="blank">▢</span>' + esc(ex.zh.slice(at + f.length)), qhz: 1, tr: ex, opts: os, a: os.findIndex(o => o.ok), say: ex.zh, fb: tmFbS(ex, f) };
}
/* susun kalimat: potong kalimat jadi kata (pencocokan terpanjang ke daftar kata) */
function tmChunks(zh) {
  const m = tmIdx(); let out = []; const s = String(zh || '');
  for (let i = 0; i < s.length;) {
    if (!isHan(s[i])) { if (out.length) out[out.length - 1] += s[i]; else out.push(s[i]); i++; continue; }
    let L = Math.min(4, s.length - i); while (L > 1 && !m.has(s.substr(i, L))) L--;
    out.push(s.substr(i, L)); i += L;
  }
  while (out.length > 7) { let best = -1; for (let j = 0; j < out.length - 1; j++) { const a = out[j].replace(/[^㐀-鿿]/g, ''), b = out[j + 1].replace(/[^㐀-鿿]/g, ''); if (a.length === 1 && b.length <= 2 && !/[，。！？、]$/.test(out[j])) { best = j; break; } } if (best < 0) best = 0; out.splice(best, 2, out[best] + out[best + 1]); }
  return out;
}
function tmBuild(ex, x) {
  if (!ex || !ex.zh) return null; const cs = tmChunks(ex.zh); if (cs.length < 3 || new Set(cs).size < 3) return null;
  return { type: 'build', tm: 1, qt: 'order', x: x || null, tmw: x ? x.wid : undefined, ex, sent: { chunks: cs.map(c => ({ hz: c, py: '' })), zh: cs.join(''), py: ex.py, tr: [ex.id || ex.en, ex.en || ex.id, ex.tl || ex.en, ex.vi || ex.en] } };
}
function tmQ(T, x, qt) {
  if (qt === 'cloze') return tmCloze(T, x);
  if (qt === 'typehz') return { lx: 1, type: 'tmtype', tm: 1, qt, mode: 'word', wid: x.wid, x };
  if (qt === 'typesent') { const w = W[x.wid]; const f = tmForm(w, x.ex.zh, x.hz); return f ? { lx: 1, type: 'tmtype', tm: 1, qt, mode: 'sent', f, wid: x.wid, x } : null; }
  if (qt === 'listenpy' || qt === 'typepy') return aligned(W[x.wid]) ? { lx: 1, type: 'tmpy', tm: 1, qt, audio: qt === 'listenpy', wid: x.wid, x } : null;
  if (qt === 'order') return tmBuild(x.ex, x);
  return tmMcq(T, x, qt, false);
}
function tmBuildSet(T, si) {
  const st = tmPrep(T).sets[si]; if (!st) return []; const ws = st.words; const out = []; const vo = voiceOK();
  for (let j = 0; j < ws.length; j += 5) {
    const ch = ws.slice(j, j + 5);
    ch.forEach(x => out.push({ type: 'intro', wid: x.wid, tmx: x, ph: 0 }));
    shuffle(ch).forEach((x, k) => { const it = tmMcq(T, x, ['hz2mean', 'mean2hz', vo ? 'audio2hz' : 'py2hz'][(j + k) % 3], true); if (it) out.push(Object.assign(it, { ph: 1 })); });
  }
  if (ws.length >= 4) out.push({ type: 'match', ids: shuffle(ws).slice(0, 5).map(x => x.wid), ph: 1 });
  shuffle(ws).slice(0, 6).forEach(x => { const c = tmCloze(T, x); if (c) out.push(Object.assign(c, { ph: 2 })); });
  const G = T.grammar || []; if (G.length) { const gi = si % G.length; out.push({ lx: 1, type: 'tmgram', tm: 1, k: T.k, gi, ph: 3 }); (G[gi].ex || []).forEach(e => { const b = tmBuild(e); if (b) out.push(Object.assign(b, { ph: 3 })); }); }
  shuffle(ws).slice(0, 2).forEach(x => out.push({ lx: 1, type: 'tmtype', tm: 1, qt: 'typehz', mode: 'word', wid: x.wid, x, ph: 4, learn: 1 }));
  out.push({ lx: 1, type: 'tmrecap', tm: 1, k: T.k, si, ph: 4 });
  return out.filter(Boolean);
}
function tmBuildExam(T) {
  const ws = shuffle(tmWords(T)); const vo = voiceOK();
  const plan = ['cloze', 'cloze', 'cloze', 'py2hz', 'py2hz', 'mean2hz', 'mean2hz', 'hz2mean', 'hz2mean', vo ? 'audio2hz' : 'mean2hz', vo ? 'audio2hz' : 'py2hz', 'typehz', 'typehz', 'typesent', 'typesent', 'order', 'order', vo ? 'listenpy' : 'typepy'];
  const out = []; let j = 0;
  plan.forEach(qt => {
    let it = null;
    for (let tries = 0; tries < ws.length && !it; tries++) { const x = ws[j++ % ws.length]; it = tmQ(T, x, qt); if (!it && qt === 'order') { const g = pick(T.grammar || [{}]); const e = g.ex && pick(g.ex); it = e ? tmBuild(e, x) : null; } }
    if (!it) it = tmQ(T, ws[j++ % ws.length], 'mean2hz');
    if (it) out.push(Object.assign(it, { exam: 1 }));
  });
  const sh = shuffle(out); const k = sh.findIndex(x => x.type === 'lmcq'); if (k > 0) sh.unshift(sh.splice(k, 1)[0]);
  return sh;
}
function tmBuildPrac(T, xs) {
  const vo = voiceOK(); const out = [];
  shuffle(xs).forEach((x, j) => { const it = tmMcq(T, x, ['hz2mean', 'mean2hz', vo ? 'audio2hz' : 'py2hz'][j % 3], true); if (it) out.push(it); });
  shuffle(xs).slice(0, 8).forEach(x => { const c = tmCloze(T, x); if (c) out.push(c); });
  shuffle(xs).slice(0, 4).forEach(x => out.push({ lx: 1, type: 'tmtype', tm: 1, qt: 'typehz', mode: 'word', wid: x.wid, x, learn: 1 }));
  return out;
}

/* ---------- penilaian ketikan ---------- */
const tmNormHz = s => String(s || '').normalize('NFC').replace(/[\s\u3000，。！？、,.!?；;：:「」『』"'“”‘’（）()…~～]/g, '');
function tmHzOK(it, raw) {
  const w = W[it.wid]; const g = tmNormHz(raw); if (!g) return false;
  const fs = new Set([it.x && it.x.hz, it.f, ...wForms(w), w.w, w.s, ...(w.v || [])].filter(Boolean).map(tmNormHz));
  return fs.has(g);
}
function tmMarkSyl(b, tone) {
  if (!(tone >= 1 && tone <= 4)) return b;
  let k = b.indexOf('a'); if (k < 0) k = b.indexOf('e'); if (k < 0 && b.includes('ou')) k = b.indexOf('o');
  if (k < 0) for (let j = b.length - 1; j >= 0; j--) if ('aeiouü'.includes(b[j])) { k = j; break; }
  if (k < 0) return b; return b.slice(0, k) + TONE_MARKS[b[k]][tone - 1] + b.slice(k + 1);
}
function tmPyOK(w, raw) {
  const fixU = s => s.replace(/([jqxy])ü/g, '$1u');
  let s = String(raw || '').normalize('NFC').toLowerCase().replace(/u:/g, 'ü').replace(/v/g, 'ü').replace(/[\s'’\-·.,，。!?！？()（）]/g, '');
  if (!s) return { ok: false };
  const bases = w.y.map(y => stripTone(y.normalize('NFC').toLowerCase()));
  const hz = [...tmHz(w)].filter(isHan);
  let combos = [w.t.slice()];
  hz.forEach((c, k) => { if (k >= w.t.length) return; const alt = c === '一' ? [1, 2, 4] : c === '不' ? [2, 4] : null; if (!alt) return; const nx = []; combos.forEach(ts => alt.forEach(a => { const z = ts.slice(); z[k] = a; nx.push(z); })); combos = nx.concat(combos).slice(0, 24); });
  const marks = hasMarks(s);
  const want = combos.map(ts => fixU(marks ? bases.map((b, k) => tmMarkSyl(b, ts[k])).join('') : bases.map((b, k) => b + (ts[k] >= 1 && ts[k] <= 4 ? ts[k] : '')).join('')));
  const got = fixU(s.replace(/[05]/g, ''));
  const ok = want.includes(got);
  const near = !ok && fixU(stripTone(got).replace(/\d/g, '')) === fixU(bases.join(''));
  return { ok, near };
}

/* ---------- render soal khusus ---------- */
const TM_PH = ['Kenalan', 'Latihan', 'Kalimat', 'Pola', 'Rangkuman'];
function tmPhase(it) {
  if (!SES || !SES.opts || SES.opts.tmSet === undefined || it.ph === undefined) return;
  const c = $('#sbody .s-card'); if (!c || c.querySelector('.tm-ph')) return;
  c.insertAdjacentHTML('afterbegin', `<div class="tm-ph" aria-label="${t('Set belajar')}">${TM_PH.map((p, i) => `<span class="${i < it.ph ? 'done' : i === it.ph ? 'on' : ''}">${t(p)}</span>`).join('')}</div>`);
}
function tmRenderType(it) {
  if (!it.opts) { it.opts = []; it.a = -1; }
  progressBar(); SES.answered = false; SES.shown = Date.now(); SES.m = null;
  const w = W[it.wid]; let pr;
  if (it.mode === 'sent') { const ex = it.x.ex; const at = ex.zh.indexOf(it.f); pr = `<div class="kl-qz hz">${esc(ex.zh.slice(0, at))}<span class="blank">▢</span>${esc(ex.zh.slice(at + it.f.length))}</div><div class="q-mean">${esc(kx(ex))}</div>`; }
  else pr = `<div class="tm-tq"><div class="tm-tmean">${esc(meanP(w))}</div><div class="q-py">${pinyinHTML(w, 'mark')}</div></div>`;
  $('#sbody').innerHTML = `<div class="s-card glass kl-q tm-q"><div class="q-kind">${ICON('keyboard')} ${t(it.mode === 'sent' ? 'Ketik kata yang hilang' : 'Ketik hanzinya')}</div>${pr}
    <input class="type-in tm-in hz" id="tmin" type="text" lang="zh-Hant" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="done" aria-label="${t('Jawaban hanzi')}" placeholder="${t('ketik hanzi di sini')}">
    <div class="small muted tm-kbn">${ICON('keyboard')} ${t('Pakai keyboard Mandarin 注音/拼音 (karakter tradisional) di HP/laptopmu. Tanpa petunjuk — ingat sendiri!')}</div></div>`;
  $('#sfoot').innerHTML = `<div class="inner row" style="gap:10px"><button class="btn sec big" data-s="tmskip">${t('Tidak tahu')}</button><button class="btn pri big grow" data-s="tmcheck">${t('Periksa')}</button></div>`;
  $('#sbody').scrollTop = 0; setTimeout(() => { const i = $('#tmin'); if (i && SES && cur() === it) try { i.focus({ preventScroll: true }); } catch (e) {} }, 80);
}
function tmCheckType(skip) {
  if (!SES || SES.answered) return; const it = cur(); if (!it || it.type !== 'tmtype') return;
  const inp = $('#tmin'); const raw = inp ? inp.value : '';
  if (!skip && !tmNormHz(raw)) { if (inp) inp.focus(); return; }
  const w = W[it.wid]; const ok = !skip && tmHzOK(it, raw);
  SES.tmGiven = skip ? '—' : raw.trim();
  const ex = it.x && it.x.ex; const f = it.f || (ex ? tmForm(w, ex.zh, it.x.hz) : '');
  it.fb = `${tmFbW(w)}${!ok && !skip ? `<small>${t('Jawabanmu')}: <b class="hz">${esc(raw.trim())}</b></small>` : ''}${it.mode === 'sent' && ex ? tmFbS(ex, f) : ''}`;
  if (inp) { inp.disabled = true; inp.classList.add(ok ? 'ok' : 'bad'); }
  answer(ok);
  const bl = $('#sbody .blank'); if (bl && it.mode === 'sent') { bl.textContent = it.f; bl.classList.add(ok ? 'fill-ok' : 'fill-bad'); }
}
function tmRenderPy(it) {
  if (!it.opts) { it.opts = []; it.a = -1; }
  progressBar(); SES.answered = false; SES.shown = Date.now(); SES.m = null;
  const w = W[it.wid]; const au = it.audio && voiceOK();
  const top = au ? `<div class="tm-aud"><button class="speak huge" data-s="say" aria-label="${t('Putar suara')}">${ICON('speaker')}</button><button class="btn ghost small" data-s="say" data-slow="1">${ICON('slow')} ${t('per suku kata')}</button></div>`
    : `<div class="q-hz hz ${tmHz(w).length > 3 ? 'sm' : ''}">${esc(tmHz(w))}</div><div class="q-mean">${esc(meanP(w))}</div>`;
  $('#sbody').innerHTML = `<div class="s-card glass tm-q"><div class="q-kind">${ICON(au ? 'headphone' : 'keyboard')} ${t(au ? 'Dengar, lalu ketik pinyin-nya' : 'Ketik pinyin-nya')}</div>${top}
    <input class="type-in" id="tin" autocomplete="off" autocapitalize="off" spellcheck="false" inputmode="${sysKbd() ? 'text' : 'none'}" ${sysKbd() ? '' : 'readonly'} placeholder="${t('contoh: nǐ hǎo')}" aria-label="Pinyin">
    <div class="small muted" style="text-align:center">${t('Angka 1–4 untuk nada (atau tanda nada), spasi boleh tidak. ü bisa diketik v.')}</div></div>`;
  $('#sfoot').innerHTML = pkbHTML();
  $('#sbody').scrollTop = 0;
  if (au) speakFor(it, tmHz(w), 300);
  if (sysKbd()) setTimeout(() => $('#tin') && $('#tin').focus(), 60);
}
function tmCheckPy() {
  if (!SES || SES.answered) return; const it = cur(); const inp = $('#tin'); if (!inp) return;
  const raw = inp.value.trim(); if (!raw) { inp.focus(); return; }
  const w = W[it.wid]; const r = tmPyOK(w, raw); SES.tmGiven = raw;
  it.fb = `${tmFbW(w)}${!r.ok ? `<small>${t('Jawabanmu')}: <b>${esc(raw)}</b>${r.near ? ' — ' + t('Hurufnya sudah benar — tinggal nadanya.') : ''}</small>` : ''}`;
  inp.disabled = true; inp.style.borderColor = r.ok ? 'var(--ok)' : 'var(--bad)';
  answer(r.ok);
}
function tmRenderRead(it) {
  progressBar(); SES.answered = true; SES.shown = Date.now(); SES.m = null;
  const T = tmT(it.k); let body = '';
  if (it.type === 'tmgram') {
    const g = T.grammar[it.gi];
    body = `<div class="q-kind">${ICON('grammar')} ${t('Pola kalimat')}</div><h3 class="tm-rh">${esc(kx(g.title))}</h3><div class="tm-pat">${tmPat(g.pattern)}</div><p class="tm-note">${esc(kx(g.note))}</p><div class="tm-gex">${(g.ex || []).map(e => tmExHTML(e, '', 'data-s="saysent"')).join('')}</div>`;
  } else {
    const st = tmPrep(T).sets[it.si];
    body = `<div class="q-kind">${ICON('check')} ${t('Rangkuman set')} · ${esc(kx(st.title))}</div><p class="small muted" style="margin:4px 0 10px">${t('Kata-kata ini sudah masuk kartu ulanganmu. Ucapkan sekali lagi sambil melihat tabelnya.')}</p>
      <div class="tm-recap">${st.words.map(x => { const w = W[x.wid]; return `<button class="tm-rc" data-s="saysent" data-v="${esc(tmHz(w))}"><b class="hz">${esc(tmHz(w))}</b><span class="tm-rcp">${pinyinHTML(w, 'mark')}</span><span class="tm-rcm">${esc(shortMean(meanP(w)))}</span>${ICON('speaker')}</button>`; }).join('')}</div>`;
  }
  $('#sbody').innerHTML = `<div class="s-card glass kl-read tm-read">${body}</div>`;
  $('#sfoot').innerHTML = `<div class="inner"><button class="btn pri big wide" data-s="next">${t(it.type === 'tmrecap' ? 'Selesai' : 'Paham, lanjut')}</button></div>`;
  $('#sbody').scrollTop = 0; FX.play('flip');
}
const _renderItemTM = _renderItem;
_renderItem = function () {
  const it = cur();
  if (it && it.type === 'tmtype') tmRenderType(it);
  else if (it && it.type === 'tmpy') tmRenderPy(it);
  else if (it && (it.type === 'tmgram' || it.type === 'tmrecap')) tmRenderRead(it);
  else {
    _renderItemTM();
    if (it && it.tmx && it.type === 'intro') {
      const x = it.tmx; const w = W[x.wid]; const s0 = $('#sbody .subs');
      const h = `<div class="tm-iex">${x.mw ? `<span class="chip">${t('Kata ukur')}: <b class="hz">${esc(x.mw)}</b></span>` : ''}${tmExHTML(x.ex, tmForm(w, x.ex.zh, x.hz), 'data-s="saysent"')}</div>`;
      if (s0) s0.insertAdjacentHTML('afterend', h);
    }
    if (it && it.tm && it.auto) speakFor(it, it.auto, 280);
  }
  if (it) tmPhase(it);
};

/* ---------- jawaban: catat hasil, SRS, ketikan ---------- */
let TM_CE = 0; let TM_COMP = false;
document.addEventListener('compositionstart', e => { if (e.target && e.target.id === 'tmin') TM_COMP = true; });
document.addEventListener('compositionend', e => { if (e.target && e.target.id === 'tmin') { TM_COMP = false; TM_CE = Date.now(); } });
const checkTypeTM = checkType;
checkType = function () {
  const it = SES && cur();
  if (it && it.type === 'tmtype') { if (TM_COMP || Date.now() - TM_CE < 90) return; return tmCheckType(false); }
  if (it && it.type === 'tmpy') return tmCheckPy();
  return checkTypeTM();
};
const pickOptTM = pickOpt;
pickOpt = function (b) {
  if (SES && !SES.answered && SES.opts && SES.opts.tema && b) { const c = b.cloneNode(true); c.querySelectorAll('kbd').forEach(k => k.remove()); SES.tmGiven = c.textContent.trim(); }
  return pickOptTM(b);
};
/* susun kalimat: terima juga urutan waktu ↔ subjek yang sama-sama benar (我今天… = 今天我…) */
const TM_TIME = /^(今天|明天|昨天|後天|前天|現在|週末|周末|晚上|早上|上午|中午|下午|每天|今年|明年|去年|最近|以後|以前|剛才|平常|常常)$/;
const buildCheckTM = buildCheck;
buildCheck = function () {
  const it = SES && cur();
  if (!it || it.type !== 'build' || !it.tm || SES.answered || !SES.b) return buildCheckTM();
  const got = SES.b.picked.map(k => it.sent.chunks[k].hz); const want = it.sent.chunks.map(c => c.hz);
  if (got.length !== want.length) return buildCheckTM();
  let ok = got.join('') === want.join('');
  if (!ok && want.length >= 3) { const sw = want.slice(); [sw[0], sw[1]] = [sw[1], sw[0]]; const strip = a => a.map(c => c.replace(/[，。！？]/g, '')); if ((TM_TIME.test(strip(want)[0]) || TM_TIME.test(strip(want)[1])) && strip(got).join('') === strip(sw).join('')) ok = true; }
  const bl = $('#bline'); if (bl) bl.querySelectorAll('.chunk').forEach((el, j) => el.classList.add(ok || got[j] === want[j] ? 'ok' : 'bad'));
  answer(ok);
};
const answerTM = answer;
answer = function (ok, note) {
  const it = SES && !SES.answered ? cur() : null;
  let given = SES ? SES.tmGiven : '';
  if (it && it.type === 'build' && SES.b) given = SES.b.picked.map(k => it.sent.chunks[k].hz).join('');
  const r = answerTM(ok, note);
  try {
    if (it && SES && SES.opts && SES.opts.tema && SES.answered) {
      if (it.lx && it.tm && it.wid !== undefined && W[it.wid]) { if (!S.cards[it.wid]) introduce(it.wid); grade(it.wid, ok, true); }
      (SES.tmRes = SES.tmRes || []).push({ it, ok: !!ok, given: given || '' });
      SES.tmGiven = '';
      if (it.exam && !ok && it.type === 'build') { const sm = $('#sfoot .fb small'); if (sm) sm.insertAdjacentHTML('beforebegin', `<small>${t('Jawabanmu')}: <span class="hz">${esc(given)}</span></small>`); }
      save();
    }
  } catch (e) { console.warn('tema answer', e); }
  return r;
};
document.addEventListener('keydown', e => {
  if (!SES || e.key !== 'Enter' || !e.target || e.target.id !== 'tmin') return;
  if (e.isComposing || e.keyCode === 229) { e.stopImmediatePropagation(); e.preventDefault(); }
}, true);

/* ---------- akhir sesi ---------- */
function tmSetSummary(o) {
  const T = tmT(o.tema); if (!T) return; const st = tmPrep(T).sets[o.tmSet]; if (!st) return;
  const tot = SES.ok + SES.bad; const acc = tot ? Math.round(SES.ok / tot * 100) : 100;
  const th = tmTh(T.k); const prev = th.sets[st.key] || {};
  th.sets[st.key] = { sc: Math.max(prev.sc || 0, acc), d: todayKey() }; save();
  const nsi = tmNextSet(T); const sum = $('#sbody .summary'); if (!sum) return;
  const msg = acc >= 60 ? `<div class="notice tm-ok">${ICON('check')} ${t('Set {n} selesai ({p}%)', { n: o.tmSet + 1, p: acc })}${nsi < 0 && !tmPass(T) ? ' ' + t('Semua set selesai — saatnya ujian tema!') : ''}</div>` : `<div class="notice">${t('Skor {p}% — ulangi set ini sekali lagi supaya lebih nempel (butuh 60%).', { p: acc })}</div>`;
  const k = sum.querySelector('.kpis'); (k || sum).insertAdjacentHTML('afterend', msg);
  const row = sum.querySelector('.row.wrap:last-child');
  if (row) { row.querySelectorAll('[data-s="routego"]').forEach(x => x.remove()); if (acc >= 60) row.insertAdjacentHTML('beforeend', nsi >= 0 ? `<button class="btn pri" data-s="tmgo" data-v="set:${nsi}">${t('Set berikutnya')}: ${nsi + 1} ${ICON('chevron')}</button>` : `<button class="btn pri" data-s="tmgo" data-v="exam">${ICON('crown')} ${t('Ujian tema')}</button>`); }
}
function tmExamSummary(o, res) {
  const T = tmT(o.tema); if (!T) return;
  const tot = res.length; const okN = res.filter(r => r.ok).length; const sc = tot ? Math.round(okN / tot * 100) : 0; const pass = sc >= 80;
  const th = tmTh(T.k); const first = pass && !th.pass;
  th.tries = (th.tries || 0) + 1; th.last = sc; th.lastD = todayKey(); th.best = Math.max(th.best || 0, sc); if (pass && !th.pass) th.pass = todayKey();
  const wrong = res.filter(r => !r.ok); th.weak = [...new Set(wrong.map(r => r.it.x && r.it.x.hz).filter(Boolean))]; save();
  const cats = {}; res.forEach(r => { const c = (TM_QT[r.it.qt] || ['', 'baca'])[1]; const v = cats[c] = cats[c] || [0, 0]; v[1]++; if (r.ok) v[0]++; });
  const rev = wrong.map(r => {
    const it = r.it; const w = it.wid !== undefined ? W[it.wid] : it.tmw !== undefined ? W[it.tmw] : null; const x = it.x; const qt = TM_QT[it.qt] || [''];
    let q = '', ans = '';
    if (it.qt === 'order') { q = esc(kx(it.ex)); ans = `<span class="hz">${esc(it.sent.zh)}</span>${lvBadgeS(it.sent.zh)} <small>${esc(it.ex.py)}</small>`; }
    else if (w) {
      q = it.qt === 'hz2mean' ? `<span class="hz">${esc(tmHz(w))}</span>` : it.qt === 'mean2hz' || it.qt === 'typehz' ? esc(meanP(w)) : it.qt === 'py2hz' ? esc(tmPyTxt(w)) : (it.qt === 'cloze' || it.qt === 'typesent') && x ? `<span class="hz">${esc(x.ex.zh.replace(it.f || tmForm(w, x.ex.zh, x.hz), '＿＿'))}</span>` : ICON('speaker');
      ans = `<b class="hz">${esc(tmHz(w))}</b>${lvBadgeW(w.i)} <span class="tm-rvpy">${pinyinHTML(w, 'mark')}</span> <span class="tm-rvm">${esc(meanP(w))}</span>`;
    }
    const ex = it.qt === 'order' ? null : x && x.ex;
    return `<div class="tm-rv"><div class="tm-rvh"><span class="tm-rvt">${t(qt[0])}</span><span class="tm-rvq">${q}</span></div>
      <div class="tm-rvy">${ICON('close')} ${t('Jawabanmu')}: <span class="${/[㐀-鿿]/.test(r.given || '') ? 'hz' : ''}">${esc(r.given || '—')}</span></div><div class="tm-rva">${ICON('check')} ${t('Jawaban benar')}: ${ans}</div>
      ${ex ? tmExHTML(ex, w ? tmForm(w, ex.zh, x.hz) : '', 'data-s="saysent"') : ''}</div>`;
  }).join('');
  const body = $('#sbody'); if (!body) return;
  body.innerHTML = `<div class="s-card glass summary tm-sum"><div class="sum-hero">${mascot(pass ? 'wow' : sc >= 60 ? 'think' : 'oops', 120)}</div>
    <div class="tm-res ${pass ? 'ok' : 'bad'}"><div class="tm-score"><b>${sc}%</b><span>${t('{a}/{b} benar', { a: okN, b: tot })}</span></div><div class="grow" style="min-width:0"><h1>${t(pass ? 'Lulus! Tema ini selesai' : 'Belum lulus — butuh 80%')}</h1>
      <p class="small">${esc(T.zh)} · ${esc(tmTitle(T))}</p><p class="small muted">${t('Skor terbaik {p}%', { p: th.best })}${th.pass ? ' · ' + t('Lulus sejak {d}', { d: tmFmtD(th.pass) }) : ''}</p>${pass ? '' : `<p class="small">${t('Ulangi kata yang salah, lalu coba lagi — kamu pasti bisa.')}</p>`}</div></div>
    <div class="tm-cats">${Object.keys(TM_CAT).filter(c => cats[c]).map(c => `<div class="tm-cat"><span>${t(TM_CAT[c])}</span><span class="tm-cbar"><i style="width:${Math.round(cats[c][0] / cats[c][1] * 100)}%"></i></span><b>${cats[c][0]}/${cats[c][1]}</b></div>`).join('')}</div>
    ${wrong.length ? `<h3 class="tm-rvt0">${t('Periksa yang salah ({n})', { n: wrong.length })}</h3><div class="tm-rvl">${rev}</div>` : `<div class="notice tm-ok">${ICON('check')} ${t('Semua benar — sempurna!')}</div>`}
    <div class="row wrap tm-sumact"><button class="btn sec" data-s="home">${t('Kembali ke tema')}</button>${wrong.length ? `<button class="btn sec" data-s="tmgo" data-v="weak">${ICON('target')} ${t('Latih kata yang salah')}</button>` : ''}<button class="btn ${pass ? 'sec' : 'pri'}" data-s="again">${ICON('refresh')} ${t('Ulangi ujian')}</button></div></div>`;
  body.scrollTop = 0;
  if (first) { confetti(); toast(t('Selamat! Tema {s} lulus 🎉', { s: T.zh })); }
}
const showSummaryTM = showSummary;
showSummary = function () {
  if (!SES || SES.summarized || !SES.opts || !SES.opts.tema) return showSummaryTM();
  const o = SES.opts; const res = (SES.tmRes || []).slice();
  showSummaryTM();
  try { if (o.tmExam) tmExamSummary(o, res); else if (o.tmSet !== undefined) tmSetSummary(o); } catch (e) { console.warn('tema summary', e); }
};
const _sessionClickTM = _sessionClick;
_sessionClick = function (e) {
  const b = e.target.closest('[data-s]');
  if (b && SES) {
    const s = b.dataset.s;
    if (s === 'tmcheck') return tmCheckType(false);
    if (s === 'tmskip') return tmCheckType(true);
    if (s === 'tmgo') { const v = b.dataset.v; const k = SES.opts.tema; endSession(false, true); render(); setTimeout(() => { if (v === 'exam') tmStartExam(k); else if (v === 'weak') tmStartPrac(k, 'weak'); else if (v.startsWith('set:')) tmStartSet(k, +v.slice(4)); }, 60); return; }
    if (s === 'saysent' && b.dataset.slow && SES.opts && SES.opts.tema) { FX.ensure(); return say(b.dataset.v, true); }
  }
  return _sessionClickTM(e);
};

/* ---------- mulai sesi ---------- */
function tmStartSet(k, si) {
  const T = tmT(k); if (!T) return; const st = tmPrep(T).sets[si]; if (!st) return;
  tmStop(); const mk2 = () => tmBuildSet(T, si);
  startSession(mk2(), { title: `${T.zh} · ${t('Set {n}', { n: si + 1 })}`, tema: k, tmSet: si, noCover: 1, rebuild: mk2 });
}
function tmStartExam(k) {
  const T = tmT(k); if (!T) return; tmStop(); const mk2 = () => tmBuildExam(T);
  startSession(mk2(), { title: `${T.zh} · ${t('Ujian tema')}`, tema: k, tmExam: 1, noCover: 1, retry: false, rebuild: mk2 });
}
function tmStartPrac(k, what) {
  const T = tmT(k); if (!T) return; const s = tmS(); const th = tmTh(k);
  const xs = tmWords(T).filter(x => (what === 'star' ? s.star[x.hz] : th.weak.includes(x.hz)));
  if (!xs.length) return; tmStop(); const mk2 = () => tmBuildPrac(T, xs);
  startSession(mk2(), { title: `${T.zh} · ${t(what === 'star' ? 'Kata berbintang' : 'Kata lemah')}`, tema: k, tmPrac: what, noCover: 1, rebuild: mk2 });
}
function tmStartGram(k, gi) {
  const T = tmT(k); if (!T || !T.grammar || !T.grammar[gi]) return; const g = T.grammar[gi];
  const mk2 = () => [{ lx: 1, type: 'tmgram', tm: 1, k, gi }].concat(shuffle(g.ex || []).map(e => tmBuild(e)).filter(Boolean));
  const its = mk2(); if (its.length < 2) { toast(t('Pola ini belum punya contoh yang bisa disusun.')); return; }
  tmStop(); startSession(its, { title: `${T.zh} · ${t('Pola')} ${gi + 1}`, tema: k, tmGram: gi, noCover: 1, rebuild: mk2 });
}

/* ---------- aksi halaman ---------- */
Object.assign(ACT, {
  tmhub: () => { tmStop(); VK.view = 'tm'; if (ROUTE !== 'kelas') go('kelas'); else render(); window.scrollTo(0, 0); },
  tmopen: b => { tmStop(); TMV.k = b.dataset.v; TMV.tab = 'kata'; TMV.set = 'all'; TMV.open = null; TMV.role = ''; TMV.revd = {}; VK.view = 'tmt'; render(); window.scrollTo(0, 0); },
  tmlv: b => { tmS().lv = b.dataset.v === 'all' ? 'all' : +b.dataset.v; save(); render(); },
  tmtab: b => { tmStop(); TMV.tab = b.dataset.v; TMV.revd = {}; render(); },
  tmset: b => { tmStop(); TMV.set = b.dataset.v === 'all' ? 'all' : +b.dataset.v; TMV.open = null; render(); },
  tmhide: b => { const H = tmS().hide; H[b.dataset.v] = !H[b.dataset.v]; save(); render(); },
  tmpeek: b => { b.classList.toggle('peek'); },
  tmrow: b => { const f = b.dataset.v; TMV.open = TMV.open === f ? null : f; render(); if (TMV.open) { const w = W[tmIdx().get(f)]; if (w) TTS.speak(tmHz(w)); } },
  tmstar: b => { const s = tmS(); const f = b.dataset.v; if (s.star[f]) delete s.star[f]; else s.star[f] = 1; save(); render(); },
  tmknown: b => { const s = tmS(); const f = b.dataset.v; const wid = tmIdx().get(f); if (s.known[f]) delete s.known[f]; else { s.known[f] = 1; if (wid !== undefined) { if (typeof setWordStatus === 'function') setWordStatus(wid, 'known', true); else introduce(wid); } } save(); render(); },
  tmsay: b => { FX.ensure(); if (TTS.unlock) TTS.unlock(); tmStop(); say(b.dataset.v, !!b.dataset.slow); },
  tmlearn: b => { const T = tmT(TMV.k); if (T) tmStartSet(T.k, +b.dataset.v); },
  tmexam: () => { const T = tmT(TMV.k); if (T) tmStartExam(T.k); },
  tmprac: b => { const T = tmT(TMV.k); if (T) tmStartPrac(T.k, b.dataset.v); },
  tmgpr: b => { const T = tmT(TMV.k); if (T) tmStartGram(T.k, +b.dataset.v); },
  tmplay: b => tmPlayWords(b),
  tmdplay: b => tmPlayDialog(b),
  tmdpy: () => { tmStop(); TMV.dpy = !TMV.dpy; render(); },
  tmdtr: () => { tmStop(); TMV.dtr = !TMV.dtr; render(); },
  tmdtrl: b => { b.classList.toggle('on'); },
  tmrole: b => { tmStop(); TMV.role = b.dataset.v; TMV.revd = {}; render(); },
  tmdrev: b => { const i = +b.dataset.v; TMV.revd[i] = 1; const el = b.closest('.tm-dl'); if (el) el.classList.add('rev'); }
});
['tmlearn', 'tmexam', 'tmprac', 'tmgpr'].forEach(a => START_ACTS.add(a));
document.addEventListener('keydown', e => {
  if (SES || (e.key !== 'Enter' && e.key !== ' ')) return; const el = e.target;
  if (el && el.matches && el.matches('.tm-tr[data-a],.tm-mask,.tm-banner') && el === document.activeElement) { e.preventDefault(); el.click(); }
});