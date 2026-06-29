"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Slot, Slottable } from "@radix-ui/react-slot";
import {
  CheckIcon,
  MapPinSimpleAreaIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";
import { Badge, type BadgeProps } from "../Atoms/badge";
import { Separator } from "../Atoms/separator";

type BadgeVariant = NonNullable<BadgeProps["variant"]>;

// ─── Shared variants ──────────────────────────────────────────────────────────

/**
 * Shared root styles for `ChoiceCard` (radio) and `ChoiceCardLink`
 * (navigation). Both surfaces rely on the `group` + `data-state` /
 * `data-disabled` attributes so the inner indicator/content styles stay
 * identical across variants.
 *
 * Three layout variants per Figma node `682:15286`:
 *
 * - `white` — horizontal: `[icon][title + description + badge][indicator]`
 * - `primary` — horizontal, full turquoise card (same shape as white)
 * - `compress` — vertical: `[avatar | title + address | indicator]`
 *   stacked above a separator and a `[pin · distance · status][eta]` row.
 *   Use this for things like "pick a store" / "pick a location" pickers.
 */
const choiceCardVariants = cva(
  cn(
    "group relative text-left",
    "border-solid",
    "transition-colors cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed"
  ),
  {
    variants: {
      variant: {
        white: cn(
          "flex w-full items-center gap-3",
          "border-(length:--border-width-medium)",
          "bg-background border-border",
          // Selected (Figma node 1033-8355): turquoise outline + soft glow
          // halo, mirroring the existing `compress` variant. Border recolors
          // to `interactive-primary-hover` so the very edge reads turquoise.
          // Halo uses the `selection` shadow token (--shadow-selection).
          "data-[state=checked]:border-interactive-primary-hover",
          "data-[state=checked]:shadow-selection",
          // Disabled overrides — suppress the selection halo when disabled
          // so a disabled card never reads as "active".
          "data-disabled:bg-muted data-disabled:border-muted",
          "[&[data-disabled][data-state=checked]]:border-muted",
          "[&[data-disabled][data-state=checked]]:shadow-none"
        ),
        primary: cn(
          "flex w-full items-center gap-3",
          "border-(length:--border-width-medium)",
          "bg-primary border-primary",
          "data-[state=checked]:bg-interactive-primary-hover data-[state=checked]:border-interactive-primary-hover",
          "data-disabled:bg-interactive-primary-disabled data-disabled:border-interactive-primary-disabled data-disabled:opacity-50"
        ),
        compress: cn(
          "flex w-full flex-col",
          "border-(length:--border-width-thin)",
          "bg-background border-border",
          // Selected (Figma node 682:15286): 2 px turquoise outline + soft
          // glow halo. Using `outline` (not a thicker `border`) avoids
          // shifting adjacent cards: a 1→2 px border change would grow the
          // card by 2 px under `box-sizing: border-box`. Outline lives
          // outside the box so dimensions stay identical between states.
          // The 1 px base border itself just recolors to primary so the
          // very edge reads as turquoise too.
          "data-[state=checked]:border-interactive-primary-hover",
          "data-[state=checked]:outline-2",
          "data-[state=checked]:outline-interactive-primary-hover",
          "data-[state=checked]:shadow-selection",
          // Disabled: muted plate, subtle border. When disabled, suppress
          // the selection treatment entirely — a disabled card should never
          // read as "active", even if `selected` is true.
          "data-disabled:bg-muted data-disabled:border-border",
          "[&[data-disabled][data-state=checked]]:border-border",
          "[&[data-disabled][data-state=checked]]:outline-none",
          "[&[data-disabled][data-state=checked]]:shadow-none"
        ),
      },
      size: {
        sm: "rounded-md",
        md: "rounded-md",
      },
    },
    compoundVariants: [
      // White / primary: padding scales with size. MD uses `px-4 py-6` to
      // match Figma node 1033-8355 (16px horizontal, 24px vertical) — using
      // a uniform `p-6` would over-pad horizontally given the icon + content
      // + indicator row already has internal `gap-3`.
      { variant: "white", size: "sm", className: "p-3" },
      { variant: "white", size: "md", className: "px-4 py-6 rounded-xl" },
      { variant: "primary", size: "sm", className: "p-3" },
      { variant: "primary", size: "md", className: "px-4 py-6 rounded-xl" },
      // Compress: tighter padding, both sizes use rounded-md
      { variant: "compress", size: "sm", className: "p-2 gap-2" },
      { variant: "compress", size: "md", className: "p-3 gap-2" },
    ],
    defaultVariants: { variant: "white", size: "sm" },
  }
);

type ChoiceCardVariant = NonNullable<
  VariantProps<typeof choiceCardVariants>["variant"]
>;

type ChoiceCardSize = NonNullable<
  VariantProps<typeof choiceCardVariants>["size"]
>;

// ─── Internal parts (shared between ChoiceCard & ChoiceCardLink) ─────────────

function ChoiceCardIcon({
  icon,
  size,
}: {
  icon?: React.ReactNode;
  size: ChoiceCardSize;
}) {
  if (!icon) return null;
  return (
    <span
      aria-hidden
      data-slot="choice-card-icon"
      className={cn(
        "shrink-0 flex items-center justify-center group-data-disabled:opacity-50",
        size === "md" ? "size-12" : "size-8"
      )}
    >
      {icon}
    </span>
  );
}

interface ChoiceCardContentProps {
  title: string;
  description?: string;
  variant: ChoiceCardVariant;
  size: ChoiceCardSize;
  badge?: string;
  badgeIcon?: React.ReactNode;
  badgeVariant?: BadgeVariant;
  details?: string[];
}

// Each card variant has a natural "matching" Badge variant per Figma:
//   - white card → lime pill (`secondary`) — Badge.bg-accent / text-foreground
//   - primary card → beige pill with turquoise text (`link`) —
//     Badge.bg-background / text-primary
// Consumers can always override via the explicit `badgeVariant` prop.
function defaultBadgeVariant(variant: ChoiceCardVariant): BadgeVariant {
  return variant === "primary" ? "link" : "secondary";
}

function ChoiceCardContent({
  title,
  description,
  variant,
  size,
  badge,
  badgeIcon,
  badgeVariant,
  details,
}: ChoiceCardContentProps) {
  const isPrimary = variant === "primary";
  const isWhite = variant === "white";
  const resolvedBadgeVariant = badgeVariant ?? defaultBadgeVariant(variant);
  // Render the pill whenever the consumer supplies either a label or a
  // standalone icon. This supports the three Figma badge shapes:
  //   1. text-only       — `badge="Faster"`
  //   2. icon + text     — `badge="Open"  badgeIcon={<ThumbsUp />}`
  //   3. icon-only       — `badgeIcon={<ThumbsUp />}` (no `badge`)
  const hasBadge = Boolean(badge) || Boolean(badgeIcon);
  // The detail-tag row is white-only per Figma node 1033-8355.
  const showDetails = isWhite && Array.isArray(details) && details.length > 0;
  return (
    <span
      data-slot="choice-card-content"
      className="flex flex-1 flex-col gap-1 min-w-0 overflow-hidden"
    >
      <span
        data-slot="choice-card-title-row"
        className="flex items-center gap-2 min-w-0 w-full"
      >
        <span
          className={cn(
            "font-semibold text-base leading-tight text-foreground truncate",
            !isPrimary && "group-data-disabled:text-secondary"
          )}
        >
          {title}
        </span>
        {hasBadge && (
          <Badge
            variant={resolvedBadgeVariant}
            shape="badge"
            data-slot="choice-card-badge"
            iconLeft={badgeIcon}
          >
            {badge}
          </Badge>
        )}
      </span>
      {description && (
        <span
          className={cn(
            "font-sans text-xs leading-tight tracking-caption",
            !isPrimary && "text-secondary group-data-disabled:text-secondary",
            isPrimary &&
              "text-primary-foreground group-data-[state=checked]:text-secondary-foreground"
          )}
        >
          {description}
        </span>
      )}
      {showDetails && (
        <span
          data-slot="choice-card-details"
          className="flex flex-wrap items-center gap-1 mt-1"
        >
          {details!.map((label, i) => (
            <span
              key={`${label}-${i}`}
              data-slot="choice-card-detail"
              className={cn(
                "inline-flex items-center justify-center shrink-0 whitespace-nowrap",
                "rounded-full border border-border bg-transparent",
                "px-2 pt-1 pb-0.5",
                "font-sans leading-tight tracking-caption text-foreground",
                size === "md" ? "text-xs" : "text-xxs",
                "group-data-disabled:text-secondary group-data-disabled:opacity-80"
              )}
            >
              {label}
            </span>
          ))}
        </span>
      )}
    </span>
  );
}

function ChoiceCardIndicator({
  variant,
  size,
}: {
  variant: ChoiceCardVariant;
  size: ChoiceCardSize;
}) {
  if (variant === "white") return <WhiteIndicator size={size} />;
  if (variant === "compress") return <CompressIndicator size={size} />;
  return <PrimaryBadge size={size} />;
}

/**
 * Radio indicator for the White variant.
 *
 * - Unselected: hollow circle with a 1.5px border.
 * - Selected: filled turquoise circle with a dark check (per Figma node
 *   1033-8355) — replaces the older dark dot. Size scales with the card:
 *   20px on `sm`, 24px on `md`.
 * - Disabled: hidden entirely so the disabled card never reads as active.
 */
function WhiteIndicator({ size }: { size: ChoiceCardSize }) {
  const isMd = size === "md";
  return (
    <span
      aria-hidden
      data-slot="choice-card-indicator"
      data-size={size}
      className={cn(
        "shrink-0 flex items-center justify-center",
        "rounded-full border-(length:--border-width-medium) border-solid",
        "transition-colors",
        "border-border",
        "group-data-[state=checked]:bg-primary group-data-[state=checked]:border-primary",
        "group-data-disabled:hidden",
        isMd ? "size-6" : "size-5"
      )}
    >
      <CheckIcon
        size={isMd ? 12 : 10}
        weight="bold"
        className={cn(
          "text-foreground",
          "opacity-0 group-data-[state=checked]:opacity-100",
          "transition-opacity"
        )}
      />
    </span>
  );
}

/**
 * Selected-state indicator for the Primary variant. Hidden (opacity-0) by
 * default and when disabled; fades in when `data-state=checked`.
 *
 * Per Figma node `682-15286`, the two sizes render differently:
 *   - `sm` → lime pill (`bg-accent`) with dark check. Reads like a small tag.
 *   - `md` → beige circle (`bg-background`) with bold dark check. Reads like
 *     a white-on-turquoise "confirm" chip against the turquoise card.
 */
function PrimaryBadge({ size }: { size: ChoiceCardSize }) {
  const isMd = size === "md";
  return (
    <span
      aria-hidden
      data-slot="choice-card-indicator"
      data-size={size}
      className={cn(
        "shrink-0 flex items-center justify-center",
        "rounded-full",
        "transition-all",
        "opacity-0",
        "group-data-[state=checked]:opacity-100",
        "group-data-disabled:opacity-0!",
        isMd ? "size-8 bg-background" : "size-5 bg-accent"
      )}
    >
      <CheckIcon
        size={isMd ? 14 : 10}
        weight="bold"
        className={isMd ? "text-foreground" : "text-accent-foreground"}
      />
    </span>
  );
}

/**
 * Selected-state indicator for the Compress variant — a small turquoise
 * circle with a dark check, sitting in the top-right of the header row.
 * Hidden by default; fades in when `data-state=checked`. Hidden when
 * disabled.
 */
function CompressIndicator({ size }: { size: ChoiceCardSize }) {
  const isMd = size === "md";
  return (
    <span
      aria-hidden
      data-slot="choice-card-indicator"
      data-size={size}
      className={cn(
        "shrink-0 flex items-center justify-center self-start",
        "rounded-full bg-primary",
        "transition-opacity",
        "opacity-0 group-data-[state=checked]:opacity-100",
        "group-data-disabled:hidden",
        isMd ? "size-6" : "size-5"
      )}
    >
      <CheckIcon
        size={isMd ? 12 : 10}
        weight="bold"
        className="text-primary-foreground"
      />
    </span>
  );
}

// ─── Delete-option button (Figma node 1033-8355, white variant) ──────────────

interface ChoiceCardDeleteButtonProps {
  onDelete: () => void;
  /** Accessible label for screen readers. Defaults to "Delete". */
  label?: string;
  /** Extra positioning / layout classes applied to the root span. */
  className?: string;
}

/**
 * Round destructive icon affordance rendered alongside the indicator on a
 * white `ChoiceCard` (or `ChoiceCardLink`) when the consumer supplies an
 * `onDelete` handler. Visually mirrors the design system's `IconButton`
 * `danger × sm` variant (32×32, `bg-interactive-danger-active`, 14px
 * icon).
 *
 * Rendered as a `<span role="button">` rather than a real `<button>` to
 * avoid the nested-interactive a11y violation: the surrounding card is
 * itself either a Radix radio `<button>` or an `<a>`, and HTML forbids
 * nesting interactive controls. We replicate the keyboard semantics
 * (Enter / Space activates, Tab navigates) by hand.
 *
 * Activation is intercepted via `stopPropagation` + `preventDefault`
 * so tapping the trash never selects the radio or triggers navigation.
 */
function ChoiceCardDeleteButton({
  onDelete,
  label = "Delete",
  className,
}: ChoiceCardDeleteButtonProps) {
  const handleActivate = (
    event:
      | React.MouseEvent<HTMLSpanElement>
      | React.KeyboardEvent<HTMLSpanElement>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    onDelete();
  };
  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={label}
      data-slot="choice-card-delete"
      className={cn(
        "inline-flex items-center justify-center shrink-0",
        "size-8 rounded-full cursor-pointer",
        "bg-interactive-danger-active text-(--orange-900)",
        "hover:bg-interactive-danger-hover",
        "transition-colors",
        "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      onClick={handleActivate}
      onPointerDown={(event) => {
        // Radix RadioGroup selects on pointer-down; prevent that here so
        // the click handler above can run without flipping the radio.
        event.stopPropagation();
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          handleActivate(event);
        }
      }}
    >
      <TrashIcon weight="duotone" />
    </span>
  );
}

// ─── Compress variant body ───────────────────────────────────────────────────

/**
 * Visual tone of the open/closed-style status badge in `variant="compress"`.
 *
 * - `open` — green pill (`--status-success` background) with dark text.
 * - `closed` — soft orange pill with destructive (orange) text.
 */
type ChoiceCardStatusTone = "open" | "closed";

interface ChoiceCardStatus {
  /** Pill text — e.g. "Abierto", "Cerrado", "24/7", etc. */
  label: string;
  /**
   * Visual tone. Defaults to `"open"` (green).
   *
   * Ignored if `icon` is `false`.
   */
  tone?: ChoiceCardStatusTone;
  /**
   * Optional override for the small leading icon. Pass `false` to omit it.
   * Defaults to a filled circle that matches the tone.
   */
  icon?: React.ReactNode | false;
}

function ChoiceCardStatusBadge({ status }: { status: ChoiceCardStatus }) {
  const tone = status.tone ?? "open";
  const isClosed = tone === "closed";
  const showIcon = status.icon !== false;
  return (
    <span
      data-slot="choice-card-status"
      data-tone={tone}
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full",
        "text-xs font-sans leading-tight tracking-caption shrink-0 whitespace-nowrap",
        isClosed
          ? "bg-(--orange-100) text-destructive"
          : "bg-status-success text-foreground",
        "group-data-disabled:opacity-60"
      )}
    >
      {showIcon &&
        (status.icon ?? (
          <span
            aria-hidden
            className={cn(
              "block size-2 rounded-full",
              isClosed ? "bg-destructive" : "bg-foreground/80"
            )}
          />
        ))}
      <span className="truncate">{status.label}</span>
    </span>
  );
}

