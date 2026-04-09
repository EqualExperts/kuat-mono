import type { Meta, StoryObj } from "@storybook/react";
import { ChatComposer, Button } from "@equal-experts/kuat-react";
import { Send } from "lucide-react";

const meta: Meta<typeof ChatComposer> = {
  title: "Kuat Chat/ChatComposer",
  component: ChatComposer,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof ChatComposer>;

export const Default: Story = {
  render: () => (
    <ChatComposer
      toolbar={<span className="text-xs text-muted-foreground">Model: default</span>}
      textareaProps={{
        placeholder: "Message the assistant…",
        "aria-label": "Chat message",
      }}
      actions={
        <Button type="button" size="icon" aria-label="Send message">
          <Send className="size-4" />
        </Button>
      }
    />
  ),
};

export const InputOnly: Story = {
  render: () => (
    <ChatComposer
      textareaProps={{
        className: "min-h-[48px] resize-none",
        placeholder: "Type a message",
      }}
    />
  ),
};

export const CustomInput: Story = {
  render: () => (
    <ChatComposer
      actions={
        <Button type="button" size="sm">
          Send
        </Button>
      }
    >
      <textarea
        className="min-h-[48px] w-full rounded-md border border-dashed border-muted-foreground/40 bg-muted/30 px-3 py-2 text-sm"
        placeholder="Fully custom field"
      />
    </ChatComposer>
  ),
};
