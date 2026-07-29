import Button from '@/components/Button'
import PageHeader from '@/components/PageHeader'

export default function NotFound() {
  return (
    <>
      <PageHeader
        eyebrow="404"
        title="That page has moved on."
        lead="The link you followed does not lead anywhere on this site. Try the services page, or get in touch and we will point you at the right thing."
      />
      <div className="shell section flex flex-wrap gap-3">
        <Button href="/">Back to home</Button>
        <Button href="/contact-us/" variant="ghost">
          Get in Touch
        </Button>
      </div>
    </>
  )
}
