# Carousel

Kuat Carousel is a **block** that provides a horizontal scrolling carousel with prescribed layout and styling from the design system. It is built on [Embla Carousel](https://www.embla-carousel.com/) and supports touch/swipe and keyboard-friendly navigation.

---

## When to use

- **Testimonials** – Many testimonials, limited space (see [marketing-pages.md](../scenarios/marketing-pages.md): “Carousel | Many testimonials, limited space”).
- **Image galleries** – Browsing multiple images or cards in a row.
- **Content that benefits from horizontal scroll** – Any set of items where 1, 2, or 3 visible slides and top-right navigation match the design.

For standard UI that does not need this layout, use other Kuat or shadcn components.

---

## API summary

| Concern | Behaviour |
|--------|-----------|
| **Visible items** | `basis`: `1`, `2`, or `3` (default `1`). |
| **Navigation** | Previous/Next buttons are fixed in the **top-right** of the carousel (not centre-sides). |
| **Slide styling** | Slides use Kuat interactive radius (`rounded-[6px]`) and a light shadow. |
| **Nav buttons** | EE blue (primary) background, white icon. |
| **Embla plugins** | Pass `plugins` directly, matching Embla's plugin array usage. |
| **Embla events** | Pass `events` as an object keyed by Embla event names (`select`, `reInit`, etc). |

Embla options (e.g. `align: "start"`, `loop`) can be passed through for behaviour; layout and styling are fixed by the design system.

---

## Options (`opts`) for positioning and paging

Kuat forwards `opts` to Embla, so consumers can control slide positioning and paging behaviour without changing Kuat styling.

### Most useful options

| Option | What it changes | Typical use |
|--------|------------------|-------------|
| `align` | Position of the active snap in the viewport (`"start"`, `"center"`, `"end"`). | Use `"start"` for left-aligned card rails; `"center"` for spotlight/carousel hero behaviour. |
| `slidesToScroll` | Number of slides advanced per next/previous action. | Set to `basis` for page-like navigation. |
| `containScroll` | How snaps are constrained at the edges (for example `"trimSnaps"`). | Use `"trimSnaps"` to avoid overscrolling near the end. |
| `loop` | Whether the carousel wraps around from end to start. | Use for circular galleries; avoid for ordered/step-like content. |

### Recommended presets

| Pattern | Suggested options |
|--------|--------------------|
| Left-aligned card rail | `{ align: "start" }` |
| Left-aligned paged rail | `{ align: "start", slidesToScroll: 2, containScroll: "trimSnaps" }` |
| Centered spotlight carousel | `{ align: "center" }` |

### React example (left-aligned paging)

```tsx
<Carousel
  basis={2}
  opts={{ align: "start", slidesToScroll: 2, containScroll: "trimSnaps" }}
>
  <CarouselContent>
    <CarouselItem>{/* ... */}</CarouselItem>
    <CarouselItem>{/* ... */}</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

### Vue example (left-aligned paging)

```vue
<Carousel
  :basis="2"
  :opts="{ align: 'start', slidesToScroll: 2, containScroll: 'trimSnaps' }"
>
  <template #content>
    <CarouselContent>
      <CarouselItem><!-- ... --></CarouselItem>
      <CarouselItem><!-- ... --></CarouselItem>
    </CarouselContent>
  </template>
  <template #controls>
    <CarouselPrevious />
    <CarouselNext />
  </template>
</Carousel>
```

See Storybook (Components / Carousel) stories `AlignCenter`, `AlignStart`, and `PagedStartAligned` for live behaviour examples.

---

## Packages

- **React:** `@equal-experts/kuat-react` – `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext`.
- **Vue:** `@equal-experts/kuat-vue` – same names. Vue uses named slots: `#content` for the carousel content, `#controls` for Previous/Next.

Legacy `KuatCarousel*` exports remain available as compatibility aliases. `KuatCarousel` maps `slidesPerView` to `basis`.

See Storybook (Components / Carousel) for live examples and code.
