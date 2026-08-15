import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const LeavesController = () => import('./controllers/leaves_controller.ts')

export function leaveRoutes() {
  router
    .group(() => {
      router.get('/', [LeavesController, 'index'])
      router.post('/', [LeavesController, 'store'])
    })
    .prefix('/api/leaves')
    .use(middleware.auth())

  router
    .patch('/:id/status', [LeavesController, 'updateStatus'])
    .prefix('/api/leaves')
    .use([middleware.auth(), middleware.role(['admin', 'hr'])])
}
