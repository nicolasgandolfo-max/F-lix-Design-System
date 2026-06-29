import type { Meta, StoryObj } from "@storybook/react";
import { Label, Slider } from "@felix/ui";
import { useState } from "react";

/**
 * **Slider** — A horizontal range input built on `@radix-ui/react-slider`.
 *
 * Supports both **single-thumb** (`defaultValue={[40]}`) and **range / two-thumb**
 * (`defaultValue={[20, 80]}`) modes — pass one or two values and Radix renders
 * the right number of thumbs automatically.
 *
 * Five colors map to existing DS tokens:
 * - `primary` — turquoise (default)
 * - `secondary` — foreground slate
 * - `lime` — accent lime
 * - `danger` — destructive orange
 * - `violet` — chart-4
 *
 * Always pair with a label: use `aria-label` / `aria-labelledby` for a single
 * thumb, or `thumbLabels={["Min", "Max"]}` for a range.
 */
const meta = {
  title: "Components/Atoms/Slider",
  component: Slider,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Horizontal slider built on Radix Slider. Single or range thumbs, five DS colors, controlled or uncontrolled.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      description:
        "Colour of the filled range. Track is always `bg-muted`; only the range fill changes.",
      control: { type: "radio" },
      options: ["primary", "secondary", "lime", "danger", "violet"],
      table: {
        defaultValue: { summary: "primary" },
        type: { summary: '"primary" | "secondary" | "lime" | "danger" | "violet"' },
      },
    },
    defaultValue: {
      description:
        "Initial value(s) for an uncontrolled slider. Pass one number for a single thumb (`[40]`) or two for a range (`[20, 80]`).",
      control: false,
      table: { type: { summary: "number[]" } },
    },
    value: {
      description:
        "Current value(s) for a controlled slider. Pair with `onValueChange`.",
      control: false,
      table: { type: { summary: "number[]" } },
    },
    onValueChange: {
      description: "Fired on every value change. Receives the next value array.",
      control: false,
      table: { type: { summary: "(value: number[]) => void" } },
    },
    min: {
      description: "Minimum allowed value.",
      control: { type: "number" },
      table: { defaultValue: { summary: "0" }, type: { summary: "number" } },
    },
    max: {
      description: "Maximum allowed value.",
      control: { type: "number" },
      table: { defaultValue: { summary: "100" }, type: { summary: "number" } },
    },
    step: {
      description: "Stepping interval for keyboard / drag movements.",
      control: { type: "number" },
      table: { defaultValue: { summary: "1" }, type: { summary: "number" } },
    },
    disabled: {
      description: "Whether the slider is disabled.",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    thumbLabels: {
      description:
        "Per-thumb accessible labels for range sliders, e.g. `['Min', 'Max']`. For single-thumb, prefer `aria-label` / `aria-labelledby` instead.",
      control: false,
      table: { type: { summary: "string[]" } },
    },
    "aria-label": {
      description:
        "Accessible label forwarded to the thumb (single-thumb sliders).",
      control: "text",
      table: { type: { summary: "string" } },
    },
  },
  args: {
    defaultValue: [40],
    color: "primary",
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    "aria-label": "Volume",
  },
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

// ─── Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    defaultValue: [40],
    "aria-label": "Volume",
  },
};

// ─── Colors ─────────────────────────────────────────────────────────────────

export const Colors: Story = {
  args: { defaultValue: [60] },
  render: () => (
    <div className="flex w-80 flex-col gap-6">
      <div className="space-y-2">
        <Label>Primary</Label>
        <Slider defaultValue={[60]} color="primary" aria-label="Primary" />
      </div>
      <div className="space-y-2">
        <Label>Secondary</Label>
        <Slider defaultValue={[60]} color="secondary" aria-label="Secondary" />
      </div>
      <div className="space-y-2">
        <Label>Lime</Label>
        <Slider defaultValue={[60]} color="lime" aria-label="Lime" />
      </div>
      <div className="space-y-2">
        <Label>Danger</Label>
        <Slider defaultValue={[60]} color="danger" aria-label="Danger" />
      </div>
      <div className="space-y-2">
        <Label>Violet</Label>
        <Slider defaultValue={[60]} color="violet" aria-label="Violet" />
      </div>
    </div>
  ),
};

