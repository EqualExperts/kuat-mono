"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"
import type { KuatSlotContent } from "@/lib/react-node-compat"
import { Separator } from "@/components/ui/separator"

import "./button-group.css"

export const BUTTON_GROUP_ORIENTATIONS = ["horizontal", "vertical"] as const
export type ButtonGroupOrientation =
  (typeof BUTTON_GROUP_ORIENTATIONS)[number]

export interface ButtonGroupProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  orientation?: ButtonGroupOrientation
  children?: KuatSlotContent
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  function ButtonGroup(
    { className, orientation = "horizontal", ...props },
    ref
  ): React.ReactElement {
    return (
      <div
        ref={ref}
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
)
ButtonGroup.displayName = "ButtonGroup"

export interface ButtonGroupTextProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  asChild?: boolean
  children?: KuatSlotContent
}

const ButtonGroupText = React.forwardRef<HTMLDivElement, ButtonGroupTextProps>(
  function ButtonGroupText(
    { className, asChild = false, ...props },
    ref
  ): React.ReactElement {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        ref={ref}
        className={cn("button-group-text", className)}
        {...props}
      />
    )
  }
)
ButtonGroupText.displayName = "ButtonGroupText"

export interface ButtonGroupSeparatorProps
  extends React.ComponentProps<typeof Separator> {}

const ButtonGroupSeparator = React.forwardRef<
  React.ComponentRef<typeof Separator>,
  ButtonGroupSeparatorProps
>(function ButtonGroupSeparator(
  { className, orientation = "vertical", ...props },
  ref
): React.ReactElement {
  return (
    <Separator
      ref={ref}
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn("button-group-separator", className)}
      {...props}
    />
  )
})
ButtonGroupSeparator.displayName = "ButtonGroupSeparator"

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
