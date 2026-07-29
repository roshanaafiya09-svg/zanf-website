# ZAN-F Website Redesign — Build Plan & Specification

**Prepared for:** Redesign of zanf.in
**To be built by:** Claude Sonnet (this document is the complete build brief — follow it section by section)
**Reference site:** https://platino.co.in/demo (Platino Automotive, the OEM whose products ZAN-F resells)

---

## 1. Project Context (read this first)

ZAN-F is an **authorized dealer & reseller of Platino Premium RECD / RATS®** (Retrofit Emission Control Devices for diesel generators, CPCB Type-Approved, certified by ARAI/ICAT). The current zanf.in largely mirrors Platino's older content. The redesign has three goals:

1. **Align with the new Platino demo site** in structure, terminology, and credibility signals (certifications, client trust, blog/insights, WhatsApp CTA, quote popup) — but with ZAN-F's own distinct, more premium visual identity. ZAN-F must read as a serious engineering partner, not a copy of the OEM site.
2. **Add a second business line:** **Installation, Testing & Commissioning (ITC)** — turnkey SITC (Supply, Installation, Testing & Commissioning) services for RECDs and DG-set electrical/mechanical works. This must be a first-class section of the site, not a footnote.
3. **Be future-ready for web apps** — e.g., a "Platino RECD Tracker" (installation status / compliance tracking portal) will be added later. Architecture must accommodate authenticated app routes without a rebuild.

**Positioning statement (use as north star for all copy):**
> ZAN-F — Authorized Platino RECD dealer and turnkey emission-compliance partner. We supply, install, test, and commission certified emission control systems so your DG sets stay compliant, powerful, and audit-ready.

---

## 2. Tech Stack (build with this)

- **Framework:** Next.js 14+ (App Router) + TypeScript. Static-first (SSG) for all marketing pages; server components by default.
- **Styling:** Tailwind CSS with a custom design-token config (tokens defined in §4). No off-the-shelf template look.
- **Animation:** Framer Motion — used sparingly per §4.6. Respect `prefers-reduced-motion`.
- **Forms:** React Hook Form + Zod validation. Submissions via a serverless API route (email via Resend/Nodemailer placeholder) + WhatsApp deep-link fallback.
- **CMS-lite:** Blog/insights and project gallery as MDX files in `/content` (no external CMS for v1; structure so a headless CMS can slot in later).
- **Deployment:** Vercel (or any Node host). Include `sitemap.xml`, `robots.txt`, OpenGraph images.
- **Future apps:** Reserve the route group `app/(portal)/` with an auth-ready layout (NextAuth.js stub, login page shell, empty dashboard). Do NOT build tracker functionality now — only the entry point ("Client Portal — Coming Soon" link in header utility bar).

---

## 3. Site Architecture / Sitemap

```
/                         Home
/about                    About ZAN-F (company, why-us, Platino partnership)
/products
  /products/recd          Platino RECD (25 kVA – 1000 kVA)
  /products/rats          Platino RATS® (HHP engines > 1000 kVA)
  /products/obd-monitoring  OBD / Emission monitoring panels & IIoT
/services                 ITC landing (the new sub-business)
  /services/installation  RECD Installation
  /services/testing       Testing & Compliance Verification
  /services/commissioning Commissioning & Handover
  /services/amc           AMC & Post-installation support
/compliance               CPCB / NGT regulations explainer + certificates
/projects                 Installations gallery / case studies
/insights                 Blog (MDX)
/contact                  Contact + quote form + map + WhatsApp
/portal                   (stub) Client portal / future RECD Tracker
/privacy-policy
```

**Header nav:** Home · Products ▾ · Services ▾ · Compliance · Projects · Insights · Contact — plus a persistent **"Get a Quote"** button (accent color) and a small utility row with phone, email, and "Client Portal" link.
**Sticky mobile bottom bar:** Call · WhatsApp · Quote.

---

## 4. Design System — "Precision Air" (premium industrial identity)

The goal: the polish of a top-tier industrial-tech company (think Siemens/ABB-grade discipline, startup-grade freshness). Not a generic dark-hero template, not cream-and-serif. The identity comes from the subject itself: **exhaust turned clean** — dark carbon tones resolving into clean, bright air.

