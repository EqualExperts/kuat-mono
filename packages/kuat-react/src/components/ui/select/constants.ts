import type * as React from "react"

export const SELECT_SIZES = ["regular", "large", "small", "mini"] as const
export type SelectSize = (typeof SELECT_SIZES)[number]

export const SELECT_LINES = ["single", "double"] as const
export type SelectLines = (typeof SELECT_LINES)[number]

export interface SelectItemOption {
  value: string
  label: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
  prepend?: React.ReactNode
  decoration?: React.ReactNode
}

export interface SelectItemGroup {
  label: React.ReactNode
  items: SelectItemOption[]
}

export type SelectItems = Array<SelectItemOption | SelectItemGroup>

export function isSelectItemGroup(
  item: SelectItemOption | SelectItemGroup
): item is SelectItemGroup {
  return "items" in item
}
