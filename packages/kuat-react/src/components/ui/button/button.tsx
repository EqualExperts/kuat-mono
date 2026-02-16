"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

import "./button.css"

export const BUTTON_VARIANTS = [
  "default",
  "destructive",
  "outline",
  "secondary",
  "ghost",
  "link",
] as const
export const BUTTON_SIZES = ["default", "sm", "lg", "icon"] as const
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number]
export type ButtonSize = (typeof BUTTON_SIZES)[number]

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={cn(
          "button",
          `button--variant-${variant}`,
          `button--size-${size}`,
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

/** Returns class string for button variant/size (backward compatibility). */
export function buttonVariants(options?: {
  variant?: ButtonVariant
  size?: ButtonSize
}) {
  const v = options?.variant ?? "default"
  const s = options?.size ?? "default"
  return cn(
    "button",
    `button--variant-${v}`,
    `button--size-${s}`
  )
}

export { Button }
