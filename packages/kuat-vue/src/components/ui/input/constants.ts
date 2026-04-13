export const INPUT_SIZES = ["regular", "large", "small", "mini"] as const
export type InputSize = (typeof INPUT_SIZES)[number]
