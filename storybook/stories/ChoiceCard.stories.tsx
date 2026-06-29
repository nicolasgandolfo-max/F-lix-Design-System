import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  StarIcon,
  ShieldCheckIcon,
  LightningIcon,
  ThumbsUpIcon,
} from "@phosphor-icons/react";
import { ChoiceCard, ChoiceCardGroup } from "@felix/ui";

/**
 * A selectable card molecule that wraps `@radix-ui/react-radio-group`.
 * Each card combines an icon, title, and description into a single
 * tappable/clickable unit. Use `ChoiceCardGroup` to manage selection state.
 *
 * Three visual variants match the Figma spec:
 * - **white** — white card with radio indicator (default)
 * - **primary** — full turquoise card with lime badge indicator
 * - **compress** — vertically stacked card for location-style pickers
 *
 * Two optional features (white only):
 * - `details` — row of outlined pill chips below the description
 * - `onDelete` — renders a destructive trash button on unselected cards
 *
 * ### Navigation?
 * If clicking the card should navigate (not submit/select in a form), use
 * [`ChoiceCardLink`](/?path=/docs/components-molecules-choicecardlink--docs)
 * instead. It shares the same visual language but renders as an `<a>` and
 * supports `asChild` for framework `<Link>` components.
 *
 * Figma reference: [Choice Card](https://www.figma.com/design/xRPYO5ufQ0exGL2YoskunQ/F%C3%A9lix---DS-2026?node-id=1033-8355)
 */
const meta = {
  title: "Components/Molecules/ChoiceCard",
  component: ChoiceCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    value: "default",
    title: "Payment option",
  },
  argTypes: {
    variant: {
      description:
        "Visual style of the card. `compress` is a vertically stacked layout for location-style pickers (avatar + title + address, separator, distance/status/eta footer).",
      options: ["white", "primary", "compress"],
      table: {
        type: { summary: '"white" | "primary" | "compress"' },
        defaultValue: { summary: '"white"' },
      },
    },
    size: {
      description:
        'Visual size. `"sm"` is compact (12px padding, 8px radius, 32px icon slot). `"md"` is larger (24px padding, 16px radius, 48px icon slot).',
      options: ["sm", "md"],
      control: "inline-radio",
      table: {
        type: { summary: '"sm" | "md"' },
        defaultValue: { summary: '"sm"' },
      },
    },
    title: {
      description: "Main label shown in semibold.",
      control: "text",
    },
    description: {
      description: "Optional secondary caption text.",
      control: "text",
    },
    disabled: {
      description: "Disables this individual card.",
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    badge: {
      description:
        'Optional short label rendered as a pill to the right of the title (e.g. "Faster", "New"). Combine with `badgeIcon` for icon + text, or omit for an icon-only pill.',
      control: "text",
    },
    badgeIcon: {
      description:
        "Optional ~8 px icon rendered before the badge label. Pass any Phosphor (or compatible) icon. When set without `badge`, renders an icon-only pill.",
      control: false,
      table: { type: { summary: "React.ReactNode" } },
    },
    badgeVariant: {
      description:
        "Badge pill color. Defaults to the natural match for the card `variant` (`secondary` on white, `link` on primary).",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
      ],
      control: "select",
      table: {
        type: {
          summary:
            '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"',
        },
      },
    },
    details: {
      description:
        "White variant only — row of small outlined pill chips rendered below the description. Useful for lightweight feature flags / qualifiers like `[\"Faster\", \"Free\"]`.",
      control: "object",
      table: { type: { summary: "string[]" } },
    },
    onDelete: {
      description:
        "White variant only — when provided, renders a destructive (orange) trash button in place of the radio indicator on unselected, non-disabled cards. Clicking it never selects the radio.",
      control: false,
      table: { type: { summary: "() => void" } },
    },
  },
} satisfies Meta<typeof ChoiceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── White variant ───────────────────────────────────────────────────────────

/**
 * Three states of the **white** variant side by side:
 * Default (unselected), Active (selected), and Disabled.
 */
export const WhiteVariant: Story = {
  render: () => {
    const [value, setValue] = useState<string>("bank");
    return (
      <div className="flex flex-col gap-3 w-[300px]">
        <ChoiceCardGroup value={value} onValueChange={setValue}>
          <ChoiceCard
            value="cash"
            icon={
              <img
                src="/illustrations/cash.svg"
                width={35}
                height={37}
                alt=""
              />
            }
            title="Cash"
            description="Receive money in cash"
          />
          <ChoiceCard
            value="bank"
            icon={
              <img
                src="/illustrations/bank.svg"
                width={35}
                height={37}
                alt=""
              />
            }
            title="Bank account"
            description="Direct deposit to your bank"
          />
          <ChoiceCard
            value="store"
            icon={
              <img
                src="/illustrations/card.svg"
                width={35}
                height={37}
                alt=""
              />
            }
            title="Cash in store"
            description="Pick up at a convenience store"
            disabled
          />
        </ChoiceCardGroup>
        <p className="text-xs text-secondary">
          Selected: <strong>{value || "none"}</strong>
        </p>
      </div>
    );
  },
};

// ─── Primary variant ─────────────────────────────────────────────────────────

/**
 * Three states of the **primary** variant:
 * Default (turquoise), Active (darker turquoise + check badge), Disabled (faded).
 */
