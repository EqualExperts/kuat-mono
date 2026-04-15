export const SWITCH_FIELD_APPEARANCES = ["plain", "card"] as const
export type SwitchFieldAppearance = (typeof SWITCH_FIELD_APPEARANCES)[number]

export const SWITCH_FIELD_LAYOUTS = ["inline", "block"] as const
export type SwitchFieldLayout = (typeof SWITCH_FIELD_LAYOUTS)[number]
