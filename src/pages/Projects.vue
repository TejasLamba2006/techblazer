<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Project } from '../types'
import projectsData from '../static/projects.json'
import { shuffleArray } from '../utils/helpers'
import { useModalDetails } from '../composables/useModalDetails'
import ProjectCard from '../components/ProjectCard.vue'
import DetailModal from '../components/DetailModal.vue'

const selectedCategory = ref('All')

const projects = ref<Project[]>(shuffleArray(projectsData as unknown as Project[]))

const filteredProjects = computed(() => {
  return projects.value.filter((p) => {
    return selectedCategory.value === 'All' || p.category === selectedCategory.value
  })
})

const {
  activeModalType,
  activeItem,
  showParticipantDetails,
  showProjectDetails,
  closeDetails
} = useModalDetails()
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
          <ProjectCard :project="project" @click="showProjectDetails(project)" />
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredProjects.length === 0" class="text-center py-5">
        <p class="text-white-50 fs-5">No projects found matching this category.</p>
      </div>
    </div>

    <!-- Detail Modal -->
    <DetailModal
      :active-modal-type="activeModalType"
      :active-item="activeItem"
      @close="closeDetails"
      @show-person="showParticipantDetails"
      @show-project="showProjectDetails"
    />
  </div>
</template>

<style scoped>
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
</style>
