/**
 * ITC / SITC content — the second business line.
 *
 * This is the part of the site that is about ZAN-F's own work rather than
 * Platino's hardware, so it is the part that has to be most specific. Every
 * stage lists what is done, what is measured and what is handed over.
 *
 * The six capabilities in `capabilities` are ZAN-F's existing published service
 * list, carried over from the live site so nothing is lost in the restructure.
 */

export const servicesIntro = {
  eyebrow: 'Installation, Testing & Commissioning',
  heading: 'Done once, done right',
  lede: 'A certified device is half of compliance. ZAN-F executes the other half — precision installation, verified testing and a documented commissioning — so what you are left holding is not just hardware but evidence.',
}

export type Stage = {
  slug: string
  code: string
  title: string
  short: string
  summary: string
  icon: string
  duration: string | null
  work: string[]
  measured: { label: string; value: string }[]
  deliverables: string[]
}

export const stages: Stage[] = [
  {
    slug: 'installation',
    code: '01',
    title: 'Site survey & engineering',
    short: 'Survey',
    summary:
      'Nothing is quoted before the exhaust line has been looked at. The survey decides the device, the mounting and the sequence — and it is where a bad installation is prevented rather than discovered.',
    icon: 'clipboard-list',
    duration: 'Half a day to a day per site',
    work: [
      'Exhaust line assessment from turbo outlet to termination',
      'Back-pressure calculation against the engine’s permissible limit',
      'RECD / RATS® sizing for the rating and the duct geometry',
      'Mounting and support design, including thermal movement',
      'Structural and space feasibility, access and lifting plan',
      'Outage window and sequence where several sets share a room',
    ],
    measured: [
      { label: 'Existing back pressure', value: 'kPa' },
      { label: 'Exhaust route length', value: 'm' },
      { label: 'Duct diameter', value: 'mm' },
      { label: 'Available clearance', value: 'mm' },
    ],
    deliverables: [
      'Sizing and selection note',
      'Mounting and routing sketch',
      'Scope, sequence and outage requirement',
      'Firm quotation',
    ],
  },
  {
    slug: 'installation',
    code: '02',
    title: 'Supply & installation',
    short: 'Install',
    summary:
      'Mechanical erection, exhaust integration, insulation and wiring — carried out by engineers who have worked on DG plant, to a standard that will still look right at the next inspection.',
    icon: 'wrench',
    duration: '1 – 3 days per DG set',
    work: [
      'Delivery of the genuine Platino device and fixings',
      'Mechanical erection onto designed supports',
      'Exhaust integration, re-routing and silencer adaptation',
      'Insulation and cladding restored across the new section',
      'Electrical and OBD panel wiring, sensor taps either side',
      'Safety-compliant workmanship, hot-work control, site clean-down',
    ],
    measured: [
      { label: 'Joint integrity', value: 'Leak check' },
      { label: 'Support loading', value: 'Per design' },
      { label: 'Surface temperature', value: '°C' },
      { label: 'Sensor continuity', value: 'Verified' },
    ],
    deliverables: [
      'Installed and clad device',
      'Wired OBD panel',
      'Installation photographs',
      'Materials and fixings record',
    ],
  },
  {
    slug: 'testing',
    code: '03',
    title: 'Testing & verification',
    short: 'Test',
    summary:
      'The stage that turns an installation into a claim you can defend. Readings are taken under load, compared against the design basis, and anything outside it is rectified before commissioning starts.',
    icon: 'activity',
    duration: 'Same visit as commissioning',
    work: [
      'Back-pressure measurement across the installed device',
      'Emission performance checks against the design basis',
      'OBD calibration and sensor verification',
      'Load-condition trials at the load steps the site can provide',
      'Deviation identification and rectification',
      'Re-test after any rectification',
    ],
    measured: [
      { label: 'Back pressure', value: 'kPa' },
      { label: 'Differential pressure', value: 'ΔP' },
      { label: 'Inlet / outlet temperature', value: '°C' },
      { label: 'Load steps', value: '%' },
    ],
    deliverables: [
      'Test readings record',
      'Deviation and rectification log',
      'Calibrated OBD panel',
    ],
  },
  {
    slug: 'commissioning',
    code: '04',
    title: 'Commissioning & handover',
    short: 'Commission',
    summary:
      'Performance demonstrated in front of your team, documents assembled into one pack, operators briefed, warranty registered. The job is finished when you can answer an inspector without calling us.',
    icon: 'file-check',
    duration: 'Half a day per site',
    work: [
      'Performance demonstration to the site team',
      'Compliance documentation pack assembled',
      'Operator briefing — what to watch, what is normal, what is not',
      'Warranty registration with the manufacturer',
      'AMC scope agreed where required',
    ],
    measured: [
      { label: 'Demonstration', value: 'Witnessed' },
      { label: 'Document set', value: 'Complete' },
      { label: 'Warranty', value: 'Registered' },
    ],
    deliverables: [
      'Test reports',
      'Type-approval and product certificates',
      'Installation photographs',
      'Operating and maintenance notes',
      'Warranty registration',
      'Handover certificate',
    ],
  },
]

