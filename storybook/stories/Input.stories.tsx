import type { ComponentProps, ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  CheckFatIcon,
  EnvelopeIcon,
  InfoIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react";
import { Input } from "@felix/ui";

/**
 * A floating-label text field with interactive states, size variants, an optional
 * trailing icon, and a helper / error message area below.
 *
 * The label animates from an inline placeholder position to a floating label on
 * the top border when the field is focused or has a value — no JavaScript required.
 *
 * Based on the [Felix DS Figma spec](https://www.figma.com/design/xRPYO5ufQ0exGL2YoskunQ/DS-Felix-Pago-2026?node-id=514-22).
 */
const meta = {
  title: "Components/Atoms/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    label: {
      description:
        "Floating label text — visible at all times; moves to the top border on focus or when the field has a value.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    description: {
      description:
        "Helper text shown below the input. Replaced by `error` when an error message is set.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    error: {
      description:
        "Error message. When present, triggers error border/label styling and replaces the description text.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    size: {
      description:
        "Size variant. `md` (40 px) is the default; `sm` (32 px) for compact layouts.",
      control: { type: "select" },
      options: ["md", "sm"],
      table: {
        defaultValue: { summary: "md" },
        type: { summary: '"md" | "sm"' },
      },
    },
    icon: {
      description:
        "Trailing icon node (e.g. a Phosphor icon). Omit to render no icon.",
      control: false,
      table: { type: { summary: "ReactNode" } },
    },
    leftIcon: {
      description:
        "Leading icon node (e.g. a Phosphor icon). Omit to render no leading icon. " +
        "When present, the floating label shifts right to align with the input text.",
      control: false,
      table: { type: { summary: "ReactNode" } },
    },
    disabled: {
      description: "Disables the field.",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    className: {
      description:
        "Additional classes merged onto the native `<input>` element via `cn()`.",
      control: "text",
    },
    wrapperClassName: {
      description: "Additional classes merged onto the outer wrapper `<div>`.",
      control: "text",
    },
  },
  args: {
    label: "Email address",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default — MD size, label inline, trailing info icon and helper text.
 * Click the field to see the floating label animation.
 */
export const Default: Story = {
  args: {
    label: "Email address",
    description: "Field Description",
    size: "md",
    icon: <InfoIcon size={16} aria-hidden />,
  },
  decorators: [
    (Story) => (
      <div className="w-[260px]">
        <Story />
      </div>
    ),
  ],
};

/**
 * All five interactive states side by side (MD size).
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[260px]">
      {/* Default */}
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">Default</p>
        <Input
          label="Email address"
          description="Field Description"
          icon={<InfoIcon size={16} aria-hidden />}
        />
      </div>

      {/* Focused — user must click to trigger; shown here with a value pre-filled */}
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">
          Focused (click the field)
        </p>
        <Input
          label="Email address"
          description="Field Description"
          icon={<InfoIcon size={16} aria-hidden />}
        />
      </div>

      {/* Filled */}
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">Filled</p>
        <Input
          label="Email address"
          description="Field Description"
          defaultValue="hello@felix.com"
          icon={<InfoIcon size={16} aria-hidden />}
        />
      </div>

      {/* Error */}
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">Error</p>
        <Input
          label="Email address"
          defaultValue="bad-email"
          error="Field Description"
          icon={<InfoIcon size={16} aria-hidden />}
        />
      </div>

      {/* Disabled */}
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">Disabled</p>
        <Input
          label="Email address"
          description="Field Description"
          icon={<InfoIcon size={16} aria-hidden />}
          disabled
        />
      </div>
    </div>
  ),
};

/**
 * MD vs SM sizes.
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[260px]">
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">MD (default) — 40px</p>
        <Input
          label="Email address"
          description="Field Description"
          size="md"
          icon={<InfoIcon size={16} aria-hidden />}
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">SM — 32px</p>
        <Input
          label="Email address"
          size="sm"
          icon={<InfoIcon size={16} aria-hidden />}
        />
      </div>
    </div>
  ),
};

/**
 * Error state with an explicit error message.
 */
export const Error: Story = {
  args: {
    label: "Email address",
    defaultValue: "not-an-email",
    error: "Please enter a valid email address.",
    icon: <InfoIcon size={16} aria-hidden />,
  },
  decorators: [
    (Story) => (
      <div className="w-[260px]">
        <Story />
      </div>
    ),
  ],
};

/**
 * Disabled state — non-interactive, muted background, 50% opacity.
 */
export const Disabled: Story = {
  args: {
    label: "Email address",
    description: "Field Description",
    disabled: true,
    icon: <InfoIcon size={16} aria-hidden />,
  },
  decorators: [
    (Story) => (
      <div className="w-[260px]">
        <Story />
      </div>
    ),
  ],
};

/**
 * Without a trailing icon — simply omit the `icon` prop.
 */
export const WithoutIcon: Story = {
  args: {
    label: "Email address",
    description: "Field Description",
  },
  decorators: [
    (Story) => (
      <div className="w-[260px]">
        <Story />
      </div>
    ),
  ],
};

/**
 * Any Phosphor icon (or any ReactNode) can be passed via the `icon` prop.
 */
