/**
 * Product content.
 *
 * The hardware is Platino's. Everything factual here comes from the client's
 * published material or the build brief — the feature list, the ISO 8178 D2
 * test cycle, the zero-back-pressure claim and the ARAI/ICAT attribution are
 * all carried over verbatim in substance. Figures that need a report reference
 * to be defensible are marked in `footnote`.
 */

export const productsIntro = {
  eyebrow: 'Products',
  heading: 'Certified hardware, specified to your engine',
  lede: 'ZAN-F is an authorized dealer for Platino Automotive. The three lines below cover diesel generators from 25 kVA to 10 MW, plus the monitoring hardware that proves the device is doing its job. What we add is the specification: the right device, sized against the actual exhaust route, not the nearest catalogue number.',
}

export type Product = {
  slug: string
  name: string
  short: string
  range: string
  summary: string
  icon: string
  image: { src: string; alt: string }
}

export const products: Product[] = [
  {
    slug: 'recd',
    name: 'Platino RECD',
    short: 'RECD',
    range: '25 – 1000 kVA',
    summary:
      'Retrofit Emission Control Device for diesel generators. Two catalysts in series, no moving parts, no consumables, no added back pressure.',
    icon: 'filter',
    image: {
      src: '/media/recd-installed-on-dg-set.jpeg',
      alt: 'A Platino RECD installed on the exhaust line of a diesel generator set.',
    },
  },
  {
    slug: 'rats',
    name: 'Platino RATS®',
    short: 'RATS®',
    range: 'Above 1000 kVA',
    summary:
      'Retrofit After Treatment System for high-horsepower engines, built to the site: vertical, horizontal or diagonal, sized to the duct run you already have.',
    icon: 'cylinder',
    image: {
      src: '/media/nox-reducer-unit.jpeg',
      alt: 'A stainless steel retrofit after-treatment unit mounted above a large diesel generator in a plant room.',
    },
  },
  {
    slug: 'obd-monitoring',
    name: 'OBD & Monitoring',
    short: 'OBD',
    range: 'All ratings',
    summary:
      'On-board diagnostics panel with pressure and temperature sensing either side of the device, ready for data logging and remote monitoring.',
    icon: 'gauge',
    image: {
      src: '/media/recd-cross-section.jpeg',
      alt: 'Cross-section of a RECD showing the pressure and temperature sensor taps on either side of the catalysts.',
    },
  },
]

/* -------------------------------------------------------------------------- */

