import Link from 'next/link'

export default function Breadcrumbs({
  items,
}: {
  items: { name: string; path: string }[]
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="mono flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.6875rem] uppercase tracking-[0.1em] text-air-lo">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-air-mid">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className="transition-colors hover:text-air-ink">
                    {item.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
