"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DotsThreeIcon,
} from "@phosphor-icons/react";

import { cn } from "../../lib/utils";

// ─── Root ─────────────────────────────────────────────────────────────────────

export interface PaginationProps extends React.ComponentProps<"nav"> {}

function Pagination({ className, ...props }: PaginationProps) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

Pagination.displayName = "Pagination";

// ─── Content (ul) ─────────────────────────────────────────────────────────────

export interface PaginationContentProps extends React.ComponentProps<"ul"> {}

function PaginationContent({
  className,
  ref,
  ...props
}: PaginationContentProps & { ref?: React.Ref<HTMLUListElement> }) {
  return (
    <ul
      ref={ref}
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

PaginationContent.displayName = "PaginationContent";

// ─── Item (li) ────────────────────────────────────────────────────────────────

export interface PaginationItemProps extends React.ComponentProps<"li"> {}

function PaginationItem({
  className,
  ref,
  ...props
}: PaginationItemProps & { ref?: React.Ref<HTMLLIElement> }) {
  return (
    <li
      ref={ref}
      data-slot="pagination-item"
      className={cn(className)}
      {...props}
    />
  );
}

PaginationItem.displayName = "PaginationItem";

// ─── Variants ────────────────────────────────────────────────────────────────
//
// Kept intentionally separate from the global `Button` variants so the
// active page color (brand teal) and shape (square 36 px) don't drift if
// `Button` ever evolves. The shapes:
// - `square` (default) — 36×36 cell for digit / ellipsis links
// - `padded` — 36 px tall, horizontal padding for "Previous" / "Next"

export const paginationLinkVariants = cva(
  cn(
    "inline-flex items-center justify-center rounded-md",
    "font-sans text-sm leading-tight text-foreground",
    "outline-none transition-colors",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-disabled:pointer-events-none aria-disabled:opacity-50"
  ),
  {
    variants: {
      shape: {
        square: "size-9",
        padded: "h-9 gap-1 px-2.5",
      },
      isActive: {
        true: "bg-primary text-primary-foreground hover:bg-primary",
        false:
          "bg-background text-foreground hover:bg-secondary hover:text-background",
      },
    },
    defaultVariants: {
      shape: "square",
      isActive: false,
    },
  }
);

// ─── Link ─────────────────────────────────────────────────────────────────────

type PaginationLinkVariantProps = VariantProps<typeof paginationLinkVariants>;

export interface PaginationLinkProps
  extends
    Omit<React.ComponentProps<"a">, "color">,
    Pick<PaginationLinkVariantProps, "shape"> {
  /** Marks this link as the current page (sets `aria-current="page"`). */
  isActive?: boolean;
  /**
   * If true, the link composes its props onto the immediate child element
   * via Radix Slot. Useful for integrating with framework `Link` components
   * (e.g. Next.js `<Link>`).
   */
  asChild?: boolean;
}

function PaginationLink({
  className,
  isActive = false,
  shape = "square",
  asChild = false,
  href,
  ref,
  ...props
}: PaginationLinkProps & {
  ref?: React.Ref<HTMLAnchorElement | HTMLButtonElement>;
}) {
  const classes = cn(paginationLinkVariants({ shape, isActive }), className);
  const ariaCurrent = isActive ? "page" : undefined;

  if (asChild) {
    return (
      <Slot
        ref={ref as React.Ref<HTMLElement>}
        data-slot="pagination-link"
        data-active={isActive ? "" : undefined}
        aria-current={ariaCurrent}
        className={classes}
        {...(props as React.HTMLAttributes<HTMLElement>)}
      />
    );
  }

  // When no `href` is provided, render a `<button>` so the link is still
  // keyboard-activatable for handler-based pagination (e.g. SPA state).
  if (href === undefined) {
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        data-slot="pagination-link"
        data-active={isActive ? "" : undefined}
        aria-current={ariaCurrent}
        className={classes}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      />
    );
  }

  return (
    <a
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={href}
      data-slot="pagination-link"
      data-active={isActive ? "" : undefined}
      aria-current={ariaCurrent}
      className={classes}
      {...props}
    />
  );
}

PaginationLink.displayName = "PaginationLink";

// ─── Previous ─────────────────────────────────────────────────────────────────

export interface PaginationPreviousProps extends Omit<
  PaginationLinkProps,
  "shape" | "children"
> {
  /** Visible label. Pass `null` to hide. @default "Previous" */
  label?: React.ReactNode;
}

function PaginationPrevious({
  className,
  label = "Previous",
  ...props
}: PaginationPreviousProps) {
  return (
    <PaginationLink
      data-slot="pagination-previous"
      shape="padded"
      aria-label="Go to previous page"
      className={cn(className)}
      {...props}
    >
      <ArrowLeftIcon aria-hidden="true" weight="regular" className="size-4" />
      {label !== null ? <span>{label}</span> : null}
    </PaginationLink>
  );
}

PaginationPrevious.displayName = "PaginationPrevious";

// ─── Next ─────────────────────────────────────────────────────────────────────

export interface PaginationNextProps extends Omit<
  PaginationLinkProps,
  "shape" | "children"
> {
  /** Visible label. Pass `null` to hide. @default "Next" */
  label?: React.ReactNode;
}

function PaginationNext({
  className,
  label = "Next",
  ...props
}: PaginationNextProps) {
  return (
    <PaginationLink
      data-slot="pagination-next"
      shape="padded"
      aria-label="Go to next page"
      className={cn(className)}
      {...props}
    >
      {label !== null ? <span>{label}</span> : null}
      <ArrowRightIcon aria-hidden="true" weight="regular" className="size-4" />
    </PaginationLink>
  );
}

PaginationNext.displayName = "PaginationNext";

// ─── Ellipsis ─────────────────────────────────────────────────────────────────

export interface PaginationEllipsisProps extends React.ComponentProps<"span"> {}

function PaginationEllipsis({ className, ...props }: PaginationEllipsisProps) {
  return (
    <span
      data-slot="pagination-ellipsis"
      aria-hidden="true"
      className={cn(
        "flex size-9 items-center justify-center text-muted-foreground",
        className
      )}
      {...props}
    >
      <DotsThreeIcon weight="bold" className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