// ─── Range / two-thumb ──────────────────────────────────────────────────────

export const Range: Story = {
  args: { defaultValue: [20, 80] },
  render: () => (
    <div className="w-80 space-y-2">
      <Label>Price range</Label>
      <Slider
        defaultValue={[20, 80]}
        thumbLabels={["Minimum price", "Maximum price"]}
      />
      <p className="text-muted-foreground text-xs">
        Drag either handle to set the lower and upper bounds.
      </p>
    </div>
  ),
};

// ─── Step ───────────────────────────────────────────────────────────────────

export const Step: Story = {
  args: { defaultValue: [40], step: 10 },
  render: (args) => {
    const [value, setValue] = useState<number[]>([40]);
    return (
      <div className="w-80 space-y-2">
        <div className="flex items-center justify-between">
          <Label>Step (10)</Label>
          <span className="text-muted-foreground text-xs">{value[0]}</span>
        </div>
        <Slider
          {...args}
          value={value}
          onValueChange={setValue}
          aria-label="Stepped volume"
        />
      </div>
    );
  },
};

// ─── Disabled ───────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: { defaultValue: [40], disabled: true, "aria-label": "Disabled" },
};

// ─── With label ─────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  args: { defaultValue: [40] },
  render: () => {
    const [value, setValue] = useState<number[]>([40]);
    return (
      <div className="w-80 space-y-1">
        <div className="flex items-center justify-between">
          <Label htmlFor="volume">Volume</Label>
          <span className="text-foreground text-xxs leading-snug">
            {value[0]}%
          </span>
        </div>
        <Slider
          id="volume"
          value={value}
          onValueChange={setValue}
          aria-labelledby="volume"
        />
      </div>
    );
  },
};

// ─── Controlled ─────────────────────────────────────────────────────────────

export const Controlled: Story = {
  args: { defaultValue: [40] },
  render: () => {
    const [value, setValue] = useState<number[]>([35]);
    return (
      <div className="w-80 space-y-3">
        <Slider
          value={value}
          onValueChange={setValue}
          aria-label="Controlled"
        />
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Current value</span>
          <span className="text-foreground font-semibold">{value[0]}</span>
        </div>
        <div className="flex gap-2 text-xs">
          <button
            type="button"
            className="bg-muted hover:bg-muted/80 rounded px-2 py-1"
            onClick={() => setValue([0])}
          >
            Reset
          </button>
          <button
            type="button"
            className="bg-muted hover:bg-muted/80 rounded px-2 py-1"
            onClick={() => setValue([100])}
          >
            Max
          </button>
        </div>
      </div>
    );
  },
};

// ─── Figma showcase ─────────────────────────────────────────────────────────

/**
 * Pixel-faithful recreation of the Figma frame **Slider · Showcase** (node
 * `578:4521`): a soft white card with the heading "Slider", a divider, the
 * "Value" caption, and two rows showing the **Primary** and **Foreground**
 * (here: `secondary`) colour variants — each with a `Label` on the left and a
 * percentage on the right.
 */
export const FigmaShowcase: Story = {
  parameters: { layout: "centered" },
  args: { defaultValue: [40] },
  render: () => {
    const [primary, setPrimary] = useState<number[]>([40]);
    const [secondary, setSecondary] = useState<number[]>([60]);
    return (
      <div className="bg-background w-82 rounded-2xl p-8 shadow-lg">
        <h3 className="text-foreground text-lg font-semibold">Slider</h3>
        <div className="bg-border my-4 h-px w-full" />
        <p className="text-muted-foreground text-xxs leading-snug">Value</p>
        <div className="mt-6 space-y-7">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label>Label</Label>
              <span className="text-foreground text-xxs leading-snug">
                {primary[0]}%
              </span>
            </div>
            <Slider
              value={primary}
              onValueChange={setPrimary}
              color="primary"
              aria-label="Primary slider"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label>Label</Label>
              <span className="text-foreground text-xxs leading-snug">
                {secondary[0]}%
              </span>
            </div>
            <Slider
              value={secondary}
              onValueChange={setSecondary}
              color="secondary"
              aria-label="Secondary slider"
            />
          </div>
        </div>
      </div>
    );
  },
};
