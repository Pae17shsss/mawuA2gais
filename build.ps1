# Xiaobu Kelas - skrip build (tanpa Node).
#
#   .\build.ps1            menyusun ulang app.js dari src\app\*.js (urut nama file)
#   .\build.ps1 -Rilis     + menyalin file siap-unggah ke rilis\xiaobu-kelas-<versi>-web
#   .\build.ps1 -Cek       hanya memeriksa: apakah app.js sama dengan gabungan src\app ?
#
# Sumber kebenaran kode ada di src\app. Jangan menyunting app.js langsung: ia ditimpa setiap build.
# Urutan file menentukan urutan eksekusi (modul belakang membungkus fungsi modul depan).
param([switch]$Rilis, [switch]$Cek)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$enc = New-Object System.Text.UTF8Encoding $false

# Kalau Node terpasang, pakai build.mjs (cek sintaks + versi cache otomatis). Tanpa Node, lanjut ke cara lama di bawah.
$env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')
if (Get-Command node -ErrorAction SilentlyContinue) {
  $m = if ($Cek) { 'cek' } elseif ($Rilis) { 'rilis' } else { 'build' }
  & node (Join-Path $root 'build.mjs') $m
  exit $LASTEXITCODE
}

$parts = Get-ChildItem (Join-Path $root 'src\app') -Filter '*.js' | Sort-Object Name
if (-not $parts) { throw 'src\app kosong' }

$sb = New-Object System.Text.StringBuilder
$first = $true
foreach ($p in $parts) {
  if (-not $first) { [void]$sb.Append("`n") }
  [void]$sb.Append([IO.File]::ReadAllText($p.FullName, $enc))
  $first = $false
}
$out = $sb.ToString()
$target = Join-Path $root 'app.js'

if ($Cek) {
  $cur = [IO.File]::ReadAllText($target, $enc)
  if ($cur -ceq $out) { Write-Output "OK: app.js sama dengan gabungan $($parts.Count) file di src\app" } else { Write-Output "BEDA: app.js tidak sama dengan src\app - jalankan .\build.ps1"; exit 1 }
  return
}

[IO.File]::WriteAllText($target, $out, $enc)
Write-Output ("app.js disusun dari {0} file ({1:N0} byte)" -f $parts.Count, (Get-Item $target).Length)

if ($Rilis) {
  $ver = 'v1.7'
  $m = [regex]::Match($out, "const KLS_VER = 'V([0-9.]+)'")
  if ($m.Success) { $ver = 'v' + $m.Groups[1].Value }
  $dest = Join-Path $root "rilis\xiaobu-kelas-$ver-web"
  if (Test-Path $dest) { Remove-Item $dest -Recurse -Force }
  New-Item -ItemType Directory -Force $dest | Out-Null
  $files = 'index.html','app.js','app.css','peak.js','peak.css','plus.js','plus.css','guru.html','guru.js','guru.css','guru.webmanifest','qr.js','data.js','sd.js','ctx.js','tocfl.js','hw.js','mdict.js','sw.js',
           'manifest.webmanifest','netlify.toml','icon-192.png','icon-512.png','apple-touch-icon.png','LICENSES-kamus.txt'
  foreach ($f in $files) {
    $src = Join-Path $root $f
    if (-not (Test-Path $src)) { throw "file rilis tidak ada: $f" }
    Copy-Item $src $dest
  }
  Write-Output "Folder siap-unggah: $dest ($($files.Count) file)"
}