export const handoverPack = {
  heading: 'What you are handed at the end',
  body: 'One pack, assembled during the job rather than reconstructed afterwards.',
  items: [
    'Test readings — back pressure, ΔP, temperatures, load steps',
    'Type-approval and product certificates for the installed device',
    'Installation photographs, before and after',
    'As-installed sketch of the exhaust route and mounting',
    'OBD panel calibration record',
    'Operating and maintenance notes for the site team',
    'Manufacturer warranty registration',
    'Signed handover certificate',
  ],
}

/** ZAN-F's existing published capabilities, carried over from the live site. */
export const capabilities = [
  {
    title: 'Type-approved RECD & RATS®',
    body: 'Retrofit Emission Control Devices and Retrofit After Treatment Systems for diesel generators across the full range.',
    icon: 'filter',
    href: '/products/',
  },
  {
    title: 'DG sets, parts & service',
    body: 'Supply of diesel generator sets, genuine spares and on-site service by engineers who have worked on DG plant for over 25 years.',
    icon: 'settings',
    href: null,
  },
  {
    title: 'DG set AMC & overhauling',
    body: 'Annual maintenance contracts and full overhauls that keep generator sets available, efficient and within emission limits.',
    icon: 'wrench',
    href: '/services/amc/',
  },
  {
    title: 'Electrical panel boards',
    body: 'Design and manufacture of control, distribution and synchronisation panels built to the load requirements of the installation.',
    icon: 'cpu',
    href: null,
  },
  {
    title: 'DG set rental with RECD',
    body: 'Rental generator sets supplied already fitted with a type-approved RECD, so hired power arrives compliant.',
    icon: 'truck',
    href: null,
  },
  {
    title: 'Silencers & exhausts',
    body: 'Manufacture of silencers and exhaust systems engineered for the back-pressure and acoustic requirements of the site.',
    icon: 'audio-waveform',
    href: null,
  },
] as const

/* -------------------------------------------------------------------------- */
/*  Child pages                                                               */
/* -------------------------------------------------------------------------- */

export const installationPage = {
  eyebrow: 'Service · installation',
  heading: 'RECD installation',
  lede: 'Survey, sizing and mechanical erection. The device goes into the exhaust line on supports designed for it, the cladding goes back on properly, and the panel is wired the same visit.',
  sections: [
    {
      heading: 'Before anyone arrives with a spanner',
      body: 'The exhaust route is measured from the turbocharger outlet to the termination, existing back pressure is established against the engine’s permissible limit, and the device is sized to the rating and the duct geometry. Mounting is designed for dead load and thermal movement — an unsupported device hanging off a duct is the most common thing we are called out to correct.',
    },
    {
      heading: 'On site',
      body: 'Erection, exhaust integration and any silencer adaptation, then insulation and cladding restored across the whole new section. Sensor taps are drilled and fitted either side of the device and wired back to the OBD panel. Hot work is controlled, and the plant room is left clean.',
    },
    {
      heading: 'Duration and disruption',
      body: 'One to three days per generator for a typical single set, established at survey rather than guessed. Where a site runs several sets, the sequence is planned so standby capability is never wholly lost.',
    },
  ],
  faqs: [
    {
      q: 'Will our generator be out of service?',
      a: 'For part of the installation, yes — the exhaust line has to be opened. The survey establishes exactly how long and, on multi-set sites, sequences the work so you retain standby capability throughout.',
    },
    {
      q: 'Do you handle the exhaust modification as well?',
      a: 'Yes. Re-routing, silencer adaptation, supports, insulation and cladding are part of the scope. ZAN-F manufactures silencers and exhaust systems, so the modification is not subcontracted out of our control.',
    },
  ],
}

