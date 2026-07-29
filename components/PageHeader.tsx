import Aurora from './Aurora'

export default function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string
  title: string
  lead?: string
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <Aurora intensity="soft" />
      <div className="shell relative pb-16 pt-40 md:pb-24 md:pt-52">
        <p className="eyebrow flex items-center gap-2.5">
          <span className="h-[5px] w-[5px] bg-accent" />
          {eyebrow}
        </p>
        <h1 className="display mt-7 max-w-4xl text-4xl md:text-[4rem]">
          {title}
        </h1>
        {lead && (
          <p className="mt-7 max-w-2xl text-base text-mid md:text-lg">{lead}</p>
        )}
      </div>
    </section>
  )
}