export const recd = {
  hero: {
    eyebrow: 'Platino RECD · 25 – 1000 kVA',
    heading: 'Retrofit Emission Control Device',
    lede: 'A two-stage catalytic device fitted into the exhaust line of an existing diesel generator. It converts carbon monoxide and hydrocarbons, traps and burns off particulate matter, and does it without a moving part, a dosing chemical or a filter to replace.',
  },
  features: [
    {
      title: 'Zero back pressure',
      note: 'As per ARAI test report',
      body: 'The device adds no measurable restriction to the exhaust, so engine performance and fuel consumption are unaffected.',
    },
    {
      title: 'Static operation',
      note: 'No moving parts',
      body: 'Nothing rotates, doses or actuates. There is no failure mode from wear in normal operation.',
    },
    {
      title: 'Carbon self-clean',
      note: 'No filter changes',
      body: 'Trapped soot is oxidised during normal running instead of accumulating until a service visit.',
    },
    {
      title: 'No by-product generation',
      note: null,
      body: 'No secondary waste stream to collect, store or dispose of.',
    },
    {
      title: 'Long device life',
      note: 'Endurance tested',
      body: 'Substrates are endurance tested as part of type approval rather than rated on paper.',
    },
    {
      title: 'Low maintenance',
      note: null,
      body: 'Periodic inspection and a differential-pressure check, which is exactly what the OBD panel is for.',
    },
    {
      title: 'Custom design',
      note: 'Built to the exhaust route',
      body: 'Inlet and outlet orientation, mounting and support are designed around the plant room you have.',
    },
  ],
  specs: {
    caption: 'Platino RECD — technical summary',
    rows: [
      { label: 'Applicable rating', value: '25 – 1000 kVA', note: 'Diesel generator sets' },
      { label: 'Treatment stages', value: 'FOC + CST', note: 'Oxidation catalyst, then catalytic soot trap' },
      { label: 'Particulate matter', value: '> 90 % reduction', note: 'Per type-approval documentation' },
      { label: 'Carbon monoxide', value: 'Reduced', note: 'Oxidised across the FOC stage' },
      { label: 'Hydrocarbons', value: 'Reduced', note: 'Oxidised across the FOC stage' },
      { label: 'Added back pressure', value: '0.0 kPa', note: 'As per ARAI test report' },
      { label: 'Test cycle', value: 'ISO 8178 5-mode D2', note: 'Tested by ARAI and ICAT' },
      { label: 'Approval', value: 'CPCB Type-Approved', note: 'Retrofit emission control device' },
      { label: 'Moving parts', value: 'None', note: 'Static catalytic operation' },
      { label: 'Consumables', value: 'None', note: 'No urea, no dosing, no filter element' },
      { label: 'Typical installation', value: '1 – 3 days', note: 'Per DG set, site dependent' },
      { label: 'Instrumentation', value: 'ΔP + temperature', note: 'Taps either side of the device' },
    ],
    footnote:
      'Figures are as stated in the manufacturer’s type-approval documentation. The ARAI and ICAT test reports and the CPCB type-approval certificate for the installed device are supplied with the commissioning pack, and are available on request beforehand.',
  },
  benefits: [
    {
      title: 'Compliance without an engine change',
      body: 'The generator, the alternator and the control system stay as they are. The device is added to the exhaust line.',
    },
    {
      title: 'No performance penalty',
      body: 'Zero added back pressure means the engine breathes as designed. Nothing is traded away for the emission reduction.',
    },
    {
      title: 'Nothing to run out of',
      body: 'No reagent tank to refill and no filter element to stock, so compliance does not depend on a consumable arriving on time.',
    },
    {
      title: 'Evidence you can hand over',
      body: 'Commissioning produces test readings, photographs and certificates — a pack an inspector can read without a phone call.',
    },
  ],
  installation: {
    heading: 'What installing one actually involves',
    body: 'The device is fitted into the exhaust line downstream of the turbocharger, on supports designed for the load and thermal movement. Existing silencer and duct work is re-routed where necessary, insulation and cladding are restored, and the OBD sensing is wired back to the panel. On most single sets this is one to three days on site.',
    steps: [
      'Exhaust route survey and back-pressure calculation',
      'Device sizing, mounting and support design',
      'Mechanical erection and exhaust integration',
      'Insulation, cladding and OBD panel wiring',
      'Testing, commissioning and documentation',
    ],
    cta: { label: 'See the ITC process', href: '/services/' },
  },
  faqs: [
    {
      q: 'Does a RECD reduce my generator’s output?',
      a: 'No. The device is tested to add no measurable back pressure — 0.0 kPa as per the ARAI test report — so the engine breathes as it was designed to and rated output is unaffected.',
    },
    {
      q: 'What maintenance does it need?',
      a: 'Periodic inspection and a differential-pressure check across the device. There is no filter element to replace and no reagent to top up, because trapped soot is oxidised during normal running. An AMC covers the inspection interval and the catalyst health check.',
    },
    {
      q: 'How long does installation take?',
      a: 'One to three days per generator for a typical installation, from arrival to commissioning. Sites with awkward exhaust routing, roof-level plant or multiple sets in one room take longer, which is what the site survey establishes before anything is quoted.',
    },
    {
      q: 'Can it be fitted to any make of DG set?',
      a: 'The device is fitted to the exhaust line, not to the engine, so make and model are not the constraint. What matters is the rating, the exhaust route and the space available — all of which the survey measures.',
    },
    {
      q: 'What is the difference between RECD and RATS®?',
      a: 'They are the same principle at different scales. RECD covers generators from 25 to 1000 kVA. RATS® is the after-treatment system for high-horsepower engines above 1000 kVA, where the device is built to the duct run and can be oriented vertically, horizontally or diagonally.',
    },
    {
      q: 'Does ZAN-F manufacture the device?',
      a: 'No. The hardware is manufactured by Platino Automotive Pvt. Ltd. ZAN-F is an authorized dealer and the engineering partner that surveys, sizes, installs, tests, commissions and maintains it.',
    },
  ],
}

/* -------------------------------------------------------------------------- */

