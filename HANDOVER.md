# ZAN-F redesign — handover checklist

## The design direction: "Plant Room"

The palette is taken from the client's own hardware photography, not from a
brand guideline. Canvas is `#06100D` — the teal-black of a generator enclosure,
not neutral black. The accent is **copper `#D08A4E`**, which is the FOC catalyst
substrate visible in the RECD cross-section photo.

Deliberately *not* green-on-black: that is the default every generic dark site
lands on, and it competes with the gensets in the photographs. The brand green
stays where it already lives — in the imagery. The interface around it is
instrumentation: steel, copper, hairlines.

**Type.** Archivo (display, heavy and tight — equipment-plate lettering),
Public Sans (body), Space Mono (all figures, units and eyebrow labels — it
reads like instrument silkscreen). Space Mono is used for short strings only;
it is too wide for paragraphs.

**Signature.** `components/TraceLine.tsx` — a strip-chart trace of an exhaust
line: violent and noisy on the way in, through the device, flat on the way out.
The four small ticks are the sensor taps, two before the unit and two after,
which is exactly how a RECD is instrumented in the field. It draws itself once
on load. This is the one bold element; everything around it is kept quiet.

**Dark is the design, not a preference.** Everyone gets dark unless they pick
light from the toggle. The OS setting is no longer consulted.

## Where each asset appears

| Asset | Placement |
|---|---|
| `hero-loop.mp4` | Homepage hero background — autoplay, muted, looped, desktop only |
| `recd-explainer.mp4` | `/our-services/` — click-to-play, `preload="none"` |
| `recd-installed-on-dg-set.jpeg` | Hero poster, homepage About block, About page |
| `recd-working-principle.jpeg` | Homepage Working Principle section |
| `recd-cross-section.jpeg` | Homepage RECD & RATS features |
| `nox-reducer-unit.jpeg` | Homepage Services, `/our-services/` features |

The explainer video sits on the services page rather than the homepage so that
the FOC/CST diagram gets a real placement instead of being hidden behind a play
button. Say the word if you want it on the homepage as well.


Everything below is a real gap, not a placeholder pretending to be content.
Nothing on the site invents a fact: where a number or asset is missing, the
component either hides itself or the value is marked here.

## Needed from ZAN-F

| # | Item | Where it lands | Effect if not supplied |
|---|---|---|---|
| 1 | Four counter figures — Happy Clients, Projects Done, Expert Team | `content/site.ts` → `counters` | The whole counters section stays hidden. The live site currently shows these as `0+`, which is worse. Years of Experience is already set to 25. |
| 2 | Logo as **SVG** | `components/Header.tsx`, `Footer.tsx` | The wordmark is currently set in Instrument Sans. The live site's logo is a low-resolution PNG with the background knocked out (`logo-removebg-preview (4).png`) and is not good enough for this design. |
| 3 | Real social profile URLs | `content/site.ts` → `social` | All four icons currently point at `#`, matching the live site. |
| 4 | Confirm the WhatsApp number | `content/site.ts` → `contact.whatsapp` | Currently assumed to be the same line as the phone number, `+91 95002 45599`. |
| 5 | Client logos for a clientele strip | new component | The live site has a "CLIENTELE" logo wall. It is **not** in this build — the logos were not in the project folder. The trademark notice that accompanied it is preserved in `CertStrip`. |
| 6 | Exact Google Maps place link | `app/contact-us/page.tsx` | Currently a generic embed for "Pallavaram, Chennai 600043". |
| 7 | `RESEND_API_KEY` and `ENQUIRY_FROM` | deployment env | Without them the contact form returns a 503 and tells the visitor to use WhatsApp or phone. It never silently drops an enquiry. |

## Decisions worth knowing

- **`/our-services/` had no text at all on the live site** — it was three flat
  PNGs (`12.png`, `w34e.png`, `23456.png`), invisible to search engines and to
  screen readers. It is now real text, built from the six services listed in
  `zanf-redesign-build-plan.md`.
- **Government Notification stays a header dropdown**, exactly as it is today.
  The live site has no `/government-notification/` page (it 404s), so none was
  invented. All six external links are unchanged. Say the word if you'd like a
  proper page for them — it would be more usable on mobile.
- **URLs are byte-identical** to the live site, trailing slashes included
  (`trailingSlash: true` in `next.config.mjs`), so no redirects are needed and
  rankings carry over.
- **Two live-site typos are corrected**: "Custome Design" → "Custom Design",
  and "ISO 8178 5-mode D2 ycle" → "cycle". No other wording is changed.
- **Footer copyright now updates itself** rather than being frozen at 2024.

## What was verified

- `npx tsc --noEmit` — zero errors. `npm run build` — clean, 10 routes, all
  prerendered static except the enquiry API.
