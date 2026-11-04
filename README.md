# CookDance

An English editorial website for curious home cooks. Brand line: **Understand Food. Enjoy Cooking.**

## Local preview (Windows PowerShell)

```powershell
cd 'C:\Users\Administrator\Documents\ChatGPT\个人网站建设\CookDance'
npm install
npm run dev
```

Open the Local URL printed by Astro (normally `http://127.0.0.1:4321/`). For a production build, run `npm run check` and `npm run build`.

## Structure

```text
public/images/               Local editorial photography
src/components/              Reusable content cards
src/content/articles/        Markdown and MDX articles
src/content.config.ts        Typed article frontmatter
src/layouts/                 Shared site shell and SEO metadata
src/pages/                   Home, sections, About, article details
src/styles/                  Brand design system
```

## Project stages

- **Stage 1 complete:** visual system, responsive homepage and navigation, section entry pages, and article detail template.
- **Stage 2 planned:** recipe content model and template, category and tag browsing, client-side search, and expanded editorial library.
- **Stage 3 planned:** final responsive audit, SEO and performance work, and GitHub-connected deployment configuration. Publishing to `CookDance.com` and DNS changes require explicit approval.

The site is static, with no database or account system. A future Shopify store can live on a separate subdomain or be linked from a dedicated section without changing the editorial content model.

The `main` branch runs a build check on every push through GitHub Actions. Hosting can also be connected to the same branch for automatic updates.

Current articles are editorial examples. They do not claim original recipe or experiment testing. The empty Recipes and Stories sections are clearly labeled as in development.

## Photography

Locally stored photographs are from [Pexels](https://www.pexels.com/license/) and credited here:

- `hero.jpg`: [Lucie Liz](https://www.pexels.com/photo/overhead-shot-of-ingredients-near-a-chopping-board-7432996/)
- `prep.jpg`: [Artem Podrez](https://www.pexels.com/photo/a-person-cutting-vegetables-7495765/)
- `knife.jpg`: [Jonathan Borba](https://www.pexels.com/photo/close-up-shot-of-a-person-slicing-a-vegetable-14590496/)
- `pasta.jpg`: [Dextar Studio](https://www.pexels.com/photo/delicious-pasta-on-plate-on-table-15813476/)
