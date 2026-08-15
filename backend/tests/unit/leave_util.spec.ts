import { test } from '@japa/runner'
import { hasEnoughLeaveQuota } from '../../app/utils/leave_util.ts'

test.group('hasEnoughLeaveQuota', () => {
  test('mengembalikan true jika sisa kuota masih cukup', ({ assert }) => {
    // sudah pakai 5 hari, minta 3 hari, kuota default 12 -> 5+3=8 <= 12
    assert.isTrue(hasEnoughLeaveQuota(5, 3))
  })

  test('mengembalikan true jika permintaan pas menghabiskan sisa kuota', ({ assert }) => {
    // sudah pakai 9 hari, minta 3 hari -> 9+3=12 <= 12 (pas)
    assert.isTrue(hasEnoughLeaveQuota(9, 3))
  })

  test('mengembalikan false jika permintaan melebihi sisa kuota', ({ assert }) => {
    // sudah pakai 10 hari, minta 5 hari -> 10+5=15 > 12
    assert.isFalse(hasEnoughLeaveQuota(10, 5))
  })

  test('mengembalikan true jika belum pernah pakai cuti sama sekali', ({ assert }) => {
    assert.isTrue(hasEnoughLeaveQuota(0, 12))
  })

  test('menghormati maxQuota custom yang dioper manual', ({ assert }) => {
    // maxQuota di-set 5, sudah pakai 3, minta 3 -> 3+3=6 > 5
    assert.isFalse(hasEnoughLeaveQuota(3, 3, 5))
  })

  test('mengembalikan false jika usedLeave saja sudah melebihi kuota', ({ assert }) => {
    // kasus data korup/aneh: usedLeave sudah lebih dari kuota sebelum request baru
    assert.isFalse(hasEnoughLeaveQuota(15, 0))
  })
})