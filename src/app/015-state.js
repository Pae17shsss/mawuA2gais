/* ========== STATE ========== */
const KEY = 'xiaobu.v1';
const defaultState = () => ({
  hzWrite: {}, gram: {},
  v: 1, created: Date.now(), name: '', onboarded: false,
  start: todayKey(), targetDays: 70,
  settings: { langs: { id: true, en: true, tl: true }, primary: 'id', ui: 'id', kbd: 'app', toneCue: true, echo: true, sound: true, autoplay: true, rate: 0.85, voice: '', theme: 'auto', pinyin: 'mark' },
  cards: {}, days: {}, xp: 0,
  streak: { cur: 0, best: 0, last: '', freeze: 0 },
  adapt: { type: {}, tc: [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]], hours: new Array(24).fill(0), hoursOk: new Array(24).fill(0), rt: 4000, size: 18, done: 0, quit: 0, sessions: [] },
  stories: {}, hzKnown: {}, badges: {}
});
let S;
function mergeObj(t, d) { for (const k in d) { if (t[k] === undefined || t[k] === null || (typeof d[k] === 'object') !== (typeof t[k] === 'object') || Array.isArray(d[k]) !== Array.isArray(t[k])) t[k] = d[k]; } return t; }
function load() {
  let raw = null; let rawText = null;
  try { rawText = localStorage.getItem(KEY); } catch (e) { rawText = null; }
  try { raw = JSON.parse(rawText); } catch (e) { raw = null; }
  const d = defaultState();
  const rawOk = raw && typeof raw === 'object' && !Array.isArray(raw);
  // V1.7: data yang ada tapi tidak terbaca tidak boleh tertimpa state kosong — karantina dulu
  if (!rawOk && rawText && rawText.length > 2) quarantineState(rawText, 'parse');
  S = rawOk ? raw : d;
  try {
    mergeObj(S, d); mergeObj(S.settings, d.settings); mergeObj(S.adapt, d.adapt); mergeObj(S.streak, d.streak); mergeObj(S.settings.langs, d.settings.langs);
    const a = S.adapt;
    if (a.tc.length !== 5 || a.tc.some(r => !Array.isArray(r) || r.length !== 5)) a.tc = d.adapt.tc;
    if (a.hours.length !== 24) a.hours = d.adapt.hours; if (a.hoursOk.length !== 24) a.hoursOk = d.adapt.hoursOk;
    if (a.sessions.length > 40) a.sessions = a.sessions.slice(-40);
    a.size = clamp(+a.size || 18, 10, 30); a.rt = clamp(+a.rt || 4000, 800, 30000);
    for (const k in S.cards) { const c = S.cards[k]; if (!W[k] || !c || typeof c !== 'object' || !isFinite(c.due) || !isFinite(c.iv)) delete S.cards[k]; else {
      c.ef = clamp(+c.ef || 2.4, 1.3, 3); c.lp = c.lp | 0; c.st = c.st | 0; c.r = c.r | 0;
      // bidang FSRS: buang yang rusak supaya dimigrasi ulang dengan aman
      if (c.s !== undefined && !(isFinite(+c.s) && +c.s > 0)) { delete c.s; delete c.d; delete c.lrated; }
      if (c.d !== undefined && !isFinite(+c.d)) c.d = 5;
      if (c.lr !== undefined && !isFinite(+c.lr)) c.lr = c.ls || Date.now();
      if (c.s !== undefined) { c.s = +c.s; c.d = clamp(+c.d || 5, 1, 10); }
    } }
    if (!S.listen || typeof S.listen !== 'object' || Array.isArray(S.listen)) S.listen = {};
    if (!Array.isArray(S.memLog)) S.memLog = [];
    for (const k in S.days) { const r = S.days[k]; if (!r || typeof r !== 'object') delete S.days[k]; else if (r.q && (!Array.isArray(r.q) || r.q.some(q => !q || !QMETA[q.id]))) { delete r.q; delete r.plan; } }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(S.start)) S.start = todayKey();
    if (!UI_LANGS.includes(S.settings.ui)) S.settings.ui = 'id';
    // bahasa arti ikut bahasa aplikasi, kecuali pengguna sengaja memilih lain di Pengaturan
    if (S.settings.primarySet === undefined) S.settings.primarySet = S.settings.ui !== 'vi' && S.settings.primary !== 'id' && MEAN_LANGS.includes(S.settings.primary) && S.settings.primary !== S.settings.ui;   // 'id' = bawaan lama, bukan pilihan   // data lama: pilihan sengaja tetap dihormati, kecuali pengguna Vietnam
    if (!MEAN_LANGS.includes(S.settings.primary) || !S.settings.primarySet) S.settings.primary = S.settings.ui;
    if (!S.settings.langs || typeof S.settings.langs !== 'object') S.settings.langs = {};
    if (!S.settings.langsSet && S.settings.primary === 'vi') S.settings.langs = { vi: true, en: true };   // pengguna Vietnam lama: jangan tampilkan subtitel Indonesia
    S.settings.langs[S.settings.primary] = true;
    if (!S.hzWrite || typeof S.hzWrite !== 'object') S.hzWrite = {};
    if (!S.gram || typeof S.gram !== 'object') S.gram = {};
    if (S.slang && typeof S.slang !== 'object') S.slang = {};
    if (S.game && typeof S.game !== 'object') S.game = {};
    S.targetDays = clamp(+S.targetDays || 70, 20, 365);
  } catch (e) { console.warn('state repair failed, resetting', e); quarantineState(rawText, 'repair'); S = d; }
}
/* V1.7: simpan salinan mentah state yang gagal dibaca/diperbaiki sebelum app lanjut dengan state baru.
   Kalau salinan tidak bisa dibuat (kuota penuh), penyimpanan dikunci supaya data lama tetap utuh di tempatnya. */
function quarantineState(text, why) {
  if (!text) return;
  const qk = 'xiaobu.karantina.' + Date.now();
  let copied = false;
  try { localStorage.setItem(qk, text); copied = true; } catch (e) {}
  if (!copied) SAVE_LOCK = true;
  window.__xbQuarantine = { key: copied ? qk : KEY, why, locked: !copied, n: text.length };
}
let saveT = 0;
let SAVE_FAIL = false;
let SAVE_LOCK = false;   // dikunci saat memulihkan cadangan supaya data lama tidak menimpa yang baru
function save(now) {
  clearTimeout(saveT); if (SAVE_LOCK) return;
  const f = () => {
    try { localStorage.setItem(KEY, JSON.stringify(S)); SAVE_FAIL = false; }
    catch (e) { if (!SAVE_FAIL) { SAVE_FAIL = true; toast(t('⚠️ Progres tidak bisa disimpan di browser ini. Di iPhone, matikan mode Penjelajahan Pribadi, lalu buka ulang app.'), 5000); } }
  };
  now ? f() : (saveT = setTimeout(f, 300));
}
window.addEventListener('pagehide', () => save(true));
document.addEventListener('visibilitychange', () => { if (document.hidden) save(true); });
