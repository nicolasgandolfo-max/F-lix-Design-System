export type AnimationCategory =
  | "fade"
  | "overlay"
  | "dialog"
  | "popover"
  | "slide"
  | "collapse"
  | "loop"
  | "tailwind-built-in";

export type AnimationTrigger = "mount" | "loop";

export type AnimationShape =
  | "tile"
  | "tooltip"
  | "panel"
  | "popover"
  | "overlay"
  | "slide"
  | "collapse"
  | "dots"
  | "spinner"
  | "pulse";

export type SlideEdge = "right" | "left" | "top" | "bottom";

export interface AnimationRow {
  /** CSS variable name, e.g. `--animate-fade-in`. `"—"` if N/A. */
  token: string;
  /** Tailwind utility class, e.g. `animate-fade-in`. */
  tailwind: string;
  /** Full CSS shorthand value, e.g. `fade-in 0.3s ease-in-out`. */
  shorthand: string;
  /** Standalone duration string, e.g. `0.3s`. */
  duration: string;
  /** Standalone timing function, e.g. `ease-in-out`. */
  easing: string;
  /** Whether the animation runs forever. */
  iteration?: "infinite";
  category: AnimationCategory;
  /** Drives how the preview is wired up. */
  trigger: AnimationTrigger;
  /** Visual shape of the demo element. */
  shape: AnimationShape;
  /** Direction hint for `shape: "slide"` rows. */
  slideFrom?: SlideEdge;
  /** Components in the library that consume this animation. */
  usedBy: string[];
  /** Optional caveat shown beneath the preview. */
  notes?: string;
}

// ─── Felix `--animate-*` tokens (theme.css 456–486) ───────────────────────────

