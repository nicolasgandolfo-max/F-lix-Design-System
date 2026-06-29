import { radius } from "@felix/ui/tokens";
import type { TokenRow } from "../types";
import { RadiusPreview } from "../TokenTable";

const TAILWIND_MAP: Record<string, string> = {
  none: "rounded-none",
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

const USAGE_MAP: Record<string, string> = {
  none: "Sharp corners",
  xs: "Very subtle rounding",
  sm: "Badges, small elements",
  md: "Inputs, buttons",
  lg: "Cards, dialogs",
  xl: "Feature cards, sheets",
  "2xl": "Large promotional cards",
  "3xl": "Extra-large containers",
  full: "Pills, avatars, fully rounded",
};

function formatValue(value: string): string {
  if (value === "0px" || value === "9999px") return value;
  return `${value} (${parseFloat(value) * 16}px)`;
}

export const BORDER_RADIUS_ROWS: TokenRow[] = Object.entries(radius).map(
  ([name, value]) => ({
    token: `--radius-${name}`,
    value: formatValue(value),
    preview: <RadiusPreview className={TAILWIND_MAP[name] ?? ""} />,
    usage: USAGE_MAP[name] ?? "",
    tailwind: TAILWIND_MAP[name] ?? "",
  })
);
