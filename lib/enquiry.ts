import { z } from 'zod'

/**
 * One schema for both forms — the short quote modal and the long contact page.
 * The contact page simply exposes more of the same fields.
 *
 * `requirement` is the field that makes the second business line measurable:
 * it tells ZAN-F whether the site is selling hardware or engineering work.
 */
export const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Enter your name'),
  company: z.string().trim().optional().default(''),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s-]{7,15}$/, 'Enter a valid phone number'),
  email: z.string().trim().email('Enter a valid email address'),
  dgRating: z.string().trim().optional().default(''),
  requirement: z.enum(['product', 'sitc', 'amc', 'other'], {
    errorMap: () => ({ message: 'Choose what you need' }),
  }),
  state: z.string().trim().optional().default(''),
  message: z.string().trim().optional().default(''),
  /** Which page and CTA the enquiry came from. Hidden field, not user input. */
  source: z.string().trim().max(120).optional().default(''),
})

export type Enquiry = z.infer<typeof enquirySchema>

export const requirementLabels: Record<Enquiry['requirement'], string> = {
  product: 'Product — RECD / RATS® supply',
  sitc: 'SITC — supply, installation, testing, commissioning',
  amc: 'AMC — maintenance and support',
  other: 'Something else',
}

/** The same details, formatted for the WhatsApp fallback path. */
export function enquiryToText(v: Partial<Enquiry>) {
  return [
    `Enquiry from ${v.name || ''}`.trim(),
    v.company && `Company: ${v.company}`,
    v.phone && `Phone: ${v.phone}`,
    v.email && `Email: ${v.email}`,
    v.dgRating && `DG rating: ${v.dgRating}`,
    v.requirement && `Requirement: ${requirementLabels[v.requirement]}`,
    v.state && `State: ${v.state}`,
    v.message && `\n${v.message}`,
  ]
    .filter(Boolean)
    .join('\n')
}
