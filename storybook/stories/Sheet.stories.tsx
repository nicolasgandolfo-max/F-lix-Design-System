import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Button,
  cn,
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@felix/ui";

/**
 * **Sheet** — A slide-in overlay panel that anchors to any viewport edge
 * (`top`, `right`, `bottom`, `left`). Built on `@radix-ui/react-dialog` and
 * adapted to the Felix Figma spec (`bg-card`, `border-border`,
 * `shadow-xl`, rounded only on the inside-facing edges).
 *
 * Compose: `Sheet` + `SheetTrigger` + `SheetContent` (+ `SheetHeader`,
 * `SheetBody`, `SheetFooter`, `SheetTitle`, `SheetDescription`,
 * `SheetClose`).
 */
const meta = {
  title: "Components/Molecules/Sheet",
  component: Sheet,
  subcomponents: {
    SheetTrigger: SheetTrigger as React.ComponentType<unknown>,
    SheetContent: SheetContent as React.ComponentType<unknown>,
    SheetHeader: SheetHeader as React.ComponentType<unknown>,
    SheetBody: SheetBody as React.ComponentType<unknown>,
    SheetFooter: SheetFooter as React.ComponentType<unknown>,
    SheetTitle: SheetTitle as React.ComponentType<unknown>,
    SheetDescription: SheetDescription as React.ComponentType<unknown>,
    SheetClose: SheetClose as React.ComponentType<unknown>,
  },
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    defaultOpen: {
      description: "Open the sheet on mount (uncontrolled).",
      control: { type: "boolean" },
    },
    open: {
      description: "Controlled open state.",
      control: { type: "boolean" },
    },
    modal: {
      description:
        "If true (default), interaction with outside elements is blocked while open.",
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Token-based Tailwind classes that re-skin the existing `Button` to match
 * the Figma "slate Send" button (node 988:3739): `interactive-slate-active`
 * background + 1.5px matching border + `background` (linen) text color.
 *
 * Lives in the story rather than the Button atom — keeps that surface lean
 * until we decide to promote slate to a first-class variant.
 */
const slateSendClasses = cn(
  "bg-interactive-slate-active text-background",
  "border border-(--border-width-medium) border-interactive-slate-active",
  "hover:bg-interactive-slate-hover hover:border-interactive-slate-hover"
);

function PaymentSheetContent({
  footerAlign,
}: {
  footerAlign?: React.ComponentProps<typeof SheetFooter>["align"];
}) {
  return (
    <>
      <SheetHeader>
        <SheetTitle>Panel Title</SheetTitle>
      </SheetHeader>
      <SheetBody>
        <div className="flex items-center justify-between">
          <span className="text-xs text-secondary tracking-[0.25px]">
            Name
          </span>
          <span className="text-xs font-semibold text-card-foreground tracking-[0.25px]">
            Felix Pago
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-secondary tracking-[0.25px]">
            Amount
          </span>
          <span className="text-xs font-semibold text-card-foreground tracking-[0.25px]">
            $250.00
          </span>
        </div>
        <SheetDescription>General content</SheetDescription>
      </SheetBody>
      <SheetFooter align={footerAlign}>
        <SheetClose asChild>
          <Button variant="secondary" size="sm">
            Cancel
          </Button>
        </SheetClose>
        <Button size="sm" className={slateSendClasses}>
          Send
        </Button>
      </SheetFooter>
    </>
  );
}

/**
 * Default sheet — opens from the right edge.
 */
export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="primary">Open sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <PaymentSheetContent />
      </SheetContent>
    </Sheet>
  ),
};

/**
 * Slides in from the left.
 */
export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="primary">Open from left</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <PaymentSheetContent />
      </SheetContent>
    </Sheet>
  ),
};

/**
 * Slides in from the top edge.
 */
export const Top: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="primary">Open from top</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <PaymentSheetContent />
      </SheetContent>
    </Sheet>
  ),
};

/**
 * Slides in from the bottom edge.
 */
export const Bottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="primary">Open from bottom</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <PaymentSheetContent />
      </SheetContent>
    </Sheet>
  ),
};

/**
 * `hideCloseButton` removes the built-in top-right X button — use when the
 * sheet must be dismissed via explicit footer actions only.
 */
export const NoCloseButton: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="primary">Open (no X)</Button>
      </SheetTrigger>
      <SheetContent hideCloseButton>
        <PaymentSheetContent />
      </SheetContent>
    </Sheet>
  ),
};

/**
 * Stretched footer actions — `align="stretch"` makes every direct child of
 * `SheetFooter` take an equal share of the row, with the standard `gap-2`
 * between them and `px-4 py-3` outer padding. This is the canonical
 * mobile-bottom-sheet pattern where Cancel + Send fill the safe area.
 */
export const FullWidthActions: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="primary">Open (full-width actions)</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <PaymentSheetContent footerAlign="stretch" />
      </SheetContent>
    </Sheet>
  ),
};

/**
 * Externally controlled `open` state — useful when sheet visibility is
 * driven by another piece of UI (e.g. a router, a coach mark, etc.).
 */
export const Controlled: Story = {
  render: () => {
    const ControlledSheet = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <div className="flex flex-col items-start gap-3">
          <Button variant="line" onClick={() => setOpen(true)}>
            External trigger
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent>
              <PaymentSheetContent />
            </SheetContent>
          </Sheet>
          <span className="text-xs text-secondary">
            open: {String(open)}
          </span>
        </div>
      );
    };
    return <ControlledSheet />;
  },
};

/**
 * Full Figma showcase (node `884:1223`): the four side variants in their
 * Vertical (top/bottom) and Horizontal (right/left) groupings, all open by
 * default for visual review.
 */
export const FigmaShowcase: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="grid grid-cols-2 gap-12 p-12 min-h-screen bg-background">
      <div className="flex flex-col gap-4">
        <span className="text-xs text-muted-foreground">Right</span>
        <Sheet defaultOpen modal={false}>
          <SheetTrigger asChild>
            <Button variant="line" size="sm">
              Right
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <PaymentSheetContent />
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-xs text-muted-foreground">Left</span>
        <Sheet defaultOpen modal={false}>
          <SheetTrigger asChild>
            <Button variant="line" size="sm">
              Left
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <PaymentSheetContent />
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-xs text-muted-foreground">Top</span>
        <Sheet defaultOpen modal={false}>
          <SheetTrigger asChild>
            <Button variant="line" size="sm">
              Top
            </Button>
          </SheetTrigger>
          <SheetContent side="top">
            <PaymentSheetContent />
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-xs text-muted-foreground">Bottom</span>
        <Sheet defaultOpen modal={false}>
          <SheetTrigger asChild>
            <Button variant="line" size="sm">
              Bottom
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom">
            <PaymentSheetContent />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  ),
};

/**
 * Dark mode preview.
 */
export const DarkMode: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="dark min-h-screen bg-background p-12">
      <Sheet defaultOpen modal={false}>
        <SheetTrigger asChild>
          <Button variant="primary">Open sheet (dark)</Button>
        </SheetTrigger>
        <SheetContent>
          <PaymentSheetContent />
        </SheetContent>
      </Sheet>
    </div>
  ),
};
