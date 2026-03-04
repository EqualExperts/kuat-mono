/**
 * Badge – Kuat Vue (localized UI component). Non-interactive; variants and roundness per Figma.
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import Badge from "./Badge.vue";
import { badgeVariants, BADGE_VARIANTS } from "./index";

describe("Badge", () => {
  describe("rendering", () => {
    it("renders with default props and slot content", () => {
      render(Badge, { slots: { default: "Label" } });
      const el = screen.getByText("Label");
      expect(el).toBeInTheDocument();
      expect(el).toHaveClass("badge", "badge--default", "badge--roundness-default");
    });

    it("forwards custom class", () => {
      render(Badge, {
        props: { class: "custom" },
        slots: { default: "Label" },
      });
      expect(screen.getByText("Label")).toHaveClass("custom");
    });
  });

  describe("variants", () => {
    it.each(BADGE_VARIANTS)("applies variant class badge--%s", (variant) => {
      render(Badge, {
        props: { variant },
        slots: { default: "Label" },
      });
      expect(screen.getByText("Label")).toHaveClass(`badge--${variant}`);
    });
  });

  describe("roundness", () => {
    it("applies roundness-default class when roundness is default", () => {
      render(Badge, {
        props: { roundness: "default" },
        slots: { default: "Label" },
      });
      expect(screen.getByText("Label")).toHaveClass("badge--roundness-default");
    });

    it("applies roundness-round class when roundness is round", () => {
      render(Badge, {
        props: { roundness: "round" },
        slots: { default: "Label" },
      });
      expect(screen.getByText("Label")).toHaveClass("badge--roundness-round");
    });
  });

  describe("badgeVariants", () => {
    it("returns expected class string for default variant and roundness", () => {
      expect(badgeVariants()).toContain("badge");
      expect(badgeVariants()).toContain("badge--default");
      expect(badgeVariants()).toContain("badge--roundness-default");
    });

    it("returns class string including variant and roundness", () => {
      const classes = badgeVariants({ variant: "secondary", roundness: "round" });
      expect(classes).toContain("badge");
      expect(classes).toContain("badge--secondary");
      expect(classes).toContain("badge--roundness-round");
    });
  });

  describe("non-interactive", () => {
    it("root element has no tabindex when rendered as default", () => {
      render(Badge, { slots: { default: "Label" } });
      const el = screen.getByText("Label");
      expect(el).not.toHaveAttribute("tabindex");
    });
  });
});
