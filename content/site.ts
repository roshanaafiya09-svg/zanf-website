/**
 * Every string on the site lives here.
 *
 * Sourced from zanf-redesign-build-plan.md first, then from the live site at
 * www.zanf.in. Nothing on this page is invented — if a value is unknown it is
 * `null` and the component that consumes it hides itself. Obvious typos on the
 * live site ("Custome Design", "D2 ycle") are corrected; wording is not.
 */

export const site = {
  name: 'ZAN-F',
  legalName: 'ZAN-F Power Systems',
  tagline: 'Pure Power, Pure Planet',
  url: 'https://www.zanf.in',
  description:
    'ZAN-F supplies type-approved Retrofit Emission Control Devices (RECD) and Retrofit After Treatment Systems (RATS) for diesel generators from 15 KVA to 10 MW, backed by over 25 years in DG set services.',
  dealership: 'Dealers in Platino',
  productLines: [
    'Retrofit Emission Control Device (RECD)',
    'Retrofit After Treatment System (RATS)',
  ],
  range: '15 KVA – 10 MW',
  copyrightHolder: 'ZANF',
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
  // The WhatsApp number is assumed to be the same line as the phone number.
  // TODO: confirm with the client, or replace with a dedicated WhatsApp number.
  whatsapp: '919500245599',
  hours: [
    { days: 'Monday – Friday', time: '9am – 7pm' },
    { days: 'Saturday – Sunday', time: 'Closed' },
  ],
  website: 'www.zanf.in',
} as const

export const social = [
  // TODO: replace with the client's real profile URLs — the live site's icons
  // are wired to placeholders.
  { label: 'Facebook', href: '#', icon: 'facebook' },
  { label: 'X', href: '#', icon: 'x' },
  { label: 'LinkedIn', href: '#', icon: 'linkedin' },
  { label: 'Instagram', href: '#', icon: 'instagram' },
] as const

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us/' },
  { label: 'Our Services', href: '/our-services/' },
  { label: 'Contact Us', href: '/contact-us/' },
] as const

/** Exactly the six external links in the live site's dropdown, unchanged. */
export const notifications = [
  {
    label: 'Central Pollution Control Board',
    short: 'CPCB',
    scope: 'National',
    href: 'https://cpcb.nic.in/genset-notifications/',
  },
  {
    label: 'Tamil Nadu Pollution Control Board',
    short: 'TNPCB',
    scope: 'Tamil Nadu',
    href: 'https://tnpcb.gov.in/pdf_2024/RetofittingEmissionControl2024.pdf',
  },
  {
    label: 'Kerala Pollution Control Board',
    short: 'KSPCB',
    scope: 'Kerala',
    href: 'https://kspcb.kerala.gov.in/assets/uploads/widget/circulars/DG_Set_500_kVA_(1).pdf',
  },
  {
    label: 'Maharashtra Pollution Control Board',
    short: 'MPCB',
    scope: 'Maharashtra',
    href: 'https://www.mpcb.gov.in/node/6543',
  },
  {
    label: 'Karnataka State Pollution Control Board',
    short: 'KSPCB',
    scope: 'Karnataka',
    href: 'https://kspcb.karnataka.gov.in/sites/default/files/inline-files/Notification_0.pdf',
  },
  {
    label: 'Delhi Pollution Control Board',
    short: 'DPCC',
    scope: 'Delhi',
    href: 'https://pib.gov.in/PressReleaseIframePage.aspx?PRID=1962141',
  },
] as const

export const valueProps = [
  {
    title: 'Sustainable Innovation',
    body: 'Leading the way with groundbreaking Retrofit Emission Control Devices.',
    icon: 'leaf',
  },
  {
    title: 'Customer-Centric Focus',
    body: 'Delivering unmatched service tailored to meet client-specific needs.',
    icon: 'users',
  },
  {
    title: 'Regulatory Compliance',
    body: 'Ensuring adherence to industry standards while exceeding emission requirements.',
    icon: 'shield',
  },
  {
    title: 'Real-World Impact',
    body: 'Significantly reducing emissions for a cleaner, healthier environment.',
    icon: 'wind',
  },
] as const

