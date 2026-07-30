/**
 * Global site data — chrome, contact, homepage sections.
 *
 * Every string on the site lives in `content/`, never in a component, so the
 * client can edit copy without touching JSX.
 *
 * Sourcing rule: a value here is either published by ZAN-F today, stated in
 * `zanf-redesign-build-plan.md`, or `null`. Nothing is invented. Where a value
 * is null the component that consumes it hides itself — see REDESIGN-PLAN.md §8
 * for the full list of what the client still owes.
 */

export const site = {
  name: 'ZAN-F',
  legalName: 'ZAN-F Power Systems',
  url: 'https://www.zanf.in',
  positioning: 'Authorized Platino RECD Dealer & Turnkey SITC Partner',
  tagline: 'Compliance you can measure. Power you can trust.',
  description:
    'ZAN-F supplies, installs, tests and commissions CPCB Type-Approved Platino Retrofit Emission Control Devices for diesel generators — turnkey, audit-ready, on schedule.',
  /**
   * TODO: the live site advertises 15 KVA – 10 MW for DG services; the build
   * brief states 25 kVA – 10 MW for the RECD product range. Both are kept, in
   * the contexts they belong to, until the client confirms one.
   */
  recdRange: '25 kVA – 10 MW',
  dgServiceRange: '15 kVA – 10 MW',
  yearsInDgServices: 25,
  manufacturer: 'Platino Automotive Pvt. Ltd.',
  credit: 'Designed & Developed by The Green Digital',
} as const

export const contact = {
  addressLines: ['Pallavaram, Chennai,', 'Tamil Nadu - 600 043'],
  addressLocality: 'Chennai',
  addressRegion: 'Tamil Nadu',
  postalCode: '600043',
  emails: ['info@zanf.in', 'info@zanf.org'],
  phoneDisplay: '+91 95002 45599',
  phoneHref: '+919500245599',
  // TODO: confirm — assumed to be the same line as the phone number.
  whatsapp: '919500245599',
  hours: [
    { days: 'Monday – Friday', time: '9:00 – 19:00' },
    { days: 'Saturday – Sunday', time: 'Closed' },
  ],
  website: 'www.zanf.in',
  // TODO: confirm the states ZAN-F actually covers for site work.
  coverageNote:
    'Site work across Tamil Nadu and neighbouring states. Ask us about your location — we will tell you plainly whether we can cover it.',
} as const

/**
 * TODO: real profile URLs. Icons pointing at `#` were removed rather than
 * shipped — a dead social icon costs more trust than a missing one.
 */
export const social: { label: string; href: string; icon: string }[] = []

export const whatsappLink = (message?: string) =>
  `https://wa.me/${contact.whatsapp}${
    message ? `?text=${encodeURIComponent(message)}` : ''
  }`

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

export type NavItem = {
  label: string
  href: string
  children?: { label: string; href: string; note: string }[]
}

export const nav: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Products',
    href: '/products/',
    children: [
      {
        label: 'Platino RECD',
        href: '/products/recd/',
        note: '25 – 1000 kVA diesel generators',
      },
      {
        label: 'Platino RATS®',
        href: '/products/rats/',
        note: 'High-horsepower engines above 1000 kVA',
      },
      {
        label: 'OBD & Monitoring',
        href: '/products/obd-monitoring/',
        note: 'Panels, sensing and remote monitoring',
      },
    ],
  },
  {
    label: 'Services',
    href: '/services/',
    children: [
      {
        label: 'Installation',
        href: '/services/installation/',
        note: 'Mechanical erection and exhaust integration',
      },
      {
        label: 'Testing',
        href: '/services/testing/',
        note: 'Back-pressure and emission verification',
      },
      {
        label: 'Commissioning',
        href: '/services/commissioning/',
        note: 'Demonstration, documents, handover',
      },
      {
        label: 'AMC & Support',
        href: '/services/amc/',
        note: 'Inspection, catalyst health, uptime',
      },
    ],
  },
  { label: 'Compliance', href: '/compliance/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Insights', href: '/insights/' },
  { label: 'Contact', href: '/contact/' },
]

