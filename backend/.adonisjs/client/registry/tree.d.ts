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
}
