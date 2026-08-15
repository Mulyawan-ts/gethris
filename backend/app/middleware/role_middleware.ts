import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * RoleMiddleware membatasi akses route berdasarkan role user yang sedang login.
 * Harus dipasang SETELAH middleware.auth(), karena bergantung pada ctx.auth.user.
 *
 * Contoh pemakaian di route:
 *   router.delete('/:id', [...]).use(middleware.role(['admin', 'hr']))
 */
export default class RoleMiddleware {
  async handle(ctx: HttpContext, next: NextFn, allowedRoles: string[]) {
    const user = ctx.auth.user

    if (!user) {
      return ctx.response.unauthorized({
        status: 'error',
        message: 'Anda harus login terlebih dahulu',
      })
    }

    if (!allowedRoles.includes(user.role)) {
      return ctx.response.forbidden({
        status: 'error',
        message: 'Anda tidak memiliki izin untuk mengakses resource ini',
      })
    }

    return next()
  }
}
