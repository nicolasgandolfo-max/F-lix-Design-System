"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

// ─── Variants (Felix DS — Figma: Progress, node 562:3695) ────────────────────

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-muted",
  {
    variants: {
      size: {
        xs: "h-1",
        sm: "h-2",
        md: "h-3.5",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
);

const progressIndicatorVariants = cva(
  "h-full w-full flex-1 rounded-full transition-transform",
  {
    variants: {
      color: {
        primary: "bg-primary",
        secondary: "bg-foreground",
        lime: "bg-accent",
        danger: "bg-destructive",
        violet: "bg-chart-4",
      },
    },
    defaultVariants: {
      color: "primary",
    },
  }
);

// ─── Props ───────────────────────────────────────────────────────────────────

export interface ProgressProps
  extends
    Omit<
      React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
      "color"
    >,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof progressIndicatorVariants> {}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Progress — a horizontal progress bar built on `@radix-ui/react-progress`.
 *
 * - **Sizes** — `xs` (4 px, ideal for top-of-screen steppers), `sm` (8 px,
 *   default) and `md` (14 px).
 * - **Colors** — `primary` (turquoise, default), `secondary` (foreground slate),
 *   `lime`, `danger`, `violet`. Track always uses `bg-muted`; only the indicator
 *   fill changes colour.
 * - **Value** — pass `value` from 0 to `max` (defaults to 100). Pass
 *   `value={null}` for an indeterminate state.
 *
 * ```tsx
 * <Progress value={60} aria-label="Upload progress" />
 * <Progress value={40} size="md" color="danger" />
 * ```
 *
 * Accessibility: Radix renders `role="progressbar"` plus
 * `aria-valuenow` / `aria-valuemin` / `aria-valuemax`. Always pair with a
 * visible label or `aria-label` / `aria-labelledby`.
 */
const Progress = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, size, color, value, max, ...props }, ref) => {
  const resolvedSize = size ?? "sm";
  const resolvedColor = color ?? "primary";
  const resolvedMax = max ?? 100;
  const clamped =
    typeof value === "number"
      ? Math.min(Math.max(value, 0), resolvedMax)
      : null;
  const translate =
    clamped === null ? 100 : 100 - (clamped / resolvedMax) * 100;

  return (
    <ProgressPrimitive.Root
      ref={ref}
      data-slot="progress"
      data-size={resolvedSize}
      data-color={resolvedColor}
      value={clamped}
      max={max}
      className={cn(progressVariants({ size: resolvedSize }), className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(progressIndicatorVariants({ color: resolvedColor }))}
        style={{ transform: `translateX(-${translate}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = "Progress";

export { Progress, progressVariants, progressIndicatorVariants };
