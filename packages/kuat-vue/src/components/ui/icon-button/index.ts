import { cn } from "@/lib/utils"
import type { ButtonVariant, ButtonColor } from "../button/constants"
import type { IconButtonSize, IconButtonRoundness } from "./constants"

export { default as IconButton } from "./IconButton.vue"
export {
  ICON_BUTTON_SIZES,
  ICON_BUTTON_ROUNDNESS,
  ICON_BUTTON_VARIANT_DEFAULT_ALIAS,
  ICON_BUTTON_SIZE_SM_ALIAS,
  ICON_BUTTON_SIZE_LG_ALIAS,
} from "./constants"
export type {
  ButtonVariant,
  ButtonColor,
  IconButtonSize,
  IconButtonRoundness,
} from "./constants"

export type IconButtonVariants = {
  variant?: ButtonVariant | "default"
  size?: IconButtonSize | "sm" | "lg"
  color?: ButtonColor
  roundness?: IconButtonRoundness
}

function normalizeVariant(v: IconButtonVariants["variant"]): ButtonVariant {
  if (v === "default") return "primary"
  return (v ?? "primary") as ButtonVariant
}

function normalizeSize(s: IconButtonVariants["size"]): IconButtonSize {
  if (s === "sm") return "small"
  if (s === "lg") return "large"
  return (s ?? "regular") as IconButtonSize
}

/** Returns class string for icon button variant/size/color/roundness. */
export function iconButtonVariants(options?: IconButtonVariants) {
  const v = normalizeVariant(options?.variant ?? "primary")
  const s = normalizeSize(options?.size ?? "regular")
  const c = options?.color ?? "ee-blue"
  const r = options?.roundness ?? "default"
  const isDestructive = v === "destructive"
  const colorClass = isDestructive ? "" : `button--color-${c}`
  return cn(
    "button",
    "icon-button",
    `button--variant-${v}`,
    colorClass,
    `icon-button--size-${s}`,
    `icon-button--roundness-${r}`
  )
}
