/**
 * Badge – Kuat React (localized UI component). Non-interactive; variants and roundness per Figma.
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge, badgeVariants, BADGE_VARIANTS, BADGE_ROUNDNESS } from "./badge";

describe("Badge", () => {
  describe("rendering", () => {
    it("renders with default props and children", () => {
      render(<Badge>Label</Badge>);
      const el = screen.getByText("Label");
      expect(el).toBeInTheDocument();
      expect(el.tagName).toBe("DIV");
      expect(el).toHaveClass("badge", "badge--default", "badge--roundness-default");
    });

    it("forwards custom className", () => {
      render(<Badge className="custom">Label</Badge>);
      expect(screen.getByText("Label")).toHaveClass("custom");
    });
  });

  describe("with icons", () => {
    it("renders badge with icon and text as children", () => {
      const Icon = () => <span data-testid="badge-icon" aria-hidden>✓</span>;
      render(
        <Badge variant="secondary">
          <Icon />
          Verified
        </Badge>
      );
      const badge = screen.getByText("Verified").closest(".badge");
      expect(badge).toBeInTheDocument();
      expect(screen.getByTestId("badge-icon")).toBeInTheDocument();
      expect(screen.getByTestId("badge-icon").parentElement).toBe(badge);
    });

    it("renders badge with only numeric content as count-style badge", () => {
      render(
        <Badge roundness="round" variant="destructive">
          99
        </Badge>
      );
      const el = screen.getByText("99");
      expect(el).toBeInTheDocument();
      expect(el).toHaveClass("badge--roundness-round", "badge--destructive");
    });
  });

  describe("variants", () => {
    it.each(BADGE_VARIANTS)("applies variant class badge--%s", (variant) => {
      render(<Badge variant={variant}>Label</Badge>);
      expect(screen.getByText("Label")).toHaveClass(`badge--${variant}`);
    });
  });

  describe("roundness", () => {
    it("applies roundness-default class when roundness is default", () => {
      render(<Badge roundness="default">Label</Badge>);
      expect(screen.getByText("Label")).toHaveClass("badge--roundness-default");
    });

    it("applies roundness-round class when roundness is round", () => {
      render(<Badge roundness="round">Label</Badge>);
      expect(screen.getByText("Label")).toHaveClass("badge--roundness-round");
    });
  });

  describe("badgeVariants", () => {
    it("returns expected class string for default variant and roundness", () => {
      expect(badgeVariants({})).toContain("badge");
      expect(badgeVariants({})).toContain("badge--default");
      expect(badgeVariants({})).toContain("badge--roundness-default");
    });

    it("returns class string including variant and roundness", () => {
      const classes = badgeVariants({ variant: "secondary", roundness: "round" });
      expect(classes).toContain("badge");
      expect(classes).toContain("badge--secondary");
      expect(classes).toContain("badge--roundness-round");
    });
  });

  describe("non-interactive", () => {
    it("root element has no tabindex when rendered as default div", () => {
      render(<Badge>Label</Badge>);
      const el = screen.getByText("Label");
      expect(el).not.toHaveAttribute("tabindex");
    });
  });
});
