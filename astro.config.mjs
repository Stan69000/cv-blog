import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';

const siteUrl = process.env.SITE_URL || 'https://stan-bouchet.com';
const siteConfig = JSON.parse(readFileSync(new URL('./src/data/site.json', import.meta.url), 'utf8'));
const sitemapConfig = {
  filter: (page) => siteConfig.blogPublished || !new URL(page).pathname.startsWith('/blog')
};

export default defineConfig({
  site: siteUrl,
  output: 'static',
  integrations: [react(), sitemap(sitemapConfig)],
  markdown: {
    syntaxHighlight: 'prism'
  }
});
