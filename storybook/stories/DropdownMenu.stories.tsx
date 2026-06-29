import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DotsThreeIcon } from "@phosphor-icons/react";
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  IconButton,
} from "@felix/ui";

/**
 * **DropdownMenu** — A floating menu anchored to a trigger, built on
 * `@radix-ui/react-dropdown-menu` and adapted to the Felix Figma spec. Items
 * support a default and `danger` variant, plus checkbox / radio / submenu
 * primitives for richer menus.
 *
 * **Composition**
 * - `DropdownMenu` (root) + `DropdownMenuTrigger` + `DropdownMenuContent`
 * - `DropdownMenuItem` (with `variant="default" | "danger"` and optional `inset`)
 * - `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup` + `DropdownMenuRadioItem`
 * - `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut`
 * - `DropdownMenuSub` + `DropdownMenuSubTrigger` + `DropdownMenuSubContent`
 *
 * Accessibility is inherited from Radix: roving focus, type-ahead, `Escape`
 * to dismiss, outside-click to dismiss, and focus is restored to the trigger
 * on close.
 */
const meta = {
  title: "Components/Molecules/DropdownMenu",
  component: DropdownMenu,
  subcomponents: {
    DropdownMenuTrigger: DropdownMenuTrigger as React.ComponentType<unknown>,
    DropdownMenuContent: DropdownMenuContent as React.ComponentType<unknown>,
    DropdownMenuItem: DropdownMenuItem as React.ComponentType<unknown>,
    DropdownMenuLabel: DropdownMenuLabel as React.ComponentType<unknown>,
    DropdownMenuSeparator:
      DropdownMenuSeparator as React.ComponentType<unknown>,
    DropdownMenuShortcut: DropdownMenuShortcut as React.ComponentType<unknown>,
    DropdownMenuGroup: DropdownMenuGroup as React.ComponentType<unknown>,
    DropdownMenuCheckboxItem:
      DropdownMenuCheckboxItem as React.ComponentType<unknown>,
    DropdownMenuRadioGroup:
      DropdownMenuRadioGroup as React.ComponentType<unknown>,
    DropdownMenuRadioItem:
      DropdownMenuRadioItem as React.ComponentType<unknown>,
    DropdownMenuSub: DropdownMenuSub as React.ComponentType<unknown>,
    DropdownMenuSubTrigger:
      DropdownMenuSubTrigger as React.ComponentType<unknown>,
    DropdownMenuSubContent:
      DropdownMenuSubContent as React.ComponentType<unknown>,
    DropdownMenuPortal: DropdownMenuPortal as React.ComponentType<unknown>,
  },
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Most common shape: a trigger button + a list of items, no extras.
 */
export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="primary">Open menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Notifications</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/**
 * Use `DropdownMenuSeparator` between groups of items to create a visual
 * break. By default the separator is **inset** — it stays inside the
 * dropdown's inner padding (matching Figma node `607:554`). Pass
 * `inset={false}` to make it bleed edge-to-edge through that padding for a
 * stronger section divider.
 */
export const WithSeparators: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="primary">My account</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Team settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="danger">Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/**
 * Side-by-side comparison of the two separator styles. `inset` (default)
 * keeps the line inside the dropdown's `p-1` padding; `inset={false}`
 * extends it through that padding all the way to the rounded border.
 */
export const SeparatorVariants: Story = {
  render: () => (
    <div className="flex gap-6">
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger asChild>
          <Button variant="line">Inset (default)</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Status bar</DropdownMenuItem>
          <DropdownMenuItem>Activity bar</DropdownMenuItem>
          <DropdownMenuItem>Panel</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger asChild>
          <Button variant="line">Full bleed</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator inset={false} />
          <DropdownMenuItem>Status bar</DropdownMenuItem>
          <DropdownMenuItem>Activity bar</DropdownMenuItem>
          <DropdownMenuItem>Panel</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};

/**
 * `variant="danger"` paints the item with destructive text by default and
 * a destructive background when focused — use it for delete/remove actions.
 */
export const WithDanger: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="line">Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="danger">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/**
 * `DropdownMenuCheckboxItem` toggles an independent boolean per item.
 */
export const WithCheckboxes: Story = {
  render: function CheckboxesStory() {
    const [statusBar, setStatusBar] = React.useState(true);
    const [activityBar, setActivityBar] = React.useState(false);
    const [panel, setPanel] = React.useState(false);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="primary">View options</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel inset>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={statusBar}
            onCheckedChange={setStatusBar}
          >
            Status bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={activityBar}
            onCheckedChange={setActivityBar}
            disabled
          >
            Activity bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={panel} onCheckedChange={setPanel}>
            Panel
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * `DropdownMenuRadioGroup` lets the user pick one option from a list.
 */
export const WithRadioGroup: Story = {
  render: function RadioGroupStory() {
    const [position, setPosition] = React.useState("bottom");
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="primary">Panel position</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel inset>Panel position</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={position}
            onValueChange={setPosition}
          >
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * Nested submenu via `DropdownMenuSub`. The trailing chevron renders
 * automatically on the sub-trigger.
 */
export const WithSub: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="primary">More</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>New file</DropdownMenuItem>
        <DropdownMenuItem>New window</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Email link</DropdownMenuItem>
            <DropdownMenuItem>Copy link</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Embed</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem>Print</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/**
 * `DropdownMenuLabel` renders a non-interactive section header. Pair with
 * `inset` to align it with checkbox/radio items.
 */
export const WithLabel: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="primary">My account</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Signed in as Pedro</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/**
 * `DropdownMenuShortcut` is a right-aligned hint inside an item. Purely
 * presentational — keyboard handling is up to the consumer.
 */
export const WithShortcut: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="primary">Edit</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          Cut
          <DropdownMenuShortcut>⌘X</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Copy
          <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Paste
          <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/**
 * Common real-world usage: anchor a menu to an `IconButton`. Always set
 * `aria-label` on the trigger so screen readers have a name.
 */
export const OnIconButton: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="Open menu"
          icon={<DotsThreeIcon />}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="danger">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/**
 * Fully controlled — the parent owns the `open` state and listens to
 * `onOpenChange`. Useful for opening the menu programmatically (e.g. after
 * a network call).
 */
export const Controlled: Story = {
  render: function ControlledStory() {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="flex items-center gap-3">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="primary">Trigger</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setOpen(false)}>
              Close
            </DropdownMenuItem>
            <DropdownMenuItem>Stay open</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="line" onClick={() => setOpen((v) => !v)}>
          Toggle externally
        </Button>
      </div>
    );
  },
};

/**
 * Reproduces the Figma "Dropdown Menu" showcase (node 607:554) — four
 * items, two separators, last item in `danger` variant.
 */
export const FigmaShowcase: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex min-h-[280px] items-start justify-center p-8">
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger asChild>
          <Button variant="line">Settings</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={8}>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="danger">Settings</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};
