import Link from 'next/link'
import type { ReactNode } from 'react'

/**
 * MDX element map.
 *
 * Article typography is set here rather than with a prose plugin so the
 * measure, the rhythm and the link colour stay identical to the rest of the
 * site — an article should look like the same company wrote it.
 */
export const mdxComponents = {
  h2: (props: { children?: ReactNode }) => (
    <h2
      className="display display-lg mt-14 text-[1.6rem] sm:text-[1.9rem]"
      {...props}
    />
  ),
  h3: (props: { children?: ReactNode }) => (
    <h3 className="display mt-10 text-xl" {...props} />
  ),
  p: (props: { children?: ReactNode }) => (
    <p className="mt-5 text-[1.0625rem] leading-[1.7]" {...props} />
  ),
  ul: (props: { children?: ReactNode }) => (
    <ul className="mt-5 space-y-2.5 pl-1" {...props} />
  ),
  ol: (props: { children?: ReactNode }) => (
    <ol className="mt-5 list-decimal space-y-2.5 pl-5 marker:font-mono marker:text-[var(--emission-700)]" {...props} />
  ),
  li: (props: { children?: ReactNode }) => (
    <li
      className="text-[1.0625rem] leading-[1.7] [ul>&]:relative [ul>&]:pl-6 [ul>&]:before:absolute [ul>&]:before:left-0 [ul>&]:before:top-[0.7em] [ul>&]:before:h-[2px] [ul>&]:before:w-3 [ul>&]:before:bg-[var(--emission-500)]"
      {...props}
    />
  ),
  strong: (props: { children?: ReactNode }) => (
    <strong className="font-medium text-ink" {...props} />
  ),
  blockquote: (props: { children?: ReactNode }) => (
    <blockquote
      className="mt-8 border-l-2 border-[var(--emission-500)] pl-6 text-[1.0625rem] italic"
      {...props}
    />
  ),
  hr: () => <hr className="mt-12 border-t border-steel-200" />,
  a: ({ href = '', ...props }: { href?: string; children?: ReactNode }) =>
    href.startsWith('/') ? (
      <Link
        href={href}
        className="text-[var(--emission-700)] underline underline-offset-4"
        {...props}
      />
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--emission-700)] underline underline-offset-4"
        {...props}
      />
    ),
  code: (props: { children?: ReactNode }) => (
    <code className="mono rounded-[3px] bg-steel-100 px-1.5 py-0.5 text-[0.9em]" {...props} />
  ),
}

/** Wrapper that fixes the measure for long-form reading. */
export default function Prose({ children }: { children: ReactNode }) {
  return <div className="max-w-[68ch]">{children}</div>
}
