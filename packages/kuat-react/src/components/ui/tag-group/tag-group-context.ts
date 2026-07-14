"use client"

import * as React from "react"

export interface TagGroupContextValue {
  /** Push a message to the group's aria-live region (e.g. "Design removed"). */
  announce: (message: string) => void
}

export const TagGroupContext = React.createContext<TagGroupContextValue | null>(null)

/** Returns the enclosing TagGroup's context, or null outside a TagGroup. */
export function useTagGroup(): TagGroupContextValue | null {
  return React.useContext(TagGroupContext)
}
