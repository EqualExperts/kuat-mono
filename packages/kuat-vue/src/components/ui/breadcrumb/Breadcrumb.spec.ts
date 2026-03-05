/**
 * Breadcrumb – Kuat Vue (localized UI component). Wrapper over shadcn-style primitives.
 */
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import Breadcrumb from "./Breadcrumb.vue";

describe("Breadcrumb", () => {
  describe("rendering", () => {
    it("renders nothing when items is empty", () => {
      const { container } = render(Breadcrumb, { props: { items: [] } });
      expect(container.querySelector("nav")).not.toBeInTheDocument();
    });

    it("renders a single item as current page", () => {
      render(Breadcrumb, { props: { items: [{ label: "Home" }] } });
      expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Home")).toHaveAttribute("aria-current", "page");
    });

    it("renders trail with links and current page", () => {
      render(Breadcrumb, {
        props: {
          items: [
            { label: "Home", href: "/" },
            { label: "Components", href: "/components" },
            { label: "Breadcrumb" },
          ],
        },
      });
      const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
      expect(nav).toBeInTheDocument();
      const list = nav.querySelector("ol");
      expect(list).toBeInTheDocument();
      expect(list?.tagName).toBe("OL");

      const homeLink = screen.getByRole("link", { name: "Home" });
      expect(homeLink).toHaveAttribute("href", "/");
      const componentsLink = screen.getByRole("link", { name: "Components" });
      expect(componentsLink).toHaveAttribute("href", "/components");
      expect(screen.getByText("Breadcrumb")).toHaveAttribute("aria-current", "page");
    });

    it("forwards custom class to nav", () => {
      render(Breadcrumb, {
        props: { items: [{ label: "Home" }], class: "custom-breadcrumb" },
      });
      expect(screen.getByRole("navigation")).toHaveClass("custom-breadcrumb");
    });
  });

  describe("dropdown", () => {
    it("renders item with children as dropdown trigger", () => {
      render(Breadcrumb, {
        props: {
          items: [
            { label: "Home", href: "/" },
            {
              label: "Section",
              children: [
                { label: "Doc", href: "/doc" },
                { label: "Themes", href: "/themes" },
              ],
            },
            { label: "Current" },
          ],
        },
      });
      const trigger = screen.getByRole("button", { name: /Section/i });
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    });

    it("opens dropdown and shows menu items when trigger clicked", async () => {
      render(Breadcrumb, {
        props: {
          items: [
            { label: "Home", href: "/" },
            {
              label: "Section",
              children: [
                { label: "Doc", href: "/doc" },
                { label: "Themes", href: "/themes" },
              ],
            },
            { label: "Current" },
          ],
        },
      });
      const trigger = screen.getByRole("button", { name: /Section/i });
      await fireEvent.click(trigger);
      expect(screen.getByRole("menuitem", { name: "Doc" })).toBeInTheDocument();
      expect(screen.getByRole("menuitem", { name: "Themes" })).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("has nav with aria-label Breadcrumb by default", () => {
      render(Breadcrumb, { props: { items: [{ label: "Home" }] } });
      expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    });

    it("uses custom aria-label when provided", () => {
      render(Breadcrumb, {
        props: { items: [{ label: "Home" }], ariaLabel: "You are here" },
      });
      expect(screen.getByRole("navigation", { name: "You are here" })).toBeInTheDocument();
    });

    it("uses semantic ol/li structure", () => {
      render(Breadcrumb, {
        props: {
          items: [
            { label: "Home", href: "/" },
            { label: "Current" },
          ],
        },
      });
      const nav = screen.getByRole("navigation");
      const list = nav.querySelector("ol");
      expect(list).toBeInTheDocument();
      const items = list?.querySelectorAll("li");
      expect(items?.length).toBe(2);
    });
  });
});
