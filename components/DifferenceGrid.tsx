import { getIcon } from '@/lib/icons'
import Reveal from './Reveal'
import { differences } from '@/content/site'

/**
 * Four reasons, four cards. Each one is a claim ZAN-F can stand behind in a
 * meeting — no "world-class", no "cutting-edge".
 */
export default function DifferenceGrid() {
  return (
    <ul className="grid gap-px overflow-hidden rounded-[8px] border border-steel-200 bg-[var(--steel-200)] sm:grid-cols-2 lg:grid-cols-4">
      {differences.map((item, i) => {
        const Icon = getIcon(item.icon)
        return (
          <Reveal as="li" key={item.title} delay={i * 0.06}>
            <div className="group h-full bg-white p-7 transition-colors duration-200 hover:bg-[var(--steel-100)]">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--emission-tint)] text-[var(--emission-700)]">
                <Icon size={19} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h3 className="display mt-6 text-lg">{item.title}</h3>
              <p className="mt-3 text-sm">{item.body}</p>
            </div>
          </Reveal>
        )
      })}
    </ul>
  )
}
