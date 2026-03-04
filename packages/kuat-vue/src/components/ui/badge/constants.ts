export const BADGE_VARIANTS = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "ghost",
] as const

export type BadgeVariant = (typeof BADGE_VARIANTS)[number]

export const BADGE_ROUNDNESS = ["default", "round"] as const
export type BadgeRoundness = (typeof BADGE_ROUNDNESS)[number]
