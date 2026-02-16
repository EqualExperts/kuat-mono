import { cn } from "@/lib/utils"
import type { ButtonGroupOrientation } from "./constants"

export { default as ButtonGroup } from "./ButtonGroup.vue"
export { default as ButtonGroupSeparator } from "./ButtonGroupSeparator.vue"
export { default as ButtonGroupText } from "./ButtonGroupText.vue"
export { BUTTON_GROUP_ORIENTATIONS } from "./constants"
export type { ButtonGroupOrientation } from "./constants"
export type ButtonGroupVariants = { orientation?: ButtonGroupOrientation }

/** Returns class string for button group (backward compatibility). */
export function buttonGroupVariants(options?: {
  orientation?: ButtonGroupOrientation
}) {
  const o = options?.orientation ?? "horizontal"
  return cn("button-group", `button-group--${o}`)
}
