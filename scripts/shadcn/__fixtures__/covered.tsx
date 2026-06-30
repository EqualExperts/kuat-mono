// Fixture: a (hypothetical) added component that resolves entirely against
// kuat-core tokens. `pnpm shadcn:audit -- scripts/shadcn/__fixtures__/covered.tsx`
// should pass (exit 0).
export function Covered() {
  return (
    <div
      className="bg-card text-card-foreground border-border ring-ring"
      style={{ outlineColor: "var(--ee-blue-500)" }}
    >
      <button className="bg-primary text-primary-foreground hover:bg-primary/90">Save</button>
      <p className="text-muted-foreground">Inherited from kuat-core.</p>
    </div>
  );
}
