import { testimonials } from '@/content/site'

/**
 * Renders nothing until real quotes exist.
 *
 * The alternative — a carousel of invented praise, or three grey boxes reading
 * "Client Name, Designation" — costs more credibility with a procurement
 * manager than the missing section ever could.
 */
export default function Testimonials() {
  if (testimonials.length === 0) return null

  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {testimonials.map((item) => (
        <li key={item.name} className="card p-8">
          <blockquote className="display text-lg leading-snug">
            “{item.quote}”
          </blockquote>
          <footer className="mt-6 text-sm">
            <p className="text-ink">{item.name}</p>
            <p className="mono mt-1 text-[0.6875rem] uppercase tracking-[0.1em] text-ink-400">
              {item.role} · {item.company}
            </p>
          </footer>
        </li>
      ))}
    </ul>
  )
}
