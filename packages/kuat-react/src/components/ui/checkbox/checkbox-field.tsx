"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "../field"
import { Checkbox } from "./checkbox"

import "./checkbox-field.css"

export const CHECKBOX_FIELD_APPEARANCES = ["plain", "card"] as const
export type CheckboxFieldAppearance = (typeof CHECKBOX_FIELD_APPEARANCES)[number]

export const CHECKBOX_FIELD_LAYOUTS = ["inline", "block"] as const
export type CheckboxFieldLayout = (typeof CHECKBOX_FIELD_LAYOUTS)[number]

/** @deprecated Prefer composing `Field` + `Checkbox` for new form layouts. */
export interface CheckboxFieldProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Checkbox>, "id" | "children"> {
  /** Primary label (always shown). */
  label: React.ReactNode
  /** Optional secondary line (12px muted); works for both plain and card. */
  secondaryText?: React.ReactNode
  /** `plain` — no border/padding; `card` — bordered padded container (Figma Rich). */
  appearance?: CheckboxFieldAppearance
  /** `inline` — compact label; `block` — label row can grow (Figma Checkbox Group). */
  layout?: CheckboxFieldLayout
  /** Place checkbox on the right of the text block. */
  flipped?: boolean
  id?: string
}

/** @deprecated Prefer composing `Field` + `Checkbox` for new form layouts. */
const CheckboxField = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  CheckboxFieldProps
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
      ...checkboxProps
    },
    ref
  ) => {
    const generatedId = React.useId()
    const id = idProp ?? generatedId
    const hasSecondary = secondaryText != null
    const isInvalid =
      checkboxProps["aria-invalid"] === true ||
      checkboxProps["aria-invalid"] === "true"

    return (
      <Field
        className={cn(
          "checkbox-field",
          `checkbox-field--appearance-${appearance}`,
          `checkbox-field--layout-${layout}`,
          hasSecondary && "checkbox-field--has-secondary",
          flipped && "checkbox-field--flipped",
          disabled && "checkbox-field--disabled",
          isInvalid && "checkbox-field--invalid",
          className
        )}
        data-slot="checkbox-field"
      >
        <FieldLabel className="checkbox-field__label" htmlFor={id}>
          <span className="checkbox-field__checkbox-wrap">
            <Checkbox ref={ref} id={id} disabled={disabled} {...checkboxProps} />
          </span>
          <FieldContent className="checkbox-field__text">
            <FieldTitle className="checkbox-field__primary">{label}</FieldTitle>
            {hasSecondary ? (
              <FieldDescription className="checkbox-field__secondary">
                {secondaryText}
              </FieldDescription>
            ) : null}
          </FieldContent>
        </FieldLabel>
      </Field>
    )
  }
)
CheckboxField.displayName = "CheckboxField"

export { CheckboxField }
