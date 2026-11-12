/* ========== voice.js — suara Mandarin premium (pilih suara terbaik, pemilih suara, prosodi, adaptor cloud) ==========
   Dimuat sesudah core.js / listen50.js / listgame.js dan SEBELUM premode.js.
   Ekspor: VOICE (helper), voiceLabel(), voiceTier(), ACT.voicepick (+ vpSel/vpPrev/vpPlat/vpCloud), TTS.cloud, TTS.speakWith().
   S.settings.voice = '' (otomatis) atau id suara (voiceURI, cadangan: nama). */

Object.assign(I18N, {
  'Suara pelafalan': ['Pronunciation voice', 'Boses ng bigkas'],
  'Pilih suara': ['Choose voice', 'Pumili ng boses'],
  'Otomatis (terbaik)': ['Automatic (best)', 'Awtomatiko (pinakamahusay)'],
  'Dengar contoh': ['Play sample', 'Pakinggan'],
  'Kecepatan bicara': ['Speaking speed', 'Bilis ng pagsasalita'],
  'Pelan': ['Slow', 'Mabagal'], 'Normal': ['Normal', 'Normal'], 'Cepat': ['Fast', 'Mabilis'],
  'Standar': ['Standard', 'Standard'], 'Taiwan': ['Taiwan', 'Taiwan'], 'Tiongkok': ['China', 'China'],
  'Online': ['Online', 'Online'], 'Offline': ['Offline', 'Offline'], 'Terbaik': ['Best', 'Pinakamahusay'],
  'Dapatkan suara premium gratis': ['Get a premium voice for free', 'Kumuha ng premium na boses nang libre'],
  'Lanjutan': ['Advanced', 'Advanced'],
  'Tidak ada suara Mandarin': ['No Mandarin voice', 'Walang boses na Mandarin'],
  'Suara di perangkat ini': ['Voices on this device', 'Mga boses sa device na ito'],
  'Sedang dipakai': ['In use', 'Ginagamit'], 'Kaku': ['Robotic', 'Robotic'],
});

