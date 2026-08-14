import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Employee from '../models/employee.js'
import { generateNk } from '../../../utils/nk_generator.js'
import { successResponse, errorResponse } from '../../../utils/response_formatter.js'
import { createEmployeeValidator, updateEmployeeValidator } from '../validators/employee_validator.js'

export default class EmployeesController {
  /**
   * GET /api/employees
   */
  async index({ response }: HttpContext) {
    const employees = await Employee.all()
    return successResponse(response, 'Data karyawan berhasil dimuat', employees)
  }

  /**
   * POST /api/employees
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createEmployeeValidator)

    // Generate NIP
    const nip = generateNk(payload.joinDate)

    // 2. Konversi string joinDate ke DateTime
    const joinDate = DateTime.fromISO(payload.joinDate)

    const employee = await Employee.create({
      ...payload,
      nip,
      joinDate,
    })

    return successResponse(response, 'Karyawan berhasil ditambahkan', employee, 201)
  }

  /**
   * GET /api/employees/:id
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
   */
  async update({ params, request, response }: HttpContext) {
    const employee = await Employee.find(params.id)

    if (!employee) {
      return errorResponse(response, 'Data karyawan tidak ditemukan', null, 404)
    }

    const payload = await request.validateUsing(updateEmployeeValidator)

    // 3. Konversi joinDate jika user mengirimkan pembaruan tanggal
    const { joinDate, ...rest } = payload
    const formattedJoinDate = joinDate ? DateTime.fromISO(joinDate) : undefined

    employee.merge({
      ...rest,
      ...(formattedJoinDate && { joinDate: formattedJoinDate }),
    })

    await employee.save()

    return successResponse(response, 'Data karyawan berhasil diperbarui', employee)
  }

  /**
   * DELETE /api/employees/:id
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