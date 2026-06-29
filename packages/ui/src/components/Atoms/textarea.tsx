"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ─── Variants ─────────────────────────────────────────────────────────────────

const textareaBoxVariants = cva(
  cn(
    "relative flex w-full border border-solid bg-background",
    "rounded-md px-3 py-3 min-h-24",
    "transition-colors",
    // Focus ring driven by :focus-within on the wrapper
    "focus-within:border-primary",
    // Disabled
    "has-disabled:bg-muted has-disabled:border-border",
    "has-disabled:opacity-50 has-disabled:cursor-not-allowed"
  ),
  {
    variants: {
      hasError: {
        true: "border-destructive focus-within:border-destructive",
        false: "border-border",
      },
    },
    defaultVariants: { hasError: false },
  }
);

const textareaLabelVariants = cva(
  cn(
    // Base: sits at the top of the textarea matching the top padding
    "pointer-events-none absolute left-3 select-none font-sans not-italic",
    "transition-all duration-150",
    // Default state — positioned at top of textarea (not centered, it's a tall field)
    "top-3 text-[12px] leading-[1.2] tracking-[0.0025em] text-secondary",
    // Floating state — label lifts to sit on the top border
    "peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-[11px] peer-focus:leading-[1.1] peer-focus:tracking-normal peer-focus:text-primary",
    "peer-focus:bg-background peer-focus:px-1",
    // Filled state (value present, no focus)
    "peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:-translate-y-1/2",
    "peer-[&:not(:placeholder-shown)]:text-[11px] peer-[&:not(:placeholder-shown)]:leading-[1.1] peer-[&:not(:placeholder-shown)]:tracking-normal",
    "peer-[&:not(:placeholder-shown)]:text-secondary peer-[&:not(:placeholder-shown)]:bg-background peer-[&:not(:placeholder-shown)]:px-1",
    // Filled + focused: override back to primary
    "peer-[&:not(:placeholder-shown):focus]:text-primary"
  ),
  {
    variants: {
      hasError: {
        true: cn(
          "peer-focus:text-destructive",
          "peer-[&:not(:placeholder-shown)]:text-destructive",
          "peer-[&:not(:placeholder-shown):focus]:text-destructive",
          "text-destructive"
        ),
        false: "",
      },
    },
    defaultVariants: { hasError: false },
  }
);

// ─── Props ────────────────────────────────────────────────────────────────────

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  /** Floating label text — always visible, moves to the top border on focus/fill. */
  label: string;
  /** Helper text shown below the textarea. Hidden when `error` is set. */
  description?: string;
  /** Error message. When present, triggers error styling and replaces description. */
  error?: string;
  /** Wrapper div className. */
  wrapperClassName?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      description,
      error,
      id: idProp,
      className,
      wrapperClassName,
      disabled,
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(error);

    // Stable ID for label ↔ textarea association
    const generatedId = React.useId();
    const id = idProp ?? `textarea-${generatedId}`;
    const descriptionId = `${id}-description`;

    return (
      <div
        className={cn(
          "flex flex-col gap-[4px] items-start w-full",
          wrapperClassName
        )}
        data-slot="textarea-field"
      >
        {/* ── Box ── */}
        <div
          className={cn(textareaBoxVariants({ hasError }))}
          data-name="Textarea"
        >
          {/*
           * The <textarea> is the peer. It must come BEFORE the <label> in DOM
           * order so CSS peer selectors work correctly.
           *
           * placeholder=" " (a single space) enables the :not(:placeholder-shown)
           * selector to detect whether the field has a value — pure CSS, no JS.
           *
           * resize-none matches the Figma spec — fixed height, no browser resize handle.
           */}
          <textarea
            ref={ref}
            id={id}
            data-slot="textarea"
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={description || error ? descriptionId : undefined}
            placeholder=" "
            className={cn(
              "peer w-full bg-transparent outline-none resize-none",
              "font-sans text-[12px] leading-[1.2] text-foreground",
              "placeholder:text-foreground/60",
              "disabled:pointer-events-none disabled:cursor-not-allowed",
              // Nudge text down so it clears the floating label when it lifts
              "pt-2",
              className
            )}
            {...props}
          />

          {/* ── Floating label ── */}
          <label
            htmlFor={id}
            className={cn(textareaLabelVariants({ hasError }))}
          >
            {label}
          </label>
        </div>

        {/* ── Description / Error ── */}
        {(description || error) && (
          <p
            id={descriptionId}
            className={cn(
              "font-sans text-[11px] leading-[1.1] not-italic w-full",
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

Textarea.displayName = "Textarea";

export { Textarea, textareaBoxVariants };
