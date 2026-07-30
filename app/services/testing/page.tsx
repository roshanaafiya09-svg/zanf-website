import ServiceChild from '@/components/ServiceChild'
import { stages, testingPage } from '@/content/services'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'RECD testing & compliance verification',
  description:
    'Back-pressure measurement, emission checks, OBD calibration and load trials, with deviations rectified and re-tested before commissioning.',
  path: '/services/testing/',
})

export default function TestingPage() {
  return (
    <ServiceChild
      content={testingPage}
      path="/services/testing/"
      crumbName="Testing"
      deliverables={{
        heading: 'What the testing stage produces',
        items: stages[2].deliverables,
      }}
      ctaHeading="Installed device with no readings behind it?"
      ctaBody="A verification visit establishes what was installed, takes a proper baseline, and gives you the record you should already have."
    />
  )
}
