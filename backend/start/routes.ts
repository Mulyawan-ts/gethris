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

// Route untuk API Documentation (Scalar)
router.get('/docs', async ({ response }) => {
  return response.send(`
    <!doctype html>
    <html>
      <head>
        <title>GET-HRIS API Reference</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <script
          id="api-reference"
          data-url="/openapi.json"
        ></script>
        <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference@latest"></script>
      </body>
    </html>
  `)
})

// Load modul routes
employeeRoutes()
leaveRoutes()
