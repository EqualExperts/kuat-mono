import { useState } from "react";

// shadcn component installed directly (themed by kuat-core)
import { Button } from "@/components/ui/button";

// Kuat custom component (not available in shadcn)
import { ButtonGroup } from "@equal-experts/kuat-react";

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto py-12 px-4">
          <header className="mb-12">
            <h1 className="text-4xl font-bold mb-2">
              Kuat Test Consumer App
            </h1>
            <p className="text-muted-foreground">
              Demonstrating kuat-core + shadcn + kuat-react integration
            </p>
          </header>

          {/* Theme Toggle */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Theme</h2>
            <Button
              variant="outline"
              onClick={() => setIsDark(!isDark)}
            >
              Toggle {isDark ? "Light" : "Dark"} Mode
            </Button>
          </section>

          {/* Design Tokens Verification */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              Design Tokens (from kuat-core)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-primary text-primary-foreground rounded-lg">
                Primary (EE Blue)
              </div>
              <div className="p-4 bg-secondary text-secondary-foreground rounded-lg">
                Secondary (Teal)
              </div>
              <div className="p-4 bg-accent text-accent-foreground rounded-lg">
                Accent
              </div>
              <div className="p-4 bg-destructive text-destructive-foreground rounded-lg">
                Destructive
              </div>
            </div>
          </section>

          {/* shadcn Button (installed directly) */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              shadcn Button (installed directly)
            </h2>
            <p className="text-muted-foreground mb-4">
              These buttons are from the local shadcn installation, themed by kuat-core CSS variables.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </section>

          {/* Kuat ButtonGroup (custom component) */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              Kuat ButtonGroup (custom component)
            </h2>
            <p className="text-muted-foreground mb-4">
              ButtonGroup is a Kuat-specific component not available in shadcn.
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Horizontal:</p>
                <ButtonGroup>
                  <Button variant="outline">Left</Button>
                  <Button variant="outline">Center</Button>
                  <Button variant="outline">Right</Button>
                </ButtonGroup>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Vertical:</p>
                <ButtonGroup orientation="vertical">
                  <Button variant="outline">Top</Button>
                  <Button variant="outline">Middle</Button>
                  <Button variant="outline">Bottom</Button>
                </ButtonGroup>
              </div>
            </div>
          </section>

          {/* Typography Verification */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              Typography (from kuat-core)
            </h2>
            <div className="space-y-4">
              <p className="font-sans">
                Sans (Lexend): The quick brown fox jumps over the lazy dog.
              </p>
              <p className="font-serif">
                Serif (Lora): The quick brown fox jumps over the lazy dog.
              </p>
              <p className="font-mono">
                Mono (JetBrains Mono): const greeting = "Hello, World!";
              </p>
            </div>
          </section>

          {/* Verification Summary */}
          <section className="p-6 bg-card border border-border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Verification Checklist</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                kuat-core CSS variables loaded (colors working)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                shadcn Button themed correctly (EE Blue primary)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Kuat ButtonGroup renders (custom component)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Typography uses Lexend, Lora, JetBrains Mono
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Dark mode toggle works
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
