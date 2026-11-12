/* ========== V0.7: ikon kaca modern — semua emoji diganti ikon SVG yang seragam ==========
   Satu pengamat DOM mengganti emoji di teks (judul, tombol, toast, sesi) dengan ikon kaca.
   Simbol tipografi (✓ ✗ ✕ ★ ❚) juga dipetakan agar gaya ikon konsisten di seluruh app. */
Object.assign(ICON_PATHS, {
  warn: '<path d="M12 4.2 2.8 19.4h18.4z"/><path d="M12 10v4.4M12 17.2v.1"/>',
  mute: '<path d="M4 9.5h3.4L12 5.6v12.8l-4.6-3.9H4z"/><path d="m16 9.6 4.4 4.8M20.4 9.6 16 14.4"/>',
  party: '<path d="M4.5 20 9 7.5l7.5 7.5z"/><path d="M14 4.5c1.2 1 1.4 2.4.6 3.6M18.6 9.2c1.2-.4 2.4 0 3 1M16.5 3v.1M21 6v.1M20 14.5v.1"/>',
  music: '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
  flower: '<circle cx="12" cy="10" r="2.4"/><path d="M12 7.6c-.6-2.6.4-4 0-4s.6 1.4 0 4M12 7.6C10.6 4.6 7.4 5 8.2 7.4c.6 1.6 2.4 2 3.8 2.6M12 7.6c1.4-3 4.6-2.6 3.8-.2-.6 1.6-2.4 2-3.8 2.6M9.6 10.4c-2.8.6-3.4 3.6-1 3.8 1.6.2 2.8-1.2 3.4-2.4M14.4 10.4c2.8.6 3.4 3.6 1 3.8-1.6.2-2.8-1.2-3.4-2.4"/><path d="M12 12.4V21M12 17c-1.6-1.8-3.6-2-4.6-1.2M12 18.4c1.4-1.6 3.2-1.8 4.2-1"/>',
  tree: '<path d="M12 21v-5"/><path d="M12 3.2 6 11h3l-3.6 5H18.6L15 11h3z"/>',
  heart: '<path d="M12 20s-7.4-4.4-8.8-9A4.6 4.6 0 0 1 12 7.4 4.6 4.6 0 0 1 20.8 11C19.4 15.6 12 20 12 20z"/>',
  freeze: '<path d="M12 2.8v18.4M4 7.4l16 9.2M20 7.4 4 16.6"/><path d="m9.6 4.6 2.4 2 2.4-2M9.6 19.4l2.4-2 2.4 2"/>',
  swords: '<path d="M4 4l9 9M4 4h4l9 9M4 4v4l9 9"/><path d="m14 17 3 3M17 14l3 3M15.5 18.5l3-3"/><path d="M20 4l-6.5 6.5M20 4h-3.5M20 4v3.5"/>',
  coin: '<ellipse cx="12" cy="12" rx="8" ry="8"/><path d="M12 7.5v9M9.6 10a2.4 1.8 0 0 1 2.4-1.6c1.4 0 2.4.8 2.4 1.7 0 2-4.8 1.4-4.8 3.6 0 .9 1 1.8 2.4 1.8a2.6 2 0 0 0 2.6-1.6"/>',
  swap: '<path d="M4 8.5h14l-3.5-3.5M20 15.5H6l3.5 3.5"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2.2"/><path d="M16 8V5.6A1.6 1.6 0 0 0 14.4 4H5.6A1.6 1.6 0 0 0 4 5.6v8.8A1.6 1.6 0 0 0 5.6 16H8"/>',
  flag: '<path d="M5 21V4"/><path d="M5 4.5h11.5l-2.4 4 2.4 4H5"/>',
  pause: '<rect x="6.5" y="5" width="3.6" height="14" rx="1.2"/><rect x="13.9" y="5" width="3.6" height="14" rx="1.2"/>',
  cart: '<path d="M3 4h2.4l2.2 11h10.6l2-8H6.4"/><circle cx="9.5" cy="19.4" r="1.4"/><circle cx="17" cy="19.4" r="1.4"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  cup: '<path d="M6 7.5h10.5V15a4 4 0 0 1-4 4h-2.5a4 4 0 0 1-4-4z"/><path d="M16.5 9.5h1.6a2.4 2.4 0 0 1 0 4.8h-1.6M9 3.5c.6.8.6 1.6 0 2.4M12.4 3.5c.6.8.6 1.6 0 2.4"/>',
  dice: '<rect x="4" y="4" width="16" height="16" rx="3.4"/><circle cx="8.6" cy="8.6" r="1.1"/><circle cx="15.4" cy="8.6" r="1.1"/><circle cx="12" cy="12" r="1.1"/><circle cx="8.6" cy="15.4" r="1.1"/><circle cx="15.4" cy="15.4" r="1.1"/>',
  bag: '<rect x="3.6" y="7.6" width="16.8" height="12" rx="2.2"/><path d="M8.8 7.6V6a2 2 0 0 1 2-2h2.4a2 2 0 0 1 2 2v1.6M3.6 12.6h16.8"/>',
  eye: '<path d="M2.6 12S6 5.6 12 5.6 21.4 12 21.4 12 18 18.4 12 18.4 2.6 12 2.6 12z"/><circle cx="12" cy="12" r="2.8"/>',
  face: '<circle cx="12" cy="12" r="8.6"/><path d="M8.8 14.4c1.8 1.8 4.6 1.8 6.4 0M9 9.6v.1M15 9.6v.1"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.6v2M12 19.4v2M2.6 12h2M19.4 12h2M5.4 5.4l1.4 1.4M17.2 17.2l1.4 1.4M5.4 18.6l1.4-1.4M17.2 6.8l1.4-1.4"/>',
  rocket: '<path d="M13.6 15.6 8.4 10.4c1.8-4.4 5.6-7 10.4-7 0 4.8-2.6 8.6-7 10.4z"/><path d="M8.4 10.4 5 10l-1.6 2.6 3.8 1.2M13.6 15.6l.4 3.4-2.6 1.6-1.2-3.8"/><circle cx="14.6" cy="9.4" r="1.4"/>',
  medal: '<circle cx="12" cy="15" r="5"/><path d="M8.6 11.4 6 3.6h4l2 4.4 2-4.4h4l-2.6 7.8"/><path d="m12 12.6.9 1.6 1.7.3-1.3 1.2.3 1.8-1.6-.8-1.6.8.3-1.8-1.3-1.2 1.7-.3z"/>'
});
/* emoji → [ikon, nada warna] */
const GI_MAP = {
  '✓': ['check', 'g'], '✔': ['check', 'g'], '✅': ['check', 'g'], '☑': ['check', 'g'], '✗': ['close', 'r'], '✕': ['close', 'r'], '❌': ['close', 'r'], '✖': ['close', 'r'],
  '✎': ['write', 'v'], '✍': ['write', 'v'], '📝': ['write', 'v'], '⚠': ['warn', 'a'], '🩹': ['warn', 'a'], '✨': ['sparkle', 'a'], '🌟': ['sparkle', 'a'], '⭐': ['sparkle', 'a'], '★': ['sparkle', 'a'],
  '🔊': ['speaker', 'b'], '🔉': ['speaker', 'b'], '🔇': ['mute', 'n'], '🔕': ['mute', 'n'], '🎉': ['party', 'p'], '🎊': ['party', 'p'], '🎁': ['party', 'p'], '🎈': ['party', 'p'],
  '⚡': ['bolt', 'a'], '💥': ['bolt', 'r'], '💪': ['bolt', 'a'], '🎵': ['music', 'p'], '🎼': ['music', 'p'], '🎶': ['music', 'p'], '🌱': ['seed', 'g'], '🌿': ['seed', 'g'], '🌰': ['seed', 'g'], '🌸': ['flower', 'p'], '🌼': ['flower', 'a'], '🌷': ['flower', 'p'], '🍑': ['flower', 'p'], '🌳': ['tree', 'g'], '🎋': ['tree', 'g'],
  '⏱': ['clock', 'b'], '⏰': ['clock', 'b'], '⌛': ['clock', 'b'], '⏳': ['clock', 'b'], '🔥': ['flame', 'r'], '👑': ['crown', 'a'], '🏆': ['award', 'a'], '🏅': ['medal', 'a'], '🥇': ['medal', 'a'], '🎖': ['medal', 'a'],
  '❤': ['heart', 'p'], '💘': ['heart', 'p'], '💖': ['heart', 'p'], '💡': ['lightbulb', 'a'], '🧊': ['freeze', 'b'], '🎧': ['headphone', 'b'], '⚔': ['swords', 'r'], '🪙': ['coin', 'a'], '💸': ['coin', 'a'], '💰': ['coin', 'a'],
  '🐢': ['slow', 'g'], '🎯': ['target', 'r'], '👿': ['flame', 'v'], '↔': ['swap', 'n'], '🔁': ['refresh', 'b'], '🔄': ['refresh', 'b'], '📋': ['copy', 'n'], '⚑': ['flag', 'r'], '🏁': ['flag', 'n'], '🚩': ['flag', 'r'],
  '❚': ['pause', 'n'], '⏸': ['pause', 'n'], '🛒': ['cart', 'b'], '🛍': ['bag', 'p'], '💼': ['bag', 'b'], '🧩': ['puzzle', 'v'], '🧠': ['brain', 'p'], '🎓': ['class', 'v'], '🕹': ['game', 'v'], '🎮': ['game', 'v'],
  '💾': ['download', 'b'], '📥': ['download', 'b'], '📤': ['upload', 'b'], '📚': ['book', 'b'], '📖': ['book', 'b'], '📜': ['book', 'a'], '⌨': ['keyboard', 'n'], '🧱': ['blocks', 'a'], '🔎': ['search', 'n'], '🔍': ['search', 'n'],
  '⛰': ['tree', 'g'], '🌌': ['sparkle', 'v'], '☀': ['sun', 'a'], '🌙': ['sparkle', 'v'], '😲': ['face', 'a'], '😏': ['face', 'a'], '🫠': ['face', 'a'], '😊': ['face', 'a'], '🙂': ['face', 'a'], '🧋': ['cup', 'p'], '☕': ['cup', 'a'], '🍜': ['cup', 'a'],
  '💻': ['chip', 'b'], '🏭': ['chip', 'n'], '🚀': ['rocket', 'v'], '🙋': ['user', 'b'], '👤': ['user', 'b'], '🩺': ['plus', 'r'], '🏠': ['home', 'b'], '🧭': ['globe', 'b'], '🌐': ['globe', 'b'], '🤝': ['twins', 'g'],
  '❓': ['info', 'b'], '❔': ['info', 'b'], 'ℹ': ['info', 'b'], '🎲': ['dice', 'v'], '🔗': ['link', 'b'], '📱': ['phone', 'b'], '🤖': ['chip', 'v'], '🎯': ['target', 'r'], '👁': ['eye', 'b'], '🎤': ['mic', 'p'], '🗣': ['mic', 'p'], '👂': ['headphone', 'b'],
  '📌': ['flag', 'r'], '📍': ['flag', 'r'], '📅': ['calendar', 'b'], '🗓': ['calendar', 'b'], '🔔': ['info', 'a'], '🪄': ['sparkle', 'v'], '💬': ['chat', 'b'], '🗨': ['chat', 'b'], '🖊': ['write', 'v'], '✏': ['write', 'v'], '🔒': ['close', 'n'], '🔓': ['check', 'g']
};
const GI_RE = /(?:[←-⇿⌀-⏿①-⓿■-➿⬀-⯿ℹ]|[\uD83C-\uD83E][\uDC00-\uDFFF])️?(?:‍(?:[☀-➿]|[\uD83C-\uD83E][\uDC00-\uDFFF])️?)*/g;
const GI_KEEP = new Set(['→', '←', '↑', '↓', '·', '▶', '◀', '▸', '▾', '▴', '▢', '○', '●', '◆', '■', '□', '▲', '▼', '⇄', '↵', '⏎', '⌫', '⌘', '⌥', '…', '…']);
function GI(name, tone = 'n', cls = '') { return `<span class="gi gi-${tone} ${cls}" aria-hidden="true">${ICON(name)}</span>`; }
function giSwap(text) {
  GI_RE.lastIndex = 0; if (!GI_RE.test(text)) return null; GI_RE.lastIndex = 0;
  let changed = false;
  const html = esc(text).replace(GI_RE, m => {
    const base = m.replace(/️/g, '').split('‍')[0];
    const g = GI_MAP[base];
    if (!g && (GI_KEEP.has(base) || base.length === 1)) return m;   // simbol BMP tanpa peta (panah, bentuk) dibiarkan
    changed = true;
    return g ? GI(g[0], g[1]) : '';
  });
  return changed ? html : null;
}
const GI_SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, INPUT: 1, TITLE: 1, OPTION: 1, svg: 1, SVG: 1, CODE: 1 };
function giScan(root) {
  if (!root) return;
  if (root.nodeType === 3) return giText(root);
  if (root.nodeType !== 1 || GI_SKIP[root.nodeName] || root.closest && root.closest('svg,.no-gi')) return;
  const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => { GI_RE.lastIndex = 0; const p = n.parentNode; return p && !GI_SKIP[p.nodeName] && !(p.closest && p.closest('svg,.no-gi')) && GI_RE.test(n.nodeValue) ? 1 : 3; } });
  const list = []; while (tw.nextNode()) list.push(tw.currentNode);
  list.forEach(giText);
}
function giText(n) {
  const p = n.parentNode; if (!p || GI_SKIP[p.nodeName] || (p.closest && p.closest('svg,.no-gi'))) return;
  const h = giSwap(n.nodeValue); if (h === null) return;
  const t0 = document.createElement('template'); t0.innerHTML = h; p.replaceChild(t0.content, n);
}
let GI_OBS = null;
function giStart() {
  if (GI_OBS || !document.body) return;
  giScan(document.body);
  GI_OBS = new MutationObserver(ms => { ms.forEach(m => { if (m.type === 'characterData') giText(m.target); else m.addedNodes.forEach(giScan); }); });
  GI_OBS.observe(document.body, { childList: true, subtree: true, characterData: true });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', giStart); else setTimeout(giStart, 0);