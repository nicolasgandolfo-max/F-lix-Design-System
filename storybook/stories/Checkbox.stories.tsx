import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Checkbox, Label } from "@felix/ui";

/**
 * **Checkbox** — Selection control with checked / unchecked / indeterminate /
 * disabled states, adapted from `@radix-ui/react-checkbox` and styled to Figma
 * node `562:3647`.
 *
 * Ships **no built-in label**. Compose with the Felix `Label` atom via the
 * `id` / `htmlFor` pair — that keeps single-responsibility atoms and gives
 * consumers full control over typography, required / optional markers, and
 * layout (inline, stacked, two-column, …).
 */
const meta = {
  title: "Components/Atoms/Checkbox",
  component: Checkbox,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      description: "Visual size. `md` = 20 px (default), `sm` = 16 px.",
      control: { type: "radio" },
      options: ["md", "sm"],
      table: {
        defaultValue: { summary: "md" },
        type: { summary: '"md" | "sm"' },
      },
    },
    checked: {
      description:
        'Controlled state. Accepts `true`, `false`, or `"indeterminate"`.',
      control: { type: "select" },
      options: [undefined, true, false, "indeterminate"],
      table: { type: { summary: 'boolean | "indeterminate"' } },
    },
    defaultChecked: {
      description: "Uncontrolled initial state.",
      control: "boolean",
      table: { type: { summary: 'boolean | "indeterminate"' } },
    },
    disabled: {
      description: "Disables the control.",
      control: "boolean",
      table: { type: { summary: "boolean" } },
    },
    required: {
      description: "Marks the control as required for form submission.",
      control: "boolean",
      table: { type: { summary: "boolean" } },
    },
    name: {
      description: "Form field name (submitted when checked).",
      control: "text",
    },
    value: {
      description: "Form field value.",
      control: "text",
    },
    onCheckedChange: {
      description:
        "Called with the next checked state (`boolean | \"indeterminate\"`).",
      table: { type: { summary: "(checked) => void" } },
      action: "onCheckedChange",
    },
    className: {
      description: "Additional utility classes (merged with `cn`).",
      control: "text",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { "aria-label": "Accept terms" },
};

export const Checked: Story = {
  args: { defaultChecked: true, "aria-label": "Accept terms" },
};

export const Indeterminate: Story = {
  render: (args) => <Checkbox {...args} checked="indeterminate" />,
  args: { "aria-label": "Select all" },
};

export const Disabled: Story = {
  args: { disabled: true, "aria-label": "Disabled" },
};

/** Both sizes (`md` 20 px default, `sm` 16 px) for dense layouts. */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <Checkbox id="size-md" defaultChecked />
        <Label htmlFor="size-md">Medium (20 px)</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="size-sm" size="sm" defaultChecked />
        <Label htmlFor="size-sm">Small (16 px)</Label>
      </div>
    </div>
  ),
};

/** Composed with the Felix `Label` atom — recommended pattern. */
export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">I agree to the terms</Label>
    </div>
  ),
};

/** Stacked list with required / optional labels. */
export const Group: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="news" defaultChecked />
        <Label htmlFor="news">Product news</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="tips" />
        <Label htmlFor="tips" variant="optional">
          Tips and tutorials
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="promo" />
        <Label htmlFor="promo">Promotions</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="tos" required />
        <Label htmlFor="tos" variant="required">
          Terms of service
        </Label>
      </div>
    </div>
  ),
};

/** Native form submission — checked values are sent as `name=value`. */
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
        <div className="flex items-center gap-2">
          <Checkbox id="f-news" name="news" value="on" defaultChecked />
          <Label htmlFor="f-news">Product news</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="f-tips" name="tips" value="on" />
          <Label htmlFor="f-tips">Tips</Label>
        </div>
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

/**
 * **Parent / children tree** — the classic use case for the indeterminate
 * state. The parent reflects the aggregated state of its children:
 *
 * - no child selected → parent is `unchecked`
 * - some (but not all) children selected → parent is `indeterminate`
 * - every child selected → parent is `checked`
 *
 * Toggling the parent cascades the new value down to every child.
 */
export const ParentChildrenTree: Story = {
  render: () => {
    const ITEMS = [
      { id: "tree-email", label: "Email notifications" },
      { id: "tree-sms", label: "SMS notifications" },
      { id: "tree-push", label: "Push notifications" },
    ] as const;

    const [children, setChildren] = React.useState<Record<string, boolean>>({
      "tree-email": true,
      "tree-sms": false,
      "tree-push": false,
    });

    const checkedCount = Object.values(children).filter(Boolean).length;
    const parentState: boolean | "indeterminate" =
      checkedCount === 0
        ? false
        : checkedCount === ITEMS.length
          ? true
          : "indeterminate";

    const handleParentChange = (next: boolean | "indeterminate") => {
      const value = next === true;
      setChildren(
        Object.fromEntries(ITEMS.map(({ id }) => [id, value]))
      );
    };

    const handleChildChange = (id: string) => (next: boolean | "indeterminate") => {
      setChildren((prev) => ({ ...prev, [id]: next === true }));
    };

    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Checkbox
            id="tree-parent"
            checked={parentState}
            onCheckedChange={handleParentChange}
            aria-controls={ITEMS.map((item) => item.id).join(" ")}
          />
          <Label htmlFor="tree-parent">Notifications</Label>
        </div>

        <div className="ml-7 flex flex-col gap-2">
          {ITEMS.map(({ id, label }) => (
            <div key={id} className="flex items-center gap-2">
              <Checkbox
                id={id}
                checked={children[id]}
                onCheckedChange={handleChildChange(id)}
              />
              <Label htmlFor={id}>{label}</Label>
            </div>
          ))}
        </div>

        <p className="mt-2 text-xs text-foreground/60">
          Parent is{" "}
          <code className="font-mono">
            {parentState === "indeterminate"
              ? "indeterminate"
              : parentState
                ? "checked"
                : "unchecked"}
          </code>{" "}
          — {checkedCount} of {ITEMS.length} selected.
        </p>
      </div>
    );
  },
};

/** Figma showcase — all four states in a single view (node 562:3647). */
export const FigmaShowcase: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <Checkbox aria-label="Unchecked" />
          <span className="text-xs text-foreground/70">Unchecked</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Checkbox aria-label="Checked" defaultChecked />
          <span className="text-xs text-foreground/70">Checked</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Checkbox aria-label="Indeterminate" checked="indeterminate" />
          <span className="text-xs text-foreground/70">Indeterminate</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Checkbox aria-label="Disabled" disabled />
          <span className="text-xs text-foreground/70">Disabled</span>
        </div>
      </div>
    </div>
  ),
};
