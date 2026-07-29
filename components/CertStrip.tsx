import SectionRule from './SectionRule'
import { certifications, features, trademarkNotice } from '@/content/site'

export default function CertStrip() {
  return (
    <>
      <SectionRule />
      <section>
        <div className="shell py-14 md:py-20">
          <div className="flex flex-col gap-9 md:flex-row md:items-start md:justify-between">
            <p className="max-w-sm text-sm text-mid">{features.note}</p>

            <ul className="flex flex-wrap gap-x-10 gap-y-4">
              {certifications.map((cert) => (
                <li key={cert.short}>
                  <span className="reading block text-lg text-hi">
                    {cert.short}
                  </span>
                  <span className="eyebrow mt-1 block max-w-[11rem]">
                    {cert.full}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-12 max-w-3xl text-xs leading-relaxed text-lo">
            {trademarkNotice}
          </p>
        </div>
      </section>
    </>
  )
}
