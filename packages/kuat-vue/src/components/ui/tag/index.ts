import { cn } from "@/lib/utils"
import type { TagColor, TagMode } from "./constants"

export { default as Tag } from "./Tag.vue"
export { TAG_COLORS, TAG_MODES } from "./constants"
export type { TagColor, TagMode } from "./constants"
export type TagVariants = { color?: TagColor; mode?: TagMode; selected?: boolean }

/** Returns class string for tag variant (backward compatibility). */
export function tagVariants(options?: {
  color?: TagColor
  mode?: TagMode
  selected?: boolean
}) {
  const c = options?.color ?? "base"
  const m = options?.mode ?? "display"
  const selectedVisual = m === "dismiss" || (m === "toggle" && !!options?.selected)
  return cn(
    "tag",
    `tag--${c}`,
    m !== "display" && "tag--interactive",
    selectedVisual && "tag--selected"
  )
}
