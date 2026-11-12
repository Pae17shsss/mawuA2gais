/* =====================================================================
   C. KALIMAT NYATA — setiap kata dalam 3 kalimat dengan pola grammar berbeda
   ===================================================================== */
let CXD = null; let CX_WAIT = []; let CX_ERR = false; let CX_BUSY = false;
function loadCtx(cb) {
  if (!CXD && window.XB_CTX) CXD = window.XB_CTX;
  if (CXD) { if (cb) cb(); return; }
  if (cb) CX_WAIT.push(cb);
  if (CX_BUSY) return; CX_BUSY = true; CX_ERR = false;
  const s = document.createElement('script'); s.src = 'ctx.js?v=k170'; s.async = true;
  s.onload = () => { CX_BUSY = false; CXD = window.XB_CTX || {}; const w = CX_WAIT; CX_WAIT = []; w.forEach(f => { try { f(); } catch (e) { console.error('ctx cb', e); } }); };
  s.onerror = () => { CX_BUSY = false; CX_ERR = true; const had = CX_WAIT.length; CX_WAIT = []; s.remove(); if (ROUTE === 'kalimat' && !SES) render(); else if (had) toast(t('Kalimat belum bisa dimuat — cek koneksi, lalu coba lagi.')); };
  document.head.appendChild(s);
}
const ctxOf = i => (CXD && CXD[i]) || null;
const CX_CACHE = {};
function wForms(w) {
  const f = new Set(); const a = String(w.w || '');
  [a.replace(/[()（）]/g, ''), a.replace(/[(（][^)）]*[)）]/g, ''), String(w.s || '').replace(/[()（）]/g, '')].concat((w.v || []).map(v => String(v).replace(/[()（）]/g, '')))
    .forEach(x => x.split(/[\/／、,，…~～]+/).forEach(y => { y = y.trim(); if (y && isHan(y[0])) f.add(y); }));
  return [...f].sort((x, y) => y.length - x.length);
}
/* kalimat → token per huruf dengan pinyin masing-masing, + posisi kata target */
function cxSent(i, k) {
  const key = i + ':' + k; if (CX_CACHE[key]) return CX_CACHE[key];
  const e = ctxOf(i) && ctxOf(i)[k]; if (!e) return null;
  const [zh, py, g] = e; const syl = String(py).split(/\s+/).filter(Boolean);
  const toks = []; let si = 0;
  for (const ch of zh) { if (isHan(ch)) { const raw = syl[si++] || ''; toks.push({ c: ch, py: raw.replace(/[^\p{L}\p{M}]/gu, ''), han: 1 }); } else toks.push({ c: ch, han: 0 }); }
  if (toks.length && toks[0].han && toks[0].py) toks[0].py = toks[0].py.charAt(0).toLowerCase() + toks[0].py.slice(1);
  const tg = new Array(toks.length).fill(false); let tgt = null;
  const zs = toks.map(o => o.c).join('');
  for (const f of wForms(W[i])) { const at = zs.indexOf(f); if (at >= 0) { tgt = [at, at + f.length]; break; } }
  if (tgt) for (let j = tgt[0]; j < tgt[1]; j++) tg[j] = true;
  else wForms(W[i]).forEach(f => [...f].forEach(ch => { const at = zs.indexOf(ch); if (at >= 0) tg[at] = true; }));
  const s = { i, k, zh: zs, py, g, tr: { id: e[3], en: e[4], tl: e[5], vi: e[6] }, toks, tg, tgt };
  return (CX_CACHE[key] = s);
}
const cxLangs = () => { const p = ['id', 'en', 'tl', 'vi'].includes(meanLang()) ? meanLang() : 'en'; return [p, ...['id', 'en', 'tl', 'vi'].filter(l => l !== p)]; };
const cxPrim = s => s.tr[cxLangs()[0]] || s.tr.en;
const cxPyMode = () => (['ruby', 'line', 'off'].includes(S.settings.ctxPy) ? S.settings.ctxPy : 'ruby');
const toneOfPy = p => toneOfSyl(String(p || '').toLowerCase());
function cxLine(s, o = {}) {
  const mode = o.mode || cxPyMode(); const tap = o.tap ? (c => `data-a="char" data-v="${c}"`) : (() => '');
  const lvb = o.nolv || typeof lvBadgeS !== 'function' ? '' : lvBadgeS(s.toks.map(x => x.c).join(''), { cls: 'lvs' });
  if (mode === 'ruby') return `<div class="cx-zh ruby">${s.toks.map((x, j) => x.han ? `<ruby class="${s.tg[j] ? 'tg' : ''}" ${tap(x.c)}>${x.c}<rt class="t${toneOfPy(x.py)}">${esc(x.py)}</rt></ruby>` : `<span class="cx-pn">${esc(x.c)}</span>`).join('')}${lvb}</div>`;
  const zh = `<div class="cx-zh">${s.toks.map((x, j) => `<span class="${s.tg[j] ? 'tg' : ''}" ${x.han ? tap(x.c) : ''}>${esc(x.c)}</span>`).join('')}${lvb}</div>`;
  if (mode === 'off') return zh;
  return zh + `<div class="cx-py">${s.toks.map((x, j) => x.han ? `<span class="t${toneOfPy(x.py)} ${s.tg[j] ? 'tg' : ''}">${esc(x.py)}</span>` : '').filter(Boolean).join(' ')}</div>`;
}
const G_SHORT = { shi: 'A 是 B', hen: '很 + Adj', svo: 'S + V + O', de: '的', mw: '數 + 量 + N', zai: '在 + …', bu: '不 / 沒', ma: '…嗎？', qw: '什麼 · 誰 · 哪', aux: '想 · 要 · 會 + V', le: '了', guo: '過', bi: 'A 比 B', degree: '太…了 · 非常', yinwei: '因為…所以', suiran: '雖然…但是', yibian: '一邊…一邊', ba: '把', bei: '被', congdao: '從…到', yuelai: '越來越', order: 'S + 時 + 地 + V' };
const G_FAM = { shi: 'gs', hen: 'gs', svo: 'gs', de: 'gs', mw: 'gs', zai: 'gs', order: 'gs', bu: 'gq', ma: 'gq', qw: 'gq', aux: 'ga', le: 'ga', guo: 'ga', bi: 'ga', degree: 'ga' };
const SVO_G = {
  name: ['Pola dasar S + V + O', 'Basic pattern S + V + O', 'Batayang pattern S + V + O', 'Mẫu cơ bản S + V + O'],
  gloss: ['Urutan dasar Mandarin mirip bahasa Indonesia: siapa + melakukan + apa. Keterangan waktu dan tempat diletakkan SEBELUM kata kerja.', 'Mandarin’s basic order is like English: who + does + what. Time and place come BEFORE the verb.', 'Ang batayang ayos ng Mandarin: sino + gumagawa + ano. Ang oras at lugar ay inilalagay BAGO ang pandiwa.', 'Trật tự cơ bản giống tiếng Việt: ai + làm + gì. Thời gian và nơi chốn đặt TRƯỚC động từ.'],
  tip: ['Rumus: 我 + 吃 + 飯. Tambah waktu: 我 + 今天 + 吃飯.', 'Formula: 我 + 吃 + 飯. Add time: 我 + 今天 + 吃飯.', 'Pormula: 我 + 吃 + 飯. Dagdag oras: 我 + 今天 + 吃飯.', 'Công thức: 我 + 吃 + 飯. Thêm thời gian: 我 + 今天 + 吃飯.']
};
const L4 = a => a[{ id: 0, en: 1, tl: 2, vi: 3 }[meanLang()] ?? 1] || a[1];
const gOf = k => GRAMMAR.find(x => x.k === k) || null;
const gName = k => { const g = gOf(k); return g ? gramTxt(g.name) : k === 'svo' ? L4(SVO_G.name) : k; };
const gGloss = k => { const g = gOf(k); return g ? gramTxt(g.gloss) : k === 'svo' ? L4(SVO_G.gloss) : ''; };
function gchip(k, inSes) { return `<button class="gchip ${G_FAM[k] || 'gc'}" data-cx="gram" data-v="${esc(k)}" title="${esc(gName(k))}"><b class="hz">${esc(G_SHORT[k] || k)}</b><span>${esc(gName(k))}</span>${ICON('info')}</button>`; }
function cxTrs(s) {
  const L = cxLangs(); const sp = (l, txt) => (TTS.ok ? `<button class="cx-sp" data-cx="sayl" data-l="${l}" data-v="${esc(txt)}" aria-label="${t('dengar')} ${LANG_LABEL[l]}">${ICON('speaker')}</button>` : '');
  return `<div class="cx-tr"><div class="cx-main"><span class="lg">${LANG_LABEL[L[0]]}</span><span class="grow">${esc(s.tr[L[0]] || '')}</span>${sp(L[0], s.tr[L[0]])}</div>
    <div class="cx-oth">${L.slice(1).filter(l => s.tr[l]).map(l => `<div><span class="lg">${LANG_LABEL[l]}</span><span class="grow">${esc(s.tr[l])}</span>${sp(l, s.tr[l])}</div>`).join('')}</div></div>`;
}
function cxSay(zh, inSes) {
  return inSes ? `<button class="speak mini" data-s="saysent" data-v="${esc(zh)}" aria-label="${t('Putar suara')}">${ICON('speaker')}</button><button class="btn ghost small" data-s="saysent" data-slow="1" data-v="${esc(zh)}">${ICON('slow')} ${t('pelan')}</button>`
    : `<button class="speak mini" data-cx="say" data-v="${esc(zh)}" aria-label="${t('Putar suara')}">${ICON('speaker')}</button><button class="btn ghost small" data-cx="say" data-slow="1" data-v="${esc(zh)}">${ICON('slow')} ${t('pelan')}</button>`;
}
function cxCard(s, n, o = {}) {
  if (!s) return '';
  const hide = !o.noHide && !!S.settings.ctxHide;
  return `<article class="cxcard ${hide ? 'hide' : ''} ${o.cls || ''}" style="--d:${n * .07}s">
    <div class="cx-top"><span class="cx-n">${n + 1}</span>${gchip(s.g)}<span class="cx-say">${cxSay(s.zh, o.inSes)}</span></div>
    ${cxLine(s, { tap: !o.inSes, mode: o.mode })}
    <div class="cx-trw">${cxTrs(s)}${hide ? `<button class="cx-reveal" data-cx="reveal">${ICON('lightbulb')} ${t('Tebak artinya dulu, lalu ketuk untuk melihat')}</button>` : ''}</div></article>`;
}
/* contoh kalimat di kartu kata baru */
function ctxIntro(w) {
  if (!CXD) { loadCtx(); return ''; }
  const s = cxSent(w.i, 0); if (!s) return '';
  return `<div class="cx-intro"><div class="cx-il">${ICON('ctx')} <b>${t('Langsung dalam kalimat')}</b>${gchip(s.g)}</div>${cxLine(s, { mode: 'ruby' })}
    <div class="cx-itr"><span>${esc(cxPrim(s))}</span><button class="speak mini" data-s="saysent" data-v="${esc(s.zh)}" aria-label="${t('Putar suara')}">${ICON('speaker')}</button></div></div>`;
}
/* contoh kalimat di modal huruf */
function cxCharEx(c) {
  if (!CXD) return `<div id="cxch" data-c="${c}"></div>`;
  const ids = (CHAR_WORDS[c] || []).filter(i => ctxOf(i)).sort((a, b) => (S.cards[b] ? 1 : 0) - (S.cards[a] ? 1 : 0) || W[a].w.length - W[b].w.length);
  if (!ids.length) return `<div id="cxch" data-c="${c}"></div>`;
  const i = ids[0]; const s = cxSent(i, 0);
  return `<div id="cxch" data-c="${c}"><h3 style="margin-top:16px">${ICON('ctx')} ${t('Huruf ini dalam kalimat')}</h3>${cxCard(s, 0, { noHide: 1 })}
    <div class="row wrap" style="gap:8px"><button class="btn sec small" data-a="cxopen" data-v="${i}">${ICON('ctx')} ${t('Lihat 3 kalimat untuk {w}', { w: W[i].w })}</button></div></div>`;
}
/* bagian "Dalam kalimat" di modal kata */
function cxWordSec(i) {
  return `<section class="cx-msec"><h3>${ICON('ctx')} ${t('Dalam kalimat')}</h3><p class="small muted" style="margin:-4px 0 10px">${t('Tiga kalimat, tiga pola grammar berbeda. Ketuk label pola untuk penjelasannya.')}</p>
    <div class="cx-cards">${[0, 1, 2].map(k => cxCard(cxSent(i, k), k, { noHide: 1 })).join('')}</div>
    <div class="row wrap" style="gap:8px"><button class="btn pri small" data-a="ctxword" data-v="${i}">${ICON('target')} ${t('Latih 3 kalimat ini')}</button><button class="btn sec small" data-a="cxopen" data-v="${i}">${ICON('ctx')} ${t('Buka di menu Kalimat')}</button></div></section>`;
}
const openWordV10 = openWord;
openWord = function (i) {
  openWordV10(i);
  const sh = $('.overlay .sheet'); if (!sh) return; sh.dataset.w = i;
  const put = () => {
    const box = $('.overlay .sheet'); if (!box || box.dataset.w !== String(i) || box.dataset.cx || !ctxOf(i)) return;
    box.dataset.cx = '1'; const h = box.querySelector('h3'); const html = cxWordSec(i);
    if (h) h.insertAdjacentHTML('beforebegin', html); else box.insertAdjacentHTML('beforeend', html);
  };
  if (CXD) put(); else loadCtx(put);
};
/* modal pola grammar (dibuka dari label kalimat) */
function gramModal(k) {
  const g = gOf(k);
  const ex = g ? g.ex.map(e => `<button class="gex" style="width:100%;text-align:left" data-cx="say" data-v="${esc(e[0])}">${ICON('speaker')}<span><span class="zh hz">${esc(e[0])}</span><div class="py">${esc(e[1])}</div><div class="tr">${esc(L3(e, 2))}</div></span></button>`).join('') : '';
  openModal(`<div class="q-kind">${ICON('grammar')} ${t('Pola grammar')}</div>
    <h2 style="margin:6px 0 4px">${esc(gName(k))}</h2><div class="gform hz">${esc(g ? g.form : '主語 + 動詞 + 賓語')}</div>
    <p style="margin:8px 0 0">${esc(gGloss(k))}</p>
    <div class="gtip">${ICON('lightbulb')}<span>${esc(g ? gramTxt(g.tip) : L4(SVO_G.tip))}</span></div>
    ${g ? `<div class="gtip">${ICON('info')}<span>${esc(gramTxt(g.warn))}</span></div>` : ''}
    ${ex ? `<div style="margin-top:10px">${ex}</div>` : ''}
    ${!SES && g ? `<div class="row" style="margin-top:12px"><button class="btn sec small" data-a="gotog" data-v="${esc(k)}">${ICON('grammar')} ${t('Buka di Tata bahasa')}</button></div>` : ''}`);
}

