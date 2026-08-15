import vine from '@vinejs/vine'

export const createLeaveValidator = vine.compile(
  vine.object({
    employeeId: vine.number().positive(),
    leaveType: vine.string().trim().minLength(3).maxLength(50),
    startDate: vine.string().trim(), // format YYYY-MM-DD
    endDate: vine.string().trim(),
    reason: vine.string().trim().optional(),
  })
)

export const updateLeaveStatusValidator = vine.compile(
  vine.object({
    status: vine.enum(['approved', 'rejected'] as const),
  })
)