# @felix/ui Architecture

## Zero-CSS Component Library Pattern

@felix/ui follows modern component library best practices by **NOT** shipping compiled CSS. Instead:

1. **Library exports:**
   - ✅ React components (with Tailwind utility classes)
   - ✅ Tailwind preset (theme configuration)
   - ❌ NO pre-compiled CSS file

2. **Consumer compiles:**
   - Consumer's build process scans library components
   - Tailwind generates only the utilities actually used
   - Results in smaller, optimized bundles

## Why This Architecture?

### Benefits

- **Smaller Bundles**: Only used Tailwind utilities are generated
- **No Duplication**: Single compilation point (consumer's build)
- **Tree-Shaking**: Unused components don't add CSS weight
- **Customizable**: Consumers can extend/override the preset
- **Modern Standard**: How shadcn/ui, Radix Themes, and others work

### Comparison

```
❌ OLD WAY (Most libraries pre-2023)
Library:    Components + Compiled CSS → dist/styles.css
Consumer:   import '@lib/styles.css'
Result:     Large CSS bundle with unused styles

✅ NEW WAY (@felix/ui)
Library:    Components (with classes) + Preset → dist/
Consumer:   Tailwind scans library components
Result:     Optimized CSS with only used utilities
```

## Build Output

### What Gets Built

```
dist/
├── components/
│   ├── button.js         # ESM: React component with Tailwind classes
│   ├── button.cjs        # CJS: Same component
│   └── button.d.ts       # TypeScript types
├── preset.js             # ESM: Tailwind configuration
├── preset.cjs            # CJS: Tailwind configuration
├── preset.d.ts           # TypeScript types
├── index.js              # Main entry (ESM)
├── index.cjs             # Main entry (CJS)
└── index.d.ts            # Main types
```

### What DOESN'T Get Built

- ❌ `dist/styles.css` - NO compiled CSS
- ❌ `dist/*.css` - NO CSS files at all

## How Consumers Use It

### 1. Install

```bash
npm install @felix/ui
npm install -D tailwindcss @tailwindcss/postcss
```

### 2. Configure Tailwind

```typescript
// tailwind.config.ts
import felixPreset from "@felix/ui/preset";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@felix/ui/dist/**/*.{js,mjs}", // ← Scan library
  ],
  presets: [felixPreset], // ← Apply Felix theme
};
```

### 3. Configure PostCSS

```javascript
// postcss.config.mjs
import tailwindcss from "@tailwindcss/postcss";

export default {
  plugins: [tailwindcss()],
};
```

### 4. Import Tailwind

```css
/* app/globals.css */
@import "tailwindcss";
```

### 5. Use Components

```tsx
import { Button } from "@felix/ui";

// Tailwind classes in Button get compiled by consumer's build
<Button variant="primary">Click me</Button>;
```

## Build Process

### Library Build (Rollup)

```javascript
// rollup.config.mjs
export default [
  {
    input: ["src/index.ts", "src/preset.ts"],
    output: [
      { dir: "dist", format: "esm" }, // .js files
      { dir: "dist", format: "cjs" }, // .cjs files
    ],
    plugins: [
      peerDepsExternal(), // Don't bundle peer deps
      typescript(), // Compile TS to JS
      preserveDirectives(), // Keep "use client"
      // ❌ NO postcss plugin
    ],
  },
  {
    input: ["src/index.ts", "src/preset.ts"],
    output: { dir: "dist" },
    plugins: [dts()], // Generate .d.ts files
  },
];
```

**Key Points:**

- NO `rollup-plugin-postcss` - CSS is NOT compiled
- Components are pure JS with Tailwind class strings
- Preserves "use client" directives for React Server Components

### Consumer Build (Next.js example)

```
Consumer runs `next build`:
1. PostCSS runs with @tailwindcss/postcss
2. Tailwind scans:
   - ./app/**/*.tsx              (consumer's files)
   - ./node_modules/@felix/ui/** (library files)
3. Finds: <button className="bg-primary rounded-button">
4. Generates CSS for: bg-primary, rounded-button
5. Uses Felix preset for values:
   - --color-primary: rgb(43, 242, 241)
   - --radius-button: 999px
6. Outputs optimized CSS bundle
```

## Development (Storybook)

For local development, we need to compile Tailwind so we can preview components.

### Storybook-Only Files

```
src/styles.css           # Used ONLY by Storybook
postcss.config.mjs       # Used ONLY by Storybook
tailwind.config.ts       # Used ONLY by Storybook
```

These files:

- ✅ Enable preview during development
- ❌ Are NOT included in build output
- ❌ Are NOT used by consumers

### Storybook Configuration

```typescript
// .storybook/main.ts
export default {
  framework: "@storybook/react-vite",
  // Vite automatically picks up postcss.config.mjs
};
```

```typescript
// .storybook/preview.ts
import "../src/styles.css"; // Loads Tailwind for preview
```

When you run `npm run storybook`:

1. Vite loads `src/styles.css`
2. PostCSS processes it with `@tailwindcss/postcss`
3. Tailwind scans `src/**/*.tsx` for classes
4. Generates CSS using `tailwind.config.ts` (which uses the preset)
5. Components render with Felix styles

## Technology Stack

### Tailwind CSS v4

We use Tailwind CSS v4 with the new syntax:

```css
/* src/styles.css */
@import "tailwindcss"; /* v4 syntax */
```

```javascript
// postcss.config.mjs
import tailwindcss from "@tailwindcss/postcss"; // v4 plugin

export default {
  plugins: [tailwindcss()],
};
```

**Why v4?**

- Faster builds
- Better PostCSS integration
- Simpler configuration
- Modern `@import` syntax

### Peer Dependencies

```json
{
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "lucide-react": "^0.561.0"
  }
}
```

**Why peer dependencies?**

- Consumer controls the versions
- No version conflicts
- Smaller install size
- Standard library pattern

## Felix Preset Deep Dive

The preset is the **single source of truth** for Felix branding.

### What It Exports

```typescript
// src/preset.ts
const felixPreset: Partial<Config> = {
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        /* CSS variables */
      },
      fontFamily: {
        /* Custom fonts */
      },
      borderRadius: {
        /* Brand radii */
      },
      boxShadow: {
        /* Elevation system */
      },
    },
  },
  plugins: [
    addBase({
      /* CSS variable definitions */
    }),
  ],
};

export default felixPreset;
```

### How It Works

1. **CSS Variables via `addBase()`**:

   ```typescript
   addBase({
     ":root": {
       "--color-primary": "43 242 241",
       "--radius-button": "999px",
       // ... all Felix variables
     },
     ".dark": {
       "--color-primary": "...", // Dark mode overrides
     },
   });
   ```

2. **Tailwind Theme Extension**:

   ```typescript
   colors: {
     primary: "rgb(var(--color-primary) / <alpha-value>)",
   }
   ```

3. **Consumers use it**:
   ```tsx
   <button className="bg-primary">  // Uses --color-primary
   ```

### Benefits

- ✅ Single source of truth
- ✅ Dark mode via CSS variables
- ✅ Consumers can override variables
- ✅ No hardcoded color values in components

## File Structure

```
@felix/ui/
├── src/
│   ├── components/           # React components
│   │   ├── button.tsx        # Component with Tailwind classes
│   │   └── *.stories.tsx     # Storybook stories
│   ├── lib/
│   │   └── utils.ts          # cn() utility
│   ├── preset.ts             # 🎯 EXPORTED: Tailwind preset
│   ├── index.ts              # 🎯 EXPORTED: Components
│   ├── styles.css            # ⚠️  DEV ONLY: Storybook CSS
│   └── ...
├── .storybook/               # ⚠️  DEV ONLY: Preview config
├── dist/                     # 🎯 BUILD OUTPUT
│   ├── components/
│   ├── preset.{js,cjs,d.ts}
│   └── index.{js,cjs,d.ts}
├── rollup.config.mjs         # Build configuration
├── postcss.config.mjs        # ⚠️  DEV ONLY: For Storybook
├── tailwind.config.ts        # ⚠️  DEV ONLY: For Storybook
├── package.json
└── README.md
```

**Legend:**

- 🎯 EXPORTED: Used by consumers
- ⚠️ DEV ONLY: Not in build output

## Common Patterns

### Adding a New Component

1. **Create component** with Tailwind classes:

   ```tsx
   // src/components/card.tsx
   "use client";

   export function Card({ children }) {
     return <div className="rounded-lg border bg-card p-6">{children}</div>;
   }
   ```

2. **Export in index**:

   ```typescript
   // src/index.ts
   export { Card } from "./components/card";
   ```

3. **Build**:

   ```bash
   npm run build
   ```

4. **Consumer uses it**:

   ```tsx
   import { Card } from "@felix/ui";

   // Their build compiles: rounded-lg, border, bg-card, p-6
   <Card>Content</Card>;
   ```

### Adding a Theme Token

1. **Add CSS variable to preset**:

   ```typescript
   // src/preset.ts
   addBase({
     ":root": {
       "--color-accent": "255 100 50",
     },
   });
   ```

2. **Add Tailwind utility**:

   ```typescript
   theme: {
     extend: {
       colors: {
         accent: "rgb(var(--color-accent) / <alpha-value>)",
       }
     }
   }
   ```

3. **Use in components**:
   ```tsx
   <button className="bg-accent">
   ```

## Testing Strategy

### Storybook (Visual Testing)

```bash
npm run storybook
```

- Preview all variants
- Test dark mode
- Verify styles match design
- Generate documentation

### Type Checking

```bash
npm run typecheck
```

- Verify TypeScript types
- Catch type errors before build

### Build Test

```bash
npm run build
```

- Verify Rollup config works
- Check output structure
- Ensure no CSS is compiled

## Troubleshooting

### "Styles not working in consumer app"

**Check:**

1. ✅ Added library to Tailwind `content` paths?
2. ✅ Imported Felix preset in `tailwind.config.ts`?
3. ✅ Created `postcss.config.mjs`?
4. ✅ Imported `@import "tailwindcss"` in CSS?

### "Dark mode not working"

**Check:**

1. ✅ Added `dark` class to HTML element?
2. ✅ Felix preset is loaded (provides CSS variables)?

### "Custom fonts not showing"

**Check:**

1. ✅ Font files exist in consumer's `public/fonts/`?
2. ✅ Font variables defined in consumer's layout?

## Next Steps

1. ✅ Zero-CSS architecture implemented
2. ✅ Tailwind v4 support
3. ✅ Preset as single source of truth
4. ⏳ Test Storybook with v4
5. ⏳ Migrate more components from payments-ui
6. ⏳ Document all components
7. ⏳ Publish to npm registry

## References

- [Tailwind CSS v4 docs](https://tailwindcss.com/docs)
- [shadcn/ui architecture](https://ui.shadcn.com/)
- [Rollup docs](https://rollupjs.org/)
- [Storybook with Vite](https://storybook.js.org/docs/react/builders/vite)
