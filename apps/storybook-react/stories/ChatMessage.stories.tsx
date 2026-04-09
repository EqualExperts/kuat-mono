import type { Meta, StoryObj } from "@storybook/react";
import { ChatMessage } from "@equal-experts/kuat-react";

const meta: Meta<typeof ChatMessage> = {
  title: "Kuat Chat/ChatMessage",
  component: ChatMessage,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["user", "assistant", "system"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChatMessage>;

export const Assistant: Story = {
  args: {
    variant: "assistant",
    author: "Assistant",
    content:
      "I can help with design tokens, components, and layout patterns for Kuat.",
  },
};

export const User: Story = {
  args: {
    variant: "user",
    author: "You · 10:42",
    content: "Add a chat layout block to the design system.",
  },
};

export const System: Story = {
  args: {
    variant: "system",
    content: "Conversation archived. Start a new thread anytime.",
  },
};

export const WithFooter: Story = {
  args: {
    variant: "assistant",
    author: "Assistant",
    content: "Here is a short reply.",
    footer: <span className="text-muted-foreground">Copy · Regenerate</span>,
  },
};

/** Rich markup still uses `children` instead of `content`. */
export const RichContent: Story = {
  render: () => (
    <ChatMessage variant="assistant" author="Assistant">
      <p className="m-0">
        The first slice includes <code className="text-xs">KuatChatLayout</code>,{" "}
        <code className="text-xs">ChatMessage</code>, and{" "}
        <code className="text-xs">ChatComposer</code>.
      </p>
    </ChatMessage>
  ),
};
