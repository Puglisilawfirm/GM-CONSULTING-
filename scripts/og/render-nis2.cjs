// Copertine social delle pagine NIS2 (1200×630), rese da template HTML con
// Playfair Display e Inter (Google Fonts) tramite Playwright.
//
//   node scripts/og/render-nis2.cjs      → public/og/nis2.jpg, public/og/nis2-calcolatore.jpg
//
// La copertina dello Studio Legale (variante nero/rosso) vive nel repo del sito
// puglisilawfirm.it; qui si producono solo quelle di GM.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', '..', 'public', 'og');
const lockup = fs.readFileSync(path.join(__dirname, 'gm-lockup.png')).toString('base64');

const FONTS = `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">`;

// Scala dimensionale: il dettaglio che solo questa pagina ha.
const soglie = (accent, muted, text) => `
<div class="soglie">
  <div class="riga"><span class="k">MICRO</span><span class="track"><i style="width:12%"></i></span><span class="v">&lt; 10 occupati</span></div>
  <div class="riga"><span class="k">PICCOLA</span><span class="track"><i style="width:30%"></i></span><span class="v">&lt; 50 occupati</span></div>
  <div class="marker"><span></span>soglia NIS2</div>
  <div class="riga on"><span class="k">MEDIA</span><span class="track"><i style="width:68%"></i></span><span class="v">&lt; 250 occupati</span></div>
  <div class="riga on"><span class="k">GRANDE</span><span class="track"><i style="width:100%"></i></span><span class="v">&ge; 250 occupati</span></div>
</div>
<style>
.soglie{position:absolute;right:80px;top:176px;width:440px;font-family:Inter,sans-serif}
.riga{display:grid;grid-template-columns:92px 190px auto;align-items:center;column-gap:16px;height:46px;color:${muted};font-size:15px;letter-spacing:.14em}
.riga .k{font-weight:600}
.riga .track{display:block;height:10px;border-radius:2px;background:rgba(255,255,255,.07)}
.riga .track i{display:block;height:100%;border-radius:2px;background:${muted};opacity:.5}
.riga .v{font-size:15px;letter-spacing:.02em;white-space:nowrap}
.riga.on{color:${text}}
.riga.on .track i{background:${accent};opacity:1}
.marker{display:grid;grid-template-columns:190px auto;column-gap:16px;align-items:center;color:${accent};font-size:12px;letter-spacing:.16em;text-transform:uppercase;font-weight:600;margin:2px 0 2px 108px;white-space:nowrap}
.marker span{display:block;height:0;border-top:2px dashed ${accent}}
</style>`;

const studio = ({ title, subtitle, tags }) => `<!doctype html><html><head><meta charset="utf-8">${FONTS}
<style>
html,body{margin:0;width:1200px;height:630px;overflow:hidden}
body{position:relative;background:linear-gradient(135deg,#0f172a 0%,#111827 55%,#1a1030 100%);color:#fff;font-family:Inter,sans-serif}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px);background-size:60px 60px}
.glow{position:absolute;right:-180px;top:-220px;width:720px;height:720px;border-radius:50%;background:radial-gradient(circle,rgba(204,0,0,.28),transparent 62%)}
.bar{position:absolute;left:0;top:0;bottom:0;width:14px;background:#cc0000}
.brand{position:absolute;left:80px;top:72px;display:flex;align-items:center;gap:14px;font-size:20px;letter-spacing:.32em;color:#cbd5e1;font-weight:500}
.brand i{width:14px;height:14px;background:#cc0000;display:block}
.brand b{font-family:'Playfair Display',serif;font-weight:700;letter-spacing:.02em;font-size:26px;color:#fff}
.brand b em{color:#ff3b3b;font-style:normal}
h1{position:absolute;left:80px;top:188px;margin:0;width:600px;font-family:'Playfair Display',serif;font-weight:700;font-size:74px;line-height:1.04;letter-spacing:-.01em}
h1 em{font-style:italic;color:#ff5a5a}
p{position:absolute;left:80px;top:${title.replace(/<[^>]+>/g, "").length > 22 ? 392 : 320}px;margin:0;width:600px;font-size:27px;line-height:1.35;color:#cbd5e1;font-weight:400}
.tags{position:absolute;left:80px;bottom:64px;display:flex;gap:14px;align-items:center;font-size:15px;letter-spacing:.22em;color:#94a3b8;font-weight:600;text-transform:uppercase}
.tags i{width:40px;height:3px;background:#cc0000;display:block}
.foot{position:absolute;right:80px;bottom:64px;font-size:15px;letter-spacing:.08em;color:#94a3b8}
.foot b{color:#e2e8f0;font-weight:600}
</style></head><body>
<div class="grid"></div><div class="glow"></div><div class="bar"></div>
<div class="brand"><i></i><b><em>PUGLISI</em> LAW FIRM</b></div>
<h1>${title}</h1>
<p>${subtitle}</p>
${soglie('#cc0000', '#64748b', '#f1f5f9')}
<div class="tags"><i></i>${tags}</div>
<div class="foot">in tandem con <b>GM Consulting</b></div>
</body></html>`;

