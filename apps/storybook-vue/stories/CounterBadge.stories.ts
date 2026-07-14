/**
 * CounterBadge – localized UI component. Digits-only count pill per Figma (node 3454:333).
 */
import type { Meta, StoryObj } from "@storybook/vue3";
import { CounterBadge } from "@equal-experts/kuat-vue";
import { BellIcon } from "lucide-vue-next";
import { counterBadgeDocs } from "../docs/component-docs";

const meta: Meta<typeof CounterBadge> = {
  title: "Data Display/CounterBadge",
  component: CounterBadge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: counterBadgeDocs,
      },
    },

    a11y: { test: "error" },
  },
  argTypes: {
    count: {
      control: "number",
      description: "The count to display",
    },
    max: {
      control: "number",
      description: 'Counts above this render as "{max}+" (default 99)',
    },
    type: {
      control: "select",
      options: ["primary", "attention"],
      description: "Primary (brand blue) or Attention (destructive red)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CounterBadge>;

export const Primary: Story = {
  render: (args) => ({
    components: { CounterBadge },
    setup() {
      return { args };
    },
    template: '<CounterBadge v-bind="args" />',
  }),
  args: {
    count: 1,
  },
};

export const Attention: Story = {
  render: () => ({
    components: { CounterBadge },
    template: '<CounterBadge :count="3" type="attention" />',
  }),
};

export const Overflow: Story = {
  render: () => ({
    components: { CounterBadge },
    template: `
      <div class="flex flex-wrap items-center gap-2">
        <CounterBadge :count="1" />
        <CounterBadge :count="42" />
        <CounterBadge :count="99" />
        <CounterBadge :count="100" />
        <CounterBadge :count="100" type="attention" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Counts above the cap (99 by default) render as "99+".',
      },
    },
  },
};

export const OverlayAnchoring: Story = {
  render: () => ({
    components: { CounterBadge, BellIcon },
    template: `
      <div class="flex items-center gap-8 p-4">
        <div class="relative inline-flex">
          <BellIcon aria-hidden="true" class="size-6 text-foreground" />
          <CounterBadge :count="3" type="attention" class="absolute -right-2 -top-2" />
        </div>
        <div class="relative inline-flex">
          <BellIcon aria-hidden="true" class="size-6 text-foreground" />
          <CounterBadge :count="120" class="absolute -right-3 -top-2" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Designed use: top-right overlay anchoring on icons or avatars.",
      },
    },
  },
};

export const LightAndDarkMode: Story = {
  render: () => ({
    components: { CounterBadge },
    template: `
      <div class="flex flex-col gap-2">
        <div class="flex flex-wrap gap-4 bg-white p-4">
          <CounterBadge :count="8" />
          <CounterBadge :count="8" type="attention" />
        </div>
        <div class="dark flex flex-wrap gap-4 bg-slate-950 p-4">
          <CounterBadge :count="8" />
          <CounterBadge :count="8" type="attention" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Both types on light and dark backgrounds (semantic tokens, same fill both modes).",
      },
    },
  },
};
