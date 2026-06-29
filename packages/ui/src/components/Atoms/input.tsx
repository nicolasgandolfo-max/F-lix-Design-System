"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ─── Variants ─────────────────────────────────────────────────────────────────

const inputBoxVariants = cva(
  cn(
    "relative flex w-full items-center justify-between border border-solid bg-background",
    "transition-colors",
    // Focus ring on the wrapper (driven by :focus-within)
    "focus-within:border-primary",
    // Disabled
    "has-[:disabled]:bg-muted has-[:disabled]:border-border has-[:disabled]:opacity-50 has-[:disabled]:cursor-not-allowed"
  ),
  {
    variants: {
      size: {
        md: "h-10 rounded-md px-3 py-1",
        sm: "h-8 rounded-sm px-3 py-2",
      },
      hasError: {
        true: "border-destructive focus-within:border-destructive",
        false: "border-border",
      },
    },
    defaultVariants: {
      size: "md",
      hasError: false,
    },
  }
);

const labelVariants = cva(
  cn(
    // Base: sits inside the input as a placeholder-style label
    "pointer-events-none absolute select-none font-sans not-italic",
    "transition-all duration-150",
    // Default state — positioned like a placeholder
    "top-1/2 -translate-y-1/2 text-xs leading-tight tracking-caption text-secondary",
    // Floating state — triggered by focus-within on parent OR peer input not showing placeholder
    "peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xxs peer-focus:leading-display peer-focus:tracking-normal peer-focus:text-primary",
    "peer-focus:bg-background peer-focus:px-1",
    // Filled state (value present, no focus)
    "peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:-translate-y-1/2",
    "peer-[&:not(:placeholder-shown)]:text-xxs peer-[&:not(:placeholder-shown)]:leading-display peer-[&:not(:placeholder-shown)]:tracking-normal",
    "peer-[&:not(:placeholder-shown)]:text-secondary peer-[&:not(:placeholder-shown)]:bg-background peer-[&:not(:placeholder-shown)]:px-1",
    // Filled + focused: override back to primary (higher specificity via combined selector)
    "peer-[&:not(:placeholder-shown):focus]:text-primary"
  ),
  {
    variants: {
      hasError: {
        true: cn(
          // Override label color to destructive in all floating states
          "peer-focus:text-destructive",
          "peer-[&:not(:placeholder-shown)]:text-destructive",
          // Filled + focused: override the higher-specificity primary selector
          "peer-[&:not(:placeholder-shown):focus]:text-destructive",
          // Also in default (unfloated) state when error
          "text-destructive"
        ),
        false: "",
      },
      hasLeftIcon: {
        // With a leading icon, the label sits past the icon in its
        // placeholder position (36px = px-3 + icon-16 + mr-2), but snaps
        // back to `left-3` once it floats (focused or filled) so the
        // notch lands at the top-left corner of the box, matching Figma.
        true: cn(
          "left-9",
          "peer-focus:left-3",
          "peer-[&:not(:placeholder-shown)]:left-3"
        ),
        false: "left-3",
      },
    },
    defaultVariants: {
      hasError: false,
      hasLeftIcon: false,
    },
  }
);

// ─── Props ────────────────────────────────────────────────────────────────────

export interface InputProps extends Omit<
  React.ComponentProps<"input">,
  "size"
> {
  /** Floating label text — always visible, moves to the top border on focus/fill. */
  label: string;
  /** Helper text shown below the input. Hidden when `error` is set. */
  description?: string;
  /** Error message. When present, triggers error styling and replaces description. */
  error?: string;
  /** Size variant matching Figma spec. */
  size?: "md" | "sm";
  /** Trailing icon node (e.g. a Phosphor icon). Omit to render no icon. */
  icon?: React.ReactNode;
  /** Leading icon node (e.g. a Phosphor icon). Omit to render no leading icon. */
  leftIcon?: React.ReactNode;
  /** Wrapper div className. */
  wrapperClassName?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      description,
      error,
      size = "md",
      icon,
      leftIcon,
      id: idProp,
      className,
      wrapperClassName,
      disabled,
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(error);
    const hasLeftIcon = Boolean(leftIcon);

    // Stable ID for label ↔ input association
    const generatedId = React.useId();
    const id = idProp ?? `input-${generatedId}`;
    const descriptionId = `${id}-description`;

    return (
      <div
        className={cn(
          "flex flex-col gap-1 items-start w-full",
          wrapperClassName
        )}
        data-slot="input-field"
      >
        {/* ── Box ── */}
        <div
          className={cn(inputBoxVariants({ size, hasError }))}
          data-name="Input"
        >
          {/* ── Leading icon ── */}
          {leftIcon && (
            <div
              data-slot="input-left-icon"
              className="relative shrink-0 mr-2 text-secondary"
            >
              {leftIcon}
            </div>
          )}

          {/*
           * The <input> is the peer. It must come BEFORE the <label> in DOM order
           * so that CSS peer selectors work correctly.
           *
           * placeholder=" " (a single space) enables the :not(:placeholder-shown)
           * selector to detect whether the field has a value — pure CSS, no JS.
           */}
          <input
            ref={ref}
            id={id}
            data-slot="input"
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={description || error ? descriptionId : undefined}
            placeholder=" "
            className={cn(
              "peer flex-1 bg-transparent outline-none min-w-0",
              "font-sans text-xs leading-tight text-foreground",
              "placeholder:text-foreground/60",
              "disabled:pointer-events-none disabled:cursor-not-allowed",
              size === "sm" ? "pt-0.5" : "pt-1.5",
              className
            )}
            {...props}
          />

          {/* ── Floating label ── */}
          <label
            htmlFor={id}
            className={cn(labelVariants({ hasError, hasLeftIcon }))}
          >
            {label}
          </label>

          {/* ── Trailing icon ── */}
          {icon && (
            <div
              data-slot="input-right-icon"
              className="relative shrink-0 ml-2 text-secondary"
            >
              {icon}
            </div>
          )}
        </div>

        {/* ── Description / Error ── */}
        {(description || error) && (
          <p
            id={descriptionId}
            className={cn(
              "font-sans text-xxs leading-display not-italic w-full",
              hasError ? "text-destructive" : "text-secondary"
            )}
          >
            {error ?? description}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputBoxVariants };
