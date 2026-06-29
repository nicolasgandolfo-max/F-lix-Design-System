import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Checkbox,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@felix/ui";

/**
 * **Table** — Accessible, semantic data table primitives that mirror the
 * Felix Figma spec (`bg-card` headers, `border-b border-border` row
 * dividers, `text-xs tracking-[0.25px]` typography, `bg-secondary` selected
 * rows). Built on plain HTML `<table>` / `<thead>` / `<tbody>` / `<tfoot>` /
 * `<tr>` / `<th>` / `<td>` / `<caption>` for full screen-reader support.
 *
 * **Usage**
 * - Compose `Table` + `TableHeader` + `TableBody` (+ optional
 *   `TableFooter`, `TableCaption`).
 * - Pass `sortDirection="asc" | "desc"` on a `TableHead` to render a sort
 *   indicator and set `aria-sort`. Click-to-sort wiring is up to the
 *   consumer — see the `Sortable` story for a typical pattern.
 * - Mark a row selected with `data-state="selected"` to apply the tan
 *   row tint (matches Figma's selected variant).
 */
const meta = {
  title: "Components/Molecules/Table",
  component: Table,
  subcomponents: {
    TableHeader: TableHeader as React.ComponentType<unknown>,
    TableBody: TableBody as React.ComponentType<unknown>,
    TableFooter: TableFooter as React.ComponentType<unknown>,
    TableRow: TableRow as React.ComponentType<unknown>,
    TableHead: TableHead as React.ComponentType<unknown>,
    TableCell: TableCell as React.ComponentType<unknown>,
    TableCaption: TableCaption as React.ComponentType<unknown>,
  },
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

interface Transaction {
  id: string;
  name: string;
  status: "Pending" | "Completed" | "Failed";
  method: "Bank" | "Card" | "Wallet";
  amount: number;
}

const TRANSACTIONS: Transaction[] = [
  { id: "TX-001", name: "Felix Pago", status: "Completed", method: "Bank", amount: 250.0 },
  { id: "TX-002", name: "Alice Cooper", status: "Pending", method: "Card", amount: 1200.0 },
  { id: "TX-003", name: "Bob Marley", status: "Completed", method: "Wallet", amount: 75.5 },
  { id: "TX-004", name: "Carla Diaz", status: "Failed", method: "Card", amount: 480.0 },
  { id: "TX-005", name: "Diego Rivera", status: "Completed", method: "Bank", amount: 99.99 },
];

const formatAmount = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

/** Default 4-column data table with header + body rows. */
export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {TRANSACTIONS.map((t) => (
          <TableRow key={t.id}>
            <TableCell>{t.name}</TableCell>
            <TableCell>{t.status}</TableCell>
            <TableCell>{t.method}</TableCell>
            <TableCell className="text-right">
              {formatAmount(t.amount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/** Adds a `<TableCaption>` for screen readers + visual context. */
export const WithCaption: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of recent transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {TRANSACTIONS.map((t) => (
          <TableRow key={t.id}>
            <TableCell>{t.name}</TableCell>
            <TableCell className="text-right">
              {formatAmount(t.amount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/**
 * Click a column header to cycle through `undefined → asc → desc →
 * undefined`. The `sortDirection` prop is purely visual — the consumer
 * (this story) owns the actual sort state and re-sorts the data on each
 * change.
 */
export const Sortable: Story = {
  render: () => {
    type SortKey = keyof Pick<Transaction, "name" | "amount">;
    type SortState = { key: SortKey; direction: "asc" | "desc" } | null;

    const SortableTable = () => {
      const [sort, setSort] = React.useState<SortState>(null);

      const cycleSort = (key: SortKey) => {
        setSort((prev) => {
          if (!prev || prev.key !== key) return { key, direction: "asc" };
          if (prev.direction === "asc") return { key, direction: "desc" };
          return null;
        });
      };

      const sortedRows = React.useMemo(() => {
        if (!sort) return TRANSACTIONS;
        const sorted = [...TRANSACTIONS].sort((a, b) => {
          const av = a[sort.key];
          const bv = b[sort.key];
          if (av < bv) return sort.direction === "asc" ? -1 : 1;
          if (av > bv) return sort.direction === "asc" ? 1 : -1;
          return 0;
        });
        return sorted;
      }, [sort]);

      const directionFor = (key: SortKey) =>
        sort?.key === key ? sort.direction : undefined;

      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                sortDirection={directionFor("name")}
                onClick={() => cycleSort("name")}
              >
                Name
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead
                sortDirection={directionFor("amount")}
                onClick={() => cycleSort("amount")}
                className="text-right"
              >
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedRows.map((t) => (
              <TableRow key={t.id}>
                <TableCell>{t.name}</TableCell>
                <TableCell>{t.status}</TableCell>
                <TableCell>{t.method}</TableCell>
                <TableCell className="text-right">
                  {formatAmount(t.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    };
    return <SortableTable />;
  },
};

/**
 * Checkbox-driven row selection — toggles `data-state="selected"` to
 * surface the tan row tint from Figma's selected variant.
 */
export const SelectedRows: Story = {
  render: () => {
    const SelectableTable = () => {
      const [selected, setSelected] = React.useState<Set<string>>(
        new Set(["TX-002"])
      );

      const toggle = (id: string) =>
        setSelected((prev) => {
          const next = new Set(prev);
          if (next.has(id)) next.delete(id);
          else next.add(id);
          return next;
        });

      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8" />
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TRANSACTIONS.map((t) => {
              const isSelected = selected.has(t.id);
              return (
                <TableRow
                  key={t.id}
                  data-state={isSelected ? "selected" : undefined}
                >
                  <TableCell>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggle(t.id)}
                      aria-label={`Select ${t.name}`}
                    />
                  </TableCell>
                  <TableCell>{t.name}</TableCell>
                  <TableCell>{t.status}</TableCell>
                  <TableCell className="text-right">
                    {formatAmount(t.amount)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      );
    };
    return <SelectableTable />;
  },
};

/** Footer row holds totals and other summary cells. */
export const WithFooter: Story = {
  render: () => {
    const total = TRANSACTIONS.reduce((sum, t) => sum + t.amount, 0);
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {TRANSACTIONS.map((t) => (
            <TableRow key={t.id}>
              <TableCell>{t.name}</TableCell>
              <TableCell className="text-right">
                {formatAmount(t.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell className="text-right">{formatAmount(total)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  },
};

/** Empty body with a placeholder cell spanning all columns. */
export const Empty: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={3} className="py-6 text-center text-secondary">
            No transactions yet.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * Wide table inside a narrow container — the built-in `overflow-auto`
 * wrapper enables horizontal scroll without breaking the page layout.
 */
export const Scroll: Story = {
  render: () => (
    <div className="w-[320px] border border-border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right whitespace-nowrap">
              Amount (USD)
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {TRANSACTIONS.map((t) => (
            <TableRow key={t.id}>
              <TableCell className="whitespace-nowrap">{t.id}</TableCell>
              <TableCell className="whitespace-nowrap">{t.name}</TableCell>
              <TableCell className="whitespace-nowrap">{t.status}</TableCell>
              <TableCell className="whitespace-nowrap">{t.method}</TableCell>
              <TableCell className="text-right whitespace-nowrap">
                {formatAmount(t.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

/**
 * Replicates the Figma showcase (node `973:2826`).
 *
 * - **Cells row** — every (bg × weight) combination, exercised via
 *   `data-state="selected"` for the tan bg + semibold pairing.
 * - **Headers row** — all three sort states (None, Down, Up) plus the
 *   selected (tan) header tint.
 */
export const FigmaShowcase: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <p className="text-xs text-muted-foreground">Cells</p>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell content</TableCell>
              <TableCell data-state="selected">Cell content</TableCell>
              <TableCell className="font-semibold">Cell content</TableCell>
              <TableCell data-state="selected">Cell content</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cell content</TableCell>
              <TableCell data-state="selected">Cell content</TableCell>
              <TableCell data-state="selected">Cell content</TableCell>
              <TableCell className="font-semibold">Cell content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs text-muted-foreground">Headers</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Column</TableHead>
              <TableHead sortDirection="desc">Column</TableHead>
              <TableHead sortDirection="asc">Column</TableHead>
            </TableRow>
            <TableRow>
              <TableHead data-state="selected">Column</TableHead>
              <TableHead data-state="selected" sortDirection="asc">
                Column
              </TableHead>
              <TableHead data-state="selected" sortDirection="asc">
                Column
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
    </div>
  ),
};

/** Dark mode preview — verifies header surface, borders, and row tints flip. */
export const DarkMode: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="dark min-h-[420px] bg-background p-12">
      <Table>
        <TableCaption>Recent transactions (dark)</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead sortDirection="asc">Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {TRANSACTIONS.map((t, i) => (
            <TableRow
              key={t.id}
              data-state={i === 1 ? "selected" : undefined}
            >
              <TableCell>{t.name}</TableCell>
              <TableCell>{t.status}</TableCell>
              <TableCell className="text-right">
                {formatAmount(t.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};
