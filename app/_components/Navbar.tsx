'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef, useCallback } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/people', label: 'People' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Close on outside click
  useEffect(() => {
    if (!mobileOpen) return
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [mobileOpen])

  return (
    <nav className="bg-canvas sticky top-0 z-50 border-b border-hairline">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3 text-decoration-none">
          <img
            src="/ST_logo_2024_blue.jpg"
            alt="STMicroelectronics"
            className="object-contain"
            style={{ height: '1.5rem' }}
          />
          <span className="text-sm font-bold uppercase tracking-[1.5px] text-on-dark">
            TechBlazers
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink key={link.href} link={link} pathname={pathname} />
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span className={`block h-px w-6 bg-muted transition-transform duration-200 ${mobileOpen ? 'translate-y-[3.5px] rotate-45' : ''}`} />
          <span className={`block h-px w-6 bg-muted transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-6 bg-muted transition-transform duration-200 ${mobileOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile nav dropdown */}
      <div
        ref={menuRef}
        className="overflow-hidden border-t border-hairline md:hidden transition-[max-height,opacity] duration-300 ease-in-out"
        style={{
          maxHeight: mobileOpen ? '240px' : '0',
          opacity: mobileOpen ? 1 : 0,
        }}
      >
        <div className="px-4 pb-4 sm:px-6">
          <div className="m-stripe-divider mb-4" />
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block text-sm tracking-[1.5px] uppercase transition-colors ${
                    pathname === link.href
                      ? 'font-bold text-on-dark'
                      : 'text-muted hover:text-on-dark'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

/* ── Individual nav link with directional underline ── */
function NavLink({ link, pathname }: { link: { href: string; label: string }; pathname: string }) {
  const isActive = pathname === link.href
  const liRef = useRef<HTMLLIElement>(null)
  const underlineRef = useRef<HTMLSpanElement>(null)
  const [originX, setOriginX] = useState<'left' | 'right'>('left')

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    if (!liRef.current) return
    const rect = liRef.current.getBoundingClientRect()
    const mouseX = e.clientX
    // Determine if cursor entered from left or right half of the link
    setOriginX(mouseX < rect.left + rect.width / 2 ? 'left' : 'right')
  }, [])

  return (
    <li
      ref={liRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
    >
      <Link
        href={link.href}
        className={`text-sm tracking-[0.5px] transition-colors duration-200 ${
          isActive
            ? 'font-bold text-on-dark'
            : 'text-muted hover:text-on-dark'
        }`}
      >
        {link.label}
      </Link>
      {/* Animated underline */}
      <span
        ref={underlineRef}
        className="nav-underline"
        data-active={isActive}
        data-origin={originX}
      />
    </li>
  )
}
