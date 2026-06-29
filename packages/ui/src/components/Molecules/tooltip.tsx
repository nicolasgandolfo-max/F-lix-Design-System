"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "../../lib/utils";

// ─── Provider ────────────────────────────────────────────────────────────────

export type TooltipProviderProps = React.ComponentProps<
  typeof TooltipPrimitive.Provider
>;

function TooltipProvider({
  delayDuration = 200,
  skipDelayDuration = 300,
  ...props
}: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      {...props}
    />
  );
}

TooltipProvider.displayName = "TooltipProvider";

// ─── Root ────────────────────────────────────────────────────────────────────

export type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root>;

function Tooltip(props: TooltipProps) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

Tooltip.displayName = "Tooltip";

// ─── Trigger ─────────────────────────────────────────────────────────────────

export type TooltipTriggerProps = React.ComponentProps<
  typeof TooltipPrimitive.Trigger
>;

function TooltipTrigger({ className, ...props }: TooltipTriggerProps) {
  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      className={cn(className)}
      {...props}
    />
  );
}

TooltipTrigger.displayName = "TooltipTrigger";

// ─── Portal ──────────────────────────────────────────────────────────────────

export type TooltipPortalProps = React.ComponentProps<
  typeof TooltipPrimitive.Portal
>;

function TooltipPortal(props: TooltipPortalProps) {
  return <TooltipPrimitive.Portal data-slot="tooltip-portal" {...props} />;
}

TooltipPortal.displayName = "TooltipPortal";

// ─── Arrow ───────────────────────────────────────────────────────────────────

export type TooltipArrowProps = React.ComponentProps<
  typeof TooltipPrimitive.Arrow
>;

function TooltipArrow({
  className,
  width = 10,
  height = 6,
  ...props
}: TooltipArrowProps) {
  return (
    <TooltipPrimitive.Arrow
      data-slot="tooltip-arrow"
      width={width}
      height={height}
      className={cn("fill-foreground", className)}
      {...props}
    />
  );
}

TooltipArrow.displayName = "TooltipArrow";

// ─── Content ─────────────────────────────────────────────────────────────────

export interface TooltipContentProps extends React.ComponentProps<
  typeof TooltipPrimitive.Content
> {
  /**
   * Render a small triangular arrow pointing toward the trigger.
   * @default false
   */
  arrow?: boolean;
}

function TooltipContent({
  className,
  children,
  arrow = false,
  sideOffset = 6,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPortal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "z-50 inline-flex items-center justify-center",
          "bg-foreground text-background",
          "rounded-md shadow-lg",
          "px-6 py-2",
          "font-sans text-xxs leading-[1.1] tracking-normal whitespace-nowrap",
          "data-[state=delayed-open]:animate-fade-in",
          "data-[state=instant-open]:animate-fade-in",
          "data-[state=closed]:opacity-0",
          className
        )}
        {...props}
      >
        {children}
        {arrow && <TooltipArrow />}
      </TooltipPrimitive.Content>
    </TooltipPortal>
  );
}

TooltipContent.displayName = "TooltipContent";

// ─── Exports ─────────────────────────────────────────────────────────────────

export {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipPortal,
  TooltipArrow,
  TooltipContent,
};
