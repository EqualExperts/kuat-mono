export const STATUS_BADGE_TYPES = ["success", "warning", "error", "info", "neutral"] as const
export type StatusBadgeType = (typeof STATUS_BADGE_TYPES)[number]

export const STATUS_BADGE_SIZES = ["base", "large"] as const
export type StatusBadgeSize = (typeof STATUS_BADGE_SIZES)[number]
