// src/pages/robots.txt.ts

import type { APIRoute } from 'astro';

const getRobotsTxt = (sitemapURL: string ) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL}
`;

export const GET: APIRoute = ({ site }) => {
  let sitemapURL = "";

  if (site) {
    try {
        sitemapURL = new URL('/sitemap-index.xml', site).href;
    } catch (error) {
      console.error('Error creating sitemap URL:', error);
      sitemapURL = '/sitemap-index.xml'; // Fallback to relative URL
    }
  } else {
    sitemapURL = '/sitemap-index.xml \n invalid'; // Fallback to relative URL
  }

  return new Response(getRobotsTxt(sitemapURL));
};