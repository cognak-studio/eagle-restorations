# Eagle Restorations — work notes

## 2026-07-15

### Homepage slider: hide projects still using the default/placeholder image
- Default image = `/wp-content/uploads/2021/01/eagle-project.webp` (used by 16 projects that don't have a real photo yet).
- `src/pages/index.astro`: added `DEFAULT_IMAGE` constant and filtered it out of `slideshowImages`, so those placeholder projects no longer appear in the about-section slideshow.
- Effect: 65 → 64 unique slideshow images; all 16 placeholder projects excluded. Projects still show on the /projects grid — only the homepage slider is affected.

### Homepage stat: remove comma from the "1790" year
- The stat counter animation used `.toLocaleString()`, rendering the "Oldest Historic Project" year as "1,790".
- `src/data/site.js`: added `plain: true` to the 1790 stat.
- `src/pages/index.astro`: render `data-plain` on `.stat-num` when `s.plain` is set (both the mobile stats-grid and the stats-band), and the counter script skips thousands separators when `data-plain` is present. Now shows "1790".

### Block images from search-engine indexing (anti-image-scam)
- Context: scammers have claimed to own Eagle's project photos (found via image search) and tried to extort payment.
- `vercel.json`: added `X-Robots-Tag: noimageindex` to the global page header block (pages still index; their images don't) and a new header rule setting `X-Robots-Tag: noindex, noimageindex` on all image files (`jpg|jpeg|png|gif|webp|svg|avif`).
- Deliberately did NOT add `Disallow` for images in robots.txt — that would stop crawlers from reading the noindex tag, which is counterproductive. X-Robots-Tag is the correct mechanism.
- Effect after next deploy + recrawl: images drop out of Google/Bing image search. Takes days-to-weeks for existing indexed images to clear (can expedite via Search Console removal tool).
- IMPORTANT caveat told to Pierce: this stops search discoverability, but cannot make a public site's images un-copyable — anyone viewing the site can still save/reverse-search a copy. Stronger anti-extortion measures (EXIF/IPTC copyright metadata, watermarks, hotlink blocking) were offered; Pierce chose search-indexing blocking only for now.

## 2026-07-19

### Add "Rebuilding Altadena" to the mobile nav
- The announcement bar (which links to `/altadena-fire/`) is hidden on mobile (`.announce { display: none }` under `@media (max-width: 940px)`), so mobile visitors had no link to the Altadena fire page.
- `src/components/Header.astro`: added `<a href="/altadena-fire/">Rebuilding Altadena</a>` to the `.mobile-nav` block only — placed right after the `{nav.map(...)}` output (i.e. below "Press & Awards") and above the "Plan Your Restoration" button.
- Desktop nav and the `nav` array in `site.js` were left untouched, so the change is mobile-only by design (desktop already surfaces the page via the announcement bar).

### Note on build
- `npm run build` currently crashes in the sandbox at vite dependency optimization (`msg.includes is not a function`) — a Node 22 vs. old Astro/vite incompatibility in the sandbox, NOT related to these edits. Logic was validated directly with node. Verify with a real build/deploy on Pierce's machine.
