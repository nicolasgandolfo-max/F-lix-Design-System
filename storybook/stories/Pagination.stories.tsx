import { useEffect, useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import {
  Label,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@felix/ui";

/**
 * **Pagination** — A presentational paginator built from semantic
 * `<nav><ul><li>` markup, with a brand-teal active state and
 * `aria-label="pagination"` on the root.
 *
 * Compound API:
 * - `Pagination` (root nav)
 * - `PaginationContent` (ul)
 * - `PaginationItem` (li)
 * - `PaginationLink` (a / button) — `isActive` for the current page,
 *   `asChild` for framework-router integration
 * - `PaginationPrevious` / `PaginationNext` — labeled, with arrow icons
 * - `PaginationEllipsis` — sr-friendly "More pages" indicator
 *
 * The component is presentation-only — consumers compute the visible
 * page range and wire `href` / `onClick` / `isActive`.
 */
const meta = {
  title: "Components/Molecules/Pagination",
  component: Pagination,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    className: {
      description: "Merged with internal styles via `cn()`.",
      control: "text",
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">5</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

// ─── Many (Figma showcase row 1) ──────────────────────────────────────────────

/**
 * Replicates the Figma Items showcase: `Prev | 1 | 2 (active) | 3 | … | 12 | Next`.
 */
export const Many: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">12</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

// ─── With ellipsis on the left ────────────────────────────────────────────────

export const WithEllipsisLeft: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">9</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            10
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

// ─── Controlled ───────────────────────────────────────────────────────────────

export const Controlled: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const total = 5;
    return (
      <div className="flex flex-col items-center gap-3">
        <p className="text-xs text-muted-foreground">
          External: page <span className="font-mono">{page}</span> of {total}
        </p>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                aria-disabled={page === 1}
              />
            </PaginationItem>
            {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
              <PaginationItem key={n}>
                <PaginationLink
                  isActive={n === page}
                  onClick={() => setPage(n)}
                >
                  {n}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(total, p + 1))}
                aria-disabled={page === total}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  },
};

// ─── Compact (Prev / Next only) ───────────────────────────────────────────────

export const Compact: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

// ─── With Rows per page (Figma showcase row 2) ────────────────────────────────

/**
 * Demonstrates how `Pagination` composes with `Select` to reproduce the
 * Figma "dropdown" variant — no one-off wrapper needed.
 */
export const WithRowsPerPage: Story = {
  render: () => {
    const [rows, setRows] = useState("25");
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 w-[164px]">
          <Label htmlFor="rpp" className="whitespace-nowrap text-sm">
            Rows per page
          </Label>
          <Select value={rows} onValueChange={setRows}>
            <SelectTrigger id="rpp" className="flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  },
};

// ─── Dynamic / paginated API reference ────────────────────────────────────────

/**
 * `getPaginationRange(currentPage, totalPages, { siblingCount, boundaryCount })`
 * — returns the sequence of page numbers (and ellipsis sentinels) to render
 * for a given page state.
 *
 * **Stable width.** The function always returns the same number of slots
 * for a given `(siblingCount, boundaryCount)` pair, so the paginator
 * doesn't reflow as the user navigates. When an ellipsis isn't needed
 * (the user is near a boundary), the slot is filled with the actual
 * adjacent page number instead. This is the same model Material UI and
 * Ant Design use.
 *
 * Slot count = `2 * boundaryCount + 2 * siblingCount + 3`
 * (current + 2 ellipsis slots + sibling pages on each side + boundary
 * pages on each side). Defaults give 7 slots.
 *
 * Returns: `(number | "left-ellipsis" | "right-ellipsis")[]`
 *
 * The two ellipsis sentinels are distinct so React can give them stable
 * keys when both appear in the same list.
 *
 * This is intentionally NOT shipped from the library — it is pagination
 * *math*, not pagination *UI*. Copy it into your app.
 */
type PageItem = number | "left-ellipsis" | "right-ellipsis";

function range(start: number, end: number): number[] {
  const length = Math.max(0, end - start + 1);
  return Array.from({ length }, (_, i) => start + i);
}

function getPaginationRange(
  currentPage: number,
  totalPages: number,
  options: { siblingCount?: number; boundaryCount?: number } = {}
): PageItem[] {
  const { siblingCount = 1, boundaryCount = 1 } = options;
  if (totalPages <= 0) return [];

  const totalShown = 2 * boundaryCount + 2 * siblingCount + 3;
  if (totalPages <= totalShown) return range(1, totalPages);

  const startPages = range(1, boundaryCount);
  const endPages = range(totalPages - boundaryCount + 1, totalPages);

  // Clamp the sibling window so the result is always exactly `totalShown`
  // slots, even at the edges.
  const siblingsStart = Math.max(
    Math.min(
      currentPage - siblingCount,
      totalPages - boundaryCount - siblingCount * 2 - 1
    ),
    boundaryCount + 2
  );
  const siblingsEnd = Math.min(
    Math.max(currentPage + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages[0] - 2
  );

  return [
    ...startPages,
    // Left side: ellipsis vs. the single transition page
    ...(siblingsStart > boundaryCount + 2
      ? (["left-ellipsis"] as const)
      : boundaryCount + 1 < totalPages - boundaryCount
        ? [boundaryCount + 1]
        : []),
    ...range(siblingsStart, siblingsEnd),
    // Right side: ellipsis vs. the single transition page
    ...(siblingsEnd < totalPages - boundaryCount - 1
      ? (["right-ellipsis"] as const)
      : totalPages - boundaryCount > boundaryCount
        ? [totalPages - boundaryCount]
        : []),
    ...endPages,
  ];
}

// Mock paginated API. Replace with your real `fetch(`/api/items?page=…`)`.
type ApiResponse = { items: { id: number; name: string }[]; total: number };

async function fetchPage(page: number, pageSize: number): Promise<ApiResponse> {
  const total = 137;
  await new Promise((r) => setTimeout(r, 300));
  const start = (page - 1) * pageSize;
  const items = Array.from(
    { length: Math.min(pageSize, total - start) },
    (_, i) => ({
      id: start + i + 1,
      name: `Order #${String(start + i + 1).padStart(4, "0")}`,
    })
  );
  return { items, total };
}

/**
 * **Reference pattern for paginated data.** Wires `Pagination` to a
 * server-paginated list with:
 *
 * - A controlled `page` + `pageSize` (here we let the user change page size
 *   via `Select`, which also resets to page 1).
 * - A `total` count that comes back from the API and drives `totalPages`.
 * - `getPaginationRange()` to compute which page numbers + ellipsis to show.
 * - `aria-disabled` on Prev/Next at the edges (the variants pick that up
 *   visually) and `onClick` handlers (no `href` → buttons under the hood).
 * - A loading state (`aria-busy`) while the fetch is in flight.
 *
 * Drop this in next to your data table when paginating real API results.
 */
export const DynamicPaginatedList: Story = {
  parameters: { layout: "padded" },
  render: () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      let cancelled = false;
      setLoading(true);
      fetchPage(page, pageSize).then((res) => {
        if (cancelled) return;
        setData(res);
        setLoading(false);
      });
      return () => {
        cancelled = true;
      };
    }, [page, pageSize]);

    const totalPages = data ? Math.max(1, Math.ceil(data.total / pageSize)) : 1;
    // Stable-width range: always exactly 7 slots once `totalPages > 7`,
    // so the paginator never reflows when the user changes pages.
    const visible = useMemo(
      () =>
        getPaginationRange(page, totalPages, {
          siblingCount: 1,
          boundaryCount: 1,
        }),
      [page, totalPages]
    );

    const goTo = (p: number) => setPage(Math.min(Math.max(1, p), totalPages));
    const isFirst = page === 1;
    const isLast = page === totalPages;

    return (
      <div className="flex flex-col gap-4">
        <header className="flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {data
              ? `Showing ${(page - 1) * pageSize + 1}–${
                  (page - 1) * pageSize + data.items.length
                } of ${data.total}`
              : "Loading…"}
          </p>
          <div className="flex items-center gap-2">
            <Label htmlFor="page-size" className="whitespace-nowrap text-sm">
              Rows per page
            </Label>
            <Select
              value={String(pageSize)}
              onValueChange={(v) => {
                setPageSize(Number(v));
                setPage(1);
              }}
            >
              <SelectTrigger id="page-size" className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        <ul
          aria-busy={loading}
          className="flex flex-col rounded-md border border-border bg-background"
        >
          {(data?.items ?? []).map((item) => (
            <li
              key={item.id}
              className="border-b border-border px-3 py-2 text-sm last:border-b-0"
            >
              {item.name}
            </li>
          ))}
          {loading && data === null && (
            <li className="px-3 py-6 text-center text-sm text-muted-foreground">
              Loading…
            </li>
          )}
        </ul>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => !isFirst && goTo(page - 1)}
                aria-disabled={isFirst}
                // Icon-only on small screens, full label on >= sm.
                label={<span className="hidden sm:inline">Previous</span>}
              />
            </PaginationItem>

            {visible.map((slot) => (
              <PaginationItem
                key={typeof slot === "number" ? `p-${slot}` : slot}
              >
                {slot === "left-ellipsis" || slot === "right-ellipsis" ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    isActive={slot === page}
                    onClick={() => goTo(slot)}
                  >
                    {slot}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => !isLast && goTo(page + 1)}
                aria-disabled={isLast}
                label={<span className="hidden sm:inline">Next</span>}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  },
};

// ─── Small-screen patterns ────────────────────────────────────────────────────

/**
 * **Small screen — responsive labels + fewer buttons.** Same
 * `DynamicPaginatedList` pattern, sized for actual phones. Notice:
 *
 * - **`siblingCount: 0`** drops the range to 5 stable slots
 *   (`1 … current … 14`) — the 7-slot default is meant for desktop.
 * - Prev / Next collapse to icon-only via
 *   `label={<span className="hidden sm:inline">…</span>}`.
 * - **Tighter spacing tokens for mobile**: `size-8` cells (32 px) and
 *   `gap-0.5` (2 px) instead of the desktop defaults `size-9` / `gap-1`.
 *   Still ≥ 28 px touch targets and well above WCAG AAA.
 * - The wrapper uses `w-full max-w-[360px]` so it shrinks to whatever the
 *   real viewport is (iPhone SE = 320 px, iPhone 12 mini = 360 px) —
 *   no overflow even on the narrowest devices.
 *
 * Use Storybook's viewport addon to flip between mobile / tablet / desktop.
 */
export const SmallScreen: Story = {
  parameters: {
    layout: "centered",
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => {
    const [page, setPage] = useState(7);
    const totalPages = 14;
    // 5 slots total — `1 [optional 2/3] [current ± 0] [optional 12/13] 14`
    const visible = getPaginationRange(page, totalPages, {
      siblingCount: 0,
      boundaryCount: 1,
    });
    const goTo = (p: number) =>
      setPage(Math.min(Math.max(1, p), totalPages));
    const isFirst = page === 1;
    const isLast = page === totalPages;

    // Mobile-sized tokens (override the desktop defaults baked into the
    // variants via `cn()` + tailwind-merge).
    const cellSize = "size-8 text-xs";
    const edgeSize = "h-8 px-1.5";

    return (
      <div className="w-full max-w-[360px] rounded-md border border-border bg-background p-2">
        <header className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Label htmlFor="ss-rpp" className="whitespace-nowrap text-xs">
              Per page
            </Label>
            <Select defaultValue="10">
              <SelectTrigger id="ss-rpp" className="h-7 w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        <Pagination>
          <PaginationContent className="gap-0.5">
            <PaginationItem>
              <PaginationPrevious
                onClick={() => !isFirst && goTo(page - 1)}
                aria-disabled={isFirst}
                label={<span className="hidden sm:inline">Previous</span>}
                className={edgeSize}
              />
            </PaginationItem>
            {visible.map((slot) => (
              <PaginationItem
                key={typeof slot === "number" ? `p-${slot}` : slot}
              >
                {slot === "left-ellipsis" || slot === "right-ellipsis" ? (
                  <PaginationEllipsis className={cellSize} />
                ) : (
                  <PaginationLink
                    isActive={slot === page}
                    onClick={() => goTo(slot)}
                    className={cellSize}
                  >
                    {slot}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => !isLast && goTo(page + 1)}
                aria-disabled={isLast}
                label={<span className="hidden sm:inline">Next</span>}
                className={edgeSize}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  },
};

/**
 * **Small screen — compact / Prev-Next-only.** When you want maximum
 * breathing room (single-column lists on phones, dense tables, etc.),
 * skip the number cells entirely and pair Prev / Next with a "Page X
 * of Y" caption. This stays usable down to ~280 px wide.
 *
 * Combine with `SmallScreen` via a media query in your app:
 *
 * ```tsx
 * const isMobile = useMediaQuery("(max-width: 480px)");
 * return isMobile ? <CompactPager /> : <NumberedPager />;
 * ```
 */
export const SmallScreenCompact: Story = {
  parameters: {
    layout: "centered",
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => {
    const [page, setPage] = useState(3);
    const totalPages = 14;
    const goTo = (p: number) =>
      setPage(Math.min(Math.max(1, p), totalPages));
    const isFirst = page === 1;
    const isLast = page === totalPages;

    return (
      <div className="w-[280px] rounded-md border border-border bg-background p-3">
        <Pagination>
          <PaginationContent className="w-full justify-between">
            <PaginationItem>
              <PaginationPrevious
                onClick={() => !isFirst && goTo(page - 1)}
                aria-disabled={isFirst}
                label={null}
              />
            </PaginationItem>
            <PaginationItem>
              <span
                aria-live="polite"
                className="px-2 text-xs text-muted-foreground"
              >
                Page {page} of {totalPages}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => !isLast && goTo(page + 1)}
                aria-disabled={isLast}
                label={null}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  },
};

// ─── Figma showcase ───────────────────────────────────────────────────────────

/**
 * Both Figma layouts stacked — mirrors node `699:15389` ("Paginator · Showcase").
 */
export const FigmaShowcase: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-col gap-10">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">12</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 w-[164px]">
          <Label htmlFor="rpp-fs" className="whitespace-nowrap text-sm">
            Rows per page
          </Label>
          <Select defaultValue="25">
            <SelectTrigger id="rpp-fs" className="flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  ),
};

// ─── Dark mode ────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  parameters: { backgrounds: { default: "dark" } },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="rounded-xl bg-background p-8">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">12</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  ),
};
