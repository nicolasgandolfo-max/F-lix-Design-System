import type { CustomProjectConfig } from "lost-pixel";

export const config: CustomProjectConfig = {
  storybookShots: {
    storybookUrl: "http://localhost:6006",
  },
  // 0.1% pixel difference tolerated (handles sub-pixel anti-aliasing)
  threshold: 0.1,
  // Screenshots live in the repo — committed as baseline reference
  imagePathBaseline: ".lostpixel/baseline",
  imagePathCurrent: ".lostpixel/current",
  imagePathDifference: ".lostpixel/difference",
};
