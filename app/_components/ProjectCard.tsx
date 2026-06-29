'use client'

import { ExternalLink } from 'lucide-react'
import { FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useTilt } from '../_hooks/useTilt'
import type { Project } from '../_lib/types'
import dynamic from 'next/dynamic'
const FrameworkIcons = dynamic(() => import('./FrameworkIcons'), { ssr: false })

interface ProjectCardProps {
  project: Project
  onClick: () => void
  index?: number
}

export default function ProjectCard({ project, onClick, index = 0 }: ProjectCardProps) {
  const hasMedia = project.media && project.media.length > 0
  const firstMedia = hasMedia ? project.media![0] : null
  const { cardRef, style, handlers } = useTilt(7)

  return (
    <motion.div
      ref={cardRef}
      className={`m-card card-lift flex h-full cursor-pointer flex-col justify-between p-6 ${
        project.category.includes('IT') ? 'glow-cyan' : 'glow-gold'
      }`}
      onClick={onClick}
      style={{ '--stagger-i': index, ...style } as React.CSSProperties}
      {...handlers}
    >
      {/* Category Header */}
      <div className="mb-4">
        <span
          className={`text-xs font-bold uppercase tracking-[1.5px] sm:text-sm ${
            project.category.includes('IT') ? 'text-cyan' : 'text-gold'
          }`}
        >
          {project.category}
        </span>
      </div>

      {/* Media Preview */}
      {firstMedia && (
        <div className="mb-4 overflow-hidden border border-hairline" style={{ aspectRatio: '16/9' }}>
          {firstMedia.type === 'youtube' ? (
            <div className="flex h-full w-full items-center justify-center bg-surface-soft">
              <FaYoutube className="text-muted" />
            </div>
          ) : firstMedia.type === 'linkedin' ? (
            <div className="flex h-full w-full items-center justify-center bg-surface-soft">
              <FaLinkedin className="text-muted" />
            </div>
          ) : (
            <img
              src={firstMedia.url}
              alt={firstMedia.caption || project.title}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      )}

      {/* Title */}
      <h2 className="mb-3 text-lg font-bold uppercase tracking-tight text-on-dark sm:text-xl">
        {project.title}
      </h2>

      {/* Description */}
      <p
        className="mb-4 text-xs text-body text-truncate-3 sm:text-sm"
        style={{ lineHeight: 1.5, minHeight: '4.5em' }}
      >
        {project.description}
      </p>

      {/* Framework Icons */}
      <div className="mb-4">
        <FrameworkIcons skills={project.skills} description={project.description} tags={project.tags} />
      </div>

      {/* External Links */}
      <div className="mb-4 flex items-center gap-3">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-on-dark"
            onClick={(e) => e.stopPropagation()}
          >
            <FaGithub className="inline" />
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-on-dark"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={16} />
          </a>
        )}
        {project.media?.filter((m) => m.type === 'youtube').slice(0, 1).map((m, i) => (
          <a
            key={i}
            href={m.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-on-dark"
            onClick={(e) => e.stopPropagation()}
          >
            <FaYoutube className="inline" />
          </a>
        ))}
      </div>

      {/* Skills */}
      <div className="mt-auto border-t border-hairline pt-4">
        <p className="mb-0 text-xs text-muted">
          {project.skills.join(' \u00B7 ')}
        </p>
      </div>
    </motion.div>
  )
}
