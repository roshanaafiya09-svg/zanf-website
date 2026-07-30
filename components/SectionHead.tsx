import Eyebrow from './Eyebrow'
import GradientRule from './GradientRule'

/**
 * Eyebrow → heading → lede, with the gradient rule as the tie between the
 * label and the headline. One component so vertical rhythm cannot drift
 * between sections.
 */
export default function SectionHead({
  eyebrow,
  heading,
  lede,
  align = 'left',
  level = 2,
  className = '',
  children,
}: {
  eyebrow?: string
  heading: React.ReactNode
  lede?: React.ReactNode
  align?: 'left' | 'center'
  level?: 1 | 2 | 3
  className?: string
  children?: React.ReactNode
}) {
  const Heading = `h${level}` as 'h1' | 'h2' | 'h3'
  const centred = align === 'center'

  return (
    <div
      className={`${centred ? 'mx-auto max-w-2xl text-center' : 'max-w-3xl'} ${className}`}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <GradientRule
        width="w-16"
        className={`mt-4 ${centred ? 'mx-auto' : ''}`}
      />
      <Heading
        className={`display mt-6 text-[1.9rem] sm:text-[2.4rem] lg:text-[3rem] ${
          level === 1 ? 'lg:text-[3.5rem]' : ''
        }`}
      >
        {heading}
      </Heading>
      {lede && <p className="lede mt-5">{lede}</p>}
      {children}
    </div>
  )
}
