/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import app from '@adonisjs/core/services/app'
import { readFileSync } from 'node:fs'
import { employeeRoutes } from '#modules/employees/routes'
import { leaveRoutes } from '#modules/leaves/routes'
import { authRoutes } from '#modules/auth/routes'
import { throttle } from '#start/limiter'

// 2. Route untuk menyajikan isi file openapi.json
router.get('/openapi.json', async ({ response }) => {
  const filePath = app.makePath('public/openapi.json')
  const fileContent = readFileSync(filePath, 'utf-8')
  return response.header('Content-Type', 'application/json').send(fileContent)
})

// 3. Route untuk Scalar UI Reference
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

// 4. Load modul routes & Bungkus dengan Rate Limiter Middleware
router
  .group(() => {
    employeeRoutes()
    leaveRoutes()
    authRoutes()
  })
  .use(throttle)
