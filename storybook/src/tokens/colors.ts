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
  interactiveColors,
  interactiveColorsDark,
  statusColors,
} from "@felix/ui/tokens";
import type { ColorToken, SemanticGroup } from "../types";

export const BRAND_TOKENS: ColorToken[] = [
  {
    token: "--turquoise",
    hex: brandColors.turquoise,
    description: "Primary brand color",
  },
  {
    token: "--slate",
    hex: brandColors.slate,
    description: "Secondary brand color",
  },
  {
    token: "--concrete",
    hex: brandColors.concrete,
    description: "Warm gray neutral",
  },
  {
    token: "--stone",
    hex: brandColors.stone,
    description: "Light warm neutral",
  },
  {
    token: "--linen",
    hex: brandColors.linen,
    description: "Off-white background",
  },
  {
    token: "--blueberry",
    hex: brandColors.blueberry,
    description: "Secondary accent",
  },
  {
    token: "--evergreen",
    hex: brandColors.evergreen,
    description: "Dark green accent",
  },
  { token: "--mocha", hex: brandColors.mocha, description: "Brown accent" },
  {
    token: "--papaya",
    hex: brandColors.papaya,
    description: "Orange/error accent",
  },
  { token: "--sky", hex: brandColors.sky, description: "Light cyan accent" },
  {
    token: "--cactus",
    hex: brandColors.cactus,
    description: "Green/success accent",
  },
  { token: "--yam", hex: brandColors.yam, description: "Tan accent" },
  { token: "--mango", hex: brandColors.mango, description: "Orange accent" },
  {
    token: "--light-sky",
    hex: brandColors["light-sky"],
    description: "Very light cyan",
  },
  {
    token: "--lime",
    hex: brandColors.lime,
    description: "Yellow-green accent",
  },
  { token: "--lychee", hex: brandColors.lychee, description: "Peach accent" },
  {
    token: "--fortuna",
    hex: brandColors.fortuna,
    description: "Light orange accent",
  },
  { token: "--sage", hex: brandColors.sage, description: "Muted green accent" },
];

function toScaleTokens(
  name: string,
  scale: Record<number, string>
): ColorToken[] {
  return Object.entries(scale).map(([step, hex]) => ({
    token: `--${name}-${step}`,
    hex,
    description: `${name.charAt(0).toUpperCase() + name.slice(1)} ${step}`,
  }));
}

export const TURQUOISE_SCALE = toScaleTokens("turquoise", turquoiseScale);
export const SLATE_SCALE = toScaleTokens("slate", slateScale);
export const NEUTRAL_SCALE = toScaleTokens("neutral", neutralScale);
export const EARTH_SCALE = toScaleTokens("earth", earthScale);
export const GREEN_SCALE = toScaleTokens("green", greenScale);
export const ORANGE_SCALE = toScaleTokens("orange", orangeScale);
export const AMBER_SCALE = toScaleTokens("amber", amberScale);
export const BLUEBERRY_SCALE = toScaleTokens("blueberry", blueberryScale);
export const LIME_SCALE = toScaleTokens("lime", limeScale);
export const YELLOW_SCALE = toScaleTokens("yellow", yellowScale);

export const COLOR_SCALE_GROUPS: Array<{
  label: string;
  tokens: ColorToken[];
}> = [
  { label: "Turquoise", tokens: TURQUOISE_SCALE },
  { label: "Slate", tokens: SLATE_SCALE },
  { label: "Neutral", tokens: NEUTRAL_SCALE },
  { label: "Earth", tokens: EARTH_SCALE },
  { label: "Green", tokens: GREEN_SCALE },
  { label: "Orange", tokens: ORANGE_SCALE },
  { label: "Amber", tokens: AMBER_SCALE },
  { label: "Blueberry", tokens: BLUEBERRY_SCALE },
  { label: "Lime", tokens: LIME_SCALE },
  { label: "Yellow", tokens: YELLOW_SCALE },
];

// ─── Color Palettes (for ScalePalette component) ─────────────────────────────
// Enriches each scale with a subtitle and brand alias annotations at key steps.

type PaletteStep = { step: number; hex: string; alias?: string };
type Palette = { name: string; subtitle: string; steps: PaletteStep[] };

