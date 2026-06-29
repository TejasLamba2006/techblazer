'use client'

import { useState, useMemo } from 'react'
import type { Project } from '../_lib/types'
import { projects } from '../_lib/data'
import { shuffleArray } from '../_lib/helpers'
import { useModalDetails } from '../_hooks/useModalDetails'
import { useScrollReveal } from '../_hooks/useScrollReveal'
import ProjectCard from '../_components/ProjectCard'
import DetailModal from '../_components/DetailModal'

const shuffledProjects = shuffleArray(projects) as Project[]

const categories = ['All', 'IT', 'Embedded']

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const containerRef = useScrollReveal()

  const filteredProjects = useMemo(() => {
    return shuffledProjects.filter((p) => {
      return selectedCategory === 'All' || p.category === selectedCategory
    })
  }, [selectedCategory])

  const {
    activeModalType,
    activeItem,
    showParticipantDetails,
    showProjectDetails,
    closeDetails,
  } = useModalDetails()

  return (
    <div ref={containerRef} className="min-h-screen text-body">
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 md:py-24">
        {/* Hero */}
        <section className="mb-10 sm:mb-16">
          <h1 className="mb-4 text-3xl font-bold uppercase tracking-tight text-on-dark anim-fade-up sm:text-4xl md:text-6xl">
            Projects
          </h1>
          <p className="max-w-[500px] text-sm font-light text-body anim-fade-up sm:text-base">
            Explore the industrial precision systems and digital infrastructures we are building.
          </p>
        </section>

        {/* Filter Tabs */}
        <div className="mb-8 flex gap-0 border-b border-hairline sm:mb-12 anim-fade-up">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`filter-tab ${selectedCategory === cat ? 'filter-tab-active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid — alternating slide-in directions */}
        <div className="grid grid-cols-1 gap-px sm:grid-cols-2 tilt-container">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={index % 2 === 0 ? 'anim-slide-right' : 'anim-slide-left'}
              style={{ animationDelay: `${(index % 4) * 100}ms` } as React.CSSProperties}
            >
              <ProjectCard
                project={project}
                onClick={() => showProjectDetails(project)}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="py-16 text-center sm:py-24">
            <p className="text-base text-muted sm:text-lg">No projects found matching this category.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <DetailModal
        activeModalType={activeModalType}
        activeItem={activeItem}
        onClose={closeDetails}
        onShowPerson={showParticipantDetails}
        onShowProject={showProjectDetails}
      />
    </div>
  )
}
