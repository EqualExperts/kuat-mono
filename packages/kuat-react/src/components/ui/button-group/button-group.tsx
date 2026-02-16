"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

import "./button-group.css"

export const BUTTON_GROUP_ORIENTATIONS = ["horizontal", "vertical"] as const
export type ButtonGroupOrientation =
  (typeof BUTTON_GROUP_ORIENTATIONS)[number]

export interface ButtonGroupProps extends React.ComponentProps<"div"> {
  orientation?: ButtonGroupOrientation
}

function ButtonGroup({
  className,
  orientation = "horizontal",
  ...props
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(
        "button-group",
        `button-group--${orientation}`,
        className
      )}
      {...props}
    />
  )
}

export interface ButtonGroupTextProps extends React.ComponentProps<"div"> {
  asChild?: boolean
}

function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: ButtonGroupTextProps) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      className={cn("button-group-text", className)}
      {...props}
    />
  )
}

export interface ButtonGroupSeparatorProps
  extends React.ComponentProps<typeof Separator> {}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: ButtonGroupSeparatorProps) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn("button-group-separator", className)}
      {...props}
    />
  )
}

/** Returns class string for button group (backward compatibility). */
export function buttonGroupVariants(options?: {
  orientation?: ButtonGroupOrientation
}) {
  const o = options?.orientation ?? "horizontal"
  return cn("button-group", `button-group--${o}`)
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
}