/* ---------- suara bahasa lain + putar berurutan ---------- */
const LANG_BCP = { id: 'id-ID', en: 'en-US', tl: 'fil-PH', vi: 'vi-VN' };
function langVoice(l) {
  try { const re = { id: /^(id|in)([-_]|$)/i, en: /^en([-_]|$)/i, tl: /^(fil|tl)([-_]|$)/i, vi: /^vi([-_]|$)/i }[l]; const c = speechSynthesis.getVoices().filter(v => re && re.test(v.lang)); return c.find(v => /Google|Natural|Neural|Premium|Enhanced|Siri/i.test(v.name)) || c[0] || null; } catch (e) { return null; }
}
function cxUtter(text, lang, voice, rate, onend) {
  if (!TTS.ok || !text) { if (onend) onend(); return; }
  TTS.stop();
  TTS.t = setTimeout(() => {
    try {
      const u = new SpeechSynthesisUtterance(String(text).replace(/[()（）]/g, ''));
      u.lang = voice ? voice.lang : lang; if (voice) u.voice = voice; u.rate = rate; u.pitch = 1;
      let fired = false; const fin = ev => { if (fired) return; fired = true; clearTimeout(TTS.dog); if (TTS.u === u) TTS.u = null; if (onend) onend(ev); };
      u.onend = fin; u.onerror = fin; TTS.u = u;
      if (speechSynthesis.paused) speechSynthesis.resume();
      speechSynthesis.speak(u);
      TTS.dog = setTimeout(() => { try { if (speechSynthesis.speaking) speechSynthesis.cancel(); } catch (e) {} fin({ type: 'end' }); }, Math.max(7000, String(text).length * 260));
    } catch (e) { if (onend) onend(); }
  }, 40);
}
function speakLang(text, l, onend) { const v = langVoice(l); cxUtter(text, LANG_BCP[l] || 'en-US', v, 0.95, onend); }
function speakZh(text, onend, rate) { cxUtter(text, TTS.voice ? TTS.voice.lang : 'zh-TW', TTS.voice, rate || S.settings.rate, onend); }
const CXQ = { run: 0, on: false };
function cxQStop() { if (!CXQ.on) return; CXQ.on = false; CXQ.run++; cxQUI(-1); }
function cxQUI(k) {
  document.querySelectorAll('.cx-cards .cxcard').forEach((el, j) => el.classList.toggle('playing', j === k));
  const b = $('#cxplay'); if (b) { b.classList.toggle('on', CXQ.on); b.innerHTML = CXQ.on ? `${ICON('close')} ${t('Berhenti')}` : `${ICON('play')} ${t('Putar ketiganya')}`; }
}
function cxPlayAll(i) {
  if (CXQ.on) { cxQStop(); TTS.stop(); return; }
  const list = [0, 1, 2].map(k => cxSent(i, k)).filter(Boolean); const p = cxLangs()[0];
  const steps = []; list.forEach((s, k) => { steps.push(['zh', s.zh, k]); steps.push(['zh', s.zh, k, 0.6]); steps.push([p, s.tr[p], k]); });
  const run = ++CXQ.run; CXQ.on = true; let j = 0;
  const next = () => {
    if (run !== CXQ.run || !CXQ.on) return;
    if (j >= steps.length || ROUTE !== 'kalimat' || SES) { CXQ.on = false; cxQUI(-1); return; }
    const [l, txt, k, rate] = steps[j++]; cxQUI(k);
    const done = ev => { if (run !== CXQ.run) return; if (ev && ev.type === 'error' && /interrupt|cancel/i.test(ev.error || '')) { CXQ.on = false; cxQUI(-1); return; } setTimeout(next, l === 'zh' ? 450 : 900); };
    if (l === 'zh') speakZh(txt, done, rate); else speakLang(txt, l, done);
  };
  next();
}

