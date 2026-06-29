"use client";

import * as React from "react";

import { cn } from "../../lib/utils";

// ─── Felix DS — Figma: Molecule/SidebarFooter, node 996:5538 ─────────────────

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Primary line — typically the user's display name. Rendered with the
   * `text-sm` body style and `text-foreground`. Required.
   */
  name: React.ReactNode;
  /**
   * Optional secondary line — typically the user's email or handle. Rendered
   * with the `text-xxs` caption style and `text-muted-foreground`.
   */
  email?: React.ReactNode;
  /**
   * Optional leading slot — pass an `<Avatar />` or any other ReactNode.
   * Sits to the left of the text block, vertically centred.
   */
  avatar?: React.ReactNode;
  /**
   * Optional trailing slot — pass icons, menu triggers, etc. Sits at the
   * right edge of the row.
   */
  trailing?: React.ReactNode;
}

/**
 * **SidebarFooter** — the user/account row anchored at the bottom of a
 * `Sidebar` (or any vertical surface). Maps directly to the Figma
 * `Molecule/SidebarFooter` symbol.
 *
 * Layout:
 *
 * ```text
 * ┌─────────────────────────────────────────────┐
 * │  ⓘ  ┌─────────────┐                         │
 * │  ●  │ Felix User  │  …optional trailing slot│
 * │  ⓘ  │ user@…com   │                         │
 * └─────────────────────────────────────────────┘
 * ```
 *
 * Visuals:
 *
 * - Top border (`border-t`) so the row separates from the body above.
 * - `px-4 py-3` padding and `gap-2` between the avatar and the text block,
 *   matching Figma node `996:5538`.
 * - The text column truncates with `min-w-0` so long emails clip rather
 *   than push the row wider.
 *
 * Accessibility:
 *
 * - Renders a plain `<div>` by default. Wrap the whole row in a `<button>`
 *   / `<a>` (using a child) when the row is interactive, or pass an
 *   interactive control via the `trailing` slot.
 */
const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, name, email, avatar, trailing, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="sidebar-footer"
        className={cn(
          "flex items-center gap-2 border-t border-border",
          "bg-background px-4 py-3",
          className
        )}
        {...props}
      >
        {avatar ? (
          <div data-slot="sidebar-footer-avatar" className="shrink-0">
            {avatar}
          </div>
        ) : null}
        <div
          data-slot="sidebar-footer-content"
          className="flex min-w-0 flex-1 flex-col gap-0.5 overflow-hidden"
        >
          <span
            data-slot="sidebar-footer-name"
            className="truncate font-sans text-sm leading-tight text-foreground"
          >
            {name}
          </span>
          {email ? (
            <span
              data-slot="sidebar-footer-email"
              className="truncate font-sans text-xxs leading-display text-muted-foreground"
            >
              {email}
            </span>
          ) : null}
        </div>
        {trailing ? (
          <div data-slot="sidebar-footer-trailing" className="ml-auto shrink-0">
            {trailing}
          </div>
        ) : null}
      </div>
    );
  }
);

SidebarFooter.displayName = "SidebarFooter";

export { SidebarFooter };
