/* ========== Kelas V0.5: DUEL HANZI — 漢字對決 ==========
   1 lawan 1. Tiap pemain punya HP. Jawab kartu aturan (arti / pinyin / dengar / nada / gambar) dengan hanzi yang benar
   → hanzi itu melesat menyerang lawan. Tiap 3 jawaban benar beruntun → COMBO: susun potongan kata jadi kalimat utuh
   → serangan pamungkas. Energi bisa dipakai untuk 盾 perisai, 霧 kabut (mengaburkan pilihan lawan), 治 pulihkan HP.
   Mode: ONLINE (Supabase Realtime: room kode / lawan acak), 2 PEMAIN di 1 HP (layar dibagi), VS BOT.
   Online: kedua HP memakai seed yang sama → urutan soal identik (adil); yang dikirim hanya aksi kecil (serangan, status). */

const DL_VER = 'k05';
const DL_SB = {
  url: 'https://axstnlhqkdsavyhnnsaw.supabase.co',
  keys: ['sb_publishable_FMRtywW2Id7XsOvt_iT-xA_2XPzA15U',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4c3RubGhxa2RzYXZ5aG5uc2F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyOTg1MDcsImV4cCI6MjEwNjg3NDUwN30._BatJd187iva7jqzbH_ZZ8IZd3h0dgG3sA1Imr4utSM'],
  libs: ['https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js', 'https://unpkg.com/@supabase/supabase-js@2/dist/umd/supabase.min.js']
};
const DL_HP = 200, DL_DUR = 150, DL_QT = 9000, DL_EN = 100;
const DL_SK = { sh: { hz: '盾', c: 30, nm: 'Perisai', d: 'Tahan 1 serangan berikutnya (10 detik)' }, fog: { hz: '霧', c: 40, nm: 'Kabut', d: 'Pilihan jawaban lawan jadi buram 4 detik' }, heal: { hz: '治', c: 45, nm: 'Pulih', d: '+25 HP' } };
const DL_AV = [['龍', 'Naga', '#ff3d6e', '#ffb03a'], ['虎', 'Harimau', '#ff7a1a', '#ffd84a'], ['鳳', 'Phoenix', '#ff3fd2', '#ffa6f0'], ['熊', 'Beruang', '#a3683c', '#f2c089'], ['貓', 'Kucing', '#10c7b2', '#9cffe9'], ['鷹', 'Elang', '#2d76ff', '#93cdff'], ['龜', 'Kura-kura', '#20b955', '#c4ff6e'], ['狐', 'Rubah', '#f5a300', '#fff27a']];
const DL_BOTS = {
  easy: { nm: 'Bot Bambu', acc: 0.68, t: [3600, 6800], cmb: 0.45, sk: 0.35 },
  normal: { nm: 'Bot Naga', acc: 0.8, t: [2500, 5000], cmb: 0.65, sk: 0.55 },
  hard: { nm: 'Bot Kaisar', acc: 0.9, t: [1700, 3500], cmb: 0.85, sk: 0.8 }
};
const DL_RULE = { mean: ['意思', 'Arti → hanzi'], py: ['拼音', 'Pinyin → hanzi'], aud: ['聽', 'Dengar → hanzi'], tone: ['聲調', 'Pola nada → hanzi'], pic: ['圖', 'Gambar → huruf'] };
const DL_CODE_CH = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

let DL = null;                       // pertandingan yang sedang berjalan
const DLX = { scr: 'title', id: Math.random().toString(36).slice(2, 12), room: null, lobby: null, botDiff: 'normal', err: '' };

/* ---------- profil & materi ---------- */
function dlProf() {
  const st = klState();
  if (!st.duel || typeof st.duel !== 'object') st.duel = {};
  const d = st.duel;
  if (!d.name) d.name = t('Pemain') + ' ' + Math.floor(100 + Math.random() * 900);
  if (!(d.av >= 0 && d.av < DL_AV.length)) d.av = Math.floor(Math.random() * DL_AV.length);
  ['w', 'l', 'd', 'best', 'games'].forEach(k => { d[k] = +d[k] || 0; });
  if (!Array.isArray(d.hist)) d.hist = [];
  if (!d.scope) d.scope = 'all';
  if (!Array.isArray(d.custom)) d.custom = [];
  return d;
}
function dlScopeNs(scope, custom) {
  if (scope === 'custom') { const c = (custom || []).filter(n => KL(n)); return c.length ? c : KLS.map(L => L.n); }
  if (scope === 'all') return KLS.map(L => L.n);
  return KLS.filter(L => L.course === scope).map(L => L.n);
}
function dlScopeLabel(ns) {
  const all = KLS.map(L => L.n);
  if (ns.length === all.length) return t('Semua lesson');
  for (const c of COURSES) { const cs = KLS.filter(L => L.course === c.k).map(L => L.n); if (cs.length === ns.length && cs.every(n => ns.includes(n))) return c.k === 'b1' ? '當代中文 B1' : c.k === 'sd' ? '時代華語 1' : '華語準備級'; }
  return ns.map(lnShort).join(', ').slice(0, 24);
}
function dlPool(ns) {
  const ml = meanLang(); const seen = new Set(); const out = [];
  ns.forEach(n => (KL(n) ? KL(n).vocab : []).forEach(v => {
    const hz = v.hz; if (!hz || seen.has(hz) || !/^[㐀-鿿]{1,4}$/.test(hz)) return; seen.add(hz);
    out.push({ hz, py: v.py || '', t: Array.isArray(v.t) ? v.t : [], m: shortMean(v[ml] || v.en || ''), n });
  }));
  return out;
}
function dlSents(ns) {
  const out = []; ns.forEach(n => ((KL(n) && KL(n).reorder) || []).forEach(r => { if (r.chunks && r.chunks.length >= 3 && r.chunks.length <= 7) out.push(r); }));
  return out;
}

/* ---------- acak berbenih (sama di kedua HP) ---------- */
function dlRng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let x = a; x = Math.imul(x ^ (x >>> 15), x | 1); x ^= x + Math.imul(x ^ (x >>> 7), x | 61); return ((x ^ (x >>> 14)) >>> 0) / 4294967296; }; }
const dlRi = (r, n) => Math.floor(r() * n);
function dlShuf(a, r) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = dlRi(r, i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; }

/* ---------- pembuat soal ---------- */
const dlPyKey = x => (x.py || '').replace(/\s+/g, '').toLowerCase();
function dlGen(r, D) {
  const pool = D.pool; const picOK = D.picOK; const toneOK = D.toneOK;
  const types = ['mean', 'mean', 'mean', 'mean', 'py', 'py', 'py'];
  if (!D.noAud) types.push('aud', 'aud', 'aud');
  if (toneOK.length >= 8) types.push('tone', 'tone');
  if (picOK.length >= 6) types.push('pic');
  for (let tries = 0; tries < 30; tries++) {
    const ty = types[dlRi(r, types.length)];
    const src = ty === 'pic' ? picOK : ty === 'tone' ? toneOK : pool;
    const a = src[dlRi(r, src.length)];
    const key = ty === 'mean' ? x => x.m : ty === 'tone' ? x => x.t.join('') : ty === 'pic' ? x => x.hz : dlPyKey;
    if (ty === 'mean' && !a.m) continue;
    let cand = (ty === 'pic' ? picOK : ty === 'tone' ? toneOK.filter(x => x.hz.length === a.hz.length) : pool).filter(x => x.hz !== a.hz && key(x) !== key(a) && !(ty === 'mean' && !x.m));
    if (ty !== 'pic' && ty !== 'tone') { const same = cand.filter(x => x.hz.length === a.hz.length); if (same.length >= 6) cand = same; }
    cand = dlShuf(cand, r);
    const ds = []; const used = new Set([a.hz]); const keys = new Set([key(a)]);
    for (const x of cand) { if (ds.length >= 3) break; if (used.has(x.hz) || (ty === 'tone' && keys.has(key(x)))) continue; used.add(x.hz); keys.add(key(x)); ds.push(x); }
    if (ds.length < 3) continue;
    const opts = dlShuf([a, ...ds], r);
    return { ty, a, opts, ai: opts.indexOf(a) };
  }
  const opts = dlShuf(pool.slice(0, 4), r); return { ty: 'mean', a: opts[0], opts, ai: 0 };
}
function dlSent(r, D) {
  const s = D.sents[dlRi(r, D.sents.length)]; if (!s) return null;
  let order = s.chunks.map((c, i) => i);
  for (let k = 0; k < 6; k++) { order = dlShuf(order, r); if (order.some((v, i) => v !== i)) break; }
  return { s, order };
}

/* ---------- SFX (WebAudio, tanpa file) & musik ---------- */
GA.SONGS.duel = { bpm: 150,
  bass: [45, 45, 57, 45, 45, 57, 45, 52, 41, 41, 53, 41, 41, 53, 41, 48, 43, 43, 55, 43, 43, 55, 43, 50, 40, 40, 52, 40, 44, 47, 52, 56],
  lead: [76, 0, 79, 81, 0, 79, 76, 74, 72, 0, 74, 76, 0, 72, 69, 0, 74, 0, 76, 79, 0, 81, 79, 76, 75, 0, 76, 0, 80, 0, 83, 0] };
GA.SONGS.lobby = { bpm: 112,
  bass: [45, 0, 0, 45, 0, 0, 52, 0, 41, 0, 0, 41, 0, 0, 48, 0, 43, 0, 0, 43, 0, 0, 50, 0, 40, 0, 0, 40, 0, 44, 47, 0],
  lead: [69, 0, 72, 0, 76, 0, 0, 74, 72, 0, 0, 0, 69, 0, 0, 0, 71, 0, 74, 0, 79, 0, 0, 76, 75, 0, 0, 0, 0, 0, 0, 0] };
function DS(n, x = 0) {
  try {
    if (!GA.ok()) return;
    const N = f => 440 * Math.pow(2, (f - 69) / 12); const T = (...a) => GA.tone(...a); const Z = (...a) => GA.noise(...a);
    switch (n) {
      case 'sel': T(N(86), 0, 0.04, 'triangle', 0.12); break;
      case 'ok': T(N(84), 0, 0.08, 'square', 0.1); T(N(91), 0.06, 0.16, 'square', 0.1); T(N(96), 0.06, 0.2, 'triangle', 0.08); break;
      case 'fire': T(N(60), 0, 0.22, 'sawtooth', 0.07, null, N(98)); Z(0, 0.2, 0.16, 3000, null, 0.6); break;
      case 'hit': GA.play('hit', x); T(72, 0, 0.18, 'sine', 0.35, null, 40); break;
      case 'crit': GA.play('crit'); T(62, 0, 0.4, 'sine', 0.5, null, 28); break;
      case 'hurt': GA.play('hurt'); break;
      case 'bad': GA.play('wrong'); break;
      case 'combo': [60, 64, 67, 72, 76, 79, 84, 88].forEach((m, i) => T(N(m), i * 0.04, 0.12, 'square', 0.08)); Z(0, 0.4, 0.15, 1200, null, 0.3); break;
      case 'chunk': T(N(72 + x * 2), 0, 0.09, 'square', 0.1); T(N(79 + x * 2), 0.04, 0.12, 'triangle', 0.08); break;
      case 'ult': Z(0, 0.8, 0.45, 700, null, 0.3); T(55, 0, 0.8, 'sawtooth', 0.25, null, 30); [72, 76, 79, 84, 88, 91, 96].forEach((m, i) => T(N(m), 0.1 + i * 0.05, 0.2, 'square', 0.09)); break;
      case 'shield': T(N(88), 0, 0.3, 'triangle', 0.12); T(N(95), 0.03, 0.4, 'sine', 0.1); Z(0, 0.15, 0.12, 6000); break;
      case 'block': T(N(100), 0, 0.12, 'square', 0.1); T(N(93), 0.05, 0.25, 'triangle', 0.1); Z(0, 0.08, 0.25, 5000); break;
      case 'heal': [76, 81, 84, 88, 93].forEach((m, i) => T(N(m), i * 0.06, 0.25, 'sine', 0.12)); break;
      case 'fog': Z(0, 0.9, 0.25, 400, null, 0.3); T(N(48), 0, 0.8, 'triangle', 0.12, null, N(43)); break;
      case 'count': T(N(76), 0, 0.14, 'square', 0.12); break;
      case 'fight': [67, 72, 76, 79].forEach((m, i) => T(N(m), i * 0.06, 0.2, 'square', 0.12)); T(N(84), 0.24, 0.55, 'sawtooth', 0.1); Z(0.2, 0.4, 0.2, 2000); break;
      case 'ko': Z(0, 1.2, 0.5, 300, null, 0.4); T(80, 0, 1.2, 'sawtooth', 0.3, null, 25); break;
      case 'win': GA.play('clear'); break;
      case 'lose': GA.play('over'); break;
      case 'tick': T(N(98), 0, 0.03, 'square', 0.07); break;
      case 'low': T(65, 0, 0.12, 'sine', 0.32, null, 45); T(60, 0.18, 0.14, 'sine', 0.26, null, 40); break;
      case 'join': [79, 84, 91].forEach((m, i) => T(N(m), i * 0.07, 0.16, 'triangle', 0.12)); break;
      case 'slam': Z(0, 0.35, 0.4, 500, null, 0.4); T(90, 0, 0.4, 'square', 0.25, null, 35); break;
      case 'swoosh': Z(0, 0.3, 0.22, 1500, null, 0.7); break;
      case 'warn': T(N(81), 0, 0.1, 'square', 0.1); T(N(81), 0.14, 0.1, 'square', 0.1); break;
    }
  } catch (e) {}
}
const dlVib = p => { try { if (navigator.vibrate) navigator.vibrate(p); } catch (e) {} };
function dlSpeak(zh) { try { if (S.settings.sound && TTS.ok) TTS.speak(zh); } catch (e) {} }

