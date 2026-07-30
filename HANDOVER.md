# ZAN-F "Precision Air" — handover

The plan this build follows is `REDESIGN-PLAN.md`. This file is what changed,
what was verified, and what is still owed by the client.

---

## What this build is

A twenty-route site positioning ZAN-F as **two businesses**: an authorized
Platino RECD dealer *and* a turnkey Installation, Testing & Commissioning
partner. It replaces the four-page "Plant Room" build, which was a faithful
rebuild of the old zanf.in and sold a device rather than a capability.

**Design system — "Precision Air".** Light dominates (`--air-050 #F6FAF8`);
carbon appears exactly four times on the homepage — hero, stats band, ITC
process, closing CTA — so a dark band reads as punctuation, not as a theme.
Emission green carries every action; amber appears at most twice per page and
only on compliance copy.

**Signature.** `components/GradientRule.tsx` — a 2px rule running
carbon → emission → air. Under the H1, between sections, and as the spine of the
four-step ITC timeline where it doubles as the progress indicator.

**Type.** Archivo (display), Inter (body), IBM Plex Mono (every figure, unit,
certificate number, spec cell and section eyebrow, without exception).

**The theme toggle is gone.** Precision Air is a light identity with dark
punctuation; maintaining a mirrored dark theme across twenty pages would have
halved the contrast budget and blurred the concept.

---

## URLs

New architecture, old URLs preserved by 301 in `next.config.mjs`:

| Old | New |
|---|---|
| `/about-us/` | `/about/` |
| `/our-services/` | `/services/` |
| `/contact-us/` | `/contact/` |
| `/government-notification/` | `/compliance/` |

`trailingSlash: true` is kept. The six government notification links moved from
a header hover-dropdown to `/compliance/`, where they are indexable and usable
on a phone.

---

## Where each asset appears

| Asset | Placement |
|---|---|
| `recd-installed-on-dg-set.jpeg` | Homepage hero panel, `/products/recd/`, `/about/` |
| `nox-reducer-unit.jpeg` | `/products/rats/` hero |
| `recd-cross-section.jpeg` | `/products/obd-monitoring/` card |
| `recd-working-principle.jpeg` | Poster for the explainer video |
| `recd-explainer.mp4` | `/products/recd/` — click to play, zero bytes until clicked |
| `hero-loop.mp4` | **Not used.** See below. |

**The hero video was dropped.** `hero-loop.mp4` is 752 × 400 and was being
displayed full-bleed at roughly 1425 × 900 — a 1.9× upscale that no scrim
hides. The hero now uses the installed-unit photograph with a technical
annotation strip, which is sharp and says the same thing. Send a 1080p source
and it can go back in.

**The RECD cross-section is now drawn, not photographed.**
`components/RecdDiagram.tsx` is vector, its labels are real text, it is readable
at 360px and it is visible to search engines. The photo of the diagram is no
longer the primary explanation of how the device works.

---

## Client logo wall

Marks are shown in **their own brand colours** — no grayscale filter, no
opacity. The white matte was removed from each source PNG by
`scripts/prepare-logos.mjs`, so anti-aliased edges sit cleanly on the white
cells.

Neatness is handled as a sizing problem: identical cells, centred, `max-h-9`
plus `max-w-full` with `object-contain`. Verified against every one of the
twenty files — **nothing is upscaled**; the largest render scale is 1.0 and most
marks are being scaled down.

The constraint is the source files. They range from 168 × 23 (Praxair) to
101 × 99 (Ather), so the wall cannot run larger than it does without going soft.
Higher-resolution files, ideally SVG, would let it breathe.

---

## Conversion

One system rather than one contact page:

- **Quote modal** — `components/Quote.tsx`, opened from the header, hero, every
  CTA band and the mobile sticky bar. Each opener passes its own `source`
  string, which rides along with the enquiry so ZAN-F can see which page
  produced the lead.
- **Mobile sticky bar** — Call · WhatsApp · Quote, phones only.
- **WhatsApp float** — desktop only, so it never collides with the sticky bar.
- **Contact page** — the same form with state and a longer message box.

Both forms post to `/api/enquiry` and both offer a WhatsApp fallback carrying
the details already typed. **Requirement type** (Product / SITC / AMC / Other)
is the field that makes the second business line measurable.

---

## Audit pass

A post-build audit found and fixed four things worth recording:

