/* ========== MASKOT: Hacimi 哈吉咪 (kucing berkerudung pink, outfit 小步 Mandarin) ==========
   Ekspresi: happy · joy · wow · think · oops · sleepy · wave               */
const MASCOT_EXPR = ['happy', 'joy', 'wow', 'think', 'oops', 'sleepy', 'wave'];
const MASCOT_NAME = 'Hacimi';
function mascot(expr = 'happy', size = 120, cls = '') {
  const hood = '#F4A9BC', hoodD = '#E58AA2', earIn = '#FCD5DF', face = '#FFFDFC', line = '#9C3F5C', blush = '#FBB9C9', nose = '#E8628A';
  const top = '#FFF6EE', trim = '#D9577A', gold = '#F2B935';
  const eye = (cx, flip) => {
    switch (expr) {
      case 'joy': case 'wave': return `<path d="M${cx - 9} 87 Q${cx} 76 ${cx + 9} 87" fill="none" stroke="${line}" stroke-width="3.6" stroke-linecap="round"/>`;
      case 'oops': return flip ? `<path d="M${cx - 7} 77 L${cx + 6} 83 L${cx - 7} 89" fill="none" stroke="${line}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>`
        : `<path d="M${cx + 7} 77 L${cx - 6} 83 L${cx + 7} 89" fill="none" stroke="${line}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>`;
      case 'sleepy': return `<path d="M${cx - 8} 84 L${cx + 8} 84" stroke="${line}" stroke-width="3.2" stroke-linecap="round"/>`;
      case 'wow': return `<g><ellipse cx="${cx}" cy="82" rx="7.5" ry="9" fill="${line}"/><circle cx="${cx - 2.6}" cy="78.4" r="3" fill="#fff"/><circle cx="${cx + 2.8}" cy="85.6" r="1.4" fill="#fff"/></g>`;
      case 'think': return flip ? `<g><ellipse cx="${cx + 2}" cy="82" rx="6" ry="7.5" fill="${line}"/><circle cx="${cx}" cy="79.5" r="2.4" fill="#fff"/></g>` : `<path d="M${cx - 8} 81 Q${cx} 88 ${cx + 8} 81" fill="none" stroke="${line}" stroke-width="3.4" stroke-linecap="round"/>`;
      default: return `<path d="M${cx - 9} 80 Q${cx} 89 ${cx + 9} 80" fill="none" stroke="${line}" stroke-width="3.6" stroke-linecap="round"/>`;
    }
  };
  const mouth = {
    joy: `<path d="M72 101 Q80 113 88 101 Z" fill="#D94F72" stroke="${line}" stroke-width="2" stroke-linejoin="round"/><path d="M76 106 Q80 109 84 106" fill="#F7A3B8"/>`,
    wave: `<path d="M72 101 Q80 113 88 101 Z" fill="#D94F72" stroke="${line}" stroke-width="2" stroke-linejoin="round"/>`,
    wow: `<ellipse cx="80" cy="105" rx="4.6" ry="5.6" fill="#D94F72" stroke="${line}" stroke-width="2"/>`,
    think: `<path d="M74 104 L86 102" stroke="${line}" stroke-width="2.6" stroke-linecap="round"/>`,
    oops: `<path d="M71 105 Q75 101 79 105 Q83 109 87 105" fill="none" stroke="${line}" stroke-width="2.4" stroke-linecap="round"/>`,
    sleepy: `<ellipse cx="80" cy="104" rx="3" ry="2.4" fill="#D94F72"/>`
  }[expr] || `<path d="M73 101 Q76.5 106 80 101 Q83.5 106 87 101" fill="none" stroke="${line}" stroke-width="2.6" stroke-linecap="round"/>`;
  const extra = expr === 'think' || expr === 'oops'
    ? `<path d="M128 52 Q133 62 128 66 Q123 62 128 52Z" fill="#AEDCFF" stroke="#62A9E6" stroke-width="1.2"/>` : expr === 'sleepy'
    ? `<text x="122" y="44" font-size="16" font-weight="800" fill="${trim}" font-family="system-ui">z</text><text x="134" y="30" font-size="12" font-weight="800" fill="${trim}" font-family="system-ui">z</text>` : expr === 'joy' || expr === 'wow'
    ? `<path d="M20 44 l2.4 6 6 2.4 -6 2.4 -2.4 6 -2.4 -6 -6 -2.4 6 -2.4z" fill="${gold}"/><path d="M140 36 l1.8 4.4 4.4 1.8 -4.4 1.8 -1.8 4.4 -1.8 -4.4 -4.4 -1.8 4.4 -1.8z" fill="${gold}"/>` : '';
  const paw = (x, y) => `<g><ellipse cx="${x}" cy="${y}" rx="9" ry="8" fill="#fff" stroke="#F0D9E0" stroke-width="1.4"/><circle cx="${x - 3.4}" cy="${y - 2.6}" r="1.6" fill="${blush}"/><circle cx="${x}" cy="${y - 3.8}" r="1.6" fill="${blush}"/><circle cx="${x + 3.4}" cy="${y - 2.6}" r="1.6" fill="${blush}"/><ellipse cx="${x}" cy="${y + 1.6}" rx="3" ry="2.4" fill="${blush}"/></g>`;
  const arms = expr === 'wave'
    ? `<path d="M110 136 Q126 124 128 104" stroke="${top}" stroke-width="13" fill="none" stroke-linecap="round"/><path d="M110 136 Q126 124 128 104" stroke="#EBD9CF" stroke-width="1.4" fill="none" stroke-dasharray="0" opacity=".0"/>${paw(129, 100)}${paw(52, 150)}`
    : `${paw(52, 150)}${paw(108, 150)}`;
  return `<svg class="mascot ${cls} m-${expr}" viewBox="0 0 160 160" width="${size}" height="${size}" role="img" aria-label="${MASCOT_NAME}">
    <path d="M118 152 Q140 150 138 132 Q137 124 130 126" fill="none" stroke="${hood}" stroke-width="8" stroke-linecap="round"/>
    <path d="M46 160 Q44 128 80 122 Q116 128 114 160 Z" fill="${top}" stroke="#EBD9CF" stroke-width="1.4"/>
    <path d="M64 124 Q80 132 96 124 L96 130 Q80 138 64 130 Z" fill="${trim}"/>
    <path d="M80 131 L80 160" stroke="${trim}" stroke-width="1.6" opacity=".55"/>
    <g fill="none" stroke="${trim}" stroke-width="2" stroke-linecap="round"><path d="M75 140 h10 M77.5 137.5 a2.5 2.5 0 1 0 0.1 0"/><path d="M75 150 h10 M77.5 147.5 a2.5 2.5 0 1 0 0.1 0"/></g>
    <circle cx="100" cy="142" r="6" fill="${gold}" stroke="#D99A1C" stroke-width="1"/><text x="100" y="145.3" font-size="8" text-anchor="middle" fill="#7A4A00" font-family="'Noto Sans TC','PingFang TC',sans-serif" font-weight="800">小</text>
    <path d="M30 60 L22 16 Q24 8 33 12 L64 34 Z" fill="${hood}" stroke="${hood}" stroke-width="8" stroke-linejoin="round"/>
    <path d="M130 60 L138 16 Q136 8 127 12 L96 34 Z" fill="${hood}" stroke="${hood}" stroke-width="8" stroke-linejoin="round"/>
    <path d="M34 50 L30 22 L54 38 Z" fill="${earIn}" stroke="${earIn}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M126 50 L130 22 L106 38 Z" fill="${earIn}" stroke="${earIn}" stroke-width="4" stroke-linejoin="round"/>
    <ellipse cx="80" cy="78" rx="58" ry="52" fill="${hood}"/>
    <ellipse cx="80" cy="84" rx="47" ry="42" fill="${hoodD}" opacity=".5"/>
    <path d="M58 116 Q56 126 52 130 M102 116 Q104 126 108 130" stroke="${trim}" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="51" cy="132" r="4.4" fill="#fff" stroke="${trim}" stroke-width="1.4"/><circle cx="109" cy="132" r="4.4" fill="#fff" stroke="${trim}" stroke-width="1.4"/>
    <ellipse cx="80" cy="86" rx="43" ry="37" fill="${face}"/>
    <path d="M44 66 Q50 54 62 52" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".55"/>
    <g class="m-eyes">${eye(62, false)}${eye(98, true)}</g>
    <ellipse cx="55" cy="95" rx="8.5" ry="4.6" fill="${blush}" opacity=".85"/><ellipse cx="105" cy="95" rx="8.5" ry="4.6" fill="${blush}" opacity=".85"/>
    <path d="M80 99 C75.5 95 72.5 91.5 75.6 88.6 C77.6 86.8 80 88.4 80 90.2 C80 88.4 82.4 86.8 84.4 88.6 C87.5 91.5 84.5 95 80 99 Z" fill="${nose}"/>
    ${mouth}
    <g stroke="${blush}" stroke-width="2.2" stroke-linecap="round"><path d="M44 92 L30 89 M44 98 L30 100"/><path d="M116 92 L130 89 M116 98 L130 100"/></g>
    ${arms}
    ${extra}
  </svg>`;
}
/* kalimat maskot sesuai situasi (diterjemahkan lewat t()) */
function mascotLine(ctx) {
  const h = new Date().getHours();
  const lines = {
    home_new: ['Ayo, {n} kata baru menunggumu hari ini!', 'Sedikit tapi setiap hari — itu rahasianya.', 'Lima menit sekarang lebih baik daripada satu jam besok.'],
    home_rev: ['{n} kata mulai pudar. Selamatkan dulu, yuk!', 'Ulang sekarang, sebelum lupa. Otakmu akan berterima kasih.'],
    home_done: ['Target hari ini beres! Kamu keren banget.', 'Misi selesai. Istirahat juga bagian dari belajar.'],
    night: ['Sudah malam. Ulang sebentar sebelum tidur — tidur mengunci ingatan.'],
    memory: ['Lupa itu normal. Yang penting kita ulang tepat sebelum lupa.'],
    listen: ['Pejamkan mata, dengarkan baik-baik. Telinga juga perlu dilatih!'],
    home_due: ['{n} kata sudah waktunya diulang. Sebentar saja, yuk!'],
    home_free: ['Target kata baru hari ini beres! Mau lanjut Simak atau Kartu ingat?', 'Hari ini sudah bagus. Latihan tambahan = bonus XP!']
  };
  let arr = lines[ctx] || lines.home_new;
  const seed = keyDiff('2026-01-01', todayKey()) * 24 + h;   // berganti tiap jam, tidak tiap klik
  return t(arr[seed % arr.length]);
}
function bubble(text, cls = '') { return `<div class="bubble ${cls}">${text}</div>`; }

/* kalimat saat maskot disentuh */
const POKE_LINES = ['加油！ Semangat!', 'Hehe, geli!', 'Satu kata lagi, yuk?', 'Kamu sudah hebat hari ini!', '我們一起加油！ Kita berjuang bareng!', 'Minum air dulu, lalu lanjut belajar!'];
function heartBurst(el) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (let k = 0; k < 6; k++) {
    const h = document.createElement('span'); h.className = 'heart';
    h.style.setProperty('--dx', ((k - 2.5) * 16 + (Math.random() * 10 - 5)) + 'px');
    h.style.setProperty('--dl', (k * 45) + 'ms');
    h.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 5 6.4 5c2.1 0 3.6 1.2 4.3 2.5h2.6C14 6.2 15.5 5 17.6 5 21 5 23.1 8.4 21.6 11.8 19.5 16.4 12 21 12 21z" fill="currentColor"/></svg>';
    el.appendChild(h); setTimeout(() => h.remove(), 1100);
  }
}