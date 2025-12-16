# Kuat Design System Product & UX Writing Guide

---
**Version:** 1.0  
**Last Updated:** December 2024  
**Type:** Specialized Guidelines  
**Audience:** UX Writers, Product Designers, Product Managers, Developers  
**Dependencies:** [`content-foundations.md`](./content-foundations.md) (read first)

---

## Prerequisites

**⚠️ Important:** You must read [`content-foundations.md`](./content-foundations.md) before using this guide.

This guide builds on the universal brand voice principles. It assumes you understand:
- Core voice principles
- Universal content principles
- Audience considerations
- Common anti-patterns
- Quality tests

---

## Quick Reference: Product Content at a Glance

**Product content is:**
- Text inside product interfaces
- Designed to help users complete tasks
- More concise than marketing content
- Action-oriented and contextual
- Tested with real users

**Core purpose:** Give users exactly what they need, exactly when they need it, to complete their task successfully.

**Tone:** Helpful, concise, action-oriented, respectful

---

## Overview

### What is Product & UX Content?

Product & UI content design focuses on the interface text users encounter while using products and services built with the Kuat Design System. This differs from:
- **Marketing content** (which raises awareness and generates leads)
- **Help content** (which educates on product use in documentation)

Product content is the conversation happening inside the product itself—it's the labels, instructions, errors, confirmations, and feedback that guide users through their tasks.

### Core Purpose

**Design content that keeps users focused on completing their tasks** by giving them exactly what they need, exactly when they need it.

Users don't read products for enjoyment. They use products to accomplish goals. Our content should:
- Facilitate task completion
- Remove friction and confusion
- Build confidence
- Prevent errors
- Help users recover from problems

---

## Product Voice Adaptation

While maintaining Kuat Design System foundations, product content requires specific adaptations:

### The Product Voice Formula

`[Action] + [Object] + [Benefit if needed]`

**Examples:**
- "Save invoice" (clear action + object)
- "Save draft" (action + object)
- "Export to CSV" (action + object + format)
- "Archive project · Free up space" (action + object · benefit)

### Key Differences from Marketing Content

| Aspect | Marketing Content | Product Content |
|--------|------------------|-----------------|
| **Purpose** | Persuade, inform, engage | Enable task completion |
| **Length** | Can be expansive | Must be concise |
| **Tone** | Can be conversational | Must be action-oriented |
| **Style** | Storytelling, personality | Direct, functional |
| **Context** | User chose to read | User is trying to do something |
| **Emotion** | Can evoke feelings | Must match user's emotional state |

### Product Content Characteristics

**More concise:**
- Every word must earn its place
- No marketing language or fluff
- Cut by 50% compared to marketing content

**More action-oriented:**
- Focus on what users can DO
- Use verb-driven language
- Make next steps obvious

**More contextual:**
- Appears at moment of need
- Specific to user's current task
- Disappears when not relevant

**More tested:**
- Must work in real usage scenarios
- Based on user behavior, not opinions
- Continuously improved based on data

---

## Foundational Principles for Product Content

### 1. Understand the Audience in Detail

Before writing a single word, deeply understand:
- **Who** sees this content? (All users? Specific segments? Power users or beginners?)
- **When** do they see it? (First login? After an error? Mid-workflow?)
- **What** are they trying to do? (Complete a form? Make a decision? Recover from an error?)
- **How** are they feeling? (Confident? Frustrated? Confused? In a hurry?)

#### Example - GOOD (Detailed Audience Understanding)

```
Context: Modal shown to users who haven't connected their bank after 14 days
Audience: Small business owners, 65% first-time accounting software users, often feeling overwhelmed
Emotional state: Likely confused about whether they're "doing it right"
Goal: Connect bank account to enable automatic transaction imports

Content:
"Connect your bank to save hours
Link your business bank account and we'll automatically import your transactions. You'll spend less time on data entry and more time running your business.

[Connect bank account]  [I'll do this later]"
```

**Why it's good:**
- Addresses user's hesitation empathetically
- States clear benefit ("save hours")
- Explains what will happen
- Provides escape hatch without pressure

#### Example - BAD (Generic, No Audience Context)

