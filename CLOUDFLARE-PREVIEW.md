# Cloudflare Pages trial

The first Cloudflare deployment is a separate `pages.dev` preview of the existing static site. The production domain stays on GitHub Pages until a later domain cutover is explicitly approved.

Trial URL: https://cookdance.pages.dev/

## Connect the existing repository

In Cloudflare, choose **Workers & Pages → Create application → Pages → Import an existing Git repository**. Authorize the GitHub integration for **only** `oooeee999-dot/CookDance`, then select that repository.

| Setting | Value |
| --- | --- |
| Project name | `cookdance` |
| Production branch | `main` |
| Framework preset | Astro |
| Root directory | Leave empty; the repository root contains `package.json` |
| Build command | `npm run check && npm run build` |
| Build output directory | `dist` |
| Node version | `.node-version` pins the locally tested `24.15.0`; use the current build image |

No API keys, server adapter, database, build bindings, custom domain, or DNS changes are required for this static preview. Choose Git integration so future GitHub pushes automatically rebuild this copy.

## Search behavior

The canonical URLs and sitemap continue to use `https://cookdance.com`. `public/_headers` sets `X-Robots-Tag: noindex` only for `*.pages.dev` and `*.*.pages.dev` hosts. It does not apply that header to the custom domain. The file is copied into `dist` by Astro and interpreted by Cloudflare Pages; GitHub Pages does not apply these header rules.

## Verify after deployment

- Open the assigned `pages.dev` URL and an article page.
- Check image, stylesheet, and navigation URLs.
- Confirm a `pages.dev` response includes `X-Robots-Tag: noindex`.
- Confirm canonical and sitemap URLs still point to `cookdance.com`.
- Push a small reviewed change and confirm the Cloudflare copy updates automatically.

When the preview has passed these checks, a separate approved step can switch the production domain. Keep the current GitHub Pages deployment available through that migration.
