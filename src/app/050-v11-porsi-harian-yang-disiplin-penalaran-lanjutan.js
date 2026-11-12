/* =====================================================================
   B. PENALARAN BENTUK HANZI — struktur · bagian · logika · cerita · uji diri
   ===================================================================== */
const LAY_NAME = { lr: 'kiri–kanan', tb: 'atas–bawah', lmr: 'kiri–tengah–kanan', tmb: 'atas–tengah–bawah', enc: 'terbungkus penuh', top: 'dibungkus dari atas', bot: 'dibungkus dari bawah', left: 'dibungkus dari kiri', tl: 'atap kiri-atas', tr: 'kait kanan-atas', bl: 'alas kiri-bawah', ov: 'bertumpuk', one: 'gambar tunggal' };
const LAY_SYM = { lr: '⿰', tb: '⿱', lmr: '⿲', tmb: '⿳', enc: '⿴', top: '⿵', bot: '⿶', left: '⿷', tl: '⿸', tr: '⿹', bl: '⿺', ov: '⿻', one: '□' };
const LAY_TIP = {
  lr: 'Baca dari kiri ke kanan: bagian kiri biasanya kunci makna, bagian kanan sering memberi bunyi.',
  tb: 'Baca dari atas ke bawah: bagian atas sering jadi “atap” kategori (rumput, bambu, rumah), bawah melengkapi.',
  lmr: 'Tiga potong berjajar — baca kiri, tengah, kanan seperti mengeja.',
  tmb: 'Tiga lapis bertumpuk — baca dari atas ke bawah.',
  enc: 'Bingkai luar membatasi, isi di dalamnya memberi arti atau bunyi.',
  top: 'Bingkai membuka ke bawah; bagian dalam masuk dari bawah.',
  bot: 'Wadah terbuka ke atas; isinya duduk di dalam.',
  left: 'Bingkai membuka ke kanan; isinya masuk dari kanan.',
  tl: 'Atap miring di kiri-atas (seperti 广 疒 尸) menaungi bagian lain.',
  tr: 'Kait di kanan-atas memeluk bagian di kiri-bawah.',
  bl: 'Alas “jalan” di kiri-bawah (辶 走 廴): bagian lain berjalan di atasnya — sering soal gerak.',
  ov: 'Dua bentuk saling menyilang — lihat sebagai satu gambar.',
  one: 'Huruf dasar: bentuknya adalah gambar langsung dari benda aslinya — dan sering jadi bagian huruf lain.'
};
/* bentuk samping ↔ bentuk penuh, supaya bagian dari cerita & struktur bisa dicocokkan */
const CANON = { '訁': '言', '氵': '水', '亻': '人', '扌': '手', '忄': '心', '糹': '糸', '飠': '食', '衤': '衣', '礻': '示', '犭': '犬', '刂': '刀', '攵': '攴', '灬': '火', '艹': '艸', '⺮': '竹', '辶': '辵', '罒': '网', '阝': '阜', '釒': '金', '⻊': '足', '⺌': '小', '爫': '爪', '耂': '老', '覀': '襾', '⺈': '勹' };
const canon = p => CANON[p] || p;
function charIDS(c) {
  const v = typeof CH_IDS !== 'undefined' && CH_IDS[c]; if (!v) return null;
  const k = v.indexOf(':'); const lay = v.slice(0, k); const comps = [...v.slice(k + 1)];
  return { lay, comps: lay === 'one' ? [] : comps };
}
function compInfo(c, p) {
  const l = meanLang(); const ps = charParts(c); const o = ps.find(x => canon(x.p) === canon(p));
  const mean = o ? partMean(o) : COMP[p] ? (l === 'id' ? COMP[p][1] : l === 'vi' ? vx(COMP[p][2]) : COMP[p][2]) : (CH[p] ? charMean(p) : '');
  const py = (o && o.py) || (COMP[p] ? COMP[p][0] : charPy(p)) || '';
  return { p, mean, py, role: 'part' };
}
function compOrigin(p) {
  const l = meanLang(); const o = (typeof COMP_ORIGIN !== 'undefined') && (COMP_ORIGIN[p] || COMP_ORIGIN[canon(p)]);
  if (o) return o[l] || o.en || o.id || '';
  return CH[p] ? charStory(p, null, true) || '' : '';
}
/* peran tiap bagian: kunci makna / petunjuk bunyi / bagian bentuk */
function charRoles(c) {
  const ids = charIDS(c); const k = keyPart(c); const s = soundPart(c);
  if (!ids || !ids.comps.length) return { ids, parts: [] };
  const base = charBase(c); const fin = finalOf(base);
  const parts = ids.comps.map(p => compInfo(c, p));
  parts.forEach(o => { if (k && canon(k.p) === canon(o.p)) o.role = 'key'; else if (s && canon(s.p) === canon(o.p)) o.role = 'sound'; });
  if (!parts.some(o => o.role === 'key')) { const r = parts.find(o => o.role === 'part' && (RAD_SET.has(o.p) || RAD_SET.has(canon(o.p)))); if (r) r.role = 'key'; }
  if (!parts.some(o => o.role === 'sound') && base) {
    const r = parts.find(o => o.role === 'part' && o.py && (stripTone(o.py) === base || (finalOf(stripTone(o.py)) === fin && fin.length >= 2)));
    if (r) r.role = 'sound';
  }
  return { ids, parts };
}
/* diagram tata letak: kotak-kotak yang menunjukkan di mana setiap bagian berada */
const LAY_BOX = {
  lr: [[4, 4, 40, 92], [48, 4, 48, 92]], tb: [[4, 4, 92, 40], [4, 48, 92, 48]],
  lmr: [[4, 4, 28, 92], [35, 4, 31, 92], [69, 4, 27, 92]], tmb: [[4, 4, 92, 28], [4, 35, 92, 30], [4, 68, 92, 28]],
  ov: [[4, 4, 92, 92], [22, 22, 56, 56]]
};
const LAY_FRAME = { enc: [26, 26, 48, 48, 16, 20], top: [26, 30, 48, 62, 16, 20], bot: [26, 6, 48, 58, 16, 88], left: [30, 26, 62, 48, 16, 20], tl: [34, 34, 62, 62, 18, 22], tr: [4, 34, 62, 62, 82, 22], bl: [34, 4, 62, 62, 18, 84] };
function layoutSVG(c, size = 112, mini) {
  const R = charRoles(c); const ids = R.ids; const lay = ids ? ids.lay : 'one';
  const roleOf = j => (R.parts[j] ? R.parts[j].role : 'part');
  const g = (x, y, fs, txt, role) => `<text x="${x}" y="${y}" font-size="${fs}" class="lg-t r-${role}" text-anchor="middle" dominant-baseline="central">${esc(txt)}</text>`;
  let body = '';
  if (!ids || lay === 'one' || !R.parts.length) {
    body = `<rect x="4" y="4" width="92" height="92" rx="12" class="lg-b r-one"/>${g(50, 53, 64, c, 'one')}`;
  } else if (LAY_BOX[lay]) {
    body = LAY_BOX[lay].map(([x, y, w, h], j) => { const p = R.parts[j]; if (!p) return ''; const fs = Math.min(w, h) * (lay === 'ov' && j === 1 ? .62 : .74); return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" class="lg-b r-${roleOf(j)} ${lay === 'ov' && j === 1 ? 'ovl' : ''}"/>${g(x + w / 2, y + h / 2 + 2, fs, p.p, roleOf(j))}`; }).join('');
  } else if (LAY_FRAME[lay]) {
    const [x, y, w, h, lx, ly] = LAY_FRAME[lay];
    body = `<rect x="4" y="4" width="92" height="92" rx="12" class="lg-b r-${roleOf(0)}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" class="lg-b in r-${roleOf(1)}"/>${g(lx, ly, 24, R.parts[0].p, roleOf(0))}${R.parts[1] ? g(x + w / 2, y + h / 2 + 2, Math.min(w, h) * .72, R.parts[1].p, roleOf(1)) : ''}`;
  }
  return `<svg class="laysvg ${mini ? 'mini' : ''}" viewBox="0 0 100 100" width="${size}" height="${size}" role="img" aria-label="${esc(t(LAY_NAME[lay] || 'gambar tunggal'))}">${body}</svg>`;
}
const roleLbl = r => ({ key: t('kunci makna'), sound: t('petunjuk bunyi'), part: t('bagian bentuk') }[r] || '');
/* rumus singkat: 氵 air + 每 měi → 海 */
function reasonFormula(c) {
  const R = charRoles(c);
  if (!R.parts.length) return `<span class="rf-one">${t('gambar')}: ${esc(shortOrigin(c) || charMean(c))}</span>`;
  const bits = R.parts.map(o => `<span class="rf r-${o.role}"><b class="hz">${esc(o.p)}</b>${o.role === 'sound' ? `<i>${esc(o.py)}</i>` : o.mean ? `<i>${esc(shortMean(o.mean))}</i>` : ''}</span>`);
  return `${bits.join('<span class="rf-op">+</span>')}<span class="rf-op">→</span><span class="rf r-sum"><b class="hz">${c}</b><i>${esc(shortMean(charMean(c)))}</i></span>`;
}
function shortOrigin(p) { const s = compOrigin(p); return s ? s.split(/\s[—–-]\s|[.。;]/)[0] : ''; }
/* satu blok lengkap untuk modal huruf */
function reasonBlock(c) {
  const R = charRoles(c); const lay = R.ids ? R.ids.lay : 'one'; const py = charPy(c); const tn = charTone(c); const mn = charMean(c);
  const how = lensHow(c); const story = charStory(c, null, true); const own = S.stories[c];
  const key = R.parts.find(o => o.role === 'key'); const snd = R.parts.find(o => o.role === 'sound');
  const f = fam8(); const kp = keyPart(c);
  const kin = kp ? (f.key[kp.p] || []).filter(x => x !== c).slice(0, 6) : [];
  const partsHTML = R.parts.length ? R.parts.map(o => `<div class="rp r-${o.role}"><button class="rp-g hz" data-a="char" data-v="${esc(o.p)}" ${CH[o.p] ? '' : 'disabled'}>${esc(o.p)}</button>
      <div class="grow" style="min-width:0"><div class="rp-h"><b>${esc(o.mean || '·')}</b>${o.py ? ` <span class="small">${esc(o.py)}</span>` : ''}<span class="rp-role">${roleLbl(o.role)}</span></div>
      ${compOrigin(o.p) ? `<p>${esc(compOrigin(o.p))}</p>` : ''}</div></div>`).join('')
    : `<div class="rp r-one"><span class="rp-g hz">${c}</span><div class="grow"><p>${esc(compOrigin(c) || story || t(LAY_TIP.one))}</p></div></div>`;
  const logic = R.parts.length
    ? `<div class="rsn-eq">${reasonFormula(c)}</div>${how.length ? `<ul class="rsn-how">${how.map(l => `<li>${l}</li>`).join('')}</ul>` : ''}
       <p class="small muted" style="margin:6px 0 0">${key && snd ? t('Kunci makna memberi kategori, petunjuk bunyi memberi bacaan — dua petunjuk = satu huruf.') : key ? t('Kunci makna memberi kategori; bagian lain melengkapi gambarnya.') : t('Gabungkan gambar tiap bagian menjadi satu adegan.')}</p>`
    : `<p style="margin:0">${t('Huruf ini adalah bentuk dasar — ia sendiri sering menjadi bagian dari huruf lain.')}</p>`;
  const q = R.parts.length ? R.parts.map(o => `<b class="hz">${esc(o.p)}</b>`).join(' + ') : `<b class="hz">${c}</b>`;
  return `<div class="rsn">
    <div class="rsn-top"><span class="gpill">${ICON('lightbulb')} ${t('Penalaran bentuk')}</span><span class="small muted">${t('5 langkah supaya huruf ini dipahami, bukan dihafal buta')}</span></div>
    <ol class="rsn-steps">
      <li><span class="rsn-n">1</span><div class="grow"><b>${t('Lihat strukturnya')}</b>
        <div class="rsn-s1">${layoutSVG(c, 104)}<div class="grow" style="min-width:0"><span class="lay-chip"><span class="hz">${LAY_SYM[lay] || '□'}</span> ${t(LAY_NAME[lay] || 'gambar tunggal')}</span><p>${t(LAY_TIP[lay] || LAY_TIP.one)}</p>
          <div class="lg-key"><span class="r-key">${t('kunci makna')}</span><span class="r-sound">${t('petunjuk bunyi')}</span><span class="r-part">${t('bagian bentuk')}</span></div></div></div></div></li>
      <li><span class="rsn-n">2</span><div class="grow"><b>${t('Kenali tiap bagian & asal bentuknya')}</b><div class="rsn-parts">${partsHTML}</div></div></li>
      <li><span class="rsn-n">3</span><div class="grow"><b>${t('Logikanya')}</b>${logic}</div></li>
      <li><span class="rsn-n">4</span><div class="grow"><b>${t('Cerita pengingat')}</b><p class="rsn-story">${esc(own || story || '—')}</p>${own && story ? `<p class="small muted" style="margin:4px 0 0">${t('Versi bawaan')}: ${esc(story)}</p>` : ''}</div></li>
      <li><span class="rsn-n">5</span><div class="grow"><b>${t('Uji diri 5 detik')}</b>
        <details class="rsn-q"><summary>${t('Tutup mata sebentar: {q} = ? Sebutkan arti & bunyinya, lalu ketuk.', { q })}</summary>
          <div class="rsn-a"><span class="hz">${c}</span> <b class="t${tn}">${esc(py)}</b> · <b>${esc(mn)}</b></div></details>
        ${kin.length ? `<div class="kin" style="margin-top:8px"><span class="kin-l"><b class="hz glowk">${esc(kp.p)}</b> ${t('huruf lain dengan kunci yang sama')}</span>${kin.map(x => `<button class="chip" data-a="char" data-v="${x}"><span class="hz">${x}</span> ${esc(charMean(x))}</button>`).join('')}</div>` : ''}</div></li>
    </ol></div>`;
}
/* versi ringkas per huruf untuk kartu kata baru & modal kata */
function reasonRow(w, inSession) {
  const cs = [...new Set([...(w.s || w.w)].filter(isHan))].slice(0, 6);
  if (!cs.length) return '';
  return `<div class="rzrow">${cs.map(c => { const tn = charTone(c); const R = charRoles(c); const lay = R.ids ? R.ids.lay : 'one';
    return `<button class="rz" ${inSession ? 'data-s="hzstory"' : 'data-a="char"'} data-v="${c}">${layoutSVG(c, 62, true)}
      <span class="rz-t"><span class="rz-h"><b class="hz">${c}</b> <span class="t${tn}">${esc(charPy(c))}</span> · <b>${esc(charMean(c) || '—')}</b><small class="rz-lay">${LAY_SYM[lay] || '□'} ${t(LAY_NAME[lay] || 'gambar tunggal')}</small></span>
      <span class="rz-f">${reasonFormula(c)}</span>
      <span class="rz-s">${esc(charStory(c) || t('Belum ada cerita — tap untuk menulis versimu.'))}</span></span></button>`; }).join('')}</div>`;
}
function charsBlock(w) { return reasonRow(w, true) + ctxIntro(w); }
function charsBlockA(w) { return reasonRow(w, false); }
function lensKin(c) {
  const k = keyPart(c); const s = soundPart(c); const f = fam8();
  const sin = s ? (f.snd[s.p] || []).filter(x => x !== c).slice(0, 8) : [];
  const sib = toneSiblings(c).slice(0, 8);
  const chip = x => `<button class="chip" data-a="char" data-v="${x}"><span class="hz">${x}</span> <span class="t${charTone(x)}">${esc(charPy(x))}</span> ${esc(charMean(x))}</button>`;
  if (!sin.length && !sib.length) return '';
  return `<div class="lens8"><div class="gpill">${ICON('twins')} ${t('Keluarga bunyi & nada')}</div>
    ${sin.length ? `<div class="kin"><span class="kin-l"><b class="hz glows">${s.p}</b> ${t('keluarga bunyi')}</span>${sin.map(chip).join('')}</div>` : ''}
    ${sib.length ? `<div class="kin"><span class="kin-l">${ICON('tone')} ${t('bunyi sama, nada beda')}</span>${sib.map(chip).join('')}<button class="chip" data-a="twins-of" data-v="${charBase(c)}">${ICON('chevron')} ${t('lihat semua')}</button></div>` : ''}</div>`;
}
function openChar(c) {
  const own = S.stories[c] || '';
  const ws = (CHAR_WORDS[c] || []).slice(0, 8); const py = charPy(c); const tn = charTone(c);
  openModal(`<div class="q-kind">🀄 ${t('Hanzi')}${CHAR_LV[c] !== undefined ? ' · ' + t('muncul pertama di {lv}', { lv: LEVELS[CHAR_LV[c]].en }) : ''}</div>
    <div class="row" style="gap:18px;align-items:center;margin:10px 0 6px;flex-wrap:wrap;justify-content:center">
      ${glowBox(c, 170, 'hw')}
      <div class="grow" style="min-width:190px">
        <div class="row" style="gap:10px;align-items:baseline;flex-wrap:wrap"><b class="t${tn}" style="font-size:26px">${esc(py)}</b>${py ? contourSVG([tn], 24) : ''}</div>
        <b style="font-size:20px;display:block;margin-top:2px">${esc(charMean(c) || '—')}</b>
        <div class="rz-f" style="margin-top:8px">${reasonFormula(c)}</div>
        <div class="row wrap" style="margin-top:10px;gap:8px"><button class="btn sec small" data-a="sayc" data-v="${c}">${ICON('speaker')} ${t('dengar')}</button><button class="btn pri small" data-a="writechar" data-v="${c}">${ICON('write')} ${t('Latih menulis')}</button></div>
        <div class="small muted" style="margin-top:8px">${t('Goresan diputar berulang. Bagian yang menyala oranye = kunci makna.')}</div></div></div>
    ${reasonBlock(c)}
    ${lensKin(c)}
    ${cxCharEx(c)}
    <h3 style="margin-top:16px">${t('Ceritamu sendiri')}</h3>
    <textarea id="story" rows="3" style="width:100%;border-radius:16px;border:1px solid var(--gline);background:rgba(255,255,255,.4);padding:12px;resize:vertical" placeholder="${t('Bentuk ini mengingatkanmu pada apa?')}">${esc(own)}</textarea>
    <div class="row" style="margin-top:8px"><button class="btn pri small" data-a="savestory" data-v="${c}">${t('Simpan cerita')}</button>${own ? `<button class="btn ghost small" data-a="delstory" data-v="${c}">${t('Hapus')}</button>` : ''}</div>
    ${ws.length ? `<h3 style="margin-top:18px">${t('Muncul di kata')}</h3><div class="wlist">${ws.map(wordRow).join('')}</div>` : ''}`, 'wide');
  HW = null;
  mountLoop(c, 'hw', 170);
  if (!CXD) loadCtx(() => { const el = $('#cxch'); if (el && el.dataset.c === c) el.outerHTML = cxCharEx(c); });
}
