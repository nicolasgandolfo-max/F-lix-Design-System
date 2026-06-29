"use client";

import * as React from "react";
import { Check } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

// Keep this union in sync with the `state` variant keys declared on
// `stepperIndicatorVariants` / `stepperLabelVariants` below.
export type StepperState = "upcoming" | "active" | "completed";

// ─── Context ──────────────────────────────────────────────────────────────────

interface StepperContextValue {
  activeIndex: number;
  index: number;
  total: number;
}

const StepperContext = React.createContext<StepperContextValue | null>(null);

function useStepperContext(): StepperContextValue {
  const ctx = React.useContext(StepperContext);
  if (!ctx) {
    throw new Error(
      "Stepper.Step must be used inside a <Stepper> parent component."
    );
  }
  return ctx;
}

// ─── Variants ─────────────────────────────────────────────────────────────────

const stepperIndicatorVariants = cva(
  cn(
    "inline-flex items-center justify-center shrink-0 rounded-full size-8",
    "overflow-hidden transition-colors select-none",
    "[&_svg]:shrink-0"
  ),
  {
    variants: {
      state: {
        upcoming: "bg-background border border-border text-primary-foreground",
        active: "bg-muted border border-primary text-foreground",
        completed: "bg-primary text-primary-foreground",
      },
    },
    defaultVariants: {
      state: "upcoming",
    },
  }
);

const stepperLabelVariants = cva(
  cn(
    "font-sans text-xs leading-tight tracking-caption text-center",
    "w-full max-w-full wrap-break-word hyphens-auto transition-colors"
  ),
  {
    variants: {
      state: {
        upcoming: "text-secondary",
        active: "text-foreground font-semibold",
        completed: "text-secondary",
      },
    },
    defaultVariants: {
      state: "upcoming",
    },
  }
);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resolveState(index: number, activeIndex: number): StepperState {
  if (index < activeIndex) return "completed";
  if (index === activeIndex) return "active";
  return "upcoming";
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export interface StepperProps extends React.HTMLAttributes<HTMLOListElement> {
  /** 0-indexed position of the currently active step. Steps before it are rendered as completed; steps after it as upcoming. */
  activeIndex: number;
  /** One or more `<Stepper.Step>` elements. */
  children?: React.ReactNode;
}

function StepperRoot({
  activeIndex,
  className,
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ref,
  ...props
}: StepperProps & { ref?: React.Ref<HTMLOListElement> }) {
  const steps = React.Children.toArray(children).filter(
    React.isValidElement
  ) as React.ReactElement[];
  const total = steps.length;
  // Only fall back to the default label when the consumer hasn't provided
  // an external label association via aria-labelledby.
  const resolvedAriaLabel =
    ariaLabel ?? (ariaLabelledBy ? undefined : "Progress");

  return (
    <ol
      ref={ref}
      data-slot="stepper"
      aria-label={resolvedAriaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn("flex w-full items-start", className)}
      {...props}
    >
      {steps.map((child, index) => (
        // `React.Children.toArray` guarantees a non-null key on every element,
        // so we can safely forward it to the Provider here.
        <StepperContext.Provider
          key={child.key}
          value={{ activeIndex, index, total }}
        >
          {child}
        </StepperContext.Provider>
      ))}
    </ol>
  );
}

StepperRoot.displayName = "Stepper";

// ─── Step ─────────────────────────────────────────────────────────────────────

export interface StepperStepProps
  extends
    Omit<React.HTMLAttributes<HTMLLIElement>, "children">,
    VariantProps<typeof stepperIndicatorVariants> {
  /** Step label text. */
  children: React.ReactNode;
  /**
   * Override the automatically-derived state of this step's indicator and
   * label. Note: this only affects the step itself — connector colors still
   * track the parent `<Stepper>`'s `activeIndex`. To advance the connectors,
   * raise `activeIndex` on the parent.
   */
  state?: StepperState;
}

function Step({
  children,
  state: stateProp,
  className,
  ref,
  ...props
}: StepperStepProps & { ref?: React.Ref<HTMLLIElement> }) {
  const { activeIndex, index, total } = useStepperContext();
  const state = stateProp ?? resolveState(index, activeIndex);
  const isFirst = index === 0;
  const isLast = index === total - 1;
  // Divider colors track progression, not per-step overrides: the segment
  // between steps i and i+1 is "completed" iff we've moved past step i.
  const leftCompleted = index <= activeIndex;
  const rightCompleted = index < activeIndex;

  return (
    <li
      ref={ref}
      data-slot="stepper-step"
      data-state={state}
      aria-current={state === "active" ? "step" : undefined}
      className={cn(
        "flex flex-1 min-w-0 flex-col items-center gap-1",
        className
      )}
      {...props}
    >
      <div className="flex w-full items-center">
        <span
          aria-hidden="true"
          {...(isFirst
            ? {}
            : {
                "data-slot": "stepper-divider",
                "data-position": "left",
                "data-state": leftCompleted ? "completed" : "pending",
              })}
          className={cn(
            "h-0.5 flex-1 transition-colors",
            isFirst ? "invisible" : leftCompleted ? "bg-primary" : "bg-border"
          )}
        />
        <span
          data-slot="stepper-indicator"
          className={cn(stepperIndicatorVariants({ state }))}
        >
          {state === "completed" ? (
            <Check weight="bold" className="size-5" aria-hidden="true" />
          ) : (
            <span className="font-sans text-sm leading-normal">
              {index + 1}
            </span>
          )}
        </span>
        <span
          aria-hidden="true"
          {...(isLast
            ? {}
            : {
                "data-slot": "stepper-divider",
                "data-position": "right",
                "data-state": rightCompleted ? "completed" : "pending",
              })}
          className={cn(
            "h-0.5 flex-1 transition-colors",
            isLast ? "invisible" : rightCompleted ? "bg-primary" : "bg-border"
          )}
        />
      </div>
      <span
        data-slot="stepper-label"
        className={cn(stepperLabelVariants({ state }))}
      >
        {children}
      </span>
    </li>
  );
}

Step.displayName = "Stepper.Step";

// ─── Namespaced compound ──────────────────────────────────────────────────────

type StepperComponent = typeof StepperRoot & {
  Step: typeof Step;
};

const Stepper = StepperRoot as StepperComponent;
Stepper.Step = Step;

export { Stepper, stepperIndicatorVariants, stepperLabelVariants };
