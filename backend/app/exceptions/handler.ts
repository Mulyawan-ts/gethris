import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import { errors as vineErrors } from '@vinejs/vine'
import { errors as authErrors } from '@adonisjs/auth'
import { errors as limiterErrors } from '@adonisjs/limiter'

export default class HttpExceptionHandler extends ExceptionHandler {
  protected debug = !app.inProduction

  async handle(error: unknown, ctx: HttpContext) {
    const { response } = ctx

    // 1. Error Validasi VineJS (Status 422)
    if (error instanceof vineErrors.E_VALIDATION_ERROR) {
      return response.status(422).send({
        status: false,
        message: 'Validasi data gagal',
        errors: error.messages,
      })
    }

    // 2. Error Autentikasi / Token Invalid (Status 401)
    if (error instanceof authErrors.E_UNAUTHORIZED_ACCESS) {
      return response.status(401).send({
        status: false,
        message: 'Akses tidak diizinkan. Token tidak valid atau kedaluwarsa.',
        errors: null,
      })
    }

    // 3. Error Rate Limit Exceeded (Status 429)
    if (error instanceof limiterErrors.E_TOO_MANY_REQUESTS) {
      return response.status(429).send({
        status: false,
        message: 'Terlalu banyak request. Silakan coba beberapa saat lagi.',
        errors: null,
      })
    }

    // 4. Fallback Error Handler Bawaan AdonisJS (404, 500, dll)
    return super.handle(error, ctx)
  }

  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}