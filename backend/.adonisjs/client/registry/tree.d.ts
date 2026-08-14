/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  employees: {
    index: typeof routes['employees.index']
    show: typeof routes['employees.show']
    store: typeof routes['employees.store']
    update: typeof routes['employees.update']
    destroy: typeof routes['employees.destroy']
  }
  leaves: {
    index: typeof routes['leaves.index']
    store: typeof routes['leaves.store']
    updateStatus: typeof routes['leaves.update_status']
  }
  auth: {
    register: typeof routes['auth.register']
    login: typeof routes['auth.login']
    me: typeof routes['auth.me']
    logout: typeof routes['auth.logout']
  }
}