```
"Bank Connection Available
You can connect your bank account now.

[Connect]  [Cancel]"
```

**Why it's bad:**
- Doesn't address why it matters to the user
- Doesn't acknowledge their potential hesitation
- Technical language without context ("connection")
- No clear value proposition
- Doesn't help user make informed decision

---

### 2. Keep Users Focused on Their Task

Surface information at the moment of need, not before. Don't make users remember things for later use.

#### The "Right Time, Right Place" Rule

- Information should appear when it's immediately actionable
- Avoid "just in case" content that clutters the interface
- Don't ask users to hold information in working memory
- Remove information as soon as it's no longer relevant

#### Example - GOOD

```
[User is on "Add Employee" form]

Inline help next to "Employment Type" field:
"Employees receive a W-2. Contractors receive a 1099."
[More about employee vs. contractor classification]
```

**Why it's good:**
- Information appears exactly when needed
- User can make decision immediately
- Link available for more detail if needed
- Doesn't clutter previous or future screens

#### Example - BAD

```
[User lands on Employee Dashboard]

Banner at top:
"Note: When you add employees, remember that employees receive W-2s and contractors receive 1099s. You'll need to know the difference when adding people to your system. Keep this in mind for future reference."

[Separate Add Employee page, with no reminder of this information]
```

**Why it's bad:**
- Information presented before it's needed
- Requires user to remember for later (working memory burden)
- Separated from the decision point
- Increases cognitive load unnecessarily
- Not present when actually needed

---

### 3. Get to the Point

Humans have 1,440 minutes per day. Don't waste any of them with words that don't carry meaning.

#### Conciseness Principles

- Lead with the most important information
- Remove filler words and phrases
- Use the fewest words that convey meaning clearly
- Every word should earn its place on screen
- Front-load information (most important first)

#### Common Filler Phrases to Remove

❌ "Please note that..."  
❌ "At this time..."  
❌ "In order to..."  
❌ "You may wish to..."  
❌ "It appears that..."  
❌ "We have detected that..."

✅ Just state the information directly

#### Example - GOOD

```
"Your invoice is overdue
[Client Name] hasn't paid Invoice #1234 ($2,450) due on 15 Nov.

[Send reminder]  [View invoice]"
```

**Word count:** 15 words (excluding button labels)

**Why it's good:**
- States problem immediately
- Provides specific details
- Clear actions available
- No unnecessary words

#### Example - BAD

```
"Notification Regarding Outstanding Payment

Please be advised that we have detected that one of your invoices appears to be overdue at this time. The invoice in question is Invoice Number 1234 which was issued to [Client Name] in the amount of $2,450.00 and according to our records it was originally due to be paid on November 15th.

You may wish to consider the possibility of sending a reminder to your customer about this outstanding amount, or alternatively you could review the invoice to ensure all the details are correct.

[Send a reminder to customer]  [Review invoice details]"
```

**Word count:** 93 words (excluding button labels)

**Why it's bad:**
- Takes 6x more words to convey same information
- Passive voice throughout ("we have detected", "was issued")
- Unnecessary qualifiers ("appears to be," "may wish to consider")
- Overly formal tone for user doing task
- Wordy button labels that repeat content

---

### 4. Work Collaboratively

Product content design doesn't happen in isolation. It's integrated with multiple disciplines:

#### Collaboration Model

**With Interaction Designers:**
- Work together on user flows
- Determine component behavior
- Design information architecture
- Decide when to use progressive disclosure

**With Visual Designers:**
- Ensure visual hierarchy supports content hierarchy
- Verify typography accommodates content needs
- Confirm button text works within button constraints
- Validate instructional text has adequate spacing

**With Product Managers:**
- Understand business goals
- Prioritize feature development
- Define success metrics
- Balance user needs with business constraints

**With Developers:**
- Understand technical constraints
- Clarify data structures
- Design for error conditions
- Test actual error messages with real failure scenarios

**With Researchers:**
- Test content with real users
- Understand pain points
- Validate assumptions
- Identify friction points

**With Legal/Compliance:**
- Ensure required disclosures meet regulations
- Find plain English alternatives to legal language
- Balance compliance with usability
- Separate legal requirements from user content

---

### 5. Test Everything