export const PrimaryVariant: Story = {
  render: () => {
    const [value, setValue] = useState<string>("bank");
    return (
      <div className="flex flex-col gap-3 w-[300px]">
        <ChoiceCardGroup value={value} onValueChange={setValue}>
          <ChoiceCard
            value="cash"
            variant="primary"
            icon={
              <img
                src="/illustrations/cash.svg"
                width={35}
                height={37}
                alt=""
              />
            }
            title="Cash"
            description="Receive money in cash"
          />
          <ChoiceCard
            value="bank"
            variant="primary"
            icon={
              <img
                src="/illustrations/bank.svg"
                width={35}
                height={37}
                alt=""
              />
            }
            title="Bank account"
            description="Direct deposit to your bank"
          />
          <ChoiceCard
            value="store"
            variant="primary"
            icon={
              <img
                src="/illustrations/card.svg"
                width={35}
                height={37}
                alt=""
              />
            }
            title="Cash in store"
            description="Pick up at a convenience store"
            disabled
          />
        </ChoiceCardGroup>
        <p className="text-xs text-secondary">
          Selected: <strong>{value || "none"}</strong>
        </p>
      </div>
    );
  },
};

// ─── Controlled ──────────────────────────────────────────────────────────────

/**
 * Fully controlled group — start with no selection, pick one to see state changes.
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>(undefined);
    const options = [
      {
        value: "standard",
        label: "Standard",
        description: "3–5 business days",
        icon: <StarIcon size={32} />,
      },
      {
        value: "express",
        label: "Express",
        description: "Next business day",
        icon: <LightningIcon size={32} />,
      },
      {
        value: "insured",
        label: "Insured",
        description: "Tracked & insured",
        icon: <ShieldCheckIcon size={32} />,
      },
    ];
    return (
      <div className="flex flex-col gap-4 w-[300px]">
        <ChoiceCardGroup value={value} onValueChange={setValue}>
          {options.map((o) => (
            <ChoiceCard
              key={o.value}
              value={o.value}
              icon={o.icon}
              title={o.label}
              description={o.description}
            />
          ))}
        </ChoiceCardGroup>
        <p className="text-xs text-secondary">
          {value ? `Selected: ${value}` : "Click a card to select it"}
        </p>
      </div>
    );
  },
};

// ─── No Icon ─────────────────────────────────────────────────────────────────

/**
 * Cards work without an icon — content fills the available space.
 */
export const NoIcon: Story = {
  render: () => {
    const [value, setValue] = useState<string>("bank");
    return (
      <ChoiceCardGroup
        value={value}
        onValueChange={setValue}
        className="w-[300px]"
      >
        <ChoiceCard
          value="cash"
          title="Cash"
          description="Receive money in cash"
        />
        <ChoiceCard
          value="bank"
          title="Bank account"
          description="Direct deposit to your bank"
        />
        <ChoiceCard value="store" title="Cash in store" disabled />
      </ChoiceCardGroup>
    );
  },
};

// ─── Group disabled ───────────────────────────────────────────────────────────

/**
 * Pass `disabled` on `ChoiceCardGroup` to disable all cards at once.
 */
export const GroupDisabled: Story = {
  render: () => (
    <ChoiceCardGroup defaultValue="cash" disabled className="w-[300px]">
      <ChoiceCard
        value="cash"
        icon={
          <img src="/illustrations/cash.svg" width={35} height={37} alt="" />
        }
        title="Cash"
        description="Receive money in cash"
      />
      <ChoiceCard
        value="bank"
        icon={
          <img src="/illustrations/bank.svg" width={35} height={37} alt="" />
        }
        title="Bank account"
        description="Direct deposit to your bank"
      />
    </ChoiceCardGroup>
  ),
};

// ─── Dark Mode ────────────────────────────────────────────────────────────────

/**
 * Both variants on the dark background.
 */
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: () => {
    const [white, setWhite] = useState("bank");
    const [primary, setPrimary] = useState("bank");
    return (
      <div className="dark flex flex-col gap-8 p-6 bg-background rounded-xl">
        <div>
          <p className="text-xs text-secondary mb-3 font-semibold">White</p>
          <ChoiceCardGroup
            value={white}
            onValueChange={setWhite}
            className="w-[300px]"
          >
            <ChoiceCard
              value="cash"
              icon={
                <img
                  src="/illustrations/cash.svg"
                  width={35}
                  height={37}
                  alt=""
                />
              }
              title="Cash"
              description="Receive money in cash"
            />
            <ChoiceCard
              value="bank"
              icon={
                <img
                  src="/illustrations/bank.svg"
                  width={35}
                  height={37}
                  alt=""
                />
              }
              title="Bank account"
              description="Direct deposit to your bank"
            />
            <ChoiceCard
              value="store"
              icon={
                <img
                  src="/illustrations/card.svg"
                  width={35}
                  height={37}
                  alt=""
                />
              }
              title="Cash in store"
              description="Pick up at a convenience store"
              disabled
            />
          </ChoiceCardGroup>
        </div>
        <div>
          <p className="text-xs text-secondary mb-3 font-semibold">Primary</p>
          <ChoiceCardGroup
            value={primary}
            onValueChange={setPrimary}
            className="w-[300px]"
          >
            <ChoiceCard
              value="cash"
              variant="primary"
              icon={
                <img
                  src="/illustrations/cash.svg"
                  width={35}
                  height={37}
                  alt=""
                />
              }
              title="Cash"
              description="Receive money in cash"
            />
            <ChoiceCard
              value="bank"
              variant="primary"
              icon={
                <img
                  src="/illustrations/bank.svg"
                  width={35}
                  height={37}
                  alt=""
                />
              }
              title="Bank account"
              description="Direct deposit to your bank"
            />
            <ChoiceCard
              value="store"
              variant="primary"
              icon={
                <img
                  src="/illustrations/card.svg"
                  width={35}
                  height={37}
                  alt=""
                />
              }
              title="Cash in store"
              description="Pick up at a convenience store"
              disabled
            />
          </ChoiceCardGroup>
        </div>
      </div>
    );
  },
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

/**
 * SM (default) and MD sizes side-by-side, across both variants. MD increases
 * padding (24px), radius (16px), icon slot (48px), and scales the primary
 * selected indicator pill.
 */
