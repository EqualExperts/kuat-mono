/**
 * StatusBadge – localized UI component. Non-interactive status indicator per Figma (node 3425:546).
 */
import type { Meta, StoryObj } from "@storybook/vue3";
import { StatusBadge } from "@equal-experts/kuat-vue";
import { statusBadgeDocs } from "../docs/component-docs";

const meta: Meta<typeof StatusBadge> = {
  title: "Data Display/StatusBadge",
  component: StatusBadge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: statusBadgeDocs,
      },
    },

    a11y: { test: "error" },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["success", "warning", "error", "info", "neutral"],
      description: "Semantic status type; sets the fill colour and icon",
    },
    size: {
      control: "select",
      options: ["base", "large"],
      description: "Base (12px text) or Large (14px text)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Success: Story = {
  render: (args) => ({
    components: { StatusBadge },
    setup() {
      return { args };
    },
    template: '<StatusBadge v-bind="args">Success</StatusBadge>',
  }),
};

export const Warning: Story = {
  render: () => ({
    components: { StatusBadge },
    template: '<StatusBadge type="warning">Warning</StatusBadge>',
  }),
};

export const Error: Story = {
  render: () => ({
    components: { StatusBadge },
    template: '<StatusBadge type="error">Error</StatusBadge>',
  }),
};

export const Info: Story = {
  render: () => ({
    components: { StatusBadge },
    template: '<StatusBadge type="info">Info</StatusBadge>',
  }),
};

export const Neutral: Story = {
  render: () => ({
    components: { StatusBadge },
    template: '<StatusBadge type="neutral">Neutral</StatusBadge>',
  }),
};

export const AllTypes: Story = {
  render: () => ({
    components: { StatusBadge },
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap items-center gap-2">
          <StatusBadge type="success">Success</StatusBadge>
          <StatusBadge type="warning">Warning</StatusBadge>
          <StatusBadge type="error">Error</StatusBadge>
          <StatusBadge type="info">Info</StatusBadge>
          <StatusBadge type="neutral">Neutral</StatusBadge>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <StatusBadge type="success" size="large">Success</StatusBadge>
          <StatusBadge type="warning" size="large">Warning</StatusBadge>
          <StatusBadge type="error" size="large">Error</StatusBadge>
          <StatusBadge type="info" size="large">Info</StatusBadge>
          <StatusBadge type="neutral" size="large">Neutral</StatusBadge>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "All five types in both sizes (Base row, Large row).",
      },
    },
  },
};

export const LightMode: Story = {
  render: () => ({
    components: { StatusBadge },
    template: `
      <div class="flex flex-wrap gap-4 bg-white p-4">
        <StatusBadge type="success">Success</StatusBadge>
        <StatusBadge type="warning">Warning</StatusBadge>
        <StatusBadge type="error">Error</StatusBadge>
        <StatusBadge type="info">Info</StatusBadge>
        <StatusBadge type="neutral">Neutral</StatusBadge>
      </div>
    `,
  }),
  parameters: {
    backgrounds: { default: "light" },
    docs: {
      description: {
        story: "StatusBadge types in light mode.",
      },
    },
  },
};

export const DarkMode: Story = {
  render: () => ({
    components: { StatusBadge },
    template: `
      <div class="dark flex flex-wrap gap-4 bg-slate-950 p-4">
        <StatusBadge type="success">Success</StatusBadge>
        <StatusBadge type="warning">Warning</StatusBadge>
        <StatusBadge type="error">Error</StatusBadge>
        <StatusBadge type="info">Info</StatusBadge>
        <StatusBadge type="neutral">Neutral</StatusBadge>
      </div>
    `,
  }),
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story:
          "StatusBadge types in dark mode. Fills are raw brand ramps, so rendering matches light mode — no dark-mode spec exists yet.",
      },
    },
  },
};

export const WithStatus: Story = {
  render: () => ({
    components: { StatusBadge },
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <span>Profile complete:</span>
          <StatusBadge type="success">Complete</StatusBadge>
        </div>
        <div class="flex items-center gap-2">
          <span>Payment details:</span>
          <StatusBadge type="warning">Needs attention</StatusBadge>
        </div>
        <div class="flex items-center gap-2">
          <span>Deployment:</span>
          <StatusBadge type="error">Failed</StatusBadge>
        </div>
        <div class="flex items-center gap-2">
          <span>Environment:</span>
          <StatusBadge type="info">Staging</StatusBadge>
        </div>
        <div class="flex items-center gap-2">
          <span>Records:</span>
          <StatusBadge type="neutral">Archived</StatusBadge>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Per-type usage: Success = completed/positive, Warning = needs attention, Error = failure/destructive, Info = neutral informational, Neutral = non-semantic metadata.",
      },
    },
  },
};
