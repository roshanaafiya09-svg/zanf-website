# ZAN-F — "Precision Air" redesign plan

This is the plan the build follows. It is written against two inputs: the site
currently running at `localhost:3001` (the "Plant Room" build, read section by
section from the live DOM) and `zanf-redesign-build-plan.md` (the strategic
brief).

---

## 0. What changes, and why

The Plant Room build is a faithful, honest rebuild of the **old** zanf.in: four
pages, product-reseller positioning, copper-on-black. The brief asks for
something structurally different — a two-business company (**certified product**
+ **turnkey engineering execution**) across roughly twenty routes, in a light,
light-dominant industrial identity.

So this is not a re-skin. The information architecture, the positioning and the
palette all move. What carries over: the discipline of inventing nothing, the
mono-for-data treatment, the real hardware photography, the working enquiry API,
and the trademark notice.

---

## 1. Sitemap

```
/                          Home
/about                     Company, the Platino relationship, how ZAN-F works
/products                  Landing — the three product lines
  /products/recd           Platino RECD · 25–1000 kVA
  /products/rats           Platino RATS® · HHP engines above 1000 kVA
  /products/obd-monitoring OBD panels, sensing, future IIoT
/services                  ITC / SITC landing — the second business line
  /services/installation   Mechanical erection, exhaust integration, wiring
  /services/testing        Back-pressure, emission checks, OBD calibration
  /services/commissioning  Demonstration, documentation pack, handover
  /services/amc            AMC and post-installation support
/compliance                CPCB / state notifications explainer + certifications
/projects                  Installations gallery (placeholder entries)
  /projects/[slug]         Case study detail (MDX)
/insights                  Technical blog (MDX)
  /insights/[slug]         Article
/contact                   Form, direct channels, coverage, map
/portal                    Client Portal / RECD Tracker — stub only
/privacy-policy
```

**Redirects.** The old URLs (`/about-us/`, `/our-services/`, `/contact-us/`)
are 301'd to their new homes in `next.config.mjs`, so nothing that currently
ranks or is linked breaks. `trailingSlash: true` is kept.

**Header:** utility bar (phone · email · WhatsApp · Client Portal — soon) above
Home · Products ▾ · Services ▾ · Compliance · Projects · Insights · Contact,
plus a persistent **Get a Quote** button that opens the quote modal.
Government Notification links move from the header dropdown to `/compliance`,
where they are usable on a phone and indexable — the header dropdown budget is
spent on Products and Services instead.

**Mobile:** sticky bottom bar — Call · WhatsApp · Quote. One WhatsApp float on
desktop only, so it never collides with the sticky bar.

---

## 2. Homepage hierarchy

The first three screens have to answer: *what is sold*, *who stands behind it*,
*what ZAN-F does that a box-shifter does not*.

| # | Section | Surface | Job |
|---|---|---|---|
| 1 | Utility bar + header | light | contact always reachable |
| 2 | **Hero** | **carbon** | positioning in one line; two CTAs; cert chips |
| 3 | Credential strip | light | authorized dealer · ARAI · ICAT · CPCB · range |
| 4 | **Stats band** | **carbon** | four mono figures, count-up |
| 5 | The ZAN-F difference | light | four cards — partnership, turnkey, compliance, engineering |
| 6 | **Two-business split** | light, split panel | the structural point of the whole site |
| 7 | Products | light | RECD · RATS® · OBD monitoring |
| 8 | How RECD works | light | custom SVG cross-section, FOC → CST |
| 9 | **ITC process** | **carbon** | four steps riding the Clean-Air Gradient Rule |
| 10 | Who we serve | light | six sectors |
| 11 | Featured projects | light | three cards, visibly marked pending |
| 12 | Compliance teaser | light, amber accent | one of only two amber uses on the page |
| 13 | Clientele wall | light | real logos + trademark notice |
| 14 | Testimonials | light | hides itself until real quotes exist |
| 15 | Insights | light | three technical articles |
| 16 | **Final CTA** | **carbon** | site assessment · WhatsApp an engineer |
| 17 | Footer | carbon | full link map, contact, certifications |

Dark carbon is used four times only, at 2 / 4 / 9 / 16, so it reads as
punctuation rather than as a theme.

---

## 3. Visual direction — "Precision Air"

