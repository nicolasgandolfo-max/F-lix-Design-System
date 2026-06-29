"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { CaretRightIcon, DotsThreeIcon } from "@phosphor-icons/react";

import { cn } from "../../lib/utils";

// ─── Variants (Felix DS — Figma: Breadcrumb, node 880:1133 / 1044:9463) ──────

/**
 * Visual classes shared by `BreadcrumbLink` and `BreadcrumbPage`. The Figma
 * spec (node `986:3553` / `986:3554`) maps the three states to standard ARIA
 * + DOM signals so the markup stays semantic:
 *
 * - **Default link** — `text-secondary` (`#adaa9e`), regular weight.
 * - **Hover link** — fades to `text-foreground` for affordance.
 * - **Active page** — `aria-current="page"` → `text-foreground` + semibold.
 *
 * All three states share the same 12 px caption typography
 * (`text-xs leading-tight tracking-caption`).
 */
const breadcrumbItemVariants = cva(
  cn(
    "inline-flex items-center gap-1",
    "font-sans text-xs leading-tight tracking-caption",
    "transition-colors"
  ),
  {
    variants: {
      // The two visual roles map cleanly to two CVA variants — the link is a
      // navigable predecessor segment, the page is the current location.
      role: {
        link: "text-secondary hover:text-foreground",
        page: "font-semibold text-foreground",
      },
    },
    defaultVariants: { role: "link" },
  }
);

// ─── Root (nav) ──────────────────────────────────────────────────────────────

export type BreadcrumbProps = React.ComponentProps<"nav">;

function Breadcrumb({ className, ...props }: BreadcrumbProps) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={cn(className)}
      {...props}
    />
  );
}

Breadcrumb.displayName = "Breadcrumb";

// ─── List (ol) ───────────────────────────────────────────────────────────────

export interface BreadcrumbListProps extends React.ComponentProps<"ol"> {
  ref?: React.Ref<HTMLOListElement>;
}

function BreadcrumbList({ className, ref, ...props }: BreadcrumbListProps) {
  return (
    <ol
      ref={ref}
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-1 wrap-break-word",
        "px-1 py-1.5",
        className
      )}
      {...props}
    />
  );
}

BreadcrumbList.displayName = "BreadcrumbList";

// ─── Item (li) ───────────────────────────────────────────────────────────────

export interface BreadcrumbItemProps extends React.ComponentProps<"li"> {
  ref?: React.Ref<HTMLLIElement>;
}

function BreadcrumbItem({ className, ref, ...props }: BreadcrumbItemProps) {
  return (
    <li
      ref={ref}
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  );
}

BreadcrumbItem.displayName = "BreadcrumbItem";

// ─── Link ────────────────────────────────────────────────────────────────────

type BreadcrumbLinkVariantProps = VariantProps<typeof breadcrumbItemVariants>;

export interface BreadcrumbLinkProps extends Omit<
  React.ComponentProps<"a">,
  keyof BreadcrumbLinkVariantProps
> {
  /**
   * Render as the consumer's child element (Radix `Slot`). Useful for
   * routing libraries (`next/link`, etc.) without losing the breadcrumb
   * styling.
   *
   * ```tsx
   * <BreadcrumbLink asChild>
   *   <Link href="/library">Library</Link>
   * </BreadcrumbLink>
   * ```
   */
  asChild?: boolean;
}

function BreadcrumbLink({ className, asChild, ...props }: BreadcrumbLinkProps) {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(breadcrumbItemVariants({ role: "link" }), className)}
      {...props}
    />
  );
}

BreadcrumbLink.displayName = "BreadcrumbLink";

// ─── Page (current page) ─────────────────────────────────────────────────────

export type BreadcrumbPageProps = React.ComponentProps<"span">;

/**
 * Marks the current page in the trail. Renders `aria-current="page"`,
 * `role="link"` and `aria-disabled="true"` so it remains an unfocusable
 * landmark consistent with shadcn's pattern, and adopts the bold
 * `text-foreground` look from the Figma "Active" state.
 */
function BreadcrumbPage({ className, ...props }: BreadcrumbPageProps) {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      data-slot="breadcrumb-page"
      className={cn(breadcrumbItemVariants({ role: "page" }), className)}
      {...props}
    />
  );
}

BreadcrumbPage.displayName = "BreadcrumbPage";

// ─── Separator ───────────────────────────────────────────────────────────────

export type BreadcrumbSeparatorProps = React.ComponentProps<"li">;

/**
 * Visual divider between breadcrumb items. The default glyph is a 12 px
 * caret-right (matches the Figma `CaretRight` symbol). Override by passing
 * `children`, e.g. a slash, a dot, or any custom icon.
 *
 * Uses `role="presentation"` + `aria-hidden="true"` so screen readers walk
 * the trail without hearing "greater than" between every segment.
 */
function BreadcrumbSeparator({
  children,
  className,
  ...props
}: BreadcrumbSeparatorProps) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      data-slot="breadcrumb-separator"
      className={cn(
        "inline-flex items-center text-muted-foreground",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0",
        "[&_svg:not([class*='size-'])]:size-3",
        className
      )}
      {...props}
    >
      {children ?? <CaretRightIcon weight="bold" aria-hidden="true" />}
    </li>
  );
}

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

// ─── Ellipsis ────────────────────────────────────────────────────────────────

export interface BreadcrumbEllipsisProps extends React.ComponentProps<"span"> {
  /**
   * Screen-reader-only label announced in place of the visual dots. The
   * default is Spanish ("Más") because Felix is a Spanish-first product.
   * Override for any other locale; the wrapper itself is `aria-hidden`, so
   * this nested label is what assistive tech actually reads.
   *
   * @default "Más"
   */
  srLabel?: string;
}

/**
 * Truncation indicator for collapsed breadcrumb segments. Maps to the Figma
 * "Ellipsis" state — a `bg-muted` pill (`#efebe7`) with three dots,
 * `rounded-sm` corners and `px-1.5 py-0.5` padding.
 *
 * Visually decorative — wear `aria-hidden="true"` and announce the
 * truncation via the parent (`aria-label="Más"` on a wrapping button, etc.)
 * when the indicator is interactive.
 */
function BreadcrumbEllipsis({
  className,
  srLabel = "Más",
  ...props
}: BreadcrumbEllipsisProps) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      data-slot="breadcrumb-ellipsis"
      className={cn(
        "inline-flex h-5 items-center justify-center",
        "rounded-sm bg-muted px-1.5 py-0.5",
        "text-muted-foreground",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0",
        "[&_svg:not([class*='size-'])]:size-3",
        className
      )}
      {...props}
    >
      <DotsThreeIcon weight="bold" aria-hidden="true" />
      <span className="sr-only">{srLabel}</span>
    </span>
  );
}

BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

// ─── Exports ─────────────────────────────────────────────────────────────────

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  breadcrumbItemVariants,
};
