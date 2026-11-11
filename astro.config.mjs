import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.GITHUB_PAGES_SITE ?? 'https://cookdance.com',
  base: process.env.GITHUB_PAGES_BASE ?? '/',
  output: 'static',
  devToolbar: { enabled: false },
  integrations: [mdx(), sitemap({ filter: (page) => { const path = new URL(page).pathname; return !path.includes('/preview/') && !path.endsWith('/studio/') && !path.endsWith('/read/'); } })],
  trailingSlash: 'always',
});
