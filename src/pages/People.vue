<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Participant } from '../types'
import participantsData from '../static/participants.json'
import { shuffleArray } from '../utils/helpers'
import { useModalDetails } from '../composables/useModalDetails'
import ParticipantCard from '../components/ParticipantCard.vue'
import DetailModal from '../components/DetailModal.vue'

const selectedIndustry = ref('All')

const participants = ref<Participant[]>(shuffleArray(participantsData))

const filteredParticipants = computed(() => {
  return participants.value.filter((p) => {
    return selectedIndustry.value === 'All' || p.industry === selectedIndustry.value
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
          <h1 class="display-6 fw-bold text-white tracking-tight">TechBlazers Directory</h1>
          <p class="text-white-50 lead fs-6 mx-auto" style="max-width: 500px">
            Meet the innovative minds and tech pioneers driving our program forward.
          </p>
        </div>

        <!-- Simple Filter Tabs (Pill Buttons) -->
        <div class="d-flex justify-content-center gap-2 mb-4">
          <button
            @click="selectedIndustry = 'All'"
            class="btn rounded-pill px-4 py-2 small fw-semibold transition-all shadow-none"
            :class="
              selectedIndustry === 'All'
                ? 'btn-primary bg-primary border-primary'
                : 'btn-outline-light text-white-50 border-white-opacity-10'
            "
          >
            All
          </button>
          <button
            @click="selectedIndustry = 'IT'"
            class="btn rounded-pill px-4 py-2 small fw-semibold transition-all shadow-none"
            :class="
              selectedIndustry === 'IT'
                ? 'btn-primary bg-primary border-primary'
                : 'btn-outline-light text-white-50 border-white-opacity-10'
            "
          >
            IT
          </button>
          <button
            @click="selectedIndustry = 'Embedded'"
            class="btn rounded-pill px-4 py-2 small fw-semibold transition-all shadow-none"
            :class="
              selectedIndustry === 'Embedded'
                ? 'btn-primary bg-primary border-primary'
                : 'btn-outline-light text-white-50 border-white-opacity-10'
            "
          >
            Embedded
          </button>
        </div>
      </section>

      <!-- Minimalist Team Grid -->
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
        <div v-for="(p, index) in filteredParticipants" :key="index" class="col">
          <ParticipantCard :participant="p" @click="showParticipantDetails(p)" />
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredParticipants.length === 0" class="text-center py-5">
        <p class="text-white-50 fs-5">No participants found matching this category.</p>
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
