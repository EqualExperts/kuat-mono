import { h } from "vue"
import { toast as primitiveToast, type ExternalToast } from "vue-sonner"

export type SonnerAnnouncement = "polite" | "assertive"
export type SonnerToastOptions = Omit<ExternalToast, "important"> & {
  announcement?: SonnerAnnouncement
}
type SonnerMessage = Parameters<typeof primitiveToast>[0]
const defaultLoadingIcon = h("span", {
  "aria-hidden": "true",
  class: "kuat-sonner__loading-spinner",
})

function resolveAnnouncement(options?: SonnerToastOptions): ExternalToast {
  if (!options) return { important: false }

  const { announcement = "polite", ...rest } = options
  return {
    ...rest,
    important: announcement === "assertive",
  }
}

type ToastHandler = ((message: SonnerMessage, options?: SonnerToastOptions) => string | number) & {
  success: (message: SonnerMessage, options?: SonnerToastOptions) => string | number
  info: (message: SonnerMessage, options?: SonnerToastOptions) => string | number
  warning: (message: SonnerMessage, options?: SonnerToastOptions) => string | number
  error: (message: SonnerMessage, options?: SonnerToastOptions) => string | number
  loading: (message: SonnerMessage, options?: SonnerToastOptions) => string | number
  dismiss: typeof primitiveToast.dismiss
}

export const toast: ToastHandler = Object.assign(
  (message: SonnerMessage, options?: SonnerToastOptions) =>
    primitiveToast(message, resolveAnnouncement(options)),
  {
    success: (message: SonnerMessage, options?: SonnerToastOptions) =>
      primitiveToast.success(message, resolveAnnouncement(options)),
    info: (message: SonnerMessage, options?: SonnerToastOptions) =>
      primitiveToast.info(message, resolveAnnouncement(options)),
    warning: (message: SonnerMessage, options?: SonnerToastOptions) =>
      primitiveToast.warning(message, resolveAnnouncement(options)),
    error: (message: SonnerMessage, options?: SonnerToastOptions) =>
      primitiveToast.error(message, resolveAnnouncement(options)),
    loading: (message: SonnerMessage, options?: SonnerToastOptions) =>
      primitiveToast(message, {
        duration: Number.POSITIVE_INFINITY,
        icon: defaultLoadingIcon,
        ...resolveAnnouncement(options),
      }),
    dismiss: primitiveToast.dismiss,
  },
)
