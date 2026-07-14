"use client"

import * as React from "react"
import { AlertCircle, BadgeInfo, CheckCircle2, XCircle } from "lucide-react"

import { cn } from "@/lib/utils"

import "./status-badge.css"

export const STATUS_BADGE_TYPES = ["success", "warning", "error", "info", "neutral"] as const
export type StatusBadgeType = (typeof STATUS_BADGE_TYPES)[number]

export const STATUS_BADGE_SIZES = ["base", "large"] as const
export type StatusBadgeSize = (typeof STATUS_BADGE_SIZES)[number]

/* Icons per type match the Figma component (circle-check / circle-alert / circle-x / badge-info).
   Neutral has no icon by design. */
const STATUS_BADGE_ICONS: Record<Exclude<StatusBadgeType, "neutral">, typeof CheckCircle2> = {
  success: CheckCircle2,
  warning: AlertCircle,
  error: XCircle,
  info: BadgeInfo,
}

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  type?: StatusBadgeType
  size?: StatusBadgeSize
}

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(function StatusBadge(
  { className, type = "success", size = "base", children, ...props },
  ref
): React.ReactElement {
  const Icon = type === "neutral" ? null : STATUS_BADGE_ICONS[type]

  return (
    <span
      ref={ref}
      data-slot="status-badge"
      data-type={type}
      data-size={size}
      className={cn(
        "status-badge",
        `status-badge--${type}`,
        `status-badge--size-${size}`,
        className
      )}
      {...props}
    >
      {Icon ? (
        <Icon aria-hidden="true" className="status-badge__icon" data-slot="status-badge-icon" />
      ) : null}
      {children}
    </span>
  )
})
StatusBadge.displayName = "StatusBadge"

/** Returns class string for status badge variant (backward compatibility). */
export function statusBadgeVariants(options?: {
  type?: StatusBadgeType
  size?: StatusBadgeSize
}) {
  const t = options?.type ?? "success"
  const s = options?.size ?? "base"
  return cn("status-badge", `status-badge--${t}`, `status-badge--size-${s}`)
}

export { StatusBadge }
