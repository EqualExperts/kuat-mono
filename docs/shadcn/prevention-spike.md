# Prevention spike — stop `shadcn init` from clobbering the Kuat theme

**Status: RESOLVED (2026-07-01).** New-app test confirmed the redirect is honoured by the shadcn CLI
(it wrote 100% of its theme into the sacrificial file, never touched the entry) — but the app still
rendered grey. Root cause: **CSS cascade layers.** kuat-core's semantic tokens were wrapped in
`@layer base`; shadcn's generated `:root` is unlayered; per spec **unlayered always beats layered**
regardless of import order, so "import kuat-core last" could never win. Fixed in kuat-core (this repo)
by **unlayering the semantic `:root`/`.dark` block** in `packages/kuat-core/src/variables.css` (ships in
`0.14.0-beta.3`). With both sides unlayered, source order decides and the preset's "import kuat-core
last" wins. Companion detection gate: `shadcn:audit-theme`.

## The problem (from the beta.2 consumer test)

`npx shadcn init` appends its own `:root`/`.dark` token blocks to the global stylesheet **after** the
kuat-core import. At equal specificity the later declaration wins, so every semantic token silently
resolves to shadcn's neutral theme — `--primary` renders grey, not EE Blue — while name-coverage stays
green. Write-locking the file (`chmod 444`) is not a durable fix: git doesn't preserve the bit across
clones, it needs a re-apply hook, and it blocks legitimate edits.

## The mechanism: make Kuat win the cascade by construction

Two levers, both in the `adopt-kuat` preset — no file locking:

1. **Redirect shadcn's write target.** `components.json` → `tailwind.css: "src/shadcn.css"` — a
   *sacrificial* file, not the entry that imports kuat-core.
2. **Import kuat-core last.** The entry imports `src/shadcn.css` **before**
   `@equal-experts/kuat-core/variables.css`, so kuat-core is the last `:root`/`.dark` declared and wins.

Together: anything `shadcn init`/`add` writes lands in `shadcn.css`, which is imported before kuat-core,
so it's inert. See the reference files in this folder: [`components.json`](adopt-kuat-preset/components.json),
[`index.css`](adopt-kuat-preset/index.css), [`shadcn.css`](adopt-kuat-preset/shadcn.css).

Also set `cssVariables: true` so shadcn components reference the token *names* (`--primary`, …) and thus
inherit whatever kuat-core resolves them to.

## Verified in-repo (deterministic)

`shadcn:audit-theme --entry` resolves `@import`s in true document order, so it proves the cascade:

| Fixture | kuat-core import position | Result |
|--|--|--|
| [`entry-prevention/`](../../scripts/shadcn/__fixtures__/entry-prevention/) | **last** (after shadcn.css) | ✓ all 32 tokens intact — exit 0 |
| [`entry-clobber/`](../../scripts/shadcn/__fixtures__/entry-clobber/) | first (shadcn block appended after) | ✗ overrides flagged — exit 1 |

So the CSS-cascade half is settled: **import kuat-core last ⇒ Kuat wins**, regardless of what shadcn
wrote into the earlier file.

## What the new-app test proves (the remaining unknown)

The only thing in-repo fixtures can't settle is shadcn's **CLI behaviour**: given a pre-placed
`components.json` with `css: "src/shadcn.css"`, does `shadcn init` actually write its theme *there*, or
does it ignore the config and hijack/append to the entry (which would defeat the import-order defense)?
That's what the new app answers — see the test procedure the spike ships with. Success =
`shadcn init`/`add` writes to `src/shadcn.css`, the entry still imports kuat-core last, and the browser's
computed `--primary` on `:root` is Kuat's EE Blue, not shadcn grey.

If shadcn ignores the `css` redirect, the fallback is post-init cleanup (strip the block) + the
`shadcn:audit-theme` gate — but the redirect, if honoured, is the clean prevention.
