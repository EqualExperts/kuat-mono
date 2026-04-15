import type { Meta, StoryObj } from "@storybook/react"
import {
  Checkbox,
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
  Input,
  KuatSelect,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea,
} from "@equal-experts/kuat-react"
import { Search } from "lucide-react"
import { fieldDocs } from "../docs/component-docs"

const meta: Meta<typeof Field> = {
  title: "Components/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: fieldDocs,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Field>

const basicItems = [
  {
    value: "default",
    label: "Default",
  },
  {
    value: "blue",
    label: "Blue",
  },
  {
    value: "green",
    label: "Green",
  },
]

export const InputComposition: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="full-name">Name</FieldLabel>
      <Input id="full-name" autoComplete="off" placeholder="Evil Rabbit" />
      <FieldDescription>This appears on invoices and emails.</FieldDescription>
    </Field>
  ),
}

export const TextareaComposition: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="feedback">Feedback</FieldLabel>
      <Textarea id="feedback" placeholder="Share your thoughts about our service." />
      <FieldDescription>Focus on what worked and what can improve.</FieldDescription>
    </Field>
  ),
}

export const SelectComposition: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="department">Department</FieldLabel>
      <Select defaultValue="engineering">
        <SelectTrigger id="department" aria-label="Department">
          <SelectValue placeholder="Choose department" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="engineering">Engineering</SelectItem>
          <SelectItem value="design">Design</SelectItem>
          <SelectItem value="product">Product</SelectItem>
        </SelectContent>
      </Select>
      <FieldDescription>Select your department or area of work.</FieldDescription>
    </Field>
  ),
}

export const CheckboxGroupComposition: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend>Desktop items</FieldLegend>
      <FieldDescription>Select the items you want to show on the desktop.</FieldDescription>
      <FieldGroup>
        <Field orientation="horizontal">
          <Checkbox id="desktop-hard-disks" />
          <FieldContent>
            <FieldLabel htmlFor="desktop-hard-disks">Hard disks</FieldLabel>
          </FieldContent>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="desktop-external-disks" />
          <FieldContent>
            <FieldLabel htmlFor="desktop-external-disks">External disks</FieldLabel>
          </FieldContent>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
}

export const RadioGroupComposition: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend>Subscription plan</FieldLegend>
      <FieldDescription>Yearly and lifetime plans offer savings.</FieldDescription>
      <RadioGroup defaultValue="yearly" className="flex flex-col gap-3">
        <Field orientation="horizontal">
          <RadioGroupItem id="plan-monthly" value="monthly" />
          <FieldContent>
            <FieldLabel htmlFor="plan-monthly">Monthly</FieldLabel>
            <FieldDescription>$9.99/month</FieldDescription>
          </FieldContent>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem id="plan-yearly" value="yearly" />
          <FieldContent>
            <FieldLabel htmlFor="plan-yearly">Yearly</FieldLabel>
            <FieldDescription>$99.99/year</FieldDescription>
          </FieldContent>
        </Field>
      </RadioGroup>
    </FieldSet>
  ),
}

export const SwitchWithSupportText: Story = {
  render: () => (
    <Field orientation="horizontal">
      <Switch id="newsletter" />
      <FieldContent>
        <FieldLabel htmlFor="newsletter">Multi-factor authentication</FieldLabel>
        <FieldDescription>Improve account security with a second factor.</FieldDescription>
      </FieldContent>
    </Field>
  ),
}

export const FieldValidationError: Story = {
  render: () => (
    <Field data-invalid>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input id="email" type="email" defaultValue="not-an-email" aria-invalid />
      <FieldError>Enter a valid email address.</FieldError>
    </Field>
  ),
}

export const DecoratedInputField: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="search-field">Search</FieldLabel>
      <Input
        id="search-field"
        placeholder="Search projects"
        leftDecoration={<Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />}
        rightDecoration={<span className="whitespace-nowrap text-sm text-muted-foreground">24 results</span>}
      />
      <FieldDescription>Try a project name, tag, or owner.</FieldDescription>
    </Field>
  ),
}

export const KuatRichSelectField: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="theme-select">Theme</FieldLabel>
      <KuatSelect
        triggerProps={{ id: "theme-select", "aria-label": "Theme" }}
        lines="double"
        label="Display theme"
        placeholder="Select a theme"
        items={[
          {
            label: "Core themes",
            items: [
              { value: "default", label: "Default", description: "Balanced colors for all contexts" },
              { value: "blue", label: "Blue", description: "High-contrast accessibility focus" },
              { value: "green", label: "Green", description: "Nature-inspired accents" },
            ],
          },
        ]}
      />
      <FieldDescription>Choose how Kuat components render in this workspace.</FieldDescription>
    </Field>
  ),
}

export const MixedFormSection: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend>Project settings</FieldLegend>
      <FieldDescription>Configure defaults for project onboarding.</FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="project-name">Project name</FieldLabel>
          <Input id="project-name" defaultValue="Kuat Migration" />
        </Field>
        <Field>
          <FieldLabel htmlFor="project-theme">Theme</FieldLabel>
          <KuatSelect
            triggerProps={{ id: "project-theme", "aria-label": "Project theme" }}
            placeholder="Select theme"
            items={basicItems}
          />
        </Field>
        <Field orientation="horizontal">
          <Switch id="project-notifications" defaultChecked />
          <FieldContent>
            <FieldLabel htmlFor="project-notifications">Enable notifications</FieldLabel>
            <FieldDescription>Get alerts when the migration changes status.</FieldDescription>
          </FieldContent>
        </Field>
        <FieldSeparator />
        <Field orientation="horizontal">
          <Checkbox id="project-terms" />
          <FieldContent>
            <FieldTitle>Confirm compliance</FieldTitle>
            <FieldDescription>I confirm this project follows Kuat design guidance.</FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
}
