import type { Meta, StoryObj } from "@storybook/react";
import { AnimationCardGrid } from "../../src/AnimationPreview";
import {
  FELIX_ANIMATIONS,
  TAILWIND_ANIMATIONS,
  type AnimationCategory,
  type AnimationRow,
} from "../../src/tokens/animations";

/**
 * Documents every animation utility used by the felix design system —
 * the 20 felix `--animate-*` tokens plus the two Tailwind core
 * (`animate-pulse`, `animate-spin`) used by `Skeleton` and `Spinner`.
 *
 * The Storybook page lets a designer or engineer see every animation
 * play, read its name / duration / easing, find the Tailwind class to
 * apply, and discover which felix component already consumes it.
 */

const meta = {
  title: "Design Tokens/Animations",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    controls: { disable: true },
    docs: {
      description: {
        component:
          "Library-wide motion tokens. Hit **Replay** on any one-shot animation card to retrigger it. Looping animations (`dots-pulse`, `pulse`, `spin`) run continuously.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const filter = (
  rows: AnimationRow[],
  ...categories: AnimationCategory[]
): AnimationRow[] => rows.filter((r) => categories.includes(r.category));

// ─── Stories ──────────────────────────────────────────────────────────────────

/**
 * Every animation in the library, grouped by family. Useful as a
 * single-glance reference; deep-dive into a specific family via the
 * dedicated stories below.
 */
export const All: Story = {
  name: "All",
  render: () => (
    <>
      <AnimationCardGrid
        rows={filter(FELIX_ANIMATIONS, "fade", "overlay")}
        title="Fade & overlay"
        description="Lightweight opacity transitions. `fade-in` is used by Tooltip; `overlay-in` / `overlay-out` back the dim layer behind Sheet and Drawer."
      />
      <AnimationCardGrid
        rows={filter(FELIX_ANIMATIONS, "dialog")}
        title="Dialog"
        description="Modal motion. The overlay fades; the content scales 0.5 → 1 separately so the panel's centering transform isn't fought by the keyframes."
      />
      <AnimationCardGrid
        rows={filter(FELIX_ANIMATIONS, "popover")}
        title="Popover"
        description="Shared by every anchored floating panel: Popover, HoverCard, Select, DropdownMenu. A small fade + 0.96 → 1 scale; positioning comes from the popper, not the keyframes."
      />
      <AnimationCardGrid
        rows={filter(FELIX_ANIMATIONS, "slide")}
        title="Slide (4 directions × in / out)"
        description="Edge-anchored panel motion used by Sheet. Pair `*-in-from-{edge}` with `*-out-to-{edge}` for symmetrical open/close."
      />
      <AnimationCardGrid
        rows={filter(FELIX_ANIMATIONS, "collapse")}
        title="Collapse"
        description="Generic height-driven collapse. The consumer sets `--collapse-content-height` (typically by bridging Radix's per-primitive variable, e.g. `--radix-accordion-content-height`)."
      />
      <AnimationCardGrid
        rows={[
          ...filter(FELIX_ANIMATIONS, "loop"),
          ...TAILWIND_ANIMATIONS,
        ]}
        title="Loops"
        description="Indefinite animations. Felix `dots-pulse` powers the `Dots` loader; the Tailwind core utilities `animate-pulse` and `animate-spin` back `Skeleton` and `Spinner`. They run forever — no replay button. Gate them with `motion-safe:` so users with `prefers-reduced-motion: reduce` aren't disturbed."
      />
    </>
  ),
};

export const FadeAndOverlays: Story = {
  name: "Fade & overlays",
  render: () => (
    <AnimationCardGrid
      rows={filter(FELIX_ANIMATIONS, "fade", "overlay")}
      description="Opacity-only transitions. Use `fade-in` for subtle reveals; the `overlay-in` / `overlay-out` pair backs scrim layers (Sheet, Drawer)."
    />
  ),
};

export const Dialog: Story = {
  name: "Dialog",
  render: () => (
    <AnimationCardGrid
      rows={filter(FELIX_ANIMATIONS, "dialog")}
      description="Always pair the overlay and content animations. The content keyframes intentionally only animate `scale` + `opacity` — translation comes from the panel's own positioning classes."
    />
  ),
};

export const Popover: Story = {
  name: "Popover",
  render: () => (
    <AnimationCardGrid
      rows={filter(FELIX_ANIMATIONS, "popover")}
      description="One pair of keyframes shared by Popover, HoverCard, Select, and DropdownMenu (including the sub-content menus)."
    />
  ),
};

export const Slides: Story = {
  name: "Slides",
  render: () => (
    <AnimationCardGrid
      rows={filter(FELIX_ANIMATIONS, "slide")}
      description="Edge-anchored slide animations used by Sheet. Pair the `*-in-from-{edge}` and `*-out-to-{edge}` for the `data-[state=open]` / `closed` Radix attribute pattern."
    />
  ),
};

export const Collapse: Story = {
  name: "Collapse",
  render: () => (
    <AnimationCardGrid
      rows={filter(FELIX_ANIMATIONS, "collapse")}
      description="Height-driven open / close animation used by Accordion and Collapse. Note the `--collapse-content-height` contract — the demo wires it to a fixed 72px to reproduce a real consumer."
    />
  ),
};

/**
 * All indefinite (looping) animations in one place: the felix
 * `dots-pulse` and the two Tailwind core utilities used by
 * `Skeleton` (`animate-pulse`) and `Spinner` (`animate-spin`).
 */
export const Loops: Story = {
  name: "Loops",
  render: () => (
    <>
      <AnimationCardGrid
        rows={filter(FELIX_ANIMATIONS, "loop")}
        title="Felix"
        description="Library-defined loop. `dots-pulse` powers the three-dot loader."
      />
      <AnimationCardGrid
        rows={TAILWIND_ANIMATIONS}
        title="Tailwind built-ins"
        description="Tailwind core utilities used inside felix components. Both should be gated by `motion-safe:` so users with `prefers-reduced-motion: reduce` don't see them spin/pulse."
      />
    </>
  ),
};
