# Skill fixes for shadcn integration — handoff to kuat-agent-rules / kuat-claude-plugin

**From:** kuat-mono (shadcn Step 1 + prevention work). **Date:** 2026-07-01.
**Depends on:** `@equal-experts/kuat-core@0.14.0-beta.3` (published to the npm `beta` tag).
**Why now:** a consumer test proved the current setup guidance ships a broken (grey) theme when
shadcn is added. The kuat-core side is fixed in beta.3; the **skills still need updating** or they'll
keep steering consumers into the failure.

This report is self-contained. Snippets are ready to paste. Two skills need changes, likely in two
repos — do both; the setup fix is the urgent one.

---

## Background (what changed in kuat-core, and the two audits)

- **beta.3 fix — cascade layers.** kuat-core's semantic `:root`/`.dark` tokens used to sit in
  `@layer base`. shadcn's generated `:root` is **unlayered**, and per the CSS spec **unlayered always
  beats layered regardless of import order** — so shadcn silently won and the app rendered its grey
  theme. beta.3 **unlayers** kuat-core's semantic tokens, so now source order decides and
  *importing kuat-core last wins*. **Everything below requires kuat-core ≥ 0.14.0-beta.3** — on
  earlier versions, "import last" does nothing.
- **token-contract.json** ships in kuat-core: the shadcn semantic tokens Kuat defines in light+dark,
  the `--color-*` each backs, and the full authored vocabulary.
- **Two audits** (currently kuat-mono scripts — see "How skills invoke the audits" below):
  - **coverage** (`shadcn:audit`) — token *names*: does an added component use anything Kuat doesn't define.
  - **theme integrity** (`shadcn:audit-theme`) — token *values*: does the app's global CSS still
    resolve to Kuat's theme, or did something shadow it.

---

## Fix 1 — first-time-setup skill (`kuat-react`): stop the clobber  ⟵ URGENT

**Where:** the `kuat-react` skill's "First-time setup" (reported as `skills/kuat-react/SKILL.md` Step 4,
in `kuat-claude-plugin`).

**What's wrong today (from the consumer test):**
- It runs `npx shadcn init` directly against the real global stylesheet, with **no sacrificial-file
  redirect**.
- It imports `kuat-core` **before** Tailwind/shadcn rather than after.
- Result: `shadcn init` appends its `:root`/`.dark` after (or into) the entry and the app renders grey.

**The fix — three parts:**

**(a) Require kuat-core ≥ 0.14.0-beta.3.** State it; the setup does not work on older versions.

**(b) Global stylesheet with kuat-core imported LAST** (`src/index.css`):
```css
@import "@equal-experts/kuat-core/fonts.css";
@import "tailwindcss";
@import "./shadcn.css";                            /* shadcn's write target — imported first */
@import "@equal-experts/kuat-core/variables.css";  /* LAST → Kuat wins the cascade */
@import "@equal-experts/kuat-react/styles";
```
Create `src/shadcn.css` as an empty placeholder (comment only).

**(c) Ship a `components.json` that redirects shadcn's write target** to the sacrificial file, so if
`shadcn init`/`add` ever writes a theme it lands in `src/shadcn.css` (imported before kuat-core, so it's
inert):
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york", "rsc": false, "tsx": true,
  "tailwind": { "config": "", "css": "src/shadcn.css", "baseColor": "neutral", "cssVariables": true, "prefix": "" },
  "aliases": { "components": "@/components", "ui": "@/components/ui", "utils": "@/lib/utils", "lib": "@/lib", "hooks": "@/hooks" },
  "iconLibrary": "lucide"
}
```

**Guidance to add:**
- **Prefer `shadcn add` over `shadcn init`.** With `components.json` pre-placed, gap items only need
  `add` (which doesn't rewrite the theme). `init` is the clobbering command.
- **Warn:** *"`shadcn init` writes a `:root`/`.dark` theme block. With this setup it lands in the
  sacrificial `src/shadcn.css` (imported before kuat-core) and is harmless. Never import `shadcn.css`
  after `variables.css`, and never let shadcn's block land in the entry."*

**CLI gotchas observed (so the skill's scripted steps don't hang):**
- `npx shadcn@latest init -y` does **not** skip the "components.json already exists — overwrite?"
  prompt (`-y` only skips later prompts). Feed input, or delete/re-create `components.json`.
- Current `@latest` also prompts for a component library (Radix/Base) and a design preset
  (Nova/Vega/…) — not just "base color." Account for these if scripting.

---

## Fix 2 — `review-web-app` skill: add the token audits

**Where:** `kuat-agent-rules` `skills/review-web-app/SKILL.md`. Add a token-audit step for any added
non-Kuat shadcn/third-party item. Keep it descriptive/activity-style; the scripts enforce.

**Two checks, both against the shipped contract** (`@equal-experts/kuat-core/token-contract.json`):

1. **Coverage (names).** Enumerate the tokens the item consumes — raw `var(--x)` and Tailwind
   `bg-/text-/border-/ring-/fill-*` utilities — and diff against the contract. Report ✅ inherited /
   ⚠️ missing in Kuat / ⚠️ light-only (dark gap), plus a WCAG contrast note on fg/bg pairs.
2. **Theme integrity (values).** Resolve the app's effective `:root`/`.dark` (kuat-core baseline +
   the consumer's own blocks, in import order) and diff each semantic token against the contract's
   authored value **by resolved colour**. Report ✅ intact / ⚠️ OVERRIDDEN. This catches the
   `shadcn init` clobber that coverage alone misses.

**Resolution rule (fixed):** a missing/dark-gap/overridden token is resolved by **adding it to
kuat-core** (`variables.css`, light **and** dark) so every consumer inherits it — then the contract
regenerates. Only when adding to kuat-core is genuinely wrong does the item get an explicit local
mapping. **Never leave a token on a shadcn default.**

**Feedback record (channel deferred).** On a gap item or missing token, write a structured record to
`.kuat/feedback/<timestamp>-<item>.json` — `{ kind, item, itemSource, tokensMissing[], tokensDarkGap[],
resolution, resolutionDetail, kuatCoreVersion }` — and surface a one-line "notify the Kuat DS team"
pointer. Don't wire a specific channel yet.

---

## How skills invoke the audits (open packaging decision)

The audit logic currently lives as **kuat-mono scripts** (`scripts/shadcn/audit-coverage.mjs`,
`audit-theme.mjs`) — **not published**. So skills can't yet call `npx kuat-audit`. Options, to decide
with kuat-mono:
- **Short term:** the skill guides the activity (enumerate → diff → resolve) and points at the shipped
  `token-contract.json`; a consumer can drop in a small standalone script (kuat-mono can provide one).
- **Durable:** publish the audits as kuat-core bins (`kuat-audit`, `kuat-audit-theme`) or a dedicated
  `@equal-experts/kuat-audit` package, then the skill just runs `npx …`. (This is also the R4 / CI
  question.)

Until then, treat the audits as the *reviewer's* backstop, not an install-time gate.

---

## Verification (do this after the skill edits, in a fresh app)

1. Scaffold Vite+React+TS, install `@equal-experts/kuat-core@beta @equal-experts/kuat-react@beta`
   (confirm `token-contract.json` version = 0.14.0-beta.3).
2. Apply the Fix-1 `index.css` + `components.json` + empty `shadcn.css`.
3. Run `npx shadcn@latest init` then `npx shadcn@latest add dialog`.
4. Confirm shadcn wrote its theme into `src/shadcn.css` (not the entry), and the entry still imports
   kuat-core last.
5. **Definitive check** in the browser console:
   `getComputedStyle(document.documentElement).getPropertyValue('--primary')`
   → must be **`oklch(0.645 0.163 237.5)`** (EE Blue), not `oklch(0.205 0 0)` (shadcn grey).

If step 5 shows EE Blue, the setup + kuat-core beta.3 fix are working end to end.
