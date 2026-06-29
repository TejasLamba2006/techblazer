'use client'

import { useState, useEffect, type FormEvent } from 'react'
import { usePathname } from 'next/navigation'
import Navbar from './_components/Navbar'
import Footer from './_components/Footer'

const PASSWORD_KEY = 'tb_site_auth'
const CORRECT_PASSWORD = 'techblazers'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [passwordInput, setPasswordInput] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const storedAuth = localStorage.getItem(PASSWORD_KEY)
    if (storedAuth === 'true') {
      setIsAuthenticated(true)
    }
    setMounted(true)
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    if (passwordInput === CORRECT_PASSWORD) {
      localStorage.setItem(PASSWORD_KEY, 'true')
      setIsAuthenticated(true)
      setShowError(false)
    } else {
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 450)
    }
  }

  if (!mounted) {
    return (
      <div className="flex min-h-screen flex-col bg-canvas" />
    )
  }

  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 page-enter" key={pathname}>{children}</main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-4">
      <div
        className={`login-card relative z-2 p-6 text-center sm:p-8 ${
          showError ? 'shake-animation' : ''
        }`}
      >
        {/* Logo & Branding */}
        <div className="mb-6">
          <img
            src="/ST_logo_2024_blue.jpg"
            alt="STMicroelectronics"
            className="mx-auto mb-4 object-contain"
            style={{ height: '3rem' }}
          />
          <h1 className="mb-2 text-2xl font-bold uppercase tracking-tight text-on-dark sm:text-3xl">
            TechBlazers Portal
          </h1>
          <p className="mb-0 text-sm text-muted">
            Enter the access password to enter the hub.
          </p>
        </div>

        {/* Password Input Form */}
        <form onSubmit={handleLogin} className="mt-4">
          <div className="relative mb-3">
            <input
              type={showPassword ? 'text' : 'password'}
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="login-input w-full text-center"
              style={{ padding: '12px 48px 12px 16px' }}
              placeholder="Password"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 border-0 bg-transparent p-0 text-muted hover:text-on-dark"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474L2.234 4.317a.73.73 0 0 1 .187-.026h.111l.088.007a5.5 5.5 0 0 0 7.778 7.778q.008.08.007.163v.111a.7.7 0 0 1-.038.167M4.17 9.057a2.5 2.5 0 0 0 3.486 3.486z" />
                  <path d="M12.454 12.454A8.5 8.5 0 0 0 8 2.5a8.5 8.5 0 0 0-4.454 1.258L1.832 1.482A9 9 0 0 1 8 1a9 9 0 0 1 9 9 9 9 0 0 1-4.546 3.454z" />
                </svg>
              )}
            </button>
          </div>

          {/* Error message */}
          <div className="mb-3" style={{ minHeight: 20 }}>
            {showError && (
              <span className="text-sm font-semibold text-red-500">
                Incorrect password. Please try again.
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-primary-m w-full"
          >
            Enter Hub
          </button>
        </form>
      </div>
    </div>
  )
}
