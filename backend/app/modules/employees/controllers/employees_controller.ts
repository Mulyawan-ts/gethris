import type { HttpContext } from '@adonisjs/core/http'
import Employee from '../models/employee.js'
import { generateNk } from '../../../utils/nk_generator.js'

export default class EmployeesController {
  /**
   * GET /api/employees
   */
  async index({ response }: HttpContext) {
    const employees = await Employee.all()
    return response.json({ status: 'success', data: employees })
  }

  /**
   * POST /api/employees
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

    // Generate Nomor Pegawai otomatis
    const nip = generateNk(payload.joinDate)

    const employee = await Employee.create({
      ...payload,
      nip,
    })

    return response.created({
      status: 'success',
      message: 'Karyawan berhasil ditambahkan',
      data: employee,
    })
  }

  /**
   * GET /api/employees/:id
   */
  async show({ params, response }: HttpContext) {
    const employee = await Employee.findOrFail(params.id)
    return response.json({ status: 'success', data: employee })
  }

  /**
   * PUT /api/employees/:id
   */
  async update({ params, request, response }: HttpContext) {
    const employee = await Employee.findOrFail(params.id)
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

    return response.json({
      status: 'success',
      message: 'Data karyawan berhasil diperbarui',
      data: employee,
    })
  }

  /**
   * DELETE /api/employees/:id
   */
  async destroy({ params, response }: HttpContext) {
    const employee = await Employee.findOrFail(params.id)
    await employee.delete()

    return response.json({
      status: 'success',
      message: 'Karyawan berhasil dihapus',
    })
  }
}