import type { Meta, StoryObj } from "@storybook/vue3"
import { KuatRadialProgress } from "@equal-experts/kuat-vue"
import { kuatRadialProgressDocs } from "../docs/component-docs"

const meta: Meta<typeof KuatRadialProgress> = {
  title: "Components/KuatRadialProgress",
  component: KuatRadialProgress,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: kuatRadialProgressDocs,
      },
    },
  
    a11y: { test: "todo" },
  },
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Progress value from 0 to 100",
    },
    size: {
      control: "select",
      options: ["mini", "small", "medium", "large"],
      description: "Size variant",
    },
    color: {
      control: "select",
      options: [
        "default",
        "primary",
        "ee-blue",
        "tech-blue",
        "transform-teal",
        "equal-ember",
      ],
      description: "Bar colour from Kuat palette",
    },
    animate: {
      control: "boolean",
      description: "Animate from 0 to value on mount",
    },
  },
}

export default meta

type Story = StoryObj<typeof KuatRadialProgress>

export const Default: Story = {
  args: {
    value: 25,
    size: "medium",
    animate: false,
  },
  render: (args) => ({
    components: { KuatRadialProgress },
    setup() {
      return { args }
    },
    template: `<KuatRadialProgress v-bind="args" />`,
  }),
  parameters: {
    docs: {
      description: {
        story: "Default radial progress at 25%.",
      },
    },
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { KuatRadialProgress },
    template: `
      <div class="flex flex-wrap items-end gap-8">
        <div class="flex flex-col items-center gap-2">
          <KuatRadialProgress :value="25" size="mini" />
          <span class="text-sm text-muted-foreground">mini</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <KuatRadialProgress :value="25" size="small" />
          <span class="text-sm text-muted-foreground">small</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <KuatRadialProgress :value="25" size="medium" />
          <span class="text-sm text-muted-foreground">medium</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <KuatRadialProgress :value="25" size="large" />
          <span class="text-sm text-muted-foreground">large</span>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "All four size variants (mini, small, medium, large) at 25%.",
      },
    },
  },
}

export const ColorVariants: Story = {
  render: () => ({
    components: { KuatRadialProgress },
    template: `
      <div class="flex flex-wrap gap-8">
        <div class="flex flex-col items-center gap-2">
          <KuatRadialProgress :value="40" color="default" />
          <span class="text-sm text-muted-foreground">default</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <KuatRadialProgress :value="40" color="primary" />
          <span class="text-sm text-muted-foreground">primary</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <KuatRadialProgress :value="40" color="ee-blue" />
          <span class="text-sm text-muted-foreground">ee-blue</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <KuatRadialProgress :value="40" color="tech-blue" />
          <span class="text-sm text-muted-foreground">tech-blue</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <KuatRadialProgress :value="40" color="transform-teal" />
          <span class="text-sm text-muted-foreground">transform-teal</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <KuatRadialProgress :value="40" color="equal-ember" />
          <span class="text-sm text-muted-foreground">equal-ember</span>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Bar colour variants from the Kuat palette.",
      },
    },
  },
}

export const Animated: Story = {
  args: {
    value: 75,
    size: "medium",
    animate: true,
  },
  render: (args) => ({
    components: { KuatRadialProgress },
    setup() {
      return { args }
    },
    template: `<KuatRadialProgress v-bind="args" />`,
  }),
  parameters: {
    docs: {
      description: {
        story: "Radial progress that animates from 0% to the value on load.",
      },
    },
  },
}

export const NotAnimated: Story = {
  args: {
    value: 75,
    size: "medium",
    animate: false,
  },
  render: (args) => ({
    components: { KuatRadialProgress },
    setup() {
      return { args }
    },
    template: `<KuatRadialProgress v-bind="args" />`,
  }),
  parameters: {
    docs: {
      description: {
        story: "Radial progress that shows the value immediately without animation.",
      },
    },
  },
}

export const ValueZero: Story = {
  args: {
    value: 0,
    size: "medium",
  },
  render: (args) => ({
    components: { KuatRadialProgress },
    setup() {
      return { args }
    },
    template: `<KuatRadialProgress v-bind="args" />`,
  }),
  parameters: {
    docs: {
      description: {
        story: "Edge case: 0%.",
      },
    },
  },
}

export const ValueHundred: Story = {
  args: {
    value: 100,
    size: "medium",
  },
  render: (args) => ({
    components: { KuatRadialProgress },
    setup() {
      return { args }
    },
    template: `<KuatRadialProgress v-bind="args" />`,
  }),
  parameters: {
    docs: {
      description: {
        story: "Edge case: 100%.",
      },
    },
  },
}

export const LightMode: Story = {
  render: () => ({
    components: { KuatRadialProgress },
    template: `
      <div class="flex flex-wrap gap-6 p-4 bg-white">
        <KuatRadialProgress :value="25" size="medium" />
        <KuatRadialProgress :value="50" size="medium" color="transform-teal" />
        <KuatRadialProgress :value="75" size="medium" color="equal-ember" />
      </div>
    `,
  }),
  parameters: {
    backgrounds: { default: "light" },
    docs: {
      description: {
        story: "Radial progress in light mode; centre text uses foreground token.",
      },
    },
  },
}

export const DarkMode: Story = {
  render: () => ({
    components: { KuatRadialProgress },
    template: `
      <div class="dark flex flex-wrap gap-6 p-4 bg-slate-950">
        <KuatRadialProgress :value="25" size="medium" />
        <KuatRadialProgress :value="50" size="medium" color="transform-teal" />
        <KuatRadialProgress :value="75" size="medium" color="equal-ember" />
      </div>
    `,
  }),
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "Radial progress in dark mode; bar and text use semantic tokens.",
      },
    },
  },
}
