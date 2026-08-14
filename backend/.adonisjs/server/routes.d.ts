import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'employees.index': { paramsTuple?: []; params?: {} }
    'employees.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'employees.store': { paramsTuple?: []; params?: {} }
    'employees.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'employees.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'leaves.index': { paramsTuple?: []; params?: {} }
    'leaves.store': { paramsTuple?: []; params?: {} }
    'leaves.update_status': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'employees.index': { paramsTuple?: []; params?: {} }
    'employees.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'leaves.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'employees.index': { paramsTuple?: []; params?: {} }
    'employees.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'leaves.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'employees.store': { paramsTuple?: []; params?: {} }
    'leaves.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'employees.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'employees.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'leaves.update_status': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}