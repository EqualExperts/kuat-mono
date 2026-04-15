"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"

import { cn } from "@/lib/utils"

import { type ToggleSize, type ToggleSkin } from "./constants"
import "./toggle.css"

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {
  size?: ToggleSize
  skin?: ToggleSkin
}

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({ className, size = "regular", skin = "outlined", ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn("toggle", `toggle--size-${size}`, `toggle--skin-${skin}`, className)}
    data-slot="toggle"
    {...props}
  />
))
Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle }
