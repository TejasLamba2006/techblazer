import type { Participant, Project, MediaItem } from './types'
import { participants, projects, mappings, getParticipantById, getProjectById } from './data'

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = arr[i] as T
    arr[i] = arr[j] as T
    arr[j] = temp
  }
  return arr
}

export function getInitials(name: string): string {
  if (!name) return ''
  const parts = name.split(' ').filter(Boolean)
  return parts
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function getProfilePictureUrl(filename: string): string {
  if (!filename) return ''
  return `/profile_pictures/${filename}`
}

export function getProjectsForParticipant(participantId: string): Project[] {
  const projectIds = mappings.participantsToProjects[participantId] || []
  return projectIds.map((id) => getProjectById(id)).filter(Boolean) as Project[]
}

export function getParticipantsForProject(projectId: string): Participant[] {
  const participantIds = mappings.projectsToParticipants[projectId] || []
  return participantIds.map((id) => getParticipantById(id)).filter(Boolean) as Participant[]
}

export function getYoutubeEmbedUrl(url: string): string {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^&?#]+)/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : url
}

export function getLinkedInPostId(url: string): string {
  const match = url.match(/posts\/([^/?]+)/)
  return match ? match[1] : ''
}

interface DetectedFramework {
  name: string
  svgPath: string
}

const FRAMEWORK_REGISTRY: Record<string, DetectedFramework> = {
  react: { name: 'React', svgPath: 'M14.23 12.004a1.095 1.095 0 0 0-.314.167 7.566 7.566 0 0 0-2.095 2.055 7.57 7.57 0 0 0-2.095-2.055 1.102 1.102 0 0 0-.314-.167 7.946 7.946 0 0 0-2.575.524 1.102 1.102 0 0 0-.588.496 8.07 8.07 0 0 0 2.84 2.216 1.1 1.1 0 0 0 1.102 0 8.07 8.07 0 0 0 2.84-2.216 1.102 1.102 0 0 0-.588-.496 7.946 7.946 0 0 0-2.575-.524zM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 2.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11z' },
  'next.js': { name: 'Next.js', svgPath: 'M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.29 5.164 2.5 4.33A.5.5 0 0 1 13.5 10H8.5a.5.5 0 0 1-.438-.75l2.5-4.33a.5.5 0 0 1 .865.5l-1.25 2.155h3.313a.5.5 0 0 1 .438.75H10.5a.5.5 0 0 1-.438-.75h1.728z' },
  'node.js': { name: 'Node.js', svgPath: 'M11.998 14.942l2.001-11.46H16l-4.001 11.46zm-3.998 0L6 3.482H4l4.002 11.46zm3.998 1.058H7.998V2.058h4v14zm3.998-8.058H16V2.058h-4v5.884zM8 8.884H4v-5.884h4v5.884z' },
  flutter: { name: 'Flutter', svgPath: 'M14.314 0L2.3 12 6 15.7 21 0h-6.686zM6 18.314L2.686 15 15.684 2H18l-12 16.314z' },
  python: { name: 'Python', svgPath: 'M9.072 5.582c.022.17.022.345 0 .515-.064.517-.273.986-.591 1.352.394.044.762.191 1.08.428l.052.04c.572.434.966 1.075 1.087 1.799a3.134 3.134 0 0 1-.082.897 2.448 2.448 0 0 1-1.655 1.656 3.136 3.136 0 0 1-.897.082c-.724 0-1.365-.394-1.799-1.087l-.04-.052a2.45 2.45 0 0 1-.428-1.08c-.044-.395-.034-.8.032-1.195.065-.39.196-.763.387-1.105a5.26 5.26 0 0 1-1.08-.428l-.052-.04c-.572-.434-.966-1.075-1.087-1.799a3.134 3.134 0 0 1 .082-.897c.19-.712.74-1.262 1.452-1.452a3.134 3.134 0 0 1 .897-.082c.724 0 1.365.394 1.799 1.087l.04.052c.237.318.384.686.428 1.08.022.17.022.345 0 .515.064.517.273.986.591 1.352a2.448 2.448 0 0 1-.387 1.105z' },
  typescript: { name: 'TypeScript', svgPath: 'M1 1h14v14H1V1zm3 3v8h2.5v-2H8V6H4zm5.5 0v2h2v4h-2v2h4v-2h-2V6h-2zm4 0v8H14V6h-1.5z' },
  javascript: { name: 'JavaScript', svgPath: 'M0 0h16v16H0V0zm8.858 12.356c.472 0 .858-.386.858-.858 0-.472-.386-.858-.858-.858-.47 0-.856.386-.856.858 0 .472.386.858.856.858zM6.106 7.45c0-1.125-.782-1.69-1.162-1.983.732-.37 1.594-.41 1.905-.41.89 0 1.722.113 2.31.43-.43.59-.765 1.353-.765 2.313 0 2.125 2.868 1.83 2.868 3.248 0 .553-.5 1.003-1.267 1.003-.89 0-1.597-.455-1.597-1.098 0-.577.593-.78 1.31-.78.687 0 1.143.158 1.143.507 0 .265-.326.475-.73.475-.53 0-.912-.265-.912-.727 0-.612.593-.855 1.21-.855.827 0 1.45.38 1.45 1.197 0 .577-.384 1.018-.91 1.018-.593 0-1.03-.32-1.03-.827 0-.376.317-.64.81-.64.466 0 .786.28.786.68 0 .337-.395.56-.86.56-.672 0-1.132-.423-1.132-1.027 0-.548.447-.968 1.115-.968zM11.15 4.53c.636 0 1.152.515 1.152 1.15 0 .636-.516 1.152-1.152 1.152-.635 0-1.15-.516-1.15-1.152 0-.635.515-1.15 1.15-1.15zm-2.304 0c.636 0 1.15.515 1.15 1.15 0 .636-.514 1.152-1.15 1.152-.635 0-1.15-.516-1.15-1.152 0-.635.515-1.15 1.15-1.15z' },
  docker: { name: 'Docker', svgPath: 'M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.186.186 0 0 0-.185.186v1.887c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.186v1.887c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.186v1.887c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186H5.136a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.186v1.887c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.565 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z' },
  'express.js': { name: 'Express.js', svgPath: 'M14.23 12.004a1.095 1.095 0 0 0-.314.167 7.566 7.566 0 0 0-2.095 2.055 7.57 7.57 0 0 0-2.095-2.055 1.102 1.102 0 0 0-.314-.167 7.946 7.946 0 0 0-2.575.524 1.102 1.102 0 0 0-.588.496 8.07 8.07 0 0 0 2.84 2.216 1.1 1.1 0 0 0 1.102 0 8.07 8.07 0 0 0 2.84-2.216 1.102 1.102 0 0 0-.588-.496 7.946 7.946 0 0 0-2.575-.524zM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0z' },
  mongodb: { name: 'MongoDB', svgPath: 'M8 1.5s-3.5 2-3.5 5.5c0 1.5.5 2.5 1.5 3.2-.3.4-.5.9-.5 1.3 0 1.4 1.8 2 2.5 2s2.5-.6 2.5-2c0-.4-.2-.9-.5-1.3 1-.7 1.5-1.7 1.5-3.2C11.5 3.5 8 1.5 8 1.5z' },
  postgresql: { name: 'PostgreSQL', svgPath: 'M11.5 3c-1.5 0-2.5 1-3 1.5-.5-.5-1.5-1.5-3-1.5C3 3 1 5 1 7.5c0 3.5 5 6.5 7 7.5 2-1 7-4 7-7.5C15 5 13 3 11.5 3z' },
  sql: { name: 'SQL', svgPath: 'M4 2h8l2 3v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5l2-3zm4 1.5L5.5 5h5L8 3.5zM3 12h10V6H3v6z' },
  tensorflow: { name: 'TensorFlow', svgPath: 'M1 1h6v6H1V1zm8 0h6v6H9V1zM5 9h6v6H5V9zm-4 0h6v4H1V9z' },
  pytorch: { name: 'PyTorch', svgPath: 'M8 1C4.5 1 2 4 2 7c0 2 1 3.5 2.5 4.5L3 14h3l1.5-2h1L10 14h3l-1.5-2.5C13 10.5 14 9 14 7c0-3-2.5-6-6-6zm-2 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z' },
  opencv: { name: 'OpenCV', svgPath: 'M8 1L2 4v8l6 3 6-3V4L8 1zm0 2.5L12 6v4l-4 2-4-2V6l4-2.5z' },
  ros2: { name: 'ROS2', svgPath: 'M3 3h4v4H3V3zm6 0h4v4H9V3zM3 9h4v4H3V9zm6 0h4v4H9V9z' },
  stm32: { name: 'STM32', svgPath: 'M2 2h12v12H2V2zm2 2v8h8V4H4z' },
  unity: { name: 'Unity', svgPath: 'M8 1L3 4v8l5 3 5-3V4L8 1zm0 2.2L11.5 5v6L8 12.8 4.5 11V5L8 3.2z' },
  csharp: { name: 'C#', svgPath: 'M6 3c-1.7 0-3 1.3-3 3v1c0 1.7 1.3 3 3 3H7v2H5v2h3c2.8 0 5-2.2 5-5V6c0-1.7-1.3-3-3-3H6zm0 2h3c.6 0 1 .4 1 1v1c0 .6-.4 1-1 1H6V5z' },
  'c++': { name: 'C++', svgPath: 'M5 3c-1.7 0-3 1.3-3 3v1c0 1.7 1.3 3 3 3h1v2H3v2h3c2.8 0 5-2.2 5-5V6c0-1.7-1.3-3-3-3H5zm7 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM5 5h3v4H5V5z' },
  c: { name: 'C', svgPath: 'M8 1C4.5 1 2 3.5 2 7s2.5 6 6 6c2 0 3.5-.8 4.5-2l-1.5-1c-.6.8-1.5 1.2-3 1.2-2.2 0-4-1.8-4-4s1.8-4 4-4c1.5 0 2.4.4 3 1.2L14.5 5C13.5 3.2 11 1 8 1z' },
  java: { name: 'Java', svgPath: 'M6 2c0 .5-.5 1-1 1S4 2.5 4 2v12c0 .5.5 1 1 1s1-.5 1-1V2zm4 0c0 .5-.5 1-1 1s-1-.5-1-1v12c0 .5.5 1 1 1s1-.5 1-1V2zM14 5c-1.5 0-3 1-3 3v1c0 2 1.5 3 3 3h1v2h-2c-3 0-5-2-5-5s2-5 5-5h2v3h-1z' },
  go: { name: 'Go', svgPath: 'M2 4h12v1.5H9.5c-.3 0-.5.2-.5.5v1c0 .3.2.5.5.5H12v1.5H7c-1.7 0-3-1.3-3-3V4zm7 3.5h3.5V9H9V7.5zM3 10h10v1.5H3V10z' },
  golang: { name: 'Go', svgPath: 'M2 4h12v1.5H9.5c-.3 0-.5.2-.5.5v1c0 .3.2.5.5.5H12v1.5H7c-1.7 0-3-1.3-3-3V4zm7 3.5h3.5V9H9V7.5zM3 10h10v1.5H3V10z' },
  html: { name: 'HTML5', svgPath: 'M2 1l1.5 13L8 16l4.5-2L14 1H2zm3.5 3h5l-.5 4h-1l.2-1.5H5.8l.3 2h3.6l-.5 4L8 14.5 5.8 12l-.2-2h1.5L7.8 12l.2.5.2-.5H5.5z' },
  css: { name: 'CSS3', svgPath: 'M2 1l1.5 13L8 16l4.5-2L14 1H2zm3.5 3h5l-.2 2H6l.2 2h4l-.5 4-2.2 1-2.2-1-.1-1h1.5l.1.5.8.3.8-.3.1-.5H5.3l-.3-3h8l-.2 2' },
  'deep learning': { name: 'Deep Learning', svgPath: 'M2 3h3v3H2V3zm4.5 0h3v3h-3V3zM11 3h3v3h-3V3zM2 7.5h3v3H2v-3zm4.5 0h3v3h-3v-3zM11 7.5h3v3h-3v-3zM2 12h3v3H2v-3zm4.5 0h3v3h-3v-3zM11 12h3v3h-3v-3z' },
  'machine learning': { name: 'ML', svgPath: 'M4 2l4 5-4 5h2l4-5-4-5H4zm5 0l4 5-4 5h2l4-5-4-5H9z' },
  yolo: { name: 'YOLO', svgPath: 'M3 3l5 10h2L3 3H1l5 10h2L1 3h2zm6 0v10h2V3H9z' },
  'computer vision': { name: 'CV', svgPath: 'M8 2C5 2 2.5 4 2 6l2 1c.4-1.3 2-3 4-3s3.6 1.7 4 3l2-1c-.5-2-3-4-6-4zm0 4c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z' },
  iot: { name: 'IoT', svgPath: 'M8 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' },
  zephyr: { name: 'Zephyr', svgPath: 'M3 4h10l-2 4h3L6 15l2-4H4l2-4H3V4z' },
}

const LOOKUP_KEYS = Object.keys(FRAMEWORK_REGISTRY)

export function detectFrameworks(
  skills: string[],
  description?: string,
  tags?: string[]
): DetectedFramework[] {
  const searchText = [description || '', ...(tags || [])].join(' ').toLowerCase()
  const found = new Map<string, DetectedFramework>()

  for (const skill of skills) {
    const lower = skill.toLowerCase().trim()
    if (FRAMEWORK_REGISTRY[lower]) {
      found.set(lower, FRAMEWORK_REGISTRY[lower])
    } else {
      for (const key of LOOKUP_KEYS) {
        if (lower.includes(key) || key.includes(lower)) {
          found.set(key, FRAMEWORK_REGISTRY[key])
        }
      }
    }
  }

  if (searchText) {
    for (const key of LOOKUP_KEYS) {
      if (searchText.includes(key)) {
        found.set(key, FRAMEWORK_REGISTRY[key])
      }
    }
  }

  return Array.from(found.values()).slice(0, 8)
}

/* ─── Industry Array Helpers ─── */

export function hasIndustry(industry: string[], target: string): boolean {
  return industry.includes(target)
}

export function isBothIndustries(industry: string[]): boolean {
  return industry.includes('IT') && industry.includes('Embedded')
}

export function getGlowClass(industry: string[]): string {
  if (isBothIndustries(industry)) return 'glow-dual'
  return hasIndustry(industry, 'IT') ? 'glow-cyan' : 'glow-gold'
}

export function getTextClass(industry: string[]): string {
  if (isBothIndustries(industry)) return 'text-dual'
  return hasIndustry(industry, 'IT') ? 'text-cyan' : 'text-gold'
}

export function getIndustryLabel(industry: string[]): string {
  if (isBothIndustries(industry)) return 'IT & Embedded'
  return industry[0] || 'Specialist'
}