const VOICE = {
  sample: '你好，我是哈吉咪。今天我們一起學中文吧！',
  bad: {},        // suara yang gagal (mis. suara online saat offline) — dilewati sampai app dibuka ulang
  list: [],       // suara Mandarin (tanpa Kanton), sudah diberi info & diurutkan
  sig: '',
  plat() {
    const ua = navigator.userAgent || ''; const touchMac = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
    if (/iPhone|iPad|iPod/.test(ua) || touchMac) return 'ios';
    if (/Android/.test(ua)) return 'android';
    if (/Windows/.test(ua)) return 'win';
    if (/Macintosh|Mac OS X/.test(ua)) return 'mac';
    return 'other';
  },
  edge() { return /Edg\//.test(navigator.userAgent || ''); },
  mobile() { const p = this.plat(); return p === 'ios' || p === 'android'; },
  id(v) { return v ? (v.voiceURI || v.name) : ''; },
  // info kualitas: tier 3 premium · 2 natural/bagus · 1 standar · 0 kaku
  info(v) {
    const n = v.name || '', u = v.voiceURI || '', l = (v.lang || '').replace('_', '-'), all = n + ' ' + u;
    const tw = /(zh|cmn)-(Hant-)?TW|Hant/i.test(l) || /Taiwan|臺灣|台灣|國語|Mei-?Jia|Meijia|HsiaoChen|HsiaoYu|YunJhe|Hanhan|Yating|Zhiwei/i.test(n);
    const yue = /HK|MO|yue/i.test(l) || /Cantonese|粵|粤|香港|Sinji|HiuGaai|HiuMaan|WanLung|Tracy|Danny/i.test(n);
    let tier = 1, tag = 'std', s = 0;
    if (/premium/i.test(all)) { tier = 3; tag = 'prem'; s = 85; }
    else if (/Online \(Natural\)|Natural|Neural/i.test(n)) { tier = 3; tag = 'nat'; s = 82; }
    else if (/enhanced/i.test(all)) { tier = 3; tag = 'prem'; s = 70; }
    else if (/network/i.test(all)) { tier = 2; tag = 'nat'; s = 58; }
    else if (/^Google/i.test(n)) { tier = 2; tag = 'nat'; s = 50; }
    else if (/siri/i.test(all)) { tier = 2; tag = 'nat'; s = 45; }
    if (/eloquence|eSpeak|espeak|Eddy|Flo |Flo\b|Grandma|Grandpa|Reed|Rocko|Sandy|Shelley|Bahh|Albert|Jester|Zarvox|Trinoids|Whisper|Bubbles|Boing/i.test(all)) { tier = 0; tag = 'low'; s = -120; }
    else if (/compact/i.test(all)) { tier = 1; s -= 20; }
    if (tier === 1 && /Samsung/i.test(n)) s += 15;
    if (tier === 1 && this.plat() === 'android' && !v.localService) s += 10;
    // Taiwan dulu (logat yang dipelajari), Tiongkok sebagai cadangan
    s += tw ? 150 : 40;
    if (/HsiaoChen/i.test(n)) s += 10; else if (/HsiaoYu/i.test(n)) s += 8; else if (/YunJhe/i.test(n)) s += 4; else if (/Mei-?Jia|Meijia/i.test(n)) s += 6; else if (/Hanhan|Xiaoxiao/i.test(n)) s += 3;
    if (!v.localService && typeof navigator.onLine === 'boolean' && !navigator.onLine) s -= 200; // suara online tak bisa dipakai saat offline
    if (this.bad[this.id(v)]) s -= 400;
    if (v.default && tw) s += 1;
    // nama pendek & jenis kelamin (untuk tampilan)
    let short = n.replace(/^Microsoft\s+/i, '').replace(/\s+Online.*$/i, '').replace(/\s*-\s*Chinese.*$/i, '').replace(/\s*\((Enhanced|Premium|Compact)\)/i, '').replace(/\s*\(Chinese.*\)$/i, '');
    if (/^Google/i.test(n)) short = n.replace(/（.*?）|\(.*?\)/g, '').trim() || 'Google';
    if (/^(cmn|zh)[-_]\w+[-_]x[-_]/i.test(n)) short = 'Google ' + (tw ? '國語' : '普通话') + (/network/i.test(n) ? '' : ' · offline');
    else if (/^(zh|cmn)([-_][A-Za-z]+)*$/i.test(n) || /^Chinese/i.test(n)) short = tw ? '國語（臺灣）' : '普通话';
    if (/apple\.voice\.(premium|enhanced)/i.test(u) && !/Premium|Enhanced/i.test(short)) short += /premium/i.test(u) ? ' Premium' : ' Enhanced';
    short = short.trim() || n;
    const fem = /HsiaoChen|HsiaoYu|Hanhan|Yating|Mei-?Jia|Meijia|Tingting|Ting-Ting|Xiaoxiao|Xiaoyi|Huihui|Yaoyao|Li-?Mu|Lilian/i.test(n);
    const male = /YunJhe|Zhiwei|Kangkang|Yunxi|Yunjian|Yunyang|Kangkang|Han\b/i.test(n);
    return { v, id: this.id(v), tier, tag, s, tw, yue, short, fem, male, local: !!v.localService };
  },
  all() { let vs = []; try { vs = speechSynthesis.getVoices() || []; } catch (e) {} return vs; },
  scan() {
    const zh = this.all().filter(v => /^(zh|cmn|yue)/i.test(v.lang || '') || /chinese|中文|國語|普通话|台灣|臺灣/i.test(v.name || ''));
    this.list = zh.map(v => this.info(v)).filter(x => !x.yue).sort((a, b) => b.s - a.s);
    return this.list;
  },
  best() { return this.list[0] || null; },
  find(id) { return id ? this.list.find(x => x.id === id) || this.list.find(x => x.v.name === id) || null : null; },
  cur() { return TTS.voice ? this.list.find(x => x.v === TTS.voice) || this.info(TTS.voice) : null; },
  tagLabel(x) { return x.tag === 'prem' ? 'Premium' : x.tag === 'nat' ? 'Natural' : x.tag === 'low' ? t('Kaku') : t('Standar'); },
  // kecepatan efektif: suara neural paling enak di ~0.9–1.0, suara lokal ~0.8
  rateK(x) { if (!x) return 1; return x.tag === 'nat' && /Online|Natural|Neural/i.test(x.v.name) ? 1.08 : x.tier >= 2 ? 1 : x.tier === 0 ? 0.92 : 0.95; },
  rate(r, voice) { const x = voice ? (this.list.find(y => y.v === voice) || this.info(voice)) : null; const base = +r || S.settings.rate || 0.85; return Math.max(0.42, Math.min(1.4, base * this.rateK(x))); },
  pitch() { return 1; },
};
function voiceTier() { const c = VOICE.cur(); return !TTS.ok || !c ? -1 : c.tier; }
function voiceLabel() {
  if (!TTS.ok) return t('Tidak ada suara Mandarin');
  if (TTS.cloud && TTS.cloud.enabled() && !TTS.cloud.down()) return 'HsiaoChen · Cloud';
  const c = VOICE.cur(); if (!c) return t('Tidak ada suara Mandarin');
  return c.short + ' · ' + VOICE.tagLabel(c);
}

/* ---------- pilih suara (ganti TTS.init bawaan) ---------- */
TTS.pick = function () {
  if (!this.ok) return;
  const prevSig = VOICE.sig; VOICE.scan();
  this.voices = VOICE.list.map(x => x.v); this.ranked = this.voices.slice();
  const want = S.settings.voice; const f = VOICE.find(want);
  const nv = (f && !VOICE.bad[f.id] ? f.v : null) || (VOICE.best() ? VOICE.best().v : null);
  const changed = nv !== this.voice; this.voice = nv;
  VOICE.sig = VOICE.list.map(x => x.id).join('|') + '#' + VOICE.id(nv);
  if (VOICE.sig !== prevSig || changed) {
    if (typeof onVoices === 'function') try { onVoices(); } catch (e) {}
    if (document.querySelector('.vp-sheet')) vpRefresh();
  }
};
TTS.init = function () {
  if (!this.ok) return;
  const pk = () => this.pick();
  pk();
  try { if (speechSynthesis.addEventListener) speechSynthesis.addEventListener('voiceschanged', pk); else speechSynthesis.onvoiceschanged = pk; } catch (e) { speechSynthesis.onvoiceschanged = pk; }
  // iOS/Safari sering tidak memicu voiceschanged — coba lagi beberapa kali
  [250, 600, 1200, 2200, 3500, 6000, 10000].forEach(ms => setTimeout(pk, ms));
  addEventListener('online', () => { VOICE.bad = {}; pk(); }); addEventListener('offline', pk);
};
TTS.isTW = function () { const c = VOICE.cur(); return !!(c && c.tw); };
const vpUnlockBase = TTS.unlock;
TTS.unlock = function () { const first = !this.unlocked; vpUnlockBase.call(this); if (first) setTimeout(() => this.pick(), 300); };

/* ---------- prosodi: antrean, potongan kalimat, jeda awal, fallback ---------- */
TTS.run = 0; TTS.lastEnd = 0;
TTS.chunks = function (text) {
  const s = String(text).replace(/[()（）]/g, '').trim(); if (s.length <= 34) return [s];
  const parts = s.split(/(?<=[。！？!?；;…\n])/).map(x => x.trim()).filter(Boolean); const out = [];
  parts.forEach(p => {
    if (p.length <= 34) { out.push(p); return; }
    let cur = ''; p.split(/(?<=[，,、：:])/).forEach(q => { if (cur && (cur + q).length > 34) { out.push(cur); cur = q; } else cur += q; }); if (cur) out.push(cur);
  });
  // gabungkan potongan yang sangat pendek supaya intonasi tidak putus-putus
  const m = []; out.forEach(p => { if (m.length && (m[m.length - 1].length < 8 || p.length < 4) && (m[m.length - 1] + p).length <= 40) m[m.length - 1] += p; else m.push(p); });
  return m.length ? m : [s];
};
const vpStopBase = TTS.stop;
TTS.stop = function () {
  this.run++; clearTimeout(this.t2);
  if (this.cloud) this.cloud.halt();
  vpStopBase.call(this);
};
TTS.speaking = function () { try { return !!((this.cloud && this.cloud.playing()) || (this.ok && speechSynthesis.speaking)); } catch (e) { return false; } };
TTS.speakWith = function (voice, text, rate, onend) {
  if (!this.ok || !text) { if (onend) onend(); return; }
  this.stop(); const run = this.run;
  const vv = voice === undefined ? this.voice : voice;
  const chunks = this.chunks(text); let k = 0, retried = false;
  const han = String(text).replace(/[^㐀-鿿]/g, '').length;
  const idle = !speechSynthesis.speaking && Date.now() - this.lastEnd > 1200;
  const lead = VOICE.mobile() && idle && han > 0 && han <= 3;
  const next = () => {
    if (run !== this.run) return;
    if (k >= chunks.length) { this.lastEnd = Date.now(); if (onend) onend(); return; }
    const txt = chunks[k];
    try {
      const u = new SpeechSynthesisUtterance(txt); u._xb = 1;
      const v = vv; u.lang = v ? v.lang : 'zh-TW'; try { if (v) u.voice = v; } catch (e) {}
      u.rate = VOICE.rate(rate, v); u.pitch = VOICE.pitch(v); u.volume = 1;
      let done = false;
      const fin = ev => {
        if (done) return; done = true; clearTimeout(this.dog); if (this.u === u) this.u = null;
        if (run !== this.run) return;
        const er = ev && ev.error;
        // suara online gagal (offline / server) → tandai, ganti suara lokal terbaik, ulangi sekali
        if (er && /network|synthesis|unavailable|voice-unavailable|language/i.test(er) && v && !retried) {
          retried = true; VOICE.bad[VOICE.id(v)] = 1;
          if (!v.localService && /network|synthesis/i.test(er)) VOICE.list.forEach(x => { if (!x.local) VOICE.bad[x.id] = 1; }); // satu suara online gagal → semua online kemungkinan gagal
          const old = this.voice; this.pick();
          if (this.voice && this.voice !== v) { if (vv === old) { chunks.splice(0, k); k = 0; return this.speakWith(this.voice, chunks.join(''), rate, onend); } }
        }
        k++; this.lastEnd = Date.now(); this.t2 = setTimeout(next, k < chunks.length ? 30 : 0);
      };
      u.onend = fin; u.onerror = fin; this.u = u; // simpan referensi: iOS membuang utterance di tengah bicara
      if (speechSynthesis.paused) speechSynthesis.resume();
      if (lead && k === 0) { // jeda super pendek: iOS/Android sering memotong suku kata pertama kata pendek
        try { const w = new SpeechSynthesisUtterance('、'); w._xb = 1; w.volume = 0; w.rate = 1.4; w.lang = u.lang; try { if (v) w.voice = v; } catch (e) {} this.w = w; speechSynthesis.speak(w); } catch (e) {}
      }
      speechSynthesis.speak(u);
      clearTimeout(this.dog);
      this.dog = setTimeout(() => { try { if (speechSynthesis.speaking) speechSynthesis.cancel(); } catch (e) {} fin({ type: 'end' }); }, 3000 + txt.length * 420 / Math.max(0.5, u.rate));
    } catch (e) { k++; next(); }
  };
  // jeda kecil sesudah cancel(): Chrome/Android kadang menjatuhkan utterance yang diucapkan di tick yang sama
  this.t = setTimeout(next, 40);
};
TTS.speak = function (text, rate) {
  if (!text) return;
  if (this.cloud && this.cloud.enabled() && !this.cloud.down()) {
    this.stop(); const run = this.run;
    this.cloud.play(String(text), rate).catch(() => { if (run === this.run) this.speakWith(this.voice, text, rate); });
    return;
  }
  if (!this.ok) return;
  this.speakWith(this.voice, text, rate);
};
// semua jalur lain (Dengar 50, tema, TOCFL, kalimat) memanggil speechSynthesis.speak langsung dengan TTS.voice:
// sesuaikan kecepatannya dengan jenis suara supaya terdengar alami juga di sana
try {
  if (TTS.ok && !speechSynthesis._xbWrap) {
    const sp0 = speechSynthesis.speak.bind(speechSynthesis);
    speechSynthesis.speak = function (u) {
      try { if (u && !u._xb && u.voice && VOICE.list.some(x => x.v === u.voice)) { u._xb = 1; u.rate = VOICE.rate(u.rate || 1, u.voice) ; } } catch (e) {}
      return sp0(u);
    };
    speechSynthesis._xbWrap = 1;
  }
} catch (e) {}

/* ---------- adaptor suara cloud (mati secara bawaan; tanpa kunci di app) ----------
   S.settings.ttsCloud = URL endpoint (mis. Supabase Edge Function yang memanggil Azure zh-TW-HsiaoChenNeural).
   Kontrak: GET {url}?text=..&voice=..&rate=..  →  audio/mpeg. Hasil disimpan di Cache Storage per teks. */
TTS.cloud = {
  voice: 'zh-TW-HsiaoChenNeural', cache: 'xb-tts-v1', au: null, failT: 0, mem: new Map(),
  url() { try { return String((S.settings && S.settings.ttsCloud) || '').trim(); } catch (e) { return ''; } },
  enabled() { return /^https:\/\//i.test(this.url()); },
  down() { return Date.now() < this.failT || (typeof navigator.onLine === 'boolean' && !navigator.onLine && !this.mem.size); },
  playing() { return !!(this.au && !this.au.paused && !this.au.ended); },
  halt() { if (this.au) { try { this.au.pause(); } catch (e) {} this.au = null; } },
  key(text, rate) { const r = Math.round((+rate || S.settings.rate || 0.85) * 20) / 20; const q = new URLSearchParams({ text: String(text).replace(/[()（）]/g, '').trim(), voice: this.voice, rate: String(r) }); return this.url() + (this.url().includes('?') ? '&' : '?') + q.toString(); },
  async blob(text, rate) {
    const k = this.key(text, rate); if (this.mem.has(k)) return this.mem.get(k);
    let res = null, c = null;
    try { if (window.caches) { c = await caches.open(this.cache); res = await c.match(k); } } catch (e) {}
    if (!res) {
      const ctl = window.AbortController ? new AbortController() : null; const to = setTimeout(() => ctl && ctl.abort(), 6000);
      try { res = await fetch(k, { signal: ctl ? ctl.signal : undefined }); } finally { clearTimeout(to); }
      if (!res.ok || !/audio|octet/i.test(res.headers.get('content-type') || 'audio/mpeg')) throw new Error('cloud ' + res.status);
      try { if (c) await c.put(k, res.clone()); } catch (e) {}
    }
    const url = URL.createObjectURL(await res.blob()); this.mem.set(k, url);
    if (this.mem.size > 300) { const f = this.mem.keys().next().value; URL.revokeObjectURL(this.mem.get(f)); this.mem.delete(f); }
    return url;
  },
  async play(text, rate) {
    const run = TTS.run;
    try {
      const src = await this.blob(text, rate); if (run !== TTS.run) return;
      this.halt(); const a = new Audio(src); this.au = a; a.playbackRate = 1;
      await a.play();
    } catch (e) { this.failT = Date.now() + 60000; throw e; }
  },
};

/* ---------- PEMILIH SUARA (modal) ---------- */
const VP = { plat: null, guide: null };
const VP_GUIDE = {
  ios: { name: 'iPhone / iPad', steps: [
    'Buka <b>Pengaturan</b> → <b>Aksesibilitas</b> → <b>Konten Lisan</b> → <b>Suara</b>.',
    'Pilih <b>Chinese (Taiwan)</b> / <b>中文（台灣）</b>.',
    'Ketuk <b>Mei-Jia</b> → unduh versi <b>Premium</b> (paling alami) atau <b>Ditingkatkan</b> (Enhanced). Butuh Wi-Fi, ±100–400 MB.',
    'Tutup app ini sepenuhnya lalu buka lagi — pilih Mei-Jia Premium di daftar di atas (atau biarkan Otomatis).'] },
  android: { name: 'Android', steps: [
    'Pasang/perbarui <b>Speech Services by Google</b> (Google TTS) dari Play Store.',
    'Buka <b>Setelan</b> → cari <b>Text-to-speech</b> (Output text-to-speech) → mesin pilihan: <b>Speech Services by Google</b>.',
    'Ketuk ikon gerigi → <b>Instal data suara</b> → <b>Chinese (Taiwan)</b> / 中文（台灣） → unduh, lalu pilih suara yang terdengar paling alami.',
    'HP Samsung: ganti mesin dari Samsung TTS ke Google agar suara Taiwan tersedia. Lalu buka ulang app.'] },
  win: { name: 'Windows', steps: [
    'Paling mudah: buka app ini di <b>Microsoft Edge</b> — Edge punya suara online <b>Natural</b> gratis (HsiaoChen, HsiaoYu, YunJhe) yang sangat alami.',
    'Di Edge, pilih <b>HsiaoChen</b> di daftar di atas. Butuh internet.',
    'Untuk suara offline: <b>Settings</b> → <b>Time & language</b> → <b>Speech</b> → <b>Add voices</b> → <b>Chinese (Traditional, Taiwan)</b>.',
    'Pasang app sebagai PWA dari Edge (menu ⋯ → Apps → Install) supaya suara Natural selalu tersedia.'] },
  mac: { name: 'Mac', steps: [
    'Buka <b>System Settings</b> → <b>Accessibility</b> → <b>Spoken Content</b> → <b>System Voice</b> → <b>Manage Voices…</b>',
    'Cari <b>Chinese (Taiwan)</b> → centang <b>Mei-Jia (Premium)</b> atau <b>(Enhanced)</b> lalu unduh.',
    'Safari dan Chrome akan memakainya setelah browser dibuka ulang. Di Chrome juga ada <b>Google 國語（臺灣）</b> (online).'] },
  other: { name: 'Chrome / Linux', steps: [
    'Pakai <b>Google Chrome</b> atau <b>Microsoft Edge</b> terbaru — keduanya punya suara Mandarin online gratis (Google 國語 / Microsoft HsiaoChen Natural).',
    'Pastikan perangkat tersambung internet saat pertama memutar suara.'] },
};
const VP_PLATS = ['ios', 'android', 'win', 'mac', 'other'];
function vpTags(x) {
  const q = x.tag;
  return `<span class="vp-tag q-${q}">${VOICE.tagLabel(x)}</span><span class="vp-tag ${x.tw ? 'r-tw' : 'r-cn'}">${x.tw ? t('Taiwan') : t('Tiongkok')}</span><span class="vp-tag dim">${x.local ? t('Offline') : t('Online')}</span>`;
}
function vpRow(x, sel, best) {
  return `<div class="vp-row${sel ? ' on' : ''}" role="radio" aria-checked="${sel}" tabindex="0" data-a="vpSel" data-v="${esc(x.id)}">
    <span class="vp-dot" aria-hidden="true"></span>
    <span class="vp-main"><b>${esc(x.short)}${best ? ` <span class="vp-best">${ICON('sparkle')}${t('Terbaik')}</span>` : ''}</b><span class="vp-tags">${vpTags(x)}</span></span>
    <button class="vp-play" data-a="vpPrev" data-v="${esc(x.id)}" aria-label="${t('Dengar contoh')}">${ICON('play')}</button></div>`;
}
function vpPct(r) { return Math.round((Math.max(0.6, Math.min(1.1, r)) - 0.6) / 0.5 * 100); }
function vpRateName(r) { return r <= 0.68 ? t('Pelan') : r < 0.8 ? t('Sedang') : r <= 0.9 ? t('Normal') : t('Cepat'); }
function vpHTML() {
  VOICE.scan();
  const auto = !S.settings.voice || !VOICE.find(S.settings.voice); const cur = VOICE.cur(); const best = VOICE.best();
  const tier = voiceTier(); const p = VP.plat || (VP.plat = VOICE.plat());
  const weak = tier < 2; if (VP.guide === null) VP.guide = weak;
  const r = +S.settings.rate || 0.85;
  const tw = VOICE.list.filter(x => x.tw), cn = VOICE.list.filter(x => !x.tw);
  const nudge = !TTS.ok ? t('Browser ini tidak mendukung suara. Coba Chrome, Edge, atau Safari terbaru.')
    : !VOICE.list.length ? t('Belum ada suara Mandarin di perangkat ini. Pasang suara gratis lewat panduan di bawah — cuma beberapa menit.')
    : tier === 0 ? t('Suara yang tersedia masih kaku. Pasang suara premium gratis lewat panduan di bawah supaya nadanya jelas.')
    : tier === 1 && !(cur && cur.tw) ? t('Belum ada suara Taiwan — sementara memakai logat Tiongkok. Pasang suara Taiwan gratis lewat panduan di bawah.')
    : tier === 1 ? t('Suara ini standar. Ada versi yang jauh lebih alami (gratis) — lihat panduan di bawah.') : '';
  const g = VP_GUIDE[p] || VP_GUIDE.other;
  return `<div class="vp">
  <div class="vp-head"><span class="vp-ic">${ICON('headphone')}</span><div><h2>${t('Suara pelafalan')}</h2><p class="muted small">${t('Pilih suara Mandarin paling alami di perangkat ini.')}</p></div></div>
  <div class="vp-now">
    <div class="vp-now-l"><span class="small muted">${t('Sedang dipakai')}</span><b class="vp-now-n">${cur ? esc(cur.short) : t('Tidak ada suara Mandarin')}</b>${cur ? `<span class="vp-tags">${vpTags(cur)}</span>` : ''}</div>
    ${cur || (TTS.cloud.enabled() && !TTS.cloud.down()) ? `<button class="btn pri vp-try" data-a="vpPrev" data-v="">${ICON('speaker')}<span>${t('Dengar contoh')}</span></button>` : ''}
  </div>
  ${nudge ? `<div class="vp-nudge">${ICON('info')}<span>${nudge}</span></div>` : ''}
  <div class="vp-rate"><div class="vp-rate-h"><b>${t('Kecepatan bicara')}</b><span class="vp-rate-v" id="vpRateV">${vpRateName(r)} · ${r.toFixed(2)}×</span></div>
    <input type="range" min="0.6" max="1.1" step="0.05" value="${r}" style="--p:${vpPct(r)}%" data-vprate aria-label="${t('Kecepatan bicara')}">
    <div class="vp-rate-s"><span>${t('Pelan')}</span><span>${t('Normal')}</span><span>${t('Cepat')}</span></div></div>
  ${VOICE.list.length ? `<div class="vp-list" role="radiogroup" aria-label="${t('Suara di perangkat ini')}">
    <div class="vp-row auto${auto ? ' on' : ''}" role="radio" aria-checked="${auto}" tabindex="0" data-a="vpSel" data-v="">
      <span class="vp-dot" aria-hidden="true"></span><span class="vp-main"><b>${t('Otomatis (terbaik)')}</b><span class="small muted">${best ? t('Memilih {v} — berubah sendiri kalau ada suara lebih bagus', { v: esc(best.short) }) : ''}</span></span>
      <span class="vp-ic2">${ICON('sparkle')}</span></div>
    ${tw.length ? `<div class="vp-grp">${t('Mandarin Taiwan')} · 國語</div>${tw.map(x => vpRow(x, !auto && cur && x.v === cur.v, x === best)).join('')}` : ''}
    ${cn.length ? `<div class="vp-grp">${t('Mandarin Tiongkok')} · 普通话</div>${cn.map(x => vpRow(x, !auto && cur && x.v === cur.v, x === best)).join('')}` : ''}
  </div>` : ''}
  <details class="vp-guide" ${VP.guide ? 'open' : ''} data-vpguide>
    <summary>${ICON('download')}<span>${t('Dapatkan suara premium gratis')}</span>${ICON('chevron', 'vp-chev')}</summary>
    <div class="vp-plats" role="tablist">${VP_PLATS.map(k => `<button class="chip${k === p ? ' on' : ''}" role="tab" aria-selected="${k === p}" data-a="vpPlat" data-v="${k}">${k === VOICE.plat() ? '<i class="vp-here" aria-hidden="true"></i>' : ''}${VP_GUIDE[k].name}</button>`).join('')}</div>
    <ol class="vp-steps">${g.steps.map(s => `<li>${t(s)}</li>`).join('')}</ol>
    <p class="small muted vp-foot">${t('Semua suara ini gratis dari sistem perangkatmu. Setelah dipasang, pilih “Otomatis” dan app memakai yang terbaik.')}</p>
  </details>
  <details class="vp-adv"><summary>${t('Lanjutan')} · ${t('suara cloud (opsional)')}</summary>
    <p class="small muted">${t('URL endpoint TTS neural (mis. Supabase Edge Function → Azure zh-TW-HsiaoChenNeural). Kosongkan untuk mematikan. Jika gagal, otomatis kembali ke suara perangkat.')}</p>
    <div class="row vp-adv-r"><input class="sel grow" type="url" inputmode="url" placeholder="https://…/functions/v1/tts" value="${esc(S.settings.ttsCloud || '')}" data-vpcloud aria-label="URL"><button class="btn sec small" data-a="vpCloud">${t('Simpan')}</button></div>
  </details>
</div>`;
}
function vpRefresh() {
  const sh = document.querySelector('.vp-sheet'); if (!sh) return;
  const g = sh.querySelector('[data-vpguide]'); if (g) VP.guide = g.open;
  const box = sh.querySelector('.vp'); const y = sh.scrollTop;
  if (box) box.outerHTML = vpHTML(); sh.scrollTop = y;
}
Object.assign(ACT, {
  voicepick: () => { VP.guide = null; VP.plat = null; if (TTS.unlock) TTS.unlock(); if (TTS.ok) TTS.pick(); openModal(vpHTML(), 'vp-sheet'); },
  vpSel: b => {
    const id = b.dataset.v || ''; S.settings.voice = id; save();
    if (TTS.ok) TTS.pick(); vpRefresh();
    if (TTS.voice) TTS.speak(VOICE.sample);
    if (typeof ROUTE !== 'undefined' && ROUTE === 'me' && typeof onVoices === 'function') { /* render ulang Saya saat modal ditutup */ VP.dirty = 1; }
  },
  vpPrev: b => {
    const id = b.dataset.v; const x = id ? VOICE.find(id) : VOICE.cur();
    document.querySelectorAll('.vp .playing').forEach(e => e.classList.remove('playing'));
    b.classList.add('playing'); const clr = () => b.classList.remove('playing');
    if (!id && TTS.cloud.enabled() && !TTS.cloud.down()) { TTS.speak(VOICE.sample); setTimeout(clr, 3500); return; }
    if (!x) return clr();
    TTS.speakWith(x.v, VOICE.sample, undefined, clr); setTimeout(clr, 9000);
  },
  vpPlat: b => { VP.plat = b.dataset.v; VP.guide = true; vpRefresh(); },
  vpCloud: () => {
    const i = document.querySelector('[data-vpcloud]'); const v = i ? i.value.trim() : '';
    if (v && !/^https:\/\//i.test(v)) { toast(t('URL harus diawali https://')); return; }
    S.settings.ttsCloud = v; TTS.cloud.failT = 0; save(); toast(v ? t('Suara cloud aktif — cadangan: suara perangkat') : t('Suara cloud dimatikan')); vpRefresh();
  },
});
document.addEventListener('input', e => {
  const el = e.target; if (!el || !el.matches || !el.matches('[data-vprate]')) return;
  const r = Math.round(+el.value * 20) / 20; const lab = document.getElementById('vpRateV'); if (lab) lab.textContent = `${vpRateName(r)} · ${r.toFixed(2)}×`; el.style.setProperty('--p', vpPct(r) + '%');
});
document.addEventListener('change', e => {
  const el = e.target; if (!el || !el.matches || !el.matches('[data-vprate]')) return;
  S.settings.rate = Math.round(+el.value * 20) / 20; save(); if (TTS.voice || TTS.cloud.enabled()) TTS.speak('今天我們一起學中文吧！');
});
document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target && e.target.classList && e.target.classList.contains('vp-row')) { e.preventDefault(); e.target.click(); }
});
// Saya: render ulang sesudah modal ditutup supaya label suara baru tampil
const vpCloseBase = closeModal;
closeModal = function () { const was = !!document.querySelector('.vp-sheet'); vpCloseBase.apply(this, arguments); if (was && VP.dirty) { VP.dirty = 0; try { if (ROUTE === 'me' && !SES) { const y = scrollY; render(); scrollTo(0, y); } } catch (e) {} } };

