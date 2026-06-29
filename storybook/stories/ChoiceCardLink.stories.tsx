import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  StarIcon,
  ShieldCheckIcon,
  LightningIcon,
  CreditCardIcon,
  BankIcon,
  StorefrontIcon,
} from "@phosphor-icons/react";
import { ChoiceCardLink } from "@felix/ui";

/**
 * `ChoiceCardLink` shares the visual language of `ChoiceCard`, but renders
 * as a real anchor (`<a>`) — use it for navigation cards where clicking
 * should route the user. Unlike `ChoiceCard`, there is no radio group
 * wrapper; each link is independent.
 *
 * When your app uses a routing library (Next.js, React Router, TanStack
 * Router), pass `asChild` and nest the framework's `<Link>` as the child.
 * Radix `Slot` will merge styles, ARIA attributes, and `data-*` state
 * onto that element.
 *
 * ### When to choose which component
 * - **Form selection** (submit later via a button) → `ChoiceCard` + `ChoiceCardGroup`
 * - **Navigation** (click = route change) → `ChoiceCardLink`
 *
 * Figma reference: [Choice Card](https://www.figma.com/design/xRPYO5ufQ0exGL2YoskunQ/F%C3%A9lix---DS-2026?node-id=1033-8355)
 */
const meta = {
  title: "Components/Molecules/ChoiceCardLink",
  component: ChoiceCardLink,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    title: "Credit card",
    description: "Pay with Visa, Mastercard, or Amex",
    href: "#credit-card",
  },
  argTypes: {
    variant: {
      description: "Visual style of the card.",
      options: ["white", "primary"],
      control: "select",
      table: {
        type: { summary: '"white" | "primary"' },
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
    href: {
      description: "Destination URL.",
      control: "text",
    },
    selected: {
      description:
        "Shows the selected/current indicator. Useful for highlighting the active route.",
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    disabled: {
      description:
        "Disables navigation, removes from tab order, and applies disabled styles.",
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    asChild: {
      description:
        "Merges props onto a child element (e.g. Next.js `<Link>`) via Radix Slot.",
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    badge: {
      description:
        "Optional short label rendered as a pill to the right of the title. Combine with `badgeIcon` for icon + text, or omit for an icon-only pill.",
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
        "Badge pill color. Defaults to `secondary` on white cards and `link` on primary cards.",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
      ],
      control: "select",
    },
    details: {
      description:
        "White variant only — row of small outlined pill chips rendered below the description. Useful for lightweight feature flags / qualifiers like `[\"Faster\", \"Free\"]`.",
      control: "object",
      table: { type: { summary: "string[]" } },
    },
    onDelete: {
      description:
        "White variant only — when provided, renders a destructive (orange) trash button in place of the selected indicator on non-selected, non-disabled cards. Clicking it never triggers navigation.",
      control: false,
      table: { type: { summary: "() => void" } },
    },
  },
} satisfies Meta<typeof ChoiceCardLink>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ─────────────────────────────────────────────────────────────────

/**
 * A basic navigation card rendered as a plain anchor.
 */
export const Default: Story = {
  args: {
    icon: <CreditCardIcon size={32} />,
  },
  render: (args) => (
    <div className="w-[320px]">
      <ChoiceCardLink {...args} />
    </div>
  ),
};

// ─── Navigation list ─────────────────────────────────────────────────────────

/**
 * Typical usage — a list of routes styled as cards. The second card has
 * `selected` set to indicate the current route (this is how you'd render
 * an "active nav item" pattern).
 */
export const NavigationList: Story = {
  render: () => (
    <nav className="flex flex-col gap-3 w-[320px]" aria-label="Payment methods">
      <ChoiceCardLink
        href="#credit-card"
        title="Credit card"
        description="Pay with Visa, Mastercard, or Amex"
        icon={<CreditCardIcon size={32} />}
      />
      <ChoiceCardLink
        href="#bank-transfer"
        title="Bank transfer"
        description="Free, 1–2 business days"
        icon={<BankIcon size={32} />}
        selected
      />
      <ChoiceCardLink
        href="#cash-in-store"
        title="Cash in store"
        description="Pick a nearby location"
        icon={<StorefrontIcon size={32} />}
      />
    </nav>
  ),
};

// ─── Primary variant ─────────────────────────────────────────────────────────

/**
 * The primary variant works identically — showcase a featured nav card
 * or a prominent CTA route.
 */
export const PrimaryVariant: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[320px]">
      <ChoiceCardLink
        href="#express"
        variant="primary"
        title="Express shipping"
        description="Next business day"
        icon={<LightningIcon size={32} />}
      />
      <ChoiceCardLink
        href="#insured"
        variant="primary"
        title="Insured shipping"
        description="Tracked & insured up to $5,000"
        icon={<ShieldCheckIcon size={32} />}
        selected
      />
    </div>
  ),
};

// ─── Medium size ─────────────────────────────────────────────────────────────

/**
 * The `md` size renders a larger card — more breathing room, bigger icon
 * slot, and a scaled-up primary selected pill. Width is still controlled
 * by the parent.
 */
export const MediumSize: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[420px]">
      <ChoiceCardLink
        href="#credit-card"
        size="md"
        title="Credit card"
        description="Pay with Visa, Mastercard, or Amex"
        icon={<CreditCardIcon size={48} />}
      />
      <ChoiceCardLink
        href="#bank-transfer"
        size="md"
        title="Bank transfer"
        description="Free, 1–2 business days"
        icon={<BankIcon size={48} />}
        selected
      />
      <ChoiceCardLink
        href="#express"
        size="md"
        variant="primary"
        title="Express shipping"
        description="Next business day"
        icon={<LightningIcon size={48} />}
        selected
      />
    </div>
  ),
};

