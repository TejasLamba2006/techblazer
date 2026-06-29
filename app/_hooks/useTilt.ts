'use client'

import { useCallback, useRef } from 'react'
import { useMotionValue, useSpring, type MotionStyle } from 'framer-motion'

const SPRING_CONFIG = { stiffness: 150, damping: 15, mass: 0.1 }

function usePrefersReducedMotion() {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useTilt(maxDeg = 8) {
  const reduced = usePrefersReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)

  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)
  const rotateX = useSpring(rawRotateX, SPRING_CONFIG)
  const rotateY = useSpring(rawRotateY, SPRING_CONFIG)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced) return
      const card = cardRef.current
      if (!card) return

      const rect = card.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY

      // Normalize to -1..1 then scale to maxDeg
      const rotateXVal = (-mouseY / (rect.height / 2)) * maxDeg
      const rotateYVal = (mouseX / (rect.width / 2)) * maxDeg

      rawRotateX.set(rotateXVal)
      rawRotateY.set(rotateYVal)
    },
    [reduced, maxDeg, rawRotateX, rawRotateY]
  )

  const handleMouseLeave = useCallback(() => {
    rawRotateX.set(0)
    rawRotateY.set(0)
  }, [rawRotateX, rawRotateY])

  const style: MotionStyle = reduced
    ? {}
    : {
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d' as const,
      }

  return {
    cardRef,
    style,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  }
}
