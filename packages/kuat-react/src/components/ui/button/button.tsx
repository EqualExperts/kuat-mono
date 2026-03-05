"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

import "./button.css"

export const BUTTON_VARIANTS = [
  "primary",
  "secondary",
  "outline",
  "ghost",
  "ghost-muted",
  "destructive",
] as const
/** @deprecated Use "primary" instead. */
export const BUTTON_VARIANT_DEFAULT_ALIAS = "default"
export const BUTTON_SIZES = ["mini", "small", "default", "large", "icon"] as const
/** @deprecated Use "small" instead. */
export const BUTTON_SIZE_SM_ALIAS = "sm"
/** @deprecated Use "large" instead. */
export const BUTTON_SIZE_LG_ALIAS = "lg"
export const BUTTON_COLORS = [
  "ee-blue",
  "tech-blue",
  "byte-white",
  "the-cloud",
  "dark-data",
  "transform-teal",
  "equal-ember",
] as const

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number]
export type ButtonSize = (typeof BUTTON_SIZES)[number]
export type ButtonColor = (typeof BUTTON_COLORS)[number]

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant | typeof BUTTON_VARIANT_DEFAULT_ALIAS
  size?: ButtonSize | typeof BUTTON_SIZE_SM_ALIAS | typeof BUTTON_SIZE_LG_ALIAS
  color?: ButtonColor
  asChild?: boolean
}

function normalizeVariant(
  v: ButtonProps["variant"]
): ButtonVariant {
  if (v === "default") return "primary"
  return (v ?? "primary") as ButtonVariant
}

function normalizeSize(
  s: ButtonProps["size"]
): ButtonSize {
  if (s === "sm") return "small"
  if (s === "lg") return "large"
  return (s ?? "default") as ButtonSize
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      color = "ee-blue",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const v = normalizeVariant(variant)
    const s = normalizeSize(size)
    const isDestructive = v === "destructive"
    const colorClass = isDestructive ? undefined : `button--color-${color}`
    return (
      <Comp
        ref={ref}
        className={cn(
          "button",
          `button--variant-${v}`,
          colorClass,
          `button--size-${s}`,
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

/** Returns class string for button variant/size/color (backward compatibility). */
export function buttonVariants(options?: {
  variant?: ButtonVariant | "default"
  size?: ButtonSize | "sm" | "lg"
  color?: ButtonColor
}) {
  const v = normalizeVariant(options?.variant ?? "primary")
  const s = normalizeSize(options?.size ?? "default")
  const c = options?.color ?? "ee-blue"
  const isDestructive = v === "destructive"
  const colorClass = isDestructive ? "" : `button--color-${c}`
  return cn(
    "button",
    `button--variant-${v}`,
    colorClass,
    `button--size-${s}`
  )
}

export { Button }