interface ChoiceCardCompressBodyProps {
  size: ChoiceCardSize;
  icon?: React.ReactNode;
  title: string;
  description?: string;
  distance?: string;
  status?: ChoiceCardStatus;
  estimatedTime?: string;
  showIndicator: boolean;
}

function ChoiceCardCompressBody({
  size,
  icon,
  title,
  description,
  distance,
  status,
  estimatedTime,
  showIndicator,
}: ChoiceCardCompressBodyProps) {
  const isMd = size === "md";
  const hasFooter = distance != null || status != null || estimatedTime != null;
  return (
    <>
      <div
        data-slot="choice-card-compress-header"
        className="flex items-start gap-3 w-full"
      >
        {icon && (
          <span
            aria-hidden
            data-slot="choice-card-avatar"
            className={cn(
              "shrink-0 flex items-center justify-center overflow-hidden",
              isMd ? "size-10 rounded-md" : "size-8 rounded-sm",
              "group-data-disabled:opacity-50"
            )}
          >
            {icon}
          </span>
        )}
        <span className="flex flex-1 flex-col gap-1 min-w-0 overflow-hidden">
          <span
            className={cn(
              "font-semibold text-foreground truncate leading-tight",
              isMd ? "text-base" : "text-sm",
              "group-data-disabled:text-secondary"
            )}
          >
            {title}
          </span>
          {description && (
            <span
              className={cn(
                "font-sans text-xs leading-tight tracking-caption text-secondary truncate",
                "group-data-disabled:text-secondary"
              )}
            >
              {description}
            </span>
          )}
        </span>
        {showIndicator && (
          <ChoiceCardIndicator variant="compress" size={size} />
        )}
      </div>

      {hasFooter && (
        <>
          <Separator />
          <div
            data-slot="choice-card-compress-footer"
            className="flex items-center justify-between gap-2 w-full"
          >
            <div className="flex items-center gap-1 min-w-0">
              {distance != null && (
                <>
                  <MapPinSimpleAreaIcon
                    aria-hidden
                    size={18}
                    weight="duotone"
                    className={cn(
                      "shrink-0 text-foreground",
                      "group-data-disabled:text-secondary"
                    )}
                  />
                  <span
                    className={cn(
                      "font-semibold text-xs tracking-caption text-foreground whitespace-nowrap",
                      "group-data-disabled:text-secondary"
                    )}
                  >
                    {distance}
                  </span>
                </>
              )}
              {status && <ChoiceCardStatusBadge status={status} />}
            </div>
            {estimatedTime != null && (
              <span
                className={cn(
                  "font-sans text-xs leading-tight tracking-caption text-secondary whitespace-nowrap shrink-0",
                  "group-data-disabled:text-secondary"
                )}
              >
                {estimatedTime}
              </span>
            )}
          </div>
        </>
      )}
    </>
  );
}

