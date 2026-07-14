import { cn } from "@/lib/utils"
import type { CounterBadgeType } from "./constants"

export { default as CounterBadge } from "./CounterBadge.vue"
export { COUNTER_BADGE_TYPES } from "./constants"
export type { CounterBadgeType } from "./constants"
export type CounterBadgeVariants = { type?: CounterBadgeType }

/** Returns class string for counter badge variant (backward compatibility). */
export function counterBadgeVariants(options?: { type?: CounterBadgeType }) {
  const t = options?.type ?? "primary"
  return cn("counter-badge", `counter-badge--${t}`)
}
