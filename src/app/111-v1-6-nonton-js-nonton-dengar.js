/* ========== V1.6 nonton.js — NONTON & DENGAR ==========
   Video/lagu YouTube diputar di dalam app + subtitle/lirik (.srt .vtt .lrc atau teks biasa) yang berjalan sinkron:
   per baris hanzi + pinyin (bacaan Taiwan) + arti per kata, terjemahan opsional, ulang baris, jeda tiap baris (shadowing),
   geser waktu, mode ketuk-sinkron untuk lirik tanpa waktu, dan mode suara (TTS) bila tidak ada video.
   Kamus: kamus app (arti Indonesia/Inggris/Filipino/Vietnam) → CC-CEDICT (arti Inggris) → tabel huruf Unihan.
   Data video & teks pengguna disimpan hanya di HP ini (localStorage), tidak ikut ke server. */
const NT_KEY = 'xiaobu.media', NT_OPT = 'xiaobu.media.opt';
const NT = { list: null, cur: null, yt: null, ytOk: false, timer: 0, act: -1, loopK: -1, shadowEnd: -1, userScroll: 0, tap: false, tapK: 0, play: false, toks: {}, err: '' };
NT.opt = (() => { try { return Object.assign({ py: 1, ar: 1, tr: 1, rate: 1, loop: 0, shadow: 0 }, JSON.parse(localStorage.getItem(NT_OPT) || '{}')); } catch (e) { return { py: 1, ar: 1, tr: 1, rate: 1, loop: 0, shadow: 0 }; } })();
const ntOptSave = () => { try { localStorage.setItem(NT_OPT, JSON.stringify(NT.opt)); } catch (e) {} };
function ntLoad() {
  if (NT.list) return NT.list;
  try { NT.list = JSON.parse(localStorage.getItem(NT_KEY) || '[]'); } catch (e) { NT.list = []; }
  if (!Array.isArray(NT.list)) NT.list = [];
  return NT.list;
}
function ntSave() {
  try { localStorage.setItem(NT_KEY, JSON.stringify(NT.list || [])); return true; }
  catch (e) { toast(t('Memori HP untuk app penuh. Hapus beberapa video dulu.'), 3600); return false; }
}
/* contoh bawaan: teks buatan sendiri (bukan lirik/subtitle berhak cipta), mode suara tanpa video */
const NT_DEMO = { id: 'demo', demo: 1, title: '下班以後 · Malam di pasar malam', yt: '', lines: [
  ['今天下班以後，我想去夜市。', 'Hari ini sepulang kerja, aku mau ke pasar malam.', 'After work today, I want to go to the night market.'],
  ['高雄的夜市很熱鬧，東西也不貴。', 'Pasar malam di Kaohsiung ramai, barangnya juga tidak mahal.', 'Kaohsiung night markets are lively, and things are cheap.'],
  ['我最喜歡吃臭豆腐和雞排。', 'Aku paling suka makan tahu busuk dan ayam goreng tepung.', 'I like stinky tofu and fried chicken cutlet the most.'],
  ['朋友說，他想喝珍珠奶茶。', 'Temanku bilang dia mau minum bubble tea.', 'My friend says he wants bubble tea.'],
  ['我們一邊走，一邊聊天。', 'Kami mengobrol sambil berjalan.', 'We chat while we walk.'],
  ['雖然有點累，但是很開心。', 'Walaupun agak capek, tapi senang sekali.', 'Although a bit tired, we are very happy.'],
  ['回家的時候，已經十一點了。', 'Waktu pulang, sudah jam sebelas.', 'By the time we get home, it is already eleven.'],
  ['明天還要上課，我得早點睡覺。', 'Besok masih ada kuliah, aku harus tidur lebih awal.', 'I have class tomorrow, so I have to sleep early.']
].map(([zh, id, en]) => ({ s: null, e: null, zh, tr: id, tren: en })) };
const ntItem = id => (id === 'demo' ? NT_DEMO : ntLoad().find(x => x.id === id));

/* ---------- kamus (dimuat saat menu dibuka) ---------- */
let MD = null, MD_BUSY = false, MD_WAIT = [];
function ntDict(cb) {
  if (MD) { if (cb) cb(); return; }
  if (cb) MD_WAIT.push(cb);
  if (MD_BUSY) return; MD_BUSY = true;
  const s = document.createElement('script'); s.src = 'mdict.js?v=k170'; s.async = true;
  s.onload = () => { try { ntBuildDict(); } catch (e) { console.error('mdict', e); } MD_BUSY = false; const w = MD_WAIT; MD_WAIT = []; w.forEach(f => { try { f(); } catch (e) { console.error(e); } }); };
  s.onerror = () => { MD_BUSY = false; MD_WAIT = []; s.remove(); NT.err = 'dict'; if (ROUTE === 'nonton') ntRender(); };
  document.head.appendChild(s);
}
const NT_HAN = /[㐀-鿿豈-﫿]/;
function ntBuildDict() {
  const X = window.XB_MD; if (!X) throw new Error('no XB_MD');
  const w = new Map(); X.w.split('\n').forEach(l => { const a = l.split('\t'); if (a.length === 3) w.set(a[0], [a[1], a[2]]); });
  const c = new Map(); X.c.split(' ').forEach(x => { if (!x) return; const ch = String.fromCodePoint(x.codePointAt(0)); c.set(ch, x.slice(ch.length)); });
  const k = X.s.indexOf('|'); const cm = Array.from(X.s.slice(0, k)); const s1 = new Map(); for (let i = 0; i + 1 < cm.length; i += 2) s1.set(cm[i], cm[i + 1]);
  const s2 = new Map(); X.s.slice(k + 1).split(' ').forEach(x => { const j = x.indexOf('='); if (j > 0) s2.set(x.slice(0, j), x.slice(j + 1)); });
  const tc = new Set(); w.forEach((_, key) => { for (const ch of key) tc.add(ch); });
  const aw = new Map(); const rank = x => (x.kls ? 2 : 0) + (x.semi ? 1 : 0);
  W.forEach((x, i) => {
    if (!x || !x.m) return; const f = String(x.w).replace(/[()（）]/g, '');
    if (!f || ![...f].every(ch => NT_HAN.test(ch))) return;
    if (f.length === 2 && '我你妳他她'.includes(f[0]) && f[1] !== '們') return;   // frasa 我想/你好… dipecah agar arti per kata tepat
    const o = aw.get(f); if (o === undefined || rank(x) < rank(W[o])) aw.set(f, i);
  });
  MD = { w, c, s1, s2, tc, aw }; window.XB_MD = null;
}
/* hanzi sederhana → tradisional (hanya bila teks memang sederhana) */
function ntIsSimp(s) {
  let simp = 0, han = 0;
  for (const ch of s) { if (!NT_HAN.test(ch)) continue; han++; if (MD.s1.has(ch) && !MD.tc.has(ch)) simp++; }
  return simp >= 2 || (han && simp / han > 0.05);
}
function ntToTrad(s) {
  const a = Array.from(s); let out = '';
  for (let i = 0; i < a.length;) {
    let hit = 0;
    for (let L = Math.min(6, a.length - i); L >= 2; L--) { const x = a.slice(i, i + L).join(''); if (MD.s2.has(x)) { out += MD.s2.get(x); i += L; hit = 1; break; } }
    if (hit) continue;
    out += MD.s1.get(a[i]) || a[i]; i++;
  }
  return out;
}
/* segmentasi: jumlah kata paling sedikit, kata dari kamus app diutamakan */
const NT_NUM = '零〇一二三四五六七八九十百千萬兩';
function ntNumVal(s) {
  const d = { 零: 0, 〇: 0, 一: 1, 二: 2, 兩: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 }, u = { 十: 10, 百: 100, 千: 1000 };
  let tot = 0, sec = 0, num = 0;
  for (const ch of s) {
    if (ch in d) num = d[ch];
    else if (ch in u) { sec += (num || 1) * u[ch]; num = 0; }
    else if (ch === '萬') { tot += (sec + num) * 10000; sec = 0; num = 0; }
  }
  return tot + sec + num;
}
function ntSeg(s) {
  const a = Array.from(s), n = a.length; const best = new Array(n + 1).fill(Infinity), prev = new Array(n + 1).fill(0); best[0] = 0;
  for (let i = 0; i < n; i++) {
    if (best[i] === Infinity) continue;
    for (let L = Math.min(6, n - i); L >= 1; L--) {
      const x = L === 1 ? a[i] : a.slice(i, i + L).join('');
      const inA = MD.aw.has(x), inD = MD.w.has(x);
      if (L > 1 && !inA && !inD) continue;
      const c = best[i] + 1 - (inA ? 0.01 : 0);
      if (c < best[i + L]) { best[i + L] = c; prev[i + L] = i; }
    }
    /* bilangan (十一, 二十五, 一百…) dijadikan satu kata */
    let j = i; while (j < n && NT_NUM.includes(a[j])) j++;
    if (j - i >= 2 && /[十百千萬零]/.test(a.slice(i, j).join(''))) { const c = best[i] + 0.9; if (c < best[j]) { best[j] = c; prev[j] = i; } }
  }
  const out = []; let j = n; while (j > 0) { const i = prev[j]; out.unshift(a.slice(i, j).join('')); j = i; }
  return out;
}
const NT_TM = { '̄': 1, '́': 2, '̌': 3, '̀': 4 };
function ntTone(y) { for (const ch of String(y || '').normalize('NFD')) if (NT_TM[ch]) return NT_TM[ch]; return 5; }
function ntWord(w) {
  const i = MD.aw.get(w), d = MD.w.get(w), n = Array.from(w).length;
  let py;
  if (i !== undefined && Array.isArray(W[i].y) && W[i].y.length === n) py = W[i].y.slice();
  else if (d) py = d[0].split(' ');
  else py = Array.from(w).map(ch => { const e = MD.w.get(ch); const j = MD.aw.get(ch); return j !== undefined && W[j].y && W[j].y.length === 1 ? W[j].y[0] : e ? e[0] : (MD.c.get(ch) || ''); });
  let en = d ? d[1] : '';
  if (n >= 2 && [...w].every(ch => NT_NUM.includes(ch)) && /[十百千萬零]/.test(w)) en = String(ntNumVal(w));
  return { w, py: ntSandhi(w, py), wi: i === undefined ? -1 : i, en };
}
/* sandhi di dalam kata: 不 + nada 4 → bú; 一 di awal kata (bukan bilangan/tanggal) → yí / yì */
function ntSandhi(w, py) {
  const a = Array.from(w); if (a.length < 2 || py.length !== a.length) return py;
  py = py.slice();
  for (let k = 0; k < a.length - 1; k++) {
    const nt = ntTone(py[k + 1]);
    if (a[k] === '不' && /^b[uù]$/.test(py[k].normalize('NFD').replace(/[\u0300-\u036f]/g, '')) && nt === 4) py[k] = 'bú';
    if (a[k] === '一' && k === 0 && py[0] === 'yī' && !'月號日樓年級一二三四五六七八九十百千萬零點'.includes(a[1]) && nt < 5) py[0] = nt === 4 ? 'yí' : 'yì';
  }
  return py;
}
const NT_MW = new Set(Array.from('個次下點些樣定直起般天種件本張位隻條塊句首部杯碗邊會切共半輩生口家群堆份場段片顆雙對套台臺輛間封根門架幅項層趟遍陣聲刻眼步秒分年'));
const NT_DEG = new Set(['很', '太', '好', '多', '真', '更', '最', '比較', '這麼', '那麼', '不', '越', '超', '蠻', '挺', '夠', '特別', '非常', '有點']);
const NT_PRON = new Set(Array.from('我你妳他她它您們咱誰就還也都'));
/* aturan konteks: sandhi 不/一, dan huruf polifon yang sering muncul sendiri */
function ntContext(tk) {
  const H = tk.map((x, k) => (x.han ? k : -1)).filter(k => k >= 0);
  H.forEach((k, h) => {
    const x = tk[k], nx = h + 1 < H.length && H[h + 1] === k + 1 ? tk[k + 1] : null, pv = h > 0 && H[h - 1] === k - 1 ? tk[k - 1] : null;
    if (x.wi >= 0 && x.w.length > 1) return;
    if (x.w === '不' && nx) x.py = [ntTone(nx.py[0]) === 4 ? 'bú' : 'bù'];
    else if (x.w === '一' && nx && NT_MW.has(Array.from(nx.w)[0]) && !(pv && /[第十百千萬零〇一二三四五六七八九兩]$/.test(pv.w))) x.py = [ntTone(nx.py[0]) === 4 ? 'yí' : 'yì'];
    else if (x.w === '得' && nx) { const de = pv && !NT_PRON.has(pv.w); x.py = [de ? 'de' : 'děi']; x.cm = de ? ['(penghubung hasil/derajat)', '(complement marker)'] : ['harus', 'must']; }
    else if (x.w === '長' && pv && NT_DEG.has(pv.w)) { x.py = ['cháng']; x.cm = ['panjang', 'long']; }
  });
  return tk;
}
function ntTokens(zh) {
  const out = []; let buf = '';
  const flush = () => { if (buf) { out.push({ han: false, w: buf }); buf = ''; } };
  const parts = String(zh).match(/[㐀-鿿豈-﫿]+|[^㐀-鿿豈-﫿]+/g) || [];
  parts.forEach(p => {
    if (!NT_HAN.test(p)) { buf += p; return; }
    flush(); ntSeg(p).forEach(w => out.push(Object.assign({ han: true }, ntWord(w))));
  });
  flush();
  return ntContext(out);
}
const ntLineToks = (it, k) => { const key = it.id + ':' + k; return NT.toks[key] || (NT.toks[key] = ntTokens(it.lines[k].zh)); };
const ntCM = x => (x.cm ? (S.settings.primary === 'id' ? x.cm[0] : x.cm[1]) : '');
const ntMeanShort = x => {
  if (x.cm) return { m: ntCM(x), app: 1 };
  if (x.wi >= 0) { const m = wMean(W[x.wi]); if (m) return { m: m.split(/[;；,，/(（]/)[0].trim().slice(0, 18) || m.slice(0, 18), app: 1 }; }
  return x.en ? { m: x.en.split(/[;(]/)[0].trim().slice(0, 18), app: 0 } : { m: '', app: 0 };
};

/* ---------- membaca subtitle / lirik ---------- */
function ntTime(s) {
  const m = String(s || '').trim().split(/\s+/)[0].replace(',', '.').split(':').map(Number);
  if (m.some(isNaN)) return NaN;
  return m.length === 3 ? m[0] * 3600 + m[1] * 60 + m[2] : m.length === 2 ? m[0] * 60 + m[1] : m[0];
}
const ntClean = s => String(s).replace(/<[^>]*>/g, '').replace(/\{\\[^}]*\}/g, '').replace(/[♪♫]/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
function ntParse(txt) {
  txt = String(txt || '').replace(/^﻿/, '').replace(/\r\n?/g, '\n');
  const cues = [];
  const lrcRe = /\[(\d{1,3}):(\d{1,2}(?:[.:]\d{1,3})?)\]/g;
  if (/\[\d{1,3}:\d{1,2}(?:[.:]\d{1,3})?\]/.test(txt)) {
    txt.split('\n').forEach(l => {
      const ts = []; let m, last = 0; lrcRe.lastIndex = 0;
      while ((m = lrcRe.exec(l))) { ts.push(+m[1] * 60 + parseFloat(m[2].replace(':', '.'))); last = lrcRe.lastIndex; }
      const body = ntClean(l.slice(last).replace(/<\d{1,3}:\d{1,2}(?:[.:]\d{1,3})?>/g, ''));
      if (!ts.length || !body) return;
      ts.forEach(s => cues.push({ s, e: null, raw: body }));
    });
    cues.sort((a, b) => a.s - b.s);
    cues.forEach((c, k) => (c.e = cues[k + 1] ? cues[k + 1].s : c.s + 6));
    return { cues, kind: 'LRC' };
  }
  if (/\d{1,2}:\d{2}(?::\d{2})?[,.]\d{1,3}\s*-->/.test(txt)) {
    txt.split(/\n[ \t]*\n/).forEach(b => {
      const ls = b.split('\n'); const k = ls.findIndex(l => l.includes('-->')); if (k < 0) return;
      const [a, z] = ls[k].split('-->'); const s = ntTime(a), e = ntTime(z);
      const body = ls.slice(k + 1).map(ntClean).filter(Boolean).join('\n');
      if (isNaN(s) || !body) return;
      cues.push({ s, e: isNaN(e) ? s + 4 : e, raw: body });
    });
    cues.sort((a, b) => a.s - b.s);
    return { cues, kind: /WEBVTT/.test(txt.slice(0, 20)) ? 'VTT' : 'SRT' };
  }
  txt.split('\n').map(ntClean).filter(Boolean).forEach(l => cues.push({ s: null, e: null, raw: l }));
  return { cues, kind: 'TXT' };
}
/* gabungkan subtitle Mandarin (+ baris terjemahan di dalamnya) dengan file terjemahan opsional */
function ntBuildLines(zhTxt, trTxt) {
  const P = ntParse(zhTxt); const conv = { n: 0 };
  let lines = [];
  P.cues.forEach(c => {
    const ls = c.raw.split('\n'); const zh = ls.filter(l => NT_HAN.test(l)).join(' ').trim(); const tr = ls.filter(l => !NT_HAN.test(l) && /[A-Za-zÀ-ỹ]/.test(l)).join(' ').trim();
    if (!zh) return;
    lines.push({ s: c.s, e: c.e, zh, tr });
  });
  if (MD && lines.length && ntIsSimp(lines.map(l => l.zh).join(''))) { lines.forEach(l => (l.zh = ntToTrad(l.zh))); conv.n = 1; }
  if (trTxt && String(trTxt).trim()) {
    const T = ntParse(trTxt).cues.filter(c => /[A-Za-zÀ-ỹ]/.test(c.raw));
    const timed = lines.length && lines[0].s != null && T.length && T[0].s != null;
    lines.forEach((l, k) => {
      let best = null;
      if (timed) { let bo = 0; T.forEach(c => { const o = Math.min(l.e, c.e) - Math.max(l.s, c.s); if (o > bo) { bo = o; best = c; } }); }
      else best = T[k];
      if (best) l.tr = best.raw.replace(/\n/g, ' ');
    });
  }
  return { lines, kind: P.kind, conv: conv.n };
}
function ntYtId(u) {
  u = String(u || '').trim(); if (/^[\w-]{11}$/.test(u)) return u;
  const m = u.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/); return m ? m[1] : '';
}
const ntFmt = s => (s == null || isNaN(s) ? '' : Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0'));
const ntTimed = it => it.lines.length > 0 && it.lines.every(l => l.s != null);

/* ---------- tampilan ---------- */
function vNonton() {
  setTimeout(ntMount, 0);
  if (NT.err === 'dict') return `<section class="card glass" style="text-align:center">${TILE('warn', 'lg tint c3')}<h2>${t('Kamus belum bisa dimuat')}</h2><p class="muted small">${t('Menu ini perlu internet sekali untuk mengunduh kamus (±2 MB). Setelah itu bisa dipakai offline.')}</p><button class="btn" data-a="ntretry">${ICON('refresh')} ${t('Coba lagi')}</button></section>`;
  if (!MD) { ntDict(() => { if (ROUTE === 'nonton') ntRender(); }); return `<section class="card glass" style="text-align:center;padding:40px 20px">${TILE('play', 'lg tint c5')}<h2>${t('Menyiapkan kamus…')}</h2><p class="muted small">${t('Hanya sekali, setelah itu langsung terbuka.')}</p></section>`; }
  const it = NT.cur && ntItem(NT.cur);
  return it ? ntPlayerHTML(it) : ntLibHTML();
}
function ntLibHTML() {
  const L = ntLoad();
  const row = (it, demo) => `<div class="nt-item glass">${TILE(it.yt ? 'play' : 'speaker', 'tint ' + (it.yt ? 'c5' : 'c2'))}
    <button class="nt-open grow" data-a="ntopen" data-v="${esc(it.id)}"><b class="hz">${esc(it.title)}</b><span class="small muted">${it.lines.length} ${t('baris')} · ${it.yt ? (ntTimed(it) ? t('video + teks sinkron') : t('video · waktu belum diatur')) : t('teks + suara')}${demo ? ' · ' + t('contoh') : ''}</span></button>
    ${demo ? '' : `<button class="ibtn" data-a="ntdel" data-v="${esc(it.id)}" aria-label="${t('Hapus')}">${ICON('trash')}</button>`}</div>`;
  return `<section class="card glass b1-hhero" style="--tc:var(--c5)"><div class="row" style="gap:14px;align-items:flex-start">${TILE('play', 'lg tint c5')}<div class="grow" style="min-width:0"><h1 style="margin:0">${t('Nonton & Dengar')}</h1>
      <p class="muted small" style="margin:6px 0 0">${t('Tonton video atau dengar lagu Mandarin dari YouTube langsung di app. Teksnya berjalan mengikuti video, lengkap dengan pinyin bacaan Taiwan dan arti setiap kata. Ketuk kata untuk detail & simpan ke kartu hafalan.')}</p></div></div>
      <div class="row wrap" style="gap:8px;margin-top:14px"><button class="btn" data-a="ntadd">${ICON('plus')} ${t('Tambah video / lagu')}</button></div></section>
    <section class="card glass"><h2 style="margin-top:0">${t('Koleksiku')}</h2>
      <div class="nt-list">${L.slice().sort((a, b) => (b.at || 0) - (a.at || 0)).map(x => row(x)).join('')}${row(NT_DEMO, 1)}</div>
      ${L.length ? '' : `<p class="small muted" style="margin:10px 0 0">${t('Belum ada video. Tekan "Tambah video / lagu" untuk mulai, atau coba contoh di atas.')}</p>`}</section>
    <section class="card glass"><h2 style="margin-top:0">${t('Cara pakai')}</h2><ol class="nt-how small">
      <li>${t('Salin link video YouTube (MV lagu, drama, vlog, video kuliah).')}</li>
      <li>${t('Tempel teks Mandarinnya: file subtitle .srt / .vtt, lirik .lrc, atau teks biasa per baris. Bisa juga pilih file dari HP.')}</li>
      <li>${t('Kalau teksnya tidak punya waktu, putar videonya lalu pakai "Ketuk-sinkron": ketuk tombol setiap baris mulai dinyanyikan.')}</li>
      <li>${t('Hanzi sederhana otomatis diubah ke hanzi tradisional Taiwan. Terjemahan (Indonesia/Inggris) boleh ditambahkan.')}</li></ol>
      <p class="tiny muted" style="margin:8px 0 0">${t('Teks dan link hanya disimpan di HP ini. Kamus: kamus Xiǎobù + CC-CEDICT (CC BY-SA 3.0) + Unihan.')}</p></section>`;
}
function ntUIHTML(it) {
  const timed = ntTimed(it), vid = !!it.yt, o = NT.opt;
  const chip = (a, on, ic, lb, v = '') => `<button class="chip ${on ? 'on' : ''}" data-a="${a}" ${v !== '' ? `data-v="${v}"` : ''} aria-pressed="${!!on}">${ic ? ICON(ic) + ' ' : ''}${t(lb)}</button>`;
  const ctl = [
    chip('ntrate', o.rate !== 1, 'slow', o.rate === 1 ? 'Kecepatan 1×' : 'Kecepatan ' + o.rate + '×'),
    vid && timed ? chip('ntloop', o.loop, 'refresh', 'Ulang baris') : '',
    vid && timed ? chip('ntshadow', o.shadow, 'mic', 'Jeda tiap baris') : '',
    chip('nttog', o.py, '', 'Pinyin', 'py'), chip('nttog', o.ar, '', 'Arti kata', 'ar'), chip('nttog', o.tr, '', 'Terjemahan', 'tr'),
    !vid || !timed ? `<button class="chip ${NT.play ? 'on' : ''}" data-a="ntplayall">${ICON(NT.play ? 'pause' : 'play')} ${t(NT.play ? 'Berhenti' : 'Putar semua (suara app)')}</button>` : ''
  ].join('');
  const sync = vid ? `<div class="nt-sync row wrap">${timed ? `<span class="small muted">${t('Teks terlalu cepat/lambat?')}</span><button class="chip" data-a="ntoff" data-v="-0.5">−0.5 s</button><span class="chip nt-offv">${(it.off || 0) > 0 ? '+' : ''}${(it.off || 0).toFixed(1)} s</span><button class="chip" data-a="ntoff" data-v="0.5">+0.5 s</button>` : ''}
      <button class="chip ${NT.tap ? 'on' : ''}" data-a="nttap">${ICON('clock')} ${t(NT.tap ? 'Selesai ketuk-sinkron' : timed ? 'Atur ulang waktu (ketuk-sinkron)' : 'Ketuk-sinkron')}</button></div>` : '';
  return `<div class="nt-ctl row wrap">${ctl}</div>${sync}
    ${NT.tap ? `<div class="nt-tapbar glass"><div class="small"><b>${t('Ketuk-sinkron')}</b> · ${t('putar video, lalu ketuk tombol tepat saat baris ini mulai:')}</div><div class="hz nt-tapnext" id="nt-tapnext">${esc((it.lines[NT.tapK] || {}).zh || t('Semua baris sudah diberi waktu ✓'))}</div>
      <div class="row" style="gap:8px"><button class="btn" id="nt-tapbtn">${ICON('check')} ${t('Baris ini mulai')}</button><button class="btn sec" data-a="ntundo">${ICON('undo')} ${t('Mundur 1')}</button></div></div>` : ''}`;
}
function ntUI() { const it = ntItem(NT.cur), box = document.getElementById('nt-ui'); if (!it || !box) return; box.innerHTML = ntUIHTML(it); ntBindTap(); }
function ntBindTap() { const b = document.getElementById('nt-tapbtn'); if (b && !b._nt) { b._nt = 1; b.addEventListener('pointerdown', ev => { ev.preventDefault(); ntTapMark(); }); } }
function ntPlayerHTML(it) {
  const timed = ntTimed(it), vid = !!it.yt, o = NT.opt;
  const cls = ['nt-wrap', o.py ? '' : 'no-py', o.ar ? '' : 'no-ar', o.tr ? '' : 'no-tr'].join(' ');
  const lines = it.lines.map((l, k) => {
    const tk = ntLineToks(it, k);
    const ws = tk.map((x, j) => {
      if (!x.han) return `<span class="nt-p">${esc(x.w)}</span>`;
      const ms = ntMeanShort(x);
      return `<span class="nt-w ${x.wi >= 0 ? 'kn' : ''}" data-a="ntword" data-v="${k}:${j}"><i class="nt-py">${esc(x.py.join(' '))}</i><b class="hz">${esc(x.w)}</b><small class="nt-ar ${ms.app ? '' : 'en'}">${esc(ms.m) || '&nbsp;'}</small></span>`;
    }).join('');
    const tr = (S.settings.primary === 'en' && l.tren) ? l.tren : l.tr;
    return `<div class="nt-ln" id="ntl${k}" data-k="${k}"><button class="nt-t" data-a="ntseek" data-v="${k}" aria-label="${t('Putar baris ini')}">${vid && l.s != null ? ntFmt(l.s + (it.off || 0)) : ICON('play')}</button>
      <div class="nt-body"><div class="nt-tx">${ws}</div>${tr ? `<div class="nt-tr">${esc(tr)}</div>` : ''}</div></div>`;
  }).join('');
  return `<section class="card glass nt-head"><div class="row" style="gap:10px;align-items:center"><button class="ibtn" data-a="ntback" aria-label="${t('Kembali')}">${ICON('chevron', 'nt-back')}</button>
      <div class="grow" style="min-width:0"><b class="hz nt-title">${esc(it.title)}</b><div class="tiny muted">${it.lines.length} ${t('baris')}${it.conv ? ' · ' + t('diubah ke hanzi tradisional') : ''}</div></div></div></section>
    ${vid ? `<div class="nt-vid"><div class="nt-ratio"><div id="nt-yt"></div></div><div class="nt-verr" id="nt-verr" hidden></div></div>` : ''}
    <div id="nt-ui">${ntUIHTML(it)}</div>
    <section class="nt-lines ${cls}" id="nt-lines">${lines}</section>`;
}
function ntRender() { if (ROUTE !== 'nonton') return; ntRenderBase(); }

/* ---------- pemutar YouTube ---------- */
function ntYT(cb) {
  if (window.YT && YT.Player) { cb(); return; }
  (NT.ytq = NT.ytq || []).push(cb);
  if (NT.ytl) return; NT.ytl = 1;
  const prev = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = function () { try { if (prev) prev(); } catch (e) {} const q = NT.ytq || []; NT.ytq = []; q.forEach(f => { try { f(); } catch (e) { console.error(e); } }); };
  const s = document.createElement('script'); s.src = 'https://www.youtube.com/iframe_api';
  s.onerror = () => { NT.ytl = 0; s.remove(); ntVidErr(t('YouTube tidak bisa dimuat. Cek koneksi internet, lalu buka lagi.')); };
  document.head.appendChild(s);
}
function ntVidErr(msg) { const e = document.getElementById('nt-verr'); if (e) { e.hidden = false; e.textContent = msg; } }
function ntMount() {
  if (ROUTE !== 'nonton') return;
  ntScrollWatch();
  const it = NT.cur && ntItem(NT.cur); const host = document.getElementById('nt-yt');
  ntBindTap();
  if (!it || !it.yt || !host || NT.yt) { ntHi(NT.act, true); return; }
  ntYT(() => {
    if (!document.getElementById('nt-yt') || NT.yt) return;
    NT.ytOk = false;
    NT.yt = new YT.Player('nt-yt', {
      videoId: it.yt, width: '100%', height: '100%',
      playerVars: { playsinline: 1, rel: 0, modestbranding: 1, cc_load_policy: 0, iv_load_policy: 3, start: Math.floor(it.last || 0) },
      events: {
        onReady: () => { NT.ytOk = true; try { NT.yt.setPlaybackRate(NT.opt.rate); } catch (e) {} ntTick(); },
        onError: ev => { const c = ev && ev.data; ntVidErr(c === 101 || c === 150 ? t('Pemilik video ini tidak mengizinkan diputar di app lain. Coba cari versi lain (misalnya video lirik dari channel lain). Teksnya tetap bisa dipakai dengan suara app.') : c === 100 ? t('Video tidak ditemukan atau sudah dihapus.') : t('Video tidak bisa diputar. Cek link-nya.')); },
        onStateChange: ev => { if (ev.data === 1) ntTick(); }
      }
    });
  });
}
function ntStop() {
  clearInterval(NT.timer); NT.timer = 0;
  const it = NT.cur && ntItem(NT.cur);
  if (NT.yt) { try { if (it && !it.demo && NT.ytOk) { it.last = NT.yt.getCurrentTime() || 0; ntSave(); } } catch (e) {} try { NT.yt.destroy(); } catch (e) {} NT.yt = null; NT.ytOk = false; }
  ntTtsStop();
}
function ntTick() {
  if (NT.timer) return;
  NT.timer = setInterval(() => {
    if (ROUTE !== 'nonton' || !NT.yt || !NT.ytOk) { if (!NT.yt) { clearInterval(NT.timer); NT.timer = 0; } return; }
    const it = ntItem(NT.cur); if (!it || !ntTimed(it)) return;
    let tm = 0; try { tm = NT.yt.getCurrentTime(); } catch (e) { return; }
    const off = it.off || 0, L = it.lines;
    if (NT.opt.loop && NT.loopK >= 0 && L[NT.loopK]) { const l = L[NT.loopK]; if (tm >= l.e + off - 0.05 || tm < l.s + off - 1.5) { NT.yt.seekTo(Math.max(0, l.s + off), true); return; } }
    let k = -1; for (let i = 0; i < L.length; i++) { if (L[i].s + off <= tm + 0.05) k = i; else break; }
    if (k >= 0 && tm > L[k].e + off + 0.4 && (!L[k + 1] || L[k + 1].s + off > tm)) k = -1;
    if (NT.opt.shadow && NT.shadowEnd >= 0 && L[NT.shadowEnd] && tm >= L[NT.shadowEnd].e + off - 0.08) { const st = NT.yt.getPlayerState(); if (st === 1) { NT.yt.pauseVideo(); toast(t('Giliranmu: ucapkan baris ini, lalu tekan ▶'), 1800, 'ntsh'); } NT.shadowEnd = -1; }
    if (k !== NT.act) { NT.act = k; ntHi(k); if (NT.opt.shadow && k >= 0) NT.shadowEnd = k; }
  }, 120);
}
function ntHi(k, instant) {
  document.querySelectorAll('.nt-ln.on').forEach(e => e.classList.remove('on'));
  if (k < 0) return; const el = document.getElementById('ntl' + k); if (!el) return;
  el.classList.add('on');
  if (Date.now() - NT.userScroll > 3500) { try { el.scrollIntoView({ block: 'center', behavior: instant ? 'auto' : 'smooth' }); } catch (e) {} }
}
function ntScrollWatch() {
  if (NT.sw) return; NT.sw = 1;
  const f = () => { NT.userScroll = Date.now(); };
  window.addEventListener('wheel', f, { passive: true }); window.addEventListener('touchmove', f, { passive: true });
}
/* ketuk-sinkron: memberi waktu pada lirik tanpa timestamp */
function ntTapMark() {
  const it = ntItem(NT.cur); if (!it || it.demo || !NT.yt || !NT.ytOk) { toast(t('Putar videonya dulu.')); return; }
  if (NT.tapK >= it.lines.length) return;
  const tm = Math.max(0, (NT.yt.getCurrentTime() || 0) - 0.15);
  if (NT.tapK > 0) { const p = it.lines[NT.tapK - 1]; if (p.s != null && tm <= p.s) { toast(t('Waktunya harus setelah baris sebelumnya.')); return; } p.e = tm; }
  const l = it.lines[NT.tapK]; l.s = tm; l.e = tm + 6; NT.tapK++;
  const nx = document.getElementById('nt-tapnext'); if (nx) nx.textContent = (it.lines[NT.tapK] || {}).zh || t('Semua baris sudah diberi waktu ✓');
  const tb = document.querySelector('#ntl' + (NT.tapK - 1) + ' .nt-t'); if (tb) tb.textContent = ntFmt(tm);
  ntHi(NT.tapK - 1);
  if (NT.tapK >= it.lines.length) { it.off = 0; NT.tap = false; ntSave(); ntUI(); ntTick(); toast(t('Selesai! Teks sekarang berjalan mengikuti video.'), 2600); }
}
/* mode suara: baca baris dengan suara app (suara pack pilihanmu) */
function ntTtsStop() { NT.play = false; clearTimeout(NT.tt); try { speechSynthesis.cancel(); } catch (e) {} try { TTS.stop(); } catch (e) {} }
function ntSpeakLine(it, k, then) {
  const l = it.lines[k]; if (!l) { if (then) then(false); return; }
  NT.act = k; ntHi(k);
  const txt = l.zh.replace(/[^\u3400-\u9fff\uf900-\ufaff，。？！、,.?!\s]/g, '').trim();
  let done = false; const fin = () => { if (done) return; done = true; clearTimeout(NT.tt); if (then && NT.play) NT.tt = setTimeout(() => then(true), 450); };
  try {
    TTS.stop();
    const u = new SpeechSynthesisUtterance(txt);
    u.lang = TTS.voice ? TTS.voice.lang : 'zh-TW'; if (TTS.voice) u.voice = TTS.voice;
    u.rate = (S.settings.rate || 0.9) * NT.opt.rate; u.onend = u.onerror = fin; NT.u = u;
    if (speechSynthesis.paused) speechSynthesis.resume();
    speechSynthesis.speak(u);
  } catch (e) { fin(); return; }
  if (then) NT.tt = setTimeout(fin, 2500 + txt.length * 450 / NT.opt.rate);
}
/* ---------- aksi ---------- */
function ntAddForm() {
  openModal(`<div class="q-kind">${ICON('plus')} ${t('Nonton & Dengar')}</div><h2 style="margin:6px 0 12px">${t('Tambah video / lagu')}</h2>
    <label class="nt-f"><span>${t('Judul')}</span><input id="ntTitle" class="inp" maxlength="80" placeholder="${t('mis. 告白氣球 – 周杰倫')}"></label>
    <label class="nt-f"><span>${t('Link YouTube')} <i class="muted">(${t('boleh kosong = mode suara')})</i></span><input id="ntUrl" class="inp" inputmode="url" placeholder="https://youtu.be/…"></label>
    <label class="nt-f"><span>${t('Teks Mandarin: subtitle .srt / .vtt, lirik .lrc, atau teks biasa')}</span><textarea id="ntZh" class="inp" rows="7" placeholder="1&#10;00:00:12,500 --> 00:00:15,000&#10;我們一起去吧&#10;&#10;${t('atau')} [00:12.50]我們一起去吧"></textarea>
      <input type="file" id="ntZhF" accept=".srt,.vtt,.lrc,.txt,text/plain" class="nt-file"></label>
    <label class="nt-f"><span>${t('Terjemahan (opsional): file/teks bahasa Indonesia atau Inggris')}</span><textarea id="ntTr" class="inp" rows="3"></textarea>
      <input type="file" id="ntTrF" accept=".srt,.vtt,.lrc,.txt,text/plain" class="nt-file"></label>
    <div id="ntPrev" class="small muted" style="min-height:20px;margin:6px 0 10px"></div>
    <div class="row" style="gap:8px;justify-content:flex-end"><button class="btn sec" data-a="close">${t('Batal')}</button><button class="btn" data-a="ntaddsave">${ICON('check')} ${t('Simpan')}</button></div>`);
  const rd = (fi, ta) => { const f = document.getElementById(fi); if (!f) return; f.addEventListener('change', () => { const x = f.files && f.files[0]; if (!x) return; if (x.size > 2e6) { toast(t('File terlalu besar.')); return; } const r = new FileReader(); r.onload = () => { document.getElementById(ta).value = String(r.result || ''); prev(); const ti = document.getElementById('ntTitle'); if (ti && !ti.value) ti.value = x.name.replace(/\.[^.]+$/, ''); }; r.readAsText(x); }); };
  const prev = () => { const z = document.getElementById('ntZh'), p = document.getElementById('ntPrev'); if (!z || !p) return; if (!z.value.trim()) { p.textContent = ''; return; } const B = ntBuildLines(z.value, document.getElementById('ntTr').value); p.textContent = B.lines.length ? `${t('Terbaca')}: ${B.lines.length} ${t('baris')} · ${B.kind === 'TXT' ? t('tanpa waktu') : B.kind}${B.conv ? ' · ' + t('hanzi sederhana → tradisional') : ''}` : t('Belum ada baris Mandarin yang terbaca.'); };
  rd('ntZhF', 'ntZh'); rd('ntTrF', 'ntTr');
  ['ntZh', 'ntTr'].forEach(id => { const e = document.getElementById(id); if (e) e.addEventListener('input', () => { clearTimeout(NT.pv); NT.pv = setTimeout(prev, 300); }); });
}
Object.assign(ACT, {
  ntretry: () => { NT.err = ''; ntRender(); },
  ntadd: () => ntAddForm(),
  ntaddsave: () => {
    const title = (document.getElementById('ntTitle').value || '').trim(), url = (document.getElementById('ntUrl').value || '').trim();
    const yt = ntYtId(url);
    if (url && !yt) { toast(t('Link YouTube tidak dikenali. Contoh: https://youtu.be/xxxxxxxxxxx')); return; }
    const B = ntBuildLines(document.getElementById('ntZh').value, document.getElementById('ntTr').value);
    if (!B.lines.length) { toast(t('Belum ada baris Mandarin yang terbaca.')); return; }
    if (B.lines.length > 1500) { toast(t('Teks terlalu panjang (maks. 1500 baris).')); return; }
    const it = { id: 'm' + Date.now().toString(36), title: title || (B.lines[0].zh.slice(0, 20)), yt, lines: B.lines.map(l => ({ s: l.s, e: l.e, zh: l.zh, tr: l.tr || '' })), at: Date.now(), conv: B.conv, off: 0 };
    ntLoad().push(it);
    if (!ntSave()) { NT.list.pop(); return; }
    closeModal(); NT.cur = it.id; NT.act = -1; NT.tap = !!(yt && !ntTimed(it)); NT.tapK = 0; ntRender();
    if (NT.tap) toast(t('Teks belum punya waktu. Putar video lalu ketuk tombol setiap baris mulai.'), 3600);
  },
  ntopen: b => { ntStop(); NT.cur = b.dataset.v; NT.act = -1; NT.loopK = -1; NT.tap = false; const it = ntItem(NT.cur); if (it && !it.demo) { it.at = Date.now(); ntSave(); } ntRender(); window.scrollTo(0, 0); },
  ntback: () => { ntStop(); NT.cur = null; NT.tap = false; ntRender(); },
  ntdel: b => {
    const it = ntItem(b.dataset.v); if (!it) return;
    openModal(`<h2 style="margin-top:0">${t('Hapus dari koleksi?')}</h2><p class="hz">${esc(it.title)}</p><p class="small muted">${t('Teks dan pengaturan waktunya akan hilang dari HP ini.')}</p><div class="row" style="gap:8px;justify-content:flex-end"><button class="btn sec" data-a="close">${t('Batal')}</button><button class="btn" data-a="ntdelok" data-v="${esc(it.id)}">${ICON('trash')} ${t('Hapus')}</button></div>`);
  },
  ntdelok: b => { NT.list = ntLoad().filter(x => x.id !== b.dataset.v); ntSave(); closeModal(); ntRender(); },
  ntseek: b => {
    const it = ntItem(NT.cur); const k = +b.dataset.v; const l = it && it.lines[k]; if (!l) return;
    if (it.yt && NT.yt && NT.ytOk && l.s != null) { NT.loopK = k; NT.shadowEnd = NT.opt.shadow ? k : -1; NT.yt.seekTo(Math.max(0, l.s + (it.off || 0)), true); NT.yt.playVideo(); NT.act = k; ntHi(k); return; }
    ntTtsStop(); ntSpeakLine(it, k);
  },
  ntplayall: () => {
    const it = ntItem(NT.cur); if (!it) return;
    if (NT.play) { ntTtsStop(); ntUI(); return; }
    NT.play = true; ntUI();
    let k = Math.max(0, NT.act >= 0 && NT.act < it.lines.length - 1 ? NT.act : 0);
    const nx = ok => { if (!NT.play || !ok) return; k++; if (k >= it.lines.length) { NT.play = false; ntUI(); return; } ntSpeakLine(it, k, nx); };
    ntSpeakLine(it, k, nx);
  },
  nttog: b => { const k = b.dataset.v; NT.opt[k] = NT.opt[k] ? 0 : 1; ntOptSave(); const box = document.getElementById('nt-lines'); if (box) box.classList.toggle('no-' + k, !NT.opt[k]); b.classList.toggle('on', !!NT.opt[k]); b.setAttribute('aria-pressed', !!NT.opt[k]); },
  ntrate: b => {
    const R = [1, 0.75, 0.5]; NT.opt.rate = R[(R.indexOf(NT.opt.rate) + 1) % R.length]; ntOptSave();
    try { if (NT.yt && NT.ytOk) NT.yt.setPlaybackRate(NT.opt.rate); } catch (e) {}
    b.classList.toggle('on', NT.opt.rate !== 1); b.innerHTML = ICON('slow') + ' ' + esc(t(NT.opt.rate === 1 ? 'Kecepatan 1×' : 'Kecepatan ' + NT.opt.rate + '×'));
  },
  ntloop: b => { NT.opt.loop = NT.opt.loop ? 0 : 1; ntOptSave(); NT.loopK = NT.opt.loop ? NT.act : -1; b.classList.toggle('on', !!NT.opt.loop); if (NT.opt.loop) toast(t('Baris yang sedang diputar akan diulang terus. Ketuk baris lain untuk pindah.'), 2600); },
  ntshadow: b => { NT.opt.shadow = NT.opt.shadow ? 0 : 1; ntOptSave(); NT.shadowEnd = NT.opt.shadow ? NT.act : -1; b.classList.toggle('on', !!NT.opt.shadow); if (NT.opt.shadow) toast(t('Video berhenti di akhir setiap baris supaya kamu bisa menirukan.'), 2600); },
  ntoff: b => { const it = ntItem(NT.cur); if (!it || it.demo) return; it.off = Math.round(((it.off || 0) + +b.dataset.v) * 10) / 10; ntSave(); const v = document.querySelector('.nt-offv'); if (v) v.textContent = (it.off > 0 ? '+' : '') + it.off.toFixed(1) + ' s'; },
  nttap: () => { const it = ntItem(NT.cur); if (!it) return; if (NT.tap) { NT.tap = false; ntSave(); ntUI(); return; } NT.tap = true; NT.tapK = 0; NT.opt.loop = 0; NT.opt.shadow = 0; ntUI(); toast(t('Putar video, lalu ketuk "Baris ini mulai" setiap baris dimulai.'), 3000); },
  ntundo: () => { const it = ntItem(NT.cur); if (!it || NT.tapK <= 0) return; NT.tapK--; const l = it.lines[NT.tapK]; const tm = l.s; l.s = null; l.e = null; const nx = document.getElementById('nt-tapnext'); if (nx) nx.textContent = l.zh; try { if (NT.yt && tm != null) NT.yt.seekTo(Math.max(0, tm - 2), true); } catch (e) {} const tb = document.querySelector('#ntl' + NT.tapK + ' .nt-t'); if (tb) tb.innerHTML = ICON('play'); },
  ntword: b => {
    const it = ntItem(NT.cur); if (!it) return; const [k, j] = b.dataset.v.split(':').map(Number); const x = ntLineToks(it, k)[j]; if (!x) return;
    try { if (NT.yt && NT.ytOk && NT.yt.getPlayerState() === 1) { NT.yt.pauseVideo(); NT.wasPlay = 1; } else NT.wasPlay = 0; } catch (e) {}
    const w = x.wi >= 0 ? W[x.wi] : null; const has = w && S.cards[x.wi];
    const parts = Array.from(x.w).length > 1 ? Array.from(x.w).map(ch => { const y = ntWord(ch); const j2 = MD.aw.get(ch); return `<span class="nt-ch"><b class="hz">${esc(ch)}</b><i>${esc(y.py[0] || '')}</i><small>${esc(j2 !== undefined ? (wMean(W[j2]) || '').split(/[;,]/)[0] : (y.en || '').split(/[;(]/)[0])}</small></span>`; }).join('') : '';
    openModal(`<div class="q-kind">${ICON('book')} ${t('Kata dari video')}</div>
      <div class="nt-pop"><div class="hz nt-big">${esc(x.w)}</div><div class="nt-bigpy">${esc(x.py.join(' '))}</div>
      ${x.cm ? `<div class="nt-m"><b>${esc(ntCM(x))}</b> <span class="tiny muted">${t('arti di kalimat ini')}</span></div>` : ''}
      ${w ? `<div class="nt-m"><b>${esc(wMean(W[x.wi]))}</b>${w.l != null && LEVELS[w.l] ? ` <span class="chip tiny">${esc(LEVELS[w.l].en)}</span>` : ''}</div>` : ''}
      ${x.en && (!w || S.settings.primary !== 'en') ? `<div class="nt-m en"><span class="tiny muted">EN</span> ${esc(x.en)}</div>` : ''}
      ${!w && !x.en ? `<div class="small muted">${t('Kata ini belum ada di kamus.')}</div>` : ''}
      ${parts ? `<div class="nt-chs">${parts}</div>` : ''}</div>
      <div class="row wrap" style="gap:8px;margin-top:14px"><button class="btn sec" data-a="ntsay" data-v="${esc(x.w)}">${ICON('speaker')} ${t('Dengar')}</button>
      ${w ? (has ? `<span class="chip on">${ICON('check')} ${t('Sudah di kartu hafalan')}</span>` : `<button class="btn" data-a="ntcard" data-v="${x.wi}">${ICON('plus')} ${t('Simpan ke kartu hafalan')}</button>`) : `<span class="small muted">${t('Hanya kata yang ada di kamus Xiǎobù yang bisa masuk kartu hafalan.')}</span>`}
      <button class="btn sec" data-a="ntclose">${t('Tutup')}</button></div>`);
  },
  ntsay: b => { try { TTS.speak(b.dataset.v); } catch (e) {} },
  ntcard: b => { const i = +b.dataset.v; if (!W[i]) return; introduce(i); save(); toast(t('Masuk kartu hafalan ✓ Akan muncul di review.')); b.outerHTML = `<span class="chip on">${ICON('check')} ${t('Sudah di kartu hafalan')}</span>`; },
  ntclose: () => { closeModal(); try { if (NT.wasPlay && NT.yt && NT.ytOk) NT.yt.playVideo(); } catch (e) {} NT.wasPlay = 0; }
});

/* render: jangan membangun ulang halaman saat video sedang terpasang (iframe akan termuat ulang) */
const ntRenderBase = render;
render = function () {
  const here = (location.hash.slice(1) || 'home') === 'nonton';
  if (!here && (NT.yt || NT.play)) ntStop();
  if (here && NT.yt && document.getElementById('nt-yt')) return;
  return ntRenderBase.apply(this, arguments);
};
XVIEWS.nonton = vNonton;
if (!ROUTES.some(r => r[0] === 'nonton')) { const k = ROUTES.findIndex(r => r[0] === 'conv'); ROUTES.splice(k >= 0 ? k + 1 : 2, 0, ['nonton', 'play', 'Nonton & Dengar']); }
Object.assign(TAB_SHORT, { nonton: 'Nonton' });
Object.assign(ROUTE_DESC, { nonton: 'Video & lagu YouTube + pinyin & arti' });
Object.assign(ROUTE_COLOR, { nonton: 'c5' });
(function () { const lat = U2_GROUPS.find(g => g[0] === 'Latihan'); if (lat && !lat[1].includes('nonton')) { const k = lat[1].indexOf('conv'); lat[1].splice(k >= 0 ? k + 1 : 1, 0, 'nonton'); } })();

Object.assign(I18N, {
  'Nonton & Dengar': ['Watch & Listen', 'Manood at Makinig'], 'Tambah video / lagu': ['Add video / song', 'Magdagdag ng video / kanta'], 'Koleksiku': ['My collection', 'Aking koleksyon'],
  'Cara pakai': ['How to use', 'Paano gamitin'], 'baris': ['lines', 'linya'], 'contoh': ['sample', 'halimbawa'], 'video + teks sinkron': ['video + synced text', 'video + naka-sync na teksto'],
  'video · waktu belum diatur': ['video · timing not set', 'video · wala pang timing'], 'teks + suara': ['text + voice', 'teksto + boses'], 'Hapus': ['Delete', 'Burahin'],
  'Tonton video atau dengar lagu Mandarin dari YouTube langsung di app. Teksnya berjalan mengikuti video, lengkap dengan pinyin bacaan Taiwan dan arti setiap kata. Ketuk kata untuk detail & simpan ke kartu hafalan.': ['Watch Mandarin videos or songs from YouTube right in the app. The text follows the video with Taiwan-reading pinyin and the meaning of every word. Tap a word for details and to save it to your flashcards.', 'Manood ng Mandarin na video o kanta mula YouTube sa app. Sumasabay ang teksto sa video, may pinyin (basa sa Taiwan) at kahulugan ng bawat salita.'],
  'Belum ada video. Tekan "Tambah video / lagu" untuk mulai, atau coba contoh di atas.': ['No videos yet. Tap "Add video / song" to start, or try the sample above.', 'Wala pang video. Pindutin ang "Magdagdag" para magsimula.'],
  'Salin link video YouTube (MV lagu, drama, vlog, video kuliah).': ['Copy a YouTube link (music video, drama, vlog, lecture).', 'Kopyahin ang link ng YouTube.'],
  'Tempel teks Mandarinnya: file subtitle .srt / .vtt, lirik .lrc, atau teks biasa per baris. Bisa juga pilih file dari HP.': ['Paste the Mandarin text: .srt / .vtt subtitles, .lrc lyrics, or plain text line by line. You can also pick a file.', 'I-paste ang tekstong Mandarin: .srt / .vtt, .lrc, o simpleng teksto.'],
  'Kalau teksnya tidak punya waktu, putar videonya lalu pakai "Ketuk-sinkron": ketuk tombol setiap baris mulai dinyanyikan.': ['If the text has no timing, play the video and use "Tap-sync": tap the button whenever a line starts.', 'Kung walang timing, gamitin ang "Tap-sync" habang tumutugtog.'],
  'Hanzi sederhana otomatis diubah ke hanzi tradisional Taiwan. Terjemahan (Indonesia/Inggris) boleh ditambahkan.': ['Simplified characters are converted to Taiwan traditional automatically. You may add a translation.', 'Awtomatikong ginagawang tradisyonal ang simplified. Puwedeng magdagdag ng salin.'],
  'Teks dan link hanya disimpan di HP ini. Kamus: kamus Xiǎobù + CC-CEDICT (CC BY-SA 3.0) + Unihan.': ['Texts and links are stored only on this device. Dictionary: Xiǎobù + CC-CEDICT (CC BY-SA 3.0) + Unihan.', 'Sa device lang naka-save. Diksyunaryo: Xiǎobù + CC-CEDICT + Unihan.'],
  'Pinyin': ['Pinyin', 'Pinyin'], 'Arti kata': ['Word meanings', 'Kahulugan'], 'Terjemahan': ['Translation', 'Salin'], 'Ulang baris': ['Loop line', 'Ulitin ang linya'], 'Jeda tiap baris': ['Pause each line', 'Huminto bawat linya'],
  'Kecepatan 1×': ['Speed 1×', 'Bilis 1×'], 'Kecepatan 0.75×': ['Speed 0.75×', 'Bilis 0.75×'], 'Kecepatan 0.5×': ['Speed 0.5×', 'Bilis 0.5×'],
  'Putar semua (suara app)': ['Play all (app voice)', 'I-play lahat'], 'Berhenti': ['Stop', 'Ihinto'], 'Teks terlalu cepat/lambat?': ['Text too early/late?', 'Masyadong maaga/huli?'],
  'Ketuk-sinkron': ['Tap-sync', 'Tap-sync'], 'Selesai ketuk-sinkron': ['Finish tap-sync', 'Tapusin ang tap-sync'], 'Atur ulang waktu (ketuk-sinkron)': ['Re-time (tap-sync)', 'Ulitin ang timing'],
  'putar video, lalu ketuk tombol tepat saat baris ini mulai:': ['play the video and tap the button right when this line starts:', 'i-play at i-tap kapag nagsimula ang linyang ito:'],
  'Baris ini mulai': ['This line starts', 'Simula ng linya'], 'Mundur 1': ['Back 1', 'Bumalik 1'], 'Semua baris sudah diberi waktu ✓': ['All lines are timed ✓', 'May timing na lahat ✓'],
  'Judul': ['Title', 'Pamagat'], 'Link YouTube': ['YouTube link', 'Link ng YouTube'], 'boleh kosong = mode suara': ['optional = voice mode', 'opsyonal'],
  'Teks Mandarin: subtitle .srt / .vtt, lirik .lrc, atau teks biasa': ['Mandarin text: .srt / .vtt subtitles, .lrc lyrics, or plain text', 'Tekstong Mandarin: .srt / .vtt, .lrc, o simple'],
  'Terjemahan (opsional): file/teks bahasa Indonesia atau Inggris': ['Translation (optional): Indonesian or English file/text', 'Salin (opsyonal)'],
  'Simpan': ['Save', 'I-save'], 'Batal': ['Cancel', 'Kanselahin'], 'Terbaca': ['Read', 'Nabasa'], 'tanpa waktu': ['no timing', 'walang timing'], 'hanzi sederhana → tradisional': ['simplified → traditional', 'simplified → tradisyonal'],
  'diubah ke hanzi tradisional': ['converted to traditional', 'ginawang tradisyonal'], 'Kata dari video': ['Word from video', 'Salita mula sa video'], 'Dengar': ['Listen', 'Makinig'],
  'Simpan ke kartu hafalan': ['Save to flashcards', 'I-save sa flashcards'], 'Sudah di kartu hafalan': ['Already in flashcards', 'Nasa flashcards na'], 'Tutup': ['Close', 'Isara'],
  'Kata ini belum ada di kamus.': ['This word is not in the dictionary yet.', 'Wala pa sa diksyunaryo.'],
  'Hanya kata yang ada di kamus Xiǎobù yang bisa masuk kartu hafalan.': ['Only words in the Xiǎobù dictionary can be added to flashcards.', 'Mga salita lang sa Xiǎobù ang puwede sa flashcards.'],
  'Masuk kartu hafalan ✓ Akan muncul di review.': ['Added to flashcards ✓ It will appear in reviews.', 'Nadagdag ✓'],
  'Menyiapkan kamus…': ['Preparing dictionary…', 'Inihahanda ang diksyunaryo…'], 'Hanya sekali, setelah itu langsung terbuka.': ['Only once; after that it opens instantly.', 'Isang beses lang.'],
  'Kamus belum bisa dimuat': ['Dictionary could not load', 'Hindi ma-load ang diksyunaryo'], 'Coba lagi': ['Try again', 'Subukan muli'],
  'Menu ini perlu internet sekali untuk mengunduh kamus (±2 MB). Setelah itu bisa dipakai offline.': ['This menu needs internet once to download the dictionary (±2 MB). After that it works offline.', 'Kailangan ng internet minsan para sa diksyunaryo (±2 MB).'],
  'Putar baris ini': ['Play this line', 'I-play ang linyang ito'], 'Hapus dari koleksi?': ['Remove from collection?', 'Alisin sa koleksyon?'],
  'Teks dan pengaturan waktunya akan hilang dari HP ini.': ['The text and its timing will be removed from this device.', 'Mabubura ang teksto at timing.'],
  'Giliranmu: ucapkan baris ini, lalu tekan ▶': ['Your turn: say this line, then press ▶', 'Ikaw na: sabihin ang linya, tapos ▶'],
  'Video Tidak bisa diputar. Cek link-nya.': ['Video cannot be played. Check the link.', 'Hindi ma-play ang video.'],
  'Putar videonya dulu.': ['Play the video first.', 'I-play muna ang video.'], 'Waktunya harus setelah baris sebelumnya.': ['The time must be after the previous line.', 'Dapat pagkatapos ng naunang linya.'],
  'Selesai! Teks sekarang berjalan mengikuti video.': ['Done! The text now follows the video.', 'Tapos! Sumasabay na ang teksto.'],
  'Link YouTube tidak dikenali. Contoh: https://youtu.be/xxxxxxxxxxx': ['YouTube link not recognized. Example: https://youtu.be/xxxxxxxxxxx', 'Hindi kilala ang link.'],
  'Belum ada baris Mandarin yang terbaca.': ['No Mandarin lines found yet.', 'Walang nabasang Mandarin.'], 'Teks terlalu panjang (maks. 1500 baris).': ['Text too long (max 1500 lines).', 'Masyadong mahaba (max 1500).'],
  'File terlalu besar.': ['File too large.', 'Masyadong malaki ang file.'], 'Memori HP untuk app penuh. Hapus beberapa video dulu.': ['App storage is full. Delete some videos first.', 'Puno na ang storage.'],
  'Teks belum punya waktu. Putar video lalu ketuk tombol setiap baris mulai.': ['The text has no timing yet. Play the video and tap the button whenever a line starts.', 'Walang timing pa. I-tap kapag nagsimula ang linya.'],
  'Putar video, lalu ketuk "Baris ini mulai" setiap baris dimulai.': ['Play the video, then tap "This line starts" at every line.', 'I-tap ang "Simula ng linya" sa bawat linya.'],
  'Baris yang sedang diputar akan diulang terus. Ketuk baris lain untuk pindah.': ['The current line will loop. Tap another line to switch.', 'Uulitin ang linya.'],
  'Video berhenti di akhir setiap baris supaya kamu bisa menirukan.': ['The video pauses after each line so you can repeat it.', 'Hihinto pagkatapos ng bawat linya.'],
  'YouTube tidak bisa dimuat. Cek koneksi internet, lalu buka lagi.': ['YouTube could not load. Check your connection and reopen.', 'Hindi ma-load ang YouTube.'],
  'Video tidak ditemukan atau sudah dihapus.': ['Video not found or removed.', 'Hindi makita ang video.'], 'Video tidak bisa diputar. Cek link-nya.': ['Video cannot be played. Check the link.', 'Hindi ma-play ang video.'],
  'Pemilik video ini tidak mengizinkan diputar di app lain. Coba cari versi lain (misalnya video lirik dari channel lain). Teksnya tetap bisa dipakai dengan suara app.': ['The owner does not allow this video to play in other apps. Try another upload (e.g. a lyric video). The text still works with the app voice.', 'Hindi pinapayagan ng may-ari. Subukan ang ibang bersyon.'],
  'mis. 告白氣球 – 周杰倫': ['e.g. 告白氣球 – 周杰倫', 'hal. 告白氣球 – 周杰倫'], 'atau': ['or', 'o'], 'Kembali': ['Back', 'Bumalik'], 'arti di kalimat ini': ['meaning in this sentence', 'kahulugan dito'],
  'Video & lagu YouTube + pinyin & arti': ['YouTube videos & songs + pinyin & meanings', 'Video at kanta + pinyin'], 'Nonton': ['Watch', 'Manood']
});
Object.assign(I18N_VI, {
  'Nonton & Dengar': 'Xem & Nghe', 'Tambah video / lagu': 'Thêm video / bài hát', 'Koleksiku': 'Bộ sưu tập', 'Cara pakai': 'Cách dùng', 'baris': 'dòng', 'Hapus': 'Xóa',
  'Pinyin': 'Pinyin', 'Arti kata': 'Nghĩa từ', 'Terjemahan': 'Bản dịch', 'Ulang baris': 'Lặp dòng', 'Jeda tiap baris': 'Dừng mỗi dòng', 'Simpan': 'Lưu', 'Batal': 'Hủy', 'Tutup': 'Đóng', 'Dengar': 'Nghe',
  'Simpan ke kartu hafalan': 'Lưu vào thẻ ghi nhớ', 'Sudah di kartu hafalan': 'Đã có trong thẻ', 'Ketuk-sinkron': 'Chạm để đồng bộ', 'Baris ini mulai': 'Dòng này bắt đầu', 'Nonton': 'Xem',
  'Kecepatan 1×': 'Tốc độ 1×', 'Kecepatan 0.75×': 'Tốc độ 0.75×', 'Kecepatan 0.5×': 'Tốc độ 0.5×', 'Putar semua (suara app)': 'Phát tất cả', 'Berhenti': 'Dừng', 'Kembali': 'Quay lại'
});

/* V1.7: peak.js (lapisan V1.7) dimuat sesudah file ini dan memanggil boot() sendiri.
   Tanpa penanda itu (index.html lama dari cache), boot langsung seperti biasa. */
if (!window.XB_DEFER_BOOT) boot();
