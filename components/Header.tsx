'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import Logo from './Logo'
import { QuoteButton } from './Quote'
import { contact, nav, type NavItem } from '@/content/site'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setOpenMenu(null)
    setMobileSection(null)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setOpenMenu(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const isActive = (item: NavItem) =>
    item.href === '/'
      ? pathname === '/'
      : pathname.startsWith(item.href.replace(/\/$/, ''))

  // A short close delay keeps the dropdown reachable across the gap between
  // the trigger and the panel.
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120)
  }
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-air/90 backdrop-blur-md transition-colors duration-200 ${
        scrolled || menuOpen ? 'border-steel-200' : 'border-transparent'
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Logo className="shrink-0" />

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {nav.map((item) =>
            item.children ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => {
                  cancelClose()
                  setOpenMenu(item.label)
                }}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenMenu(openMenu === item.label ? null : item.label)
                  }
                  aria-expanded={openMenu === item.label}
                  className={`flex items-center gap-1.5 rounded-[4px] px-3 py-2 text-sm transition-colors duration-200 hover:text-ink ${
                    isActive(item) ? 'text-ink' : 'text-ink-600'
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className={`transition-transform duration-200 ${
                      openMenu === item.label ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openMenu === item.label && (
                  <div className="absolute left-1/2 top-full w-[22rem] -translate-x-1/2 pt-3">
                    <div className="overflow-hidden rounded-[8px] border border-steel-200 bg-white p-1.5 shadow-[0_12px_32px_-12px_rgb(16_32_26/0.18)]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-[6px] px-3.5 py-3 transition-colors duration-200 hover:bg-steel-100"
                        >
                          <span className="block text-sm font-medium text-ink">
                            {child.label}
                          </span>
                          <span className="mono mt-0.5 block text-[0.6875rem] uppercase tracking-[0.1em] text-ink-400">
                            {child.note}
                          </span>
                        </Link>
                      ))}
                      <Link
                        href={item.href}
                        className="block rounded-[6px] px-3.5 py-2.5 text-sm text-[var(--emission-700)] transition-colors duration-200 hover:bg-steel-100"
                      >
                        All {item.label.toLowerCase()} →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
                className={`rounded-[4px] px-3 py-2 text-sm transition-colors duration-200 hover:text-ink ${
                  isActive(item) ? 'text-ink' : 'text-ink-600'
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${contact.phoneHref}`}
            className="mono hidden items-center gap-2 rounded-[4px] border border-steel-200 px-3.5 py-2.5 text-[0.8125rem] text-ink transition-colors hover:border-[var(--emission-600)] xl:inline-flex"
          >
            <Phone size={13} strokeWidth={1.75} aria-hidden="true" />
            {contact.phoneDisplay}
          </a>

          <QuoteButton source="Header — Get a quote" className="hidden sm:inline-flex">
            Get a quote
          </QuoteButton>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 place-items-center rounded-[4px] border border-steel-200 text-ink lg:hidden"
          >
            {menuOpen ? (
              <X size={17} strokeWidth={1.75} />
            ) : (
              <Menu size={17} strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-steel-200 bg-air lg:hidden">
          <div className="shell py-4">
            {nav.map((item) =>
              item.children ? (
                <div key={item.href} className="border-b border-steel-200">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileSection(
                        mobileSection === item.label ? null : item.label
                      )
                    }
                    aria-expanded={mobileSection === item.label}
                    className="flex w-full items-center justify-between py-4 text-left font-display text-xl tracking-[-0.03em] text-ink"
                  >
                    {item.label}
                    <ChevronDown
                      size={18}
                      strokeWidth={1.75}
                      aria-hidden="true"
                      className={`transition-transform duration-200 ${
                        mobileSection === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {mobileSection === item.label && (
                    <div className="pb-4">
                      <Link
                        href={item.href}
                        className="block py-2 text-sm text-[var(--emission-700)]"
                      >
                        All {item.label.toLowerCase()}
                      </Link>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-2 text-sm text-ink-600"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block border-b border-steel-200 py-4 font-display text-xl tracking-[-0.03em] text-ink"
                >
                  {item.label}
                </Link>
              )
            )}

            <div className="flex flex-col gap-3 pt-6">
              <QuoteButton source="Mobile menu — Get a quote">
                Get a quote
              </QuoteButton>
              <a
                href={`tel:${contact.phoneHref}`}
                className="mono inline-flex items-center justify-center gap-2 rounded-[4px] border border-steel-200 px-6 py-3.5 text-sm text-ink"
              >
                <Phone size={14} strokeWidth={1.75} aria-hidden="true" />
                {contact.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
