import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, it, expect } from "vitest";
import { Spinner } from "./spinner";

const SIZES = ["sm", "md", "lg"] as const;

describe("Spinner", () => {
  it("renders with role='status' and default label", () => {
    render(<Spinner data-testid="spinner" />);
    const el = screen.getByTestId("spinner");
    expect(el).toHaveAttribute("role", "status");
    expect(el).toHaveAttribute("aria-live", "polite");
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("surfaces a custom label to screen readers", () => {
    render(<Spinner label="Fetching payments" />);
    expect(screen.getByText("Fetching payments")).toBeInTheDocument();
  });

  it("applies default size (md)", () => {
    render(<Spinner data-testid="spinner" />);
    const el = screen.getByTestId("spinner");
    expect(el).toHaveAttribute("data-size", "md");
    expect(el.querySelector("[aria-hidden='true']")).toHaveClass("size-6");
  });

  it.each(SIZES)("applies size='%s' class", (size) => {
    const expected = { sm: "size-4", md: "size-6", lg: "size-10" }[size];
    render(<Spinner data-testid="spinner" size={size} />);
    const el = screen.getByTestId("spinner");
    expect(el).toHaveAttribute("data-size", size);
    expect(el.querySelector("[aria-hidden='true']")).toHaveClass(expected);
  });

  it("has animate-spin class for motion-safe users", () => {
    render(<Spinner data-testid="spinner" />);
    const inner = screen
      .getByTestId("spinner")
      .querySelector("[aria-hidden='true']")!;
    expect(inner.className).toContain("animate-spin");
  });

  it("merges custom className onto the wrapper", () => {
    render(<Spinner data-testid="spinner" className="custom-class" />);
    expect(screen.getByTestId("spinner")).toHaveClass("custom-class");
  });

  it("forwards native HTML attributes", () => {
    render(<Spinner data-testid="spinner" id="busy-indicator" />);
    expect(screen.getByTestId("spinner")).toHaveAttribute(
      "id",
      "busy-indicator"
    );
  });

  it("sets data-slot='spinner'", () => {
    render(<Spinner data-testid="spinner" />);
    expect(screen.getByTestId("spinner")).toHaveAttribute(
      "data-slot",
      "spinner"
    );
  });

  it("renders an aria-hidden svg ring (decorative)", () => {
    render(<Spinner data-testid="spinner" />);
    const svg = screen.getByTestId("spinner").querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg!.closest("[aria-hidden='true']")).not.toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Spinner />);
    expect(await axe(container)).toHaveNoViolations();
  });

  describe("all sizes pass accessibility check", () => {
    for (const size of SIZES) {
      it(`size="${size}" has no violations`, async () => {
        const { container } = render(<Spinner size={size} />);
        expect(await axe(container)).toHaveNoViolations();
      });
    }
  });
});
