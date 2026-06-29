"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

// ─── Variants ─────────────────────────────────────────────────────────────────

const iconButtonVariants = cva(
  cn(
    "inline-flex items-center justify-center shrink-0 rounded-full",
    "transition-all disabled:pointer-events-none",
    "outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0"
  ),
  {
    variants: {
      variant: {
        primary: cn(
          "bg-interactive-primary-active text-primary-foreground",
          "hover:bg-interactive-primary-hover",
          "disabled:bg-interactive-primary-disabled disabled:text-muted-foreground"
        ),
        secondary: cn(
          "bg-interactive-secondary-active text-foreground",
          "hover:bg-interactive-secondary-hover",
          "disabled:bg-interactive-secondary-disabled disabled:text-interactive-secondary-active"
        ),
        ghost: cn(
          "text-foreground",
          "hover:bg-interactive-ghost-active",
          "disabled:border disabled:border-interactive-ghost-disabled disabled:text-interactive-secondary-active"
        ),
        danger: cn(
          "bg-interactive-danger-active text-(--orange-900)",
          "hover:bg-interactive-danger-hover",
          "disabled:bg-interactive-danger-disabled disabled:text-muted"
        ),
        line: cn(
          "border border-(--border-width-medium) border-foreground bg-transparent text-foreground",
          "hover:bg-interactive-ghost-hover",
          "disabled:border-interactive-secondary-active disabled:text-interactive-secondary-active"
        ),
      },
      size: {
        sm: "size-8 [&_svg:not([class*='size-'])]:size-[14px]",
        md: "size-10 [&_svg:not([class*='size-'])]:size-[18px]",
        lg: "size-12 [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// ─── Props ────────────────────────────────────────────────────────────────────

export interface IconButtonProps
  extends
    React.ComponentProps<"button">,
    VariantProps<typeof iconButtonVariants> {
  /** Icon to render (e.g. a Phosphor icon). */
  icon: React.ReactNode;
  /** Accessible label — required since there is no visible text. */
  "aria-label": string;
  /** Merges props onto the child element (e.g. `<a>` or Next.js `<Link>`) via `@radix-ui/react-slot`. */
  asChild?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant,
      size,
      asChild = false,
      disabled,
      className,
      "aria-label": ariaLabel,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    /**
     * When `asChild` is true, Radix Slot renders the child element (e.g. `<a>`)
     * with the button props merged in. We clone the child to nest the icon inside
     * it so the final DOM looks like `<a ...props>{icon}</a>`.
     */
    const content =
      asChild && React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement, {}, icon)
        : icon;

    return (
      <Comp
        ref={ref}
        data-slot="icon-button"
        data-variant={variant}
        data-size={size}
        disabled={disabled}
        aria-label={ariaLabel}
        className={cn(iconButtonVariants({ variant, size }), className)}
        {...props}
      >
        {content}
      </Comp>
    );
  }
);

IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
