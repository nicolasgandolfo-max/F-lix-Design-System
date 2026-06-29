"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

// ─── Variants (Felix DS — Figma: Card, node 515:36) ──────────────────────────

const cardVariants = cva("flex w-full flex-col gap-2 rounded-md p-4", {
  variants: {
    variant: {
      default: "bg-card border border-border",
      elevated: "bg-card border border-border shadow-lg",
      ghost: "bg-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

// ─── Types ───────────────────────────────────────────────────────────────────

export type CardVariant = NonNullable<
  VariantProps<typeof cardVariants>["variant"]
>;

export interface CardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;
export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;
export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;
export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

// ─── Root ────────────────────────────────────────────────────────────────────

/**
 * Card — a content container with a title, subtitle, body, and optional
 * footer. Composed via sub-components (`CardHeader`, `CardTitle`,
 * `CardDescription`, `CardContent`, `CardFooter`).
 *
 * Three variants matching Figma node `515:36`:
 *
 * - **default** — soft white background, 1 px border, no shadow
 * - **elevated** — soft white background, 1 px border, drop shadow (`shadow-lg`)
 * - **ghost** — transparent, no border, no shadow (use inside other surfaces)
 *
 * The Figma design shows a divider between the header and the body. Add one
 * explicitly when needed (for example with the `Separator` atom or a thin
 * `<div className="h-px bg-border" />`) — keeping it opt-in lets cards
 * without a divider stay clean.
 *
 * ```tsx
 * <Card variant="elevated">
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card subtitle text goes here.</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     This is the card content area.
 *   </CardContent>
 *   <CardFooter>
 *     <Button variant="ghost">Cancel</Button>
 *     <Button>Confirm</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */
function Card({
  className,
  variant = "default",
  ref,
  ...props
}: CardProps & { ref?: React.Ref<HTMLDivElement> }) {
  const resolvedVariant = variant ?? "default";
  return (
    <div
      ref={ref}
      data-slot="card"
      data-variant={resolvedVariant}
      className={cn(cardVariants({ variant: resolvedVariant }), className)}
      {...props}
    />
  );
}

Card.displayName = "Card";

// ─── Header ──────────────────────────────────────────────────────────────────

function CardHeader({
  className,
  ref,
  ...props
}: CardHeaderProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn("flex flex-col gap-0.5", className)}
      {...props}
    />
  );
}

CardHeader.displayName = "CardHeader";

// ─── Title ───────────────────────────────────────────────────────────────────

function CardTitle({
  className,
  ref,
  ...props
}: CardTitleProps & { ref?: React.Ref<HTMLHeadingElement> }) {
  return (
    <h3
      ref={ref}
      data-slot="card-title"
      className={cn(
        "font-sans text-lg font-medium leading-normal tracking-normal text-foreground",
        className
      )}
      {...props}
    />
  );
}

CardTitle.displayName = "CardTitle";

// ─── Description ─────────────────────────────────────────────────────────────

function CardDescription({
  className,
  ref,
  ...props
}: CardDescriptionProps & { ref?: React.Ref<HTMLParagraphElement> }) {
  return (
    <p
      ref={ref}
      data-slot="card-description"
      className={cn(
        "font-sans text-sm leading-snug tracking-normal text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

CardDescription.displayName = "CardDescription";

// ─── Content ─────────────────────────────────────────────────────────────────

function CardContent({
  className,
  ref,
  ...props
}: CardContentProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-slot="card-content"
      className={cn(
        "font-sans text-sm leading-snug tracking-normal text-foreground",
        className
      )}
      {...props}
    />
  );
}

CardContent.displayName = "CardContent";

// ─── Footer ──────────────────────────────────────────────────────────────────

function CardFooter({
  className,
  ref,
  ...props
}: CardFooterProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}

CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
};
