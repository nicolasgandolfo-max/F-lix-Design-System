import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "@felix/ui";

/**
 * **Skeleton** — Placeholder shape shown while content loads. Three shape
 * `type`s (`text`, `block`, `circle`) and a single boolean `animated` toggle.
 *
 * Sizing is intentionally NOT a prop — pass any `w-*` / `h-*` / `size-*`
 * Tailwind utility through `className` and it overrides the mobile-first
 * default (`w-full` for text/block, fixed `size-12` for circle).
 *
 * Honours `prefers-reduced-motion` (no pulse for users who request reduced
 * motion) and announces a visually-hidden `label` through a `role="status"`
 * live region.
 */
const meta = {
  title: "Components/Atoms/Skeleton",
  component: Skeleton,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    type: {
      description:
        "Shape of the placeholder. `text` = pill-shaped bar, `block` = rounded rectangle, `circle` = avatar.",
      control: { type: "radio" },
      options: ["text", "block", "circle"],
      table: {
        defaultValue: { summary: "text" },
        type: { summary: '"text" | "block" | "circle"' },
      },
    },
    animated: {
      description:
        "When `true` (default), pulses via `motion-safe:animate-pulse`. Disabled automatically for `prefers-reduced-motion` users.",
      control: "boolean",
      table: {
        defaultValue: { summary: "true" },
        type: { summary: "boolean" },
      },
    },
    label: {
      description:
        "Accessible label rendered inside the `role=\"status\"` live region.",
      control: "text",
      table: {
        defaultValue: { summary: "Loading" },
        type: { summary: "string" },
      },
    },
    className: {
      description:
        "Merged with internal styles via `cn()`. Use this to override width/height (e.g. `w-32 h-6`).",
      control: "text",
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default — pill-shaped text bar that fills its container width.
 */
export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-sm">
      <Skeleton {...args} />
    </div>
  ),
};

/**
 * Text — three pill rows simulating a paragraph. Width comes from `className`
 * (last line is shorter to feel natural).
 */
export const Text: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Skeleton type="text" />
      <Skeleton type="text" />
      <Skeleton type="text" className="w-3/4" />
    </div>
  ),
};

/**
 * Block — rounded rectangle for image/card placeholders.
 */
export const Block: Story = {
  render: () => <Skeleton type="block" />,
};

/**
 * Circle — fixed `size-12` avatar. Pass `className="size-N"` to resize.
 */
export const Circle: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Skeleton type="circle" className="size-8" />
      <Skeleton type="circle" />
      <Skeleton type="circle" className="size-16" />
    </div>
  ),
};

/**
 * Static — pulse disabled. Use when many skeletons are on screen and motion
 * would be visually noisy, or for a print-style placeholder.
 */
export const Static: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Skeleton type="text" animated={false} />
      <Skeleton type="text" animated={false} className="w-2/3" />
    </div>
  ),
};

/**
 * Dimensions are className-driven. Mix and match any Tailwind size utility.
 */
export const WithCustomSize: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Skeleton type="text" className="h-2 w-24" />
      <Skeleton type="text" className="h-6 w-64" />
      <Skeleton type="block" className="h-32 max-w-none w-full sm:w-80" />
    </div>
  ),
};

/**
 * Real-world composition: avatar + 2 text lines, mobile-first. Uses `flex` +
 * `gap` and percentage widths so it works at 320 px and scales up cleanly.
 */
export const CardExample: Story = {
  render: () => (
    <div className="flex w-full max-w-sm items-center gap-3 rounded-lg border border-border p-4">
      <Skeleton type="circle" />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <Skeleton type="text" className="h-3 w-2/3" />
        <Skeleton type="text" className="h-3 w-full" />
      </div>
    </div>
  ),
};

/**
 * Reproduces the Figma "Skeleton" showcase (node 446:68) — three rows of
 * Text / Block / Circle in SM, MD, LG. Sizes are className-driven (no `size`
 * prop). Each row is the same `flex items-* gap-3` pattern proven by the
 * standalone `Circle` story, so items keep their intrinsic size and don't
 * stretch or wrap unexpectedly.
 */
export const FigmaShowcase: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-caption text-secondary">
          Text
        </h3>
        <div className="flex flex-col items-start gap-2">
          <Skeleton type="text" className="h-2 w-24" />
          <Skeleton type="text" className="h-3 w-40" />
          <Skeleton type="text" className="h-4 w-56" />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-caption text-secondary">
          Block
        </h3>
        <div className="flex items-end gap-3">
          <Skeleton type="block" className="h-16 w-16 max-w-none" />
          <Skeleton type="block" className="h-20 w-24 max-w-none" />
          <Skeleton type="block" className="h-32 w-40 max-w-none" />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-caption text-secondary">
          Circle
        </h3>
        <div className="flex items-center gap-3">
          <Skeleton type="circle" className="size-8" />
          <Skeleton type="circle" />
          <Skeleton type="circle" className="size-16" />
        </div>
      </section>
    </div>
  ),
};
