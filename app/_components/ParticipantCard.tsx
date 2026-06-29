'use client'

import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useTilt } from '../_hooks/useTilt'
import type { Participant } from '../_lib/types'
import { getProfilePictureUrl, getInitials, getGlowClass, getTextClass, getIndustryLabel } from '../_lib/helpers'
import dynamic from 'next/dynamic'
const FrameworkIcons = dynamic(() => import('./FrameworkIcons'), { ssr: false })

interface ParticipantCardProps {
  participant: Participant
  onClick: () => void
  index?: number
}

export default function ParticipantCard({ participant, onClick, index = 0 }: ParticipantCardProps) {
  const { cardRef, style, handlers } = useTilt(7)

  return (
    <motion.div
      ref={cardRef}
      className={`m-card card-lift flex h-full cursor-pointer flex-col justify-between p-6 ${getGlowClass(participant.industry)}`}
      onClick={onClick}
      style={{ '--stagger-i': index, ...style } as React.CSSProperties}
      {...handlers}
    >
      {/* Profile Avatar */}
      <div className="mb-4">
        {participant.profilePicture ? (
          <img
            src={getProfilePictureUrl(participant.profilePicture)}
            alt={participant.name}
            className="border border-hairline object-cover avatar-reveal"
            style={{ width: 72, height: 72 }}
          />
        ) : (
          <div
            className="flex items-center justify-center border border-hairline font-bold text-on-dark"
            style={{
              backgroundColor: 'var(--color-surface-soft)',
              width: 72,
              height: 72,
              fontSize: '1.25rem',
            }}
          >
            {getInitials(participant.name)}
          </div>
        )}
      </div>

      {/* Name */}
      <h2 className="mb-1 text-lg font-bold uppercase tracking-tight text-on-dark">
        {participant.name}
      </h2>

      {/* Industry Badge */}
      <span className={`mb-3 block text-xs font-bold uppercase tracking-[1.5px] sm:text-sm ${getTextClass(participant.industry)}`}>
        {getIndustryLabel(participant.industry)}
      </span>

      {/* Description */}
      <p
        className="mb-4 text-xs text-body text-truncate-3 sm:text-sm"
        style={{ lineHeight: 1.5, minHeight: '4.5em' }}
      >
        {participant.description}
      </p>

      {/* Framework Icons */}
      <div className="mb-4">
        <FrameworkIcons skills={participant.skills} description={participant.description} />
      </div>

      {/* Social Links */}
      <div className="mb-4 flex items-center gap-3">
        {participant.github && (
          <a
            href={participant.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sm-m btn-outline-m inline-flex items-center gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <FaGithub className="inline" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        )}
        {participant.linkedin && (
          <a
            href={participant.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sm-m btn-outline-m inline-flex items-center gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <FaLinkedin className="inline" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
        )}
      </div>

      {/* Skills */}
      <div className="mt-auto border-t border-hairline pt-4">
        <p className="mb-0 text-xs text-muted">
          {participant.skills.join(' \u00B7 ')}
        </p>
      </div>
    </motion.div>
  )
}
