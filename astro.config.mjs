// @ts-check
import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './src/remark-reading-time.mjs';
// solid js 
import solidJs from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // site: 'https://nthadrien.github.io',
  base: '/',
  // markdown settings
  markdown: {
      remarkPlugins: [
        remarkReadingTime,
      ]
  },

  integrations: [
    solidJs({ devtools: true }), sitemap()
  ],
  // deploying on vercel config:
  output:'static',
  adapter: vercel()
});