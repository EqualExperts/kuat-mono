import { cn } from "@/lib/utils"
import type { ButtonVariant, ButtonSize, ButtonColor } from "./constants"

export { default as Button } from "./Button.vue"
export { BUTTON_VARIANTS, BUTTON_SIZES, BUTTON_COLORS } from "./constants"
export type { ButtonVariant, ButtonSize, ButtonColor } from "./constants"
export type ButtonVariants = {
  variant?: ButtonVariant | "default"
  size?: ButtonSize | "sm" | "lg"
  color?: ButtonColor
}

function normalizeVariant(v: ButtonVariants["variant"]): ButtonVariant {
  if (v === "default") return "primary"
  return (v ?? "primary") as ButtonVariant
}

function normalizeSize(s: ButtonVariants["size"]): ButtonSize {
  if (s === "sm") return "small"
  if (s === "lg") return "large"
  return (s ?? "default") as ButtonSize
}

/** Returns class string for button variant/size/color (backward compatibility). */
export function buttonVariants(options?: ButtonVariants) {
  const v = normalizeVariant(options?.variant ?? "primary")
  const s = normalizeSize(options?.size ?? "default")
  const c = options?.color ?? "ee-blue"
  const isDestructive = v === "destructive"
  const colorClass = isDestructive ? "" : `button--color-${c}`
  return cn(
    "button",
    `button--variant-${v}`,
    colorClass,
    `button--size-${s}`
  )
}
