import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Employee from '../models/employee.ts'
import { generateNk } from '../../../utils/nk_generator.ts'
import { successResponse, errorResponse } from '../../../utils/response_formatter.js'
import {
  createEmployeeValidator,
  updateEmployeeValidator,
} from '../validators/employee_validator.js'
import cache from '@adonisjs/cache/services/main'

export default class EmployeesController {
  /**
   * GET /api/employees
   */
  public async index({ response }: HttpContext) {
    // 1. Ambil data via Cache (TTL: 5 menit / 300 detik)
    const employees = await cache.getOrSet({
      key: 'employees_list_all',
      ttl: '5m',
      factory: async () => {
        return await Employee.all()
      },
    })

    // 2. Gunakan successResponse agar konsisten dengan endpoint lainnya
    return successResponse(response, 'Berhasil mengambil daftar karyawan', employees)
  }

  /**
   * POST /api/employees
   */
  public async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createEmployeeValidator)

    // Generate NIP
    const nip = await generateNk(payload.joinDate)

    // Konversi string joinDate ke DateTime
    const joinDate = DateTime.fromISO(payload.joinDate)

    const employee = await Employee.create({
      ...payload,
      nip,
      joinDate,
    })

    // Invalidate Cache saat ada karyawan baru
    await cache.delete({ key: 'employees_list_all' })

    return successResponse(response, 'Karyawan berhasil ditambahkan', employee, 201)
  }

  /**
   * GET /api/employees/:id
   */
  public async show({ params, response }: HttpContext) {
    const employee = await Employee.find(params.id)

    if (!employee) {
      return errorResponse(response, 'Data karyawan tidak ditemukan', null, 404)
    }

    return successResponse(response, 'Detail data karyawan berhasil dimuat', employee)
  }

  /**
   * PUT /api/employees/:id
   */
  public async update({ params, request, response }: HttpContext) {
    const employee = await Employee.find(params.id)

    if (!employee) {
      return errorResponse(response, 'Data karyawan tidak ditemukan', null, 404)
    }

    const payload = await request.validateUsing(updateEmployeeValidator)

    // Konversi joinDate jika user mengirimkan pembaruan tanggal
    const { joinDate, ...rest } = payload
    const formattedJoinDate = joinDate ? DateTime.fromISO(joinDate) : undefined

    employee.merge({
      ...rest,
      ...(formattedJoinDate && { joinDate: formattedJoinDate }),
    })

    await employee.save()

    // Invalidate Cache saat data diperbarui
    await cache.delete({ key: 'employees_list_all' })

    return successResponse(response, 'Data karyawan berhasil diperbarui', employee)
  }

  /**
   * DELETE /api/employees/:id
   */
  public async destroy({ params, response }: HttpContext) {
    const employee = await Employee.find(params.id)

    if (!employee) {
      return errorResponse(response, 'Data karyawan tidak ditemukan', null, 404)
    }

    await employee.delete()

    // Invalidate Cache saat data dihapus
    await cache.delete({ key: 'employees_list_all' })

    return successResponse(response, 'Karyawan berhasil dihapus')
  }
}
