import Button from '@/components/Button'
import PageHero from '@/components/PageHero'

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        heading="That page has moved on"
        lede="The link you followed does not lead anywhere on this site. The products, services and compliance sections below cover most of what people arrive looking for."
        breadcrumbs={[{ name: 'Home', path: '/' }]}
      />
      <div className="shell section flex flex-wrap gap-3">
        <Button href="/">Back to home</Button>
        <Button href="/products/" variant="outline">
          Products
        </Button>
        <Button href="/services/" variant="outline">
          ITC services
        </Button>
        <Button href="/contact/" variant="outline">
          Contact
        </Button>
      </div>
    </>
  )
}
