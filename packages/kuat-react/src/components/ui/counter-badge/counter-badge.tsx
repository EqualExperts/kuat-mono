"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import "./counter-badge.css"

export const COUNTER_BADGE_TYPES = ["primary", "attention"] as const
export type CounterBadgeType = (typeof COUNTER_BADGE_TYPES)[number]

export interface CounterBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  count: number
  /** Counts above this render as "{max}+". */
  max?: number
  type?: CounterBadgeType
}

const CounterBadge = React.forwardRef<HTMLSpanElement, CounterBadgeProps>(function CounterBadge(
  { className, count, max = 99, type = "primary", ...props },
  ref
): React.ReactElement {
  const display = count > max ? `${max}+` : String(count)

  return (
    <span
      ref={ref}
      data-slot="counter-badge"
      data-type={type}
      className={cn("counter-badge", `counter-badge--${type}`, className)}
      {...props}
    >
      {display}
    </span>
  )
})
CounterBadge.displayName = "CounterBadge"

/** Returns class string for counter badge variant (backward compatibility). */
export function counterBadgeVariants(options?: { type?: CounterBadgeType }) {
  const t = options?.type ?? "primary"
  return cn("counter-badge", `counter-badge--${t}`)
}

export { CounterBadge }
