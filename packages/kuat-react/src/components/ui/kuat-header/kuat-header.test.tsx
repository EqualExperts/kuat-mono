import { describe, it, expect } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { User } from "lucide-react"
import { KuatHeader } from "./kuat-header"

describe("KuatHeader", () => {
  const navigation = [
    { label: "Dashboard", url: "/dashboard" },
    {
      label: "Settings",
      url: "/settings",
      items: [
        { label: "Profile", url: "/settings/profile" },
        { label: "Team", url: "/settings/team" },
      ],
    },
  ]

  const account = {
    items: [
      {
        label: "John Doe",
        href: "/account",
        icon: <User aria-hidden className="h-4 w-4" />,
      },
    ],
    mobile: {
      heading: "Account",
      subtitle: "Manage your profile",
      items: [
        { label: "Profile", href: "/profile" },
        { label: "Sign out", href: "/sign-out" },
      ],
    },
  }

  const appSwitcher = {
    apps: [
      { id: "a", label: "App A", href: "/a", description: "Desc A" },
      { id: "b", label: "App B", href: "/b" },
    ],
  }

  it("renders object-based navigation links and account menu trigger", () => {
    render(
      <KuatHeader
        title="Timesheets"
        lockup={{ variant: "default" }}
        navigation={navigation}
        account={account}
      />
    )

    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute(
      "href",
      "/dashboard"
    )
    expect(screen.queryByRole("link", { name: "John Doe" })).not.toBeInTheDocument()
    expect(screen.getByRole("button", { name: "John Doe" })).toHaveAttribute(
      "aria-haspopup",
      "menu"
    )
  })

  it("renders nested submenu items in the mobile sheet", () => {
    render(
      <KuatHeader
        title="Timesheets"
        lockup={{ variant: "default" }}
        navigation={navigation}
        account={account}
      />
    )

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }))
    expect(screen.getByRole("link", { name: "Profile" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Team" })).toBeInTheDocument()

    fireEvent.click(
      screen.getByRole("button", { name: "Account, Manage your profile" })
    )
    expect(screen.getByRole("link", { name: "Sign out" })).toBeInTheDocument()
  })

  it("keeps legacy ReactNode slot props working", () => {
    render(
      <KuatHeader
        title="Legacy"
        navigation={<a href="/legacy-nav">Legacy Nav</a>}
        accountMarkup={<button type="button">Legacy Account</button>}
        mobileMenuTrigger={
          <button type="button" aria-label="Open legacy">
            Open
          </button>
        }
      />
    )

    expect(screen.getByRole("link", { name: "Legacy Nav" })).toHaveAttribute(
      "href",
      "/legacy-nav"
    )
    expect(screen.getByRole("button", { name: "Legacy Account" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Open legacy" })).toBeInTheDocument()
  })

  it("opens and closes the built-in mobile menu", () => {
    render(
      <KuatHeader
        title="Timesheets"
        lockup={{ variant: "default" }}
        navigation={navigation}
        account={account}
      />
    )

    const openButton = screen.getByRole("button", { name: "Open menu" })
    fireEvent.click(openButton)

    expect(screen.getByRole("dialog", { name: "Navigation menu" })).toBeInTheDocument()
    expect(screen.getAllByRole("link", { name: "Dashboard" }).length).toBeGreaterThan(0)

    fireEvent.click(screen.getByRole("button", { name: "Close menu" }))
    expect(
      screen.queryByRole("dialog", { name: "Navigation menu" })
    ).not.toBeInTheDocument()
  })

  it("closes mobile menu on Escape and restores focus to trigger", () => {
    render(
      <KuatHeader
        title="Timesheets"
        lockup={{ variant: "default" }}
        navigation={navigation}
        account={account}
      />
    )

    const openButton = screen.getByRole("button", { name: "Open menu" })
    openButton.focus()
    fireEvent.click(openButton)
    expect(screen.getByRole("dialog", { name: "Navigation menu" })).toBeInTheDocument()

    fireEvent.keyDown(document, { key: "Escape" })
    expect(
      screen.queryByRole("dialog", { name: "Navigation menu" })
    ).not.toBeInTheDocument()
    expect(openButton).toHaveFocus()
  })

  it("renders semantic landmarks for header and navigation", () => {
    render(
      <KuatHeader
        title="Timesheets"
        lockup={{ variant: "default" }}
        navigation={navigation}
        account={account}
      />
    )
    expect(screen.getByRole("banner")).toBeInTheDocument()
    expect(
      screen.getByRole("navigation", { name: "Primary navigation" })
    ).toBeInTheDocument()
  })

  it("renders demo lockup with title-first structure on desktop and mobile", () => {
    render(<KuatHeader title="Demo Client" lockup={{ variant: "demo" }} />)

    expect(screen.getByRole("heading", { name: "Demo Client" })).toHaveClass(
      "kuat-header__desktop-demo-title"
    )
    expect(screen.getAllByText("A demo by")).toHaveLength(2)
    expect(
      screen
        .getAllByText("Demo Client")
        .some((node) => node.classList.contains("kuat-header__mobile-demo-title"))
    ).toBe(true)
    const logos = screen.getAllByLabelText("Equal Experts logo")
    expect(logos.length).toBeGreaterThan(1)
  })

  it("renders app switcher control when appSwitcher is provided", () => {
    render(
      <KuatHeader
        title="T"
        lockup={{ variant: "default" }}
        navigation={navigation}
        account={account}
        appSwitcher={appSwitcher}
      />
    )

    expect(
      screen.getByRole("button", { name: "Equal Experts apps" })
    ).toBeInTheDocument()
  })

  it("mobile Equal Experts apps drill-in lists apps", () => {
    render(
      <KuatHeader
        title="T"
        lockup={{ variant: "default" }}
        navigation={navigation}
        account={account}
        appSwitcher={{ apps: [{ id: "x", label: "Nexus", href: "/nexus" }] }}
      />
    )

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }))
    fireEvent.click(
      screen.getByRole("button", {
        name: "Equal Experts apps, Switch between EE services",
      })
    )
    expect(screen.getByRole("link", { name: "Nexus" })).toHaveAttribute(
      "href",
      "/nexus"
    )
    fireEvent.click(screen.getByRole("button", { name: "Back to main menu" }))
    expect(
      screen.getByRole("button", {
        name: "Equal Experts apps, Switch between EE services",
      })
    ).toBeInTheDocument()
  })

  it("mobile Account tier drill-in lists account links", () => {
    render(
      <KuatHeader
        title="T"
        lockup={{ variant: "default" }}
        navigation={navigation}
        account={account}
      />
    )

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }))
    fireEvent.click(
      screen.getByRole("button", { name: "Account, Manage your profile" })
    )
    expect(screen.getByRole("link", { name: "Profile" })).toHaveAttribute(
      "href",
      "/profile"
    )
    fireEvent.click(screen.getByRole("button", { name: "Back to main menu" }))
    expect(
      screen.getByRole("button", { name: "Account, Manage your profile" })
    ).toBeInTheDocument()
  })

  it("omits app switcher when appSwitcher is not passed", () => {
    render(
      <KuatHeader
        title="T"
        lockup={{ variant: "default" }}
        navigation={navigation}
        account={account}
      />
    )
    expect(
      screen.queryByRole("button", { name: "Equal Experts apps" })
    ).not.toBeInTheDocument()
  })

  it("keeps default lockup when a custom logo is provided, even in demo mode", () => {
    render(
      <KuatHeader
        title="Demo Client"
        lockup={{ variant: "demo" }}
        logo={<div data-testid="custom-logo">Client Logo</div>}
      />
    )

    expect(screen.getByRole("heading", { name: "Demo Client" })).toHaveClass(
      "kuat-header__desktop-demo-title"
    )
    expect(screen.getAllByTestId("custom-logo")).toHaveLength(2)
    expect(screen.queryByLabelText("Equal Experts logo")).not.toBeInTheDocument()
  })
})
