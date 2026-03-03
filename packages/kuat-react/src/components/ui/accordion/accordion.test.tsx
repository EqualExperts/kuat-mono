/**
 * Accordion – Kuat React (localized Radix UI). Tests functionality, a11y, and edge cases.
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion";

describe("Accordion", () => {
  describe("functionality", () => {
    it("renders items with trigger and content", () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(screen.getByRole("button", { name: /trigger 1/i })).toBeInTheDocument();
      // Content region exists (content may be hidden or unmounted when closed)
      expect(screen.getByRole("region", { hidden: true })).toBeInTheDocument();
    });

    it("expands content when trigger is clicked", async () => {
      const user = userEvent.setup();
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      const trigger = screen.getByRole("button", { name: /trigger 1/i });
      expect(trigger).toHaveAttribute("aria-expanded", "false");

      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByText("Content 1")).toBeVisible();
    });

    it("collapses content when trigger is clicked again (single collapsible)", async () => {
      const user = userEvent.setup();
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      const trigger = screen.getByRole("button", { name: /trigger 1/i });
      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("allows multiple items open when type is multiple", async () => {
      const user = userEvent.setup();
      render(
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
      );
      await user.click(screen.getByRole("button", { name: /trigger 1/i }));
      await user.click(screen.getByRole("button", { name: /trigger 2/i }));
      expect(screen.getByRole("button", { name: /trigger 1/i })).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByRole("button", { name: /trigger 2/i })).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByText("Content 1")).toBeInTheDocument();
      expect(screen.getByText("Content 2")).toBeInTheDocument();
    });

    it("applies custom className to AccordionItem", () => {
      render(
        <Accordion type="single">
          <AccordionItem value="item-1" className="custom-item">
            <AccordionTrigger>Trigger</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      const trigger = screen.getByRole("button", { name: /trigger/i });
      const item = trigger.closest(".custom-item");
      expect(item).toBeInTheDocument();
    });

    it("applies custom className to AccordionTrigger", () => {
      render(
        <Accordion type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger className="custom-trigger">Trigger</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(screen.getByRole("button", { name: /trigger/i })).toHaveClass("custom-trigger");
    });

    it("applies custom className to AccordionContent body", () => {
      render(
        <Accordion type="single" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger</AccordionTrigger>
            <AccordionContent className="custom-content">Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      const content = screen.getByText("Content");
      expect(content).toHaveClass("custom-content");
    });

    it("forwards ref to AccordionTrigger", () => {
      const ref = { current: null as HTMLButtonElement | null };
      render(
        <Accordion type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger ref={ref}>Trigger</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.textContent).toContain("Trigger");
    });
  });

  describe("accessibility", () => {
    it("trigger has aria-expanded", () => {
      render(
        <Accordion type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      expect(screen.getByRole("button", { name: /trigger/i })).toHaveAttribute("aria-expanded");
    });

    it("trigger is focusable and can be activated with keyboard", async () => {
      const user = userEvent.setup();
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );
      const trigger = screen.getByRole("button", { name: /trigger/i });
      trigger.focus();
      expect(trigger).toHaveFocus();
      await user.keyboard("{Enter}");
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });
  });

  describe("edge cases", () => {
    it("renders with empty content", () => {
      render(
        <Accordion type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger</AccordionTrigger>
            <AccordionContent />
          </AccordionItem>
        </Accordion>
      );
      expect(screen.getByRole("button", { name: /trigger/i })).toBeInTheDocument();
    });

    it("renders with rich content in trigger and content", async () => {
      const user = userEvent.setup();
      render(
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
      );
      expect(screen.getByText("Trigger with span")).toBeInTheDocument();
      await user.click(screen.getByRole("button", { name: /trigger with span/i }));
      expect(screen.getByText("Paragraph")).toBeInTheDocument();
      expect(screen.getByText("Item")).toBeInTheDocument();
    });
  });
});