// ─── ChoiceCardGroup ──────────────────────────────────────────────────────────

export interface ChoiceCardGroupProps extends React.ComponentProps<
  typeof RadioGroupPrimitive.Root
> {
  /** Controlled selected value. */
  value?: string;
  /** Called when the user selects a card. */
  onValueChange?: (value: string) => void;
  /** Initial value for uncontrolled usage. */
  defaultValue?: string;
  /** Disables all cards in the group. */
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Wraps a set of `ChoiceCard` items in a managed radio group.
 * Handles keyboard navigation and selection state automatically.
 */
function ChoiceCardGroup({
  className,
  children,
  ...props
}: ChoiceCardGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="choice-card-group"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Root>
  );
}

ChoiceCardGroup.displayName = "ChoiceCardGroup";

// ─── ChoiceCard (radio) ───────────────────────────────────────────────────────

export interface ChoiceCardProps
  extends
    Omit<
      React.ComponentProps<typeof RadioGroupPrimitive.Item>,
      "children" | "asChild"
    >,
    VariantProps<typeof choiceCardVariants> {
  /** The value this card represents in the radio group. */
  value: string;
  /** Main label shown in semibold. */
  title: string;
  /**
   * Optional secondary caption text.
   *
   * - `white`/`primary` → small description below the title.
   * - `compress` → address-style subtitle below the title.
   */
  description?: string;
  /**
   * Icon shown on the left side.
   *
   * - `white`/`primary` → centered in a 32 px / 48 px slot.
   * - `compress` → rendered as a colored avatar tile (32 px square `sm`,
   *   40 px `md`). Pass a fully-styled element (e.g. a coloured square with
   *   white initials) — the wrapper only enforces sizing and clipping.
   */
  icon?: React.ReactNode;
  /**
   * Optional short label rendered as a pill to the right of the title.
   * Only applies to `white` and `primary` variants.
   */
  badge?: string;
  /**
   * Optional icon rendered before the badge label. Sized to ~8px by the
   * `Badge` atom; pass any Phosphor (or compatible) icon. Combine with
   * `badge` for icon + text, or omit `badge` for an icon-only pill (e.g.
   * the thumbs-up promo tag in Figma node 682-15286).
   */
  badgeIcon?: React.ReactNode;
  /**
   * Badge pill color. Defaults to the natural match for the card `variant`:
   * - `variant="white"` → `"secondary"` (lime + dark text).
   * - `variant="primary"` → `"link"` (beige + turquoise text).
   * Override to deviate (e.g. Figma's `white + disabled + md` row uses `"link"`).
   */
  badgeVariant?: BadgeVariant;
  /**
   * Visual size.
   * - `"sm"` (default) — compact card.
   * - `"md"` — larger card with bigger paddings, radius, and icon slot.
   */
  size?: "sm" | "md";
  /** Disables this individual card regardless of group-level disabled. */
  disabled?: boolean;
  /** Extra class on the card element. */
  className?: string;
  /**
   * Optional row of small outlined chips rendered below the description on
   * the `white` variant only (per Figma node 1033-8355). Use for
   * lightweight feature flags / qualifiers like ["Faster", "Free", "New"].
   * Ignored on `primary` and `compress`.
   */
  details?: string[];
  /**
   * When provided, renders a destructive (orange) trash button alongside
   * the radio indicator on **non-disabled, white** cards. Use for
   * "saved item" lists where each option also exposes a delete action
   * (e.g. saved payment methods) — the user can still remove a card even
   * after selecting it.
   *
   * The handler runs with `stopPropagation` + `preventDefault` so clicking
   * the trash never selects the underlying radio.
   */
  onDelete?: () => void;
  /** Accessible label for the delete button. Defaults to `"Delete"`. */
  deleteLabel?: string;

  // ── Compress-only fields (ignored on other variants) ────────────────────

  /**
   * `compress` only — distance text shown next to the map-pin icon in the
   * footer (e.g. "0.5 mi", "320 m").
   */
  distance?: string;
  /**
   * `compress` only — open/closed-style pill in the footer.
   */
  status?: ChoiceCardStatus;
  /**
   * `compress` only — right-aligned ETA text in the footer (e.g. "~2 min.").
   */
  estimatedTime?: string;
}

