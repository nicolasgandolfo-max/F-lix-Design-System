"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

// ─── Variants (Felix DS — Figma: Slider, node 578:4521) ──────────────────────

const sliderRootVariants = cva(
  cn(
    "relative flex w-full touch-none items-center select-none",
    "data-disabled:opacity-50 data-disabled:pointer-events-none"
  )
);

const sliderTrackVariants = cva(
  "relative grow overflow-hidden rounded-full bg-muted h-1"
);

const sliderRangeVariants = cva("absolute h-full rounded-full", {
  variants: {
    color: {
      primary: "bg-primary",
      secondary: "bg-foreground",
      lime: "bg-accent",
      danger: "bg-destructive",
      violet: "bg-chart-4",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

const sliderThumbVariants = cva(
  cn(
    "block size-4 shrink-0 rounded-full bg-background shadow-sm",
    "ring-1 ring-border transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-50"
  )
);

// ─── Props ───────────────────────────────────────────────────────────────────

export interface SliderProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, "color">,
    VariantProps<typeof sliderRangeVariants> {
  /**
   * Per-thumb accessible labels. Required for a screen-reader-friendly
   * **range** (two-thumb) slider, e.g. `["Minimum price", "Maximum price"]`.
   *
   * For a **single-thumb** slider, prefer the simpler `aria-label` /
   * `aria-labelledby` props — they are automatically forwarded to the thumb.
   */
  thumbLabels?: string[];
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Slider — a horizontal slider input built on `@radix-ui/react-slider`.
 *
 * - **Single thumb** — pass `defaultValue={[40]}` (uncontrolled) or
 *   `value={[40]}` + `onValueChange` (controlled).
 * - **Range / two-thumb** — pass two values, e.g. `defaultValue={[20, 80]}`,
 *   to render two draggable thumbs for range selection.
 * - **Colors** — `primary` (turquoise, default), `secondary` (foreground
 *   slate), `lime`, `danger`, `violet`. Track always uses `bg-muted`; only the
 *   filled range changes colour.
 * - **min / max / step** — forwarded to Radix; defaults are `0`, `100`, `1`.
 *
 * ```tsx
 * <Slider defaultValue={[40]} aria-label="Volume" />
 *
 * <Slider
 *   defaultValue={[20, 80]}
 *   color="secondary"
 *   thumbLabels={["Minimum price", "Maximum price"]}
 * />
 * ```
 *
 * Accessibility: Radix renders each thumb with `role="slider"` plus
 * `aria-valuenow` / `aria-valuemin` / `aria-valuemax`. For a single-thumb
 * slider, `aria-label` / `aria-labelledby` are forwarded to the thumb.
 * For a range slider, pass `thumbLabels` so each thumb has its own name.
 */
const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      color,
      defaultValue,
      value,
      min = 0,
      max = 100,
      thumbLabels,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      ...props
    },
    ref
  ) => {
    const resolvedColor = color ?? "primary";

    // Determine how many thumbs to render. Radix expects one Thumb per value.
    const thumbValues = React.useMemo<number[]>(() => {
      if (Array.isArray(value)) return value;
      if (Array.isArray(defaultValue)) return defaultValue;
      return [min];
    }, [value, defaultValue, min]);

    return (
      <SliderPrimitive.Root
        ref={ref}
        data-slot="slider"
        data-color={resolvedColor}
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        className={cn(sliderRootVariants(), className)}
        {...props}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(sliderTrackVariants())}
        >
          <SliderPrimitive.Range
            data-slot="slider-range"
            className={cn(sliderRangeVariants({ color: resolvedColor }))}
          />
        </SliderPrimitive.Track>
        {thumbValues.map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            data-slot="slider-thumb"
            aria-label={thumbLabels?.[i] ?? ariaLabel}
            aria-labelledby={thumbLabels?.[i] ? undefined : ariaLabelledBy}
            className={cn(sliderThumbVariants())}
          />
        ))}
      </SliderPrimitive.Root>
    );
  }
);
Slider.displayName = "Slider";

export {
  Slider,
  sliderRootVariants,
  sliderTrackVariants,
  sliderRangeVariants,
  sliderThumbVariants,
};
