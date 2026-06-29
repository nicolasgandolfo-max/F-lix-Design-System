"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "@phosphor-icons/react";

import { cn } from "../../lib/utils";

// ─── Root ────────────────────────────────────────────────────────────────────

export type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root>;

function Dialog(props: DialogProps) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

Dialog.displayName = "Dialog";

// ─── Trigger ─────────────────────────────────────────────────────────────────

export type DialogTriggerProps = React.ComponentProps<
  typeof DialogPrimitive.Trigger
>;

function DialogTrigger({ className, ...props }: DialogTriggerProps) {
  return (
    <DialogPrimitive.Trigger
      data-slot="dialog-trigger"
      className={cn(className)}
      {...props}
    />
  );
}

DialogTrigger.displayName = "DialogTrigger";

// ─── Portal ──────────────────────────────────────────────────────────────────

export type DialogPortalProps = React.ComponentProps<
  typeof DialogPrimitive.Portal
>;

function DialogPortal(props: DialogPortalProps) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

DialogPortal.displayName = "DialogPortal";

// ─── Close ───────────────────────────────────────────────────────────────────

export type DialogCloseProps = React.ComponentProps<
  typeof DialogPrimitive.Close
>;

function DialogClose({ className, ...props }: DialogCloseProps) {
  return (
    <DialogPrimitive.Close
      data-slot="dialog-close"
      className={cn(className)}
      {...props}
    />
  );
}

DialogClose.displayName = "DialogClose";

// ─── Overlay ─────────────────────────────────────────────────────────────────

export type DialogOverlayProps = React.ComponentProps<
  typeof DialogPrimitive.Overlay
>;

function DialogOverlay({ className, ...props }: DialogOverlayProps) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-foreground/60",
        "data-[state=open]:animate-dialog-overlay-in data-[state=closed]:animate-dialog-overlay-out",
        className
      )}
      {...props}
    />
  );
}

DialogOverlay.displayName = "DialogOverlay";

// ─── Content ─────────────────────────────────────────────────────────────────

export interface DialogContentProps extends React.ComponentProps<
  typeof DialogPrimitive.Content
> {
  /**
   * Hide the built-in top-right close (X) button.
   * Useful for dialogs that must be dismissed explicitly via footer actions.
   * @default false
   */
  hideCloseButton?: boolean;
}

function DialogContent({
  className,
  children,
  hideCloseButton = false,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2",
          "bg-popover text-popover-foreground border border-border rounded-lg shadow-lg",
          "pt-3 overflow-clip",
          "data-[state=open]:animate-dialog-content-in data-[state=closed]:animate-dialog-content-out",
          className
        )}
        {...props}
      >
        {children}
        {!hideCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            aria-label="Close"
            className={cn(
              "absolute right-3 top-3 inline-flex items-center justify-center rounded-sm",
              "text-popover-foreground opacity-70 transition-opacity",
              "hover:opacity-100",
              "outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "disabled:pointer-events-none"
            )}
          >
            <X size={18} weight="regular" aria-hidden="true" />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

DialogContent.displayName = "DialogContent";

// ─── Header ──────────────────────────────────────────────────────────────────

export type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

function DialogHeader({
  className,
  ref,
  ...props
}: DialogHeaderProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-slot="dialog-header"
      className={cn(
        "flex flex-col gap-1 px-3 pb-2 border-b border-border",
        className
      )}
      {...props}
    />
  );
}

DialogHeader.displayName = "DialogHeader";

// ─── Body ────────────────────────────────────────────────────────────────────

export type DialogBodyProps = React.HTMLAttributes<HTMLDivElement>;

function DialogBody({
  className,
  ref,
  ...props
}: DialogBodyProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-slot="dialog-body"
      className={cn("px-3 py-3", className)}
      {...props}
    />
  );
}

DialogBody.displayName = "DialogBody";

// ─── Footer ──────────────────────────────────────────────────────────────────

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Horizontal alignment of footer actions.
   * - `start` — left-aligned (Figma default)
   * - `end` — right-aligned (industry norm)
   * - `between` — space between actions
   * @default "start"
   */
  align?: "start" | "end" | "between";
}

const FOOTER_ALIGN_CLASSES: Record<
  NonNullable<DialogFooterProps["align"]>,
  string
> = {
  start: "justify-start pl-3",
  end: "justify-end pr-3",
  between: "justify-between px-3",
};

function DialogFooter({
  className,
  align = "end",
  ref,
  ...props
}: DialogFooterProps & { ref?: React.Ref<HTMLDivElement> }) {
  const alignClasses = FOOTER_ALIGN_CLASSES[align];
  return (
    <div
      ref={ref}
      data-slot="dialog-footer"
      data-align={align}
      className={cn(
        "flex items-center gap-2 py-2 bg-background border-t border-border",
        // Collapse the double divider when the footer is rendered right
        // after the header (no body between them).
        "[[data-slot='dialog-header']+&]:border-t-0",
        alignClasses,
        className
      )}
      {...props}
    />
  );
}

DialogFooter.displayName = "DialogFooter";

// ─── Title ───────────────────────────────────────────────────────────────────

export type DialogTitleProps = React.ComponentProps<
  typeof DialogPrimitive.Title
>;

function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "text-sm font-semibold leading-normal text-popover-foreground",
        className
      )}
      {...props}
    />
  );
}

DialogTitle.displayName = "DialogTitle";

// ─── Description ─────────────────────────────────────────────────────────────

export type DialogDescriptionProps = React.ComponentProps<
  typeof DialogPrimitive.Description
>;

function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-xs leading-tight tracking-[0.25px] text-secondary",
        className
      )}
      {...props}
    />
  );
}

DialogDescription.displayName = "DialogDescription";

// ─── Exports ─────────────────────────────────────────────────────────────────

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
