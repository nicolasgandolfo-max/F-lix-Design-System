import { shadows } from "@felix/ui/tokens";
import type { TokenRow } from "../types";
import { ShadowPreview } from "../TokenTable";

export const SHADOW_ROWS: TokenRow[] = Object.entries(shadows).map(
  ([key, value]) => ({
    token: `--shadow-${key}`,
    value,
    preview: <ShadowPreview shadow={value} />,
    tailwind: `shadow-${key}`,
  })
);