const gm = ({ title, subtitle, tags, foot }) => `<!doctype html><html><head><meta charset="utf-8">${FONTS}
<style>
html,body{margin:0;width:1200px;height:630px;overflow:hidden}
body{position:relative;background:linear-gradient(135deg,#001232 0%,#0F1B2D 60%,#152238 100%);color:#FAF8F3;font-family:Inter,sans-serif}
.lines{position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent 0,transparent 3px,rgba(15,30,54,.55) 3px,rgba(15,30,54,.55) 4px)}
.glow{position:absolute;right:-200px;top:-240px;width:760px;height:760px;border-radius:50%;background:radial-gradient(circle,rgba(201,168,76,.22),transparent 62%)}
.big{position:absolute;right:-10px;bottom:-60px;font-family:'Playfair Display',serif;font-weight:900;font-size:300px;line-height:1;color:rgba(201,168,76,.06);user-select:none}
.logo{position:absolute;left:70px;top:52px;height:112px}
.rule{position:absolute;left:80px;top:184px;width:72px;height:3px;background:#C9A84C}
h1{position:absolute;left:80px;top:214px;margin:0;width:620px;font-family:'Playfair Display',serif;font-weight:700;font-size:72px;line-height:1.05;letter-spacing:-.01em}
h1 em{font-style:italic;color:#D4B968}
p{position:absolute;left:80px;top:${title.replace(/<[^>]+>/g, "").length > 22 ? 414 : 330}px;margin:0;width:600px;font-size:26px;line-height:1.35;color:#E5D29A;opacity:.92}
.tags{position:absolute;left:80px;bottom:64px;display:flex;gap:14px;align-items:center;font-family:'JetBrains Mono',Inter,monospace;font-size:15px;letter-spacing:.22em;color:#C9A84C;font-weight:600;text-transform:uppercase}
.foot{position:absolute;right:80px;bottom:64px;font-size:15px;letter-spacing:.08em;color:#C0BFBA}
.foot b{color:#FAF8F3;font-weight:600}
</style></head><body>
<div class="lines"></div><div class="glow"></div><div class="big">NIS2</div>
<img class="logo" src="data:image/png;base64,${lockup}" alt="">
<div class="rule"></div>
<h1>${title}</h1>
<p>${subtitle}</p>
${soglie('#C9A84C', '#6B7A90', '#FAF8F3')}
<div class="tags">${tags}</div>
<div class="foot">${foot}</div>
</body></html>`;

const covers = [
  { file: 'nis2', html: gm({
      title: 'Rientri nel <em>perimetro NIS2?</em>',
      subtitle: 'Il test in tre passi secondo la lettura ACN: classe dimensionale, gruppo, tipologia di attività.',
      tags: 'D.Lgs. 138/2024 · Det. ACN 314287/2026',
      foot: 'in tandem con lo <b>Studio Legale Avv. Maria Puglisi</b>' }) },
  { file: 'nis2-calcolatore', html: gm({
      title: 'Calcolatore <em>NIS2</em>',
      subtitle: 'Essenziale, importante o fuori ambito? Valutazione preliminare gratuita, nel browser: nessun dato trasmesso.',
      tags: 'Strumento gratuito · Nessun dato trasmesso',
      foot: 'in tandem con lo <b>Studio Legale Avv. Maria Puglisi</b>' }) },
];

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const c of covers) {
    await p.setContent(c.html, { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(OUT, `${c.file}.jpg`), type: 'jpeg', quality: 90 });
    console.log('ok', c.file);
  }
  await b.close();
})();