/* ---------- halaman Kalimat ---------- */
const VS11 = { tab: 'today', q: '', sel: null, lim: 60 };
function cxPool(tab) {
  if (!CXD) return [];
  const has = i => !!ctxOf(i) && W[i];
  const q = VS11.q.trim().toLowerCase();
  if (q) {
    const qb = stripTone(q).replace(/\s+/g, '');
    return A2_ORDER.filter(has).filter(i => { const w = W[i]; return w.w.includes(q) || (w.s || '').includes(q) || stripTone(String(w.p || '')).replace(/\s+/g, '').startsWith(qb) || (w.m || []).some(m => String(m).toLowerCase().includes(q)); });
  }
  if (tab === 'mine') return Object.keys(S.cards).map(Number).filter(has).sort((a, b) => (S.cards[b].ls || 0) - (S.cards[a].ls || 0));
  if (tab === 'all') return A2_ORDER.filter(has);
  const tw = todayWords(40).filter(has);
  if (tw.length) return tw;
  return A2_ORDER.filter(i => has(i) && !S.cards[i]).slice(0, 12);
}
function cxWordPanel(i) {
  const w = W[i]; if (!w) return '';
  const list = cxPool(VS11.tab); const at = list.indexOf(i);
  const pm = cxPyMode(); const c = card(i);
  return `<section class="card glass cx-word">
    <div class="cxw-h"><button class="cxw-hz hz ${w.w.length > 3 ? 'sm' : ''}" data-a="word" data-v="${i}" title="${t('Buka kartu kata')}">${hzHTML(w)}</button>${lvBadgeW(i, { size: 'sm', cls: 'cxw-lvb' })}
      <div class="grow" style="min-width:0"><div class="q-py" style="text-align:left">${pinyinHTML(w, 'mark')}</div><b class="cxw-m">${esc(meanP(w))}</b>
        <div class="small muted">${esc(posLabel(w.o))} · ${LEVELS[w.l].en}${c ? ' · <i class="dot m' + mastery(c) + '"></i> ' + t(MASTERY_NAME[mastery(c)]) : ''}</div></div>
      <div class="cxw-act"><button class="speak" data-a="say" data-v="${i}" aria-label="${t('Putar suara')}">${ICON('speaker')}</button>${TTS.ok ? `<button class="btn sec small ${CXQ.on ? 'on' : ''}" id="cxplay" data-cx="playall" data-v="${i}">${CXQ.on ? `${ICON('close')} ${t('Berhenti')}` : `${ICON('play')} ${t('Putar ketiganya')}`}</button>` : ''}</div></div>
    <div class="cx-tools"><div class="seg">${[['ruby', 'Pinyin di atas'], ['line', 'Pinyin di bawah'], ['off', 'Tanpa pinyin']].map(([k, l]) => `<button class="${pm === k ? 'on' : ''}" data-a="cxpy" data-v="${k}">${t(l)}</button>`).join('')}</div>
      <button class="tgl ${S.settings.ctxHide ? 'on' : ''}" data-a="cxhide" aria-pressed="${!!S.settings.ctxHide}">${ICON('lightbulb')} ${t('Mode tebak arti')}</button></div>
    <div class="cx-cards">${[0, 1, 2].map(k => cxCard(cxSent(i, k), k)).join('')}</div>
    <div class="cx-foot"><button class="btn pri" data-a="ctxword" data-v="${i}">${ICON('target')} ${t('Latih 3 kalimat ini')}</button>
      <span class="grow"></span>${at > 0 ? `<button class="btn sec small" data-a="cxsel" data-v="${list[at - 1]}">‹ <span class="hz">${esc(W[list[at - 1]].w)}</span></button>` : ''}${at >= 0 && at < list.length - 1 ? `<button class="btn sec small" data-a="cxsel" data-v="${list[at + 1]}"><span class="hz">${esc(W[list[at + 1]].w)}</span> ›</button>` : ''}</div>
  </section>
  <section class="card glass cx-chars"><h3 style="margin:0 0 10px">${ICON('hanzi')} ${t('Penalaran bentuk tiap huruf')}</h3>${reasonRow(w, false)}</section>`;
}
function vKalimat() {
  const head = `<section class="card glass cx-hero"><div class="row" style="gap:14px;align-items:center">${TILE('ctx', 'lg tint c6')}<div class="grow" style="min-width:0"><h1 style="margin:0">${t('Kalimat nyata')}</h1>
      <p class="muted small" style="margin:4px 0 0">${t('Setiap kata dipakai dalam 3 kalimat sehari-hari dengan pola grammar berbeda — jadi kamu tidak hanya hafal katanya, tapi langsung paham cara memakainya.')}</p></div></div>
    <div class="cx-how">${[['1', 'speaker', 'Baca & dengar', 'Pinyin per huruf, suara normal & pelan, arti dalam 4 bahasa.'], ['2', 'grammar', 'Pahami polanya', 'Ketuk label pola untuk tahu kenapa kalimatnya disusun begitu.'], ['3', 'target', 'Latih langsung', 'Isi kata yang hilang, susun ulang, dan tebak arti dari suara.']].map(([n, ic, a, b]) => `<div class="cx-hs"><span class="cx-hn">${n}</span><div><b>${ICON(ic)} ${t(a)}</b><p>${t(b)}</p></div></div>`).join('')}</div>
    <div class="row wrap" style="gap:8px;margin-top:14px"><button class="btn pri" data-a="ctxday">${ICON('play')} ${t('Latih kalimat hari ini')}</button><button class="btn sec" data-a="ctxmine">${ICON('refresh')} ${t('Acak dari kata-kataku')}</button></div></section>`;
  if (!CXD) {
    if (!CX_ERR) loadCtx(() => { if (ROUTE === 'kalimat' && !SES) render(); });
    return head + `<section class="card glass cx-load">${CX_ERR ? `<p>${t('Kalimat belum bisa dimuat — cek koneksi, lalu coba lagi.')}</p><button class="btn pri" data-a="cxretry">${ICON('refresh')} ${t('Coba lagi')}</button>` : `<div class="cx-skel"><i></i><i></i><i></i></div><p class="small muted">${t('Memuat 3.600+ kalimat…')}</p>`}</section>`;
  }
  const list = cxPool(VS11.tab);
  if (VS11.sel === null || !ctxOf(VS11.sel)) VS11.sel = list[0] !== undefined ? list[0] : A2_ORDER.find(i => ctxOf(i));
  const tabs = [['today', 'Kata hari ini'], ['mine', 'Kata-kataku'], ['all', 'Semua A2']];
  return head + `<section class="cx-wrap">
    <aside class="card glass cx-side">
      <div class="seg cx-tabs">${tabs.map(([k, l]) => `<button class="${VS11.tab === k && !VS11.q ? 'on' : ''}" data-a="cxtab" data-v="${k}">${t(l)}</button>`).join('')}</div>
      <input class="search" id="cxq" data-in="cxq" value="${esc(VS11.q)}" placeholder="${t('cari: makan, chī, 吃…')}" autocomplete="off" autocapitalize="off" spellcheck="false">
      <div class="small muted" style="margin:8px 2px 6px">${t('{n} kata', { n: fmtN(list.length) })}</div>
      <div class="cx-list">${list.slice(0, VS11.lim).map(i => { const w = W[i]; const c = card(i); return `<button class="cx-li ${i === VS11.sel ? 'on' : ''}" data-a="cxsel" data-v="${i}"><span class="hz">${esc(w.w)}${lvBadgeW(i)}</span><span class="cx-lt"><small>${esc(w.p)}</small><span>${esc(meanP(w))}</span></span>${c ? `<i class="dot m${mastery(c)}"></i>` : ''}</button>`; }).join('') || `<div class="empty small">${t('Tidak ketemu. Coba kata lain 🌿')}</div>`}
        ${list.length > VS11.lim ? `<button class="btn sec small" style="margin-top:8px" data-a="cxmore">${t('Tampilkan lebih banyak')} (${list.length - VS11.lim})</button>` : ''}</div>
    </aside>
    <div class="cx-mainc">${VS11.sel !== undefined ? cxWordPanel(VS11.sel) : ''}</div>
  </section>`;
}

