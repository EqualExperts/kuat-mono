import type { Meta, StoryObj } from "@storybook/vue3";
import { ChatComposer, Button } from "@equal-experts/kuat-vue";
import { Send } from "lucide-vue-next";

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
  render: () => ({
    components: { ChatComposer, Button, Send },
    template: `
      <ChatComposer
        :textarea-props="{
          placeholder: 'Message the assistant…',
          'aria-label': 'Chat message',
        }"
      >
        <template #toolbar>
          <span class="text-xs text-muted-foreground">Model: default</span>
        </template>
        <template #actions>
          <Button type="button" size="icon" aria-label="Send message">
            <Send class="size-4" />
          </Button>
        </template>
      </ChatComposer>
    `,
  }),
};

export const InputOnly: Story = {
  render: () => ({
    components: { ChatComposer },
    template: `
      <ChatComposer
        :textarea-props="{
          class: 'min-h-[48px] resize-none',
          placeholder: 'Type a message',
        }"
      />
    `,
  }),
};
