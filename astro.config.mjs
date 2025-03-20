// @ts-check
import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './src/remark-reading-time.mjs';
// solid js 
import solidJs from '@astrojs/solid-js';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // site: 'https://stargazers.club',
  markdown: {
      remarkPlugins: [
        remarkReadingTime,
      ]
  },
  integrations: [solidJs({ devtools: true }), sitemap()],
});