- **Visitor-facing `TODO:` notes are gone.** Eight pages were showing internal
  notes to the public ("TODO: verify current CPCB / NGT directives" on the
  compliance banner, and similar). They now say the equivalent thing in
  visitor language — "available on request", "confirmed at survey" — and the
  internal versions live only in the table below. The project cards still read
  **Awaiting client release**, which is deliberate.
- **Icons added.** `app/icon.tsx` and `app/apple-icon.tsx` generate a 32px tab
  icon and a 180px home-screen icon at build time. Replace both with the real
  mark when the SVG logo arrives.
- **Link previews fixed on every page.** Next only inherits the root
  `opengraph-image` into pages that do not declare `openGraph` themselves —
  every page here does, so the inner pages were shipping with no preview image.
  `pageMeta()` now states the image explicitly. A WhatsApp share of a product
  page shows the card, not a bare link.
- **The enquiry endpoint is no longer open.** A honeypot field (`website`,
  off-screen and `tabindex="-1"`) discards bot submissions with a 200 so the
  script gets no signal to retry, and `lib/rate-limit.ts` caps five enquiries
  per address per ten minutes with a `Retry-After` header. The limiter is
  in-process, so on a serverless host it is a speed bump rather than a wall —
  swap the Map for Vercel KV or Upstash if spam ever becomes real.

Also fixed while in the same file: form validation errors are now linked to
their field with `aria-describedby`, and the submit outcome sits in a live
region, so a screen-reader user hears why a field is invalid rather than only
that it is.

Known and not yet fixed, in priority order: page titles run 93–122 characters
and will truncate in search results (the `{Page} | ZAN-F — Authorized Platino
RECD Dealer & SITC Partner` pattern is the cause — shortening the suffix to
`| ZAN-F` fixes it); seven meta descriptions exceed ~155 characters; `/projects/`
and `/insights/` jump from `h1` to `h3`; `Product.offers` carries no price and
`Organization` no logo, which Search Console will flag as warnings.

## Needed from ZAN-F

| # | Item | Where it lands | Effect if not supplied |
|---|---|---|---|
| 1 | **Decide the kVA range.** The live site says `15 KVA – 10 MW`; the build brief says `25 kVA – 10 MW` | `content/site.ts` → `site.recdRange`, `dgServiceRange` | Product coverage currently follows the brief (RECD 25–1000, RATS® above 1000); the 15 kVA figure is retained only for DG service scope. One decision fixes both. |
| 2 | RECDs installed, projects completed, team size | `content/site.ts` → `stats` | Tiles with `value: null` are dropped. The band currently shows four figures; a fifth is waiting. |
| 3 | Dealer authorization certificate scan | `/about/` | Text claim only, marked TODO on the page |
| 4 | Real project data — client or sector, location, kVA, scope, product, outcome, photographs with permission | `content/projects/*.mdx` | Three cards render as unmistakable placeholders: dashed border, `TODO · AWAITING CLIENT DATA`, empty fields. Detail pages are `noindex`. |
| 5 | Customer testimonials | `content/site.ts` → `testimonials` | The section renders nothing at all while the array is empty |
| 6 | ARAI / ICAT type-approval report numbers and certificate scans | `/products/recd/`, `/compliance/` | The >90% PM figure and the 0.0 kPa figure are published as the brief states them, footnoted as pending their source document |
| 7 | Confirmation of current CPCB / NGT directive wording | `/compliance/` | **No deadline, penalty or threshold is stated anywhere.** The page explains the mechanism and links the six official notifications instead. |
| 8 | Confirm the WhatsApp number | `content/site.ts` → `contact.whatsapp` | Assumed to be the same line as the phone number, `+91 95002 45599` |
| 9 | Real social profile URLs | `content/site.ts` → `social` | The array is empty and no icons render — a dead social icon costs more trust than a missing one |
| 10 | Logo as **SVG** | `Header.tsx`, `Footer.tsx`, OG image | Wordmark set in Archivo |
| 11 | Exact Google Maps place link | `/contact/` | Generic Pallavaram embed, marked TODO on the page |
| 12 | Higher-resolution client logos | `public/media/clients/` | Wall capped at 36px tall to avoid upscaling |
| 13 | 1080p hero clip, if the video is wanted back | `public/media/` | Hero uses the still photograph |
| 14 | `RESEND_API_KEY` and `ENQUIRY_FROM` | deployment env | The form returns 503 and tells the visitor to use WhatsApp or phone. An enquiry is never silently dropped. |
| 15 | Confirm permission to display each client mark | `content/site.ts` → `clients` | Carried over from the live site with the trademark notice beneath |
| 16 | Review the privacy policy against actual practice | `/privacy-policy/` | Written from what the site technically does; retention and access are marked TODO |

