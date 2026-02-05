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
| **Slides per view** | `slidesPerView`: `1`, `2`, or `3` (default `1`). |
| **Navigation** | Previous/Next buttons are fixed in the **top-right** of the carousel (not centre-sides). |
| **Slide styling** | Slides use Kuat interactive radius (`rounded-[6px]`) and a light shadow. |
| **Nav buttons** | EE blue (primary) background, white icon. |

Embla options (e.g. `align: "start"`, `loop`) can be passed through for behaviour; layout and styling are fixed by the design system.

---

## Packages

- **React:** `@equal-experts/kuat-react` – `KuatCarousel`, `KuatCarouselContent`, `KuatCarouselItem`, `KuatCarouselPrevious`, `KuatCarouselNext`.
- **Vue:** `@equal-experts/kuat-vue` – same names. Vue uses named slots: `#content` for the carousel content, `#controls` for Previous/Next.

See Storybook (Kuat Blocks / KuatCarousel) for live examples and code.
