/* ========== v7: Beranda bersih, Ingatan, Menyimak ========== */

/* kartu pemain: level + XP + streak dalam satu baris */
function playerCard() {
  const r = rankOf(); const st = streakNow(); const tk = todayKey(); const todayOk = dayHit(tk);
  const days = []; for (let k = -6; k <= 0; k++) days.push(keyAdd(tk, k));
  return `<section class="card glass player">
    <div class="row" style="gap:14px;align-items:center">
      <span class="ring-wrap">${ringSVG(r.pct, r.n, 'LV')}</span>
      <div class="grow" style="min-width:0">
        <div class="row" style="gap:8px;flex-wrap:wrap"><b style="font-size:16px">${t('Peringkat')} ${r.n}</b><span class="chip"><span class="hz">${r.zh}</span> ${t(r.name)}</span></div>
        <div class="bar" style="margin-top:8px;height:8px"><i style="width:${Math.round(r.pct * 100)}%"></i></div>
        <div class="small muted" style="margin-top:5px">${r.max ? fmtN(S.xp) + ' XP' : t('{a} / {b} XP menuju {e} Peringkat {n}', { a: fmtN(r.into), b: fmtN(r.need), e: '', n: r.n + 1 })}</div>
      </div>
      <div class="streak-mini ${todayOk ? '' : 'cold'}" title="${t('Selesaikan 3 misi untuk menyalakan api hari ini')}">${ICON('flame')}<b>${st}</b></div>
    </div>
    <div class="week mini">${days.map(k => `<i class="${dayHit(k) ? 'on' : ''} ${k === tk ? 'today' : ''}"></i>`).join('')}</div>
  </section>`;
}
function memoryMini() {
  const ms = memStats(); if (!ms.n) return '';
  const pct = Math.round(ms.avg * 100); const risk = ms.risk.length;
  return `<section class="card glass memmini">
    <div class="row" style="gap:12px;align-items:center">${ringSVG(ms.avg, pct + '%', t('INGAT'))}
      <div class="grow" style="min-width:0"><b>${t('Kekuatan ingatan')}</b><div class="small muted">${risk ? t('{n} kata hampir terlupa', { n: risk }) : t('Semua kata masih kuat. Mantap!')}</div></div></div>
    <button class="btn ${risk ? 'pri' : 'sec'} small wide" style="margin-top:12px" data-a="${risk ? 'rescue' : 'recall'}">${ICON(risk ? 'refresh' : 'brain')} ${risk ? t('Selamatkan') : t('Kartu ingat')}</button></section>`;
}
function featTile(ic, ti, sub, a, tint, badge) {
  return `<button class="feat" data-a="${a}">${TILE(ic, 'lg tint ' + tint)}<span class="grow" style="min-width:0"><b>${t(ti)}</b><span>${t(sub)}</span></span>${badge ? `<span class="fbadge">${badge}</span>` : ICON('chevron')}</button>`;
}

/* satu sumber angka untuk lencana Kartu ingat (Beranda & Ingatan) */
const recallDue = () => dueIds().length;   // satu angka 'jatuh tempo' untuk Beranda, Ingatan, rute & lencana
/* suasana maskot di Beranda — selalu sesuai kondisi nyata, dan kalimatnya stabil sepanjang jam yang sama */
function homeMood({ h, done, risk, dueN, newLeft }) {
  if (h >= 21 && bedtimeIds().length) return { ctx: 'night', n: 0, expr: 'sleepy' };
  if (done === 5) return { ctx: 'home_done', n: 0, expr: 'joy' };
  if (risk >= 5) return { ctx: 'home_rev', n: risk, expr: 'think' };
  if (newLeft > 0) return { ctx: 'home_new', n: newLeft, expr: 'wave' };
  if (dueN > 0) return { ctx: 'home_due', n: dueN, expr: 'happy' };
  return { ctx: 'home_free', n: 0, expr: 'joy' };
}