// ─── Disabled ────────────────────────────────────────────────────────────────

/**
 * When `disabled` is true, the card is removed from tab order, gets
 * `aria-disabled="true"`, and clicks are suppressed via pointer-events.
 * Tip: omit `href` at the call site for a truly non-navigable card.
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[320px]">
      <ChoiceCardLink
        href="#coming-soon"
        title="Cryptocurrency"
        description="Coming soon"
        icon={<StarIcon size={32} />}
        disabled
      />
      <ChoiceCardLink
        href="#coming-soon"
        variant="primary"
        title="Premium plan"
        description="Sold out — join the waitlist"
        icon={<StarIcon size={32} />}
        disabled
      />
    </div>
  ),
};

// ─── asChild (framework Link) ────────────────────────────────────────────────

/**
 * Use `asChild` with your framework's `<Link>` component (Next.js,
 * React Router, TanStack Router, etc.). Radix `Slot` merges all styles,
 * ARIA attributes, and event handlers onto the slotted element.
 *
 * The example below uses a tiny stand-in `FakeLink` because Storybook
 * has no router, but the shape is identical — swap `FakeLink` for
 * `NextLink`, `Link` from react-router, etc.
 *
 * ```tsx
 * import Link from "next/link";
 *
 * <ChoiceCardLink asChild title="Checkout" icon={<Cart />}>
 *   <Link href="/checkout" prefetch />
 * </ChoiceCardLink>
 * ```
 */
export const AsChild: Story = {
  render: () => {
    const FakeLink = React.forwardRef<
      HTMLAnchorElement,
      React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }
    >(({ to, children, ...rest }, ref) => (
      <a ref={ref} href={to} data-router-link="fake" {...rest}>
        {children}
      </a>
    ));
    FakeLink.displayName = "FakeLink";

    return (
      <div className="flex flex-col gap-3 w-[320px]">
        <ChoiceCardLink
          asChild
          title="Standard shipping"
          description="3–5 business days"
          icon={<StarIcon size={32} />}
        >
          <FakeLink to="/shipping/standard" />
        </ChoiceCardLink>
        <ChoiceCardLink
          asChild
          variant="primary"
          selected
          title="Express shipping"
          description="Next business day"
          icon={<LightningIcon size={32} />}
        >
          <FakeLink to="/shipping/express" />
        </ChoiceCardLink>
      </div>
    );
  },
};

// ─── Selected states side-by-side ────────────────────────────────────────────

/**
 * Visual reference for all four states: white/primary × default/selected.
 */
export const AllStates: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[680px]">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
          White
        </p>
        <ChoiceCardLink
          href="#a"
          title="Default"
          description="Not selected"
          icon={<CreditCardIcon size={32} />}
        />
        <ChoiceCardLink
          href="#b"
          title="Selected"
          description="Active route"
          icon={<CreditCardIcon size={32} />}
          selected
        />
        <ChoiceCardLink
          href="#c"
          title="Disabled"
          description="Not available"
          icon={<CreditCardIcon size={32} />}
          disabled
        />
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
          Primary
        </p>
        <ChoiceCardLink
          href="#d"
          variant="primary"
          title="Default"
          description="Not selected"
          icon={<BankIcon size={32} />}
        />
        <ChoiceCardLink
          href="#e"
          variant="primary"
          title="Selected"
          description="Active route"
          icon={<BankIcon size={32} />}
          selected
        />
        <ChoiceCardLink
          href="#f"
          variant="primary"
          title="Disabled"
          description="Not available"
          icon={<BankIcon size={32} />}
          disabled
        />
      </div>
    </div>
  ),
};

