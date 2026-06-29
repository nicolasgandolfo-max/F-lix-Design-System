"use client";

import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva, type VariantProps } from "class-variance-authority";
import { CaretDownIcon } from "@phosphor-icons/react";

import { cn } from "../../lib/utils";

// ─── Variants (Felix DS — Figma: Navigation Menu, node 956:47 / 956:46) ──────

/**
 * Visual classes shared by every clickable menu item in the navigation bar
 * — both the dropdown `Trigger` and a plain `Link`.
 *
 * Three Figma states map to Radix data attributes and standard CSS:
 *
 * - **Default** — `text-foreground`, transparent background.
 * - **Hover / Open** — `bg-interactive-ghost-hover` (cream `#efebe7` light /
 *   `#234343` dark — the Felix `interactive/ghost/--hover` token, which is
 *   exactly what Figma references for this state).
 * - **Active** (current page) — `bg-primary` + `text-primary-foreground`,
 *   driven by `data-active` (Radix `Link.active`) or `aria-current="page"`.
 * - **Disabled** — `text-(--neutral-300)` + `pointer-events-none`.
 *
 * The 18 px caret used by `NavigationMenuTrigger` rotates 180 degrees while
 * open, mirroring the `Select` / `Accordion` / `Collapse` conventions.
 */
const navigationMenuItemBase = cn(
  "inline-flex items-center gap-1 select-none",
  "rounded-md px-2 py-2",
  "font-sans text-sm leading-tight tracking-normal",
  "text-foreground",
  "outline-none cursor-pointer transition-colors",
  "hover:bg-interactive-ghost-hover",
  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  "data-[state=open]:bg-interactive-ghost-hover",
  "data-[active]:bg-primary data-[active]:text-primary-foreground",
  "aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground",
  "data-[disabled]:pointer-events-none data-[disabled]:text-(--neutral-300)",
  "aria-disabled:pointer-events-none aria-disabled:text-(--neutral-300)",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  "[&_svg:not([class*='size-'])]:size-4.5"
);

const navigationMenuTriggerVariants = cva(navigationMenuItemBase);

const navigationMenuLinkVariants = cva(navigationMenuItemBase);

// ─── Root ─────────────────────────────────────────────────────────────────────

export interface NavigationMenuProps extends React.ComponentProps<
  typeof NavigationMenuPrimitive.Root
> {
  /**
   * Whether to render the built-in `Viewport` for dropdown content panels.
   * Set to `false` if you only need plain links (no dropdowns) or if you want
   * to position your own viewport elsewhere in the tree.
   * @default true
   */
  viewport?: boolean;
}

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: NavigationMenuProps) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "relative flex max-w-max flex-1 items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
      {viewport ? <NavigationMenuViewport /> : null}
    </NavigationMenuPrimitive.Root>
  );
}

NavigationMenu.displayName = "NavigationMenu";

// ─── List ────────────────────────────────────────────────────────────────────

export type NavigationMenuListProps = React.ComponentProps<
  typeof NavigationMenuPrimitive.List
>;

function NavigationMenuList({ className, ...props }: NavigationMenuListProps) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-2",
        className
      )}
      {...props}
    />
  );
}

NavigationMenuList.displayName = "NavigationMenuList";

// ─── Item ────────────────────────────────────────────────────────────────────

export type NavigationMenuItemProps = React.ComponentProps<
  typeof NavigationMenuPrimitive.Item
>;

function NavigationMenuItem({ className, ...props }: NavigationMenuItemProps) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  );
}

NavigationMenuItem.displayName = "NavigationMenuItem";

// ─── Trigger ─────────────────────────────────────────────────────────────────

export interface NavigationMenuTriggerProps
  extends
    React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>,
    VariantProps<typeof navigationMenuTriggerVariants> {}

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: NavigationMenuTriggerProps) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerVariants(), "group", className)}
      {...props}
    >
      {children}
      <CaretDownIcon
        weight="bold"
        aria-hidden="true"
        className={cn(
          "transition-transform duration-200",
          "group-data-[state=open]:rotate-180"
        )}
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

// ─── Content ─────────────────────────────────────────────────────────────────

export type NavigationMenuContentProps = React.ComponentProps<
  typeof NavigationMenuPrimitive.Content
>;

function NavigationMenuContent({
  className,
  ...props
}: NavigationMenuContentProps) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "left-0 top-0 w-full p-2 md:absolute md:w-auto",
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out",
        "data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out",
        "data-[motion=from-end]:slide-in-from-right-52",
        "data-[motion=from-start]:slide-in-from-left-52",
        "data-[motion=to-end]:slide-out-to-right-52",
        "data-[motion=to-start]:slide-out-to-left-52",
        className
      )}
      {...props}
    />
  );
}

NavigationMenuContent.displayName = "NavigationMenuContent";

// ─── Link ────────────────────────────────────────────────────────────────────

export interface NavigationMenuLinkProps
  extends
    React.ComponentProps<typeof NavigationMenuPrimitive.Link>,
    VariantProps<typeof navigationMenuLinkVariants> {}

function NavigationMenuLink({
  className,
  active,
  ...props
}: NavigationMenuLinkProps) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      active={active}
      className={cn(navigationMenuLinkVariants(), className)}
      {...props}
    />
  );
}

NavigationMenuLink.displayName = "NavigationMenuLink";

// ─── Indicator ───────────────────────────────────────────────────────────────

export type NavigationMenuIndicatorProps = React.ComponentProps<
  typeof NavigationMenuPrimitive.Indicator
>;

function NavigationMenuIndicator({
  className,
  ...props
}: NavigationMenuIndicatorProps) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "top-full z-1 flex h-1.5 items-end justify-center overflow-hidden",
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out",
        "data-[state=hidden]:fade-out data-[state=visible]:fade-in",
        className
      )}
      {...props}
    >
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border" />
    </NavigationMenuPrimitive.Indicator>
  );
}

NavigationMenuIndicator.displayName = "NavigationMenuIndicator";

// ─── Viewport ────────────────────────────────────────────────────────────────

export type NavigationMenuViewportProps = React.ComponentProps<
  typeof NavigationMenuPrimitive.Viewport
>;

function NavigationMenuViewport({
  className,
  ...props
}: NavigationMenuViewportProps) {
  return (
    <div
      data-slot="navigation-menu-viewport-wrapper"
      className={cn("absolute left-0 top-full flex justify-center")}
    >
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "origin-top-center relative mt-2 overflow-hidden",
          "rounded-lg border border-border bg-popover text-popover-foreground",
          "shadow-md",
          "h-(--radix-navigation-menu-viewport-height)",
          "w-full md:w-(--radix-navigation-menu-viewport-width)",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90",
          className
        )}
        {...props}
      />
    </div>
  );
}

NavigationMenuViewport.displayName = "NavigationMenuViewport";

// ─── Exports ─────────────────────────────────────────────────────────────────

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerVariants,
  navigationMenuLinkVariants,
};
