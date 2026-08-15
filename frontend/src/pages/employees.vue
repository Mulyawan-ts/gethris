<script setup lang="ts">
import { ref } from 'vue'
import BaseCard from '@/components/common/BaseCard.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { useToast } from '@/composables/useToast'

const toast = useToast()

// State Data Form Karyawan
const form = ref({
  name: '',
  email: '',
  position: '',
  joinDate: '',
})

// State Error Validasi (Simulasi dari VineJS Backend)
const errors = ref({
  name: '',
  email: '',
  position: '',
  joinDate: '',
})

const isLoading = ref(false)

// Data Dummy Karyawan
const employees = ref([
  {
    id: 1,
    nip: 'EMP-202608-001',
    name: 'Budi Santoso',
    email: 'budi@company.com',
    position: 'Software Engineer',
    joinDate: '2026-01-15',
    status: 'Active',
  },
  {
    id: 2,
    nip: 'EMP-202608-002',
    name: 'Siti Rahma',
    email: 'siti@company.com',
    position: 'UI/UX Designer',
    joinDate: '2026-02-01',
    status: 'Active',
  },
])

// Handle Submit Form
const handleSubmit = () => {
  // Reset errors
  errors.value = { name: '', email: '', position: '', joinDate: '' }

  // Simple Validation Check
  if (!form.value.name) {
    errors.value.name = 'Nama lengkap wajib diisi'
    toast.error('Mohon lengkapi data yang masih kosong', 'Validasi Gagal')
    return
  }

  isLoading.value = true

  // Simulasi Request API Backend AdonisJS
  setTimeout(() => {
    employees.value.unshift({
      id: Date.now(),
      nip: `EMP-202608-00${employees.value.length + 1}`,
      name: form.value.name,
      email: form.value.email || 'user@company.com',
      position: form.value.position || 'Staff',
      joinDate: form.value.joinDate || '2026-08-15',
      status: 'Active',
    })

    // Reset Form
    form.value = { name: '', email: '', position: '', joinDate: '' }
    isLoading.value = false

    // Trigger Toast Alert
    toast.success('Data karyawan berhasil ditambahkan!', 'Sukses')
  }, 800)
}

const handleDelete = (id: number) => {
  employees.value = employees.value.filter((emp) => emp.id !== id)
  toast.warning('Data karyawan telah dihapus', 'Informasi')
}
</script>

<template>
  <div class="container py-4">
    <!-- Header Page -->
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div>
        <h3 class="fw-bold mb-1">Kelola Data Karyawan</h3>
        <p class="text-muted mb-0">Manajemen daftar anggota tim & informasi presensi HRIS</p>
      </div>
    </div>

    <!-- Ringkasan Statistik (Card Widgets) -->
    <div class="row g-3 mb-4">
      <div class="col-md-4">
        <BaseCard>
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <small class="text-muted fw-bold text-uppercase">Total Karyawan</small>
              <h2 class="fw-bold mb-0 mt-1">{{ employees.length }}</h2>
            </div>
            <span class="badge bg-primary-subtle text-primary p-2 fs-6">👥</span>
          </div>
        </BaseCard>
      </div>

      <div class="col-md-4">
        <BaseCard>
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <small class="text-muted fw-bold text-uppercase">Status Aktif</small>
              <h2 class="fw-bold mb-0 mt-1 text-success">{{ employees.length }}</h2>
            </div>
            <span class="badge bg-success-subtle text-success p-2 fs-6">✅</span>
          </div>
        </BaseCard>
      </div>

      <div class="col-md-4">
        <BaseCard>
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <small class="text-muted fw-bold text-uppercase">Departemen</small>
              <h2 class="fw-bold mb-0 mt-1 text-info">3</h2>
            </div>
            <span class="badge bg-info-subtle text-info p-2 fs-6">🏢</span>
          </div>
        </BaseCard>
      </div>
    </div>

    <!-- Form & Table Section -->
    <div class="row g-4">
      <!-- Left Column: Form Tambah Karyawan -->
      <div class="col-lg-4">
        <BaseCard title="Tambah Karyawan Baru" subtitle="Input data identitas staf">
          <form @submit.prevent="handleSubmit">
            <BaseInput
              v-model="form.name"
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkap"
              required
              :error="errors.name"
            />

            <BaseInput
              v-model="form.email"
              type="email"
              label="Alamat Email"
              placeholder="email@company.com"
              :error="errors.email"
            />

            <BaseInput
              v-model="form.position"
              label="Jabatan / Posisi"
              placeholder="Misal: Frontend Developer"
              :error="errors.position"
            />

            <BaseInput
              v-model="form.joinDate"
              type="date"
              label="Tanggal Bergabung"
              :error="errors.joinDate"
            />

            <div class="d-grid mt-4">
              <BaseButton type="submit" variant="primary" :loading="isLoading">
                Simpan Data Karyawan
              </BaseButton>
            </div>
          </form>
        </BaseCard>
      </div>

      <!-- Right Column: Tabel Data Karyawan -->
      <div class="col-lg-8">
        <BaseCard title="Daftar Karyawan Aktif">
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th>NIP</th>
                  <th>Nama & Email</th>
                  <th>Jabatan</th>
                  <th>Status</th>
                  <th class="text-end">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="emp in employees" :key="emp.id">
                  <td>
                    <code class="fw-bold text-dark">{{ emp.nip }}</code>
                  </td>
                  <td>
                    <div class="fw-semibold">{{ emp.name }}</div>
                    <small class="text-muted">{{ emp.email }}</small>
                  </td>
                  <td>{{ emp.position }}</td>
                  <td>
                    <span class="badge bg-success-subtle text-success border border-success-subtle">
                      {{ emp.status }}
                    </span>
                  </td>
                  <td class="text-end">
                    <BaseButton variant="outline-primary" size="sm" class="me-1"> Edit </BaseButton>
                    <BaseButton variant="danger" size="sm" @click="handleDelete(emp.id)">
                      Hapus
                    </BaseButton>
                  </td>
                </tr>
                <tr v-if="employees.length === 0">
                  <td colspan="5" class="text-center py-4 text-muted">Belum ada data karyawan.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
