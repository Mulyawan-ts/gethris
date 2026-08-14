/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'employees.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/employees',
    tokens: [{"old":"/api/employees","type":0,"val":"api","end":""},{"old":"/api/employees","type":0,"val":"employees","end":""}],
    types: placeholder as Registry['employees.index']['types'],
  },
  'employees.store': {
    methods: ["POST"],
    pattern: '/api/employees',
    tokens: [{"old":"/api/employees","type":0,"val":"api","end":""},{"old":"/api/employees","type":0,"val":"employees","end":""}],
    types: placeholder as Registry['employees.store']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
