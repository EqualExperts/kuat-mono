"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { Switch } from "./switch"

import "./switch-field.css"

export const SWITCH_FIELD_APPEARANCES = ["plain", "card"] as const
export type SwitchFieldAppearance = (typeof SWITCH_FIELD_APPEARANCES)[number]

export const SWITCH_FIELD_LAYOUTS = ["inline", "block"] as const
export type SwitchFieldLayout = (typeof SWITCH_FIELD_LAYOUTS)[number]

export interface SwitchFieldProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Switch>, "id" | "children"> {
  /** Primary label (always shown). */
  label: React.ReactNode
  /** Optional secondary line (12px muted); works for both plain and card. */
  secondaryText?: React.ReactNode
  /** `plain` — no border/padding; `card` — bordered padded container. */
  appearance?: SwitchFieldAppearance
  /** `inline` — compact label; `block` — label row can grow. */
  layout?: SwitchFieldLayout
  /** Place switch on the right of the text block. */
  flipped?: boolean
  id?: string
}

const SwitchField = React.forwardRef<
  React.ElementRef<typeof Switch>,
  SwitchFieldProps
>(
  (
    {
      className,
      label,
      secondaryText,
      appearance = "plain",
      layout = "inline",
      flipped = false,
      id: idProp,
      disabled,
      ...switchProps
    },
    ref
  ) => {
    const generatedId = React.useId()
    const id = idProp ?? generatedId
    const hasSecondary = secondaryText != null
    const isInvalid =
      switchProps["aria-invalid"] === true ||
      switchProps["aria-invalid"] === "true"

    return (
      <div
        className={cn(
          "switch-field",
          `switch-field--appearance-${appearance}`,
          `switch-field--layout-${layout}`,
          hasSecondary && "switch-field--has-secondary",
          flipped && "switch-field--flipped",
          disabled && "switch-field--disabled",
          isInvalid && "switch-field--invalid",
          className
        )}
        data-slot="switch-field"
      >
        <label className="switch-field__label" htmlFor={id}>
          <span className="switch-field__switch-wrap">
            <Switch ref={ref} id={id} disabled={disabled} {...switchProps} />
          </span>
          <span className="switch-field__text">
            <span className="switch-field__primary">{label}</span>
            {hasSecondary ? (
              <span className="switch-field__secondary">{secondaryText}</span>
            ) : null}
          </span>
        </label>
      </div>
    )
  }
)
SwitchField.displayName = "SwitchField"

export { SwitchField }
