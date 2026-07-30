import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { enquirySchema, requirementLabels } from '@/lib/enquiry'
import { clientKey, rateLimit } from '@/lib/rate-limit'
import { contact } from '@/content/site'

/** Five enquiries per address per ten minutes. Generous for a person, tight
 *  for a script — a genuine visitor sending a second enquiry never notices. */
const LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 }

export async function POST(request: Request) {
  const limit = rateLimit(clientKey(request), LIMIT)
  if (!limit.ok) {
    return NextResponse.json(
      {
        error:
          'Too many enquiries from this connection. Please call or use WhatsApp.',
      },
      {
        status: 429,
        headers: { 'Retry-After': String(limit.retryAfterSeconds) },
      }
    )
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const parsed = enquirySchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please check the form and try again' },
      { status: 422 }
    )
  }

  const {
    name,
    email,
    company,
    phone,
    dgRating,
    requirement,
    state,
    message,
    source,
    website,
  } = parsed.data

  // Honeypot. A person never sees this field, so anything in it is a bot.
  // Answer 200: an error tells the script to adjust and try again, silence does
  // not. Nothing is sent and nothing is logged as a real enquiry.
  if (website) {
    return NextResponse.json({ ok: true })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // Without a key there is nowhere to send this. Fail loudly rather than
    // reporting success and silently dropping an enquiry.
    // TODO: set RESEND_API_KEY and ENQUIRY_FROM in the deployment environment.
    console.error('RESEND_API_KEY is not set — enquiry was not delivered')
    return NextResponse.json(
      { error: 'Email is not configured' },
      { status: 503 }
    )
  }

  try {
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: process.env.ENQUIRY_FROM ?? 'ZAN-F Website <onboarding@resend.dev>',
      to: [...contact.emails],
      replyTo: email,
      subject: `${requirementLabels[requirement].split(' — ')[0]} enquiry — ${name}${
        company ? ` (${company})` : ''
      }`,
      text: [
        `Name: ${name}`,
        `Company: ${company || '—'}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `DG rating: ${dgRating || '—'}`,
        `Requirement: ${requirementLabels[requirement]}`,
        `State: ${state || '—'}`,
        `Came from: ${source || '—'}`,
        '',
        message || '(no message)',
      ].join('\n'),
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Failed to send enquiry', error)
    return NextResponse.json({ error: 'Could not send' }, { status: 502 })
  }
}
