import { test } from '@japa/runner'
import { DateTime } from 'luxon'
import testUtils from '@adonisjs/core/services/test_utils'
import Employee from '../../app/modules/employees/models/employee.ts'
import User from '../../app/models/user.ts'
import Leave from '../../app/modules/leaves/models/leave.ts'

test.group('POST /api/leaves', (group) => {
  // Setiap test jalan di dalam transaksi yang otomatis di-rollback,
  // jadi antar test tidak saling ganggu data.
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  /**
   * Helper: bikin 1 employee + 1 user (role employee) yang sudah login,
   * dipakai berulang di banyak test di bawah.
   */
  async function createLoggedInEmployee() {
    const employee = await Employee.create({
      nip: 'TEST001',
      name: 'Karyawan Uji Coba',
      email: `test-${Date.now()}@company.com`,
      position: 'Staff',
      status: 'active',
      joinDate: DateTime.fromISO('2024-01-01'),
    })

    const user = await User.create({
      fullName: employee.name,
      email: employee.email,
      password: 'password123',
      role: 'employee',
      employeeId: employee.id,
    })

    return { employee, user }
  }

  test('menolak request tanpa login', async ({ client }) => {
    const response = await client.post('/api/leaves').json({
      employeeId: 1,
      leaveType: 'Tahunan',
      startDate: '2026-09-01',
      endDate: '2026-09-03',
    })

    response.assertStatus(401)
  })

  test('berhasil membuat pengajuan cuti dengan payload valid', async ({ client, assert }) => {
    const { employee, user } = await createLoggedInEmployee()

    const response = await client
      .post('/api/leaves')
      .loginAs(user)
      .json({
        employeeId: employee.id,
        leaveType: 'Tahunan',
        startDate: '2026-09-01',
        endDate: '2026-09-03',
        reason: 'Liburan keluarga',
      })

    response.assertStatus(201)
    response.assertBodyContains({ status: 'success', data: { status: 'pending' } })

    const leave = await Leave.query().where('employeeId', employee.id).firstOrFail()
    assert.equal(leave.status, 'pending')
  })

  test('menolak payload yang tidak lengkap (validasi)', async ({ client }) => {
    const { user } = await createLoggedInEmployee()

    const response = await client
      .post('/api/leaves')
      .loginAs(user)
      .json({
        // employeeId & leaveType sengaja tidak dikirim
        startDate: '2026-09-01',
        endDate: '2026-09-03',
      })

    response.assertStatus(422)
  })

  test('menolak jika endDate sebelum startDate', async ({ client }) => {
    const { employee, user } = await createLoggedInEmployee()

    const response = await client
      .post('/api/leaves')
      .loginAs(user)
      .json({
        employeeId: employee.id,
        leaveType: 'Tahunan',
        startDate: '2026-09-05',
        endDate: '2026-09-01', // sebelum startDate
      })

    response.assertStatus(400)
    response.assertBodyContains({ status: 'error' })
  })

  test('menolak jika tanggal cuti tumpang tindih dengan pengajuan lain', async ({ client }) => {
    const { employee, user } = await createLoggedInEmployee()

    // Pengajuan pertama, status pending, tanggal 10-15 September
    await Leave.create({
      employeeId: employee.id,
      leaveType: 'Tahunan',
      startDate: DateTime.fromISO('2026-09-10'),
      endDate: DateTime.fromISO('2026-09-15'),
      status: 'pending',
    })

    // Pengajuan kedua, tanggal 12-13 September -> tumpang tindih
    const response = await client
      .post('/api/leaves')
      .loginAs(user)
      .json({
        employeeId: employee.id,
        leaveType: 'Sakit',
        startDate: '2026-09-12',
        endDate: '2026-09-13',
      })

    response.assertStatus(400)
    response.assertBodyContains({ status: 'error' })
  })

  test('menolak jika sisa kuota cuti tahun berjalan tidak cukup', async ({ client }) => {
    const { employee, user } = await createLoggedInEmployee()

    // Sudah pakai 10 hari cuti approved di tahun 2026 (kuota default 12)
    await Leave.create({
      employeeId: employee.id,
      leaveType: 'Tahunan',
      startDate: DateTime.fromISO('2026-01-05'),
      endDate: DateTime.fromISO('2026-01-14'), // 10 hari
      status: 'approved',
    })

    // Minta 5 hari lagi -> 10 + 5 = 15 > 12, harus ditolak
    const response = await client
      .post('/api/leaves')
      .loginAs(user)
      .json({
        employeeId: employee.id,
        leaveType: 'Tahunan',
        startDate: '2026-10-01',
        endDate: '2026-10-05',
      })

    response.assertStatus(400)
    response.assertBodyContains({ status: 'error' })
  })

  test('mengizinkan cuti baru jika masih dalam sisa kuota', async ({ client }) => {
    const { employee, user } = await createLoggedInEmployee()

    // Sudah pakai 5 hari approved
    await Leave.create({
      employeeId: employee.id,
      leaveType: 'Tahunan',
      startDate: DateTime.fromISO('2026-01-05'),
      endDate: DateTime.fromISO('2026-01-09'), // 5 hari
      status: 'approved',
    })

    // Minta 3 hari lagi -> 5 + 3 = 8 <= 12, harus diterima
    const response = await client
      .post('/api/leaves')
      .loginAs(user)
      .json({
        employeeId: employee.id,
        leaveType: 'Tahunan',
        startDate: '2026-10-01',
        endDate: '2026-10-03',
      })

    response.assertStatus(201)
  })
})