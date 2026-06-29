import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Progress, Label, Button } from "@felix/ui";

/**
 * **Progress** — A horizontal progress bar built on `@radix-ui/react-progress`.
 *
 * - **Sizes** — `sm` (8 px, default) and `md` (14 px).
 * - **Colors** — `primary` (turquoise), `secondary` (foreground slate),
 *   `lime`, `danger`, `violet`. Track is always `bg-muted`; the indicator fill
 *   drives the colour.
 * - **Value** — pass `value` from 0 to `max` (defaults to 100). Pass
 *   `value={null}` to render an indeterminate bar.
 *
 * Accessibility: Radix exposes `role="progressbar"` with `aria-valuenow` /
 * `aria-valuemin` / `aria-valuemax`. Always pair with a visible label or
 * `aria-label` / `aria-labelledby`.
 */
const meta = {
  title: "Components/Atoms/Progress",
  component: Progress,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    value: {
      description:
        "Current progress value. Clamped to `[0, max]`. Use `null` for an indeterminate bar.",
      control: { type: "range", min: 0, max: 100, step: 1 },
      table: { type: { summary: "number | null" } },
    },
    max: {
      description: "Maximum value. Defaults to `100`.",
      control: "number",
      table: { defaultValue: { summary: "100" }, type: { summary: "number" } },
    },
    size: {
      description:
        "Visual size. `xs` is 4 px (good for top-of-screen steppers), `sm` is 8 px (default), `md` is 14 px for heavier UI.",
      control: { type: "inline-radio" },
      options: ["xs", "sm", "md"],
      table: {
        defaultValue: { summary: "sm" },
        type: { summary: `"xs" | "sm" | "md"` },
      },
    },
    color: {
      description: "Colour of the indicator fill (track stays `bg-muted`).",
      control: { type: "select" },
      options: ["primary", "secondary", "lime", "danger", "violet"],
      table: {
        defaultValue: { summary: "primary" },
        type: {
          summary: `"primary" | "secondary" | "lime" | "danger" | "violet"`,
        },
      },
    },
    className: {
      description: "Extra utility classes merged onto the track (via `cn`).",
      control: "text",
      table: { type: { summary: "string" } },
    },
  },
  args: {
    value: 60,
    "aria-label": "Progress",
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">xs</span>
        <Progress {...args} size="xs" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">sm (default)</span>
        <Progress {...args} size="sm" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">md</span>
        <Progress {...args} size="md" />
      </div>
    </div>
  ),
};

const COLORS = ["primary", "secondary", "lime", "danger", "violet"] as const;

export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      {COLORS.map((color) => (
        <div key={color} className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground capitalize">
            {color}
          </span>
          <Progress {...args} color={color} />
        </div>
      ))}
    </div>
  ),
};

export const ValueSteps: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      {[0, 25, 50, 75, 100].map((v) => (
        <div key={v} className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-10 tabular-nums">
            {v}%
          </span>
          <Progress {...args} value={v} aria-label={`progress ${v}%`} />
        </div>
      ))}
    </div>
  ),
};

/**
 * Demonstrates the `transition-transform` easing. Drives `value` from
 * `0 -> 100` on a 2 s loop.
 */
export const Animated: Story = {
  render: (args) => {
    const AnimatedProgress = () => {
      const [value, setValue] = React.useState(0);
      React.useEffect(() => {
        const id = setInterval(() => {
          setValue((prev) => (prev >= 100 ? 0 : prev + 5));
        }, 100);
        return () => clearInterval(id);
      }, []);
      return (
        <div className="flex flex-col gap-2 w-full max-w-md">
          <Progress {...args} value={value} />
          <span className="text-xs text-muted-foreground tabular-nums">
            {value}%
          </span>
        </div>
      );
    };
    return <AnimatedProgress />;
  },
};

/**
 * Indeterminate state — pass `value={null}` when the total duration is
 * unknown. Radix omits `aria-valuenow` so screen readers announce "busy".
 */
