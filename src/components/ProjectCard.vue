<script setup lang="ts">
import type { Project } from '../types'

defineProps<{
  project: Project
}>()
</script>

<template>
  <div
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
.text-truncate-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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
</style>
