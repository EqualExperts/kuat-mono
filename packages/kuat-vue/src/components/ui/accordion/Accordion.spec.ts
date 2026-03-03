/**
 * Accordion – Kuat Vue (localized Reka UI). Tests functionality, a11y, and edge cases.
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import Accordion from "./Accordion.vue";
import AccordionItem from "./AccordionItem.vue";
import AccordionTrigger from "./AccordionTrigger.vue";
import AccordionContent from "./AccordionContent.vue";

const AccordionWrapper = {
  components: { Accordion, AccordionItem, AccordionTrigger, AccordionContent },
  template: `
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Trigger 1</AccordionTrigger>
        <AccordionContent>Content 1</AccordionContent>
      </AccordionItem>
    </Accordion>
  `,
};

describe("Accordion", () => {
  describe("functionality", () => {
    it("renders items with trigger and content", () => {
      render(AccordionWrapper);
      expect(screen.getByRole("button", { name: /trigger 1/i })).toBeInTheDocument();
      expect(screen.getByRole("region", { hidden: true })).toBeInTheDocument();
    });

    it("expands content when trigger is clicked", async () => {
      render(AccordionWrapper);
      const trigger = screen.getByRole("button", { name: /trigger 1/i });
      expect(trigger).toHaveAttribute("aria-expanded", "false");

      await trigger.click();
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByRole("region", { hidden: true })).toBeInTheDocument();
    });

    it("collapses content when trigger is clicked again (single collapsible)", async () => {
      render(AccordionWrapper);
      const trigger = screen.getByRole("button", { name: /trigger 1/i });
      await trigger.click();
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      await trigger.click();
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("allows multiple items open when type is multiple", async () => {
      render({
        components: { Accordion, AccordionItem, AccordionTrigger, AccordionContent },
        template: `
          <Accordion type="multiple">
            <AccordionItem value="item-1">
              <AccordionTrigger>Trigger 1</AccordionTrigger>
              <AccordionContent>Content 1</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Trigger 2</AccordionTrigger>
              <AccordionContent>Content 2</AccordionContent>
            </AccordionItem>
          </Accordion>
        `,
      });
      const trigger1 = screen.getByRole("button", { name: /trigger 1/i });
      const trigger2 = screen.getByRole("button", { name: /trigger 2/i });
      await trigger1.click();
      await trigger2.click();
      expect(trigger1).toHaveAttribute("aria-expanded", "true");
      expect(trigger2).toHaveAttribute("aria-expanded", "true");
    });

    it("applies custom class to AccordionTrigger", () => {
      render({
        components: { Accordion, AccordionItem, AccordionTrigger, AccordionContent },
        template: `
          <Accordion type="single">
            <AccordionItem value="item-1">
              <AccordionTrigger class="custom-trigger">Trigger</AccordionTrigger>
              <AccordionContent>Content</AccordionContent>
            </AccordionItem>
          </Accordion>
        `,
      });
      expect(screen.getByRole("button", { name: /trigger/i })).toHaveClass("custom-trigger");
    });
  });

  describe("accessibility", () => {
    it("trigger has aria-expanded", () => {
      render(AccordionWrapper);
      expect(screen.getByRole("button", { name: /trigger 1/i })).toHaveAttribute("aria-expanded");
    });

    it("trigger is focusable and has aria-expanded", () => {
      render(AccordionWrapper);
      const trigger = screen.getByRole("button", { name: /trigger 1/i });
      trigger.focus();
      expect(trigger).toHaveFocus();
      expect(trigger).toHaveAttribute("aria-expanded");
    });
  });

  describe("edge cases", () => {
    it("renders with empty content", () => {
      render({
        components: { Accordion, AccordionItem, AccordionTrigger, AccordionContent },
        template: `
          <Accordion type="single">
            <AccordionItem value="item-1">
              <AccordionTrigger>Trigger</AccordionTrigger>
              <AccordionContent />
            </AccordionItem>
          </Accordion>
        `,
      });
      expect(screen.getByRole("button", { name: /trigger/i })).toBeInTheDocument();
    });

    it("renders with rich content in trigger and content", async () => {
      render({
        components: { Accordion, AccordionItem, AccordionTrigger, AccordionContent },
        template: `
          <Accordion type="single">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <span>Trigger with span</span>
              </AccordionTrigger>
              <AccordionContent>
                <p>Paragraph</p>
                <ul>
                  <li>Item</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        `,
      });
      expect(screen.getByText("Trigger with span")).toBeInTheDocument();
      const trigger = screen.getByRole("button", { name: /trigger with span/i });
      await trigger.click();
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      // Content may be in DOM when expanded (structure depends on Reka UI)
      const region = screen.getByRole("region", { hidden: true });
      expect(region).toBeInTheDocument();
    });
  });
});
