# @felix/ui

Official React component library for Felix, built on [shadcn/ui](https://ui.shadcn.com/) principles with Felix's custom branding and design system.

## Features

- 🎨 **Felix Brand Theme** - Pre-configured Tailwind preset with Felix's official colors, typography, and design tokens
- 🌓 **Dark Mode Support** - Built-in dark mode with seamless transitions
- ♿ **Accessible** - Built on Radix UI primitives with ARIA compliance
- 📦 **Tree-shakeable** - ESM and CJS builds with optimal bundle sizes
- 🎭 **TypeScript First** - Fully typed with comprehensive IntelliSense
- 📖 **Storybook** - Interactive component documentation and playground
- ⚡ **Zero CSS Bundle** - Consumer compiles Tailwind utilities on-demand

## Installation

```bash
npm install @felix/ui
```

### Peer Dependencies

```bash
npm install react react-dom tailwindcss @tailwindcss/postcss lucide-react
```

## Quick Start

### 1. Configure Tailwind CSS

The Felix UI library exports components with Tailwind classes. Your project's build process compiles the CSS.

In your `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";
import felixPreset from "@felix/ui/preset";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // 👇 IMPORTANT: Include @felix/ui components
    "./node_modules/@felix/ui/dist/**/*.{js,mjs}",
  ],
  presets: [felixPreset],
} satisfies Config;
```

### 2. Configure PostCSS

Create `postcss.config.mjs`:

```javascript
import tailwindcss from "@tailwindcss/postcss";

export default {
  plugins: [tailwindcss()],
};
```

### 3. Import Tailwind in your CSS

Create a CSS file (e.g., `app/globals.css`):

```css
@import "tailwindcss";
```

### 4. Use Components

```tsx
import { Button } from "@felix/ui";

export default function App() {
  return (
    <div>
      <Button variant="primary" size="lg">
        Get Started
      </Button>
    </div>
  );
}
```

## How It Works

```
Your App                           @felix/ui Library
---------                          -----------------
tailwind.config.ts  ←── imports ── preset.ts (Felix theme)
       ↓                                  ↓
   Build time                     Component with classes:
       ↓                           <button className="bg-primary
Scans all files  ←── includes ──   rounded-button ...">
       ↓
Generates CSS
(only used utilities)
       ↓
   styles.css
```

**Key Points:**

- ✅ No pre-compiled CSS from the library
- ✅ Your build scans Felix components for Tailwind classes
- ✅ Only generates CSS for classes actually used
- ✅ Felix preset provides the theme (colors, fonts, etc.)

## Available Components

Currently exported components:

- `Button` - Primary action element with multiple variants and sizes

More components coming soon!

## Felix Tailwind Preset

The `@felix/ui/preset` provides Felix's complete design system:

### Color Palette

- **Primary**: Felix's signature cyan (`rgb(43, 242, 241)`)
- **Secondary**: Deep teal (`rgb(8, 36, 34)`)
- **Destructive**: Error red
- **Muted**, **Accent**, and more semantic colors
- Full dark mode variants

### Typography

- **Heading Font**: Plain-500 (Felix brand font)
- **Body Font**: Saans-300/400/500
- **Mono Font**: System monospace stack

### Design Tokens

- Border radius (including pill-shaped buttons via `rounded-button`)
- Box shadows (2xs through 2xl)
- Spacing and layout utilities
- Animation presets

### Customizing the Theme

You can extend or override the Felix preset:

```typescript
import felixPreset from "@felix/ui/preset";

export default {
  presets: [felixPreset],
  theme: {
    extend: {
      colors: {
        // Add custom colors
        brand: "#custom-color",
      },
    },
  },
} satisfies Config;
```

## Dark Mode

Dark mode is controlled via the `dark` class on the root element:

```tsx
// Toggle dark mode
document.documentElement.classList.toggle("dark");
```

All Felix components automatically adapt to dark mode using CSS variables.

## Development

### Running Storybook Locally

```bash
git clone <repo>
cd felix-ui
npm install
npm run storybook
```

This starts Storybook on [http://localhost:6006](http://localhost:6006) where you can:

- Browse all components interactively
- Test different variants and props
- Switch between light and dark themes
- Copy code examples

### Building the Library

```bash
npm run build
```

This generates:

- ESM output: `dist/**/*.js`
- CJS output: `dist/**/*.cjs`
- Type definitions: `dist/**/*.d.ts`
- Preset export: `dist/preset.{js,cjs,d.ts}`

**Note**: No CSS is compiled. Consumers compile Tailwind utilities themselves.

## Project Structure

```
@felix/ui/
├── src/
│   ├── components/          # React components (with Tailwind classes)
│   │   ├── button.tsx
│   │   └── button.stories.tsx
│   ├── lib/
│   │   └── utils.ts         # Utility functions (cn, etc.)
│   ├── preset.ts            # Tailwind preset (EXPORTED)
│   ├── styles.css           # For Storybook dev only
│   └── index.ts             # Main export file
├── .storybook/              # Storybook configuration
├── dist/                    # Build output (generated)
│   ├── components/
│   ├── preset.{js,cjs,d.ts} # Tailwind preset
│   └── index.{js,cjs,d.ts}  # Components
├── rollup.config.mjs        # Build configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

## Advanced Usage

### Using the `cn` Utility

The library exports a `cn` utility for merging Tailwind classes:

```tsx
import { Button, cn } from "@felix/ui";

<Button className={cn("custom-class", condition && "conditional-class")}>
  Click me
</Button>;
```

### Custom Fonts

The Felix preset references custom fonts (Plain-500, Saans). Make sure these fonts are available in your application.

**Next.js example:**

```tsx
// app/layout.tsx
import localFont from "next/font/local";
import "@/app/globals.css";

const plain = localFont({
  src: "./fonts/PlainLTStd-Black.otf",
  variable: "--font-heading",
});

const saans = localFont({
  src: [
    { path: "./fonts/SaansLTStd-Light.otf", weight: "300" },
    { path: "./fonts/SaansLTStd-Regular.otf", weight: "400" },
    { path: "./fonts/SaansLTStd-SemiBold.otf", weight: "500" },
  ],
  variable: "--font-sans",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plain.variable} ${saans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

## Next.js Setup Example

Complete setup for a Next.js app:

### 1. Install dependencies

```bash
npm install @felix/ui
npm install -D tailwindcss @tailwindcss/postcss
```

### 2. `tailwind.config.ts`

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

### 3. `postcss.config.mjs`

```javascript
import tailwindcss from "@tailwindcss/postcss";

export default {
  plugins: [tailwindcss()],
};
```

### 4. `app/globals.css`

```css
@import "tailwindcss";
```

### 5. `app/layout.tsx`

```tsx
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### 6. Use components

```tsx
import { Button } from "@felix/ui";

export default function Page() {
  return <Button variant="primary">Click me</Button>;
}
```

## FAQ

### Why don't you ship compiled CSS?

**Modern best practice**: Let the consumer's build process compile Tailwind. This provides:

- ✅ **Smaller bundles** - Only used utilities are generated
- ✅ **No duplication** - Single Tailwind compilation
- ✅ **Customizable** - Consumers can extend/override the theme
- ✅ **Tree-shaking** - Unused components don't add CSS weight

This is how shadcn/ui, Radix UI themes, and other modern component libraries work.

### Do I need to install Tailwind CSS?

**Yes**. Tailwind CSS and `@tailwindcss/postcss` are peer dependencies. You need them in your project to compile the Felix components.

### Can I use this without Tailwind?

**No**. Felix UI components use Tailwind utility classes. The library requires Tailwind CSS to function.

### What version of Tailwind do you support?

**Tailwind CSS v4** - We use the latest version with the new `@import "tailwindcss"` syntax.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for workflow and code guidelines.

**Releases and semver (Changesets):** [docs/VERSIONING.md](./docs/VERSIONING.md).

## License

MIT

## Support

For issues, questions, or contributions, please contact the Felix design system team.

---

Built with ❤️ by the Felix team
