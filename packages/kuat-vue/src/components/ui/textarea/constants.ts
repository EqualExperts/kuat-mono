export const TEXTAREA_RESIZE = ["none", "vertical", "horizontal", "both"] as const
export type TextareaResize = (typeof TEXTAREA_RESIZE)[number]
