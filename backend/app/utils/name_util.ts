// backend/app/utils/file_helper.ts
import { randomBytes } from 'node:crypto'

export function generateFileName(originalName: string, prefix = 'doc'): string {
  const ext = originalName.split('.').pop()
  const randomStr = randomBytes(4).toString('hex')
  return `${prefix}_${Date.now()}_${randomStr}.${ext}`
}
