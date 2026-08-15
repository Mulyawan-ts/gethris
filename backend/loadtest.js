import http from 'k6/http'
import { check, sleep } from 'k6'

// Konfigurasi pengujian
export const options = {
  stages: [
    { duration: '5s', target: 20 }, // Naik ke 20 user dalam 5 detik awal
    { duration: '10s', target: 100 }, // Naik lagi ke 100 user dalam 10 detik
    { duration: '5s', target: 0 }, // Turun kembali ke 0 user (selesai)
  ],
}

export default function () {
  // Masukkan token kamu di Header Authorization
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization':
        'Bearer oat_Mg.WVRMNmJxci1KdURpT0hwZzQ2eTg1WXJRX3VjU1V0NGQtRTZId3pZWTQ0NjU1MjY3Ng',
    },
  }

  // Tembak endpoint API Employees
  const res = http.get('http://localhost:3333/api/employees', params)

  // Pengujian kriteria sukses (Response harus 200 OK)
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  })

  // Jeda tipis 0.1 detik antar request agar simulasi seperti user asli
  sleep(0.1)
}
