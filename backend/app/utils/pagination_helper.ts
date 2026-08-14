// backend/app/utils/pagination_helper.ts
export function formatPaginatedResponse(paginator: any, message = 'Data berhasil dimuat') {
  return {
    status: 'success',
    message,
    data: paginator.all(),
    meta: {
      total: paginator.total,
      perPage: paginator.perPage,
      currentPage: paginator.currentPage,
      lastPage: paginator.lastPage,
    },
  }
}