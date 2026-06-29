"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

// ─── Variants (Felix DS — Figma: Checkbox, node 562:3647) ────────────────────

const checkboxVariants = cva(
  cn(
    "group peer inline-flex shrink-0 items-center justify-center rounded-sm",
    "border-[length:var(--border-width-medium)] border-solid border-border",
    "bg-background text-primary-foreground",
    "transition-colors outline-none",
    "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
    "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:border-muted disabled:bg-muted disabled:opacity-50",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20"
  ),
  {
    variants: {
      size: {
        md: "size-5",
        sm: "size-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const checkboxIndicatorIconSize: Record<
  NonNullable<VariantProps<typeof checkboxVariants>["size"]>,
  string
> = {
  md: "size-3.5",
  sm: "size-2.5",
};

// ─── Props ───────────────────────────────────────────────────────────────────

export interface CheckboxProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "size">,
    VariantProps<typeof checkboxVariants> {}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Checkbox — a single boolean (or tri-state) control built on
 * `@radix-ui/react-checkbox`.
 *
 * - States: unchecked, checked, indeterminate, disabled.
 * - Sizes: `md` (20 px, default) and `sm` (16 px).
 * - No built-in label — compose with the Felix `Label` atom via the `id` /
 *   `htmlFor` pair, e.g.
 *
 *   ```tsx
 *   <div className="flex items-center gap-2">
 *     <Checkbox id="terms" />
 *     <Label htmlFor="terms">I agree to the terms</Label>
 *   </div>
 *   ```
 *
 * For the indeterminate state pass `checked="indeterminate"`. Radix will
 * toggle back to `true` on the next user interaction; if you want to
 * control that lifecycle fully, drive `checked` externally via React state.
 */
const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, size, ...props }, ref) => {
  const resolvedSize = size ?? "md";
  const iconSize = checkboxIndicatorIconSize[resolvedSize];

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      data-slot="checkbox"
      data-size={resolvedSize}
      className={cn(checkboxVariants({ size: resolvedSize }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={cn("flex items-center justify-center text-current")}
      >
        <Check
          weight="bold"
          aria-hidden
          className={cn(iconSize, "group-data-[state=indeterminate]:hidden")}
        />
        <Minus
          weight="bold"
          aria-hidden
          className={cn(iconSize, "group-data-[state=checked]:hidden")}
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = "Checkbox";

export { Checkbox, checkboxVariants };
