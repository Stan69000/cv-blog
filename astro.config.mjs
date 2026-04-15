import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'https://cv-blog.netlify.app',
  output: 'static',
  integrations: [
    react(),
    keystatic(),
  ],
  markdown: {
    syntaxHighlight: 'prism'
  }
});
