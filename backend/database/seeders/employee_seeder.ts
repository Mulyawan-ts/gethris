import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Employee from '#modules/employees/models/employee'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await Employee.createMany([
      {
        nip: 'EMP001',
        name: 'Budi Santoso',
        email: 'budi.santoso@company.com',
        position: 'Software Engineer',
        status: 'active',
        joinDate: DateTime.fromISO('2024-01-15'),
      },
      {
        nip: 'EMP002',
        name: 'Siti Rahma',
        email: 'siti.rahma@company.com',
        position: 'HR Specialist',
        status: 'active',
        joinDate: DateTime.fromISO('2023-06-01'),
      },
      {
        nip: 'EMP003',
        name: 'Andi Wijaya',
        email: 'andi.wijaya@company.com',
        position: 'UI/UX Designer',
        status: 'on_leave',
        joinDate: DateTime.fromISO('2025-02-10'),
      },
    ])
  }
}
