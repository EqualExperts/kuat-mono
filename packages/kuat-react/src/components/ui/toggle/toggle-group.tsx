"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"

import { cn } from "@/lib/utils"

import { type ToggleSize, type ToggleSkin } from "./constants"
import "./toggle-group.css"

export type ToggleGroupProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupProps
>(({ className, orientation = "horizontal", ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("toggle-group", `toggle-group--${orientation}`, className)}
    data-slot="toggle-group"
    orientation={orientation}
    {...props}
  />
))
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

export interface ToggleGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> {
  size?: ToggleSize
  skin?: ToggleSkin
}

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(({ className, size = "regular", skin = "outlined", ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    className={cn(
      "toggle-group-item",
      `toggle-group-item--size-${size}`,
      `toggle-group-item--skin-${skin}`,
      className
    )}
    data-slot="toggle-group-item"
    {...props}
  />
))
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
