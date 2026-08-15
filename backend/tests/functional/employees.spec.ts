import { test } from '@japa/runner'
import { DateTime } from 'luxon'
import testUtils from '@adonisjs/core/services/test_utils'
import Employee from '../../app/modules/employees/models/employee.ts'
import User from '../../app/models/user.ts'

test.group('Employees - Role Access Control', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  async function createUserWithRole(role: 'admin' | 'hr' | 'employee') {
    return User.create({
      fullName: `User ${role}`,
      email: `${role}-${Date.now()}@company.com`,
      password: 'password123',
      role,
    })
  }

  function validEmployeePayload() {
    return {
      name: 'Karyawan Baru',
      email: `karyawan-${Date.now()}@company.com`,
      position: 'Staff',
      department: 'IT',
      salary: 5000000,
      joinDate: '2026-01-01',
    }
  }

  // ---------- GET (semua role login boleh) ----------

  test('GET /api/employees menolak request tanpa login', async ({ client }) => {
    const response = await client.get('/api/employees')
    response.assertStatus(401)
  })

  test('GET /api/employees boleh diakses karyawan biasa', async ({ client }) => {
    const user = await createUserWithRole('employee')
    const response = await client.get('/api/employees').loginAs(user)
    response.assertStatus(200)
  })

  // ---------- POST (khusus admin/hr) ----------

  test('POST /api/employees ditolak untuk role employee', async ({ client }) => {
    const user = await createUserWithRole('employee')

    const response = await client
      .post('/api/employees')
      .loginAs(user)
      .json(validEmployeePayload())

    response.assertStatus(403)
  })

  test('POST /api/employees berhasil untuk role hr', async ({ client }) => {
    const user = await createUserWithRole('hr')

    const response = await client
      .post('/api/employees')
      .loginAs(user)
      .json(validEmployeePayload())

    response.assertStatus(201)
  })

  test('POST /api/employees berhasil untuk role admin', async ({ client }) => {
    const user = await createUserWithRole('admin')

    const response = await client
      .post('/api/employees')
      .loginAs(user)
      .json(validEmployeePayload())

    response.assertStatus(201)
  })

  // ---------- PUT (khusus admin/hr) ----------

  test('PUT /api/employees/:id ditolak untuk role employee', async ({ client }) => {
    const employee = await Employee.create({
      nip: 'EMPTEST01',
      name: 'Karyawan Lama',
      email: `lama-${Date.now()}@company.com`,
      position: 'Staff',
      status: 'active',
      joinDate: DateTime.fromISO('2024-01-01'),
    })

    const user = await createUserWithRole('employee')

    const response = await client
      .put(`/api/employees/${employee.id}`)
      .loginAs(user)
      .json({ position: 'Senior Staff' })

    response.assertStatus(403)
  })

  test('PUT /api/employees/:id berhasil untuk role admin', async ({ client }) => {
    const employee = await Employee.create({
      nip: 'EMPTEST02',
      name: 'Karyawan Lama',
      email: `lama2-${Date.now()}@company.com`,
      position: 'Staff',
      status: 'active',
      joinDate: DateTime.fromISO('2024-01-01'),
    })

    const user = await createUserWithRole('admin')

    const response = await client
      .put(`/api/employees/${employee.id}`)
      .loginAs(user)
      .json({ position: 'Senior Staff' })

    response.assertStatus(200)
  })

  // ---------- DELETE (khusus admin/hr) — ini bug yang kita perbaiki di awal ----------

  test('DELETE /api/employees/:id DITOLAK untuk role employee (regresi bug privilege escalation)', async ({
    client,
    assert,
  }) => {
    const employee = await Employee.create({
      nip: 'EMPTEST03',
      name: 'Karyawan Yang Coba Dihapus',
      email: `hapus-${Date.now()}@company.com`,
      position: 'Staff',
      status: 'active',
      joinDate: DateTime.fromISO('2024-01-01'),
    })

    const user = await createUserWithRole('employee')

    const response = await client.delete(`/api/employees/${employee.id}`).loginAs(user)

    response.assertStatus(403)

    // Pastikan datanya beneran masih ada, bukan cuma status code yang salah
    const stillExists = await Employee.find(employee.id)
    assert.isNotNull(stillExists)
  })

  test('DELETE /api/employees/:id berhasil untuk role hr', async ({ client, assert }) => {
    const employee = await Employee.create({
      nip: 'EMPTEST04',
      name: 'Karyawan Yang Dihapus HR',
      email: `hapushr-${Date.now()}@company.com`,
      position: 'Staff',
      status: 'active',
      joinDate: DateTime.fromISO('2024-01-01'),
    })

    const user = await createUserWithRole('hr')

    const response = await client.delete(`/api/employees/${employee.id}`).loginAs(user)

    response.assertStatus(200)

    const deleted = await Employee.find(employee.id)
    assert.isNull(deleted)
  })
})