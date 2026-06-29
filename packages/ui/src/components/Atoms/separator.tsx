"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "../../lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

type SeparatorOrientation = "horizontal" | "vertical";

export interface SeparatorProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>,
  "orientation" | "children"
> {
  /**
   * Orientation of the separator. Defaults to `"horizontal"`.
   */
  orientation?: SeparatorOrientation;
  /**
   * When `true` (default), the separator is purely visual and gets
   * `role="none"`. Set to `false` for a semantic separator with
   * `role="separator"` (useful when grouping unrelated content for screen
   * readers).
   */
  decorative?: boolean;
  /**
   * Optional centered label rendered between two hairlines (only for
   * horizontal separators). May also be passed via `children`.
   */
  label?: React.ReactNode;
  /**
   * Alternative to `label` — children render as the centered label in the
   * horizontal labeled variant.
   */
  children?: React.ReactNode;
}

// ─── Component ───────────────────────────────────────────────────────────────

const SEPARATOR_LINE = "bg-border shrink-0";

/**
 * Separator — a thin divider line that splits content sections. Built on
 * `@radix-ui/react-separator` so ARIA (`role`, `aria-orientation`) is handled
 * correctly out of the box.
 *
 * Three variants matching Figma node `446:78`:
 *
 * 1. **Horizontal, no label** — `<Separator />`
 * 2. **Horizontal, with label** — `<Separator label="Section" />` or
 *    `<Separator>Section</Separator>`. Renders as `line — label — line`
 *    with a 12 px gap.
 * 3. **Vertical** — `<Separator orientation="vertical" />`. By default the
 *    line stretches to the parent's height; pair with a flex container or
 *    pass a `className` height override.
 *
 * Tokens: `bg-border` for the line, `text-muted-foreground` + `text-xxs` for
 * the label.
 */
const Separator = React.forwardRef<
  React.ComponentRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      label,
      children,
      ...props
    },
    ref
  ) => {
    const labelContent = label ?? children;
    const hasLabel = orientation === "horizontal" && labelContent != null;

    if (hasLabel) {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          role={decorative ? "none" : "separator"}
          aria-orientation={decorative ? undefined : "horizontal"}
          data-slot="separator"
          data-orientation="horizontal"
          data-with-label=""
          className={cn("flex w-full items-center gap-3", className)}
          {...props}
        >
          <span
            aria-hidden="true"
            className={cn(SEPARATOR_LINE, "h-px flex-1")}
          />
          <span className="font-sans text-xxs leading-[1.1] tracking-normal whitespace-nowrap text-muted-foreground">
            {labelContent}
          </span>
          <span
            aria-hidden="true"
            className={cn(SEPARATOR_LINE, "h-px flex-1")}
          />
        </div>
      );
    }

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        data-slot="separator"
        data-orientation={orientation}
        orientation={orientation}
        decorative={decorative}
        className={cn(
          SEPARATOR_LINE,
          orientation === "horizontal"
            ? "h-px w-full"
            : "h-full w-px self-stretch min-h-5",
          className
        )}
        {...props}
      />
    );
  }
);
Separator.displayName = "Separator";

export { Separator };
