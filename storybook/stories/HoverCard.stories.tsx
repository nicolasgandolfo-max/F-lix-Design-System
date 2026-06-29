import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Avatar,
  HoverCard,
  HoverCardArrow,
  HoverCardBody,
  HoverCardContent,
  HoverCardDescription,
  HoverCardFooter,
  HoverCardHeader,
  HoverCardTitle,
  HoverCardTrigger,
} from "@felix/ui";

/**
 * **HoverCard** — a rich preview card that appears when the user hovers or
 * focuses an inline trigger (e.g. a username, a tag). Built on
 * `@radix-ui/react-hover-card` and adapted to the Felix Figma spec
 * (`bg-popover`, `border-border`, `rounded-xl`, 12px padding).
 *
 * **Usage**
 * - Compose `HoverCard` + `HoverCardTrigger` + `HoverCardContent`.
 * - Optional sub-parts (`HoverCardHeader`, `HoverCardBody`, `HoverCardFooter`,
 *   `HoverCardTitle`, `HoverCardDescription`) provide the layout from the
 *   Figma showcase out of the box.
 * - Pair `HoverCardTrigger` with `asChild` whenever the trigger needs to be
 *   a focusable element (link, button) — required for keyboard a11y.
 * - Use `HoverCardArrow` to point the bubble at the trigger.
 */
const meta = {
  title: "Components/Molecules/HoverCard",
  component: HoverCard,
  subcomponents: {
    HoverCardTrigger: HoverCardTrigger as React.ComponentType<unknown>,
    HoverCardContent: HoverCardContent as React.ComponentType<unknown>,
    HoverCardHeader: HoverCardHeader as React.ComponentType<unknown>,
    HoverCardBody: HoverCardBody as React.ComponentType<unknown>,
    HoverCardFooter: HoverCardFooter as React.ComponentType<unknown>,
    HoverCardTitle: HoverCardTitle as React.ComponentType<unknown>,
    HoverCardDescription: HoverCardDescription as React.ComponentType<unknown>,
    HoverCardArrow: HoverCardArrow as React.ComponentType<unknown>,
  },
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    openDelay: {
      description: "Delay (ms) before the card opens after hover/focus.",
      control: { type: "number" },
      table: { defaultValue: { summary: "200" } },
    },
    closeDelay: {
      description: "Delay (ms) before the card closes after the trigger is left.",
      control: { type: "number" },
      table: { defaultValue: { summary: "150" } },
    },
    defaultOpen: {
      description: "Open the card on mount (uncontrolled).",
      control: { type: "boolean" },
    },
    open: {
      description: "Controlled open state.",
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

function ProfilePreview() {
  return (
    <>
      <HoverCardHeader>
        <Avatar size="sm" initials="F" status="success" />
        <div className="flex flex-col">
          <HoverCardTitle>Felix Pago</HoverCardTitle>
          <p className="text-xs leading-tight tracking-[0.25px] text-secondary">
            @felixpago · Following
          </p>
        </div>
      </HoverCardHeader>
      <HoverCardBody>
        <HoverCardDescription>
          Payments made simple across Latin America.
        </HoverCardDescription>
      </HoverCardBody>
      <HoverCardFooter>
        <span className="inline-flex items-center gap-1">
          <span className="text-xs font-semibold text-foreground tracking-[0.25px]">
            1.2M
          </span>
          <span className="text-xs text-secondary tracking-[0.25px]">
            Transfers
          </span>
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="text-xs font-semibold text-foreground tracking-[0.25px]">
            14
          </span>
          <span className="text-xs text-secondary tracking-[0.25px]">
            Countries
          </span>
        </span>
      </HoverCardFooter>
    </>
  );
}

/**
 * Default closed-state hover card. Hover or tab to the trigger to reveal it.
 */
export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a href="#" className="font-medium text-foreground underline-offset-4 hover:underline">
          @felixpago
        </a>
      </HoverCardTrigger>
      <HoverCardContent>
        <ProfilePreview />
      </HoverCardContent>
    </HoverCard>
  ),
};

/**
 * Open by default — useful for screenshots and visual regressions. This
 * story matches the "Open" row of the Figma showcase.
 */
export const OpenByDefault: Story = {
  render: () => (
    <HoverCard defaultOpen>
      <HoverCardTrigger asChild>
        <a href="#" className="font-medium text-foreground underline-offset-4 hover:underline">
          @felixpago
        </a>
      </HoverCardTrigger>
      <HoverCardContent>
        <ProfilePreview />
      </HoverCardContent>
    </HoverCard>
  ),
};

/**
 * Adds a small arrow pointing at the trigger.
 */
export const WithArrow: Story = {
  render: () => (
    <HoverCard defaultOpen>
      <HoverCardTrigger asChild>
        <a href="#" className="font-medium text-foreground underline-offset-4 hover:underline">
          @felixpago
        </a>
      </HoverCardTrigger>
      <HoverCardContent>
        <ProfilePreview />
        <HoverCardArrow />
      </HoverCardContent>
    </HoverCard>
  ),
};

/**
 * Same hover card rendered on each of the four sides of the trigger.
 */
export const Sides: Story = {
  parameters: { layout: "centered" },
  render: () => (
    <div className="grid grid-cols-2 gap-24 p-24">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <HoverCard key={side} defaultOpen>
          <HoverCardTrigger asChild>
            <a
              href="#"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              side: {side}
            </a>
          </HoverCardTrigger>
          <HoverCardContent side={side}>
            <ProfilePreview />
            <HoverCardArrow />
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  ),
};

/**
 * Externally controlled `open` state — useful when the card's visibility is
 * driven by another piece of UI.
 */
export const Controlled: Story = {
  render: () => {
    const ControlledHoverCard = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <div className="flex flex-col items-start gap-4">
          <HoverCard open={open} onOpenChange={setOpen}>
            <HoverCardTrigger asChild>
              <a
                href="#"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                @felixpago
              </a>
            </HoverCardTrigger>
            <HoverCardContent>
              <ProfilePreview />
            </HoverCardContent>
          </HoverCard>
          <button
            type="button"
            className="text-xs text-secondary underline-offset-4 hover:underline"
            onClick={() => setOpen((v) => !v)}
          >
            Toggle externally — open: {String(open)}
          </button>
        </div>
      );
    };
    return <ControlledHoverCard />;
  },
};

/**
 * Full-fidelity reproduction of the Figma showcase (node `888:1140`):
 * Avatar with online status, name, handle, tagline, and stat row.
 */
export const RichProfile: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-col gap-10 p-8">
      <div className="flex items-center gap-8">
        <span className="w-16 text-xs text-muted-foreground">Closed</span>
        <HoverCard>
          <HoverCardTrigger asChild>
            <a
              href="#"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              @felixpago
            </a>
          </HoverCardTrigger>
          <HoverCardContent>
            <ProfilePreview />
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className="flex items-start gap-8">
        <span className="w-16 text-xs text-muted-foreground">Open</span>
        <HoverCard defaultOpen>
          <HoverCardTrigger asChild>
            <a
              href="#"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              @felixpago
            </a>
          </HoverCardTrigger>
          <HoverCardContent side="bottom" align="start">
            <ProfilePreview />
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  ),
};

/**
 * Dark mode preview — verifies the popover surface, border, and typography
 * tokens flip correctly.
 */
export const DarkMode: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="dark min-h-[420px] bg-background p-12">
      <HoverCard defaultOpen>
        <HoverCardTrigger asChild>
          <a
            href="#"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            @felixpago
          </a>
        </HoverCardTrigger>
        <HoverCardContent>
          <ProfilePreview />
          <HoverCardArrow />
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};
