export const KUAT_HEADER_VARIANTS = ["default", "bold"] as const
export type KuatHeaderVariant = (typeof KUAT_HEADER_VARIANTS)[number]

export const EE_LOGO_TEXT_COLORS = ["grey", "white"] as const
export type EELogoTextColor = (typeof EE_LOGO_TEXT_COLORS)[number]
