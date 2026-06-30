// Fixture: a (hypothetical) added component that references tokens kuat-core does
// NOT define via raw `var()` — i.e. it would silently fall back to a shadcn /
// third-party default instead of a Kuat token. The audit
// (`pnpm shadcn:audit -- scripts/shadcn/__fixtures__/uncovered.tsx`) should FAIL
// (exit 1) on `--frobnicate` and `--frobnicate-foreground`.
//
// `text-card-foreground` and `var(--ee-blue-500)` are here as a mix: they ARE
// covered, so the report shows them ✅ alongside the ⚠️ misses.
export function Uncovered() {
  return (
    <div
      className="text-card-foreground"
      style={{ background: "var(--frobnicate)", color: "var(--frobnicate-foreground)", outlineColor: "var(--ee-blue-500)" }}
    >
      Not a Kuat token.
    </div>
  );
}
