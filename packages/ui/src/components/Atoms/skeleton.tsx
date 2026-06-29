import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * Shape of the placeholder. Sizing is owned by the consumer via `className`,
 * so each type only encodes its rounding + a sensible mobile-first default.
 */
export type SkeletonType = "text" | "block" | "circle";

// ─── Variants ─────────────────────────────────────────────────────────────────

const skeletonVariants = cva(
  cn("block bg-muted", "motion-safe:animate-pulse motion-reduce:animate-none"),
  {
    variants: {
      type: {
        text: "rounded-full h-4 w-full",
        block: "rounded-lg h-24 w-full max-w-40",
        circle: "rounded-full aspect-square size-12 shrink-0",
      },
    },
    defaultVariants: {
      type: "text",
    },
  }
);

// ─── Props ────────────────────────────────────────────────────────────────────

export interface SkeletonProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, "type">,
    VariantProps<typeof skeletonVariants> {
  /**
   * Visual shape of the placeholder.
   * - `text` — pill-shaped bar that fills its container width.
   * - `block` — rounded rectangle, fills container up to `max-w-40`.
   * - `circle` — square `aspect-square` circle, fixed `size-12`, `shrink-0`
   *   so it survives squish in flex layouts (avatars).
   * @default "text"
   */
  type?: SkeletonType;
  /**
   * When `true` (default), the skeleton pulses via Tailwind's
   * `motion-safe:animate-pulse`. Automatically disabled for users with
   * `prefers-reduced-motion`.
   * @default true
   */
  animated?: boolean;
  /**
   * Accessible label read by screen readers. Rendered as a visually-hidden
   * `<span>` inside a `role="status"` live region.
   * @default "Loading"
   */
  label?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

function Skeleton({
  className,
  type,
  animated = true,
  label = "Loading",
  ref,
  ...props
}: SkeletonProps & { ref?: React.Ref<HTMLSpanElement> }) {
  return (
    <span
      ref={ref}
      role="status"
      aria-busy="true"
      aria-live="polite"
      data-slot="skeleton"
      data-type={type ?? "text"}
      data-animated={animated}
      className={cn(
        skeletonVariants({ type }),
        !animated && "motion-safe:animate-none",
        className
      )}
      {...props}
    >
      <span className="sr-only">{label}</span>
    </span>
  );
}

Skeleton.displayName = "Skeleton";

export { Skeleton, skeletonVariants };
