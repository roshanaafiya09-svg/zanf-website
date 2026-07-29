'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

type Theme = 'light' | 'dark'

/**
 * Reads the theme the inline script in app/layout.tsx already stamped on
 * <html>, so this never fights the pre-paint value.
 */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme')
    setTheme(current === 'light' ? 'light' : 'dark')
  }, [])

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Private browsing with storage blocked — the toggle still works for
      // this page view, it just will not persist.
    }
    setTheme(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        theme === null
          ? 'Switch theme'
          : `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`
      }
      className={`grid h-9 w-9 place-items-center rounded-[2px] border border-hairline text-mid transition-colors duration-200 hover:border-accent hover:text-hi ${className}`}
    >
      {theme === 'light' ? (
        <Moon size={16} strokeWidth={1.5} />
      ) : (
        <Sun size={16} strokeWidth={1.5} />
      )}
    </button>
  )
}