/* ---------- entri di Saya → Suara & nada ---------- */
function vpSetRow() {
  const tier = voiceTier(); const c = VOICE.cur();
  const warn = TTS.ok && tier < 2;
  return `<div class="set vp-set"><div class="l"><b>${t('Suara pelafalan')}</b><span class="vp-set-s"><span class="vp-set-n">${c && !(TTS.cloud.enabled() && !TTS.cloud.down()) ? esc(c.short) : esc(voiceLabel())}</span>${c ? `<span class="vp-tags">${vpTags(c)}</span>` : ''}${warn ? `<span class="vp-warn">${t('Bisa lebih alami — lihat panduan di Pilih suara')}</span>` : ''}</span></div>
    <button class="btn sec small" data-a="voicepick">${ICON('headphone')} ${t('Pilih suara')}</button></div>`;
}
const vpMeBase = vMe;
vMe = function () {
  let h = vpMeBase.apply(this, arguments);
  try {
    const lab = `<b>${t('Suara pelafalan')}</b>`; const k = h.indexOf(lab);
    if (k > 0) {
      const a = h.lastIndexOf('<div class="set">', k);
      const nx = h.indexOf('<div class="set">', k);
      if (a >= 0 && nx > a) h = h.slice(0, a) + vpSetRow() + h.slice(nx);
    }
    // ganti catatan lama "Supaya logat Taiwan asli…" (panduan sekarang ada di pemilih suara)
    h = h.replace(/<div class="notice" style="margin-top:12px">[^<]*<\/div><\/section>/, '</section>');
  } catch (e) {}
  return h;
};
// dipakai l50 untuk 'zh' — sudah memakai TTS.voice; bahasa lain tetap memakai pemilih bawaan
if (typeof l50Voice === 'function') { const vpL50 = l50Voice; l50Voice = function (lang) { if (lang === 'zh') return TTS.voice || null; return vpL50.apply(this, arguments); }; }