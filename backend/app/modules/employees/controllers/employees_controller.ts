import type { HttpContext } from '@adonisjs/core/http'
import Employee from '../models/employee.js'
import { generateNk } from '../../../utils/nk_generator.js'
import { successResponse, errorResponse } from '../../../utils/response_formatter.js'

export default class EmployeesController {
  /**
   * GET /api/employees
   * Ambil semua data karyawan
   */
  async index({ response }: HttpContext) {
    const employees = await Employee.all()
    return successResponse(response, 'Data karyawan berhasil dimuat', employees)
  }

  /**
   * POST /api/employees
   * Tambah karyawan baru
   */
  async store({ request, response }: HttpContext) {
    const payload = request.only([
      'fullName',
      'email',
      'phoneNumber',
      'position',
      'department',
      'salary',
      'joinDate',
    ])

    // Generate NIP/Nomor Pegawai otomatis
    const nip = generateNk(payload.joinDate)

    const employee = await Employee.create({
      ...payload,
      nip,
    })

    return successResponse(response, 'Karyawan berhasil ditambahkan', employee, 201)
  }

  /**
   * GET /api/employees/:id
   * Detail data karyawan
   */
  async show({ params, response }: HttpContext) {
    const employee = await Employee.find(params.id)

    if (!employee) {
      return errorResponse(response, 'Data karyawan tidak ditemukan', null, 404)
    }

    return successResponse(response, 'Detail data karyawan berhasil dimuat', employee)
  }

  /**
   * PUT /api/employees/:id
   * Update data karyawan
   */
  async update({ params, request, response }: HttpContext) {
    const employee = await Employee.find(params.id)

    if (!employee) {
      return errorResponse(response, 'Data karyawan tidak ditemukan', null, 404)
    }

    const payload = request.only([
      'fullName',
      'email',
      'phoneNumber',
      'position',
      'department',
      'salary',
      'joinDate',
    ])

    employee.merge(payload)
    await employee.save()

    return successResponse(response, 'Data karyawan berhasil diperbarui', employee)
  }

  /**
   * DELETE /api/employees/:id
   * Hapus data karyawan
   */
  async destroy({ params, response }: HttpContext) {
    const employee = await Employee.find(params.id)

    if (!employee) {
      return errorResponse(response, 'Data karyawan tidak ditemukan', null, 404)
    }

    await employee.delete()
    return successResponse(response, 'Karyawan berhasil dihapus')
  }
}