"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"

import "./radio.css"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn("radio-group", className)}
    data-slot="radio-group"
    {...props}
  />
))
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn("radio", className)}
    data-slot="radio-group-item"
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="radio__indicator">
      <span className="radio__dot" aria-hidden />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
))
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export type RadioGroupProps = React.ComponentPropsWithoutRef<typeof RadioGroup>
export type RadioGroupItemProps = React.ComponentPropsWithoutRef<typeof RadioGroupItem>

export { RadioGroup, RadioGroupItem }
