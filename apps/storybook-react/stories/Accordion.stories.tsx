/**
 * @deprecated This component import is deprecated.
 *
 * For new projects, install Accordion directly via shadcn CLI:
 * ```bash
 * npx shadcn@latest add accordion
 * ```
 *
 * The component will be themed automatically when using kuat-core.
 * This story demonstrates the Accordion styling that kuat-core provides.
 */
import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@equal-experts/kuat-react';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion (Deprecated)',
  component: Accordion,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Feature 1</AccordionTrigger>
        <AccordionContent>
          This accordion allows multiple items to be open at the same time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Feature 2</AccordionTrigger>
        <AccordionContent>
          You can expand multiple sections simultaneously.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Feature 3</AccordionTrigger>
        <AccordionContent>
          Perfect for FAQs and feature lists.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithRichContent: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Getting Started</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Follow these steps to get started:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Install the package</li>
              <li>Import the components</li>
              <li>Start building</li>
            </ol>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Advanced Usage</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>For advanced use cases, you can:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Customize with Tailwind classes</li>
              <li>Use with form validation</li>
              <li>Integrate with state management</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

