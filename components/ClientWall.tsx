import Image from 'next/image'
import SectionRule from './SectionRule'
import { clients, trademarkNotice } from '@/content/site'

/**
 * Clientele logo wall.
 *
 * The white background is removed from each logo in scripts/prepare-logos.mjs,
 * so the page colour shows straight through — no white boxes, no tiles, no
 * grid lines. Each logo keeps its own brand colours.
 *
 * Each one pops on hover: lifts, scales, and picks up a copper hairline.
 */
export default function ClientWall() {
  if (clients.length === 0) return null

  return (
    <>
      <SectionRule />
      <section>
        <div className="shell section">
          <p className="eyebrow">Clientele</p>
          <h2 className="display mt-6 max-w-2xl text-2xl md:text-4xl">
            Trusted on site by the people who cannot afford downtime.
          </h2>

          <ul className="mt-14 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {clients.map((client) => (
              <li key={client.name}>
                <div className="group relative grid h-24 place-items-center rounded-[2px] bg-[#f2f5f3] px-5 transition-all duration-300 ease-out hover:-translate-y-1.5 md:h-28 md:px-7">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-[2px] border border-transparent transition-colors duration-300 group-hover:border-accent"
                  />
                  <Image
                    src={client.src}
                    alt={client.name}
                    width={200}
                    height={80}
                    className="max-h-9 w-auto object-contain transition-transform duration-300 ease-out group-hover:scale-110 md:max-h-11"
                  />
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-12 max-w-3xl text-xs leading-relaxed text-lo">
            {trademarkNotice}
          </p>
        </div>
      </section>
    </>
  )
}
