'use client'

import { useEffect, useRef } from 'react'
import { useInView, useSpring, useMotionValue, motion } from 'framer-motion'

interface StatCounterProps {
  target: number
  label: string
  icon: React.ReactNode
}

function usePrefersReducedMotion() {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function StatCounter({ target, label, icon }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const reduced = usePrefersReducedMotion()

  const count = useMotionValue(reduced ? target : 0)
  const spring = useSpring(count, { stiffness: 80, damping: 20, mass: 0.8 })
  const displayRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (inView && !reduced) {
      count.set(target)
    }
  }, [inView, target, count, reduced])

  // Render the spring value into the DOM
  useEffect(() => {
    if (reduced) {
      if (displayRef.current) displayRef.current.textContent = String(target)
      return
    }
    const unsubscribe = spring.on('change', (latest) => {
      if (displayRef.current) {
        displayRef.current.textContent = String(Math.round(latest))
      }
    })
    return unsubscribe
  }, [spring, target, reduced])

  return (
    <div ref={ref} className="bg-surface-soft p-6 text-center sm:p-8">
      <div className="mb-3 flex justify-center text-muted sm:mb-4">{icon}</div>
      <motion.div
        className="mb-2 text-3xl font-bold text-on-dark sm:text-4xl"
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <span ref={displayRef}>{reduced ? target : 0}</span>
      </motion.div>
      <div className="text-xs font-bold uppercase tracking-[1.5px] text-muted sm:text-sm">{label}</div>
    </div>
  )
}
