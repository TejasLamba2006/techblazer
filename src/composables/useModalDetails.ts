import { ref, computed } from 'vue'
import type { Participant, Project } from '../types'

export function useModalDetails() {
  const activeModalType = ref<'person' | 'project' | null>(null)
  const activeItem = ref<Participant | Project | null>(null)

  const activeParticipant = computed(() => {
    return activeModalType.value === 'person' ? activeItem.value as Participant : null
  })

  const activeProject = computed(() => {
    return activeModalType.value === 'project' ? activeItem.value as Project : null
  })

  const showParticipantDetails = (participant: Participant) => {
    activeModalType.value = 'person'
    activeItem.value = participant
  }

  const showProjectDetails = (project: Project) => {
    activeModalType.value = 'project'
    activeItem.value = project
  }

  const closeDetails = () => {
    activeModalType.value = null
    activeItem.value = null
  }

  return {
    activeModalType,
    activeItem,
    activeParticipant,
    activeProject,
    showParticipantDetails,
    showProjectDetails,
    closeDetails
  }
}