export const Sizes: Story = {
  render: () => {
    const [smValue, setSmValue] = useState<string>("bank");
    const [mdValue, setMdValue] = useState<string>("bank");
    return (
      <div className="flex flex-col gap-10">
        <div>
          <p className="text-[11px] font-semibold text-secondary uppercase tracking-wide mb-3">
            size = "sm" (default)
          </p>
          <div className="flex gap-6">
            <ChoiceCardGroup
              value={smValue}
              onValueChange={setSmValue}
              className="w-[300px]"
            >
              <ChoiceCard
                value="cash"
                title="Cash"
                description="Receive money in cash"
                icon={<StarIcon size={32} />}
              />
              <ChoiceCard
                value="bank"
                title="Bank account"
                description="Direct deposit to your bank"
                icon={<ShieldCheckIcon size={32} />}
              />
            </ChoiceCardGroup>
            <ChoiceCardGroup
              value={smValue}
              onValueChange={setSmValue}
              className="w-[300px]"
            >
              <ChoiceCard
                value="cash"
                variant="primary"
                title="Cash"
                description="Receive money in cash"
                icon={<StarIcon size={32} />}
              />
              <ChoiceCard
                value="bank"
                variant="primary"
                title="Bank account"
                description="Direct deposit to your bank"
                icon={<ShieldCheckIcon size={32} />}
              />
            </ChoiceCardGroup>
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold text-secondary uppercase tracking-wide mb-3">
            size = "md"
          </p>
          <div className="flex gap-6">
            <ChoiceCardGroup
              value={mdValue}
              onValueChange={setMdValue}
              className="w-[420px]"
            >
              <ChoiceCard
                value="cash"
                size="md"
                title="Cash"
                description="Receive money in cash"
                icon={<StarIcon size={48} />}
              />
              <ChoiceCard
                value="bank"
                size="md"
                title="Bank account"
                description="Direct deposit to your bank"
                icon={<ShieldCheckIcon size={48} />}
              />
            </ChoiceCardGroup>
            <ChoiceCardGroup
              value={mdValue}
              onValueChange={setMdValue}
              className="w-[420px]"
            >
              <ChoiceCard
                value="cash"
                size="md"
                variant="primary"
                title="Cash"
                description="Receive money in cash"
                icon={<StarIcon size={48} />}
              />
              <ChoiceCard
                value="bank"
                size="md"
                variant="primary"
                title="Bank account"
                description="Direct deposit to your bank"
                icon={<ShieldCheckIcon size={48} />}
              />
            </ChoiceCardGroup>
          </div>
        </div>
      </div>
    );
  },
};

// ─── MD Showcase ─────────────────────────────────────────────────────────────

/**
 * MD-size showcase mirroring `FigmaShowcase` but with larger cards —
 * matches the right column of the updated Figma frame.
 */
export const MdShowcase: Story = {
  parameters: { layout: "padded" },
  render: () => {
    const [white, setWhite] = useState<string>("white-active");
    const [primary, setPrimary] = useState<string>("primary-active");
    return (
      <div className="bg-background p-8 rounded-2xl shadow-lg w-fit">
        <h2 className="font-semibold text-[18px] text-foreground mb-1">
          Card + Radiobutton — MD
        </h2>
        <p className="text-[12px] text-secondary mb-6">White · Primary</p>

        <div className="grid grid-cols-[80px_420px_420px] gap-x-6 gap-y-6 items-start">
          <div />
          <p className="text-[11px] font-semibold text-secondary uppercase tracking-wide">
            White
          </p>
          <p className="text-[11px] font-semibold text-secondary uppercase tracking-wide">
            Primary
          </p>

          <p className="text-[12px] text-foreground pt-2">Default</p>
          <ChoiceCardGroup value={white} onValueChange={setWhite}>
            <ChoiceCard
              value="white-default"
              size="md"
              icon={
                <img
                  src="/illustrations/cash.svg"
                  width={48}
                  height={50}
                  alt=""
                />
              }
              title="Cash"
              description="Receive money in cash"
              badgeIcon={<ThumbsUpIcon size={18} weight="fill" />}
            />
          </ChoiceCardGroup>
          <ChoiceCardGroup value={primary} onValueChange={setPrimary}>
            <ChoiceCard
              value="primary-default"
              size="md"
              variant="primary"
              icon={
                <img
                  src="/illustrations/cash.svg"
                  width={48}
                  height={50}
                  alt=""
                />
              }
              title="Cash"
              description="Receive money in cash"
              badgeIcon={<ThumbsUpIcon weight="fill" />}
            />
          </ChoiceCardGroup>

          <p className="text-[12px] text-foreground pt-2">Active</p>
          <ChoiceCardGroup value={white} onValueChange={setWhite}>
            <ChoiceCard
              value="white-active"
              size="md"
              icon={
                <img
                  src="/illustrations/bank.svg"
                  width={48}
                  height={50}
                  alt=""
                />
              }
              title="Bank account"
              description="Direct deposit to your bank"
              badgeIcon={<ThumbsUpIcon weight="fill" />}
            />
          </ChoiceCardGroup>
          <ChoiceCardGroup value={primary} onValueChange={setPrimary}>
            <ChoiceCard
              value="primary-active"
              size="md"
              variant="primary"
              icon={
                <img
                  src="/illustrations/bank.svg"
                  width={48}
                  height={50}
                  alt=""
                />
              }
              title="Bank account"
              description="Direct deposit to your bank"
              badgeIcon={<ThumbsUpIcon weight="fill" />}
            />
          </ChoiceCardGroup>

          {/*
            Disabled row mirrors the Figma's last MD row, which shows a
            text-only "Label" pill (link variant) instead of the thumbs-up
            icon — useful when disabling an option needs to surface a
            human-readable reason rather than just a status mark.
          */}
          <p className="text-[12px] text-foreground pt-2">Disabled</p>
          <ChoiceCardGroup value="white-disabled">
            <ChoiceCard
              value="white-disabled"
              size="md"
              icon={
                <img
                  src="/illustrations/card.svg"
                  width={48}
                  height={50}
                  alt=""
                />
              }
              title="Cash in store"
              description="Pick up at a convenience store"
              disabled
              badge="Label"
              badgeVariant="link"
            />
          </ChoiceCardGroup>
          <ChoiceCardGroup value="primary-disabled">
            <ChoiceCard
              value="primary-disabled"
              size="md"
              variant="primary"
              icon={
                <img
                  src="/illustrations/card.svg"
                  width={48}
                  height={50}
                  alt=""
                />
              }
              title="Cash in store"
              description="Pick up at a convenience store"
              disabled
              badge="Label"
              badgeVariant="link"
            />
          </ChoiceCardGroup>
        </div>
      </div>
    );
  },
};

