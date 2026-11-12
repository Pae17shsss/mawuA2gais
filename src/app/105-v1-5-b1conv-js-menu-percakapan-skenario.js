/* ========== V1.5 b1conv.js — menu Percakapan: skenario Sehari-hari · Kampus Elektro · Pabrik Semikonduktor ==========
   Halaman skenario: tujuan, gelembung chat (pinyin/terjemahan ikut premode 'conv'), putar semua (nada beda per tokoh),
   Shadowing (dengar → rekam → bandingkan), Role-play (pilih A/B), frasa kunci, pola grammar, tugas bicara, kuis, progres S.conv[id]. */
const b1Conv = id => (typeof CONV !== 'undefined' ? CONV.find(d => d.id === id) : null) || null;
const CV = { id: null, mode: 'read', role: 'A', rev: {}, dom: '', play: 0, k: -1, wait: -1 };
const cvS = () => S.conv || (S.conv = {});
const cvRec = id => cvS()[id] || (cvS()[id] = {});
const cvDone = id => !!(S.conv && S.conv[id] && S.conv[id].done);
const CV_DOMS = ['daily', 'campus', 'fab'];
function cvMode() { try { const m = xmGet('conv'); return { py: m.py !== 'hide', tr: m.tr !== 'hide' }; } catch (e) { return { py: true, tr: true }; } }
function cvSetMode(k, on) { try { const x = xmStore(); x.k.conv = Object.assign({}, x.k.conv, { [k]: on ? 'show' : 'hide' }); save(); } catch (e) {} }
const cvSpk = d => [...new Set(d.lines.map(x => x.sp))];
function cvSteps(id) { const r = (S.conv || {})[id] || {}; return [['read', 'book', 'Dibaca', !!r.v], ['sh', 'mic', 'Shadowing', (r.sh || 0) > 0], ['rp', 'chat', 'Role-play', (r.rp || 0) > 0], ['task', 'flag', 'Tugas bicara', !!r.task], ['q', 'target', 'Kuis', (r.q || 0) >= 70]]; }
function cvCard(d) {
  const r = (S.conv || {})[d.id] || {}; const st = cvSteps(d.id); const n = st.filter(x => x[3]).length; const D0 = B1_DOM[d.dom] || B1_DOM.daily;
  return `<button class="cv-card ${r.done ? 'done' : ''}" data-a="cvopen" data-v="${d.id}" style="--tc:var(--${D0.c})">
    <span class="cv-ct"><span class="hz cv-czh">${esc(d.title.zh)}</span>${lvBadge(d.lv)}</span>
    <b class="cv-cti">${esc(b1TrId(d.title))}</b>
    <span class="cv-cm"><span>${ICON('chat')} ${d.lines.length}</span>${r.q !== undefined ? `<span>${ICON('target')} ${r.q}%</span>` : ''}<span class="cv-dots">${st.map(x => `<i class="${x[3] ? 'on' : ''}" title="${esc(t(x[2]))}"></i>`).join('')}</span></span>
    ${r.done ? `<span class="cv-ck">${ICON('check')}</span>` : ''}</button>`;
}
function vConvList() {
  const all = CONV; const dn = all.filter(d => cvDone(d.id)).length;
  const groups = CV_DOMS.filter(x => !CV.dom || CV.dom === x).map(dom => {
    const D0 = B1_DOM[dom]; const list = all.filter(d => d.dom === dom).sort((a, b) => a.lv - b.lv); if (!list.length) return '';
    return `<section class="card glass cv-grp"><div class="b1-th">${TILE(D0.ic, 'tint ' + D0.c)}<div class="grow" style="min-width:0"><h2>${t(D0.name)}</h2><span class="small muted">${t(D0.long)}</span></div><span class="chip">${ICON('check')} ${list.filter(d => cvDone(d.id)).length}/${list.length}</span></div>
      <div class="cv-grid">${list.map(cvCard).join('')}</div></section>`;
  }).join('');
  return `<section class="card glass cv-hero"><div class="row" style="gap:14px;align-items:flex-start">${TILE('chat', 'lg tint c5')}<div class="grow" style="min-width:0"><h1 style="margin:0">${t('Percakapan')}</h1>
      <p class="muted small" style="margin:6px 0 0">${t('{n} situasi nyata di Taiwan: urusan sehari-hari, kampus elektro, dan lantai pabrik. Dengar, tirukan (shadowing), lalu mainkan peranmu sendiri.', { n: all.length })}</p></div></div>
    <div class="row wrap" style="gap:8px;margin-top:12px;align-items:center"><div class="seg b1-seg">${[['', 'Semua']].concat(CV_DOMS.map(x => [x, B1_TAGNAME[x]])).map(([v, l]) => `<button class="${CV.dom === v ? 'on' : ''}" data-a="cvdom" data-v="${v}">${t(l)}</button>`).join('')}</div><span class="chip">${ICON('check')} ${dn}/${all.length} ${t('selesai')}</span></div>
    <div class="cv-how">${[['headphone', 'Dengar', 'Putar semua — tiap tokoh nadanya beda'], ['mic', 'Shadowing', 'Dengar → rekam → bandingkan'], ['chat', 'Role-play', 'Pilih peran A/B, ucapkan bagianmu'], ['target', 'Kuis', '≥ 70% = skenario selesai']].map(([ic, a, b], i) => `<div class="cv-hs"><span class="cv-hn">${i + 1}</span><div><b>${ICON(ic)} ${t(a)}</b><p>${t(b)}</p></div></div>`).join('')}</div></section>
  ${groups}`;
}
function cvBubble(d, x, k, m) {
  const sps = cvSpk(d); const side = sps.indexOf(x.sp) % 2 ? 'r' : 'l';
  const mine = CV.mode === 'role' && x.sp === CV.role; const hid = mine && !CV.rev[k];
  const rk = 'cv:' + d.id + ':' + k;
  const tools = CV.mode === 'shadow' ? `<div class="cv-tools"><button class="btn ghost small" data-a="cvsay" data-v="${k}">${ICON('speaker')} ${t('Dengar')}</button><button class="btn ghost small" data-a="cvsay" data-v="${k}" data-slow="1">${ICON('slow')}</button>
      ${mtRecOK() ? `${b1RecBtn(rk)}${MTR.url[rk] ? `<button class="btn ghost small" data-a="cvcmp" data-v="${k}">${ICON('swap')} ${t('Bandingkan')}</button>` : ''}` : ''}</div>` : '';
  return `<div class="cv-b ${side} sp${sps.indexOf(x.sp) % 4} ${mine ? 'mine' : ''} ${CV.k === k ? 'playing' : ''} ${CV.wait === k ? 'wait' : ''}" data-k="${k}">
    <span class="cv-av" aria-hidden="true">${esc(x.sp)}</span>
    <div class="cv-bb">${hid ? `<button class="cv-hidden" data-a="cvrev" data-v="${k}">${ICON('mic')} <span>${CV.wait === k ? t('Giliranmu! Ucapkan, lalu ketuk untuk cek') : t('Bagianmu — ucapkan dulu, lalu ketuk')}</span></button>${x.id ? `<div class="cv-hint small muted">${esc(b1TrId(x))}</div>` : ''}`
      : `<button class="cv-line" data-a="cvsay" data-v="${k}">${b1Line(x.zh, x.py, { py: m.py })}</button>${m.tr ? `<div class="cv-tr">${esc(b1TrId(x))}</div>` : ''}`}${tools}</div></div>`;
}
function b1RecBtn(k) { const on = MTR.k === k && MTR.mr; return `<button class="btn ${on ? 'pri' : 'sec'} small ${on ? 'rec' : ''}" data-a="cvrec" data-v="${esc(k)}">${ICON(on ? 'close' : 'mic')} ${on ? t('Stop') : t('Rekam')}</button>${MTR.url[k] ? `<button class="btn ghost small" data-a="cvmine" data-v="${esc(k)}">${ICON('play')} ${t('Suaraku')}</button>` : ''}`; }
function vConvPage(d) {
  const r = cvRec(d.id); if (!r.v) { r.v = todayKey(); save(); }
  const m = cvMode(); const D0 = B1_DOM[d.dom] || B1_DOM.daily; const sps = cvSpk(d);
  const st = cvSteps(d.id);
  const stg = typeof b1Stages === 'function' ? b1Stages().find(s => s.conv === d.id) : null;
  const tk = 'cv:' + d.id + ':task';
  return `<section class="card glass cv-page" style="--tc:var(--${D0.c})">
      <div class="row" style="gap:8px;align-items:center;flex-wrap:wrap"><button class="btn ghost small" data-a="cvback">‹ ${t('Percakapan')}</button><span class="grow"></span>${b1TagChip(d.dom)}${lvBadge(d.lv, 'sm')}</div>
      <div class="cv-title"><h1 class="hz">${esc(d.title.zh)}</h1><span class="muted">${esc(b1TrId(d.title))}</span></div>
      ${d.goal && (d.goal.id || d.goal.en) ? `<div class="gtip cv-goal">${ICON('flag')}<span><b>${t('Tujuan')}:</b> ${esc(b1TrId(d.goal))}</span></div>` : ''}
      <div class="cv-steps">${st.map(x => `<span class="cv-st ${x[3] ? 'on' : ''}">${ICON(x[3] ? 'check' : x[1])} ${t(x[2])}</span>`).join('')}</div>
      ${stg ? `<button class="chip cv-stg" data-a="b1open" data-v="${stg.id}">${ICON('path')} ${t('Bagian dari Jalur')} · ${t('Tahap')} ${esc(stg.code)}</button>` : ''}</section>
    <section class="card glass cv-dlg">
      <div class="cv-bar"><div class="seg b1-seg">${[['read', 'book', 'Baca'], ['shadow', 'mic', 'Shadowing'], ['role', 'chat', 'Role-play']].map(([k, ic, l]) => `<button class="${CV.mode === k ? 'on' : ''}" data-a="cvmode" data-v="${k}">${ICON(ic)} ${t(l)}</button>`).join('')}</div>
        <span class="grow"></span><button class="chip ${m.py ? 'on' : ''}" data-a="cvpy" aria-pressed="${m.py}">${t('Pinyin')}</button><button class="chip ${m.tr ? 'on' : ''}" data-a="cvtr" aria-pressed="${m.tr}">${t('Arti')}</button></div>
      ${CV.mode === 'role' ? `<div class="cv-rolebar"><span class="small muted">${t('Peranmu')}:</span><div class="seg b1-seg">${sps.map(s => `<button class="${CV.role === s ? 'on' : ''}" data-a="cvrole" data-v="${esc(s)}">${esc(s)}</button>`).join('')}</div>
        <button class="btn pri small" data-a="cvroleplay">${ICON(CV.play ? 'close' : 'play')} ${CV.play ? t('Berhenti') : t('Mulai role-play')}</button><button class="btn ghost small" data-a="cvrevall">${ICON('eye')} ${t('Buka semua')}</button></div>
        <p class="small muted cv-note">${t('Lawan bicara diputar otomatis. Saat giliranmu, ucapkan kalimatnya dengan keras, lalu ketuk untuk mencocokkan.')}</p>` : ''}
      ${CV.mode === 'shadow' ? `<p class="small muted cv-note">${mtRecOK() ? t('Per baris: Dengar → Rekam (maks. 12 detik) → Bandingkan suaramu dengan contoh.') : t('Perekam tidak tersedia di browser ini — dengarkan, lalu tirukan keras-keras.')}</p>` : ''}
      <div class="cv-lines">${d.lines.map((x, k) => cvBubble(d, x, k, m)).join('')}</div>
      ${CV.mode !== 'role' ? `<div class="row wrap" style="gap:8px;margin-top:12px"><button class="btn pri" data-a="cvplay">${ICON(CV.play ? 'close' : 'play')} ${CV.play ? t('Berhenti') : t('Putar semua')}</button><button class="btn sec" data-a="cvplay" data-slow="1">${ICON('slow')} ${t('Pelan')}</button></div>` : ''}</section>
    <section class="card glass cv-ph"><h2>${ICON('quote')} ${t('Frasa kunci')}</h2><div class="cv-phl">${(d.phrases || []).map(p => `<button class="cv-p" data-a="gsay" data-v="${esc(p.zh)}"><span class="hz">${esc(p.zh)}</span><small class="py">${esc(p.py)}</small><span>${esc(b1TrId(p))}</span></button>`).join('')}</div>
      ${(d.grammar || []).filter(gOf).length ? `<h3 class="cv-sub">${ICON('grammar')} ${t('Pola yang dipakai')}</h3><div class="row wrap" style="gap:8px">${d.grammar.filter(gOf).map(k => `<button class="chip cv-g" data-a="gotog" data-v="${esc(k)}"><b class="hz">${esc(G_SHORT[k] || gOf(k).form)}</b> ${esc(gName(k))}</button>`).join('')}</div>` : ''}</section>
    <section class="card glass cv-task"><div class="row" style="gap:12px;align-items:flex-start">${TILE('flag', 'tint c3')}<div class="grow" style="min-width:0"><b>${t('Tugas bicara')}</b><p style="margin:4px 0 0">${esc(b1TrId(d.task) || t('Ceritakan ulang percakapan ini dengan kata-katamu sendiri.'))}</p></div></div>
      <div class="row wrap" style="gap:8px;margin-top:12px">${mtRecOK() ? b1RecBtn(tk) : ''}<button class="btn ${r.task ? 'sec' : 'pri'} small" data-a="cvtask" data-v="${d.id}">${ICON('check')} ${r.task ? t('Sudah dilakukan') : t('Sudah kulakukan')}</button></div></section>
    <section class="card glass cv-quiz"><div class="row" style="gap:12px;align-items:center">${TILE('target', 'tint c2')}<div class="grow" style="min-width:0"><b>${t('Kuis pemahaman')}</b><div class="small muted">${t('Arti kalimat, dengar, respons yang tepat, susun kalimat. ≥ 70% = selesai.')}${r.q !== undefined ? ` · ${t('Skor terbaik')}: <b>${r.q}%</b>` : ''}</div></div>${r.done ? `<span class="chip b1-ok">${ICON('check')} ${t('Selesai')}</span>` : ''}</div>
      <div class="row wrap" style="gap:8px;margin-top:12px"><button class="btn pri" data-a="cvquiz" data-v="${d.id}">${ICON('play')} ${t('Mulai kuis')}</button></div></section>`;
}
XVIEWS.conv = function () { const d = CV.id && b1Conv(CV.id); if (d) return vConvPage(d); CV.id = null; return vConvList(); };

