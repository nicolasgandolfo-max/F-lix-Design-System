import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, it, expect, vi } from "vitest";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

function FullTable() {
  return (
    <Table>
      <TableCaption>A list of recent transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead sortDirection="asc">Status</TableHead>
          <TableHead sortDirection="desc">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Felix Pago</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>$250.00</TableCell>
        </TableRow>
        <TableRow data-state="selected">
          <TableCell>Alice</TableCell>
          <TableCell>Completed</TableCell>
          <TableCell>$1,200.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell>$1,450.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

describe("Table", () => {
  it("renders the full semantic structure", () => {
    render(<FullTable />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getAllByRole("rowgroup").length).toBeGreaterThanOrEqual(3);
    expect(screen.getAllByRole("row")).toHaveLength(4);
    expect(screen.getAllByRole("columnheader")).toHaveLength(3);
    expect(
      screen.getByRole("columnheader", { name: /^Name$/ })
    ).toBeInTheDocument();
    expect(screen.getByText("Felix Pago")).toBeInTheDocument();
  });

  it("sets data-slot on every part", () => {
    render(<FullTable />);
    expect(
      document.querySelector('[data-slot="table-container"]')
    ).toBeInTheDocument();
    expect(document.querySelector('[data-slot="table"]')).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="table-header"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="table-body"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="table-footer"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="table-row"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="table-head"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="table-cell"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="table-caption"]')
    ).toBeInTheDocument();
  });

  it("merges custom className on every part", () => {
    render(
      <Table className="table-x">
        <TableCaption className="caption-x">Caption</TableCaption>
        <TableHeader className="header-x">
          <TableRow className="row-x">
            <TableHead className="head-x">Col</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="body-x">
          <TableRow>
            <TableCell className="cell-x">Cell</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter className="footer-x">
          <TableRow>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
    expect(document.querySelector('[data-slot="table"]')).toHaveClass(
      "table-x"
    );
    expect(document.querySelector('[data-slot="table-header"]')).toHaveClass(
      "header-x"
    );
    expect(document.querySelector('[data-slot="table-body"]')).toHaveClass(
      "body-x"
    );
    expect(document.querySelector('[data-slot="table-footer"]')).toHaveClass(
      "footer-x"
    );
    expect(document.querySelector('[data-slot="table-row"]')).toHaveClass(
      "row-x"
    );
    expect(document.querySelector('[data-slot="table-head"]')).toHaveClass(
      "head-x"
    );
    expect(document.querySelector('[data-slot="table-cell"]')).toHaveClass(
      "cell-x"
    );
    expect(document.querySelector('[data-slot="table-caption"]')).toHaveClass(
      "caption-x"
    );
  });

  it("renders no sort icon and no aria-sort by default", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Plain</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    );
    const head = screen.getByRole("columnheader", { name: "Plain" });
    expect(head).not.toHaveAttribute("aria-sort");
    expect(head).not.toHaveAttribute("data-sort");
    expect(
      document.querySelector('[data-slot="table-head-sort-icon"]')
    ).not.toBeInTheDocument();
  });

  it("renders ArrowUp + aria-sort=ascending when sortDirection=asc", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead sortDirection="asc">Asc col</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    );
    const head = screen.getByRole("columnheader");
    expect(head).toHaveAttribute("aria-sort", "ascending");
    expect(head).toHaveAttribute("data-sort", "asc");
    const icon = document.querySelector('[data-slot="table-head-sort-icon"]');
    expect(icon).toBeInTheDocument();
    // Phosphor renders an <svg>; assert icon lives inside the head and
    // picks up the muted-foreground color token (Figma spec).
    expect(head).toContainElement(icon as SVGElement);
    expect(icon).toHaveClass("text-muted-foreground");
  });

  it("renders ArrowDown + aria-sort=descending when sortDirection=desc", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead sortDirection="desc">Desc col</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    );
    const head = screen.getByRole("columnheader");
    expect(head).toHaveAttribute("aria-sort", "descending");
    expect(head).toHaveAttribute("data-sort", "desc");
    expect(
      document.querySelector('[data-slot="table-head-sort-icon"]')
    ).toBeInTheDocument();
  });

  it("applies bg-secondary when row has data-state=selected", () => {
    render(
      <Table>
        <TableBody>
          <TableRow data-state="selected">
            <TableCell>Selected</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const row = document.querySelector('[data-slot="table-row"]');
    expect(row).toHaveAttribute("data-state", "selected");
    expect(row).toHaveClass("data-[state=selected]:bg-secondary");
  });

  it("applies bg-secondary on a TableHead with data-state=selected", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead data-state="selected">Selected col</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    );
    const head = document.querySelector('[data-slot="table-head"]');
    expect(head).toHaveAttribute("data-state", "selected");
    expect(head).toHaveClass("data-[state=selected]:bg-secondary");
  });

  it("applies bg-secondary + font-semibold on a TableCell with data-state=selected", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell data-state="selected">Selected cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const cell = document.querySelector('[data-slot="table-cell"]');
    expect(cell).toHaveAttribute("data-state", "selected");
    expect(cell).toHaveClass("data-[state=selected]:bg-secondary");
    expect(cell).toHaveClass("data-[state=selected]:font-semibold");
  });

  it("renders TableCaption inside the <table> element", () => {
    render(
      <Table>
        <TableCaption>My caption</TableCaption>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    const table = screen.getByRole("table");
    const caption = document.querySelector('[data-slot="table-caption"]');
    expect(caption).toBeInTheDocument();
    expect(table).toContainElement(caption as HTMLElement);
  });

  it("forwards ...rest props to the row element", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Table>
        <TableBody>
          <TableRow onClick={onClick} data-testid="r">
            <TableCell>Click me</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    await user.click(screen.getByTestId("r"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("forwards refs to underlying DOM nodes", () => {
    const tableRef = { current: null as HTMLTableElement | null };
    const headRef = { current: null as HTMLTableSectionElement | null };
    const bodyRef = { current: null as HTMLTableSectionElement | null };
    const footerRef = { current: null as HTMLTableSectionElement | null };
    const rowRef = { current: null as HTMLTableRowElement | null };
    const colHeadRef = { current: null as HTMLTableCellElement | null };
    const cellRef = { current: null as HTMLTableCellElement | null };
    const captionRef = { current: null as HTMLTableCaptionElement | null };

    render(
      <Table ref={tableRef}>
        <TableCaption ref={captionRef}>Cap</TableCaption>
        <TableHeader ref={headRef}>
          <TableRow ref={rowRef}>
            <TableHead ref={colHeadRef}>Col</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody ref={bodyRef}>
          <TableRow>
            <TableCell ref={cellRef}>Cell</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter ref={footerRef}>
          <TableRow>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
    expect(tableRef.current?.tagName).toBe("TABLE");
    expect(headRef.current?.tagName).toBe("THEAD");
    expect(bodyRef.current?.tagName).toBe("TBODY");
    expect(footerRef.current?.tagName).toBe("TFOOT");
    expect(rowRef.current?.tagName).toBe("TR");
    expect(colHeadRef.current?.tagName).toBe("TH");
    expect(cellRef.current?.tagName).toBe("TD");
    expect(captionRef.current?.tagName).toBe("CAPTION");
  });

  it("has no axe violations on a fully-populated table", async () => {
    const { container } = render(<FullTable />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
