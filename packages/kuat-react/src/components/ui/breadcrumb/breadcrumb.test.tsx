/**
 * Breadcrumb – Kuat React (localized UI component). Wrapper over shadcn-style primitives.
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Breadcrumb } from "./Breadcrumb";

describe("Breadcrumb", () => {
  describe("rendering", () => {
    it("renders nothing when items is empty", () => {
      const { container } = render(<Breadcrumb items={[]} />);
      expect(container.querySelector("nav")).not.toBeInTheDocument();
    });

    it("renders a single item as current page", () => {
      render(<Breadcrumb items={[{ label: "Home" }]} />);
      expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Home")).toHaveAttribute("aria-current", "page");
    });

    it("renders trail with links and current page", () => {
      render(
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Components", href: "/components" },
            { label: "Breadcrumb" },
          ]}
        />
      );
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

    it("forwards custom className to nav", () => {
      render(
        <Breadcrumb items={[{ label: "Home" }]} className="custom-breadcrumb" />
      );
      expect(screen.getByRole("navigation")).toHaveClass("custom-breadcrumb");
    });
  });

  describe("custom link component", () => {
    it("uses custom link component when provided", () => {
      const Link = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
        <a href={href} className={className} data-testid="custom-link">
          {children}
        </a>
      );
      render(
        <Breadcrumb
          items={[{ label: "Home", href: "/" }]}
          linkComponent={Link}
        />
      );
      const custom = screen.getByTestId("custom-link");
      expect(custom).toBeInTheDocument();
      expect(custom).toHaveAttribute("href", "/");
      expect(custom).toHaveTextContent("Home");
    });
  });

  describe("dropdown", () => {
    it("renders item with children as dropdown trigger", () => {
      render(
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            {
              label: "Section",
              children: [
                { label: "Doc", href: "/doc" },
                { label: "Themes", href: "/themes" },
              ],
            },
            { label: "Current" },
          ]}
        />
      );
      const trigger = screen.getByRole("button", { name: /Section/i });
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    });

    it("opens dropdown and shows menu items when trigger clicked", async () => {
      const user = userEvent.setup();
      render(
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            {
              label: "Section",
              children: [
                { label: "Doc", href: "/doc" },
                { label: "Themes", href: "/themes" },
              ],
            },
            { label: "Current" },
          ]}
        />
      );
      const trigger = screen.getByRole("button", { name: /Section/i });
      await user.click(trigger);
      expect(screen.getByRole("menuitem", { name: "Doc" })).toBeInTheDocument();
      expect(screen.getByRole("menuitem", { name: "Themes" })).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("has nav with aria-label Breadcrumb by default", () => {
      render(<Breadcrumb items={[{ label: "Home" }]} />);
      expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    });

    it("uses custom aria-label when provided", () => {
      render(
        <Breadcrumb items={[{ label: "Home" }]} aria-label="You are here" />
      );
      expect(screen.getByRole("navigation", { name: "You are here" })).toBeInTheDocument();
    });

    it("uses semantic ol/li structure", () => {
      render(
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Current" },
          ]}
        />
      );
      const nav = screen.getByRole("navigation");
      const list = nav.querySelector("ol");
      expect(list).toBeInTheDocument();
      const items = list?.querySelectorAll("li");
      expect(items?.length).toBe(2);
    });
  });
});
