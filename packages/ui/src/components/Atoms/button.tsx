"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-full",
    "font-medium transition-all",
    "disabled:pointer-events-none",
    "[&_svg]:shrink-0 shrink-0",
    "outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
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
        sm: "gap-1 px-2 py-1 text-sm [&_svg:not([class*='size-'])]:size-[14px]",
        md: "gap-2 px-4 py-2 text-base [&_svg:not([class*='size-'])]:size-[18px]",
        lg: "gap-2 px-5 py-3 text-md [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  /** Merges props onto the child element (e.g. `<a>` or Next.js `<Link>`) via `@radix-ui/react-slot`. */
  asChild?: boolean;
  /** Stretches the button to fill its container width — useful for mobile CTAs. */
  fullWidth?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  fullWidth = false,
  disabled,
  children,
  ref,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      disabled={disabled}
      className={cn(
        buttonVariants({ variant, size }),
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

Button.displayName = "Button";

export { Button, buttonVariants };