Your opinions don't matter. User behavior and feedback does.

#### Testing Approaches

**A/B Testing:**
- Compare two content variations with real users
- Use statistically significant sample sizes
- Measure impact on task completion, errors, satisfaction
- Ship the version that performs better

**Usability Testing:**
- Watch users attempt tasks with your content
- Identify where they get confused
- Note questions they ask
- Observe where they struggle

**Intercept Surveys:**
- Ask users questions at key moments
- "Was this helpful?" at end of flows
- "Did you accomplish what you came to do?"
- Gather feedback on specific content

**Analytics:**
- Track completion rates
- Monitor error rates
- Measure abandonment
- Identify drop-off points

**Comprehension Testing:**
- Verify users understand key concepts
- Ask users to explain in their own words
- Test with users who match audience profile

#### Example - GOOD Testing Report

```
Test: Button label for "Save and continue editing" vs. "Save draft"
Method: A/B test, 2,000 users per variation, 5 days
Metric: Click-through rate on button

Results:
- "Save draft": 67% CTR
- "Save and continue editing": 42% CTR

User feedback (exit survey):
- "Save draft" was clearer about what would happen
- "Save and continue editing" was confusing - users thought they'd stay on same page

Decision: Ship "Save draft"

Learning: Users prefer clarity over descriptiveness when the action is simple
```

**Why it's good:**
- Proper methodology (A/B test with adequate sample)
- Clear metrics defined
- Quantitative data plus qualitative feedback
- Specific decision made
- Learning documented for future reference

---

### 6. Make It Accessible

Content designers are uniquely positioned to champion accessibility because the UI is expressed in words for screen reader users.

#### Accessibility Responsibilities

✅ **Do:**
- Ensure proper heading hierarchy (H1 → H2 → H3, no skipping)
- Write descriptive link text (not "click here")
- Provide alt text for meaningful images
- Keep form labels clear and persistent
- Reduce cognitive load through simplicity
- Ensure error messages are actionable
- Connect labels to inputs programmatically
- Provide sufficient color contrast
- Write content that works without seeing the interface

❌ **Don't:**
- Rely solely on placeholder text (it disappears)
- Use color alone to convey information
- Create error messages that aren't associated with fields
- Write ambiguous button labels
- Use jargon without explanation

#### Example - GOOD (Accessible)

```html
<h2>Payment method</h2>

<label for="card-number">Card number</label>
<input id="card-number" type="text" aria-describedby="card-help">
<span id="card-help">Enter the 16-digit number on your card</span>

<label for="expiry">Expiry date</label>
<input id="expiry" type="text" placeholder="MM/YY" aria-describedby="expiry-help">
<span id="expiry-help">Month and year format: 03/25</span>

[Error state]
<span role="alert" class="error">
Card number must be 16 digits
</span>
```

**Why it's good:**
- Proper heading hierarchy
- Labels explicitly connected to inputs
- Help text programmatically associated
- Error message announced to screen readers
- Placeholder used as example, not label
- Clear, actionable error message

---

## Product Content Patterns

### Actions (Buttons and Links)

Buttons should be clear, concise, and predictable. Users should know exactly what happens when they click.

#### Button Label Rules

✅ **Do:**
- Use verb-driven labels that describe the action
- Be specific about what happens
- Keep labels short (1-3 words ideal)
- Use sentence case (not Title Case or ALL CAPS)
- Make primary action stand out visually

❌ **Don't:**
- Use vague labels like "OK" or "Submit"
- Make labels overly long or explanatory
- Use ALL CAPS
- Include instructions in button labels

#### Example - GOOD

```
[Save and close]  [Save as draft]

[Delete expense]  [Cancel]

[Send invoice now]  [Schedule for later]

[Connect bank]  [Skip for now]
```

**Why it's good:**
- Action verb + object
- Specific outcome clear
- Short and scannable
- Parallel structure

#### Example - BAD

```
[OK]  [Cancel]  
(OK is ambiguous - OK to what?)

[Yes, I want to proceed with this action]
(Too wordy - action unclear)

[SUBMIT FORM NOW]
(All caps, not specific, shouty)

[Click here to continue]
(Not action-focused, generic)
```

---

### Confirmations

