# Kuat `0.14.0-beta.1` — Beta Acceptance Criteria

Run this against a **freshly built** consumer app to confirm the issues from the
consumer beta-setup field report no longer persist. Each criterion names the
original issue it guards. Usable by a human or an agent.

## Preconditions (the test setup)

1. **Fresh** app — Vite + React 19 + TypeScript (`react-ts`), Tailwind v4 via
   `@tailwindcss/vite`. (A Vue 3 + `kuat-vue` variant is in [§J](#j-vue-variant).)
2. Install the beta channel:
   ```bash
   npm i @equal-experts/kuat-core@beta @equal-experts/kuat-react@beta
   ```
   Expect `0.14.0-beta.1` for both.
3. **Follow only the published docs** — the `@equal-experts/kuat-react` README
   "Recommended setup" and the `@equal-experts/kuat-core` README. **No local
   patches, no `.dark` overrides, no deviations.**
4. The app must build (`npm run build`) and run (`npm run dev`) before scoring.

**Scoring:** every `MUST` has to pass for sign-off. `SHOULD` items are warnings
(record, don't block). A criterion also fails if the documented setup had to be
deviated from to make it pass (see AC-1).

---

## A. Setup & build (the meta-test — beta.0 failed this)

| ID | Pri | Criterion | How to verify | Result |
|----|-----|-----------|---------------|--------|
| **AC-1** | MUST | The app compiles and renders **following the docs verbatim**, with **zero deviations**. | Build a fresh app using only README steps; it builds + runs. (beta.0 needed deviating in 2 places.) | ☐ |
| **AC-2** | MUST | **No JS Tailwind preset** anywhere. | `grep -rn "kuatPreset" .` (excluding `node_modules`) → no matches in your app. | ☐ |
| **AC-3** | MUST | Tokens imported **through Tailwind** (CSS `@import`), not a JS `import`. *(Report §2)* | Entry CSS has `@import "tailwindcss";` then `@import "@equal-experts/kuat-core/variables.css";`. No `import "...variables.css"` in `.ts/.tsx`. | ☐ |
| **AC-4** | MUST | Build log free of **`@import ... must precede all rules`** warnings. *(BUG-5)* | Inspect `npm run build` output. | ☐ |

## B. Token utilities generate correctly *(BUG-2)*

| ID | Pri | Criterion | How to verify | Result |
|----|-----|-----------|---------------|--------|
| **AC-5** | MUST | Token utilities resolve to **real brand colours**, not invalid/empty values. | `<div class="bg-primary text-primary-foreground rounded-lg">` renders EE-blue with white text; DevTools `background-color` computes to a colour (not `transparent`/unset). | ☐ |
| **AC-6** | MUST | Compiled CSS has **no `hsl(var(--…))`** token wrapping. | `grep -c "hsl(var(" dist/assets/*.css` → `0`. Utilities read e.g. `.bg-primary{background-color:var(--primary)}`. | ☐ |
| **AC-7** | MUST | `bg-card`, `text-foreground`, `rounded-lg`, `text-muted-foreground` all apply visible styling. | Render each; compare against browser defaults. | ☐ |

## C. Dark-mode accessibility *(BUG-1 — the bug that broke the preview)*

| ID | Pri | Criterion | How to verify | Result |
|----|-----|-----------|---------------|--------|
| **AC-8** | MUST | With **no local `.dark` override**, dark-mode text is legible on every surface. | Toggle `.dark` on `<html>`. Exact repro: `<h2 class="bg-card text-card-foreground">` heading is **clearly visible** (was invisible in beta.0). | ☐ |
| **AC-9** | MUST | In dark mode `--card-foreground` and `--accent-foreground` resolve to **white**, and `--muted` is a **dark** surface. | DevTools computed: `--card-foreground` → `oklch(1 0 0)` (white), not near-black. | ☐ |
| **AC-10** | MUST | The beta.0 **appendix workaround is no longer needed**. | Confirm there is **no** `.dark { --card-foreground / --muted / --accent-foreground … }` override in the app, yet dark mode is correct. | ☐ |
| **AC-11** | SHOULD | Sidebar surfaces legible in dark mode. | If rendered: active/accent items show white text on the blue surfaces (sidebar-accent ≈ 5.2:1, sidebar-primary ≈ 3.2:1). | ☐ |

## D. Types & API *(BUG-3)*

| ID | Pri | Criterion | How to verify | Result |
|----|-----|-----------|---------------|--------|
| **AC-12** | MUST | `tsc` clean for documented usage. | `npx tsc --noEmit` passes on a file using the README snippets. | ☐ |
| **AC-13** | MUST | `Carousel`/`KuatCarousel` `opts` accepts Embla options. | `<KuatCarousel opts={{ loop: true, align: "start" }} />` type-checks (no `EmblaViewportRefType` error). | ☐ |

## E. Fonts *(BUG-5 / Fix 1)*

| ID | Pri | Criterion | How to verify | Result |
|----|-----|-----------|---------------|--------|
| **AC-14** | MUST | Brand fonts load out of the box. | Body text renders in **Lexend**; `font-mono` → JetBrains Mono. Computed `font-family` confirms. | ☐ |
| **AC-15** | SHOULD | Fonts path matches the docs. | Either `@equal-experts/kuat-core/fonts.css` is imported first, or component-package consumers get fonts via `@equal-experts/kuat-react/styles` with no extra step. | ☐ |

## F. Peer dependencies *(Report §3.3)*

| ID | Pri | Criterion | How to verify | Result |
|----|-----|-----------|---------------|--------|
| **AC-16** | MUST | Installing the README **peer matrix** for the components used yields **no missing-peer / unresolved-import errors**. | Install only the listed peers; build. No "Cannot find module @radix-ui/…". | ☐ |
| **AC-17** | SHOULD | The matrix was accurate — no guesswork (grepping `dist` for imports) required. | Tester confirms the table covered every component used. | ☐ |

## G. Popover — confirm intent *(BUG-4, open question)*

| ID | Pri | Criterion | How to verify | Result |
|----|-----|-----------|---------------|--------|
| **AC-18** | SHOULD | Popover/tooltip surfaces match the **intended** design. | Render a popover in **light** mode — currently **black bg / white text** by design. Pass if intended; **flag** if a light popover was expected. | ☐ |

## H. Docs consistency *(Report §1, §3.1, §3.5)*

| ID | Pri | Criterion | How to verify | Result |
|----|-----|-----------|---------------|--------|
| **AC-19** | MUST | kuat-react & kuat-core READMEs show **CSS-first only** — no contradictory preset path. | Read both shipped READMEs. | ☐ |
| **AC-20** | SHOULD | The kuat-react **skill** matches (CSS-first; `FieldLabel`/`Input`, not raw `<label>/<input>`). | If the agent used the skill, confirm it didn't re-introduce the preset. *(Known gap: skill lives in kuat-agent-docs — flag if stale.)* | ☐ |

## I. Regression — "what worked well" must still hold

| ID | Pri | Criterion | Result |
|----|-----|-----------|--------|
| **AC-21** | MUST | Pre-compiled `@equal-experts/kuat-react/styles` works with no Tailwind scanning of `node_modules`. | ☐ |
| **AC-22** | MUST | `Field` / `FieldLabel` / `Input` composition renders correctly. | ☐ |
| **AC-23** | MUST | One-class theme switch (`.dark`) re-themes the whole app. | ☐ |
| **AC-24** | SHOULD | Typed `*_VARIANTS` arrays and `variant`/`size`/`color` props give autocomplete. | ☐ |

---

## J. Vue variant

To run the Vue path, build a fresh **Vue 3 + Vite + Tailwind v4** app and apply
these substitutions; all criteria above otherwise apply unchanged.

| Aspect | React | Vue |
|--------|-------|-----|
| Component package | `@equal-experts/kuat-react` | `@equal-experts/kuat-vue` |
| Styles import | `import '@equal-experts/kuat-react/styles'` | `import '@equal-experts/kuat-vue/styles'` |
| Field label attr (AC-22) | `<FieldLabel htmlFor="…">` | `<FieldLabel for="…">` |
| Peers (AC-16) | `@radix-ui/react-*` + `lucide-react` | `radix-vue` / `reka-ui` + `lucide-vue-next` (`vue-sonner` is bundled) |
| tsc (AC-12) | `tsc --noEmit` | `vue-tsc --noEmit` |

The core wiring (AC-1…AC-10, AC-14, AC-19) is identical — both packages consume
the same `@equal-experts/kuat-core` tokens via the CSS-first `@theme` path.

---

## Sign-off

- **PASS** only if **every `MUST`** passes: AC-1…AC-10, AC-12, AC-13, AC-14,
  AC-16, AC-19, AC-21, AC-22, AC-23.
- Record all `SHOULD` warnings and the **AC-18** popover decision.
- For each failure capture: AC ID, computed values / screenshot, and whether a
  doc deviation was required (a deviation = **AC-1 fail** even if the feature works).

### Calibration notes (expected, not regressions)

- **AC-18 (popover)** and **AC-20 (external skill)** are the two known-open items
  — they may surface as flags rather than clean passes.
- Primary/secondary **button** text (`bg-primary`/`bg-secondary` + foreground)
  sits at ~3.1:1 — AA for *large text / UI*, not body copy. If contrast is
  checked, that band is **expected and acceptable** for buttons; it's an inherent
  property of the brand colours, not a defect.
