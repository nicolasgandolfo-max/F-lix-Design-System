import type { Meta, StoryObj } from "@storybook/react";
import { Button, Spinner } from "@felix/ui";

/**
 * **Spinner** — Rotating ring + arc loader for inline indeterminate progress.
 *
 * Built on Tailwind's native `animate-spin`. Honours `prefers-reduced-motion`
 * (no rotation when the user requests reduced motion) and announces a
 * visually-hidden `label` through a `role="status"` live region.
 */
const meta = {
  title: "Components/Atoms/Spinner",
  component: Spinner,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      description:
        "Pixel scale: `sm` = 16 px, `md` = 24 px, `lg` = 40 px. Controlled by Felix spacing tokens.",
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
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ──────────────────────────────────────────────────────────────────

/**
 * Default medium (24 px) spinner with the standard "Loading" announcement.
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
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="sm" />
        <span className="text-xs text-muted-foreground">sm · 16 px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" />
        <span className="text-xs text-muted-foreground">md · 24 px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <span className="text-xs text-muted-foreground">lg · 40 px</span>
      </div>
    </div>
  ),
};

// ─── Custom label ─────────────────────────────────────────────────────────────

/**
 * Supply a contextual `label` so assistive tech can announce *what* is loading.
 */
export const CustomLabel: Story = {
  args: { size: "md", label: "Loading transactions" },
};

// ─── Inside a Button ──────────────────────────────────────────────────────────

/**
 * The spinner inherits `currentColor`, so dropping it inside a button is
 * enough — no extra theming required.
 */
export const InsideButton: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Button disabled>
      <Spinner size="sm" label="Saving" />
      Saving…
    </Button>
  ),
};
