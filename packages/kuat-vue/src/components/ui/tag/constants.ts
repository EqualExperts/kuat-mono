export const TAG_COLORS = [
  "base",
  "index-indigo",
  "transform-teal",
  "packet-plum",
  "server-slate",
  "logic-lime",
  "signal-yellow",
  "cursor-coral",
  "patch-peach",
] as const
export type TagColor = (typeof TAG_COLORS)[number]

export const TAG_MODES = ["display", "toggle", "dismiss"] as const
export type TagMode = (typeof TAG_MODES)[number]
