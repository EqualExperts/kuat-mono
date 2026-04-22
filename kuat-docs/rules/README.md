# Kuat rules index

Single entry point for **Equal Experts** canonical rules (vendored copy) and **Kuat**-specific implementation notes. Generic brand doctrine is **not** duplicated here—link targets live under [`external/kuat-agent-rules`](../../external/kuat-agent-rules).

> Policy: [Rules source of truth](../setup/rules-source-of-truth.md). Task-loading order for upstream: [`LOADING.md`](../../external/kuat-agent-rules/kuat-docs/rules/LOADING.md).

**Path prefix (this repo):** `external/kuat-agent-rules/kuat-docs/rules/`

---

## Canonical EE rules (vendored)

Use these files in the synced tree. Paths below are relative to the repo root.

### Rules index & loading

| Resource | Path |
|----------|------|
| Rules README | [`external/kuat-agent-rules/kuat-docs/rules/README.md`](../../external/kuat-agent-rules/kuat-docs/rules/README.md) |
| Task loading | [`external/kuat-agent-rules/kuat-docs/rules/LOADING.md`](../../external/kuat-agent-rules/kuat-docs/rules/LOADING.md) |

### Foundations — design

| Topic | Path |
|-------|------|
| Design language | [`.../foundations/design/design-language.md`](../../external/kuat-agent-rules/kuat-docs/rules/foundations/design/design-language.md) |
| Colours | [`.../foundations/design/colours.md`](../../external/kuat-agent-rules/kuat-docs/rules/foundations/design/colours.md) |
| Typography | [`.../foundations/design/typography.md`](../../external/kuat-agent-rules/kuat-docs/rules/foundations/design/typography.md) |
| Spacing | [`.../foundations/design/spacing.md`](../../external/kuat-agent-rules/kuat-docs/rules/foundations/design/spacing.md) |
| Borders | [`.../foundations/design/borders.md`](../../external/kuat-agent-rules/kuat-docs/rules/foundations/design/borders.md) |

### Foundations — logo

| Topic | Path |
|-------|------|
| Logo | [`.../foundations/logo.md`](../../external/kuat-agent-rules/kuat-docs/rules/foundations/logo.md) |

### Foundations — content

| Topic | Path |
|-------|------|
| Content index | [`.../foundations/content/README.md`](../../external/kuat-agent-rules/kuat-docs/rules/foundations/content/README.md) |
| Voice and tone | [`.../foundations/content/voice-and-tone.md`](../../external/kuat-agent-rules/kuat-docs/rules/foundations/content/voice-and-tone.md) |
| Writing style | [`.../foundations/content/writing-style.md`](../../external/kuat-agent-rules/kuat-docs/rules/foundations/content/writing-style.md) |
| Formatting | [`.../foundations/content/formatting.md`](../../external/kuat-agent-rules/kuat-docs/rules/foundations/content/formatting.md) |
| Punctuation | [`.../foundations/content/punctuation.md`](../../external/kuat-agent-rules/kuat-docs/rules/foundations/content/punctuation.md) |
| Numbers | [`.../foundations/content/numbers.md`](../../external/kuat-agent-rules/kuat-docs/rules/foundations/content/numbers.md) |

### Types — web — product

| Topic | Path |
|-------|------|
| Product design (layouts / navigation scenarios) | [`.../types/web/product/design.md`](../../external/kuat-agent-rules/kuat-docs/rules/types/web/product/design.md) |
| Product content | [`.../types/web/product/content/product-content.md`](../../external/kuat-agent-rules/kuat-docs/rules/types/web/product/content/product-content.md) |
| Product content (directory) | [`.../types/web/product/content/`](../../external/kuat-agent-rules/kuat-docs/rules/types/web/product/content/) |

### Types — web — marketing