export const Indeterminate: Story = {
  argTypes: {
    value: { control: false, table: { disable: true } },
  },
  args: {
    value: undefined,
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Progress {...args} value={null} />
    </div>
  ),
};

/**
 * Realistic upload card — label + `%` readout above, bar below.
 */
export const WithLabel: Story = {
  render: (args) => (
    <div className="w-full max-w-md rounded-lg border border-border bg-background p-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="upload-progress">Uploading resume.pdf</Label>
        <span className="text-xs text-muted-foreground tabular-nums">
          {args.value ?? 0}%
        </span>
      </div>
      <Progress
        {...args}
        id="upload-progress"
        className="mt-2"
        aria-labelledby="upload-progress"
      />
    </div>
  ),
};

/**
 * Top-of-screen stepper — a common onboarding / checkout pattern where the
 * progress bar itself is the step indicator. Percent is derived from the
 * current step (`currentStep / totalSteps * 100`). Back / Next buttons drive
 * the state; on the last step the primary button turns into "Finish".
 *
 * The label row below reports the step number + title; screen readers get
 * `aria-valuetext` so the announcement is "Step 2 of 4: Address" rather than
 * the raw percentage.
 */
export const AsStepper: Story = {
  argTypes: {
    value: { control: false, table: { disable: true } },
    color: { control: false, table: { disable: true } },
    size: { control: false, table: { disable: true } },
  },
  render: () => {
    const STEPS = ["Personal info", "Address", "Payment", "Review"] as const;

    const Stepper = () => {
      const [step, setStep] = React.useState(1);
      const totalSteps = STEPS.length;
      const percent = (step / totalSteps) * 100;
      const title = STEPS[step - 1];
      const isFirst = step === 1;
      const isLast = step === totalSteps;

      return (
        <div className="w-full max-w-md rounded-lg border border-border bg-background p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Progress
              value={percent}
              size="xs"
              color="primary"
              aria-label={`Step ${step} of ${totalSteps}: ${title}`}
              aria-valuetext={`Step ${step} of ${totalSteps}: ${title}`}
            />
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">
                {title}
              </span>
              <span className="text-xs text-muted-foreground tabular-nums">
                Step {step} of {totalSteps}
              </span>
            </div>
          </div>

          <div className="min-h-20 rounded-md bg-muted/50 border border-dashed border-border p-4 text-sm text-muted-foreground">
            {`"${title}" form fields go here.`}
          </div>

          <div className="flex items-center justify-between gap-2">
            <Button
              variant="ghost"
              disabled={isFirst}
              onClick={() => setStep((s) => Math.max(1, s - 1))}
            >
              Back
            </Button>
            <Button
              variant="primary"
              onClick={() =>
                setStep((s) => (isLast ? s : Math.min(totalSteps, s + 1)))
              }
            >
              {isLast ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      );
    };

    return <Stepper />;
  },
};

/**
 * Mirrors Figma node `562:3695` — `sm` and `md` rows for each colour at 25 %.
 */
export const FigmaShowcase: Story = {
  args: { value: 25 },
  render: (args) => {
    const rows = (size: "sm" | "md") => (
      <div className="flex flex-col gap-3">
        {COLORS.map((color) => (
          <div
            key={`${size}-${color}`}
            className="grid grid-cols-[80px_1fr] items-center gap-3"
          >
            <span className="text-xs text-foreground capitalize">{color}</span>
            <Progress
              {...args}
              size={size}
              color={color}
              aria-label={`${size} ${color}`}
            />
          </div>
        ))}
      </div>
    );

    return (
      <div className="flex flex-col gap-6 w-full max-w-md">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-muted-foreground">
            SM
          </span>
          {rows("sm")}
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-muted-foreground">
            MD
          </span>
          {rows("md")}
        </div>
      </div>
    );
  },
};
