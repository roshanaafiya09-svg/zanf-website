import { getIcon } from '@/lib/icons'
import { industries } from '@/content/site'

export default function IndustryGrid() {
  return (
    <ul className="grid gap-px overflow-hidden rounded-[8px] border border-steel-200 bg-[var(--steel-200)] sm:grid-cols-2 lg:grid-cols-3">
      {industries.map((industry) => {
        const Icon = getIcon(industry.icon)
        return (
          <li
            key={industry.name}
            className="group bg-white p-7 transition-colors duration-200 hover:bg-[var(--steel-100)]"
          >
            <div className="flex items-center gap-3">
              <Icon
                size={18}
                strokeWidth={1.5}
                aria-hidden="true"
                className="text-[var(--emission-700)]"
              />
              <h3 className="display text-base">{industry.name}</h3>
            </div>
            <p className="mt-3 text-sm">{industry.body}</p>
          </li>
        )
      })}
    </ul>
  )
}
