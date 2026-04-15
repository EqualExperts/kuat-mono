export const TOGGLE_GROUP_ORIENTATIONS = ["horizontal", "vertical"] as const
export type ToggleGroupOrientation = (typeof TOGGLE_GROUP_ORIENTATIONS)[number]
