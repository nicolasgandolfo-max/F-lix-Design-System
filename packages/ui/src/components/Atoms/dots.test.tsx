import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, it, expect } from "vitest";
import { Dots } from "./dots";

const SIZES = ["sm", "md", "lg"] as const;

const DOT_SIZE_CLASS = {
  sm: "size-1",
  md: "size-1.5",
  lg: "size-2.5",
} as const;

const GAP_CLASS = {
  sm: "gap-[calc(var(--spacing)*0.75)]",
  md: "gap-1",
  lg: "gap-1.5",
} as const;

describe("Dots", () => {
  it("renders with role='status' and default label", () => {
    render(<Dots data-testid="dots" />);
    const el = screen.getByTestId("dots");
    expect(el).toHaveAttribute("role", "status");
    expect(el).toHaveAttribute("aria-live", "polite");
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("surfaces a custom label to screen readers", () => {
    render(<Dots label="Syncing" />);
    expect(screen.getByText("Syncing")).toBeInTheDocument();
  });

  it("renders exactly three dots", () => {
    render(<Dots data-testid="dots" />);
    const dots = screen
      .getByTestId("dots")
      .querySelectorAll("[data-slot='dots-dot']");
    expect(dots).toHaveLength(3);
  });

  it("staggers animation delays across dots", () => {
    render(<Dots data-testid="dots" />);
    const dots = Array.from(
      screen
        .getByTestId("dots")
        .querySelectorAll<HTMLSpanElement>("[data-slot='dots-dot']")
    );
    expect(dots[0].style.animationDelay).toBe("0ms");
    expect(dots[1].style.animationDelay).toBe("160ms");
    expect(dots[2].style.animationDelay).toBe("320ms");
  });

  it("applies default size (md)", () => {
    render(<Dots data-testid="dots" />);
    const el = screen.getByTestId("dots");
    expect(el).toHaveAttribute("data-size", "md");
    expect(el).toHaveClass(GAP_CLASS.md);
    const firstDot = el.querySelector("[data-slot='dots-dot']")!;
    expect(firstDot).toHaveClass(DOT_SIZE_CLASS.md);
  });

  it.each(SIZES)("applies size='%s' gap + dot size classes", (size) => {
    render(<Dots data-testid="dots" size={size} />);
    const el = screen.getByTestId("dots");
    expect(el).toHaveAttribute("data-size", size);
    expect(el).toHaveClass(GAP_CLASS[size]);
    const firstDot = el.querySelector("[data-slot='dots-dot']")!;
    expect(firstDot).toHaveClass(DOT_SIZE_CLASS[size]);
  });

  it("applies animate-dots-pulse class to each dot", () => {
    render(<Dots data-testid="dots" />);
    const dots = screen
      .getByTestId("dots")
      .querySelectorAll("[data-slot='dots-dot']");
    dots.forEach((dot) => {
      expect(dot.className).toContain("animate-dots-pulse");
    });
  });

  it("merges custom className onto the wrapper", () => {
    render(<Dots data-testid="dots" className="custom-class" />);
    expect(screen.getByTestId("dots")).toHaveClass("custom-class");
  });

  it("forwards native HTML attributes", () => {
    render(<Dots data-testid="dots" id="indicator" />);
    expect(screen.getByTestId("dots")).toHaveAttribute("id", "indicator");
  });

  it("sets data-slot='dots'", () => {
    render(<Dots data-testid="dots" />);
    expect(screen.getByTestId("dots")).toHaveAttribute("data-slot", "dots");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Dots />);
    expect(await axe(container)).toHaveNoViolations();
  });

  describe("all sizes pass accessibility check", () => {
    for (const size of SIZES) {
      it(`size="${size}" has no violations`, async () => {
        const { container } = render(<Dots size={size} />);
        expect(await axe(container)).toHaveNoViolations();
      });
    }
  });
});
