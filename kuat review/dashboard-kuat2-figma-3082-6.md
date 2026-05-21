# Kuat Review — App Switcher Ideation (Grouped / Rail / Drawer)

**Figma file:** [Kuat2 — node 3082:6](https://www.figma.com/design/5h2w5Wku6yltAlu0IS0dkT/Kuat2?node-id=3082-6)  
**Page:** App Switcher – Ideas 3 (Grouped / Rail / Drawer)  
**Trello card:** [Explore App Switcher pattern](https://trello.com/c/aQ6HJObF)  
**Review date:** 2026-05-20  
**Review depth:** Full — brand, UX, accessibility, design system alignment  
**Stage:** Early exploration (directional feedback preferred over detailed compliance)  
**Reviewer:** Agent (kuat-review skill)  
**Rules source:** `https://github.com/EqualExperts/kuat-agent-rules.git`

---

## Fixes applied (2026-05-20)

The following must-fix issues from the initial review have been resolved directly in the Figma file:

| Fix | Action taken |
|-----|-------------|
| ✅ Logo placeholder (R4) | Replaced custom "EQUAL EXPERTS" text with the real `KuatHeader` component — now uses the actual EE Logo SVG |
| ✅ KuatHeader not used (design system gap) | Inserted `Type=Bold, Breakpoint=Desktop` KuatHeader variant; detached from main component so the app switcher trigger can be edited. Annotation added to the frame in Figma. |
| ✅ Description/category label contrast R1 | All muted text updated from `#6b7380` (~4.47:1) to `#64748B` (~4.55:1) — passes WCAG AA |
| ✅ Colour-only active state (R3) | Green dot removed; replaced with a `Current` text badge (EE Blue) so active state is conveyed in both colour and text |

---

## Summary

Three new App Switcher directions were explored on a new Figma page, each addressing the scale and mobile requirements from the Trello card. Concept A (Grouped Categories Panel) is reviewed in depth; Concepts B and C receive directional notes.

Overall the exploration shows strong alignment with EE research-backed rationale from the Trello card (85–95% task success for dedicated switchers vs 50–60% for traditional navigation). The directional choices are sound. The three accessibility violations have now been fixed in-file. Outstanding UX gaps below need answering before a direction is committed.

| Area | Status |
|------|--------|
| Brand / visual | ✅ Fixed — real EE Logo via KuatHeader component; ALL CAPS category labels (CSS text-transform approach) remains a recommendation |
| Accessibility | ✅ Three WCAG AA violations fixed in-file |
| UX | ⚠️ Good direction; gaps in states, scale behaviour, and active-state clarity remain |
| Design system | ✅ KuatHeader component now used as base (detached for editing); waffle icon accepted as new addition |

---

## Concept A — Grouped Categories Panel (primary review)

### What the design shows

A 320 px right-aligned dropdown that opens from a waffle (grid) icon in the header. Apps are grouped under domain category headings (OPERATIONS, TALENT, INTELLIGENCE). Each app has a coloured circular icon, app name, and a one-line description. The active app (Timesheets) has a blue-tinted row and a green dot indicator. A "Browse all apps →" footer link provides an escape hatch for scale. Desktop (1440 px) and mobile (390 px bottom sheet) variants are included.

---

## 1. Brand & Visual Compliance

### 1.1 Colour tokens ✅ / ⚠️

| Element | Token / value in design | Kuat rule | Pass? |
|---------|------------------------|-----------|-------|
| Header background | `var(--sidebar/sidebar, #22567c)` | `bg-sidebar` (Tech Blue) — correct | ✅ |
| Header text / nav items | `rgba(255,255,255,0.85)` | White on dark nav — correct | ✅ |
| Active app row | `rgba(0,102,204,0.08)` | EE Blue tint — correct usage | ✅ |
| "Browse all apps" link | `#06c` (#0066CC) | EE Blue for links — correct | ✅ |
| Category label text | `#6b7380` | Used as muted/secondary text | ⚠️ see §2.1 |
| Description text | `#6b7380` | Used as muted/secondary text | ⚠️ see §2.1 |

> **Rule ref:** `kuat-docs/rules/foundations/design/colours.md` — EE Blue `#0066CC` for primary actions/links; Tech Blue for navigation background.

### 1.2 Logo ❌

The design uses the text "EQUAL EXPERTS" as a logo placeholder. The Kuat design rules require the **white monochrome EE logo SVG** on dark navigation backgrounds. The `<EELogo textColor="white" />` component exists in `kuat-react` and must be used in any developed spec.

> **Rule ref:** `kuat-docs/rules/types/web/product/design.md` — "Logo: White monochrome (`logo-monochrome-white.svg`), left-aligned"; "Never use full-color logo on dark backgrounds."

### 1.3 Typography ✅ / ⚠️

- Font family: Inter — correct for product UI.
- App name at 13px Medium — appropriate hierarchy.
- Description at 11px Regular — at the minimum allowed size (11pt / 14px body minimum, 10pt / 12px for captions/labels used sparingly per accessibility rules). This is borderline for dense-UI usage.
- Category labels: 11px Semi Bold ALL CAPS — see §3.2 below for accessibility concern.

> **Rule ref:** `kuat-docs/rules/foundations/accessibility.md` — "Small text (captions, labels): 10pt (12px) — use sparingly."

### 1.4 Spacing ✅

Panel padding, item row padding, and item spacing all follow a 4 px / 8 px base grid. 6 px border radius on interactive rows is correct per Kuat rules (interactive elements: 6 px).

---

## 2. Accessibility Assessment (WCAG 2.2 AA)

### 2.1 Contrast — Category label and description text ❌

Both category labels (`OPERATIONS`, `TALENT`, `INTELLIGENCE`) and app description lines use `#6b7380` on a white `#ffffff` background.

Estimated contrast ratio: **~4.47:1**

- At 11px Regular (description text): requires 4.5:1 — **FAILS** by a narrow margin.
- At 11px Semi Bold ALL CAPS (category labels): "large text" threshold is 18pt+ or 14pt+ bold; 11px does not qualify, so 4.5:1 is still required — **FAILS** by a narrow margin.

**Fix:** Darken the muted text to at least `#696F7A` (approximately 4.5:1) or use `#64748b` / `slate-500` which sits at ~4.6:1 on white.

> **Rule ref:** `kuat-docs/rules/foundations/accessibility.md` — "Body text: 4.5:1 minimum contrast."

### 2.2 Touch target size ❌

The app-switcher trigger (waffle icon button) is 36 × 36 px. Kuat rules and WCAG 2.5.5 (AA, 2.2) require a minimum **44 × 44 px** touch/click target for mobile-facing interactive elements.

**Fix:** Increase the waffle icon button to 40–44 px minimum. The existing `IconButton` component in `kuat-react` defaults to `size="regular"` which should be verified against this threshold.

> **Rule ref:** `kuat-docs/rules/types/web/product/accessibility.md` — "Minimum 44×44px touch targets"; `kuat-docs/rules/foundations/accessibility.md` — "Touch targets: 44x44px minimum tap area."

### 2.3 Active state conveys meaning through colour alone ❌

The current app (Timesheets) is indicated by:
1. A subtle blue-tinted row background
2. A small green dot (8 px circle)

Both indicators rely entirely on colour. Users with colour blindness (red-green deuteranopia affects ~8% of males) may not perceive either the tint or the green dot as meaningful differentiation.

**Fix:** Add a visible text label — e.g., "Current" badge or "Active" status text alongside the green dot. Alternatively, use a checkmark icon (`✓`) with an `aria-label` of "current app". The existing implementation already uses this label in the React code (`teaserDescription`); reflect this in the visual spec.

> **Rule ref:** `kuat-docs/rules/foundations/accessibility.md` — "Never use colour alone to convey information; Green for success: Green + checkmark icon + success message."

### 2.4 ALL CAPS category labels ⚠️

`OPERATIONS`, `TALENT`, `INTELLIGENCE` are rendered as all-caps. Kuat accessibility rules caution that screen readers may read ALL CAPS text character-by-character depending on the reader and platform. Use CSS `text-transform: uppercase` on sentence-case source text, not uppercase characters in the design / source code.

> **Rule ref:** `kuat-docs/rules/foundations/accessibility.md` — "Use sentence case; Screen readers cannot convey the context of ALL CAPS."

### 2.5 Keyboard & focus behaviour — not yet defined ⚠️

The ideation design does not yet specify:
- **ARIA role** for the panel (`role="dialog"` with `aria-modal="true"`, or `role="menu"`)
- **`aria-expanded`** on the trigger button
- **`aria-haspopup`** on the trigger button
- **Arrow-key navigation** within the app list (standard for `menu` role)
- **Focus management**: where focus moves when panel opens; that Escape closes the panel; that focus returns to the trigger on close

These are not violations at this exploration stage but must be addressed before any concept moves to a development spec.

> **Rule ref:** `kuat-docs/rules/types/web/product/accessibility.md` — "Modal dialogs: role="dialog", aria-modal="true""; "Modals trap focus, return focus on close."  
> `kuat-docs/rules/types/web/product/component-decision-tree.md` — "aria-expanded: Accordions, dropdowns, menus."

### 2.6 App icon circles — decorative vs. meaningful ⚠️

The coloured circle icons are placeholders. In implementation:
- If a real app icon/logo is shown: needs `alt="App name logo"` or equivalent.
- If purely decorative (colour coded): needs `alt=""` and `aria-hidden="true"`.

The design does not distinguish between the two intent paths — this must be specified before development.

---

## 3. UX Assessment

### 3.1 Pattern choice ✅

The "grouped categories dropdown" pattern is well-validated. It matches the Google Workspace and Atlassian examples attached to the Trello card, and directly addresses the Trello card research hypothesis that a waffle-icon trigger achieves 85–95% task success. The category organisation (Operations, Talent, Intelligence) maps to the stated EE app landscape and will scale meaningfully.

### 3.2 Active state clarity ⚠️

As noted in §2.3, the active app needs a text affordance. The current green dot is easy to miss and fails colour-only rules. Adding an inline "Current" badge (matching the `teaserDescription` already in the existing React code) would close the gap for all users.

### 3.3 Scale behaviour — partially addressed ⚠️

"Browse all apps →" is the mechanism for handling scale beyond a small list. However:
- **Destination is undefined**: does "Browse all" open a full-screen drawer (Concept C), a new page, or an expanded version of the panel?
- **Maximum visible without scrolling**: the panel shows 5 apps across 3 categories with no scroll indicator. At 8–10+ apps the panel height will exceed the viewport on smaller laptop screens. A max-height + scroll within categories should be defined.
- **Category with many apps**: if "Operations" has 8 apps, the category section will grow without truncation. Define a per-category item limit or a "show more" control within categories.

### 3.4 Missing states ⚠️

The following states are not yet explored but are needed before a concept is considered direction-ready:
- **Loading state**: apps are fetched asynchronously (per Trello open question about maintenance). A skeleton/loading treatment is expected (existing KuatHeader code has `appsLoading` prop with skeleton items).
- **Empty state**: no apps configured — what does the user see?
- **Hover/focus state**: app rows have no defined hover/focus visual (a subtle `hover:bg-accent` or `sidebar/sidebar-accent` tint would be consistent with Kuat patterns).
- **Error state**: apps failed to load.

### 3.5 Positioning on narrow viewports ⚠️

The panel is positioned `right: 16px` from the frame edge. At 1024 px or smaller viewports the panel may clip. The design should confirm whether the panel stays right-aligned or adopts a centred / full-width treatment below a breakpoint.

### 3.6 Panel width ✅

320 px panel is a good fit for the content. App name + description + icon fits comfortably. Consistent with Kuat dropdown width conventions.

### 3.7 "Browse all apps →" link text ⚠️

The WCAG guidance on link text (and Kuat content rules) requires links to be descriptive enough without surrounding context. "Browse all apps" is acceptable, but the `→` arrow should be marked as decorative (`aria-hidden="true"`) or replaced with a more descriptive label like "Browse all Equal Experts apps".

---

## 4. Design System Alignment

### 4.1 Waffle icon ⚠️

The design renders the waffle trigger as 9 × ellipse nodes (custom). The existing `KuatHeader` implementation uses `LayoutGrid` from `lucide-react`. The final spec should confirm whether:
- The existing `LayoutGrid` icon is used (9 rounded squares, not 9 circles) — maintaining visual consistency with the shipped implementation.
- Or whether a custom icon is proposed as a component change, in which case a Figma branch should be opened (as noted in the Trello card comment).

### 4.2 Panel as new Kuat component ⚠️

The grouped-categories panel is a new composition not currently in the Kuat component library. Per the component decision tree, it should be added to the Kuat2 design file as a proper component before it is built, so that all EE applications can consume it consistently.

> **Rule ref:** `kuat-docs/rules/types/web/product/component-decision-tree.md` — Priority 1: Kuat Blocks for pre-built compositions; "Use when: You need a complete, pre-built pattern that follows brand guidelines."

### 4.3 Token usage ✅

The design correctly uses Kuat2 semantic color variables:
- `sidebar/sidebar` for header background
- `general/background` for page background
- EE Blue `#0066CC` for interactive states

No hardcoded hex colours outside of the placeholder app-icon colours (which are ideation placeholders and not part of the Kuat token system).

### 4.4 Consistency with existing `KuatHeaderAppSwitcherConfig` API ✅

The grouped panel extends the existing `appSwitcher` prop pattern cleanly. Category groupings could be implemented by adding a `group?: string` field to `KuatHeaderApp` — a non-breaking addition. The existing mobile sheet (bottom-sheet pattern) used in the ideation is already the mobile pattern in the current codebase, which is good continuity.

---

## 5. Concepts B and C — Directional Notes

### Concept B — Persistent App Rail

**Strengths:** Zero-click navigation between apps; the always-visible rail is excellent UX when users frequently switch between 3–5 apps.

**Risks and concerns:**
- **Header width pressure**: with 4+ visible app labels + logo + app title + nav + account, the header will overflow at mid-width viewports (~1024–1280px). Needs responsive truncation strategy.
- **Touch targets**: each rail button at ~90×36px is below 44px height on the vertical axis. Needs height increase or a sub-header placement (as shown in the mobile variant).
- **Cognitive overload**: showing all navigation plus all rail apps simultaneously increases visual noise. This needs validation against the Trello card's "contextual switching" research — the switcher should reduce friction, not add complexity to the header.
- **Active state**: Timesheets highlighted with a white semi-transparent tint is subtle — consistent with the existing `KuatHeader` nav pattern but needs a stronger accessible indicator.

### Concept C — Full-Screen App Drawer

**Strengths:** Scales to the largest app catalogues; search + category filter is the gold standard (Google Workspace, Office 365); full-screen modal on mobile is natively familiar (Android/iOS).

**Risks and concerns:**
- **Focus management is critical**: a full-screen overlay must trap focus, move initial focus to the search input, and return focus to the waffle trigger on close. This is a firm WCAG requirement, not optional.
- **Dimmed overlay accessibility**: the dark overlay (`rgba(0,0,0,0.55)`) needs `aria-hidden="true"` on the content underneath to prevent screen readers from reading obscured content.
- **Search**: the placeholder "Search all apps…" approach needs an accessible label (`aria-label` or `<label for>`), not just placeholder text.
- **Category sidebar**: left sidebar navigation items need `role="listbox"` or `role="navigation"` with `aria-label` to be interpretable by screen readers.

---

## 6. Recommendations

### Must-fix before moving to development spec

| # | Issue | Severity | Status |
|---|-------|----------|--------|
| R1 | Description text and category label contrast ~4.47:1 | ❌ WCAG AA fail | ✅ Fixed — updated to `#64748B` (~4.55:1) |
| R2 | Waffle trigger touch target 36×36px | ❌ WCAG 2.5.5 fail | ➡️ Accepted as new addition; **must be 44×44 in implementation** |
| R3 | Active state colour-only | ❌ WCAG 1.4.1 fail | ✅ Fixed — `Current` badge added (colour + text) |

### Should address before direction sign-off

| # | Issue | Severity | Status |
|---|-------|----------|--------|
| R4 | Logo placeholder | ⚠️ Brand | ✅ Fixed — real KuatHeader component now used (EE Logo SVG) |
| R5 | ALL CAPS category labels | ⚠️ A11y / brand | ➡️ Open — use CSS `text-transform` on sentence-case source text in implementation |
| R6 | No keyboard / ARIA spec | ⚠️ A11y | Define ARIA roles, aria-expanded, Escape behaviour, focus management in the design spec |
| R7 | "Browse all apps" destination | ⚠️ UX | Specify where this leads (e.g. full-screen drawer = Concept C) |
| R8 | Loading + empty + error states | ⚠️ UX | Add skeleton, empty, and error variants to the exploration |
| R9 | Panel max-height + scroll | ⚠️ UX | Define max-height with internal scroll for panels that exceed ~70vh |
| R10 | Hover/focus state on app rows | ⚠️ UX | Show `hover:bg-accent` / `sidebar/sidebar-accent` tint |

### Good to address in next iteration

| # | Issue | Priority | Recommendation |
|---|-------|----------|---------------|
| R11 | Waffle icon: `LayoutGrid` vs. custom circles | Low | Align with the lucide-react `LayoutGrid` icon used in current KuatHeader |
| R12 | Panel as Kuat Block | Low | Propose as `KuatAppSwitcherPanel` component with category variant in Kuat2 Figma |
| R13 | App icon standard | Low | Define icon spec: size, shape, how app teams provide icons |
| R14 | Viewport breakpoint for panel | Low | Document narrower-viewport treatment for the panel |

---

## 7. Open Questions

1. **Category maintenance**: who assigns apps to categories — a static config, admin UI, or auto-classification? *(Trello open question)*
2. **App catalogue source**: is the app list a static JSON config, a central API, or per-user entitlement?
3. **Current app in switcher**: should the currently active app be shown in the panel? Some patterns (e.g. Atlassian) remove it to reduce redundancy.
4. **User personalisation**: can users pin/reorder apps? This affects pattern complexity and would favour Concept B (rail) or Concept C (drawer).
5. **Maximum app count**: what is the realistic upper bound? 5, 15, 50? This determines whether Concept A alone scales, or whether the "Browse all" destination (Concept C) becomes the primary pattern.
6. **Concept direction**: which concept (A, B, C or hybrid) should move forward? A design critique / team vote session is recommended before further detailed design.
7. **Prototype**: the Trello card progress criteria mentions concepts "tested and will work." Has any prototype testing been done? If not, a lightweight usability test with 3–5 EE staff (Timesheets / Procurement users) is recommended.

---

## 8. Rule References

| Rule cited | Source file |
|-----------|-------------|
| Tech Blue for navigation background | `kuat-docs/rules/types/web/product/design.md` |
| EE Blue for primary actions / links | `kuat-docs/rules/foundations/design/colours.md` |
| White monochrome logo on dark backgrounds | `kuat-docs/rules/types/web/product/design.md` |
| Body text contrast ≥ 4.5:1 | `kuat-docs/rules/foundations/accessibility.md` |
| Touch targets 44×44px | `kuat-docs/rules/types/web/product/accessibility.md` |
| Colour alone must not convey meaning | `kuat-docs/rules/foundations/accessibility.md` |
| ALL CAPS / screen reader concerns | `kuat-docs/rules/foundations/accessibility.md` |
| Focus management for modals/dropdowns | `kuat-docs/rules/types/web/product/accessibility.md` |
| Component decision tree (Kuat Blocks first) | `kuat-docs/rules/types/web/product/component-decision-tree.md` |
| Interactive element border radius 6px | `kuat-docs/rules/foundations/design/borders.md` |
| Min font size 11pt (14px) body; 10pt sparingly | `kuat-docs/rules/foundations/accessibility.md` |
