# Migration to Tailwind v4 and Zero-CSS Architecture

## What Changed

@felix/ui now follows modern component library best practices:

### Before (v1.0.0)

- ❌ Library compiled CSS
- ❌ Consumers imported `@felix/ui/styles.css`
- ❌ Tailwind v4 alpha caused issues
- ❌ Duplicate CSS compilation

### After (v1.1.0+)

- ✅ Library exports components + preset only
- ✅ Consumer compiles Tailwind utilities
- ✅ Tailwind v4 stable support
- ✅ Single compilation, smaller bundles

## Breaking Changes

### Removed Export

```diff
- import '@felix/ui/styles.css';  // ❌ No longer exists
```

### Required Setup

Consumers MUST now:

1. Install Tailwind CSS v4:

```bash
npm install -D tailwindcss @tailwindcss/postcss
```

2. Configure `tailwind.config.ts`:

```typescript
import felixPreset from "@felix/ui/preset";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@felix/ui/dist/**/*.{js,mjs}", // ← Required!
  ],
  presets: [felixPreset],
};
```

3. Configure `postcss.config.mjs`:

```javascript
import tailwindcss from "@tailwindcss/postcss";

export default {
  plugins: [tailwindcss()],
};
```

4. Import Tailwind in your CSS:

```css
@import "tailwindcss";
```

## Migration Steps for Existing Projects

If you were using v1.0.0:

### Step 1: Remove old import

```diff
// app/layout.tsx or similar
- import '@felix/ui/styles.css';
```

### Step 2: Install Tailwind CSS

```bash
npm install -D tailwindcss @tailwindcss/postcss
```

### Step 3: Create/update `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";
import felixPreset from "@felix/ui/preset";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@felix/ui/dist/**/*.{js,mjs}",
  ],
  presets: [felixPreset],
} satisfies Config;
```

### Step 4: Create `postcss.config.mjs`

```javascript
import tailwindcss from "@tailwindcss/postcss";

export default {
  plugins: [tailwindcss()],
};
```

### Step 5: Create/update your CSS file

```css
/* app/globals.css or similar */
@import "tailwindcss";
```

### Step 6: Import CSS in your layout

```tsx
// app/layout.tsx
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

## Benefits

✅ **Smaller bundles** - Only used Tailwind utilities are generated  
✅ **Tree-shaking** - Unused components don't add CSS  
✅ **Customizable** - Override/extend the Felix preset  
✅ **Modern** - Follows shadcn/ui and Radix patterns  
✅ **Tailwind v4** - Latest features and performance

## Troubleshooting

### "Module not found: @felix/ui/styles.css"

**Solution**: Remove the import. See Step 1 above.

### "Tailwind classes not working"

**Solution**: Make sure you:

1. Added Felix UI to Tailwind content paths
2. Created postcss.config.mjs
3. Imported `@import "tailwindcss"` in your CSS

### "Styles look wrong"

**Solution**: Ensure the Felix preset is loaded:

```typescript
// tailwind.config.ts
import felixPreset from "@felix/ui/preset";

export default {
  presets: [felixPreset], // ← Must be present
  // ...
};
```

## Support

Questions? Open an issue or contact the Felix design system team.
