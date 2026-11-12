/* ========== ICONS (inline SVG, stroke = currentColor) ========== */
const ICON_PATHS = {
  home: '<path d="M4 11.2 12 4.5l8 6.7V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19z"/><path d="M9.5 20.5v-6h5v6"/>',
  path: '<path d="M7 20c-2 0-3.2-1.2-3.2-2.8S5 14.4 7 14.4h10c2 0 3.2-1.2 3.2-2.8S19 8.8 17 8.8H7"/><circle cx="7" cy="4.8" r="2"/><circle cx="17" cy="19.2" r="2"/>',
  book: '<path d="M4 5.2A1.6 1.6 0 0 1 5.6 3.6H10a2.4 2.4 0 0 1 2 1.2 2.4 2.4 0 0 1 2-1.2h4.4A1.6 1.6 0 0 1 20 5.2v12a1.6 1.6 0 0 1-1.6 1.6H14a2 2 0 0 0-2 1.6 2 2 0 0 0-2-1.6H5.6A1.6 1.6 0 0 1 4 17.2z"/><path d="M12 6.8v12"/>',
  hanzi: '<rect x="3.8" y="3.8" width="16.4" height="16.4" rx="2.4"/><path d="M12 7v10M8 10.5h8" stroke-dasharray="0"/>',
  tone: '<path d="M3 12h2.4l2-6 3 13 2.6-9 2 4H21"/>',
  stats: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  user: '<circle cx="12" cy="8.5" r="3.6"/><path d="M4.8 20c.9-3.6 3.7-5.6 7.2-5.6S18.3 16.4 19.2 20"/>',
  grammar: '<path d="M4 6h10M4 12h16M4 18h7"/><circle cx="18" cy="6" r="2"/><circle cx="14" cy="18" r="2"/>',
  write: '<path d="M4 20.2 8.4 19 20 7.4a2 2 0 0 0 0-2.8l-.6-.6a2 2 0 0 0-2.8 0L5 15.6z"/><path d="M15 6.4 17.6 9"/>',
  seed: '<path d="M12 21v-6.5"/><path d="M12 14.5C12 10.9 9.1 8 5.5 8c0 3.6 2.9 6.5 6.5 6.5z"/><path d="M12 13.2c0-3 2.4-5.4 5.4-5.4 0 3-2.4 5.4-5.4 5.4z"/>',
  refresh: '<path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 4v4.4h-4.4"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>',
  bolt: '<path d="M13.4 3 5.8 13.4h5.1L10.6 21l7.6-10.4h-5.1z"/>',
  puzzle: '<path d="M9.4 4.6a1.8 1.8 0 0 1 3.6 0c0 .7-.4 1.1-.4 1.6h3.6a1 1 0 0 1 1 1V11c.5 0 .9-.4 1.6-.4a1.8 1.8 0 0 1 0 3.6c-.7 0-1.1-.4-1.6-.4v3.6a1 1 0 0 1-1 1h-4c0-.6.5-1 .5-1.8a1.9 1.9 0 0 0-3.8 0c0 .8.5 1.2.5 1.8H5.4a1 1 0 0 1-1-1V7.2a1 1 0 0 1 1-1H9c0-.5-.4-.9-.4-1.6"/>',
  headphone: '<path d="M4.4 15v-2.8a7.6 7.6 0 0 1 15.2 0V15"/><rect x="2.8" y="14.2" width="4.4" height="6" rx="2"/><rect x="16.8" y="14.2" width="4.4" height="6" rx="2"/>',
  keyboard: '<rect x="2.6" y="6.4" width="18.8" height="11.2" rx="2.2"/><path d="M6.4 10h.01M10 10h.01M13.6 10h.01M17.2 10h.01M8 13.8h8"/>',
  brain: '<path d="M9.6 4.4a2.6 2.6 0 0 0-2.6 2.6 2.4 2.4 0 0 0-1.4 4.3A2.6 2.6 0 0 0 7 15.8a2.6 2.6 0 0 0 5.2.2V6.6a2.2 2.2 0 0 0-2.6-2.2z"/><path d="M14.4 4.4A2.6 2.6 0 0 1 17 7a2.4 2.4 0 0 1 1.4 4.3A2.6 2.6 0 0 1 17 15.8a2.6 2.6 0 0 1-5.2.2"/>',
  layers: '<path d="M12 3.4 3.6 7.6 12 11.8l8.4-4.2z"/><path d="m4 12 8 4 8-4M4 16.4l8 4 8-4"/>',
  blocks: '<rect x="3.6" y="3.6" width="7" height="7" rx="1.6"/><rect x="13.4" y="3.6" width="7" height="7" rx="1.6"/><rect x="3.6" y="13.4" width="7" height="7" rx="1.6"/><rect x="13.4" y="13.4" width="7" height="7" rx="1.6"/>',
  flame: '<path d="M12 21c3.6 0 6-2.4 6-5.6 0-4-3.4-5.4-3.4-8.8 0-1.2.4-2.2 1-3-3.6.6-6.2 3.4-6.2 6.6 0 1.6.6 2.4.6 3.2 0 1-.8 1.6-1.6 1.6-1 0-1.6-.8-1.8-1.8-.8 1-1.2 2.2-1.2 3.4C5.4 18.8 8 21 12 21z"/>',
  award: '<circle cx="12" cy="9.4" r="5.4"/><path d="m8.6 14.2-1.2 6 4.6-2.4 4.6 2.4-1.2-6"/>',
  speaker: '<path d="M4.6 9.4h3l4-3.2v11.6l-4-3.2h-3z"/><path d="M15.4 9.6a3.4 3.4 0 0 1 0 4.8M17.8 7.2a6.8 6.8 0 0 1 0 9.6"/>',
  slow: '<circle cx="12" cy="12" r="8.2"/><path d="M12 7.4V12l3 1.8"/>',
  wave: '<path d="M3 12h2.6M8 12c0-3 1.4-5 3-5s3 2 3 5-1.4 5-3 5"/><path d="M16.6 12H21"/>',
  play: '<path d="M8 5.4 19 12 8 18.6z"/>',
  check: '<path d="m4.8 12.6 4.6 4.6L19.2 7.4"/>',
  close: '<path d="M6 6 18 18M18 6 6 18"/>',
  chevron: '<path d="m8.5 5.5 7 6.5-7 6.5"/>',
  search: '<circle cx="11" cy="11" r="6.4"/><path d="m16 16 4.4 4.4"/>',
  download: '<path d="M12 4v11"/><path d="m7.4 10.6 4.6 4.6 4.6-4.6"/><path d="M4.6 19.4h14.8"/>',
  upload: '<path d="M12 19.4V8.4"/><path d="m7.4 12.8 4.6-4.6 4.6 4.6"/><path d="M4.6 4.6h14.8"/>',
  undo: '<path d="M4 9.6h10.4a5.2 5.2 0 0 1 0 10.4H8"/><path d="M8 5.2 3.6 9.6 8 14"/>',
  plus: '<path d="M12 5.4v13.2M5.4 12h13.2"/>',
  settings: '<circle cx="12" cy="12" r="3.2"/><path d="M19.6 14.4a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1v.3a2 2 0 1 1-4 0v-.2a1.6 1.6 0 0 0-2.8-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H3.4a2 2 0 1 1 0-4h.2a1.6 1.6 0 0 0 1.1-2.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 2.7-1.1V3.4a2 2 0 1 1 4 0v.2a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7h.3a2 2 0 1 1 0 4h-.2a1.6 1.6 0 0 0-1.5 1.1z"/>',
  globe: '<circle cx="12" cy="12" r="8.2"/><path d="M3.8 12h16.4M12 3.8c2.2 2.4 3.3 5.2 3.3 8.2s-1.1 5.8-3.3 8.2c-2.2-2.4-3.3-5.2-3.3-8.2S9.8 6.2 12 3.8z"/>',
  sparkle: '<path d="M12 3.6 13.7 9 19 10.7 13.7 12.4 12 17.8 10.3 12.4 5 10.7 10.3 9z"/><path d="M18.4 16.4l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>',
  grid: '<rect x="3.6" y="3.6" width="16.8" height="16.8" rx="2.4"/><path d="M3.6 9.2h16.8M3.6 14.8h16.8M9.2 3.6v16.8M14.8 3.6v16.8"/>',
  clock: '<circle cx="12" cy="12" r="8.2"/><path d="M12 7v5.2l3.4 2"/>',
  calendar: '<rect x="3.6" y="5.4" width="16.8" height="15" rx="2.2"/><path d="M3.6 10h16.8M8.4 3.4v4M15.6 3.4v4"/>',
  phone: '<rect x="6.4" y="2.8" width="11.2" height="18.4" rx="2.6"/><path d="M10.6 18.2h2.8"/>',
  trash: '<path d="M4.8 6.8h14.4M9.6 6.8V4.6h4.8v2.2M6.8 6.8l1 12.6h8.4l1-12.6"/>',
  info: '<circle cx="12" cy="12" r="8.2"/><path d="M12 11v5.4M12 7.8h.01"/>',
  twins: '<circle cx="8.6" cy="12" r="5.4"/><circle cx="15.4" cy="12" r="5.4"/><path d="M12 8.2v7.6"/>',
  lightbulb: '<path d="M9.4 17.4a6 6 0 1 1 5.2 0"/><path d="M9.6 20.4h4.8M10 17.4h4"/>',
  game: '<rect x="2.6" y="7" width="18.8" height="10.6" rx="5.3"/><path d="M7.4 10.4v4M5.4 12.4h4"/><circle cx="15.6" cy="11.2" r=".9"/><circle cx="17.8" cy="13.6" r=".9"/>',
  chat: '<path d="M4.2 5.4h15.6a1.6 1.6 0 0 1 1.6 1.6v8.2a1.6 1.6 0 0 1-1.6 1.6H10l-4.4 3.4v-3.4H4.2a1.6 1.6 0 0 1-1.6-1.6V7a1.6 1.6 0 0 1 1.6-1.6z"/><path d="M7.6 10.4h8.8M7.6 13h5.4"/>',
  chip: '<rect x="7" y="7" width="10" height="10" rx="1.6"/><rect x="3.4" y="3.4" width="17.2" height="17.2" rx="2.6"/><path d="M3.4 9.5H1.6M3.4 14.5H1.6M22.4 9.5h-1.8M22.4 14.5h-1.8M9.5 3.4V1.6M14.5 3.4V1.6M9.5 22.4v-1.8M14.5 22.4v-1.8"/>',
  quote: '<path d="M8.6 6.6C6 7.8 4.6 10 4.6 13v4.4h5.6V12H7.4c0-1.8.6-3 1.2-3.6z"/><path d="M18 6.6c-2.6 1.2-4 3.4-4 6.4v4.4h5.6V12h-2.8c0-1.8.6-3 1.2-3.6z"/>'
};
function ICON(name, cls = '') {
  const p = ICON_PATHS[name] || ICON_PATHS.sparkle;
  return `<svg class="ic-svg ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
}
function TILE(name, cls = '') { return `<span class="ic-tile ${cls}">${ICON(name)}</span>`; }
/* konteks tema unit -> ikon */
const CTX_ICON = { '個人資料': 'user', '健康及身體照護': 'brain', '其他': 'sparkle', '工作': 'layers', '房屋與家庭、環境': 'home', '教育': 'book', '旅行': 'path', '日常生活': 'clock', '與他人的關係': 'user', '購物': 'grid', '閒暇時間、娛樂': 'puzzle', '飲食': 'quote' };
const ctxIcon = c => ICON(CTX_ICON[c] || (typeof semiCatIcon === 'function' && /^SEMI_/.test(c) ? semiCatIcon(c) : 'sparkle'));
const QUEST_ICON = { new: 'seed', rev: 'refresh', prac: 'target', prac2: 'target', tone: 'tone', hz: 'hanzi', combo: 'bolt', match: 'puzzle', story: 'lightbulb', listen: 'headphone', type: 'keyboard', sent: 'blocks', write: 'write' };
const BADGE_ICON = { w1: 'seed', w50: 'book', w150: 'book', w400: 'layers', w800: 'layers', a2: 'award', m100: 'award', s3: 'flame', s7: 'flame', s30: 'flame', cb20: 'bolt', st5: 'lightbulb', bloom: 'sparkle', n1: 'award', n2: 'award', l1: 'award', wr50: 'write' };