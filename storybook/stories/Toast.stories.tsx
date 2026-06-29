import type { Meta, StoryObj } from "@storybook/react";
import { InfoIcon } from "@phosphor-icons/react";

import { Button, Toaster, toast } from "@felix/ui";

/**
 * **Toast** — non-blocking notification messages, powered by
 * [Sonner](https://sonner.emilkowal.ski/).
 *
 * Drop a single `<Toaster />` near the root of your app, then call
 * `toast(...)` from anywhere to fire a notification. Stacking,
 * swipe-to-dismiss, hotkeys (`Alt + T`), pause-on-hover, and
 * accessibility (`role="status"` per toast) are all handled by Sonner —
 * Felix only re-themes the visual surface to match the design system.
 *
 * Two visual variants per Figma:
 *
 * - **default** — soft brand surface (light teal). Use for routine
 *   informational toasts.
 * - **secondary** — dark brand surface (deep teal) for higher-emphasis
 *   notifications. Fire with `toast.secondary(...)`.
 *
 * Figma reference: [Sonner / Toast](https://www.figma.com/design/xRPYO5ufQ0exGL2YoskunQ/DS-Felix-Pago-2026?node-id=714-1123).
 */
const meta = {
  title: "Components/Molecules/Toast",
  component: Toaster,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    position: {
      description: "Where toasts mount on the screen.",
      control: { type: "select" },
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
      table: {
        type: { summary: "Position" },
        defaultValue: { summary: '"bottom-right"' },
      },
    },
    expand: {
      description: "Always expand the stack instead of collapsing into a peek.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    closeButton: {
      description: "Show a close button on each toast.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    duration: {
      description: "Auto-dismiss duration in ms.",
      control: { type: "number", min: 1000, step: 500 },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "4000" },
      },
    },
    theme: {
      description: "Sonner color scheme (Felix overrides most of this).",
      control: { type: "radio" },
      options: ["light", "dark", "system"],
      table: {
        type: { summary: '"light" | "dark" | "system"' },
        defaultValue: { summary: '"system"' },
      },
    },
  },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

// Convenience for stories — Phosphor's Info icon, sized for the slot.
const infoIcon = <InfoIcon weight="duotone" />;

// ─── Default ──────────────────────────────────────────────────────────────────

/**
 * Click the button to fire a `default` toast.
 */
export const Default: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-4">
      <Button
        onClick={() =>
          toast("Notification", {
            icon: infoIcon,
            description: "You have a new message.",
          })
        }
      >
        Show toast
      </Button>
      <Toaster {...args} position="top-right" />
    </div>
  ),
};

// ─── Secondary ────────────────────────────────────────────────────────────────

/**
 * `toast.secondary(...)` — dark brand surface for higher-emphasis
 * notifications. Slot-by-slot class merges happen automatically; the
 * `secondary` overrides only swap the toast surface and the action
 * button.
 */
export const Secondary: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-4">
      <Button
        onClick={() =>
          toast.secondary("Notification", {
            icon: infoIcon,
            description: "You have a new message.",
          })
        }
      >
        Show secondary toast
      </Button>
      <Toaster {...args} />
    </div>
  ),
};

// ─── With action ──────────────────────────────────────────────────────────────

/**
 * Add an `action` to give the user a one-tap response (e.g. Decline,
 * Undo). Mirrors the Figma showcase tag.
 */
export const WithAction: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <Button
          onClick={() =>
            toast("Notification", {
              icon: infoIcon,
              description: "You have a new message.",
              action: {
                label: "Decline",
                onClick: () => toast("Declined."),
              },
            })
          }
        >
          Default with action
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast.secondary("Notification", {
              icon: infoIcon,
              description: "You have a new message.",
              action: {
                label: "Decline",
                onClick: () => toast("Declined."),
              },
            })
          }
        >
          Secondary with action
        </Button>
      </div>
      <Toaster {...args} />
    </div>
  ),
};

// ─── Multiple (stacking) ──────────────────────────────────────────────────────

/**
 * Sonner stacks toasts natively — fire several in a row to see the
 * peek-out effect from the Figma "Multiple" row. Hover the stack to
 * expand it; toasts auto-dismiss after the configured duration.
 */
export const Multiple: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-4">
      <Button
        onClick={() => {
          toast("First notification", {
            icon: infoIcon,
            description: "You have a new message.",
          });
          toast("Second notification", {
            icon: infoIcon,
            description: "You have a new message.",
          });
          toast("Third notification", {
            icon: infoIcon,
            description: "You have a new message.",
          });
        }}
      >
        Fire 3 toasts
      </Button>
      <Toaster {...args} />
    </div>
  ),
};

// ─── No icon ──────────────────────────────────────────────────────────────────

/**
 * The icon is opt-in. Omit it for terse text-only notifications.
 */
export const NoIcon: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-4">
      <Button
        onClick={() =>
          toast("Saved", { description: "Your changes are now live." })
        }
      >
        Show text-only toast
      </Button>
      <Toaster {...args} />
    </div>
  ),
};

// ─── Showcase (matches Figma layout) ──────────────────────────────────────────

/**
 * Figma showcase — "Simple" row (Default + Secondary, single) and
 * "Multiple" row (Default + Secondary, stacked). Use the buttons to
 * fire each individually.
 */
export const FigmaShowcase: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6 w-[420px]">
      <section className="flex flex-col gap-2">
        <h4 className="font-sans text-xs text-muted-foreground">Simple</h4>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() =>
              toast("Notification", {
                icon: infoIcon,
                description: "You have a new message.",
                action: { label: "Decline", onClick: () => undefined },
              })
            }
          >
            Default
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              toast.secondary("Notification", {
                icon: infoIcon,
                description: "You have a new message.",
                action: { label: "Decline", onClick: () => undefined },
              })
            }
          >
            Secondary
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h4 className="font-sans text-xs text-muted-foreground">Multiple</h4>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => {
              for (let i = 0; i < 3; i++) {
                toast(`Notification ${i + 1}`, {
                  icon: infoIcon,
                  description: "You have a new message.",
                  action: { label: "Decline", onClick: () => undefined },
                });
              }
            }}
          >
            Default ×3
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              for (let i = 0; i < 3; i++) {
                toast.secondary(`Notification ${i + 1}`, {
                  icon: infoIcon,
                  description: "You have a new message.",
                  action: { label: "Decline", onClick: () => undefined },
                });
              }
            }}
          >
            Secondary ×3
          </Button>
        </div>
      </section>

      <Toaster {...args} />
    </div>
  ),
};

// ─── Dark mode ────────────────────────────────────────────────────────────────

/**
 * Dark mode — both variants are mode-invariant (mirroring Felix's
 * status alerts), so colors stay consistent across themes.
 */
export const DarkMode: Story = {
  parameters: { backgrounds: { default: "dark" } },
  decorators: [
    (Story) => (
      <div className="dark bg-background p-8 rounded-xl">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <Button
          onClick={() =>
            toast("Notification", {
              icon: infoIcon,
              description: "You have a new message.",
              action: { label: "Decline", onClick: () => undefined },
            })
          }
        >
          Default
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast.secondary("Notification", {
              icon: infoIcon,
              description: "You have a new message.",
              action: { label: "Decline", onClick: () => undefined },
            })
          }
        >
          Secondary
        </Button>
      </div>
      <Toaster {...args} theme="dark" />
    </div>
  ),
};