---

## What was verified

Measured in a real browser against the production build on `next start`.

- **`npx tsc --noEmit`** — zero errors. **`npm run build`** — clean; 30 routes,
  every page prerendered static except the enquiry API.
- **Fonts self-host and apply.** Archivo on `h1`, Inter on body, IBM Plex Mono
  on `.figure` — read from `getComputedStyle`, not assumed. No console errors on
  any page.
- **Contrast, measured not eyeballed.** Every visible text/background pair was
  sampled from the rendered DOM and scored. One real failure was found and
  fixed: `--ink-400` was 4.41:1 on white and 4.19:1 on air. It is now `#5F7068`
  — **4.67:1 on steel, 4.98:1 on air, 5.24:1 on white**. Two brand tokens were
  never used for text because they do not clear AA: `--emission-500` is 4.36:1
  on white and 4.25:1 on carbon, so text uses `--emission-700` on light
  (6.2:1) and `--emission-300` on carbon (7.9:1). `--signal-400` amber is
  1.69:1 on light and is used on carbon or as a tint behind `--signal-ink`
  (6.5:1) only.
- **No horizontal overflow at 360, 768 or 1280** on the homepage, RECD page and
  contact page — every element's right edge checked against the viewport, with
  deliberately scrollable containers excluded. The spec tables scroll inside
  their own `overflow-x-auto` container rather than pushing the page.
- **One `<h1>` per page**, no heading-level jumps, every image has `alt`, no
  link or button without an accessible name, all eight contact fields correctly
  labelled, the map iframe titled.
- **Quote modal** — opens, sets `aria-modal`, is labelled by its heading, moves
  focus to the first real field (the hidden `source` input was swallowing focus;
  fixed), traps Tab, closes on Escape, restores focus to the opener and releases
  the body scroll lock.
- **Redirects** — `/about-us/`, `/our-services/`, `/contact-us/` and
  `/government-notification/` all land on their new pages.
- **Structured data** — Organization and LocalBusiness site-wide;
  BreadcrumbList on every inner page; Product on RECD and RATS®; Service on the
  five services pages; FAQPage on RECD, RATS®, OBD, the four service children
  and compliance; TechArticle on each insight. Verified by parsing the served
  HTML.
- **Metadata** — title pattern, description and canonical present on every page
  checked. Placeholder project pages are `noindex`; `/portal/` is `noindex` and
  disallowed in `robots.txt`.
- **The explainer video fetches zero bytes until clicked** — the `<video>`
  element is not mounted until the poster is pressed.

## Not verified here

- **Visual appearance.** The browser pane in this environment never composited
  frames, so no screenshot was possible. Colour maths, layout geometry, computed
  styles and DOM structure are all verified; how it *looks* is not. Run
  `npm run build && npm start` and open it.
- **Lazy images.** Because nothing composites, below-the-fold images never
  triggered their fetch in-pane. Each asset was fetched directly instead
  (200 OK, correct bytes) and the logo wall geometry was measured in an
  equivalent harness.
- **Lighthouse.** Needs a composited browser.
- **Reduced motion.** The code paths exist — `useReducedMotion` in `Reveal` and
  `StatBand`, plus a global CSS block — but the OS setting could not be toggled
  from here.

---

## Deferred

- **Video transcodes.** `ffmpeg` is not installed on this machine, so the
  explainer ships as the original MP4. Once available:

  ```
  ffmpeg -i public/media/recd-explainer.mp4 -c:v libvpx-vp9 -crf 34 -b:v 0 -c:a libopus public/media/recd-explainer.webm
  ```

  Then add a second `<source>` in `VideoBlock.tsx`.
- **Burned-in labels in the explainer.** "FOC Catalyst", "CST" and so on are
  part of the video pixels and cannot be removed by code — that needs the
  original animation re-rendered without the text layer.
- **Client portal.** `/portal/` is a stub by design. It offers no sign-up form
  because there is nothing yet to sign up to; it offers an email link instead.
  Route group and auth are not scaffolded — when the tracker is built, it should
  go in `app/(portal)/` so the marketing layout is not inherited.
