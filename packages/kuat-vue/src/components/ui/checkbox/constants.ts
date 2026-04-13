export const CHECKBOX_FIELD_APPEARANCES = ["plain", "card"] as const
export type CheckboxFieldAppearance = (typeof CHECKBOX_FIELD_APPEARANCES)[number]

export const CHECKBOX_FIELD_LAYOUTS = ["inline", "block"] as const
export type CheckboxFieldLayout = (typeof CHECKBOX_FIELD_LAYOUTS)[number]
