"use client"

import * as React from "react"
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import type { KuatSlotContent } from "@/lib/react-node-compat"

import "./callout.css"

export const CALLOUT_TYPES = ["info", "positive", "warning", "issue"] as const
export type CalloutType = (typeof CALLOUT_TYPES)[number]

const CALLOUT_ICONS: Record<CalloutType, typeof Info> = {
  info: Info,
  positive: CheckCircle2,
  warning: AlertTriangle,
  issue: XCircle,
}

export interface CalloutAction {
  label: string
  href: string
  target?: React.HTMLAttributeAnchorTarget
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export interface CalloutProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  type?: CalloutType
  title: KuatSlotContent
  description?: KuatSlotContent
  icon?: boolean
  action?: CalloutAction
}

const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(function Callout(
  { className, type = "info", title, description, icon = true, action, ...props },
  ref
): React.ReactElement {
  const Icon = CALLOUT_ICONS[type]

  return (
    <div
      ref={ref}
      role="status"
      data-slot="callout"
      data-type={type}
      className={cn("callout", `callout--${type}`, className)}
      {...props}
    >
      {icon ? (
        <Icon aria-hidden="true" className="callout__icon" data-slot="callout-icon" />
      ) : null}
      <div className="callout__content" data-slot="callout-content">
        <div className="callout__text-content">
          <p className="callout__title" data-slot="callout-title">
            {title}
          </p>
          {description != null ? (
            <p className="callout__description" data-slot="callout-description">
              {description}
            </p>
          ) : null}
          {action ? (
            <a
              className="callout__action"
              data-slot="callout-action"
              href={action.href}
              target={action.target}
              onClick={action.onClick}
            >
              {action.label}
            </a>
          ) : null}
        </div>
      </div>
    </div>
  )
})
Callout.displayName = "Callout"

export { Callout }
