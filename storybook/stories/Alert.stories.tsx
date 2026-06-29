import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertDescription, AlertTitle } from "@felix/ui";

/**
 * **Alert** — Contextual feedback messages for user actions.
 *
 * Six variants cover the standard status and brand surfaces:
 *
 * - **default** — soft brand info surface (Info icon)
 * - **success** — confirmation of a successful action (CheckCircle icon)
 * - **warning** — non-blocking caution (WarningCircle icon)
 * - **error** — recoverable failure (WarningOctagon icon)
 * - **destructive** — high-emphasis, irreversible/critical (Fire icon)
 * - **general** — dark brand surface for high-visibility info (Info icon)
 *
 * The component is a compound: `Alert` is the container, with
 * `AlertTitle` and `AlertDescription` as children. The variant icon is
 * rendered automatically; pass `icon={<MyIcon />}` to override it, or
 * `icon={null}` to omit it.
 */
const meta = {
  title: "Components/Molecules/Alert",
  component: Alert,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { variant: "default" },
  argTypes: {
    variant: {
      description:
        "Visual style. Determines background, border, text colors, and the default icon.",
      control: { type: "select" },
      options: [
        "default",
        "success",
        "warning",
        "error",
        "destructive",
        "general",
      ],
      table: {
        type: { summary: "AlertVariant" },
        defaultValue: { summary: "default" },
      },
    },
    icon: {
      description:
        "Override the default icon for the variant. Pass `null` to omit.",
      control: false,
      table: { type: { summary: "ReactNode | null" } },
    },
    className: {
      description: "Merged with internal styles via `cn()`.",
      control: "text",
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ──────────────────────────────────────────────────────────────────

/**
 * Default informational alert.
 */
export const Default: Story = {
  render: (args) => (
    <div className="w-[320px]">
      <Alert {...args}>
        <AlertTitle>Alert Title</AlertTitle>
        <AlertDescription>Introduce here the alert description</AlertDescription>
      </Alert>
    </div>
  ),
};

// ─── Variants (Figma showcase) ────────────────────────────────────────────────

/**
 * All five variants stacked, mirroring the Figma showcase.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[320px]">
      {(
        [
          "default",
          "success",
          "warning",
          "error",
          "destructive",
          "general",
        ] as const
      ).map((variant) => (
        <Alert key={variant} variant={variant}>
          <AlertTitle>Alert Title</AlertTitle>
          <AlertDescription>
            Introduce here the alert description
          </AlertDescription>
        </Alert>
      ))}
    </div>
  ),
};

/**
 * `success` — confirmation feedback (e.g., "Saved", "Verified").
 */
export const Success: Story = {
  args: { variant: "success" },
  render: (args) => (
    <div className="w-[320px]">
      <Alert {...args}>
        <AlertTitle>Payment received</AlertTitle>
        <AlertDescription>
          Your transfer has been confirmed and credited.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

/**
 * `warning` — non-blocking caution (e.g., quota nearing limit).
 */
export const Warning: Story = {
  args: { variant: "warning" },
  render: (args) => (
    <div className="w-[320px]">
      <Alert {...args}>
        <AlertTitle>Approaching limit</AlertTitle>
        <AlertDescription>
          You have used 80% of your monthly transfer quota.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

/**
 * `error` — recoverable failure that needs the user's attention.
 */
export const Error: Story = {
  args: { variant: "error" },
  render: (args) => (
    <div className="w-[320px]">
      <Alert {...args}>
        <AlertTitle>Transfer failed</AlertTitle>
        <AlertDescription>
          Please verify your account details and try again.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

/**
 * `destructive` — high-emphasis, irreversible or critical actions.
 */
export const Destructive: Story = {
  args: { variant: "destructive" },
  render: (args) => (
    <div className="w-[320px]">
      <Alert {...args}>
        <AlertTitle>Account closure scheduled</AlertTitle>
        <AlertDescription>
          This action cannot be undone after 30 days.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

/**
 * `general` — dark brand surface for high-visibility informational
 * messages (e.g. promos, system-wide announcements). Uses the same
 * `Info` icon as `default`.
 */
export const General: Story = {
  args: { variant: "general" },
  render: (args) => (
    <div className="w-[320px]">
      <Alert {...args}>
        <AlertTitle>New feature available</AlertTitle>
        <AlertDescription>
          Try our redesigned transfer flow from the home screen.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

// ─── Composition ──────────────────────────────────────────────────────────────

/**
 * Title only — useful for terse confirmations.
 */
export const TitleOnly: Story = {
  args: { variant: "success" },
  render: (args) => (
    <div className="w-[320px]">
      <Alert {...args}>
        <AlertTitle>Saved.</AlertTitle>
      </Alert>
    </div>
  ),
};

/**
 * No icon — pass `icon={null}` to render a text-only alert.
 */
export const NoIcon: Story = {
  args: { variant: "default", icon: null },
  render: (args) => (
    <div className="w-[320px]">
      <Alert {...args}>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>
          You can render an alert without any icon.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

/**
 * Long description — verifies that wrapping looks correct in a constrained
 * container.
 */
export const LongDescription: Story = {
  args: { variant: "warning" },
  render: (args) => (
    <div className="w-[320px]">
      <Alert {...args}>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>
          This alert contains a longer description that should wrap across
          multiple lines while keeping the icon aligned to the top of the
          content.
        </AlertDescription>
      </Alert>
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
    <div className="flex flex-col gap-3 rounded-xl bg-background p-8 w-[360px]">
      {(
        [
          "default",
          "success",
          "warning",
          "error",
          "destructive",
          "general",
        ] as const
      ).map((variant) => (
        <Alert key={variant} variant={variant}>
          <AlertTitle>Alert Title</AlertTitle>
          <AlertDescription>
            Introduce here the alert description
          </AlertDescription>
        </Alert>
      ))}
    </div>
  ),
};
