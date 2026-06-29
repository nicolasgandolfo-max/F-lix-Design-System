import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "@felix/ui";

/**
 * **Separator** — A thin divider line that splits content into sections.
 * Built on `@radix-ui/react-separator` so ARIA (`role`, `aria-orientation`)
 * is handled correctly out of the box.
 *
 * Three variants matching Figma node `446:78`:
 *
 * - **Horizontal, no label** — `<Separator />`
 * - **Horizontal, with label** — `<Separator label="Section" />` or
 *   `<Separator>Section</Separator>`. Renders as `line — label — line`.
 * - **Vertical** — `<Separator orientation="vertical" />`. Stretches to the
 *   parent's height by default.
 */
const meta = {
  title: "Components/Atoms/Separator",
  component: Separator,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Use `<Separator />` to divide sections of content. Pass a `label` (or children) for the labeled horizontal variant, or `orientation=\"vertical\"` for a vertical line.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      description: "Direction of the separator line.",
      control: { type: "radio" },
      options: ["horizontal", "vertical"],
      table: {
        defaultValue: { summary: "horizontal" },
        type: { summary: '"horizontal" | "vertical"' },
      },
    },
    label: {
      description:
        "Optional centered label (horizontal only). May also be passed via children.",
      control: "text",
      table: { type: { summary: "ReactNode" } },
    },
    decorative: {
      description:
        "Whether the separator is purely visual (`role=\"none\"`) or semantic (`role=\"separator\"`).",
      control: "boolean",
      table: {
        defaultValue: { summary: "true" },
        type: { summary: "boolean" },
      },
    },
    children: { control: false, table: { disable: true } },
  },
  args: {
    orientation: "horizontal",
    decorative: true,
  },
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

// ─── Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => (
    <div className="w-72">
      <Separator {...args} />
    </div>
  ),
};

// ─── With label ─────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  args: { label: "Section" },
  render: (args) => (
    <div className="w-72">
      <Separator {...args} />
    </div>
  ),
};

// ─── Vertical ───────────────────────────────────────────────────────────────

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div className="flex h-10 items-center">
      <Separator {...args} />
    </div>
  ),
};

// ─── Orientations (matches Figma reference frame) ───────────────────────────

export const Orientations: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-8">
      <div className="grid grid-cols-[80px_1fr] items-center gap-x-6">
        <span className="text-muted-foreground text-right text-xxs uppercase">
          H / No label
        </span>
        <Separator />

        <span className="text-muted-foreground text-right text-xxs uppercase">
          H / Label
        </span>
        <Separator label="Section" />

        <span className="text-muted-foreground text-right text-xxs uppercase">
          Vertical
        </span>
        <div className="flex h-10 items-center">
          <Separator orientation="vertical" />
        </div>
      </div>
    </div>
  ),
};

// ─── Realistic usage ────────────────────────────────────────────────────────

/**
 * Real-world examples: between list rows, in a toolbar with vertical dividers,
 * and as a section break with a label.
 */
export const InContext: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-10">
      {/* List divider */}
      <div className="rounded-lg border border-border p-4">
        <h4 className="text-foreground text-sm font-semibold">Inbox</h4>
        <Separator className="my-3" />
        <ul className="flex flex-col gap-2">
          <li className="text-foreground text-sm">Welcome to Felix Pago</li>
          <Separator />
          <li className="text-foreground text-sm">Your weekly summary</li>
          <Separator />
          <li className="text-foreground text-sm">Security update</li>
        </ul>
      </div>

      {/* Toolbar with vertical separators */}
      <div className="flex h-10 items-center gap-3 rounded-lg border border-border px-3">
        <button className="text-foreground text-sm">Bold</button>
        <Separator orientation="vertical" />
        <button className="text-foreground text-sm">Italic</button>
        <Separator orientation="vertical" />
        <button className="text-foreground text-sm">Underline</button>
      </div>

      {/* Section break */}
      <div className="flex flex-col gap-4">
        <p className="text-foreground text-sm">First section content.</p>
        <Separator label="Section" />
        <p className="text-foreground text-sm">Second section content.</p>
      </div>
    </div>
  ),
};

// ─── Figma showcase ─────────────────────────────────────────────────────────

/**
 * Pixel-faithful recreation of the Figma frame **Separator** (node `446:78`):
 * a soft white card with heading, subtitle, divider, and the three Figma
 * variants stacked with their labels.
 */
export const FigmaShowcase: Story = {
  parameters: { layout: "centered" },
  render: () => (
    <div className="bg-background w-127 rounded-2xl p-12 shadow-lg">
      <h3 className="text-foreground text-xl font-semibold">Separator</h3>
      <p className="text-muted-foreground mt-1 text-sm">
        Separadores horizontales y verticales con y sin etiqueta de sección
      </p>
      <Separator className="my-4" />
      <div className="mt-6 grid grid-cols-[88px_1fr] items-center gap-x-4 gap-y-7">
        <span className="text-muted-foreground text-right text-xxs uppercase">
          H / No label
        </span>
        <Separator />

        <span className="text-muted-foreground text-right text-xxs uppercase">
          H / Label
        </span>
        <Separator label="Section" />

        <span className="text-muted-foreground text-right text-xxs uppercase">
          Vertical
        </span>
        <div className="flex h-10 items-center">
          <Separator orientation="vertical" />
        </div>
      </div>
    </div>
  ),
};
