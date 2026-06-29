import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Label, RadioGroup, RadioGroupItem } from "@felix/ui";

/**
 * **RadioGroup** — Single-selection control with roving focus, adapted from
 * `@radix-ui/react-radio-group` and styled to Figma node `562:3656`.
 *
 * Ships **no built-in label**. Compose with the Felix `Label` atom using the
 * `id` / `htmlFor` pair — that keeps single-responsibility atoms and gives
 * consumers full control over typography, required / optional markers, and
 * layout (inline, stacked, two-column, …).
 *
 * The optional `size` prop on `RadioGroup` sets the default visual size for
 * every item in the group; individual `RadioGroupItem`s can still override it.
 */
const meta = {
  title: "Components/Atoms/RadioGroup",
  component: RadioGroup,
  subcomponents: { RadioGroupItem } as never,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      description:
        "Default visual size propagated to every item. `md` = 20 px (default), `sm` = 16 px.",
      control: { type: "radio" },
      options: ["md", "sm"],
      table: {
        defaultValue: { summary: "md" },
        type: { summary: '"md" | "sm"' },
      },
    },
    value: {
      description: "Controlled selected value.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    defaultValue: {
      description: "Uncontrolled initial value.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    disabled: {
      description: "Disables every item in the group.",
      control: "boolean",
      table: { type: { summary: "boolean" } },
    },
    orientation: {
      description:
        "Affects the keyboard arrow-key mapping; combine with layout utilities to lay items out visually.",
      control: { type: "radio" },
      options: ["vertical", "horizontal"],
      table: {
        defaultValue: { summary: "vertical" },
        type: { summary: '"vertical" | "horizontal"' },
      },
    },
    required: {
      description: "Marks the group as required for form submission.",
      control: "boolean",
    },
    name: {
      description: "Form field name (submitted as the selected item's value).",
      control: "text",
    },
    onValueChange: {
      description: "Called with the newly selected value.",
      table: { type: { summary: "(value: string) => void" } },
      action: "onValueChange",
    },
    className: {
      description: "Additional utility classes (merged with `cn`).",
      control: "text",
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const OPTIONS = [
  { id: "opt-email", value: "email", label: "Email" },
  { id: "opt-sms", value: "sms", label: "SMS" },
  { id: "opt-push", value: "push", label: "Push notification" },
] as const;

function LabeledOptions({ idPrefix }: { idPrefix: string }) {
  return (
    <>
      {OPTIONS.map(({ value, label }) => {
        const id = `${idPrefix}-${value}`;
        return (
          <div key={id} className="flex items-center gap-2">
            <RadioGroupItem id={id} value={value} />
            <Label htmlFor={id}>{label}</Label>
          </div>
        );
      })}
    </>
  );
}

export const Default: Story = {
  args: { "aria-label": "Notification channel" },
  render: (args) => (
    <RadioGroup {...args}>
      <LabeledOptions idPrefix="default" />
    </RadioGroup>
  ),
};

export const Preselected: Story = {
  args: { "aria-label": "Notification channel", defaultValue: "sms" },
  render: (args) => (
    <RadioGroup {...args}>
      <LabeledOptions idPrefix="preselected" />
    </RadioGroup>
  ),
};

/** Both sizes (`md` default + `sm`) via the group-level `size` prop. */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-foreground/70">md (20 px)</p>
        <RadioGroup defaultValue="email" aria-label="md group">
          <LabeledOptions idPrefix="size-md" />
        </RadioGroup>
      </section>
      <section className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-foreground/70">sm (16 px)</p>
        <RadioGroup size="sm" defaultValue="email" aria-label="sm group">
          <LabeledOptions idPrefix="size-sm" />
        </RadioGroup>
      </section>
    </div>
  ),
};

export const Disabled: Story = {
  args: { "aria-label": "Disabled", disabled: true, defaultValue: "email" },
  render: (args) => (
    <RadioGroup {...args}>
      <LabeledOptions idPrefix="disabled" />
    </RadioGroup>
  ),
};

/** One item disabled — the others remain selectable and keyboard-reachable. */
export const WithDisabledItem: Story = {
  render: () => (
    <RadioGroup aria-label="Notification channel">
      <div className="flex items-center gap-2">
        <RadioGroupItem id="di-email" value="email" />
        <Label htmlFor="di-email">Email</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="di-sms" value="sms" disabled />
        <Label htmlFor="di-sms" variant="disabled">
          SMS (unavailable)
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="di-push" value="push" />
        <Label htmlFor="di-push">Push notification</Label>
      </div>
    </RadioGroup>
  ),
};

/** Horizontal layout via `orientation` + `flex-row`. */
export const Horizontal: Story = {
  render: () => (
    <RadioGroup
      orientation="horizontal"
      defaultValue="1"
      aria-label="Rating"
      className="flex flex-row gap-6"
    >
      {["1", "2", "3", "4", "5"].map((value) => {
        const id = `rating-${value}`;
        return (
          <div key={id} className="flex items-center gap-2">
            <RadioGroupItem id={id} value={value} />
            <Label htmlFor={id}>{value}</Label>
          </div>
        );
      })}
    </RadioGroup>
  ),
};

/** Composed with the Felix `Label` atom — recommended pattern. */
export const WithLabel: Story = {
  render: () => (
    <RadioGroup aria-label="Notification channel" defaultValue="email">
      <LabeledOptions idPrefix="withlabel" />
    </RadioGroup>
  ),
};

/** External state + live readout. */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>("email");
    return (
      <div className="flex flex-col items-start gap-4">
        <RadioGroup
          aria-label="Notification channel"
          value={value}
          onValueChange={setValue}
        >
          <LabeledOptions idPrefix="controlled" />
        </RadioGroup>
        <p className="text-xs text-foreground/60">
          Selected: <code className="font-mono">{value}</code>
        </p>
      </div>
    );
  },
};

/** Native form submission — the selected item's value is sent as `name=value`. */
export const InForm: Story = {
  render: () => {
    const [submitted, setSubmitted] = React.useState<string | null>(null);
    return (
      <form
        className="flex flex-col items-start gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          setSubmitted(
            JSON.stringify(Object.fromEntries(data.entries()), null, 2) ||
              "{}"
          );
        }}
      >
        <RadioGroup
          name="channel"
          aria-label="Notification channel"
          defaultValue="email"
          required
        >
          <LabeledOptions idPrefix="form" />
        </RadioGroup>
        <Button type="submit">Submit</Button>
        {submitted !== null ? (
          <pre className="text-xs text-foreground/70 bg-muted rounded-md p-2">
            {submitted}
          </pre>
        ) : null}
      </form>
    );
  },
};

/** Figma showcase — the three states in a single view (node 562:3656). */
export const FigmaShowcase: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-10">
        <div className="flex flex-col items-center gap-2">
          <RadioGroup aria-label="Unselected" className="gap-0">
            <RadioGroupItem value="x" aria-label="Unselected" />
          </RadioGroup>
          <span className="text-xs text-foreground/70">Unselected</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <RadioGroup
            aria-label="Selected"
            className="gap-0"
            defaultValue="y"
          >
            <RadioGroupItem value="y" aria-label="Selected" />
          </RadioGroup>
          <span className="text-xs text-foreground/70">Selected</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <RadioGroup
            aria-label="Disabled"
            className="gap-0"
            disabled
          >
            <RadioGroupItem value="z" aria-label="Disabled" />
          </RadioGroup>
          <span className="text-xs text-foreground/70">Disabled</span>
        </div>
      </div>
    </div>
  ),
};
