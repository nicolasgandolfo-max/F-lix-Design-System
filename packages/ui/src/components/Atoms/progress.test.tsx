import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, it, expect } from "vitest";

import { Progress } from "./progress";

const COLORS = [
  ["primary", /\bbg-primary\b/],
  ["secondary", /\bbg-foreground\b/],
  ["lime", /\bbg-accent\b/],
  ["danger", /\bbg-destructive\b/],
  ["violet", /\bbg-chart-4\b/],
] as const;

const SIZES = [
  ["xs", /\bh-1\b/],
  ["sm", /\bh-2\b/],
  ["md", /\bh-3\.5\b/],
] as const;

function getIndicator(container: HTMLElement) {
  return container.querySelector<HTMLElement>(
    "[data-slot='progress-indicator']"
  );
}

describe("Progress", () => {
  it("renders with the expected role and data attributes", () => {
    render(<Progress value={25} aria-label="Upload" />);
    const bar = screen.getByRole("progressbar", { name: /upload/i });

    expect(bar).toBeInTheDocument();
    expect(bar).toHaveAttribute("data-slot", "progress");
    expect(bar).toHaveAttribute("data-size", "sm");
    expect(bar).toHaveAttribute("data-color", "primary");
    expect(bar).toHaveAttribute("aria-valuenow", "25");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  it.each([
    [0, 100],
    [25, 75],
    [50, 50],
    [100, 0],
  ])(
    "translates the indicator by -(100 - value)%% for value=%i",
    (value, expected) => {
      const { container } = render(
        <Progress value={value} aria-label="progress" />
      );
      const indicator = getIndicator(container);
      expect(indicator).not.toBeNull();
      expect(indicator?.style.transform).toBe(`translateX(-${expected}%)`);
    }
  );

  it("clamps values above max down to max", () => {
    const { container } = render(<Progress value={150} aria-label="clamp" />);
    const indicator = getIndicator(container);
    expect(indicator?.style.transform).toBe("translateX(-0%)");
  });

  it("clamps negative values up to 0", () => {
    const { container } = render(<Progress value={-20} aria-label="clamp" />);
    const indicator = getIndicator(container);
    expect(indicator?.style.transform).toBe("translateX(-100%)");
  });

  it("supports a custom max", () => {
    const { container } = render(
      <Progress value={25} max={50} aria-label="custom max" />
    );
    const indicator = getIndicator(container);
    expect(indicator?.style.transform).toBe("translateX(-50%)");
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuemax",
      "50"
    );
  });

  it("renders an indeterminate bar when value is null", () => {
    const { container } = render(
      <Progress value={null} aria-label="loading" />
    );
    const bar = screen.getByRole("progressbar");
    expect(bar).not.toHaveAttribute("aria-valuenow");

    const indicator = getIndicator(container);
    expect(indicator?.style.transform).toBe("translateX(-100%)");
  });

  it.each(COLORS)(
    "applies the %s color class to the indicator",
    (color, pattern) => {
      const { container } = render(
        <Progress value={50} color={color} aria-label={color} />
      );
      const bar = screen.getByRole("progressbar");
      expect(bar).toHaveAttribute("data-color", color);

      const indicator = getIndicator(container);
      expect(indicator?.className).toMatch(pattern);
    }
  );

  it.each(SIZES)("applies the %s size class to the root", (size, pattern) => {
    render(<Progress value={50} size={size} aria-label={size} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("data-size", size);
    expect(bar.className).toMatch(pattern);
  });

  it("falls back to sm / primary when size and color are null", () => {
    const { container } = render(
      <Progress
        value={50}
        aria-label="null"
        size={null as unknown as undefined}
        color={null as unknown as undefined}
      />
    );

    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("data-size", "sm");
    expect(bar).toHaveAttribute("data-color", "primary");
    expect(bar.className).toMatch(/\bh-2\b/);

    const indicator = getIndicator(container);
    expect(indicator?.className).toMatch(/\bbg-primary\b/);
  });

  it("merges user-supplied className onto the root", () => {
    render(
      <Progress value={30} aria-label="custom" className="custom-progress" />
    );
    expect(screen.getByRole("progressbar").className).toMatch(
      /custom-progress/
    );
  });

  it("renders the muted track class", () => {
    render(<Progress value={10} aria-label="track" />);
    expect(screen.getByRole("progressbar").className).toMatch(/\bbg-muted\b/);
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Progress value={60} aria-label="accessible progress" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
