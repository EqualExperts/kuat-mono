import { describe, it, expect } from "vitest"
import {
  shouldShowAppSwitcher,
  resolveAppSwitcherLabels,
  resolveHeaderLockup,
  resolveAccountLabels,
  shouldShowAccountMobileTier,
  hasStructuredAccount,
  resolveDesktopAccountMenuItems,
  shouldUseDesktopAccountDropdown,
} from "./kuat-header.logic"

describe("kuat-header.logic", () => {
  describe("shouldShowAppSwitcher", () => {
    it("returns false when config is omitted", () => {
      expect(shouldShowAppSwitcher(undefined)).toBe(false)
    })

    it("returns true when apps are present", () => {
      expect(
        shouldShowAppSwitcher({
          apps: [{ id: "1", label: "A", href: "/a" }],
        })
      ).toBe(true)
    })

    it("returns true when loading", () => {
      expect(
        shouldShowAppSwitcher({ apps: [], loading: true })
      ).toBe(true)
    })

    it("returns true for empty message mode", () => {
      expect(
        shouldShowAppSwitcher({ apps: [], empty: "message" })
      ).toBe(true)
    })

    it("returns false for empty hide mode", () => {
      expect(
        shouldShowAppSwitcher({ apps: [], empty: "hide" })
      ).toBe(false)
    })
  })

  describe("resolveHeaderLockup", () => {
    it("hides logo when lockup is omitted", () => {
      expect(resolveHeaderLockup({})).toEqual({
        mode: "hidden",
        lockupVariant: "default",
      })
    })

    it("shows builtin logo when lockup is set", () => {
      expect(resolveHeaderLockup({ lockup: { variant: "demo" } })).toEqual({
        mode: "builtin",
        lockupVariant: "demo",
      })
    })

    it("uses custom logo when provided", () => {
      expect(
        resolveHeaderLockup({ logo: "custom", lockup: { variant: "demo" } })
      ).toEqual({
        mode: "custom",
        lockupVariant: "demo",
      })
    })

    it("forces hidden when logo is null", () => {
      expect(resolveHeaderLockup({ logo: null })).toEqual({
        mode: "hidden",
        lockupVariant: "default",
      })
    })
  })

  describe("resolveAccountLabels", () => {
    it("falls back to mobile heading for teaser and title", () => {
      expect(
        resolveAccountLabels({
          items: [],
          mobile: {
            heading: "My account",
            subtitle: "Manage settings",
            items: [{ label: "Profile", href: "/p" }],
          },
        })
      ).toEqual({
        teaserTitle: "My account",
        teaserDescription: "Manage settings",
        nav: "Account",
        title: "My account",
      })
    })

    it("defaults mobile teaser subtitle to signed-in copy from primary item", () => {
      expect(
        resolveAccountLabels({
          items: [{ label: "John Doe", href: "/account" }],
          mobile: {
            heading: "Account",
            items: [{ label: "Sign out", href: "/out" }],
          },
        }).teaserDescription
      ).toBe("Signed in as John Doe")
    })
  })

  describe("account visibility helpers", () => {
    it("detects mobile tier and structured items", () => {
      const account = {
        items: [{ label: "User", href: "/u" }],
        mobile: {
          heading: "Account",
          items: [{ label: "Out", href: "/out" }],
        },
      }
      expect(hasStructuredAccount(account)).toBe(true)
      expect(shouldShowAccountMobileTier(account)).toBe(true)
    })

    it("uses desktop dropdown when one primary row and mobile menu items", () => {
      const account = {
        items: [{ label: "User", href: "/u" }],
        mobile: {
          heading: "Account",
          items: [
            { label: "Profile", href: "/profile" },
            { label: "Sign out", href: "/out" },
          ],
        },
      }
      expect(shouldUseDesktopAccountDropdown(account)).toBe(true)
      expect(resolveDesktopAccountMenuItems(account)).toEqual([
        { label: "Profile", url: "/profile" },
        { label: "Sign out", url: "/out" },
      ])
    })
  })

  describe("resolveAppSwitcherLabels", () => {
    it("merges custom labels with defaults", () => {
      expect(
        resolveAppSwitcherLabels({
          apps: [],
          labels: { trigger: "Apps" },
        }).trigger
      ).toBe("Apps")
      expect(resolveAppSwitcherLabels({ apps: [] }).teaserDescription).toBe(
        "Switch between EE services"
      )
    })
  })
})
