import vine from '@vinejs/vine'

/**
 * Validator untuk Tambah Karyawan Baru
 */
export const createEmployeeValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255),
    email: vine.string().email().trim(),
    phoneNumber: vine.string().trim().optional(),
    position: vine.string().trim(),
    department: vine.string().trim(),
    salary: vine.number().positive(),
    joinDate: vine.string().trim(),
  })
)

export const updateEmployeeValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255).optional(),
    email: vine.string().email().trim().optional(),
    phoneNumber: vine.string().trim().optional(),
    position: vine.string().trim().optional(),
    department: vine.string().trim().optional(),
    salary: vine.number().positive().optional(),
    joinDate: vine.string().trim().optional(),
  })
)