**Concept.** Dirty exhaust → engineering treatment → clean air. It shows up
three ways and no more: the carbon-to-air surface rhythm above, the gradient
rule, and the inlet/outlet contrast in the RECD diagram.

**Surfaces.** `air-050 #F6FAF8` dominates. `carbon-950 #0E1512` and
`carbon-800 #1C2A24` punctuate. `steel-200 #DEE5E1` for hairlines and inset
panels.

**Accents.** `emission-500 #0E8A5F` carries every primary CTA, link and active
state. On light backgrounds text-green is darkened to `#0A6B4A` so it clears
4.5:1 — the token stays for fills, where contrast is measured against white.
`signal-400 #F5B82E` appears at most twice per page, on compliance and deadline
copy only.

**Signature — the Clean-Air Gradient Rule.** A 2px rule running
carbon → emission → air. It sits under the H1, separates sections, and forms
the spine of the four-step ITC timeline where the completed portion is the
gradient and the rest is steel. It draws itself once, left to right, on load.

**Type.** Archivo 600/700 for display (tight, −0.03em, 1.05 leading), Inter
400/500 for body, IBM Plex Mono 400/500 for every figure, unit, certificate
number, spec cell and section eyebrow (`// SERVICES`, 0.14em tracking). The
mono-for-data rule is applied without exception — it is what makes the site read
as instrumentation rather than marketing.

**Form.** 1240px max width, 12-column grid, 96–128px section padding on
desktop. Cards: 1px steel border, 8px radius, no drop shadow; hover shifts the
border to emission green and lifts 2px. Photography gets a carbon-to-transparent
duotone scrim so the client's mixed-quality photos sit together.

**Single scheme, no theme toggle.** The Plant Room build shipped a dark/light
toggle. Precision Air is a light identity with dark punctuation — maintaining a
mirrored dark theme across twenty pages would halve the contrast budget and blur
the concept. The toggle is removed.

**Motion.** Hero headline mask-reveal, gradient rule draw, stat count-up, and a
350ms fade+8px rise on section entry. Nothing else. All of it behind
`prefers-reduced-motion`.

---

## 4. Component architecture

```
components/
  chrome      UtilityBar · Header · Footer · MobileStickyCTA · WhatsAppFloat
  brand       GradientRule · Eyebrow · SectionHead · Reveal · Button · Prose
  sections    Hero · CertStrip · StatBand · DifferenceGrid · SplitBusiness ·
              ProductCards · RecdDiagram (SVG) · ProcessTimeline · IndustryGrid ·
              ProjectCards · ClientWall · Testimonials · InsightCards · CTABand
  ui          SpecTable · FeatureGrid · FAQAccordion · Breadcrumbs · PageHero ·
              VideoBlock · JsonLd · Quote (provider + modal + button) ·
              EnquiryForm · ServiceChild
lib/          enquiry.ts (schema) · seo.ts (JSON-LD builders) · content.ts (MDX)
content/      site.ts · products.ts · services.ts · compliance.ts · about.ts ·
              insights/*.mdx · projects/*.mdx
```

Files sit flat in `components/`; the groupings above are conceptual.

Server components by default. Client components only where they must be:
Header, QuoteModal, ContactForm, Counters, Reveal, TraceLine/RecdDiagram
animation, FAQAccordion.

Every string lives in `content/site.ts` or MDX frontmatter — no copy is
hard-coded in a component, so the client can edit without touching JSX.

---

## 5. Content strategy

**Voice.** Factual, compliance-literate, specific. Numbers wherever a number
exists; no adjective that a test report cannot back.

**The one non-negotiable rule.** ZAN-F does not manufacture anything. Every
product page attributes the hardware to Platino Automotive and every page footer
carries the trademark line. What ZAN-F owns is the *execution*: survey, sizing,
installation, testing, commissioning, documentation, AMC.

**Sources.** Copy is drawn from the brief and from the client's existing site.
Where the two disagree, the discrepancy is listed in §8 rather than resolved
silently. Nothing is written from imagination — sections with no real data hide
themselves (testimonials, counters) or are visibly marked pending (projects).

**Insights** seeds three articles written to be genuinely useful, not SEO
filler: the compliance guide, the commissioning walkthrough, and the total-cost
piece. Each ends in a site-assessment CTA.

