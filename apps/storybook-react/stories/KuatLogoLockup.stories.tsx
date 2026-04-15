import type { Meta, StoryObj } from "@storybook/react"
import { KuatLogoLockup } from "@equal-experts/kuat-react"
import { kuatLogoLockupDocs } from "../docs/component-docs"

const meta: Meta<typeof KuatLogoLockup> = {
  title: "Kuat Blocks/KuatLogoLockup",
  component: KuatLogoLockup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: kuatLogoLockupDocs,
      },
    },
  },
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

export const ServiceLight: Story = {
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
  args: {
    title: "Service name",
    use: "service",
    mode: "dark",
  },
  render: (args) => (
    <div style={{ padding: "1rem", background: "#0f172a" }}>
      <KuatLogoLockup {...args} />
    </div>
  ),
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
  args: {
    title: "Security and AI Research",
    use: "demo",
    mode: "dark",
  },
  render: (args) => (
    <div style={{ padding: "1rem", background: "#0f172a" }}>
      <KuatLogoLockup {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Demo use in dark mode on a dark background.",
      },
    },
  },
}

export const ForceDarkOnDarkBackground: Story = {
  args: {
    title: "My Service",
    use: "service",
    mode: "light",
    forceDark: true,
  },
  render: (args) => (
    <div style={{ padding: "1rem", background: "#1e293b" }}>
      <KuatLogoLockup {...args} />
    </div>
  ),
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
  args: {
    title: "Service name",
    use: "service",
    mode: "light",
  },
  render: (args) => (
    <div style={{ width: "200px", border: "1px dashed #e2e8f0", padding: "0.5rem" }}>
      <KuatLogoLockup {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Service lockup in a narrow container (vertical layout: logo above name).",
      },
    },
  },
}

export const ResponsiveServiceWide: Story = {
  args: {
    title: "Service name",
    use: "service",
    mode: "light",
  },
  render: (args) => (
    <div style={{ width: "400px", border: "1px dashed #e2e8f0", padding: "0.5rem" }}>
      <KuatLogoLockup {...args} />
    </div>
  ),
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
  render: () => (
    <div className="flex flex-col gap-8 p-4">
      <section>
        <h3 className="text-sm font-medium mb-2">Service – Light</h3>
        <KuatLogoLockup title="Service name" use="service" mode="light" />
      </section>
      <section>
        <h3 className="text-sm font-medium mb-2">Service – Dark</h3>
        <div style={{ padding: "0.5rem", background: "#0f172a", borderRadius: "6px" }}>
          <KuatLogoLockup title="Service name" use="service" mode="dark" />
        </div>
      </section>
      <section>
        <h3 className="text-sm font-medium mb-2">Demo – Light</h3>
        <KuatLogoLockup
          title="Security and AI Research"
          use="demo"
          mode="light"
        />
      </section>
      <section>
        <h3 className="text-sm font-medium mb-2">Demo – Dark</h3>
        <div style={{ padding: "0.5rem", background: "#0f172a", borderRadius: "6px" }}>
          <KuatLogoLockup
            title="Security and AI Research"
            use="demo"
            mode="dark"
          />
        </div>
      </section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All mode and use combinations.",
      },
    },
  },
}
