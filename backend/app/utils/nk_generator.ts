import { randomBytes } from 'node:crypto'
import Employee from '../modules/employees/models/employee.ts'

/**
 * Generates NIP dengan format: YYYYMM + 6 karakter unik acak (alfanumerik kapital)
 * Contoh: 202608A1B2C3
 *
 * Mengecek ke DB agar tidak collision dengan NIP yang sudah ada;
 * retry maksimal beberapa kali sebelum menyerah.
 */
export async function generateNk(joinDate?: string | Date): Promise<string> {
  const date = joinDate ? new Date(joinDate) : new Date()

  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const prefix = `${year}${month}`

  const MAX_ATTEMPTS = 5

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    // 3 byte -> 6 karakter hex, jauh lebih besar ruang kombinasinya dari sebelumnya (2 byte)
    const uniqueCode = randomBytes(3).toString('hex').toUpperCase()
    const nip = `${prefix}${uniqueCode}`

    const existing = await Employee.query().where('nip', nip).first()
    if (!existing) {
      return nip
    }
    // kalau tabrakan, loop lagi generate kode baru
  }

  throw new Error('Gagal generate NIP unik setelah beberapa percobaan, coba lagi')
}