/* ========== BADGES ========== */
const BADGES = [
  ['w1', '🌱', 'Kata pertama', c => c.intro >= 1],
  ['w50', '🍃', '50 kata', c => c.intro >= 50],
  ['w150', '🌿', '150 kata', c => c.intro >= 150],
  ['w400', '🌸', '400 kata', c => c.intro >= 400],
  ['w800', '🌺', '800 kata', c => c.intro >= 800],
  ['a2', '🍑', 'Semua kata A2', c => c.a2 >= A2N],
  ['m100', '💎', '100 dikuasai', c => c.master >= 100],
  ['s3', '🔥', 'Streak 3', () => S.streak.best >= 3],
  ['s7', '☄️', 'Streak 7', () => S.streak.best >= 7],
  ['s30', '🌋', 'Streak 30', () => S.streak.best >= 30],
  ['cb20', '⚡', 'Combo 20', () => Object.values(S.days).some(d => d.combo >= 20)],
  ['st5', '✍️', '5 cerita sendiri', () => Object.keys(S.stories).length >= 5],
  ['bloom', '🏵️', 'Bunga mekar penuh', () => Object.values(S.days).some(d => d.bloom)],
  ['n1', '🎓', 'Novice 1 tuntas', c => c.lv[0] >= UNITS[0].reduce((a, u) => a + u.ids.length, 0)],
  ['n2', '🎓', 'Novice 2 tuntas', c => c.lv[1] >= UNITS[1].reduce((a, u) => a + u.ids.length, 0)],
  ['wr50', '✍️', '50 hanzi ditulis tangan', () => Object.keys(S.hzWrite || {}).length >= 50],
  ['l1', '🎓', 'Level 1 tuntas', c => c.lv[2] >= UNITS[2].reduce((a, u) => a + u.ids.length, 0)]
];
function checkBadges() {
  const c = counts();
  BADGES.forEach(([id, e, name, f]) => { if (!S.badges[id] && f(c)) { S.badges[id] = todayKey(); setTimeout(() => { toast(`${t('Lencana baru')}: <b>${t(name)}</b>`); FX.play('level'); }, 1200); } });
}