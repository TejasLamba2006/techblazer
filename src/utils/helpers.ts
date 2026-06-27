import type { Participant, Project } from '../types'
import participantsData from '../static/participants.json'
import projectsData from '../static/projects.json'
import mappingsData from '../static/mappings.json'

export const shuffleArray = <T>(array: T[]): T[] => {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = arr[i] as T
    arr[i] = arr[j] as T
    arr[j] = temp
  }
  return arr
}

export const getInitials = (name: string): string => {
  if (!name) return ''
  const parts = name.split(' ').filter(Boolean)
  return parts
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export const getProfilePictureUrl = (filename: string): string => {
  if (!filename) return ''
  return new URL(`../static/profile_pictures/${filename}`, import.meta.url).href
}

export const getProjectsForParticipant = (participantName: string): Project[] => {
  const titles = (mappingsData.participantsToProjects as Record<string, string[]>)[participantName] || []
  return (projectsData as unknown as Project[]).filter((p) => titles.includes(p.title))
}

export const getParticipantsForProject = (projectTitle: string): Participant[] => {
  const names = (mappingsData.projectsToParticipants as Record<string, string[]>)[projectTitle] || []
  return (participantsData as unknown as Participant[]).filter((p) => names.includes(p.name))
}
