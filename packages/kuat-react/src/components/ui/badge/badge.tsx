"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import "./badge.css"

export const BADGE_VARIANTS = ["default", "secondary", "destructive", "outline"] as const
export type BadgeVariant = (typeof BADGE_VARIANTS)[number]

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn("badge", `badge--${variant}`, className)}
      {...props}
    />
  )
}

/** Returns class string for badge variant (backward compatibility). */
export function badgeVariants(options: { variant?: BadgeVariant }) {
  const v = options?.variant ?? "default"
  return cn("badge", `badge--${v}`)
}

export { Badge }
