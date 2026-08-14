import { randomBytes } from 'node:crypto'

/**
 * Generates NIP with format: YYYYMM + 4 Unique Characters
 * Example: 202608A1B2
 */
export function generateNip(joinDate?: string | Date): string {
  const date = joinDate ? new Date(joinDate) : new Date()

  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')

  // Generate 4 karakter acak unik (Alfanumerik Kapital)
  const uniqueCode = randomBytes(2).toString('hex').toUpperCase()

  return `${year}${month}${uniqueCode}`
}