"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { CalendarBlank } from "@phosphor-icons/react";
import { format } from "date-fns";
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils";
import { Calendar } from "./calendar";

// ─── Variants ─────────────────────────────────────────────────────────────────

export const datePickerTriggerVariants = cva(
  cn(
    "relative flex w-full items-center justify-between",
    "border border-solid bg-background rounded-md",
    "gap-2 px-3 cursor-pointer select-none",
    "transition-colors",
    "disabled:bg-muted disabled:border-border disabled:opacity-50 disabled:cursor-not-allowed"
  ),
  {
    variants: {
      size: {
        md: "h-10",
        sm: "h-8",
      },
      hasError: {
        true: "border-destructive",
        false: "border-border",
      },
      isOpen: {
        true: "border-primary",
        false: "",
      },
    },
    // hasError takes priority over isOpen (destructive > primary)
    compoundVariants: [
      {
        hasError: true,
        isOpen: true,
        class: "border-destructive",
      },
    ],
    defaultVariants: {
      size: "md",
      hasError: false,
      isOpen: false,
    },
  }
);

// ─── Props ────────────────────────────────────────────────────────────────────

export interface DatePickerProps {
  /** Controlled selected date. */
  value?: Date;
  /** Called when the user selects or clears a date. */
  onChange?: (date: Date | undefined) => void;
  /** Placeholder shown when no date is selected. Defaults to "Pick a date". */
  placeholder?: string;
  /** Size variant — MD (h-10) or SM (h-8). */
  size?: "md" | "sm";
  /** Error message. When set, the trigger gains destructive border + text. */
  error?: string;
  /** Disable the entire widget. */
  disabled?: boolean;
  /** Extra class on the trigger button. */
  className?: string;
  /** Extra class on the outer wrapper div. */
  wrapperClassName?: string;
  /** id forwarded to the trigger button for label association. */
  id?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * A date picker that combines a styled trigger button with a floating Calendar
 * panel (Radix Popover). Supports controlled usage via `value` / `onChange`.
 *
 * Figma reference: node 578-4531.
 */
function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  size = "md",
  error,
  disabled = false,
  className,
  wrapperClassName,
  id,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const hasError = Boolean(error);
  const errorId = `${id ?? "date-picker"}-error`;

  const handleSelect = (date: Date | undefined) => {
    onChange?.(date);
    if (date) setOpen(false);
  };

  const formattedDate = value ? format(value, "MMM d, yyyy") : null;

  return (
    <div
      className={cn("flex flex-col gap-1 items-start w-full", wrapperClassName)}
      data-slot="date-picker"
    >
      {/* ── Trigger ── */}
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger asChild>
          <button
            id={id}
            type="button"
            disabled={disabled}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-describedby={hasError ? errorId : undefined}
            data-slot="date-picker-trigger"
            className={cn(
              datePickerTriggerVariants({ size, hasError, isOpen: open }),
              className
            )}
          >
            <span
              className={cn(
                "font-sans text-[12px] leading-[1.2] tracking-[0.25px] truncate",
                formattedDate
                  ? hasError
                    ? "text-destructive"
                    : "text-foreground"
                  : "text-secondary"
              )}
            >
              {formattedDate ?? placeholder}
            </span>

            <CalendarBlank
              size={20}
              aria-hidden
              className={cn(
                "shrink-0",
                disabled ? "text-secondary" : "text-foreground"
              )}
            />
          </button>
        </PopoverPrimitive.Trigger>

        {/* ── Calendar dropdown ── */}
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={8}
            data-slot="date-picker-content"
            className={cn(
              "z-50 rounded-md border border-primary bg-background overflow-hidden",
              "shadow-[0px_2px_4px_0px_rgba(8,36,34,0.04),0px_4px_6px_0px_rgba(8,36,34,0.06)]",
              // Subtle entry animation
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            )}
          >
            <Calendar
              mode="single"
              selected={value}
              // Open on the selected date's month when one is set; otherwise
              // fall back to today. Without this, react-day-picker always
              // shows the current month, which is confusing when a value is
              // pre-selected (e.g. editing an existing record).
              defaultMonth={value}
              onSelect={handleSelect}
              // Remove the default border — the Popover.Content provides it
              className="border-none shadow-none rounded-none w-[240px]"
              initialFocus
            />
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>

      {/* ── Error message ── */}
      {error && (
        <p
          id={errorId}
          role="alert"
          className={cn(
            "font-sans text-[11px] leading-[1.1] not-italic text-destructive w-full"
          )}
        >
          {error}
        </p>
      )}
    </div>
  );
}

DatePicker.displayName = "DatePicker";

export { DatePicker };
