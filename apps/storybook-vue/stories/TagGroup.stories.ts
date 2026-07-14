/**
 * TagGroup – localized UI component. Accessibility wrapper for Tag sets (group role, label, live region).
 */
import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import { Tag, TagGroup } from "@equal-experts/kuat-vue";
import { tagGroupDocs } from "../docs/component-docs";

const meta: Meta<typeof TagGroup> = {
  title: "Data Display/TagGroup",
  component: TagGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: tagGroupDocs,
      },
    },

    a11y: { test: "error" },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Accessible name for the group (required)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TagGroup>;

export const Default: Story = {
  render: () => ({
    components: { Tag, TagGroup },
    template: `
      <TagGroup label="Technologies">
        <Tag color="index-indigo">React</Tag>
        <Tag color="transform-teal">Vue</Tag>
        <Tag color="packet-plum">TypeScript</Tag>
        <Tag color="logic-lime">Node</Tag>
      </TagGroup>
    `,
  }),
};

export const WrappingRow: Story = {
  render: () => ({
    components: { Tag, TagGroup },
    template: `
      <div class="max-w-md">
        <TagGroup label="Skills">
          <Tag color="index-indigo">Product strategy</Tag>
          <Tag color="transform-teal">Service design</Tag>
          <Tag color="packet-plum">User research</Tag>
          <Tag color="server-slate">Accessibility</Tag>
          <Tag color="logic-lime">Data engineering</Tag>
          <Tag color="signal-yellow">Platform</Tag>
          <Tag color="cursor-coral">Delivery</Tag>
          <Tag color="patch-peach">Coaching</Tag>
        </TagGroup>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Tags wrap onto new rows with an 8px gap in both axes — plain flex-wrap, no layout logic.",
      },
    },
  },
};

export const DismissWithReflow: Story = {
  render: () => ({
    components: { Tag, TagGroup },
    setup() {
      const tags = ref(["Design", "Engineering", "Data", "Delivery", "Research"]);
      const remove = (text: string) => {
        tags.value = tags.value.filter((t) => t !== text);
      };
      return { tags, remove };
    },
    template: `
      <div class="max-w-sm">
        <TagGroup label="Applied filters">
          <Tag
            v-for="text in tags"
            :key="text"
            color="transform-teal"
            mode="dismiss"
            @dismiss="remove(text)"
          >
            {{ text }}
          </Tag>
        </TagGroup>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Dismissing a tag reflows the remaining tags automatically and announces the removal (e.g. \"Design removed\") via the group's polite aria-live region.",
      },
    },
  },
};
