import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

// ─── Variants ─────────────────────────────────────────────────────────────────

const badgeVariants = cva(
  cn(
    "inline-flex items-center gap-1 max-w-full min-w-0",
    "font-regular transition-colors",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:shrink-0 [&_svg]:shrink-0"
  ),
  {
    variants: {
      size: {
        sm: cn(
          "py-0.5 px-1",
          "text-xxs leading-display tracking-normal",
          "[&_svg:not([class*='size-'])]:size-2"
        ),
        md: cn(
          "py-0.5 px-2",
          "text-xs leading-tight tracking-caption",
          "min-h-[1.125rem]",
          "[&_svg:not([class*='size-'])]:size-2"
        ),
        lg: cn(
          "py-1 px-3",
          "text-sm leading-normal tracking-normal",
          "[&_svg:not([class*='size-'])]:size-3"
        ),
      },
      variant: {
        /** Primary brand colour — turquoise pill. */
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        /** Accent lime — for neutral highlights. */
        secondary: "bg-accent text-accent-foreground hover:bg-accent/80",
        /** Subtle orange background with destructive text for warnings/errors. */
        destructive:
          "bg-(--orange-100) text-destructive dark:bg-(--orange-200)",
        /** Transparent with a border — lowest visual weight. */
        outline: "border border-(--border) bg-transparent text-foreground",
        /** Muted stone background — secondary-level labels. */
        ghost: "bg-muted text-foreground hover:bg-muted/80",
        /** Transparent with primary (turquoise) text — inline link-style tag. */
        link: "bg-background text-primary",
        dark: "bg-foreground text-background hover:bg-foreground/85",
      },
      shape: {
        /** Pill — fully rounded (default). */
        badge: "rounded-full",
        /** Chip — slightly rounded square. */
        chip: "rounded-sm",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
      shape: "badge",
    },
  }
);

// ─── Props ────────────────────────────────────────────────────────────────────

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * Visual style of the badge.
   * @default "default"
   */
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link"
    | "dark";
  /**
   * Vertical scale — padding, type size, and default icon size.
   * - `sm` — 11 px text, 8 px icons (Figma SM)
   * - `md` — 12 px text, 8 px icons (Figma MD, default)
   * - `lg` — 14 px text, 12 px icons (Figma LG)
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * Shape of the badge container.
   * - `badge` — fully rounded pill (default)
   * - `chip` — slightly rounded square
   * @default "badge"
   */
  shape?: "badge" | "chip";
  /** Optional icon rendered before the label. */
  iconLeft?: React.ReactNode;
  /** Optional icon rendered after the label. */
  iconRight?: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

function Badge({
  className,
  variant,
  size,
  shape,
  iconLeft,
  iconRight,
  children,
  ref,
  ...props
}: BadgeProps & { ref?: React.Ref<HTMLSpanElement> }) {
  // Only render the label wrapper when there is actual content. An empty
  // `<span>` still inherits the parent's `line-height` via flex item
  // alignment (~15 px from `text-xs leading-tight`), which makes
  // icon-only pills (e.g. the thumbs-up tag in Figma node 682-15286)
  // taller than intended. Skipping the wrapper lets the badge collapse
  // to icon size + padding ≈ 18 px, matching the spec.
  const hasLabel =
    children !== undefined &&
    children !== null &&
    children !== false &&
    children !== "";
  return (
    <span
      ref={ref}
      data-slot="badge"
      data-variant={variant}
      data-size={size}
      data-shape={shape}
      className={cn(badgeVariants({ variant, size, shape }), className)}
      {...props}
    >
      {iconLeft}
      {hasLabel && <span className="truncate">{children}</span>}
      {iconRight}
    </span>
  );
}

Badge.displayName = "Badge";

export { Badge, badgeVariants };
