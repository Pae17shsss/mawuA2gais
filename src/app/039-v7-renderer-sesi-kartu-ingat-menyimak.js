/* ========== v7: renderer sesi — Kartu Ingat & Menyimak ========== */

/* ----- Kartu Ingat (recall aktif + rating FSRS) ----- */
function buildRecall(n = 20, ids) {
  let pool = ids;
  if (!pool) {
    const now = Date.now();
    const due = dueIds(now);
    const rest = Object.keys(S.cards).map(Number).filter(i => W[i].m && S.cards[i].due > now).sort((a, b) => recallProb(a) - recallProb(b));
    pool = [...due, ...rest];
  }
  return pool.slice(0, n).map(i => ({ type: 'recall', wid: i, dir: !W[i].m || Math.random() < 0.7 ? 'hz' : 'mean' }));
}
function buildRescue(n = 15) { return buildRecall(n, memStats().risk.map(x => x[0])); }
function bedtimeIds() {
  const tk = todayKey(); const today0 = new Date(); today0.setHours(0, 0, 0, 0);
  const bedAt = dayRec().bedAt || 0;   // kata yang sudah diulang di sesi 'sebelum tidur' tidak dihitung lagi
  return Object.keys(S.cards).map(Number).filter(i => W[i].m && !S.cards[i].skip && (S.cards[i].add === tk || (S.cards[i].lr || 0) >= today0.getTime()) && (!bedAt || (S.cards[i].lr || 0) < bedAt));
}
function buildBedtime(n = 60) { return buildRecall(n, shuffle(bedtimeIds())); }

function renderRecall(it) {
  const w = W[it.wid]; const r = S.cards[it.wid] ? recallProb(it.wid) : 0;
  SES.flipped = false; SES.answered = false;
  const front = it.dir === 'hz'
    ? `<div class="q-hz hz ${w.w.length > 3 ? 'sm' : ''}">${esc(w.w.replace(/[()]/g, ''))}</div><div class="rc-ask">${t('Apa arti & bunyinya? Jawab dalam hati, atau ucapkan keras-keras.')}</div>`
    : `<div class="q-mean big">${esc(meanP(w))}</div><div class="rc-ask">${t('Bagaimana hanzi & bunyinya? Bayangkan bentuknya dulu.')}</div>`;
  const hc = [...w.s].filter(isHan)[0];
  $('#sbody').innerHTML = `<div class="s-card glass recall">
    <div class="q-kind">${ICON('brain')} ${t('Kartu ingat')}<span class="grow"></span>${S.cards[it.wid] && S.cards[it.wid].lrated ? `<span class="chip rchip">${t('peluang ingat')} ${Math.round(r * 100)}%</span>` : ''}</div>
    ${front}
    <div id="rback"></div>
    ${hc && CH[hc] ? `<button class="btn ghost small" data-s="rhint" style="align-self:center">${ICON('lightbulb')} ${t('Petunjuk bentuk')}</button><div id="rhintbox"></div>` : ''}
  </div>`;
  $('#sfoot').innerHTML = `<div class="inner"><button class="btn pri big wide" data-s="reveal">${t('Tampilkan jawaban')}</button></div>`;
}
function recallReveal() {
  if (!SES || SES.flipped) return; SES.flipped = true;
  const it = cur(); const w = W[it.wid];
  $('#rback').innerHTML = `<div class="rc-back">
    ${it.dir === 'mean' ? `<div class="q-hz hz ${w.w.length > 3 ? 'sm' : ''}">${hzHTML(w)}</div>` : ''}
    <div class="row" style="justify-content:center;gap:12px"><div class="q-py">${pinyinHTML(w, 'mark')}</div>${aligned(w) ? contourSVG(w.t, 24) : ''}<button class="speak mini" data-s="say">${ICON('speaker')}</button></div>
    ${it.dir === 'hz' ? subsHTML(w, true) : ''}${multiHan(w) ? charBreak(w, { inSession: true, cls: 'mini' }) : ''}</div>`;
  const hb = $('[data-s="rhint"]'); if (hb) hb.remove();
  const pv = fsrsPreview(it.wid);
  const lab = { 1: t('Lupa'), 2: t('Sulit'), 3: t('Bisa'), 4: t('Mudah') };
  $('#sfoot').innerHTML = `<div class="inner rate-row">${[1, 2, 3, 4].map(g => `<button class="rate r${g}" data-s="rate" data-v="${g}"><b>${lab[g]}</b><span>${fmtIvl(pv[g])}</span></button>`).join('')}</div>`;
  if (voiceOK()) sayLater(w, 150);
  FX.play('flip');
}
function recallHint() {
  const it = cur(); const w = W[it.wid]; const hc = [...w.s].filter(isHan)[0]; const d = CH[hc];
  const box = $('#rhintbox'); if (!box || !d) return;
  box.innerHTML = `<div class="gtip">${ICON('lightbulb')}<span><b class="hz">${hc}</b> — ${esc(charStory(hc))}</span></div>`;
  const hb = $('[data-s="rhint"]'); if (hb) hb.remove();
  SES.hinted = true;
}
function recallRate(g) {
  if (!SES || SES.answered || !SES.flipped) return;
  SES.rating = SES.hinted && g > 2 ? g - 1 : g; SES.hinted = false;
  answer(g >= 2);
}