### 4.1 Color tokens
```
--carbon-950: #0E1512   (near-black with green undertone — primary dark surfaces)
--carbon-800: #1C2A24   (section panels, footer)
--steel-200:  #DEE5E1   (light surface / dividers)
--air-050:    #F6FAF8   (page background — clean, faintly green-white)
--emission-500: #0E8A5F (primary brand green — CTAs, links, active states)
--signal-400: #F5B82E   (amber signal accent — used ONLY for compliance/deadline highlights and one hero element)
--ink-900:    #10201A   (body text on light)
```
Usage rule: light background (`--air-050`) dominates; dark carbon sections used as deliberate "punctuation" (hero, stats band, footer). Amber appears at most twice per page.

### 4.2 Typography
- **Display:** `Archivo` (SemiExpanded, 600–800) — engineered, confident, industrial without being cold. Used for H1/H2 and the signature stat numerals.
- **Body:** `Inter` (400/500) — clean and highly legible for technical content.
- **Data/utility:** `IBM Plex Mono` (400) — for spec figures, certificate numbers, kVA ranges, table data. This mono-for-data treatment is a core part of the identity; apply it consistently.
- Type scale: 12 / 14 / 16 / 18 / 22 / 28 / 36 / 48 / 64. Tight leading on display (1.05–1.1), 1.6 on body. Uppercase letterspaced eyebrows (`0.08em`) in Plex Mono for section labels (e.g., `// SERVICES`, `// COMPLIANCE`).

### 4.3 Signature element — "The Clean-Air Gradient Rule"
A thin horizontal rule/bar that transitions **carbon-950 → emission-500 → air-050**, symbolizing exhaust being cleaned. It appears: under the hero headline, as section dividers, and as the progress indicator in the 4-step ITC process diagram. This is the one memorable device — everything else stays disciplined.

### 4.4 Layout
- 12-column grid, max-width 1240px, generous whitespace (section padding 96–128px desktop).
- Cards: 1px `steel-200` borders, 8px radius, no heavy shadows (subtle `0 1px 2px` only). Hover: border shifts to `emission-500`, slight lift.
- Photography treatment: real DG-set / plant-room imagery with a subtle carbon-to-transparent duotone overlay so mixed-quality photos look cohesive. Never use generic stock "handshake/office" images — machinery, exhaust lines, gauges, technicians only.

### 4.5 Iconography
Lucide icons, 1.5px stroke, in `emission-500` inside faint `steel-200` circles. Custom simple line diagrams (SVG) for the RECD cross-section and the ITC process.

### 4.6 Motion
- One orchestrated hero load sequence (headline mask-reveal, gradient rule draws left→right, stats count up).
- Scroll: fade+8px rise on section entry, once, 350ms. Number counters on the stats band.
- Nothing else. No parallax, no floating blobs.

---

## 5. Page-by-Page Specification (with copy)

Sonnet: use the copy below verbatim or lightly adapted; keep the tone factual, confident, compliance-literate. Replace `[...]` placeholders with client-provided details or sensible placeholders clearly marked `TODO`.

### 5.1 Home
1. **Hero (dark carbon):**
   - Eyebrow (mono): `// AUTHORIZED PLATINO RECD DEALER & TURNKEY SITC PARTNER`
   - H1: **"Compliance you can measure. Power you can trust."**
   - Sub: "ZAN-F supplies, installs, tests, and commissions CPCB Type-Approved Platino Retrofit Emission Control Devices for diesel generators from 25 kVA to 10 MW — turnkey, audit-ready, on schedule."
   - CTAs: `Get a Site Assessment` (primary) · `Explore Platino RECD` (ghost)
   - Right side: RECD product render/photo on the clean-air gradient. Certification chips below: ARAI · ICAT · CPCB Type-Approved.
2. **Stats band** (mono numerals, count-up): RECDs installed `[TODO]+` · Years in DG services `[TODO]+` · kVA range covered `25–10,000` · PM reduction `>90%`.
3. **Two-business split** — the key structural feature. Side-by-side panels:
   - **Products — Platino RECD / RATS®**: "Certified emission control hardware from India's leading RECD manufacturer." → /products
   - **Services — Installation, Testing & Commissioning**: "End-to-end SITC execution: site survey to compliance handover." → /services
