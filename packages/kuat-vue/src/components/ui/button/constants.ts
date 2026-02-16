export const BUTTON_VARIANTS = [
  "default",
  "destructive",
  "outline",
  "secondary",
  "ghost",
  "link",
] as const

export const BUTTON_SIZES = [
  "default",
  "sm",
  "lg",
  "icon",
  "icon-sm",
  "icon-lg",
] as const

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number]
export type ButtonSize = (typeof BUTTON_SIZES)[number]
