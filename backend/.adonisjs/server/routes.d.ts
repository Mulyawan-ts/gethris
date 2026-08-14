import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'employees.index': { paramsTuple?: []; params?: {} }
    'employees.store': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'employees.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'employees.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'employees.store': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}