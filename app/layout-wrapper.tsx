'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Navbar from './_components/Navbar'
import Footer from './_components/Footer'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 page-enter" key={pathname}>{children}</main>
      <Footer />
    </div>
  )
}
