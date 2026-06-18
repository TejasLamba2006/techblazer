<script setup lang="ts">
import { ref, computed } from 'vue'
import participantsData from '../static/participants.json'
import projectsData from '../static/projects.json'

// Dynamic Stats calculation
const totalProjects = ref(projectsData.length)
const totalParticipants = ref(participantsData.length)

// Extract unique skills from projects and participants
const uniqueSkills = computed(() => {
  const skillsSet = new Set()
  
  projectsData.forEach(p => {
    if (p.skills && Array.isArray(p.skills)) {
      p.skills.forEach(s => skillsSet.add(s))
    }
  })
  
  participantsData.forEach(p => {
    if (p.skills && Array.isArray(p.skills)) {
      p.skills.forEach(s => skillsSet.add(s))
    }
  })
  
  return Array.from(skillsSet)
})

const totalSkills = computed(() => uniqueSkills.value.length)

// Featured items
const featuredProjects = ref(projectsData.slice(0, 3))
const featuredParticipants = ref(participantsData.slice(0, 3))

// Helper to get name initials for avatar
const getInitials = (name) => {
  if (!name) return ''
  const parts = name.split(' ').filter(Boolean)
  return parts
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

// Helper to get profile picture URL
const getProfilePictureUrl = (filename) => {
  if (!filename) return ''
  return new URL(`../static/profile_pictures/${filename}`, import.meta.url).href
}
</script>

<template>
  <div class="py-4 text-light">
    <!-- Hero / Portal Entrance -->
    <section class="hero-section py-5 mb-5 text-center position-relative overflow-hidden rounded-5">
      <!-- Glowing background blobs -->
      <div class="glow-blob glow-it"></div>
      <div class="glow-blob glow-embedded"></div>
      
      <div class="position-relative z-2 py-4 px-3">
        <!-- Mini Tag -->
        <span class="badge rounded-pill bg-light bg-opacity-10 text-white-50 px-3 py-2 mb-3 border border-white border-opacity-10 tracking-wider text-uppercase fw-semibold" style="font-size: 0.75rem;">
          <span class="pulse-dot me-2"></span>STMicroelectronics TechBlazers
        </span>
        
        <!-- Title -->
        <h1 class="hero-title display-4 fw-extrabold text-white mb-3">
          Innovating at the Intersection of <br>
          <span class="gradient-text-it">Software</span> &amp; <span class="gradient-text-embedded">Hardware</span>
        </h1>
        
        <!-- Description -->
        <p class="hero-lead text-white-50 lead mx-auto mb-4" style="max-width: 650px;">
          Welcome to the TechBlazers Hub. We design intelligent software platforms and integrate high-precision embedded systems to solve complex engineering challenges.
        </p>
        
        <!-- CTAs -->
        <div class="d-flex justify-content-center gap-3">
          <RouterLink to="/projects" class="btn btn-primary-glowing rounded-pill px-4 py-2-5 fw-bold transition-all shadow-none">
            Explore Projects
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right ms-2" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
            </svg>
          </RouterLink>
          <RouterLink to="/people" class="btn btn-outline-light-glowing rounded-pill px-4 py-2-5 fw-bold transition-all shadow-none">
            Meet the Team
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Stats Grid -->
    <div class="row g-4 mb-5">
      <!-- Stat card 1: Projects -->
      <div class="col-6 col-md-3">
        <div class="stat-card p-4 rounded-4 border border-white border-opacity-10 text-center transition-all h-100">
          <div class="stat-icon-wrapper mx-auto mb-3 bg-opacity-10 bg-info rounded-circle d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#4da3ff" class="bi bi-folder" viewBox="0 0 16 16">
              <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .996.91h10.348a1 1 0 0 0 .996-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"/>
            </svg>
          </div>
          <div class="display-6 fw-bold text-white mb-1">{{ totalProjects }}</div>
          <div class="text-white-50 small text-uppercase tracking-wider" style="font-size: 0.75rem;">Active Projects</div>
        </div>
      </div>
      
      <!-- Stat card 2: Team Members -->
      <div class="col-6 col-md-3">
        <div class="stat-card p-4 rounded-4 border border-white border-opacity-10 text-center transition-all h-100">
          <div class="stat-icon-wrapper mx-auto mb-3 bg-opacity-10 bg-warning rounded-circle d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#ffd200" class="bi bi-people" viewBox="0 0 16 16">
              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724C2.3 10.634 3.268 10 5 10zM6 8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m1-1a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
            </svg>
          </div>
          <div class="display-6 fw-bold text-white mb-1">{{ totalParticipants }}</div>
          <div class="text-white-50 small text-uppercase tracking-wider" style="font-size: 0.75rem;">Engineers</div>
        </div>
      </div>

      <!-- Stat card 3: Technologies -->
      <div class="col-6 col-md-3">
        <div class="stat-card p-4 rounded-4 border border-white border-opacity-10 text-center transition-all h-100">
          <div class="stat-icon-wrapper mx-auto mb-3 bg-opacity-10 bg-success rounded-circle d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#20c997" class="bi bi-cpu" viewBox="0 0 16 16">
              <path d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1a.5.5 0 0 1 .5.5v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1a.5.5 0 0 1-.5.5h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1a.5.5 0 0 1-.5-.5v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2V3h1.5a.5.5 0 0 1 0-1H14z"/>
            </svg>
          </div>
          <div class="display-6 fw-bold text-white mb-1">{{ totalSkills }}</div>
          <div class="text-white-50 small text-uppercase tracking-wider" style="font-size: 0.75rem;">Tech Skills</div>
        </div>
      </div>

      <!-- Stat card 4: Industries -->
      <div class="col-6 col-md-3">
        <div class="stat-card p-4 rounded-4 border border-white border-opacity-10 text-center transition-all h-100">
          <div class="stat-icon-wrapper mx-auto mb-3 bg-opacity-10 bg-danger rounded-circle d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#f03e3e" class="bi bi-briefcase" viewBox="0 0 16 16">
              <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5m1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5"/>
            </svg>
          </div>
          <div class="display-6 fw-bold text-white mb-1">2</div>
          <div class="text-white-50 small text-uppercase tracking-wider" style="font-size: 0.75rem;">Core Industries</div>
        </div>
      </div>
    </div>

    <!-- Core Pillars (IT & Embedded) -->
    <section class="mb-5 py-4">
      <div class="text-center mb-5">
        <h2 class="h3 fw-bold text-white mb-2">Our Engineering Domains</h2>
        <p class="text-white-50 small mx-auto" style="max-width: 480px;">
          Empowering builders across two distinct domains of modern industrial engineering.
        </p>
      </div>
      
      <div class="row g-4">
        <!-- Pillar 1: IT -->
        <div class="col-md-6">
          <div class="card h-100 border border-white border-opacity-10 rounded-4 p-4 d-flex flex-column justify-content-between position-relative overflow-hidden domain-card hover-it">
            <div class="domain-glow it-glow"></div>
            <div class="position-relative z-2">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <span class="badge bg-primary bg-opacity-25 text-cyan border border-info border-opacity-25 px-3 py-1-5 rounded-pill text-uppercase tracking-wider small fw-bold" style="font-size: 0.7rem;">
                  IT Infrastructure
                </span>
                <div class="domain-bullet" style="background-color: #4da3ff;"></div>
              </div>
              <h3 class="h4 fw-bold text-white mb-3">Information Technology</h3>
              <p class="text-white-50 mb-4 line-height-relaxed" style="font-size: 0.95rem;">
                Building digital backbones, cognitive applications, and automated screening frameworks. From NLP-driven models to responsive web applications and secure databases, our software engineers architect solutions that connect, classify, and optimize.
              </p>
              <div class="mb-4">
                <div class="small text-white-50 fw-semibold mb-2">Key Competencies</div>
                <div class="d-flex flex-wrap gap-2">
                  <span class="tech-badge">Python</span>
                  <span class="tech-badge">Machine Learning</span>
                  <span class="tech-badge">NLP</span>
                  <span class="tech-badge">MongoDB</span>
                  <span class="tech-badge">Web Dev</span>
                  <span class="tech-badge">Flutter</span>
                </div>
              </div>
            </div>
            <div class="position-relative z-2 mt-auto">
              <RouterLink to="/projects" class="btn btn-sm btn-outline-light rounded-pill px-3 py-1-5 fw-semibold transition-all">
                View IT Projects
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Pillar 2: Embedded -->
        <div class="col-md-6">
          <div class="card h-100 border border-white border-opacity-10 rounded-4 p-4 d-flex flex-column justify-content-between position-relative overflow-hidden domain-card hover-embedded">
            <div class="domain-glow embedded-glow"></div>
            <div class="position-relative z-2">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <span class="badge bg-warning bg-opacity-25 text-gold border border-warning border-opacity-25 px-3 py-1-5 rounded-pill text-uppercase tracking-wider small fw-bold" style="font-size: 0.7rem;">
                  Cyber-Physical Systems
                </span>
                <div class="domain-bullet" style="background-color: #ffd200;"></div>
              </div>
              <h3 class="h4 fw-bold text-white mb-3">Embedded Systems</h3>
              <p class="text-white-50 mb-4 line-height-relaxed" style="font-size: 0.95rem;">
                Developing high-precision mechanical intelligence and real-time firmware execution. Our hardware division works directly on microcontrollers, sensor-fusion loops, and custom servo controls to build hands-on robotics, smart nodes, and physical devices.
              </p>
              <div class="mb-4">
                <div class="small text-white-50 fw-semibold mb-2">Key Competencies</div>
                <div class="d-flex flex-wrap gap-2">
                  <span class="tech-badge">C/C++</span>
                  <span class="tech-badge">STM32CubeIDE</span>
                  <span class="tech-badge">Firmware</span>
                  <span class="tech-badge">ROS2</span>
                  <span class="tech-badge">Sensors</span>
                  <span class="tech-badge">IMU Calib</span>
                </div>
              </div>
            </div>
            <div class="position-relative z-2 mt-auto">
              <RouterLink to="/projects" class="btn btn-sm btn-outline-light rounded-pill px-3 py-1-5 fw-semibold transition-all">
                View Embedded Projects
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="mb-5 py-4">
      <div class="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h2 class="h3 fw-bold text-white mb-2">Featured Projects</h2>
          <p class="text-white-50 small mb-0">Discover some of the flagship projects built during our program.</p>
        </div>
        <RouterLink to="/projects" class="btn btn-sm btn-link text-cyan text-decoration-none fw-semibold d-flex align-items-center">
          View All Projects
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-chevron-right ms-1" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
          </svg>
        </RouterLink>
      </div>

      <div class="row g-4">
        <div v-for="(project, index) in featuredProjects" :key="index" class="col-md-4">
          <div class="card h-100 border border-white border-opacity-10 bg-white bg-opacity-5 rounded-4 p-4 hover-profile-card transition-all d-flex flex-column justify-content-between" style="background-color: rgba(255, 255, 255, 0.03) !important;">
            <div>
              <!-- Category and indicator -->
              <div class="d-flex justify-content-between align-items-center mb-3">
                <span class="text-uppercase tracking-wider small fw-semibold" :class="project.category.includes('IT') ? 'text-cyan' : 'text-gold'" style="font-size: 0.75rem;">
                  {{ project.category }}
                </span>
                <div class="project-dot" :style="project.category.includes('IT') ? 'background-color: #4da3ff;' : 'background-color: #ffd200;'"></div>
              </div>
              <!-- Title -->
              <h4 class="h5 fw-bold text-white mb-2">{{ project.title }}</h4>
              <!-- Description -->
              <p class="text-white-50 small line-height-relaxed text-truncate-3 mb-3">
                {{ project.description || 'This innovative project explores key technical challenges, bringing software intelligence or embedded firmware execution to solve industrial and consumer demands.' }}
              </p>
            </div>
            <!-- Tech Badges -->
            <div class="mt-auto pt-3 border-top border-white border-opacity-5">
              <div class="d-flex flex-wrap gap-1">
                <span v-for="skill in (project.skills ? project.skills.slice(0, 3) : [])" :key="skill" class="featured-skill-badge">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Team Members -->
    <section class="mb-5 py-4">
      <div class="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h2 class="h3 fw-bold text-white mb-2">Pioneering Techblazers</h2>
          <p class="text-white-50 small mb-0">Meet the engineers who are bringing these concepts to life.</p>
        </div>
        <RouterLink to="/people" class="btn btn-sm btn-link text-gold text-decoration-none fw-semibold d-flex align-items-center">
          Meet the Entire Team
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-chevron-right ms-1" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
          </svg>
        </RouterLink>
      </div>

      <div class="row g-4">
        <div v-for="(p, index) in featuredParticipants" :key="index" class="col-md-4">
          <div class="card h-100 border border-white border-opacity-10 rounded-4 p-4 text-center hover-profile-card transition-all d-flex flex-column justify-content-between" style="background-color: rgba(255, 255, 255, 0.03) !important;">
            <div>
              <!-- Avatar Image or Initials -->
              <img
                v-if="p.profilePicture"
                :src="getProfilePictureUrl(p.profilePicture)"
                :alt="p.name"
                class="mx-auto mb-3 rounded-circle object-fit-cover border border-white border-opacity-10"
                style="width: 64px; height: 64px;"
              />
              <div
                v-else
                class="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle border border-white border-opacity-10 text-white fw-bold"
                :style="p.industry === 'IT' ? 'background-color: rgba(77, 163, 255, 0.1); color: #4da3ff !important; width: 64px; height: 64px; font-size: 1.25rem;' : 'background-color: rgba(255, 210, 0, 0.1); color: #ffd200 !important; width: 64px; height: 64px; font-size: 1.25rem;'"
              >
                {{ getInitials(p.name) }}
              </div>
              <!-- Name -->
              <h4 class="h5 fw-bold text-white mb-1">{{ p.name }}</h4>
              <!-- Industry / Domain Role -->
              <span class="badge rounded-pill mb-3" :class="p.industry === 'IT' ? 'bg-primary bg-opacity-25 text-cyan border border-info border-opacity-10' : 'bg-warning bg-opacity-25 text-gold border border-warning border-opacity-10'" style="font-size: 0.7rem; font-weight: 600;">
                {{ p.industry }} Specialist
              </span>
              <!-- Description -->
              <p class="text-white-50 small line-height-relaxed mb-3">
                {{ p.description }}
              </p>
            </div>
            <!-- Primary Skill Badges -->
            <div class="mt-auto pt-3 border-top border-white border-opacity-5">
              <div class="d-flex flex-wrap justify-content-center gap-1">
                <span v-for="skill in p.skills.slice(0, 3)" :key="skill" class="featured-skill-badge">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack / Skills spectrum -->
    <section class="mb-5 py-4 text-center">
      <div class="mb-4">
        <h2 class="h4 fw-bold text-white mb-2">Our Technology Spectrum</h2>
        <p class="text-white-50 small mx-auto" style="max-width: 480px;">
          A comprehensive toolkit built to design hardware precision and cloud-scale intelligence.
        </p>
      </div>
      
      <div class="d-flex flex-wrap justify-content-center gap-2" style="max-width: 800px; margin: 0 auto;">
        <span v-for="skill in uniqueSkills" :key="skill" class="skill-chip border border-white border-opacity-10 px-3 py-1-5 rounded-pill text-white-50 transition-all font-monospace" style="font-size: 0.8rem; background-color: rgba(255,255,255,0.02);">
          {{ skill }}
        </span>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-section {
  background-color: rgba(3, 35, 75, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
}

.glow-blob {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.12;
  pointer-events: none;
  z-index: 1;
}
.glow-it {
  background: #4da3ff;
  top: -80px;
  left: -80px;
}
.glow-embedded {
  background: #ffd200;
  bottom: -80px;
  right: -80px;
}

.pulse-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #4da3ff;
  box-shadow: 0 0 0 0 rgba(77, 163, 255, 0.7);
  animation: pulse 1.8s infinite;
}
@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(77, 163, 255, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 8px rgba(77, 163, 255, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(77, 163, 255, 0);
  }
}

.hero-title {
  letter-spacing: -0.03em;
  line-height: 1.2;
}

.gradient-text-it {
  background: linear-gradient(135deg, #4da3ff 0%, #00e5ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gradient-text-embedded {
  background: linear-gradient(135deg, #ffd200 0%, #ffaa00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.btn-primary-glowing {
  background: linear-gradient(135deg, #03234b 0%, #004da3 100%);
  border: 1px solid rgba(77, 163, 255, 0.3);
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(0, 77, 163, 0.3);
}
.btn-primary-glowing:hover {
  background: linear-gradient(135deg, #004da3 0%, #0066cc 100%);
  border-color: rgba(77, 163, 255, 0.6);
  color: #ffffff;
  box-shadow: 0 6px 20px rgba(77, 163, 255, 0.4);
  transform: translateY(-2px);
}

.btn-outline-light-glowing {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}
.btn-outline-light-glowing:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.3);
  color: #ffffff;
  transform: translateY(-2px);
}

.stat-card {
  background-color: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(8px);
  transition: transform 0.3s ease, border-color 0.3s ease, background-color 0.3s ease;
}
.stat-card:hover {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2) !important;
  transform: translateY(-4px);
}

.domain-card {
  background-color: rgba(255, 255, 255, 0.02) !important;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s ease, box-shadow 0.4s ease;
}
.domain-glow {
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.05;
  pointer-events: none;
  z-index: 1;
  transition: opacity 0.4s ease;
}
.it-glow {
  background: #4da3ff;
  top: -40px;
  left: -40px;
}
.embedded-glow {
  background: #ffd200;
  bottom: -40px;
  right: -40px;
}

.domain-bullet {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.tech-badge {
  background-color: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.7);
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  font-size: 0.75rem;
}

.hover-it:hover {
  border-color: rgba(77, 163, 255, 0.3) !important;
  box-shadow: 0 10px 30px rgba(77, 163, 255, 0.15);
  transform: translateY(-4px);
}
.hover-it:hover .it-glow {
  opacity: 0.15;
}

.hover-embedded:hover {
  border-color: rgba(255, 210, 0, 0.3) !important;
  box-shadow: 0 10px 30px rgba(255, 210, 0, 0.15);
  transform: translateY(-4px);
}
.hover-embedded:hover .embedded-glow {
  opacity: 0.15;
}

.hover-profile-card {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease;
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

.project-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.text-truncate-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.skill-chip {
  cursor: default;
  transition: all 0.25s ease;
}
.skill-chip:hover {
  background-color: rgba(255, 255, 255, 0.08) !important;
  color: #ffffff !important;
  border-color: rgba(255, 255, 255, 0.25) !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.font-monospace {
  font-family: var(--bs-font-monospace);
}

.py-2-5 {
  padding-top: 0.65rem;
  padding-bottom: 0.65rem;
}
.py-1-5 {
  padding-top: 0.35rem;
  padding-bottom: 0.35rem;
}

.featured-skill-badge {
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.65rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}
</style>
