# CookDance platform concept assets

Built-in Image Gen was used for the visual concepts and twelve individual illustrative food assets. The selected image-first composition follows the user's feedback on the Pinterest-like concept. These are generated concept images, not evidence of actual cooking or recipe testing.

## Visual target

`visual-target.png` — the final image-first homepage concept. Original generated raster: 946 × 1663. Its prompt specified a minimal CookDance header, only the wordmark and slogan as visible copy, search/bookmark utility icons, a near-white #FAF9F6 surface, deep olive #27392E, and a responsive masonry wall of distinct global food photographs. No article titles, categories, badges, ratings or purchasing controls on the homepage.

The user's later slogan candidate is reflected in the implementation: **Your cooking. A world of taste.** The existing repository favicon is retained instead of introducing the concept's invented circular mark.

## Individual image prompt set

Shared direction: one independent portrait food photograph, approximately 4:5; photorealistic natural daylight, warm neutral linen/stone/wood, tactile ceramics, appetizing ingredients and restrained premium culinary editorial composition. No text, UI, logos, watermarks, faces, ratings, location evidence or testing claims. Individual files were generated independently, inspected, then compressed to WebP with a maximum width of 900px and quality 85. No UI screenshot was sliced up to make the photographs.

| WebP file | Individual subject / prompt brief |
| --- | --- |
| mezze.webp | Mediterranean-inspired table with hummus, olive oil, olives, salad, flatbread, linen and olive branches; overhead-to-45-degree view |
| noodles.webp | Rustic bowl of East Asian-inspired noodles, chopsticks lifting strands, subtle steam, broth, herbs and vegetables |
| dumplings.webp | Close hands folding a dumpling on a flour-dusted wooden board, with a few finished dumplings behind |
| roasted-carrots.webp | Slender orange roasted carrots, dark earthen plate, green herbs, sesame and light yogurt |
| tacos.webp | Golden tortillas with colorful vegetables and herbs on a rustic ceramic plate, fresh lime and linen |
| bread.webp | Sliced sourdough loaf with butter in a small ceramic dish, warm wood and linen |
| citrus.webp | Fresh cut lemons, clear olive-oil cruet and green leaves on sunlit cream stone |
| rice-table.webp | Overhead Japanese-inspired everyday table with rice, a small soup and separate vegetable dishes |
| spices.webp | Bowls of turmeric, pepper flakes, coriander, cumin and peppercorns on a dark rustic table |
| soup.webp | Golden pumpkin-style soup with seeds and herbs in an earthen bowl, soft light and linen |
| vegetables.webp | Overhead plate of seasonal roasted squash, beetroot, cauliflower and herbs |
| coffee.webp | Flaky croissant and coffee in handmade ceramics, quiet morning light, linen and wood |

Served asset directory: `public/images/platform/`. Original generated PNGs are kept locally in the ignored `design/platform-demo/originals/` directory. `optimize-assets.mjs` records the conversion process. `compare-visuals.mjs` normalizes the target and browser captures for visual review.

The additional JPGs are Pexels photographs; their sources are listed in `DESIGN-DEMO.md`. Existing and additional project photography credits are collected in `PHOTOGRAPHY.md` at the project root.
