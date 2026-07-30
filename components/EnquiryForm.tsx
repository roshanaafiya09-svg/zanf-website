'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import {
  enquirySchema,
  enquiryToText,
  type Enquiry,
} from '@/lib/enquiry'
import {
  contact,
  dgRatings,
  indianStates,
  requirementTypes,
  whatsappLink,
} from '@/content/site'

const field =
  'w-full rounded-[4px] border border-steel-200 bg-white px-3.5 py-3 text-[0.9375rem] text-ink outline-none transition-colors duration-200 placeholder:text-ink-400 focus:border-[var(--emission-600)]'

const label = 'eyebrow block text-ink-600'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/**
 * One form, two densities.
 *
 * `compact` is the quote modal: the five fields a first contact needs.
 * `full` is the contact page: the same fields plus state and a message box.
 *
 * Both post to /api/enquiry, and both offer the WhatsApp fallback carrying the
 * details the visitor already typed — an enquiry is never lost to a 503.
 */
export default function EnquiryForm({
  variant = 'full',
  source,
  onSuccess,
}: {
  variant?: 'compact' | 'full'
  source: string
  onSuccess?: () => void
}) {
  const [status, setStatus] = useState<Status>('idle')
  const compact = variant === 'compact'

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Enquiry>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { source },
  })

  async function onSubmit(values: Enquiry) {
    setStatus('sending')
    try {
      const res = await fetch('/api/enquiry/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, source }),
      })
      if (res.ok) {
        setStatus('sent')
        onSuccess?.()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-[8px] border border-steel-200 bg-white p-8">
        <p className="display text-2xl">Thank you — your enquiry is with us.</p>
        <p className="mt-4 text-sm">
          An engineer will come back to you during office hours. If it is
          urgent, call{' '}
          <a
            href={`tel:${contact.phoneHref}`}
            className="figure underline underline-offset-4"
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
      <input type="hidden" {...register('source')} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ef-name" className={label}>
            Name
          </label>
          <input
            id="ef-name"
            autoComplete="name"
            className={`${field} mt-2`}
            placeholder="Your name"
            aria-invalid={!!errors.name}
            {...register('name')}
          />
          {errors.name && (
            <p className="mt-2 text-xs text-[var(--signal-ink)]">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="ef-company" className={label}>
            Company
          </label>
          <input
            id="ef-company"
            autoComplete="organization"
            className={`${field} mt-2`}
            placeholder="Company name"
            {...register('company')}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ef-phone" className={label}>
            Phone
          </label>
          <input
            id="ef-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={`${field} mt-2`}
            placeholder="10-digit mobile number"
            aria-invalid={!!errors.phone}
            {...register('phone')}
          />
          {errors.phone && (
            <p className="mt-2 text-xs text-[var(--signal-ink)]">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="ef-email" className={label}>
            Email
          </label>
          <input
            id="ef-email"
            type="email"
            autoComplete="email"
            className={`${field} mt-2`}
            placeholder="name@company.com"
            aria-invalid={!!errors.email}
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-2 text-xs text-[var(--signal-ink)]">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ef-rating" className={label}>
            DG rating
          </label>
          <select
            id="ef-rating"
            className={`${field} mt-2`}
            defaultValue=""
            {...register('dgRating')}
          >
            <option value="">Select a rating</option>
            {dgRatings.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="ef-requirement" className={label}>
            What do you need
          </label>
          <select
            id="ef-requirement"
            className={`${field} mt-2`}
            defaultValue=""
            aria-invalid={!!errors.requirement}
            {...register('requirement')}
          >
            <option value="" disabled>
              Select a requirement
            </option>
            {requirementTypes.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
          {errors.requirement && (
            <p className="mt-2 text-xs text-[var(--signal-ink)]">
              {errors.requirement.message}
            </p>
          )}
        </div>
      </div>

      {!compact && (
        <div>
          <label htmlFor="ef-state" className={label}>
            State
          </label>
          <select
            id="ef-state"
            className={`${field} mt-2`}
            defaultValue=""
            {...register('state')}
          >
            <option value="">Select your state</option>
            {indianStates.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="ef-message" className={label}>
          Message
        </label>
        <textarea
          id="ef-message"
          rows={compact ? 3 : 5}
          className={`${field} mt-2 resize-y`}
          placeholder="Site location, number of sets, and what you need done"
          {...register('message')}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center gap-2 rounded-[4px] bg-[var(--emission-600)] px-7 py-3.5 text-sm font-medium leading-none text-white transition-colors duration-200 hover:bg-[var(--emission-700)] disabled:opacity-60"
        >
          {status === 'sending' && (
            <Loader2 size={15} strokeWidth={1.75} className="animate-spin" />
          )}
          Send enquiry
        </button>

        <a
          href={whatsappLink(enquiryToText(getValues()))}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-[4px] border border-hairline-strong px-6 py-3.5 text-sm leading-none text-ink transition-colors duration-200 hover:border-[var(--emission-600)]"
        >
          Send on WhatsApp
        </a>
      </div>

      {status === 'error' && (
        <p className="text-sm text-[var(--signal-ink)]">
          That did not go through. Please use WhatsApp, or call{' '}
          <a href={`tel:${contact.phoneHref}`} className="figure underline">
            {contact.phoneDisplay}
          </a>
          .
        </p>
      )}

      <p className="text-xs text-ink-400">
        We use these details to answer your enquiry. Nothing is shared with
        anyone else.
      </p>
    </form>
  )
}