/**
 * A selectable card powered by `@radix-ui/react-radio-group`.
 *
 * Use this when the user picks **one option among several** and the
 * selection is meaningful state — e.g. "pick a plan" on a landing page,
 * a filter toggle, a wizard step, a payment method, a view switcher. No
 * `<form>` element is required; the selection is just client state you
 * read from `onValueChange`.
 *
 * Must be rendered inside a `ChoiceCardGroup` — that's a technical
 * requirement of the underlying Radix `RadioGroup` (the group provides
 * keyboard navigation and selection context).
 *
 * If each card should **navigate** on click, use `ChoiceCardLink`
 * instead. Radio semantics don't apply to navigation.
 *
 * Three visual variants:
 *
 * - `white` (default) — horizontal card with icon, title + description, and a
 *   radio-circle indicator on the right.
 * - `primary` — same shape, full-turquoise styling, with a lime/beige check
 *   chip on the right when selected.
 * - `compress` — vertically stacked: a header row with avatar + title +
 *   address (and selected indicator), then a separator, then a footer row
 *   with `distance`, `status` pill, and right-aligned `estimatedTime`.
 *
 * Figma reference: node 682-15286.
 */
function ChoiceCard({
  value,
  title,
  description,
  icon,
  badge,
  badgeIcon,
  badgeVariant,
  variant,
  size,
  disabled,
  className,
  details,
  onDelete,
  deleteLabel,
  distance,
  status,
  estimatedTime,
  ...rest
}: ChoiceCardProps) {
  const resolvedVariant: ChoiceCardVariant = variant ?? "white";
  const resolvedSize: ChoiceCardSize = size ?? "sm";
  const isCompress = resolvedVariant === "compress";
  // Delete affordance: white variant only, non-disabled. Per Figma
  // node 1033-8355 the trash button is rendered alongside the radio
  // indicator (in all three states) — not in place of it. Hiding the
  // trash on selected would leave the user no way to remove an
  // already-picked saved item, which is exactly the use case this
  // affordance exists for.
  const showDelete = !!onDelete && resolvedVariant === "white" && !disabled;

  const item = (
    <RadioGroupPrimitive.Item
      value={value}
      disabled={disabled}
      data-slot="choice-card"
      data-variant={resolvedVariant}
      data-size={resolvedSize}
      className={cn(
        choiceCardVariants({ variant: resolvedVariant, size: resolvedSize }),
        // When the trash sibling is rendered, reserve right padding for it
        // so the indicator and trash don't visually collide. The trash
        // floats over this padded zone via absolute positioning on the
        // wrapper.
        showDelete && "pr-13",
        className
      )}
      {...rest}
    >
      {isCompress ? (
        <ChoiceCardCompressBody
          size={resolvedSize}
          icon={icon}
          title={title}
          description={description}
          distance={distance}
          status={status}
          estimatedTime={estimatedTime}
          showIndicator
        />
      ) : (
        <>
          <ChoiceCardIcon icon={icon} size={resolvedSize} />
          <ChoiceCardContent
            title={title}
            description={description}
            variant={resolvedVariant}
            size={resolvedSize}
            badge={badge}
            badgeIcon={badgeIcon}
            badgeVariant={badgeVariant}
            details={details}
          />
          <ChoiceCardIndicator variant={resolvedVariant} size={resolvedSize} />
        </>
      )}
    </RadioGroupPrimitive.Item>
  );

  // When `onDelete` is provided we render the trash as a sibling of the
  // radio item — never as a descendant. Nesting an interactive control
  // inside another (button-in-button) is invalid HTML and a WCAG
  // `nested-interactive` violation. The wrapper `<div>` is purely
  // structural; all card visuals (border, shadow, focus ring) stay on
  // the radio item itself.
  if (showDelete) {
    return (
      <div data-slot="choice-card-wrapper" className="relative">
        {item}
        <ChoiceCardDeleteButton
          onDelete={onDelete!}
          label={deleteLabel}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        />
      </div>
    );
  }

  return item;
}