/* ---------- BERANDA ---------- */
function vHome() {
  const day = dayRec(); const plan = planToday(); const done = questsDoneCount(day); const c = counts();
  const h = new Date().getHours();
  const greet = h < 11 ? t('Selamat pagi') : h < 15 ? t('Selamat siang') : h < 19 ? t('Selamat sore') : t('Selamat malam');
  const zh = h < 11 ? '早安' : h < 18 ? '午安' : '晚安';
  const newLeft = Math.max(0, plan.new - day.new); const dueN = recallDue();
  const ms = memStats(); const risk = ms.risk.length;
  const mood = homeMood({ h, done, risk, dueN, newLeft });
  const line = mascotLine(mood.ctx).replace('{n}', mood.n);
  const expr = mood.expr; const nx = routeNext(); const nxi = nx ? nx.n : 0;
  const pct = Math.floor(c.a2 / A2N * 100);
  return `
  <section class="hero glass hero7">
    <div class="petals" aria-hidden="true">${'<i></i>'.repeat(7)}</div>
    <div class="hero-mascot poke" data-a="poke" role="button" tabindex="0" aria-label="Hacimi — ${t('ketuk aku!')}">${mascot(expr, 132)}<span class="tapme">${t('ketuk aku!')}</span></div>
    <div class="hero-body">
      <div class="greet"><span class="hz">${zh}</span> · ${greet}${S.name ? ', ' + esc(S.name) : ''}</div>
      ${bubble(esc(line), 'b-left')}
      <div class="row wrap" style="margin-top:14px"><button class="btn pri big" data-a="${nx ? nx.a : 'smart'}">${nx ? `<span class="stepno" aria-label="${t('Langkah {n}', { n: nxi })}">${nxi}</span>${t(nx.ti)}` : ICON('play') + ' ' + t('Latihan bebas')}</button>${nx ? `<button class="btn sec" data-a="smart">${ICON('bolt')} ${t('Sesi pintar')}</button>` : ''}</div>
      <div class="hero-stats"><span><b class="c-a">${newLeft}</b> ${t('kata baru')}</span><span><b class="c-b">${dueN}</b> ${t('ulangan')}</span><span><b class="c-c">${pct}%</b> ${t('ke A2')}</span></div>
    </div>
  </section>
  ${routeCard()}
  <div class="rail-inline">${playerCard()}</div>
  ${questCard(day, done)}
  <section class="card glass"><h2>${t('Latihan utama')}</h2><div class="feats">
    ${featTile('bolt', 'Speedrun 50 kata', 'Kenal + hafal sekaligus, kejar rekor waktu', 'speedrun', 'c3', '⚡')}
    ${featTile('brain', 'Kartu ingat', 'Ingat dulu, baru lihat jawaban', 'recall', 'c7', recallDue() ? String(recallDue()) : '')}
    ${featTile('headphone', 'Simak', 'Cerita & kalimat panjang', 'goto-listen', 'c2')}
    ${featTile('ctx', 'Kalimat nyata', 'Tiap kata dalam 3 kalimat — baca, dengar, pahami', 'goto-kalimat', 'c6', '✨')}
    ${featTile('blocks', 'Latihan kalimat', 'Lengkapi & susun kalimat', 'sent', 'c6')}
    ${featTile('game', 'Arcade 漢字 Monster', 'Kalahkan monster pakai hanzi', 'goto-arcade', 'c7', '🕹')}
    ${featTile('chat', 'Slang Taiwan', '“真的假的？” = “Ah, yang bener?”', 'goto-slang', 'c6')}
  </div></section>
  <section class="card glass"><h2>${t('Mode cepat')}</h2><div class="grid3 modes">
    ${modeTile('write', 'Latihan menulis', 'Goresan hanzi dengan jari', 'writedrill')}
    ${modeTile('tone', 'Dril nada', 'Tebak kontur nada', 'tones-drill')}
    ${modeTile('grid', 'Pasangkan', 'Game cepat 2 ronde', 'match')}
    ${modeTile('keyboard', 'Ketik pinyin', 'Latih ejaan + nada', 'drill-type')}
    ${modeTile('hanzi', 'Hanzi kilat', '10 hanzi lewat cerita', 'hzquiz')}
    ${modeTile('chip', 'Mandarin Pabrik', 'Istilah semikonduktor ASE', 'gotofab')}
  </div></section>
  <div class="rail-inline">${memoryMini()}</div>
  ${a2Card(c)}`;
}
function railHTML() { return playerCard() + memoryMini() + todayHzCard(); }
function railMini() { return playerCard() + memoryMini(); }

