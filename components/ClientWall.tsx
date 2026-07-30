import Image from 'next/image'
import Eyebrow from './Eyebrow'
import { clients, trademarkNotice } from '@/content/site'

/**
 * Marks are shown in their own brand colours, as supplied.
 *
 * "Neat" here is a sizing problem rather than a colour one: the source files
 * have wildly different aspect ratios, so each sits in an identical cell,
 * centred, capped on both height and width, with the same padding. That is what
 * makes a wall of mismatched logos read as a grid instead of a jumble.
 *
 * The white matte was removed from each PNG by scripts/prepare-logos.mjs, so
 * the cell colour shows through the anti-aliased edges cleanly.
 *
 * The height cap is 36px rather than something larger because the source files
 * are small — they range from 168×23 (Praxair) to 101×99 (Ather). At this size
 * almost every mark is being scaled *down*, which is what keeps the wall sharp.
 * TODO: higher-resolution logo files, ideally SVG, would let the wall run
 * larger. TODO: confirm ZAN-F holds permission to display each mark.
 */
export default function ClientWall() {
  if (clients.length === 0) return null

  return (
    <section className="section-tight border-y border-steel-200 bg-white">
      <div className="shell">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <Eyebrow>Clientele</Eyebrow>
          <p className="text-sm text-ink-400">
            Sites where our people have worked on DG plant.
          </p>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[8px] border border-steel-200 bg-[var(--steel-200)] sm:grid-cols-3 lg:grid-cols-5">
          {clients.map((client) => (
            <li
              key={client.name}
              className="flex h-24 items-center justify-center bg-white px-7 py-5"
            >
              <Image
                src={client.src}
                alt={client.name}
                width={200}
                height={80}
                sizes="180px"
                className="max-h-9 w-auto max-w-full object-contain transition-transform duration-300 hover:scale-[1.06]"
              />
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-4xl text-xs leading-relaxed text-ink-400">
          {trademarkNotice}
        </p>
      </div>
    </section>
  )
}
