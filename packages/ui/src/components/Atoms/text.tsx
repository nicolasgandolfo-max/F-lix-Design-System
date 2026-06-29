"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// ─── Variants ─────────────────────────────────────────────────────────────────

const textVariants = cva("", {
  variants: {
    variant: {
      // Display — large hero/marketing text, heading font
      "display-xl":
        "font-heading text-72 font-bold leading-display tracking-display",
      "display-lg":
        "font-heading text-60 font-bold leading-display tracking-display",
      "display-md":
        "font-heading text-5xl font-bold leading-display tracking-display",
      // Headings — section and content titles, heading font
      "heading-1":
        "font-heading text-36  font-bold     leading-tight    tracking-heading",
      "heading-2":
        "font-heading text-30  font-bold     leading-heading-2 tracking-heading",
      "heading-3":
        "font-heading text-xl  font-semibold leading-heading-3 tracking-heading",
      "heading-4":
        "font-heading text-lg  font-semibold leading-normal    tracking-heading",
      // Body — prose and UI copy, sans font
      "body-lg": "font-sans text-md   font-regular leading-body",
      body: "font-sans text-base font-regular leading-body",
      "body-sm": "font-sans text-sm   font-regular leading-body",
      // Caption — labels, footnotes, helper text
      caption: "font-sans text-xs font-regular tracking-caption",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

// ─── Default tag per variant ───────────────────────────────────────────────────

const DEFAULT_TAG: Record<NonNullable<TextVariant>, React.ElementType> = {
  "display-xl": "h1",
  "display-lg": "h1",
  "display-md": "h1",
  "heading-1": "h1",
  "heading-2": "h2",
  "heading-3": "h3",
  "heading-4": "h4",
  "body-lg": "p",
  body: "p",
  "body-sm": "p",
  caption: "span",
};

type TextVariant = VariantProps<typeof textVariants>["variant"];

// ─── Props ────────────────────────────────────────────────────────────────────

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  /**
   * Override the rendered HTML element.
   * Each variant has a sensible semantic default (e.g. `heading-2` → `<h2>`).
   */
  as?: React.ElementType;
}

// ─── Component ────────────────────────────────────────────────────────────────

function Text({ variant = "body", as, className, ...props }: TextProps) {
  const Tag = as ?? DEFAULT_TAG[variant as NonNullable<TextVariant>] ?? "p";

  return (
    <Tag
      data-slot="text"
      data-variant={variant}
      className={cn(textVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Text, textVariants };