// ─── Figma Showcase ───────────────────────────────────────────────────────────

/**
 * Recreation of the Figma showcase frame — White and Primary variants,
 * each showing Default · Active · Disabled states.
 */
export const FigmaShowcase: Story = {
  parameters: { layout: "padded" },
  render: () => {
    const [white, setWhite] = useState<string>("white-active");
    const [primary, setPrimary] = useState<string>("primary-active");
    return (
      <div className="bg-background p-8 rounded-2xl shadow-lg w-fit">
        <h2 className="font-semibold text-[18px] text-foreground mb-1">
          Card + Radiobutton
        </h2>
        <p className="text-[12px] text-secondary mb-6">White · Primary</p>

        <div className="grid grid-cols-[80px_300px_300px] gap-x-6 gap-y-6 items-start">
          {/* Headers */}
          <div />
          <p className="text-[11px] font-semibold text-secondary uppercase tracking-wide">
            White
          </p>
          <p className="text-[11px] font-semibold text-secondary uppercase tracking-wide">
            Primary
          </p>

          {/* Default */}
          <p className="text-[12px] text-foreground pt-2">Default</p>
          <ChoiceCardGroup value={white} onValueChange={setWhite}>
            <ChoiceCard
              value="white-default"
              icon={
                <img
                  src="/illustrations/cash.svg"
                  width={35}
                  height={37}
                  alt=""
                />
              }
              title="Cash"
              description="Receive money in cash"
              badgeIcon={<ThumbsUpIcon weight="fill" />}
            />
          </ChoiceCardGroup>
          <ChoiceCardGroup value={primary} onValueChange={setPrimary}>
            <ChoiceCard
              value="primary-default"
              variant="primary"
              icon={
                <img
                  src="/illustrations/cash.svg"
                  width={35}
                  height={37}
                  alt=""
                />
              }
              title="Cash"
              description="Receive money in cash"
              badgeIcon={<ThumbsUpIcon weight="fill" />}
            />
          </ChoiceCardGroup>

          {/* Active */}
          <p className="text-[12px] text-foreground pt-2">Active</p>
          <ChoiceCardGroup value={white} onValueChange={setWhite}>
            <ChoiceCard
              value="white-active"
              icon={
                <img
                  src="/illustrations/bank.svg"
                  width={35}
                  height={37}
                  alt=""
                />
              }
              title="Bank account"
              description="Direct deposit to your bank"
              badgeIcon={<ThumbsUpIcon weight="fill" />}
            />
          </ChoiceCardGroup>
          <ChoiceCardGroup value={primary} onValueChange={setPrimary}>
            <ChoiceCard
              value="primary-active"
              variant="primary"
              icon={
                <img
                  src="/illustrations/bank.svg"
                  width={35}
                  height={37}
                  alt=""
                />
              }
              title="Bank account"
              description="Direct deposit to your bank"
              badgeIcon={<ThumbsUpIcon weight="fill" />}
            />
          </ChoiceCardGroup>

          {/* Disabled */}
          <p className="text-[12px] text-foreground pt-2">Disabled</p>
          <ChoiceCardGroup value="white-disabled">
            <ChoiceCard
              value="white-disabled"
              icon={
                <img
                  src="/illustrations/card.svg"
                  width={35}
                  height={37}
                  alt=""
                />
              }
              title="Cash in store"
              description="Pick up at a convenience store"
              disabled
              badgeIcon={<ThumbsUpIcon weight="fill" />}
            />
          </ChoiceCardGroup>
          <ChoiceCardGroup value="primary-disabled">
            <ChoiceCard
              value="primary-disabled"
              variant="primary"
              icon={
                <img
                  src="/illustrations/card.svg"
                  width={35}
                  height={37}
                  alt=""
                />
              }
              title="Cash in store"
              description="Pick up at a convenience store"
              disabled
              badgeIcon={<ThumbsUpIcon weight="fill" />}
            />
          </ChoiceCardGroup>
        </div>
      </div>
    );
  },
};

// ─── With Badge ───────────────────────────────────────────────────────────────

/**
 * Demonstrates the optional `badge` slot that sits to the right of the title.
 *
 * The badge color is auto-selected to match the card `variant`:
 * - `variant="white"` → `secondary` (lime pill, dark text)
 * - `variant="primary"` → `link` (beige pill, turquoise text)
 *
 * Pass `badgeVariant` to override the default pick.
 */
