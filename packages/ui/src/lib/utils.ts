import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Felix-aware tailwind-merge.
 *
 * The default tailwind-merge config only knows Tailwind's built-in
 * font-size scale (`text-xs` → `text-9xl`). Any `text-*` class it doesn't
 * recognize as a size is treated as a *color*, which causes silent class
 * drops when the same string contains both a custom size (e.g. `text-xxs`)
 * and a real text color — tw-merge thinks both are colors and keeps only
 * the last one.
 *
 * Register every custom font-size token from `tokens.ts` so they are
 * grouped correctly and don't collide with text-color utilities.
 *
 * Custom sizes registered here MUST stay in sync with
 * `typography.fontSizes` in `src/tokens/tokens.ts`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["xxs", "md", "30", "36", "60", "72"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
