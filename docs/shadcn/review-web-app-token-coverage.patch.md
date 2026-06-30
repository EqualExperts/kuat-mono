# Patch: token-coverage audit step for `review-web-app` (kuat-agent-rules)

**Target repo:** `kuat-agent-rules` · **Target file:** `skills/review-web-app/SKILL.md`
**Branch there:** `feature/shadcn-token-contract` (separate PR, per-repo).
**Why this lives here:** in `kuat-mono`, `kuat-agent-rules` exists only as the gitignored
`external/` synced cache — it can't be branched/PR'd from. This file is the ready-to-apply
content; paste it into the skill in its own repo. It pairs with the Step-1 work that just
landed in `kuat-mono` (the generated `token-contract.json` + `shadcn:audit` script).

---

## Section to add to `review-web-app/SKILL.md`

Add under the skill's existing component/token review steps. Keep it descriptive/activity-style —
the prose **guides**; the `shadcn:audit` script is the programmatic **backstop** that enforces.

> ### Token-coverage audit — added shadcn / third-party items
>
> Kuat's own components and blocks ship via the npm package (`@equal-experts/kuat-react`,
> `kuat-core`) — that's the source of truth. The `shadcn`/`npx` add path is therefore only ever
> used for **non-Kuat gap items** Kuat doesn't ship. Whenever a review covers such an added item,
> run the token-coverage audit so it **inherits kuat-core tokens** and never silently ships on a
> shadcn default.
>
> **1. Enumerate** the tokens the item consumes: raw `var(--x)` refs and the Tailwind colour
> utilities (`bg-*`, `text-*`, `border-*`, `ring-*`, `fill-*`) that map to a `--color-*`.
>
> **2. Diff** them against the shipped contract,
> [`@equal-experts/kuat-core/token-contract.json`](https://www.npmjs.com/package/@equal-experts/kuat-core)
> — the generated, drift-checked list of every shadcn semantic token Kuat defines in **light and
> dark**, the `--color-*` utility each backs, and the full authored kuat-core vocabulary.
>
> **3. Report** per token:
> - ✅ **inherited** — Kuat defines it (semantic in light+dark, or any authored kuat-core variable / brand scale).
> - ⚠️ **missing in Kuat** — Kuat doesn't define it; on shadcn defaults it would diverge from the brand.
> - ⚠️ **light-only (dark gap)** — semantic token defined in light only, no `.dark` value.
>
> Add a **WCAG contrast note** for any foreground/surface pair the item uses together
> (e.g. `primary` + `primary-foreground`), in both light and dark.
>
> **4. Resolve** — the rule is fixed: a missing or dark-gap token is **added to kuat-core**
> (`packages/kuat-core/src/variables.css`, light **and** dark) so *every* consumer inherits it,
> then the contract regenerates (`pnpm tokens:contract:generate`). This is a token contribution
> (`proposing-a-token-change` + the drift gate). Only when adding to kuat-core is genuinely wrong
> does the item get an **explicit local mapping** — **never** leave the token on a shadcn default.
>
> **Programmatic backstop.** The same enumerate→diff→report logic runs as a zero-token CI check in
> `kuat-mono`: `pnpm shadcn:audit -- <path>` (exits non-zero on any missing or dark-gap token).
> A consumer repo can run it against `node_modules/@equal-experts/kuat-core/token-contract.json`.
> _(An editor-time ESLint rule wrapping this is tracked as R4 — still an open decision; the script
> is the seam.)_

---

## Add-time feedback record (channel deferred)

When the audit finds a **gap item** (a non-Kuat item added) or a **missing token**, the skill emits a
structured **feedback record** to a predictable local file so it can later be routed to the Kuat DS
team. **Do not wire a specific channel** — Ed deferred that decision. Just write the record and leave a
one-line pointer.

**Location:** `.kuat/feedback/<timestamp>-<item>.json` in the consumer repo.

**Schema:**

```json
{
  "kind": "token-coverage",
  "item": "shadcn:dialog",
  "itemSource": "shadcn",
  "tokensMissing": ["--frobnicate", "--frobnicate-foreground"],
  "tokensDarkGap": [],
  "resolution": "added-to-kuat-core | local-mapping | unresolved",
  "resolutionDetail": "e.g. PR equalexperts/kuat-mono#NN adds --frobnicate light+dark",
  "kuatCoreVersion": "0.14.0-beta.1"
}
```

After writing it, surface a one-line pointer in the review output:

> 📣 **Notify the Kuat DS team:** consumer added `shadcn:dialog` (not in Kuat); token `--frobnicate`
> was missing → resolved by adding to kuat-core. Recorded at `.kuat/feedback/…json`.

The aggregated component auditor (separate workstream) ranks gap-item usage across EE sites; these
records are the per-add signal that feeds the same promotion decision.
