import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

const isBuild = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: 'https://cv-blog.netlify.app',
  output: 'static',
  integrations: [
    react(),
    ...(isBuild ? [] : [keystatic()]),
  ],
  markdown: {
    syntaxHighlight: 'prism'
  }
});
