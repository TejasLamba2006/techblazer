'use client'

import { useEffect, useRef } from 'react'

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

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

    const targets = el.querySelectorAll(
      '.anim-fade-up, .anim-fade-in, .anim-scale-up, .anim-slide-left, .anim-slide-right, .anim-stagger'
    )
    targets.forEach((t) => observer.observe(t))

    // Also observe the container itself
    if (
      el.classList.contains('anim-fade-up') ||
      el.classList.contains('anim-fade-in') ||
      el.classList.contains('anim-scale-up') ||
      el.classList.contains('anim-slide-left') ||
      el.classList.contains('anim-slide-right') ||
      el.classList.contains('anim-stagger')
    ) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return ref
}
