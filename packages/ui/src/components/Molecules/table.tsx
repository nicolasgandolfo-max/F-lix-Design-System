import * as React from "react";
import { ArrowDown, ArrowUp } from "@phosphor-icons/react";

import { cn } from "../../lib/utils";

// ─── Root ────────────────────────────────────────────────────────────────────

export type TableProps = React.HTMLAttributes<HTMLTableElement>;

function Table({
  className,
  ref,
  ...props
}: TableProps & { ref?: React.Ref<HTMLTableElement> }) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-auto">
      <table
        ref={ref}
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

Table.displayName = "Table";

// ─── Header ──────────────────────────────────────────────────────────────────

export type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>;

function TableHeader({
  className,
  ref,
  ...props
}: TableHeaderProps & { ref?: React.Ref<HTMLTableSectionElement> }) {
  return (
    <thead
      ref={ref}
      data-slot="table-header"
      className={cn("bg-card [&_tr]:border-b [&_tr]:border-border", className)}
      {...props}
    />
  );
}

TableHeader.displayName = "TableHeader";

// ─── Body ────────────────────────────────────────────────────────────────────

export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

function TableBody({
  className,
  ref,
  ...props
}: TableBodyProps & { ref?: React.Ref<HTMLTableSectionElement> }) {
  return (
    <tbody
      ref={ref}
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

TableBody.displayName = "TableBody";

// ─── Footer ──────────────────────────────────────────────────────────────────

export type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement>;

function TableFooter({
  className,
  ref,
  ...props
}: TableFooterProps & { ref?: React.Ref<HTMLTableSectionElement> }) {
  return (
    <tfoot
      ref={ref}
      data-slot="table-footer"
      className={cn(
        "bg-card border-t border-border font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  );
}

TableFooter.displayName = "TableFooter";

// ─── Row ─────────────────────────────────────────────────────────────────────

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;

function TableRow({
  className,
  ref,
  ...props
}: TableRowProps & { ref?: React.Ref<HTMLTableRowElement> }) {
  return (
    <tr
      ref={ref}
      data-slot="table-row"
      className={cn(
        "border-b border-border transition-colors",
        "hover:bg-muted/50",
        "data-[state=selected]:bg-secondary",
        className
      )}
      {...props}
    />
  );
}

TableRow.displayName = "TableRow";

// ─── Head (column header cell) ───────────────────────────────────────────────

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /**
   * Visual sort indicator. Renders an `ArrowUp` (asc) or `ArrowDown` (desc)
   * to the right of the label and sets `aria-sort` accordingly.
   *
   * Pass `undefined` (default) for no indicator. This prop is **purely
   * presentational** — wiring up click-to-sort is the consumer's
   * responsibility (see Storybook `Sortable` story for an example).
   */
  sortDirection?: "asc" | "desc";
}

function TableHead({
  className,
  children,
  sortDirection,
  ref,
  ...props
}: TableHeadProps & { ref?: React.Ref<HTMLTableCellElement> }) {
  const ariaSort: React.AriaAttributes["aria-sort"] | undefined =
    sortDirection === "asc"
      ? "ascending"
      : sortDirection === "desc"
        ? "descending"
        : undefined;

  return (
    <th
      ref={ref}
      data-slot="table-head"
      data-sort={sortDirection}
      aria-sort={ariaSort}
      className={cn(
        "h-8 px-2 text-left align-middle",
        "text-xs font-semibold tracking-[0.25px] text-accent-foreground",
        "transition-colors data-[state=selected]:bg-secondary",
        sortDirection !== undefined && "cursor-pointer select-none",
        className
      )}
      {...props}
    >
      {sortDirection !== undefined ? (
        <span className="flex items-center justify-between gap-1">
          <span className="min-w-0 truncate">{children}</span>
          {sortDirection === "asc" ? (
            <ArrowUp
              size={14}
              weight="regular"
              aria-hidden="true"
              data-slot="table-head-sort-icon"
              className="text-muted-foreground"
            />
          ) : (
            <ArrowDown
              size={14}
              weight="regular"
              aria-hidden="true"
              data-slot="table-head-sort-icon"
              className="text-muted-foreground"
            />
          )}
        </span>
      ) : (
        children
      )}
    </th>
  );
}

TableHead.displayName = "TableHead";

// ─── Cell ────────────────────────────────────────────────────────────────────

export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;

function TableCell({
  className,
  ref,
  ...props
}: TableCellProps & { ref?: React.Ref<HTMLTableCellElement> }) {
  return (
    <td
      ref={ref}
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle transition-colors",
        "text-xs tracking-[0.25px] text-foreground",
        // Cell-level selected: tan tint + semibold emphasis (matches the
        // Figma "selected cell" combo where bg-secondary always pairs
        // with font-semibold).
        "data-[state=selected]:bg-secondary data-[state=selected]:font-semibold",
        className
      )}
      {...props}
    />
  );
}

TableCell.displayName = "TableCell";

// ─── Caption ─────────────────────────────────────────────────────────────────

export type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>;

function TableCaption({
  className,
  ref,
  ...props
}: TableCaptionProps & { ref?: React.Ref<HTMLTableCaptionElement> }) {
  return (
    <caption
      ref={ref}
      data-slot="table-caption"
      className={cn("mt-4 text-xs text-secondary", className)}
      {...props}
    />
  );
}

TableCaption.displayName = "TableCaption";

// ─── Exports ─────────────────────────────────────────────────────────────────

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};
