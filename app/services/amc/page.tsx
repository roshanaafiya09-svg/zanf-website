import ServiceChild from '@/components/ServiceChild'
import { amcPage } from '@/content/services'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'RECD & DG set AMC and support',
  description:
    'Periodic inspection against the commissioning baseline, catalyst health checks, and generator plus RECD maintenance under one contract.',
  path: '/services/amc/',
})

export default function AmcPage() {
  return (
    <ServiceChild
      content={amcPage}
      path="/services/amc/"
      crumbName="AMC"
      deliverables={{
        heading: 'What each AMC visit adds to the record',
        items: [
          'Differential pressure against the commissioning baseline',
          'Inlet and outlet temperature readings',
          'Mounting, insulation and cladding condition',
          'Sensor and OBD panel verification',
          'Catalyst health assessed against the trend',
          'Dated entry in the maintenance record',
        ],
      }}
      ctaHeading="Put the generator and the device under one contract"
      ctaBody="One visit schedule, one accountable party, and a maintenance record that stays continuous — which is what an auditor actually wants to see."
    />
  )
}
