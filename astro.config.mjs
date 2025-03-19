// @ts-check
import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './src/remark-reading-time.mjs';
// solid js 
import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  markdown: {
      remarkPlugins: [
        remarkReadingTime,
      ]
  },

  integrations: [
    solidJs({ devtools: true }),
  ],
});