'use client'

import { useEffect } from 'react'

export default function HomeAnimations() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    const targets = document.querySelectorAll(
      '.anim-fade-up, .anim-fade-in, .anim-scale-up, .anim-slide-left, .anim-slide-right, .anim-stagger, .hero-logo-draw, .m-stripe-svg'
    )
    targets.forEach((t) => observer.observe(t))

    return () => observer.disconnect()
  }, [])

  return null
}
