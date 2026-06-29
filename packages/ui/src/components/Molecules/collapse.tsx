"use client";

import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { CaretDownIcon } from "@phosphor-icons/react";

import { cn } from "../../lib/utils";

// ─── Root ─────────────────────────────────────────────────────────────────────

export type CollapseProps = React.ComponentProps<
  typeof CollapsiblePrimitive.Root
>;

function Collapse({ className, ...props }: CollapseProps) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapse"
      className={cn(
        // Outer panel: bordered, rounded, padded; full-width by default so
        // consumers control sizing via parent layout. Always a column so
        // the (mounted-but-animating) content body stays below the header
        // during the open AND close transitions — flipping to flex-row on
        // close caused the text + body to briefly render side-by-side.
        "flex w-full flex-col rounded-md border border-border bg-background p-2",
        className
      )}
      {...props}
    />
  );
}

Collapse.displayName = "Collapse";

// ─── Trigger ──────────────────────────────────────────────────────────────────

export interface CollapseTriggerProps extends React.ComponentProps<
  typeof CollapsiblePrimitive.Trigger
> {
  /**
   * Override the default chevron indicator.
   * - Pass any React node to replace the indicator.
   * - Pass `null` to omit it.
   */
  indicator?: React.ReactNode | null;
}

function CollapseTrigger({
  className,
  children,
  indicator,
  ...props
}: CollapseTriggerProps) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapse-trigger"
      className={cn(
        // Header row: spans the full available width, label/indicator on
        // each end. Card tint + top-rounded corners only when open so the
        // closed state stays flush with the outer container.
        "flex w-full items-center justify-between gap-2 px-1 py-2 text-left",
        "font-sans text-sm font-semibold leading-tight text-foreground",
        "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=open]:rounded-t-sm data-[state=open]:bg-card",
        // Default chevron rotates 180° when open (mirrors Accordion).
        "[&[data-state=open]>span>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      {indicator === null ? null : indicator !== undefined ? (
        <span data-slot="collapse-indicator" aria-hidden="true">
          {indicator}
        </span>
      ) : (
        <span
          data-slot="collapse-indicator"
          aria-hidden="true"
          className="inline-flex shrink-0"
        >
          <CaretDownIcon
            weight="bold"
            className="size-3.5 text-foreground transition-transform duration-200"
          />
        </span>
      )}
    </CollapsiblePrimitive.Trigger>
  );
}

CollapseTrigger.displayName = "CollapseTrigger";

// ─── Content ──────────────────────────────────────────────────────────────────

export type CollapseContentProps = React.ComponentProps<
  typeof CollapsiblePrimitive.Content
>;

function CollapseContent({
  className,
  children,
  style,
  ...props
}: CollapseContentProps) {
  return (
    <CollapsiblePrimitive.Content
      data-slot="collapse-content"
      className={cn(
        "overflow-hidden font-sans text-sm leading-normal text-foreground",
        "data-[state=closed]:animate-collapse-up",
        "data-[state=open]:animate-collapse-down"
      )}
      // Bridge Radix's primitive-specific height var to the generic
      // `--collapse-content-height` consumed by the reusable
      // `collapse-up` / `collapse-down` keyframes.
      style={
        {
          "--collapse-content-height":
            "var(--radix-collapsible-content-height)",
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className={cn("rounded-b-sm bg-card px-1 py-2", className)}>
        {children}
      </div>
    </CollapsiblePrimitive.Content>
  );
}

CollapseContent.displayName = "CollapseContent";

export { Collapse, CollapseTrigger, CollapseContent };
