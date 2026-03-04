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

function Badge({ className, variant = "default", roundness = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn("badge", `badge--${variant}`, `badge--roundness-${roundness}`, className)}
      {...props}
    />
  )
}

/** Returns class string for badge variant (backward compatibility). */
export function badgeVariants(options: { variant?: BadgeVariant; roundness?: BadgeRoundness }) {
  const v = options?.variant ?? "default"
  const r = options?.roundness ?? "default"
  return cn("badge", `badge--${v}`, `badge--roundness-${r}`)
}

export { Badge }
