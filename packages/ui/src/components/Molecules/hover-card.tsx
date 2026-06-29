"use client";

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "../../lib/utils";

// ─── Root ────────────────────────────────────────────────────────────────────

export interface HoverCardProps extends React.ComponentProps<
  typeof HoverCardPrimitive.Root
> {
  /**
   * Delay (in ms) before the card opens after the trigger is hovered or
   * focused.
   * @default 200
   */
  openDelay?: number;
  /**
   * Delay (in ms) before the card closes after the trigger or content is
   * left.
   * @default 150
   */
  closeDelay?: number;
}

function HoverCard({
  openDelay = 200,
  closeDelay = 150,
  ...props
}: HoverCardProps) {
  return (
    <HoverCardPrimitive.Root
      data-slot="hover-card"
      openDelay={openDelay}
      closeDelay={closeDelay}
      {...props}
    />
  );
}

HoverCard.displayName = "HoverCard";

// ─── Trigger ─────────────────────────────────────────────────────────────────

export type HoverCardTriggerProps = React.ComponentProps<
  typeof HoverCardPrimitive.Trigger
>;

function HoverCardTrigger({ className, ...props }: HoverCardTriggerProps) {
  return (
    <HoverCardPrimitive.Trigger
      data-slot="hover-card-trigger"
      className={cn(className)}
      {...props}
    />
  );
}

HoverCardTrigger.displayName = "HoverCardTrigger";

// ─── Portal ──────────────────────────────────────────────────────────────────

export type HoverCardPortalProps = React.ComponentProps<
  typeof HoverCardPrimitive.Portal
>;

function HoverCardPortal(props: HoverCardPortalProps) {
  return <HoverCardPrimitive.Portal data-slot="hover-card-portal" {...props} />;
}

HoverCardPortal.displayName = "HoverCardPortal";

// ─── Arrow ───────────────────────────────────────────────────────────────────

export type HoverCardArrowProps = React.ComponentProps<
  typeof HoverCardPrimitive.Arrow
>;

function HoverCardArrow({
  className,
  width = 14,
  height = 7,
  ...props
}: HoverCardArrowProps) {
  return (
    <HoverCardPrimitive.Arrow
      data-slot="hover-card-arrow"
      width={width}
      height={height}
      asChild
      {...props}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 14 7"
        fill="none"
        aria-hidden="true"
        className={cn("overflow-visible", className)}
      >
        <path
          d="M0 0 L7 7 L14 0"
          className="fill-card stroke-border"
          strokeWidth={1}
          strokeLinejoin="round"
        />
      </svg>
    </HoverCardPrimitive.Arrow>
  );
}

HoverCardArrow.displayName = "HoverCardArrow";

// ─── Content ─────────────────────────────────────────────────────────────────

export type HoverCardContentProps = React.ComponentProps<
  typeof HoverCardPrimitive.Content
>;

function HoverCardContent({
  className,
  children,
  side = "bottom",
  align = "center",
  sideOffset = 6,
  ...props
}: HoverCardContentProps) {
  return (
    <HoverCardPortal>
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 flex flex-col gap-2 w-64",
          "bg-card text-card-foreground",
          "border border-border rounded-xl shadow-lg",
          "p-3 outline-none",
          "data-[state=open]:animate-popover-content-in",
          "data-[state=closed]:animate-popover-content-out",
          className
        )}
        {...props}
      >
        {children}
      </HoverCardPrimitive.Content>
    </HoverCardPortal>
  );
}

HoverCardContent.displayName = "HoverCardContent";

// ─── Header ──────────────────────────────────────────────────────────────────

export type HoverCardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

function HoverCardHeader({
  className,
  ref,
  ...props
}: HoverCardHeaderProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-slot="hover-card-header"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}

HoverCardHeader.displayName = "HoverCardHeader";

// ─── Body ────────────────────────────────────────────────────────────────────

export type HoverCardBodyProps = React.HTMLAttributes<HTMLDivElement>;

function HoverCardBody({
  className,
  ref,
  ...props
}: HoverCardBodyProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-slot="hover-card-body"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  );
}

HoverCardBody.displayName = "HoverCardBody";

// ─── Footer ──────────────────────────────────────────────────────────────────

export type HoverCardFooterProps = React.HTMLAttributes<HTMLDivElement>;

function HoverCardFooter({
  className,
  ref,
  ...props
}: HoverCardFooterProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-slot="hover-card-footer"
      className={cn("flex items-center gap-3", className)}
      {...props}
    />
  );
}

HoverCardFooter.displayName = "HoverCardFooter";

// ─── Title ───────────────────────────────────────────────────────────────────

export type HoverCardTitleProps = React.HTMLAttributes<HTMLParagraphElement>;

function HoverCardTitle({
  className,
  ref,
  ...props
}: HoverCardTitleProps & { ref?: React.Ref<HTMLParagraphElement> }) {
  return (
    <p
      ref={ref}
      data-slot="hover-card-title"
      className={cn(
        "text-sm font-semibold leading-normal text-card-foreground",
        className
      )}
      {...props}
    />
  );
}

HoverCardTitle.displayName = "HoverCardTitle";

// ─── Description ─────────────────────────────────────────────────────────────

export type HoverCardDescriptionProps =
  React.HTMLAttributes<HTMLParagraphElement>;

function HoverCardDescription({
  className,
  ref,
  ...props
}: HoverCardDescriptionProps & { ref?: React.Ref<HTMLParagraphElement> }) {
  return (
    <p
      ref={ref}
      data-slot="hover-card-description"
      className={cn(
        "text-xs leading-tight tracking-[0.25px] text-secondary",
        className
      )}
      {...props}
    />
  );
}

HoverCardDescription.displayName = "HoverCardDescription";

// ─── Exports ─────────────────────────────────────────────────────────────────

export {
  HoverCard,
  HoverCardTrigger,
  HoverCardPortal,
  HoverCardContent,
  HoverCardArrow,
  HoverCardHeader,
  HoverCardBody,
  HoverCardFooter,
  HoverCardTitle,
  HoverCardDescription,
};
