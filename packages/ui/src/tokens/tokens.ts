/**
 * Felix Design System — Token Source of Truth
 *
 * This file is the SINGLE source of truth for all design tokens.
 * DO NOT edit theme.css directly — run `npm run build:tokens` to regenerate it.
 *
 * To add or change a token:
 *   1. Edit this file
 *   2. Run `npm run build:tokens` from the repo root
 *   3. Commit both tokens.ts and the regenerated theme.css
 */

// ─── Brand Colors (named palette) ────────────────────────────────────────────
// Maps to CSS: --{name}: {value}  (camelCase → kebab-case)

export const brandColors = {
  turquoise: "#2bf2f1",
  slate: "#082422",
  concrete: "#cfcabf",
  stone: "#efebe7",
  linen: "#fefcf9",
  blueberry: "#6060bf",
  evergreen: "#35605f",
  mocha: "#877867",
  papaya: "#f26629",
  sky: "#8dfdfa",
  cactus: "#60d06f",
  yam: "#c1a98a",
  mango: "#f19d38",
  "light-sky": "#d4fffe",
  lime: "#dcff00",
  lychee: "#ffcd9c",
  fortuna: "#ffb05a",
  sage: "#7ba882",
  "sage-700": "#4e7d56",
} as const;

// ─── Color Scales ─────────────────────────────────────────────────────────────
// Maps to CSS: --{prefix}-{step}: {value}

export const turquoiseScale = {
  50: "#f0fffe",
  100: "#d4fffe",
  200: "#a8fffe",
  300: "#8dfdfa",
  400: "#5af5f4",
  500: "#2bf2f1",
  600: "#1abfbe",
  700: "#0f8c8b",
  800: "#065958",
  900: "#023333",
} as const;

export const slateScale = {
  50: "#e8f4f3",
  100: "#c3e2e1",
  200: "#97cbc9",
  300: "#6ab3b1",
  400: "#4d9290",
  500: "#35605f",
  600: "#234343",
  700: "#152b2a",
  800: "#082422",
  900: "#031312",
} as const;

export const neutralScale = {
  50: "#ffffff",
  100: "#fefcf9",
  200: "#efebe7",
  300: "#ddd9cf",
  400: "#cfcabf",
  500: "#adaa9e",
  600: "#8a8780",
  700: "#636158",
  800: "#3e3c35",
  900: "#1c1b16",
} as const;

export const earthScale = {
  50: "#fbf8f4",
  100: "#f2e9de",
  200: "#e3d3ba",
  300: "#d4bd9f",
  400: "#c1a98a",
  500: "#a58e72",
  600: "#877867",
  700: "#6b5e50",
  800: "#4f4438",
  900: "#332d23",
} as const;

export const greenScale = {
  50: "#eefbf0",
  100: "#d4f5da",
  200: "#aaebb4",
  300: "#82e091",
  400: "#60d06f",
  500: "#42b552",
  600: "#2d9a3c",
  700: "#1b7a29",
  800: "#0e5a1a",
  900: "#053a0d",
} as const;

export const orangeScale = {
  50: "#fff5ef",
  100: "#ffe2cc",
  200: "#ffc299",
  300: "#ff9f66",
  400: "#f77b42",
  500: "#f26629",
  600: "#cc4d14",
  700: "#a03808",
  800: "#742703",
  900: "#481600",
} as const;

export const amberScale = {
  50: "#fff8ee",
  100: "#ffefd5",
  200: "#ffe0b2",
  300: "#ffcd9c",
  400: "#ffb05a",
  500: "#f19d38",
  600: "#d07a1a",
  700: "#a85c0a",
  800: "#7a4004",
  900: "#502800",
} as const;

export const blueberryScale = {
  50: "#f2eeff",
  100: "#ddd5ff",
  200: "#bbabff",
  300: "#9882f5",
  400: "#6e58d8",
  500: "#3b2e8c",
  600: "#2a1f6b",
  700: "#1c1249",
  800: "#100a30",
  900: "#07041a",
} as const;

export const limeScale = {
  50: "#fefff0",
  100: "#fbffd6",
  200: "#f5ffa3",
  300: "#eaff57",
  400: "#dcff00",
  500: "#b2d000",
  600: "#87a000",
  700: "#5e7000",
  800: "#364000",
  900: "#181c00",
} as const;

export const yellowScale = {
  50: "#fffce0",
  100: "#fff7b0",
  200: "#ffef70",
  300: "#ffe53a",
  400: "#ffd91a",
  500: "#ffd200",
  600: "#ccaa00",
  700: "#998000",
  800: "#665500",
  900: "#332a00",
} as const;

// ─── Semantic Colors ──────────────────────────────────────────────────────────
// Maps to CSS: --{name}: {value} in :root (light) and .dark (dark)

