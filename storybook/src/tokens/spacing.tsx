import { spacing } from "@felix/ui/tokens";
import type { TokenRow } from "../types";
import { SpacingPreview } from "../TokenTable";

function remToPx(rem: string): number {
  if (rem === "0px") return 0;
  return parseFloat(rem) * 16;
}

const USAGE_MAP: Record<string, string> = {
  "0": "No spacing",
  "1": "Tight gaps, icon padding",
  "2": "Related elements, small gaps",
  "3": "Compact component padding",
  "4": "Standard element spacing",
  "5": "Medium component gaps",
  "6": "Card padding, section gaps",
  "8": "Large component spacing",
  "10": "Section separators",
  "12": "Content section gaps",
  "16": "Page-level spacing",
  "20": "Major layout sections",
  "24": "Full-page layout gaps",
};

const TAILWIND_MAP: Record<string, string> = {
  "0": "p-0 m-0",
  "1": "p-1 gap-1",
  "2": "p-2 gap-2",
  "3": "p-3 gap-3",
  "4": "p-4 gap-4",
  "5": "p-5 gap-5",
  "6": "p-6 gap-6",
  "8": "p-8 gap-8",
  "10": "p-10 gap-10",
  "12": "p-12 gap-12",
  "16": "p-16 gap-16",
  "20": "p-20 gap-20",
  "24": "p-24 gap-24",
};

export const SPACING_ROWS: TokenRow[] = Object.entries(spacing).map(
  ([key, rem]) => ({
    token: `--spacing-${key}`,
    value: `${rem} (${remToPx(rem)}px)`,
    preview: <SpacingPreview value={rem} />,
    usage: USAGE_MAP[key] ?? "",
    tailwind: TAILWIND_MAP[key] ?? "",
  })
);
