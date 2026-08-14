// backend/app/utils/leave_calculator.ts
export function hasEnoughLeaveQuota(usedLeave: number, requestedDays: number, maxQuota = 12): boolean {
  return usedLeave + requestedDays <= maxQuota
}