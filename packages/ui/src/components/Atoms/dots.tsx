import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";
import type { LoaderSize } from "./spinner";

// ─── Variants ─────────────────────────────────────────────────────────────────

const dotsVariants = cva("inline-flex items-center", {
  variants: {
    size: {
      sm: "gap-[calc(var(--spacing)*0.75)]",
      md: "gap-1",
      lg: "gap-1.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const dotVariants = cva(
  cn(
    "rounded-full bg-primary",
    "motion-safe:animate-dots-pulse motion-reduce:animate-none"
  ),
  {
    variants: {
      size: {
        sm: "size-1",
        md: "size-1.5",
        lg: "size-2.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ─── Props ────────────────────────────────────────────────────────────────────

export interface DotsProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof dotsVariants> {
  /**
   * Pixel scale of each dot.
   * - `sm` — 4 px dots, 3 px gap (total 4 × 18 px)
   * - `md` — 6 px dots, 4 px gap (total 6 × 26 px) — default
   * - `lg` — 10 px dots, 6 px gap (total 10 × 42 px)
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

const DOT_DELAYS_MS = [0, 160, 320] as const;

function Dots({
  className,
  size,
  label = "Loading",
  ref,
  ...props
}: DotsProps & { ref?: React.Ref<HTMLSpanElement> }) {
  return (
    <span
      ref={ref}
      role="status"
      aria-live="polite"
      data-slot="dots"
      data-size={size ?? "md"}
      className={cn(dotsVariants({ size }), className)}
      {...props}
    >
      {DOT_DELAYS_MS.map((delay, idx) => (
        <span
          key={idx}
          aria-hidden="true"
          data-slot="dots-dot"
          className={cn(dotVariants({ size }))}
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
}

Dots.displayName = "Dots";

export { Dots, dotsVariants, dotVariants };
