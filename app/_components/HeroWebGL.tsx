'use client'

import { useRef, useMemo, useCallback, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ─── PCB Trace Lines ─── */
function TraceLines() {
  const ref = useRef<THREE.LineSegments>(null)

  const geometry = useMemo(() => {
    const points: number[] = []
    const gridSize = 12
    const segCount = 60

    for (let i = 0; i < segCount; i++) {
      const isHoriz = Math.random() > 0.5
      const x = (Math.random() - 0.5) * gridSize
      const y = (Math.random() - 0.5) * gridSize
      const len = 0.5 + Math.random() * 2.5

      if (isHoriz) {
        points.push(x, y, 0, x + len, y, 0)
      } else {
        points.push(x, y, 0, x, y + len, 0)
      }
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
    return geo
  }, [])

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#1a3a5c" transparent opacity={0.35} />
    </lineSegments>
  )
}

/* ─── PCB Junction Nodes ─── */
function TraceNodes() {
  const ref = useRef<THREE.Points>(null)

  const geometry = useMemo(() => {
    const positions: number[] = []
    const gridSize = 10
    const nodeCount = 35

    for (let i = 0; i < nodeCount; i++) {
      positions.push(
        (Math.random() - 0.5) * gridSize,
        (Math.random() - 0.5) * gridSize,
        0
      )
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return geo
  }, [])

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial color="#4da3ff" size={0.06} transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

/* ─── Pulsing Highlight Node ─── */
function PulseNode() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    const scale = 0.8 + Math.sin(t * 1.5) * 0.3
    ref.current.scale.setScalar(scale)
    ;(ref.current.material as THREE.MeshBasicMaterial).opacity = 0.15 + Math.sin(t * 1.5) * 0.1
  })

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <circleGeometry args={[0.2, 32]} />
      <meshBasicMaterial color="#4da3ff" transparent opacity={0.15} />
    </mesh>
  )
}

/* ─── Mouse Parallax ─── */
function MouseParallax({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null)
  const { viewport } = useThree()

  const mouse = useRef({ x: 0, y: 0 })

  const handlePointerMove = useCallback((e: PointerEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
    mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
  }, [])

  useMemo(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('pointermove', handlePointerMove)
      return () => window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [handlePointerMove])

  useFrame(() => {
    if (!groupRef.current) return
    const targetX = mouse.current.x * 0.15
    const targetY = mouse.current.y * 0.15
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05
  })

  return <group ref={groupRef}>{children}</group>
}

/* ─── Main Export ─── */
export default function HeroWebGL() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    setIsMobile(window.innerWidth < 768)
  }, [])

  if (reducedMotion || isMobile) return null

  return (
    <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: 0.6 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true, antialias: false }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <MouseParallax>
          <TraceLines />
          <TraceNodes />
          <PulseNode />
        </MouseParallax>
      </Canvas>
    </div>
  )
}
