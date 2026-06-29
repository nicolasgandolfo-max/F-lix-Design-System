import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * Size scale shared across the loader family (`Spinner`, `Dots`, `CoinLoader`).
 */
export type LoaderSize = "sm" | "md" | "lg";

// ─── Variants ─────────────────────────────────────────────────────────────────

const spinnerVariants = cva(
  cn(
    "inline-block shrink-0 align-middle",
    "motion-safe:animate-spin motion-reduce:animate-none"
  ),
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-6",
        lg: "size-10",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ─── Props ────────────────────────────────────────────────────────────────────

export interface SpinnerProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants> {
  /**
   * Pixel scale of the spinner.
   * - `sm` — 16 px (`size-4`)
   * - `md` — 24 px (`size-6`) — default
   * - `lg` — 40 px (`size-10`)
   * @default "md"
   */
  size?: LoaderSize;
  /**
   * Accessible label read by screen readers. Rendered as a visually-hidden
   * `<span>` inside a `role="status"` live region.
   * @default "Loading"
   */
  label?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

function Spinner({
  className,
  size,
  label = "Loading",
  ref,
  ...props
}: SpinnerProps & { ref?: React.Ref<HTMLSpanElement> }) {
  return (
    <span
      ref={ref}
      role="status"
      aria-live="polite"
      data-slot="spinner"
      data-size={size ?? "md"}
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <span aria-hidden="true" className={cn(spinnerVariants({ size }))}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-full"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            pathLength="100"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-muted"
          />
          <circle
            cx="12"
            cy="12"
            r="10"
            pathLength="100"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="70 30"
            className="text-foreground"
          />
        </svg>
      </span>
      <span className="sr-only">{label}</span>
    </span>
  );
}

Spinner.displayName = "Spinner";

export { Spinner, spinnerVariants };
