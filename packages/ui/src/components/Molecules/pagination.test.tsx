import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, it, expect, vi } from "vitest";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

function FullPaginator(
  props: {
    activePage?: number;
    rootClassName?: string;
    contentClassName?: string;
    itemClassName?: string;
  } = {}
) {
  const {
    activePage = 2,
    rootClassName,
    contentClassName,
    itemClassName,
  } = props;
  return (
    <Pagination className={rootClassName}>
      <PaginationContent className={contentClassName}>
        <PaginationItem className={itemClassName}>
          <PaginationPrevious href="#prev" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#1" isActive={activePage === 1}>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#2" isActive={activePage === 2}>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#3" isActive={activePage === 3}>
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#12" isActive={activePage === 12}>
            12
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#next" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

describe("Pagination", () => {
  it("renders a navigation landmark labeled 'pagination' wrapping a list", () => {
    render(<FullPaginator />);
    const nav = screen.getByRole("navigation", { name: /pagination/i });
    expect(nav).toBeInTheDocument();
    expect(nav.querySelector("ul")).toBeInTheDocument();
    expect(nav.querySelectorAll("li").length).toBeGreaterThan(0);
  });

  it("renders PaginationLink as <a> when href is provided", () => {
    render(<FullPaginator />);
    const link = screen.getByRole("link", { name: "1" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "#1");
  });

  it("renders PaginationLink as <button type='button'> when no href is provided", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink onClick={onClick}>5</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    const btn = screen.getByRole("button", { name: "5" });
    expect(btn.tagName).toBe("BUTTON");
    expect(btn).toHaveAttribute("type", "button");
    await user.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("sets aria-current='page' and active styling on the active link", () => {
    render(<FullPaginator activePage={2} />);
    const active = screen.getByRole("link", { name: "2" });
    expect(active).toHaveAttribute("aria-current", "page");
    expect(active).toHaveAttribute("data-active", "");
    expect(active).toHaveClass("bg-primary");
    // Inactive sibling does NOT get aria-current.
    expect(screen.getByRole("link", { name: "1" })).not.toHaveAttribute(
      "aria-current"
    );
  });

  it("Previous renders ArrowLeft icon, label, and aria-label", () => {
    render(<FullPaginator />);
    const prev = screen.getByRole("link", { name: "Go to previous page" });
    expect(prev).toHaveTextContent("Previous");
    expect(prev.querySelector("svg")).toBeInTheDocument();
  });

  it("Next renders ArrowRight icon, label, and aria-label", () => {
    render(<FullPaginator />);
    const next = screen.getByRole("link", { name: "Go to next page" });
    expect(next).toHaveTextContent("Next");
    expect(next.querySelector("svg")).toBeInTheDocument();
  });

  it("Previous/Next render label-less when label={null}", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" label={null} />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" label={null} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    const prev = screen.getByRole("link", { name: "Go to previous page" });
    const next = screen.getByRole("link", { name: "Go to next page" });
    expect(prev).not.toHaveTextContent("Previous");
    expect(next).not.toHaveTextContent("Next");
  });

  it("Ellipsis exposes 'More pages' to assistive tech and hides the glyph", () => {
    render(<FullPaginator />);
    const ellipsis = document.querySelector(
      "[data-slot='pagination-ellipsis']"
    );
    expect(ellipsis).toHaveAttribute("aria-hidden", "true");
    expect(ellipsis).toHaveTextContent("More pages");
  });

  it("supports asChild — composes active link styles onto a custom <a>", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink asChild isActive>
              <a href="/custom" data-testid="custom">
                7
              </a>
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    const custom = screen.getByTestId("custom");
    expect(custom.tagName).toBe("A");
    expect(custom).toHaveAttribute("href", "/custom");
    expect(custom).toHaveAttribute("aria-current", "page");
    expect(custom).toHaveClass("bg-primary");
  });

  it("supports asChild without isActive — drops data-active and aria-current", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink asChild>
              <a href="/inactive" data-testid="inactive">
                8
              </a>
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    const node = screen.getByTestId("inactive");
    expect(node).not.toHaveAttribute("data-active");
    expect(node).not.toHaveAttribute("aria-current");
  });

  it("merges custom className on every part", () => {
    render(
      <FullPaginator
        rootClassName="root-x"
        contentClassName="content-x"
        itemClassName="item-x"
      />
    );
    expect(document.querySelector("[data-slot='pagination']")).toHaveClass(
      "root-x"
    );
    expect(
      document.querySelector("[data-slot='pagination-content']")
    ).toHaveClass("content-x");
    expect(document.querySelector("[data-slot='pagination-item']")).toHaveClass(
      "item-x"
    );
  });

  it("sets data-slot on every part", () => {
    render(<FullPaginator />);
    expect(
      document.querySelector("[data-slot='pagination']")
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='pagination-content']")
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='pagination-item']")
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='pagination-link']")
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='pagination-previous']")
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='pagination-next']")
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='pagination-ellipsis']")
    ).toBeInTheDocument();
  });

  describe("accessibility", () => {
    it("has no a11y violations on a fully-populated paginator", async () => {
      const { container } = render(<FullPaginator />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no a11y violations when rendered with button-style links (no href)", async () => {
      const { container } = render(
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