export const semanticLight = {
  background: "#fefcf9",
  foreground: "#082422",
  card: "#fefcf9",
  "card-foreground": "#082422",
  popover: "#ffffff",
  "popover-foreground": "#082422",
  primary: "#2bf2f1",
  "primary-foreground": "#082422",
  secondary: "#adaa9e",
  "secondary-foreground": "#082422",
  muted: "#efebe7",
  "muted-foreground": "#6ab3b1",
  accent: "#dcff00",
  "accent-foreground": "#082422",
  destructive: "#f26629",
  "destructive-foreground": "#082422",
  border: "#cfcabf",
  input: "#877867",
  ring: "#877867",
  link: "#10a8a7",
} as const;

export const semanticDark = {
  background: "#082422", // slate/800
  foreground: "#fefcf9", // neutral/100
  card: "#234343", // slate/600
  "card-foreground": "#fefcf9",
  popover: "#152b2a", // slate/700
  "popover-foreground": "#082422", // = dark background
  primary: "#2bf2f1", // turquoise/500
  "primary-foreground": "#082422",
  secondary: "#35605f", // slate/500
  "secondary-foreground": "#fefcf9",
  muted: "#152b2a", // slate/700
  "muted-foreground": "#cfcabf", // neutral/400
  accent: "#b2d000", // lime/500
  "accent-foreground": "#082422",
  destructive: "#f26629", // orange/500
  "destructive-foreground": "#082422",
  border: "#35605f", // slate/500
  input: "#35605f", // slate/500
  ring: "#cfcabf", // neutral/400
} as const;

// ─── Charts ───────────────────────────────────────────────────────────────────
// Maps to CSS: --chart-{n}: {value}

export const charts = {
  1: "#2bf2f1", // turquoise/500
  2: "#42b552", // green/500
  3: "#f19d38", // amber/500
  4: "#6e58d8", // blueberry/400
  5: "#f77b42", // orange/400
} as const;

export const chartsDark = {
  1: "#5af5f4", // turquoise/400
  2: "#60d06f", // green/400
  3: "#ffb05a", // amber/400
  4: "#9882f5", // blueberry/300
  5: "#ff9f66", // orange/300
} as const;

// ─── Spacing ──────────────────────────────────────────────────────────────────
// Maps to CSS: --spacing-{name}: {value}
// Keys match Figma's 4px base grid numeric scale exactly.

export const spacing = {
  "0": "0px",
  "1": "0.25rem", // 4px
  "2": "0.5rem", // 8px
  "3": "0.75rem", // 12px
  "4": "1rem", // 16px
  "5": "1.25rem", // 20px
  "6": "1.5rem", // 24px
  "7": "1.75rem", // 28px — calendar day-cell primitive (Figma 578-4531)
  "8": "2rem", // 32px
  "10": "2.5rem", // 40px
  "12": "3rem", // 48px
  "16": "4rem", // 64px
  "20": "5rem", // 80px
  "24": "6rem", // 96px
} as const;

// ─── Border Width ─────────────────────────────────────────────────────────────
// Maps to CSS: --border-width-{name}: {value}
// Matches Figma's "borders/weight" primitives.

export const borderWidths = {
  thin: "1px",
  medium: "1.5px",
  thick: "2px",
} as const;

// ─── Border Radius ────────────────────────────────────────────────────────────
// Full 9-step scale matching Figma's "Felix · Spacing & Shape" node (2:382).
// Maps to CSS: --radius-{name}: {value}

export const radius = {
  none: "0px",
  xs: "0.125rem", // 2px
  sm: "0.25rem", // 4px
  md: "0.5rem", // 8px
  lg: "0.75rem", // 12px
  xl: "1rem", // 16px
  "2xl": "1.5rem", // 24px
  "3xl": "2rem", // 32px
  full: "9999px",
} as const;

// ─── Shadows ──────────────────────────────────────────────────────────────────
// Maps to CSS: --shadow-{name}: {value}

