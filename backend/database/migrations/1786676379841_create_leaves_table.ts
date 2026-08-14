import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'leaves'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      // Menghubungkan data cuti ke ID Karyawan
      table
        .integer('employee_id')
        .unsigned()
        .references('id')
        .inTable('employees')
        .onDelete('CASCADE') // Jika karyawan dihapus, data cuti ikut terhapus

      table.string('leave_type').notNullable() // Contoh: 'Tahunan', 'Sakit', 'Melahirkan'
      table.date('start_date').notNullable() // Tanggal mulai cuti
      table.date('end_date').notNullable() // Tanggal selesai cuti
      table.text('reason').nullable() // Alasan mengajukan cuti

      // Status persetujuan: 'pending', 'approved', 'rejected'
      table.enum('status', ['pending', 'approved', 'rejected']).defaultTo('pending')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
