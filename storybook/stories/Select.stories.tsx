import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import {
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@felix/ui";

/**
 * **Select** — A value-bound dropdown built on `@radix-ui/react-select`.
 *
 * Compound API: `Select` (root, owns the value), `SelectTrigger` (the
 * button users see), `SelectValue` (renders the chosen label or
 * placeholder), `SelectContent` (the listbox panel), `SelectItem`
 * (each option), plus `SelectGroup` / `SelectLabel` / `SelectSeparator`
 * for grouped lists.
 *
 * For action menus (no selected value), reach for `DropdownMenu`
 * instead.
 */
const meta = {
  title: "Components/Molecules/Select",
  component: Select,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      description: "Initial value (uncontrolled).",
      control: "text",
    },
    value: {
      description: "Controlled value. Pair with `onValueChange`.",
      control: "text",
    },
    disabled: {
      description: "Disables the trigger.",
      control: "boolean",
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => (
    <div className="w-56">
      <Select {...args}>
        <SelectTrigger aria-label="Choose a fruit">
          <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="cherry">Cherry</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

// ─── With Label ───────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-56">
      <Label htmlFor="fruit">Favorite fruit</Label>
      <Select>
        <SelectTrigger id="fruit">
          <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="cherry">Cherry</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

// ─── Controlled ───────────────────────────────────────────────────────────────

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>("banana");
    return (
      <div className="flex flex-col gap-3 w-56">
        <p className="text-xs text-muted-foreground">
          External: <span className="font-mono">{value ?? "none"}</span>
        </p>
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger aria-label="Choose a fruit">
            <SelectValue placeholder="Pick a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="cherry">Cherry</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-56">
      <Select disabled defaultValue="apple">
        <SelectTrigger aria-label="Disabled select">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger aria-label="Per-item disabled">
          <SelectValue placeholder="Per-item disabled" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana" disabled>
            Banana (disabled)
          </SelectItem>
          <SelectItem value="cherry">Cherry</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

// ─── With Groups ──────────────────────────────────────────────────────────────

export const WithGroups: Story = {
  render: () => (
    <div className="w-56">
      <Select>
        <SelectTrigger aria-label="Pick a snack">
          <SelectValue placeholder="Pick a snack" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruit</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="cherry">Cherry</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Sweets</SelectLabel>
            <SelectItem value="chocolate">Chocolate</SelectItem>
            <SelectItem value="cookie">Cookie</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
};

// ─── Long list (scroll buttons) ───────────────────────────────────────────────

export const LongList: Story = {
  render: () => (
    <div className="w-56">
      <Select>
        <SelectTrigger aria-label="Pick a number">
          <SelectValue placeholder="Pick a number" />
        </SelectTrigger>
        <SelectContent className="max-h-48">
          {Array.from({ length: 30 }, (_, i) => (
            <SelectItem key={i} value={String(i + 1)}>
              Item {i + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
};

// ─── Sided ────────────────────────────────────────────────────────────────────

export const Sided: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex h-96 items-end justify-center">
      <div className="w-56">
        <Select>
          <SelectTrigger aria-label="Top-side select">
            <SelectValue placeholder="Opens upward" />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem value="a">Option A</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
            <SelectItem value="c">Option C</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
};

// ─── Figma showcase (Rows per page) ───────────────────────────────────────────

/**
 * Reproduces the "Rows per page" trigger from the Pagination dropdown
 * variant — Figma node `699:15389`.
 */
export const FigmaShowcase: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex w-[164px] items-center gap-2">
      <Label htmlFor="rows" className="whitespace-nowrap text-sm">
        Rows per page
      </Label>
      <Select defaultValue="25">
        <SelectTrigger id="rows" className="flex-1">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="25">25</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

// ─── Dark mode ────────────────────────────────────────────────────────────────

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
    <div className="rounded-xl bg-background p-8">
      <div className="w-56">
        <Select defaultValue="banana">
          <SelectTrigger aria-label="Choose a fruit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="cherry">Cherry</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
};
