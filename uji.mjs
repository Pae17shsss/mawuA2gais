// Menjalankan tes.html di Microsoft Edge tanpa jendela, lalu melaporkan hasilnya.
//   npm run uji
// Memakai Edge yang sudah ada di Windows (tidak mengunduh browser) dan profil sementara,
// jadi progres di browser sehari-hari tidak tersentuh.
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.webmanifest': 'application/manifest+json', '.json': 'application/json' };
const EDGE = [process.env.XB_BROWSER, 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'].find(p => p && fs.existsSync(p));
if (!EDGE) { console.error('Edge/Chrome tidak ditemukan. Setel XB_BROWSER ke lokasi browser.'); process.exit(2); }

const server = http.createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname).replace(/^\/+/, '') || 'index.html';
  const f = path.resolve(root, p);
  if (!f.startsWith(root) || !fs.existsSync(f) || !fs.statSync(f).isFile()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(f).pipe(res);
});

server.listen(0, '127.0.0.1', () => {
  const port = server.address().port;
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'xb-uji-'));
  const args = ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', `--user-data-dir=${profile}`,
    '--window-size=412,900', '--virtual-time-budget=150000', '--dump-dom', `http://127.0.0.1:${port}/tes.html?cli=1`];
  const child = spawn(EDGE, args, { stdio: ['ignore', 'pipe', 'ignore'] });
  let dom = ''; child.stdout.on('data', d => { dom += d; });
  const kill = setTimeout(() => { child.kill(); }, 400000);
  child.on('close', () => {
    clearTimeout(kill); server.close();
    try { fs.rmSync(profile, { recursive: true, force: true }); } catch (e) {}
    const sum = (dom.match(/id="tes-sum"[^>]*>([^<]*)</) || [])[1] || '';
    const items = [...dom.matchAll(/<li class="(ok|no)">([^<]*)<\/li>/g)].map(m => ({ ok: m[1] === 'ok', nama: m[2] }));
    const gagal = items.filter(x => !x.ok);
    if (!items.length || /Menjalankan/.test(sum)) { console.error('Uji tidak selesai (halaman tidak sempat berjalan sampai akhir).' + (items.length ? ` Terakhir selesai (${items.length}): ${items[items.length - 1].nama}` : ' Tidak ada uji yang tercatat.')); process.exit(2); }
    gagal.forEach(x => console.error('GAGAL  ' + x.nama.replace(/&amp;/g, '&')));
    console.log(`${items.length - gagal.length} lolos, ${gagal.length} gagal — ${sum}`);
    process.exit(gagal.length ? 1 : 0);
  });
});
