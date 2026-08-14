<script setup lang="ts">
import { ref } from 'vue'

const isSidebarCollapsed = ref(false)

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}
</script>

<template>
  <div class="d-flex min-vh-100 bg-light">
    <!-- 1. SIDEBAR HRIS -->
    <aside
      class="bg-dark text-white p-3 d-flex flex-column transition-all"
      :style="{ width: isSidebarCollapsed ? '80px' : '260px' }"
    >
      <!-- Brand Logo -->
      <div class="d-flex align-items-center justify-content-between mb-4 px-2">
        <div class="d-flex align-items-center gap-2 overflow-hidden">
          <i class="bi bi-people-fill fs-3 text-primary"></i>
          <span v-if="!isSidebarCollapsed" class="fw-bold fs-5 text-nowrap">GET-HRIS</span>
        </div>
      </div>

      <hr class="text-secondary my-2" />

      <!-- Navigation Menu -->
      <ul class="nav nav-pills flex-column mb-auto mt-2">
        <li class="nav-item mb-1">
          <a href="#" class="nav-link active d-flex align-items-center gap-3">
            <i class="bi bi-speedometer2 fs-5"></i>
            <span v-if="!isSidebarCollapsed">Dashboard</span>
          </a>
        </li>
        <li class="nav-item mb-1">
          <a href="#" class="nav-link text-white-50 d-flex align-items-center gap-3 hover-link">
            <i class="bi bi-person-badge fs-5"></i>
            <span v-if="!isSidebarCollapsed">Data Karyawan</span>
          </a>
        </li>
        <li class="nav-item mb-1">
          <a href="#" class="nav-link text-white-50 d-flex align-items-center gap-3 hover-link">
            <i class="bi bi-calendar-check fs-5"></i>
            <span v-if="!isSidebarCollapsed">Absensi & Kehadiran</span>
          </a>
        </li>
        <li class="nav-item mb-1">
          <a href="#" class="nav-link text-white-50 d-flex align-items-center gap-3 hover-link">
            <i class="bi bi-cash-stack fs-5"></i>
            <span v-if="!isSidebarCollapsed">Payroll / Gaji</span>
          </a>
        </li>
        <li class="nav-item mb-1">
          <a href="#" class="nav-link text-white-50 d-flex align-items-center gap-3 hover-link">
            <i class="bi bi-briefcase fs-5"></i>
            <span v-if="!isSidebarCollapsed">Pengajuan Cuti</span>
          </a>
        </li>
      </ul>

      <hr class="text-secondary" />

      <!-- User Info / Logout -->
      <div class="d-flex align-items-center justify-content-between px-2">
        <div class="d-flex align-items-center gap-2 overflow-hidden">
          <i class="bi bi-person-circle fs-4"></i>
          <div v-if="!isSidebarCollapsed" class="d-flex flex-column lh-sm">
            <span class="fw-bold small text-truncate">Admin HR</span>
            <small class="text-white-50 text-truncate" style="font-size: 11px"
              >hr@company.com</small
            >
          </div>
        </div>
      </div>
    </aside>

    <!-- 2. MAIN CONTENT AREA -->
    <div class="flex-grow-1 d-flex flex-column">
      <!-- Top Navbar -->
      <header class="navbar navbar-expand bg-white border-bottom px-4 py-2 shadow-sm">
        <button class="btn btn-light border-0 me-3" @click="toggleSidebar">
          <i class="bi bi-list fs-5"></i>
        </button>

        <h5 class="mb-0 fw-semibold text-secondary">Aplikasi HRIS</h5>

        <div class="ms-auto d-flex align-items-center gap-3">
          <button class="btn btn-light rounded-circle position-relative p-2">
            <i class="bi bi-bell fs-5"></i>
            <span
              class="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"
            ></span>
          </button>
        </div>
      </header>

      <!-- Main Dynamic Slot -->
      <main class="p-4 flex-grow-1">
        <slot />
      </main>

      <!-- Simple Footer -->
      <footer class="bg-white text-center py-2 border-top text-muted small">
        &copy; 2026 GET-HRIS System. All rights reserved.
      </footer>
    </div>
  </div>
</template>

<style scoped>
.transition-all {
  transition: width 0.25s ease-in-out;
}

.hover-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff !important;
}

.nav-link.active {
  background-color: #0d6efd !important;
}
</style>