/* ---------- kuis ---------- */
function cvQuizItems(d) {
  const L = d.lines.filter(x => x.id || x.en); const items = [];
  const trOf = x => b1TrId(x);
  const pickOther = (x, n, f) => shuffle(L.filter(y => y !== x && f(y) && f(y) !== f(x))).slice(0, n);
  shuffle(L.slice()).slice(0, 2).forEach(x => { const o = shuffle([x, ...pickOther(x, 2, trOf)]); items.push(b1Mcq({ label: 'Apa arti kalimat ini?', ic: 'book', q: esc(x.zh), qhz: 1, qpy: x.py, opts: o.map(y => ({ t: trOf(y) })), a: o.indexOf(x), say: x.zh })); });
  const lx = pick(L); if (lx) { const o = shuffle([lx, ...pickOther(lx, 2, trOf)]); items.push(b1Mcq({ label: 'Dengar, lalu pilih artinya', ic: 'headphone', q: `<button class="speak huge" data-s="saysent" data-v="${esc(lx.zh)}" aria-label="${t('Putar suara')}">${ICON('speaker')}</button>`, b1say: lx.zh, opts: o.map(y => ({ t: trOf(y) })), a: o.indexOf(lx), say: lx.zh, fb: `<div class="hz">${esc(lx.zh)}</div>` })); }
  const pairs = d.lines.map((x, k) => [x, d.lines[k + 1]]).filter(([a, b]) => b && a.sp !== b.sp);
  const pr = pick(pairs); if (pr) { const [a, b] = pr; const o = shuffle([b, ...shuffle(d.lines.filter(y => y !== b && y !== a && y.zh !== b.zh)).slice(0, 2)]);
    items.push(b1Mcq({ label: 'Pilih jawaban yang paling pas', ic: 'chat', q: `<span class="cv-qsp">${esc(a.sp)}：</span>${esc(a.zh)}`, qhz: 1, sub: esc(trOf(a)), opts: o.map(y => ({ t: y.zh, hz: 1 })), a: o.indexOf(b), say: b.zh })); }
  const ph = (d.phrases || []).filter(p => p.id); if (ph.length >= 3) { const p0 = pick(ph); const o = shuffle([p0, ...shuffle(ph.filter(p => p !== p0)).slice(0, 2)]); items.push(b1Mcq({ label: 'Apa arti frasa ini?', ic: 'quote', q: esc(p0.zh), qhz: 1, qpy: p0.py, opts: o.map(p => ({ t: b1TrId(p) })), a: o.indexOf(p0), say: p0.zh })); }
  let nb = 0; for (const x of shuffle(L.slice()).sort((a, b) => a.zh.length - b.zh.length)) { if (nb >= 2) break; const it = b1BuildItem(x.zh, x.py, { id: x.id, en: x.en }); if (it) { items.push(it); nb++; } }
  return items;
}
function cvStartQuiz(id) {
  const d = b1Conv(id); if (!d) return; cvStop();
  const mk = () => cvQuizItems(d);
  startSession(mk(), { title: d.title.zh, retry: false, noCover: true, rebuild: mk, xbDone: acc => { const r = cvRec(id); r.q = Math.max(r.q || 0, acc); const was = r.done; if (acc >= 70 && !r.done) { r.done = todayKey(); addXP(20); } save();
    return `<div class="notice b1-sumn">${acc >= 70 ? `${ICON('check')} ${was ? t('Skenario sudah selesai — skor {n}%.', { n: acc }) : t('Skenario selesai! +20 XP')}` : `${ICON('lightbulb')} ${t('Skor {n}% — butuh 70%. Putar dialognya sekali lagi, lalu ulangi kuis.', { n: acc })}`}</div>`; } });
}

