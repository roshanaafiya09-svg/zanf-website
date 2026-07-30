import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal'
import { products } from '@/content/products'

export default function ProductCards() {
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {products.map((product, i) => (
        <Reveal as="li" key={product.slug} delay={i * 0.06}>
          <Link
            href={`/products/${product.slug}/`}
            className="card group flex h-full flex-col overflow-hidden"
          >
            <div className="duotone relative aspect-[16/10] overflow-hidden border-b border-steel-200">
              <Image
                src={product.image.src}
                alt={product.image.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <p className="mono text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--emission-700)]">
                {product.range}
              </p>
              <h3 className="display mt-3 flex items-start justify-between gap-3 text-xl">
                {product.name}
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.75}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-ink-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </h3>
              <p className="mt-3 text-sm">{product.summary}</p>
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  )
}
