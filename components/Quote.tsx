'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { X } from 'lucide-react'
import EnquiryForm from './EnquiryForm'
import GradientRule from './GradientRule'
import { contact } from '@/content/site'

type QuoteContext = {
  open: (source?: string) => void
  close: () => void
}

const Ctx = createContext<QuoteContext | null>(null)

export function useQuote() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useQuote must be used inside <QuoteProvider>')
  return ctx
}

/**
 * The quote modal, available from every "Get a quote" and "Site assessment"
 * button on the site. Each opener passes its own `source` string, which rides
 * along with the enquiry so ZAN-F can see which page produced the lead.
 *
 * `children` is passed through untouched, so wrapping the app in this provider
 * does not turn the page into a client component.
 */
export function QuoteProvider({ children }: { children: ReactNode }) {
  const [source, setSource] = useState<string | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)

  const open = useCallback((s = 'Get a quote') => {
    openerRef.current = document.activeElement as HTMLElement
    setSource(s)
  }, [])

  const close = useCallback(() => {
    setSource(null)
    openerRef.current?.focus()
  }, [])

  useEffect(() => {
    if (source === null) return

    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return

      // Keep tabbing inside the dialog while it is open.
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    // Not just `input` — the first one in the form is the hidden `source`
    // field, and focusing it silently does nothing.
    panelRef.current
      ?.querySelector<HTMLElement>(
        'input:not([type="hidden"]), select, textarea'
      )
      ?.focus()

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [source, close])

  return (
    <Ctx.Provider value={{ open, close }}>
      {children}

      {source !== null && (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center overflow-y-auto bg-[rgb(14_21_18/0.6)] p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close()
          }}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-title"
            className="rise relative w-full max-w-2xl rounded-t-[12px] border border-steel-200 bg-air sm:rounded-[12px]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-steel-200 p-6 sm:p-8">
              <div>
                <p className="eyebrow">// Site assessment &amp; quotation</p>
                <h2 id="quote-title" className="display mt-3 text-2xl">
                  Tell us about the set
                </h2>
                <GradientRule width="w-14" className="mt-4" />
                <p className="mt-4 text-sm">
                  Rating, location and what you need. An engineer replies with
                  what the job actually involves — or call{' '}
                  <a
                    href={`tel:${contact.phoneHref}`}
                    className="figure underline underline-offset-4"
                  >
                    {contact.phoneDisplay}
                  </a>
                  .
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-steel-200 text-ink transition-colors hover:border-[var(--emission-600)]"
              >
                <X size={16} strokeWidth={1.75} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <EnquiryForm variant="compact" source={source} />
            </div>
          </div>
        </div>
      )}
    </Ctx.Provider>
  )
}

/** Opens the modal. Styled to match Button's variants. */
export function QuoteButton({
  children,
  source,
  variant = 'solid',
  className = '',
}: {
  children: ReactNode
  source: string
  variant?: 'solid' | 'outline' | 'ghost' | 'bare'
  className?: string
}) {
  const { open } = useQuote()

  const styles = {
    solid:
      'bg-[var(--emission-600)] text-white hover:bg-[var(--emission-700)] px-6 py-3.5 rounded-[4px]',
    outline:
      'border border-hairline-strong text-ink hover:border-[var(--emission-600)] px-6 py-3.5 rounded-[4px]',
    ghost:
      'border border-hairline-dark-strong text-air-ink hover:border-[var(--emission-300)] px-6 py-3.5 rounded-[4px]',
    bare: '',
  } as const

  return (
    <button
      type="button"
      onClick={(e) => {
        // Safari does not focus a button on click, and neither does a
        // programmatic click. Focusing it here means the provider always has a
        // real element to return focus to when the dialog closes.
        e.currentTarget.focus()
        open(source)
      }}
      className={`inline-flex items-center justify-center gap-2 text-sm font-medium leading-none transition-colors duration-200 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
