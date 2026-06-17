# Kuat rules index

Single entry point for **Equal Experts** canonical rules (vendored copy) and **Kuat**-specific implementation notes. Generic brand doctrine is **not** duplicated here—link targets live under [`external/kuat-agent-rules`](../../external/kuat-agent-rules).

> Policy: [Rules source of truth](../setup/rules-source-of-truth.md). Upstream reference index: [`reference/README.md`](../../external/kuat-agent-rules/reference/README.md).

**Path prefix (this repo):** `external/kuat-agent-rules/reference/`

---

## Canonical EE rules (vendored)

Use these files in the synced tree. Paths below are relative to the repo root.

### Rules index & loading

| Resource | Path |
|----------|------|
| Reference index | [`external/kuat-agent-rules/reference/README.md`](../../external/kuat-agent-rules/reference/README.md) |
| Old→new path map | [`external/kuat-agent-rules/reference/MIGRATION-MAP.md`](../../external/kuat-agent-rules/reference/MIGRATION-MAP.md) |

### Foundations — design

| Topic | Path |
|-------|------|
| Design language | [`.../design-language/design-language.md`](../../external/kuat-agent-rules/reference/design-language/design-language.md) |
| Colours | [`.../design-language/colours.md`](../../external/kuat-agent-rules/reference/design-language/colours.md) |
| Typography | [`.../design-language/typography.md`](../../external/kuat-agent-rules/reference/design-language/typography.md) |
| Spacing | [`.../design-language/spacing.md`](../../external/kuat-agent-rules/reference/design-language/spacing.md) |
| Borders | [`.../design-language/borders.md`](../../external/kuat-agent-rules/reference/design-language/borders.md) |

### Foundations — logo

| Topic | Path |
|-------|------|
| Logo | [`.../brand/logo.md`](../../external/kuat-agent-rules/reference/brand/logo.md) |

### Foundations — content

| Topic | Path |
|-------|------|
| Content index | [`.../content/README.md`](../../external/kuat-agent-rules/reference/content/README.md) |
| Voice and tone | [`.../brand/voice-and-tone.md`](../../external/kuat-agent-rules/reference/brand/voice-and-tone.md) |
| Writing style | [`.../content/writing-style.md`](../../external/kuat-agent-rules/reference/content/writing-style.md) |
| Formatting | [`.../content/formatting.md`](../../external/kuat-agent-rules/reference/content/formatting.md) |
| Punctuation | [`.../content/punctuation.md`](../../external/kuat-agent-rules/reference/content/punctuation.md) |
| Numbers | [`.../content/numbers.md`](../../external/kuat-agent-rules/reference/content/numbers.md) |

### Types — web — product

| Topic | Path |
|-------|------|
| Product design (layouts / navigation patterns) | [`.../media-types/web-product/design.md`](../../external/kuat-agent-rules/reference/media-types/web-product/design.md) |
| Product content | [`.../media-types/web-product/content/product-content.md`](../../external/kuat-agent-rules/reference/media-types/web-product/content/product-content.md) |
| Product content (directory) | [`.../media-types/web-product/content/`](../../external/kuat-agent-rules/reference/media-types/web-product/content/) |

### Types — web — marketing

| Topic | Path |
|-------|------|
| Marketing website | [`.../media-types/web-marketing/website.md`](../../external/kuat-agent-rules/reference/media-types/web-marketing/website.md) |
| Marketing content | [`.../media-types/web-marketing/content/marketing-content.md`](../../external/kuat-agent-rules/reference/media-types/web-marketing/content/marketing-content.md) |
| Marketing content (directory) | [`.../media-types/web-marketing/content/`](../../external/kuat-agent-rules/reference/media-types/web-marketing/content/) |

---

## Kuat implementation (this monorepo)

High-level EE design language is in [`design-language.md`](../../external/kuat-agent-rules/reference/design-language/design-language.md). The sections below are **Kuat-only**: how tokens and packages map to code.

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

1. **Default:** Load **this file** (`kuat-docs/rules/README.md`), then open the specific upstream file(s) from the tables (same paths under `external/kuat-agent-rules/reference/...`).
2. **Design tokens / brand colour decisions:** [`design-language/colours.md`](../../external/kuat-agent-rules/reference/design-language/colours.md) (and spacing/typography/borders as needed).
3. **Content voice / UX copy:** [`brand/voice-and-tone.md`](../../external/kuat-agent-rules/reference/brand/voice-and-tone.md) plus product or marketing content docs above.
4. **Layout structure in code:** [design/layouts.md](./design/layouts.md).
5. **Components:** [components/patterns.md](./components/patterns.md) + relevant `examples/{framework}/`.
