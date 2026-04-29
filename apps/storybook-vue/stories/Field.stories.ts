import type { Meta, StoryObj } from "@storybook/vue3"
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
} from "@equal-experts/kuat-vue"
import { fieldDocs } from "../docs/component-docs"

const meta: Meta<typeof Field> = {
  title: "Form Components/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: fieldDocs,
      },
    },
  
    a11y: { test: "todo" },
  },
}

export default meta
type Story = StoryObj<typeof Field>

const basicItems = [
  { value: "default", label: "Default" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
]

export const InputComposition: Story = {
  render: () => ({
    components: { Field, FieldDescription, FieldLabel, Input },
    template: `
      <Field>
        <FieldLabel for="full-name">Name</FieldLabel>
        <Input id="full-name" autocomplete="off" placeholder="Evil Rabbit" />
        <FieldDescription>This appears on invoices and emails.</FieldDescription>
      </Field>
    `,
  }),
}

export const TextareaComposition: Story = {
  render: () => ({
    components: { Field, FieldDescription, FieldLabel, Textarea },
    template: `
      <Field>
        <FieldLabel for="feedback">Feedback</FieldLabel>
        <Textarea id="feedback" placeholder="Share your thoughts about our service." />
        <FieldDescription>Focus on what worked and what can improve.</FieldDescription>
      </Field>
    `,
  }),
}

export const SelectComposition: Story = {
  render: () => ({
    components: {
      Field,
      FieldDescription,
      FieldLabel,
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
    },
    template: `
      <Field>
        <FieldLabel for="department">Department</FieldLabel>
        <Select default-value="engineering">
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
    `,
  }),
}

export const CheckboxGroupComposition: Story = {
  render: () => ({
    components: {
      Checkbox,
      Field,
      FieldContent,
      FieldDescription,
      FieldGroup,
      FieldLabel,
      FieldLegend,
      FieldSet,
    },
    template: `
      <FieldSet>
        <FieldLegend>Desktop items</FieldLegend>
        <FieldDescription>Select the items you want to show on the desktop.</FieldDescription>
        <FieldGroup>
          <Field orientation="horizontal">
            <Checkbox id="desktop-hard-disks" />
            <FieldContent>
              <FieldLabel for="desktop-hard-disks">Hard disks</FieldLabel>
            </FieldContent>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="desktop-external-disks" />
            <FieldContent>
              <FieldLabel for="desktop-external-disks">External disks</FieldLabel>
            </FieldContent>
          </Field>
        </FieldGroup>
      </FieldSet>
    `,
  }),
}

export const RadioGroupComposition: Story = {
  render: () => ({
    components: {
      Field,
      FieldContent,
      FieldDescription,
      FieldLabel,
      FieldLegend,
      FieldSet,
      RadioGroup,
      RadioGroupItem,
    },
    template: `
      <FieldSet>
        <FieldLegend>Subscription plan</FieldLegend>
        <FieldDescription>Yearly and lifetime plans offer savings.</FieldDescription>
        <RadioGroup default-value="yearly" class="flex flex-col gap-3">
          <Field orientation="horizontal">
            <RadioGroupItem id="plan-monthly" value="monthly" />
            <FieldContent>
              <FieldLabel for="plan-monthly">Monthly</FieldLabel>
              <FieldDescription>$9.99/month</FieldDescription>
            </FieldContent>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem id="plan-yearly" value="yearly" />
            <FieldContent>
              <FieldLabel for="plan-yearly">Yearly</FieldLabel>
              <FieldDescription>$99.99/year</FieldDescription>
            </FieldContent>
          </Field>
        </RadioGroup>
      </FieldSet>
    `,
  }),
}

export const SwitchWithSupportText: Story = {
  render: () => ({
    components: { Field, FieldContent, FieldDescription, FieldLabel, Switch },
    template: `
      <Field orientation="horizontal">
        <Switch id="newsletter" />
        <FieldContent>
          <FieldLabel for="newsletter">Multi-factor authentication</FieldLabel>
          <FieldDescription>Improve account security with a second factor.</FieldDescription>
        </FieldContent>
      </Field>
    `,
  }),
}

export const FieldValidationError: Story = {
  render: () => ({
    components: { Field, FieldError, FieldLabel, Input },
    template: `
      <Field data-invalid>
        <FieldLabel for="email">Email</FieldLabel>
        <Input id="email" type="email" model-value="not-an-email" aria-invalid="true" />
        <FieldError>Enter a valid email address.</FieldError>
      </Field>
    `,
  }),
}

export const DecoratedInputField: Story = {
  render: () => ({
    components: { Field, FieldDescription, FieldLabel, Input },
    template: `
      <Field>
        <FieldLabel for="search-field">Search</FieldLabel>
        <Input id="search-field" placeholder="Search projects">
          <template #leftDecoration>
            <span class="text-sm text-muted-foreground">🔎</span>
          </template>
          <template #rightDecoration>
            <span class="whitespace-nowrap text-sm text-muted-foreground">24 results</span>
          </template>
        </Input>
        <FieldDescription>Try a project name, tag, or owner.</FieldDescription>
      </Field>
    `,
  }),
}

export const DoubleLineSelectField: Story = {
  render: () => ({
    components: { Field, FieldDescription, FieldLabel, KuatSelect },
    template: `
      <Field>
        <FieldLabel for="theme-select">Theme</FieldLabel>
        <KuatSelect
          :trigger-props="{ id: 'theme-select', 'aria-label': 'Theme' }"
          lines="double"
          label="Display theme"
          placeholder="Select a theme"
          :items="[
            {
              label: 'Core themes',
              items: [
                { value: 'default', label: 'Default', description: 'Balanced colors for all contexts' },
                { value: 'blue', label: 'Blue', description: 'High-contrast accessibility focus' },
                { value: 'green', label: 'Green', description: 'Nature-inspired accents' }
              ]
            }
          ]"
        />
        <FieldDescription>Choose how Kuat components render in this workspace.</FieldDescription>
      </Field>
    `,
  }),
}

export const MixedFormSection: Story = {
  render: () => ({
    components: {
      Checkbox,
      Field,
      FieldContent,
      FieldDescription,
      FieldGroup,
      FieldLabel,
      FieldLegend,
      FieldSeparator,
      FieldSet,
      FieldTitle,
      Input,
      KuatSelect,
      Switch,
    },
    setup() {
      return { basicItems }
    },
    template: `
      <FieldSet>
        <FieldLegend>Project settings</FieldLegend>
        <FieldDescription>Configure defaults for project onboarding.</FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel for="project-name">Project name</FieldLabel>
            <Input id="project-name" model-value="Kuat Migration" />
          </Field>
          <Field>
            <FieldLabel for="project-theme">Theme</FieldLabel>
            <KuatSelect
              :trigger-props="{ id: 'project-theme', 'aria-label': 'Project theme' }"
              placeholder="Select theme"
              :items="basicItems"
            />
          </Field>
          <Field orientation="horizontal">
            <Switch id="project-notifications" :model-value="true" />
            <FieldContent>
              <FieldLabel for="project-notifications">Enable notifications</FieldLabel>
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
    `,
  }),
}
