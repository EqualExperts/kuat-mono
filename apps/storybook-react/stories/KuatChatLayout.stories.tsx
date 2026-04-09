import type { Meta, StoryObj } from "@storybook/react";
import {
  KuatChatLayout,
  ChatMessage,
  ChatComposer,
  Button,
} from "@equal-experts/kuat-react";
import { Send } from "lucide-react";

const meta: Meta<typeof KuatChatLayout> = {
  title: "Kuat Blocks/KuatChatLayout",
  component: KuatChatLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof KuatChatLayout>;

const shellClass = "h-[min(100vh,720px)] border border-border rounded-lg overflow-hidden bg-background";

export const Composed: Story = {
  render: () => (
    <div className="p-4">
      <div className={shellClass}>
        <KuatChatLayout
          title="Demo chat"
          headerMeta={<span>Kuat</span>}
          messages={
            <>
              <ChatMessage
                variant="user"
                author="You"
                content="What is in the first chat slice?"
              />
              <ChatMessage variant="assistant" author="Assistant">
                <p className="m-0">
                  The first slice includes <code className="text-xs">KuatChatLayout</code>,{" "}
                  <code className="text-xs">ChatMessage</code>, and{" "}
                  <code className="text-xs">ChatComposer</code> — presentational building blocks
                  for Gen AI interfaces.
                </p>
              </ChatMessage>
              <ChatMessage
                variant="system"
                content="Tip: the layout applies scroll and spacing inside the messages region."
              />
            </>
          }
          sidePanel={
            <div className="text-sm">
              <p className="mt-0 font-medium">Sources</p>
              <ul className="list-disc pl-4 text-muted-foreground">
                <li>kuat-docs</li>
                <li>Component patterns</li>
              </ul>
            </div>
          }
          composer={
            <ChatComposer
              toolbar={
                <span className="text-xs text-muted-foreground">Attachments: none</span>
              }
              textareaProps={{
                placeholder: "Reply…",
                "aria-label": "Reply",
              }}
              actions={
                <Button type="button" size="icon" aria-label="Send message">
                  <Send className="size-4" />
                </Button>
              }
            />
          }
        />
      </div>
    </div>
  ),
};

export const MessagesAndComposerOnly: Story = {
  render: () => (
    <div className="p-4">
      <div className={shellClass}>
        <KuatChatLayout
          messages={
            <>
              <ChatMessage
                variant="assistant"
                author="Assistant"
                content="No header or side panel — only messages and composer slots."
              />
            </>
          }
          composer={
            <ChatComposer
              textareaProps={{ placeholder: "Message" }}
              actions={
                <Button type="button" size="sm">
                  Send
                </Button>
              }
            />
          }
        />
      </div>
    </div>
  ),
};
