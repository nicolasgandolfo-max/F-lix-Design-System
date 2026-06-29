import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  Input,
} from "@felix/ui";

/**
 * **Dialog** — A modal compound component built on `@radix-ui/react-dialog`,
 * adapted to the Felix Figma spec. Composed of `Header`, optional `Body`, and
 * `Footer` sections separated by dividers, with a close button anchored in the
 * top-right corner.
 *
 * Accessibility is inherited from Radix: focus trap, focus return on close,
 * `Escape` to dismiss, click on overlay to dismiss, and `aria-labelledby` /
 * `aria-describedby` wired automatically when `DialogTitle` and
 * `DialogDescription` are present.
 */
const meta = {
  title: "Components/Molecules/Dialog",
  component: Dialog,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Matches the Figma showcase: header title + description, empty body, footer
 * with `Cancel` (line) and `Save changes` (primary) left-aligned.
 */
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogDescription>
            Are you sure you want to continue?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="line" size="sm">
              Cancel
            </Button>
          </DialogClose>
          <Button variant="primary" size="sm">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Dialog with a form inside `DialogBody`. Use `DialogBody` whenever the
 * content is more than a short confirmation message.
 */
export const WithBodyContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Edit profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-3">
            <Input
              id="dialog-name"
              label="Name"
              defaultValue="Pedro Duarte"
            />
            <Input
              id="dialog-username"
              label="Username"
              defaultValue="@peduarte"
            />
          </div>
        </DialogBody>
        <DialogFooter align="end">
          <DialogClose asChild>
            <Button variant="line" size="sm">
              Cancel
            </Button>
          </DialogClose>
          <Button variant="primary" size="sm">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Destructive flows use `Button variant="danger"` as the primary action.
 * The `Cancel` action stays as `line` to keep emphasis on the dangerous path
 * while giving users a clear way out.
 */
export const Destructive: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="danger">Delete account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete account</DialogTitle>
          <DialogDescription>
            This action cannot be undone. All your data will be permanently
            removed from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter align="end">
          <DialogClose asChild>
            <Button variant="line" size="sm">
              Cancel
            </Button>
          </DialogClose>
          <Button variant="danger" size="sm">
            Yes, delete account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * When you want to force users to dismiss the dialog through an explicit
 * action (e.g. acknowledging terms), set `hideCloseButton` on `DialogContent`
 * to remove the top-right X.
 */
export const NoCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Accept terms</Button>
      </DialogTrigger>
      <DialogContent hideCloseButton>
        <DialogHeader>
          <DialogTitle>Terms of service</DialogTitle>
          <DialogDescription>
            You must accept the terms of service before continuing.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter align="end">
          <DialogClose asChild>
            <Button variant="primary" size="sm">
              I accept
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * `DialogFooter.align` supports `start` (Figma default), `end` (industry
 * norm for confirm/cancel), and `between` for split layouts (e.g. a tertiary
 * action on the left and the primary pair on the right).
 */
export const FooterAlignment: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(["start", "end", "between"] as const).map((align) => (
        <Dialog key={align}>
          <DialogTrigger asChild>
            <Button variant="line">align=&quot;{align}&quot;</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Footer align = {align}</DialogTitle>
              <DialogDescription>
                Actions arranged with <code>align=&quot;{align}&quot;</code>.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter align={align}>
              {align === "between" && (
                <Button variant="ghost" size="sm">
                  Learn more
                </Button>
              )}
              <div className="flex items-center gap-2">
                <DialogClose asChild>
                  <Button variant="line" size="sm">
                    Cancel
                  </Button>
                </DialogClose>
                <Button variant="primary" size="sm">
                  Save
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  ),
};

/**
 * Controlled mode — pass `open` and `onOpenChange` to drive the dialog from
 * your own state (useful when the open state needs to sync with routing,
 * forms, or asynchronous flows).
 */
export const Controlled: Story = {
  render: function ControlledStory() {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="flex flex-col items-start gap-3">
        <Button onClick={() => setOpen(true)}>Open from outside</Button>
        <span className="text-xs text-secondary">
          open = {String(open)}
        </span>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled dialog</DialogTitle>
              <DialogDescription>
                Open/close state lives in the parent component.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter align="end">
              <DialogClose asChild>
                <Button variant="line" size="sm">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};

/**
 * Dark mode preview — tokens automatically pick up `--popover`, `--card`,
 * `--border`, and `--foreground/60` overlay values from the `.dark` scope.
 */
export const DarkMode: Story = {
  parameters: { backgrounds: { default: "dark" } },
  render: () => (
    <div className="dark bg-background p-12 rounded-lg">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="primary">Open in dark mode</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              Are you sure you want to continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="line" size="sm">
                Cancel
              </Button>
            </DialogClose>
            <Button variant="primary" size="sm">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
};