Confirmations prevent users from taking actions they might regret.

#### When to Use Confirmations

✅ **Use for:**
- Destructive actions (delete, remove, disconnect)
- Actions that can't be undone
- Actions with significant consequences
- Actions that modify important data

❌ **Don't use for:**
- Actions that can be undone easily
- Low-stakes decisions
- Actions users make frequently
- Saving or submitting (unless destructive)

#### Example - GOOD

```
Delete client account?

This will permanently delete [Client Name] and all associated:
- Invoices (12)
- Payments (8)
- Transaction history

You can't undo this action.

[Delete permanently]  [Cancel]
```

**Why it's good:**
- Clear about what's being deleted
- Specific consequences listed
- Indicates irreversibility
- Action button confirms the action

#### Example - BAD

```
Are you sure?

Do you really want to do this?

[Yes]  [No]
```

**Why it's bad:**
- Doesn't remind user what "this" is
- Doesn't explain consequences
- No indication of reversibility
- Generic button labels
- Doesn't help user make informed decision

---

### Empty States

Empty states occur when there's no data to display. They're opportunities to guide users toward value.

#### Empty State Principles

✅ **Do:**
- Explain why the state is empty
- Provide clear next action
- Make the action easy to take
- Use positive, encouraging tone
- Include illustration or icon if helpful

❌ **Don't:**
- Leave users confused about what happened
- Make empty states feel like errors
- Provide action without explanation
- Use negative or discouraging language

#### Example - GOOD

```
[Illustration of invoice]

No invoices yet

Create your first invoice to get paid faster. It takes less than 2 minutes.

[Create invoice]

Or import invoices from [QuickBooks] [Xero] [CSV file]
```

**Why it's good:**
- Friendly, encouraging tone
- Clear next action
- Time estimate reduces anxiety
- Alternative paths offered
- Visual makes it feel intentional, not broken

#### Example - BAD

```
No data available.
```

**Why it's bad:**
- Doesn't explain why
- No guidance on what to do next
- Feels like an error rather than a starting point
- Technical language ("data")
- Discouraging tone

---

### Errors

Errors happen. Good error messages help users recover quickly and learn how to avoid the problem in future.

#### Error Message Formula

```
1. What went wrong (specific)
2. Why it happened (if helpful)
3. How to fix it (actionable)
```

#### Error Message Principles

✅ **Do:**
- Be specific about the problem
- Use plain language
- Provide actionable next steps
- Suggest solutions when possible
- Take responsibility ("We couldn't save your changes")
- Show empathy for user's situation

❌ **Don't:**
- Blame the user
- Use technical jargon or error codes
- Be vague about the problem
- Leave user with no clear next step
- Use humor (errors frustrate users)

#### Example - GOOD

```
[Error icon] Can't save invoice

The customer email "john@example,com" has a comma instead of a period.

Fix the email address and try again.

[Suggested: john@example.com]
```

