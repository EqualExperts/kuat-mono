"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import "./badge.css"

export const BADGE_VARIANTS = ["default", "secondary", "destructive", "outline", "ghost"] as const
export type BadgeVariant = (typeof BADGE_VARIANTS)[number]

export const BADGE_ROUNDNESS = ["default", "round"] as const
export type BadgeRoundness = (typeof BADGE_ROUNDNESS)[number]

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant
  roundness?: BadgeRoundness
}

let warnedDeprecated = false

/**
 * @deprecated Use `StatusBadge` for status indication, `Tag` for categorisation, or
 * `CounterBadge` for numeric counts. See kuat-docs/DEPRECATIONS.md. Removal target: next major.
 */
function Badge({ className, variant = "default", roundness = "default", ...props }: BadgeProps) {
  if (process.env.NODE_ENV !== "production" && !warnedDeprecated) {
    warnedDeprecated = true
    console.warn(
      "[kuat-react] Badge is deprecated - use StatusBadge (status), Tag (categorisation), or CounterBadge (counts). See kuat-docs/DEPRECATIONS.md."
    )
  }
  return (
    <div
      className={cn("badge", `badge--${variant}`, `badge--roundness-${roundness}`, className)}
      {...props}
    />
  )
}

/**
 * Returns class string for badge variant (backward compatibility).
 * @deprecated Use `statusBadgeVariants`, `tagVariants`, or `counterBadgeVariants` instead.
 */
export function badgeVariants(options: { variant?: BadgeVariant; roundness?: BadgeRoundness }) {
  const v = options?.variant ?? "default"
  const r = options?.roundness ?? "default"
  return cn("badge", `badge--${v}`, `badge--roundness-${r}`)
}

export { Badge }
