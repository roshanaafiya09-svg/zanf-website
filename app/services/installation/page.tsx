import ServiceChild from '@/components/ServiceChild'
import { installationPage, stages } from '@/content/services'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'RECD installation for diesel generators',
  description:
    'Site survey, back-pressure calculation, RECD sizing, mechanical erection, exhaust integration, insulation and OBD wiring. Typically one to three days per DG set.',
  path: '/services/installation/',
})

export default function InstallationPage() {
  return (
    <ServiceChild
      content={installationPage}
      path="/services/installation/"
      crumbName="Installation"
      deliverables={{
        heading: 'What the installation stage produces',
        items: [...stages[0].deliverables, ...stages[1].deliverables],
      }}
      ctaHeading="Have an exhaust line that needs looking at?"
      ctaBody="The survey is where a bad installation gets prevented rather than discovered. Half a day on site, and you get a firm scope back."
    />
  )
}
