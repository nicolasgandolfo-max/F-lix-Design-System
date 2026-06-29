import type { Meta, StoryObj } from "@storybook/react";
import {
  PlusIcon,
  TrashIcon,
  PencilSimpleIcon,
  ArrowRightIcon,
  XIcon,
} from "@phosphor-icons/react";
import { IconButton } from "@felix/ui";

/**
 * An icon-only circular button. Use whenever an icon conveys the action without needing a text label.
 *
 * `aria-label` is **required** — it provides the accessible name that screen
 * readers announce in place of visible text.
 *
 */
const meta = {
  title: "Components/Atoms/IconButton",
  component: IconButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "Visual style of the button.",
      control: { type: "select" },
      options: ["primary", "secondary", "ghost", "danger", "line"],
      table: {
        defaultValue: { summary: "primary" },
        type: {
          summary: '"primary" | "secondary" | "ghost" | "danger" | "line"',
        },
      },
    },
    size: {
      description: "Size of the button. `sm` = 32px, `md` = 40px, `lg` = 48px.",
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      table: {
        defaultValue: { summary: "md" },
        type: { summary: '"sm" | "md" | "lg"' },
      },
    },
    icon: {
      description: "Icon to render. Required.",
      control: false,
      table: { type: { summary: "ReactNode" } },
    },
    "aria-label": {
      description: "Accessible label. Required since there is no visible text.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    disabled: {
      description: "Disables the button.",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    asChild: {
      description:
        "Merges all props onto the first child element (via `@radix-ui/react-slot`). Useful for rendering as `<a>` or Next.js `<Link>`.",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    className: {
      description: "Additional classes merged onto the element via `cn()`.",
      control: "text",
    },
  },
  args: {
    icon: <PlusIcon aria-hidden />,
    "aria-label": "Add item",
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default `md` primary button with a Plus icon.
 */
export const Default: Story = {};

/**
 * All 5 variants side by side at `md` size.
 */
export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton
        icon={<PlusIcon aria-hidden />}
        aria-label="Add"
        variant="primary"
      />
      <IconButton
        icon={<PlusIcon aria-hidden />}
        aria-label="Add"
        variant="secondary"
      />
      <IconButton
        icon={<PlusIcon aria-hidden />}
        aria-label="Add"
        variant="ghost"
      />
      <IconButton
        icon={<TrashIcon aria-hidden />}
        aria-label="Delete"
        variant="danger"
      />
      <IconButton
        icon={<PlusIcon aria-hidden />}
        aria-label="Add"
        variant="line"
      />
    </div>
  ),
};

/**
 * Three sizes — `sm` (32px), `md` (40px), and `lg` (48px).
 */
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton icon={<PlusIcon aria-hidden />} aria-label="Add" size="sm" />
      <IconButton icon={<PlusIcon aria-hidden />} aria-label="Add" size="md" />
      <IconButton icon={<PlusIcon aria-hidden />} aria-label="Add" size="lg" />
    </div>
  ),
};

/**
 * All variants in disabled state.
 */
export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton
        icon={<PlusIcon aria-hidden />}
        aria-label="Add"
        variant="primary"
        disabled
      />
      <IconButton
        icon={<PlusIcon aria-hidden />}
        aria-label="Add"
        variant="secondary"
        disabled
      />
      <IconButton
        icon={<PlusIcon aria-hidden />}
        aria-label="Add"
        variant="ghost"
        disabled
      />
      <IconButton
        icon={<TrashIcon aria-hidden />}
        aria-label="Delete"
        variant="danger"
        disabled
      />
      <IconButton
        icon={<PlusIcon aria-hidden />}
        aria-label="Add"
        variant="line"
        disabled
      />
    </div>
  ),
};

/**
 * Using `asChild` to render the button as an `<a>` tag — useful for icon-only
 * navigation links that should look like a button.
 */
export const AsChild: Story = {
  render: () => (
    <IconButton
      icon={<ArrowRightIcon aria-hidden />}
      aria-label="Go to next page"
      asChild
    >
      <a href="#next" />
    </IconButton>
  ),
};

/**
 * Dark mode rendering — wrap in a dark surface to preview contrast.
 */
export const DarkMode: Story = {
  parameters: { controls: { disable: true } },
  decorators: [
    (Story) => (
      <div className="dark rounded-xl bg-background p-8 flex items-center gap-3">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <IconButton
        icon={<PlusIcon aria-hidden />}
        aria-label="Add"
        variant="primary"
      />
      <IconButton
        icon={<PlusIcon aria-hidden />}
        aria-label="Add"
        variant="secondary"
      />
      <IconButton
        icon={<PlusIcon aria-hidden />}
        aria-label="Add"
        variant="ghost"
      />
      <IconButton
        icon={<TrashIcon aria-hidden />}
        aria-label="Delete"
        variant="danger"
      />
      <IconButton
        icon={<PlusIcon aria-hidden />}
        aria-label="Add"
        variant="line"
      />
    </>
  ),
};

/**
 * Grid matching the Figma canvas — all variants × all sizes, with disabled states.
 */
export const FigmaShowcase: Story = {
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    controls: { disable: true },
    mobileFrame: false,
  },
  render: () => (
    <div className="flex flex-col gap-8">
      {/* Sizes row */}
      <div>
        <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wide">
          Sizes
        </p>
        <div className="flex items-center gap-4">
          <IconButton
            icon={<PlusIcon aria-hidden />}
            aria-label="Add"
            size="sm"
          />
          <IconButton
            icon={<PlusIcon aria-hidden />}
            aria-label="Add"
            size="md"
          />
          <IconButton
            icon={<PlusIcon aria-hidden />}
            aria-label="Add"
            size="lg"
          />
        </div>
      </div>

      {/* Variants grid */}
      {(["primary", "secondary", "ghost", "danger", "line"] as const).map(
        (variant) => (
          <div key={variant}>
            <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wide">
              {variant}
            </p>
            <div className="flex items-center gap-3">
              {/* Default */}
              <IconButton
                icon={
                  variant === "danger" ? (
                    <TrashIcon aria-hidden />
                  ) : (
                    <PlusIcon aria-hidden />
                  )
                }
                aria-label="Action"
                variant={variant}
                size="sm"
              />
              <IconButton
                icon={
                  variant === "danger" ? (
                    <TrashIcon aria-hidden />
                  ) : (
                    <PencilSimpleIcon aria-hidden />
                  )
                }
                aria-label="Action"
                variant={variant}
                size="md"
              />
              <IconButton
                icon={
                  variant === "danger" ? (
                    <TrashIcon aria-hidden />
                  ) : (
                    <XIcon aria-hidden />
                  )
                }
                aria-label="Action"
                variant={variant}
                size="lg"
              />
              {/* Disabled */}
              <IconButton
                icon={
                  variant === "danger" ? (
                    <TrashIcon aria-hidden />
                  ) : (
                    <PlusIcon aria-hidden />
                  )
                }
                aria-label="Action (disabled)"
                variant={variant}
                size="md"
                disabled
              />
            </div>
          </div>
        )
      )}
    </div>
  ),
};
