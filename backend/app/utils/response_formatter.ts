// Example: backend/app/utils/response_formatter.ts
export function successResponse(response: any, message: string, data: any = null, code = 200) {
  return response.status(code).json({
    status: 'success',
    message,
    data,
  })
}

export function errorResponse(response: any, message: string, errors: any = null, code = 400) {
  return response.status(code).json({
    status: 'error',
    message,
    errors,
  })
}