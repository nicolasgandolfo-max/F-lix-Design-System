"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { User } from "@phosphor-icons/react";

import { cn } from "../../lib/utils";

// ─── Variants (Felix DS — Figma: Avatar, node 346:201) ───────────────────────

const avatarVariants = cva(
  "relative inline-flex shrink-0 overflow-visible items-center justify-center rounded-full",
  {
    variants: {
      size: {
        xs: "size-6",
        sm: "size-8",
        md: "size-10",
        lg: "size-12",
        xl: "size-16",
      },
    },
    defaultVariants: { size: "md" },
  }
);

const avatarFallbackVariants = cva(
  "flex h-full w-full items-center justify-center rounded-full",
  {
    variants: {
      variant: {
        initials: "bg-primary text-primary-foreground",
        icon: "bg-secondary text-foreground",
      },
      size: {
        xs: "text-xxs",
        sm: "text-xxs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-2xl font-medium",
      },
    },
    // Icon SVGs are sized to roughly match Figma's ~55% of avatar diameter
    // (e.g. XL avatar 64 px / icon 36 px). Only applied for variant="icon"
    // so initials stay driven by font size.
    compoundVariants: [
      { variant: "icon", size: "xs", className: "[&_svg]:size-3.5" },
      { variant: "icon", size: "sm", className: "[&_svg]:size-5" },
      { variant: "icon", size: "md", className: "[&_svg]:size-6" },
      { variant: "icon", size: "lg", className: "[&_svg]:size-7" },
      { variant: "icon", size: "xl", className: "[&_svg]:size-9" },
    ],
    defaultVariants: {
      variant: "initials",
      size: "md",
    },
  }
);

const avatarStatusVariants = cva(
  cn("absolute right-0 bottom-0 block rounded-full", "ring-background"),
  {
    variants: {
      size: {
        xs: "size-1.5 ring-1",
        sm: "size-2 ring-1",
        md: "size-2.5 ring-1",
        lg: "size-3 ring-2",
        xl: "size-4 ring-2",
      },
      status: {
        success: "bg-(--green-500)",
        warning: "bg-(--yellow-300)",
        danger: "bg-destructive",
        neutral: "bg-(--blueberry-500)",
      },
    },
    defaultVariants: {
      size: "md",
      status: "success",
    },
  }
);

// ─── Types ───────────────────────────────────────────────────────────────────

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarStatus = "success" | "warning" | "danger" | "neutral";

export interface AvatarProps
  extends
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  /**
   * Photo URL. When provided, the image is rendered and Radix automatically
   * falls back to the initials/icon if it fails to load.
   */
  src?: string;
  /**
   * Accessible alt text for the photo. Required when `src` is provided.
   */
  alt?: string;
  /**
   * Initials displayed when no photo is available (or while it loads). Pass
   * an empty/undefined value to skip initials and fall through to the icon.
   */
  initials?: string;
  /**
   * Custom icon used as the final fallback when neither photo nor initials
   * are available. Defaults to a Phosphor `User` icon.
   */
  icon?: React.ReactNode;
  /**
   * Optional status badge rendered in the bottom-right corner. When omitted,
   * no badge is shown.
   *
   * - `success` — green (online / available)
   * - `warning` — yellow (away / idle)
   * - `danger`  — orange (do not disturb / busy)
   * - `neutral` — blueberry (offline / unknown)
   */
  status?: AvatarStatus;
  /**
   * Custom accessible label for the status badge. Defaults to the value of
   * `status` (e.g. "success"). Use this to surface a more meaningful name
   * such as `"Online"` or `"Away"`.
   */
  statusLabel?: string;
}

export interface AvatarImageProps extends React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Image
> {}

export interface AvatarFallbackProps
  extends
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>,
    VariantProps<typeof avatarFallbackVariants> {}

// ─── Size Context ────────────────────────────────────────────────────────────

const AvatarSizeContext = React.createContext<AvatarSize>("md");

// ─── Components ──────────────────────────────────────────────────────────────

/**
 * Avatar — a circular user portrait with a graceful fallback chain:
 * **Photo → Initials → Icon**.
 *
 * Two API shapes are supported:
 *
 * 1. **Smart (default, recommended)** — pass `src`, `initials`, and/or `icon`
 *    as props. Radix automatically falls back through the chain if the image
 *    fails to load (or no `src` is provided), and a Phosphor `User` icon is
 *    used as the ultimate fallback when no `initials` are passed.
 *
 *    ```tsx
 *    <Avatar src="/jane.jpg" alt="Jane Doe" initials="JD" status="success" />
 *    <Avatar initials="JD" />
 *    <Avatar /> // → User icon
 *    ```
 *
 * 2. **Compound (escape hatch)** — pass `<AvatarImage>` and `<AvatarFallback>`
 *    as children for custom layouts.
 *
 *    ```tsx
 *    <Avatar size="lg">
 *      <AvatarImage src="/jane.jpg" alt="Jane" />
 *      <AvatarFallback>JD</AvatarFallback>
 *    </Avatar>
 *    ```
 *
 * - **Sizes** — `xs` (24), `sm` (32), `md` (40, default), `lg` (48), `xl` (64).
 * - **Status badge** — optional `status` prop renders a coloured dot in the
 *   bottom-right corner with a token-bound colour and a `ring-background`
 *   ring so it pops against any background.
 *
 * Accessibility: always pass a meaningful `alt` when using `src`. The status
 * badge gets `role="status"` plus an `aria-label` (defaults to the status
 * value, override with `statusLabel`).
 */
const Avatar = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(
  (
    {
      className,
      size,
      status,
      statusLabel,
      src,
      alt,
      initials,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const resolvedSize = size ?? "md";

    // Smart mode: build the fallback chain from props when no children are
    // supplied. Compound mode (children present) is rendered as-is.
    const content = children ?? (
      <>
        {src ? <AvatarImage src={src} alt={alt ?? ""} /> : null}
        {initials ? (
          <AvatarFallback>{initials}</AvatarFallback>
        ) : (
          <AvatarFallback variant="icon">
            {icon ?? <User weight="fill" aria-hidden="true" />}
          </AvatarFallback>
        )}
      </>
    );

    return (
      <AvatarSizeContext.Provider value={resolvedSize}>
        <AvatarPrimitive.Root
          ref={ref}
          data-slot="avatar"
          data-size={resolvedSize}
          className={cn(avatarVariants({ size: resolvedSize }), className)}
          {...props}
        >
          {content}
          {status ? (
            <span
              data-slot="avatar-status"
              data-status={status}
              role="status"
              aria-label={statusLabel ?? status}
              className={cn(
                avatarStatusVariants({ size: resolvedSize, status })
              )}
            />
          ) : null}
        </AvatarPrimitive.Root>
      </AvatarSizeContext.Provider>
    );
  }
);
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    data-slot="avatar-image"
    className={cn(
      "aspect-square h-full w-full rounded-full object-cover",
      className
    )}
    {...props}
  />
));
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, variant, size, ...props }, ref) => {
  const contextSize = React.useContext(AvatarSizeContext);
  const resolvedSize = size ?? contextSize;
  const resolvedVariant = variant ?? "initials";

  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      data-slot="avatar-fallback"
      data-variant={resolvedVariant}
      data-size={resolvedSize}
      className={cn(
        avatarFallbackVariants({
          variant: resolvedVariant,
          size: resolvedSize,
        }),
        className
      )}
      {...props}
    />
  );
});
AvatarFallback.displayName = "AvatarFallback";

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  avatarVariants,
  avatarFallbackVariants,
  avatarStatusVariants,
};
