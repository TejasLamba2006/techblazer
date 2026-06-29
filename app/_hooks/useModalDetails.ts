'use client'

import { useState, useMemo } from 'react'
import type { Participant, Project } from '../_lib/types'

export function useModalDetails() {
  const [activeModalType, setActiveModalType] = useState<'person' | 'project' | null>(null)
  const [activeItem, setActiveItem] = useState<Participant | Project | null>(null)

  const activeParticipant = useMemo(
    () => (activeModalType === 'person' ? (activeItem as Participant) : null),
    [activeModalType, activeItem]
  )

  const activeProject = useMemo(
    () => (activeModalType === 'project' ? (activeItem as Project) : null),
    [activeModalType, activeItem]
  )

  const showParticipantDetails = (participant: Participant) => {
    setActiveModalType('person')
    setActiveItem(participant)
  }

  const showProjectDetails = (project: Project) => {
    setActiveModalType('project')
    setActiveItem(project)
  }

  const closeDetails = () => {
    setActiveModalType(null)
    setActiveItem(null)
  }

  return {
    activeModalType,
    activeItem,
    activeParticipant,
    activeProject,
    showParticipantDetails,
    showProjectDetails,
    closeDetails,
  }
}
