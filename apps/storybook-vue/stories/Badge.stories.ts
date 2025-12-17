import type { Meta, StoryObj } from "@storybook/vue3";
import { Badge } from "@equal-experts/kuat-vue";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
      description: "The visual style variant of the badge",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge v-bind="args">Badge</Badge>',
  }),
};

export const Secondary: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge variant="secondary">Secondary</Badge>',
  }),
};

export const Destructive: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge variant="destructive">Destructive</Badge>',
  }),
};

export const Outline: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: '<Badge variant="outline">Outline</Badge>',
  }),
};

export const AllVariants: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="flex flex-wrap gap-4">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Display all badge variants together for comparison.",
      },
    },
  },
};

export const LightMode: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="flex flex-wrap gap-4 p-4 bg-white">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    `,
  }),
  parameters: {
    backgrounds: { default: "light" },
    docs: {
      description: {
        story: "Badge variants in light mode.",
      },
    },
  },
};

export const DarkMode: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="dark flex flex-wrap gap-4 p-4 bg-slate-950">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    `,
  }),
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "Badge variants in dark mode.",
      },
    },
  },
};

export const WithStatus: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <span>Active:</span>
          <Badge>Active</Badge>
        </div>
        <div class="flex items-center gap-2">
          <span>In Progress:</span>
          <Badge variant="secondary">In Progress</Badge>
        </div>
        <div class="flex items-center gap-2">
          <span>Error:</span>
          <Badge variant="destructive">Error</Badge>
        </div>
        <div class="flex items-center gap-2">
          <span>Draft:</span>
          <Badge variant="outline">Draft</Badge>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Common use case: displaying status indicators with labels.",
      },
    },
  },
};

