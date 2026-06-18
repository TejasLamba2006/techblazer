<script setup>
import { ref, computed } from 'vue'
import participantsData from '../static/participants.json'
import projectsData from '../static/projects.json'
import mappingsData from '../static/mappings.json'

const selectedCategory = ref('All')

const projects = ref(projectsData)

const filteredProjects = computed(() => {
  return projects.value.filter((p) => {
    return selectedCategory.value === 'All' || p.category === selectedCategory.value
  })
})

// Modal interaction state
const activeModalType = ref(null) // 'person' or 'project'
const activeItem = ref(null) // selected participant or project object

const showParticipantDetails = (participant) => {
  activeModalType.value = 'person'
  activeItem.value = participant
}

const showProjectDetails = (project) => {
  activeModalType.value = 'project'
  activeItem.value = project
}

const closeDetails = () => {
  activeModalType.value = null
  activeItem.value = null
}

const getProjectsForParticipant = (participantName) => {
  const titles = mappingsData.participantsToProjects[participantName] || []
  return projectsData.filter((p) => titles.includes(p.title))
}

const getParticipantsForProject = (projectTitle) => {
  const names = mappingsData.projectsToParticipants[projectTitle] || []
  return participantsData.filter((p) => names.includes(p.name))
}

const getInitials = (name) => {
  if (!name) return ''
  const parts = name.split(' ').filter(Boolean)
  return parts
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const getProfilePictureUrl = (filename) => {
  if (!filename) return ''
  return new URL(`../static/profile_pictures/${filename}`, import.meta.url).href
}
</script>

<template>
  <div class="py-5 text-light min-vh-100" style="background-color: transparent">
    <div class="container py-4">
      <!-- Hero & Header Section -->
      <section class="mb-5 text-center">
        <div class="d-flex flex-column gap-2 mb-4">
          <h1 class="display-6 fw-bold text-white tracking-tight">TechBlazers Projects</h1>
          <p class="text-white-50 lead fs-6 mx-auto" style="max-width: 500px">
            Explore the industrial precision systems and digital infrastructures we are building.
          </p>
        </div>

        <!-- Simple Filter Tabs (Pill Buttons) -->
        <div class="d-flex justify-content-center gap-2 mb-4">
          <button
            @click="selectedCategory = 'All'"
            class="btn rounded-pill px-4 py-2 small fw-semibold transition-all shadow-none"
            :class="
              selectedCategory === 'All'
                ? 'btn-primary bg-primary border-primary'
                : 'btn-outline-light text-white-50 border-white-opacity-10'
            "
          >
            All
          </button>
          <button
            @click="selectedCategory = 'IT'"
            class="btn rounded-pill px-4 py-2 small fw-semibold transition-all shadow-none"
            :class="
              selectedCategory === 'IT'
                ? 'btn-primary bg-primary border-primary'
                : 'btn-outline-light text-white-50 border-white-opacity-10'
            "
          >
            IT
          </button>
          <button
            @click="selectedCategory = 'Embedded'"
            class="btn rounded-pill px-4 py-2 small fw-semibold transition-all shadow-none"
            :class="
              selectedCategory === 'Embedded'
                ? 'btn-primary bg-primary border-primary'
                : 'btn-outline-light text-white-50 border-white-opacity-10'
            "
          >
            Embedded
          </button>
        </div>
      </section>

      <!-- Minimalist Projects Grid -->
      <div class="row row-cols-1 row-cols-md-2 g-4 mb-4">
        <div v-for="(project, index) in filteredProjects" :key="index" class="col">
          <div
            @click="showProjectDetails(project)"
            class="card h-100 border border-white border-opacity-10 bg-white bg-opacity-5 rounded-4 p-4 hover-profile-card transition-all cursor-pointer"
            style="background-color: rgba(255, 255, 255, 0.03) !important"
          >
            <!-- Category Header -->
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span
                class="text-uppercase tracking-wider small fw-semibold"
                :class="project.category.includes('IT') ? 'text-cyan' : 'text-gold'"
                style="font-size: 0.75rem"
              >
                {{ project.category }}
              </span>
              <div
                class="project-dot animate-pulse"
                :style="
                  project.category.includes('IT')
                    ? 'background-color: #4da3ff;'
                    : 'background-color: #ffd200;'
                "
              ></div>
            </div>

            <!-- Title -->
            <h2 class="h4 fw-bold text-white mb-3">{{ project.title }}</h2>

            <!-- Description -->
            <p
              class="text-white-50 small mb-3 line-height-relaxed text-truncate-3"
              style="line-height: 1.6; min-height: 4.8em"
            >
              {{ project.description }}
            </p>

            <!-- More Detail Link -->
            <div class="mb-3">
              <span class="small fw-bold d-inline-flex align-items-center gap-1 hover-link" :class="project.category.includes('IT') ? 'text-cyan' : 'text-gold'">
                More Details
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                </svg>
              </span>
            </div>

            <!-- Mini Skills List -->
            <div class="mt-auto pt-3 border-top border-white border-opacity-10">
              <p
                class="small text-white-50 opacity-75 mb-0 text-truncate"
                style="font-size: 0.8rem"
              >
                {{ project.skills.join(' · ') }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredProjects.length === 0" class="text-center py-5">
        <p class="text-white-50 fs-5">No projects found matching this category.</p>
      </div>
    </div>

    <!-- Detail Modal Overlay -->
    <Transition name="fade-blur">
      <div v-if="activeModalType" class="detail-modal-overlay" @click.self="closeDetails">
        <!-- Person Detail Modal -->
        <div
          v-if="activeModalType === 'person'"
          class="detail-modal-content card border border-white border-opacity-15 rounded-4 p-4 text-start"
        >
          <div class="modal-glow-bg" :class="activeItem.industry === 'IT' ? 'it-glow' : 'embedded-glow'"></div>

          <button
            class="btn-close btn-close-white position-absolute top-0 end-0 m-3 shadow-none z-3"
            @click="closeDetails"
            aria-label="Close"
          ></button>

          <div class="position-relative z-2">
            <!-- Header with avatar, name, industry -->
            <div class="d-flex align-items-center gap-3 mb-4">
              <div class="position-relative flex-shrink-0" style="width: 80px; height: 80px;">
                <img
                  v-if="activeItem.profilePicture"
                  :src="getProfilePictureUrl(activeItem.profilePicture)"
                  :alt="activeItem.name"
                  class="rounded-circle object-fit-cover border border-white border-opacity-20 shadow"
                  style="width: 80px; height: 80px;"
                />
                <div
                  v-else
                  class="d-flex align-items-center justify-content-center rounded-circle border border-white border-opacity-20 text-white fw-bold shadow"
                  :style="
                    activeItem.industry === 'IT'
                      ? 'background-color: rgba(77, 163, 255, 0.1); color: #4da3ff !important; width: 80px; height: 80px; font-size: 1.5rem;'
                      : 'background-color: rgba(255, 210, 0, 0.1); color: #ffd200 !important; width: 80px; height: 80px; font-size: 1.5rem;'
                  "
                >
                  {{ getInitials(activeItem.name) }}
                </div>
                <div
                  class="position-absolute bottom-0 end-0 rounded-circle"
                  :style="
                    activeItem.industry === 'IT'
                      ? 'background-color: #4da3ff; width: 14px; height: 14px; border: 2px solid #0b1329;'
                      : 'background-color: #ffd200; width: 14px; height: 14px; border: 2px solid #0b1329;'
                  "
                ></div>
              </div>
              <div>
                <h2 class="h4 fw-bold text-white mb-1 tracking-tight">{{ activeItem.name }}</h2>
                <span
                  class="badge rounded-pill text-uppercase tracking-wider small fw-bold"
                  :class="activeItem.industry === 'IT' ? 'bg-primary bg-opacity-25 text-cyan border border-info border-opacity-10' : 'bg-warning bg-opacity-25 text-gold border border-warning border-opacity-10'"
                  style="font-size: 0.7rem;"
                >
                  {{ activeItem.industry }} Developer
                </span>
              </div>
            </div>

            <!-- Bio -->
            <div class="mb-4">
              <h3 class="h6 uppercase-heading mb-2">Biography</h3>
              <p class="mb-0 line-height-relaxed modal-description">
                {{ activeItem.description }}
              </p>
            </div>

            <!-- Skills -->
            <div class="mb-4">
              <h3 class="h6 uppercase-heading mb-2">Skills &amp; Expertise</h3>
              <div class="d-flex flex-wrap gap-2">
                <span v-for="skill in activeItem.skills" :key="skill" class="badge-skill">
                  {{ skill }}
                </span>
              </div>
            </div>

            <!-- Projects -->
            <div>
              <h3 class="h6 uppercase-heading mb-3">Assigned Projects</h3>
              <div class="d-flex flex-column gap-2">
                <div
                  v-for="proj in getProjectsForParticipant(activeItem.name)"
                  :key="proj.title"
                  class="sub-card p-3 rounded-3 d-flex justify-content-between align-items-center transition-all cursor-pointer"
                  @click="showProjectDetails(proj)"
                >
                  <div>
                    <h4 class="h6 fw-bold text-white mb-1">{{ proj.title }}</h4>
                    <span
                      class="text-uppercase tracking-wider small fw-semibold"
                      :class="proj.category.includes('IT') ? 'text-cyan' : 'text-gold'"
                      style="font-size: 0.7rem"
                    >
                      {{ proj.category }}
                    </span>
                  </div>
                  <button
                    class="btn btn-sm btn-outline-light-custom rounded-pill px-3 py-1 text-nowrap ms-3"
                  >
                    View Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Project Detail Modal -->
        <div
          v-if="activeModalType === 'project'"
          class="detail-modal-content card border border-white border-opacity-15 rounded-4 p-4 text-start"
        >
          <div class="modal-glow-bg" :class="activeItem.category.includes('IT') ? 'it-glow' : 'embedded-glow'"></div>

          <button
            class="btn-close btn-close-white position-absolute top-0 end-0 m-3 shadow-none z-3"
            @click="closeDetails"
            aria-label="Close"
          ></button>

          <div class="position-relative z-2">
            <!-- Header -->
            <div class="d-flex justify-content-between align-items-start mb-4">
              <div class="pe-4">
                <span
                  class="badge rounded-pill text-uppercase tracking-wider small fw-bold mb-2 d-inline-block"
                  :class="activeItem.category.includes('IT') ? 'bg-primary bg-opacity-25 text-cyan border border-info border-opacity-10' : 'bg-warning bg-opacity-25 text-gold border border-warning border-opacity-10'"
                  style="font-size: 0.7rem;"
                >
                  {{ activeItem.category }} Project
                </span>
                <h2 class="h4 fw-bold text-white mb-0 tracking-tight">{{ activeItem.title }}</h2>
              </div>
              <div
                class="project-dot mt-2 flex-shrink-0 animate-pulse"
                :style="
                  activeItem.category.includes('IT')
                    ? 'background-color: #4da3ff;'
                    : 'background-color: #ffd200;'
                "
              ></div>
            </div>

            <!-- Description -->
            <div class="mb-4">
              <h3 class="h6 uppercase-heading mb-2">Project Overview</h3>
              <p class="mb-0 line-height-relaxed modal-description">
                {{ activeItem.description }}
              </p>
            </div>

            <!-- Tech Used -->
            <div class="mb-4">
              <h3 class="h6 uppercase-heading mb-2">Technologies Used</h3>
              <div class="d-flex flex-wrap gap-2">
                <span v-for="skill in activeItem.skills" :key="skill" class="badge-skill">
                  {{ skill }}
                </span>
              </div>
            </div>

            <!-- Team -->
            <div>
              <h3 class="h6 uppercase-heading mb-3">Project Team</h3>
              <div class="d-flex flex-column gap-2">
                <div
                  v-for="p in getParticipantsForProject(activeItem.title)"
                  :key="p.name"
                  class="sub-card p-3 rounded-3 d-flex justify-content-between align-items-center transition-all cursor-pointer"
                  @click="showParticipantDetails(p)"
                >
                  <div class="d-flex align-items-center gap-2.5">
                    <!-- Profile Picture or Initials in Project Modal -->
                    <img
                      v-if="p.profilePicture"
                      :src="getProfilePictureUrl(p.profilePicture)"
                      :alt="p.name"
                      class="rounded-circle object-fit-cover border border-white border-opacity-15"
                      style="width: 40px; height: 40px; flex-shrink: 0;"
                    />
                    <div
                      v-else
                      class="d-flex align-items-center justify-content-center rounded-circle border border-white border-opacity-10 text-white fw-bold"
                      :style="
                        p.industry === 'IT'
                          ? 'background-color: rgba(77, 163, 255, 0.1); color: #4da3ff !important; width: 40px; height: 40px; font-size: 0.9rem; flex-shrink: 0;'
                          : 'background-color: rgba(255, 210, 0, 0.1); color: #ffd200 !important; width: 40px; height: 40px; font-size: 0.9rem; flex-shrink: 0;'
                      "
                    >
                      {{ getInitials(p.name) }}
                    </div>
                    <div>
                      <h4 class="h6 fw-bold text-white mb-0">{{ p.name }}</h4>
                      <span
                        class="text-uppercase tracking-wider small fw-semibold"
                        :class="p.industry === 'IT' ? 'text-cyan' : 'text-gold'"
                        style="font-size: 0.7rem"
                      >
                        {{ p.industry || 'Specialist' }}
                      </span>
                    </div>
                  </div>
                  <button
                    class="btn btn-sm btn-outline-light-custom rounded-pill px-3 py-1 text-nowrap ms-3"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.hover-profile-card {
  transition:
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.3s ease;
}
.hover-profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4) !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
}
.text-cyan {
  color: #4da3ff !important;
}
.text-gold {
  color: #ffd200 !important;
}
.border-white-opacity-10 {
  border-color: rgba(255, 255, 255, 0.1) !important;
}
.btn-outline-light {
  border-color: rgba(255, 255, 255, 0.1);
}
.btn-outline-light:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff !important;
}
.project-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

