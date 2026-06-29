"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "../../lib/utils";

// ─── Root ────────────────────────────────────────────────────────────────────

export type PopoverProps = React.ComponentProps<typeof PopoverPrimitive.Root>;

function Popover(props: PopoverProps) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

Popover.displayName = "Popover";

// ─── Trigger ─────────────────────────────────────────────────────────────────

export type PopoverTriggerProps = React.ComponentProps<
  typeof PopoverPrimitive.Trigger
>;

function PopoverTrigger({ className, ...props }: PopoverTriggerProps) {
  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      className={cn(className)}
      {...props}
    />
  );
}

PopoverTrigger.displayName = "PopoverTrigger";

// ─── Anchor ──────────────────────────────────────────────────────────────────

export type PopoverAnchorProps = React.ComponentProps<
  typeof PopoverPrimitive.Anchor
>;

function PopoverAnchor({ className, ...props }: PopoverAnchorProps) {
  return (
    <PopoverPrimitive.Anchor
      data-slot="popover-anchor"
      className={cn(className)}
      {...props}
    />
  );
}

PopoverAnchor.displayName = "PopoverAnchor";

// ─── Portal ──────────────────────────────────────────────────────────────────

export type PopoverPortalProps = React.ComponentProps<
  typeof PopoverPrimitive.Portal
>;

function PopoverPortal(props: PopoverPortalProps) {
  return <PopoverPrimitive.Portal data-slot="popover-portal" {...props} />;
}

PopoverPortal.displayName = "PopoverPortal";

// ─── Close ───────────────────────────────────────────────────────────────────

export type PopoverCloseProps = React.ComponentProps<
  typeof PopoverPrimitive.Close
>;

function PopoverClose({ className, ...props }: PopoverCloseProps) {
  return (
    <PopoverPrimitive.Close
      data-slot="popover-close"
      className={cn(className)}
      {...props}
    />
  );
}

PopoverClose.displayName = "PopoverClose";

// ─── Arrow ───────────────────────────────────────────────────────────────────

export type PopoverArrowProps = React.ComponentProps<
  typeof PopoverPrimitive.Arrow
>;

function PopoverArrow({
  className,
  width = 12,
  height = 6,
  ...props
}: PopoverArrowProps) {
  return (
    <PopoverPrimitive.Arrow
      data-slot="popover-arrow"
      width={width}
      height={height}
      className={cn("fill-popover", className)}
      {...props}
    />
  );
}

PopoverArrow.displayName = "PopoverArrow";

// ─── Content ─────────────────────────────────────────────────────────────────

export type PopoverContentProps = React.ComponentProps<
  typeof PopoverPrimitive.Content
>;

function PopoverContent({
  className,
  children,
  side = "bottom",
  align = "center",
  sideOffset = 6,
  ...props
}: PopoverContentProps) {
  return (
    <PopoverPortal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 flex flex-col gap-[10px] min-w-[250px]",
          "bg-popover text-popover-foreground",
          "border border-border rounded-lg shadow-lg",
          "pt-3 overflow-clip",
          "outline-none",
          "data-[state=open]:animate-popover-content-in",
          "data-[state=closed]:animate-popover-content-out",
          className
        )}
        {...props}
      >
        {children}
      </PopoverPrimitive.Content>
    </PopoverPortal>
  );
}

PopoverContent.displayName = "PopoverContent";

// ─── Header ──────────────────────────────────────────────────────────────────

export type PopoverHeaderProps = React.HTMLAttributes<HTMLDivElement>;

function PopoverHeader({
  className,
  ref,
  ...props
}: PopoverHeaderProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-slot="popover-header"
      className={cn("flex flex-col gap-1 px-3 last:pb-3", className)}
      {...props}
    />
  );
}

PopoverHeader.displayName = "PopoverHeader";

// ─── Body ────────────────────────────────────────────────────────────────────

export type PopoverBodyProps = React.HTMLAttributes<HTMLDivElement>;

function PopoverBody({
  className,
  ref,
  ...props
}: PopoverBodyProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-slot="popover-body"
      className={cn("flex flex-col gap-2 px-3 pt-1 last:pb-3", className)}
      {...props}
    />
  );
}

PopoverBody.displayName = "PopoverBody";

// ─── Footer ──────────────────────────────────────────────────────────────────

export interface PopoverFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Horizontal alignment of footer actions.
   * - `start` — left-aligned (Figma default)
   * - `end` — right-aligned (industry norm)
   * - `between` — space between actions
   * @default "end"
   */
  align?: "start" | "end" | "between";
}

const FOOTER_ALIGN_CLASSES: Record<
  NonNullable<PopoverFooterProps["align"]>,
  string
> = {
  start: "justify-start",
  end: "justify-end",
  between: "justify-between",
};

function PopoverFooter({
  className,
  align = "end",
  ref,
  ...props
}: PopoverFooterProps & { ref?: React.Ref<HTMLDivElement> }) {
  const alignClasses = FOOTER_ALIGN_CLASSES[align];
  return (
    <div
      ref={ref}
      data-slot="popover-footer"
      data-align={align}
      className={cn(
        "flex items-center gap-2 px-3 py-2 bg-background border-t border-border",
        alignClasses,
        className
      )}
      {...props}
    />
  );
}

PopoverFooter.displayName = "PopoverFooter";

// ─── Title ───────────────────────────────────────────────────────────────────

export type PopoverTitleProps = React.HTMLAttributes<HTMLParagraphElement>;

function PopoverTitle({
  className,
  ref,
  ...props
}: PopoverTitleProps & { ref?: React.Ref<HTMLParagraphElement> }) {
  return (
    <p
      ref={ref}
      data-slot="popover-title"
      className={cn(
        "text-sm font-semibold leading-normal text-popover-foreground",
        className
      )}
      {...props}
    />
  );
}

PopoverTitle.displayName = "PopoverTitle";

// ─── Description ─────────────────────────────────────────────────────────────

export type PopoverDescriptionProps =
  React.HTMLAttributes<HTMLParagraphElement>;

function PopoverDescription({
  className,
  ref,
  ...props
}: PopoverDescriptionProps & { ref?: React.Ref<HTMLParagraphElement> }) {
  return (
    <p
      ref={ref}
      data-slot="popover-description"
      className={cn(
        "text-xs leading-tight tracking-[0.25px] text-secondary",
        className
      )}
      {...props}
    />
  );
}

PopoverDescription.displayName = "PopoverDescription";

// ─── Exports ─────────────────────────────────────────────────────────────────

export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverPortal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
};