---

## 6. Conversion strategy

Four entry points, matched to how far along the buyer is:

| Intent | Entry | Lands as |
|---|---|---|
| Just looking | Explore Platino RECD (ghost CTA) | product page → quote modal |
| Ready to talk | **Get a Site Assessment** (primary, every page) | quote modal, prefilled with the page context |
| Wants a person now | WhatsApp an engineer / Call | deep link, no form |
| Procurement | Contact page long form | full enquiry with DG rating + requirement type |

The quote modal is the short form (name, company, phone, DG rating,
requirement type). The contact page is the long one, adding email, state and
message. Both post to the same `/api/enquiry` route, which already fails loudly
rather than silently dropping an enquiry, and both offer a WhatsApp fallback
carrying the same details.

Requirement type — **Product / SITC / AMC / Other** — is the field that makes
the second business line measurable. It routes the lead and tells ZAN-F which
half of the business the site is actually selling.

---

## 7. Improvements over the current build

1. **Positioning.** The current homepage sells a device. The new one sells a
   device *and* an execution capability, and says so above the fold.
2. **Architecture.** 4 pages → ~20, with real landing pages for the terms
   buyers search ("RECD installation", "RECD testing", "CPCB approved RECD").
3. **The hero claim.** "Pure Power, Pure Planet" is a slogan. "Compliance you
   can measure. Power you can trust." is a promise with two proof points
   underneath it.
4. **Light-dominant.** The dark build looks like every other dark site and
   fights the green gensets in the photos. Light with carbon punctuation is
   rarer in this sector and reads as engineering documentation.
5. **Government notifications get a page** instead of a hover dropdown that is
   invisible to search and awkward on a phone.
6. **A real compliance section**, which the current site does not have at all —
   this is the highest-intent content a facility manager searches for.
7. **Services become pages, not an icon grid.** Six flat cards become four
   process stages with methods, durations and deliverables.
8. **The RECD explanation becomes a drawn diagram**, not a photo of a diagram.
   It scales, it is readable at 360px, and its labels are text.
9. **One conversion system** instead of a single contact page: modal, sticky
   bar, WhatsApp, per-page CTAs, all carrying context.
10. **Structured data** — Organization, LocalBusiness, Product, FAQPage,
    BreadcrumbList — where the current build has LocalBusiness only.

---

## 8. Must stay TODO — real data required

These are marked in code with `TODO:` and listed here for the client.

| # | Item | Where | Behaviour until supplied |
|---|---|---|---|
| 1 | **kVA range conflict** — the live site says `15 KVA – 10 MW`, the brief says `25 kVA – 10 MW` | `content/site.ts` | Product coverage follows the brief (RECD 25–1000, RATS >1000); DG service scope keeps 15 kVA. Needs one decision. |
| 2 | Installations completed / years / team | stats band | Only the two figures the client has published are shown; the rest of the band is not rendered |
| 3 | Dealer authorization certificate scan | credential strip, /about | Text claim only, no certificate image |
| 4 | Real project data — client, sector, location, kVA, scope, outcome, photos | `/projects` | Three cards visibly marked *Pending — awaiting client release* |
| 5 | Customer testimonials | homepage, /services | Section hides itself entirely |
| 6 | PM / HC / CO reduction figures with the report reference | /products/recd spec table | Shown as the brief states them, footnoted as per ARAI/ICAT type-approval documentation, pending the report number |
| 7 | Current CPCB / NGT directive wording and any deadline | /compliance | No deadline stated; links to the six official state/central notifications instead |
| 8 | Confirm the WhatsApp number | everywhere | Assumed same as the phone line |
| 9 | Real social profile URLs | footer | Icons omitted rather than pointing at `#` |
| 10 | ZAN-F logo as SVG | header, footer | Wordmark set in Archivo |
| 11 | Exact Google Maps place link | /contact | Generic Pallavaram embed |
| 12 | `RESEND_API_KEY`, `ENQUIRY_FROM` | deployment env | Form returns 503 and tells the visitor to use WhatsApp or phone |
| 13 | Certificate images (ARAI / ICAT / CPCB type approval) | /compliance, /products/recd | Certification named in text, no image |
| 14 | Client logo permission confirmation | clientele wall | Carried over from the live site with the existing trademark notice |
