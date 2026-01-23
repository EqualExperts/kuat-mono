# Test Consumer React App

This is a minimal verification app that demonstrates the recommended Kuat architecture:

- **kuat-core** for design tokens (CSS variables, Tailwind preset)
- **shadcn components** installed directly (Button)
- **kuat-react** for custom components (ButtonGroup)

## Purpose

This app verifies that:

1. kuat-core design tokens load correctly
2. shadcn components are themed by kuat-core CSS variables
3. Kuat custom components (ButtonGroup) work alongside shadcn components
4. Dark mode works correctly
5. Typography (Lexend, Lora, JetBrains Mono) loads correctly

## Architecture Demonstrated

```
┌─────────────────────────────────────────────────────┐
│  This App (test-consumer-react)                     │
├─────────────────────────────────────────────────────┤
│  Kuat Components (ButtonGroup from kuat-react)      │
├─────────────────────────────────────────────────────┤
│  shadcn Button (src/components/ui/button.tsx)       │
├─────────────────────────────────────────────────────┤
│  kuat-core (design tokens via CSS variables)        │
└─────────────────────────────────────────────────────┘
```

## Running

```bash
# From monorepo root
pnpm install
pnpm --filter test-consumer-react dev
```

Open http://localhost:5173

## Key Files

| File | Purpose |
|------|---------|
| `src/main.tsx` | Imports kuat-core CSS variables |
| `src/components/ui/button.tsx` | shadcn Button (simulates direct installation) |
| `src/App.tsx` | Demo using both shadcn and Kuat components |
| `tailwind.config.ts` | Uses kuatPreset from kuat-core |

## What to Verify

1. **Colors**: Primary button should be EE Blue (#0066CC-ish)
2. **Typography**: Body text uses Lexend, code uses JetBrains Mono
3. **ButtonGroup**: Groups buttons with seamless borders
4. **Dark Mode**: Toggle changes all colors appropriately
