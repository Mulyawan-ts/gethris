import type { HttpContext } from '@adonisjs/core/http'
import Leave from '../models/leave.ts'

export default class LeavesController {
  /**
   * 1. GET /api/leaves
   * Mengambil semua pengajuan cuti beserta info Karyawan
   */
  async index({ response }: HttpContext) {
    // preload('employee') digunakan agar data nama & jabatan karyawan ikut terbawa
    const leaves = await Leave.query().preload('employee')

    return response.json({
      status: 'success',
      data: leaves,
    })
  }

  /**
   * 2. POST /api/leaves
   * Karyawan membuat pengajuan cuti baru
   */
  async store({ request, response }: HttpContext) {
    const payload = request.only([
      'employeeId',
      'leaveType',
      'startDate',
      'endDate',
      'reason',
    ])

    // Status otomatis 'pending' saat pertama kali diajukan
    const leave = await Leave.create({
      ...payload,
      status: 'pending',
    })

    return response.created({
      status: 'success',
      message: 'Pengajuan cuti berhasil dibuat',
      data: leave,
    })
  }

  /**
   * 3. PATCH /api/leaves/:id/status
   * HR / Admin menyetujui (approved) atau menolak (rejected) cuti
   */
  async updateStatus({ params, request, response }: HttpContext) {
    const leave = await Leave.findOrFail(params.id)
    const { status } = request.only(['status'])

    // Validasi status hanya boleh 'approved' atau 'rejected'
    if (!['approved', 'rejected'].includes(status)) {
      return response.badRequest({
        status: 'error',
        message: 'Status harus berisi approved atau rejected',
      })
    }

    leave.status = status
    await leave.save()

    return response.json({
      status: 'success',
      message: `Status cuti berhasil diperbarui menjadi ${status}`,
      data: leave,
    })
  }
}