**Why it's good:**
- States what failed ("Can't save invoice")
- Identifies specific problem (comma vs period)
- Shows exact location of error
- Provides actionable solution
- Offers automatic correction suggestion
- Respectful tone (doesn't blame)

#### Example - BAD

```
Error 422: Unprocessable Entity

Validation failed for field: customer_email

[OK]
```

**Why it's bad:**
- Technical error code (meaningless to users)
- Technical field name (not how users think)
- Doesn't explain what's actually wrong
- Doesn't say how to fix it
- Generic dismissive button
- No helpful information at all

---

### Fields (Forms)

Forms are where users input information. Labels, placeholder text, and help text should work together seamlessly.

#### Field Label Rules

✅ **Do:**
- Always use a label (not just placeholder text)
- Keep labels short and clear
- Use sentence case
- Position labels above fields (most accessible)
- Make labels persistent (visible while user types)

❌ **Don't:**
- Use placeholder text as the only label (it disappears)
- Make labels overly long or explanatory
- Use Title Case for labels
- Hide labels on focus

#### Example - GOOD

```
Business name
[Text input]

Industry
[Dropdown: Select industry...]
Not sure? We'll use this to suggest expense categories.

Email address
[Text input]
```

**Why it's good:**
- Clear, persistent labels
- Help text where needed, brief
- Optional context explains benefit
- Accessible structure

#### Example - BAD

```
[Text input with placeholder: "Enter your business name here..."]

[Dropdown with placeholder: "Choose your industry from this list"]

[Text input with placeholder: "name@company.com"]
```

**Why it's bad:**
- No persistent labels
- Placeholder text disappears when typing
- Inaccessible to screen readers
- Wordy placeholder text
- Example as placeholder is confusing

---

### Mobile Considerations

Mobile requires even more conciseness due to limited screen space.

#### Mobile Content Principles

- Cut content by 50% compared to desktop
- Front-load important information
- Use progressive disclosure extensively
- Design for thumbs (larger touch targets)
- Consider one-handed use
- Test on actual devices (emulators aren't enough)

#### Example - GOOD (Mobile)

```
Invoice #1234
Status: Unpaid
Due: Tomorrow
Amount: $2,450

[Send reminder]
[View details]
```

**Character count:** ~60 characters  
**Button labels:** 2 words each

**Why it's good:**
- Scannable hierarchy
- Essential info only
- Clear actions
- Touch-friendly buttons
- Works one-handed

---

## Product Content Checklist

Before shipping any product content, verify:

**Context and Timing:**
- [ ] Content appears at the right moment in the user's task
- [ ] Information is directly relevant to current action
- [ ] Content disappears when no longer relevant

**Clarity and Conciseness:**
- [ ] Every word carries meaning (no fluff)
- [ ] Content is as short as possible while remaining clear
- [ ] Most important information comes first

**Usability:**
- [ ] Users can complete their task without leaving to read help
- [ ] Button labels describe the action clearly
- [ ] Form labels are clear and persistent
- [ ] Error messages explain what happened and how to fix it

**Accessibility:**
- [ ] Content is accessible to screen reader users
- [ ] Labels programmatically connected to inputs
- [ ] Error messages associated with fields
- [ ] Heading hierarchy is logical
- [ ] Link text is descriptive

**Quality:**
- [ ] No jargon or technical terms without explanation
- [ ] Tone matches user's emotional state
- [ ] Content scales for edge cases (very long names, etc.)
- [ ] Tested with real users in context

**Technical:**
- [ ] Mobile experience is as good as desktop
- [ ] Content works on smallest supported screen size
- [ ] All states tested (default, error, loading, success, empty)
- [ ] Content works with real data (not just lorem ipsum)

---

## Common Product Content Mistakes

### Mistake 1: Explaining the Obvious

❌ "Click the button below to continue to the next screen"  
✅ [Continue]

**Why:** Users know how buttons work

---

### Mistake 2: Using Technical Language

❌ "Authentication failed for endpoint"  
✅ "We couldn't log you in. Check your email and password."

**Why:** Users don't think in technical terms

---

### Mistake 3: Being Vague

❌ "An error occurred"  
✅ "Your password must be at least 8 characters"

**Why:** Specific errors help users fix problems

---

### Mistake 4: Overusing Exclamation Points

❌ "Success! Your invoice has been sent!"  
✅ "Invoice sent"

**Why:** One exclamation point per screen maximum

---

### Mistake 5: Apologizing Unnecessarily

❌ "Sorry, we couldn't find any results"  
✅ "No results found"

**Why:** No results isn't anyone's fault

---

### Mistake 6: Marketing Speak in Product

❌ "Leverage our innovative AI-powered categorization"  
✅ "Auto-categorize expenses"

**Why:** Users want to complete tasks, not read marketing

---

## Additional Resources

- **Content Foundations:** See [content-foundations.md](./content-foundations.md) for universal principles
- **Marketing Content Guide:** See [content-marketing-sales.md](./content-marketing-sales.md) for marketing content
- **Design System Overview:** See [../design/design-system.md](../design/design-system.md) for design token usage
- **Component Guidelines:** See [../technical/component-guidelines.md](../technical/component-guidelines.md) for component patterns

---

**Remember:** Product content exists to help users accomplish their goals. Be helpful, be concise, be clear. Test with real users. Iterate based on data. When in doubt, cut words and add clarity.

For universal principles and quality tests, always reference [`content-foundations.md`](./content-foundations.md).

