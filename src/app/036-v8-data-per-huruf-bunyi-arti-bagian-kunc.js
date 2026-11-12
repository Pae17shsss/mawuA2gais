/* ========== v8: DATA PER HURUF — bunyi, arti, bagian (kunci makna & petunjuk bunyi) ========== */
const HAN_RE = /[⺀-⿿㐀-鿿豈-﫿]/;
const RAD_SET = new Set(RADICALS.map(r => r[0]));

/* bunyi per huruf: diambil dari penjajaran pinyin per suku kata di seluruh kosakata */
const toneOfSyl = s => { for (const ch of s) if (MARKS[ch]) return MARKS[ch][1]; return 5; };
const CHAR_PY = {}; const CHAR_MULTI = new Set(); const SOLO = {};
(function buildCharPy() {
  const cnt = {};
  W.forEach(w => {
    if (w.s && w.s.length === 1 && HAN_RE.test(w.s) && w.m && SOLO[w.s] === undefined) SOLO[w.s] = w.i;
    if (!aligned(w)) return;
    [...w.s].forEach((c, k) => {
      if (!HAN_RE.test(c) || !w.y[k]) return;
      const y = w.y[k].toLowerCase(); const tn = w.t[k];
      const o = cnt[c] || (cnt[c] = {});
      o[y] = (o[y] || 0) + (tn === 5 ? 0.3 : 1);   // nada netral (子, 們) kalah dari bacaan penuh
    });
  });
  for (const c in cnt) {
    const e = Object.entries(cnt[c]).sort((a, b) => b[1] - a[1]);
    let best = e[0][0];
    const solo = SOLO[c] !== undefined ? W[SOLO[c]] : null;
    if (solo && aligned(solo) && solo.y[0] && solo.t[0] !== 5) best = solo.y[0].toLowerCase();
    if (toneOfSyl(best) === 5) { const full = e.find(x => toneOfSyl(x[0]) !== 5); if (full) best = full[0]; }
    CHAR_PY[c] = best;
    const bases = new Set(e.filter(x => x[1] >= 1).map(x => x[0]));
    if (bases.size > 1) CHAR_MULTI.add(c);
  }
})();
const charPy = c => CHAR_PY[c] || (COMP[c] ? COMP[c][0] : '');
const charTone = c => { const p = charPy(c); return p ? toneOfSyl(p) : 5; };
const charBase = c => stripTone(charPy(c));
const INITIALS = ['zh', 'ch', 'sh', 'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'r', 'z', 'c', 's', 'y', 'w'];
const finalOf = base => { for (const i of INITIALS) if (base.startsWith(i) && base.length > i.length) return base.slice(i.length); return base; };

/* arti per huruf sesuai bahasa arti pengguna (ID / EN / PH / VI) */
function shortMean(s) { if (!s) return ''; s = String(s).split(/[;；]/)[0]; const p = s.split(/,\s*/); return p.slice(0, 2).join(', ').trim(); }
const langOf = l => (typeof l === 'number' ? ['id', 'en', 'tl'][l] || 'en' : l || meanLang());
function charMean(c, l) {
  l = langOf(l);
  const solo = SOLO[c] !== undefined ? W[SOLO[c]] : null; const ct = CH_T[c];
  if (l === 'id') return (CH[c] && CH[c][0]) || (solo && shortMean(solo.m[0])) || (COMP[c] && COMP[c][1]) || '';
  const en = (solo && shortMean(solo.m[1])) || (typeof CHAR_EN !== 'undefined' && CHAR_EN[c]) || (ct && ct[0]) || (COMP[c] && COMP[c][2]) || '';
  if (l === 'tl') return (solo && shortMean(solo.m[2])) || en;
  if (l === 'vi') return (solo && shortMean(vx(solo.m[1]))) || (ct && ct[2]) || vx((typeof CHAR_EN !== 'undefined' && CHAR_EN[c]) || (COMP[c] && COMP[c][2])) || en;
  return en;
}
/* cerita bentuk dalam bahasa arti; cerita buatan pengguna selalu diutamakan */
function charStory(c, l, builtin) {
  l = langOf(l); if (!builtin && S.stories && S.stories[c]) return S.stories[c];
  const ct = CH_T[c];
  if (l === 'id' || !ct) return (CH[c] && CH[c][1]) || '';
  return l === 'vi' ? ct[3] : ct[1];
}

/* bagian-bagian huruf, dibaca dari cerita bentuknya */
const PARTS_CACHE = {};
function charParts(c) {
  if (PARTS_CACHE[c]) return PARTS_CACHE[c];
  const st = (CH[c] || ['', ''])[1] || ''; const out = []; const seen = new Set([c]);
  const re = new RegExp(HAN_RE.source, 'g'); let m;
  while ((m = re.exec(st)) && out.length < 3) {
    const p = m[0]; if (seen.has(p)) continue; seen.add(p);
    const before = st.slice(0, m.index).match(/([A-Za-zÀ-ÿ\-]+)\s*\($/);
    const after = st.slice(m.index + 1).match(/^\s*\(([^)]{1,24})\)/);
    const idWord = (before ? before[1] : after && !HAN_RE.test(after[1]) ? after[1] : '').toLowerCase().replace(/["“”]/g, '').trim();
    out.push({ p, idWord, py: COMP[p] ? COMP[p][0] : charPy(p) });
  }
  // peran: kunci makna (radikal) & petunjuk bunyi
  const base = charBase(c); const fin = finalOf(base);
  out.forEach(o => {
    const b = o.py ? stripTone(o.py) : '';
    o.sound = b && base ? (b === base ? 2 : (finalOf(b) === fin && fin.length >= 2 ? 1 : 0)) : 0;
  });
  let key = out.find(o => RAD_SET.has(o.p) && !o.sound) || out.find(o => RAD_SET.has(o.p)) || out.find(o => !o.sound) || null;
  out.forEach(o => { o.role = o === key ? 'key' : o.sound ? 'sound' : 'part'; });
  return (PARTS_CACHE[c] = out);
}
function partMean(o, l) {
  l = langOf(l);
  if (l === 'id') return o.idWord || (COMP[o.p] && COMP[o.p][1]) || charMean(o.p, 'id');
  if (COMP[o.p]) return l === 'vi' ? vx(COMP[o.p][2]) : COMP[o.p][2];
  return charMean(o.p, l);
}
const radMean = r => (meanLang() === 'id' ? r[1] : isVI() ? vx(COMP[r[0]][2]) : COMP[r[0]][2]);
const keyPart = c => charParts(c).find(o => o.role === 'key') || null;
const soundPart = c => charParts(c).find(o => o.role === 'sound') || null;

/* indeks keluarga: huruf dengan kunci makna sama, huruf dengan petunjuk bunyi sama, dan saudara nada */
let FAM8 = null;
function fam8() {
  if (FAM8) return FAM8;
  const key = {}, snd = {}, syl = {}, homo = {};
  CHAR_ORDER.forEach(c => {
    const k = keyPart(c); if (k) (key[k.p] = key[k.p] || []).push(c);
    const s = soundPart(c); if (s) (snd[s.p] = snd[s.p] || []).push(c);
    const py = charPy(c); if (!py || CHAR_MULTI.has(c)) return;
    const b = stripTone(py); (syl[b] = syl[b] || []).push(c);
    (homo[py] = homo[py] || []).push(c);
  });
  const toneGroups = Object.entries(syl).filter(([, cs]) => new Set(cs.map(charTone)).size >= 2).map(([b, cs]) => ({ b, cs }));
  const homoGroups = Object.entries(homo).filter(([, cs]) => cs.length >= 2).map(([py, cs]) => ({ py, b: stripTone(py), cs }));
  return (FAM8 = { key, snd, syl, toneGroups, homoGroups });
}
const charSeen = c => (CHAR_WORDS[c] || []).some(i => S.cards[i]);
function toneSiblings(c) { const b = charBase(c); if (!b) return []; return ((fam8().syl[b]) || []).filter(x => x !== c); }

/* ---------- tampilan: rincian per huruf (wǒ + men = wǒmen) ---------- */
function charBreak(w, opts = {}) {
  const cs = [...w.s]; const hs = cs.map((c, k) => ({ c, k })).filter(o => HAN_RE.test(o.c));
  if (hs.length < 1) return '';
  const act = opts.inSession ? 'data-s="hzstory"' : 'data-a="char"';
  const cells = hs.map(({ c, k }, j) => {
    const py = aligned(w) && w.y[k] ? w.y[k] : charPy(c); const tn = aligned(w) ? w.t[k] : toneOfSyl(py || '');
    const mn = charMean(c);
    return `${j ? '<span class="cb-op">+</span>' : ''}<button class="cb-cell" ${act} data-v="${c}" style="--d:${j * 0.9}s"><span class="hz cb-hz t${tn}">${c}</span><span class="cb-py t${tn}">${esc(py || '')}</span><span class="cb-mn">${esc(mn || '—')}</span></button>`;
  }).join('');
  const whole = `<span class="cb-op">=</span><span class="cb-cell cb-sum" style="--d:${hs.length * 0.9}s"><span class="hz cb-hz">${esc(w.w.replace(/[()]/g, ''))}</span><span class="cb-py">${esc(aligned(w) ? w.y.join('') : w.p || '')}</span><span class="cb-mn">${esc(w.m ? meanP(w) : '')}</span></span>`;
  const logic = hs.length >= 2 && w.m ? `<div class="cb-logic">${ICON('lightbulb')}<span>${t('Logikanya')}: ${hs.map(({ c }) => `“${esc(charMean(c) || c)}”`).join(' + ')} → <b>${esc(meanP(w))}</b></span></div>` : '';
  return `<div class="cbreak ${opts.cls || ''}" style="--n:${hs.length + 1}"><div class="cb-row">${hs.length >= 2 ? cells + whole : cells}</div>${logic}</div>`;
}

/* ---------- lensa bagian: potongan huruf menyala bergantian, berulang terus ---------- */
function partLens(c, opts = {}) {
  const ps = charParts(c); const py = charPy(c); const tn = charTone(c); const mn = charMean(c);
  const roleLbl = { key: t('kunci makna'), sound: t('petunjuk bunyi'), part: t('bagian') };
  const n = ps.length + 1;
  const chips = ps.map((o, j) => `<button class="pl-part r-${o.role}" ${opts.inSession ? 'data-s="hzstory"' : 'data-a="char"'} data-v="${o.p}" style="--d:${j * 1.1}s;--n:${n}" ${CH[o.p] ? '' : 'disabled'}>
      <span class="hz pl-g">${o.p}</span><span class="pl-t"><b>${esc(partMean(o) || '·')}</b><small>${esc(o.py || '')}${o.py ? ' · ' : ''}${roleLbl[o.role]}</small></span></button>`).join('<span class="pl-op">+</span>');
  const sum = `<span class="pl-op">=</span><span class="pl-part r-sum" style="--d:${ps.length * 1.1}s;--n:${n}"><span class="hz pl-g t${tn}">${c}</span><span class="pl-t"><b>${esc(mn || '—')}</b><small class="t${tn}">${esc(py)}</small></span></span>`;
  return `<div class="plens">${ps.length ? chips + sum : sum}</div>`;
}
/* kalimat cara membaca huruf ini dari bagiannya */
function lensHow(c) {
  const k = keyPart(c); const s = soundPart(c); const py = charPy(c); const mn = charMean(c);
  const lines = [];
  if (k) lines.push(t('Lihat bagian yang menyala {p} ({m}) — maknanya pasti berkaitan dengan “{m}”.', { p: `<b class="hz glowk">${k.p}</b>`, m: esc(partMean(k)) }));
  if (s) lines.push(s.sound === 2 ? t('Bagian {p} berbunyi {y} — huruf ini juga dibaca {z}.', { p: `<b class="hz glows">${s.p}</b>`, y: `<b>${esc(s.py)}</b>`, z: `<b>${esc(py)}</b>` })
    : t('Bagian {p} ({y}) memberi bunyi mirip → {z}.', { p: `<b class="hz glows">${s.p}</b>`, y: esc(s.py), z: `<b>${esc(py)}</b>` }));
  if (k || s) lines.push(t('Gabungkan: {a} → “{m}”.', { a: [k && esc(partMean(k)), s && t('bunyi {y}', { y: esc(s.py) })].filter(Boolean).join(' + '), m: `<b>${esc(mn)}</b>` }));
  return lines;
}
/* satu blok lensa lengkap: animasi goresan berulang + potongan + cara baca + keluarga */
function lensBlock(c, opts = {}) {
  const how = lensHow(c); const k = keyPart(c); const s = soundPart(c); const f = fam8();
  const kin = k ? (f.key[k.p] || []).filter(x => x !== c).slice(0, 8) : [];
  const sin = s ? (f.snd[s.p] || []).filter(x => x !== c).slice(0, 8) : [];
  const sib = toneSiblings(c).slice(0, 8);
  const chip = x => `<button class="chip" data-a="char" data-v="${x}"><span class="hz">${x}</span> <span class="t${charTone(x)}">${esc(charPy(x))}</span> ${esc(charMean(x))}</button>`;
  return `<div class="lens8">
    <div class="gpill">${ICON('sparkle')} ${t('Lensa bagian')}</div>
    ${partLens(c, opts)}
    ${how.length ? `<ol class="lens-how">${how.map(l => `<li>${l}</li>`).join('')}</ol>` : `<p class="small muted">${t('Huruf ini adalah bentuk dasar — ia sendiri sering menjadi bagian dari huruf lain.')}</p>`}
    ${kin.length ? `<div class="kin"><span class="kin-l"><b class="hz glowk">${k.p}</b> ${t('keluarga makna')}</span>${kin.map(chip).join('')}</div>` : ''}
    ${sin.length ? `<div class="kin"><span class="kin-l"><b class="hz glows">${s.p}</b> ${t('keluarga bunyi')}</span>${sin.map(chip).join('')}</div>` : ''}
    ${sib.length ? `<div class="kin"><span class="kin-l">${ICON('tone')} ${t('bunyi sama, nada beda')}</span>${sib.map(chip).join('')}<button class="chip" data-a="twins-of" data-v="${charBase(c)}">${ICON('chevron')} ${t('lihat semua')}</button></div>` : ''}
  </div>`;
}
/* kotak huruf yang bercahaya lembut; HanziWriter (jika bisa dimuat) menggambar goresan berulang,
   bagian kunci makna diberi warna menyala. Tanpa internet: kilau cahaya menyapu bentuk huruf. */
function glowBox(c, size = 170, id = 'hw') {
  return `<div class="glowbox" style="--s:${size}px"><div class="writer" id="${id}" style="width:${size}px;height:${size}px"><svg class="grid" viewBox="0 0 170 170" width="${size}" height="${size}"><path d="M0 85H170M85 0V170M0 0L170 170M170 0L0 170" stroke="rgba(150,140,190,.22)" stroke-dasharray="4 5"/></svg><span class="hz shine" id="${id}fb" style="font-size:${Math.round(size * 0.7)}px">${c}</span></div></div>`;
}
let HW_LOOP = [];
function mountLoop(c, id = 'hw', size = 170, onReady) {
  const box = document.getElementById(id); if (!box) return;
  box.dataset.ch = c;
  loadHanziWriter(() => {
    if (!box.isConnected || box.dataset.ch !== c || box.dataset.mounted || !window.HanziWriter) return;
    box.dataset.mounted = '1';
    try {
      const dark = document.documentElement.dataset.theme === 'dark' || (document.documentElement.dataset.theme !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches);
      const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const w = HanziWriter.create(id, c, {
        width: size, height: size, padding: 8, showOutline: true, showCharacter: still,
        strokeColor: dark ? '#e6ddff' : '#3a3159', radicalColor: '#f0a53a', outlineColor: dark ? 'rgba(255,255,255,.1)' : 'rgba(58,49,89,.08)',
        strokeAnimationSpeed: 0.9, delayBetweenStrokes: 260, delayBetweenLoops: 1600,
        onLoadCharDataSuccess: () => { const f = document.getElementById(id + 'fb'); if (f) f.remove(); box.classList.add('live'); if (onReady) onReady(w); },
        onLoadCharDataError: () => {}
      });
      if (!still) w.loopCharacterAnimation();
      HW_LOOP.push({ w, el: box });
    } catch (e) { /* tetap memakai kilau CSS */ }
  });
}
/* hentikan animasi yang elemennya sudah hilang dari layar (all = semuanya) */
function stopLoops(all) {
  HW_LOOP = HW_LOOP.filter(o => { if (all || !o.el.isConnected) { try { o.w.pauseAnimation(); } catch (e) {} return false; } return true; });
}

/* ---------- SOAL BARU ---------- */
const multiHan = w => [...w.s].filter(c => HAN_RE.test(c)).length >= 2;
const combineOK = w => !!w && !!w.m && multiHan(w) && [...w.s].filter(c => HAN_RE.test(c)).every(c => charMean(c));
/* gabung huruf: lihat arti tiap huruf, tebak arti kata gabungannya */
function renderCombine(it) {
  const w = W[it.wid];
  const ds = distract(w, 3, meanP); const opts = shuffle([w, ...ds]); SES.correct = w.i;
  const hs = [...w.s].map((c, k) => ({ c, k })).filter(o => HAN_RE.test(o.c));
  $('#sbody').innerHTML = `<div class="s-card glass"><div class="q-kind">${ICON('puzzle')} ${t('Gabungkan hurufnya')}</div>
    <div class="cbreak quiz"><div class="cb-row">${hs.map(({ c, k }, j) => `${j ? '<span class="cb-op">+</span>' : ''}<span class="cb-cell" style="--d:${j * 0.9}s"><span class="hz cb-hz t${aligned(w) ? w.t[k] : 5}">${c}</span><span class="cb-py">${esc(aligned(w) ? w.y[k] : charPy(c))}</span><span class="cb-mn">${esc(charMean(c))}</span></span>`).join('')}<span class="cb-op">=</span><span class="cb-cell cb-sum q"><span class="hz cb-hz">?</span></span></div></div>
    <div class="small muted" style="text-align:center">${t('Satu huruf + huruf lain = kata baru. Kata apa yang terbentuk?')}</div>
    <div class="opts">${opts.map((o, k) => `<button class="opt" data-s="opt" data-v="${o.i}"><kbd>${k + 1}</kbd>${esc(meanP(o))}</button>`).join('')}</div></div>`;
}
/* beda nada: dengar satu suku kata, pilih huruf yang benar di antara saudara nadanya */
function buildTonePair(n = 10) {
  const g = fam8().toneGroups; if (!g.length) return [];
  const pref = g.filter(x => x.cs.some(charSeen)); const pool = pref.length >= 6 ? pref : g;
  const items = [];
  for (const grp of shuffle(pool)) {
    if (items.length >= n) break;
    const byT = {}; grp.cs.forEach(c => { const tn = charTone(c); if (!byT[tn] || (charSeen(c) && !charSeen(byT[tn]))) byT[tn] = c; });
    const opts = Object.values(byT).filter(c => charMean(c)); if (opts.length < 2) continue;
    const seenO = opts.filter(charSeen); const ch = pick(seenO.length ? seenO : opts);
    items.push({ type: 'tonepair', ch, opts: shuffle(opts.filter(x => x !== ch)).slice(0, 3).concat(ch) });
  }
  return items;
}
function renderTonePair(it) {
  const v = voiceOK(); const py = charPy(it.ch); const opts = shuffle(it.opts);
  $('#sbody').innerHTML = `<div class="s-card glass"><div class="q-kind">${ICON('tone')} ${v ? t('Dengar — huruf yang mana?') : t('Bunyi ini huruf yang mana?')}</div>
    ${v ? `<div style="padding:12px 0 4px"><button class="speak huge" data-s="tpsay" aria-label="${t('Putar suara')}">🔊</button></div><div class="row" style="justify-content:center;gap:8px"><button class="btn ghost small" data-s="tphum">${ICON('wave')} ${t('kontur nada')}</button></div>`
      : `<div class="q-py" style="font-size:40px">${esc(py)}</div>`}
    <div class="small muted" style="text-align:center">${t('Suku katanya sama: {b}. Hanya nadanya yang membedakan arti.', { b: `<b>${esc(stripTone(py))}</b>` })}</div>
    <div class="opts">${opts.map((c, k) => `<button class="opt tp" data-s="opt" data-v="${c}"><kbd>${k + 1}</kbd><span class="hz" style="font-size:26px">${c}</span>${v ? ` <b class="t${charTone(c)}">${esc(charPy(c))}</b>` : ''}<span class="small muted" style="display:block">${esc(charMean(c))}</span></button>`).join('')}</div></div>`;
  if (v) setTimeout(() => { if (SES && cur() === it && !SES.answered) TTS.speak(it.ch); }, 260);
}
/* tebak dari bagian: satu potongan menyala — di huruf mana ia bersembunyi? */
function buildPartQuiz(n = 10) {
  const all = CHAR_ORDER.filter(c => { const k = keyPart(c); return k && RAD_SET.has(k.p) && charMean(c); });
  const seen = all.filter(charSeen); const pool = seen.length >= 12 ? seen : all.slice(0, 160);
  const items = [];
  for (const c of shuffle(pool)) {
    if (items.length >= n) break;
    const k = keyPart(c).p;
    const others = shuffle(all.filter(x => x !== c && !(CH[x] && (CH[x][1] || '').includes(k)) && keyPart(x) && keyPart(x).p !== k)).slice(0, 3);
    if (others.length < 3) continue;
    items.push({ type: 'part', ch: c, key: k, opts: shuffle([c, ...others]) });
  }
  return items;
}
function renderPart(it) {
  const o = keyPart(it.ch); const m = o ? partMean(o) : '';
  $('#sbody').innerHTML = `<div class="s-card glass"><div class="q-kind">${ICON('search')} ${t('Tebak dari bagian')}</div>
    <div class="part-q"><span class="hz glowk pulse">${it.key}</span><div><b>${esc(m)}</b><small>${t('kunci makna')}</small></div></div>
    <div class="small muted" style="text-align:center">${t('Huruf mana yang punya bagian ini? Maknanya pasti berkaitan dengan “{m}”.', { m: esc(m) })}</div>
    <div class="opts hz4">${it.opts.map((c, k) => `<button class="opt" data-s="opt" data-v="${c}"><kbd>${k + 1}</kbd><span class="hz" style="font-size:34px">${c}</span></button>`).join('')}</div></div>`;
}
function fb8(it, ok) {
  const c = it.ch; const py = charPy(c); const how = lensHow(c).slice(0, 2);
  const extra = it.type === 'tonepair' ? `<small>${it.opts.map(x => `<span class="hz">${x}</span> <b class="t${charTone(x)}">${esc(charPy(x))}</b> ${esc(charMean(x))}`).join(' · ')}</small>`
    : how.length ? `<small>${how.join(' ')}</small>` : '';
  return `<div class="fb ${ok ? 'ok' : 'bad'}"><div style="flex:1;min-width:0">${ok ? t(pick(['Benar!', 'Tepat!', 'Pintar!'])) : t('Jawabannya') + ':'} <span class="hz" style="font-size:22px">${c}</span> <b class="t${charTone(c)}">${esc(py)}</b> · ${esc(charMean(c))}${extra}</div></div>`;
}
/* sesi bedah huruf: kata-kata hari ini dipecah jadi huruf, bagian, dan gabungan */
function todayWords(n = 12) {
  const tk = todayKey();
  let ids = Object.keys(S.cards).map(Number).filter(i => S.cards[i].add === tk && !S.cards[i].skip && W[i]);
  if (ids.length < 4) ids = Object.keys(S.cards).map(Number).filter(i => W[i] && !S.cards[i].skip).sort((a, b) => (S.cards[b].ls || 0) - (S.cards[a].ls || 0)).slice(0, 24);
  return ids.slice(0, n);
}
function buildParts(n = 12) {
  const ws = todayWords(16);
  const items = [];
  shuffle(ws.filter(i => combineOK(W[i]))).slice(0, 5).forEach(i => items.push({ type: 'combine', wid: i }));
  const chars = [...new Set(ws.flatMap(i => [...W[i].s].filter(c => CH[c])))];
  shuffle(chars).slice(0, 4).forEach(c => items.push({ type: 'hz', ch: c }));
  const pq = buildPartQuiz(8).filter(x => chars.includes(x.ch));
  (pq.length >= 2 ? pq : buildPartQuiz(3)).slice(0, 3).forEach(x => items.push(x));
  if (items.length < 4) return buildPartQuiz(n);
  return shuffle(items).slice(0, n);
}
function buildEar(n = 10) {
  const tp = buildTonePair(6);
  const ids = Object.keys(S.cards).map(Number).filter(i => W[i] && W[i].m);
  const li = voiceOK() && ids.length >= 4 ? shuffle(ids).slice(0, n - tp.length).map(i => ({ type: 'listen', wid: i })) : [];
  return shuffle(tp.concat(li));
}