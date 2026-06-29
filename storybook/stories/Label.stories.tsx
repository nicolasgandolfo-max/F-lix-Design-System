import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "@felix/ui";

/**
 * **Label** — Form field caption (body-sm / Saans), built on Radix Label like shadcn.
 *
 * Variants match the Felix DS: default, required (destructive asterisk), optional (muted suffix), disabled.
 */
const meta = {
  title: "Components/Atoms/Label",
  component: Label,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description:
        "Visual variant: default text, required asterisk, optional suffix, or dimmed disabled label.",
      control: { type: "select" },
      options: ["default", "required", "optional", "disabled"],
      table: {
        defaultValue: { summary: "default" },
        type: { summary: "enum" },
      },
    },
    children: {
      description: "Label text (before optional / required adornments).",
      control: "text",
      table: { type: { summary: "ReactNode" } },
    },
    htmlFor: {
      description: "ID of the associated form control (`for` attribute).",
      control: "text",
      table: { type: { summary: "string" } },
    },
    className: {
      description: "Additional utility classes (merged with `cn`).",
      control: "text",
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Label",
  },
};

export const Required: Story = {
  args: {
    variant: "required",
    children: "Label",
  },
};

export const Optional: Story = {
  args: {
    variant: "optional",
    children: "Label",
  },
};

export const Disabled: Story = {
  args: {
    variant: "disabled",
    children: "Label",
  },
};

/**
 * All variants side by side (matches Figma “Label · Showcase”).
 */
export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <Label>Label</Label>
      <Label variant="required">Label</Label>
      <Label variant="optional">Label</Label>
      <Label variant="disabled">Label</Label>
    </div>
  ),
};

/**
 * With a native input — `htmlFor` / `id` pairing.
 */
export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-full max-w-xs">
      <Label htmlFor="demo-email" variant="required">
        Email address
      </Label>
      <input
        id="demo-email"
        type="email"
        className="border border-border rounded-md px-3 py-2 text-sm bg-background"
        aria-required
      />
    </div>
  ),
};

export const DarkMode: Story = {
  parameters: { backgrounds: { default: "dark" } },
  render: () => (
    <div className="dark">
      <div className="rounded-lg bg-background p-6 flex flex-col gap-4 items-start">
        <Label>Label</Label>
        <Label variant="required">Label</Label>
        <Label variant="optional">Label</Label>
        <Label variant="disabled">Label</Label>
      </div>
    </div>
  ),
};
