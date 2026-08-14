import type { HttpContext } from '@adonisjs/core/http'
import Employee from '../models/employee.ts'

export default class EmployeesController {
  // GET /api/employees (Semua Karyawan)
  async index({ response }: HttpContext) {
    const employees = await Employee.all()
    return response.json({ status: 'success', data: employees })
  }

  // GET /api/employees/:id (Detail Karyawan)
  async show({ params, response }: HttpContext) {
    const employee = await Employee.findOrFail(params.id)
    return response.json({ status: 'success', data: employee })
  }

  // POST /api/employees (Tambah Karyawan)
  async store({ request, response }: HttpContext) {
    const payload = request.only(['nip', 'name', 'email', 'position', 'status', 'joinDate'])
    const employee = await Employee.create(payload)
    return response.created({ status: 'success', data: employee })
  }

  // PUT /api/employees/:id (Update Karyawan)
  async update({ params, request, response }: HttpContext) {
    const employee = await Employee.findOrFail(params.id)
    const payload = request.only(['nip', 'name', 'email', 'position', 'status', 'joinDate'])
    employee.merge(payload)
    await employee.save()
    return response.json({ status: 'success', data: employee })
  }

  // DELETE /api/employees/:id (Hapus Karyawan)
  async destroy({ params, response }: HttpContext) {
    const employee = await Employee.findOrFail(params.id)
    await employee.delete()
    return response.json({ status: 'success', message: 'Karyawan berhasil dihapus' })
  }
}
