export const BADGE_VARIANTS = [
  "default",
  "secondary",
  "destructive",
  "outline",
] as const

export type BadgeVariant = (typeof BADGE_VARIANTS)[number]
