/* ========== V1.0: HURUF KEMBAR BERGERAK — morph engine (pure, no app globals) ==========
   Tiap goresan (outline hanzi-writer-data, kotak 1024, y terbalik) dipecah jadi dua "sisi" (kiri/kanan) dari ujung awal ke ujung akhir
   goresan berdasarkan median-nya, lalu di-resample ke K titik per sisi. Dua goresan dengan struktur sisi yang sama bisa
   di-interpolasi titik-demi-titik tanpa simpul kusut. Pencocokan goresan antar-huruf: algoritma Hungaria pada jarak median. */
const TWM = (() => {
  const K = 56, KM = 14;
  const cache = {};
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  function flat(d) {
    const tk = d.match(/[MLQCZ]|-?\d+(?:\.\d+)?/g) || []; const P = []; let i = 0, cmd = 'M', cx = 0, cy = 0;
    const num = () => +tk[i++];
    while (i < tk.length) {
      if (/[MLQCZ]/.test(tk[i])) cmd = tk[i++];
      if (cmd === 'Z') continue;
      if (cmd === 'M' || cmd === 'L') { cx = num(); cy = num(); P.push([cx, cy]); }
      else if (cmd === 'Q') { const x1 = num(), y1 = num(), x = num(), y = num(); for (let s = 1; s <= 6; s++) { const t = s / 6, u = 1 - t; P.push([u * u * cx + 2 * u * t * x1 + t * t * x, u * u * cy + 2 * u * t * y1 + t * t * y]); } cx = x; cy = y; }
      else if (cmd === 'C') { const x1 = num(), y1 = num(), x2 = num(), y2 = num(), x = num(), y = num(); for (let s = 1; s <= 8; s++) { const t = s / 8, u = 1 - t; P.push([u * u * u * cx + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x, u * u * u * cy + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y]); } cx = x; cy = y; }
      else i++;
    }
    const Q = []; for (const p of P) if (!Q.length || dist(Q[Q.length - 1], p) > .5) Q.push(p);
    if (Q.length > 2 && dist(Q[0], Q[Q.length - 1]) < .5) Q.pop();
    return Q;
  }
  function resample(pts, n) {
    const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + dist(pts[i - 1], pts[i]));
    const tot = L[L.length - 1] || 1; const out = []; let j = 0;
    for (let k = 0; k < n; k++) {
      const s = tot * k / (n - 1); while (j < pts.length - 2 && L[j + 1] < s) j++;
      const seg = (L[j + 1] - L[j]) || 1; const f = Math.min(1, Math.max(0, (s - L[j]) / seg)); const a = pts[j], b = pts[Math.min(j + 1, pts.length - 1)];
      out.push([a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f]);
    }
    return out;
  }
  function area(P) { let s = 0; for (let i = 0; i < P.length; i++) { const a = P[i], b = P[(i + 1) % P.length]; s += a[0] * b[1] - b[0] * a[1]; } return s / 2; }
  function unit(a, b) { const d = Math.hypot(a[0] - b[0], a[1] - b[1]) || 1; return [(a[0] - b[0]) / d, (a[1] - b[1]) / d]; }
  function stroke(d, med) {
    let P = flat(d); if (area(P) < 0) P = P.reverse();
    const n = P.length, m0 = med[0], m1 = med[Math.min(1, med.length - 1)], mE = med[med.length - 1], mE1 = med[Math.max(0, med.length - 2)];
    const u0 = unit(m0, m1), uE = unit(mE, mE1); const p0 = [m0[0] + u0[0] * 28, m0[1] + u0[1] * 28], pE = [mE[0] + uE[0] * 28, mE[1] + uE[1] * 28];
    let iS = 0, iE = 0, bs = 1e9, be = 1e9;
    P.forEach((p, i) => { const a = dist(p, p0), b = dist(p, pE); if (a < bs) { bs = a; iS = i; } if (b < be) { be = b; iE = i; } });
    if (iS === iE) iE = (iS + (n >> 1)) % n;
    const A = [], B = []; for (let i = iS; ; i = (i + 1) % n) { A.push(P[i]); if (i === iE) break; }
    for (let i = iS; ; i = (i - 1 + n) % n) { B.push(P[i]); if (i === iE) break; }
    const mr = resample(med, KM);
    return { d, A: resample(A, K), B: resample(B, K), M: mr, c: mr[KM >> 1] };
  }
  function prep(ch) {
    if (cache[ch]) return cache[ch];
    const raw = TWD.c[ch]; if (!raw) return null;
    return (cache[ch] = { ch, s: raw[0].map((d, i) => stroke(d, raw[1][i])) });
  }
  function hungarian(a) { /* square matrix, minimise */
    const n = a.length, INF = 1e18, u = Array(n + 1).fill(0), v = Array(n + 1).fill(0), p = Array(n + 1).fill(0), way = Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
      p[0] = i; let j0 = 0; const minv = Array(n + 1).fill(INF), used = Array(n + 1).fill(false);
      do {
        used[j0] = true; const i0 = p[j0]; let delta = INF, j1 = 0;
        for (let j = 1; j <= n; j++) if (!used[j]) { const cur = a[i0 - 1][j - 1] - u[i0] - v[j]; if (cur < minv[j]) { minv[j] = cur; way[j] = j0; } if (minv[j] < delta) { delta = minv[j]; j1 = j; } }
        for (let j = 0; j <= n; j++) if (used[j]) { u[p[j]] += delta; v[j] -= delta; } else minv[j] -= delta;
        j0 = j1;
      } while (p[j0] !== 0);
      do { const j1 = way[j0]; p[j0] = p[j1]; j0 = j1; } while (j0);
    }
    const r = Array(n).fill(-1); for (let j = 1; j <= n; j++) if (p[j]) r[p[j] - 1] = j - 1; return r;
  }
  const mcost = (a, b) => { let s = 0; for (let k = 0; k < KM; k++) s += dist(a.M[k], b.M[k]); return s / KM; };
  /* plan transisi X→Y: daftar {a,b,kind:'same'|'morph'|'out'|'in', mv:jarak} */
  const plans = {};
  function plan(x, y, keys) {
    const key = x + '>' + y; if (plans[key]) return plans[key];
    const X = prep(x), Y = prep(y), n = X.s.length, m = Y.s.length, N = n + m, T = 320;
    const M = []; for (let i = 0; i < N; i++) { const row = []; for (let j = 0; j < N; j++) row.push(i < n && j < m ? mcost(X.s[i], Y.s[j]) : (i >= n && j >= m ? 0 : T)); M.push(row); }
    const as = hungarian(M); const out = []; const usedB = new Set();
    for (let i = 0; i < n; i++) {
      const j = as[i];
      if (j < m && M[i][j] < T) { usedB.add(j); const c = M[i][j]; out.push({ a: X.s[i], b: Y.s[j], ia: i, ib: j, kind: c < 16 ? 'same' : 'morph', mv: c }); }
      else out.push({ a: X.s[i], b: null, ia: i, ib: -1, kind: 'out', mv: 999 });
    }
    for (let j = 0; j < m; j++) if (!usedB.has(j)) out.push({ a: null, b: Y.s[j], ia: -1, ib: j, kind: 'in', mv: 999 });
    /* ambang "berubah": goresan yang bergeser jauh dibanding rata-rata dianggap goresan utama */
    /* buang efek tata-letak ulang (huruf mengecil/bergeser) dgn fit skala+geser per sumbu, lalu ukur perubahan bentuk */
    const pr = out.filter(o => o.a && o.b); let F = [1, 0, 1, 0];
    const fit = L => { const f = ax => { let n = 0, sx = 0, sy = 0, sxx = 0, sxy = 0; L.forEach(o => o.a.M.forEach((p, k) => { const x = p[ax], y = o.b.M[k][ax]; n++; sx += x; sy += y; sxx += x * x; sxy += x * y; })); const d = n * sxx - sx * sx; const a = Math.abs(d) < 1e-6 ? 1 : (n * sxy - sx * sy) / d; return [a, (sy - a * sx) / Math.max(1, n)]; }; const X = f(0), Y = f(1); return [X[0], X[1], Y[0], Y[1]]; };
    const md = o => Math.max(...o.a.M.map((p, k) => Math.hypot(p[0] * F[0] + F[1] - o.b.M[k][0], p[1] * F[2] + F[3] - o.b.M[k][1])));
    if (pr.length >= 3) { F = fit(pr); const keep = pr.slice().sort((p, q) => md(p) - md(q)).slice(0, Math.max(3, Math.ceil(pr.length * .7))); F = fit(keep); if (!(F[0] > .5 && F[0] < 2 && F[2] > .5 && F[2] < 2)) F = [1, 0, 1, 0]; }
    out.forEach(o => { o.md = o.a && o.b ? md(o) : 0; o.mr = o.a && o.b ? Math.max(...o.a.M.map((p, k) => dist(p, o.b.M[k]))) : 0; });
    const MD = Math.max(0, ...out.map(o => o.md));
    const io = out.some(o => o.kind === 'in' || o.kind === 'out'); const kx = keys && keys[x], ky = keys && keys[y];
    out.forEach(o => {
      if (o.kind === 'in' || o.kind === 'out') o.hot = true;
      else if (kx && ky) o.hot = (ky.includes(o.ib) || kx.includes(o.ia)) && o.mr > 45;
      else o.hot = o.kind === 'morph' && (io ? o.md >= Math.max(110, .8 * MD) : o.md >= Math.max(45, .6 * MD));
    });
    return (plans[key] = { x, y, X, Y, list: out.sort((p, q) => (p.ib < 0 ? 99 : p.ib) - (q.ib < 0 ? 99 : q.ib)) });
  }
  const ease = {
    back: t => { const s = 1.55; t -= 1; return t * t * ((s + 1) * t + s) + 1; },
    io: t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    out: t => 1 - Math.pow(1 - t, 3)
  };
  const lerpS = (P, Q, e) => P.map((p, k) => [p[0] + (Q[k][0] - p[0]) * e, p[1] + (Q[k][1] - p[1]) * e]);
  function poly(A, B) {
    let s = 'M' + A[0][0].toFixed(1) + ' ' + A[0][1].toFixed(1);
    for (let k = 1; k < A.length; k++) s += 'L' + A[k][0].toFixed(1) + ' ' + A[k][1].toFixed(1);
    for (let k = B.length - 1; k >= 0; k--) s += 'L' + B[k][0].toFixed(1) + ' ' + B[k][1].toFixed(1);
    return s + 'Z';
  }
  function sub(P, f) { /* potong sisi sampai fraksi f (0..1) */
    if (f >= 1) return P; const n = Math.max(2, Math.round(2 + (P.length - 2) * f)); const L = (P.length - 1) * f;
    const out = []; for (let k = 0; k < n; k++) { const s = L * k / (n - 1); const i = Math.min(P.length - 2, Math.floor(s)); const r = s - i; out.push([P[i][0] + (P[i + 1][0] - P[i][0]) * r, P[i][1] + (P[i + 1][1] - P[i][1]) * r]); }
    return out;
  }
  /* bentuk satu item rencana pada progres t (0..1). return {d, hot, op, pt (titik aktif utk partikel)} */
  function frame(o, t) {
    if (o.kind === 'same') return { d: t < .5 ? (t <= 0 ? o.a.d : poly(lerpS(o.a.A, o.b.A, t), lerpS(o.a.B, o.b.B, t))) : (t >= 1 ? o.b.d : poly(lerpS(o.a.A, o.b.A, t), lerpS(o.a.B, o.b.B, t))), op: 1 };
    if (o.kind === 'morph') {
      if (t <= 0) return { d: o.a.d, op: 1 }; if (t >= 1) return { d: o.b.d, op: 1 };
      const e = ease.back(Math.min(1, t * 1.05)); const A = lerpS(o.a.A, o.b.A, e), B = lerpS(o.a.B, o.b.B, e);
      return { d: poly(A, B), op: 1, pt: lerpS([o.a.c], [o.b.c], e)[0] };
    }
    if (o.kind === 'in') {
      const f = ease.io(Math.min(1, Math.max(0, (t - .3) / .7))); if (f <= 0) return { d: '', op: 0 }; if (f >= 1) return { d: o.b.d, op: 1 };
      const A = sub(o.b.A, f), B = sub(o.b.B, f); return { d: poly(A, B), op: Math.min(1, f * 3), pt: [(A[A.length - 1][0] + B[B.length - 1][0]) / 2, (A[A.length - 1][1] + B[B.length - 1][1]) / 2] };
    }
    /* out: ditarik balik ke ujung awal */
    const f = 1 - ease.io(Math.min(1, t / .65)); if (f >= 1) return { d: o.a.d, op: 1 }; if (f <= 0) return { d: '', op: 0 };
    const A = sub(o.a.A, f), B = sub(o.a.B, f); return { d: poly(A, B), op: Math.min(1, f * 2.5), pt: [(A[A.length - 1][0] + B[B.length - 1][0]) / 2, (A[A.length - 1][1] + B[B.length - 1][1]) / 2] };
  }
  /* path statis satu huruf, hot = indeks goresan yang disorot */
  function still(ch) { const X = prep(ch); return X ? X.s.map(s => s.d) : []; }
  return { prep, plan, frame, still, ease, K };
})();
