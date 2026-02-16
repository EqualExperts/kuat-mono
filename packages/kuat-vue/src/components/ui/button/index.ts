import { cn } from "@/lib/utils"
import type { ButtonVariant, ButtonSize } from "./constants"

export { default as Button } from "./Button.vue"
export { BUTTON_VARIANTS, BUTTON_SIZES } from "./constants"
export type { ButtonVariant, ButtonSize } from "./constants"
export type ButtonVariants = { variant?: ButtonVariant; size?: ButtonSize }

/** Returns class string for button variant/size (backward compatibility). */
export function buttonVariants(options?: {
  variant?: ButtonVariant
  size?: ButtonSize
}) {
  const v = options?.variant ?? "default"
  const s = options?.size ?? "default"
  return cn(
    "button",
    `button--variant-${v}`,
    `button--size-${s}`
  )
}
