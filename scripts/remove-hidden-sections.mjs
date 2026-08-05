import { readFile, rm } from 'node:fs/promises';

const siteConfig = JSON.parse(
  await readFile(new URL('../src/data/site.json', import.meta.url), 'utf8')
);

if (!siteConfig.blogPublished) {
  await rm(new URL('../dist/blog', import.meta.url), { recursive: true, force: true });
  console.log('Blog non publié : pages retirées du build statique.');
}