/* ---------- putar / role-play ---------- */
function cvStop() { CV.play = 0; CV.k = -1; CV.wait = -1; TTS.stop(); cvMark(); }
function cvMark() { document.querySelectorAll('.cv-lines .cv-b').forEach(el => { const k = +el.dataset.k; el.classList.toggle('playing', k === CV.k); el.classList.toggle('wait', k === CV.wait); }); }
function cvFocus(k) { const el = document.querySelector(`.cv-lines .cv-b[data-k="${k}"]`); if (el && el.scrollIntoView) { const r = el.getBoundingClientRect(); if (r.top < 70 || r.bottom > innerHeight - 90) el.scrollIntoView({ block: 'center', behavior: reduceMotion() ? 'auto' : 'smooth' }); } }
function cvRun(d, from, o = {}) {
  const run = ++CV.play; const sps = cvSpk(d); let k = from || 0;
  const next = () => {
    if (run !== CV.play || ROUTE !== 'conv' || CV.id !== d.id || SES) return;
    if (k >= d.lines.length) { CV.play = 0; CV.k = -1; CV.wait = -1; if (o.role) { const r = cvRec(d.id); r.rp = (r.rp || 0) + 1; save(); toast(t('Role-play selesai — mantap!')); } render(); return; }
    const x = d.lines[k]; const kk = k++;
    if (o.role && x.sp === CV.role && !CV.rev[kk]) { CV.k = -1; CV.wait = kk; CV.resume = () => { CV.wait = -1; cvRun(d, kk, o); }; render(); cvFocus(kk); return; }
    CV.k = kk; CV.wait = -1; cvMark(); cvFocus(kk);
    b1Speak(x.zh, { pitch: B1_PITCH[x.sp] || [1, 0.82, 1.18, 0.92][sps.indexOf(x.sp) % 4], rate: o.slow ? 0.6 : undefined, onend: () => setTimeout(next, o.slow ? 700 : 450) });
  };
  CV.play = run; render(); next();
}
Object.assign(ACT, {
  conv: () => go('conv'),
  cvopen: b => { cvStop(); CV.id = b.dataset.v; CV.rev = {}; CV.mode = 'read'; closeModal(); const d = b1Conv(CV.id); if (d) CV.role = cvSpk(d)[0]; if (ROUTE !== 'conv') go('conv'); else render(); window.scrollTo(0, 0); },
  cvback: () => { cvStop(); CV.id = null; render(); window.scrollTo(0, 0); },
  cvdom: b => { CV.dom = b.dataset.v; render(); },
  cvmode: b => { cvStop(); CV.mode = b.dataset.v; CV.rev = {}; render(); },
  cvrole: b => { cvStop(); CV.role = b.dataset.v; CV.rev = {}; render(); },
  cvpy: () => { const m = cvMode(); cvSetMode('py', !m.py); render(); },
  cvtr: () => { const m = cvMode(); cvSetMode('tr', !m.tr); render(); },
  cvsay: b => { const d = b1Conv(CV.id); if (!d) return; const k = +b.dataset.v; const x = d.lines[k]; if (!x) return; FX.ensure(); CV.play = 0; CV.k = k; cvMark();
    b1Speak(x.zh, { pitch: B1_PITCH[x.sp] || 1, rate: b.dataset.slow ? 0.6 : undefined, onend: () => { if (CV.k === k && !CV.play) { CV.k = -1; cvMark(); } } }); },
  cvplay: b => { const d = b1Conv(CV.id); if (!d) return; if (CV.play) { cvStop(); render(); return; } FX.ensure(); cvRun(d, 0, { slow: !!b.dataset.slow }); },
  cvroleplay: () => { const d = b1Conv(CV.id); if (!d) return; if (CV.play) { cvStop(); render(); return; } FX.ensure(); CV.rev = {}; cvRun(d, 0, { role: 1 }); },
  cvrev: b => { const d = b1Conv(CV.id); const k = +b.dataset.v; CV.rev[k] = 1; const x = d && d.lines[k];
    const res = CV.wait === k && CV.resume; CV.wait = -1; render();
    if (x) b1Speak(x.zh, { pitch: B1_PITCH[x.sp] || 1, onend: () => { if (res) setTimeout(res, 350); } }); else if (res) res(); },
  cvrevall: () => { const d = b1Conv(CV.id); if (!d) return; cvStop(); d.lines.forEach((x, k) => { CV.rev[k] = 1; }); render(); },
  cvrec: b => { const k = b.dataset.v; mtRec(k, () => { render(); if (!MTR.mr && MTR.url[k] && CV.id && /^cv:.+:\d+$/.test(k)) { const r = cvRec(CV.id); r.sh = (r.sh || 0) + 1; save(); } }); },
  cvmine: b => mtPlayRec(b.dataset.v),
  cvcmp: b => { const d = b1Conv(CV.id); const k = +b.dataset.v; const x = d && d.lines[k]; if (!x) return; const rk = 'cv:' + d.id + ':' + k; b1Speak(x.zh, { pitch: B1_PITCH[x.sp] || 1, onend: () => setTimeout(() => mtPlayRec(rk), 300) }); },
  cvtask: b => { const r = cvRec(b.dataset.v); r.task = r.task ? 0 : todayKey(); if (r.task) addXP(5); save(); render(); },
  cvquiz: b => cvStartQuiz(b.dataset.v)
});
START_ACTS.add('cvquiz'); XM_ACT.cvquiz = 'conv';
const cvAfterBase = afterRender;
afterRender = function () { cvAfterBase(); if (ROUTE !== 'conv' && CV.play) { CV.play = 0; CV.k = -1; CV.wait = -1; } };

