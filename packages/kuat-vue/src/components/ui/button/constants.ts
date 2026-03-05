export const BUTTON_VARIANTS = [
  "primary",
  "secondary",
  "outline",
  "ghost",
  "ghost-muted",
  "destructive",
] as const

/** @deprecated Use "primary" instead. */
export const BUTTON_VARIANT_DEFAULT_ALIAS = "default"

export const BUTTON_SIZES = ["mini", "small", "default", "large", "icon"] as const

/** @deprecated Use "small" instead. */
export const BUTTON_SIZE_SM_ALIAS = "sm"
/** @deprecated Use "large" instead. */
export const BUTTON_SIZE_LG_ALIAS = "lg"

export const BUTTON_COLORS = [
  "ee-blue",
  "tech-blue",
  "byte-white",
  "the-cloud",
  "dark-data",
  "transform-teal",
  "equal-ember",
] as const

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number]
export type ButtonSize = (typeof BUTTON_SIZES)[number]
export type ButtonColor = (typeof BUTTON_COLORS)[number]
