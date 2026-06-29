import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { QuestionIcon } from "@phosphor-icons/react";
import {
  Button,
  IconButton,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@felix/ui";

/**
 * **Tooltip** — A floating label that surfaces secondary, non-essential
 * information about an element on hover or focus. Built on
 * `@radix-ui/react-tooltip` and adapted to the Felix Figma spec
 * (dark pill on `--foreground`, 11px caption, optional arrow).
 *
 * **Usage**
 * - Wrap your app (or the section that hosts tooltips) in a single
 *   `TooltipProvider`. Sub-trees may set their own provider for custom
 *   delays.
 * - Compose `Tooltip` + `TooltipTrigger` + `TooltipContent` for each
 *   tooltip instance.
 * - Set `arrow` on `TooltipContent` to point the bubble at the trigger.
 *
 * Accessibility is inherited from Radix: tooltips open on focus as well
 * as hover, can be dismissed with `Escape`, and expose `role="tooltip"`.
 */
const meta = {
  title: "Components/Molecules/Tooltip",
  component: Tooltip,
  subcomponents: {
    TooltipProvider: TooltipProvider as React.ComponentType<unknown>,
    TooltipTrigger: TooltipTrigger as React.ComponentType<unknown>,
    TooltipContent: TooltipContent as React.ComponentType<unknown>,
  },
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default tooltip with no arrow — matches the "None" variant in Figma.
 */
export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="primary">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Tooltip text</TooltipContent>
    </Tooltip>
  ),
};

/**
 * Tooltip with an arrow pointing at the trigger. The arrow direction is
 * derived automatically from `side`.
 */
export const WithArrow: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="primary">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent arrow>Tooltip text</TooltipContent>
    </Tooltip>
  ),
};

/**
 * Same tooltip rendered on each of the four sides. The arrow auto-rotates
 * to point at the trigger.
 */
export const Sides: Story = {
  parameters: { layout: "centered" },
  render: () => (
    <div className="grid grid-cols-2 gap-12">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button variant="line">{side}</Button>
          </TooltipTrigger>
          <TooltipContent side={side} arrow>
            Side: {side}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

/**
 * Common real-world usage: an icon button that needs a label for sighted
 * users. Note the `aria-label` on the trigger so screen readers also have
 * a name.
 */
export const OnIconButton: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="Help"
          icon={<QuestionIcon />}
        />
      </TooltipTrigger>
      <TooltipContent arrow>Need help?</TooltipContent>
    </Tooltip>
  ),
};

/**
 * Override the default `delayDuration` (200 ms) by wrapping the tooltip
 * (or the whole tree) in a custom `TooltipProvider`.
 */
export const Delay: Story = {
  parameters: { layout: "centered" },
  render: () => (
    <TooltipProvider delayDuration={1000}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="primary">Hover, wait 1s</Button>
        </TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/**
 * Externally controlled `open` state — useful when the tooltip's
 * visibility is driven by another piece of UI (e.g. a coach mark).
 */
export const Controlled: Story = {
  render: () => {
    const ControlledTooltip = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <div className="flex flex-col items-center gap-4">
          <Tooltip open={open}>
            <TooltipTrigger asChild>
              <Button variant="line">Trigger (hover disabled)</Button>
            </TooltipTrigger>
            <TooltipContent arrow side="left">
              I'm controlled
            </TooltipContent>
          </Tooltip>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setOpen((v) => !v)}
          >
            Toggle tooltip
          </Button>
          <span className="text-xs text-muted-foreground">
            open: {String(open)}
          </span>
        </div>
      );
    };
    return <ControlledTooltip />;
  },
};

/**
 * Recreates the Figma showcase (node 562:3705): three rows showing the
 * three arrow states — None, Down (arrow pointing down, side=`top`), and
 * Up (arrow pointing up, side=`bottom`).
 */
export const FigmaShowcase: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-col gap-10 p-8">
      <div className="flex items-center gap-8">
        <span className="w-16 text-xs text-muted-foreground">None</span>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <span className="inline-block size-2 rounded-full bg-foreground/20" />
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={12}>
            Tooltip text
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="flex items-center gap-8">
        <span className="w-16 text-xs text-muted-foreground">Down</span>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <span className="inline-block size-2 rounded-full bg-foreground/20" />
          </TooltipTrigger>
          <TooltipContent side="top" arrow>
            Tooltip text
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="flex items-center gap-8">
        <span className="w-16 text-xs text-muted-foreground">Up</span>
        <Tooltip defaultOpen>
          <TooltipTrigger asChild>
            <span className="inline-block size-2 rounded-full bg-foreground/20" />
          </TooltipTrigger>
          <TooltipContent side="bottom" arrow>
            Tooltip text
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  ),
};
