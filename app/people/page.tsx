'use client'

import { useState, useMemo } from 'react'
import type { Participant } from '../_lib/types'
import { participants } from '../_lib/data'
import { shuffleArray } from '../_lib/helpers'
import { useModalDetails } from '../_hooks/useModalDetails'
import { useScrollReveal } from '../_hooks/useScrollReveal'
import ParticipantCard from '../_components/ParticipantCard'
import DetailModal from '../_components/DetailModal'

const shuffledParticipants = shuffleArray(participants) as Participant[]

const industries = ['All', 'IT', 'Embedded']

export default function PeoplePage() {
  const [selectedIndustry, setSelectedIndustry] = useState('All')
  const containerRef = useScrollReveal()

  const filteredParticipants = useMemo(() => {
    return shuffledParticipants.filter((p) => {
      return selectedIndustry === 'All' || p.industry.includes(selectedIndustry)
    })
  }, [selectedIndustry])

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
            Directory
          </h1>
          <p className="max-w-[500px] text-sm font-light text-body anim-fade-up sm:text-base">
            Meet the innovative minds and tech pioneers driving our program forward.
          </p>
        </section>

        {/* Filter Tabs */}
        <div className="mb-8 flex gap-0 border-b border-hairline sm:mb-12 anim-fade-up">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`filter-tab ${selectedIndustry === ind ? 'filter-tab-active' : ''}`}
            >
              {ind}
            </button>
          ))}
        </div>

        {/* Team Grid — alternating slide-in */}
        <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3 tilt-container">
          {filteredParticipants.map((p, index) => (
            <div
              key={p.id}
              className={index % 2 === 0 ? 'anim-slide-right' : 'anim-slide-left'}
              style={{ animationDelay: `${(index % 6) * 80}ms` } as React.CSSProperties}
            >
              <ParticipantCard
                participant={p}
                onClick={() => showParticipantDetails(p)}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredParticipants.length === 0 && (
          <div className="py-16 text-center sm:py-24">
            <p className="text-base text-muted sm:text-lg">No participants found matching this industry.</p>
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
