export const KUAT_RADIAL_PROGRESS_SIZES = [
  "mini",
  "small",
  "medium",
  "large",
] as const
export const KUAT_RADIAL_PROGRESS_COLORS = [
  "default",
  "primary",
  "ee-blue",
  "tech-blue",
  "transform-teal",
  "equal-ember",
] as const

export type KuatRadialProgressSize =
  (typeof KUAT_RADIAL_PROGRESS_SIZES)[number]
export type KuatRadialProgressColor =
  (typeof KUAT_RADIAL_PROGRESS_COLORS)[number]
