/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { employeeRoutes } from '#modules/employees/routes'
import { leaveRoutes } from '#modules/leaves/routes'

// Load modul routes
employeeRoutes()
leaveRoutes()