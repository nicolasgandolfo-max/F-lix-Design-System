"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

// ─── Variants (Felix DS — Figma: Organism/Sidebar, node 996:5539) ────────────

/**
 * The four visual states for `SidebarNavItem`, mapped to standard ARIA / DOM
 * signals so consumers stay in control:
 *
 * - **Default** — `text-foreground`, transparent background.
 * - **Hover** — `bg-interactive-ghost-hover` (cream `#efebe7` light / `#234343`
 *   dark — the Felix `interactive/ghost/--hover` token, matching Figma).
 * - **Active** — `aria-current="page"` → `bg-primary` + `text-primary-foreground`.
 * - **Disabled** — `aria-disabled="true"` (or the native `disabled` attribute
 *   when the item renders as a `<button>`) → `text-(--neutral-300)` and
 *   pointer events suppressed.
 *
 * The 12 px leading icon slot uses `[&_svg]:size-3` to mirror the Figma
 * "Circle" indicator.
 */
const sidebarNavItemVariants = cva(
  cn(
    "flex w-full items-center gap-2",
    "rounded-md px-3 py-1",
    "font-sans text-sm leading-tight tracking-normal",
    "text-foreground",
    "outline-none cursor-pointer transition-colors no-underline",
    "hover:bg-interactive-ghost-hover",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground",
    "data-active:bg-primary data-active:text-primary-foreground",
    "aria-disabled:pointer-events-none aria-disabled:text-(--neutral-300)",
    "disabled:pointer-events-none disabled:text-(--neutral-300)",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "[&_svg:not([class*='size-'])]:size-3"
  )
);

// ─── Root ────────────────────────────────────────────────────────────────────

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Render as a different element (e.g. `nav`, `div`). Defaults to `aside`,
   * the most semantically appropriate tag for a complementary navigation
   * region.
   * @default "aside"
   */
  as?: "aside" | "nav" | "div";
}

/**
 * **Sidebar** — a vertical navigation surface composed of an optional header
 * (logo), a flexible body of `SidebarSection` / `SidebarNavItem` blocks, and
 * an optional footer (typically a `SidebarFooter`). Maps directly to the
 * Figma `Organism/Sidebar` (node `996:5539`).
 *
 * The component is layout-only: it does **not** lock its height or width.
 * Use `className` (or wrap with a positioning element) to fit the surface
 * into your layout. Figma defaults are 220 px wide and 480 px tall, which
 * the stories reproduce.
 *
 * @example
 *
 * ```tsx
 * <Sidebar className="h-[480px] w-[220px]">
 *   <SidebarHeader>
 *     <Logo type="logotype" className="h-7" />
 *   </SidebarHeader>
 *   <SidebarBody>
 *     <SidebarSection title="Section">
 *       <SidebarNavItem href="/payments" icon={<CircleIcon />} active>
 *         Payments
 *       </SidebarNavItem>
 *       <SidebarNavItem href="/cards" icon={<CircleIcon />}>
 *         Cards
 *       </SidebarNavItem>
 *     </SidebarSection>
 *   </SidebarBody>
 *   <SidebarFooter
 *     name="Felix User"
 *     email="user@felixpago.com"
 *     avatar={<Avatar size="sm" initials="F" status="success" />}
 *   />
 * </Sidebar>
 * ```
 */
const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, as: Tag = "aside", ...props }, ref) => {
    // Cast through `any` so we can polymorphically render `aside | nav | div`
    // without forcing consumers to deal with intrinsic-element ref unions.
    const Component = Tag as React.ElementType;
    return (
      <Component
        ref={ref}
        data-slot="sidebar"
        className={cn(
          "flex flex-col overflow-hidden",
          "border border-border bg-background text-foreground",
          className
        )}
        {...props}
      />
    );
  }
);

Sidebar.displayName = "Sidebar";

// ─── Header ──────────────────────────────────────────────────────────────────

export type SidebarHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="sidebar-header"
        className={cn(
          "flex shrink-0 items-center gap-2 border-b border-border p-4",
          className
        )}
        {...props}
      />
    );
  }
);

SidebarHeader.displayName = "SidebarHeader";

// ─── Body ────────────────────────────────────────────────────────────────────

export type SidebarBodyProps = React.HTMLAttributes<HTMLDivElement>;

const SidebarBody = React.forwardRef<HTMLDivElement, SidebarBodyProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="sidebar-body"
        className={cn(
          "flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto p-2",
          className
        )}
        {...props}
      />
    );
  }
);

SidebarBody.displayName = "SidebarBody";

// ─── Section ─────────────────────────────────────────────────────────────────