/* Custom Styles for More Detail Integration */
.text-truncate-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.btn-outline-light-custom {
  color: rgba(255, 255, 255, 0.7) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  font-size: 0.8rem;
  font-weight: 600;
}
.btn-outline-light-custom:hover {
  color: #ffffff !important;
  background-color: rgba(255, 255, 255, 0.1) !important;
  border-color: rgba(255, 255, 255, 0.3) !important;
}

.detail-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(11, 19, 41, 0.75);
  backdrop-filter: blur(12px);
  z-index: 1050;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.detail-modal-content {
  background: rgba(11, 19, 41, 0.95) !important;
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  box-shadow:
    0 25px 60px rgba(0, 0, 0, 0.65),
    0 0 50px rgba(77, 163, 255, 0.1) !important;
  max-width: 600px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
  border-radius: 24px !important;
  animation: modal-appear 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-glow-bg {
  position: absolute;
  top: -120px;
  right: -120px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.18;
  pointer-events: none;
  z-index: 1;
  transition: opacity 0.3s ease;
}
.it-glow {
  background: #4da3ff;
}
.embedded-glow {
  background: #ffd200;
}

@keyframes modal-appear {
  from {
    transform: scale(0.92) translateY(15px);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

.detail-modal-content::-webkit-scrollbar {
  width: 6px;
}
.detail-modal-content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}
.detail-modal-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}
.detail-modal-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

.uppercase-heading {
  font-size: 0.75rem !important;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45) !important;
}

.badge-skill {
  background-color: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
}

.sub-card {
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.sub-card:hover {
  background-color: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.18);
  transform: translateY(-2px) translateX(2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.cursor-pointer {
  cursor: pointer;
}

.hover-profile-card:hover .hover-link svg {
  transform: translateX(4px);
}
.hover-link svg {
  transition: transform 0.2s ease;
}

.fade-blur-enter-active,
.fade-blur-leave-active {
  transition:
    opacity 0.25s ease,
    backdrop-filter 0.25s ease;
}
.fade-blur-enter-from,
.fade-blur-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
}

.modal-description {
  color: rgba(255, 255, 255, 0.95) !important;
  font-size: 0.92rem;
  line-height: 1.6;
}
</style>
