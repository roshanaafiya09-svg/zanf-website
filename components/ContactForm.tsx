'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { enquirySchema, type Enquiry } from '@/lib/enquiry'
import { contact, indianStates } from '@/content/site'

const field =
  'w-full rounded-[2px] border border-hairline bg-surface-1 px-4 py-3 text-sm text-hi outline-none transition-colors duration-200 placeholder:text-lo focus:border-hairline-strong'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Enquiry>({ resolver: zodResolver(enquirySchema) })

  async function onSubmit(values: Enquiry) {
    setStatus('sending')
    try {
      const res = await fetch('/api/enquiry/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  /** Fallback path: hand the same details to WhatsApp if email is unavailable. */
  function whatsappHref() {
    const v = getValues()
    const text = [
      `Enquiry from ${v.name || ''}`,
      v.company && `Company: ${v.company}`,
      v.state && `State: ${v.state}`,
      v.mobile && `Mobile: ${v.mobile}`,
      v.email && `Email: ${v.email}`,
      v.message && `\n${v.message}`,
    ]
      .filter(Boolean)
      .join('\n')
    return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`
  }

  if (status === 'sent') {
    return (
      <div className="border border-hairline bg-surface-1 p-8">
        <p className="display text-2xl">Thank you — your enquiry is with us.</p>
        <p className="mt-4 text-sm text-mid">
          Our team will be in touch during office hours. If it is urgent, call{' '}
          <a
            href={`tel:${contact.phoneHref}`}
            className="figure text-hi underline underline-offset-4"
          >
            {contact.phoneDisplay}
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="eyebrow">
            Name
          </label>
          <input
            id="name"
            className={`${field} mt-2`}
            placeholder="Your name"
            aria-invalid={!!errors.name}
            {...register('name')}
          />
          {errors.name && (
            <p className="mt-2 text-xs text-warn">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="eyebrow">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`${field} mt-2`}
            placeholder="name@company.com"
            aria-invalid={!!errors.email}
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-2 text-xs text-warn">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="company" className="eyebrow">
          Your Company
        </label>
        <input
          id="company"
          className={`${field} mt-2`}
          placeholder="Company name"
          {...register('company')}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="state" className="eyebrow">
            Select Your State
          </label>
          <select
            id="state"
            className={`${field} mt-2`}
            defaultValue=""
            aria-invalid={!!errors.state}
            {...register('state')}
          >
            <option value="" disabled>
              Select your state
            </option>
            {indianStates.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.state && (
            <p className="mt-2 text-xs text-warn">{errors.state.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="mobile" className="eyebrow">
            Mobile
          </label>
          <input
            id="mobile"
            type="tel"
            inputMode="tel"
            className={`${field} mt-2`}
            placeholder="10-digit mobile number"
            aria-invalid={!!errors.mobile}
            {...register('mobile')}
          />
          {errors.mobile && (
            <p className="mt-2 text-xs text-warn">{errors.mobile.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="eyebrow">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className={`${field} mt-2 resize-y`}
          placeholder="DG rating, site location, and what you need"
          {...register('message')}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center gap-2 rounded-[2px] bg-cta px-7 py-3.5 text-sm font-medium tracking-[0.04em] text-cta-ink transition-opacity duration-200 hover:opacity-90 disabled:opacity-60"
        >
          {status === 'sending' && (
            <Loader2 size={15} strokeWidth={1.5} className="animate-spin" />
          )}
          SUBMIT &amp; GO GREEN
        </button>

        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-[2px] border border-hairline-strong px-6 py-3.5 text-sm text-hi transition-colors duration-200 hover:border-hi"
        >
          Send on WhatsApp
        </a>
      </div>

      {status === 'error' && (
        <p className="text-sm text-warn">
          That did not go through. Please try WhatsApp, or call{' '}
          <a href={`tel:${contact.phoneHref}`} className="figure underline">
            {contact.phoneDisplay}
          </a>
          .
        </p>
      )}
    </form>
  )
}
