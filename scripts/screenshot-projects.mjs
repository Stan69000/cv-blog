import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_DIR = resolve(ROOT, 'public/images/projects');

const targets = [
  { slug: 'le-singe-du-numerique', url: 'https://lesingedunumerique.fr/' },
  { slug: 'natur-au-feminin', url: 'https://naturaufeminin.fr/' },
  { slug: 'stan-bouchet-eu', url: 'https://stan-bouchet.eu/' },
  { slug: 'stan-bouchet-com', url: 'https://stan-bouchet.com/' },
  { slug: 'astro-a11y', url: 'https://stan69000.github.io/astro-a11y' },
  { slug: 'rgaa-audit', url: 'https://stan69000.github.io/rgaa-audit/' }
];

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1.5,
  colorScheme: 'light'
});

for (const { slug, url } of targets) {
  const page = await context.newPage();
  process.stdout.write(`→ ${slug}  ${url} ... `);
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 });
    await page.waitForTimeout(800);
    const out = resolve(OUT_DIR, `${slug}.jpg`);
    await page.screenshot({ path: out, fullPage: false, type: 'jpeg', quality: 82 });
    console.log('ok');
  } catch (err) {
    console.log(`failed: ${err.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log(`\nScreenshots written to ${OUT_DIR}`);
