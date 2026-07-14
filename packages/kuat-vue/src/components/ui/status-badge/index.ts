import { cn } from "@/lib/utils"
import type { StatusBadgeType, StatusBadgeSize } from "./constants"

export { default as StatusBadge } from "./StatusBadge.vue"
export { STATUS_BADGE_TYPES, STATUS_BADGE_SIZES } from "./constants"
export type { StatusBadgeType, StatusBadgeSize } from "./constants"
export type StatusBadgeVariants = { type?: StatusBadgeType; size?: StatusBadgeSize }

/** Returns class string for status badge variant (backward compatibility). */
export function statusBadgeVariants(options?: {
  type?: StatusBadgeType
  size?: StatusBadgeSize
}) {
  const t = options?.type ?? "success"
  const s = options?.size ?? "base"
  return cn("status-badge", `status-badge--${t}`, `status-badge--size-${s}`)
}