export interface SidebarSectionProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /**
   * Optional section heading. Renders a `SidebarSectionTitle` above the
   * children when provided.
   */
  title?: React.ReactNode;
}

const SidebarSection = React.forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="sidebar-section"
        className={cn("flex flex-col gap-0.5", className)}
        {...props}
      >
        {title ? <SidebarSectionTitle>{title}</SidebarSectionTitle> : null}
        {children}
      </div>
    );
  }
);

SidebarSection.displayName = "SidebarSection";

// ─── SectionTitle ────────────────────────────────────────────────────────────

export type SidebarSectionTitleProps = React.HTMLAttributes<HTMLDivElement>;

const SidebarSectionTitle = React.forwardRef<
  HTMLDivElement,
  SidebarSectionTitleProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="sidebar-section-title"
      className={cn(
        "flex h-7 items-center px-3 py-1",
        "font-sans text-xxs leading-display tracking-normal",
        "text-muted-foreground",
        className
      )}
      {...props}
    />
  );
});

SidebarSectionTitle.displayName = "SidebarSectionTitle";

// ─── NavItem ─────────────────────────────────────────────────────────────────

export interface SidebarNavItemProps
  extends
    VariantProps<typeof sidebarNavItemVariants>,
    Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      "children" | "className"
    > {
  /**
   * Mark the item as the current page. Renders `aria-current="page"` and
   * the active `bg-primary` pill.
   */
  active?: boolean;
  /**
   * Disable the item. Sets `aria-disabled="true"` (or the native `disabled`
   * attribute when the item renders as a `<button>`) and suppresses pointer
   * events.
   */
  disabled?: boolean;
  /**
   * Optional 12 px leading icon. Matches the Figma "Circle" indicator.
   */
  icon?: React.ReactNode;
  /**
   * Render the consumer-provided child as the underlying element (Radix
   * `Slot` pattern). The child is responsible for its own content — typically
   * an icon plus a label — letting you wrap `next/link` (or any other custom
   * component) without losing the sidebar styling.
   *
   * ```tsx
   * <SidebarNavItem asChild active>
   *   <Link href="/payments">
   *     <CircleIcon /> Payments
   *   </Link>
   * </SidebarNavItem>
   * ```
   */
  asChild?: boolean;
  /**
   * Render a `<button>` instead of the default `<a>` when the item doesn't
   * navigate (e.g. opens a panel, signs out). Ignored when `asChild` is set.
   */
  as?: "a" | "button";
  className?: string;
  children?: React.ReactNode;
  /**
   * `type` for the underlying `<button>` when `as="button"`.
   * @default "button"
   */
  type?: "button" | "submit" | "reset";
}

const SidebarNavItem = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  SidebarNavItemProps
>(
  (
    {
      className,
      active,
      disabled,
      icon,
      children,
      asChild,
      as,
      type,
      ...props
    },
    ref
  ) => {
    const finalClassName = cn(sidebarNavItemVariants(), className);

    const sharedProps = {
      "data-slot": "sidebar-nav-item",
      "data-active": active ? "" : undefined,
      "aria-current": active ? ("page" as const) : undefined,
      "aria-disabled": disabled ? true : undefined,
      className: finalClassName,
    };

    if (asChild) {
      // Consumer brings their own element (e.g. `<Link>`) AND its content;
      // we just merge our props into it via Radix `Slot`.
      return (
        <Slot
          ref={ref as React.Ref<HTMLElement>}
          {...sharedProps}
          {...(props as Record<string, unknown>)}
        >
          {children}
        </Slot>
      );
    }

    const content = (
      <>
        {icon ? (
          <span
            data-slot="sidebar-nav-item-icon"
            className="inline-flex shrink-0"
            aria-hidden="true"
          >
            {icon}
          </span>
        ) : null}
        <span data-slot="sidebar-nav-item-label" className="flex-1 truncate">
          {children}
        </span>
      </>
    );

    if (as === "button") {
      const buttonProps =
        props as React.ButtonHTMLAttributes<HTMLButtonElement>;
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type={type ?? "button"}
          disabled={disabled}
          {...sharedProps}
          {...buttonProps}
        >
          {content}
        </button>
      );
    }

    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} {...sharedProps} {...props}>
        {content}
      </a>
    );
  }
);

SidebarNavItem.displayName = "SidebarNavItem";

// ─── Exports ─────────────────────────────────────────────────────────────────

export {
  Sidebar,
  SidebarHeader,
  SidebarBody,
  SidebarSection,
  SidebarSectionTitle,
  SidebarNavItem,
  sidebarNavItemVariants,
};