/* ----- Menyimak: cerita ----- */
function renderStory(it) {
  const st = STORIES.find(s => s.k === it.st);
  SES.answered = true; SES.stxt = SES.stxt || (voiceOK() ? 0 : 1);
  const mode = SES.stxt; // 0 tanpa teks · 1 hanzi · 2 +pinyin · 3 +terjemahan
  const lines = st.l.map((l, k) => `<div class="sline" id="sl${k}">${l[0] ? `<span class="spk s${l[0]}">${l[0]}</span>` : ''}
      <div class="stext">${mode ? `<div class="hz szh">${esc(l[1])}</div>` : `<div class="sblur">${'●'.repeat(Math.min(12, l[1].length))}</div>`}
      ${mode >= 2 ? `<div class="spy">${esc(l[2])}</div>` : ''}${mode >= 3 ? `<div class="str">${esc(lineTr(l))}</div>` : ''}</div>
      <button class="btn ghost small" data-s="sline" data-v="${k}" aria-label="${t('Putar kalimat ini')}">${ICON('speaker')}</button></div>`).join('');
  $('#sbody').innerHTML = `<div class="s-card glass story">
    <div class="q-kind">${ICON('headphone')} ${t('Simak cerita')} · ${t(STORY_LV_NAME[st.lv])}<span class="grow"></span><span class="chip">${st.q.length} ${t('soal')}</span></div>
    <div class="row" style="gap:12px;align-items:center">${mascot('happy', 58)}<div class="grow"><h2 style="margin:0" class="hz">${esc(st.zh)}</h2><div class="small muted">${esc(storyName(st))}</div></div></div>
    ${voiceOK() ? `<div class="splayer"><button class="speak huge" data-s="splay" id="splaybtn">${ICON('play')}</button>
      <div class="seg" style="justify-content:center">${[[S.settings.rate, t('Normal')], [0.6, t('Pelan')]].map(([r, l], k) => `<button class="${(SES.srate || 0) === k ? 'on' : ''}" data-s="srate" data-v="${k}">${l}</button>`).join('')}</div></div>`
      : `<div class="notice">${t('Suara belum tersedia di perangkat ini — teks ditampilkan supaya tetap bisa berlatih.')}</div>`}
    <div class="gtip">${ICON('lightbulb')}<span>${t('Tips: dengarkan sekali tanpa teks, tangkap intinya. Lalu buka teks kalau perlu. Setelah itu jawab soalnya.')}</span></div>
    <div class="seg stx">${[t('Tanpa teks'), t('Hanzi'), t('+ Pinyin'), t('+ Arti')].map((l, k) => `<button class="${mode === k ? 'on' : ''}" data-s="stxt" data-v="${k}">${l}</button>`).join('')}</div>
    <div class="slines">${lines}</div></div>`;
  $('#sfoot').innerHTML = `<div class="inner"><button class="btn pri big wide" data-s="next">${t('Lanjut ke soal')} ${ICON('chevron')}</button></div>`;
}
function storyPlay(from) {
  const it = cur(); const st = STORIES.find(s => s.k === (it.st)); if (!st) return;
  if (LPLAY.on && from === undefined) { stopLines(); markLine(-1); return; }
  FX.ensure();
  const rate = SES.srate ? 0.6 : S.settings.rate;
  const btn = $('#splaybtn'); if (btn) btn.innerHTML = ICON('close');
  const list = from !== undefined ? [st.l[from]] : st.l;
  playLines(list, { rate, onLine: k => markLine(from !== undefined ? from : k), onEnd: () => { markLine(-1); const b2 = $('#splaybtn'); if (b2) b2.innerHTML = ICON('play'); } });
}
function markLine(k) { document.querySelectorAll('.sline').forEach((el, j) => el.classList.toggle('on', j === k)); const el = $('#sl' + k); if (el && el.scrollIntoView) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }

/* ----- Menyimak: soal cerita ----- */
function renderLQ(it) {
  const st = STORIES.find(s => s.k === it.st); const q = st.q[it.q];
  const order = shuffle([0, 1, 2, 3]); SES.correctK = order.indexOf(0); SES.lqOrder = order;
  $('#sbody').innerHTML = `<div class="s-card glass">
    <div class="q-kind">${ICON('headphone')} ${t('Pertanyaan')} ${it.q + 1}/${st.q.length}<span class="grow"></span>
      ${voiceOK() ? `<button class="btn sec small" data-s="splay">${ICON('play')} ${t('Dengar lagi')}</button>` : ''}</div>
    <div class="lq-q"><div class="hz" style="font-size:24px">${esc(q.q[0])}</div><div class="spy">${esc(q.q[1])}</div><div class="str">${esc(L3(q.q, 2))}</div></div>
    <div class="opts">${order.map((oi, k) => { const o = q.o[oi]; return `<button class="opt" data-s="opt" data-k="${k}"><kbd>${k + 1}</kbd><span class="hz" style="font-size:20px">${esc(o[0])}</span><span class="small muted" style="margin-left:8px">${esc(L3(o, 1))}</span></button>`; }).join('')}</div></div>`;
  if (voiceOK()) speakFor(it, q.q[0], 250);
}

/* ----- Menyimak: dengar & isi (pilihan ganda, tanpa pinyin) ----- */
function renderLFill(it) {
  SES.correctK = it.opts.findIndex(o => o[0] === it.sent.chunks[it.blank].hz);
  const line = it.sent.chunks.map((c, k) => k === it.blank ? `<span class="blank" id="blank">▢</span>` : `<span class="hz">${esc(c.hz)}</span>`).join('');
  $('#sbody').innerHTML = `<div class="s-card glass">
    <div class="q-kind">${ICON('headphone')} ${t('Dengar, lalu isi kata yang hilang')}</div>
    <div style="padding:6px 0">${voiceOK() ? `<button class="speak huge" data-s="lplay">${ICON('speaker')}</button>` : ''}</div>
    ${voiceOK() ? `<div class="row" style="justify-content:center"><button class="btn ghost small" data-s="lplay" data-slow="1">${ICON('slow')} ${t('pelan')}</button></div>` : ''}
    <div class="sent">${line}</div>
    <div class="opts">${it.opts.map((o, k) => `<button class="opt" data-s="opt" data-k="${k}"><kbd>${k + 1}</kbd><span class="hz" style="font-size:24px">${esc(o[0])}</span></button>`).join('')}</div></div>`;
  if (voiceOK()) speakFor(it, it.sent.zh, 300);
}
/* ----- Menyimak: dengar & pahami (pilih arti) ----- */
function renderLMean(it) {
  const all = shuffle([it.sent, ...it.others]); SES.correctK = all.indexOf(it.sent); SES.lmAll = all;
  $('#sbody').innerHTML = `<div class="s-card glass">
    <div class="q-kind">${ICON('headphone')} ${t('Dengar, lalu pilih artinya')}</div>
    <div style="padding:6px 0">${voiceOK() ? `<button class="speak huge" data-s="lplay">${ICON('speaker')}</button>` : `<div class="sent hz">${esc(it.sent.zh)}</div>`}</div>
    ${voiceOK() ? `<div class="row" style="justify-content:center"><button class="btn ghost small" data-s="lplay" data-slow="1">${ICON('slow')} ${t('pelan')}</button></div>` : ''}
    <div class="opts one">${all.map((sn, k) => `<button class="opt" data-s="opt" data-k="${k}" style="text-align:left"><kbd>${k + 1}</kbd>${esc(sentTr(sn))}</button>`).join('')}</div></div>`;
  if (voiceOK()) speakFor(it, it.sent.zh, 300);
}

