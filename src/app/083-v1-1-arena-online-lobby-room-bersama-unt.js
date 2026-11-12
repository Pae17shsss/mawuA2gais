/* ========== V1.1: ARENA ONLINE — lobby & room bersama untuk 3 game Arena ==========
   Memakai NET (duel.js) = Supabase Realtime (presence + broadcast). Topik: 'xbduel-ar-<game>-<KODE>' (lolos RLS xbduel-%).
   API untuk game:
     ARNET.open(gameKey, { max, min, title, c1, c2, makeGo(players) → payload konten (host saja), onStart(ctx) })
       → menampilkan layar lobby (buat room / gabung kode / main cepat). Saat host menekan Mulai, semua HP menerima 'go'
         dan onStart(ctx) dipanggil dengan:
         ctx = { me:{id,name,av,slot}, players:[{id,name,av,slot}], host:bool, go:payload, code,
                 send(obj)         → broadcast ke semua pemain lain (obj.e = nama event milik game; jangan pakai 'go','hi','bye','rm')
                 on(fn)            → fn(msg) untuk setiap pesan game dari pemain lain (msg.from = id pengirim)
                 onLeave(fn)       → fn(id) saat pemain keluar/terputus
                 onStatus(fn)      → fn('down'|'up') koneksi
                 rematch()         → kembali ke lobby room yang sama (host bisa mulai lagi)
                 leave() }         → keluar room & tutup channel
   Konten (soal) dibuat oleh HOST di makeGo() lalu dikirim lewat 'go' supaya semua pemain dapat soal yang sama persis. */
Object.assign(I18N, {
  'Main online': ['Play online', 'Maglaro online'], 'Buat room': ['Create room', 'Gumawa ng room'], 'Gabung': ['Join', 'Sumali'], 'Kode room': ['Room code', 'Code ng room'],
  'Bagikan kode ini ke teman': ['Share this code with friends', 'Ibahagi ang code sa kaibigan'], 'Menunggu pemain…': ['Waiting for players…', 'Naghihintay ng manlalaro…'],
  'Mulai!': ['Start!', 'Simulan!'], 'Hanya host yang bisa memulai': ['Only the host can start', 'Ang host lang ang makakapagsimula'], 'Namamu': ['Your name', 'Pangalan mo'],
  'Menghubungkan…': ['Connecting…', 'Kumokonekta…'], 'Room tidak ditemukan atau sudah penuh': ['Room not found or full', 'Walang room o puno na'],
  'Gagal terhubung. Cek internet lalu coba lagi.': ['Could not connect. Check your internet and try again.', 'Hindi makakonekta. Tingnan ang internet at subukan muli.'],
  'Versi app berbeda — minta semua pemain memuat ulang app.': ['App versions differ — ask everyone to reload the app.', 'Magkaiba ang bersyon — i-reload ng lahat ang app.'],
  'pemain': ['players', 'manlalaro'], 'Keluar room': ['Leave room', 'Umalis sa room'], 'Host': ['Host', 'Host'], 'Kamu': ['You', 'Ikaw'],
  'Host keluar — room ditutup': ['Host left — room closed', 'Umalis ang host — sarado ang room'], 'Masukkan 4 huruf kode': ['Enter the 4-letter code', 'Ilagay ang 4 na letrang code'],
  'Butuh minimal {n} pemain': ['Needs at least {n} players', 'Kailangan ng {n} manlalaro'], '{n} keluar': ['{n} left', 'Umalis si {n}'], 'atau': ['or', 'o'], 'Kode disalin': ['Code copied', 'Nakopya ang code']
});
Object.assign(I18N_VI, {
  'Main online': 'Chơi trực tuyến', 'Buat room': 'Tạo phòng', 'Gabung': 'Tham gia', 'Kode room': 'Mã phòng', 'Bagikan kode ini ke teman': 'Chia sẻ mã này cho bạn bè', 'Menunggu pemain…': 'Đang chờ người chơi…',
  'Mulai!': 'Bắt đầu!', 'Hanya host yang bisa memulai': 'Chỉ chủ phòng mới bắt đầu được', 'Namamu': 'Tên bạn', 'Menghubungkan…': 'Đang kết nối…', 'Room tidak ditemukan atau sudah penuh': 'Không tìm thấy phòng hoặc phòng đã đầy',
  'Gagal terhubung. Cek internet lalu coba lagi.': 'Không kết nối được. Kiểm tra mạng rồi thử lại.', 'Versi app berbeda — minta semua pemain memuat ulang app.': 'Phiên bản khác nhau — mọi người hãy tải lại ứng dụng.',
  'pemain': 'người chơi', 'Keluar room': 'Rời phòng', 'Host': 'Chủ phòng', 'Kamu': 'Bạn', 'Host keluar — room ditutup': 'Chủ phòng đã rời — phòng đóng', 'Masukkan 4 huruf kode': 'Nhập mã 4 chữ',
  'Butuh minimal {n} pemain': 'Cần ít nhất {n} người chơi', '{n} keluar': '{n} đã rời'
});
const AR_NET_VER = 'ar1-' + (typeof KLS_VER !== 'undefined' ? KLS_VER : '');
const ARN = { id: (typeof DLX !== 'undefined' && DLX.id) || Math.random().toString(36).slice(2, 12), room: null, game: null, opt: null, scr: 'menu', err: '' };
const AR_CODE_CH = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
function arnCode() { let s = ''; for (let i = 0; i < 4; i++) s += AR_CODE_CH[Math.floor(Math.random() * AR_CODE_CH.length)]; return s; }
function arnProf() { try { return dlProf(); } catch (e) { return { name: t('Pemain'), av: 0 }; } }
function arnMeta(host) { const d = arnProf(); return { id: ARN.id, name: String(d.name || '').slice(0, 16), av: d.av | 0, host: !!host, t: Date.now(), v: AR_NET_VER }; }
function arnCrest(av, cls = '') { try { return dlCrest(av, cls); } catch (e) { return ''; } }
/* RNG bersama bila game butuh: ARNET.rng(seed) */
function arnRng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t2 = Math.imul(a ^ a >>> 15, 1 | a); t2 = t2 + Math.imul(t2 ^ t2 >>> 7, 61 | t2) ^ t2; return ((t2 ^ t2 >>> 14) >>> 0) / 4294967296; }; }

