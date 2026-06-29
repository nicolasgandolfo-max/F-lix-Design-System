"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

// ─── Size context ────────────────────────────────────────────────────────────

type RadioGroupSize = "md" | "sm";

const RadioGroupSizeContext = React.createContext<RadioGroupSize>("md");

// ─── Variants (Felix DS — Figma: Radio, node 562:3656) ───────────────────────

const radioGroupItemVariants = cva(
  cn(
    "peer inline-flex shrink-0 items-center justify-center rounded-full",
    "border-[length:var(--border-width-medium)] border-solid border-border",
    "bg-background text-primary-foreground",
    "transition-colors outline-none",
    "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
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

const radioGroupIndicatorDotSize: Record<RadioGroupSize, string> = {
  md: "size-2",
  sm: "size-1.5",
};

// ─── Props ───────────────────────────────────────────────────────────────────

export interface RadioGroupProps extends Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
  "size"
> {
  /**
   * Applied to every `RadioGroupItem` inside unless the item overrides it
   * explicitly. Defaults to `"md"` (20 px).
   */
  size?: RadioGroupSize;
}

export interface RadioGroupItemProps
  extends
    Omit<
      React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
      "size"
    >,
    VariantProps<typeof radioGroupItemVariants> {}

// ─── Components ──────────────────────────────────────────────────────────────

/**
 * RadioGroup — single-selection wrapper built on `@radix-ui/react-radio-group`.
 *
 * Handles roving focus (arrow keys cycle selection, `Tab` enters/exits the
 * group) and native form submission. Pair with `RadioGroupItem` and the Felix
 * `Label` atom:
 *
 * ```tsx
 * <RadioGroup defaultValue="email" aria-label="Notification channel">
 *   <div className="flex items-center gap-2">
 *     <RadioGroupItem id="r-email" value="email" />
 *     <Label htmlFor="r-email">Email</Label>
 *   </div>
 *   <div className="flex items-center gap-2">
 *     <RadioGroupItem id="r-sms" value="sms" />
 *     <Label htmlFor="r-sms">SMS</Label>
 *   </div>
 * </RadioGroup>
 * ```
 *
 * The optional `size` prop sets the default visual size for every item in the
 * group; individual items can still override it.
 */
const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, size = "md", ...props }, ref) => {
  return (
    <RadioGroupSizeContext.Provider value={size}>
      <RadioGroupPrimitive.Root
        ref={ref}
        data-slot="radio-group"
        data-size={size}
        className={cn("flex flex-col gap-3", className)}
        {...props}
      />
    </RadioGroupSizeContext.Provider>
  );
});
RadioGroup.displayName = "RadioGroup";

/**
 * RadioGroupItem — a single radio button with an inner dot indicator. Must be
 * rendered inside a `RadioGroup`. Reads its default `size` from the group;
 * pass `size` explicitly to override.
 */
const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, size, ...props }, ref) => {
  const contextSize = React.useContext(RadioGroupSizeContext);
  const resolvedSize: RadioGroupSize = size ?? contextSize;
  const dotSize = radioGroupIndicatorDotSize[resolvedSize];

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      data-slot="radio-group-item"
      data-size={resolvedSize}
      className={cn(radioGroupItemVariants({ size: resolvedSize }), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className={cn("flex items-center justify-center")}
      >
        <span aria-hidden className={cn("rounded-full bg-current", dotSize)} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem, radioGroupItemVariants };