/* ----- hasil & ringkasan tambahan ----- */
function listenFeedback(it, ok) {
  if (it.type === 'lq') {
    const st = STORIES.find(s => s.k === it.st); const q = st.q[it.q]; const c = q.o[0];
    return `<div class="fb ${ok ? 'ok' : 'bad'}"><div style="flex:1;min-width:0">${ok ? t('Benar!') : t('Jawaban yang benar:')}
      <small><span class="hz" style="font-size:18px">${esc(c[0])}</span> · ${esc(L3(c, 1))}</small></div></div>`;
  }
  const sn = it.sent;
  return `<div class="fb ${ok ? 'ok' : 'bad'}"><div style="flex:1;min-width:0">${ok ? t('Benar!') : t('Kalimat yang benar:')}
    <small><span class="hz" style="font-size:19px">${esc(sn.zh)}</span></small><small>${esc(sn.py)} · ${esc(sentTr(sn))}</small></div>
    <button class="btn ghost small" data-s="saysent" data-v="${esc(sn.zh)}">${ICON('speaker')}</button></div>`;
}
function speedLinesSVG() {
  let l = ''; for (let k = 0; k < 28; k++) { const a = k / 28 * Math.PI * 2; const r1 = 62 + (k % 3) * 6; l += `<line x1="${100 + Math.cos(a) * r1}" y1="${100 + Math.sin(a) * r1}" x2="${100 + Math.cos(a) * 100}" y2="${100 + Math.sin(a) * 100}"/>`; }
  return `<svg class="speedlines" viewBox="0 0 200 200" aria-hidden="true">${l}</svg>`;
}

/* simpan waktu belajar kalau app ditutup/diganti di tengah sesi */
function flushSessionTime() {
  if (!SES || SES.recorded) return;
  const now = Date.now(); const add = Math.min(now - (SES.flushAt || SES.t0), 3.6e6);
  if (add > 0) { dayRec().ms += add; SES.flushed = (SES.flushed || 0) + add; SES.flushAt = now; save(true); }
}
window.addEventListener('pagehide', flushSessionTime);
document.addEventListener('visibilitychange', () => { if (document.hidden) flushSessionTime(); });

/* sorakan maskot saat combo kelipatan 5 */
function comboCheer(n) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.combo-pop').forEach(x => x.remove());
  const e = document.createElement('div'); e.className = 'combo-pop';
  const words = ['太棒了！', '好厲害！', '讚！', '超強！'];
  e.innerHTML = `${mascot(n >= 10 ? 'wow' : 'joy', 64)}<div class="bubble b-left"><b class="hz">${words[(n / 5 - 1) % words.length]}</b> ${t('Combo')} ×${n}</div>`;
  document.body.appendChild(e); setTimeout(() => e.remove(), 1900);
}