| Topic | Path |
|-------|------|
| Marketing website | [`.../types/web/marketing/website.md`](../../external/kuat-agent-rules/kuat-docs/rules/types/web/marketing/website.md) |
| Marketing content | [`.../types/web/marketing/content/marketing-content.md`](../../external/kuat-agent-rules/kuat-docs/rules/types/web/marketing/content/marketing-content.md) |
| Marketing content (directory) | [`.../types/web/marketing/content/`](../../external/kuat-agent-rules/kuat-docs/rules/types/web/marketing/content/) |

---

## Kuat implementation (this monorepo)

High-level EE design language is in [`design-language.md`](../../external/kuat-agent-rules/kuat-docs/rules/foundations/design/design-language.md). The sections below are **Kuat-only**: how tokens and packages map to code.

### What is Kuat?

Kuat is the design decision layer for Equal Experts web UIs: tokens (`@equal-experts/kuat-core`), components (`@equal-experts/kuat-react`, `@equal-experts/kuat-vue`), blocks, and documentation.

### Token architecture

**Layer 1 — Brand colours:** EE Blue, Transform Teal, Tech Blue, Equal Ember (see upstream colours doc).

**Layer 2 — Semantic tokens** (examples): `--primary`, `--secondary`, `--accent`, `--background`, `--foreground`, `--muted`, `--destructive`, `--border`, `--input`, `--ring`.

**Layer 3 — Component tokens** (examples): `--card`, `--card-foreground`, `--sidebar`, `--sidebar-foreground`, `--popover`, `--popover-foreground`.

### Theming

- **Light:** default semantic tokens.
- **Dark:** add `.dark` on the root; semantic tokens switch; follow upstream usage for brand colours.

### Package layout

```
@equal-experts/kuat-core/
├── src/variables.css
└── tailwind.config.ts

@equal-experts/kuat-react/ → src/components/
@equal-experts/kuat-vue/   → src/components/
```

### Integration docs

- [Integration guide](../setup/integration.md)
- [Kuat core integration](../setup/kuat-core-integration.md)

---

## Local rule documents (not mirrored above)

These files live only under `kuat-docs/rules/` and add Kuat or scenario-specific guidance:

| Area | Entry |
|------|--------|
| Layout primitives | [design/layouts.md](./design/layouts.md) |
| Components | [components/README.md](./components/README.md), [patterns.md](./components/patterns.md) |
| Accessibility | [accessibility/README.md](./accessibility/README.md) |
| Scenarios | [scenarios/README.md](./scenarios/README.md) |

---

## Quick navigation

| Category | Notes |
|----------|--------|
| **EE canonical** | Tables above → `external/kuat-agent-rules` |
| **Kuat tokens & packages** | Section *Kuat implementation* |
| **[Design — layouts](./design/layouts.md)** | Kuat layout primitives + upstream scenario links |
| **[Accessibility](./accessibility/)** | WCAG-oriented local guides |
| **[Components](./components/)** | Naming, variants, patterns |
| **[Scenarios](./scenarios/)** | Applied flows (auth, dashboards, …) |

---

## Implementation examples

Code samples are not in this file:

- [examples/react/](../examples/react/)
- [examples/vue/](../examples/vue/)
- [examples/css/](../examples/css/)

---

## For AI agents

1. **Default:** Load **this file** (`kuat-docs/rules/README.md`), then open the specific upstream file(s) from the tables (same paths under `external/kuat-agent-rules/...`).
2. **Design tokens / brand colour decisions:** [`foundations/design/colours.md`](../../external/kuat-agent-rules/kuat-docs/rules/foundations/design/colours.md) (and spacing/typography/borders as needed).
3. **Content voice / UX copy:** [`foundations/content/voice-and-tone.md`](../../external/kuat-agent-rules/kuat-docs/rules/foundations/content/voice-and-tone.md) plus product or marketing content docs above.
4. **Layout structure in code:** [design/layouts.md](./design/layouts.md).
5. **Components:** [components/patterns.md](./components/patterns.md) + relevant `examples/{framework}/`.
