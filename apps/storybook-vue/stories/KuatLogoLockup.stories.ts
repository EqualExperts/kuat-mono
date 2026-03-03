import type { Meta, StoryObj } from "@storybook/vue3"
import { KuatLogoLockup } from "@equal-experts/kuat-vue"

const meta: Meta<typeof KuatLogoLockup> = {
  title: "Kuat Blocks/KuatLogoLockup",
  component: KuatLogoLockup,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description:
        "Service name (Service use) or primary title (Demo use).",
    },
    use: {
      control: "select",
      options: ["service", "demo"],
      description:
        "Service: logo first + name. Demo: title primary, 'A demo by' + small logo.",
    },
    mode: {
      control: "select",
      options: ["light", "dark"],
      description: "Visual theme (light or dark text/background treatment).",
    },
    forceDark: {
      control: "boolean",
      description:
        "When true, force dark styling (e.g. when placed on a dark background).",
    },
  },
}

export default meta
type Story = StoryObj<typeof KuatLogoLockup>

const render = (args: object) => ({
  components: { KuatLogoLockup },
  setup() {
    return { args }
  },
  template: '<KuatLogoLockup v-bind="args" />',
})

export const ServiceLight: Story = {
  render,
  args: {
    title: "Service name",
    use: "service",
    mode: "light",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Service use in light mode. Layout is responsive: horizontal on wider containers, vertical on narrower.",
      },
    },
  },
}

export const ServiceDark: Story = {
  render: (args: object) => ({
    components: { KuatLogoLockup },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 1rem; background: #0f172a">
        <KuatLogoLockup v-bind="args" />
      </div>
    `,
  }),
  args: {
    title: "Service name",
    use: "service",
    mode: "dark",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Service use in dark mode. Shows icon-only EE mark. Use on dark backgrounds.",
      },
    },
  },
}

export const DemoLight: Story = {
  render,
  args: {
    title: "Security and AI Research",
    use: "demo",
    mode: "light",
  },
  parameters: {
    docs: {
      description: {
        story: "Demo use in light mode. Title primary, 'A demo by' + small EE logo.",
      },
    },
  },
}

export const DemoDark: Story = {
  render: (args: object) => ({
    components: { KuatLogoLockup },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 1rem; background: #0f172a">
        <KuatLogoLockup v-bind="args" />
      </div>
    `,
  }),
  args: {
    title: "Security and AI Research",
    use: "demo",
    mode: "dark",
  },
  parameters: {
    docs: {
      description: {
        story: "Demo use in dark mode on a dark background.",
      },
    },
  },
}

export const ForceDarkOnDarkBackground: Story = {
  render: (args: object) => ({
    components: { KuatLogoLockup },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 1rem; background: #1e293b">
        <KuatLogoLockup v-bind="args" />
      </div>
    `,
  }),
  args: {
    title: "My Service",
    use: "service",
    mode: "light",
    forceDark: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "forceDark=true forces dark styling even when mode is light. Use when the lockup sits on a dark background.",
      },
    },
  },
}

export const ResponsiveServiceNarrow: Story = {
  render: (args: object) => ({
    components: { KuatLogoLockup },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 200px; border: 1px dashed #e2e8f0; padding: 0.5rem">
        <KuatLogoLockup v-bind="args" />
      </div>
    `,
  }),
  args: {
    title: "Service name",
    use: "service",
    mode: "light",
  },
  parameters: {
    docs: {
      description: {
        story: "Service lockup in a narrow container (vertical layout: logo above name).",
      },
    },
  },
}

export const ResponsiveServiceWide: Story = {
  render: (args: object) => ({
    components: { KuatLogoLockup },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 400px; border: 1px dashed #e2e8f0; padding: 0.5rem">
        <KuatLogoLockup v-bind="args" />
      </div>
    `,
  }),
  args: {
    title: "Service name",
    use: "service",
    mode: "light",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Service lockup in a wide container (horizontal layout: logo | separator | name).",
      },
    },
  },
}

export const AllVariants: Story = {
  render: () => ({
    components: { KuatLogoLockup },
    template: `
      <div class="flex flex-col gap-8 p-4">
        <section>
          <h3 class="text-sm font-medium mb-2">Service – Light</h3>
          <KuatLogoLockup title="Service name" use="service" mode="light" />
        </section>
        <section>
          <h3 class="text-sm font-medium mb-2">Service – Dark</h3>
          <div style="padding: 0.5rem; background: #0f172a; border-radius: 6px">
            <KuatLogoLockup title="Service name" use="service" mode="dark" />
          </div>
        </section>
        <section>
          <h3 class="text-sm font-medium mb-2">Demo – Light</h3>
          <KuatLogoLockup title="Security and AI Research" use="demo" mode="light" />
        </section>
        <section>
          <h3 class="text-sm font-medium mb-2">Demo – Dark</h3>
          <div style="padding: 0.5rem; background: #0f172a; border-radius: 6px">
            <KuatLogoLockup title="Security and AI Research" use="demo" mode="dark" />
          </div>
        </section>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "All mode and use combinations.",
      },
    },
  },
}
