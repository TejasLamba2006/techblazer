<template>
  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #03234b">
    <div class="container">
      <RouterLink class="navbar-brand d-flex align-items-center" to="/">
        <img
          src="../static/ST_logo_2024_blue.jpg"
          alt="STMicroelectronics"
          class="object-fit-contain"
          style="height: 2rem"
        />
        <span class="ms-2"><b>TechBlazers</b></span>
      </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/projects">Projects</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/people">People</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