export const rats = {
  hero: {
    eyebrow: 'Platino RATS® · above 1000 kVA',
    heading: 'Retrofit After Treatment System',
    lede: 'For high-horsepower engines, where exhaust volume, duct size and plant-room geometry all become the design problem. RATS® applies the same two-stage catalytic treatment at a scale that has to be built around the site rather than dropped into it.',
  },
  features: [
    {
      title: 'Three-in-one treatment',
      note: 'PM · HC · CO',
      body: 'Particulate matter, hydrocarbons and carbon monoxide are addressed in a single unit in the exhaust line.',
    },
    {
      title: 'Orientation flexibility',
      note: 'Vertical · horizontal · diagonal',
      body: 'The unit is oriented to the duct run that exists, which is usually the deciding factor in a large plant room.',
    },
    {
      title: 'Custom sizing',
      note: 'Built to the engine',
      body: 'Cross-section and length are sized to exhaust volume so gas velocity across the substrate stays in range.',
    },
    {
      title: 'Static operation',
      note: 'No moving parts',
      body: 'The same catalytic principle as the RECD — nothing rotating, nothing dosing.',
    },
    {
      title: 'Structural design included',
      note: 'Supports and thermal movement',
      body: 'At this size the mounting is engineering work in its own right: dead load, expansion and access all get designed.',
    },
    {
      title: 'Instrumented',
      note: 'ΔP and temperature',
      body: 'Sensor taps either side feed the OBD panel, so performance is measured rather than assumed.',
    },
  ],
  specs: {
    caption: 'Platino RATS® — technical summary',
    rows: [
      { label: 'Applicable rating', value: 'Above 1000 kVA', note: 'Up to 10 MW' },
      { label: 'Engine class', value: 'High horsepower', note: 'HHP diesel engines' },
      { label: 'Treatment', value: 'PM + HC + CO', note: 'Single in-line unit' },
      { label: 'Orientation', value: 'V / H / diagonal', note: 'Selected at survey' },
      { label: 'Sizing', value: 'Custom', note: 'To exhaust volume and duct geometry' },
      { label: 'Moving parts', value: 'None', note: 'Static catalytic operation' },
      { label: 'Consumables', value: 'None', note: 'No reagent, no filter element' },
      { label: 'Instrumentation', value: 'ΔP + temperature', note: 'Taps either side of the unit' },
    ],
    footnote:
      'Dimensions and flow figures are established per engine at the site survey rather than selected from a table — ask us for the sizing note for your rating.',
  },
  faqs: [
    {
      q: 'How is RATS® sized?',
      a: 'By exhaust volume and duct geometry, established at the site survey. Cross-section is chosen so gas velocity across the substrate stays in range, and length follows from that. Two engines of the same kVA rating in different plant rooms can end up with different units.',
    },
    {
      q: 'Our exhaust run is horizontal along a wall. Is that a problem?',
      a: 'No. The unit can be oriented vertically, horizontally or diagonally. Deciding that is part of the survey, along with the support design and the access needed for inspection.',
    },
    {
      q: 'Can it be fitted while the plant stays in service?',
      a: 'Large installations are normally staged around an agreed shutdown window, one set at a time where a site has several. The survey establishes the sequence and the outage each stage needs — that is part of what you get back before committing.',
    },
  ],
}

/* -------------------------------------------------------------------------- */

export const obd = {
  hero: {
    eyebrow: 'OBD & monitoring',
    heading: 'Proof that the device is working',
    lede: 'A pressure and temperature tap either side of the device, wired back to a panel. It is the difference between believing the RECD is doing its job and being able to show it — at commissioning, at an inspection, and every day in between.',
  },
  features: [
    {
      title: 'Differential pressure sensing',
      note: 'Either side of the device',
      body: 'ΔP across the unit is the single most useful health indicator: it tells you when the substrate needs attention, before performance drops.',
    },
    {
      title: 'Exhaust temperature sensing',
      note: 'Inlet and outlet',
      body: 'Temperature confirms the device is reaching the operating window where the catalysts actually work.',
    },
    {
      title: 'OBD panel',
      note: 'Local indication',
      body: 'A panel at the set with local readout and status, wired during installation and calibrated at commissioning.',
    },
    {
      title: 'Data logging ready',
      note: 'For record keeping',
      body: 'Readings can be logged for the compliance record rather than transcribed by hand into a logbook.',
    },
    {
      title: 'Remote monitoring',
      note: 'IIoT capable',
      body: 'Where a site wants it, the panel can feed a remote monitoring path so a fleet is visible from one place.',
    },
  ],
  specs: {
    caption: 'Monitoring — what is measured',
    rows: [
      { label: 'Differential pressure', value: 'ΔP across unit', note: 'Primary health indicator' },
      { label: 'Inlet temperature', value: 'Measured', note: 'Confirms operating window' },
      { label: 'Outlet temperature', value: 'Measured', note: 'Confirms treatment' },
      { label: 'Local indication', value: 'OBD panel', note: 'At the generator' },
      { label: 'Logging', value: 'Supported', note: 'For the compliance record' },
      { label: 'Remote', value: 'Optional', note: 'Site dependent' },
    ],
    footnote:
      'Panel model, sensor ranges and the communication protocol depend on the device and the site. We will confirm the exact specification for your installation at survey.',
  },
  portalNote:
    'Soon: track your fleet’s RECD health, installation status and compliance documents in the ZAN-F Client Portal.',
  faqs: [
    {
      q: 'Is the OBD panel mandatory?',
      a: 'Requirements vary by state notification and by the rating of the set. The practical argument is separate from the regulatory one: without ΔP sensing, the first sign of a problem is a performance drop rather than a rising number you could have acted on. See the compliance page for the current official notifications.',
    },
    {
      q: 'Can it be added to a RECD that is already installed?',
      a: 'Yes, provided the sensor taps exist or can be added to the exhaust line either side of the device. That is a short site visit to establish.',
    },
  ],
}
