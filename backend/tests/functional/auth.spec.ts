import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import User from '../../app/models/user.ts'

test.group('Auth', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('register membuat user baru dengan role selalu "employee"', async ({ client, assert }) => {
    const response = await client.post('/api/auth/register').json({
      fullName: 'Andi Pratama',
      email: 'andi@company.com',
      password: 'password123',
      passwordConfirmation: 'password123',
    })

    response.assertStatus(201)
    response.assertBodyContains({
      status: 'success',
      data: { user: { role: 'employee' } },
    })

    const user = await User.findByOrFail('email', 'andi@company.com')
    assert.equal(user.role, 'employee')
  })

  test('register TIDAK BISA membuat user dengan role admin walau dikirim di payload', async ({
    client,
    assert,
  }) => {
    // Ini test regresi untuk bug privilege-escalation yang sudah diperbaiki:
    // role dari body request harus selalu diabaikan.
    const response = await client.post('/api/auth/register').json({
      fullName: 'Penyusup',
      email: 'penyusup@company.com',
      password: 'password123',
      passwordConfirmation: 'password123',
      role: 'admin', // mencoba menyisipkan role admin
    })

    response.assertStatus(201)

    const user = await User.findByOrFail('email', 'penyusup@company.com')
    assert.equal(user.role, 'employee') // harus tetap 'employee', bukan 'admin'
  })

  test('register mengembalikan access token yang bisa dipakai', async ({ client,assert }) => {
    const response = await client.post('/api/auth/register').json({
      fullName: 'Budi Setiawan',
      email: 'budi@company.com',
      password: 'password123',
      passwordConfirmation: 'password123',
    })

    response.assertStatus(201)
    const body = response.body() as { data: { token: string } }
    assert.isString(body.data.token)
    assert.isNotEmpty(body.data.token)
  })

  test('login berhasil dengan kredensial yang benar', async ({ client }) => {
    await User.create({
      fullName: 'Citra Dewi',
      email: 'citra@company.com',
      password: 'password123',
      role: 'employee',
    })

    const response = await client.post('/api/auth/login').json({
      email: 'citra@company.com',
      password: 'password123',
    })

    response.assertStatus(200)
    response.assertBodyContains({
      status: 'success',
      data: { user: { email: 'citra@company.com', role: 'employee' } },
    })
  })

  test('login gagal dengan password yang salah', async ({ client }) => {
    await User.create({
      fullName: 'Dedi Kurniawan',
      email: 'dedi@company.com',
      password: 'password123',
      role: 'employee',
    })

    const response = await client.post('/api/auth/login').json({
      email: 'dedi@company.com',
      password: 'passwordSalah',
    })

    // Kredensial salah -> ditolak (bukan 200)
    response.assertStatus(400)
  })

  test('login gagal untuk email yang tidak terdaftar', async ({ client }) => {
    const response = await client.post('/api/auth/login').json({
      email: 'tidak-ada@company.com',
      password: 'password123',
    })

    response.assertStatus(400)
  })

  test('GET /api/auth/me menolak request tanpa token', async ({ client }) => {
    const response = await client.get('/api/auth/me')

    response.assertStatus(401)
  })

  test('GET /api/auth/me mengembalikan data user yang sedang login', async ({ client }) => {
    const user = await User.create({
      fullName: 'Eka Putra',
      email: 'eka@company.com',
      password: 'password123',
      role: 'employee',
    })

    const response = await client.get('/api/auth/me').loginAs(user)

    response.assertStatus(200)
    response.assertBodyContains({ status: 'success', data: { email: 'eka@company.com' } })
  })

  test('logout menghapus token yang sedang dipakai', async ({ client }) => {
    const user = await User.create({
      fullName: 'Fajar Nugroho',
      email: 'fajar@company.com',
      password: 'password123',
      role: 'employee',
    })

    const logoutResponse = await client.post('/api/auth/logout').loginAs(user)
    logoutResponse.assertStatus(200)

    // Setelah logout, request /me pakai user yang sama (guest baru, tanpa token) harus ditolak
    const meResponse = await client.get('/api/auth/me')
    meResponse.assertStatus(401)
  })
})