export const WithBadge: Story = {
  render: () => {
    const [sm, setSm] = useState<string>("sm-white");
    const [md, setMd] = useState<string>("md-primary");
    return (
      <div className="flex flex-col gap-8">
        {/* SM row */}
        <section className="flex flex-col gap-3">
          <h3 className="text-[11px] font-semibold text-secondary uppercase tracking-wide">
            Small
          </h3>
          <div className="flex flex-wrap gap-3">
            <div className="w-[300px]">
              <ChoiceCardGroup value={sm} onValueChange={setSm}>
                <ChoiceCard
                  value="sm-white"
                  title="Payment option"
                  description="Brief description"
                  badge="Faster"
                />
              </ChoiceCardGroup>
            </div>
            <div className="w-[300px]">
              <ChoiceCardGroup defaultValue="sm-primary">
                <ChoiceCard
                  value="sm-primary"
                  variant="primary"
                  title="Payment option"
                  description="Brief description"
                  badge="Label"
                />
              </ChoiceCardGroup>
            </div>
          </div>
        </section>

        {/* MD row */}
        <section className="flex flex-col gap-3">
          <h3 className="text-[11px] font-semibold text-secondary uppercase tracking-wide">
            Medium
          </h3>
          <div className="flex flex-wrap gap-3">
            <div className="w-[420px]">
              <ChoiceCardGroup value={md} onValueChange={setMd}>
                <ChoiceCard
                  value="md-white"
                  size="md"
                  title="Payment option"
                  description="Brief description"
                  badge="Faster"
                />
              </ChoiceCardGroup>
            </div>
            <div className="w-[420px]">
              <ChoiceCardGroup defaultValue="md-primary">
                <ChoiceCard
                  value="md-primary"
                  size="md"
                  variant="primary"
                  title="Payment option"
                  description="Brief description"
                  badge="Faster"
                />
              </ChoiceCardGroup>
            </div>
          </div>
        </section>

        {/* Badge variant override */}
        <section className="flex flex-col gap-3">
          <h3 className="text-[11px] font-semibold text-secondary uppercase tracking-wide">
            Explicit `badgeVariant` override
          </h3>
          <div className="w-[300px]">
            <ChoiceCardGroup defaultValue="override">
              <ChoiceCard
                value="override"
                title="Payment option"
                description="White card + link badge"
                badge="New"
                badgeVariant="link"
              />
            </ChoiceCardGroup>
          </div>
        </section>
      </div>
    );
  },
};

// ─── With Badge Icon ─────────────────────────────────────────────────────────

/**
 * The badge supports an optional **leading icon** via `badgeIcon` (per the
 * Figma update on node `682-15286`). Combine it with `badge` for an
 * icon + text pill, or omit `badge` entirely for an **icon-only** pill —
 * useful for compact promo/status marks like a thumbs-up.
 *
 * The Badge atom auto-sizes any unsized `<svg>` to ~8 px, so passing a
 * Phosphor icon "just works" without explicit sizing.
 */
export const WithBadgeIcon: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-8">
        {/* Three shapes side by side */}
        <section className="flex flex-col gap-3">
          <h3 className="text-[11px] font-semibold text-secondary uppercase tracking-wide">
            Three badge shapes
          </h3>
          <div className="flex flex-col gap-3 w-[300px]">
            <ChoiceCardGroup defaultValue="text">
              <ChoiceCard
                value="text"
                title="Text only"
                description="`badge` prop alone"
                badge="Faster"
              />
              <ChoiceCard
                value="combo"
                title="Icon + text"
                description="`badge` + `badgeIcon`"
                badge="Recommended"
                badgeIcon={<ThumbsUpIcon weight="fill" />}
              />
              <ChoiceCard
                value="icon-only"
                title="Icon only"
                description="`badgeIcon` alone, no `badge`"
                badgeIcon={<ThumbsUpIcon weight="fill" />}
              />
            </ChoiceCardGroup>
          </div>
        </section>

        {/* Across both card variants */}
        <section className="flex flex-col gap-3">
          <h3 className="text-[11px] font-semibold text-secondary uppercase tracking-wide">
            On both card variants
          </h3>
          <div className="flex flex-wrap gap-3">
            <div className="w-[300px]">
              <ChoiceCardGroup defaultValue="white-icon">
                <ChoiceCard
                  value="white-icon"
                  title="Payment option"
                  description="White card + thumbs-up"
                  badgeIcon={<ThumbsUpIcon weight="fill" />}
                />
              </ChoiceCardGroup>
            </div>
            <div className="w-[300px]">
              <ChoiceCardGroup defaultValue="primary-icon">
                <ChoiceCard
                  value="primary-icon"
                  variant="primary"
                  title="Payment option"
                  description="Primary card + thumbs-up"
                  badgeIcon={<ThumbsUpIcon weight="fill" />}
                />
              </ChoiceCardGroup>
            </div>
          </div>
        </section>

        {/* MD size */}
        <section className="flex flex-col gap-3">
          <h3 className="text-[11px] font-semibold text-secondary uppercase tracking-wide">
            Medium size
          </h3>
          <div className="w-[420px]">
            <ChoiceCardGroup defaultValue="md-icon">
              <ChoiceCard
                value="md-icon"
                size="md"
                title="Payment option"
                description="Larger card with an icon-only badge"
                badgeIcon={<ThumbsUpIcon weight="fill" />}
              />
            </ChoiceCardGroup>
          </div>
        </section>
      </div>
    );
  },
};

// ─── With details (Figma node 1033-8355) ─────────────────────────────────────

/**
 * The `details` prop renders a row of small outlined pill chips below the
 * description on the **white** variant — useful for surfacing lightweight
 * feature flags or qualifiers like "Faster", "Free", "New".
 *
 * Hidden by design on `primary` and `compress`.
 *
 * Figma reference: [Choice Card](https://www.figma.com/design/xRPYO5ufQ0exGL2YoskunQ/F%C3%A9lix---DS-2026?node-id=1033-8355).
 */
