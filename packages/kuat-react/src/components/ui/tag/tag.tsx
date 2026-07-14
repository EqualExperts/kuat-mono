"use client"

import * as React from "react"
import { Check, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { useTagGroup } from "@/components/ui/tag-group/tag-group-context"

import "./tag.css"

export const TAG_COLORS = [
  "base",
  "index-indigo",
  "transform-teal",
  "packet-plum",
  "server-slate",
  "logic-lime",
  "signal-yellow",
  "cursor-coral",
  "patch-peach",
] as const
export type TagColor = (typeof TAG_COLORS)[number]

export const TAG_MODES = ["display", "toggle", "dismiss"] as const
export type TagMode = (typeof TAG_MODES)[number]

export interface TagProps extends React.HTMLAttributes<HTMLElement> {
  color?: TagColor
  /** One interaction model per group: display (non-interactive), toggle (multi-select filter), or dismiss (removable). Do not mix toggle and dismiss tags within the same group. */
  mode?: TagMode
  /** Toggle mode only: whether the tag is selected. */
  selected?: boolean
  /** Toggle mode only: called with the next selected state on click. */
  onSelectedChange?: (selected: boolean) => void
  /** Dismiss mode only: called when the tag is dismissed. */
  onDismiss?: () => void
  disabled?: boolean
}

const Tag = React.forwardRef<HTMLElement, TagProps>(function Tag(
  {
    className,
    color = "base",
    mode = "display",
    selected = false,
    onSelectedChange,
    onDismiss,
    onClick,
    children,
    ...props
  },
  ref
): React.ReactElement {
  const group = useTagGroup()

  const interactive = mode !== "display"
  const selectedVisual = mode === "dismiss" || (mode === "toggle" && selected)

  const classes = cn(
    "tag",
    `tag--${color}`,
    interactive && "tag--interactive",
    selectedVisual && "tag--selected",
    className
  )

  if (!interactive) {
    return (
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        data-slot="tag"
        data-color={color}
        data-mode={mode}
        className={classes}
        {...props}
      >
        {children}
      </span>
    )
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event)
    if (event.defaultPrevented) return
    if (mode === "toggle") {
      onSelectedChange?.(!selected)
    } else {
      const label = event.currentTarget.textContent?.trim()
      if (label) group?.announce(`${label} removed`)
      onDismiss?.()
    }
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      data-slot="tag"
      data-color={color}
      data-mode={mode}
      aria-pressed={mode === "toggle" ? selected : undefined}
      className={classes}
      onClick={handleClick}
      {...props}
    >
      {children}
      {mode === "toggle" && selected ? (
        <Check aria-hidden="true" className="tag__icon" data-slot="tag-icon" />
      ) : null}
      {mode === "dismiss" ? (
        <X aria-hidden="true" className="tag__icon" data-slot="tag-icon" />
      ) : null}
    </button>
  )
})
Tag.displayName = "Tag"

/** Returns class string for tag variant (backward compatibility). */
export function tagVariants(options?: {
  color?: TagColor
  mode?: TagMode
  selected?: boolean
}) {
  const c = options?.color ?? "base"
  const m = options?.mode ?? "display"
  const selectedVisual = m === "dismiss" || (m === "toggle" && !!options?.selected)
  return cn(
    "tag",
    `tag--${c}`,
    m !== "display" && "tag--interactive",
    selectedVisual && "tag--selected"
  )
}

export { Tag }