4. **Why ZAN-F** (4 cards): Authorized dealership (genuine Platino hardware & warranty) · Turnkey execution (single vendor, single accountability) · Compliance-first (CPCB/NGT documentation done for you) · Rapid response (survey to commissioning in days, not months).
5. **How RECD works** — 3-step diagram (Exhaust in → FOC + CST catalytic treatment → Clean output; PM >90%, HC & CO significantly reduced) with short explainer and link to /products/recd.
6. **ITC process strip** — 4 steps on the gradient rule: Survey & Sizing → Supply & Installation → Testing & Verification → Commissioning & Handover.
7. **Clients / brands strip** — grayscale logo marquee with the standard trademark disclaimer (mirror Platino's disclaimer wording style).
8. **Testimonial** (1–2, carousel) — placeholder structure.
9. **Insights** — latest 3 MDX posts.
10. **CTA band (dark):** "DG compliance deadline approaching? Get a free site assessment this week." → quote form.
11. **Footer:** quick links, certifications row, contact, WhatsApp, social, privacy.

### 5.2 /products (and children)
- Landing: intro to Platino partnership + 3 product cards (RECD, RATS®, OBD/Monitoring).
- **/products/recd:** hero, feature grid (mirror Platino's feature set: zero back pressure per ARAI report, no by-products, carbon self-clean, no moving parts, compact, low maintenance, endurance tested, custom design), spec table in Plex Mono (kVA range, PM/HC/CO reduction, install time 1–3 days), certification section with certificate thumbnails, FAQ, CTA.
- **/products/rats:** for HHP engines >1000 kVA; orientation flexibility (vertical/horizontal/diagonal), 3-in-1 (PM, HC, CO), custom sizing.
- **/products/obd-monitoring:** OBD panels, pressure/temperature sensing, IIoT remote monitoring, CPCB data-logging support. End with: "Soon: track your fleet's RECD health in the ZAN-F Client Portal." (bridges to future app).

### 5.3 /services — the new ITC sub-business (make this shine)
- Hero: **"Installation, Testing & Commissioning — done once, done right."** Sub: "A certified device is only half of compliance. ZAN-F's engineering team executes the other half: precision installation, verified testing, and documented commissioning."
- The 4-stage process, each expandable / linking to its child page:
  1. **Site Survey & Engineering** — exhaust line assessment, back-pressure calculation, RECD sizing & mounting design, structural/space feasibility.
  2. **Installation** — mechanical erection, exhaust integration, insulation & cladding, electrical/OBD panel wiring, safety-compliant workmanship. Typical duration 1–3 days per DG.
  3. **Testing & Verification** — back-pressure measurement, emission performance checks, OBD calibration, load-condition trials, deviation rectification.
  4. **Commissioning & Handover** — performance demonstration, compliance documentation pack (test reports, certificates, installation photos), operator briefing, warranty registration.
- **/services/amc:** annual maintenance contracts, periodic inspection, catalyst health checks, combined DG + RECD AMC.
- Sidebar/inline: "Who we serve" — data centers, hospitals, manufacturing, commercial buildings, IT parks, infrastructure.
- Deliverables checklist card (mono type): what the client receives at handover.
- CTA: `Book a Site Survey`.

### 5.4 /compliance
- Plain-language explainer: CPCB norms for in-use DG sets, phase applicability, non-attainment city mandates, what "Type Approved" means, penalties/risk of non-compliance. **Do not invent specific deadlines or legal figures — mark as `TODO: verify current CPCB/NGT directives` for the client to confirm.**
- Certificates section: Platino type-approval certificate images/links.
- FAQ with schema.org FAQ markup.

### 5.5 /projects
- Filterable card grid (sector, kVA range, location). Each: photo, DG rating, scope (Supply / SITC / AMC), one-line outcome. MDX-driven; ship with 3 placeholder entries marked `TODO: replace with real projects`.

### 5.6 /insights
- MDX blog, list + article layout, related-posts, author block. Seed with 3 SEO-oriented drafts: "RECD for DG sets: the complete compliance guide", "What happens during RECD commissioning — a step-by-step walkthrough", "RECD price & total cost of ownership: what actually drives it".

### 5.7 /contact
- Split layout: form (name, company, phone, email, DG rating kVA, requirement type: Product / SITC / AMC / Other, message) + direct channels (phone, email, WhatsApp deep link) + Google Maps embed placeholder + service coverage note.
- Also build the **"Get a Quote" modal** used by header/CTA buttons — same form, shorter.

### 5.8 /portal (stub only)
- Clean page: "ZAN-F Client Portal — RECD Tracker coming soon. Track installation status, compliance documents, and RECD health from one dashboard." Email-capture "Notify me" field. Login button (disabled/`Coming soon`).

---

## 6. Components to Build (shared)

`Header` (transparent-over-hero → solid on scroll) · `UtilityBar` · `MobileStickyCTA` · `Hero` · `GradientRule` (signature) · `StatBand` (count-up) · `SplitBusinessPanels` · `FeatureCard` · `ProcessTimeline` (horizontal desktop / vertical mobile, gradient-rule progress) · `SpecTable` (mono) · `CertChips` · `LogoMarquee` · `TestimonialCarousel` · `InsightCard` · `CTABand` · `QuoteModal` · `ContactForm` · `Footer` · `WhatsAppFloat` (single floating button, bottom-right) · `FAQAccordion` (with JSON-LD).

---

## 7. Content, SEO & Compliance Rules

- Title pattern: `{Page} | ZAN-F — Authorized Platino RECD Dealer & SITC Partner`.
- Target keywords naturally: "RECD for DG set", "RECD installation", "CPCB approved RECD", "RECD dealer", "retrofit emission control device", "RECD testing and commissioning", + city/region modifiers (client to confirm coverage area).
- JSON-LD: Organization, LocalBusiness, Product, FAQPage, BreadcrumbList.
- Always attribute: "Platino®, RECD, RATS® and related marks belong to Platino Automotive Pvt. Ltd. ZAN-F is an authorized dealer/reseller." Include the manufacturer-logo disclaimer wherever brand logos appear.
- Never claim ZAN-F *manufactures* RECDs. ZAN-F = dealer + SITC services.
- Accessibility: WCAG AA contrast, keyboard focus visible, alt text on all imagery, reduced-motion support.
- Performance budget: Lighthouse ≥ 90 all categories; next/image everywhere; fonts via next/font (self-hosted).

---

## 8. Build Order (execute in phases; verify each before next)

1. **Phase 1 — Foundation:** Next.js scaffold, Tailwind tokens (§4.1–4.2), fonts, Header/Footer/layout, GradientRule, responsive shell for all routes with placeholder content.
2. **Phase 2 — Home:** full home page per §5.1 incl. hero motion sequence and stat counters.
3. **Phase 3 — Products:** landing + 3 product pages with spec tables and FAQ schema.
4. **Phase 4 — Services (ITC):** landing + 4 child pages + AMC; ProcessTimeline component.
5. **Phase 5 — Compliance, Projects, Insights:** MDX pipeline, seed content.
6. **Phase 6 — Contact & conversion:** forms, quote modal, WhatsApp integration, mobile sticky bar.
7. **Phase 7 — Portal stub + polish:** /portal, SEO/JSON-LD, OG images, sitemap, accessibility & Lighthouse pass, cross-device QA.

**Acceptance criteria per phase:** builds with zero TS errors; responsive at 360/768/1240; all `TODO` items listed in a final handover note; no lorem ipsum — use the copy in §5.

---

## 9. Client Inputs Needed Before/During Build (checklist for ZAN-F)

- [ ] ZAN-F logo files (SVG) + any existing brand color to honor
- [ ] Real stats (installations count, years of experience, team size)
- [ ] Dealer authorization proof/certificate scan (for credibility section)
- [ ] Contact details: phone, email, WhatsApp number, office address, service coverage regions
- [ ] Project photos + 2–3 client testimonials
- [ ] Confirmation of current CPCB/NGT deadline wording for /compliance
- [ ] Domain/hosting access for deployment
