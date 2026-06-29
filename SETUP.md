# @felix/ui Setup Guide

This document provides step-by-step instructions for setting up the @felix/ui development environment and publishing the package.

## Initial Setup

### 1. Install Dependencies

```bash
cd /Users/valentin/Desktop/felix/felix-ui
npm install
```

This will install all dependencies defined in `package.json`.

### 2. Verify TypeScript Configuration

```bash
npm run typecheck
```

Should complete without errors.

### 3. Build the Library

```bash
npm run build
```

This generates:

- `dist/**/*.js` - ESM modules
- `dist/**/*.cjs` - CommonJS modules
- `dist/**/*.d.ts` - TypeScript definitions
- `dist/styles.css` - Compiled styles

### 4. Start Storybook

```bash
npm run storybook
```

Opens Storybook at http://localhost:6006 with the Button component stories.

## Development Workflow

### Adding a New Component

1. Create component in `src/components/[component-name].tsx`
2. Create stories in `src/components/[component-name].stories.tsx`
3. Export from `src/index.ts`
4. Run `npm run build` to test
5. View in Storybook to verify

### Testing Locally in Another Project

Use `npm link` to test the library in a consumer project:

```bash
# In @felix/ui directory
npm run build
npm link

# In your consumer project (e.g., payments-ui)
npm link @felix/ui
```

Then import as normal:

```tsx
import { Button } from "@felix/ui";
import "@felix/ui/styles.css";
```

## Publishing

Versioning and changelogs for `@felix/ui` are managed with **Changesets**. For the full step-by-step flow (including a real-world example), see [docs/VERSIONING.md](./docs/VERSIONING.md). A short summary lives in [CONTRIBUTING.md](./CONTRIBUTING.md#publishing-changes-changesets).

From the monorepo root, after changesets have been applied to versions:

```bash
npm run build
npm run release
```

`release` runs `changeset publish`, which publishes publishable workspace packages using `publishConfig` in `packages/ui/package.json` and the root `.npmrc` (scoped registry + `NPM_TOKEN`).

## Local publish testing (Verdaccio)

If you do not have access to the private registry yet, use [Verdaccio](https://verdaccio.org/) as a local npm registry:

```bash
# Terminal 1 — start Verdaccio (default http://localhost:4873)
npx verdaccio
```

```bash
# Terminal 2 — publish the built package to the local registry
cd packages/ui
npm run build
npm publish --registry http://localhost:4873
```

In a consumer project:

```bash
npm install @felix/ui --registry http://localhost:4873
```

Verdaccio at `http://localhost:4873` behaves like a full npm registry for testing tarballs and install flows before using the real private registry.

## Consuming in payments-ui

### 1. Install the Package

```bash
cd /Users/valentin/Desktop/felix/payments-ui
npm install @felix/ui
```

### 2. Configure Tailwind

Update `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";
import felixPreset from "@felix/ui/preset";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@felix/ui/dist/**/*.{js,mjs}",
  ],
  presets: [felixPreset],
} satisfies Config;
```

### 3. Import Styles

In `app/layout.tsx` or your root layout:

```typescript
import "@felix/ui/styles.css";
```

### 4. Use Components

```tsx
import { Button } from "@felix/ui";

export default function MyComponent() {
  return <Button variant="primary">Click me</Button>;
}
```

## Architecture Overview

### Build Pipeline

```
src/          →  Rollup  →  dist/
├── *.tsx           ↓         ├── *.js (ESM)
├── *.ts            ↓         ├── *.cjs (CJS)
└── styles.css      ↓         ├── *.d.ts
                    ↓         └── styles.css
               TypeScript
               PostCSS
```

### Export Structure

```javascript
{
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js",
    "require": "./dist/index.cjs"
  },
  "./preset": {
    "types": "./dist/preset.d.ts",
    "import": "./dist/preset.js",
    "require": "./dist/preset.cjs"
  },
  "./styles.css": "./dist/styles.css"
}
```

### Tailwind Preset Flow

```
globals.css (payments-ui)
         ↓
    Extracted design tokens
         ↓
    src/preset.ts
         ↓
    CSS variables via addBase()
         ↓
    Tailwind theme extensions
         ↓
    Consumer's tailwind.config.ts
```

## Key Features

### ✅ Rollup Configuration

- **Preserves "use client" directives** via `rollup-plugin-preserve-directives`
- **TypeScript compilation** with `.d.ts` generation
- **Tree-shakeable** ESM and CJS outputs
- **PostCSS** for Tailwind processing
- **External peer dependencies** for optimal bundle size

### ✅ Felix Preset

- **Single source of truth** for Felix brand
- **CSS variables** for runtime theming
- **Dark mode support** via `.dark` class
- **Design tokens** (colors, fonts, shadows, radii)
- **Base styles** injected via `addBase()`

### ✅ Storybook Integration

- **Felix theme applied** via imported styles
- **Dark mode toggle** in toolbar
- **Interactive docs** for all components
- **Multiple story variants** demonstrating usage

## Troubleshooting

### Build Errors

```bash
# Clear dist and rebuild
rm -rf dist
npm run build
```

### Storybook Not Loading Styles

Verify `src/styles.css` is imported in `.storybook/preview.ts`.

### Type Errors in Consumer

```bash
# Rebuild to regenerate .d.ts files
npm run build
```

### npm link Issues

```bash
# Unlink and relink
npm unlink @felix/ui
npm run build
npm link
```

## Next Steps

1. Migrate more components from `payments-ui/components/ui/`
2. Add form components (Input, Checkbox, Label, etc.)
3. Add layout components (Card, Dialog, Drawer, etc.)
4. Set up automated testing (Vitest + Testing Library)
5. Configure Chromatic for visual regression testing
6. Set up CI/CD pipeline (GitHub Actions)

## Resources

- [Rollup Documentation](https://rollupjs.org/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Storybook Docs](https://storybook.js.org/docs)
- [shadcn/ui](https://ui.shadcn.com/)

---

For questions or issues, contact the Felix design system team.
