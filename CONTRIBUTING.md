# Contributing to Kuat Design System

Thank you for your interest in contributing to the Kuat Design System! This guide will help you set up your development environment and understand our workflow.

## Table of Contents

- [Development Environment Setup](#development-environment-setup)
- [Project Structure](#project-structure)
- [Adding Components](#adding-components)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Code Style](#code-style)
- [Submitting Changes](#submitting-changes)

## Development Environment Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0 (recommended package manager)
- **Git**

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kuat-mono
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Build all packages**
   ```bash
   pnpm build
   ```

4. **Verify the setup**
   ```bash
   # Start React Storybook
   pnpm --filter storybook-react dev
   
   # In another terminal, start Vue Storybook
   pnpm --filter storybook-vue dev
   ```

Visit http://localhost:6006 (React) and http://localhost:6007 (Vue) to see Storybook running.

## Project Structure

```
kuat-mono/
├── packages/
│   ├── kuat-core/          # Shared design tokens and CSS variables
│   │   ├── src/
│   │   │   └── variables.css  # All CSS custom properties
│   │   └── tailwind.config.ts
│   ├── kuat-react/         # React component library
│   │   ├── src/
│   │   │   ├── components/ui/  # shadcn/ui components
│   │   │   ├── lib/utils.ts    # Utility functions
│   │   │   ├── styles.css      # Imports core styles
│   │   │   └── index.ts        # Package exports
│   │   ├── scripts/
│   │   │   └── copy-docs.js    # Auto-copies agent docs during build
│   │   └── components.json     # shadcn CLI config
│   └── kuat-vue/           # Vue component library
│       ├── src/
│       │   ├── components/ui/  # shadcn-vue components
│       │   ├── lib/utils.ts    # Utility functions
│       │   ├── styles.css      # Imports core styles
│       │   └── index.ts        # Package exports
│       ├── scripts/
│       │   └── copy-docs.js    # Auto-copies agent docs during build
│       └── components.json     # shadcn-vue CLI config
├── apps/
│   ├── storybook-react/    # React component documentation
│   │   └── stories/        # React component stories
│   └── storybook-vue/      # Vue component documentation
│       └── stories/        # Vue component stories
└── docs/                   # Documentation
    └── agent/              # AI-friendly documentation (source)
```

**Note:** During build, agent documentation from `docs/agent/` is automatically copied to `packages/kuat-react/docs/` and `packages/kuat-vue/docs/` for inclusion in published npm packages. These generated `docs/` folders are git-ignored.

## Adding Components

### Adding a React Component

1. **Navigate to the React package**
   ```bash
   cd packages/kuat-react
   ```

2. **Add the component using shadcn CLI**
   ```bash
   npx shadcn@latest add dialog
   ```
   
   This will:
   - Install required dependencies
   - Add the component to `src/components/ui/`
   - Configure types and utilities

3. **Export the component**
   
   Edit `src/index.ts` to export the new component:
   ```typescript
   export {
     Dialog,
     DialogPortal,
     DialogOverlay,
     DialogClose,
     DialogTrigger,
     DialogContent,
     DialogHeader,
     DialogFooter,
     DialogTitle,
     DialogDescription,
   } from "./components/ui/dialog";
   ```

4. **Create a Storybook story**
   
   Create `apps/storybook-react/stories/Dialog.stories.tsx`:
   ```typescript
   import type { Meta, StoryObj } from '@storybook/react';
   import {
     Dialog,
     DialogTrigger,
     DialogContent,
     DialogHeader,
     DialogTitle,
     DialogDescription,
     Button,
   } from '@equal-experts/kuat-react';
   
   const meta: Meta<typeof Dialog> = {
     title: 'Components/Dialog',
     component: Dialog,
     tags: ['autodocs'],
   };
   
   export default meta;
   type Story = StoryObj<typeof Dialog>;
   
   export const Default: Story = {
     render: () => (
       <Dialog>
         <DialogTrigger asChild>
           <Button variant="outline">Open Dialog</Button>
         </DialogTrigger>
         <DialogContent>
           <DialogHeader>
             <DialogTitle>Are you sure?</DialogTitle>
             <DialogDescription>
               This action cannot be undone.
             </DialogDescription>
           </DialogHeader>
         </DialogContent>
       </Dialog>
     ),
   };
   ```

5. **Test in Storybook**
   ```bash
   cd ../..
   pnpm --filter storybook-react dev
   ```
   
   Navigate to the new Dialog story and verify it works correctly.

### Adding a Vue Component

The process is similar for Vue components:

1. **Navigate to the Vue package**
   ```bash
   cd packages/kuat-vue
   ```

2. **Add the component using shadcn-vue CLI**
   ```bash
   npx shadcn-vue@latest add dialog
   ```

3. **Export the component**
   
   Edit `src/index.ts`:
   ```typescript
   export {
     Dialog,
     DialogClose,
     DialogContent,
     DialogDescription,
     DialogFooter,
     DialogHeader,
     DialogTitle,
     DialogTrigger,
   } from "./components/ui/dialog";
   ```

4. **Create a Storybook story**
   
   Create `apps/storybook-vue/stories/Dialog.stories.ts`:
   ```typescript
   import type { Meta, StoryObj } from '@storybook/vue3';
   import {
     Dialog,
     DialogTrigger,
     DialogContent,
     DialogHeader,
     DialogTitle,
     DialogDescription,
     Button,
   } from '@equal-experts/kuat-vue';
   
   const meta: Meta<typeof Dialog> = {
     title: 'Components/Dialog',
     component: Dialog,
     tags: ['autodocs'],
   };
   
   export default meta;
   type Story = StoryObj<typeof Dialog>;
   
   export const Default: Story = {
     render: () => ({
       components: {
         Dialog,
         DialogTrigger,
         DialogContent,
         DialogHeader,
         DialogTitle,
         DialogDescription,
         Button,
       },
       template: `
         <Dialog>
           <DialogTrigger as-child>
             <Button variant="outline">Open Dialog</Button>
           </DialogTrigger>
           <DialogContent>
             <DialogHeader>
               <DialogTitle>Are you sure?</DialogTitle>
               <DialogDescription>
                 This action cannot be undone.
               </DialogDescription>
             </DialogHeader>
           </DialogContent>
         </Dialog>
       `,
     }),
   };
   ```

5. **Test in Storybook**
   ```bash
   cd ../..
   pnpm --filter storybook-vue dev
   ```

## Development Workflow

### Daily Development

1. **Start Storybook for the framework you're working with**
   ```bash
   # For React development
   pnpm --filter storybook-react dev
   
   # For Vue development
   pnpm --filter storybook-vue dev
   ```

2. **Make your changes**
   - Edit component code in `packages/kuat-react/src/` or `packages/kuat-vue/src/`
   - Update stories in `apps/storybook-react/stories/` or `apps/storybook-vue/stories/`
   - Storybook will hot-reload automatically

3. **Build to verify**
   ```bash
   pnpm build
   ```

### Testing Changes in a Real Application

To test your changes in an actual application:

1. **Build the packages**
   ```bash
   pnpm build
   ```

2. **Link the package globally**
   ```bash
   cd packages/kuat-react  # or kuat-vue
   pnpm link --global
   ```

3. **Link in your test app**
   ```bash
   cd /path/to/your/test/app
   pnpm link --global @equal-experts/kuat-react
   ```

4. **Or use file protocol in package.json**
   ```json
   {
     "dependencies": {
       "@equal-experts/kuat-react": "file:../kuat-mono/packages/kuat-react"
     }
   }
   ```

### Working with Design Tokens

If you need to add or modify design tokens (colors, spacing, typography):

1. **Edit the core variables**
   ```bash
   # Edit CSS variables
   vim packages/kuat-core/src/variables.css
   ```

2. **Rebuild packages**
   ```bash
   pnpm build
   ```

3. **Test in Storybook**
   
   Changes to design tokens will automatically reflect in all components.

## Testing

### Visual Testing with Storybook

Storybook provides comprehensive visual testing:

1. **Test all variants**
   - Use the Controls panel to test different props
   - Toggle between light and dark themes
   - Test different viewport sizes

2. **Accessibility testing**
   - Use Storybook's accessibility addon
   - Check contrast ratios
   - Verify keyboard navigation

3. **Interactive testing**
   - Test user interactions
   - Verify state changes
   - Check animations and transitions

### Build Testing

Before submitting changes, ensure everything builds:

```bash
# Clean build
rm -rf packages/*/dist apps/*/dist

# Full build
pnpm build

# Build Storybook
pnpm --filter storybook-react build
pnpm --filter storybook-vue build
```

## Code Style

### TypeScript

- Use strict TypeScript types
- Export types alongside components
- Use explicit return types for functions

```typescript
// Good
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'default', ...props }) => {
  return <button {...props} />;
};

// Export the type
export type { ButtonProps };
```

### Component Structure

- Keep components focused and single-purpose
- Use composition over complexity
- Follow shadcn/ui patterns

### Styling

- Use Tailwind utility classes
- Reference CSS variables for colors
- Use the `cn()` utility for conditional classes

```typescript
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
      },
    },
  }
);
```

### Documentation

- Add JSDoc comments for exported functions and types
- Create comprehensive Storybook stories
- Include usage examples in stories

## Submitting Changes

### Before Submitting

1. **Run linting**
   ```bash
   pnpm lint
   ```

2. **Build all packages**
   ```bash
   pnpm build
   ```

3. **Test in Storybook**
   
   Verify your component works in both light and dark themes.

4. **Check exports**
   
   Ensure your component is properly exported from `index.ts`.

### Branch Naming

Use descriptive branch names:

```
feature/add-dialog-component
fix/button-hover-state
docs/update-contributing-guide
chore/upgrade-dependencies
```

### Commit Messages

Follow conventional commits format:

```
feat: add Dialog component to React library
fix: correct Button hover state in dark mode
docs: update component guidelines
chore: upgrade Tailwind to v4.1
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Pull Request Process

1. **Create a pull request** with a clear title and description
2. **Link related issues** if applicable
3. **Provide screenshots** or GIFs for UI changes
4. **Include Storybook links** if possible
5. **Wait for review** from maintainers
6. **Address feedback** and update as needed

## Getting Help

- Check the [Architecture documentation](./ARCHITECTURE.md)
- Review [Component Guidelines](./docs/agent/technical/component-guidelines.md)
- Look at existing components for patterns
- Ask questions in pull requests or issues

## Additional Resources

- [shadcn/ui documentation](https://ui.shadcn.com)
- [shadcn-vue documentation](https://www.shadcn-vue.com)
- [Tailwind CSS v4 documentation](https://tailwindcss.com)
- [Storybook documentation](https://storybook.js.org)
- [Radix UI documentation](https://www.radix-ui.com)

Thank you for contributing to the Kuat Design System!

