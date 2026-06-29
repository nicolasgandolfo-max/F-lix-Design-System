"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { CaretDownIcon } from "@phosphor-icons/react";

import { cn } from "../../lib/utils";

// ─── Root ─────────────────────────────────────────────────────────────────────

export type AccordionProps = React.ComponentProps<
  typeof AccordionPrimitive.Root
>;

function Accordion({ className, ...props }: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

Accordion.displayName = "Accordion";

// ─── Item ─────────────────────────────────────────────────────────────────────

export type AccordionItemProps = React.ComponentProps<
  typeof AccordionPrimitive.Item
>;

function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-border last:border-b-0", className)}
      {...props}
    />
  );
}

AccordionItem.displayName = "AccordionItem";

// ─── Trigger ──────────────────────────────────────────────────────────────────

export interface AccordionTriggerProps extends React.ComponentProps<
  typeof AccordionPrimitive.Trigger
> {
  /**
   * Override the default chevron indicator.
   * - Pass any React node to replace the indicator.
   * - Pass `null` to omit it.
   */
  indicator?: React.ReactNode | null;
}

function AccordionTrigger({
  className,
  children,
  indicator,
  ...props
}: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-center justify-between gap-2 py-2 text-left",
          "font-sans text-sm font-semibold leading-tight text-foreground",
          "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          // Rotate the default chevron when the item is open.
          "[&[data-state=open]>span>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        {indicator === null ? null : indicator !== undefined ? (
          <span data-slot="accordion-indicator" aria-hidden="true">
            {indicator}
          </span>
        ) : (
          <span
            data-slot="accordion-indicator"
            aria-hidden="true"
            className="inline-flex shrink-0"
          >
            <CaretDownIcon
              weight="bold"
              className="size-3.5 text-foreground transition-transform duration-200"
            />
          </span>
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

AccordionTrigger.displayName = "AccordionTrigger";

// ─── Content ──────────────────────────────────────────────────────────────────

export type AccordionContentProps = React.ComponentProps<
  typeof AccordionPrimitive.Content
>;

function AccordionContent({
  className,
  children,
  style,
  ...props
}: AccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden font-sans text-xs leading-tight tracking-[0.25px] text-foreground",
        "data-[state=closed]:animate-collapse-up",
        "data-[state=open]:animate-collapse-down"
      )}
      // Bridge Radix's primitive-specific height var to the generic
      // `--collapse-content-height` consumed by the reusable
      // `collapse-up` / `collapse-down` keyframes.
      style={
        {
          "--collapse-content-height": "var(--radix-accordion-content-height)",
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className={cn("py-2", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
