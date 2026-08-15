import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const EmployeesController = () => import('./controllers/employees_controller.js')

export function employeeRoutes() {
  router
    .group(() => {
      router.get('/', [EmployeesController, 'index'])
      router.get('/:id', [EmployeesController, 'show'])
    })
    .prefix('/api/employees')
    .use(middleware.auth())

  router
    .group(() => {
      router.post('/', [EmployeesController, 'store'])
      router.put('/:id', [EmployeesController, 'update'])
      router.delete('/:id', [EmployeesController, 'destroy'])
    })
    .prefix('/api/employees')
    .use([middleware.auth(), middleware.role(['admin', 'hr'])])
}