function toPaletteSteps(
  scale: Record<number, string>,
  aliases: Partial<Record<number, string>>
): PaletteStep[] {
  return Object.entries(scale).map(([s, hex]) => ({
    step: Number(s),
    hex,
    alias: aliases[Number(s)],
  }));
}

export const COLOR_PALETTES: Palette[] = [
  {
    name: "Turquoise",
    subtitle: "Primary",
    steps: toPaletteSteps(turquoiseScale, {
      100: "Light Sky",
      300: "Sky",
      500: "Turquoise",
    }),
  },
  {
    name: "Slate",
    subtitle: "Secondary",
    steps: toPaletteSteps(slateScale, {
      500: "Evergreen",
      800: "Slate",
    }),
  },
  {
    name: "Neutral",
    subtitle: "Base",
    steps: toPaletteSteps(neutralScale, {
      100: "Linen",
      200: "Stone",
      400: "Concrete",
    }),
  },
  {
    name: "Earth",
    subtitle: "Warm Brown",
    steps: toPaletteSteps(earthScale, {
      400: "Yam",
      600: "Mocha",
    }),
  },
  {
    name: "Green",
    subtitle: "Cactus",
    steps: toPaletteSteps(greenScale, {
      400: "Cactus",
    }),
  },
  {
    name: "Orange",
    subtitle: "Papaya",
    steps: toPaletteSteps(orangeScale, {
      500: "Papaya",
    }),
  },
  {
    name: "Amber",
    subtitle: "Mango",
    steps: toPaletteSteps(amberScale, {
      300: "Lychee",
      400: "Fortuna",
      500: "Mango",
    }),
  },
  {
    name: "Blueberry",
    subtitle: "Accent",
    steps: toPaletteSteps(blueberryScale, {
      500: "Blueberry",
    }),
  },
  {
    name: "Lime",
    subtitle: "Chartreuse",
    steps: toPaletteSteps(limeScale, {
      400: "Lime",
    }),
  },
  {
    name: "Yellow",
    subtitle: "Warning",
    steps: toPaletteSteps(yellowScale, {}),
  },
];

// ─── Reverse hex → scale reference lookup ────────────────────────────────────
// Used to auto-annotate color cells with their primitive scale origin.

const _hexToScaleRef = new Map<string, string>();
for (const [name, scale] of [
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
] as [string, Record<number, string>][]) {
  for (const [step, hex] of Object.entries(scale)) {
    _hexToScaleRef.set(hex.toLowerCase(), `${name}/${step}`);
  }
}

function enrichWithRefs(groups: SemanticGroup[]): SemanticGroup[] {
  return groups.map((g) => ({
    ...g,
    tokens: g.tokens.map((t) => ({
      ...t,
      lightRef: _hexToScaleRef.get(t.light.toLowerCase()),
      darkRef: t.dark ? _hexToScaleRef.get(t.dark.toLowerCase()) : undefined,
    })),
  }));
}

// For tokens that are mode-invariant (dark === light), derive dark from light
// before running enrichWithRefs so darkRef is also populated.
function invariantDark(groups: SemanticGroup[]): SemanticGroup[] {
  return enrichWithRefs(
    groups.map((g) => ({
      ...g,
      tokens: g.tokens.map((t) => ({ ...t, dark: t.dark ?? t.light })),
    }))
  );
}

