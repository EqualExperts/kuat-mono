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

  const actions = [
    {
      label: "John Doe",
      url: "/account",
      icon: <User aria-hidden className="h-4 w-4" />,
      items: [
        { label: "Account", url: "/account" },
        { label: "Sign out", url: "/sign-out" },
      ],
    },
  ]

  it("renders object-based navigation links and action trigger", () => {
    render(<KuatHeader title="Timesheets" navigation={navigation} actions={actions} />)

    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute("href", "/dashboard")
    expect(screen.getByRole("button", { name: /settings/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /john doe/i })).toBeInTheDocument()
  })

  it("renders nested submenu items in the mobile sheet", () => {
    render(<KuatHeader title="Timesheets" navigation={navigation} actions={actions} />)

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }))
    expect(screen.getByText("Profile")).toBeInTheDocument()
    expect(screen.getByText("Account")).toBeInTheDocument()
  })

  it("keeps legacy ReactNode slot props working", () => {
    render(
      <KuatHeader
        title="Legacy"
        navigation={<a href="/legacy-nav">Legacy Nav</a>}
        actions={<button type="button">Legacy Action</button>}
        mobileMenuTrigger={<button type="button" aria-label="Open legacy">Open</button>}
      />
    )

    expect(screen.getByRole("link", { name: "Legacy Nav" })).toHaveAttribute("href", "/legacy-nav")
    expect(screen.getByRole("button", { name: "Legacy Action" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Open legacy" })).toBeInTheDocument()
  })

  it("opens and closes the built-in mobile menu", () => {
    render(<KuatHeader title="Timesheets" navigation={navigation} actions={actions} />)

    const openButton = screen.getByRole("button", { name: "Open menu" })
    fireEvent.click(openButton)

    expect(screen.getByRole("dialog", { name: "Navigation menu" })).toBeInTheDocument()
    expect(screen.getAllByRole("link", { name: "Dashboard" }).length).toBeGreaterThan(0)

    fireEvent.click(screen.getByRole("button", { name: "Close menu" }))
    expect(screen.queryByRole("dialog", { name: "Navigation menu" })).not.toBeInTheDocument()
  })

  it("closes mobile menu on Escape and restores focus to trigger", () => {
    render(<KuatHeader title="Timesheets" navigation={navigation} actions={actions} />)

    const openButton = screen.getByRole("button", { name: "Open menu" })
    openButton.focus()
    fireEvent.click(openButton)
    expect(screen.getByRole("dialog", { name: "Navigation menu" })).toBeInTheDocument()

    fireEvent.keyDown(document, { key: "Escape" })
    expect(screen.queryByRole("dialog", { name: "Navigation menu" })).not.toBeInTheDocument()
    expect(openButton).toHaveFocus()
  })

  it("renders semantic landmarks for header and navigation", () => {
    render(<KuatHeader title="Timesheets" navigation={navigation} actions={actions} />)
    expect(screen.getByRole("banner")).toBeInTheDocument()
    expect(screen.getByRole("navigation", { name: "Primary navigation" })).toBeInTheDocument()
  })

  it("renders demo lockup with title-first structure on desktop and mobile", () => {
    render(<KuatHeader title="Demo Client" lockupVariant="demo" />)

    expect(screen.getByRole("heading", { name: "Demo Client" })).toHaveClass("kuat-header__desktop-demo-title")
    expect(screen.getAllByText("A demo by")).toHaveLength(2)
    expect(
      screen.getAllByText("Demo Client").some((node) => node.classList.contains("kuat-header__mobile-demo-title"))
    ).toBe(true)
    const logos = screen.getAllByLabelText("Equal Experts logo")
    expect(logos.length).toBeGreaterThan(1)
  })

  it("keeps default lockup when a custom logo is provided, even in demo mode", () => {
    render(
      <KuatHeader
        title="Demo Client"
        lockupVariant="demo"
        logo={<div data-testid="custom-logo">Client Logo</div>}
      />
    )

    expect(screen.getByRole("heading", { name: "Demo Client" })).toHaveClass("kuat-header__desktop-title")
    expect(screen.queryByRole("heading", { name: "Demo Client", level: 1 })).toBeInTheDocument()
    expect(screen.getAllByTestId("custom-logo")).toHaveLength(2)
    expect(screen.queryByText("Equal Experts logo")).not.toBeInTheDocument()
  })
})
