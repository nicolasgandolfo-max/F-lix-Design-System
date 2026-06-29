# @felix/ui Next.js Example

This example demonstrates how to use `@felix/ui` in a Next.js application.

## Setup

1. Install dependencies:

```bash
npm install @felix/ui react react-dom tailwindcss lucide-react
```

2. Configure `tailwind.config.ts`:

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

3. Import styles in `app/layout.tsx`:

```typescript
import "@felix/ui/styles.css";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

4. Use components:

```typescript
// app/page.tsx
import { Button } from "@felix/ui";

export default function Page() {
  return (
    <main>
      <h1>Welcome to Felix UI</h1>
      <Button variant="primary" size="lg">
        Get Started
      </Button>
    </main>
  );
}
```

## Dark Mode

To add dark mode toggle:

```typescript
"use client";

import { useState } from "react";
import { Button } from "@felix/ui";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  return (
    <Button onClick={toggleDarkMode} variant="outline">
      {isDark ? "Light" : "Dark"} Mode
    </Button>
  );
}
```

## Custom Fonts (Optional)

If you want to use Felix's custom fonts (Plain, Saans):

```typescript
// app/layout.tsx
import localFont from "next/font/local";

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


