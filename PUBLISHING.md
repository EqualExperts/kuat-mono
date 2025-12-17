# Publishing to npm

This guide is for maintainers who publish Kuat Design System packages to npm.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Pre-publish Checklist](#pre-publish-checklist)
- [Version Management](#version-management)
- [Publishing Process](#publishing-process)
- [Post-publish Verification](#post-publish-verification)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### npm Account and Access

1. **npm account** with access to the `@equal-experts` organization
2. **Two-factor authentication (2FA)** enabled on your npm account
3. **Publishing permissions** for the organization packages

### Authentication Setup

1. **Log in to npm**
   ```bash
   npm login
   ```

2. **Verify authentication**
   ```bash
   npm whoami
   ```

3. **Create an access token** (if using CI/CD)
   - Go to https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   - Create a "Granular Access Token" with publish permissions
   - Set appropriate scope to `@equal-experts` packages

## Pre-publish Checklist

Before publishing, complete these checks:

### 1. Verify All Components Are Exported

Check that new components are exported from `index.ts`:

**React** (`packages/kuat-react/src/index.ts`):
```typescript
// Verify all components are exported
export { Button } from "./components/ui/button";
export { Dialog } from "./components/ui/dialog";
// ... etc
```

**Vue** (`packages/kuat-vue/src/index.ts`):
```typescript
// Verify all components are exported
export { Button } from "./components/ui/button";
export { Dialog } from "./components/ui/dialog";
// ... etc
```

### 2. Run Full Build

```bash
# Clean previous builds
rm -rf packages/*/dist

# Build all packages
pnpm build
```

Verify that all packages build without errors.

### 3. Run Linting

```bash
pnpm lint
```

Fix any linting errors before proceeding.

### 4. Test Storybook Builds

```bash
# Build React Storybook
pnpm --filter storybook-react build

# Build Vue Storybook
pnpm --filter storybook-vue build
```

Verify that Storybook builds successfully.

### 5. Test Package Structure

Verify the package will include only necessary files:

```bash
cd packages/kuat-react
pnpm pack

# This creates a tarball (e.g., equal-experts-kuat-react-0.2.3.tgz)
# Extract and inspect contents
tar -tzf equal-experts-kuat-react-*.tgz

# Clean up
rm equal-experts-kuat-react-*.tgz
```

Expected contents:
- `dist/` directory (compiled code)
- `README.md`
- `package.json`

### 6. Test in a Clean Project

Create a test project to verify the package works as expected:

```bash
# Create a new test project
mkdir test-kuat-install
cd test-kuat-install
npm init -y

# Install from local tarball
npm install ../kuat-mono/packages/kuat-react/equal-experts-kuat-react-*.tgz

# Test imports
echo "import { Button } from '@equal-experts/kuat-react';" > test.js
node test.js
```

### 7. Update Documentation

- Update CHANGELOG.md with new features and fixes
- Update README.md if there are significant changes
- Update version numbers in documentation examples

## Version Management

### Semantic Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features (backwards compatible)
- **PATCH** (0.0.1): Bug fixes (backwards compatible)

### Updating Version Numbers

1. **Decide on the version bump**
   - Breaking changes → major version
   - New components/features → minor version
   - Bug fixes → patch version

2. **Update package.json**
   
   For each package being published:
   ```bash
   # Example: bumping from 0.2.3 to 0.3.0
   cd packages/kuat-react
   npm version minor  # or major, patch
   
   cd ../kuat-vue
   npm version minor
   
   cd ../kuat-core
   npm version minor  # if changes were made to core
   ```

3. **Commit version changes**
   ```bash
   git add packages/*/package.json
   git commit -m "chore: bump version to 0.3.0"
   ```

### Creating Git Tags

After publishing, create a git tag:

```bash
# Tag the release
git tag v0.3.0

# Push the tag
git push origin v0.3.0

# Or push all tags
git push --tags
```

## Publishing Process

### Publishing Individual Packages

#### 1. Build All Packages

```bash
# From repository root
pnpm build
```

#### 2. Publish React Package

```bash
cd packages/kuat-react

# Dry run (optional, to verify what will be published)
npm publish --dry-run

# Publish to npm
npm publish --access public

cd ../..
```

#### 3. Publish Vue Package

```bash
cd packages/kuat-vue

# Publish to npm
npm publish --access public

cd ../..
```

#### 4. Publish Core Package (if needed)

Only publish if you've made changes to the core package:

```bash
cd packages/kuat-core

# Publish to npm
npm publish --access public

cd ../..
```

### Publishing All Packages (Script)

You can use this script to publish all packages:

```bash
#!/bin/bash
set -e

# Build all packages
echo "Building all packages..."
pnpm build

# Publish packages
echo "Publishing @equal-experts/kuat-core..."
cd packages/kuat-core
npm publish --access public
cd ../..

echo "Publishing @equal-experts/kuat-react..."
cd packages/kuat-react
npm publish --access public
cd ../..

echo "Publishing @equal-experts/kuat-vue..."
cd packages/kuat-vue
npm publish --access public
cd ../..

echo "All packages published successfully!"
```

Save this as `scripts/publish.sh` and make it executable:

```bash
chmod +x scripts/publish.sh
./scripts/publish.sh
```

## Post-publish Verification

### 1. Verify on npm Registry

Check that packages are visible on npm:

- https://www.npmjs.com/package/@equal-experts/kuat-core
- https://www.npmjs.com/package/@equal-experts/kuat-react
- https://www.npmjs.com/package/@equal-experts/kuat-vue

Verify:
- Correct version number
- Files are included
- README is displayed
- Package size is reasonable

### 2. Test Installation

Create a fresh test project and install from npm:

```bash
# Create test project
mkdir test-npm-install
cd test-npm-install
npm init -y

# Install from npm
npm install @equal-experts/kuat-react

# Test the installation
node -e "console.log(require('@equal-experts/kuat-react'))"
```

### 3. Test in a Real Application

Test the published package in an actual application:

```bash
# In your test application
npm install @equal-experts/kuat-react@latest
npm install @equal-experts/kuat-vue@latest

# Verify imports work
# Verify styles load correctly
# Test a few components
```

### 4. Update Documentation

After successful publishing:

1. Update the main README with the new version
2. Update any getting started guides
3. Announce the release (if applicable)

## Troubleshooting

### 403 Forbidden Error

```
npm error code E403
npm error 403 403 Forbidden
```

**Causes and solutions:**

1. **Not authenticated**
   ```bash
   npm login
   npm whoami  # Verify you're logged in
   ```

2. **Two-factor authentication required**
   
   When prompted during publish, enter your 2FA code from your authenticator app.

3. **No publish permissions**
   
   Contact an organization owner to grant you publish permissions for the `@equal-experts` scope.

4. **Incorrect organization scope**
   
   Verify `package.json` has the correct `name`:
   ```json
   {
     "name": "@equal-experts/kuat-react"
   }
   ```

### Package Name Already Exists

```
npm error code EEXIST
```

If the version already exists on npm:

1. **Bump the version**
   ```bash
   npm version patch  # or minor, major
   ```

2. **Try publishing again**
   ```bash
   npm publish --access public
   ```

### Build Errors Before Publishing

If `pnpm build` fails:

1. **Clean node_modules and reinstall**
   ```bash
   rm -rf node_modules packages/*/node_modules
   pnpm install
   ```

2. **Check for TypeScript errors**
   ```bash
   pnpm lint
   ```

3. **Verify dependencies**
   
   Ensure all peer dependencies are correctly specified.

### Files Not Included in Package

If files are missing from the published package:

1. **Check the `files` field in package.json**
   ```json
   {
     "files": ["dist", "README.md"]
   }
   ```

2. **Test with npm pack**
   ```bash
   npm pack
   tar -tzf *.tgz  # List contents
   ```

3. **Check .npmignore**
   
   Ensure you're not accidentally ignoring necessary files.

### Wrong Files Published

If you accidentally published incorrect files:

1. **Unpublish the version** (only within 72 hours)
   ```bash
   npm unpublish @equal-experts/kuat-react@0.3.0
   ```

2. **Fix the issue**

3. **Bump the version**
   ```bash
   npm version patch
   ```

4. **Publish again**

**Note:** Unpublishing is heavily discouraged in npm. It's better to publish a new patch version with fixes.

### Package Size Too Large

If your package is unexpectedly large:

1. **Inspect the tarball contents**
   ```bash
   npm pack
   tar -tzf *.tgz
   ```

2. **Check for included source files**
   
   Ensure you're only including `dist/` and not `src/`.

3. **Verify bundling**
   
   Check that CSS and dependencies are properly bundled.

## Emergency Procedures

### Rolling Back a Release

If you discover critical issues after publishing:

1. **Do NOT unpublish** (unless absolutely necessary and within 72 hours)

2. **Publish a patch version immediately**
   ```bash
   npm version patch
   npm publish --access public
   ```

3. **Add a deprecation warning** (if needed)
   ```bash
   npm deprecate @equal-experts/kuat-react@0.3.0 "Critical bug, please upgrade to 0.3.1"
   ```

4. **Communicate the issue**
   - Update documentation
   - Notify users if possible
   - Document the issue in CHANGELOG

## Best Practices

1. **Always test before publishing**
   - Build and test locally
   - Test in a fresh install
   - Verify Storybook works

2. **Publish during low-traffic times**
   - Avoid publishing right before weekends
   - Consider timezone of main users

3. **Coordinate package versions**
   - Keep React and Vue versions in sync
   - Update core when both libraries need it

4. **Document changes**
   - Update CHANGELOG.md
   - Write clear commit messages
   - Tag releases in git

5. **Monitor after publishing**
   - Check npm registry
   - Watch for user issues
   - Be ready to publish patches

## Additional Resources

- [npm Publishing Guide](https://docs.npmjs.com/cli/v9/commands/npm-publish)
- [Semantic Versioning](https://semver.org/)
- [npm Organization Packages](https://docs.npmjs.com/orgs/)
- [Creating and Publishing Scoped Packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages)

