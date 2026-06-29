import { typography } from "@felix/ui/tokens";
import type { TokenRow, FontWeightItem } from "../types";
import { TextPreview } from "../TokenTable";

function remToPx(rem: string): number {
  return parseFloat(rem) * 16;
}

const FONT_SIZE_USAGE: Record<string, string> = {
  caption: "Caption — Labels, metadata",
  "body-sm": "Body Small — Fine print, notes",
  body: "Body — Default paragraph text",
  "body-lg": "Body Large — Emphasized paragraphs",
  "heading-4": "Heading 4 — Small section titles",
  "heading-3": "Heading 3 — Subsection titles",
  "heading-2": "Heading 2 — Section titles",
  "heading-1": "Heading 1 — Page titles",
  "display-md": "Display MD — Medium display text",
  "display-lg": "Display LG — Large display text",
  "display-xl": "Display XL — Hero headlines",
};

const FONT_SIZE_TAILWIND: Record<string, string> = {
  caption: "text-xs",
  "body-sm": "text-sm",
  body: "text-base",
  "body-lg": "text-lg",
  "heading-4": "text-xl",
  "heading-3": "text-2xl",
  "heading-2": "text-3xl",
  "heading-1": "text-4xl",
  "display-md": "text-5xl",
  "display-lg": "text-6xl",
  "display-xl": "text-7xl",
};

export const TEXT_SIZE_ROWS: TokenRow[] = Object.entries(
  typography.fontSizes
).map(([key, rem]) => ({
  token: `--text-${key}`,
  value: `${rem} (${remToPx(rem)}px)`,
  preview: <TextPreview size={rem} />,
  usage: FONT_SIZE_USAGE[key] ?? "",
  tailwind: FONT_SIZE_TAILWIND[key] ?? "",
}));

const LINE_HEIGHT_USAGE: Record<string, string> = {
  none: "Display XL, Display LG",
  display: "Display MD",
  "heading-1": "Heading 1",
  "heading-2": "Heading 2",
  "heading-3": "Heading 3, Caption",
  "heading-4": "Heading 4, Body Small",
  body: "Body, Body Large",
};

export const LINE_HEIGHT_ROWS: TokenRow[] = Object.entries(
  typography.lineHeights
).map(([key, value]) => ({
  token: `--leading-${key}`,
  value,
  usage: LINE_HEIGHT_USAGE[key] ?? "",
  tailwind: `leading-${key}`,
}));

export const LETTER_SPACING_ROWS: TokenRow[] = [
  {
    token: "--tracking-display",
    value: typography.letterSpacing.display,
    preview: (
      <span
        style={{
          fontFamily: "sans-serif",
          letterSpacing: typography.letterSpacing.display,
          fontWeight: 700,
          fontSize: 14,
        }}
      >
        FELIX PAGO
      </span>
    ),
    usage: "Display XL, Display LG",
    tailwind: "tracking-display",
  },
  {
    token: "--tracking-heading",
    value: typography.letterSpacing.heading,
    preview: (
      <span
        style={{
          fontFamily: "sans-serif",
          letterSpacing: typography.letterSpacing.heading,
          fontWeight: 700,
          fontSize: 14,
        }}
      >
        FELIX PAGO
      </span>
    ),
    usage: "Display MD, Heading 1",
    tailwind: "tracking-heading",
  },
  {
    token: "--tracking-normal",
    value: typography.letterSpacing.normal,
    preview: (
      <span
        style={{
          fontFamily: "sans-serif",
          letterSpacing: typography.letterSpacing.normal,
          fontWeight: 600,
          fontSize: 14,
        }}
      >
        FELIX PAGO
      </span>
    ),
    usage: "Heading 2–4, Body text",
    tailwind: "tracking-normal",
  },
  {
    token: "--tracking-caption",
    value: typography.letterSpacing.caption,
    preview: (
      <span
        style={{
          fontFamily: "sans-serif",
          letterSpacing: typography.letterSpacing.caption,
          fontSize: 14,
        }}
      >
        FELIX PAGO
      </span>
    ),
    usage: "Caption, uppercase text",
    tailwind: "tracking-caption",
  },
];

const FONT_WEIGHT_USAGE: Record<string, string> = {
  light: "Light emphasis",
  normal: "Default body text",
  medium: "Medium emphasis",
  semibold: "Strong emphasis, buttons",
  bold: "Headings, important text",
  extrabold: "Display headlines",
};

const TAILWIND_WEIGHT: Record<string, string> = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

export const FONT_WEIGHT_ITEMS: FontWeightItem[] = Object.entries(
  typography.fontWeights
).map(([key, value]) => ({
  token: `--font-${key}`,
  value,
  weight: parseInt(value, 10),
  tailwind: TAILWIND_WEIGHT[key] ?? `font-${key}`,
  usage: FONT_WEIGHT_USAGE[key] ?? "",
}));
