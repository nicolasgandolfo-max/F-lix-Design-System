"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CaretDownIcon, CaretUpIcon, CheckIcon } from "@phosphor-icons/react";

import { cn } from "../../lib/utils";

// ─── Root / Group / Value ─────────────────────────────────────────────────────

export type SelectProps = React.ComponentProps<typeof SelectPrimitive.Root>;

function Select(props: SelectProps) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

Select.displayName = "Select";

export type SelectGroupProps = React.ComponentProps<
  typeof SelectPrimitive.Group
>;

function SelectGroup({ className, ...props }: SelectGroupProps) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn(className)}
      {...props}
    />
  );
}

SelectGroup.displayName = "SelectGroup";

export type SelectValueProps = React.ComponentProps<
  typeof SelectPrimitive.Value
>;

function SelectValue({ className, ...props }: SelectValueProps) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn(className)}
      {...props}
    />
  );
}

SelectValue.displayName = "SelectValue";

// ─── Trigger ──────────────────────────────────────────────────────────────────

export type SelectTriggerProps = React.ComponentProps<
  typeof SelectPrimitive.Trigger
>;

function SelectTrigger({ className, children, ...props }: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        // Matches the Figma "Select" trigger inside the paginator dropdown:
        // 32px tall, 1px border, sm radius, sm caption-style placeholder.
        "flex h-8 w-full items-center justify-between gap-2",
        "rounded-sm border border-border bg-background px-2",
        "font-sans text-xs leading-tight tracking-[0.25px] text-foreground",
        "outline-none transition-colors",
        "data-placeholder:text-secondary",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        // Caret rotation hint when open (mirrors Accordion / Collapse).
        "[&[data-state=open]>span>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <span
          aria-hidden="true"
          className="inline-flex shrink-0 text-muted-foreground"
        >
          <CaretDownIcon
            weight="bold"
            className="size-4 transition-transform duration-200"
          />
        </span>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

SelectTrigger.displayName = "SelectTrigger";

// ─── Portal ───────────────────────────────────────────────────────────────────

export type SelectPortalProps = React.ComponentProps<
  typeof SelectPrimitive.Portal
>;

function SelectPortal(props: SelectPortalProps) {
  return <SelectPrimitive.Portal data-slot="select-portal" {...props} />;
}

SelectPortal.displayName = "SelectPortal";

// ─── ScrollUpButton / ScrollDownButton ────────────────────────────────────────

const scrollButtonClasses = cn(
  "flex cursor-default items-center justify-center py-1",
  "text-muted-foreground"
);

export type SelectScrollUpButtonProps = React.ComponentProps<
  typeof SelectPrimitive.ScrollUpButton
>;

function SelectScrollUpButton({
  className,
  ...props
}: SelectScrollUpButtonProps) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(scrollButtonClasses, className)}
      {...props}
    >
      <CaretUpIcon weight="bold" className="size-4" aria-hidden="true" />
    </SelectPrimitive.ScrollUpButton>
  );
}

SelectScrollUpButton.displayName = "SelectScrollUpButton";

export type SelectScrollDownButtonProps = React.ComponentProps<
  typeof SelectPrimitive.ScrollDownButton
>;

function SelectScrollDownButton({
  className,
  ...props
}: SelectScrollDownButtonProps) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(scrollButtonClasses, className)}
      {...props}
    >
      <CaretDownIcon weight="bold" className="size-4" aria-hidden="true" />
    </SelectPrimitive.ScrollDownButton>
  );
}

SelectScrollDownButton.displayName = "SelectScrollDownButton";

// ─── Content ──────────────────────────────────────────────────────────────────

export interface SelectContentProps extends React.ComponentProps<
  typeof SelectPrimitive.Content
> {}

function SelectContent({
  className,
  children,
  position = "popper",
  sideOffset = 4,
  ...props
}: SelectContentProps) {
  return (
    <SelectPortal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-(--radix-select-trigger-width) overflow-hidden",
          "bg-popover text-popover-foreground",
          "border border-border rounded-md shadow-lg",
          "outline-none",
          "data-[state=open]:animate-popover-content-in",
          "data-[state=closed]:animate-popover-content-out",
          // When `position="popper"`, Radix exposes the placement via
          // `data-side`; clamp the content height to the available space
          // so very long lists scroll instead of overflowing the viewport.
          position === "popper" &&
            "max-h-(--radix-select-content-available-height)",
          className
        )}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          data-slot="select-viewport"
          className={cn(
            "p-1",
            position === "popper" &&
              "h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width)"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPortal>
  );
}

SelectContent.displayName = "SelectContent";

// ─── Label ────────────────────────────────────────────────────────────────────

export type SelectLabelProps = React.ComponentProps<
  typeof SelectPrimitive.Label
>;

function SelectLabel({ className, ...props }: SelectLabelProps) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn(
        "px-2 py-1.5 font-sans text-xs font-semibold text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

SelectLabel.displayName = "SelectLabel";

// ─── Item ─────────────────────────────────────────────────────────────────────

export type SelectItemProps = React.ComponentProps<typeof SelectPrimitive.Item>;

function SelectItem({ className, children, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default select-none items-center",
        "rounded-sm py-1.5 pl-8 pr-2",
        "font-sans text-sm leading-tight text-foreground",
        "outline-none transition-colors",
        "focus:bg-secondary focus:text-background",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" weight="bold" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

SelectItem.displayName = "SelectItem";

// ─── Separator ────────────────────────────────────────────────────────────────

export type SelectSeparatorProps = React.ComponentProps<
  typeof SelectPrimitive.Separator
>;

function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

SelectSeparator.displayName = "SelectSeparator";

// ─── Exports ──────────────────────────────────────────────────────────────────

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectPortal,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
