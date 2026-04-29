import type { Meta, StoryObj } from "@storybook/vue3"
import { h } from "vue"
import { Bell, Loader2 } from "lucide-vue-next"

import { Button, SONNER_POSITIONS, Sonner, toast } from "@equal-experts/kuat-vue"

import { sonnerDocs } from "../docs/component-docs"

const meta: Meta<typeof Sonner> = {
  title: "Feedback/Sonner",
  component: Sonner,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: sonnerDocs,
      },
    },
    layout: "fullscreen",
  
    a11y: { test: "todo" },
  },
  args: {
    position: "top-right",
    visibleToasts: 3,
    expand: false,
  },
  argTypes: {
    position: {
      control: "select",
      options: SONNER_POSITIONS,
    },
    visibleToasts: { control: "number" },
    expand: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Sonner>

export const Playground: Story = {
  render: (args) => ({
    components: { Button, Sonner },
    setup() {
      const loadingIcon = h(Loader2, { class: "h-4 w-4 animate-spin", "aria-hidden": "true" })
      const lineIcon = h("span", {
        "aria-hidden": "true",
        class:
          "inline-block h-4 w-4 rounded-[2px] border border-dashed border-current text-muted-foreground",
      })
      const successIcon = h(Bell, { class: "h-4 w-4", "aria-hidden": "true" })

      const showLoading = () => {
        toast.loading("Loading...", {
          icon: loadingIcon,
          duration: 5000,
        })
      }

      const showLine = () => {
        toast("Line 1", {
          icon: lineIcon,
        })
      }

      const showWithDescription = () => {
        toast.success("Event has been created", {
          icon: successIcon,
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => toast.info("Undo clicked", { duration: 1200 }),
          },
        })
      }

      const showAssertive = () => {
        toast.error("Unable to save changes", {
          description: "Please try again.",
          announcement: "assertive",
        })
      }

      return { args, showAssertive, showLine, showLoading, showWithDescription }
    },
    template: `
      <div class="min-h-[20rem] bg-slate-100 p-8">
        <Sonner
          :position="args.position"
          :visible-toasts="args.visibleToasts"
          :expand="args.expand"
        />
        <div class="flex flex-wrap items-center gap-3">
          <Button variant="secondary" @click="showLoading">Show Loading</Button>
          <Button variant="secondary" @click="showLine">Line Only</Button>
          <Button variant="secondary" @click="showWithDescription">Lines and Button</Button>
          <Button variant="secondary" @click="showAssertive">Assertive Error</Button>
        </div>
      </div>
    `,
  }),
}

export const Stacking: Story = {
  render: (args) => ({
    components: { Button, Sonner },
    setup() {
      const icon = h("span", {
        "aria-hidden": "true",
        class:
          "inline-block h-4 w-4 rounded-[2px] border border-dashed border-current text-muted-foreground",
      })
      const enqueueToasts = () => {
        toast("Line 1", { icon })
        toast("Line 1", { icon, description: "Line 2" })
        toast("Line 1", {
          icon,
          description: "Line 2",
          action: { label: "Label", onClick: () => undefined },
        })
      }

      return { args, enqueueToasts }
    },
    template: `
      <div class="min-h-[20rem] bg-slate-100 p-8">
        <Sonner :position="args.position" :visible-toasts="3" :expand="false" />
        <Button variant="secondary" @click="enqueueToasts">Queue 3 Toasts</Button>
      </div>
    `,
  }),
}
