# Eagle Restorations — eagle-restorations.com

Marketing site for Eagle Restorations Group, Inc. — Southern California historic
restoration, seismic retrofit, and adobe reconstruction.

## Stack

- **Astro** (static output) — `npm run dev` / `npm run build` / `npm run preview`
- **Lenis** smooth scroll (sitewide, via `Base.astro`)
- **Astro View Transitions** (`<ViewTransitions />` in `Base.astro`) for smooth
  crossfade navigation between pages, sitewide
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
- **Page transitions:** Astro's built-in View Transitions (default crossfade),
  sitewide. Automatically disabled under `prefers-reduced-motion: reduce`.
  All page-specific inline scripts (reveal animation, stats count-up,
  slideshow, hero canvas) run on the `astro:page-load` lifecycle event rather
  than plain top-level execution, since Astro doesn't auto-rerun scripts on
  client-side navigations — see comments in `Base.astro`, `index.astro`, and
  `HeroCanvas.astro`. The hero scene and slideshow also clean up
  (`UnicornStudio.destroy()`, clear the slideshow interval) on
  `astro:before-swap` so navigating away doesn't leak a running WebGL context
  or timer.

## Hero

The homepage hero is a single-column content block over a **WebGL background**
(`src/components/HeroCanvas.astro`) built as a scene in
[**Unicorn Studio**](https://unicorn.studio) (project id `XRccr6ECgdKFWpApifBr`)
and embedded via their runtime SDK — not a hand-rolled shader. Sits
`position: absolute; inset: 0; z-index: 0` behind `.hero-content` (`z-index: 1`).

- Embed follows Unicorn Studio's [embed guide](https://www.unicorn.studio/docs/embed/):
  a `div[data-us-project]` plus their SDK loader snippet, both in
  `HeroCanvas.astro`. SDK pinned to `unicornstudio.js@v2.2.6` via jsDelivr.
- **Fills the container exactly** (`inset: 0`) — an earlier attempt oversized
  the container to force a top-crop, but the scene fits-to-contain within
  whatever box it's given rather than cover-crop it, so the taller box just
  shrank the scene and left empty margins on the sides. Any crop/anchor
  behavior now lives in the Unicorn Studio scene itself.
- **`.hero { min-height: max(600px, 100svh) }`** — the hero fills the
  viewport on load (falls back to `100vh` for browsers without `svh`
  support; 600px floor for short/landscape screens).
- **Fades in** from a flat placeholder gray (`--hero-placeholder` in
  `global.css`, a first-pass estimate of the scene's overall tone) once
  `UnicornStudio.init()` resolves, instead of popping in — reduces perceived
  pageload weight, matching the pattern used on cognak.com's homepage hero.
- Wired to **Lenis** virtual scroll: `lenis.on('scroll', …)` in `Base.astro`
  calls `UnicornStudio.setScroll()` so the scene's scroll-driven motion tracks
  Lenis's transform-based smoothing instead of native (unused) `window.scrollY`.
- Skips mounting under `prefers-reduced-motion: reduce` (strips
  `data-us-project` before `UnicornStudio.init()` runs) — hero falls back to
  the flat placeholder gray.
- `data-us-project` includes a `?update={cacheBust}` query param — Unicorn
  Studio's CDN (and browsers on top of it) can take a minute or two to pick
  up scene edits published in the editor; bump `cacheBust` in
  `HeroCanvas.astro` to force a fresh fetch if an edit isn't showing up live.
- To swap scenes, change the `projectId`/`cacheBust` defaults in
  `HeroCanvas.astro` or pass `<HeroCanvas projectId="..." cacheBust="..." />`.

## Known follow-ups

- ~~Full **mobile audit** pending — dial in the slideshow and image layouts on small screens.~~ Done (2026-07-08) — see Fixed bugs.
- Footer CTA also shows on the Contact page (mildly redundant; left intentionally).
- ~~Subpage headers (Projects/Contact/Press) and project-detail layout could get the
  same elevated treatment as the homepage/About.~~ Done.

## Fixed bugs

- **Homepage hero alignment (2026-06-30):** `.hero-content`'s own `padding: 112px 0 120px`
  was overriding the `.container` class's `0 24px` horizontal padding (same specificity,
  later in cascade), so the hero sat flush at the outer edge — 24px left of the logo,
  about-section photo, and every other section. Fixed by splitting into
  `padding-top`/`padding-bottom` only (desktop + the `768px` breakpoint), so it inherits
  the standard container gutter like everything else.

- **Hero text illegible over the WebGL scene on mobile (2026-07-08):** the tall/narrow
  mobile hero exposes far more of the scene's vertical range than the wide/short desktop
  one (mostly sky), so the kicker/h1/sub could land directly on dark foliage or the
  building and drop well below readable contrast — confirmed with a real headless-browser
  screenshot at 390×844, not just guessed at. Fixed with a `.hero-scrim` layer (a light
  gradient) sandwiched between the canvas (`z-index: 0`) and `.hero-content`
  (`z-index: 1`) in `index.astro`, stronger and longer on the `768px` mobile breakpoint
  since the copy block spans nearly the full hero height there. The scene still reads
  through clearly by the hero's lower third.

- **Mobile "grid blowout" overflowing the whole page (2026-07-08):** the mobile-only big
  stat numbers (`.stats-mobile .stat-num`) had a `clamp()` floor of 6rem/96px — bigger
  than their 3-column grid could ever fit at phone widths. CSS grid items default to
  `min-width: auto` (their content's min-content size), so the unshrinkable digits forced
  their column, and with it the whole single-column `.about-grid` track below 720px,
  out to ~556px in a 390px viewport — confirmed via `document.documentElement.scrollWidth`
  (580 vs. 390 clientWidth). That's also why the about-section slideshow image appeared
  to run off the right edge: it's `width: 100%` of the same blown-out column. Fixed by
  lowering the mobile stat-num floor to actually fit (`clamp(2.2rem, 8vw, 3.2rem)`) and
  adding `min-width: 0` on `.stats-grid .stat` as a defensive backstop against future
  blowouts. Verified scrollWidth now equals clientWidth on every page.

## Content notes

- Landmark spellings corrected in `portfolio.json`: **Spreckels** (not Spreckles),
  **Leo Carrillo** (not Carillo). Slugs/URLs were left unchanged to avoid breaking links.
- Primary CTA copy is **"Plan Your Restoration"** (header, hero, project pages, footer).
