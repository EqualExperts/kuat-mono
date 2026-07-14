import type { InjectionKey } from "vue"

export interface TagGroupContextValue {
  /** Push a message to the group's aria-live region (e.g. "Design removed"). */
  announce: (message: string) => void
}

export const TAG_GROUP_INJECTION_KEY: InjectionKey<TagGroupContextValue> =
  Symbol("KuatTagGroup")
