export const COUNTER_BADGE_TYPES = ["primary", "attention"] as const
export type CounterBadgeType = (typeof COUNTER_BADGE_TYPES)[number]
