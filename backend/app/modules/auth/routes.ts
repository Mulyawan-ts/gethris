import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const AuthController = () => import('./controllers/auth_controller.ts')

export function authRoutes() {
  router
    .group(() => {
      // Route Publik (Tidak butuh Login)
      router.post('/register', [AuthController, 'register'])
      router.post('/login', [AuthController, 'login'])

      // Route Privat (Wajib Mengirimkan Bearer Token di Header)
      router
        .group(() => {
          router.get('/me', [AuthController, 'me'])
          router.post('/logout', [AuthController, 'logout'])
        })
        .use(middleware.auth())
    })
    .prefix('/api/auth')
}