export const SEMANTIC_GROUPS: SemanticGroup[] = enrichWithRefs([
  {
    label: "Base",
    tokens: [
      {
        token: "--background",
        light: semanticLight.background,
        dark: semanticDark.background,
        description: "Page & container backgrounds",
      },
      {
        token: "--foreground",
        light: semanticLight.foreground,
        dark: semanticDark.foreground,
        description: "Primary text",
      },
    ],
  },
  {
    label: "Card",
    tokens: [
      {
        token: "--card",
        light: semanticLight.card,
        dark: semanticDark.card,
        description: "Card backgrounds",
      },
      {
        token: "--card-foreground",
        light: semanticLight["card-foreground"],
        dark: semanticDark["card-foreground"],
        description: "Card text",
      },
    ],
  },
  {
    label: "Popover",
    tokens: [
      {
        token: "--popover",
        light: semanticLight.popover,
        dark: semanticDark.popover,
        description: "Popover/dropdown surface",
      },
      {
        token: "--popover-foreground",
        light: semanticLight["popover-foreground"],
        dark: semanticDark["popover-foreground"],
        description: "Text in popover",
      },
    ],
  },
  {
    label: "Primary",
    tokens: [
      {
        token: "--primary",
        light: semanticLight.primary,
        dark: semanticDark.primary,
        description: "Primary actions & accents",
      },
      {
        token: "--primary-foreground",
        light: semanticLight["primary-foreground"],
        dark: semanticDark["primary-foreground"],
        description: "Text on primary",
      },
    ],
  },
  {
    label: "Secondary",
    tokens: [
      {
        token: "--secondary",
        light: semanticLight.secondary,
        dark: semanticDark.secondary,
        description: "Secondary actions",
      },
      {
        token: "--secondary-foreground",
        light: semanticLight["secondary-foreground"],
        dark: semanticDark["secondary-foreground"],
        description: "Text on secondary",
      },
    ],
  },
  {
    label: "Muted",
    tokens: [
      {
        token: "--muted",
        light: semanticLight.muted,
        dark: semanticDark.muted,
        description: "Muted backgrounds",
      },
      {
        token: "--muted-foreground",
        light: semanticLight["muted-foreground"],
        dark: semanticDark["muted-foreground"],
        description: "Muted / secondary text",
      },
    ],
  },
  {
    label: "Accent",
    tokens: [
      {
        token: "--accent",
        light: semanticLight.accent,
        dark: semanticDark.accent,
        description: "Accent highlights",
      },
      {
        token: "--accent-foreground",
        light: semanticLight["accent-foreground"],
        dark: semanticDark["accent-foreground"],
        description: "Text on accent",
      },
    ],
  },
  {
    label: "Destructive",
    tokens: [
      {
        token: "--destructive",
        light: semanticLight.destructive,
        dark: semanticDark.destructive,
        description: "Error & destructive actions",
      },
      {
        token: "--destructive-foreground",
        light: semanticLight["destructive-foreground"],
        dark: semanticDark["destructive-foreground"],
        description: "Text on destructive",
      },
    ],
  },
  {
    label: "UI",
    tokens: [
      {
        token: "--border",
        light: semanticLight.border,
        dark: semanticDark.border,
        description: "Borders & dividers",
      },
      {
        token: "--input",
        light: semanticLight.input,
        dark: semanticDark.input,
        description: "Input border",
      },
      {
        token: "--ring",
        light: semanticLight.ring,
        dark: semanticDark.ring,
        description: "Focus ring",
      },
      { token: "--link", light: semanticLight.link, description: "Link color" },
    ],
  },
  {
    label: "Charts",
    tokens: [
      {
        token: "--chart-1",
        light: charts[1],
        dark: chartsDark[1],
        description: "Chart color 1",
      },
      {
        token: "--chart-2",
        light: charts[2],
        dark: chartsDark[2],
        description: "Chart color 2",
      },
      {
        token: "--chart-3",
        light: charts[3],
        dark: chartsDark[3],
        description: "Chart color 3",
      },
      {
        token: "--chart-4",
        light: charts[4],
        dark: chartsDark[4],
        description: "Chart color 4",
      },
      {
        token: "--chart-5",
        light: charts[5],
        dark: chartsDark[5],
        description: "Chart color 5",
      },
    ],
  },
]);

