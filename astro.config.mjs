// @ts-check
import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './src/remark-reading-time.mjs';
// solid js 
import solidJs from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://nthadrien.github.io',
  base: 'ceejey',
  // markdown settings
  markdown: {
      remarkPlugins: [
        remarkReadingTime,
      ]
  },
  integrations: [
    solidJs({ devtools: true }), 
    // sitemap()
  ]
});
