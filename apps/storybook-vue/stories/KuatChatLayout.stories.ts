import type { Meta, StoryObj } from "@storybook/vue3";
import {
  KuatChatLayout,
  ChatMessage,
  ChatComposer,
  Button,
} from "@equal-experts/kuat-vue";
import { Send } from "lucide-vue-next";

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
  render: () => ({
    components: {
      KuatChatLayout,
      ChatMessage,
      ChatComposer,
      Button,
      Send,
    },
    template: `
      <div class="p-4">
        <div class="${shellClass}">
          <KuatChatLayout title="Demo chat">
            <template #header-meta>Kuat</template>
            <template #messages>
              <ChatMessage variant="user" author="You" content="What is in the first chat slice?" />
              <ChatMessage variant="assistant" author="Assistant">
                <p class="m-0">
                  The first slice includes <code class="text-xs">KuatChatLayout</code>,
                  <code class="text-xs">ChatMessage</code>, and
                  <code class="text-xs">ChatComposer</code> — presentational building blocks
                  for Gen AI interfaces.
                </p>
              </ChatMessage>
              <ChatMessage
                variant="system"
                content="Tip: the layout applies scroll and spacing inside the messages region."
              />
            </template>
            <template #side-panel>
              <div class="text-sm">
                <p class="mt-0 font-medium">Sources</p>
                <ul class="list-disc pl-4 text-muted-foreground">
                  <li>kuat-docs</li>
                  <li>Component patterns</li>
                </ul>
              </div>
            </template>
            <template #composer>
              <ChatComposer
                :textarea-props="{
                  placeholder: 'Reply…',
                  'aria-label': 'Reply',
                }"
              >
                <template #toolbar>
                  <span class="text-xs text-muted-foreground">Attachments: none</span>
                </template>
                <template #actions>
                  <Button type="button" size="icon" aria-label="Send message">
                    <Send class="size-4" />
                  </Button>
                </template>
              </ChatComposer>
            </template>
          </KuatChatLayout>
        </div>
      </div>
    `,
  }),
};

export const MessagesAndComposerOnly: Story = {
  render: () => ({
    components: { KuatChatLayout, ChatMessage, ChatComposer, Button },
    template: `
      <div class="p-4">
        <div class="${shellClass}">
          <KuatChatLayout>
            <template #messages>
              <ChatMessage
                variant="assistant"
                author="Assistant"
                content="No header or side panel — only messages and composer slots."
              />
            </template>
            <template #composer>
              <ChatComposer
                :textarea-props="{ placeholder: 'Message' }"
              >
                <template #actions>
                  <Button type="button" size="sm">Send</Button>
                </template>
              </ChatComposer>
            </template>
          </KuatChatLayout>
        </div>
      </div>
    `,
  }),
};
