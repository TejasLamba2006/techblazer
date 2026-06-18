<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const PASSWORD_KEY = 'tb_site_auth'
const CORRECT_PASSWORD = 'techblazers' // Common password

const passwordInput = ref('')
const isAuthenticated = ref(false)
const showError = ref(false)
const showPassword = ref(false)

onMounted(() => {
  const storedAuth = localStorage.getItem(PASSWORD_KEY)
  if (storedAuth === 'true') {
    isAuthenticated.value = true
  }
})

const handleLogin = () => {
  if (passwordInput.value === CORRECT_PASSWORD) {
    localStorage.setItem(PASSWORD_KEY, 'true')
    isAuthenticated.value = true
    showError.value = false
  } else {
    showError.value = true
    // Reset shake animation class after it plays (400ms)
    setTimeout(() => {
      showError.value = false
    }, 450)
  }
}
</script>

<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <!-- Authenticated Layout -->
    <template v-if="isAuthenticated">
      <Navbar />
      <main class="container flex-grow-1 py-4">
        <RouterView />
      </main>
      <Footer />
    </template>

    <!-- Password Gate Screen -->
    <template v-else>
      <div
        class="login-container d-flex align-items-center justify-content-center flex-grow-1 position-relative overflow-hidden"
      >
        <!-- Glowing background blobs -->
        <div class="login-glow glow-1"></div>
        <div class="login-glow glow-2"></div>

        <div
          class="login-card p-4 p-sm-5 rounded-5 border border-white border-opacity-10 text-center position-relative z-2 mx-3"
          :class="{ 'shake-animation': showError }"
        >
          <!-- Logo & Branding -->
          <div class="mb-4">
            <img
              src="./static/ST_logo_2024_blue.jpg"
              alt="STMicroelectronics"
              class="object-fit-contain mb-3"
              style="height: 3.5rem"
            />
            <h1 class="h3 fw-bold text-white mb-2 tracking-tight">TechBlazers Portal</h1>
            <p class="text-white-50 small mb-0">Enter the access password to enter the hub.</p>
          </div>

          <!-- Password Input Form -->
          <form @submit.prevent="handleLogin" class="mt-4">
            <div class="position-relative mb-3">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="passwordInput"
                class="form-control login-input rounded-pill pe-5 py-2-5 text-center text-white"
                placeholder="Password"
                autocomplete="current-password"
                required
              />
              <button
                type="button"
                class="btn-eye btn btn-link text-white-50 p-0 position-absolute end-0 top-50 translate-middle-y me-3 shadow-none border-0"
                @click="showPassword = !showPassword"
                aria-label="Toggle password visibility"
              >
                <!-- Eye open -->
                <svg
                  v-if="showPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  class="bi bi-eye-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                  <path
                    d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"
                  />
                </svg>
                <!-- Eye closed -->
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  class="bi bi-eye-slash-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474L2.234 4.317a.73.73 0 0 1 .187-.026h.111l.088.007a5.5 5.5 0 0 0 7.778 7.778q.008.08.007.163v.111a.7.7 0 0 1-.038.167M4.17 9.057a2.5 2.5 0 0 0 3.486 3.486z"
                  />
                  <path
                    d="M12.454 12.454A8.5 8.5 0 0 0 8 2.5a8.5 8.5 0 0 0-4.454 1.258L1.832 1.482A9 9 0 0 1 8 1a9 9 0 0 1 9 9 9 9 0 0 1-4.546 3.454z"
                  />
                </svg>
              </button>
            </div>

            <!-- Error message -->
            <div class="error-wrapper mb-3" style="min-height: 20px">
              <span v-if="showError" class="text-danger small fw-semibold"
                >Incorrect password. Please try again.</span
              >
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="btn btn-primary-glowing rounded-pill w-100 py-2-5 fw-bold transition-all border-0"
            >
              Enter Hub
            </button>
          </form>
        </div>
      </div>
    </template>
  </div>
</template>

<style>
body {
  background-color: #0b1329 !important;
  color: #f8f9fa !important;
}

/* Glowing background blobs for login screen */
.login-glow {
  position: absolute;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.12;
  pointer-events: none;
  z-index: 1;
}
.glow-1 {
  background: #4da3ff;
  top: 15%;
  left: 15%;
}
.glow-2 {
  background: #ffd200;
  bottom: 15%;
  right: 15%;
}

/* Glassmorphism Card style */
.login-card {
  background: rgba(15, 23, 42, 0.75) !important;
  backdrop-filter: blur(25px);
  max-width: 420px;
  width: 100%;
  box-shadow:
    0 30px 70px rgba(0, 0, 0, 0.7),
    0 0 60px rgba(77, 163, 255, 0.1) !important;
}

/* Input text fields styling */
.login-input {
  background-color: rgba(255, 255, 255, 0.02) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}
.login-input:focus {
  background-color: rgba(255, 255, 255, 0.04) !important;
  border-color: rgba(77, 163, 255, 0.4) !important;
  box-shadow: 0 0 15px rgba(77, 163, 255, 0.25) !important;
  color: #ffffff !important;
}

/* Buttons style */
.btn-primary-glowing {
  background: linear-gradient(135deg, #03234b 0%, #004da3 100%);
  border: 1px solid rgba(77, 163, 255, 0.3) !important;
  color: #ffffff !important;
  box-shadow: 0 4px 15px rgba(0, 77, 163, 0.4);
}
.btn-primary-glowing:hover {
  background: linear-gradient(135deg, #004da3 0%, #0066cc 100%);
  border-color: rgba(77, 163, 255, 0.6) !important;
  box-shadow: 0 6px 20px rgba(77, 163, 255, 0.5);
  transform: translateY(-2px);
}

.btn-eye:hover {
  color: #ffffff !important;
}

/* Shake animation on incorrect password */
.shake-animation {
  animation: shake 0.4s ease-in-out;
}
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20%,
  60% {
    transform: translateX(-8px);
  }
  40%,
  80% {
    transform: translateX(8px);
  }
}

.py-2-5 {
  padding-top: 0.65rem;
  padding-bottom: 0.65rem;
}
</style>
