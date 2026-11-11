# CookDance photo-first prototype QA

final result: passed

## Root-homepage promotion

The image wall now renders at `/`, with details at `/read/` and the browser-local content studio at `/studio/`. Root-page evidence: `design/platform-demo/root-home-local.jpg`. Browser checks confirmed root-to-story navigation and logo links, new headers on About, the filtered two-item Kitchen collection, a working 20-item studio, and no application errors in the inspected log. The approved composition and assets remain unchanged. Root metadata allows indexing; the query-based illustrative reader and studio remain noindex. Previous preview entry points redirect through `public/_redirects`. The earlier QA record below describes the original preview-stage captures.

Date: 2026-11-11. Scope: local `/preview/` discovery, reading, search, saved collection, and content-studio prototype. No production deployment.

This is the record of the local QA stage, before the subsequent GitHub push. Current online entry points and publishing instructions are maintained in `README.md`, `CONTENT-GUIDE.md`, and `DEPLOYMENT.md`.

## Source and implementation evidence

- Source visual truth: `design/platform-demo/visual-target.png`, generated raster 946 × 1663.
- Final desktop implementation: `design/platform-demo/07-photo-wall-final-1440.jpg`; CSS test viewport 1440 × 900. Capture provider returned a 1425 × 891 content raster in the final run; it is normalized to 1440 × 900 for comparison (approximately 1.0105× horizontally and 1.0101× vertically). The tiny aspect difference is not used to claim pixel precision.
- The source is scaled proportionally to width 1440 and its first 900px compared against the same homepage state. No device frame or browser chrome in the reference.
- Combined comparison, source left and implementation right: `design/platform-demo/design-qa-comparison.jpg` (2880 × 900).
- Focused header comparison, source above implementation: `design/platform-demo/design-qa-header.jpg`. This verifies the only persistent visible text, utility icons and first-image position at a readable size.
- Full desktop evidence: `design/platform-demo/10-photo-wall-desktop-full.jpg`.
- Mobile: CSS viewport 390 × 844, two columns. `design/platform-demo/09-photo-wall-mobile-full.jpg` is the final complete mobile capture, 375 × 2312 content pixels after the capture provider excludes the scrollbar region. `08-photo-wall-mobile-390.jpg` is its top 844px, without a device frame. An earlier partial capture was rejected and replaced by this full-page evidence.
- Article example: `design/platform-demo/05-story-desktop.jpg`.
- Content editor: `design/platform-demo/06-content-studio.jpg`.
- User-facing open preview capture: `design/platform-demo/12-preview-ready.jpg`.

## Comparison history and fixes

1. **V1 — P2: first-row proportions and header scale.** The combined evidence in `design-qa-comparison-v1.jpg` showed short, uniform opening tiles and a smaller-than-intended brand lockup. This weakened the portrait photography rhythm. The desktop lockup was enlarged, the header set to 112px, and opening image ratios set to 3:5 and 5:8. Mobile keeps its compact 76px header.
2. **V2 — passed.** The final combined comparison and header comparison were opened together and inspected. Four clear opening subjects, stronger portrait rhythm, consistent spacing, readable brand lockup, restrained utility controls, and image-only discovery remain. Mobile captures show two columns without overlap or horizontal overflow. No actionable P0/P1/P2 findings remain within the prototype scope.

## Required fidelity surfaces

- **Fonts / typography:** DM Sans matches the clean sans brand direction. Only logo/slogan are visible on the default homepage. The later slogan candidate intentionally replaces the mock's earlier wording. Detail copy uses readable Georgia, comfortable line length, distinct headings and a narrow prose column. Original project favicon is deliberately preserved instead of adopting a newly invented concept mark.
- **Spacing / layout rhythm:** full-width image discovery begins directly below the compact header. Equal-width columns, 18px desktop gutters, 12px mobile gutters and restrained 8px/6px radii. Portrait/landscape/square slots are bounded; important subjects remain legible. The shortest-column layout has no overlap in the inspected desktop/mobile states.
- **Colors / tokens:** near-white #FAF9F6 and deep olive #27392E are preserved. No colored card containers, large shadows, decorative banners or home-page metadata.
- **Image quality / fidelity:** twelve independently generated food photographs share the selected natural-light editorial direction. The new WebPs total approximately 2.66MB. Additional existing/Pexels photos intentionally differ from imagined mock subjects; none are screenshot crops or coded substitutes. Images load without missing assets in the inspected gallery. AI imagery is identified in the detail caption and studio library.
- **Copy / content:** homepage has no visible article titles, categories or descriptions. Names/descriptions remain in accessible image links and the reading/search experiences. Detail content clearly states that it is illustrative, and makes no original recipe, experiment or product-test claims. The studio prominently identifies local-only storage and local-only publication.

## Primary interactions tested in the browser

- Open a picture and view its corresponding title, image and story.
- Search “noodles” and open the matching result; unmatched query displays a useful empty state.
- Save an image, open the saved collection, reload and confirm persistence; remove it again.
- Edit a published title and cover in the studio; verify changed image/link on the homepage and title/image in the detail page.
- Create a draft and verify it is absent from the homepage; publish it and verify the homepage grows from 20 to 21 items.
- Change the selected first image and verify it becomes the first gallery item.
- Add an HTTPS channel with affiliate disclosure; verify its detail URL, `sponsored noopener noreferrer` attributes and disclosure text on a Kitchen story.
- Restore seed content and remove the saved test item; final demo returns to 20 stories, original cover/title, no test channel.
- Check 390px gallery and mobile reader for horizontal overflow; inspect the two-column mobile capture.
- Check browser logs: Vite connection/debug messages only in the inspected gallery log; no application errors observed.

## Build / isolation checks and limits

Astro diagnostics and static builds pass. Preview pages carry noindex metadata and are excluded from sitemap generation; existing production homepage/routes remain intact. No push, DNS change or service purchase occurred.

The studio is a localStorage prototype, not a deployed CMS or a shared publishing service. Export/download, exhaustive keyboard-only navigation, screen-reader behavior, a physical touch-device run, all device sizes and full accessibility compliance were not exhaustively tested. Real content publishing and recipe/product verification are outside this demo.

## Follow-up polish (P3)

- Replace illustrative content with sourced, original stories and photography as editorial production begins.
- Select the final slogan and brand mark before production rollout.
- Two legacy stories share existing stock images; give each a distinct editorial cover before expanding the public image collection.
- Real publishing needs independent static detail URLs, responsive image variants and a Git-backed content workflow.
