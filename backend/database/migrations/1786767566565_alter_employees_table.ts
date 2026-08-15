import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'employees'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('department').nullable()
      table.decimal('salary', 14, 2).nullable()
      table.string('phone_number').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('department')
      table.dropColumn('salary')
      table.dropColumn('phone_number')
    })
  }
}