function arnRoot() {
  let el = document.getElementById('arnet');
  if (!el) { el = document.createElement('div'); el.id = 'arnet'; el.className = 'arn'; el.addEventListener('click', arnClick); el.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.id === 'arncode') arnClick({ target: el.querySelector('[data-n=join]') }); }); document.body.appendChild(el); }
  return el;
}
function arnRender() {
  const el = arnRoot(); const o = ARN.opt || {}; const R = ARN.room; const d = arnProf();
  const head = `<div class="arn-top" style="--g1:${o.c1 || '#e5487f'};--g2:${o.c2 || '#7c5cff'}"><button class="arn-x" data-n="close" aria-label="${t('Tutup')}"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button><div><small>${t('Main online')}</small><b>${esc(t(o.title || 'Arena'))}</b></div></div>`;
  let body = '';
  if (ARN.scr === 'menu') {
    body = `<div class="arn-card"><label class="arn-lab">${t('Namamu')}</label><div class="arn-me">${arnCrest(d.av, 'sm')}<input id="arnname" maxlength="16" value="${esc(d.name)}"></div>
      <button class="arn-btn pri" data-n="create"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>${t('Buat room')}</button>
      <div class="arn-or"><span>${t('atau')}</span></div>
      <label class="arn-lab">${t('Kode room')}</label><div class="arn-join"><input id="arncode" maxlength="4" autocapitalize="characters" autocomplete="off" placeholder="ABCD" inputmode="text"><button class="arn-btn" data-n="join">${t('Gabung')}</button></div>
      ${ARN.err ? `<p class="arn-err">${esc(ARN.err)}</p>` : ''}<p class="arn-hint">${t('Butuh minimal {n} pemain', { n: o.min || 2 })} · ${o.max || 2} ${t('pemain')} maks.</p></div>`;
  } else if (ARN.scr === 'wait') {
    body = `<div class="arn-card"><div class="arn-spin"></div><p class="arn-hint">${t('Menghubungkan…')}</p></div>`;
  } else if (ARN.scr === 'room' && R) {
    const ps = R.players; const me = ps.find(p => p.id === ARN.id); const canGo = R.host && ps.length >= (o.min || 2);
    const slots = []; for (let i = 0; i < (o.max || 2); i++) { const p = ps[i]; slots.push(p ? `<div class="arn-p ${p.id === ARN.id ? 'me' : ''}">${arnCrest(p.av, 'sm')}<b>${esc(p.name)}</b>${p.host ? `<i>${t('Host')}</i>` : ''}${p.id === ARN.id ? `<i class="me">${t('Kamu')}</i>` : ''}</div>` : `<div class="arn-p empty"><span class="arn-dot"></span>${t('Menunggu pemain…')}</div>`); }
    body = `<div class="arn-card"><label class="arn-lab">${t('Kode room')}</label><button class="arn-code" data-n="copy">${esc(R.code)}<svg viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/></svg></button>
      <p class="arn-hint">${t('Bagikan kode ini ke teman')}</p><div class="arn-ps">${slots.join('')}</div>
      ${ARN.err ? `<p class="arn-err">${esc(ARN.err)}</p>` : ''}
      ${R.host ? `<button class="arn-btn pri big" data-n="go" ${canGo ? '' : 'disabled'}>${t('Mulai!')}</button>${canGo ? '' : `<p class="arn-hint">${t('Butuh minimal {n} pemain', { n: o.min || 2 })}</p>`}` : `<p class="arn-hint">${t('Hanya host yang bisa memulai')}</p>`}
      <button class="arn-btn ghost" data-n="leave">${t('Keluar room')}</button></div>`;
  }
  el.innerHTML = `<div class="arn-sheet">${head}${body}</div>`;
  el.classList.add('on');
}
function arnSaveName() { const i = document.getElementById('arnname'); if (!i) return; const v = i.value.trim().slice(0, 16); if (v) { try { dlProf().name = v; save(); } catch (e) {} } }
async function arnJoin(code, host) {
  arnSaveName(); ARN.err = ''; ARN.scr = 'wait'; arnRender();
  const R = { code, host, players: [], ch: null, handlers: [], leaveH: [], statusH: [], started: false, game: ARN.game, ctx: null };
  ARN.room = R;
  try {
    const ch = await NET.open('xbduel-ar-' + ARN.game + '-' + code, arnMeta(host), { sync: ps => arnSync(R, ps), msg: m => arnMsg(R, m), status: s => R.statusH.forEach(f => { try { f(s); } catch (e) {} }) });
    if (ARN.room !== R) { NET.close(ch); return; }
    R.ch = ch; ARN.scr = 'room'; arnRender();
    if (!host) { R.nohostT = setTimeout(() => { if (ARN.room === R && !R.players.some(p => p.host)) { arnLeave(); ARN.err = t('Room tidak ditemukan atau sudah penuh'); ARN.scr = 'menu'; arnRender(); } }, 6000); }
  } catch (e) { if (ARN.room !== R) return; ARN.room = null; ARN.err = t('Gagal terhubung. Cek internet lalu coba lagi.'); ARN.scr = 'menu'; arnRender(); }
}
function arnSync(R, ps) {
  const before = R.players.map(p => p.id);
  ps.sort((a, b) => (b.host - a.host) || (a.t - b.t));
  const max = (ARN.opt && ARN.opt.max) || 2;
  const vOk = ps.filter(p => p.v === AR_NET_VER);
  if (vOk.length < ps.length && ps.find(p => p.id === ARN.id) && R.host) ps.filter(p => p.v !== AR_NET_VER).forEach(p => NET.send(R.ch, { e: 'ver', to: p.id, from: ARN.id }));
  let list = vOk.slice(0, max);
  if (!list.some(p => p.id === ARN.id)) {   // room penuh → aku keluar
    if (!R.started && ps.length >= max && !R.host) { arnLeave(); ARN.err = t('Room tidak ditemukan atau sudah penuh'); ARN.scr = 'menu'; arnRender(); return; }
  }
  if (R.started) {   // saat main: hanya laporkan yang keluar
    const ids = new Set(ps.map(p => p.id)); before.forEach(id => { if (!ids.has(id)) R.leaveH.forEach(f => { try { f(id); } catch (e) {} }); });
    R.players = R.players.filter(p => ids.has(p.id));
    if (!R.host && !ps.some(p => p.host) && R.ctx) { R.leaveH.forEach(f => { try { f('host'); } catch (e) {} }); }
    return;
  }
  R.players = list.map((p, i) => ({ id: p.id, name: p.name, av: p.av, host: !!p.host, slot: i, t: p.t }));
  if (!R.host && !ps.some(p => p.host) && R.players.some(p => p.host)) { arnLeave(); ARN.err = t('Host keluar — room ditutup'); ARN.scr = 'menu'; arnRender(); return; }
  if (ARN.scr === 'room') arnRender();
}
function arnMsg(R, m) {
  if (m.e === 'ver') { ARN.err = t('Versi app berbeda — minta semua pemain memuat ulang app.'); arnLeave(); ARN.scr = 'menu'; arnRender(); return; }
  if (m.e === 'go') { if (R.started) { R.started = false; R.handlers = []; R.leaveH = []; R.statusH = []; R.ctx = null; } arnStart(R, m); return; }
  if (m.e === 'rm') { return; }
  R.handlers.forEach(f => { try { f(m); } catch (e) { console.warn(e); } });
}
function arnBuildCtx(R, go) {
  const me = R.players.find(p => p.id === ARN.id) || { id: ARN.id, name: arnProf().name, av: arnProf().av, slot: 0 };
  const ctx = {
    me, players: (go.players || R.players).map(p => Object.assign({}, p)), host: R.host, go, code: R.code,
    send: obj => NET.send(R.ch, Object.assign({ from: ARN.id }, obj)),
    on: fn => R.handlers.push(fn), onLeave: fn => R.leaveH.push(fn), onStatus: fn => R.statusH.push(fn),
    rematch: () => { R.started = false; R.handlers = []; R.leaveH = []; R.statusH = []; R.ctx = null; ARN.scr = 'room'; arnRender(); },
    leave: () => { arnLeave(); arnHide(); },
    rng: arnRng(go.seed || 1)
  };
  ctx.me.slot = ctx.players.findIndex(p => p.id === ARN.id);
  return ctx;
}
function arnStart(R, go) {
  if (R.started) return; R.started = true; clearTimeout(R.nohostT);
  const ctx = arnBuildCtx(R, go); R.ctx = ctx; arnHide();
  try { ARN.opt.onStart(ctx); } catch (e) { console.warn('arena online start', e); }
}
function arnHide() { const el = document.getElementById('arnet'); if (el) { el.classList.remove('on'); el.innerHTML = ''; } }
function arnLeave() {
  const R = ARN.room; if (!R) return; clearTimeout(R.nohostT);
  try { NET.send(R.ch, { e: 'bye', from: ARN.id }); } catch (e) {}
  NET.close(R.ch); ARN.room = null;
}
function arnClick(e) {
  const b = e.target && e.target.closest ? e.target.closest('[data-n]') : null; if (!b) return; const n = b.dataset.n;
  if (n === 'close') { arnLeave(); arnHide(); ARN.scr = 'menu'; return; }
  if (n === 'create') { try { FX.ensure(); } catch (x) {} arnJoin(arnCode(), true); return; }
  if (n === 'join') { const i = document.getElementById('arncode'); const c = (i && i.value || '').toUpperCase().replace(/[^A-Z0-9]/g, ''); if (c.length !== 4) { ARN.err = t('Masukkan 4 huruf kode'); arnRender(); return; } try { FX.ensure(); } catch (x) {} arnJoin(c, false); return; }
  if (n === 'leave') { arnLeave(); ARN.scr = 'menu'; arnRender(); return; }
  if (n === 'copy') { const R = ARN.room; if (R) { try { navigator.clipboard.writeText(R.code); toast(t('Kode disalin')); } catch (x) {} } return; }
  if (n === 'go') {
    const R = ARN.room; if (!R || !R.host || R.started) return; const o = ARN.opt;
    if (R.players.length < (o.min || 2)) return;
    let payload = {}; try { payload = o.makeGo ? o.makeGo(R.players.slice()) : {}; } catch (x) { console.warn(x); }
    const go = Object.assign({ e: 'go', seed: Math.floor(Math.random() * 2 ** 31), players: R.players.map(p => ({ id: p.id, name: p.name, av: p.av, slot: p.slot })) }, payload);
    NET.send(R.ch, Object.assign({ from: ARN.id }, go));
    setTimeout(() => arnStart(R, go), 120);   // host mulai sedikit setelah kirim supaya serempak
  }
}
const ARNET = {
  open(game, opt) { ARN.game = game; ARN.opt = opt || {}; ARN.err = ''; if (ARN.room) arnLeave(); ARN.scr = 'menu'; arnRender(); setTimeout(() => { const i = document.getElementById('arncode'); }, 50); },
  rng: arnRng,
  get room() { return ARN.room; },
  leave() { arnLeave(); arnHide(); }
};
document.addEventListener('keydown', e => { if (e.key === 'Escape' && document.getElementById('arnet') && document.getElementById('arnet').classList.contains('on')) { arnLeave(); arnHide(); } });