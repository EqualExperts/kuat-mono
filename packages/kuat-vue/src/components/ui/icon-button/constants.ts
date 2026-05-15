import type { ButtonVariant, ButtonColor } from "../button/constants"

export type { ButtonVariant, ButtonColor }

/** @deprecated Use "primary" instead. */
export const ICON_BUTTON_VARIANT_DEFAULT_ALIAS = "default"
export const ICON_BUTTON_SIZES = ["mini", "small", "regular", "large"] as const
/** @deprecated Use "small" instead. */
export const ICON_BUTTON_SIZE_SM_ALIAS = "sm"
/** @deprecated Use "large" instead. */
export const ICON_BUTTON_SIZE_LG_ALIAS = "lg"

export const ICON_BUTTON_ROUNDNESS = ["default", "round"] as const

export type IconButtonSize = (typeof ICON_BUTTON_SIZES)[number]
export type IconButtonRoundness = (typeof ICON_BUTTON_ROUNDNESS)[number]
