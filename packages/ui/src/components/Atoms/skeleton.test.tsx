import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, it, expect } from "vitest";
import { Skeleton, type SkeletonType } from "./skeleton";

const TYPES: SkeletonType[] = ["text", "block", "circle"];

const ROUNDING: Record<SkeletonType, string> = {
  text: "rounded-full",
  block: "rounded-lg",
  circle: "rounded-full",
};

describe("Skeleton", () => {
  it("renders with role='status', aria-busy, aria-live, and default label", () => {
    render(<Skeleton data-testid="skeleton" />);
    const el = screen.getByTestId("skeleton");
    expect(el).toHaveAttribute("role", "status");
    expect(el).toHaveAttribute("aria-busy", "true");
    expect(el).toHaveAttribute("aria-live", "polite");
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("surfaces a custom label to screen readers", () => {
    render(<Skeleton label="Loading payments" />);
    expect(screen.getByText("Loading payments")).toBeInTheDocument();
  });

  it("defaults to type='text' when no type is provided", () => {
    render(<Skeleton data-testid="skeleton" />);
    const el = screen.getByTestId("skeleton");
    expect(el).toHaveAttribute("data-type", "text");
    expect(el).toHaveClass("rounded-full");
  });

  it.each(TYPES)("applies type='%s' rounding + data-type", (type) => {
    render(<Skeleton data-testid="skeleton" type={type} />);
    const el = screen.getByTestId("skeleton");
    expect(el).toHaveAttribute("data-type", type);
    expect(el).toHaveClass(ROUNDING[type]);
  });

  it("type='circle' is square via aspect-square", () => {
    render(<Skeleton data-testid="skeleton" type="circle" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("aspect-square");
  });

  it("animated defaults to true and emits the pulse class", () => {
    render(<Skeleton data-testid="skeleton" />);
    const el = screen.getByTestId("skeleton");
    expect(el).toHaveAttribute("data-animated", "true");
    expect(el.className).toContain("motion-safe:animate-pulse");
  });

  it("animated={false} flips data-animated and disables motion-safe pulse", () => {
    render(<Skeleton data-testid="skeleton" animated={false} />);
    const el = screen.getByTestId("skeleton");
    expect(el).toHaveAttribute("data-animated", "false");
    // The override class is appended after the variant pulse class so
    // tailwind-merge resolves the conflict in favour of `animate-none`.
    expect(el.className).toMatch(/motion-safe:animate-none/);
    expect(el.className).not.toMatch(/motion-safe:animate-pulse(?!\S)/);
  });

  it("merges custom className and lets it win over default size", () => {
    render(
      <Skeleton data-testid="skeleton" type="text" className="h-8 w-32" />
    );
    const el = screen.getByTestId("skeleton");
    expect(el).toHaveClass("h-8");
    expect(el).toHaveClass("w-32");
    // The default `h-4 w-full` should have been resolved away by tailwind-merge.
    expect(el).not.toHaveClass("h-4");
    expect(el).not.toHaveClass("w-full");
  });

  it("sets data-slot='skeleton'", () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveAttribute(
      "data-slot",
      "skeleton"
    );
  });

  it("forwards native HTML attributes", () => {
    render(
      <Skeleton data-testid="skeleton" id="placeholder" title="loading" />
    );
    const el = screen.getByTestId("skeleton");
    expect(el).toHaveAttribute("id", "placeholder");
    expect(el).toHaveAttribute("title", "loading");
  });

  it("forwards a ref to the underlying span", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Skeleton ref={ref} data-testid="skeleton" />);
    expect(ref.current).toBe(screen.getByTestId("skeleton"));
    expect(ref.current?.tagName).toBe("SPAN");
  });

  it("renders a visually-hidden sr-only label span", () => {
    render(<Skeleton label="Loading data" />);
    expect(screen.getByText("Loading data")).toHaveClass("sr-only");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Skeleton />);
    expect(await axe(container)).toHaveNoViolations();
  });

  describe("all types pass accessibility check", () => {
    for (const type of TYPES) {
      it(`type="${type}" has no violations`, async () => {
        const { container } = render(<Skeleton type={type} />);
        expect(await axe(container)).toHaveNoViolations();
      });
    }
  });
});
