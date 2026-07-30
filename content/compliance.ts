/**
 * Compliance content.
 *
 * The hard rule for this file: no deadline, penalty figure or applicability
 * threshold is stated. Regulations differ by state and change without notice,
 * and a website that gets one wrong causes real damage. What is offered instead
 * is an accurate explanation of the mechanism plus direct links to the six
 * official notifications, which are the client's own published links.
 *
 * TODO: VERIFY CURRENT CPCB / NGT DIRECTIVES — once ZAN-F confirms the wording
 * and the dates that apply to its coverage area, they can be added here.
 */

export const compliancePage = {
  eyebrow: 'Compliance',
  heading: 'What the rules ask of a diesel generator',
  lede: 'Emission rules for in-use DG sets are set nationally by the CPCB and applied through state pollution control boards, so what applies to your site depends on where it is and what it is rated. This page explains the mechanism and links to the official notifications. It does not paraphrase them — for a decision that matters, read the source.',
}

export const explainers = [
  {
    q: 'What is a RECD?',
    a: 'A Retrofit Emission Control Device is fitted into the exhaust line of a diesel generator that is already in service. It treats the exhaust after it leaves the engine — the engine, alternator and controls are unchanged. That is what makes it a retrofit: it brings existing plant within emission limits without replacing it.',
  },
  {
    q: 'What does "type approved" mean?',
    a: 'The device design has been tested by a designated agency — ARAI or ICAT — under a defined test cycle, and approved by the CPCB for use as a retrofit emission control device. Approval attaches to the device type, not to your individual unit, which is why the certificate for the model you have installed belongs in your compliance file.',
  },
  {
    q: 'Why the ISO 8178 D2 cycle?',
    a: 'ISO 8178 5-mode D2 is the constant-speed test cycle used for stationary engines such as generator sets. It measures the device across a set of load points rather than at one convenient operating point, which is why it is the cycle referenced in type approval.',
  },
  {
    q: 'Who decides whether my site needs one?',
    a: 'The applicable state pollution control board, working from CPCB norms. Requirements vary by generator rating, by location — non-attainment cities are treated differently — and by the date the set was installed. The official notifications below are the authority. If you are unsure which applies to you, send us the rating and the location and we will point you at the relevant document.',
  },
  {
    q: 'What does non-compliance risk?',
    a: 'Enforcement is a matter for the state board and the National Green Tribunal, and the consequences stated in the notifications range from directions and closure orders to financial penalties. We do not quote figures here because they change and they differ by state — the notifications below carry the current position.',
  },
  {
    q: 'What proof should we hold?',
    a: 'At minimum: the type-approval certificate for the installed device, the installation record and photographs, commissioning test readings, and the maintenance record since. That is exactly what ZAN-F assembles as the handover pack, which is the reason it exists in that shape.',
  },
]

/** The six official links, unchanged from the client's live site. */
export const notifications = [
  {
    label: 'Central Pollution Control Board',
    short: 'CPCB',
    scope: 'National',
    note: 'Genset notifications index',
    href: 'https://cpcb.nic.in/genset-notifications/',
  },
  {
    label: 'Tamil Nadu Pollution Control Board',
    short: 'TNPCB',
    scope: 'Tamil Nadu',
    note: 'Retrofitting emission control, 2024',
    href: 'https://tnpcb.gov.in/pdf_2024/RetofittingEmissionControl2024.pdf',
  },
  {
    label: 'Kerala State Pollution Control Board',
    short: 'KSPCB',
    scope: 'Kerala',
    note: 'DG sets above 500 kVA',
    href: 'https://kspcb.kerala.gov.in/assets/uploads/widget/circulars/DG_Set_500_kVA_(1).pdf',
  },
  {
    label: 'Maharashtra Pollution Control Board',
    short: 'MPCB',
    scope: 'Maharashtra',
    note: 'Board circular',
    href: 'https://www.mpcb.gov.in/node/6543',
  },
  {
    label: 'Karnataka State Pollution Control Board',
    short: 'KSPCB',
    scope: 'Karnataka',
    note: 'Board notification',
    href: 'https://kspcb.karnataka.gov.in/sites/default/files/inline-files/Notification_0.pdf',
  },
  {
    label: 'Delhi Pollution Control Committee',
    short: 'DPCC',
    scope: 'Delhi NCR',
    note: 'Press release, Government of India',
    href: 'https://pib.gov.in/PressReleaseIframePage.aspx?PRID=1962141',
  },
] as const

export const complianceSteps = [
  {
    code: '01',
    title: 'Establish what applies',
    body: 'Rating, location and installation date decide which notification governs your set. Start from the official document, not from a vendor’s summary of it.',
  },
  {
    code: '02',
    title: 'Select a type-approved device',
    body: 'The device type must hold CPCB approval on the strength of ARAI or ICAT testing, and must be sized for your rating and exhaust route.',
  },
  {
    code: '03',
    title: 'Install and verify',
    body: 'Correct mounting, correct back pressure, calibrated instrumentation — verified by measurement under load, not by inspection of the invoice.',
  },
  {
    code: '04',
    title: 'Hold the evidence',
    body: 'Certificates, test readings, photographs and a maintenance record, kept together. Compliance you cannot evidence is compliance you cannot prove.',
  },
]

export const complianceFaqs = [
  {
    q: 'Does a RECD make my generator compliant on its own?',
    a: 'The device is the necessary hardware, but compliance is the whole package: a type-approved device, correctly sized and installed, verified by measurement, and evidenced by documentation you can produce on request. A correctly certified device installed badly satisfies nobody.',
  },
  {
    q: 'Our DG set is fifteen years old. Is it too late to retrofit?',
    a: 'Age is not usually the constraint — the exhaust route and available space are. Retrofit is precisely the mechanism for plant already in service. A site survey establishes feasibility before anything is committed.',
  },
  {
    q: 'We have several sets of different ratings. Do they all need the same device?',
    a: 'No. Devices are sized per set. Sets from 25 to 1000 kVA take a RECD; above 1000 kVA the RATS® after-treatment system applies, built to the duct run. A single survey can cover the whole plant room and return one sequenced scope.',
  },
  {
    q: 'Where do the official notifications live?',
    a: 'Linked in full on this page — CPCB nationally, plus the Tamil Nadu, Kerala, Maharashtra, Karnataka and Delhi board notifications. They open on the issuing authority’s own site, so you are reading the source rather than our copy of it.',
  },
]
