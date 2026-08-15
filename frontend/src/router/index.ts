import { createRouter, createWebHistory } from 'vue-router'

// Import Halaman
import LoginView from '@/pages/login.vue'
import EmployeeView from '@/pages/employees/index.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresGuest: true }, // Hanya bisa diakses jika BELUM login
  },
  {
    path: '/employees',
    name: 'employees',
    component: EmployeeView,
    meta: { requiresAuth: true }, // Wajib LOGIN untuk mengakses
  },
  {
    path: '/',
    redirect: '/employees',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Global Navigation Guard
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('access_token')

  // 1. Jika halaman butuh Auth tapi user belum punya token -> Lempar ke Login
  if (to.meta.requiresAuth && !token) {
    return next({ name: 'login' })
  }

  // 2. Jika user SUDAH login tapi mencoba buka halaman Login lagi -> Lempar ke Employees
  if (to.meta.requiresGuest && token) {
    return next({ name: 'employees' })
  }

  // Lanjut navigasi normal
  next()
})

export default router