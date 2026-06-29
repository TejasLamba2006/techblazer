'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'

interface TagSphereProps {
  tags: string[]
  /** Tags to highlight in gold — e.g. the core stack vs. everything else */
  coreTags?: string[]
}

const STEEL_BLUE = '#4da3ff'
const ST_GOLD = '#ffd200'
const DIM = '#7a7a7a'

/* ─── Single Tag on Sphere Surface ───
   Each label billboards to face the camera (Text from drei does this by default
   via `billboard`-less depth, but we want it explicit since the group rotates) */
function TagLabel({
  text,
  position,
  color,
  emphasis,
  onHover,
}: {
  text: string
  position: [number, number, number]
  color: string
  emphasis: boolean
  onHover: (hovered: boolean) => void
}) {
  const { camera } = useThree()
  const ref = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  // Billboard: face the camera every frame so text never reads as flipped/backwards
  // as the parent group rotates underneath it.
  useFrame(() => {
    if (ref.current) ref.current.quaternion.copy(camera.quaternion)
  })

  return (
    <group
      ref={ref}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        onHover(true)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setHovered(false)
        onHover(false)
      }}
    >
      <Text
        fontSize={emphasis ? 0.2 : 0.16}
        color={hovered ? '#ffffff' : color}
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        outlineWidth={hovered ? 0.012 : 0}
        outlineColor="#000000"
        material-toneMapped={false}
      >
        {text}
      </Text>
    </group>
  )
}

/* ─── Rotating Sphere of Tags ─── */
function SphereTags({
  tags,
  coreTags,
  reducedMotion,
  hovering,
}: {
  tags: string[]
  coreTags: Set<string>
  reducedMotion: boolean
  hovering: boolean
}) {
  const groupRef = useRef<THREE.Group>(null)

  // Fibonacci sphere distribution — even coverage, no clustering at poles.
  // Slight oblate squash applied to the final Y, not baked into the angle math,
  // so spacing stays even and only the silhouette flattens.
  const tagPositions = useMemo(() => {
    const radius = 2.3
    const count = tags.length
    const goldenAngle = Math.PI * (3 - Math.sqrt(5))

    return tags.map((tag, i) => {
      const y = 1 - (i / (count - 1)) * 2 // -1 to 1
      const radiusAtY = Math.sqrt(1 - y * y)
      const theta = goldenAngle * i

      const x = Math.cos(theta) * radiusAtY
      const z = Math.sin(theta) * radiusAtY

      return {
        text: tag,
        position: [x * radius, y * radius * 0.82, z * radius] as [number, number, number],
        emphasis: coreTags.has(tag),
        color: coreTags.has(tag) ? ST_GOLD : STEEL_BLUE,
      }
    })
  }, [tags, coreTags])

  // Auto-rotate, but ease toward a slower rate when a tag is hovered so the
  // text being read doesn't immediately swim away under the cursor.
  const speedRef = useRef(0.12)
  useFrame((_, delta) => {
    if (!groupRef.current || reducedMotion) return
    const target = hovering ? 0.02 : 0.12
    speedRef.current = THREE.MathUtils.damp(speedRef.current, target, 4, delta)
    groupRef.current.rotation.y += delta * speedRef.current
  })

  return (
    <group ref={groupRef}>
      {tagPositions.map((tp) => (
        <TagLabel
          key={tp.text}
          text={tp.text}
          position={tp.position}
          color={tp.color}
          emphasis={tp.emphasis}
          onHover={() => {}}
        />
      ))}
    </group>
  )
}

/* ─── Scene wrapper: owns shared hover state for the speed-damping above ─── */
function Scene({
  tags,
  coreTags,
  reducedMotion,
}: {
  tags: string[]
  coreTags: Set<string>
  reducedMotion: boolean
}) {
  const [hovering, setHovering] = useState(false)

  return (
    <group onPointerOver={() => setHovering(true)} onPointerOut={() => setHovering(false)}>
      <SphereTags
        tags={tags}
        coreTags={coreTags}
        reducedMotion={reducedMotion}
        hovering={hovering}
      />
    </group>
  )
}

/* ─── Main Export ─── */
export default function TagSphere({ tags, coreTags = [] }: TagSphereProps) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [canRender3D, setCanRender3D] = useState(false)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const widthQuery = window.matchMedia('(min-width: 768px)')

    const update = () => {
      setReducedMotion(motionQuery.matches)
      setCanRender3D(widthQuery.matches) // re-evaluates on rotate/resize, not just mount
    }
    update()

    motionQuery.addEventListener('change', update)
    widthQuery.addEventListener('change', update)
    return () => {
      motionQuery.removeEventListener('change', update)
      widthQuery.removeEventListener('change', update)
    }
  }, [])

  const topTags = useMemo(() => tags.slice(0, 40), [tags])
  const coreTagSet = useMemo(() => new Set(coreTags), [coreTags])

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 md:py-24">
      <h2 className="mb-2 text-2xl font-bold uppercase tracking-tight text-on-dark anim-fade-up sm:text-3xl md:text-4xl">
        Tech Spectrum
      </h2>
      <p className="mb-8 text-sm font-light text-body anim-fade-up sm:text-base">
        Technologies powering our projects. Drag to explore — gold marks our core stack.
      </p>

      {/* 3D Sphere — desktop only, hidden on mobile + reduced motion.
          Reserve the height up front so layout doesn't jump once the
          canvas mounts (which only happens after the effect above runs). */}
      <div className="anim-fade-up" style={{ height: 380 }}>
        {canRender3D && !reducedMotion ? (
          <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            gl={{ alpha: true, antialias: true }}
            dpr={[1, 1.5]} // capped below the usual [1,2] — 40 billboarded text meshes is not free
            style={{ background: 'transparent' }}
            frameloop="always"
          >
            <Scene tags={topTags} coreTags={coreTagSet} reducedMotion={reducedMotion} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={false}
              enableDamping
              dampingFactor={0.08}
              rotateSpeed={0.6}
            />
          </Canvas>
        ) : (
          // Static fallback so mobile/reduced-motion users still see *something*
          // here rather than an empty 380px gap.
          <div className="flex h-full flex-wrap items-center justify-center gap-2 px-4">
            {topTags.slice(0, 16).map((tag) => (
              <span
                key={tag}
                className="skill-chip"
                style={coreTagSet.has(tag) ? { borderColor: ST_GOLD, color: ST_GOLD } : undefined}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Flat tag list — always visible for SEO + accessibility, independent
          of whatever the canvas above is doing. */}
      <div className="flex flex-wrap gap-2 anim-fade-up">
        {tags.map((tag) => (
          <span key={tag} className="skill-chip">
            {tag}
          </span>
        ))}
      </div>
    </section>
  )
}
