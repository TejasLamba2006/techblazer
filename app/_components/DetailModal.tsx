'use client'

import { useEffect, useRef } from 'react'
import { ExternalLink, X } from 'lucide-react'
import { FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa'
import type { Participant, Project } from '../_lib/types'
import {
  getProfilePictureUrl,
  getInitials,
  getProjectsForParticipant,
  getParticipantsForProject,
  getYoutubeEmbedUrl,
  getTextClass,
  getIndustryLabel,
} from '../_lib/helpers'
import dynamic from 'next/dynamic'
const FrameworkIcons = dynamic(() => import('./FrameworkIcons'), { ssr: false })

interface DetailModalProps {
  activeModalType: 'person' | 'project' | null
  activeItem: Participant | Project | null
  onClose: () => void
  onShowPerson: (person: Participant) => void
  onShowProject: (project: Project) => void
}

export default function DetailModal({
  activeModalType,
  activeItem,
  onClose,
  onShowPerson,
  onShowProject,
}: DetailModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (activeModalType) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [activeModalType])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (activeModalType) {
      window.addEventListener('keydown', handleEsc)
      return () => window.removeEventListener('keydown', handleEsc)
    }
  }, [activeModalType, onClose])

  if (!activeModalType || !activeItem) return null

  const activeParticipant = activeModalType === 'person' ? (activeItem as Participant) : null
  const activeProject = activeModalType === 'project' ? (activeItem as Project) : null

  return (
    <div
      ref={overlayRef}
      className="detail-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {/* Person Detail Modal */}
      {activeModalType === 'person' && activeParticipant && (
        <div className="detail-modal-content p-4 text-start sm:p-6">
          <button className="btn-close-white" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>

          {/* M-stripe divider at top */}
          <div className="m-stripe-divider mb-6" />

          {/* Header */}
          <div className="mb-6 flex items-center gap-4">
            <div className="flex-shrink-0" style={{ width: 72, height: 72 }}>
              {activeParticipant.profilePicture ? (
                <img
                  src={getProfilePictureUrl(activeParticipant.profilePicture)}
                  alt={activeParticipant.name}
                  className="border border-hairline object-cover"
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
                  {getInitials(activeParticipant.name)}
                </div>
              )}
            </div>
            <div>
              <h2 className="mb-2 text-xl font-bold uppercase tracking-tight text-on-dark">
                {activeParticipant.name}
              </h2>
              <span
                className={`badge-m ${getTextClass(activeParticipant.industry)}`}
              >
                {getIndustryLabel(activeParticipant.industry)} Developer
              </span>
            </div>
          </div>

          {/* Social Links */}
          {(activeParticipant.github || activeParticipant.linkedin) && (
            <div className="mb-6 flex gap-3">
              {activeParticipant.github && (
                <a
                  href={activeParticipant.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-sm-m btn-outline-m inline-flex items-center gap-1.5"
                >
                  <FaGithub className="inline" />
                  GitHub
                </a>
              )}
              {activeParticipant.linkedin && (
                <a
                  href={activeParticipant.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-sm-m btn-outline-m inline-flex items-center gap-1.5"
                >
                  <FaLinkedin className="inline" />
                  LinkedIn
                </a>
              )}
            </div>
          )}

          {/* Bio */}
          <div className="mb-6">
            <h3 className="uppercase-heading mb-3">Biography</h3>
            <p className="text-sm text-body leading-relaxed">{activeParticipant.description}</p>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h3 className="uppercase-heading mb-3">Skills &amp; Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {activeParticipant.skills.map((skill) => (
                <span key={skill} className="skill-chip">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Framework Icons */}
          <div className="mb-6">
            <h3 className="uppercase-heading mb-3">Technologies Detected</h3>
            <FrameworkIcons
              skills={activeParticipant.skills}
              description={activeParticipant.description}
            />
          </div>

          {/* Projects */}
          <div>
            <h3 className="uppercase-heading mb-4">Assigned Projects</h3>
            <div className="flex flex-col gap-2">
              {getProjectsForParticipant(activeParticipant.id).map((proj) => (
                <div
                  key={proj.id}
                  className="sub-card flex cursor-pointer items-center justify-between p-4"
                  onClick={() => onShowProject(proj)}
                >
                  <div>
                    <h4 className="mb-1 text-sm font-bold text-on-dark">{proj.title}</h4>
                    <span
                      className={`text-xs font-bold uppercase tracking-[1.5px] ${
                        proj.category.includes('IT') ? 'text-cyan' : 'text-gold'
                      }`}
                    >
                      {proj.category}
                    </span>
                  </div>
                  <span className="ms-4 whitespace-nowrap text-xs font-bold uppercase tracking-[1.5px] text-muted hover:text-on-dark">
                    View &rarr;
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {activeModalType === 'project' && activeProject && (
        <div className="detail-modal-content p-4 text-start sm:p-6">
          <button className="btn-close-white" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>

          {/* M-stripe divider at top */}
          <div className="m-stripe-divider mb-6" />

          {/* Header */}
          <div className="mb-6">
            <span
              className={`badge-m mb-3 inline-block ${
                activeProject.category.includes('IT')
                  ? 'text-cyan'
                  : 'text-gold'
              }`}
            >
              {activeProject.category} Project
            </span>
            <h2 className="mb-0 text-xl font-bold uppercase tracking-tight text-on-dark">
              {activeProject.title}
            </h2>
          </div>

          {/* Project Links */}
          <div className="mb-6 flex flex-wrap gap-3">
            {activeProject.github && (
              <a
                href={activeProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sm-m btn-outline-m inline-flex items-center gap-1.5"
              >
                <FaGithub className="inline" />
                Source Code
              </a>
            )}
            {activeProject.demo && (
              <a
                href={activeProject.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sm-m btn-outline-m inline-flex items-center gap-1.5"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
          </div>

          {/* Media Gallery */}
          {activeProject.media && activeProject.media.length > 0 && (
            <div className="mb-6">
              <h3 className="uppercase-heading mb-3">Media</h3>
              <div className="flex flex-col gap-3">
                {activeProject.media.map((item, i) => (
                  <div key={i} className="border border-hairline bg-surface-soft">
                    {item.type === 'youtube' ? (
                      <div className="relative" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                          src={getYoutubeEmbedUrl(item.url)}
                          className="absolute inset-0 h-full w-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={item.caption || `Video ${i + 1}`}
                        />
                      </div>
                    ) : item.type === 'linkedin' ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 transition-colors hover:bg-surface-card"
                      >
                        <FaLinkedin className="flex-shrink-0 text-tb-cyan" />
                        <div>
                          <p className="text-sm font-bold text-on-dark">
                            {item.caption || 'LinkedIn Post'}
                          </p>
                          <p className="text-xs text-muted">View on LinkedIn &rarr;</p>
                        </div>
                      </a>
                    ) : (
                      <img
                        src={item.url}
                        alt={item.caption || `Image ${i + 1}`}
                        className="w-full object-cover"
                        style={{ maxHeight: 400 }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-6">
            <h3 className="uppercase-heading mb-3">Project Overview</h3>
            <p className="text-sm text-body leading-relaxed">{activeProject.description}</p>
          </div>

          {/* Tech Used */}
          <div className="mb-6">
            <h3 className="uppercase-heading mb-3">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {activeProject.skills.map((skill) => (
                <span key={skill} className="skill-chip">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Framework Icons */}
          <div className="mb-6">
            <h3 className="uppercase-heading mb-3">Framework Detection</h3>
            <FrameworkIcons
              skills={activeProject.skills}
              description={activeProject.description}
              tags={activeProject.tags}
            />
          </div>

          {/* Team */}
          <div>
            <h3 className="uppercase-heading mb-4">Project Team</h3>
            <div className="flex flex-col gap-2">
              {getParticipantsForProject(activeProject.id).map((p) => (
                <div
                  key={p.id}
                  className="sub-card flex cursor-pointer items-center justify-between p-4"
                  onClick={() => onShowPerson(p)}
                >
                  <div className="flex items-center gap-3">
                    {p.profilePicture ? (
                      <img
                        src={getProfilePictureUrl(p.profilePicture)}
                        alt={p.name}
                        className="flex-shrink-0 border border-hairline object-cover"
                        style={{ width: 40, height: 40 }}
                      />
                    ) : (
                      <div
                        className="flex flex-shrink-0 items-center justify-center border border-hairline font-bold text-on-dark"
                        style={{
                          backgroundColor: 'var(--color-surface-soft)',
                          width: 40,
                          height: 40,
                          fontSize: '0.85rem',
                        }}
                      >
                        {getInitials(p.name)}
                      </div>
                    )}
                    <div>
                      <h4 className="mb-0 text-sm font-bold text-on-dark">{p.name}</h4>
                      <span
                        className={`text-xs font-bold uppercase tracking-[1.5px] ${getTextClass(p.industry)}`}
                      >
                        {getIndustryLabel(p.industry)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted transition-colors hover:text-on-dark"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGithub className="inline" />
                      </a>
                    )}
                    {p.linkedin && (
                      <a
                        href={p.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted transition-colors hover:text-on-dark"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaLinkedin className="inline" />
                      </a>
                    )}
                    <span className="whitespace-nowrap text-xs font-bold uppercase tracking-[1.5px] text-muted hover:text-on-dark">
                      View &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
