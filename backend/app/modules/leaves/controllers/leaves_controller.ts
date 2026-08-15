import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Leave from '../models/leave.ts'
import { createLeaveValidator, updateLeaveStatusValidator } from '../validators/leave_validator.ts'
import { hasEnoughLeaveQuota } from '../../../utils/leave_util.ts'
import { successResponse, errorResponse } from '../../../utils/response_formatter.js'

export default class LeavesController {
  async index({ response }: HttpContext) {
    const leaves = await Leave.query().preload('employee')
    return successResponse(response, 'Berhasil mengambil daftar cuti', leaves)
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createLeaveValidator)

    const startDate = DateTime.fromISO(payload.startDate)
    const endDate = DateTime.fromISO(payload.endDate)

    // 1. Validasi tanggal: endDate tidak boleh sebelum startDate
    if (endDate < startDate) {
      return errorResponse(response, 'Tanggal selesai tidak boleh sebelum tanggal mulai')
    }

    const requestedDays = endDate.diff(startDate, 'days').days + 1

    // 2. Cek tumpang tindih dengan cuti lain yang masih pending/approved
    const overlapping = await Leave.query()
      .where('employeeId', payload.employeeId)
      .whereIn('status', ['pending', 'approved'])
      .where('startDate', '<=', endDate.toSQLDate()!)
      .where('endDate', '>=', startDate.toSQLDate()!)
      .first()

    if (overlapping) {
      return errorResponse(response, 'Anda sudah memiliki pengajuan cuti pada rentang tanggal ini')
    }

    // 3. Cek sisa kuota cuti tahun berjalan (hanya yang sudah approved)
    const approvedLeaves = await Leave.query()
      .where('employeeId', payload.employeeId)
      .where('status', 'approved')
      .whereRaw('strftime("%Y", start_date) = ?', [startDate.year.toString()])

    const usedLeave = approvedLeaves.reduce((total, leave) => {
      const days = leave.endDate.diff(leave.startDate, 'days').days + 1
      return total + days
    }, 0)

    if (!hasEnoughLeaveQuota(usedLeave, requestedDays)) {
      return errorResponse(
        response,
        `Kuota cuti tidak mencukupi. Sisa kuota: ${12 - usedLeave} hari, diajukan: ${requestedDays} hari`
      )
    }

    const leave = await Leave.create({
      employeeId: payload.employeeId,
      leaveType: payload.leaveType,
      reason: payload.reason,
      startDate,
      endDate,
      status: 'pending',
    })

    return successResponse(response, 'Pengajuan cuti berhasil dibuat', leave, 201)
  }

  async updateStatus({ params, request, response }: HttpContext) {
    const leave = await Leave.findOrFail(params.id)
    const { status } = await request.validateUsing(updateLeaveStatusValidator)

    leave.status = status
    await leave.save()

    return successResponse(response, `Status cuti berhasil diperbarui menjadi ${status}`, leave)
  }
}