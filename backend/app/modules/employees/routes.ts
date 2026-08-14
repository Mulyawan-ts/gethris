import router from '@adonisjs/core/services/router'
const EmployeesController = () => import('./controllers/employees_controller.js')

export function employeeRoutes() {
  router
    .group(() => {
      router.get('/', [EmployeesController, 'index'])
      router.get('/:id', [EmployeesController, 'show'])
      router.post('/', [EmployeesController, 'store'])
      router.put('/:id', [EmployeesController, 'update'])
      router.delete('/:id', [EmployeesController, 'destroy'])
    })
    .prefix('/api/employees')
}
