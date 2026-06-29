# Contributing to @felix/ui

Thank you for your interest in contributing to @felix/ui! This document provides guidelines and instructions for contributing to the Felix UI component library.

## Development Setup

### Prerequisites

- Node.js 20 or higher (see `.nvmrc`)
- npm or pnpm

### Getting Started

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Start Storybook for development:

```bash
npm run storybook
```

3. Make your changes in the `src/` directory

4. Build the library to test:

```bash
npm run build
```

## Project Structure

```
src/
├── components/       # React components
│   ├── button.tsx
│   └── *.stories.tsx # Storybook stories
├── lib/
│   └── utils.ts      # Utility functions
├── preset.ts         # Tailwind preset
├── styles.css        # Base styles
└── index.ts          # Main exports
```

## Component Guidelines

### Creating a New Component

1. **Create the component file** in `src/components/`:

```tsx
"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface MyComponentProps {
  // Props interface
}

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("base-classes", className)} {...props} />
    );
  }
);

MyComponent.displayName = "MyComponent";

export { MyComponent };
```

2. **Create a Storybook story** (`*.stories.tsx`):

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { MyComponent } from "./my-component";

const meta = {
  title: "Components/MyComponent",
  component: MyComponent,
  tags: ["autodocs"],
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // default props
  },
};
```

3. **Export from `src/index.ts`**:

```typescript
export { MyComponent } from "./components/my-component";
export type { MyComponentProps } from "./components/my-component";
```

### Component Requirements

- ✅ Use TypeScript with proper typing
- ✅ Include JSDoc comments for props
- ✅ Add "use client" directive for client components
- ✅ Use `React.forwardRef` for DOM components
- ✅ Support `className` prop for custom styling
- ✅ Use `cn()` utility for class merging
- ✅ Follow Felix design system tokens
- ✅ Include comprehensive Storybook stories
- ✅ Support dark mode
- ✅ Ensure accessibility (ARIA attributes, keyboard navigation)

### Styling Guidelines

- Use Tailwind CSS utility classes
- Reference Felix design tokens via CSS variables
- Support both light and dark modes
- Use the `cn()` utility for conditional classes
- Prefer composable variants using `class-variance-authority`

Example:

```tsx
import { cva, type VariantProps } from "class-variance-authority";

const componentVariants = cva("base-classes", {
  variants: {
    variant: {
      default: "variant-classes",
      secondary: "secondary-classes",
    },
    size: {
      sm: "small-classes",
      lg: "large-classes",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
  },
});
```

## Testing

Before submitting a PR:

1. **Type check**:

```bash
npm run typecheck
```

2. **Lint**:

```bash
npm run lint
```

3. **Build**:

```bash
npm run build
```

4. **Test in Storybook**: Verify all stories render correctly in both light and dark modes

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-component`)
3. Make your changes following the guidelines above
4. Add Storybook stories demonstrating your component
5. If the change should be released, add a [Changeset](#publishing-changes-changesets) (do not edit `CHANGELOG.md` by hand)
6. Commit your changes with clear, descriptive messages
7. Push to your fork and submit a pull request

### PR Checklist

- [ ] Code follows the style guidelines
- [ ] TypeScript types are properly defined
- [ ] Component is exported from `src/index.ts`
- [ ] Storybook stories are included
- [ ] Dark mode is supported
- [ ] Component is accessible (keyboard navigation, ARIA)
- [ ] A changeset is included when the change should be released (see below); otherwise N/A
- [ ] Build succeeds (`npm run build`)
- [ ] No TypeScript or lint errors

## Publishing changes (Changesets)

This repo uses [Changesets](https://github.com/changesets/changesets) for semantic versioning and `CHANGELOG.md` updates for `@felix/ui`.

**Full guide (step-by-step developer experience, real-world example, manual release, cheat sheet):** [docs/VERSIONING.md](./docs/VERSIONING.md).

### When your change should be released

1. After your code changes, from the repo root run:

   ```bash
   npm run changeset
   ```

2. Select the bump type:
   - **patch** (`0.0.x`): bugfix, cosmetic change with no API impact
   - **minor** (`0.x.0`): new feature, new prop, or new component — backward compatible
   - **major** (`x.0.0`): breaking change — API change or removed component

3. Write a short summary (it appears in the changelog).

4. Commit the generated `.changeset/<generated>.md` file together with your code.

### What happens next

- When your PR is merged into `develop`, CI (once configured) can open a “Version” PR that bumps `packages/ui` version and updates `CHANGELOG.md`.
- After that Version PR is merged, CI can publish to the private npm registry (see `SETUP.md` and internal docs).

Use **`npm run version`** to apply changesets locally (`changeset version`). Do not use **`npm version`** for this workflow — that is npm’s built-in version command.

### When not to add a changeset

For docs-only changes, internal refactors, or test-only updates that do not require a release, skip `npm run changeset`. No release will be cut without a changeset.

## Design System Tokens

When creating components, use Felix design tokens:

### Colors

```tsx
// Use semantic color classes
<div className="bg-primary text-primary-foreground">
<div className="bg-secondary text-secondary-foreground">
<div className="bg-destructive text-destructive-foreground">
```

### Typography

```tsx
// Use semantic font classes
<h1 className="font-heading">  // Plain-500
<p className="font-sans">      // Saans family
```

### Spacing & Sizing

```tsx
// Use Felix radius tokens
<div className="rounded-lg">      // --radius-lg
<button className="rounded-button"> // Pill shape
```

### Shadows

```tsx
<div className="shadow-sm">
<div className="shadow-md">
<div className="shadow-lg">
```

## Questions?

If you have questions or need help, please:

- Open a GitHub issue
- Contact the Felix design system team

Thank you for contributing! 🎉
