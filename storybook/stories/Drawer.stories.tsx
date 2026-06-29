import type { Meta, StoryObj } from "@storybook/react";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Input,
} from "@felix/ui";

/**
 * Sheet-like surface that slides in from any edge of the viewport. Powered by
 * [`vaul`](https://github.com/emilkowalski/vaul) for a polished drag-to-dismiss
 * gesture on touch devices, and styled end-to-end with Felix design tokens.
 *
 * - Compose with `Drawer`, `DrawerTrigger`, `DrawerContent`, `DrawerHeader`,
 *   `DrawerFooter`, `DrawerTitle`, `DrawerDescription`, and `DrawerClose`.
 * - Use `direction="bottom" | "top" | "left" | "right"` to anchor the drawer
 *   to a specific edge. Bottom is the default mobile pattern and renders a
 *   draggable handle at the top.
 * - Side drawers (`left` / `right`) cap at `sm:max-w-sm` so they work as
 *   navigation panels on larger viewports.
 */
const meta = {
  title: "Components/Molecules/Drawer",
  component: Drawer,
  subcomponents: {
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
    DrawerClose,
  },
  tags: ["autodocs"],
  parameters: { layout: "centered", mobileFrame: false },
  argTypes: {
    direction: {
      description: "Edge the drawer slides in from.",
      control: { type: "radio" },
      options: ["top", "bottom", "left", "right"],
      table: {
        type: { summary: '"top" | "bottom" | "left" | "right"' },
        defaultValue: { summary: '"bottom"' },
      },
    },
    open: {
      description:
        "Controlled open state. Pair with `onOpenChange` to manage state yourself.",
      control: "boolean",
      table: { type: { summary: "boolean" } },
    },
    defaultOpen: {
      description:
        "Uncontrolled initial open state. Ignored when `open` is provided.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onOpenChange: {
      description: "Fired whenever the open state changes.",
      action: "onOpenChange",
      table: { type: { summary: "(open: boolean) => void" } },
    },
    modal: {
      description:
        "Blocks interaction with the rest of the page while open (renders overlay, traps focus). Set `false` for non-blocking side panels.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    dismissible: {
      description:
        "Allows the drawer to be closed via swipe gesture or overlay click. Disable when a user decision is required.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    shouldScaleBackground: {
      description:
        'Scales the body behind the drawer for a nested iOS-like effect. Only effective with `direction="bottom"`.',
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    snapPoints: {
      description:
        'Snap points for multi-stage drawers. Accepts numbers (0–1 viewport fraction) or CSS lengths (e.g. `"148px"`, `"355px"`).',
      control: "object",
      table: { type: { summary: "(number | string)[]" } },
    },
    activeSnapPoint: {
      description:
        "Controlled active snap point — must be one of `snapPoints`.",
      control: false,
      table: { type: { summary: "number | string | null" } },
    },
    setActiveSnapPoint: {
      description: "Called when the active snap point changes.",
      action: "setActiveSnapPoint",
      table: {
        type: {
          summary: "(snapPoint: number | string | null) => void",
        },
      },
    },
    fadeFromIndex: {
      description:
        "Snap-point index at which the overlay fade-in begins. Keeps background visible at lower snap stages.",
      control: "number",
      table: { type: { summary: "number" } },
    },
    children: {
      description:
        "Composition children — `DrawerTrigger`, `DrawerContent`, etc.",
      control: false,
      table: { type: { summary: "ReactNode" } },
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default (bottom sheet) ──────────────────────────────────────────────────

/**
 * The default bottom-sheet variant — the most common mobile pattern. A drag
 * handle is rendered automatically at the top of the content.
 */
export const Default: Story = {
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button variant="line">Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto flex w-full max-w-sm flex-col">
          <DrawerHeader>
            <DrawerTitle>Move goal</DrawerTitle>
            <DrawerDescription>
              Set your daily activity goal for the week.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-4 text-sm leading-snug text-secondary">
            Your progress is tracked automatically. You can change this at any
            time from your profile settings.
          </div>
          <DrawerFooter>
            <Button>Save changes</Button>
            <DrawerClose asChild>
              <Button variant="line">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};

// ─── Directions ──────────────────────────────────────────────────────────────

/**
 * All four anchor edges. Side drawers behave like nav panels; top/bottom
 * drawers behave like sheets.
 */
export const Directions: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(["top", "right", "bottom", "left"] as const).map((direction) => (
        <Drawer key={direction} direction={direction}>
          <DrawerTrigger asChild>
            <Button variant="line" className="capitalize">
              {direction}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="capitalize">
                {direction} drawer
              </DrawerTitle>
              <DrawerDescription>
                Slides in from the {direction} edge.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 text-sm leading-snug text-secondary">
              This drawer is anchored to the <strong>{direction}</strong> edge
              of the viewport.
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="line">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  ),
};

// ─── Form inside the drawer ──────────────────────────────────────────────────

/**
 * Drawers are well-suited for short, focused forms on mobile. Pair with the
 * Felix `Input` and `Label` atoms to keep styling consistent.
 */
export const WithForm: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Edit profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto flex w-full max-w-sm flex-col">
          <DrawerHeader>
            <DrawerTitle>Edit profile</DrawerTitle>
            <DrawerDescription>
              Make changes to your profile here. Click save when you are done.
            </DrawerDescription>
          </DrawerHeader>
          <form className="flex flex-col gap-4 px-4 pb-4">
            <Input
              id="drawer-email"
              label="Email"
              type="email"
              defaultValue="felix@example.com"
            />
            <Input
              id="drawer-username"
              label="Username"
              defaultValue="@felix"
            />
          </form>
          <DrawerFooter>
            <Button type="submit">Save changes</Button>
            <DrawerClose asChild>
              <Button variant="line">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};

// ─── Non-dismissible ─────────────────────────────────────────────────────────

/**
 * When a user decision is required, set `dismissible={false}` to disable
 * swipe-to-close and overlay clicks. The user must use an explicit action.
 */
export const NonDismissible: Story = {
  render: () => (
    <Drawer dismissible={false}>
      <DrawerTrigger asChild>
        <Button variant="line">Confirm transaction</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto flex w-full max-w-sm flex-col">
          <DrawerHeader>
            <DrawerTitle>Confirm transaction</DrawerTitle>
            <DrawerDescription>
              Review the details below. You must approve or decline to continue.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-2 px-4 pb-4 text-sm leading-snug text-foreground">
            <div className="flex justify-between">
              <span className="text-secondary">Amount</span>
              <span className="font-semibold">USD 1,200.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">Recipient</span>
              <span>Jane Doe</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">Reference</span>
              <span>INV-2026-0042</span>
            </div>
          </div>
          <DrawerFooter>
            <Button>Approve</Button>
            <DrawerClose asChild>
              <Button variant="line">Decline</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};

// ─── Scrollable content ──────────────────────────────────────────────────────

/**
 * When content exceeds the drawer height, wrap the scrollable region in a
 * `overflow-y-auto` container. The header and footer remain pinned.
 */
export const Scrollable: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="line">Terms of service</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto flex w-full max-w-md flex-col">
          <DrawerHeader>
            <DrawerTitle>Terms of service</DrawerTitle>
            <DrawerDescription>
              Please review before continuing.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto px-4 pb-4 text-sm leading-normal text-foreground">
            {Array.from({ length: 12 }).map((_, i) => (
              <p key={i} className="mb-3">
                <strong>Section {i + 1}.</strong> Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Integer nec odio. Praesent libero.
                Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh
                elementum imperdiet.
              </p>
            ))}
          </div>
          <DrawerFooter>
            <Button>I agree</Button>
            <DrawerClose asChild>
              <Button variant="line">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};
