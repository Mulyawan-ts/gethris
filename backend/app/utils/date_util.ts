// Example: backend/app/utils/date_helper.ts
export function calculateWorkingDays(startDate: Date | string, endDate: Date | string): number {
  let count = 0
  const curDate = new Date(startDate)
  const lastDate = new Date(endDate)

  while (curDate <= lastDate) {
    const dayOfWeek = curDate.getDay()
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      // Bukan Minggu (0) & Sabtu (6)
      count++
    }
    curDate.setDate(curDate.getDate() + 1)
  }
  return count
}
