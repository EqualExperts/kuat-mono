"use client"

import {
  Toaster as SonnerPrimitive,
  toast as sonnerToast,
  type ExternalToast,
  type ToasterProps as SonnerPrimitiveProps,
} from "sonner"

import { cn } from "@/lib/utils"

import "./sonner.css"

const SONNER_POSITIONS = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
] as const

export type SonnerPosition = (typeof SONNER_POSITIONS)[number]
export type SonnerAnnouncement = "polite" | "assertive"
type SonnerMessage = Parameters<typeof sonnerToast>[0]
type SonnerToastPayload = ExternalToast & { important?: boolean }
export type SonnerToastOptions = Omit<ExternalToast, "important"> & {
  announcement?: SonnerAnnouncement
}

export type SonnerProps = SonnerPrimitiveProps

const defaultToastOptions = {
  classNames: {
    toast: "kuat-sonner__toast",
    title: "kuat-sonner__title",
    description: "kuat-sonner__description",
    content: "kuat-sonner__content",
    icon: "kuat-sonner__icon",
    actionButton: "kuat-sonner__action",
    cancelButton: "kuat-sonner__cancel",
    loader: "kuat-sonner__loader",
  },
} satisfies NonNullable<SonnerPrimitiveProps["toastOptions"]>

const defaultLoadingIcon = (
  <span aria-hidden="true" className="kuat-sonner__loading-spinner" />
)

function mergeToastOptions(
  toastOptions?: SonnerPrimitiveProps["toastOptions"],
): SonnerPrimitiveProps["toastOptions"] {
  if (!toastOptions) return { ...defaultToastOptions }

  return {
    ...defaultToastOptions,
    ...toastOptions,
    classNames: {
      ...defaultToastOptions.classNames,
      ...toastOptions.classNames,
    },
  }
}

function resolveAnnouncement(options?: SonnerToastOptions): SonnerToastPayload {
  if (!options) return { important: false }

  const { announcement = "polite", ...rest } = options

  return {
    ...rest,
    important: announcement === "assertive",
  }
}

export function Sonner({
  className,
  position = "top-right",
  visibleToasts = 3,
  expand = false,
  containerAriaLabel = "Notifications",
  toastOptions,
  ...props
}: SonnerProps) {
  return (
    <SonnerPrimitive
      className={cn("kuat-sonner__toaster", className)}
      position={position}
      visibleToasts={visibleToasts}
      expand={expand}
      containerAriaLabel={containerAriaLabel}
      toastOptions={mergeToastOptions(toastOptions)}
      {...props}
    />
  )
}

export function toast(message: SonnerMessage, options?: SonnerToastOptions) {
  return sonnerToast(message, resolveAnnouncement(options))
}

toast.success = (message: SonnerMessage, options?: SonnerToastOptions) =>
  sonnerToast.success(message, resolveAnnouncement(options))
toast.info = (message: SonnerMessage, options?: SonnerToastOptions) =>
  sonnerToast.info(message, resolveAnnouncement(options))
toast.warning = (message: SonnerMessage, options?: SonnerToastOptions) =>
  sonnerToast.warning(message, resolveAnnouncement(options))
toast.error = (message: SonnerMessage, options?: SonnerToastOptions) =>
  sonnerToast.error(message, resolveAnnouncement(options))
toast.loading = (message: SonnerMessage, options?: SonnerToastOptions) =>
  sonnerToast(message, {
    duration: Number.POSITIVE_INFINITY,
    icon: defaultLoadingIcon,
    ...resolveAnnouncement(options),
  })
toast.dismiss = sonnerToast.dismiss

export { SONNER_POSITIONS }