// ─── With Badge ───────────────────────────────────────────────────────────────

/**
 * Shows the optional `badge` slot to the right of the title. The badge
 * color is auto-picked to match the card's `variant` (`secondary` on white,
 * `link` on primary); pass `badgeVariant` to override.
 */
export const WithBadge: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[300px]">
      <ChoiceCardLink
        href="#a"
        title="Credit card"
        description="Pay with Visa, Mastercard, or Amex"
        icon={<CreditCardIcon size={32} />}
        badge="Faster"
      />
      <ChoiceCardLink
        href="#b"
        variant="primary"
        title="Express"
        description="Next business day"
        icon={<LightningIcon size={32} />}
        badge="New"
      />
    </div>
  ),
};

// ─── With details (Figma node 1033-8355) ─────────────────────────────────────

/**
 * The `details` prop renders a row of small outlined pill chips below the
 * description on the **white** variant — useful for surfacing lightweight
 * feature flags or qualifiers like "Faster", "Free", "New". Hidden by
 * design on `primary` and `compress`.
 */
export const WithDetails: Story = {
  render: () => (
    <nav className="flex flex-col gap-3 w-[320px]" aria-label="Shipping options">
      <ChoiceCardLink
        href="#standard"
        title="Standard"
        description="3–5 business days"
        icon={<StarIcon size={32} />}
        details={["Free", "Tracked"]}
      />
      <ChoiceCardLink
        href="#express"
        title="Express"
        description="Next business day"
        icon={<LightningIcon size={32} />}
        details={["Faster", "Tracked", "Insured"]}
        selected
      />
    </nav>
  ),
};

// ─── With delete option (Figma node 1033-8355) ───────────────────────────────

/**
 * Pass `onDelete` to render a destructive (orange) trash button in place
 * of the selected indicator on **non-selected, non-disabled, white**
 * cards. Clicking the trash is intercepted with `stopPropagation` +
 * `preventDefault`, so it never triggers the parent link's navigation.
 *
 * Useful for navigation lists where each item also exposes a delete
 * action — e.g. saved payment methods you can pick or remove.
 */
export const WithDeleteOption: Story = {
  render: () => {
    const initial = [
      {
        href: "#visa",
        title: "Visa •••• 4242",
        description: "Expires 12/27",
      },
      {
        href: "#amex",
        title: "Amex •••• 0007",
        description: "Expires 03/29",
      },
      {
        href: "#mc",
        title: "Mastercard •••• 5500",
        description: "Expires 08/26",
      },
    ];
    const [cards, setCards] = React.useState(initial);

    if (cards.length === 0) {
      return <p className="text-xs text-secondary">All cards deleted.</p>;
    }
    return (
      <nav
        className="flex flex-col gap-3 w-[320px]"
        aria-label="Saved payment methods"
      >
        {cards.map((c) => (
          <ChoiceCardLink
            key={c.href}
            href={c.href}
            title={c.title}
            description={c.description}
            icon={<CreditCardIcon size={32} />}
            onDelete={() =>
              setCards((prev) => prev.filter((x) => x.href !== c.href))
            }
          />
        ))}
      </nav>
    );
  },
};

// ─── Dark mode ───────────────────────────────────────────────────────────────

/**
 * Both variants on the dark background.
 */
export const DarkMode: Story = {
  parameters: { backgrounds: { default: "dark" } },
  render: () => (
    <div className="dark flex flex-col gap-3 p-6 bg-background rounded-xl w-[320px]">
      <ChoiceCardLink
        href="#a"
        title="Credit card"
        description="Pay with Visa, Mastercard, or Amex"
        icon={<CreditCardIcon size={32} />}
      />
      <ChoiceCardLink
        href="#b"
        title="Bank transfer"
        description="Free, 1–2 business days"
        icon={<BankIcon size={32} />}
        selected
      />
      <ChoiceCardLink
        href="#c"
        variant="primary"
        title="Express"
        description="Next business day"
        icon={<LightningIcon size={32} />}
      />
    </div>
  ),
};
