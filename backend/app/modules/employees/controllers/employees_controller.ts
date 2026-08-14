import type { HttpContext } from '@adonisjs/core/http'
import Employee from '../models/employee.ts'

export default class EmployeesController {
  /**
   * Get all employees
   */
  async index({ response }: HttpContext) {
    const employees = await Employee.all()
    return response.json({
      status: 'success',
      data: employees,
    })
  }

  /**
   * Create new employee
   */
  async store({ request, response }: HttpContext) {
    const payload = request.only(['nip', 'name', 'email', 'position', 'status', 'joinDate'])
    const employee = await Employee.create(payload)

    return response.created({
      status: 'success',
      message: 'Karyawan berhasil ditambahkan',
      data: employee,
    })
  }
}
