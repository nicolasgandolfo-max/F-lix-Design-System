"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

// ─── Variants (Felix DS — Figma: Switch, node 562:3664) ──────────────────────

const switchVariants = cva(
  cn(
    "peer inline-flex shrink-0 items-center rounded-full",
    "transition-colors outline-none",
    "data-[state=unchecked]:bg-secondary data-[state=checked]:bg-primary",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "disabled:data-[state=unchecked]:bg-muted disabled:data-[state=checked]:bg-muted",
    "aria-invalid:ring-2 aria-invalid:ring-destructive/20"
  ),
  {
    variants: {
      size: {
        md: "h-6 w-11 p-0.75",
        sm: "h-5 w-9 p-0.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const switchThumbVariants = cva(
  cn(
    "pointer-events-none block rounded-full shadow-sm ring-0",
    "bg-background transition-transform",
    "data-[state=checked]:bg-primary-foreground"
  ),
  {
    variants: {
      size: {
        md: "size-4.5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        sm: "size-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ─── Props ───────────────────────────────────────────────────────────────────

export interface SwitchProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, "size">,
    VariantProps<typeof switchVariants> {}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Switch — a binary on/off toggle built on `@radix-ui/react-switch`.
 *
 * - States: off (unchecked), on (checked), disabled.
 * - Sizes: `md` (24×44, default) and `sm` (20×36) — Figma ships `md`, `sm` is
 *   added for consistency with the rest of the Felix DS controls.
 * - No built-in label — compose with the Felix `Label` atom via the `id` /
 *   `htmlFor` pair, e.g.
 *
 *   ```tsx
 *   <div className="flex items-center gap-2">
 *     <Switch id="notifications" />
 *     <Label htmlFor="notifications">Enable notifications</Label>
 *   </div>
 *   ```
 *
 * Sizing mirrors Figma node `562:3664` — `md` track 24×44 with a 3 px inset
 * around an 18 px thumb (`p-0.75` + `size-4.5`, using Tailwind's dynamic
 * spacing scale so no raw pixel values are used). `sm` scales down to a 20×36
 * track with a 2 px inset around a 16 px thumb.
 */
const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, size, ...props }, ref) => {
  const resolvedSize = size ?? "md";

  return (
    <SwitchPrimitive.Root
      ref={ref}
      data-slot="switch"
      data-size={resolvedSize}
      className={cn(switchVariants({ size: resolvedSize }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(switchThumbVariants({ size: resolvedSize }))}
      />
    </SwitchPrimitive.Root>
  );
});
Switch.displayName = "Switch";

export { Switch, switchVariants, switchThumbVariants };
