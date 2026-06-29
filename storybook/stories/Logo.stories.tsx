import type { Meta, StoryObj } from "@storybook/react";

import { Logo } from "@felix/ui";

/**
 * **Logo** — The Felix brand mark, inlined as React SVG.
 *
 * Three variants (Figma `Felix Brand` frame, node `103:56`):
 *
 * - `logotype` — full "Félix" wordmark (~218 × 78)
 * - `symbol` — F mark on transparent (~78 × 78)
 * - `symbol-circular` — F mark on the brand teal circle (~78 × 78)
 *
 * **Theming.** All foreground paths use `currentColor`, so wrap the logo
 * with `text-foreground` (default), `text-interactive-primary`, etc. and
 * the mark adapts. The teal circle backdrop on the circular variant is
 * brand-fixed and intentionally does NOT respond to themes.
 *
 * **Sizing.** Pass any Tailwind `size-*` / `h-*` / `w-*` class via
 * `className`; `viewBox` keeps the natural aspect ratio.
 *
 * **A11y.** Pass `title` to expose a label to assistive tech, or omit it
 * to mark the SVG decorative (`aria-hidden`).
 */
const meta = {
  title: "Components/Atoms/Logo",
  component: Logo,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { type: "logotype" },
  argTypes: {
    type: {
      description: "Which brand mark to render.",
      control: { type: "inline-radio" },
      options: ["logotype", "symbol", "symbol-circular"],
      table: {
        type: { summary: '"logotype" | "symbol" | "symbol-circular"' },
      },
    },
    title: {
      description:
        "Accessible label. Omit to render the SVG as decorative (aria-hidden).",
      control: "text",
    },
    className: {
      description:
        "Merged with internal styles via `cn()`. Use Tailwind sizing (`size-*`, `h-*`) and color (`text-*`) utilities to override defaults.",
      control: "text",
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ──────────────────────────────────────────────────────────────────

/**
 * Default logotype at its natural size.
 */
export const Default: Story = {
  render: (args) => (
    <div className="h-20">
      <Logo {...args} className="h-full w-auto" />
    </div>
  ),
};

// ─── Symbol ───────────────────────────────────────────────────────────────────

/**
 * The standalone F mark.
 */
export const Symbol: Story = {
  args: { type: "symbol" },
  render: (args) => (
    <div className="size-20">
      <Logo {...args} className="size-full" />
    </div>
  ),
};

// ─── Symbol Circular ──────────────────────────────────────────────────────────

/**
 * F mark on the brand teal circle. The circle keeps its brand color
 * across themes; the F follows `currentColor`.
 */
export const SymbolCircular: Story = {
  args: { type: "symbol-circular" },
  render: (args) => (
    <div className="size-20">
      <Logo {...args} className="size-full" />
    </div>
  ),
};

// ─── All variants (Figma showcase) ────────────────────────────────────────────

/**
 * All three variants side by side at the Figma showcase sizes —
 * mirrors `Felix Brand` frame, node `165:1967`.
 */
export const AllVariants: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex items-center gap-16">
      <div className="flex flex-col items-center gap-3">
        <Logo type="logotype" title="Felix" className="h-[78px] w-auto" />
        <span className="text-xs text-muted-foreground">logotype</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <Logo type="symbol" title="Felix symbol" className="size-[78px]" />
        <span className="text-xs text-muted-foreground">symbol</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <Logo
          type="symbol-circular"
          title="Felix circular symbol"
          className="size-[78px]"
        />
        <span className="text-xs text-muted-foreground">symbol-circular</span>
      </div>
    </div>
  ),
};

// ─── Sized ────────────────────────────────────────────────────────────────────

/**
 * The same `symbol` variant rendered at a range of sizes via Tailwind
 * `size-*` utilities — `viewBox` preserves the aspect ratio.
 */
export const Sized: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <Logo type="symbol" className="size-6" />
      <Logo type="symbol" className="size-10" />
      <Logo type="symbol" className="size-16" />
      <Logo type="symbol" className="size-24" />
    </div>
  ),
};

// ─── Themed ───────────────────────────────────────────────────────────────────

/**
 * `currentColor` follows the wrapper's text color — pair the Logo with
 * any `text-*` utility to recolor the foreground without touching the
 * brand-fixed teal of the circular variant.
 */
export const Themed: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-6 text-foreground">
        <Logo type="logotype" className="h-10 w-auto" />
        <span className="text-xs">text-foreground (default)</span>
      </div>
      <div className="flex items-center gap-6 text-interactive-primary">
        <Logo type="logotype" className="h-10 w-auto" />
        <span className="text-xs">text-interactive-primary</span>
      </div>
      <div className="flex items-center gap-6 text-muted-foreground">
        <Logo type="symbol" className="size-10" />
        <Logo type="symbol-circular" className="size-10" />
        <span className="text-xs">text-muted-foreground (circle stays brand teal)</span>
      </div>
    </div>
  ),
};

// ─── Dark mode ────────────────────────────────────────────────────────────────

/**
 * Dark mode — the foreground paths flip via `text-foreground`, the brand
 * teal circle stays put.
 */
export const DarkMode: Story = {
  parameters: { backgrounds: { default: "dark" } },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="rounded-xl bg-background p-10">
      <div className="flex items-center gap-12">
        <Logo type="logotype" title="Felix" className="h-[78px] w-auto" />
        <Logo type="symbol" title="Felix symbol" className="size-[78px]" />
        <Logo
          type="symbol-circular"
          title="Felix circular symbol"
          className="size-[78px]"
        />
      </div>
    </div>
  ),
};
