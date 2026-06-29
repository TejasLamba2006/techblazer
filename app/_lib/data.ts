import type { Participant, Project, Mappings } from './types'
import participantsData from '../../public/participants.json'
import projectsData from '../../public/projects.json'
import mappingsData from '../../public/mappings.json'

export const participants = participantsData as Participant[]
export const projects = projectsData as Project[]
export const mappings = mappingsData as Mappings

export function getParticipantById(id: string): Participant | undefined {
  return participants.find((p) => p.id === id)
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}
