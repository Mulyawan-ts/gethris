import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'employees'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nip').notNullable().unique()
      table.string('name').notNullable()
      table.string('email').notNullable().unique()
      table.string('position').notNullable() // Jabatan
      table.enum('status', ['active', 'inactive', 'on_leave']).defaultTo('active')
      table.date('join_date').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
