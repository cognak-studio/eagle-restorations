# Changelog — WebGL hero project

Session log for the homepage hero build-out (2026-06-30 – 2026-07-01). Kept
separate from `README.md`, which documents current state; this is the
narrative of how it got there, for whoever picks this up next.

## Summary

The homepage hero now has a full-viewport, animated WebGL background built
in [Unicorn Studio](https://unicorn.studio) (no-code WebGL editor), embedded
via their runtime SDK, with a fade-in on load and smooth crossfade
transitions between pages sitewide.

## Timeline

**Custom shader, then corrected course.** First pass misread "project id"
as a request to build a background from scratch, and shipped a hand-rolled
WebGL1 fragment shader (fbm noise, drifting gold "dust"). It was too subtle
to see against the flat hero background, then — once made opaque and
visible — turned out to not be what was wanted at all: Pierce had already
built the actual hero scene in Unicorn Studio and just needed it embedded.
Ripped out the shader entirely and replaced it with the real Unicorn Studio
SDK embed (`data-us-project` + their loader snippet), per their
[embed guide](https://www.unicorn.studio/docs/embed/).

**Sizing and crop iterations.**
- Tried oversizing the scene container (`height: 125%`, bottom-anchored) to
  force a top-crop, on the theory that whatever didn't fit would clip off
  the sky rather than the ground. Looked right at first, but on a real
  screenshot it was pillarboxing the sides — the scene fits-to-contain
  within its box rather than cover-crop it, so the taller box was shrinking
  the whole scene down instead of cropping it. Reverted to `inset: 0`
  (exact 1:1 fit). Pierce fixed the actual crop framing on the Unicorn
  Studio side.
- Hero height went from fixed per-breakpoint pixel values → `min-height`
  floors → finally `min-height: max(600px, 100svh)` so it fills the
  viewport on load across desktop/tablet/mobile without separate breakpoint
  tuning.

**Scene swaps.** Cycled through several Unicorn Studio project IDs as
Pierce iterated in the editor: original black-and-white scene
(`UtOrFoOSCxh53JBMPnH4`) → a color version (`IZBtJxkR0YhKeBcDEXvl`) → back to
black-and-white (preferred) → current: `XRccr6ECgdKFWpApifBr`. Added a
`?update={cacheBust}` query param on the embed since Unicorn Studio's CDN
(plus normal browser caching) can take a minute or two to reflect edits
published in the editor — bump `cacheBust` in `HeroCanvas.astro` whenever a
scene edit isn't showing up live.

**Getty image compression** (source assets for the scene, not part of the
Astro build): `getty-color.png` → lossless WebP first (10MB, too big) → lossy
quality-100 WebP (~4.5–4.7MB) to hit a 7MB budget. Separately,
`getty-fixed.webp` (black-and-white) went from 5.3MB lossless down to
~2MB at quality 80 once "shrink it a lot more" came in. These live in the
`Eagle/` folder, not the `eagle-restorations/` repo — standalone source
assets, not referenced by the site code.

**Final polish.**
- Fade-in: hero now shows a flat placeholder gray (`--hero-placeholder`,
  approximating the scene's tone) immediately, then fades the WebGL canvas
  in once `UnicornStudio.init()` resolves — avoids a jarring pop-in while
  the SDK/scene assets load. Same pattern as cognak.com's homepage hero.
- Astro View Transitions added sitewide for smooth crossfade navigation.
  This required rewiring every per-page inline script (reveal-on-scroll,
  stats count-up, about slideshow, hero canvas init) to run on the
  `astro:page-load` lifecycle event instead of plain top-level execution —
  Astro doesn't auto-rerun inline scripts on client-side navigations, so
  without this, everything past the first page view would've silently
  stopped working. Added `astro:before-swap` cleanup for the WebGL context
  and the slideshow's interval timer so navigating away doesn't leak either.

## Current state

- Hero scene: Unicorn Studio project `XRccr6ECgdKFWpApifBr` (black-and-white).
- `src/components/HeroCanvas.astro` — the embed, fade-in, and lifecycle wiring.
- `src/pages/index.astro` — `.hero` sizing/placeholder background.
- `src/layouts/Base.astro` — Lenis, View Transitions, reveal animation.
- `src/styles/global.css` — `--hero-placeholder` color.
- See `README.md` → **Hero** and **Motion** sections for the living
  technical reference; this file won't be kept up to date going forward.

## Known caveats

- `--hero-placeholder: #cfcfcf` is an eyeballed estimate of the scene's
  overall tone, not sampled from the actual rendered output — nudge it if
  the fade-in looks like a color jump.
- This sandbox has no GitHub push credentials — every commit in this session
  needed a manual `git push` from Pierce's machine to actually deploy.
- No live-browser verification was possible from this environment (no GPU/
  root access for headless rendering), so visual checks relied on
  screenshots Pierce shared plus `curl`-level verification that the right
  markup/project ID was being served.
