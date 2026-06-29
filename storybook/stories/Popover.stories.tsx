import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { QuestionIcon } from "@phosphor-icons/react";
import {
  Button,
  IconButton,
  Input,
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverPortal,
  PopoverTitle,
  PopoverTrigger,
} from "@felix/ui";

/**
 * **Popover** — A non-modal floating panel anchored to a trigger. Built on
 * `@radix-ui/react-popover` and adapted to the Felix Figma spec
 * (`bg-popover`, `border-border`, `rounded-lg`, header / body / footer with
 * a divider). Use it for contextual content that contains interactive
 * elements (forms, menus, confirmations) — for purely descriptive labels,
 * prefer **Tooltip**, and for fully modal flows, prefer **Dialog**.
 *
 * **Composition**
 * - `Popover` (root) + `PopoverTrigger` + `PopoverContent`
 * - Optional `PopoverHeader` + `PopoverTitle` + `PopoverDescription`
 * - Optional `PopoverBody`
 * - Optional `PopoverFooter` (with `align="start" | "end" | "between"`)
 * - Optional `PopoverArrow` (or `arrow` prop on `PopoverContent`)
 * - `PopoverClose` to dismiss from inside the panel
 *
 * Accessibility is inherited from Radix: `Escape` to dismiss, outside-click
 * to dismiss, and focus is restored to the trigger on close.
 */
const meta = {
  title: "Components/Molecules/Popover",
  component: Popover,
  subcomponents: {
    PopoverTrigger: PopoverTrigger as React.ComponentType<unknown>,
    PopoverContent: PopoverContent as React.ComponentType<unknown>,
    PopoverHeader: PopoverHeader as React.ComponentType<unknown>,
    PopoverBody: PopoverBody as React.ComponentType<unknown>,
    PopoverFooter: PopoverFooter as React.ComponentType<unknown>,
    PopoverTitle: PopoverTitle as React.ComponentType<unknown>,
    PopoverDescription: PopoverDescription as React.ComponentType<unknown>,
    PopoverClose: PopoverClose as React.ComponentType<unknown>,
    PopoverArrow: PopoverArrow as React.ComponentType<unknown>,
    PopoverAnchor: PopoverAnchor as React.ComponentType<unknown>,
    PopoverPortal: PopoverPortal as React.ComponentType<unknown>,
  },
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Matches the Figma showcase (node 607:547): title + description + footer
 * with `Cancel` and `Accept`, anchored below an explicit trigger.
 */
export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="primary">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Confirm Action</PopoverTitle>
          <PopoverDescription>
            Are you sure you want to continue?
          </PopoverDescription>
        </PopoverHeader>
        <PopoverFooter>
          <PopoverClose asChild>
            <Button variant="line" size="sm" className="min-w-20">
              Cancel
            </Button>
          </PopoverClose>
          <Button variant="primary" size="sm" className="min-w-20">
            Accept
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * Popover with form fields in `PopoverBody` — matches the "With Forms"
 * variant in the Figma component.
 */
export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="primary">Edit settings</Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[300px]">
        <PopoverHeader>
          <PopoverTitle>Settings</PopoverTitle>
          <PopoverDescription>
            Adjust the values below and save your changes.
          </PopoverDescription>
        </PopoverHeader>
        <PopoverBody>
          <Input id="popover-name" label="Name" defaultValue="Pedro" />
          <Input id="popover-email" label="Email" defaultValue="p@felix.dev" />
        </PopoverBody>
        <PopoverFooter>
          <PopoverClose asChild>
            <Button variant="line" size="sm" className="min-w-20">
              Cancel
            </Button>
          </PopoverClose>
          <Button variant="primary" size="sm" className="min-w-20">
            Save
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * Same popover rendered on each of the four sides. Use `side` (and
 * optionally `align` and `sideOffset`) to control positioning.
 */
export const Sides: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-12">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Popover key={side}>
          <PopoverTrigger asChild>
            <Button variant="line">{side}</Button>
          </PopoverTrigger>
          <PopoverContent side={side}>
            <PopoverHeader>
              <PopoverTitle>side = {side}</PopoverTitle>
              <PopoverDescription>
                Popover anchored on the {side} side.
              </PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};

/**
 * Common real-world usage: anchor a popover to an `IconButton`. Remember to
 * give the trigger an `aria-label` so screen readers have a name.
 */
export const OnIconButton: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="Help"
          icon={<QuestionIcon />}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Need help?</PopoverTitle>
          <PopoverDescription>
            Check our docs or contact support for more information.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * `PopoverFooter.align` supports `start`, `end` (default), and `between`
 * for split layouts.
 */
export const FooterAlignment: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(["start", "end", "between"] as const).map((align) => (
        <Popover key={align}>
          <PopoverTrigger asChild>
            <Button variant="line">align=&quot;{align}&quot;</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Footer align = {align}</PopoverTitle>
              <PopoverDescription>
                Actions arranged with <code>align=&quot;{align}&quot;</code>.
              </PopoverDescription>
            </PopoverHeader>
            <PopoverFooter align={align}>
              {align === "between" && (
                <Button variant="ghost" size="sm">
                  Learn more
                </Button>
              )}
              <div className="flex items-center gap-2">
                <PopoverClose asChild>
                  <Button variant="line" size="sm">
                    Cancel
                  </Button>
                </PopoverClose>
                <Button variant="primary" size="sm">
                  Save
                </Button>
              </div>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};

/**
 * Externally controlled `open` state — pass `open` only (no `onOpenChange`)
 * for fully external control where the trigger's hover/focus does not drive
 * the popover. Drop `Escape` close support comes back the moment you wire
 * `onOpenChange` (e.g. `(next) => { if (!next) setOpen(false); }`).
 */
export const Controlled: Story = {
  render: function ControlledStory() {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="flex flex-col items-center gap-4">
        <Popover open={open}>
          <PopoverTrigger asChild>
            <Button variant="line">Trigger (click disabled)</Button>
          </PopoverTrigger>
          <PopoverContent arrow>
            <PopoverHeader>
              <PopoverTitle>I&apos;m controlled</PopoverTitle>
              <PopoverDescription>
                Open state lives in the parent component.
              </PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setOpen((v) => !v)}
        >
          Toggle popover
        </Button>
        <span className="text-xs text-secondary">open: {String(open)}</span>
      </div>
    );
  },
};

/**
 * Recreates the Figma showcase (node 607:547): the "Default · With Actions"
 * variant with header (title + description) and a footer with Cancel /
 * Accept. Uses `defaultOpen` so the panel is visible at a glance.
 */
export const FigmaShowcase: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-col gap-10 p-8 min-h-[420px]">
      <div className="flex items-start gap-8">
        <span className="w-16 text-xs text-secondary">Default</span>
        <Popover defaultOpen>
          <PopoverAnchor>
            <span className="inline-block size-2 rounded-full bg-foreground/20" />
          </PopoverAnchor>
          <PopoverContent side="bottom" align="start" sideOffset={12}>
            <PopoverHeader>
              <PopoverTitle>Confirm Action</PopoverTitle>
              <PopoverDescription>
                Are you sure you want to continue?
              </PopoverDescription>
            </PopoverHeader>
            <PopoverFooter>
              <PopoverClose asChild>
                <Button variant="line" size="sm" className="min-w-20">
                  Cancel
                </Button>
              </PopoverClose>
              <Button variant="primary" size="sm" className="min-w-20">
                Accept
              </Button>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  ),
};
