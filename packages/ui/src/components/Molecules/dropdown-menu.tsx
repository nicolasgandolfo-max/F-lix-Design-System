"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, CaretRightIcon, CircleIcon } from "@phosphor-icons/react";

import { Separator } from "../Atoms/separator";
import { cn } from "../../lib/utils";

// ─── Root ────────────────────────────────────────────────────────────────────

export type DropdownMenuProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Root
>;

function DropdownMenu(props: DropdownMenuProps) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

DropdownMenu.displayName = "DropdownMenu";

// ─── Trigger ─────────────────────────────────────────────────────────────────

export type DropdownMenuTriggerProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Trigger
>;

function DropdownMenuTrigger({
  className,
  ...props
}: DropdownMenuTriggerProps) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      className={cn(className)}
      {...props}
    />
  );
}

DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

// ─── Portal ──────────────────────────────────────────────────────────────────

export type DropdownMenuPortalProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Portal
>;

function DropdownMenuPortal(props: DropdownMenuPortalProps) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  );
}

DropdownMenuPortal.displayName = "DropdownMenuPortal";

// ─── Group ───────────────────────────────────────────────────────────────────

export type DropdownMenuGroupProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Group
>;

function DropdownMenuGroup({ className, ...props }: DropdownMenuGroupProps) {
  return (
    <DropdownMenuPrimitive.Group
      data-slot="dropdown-menu-group"
      className={cn(className)}
      {...props}
    />
  );
}

DropdownMenuGroup.displayName = "DropdownMenuGroup";

// ─── Content ─────────────────────────────────────────────────────────────────

export type DropdownMenuContentProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Content
>;

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuPortal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-24 flex flex-col p-1",
          "bg-popover text-popover-foreground",
          "border border-border rounded-lg shadow-md",
          "outline-none",
          "max-h-(--radix-dropdown-menu-content-available-height)",
          "origin-(--radix-dropdown-menu-content-transform-origin)",
          // `overflow-x-clip` (vs `hidden`) avoids creating a horizontal
          // scroll container, which keeps negatively-margined children
          // (e.g. the full-bleed `DropdownMenuSeparator`) extending
          // symmetrically on both sides.
          "overflow-x-clip overflow-y-auto",
          "data-[state=open]:animate-popover-content-in",
          "data-[state=closed]:animate-popover-content-out",
          className
        )}
        {...props}
      />
    </DropdownMenuPortal>
  );
}

DropdownMenuContent.displayName = "DropdownMenuContent";

// ─── Item ────────────────────────────────────────────────────────────────────

const itemBaseClasses = cn(
  "relative flex cursor-default select-none items-center gap-2",
  "rounded-sm px-2 py-2",
  "text-xs leading-tight tracking-caption",
  "outline-none transition-colors",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  "[&_svg:not([class*='size-'])]:size-4"
);

const itemVariantClasses = cn(
  "text-foreground focus:bg-secondary focus:text-background",
  "data-[variant=danger]:text-destructive",
  "data-[variant=danger]:focus:bg-destructive",
  "data-[variant=danger]:focus:text-background"
);

export interface DropdownMenuItemProps extends React.ComponentProps<
  typeof DropdownMenuPrimitive.Item
> {
  /**
   * Visual variant.
   * - `default` — standard menu item (foreground text, secondary hover).
   * - `danger` — destructive action (destructive text, destructive hover).
   * @default "default"
   */
  variant?: "default" | "danger";
  /**
   * When `true`, reserves space on the left for an indicator/icon — useful
   * for keeping items aligned next to `DropdownMenuCheckboxItem` /
   * `DropdownMenuRadioItem`.
   * @default false
   */
  inset?: boolean;
}

function DropdownMenuItem({
  className,
  variant = "default",
  inset,
  ...props
}: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-variant={variant}
      data-inset={inset ? "" : undefined}
      className={cn(
        itemBaseClasses,
        itemVariantClasses,
        "data-inset:pl-8",
        className
      )}
      {...props}
    />
  );
}

DropdownMenuItem.displayName = "DropdownMenuItem";

// ─── CheckboxItem ────────────────────────────────────────────────────────────

export type DropdownMenuCheckboxItemProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.CheckboxItem
>;

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: DropdownMenuCheckboxItemProps) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      checked={checked}
      className={cn(
        itemBaseClasses,
        "text-foreground focus:bg-secondary focus:text-background",
        "py-2 pr-2 pl-8",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" weight="bold" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

// ─── RadioGroup ──────────────────────────────────────────────────────────────

export type DropdownMenuRadioGroupProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.RadioGroup
>;

function DropdownMenuRadioGroup({
  className,
  ...props
}: DropdownMenuRadioGroupProps) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      className={cn(className)}
      {...props}
    />
  );
}

DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup";

// ─── RadioItem ───────────────────────────────────────────────────────────────

export type DropdownMenuRadioItemProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.RadioItem
>;

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: DropdownMenuRadioItemProps) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        itemBaseClasses,
        "text-foreground focus:bg-secondary focus:text-background",
        "py-2 pr-2 pl-8",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" weight="fill" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

// ─── Label ───────────────────────────────────────────────────────────────────

export interface DropdownMenuLabelProps extends React.ComponentProps<
  typeof DropdownMenuPrimitive.Label
> {
  /** Reserves space on the left to align with checkbox/radio items. */
  inset?: boolean;
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: DropdownMenuLabelProps) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset ? "" : undefined}
      className={cn(
        "px-2 py-2 text-xs font-semibold leading-tight tracking-caption",
        "text-secondary",
        "data-inset:pl-8",
        className
      )}
      {...props}
    />
  );
}

DropdownMenuLabel.displayName = "DropdownMenuLabel";

// ─── Separator ───────────────────────────────────────────────────────────────

export interface DropdownMenuSeparatorProps extends React.ComponentProps<
  typeof DropdownMenuPrimitive.Separator
> {
  /**
   * Whether the divider sits within the dropdown's inner padding (default —
   * matches Figma node `607:554`) or bleeds edge-to-edge through that padding.
   *
   * - `true` (default) — line is contained by the content's `p-1` padding,
   *   leaving a small breathing margin on both sides.
   * - `false` — line extends past the padding all the way to the dropdown's
   *   rounded border, useful for visually separating major sections.
   *
   * @default true
   */
  inset?: boolean;
}

function DropdownMenuSeparator({
  className,
  inset = true,
  ...props
}: DropdownMenuSeparatorProps) {
  return (
    <DropdownMenuPrimitive.Separator asChild {...props}>
      <Separator
        data-slot="dropdown-menu-separator"
        data-inset={inset ? "" : undefined}
        className={cn(
          "my-1",
          // Negative horizontal margin negates the parent's `p-1` so the
          // line bleeds all the way to the dropdown's rounded border.
          // Pair with `overflow-x-clip` on the content so the right edge
          // matches the left.
          !inset && "-mx-1",
          className
        )}
      />
    </DropdownMenuPrimitive.Separator>
  );
}

DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

// ─── Shortcut ────────────────────────────────────────────────────────────────

export type DropdownMenuShortcutProps = React.ComponentProps<"span">;

function DropdownMenuShortcut({
  className,
  ...props
}: DropdownMenuShortcutProps) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto text-xs leading-tight tracking-caption text-secondary",
        "group-focus:text-background",
        className
      )}
      {...props}
    />
  );
}

DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

// ─── Sub ─────────────────────────────────────────────────────────────────────

export type DropdownMenuSubProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.Sub
>;

function DropdownMenuSub(props: DropdownMenuSubProps) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

DropdownMenuSub.displayName = "DropdownMenuSub";

// ─── SubTrigger ──────────────────────────────────────────────────────────────

export interface DropdownMenuSubTriggerProps extends React.ComponentProps<
  typeof DropdownMenuPrimitive.SubTrigger
> {
  /** Reserves space on the left to align with checkbox/radio items. */
  inset?: boolean;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: DropdownMenuSubTriggerProps) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset ? "" : undefined}
      className={cn(
        itemBaseClasses,
        "text-foreground",
        "focus:bg-secondary focus:text-background",
        "data-[state=open]:bg-secondary data-[state=open]:text-background",
        "data-inset:pl-8",
        className
      )}
      {...props}
    >
      {children}
      <CaretRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

// ─── SubContent ──────────────────────────────────────────────────────────────

export type DropdownMenuSubContentProps = React.ComponentProps<
  typeof DropdownMenuPrimitive.SubContent
>;

function DropdownMenuSubContent({
  className,
  ...props
}: DropdownMenuSubContentProps) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "z-50 min-w-24 flex flex-col p-1",
        "bg-popover text-popover-foreground",
        "border border-border rounded-lg shadow-md",
        "outline-none overflow-hidden",
        "origin-(--radix-dropdown-menu-content-transform-origin)",
        "data-[state=open]:animate-popover-content-in",
        "data-[state=closed]:animate-popover-content-out",
        className
      )}
      {...props}
    />
  );
}

DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

// ─── Exports ─────────────────────────────────────────────────────────────────

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