ChoiceCard.displayName = "ChoiceCard";

// ─── ChoiceCardLink (navigational) ────────────────────────────────────────────

export interface ChoiceCardLinkProps
  extends
    Omit<React.ComponentProps<"a">, "children">,
    VariantProps<typeof choiceCardVariants> {
  /** Main label shown in semibold. */
  title: string;
  /** Optional secondary caption text. */
  description?: string;
  /** Icon shown on the left side. */
  icon?: React.ReactNode;
  /**
   * Optional short label rendered as a pill to the right of the title.
   */
  badge?: string;
  /**
   * Optional icon rendered before the badge label. Sized to ~8px by the
   * `Badge` atom; pass any Phosphor (or compatible) icon. Combine with
   * `badge` for icon + text, or omit `badge` for an icon-only pill.
   */
  badgeIcon?: React.ReactNode;
  /**
   * Badge pill color. Defaults to the natural match for the card `variant`:
   * - `variant="white"` → `"secondary"` (lime + dark text).
   * - `variant="primary"` → `"link"` (beige + turquoise text).
   * Override to deviate (e.g. Figma's `white + disabled + md` row uses `"link"`).
   */
  badgeVariant?: BadgeVariant;
  /**
   * Visual size.
   * - `"sm"` (default) — compact card.
   * - `"md"` — larger card.
   */
  size?: "sm" | "md";
  /**
   * Merges props onto the child element (e.g. Next.js `<Link>` or
   * react-router `<Link>`) via `@radix-ui/react-slot`. When `true`, provide a
   * single element as children — `title`, `description`, `icon` still come
   * from props and are injected into the child.
   */
  asChild?: boolean;
  /**
   * Renders the "selected" / "current" indicator.
   * Useful for highlighting the active route in a navigation list.
   * Defaults to `false`.
   */
  selected?: boolean;
  /**
   * Disables navigation: removes the element from tab order, applies the
   * disabled visual state, and sets `aria-disabled`. Note: for a truly
   * non-navigable disabled link, omit `href` at the call site as well.
   */
  disabled?: boolean;
  /**
   * Only used when `asChild` is true — the single element (e.g. `<NextLink />`)
   * to render as the root. Leave unset otherwise.
   */
  children?: React.ReactNode;
  /**
   * Optional row of small outlined chips rendered below the description on
   * the `white` variant only (per Figma node 1033-8355). Use for
   * lightweight feature flags / qualifiers like ["Faster", "Free", "New"].
   * Ignored on `primary` and `compress`.
   */
  details?: string[];
  /**
   * When provided, renders a destructive (orange) trash button alongside
   * the selected indicator on **non-disabled, white** cards. Use for
   * navigation lists where each item also exposes a delete action (e.g.
   * saved payment methods) — the user can still remove a row even when
   * it's the active route.
   *
   * The handler runs with `stopPropagation` + `preventDefault` so clicking
   * the trash never triggers the parent link's navigation.
   */
  onDelete?: () => void;
  /** Accessible label for the delete button. Defaults to `"Delete"`. */
  deleteLabel?: string;

  // ── Compress-only fields (ignored on other variants) ────────────────────

  /**
   * `compress` only — distance text shown next to the map-pin icon in the
   * footer (e.g. "0.5 mi", "320 m").
   */
  distance?: string;
  /**
   * `compress` only — open/closed-style pill in the footer.
   */
  status?: ChoiceCardStatus;
  /**
   * `compress` only — right-aligned ETA text in the footer (e.g. "~2 min.").
   */
  estimatedTime?: string;
}

