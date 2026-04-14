export const RADIO_FIELD_APPEARANCES = ["plain", "card"] as const
export type RadioFieldAppearance = (typeof RADIO_FIELD_APPEARANCES)[number]

export const RADIO_FIELD_LAYOUTS = ["inline", "block"] as const
export type RadioFieldLayout = (typeof RADIO_FIELD_LAYOUTS)[number]
