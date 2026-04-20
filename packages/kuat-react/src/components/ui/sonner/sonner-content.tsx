"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type SonnerContentAction = {
  label: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  ariaLabel?: string
}

export type SonnerContentProps = {
  className?: string
  title: React.ReactNode
  description?: React.ReactNode
  leftIcon?: React.ReactNode
  showLeftIcon?: boolean
  action?: SonnerContentAction
}

export function SonnerContent({
  className,
  title,
  description,
  leftIcon,
  showLeftIcon = true,
  action,
}: SonnerContentProps) {
  return (
    <div className={cn("kuat-sonner__content", className)}>
      {showLeftIcon ? <div className="kuat-sonner__icon">{leftIcon}</div> : null}
      <div className="kuat-sonner__text">
        <div className="kuat-sonner__title">{title}</div>
        {description ? <div className="kuat-sonner__description">{description}</div> : null}
      </div>
      {action ? (
        <button
          type="button"
          className="kuat-sonner__action"
          aria-label={action.ariaLabel ?? action.label}
          onClick={action.onClick}
        >
          {action.label}
        </button>
      ) : null}
    </div>
  )
}
