import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://cv-blog.netlify.app',
  markdown: {
    syntaxHighlight: 'prism'
  }
});
