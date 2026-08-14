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
  'employees.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/employees/:id',
    tokens: [{"old":"/api/employees/:id","type":0,"val":"api","end":""},{"old":"/api/employees/:id","type":0,"val":"employees","end":""},{"old":"/api/employees/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['employees.show']['types'],
  },
  'employees.store': {
    methods: ["POST"],
    pattern: '/api/employees',
    tokens: [{"old":"/api/employees","type":0,"val":"api","end":""},{"old":"/api/employees","type":0,"val":"employees","end":""}],
    types: placeholder as Registry['employees.store']['types'],
  },
  'employees.update': {
    methods: ["PUT"],
    pattern: '/api/employees/:id',
    tokens: [{"old":"/api/employees/:id","type":0,"val":"api","end":""},{"old":"/api/employees/:id","type":0,"val":"employees","end":""},{"old":"/api/employees/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['employees.update']['types'],
  },
  'employees.destroy': {
    methods: ["DELETE"],
    pattern: '/api/employees/:id',
    tokens: [{"old":"/api/employees/:id","type":0,"val":"api","end":""},{"old":"/api/employees/:id","type":0,"val":"employees","end":""},{"old":"/api/employees/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['employees.destroy']['types'],
  },
  'leaves.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/leaves',
    tokens: [{"old":"/api/leaves","type":0,"val":"api","end":""},{"old":"/api/leaves","type":0,"val":"leaves","end":""}],
    types: placeholder as Registry['leaves.index']['types'],
  },
  'leaves.store': {
    methods: ["POST"],
    pattern: '/api/leaves',
    tokens: [{"old":"/api/leaves","type":0,"val":"api","end":""},{"old":"/api/leaves","type":0,"val":"leaves","end":""}],
    types: placeholder as Registry['leaves.store']['types'],
  },
  'leaves.update_status': {
    methods: ["PATCH"],
    pattern: '/api/leaves/:id/status',
    tokens: [{"old":"/api/leaves/:id/status","type":0,"val":"api","end":""},{"old":"/api/leaves/:id/status","type":0,"val":"leaves","end":""},{"old":"/api/leaves/:id/status","type":1,"val":"id","end":""},{"old":"/api/leaves/:id/status","type":0,"val":"status","end":""}],
    types: placeholder as Registry['leaves.update_status']['types'],
  },
  'auth.register': {
    methods: ["POST"],
    pattern: '/api/auth/register',
    tokens: [{"old":"/api/auth/register","type":0,"val":"api","end":""},{"old":"/api/auth/register","type":0,"val":"auth","end":""},{"old":"/api/auth/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['auth.register']['types'],
  },
  'auth.login': {
    methods: ["POST"],
    pattern: '/api/auth/login',
    tokens: [{"old":"/api/auth/login","type":0,"val":"api","end":""},{"old":"/api/auth/login","type":0,"val":"auth","end":""},{"old":"/api/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'auth.me': {
    methods: ["GET","HEAD"],
    pattern: '/api/auth/me',
    tokens: [{"old":"/api/auth/me","type":0,"val":"api","end":""},{"old":"/api/auth/me","type":0,"val":"auth","end":""},{"old":"/api/auth/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['auth.me']['types'],
  },
  'auth.logout': {
    methods: ["POST"],
    pattern: '/api/auth/logout',
    tokens: [{"old":"/api/auth/logout","type":0,"val":"api","end":""},{"old":"/api/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.logout']['types'],
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
