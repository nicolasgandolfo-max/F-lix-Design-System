import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, it, expect, vi } from "vitest";

import { Slider } from "./slider";

const COLORS = ["primary", "secondary", "lime", "danger", "violet"] as const;

describe("Slider", () => {
  it("renders a single thumb for a single value", () => {
    render(<Slider defaultValue={[40]} aria-label="Volume" />);
    expect(screen.getAllByRole("slider")).toHaveLength(1);
  });

  it("renders two thumbs for a range value", () => {
    render(<Slider defaultValue={[20, 80]} aria-label="Range" />);
    expect(screen.getAllByRole("slider")).toHaveLength(2);
  });

  it("renders one thumb when value is controlled", () => {
    render(
      <Slider value={[55]} aria-label="Volume" onValueChange={() => {}} />
    );
    expect(screen.getAllByRole("slider")).toHaveLength(1);
  });

  it("renders two thumbs when controlled with two values", () => {
    render(
      <Slider value={[10, 90]} aria-label="Range" onValueChange={() => {}} />
    );
    expect(screen.getAllByRole("slider")).toHaveLength(2);
  });

  it("falls back to a single thumb at min when no value is provided", () => {
    render(<Slider aria-label="Volume" />);
    expect(screen.getAllByRole("slider")).toHaveLength(1);
  });

  it("renders track, range and thumb data-slots", () => {
    const { container } = render(
      <Slider defaultValue={[40]} aria-label="Volume" />
    );
    expect(container.querySelector("[data-slot='slider']")).toBeInTheDocument();
    expect(
      container.querySelector("[data-slot='slider-track']")
    ).toBeInTheDocument();
    expect(
      container.querySelector("[data-slot='slider-range']")
    ).toBeInTheDocument();
    expect(
      container.querySelector("[data-slot='slider-thumb']")
    ).toBeInTheDocument();
  });

  it("defaults to data-color='primary' when color is omitted", () => {
    const { container } = render(
      <Slider defaultValue={[40]} aria-label="Volume" />
    );
    expect(container.querySelector("[data-slot='slider']")).toHaveAttribute(
      "data-color",
      "primary"
    );
  });

  it("defaults to data-color='primary' when color is null", () => {
    const { container } = render(
      <Slider
        defaultValue={[40]}
        aria-label="Volume"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        color={null as any}
      />
    );
    expect(container.querySelector("[data-slot='slider']")).toHaveAttribute(
      "data-color",
      "primary"
    );
  });

  describe("color variants", () => {
    for (const color of COLORS) {
      it(`renders color="${color}" and sets data-color`, () => {
        const { container } = render(
          <Slider defaultValue={[40]} color={color} aria-label="Volume" />
        );
        expect(container.querySelector("[data-slot='slider']")).toHaveAttribute(
          "data-color",
          color
        );
      });
    }
  });

  it("forwards aria-label to the thumb", () => {
    render(<Slider defaultValue={[40]} aria-label="Brightness" />);
    expect(screen.getByRole("slider")).toHaveAttribute(
      "aria-label",
      "Brightness"
    );
  });

  it("respects min and max via aria-valuemin / aria-valuemax", () => {
    render(<Slider defaultValue={[5]} min={0} max={10} aria-label="Volume" />);
    const thumb = screen.getByRole("slider");
    expect(thumb).toHaveAttribute("aria-valuemin", "0");
    expect(thumb).toHaveAttribute("aria-valuemax", "10");
    expect(thumb).toHaveAttribute("aria-valuenow", "5");
  });

  it("calls onValueChange when arrow keys are pressed", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Slider
        defaultValue={[50]}
        onValueChange={handleChange}
        aria-label="Volume"
      />
    );
    const thumb = screen.getByRole("slider");
    thumb.focus();
    await user.keyboard("{ArrowRight}");
    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenLastCalledWith([51]);
  });

  it("respects custom step on keyboard interaction", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Slider
        defaultValue={[50]}
        step={10}
        onValueChange={handleChange}
        aria-label="Volume"
      />
    );
    const thumb = screen.getByRole("slider");
    thumb.focus();
    await user.keyboard("{ArrowRight}");
    expect(handleChange).toHaveBeenLastCalledWith([60]);
  });

  it("does not call onValueChange when disabled", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Slider
        defaultValue={[50]}
        disabled
        onValueChange={handleChange}
        aria-label="Volume"
      />
    );
    const thumb = screen.getByRole("slider");
    thumb.focus();
    await user.keyboard("{ArrowRight}");
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("sets data-disabled when disabled", () => {
    const { container } = render(
      <Slider defaultValue={[50]} disabled aria-label="Volume" />
    );
    expect(container.querySelector("[data-slot='slider']")).toHaveAttribute(
      "data-disabled"
    );
  });

  it("merges custom className on the root", () => {
    const { container } = render(
      <Slider
        defaultValue={[50]}
        className="custom-class"
        aria-label="Volume"
      />
    );
    expect(container.querySelector("[data-slot='slider']")).toHaveClass(
      "custom-class"
    );
  });

  it("does not change controlled value internally", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Slider value={[50]} onValueChange={handleChange} aria-label="Volume" />
    );
    const thumb = screen.getByRole("slider");
    thumb.focus();
    await user.keyboard("{ArrowRight}");
    // Even though onValueChange fired, controlled value stays at 50
    expect(thumb).toHaveAttribute("aria-valuenow", "50");
    expect(handleChange).toHaveBeenCalled();
  });

  it("has no accessibility violations (single, aria-label)", async () => {
    const { container } = render(
      <Slider defaultValue={[40]} aria-label="Volume" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no accessibility violations (single, aria-labelledby)", async () => {
    const { container } = render(
      <>
        <span id="volume-lbl">Volume</span>
        <Slider defaultValue={[40]} aria-labelledby="volume-lbl" />
      </>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no accessibility violations (range, thumbLabels)", async () => {
    const { container } = render(
      <Slider
        defaultValue={[20, 80]}
        thumbLabels={["Minimum price", "Maximum price"]}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("uses thumbLabels per thumb when provided", () => {
    render(<Slider defaultValue={[20, 80]} thumbLabels={["Min", "Max"]} />);
    const thumbs = screen.getAllByRole("slider");
    expect(thumbs[0]).toHaveAttribute("aria-label", "Min");
    expect(thumbs[1]).toHaveAttribute("aria-label", "Max");
  });

  it("forwards aria-labelledby to the thumb when no thumbLabels", () => {
    render(
      <>
        <span id="lbl">Volume</span>
        <Slider defaultValue={[40]} aria-labelledby="lbl" />
      </>
    );
    expect(screen.getByRole("slider")).toHaveAttribute(
      "aria-labelledby",
      "lbl"
    );
  });
});
