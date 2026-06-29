"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "../../lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

/** Edge of the viewport the drawer slides in from. */
export type DrawerDirection = "top" | "bottom" | "left" | "right";

/**
 * Props for the `Drawer` root. Passed straight through to
 * [`vaul`'s `Drawer.Root`](https://github.com/emilkowalski/vaul?tab=readme-ov-file#api-reference).
 *
 * Key props (see Storybook autodocs for full descriptions + defaults):
 * - `direction`: `"top" | "bottom" | "left" | "right"` — edge to slide in from (default `"bottom"`).
 * - `open` / `defaultOpen` / `onOpenChange`: controlled/uncontrolled open state.
 * - `modal`: block interaction with the page while open (default `true`).
 * - `dismissible`: allow swipe / overlay-click to close (default `true`).
 * - `shouldScaleBackground`: iOS-style background scale (only with `direction="bottom"`).
 * - `snapPoints` + `activeSnapPoint` + `setActiveSnapPoint`: multi-stage drawers.
 * - `fadeFromIndex`: snap index where overlay fade-in starts.
 */
export type DrawerProps = React.ComponentProps<typeof DrawerPrimitive.Root>;

/** Button that toggles the drawer open. Supports `asChild`. */
export type DrawerTriggerProps = React.ComponentProps<
  typeof DrawerPrimitive.Trigger
>;

/** Button that closes the drawer. Supports `asChild`. */
export type DrawerCloseProps = React.ComponentProps<
  typeof DrawerPrimitive.Close
>;

/** Renders its children into a portal appended to `document.body`. */
export type DrawerPortalProps = React.ComponentProps<
  typeof DrawerPrimitive.Portal
>;

/** Dim overlay shown behind the drawer content. */
export type DrawerOverlayProps = React.ComponentProps<
  typeof DrawerPrimitive.Overlay
>;

/**
 * Main drawer surface. Styling adapts automatically based on the
 * `direction` set on the parent `Drawer`.
 */
export type DrawerContentProps = React.ComponentProps<
  typeof DrawerPrimitive.Content
>;

/** Container for `DrawerTitle` + `DrawerDescription`. */
export type DrawerHeaderProps = React.ComponentProps<"div">;

/** Container pinned to the end of the drawer for primary actions. */
export type DrawerFooterProps = React.ComponentProps<"div">;

/** Accessible title — required for `aria-labelledby` on the content. */
export type DrawerTitleProps = React.ComponentProps<
  typeof DrawerPrimitive.Title
>;

/** Accessible description — supports `aria-describedby` on the content. */
export type DrawerDescriptionProps = React.ComponentProps<
  typeof DrawerPrimitive.Description
>;

// ─── Components ───────────────────────────────────────────────────────────────

/**
 * Sheet-like surface anchored to any screen edge, powered by
 * [`vaul`](https://github.com/emilkowalski/vaul). Supports swipe-to-dismiss
 * gestures on touch devices and optional snap points.
 *
 * Compose with `Drawer`, `DrawerTrigger`, `DrawerContent`, `DrawerHeader`,
 * `DrawerFooter`, `DrawerTitle`, `DrawerDescription`, and `DrawerClose`.
 *
 * Styled exclusively with Felix design tokens — no raw pixel values.
 *
 * @example
 * ```tsx
 * <Drawer direction="bottom">
 *   <DrawerTrigger asChild>
 *     <Button>Open</Button>
 *   </DrawerTrigger>
 *   <DrawerContent>
 *     <DrawerHeader>
 *       <DrawerTitle>Move goal</DrawerTitle>
 *       <DrawerDescription>Set your daily goal.</DrawerDescription>
 *     </DrawerHeader>
 *     <DrawerFooter>
 *       <Button>Save</Button>
 *       <DrawerClose asChild>
 *         <Button variant="line">Cancel</Button>
 *       </DrawerClose>
 *     </DrawerFooter>
 *   </DrawerContent>
 * </Drawer>
 * ```
 */
function Drawer({ ...props }: DrawerProps) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

/**
 * Button that toggles the drawer open. Pass `asChild` to forward the trigger
 * behaviour to any element (e.g. Felix `Button`).
 */
function DrawerTrigger({ ...props }: DrawerTriggerProps) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

/** Renders its children into a portal appended to `document.body`. */
function DrawerPortal({ ...props }: DrawerPortalProps) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

/**
 * Button that closes the drawer. Pass `asChild` to forward the close
 * behaviour to any element (e.g. Felix `Button`).
 */
function DrawerClose({ ...props }: DrawerCloseProps) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

/** Dim overlay shown behind the drawer content. Rendered automatically by `DrawerContent`. */
function DrawerOverlay({ className, ...props }: DrawerOverlayProps) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-slate-900/50",
        "data-[state=open]:animate-overlay-in data-[state=closed]:animate-overlay-out",
        className
      )}
      {...props}
    />
  );
}

