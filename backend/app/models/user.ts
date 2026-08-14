import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Employee from '#modules/employees/models/employee'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare employeeId: number | null

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null }) // Password disembunyikan saat JSON dirender
  declare password: string

  @column()
  declare role: 'admin' | 'hr' | 'employee'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  // Relasi ke Model Employee
  @belongsTo(() => Employee)
  declare employee: BelongsTo<typeof Employee>

  // Provider Access Token untuk Auth
  static accessTokens = DbAccessTokensProvider.forModel(User)
}