"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "@phosphor-icons/react";

import { cn } from "../../lib/utils";

// ─── Root ────────────────────────────────────────────────────────────────────

export type SheetProps = React.ComponentProps<typeof DialogPrimitive.Root>;

function Sheet(props: SheetProps) {
  return <DialogPrimitive.Root data-slot="sheet" {...props} />;
}

Sheet.displayName = "Sheet";

// ─── Trigger ─────────────────────────────────────────────────────────────────

export type SheetTriggerProps = React.ComponentProps<
  typeof DialogPrimitive.Trigger
>;

function SheetTrigger({ className, ...props }: SheetTriggerProps) {
  return (
    <DialogPrimitive.Trigger
      data-slot="sheet-trigger"
      className={cn(className)}
      {...props}
    />
  );
}

SheetTrigger.displayName = "SheetTrigger";

// ─── Portal ──────────────────────────────────────────────────────────────────

export type SheetPortalProps = React.ComponentProps<
  typeof DialogPrimitive.Portal
>;

function SheetPortal(props: SheetPortalProps) {
  return <DialogPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

SheetPortal.displayName = "SheetPortal";

// ─── Close ───────────────────────────────────────────────────────────────────

export type SheetCloseProps = React.ComponentProps<
  typeof DialogPrimitive.Close
>;

function SheetClose({ className, ...props }: SheetCloseProps) {
  return (
    <DialogPrimitive.Close
      data-slot="sheet-close"
      className={cn(className)}
      {...props}
    />
  );
}

SheetClose.displayName = "SheetClose";

// ─── Overlay ─────────────────────────────────────────────────────────────────

export type SheetOverlayProps = React.ComponentProps<
  typeof DialogPrimitive.Overlay
>;

function SheetOverlay({ className, ...props }: SheetOverlayProps) {
  return (
    <DialogPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-foreground/60",
        "data-[state=open]:animate-overlay-in",
        "data-[state=closed]:animate-overlay-out",
        className
      )}
      {...props}
    />
  );
}

SheetOverlay.displayName = "SheetOverlay";

// ─── Content variants (Felix DS — Figma node 884:1223) ───────────────────────

/**
 * Edge-anchored slide-in panel. The `side` variant drives:
 *  - viewport anchor (top / right / bottom / left edge)
 *  - panel size (full-axis along the anchored edge)
 *  - rounded corners on the inside-facing edges only
 *  - slide-in / slide-out animation direction
 */