/**
 * Main drawer surface. Styling adapts automatically based on the `direction`
 * set on the parent `Drawer`: bottom/top become sheets (full width, capped at
 * 80svh), left/right become side panels (75% width, capped at `sm:max-w-sm`).
 * Inner-facing corners are rounded with `radius-xl` (16px) on all four sides.
 * A draggable handle is rendered on the dragged edge for `direction="bottom"`
 * (top of panel) and `direction="top"` (bottom of panel).
 */
function DrawerContent({ className, children, ...props }: DrawerContentProps) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content fixed z-50 flex h-auto flex-col bg-background text-foreground shadow-lg outline-none",
          // Top — opens from the top edge
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0",
          "data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80svh]",
          "data-[vaul-drawer-direction=top]:rounded-b-xl data-[vaul-drawer-direction=top]:border-b data-[vaul-drawer-direction=top]:border-border",
          // Bottom — opens from the bottom edge (default)
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0",
          "data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80svh]",
          "data-[vaul-drawer-direction=bottom]:rounded-t-xl data-[vaul-drawer-direction=bottom]:border-t data-[vaul-drawer-direction=bottom]:border-border",
          // Right — slides in from the right
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0",
          "data-[vaul-drawer-direction=right]:w-3/4 sm:data-[vaul-drawer-direction=right]:max-w-sm",
          "data-[vaul-drawer-direction=right]:rounded-l-xl data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:border-border",
          // Left — slides in from the left
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0",
          "data-[vaul-drawer-direction=left]:w-3/4 sm:data-[vaul-drawer-direction=left]:max-w-sm",
          "data-[vaul-drawer-direction=left]:rounded-r-xl data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:border-border",
          className
        )}
        {...props}
      >
        <div
          aria-hidden="true"
          data-slot="drawer-handle"
          className={cn(
            "mx-auto hidden h-1 w-10 shrink-0 rounded-xs bg-secondary",
            // Bottom — handle pinned to the top edge with 8px breathing room
            "group-data-[vaul-drawer-direction=bottom]/drawer-content:block",
            "group-data-[vaul-drawer-direction=bottom]/drawer-content:mt-2",
            // Top — handle pinned to the bottom edge with 8px breathing room
            "group-data-[vaul-drawer-direction=top]/drawer-content:block",
            "group-data-[vaul-drawer-direction=top]/drawer-content:order-last",
            "group-data-[vaul-drawer-direction=top]/drawer-content:mb-2"
          )}
        />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

/**
 * Container for `DrawerTitle` + `DrawerDescription`. Centers its content for
 * every direction (matching the Figma spec) and is separated from the body
 * by a token-based bottom border.
 */
function DrawerHeader({ className, ...props }: DrawerHeaderProps) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col items-center justify-center gap-1 px-4 py-3 text-center",
        "border-b border-border",
        className
      )}
      {...props}
    />
  );
}

/**
 * Container pinned to the end of the drawer for primary actions. Stacks its
 * children vertically with token-based spacing and is separated from the body
 * by a token-based top border.
 */
function DrawerFooter({ className, ...props }: DrawerFooterProps) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(
        "mt-auto flex flex-col gap-1 px-4 py-3",
        "border-t border-border",
        className
      )}
      {...props}
    />
  );
}

/**
 * Accessible title for the drawer. The `id` is wired to `aria-labelledby` on
 * `DrawerContent` automatically — always render a `DrawerTitle` to satisfy
 * the `dialog` accessibility contract (use `sr-only` to hide it visually).
 */
function DrawerTitle({ className, ...props }: DrawerTitleProps) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        "font-sans text-base font-semibold leading-tight text-foreground",
        className
      )}
      {...props}
    />
  );
}

/**
 * Accessible description for the drawer. The `id` is wired to
 * `aria-describedby` on `DrawerContent` automatically.
 */
function DrawerDescription({ className, ...props }: DrawerDescriptionProps) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn(
        "font-sans text-xs font-regular leading-tight tracking-caption text-secondary",
        className
      )}
      {...props}
    />
  );
}

Drawer.displayName = "Drawer";
DrawerTrigger.displayName = "DrawerTrigger";
DrawerPortal.displayName = "DrawerPortal";
DrawerClose.displayName = "DrawerClose";
DrawerOverlay.displayName = "DrawerOverlay";
DrawerContent.displayName = "DrawerContent";
DrawerHeader.displayName = "DrawerHeader";
DrawerFooter.displayName = "DrawerFooter";
DrawerTitle.displayName = "DrawerTitle";
DrawerDescription.displayName = "DrawerDescription";

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
};
