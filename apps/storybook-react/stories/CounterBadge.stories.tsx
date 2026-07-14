/**
 * CounterBadge – localized UI component. Digits-only count pill per Figma (node 3454:333).
 */
import type { Meta, StoryObj } from "@storybook/react";
import { CounterBadge } from "@equal-experts/kuat-react";
import { BellIcon } from "lucide-react";
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
  args: {
    count: 1,
  },
};

export const Attention: Story = {
  args: {
    count: 3,
    type: "attention",
  },
};

export const Overflow: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <CounterBadge count={1} />
      <CounterBadge count={42} />
      <CounterBadge count={99} />
      <CounterBadge count={100} />
      <CounterBadge count={100} type="attention" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Counts above the cap (99 by default) render as "99+".',
      },
    },
  },
};

export const OverlayAnchoring: Story = {
  render: () => (
    <div className="flex items-center gap-8 p-4">
      <div className="relative inline-flex">
        <BellIcon aria-hidden="true" className="size-6 text-foreground" />
        <CounterBadge count={3} type="attention" className="absolute -right-2 -top-2" />
      </div>
      <div className="relative inline-flex">
        <BellIcon aria-hidden="true" className="size-6 text-foreground" />
        <CounterBadge count={120} className="absolute -right-3 -top-2" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Designed use: top-right overlay anchoring on icons or avatars.",
      },
    },
  },
};

export const LightAndDarkMode: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-4 bg-white p-4">
        <CounterBadge count={8} />
        <CounterBadge count={8} type="attention" />
      </div>
      <div className="dark flex flex-wrap gap-4 bg-slate-950 p-4">
        <CounterBadge count={8} />
        <CounterBadge count={8} type="attention" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Both types on light and dark backgrounds (semantic tokens, same fill both modes).",
      },
    },
  },
};
