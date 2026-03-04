import { cn } from "@/lib/utils"
import type { BadgeVariant, BadgeRoundness } from "./constants"

export { default as Badge } from "./Badge.vue"
export { BADGE_VARIANTS, BADGE_ROUNDNESS } from "./constants"
export type { BadgeVariant, BadgeRoundness } from "./constants"
export type BadgeVariants = { variant?: BadgeVariant; roundness?: BadgeRoundness }

/** Returns class string for badge variant (backward compatibility). */
export function badgeVariants(options?: { variant?: BadgeVariant; roundness?: BadgeRoundness }) {
  const v = options?.variant ?? "default"
  const r = options?.roundness ?? "default"
  return cn("badge", `badge--${v}`, `badge--roundness-${r}`)
}
