/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  employees: {
    index: typeof routes['employees.index']
    store: typeof routes['employees.store']
  }
}
