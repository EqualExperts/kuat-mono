"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { TagGroupContext } from "./tag-group-context"

import "./tag-group.css"

export interface TagGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Accessible name for the group, e.g. "Technology filters". */
  label: string
}

const TagGroup = React.forwardRef<HTMLDivElement, TagGroupProps>(function TagGroup(
  { className, label, children, ...props },
  ref
): React.ReactElement {
  const [message, setMessage] = React.useState("")
  const announce = React.useCallback((next: string) => setMessage(next), [])
  const context = React.useMemo(() => ({ announce }), [announce])

  return (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      data-slot="tag-group"
      className={cn("tag-group", className)}
      {...props}
    >
      <TagGroupContext.Provider value={context}>{children}</TagGroupContext.Provider>
      <span aria-live="polite" className="sr-only" data-slot="tag-group-live-region">
        {message}
      </span>
    </div>
  )
})
TagGroup.displayName = "TagGroup"

export { TagGroup }
