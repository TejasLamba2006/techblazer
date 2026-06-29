import Link from 'next/link'
import dynamic from 'next/dynamic'
import { participants, projects } from './_lib/data'
import { shuffleArray } from './_lib/helpers'
import type { Participant, Project } from './_lib/types'
import HomeAnimations from './_components/HomeAnimations'
import FeaturedSections from './_components/FeaturedSections'
import StatsSection from './_components/StatsSection'

const HeroWebGL = dynamic(() => import('./_components/HeroWebGL'), { ssr: false })
const TagSphere = dynamic(() => import('./_components/TagSphere'), { ssr: false })

const totalProjects = projects.length
const totalParticipants = participants.length

const uniqueSkills = Array.from(
  new Set([
    ...projects.flatMap((p) => p.skills || []),
    ...participants.flatMap((p) => p.skills || []),
  ]),
)

// The two domain blocks below already enumerate what we'd call "core stack" —
// reuse that instead of inventing a second list that can drift out of sync.
const itCoreSkills = ['Python', 'Machine Learning', 'NLP', 'MongoDB', 'Web Dev', 'Flutter']
const embeddedCoreSkills = ['C/C++', 'STM32CubeIDE', 'Firmware', 'ROS2', 'Sensors', 'IMU Calib']
const coreSkills = [...itCoreSkills, ...embeddedCoreSkills]

const featuredProjects = shuffleArray(projects).slice(0, 6) as Project[]
const featuredParticipants = shuffleArray(participants).slice(0, 6) as Participant[]

function MStripeSvg() {
  return (
    <svg
      className="m-stripe-svg block w-full"
      viewBox="0 0 1440 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      style={{ height: 12 }}
    >
      <path
        d="M0 2h1440"
        stroke="var(--color-stripe-blue-light)"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ strokeDasharray: 1440, strokeDashoffset: 1440 }}
      />
      <path
        d="M0 6h1440"
        stroke="var(--color-stripe-blue-dark)"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ strokeDasharray: 1440, strokeDashoffset: 1440 }}
      />
      <path
        d="M0 10h1440"
        stroke="var(--color-stripe-red)"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ strokeDasharray: 1440, strokeDashoffset: 1440 }}
      />
    </svg>
  )
}

function HeroCircuitSvg() {
  return (
    <svg
      className="hero-logo-draw pointer-events-none absolute right-0 top-0 opacity-[0.07] sm:opacity-[0.05]"
      width="600"
      height="400"
      viewBox="0 0 600 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M50 200h120l30-60h80l20 60h100"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ strokeDasharray: 600, strokeDashoffset: 600 }}
      />
      <path
        d="M50 220h60l20-40h140l30 40h180"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ strokeDasharray: 700, strokeDashoffset: 700 }}
      />
      <path
        d="M100 100v60l40 40h80v-80l-40-40h-60"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ strokeDasharray: 500, strokeDashoffset: 500 }}
      />
      <path
        d="M300 80v120l60 40h80v-80l-60-40h-60"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ strokeDasharray: 600, strokeDashoffset: 600 }}
      />
      <path
        d="M200 300h100l30-50h90l20 50h60"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ strokeDasharray: 500, strokeDashoffset: 500 }}
      />
      <path
        d="M80 320h160l40-60h120l30 60h90"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ strokeDasharray: 700, strokeDashoffset: 700 }}
      />
      <path
        d="M420 140v80l-40 40h-80"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ strokeDasharray: 300, strokeDashoffset: 300 }}
      />
      <path
        d="M500 60v100l50 50"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ strokeDasharray: 250, strokeDashoffset: 250 }}
      />
      <circle
        cx="170"
        cy="200"
        r="4"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        style={{ strokeDasharray: 30, strokeDashoffset: 30 }}
      />
      <circle
        cx="300"
        cy="140"
        r="4"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        style={{ strokeDasharray: 30, strokeDashoffset: 30 }}
      />
      <circle
        cx="400"
        cy="200"
        r="4"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        style={{ strokeDasharray: 30, strokeDashoffset: 30 }}
      />
      <circle
        cx="250"
        cy="300"
        r="4"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        style={{ strokeDasharray: 30, strokeDashoffset: 30 }}
      />
      <circle
        cx="140"
        cy="100"
        r="3"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        style={{ strokeDasharray: 20, strokeDashoffset: 20 }}
      />
      <circle
        cx="480"
        cy="100"
        r="3"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        style={{ strokeDasharray: 20, strokeDashoffset: 20 }}
      />
      <circle
        cx="550"
        cy="200"
        r="5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        style={{ strokeDasharray: 35, strokeDashoffset: 35 }}
      />
      <circle
        cx="350"
        cy="320"
        r="3"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        style={{ strokeDasharray: 20, strokeDashoffset: 20 }}
      />
    </svg>
  )
}

function SectionUnderline() {
  return (
    <svg
      className="svg-draw mt-2"
      width="60"
      height="4"
      viewBox="0 0 60 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 2h60"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ strokeDasharray: 60, strokeDashoffset: 60 }}
      />
    </svg>
  )
}

