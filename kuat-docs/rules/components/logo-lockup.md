# KuatLogoLockup

The **EE Logo Lockup** block combines the Equal Experts logo with a service or demo title. Use it in headers, hero sections, or demo/project attribution.

---

## When to Use

| Use | When |
|-----|------|
| **Service** | App or product header: EE branding + service name (e.g. "Timesheets", "Dashboard"). |
| **Demo** | Demo or project attribution: primary title with "A demo by" and smaller EE logo. |

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|--------------|
| `title` | `string` | required | Service name (Service use) or primary title (Demo use). |
| `use` | `'service' \| 'demo'` | `'service'` | Service: logo first + name. Demo: title primary, "A demo by" + small logo. |
| `mode` | `'light' \| 'dark'` | `'light'` | Visual theme (text/background treatment). |
| `forceDark` | `boolean` | `false` | When true, force dark styling (e.g. when the lockup sits on a dark background). |

There is **no layout prop**. Service use has a single **responsive** layout: horizontal (logo, separator, name) on larger container widths, vertical (logo above name) on smaller.

---

## Mode and forceDark

- **Light mode:** Dark grey text; full EE wordmark. Use on light backgrounds.
- **Dark mode:** Light/white text; in **Service** use the EE **icon only** (no wordmark). Use on dark backgrounds (Tech Blue, slate, etc.).
- **forceDark:** Set `forceDark={true}` when the lockup is placed on a dark background but the page theme is light (e.g. a dark hero section). This forces dark styling without changing `mode`.

---

## Responsive Behavior (Service)

- **Larger container width:** Horizontal layout — logo (or icon in dark), vertical separator, then service name.
- **Smaller container width:** Vertical layout — logo above service name.

The breakpoint is driven by **container size** (container queries) so the lockup adapts to its container (e.g. narrow sidebar vs main content), with a viewport-based fallback where container queries are not supported.

---

## Import

**React:**

```tsx
import { KuatLogoLockup } from "@equal-experts/kuat-react"
```

**Vue:**

```vue
<script setup>
import { KuatLogoLockup } from "@equal-experts/kuat-vue"
</script>
```

Ensure design tokens are loaded (e.g. `@equal-experts/kuat-core/variables.css`).

---

## Examples

**Service (light):**

```tsx
<KuatLogoLockup title="My Service" use="service" mode="light" />
```

**Service (dark, on dark background):**

```tsx
<div style={{ background: "#0f172a", padding: "1rem" }}>
  <KuatLogoLockup title="My Service" use="service" mode="dark" />
</div>
```

**Demo:**

```tsx
<KuatLogoLockup title="Security and AI Research" use="demo" mode="light" />
```

**Force dark on dark section:**

```tsx
<div className="bg-slate-800 p-4">
  <KuatLogoLockup title="My Service" use="service" mode="light" forceDark />
</div>
```
