<template>
  <div>
    <!-- Header Halaman -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="fw-bold mb-1">Dashboard HRIS</h4>
        <p class="text-muted small mb-0">
          Selamat datang kembali, Admin! Berikut ringkasan hari ini.
        </p>
      </div>
      <button class="btn btn-primary d-flex align-items-center gap-2">
        <i class="bi bi-download"></i> Export Laporan
      </button>
    </div>

    <!-- 1. WIDGET STATISTIK -->
    <div class="row g-3 mb-4">
      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm p-3">
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <span class="text-muted small fw-semibold">Total Karyawan</span>
              <h3 class="fw-bold mb-0 mt-1">124</h3>
            </div>
            <div class="bg-primary-subtle text-primary p-3 rounded-circle">
              <i class="bi bi-people fs-4"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm p-3">
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <span class="text-muted small fw-semibold">Hadir Hari Ini</span>
              <h3 class="fw-bold mb-0 mt-1">112</h3>
            </div>
            <div class="bg-success-subtle text-success p-3 rounded-circle">
              <i class="bi bi-person-check fs-4"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm p-3">
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <span class="text-muted small fw-semibold">Sedang Cuti / Izin</span>
              <h3 class="fw-bold mb-0 mt-1">5</h3>
            </div>
            <div class="bg-warning-subtle text-warning p-3 rounded-circle">
              <i class="bi bi-calendar2-minus fs-4"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-xl-3">
        <div class="card border-0 shadow-sm p-3">
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <span class="text-muted small fw-semibold">Pending Cuti</span>
              <h3 class="fw-bold mb-0 mt-1">3</h3>
            </div>
            <div class="bg-danger-subtle text-danger p-3 rounded-circle">
              <i class="bi bi-clock-history fs-4"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. KONTEN UTAMA DUA KOLOM -->
    <div class="row g-3">
      <!-- Tabel Absensi Terbaru -->
      <div class="col-12 col-lg-8">
        <div class="card border-0 shadow-sm">
          <div
            class="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center"
          >
            <h6 class="fw-bold mb-0">Kehadiran Terbaru Hari Ini</h6>
            <a href="#" class="text-decoration-none small">Lihat Semua</a>
          </div>
          <div class="table-responsive">
            <table class="table align-middle table-hover mb-0">
              <thead class="table-light small">
                <tr>
                  <th>Nama Karyawan</th>
                  <th>Jabatan</th>
                  <th>Jam Masuk</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody class="small">
                <tr>
                  <td class="fw-semibold">Budi Santoso</td>
                  <td class="text-muted">Software Engineer</td>
                  <td>07:55 AM</td>
                  <td><span class="badge bg-success-subtle text-success">Tepat Waktu</span></td>
                </tr>
                <tr>
                  <td class="fw-semibold">Siti Rahma</td>
                  <td class="text-muted">HR Specialist</td>
                  <td>08:02 AM</td>
                  <td><span class="badge bg-success-subtle text-success">Tepat Waktu</span></td>
                </tr>
                <tr>
                  <td class="fw-semibold">Andi Wijaya</td>
                  <td class="text-muted">UI/UX Designer</td>
                  <td>08:25 AM</td>
                  <td><span class="badge bg-warning-subtle text-warning">Terlambat</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Pending Approval Widget -->
      <div class="col-12 col-lg-4">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white border-0 py-3">
            <h6 class="fw-bold mb-0">Persetujuan Cuti Baru</h6>
          </div>
          <div class="card-body p-0">
            <div class="list-group list-group-flush small">
              <div class="list-group-item p-3">
                <div class="d-flex justify-content-between mb-1">
                  <span class="fw-bold">Rian Hidayat</span>
                  <span class="text-muted">2 Hari</span>
                </div>
                <p class="text-muted mb-2">Cuti Tahunan (18 - 19 Ags)</p>
                <div class="d-flex gap-2">
                  <button class="btn btn-sm btn-success w-100">Setujui</button>
                  <button class="btn btn-sm btn-outline-danger w-100">Tolak</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
