"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

import type { ButtonColor, ButtonVariant } from "../button/button"

import "./icon-button.css"

/** @deprecated Use "primary" instead. */
export const ICON_BUTTON_VARIANT_DEFAULT_ALIAS = "default"
export const ICON_BUTTON_SIZES = ["mini", "small", "regular", "large"] as const
/** @deprecated Use "small" instead. */
export const ICON_BUTTON_SIZE_SM_ALIAS = "sm"
/** @deprecated Use "large" instead. */
export const ICON_BUTTON_SIZE_LG_ALIAS = "lg"

export const ICON_BUTTON_ROUNDNESS = ["default", "round"] as const

export type IconButtonSize = (typeof ICON_BUTTON_SIZES)[number]
export type IconButtonRoundness = (typeof ICON_BUTTON_ROUNDNESS)[number]

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant | typeof ICON_BUTTON_VARIANT_DEFAULT_ALIAS
  size?: IconButtonSize | typeof ICON_BUTTON_SIZE_SM_ALIAS | typeof ICON_BUTTON_SIZE_LG_ALIAS
  color?: ButtonColor
  roundness?: IconButtonRoundness
  asChild?: boolean
}

function normalizeVariant(
  v: IconButtonProps["variant"]
): ButtonVariant {
  if (v === "default") return "primary"
  return (v ?? "primary") as ButtonVariant
}

function normalizeSize(
  s: IconButtonProps["size"]
): IconButtonSize {
  if (s === "sm") return "small"
  if (s === "lg") return "large"
  return (s ?? "regular") as IconButtonSize
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "regular",
      color = "ee-blue",
      roundness = "default",
      asChild = false,
      type = "button",
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
        type={asChild ? undefined : type}
        className={cn(
          "button",
          "icon-button",
          `button--variant-${v}`,
          colorClass,
          `icon-button--size-${s}`,
          `icon-button--roundness-${roundness}`,
          className
        )}
        {...props}
      />
    )
  }
)
IconButton.displayName = "IconButton"

function iconButtonVariants(options?: {
  variant?: IconButtonProps["variant"]
  size?: IconButtonProps["size"]
  color?: ButtonColor
  roundness?: IconButtonRoundness
}) {
  const v = normalizeVariant(options?.variant ?? "primary")
  const s = normalizeSize(options?.size ?? "regular")
  const c = options?.color ?? "ee-blue"
  const r = options?.roundness ?? "default"
  const isDestructive = v === "destructive"
  const colorClass = isDestructive ? undefined : `button--color-${c}`
  return cn(
    "button",
    "icon-button",
    `button--variant-${v}`,
    colorClass,
    `icon-button--size-${s}`,
    `icon-button--roundness-${r}`
  )
}

export { IconButton, iconButtonVariants }
