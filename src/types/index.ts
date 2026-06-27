export interface Participant {
  name: string
  industry: string
  skills: string[]
  description: string
  profilePicture?: string
}

export interface Project {
  title: string
  category: string
  skills: string[]
  description: string
}
