export const TOGGLE_SIZES = ["mini", "small", "regular", "large"] as const
export type ToggleSize = (typeof TOGGLE_SIZES)[number]

export const TOGGLE_SKINS = ["outlined", "ghost"] as const
export type ToggleSkin = (typeof TOGGLE_SKINS)[number]
