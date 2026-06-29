/**
 * build-tokens.ts
 *
 * Generates packages/ui/src/theme.css from the TypeScript token source of truth.
 * Run: npm run build:tokens (from packages/ui)
 *
 * The generated file has three sections:
 *   1. :root {}     — light-mode CSS custom properties (generated)
 *   2. .dark {}     — dark-mode overrides (generated)
 *   3. @theme inline / @layer base — Tailwind v4 config (static template)
 */

import { writeFileSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
// Note: tsx resolves .js → .ts automatically. The .js extension is intentional for ESM.
import {
  brandColors,
  turquoiseScale,
  slateScale,
  neutralScale,
  earthScale,
  greenScale,
  orangeScale,
  amberScale,
  blueberryScale,
  limeScale,
  yellowScale,
  semanticLight,
  semanticDark,
  charts,
  chartsDark,
  spacing,
  borderWidths,
  radius,
  shadows,
  typography,
  interactiveColors,
  interactiveColorsDark,
  statusColors,
} from "../src/tokens/tokens.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const OUTPUT_PATH = resolve(__dirname, "../src/theme.css");

// ─── Helpers ──────────────────────────────────────────────────────────────────

function indent(line: string, spaces = 2): string {
  return `${" ".repeat(spaces)}${line}`;
}

function vars(entries: Record<string, string>, prefix = ""): string[] {
  return Object.entries(entries).map(([key, value]) => {
    const varName = prefix ? `--${prefix}-${key}` : `--${key}`;
    return indent(`${varName}: ${value};`);
  });
}

// ─── :root block ──────────────────────────────────────────────────────────────

function buildRoot(): string {
  const lines: string[] = [":root {"];

  // Brand colors
  lines.push(...vars(brandColors));

  // Color scales
  const colorScales: [string, Record<number, string>][] = [
    ["turquoise", turquoiseScale],
    ["slate", slateScale],
    ["neutral", neutralScale],
    ["earth", earthScale],
    ["green", greenScale],
    ["orange", orangeScale],
    ["amber", amberScale],
    ["blueberry", blueberryScale],
    ["lime", limeScale],
    ["yellow", yellowScale],
  ];
  for (const [name, scale] of colorScales) {
    lines.push(
      ...Object.entries(scale).map(([step, value]) =>
        indent(`--${name}-${step}: ${value};`)
      )
    );
  }

  // Semantic (light)
  lines.push(...vars(semanticLight));

  // Charts
  lines.push(
    ...Object.entries(charts).map(([n, value]) =>
      indent(`--chart-${n}: ${value};`)
    )
  );

  // Spacing
  lines.push(...vars(spacing, "spacing"));

  // Border widths
  lines.push(...vars(borderWidths, "border-width"));

  // Radius — full scale
  lines.push(
    ...Object.entries(radius).map(([key, value]) =>
      indent(`--radius-${key}: ${value};`)
    )
  );

  // Typography — font sizes
  lines.push(
    ...Object.entries(typography.fontSizes).map(([key, value]) =>
      indent(`--text-${key}: ${value};`)
    )
  );

  // Typography — line heights
  lines.push(
    ...Object.entries(typography.lineHeights).map(([key, value]) =>
      indent(`--leading-${key}: ${value};`)
    )
  );

  // Typography — letter spacing
  lines.push(
    ...Object.entries(typography.letterSpacing).map(([key, value]) =>
      indent(`--tracking-${key}: ${value};`)
    )
  );

  // Typography — font weights
  lines.push(
    ...Object.entries(typography.fontWeights).map(([key, value]) =>
      indent(`--font-${key}: ${value};`)
    )
  );

  // Shadows
  lines.push(...vars(shadows, "shadow"));

  // Interactive state colors
  lines.push(...vars(interactiveColors, "interactive"));

  // Status colors
  lines.push(...vars(statusColors, "status"));

  lines.push("}");
  return lines.join("\n");
}

// ─── .dark block ──────────────────────────────────────────────────────────────

function buildDark(): string {
  const lines: string[] = [".dark {"];

  // Semantic overrides
  lines.push(...vars(semanticDark));

  // Chart colors differ in dark mode
  lines.push(
    ...Object.entries(chartsDark).map(([n, value]) =>
      indent(`--chart-${n}: ${value};`)
    )
  );

  // Interactive state colors differ in dark mode
  lines.push(...vars(interactiveColorsDark, "interactive"));

  // Status colors are the same in both modes (mode-invariant)
  lines.push(...vars(statusColors, "status"));

  lines.push("}");
  return lines.join("\n");
}

// ─── @theme inline block (static — Tailwind v4 config, not token values) ─────

const THEME_INLINE = `@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  /*
   * Brand primary scale (turquoise). Exposed so components can reach for
   * mode-invariant primitives when a semantic token isn't a fit — e.g. the
   * soft brand surface used by the default Toast / Alert variant.
   */
  --color-turquoise-50: var(--turquoise-50);
  --color-turquoise-100: var(--turquoise-100);
  --color-turquoise-200: var(--turquoise-200);
  --color-turquoise-300: var(--turquoise-300);
  --color-turquoise-400: var(--turquoise-400);
  --color-turquoise-500: var(--turquoise-500);
  --color-turquoise-600: var(--turquoise-600);
  --color-turquoise-700: var(--turquoise-700);
  --color-turquoise-800: var(--turquoise-800);
  --color-turquoise-900: var(--turquoise-900);
  --color-interactive-primary-hover: var(--interactive-primary-hover);
  --color-interactive-primary-active: var(--interactive-primary-active);
  --color-interactive-primary-disabled: var(--interactive-primary-disabled);
  --color-interactive-secondary-hover: var(--interactive-secondary-hover);
  --color-interactive-secondary-active: var(--interactive-secondary-active);
  --color-interactive-secondary-disabled: var(--interactive-secondary-disabled);
  --color-interactive-ghost-hover: var(--interactive-ghost-hover);
  --color-interactive-ghost-active: var(--interactive-ghost-active);
  --color-interactive-ghost-disabled: var(--interactive-ghost-disabled);
  --color-interactive-danger-hover: var(--interactive-danger-hover);
  --color-interactive-danger-active: var(--interactive-danger-active);
  --color-interactive-danger-disabled: var(--interactive-danger-disabled);
  --color-interactive-slate-hover: var(--interactive-slate-hover);
  --color-interactive-slate-active: var(--interactive-slate-active);
  --color-interactive-slate-disabled: var(--interactive-slate-disabled);
  --color-status-success-bg: var(--status-success-bg);
  --color-status-success: var(--status-success);
  --color-status-success-text: var(--status-success-text);
  --color-status-warning-bg: var(--status-warning-bg);
  --color-status-warning: var(--status-warning);
  --color-status-warning-text: var(--status-warning-text);
  --color-status-error-bg: var(--status-error-bg);
  --color-status-error: var(--status-error);
  --color-status-error-text: var(--status-error-text);
  --color-status-info-bg: var(--status-info-bg);
  --color-status-info: var(--status-info);
  --color-status-info-text: var(--status-info-text);
  --font-sans: var(--font-sans);
  --font-heading: var(--font-heading);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);

  --tracking-tighter: var(--tracking-tighter);
  --tracking-tight: var(--tracking-tight);
  --tracking-normal: var(--tracking-normal);
  --tracking-wide: var(--tracking-wide);
  --tracking-wider: var(--tracking-wider);
  --tracking-display: var(--tracking-display);
  --tracking-heading: var(--tracking-heading);
  --tracking-caption: var(--tracking-caption);

  --font-weight-light: var(--font-light);
  --font-weight-regular: var(--font-regular);
  --font-weight-medium: var(--font-medium);
  --font-weight-semibold: var(--font-semibold);
  --font-weight-bold: var(--font-bold);
  --font-weight-extrabold: var(--font-extrabold);

  --leading-none: var(--leading-none);
  --leading-display: var(--leading-display);
  --leading-tight: var(--leading-tight);
  --leading-snug: var(--leading-snug);
  --leading-normal: var(--leading-normal);
  --leading-relaxed: var(--leading-relaxed);
  --leading-loose: var(--leading-loose);
  --leading-heading-2: var(--leading-heading-2);
  --leading-heading-3: var(--leading-heading-3);
  --leading-body: var(--leading-body);

  --text-xxs: var(--text-xxs);
  --text-xs: var(--text-xs);
  --text-sm: var(--text-sm);
  --text-base: var(--text-base);
  --text-md: var(--text-md);
  --text-lg: var(--text-lg);
  --text-xl: var(--text-xl);
  --text-2xl: var(--text-2xl);
  --text-3xl: var(--text-3xl);
  --text-4xl: var(--text-4xl);
  --text-5xl: var(--text-5xl);
  --text-6xl: var(--text-6xl);
  --text-7xl: var(--text-7xl);
  --text-8xl: var(--text-8xl);
  --text-30: var(--text-30);
  --text-36: var(--text-36);
  --text-60: var(--text-60);
  --text-72: var(--text-72);

  --radius-none: var(--radius-none);
  --radius-xs: var(--radius-xs);
  --radius-sm: var(--radius-sm);
  --radius-md: var(--radius-md);
  --radius-lg: var(--radius-lg);
  --radius-xl: var(--radius-xl);
  --radius-2xl: var(--radius-2xl);
  --radius-3xl: var(--radius-3xl);
  --radius-full: var(--radius-full);
  --radius-button: calc(var(--radius-xl) + 999px);

  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);
  --shadow-inner: var(--shadow-inner);
  --shadow-turquoise: var(--shadow-turquoise);

  --animate-fade-in: fade-in 0.3s ease-in-out;
  --animate-overlay-in: overlay-in 0.2s ease-out;
  --animate-overlay-out: overlay-out 0.2s ease-in;
  --animate-dialog-overlay-in: dialog-overlay-in 0.2s ease-out;
  --animate-dialog-overlay-out: dialog-overlay-out 0.15s ease-in;
  --animate-dialog-content-in: dialog-content-in 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  --animate-dialog-content-out: dialog-content-out 0.15s ease-in;
  --animate-popover-content-in: popover-content-in 0.15s cubic-bezier(0.16, 1, 0.3, 1);
  --animate-popover-content-out: popover-content-out 0.1s ease-in;
  --animate-slide-in-from-right: slide-in-from-right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  --animate-slide-out-to-right: slide-out-to-right 0.2s ease-in;
  --animate-slide-in-from-left: slide-in-from-left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  --animate-slide-out-to-left: slide-out-to-left 0.2s ease-in;
  --animate-slide-in-from-top: slide-in-from-top 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  --animate-slide-out-to-top: slide-out-to-top 0.2s ease-in;
  --animate-slide-in-from-bottom: slide-in-from-bottom 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  --animate-slide-out-to-bottom: slide-out-to-bottom 0.2s ease-in;
  --animate-dots-pulse: dots-pulse 1.4s ease-in-out infinite both;

  /*
   * Generic collapse animations.
   *
   * Reusable for any collapsible-style primitive (Accordion, Disclosure,
   * Drawer, etc.). The consumer is responsible for setting
   * \`--collapse-content-height\` to the measured content height — typically
   * by bridging it from a primitive-specific variable, e.g.:
   *
   *   style={{ "--collapse-content-height": "var(--radix-accordion-content-height)" }}
   */
  --animate-collapse-down: collapse-down 0.2s ease-out;
  --animate-collapse-up: collapse-up 0.2s ease-out;

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes overlay-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes overlay-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes dialog-overlay-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes dialog-overlay-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  /* NOTE: these animate scale + opacity only. The panel's -50%/-50%
     centering is owned by Tailwind's \`translate\` property on the
     content element, so keyframes must not also drive \`transform:
     translate(...)\` or the two stack and fling the panel off-center. */
  @keyframes dialog-content-in {
    from {
      opacity: 0;
      transform: scale(0.5);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes dialog-content-out {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0);
    }
  }

  /* Open/close motion for any anchored floating panel (DropdownMenu,
     Popover, Tooltip, etc.). Just a small fade + scale — translation
     comes from popper positioning, not the keyframes. */
  @keyframes popover-content-in {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes popover-content-out {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.96);
    }
  }

  /* Generic edge-anchored slide animations.
     Reusable for any panel anchored to a viewport edge (Sheet, Drawer,
     Toast, etc.). Keyframes only drive transform + opacity — the panel's
     position (top/right/bottom/left) is owned by its layout classes. */
  @keyframes slide-in-from-right {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slide-out-to-right {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }

  @keyframes slide-in-from-left {
    from {
      opacity: 0;
      transform: translateX(-100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slide-out-to-left {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(-100%);
    }
  }

  @keyframes slide-in-from-top {
    from {
      opacity: 0;
      transform: translateY(-100%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slide-out-to-top {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-100%);
    }
  }

  @keyframes slide-in-from-bottom {
    from {
      opacity: 0;
      transform: translateY(100%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slide-out-to-bottom {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(100%);
    }
  }

  @keyframes dots-pulse {
    0%,
    80%,
    100% {
      opacity: 0.3;
      transform: scale(0.75);
    }
    40% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes collapse-down {
    from {
      height: 0;
    }
    to {
      height: var(--collapse-content-height);
    }
  }

  @keyframes collapse-up {
    from {
      height: var(--collapse-content-height);
    }
    to {
      height: 0;
    }
  }
}`;

// ─── @layer base block (static) ───────────────────────────────────────────────

const LAYER_BASE = `@layer base {
  * {
    box-sizing: border-box;
  }

  body {
    font-family: var(--font-sans);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-heading);
  }

  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}`;

// ─── File header ──────────────────────────────────────────────────────────────

const HEADER = `/**
 * Felix UI Theme - Tailwind CSS v4
 *
 * ⚠️  GENERATED FILE — do not edit manually.
 * Edit packages/ui/src/tokens/tokens.ts and run \`npm run build:tokens\`.
 *
 * @example
 * // In your app's CSS:
 * @import "tailwindcss";
 * @import "@felix/ui/fonts.css";  // Optional: if using Felix fonts
 * @import "@felix/ui/theme.css";
 */`;

// ─── Main ─────────────────────────────────────────────────────────────────────

function main(): void {
  const output =
    [HEADER, buildRoot(), buildDark(), THEME_INLINE, LAYER_BASE].join("\n\n") +
    "\n";

  // Only write if content changed (avoids unnecessary git diffs)
  let existing = "";
  try {
    existing = readFileSync(OUTPUT_PATH, "utf-8");
  } catch {
    // File doesn't exist yet — first run
  }

  if (existing === output) {
    console.log("✓ theme.css is already up to date");
    return;
  }

  writeFileSync(OUTPUT_PATH, output, "utf-8");
  console.log("✓ theme.css regenerated from tokens.ts");
}

main();