export const footerNav = [
  {
    heading: 'Products',
    links: [
      { label: 'Platino RECD', href: '/products/recd/' },
      { label: 'Platino RATS®', href: '/products/rats/' },
      { label: 'OBD & Monitoring', href: '/products/obd-monitoring/' },
      { label: 'All products', href: '/products/' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Installation', href: '/services/installation/' },
      { label: 'Testing', href: '/services/testing/' },
      { label: 'Commissioning', href: '/services/commissioning/' },
      { label: 'AMC & Support', href: '/services/amc/' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About ZAN-F', href: '/about/' },
      { label: 'Compliance', href: '/compliance/' },
      { label: 'Projects', href: '/projects/' },
      { label: 'Insights', href: '/insights/' },
      { label: 'Client Portal', href: '/portal/' },
    ],
  },
] as const

/* -------------------------------------------------------------------------- */
/*  Credentials                                                               */
/* -------------------------------------------------------------------------- */

export const certifications = [
  {
    short: 'ARAI',
    full: 'Automotive Research Association of India',
    note: 'Type-approval testing',
  },
  {
    short: 'ICAT',
    full: 'International Centre for Automotive Technology',
    note: 'Type-approval testing',
  },
  {
    short: 'CPCB',
    full: 'Central Pollution Control Board',
    note: 'Type-approved device',
  },
] as const

export const testNote =
  'The RECD is tested under the ISO 8178 5-mode D2 cycle by ARAI and ICAT.'

export const credentials = [
  { label: 'Authorized Platino Dealer', mono: null },
  { label: 'CPCB Type-Approved device', mono: null },
  { label: 'ARAI · ICAT tested', mono: 'ISO 8178 D2' },
  { label: 'Coverage', mono: site.recdRange },
] as const

/**
 * Only figures ZAN-F has published. `value: null` removes the tile — the old
 * site rendered these as "0+", which reads worse than not claiming anything.
 * TODO: client to supply installations completed and team size.
 */
export const stats: {
  label: string
  value: string | null
  suffix?: string
  note?: string
}[] = [
  {
    label: 'Years in DG services',
    value: '25',
    suffix: '+',
    note: 'Engineering, service and overhaul',
  },
  {
    label: 'kVA range covered',
    value: '25–10,000',
    note: 'RECD through RATS®',
  },
  {
    label: 'Back pressure added',
    value: '0.0',
    suffix: ' kPa',
    note: 'As per ARAI test report',
  },
  {
    label: 'Particulate reduction',
    value: '>90',
    suffix: '%',
    note: 'Per type-approval documentation',
  },
  { label: 'RECDs installed', value: null },
]

/* -------------------------------------------------------------------------- */
/*  Homepage                                                                  */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: 'Authorized Platino RECD dealer & turnkey SITC partner',
  headline: ['Compliance you', 'can measure.', 'Power you can trust.'],
  sub: `ZAN-F supplies, installs, tests and commissions CPCB Type-Approved Platino Retrofit Emission Control Devices for diesel generators from ${site.recdRange} — turnkey, audit-ready, on schedule.`,
  primary: { label: 'Get a site assessment', href: '/contact/' },
  secondary: { label: 'Explore Platino RECD', href: '/products/recd/' },
} as const

export const differences = [
  {
    title: 'Authorized Platino partnership',
    body: 'Genuine certified hardware with manufacturer-backed warranty and support — not a look-alike device sourced from an unnamed workshop.',
    icon: 'badge-check',
  },
  {
    title: 'Turnkey execution',
    body: 'One engineering partner from site survey to commissioning. One contract, one point of accountability, no gap between supply and install.',
    icon: 'route',
  },
  {
    title: 'Compliance-first',
    body: 'Testing and documentation are treated as deliverables, not afterthoughts. You are handed a pack an inspector can read.',
    icon: 'file-check',
  },
  {
    title: 'Engineering-led delivery',
    body: `Correct sizing, correct mounting, correct back-pressure. ${site.yearsInDgServices} years on DG plant decides what gets specified.`,
    icon: 'ruler',
  },
] as const

export const businesses = [
  {
    kicker: 'Business one',
    title: 'Platino RECD & RATS®',
    body: 'Certified emission-control hardware for diesel generators — type-approved, endurance tested, and specified to the engine it will sit on.',
    points: [
      'CPCB type-approved devices',
      'RECD 25 – 1000 kVA · RATS® above 1000 kVA',
      'Zero added back pressure per ARAI test report',
    ],
    cta: { label: 'Explore products', href: '/products/' },
  },
  {
    kicker: 'Business two',
    title: 'Installation, Testing & Commissioning',
    body: 'A certified device is half of compliance. ZAN-F executes the other half — survey, erection, verification, and a documented handover.',
    points: [
      'Site survey, back-pressure calculation, sizing',
      'Mechanical erection, exhaust integration, OBD wiring',
      'Test reports, commissioning pack, AMC',
    ],
    cta: { label: 'Explore ITC services', href: '/services/' },
  },
] as const

export const workingPrinciple = {
  eyebrow: 'How a RECD works',
  heading: 'Two catalysts. No moving parts.',
  body: 'Exhaust enters through a diffuser and passes into the Fuel Oxidation Catalyst, which converts carbon monoxide and hydrocarbons. The Catalytic Soot Trap then captures and removes particulate matter before cleaner gas leaves the outlet chamber. There is nothing to spin, nothing to dose and nothing to replace on a schedule.',
  stages: [
    {
      code: '01',
      title: 'Diffuser',
      body: 'Raw exhaust is spread evenly across the catalyst face so the whole substrate does work, not just its centre.',
    },
    {
      code: '02',
      title: 'FOC — Fuel Oxidation Catalyst',
      body: 'Carbon monoxide and unburnt hydrocarbons are oxidised as they pass through the coated substrate.',
    },
    {
      code: '03',
      title: 'CST — Catalytic Soot Trap',
      body: 'Particulate matter is captured and burnt off by carbon self-clean, so there is no filter to swap out.',
    },
    {
      code: '04',
      title: 'Outlet chamber',
      body: 'Treated gas leaves through the outlet, with temperature and pressure taps either side for verification.',
    },
  ],
} as const

export const industries = [
  {
    name: 'Data centres',
    body: 'Standby plant that is tested weekly and audited constantly.',
    icon: 'server',
  },
  {
    name: 'Hospitals',
    body: 'Life-safety power that cannot be taken offline for long.',
    icon: 'heart-pulse',
  },
  {
    name: 'Manufacturing',
    body: 'Continuous-duty sets under real load, often several per site.',
    icon: 'factory',
  },
  {
    name: 'IT parks',
    body: 'Multi-tenant campuses with mixed ratings and shared exhaust routes.',
    icon: 'building-2',
  },
  {
    name: 'Commercial buildings',
    body: 'Malls, hotels and offices with occupancy-critical backup.',
    icon: 'store',
  },
  {
    name: 'Infrastructure',
    body: 'Projects, sites and rental fleets that must arrive compliant.',
    icon: 'hard-hat',
  },
] as const

export const closing = {
  heading: 'Need to make your DG set compliant?',
  body: 'Get expert guidance on RECD selection, installation, testing and commissioning. Tell us the rating and the site — we will tell you what the job actually involves.',
  primary: { label: 'Book a site assessment', href: '/contact/' },
  secondary: { label: 'WhatsApp an engineer' },
} as const

/* -------------------------------------------------------------------------- */
/*  Trust                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * TODO: no genuine customer testimonials have been supplied. The section hides
 * itself while this array is empty — nothing here is written for effect.
 */
export const testimonials: {
  quote: string
  name: string
  role: string
  company: string
}[] = []

/**
 * The clientele wall, carried over from the live site in the same order.
 * Sources are the client's own uploads, processed by scripts/prepare-logos.mjs
 * into transparent masks. The trademark notice below the wall covers all of
 * them. TODO: confirm the client holds permission to display each mark.
 */
export const clients: { name: string; src: string }[] = [
  { name: 'GE', src: '/media/clients/prepared/ge.png' },
  { name: 'Ather Energy', src: '/media/clients/prepared/ather-energy.png' },
  {
    name: 'Hindustan Unilever Limited',
    src: '/media/clients/prepared/hindustan-unilever-limited.png',
  },
  { name: 'Nestlé', src: '/media/clients/prepared/nestle.png' },
  { name: 'Suzuki', src: '/media/clients/prepared/suzuki.png' },
  { name: 'ITC Hotels', src: '/media/clients/prepared/itc-hotels.png' },
  { name: 'Bosch', src: '/media/clients/prepared/bosch.png' },
  { name: 'Tesco', src: '/media/clients/prepared/tesco.png' },
  { name: 'Lakmé', src: '/media/clients/prepared/lakme.png' },
  {
    name: 'The Times of India',
    src: '/media/clients/prepared/the-times-of-india.png',
  },
  { name: 'ABB', src: '/media/clients/prepared/abb.png' },
  { name: 'Alstom', src: '/media/clients/prepared/alstom.png' },
  { name: 'USV', src: '/media/clients/prepared/usv.png' },
  { name: 'Cipla', src: '/media/clients/prepared/cipla.png' },
  { name: 'Praxair', src: '/media/clients/prepared/praxair.png' },
  { name: 'TVS', src: '/media/clients/prepared/tvs.png' },
  { name: 'ST Telemedia', src: '/media/clients/prepared/st-telemedia.png' },
  { name: 'Yamaha', src: '/media/clients/prepared/yamaha.png' },
  { name: 'DuPont', src: '/media/clients/prepared/dupont.png' },
  {
    name: 'Blue Dart Aviation Limited',
    src: '/media/clients/prepared/blue-dart-aviation-limited.png',
  },
]

export const trademarkNotice =
  'All trademarks used are the property of their respective companies, and their use here does not imply endorsement. All company products and service names used in this website are for identification purposes only.'

export const dealerNotice = `Platino®, RECD, RATS® and related marks belong to ${site.manufacturer}. ZAN-F is an authorized dealer and reseller, and provides installation, testing, commissioning and maintenance services. ZAN-F does not manufacture these devices.`

/* -------------------------------------------------------------------------- */
/*  Media                                                                     */
/* -------------------------------------------------------------------------- */

export const media = {
  installedUnit: {
    src: '/media/recd-installed-on-dg-set.jpeg',
    alt: 'A Platino Retrofit Emission Control Device installed on the exhaust line of a green diesel generator set.',
  },
  crossSection: {
    src: '/media/recd-cross-section.jpeg',
    alt: 'Labelled cross-section of a RECD showing the inlet chamber, FOC and CST catalysts, outlet chamber, and the temperature and pressure sensors on either side.',
  },
  workingPrinciple: {
    src: '/media/recd-working-principle.jpeg',
    alt: 'Diagram of the RECD treatment stages: harmful gases pass through a diffuser, the FOC catalyst converts CO and HC, the CST traps particulate matter, and cleaner emissions leave the outlet chamber.',
  },
  noxReducer: {
    src: '/media/nox-reducer-unit.jpeg',
    alt: 'A stainless steel NOx reducer and retrofit emission control device mounted above a diesel generator in a plant room.',
  },
  heroLoop: {
    src: '/media/hero-loop.mp4',
    poster: '/media/recd-installed-on-dg-set.jpeg',
  },
  explainer: {
    src: '/media/recd-explainer.mp4',
    poster: '/media/recd-working-principle.jpeg',
    label: 'How a RECD cleans diesel exhaust',
  },
} as const

/* -------------------------------------------------------------------------- */
/*  Form options                                                              */
/* -------------------------------------------------------------------------- */

export const requirementTypes = [
  { value: 'product', label: 'Product — RECD / RATS® supply' },
  { value: 'sitc', label: 'SITC — supply, installation, testing, commissioning' },
  { value: 'amc', label: 'AMC — maintenance and support' },
  { value: 'other', label: 'Something else' },
] as const

export const dgRatings = [
  'Below 25 kVA',
  '25 – 125 kVA',
  '126 – 250 kVA',
  '251 – 500 kVA',
  '501 – 1000 kVA',
  '1001 – 2000 kVA',
  'Above 2000 kVA',
  'Multiple ratings / fleet',
  'Not sure yet',
] as const

export const indianStates = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
] as const