export default function HomePage() {
  return (
    <div className="text-body">
      <HomeAnimations />

      {/* Hero Section
          Layer order matters here: HeroWebGL sits behind the circuit SVG.
          The SVG is the always-on, network-free, reduced-motion-safe base —
          it alone is a complete hero background. HeroWebGL is purely additive
          parallax on top of it, and is expected to no-op itself on mobile /
          reduced-motion (it's a dynamic, ssr:false import either way, so
          there's no hydration cost if it renders nothing). */}
      <section className="hero-section relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 md:py-24">
        <HeroWebGL />
        <HeroCircuitSvg />

        <div className="relative z-1 mx-auto max-w-[1440px]">
          <div className="mb-4 flex items-center gap-3 sm:mb-6 anim-fade-up">
            <img
              src="/ST_logo_2024_blue.jpg"
              alt="STMicroelectronics"
              className="object-contain"
              style={{ height: '1.5rem' }}
            />
            <span className="text-xs font-bold uppercase tracking-[1.5px] text-muted sm:text-sm">
              TechBlazers Program
            </span>
          </div>

          <h1 className="mb-4 text-3xl font-bold uppercase tracking-tight text-on-dark anim-fade-up sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            TechBlazers
          </h1>

          <p className="mb-6 max-w-[560px] text-base font-light text-body sm:mb-8 sm:text-lg anim-fade-up">
            The internship program at STMicroelectronics where engineers build intelligent software
            platforms and high-precision embedded systems.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4 anim-fade-up">
            <Link href="/projects" className="btn-primary-m">
              Explore Projects
            </Link>
            <Link href="/people" className="btn-outline-m">
              Meet the Team
            </Link>
          </div>
        </div>
      </section>

      {/* M-stripe SVG draw divider */}
      <div className="px-4 sm:px-6">
        <MStripeSvg />
      </div>

      {/* Stats Grid */}
      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 md:py-24">
        <div className="anim-stagger">
          <StatsSection
            totalProjects={totalProjects}
            totalParticipants={totalParticipants}
            uniqueSkillCount={uniqueSkills.length}
          />
        </div>
      </section>

      {/* Engineering Domains */}
      <section className="mx-auto max-w-[1440px] px-4 pb-12 sm:px-6 sm:pb-16 md:pb-24">
        <div className="mb-6 sm:mb-8">
          <h2 className="mb-0 text-2xl font-bold uppercase tracking-tight text-on-dark anim-fade-up sm:text-3xl md:text-4xl">
            Engineering Domains
          </h2>
          <SectionUnderline />
        </div>

        <div className="anim-stagger grid grid-cols-1 gap-px md:grid-cols-2">
          {[
            {
              tag: 'IT Infrastructure',
              title: 'Information Technology',
              desc: 'Building digital backbones, cognitive applications, and automated screening frameworks. From NLP-driven models to responsive web applications and secure databases.',
              skills: itCoreSkills,
              color: 'cyan',
              href: '/projects',
            },
            {
              tag: 'Cyber-Physical Systems',
              title: 'Embedded Systems',
              desc: 'Developing high-precision mechanical intelligence and real-time firmware execution. Our hardware division works on microcontrollers, sensor-fusion loops, and custom servo controls.',
              skills: embeddedCoreSkills,
              color: 'gold',
              href: '/projects',
            },
          ].map((domain) => (
            <div key={domain.title} className="bg-surface-card p-6 sm:p-8">
              <span
                className={`badge-m mb-4 inline-block ${domain.color === 'cyan' ? 'text-cyan' : 'text-gold'}`}
              >
                {domain.tag}
              </span>
              <h3 className="mb-4 text-xl font-bold uppercase tracking-tight text-on-dark sm:text-2xl">
                {domain.title}
              </h3>
              <p className="mb-6 text-sm font-light text-body leading-relaxed sm:text-base">
                {domain.desc}
              </p>
              <div className="mb-6">
                <div className="mb-2 text-xs font-bold uppercase tracking-[1.5px] text-muted sm:text-sm">
                  Key Technologies
                </div>
                <div className="flex flex-wrap gap-2">
                  {domain.skills.map((skill) => (
                    <span key={skill} className="tech-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href={domain.href}
                className="text-xs font-bold uppercase tracking-[1.5px] text-on-dark text-decoration-none sm:text-sm"
              >
                View Projects &rarr;
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* M-stripe SVG draw divider */}
      <div className="px-4 sm:px-6">
        <MStripeSvg />
      </div>

      {/* Featured Projects & Team — client-wired with modals */}
      <FeaturedSections
        featuredProjects={featuredProjects}
        featuredParticipants={featuredParticipants}
      />

      {/* Tech Spectrum — 3D sphere + flat list.
          coreSkills feeds TagSphere's gold/blue split so color carries real
          meaning (our actual stack) instead of alternating by array index. */}
      <div className="bg-surface-soft border-t border-hairline border-b border-hairline">
        <TagSphere tags={uniqueSkills} coreTags={coreSkills} />
      </div>
    </div>
  )
}
