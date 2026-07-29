import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { enquirySchema } from '@/lib/enquiry'
import { contact } from '@/content/site'

export async function POST(request: Request) {
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

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // Without a key there is nowhere to send this. Fail loudly rather than
    // reporting success and silently dropping an enquiry.
    // TODO: set RESEND_API_KEY and ENQUIRY_FROM in the deployment environment.
    console.error('RESEND_API_KEY is not set — enquiry was not delivered')
    return NextResponse.json({ error: 'Email is not configured' }, { status: 503 })
  }

  const { name, email, company, state, mobile, message } = parsed.data

  try {
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: process.env.ENQUIRY_FROM ?? 'ZAN-F Website <onboarding@resend.dev>',
      to: [...contact.emails],
      replyTo: email,
      subject: `Website enquiry — ${name}${company ? ` (${company})` : ''}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || '—'}`,
        `State: ${state}`,
        `Mobile: ${mobile}`,
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
