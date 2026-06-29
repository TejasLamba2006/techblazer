export type MediaType = 'image' | 'youtube' | 'linkedin'

export interface MediaItem {
  type: MediaType
  url: string
  caption?: string
}

export interface Participant {
  id: string
  name: string
  industry: string[]
  skills: string[]
  description: string
  profilePicture?: string
  github?: string
  linkedin?: string
  role?: string
}

export interface Project {
  id: string
  title: string
  category: string
  skills: string[]
  description: string
  media?: MediaItem[]
  github?: string
  demo?: string
  tags?: string[]
}

export interface Mappings {
  participantsToProjects: Record<string, string[]>
  projectsToParticipants: Record<string, string[]>
}
