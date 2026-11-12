// Xiaobu Kelas — build (Node, tanpa dependensi).
//
//   npm run build     merakit app.js dari src/app/*.js + cek sintaks
//   npm run cek       hanya memeriksa: app.js sama dengan src/app? sintaks sah?
//   npm run rilis     build + folder siap-unggah di rilis/, dengan versi cache dari isi file
//
// Versi cache: di sumber tertulis penanda tetap (k170). Saat rilis, penanda itu diganti
// "k" + 8 huruf hash dari isi semua file yang diunggah. Isi berubah → versi berubah sendiri,
// jadi pengguna PWA tidak mungkin lagi tertahan di file lama karena lupa menaikkan versi.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const mode = process.argv[2] || 'build';
const MARK = 'k170';
const DEPLOY = ['index.html', 'app.js', 'app.css', 'peak.js', 'peak.css', 'qr.js', 'data.js', 'sd.js', 'ctx.js', 'tocfl.js', 'hw.js', 'mdict.js', 'sw.js',
  'manifest.webmanifest', 'netlify.toml', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'LICENSES-kamus.txt'];
const TEXT_STAMP = ['index.html', 'sw.js', 'app.js', 'peak.js'];          // file yang memuat penanda versi

function assemble() {
  const dir = path.join(root, 'src', 'app');
  const parts = fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort();
  if (!parts.length) throw new Error('src/app kosong');
  return { text: parts.map(f => fs.readFileSync(path.join(dir, f), 'utf8')).join('\n'), n: parts.length };
}
function syntax(files) {
  for (const f of files) {
    try { execFileSync(process.execPath, ['--check', path.join(root, f)], { stdio: 'pipe' }); }
    catch (e) { throw new Error(`Sintaks salah di ${f}:\n${String(e.stderr || e.message).split('\n').slice(0, 6).join('\n')}`); }
  }
}

const { text, n } = assemble();
const target = path.join(root, 'app.js');
const current = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : '';

if (mode === 'cek') {
  if (current !== text) { console.error('BEDA: app.js tidak sama dengan src/app — jalankan: npm run build'); process.exit(1); }
  syntax(['app.js', 'peak.js', 'sw.js', 'tes.js']);
  console.log(`OK: app.js = gabungan ${n} file; sintaks app.js, peak.js, sw.js, tes.js sah`);
  process.exit(0);
}

if (current !== text) fs.writeFileSync(target, text);
syntax(['app.js', 'peak.js', 'sw.js', 'tes.js']);
console.log(`app.js dirakit dari ${n} file (${text.length.toLocaleString('id-ID')} karakter)${current === text ? ' — tidak berubah' : ''}; sintaks sah`);

if (mode === 'rilis') {
  const ver = (text.match(/const KLS_VER = 'V([0-9.]+)'/) || [])[1] || '0';
  const dest = path.join(root, 'rilis', `xiaobu-kelas-v${ver}-web`);
  fs.rmSync(dest, { recursive: true, force: true }); fs.mkdirSync(dest, { recursive: true });
  fs.writeFileSync(path.join(dest, '.nojekyll'), '');                      // GitHub Pages: sajikan file apa adanya
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `folder=${path.relative(root, dest).replace(/\\/g, '/')}\n`);
  const h = crypto.createHash('sha256');
  for (const f of DEPLOY) { const p = path.join(root, f); if (!fs.existsSync(p)) throw new Error('file rilis tidak ada: ' + f); h.update(f); h.update(fs.readFileSync(p)); }
  const stamp = 'k' + h.digest('hex').slice(0, 8);
  let hits = 0;
  for (const f of DEPLOY) {
    const src = path.join(root, f), out = path.join(dest, f);
    if (TEXT_STAMP.includes(f)) { const s = fs.readFileSync(src, 'utf8'); hits += s.split(MARK).length - 1; fs.writeFileSync(out, s.split(MARK).join(stamp)); }
    else fs.copyFileSync(src, out);
  }
  if (hits < 10) throw new Error(`penanda ${MARK} hanya ditemukan ${hits}× — periksa index.html, sw.js, app.js`);
  syntax([path.relative(root, path.join(dest, 'app.js')), path.relative(root, path.join(dest, 'sw.js'))]);
  const size = DEPLOY.reduce((a, f) => a + fs.statSync(path.join(dest, f)).size, 0);
  console.log(`Folder siap-unggah: ${path.relative(root, dest)} — ${DEPLOY.length} file, ${(size / 1048576).toFixed(1)} MB, versi cache ${stamp} (${hits} penanda diganti)`);
}
