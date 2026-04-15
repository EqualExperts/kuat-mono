"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

import "./switch.css"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn("switch", className)}
    data-slot="switch"
    {...props}
  >
    <SwitchPrimitive.Thumb className="switch__thumb" data-slot="switch-thumb" />
  </SwitchPrimitive.Root>
))
Switch.displayName = SwitchPrimitive.Root.displayName

export type SwitchProps = React.ComponentPropsWithoutRef<typeof Switch>

export { Switch }
