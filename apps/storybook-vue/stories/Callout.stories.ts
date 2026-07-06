/**
 * Callout – Kuat custom component. Info/positive/warning/issue banner with optional
 * description, per-type icon, and link action.
 */
import type { Meta, StoryObj } from "@storybook/vue3";
import { Callout, CALLOUT_TYPES } from "@equal-experts/kuat-vue";
import { calloutDocs } from "../docs/component-docs";

const meta: Meta<typeof Callout> = {
  title: "Feedback/Callout",
  component: Callout,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: calloutDocs,
      },
    },
    a11y: { test: "todo" },
  },
  argTypes: {
    type: {
      control: "select",
      options: CALLOUT_TYPES,
      description: "The semantic type of the callout",
    },
    icon: {
      control: "boolean",
      description: "Show or hide the per-type icon",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Callout>;

export const Default: Story = {
  render: () => ({
    components: { Callout },
    template: '<Callout title="Some good information" />',
  }),
};

export const WithDescription: Story = {
  render: () => ({
    components: { Callout },
    template: `
      <Callout
        title="Some good information"
        description="This view displays interaction level of members of the network over time. In order: Ambassadors, Contributors, Participants, Observers, Inactive"
      />
    `,
  }),
};

export const WithAction: Story = {
  render: () => ({
    components: { Callout },
    setup() {
      return { action: { label: "Close message", href: "#" } };
    },
    template: `
      <Callout
        title="Some good information"
        description="This view displays interaction level of members of the network over time. In order: Ambassadors, Contributors, Participants, Observers, Inactive"
        :action="action"
      />
    `,
  }),
};

export const Positive: Story = {
  render: () => ({
    components: { Callout },
    setup() {
      return { action: { label: "Close message", href: "#" } };
    },
    template: `
      <Callout
        type="positive"
        title="This is positive"
        description="This view displays interaction level of members of the network over time. In order: Ambassadors, Contributors, Participants, Observers, Inactive"
        :action="action"
      />
    `,
  }),
};

export const Warning: Story = {
  render: () => ({
    components: { Callout },
    setup() {
      return { action: { label: "Close message", href: "#" } };
    },
    template: `
      <Callout
        type="warning"
        title="A warning"
        description="This view displays interaction level of members of the network over time. In order: Ambassadors, Contributors, Participants, Observers, Inactive"
        :action="action"
      />
    `,
  }),
};

export const Issue: Story = {
  render: () => ({
    components: { Callout },
    setup() {
      return { action: { label: "Close message", href: "#" } };
    },
    template: `
      <Callout
        type="issue"
        title="Some is not good"
        description="This view displays interaction level of members of the network over time. In order: Ambassadors, Contributors, Participants, Observers, Inactive"
        :action="action"
      />
    `,
  }),
};

export const WithoutIcon: Story = {
  render: () => ({
    components: { Callout },
    template: '<Callout title="Some good information" :icon="false" />',
  }),
};

export const AllTypes: Story = {
  render: () => ({
    components: { Callout },
    setup() {
      return { types: CALLOUT_TYPES, action: { label: "Close message", href: "#" } };
    },
    template: `
      <div class="flex flex-col gap-4">
        <Callout
          v-for="type in types"
          :key="type"
          :type="type"
          :title="\`This is a \${type} callout\`"
          description="Supporting description text for this callout."
          :action="action"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Display all callout types together for comparison.",
      },
    },
  },
};

export const LightMode: Story = {
  render: () => ({
    components: { Callout },
    setup() {
      return { types: CALLOUT_TYPES };
    },
    template: `
      <div class="flex flex-col gap-4 bg-white p-4">
        <Callout v-for="type in types" :key="type" :type="type" :title="\`This is a \${type} callout\`" />
      </div>
    `,
  }),
  parameters: {
    backgrounds: { default: "light" },
    docs: {
      description: {
        story: "Callout types in light mode.",
      },
    },
  },
};

export const DarkMode: Story = {
  render: () => ({
    components: { Callout },
    setup() {
      return { types: CALLOUT_TYPES };
    },
    template: `
      <div class="dark flex flex-col gap-4 bg-slate-950 p-4">
        <Callout v-for="type in types" :key="type" :type="type" :title="\`This is a \${type} callout\`" />
      </div>
    `,
  }),
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "Callout types in dark mode.",
      },
    },
  },
};