- **Contrast, both themes, measured not eyeballed.** Three light-mode failures
  were found and fixed: `--text-lo` was 4.17, the brand green was 2.83, and the
  signal amber was 1.69 — all below the AA floor of 4.5. Accent and warning are
  now *themed* tokens (`--accent`, `--warn`) with darkened light-mode variants.
  Every text/background pair now measures **≥ 5.0 in both themes**. The
  mode-stable `--color-emission` / `--color-signal` remain, but are decorative
  only — aurora and text selection. Do not use them for text or icons.
- Every locked string from the live site is present on the rebuilt pages.
- One `<h1>` per page, no heading-level jumps, no images without `alt`, no
  links or buttons without an accessible name, all six form fields correctly
  labelled, header/main/footer/nav landmarks present.
- No horizontal overflow at 360, 768 or 1440.
- Hero video does **not** mount below 768px — zero video bytes are requested on
  a phone-width viewport.
- The 8.4 MB explainer fetches **zero bytes** until clicked.
- Enquiry API: malformed payload → `422`; valid payload with no `RESEND_API_KEY`
  → `503` and the form tells the visitor to use WhatsApp or phone. An enquiry is
  never silently dropped.
- Theme toggle flips `data-theme`, persists to `localStorage`, and updates its
  own `aria-label`.

## Known: fonts do not load in `npm run dev` on this machine

The dev server on this machine cannot reach `fonts.gstatic.com`, so `next/font`
silently falls back to system fonts and none of the typography shows. The
**production build is unaffected** — `npm run build && npm start` downloads and
self-hosts all three families (3 woff2 files, 71 KB total, verified loading).

If the dev server keeps showing the wrong fonts, use the production server to
review the design, or self-host the fonts with `next/font/local` to remove the
build-time network dependency entirely.

## Not verified here — please check on a real browser

- **Visual appearance.** The browser pane in this environment never composited
  frames, so no screenshot was possible and CSS transitions stayed frozen. The
  colour maths, layout measurements and DOM structure are all verified; how it
  actually *looks* is not. Run `npm run dev` and look at it.
- **No-flash-on-load.** The theme script is a synchronous inline script in
  `<head>`, which by construction runs before `<body>` can paint. Paint-timing
  APIs reported nothing in this environment, so it is not empirically proven.
  The script sets `performance.mark('theme-set')` — compare it against
  `performance.getEntriesByType('paint')` in a real browser to confirm.
- **Reduced motion.** The code paths exist (`useReducedMotion` in `Reveal` and
  `Counters`, a `matchMedia` check in `HeroVideo`, and a global CSS block), but
  the OS setting could not be toggled from here.
- **Lighthouse.** Not run — it needs a composited browser.

## The hero video is low resolution — this needs a better source file

Measured from the actual files:

| File | Resolution | Duration | Size |
|---|---|---|---|
| `hero-loop.mp4` | **752 × 400** | 6.1 s | 1.4 MB |
| `recd-explainer.mp4` | 1920 × 1080 | 6.2 s | 8.4 MB |

The hero clip is only 752 × 400 and is displayed full-bleed at roughly
1425 × 900 — a **1.9× upscale**. No code change can add detail that is not in
the file; it will look soft on any large screen. WhatsApp re-compresses video
on send, which is the likely cause.

Three ways forward, in order of preference:

1. **Send the original hero clip** by a route that does not re-compress —
   Google Drive, WeTransfer, or email attachment. 1080p or better. Drop it in
   as `public/media/hero-loop.mp4` and nothing else needs changing.
2. **Use the 1080p explainer as the hero loop instead.** It is sharp, but it
   is 8.4 MB and carries burned-in labels, so it would need re-encoding first.
3. **Leave it.** The hero video sits behind a 50% veil and two gradient
   scrims, so the softness is partly masked. Acceptable, not ideal.

## Burned-in text in the explainer video

The labels inside `recd-explainer.mp4` ("FOC Catalyst", "CST", "Harmful Gases"
and so on) are part of the video pixels. They cannot be removed by code or by
re-encoding — that needs the original animation project file re-rendered
without the text layer, or a replacement clip.

## Deferred optimisations

- **Video transcodes.** `ffmpeg` is not installed on this machine, so both
  clips ship as the original MP4s. They play everywhere, but WebM/VP9 versions
  would cut the explainer roughly in half. Once `ffmpeg` is available:

  ```
  ffmpeg -i public/media/hero-loop.mp4 -an -c:v libvpx-vp9 -crf 34 -b:v 0 public/media/hero-loop.webm
  ffmpeg -i public/media/recd-explainer.mp4 -c:v libvpx-vp9 -crf 34 -b:v 0 -c:a libopus public/media/recd-explainer.webm
  ```

  Then add a second `<source>` in `HeroVideo.tsx` and `VideoBlock.tsx`.
- **`hero-loop.mp4` still carries its audio track** (it is muted in the player,
  but the bytes ship). `-an` above strips it.
- **Custom OG image.** Currently inherits the default metadata; a `next/og`
  route would give link previews a proper card.
