export const SELECT_SIZES = ["regular", "large", "small", "mini"] as const
export type SelectSize = (typeof SELECT_SIZES)[number]

export const SELECT_LINES = ["single", "double"] as const
export type SelectLines = (typeof SELECT_LINES)[number]

export interface SelectItemOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
  prepend?: string
  decoration?: string
}

export interface SelectItemGroup {
  label: string
  items: SelectItemOption[]
}

export type SelectItems = Array<SelectItemOption | SelectItemGroup>

export function isSelectItemGroup(
  item: SelectItemOption | SelectItemGroup
): item is SelectItemGroup {
  return "items" in item
}
