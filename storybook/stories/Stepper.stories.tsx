import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "@felix/ui";

/**
 * **Stepper** — Horizontal progress indicator for linear, multi-step flows
 * (onboarding, checkout, wizards).
 *
 * Uses a compound API: a `<Stepper>` root defines the active step via
 * `activeIndex` (0-indexed), and each `<Stepper.Step>` derives its visual
 * state automatically:
 *
 * - Steps **before** `activeIndex` → `completed` (primary fill + check)
 * - Step **at** `activeIndex` → `active` (muted fill + primary border)
 * - Steps **after** `activeIndex` → `upcoming` (surface fill + neutral border)
 *
 * You can override the derived state per-step via the `state` prop.
 */
const meta = {
  title: "Components/Molecules/Stepper",
  component: Stepper,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { activeIndex: 0 },
  argTypes: {
    activeIndex: {
      description:
        "0-indexed position of the currently active step. Steps before are rendered as completed; steps after as upcoming.",
      control: { type: "number", min: 0, step: 1 },
      table: { type: { summary: "number" } },
    },
    className: {
      description: "Merged with internal styles via `cn()`.",
      control: "text",
    },
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ──────────────────────────────────────────────────────────────────

/**
 * Three-step stepper with the middle step active.
 */
export const Default: Story = {
  args: { activeIndex: 1 },
  render: (args) => (
    <div className="w-full max-w-[600px]">
      <Stepper {...args}>
        <Stepper.Step>Account</Stepper.Step>
        <Stepper.Step>Profile</Stepper.Step>
        <Stepper.Step>Review</Stepper.Step>
      </Stepper>
    </div>
  ),
};

// ─── Step counts (Figma showcase) ─────────────────────────────────────────────

/**
 * Three steps — active on the middle step.
 */
export const ThreeSteps: Story = {
  render: () => (
    <div className="w-full max-w-[600px]">
      <Stepper activeIndex={1}>
        <Stepper.Step>Step Label</Stepper.Step>
        <Stepper.Step>Step Label</Stepper.Step>
        <Stepper.Step>Step Label</Stepper.Step>
      </Stepper>
    </div>
  ),
};

/**
 * Four steps — active on the second step.
 */
export const FourSteps: Story = {
  render: () => (
    <div className="w-full max-w-[600px]">
      <Stepper activeIndex={1}>
        <Stepper.Step>Step Label</Stepper.Step>
        <Stepper.Step>Step Label</Stepper.Step>
        <Stepper.Step>Step Label</Stepper.Step>
        <Stepper.Step>Step Label</Stepper.Step>
      </Stepper>
    </div>
  ),
};

/**
 * Five steps — active on the middle step.
 */
export const FiveSteps: Story = {
  render: () => (
    <div className="w-full max-w-[600px]">
      <Stepper activeIndex={2}>
        <Stepper.Step>Step Label</Stepper.Step>
        <Stepper.Step>Step Label</Stepper.Step>
        <Stepper.Step>Step Label</Stepper.Step>
        <Stepper.Step>Step Label</Stepper.Step>
        <Stepper.Step>Step Label</Stepper.Step>
      </Stepper>
    </div>
  ),
};

// ─── States ───────────────────────────────────────────────────────────────────

/**
 * All three step states — upcoming (not yet started), active (in progress),
 * and completed (done). Demonstrated on standalone steppers using the `state`
 * prop override.
 */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-full max-w-[600px]">
      <div className="flex flex-col gap-3">
        <span className="text-[9px] font-medium uppercase tracking-widest text-muted-foreground">
          Upcoming
        </span>
        <Stepper activeIndex={-1}>
          <Stepper.Step>Step 1</Stepper.Step>
          <Stepper.Step>Step 2</Stepper.Step>
          <Stepper.Step>Step 3</Stepper.Step>
        </Stepper>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-[9px] font-medium uppercase tracking-widest text-muted-foreground">
          In progress
        </span>
        <Stepper activeIndex={1}>
          <Stepper.Step>Step 1</Stepper.Step>
          <Stepper.Step>Step 2</Stepper.Step>
          <Stepper.Step>Step 3</Stepper.Step>
        </Stepper>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-[9px] font-medium uppercase tracking-widest text-muted-foreground">
          Completed
        </span>
        <Stepper activeIndex={3}>
          <Stepper.Step>Step 1</Stepper.Step>
          <Stepper.Step>Step 2</Stepper.Step>
          <Stepper.Step>Step 3</Stepper.Step>
        </Stepper>
      </div>
    </div>
  ),
};

// ─── Active progression ───────────────────────────────────────────────────────

/**
 * Use the `activeIndex` control in the Storybook panel to scrub through the
 * progression (0 → 4) and observe each step transitioning from upcoming →
 * active → completed.
 */
export const ActiveProgression: Story = {
  args: { activeIndex: 0 },
  argTypes: {
    activeIndex: {
      control: { type: "range", min: 0, max: 4, step: 1 },
    },
  },
  render: (args) => (
    <div className="w-full max-w-[600px]">
      <Stepper {...args}>
        <Stepper.Step>Discover</Stepper.Step>
        <Stepper.Step>Verify</Stepper.Step>
        <Stepper.Step>Fund</Stepper.Step>
        <Stepper.Step>Confirm</Stepper.Step>
        <Stepper.Step>Done</Stepper.Step>
      </Stepper>
    </div>
  ),
};

// ─── Responsive ───────────────────────────────────────────────────────────────

/**
 * The Stepper fills its container width. Circles stay equally spaced and
 * connector lines always run between them, while labels wrap (multi-line if
 * needed) under each step. Three viewport widths shown side by side —
 * narrow (320px, typical small phone), medium (420px), and wide (640px).
 */
export const Responsive: Story = {
  parameters: { layout: "padded", mobileFrame: false },
  render: () => (
    <div className="flex flex-col gap-8">
      {[320, 420, 640].map((width) => (
        <div key={width} className="flex flex-col gap-2">
          <span className="text-[9px] font-medium uppercase tracking-widest text-muted-foreground">
            {width}px
          </span>
          <div
            className="rounded-lg border border-dashed border-border p-4"
            style={{ width }}
          >
            <Stepper activeIndex={2}>
              <Stepper.Step>Account details</Stepper.Step>
              <Stepper.Step>Identity verification</Stepper.Step>
              <Stepper.Step>Fund your wallet</Stepper.Step>
              <Stepper.Step>Confirm</Stepper.Step>
              <Stepper.Step>Done</Stepper.Step>
            </Stepper>
          </div>
        </div>
      ))}
    </div>
  ),
};

// ─── Dark mode ────────────────────────────────────────────────────────────────

/**
 * Dark mode — toggle the theme in the Storybook toolbar.
 */
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
    <div className="flex flex-col gap-8 rounded-xl bg-background p-8 w-full max-w-[640px]">
      <Stepper activeIndex={1}>
        <Stepper.Step>Account</Stepper.Step>
        <Stepper.Step>Profile</Stepper.Step>
        <Stepper.Step>Review</Stepper.Step>
      </Stepper>
      <Stepper activeIndex={3}>
        <Stepper.Step>Step 1</Stepper.Step>
        <Stepper.Step>Step 2</Stepper.Step>
        <Stepper.Step>Step 3</Stepper.Step>
        <Stepper.Step>Step 4</Stepper.Step>
        <Stepper.Step>Step 5</Stepper.Step>
      </Stepper>
    </div>
  ),
};
