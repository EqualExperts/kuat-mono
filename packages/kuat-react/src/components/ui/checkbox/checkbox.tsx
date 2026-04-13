"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check, Minus } from "lucide-react"

import { cn } from "@/lib/utils"

import "./checkbox.css"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn("checkbox", className)}
    data-slot="checkbox"
    {...props}
  >
    <CheckboxPrimitive.Indicator className="checkbox__indicator">
      <Check className="checkbox__icon checkbox__icon--check" aria-hidden />
      <Minus className="checkbox__icon checkbox__icon--indeterminate" aria-hidden />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export type CheckboxProps = React.ComponentPropsWithoutRef<typeof Checkbox>

export { Checkbox }
