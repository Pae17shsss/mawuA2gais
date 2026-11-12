/* =====================================================================
   BICARA: rekam suaramu + kartu perkenalan diri (gabungan L1–L6)
   ===================================================================== */
const REC = { mr: null, chunks: [], url: {}, k: null };
async function recToggle(k, btn) {
  if (REC.mr && REC.mr.state === 'recording') { REC.mr.stop(); return; }
  if (!navigator.mediaDevices || !window.MediaRecorder) { toast(t('Perekam suara tidak didukung di browser ini.')); return; }
  try {
    const st = await navigator.mediaDevices.getUserMedia({ audio: true }); REC.chunks = []; REC.k = k;
    const mr = new MediaRecorder(st); REC.mr = mr;
    mr.ondataavailable = e => REC.chunks.push(e.data);
    mr.onstop = () => { st.getTracks().forEach(x => x.stop()); const u = URL.createObjectURL(new Blob(REC.chunks, { type: mr.mimeType || 'audio/webm' })); if (REC.url[k]) URL.revokeObjectURL(REC.url[k]); REC.url[k] = u; REC.mr = null; render(); new Audio(u).play().catch(() => {}); };
    mr.start(); if (btn) { btn.classList.add('rec'); btn.innerHTML = `${ICON('close')} ${t('Stop')}`; }
    setTimeout(() => { if (REC.mr === mr && mr.state === 'recording') mr.stop(); }, 15000);
  } catch (e) { toast(t('Izin mikrofon ditolak — aktifkan di pengaturan browser.')); }
}
const ME_OPTS = {
  country: [['印尼', 'yìn ní'], ['菲律賓', 'fēi lǜ bīn'], ['越南', 'yuè nán'], ['台灣', 'tái wān'], ['日本', 'rì běn'], ['韓國', 'hán guó'], ['美國', 'měi guó'], ['中國', 'zhōng guó']],
  job: [['學生', 'xué shēng'], ['老師', 'lǎo shī'], ['醫生', 'yī shēng'], ['護士', 'hù shì'], ['工程師', 'gōng chéng shī'], ['司機', 'sī jī'], ['廚師', 'chú shī']],
  food: [['甜點', 'tián diǎn'], ['蛋糕', 'dàn gāo'], ['巧克力', 'qiǎo kè lì'], ['炒飯', 'chǎo fàn'], ['拉麵', 'lā miàn'], ['炸雞', 'zhá jī'], ['麵包', 'miàn bāo'], ['雞肉', 'jī ròu']],
  like: [['看電視', 'kàn diàn shì'], ['看書', 'kàn shū'], ['看電影', 'kàn diàn yǐng'], ['寫字', 'xiě zì'], ['喝奶茶', 'hē nǎi chá'], ['喝咖啡', 'hē kā fēi']]
};
function numPy(n) { return [...numZh(n)].map(c => ({ 十: 'shí', 百: 'bǎi', 千: 'qiān', 萬: 'wàn', 兩: 'liǎng', 零: 'líng' }[c] || PYD[ZD.indexOf(c)])).join(' '); }
function meCard() {
  const me = klState().me || {}; const g = (k, d) => (me[k] !== undefined && me[k] !== '' ? me[k] : d);
  const name = String(g('name', '')).trim() || '＿＿'; const c = ME_OPTS.country[g('country', 0)]; const job = ME_OPTS.job[g('job', 0)];
  const age = +g('age', 20); const fam = +g('fam', 4); const wake = +g('wake', 7); const food = ME_OPTS.food[g('food', 0)]; const like = ME_OPTS.like[g('like', 0)];
  const lines = [
    ['大家好！', 'Dà jiā hǎo!'], [`我叫${name}。`, `Wǒ jiào ${name}.`], [`我是${c[0]}人。`, `Wǒ shì ${c[1]} rén.`], [`我是${job[0]}。`, `Wǒ shì ${job[1]}.`],
    [`我今年${numZh(age)}歲。`, `Wǒ jīn nián ${numPy(age)} suì.`], [`我家有${fam === 2 ? '兩' : numZh(fam)}個人。`, `Wǒ jiā yǒu ${fam === 2 ? 'liǎng' : numPy(fam)} ge rén.`],
    [`我每天早上${hourZh(wake)}點起床。`, `Wǒ měi tiān zǎo shang ${wake === 2 ? 'liǎng' : numPy(wake)} diǎn qǐ chuáng.`], [`我最喜歡吃${food[0]}。`, `Wǒ zuì xǐ huān chī ${food[1]}.`],
    [`我也喜歡${like[0]}。`, `Wǒ yě xǐ huān ${like[1]}.`], ['我會說一點中文，我覺得中文很有趣。', 'Wǒ huì shuō yì diǎn Zhōng wén, wǒ jué de Zhōng wén hěn yǒu qù.'], ['謝謝大家！', 'Xiè xie dà jiā!']
  ];
  return lines;
}
function vMeIntro() {
  const me = klState().me || {}; const sel = (k, arr) => `<select data-in="klme" data-k="${k}">${arr.map((o, j) => `<option value="${j}" ${+(me[k] || 0) === j ? 'selected' : ''}>${esc(o[0])} · ${esc(o[1])}</option>`).join('')}</select>`;
  const num = (k, d, a, b) => `<input type="number" min="${a}" max="${b}" data-in="klme" data-k="${k}" value="${esc(me[k] !== undefined ? me[k] : d)}">`;
  const lines = meCard(); const full = lines.map(x => x[0]).join('');
  return `<section class="card glass"><h2 style="margin:0 0 4px">${ICON('user')} ${t('Kartu perkenalan diri')}</h2><p class="small muted" style="margin:0 0 12px">${t('Gabungan pola dari lesson-lesson kelas jadi satu pidato pendek tentang dirimu. Isi datamu, dengarkan, lalu rekam suaramu sendiri.')}</p>
    <div class="kl-me">
      <label>${t('Nama (hanzi/latin)')}<input data-in="klme" data-k="name" value="${esc(me.name || '')}" placeholder="林美美" maxlength="12"></label>
      <label>${t('Negara')}${sel('country', ME_OPTS.country)}</label><label>${t('Pekerjaan')}${sel('job', ME_OPTS.job)}</label>
      <label>${t('Umur')}${num('age', 20, 5, 99)}</label><label>${t('Orang di rumah')}${num('fam', 4, 1, 12)}</label><label>${t('Bangun jam')}${num('wake', 7, 1, 12)}</label>
      <label>${t('Makanan favorit')}${sel('food', ME_OPTS.food)}</label><label>${t('Juga suka')}${sel('like', ME_OPTS.like)}</label></div>
    <div class="kl-speech">${lines.map(([zh, py]) => `<div class="kl-sl">${klLine(zh, py)}<button class="cx-sp" data-cx="say" data-v="${esc(zh)}">${ICON('speaker')}</button></div>`).join('')}</div>
    <div class="row wrap" style="gap:8px;margin-top:12px"><button class="btn pri" data-cx="say" data-v="${esc(full)}">${ICON('play')} ${t('Dengar semuanya')}</button><button class="btn sec" data-cx="say" data-slow="1" data-v="${esc(full)}">${ICON('slow')} ${t('pelan')}</button>
      <button class="btn sec kl-rec" data-a="klrec" data-v="me">${ICON('mic')} ${t('Rekam suaraku')}</button>${REC.url.me ? `<button class="btn ghost" data-a="klplay" data-v="me">${ICON('play')} ${t('Putar rekamanku')}</button>` : ''}</div></section>`;
}
function vSpeak() {
  const last = klState().last || KLS[0].n;
  return `${vMeIntro()}<section class="card glass"><h2 style="margin:0 0 4px">${ICON('mic')} ${t('Jawab pertanyaan kelas')}</h2><p class="small muted" style="margin:0 0 12px">${t('Pertanyaan dari slide latihan. Dengar → jawab keras-keras pakai pola di bawahnya → rekam & bandingkan.')}</p>
    ${KLS.map(L => { const n = L.n; return `<details class="kl-spd" ${n === last ? 'open' : ''}><summary><span class="kl-ln">${lnShort(n)}</span> <span class="hz">${esc(L.title.zh)}</span> <small class="muted">${L.speak.length}</small></summary>${L.speak.map((q, j) => { const k = n + '-' + j; return `<div class="kl-sq"><div class="grow" style="min-width:0">${klLine(q.q, q.qpy)}<div class="small">${esc(kx(q))}</div><div class="kl-tpl"><span class="hz">${esc(q.tpl)}</span> <small>${esc(q.tplpy || '')}</small></div></div>
      <div class="kl-sqb"><button class="cx-sp" data-cx="say" data-v="${esc(q.q)}">${ICON('speaker')}</button><button class="cx-sp kl-rec" data-a="klrec" data-v="${k}" aria-label="${t('Rekam suaraku')}">${ICON('mic')}</button>${REC.url[k] ? `<button class="cx-sp" data-a="klplay" data-v="${k}">${ICON('play')}</button>` : ''}</div></div>`; }).join('')}</details>`; }).join('')}</section>`;
}
