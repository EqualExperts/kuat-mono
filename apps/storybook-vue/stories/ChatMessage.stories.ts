import type { Meta, StoryObj } from "@storybook/vue3";
import { ChatMessage } from "@equal-experts/kuat-vue";

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
  render: (args) => ({
    components: { ChatMessage },
    setup() {
      return { args };
    },
    template: `<ChatMessage v-bind="args" />`,
  }),
  args: {
    variant: "assistant",
    author: "Assistant",
    content:
      "I can help with design tokens, components, and layout patterns for Kuat.",
  },
};

export const User: Story = {
  render: (args) => ({
    components: { ChatMessage },
    setup() {
      return { args };
    },
    template: `<ChatMessage v-bind="args" />`,
  }),
  args: {
    variant: "user",
    author: "You · 10:42",
    content: "Add a chat layout block to the design system.",
  },
};

export const System: Story = {
  render: (args) => ({
    components: { ChatMessage },
    setup() {
      return { args };
    },
    template: `<ChatMessage v-bind="args" />`,
  }),
  args: {
    variant: "system",
    content: "Conversation archived. Start a new thread anytime.",
  },
};

export const RichContent: Story = {
  render: () => ({
    components: { ChatMessage },
    template: `
      <ChatMessage variant="assistant" author="Assistant">
        <p class="m-0">
          The first slice includes <code class="text-xs">KuatChatLayout</code>,
          <code class="text-xs">ChatMessage</code>, and
          <code class="text-xs">ChatComposer</code>.
        </p>
      </ChatMessage>
    `,
  }),
};