/* ---------- soal latihan dari kalimat nyata ---------- */
let CX_DICT = null;
function cxDict() {
  if (CX_DICT) return CX_DICT; CX_DICT = new Set();
  W.forEach(w => wForms(w).forEach(f => { if (f.length >= 2 && f.length <= 4) CX_DICT.add(f); }));
  ['我們', '你們', '他們', '她們', '這個', '那個', '哪個', '什麼', '怎麼', '為什麼', '一下', '一起', '不是', '沒有', '可以', '喜歡', '時候', '今天', '明天', '昨天'].forEach(x => CX_DICT.add(x));
  return CX_DICT;
}
const PUNCT_RE = /[\p{P}\s]/u;
function cxSeg(s, attach) {
  const zh = s.zh; const out = []; let j = 0;
  const syl = (a, b) => s.toks.slice(a, b).filter(x => x.han).map(x => x.py).join('');
  while (j < zh.length) {
    const ch = zh[j];
    if (!isHan(ch)) {
      if (PUNCT_RE.test(ch)) { if (attach && out.length) out[out.length - 1].hz += ch; else out.push({ hz: ch, py: '', p: 1 }); j++; continue; }
      let e = j; while (e < zh.length && !isHan(zh[e]) && !PUNCT_RE.test(zh[e])) e++;
      out.push({ hz: zh.slice(j, e), py: zh.slice(j, e) }); j = e; continue;
    }
    if (s.tgt && j === s.tgt[0]) { out.push({ hz: zh.slice(s.tgt[0], s.tgt[1]), py: syl(s.tgt[0], s.tgt[1]), tg: 1 }); j = s.tgt[1]; continue; }
    let len = 1;
    for (let L = 4; L >= 2; L--) {
      const sub = zh.slice(j, j + L);
      if (sub.length === L && [...sub].every(isHan) && cxDict().has(sub) && !(s.tgt && j < s.tgt[0] && j + L > s.tgt[0])) { len = L; break; }
    }
    out.push({ hz: zh.slice(j, j + len), py: syl(j, j + len) }); j += len;
  }
  return out;
}
const cxTrArr = s => [s.tr.id, s.tr.en, s.tr.tl, s.tr.vi];
const cxObj = (s, chunks) => ({ chunks, zh: chunks.map(c => c.hz).join(''), py: s.py, tr: cxTrArr(s), cx: s });
function cxCloze(i, k) {
  const s = cxSent(i, k); if (!s || !s.tgt) return null;
  const chunks = cxSeg(s, false); const b = chunks.findIndex(c => c.tg); if (b < 0) return null;
  const tgt = chunks[b].hz; const L = [...tgt].length; const m0 = meanP(W[i]);
  const src = shuffle(Object.keys(S.cards).map(Number)).concat(shuffle(A2_ORDER.slice(0, 600)));
  const seen = new Set([tgt]); const opts = [];
  for (const j of src) {
    if (opts.length >= 3) break; const w = W[j]; if (!w || j === i) continue;
    const f = wForms(w).find(x => [...x].length === L); if (!f || seen.has(f) || s.zh.includes(f) || meanP(w) === m0) continue;
    seen.add(f); opts.push([f, w.p || '']);
  }
  if (opts.length < 3) return null;
  return { type: 'cloze', sent: cxObj(s, chunks), blank: b, opts: shuffle([[tgt, chunks[b].py], ...opts]), ctx: 1, cx: s };
}
function cxBuildItem(i, k) {
  const s = cxSent(i, k); if (!s) return null;
  let ch = cxSeg(s, true).map(c => Object.assign({}, c));
  while (ch.length > 8) {
    let best = -1, bl = 99;
    for (let j = 0; j < ch.length - 1; j++) { if (ch[j].tg || ch[j + 1].tg) continue; const l = ch[j].hz.length + ch[j + 1].hz.length; if (l < bl) { bl = l; best = j; } }
    if (best < 0) break;
    ch.splice(best, 2, { hz: ch[best].hz + ch[best + 1].hz, py: ch[best].py + ch[best + 1].py });
  }
  if (ch.length < 3 || ch.length > 8) return null;
  return { type: 'build', sent: cxObj(s, ch), ctx: 1, cx: s };
}
function cxLMean(i, k, pool) {
  const s = cxSent(i, k); if (!s) return null;
  const others = []; const seen = new Set([cxPrim(s)]);
  const src = shuffle((pool || []).filter(j => j !== i)).concat(shuffle(Object.keys(S.cards).map(Number)), shuffle(A2_ORDER.slice(0, 400)));
  for (const j of src) {
    if (others.length >= 3) break; if (j === i || !ctxOf(j)) continue;
    const o = cxSent(j, Math.floor(Math.random() * 3)); if (!o || seen.has(cxPrim(o))) continue;
    seen.add(cxPrim(o)); others.push(cxObj(o, cxSeg(o, true)));
  }
  if (others.length < 3) return null;
  return { type: 'lmean', sent: cxObj(s, cxSeg(s, true)), others, ctx: 1, cx: s };
}
/* satu siklus per kelompok 3 kata: baca & dengar → isi kata → susun / dengar & pahami */
function buildCtx(ids, nWords = 4) {
  const ws = [...new Set(ids)].filter(i => ctxOf(i)).slice(0, nWords); const out = [];
  for (let g = 0; g < ws.length; g += 3) {
    const grp = ws.slice(g, g + 3); const ord = {};
    grp.forEach(i => { ord[i] = shuffle([0, 1, 2]); out.push({ type: 'ctxread', wid: i, k: ord[i][0], ctx: 1 }); });
    shuffle(grp).forEach(i => { const it = cxCloze(i, ord[i][1]) || cxCloze(i, ord[i][0]); if (it) out.push(it); });
    shuffle(grp).forEach(i => { const it = (Math.random() < .55 || !voiceOK() ? cxBuildItem(i, ord[i][2]) : null) || cxLMean(i, ord[i][2], ws) || cxBuildItem(i, ord[i][0]); if (it) out.push(it); });
  }
  return out;
}
function ctxDayIds() {
  let ids = todayWords(16).filter(i => ctxOf(i));
  if (ids.length < 3) ids = ids.concat(Object.keys(S.cards).map(Number).filter(i => ctxOf(i) && !ids.includes(i)).sort((a, b) => (S.cards[b].ls || 0) - (S.cards[a].ls || 0)).slice(0, 8));
  if (ids.length < 3) ids = ids.concat(A2_ORDER.filter(i => ctxOf(i) && !ids.includes(i)).slice(0, 4));
  return shuffle(ids);
}
function startCtx(getIds, n, title) {
  const go2 = () => { const b = () => buildCtx(getIds(), n); startSession(b(), { title, rebuild: b, cat: 'paham' }); };
  if (CXD) return go2();
  toast(t('Memuat kalimat…'), 1400, 'cxload'); loadCtx(() => { if (!SES) go2(); });
}
function renderCtxRead(it) {
  progressBar(); SES.answered = true; SES.shown = Date.now(); SES.m = null;
  const w = W[it.wid]; const s = cxSent(it.wid, it.k); if (!s) throw new Error('no ctx');
  $('#sbody').innerHTML = `<div class="s-card glass cx-s"><div class="q-kind">${ICON('ctx')} ${t('Kalimat nyata')} · ${t('baca & dengar')}</div>
    <div class="cx-wordtag"><span class="hz">${esc(w.w)}</span><span class="t${aligned(w) ? w.t[0] : 5}">${esc(w.p)}</span><b>${esc(meanP(w))}</b></div>
    ${cxCard(s, it.k, { inSes: 1, noHide: 1, mode: 'ruby', cls: 'big' })}
    <div class="gtip">${ICON('lightbulb')}<span><b>${esc(gName(s.g))}</b> — ${esc(gGloss(s.g))}</span></div></div>`;
  $('#sfoot').innerHTML = `<div class="inner"><button class="btn pri big wide" data-s="next">${t('Paham, lanjut')}</button></div>`;
  $('#sbody').scrollTop = 0;
  if (voiceOK()) speakFor(it, s.zh, 300);
  FX.play('flip');
}
const _renderItemV10 = _renderItem;
_renderItem = function () { const it = cur(); if (it && it.type === 'ctxread') return renderCtxRead(it); return _renderItemV10(); };
/* umpan balik soal kalimat: kalimat lengkap + pinyin per huruf + arti + pola */
const answerV10 = answer;
answer = function (ok, note) {
  const it = SES && !SES.answered ? cur() : null;
  answerV10(ok, note);
  if (!it || !it.ctx || !it.cx) return;
  if (it.type === 'lmean') { const d = dayRec(); d.sent = (d.sent || 0) + 1; }
  const box = $('#sfoot .fb [style*="flex:1"]'); if (!box) return;
  const s = it.cx; const inn = box.closest('.inner'); if (inn) inn.classList.add('cxin');
  box.innerHTML = `<b>${ok ? t(pick(['Benar!', 'Tepat!', 'Pintar!'])) : t('Kalimat yang benar:')}</b><div class="cx-fbzh">${cxLine(s, { mode: 'ruby' })}</div><small class="cx-fbtr">${esc(cxPrim(s))}</small><div class="cx-fbg">${gchip(s.g)}</div>`;
  save();
};