export const testingPage = {
  eyebrow: 'Service · testing',
  heading: 'Testing & compliance verification',
  lede: 'Measured, not assumed. Back pressure, differential pressure and temperatures are recorded under load, compared against the design basis, and rectified where they do not agree with it.',
  sections: [
    {
      heading: 'What gets measured',
      body: 'Back pressure across the installed device against the engine manufacturer’s permissible limit. Differential pressure across the substrate, which is the baseline every later health check is compared to. Inlet and outlet temperature, confirming the device reaches the window where the catalysts work. All of it at the load steps the site can actually provide.',
    },
    {
      heading: 'OBD calibration',
      body: 'Sensors are verified and the panel is calibrated so the readings the site will rely on for the next several years start out correct. The commissioning values become the reference baseline in the maintenance record.',
    },
    {
      heading: 'Deviations',
      body: 'Anything outside the design basis is identified, rectified and re-tested before commissioning proceeds. A deviation log forms part of the handover pack — including the ones that were closed out.',
    },
  ],
  faqs: [
    {
      q: 'Do you carry out stack emission testing?',
      a: 'Emission performance checks are carried out against the design basis as part of verification. Where a statutory stack test by an accredited laboratory is required, that is a separate appointment — we will tell you when your situation calls for one rather than leave you to find out later.',
    },
    {
      q: 'What if the site cannot provide full load?',
      a: 'Testing is done at the load steps available and the record states which ones. If a load bank is needed to demonstrate performance properly, that is quoted openly rather than skipped quietly.',
    },
  ],
}

export const commissioningPage = {
  eyebrow: 'Service · commissioning',
  heading: 'Commissioning & handover',
  lede: 'Performance demonstrated, documents assembled, operators briefed, warranty registered. The job is done when your team can run the plant and answer for it without calling us.',
  sections: [
    {
      heading: 'Demonstration',
      body: 'The installed device is demonstrated to your team under running conditions, with the OBD readings explained: what normal looks like, what a rising differential pressure means, and at what point to pick up the phone.',
    },
    {
      heading: 'The documentation pack',
      body: 'Test readings, type-approval and product certificates, installation photographs, an as-installed sketch, calibration record, operating notes, warranty registration and a signed handover certificate — assembled during the job, not reconstructed from memory afterwards.',
    },
    {
      heading: 'After handover',
      body: 'Warranty is registered with the manufacturer in your name. Where an AMC is taken, the commissioning readings become the baseline every subsequent inspection is measured against.',
    },
  ],
  faqs: [
    {
      q: 'What exactly is in the compliance pack?',
      a: 'Test readings, the device’s type-approval and product certificates, installation photographs, an as-installed sketch of the exhaust route and mounting, the OBD calibration record, operating and maintenance notes, warranty registration and a signed handover certificate.',
    },
    {
      q: 'Who signs the handover?',
      a: 'The ZAN-F commissioning engineer and your nominated site representative, after the demonstration. A copy stays with you and a copy stays on our file.',
    },
  ],
}

export const amcPage = {
  eyebrow: 'Service · AMC',
  heading: 'AMC & post-installation support',
  lede: 'A device with no consumables still has a health curve. An AMC is how you see it coming — periodic inspection, catalyst health checks and, where you want it, the generator itself under the same contract.',
  sections: [
    {
      heading: 'Periodic inspection',
      body: 'Differential pressure compared against the commissioning baseline, temperatures checked, mounting and cladding inspected, sensor and panel function verified. Each visit adds a dated reading to the record rather than a tick in a box.',
    },
    {
      heading: 'Catalyst health',
      body: 'Substrate condition is assessed against the trend, not against a single reading. A device that is drifting is identified while it is still drifting.',
    },
    {
      heading: 'Combined DG + RECD contract',
      body: 'ZAN-F has serviced and overhauled diesel generators for over 25 years. The generator and the emission device can sit under one contract, one visit schedule and one accountable party — which is usually cheaper and always simpler than two.',
    },
  ],
  faqs: [
    {
      q: 'What does an AMC visit cover?',
      a: 'Differential pressure against the commissioning baseline, inlet and outlet temperatures, mounting and cladding condition, sensor and OBD panel function, and a dated entry in the maintenance record. Scope is fixed in the contract so there are no surprises either way.',
    },
    {
      q: 'Can the generator be included?',
      a: 'Yes. ZAN-F carries out DG set AMC and overhauling as its own service line, so the set and the emission device can be covered under one contract and one visit schedule.',
    },
    {
      q: 'We did not buy the device from ZAN-F. Can you still maintain it?',
      a: 'Talk to us. An initial inspection establishes what was installed and how, and whether we can responsibly take it on. We would rather say no at that point than take a contract on an installation we cannot stand behind.',
    },
  ],
}
