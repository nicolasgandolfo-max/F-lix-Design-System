import type {
  brandColors,
  semanticLight,
  spacing,
  shadows,
  typography,
} from "./tokens";

export {
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
  radius,
  shadows,
  typography,
  animation,
  interactiveColors,
  interactiveColorsDark,
  statusColors,
} from "./tokens";

// ─── Derived types ────────────────────────────────────────────────────────────

export type BrandColorToken = keyof typeof brandColors;
export type SemanticColorToken = keyof typeof semanticLight;
export type SpacingToken = keyof typeof spacing;
export type ShadowToken = keyof typeof shadows;
export type FontSizeToken = keyof (typeof typography)["fontSizes"];
export type FontWeightToken = keyof (typeof typography)["fontWeights"];
export type LineHeightToken = keyof (typeof typography)["lineHeights"];
export type LetterSpacingToken = keyof (typeof typography)["letterSpacing"];
