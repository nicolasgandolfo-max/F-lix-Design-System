import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@felix/ui";
import {
  ArrowRightIcon,
  PaperPlaneTiltIcon,
  DownloadSimpleIcon,
  PlusIcon,
  TrashIcon,
} from "@phosphor-icons/react";

/**
 * Buttons trigger actions and navigation. All variants are pill-shaped (`rounded-full`).
 * Icons are passed as `children` alongside text and inherit the button's text color automatically.
 */
const meta = {
  title: "Components/Atoms/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description:
        "Visual style. Use `primary` for main CTAs, `secondary` for supporting actions, `danger` for destructive/irreversible actions, `ghost` for low-emphasis actions, and `line` for outlined actions.",
      control: { type: "select" },
      options: ["primary", "secondary", "ghost", "danger", "line"],
      table: {
        defaultValue: { summary: "primary" },
        type: { summary: "enum" },
      },
    },
    size: {
      description: "Controls padding and typography scale.",
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      table: {
        defaultValue: { summary: "md" },
        type: { summary: "enum" },
      },
    },
    fullWidth: {
      description:
        "Stretches the button to fill its container width — useful for mobile CTAs.",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    disabled: {
      description:
        "Disables the button. Prefer `loading` for in-flight requests.",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    asChild: {
      description:
        "When true, merges props onto the child (e.g. `<a>` or Next.js `<Link>`) via `@radix-ui/react-slot`.",
      control: false,
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    children: {
      description:
        "Button label, icon, or both. Icons inherit text color automatically.",
      control: "text",
      table: { type: { summary: "ReactNode" } },
    },
    className: {
      description: "Merged with internal styles via `cn()`",
      control: "text",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default primary button.
 */
export const Default: Story = {
  args: { children: "Get Started", variant: "primary", size: "md" },
};

/**
 * All five variants side by side.
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="line">Line</Button>
    </div>
  ),
};

/**
 * Small, Medium, and Large sizes.
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/**
 * Buttons with leading or trailing icons.
 * Icons are children — they inherit the button's text color and are auto-sized per size variant.
 * Pass `className="size-5"` on the SVG to override the default icon size.
 */
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="primary">
        Get Started <ArrowRightIcon />
      </Button>
      <Button variant="secondary">
        <PaperPlaneTiltIcon /> Send Money
      </Button>
      <Button variant="line">
        <DownloadSimpleIcon /> Download
      </Button>
      <Button variant="ghost" size="sm">
        <PlusIcon /> Add
      </Button>
      <Button variant="danger">
        <TrashIcon /> Delete
      </Button>
    </div>
  ),
};

/**
 * Disabled state across all variants.
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button disabled>Primary</Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
      <Button variant="ghost" disabled>
        Ghost
      </Button>
      <Button variant="danger" disabled>
        Danger
      </Button>
      <Button variant="line" disabled>
        Line
      </Button>
    </div>
  ),
};

/**
 * Full-width button — useful for mobile CTAs inside a constrained container.
 */
export const FullWidth: Story = {
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="flex flex-col gap-3">
      <Button fullWidth>Primary Full Width</Button>
      <Button variant="secondary" fullWidth>
        Secondary Full Width
      </Button>
      <Button variant="line" fullWidth>
        Line Full Width
      </Button>
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
    <div className="flex flex-col gap-4 rounded-xl bg-background p-8">
      <div className="flex flex-wrap gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="line">Line</Button>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button disabled>Disabled</Button>
        <Button variant="secondary" disabled>
          Disabled
        </Button>
      </div>
    </div>
  ),
};
