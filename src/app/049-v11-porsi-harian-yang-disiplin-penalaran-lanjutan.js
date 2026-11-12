/* =====================================================================
   A. PORSI HARIAN — waktu belajar dibagi jelas: kenal · hafal · paham · latih
   ===================================================================== */
const DMIN = [15, 30, 45, 60];
const dailyMin = () => (DMIN.includes(+S.dailyMin) ? +S.dailyMin : 30);
const NEW_CAP = { 15: 8, 30: 15, 45: 22, 60: 30 };
const PORTION = [
  ['kenal', 'Pengenalan', 25, 'seed', 'kenal'],
  ['hafal', 'Hafalan', 30, 'brain', 'hafal'],
  ['paham', 'Pemahaman', 30, 'ctx', 'paham'],
  ['latih', 'Latihan', 15, 'target', 'latih']
];
const CAT_NAME = { kenal: 'Pengenalan', hafal: 'Hafalan', paham: 'Pemahaman', latih: 'Latihan' };
const CAT_DESC = { kenal: 'kata & huruf baru', hafal: 'mengingat tanpa melihat', paham: 'kata dipakai dalam kalimat', latih: 'bedah huruf, nada, menulis' };
const TYPE_CAT = {
  intro: 'kenal', combine: 'kenal', slangintro: 'kenal', ctxread: 'kenal',
  recall: 'hafal', mc_mean: 'hafal', mc_hanzi: 'hafal', listen: 'hafal', type: 'hafal', tone: 'hafal', match: 'hafal',
  cloze: 'paham', build: 'paham', lfill: 'paham', lmean: 'paham', lq: 'paham', story: 'paham', slang: 'paham',
  hz: 'latih', part: 'latih', tonepair: 'latih', write: 'latih'
};
function routeTargets() {
  const f = { 15: .6, 30: 1, 45: 1.4, 60: 1.8 }[dailyMin()];
  const r = (x, lo) => Math.max(lo, Math.round(x * f));
  let ear = r(8, 4); ear += ear % 2;
  const T = { rev: r(20, 8), hz: r(6, 3), ear, sent: r(6, 4) };
  const nn = planToday().new;
  T.m = { rev: Math.max(2, Math.round(T.rev * .3)), new: Math.max(2, Math.round(nn * .55)), hz: Math.max(2, Math.round(T.hz * .6)), ear: Math.max(2, Math.round(T.ear * .35)), sent: Math.max(2, Math.round(T.sent * .8)) };
  return T;
}
/* batas kata baru mengikuti waktu belajar yang dipilih (hanya bila pengguna memilihnya sendiri) */
const planTodayV10 = planToday;
planToday = function () {
  const day = dayRec(); if (day.plan) return day.plan;
  const p = planTodayV10();
  const cap = NEW_CAP[dailyMin()];
  if (S.dailyMin && p.new > cap) {
    p.new = cap; p.why = 'disesuaikan dengan waktu belajarmu'; p.cap = 1;
    if (day.q && day.q[0] && day.q[0].id === 'new') day.q[0].t = cap;
    save();
  }
  return p;
};
function addCat(cat, ms) {
  if (!cat || !(ms > 0)) return;
  const d = dayRec(); if (!d.cat || typeof d.cat !== 'object') d.cat = {};
  d.cat[cat] = (d.cat[cat] || 0) + Math.round(ms);
}
/* waktu sesi dibagi ke porsi sesuai jenis soal yang dikerjakan */
const recordSessionV10 = recordSession;
recordSession = function (complete) {
  if (SES && !SES.recorded) {
    const ms = Math.max(0, Math.min(Date.now() - SES.t0, 3.6e6));
    const seen = SES.items.slice(0, Math.min(SES.items.length, SES.i + 1));
    const cnt = {}; let n = 0;
    seen.forEach(it => { const c = SES.opts.cat || TYPE_CAT[it && it.type]; if (c) { cnt[c] = (cnt[c] || 0) + 1; n++; } });
    if (n) Object.keys(cnt).forEach(c => addCat(c, ms * cnt[c] / n));
  }
  return recordSessionV10(complete);
};
/* arcade = latihan (perkiraan ±4,5 detik per jawaban) */
if (typeof arcFinish === 'function') {
  const arcFinishV10 = arcFinish;
  arcFinish = function (silent) {
    const live = typeof G !== 'undefined' && G && !G.finished; const n = live ? (G.hits || 0) + (G.miss || 0) : 0;
    arcFinishV10(silent);
    if (live && n) { const ms = Math.min(n * 4500, 20 * 60000); addCat('latih', ms); dayRec().ms += ms; save(true); }
  };
}
function portionData(k = todayKey()) {
  const d = S.days[k] || {}; const c = d.cat || {}; const dm = dailyMin();
  return PORTION.map(([id, name, pct, ic, cls]) => { const tgt = dm * pct / 100; const got = (c[id] || 0) / 60000; return { id, name, pct, ic, cls, tgt, got, r: Math.min(1, got / tgt) }; });
}
function weekDots() {
  const goal = dailyMin() * 60000 * .8; const out = [];
  for (let k = 6; k >= 0; k--) {
    const key = keyAdd(todayKey(), -k); const d = S.days[key]; const ms = d ? d.ms || 0 : 0;
    const dt = new Date(...key.split('-').map((x, j) => (j === 1 ? +x - 1 : +x)));
    out.push({ key, ok: ms >= goal, part: ms > 0 && ms < goal, today: k === 0, lbl: dt.toLocaleDateString(LOCALE[S.settings.ui] || 'id-ID', { weekday: 'narrow' }), min: Math.round(ms / 60000) });
  }
  return out;
}
function portionPanel() {
  const P = portionData(); const dm = dailyMin(); const wk = weekDots(); const kept = wk.filter(x => x.ok).length;
  const todayMin = Math.round((dayRec().ms || 0) / 60000);
  const weak = P.filter(p => p.r < 1).sort((a, b) => a.r - b.r)[0];
  return `<div class="portion">
    <div class="pt-head"><div class="grow" style="min-width:0"><b>${ICON('pie')} ${t('Porsi belajar hari ini')}</b><span class="small muted">${t('{a} dari {b} menit', { a: todayMin, b: dm })}${weak && todayMin > 0 ? ' · ' + t('yang masih kurang: {s}', { s: t(weak.name) }) : ''}</span></div>
      <div class="seg dmin" role="group" aria-label="${t('Waktu belajar per hari')}">${DMIN.map(m => `<button class="${dm === m ? 'on' : ''}" data-a="dmin" data-v="${m}">${m}′</button>`).join('')}</div></div>
    <div class="pt-grid">${P.map(p => `<div class="ptc ${p.cls} ${p.r >= 1 ? 'full' : ''}"><div class="pt-t"><span class="pt-ic">${ICON(p.ic)}</span><b>${t(p.name)}</b><small>${p.pct}%</small></div>
      <div class="pt-bar"><i style="width:${Math.round(p.r * 100)}%"></i></div><div class="pt-s"><span>${t(CAT_DESC[p.id])}</span><b>${p.got < 1 && p.got > 0 ? '<1' : Math.round(p.got)}/${Math.round(p.tgt)}′</b></div></div>`).join('')}</div>
    <div class="wk"><span class="wk-l">${t('Komitmen 7 hari')}</span><div class="wk-d">${wk.map(x => `<span class="wkd ${x.ok ? 'ok' : x.part ? 'part' : ''} ${x.today ? 'today' : ''}" title="${x.key} · ${x.min}′"><i>${x.ok ? ICON('check') : ''}</i><small>${esc(x.lbl)}</small></span>`).join('')}</div><span class="wk-n"><b>${kept}</b>/7</span></div>
  </div>`;
}
/* kartu rute: sekarang setiap langkah bertanda porsi, plus panel porsi & komitmen */
function routeCard() {
  routeSync(false);
  const st = routeSteps(); const nx = st.findIndex(s => !s.done); const nDone = st.filter(s => s.done).length;
  const left = st.filter(s => !s.done).reduce((a, s) => a + s.min, 0);
  if (nx < 0) return `<section class="card glass route done-all"><div class="row" style="gap:12px;align-items:center">${ringSVG(1, st.length + '/' + st.length, t('RUTE'))}<div class="grow" style="min-width:0"><h2 style="margin:0">${t('Rute hari ini beres! 🎉')}</h2><div class="small muted">${t('Latihan tambahan sekarang = bonus XP. Pilih yang kamu suka di bawah.')}</div></div></div>${portionPanel()}</section>`;
  return `<section class="card glass route"><div class="row" style="gap:12px;align-items:center;margin-bottom:12px">${ringSVG(nDone / st.length, nDone + '/' + st.length, t('RUTE'))}
      <div class="grow" style="min-width:0"><h2 style="margin:0">${t('Rute hari ini')}</h2><div class="small muted">${t('Ikuti urutannya, satu per satu · ±{n} menit lagi', { n: left })}</div></div></div>
    <ol class="steps">${st.map((s, k) => `<li class="step ${s.done ? 'done' : k === nx ? 'now' : 'later'}">
      <button class="step-b" data-a="${s.a}"><span class="step-n">${s.done ? ICON('check') : k + 1}</span>
        <span class="grow" style="min-width:0"><b>${t(s.ti)} <small class="step-p">${s.prog}</small></b><span class="step-why">${t(s.why)}</span><span class="cat-tag ${s.cat}">${t(CAT_NAME[s.cat])} · ±${s.min}′</span></span>${k === nx ? `<span class="step-go">${t('Mulai')} ${ICON('chevron')}</span>` : ''}</button></li>`).join('')}</ol>
    ${portionPanel()}</section>`;
}
