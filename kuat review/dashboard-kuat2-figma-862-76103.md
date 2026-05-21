# Kuat Review: Dashboard (Kuat2 Figma)

**Artifact:** [Kuat2 — A dashboard with sidebar, charts and data table](https://www.figma.com/design/5h2w5Wku6yltAlu0IS0dkT/Kuat2?node-id=862-76103)  
**Node ID:** `862:76103`  
**Review date:** 15 May 2026  
**Platform:** Web product (dashboard / analytics)  
**Rules source:** `https://github.com/EqualExperts/kuat-agent-rules.git` (synced to `~/.codex/cache/kuat-agent-rules`)

---

## Summary

The frame is a **well-structured dashboard shell** that aligns with Kuat’s recommended sidebar layout, KPI row, primary chart, and data-table pattern. It uses **semantic design tokens** and **Code Connect** mappings to Kuat React components (`Badge`, `Button`), which is a strong foundation for implementation.

Overall status: **Partial — not release-ready**. The layout and component vocabulary are directionally correct, but there are **brand**, **typography**, **accessibility**, and **content fidelity** gaps that should be resolved before treating this as an EE-branded product reference. The lower table region is explicitly marked **TODO** and should not be used as a specification until completed.

**High-risk gaps**

- Placeholder branding (“Acme Inc.”) and typography (**Inter** instead of **Lexend**)
- Chart delivered as raster graphics with hardcoded axis label colour (`#666`) — weak for accessibility and theming
- Status communicated primarily by **colour dots** in the table (incomplete section)
- Several **content inconsistencies** (duplicate helper copy, mismatched trend icon on Growth Rate)

---

## Checklist

| Rule / group | Status | Notes |
|--------------|--------|-------|
| Dashboard layout pattern | Pass | Sidebar + header + KPI grid + chart + table matches `scenarios/dashboards.md` |
| Sidebar width (240–280px) | Partial | 216px — slightly under spec |
| Content padding (24–32px) | Partial | Main area uses 16px |
| KPI count (4–6 max) | Pass | Four KPI cards |
| KPI card radius (6px) | Partial | Cards use 9px radius |
| Brand logo & identity | Fail | Generic mark + “Acme Inc.” |
| Typography (Lexend) | Fail | Inter used throughout |
| Semantic colour tokens | Partial | Mostly tokens; chart axis uses raw `#666` |
| EE Blue primary actions | Partial | Accent blues present; EE Blue not clearly primary CTA |
| Chart accessibility | Fail | No data table alternative; raster chart |
| Status not colour-only | Fail | Table status uses coloured dots |
| Product content quality | Partial | Placeholder copy; duplicate footers |
| Component mapping (Kuat) | Pass | Badge and Button linked via Code Connect |
| Table section completeness | Fail | Large TODO placeholder over table body |

---

## Assessment

### 1. Kuat design rules compliance

**Strengths**

- **Layout archetype** matches the documented metrics dashboard structure: persistent sidebar, top bar with context and search, four KPI cards, primary time-series chart with period controls, and tabular detail with pagination (`types/web/product/scenarios/dashboards.md`).
- **Dark sidebar navigation** is appropriate for product interfaces (`types/web/product/design.md`).
- **Token usage** is prevalent in Figma (`--general/*`, `--sidebar/*`, semantic spacing), supporting implementation via Kuat CSS variables rather than ad-hoc hex.
- **Code Connect** to `packages/kuat-react` `Badge` and `Button` improves design–dev parity.

**Violations and gaps**

| Severity | Rule | Evidence | Location | Fix |
|----------|------|----------|----------|-----|
| Major | `foundations/logo.md` | “Acme Inc.” + generic icon instead of EE logo | Sidebar header | Replace with official EE logo (white monochrome on dark sidebar); min width 100px |
| Major | `foundations/design/typography.md` | `Inter` in font definitions | Global | Bind text styles to Lexend (and JetBrains Mono for code if needed) |
| Major | `scenarios/dashboards.md` — accessibility | Chart is flattened imagery; axis labels `#666` | Total Visitors chart | Use chart component with semantic muted text; provide export/table view |
| Major | `foundations/accessibility.md` | Status = green/grey dots only | Table Status column | Add text labels (“Done”, “In process”) and icons; keep colour as reinforcement |
| Minor | `scenarios/dashboards.md` — specs | Sidebar 216px; content padding 16px | Layout | Widen sidebar to 240px; increase main padding to 24px (`p-6`) |
| Minor | `scenarios/dashboards.md` — KPI pattern | Card radius 9px vs 6px | KPI cards | Use `rounded-md` (6px) per product pattern |
| Minor | `foundations/design/colours.md` | EE Blue not clearly driving primary actions | Quick create, tabs, accents | Map primary CTAs and active nav to EE Blue token |
| Minor | `types/charts-data/README.md` | Multi-series area without legend/labels in frame | Chart card | Add legend, series labels, and brand-aligned series colours |

### 2. Research & product intent

Without linked research or requirements, the screen reads as a **shadcn/ui dashboard template** adapted to Kuat tokens rather than a validated EE product experience.

| Observation | Implication |
|-------------|-------------|
| Header says “Documents” while nav includes Dashboard, Lifecycle, Analytics | Unclear **information scent** — users may not know where they are in the IA |
| KPI set mixes revenue, customers, accounts, growth | Reasonable executive overview, but **no stated persona** or decision workflow |
| Table lists document sections (Cover page, Executive summary) under a metrics dashboard | **Domain mismatch** — suggests template content not yet tailored |
| “Visitors for the last 6 months” under Total Revenue | **Metric/context mismatch** — undermines trust in data |
| Duplicate line “Acquisition needs attention” on three cards | Copy-paste error reduces credibility |

### 3. UX best practices

**Works well**

- Clear visual hierarchy: KPI values use heading scale; labels use muted small text.
- Progressive structure: summary metrics → trend chart → detailed table.
- Period selector on chart (3 months / 30 days / 7 days) supports comparison behaviour recommended in dashboard rules.
- Pagination and row selection affordances are present at the bottom of the table card.

**Needs improvement**

- **Active navigation state** is not obvious in the sidebar (Dashboard vs Documents section).
- **Global search** (“Search for something…”) is vague; dashboard scenarios prefer contextual filters (date range, category) in a filter bar.
- **Quick create** + mail icon button: purpose and destination are unclear without labels/tooltips.
- **Growth Rate** card shows **+4.5%** with a **trending-down** icon in Code Connect metadata — inconsistent signalling.
- **TODO** overlay on the table blocks evaluation of density, sorting, empty states, and mobile behaviour.

### 4. Accessibility

| Area | Finding | WCAG / rule reference |
|------|---------|----------------------|
| Contrast | Muted text on dark backgrounds generally appears adequate; chart axis `#666` on dark chart ground is likely **below 4.5:1** | `foundations/accessibility.md` |
| Colour alone | Table status relies on dot colour | `foundations/accessibility.md`; `scenarios/dashboards.md` |
| Charts | No textual summary, no “view as table”, raster chart | `scenarios/dashboards.md` — chart alternatives |
| Icons | Many nav icons without visible text alternatives in compact states | `foundations/accessibility.md` — icons |
| Keyboard / landmarks | Not verifiable in static design; ensure `<main>`, `<nav>`, skip link, focus order KPI → filters → chart → table | `types/web/product/accessibility.md` |
| Motion | N/A in static frame | — |

**Screen reader example (target behaviour)**  
KPI: “Total Revenue: one thousand two hundred fifty dollars, up twelve point five percent, trending up this month.”

---

## Recommendations

1. **Replace placeholder brand** with Equal Experts logo and product name; remove “Acme Inc.” and demo avatar (“shadcn” / `m@example.com`).
2. **Retype the file** to Lexend per `foundations/design/typography.md`; re-check line heights against the type scale.
3. **Complete the data table** section: remove TODO, apply Kuat Table patterns, and design empty, loading, and error states per `scenarios/dashboards.md`.
4. **Fix KPI copy**: align each card’s footer with its metric (e.g. revenue → financial period, not “visitors”); remove duplicate “Acquisition needs attention” where inappropriate.
5. **Rebuild the chart** as a proper component: semantic axis/label tokens, legend, EE Blue / Transform Teal series colours, optional data table link, and text insight (“Peak visitors in May”).
6. **Clarify IA**: either rename breadcrumb to match the dashboard task or highlight the active nav item (Dashboard) with `bg-sidebar-accent` and aria-current.
7. **Harden status cells**: text + icon + colour; ensure destructive/negative trends use `text-destructive` not only red badges.
8. **Add filter bar** above KPIs or chart if users must slice by date/category (per dashboard filter patterns).
9. **Document responsive breakpoints** (KPI 4→2→1 columns, table scroll/card view) — not shown at 840px frame width only.
10. **Align spacing** to 4px scale: prefer 24px content padding and 24px grid gap between KPI cards.

---

## Open questions (by role)

Use these to refine the design before build sign-off.

### Product manager

- Who is the **primary user** (exec, ops, content author) and what **decision** should they make in under 30 seconds on this screen?
- Are these four KPIs the **canonical north-star metrics**, or placeholders?
- Should “Documents” in the header reflect the **current workspace** or is this screen actually the **Dashboard**?

### UX / content design

- What is the **happy-path narrative** from KPI anomaly → chart drill-down → table row action?
- Should search be **global** or **scoped to the current table/chart**?
- What **empty and error** messages apply when APIs fail or filters return zero rows?

### Engineering

- Will charts use a **Kuat chart primitive** or a third-party library — and how will **accessible data tables** be generated?
- Is **sidebar collapse** (64px icon-only) in scope for tablet?
- Which components are **already in kuat-react** vs needing new work (Table, Chart, Sidebar)?

### Accessibility

- Will each chart expose a **“View data table”** control and short **text summary**?
- How will **live region updates** work if KPIs refresh on an interval?
- Has contrast been checked for **badge outline variants** on dark card backgrounds?

### Design system / brand

- Is this frame intended as **EE-branded product** or a **neutral Kuat demo**? That determines how strictly logo and Lexend rules apply.
- Should **dark mode** be the default product chrome, or is a light content area required per `types/web/product/design.md`?

---

## Trello

No Trello card was linked for this review. If you have one, share the URL or ID and findings can be posted to the card.

---

## References (rules files used)

From `kuat-agent-rules` (synced session):

- `AGENTS.md`
- `kuat-docs/rules/LOADING.md`
- `kuat-docs/rules/foundations/brand.md`
- `kuat-docs/rules/foundations/logo.md`
- `kuat-docs/rules/foundations/accessibility.md`
- `kuat-docs/rules/foundations/design/colours.md`
- `kuat-docs/rules/foundations/design/typography.md`
- `kuat-docs/rules/foundations/design/spacing.md`
- `kuat-docs/rules/types/web/product/design.md`
- `kuat-docs/rules/types/web/product/accessibility.md`
- `kuat-docs/rules/types/web/product/scenarios/dashboards.md`
- `kuat-docs/rules/types/charts-data/README.md`
