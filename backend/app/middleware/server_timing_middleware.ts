import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ServerTimingMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const startTime = process.hrtime()

    await next()

    const diff = process.hrtime(startTime)
    const timeInMs = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2)

    // Mengirim durasi eksekusi backend di Response Header
    ctx.response.header('Server-Timing', `app;dur=${timeInMs};desc="Execution Time"`)
  }
}