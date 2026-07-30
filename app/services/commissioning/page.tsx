import ServiceChild from '@/components/ServiceChild'
import { commissioningPage, handoverPack } from '@/content/services'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'RECD commissioning & compliance handover',
  description:
    'Performance demonstration, compliance documentation pack, operator briefing and warranty registration — signed off with your site team.',
  path: '/services/commissioning/',
})

export default function CommissioningPage() {
  return (
    <ServiceChild
      content={commissioningPage}
      path="/services/commissioning/"
      crumbName="Commissioning"
      deliverables={{
        heading: handoverPack.heading,
        items: [...handoverPack.items],
      }}
      ctaHeading="Want a handover you can hand to an inspector?"
      ctaBody="The pack is assembled during the job, not reconstructed afterwards. That is the difference between a compliant installation and a provable one."
    />
  )
}
