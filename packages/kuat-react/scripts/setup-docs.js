import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Find the consuming app's root directory by looking for package.json
 * in parent directories starting from node_modules/@equal-experts/kuat-react
 */
function findAppRoot(startDir) {
  let currentDir = startDir;
  
  // First, go up from node_modules/@equal-experts/kuat-react to node_modules
  // Then go up to the app root
  while (currentDir !== path.dirname(currentDir)) {
    const packageJsonPath = path.join(currentDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      // Check if this is the app root (not the package itself)
      const nodeModulesPath = path.join(currentDir, 'node_modules');
      if (!fs.existsSync(nodeModulesPath) || !currentDir.includes('node_modules')) {
        // This might be the app root, but let's check if we're in node_modules
        // If we're in node_modules, the app root is typically 2 levels up
        if (currentDir.includes('node_modules')) {
          // Go up from node_modules/@equal-experts/kuat-react to app root
          let checkDir = currentDir;
          while (checkDir !== path.dirname(checkDir)) {
            const checkPackageJson = path.join(checkDir, 'package.json');
            const checkNodeModules = path.join(checkDir, 'node_modules');
            if (fs.existsSync(checkPackageJson) && fs.existsSync(checkNodeModules)) {
              return checkDir;
            }
            checkDir = path.dirname(checkDir);
          }
        }
        return currentDir;
      }
    }
    currentDir = path.dirname(currentDir);
  }
  
  // Fallback: assume we're in node_modules/@equal-experts/kuat-react
  // App root should be 3 levels up (node_modules/@equal-experts/kuat-react -> node_modules/@equal-experts -> node_modules -> app root)
  let fallbackDir = startDir;
  for (let i = 0; i < 3; i++) {
    fallbackDir = path.dirname(fallbackDir);
  }
  return fallbackDir;
}

/**
 * Setup agent documentation by copying from package to .cursor/rules/kuat-docs/
 */
function setupDocs() {
  try {
    // Get the package directory (where this script is located)
    const packageDir = path.dirname(__dirname);
    const docsSource = path.join(packageDir, 'docs');
    
    // Check if docs exist in the package
    if (!fs.existsSync(docsSource)) {
      console.error('❌ Error: Documentation not found in package.');
      console.error(`   Expected location: ${docsSource}`);
      console.error('   Make sure the package is built and docs are included.');
      process.exit(1);
    }
    
    // Find the consuming app's root
    const appRoot = findAppRoot(packageDir);
    const docsTarget = path.join(appRoot, '.cursor', 'rules', 'kuat-docs');
    
    // Create .cursor/rules directory if it doesn't exist
    const cursorRulesDir = path.dirname(docsTarget);
    if (!fs.existsSync(cursorRulesDir)) {
      fs.mkdirSync(cursorRulesDir, { recursive: true });
      console.log(`✓ Created directory: ${cursorRulesDir}`);
    }
    
    // Clean existing docs if they exist
    if (fs.existsSync(docsTarget)) {
      fs.rmSync(docsTarget, { recursive: true });
      console.log(`✓ Cleaned existing docs: ${docsTarget}`);
    }
    
    // Create target directory
    fs.mkdirSync(docsTarget, { recursive: true });
    
    // Copy all docs recursively
    console.log('📚 Copying agent documentation...');
    console.log(`   From: ${docsSource}`);
    console.log(`   To:   ${docsTarget}`);
    
    fs.cpSync(docsSource, docsTarget, { recursive: true });
    
    // Create a README in the destination explaining the source
    const readmeContent = `# Kuat Design System - Agent Documentation

This directory contains AI-friendly documentation for the Kuat Design System.

## Source

These docs were copied from \`@equal-experts/kuat-react\` package.

**Version:** ${getPackageVersion(packageDir)}
**Last Updated:** ${new Date().toISOString()}

## Contents

- **[Design System](./design/)** - Colors, typography, spacing, borders, layouts
- **[Component Guidelines](./components/)** - Component development patterns
- **[Content Guidelines](./content/)** - Content writing guidelines

## Purpose

These docs are optimized for LLM consumption and provide context for:
- Understanding the design system
- Using components correctly
- Maintaining brand consistency
- Writing appropriate content

## Updating

To update these docs after installing a new version of \`@equal-experts/kuat-react\`, run:

\`\`\`bash
pnpm exec @equal-experts/kuat-react setup-docs
\`\`\`

Or if you have the package installed locally:

\`\`\`bash
cd node_modules/@equal-experts/kuat-react && pnpm setup-docs
\`\`\`
`;
    
    fs.writeFileSync(path.join(docsTarget, 'README.md'), readmeContent);
    
    console.log('✓ Documentation copied successfully!');
    console.log(`\n📖 Documentation is now available at: ${docsTarget}`);
    console.log('   You can reference these files in your Cursor rules or LLM context.\n');
    
  } catch (error) {
    console.error('❌ Error setting up documentation:');
    console.error(error.message);
    process.exit(1);
  }
}

/**
 * Get package version from package.json
 */
function getPackageVersion(packageDir) {
  try {
    const packageJsonPath = path.join(packageDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      return packageJson.version || 'unknown';
    }
  } catch (error) {
    // Ignore errors
  }
  return 'unknown';
}

// Run the setup
setupDocs();

