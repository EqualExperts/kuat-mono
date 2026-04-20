import type { Meta, StoryObj } from "@storybook/react"
import type { ComponentProps } from "react"
import { useMemo } from "react"
import { Bell, Loader2 } from "lucide-react"

import { Button, SONNER_POSITIONS, Sonner, toast } from "@equal-experts/kuat-react"

import { sonnerDocs } from "../docs/component-docs"

const meta: Meta<typeof Sonner> = {
  title: "Components/Sonner",
  component: Sonner,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: sonnerDocs,
      },
    },
    layout: "fullscreen",
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

function DashedSquareIcon() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-4 w-4 rounded-[2px] border border-dashed border-current text-muted-foreground"
    />
  )
}

function DemoActions({ position, visibleToasts, expand }: ComponentProps<typeof Sonner>) {
  const eventDescription = useMemo(
    () => new Date(2023, 11, 3, 9, 0).toLocaleString(),
    [],
  )

  return (
    <div className="min-h-[20rem] bg-slate-100 p-8">
      <Sonner position={position} visibleToasts={visibleToasts} expand={expand} />
      <div className="flex flex-wrap items-center gap-3">
        <Button
          size="regular"
          variant="secondary"
          onClick={() => {
            toast.loading("Loading...", {
              icon: <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />,
              duration: 5000,
            })
          }}
        >
          Show Loading
        </Button>
        <Button
          size="regular"
          variant="secondary"
          onClick={() => {
            toast("Line 1", {
              icon: <DashedSquareIcon />,
            })
          }}
        >
          Line Only
        </Button>
        <Button
          size="regular"
          variant="secondary"
          onClick={() => {
            toast.success("Event has been created", {
              icon: <Bell className="h-4 w-4" aria-hidden="true" />,
              description: eventDescription,
              action: {
                label: "Undo",
                onClick: () => toast.info("Undo clicked", { duration: 1200 }),
              },
            })
          }}
        >
          Lines and Button
        </Button>
        <Button
          size="regular"
          variant="secondary"
          onClick={() => {
            toast.error("Unable to save changes", {
              description: "Please try again.",
              announcement: "assertive",
            })
          }}
        >
          Assertive Error
        </Button>
      </div>
    </div>
  )
}

export const Playground: Story = {
  render: (args) => (
    <DemoActions
      position={args.position}
      visibleToasts={args.visibleToasts}
      expand={args.expand}
    />
  ),
}

export const Stacking: Story = {
  render: (args) => (
    <div className="min-h-[20rem] bg-slate-100 p-8">
      <Sonner position={args.position} visibleToasts={3} expand={false} />
      <Button
        size="regular"
        variant="secondary"
        onClick={() => {
          toast("Line 1", { icon: <DashedSquareIcon /> })
          toast("Line 1", {
            icon: <DashedSquareIcon />,
            description: "Line 2",
          })
          toast("Line 1", {
            icon: <DashedSquareIcon />,
            description: "Line 2",
            action: { label: "Label", onClick: () => {} },
          })
        }}
      >
        Queue 3 Toasts
      </Button>
    </div>
  ),
}
