import { z } from 'zod'

/** Shared between the form component and the API route. */
export const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Enter your name'),
  email: z.string().trim().email('Enter a valid email address'),
  company: z.string().trim().optional().default(''),
  state: z.string().trim().min(1, 'Select your state'),
  mobile: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s-]{7,15}$/, 'Enter a valid mobile number'),
  message: z.string().trim().optional().default(''),
})

export type Enquiry = z.infer<typeof enquirySchema>
