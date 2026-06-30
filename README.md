# Eagle Restorations — eagle-restorations.com

Marketing site for Eagle Restorations Group, Inc. — Southern California historic
restoration, seismic retrofit, and adobe reconstruction.

## Stack

- **Astro** (static output) — `npm run dev` / `npm run build` / `npm run preview`
- **Lenis** smooth scroll (sitewide, via `Base.astro`)
- Hosted on **Vercel**, deploys on push to `master` (`origin` → `github.com/cognak-studio/eagle-restorations`)
- Content/config live in `src/data/` (`site.js`, `portfolio.json`, `awards.json`)

## Design system (key decisions)

- **Container width:** single `--maxw: 1200px` variable drives the header and all
  content, so the nav and page copy share the exact same width.
- **Type:**
  - `h1` (all pages) → **Recoleta SemiBold**, self-hosted from `/public/fonts/`
    (`Recoleta.woff2`/`.woff`; the raw `.otf` is gitignored and not published).
  - Everything else → **Inter** (h2, nav, buttons, body, footer).
  - The About-page pull-quote also uses Recoleta as a deliberate "voice" face.
- **Color:** gold `#d8a428` accent on a light/airy base; footer/CTA bands dark (`#292929` / `#1e1e1e`).
- **Buttons** (`.btn`): flex-centered label with a 1.5px (transparent on the filled
  variant) border so filled and outline buttons are identical height and align cleanly.

## Motion

- **Scroll reveals:** subtle fade + slide-up on headings, copy, cards, stats, footer.
  Driven by `Base.astro` (adds `reveal-ready` + `data-reveal`, IntersectionObserver
  adds `.is-visible`). Respects `prefers-reduced-motion`. The visible rule is scoped
  `html.reveal-ready [data-reveal].is-visible` so it out-specifies the hidden rule.
- **Stats count-up:** homepage figures animate from zero on scroll-in.
- **About-section slideshow:** two-layer crossfade pulling from all project images
  (`src/pages/index.astro`); random order, preloads next, `object-fit: cover`, square
  corners, tight static shadow, 3s interval, hover pauses, click advances.

## Hero

The homepage hero is a single-column content block with a comment marking where a
planned **WebGL background** can mount (`position: absolute; inset: 0; z-index: 0`).
Lenis exposes scroll (`lenis.on('scroll', …)`) to drive canvas animation in sync.

## Known follow-ups

- Full **mobile audit** pending — dial in the slideshow and image layouts on small screens.
- Footer CTA also shows on the Contact page (mildly redundant; left intentionally).
- Subpage headers (Projects/Contact/Press) and project-detail layout could get the
  same elevated treatment as the homepage/About.

## Content notes

- Landmark spellings corrected in `portfolio.json`: **Spreckels** (not Spreckles),
  **Leo Carrillo** (not Carillo). Slugs/URLs were left unchanged to avoid breaking links.
- Primary CTA copy is **"Plan Your Restoration"** (header, hero, project pages, footer).