export const shadows = {
  xs: "0 1px 2px rgba(8, 36, 34, 0.03)",
  sm: "0 1px 3px rgba(8, 36, 34, 0.06), 0 1px 2px rgba(8, 36, 34, 0.04)",
  md: "0 4px 6px rgba(8, 36, 34, 0.06), 0 2px 4px rgba(8, 36, 34, 0.04)",
  lg: "0 10px 15px rgba(8, 36, 34, 0.06), 0 4px 6px rgba(8, 36, 34, 0.03)",
  xl: "0 20px 25px rgba(8, 36, 34, 0.06), 0 8px 10px rgba(8, 36, 34, 0.03)",
  "2xl": "0 25px 50px rgba(8, 36, 34, 0.12)",
  inner: "inset 0 2px 4px rgba(8, 36, 34, 0.04)",
  turquoise: "0 4px 14px rgba(43, 242, 241, 0.25)",
  // Soft outset turquoise glow used to mark a "selected" state on
  // interactive cards (e.g. ChoiceCard). 6px spread, 10% opacity.
  selection: "0 0 0 6px rgba(43, 242, 241, 0.1)",
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────

export const typography = {
  // Maps to CSS: --text-{name}: {value}
  // Keys match Figma's Default.tokens.json typography/Size primitives exactly.
  fontSizes: {
    xxs: "0.6875rem", // 11px
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    md: "1.125rem", // 18px
    lg: "1.25rem", // 20px
    xl: "1.5rem", // 24px
    "2xl": "1.75rem", // 28px
    "3xl": "2rem", // 32px
    "4xl": "2.5rem", // 40px
    "5xl": "3rem", // 48px
    "6xl": "3.5rem", // 56px
    "7xl": "4rem", // 64px
    "8xl": "5rem", // 80px
    "30": "1.875rem", // 30px — heading-2 text size
    "36": "2.25rem", // 36px — heading-1 text size
    "60": "3.75rem", // 60px — display-lg text size
    "72": "4.5rem", // 72px — display-xl text size
  },
  // Maps to CSS: --leading-{name}: {value}
  // Names match Figma primitives. Absolute values (42px, 36px, 24px) expressed
  // as unitless ratios relative to the paired semantic text size.
  lineHeights: {
    none: "1", // 100%
    display: "1.1", // 110%
    tight: "1.2", // 120% — Figma: tight
    snug: "1.35", // 135% — Figma: snug
    normal: "1.5", // 150% — Figma: normal
    relaxed: "1.65", // 165% — Figma: relaxed
    loose: "2", // 200% — Figma: loose
    "heading-2": "1.4", // 42px ÷ 30px heading-2 size
    "heading-3": "1.5", // 36px ÷ 24px heading-3 size
    body: "1.5", // 24px ÷ 16px body size
  },
  // Maps to CSS: --tracking-{name}: {value}
  // Values in em (Figma stores as % — divide by 100 to get em fraction).
  letterSpacing: {
    tighter: "-.05em", // -5%
    tight: "-.025em", // -2.5%
    normal: "0",
    wide: ".025em", // 2.5%
    wider: ".05em", // 5%
    display: "-.02em", // -2%
    heading: "-.01em", // -1%
    caption: "0.0025em", // 0.25% — Figma Default.tokens.json primitive value
  },
  // Maps to CSS: --font-{name}: {value}
  // Keys match Figma's Default.tokens.json typography/Weight primitives exactly.
  fontWeights: {
    light: "300",
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },
  // Maps to CSS custom properties via fonts.css @font-face declarations
  fonts: {
    heading: '"Plain-500", serif',
    sans: '"Saans-300", system-ui, sans-serif',
    mono: "ui-monospace, monospace",
  },
} as const;

// ─── Interactive State Colors ─────────────────────────────────────────────────
// Maps to CSS: --interactive-{variant}-{state}: {value}

export const interactiveColors = {
  "primary-hover": "#1abfbe",
  "primary-active": "#2bf2f1",
  "primary-disabled": "#d4fffe",
  "secondary-hover": "#adaa9e",
  "secondary-active": "#cfcabf",
  "secondary-disabled": "#f2e9de",
  "ghost-hover": "#efebe7",
  "ghost-active": "#fefcf9",
  "ghost-disabled": "#fefcf9",
  "danger-hover": "#cc4d14",
  "danger-active": "#f26629",
  "danger-disabled": "#fff5ef",
  "slate-hover": "#152b2a",
  "slate-active": "#234343",
  "slate-disabled": "#c3e2e1",
} as const;

// ─── Interactive State Colors (Dark Mode) ────────────────────────────────────
// Maps to CSS: --interactive-{variant}-{state}: {value} inside .dark {}

export const interactiveColorsDark = {
  "primary-hover": "#8dfdfa", // turquoise/300
  "primary-active": "#2bf2f1", // turquoise/500 (= dark --primary)
  "primary-disabled": "#023333", // turquoise/900
  "secondary-hover": "#ddd9cf", // neutral/300
  "secondary-active": "#adaa9e", // neutral/500
  "secondary-disabled": "#3e3c35", // neutral/800
  "ghost-hover": "#234343", // slate/600 (= dark --card)
  "ghost-active": "#082422", // slate/800 (= dark --background)
  "ghost-disabled": "#082422", // slate/800 (= dark --background)
  "danger-hover": "#ffc299", // orange/200
  "danger-active": "#f26629", // orange/500 (= dark --destructive)
  "danger-disabled": "#742703", // orange/800
  "slate-hover": "#e8f4f3", // slate/50
  "slate-active": "#97cbc9", // slate/200
  "slate-disabled": "#234343", // slate/600
} as const;

// ─── Status Colors ────────────────────────────────────────────────────────────
// Maps to CSS: --status-{name}: {value}

export const statusColors = {
  "success-bg": "#eefbf0",
  success: "#60d06f",
  "success-text": "#1b7a29",
  "warning-bg": "#fffce0",
  warning: "#ffd200",
  "warning-text": "#665500",
  "error-bg": "#fff5ef",
  error: "#f26629",
  "error-text": "#a03808",
  "info-bg": "#f2eeff",
  info: "#3b2e8c",
  "info-text": "#1c1249",
} as const;

// ─── Animation ────────────────────────────────────────────────────────────────

export const animation = {
  fadeIn: "fade-in 0.3s ease-in-out",
} as const;
