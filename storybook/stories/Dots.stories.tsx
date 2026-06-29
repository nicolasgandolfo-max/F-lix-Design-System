import type { Meta, StoryObj } from "@storybook/react";
import { Dots } from "@felix/ui";

/**
 * **Dots** — Three staggered pulsing dots. A low-weight alternative to
 * `Spinner`, well suited for inline contexts (input-adjacent, table cells).
 *
 * Honours `prefers-reduced-motion` and announces a visually-hidden `label`
 * through a `role="status"` live region.
 */
const meta = {
  title: "Components/Atoms/Dots",
  component: Dots,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      description:
        "Dot scale: `sm` = 4 px, `md` = 6 px, `lg` = 10 px (gaps scale with the dots).",
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      table: {
        defaultValue: { summary: "md" },
        type: { summary: '"sm" | "md" | "lg"' },
      },
    },
    label: {
      description:
        "Accessible label rendered as a visually-hidden `<span>` inside the `role=\"status\"` live region.",
      control: "text",
      table: {
        defaultValue: { summary: "Loading" },
        type: { summary: "string" },
      },
    },
    className: {
      description: "Merged with internal styles via `cn()`.",
      control: "text",
    },
  },
} satisfies Meta<typeof Dots>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ──────────────────────────────────────────────────────────────────

/**
 * Default medium dots with the standard "Loading" announcement.
 */
export const Default: Story = {
  args: { size: "md" },
};

// ─── All sizes ────────────────────────────────────────────────────────────────

/**
 * The three supported sizes side-by-side.
 */
export const AllSizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-10">
      <div className="flex flex-col items-center gap-2">
        <Dots size="sm" />
        <span className="text-xs text-muted-foreground">sm · 4 px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Dots size="md" />
        <span className="text-xs text-muted-foreground">md · 6 px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Dots size="lg" />
        <span className="text-xs text-muted-foreground">lg · 10 px</span>
      </div>
    </div>
  ),
};

// ─── Custom label ─────────────────────────────────────────────────────────────

/**
 * Supply a contextual `label` so assistive tech can announce *what* is loading.
 */
export const CustomLabel: Story = {
  args: { size: "md", label: "Waiting for confirmation" },
};
