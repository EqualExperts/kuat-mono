# Kuat Design System Content Guide

**Version:** 1.0 | **Last Updated:** December 2024

---

## Welcome

This is the master guide to creating content for the Kuat Design System. Our content guidelines are split into three specialized documents to make them easier to use and maintain.

---

## Getting Started

### 🆕 New to Content Creation?

**Start here:**

1. **Read** [`content-foundations.md`](./content-foundations.md) - Universal principles that apply to ALL content
2. **Choose your specialization:**
   - Creating marketing, sales, or knowledge content? → [`content-marketing-sales.md`](./content-marketing-sales.md)
   - Writing product UI copy or UX content? → [`content-product-ux.md`](./content-product-ux.md)

**All content must align with the foundations.**

---

## Quick Navigation

### I'm Creating...

**External-facing content:**
- Case study → [Marketing guide § Case Studies](./content-marketing-sales.md#case-studies)
- Blog post → [Marketing guide § Blogs](./content-marketing-sales.md#blogs-external--internal)
- Playbook or whitepaper → [Marketing guide § Playbooks](./content-marketing-sales.md#playbooks-and-informative-content)
- Pitch deck → [Marketing guide § Pitch Decks](./content-marketing-sales.md#pitch-decks-and-sales-materials)
- Social media post → [Marketing guide § Social Media](./content-marketing-sales.md#social-media-external--internal)

**Product interface content:**
- Button label → [Product guide § Actions](./content-product-ux.md#actions-buttons-and-links)
- Error message → [Product guide § Errors](./content-product-ux.md#errors)
- Form field → [Product guide § Fields](./content-product-ux.md#fields-forms)
- Empty state → [Product guide § Empty States](./content-product-ux.md#empty-states)
- Confirmation dialog → [Product guide § Confirmations](./content-product-ux.md#confirmations)

**Internal content:**
- Internal blog post → [Marketing guide § Internal Communications](./content-marketing-sales.md#internal-communications)
- Knowledge portal article → [Marketing guide § Internal Communications](./content-marketing-sales.md#internal-communications)

---

### I Need Help With...

**Brand and voice:**
- Core voice principles → [Foundations § Content Voice and Tone](./content-foundations.md#content-voice-and-tone)
- Tone adaptation → [Foundations § Tone Adaptation Guide](./content-foundations.md#tone-adaptation-guide)

**Audience:**
- Audience targeting → [Foundations § Audience Considerations](./content-foundations.md#audience-considerations)
- Technical audiences → [Foundations § Technical Audiences](./content-foundations.md#technical-audiences)
- Business stakeholders → [Foundations § Business Stakeholders](./content-foundations.md#business-stakeholders)

**Quality and testing:**
- Quality checklist → [Foundations § Content Quality Checklist](./content-foundations.md#content-quality-checklist)
- Common mistakes → [Foundations § Common Anti-Patterns](./content-foundations.md#common-anti-patterns-to-avoid)
- Testing approach → [Product guide § Test Everything](./content-product-ux.md#5-test-everything)

**Writing mechanics:**
- Grammar and style → [Marketing guide § Writing Best Practices](./content-marketing-sales.md#writing-best-practices)
- Accessibility → [Product guide § Make It Accessible](./content-product-ux.md#6-make-it-accessible)

---

## The Three Guides

### 📘 Content Foundations
**File:** [`content-foundations.md`](./content-foundations.md)

**Universal guidelines that apply to ALL Kuat Design System content**

What's inside:
- Core voice principles and characteristics
- Universal content principles
- Audience considerations
- Common anti-patterns to avoid
- Quality tests and checklists
- Tone adaptation guidance
- AI content generation guidelines

**Who should read this:** Everyone creating content for the Kuat Design System

**When to read it:** Before creating any content, and as reference throughout

---

### 📗 Marketing, Sales & Knowledge Content
**File:** [`content-marketing-sales.md`](./content-marketing-sales.md)

**Guidelines for external-facing content that builds awareness and demonstrates expertise**

What's inside:
- Case studies
- Blogs (external & internal)
- Playbooks and whitepapers
- Pitch decks and sales materials
- Social media content
- Internal communications
- Web copy and email marketing
- Writing best practices

**Who should read this:** Marketers, content writers, business development, PR, consultants sharing knowledge

**When to read it:** When creating content for external audiences or internal knowledge sharing

---

### 📙 Product & UX Writing
**File:** [`content-product-ux.md`](./content-product-ux.md)

**Practical guide for writing content inside product interfaces**

What's inside:
- Product voice adaptation
- Foundational principles (audience, task focus, conciseness)
- Content patterns (buttons, errors, forms, empty states)
- Mobile considerations
- Accessibility requirements
- Testing and iteration
- Collaboration with designers and developers

**Who should read this:** UX writers, product designers, product managers, developers

**When to read it:** When creating any content that appears inside a product interface

---

## For AI Agents

### Context Loading Order

1. **Always load first:** [`content-foundations.md`](./content-foundations.md)
2. **Then load specialized guide based on content type:**
   - Marketing/sales content → [`content-marketing-sales.md`](./content-marketing-sales.md)
   - Product/UX content → [`content-product-ux.md`](./content-product-ux.md)
3. **Reference specific sections as needed**

### Content Type Routing

**If user requests:**
- "case study" → Load foundations + marketing guide
- "blog post" → Load foundations + marketing guide
- "button label" → Load foundations + product guide
- "error message" → Load foundations + product guide
- "social media post" → Load foundations + marketing guide
- "tooltip" → Load foundations + product guide
- "pitch deck" → Load foundations + marketing guide
- "form field label" → Load foundations + product guide
- "empty state" → Load foundations + product guide
- "confirmation dialog" → Load foundations + product guide
- "playbook" → Load foundations + marketing guide
- "whitepaper" → Load foundations + marketing guide

**If uncertain:**
- Ask clarifying questions about content type and audience
- Default to loading foundations only
- Load specialized guide once content type is clear

### Decision Tree: Which Guide Do I Need?

**START:** What are you creating?

**Is this content inside a product interface?**
- YES → [`content-product-ux.md`](./content-product-ux.md)
- NO → Continue

**Is this content for external audiences about our work/expertise?**
- YES → [`content-marketing-sales.md`](./content-marketing-sales.md)
- NO → Continue

**Is this internal team communication or documentation?**
- YES → [`content-marketing-sales.md`](./content-marketing-sales.md) (Internal sections)
- NO → Continue

**Still unsure?**
- Start with foundations document
- Ask: "Who is the audience and what's the purpose?"
- Reference the Audience Considerations in foundations

### Quality Checks for AI

**Before generating content, verify:**
1. ✅ Content type and audience identified
2. ✅ Appropriate guide(s) loaded
3. ✅ Universal principles from foundations applied
4. ✅ Content type-specific guidelines followed

**After generating content, check:**
1. ✅ Passes quality tests from foundations
2. ✅ No anti-patterns present
3. ✅ Tone appropriate for audience and context
4. ✅ Evidence supports all claims (for marketing content)
5. ✅ Concise and action-oriented (for product content)

---

## Document Structure

```
📁 Kuat Design System Content Guides
├── 📄 README.md (this file)
│   └── Master index and navigation
│
├── 📄 content-foundations.md
│   └── Universal principles (ALL content)
│       ├── Voice principles
│       ├── Content principles
│       ├── Audience considerations
│       ├── Anti-patterns
│       ├── Quality tests
│       └── Tone guidance
│
├── 📄 content-marketing-sales.md
│   └── External-facing content
│       ├── Case studies
│       ├── Blogs
│       ├── Playbooks
│       ├── Pitch decks
│       ├── Social media
│       ├── Internal comms
│       └── Writing best practices
│
└── 📄 content-product-ux.md
    └── Product interface content
        ├── Voice adaptation
        ├── Core principles
        ├── Content patterns
        ├── Mobile guidelines
        ├── Accessibility
        └── Testing approach
```

---

## Key Principles (Summary)

### The Kuat Design System Voice

**We are:**
- Clear, direct, and helpful
- Confident but never arrogant
- Focused on user needs
- Consistent and predictable

**We are not:**
- Vague or ambiguous
- Overly formal or stuffy
- Marketing-heavy in product UI
- Technical without clarity

### The Content Formula

**For marketing content:**
`[Clear value] + [specific context] + [evidence/examples] + [actionable takeaways]`

**For product content:**
`[Action] + [Object] + [Benefit if needed]`

### Quality Tests

Every piece of content should pass:
1. **The Clarity Test** - Can it be understood quickly?
2. **The Purpose Test** - Does it serve a clear user need?
3. **The Consistency Test** - Does it match our voice?
4. **The Accessibility Test** - Does it work for all users?
5. **The Context Test** - Is it appropriate for the situation?

---

## Additional Resources

- **Design System Overview:** See [../design/design-system.md](../design/design-system.md) for design token usage
- **Typography Guide:** See [../design/typography.md](../design/typography.md) for text styling
- **Component Guidelines:** See [../technical/component-guidelines.md](../technical/component-guidelines.md) for component patterns
- **Usage Guide:** See [../usage-guide.md](../usage-guide.md) for quick reference

---

## What's Next?

1. **Read the foundations** → [`content-foundations.md`](./content-foundations.md)
2. **Pick your specialization** → Marketing or Product guide
3. **Start creating** → Apply the principles
4. **Test and iterate** → Learn from real users
5. **Share learnings** → Help improve these guides

Welcome to content creation for the Kuat Design System. Let's create great content together! 🚀

