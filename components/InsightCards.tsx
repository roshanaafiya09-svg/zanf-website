import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal'
import { formatDate, type Insight } from '@/lib/content'

export default function InsightCards({
  insights,
  limit,
}: {
  insights: Insight[]
  limit?: number
}) {
  const shown = limit ? insights.slice(0, limit) : insights

  if (shown.length === 0) return null

  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {shown.map((insight, i) => (
        <Reveal as="li" key={insight.slug} delay={i * 0.06}>
          <Link
            href={`/insights/${insight.slug}/`}
            className="card group flex h-full flex-col p-7"
          >
            <p className="mono text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--emission-700)]">
              {insight.topic}
            </p>
            <h3 className="display mt-4 flex items-start justify-between gap-3 text-lg leading-snug">
              {insight.title}
              <ArrowUpRight
                size={17}
                strokeWidth={1.75}
                aria-hidden="true"
                className="mt-1 shrink-0 text-ink-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </h3>
            <p className="mt-3 text-sm">{insight.description}</p>
            <p className="mono mt-auto pt-6 text-[0.6875rem] uppercase tracking-[0.1em] text-ink-400">
              {formatDate(insight.date)}
              {insight.readingTime && ` · ${insight.readingTime}`}
            </p>
          </Link>
        </Reveal>
      ))}
    </ul>
  )
}
