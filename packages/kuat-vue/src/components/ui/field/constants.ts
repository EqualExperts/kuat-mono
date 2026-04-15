export const FIELD_ORIENTATIONS = ["responsive", "vertical", "horizontal"] as const
export type FieldOrientation = (typeof FIELD_ORIENTATIONS)[number]

export const FIELD_LEGEND_VARIANTS = ["legend", "label"] as const
export type FieldLegendVariant = (typeof FIELD_LEGEND_VARIANTS)[number]