export const WithDetails: Story = {
  render: () => {
    const [sm, setSm] = useState<string>("sm-active");
    const [md, setMd] = useState<string>("md-active");
    return (
      <div className="flex flex-col gap-8">
        <section className="flex flex-col gap-3">
          <h3 className="text-[11px] font-semibold text-secondary uppercase tracking-wide">
            Small
          </h3>
          <ChoiceCardGroup
            value={sm}
            onValueChange={setSm}
            className="w-[300px]"
          >
            <ChoiceCard
              value="sm-default"
              icon={<StarIcon size={32} />}
              title="Payment option"
              description="Brief description"
              details={["Faster", "Free", "Insured"]}
            />
            <ChoiceCard
              value="sm-active"
              icon={<LightningIcon size={32} />}
              title="Express"
              description="Next business day"
              details={["Faster", "Tracked"]}
            />
            <ChoiceCard
              value="sm-disabled"
              icon={<ShieldCheckIcon size={32} />}
              title="Insured"
              description="Tracked & insured"
              details={["Coming soon"]}
              disabled
            />
          </ChoiceCardGroup>
        </section>

        <section className="flex flex-col gap-3">
          <h3 className="text-[11px] font-semibold text-secondary uppercase tracking-wide">
            Medium
          </h3>
          <ChoiceCardGroup
            value={md}
            onValueChange={setMd}
            className="w-[420px]"
          >
            <ChoiceCard
              value="md-default"
              size="md"
              icon={<StarIcon size={48} />}
              title="Payment option"
              description="Brief description"
              details={["Faster", "Free", "Insured"]}
            />
            <ChoiceCard
              value="md-active"
              size="md"
              icon={<LightningIcon size={48} />}
              title="Express"
              description="Next business day"
              details={["Faster", "Tracked"]}
            />
          </ChoiceCardGroup>
        </section>
      </div>
    );
  },
};

// ─── With delete option (Figma node 1033-8355) ───────────────────────────────

/**
 * Pass `onDelete` to render a destructive (orange) trash button in place
 * of the radio indicator on **unselected, non-disabled, white** cards.
 * Clicking the trash never selects the radio — events are intercepted
 * with `stopPropagation` + `preventDefault`.
 *
 * Useful for "saved item" lists where the user can either pick an option
 * or remove it (e.g. saved payment methods).
 *
 * Figma reference: [Choice Card](https://www.figma.com/design/xRPYO5ufQ0exGL2YoskunQ/F%C3%A9lix---DS-2026?node-id=1033-8355).
 */
export const WithDeleteOption: Story = {
  render: () => {
    const initial = [
      {
        value: "card-visa",
        title: "Visa •••• 4242",
        description: "Expires 12/27",
      },
      {
        value: "card-amex",
        title: "Amex •••• 0007",
        description: "Expires 03/29",
      },
      {
        value: "card-mc",
        title: "Mastercard •••• 5500",
        description: "Expires 08/26",
      },
    ];
    const [cards, setCards] = useState(initial);
    const [value, setValue] = useState<string>("card-visa");

    return (
      <div className="flex flex-col gap-3 w-[320px]">
        <p className="text-[11px] font-semibold text-secondary uppercase tracking-wide">
          Saved cards
        </p>
        {cards.length === 0 ? (
          <p className="text-xs text-secondary">All cards deleted.</p>
        ) : (
          <ChoiceCardGroup value={value} onValueChange={setValue}>
            {cards.map((c) => (
              <ChoiceCard
                key={c.value}
                value={c.value}
                title={c.title}
                description={c.description}
                onDelete={() =>
                  setCards((prev) => prev.filter((x) => x.value !== c.value))
                }
              />
            ))}
          </ChoiceCardGroup>
        )}
      </div>
    );
  },
};

// ─── Compress variant ─────────────────────────────────────────────────────────

function MerchantLogo({ initials, bg }: { initials: string; bg: string }) {
  return (
    <span
      className="size-full rounded-[inherit] flex items-center justify-center text-[11px] font-semibold leading-none text-white"
      style={{ backgroundColor: bg }}
    >
      {initials}
    </span>
  );
}

/**
 * The new **compress** variant — a vertically stacked card for things like
 * "pick a store" / "pick a pickup location" pickers. It surfaces an avatar,
 * a title, an address line, and a footer with distance, open/closed status
 * pill, and an ETA.
 *
 * Three states side-by-side at SM and MD sizes — matches the Figma
 * showcase node `682:15286`.
 */
export const CompressVariant: Story = {
  parameters: { layout: "padded" },
  render: () => {
    const [sm, setSm] = useState<string>("cvs");
    const [md, setMd] = useState("cvs");
    return (
      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-3">
          <h3 className="text-[11px] font-semibold text-secondary uppercase tracking-wide">
            Small
          </h3>
          <ChoiceCardGroup
            value={sm}
            onValueChange={setSm}
            className="w-[270px]"
          >
            <ChoiceCard
              value="seven"
              variant="compress"
              icon={<MerchantLogo initials="7E" bg="#008c44" />}
              title="7-Eleven"
              description="3300 N Lamar Blvd"
              distance="0.5 mi"
              status={{ label: "Abierto", tone: "open" }}
              estimatedTime="~2 min."
            />
            <ChoiceCard
              value="cvs"
              variant="compress"
              icon={<MerchantLogo initials="CV" bg="#cc0000" />}
              title="CVS"
              description="2900 Guadalupe St, Austin"
              distance="0.4 mi"
              status={{ label: "Abierto", tone: "open" }}
              estimatedTime="~2 min."
            />
            <ChoiceCard
              value="seven-closed"
              variant="compress"
              icon={<MerchantLogo initials="7E" bg="#008c44" />}
              title="7-Eleven"
              description="3300 N Lamar Blvd"
              distance="0.5 mi"
              status={{ label: "Cerrado", tone: "closed" }}
              estimatedTime="~2 min."
              disabled
            />
          </ChoiceCardGroup>
        </section>

        <section className="flex flex-col gap-3">
          <h3 className="text-[11px] font-semibold text-secondary uppercase tracking-wide">
            Medium
          </h3>
          <ChoiceCardGroup
            value={md}
            onValueChange={setMd}
            className="w-[270px]"
          >
            <ChoiceCard
              value="seven"
              variant="compress"
              size="md"
              icon={<MerchantLogo initials="7E" bg="#008c44" />}
              title="7-Eleven"
              description="3300 N Lamar Blvd"
              distance="0.5 mi"
              status={{ label: "Abierto", tone: "open" }}
              estimatedTime="~2 min."
            />
            <ChoiceCard
              value="cvs"
              variant="compress"
              size="md"
              icon={<MerchantLogo initials="CV" bg="#cc0000" />}
              title="CVS"
              description="2900 Guadalupe St, Austin"
              distance="0.4 mi"
              status={{ label: "Abierto", tone: "open" }}
              estimatedTime="~2 min."
            />
            <ChoiceCard
              value="seven-closed"
              variant="compress"
              size="md"
              icon={<MerchantLogo initials="7E" bg="#008c44" />}
              title="7-Eleven"
              description="3300 N Lamar Blvd"
              distance="0.5 mi"
              status={{ label: "Cerrado", tone: "closed" }}
              estimatedTime="~2 min."
              disabled
            />
          </ChoiceCardGroup>
        </section>
      </div>
    );
  },
};

