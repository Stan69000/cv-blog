import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../public/images/og');
mkdirSync(outDir, { recursive: true });

const pages = [
  {
    slug: 'home',
    eyebrow: 'Stan Bouchet',
    title: 'Curieux par nature,\ntouche-à-tout par passion.',
    tags: ['IT terrain', 'Développement web', 'Accessibilité']
  },
  {
    slug: 'parcours',
    eyebrow: 'Parcours',
    title: '20+ ans d\'expérience\nen IT terrain et développement web.',
    tags: ['Support IT', 'Automatisation', 'Formation']
  },
  {
    slug: 'projets',
    eyebrow: 'Projets',
    title: 'Applications, sites web\net open source.',
    tags: ['Astro', 'SwiftUI', 'Accessibilité']
  },
  {
    slug: 'engagement',
    eyebrow: 'Engagement associatif',
    title: 'S\'impliquer,\ncontribuer, transmettre.',
    tags: ['Le Singe du Numérique', 'RVAz', 'Bénévolat']
  },
  {
    slug: 'blog',
    eyebrow: 'Blog',
    title: 'Notes, retours d\'expérience\net réflexions tech.',
    tags: ['Web', 'IT', 'Accessibilité']
  },
  {
    slug: 'contact',
    eyebrow: 'Contact',
    title: 'Disponible pour vos projets\nweb et IT terrain.',
    tags: ['LinkedIn', 'GitHub', 'Réponse sous 2-3 jours']
  }
];

const template = ({ eyebrow, title, tags }) => `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Plus+Jakarta+Sans:wght@500;700&display=block" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px;
    height: 630px;
    background: #0a0a0a;
    color: #f5f0e8;
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    overflow: hidden;
    position: relative;
  }
  .bg-grad {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 60% at 90% 10%, rgba(180,140,80,0.13), transparent),
      radial-gradient(ellipse 50% 50% at 10% 90%, rgba(60,140,130,0.10), transparent);
  }
  .accent-bar {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, #b8945a, #3c8c82);
  }
  .content {
    position: relative;
    z-index: 1;
    padding: 64px 72px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .top { display: flex; flex-direction: column; gap: 20px; }
  .eyebrow {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #b8945a;
  }
  .title {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 68px;
    font-weight: 700;
    line-height: 1.08;
    letter-spacing: -0.02em;
    color: #f5f0e8;
    white-space: pre-line;
    max-width: 900px;
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .tags {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .tag {
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 999px;
    padding: 6px 16px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(245,240,232,0.7);
    background: rgba(255,255,255,0.05);
    letter-spacing: 0.02em;
  }
  .brand {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: rgba(245,240,232,0.4);
    letter-spacing: 0.04em;
    white-space: nowrap;
    padding-left: 24px;
  }
  .brand span { color: #b8945a; }
</style>
</head>
<body>
  <div class="bg-grad"></div>
  <div class="accent-bar"></div>
  <div class="content">
    <div class="top">
      <p class="eyebrow">${eyebrow}</p>
      <h1 class="title">${title}</h1>
    </div>
    <div class="bottom">
      <div class="tags">
        ${tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
      <p class="brand"><span>stan</span>-bouchet.com</p>
    </div>
  </div>
</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1200, height: 630 });

for (const item of pages) {
  const html = template(item);
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  const outPath = join(outDir, `${item.slug}.jpg`);
  await page.screenshot({ path: outPath, type: 'jpeg', quality: 88 });
  console.log(`✓ og/${item.slug}.jpg`);
}

await browser.close();
console.log('Done.');
