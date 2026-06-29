"use client";

import {
  toast as sonnerToast,
  Toaster as SonnerToaster,
  type ExternalToast,
  type ToastClassnames,
  type ToasterProps as SonnerToasterProps,
} from "sonner";

import { cn } from "../../lib/utils";

// ─── Variants ─────────────────────────────────────────────────────────────────
//
// Felix's `Toast` ships in two type variants per Figma:
//
//   - `default`   — soft brand surface (light teal).
//   - `secondary` — dark brand surface (deep teal) for higher emphasis.
//
// Both are mode-invariant (same in light + dark theme), mirroring how the
// Alert status variants behave.

export type ToastVariant = "default" | "secondary";

// Class slots applied to every toast rendered by Felix's `<Toaster />`.
//
// We deliberately use semantic + brand-scale tokens — no raw hex/px.
// Sonner exposes a `data-` API per slot (e.g. `[data-sonner-toast]`,
// `[data-title]`), which is what `toastOptions.classNames` ends up styling.

const baseToastClass = cn(
  // Layout
  "group/toast w-full flex items-center gap-2 px-3 py-2",
  // Shape
  "rounded-lg border shadow-lg",
  // Text
  "font-sans"
);

const defaultToastClassNames: ToastClassnames = {
  toast: cn(
    baseToastClass,
    "bg-turquoise-50 border-turquoise-600 text-turquoise-600"
  ),
  // `text-current` makes the inheritance explicit so the slot color always
  // tracks whatever the `toast` slot sets — guards against any future Sonner
  // built-in `color` declaration leaking through.
  title: "font-sans text-sm font-semibold leading-normal text-current",
  description:
    "font-sans text-xs font-normal leading-tight tracking-caption text-current",
  icon: "shrink-0 size-5 text-current [&_svg]:size-5",
  content: "flex-1 min-w-0 flex flex-col gap-0.5",
  actionButton: cn(
    "shrink-0 inline-flex items-center justify-center gap-1",
    "rounded-sm px-2 py-0.5",
    "font-sans text-xs leading-tight tracking-caption",
    "bg-primary text-primary-foreground",
    "hover:opacity-90 transition-opacity",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  ),
  cancelButton: cn(
    "shrink-0 inline-flex items-center justify-center gap-1",
    "rounded-sm px-2 py-0.5",
    "font-sans text-xs leading-tight tracking-caption",
    "bg-muted text-foreground",
    "hover:opacity-90 transition-opacity",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  ),
};

// Per-call overrides applied by `toast.secondary(...)`. We declare every slot
// explicitly (rather than relying on slot-level merge fallback) so the dark
// surface never inherits the default variant's `text-turquoise-600` on slots
// like `title` / `description` / `icon`.
const secondaryToastClassNames: ToastClassnames = {
  toast: cn(baseToastClass, "bg-turquoise-800 border-turquoise-900 text-white"),
  title: "font-sans text-sm font-semibold leading-normal text-current",
  description:
    "font-sans text-xs font-normal leading-tight tracking-caption text-current",
  icon: "shrink-0 size-5 text-current [&_svg]:size-5",
  content: "flex-1 min-w-0 flex flex-col gap-0.5",
  actionButton: cn(
    "shrink-0 inline-flex items-center justify-center gap-1",
    "rounded-sm px-2 py-0.5",
    "font-sans text-xs leading-tight tracking-caption",
    "bg-white text-turquoise-800",
    "hover:opacity-90 transition-opacity",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  ),
  cancelButton: cn(
    "shrink-0 inline-flex items-center justify-center gap-1",
    "rounded-sm px-2 py-0.5",
    "font-sans text-xs leading-tight tracking-caption",
    "bg-transparent text-white",
    "hover:opacity-90 transition-opacity",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  ),
};

// ─── Toaster ──────────────────────────────────────────────────────────────────

export interface ToasterProps extends SonnerToasterProps {}

/**
 * Felix `Toaster` — the mount point for Sonner toasts.
 *
 * Drop one `<Toaster />` near the root of your app, then call `toast(...)`
 * (or `toast.secondary(...)`) from anywhere to trigger notifications.
 *
 * Sonner already handles: stacking, swipe-to-dismiss, hotkey focus
 * (`Alt + T`), pause-on-hover, automatic dismissal, accessibility
 * (`role="status"` per toast), and the entry/exit animations.
 *
 * This wrapper just (a) defaults the position to `bottom-right`, (b) wires
 * Felix's `theme.css` tokens into Sonner's slots via `toastOptions.classNames`,
 * and (c) merges any consumer-supplied overrides on top.
 */
function Toaster({
  position = "bottom-right",
  toastOptions,
  className,
  ...props
}: ToasterProps) {
  const mergedClassNames: ToastClassnames = {
    ...defaultToastClassNames,
    ...(toastOptions?.classNames ?? {}),
  };

  return (
    <SonnerToaster
      position={position}
      className={cn("felix-toaster", className)}
      toastOptions={{
        // Disable Sonner's built-in color theme so its
        // `[data-sonner-toast][data-styled="true"]` rules don't override the
        // Felix Tailwind utilities below. Sonner still injects its own inline
        // styles for layout, positioning, swipe, and entry/exit animations —
        // only the visual chrome (bg/border/text/shadow) is ours to define.
        unstyled: true,
        ...toastOptions,
        classNames: mergedClassNames,
      }}
      {...props}
    />
  );
}

Toaster.displayName = "Toaster";

// ─── toast() — re-export with a `.secondary` helper ───────────────────────────

type ToastFn = typeof sonnerToast;

interface FelixToast extends ToastFn {
  /**
   * Fire a toast styled with the Felix `secondary` (dark teal) variant.
   *
   * Equivalent to `toast(message, { ...data, classNames: secondary })`,
   * but resilient: per-call `classNames` from the caller still win.
   */
  secondary: (
    message: Parameters<ToastFn>[0],
    data?: ExternalToast
  ) => string | number;
}

const toast = sonnerToast as FelixToast;

toast.secondary = (message, data) =>
  sonnerToast(message, {
    ...data,
    classNames: {
      ...secondaryToastClassNames,
      ...(data?.classNames ?? {}),
    },
  });

export { Toaster, toast, defaultToastClassNames, secondaryToastClassNames };
