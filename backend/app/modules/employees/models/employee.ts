import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Leave from '#modules/leaves/models/leave'

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nip: string

  @column()
  declare name: string

  @column()
  declare email: string

  @column()
  declare position: string

  @column()
  declare status: string

  @column.date()
  declare joinDate: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relasi: 1 Karyawan bisa punya banyak Pengajuan Cuti
  @hasMany(() => Leave)
  declare leaves: HasMany<typeof Leave>
}
