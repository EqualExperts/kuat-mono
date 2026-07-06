export const CALLOUT_TYPES = ["info", "positive", "warning", "issue"] as const
export type CalloutType = (typeof CALLOUT_TYPES)[number]

export interface CalloutAction {
  label: string
  href: string
  target?: string
  onClick?: (event: MouseEvent) => void
}