const sheetContentVariants = cva(
  cn(
    "fixed z-50 flex flex-col bg-card text-card-foreground shadow-xl outline-none",
    "border-border"
  ),
  {
    variants: {
      side: {
        right: cn(
          "inset-y-0 right-0 h-full w-3/4 sm:max-w-sm",
          "border-l border-y rounded-l-xl",
          "data-[state=open]:animate-slide-in-from-right",
          "data-[state=closed]:animate-slide-out-to-right"
        ),
        left: cn(
          "inset-y-0 left-0 h-full w-3/4 sm:max-w-sm",
          "border-r border-y rounded-r-xl",
          "data-[state=open]:animate-slide-in-from-left",
          "data-[state=closed]:animate-slide-out-to-left"
        ),
        top: cn(
          "inset-x-0 top-0 w-full max-h-[80svh]",
          "border-b border-x rounded-b-xl",
          "data-[state=open]:animate-slide-in-from-top",
          "data-[state=closed]:animate-slide-out-to-top"
        ),
        bottom: cn(
          "inset-x-0 bottom-0 w-full max-h-[80svh]",
          "border-t border-x rounded-t-xl",
          "data-[state=open]:animate-slide-in-from-bottom",
          "data-[state=closed]:animate-slide-out-to-bottom"
        ),
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

export type SheetSide = NonNullable<
  VariantProps<typeof sheetContentVariants>["side"]
>;

export interface SheetContentProps
  extends
    React.ComponentProps<typeof DialogPrimitive.Content>,
    VariantProps<typeof sheetContentVariants> {
  /**
   * Hide the built-in top-right close (X) button. Useful for sheets that
   * must be dismissed explicitly through footer actions.
   * @default false
   */
  hideCloseButton?: boolean;
}

function SheetContent({
  className,
  children,
  side = "right",
  hideCloseButton = false,
  ...props
}: SheetContentProps) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        data-slot="sheet-content"
        data-side={side}
        className={cn(sheetContentVariants({ side }), className)}
        {...props}
      >
        {children}
        {!hideCloseButton && (
          <DialogPrimitive.Close
            data-slot="sheet-close-x"
            aria-label="Close"
            className={cn(
              "absolute right-4 top-3 inline-flex items-center justify-center rounded-sm",
              "text-card-foreground opacity-70 transition-opacity",
              "hover:opacity-100",
              "outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "disabled:pointer-events-none"
            )}
          >
            <X size={18} weight="regular" aria-hidden="true" />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </SheetPortal>
  );
}

SheetContent.displayName = "SheetContent";

// ─── Header ──────────────────────────────────────────────────────────────────

export type SheetHeaderProps = React.HTMLAttributes<HTMLDivElement>;

function SheetHeader({
  className,
  ref,
  ...props
}: SheetHeaderProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-slot="sheet-header"
      className={cn(
        "flex items-center justify-between gap-2",
        "px-4 py-3 border-b border-border",
        className
      )}
      {...props}
    />
  );
}

SheetHeader.displayName = "SheetHeader";

// ─── Body ────────────────────────────────────────────────────────────────────

export type SheetBodyProps = React.HTMLAttributes<HTMLDivElement>;

function SheetBody({
  className,
  ref,
  ...props
}: SheetBodyProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-slot="sheet-body"
      className={cn(
        "flex flex-1 flex-col gap-2 px-4 py-3 overflow-y-auto",
        className
      )}
      {...props}
    />
  );
}

SheetBody.displayName = "SheetBody";

// ─── Footer ──────────────────────────────────────────────────────────────────

export interface SheetFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Horizontal alignment of footer actions.
   * - `start` — left-aligned
   * - `center` — centered (Figma default)
   * - `end` — right-aligned
   * - `between` — space between actions
   * - `stretch` — every direct child gets equal share of the row (canonical
   *   "two full-width actions" pattern for mobile bottom sheets); `gap-2`
   *   between children, `px-4 py-3` outer padding still applies.
   * @default "center"
   */
  align?: "start" | "center" | "end" | "between" | "stretch";
}

const FOOTER_ALIGN_CLASSES: Record<
  NonNullable<SheetFooterProps["align"]>,
  string
> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  stretch: "[&>*]:flex-1",
};

function SheetFooter({
  className,
  align = "center",
  ref,
  ...props
}: SheetFooterProps & { ref?: React.Ref<HTMLDivElement> }) {
  const alignClasses = FOOTER_ALIGN_CLASSES[align];
  return (
    <div
      ref={ref}
      data-slot="sheet-footer"
      data-align={align}
      className={cn(
        "flex items-center gap-2 px-4 py-3 border-t border-border",
        alignClasses,
        className
      )}
      {...props}
    />
  );
}

SheetFooter.displayName = "SheetFooter";

// ─── Title ───────────────────────────────────────────────────────────────────

export type SheetTitleProps = React.ComponentProps<
  typeof DialogPrimitive.Title
>;

function SheetTitle({ className, ...props }: SheetTitleProps) {
  return (
    <DialogPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "text-sm font-semibold leading-normal text-card-foreground",
        className
      )}
      {...props}
    />
  );
}

SheetTitle.displayName = "SheetTitle";

// ─── Description ─────────────────────────────────────────────────────────────

export type SheetDescriptionProps = React.ComponentProps<
  typeof DialogPrimitive.Description
>;

function SheetDescription({ className, ...props }: SheetDescriptionProps) {
  return (
    <DialogPrimitive.Description
      data-slot="sheet-description"
      className={cn(
        "text-xs leading-tight tracking-[0.25px] text-secondary",
        className
      )}
      {...props}
    />
  );
}

SheetDescription.displayName = "SheetDescription";

// ─── Exports ─────────────────────────────────────────────────────────────────

export {
  Sheet,
  SheetTrigger,
  SheetPortal,
  SheetClose,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetBody,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  sheetContentVariants,
};