/**
 * A navigation card with the same visual language as `ChoiceCard`, but
 * rendered as an `<a>` (or via `asChild`, whatever framework `Link` the
 * consumer uses). Use this when clicking the card should navigate.
 *
 * ```tsx
 * // Plain anchor
 * <ChoiceCardLink href="/checkout/card" title="Credit card" icon={<Card />} />
 *
 * // With Next.js Link
 * <ChoiceCardLink asChild title="Credit card" icon={<Card />}>
 *   <NextLink href="/checkout/card" />
 * </ChoiceCardLink>
 * ```
 *
 * For form-selection semantics (with arrow-key navigation between options),
 * use `ChoiceCard` inside a `ChoiceCardGroup` instead.
 */
function ChoiceCardLink({
  title,
  description,
  icon,
  badge,
  badgeIcon,
  badgeVariant,
  variant,
  size,
  asChild = false,
  selected = false,
  disabled = false,
  className,
  children,
  details,
  onDelete,
  deleteLabel,
  distance,
  status,
  estimatedTime,
  ...rest
}: ChoiceCardLinkProps) {
  const Comp = asChild ? Slot : "a";
  const resolvedVariant: ChoiceCardVariant = variant ?? "white";
  const resolvedSize: ChoiceCardSize = size ?? "sm";
  const isCompress = resolvedVariant === "compress";

  // Delete affordance mirrors `ChoiceCard`: white variant only, not
  // disabled. Rendered alongside the indicator (per Figma node
  // 1033-8355) — both controls coexist so a selected/active item can
  // still be removed.
  const showDelete = !!onDelete && resolvedVariant === "white" && !disabled;

  // NOTE: `Comp` may be `Slot` (when `asChild`), which expects its children
  // to be direct React elements — wrapping them in a Fragment breaks the
  // composition. Each branch therefore lists its children directly inside
  // `<Comp>` rather than via a Fragment.
  const rootProps = {
    "data-slot": "choice-card-link",
    "data-variant": resolvedVariant,
    "data-size": resolvedSize,
    "data-state": selected ? "checked" : "unchecked",
    "data-disabled": disabled ? "" : undefined,
    "aria-disabled": disabled || undefined,
    tabIndex: disabled ? -1 : undefined,
    className: cn(
      choiceCardVariants({ variant: resolvedVariant, size: resolvedSize }),
      disabled && "pointer-events-none",
      // Reserve right-side space for the trash sibling (rendered on the
      // wrapper, not inside the link, to avoid nesting interactive
      // controls — see render note below).
      showDelete && "pr-13",
      className
    ),
    ...rest,
  };

  if (isCompress) {
    return (
      <Comp {...rootProps}>
        <ChoiceCardCompressBody
          size={resolvedSize}
          icon={icon}
          title={title}
          description={description}
          distance={distance}
          status={status}
          estimatedTime={estimatedTime}
          showIndicator={selected}
        />
        <Slottable>{children}</Slottable>
      </Comp>
    );
  }

  const link = (
    <Comp {...rootProps}>
      <ChoiceCardIcon icon={icon} size={resolvedSize} />
      <ChoiceCardContent
        title={title}
        description={description}
        variant={resolvedVariant}
        size={resolvedSize}
        badge={badge}
        badgeIcon={badgeIcon}
        badgeVariant={badgeVariant}
        details={details}
      />
      {/*
        When asChild=true, `children` is the element being cloned by Slot
        (e.g. NextLink). Slottable marks it as the target; the other
        siblings (icon, content, indicator) get injected as its children.
        When asChild=false, `children` is typically undefined and this
        renders nothing, which is the intended behavior.
      */}
      <Slottable>{children}</Slottable>
      <ChoiceCardIndicator variant={resolvedVariant} size={resolvedSize} />
    </Comp>
  );

  // When `onDelete` is provided we render the trash as a sibling of the
  // link element — never as a descendant. Putting an interactive control
  // inside an `<a>` (or any other interactive ancestor) violates the
  // WCAG `nested-interactive` rule. The wrapper `<div>` is purely
  // structural; all card visuals stay on the link itself.
  if (showDelete) {
    return (
      <div data-slot="choice-card-link-wrapper" className="relative">
        {link}
        <ChoiceCardDeleteButton
          onDelete={onDelete!}
          label={deleteLabel}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        />
      </div>
    );
  }

  return link;
}

ChoiceCardLink.displayName = "ChoiceCardLink";

export type { ChoiceCardStatus, ChoiceCardStatusTone };
export { ChoiceCard, ChoiceCardGroup, ChoiceCardLink, choiceCardVariants };