export const INTERACTIVE_GROUPS: SemanticGroup[] = enrichWithRefs([
  {
    label: "Primary",
    tokens: [
      {
        token: "--interactive-primary-hover",
        light: interactiveColors["primary-hover"],
        dark: interactiveColorsDark["primary-hover"],
        description: "Primary hover color for interactive elements",
      },
      {
        token: "--interactive-primary-active",
        light: interactiveColors["primary-active"],
        dark: interactiveColorsDark["primary-active"],
        description: "Primary active/pressed color",
      },
      {
        token: "--interactive-primary-disabled",
        light: interactiveColors["primary-disabled"],
        dark: interactiveColorsDark["primary-disabled"],
        description: "Primary disabled state",
      },
    ],
  },
  {
    label: "Secondary",
    tokens: [
      {
        token: "--interactive-secondary-hover",
        light: interactiveColors["secondary-hover"],
        dark: interactiveColorsDark["secondary-hover"],
        description: "Secondary hover color for interactive elements",
      },
      {
        token: "--interactive-secondary-active",
        light: interactiveColors["secondary-active"],
        dark: interactiveColorsDark["secondary-active"],
        description: "Secondary active/pressed color",
      },
      {
        token: "--interactive-secondary-disabled",
        light: interactiveColors["secondary-disabled"],
        dark: interactiveColorsDark["secondary-disabled"],
        description: "Secondary disabled state",
      },
    ],
  },
  {
    label: "Ghost",
    tokens: [
      {
        token: "--interactive-ghost-hover",
        light: interactiveColors["ghost-hover"],
        dark: interactiveColorsDark["ghost-hover"],
        description: "Ghost hover color for interactive elements",
      },
      {
        token: "--interactive-ghost-active",
        light: interactiveColors["ghost-active"],
        dark: interactiveColorsDark["ghost-active"],
        description: "Ghost active/pressed color",
      },
      {
        token: "--interactive-ghost-disabled",
        light: interactiveColors["ghost-disabled"],
        dark: interactiveColorsDark["ghost-disabled"],
        description: "Ghost disabled state",
      },
    ],
  },
  {
    label: "Danger",
    tokens: [
      {
        token: "--interactive-danger-hover",
        light: interactiveColors["danger-hover"],
        dark: interactiveColorsDark["danger-hover"],
        description: "Danger hover color for interactive elements",
      },
      {
        token: "--interactive-danger-active",
        light: interactiveColors["danger-active"],
        dark: interactiveColorsDark["danger-active"],
        description: "Danger active/pressed color",
      },
      {
        token: "--interactive-danger-disabled",
        light: interactiveColors["danger-disabled"],
        dark: interactiveColorsDark["danger-disabled"],
        description: "Danger disabled state",
      },
    ],
  },
  {
    label: "Slate",
    tokens: [
      {
        token: "--interactive-slate-hover",
        light: interactiveColors["slate-hover"],
        dark: interactiveColorsDark["slate-hover"],
        description: "Slate hover color for interactive elements",
      },
      {
        token: "--interactive-slate-active",
        light: interactiveColors["slate-active"],
        dark: interactiveColorsDark["slate-active"],
        description: "Slate active/pressed color",
      },
      {
        token: "--interactive-slate-disabled",
        light: interactiveColors["slate-disabled"],
        dark: interactiveColorsDark["slate-disabled"],
        description: "Slate disabled state",
      },
    ],
  },
]);

export const STATUS_GROUPS: SemanticGroup[] = invariantDark([
  {
    label: "Success",
    tokens: [
      {
        token: "--status-success-bg",
        light: statusColors["success-bg"],
        description: "Success transparent surface",
      },
      {
        token: "--status-success",
        light: statusColors.success,
        description: "Success indicator & icon color",
      },
      {
        token: "--status-success-text",
        light: statusColors["success-text"],
        description: "Success message text",
      },
    ],
  },
  {
    label: "Warning",
    tokens: [
      {
        token: "--status-warning-bg",
        light: statusColors["warning-bg"],
        description: "Warning background surface",
      },
      {
        token: "--status-warning",
        light: statusColors.warning,
        description: "Warning indicator & icon color",
      },
      {
        token: "--status-warning-text",
        light: statusColors["warning-text"],
        description: "Warning text color",
      },
    ],
  },
  {
    label: "Error",
    tokens: [
      {
        token: "--status-error-bg",
        light: statusColors["error-bg"],
        description: "Error transparent background surface",
      },
      {
        token: "--status-error",
        light: statusColors.error,
        description: "Error indicator & icon color",
      },
      {
        token: "--status-error-text",
        light: statusColors["error-text"],
        description: "Error message text",
      },
    ],
  },
  {
    label: "Info",
    tokens: [
      {
        token: "--status-info-bg",
        light: statusColors["info-bg"],
        description: "Info transparent background surface",
      },
      {
        token: "--status-info",
        light: statusColors.info,
        description: "Info indicator & icon color",
      },
      {
        token: "--status-info-text",
        light: statusColors["info-text"],
        description: "Info message text",
      },
    ],
  },
]);