/* ---------- jaringan: Supabase Realtime (dimuat saat dibutuhkan) ---------- */
const NET = {
  sb: null, ki: 0, ai: 0, ch: null, lib: null,
  /* urutan percobaan: kunci publishable/anon × channel publik/privat (privat dijaga RLS: hanya topik xbduel-*) */
  TRY: [[0, false], [0, true], [1, false], [1, true]],
  load() {
    if (window.supabase && window.supabase.createClient) return Promise.resolve(true);
    if (this.lib) return this.lib;
    this.lib = new Promise(res => {
      let i = 0;
      const next = () => {
        if (i >= DL_SB.libs.length) { this.lib = null; return res(false); }
        const s = document.createElement('script'); s.src = DL_SB.libs[i++]; s.async = true;
        s.onload = () => (window.supabase && window.supabase.createClient ? res(true) : next());
        s.onerror = () => { s.remove(); next(); };
        document.head.appendChild(s);
      };
      next();
    });
    return this.lib;
  },
  async client() {
    if (this.sb) return this.sb;
    if (!(await this.load())) throw new Error('lib');
    this.ki = this.TRY[this.ai][0];
    this.sb = window.supabase.createClient(DL_SB.url, DL_SB.keys[this.ki], { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }, realtime: { params: { eventsPerSecond: 30 } } });
    return this.sb;
  },
  /* buka channel: presence (siapa ada di room) + broadcast (pesan game) */
  async open(topic, meta, on, tries = 0) {
    const sb = await this.client();
    const priv = this.TRY[this.ai][1];
    return new Promise((res, rej) => {
      const ch = sb.channel(topic, { config: { broadcast: { self: false, ack: false }, presence: { key: meta.id }, private: priv } });
      let done = false;
      const to = setTimeout(() => { if (done) return; done = true; try { sb.removeChannel(ch); } catch (e) {} rej(new Error('timeout')); }, 14000);
      ch.on('broadcast', { event: 'm' }, ({ payload }) => { if (payload && payload.from !== meta.id && (!payload.to || payload.to === meta.id)) on.msg && on.msg(payload); });
      ch.on('presence', { event: 'sync' }, () => { const st = ch.presenceState(); const ps = []; Object.values(st).forEach(a => { if (a && a[0]) ps.push(a[0]); }); on.sync && on.sync(ps); });
      ch.subscribe(async (status, err) => {
        if (status === 'SUBSCRIBED') {
          try { await ch.track(meta); } catch (e) {}
          if (!done) { done = true; clearTimeout(to); res(ch); } else on.status && on.status('up');
        } else if ((status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') && !done) {
          done = true; clearTimeout(to); try { sb.removeChannel(ch); } catch (e) {}
          if (tries < this.TRY.length - 1) { const k0 = this.TRY[this.ai][0]; this.ai = (this.ai + 1) % this.TRY.length; if (this.TRY[this.ai][0] !== k0) this.sb = null; this.open(topic, meta, on, tries + 1).then(res, rej); }
          else rej(err || new Error(status));
        } else if (done && (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED')) on.status && on.status('down');
      });
    });
  },
  send(ch, payload) { try { if (ch) ch.send({ type: 'broadcast', event: 'm', payload: Object.assign({ from: DLX.id }, payload) }); } catch (e) {} },
  close(ch) { if (!ch) return; try { ch.untrack(); } catch (e) {} try { this.sb && this.sb.removeChannel(ch); } catch (e) {} }
};

/* ---------- kerangka layar ---------- */
function dlOpen(scr) {
  dlProf(); hushAll(); closeModal(); FX.ensure(); GA.init();
  let el = $('#dl');
  if (!el) {
    el = document.createElement('div'); el.id = 'dl'; el.className = 'dlroot';
    el.innerHTML = `<div class="dl-bg" aria-hidden="true"><div class="dl-stars"></div><div class="dl-grid"></div><div class="dl-glow"></div></div><div class="dl-stage" id="dlstage"></div><div class="dl-fx" id="dlfx"></div>`;
    document.body.appendChild(el); document.body.classList.add('in-arcade', 'in-duel');
    el.addEventListener('click', dlClick); el.addEventListener('input', dlInput);
  }
  dlGo(scr || 'title');
}
function dlGo(scr, arg) {
  DLX.scr = scr; const st = $('#dlstage'); if (!st) return;
  const V = { title: dlVTitle, avatar: dlVAvatar, online: dlVOnline, room: dlVRoom, search: dlVSearch, bot: dlVBot, howto: dlVHowto, board: dlVBoard, lessons: dlVLessons };
  st.innerHTML = `<div class="dl-scr s-${scr}">${(V[scr] || dlVTitle)(arg)}</div>`;
  st.scrollTop = 0;
  if (['title', 'online', 'bot', 'room', 'search', 'board', 'howto', 'avatar', 'lessons'].includes(scr) && !GA.on && S.game && S.game.music !== false) GA.music('lobby');
  if (scr === 'board') dlLoadBoard();
}
function dlClose() {
  dlLeaveNet(true);
  if (DL) dlStopMatch();
  GA.stopMusic(); hushAll();
  const el = $('#dl'); if (el) el.remove(); document.body.classList.remove('in-arcade', 'in-duel');
  if (DLX.xp) { const x = DLX.xp; DLX.xp = 0; setTimeout(() => addXP(x), 300); }
  save(); render();
}
function dlCrest(av, size = '', extra = '') { const a = DL_AV[av] || DL_AV[0]; return `<span class="dl-crest ${size}" style="--c1:${a[2]};--c2:${a[3]}" ${extra}><i class="dl-ring"></i><span class="hz">${a[0]}</span><i class="dl-sh"></i></span>`; }
const dlTop = (back, title) => `<div class="dl-bar"><button class="dl-ib" data-d="${back}" aria-label="${t('Kembali')}">‹</button><b>${title}</b><span class="dl-snd"><button class="dl-ib" data-d="snd" aria-label="${t('Suara')}">${S.settings.sound ? '🔊' : '🔇'}</button><button class="dl-ib" data-d="mus" aria-label="${t('Musik')}">${S.game && S.game.music === false ? '🔕' : '🎵'}</button></span></div>`;

function dlVTitle() {
  const d = dlProf(); const ns = dlScopeNs(d.scope, d.custom);
  const sc = [['all', t('Semua')], ['sd', '時代華語 1'], ['prep', '華語準備級 L1–6'], ['b1', '當代中文 B1'], ['custom', t('Pilih sendiri…')]];
  return `<div class="dl-bar"><button class="dl-ib" data-d="exit" aria-label="${t('Keluar')}">✕</button><b></b><span class="dl-snd"><button class="dl-ib" data-d="snd">${S.settings.sound ? '🔊' : '🔇'}</button><button class="dl-ib" data-d="mus">${S.game && S.game.music === false ? '🔕' : '🎵'}</button></span></div>
  <div class="dl-logo"><div class="dl-logo-zh hz"><span>漢</span><span>字</span><span>對</span><span>決</span></div><div class="dl-logo-en">HANZI <i>DUEL</i></div><div class="dl-logo-sub">${t('Adu cepat hanzi 1 lawan 1 · combo susun kalimat')}</div></div>
  <div class="dl-prof">${dlCrest(d.av, 'md', 'data-d="avatar" role="button"')}<div class="grow"><label class="dl-lbl">${t('Nama petarung')}</label><input id="dlname" class="dl-in" maxlength="14" value="${esc(d.name)}" autocomplete="off" spellcheck="false"><div class="dl-rec"><span class="w">${d.w} ${t('menang')}</span><span class="l">${d.l} ${t('kalah')}</span>${d.d ? `<span>${d.d} ${t('seri')}</span>` : ''}${d.best ? `<span class="c">${t('combo terbaik')} ×${d.best}</span>` : ''}</div></div></div>
  <div class="dl-modes">
    <button class="dl-mode m-on" data-d="online"><span class="dl-mi">${ICON('globe')}</span><span class="dl-mt"><b>DUEL ONLINE</b><small>${t('Lawan teman lewat kode room, atau cari lawan acak')}</small></span><span class="dl-go">▶</span></button>
    <button class="dl-mode m-2p" data-d="local"><span class="dl-mi">${ICON('phone')}</span><span class="dl-mt"><b>${t('2 PEMAIN · 1 HP')}</b><small>${t('Layar dibagi dua, duduk berhadapan')}</small></span><span class="dl-go">▶</span></button>
    <button class="dl-mode m-bot" data-d="bot"><span class="dl-mi">${ICON('chip')}</span><span class="dl-mt"><b>${t('VS BOT')}</b><small>${t('Latihan sendiri: mudah, normal, sulit')}</small></span><span class="dl-go">▶</span></button>
  </div>
  <div class="dl-box"><div class="dl-lbl">${t('Materi duel')} <span class="dl-dim">· ${ns.length} lesson · ${dlPool(ns).length} ${t('kata')}</span></div><div class="dl-chips">${sc.map(([k, l]) => `<button class="dl-chip ${d.scope === k ? 'on' : ''}" data-d="scope" data-v="${k}">${esc(l)}</button>`).join('')}</div>${d.scope === 'custom' ? `<div class="dl-dim small" style="margin-top:6px">${esc(ns.map(lnShort).join(' · '))}</div>` : ''}<div class="dl-dim small" style="margin-top:6px">${t('Duel online memakai materi pilihan pembuat room.')}</div></div>
  <div class="dl-row3"><button class="dl-sb" data-d="board">🏆 ${t('Papan juara')}</button><button class="dl-sb" data-d="howto">❓ ${t('Cara main')}</button></div>`;
}
function dlVAvatar() {
  const d = dlProf();
  return `${dlTop('title', t('Pilih petarung'))}<div class="dl-avs">${DL_AV.map((a, i) => `<button class="dl-av ${d.av === i ? 'on' : ''}" data-d="setav" data-v="${i}">${dlCrest(i, 'lg')}<b>${esc(t(a[1]))}</b></button>`).join('')}</div>`;
}
function dlVLessons() {
  const d = dlProf(); const sel = new Set(d.custom.length ? d.custom : KLS.map(L => L.n));
  return `${dlTop('title', t('Pilih lesson'))}${COURSES.map(c => `<div class="dl-box"><div class="dl-lbl">${esc(c.zh)}</div><div class="dl-chips">${KLS.filter(L => L.course === c.k).map(L => `<button class="dl-chip ${sel.has(L.n) ? 'on' : ''}" data-d="lsn" data-v="${L.n}">${lnShort(L.n)}</button>`).join('')}</div></div>`).join('')}
  <div class="dl-row3"><button class="dl-sb" data-d="lsnall">${t('Pilih semua')}</button><button class="dl-btn pri" data-d="title">${t('Selesai')} ✓</button></div>`;
}
function dlVOnline() {
  const busy = DLX.busy;
  return `${dlTop('title', 'DUEL ONLINE')}
  <div class="dl-hero">${dlCrest(dlProf().av, 'lg')}<div class="dl-vs-s">VS</div><span class="dl-crest lg q"><i class="dl-ring"></i><span>?</span></span></div>
  ${DLX.err ? `<div class="dl-err">${esc(DLX.err)}</div>` : ''}
  <div class="dl-col">
    <button class="dl-btn pri big" data-d="create" ${busy ? 'disabled' : ''}>${ICON('plus')} ${t('Buat room')}<small>${t('Dapat kode 4 huruf untuk dibagikan ke teman')}</small></button>
    <div class="dl-join"><input id="dlcode" class="dl-in code" maxlength="4" placeholder="KODE" autocomplete="off" autocapitalize="characters" spellcheck="false" value="${esc(DLX.codeIn || '')}"><button class="dl-btn" data-d="join" ${busy ? 'disabled' : ''}>${t('Gabung')} ▶</button></div>
    <button class="dl-btn alt big" data-d="random" ${busy ? 'disabled' : ''}>🎲 ${t('Cari lawan acak')}<small>${t('Bertemu pemain lain yang sedang mencari')}</small></button>
  </div>
  ${busy ? `<div class="dl-load"><i></i><i></i><i></i> ${t('Menghubungkan…')}</div>` : ''}
  <p class="dl-dim small" style="text-align:center;margin-top:14px">${t('Butuh internet di kedua HP. Soal di kedua HP sama persis — yang lebih cepat & tepat menang!')}</p>`;
}
function dlVRoom() {
  const R = DLX.room || {}; const code = R.code || '----';
  const opp = R.opp; const host = R.host;
  const st = R.state === 'conn' ? t('Menghubungkan ke server…') : R.state === 'nohost' ? t('Room belum ditemukan. Pastikan kodenya benar & temanmu sudah membuat room.') : R.state === 'full' ? t('Room sudah penuh.') : R.state === 'ver' ? t('Versi app kalian berbeda. Minta temanmu menutup & membuka ulang app agar versinya sama.') : opp ? t('Lawan masuk! Bersiap…') : host ? t('Menunggu lawan bergabung…') : t('Menunggu pembuat room…');
  return `${dlTop('leave', t('Room duel'))}
  <div class="dl-code">${[...code].map((c, i) => `<span style="--i:${i}">${esc(c)}</span>`).join('')}</div>
  ${host ? `<div class="dl-row3"><button class="dl-sb" data-d="share">📤 ${t('Bagikan link')}</button><button class="dl-sb" data-d="copy">📋 ${t('Salin kode')}</button></div>` : ''}
  <div class="dl-lobby"><div class="dl-slot">${dlCrest(dlProf().av, 'md')}<b>${esc(dlProf().name)}</b><small>${host ? t('Pembuat room') : t('Kamu')}</small></div>
    <div class="dl-vs-s">VS</div>
    <div class="dl-slot ${opp ? 'in' : 'wait'}">${opp ? dlCrest(opp.av, 'md') : `<span class="dl-crest md q"><i class="dl-ring"></i><span>?</span></span>`}<b>${opp ? esc(opp.name) : '…'}</b><small>${opp ? (host ? t('Penantang') : t('Pembuat room')) : t('menunggu')}</small></div></div>
  <div class="dl-status ${R.state === 'nohost' || R.state === 'full' || R.state === 'ver' ? 'bad' : ''}">${R.state === 'conn' || (!opp && !['nohost', 'full', 'ver'].includes(R.state)) ? '<span class="dl-radar"></span>' : ''}${st}</div>
  ${host ? `<p class="dl-dim small" style="text-align:center">${t('Materi')}: ${esc(dlScopeLabel(dlScopeNs(dlProf().scope, dlProf().custom)))}</p>` : ''}`;
}
function dlVSearch() {
  const L = DLX.lobby || {};
  return `${dlTop('leave', t('Mencari lawan'))}<div class="dl-search"><div class="dl-radar big"><i></i><i></i><i></i>${dlCrest(dlProf().av, 'md')}</div>
  <h2>${L.found ? t('Lawan ditemukan!') : t('Mencari lawan…')}</h2><p class="dl-dim">${L.state === 'conn' ? t('Menghubungkan ke server…') : t('{n} pemain sedang mencari', { n: Math.max(1, L.n || 1) })}</p>
  <p class="dl-dim small">${t('Tips: ajak teman membuka menu ini di waktu yang sama, atau pakai kode room.')}</p></div>`;
}
function dlVBot() {
  return `${dlTop('title', 'VS BOT')}<div class="dl-col">${Object.entries(DL_BOTS).map(([k, b], i) => `<button class="dl-mode m-b${i}" data-d="botgo" data-v="${k}"><span class="dl-mi">${dlCrest([4, 0, 5][i], 'sm')}</span><span class="dl-mt"><b>${esc(t(b.nm))} · ${k === 'easy' ? t('Mudah') : k === 'normal' ? t('Normal') : t('Sulit')}</b><small>${t('Akurasi ±{a}% · jawab {s} detik', { a: Math.round(b.acc * 100), s: (b.t[0] / 1000).toFixed(1) + '–' + (b.t[1] / 1000).toFixed(1) })}</small></span><span class="dl-go">▶</span></button>`).join('')}</div>`;
}
function dlVHowto() {
  const rows = [['⚔️', t('Serang'), t('Kartu aturan muncul (arti, pinyin, suara, pola nada, atau gambar). Ketuk hanzi yang benar — hanzi itu melesat menghantam lawan. Makin cepat makin sakit; jawab di bawah 1,5 detik = CRITICAL.')],
    ['💥', t('Salah = kena balik'), t('Jawaban salah membuat HP-mu sendiri berkurang 6 dan beruntunmu hilang. Kehabisan waktu −4.')],
    ['🔗', t('COMBO susun kalimat'), t('Setiap 3 jawaban benar beruntun, muncul potongan kata acak. Susun jadi kalimat utuh sebelum waktu habis → serangan pamungkas (makin panjang kalimat, makin besar).')],
    ['⚡', t('Energi & jurus'), t('Energi terisi tiap jawaban benar. 盾 Perisai menahan 1 serangan, 霧 Kabut mengaburkan pilihan lawan, 治 Pulih menambah 25 HP.')],
    ['⏱️', t('Menang'), t('HP lawan habis = K.O. Kalau waktu 2:30 habis, HP terbanyak yang menang.')],
    ['🌐', t('Online'), t('Buat room → bagikan kode/link ke teman → duel dimulai otomatis saat dia masuk. Soal di kedua HP sama persis.')]];
  return `${dlTop('title', t('Cara main'))}<div class="dl-how">${rows.map(r => `<div class="dl-hrow"><span>${r[0]}</span><div><b>${r[1]}</b><p>${r[2]}</p></div></div>`).join('')}</div><div class="dl-row3"><button class="dl-btn pri" data-d="title">${t('Siap bertarung!')}</button></div>`;
}
function dlVBoard() {
  const d = dlProf(); const B = DLX.board;
  const top = B && B.top ? B.top : null;
  return `${dlTop('title', t('Papan juara'))}
  <div class="dl-box"><div class="dl-lbl">🏆 ${t('Juara duel online · 7 hari terakhir')}</div>
  ${!B ? `<div class="dl-load"><i></i><i></i><i></i> ${t('Memuat…')}</div>` : B.err ? `<div class="dl-dim">${t('Tidak bisa memuat papan juara (cek internet).')}</div>` : !top.length ? `<div class="dl-dim">${t('Belum ada pemenang minggu ini. Jadilah yang pertama!')}</div>` :
    `<div class="dl-lb">${top.map((r, i) => `<div class="dl-lbr ${i < 3 ? 'top' + (i + 1) : ''}"><span class="rk">${i + 1}</span>${dlCrest(Math.max(0, DL_AV.findIndex(a => a[0] === r.av)), 'xs')}<b>${esc(r.name)}</b><span class="w">${r.wins} ${t('menang')}</span><span class="c">×${r.best_combo || 0}</span></div>`).join('')}</div>`}</div>
  ${B && B.recent && B.recent.length ? `<div class="dl-box"><div class="dl-lbl">⚡ ${t('Duel terbaru')}</div><div class="dl-recent">${B.recent.map(r => `<div><b>${esc(r.winner)}</b> <span class="dl-dim">${t('mengalahkan')}</span> ${esc(r.loser)} <span class="dl-dim">· ${dlAgo(r.created_at)}</span></div>`).join('')}</div></div>` : ''}
  <div class="dl-box"><div class="dl-lbl">📜 ${t('Riwayat kamu')}</div>${d.hist.length ? `<div class="dl-recent">${[...d.hist].reverse().slice(0, 10).map(h => `<div><span class="dl-res ${h.r}">${h.r === 'w' ? t('MENANG') : h.r === 'l' ? t('KALAH') : t('SERI')}</span> vs ${esc(h.vs)} <span class="dl-dim">· ${esc(h.mode)} · ${esc(h.d)}</span></div>`).join('')}</div>` : `<div class="dl-dim">${t('Belum ada duel.')}</div>`}</div>`;
}
function dlAgo(ts) { const s = (Date.now() - new Date(ts).getTime()) / 1000; return s < 90 ? t('baru saja') : s < 3600 ? t('{n} menit lalu', { n: Math.round(s / 60) }) : s < 86400 ? t('{n} jam lalu', { n: Math.round(s / 3600) }) : t('{n} hari lalu', { n: Math.round(s / 86400) }); }
async function dlLoadBoard() {
  DLX.board = null;
  try {
    const sb = await NET.client();
    const [a, b] = await Promise.all([sb.rpc('duel_top', { days: 7 }), sb.from('duel_results').select('winner,loser,created_at').order('created_at', { ascending: false }).limit(8)]);
    if (a.error) throw a.error;
    DLX.board = { top: a.data || [], recent: (b && b.data) || [] };
  } catch (e) { DLX.board = { err: 1 }; }
  if (DLX.scr === 'board') { const st = $('#dlstage'); if (st) st.innerHTML = `<div class="dl-scr s-board">${dlVBoard()}</div>`; }
}

/* ---------- interaksi menu ---------- */
function dlInput(e) {
  if (e.target.id === 'dlname') { const d = dlProf(); d.name = e.target.value.replace(/[<>]/g, '').slice(0, 14).trim() || d.name; save(); }
  if (e.target.id === 'dlcode') { const v = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4); if (v !== e.target.value) e.target.value = v; DLX.codeIn = v; }
}
function dlClick(e) {
  const b = e.target.closest('[data-d]'); if (!b) return; const a = b.dataset.d; const v = b.dataset.v;
  GA.init(); FX.ensure();
  if (DL && DL.on) return dlFightClick(a, b, v);
  if (DL && DLX.scr === 'result' && dlAfterClick(e)) return;
  if (a !== 'snd' && a !== 'mus') DS('sel');
  const d = dlProf();
  switch (a) {
    case 'exit': return dlClose();
    case 'title': DLX.err = ''; return dlGo('title');
    case 'snd': S.settings.sound = !S.settings.sound; save(); if (!S.settings.sound) GA.stopMusic(); else if ((S.game || {}).music !== false && !DL) GA.music('lobby'); return dlGo(DLX.scr);
    case 'mus': S.game = S.game || {}; S.game.music = S.game.music === false; save(); if (S.game.music) GA.music(DL ? 'duel' : 'lobby'); else GA.stopMusic(); return dlGo(DLX.scr);
    case 'avatar': return dlGo('avatar');
    case 'setav': d.av = +v; save(); DS('join'); return dlGo('title');
    case 'scope': if (v === 'custom') { d.scope = 'custom'; save(); return dlGo('lessons'); } d.scope = v; save(); return dlGo('title');
    case 'lsn': { const n = +v; let c = d.custom.length ? d.custom.slice() : KLS.map(L => L.n); c = c.includes(n) ? c.filter(x => x !== n) : c.concat(n); if (!c.length) { toast(t('Pilih minimal 1 lesson')); return; } d.custom = KLS.map(L => L.n).filter(x => c.includes(x)); d.scope = 'custom'; save(); return dlGo('lessons'); }
    case 'lsnall': d.custom = KLS.map(L => L.n); save(); return dlGo('lessons');
    case 'online': DLX.err = ''; return dlGo('online');
    case 'bot': return dlGo('bot');
    case 'board': return dlGo('board');
    case 'howto': return dlGo('howto');
    case 'local': return dlStartMatch({ mode: 'local' });
    case 'botgo': DLX.botDiff = v; return dlStartMatch({ mode: 'bot', diff: v });
    case 'create': return dlCreateRoom();
    case 'join': { const c = (DLX.codeIn || ($('#dlcode') || {}).value || '').toUpperCase(); if (!/^[A-Z0-9]{4}$/.test(c)) { DLX.err = t('Kode room harus 4 karakter.'); return dlGo('online'); } return dlJoinRoom(c, false); }
    case 'random': return dlRandom();
    case 'leave': dlLeaveNet(true); return dlGo('online');
    case 'share': return dlShare();
    case 'copy': try { navigator.clipboard.writeText(DLX.room.code); toast(t('Kode disalin')); } catch (err) { toast(DLX.room.code); } return;
  }
}
function dlShare() {
  const R = DLX.room; if (!R) return;
  const url = location.origin + location.pathname + '?duel=' + R.code;
  const text = t('Ayo duel hanzi denganku di Xiǎobù! Kode room: {c}', { c: R.code });
  if (navigator.share) navigator.share({ title: 'Hanzi Duel', text, url }).catch(() => {});
  else { try { navigator.clipboard.writeText(text + ' ' + url); toast(t('Link disalin')); } catch (e) { toast(url); } }
}

/* ---------- room online ---------- */
function dlMeta(host) { const d = dlProf(); return { id: DLX.id, name: d.name, av: d.av, host: !!host, t: Date.now(), v: DL_VER }; }
function dlNewCode() { let c = ''; for (let i = 0; i < 4; i++) c += DL_CODE_CH[Math.floor(Math.random() * DL_CODE_CH.length)]; return c; }
function dlLeaveNet(bye) {
  const R = DLX.room; if (R) { clearTimeout(R.nohostT); clearTimeout(R.goT); if (bye && R.ch) NET.send(R.ch, { e: 'bye' }); NET.close(R.ch); DLX.room = null; }
  const L = DLX.lobby; if (L) { NET.close(L.ch); DLX.lobby = null; }
  DLX.busy = false;
}
async function dlCreateRoom() { dlLeaveNet(); return dlJoinRoom(dlNewCode(), true); }
async function dlJoinRoom(code, host) {
  dlLeaveNet();
  const R = DLX.room = { code, host, state: 'conn', opp: null, started: false };
  dlGo('room');
  try {
    const ch = await NET.open('xbduel-' + code, dlMeta(host), { sync: ps => dlRoomSync(R, ps), msg: m => dlRoomMsg(R, m), status: s => dlNetStatus(s) });
    if (DLX.room !== R) { NET.close(ch); return; }
    R.ch = ch; R.state = 'wait'; if (DLX.scr === 'room') dlGo('room');
    if (!host) R.nohostT = setTimeout(() => { if (DLX.room === R && !R.opp) { R.state = 'nohost'; if (DLX.scr === 'room') dlGo('room'); } }, 7000);
  } catch (e) {
    if (DLX.room !== R) return;
    DLX.room = null; DLX.err = e && e.message === 'lib' ? t('Tidak bisa memuat modul online. Cek koneksi internet lalu coba lagi.') : t('Gagal terhubung ke server duel. Cek internet lalu coba lagi.');
    dlGo('online');
  }
}
function dlRoomSync(R, ps) {
  if (DLX.room !== R) return;
  const others = ps.filter(p => p.id !== DLX.id).sort((a, b) => a.t - b.t || (a.id < b.id ? -1 : 1));
  if (R.opp && !others.some(p => p.id === R.opp.id)) { if (DL && DL.on && DL.mode === 'online') dlOppGone(); else if (DL && DL.mode === 'online' && !DL.on) { DL.oppLeft = true; dlResultRefresh(); } else if (!R.started) { R.opp = null; R.state = 'wait'; if (DLX.scr === 'room') dlGo('room'); } return; }
  if (R.opp && DL && DL.goneT) dlOppBack();
  if (R.host) {
    if (!R.opp && others.length) {
      const o = others.find(p => !p.host) || others[0];
      if (o.v !== DL_VER) { NET.send(R.ch, { e: 'ver', to: o.id }); return; }
      R.opp = o; clearTimeout(R.nohostT); DS('join'); if (DLX.scr === 'room') dlGo('room');
      clearTimeout(R.goT); R.goT = setTimeout(() => dlHostGo(R), 1100);
    }
    others.filter(p => R.opp && p.id !== R.opp.id).forEach(p => NET.send(R.ch, { e: 'full', to: p.id }));
  } else if (!R.opp) {
    const h = others.find(p => p.host);
    if (h) { if (h.v !== DL_VER) { R.state = 'ver'; if (DLX.scr === 'room') dlGo('room'); return; } R.opp = h; clearTimeout(R.nohostT); R.state = 'wait'; DS('join'); if (DLX.scr === 'room') dlGo('room'); }
  }
}
function dlHostGo(R) {
  if (DLX.room !== R || !R.opp) return;
  const d = dlProf(); const ns = dlScopeNs(d.scope, d.custom); const seed = (Math.random() * 4294967295) >>> 0;
  R.started = true; R.want = {};
  NET.send(R.ch, { e: 'go', to: R.opp.id, seed, ns, name: d.name, av: d.av });
  dlStartMatch({ mode: 'online', seed, ns, host: true, opp: R.opp });
}
function dlRoomMsg(R, m) {
  if (DLX.room !== R) return;
  if (m.e === 'go') { if (!R.opp) R.opp = { id: m.from, name: m.name, av: m.av, host: true }; R.started = true; R.want = {}; return dlStartMatch({ mode: 'online', seed: m.seed >>> 0, ns: m.ns, host: false, opp: R.opp }); }
  if (m.e === 'full') { R.state = 'full'; if (DLX.scr === 'room') dlGo('room'); return; }
  if (m.e === 'ver') { R.state = 'ver'; if (DLX.scr === 'room') dlGo('room'); return; }
  if (m.e === 'bye') { if (DL && DL.mode === 'online' && DL.on) return dlOppGone(true); if (DL && !DL.on && DL.mode === 'online') { DL.oppLeft = true; dlResultRefresh(); return; } R.opp = null; R.started = false; R.state = 'wait'; if (DLX.scr === 'room') dlGo('room'); return; }
  if (m.e === 'rm') { R.want = R.want || {}; R.want.opp = 1; dlResultRefresh(); if (R.host && R.want.me) dlHostGo(R); return; }
  if (DL && DL.mode === 'online') dlNetMsg(m);
}
function dlNetStatus(s) {
  if (!DL || !DL.on || DL.mode !== 'online') return;
  const el = $('#dlnet'); if (el) el.classList.toggle('on', s === 'down');
}
/* lawan acak: lobby presence → pasangkan berdasarkan urutan masuk */
async function dlRandom() {
  dlLeaveNet();
  const L = DLX.lobby = { state: 'conn', n: 0, found: false };
  dlGo('search');
  const meta = Object.assign(dlMeta(false), { t: Date.now() });
  try {
    const ch = await NET.open('xbduel-lobby-' + DL_VER, meta, { sync: ps => dlLobbySync(L, ps, meta) });
    if (DLX.lobby !== L) { NET.close(ch); return; }
    L.ch = ch; L.state = 'wait'; if (DLX.scr === 'search') dlGo('search');
  } catch (e) { if (DLX.lobby !== L) return; DLX.lobby = null; DLX.err = t('Gagal terhubung ke server duel. Cek internet lalu coba lagi.'); dlGo('online'); }
}
function dlLobbySync(L, ps, meta) {
  if (DLX.lobby !== L || L.found) return;
  const list = ps.filter(p => p.v === DL_VER).sort((a, b) => a.t - b.t || (a.id < b.id ? -1 : 1));
  L.n = list.length;
  const i = list.findIndex(p => p.id === DLX.id); if (i < 0) { if (DLX.scr === 'search') dlGo('search'); return; }
  const j = i % 2 === 0 ? i + 1 : i - 1; const o = list[j];
  if (!o) { if (DLX.scr === 'search') dlGo('search'); return; }
  L.found = true; DS('join'); if (DLX.scr === 'search') dlGo('search');
  const ids = [DLX.id, o.id].sort(); let h = 7; for (const c of ids.join('|')) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  let code = ''; for (let k = 0; k < 4; k++) { code += DL_CODE_CH[h % DL_CODE_CH.length]; h = Math.floor(h / DL_CODE_CH.length) + k * 7919; }
  const host = i < j;
  setTimeout(() => { if (DLX.lobby !== L) return; NET.close(L.ch); DLX.lobby = null; dlJoinRoom(code, host); }, host ? 900 : 1500);
}

/* ---------- pertandingan ---------- */
function dlMkPlayer(i, o) {
  return Object.assign({ i, hp: DL_HP, en: 0, streak: 0, maxStreak: 0, shield: 0, fogUntil: 0, mode: 'q', lock: false, q: null, cb: null,
    st: { ok: 0, bad: 0, to: 0, dmg: 0, ult: 0, fast: 0, heal: 0, blk: 0 } }, o);
}
function dlStartMatch(cfg) {
  const d = dlProf();
  if (DL) dlStopMatch();
  const ns = cfg.ns && cfg.ns.length ? cfg.ns.filter(n => KL(n)) : dlScopeNs(d.scope, d.custom);
  const seed = cfg.seed != null ? cfg.seed >>> 0 : (Math.random() * 4294967295) >>> 0;
  const pool = dlPool(ns);
  if (pool.length < 8) { toast(t('Materi terlalu sedikit — pilih lebih banyak lesson.')); return; }
  const D = DL = { mode: cfg.mode, cfg, seed, ns, pool, sents: dlSents(ns), on: false, over: false, host: !!cfg.host, t0: 0, dur: DL_DUR * 1000, P: [], me: 0, diff: cfg.diff };
  D.picOK = typeof pgOf === 'function' ? pool.filter(x => x.hz.length === 1 && pgOf(x.hz)) : [];
  D.toneOK = pool.filter(x => x.t.length === x.hz.length && x.t.length > 0 && x.t.length <= 3);
  D.noAud = cfg.mode === 'local';
  if (!D.sents.length) D.sents = dlSents(KLS.map(L => L.n));
  const mk = (i, o) => dlMkPlayer(i, Object.assign({ rng: dlRng(seed ^ 0x9e3779b9), srng: dlRng((seed + 101) >>> 0) }, o));
  if (cfg.mode === 'online') {
    D.P = [mk(0, { name: d.name, av: d.av, human: true }), mk(1, { name: (cfg.opp && cfg.opp.name) || t('Lawan'), av: cfg.opp && cfg.opp.av >= 0 ? cfg.opp.av : 1, remote: true })];
  } else if (cfg.mode === 'bot') {
    const b = DL_BOTS[cfg.diff] || DL_BOTS.normal; const bav = [4, 0, 5][Object.keys(DL_BOTS).indexOf(cfg.diff)] ?? 1;
    D.P = [mk(0, { name: d.name, av: d.av, human: true }), mk(1, { name: t(b.nm), av: bav === d.av ? (bav + 3) % DL_AV.length : bav, bot: b, botNext: 0 })];
  } else {
    D.P = [mk(0, { name: t('Pemain') + ' 1', av: d.av, human: true }), mk(1, { name: t('Pemain') + ' 2', av: (d.av + 4) % DL_AV.length, human: true })];
  }
  hushAll();
  dlVsIntro();
}
function dlStopMatch() {
  if (!DL) return; clearInterval(DL.loop); clearTimeout(DL.introT); clearTimeout(DL.endT); clearTimeout(DL.goneT); clearInterval(DL.goneI);
  (DL.timers || []).forEach(clearTimeout); DL.on = false; DL = null;
}
function dlLater(fn, ms) { const D = DL; if (!D) return; const id = setTimeout(() => { if (DL === D) fn(); }, ms); (D.timers = D.timers || []).push(id); if (D.timers.length > 80) D.timers = D.timers.slice(-40); return id; }

function dlVsIntro() {
  const D = DL; const [a, b] = D.P; GA.stopMusic();
  const st = $('#dlstage'); DLX.scr = 'vs';
  st.innerHTML = `<div class="dl-vs"><div class="dl-vsh l" style="--c1:${DL_AV[a.av][2]};--c2:${DL_AV[a.av][3]}">${dlCrest(a.av, 'xl')}<b>${esc(a.name)}</b></div><div class="dl-vsh r" style="--c1:${DL_AV[b.av][2]};--c2:${DL_AV[b.av][3]}">${dlCrest(b.av, 'xl')}<b>${esc(b.name)}</b></div><div class="dl-vsx">VS</div>
    <div class="dl-vsinfo">${esc(D.mode === 'online' ? 'ONLINE' : D.mode === 'bot' ? 'VS BOT' : t('2 PEMAIN'))} · ${esc(dlScopeLabel(D.ns))}</div><div class="dl-cd" id="dlcd"></div></div>`;
  DS('swoosh'); dlLater(() => DS('slam'), 520); dlLater(() => { const s = $('.dl-vs'); if (s) s.classList.add('shake'); }, 540);
  const cd = (n, ms) => dlLater(() => { const el = $('#dlcd'); if (!el) return; el.innerHTML = `<span class="${n === 0 ? 'go' : ''}">${n === 0 ? '開打!' : n}</span>`; DS(n === 0 ? 'fight' : 'count'); if (n === 0) dlSpeak('開打'); }, ms);
  dlLater(() => { const s = $('.dl-vs'); if (s) s.classList.add('counting'); }, 1450); cd(3, 1500); cd(2, 2200); cd(1, 2900); cd(0, 3600);
  dlLater(dlFightBegin, 4300);
}
function dlFightBegin() {
  const D = DL; if (!D) return;
  D.on = true; D.t0 = Date.now(); DLX.scr = 'fight';
  const st = $('#dlstage'); st.innerHTML = dlFightHTML();
  D.P.forEach(p => { if (p.human) dlNextQ(p); if (p.bot) p.botNext = Date.now() + dlBotDelay(p); dlHud(p.i); });
  if (D.mode === 'online') dlSendState(D.P[0]);
  GA.music('duel');
  D.lastSec = -1; D.lowT = 0;
  D.loop = setInterval(dlTick, 100);
}
function dlHudHTML(p, size) {
  return `<div class="dl-hud ${size}" id="dlhud${p.i}">${dlCrest(p.av, size === 'big' ? 'lg' : 'sm', `id="dlc${p.i}"`)}
    <div class="dl-bars"><div class="dl-nm"><b>${esc(p.name)}</b>${p.bot ? '<span class="dl-tag">BOT</span>' : p.remote ? '<span class="dl-tag on">ONLINE</span>' : ''}<span class="dl-stk" id="dlk${p.i}"></span></div>
    <div class="dl-hp"><i class="lag" id="dlhl${p.i}"></i><i class="fill" id="dlh${p.i}"></i><span id="dlht${p.i}">${p.hp}</span></div>
    <div class="dl-en"><i id="dle${p.i}"></i><span class="dl-pips" id="dlpp${p.i}"><i></i><i></i><i></i></span></div></div></div>`;
}
function dlPaneHTML(p) {
  return `<div class="dl-pane" id="dlp${p.i}"><div class="dl-q" id="dlq${p.i}"></div>
    <div class="dl-skills" id="dls${p.i}">${Object.entries(DL_SK).map(([k, s]) => `<button class="dl-skill k-${k}" data-d="skill" data-v="${k}" data-p="${p.i}"><span class="hz">${s.hz}</span><small>${t(s.nm)}</small><em>${s.c}⚡</em></button>`).join('')}</div></div>`;
}
function dlFightHTML() {
  const D = DL; const top = `<div class="dl-net" id="dlnet">⚠️ ${t('Koneksi terputus, menyambung ulang…')}</div><div class="dl-gone" id="dlgone"></div>`;
  if (D.mode === 'local') {
    const [a, b] = D.P;
    return `<div class="dl-fight two">${top}<div class="dl-half flip">${dlHudHTML(b, 'mid')}${dlPaneHTML(b)}</div>
      <div class="dl-mid"><button class="dl-ib" data-d="quit">✕</button><div class="dl-timer" id="dlt">2:30</div><button class="dl-ib" data-d="mus">${S.game && S.game.music === false ? '🔕' : '🎵'}</button></div>
      <div class="dl-half">${dlHudHTML(a, 'mid')}${dlPaneHTML(a)}</div></div>`;
  }
  const me = D.P[0], foe = D.P[1];
  return `<div class="dl-fight one">${top}<div class="dl-top"><button class="dl-ib" data-d="quit">✕</button><div class="dl-timer" id="dlt">2:30</div><button class="dl-ib" data-d="mus">${S.game && S.game.music === false ? '🔕' : '🎵'}</button></div>
    <div class="dl-foe">${dlHudHTML(foe, 'big')}<div class="dl-foefx" id="dlff"></div></div>
    <div class="dl-mine">${dlHudHTML(me, 'mid')}</div>${dlPaneHTML(me)}</div>`;
}
const dlCrestEl = p => $('#dlc' + p.i);
function dlHud(i) {
  const D = DL; if (!D) return; const p = D.P[i]; if (!p) return;
  const pct = Math.max(0, p.hp) / DL_HP * 100;
  const f = $('#dlh' + i), l = $('#dlhl' + i), tx = $('#dlht' + i), e = $('#dle' + i), k = $('#dlk' + i), pp = $('#dlpp' + i), c = $('#dlc' + i), hud = $('#dlhud' + i);
  if (f) { f.style.width = pct + '%'; f.parentNode.classList.toggle('low', pct <= 25); f.parentNode.classList.toggle('mid', pct > 25 && pct <= 50); }
  if (l) l.style.width = pct + '%';
  if (tx) tx.textContent = Math.max(0, Math.round(p.hp));
  if (e) e.style.width = (p.en / DL_EN * 100) + '%';
  if (k) k.innerHTML = p.streak >= 2 ? `<span class="pop">🔥${p.streak}</span>` : '';
  if (pp) [...pp.children].forEach((x, j) => x.classList.toggle('on', p.streak % 3 > j || (p.streak > 0 && p.streak % 3 === 0 && p.mode === 'combo')));
  if (c) { c.classList.toggle('shielded', p.shield > Date.now()); c.classList.toggle('danger', pct <= 25); }
  if (hud) hud.classList.toggle('combo', p.mode === 'combo');
  if (p.human) document.querySelectorAll(`#dls${i} .dl-skill`).forEach(b => { const s = DL_SK[b.dataset.v]; b.disabled = p.en < s.c || p.mode === 'combo' || (b.dataset.v === 'sh' && p.shield > Date.now()) || (b.dataset.v === 'heal' && p.hp >= DL_HP); b.classList.toggle('ready', p.en >= s.c); });
}

/* soal */
function dlNextQ(p) {
  const D = DL; if (!D || D.over) return;
  p.mode = 'q'; p.cb = null; p.lock = false;
  p.q = dlGen(p.rng, D); p.qT0 = Date.now(); p.qEnd = p.qT0 + DL_QT;
  const box = $('#dlq' + p.i); if (!box) return;
  box.innerHTML = dlQHTML(p);
  if (p.fogUntil > Date.now()) dlFogApply(p);
  if (p.q.ty === 'aud' && voiceOK()) dlLater(() => { if (p.q && p.q.ty === 'aud' && p.mode === 'q') TTS.speak(p.q.a.hz); }, 120);
}
const DL_TCOL = { 1: '#ff5c7a', 2: '#ffb020', 3: '#3dff9a', 4: '#36b4ff', 5: '#c8c0ff' };
const DL_TNAME = { 1: '第一聲 ˉ', 2: '第二聲 ˊ', 3: '第三聲 ˇ', 4: '第四聲 ˋ', 5: '輕聲 ˙' };
function dlToneSVG(ts) {
  return `<span class="dl-tones">${ts.map(x => `<span class="dl-tn" style="--tc:${DL_TCOL[x]}"><svg viewBox="-2 -2 34 34" width="52" height="52"><path d="M3 4H27M3 15H27M3 26H27" stroke="rgba(255,255,255,.12)" stroke-width="1"/><path d="${TONE_PATH[x]}" fill="none" stroke="var(--tc)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg><b>${x === 5 ? '˙' : x}</b><small>${DL_TNAME[x]}</small></span>`).join('')}</span>`;
}
function dlFit(hz) { const n = hz.length; return n <= 1 ? 'l1' : n === 2 ? 'l2' : n === 3 ? 'l3' : 'l4'; }
function dlQHTML(p) {
  const q = p.q; const a = q.a; const R = DL_RULE[q.ty];
  const audFallback = q.ty === 'aud' && !voiceOK();
  let prompt = '';
  if (q.ty === 'mean') prompt = `<div class="dl-pm pm-mean">${esc(a.m)}</div>`;
  else if (q.ty === 'py') prompt = `<div class="dl-pm pm-py">${esc(a.py)}</div>`;
  else if (q.ty === 'aud') prompt = audFallback ? `<div class="dl-pm pm-py">${esc(a.py)}</div><div class="dl-dim small">${t('(suara tidak tersedia di HP ini — pakai pinyin)')}</div>` : `<button class="dl-say" data-d="say" data-p="${p.i}">${ICON('speaker')}<span>${t('Ketuk untuk dengar lagi')}</span></button>`;
  else if (q.ty === 'tone') prompt = `<div class="dl-pm pm-tone">${dlToneSVG(a.t)}</div>`;
  else if (q.ty === 'pic') prompt = `<div class="dl-pm pm-pic">${pgSVG(a.hz, 96)}<span class="dl-dim small">${esc(a.m)}</span></div>`;
  return `<div class="dl-rule r-${q.ty}"><span class="hz">${R[0]}</span><b>${t(R[1])}</b></div>${prompt}<div class="dl-qbar"><i style="animation-duration:${DL_QT}ms"></i></div>
    <div class="dl-opts" id="dlo${p.i}">${q.opts.map((o, j) => `<button class="dl-opt ${dlFit(o.hz)}" data-d="pick" data-p="${p.i}" data-v="${j}" style="--d:${j * 45}ms"><span class="hz">${esc(o.hz)}</span></button>`).join('')}</div>`;
}
function dlDmg(ms, streak) {
  const spd = clamp(Math.round((5200 - ms) / 700), 0, 6); let d = 9 + spd + Math.min(streak, 6);
  const crit = ms < 1500; if (crit) d = Math.round(d * 1.5); return { d, crit };
}
function dlPick(p, j, btn) {
  const D = DL; if (!D || D.over || !p.q || p.lock || p.mode !== 'q') return;
  const ms = Date.now() - p.qT0; const ok = j === p.q.ai; p.lock = true;
  const opts = $('#dlo' + p.i); const btns = opts ? [...opts.children] : [];
  const foe = D.P[1 - p.i];
  if (ok) {
    btn.classList.add('ok'); DS('ok');
    const { d, crit } = dlDmg(ms, p.streak);
    p.streak++; p.maxStreak = Math.max(p.maxStreak, p.streak); p.en = Math.min(DL_EN, p.en + 15);
    p.st.ok++; p.st.dmg += d; if (!p.st.fast || ms < p.st.fast) p.st.fast = ms;
    if (crit) dlPop(btn, 'CRITICAL!', 'crit'); else dlPop(btn, ms < 3000 ? t('Cepat!') : t('Kena!'), 'ok');
    dlHud(p.i); if (D.mode === 'online') dlSendState(p);
    const hz = p.q.a.hz;
    dlShot(btn, dlCrestEl(foe), hz, 1, crit, () => { dlEmit(p, { e: 'atk', d, crit, hz, k: 'hit' }); });
    dlLater(() => { if (p.streak > 0 && p.streak % 3 === 0 && D.sents.length) dlComboStart(p); else dlNextQ(p); }, 520);
  } else {
    btn.classList.add('bad'); if (btns[p.q.ai]) btns[p.q.ai].classList.add('ok', 'reveal');
    DS('bad'); p.streak = 0; p.st.bad++;
    dlSelfHurt(p, 6, t('Salah!'));
    dlLater(() => dlNextQ(p), 1000);
  }
}
function dlTimeout(p) {
  if (p.lock || p.mode !== 'q') return; p.lock = true; p.streak = 0; p.st.to++;
  const btns = $('#dlo' + p.i) ? [...$('#dlo' + p.i).children] : []; if (btns[p.q.ai]) btns[p.q.ai].classList.add('ok', 'reveal');
  DS('bad'); dlSelfHurt(p, 4, t('Waktu habis!'));
  dlLater(() => dlNextQ(p), 900);
}
function dlSelfHurt(p, n, label) {
  p.hp = Math.max(0, p.hp - n); dlNum(dlCrestEl(p), '-' + n, 'self'); if (label) dlPop(dlCrestEl(p), label, 'bad');
  const c = dlCrestEl(p); if (c) { c.classList.remove('hit'); void c.offsetWidth; c.classList.add('hit'); }
  if (p.human) { dlVib(60); dlFlash(p, 'red'); }
  dlHud(p.i); dlSendState(p); if (p.hp <= 0) dlKO(p);
}
/* kirim aksi ke lawan */
function dlEmit(from, ev) {
  const D = DL; if (!D || D.over) return; const to = D.P[1 - from.i];
  if (to.remote) { NET.send(DLX.room && DLX.room.ch, ev); if (ev.e === 'atk') dlPredict(to, ev); }
  else dlRecv(to, ev, from);
}
function dlPredict(to, ev) {
  const c = dlCrestEl(to); if (!c) return;
  if (to.shield > Date.now()) { dlPop(c, 'BLOCK!', 'blk'); DS('block'); to.shield = 0; dlHud(to.i); return; }
  dlNum(c, '-' + ev.d, ev.crit || ev.k === 'ult' ? 'crit' : ''); dlHitFx(c, ev.crit || ev.k === 'ult'); DS(ev.crit || ev.k === 'ult' ? 'crit' : 'hit', 3);
  to.hp = Math.max(0, to.hp - ev.d); dlHud(to.i);
}
function dlRecv(p, ev, src) {
  const D = DL; if (!D || D.over) return; src = src || D.P[1 - p.i];
  if (ev.e === 'atk') {
    const land = () => dlTakeHit(p, ev, src);
    if (src.human) land(); else dlShot(dlCrestEl(src), dlCrestEl(p), ev.hz || '擊', ev.k === 'ult' ? Math.min(ev.n || 4, 7) : 1, ev.crit || ev.k === 'ult', land);
  } else if (ev.e === 'fog') dlFogged(p, src);
}
function dlTakeHit(p, ev, src) {
  const D = DL; if (!D || D.over) return; const c = dlCrestEl(p);
  if (p.shield > Date.now()) {
    p.shield = 0; p.st.blk++; dlPop(c, 'BLOCK!', 'blk'); DS('block'); dlHud(p.i); dlSendState(p);
    if (D.mode === 'online' && p.human) NET.send(DLX.room && DLX.room.ch, { e: 'fx', k: 'blk' });
    return;
  }
  const big = ev.crit || ev.k === 'ult';
  p.hp = Math.max(0, p.hp - ev.d); p.en = Math.min(DL_EN, p.en + 5);
  dlNum(c, '-' + ev.d, big ? 'crit' : ''); dlHitFx(c, big);
  if (ev.k === 'ult') dlPop(c, 'ULTIMATE!', 'ult');
  DS(big ? 'crit' : 'hit', 3); if (p.human) { DS('hurt'); dlVib(big ? [80, 40, 120] : 50); dlShake(big ? 2 : 1); dlFlash(p, 'red'); }
  dlHud(p.i); dlSendState(p);
  if (p.hp <= 0) dlKO(p);
}
function dlSendState(p) {
  const D = DL; if (!D || D.mode !== 'online' || !p.human) return;
  NET.send(DLX.room && DLX.room.ch, { e: 'st', hp: p.hp, en: p.en, k: p.streak, sh: p.shield > Date.now() ? 1 : 0, cm: p.mode === 'combo' ? 1 : 0, ms: p.maxStreak });
}
/* pesan dari lawan online saat bertarung */
function dlNetMsg(m) {
  const D = DL; if (!D) return; const me = D.P[0], R = D.P[1];
  if (m.e === 'atk' || m.e === 'fog') { if (D.on && !D.over) dlRecv(me, m, R); return; }
  if (m.e === 'st') {
    R.lastSeen = Date.now(); if (D.over) return;
    R.hp = m.hp; R.en = m.en; R.streak = m.k; R.shield = m.sh ? Date.now() + 10000 : 0; R.maxStreak = Math.max(R.maxStreak, m.ms || 0);
    const was = R.mode; R.mode = m.cm ? 'combo' : 'q'; if (was !== 'combo' && R.mode === 'combo') { dlPop(dlCrestEl(R), 'COMBO!', 'ult'); DS('warn'); }
    dlHud(R.i); if (R.hp <= 0 && D.on) dlEnd(0, 'ko');
    return;
  }
  if (m.e === 'fx') {
    const c = dlCrestEl(R);
    if (m.k === 'blk') { dlPop(c, 'BLOCK!', 'blk'); DS('block'); }
    if (m.k === 'heal') { dlNum(c, '+' + m.n, 'heal'); dlHealFx(c); DS('heal'); }
    if (m.k === 'sh') { DS('shield'); }
    if (m.k === 'ultfail') dlPop(c, t('Combo gagal'), 'bad');
    return;
  }
  if (m.e === 'fin') { R.st = Object.assign(R.st, m.st || {}); R.maxStreak = Math.max(R.maxStreak, m.ms || 0); if (m.hp != null) R.hp = m.hp; dlResultRefresh(); return; }
  if (m.e === 'end') { D.endMsg = m; if (!D.over) dlEnd(m.w === 'draw' ? -1 : m.w === DLX.id ? 0 : 1, m.how || 'time'); return; }
}
function dlOppGone(hard) {
  const D = DL; if (!D || !D.on || D.over || D.goneT) return;
  const g = $('#dlgone'); let n = hard ? 3 : 12;
  if (g) { g.classList.add('on'); g.textContent = hard ? t('Lawan keluar dari duel') : t('Lawan terputus… menunggu {n} detik', { n }); }
  D.goneI = setInterval(() => { n--; if (g && !hard) g.textContent = t('Lawan terputus… menunggu {n} detik', { n: Math.max(0, n) }); }, 1000);
  D.goneT = setTimeout(() => { clearInterval(D.goneI); if (DL === D && !D.over) { D.wo = true; dlEnd(0, 'wo'); } }, n * 1000);
}
function dlOppBack() { const D = DL; if (!D) return; clearTimeout(D.goneT); clearInterval(D.goneI); D.goneT = 0; const g = $('#dlgone'); if (g) g.classList.remove('on'); }

/* combo susun kalimat */
function dlComboStart(p) {
  const D = DL; if (!D || D.over) return;
  const x = dlSent(p.srng, D); if (!x) return dlNextQ(p);
  const lvl = Math.floor(p.streak / 3);
  const n = x.s.chunks.length;
  p.mode = 'combo'; p.cb = { s: x.s, order: x.order, k: 0, used: new Set(), lvl, until: Date.now() + 6000 + n * 1900, t0: Date.now() };
  p.cb.dur = p.cb.until - p.cb.t0;
  DS('combo'); dlVib([30, 30, 30]); dlSendState(p); dlHud(p.i);
  const tr = x.s[meanLang()] || x.s.en || '';
  const box = $('#dlq' + p.i); if (!box) return;
  box.innerHTML = `<div class="dl-cmb"><div class="dl-cmbh"><span class="hz">連擊</span><b>COMBO ×${lvl}</b><small>${t('Susun jadi kalimat!')}</small></div>
    <div class="dl-cmbtr">“${esc(tr)}”</div>
    <div class="dl-slots" id="dlsl${p.i}">${x.s.chunks.map((c, k) => `<span class="dl-slot2" data-k="${k}"></span>`).join('')}<span class="dl-end hz">${esc(x.s.end || '')}</span></div>
    <div class="dl-cbar"><i id="dlcb${p.i}"></i></div>
    <div class="dl-tiles" id="dlti${p.i}">${x.order.map((ci, k) => `<button class="dl-tile" data-d="tile" data-p="${p.i}" data-v="${ci}" style="--d:${k * 50}ms"><span class="hz">${esc(x.s.chunks[ci])}</span></button>`).join('')}</div></div>`;
  const ban = document.createElement('div'); ban.className = 'dl-banner'; ban.innerHTML = `<span class="hz">連擊!</span><b>COMBO CHAIN</b>`;
  const pane = $('#dlp' + p.i); if (pane) { pane.appendChild(ban); setTimeout(() => ban.remove(), 1300); }
}
function dlTile(p, ci, btn) {
  const cb = p.cb; if (!cb || p.mode !== 'combo' || btn.disabled) return;
  const want = cb.s.chunks[cb.k];
  if (cb.s.chunks[ci] === want) {
    btn.disabled = true; btn.classList.add('used');
    const slot = document.querySelector(`#dlsl${p.i} [data-k="${cb.k}"]`);
    if (slot) { slot.innerHTML = `<span class="hz">${esc(want)}</span>`; slot.classList.add('in'); }
    DS('chunk', cb.k); cb.k++;
    if (cb.k >= cb.s.chunks.length) dlUlt(p);
  } else {
    btn.classList.remove('nope'); void btn.offsetWidth; btn.classList.add('nope'); DS('bad'); cb.until -= 1500; dlVib(40);
  }
}
function dlUlt(p) {
  const D = DL; const cb = p.cb; const n = cb.s.chunks.length;
  const d = 7 * n + 4 * cb.lvl;
  p.st.ult++; p.st.dmg += d; p.en = Math.min(DL_EN, p.en + 25); p.mode = 'ult';
  DS('ult'); dlVib([60, 40, 160]);
  const full = cb.s.chunks.join('') + (cb.s.end || '');
  dlSpeak(full);
  const sl = $('#dlsl' + p.i); if (sl) sl.classList.add('done');
  const pane = $('#dlp' + p.i); if (pane) { pane.classList.add('ultfx'); setTimeout(() => pane.classList.remove('ultfx'), 1200); }
  const foe = D.P[1 - p.i]; const slots = sl ? [...sl.querySelectorAll('.dl-slot2')] : [];
  slots.forEach((s, k) => dlLater(() => dlShot(s, dlCrestEl(foe), cb.s.chunks[k], 1, true, null, true), k * 110));
  dlLater(() => dlEmit(p, { e: 'atk', d, crit: true, hz: cb.s.chunks[0], k: 'ult', n }), slots.length * 110 + 380);
  dlHud(p.i);
  dlLater(() => { p.mode = 'q'; dlSendState(p); dlNextQ(p); }, slots.length * 110 + 1100);
}
function dlComboFail(p) {
  p.streak = 0; p.mode = 'q'; DS('lose'); dlPop(dlCrestEl(p), t('Combo gagal'), 'bad');
  const sl = $('#dlsl' + p.i); if (sl) sl.classList.add('fail');
  if (DL.mode === 'online') NET.send(DLX.room && DLX.room.ch, { e: 'fx', k: 'ultfail' });
  p.lock = true; dlSendState(p); dlHud(p.i);
  dlLater(() => dlNextQ(p), 900);
}

/* jurus */
function dlSkill(p, k) {
  const D = DL; const s = DL_SK[k]; if (!D || D.over || !s || p.en < s.c || p.mode === 'combo') return;
  const c = dlCrestEl(p);
  if (k === 'sh') { if (p.shield > Date.now()) return; p.shield = Date.now() + 10000; DS('shield'); dlPop(c, t('PERISAI'), 'blk'); if (D.mode === 'online') NET.send(DLX.room.ch, { e: 'fx', k: 'sh' }); }
  if (k === 'heal') { if (p.hp >= DL_HP) return; const n = Math.min(25, DL_HP - p.hp); p.hp += n; p.st.heal += n; DS('heal'); dlNum(c, '+' + n, 'heal'); dlHealFx(c); if (D.mode === 'online') NET.send(DLX.room.ch, { e: 'fx', k: 'heal', n }); }
  if (k === 'fog') { DS('fog'); const foe = D.P[1 - p.i]; dlShot(c, dlCrestEl(foe), '霧', 1, false, () => dlEmit(p, { e: 'fog' })); }
  p.en -= s.c; dlHud(p.i); dlSendState(p);
}
function dlFogged(p) {
  p.fogUntil = Date.now() + 4500; const c = dlCrestEl(p); dlPop(c, t('KABUT!'), 'fog'); DS('fog');
  if (p.human) dlFogApply(p);
}
function dlFogApply(p) {
  const o = $('#dlo' + p.i); if (!o) return; const left = Math.max(400, p.fogUntil - Date.now());
  o.classList.remove('fog'); void o.offsetWidth; o.style.setProperty('--fog', left + 'ms'); o.classList.add('fog');
  clearTimeout(p.fogT); p.fogT = setTimeout(() => { const o2 = $('#dlo' + p.i); if (o2) o2.classList.remove('fog'); }, left);
}

/* bot */
function dlBotDelay(p) { const b = p.bot; return b.t[0] + Math.random() * (b.t[1] - b.t[0]); }
function dlBotTick(p, now) {
  const D = DL; const b = p.bot;
  if (p.mode === 'combo') {
    if (now >= p.botCmbEnd) {
      if (Math.random() < b.cmb) { const n = 3 + Math.floor(Math.random() * 4); const d = 7 * n + 4 * Math.floor(p.streak / 3); p.st.ult++; p.st.dmg += d; p.mode = 'q'; dlPop(dlCrestEl(p), 'ULTIMATE!', 'ult'); DS('ult'); dlEmit(p, { e: 'atk', d, crit: true, hz: pick(D.pool).hz, k: 'ult', n }); p.en = Math.min(DL_EN, p.en + 25); }
      else { p.mode = 'q'; p.streak = 0; dlPop(dlCrestEl(p), t('Combo gagal'), 'bad'); }
      p.botNext = now + dlBotDelay(p); dlHud(p.i);
    }
    return;
  }
  if (now < p.botNext) return;
  // jurus
  if (Math.random() < b.sk) {
    if (p.en >= 45 && p.hp < DL_HP * 0.55) { p.en -= 45; const n = Math.min(25, DL_HP - p.hp); p.hp += n; dlNum(dlCrestEl(p), '+' + n, 'heal'); dlHealFx(dlCrestEl(p)); DS('heal'); }
    else if (p.en >= 40 && Math.random() < 0.35) { p.en -= 40; DS('fog'); dlEmit(p, { e: 'fog' }); }
    else if (p.en >= 30 && !(p.shield > now) && Math.random() < 0.4) { p.en -= 30; p.shield = now + 10000; DS('shield'); dlPop(dlCrestEl(p), t('PERISAI'), 'blk'); }
  }
  const ms = p.botNext - (p.botQ0 || D.t0);
  if (Math.random() < b.acc) {
    const { d, crit } = dlDmg(ms, p.streak); p.streak++; p.maxStreak = Math.max(p.maxStreak, p.streak); p.en = Math.min(DL_EN, p.en + 15); p.st.ok++; p.st.dmg += d;
    dlEmit(p, { e: 'atk', d, crit, hz: pick(D.pool).hz, k: 'hit' });
    if (p.streak % 3 === 0) { p.mode = 'combo'; p.botCmbEnd = now + 4500 + Math.random() * 5000; dlPop(dlCrestEl(p), 'COMBO!', 'ult'); DS('warn'); }
  } else { p.streak = 0; p.st.bad++; p.hp = Math.max(0, p.hp - 6); dlNum(dlCrestEl(p), '-6', 'self'); dlPop(dlCrestEl(p), t('Salah!'), 'bad'); if (p.hp <= 0) { dlHud(p.i); return dlKO(p); } }
  p.botQ0 = now; p.botNext = now + dlBotDelay(p) + (p.fogUntil > now ? 1200 : 0);
  dlHud(p.i);
}

/* loop utama */
function dlTick() {
  const D = DL; if (!D || !D.on || D.over) return;
  const now = Date.now(); const left = Math.max(0, D.dur - (now - D.t0)); const sec = Math.ceil(left / 1000);
  if (sec !== D.lastSec) {
    D.lastSec = sec; const el = $('#dlt'); if (el) { el.textContent = Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0'); el.classList.toggle('hot', sec <= 10); }
    if (sec <= 10 && sec > 0) DS('tick');
    if (sec === 20 && GA.song && GA.on) GA.song = Object.assign({}, GA.SONGS.duel, { bpm: 178 });
    if (sec === 30) { const s = document.createElement('div'); s.className = 'dl-banner warn'; s.innerHTML = `<b>${t('30 DETIK LAGI!')}</b>`; const st = $('.dl-fight'); if (st) { st.appendChild(s); setTimeout(() => s.remove(), 1400); } DS('warn'); }
  }
  D.P.forEach(p => {
    if (p.human) {
      if (p.mode === 'q' && !p.lock && now >= p.qEnd) dlTimeout(p);
      if (p.mode === 'combo' && p.cb) { const b = $('#dlcb' + p.i); const r = Math.max(0, (p.cb.until - now) / p.cb.dur); if (b) b.style.width = (r * 100) + '%'; if (now >= p.cb.until) dlComboFail(p); }
      if (p.shield && p.shield <= now) { p.shield = 0; dlHud(p.i); dlSendState(p); }
    }
    if (p.bot) { if (p.shield && p.shield <= now) { p.shield = 0; dlHud(p.i); } dlBotTick(p, now); }
  });
  if (D.mode === 'online') {
    if (!D.stT || now - D.stT > 3000) { D.stT = now; dlSendState(D.P[0]); }
    const R = D.P[1]; if (R.lastSeen && now - R.lastSeen > 15000 && !D.goneT) dlOppGone();
  }
  const me = D.P[0];
  if (D.mode !== 'local' && me.hp > 0 && me.hp <= DL_HP * 0.25 && now - D.lowT > 1100) { D.lowT = now; DS('low'); }
  if (left <= 0) dlTimeUp();
}
function dlTimeUp() {
  const D = DL; if (!D || D.over || D.waitEnd) return;
  const [a, b] = D.P;
  if (D.mode === 'online' && !D.host) { D.waitEnd = true; DS('ko'); dlLater(() => { if (!D.over) dlEnd(a.hp > b.hp ? 0 : a.hp < b.hp ? 1 : -1, 'time'); }, 2500); return; }
  const w = a.hp > b.hp ? 0 : a.hp < b.hp ? 1 : -1;
  if (D.mode === 'online') NET.send(DLX.room && DLX.room.ch, { e: 'end', w: w === -1 ? 'draw' : w === 0 ? DLX.id : DLX.room.opp.id, how: 'time' });
  dlEnd(w, 'time');
}
function dlKO(p) {
  const D = DL; if (!D || D.over) return;
  if (D.mode === 'online' && p.human) dlSendState(p);
  dlEnd(1 - p.i, 'ko');
}
function dlEnd(w, how) {
  const D = DL; if (!D || D.over) return;
  D.over = true; D.on = false; D.win = w; D.how = how; clearInterval(D.loop); clearTimeout(D.goneT); clearInterval(D.goneI);
  GA.stopMusic(); try { TTS.stop(); } catch (e) {}
  const fight = $('.dl-fight'); if (fight) fight.classList.add('over');
  const big = document.createElement('div'); big.className = 'dl-ko ' + how;
  big.innerHTML = how === 'ko' ? '<b>K.O.!</b>' : how === 'wo' ? `<b>${t('MENANG W.O.')}</b>` : `<b>${t('WAKTU HABIS!')}</b>`;
  if (fight) fight.appendChild(big);
  DS(how === 'ko' ? 'ko' : 'slam'); dlVib(how === 'ko' ? [200, 80, 300] : 120);
  if (how === 'ko' && w >= 0) { const c = dlCrestEl(D.P[1 - w]); if (c) c.classList.add('dead'); }
  if (D.mode === 'online') { const me = D.P[0]; NET.send(DLX.room && DLX.room.ch, { e: 'fin', st: me.st, ms: me.maxStreak, hp: me.hp }); }
  dlRecord();
  D.endT = setTimeout(() => { if (DL === D) dlResult(); }, 2300);
}
function dlRecord() {
  const D = DL; const d = dlProf(); const me = D.P[0]; const foe = D.P[1];
  if (D.mode === 'local') { d.games++; save(); return; }
  const r = D.win === -1 ? 'd' : D.win === 0 ? 'w' : 'l';
  d[r]++; d.games++; d.best = Math.max(d.best, Math.floor(me.maxStreak / 3));
  d.hist.push({ r, vs: foe.name, mode: D.mode === 'online' ? 'online' : 'bot ' + (D.diff || ''), d: todayKey(), hp: me.hp });
  if (d.hist.length > 40) d.hist = d.hist.slice(-40);
  const xp = (r === 'w' ? 30 : r === 'd' ? 18 : 10) + me.st.ok + me.st.ult * 3;
  D.xp = xp; DLX.xp = (DLX.xp || 0) + xp; save();
  if (D.mode === 'online' && r === 'w' && !D.wo) dlLogWin();
}
async function dlLogWin() {
  const D = DL; if (!D) return; const me = D.P[0], foe = D.P[1];
  try {
    const sb = await NET.client();
    await sb.from('duel_results').insert({ winner: me.name.slice(0, 16), loser: foe.name.slice(0, 16), winner_av: DL_AV[me.av][0], winner_hp: Math.max(0, Math.min(200, Math.round(me.hp))), max_combo: Math.min(99, Math.floor(me.maxStreak / 3)), lessons: dlScopeLabel(D.ns).slice(0, 24), room: ((DLX.room && DLX.room.code) || 'XXXX') + (D.seed % 100000) });
  } catch (e) {}
}
function dlResult() {
  const D = DL; if (!D) return; DLX.scr = 'result';
  const st = $('#dlstage'); st.innerHTML = `<div class="dl-scr s-result" id="dlres">${dlVResult()}</div>`;
  const win = D.mode === 'local' ? true : D.win === 0;
  if (D.win === -1) DS('slam'); else if (win) { DS('win'); dlConfetti(); dlSpeak('勝利'); } else DS('lose');
}
function dlResultRefresh() { if (DL && DLX.scr === 'result') { const el = $('#dlres'); if (el) el.innerHTML = dlVResult(); } }
function dlVResult() {
  const D = DL; const [a, b] = D.P;
  const head = D.win === -1 ? ['SERI', 'draw', t('Imbang! Sama kuat.')] : D.mode === 'local' ? [D.P[D.win].name, 'win', t('MENANG!')] : D.win === 0 ? ['MENANG!', 'win', D.how === 'wo' ? t('Lawan meninggalkan duel.') : D.how === 'ko' ? t('Lawan K.O.!') : t('HP-mu lebih banyak saat waktu habis.')] : ['KALAH', 'lose', D.how === 'ko' ? t('HP-mu habis. Balas dendam?') : t('HP lawan lebih banyak saat waktu habis.')];
  const wv = D.win >= 0 ? D.P[D.win] : null;
  const stat = p => { const n = p.st.ok + p.st.bad + p.st.to; return `<div class="dl-sc"><div class="dl-sch">${dlCrest(p.av, 'sm')}<b>${esc(p.name)}</b></div>
    <div class="dl-scg"><span><b>${Math.max(0, Math.round(p.hp))}</b><small>HP</small></span><span><b>${p.st.ok}</b><small>${t('benar')}</small></span><span><b>${n ? Math.round(p.st.ok / n * 100) : 0}%</b><small>${t('akurasi')}</small></span><span><b>${p.st.dmg}</b><small>damage</small></span><span><b>${p.maxStreak}</b><small>${t('beruntun')}</small></span><span><b>${p.st.ult}</b><small>combo</small></span>${p.st.fast ? `<span><b>${(p.st.fast / 1000).toFixed(2)}s</b><small>${t('tercepat')}</small></span>` : ''}</div></div>`; };
  const R = DLX.room; const want = R && R.want || {};
  const rm = D.mode === 'online' ? (D.oppLeft ? `<div class="dl-dim small">${t('Lawan sudah keluar dari room.')}</div>` : `<button class="dl-btn pri big" data-d="again" ${want.me ? 'disabled' : ''}>${want.me ? t('Menunggu lawan…') : t('Tanding ulang')}${want.opp && !want.me ? `<small>${t('Lawan mengajak tanding ulang!')}</small>` : ''}</button>`) : `<button class="dl-btn pri big" data-d="again">${t('Tanding ulang')}</button>`;
  return `<div class="dl-resh ${head[1]}">${wv ? `<div class="dl-crown">${dlCrest(wv.av, 'xl')}<i>👑</i></div>` : `<div class="dl-crown">${dlCrest(a.av, 'lg')}${dlCrest(b.av, 'lg')}</div>`}<h1>${esc(head[0] === 'MENANG!' ? t('MENANG!') : head[0] === 'KALAH' ? t('KALAH') : head[0] === 'SERI' ? t('SERI') : head[0])}</h1><p>${esc(head[2])}</p>${D.xp ? `<div class="dl-xp">+${D.xp} XP</div>` : ''}</div>
    <div class="dl-scs">${stat(a)}${stat(b)}</div>
    <div class="dl-col">${rm}<button class="dl-btn" data-d="menu">${t('Menu duel')}</button></div>`;
}

/* klik saat bertarung / hasil */
function dlFightClick(a, b, v) {
  const D = DL; const pi = b.dataset.p != null ? +b.dataset.p : 0; const p = D.P[pi];
  if (a === 'pick') return dlPick(p, +v, b);
  if (a === 'tile') return dlTile(p, +v, b);
  if (a === 'skill') return dlSkill(p, v);
  if (a === 'say') { if (p.q && voiceOK()) TTS.speak(p.q.a.hz); return; }
  if (a === 'mus') { S.game = S.game || {}; S.game.music = S.game.music === false; save(); if (S.game.music) GA.music('duel'); else GA.stopMusic(); b.textContent = S.game.music ? '🎵' : '🔕'; return; }
  if (a === 'quit') {
    if (!confirm(D.mode === 'online' ? t('Keluar dari duel? Kamu akan dianggap kalah.') : t('Keluar dari duel?'))) return;
    if (D.mode === 'online') { const d = dlProf(); d.l++; d.games++; d.hist.push({ r: 'l', vs: D.P[1].name, mode: 'online', d: todayKey(), hp: 0 }); save(); dlLeaveNet(true); }
    dlStopMatch(); GA.stopMusic(); return dlGo(D.mode === 'online' ? 'online' : 'title');
  }
}
function dlAfterClick(e) {
  const b = e.target.closest('[data-d]'); if (!b || !DL || DL.on || DLX.scr !== 'result') return false;
  const a = b.dataset.d; const D = DL; DS('sel');
  if (a === 'again') {
    if (D.mode === 'online') { const R = DLX.room; if (!R || D.oppLeft) return true; R.want = R.want || {}; R.want.me = 1; NET.send(R.ch, { e: 'rm' }); dlResultRefresh(); if (R.host && R.want.opp) dlHostGo(R); return true; }
    const cfg = Object.assign({}, D.cfg); delete cfg.seed; dlStartMatch(cfg); return true;
  }
  if (a === 'menu') { const m = D.mode; dlStopMatch(); if (m === 'online') dlLeaveNet(true); dlGo(m === 'online' ? 'online' : 'title'); return true; }
  return false;
}

/* ---------- efek visual ---------- */
function dlCenter(el) { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }
function dlShot(fromEl, toEl, hz, count, big, done, mini) {
  const fx = $('#dlfx'); if (!fx || !fromEl || !toEl) { if (done) done(); return; }
  const A = dlCenter(fromEl), B = dlCenter(toEl);
  if (!mini) DS('fire');
  const n = Math.max(1, count || 1); let landed = 0;
  for (let k = 0; k < n; k++) {
    const s = document.createElement('div'); s.className = 'dl-shot' + (big ? ' big' : ''); s.innerHTML = `<span class="hz">${esc(hz)}</span>`;
    s.style.left = A.x + 'px'; s.style.top = A.y + 'px'; fx.appendChild(s);
    const dx = B.x - A.x, dy = B.y - A.y; const bend = (k - (n - 1) / 2) * 40 + (Math.random() - 0.5) * 30;
    const an = s.animate([
      { transform: 'translate(-50%,-50%) scale(.6) rotate(0deg)', opacity: 0.4 },
      { transform: `translate(calc(-50% + ${dx * 0.5 + bend}px), calc(-50% + ${dy * 0.5 - 30}px)) scale(1.35) rotate(${dx > 0 ? 200 : -200}deg)`, opacity: 1, offset: 0.55 },
      { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(.9) rotate(${dx > 0 ? 360 : -360}deg)`, opacity: 1 }
    ], { duration: 380 + k * 70, easing: 'cubic-bezier(.5,0,.75,.6)' });
    an.onfinish = () => { s.remove(); dlBurst(B.x, B.y, big ? 16 : 10, big); landed++; if (landed === n && done) done(); };
  }
}
function dlBurst(x, y, n, big) {
  const fx = $('#dlfx'); if (!fx) return;
  const ring = document.createElement('div'); ring.className = 'dl-ringfx' + (big ? ' big' : ''); ring.style.left = x + 'px'; ring.style.top = y + 'px'; fx.appendChild(ring); setTimeout(() => ring.remove(), 500);
  for (let i = 0; i < n; i++) {
    const p = document.createElement('i'); p.className = 'dl-pt'; p.style.left = x + 'px'; p.style.top = y + 'px'; fx.appendChild(p);
    const a = Math.random() * Math.PI * 2, r = (big ? 70 : 45) + Math.random() * 50;
    p.animate([{ transform: 'translate(-50%,-50%) scale(1)', opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(a) * r}px), calc(-50% + ${Math.sin(a) * r}px)) scale(0)`, opacity: 0 }], { duration: 420 + Math.random() * 300, easing: 'cubic-bezier(.2,.7,.3,1)' }).onfinish = () => p.remove();
  }
}
function dlPos(el) { const c = dlCenter(el); c.x = clamp(c.x, 64, window.innerWidth - 64); c.down = c.y < 170; return c; }
function dlNum(el, txt, cls) {
  const fx = $('#dlfx'); if (!fx || !el) return; const c = dlPos(el);
  const n = document.createElement('div'); n.className = 'dl-num ' + (cls || ''); n.textContent = txt; n.style.left = (c.x + (Math.random() - 0.5) * 30) + 'px'; n.style.top = c.y + 'px'; fx.appendChild(n);
  const dy = c.down ? 1 : -1; n.animate([{ transform: 'translate(-50%,-50%) scale(.4)', opacity: 0 }, { transform: `translate(-50%,${-50 + dy * 70}%) scale(1.25)`, opacity: 1, offset: 0.25 }, { transform: `translate(-50%,${-50 + dy * 210}%) scale(1)`, opacity: 0 }], { duration: 1100, easing: 'ease-out' }).onfinish = () => n.remove();
}
function dlPop(el, txt, cls) {
  const fx = $('#dlfx'); if (!fx || !el) return; const c = dlPos(el); c.x = clamp(c.x, 90, window.innerWidth - 90);
  const n = document.createElement('div'); n.className = 'dl-popfx ' + (cls || ''); n.textContent = txt; n.style.left = c.x + 'px'; n.style.top = (c.down ? c.y + 52 : c.y - 34) + 'px'; fx.appendChild(n);
  n.animate([{ transform: 'translate(-50%,-50%) scale(.3) rotate(-8deg)', opacity: 0 }, { transform: 'translate(-50%,-50%) scale(1.15) rotate(3deg)', opacity: 1, offset: 0.2 }, { transform: 'translate(-50%,-80%) scale(1)', opacity: 1, offset: 0.7 }, { transform: 'translate(-50%,-110%) scale(.9)', opacity: 0 }], { duration: 1000, easing: 'ease-out' }).onfinish = () => n.remove();
}
function dlHitFx(c, big) { if (!c) return; c.classList.remove('hit', 'hitbig'); void c.offsetWidth; c.classList.add(big ? 'hitbig' : 'hit'); }
function dlHealFx(c) {
  const fx = $('#dlfx'); if (!fx || !c) return; const o = dlCenter(c);
  for (let i = 0; i < 10; i++) { const p = document.createElement('i'); p.className = 'dl-pt heal'; p.style.left = (o.x + (Math.random() - 0.5) * 60) + 'px'; p.style.top = (o.y + 20) + 'px'; fx.appendChild(p); p.animate([{ transform: 'translate(-50%,-50%) scale(.6)', opacity: 0 }, { transform: 'translate(-50%,-50%) scale(1.2)', opacity: 1, offset: 0.3 }, { transform: `translate(-50%, ${-90 - Math.random() * 50}px) scale(.4)`, opacity: 0 }], { duration: 900 + i * 40, easing: 'ease-out' }).onfinish = () => p.remove(); }
}
function dlShake(lv) { const f = $('.dl-fight'); if (!f) return; f.classList.remove('shake1', 'shake2'); void f.offsetWidth; f.classList.add('shake' + lv); }
function dlFlash(p, col) { const host = DL && DL.mode === 'local' ? $('#dlp' + p.i) && $('#dlp' + p.i).parentNode : $('.dl-fight'); if (!host) return; const f = document.createElement('i'); f.className = 'dl-flash ' + col; host.appendChild(f); setTimeout(() => f.remove(), 450); }
function dlConfetti() {
  const fx = $('#dlfx'); if (!fx) return; const W0 = window.innerWidth;
  const cols = ['#ffd84a', '#ff3d6e', '#36e7ff', '#9cff6e', '#ff7af0'];
  for (let i = 0; i < 70; i++) { const p = document.createElement('i'); p.className = 'dl-cf'; p.style.left = (Math.random() * W0) + 'px'; p.style.background = cols[i % cols.length]; fx.appendChild(p); p.animate([{ transform: `translateY(-20px) rotate(0deg)`, opacity: 1 }, { transform: `translate(${(Math.random() - 0.5) * 120}px, ${window.innerHeight + 40}px) rotate(${720 * Math.random()}deg)`, opacity: 0.9 }], { duration: 1800 + Math.random() * 1600, delay: Math.random() * 500, easing: 'cubic-bezier(.3,.6,.6,1)' }).onfinish = () => p.remove(); }
}

/* ---------- pintu masuk dari menu Kelas ---------- */
function dlBanner() {
  const d = dlProf();
  return `<section class="dl-banner-k" data-a="klduel" role="button"><div class="dlb-hz hz"><span>漢</span><span>字</span><i>VS</i><span>對</span><span>決</span></div><div class="grow" style="min-width:0"><b>Hanzi Duel</b><span>${t('Duel 1 lawan 1: online, 2 pemain di 1 HP, atau lawan bot.')}${d.games ? ' · ' + t('{w} menang', { w: d.w }) : ''}</span></div><span class="dlb-go">${t('Main')} ▶</span></section>`;
}
const XVIEWS_KD = XVIEWS.kelas;
XVIEWS.kelas = function () {
  let h = XVIEWS_KD(); if (VK.view !== 'map' && VK.view) return h;
  h = h.replace('<section class="kl-tools">', `<section class="kl-tools"><button class="kl-tool" data-a="klduel">${TILE('game', 'tint c7')}<b>Hanzi Duel</b><span>${t('Duel 1 lawan 1 — online, 1 HP, atau bot')}</span></button>`);
  const k = h.indexOf('</section>'); return k < 0 ? h : h.slice(0, k + 10) + dlBanner() + h.slice(k + 10);
};
Object.assign(ACT, { klduel: () => dlOpen('title') });
START_ACTS.add('klduel');
window.addEventListener('hashchange', () => { if ($('#dl')) dlClose(); });
/* link undangan: ?duel=KODE → langsung masuk room */
setTimeout(() => {
  try {
    const m = /[?&]duel=([A-Za-z0-9]{4})/.exec(location.search); if (!m) return;
    const code = m[1].toUpperCase(); history.replaceState(null, '', location.pathname + location.hash);
    dlOpen('online'); DLX.codeIn = code; dlJoinRoom(code, false);
  } catch (e) {}
}, 600);