"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import "./input.css"

export const INPUT_SIZES = ["regular", "large", "small", "mini"] as const
export type InputSize = (typeof INPUT_SIZES)[number]

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Visual size; maps to `input--size-*` (not the HTML `size` attribute). */
  size?: InputSize
  /** Optional content before the field (icon, text, checkbox, etc.). */
  leftDecoration?: React.ReactNode
  /** Optional content after the field (suffix text, button, icon, etc.). */
  rightDecoration?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size = "regular",
      leftDecoration,
      rightDecoration,
      type = "text",
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn("input", `input--size-${size}`, className)}
        data-slot="input"
      >
        {leftDecoration ? (
          <span className="input__decoration input__decoration--left">
            {leftDecoration}
          </span>
        ) : null}
        <input
          ref={ref}
          type={type}
          className="input__field"
          data-slot="input-field"
          {...props}
        />
        {rightDecoration ? (
          <span className="input__decoration input__decoration--right">
            {rightDecoration}
          </span>
        ) : null}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
