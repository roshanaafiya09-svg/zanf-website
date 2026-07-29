'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { nav, notifications, site } from '@/content/site'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close everything on navigation, and lock the body while the panel is open.
  useEffect(() => {
    setMenuOpen(false)
    setNotifOpen(false)
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
        setNotifOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'border-b border-hairline bg-[var(--scrim)] backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-[-0.03em] text-hi"
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
              className={`text-sm transition-colors duration-200 hover:text-hi ${
                pathname === item.href ? 'text-hi' : 'text-mid'
              }`}
            >
              {item.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setNotifOpen(true)}
            onMouseLeave={() => setNotifOpen(false)}
          >
            <button
              type="button"
              onClick={() => setNotifOpen((v) => !v)}
              aria-expanded={notifOpen}
              aria-haspopup="true"
              className="flex items-center gap-1.5 text-sm text-mid transition-colors duration-200 hover:text-hi"
            >
              Government Notification
              <ChevronDown
                size={14}
                strokeWidth={1.5}
                className={`transition-transform duration-200 ${
                  notifOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {notifOpen && (
              <div className="absolute right-0 top-full w-80 pt-3">
                <div className="overflow-hidden border border-hairline bg-surface-1 p-1.5">
                  {notifications.map((n) => (
                    <a
                      key={n.href}
                      href={n.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start justify-between gap-3 px-3 py-2.5 transition-colors duration-200 hover:bg-surface-2"
                    >
                      <span>
                        <span className="block text-sm text-hi">{n.label}</span>
                        <span className="eyebrow block">{n.scope}</span>
                      </span>
                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.5}
                        className="mt-0.5 shrink-0 text-lo"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Link
            href="/contact-us/"
            className="hidden rounded-[2px] bg-cta px-5 py-2.5 text-sm font-medium text-cta-ink transition-colors duration-200 hover:bg-accent hover:text-[#1a0f06] sm:inline-flex"
          >
            Get Started
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="grid h-9 w-9 place-items-center rounded-full border border-hairline text-hi lg:hidden"
          >
            {menuOpen ? (
              <X size={16} strokeWidth={1.5} />
            ) : (
              <Menu size={16} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-hairline bg-[var(--scrim)] backdrop-blur-xl lg:hidden">
          <div className="shell py-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block border-b border-hairline py-4 font-display text-2xl tracking-[-0.03em] text-hi"
              >
                {item.label}
              </Link>
            ))}

            <p className="eyebrow pt-7">Government Notification</p>
            <div className="pt-2">
              {notifications.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 border-b border-hairline py-3 text-sm text-mid"
                >
                  {n.label}
                  <ArrowUpRight size={14} strokeWidth={1.5} className="shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
