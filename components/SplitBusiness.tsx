import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import GradientRule from './GradientRule'
import { businesses } from '@/content/site'

/**
 * The structural point of the whole site: two businesses, given equal weight
 * and equal visual size. A visitor who reads nothing else should still come
 * away knowing ZAN-F sells hardware *and* executes the engineering.
 *
 * The panels are deliberately mirrored — same height, same type, same CTA
 * treatment — because making one of them prettier would answer the question
 * the section exists to leave open.
 */
export default function SplitBusiness() {
  return (
    <div className="grid gap-px overflow-hidden rounded-[8px] border border-steel-200 bg-[var(--steel-200)] lg:grid-cols-2">
      {businesses.map((business, i) => (
        <div
          key={business.title}
          className={`flex flex-col p-8 md:p-10 ${
            i === 0 ? 'bg-white' : 'on-carbon bg-carbon'
          }`}
        >
          <p
            className={`mono text-[0.6875rem] uppercase tracking-[0.14em] ${
              i === 0 ? 'text-ink-400' : 'text-air-lo'
            }`}
          >
            {business.kicker}
          </p>
          <h3 className="display display-lg mt-4 text-[1.6rem] sm:text-[1.9rem]">
            {business.title}
          </h3>
          <GradientRule width="w-14" className="mt-5" />
          <p className="mt-5 text-[0.9375rem]">{business.body}</p>

          <ul className="mt-7 space-y-3 text-sm">
            {business.points.map((point) => (
              <li key={point} className="flex gap-3">
                <Check
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                  className={`mt-0.5 shrink-0 ${
                    i === 0
                      ? 'text-[var(--emission-700)]'
                      : 'text-[var(--emission-300)]'
                  }`}
                />
                {point}
              </li>
            ))}
          </ul>

          <Link
            href={business.cta.href}
            className={`group mt-auto inline-flex items-center gap-2 pt-9 text-sm font-medium ${
              i === 0
                ? 'text-[var(--emission-700)] hover:text-ink'
                : 'text-[var(--emission-300)] hover:text-air-ink'
            }`}
          >
            {business.cta.label}
            <ArrowRight
              size={15}
              strokeWidth={2}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      ))}
    </div>
  )
}
