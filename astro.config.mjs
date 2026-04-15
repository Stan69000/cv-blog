import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://cv-blog.netlify.app',
  output: 'static',
  adapter: netlify(),
  integrations: [
    react(),
    keystatic(),
  ],
  markdown: {
    syntaxHighlight: 'prism'
  }
});
