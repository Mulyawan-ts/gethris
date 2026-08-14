import router from '@adonisjs/core/services/router'
const EmployeesController = () => import('./controllers/employees_controller.ts')

export function employeeRoutes() {
  router
    .group(() => {
      router.get('/', [EmployeesController, 'index'])
      router.post('/', [EmployeesController, 'store'])
    })
    .prefix('/api/employees')
}
