import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.GITHUB_PAGES_SITE ?? 'https://cookdance.com',
  base: process.env.GITHUB_PAGES_BASE ?? '/',
  output: 'static',
  integrations: [mdx(), sitemap()],
  trailingSlash: 'always',
});
