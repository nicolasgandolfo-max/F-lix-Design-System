import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Switch, Label } from "@felix/ui";

/**
 * **Switch** — A binary on/off toggle built on `@radix-ui/react-switch`.
 *
 * - **States** — off (unchecked), on (checked), disabled.
 * - **Sizes** — `md` (default, 24×44) and `sm` (20×36) for tighter UIs.
 * - **No built-in label** — compose with the Felix `Label` atom via
 *   `id` / `htmlFor` so the whole row is clickable and accessible.
 *
 * Follows the shadcn idiom of a `border-2 border-transparent` track, which
 * keeps the thumb inset fully tokenised — no raw pixel offsets.
 */
const meta = {
  title: "Components/Atoms/Switch",
  component: Switch,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      description:
        "Visual size. `md` (default) matches Figma at 24×44 px; `sm` shrinks to 20×36 px for dense layouts.",
      control: { type: "inline-radio" },
      options: ["md", "sm"],
      table: {
        defaultValue: { summary: "md" },
        type: { summary: `"md" | "sm"` },
      },
    },
    checked: {
      description:
        "Controlled checked state. Pair with `onCheckedChange` when driving the switch externally.",
      control: "boolean",
      table: { type: { summary: "boolean" } },
    },
    defaultChecked: {
      description:
        "Initial checked state for uncontrolled usage. Ignored when `checked` is supplied.",
      control: "boolean",
      table: { type: { summary: "boolean" } },
    },
    disabled: {
      description: "Disables user interaction and dims the track.",
      control: "boolean",
      table: { type: { summary: "boolean" } },
    },
    onCheckedChange: {
      description: "Called with the next checked value on user toggle.",
      action: "checked changed",
      table: { type: { summary: "(checked: boolean) => void" } },
    },
    name: {
      description: "Form field name — used when the switch is submitted.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    value: {
      description:
        "Submitted value when the switch is checked. Defaults to `'on'`.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    className: {
      description: "Extra utility classes merged onto the track (via `cn`).",
      control: "text",
      table: { type: { summary: "string" } },
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "aria-label": "Enable notifications",
  },
};

export const Checked: Story = {
  args: {
    "aria-label": "Enable notifications",
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <Switch id="dis-off" disabled />
        <Label htmlFor="dis-off" variant="disabled">
          Off · disabled
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="dis-on" disabled defaultChecked />
        <Label htmlFor="dis-on" variant="disabled">
          On · disabled
        </Label>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Switch id="size-md-off" />
        <Switch id="size-md-on" defaultChecked />
        <span className="text-sm text-muted-foreground">md (default)</span>
      </div>
      <div className="flex items-center gap-4">
        <Switch id="size-sm-off" size="sm" />
        <Switch id="size-sm-on" size="sm" defaultChecked />
        <span className="text-sm text-muted-foreground">sm</span>
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="with-label" />
      <Label htmlFor="with-label">Enable notifications</Label>
    </div>
  ),
};

/**
 * Realistic settings row — label + helper copy on the left, switch right-aligned.
 */
export const InSettingsRow: Story = {
  render: () => (
    <div className="w-full max-w-md rounded-lg border border-border bg-background p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Label htmlFor="settings-marketing">Marketing emails</Label>
          <p className="text-xs text-muted-foreground">
            Get occasional product updates, tips, and offers from Felix.
          </p>
        </div>
        <Switch id="settings-marketing" defaultChecked />
      </div>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const ControlledSwitch = () => {
      const [checked, setChecked] = React.useState(false);
      return (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Switch
              id="controlled"
              checked={checked}
              onCheckedChange={setChecked}
            />
            <Label htmlFor="controlled">Airplane mode</Label>
          </div>
          <p className="text-sm text-muted-foreground">
            Value: <span className="font-semibold">{String(checked)}</span>
          </p>
        </div>
      );
    };
    return <ControlledSwitch />;
  },
};

export const InForm: Story = {
  render: () => {
    const FormDemo = () => {
      const [submitted, setSubmitted] = React.useState<Record<string, string>>({});
      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = Object.fromEntries(
              new FormData(e.currentTarget).entries()
            ) as Record<string, string>;
            setSubmitted(data);
          }}
          className="flex flex-col gap-4 w-full max-w-xs"
        >
          <div className="flex items-center gap-2">
            <Switch id="form-notifs" name="notifications" value="on" />
            <Label htmlFor="form-notifs">Email notifications</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="form-tracking"
              name="analytics"
              value="on"
              defaultChecked
            />
            <Label htmlFor="form-tracking">Usage analytics</Label>
          </div>
          <button
            type="submit"
            className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground"
          >
            Save preferences
          </button>
          {Object.keys(submitted).length > 0 && (
            <pre className="text-xs bg-muted p-2 rounded-md">
              {JSON.stringify(submitted, null, 2)}
            </pre>
          )}
        </form>
      );
    };
    return <FormDemo />;
  },
};

/**
 * Mirrors Figma node `562:3664`: Off / On / Disabled row at the default `md` size.
 */
export const FigmaShowcase: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Switch aria-label="Off" />
        <span className="text-xs text-muted-foreground">Off</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Switch aria-label="On" defaultChecked />
        <span className="text-xs text-muted-foreground">On</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Switch aria-label="Disabled off" disabled />
        <span className="text-xs text-muted-foreground">Disabled · off</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Switch aria-label="Disabled on" disabled defaultChecked />
        <span className="text-xs text-muted-foreground">Disabled · on</span>
      </div>
    </div>
  ),
};