/**
 * Picker UX — a realistic example of `variant="compress"` used as a
 * pickup-location selector. The title, address and footer are real fields
 * you'd typically pull from a places API.
 */
export const CompressPickupPicker: Story = {
  render: () => {
    const [value, setValue] = useState<string>("cvs");
    const stores = [
      {
        id: "seven-lamar",
        initials: "7E",
        bg: "#008c44",
        name: "7-Eleven",
        address: "3300 N Lamar Blvd",
        distance: "0.5 mi",
        eta: "~2 min.",
        status: { label: "Abierto", tone: "open" } as const,
      },
      {
        id: "cvs",
        initials: "CV",
        bg: "#cc0000",
        name: "CVS",
        address: "2900 Guadalupe St, Austin",
        distance: "0.4 mi",
        eta: "~2 min.",
        status: { label: "Abierto", tone: "open" } as const,
      },
      {
        id: "walgreens",
        initials: "WG",
        bg: "#e11d48",
        name: "Walgreens",
        address: "501 W 24th St",
        distance: "0.7 mi",
        eta: "~5 min.",
        status: { label: "Cerrado", tone: "closed" } as const,
      },
    ];
    return (
      <div className="flex flex-col gap-3 w-[280px]">
        <p className="text-xs font-semibold text-secondary uppercase tracking-wide">
          Pick up at
        </p>
        <ChoiceCardGroup value={value} onValueChange={setValue}>
          {stores.map((s) => (
            <ChoiceCard
              key={s.id}
              value={s.id}
              variant="compress"
              icon={<MerchantLogo initials={s.initials} bg={s.bg} />}
              title={s.name}
              description={s.address}
              distance={s.distance}
              status={s.status}
              estimatedTime={s.eta}
            />
          ))}
        </ChoiceCardGroup>
        <p className="text-xs text-secondary">
          Selected: <strong>{value || "none"}</strong>
        </p>
      </div>
    );
  },
};

/**
 * Compress cards work without a footer too — useful when distance/status
 * data isn't available. The separator and footer row are omitted entirely.
 */
export const CompressNoFooter: Story = {
  render: () => {
    const [value, setValue] = useState<string>("cvs");
    return (
      <ChoiceCardGroup
        value={value}
        onValueChange={setValue}
        className="w-[270px]"
      >
        <ChoiceCard
          value="seven"
          variant="compress"
          icon={<MerchantLogo initials="7E" bg="#008c44" />}
          title="7-Eleven"
          description="3300 N Lamar Blvd"
        />
        <ChoiceCard
          value="cvs"
          variant="compress"
          icon={<MerchantLogo initials="CV" bg="#cc0000" />}
          title="CVS"
          description="2900 Guadalupe St, Austin"
        />
      </ChoiceCardGroup>
    );
  },
};

// ─── Full Figma Showcase (white + compress, sm + md) ─────────────────────────

/**
 * Faithful recreation of the updated Figma showcase frame
 * ([node 1033-8355](https://www.figma.com/design/xRPYO5ufQ0exGL2YoskunQ/F%C3%A9lix---DS-2026?node-id=1033-8355)).
 *
 * Two columns × six rows:
 *
 * - **SM (left)** and **MD (right)** sizes side by side.
 * - Top three rows — `white` variant (Default · Active · Disabled), with
 *   the disabled MD row demoing the `Label` badge override.
 * - Bottom three rows — `compress` variant (Default · Active · Disabled)
 *   showing the avatar / title / address / separator / footer layout.
 */
