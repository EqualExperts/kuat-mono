import { cn } from "@/lib/utils"
import type { BadgeVariant } from "./constants"

export { default as Badge } from "./Badge.vue"
export { BADGE_VARIANTS } from "./constants"
export type { BadgeVariant } from "./constants"
export type BadgeVariants = { variant?: BadgeVariant }

/** Returns class string for badge variant (backward compatibility). */
export function badgeVariants(options?: { variant?: BadgeVariant }) {
  const v = options?.variant ?? "default"
  return cn("badge", `badge--${v}`)
}