export const FELIX_ANIMATIONS: AnimationRow[] = [
  {
    token: "--animate-fade-in",
    tailwind: "animate-fade-in",
    shorthand: "fade-in 0.3s ease-in-out",
    duration: "0.3s",
    easing: "ease-in-out",
    category: "fade",
    trigger: "mount",
    shape: "tooltip",
    usedBy: ["Tooltip"],
    notes: "Drops in from -8px translateY with a 0 → 1 opacity ramp.",
  },
  {
    token: "--animate-overlay-in",
    tailwind: "animate-overlay-in",
    shorthand: "overlay-in 0.2s ease-out",
    duration: "0.2s",
    easing: "ease-out",
    category: "overlay",
    trigger: "mount",
    shape: "overlay",
    usedBy: ["Sheet (overlay)", "Drawer (overlay)"],
  },
  {
    token: "--animate-overlay-out",
    tailwind: "animate-overlay-out",
    shorthand: "overlay-out 0.2s ease-in",
    duration: "0.2s",
    easing: "ease-in",
    category: "overlay",
    trigger: "mount",
    shape: "overlay",
    usedBy: ["Sheet (overlay)", "Drawer (overlay)"],
  },
  {
    token: "--animate-dialog-overlay-in",
    tailwind: "animate-dialog-overlay-in",
    shorthand: "dialog-overlay-in 0.2s ease-out",
    duration: "0.2s",
    easing: "ease-out",
    category: "dialog",
    trigger: "mount",
    shape: "overlay",
    usedBy: ["Dialog (overlay)"],
  },
  {
    token: "--animate-dialog-overlay-out",
    tailwind: "animate-dialog-overlay-out",
    shorthand: "dialog-overlay-out 0.15s ease-in",
    duration: "0.15s",
    easing: "ease-in",
    category: "dialog",
    trigger: "mount",
    shape: "overlay",
    usedBy: ["Dialog (overlay)"],
  },
  {
    token: "--animate-dialog-content-in",
    tailwind: "animate-dialog-content-in",
    shorthand: "dialog-content-in 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
    duration: "0.2s",
    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    category: "dialog",
    trigger: "mount",
    shape: "panel",
    usedBy: ["Dialog (content)"],
    notes:
      "Scales 0.5 → 1 with opacity. Translation is owned by the consumer's positioning, not the keyframes.",
  },
  {
    token: "--animate-dialog-content-out",
    tailwind: "animate-dialog-content-out",
    shorthand: "dialog-content-out 0.15s ease-in",
    duration: "0.15s",
    easing: "ease-in",
    category: "dialog",
    trigger: "mount",
    shape: "panel",
    usedBy: ["Dialog (content)"],
  },
  {
    token: "--animate-popover-content-in",
    tailwind: "animate-popover-content-in",
    shorthand: "popover-content-in 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
    duration: "0.15s",
    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    category: "popover",
    trigger: "mount",
    shape: "popover",
    usedBy: ["Popover", "HoverCard", "Select", "DropdownMenu"],
    notes:
      "Subtle fade + scale (0.96 → 1). Translation comes from popper positioning.",
  },
  {
    token: "--animate-popover-content-out",
    tailwind: "animate-popover-content-out",
    shorthand: "popover-content-out 0.1s ease-in",
    duration: "0.1s",
    easing: "ease-in",
    category: "popover",
    trigger: "mount",
    shape: "popover",
    usedBy: ["Popover", "HoverCard", "Select", "DropdownMenu"],
  },
  {
    token: "--animate-slide-in-from-right",
    tailwind: "animate-slide-in-from-right",
    shorthand: "slide-in-from-right 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    duration: "0.3s",
    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    category: "slide",
    trigger: "mount",
    shape: "slide",
    slideFrom: "right",
    usedBy: ["Sheet (right side)"],
  },
  {
    token: "--animate-slide-out-to-right",
    tailwind: "animate-slide-out-to-right",
    shorthand: "slide-out-to-right 0.2s ease-in",
    duration: "0.2s",
    easing: "ease-in",
    category: "slide",
    trigger: "mount",
    shape: "slide",
    slideFrom: "right",
    usedBy: ["Sheet (right side)"],
  },
  {
    token: "--animate-slide-in-from-left",
    tailwind: "animate-slide-in-from-left",
    shorthand: "slide-in-from-left 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    duration: "0.3s",
    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    category: "slide",
    trigger: "mount",
    shape: "slide",
    slideFrom: "left",
    usedBy: ["Sheet (left side)"],
  },
  {
    token: "--animate-slide-out-to-left",
    tailwind: "animate-slide-out-to-left",
    shorthand: "slide-out-to-left 0.2s ease-in",
    duration: "0.2s",
    easing: "ease-in",
    category: "slide",
    trigger: "mount",
    shape: "slide",
    slideFrom: "left",
    usedBy: ["Sheet (left side)"],
  },
  {
    token: "--animate-slide-in-from-top",
    tailwind: "animate-slide-in-from-top",
    shorthand: "slide-in-from-top 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    duration: "0.3s",
    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    category: "slide",
    trigger: "mount",
    shape: "slide",
    slideFrom: "top",
    usedBy: ["Sheet (top side)"],
  },
  {
    token: "--animate-slide-out-to-top",
    tailwind: "animate-slide-out-to-top",
    shorthand: "slide-out-to-top 0.2s ease-in",
    duration: "0.2s",
    easing: "ease-in",
    category: "slide",
    trigger: "mount",
    shape: "slide",
    slideFrom: "top",
    usedBy: ["Sheet (top side)"],
  },
  {
    token: "--animate-slide-in-from-bottom",
    tailwind: "animate-slide-in-from-bottom",
    shorthand: "slide-in-from-bottom 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
    duration: "0.3s",
    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    category: "slide",
    trigger: "mount",
    shape: "slide",
    slideFrom: "bottom",
    usedBy: ["Sheet (bottom side)"],
  },
  {
    token: "--animate-slide-out-to-bottom",
    tailwind: "animate-slide-out-to-bottom",
    shorthand: "slide-out-to-bottom 0.2s ease-in",
    duration: "0.2s",
    easing: "ease-in",
    category: "slide",
    trigger: "mount",
    shape: "slide",
    slideFrom: "bottom",
    usedBy: ["Sheet (bottom side)"],
  },
  {
    token: "--animate-dots-pulse",
    tailwind: "animate-dots-pulse",
    shorthand: "dots-pulse 1.4s ease-in-out infinite both",
    duration: "1.4s",
    easing: "ease-in-out",
    iteration: "infinite",
    category: "loop",
    trigger: "loop",
    shape: "dots",
    usedBy: ["Dots"],
    notes:
      "Three-dot loader. Dots stagger via `animation-delay: 0.16s` and `0.32s` set per-dot in component code. The demo here is the actual `Dots` atom.",
  },
  {
    token: "--animate-collapse-down",
    tailwind: "animate-collapse-down",
    shorthand: "collapse-down 0.2s ease-out",
    duration: "0.2s",
    easing: "ease-out",
    category: "collapse",
    trigger: "mount",
    shape: "collapse",
    usedBy: ["Accordion", "Collapse"],
    notes:
      "Consumer must set `--collapse-content-height` (e.g. via `--radix-accordion-content-height`).",
  },
  {
    token: "--animate-collapse-up",
    tailwind: "animate-collapse-up",
    shorthand: "collapse-up 0.2s ease-out",
    duration: "0.2s",
    easing: "ease-out",
    category: "collapse",
    trigger: "mount",
    shape: "collapse",
    usedBy: ["Accordion", "Collapse"],
    notes: "Consumer must set `--collapse-content-height`.",
  },
];

// ─── Tailwind built-ins used by felix components ──────────────────────────────

export const TAILWIND_ANIMATIONS: AnimationRow[] = [
  {
    token: "(Tailwind built-in)",
    tailwind: "animate-pulse",
    shorthand: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    duration: "2s",
    easing: "cubic-bezier(0.4, 0, 0.6, 1)",
    iteration: "infinite",
    category: "tailwind-built-in",
    trigger: "loop",
    shape: "pulse",
    usedBy: ["Skeleton"],
    notes:
      "Tailwind core utility. felix gates it behind `motion-safe:` to respect `prefers-reduced-motion`. The demo here is the actual `Skeleton` atom.",
  },
  {
    token: "(Tailwind built-in)",
    tailwind: "animate-spin",
    shorthand: "spin 1s linear infinite",
    duration: "1s",
    easing: "linear",
    iteration: "infinite",
    category: "tailwind-built-in",
    trigger: "loop",
    shape: "spinner",
    usedBy: ["Spinner"],
    notes:
      "Tailwind core utility. felix gates it behind `motion-safe:` to respect `prefers-reduced-motion`. The demo here is the actual `Spinner` atom.",
  },
];
