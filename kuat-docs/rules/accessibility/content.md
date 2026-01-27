# Content Accessibility

Writing rules ensuring content is understandable by all users.

---

## Overview

Accessible content can be understood by everyone—including people with cognitive disabilities, non-native English speakers, and those using assistive technologies.

**Key principle:** Write content that users can understand the first time they read or hear it.

---

## Plain Language

### Why Plain Language Matters

- Most people, even professionals, prefer simple, easy-to-understand content
- Plain language allows faster comprehension
- Non-native English speakers benefit significantly
- Screen readers work better with clear, simple text

### Guidelines

| Do | Don't |
|----|-------|
| Use short sentences | Write long, complex sentences |
| Use active voice | Use passive voice |
| Use common words | Use jargon or technical terms without explanation |
| Be direct and specific | Be vague or ambiguous |
| Use concrete examples | Use abstract concepts without illustration |

### Readability Targets

- Aim for reading level that most users can understand first time
- Test with [Hemingway Editor](https://hemingwayapp.com/) or [WebFX Readability](https://www.webfx.com/tools/read-able/)
- Break complex concepts into digestible chunks

---

## Content Structure

### Headings

- **Descriptive headings** that accurately describe the content below
- **Hierarchical structure** - H1 → H2 → H3 (never skip levels)
- **One H1 per page** - the main page title
- Headings help screen reader users navigate and scan content

### Paragraphs

- **Keep paragraphs short** - 3-4 sentences maximum
- **One idea per paragraph**
- **Avoid walls of text** - dense blocks are hard to read

### Lists

- Use bullet points for unordered items
- Use numbered lists for sequential steps
- Keep list items concise
- Use **semantic list elements** (`<ul>`, `<ol>`), not manual bullets

### Reading Order

- Content should make sense when read linearly
- Don't rely on visual layout to convey meaning
- Test by reading content without styles

---

## Alternative Text

### When Alt Text is Required

| Image Type | Alt Text Required | Approach |
|------------|-------------------|----------|
| Informative images | Yes | Describe content and purpose |
| Decorative images | No | Use `alt=""` |
| Functional images (buttons, links) | Yes | Describe the action |
| Charts and diagrams | Yes | Summarize data, link to full data |
| Images with text | Yes | Include all text from image |

### Writing Good Alt Text

| Do | Don't |
|----|-------|
| Describe content and purpose | Start with "Image of..." or "Picture of..." |
| Be concise (under 125 characters) | Write lengthy descriptions |
| Include text that appears in image | Describe visual appearance only |
| Provide context for charts | Just say "Chart" or "Graph" |

### Examples

| Context | Bad Alt Text | Good Alt Text |
|---------|--------------|---------------|
| Company logo | "Logo" | "Equal Experts" |
| Chart | "Bar chart" | "Monthly sales chart showing 40% growth in Q4" |
| Product photo | "Image of laptop" | "MacBook Pro with Kuat dashboard displayed" |
| Icon button | "Icon" | "Search" |

### Complex Images

For complex diagrams or charts:

1. Provide brief alt text summarizing the image
2. Include detailed description in surrounding text or linked page
3. For data charts, provide accessible data table alternative

---

## Links and Buttons

### Link Text

Links should tell users where they're going and why.

| Bad | Good |
|-----|------|
| "Click here" | "View our pricing plans" |
| "Read more" | "Read more about accessibility guidelines" |
| "Learn more" | "Learn more about our consulting services" |
| URL as link text | Descriptive text for the destination |

### Link Visibility

- Links must be visually distinct from regular text
- Use **underline** plus colour change
- Don't rely on colour alone

### Button Labels

- Describe the action clearly
- Use verbs: "Submit", "Save", "Delete", "Cancel"
- Be specific: "Save changes" not just "Save"
- Match user expectation to actual outcome

---

## Abbreviations and Acronyms

### First Use

Always spell out abbreviations on first use:

- "Artificial Intelligence (AI)" - then use "AI" thereafter
- "Application Programming Interface (API)"
- "User Experience (UX)"

### Screen Reader Considerations

- Use capitals for abbreviations: `HMRC` not `Hmrc`
- Screen readers may mispronounce lowercase abbreviations as words
- Consider using `<abbr>` element with title attribute

---

## Text Formatting

### Capitalisation

| Do | Don't |
|----|-------|
| Use sentence case | USE ALL CAPS FOR EMPHASIS |
| Capitalise proper nouns | use alternating caps (LiKe ThIs) |
| Use bold for emphasis | Rely on caps for emphasis |

**Why:** Screen readers cannot convey the context of ALL CAPS. Alternating caps is read as gibberish.

### Alignment

- **Left-align** body text (default and most readable)
- **Avoid justified** text - creates uneven word spacing
- Centre-align only for short headings or CTAs

### Semantic Formatting

- Use `<strong>` for important text, not just bold styling
- Use `<em>` for emphasis, not just italic styling
- Use semantic lists, not manual bullet characters (•, -, *)

---

## Inclusive Language

### Guidelines

- Use language that is respectful and free of bias
- Avoid exclusionary terms or outdated phrases
- Consider diverse audiences and perspectives
- When in doubt, research current preferred terminology

### Person-First Language

- "Person with a disability" not "disabled person"
- "User who is blind" not "blind user"
- Focus on the person, not the condition

---

## Multimedia Content

### Video

- **Captions required** - Essential for deaf/hard-of-hearing users
- 85% of social media videos are watched without sound
- Captions can be burned-in or added via platform tools

### Audio

- **Transcripts required** - Full text alternative for audio content
- Helps users who can't listen (noisy environment, preference)
- Benefits SEO and searchability

### Auto-Playing Content

- Provide pause/stop controls
- Never auto-play audio without user consent
- Limit duration of auto-playing visual content

---

## Related Documentation

- [Accessibility Overview](./README.md)
- [Design Accessibility](./design.md) - Visual guidelines
- [Technical Accessibility](./technical.md) - Implementation details
- [Content Foundations](../content/foundations.md) - Voice and tone