/* ---------- INGATAN ---------- */
function curveSVG(vals) {
  const W0 = 300, H0 = 120, px = 28, py = 14; const days = [0, 1, 3, 7, 14, 30];
  const x = k => px + (W0 - px - 14) * Math.sqrt(days[k] / 30), y = v => py + (H0 - py - 24) * (1 - v);
  const pts = vals.map((v, k) => `${x(k).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  return `<svg class="curve" viewBox="0 0 ${W0} ${H0}" role="img" aria-label="${t('Kurva lupa')}">
    ${[1, 0.75, 0.5].map(v => `<line x1="${px}" x2="${W0 - 10}" y1="${y(v)}" y2="${y(v)}" class="grid"/><text x="2" y="${y(v) + 4}" class="lab">${Math.round(v * 100)}%</text>`).join('')}
    <polyline points="${pts}" class="line"/>
    ${vals.map((v, k) => `<circle cx="${x(k)}" cy="${y(v)}" r="3.5" class="dot"/><text x="${x(k)}" y="${H0 - 6}" class="lab" text-anchor="middle">${days[k] ? '+' + days[k] : t('kini')}</text>`).join('')}
  </svg><div class="small muted" style="text-align:right;margin-top:-2px">${t('hari dari sekarang')}</div>`;
}
function vMemory() {
  const ms = memStats(); const pct = Math.round(ms.avg * 100);
  const nDue = recallDue(); const nRisk = ms.risk.length; const nBed = bedtimeIds().length;
  const h = new Date().getHours();
  const maxF = Math.max(5, ...ms.forecast);
  const dn = k => { const d = new Date(); d.setDate(d.getDate() + k); return k === 0 ? t('Hari ini') : d.toLocaleDateString(LOCALE[S.settings.ui] || 'id-ID', { weekday: 'short' }); };
  return `<section class="card glass pagehead">
    <div class="row" style="gap:14px;align-items:flex-start"><span class="poke" data-a="poke" role="button" tabindex="0" aria-label="Hacimi">${mascot(nRisk ? 'think' : 'happy', 96)}</span>
      <div class="grow"><h1>${t('Ingatan')}</h1>${bubble(esc(mascotLine('memory')), 'b-left')}</div></div>
    ${ms.n ? `<div class="memstats"><div>${ringSVG(ms.avg, pct + '%', t('INGAT'))}<span>${t('rata-rata peluang ingat')}</span></div>
      <div><b class="c-risk">${nRisk}</b><span>${t('hampir terlupa')}</span></div><div><b>${nDue}</b><span>${t('jatuh tempo')}</span></div></div>` : `<p class="muted">${t('Pelajari beberapa kata dulu — setelah itu grafik ingatanmu muncul di sini.')}</p>`}
  </section>
  <section class="card glass"><h2>${t('Latihan ingatan')}</h2><div class="feats">
    ${featTile('brain', 'Kartu ingat', 'Tebak dulu dalam hati, lalu nilai sendiri seberapa ingat', 'recall', 'c7', nDue ? String(nDue) : '')}
    ${featTile('refresh', 'Selamatkan ingatan', 'Kata dengan peluang ingat terendah', 'rescue', 'c8', nRisk ? String(nRisk) : '')}
    ${featTile('clock', 'Ulang sebelum tidur', 'Kata yang kamu pelajari hari ini', 'bedtime', 'c4', nBed ? String(nBed) : '')}
  </div>
  ${h >= 20 && nBed ? `<div class="gtip">${ICON('lightbulb')}<span>${t('Sudah malam: ulang 5 menit sebelum tidur. Saat tidur, otak memindahkan ingatan baru ke ingatan jangka panjang.')}</span></div>` : ''}</section>
  ${ms.n ? `<section class="card glass"><h2>${t('Kurva lupa')}</h2>
    <p class="small muted" style="margin:-4px 0 10px">${t('Kalau kamu berhenti mengulang, beginilah peluang ingatmu turun. Setiap ulangan tepat waktu membuat kurvanya makin landai.')}</p>
    ${curveSVG(ms.curve)}</section>
  <section class="card glass"><h2>${t('Jadwal ulangan 7 hari')}</h2>
    <div class="bars fc">${ms.forecast.map((v, k) => `<div><b class="small">${v}</b><i style="height:${Math.max(3, v / maxF * 100)}%"></i><span>${dn(k)}</span></div>`).join('')}</div></section>` : ''}
  ${nRisk ? `<section class="card glass"><h2>${t('Paling rapuh')}</h2><div class="wlist">${ms.risk.slice(0, 8).map(([i, r]) => `<button class="wrow" data-a="word" data-v="${i}"><span class="w hz">${esc(W[i].w)}</span><span style="min-width:0"><div class="py">${pinyinHTML(W[i], 'mark')}</div><div class="rbar"><i style="width:${Math.round(r * 100)}%"></i></div></span><span class="small muted">${Math.round(r * 100)}%</span></button>`).join('')}</div></section>` : ''}
  <section class="card glass"><h2>${t('Kenapa cara ini berhasil')}</h2>
    <div class="science">
      ${[['brain', 'c7', 'Ingat aktif', 'Menebak jawaban sebelum melihatnya jauh lebih menguatkan ingatan daripada membaca ulang.'],
         ['calendar', 'c1', 'Jarak ulang FSRS', 'Algoritma FSRS menghitung kapan setiap kata hampir terlupa, lalu memanggilnya tepat sebelum itu.'],
         ['layers', 'c2', 'Campur jenis soal', 'Arti, bunyi, nada, dan tulisan dilatih bergantian supaya ingatan punya banyak "pintu masuk".'],
         ['clock', 'c4', 'Tidur', 'Mengulang sebentar sebelum tidur membantu otak mengunci kata baru.']].map(([ic, c, a, b]) => `<div class="sci">${TILE(ic, 'tint ' + c)}<div><b>${t(a)}</b><p>${t(b)}</p></div></div>`).join('')}
    </div>
    <div class="gtip">${ICON('info')}<span>${t('Cara menilai di Kartu ingat: Lupa = tidak ingat sama sekali · Sulit = ingat tapi lama · Bisa = ingat dengan sedikit usaha · Mudah = langsung ingat. Jujur saja — jadwalnya jadi makin pas.')}</span></div></section>`;
}

/* ---------- MENYIMAK ---------- */
function vListen() {
  const done = S.listen || {};
  const lvTag = lv => `<span class="gpill">${t(STORY_LV_NAME[lv])}</span>`;
  return `<section class="card glass pagehead">
    <div class="row" style="gap:14px;align-items:flex-start"><span class="poke" data-a="poke" role="button" tabindex="0" aria-label="Hacimi">${mascot('happy', 96)}</span>
      <div class="grow"><h1>${t('Simak')}</h1>${bubble(esc(mascotLine('listen')), 'b-left')}</div></div>
    ${voiceOK() ? '' : `<div class="notice" style="margin-top:12px">${t('Suara belum tersedia di perangkat ini — teks ditampilkan supaya tetap bisa berlatih.')}</div>`}</section>
  <section class="card glass"><h2>${t('Latihan tanpa batas')}</h2><p class="small muted" style="margin:-4px 0 12px">${t('Kalimat dibuat acak sesuai levelmu, jadi soalnya tidak pernah habis.')}</p><div class="feats">
    ${featTile('puzzle', 'Dengar & isi', 'Dengarkan kalimat, pilih kata yang hilang', 'lfill', 'c6')}
    ${featTile('quote', 'Dengar & pahami', 'Dengarkan kalimat, pilih artinya', 'lmean', 'c1')}
    ${featTile('layers', 'Campuran', 'Dua jenis soal diacak', 'lmix', 'c2')}
  </div></section>
  <section class="card glass"><h2>${t('Cerita pendek')}</h2><p class="small muted" style="margin:-4px 0 12px">${t('Dengarkan ceritanya dulu, lalu jawab 3 pertanyaan tentang isinya.')}</p>
    <div class="stories">${STORIES.map(s => { const sc = done[s.k]; return `<button class="storytile ${sc !== undefined ? 'seen' : ''}" data-a="story" data-v="${s.k}">
      <span class="hz st-zh">${esc(s.zh)}</span><span class="st-n">${esc(storyName(s))}</span>
      <span class="row" style="gap:6px;margin-top:auto">${lvTag(s.lv)}${sc !== undefined ? `<span class="gpill ${sc === s.q.length ? 'perfect' : ''}">${ICON('check')} ${sc}/${s.q.length}</span>` : ''}</span></button>`; }).join('')}</div></section>`;
}

/* ---------- interaksi anime ---------- */
function pokeMascot(box) {
  const svg = box.querySelector('svg.mascot'); const size = svg ? +svg.getAttribute('width') || 120 : 120;
  S.pokes = (S.pokes || 0) + 1;
  const exprs = ['joy', 'wow', 'wave', 'happy', 'joy'];
  box.querySelector('svg.mascot').outerHTML = mascot(exprs[S.pokes % exprs.length], size);
  const tap = box.querySelector('.tapme'); if (tap) tap.remove();
  box.classList.remove('hop'); void box.offsetWidth; box.classList.add('hop');
  heartBurst(box);
  const sec = box.closest('section'); const bub = sec && sec.querySelector('.bubble');
  const pool = Object.keys(S.cards).map(Number).filter(i => W[i].m);
  let html;
  if (pool.length && S.pokes % 2 === 1) {
    const w = W[pick(pool)];
    html = `${t('Masih ingat?')} <b class="hz">${esc(w.w.replace(/[()]/g, ''))}</b> <span class="bpy">${pinyinHTML(w, 'mark')}</span> → ${esc(meanP(w))}`;
    if (voiceOK()) say(w);
  } else html = esc(t(POKE_LINES[S.pokes % POKE_LINES.length]));
  if (bub) { bub.innerHTML = html; bub.classList.remove('pop'); void bub.offsetWidth; bub.classList.add('pop'); }
  FX.play('flip'); save();
}
function showLevelUp(r) {
  document.querySelectorAll('.lvup').forEach(x => x.remove());
  const o = document.createElement('div'); o.className = 'lvup'; o.setAttribute('role', 'dialog');
  o.innerHTML = `<div class="lvup-card">${speedLinesSVG()}
    <div class="lvup-m">${mascot('wow', 150)}</div>
    <div class="lvup-t">RANK UP!</div>
    <div class="lvup-n">${t('Peringkat')} ${r.n} · <span class="hz">${r.zh}</span> ${esc(t(r.name))}</div>
    <div class="small muted">${r.next ? t('{a} XP lagi ke peringkat berikutnya', { a: fmtN(r.toNext) }) : ''}</div>
    <button class="btn pri big" data-lv="ok">${t('Mantap!')}</button></div>`;
  const close = () => { o.classList.add('out'); setTimeout(() => o.remove(), 250); };
  o.addEventListener('click', close);
  document.body.appendChild(o); confetti(); FX.play('level');
  setTimeout(close, 5200);
}
let LAST_ROUTE = null;
function afterRender() {
  if (ROUTE === 'words') { const i = $('#wq'); if (i && VS.focus) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); VS.focus = false; } }
  if (ROUTE !== LAST_ROUTE) { const m = $('#main'); if (m) { m.classList.remove('enter'); void m.offsetWidth; m.classList.add('enter'); } LAST_ROUTE = ROUTE; }
}
document.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('poke')) { e.preventDefault(); pokeMascot(e.target); } });

/* aksi baru */
Object.assign(ACT, {
  recall: () => { const it = buildRecall(20); if (!it.length) return toast(t('Belum ada kata untuk diingat — pelajari beberapa kata dulu 🌱')); startSession(it, { title: t('Kartu ingat'), rebuild: () => buildRecall(20) }); },
  rescue: () => { const it = buildRescue(15); if (!it.length) return toast(t('Semua kata masih kuat. Mantap!')); startSession(it, { title: t('Selamatkan ingatan'), rebuild: () => buildRescue(15) }); },
  bedtime: () => { dayRec().bedAt = Date.now(); const it = buildBedtime(60); if (!it.length) return toast(t('Belum ada kata yang dipelajari hari ini.')); startSession(it, { title: t('Ulang sebelum tidur') }); },
  story: b => { const k = b.dataset.v; startSession(buildStory(k), { title: t('Simak'), rebuild: () => buildStory(k) }); },
  lfill: () => startSession(buildLFill(10), { title: t('Dengar & isi'), rebuild: () => buildLFill(10) }),
  lmean: () => startSession(buildLMean(10), { title: t('Dengar & pahami'), rebuild: () => buildLMean(10) }),
  lmix: () => startSession(buildLMix(12), { title: t('Simak'), rebuild: () => buildLMix(12) }),
  'drill-recall': () => ACT.recall(), 'drill-lq': () => go('listen'), 'drill-lfill': () => ACT.lfill(), 'drill-lmean': () => ACT.lmean(),
  'goto-listen': () => go('listen'),
  poke: b => pokeMascot(b)
});
['recall', 'rescue', 'bedtime', 'story', 'lfill', 'lmean', 'lmix', 'drill-recall', 'drill-lfill', 'drill-lmean'].forEach(a => START_ACTS.add(a));