"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

// ─── Variants ─────────────────────────────────────────────────────────────────

/**
 * Container that holds the tab triggers. Per Figma node 1035:8545 it's a
 * `bg-card` rounded pill with 4 px padding and 2 px gap between triggers.
 */
const tabsListVariants = cva(
  cn(
    "inline-flex items-center bg-card rounded-md p-1 gap-0.5",
    "data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch"
  ),
  {
    variants: {
      // Future variants (e.g. "underline") can land here without breaking the
      // public API. Default mirrors the segmented-control look from Figma.
      variant: {
        default: "",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

/**
 * Individual tab trigger. Three visual states map to Radix's `data-state` and
 * the native `disabled` attribute:
 *
 * - **Default** — `text-secondary`
 * - **Active** — `bg-background` + `shadow-sm` + `text-foreground`
 * - **Disabled** — `text-(--neutral-300)`
 */
const tabsTriggerVariants = cva(
  cn(
    "inline-flex items-center gap-0.5 shrink-0 rounded-sm px-2 py-1",
    "font-sans text-xs leading-tight tracking-caption",
    "transition-[color,background-color,box-shadow] cursor-pointer",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    // Default
    "text-secondary",
    // Active
    "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
    // Disabled
    "disabled:cursor-not-allowed disabled:text-(--neutral-300)",
    // Inline icons — 14 px per Figma (`size-3.5`)
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5"
  )
);

// ─── Root ─────────────────────────────────────────────────────────────────────

export type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root>;

function Tabs({ className, orientation = "horizontal", ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      orientation={orientation}
      className={cn(
        "flex flex-col gap-3 data-[orientation=vertical]:flex-row",
        className
      )}
      {...props}
    />
  );
}

Tabs.displayName = "Tabs";

// ─── List ─────────────────────────────────────────────────────────────────────

export interface TabsListProps
  extends
    React.ComponentProps<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

function TabsList({ className, variant, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

TabsList.displayName = "TabsList";

// ─── Trigger ──────────────────────────────────────────────────────────────────

export interface TabsTriggerProps extends React.ComponentProps<
  typeof TabsPrimitive.Trigger
> {
  /** Optional icon rendered before the label. Sized to 14 px by default. */
  iconLeft?: React.ReactNode;
  /** Optional icon rendered after the label. Sized to 14 px by default. */
  iconRight?: React.ReactNode;
}

function TabsTrigger({
  className,
  children,
  iconLeft,
  iconRight,
  ...props
}: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants(), className)}
      {...props}
    >
      {iconLeft}
      {children}
      {iconRight}
    </TabsPrimitive.Trigger>
  );
}

TabsTrigger.displayName = "TabsTrigger";

// ─── Content ──────────────────────────────────────────────────────────────────

export type TabsContentProps = React.ComponentProps<
  typeof TabsPrimitive.Content
>;

function TabsContent({ className, ...props }: TabsContentProps) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
        className
      )}
      {...props}
    />
  );
}

TabsContent.displayName = "TabsContent";

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants,
};
