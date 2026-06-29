'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useModalDetails } from '../_hooks/useModalDetails'
import { useTilt } from '../_hooks/useTilt'
import DetailModal from './DetailModal'
import dynamic from 'next/dynamic'
const FrameworkIcons = dynamic(() => import('./FrameworkIcons'), { ssr: false })
import { getProfilePictureUrl, getInitials, getGlowClass, getTextClass, getIndustryLabel } from '../_lib/helpers'
import type { Participant, Project } from '../_lib/types'

interface FeaturedSectionsProps {
  featuredProjects: Project[]
  featuredParticipants: Participant[]
}

function TiltCard({
  children,
  glowClass,
  onClick,
}: {
  children: React.ReactNode
  glowClass: string
  onClick: () => void
}) {
  const { cardRef, style, handlers } = useTilt(6)
  return (
    <motion.div
      ref={cardRef}
      className={`m-card card-lift p-6 w-[280px] sm:w-[340px] md:w-[400px] flex-shrink-0 cursor-pointer ${glowClass}`}
      onClick={onClick}
      style={style as React.CSSProperties}
      {...handlers}
    >
      {children}
    </motion.div>
  )
}

export default function FeaturedSections({
  featuredProjects,
  featuredParticipants,
}: FeaturedSectionsProps) {
  const {
    activeModalType,
    activeItem,
    showParticipantDetails,
    showProjectDetails,
    closeDetails,
  } = useModalDetails()

  return (
    <>
      {/* Featured Projects — marquee */}
      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 md:py-24">
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-bold uppercase tracking-tight text-on-dark anim-fade-up sm:text-3xl md:text-4xl">
              Featured Projects
            </h2>
            <p className="text-sm font-light text-body anim-fade-up sm:text-base">
              Flagship projects built during our program.
            </p>
          </div>
          <Link
            href="/projects"
            className="text-xs font-bold uppercase tracking-[1.5px] text-on-dark text-decoration-none sm:text-sm"
          >
            View All &rarr;
          </Link>
        </div>

        <div className="marquee-container anim-fade-up">
          <div className="marquee-track tilt-container">
            {[...featuredProjects, ...featuredProjects].map((project, index) => (
              <TiltCard
                key={index}
                glowClass={project.category.includes('IT') ? 'glow-cyan' : 'glow-gold'}
                onClick={() => showProjectDetails(project)}
              >
                <span
                  className={`mb-4 inline-block text-xs font-bold uppercase tracking-[1.5px] sm:text-sm ${
                    project.category.includes('IT') ? 'text-cyan' : 'text-gold'
                  }`}
                >
                  {project.category}
                </span>
                <h4 className="mb-3 text-base font-bold uppercase tracking-tight text-on-dark sm:text-lg">
                  {project.title}
                </h4>
                <p className="mb-4 text-xs font-light text-body leading-relaxed text-truncate-3 sm:text-sm">
                  {project.description ||
                    'This innovative project explores key technical challenges in software or embedded engineering.'}
                </p>
                <div className="flex flex-wrap gap-1">
                  {(project.skills ? project.skills.slice(0, 3) : []).map((skill) => (
                    <span key={skill} className="skill-chip">{skill}</span>
                  ))}
                </div>
                <div className="mt-3">
                  <FrameworkIcons
                    skills={project.skills}
                    description={project.description}
                    tags={project.tags}
                  />
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Team — marquee */}
      <section className="mx-auto max-w-[1440px] px-4 pb-12 sm:px-6 sm:pb-16 md:pb-24">
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-bold uppercase tracking-tight text-on-dark anim-fade-up sm:text-3xl md:text-4xl">
              TechBlazers Team
            </h2>
            <p className="text-sm font-light text-body anim-fade-up sm:text-base">
              The engineers bringing these concepts to life.
            </p>
          </div>
          <Link
            href="/people"
            className="text-xs font-bold uppercase tracking-[1.5px] text-on-dark text-decoration-none sm:text-sm"
          >
            Meet Everyone &rarr;
          </Link>
        </div>

        <div className="marquee-container anim-fade-up">
          <div className="marquee-track tilt-container">
            {[...featuredParticipants, ...featuredParticipants].map((p, index) => (
              <TiltCard
                key={index}
                glowClass={getGlowClass(p.industry)}
                onClick={() => showParticipantDetails(p)}
              >
                <div className="mb-4">
                  {p.profilePicture ? (
                    <img
                      src={getProfilePictureUrl(p.profilePicture)}
                      alt={p.name}
                      className="border border-hairline object-cover avatar-reveal"
                      style={{ width: 56, height: 56 }}
                    />
                  ) : (
                    <div
                      className="flex items-center justify-center border border-hairline font-bold text-on-dark"
                      style={{
                        backgroundColor: 'var(--color-surface-soft)',
                        width: 56,
                        height: 56,
                        fontSize: '1rem',
                      }}
                    >
                      {getInitials(p.name)}
                    </div>
                  )}
                </div>
                <h4 className="mb-1 text-base font-bold uppercase tracking-tight text-on-dark sm:text-lg">{p.name}</h4>
                <span
                  className={`mb-3 inline-block text-xs font-bold uppercase tracking-[1.5px] sm:text-sm ${getTextClass(p.industry)}`}
                >
                  {getIndustryLabel(p.industry)}
                </span>
                <p className="mb-4 text-xs font-light text-body leading-relaxed sm:text-sm">{p.description}</p>
                <div className="flex flex-wrap gap-1">
                  {p.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="skill-chip">{skill}</span>
                  ))}
                </div>
                <div className="mt-3">
                  <FrameworkIcons skills={p.skills} description={p.description} />
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <DetailModal
        activeModalType={activeModalType}
        activeItem={activeItem}
        onClose={closeDetails}
        onShowPerson={showParticipantDetails}
        onShowProject={showProjectDetails}
      />
    </>
  )
}