export const FullFigmaShowcase: Story = {
  parameters: { layout: "padded" },
  render: () => {
    const [whiteSm, setWhiteSm] = useState<string>("white-sm-active");
    const [whiteMd, setWhiteMd] = useState("white-md-active");
    const [compressSm, setCompressSm] = useState("compress-sm-active");
    const [compressMd, setCompressMd] = useState("compress-md-active");

    const SectionLabel = ({ children }: { children: React.ReactNode }) => (
      <p className="text-[12px] text-foreground pt-2">{children}</p>
    );

    return (
      <div className="bg-background p-8 rounded-2xl shadow-lg w-fit">
        <h2 className="font-semibold text-[18px] text-foreground mb-1">
          Choice Card
        </h2>
        <p className="text-[12px] text-secondary mb-6">Closed · Open</p>

        <div className="grid grid-cols-[80px_300px_420px] gap-x-6 gap-y-6 items-start">
          <div />
          <p className="text-[11px] font-semibold text-secondary uppercase tracking-wide">
            SM
          </p>
          <p className="text-[11px] font-semibold text-secondary uppercase tracking-wide">
            MD
          </p>

          {/* ── White: Default ───────────────────────────────── */}
          <SectionLabel>Default</SectionLabel>
          <ChoiceCardGroup value={whiteSm} onValueChange={setWhiteSm}>
            <ChoiceCard
              value="white-sm-default"
              icon={<EmptyIcon />}
              title="Opción de pago"
              description="Descripción breve de esta opción"
              badgeIcon={<ThumbsUpIcon weight="fill" />}
            />
          </ChoiceCardGroup>
          <ChoiceCardGroup value={whiteMd} onValueChange={setWhiteMd}>
            <ChoiceCard
              value="white-md-default"
              size="md"
              icon={<EmptyIcon />}
              title="Opción de pago"
              description="Descripción breve de esta opción"
              badgeIcon={<ThumbsUpIcon weight="fill" />}
            />
          </ChoiceCardGroup>

          {/* ── White: Active ────────────────────────────────── */}
          <SectionLabel>Active</SectionLabel>
          <ChoiceCardGroup value={whiteSm} onValueChange={setWhiteSm}>
            <ChoiceCard
              value="white-sm-active"
              icon={<EmptyIcon />}
              title="Opción de pago"
              description="Descripción breve de esta opción"
              badgeIcon={<ThumbsUpIcon weight="fill" />}
            />
          </ChoiceCardGroup>
          <ChoiceCardGroup value={whiteMd} onValueChange={setWhiteMd}>
            <ChoiceCard
              value="white-md-active"
              size="md"
              icon={<EmptyIcon />}
              title="Opción de pago"
              description="Descripción breve de esta opción"
              badgeIcon={<ThumbsUpIcon weight="fill" />}
            />
          </ChoiceCardGroup>

          {/* ── White: Disabled ──────────────────────────────── */}
          {/*
            SM disabled keeps the icon-only treatment (matches Figma's left
            column). MD disabled flips to a text-only "Label" link chip — per
            the Figma right column — to surface a human-readable reason
            instead of just a status mark.
          */}
          <SectionLabel>Disabled</SectionLabel>
          <ChoiceCardGroup value="white-sm-disabled">
            <ChoiceCard
              value="white-sm-disabled"
              icon={<EmptyIcon />}
              title="Opción de pago"
              description="Descripción breve de esta opción"
              disabled
              badgeIcon={<ThumbsUpIcon weight="fill" />}
            />
          </ChoiceCardGroup>
          <ChoiceCardGroup value="white-md-disabled">
            <ChoiceCard
              value="white-md-disabled"
              size="md"
              icon={<EmptyIcon />}
              title="Opción de pago"
              description="Descripción breve de esta opción"
              disabled
              badge="Label"
              badgeVariant="link"
            />
          </ChoiceCardGroup>

          {/* ── Compress: Default ────────────────────────────── */}
          <SectionLabel>Default</SectionLabel>
          <ChoiceCardGroup value={compressSm} onValueChange={setCompressSm}>
            <ChoiceCard
              value="compress-sm-default"
              variant="compress"
              icon={<MerchantLogo initials="7E" bg="#008c44" />}
              title="7-Eleven"
              description="3300 N Lamar Blvd"
              distance="0.5 mi"
              status={{ label: "Abierto", tone: "open" }}
              estimatedTime="~2 min."
            />
          </ChoiceCardGroup>
          <ChoiceCardGroup value={compressMd} onValueChange={setCompressMd}>
            <ChoiceCard
              value="compress-md-default"
              variant="compress"
              size="md"
              icon={<MerchantLogo initials="7E" bg="#008c44" />}
              title="7-Eleven"
              description="3300 N Lamar Blvd"
              distance="0.5 mi"
              status={{ label: "Abierto", tone: "open" }}
              estimatedTime="~2 min."
            />
          </ChoiceCardGroup>

          {/* ── Compress: Active ─────────────────────────────── */}
          <SectionLabel>Active</SectionLabel>
          <ChoiceCardGroup value={compressSm} onValueChange={setCompressSm}>
            <ChoiceCard
              value="compress-sm-active"
              variant="compress"
              icon={<MerchantLogo initials="CV" bg="#cc0000" />}
              title="CVS"
              description="2900 Guadalupe St, Austin"
              distance="0.4 mi"
              status={{ label: "Abierto", tone: "open" }}
              estimatedTime="~2 min."
            />
          </ChoiceCardGroup>
          <ChoiceCardGroup value={compressMd} onValueChange={setCompressMd}>
            <ChoiceCard
              value="compress-md-active"
              variant="compress"
              size="md"
              icon={<MerchantLogo initials="CV" bg="#cc0000" />}
              title="CVS"
              description="2900 Guadalupe St, Austin"
              distance="0.4 mi"
              status={{ label: "Abierto", tone: "open" }}
              estimatedTime="~2 min."
            />
          </ChoiceCardGroup>

          {/* ── Compress: Disabled ───────────────────────────── */}
          <SectionLabel>Disabled</SectionLabel>
          <ChoiceCardGroup value="compress-sm-disabled">
            <ChoiceCard
              value="compress-sm-disabled"
              variant="compress"
              icon={<MerchantLogo initials="7E" bg="#008c44" />}
              title="7-Eleven"
              description="3300 N Lamar Blvd"
              distance="0.5 mi"
              status={{ label: "Cerrado", tone: "closed" }}
              estimatedTime="~2 min."
              disabled
            />
          </ChoiceCardGroup>
          <ChoiceCardGroup value="compress-md-disabled">
            <ChoiceCard
              value="compress-md-disabled"
              variant="compress"
              size="md"
              icon={<MerchantLogo initials="7E" bg="#008c44" />}
              title="7-Eleven"
              description="3300 N Lamar Blvd"
              distance="0.5 mi"
              status={{ label: "Cerrado", tone: "closed" }}
              estimatedTime="~2 min."
              disabled
            />
          </ChoiceCardGroup>
        </div>
      </div>
    );
  },
};

/**
 * Tiny "empty / placeholder" icon used in a few of the showcase rows so the
 * layout reads the same as Figma even when no real illustration is wired up.
 */
function EmptyIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      width={32}
      height={32}
      aria-hidden
      className="text-foreground"
    >
      <circle
        cx="16"
        cy="16"
        r="12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line
        x1="7"
        y1="25"
        x2="25"
        y2="7"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
