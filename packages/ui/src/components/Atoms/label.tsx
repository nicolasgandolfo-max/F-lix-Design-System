"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

// ─── Variants (Felix DS — Figma: Label · body-sm, Saans) ─────────────────────

const labelVariants = cva(
  cn(
    "inline-flex flex-wrap items-baseline gap-0 font-sans text-sm leading-[1.5] tracking-normal",
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
  ),
  {
    variants: {
      variant: {
        default: "text-foreground",
        required: "text-foreground",
        optional: "text-foreground",
        disabled: "cursor-not-allowed text-foreground opacity-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// ─── Props ───────────────────────────────────────────────────────────────────

export interface LabelProps
  extends
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Form label aligned with shadcn (`@radix-ui/react-label`) and Felix typography.
 *
 * - **default** — foreground body-sm text.
 * - **required** — appends a destructive asterisk (pair with `aria-required` on the control).
 * - **optional** — appends muted “(optional)”.
 * - **disabled** — dims the whole label (use when the associated field is disabled, or for static demos).
 */
const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, variant = "default", children, ...props }, ref) => {
  return (
    <LabelPrimitive.Root
      ref={ref}
      data-slot="label"
      data-variant={variant}
      className={cn(labelVariants({ variant }), className)}
      {...props}
    >
      {variant === "required" ? (
        <>
          {children}
          <span
            className="ml-1 font-semibold text-destructive"
            aria-hidden="true"
          >
            *
          </span>
        </>
      ) : variant === "optional" ? (
        <>
          {children}
          <span className="ml-1 font-normal text-muted-foreground">
            (optional)
          </span>
        </>
      ) : (
        children
      )}
    </LabelPrimitive.Root>
  );
});
Label.displayName = LabelPrimitive.Root.displayName;

export { Label, labelVariants };
