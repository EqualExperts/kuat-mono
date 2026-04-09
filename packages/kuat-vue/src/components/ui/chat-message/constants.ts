export const CHAT_MESSAGE_VARIANTS = ["user", "assistant", "system"] as const
export type ChatMessageVariant = (typeof CHAT_MESSAGE_VARIANTS)[number]
