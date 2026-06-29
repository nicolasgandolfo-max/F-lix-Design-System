import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, it, expect, vi } from "vitest";

import { Checkbox } from "./checkbox";
import { Label } from "./label";

describe("Checkbox", () => {
  it("renders with role checkbox and data-slot", () => {
    render(<Checkbox aria-label="Accept" />);
    const cb = screen.getByRole("checkbox", { name: "Accept" });
    expect(cb).toBeInTheDocument();
    expect(cb).toHaveAttribute("data-slot", "checkbox");
    expect(cb).toHaveAttribute("data-state", "unchecked");
    expect(cb).toHaveAttribute("data-size", "md");
  });

  it("toggles on click (uncontrolled)", async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Accept" />);
    const cb = screen.getByRole("checkbox", { name: "Accept" });

    expect(cb).toHaveAttribute("data-state", "unchecked");
    await user.click(cb);
    expect(cb).toHaveAttribute("data-state", "checked");
    await user.click(cb);
    expect(cb).toHaveAttribute("data-state", "unchecked");
  });

  it("honors defaultChecked", () => {
    render(<Checkbox aria-label="Accept" defaultChecked />);
    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "data-state",
      "checked"
    );
  });

  it("is controllable via checked + onCheckedChange", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();

    function Controlled() {
      const [checked, setChecked] = React.useState(false);
      return (
        <Checkbox
          aria-label="Accept"
          checked={checked}
          onCheckedChange={(next) => {
            onCheckedChange(next);
            setChecked(Boolean(next));
          }}
        />
      );
    }

    render(<Controlled />);
    const cb = screen.getByRole("checkbox");
    expect(cb).toHaveAttribute("data-state", "unchecked");

    await user.click(cb);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(cb).toHaveAttribute("data-state", "checked");
  });

  it("supports the indeterminate state (aria-checked=mixed + minus icon)", () => {
    render(<Checkbox aria-label="Select all" checked="indeterminate" />);
    const cb = screen.getByRole("checkbox");
    expect(cb).toHaveAttribute("aria-checked", "mixed");
    expect(cb).toHaveAttribute("data-state", "indeterminate");
  });

  it("does not toggle when disabled", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <Checkbox
        aria-label="Accept"
        disabled
        onCheckedChange={onCheckedChange}
      />
    );
    const cb = screen.getByRole("checkbox");
    expect(cb).toBeDisabled();
    await user.click(cb);
    expect(onCheckedChange).not.toHaveBeenCalled();
    expect(cb).toHaveAttribute("data-state", "unchecked");
  });

  it("toggles with keyboard (Space)", async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Accept" />);
    const cb = screen.getByRole("checkbox");
    cb.focus();
    expect(cb).toHaveFocus();

    await user.keyboard(" ");
    expect(cb).toHaveAttribute("data-state", "checked");
    await user.keyboard(" ");
    expect(cb).toHaveAttribute("data-state", "unchecked");
  });

  it("applies size variant classes", () => {
    const { rerender } = render(<Checkbox aria-label="md" />);
    expect(screen.getByRole("checkbox")).toHaveClass("size-5");

    rerender(<Checkbox aria-label="sm" size="sm" />);
    expect(screen.getByRole("checkbox")).toHaveClass("size-4");
  });

  it("falls back to md when size is explicitly null", () => {
    render(
      <Checkbox
        aria-label="null-size"
        defaultChecked
        size={null as unknown as undefined}
      />
    );
    const cb = screen.getByRole("checkbox");
    expect(cb).toHaveClass("size-5");
    const indicator = cb.querySelector("[data-slot='checkbox-indicator']");
    expect(indicator).not.toBeNull();
    expect(indicator?.querySelector(".size-3\\.5")).not.toBeNull();
  });

  it("composes with Label via htmlFor/id", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Checkbox id="terms" />
        <Label htmlFor="terms">I agree to the terms</Label>
      </div>
    );

    const label = screen.getByText("I agree to the terms");
    await user.click(label);
    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "data-state",
      "checked"
    );
  });

  it("passes aria-invalid through", () => {
    render(<Checkbox aria-label="invalid" aria-invalid="true" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  it("has no a11y violations (unchecked)", async () => {
    const { container } = render(
      <>
        <Checkbox id="a" />
        <Label htmlFor="a">Unchecked</Label>
      </>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no a11y violations (checked)", async () => {
    const { container } = render(
      <>
        <Checkbox id="b" defaultChecked />
        <Label htmlFor="b">Checked</Label>
      </>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no a11y violations (indeterminate)", async () => {
    const { container } = render(
      <>
        <Checkbox id="c" checked="indeterminate" />
        <Label htmlFor="c">Indeterminate</Label>
      </>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no a11y violations (disabled)", async () => {
    const { container } = render(
      <>
        <Checkbox id="d" disabled />
        <Label htmlFor="d">Disabled</Label>
      </>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