export const CustomIcon: Story = {
  render: () => (
    <div className="w-[260px]">
      <Input
        label="Search"
        description="Type to filter results"
        icon={<MagnifyingGlassIcon size={16} aria-hidden />}
      />
    </div>
  ),
};

/**
 * Leading icon only — pass a Phosphor (or any) icon to the `leftIcon` prop.
 * The floating label shifts right to align with the input text.
 */
export const LeftIcon: Story = {
  args: {
    label: "Search",
    description: "Field Description",
    leftIcon: <MagnifyingGlassIcon size={16} aria-hidden />,
  },
  decorators: [
    (Story) => (
      <div className="w-[260px]">
        <Story />
      </div>
    ),
  ],
};

/**
 * Both leading and trailing icons — combine `leftIcon` and `icon`.
 * Matches the Figma spec at node `797:2575`.
 */
export const LeadingAndTrailing: Story = {
  args: {
    label: "Label",
    description: "Field Description",
    leftIcon: <CheckFatIcon size={16} aria-hidden />,
    icon: <InfoIcon size={16} aria-hidden />,
  },
  decorators: [
    (Story) => (
      <div className="w-[260px]">
        <Story />
      </div>
    ),
  ],
};

/**
 * Leading icon across all five interactive states.
 */
export const LeftIconStates: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-[260px]">
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">Default</p>
        <Input
          label="Email address"
          description="Field Description"
          leftIcon={<EnvelopeIcon size={16} aria-hidden />}
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">Filled</p>
        <Input
          label="Email address"
          description="Field Description"
          defaultValue="hello@felix.com"
          leftIcon={<EnvelopeIcon size={16} aria-hidden />}
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">Error</p>
        <Input
          label="Email address"
          defaultValue="bad-email"
          error="Please enter a valid email address."
          leftIcon={<EnvelopeIcon size={16} aria-hidden />}
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">Disabled</p>
        <Input
          label="Email address"
          description="Field Description"
          leftIcon={<EnvelopeIcon size={16} aria-hidden />}
          disabled
        />
      </div>
    </div>
  ),
};

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
    <div className="flex flex-col gap-6 rounded-xl bg-background p-8 w-[320px]">
      <Input
        label="Email address"
        description="Field Description"
        icon={<InfoIcon size={16} aria-hidden />}
      />
      <Input
        label="Email address"
        description="Field Description"
        defaultValue="hello@felix.com"
        icon={<InfoIcon size={16} aria-hidden />}
      />
      <Input
        label="Email address"
        defaultValue="bad-email"
        error="Invalid email address."
        icon={<InfoIcon size={16} aria-hidden />}
      />
      <Input
        label="Email address"
        description="Field Description"
        icon={<InfoIcon size={16} aria-hidden />}
        disabled
      />
    </div>
  ),
};

/**
 * Side-by-side comparison matching the Figma showcase layout.
 *
 * Covers the full matrix:
 *   • Icon placements — trailing only, leading only, leading + trailing.
 *   • Sizes — MD (default, 40 px) and SM (32 px).
 *   • States — default, filled, filled (focused), error, disabled.
 */
export const FigmaShowcase: Story = {
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    controls: { disable: true },
    mobileFrame: false,
  },
  render: () => {
    const info = <InfoIcon size={16} aria-hidden />;
    const check = <CheckFatIcon size={16} aria-hidden />;

    type IconConfig = {
      heading: string;
      leftIcon?: ReactNode;
      icon?: ReactNode;
    };

    type RowConfig = Omit<
      ComponentProps<typeof Input>,
      "size" | "leftIcon" | "icon"
    >;

    const rows: RowConfig[] = [
      { label: "Email address", description: "Field Description" },
      {
        label: "Email address",
        description: "Field Description",
        defaultValue: "Placeholder...",
      },
      {
        label: "Email address",
        description: "Field Description",
        defaultValue: "Placeholder...",
      },
      {
        label: "Email address",
        defaultValue: "Placeholder...",
        error: "Field Description",
      },
      {
        label: "Email address",
        description: "Field Description",
        disabled: true,
      },
    ];

    const columns: IconConfig[] = [
      { heading: "Trailing icon", icon: info },
      { heading: "Leading icon", leftIcon: check },
      { heading: "Leading + trailing", leftIcon: check, icon: info },
    ];

    return (
      <div className="flex flex-col gap-10">
        {columns.map(({ heading, leftIcon, icon }) => (
          <section key={heading} className="flex flex-col gap-3">
            <h3 className="font-sans text-sm font-semibold text-foreground">
              {heading}
            </h3>
            <div className="flex gap-6">
              {/* MD column */}
              <div className="flex flex-col gap-6 w-[260px]">
                <p className="text-xs text-muted-foreground">MD — 40 px</p>
                {rows.map((row, idx) => (
                  <Input
                    key={`md-${heading}-${idx}`}
                    {...row}
                    leftIcon={leftIcon}
                    icon={icon}
                  />
                ))}
              </div>

              {/* SM column */}
              <div className="flex flex-col gap-6 w-[260px]">
                <p className="text-xs text-muted-foreground">SM — 32 px</p>
                {rows.map((row, idx) => (
                  <Input
                    key={`sm-${heading}-${idx}`}
                    {...row}
                    size="sm"
                    leftIcon={leftIcon}
                    icon={icon}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    );
  },
};