Object.assign(I18N, {
  'Percakapan': ['Conversations', 'Usapan'], 'selesai': ['done', 'tapos'], 'Selesai': ['Done', 'Tapos'],
  '{n} situasi nyata di Taiwan: urusan sehari-hari, kampus elektro, dan lantai pabrik. Dengar, tirukan (shadowing), lalu mainkan peranmu sendiri.': ['{n} real situations in Taiwan: daily errands, the EE campus and the fab floor. Listen, shadow, then play your own role.', '{n} totoong sitwasyon sa Taiwan: araw-araw, kampus, at pabrika. Makinig, gayahin, saka gampanan ang iyong papel.'],
  'Dengar': ['Listen', 'Makinig'], 'Putar semua — tiap tokoh nadanya beda': ['Play all — each speaker has a different pitch', 'I-play lahat — iba ang tono ng bawat tauhan'], 'Dengar → rekam → bandingkan': ['Listen → record → compare', 'Makinig → i-record → ihambing'],
  'Pilih peran A/B, ucapkan bagianmu': ['Pick role A/B, say your lines', 'Pumili ng A/B, sabihin ang linya mo'], '≥ 70% = skenario selesai': ['≥ 70% = scenario done', '≥ 70% = tapos ang eksena'],
  'Giliranmu! Ucapkan, lalu ketuk untuk cek': ['Your turn! Say it, then tap to check', 'Ikaw na! Sabihin, saka pindutin'], 'Bagianmu — ucapkan dulu, lalu ketuk': ['Your line — say it first, then tap', 'Linya mo — sabihin muna, saka pindutin'],
  'Bandingkan': ['Compare', 'Ihambing'], 'Suaraku': ['My voice', 'Boses ko'], 'Rekam': ['Record', 'I-record'], 'Stop': ['Stop', 'Stop'], 'Tujuan': ['Goal', 'Layunin'], 'Dibaca': ['Read', 'Nabasa'],
  'Tugas bicara': ['Speaking task', 'Gawain sa pagsasalita'], 'Kuis': ['Quiz', 'Pagsusulit'], 'Bagian dari Jalur': ['Part of the path', 'Bahagi ng landas'], 'Baca': ['Read', 'Basahin'],
  'Peranmu': ['Your role', 'Papel mo'], 'Berhenti': ['Stop', 'Ihinto'], 'Mulai role-play': ['Start role-play', 'Simulan ang role-play'], 'Buka semua': ['Reveal all', 'Ipakita lahat'],
  'Lawan bicara diputar otomatis. Saat giliranmu, ucapkan kalimatnya dengan keras, lalu ketuk untuk mencocokkan.': ['Your partner plays automatically. On your turn, say the line out loud, then tap to check.', 'Kusang tumutugtog ang kausap. Sa turn mo, sabihin nang malakas saka pindutin.'],
  'Per baris: Dengar → Rekam (maks. 12 detik) → Bandingkan suaramu dengan contoh.': ['Per line: Listen → Record (max 12 s) → Compare with the model.', 'Bawat linya: Makinig → I-record → Ihambing.'],
  'Perekam tidak tersedia di browser ini — dengarkan, lalu tirukan keras-keras.': ['Recording is not available in this browser — listen, then repeat out loud.', 'Walang recorder dito — makinig at gayahin nang malakas.'],
  'Pelan': ['Slow', 'Mabagal'], 'Frasa kunci': ['Key phrases', 'Mahahalagang parirala'], 'Pola yang dipakai': ['Patterns used', 'Mga pattern na ginamit'],
  'Ceritakan ulang percakapan ini dengan kata-katamu sendiri.': ['Retell this conversation in your own words.', 'Ikuwento muli ang usapan sa sarili mong salita.'], 'Sudah dilakukan': ['Done', 'Nagawa na'], 'Sudah kulakukan': ['I did it', 'Nagawa ko'],
  'Kuis pemahaman': ['Comprehension quiz', 'Pagsusulit sa pag-unawa'], 'Arti kalimat, dengar, respons yang tepat, susun kalimat. ≥ 70% = selesai.': ['Meaning, listening, best reply, sentence building. ≥ 70% = done.', 'Kahulugan, pakikinig, tamang tugon, pagbuo. ≥ 70% = tapos.'],
  'Mulai kuis': ['Start quiz', 'Simulan ang pagsusulit'], 'Dengar, lalu pilih artinya': ['Listen, then choose the meaning', 'Makinig, saka piliin ang kahulugan'], 'Pilih jawaban yang paling pas': ['Choose the best reply', 'Piliin ang pinakaangkop na sagot'],
  'Apa arti frasa ini?': ['What does this phrase mean?', 'Ano ang ibig sabihin ng pariralang ito?'], 'Skenario sudah selesai — skor {n}%.': ['Scenario already done — score {n}%.', 'Tapos na — iskor {n}%.'], 'Skenario selesai! +20 XP': ['Scenario complete! +20 XP', 'Tapos ang eksena! +20 XP'],
  'Skor {n}% — butuh 70%. Putar dialognya sekali lagi, lalu ulangi kuis.': ['Score {n}% — 70% needed. Replay the dialog, then retake the quiz.', 'Iskor {n}% — kailangan 70%. Ulitin ang dialog at pagsusulit.'], 'Role-play selesai — mantap!': ['Role-play done — great!', 'Tapos ang role-play — galing!']
});
Object.assign(I18N_VI, {
  'Percakapan': 'Hội thoại', 'selesai': 'xong', 'Selesai': 'Xong', '{n} situasi nyata di Taiwan: urusan sehari-hari, kampus elektro, dan lantai pabrik. Dengar, tirukan (shadowing), lalu mainkan peranmu sendiri.': '{n} tình huống thật ở Đài Loan: đời thường, khoa điện và nhà máy. Nghe, nhại theo, rồi tự đóng vai.',
  'Dengar': 'Nghe', 'Putar semua — tiap tokoh nadanya beda': 'Phát tất cả — mỗi nhân vật một cao độ', 'Dengar → rekam → bandingkan': 'Nghe → ghi âm → so sánh', 'Pilih peran A/B, ucapkan bagianmu': 'Chọn vai A/B, nói lời của bạn',
  '≥ 70% = skenario selesai': '≥ 70% = hoàn thành', 'Giliranmu! Ucapkan, lalu ketuk untuk cek': 'Đến lượt bạn! Nói rồi chạm để kiểm tra', 'Bagianmu — ucapkan dulu, lalu ketuk': 'Lời của bạn — nói trước rồi chạm',
  'Bandingkan': 'So sánh', 'Suaraku': 'Giọng tôi', 'Rekam': 'Ghi âm', 'Stop': 'Dừng', 'Tujuan': 'Mục tiêu', 'Dibaca': 'Đã đọc', 'Tugas bicara': 'Bài nói', 'Kuis': 'Đố', 'Bagian dari Jalur': 'Thuộc lộ trình', 'Baca': 'Đọc',
  'Peranmu': 'Vai của bạn', 'Berhenti': 'Dừng', 'Mulai role-play': 'Bắt đầu đóng vai', 'Buka semua': 'Hiện tất cả',
  'Lawan bicara diputar otomatis. Saat giliranmu, ucapkan kalimatnya dengan keras, lalu ketuk untuk mencocokkan.': 'Người kia tự phát. Đến lượt bạn, nói to câu đó rồi chạm để đối chiếu.',
  'Per baris: Dengar → Rekam (maks. 12 detik) → Bandingkan suaramu dengan contoh.': 'Mỗi câu: Nghe → Ghi âm (tối đa 12 giây) → So sánh với mẫu.', 'Perekam tidak tersedia di browser ini — dengarkan, lalu tirukan keras-keras.': 'Trình duyệt không hỗ trợ ghi âm — hãy nghe rồi nói to theo.',
  'Pelan': 'Chậm', 'Frasa kunci': 'Cụm từ chính', 'Pola yang dipakai': 'Mẫu câu dùng', 'Ceritakan ulang percakapan ini dengan kata-katamu sendiri.': 'Kể lại cuộc hội thoại bằng lời của bạn.', 'Sudah dilakukan': 'Đã làm', 'Sudah kulakukan': 'Tôi đã làm',
  'Kuis pemahaman': 'Đố hiểu bài', 'Arti kalimat, dengar, respons yang tepat, susun kalimat. ≥ 70% = selesai.': 'Nghĩa câu, nghe, đáp đúng, xếp câu. ≥ 70% = xong.', 'Mulai kuis': 'Bắt đầu đố', 'Dengar, lalu pilih artinya': 'Nghe rồi chọn nghĩa',
  'Pilih jawaban yang paling pas': 'Chọn câu đáp phù hợp nhất', 'Apa arti frasa ini?': 'Cụm này nghĩa là gì?', 'Skenario sudah selesai — skor {n}%.': 'Đã hoàn thành — điểm {n}%.', 'Skenario selesai! +20 XP': 'Hoàn thành! +20 XP',
  'Skor {n}% — butuh 70%. Putar dialognya sekali lagi, lalu ulangi kuis.': 'Điểm {n}% — cần 70%. Nghe lại rồi làm lại.', 'Role-play selesai — mantap!': 'Đóng vai xong — tuyệt!'
});

