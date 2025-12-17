import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const docsSource = path.join(__dirname, '../../../docs/agent');
const docsTarget = path.join(__dirname, '../docs');

// Clean target directory
if (fs.existsSync(docsTarget)) {
  fs.rmSync(docsTarget, { recursive: true });
}

// Create target directory
fs.mkdirSync(docsTarget, { recursive: true });

// Copy design docs
console.log('Copying design documentation...');
fs.cpSync(
  path.join(docsSource, 'design'),
  path.join(docsTarget, 'design'),
  { recursive: true }
);

// Copy component guidelines
console.log('Copying component guidelines...');
fs.mkdirSync(path.join(docsTarget, 'components'), { recursive: true });
fs.copyFileSync(
  path.join(docsSource, 'technical/component-guidelines.md'),
  path.join(docsTarget, 'components/guidelines.md')
);

// Copy content guidelines
console.log('Copying content guidelines...');
fs.cpSync(
  path.join(docsSource, 'content'),
  path.join(docsTarget, 'content'),
  { recursive: true }
);

// Create README
console.log('Creating docs README...');
const readme = `# Agent Documentation

This directory contains AI-friendly documentation for the Kuat Design System React library.

## Contents

- **[Design System](./design/)** - Colors, typography, spacing, borders
  - [Colours](./design/colours.md) - Brand colors and usage guidelines
  - [Typography](./design/typography.md) - Font scales and text styling
  - [Spacing](./design/spacing.md) - Spacing system and patterns
  - [Borders](./design/borders.md) - Border usage and specifications
  - [Design System Overview](./design/design-system.md) - Complete design system guide

- **[Component Guidelines](./components/guidelines.md)** - Component development patterns and best practices

- **[Content Guidelines](./content/)** - Content writing guidelines
  - [Content Foundations](./content/content-foundations.md) - Universal content principles
  - [Marketing & Sales](./content/content-marketing-sales.md) - Marketing content guidelines
  - [Product & UX](./content/content-product-ux.md) - Product interface writing

## Purpose

These docs are optimized for LLM consumption and provide context for:
- Understanding the design system
- Using components correctly
- Maintaining brand consistency
- Writing appropriate content

## Version

These docs are synchronized with @equal-experts/kuat-react.

## Source

Documentation is sourced from the [Kuat monorepo](https://github.com/equal-experts/kuat) and copied during the build process.
`;

fs.writeFileSync(path.join(docsTarget, 'README.md'), readme);

console.log('✓ Documentation copied successfully!');
console.log(`  Target: ${docsTarget}`);

