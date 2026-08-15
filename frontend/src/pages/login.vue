<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/composables/useApi'
import { useToast } from '@/composables/useToast'
import BaseCard from '@/components/common/BaseCard.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const router = useRouter()
const toast = useToast()

const form = ref({
  email: '',
  password: '',
})

const errors = ref({
  email: '',
  password: '',
})

const isLoading = ref(false)

const handleLogin = async () => {
  errors.value = { email: '', password: '' }

  // Simple Front-end Validation
  if (!form.value.email) {
    errors.value.email = 'Email wajib diisi'
  }
  if (!form.value.password) {
    errors.value.password = 'Password wajib diisi'
  }
  if (errors.value.email || errors.value.password) return

  isLoading.value = true

  try {
    // Post credentials ke Backend AdonisJS (e.g., POST /api/auth/login)
    const response = await api('/api/auth/login', {
      method: 'POST',
      body: form.value,
    })

    // Simpan access_token ke localStorage
    const token = response.data?.token || response.token
    if (token) {
      localStorage.setItem('access_token', token)
      toast.success('Login berhasil! Selamat datang kembali.')

      // Redirect ke halaman kelola karyawan
      router.push('/employees')
    }
  } catch (err: any) {
    // Tangkap error validasi jika dikirim dari VineJS
    if (err.data?.errors) {
      err.data.errors.forEach((e: { field: string; message: string }) => {
        if (e.field in errors.value) {
          errors.value[e.field as keyof typeof errors.value] = e.message
        }
      })
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
    <div class="w-full" style="max-width: 400px">
      <!-- Logo / Title Header -->
      <div class="text-center mb-4">
        <h2 class="fw-bold text-primary">GET-HRIS</h2>
        <p class="text-muted small">Masuk ke akun administrator kamu</p>
      </div>

      <!-- Login Card -->
      <BaseCard>
        <form @submit.prevent="handleLogin">
          <BaseInput
            v-model="form.email"
            type="email"
            label="Email Address"
            placeholder="admin@company.com"
            required
            :error="errors.email"
          />

          <BaseInput
            v-model="form.password"
            type="password"
            label="Password"
            placeholder="••••••••"
            required
            :error="errors.password"
          />

          <div class="d-grid mt-4">
            <BaseButton type="submit" variant="primary" size="lg" :loading="isLoading">
              Masuk
            </BaseButton>
          </div>
        </form>
      </BaseCard>

      <!-- Footer Info -->
      <p class="text-center text-muted small mt-4">
        &copy; 2026 GET-HRIS System. All rights reserved.
      </p>
    </div>
  </div>
</template>