export const about = {
  eyebrow: 'About Us',
  heading: 'Innovative, Sustainable Emission Control Solutions',
  intro:
    'Welcome to ZAN-F where innovation meets environmental responsibility. As a forward-thinking and customer-centric organisation, we are deeply entrenched in the industry, known for our groundbreaking Retrofit Emission Control Device (RECD) and unparalleled service. Our commitment is to provide sustainable solutions that not only comply with regulatory standards but also significantly reduce real-world emissions.',
  expertise: {
    heading: 'Expertise',
    body: 'With over 25 years of expertise in DG set services, we’re leading the industry in cleaner air solutions. Our innovative Retrofit Emission Control Device enhances air quality globally, a testament to our commitment to environmental responsibility.',
  },
  personnel: [
    'Our highly experienced and knowledgeable personnel are the driving force behind this creative approach. They design these solutions to meet the most recent worldwide emission regulations.',
    'Because of our knowledge and experience, we promote change internationally, delivering best practices and enhancing air quality while safeguarding public health.',
  ],
  lead: {
    heading: 'Leading provider of innovative Retrofit Emission Control Devices.',
    body: 'Our expertise lies in delivering cutting-edge Retrofit Emission Control Devices (RECD) that ensure compliance, sustainability, and measurable reduction in emissions.',
  },
} as const

/**
 * Verified figures only — each one is sourced from the live site or the build
 * plan. These carry the hero panel.
 */
export const specs = [
  { label: 'Experience', value: '25', unit: ' yrs +' },
  { label: 'Range covered', value: '15', unit: ' KVA – 10 MW' },
  { label: 'Back pressure', value: '0.0', unit: ' kPa' },
  { label: 'Tested to', value: 'ISO 8178', unit: ' D2' },
] as const

/**
 * The live site renders these four counters as "0+" — they have never been
 * filled in. Supply the numbers here and the section switches itself on.
 * TODO: client to provide.
 */
export const counters: { label: string; value: number | null }[] = [
  { label: 'Happy Clients', value: null },
  { label: 'Projects Done', value: null },
  { label: 'Expert Team', value: null },
  { label: 'Years of Experience', value: 25 },
]

/**
 * The clientele logo wall, in the same order as the live site.
 *
 * Sources are the client's own files (zanf.in/wp-content/uploads/2024/09/c1–c20),
 * processed by scripts/prepare-logos.mjs into transparent alpha masks so they
 * sit on the dark canvas without white boxes. Each name was verified by eye
 * against its image. The trademark notice below the wall covers all of them.
 *
 * To add one: drop the source into /public/media/clients/, add it to NAMES in
 * the script, re-run it, and paste the new entry here.
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

export const services = [
  {
    title: 'Type Approved RECD & RATS',
    body: 'Retrofit Emission Control Devices and Retrofit After Treatment Systems for diesel generators across the full 15 KVA to 10 MW range.',
    icon: 'filter',
  },
  {
    title: 'DG Sets, Parts & Service',
    body: 'Supply of diesel generator sets, genuine spares and on-site service by engineers who have worked on DG plant for over 25 years.',
    icon: 'settings',
  },
  {
    title: 'DG Set AMC & Overhauling',
    body: 'Annual maintenance contracts and full overhauls that keep generator sets available, efficient and within emission limits.',
    icon: 'wrench',
  },
  {
    title: 'Electrical Panel Boards',
    body: 'Design and manufacture of control, distribution and synchronisation panels built to the load requirements of the installation.',
    icon: 'cpu',
  },
  {
    title: 'DG Set Rental with RECD',
    body: 'Rental generator sets supplied already fitted with a type-approved RECD, so hired power arrives compliant.',
    icon: 'truck',
  },
  {
    title: 'Silencers & Exhausts',
    body: 'Manufacture of silencers and exhaust systems engineered for the back-pressure and acoustic requirements of the site.',
    icon: 'audio-waveform',
  },
] as const

export const features = {
  eyebrow: 'RECD & RATS Features',
  note: 'Our RECD is tested under the required ISO 8178 5-mode D2 cycle from ARAI & ICAT',
  items: [
    { title: 'Zero Back Pressure', note: 'As per ARAI test report' },
    { title: 'Long Device Life', note: 'Endurance tested' },
    { title: 'Low Maintenance', note: null },
    { title: 'Carbon Self Clean Technology', note: null },
    { title: 'Custom Design', note: null },
    { title: 'Static Operation', note: 'No moving parts' },
    { title: 'No By-product Generation', note: null },
  ],
} as const

export const certifications = [
  { short: 'ARAI', full: 'Automotive Research Association of India' },
  { short: 'ICAT', full: 'International Centre For Automotive Technology' },
  { short: 'CPCB', full: 'Central Pollution Control Board' },
] as const

export const closing = {
  heading:
    'Leading the way with innovative, eco-friendly solutions for regulatory compliance',
  body: 'Leveraging expertise in emission control, ZAN-F Power Systems delivers innovative, sustainable solutions that surpass regulatory standards, reducing environmental impact effectively.',
  cta: 'Get in Touch',
} as const

export const trademarkNotice =
  'All trademarks used are the property of their respective companies, and their use here does not imply endorsement. All company products and service names used in this website are for identification purposes only.'

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

/** Indian states and union territories, for the contact form's state field. */
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
