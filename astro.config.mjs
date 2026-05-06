import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import netlify from '@astrojs/netlify';

const isO2SwitchBuild = process.env.DEPLOY_TARGET === 'o2switch';
const siteUrl = process.env.SITE_URL || 'https://stan-bouchet.eu';

export default defineConfig({
  site: siteUrl,
  output: isO2SwitchBuild ? 'static' : 'server',
  adapter: isO2SwitchBuild ? undefined : netlify(),
  integrations: isO2SwitchBuild ? [react()] : [react(), keystatic()],
  vite: {
    build: {
      // Keystatic bundles a heavy admin UI by design; raise warning threshold to avoid noisy false positives.
      chunkSizeWarningLimit: 3000
    }
  },
  markdown: {
    syntaxHighlight: 'prism'
  }
});
