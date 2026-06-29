import * as React from "react";
import {
  CheckCircle,
  Fire,
  Info,
  WarningCircle,
  WarningOctagon,
  type Icon,
} from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

// Keep this union in sync with the `variant` keys declared on
// `alertVariants` below.
export type AlertVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "destructive"
  | "general";

// ─── Variants ─────────────────────────────────────────────────────────────────

const alertVariants = cva(
  cn(
    "relative w-full flex items-start gap-3 rounded-lg border p-3",
    "transition-colors",
    "[&_svg]:shrink-0 [&_svg]:size-5"
  ),
  {
    variants: {
      variant: {
        default: "bg-turquoise-50 border-turquoise-600 text-turquoise-600",
        success:
          "bg-status-success-bg border-status-success text-status-success-text",
        warning:
          "bg-status-warning-bg border-status-warning text-status-warning-text",
        error: "bg-status-error-bg border-status-error text-status-error-text",
        destructive:
          "bg-destructive border-destructive text-destructive-foreground",
        // `general` uses the dark brand surface (turquoise-700) with a
        // light brand-scale foreground. Border matches the bg so the Alert
        // reads as a solid dark pill (Figma shows no visible border).
        general: "bg-turquoise-700 border-turquoise-700 text-turquoise-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const alertTitleVariants = cva(
  "font-sans text-sm font-semibold leading-tight tracking-normal"
);

const alertDescriptionVariants = cva(
  "font-sans text-xs font-normal leading-snug tracking-caption"
);

// ─── Variant → icon ──────────────────────────────────────────────────────────

const variantIcon: Record<AlertVariant, Icon> = {
  default: Info,
  success: CheckCircle,
  warning: WarningCircle,
  error: WarningOctagon,
  destructive: Fire,
  general: Info,
};

// ─── Root ─────────────────────────────────────────────────────────────────────

export interface AlertProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /**
   * Visual style. Determines background, border, text colors, and the
   * default icon.
   * @default "default"
   */
  variant?: AlertVariant;
  /**
   * Override the default icon for the variant.
   * - Pass a Phosphor icon component (or any React node) to replace the icon.
   * - Pass `null` to render the alert without an icon.
   */
  icon?: React.ReactNode | null;
}

function Alert({
  className,
  variant = "default",
  icon,
  children,
  role = "alert",
  ref,
  ...props
}: AlertProps & { ref?: React.Ref<HTMLDivElement> }) {
  const resolvedIcon = renderIcon(icon, variant);

  return (
    <div
      ref={ref}
      role={role}
      data-slot="alert"
      data-variant={variant}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {resolvedIcon}
      <div
        data-slot="alert-content"
        className="flex flex-1 flex-col gap-1 min-w-0"
      >
        {children}
      </div>
    </div>
  );
}

Alert.displayName = "Alert";

function renderIcon(
  icon: AlertProps["icon"],
  variant: AlertVariant
): React.ReactNode {
  if (icon === null) return null;
  if (icon !== undefined) {
    return (
      <span
        data-slot="alert-icon"
        aria-hidden="true"
        className="inline-flex shrink-0"
      >
        {icon}
      </span>
    );
  }
  const IconComponent = variantIcon[variant];
  return (
    <span
      data-slot="alert-icon"
      aria-hidden="true"
      className="inline-flex shrink-0"
    >
      <IconComponent weight="duotone" aria-hidden="true" />
    </span>
  );
}

// ─── Title ────────────────────────────────────────────────────────────────────

export interface AlertTitleProps extends React.HTMLAttributes<HTMLParagraphElement> {}

function AlertTitle({
  className,
  ref,
  ...props
}: AlertTitleProps & { ref?: React.Ref<HTMLParagraphElement> }) {
  return (
    <p
      ref={ref}
      data-slot="alert-title"
      className={cn(alertTitleVariants(), className)}
      {...props}
    />
  );
}

AlertTitle.displayName = "AlertTitle";

// ─── Description ──────────────────────────────────────────────────────────────

export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

function AlertDescription({
  className,
  ref,
  ...props
}: AlertDescriptionProps & { ref?: React.Ref<HTMLParagraphElement> }) {
  return (
    <p
      ref={ref}
      data-slot="alert-description"
      className={cn(alertDescriptionVariants(), className)}
      {...props}
    />
  );
}

AlertDescription.displayName = "AlertDescription";

export {
  Alert,
  AlertTitle,
  AlertDescription,
  alertVariants,
  alertTitleVariants,
  alertDescriptionVariants,
};
