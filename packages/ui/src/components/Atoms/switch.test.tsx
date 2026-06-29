import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, it, expect, vi } from "vitest";

import { Switch } from "./switch";
import { Label } from "./label";

describe("Switch", () => {
  it("renders with role='switch' and the expected data attributes", () => {
    render(<Switch aria-label="Notifications" />);

    const sw = screen.getByRole("switch", { name: /notifications/i });
    expect(sw).toBeInTheDocument();
    expect(sw).toHaveAttribute("data-slot", "switch");
    expect(sw).toHaveAttribute("data-state", "unchecked");
    expect(sw).toHaveAttribute("data-size", "md");

    const thumb = sw.querySelector<HTMLElement>("[data-slot='switch-thumb']");
    expect(thumb).not.toBeNull();
    expect(thumb).toHaveAttribute("data-state", "unchecked");
  });

  it("toggles on click (uncontrolled)", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <Switch aria-label="Notifications" onCheckedChange={onCheckedChange} />
    );

    const sw = screen.getByRole("switch");
    expect(sw).toHaveAttribute("data-state", "unchecked");

    await user.click(sw);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(sw).toHaveAttribute("data-state", "checked");

    await user.click(sw);
    expect(onCheckedChange).toHaveBeenLastCalledWith(false);
    expect(sw).toHaveAttribute("data-state", "unchecked");
  });

  it("honors defaultChecked", () => {
    render(<Switch aria-label="on" defaultChecked />);
    expect(screen.getByRole("switch")).toHaveAttribute("data-state", "checked");
  });

  it("supports controlled mode", async () => {
    const user = userEvent.setup();

    function Controlled() {
      const [checked, setChecked] = React.useState(false);
      return (
        <Switch
          aria-label="controlled"
          checked={checked}
          onCheckedChange={setChecked}
        />
      );
    }

    render(<Controlled />);
    const sw = screen.getByRole("switch");

    expect(sw).toHaveAttribute("data-state", "unchecked");
    await user.click(sw);
    expect(sw).toHaveAttribute("data-state", "checked");
  });

  it("does not toggle when disabled", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();

    render(
      <Switch
        aria-label="disabled"
        disabled
        onCheckedChange={onCheckedChange}
      />
    );

    const sw = screen.getByRole("switch");
    await user.click(sw);
    expect(onCheckedChange).not.toHaveBeenCalled();
    expect(sw).toHaveAttribute("data-state", "unchecked");
    expect(sw).toBeDisabled();
  });

  it("toggles via Space and Enter keys", async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="keyboard" />);

    const sw = screen.getByRole("switch");
    sw.focus();
    expect(sw).toHaveFocus();

    await user.keyboard("[Space]");
    expect(sw).toHaveAttribute("data-state", "checked");

    await user.keyboard("[Enter]");
    expect(sw).toHaveAttribute("data-state", "unchecked");
  });

  it("applies md sizing classes by default", () => {
    render(<Switch aria-label="md" />);
    const sw = screen.getByRole("switch");
    expect(sw).toHaveAttribute("data-size", "md");
    expect(sw.className).toMatch(/\bh-6\b/);
    expect(sw.className).toMatch(/\bw-11\b/);
    expect(sw.className).toMatch(/\bp-0\.75\b/);

    const thumb = sw.querySelector<HTMLElement>("[data-slot='switch-thumb']");
    expect(thumb?.className).toMatch(/\bsize-4\.5\b/);
  });

  it("applies sm sizing classes when size='sm'", () => {
    render(<Switch aria-label="sm" size="sm" />);
    const sw = screen.getByRole("switch");
    expect(sw).toHaveAttribute("data-size", "sm");
    expect(sw.className).toMatch(/\bh-5\b/);
    expect(sw.className).toMatch(/\bw-9\b/);
    expect(sw.className).toMatch(/\bp-0\.5\b/);

    const thumb = sw.querySelector<HTMLElement>("[data-slot='switch-thumb']");
    expect(thumb?.className).toMatch(/\bsize-4\b/);
  });

  it("falls back to md when size is explicitly null", () => {
    render(
      <Switch aria-label="null-size" size={null as unknown as undefined} />
    );
    const sw = screen.getByRole("switch");
    expect(sw).toHaveAttribute("data-size", "md");
    expect(sw.className).toMatch(/\bh-6\b/);

    const thumb = sw.querySelector<HTMLElement>("[data-slot='switch-thumb']");
    expect(thumb?.className).toMatch(/\bsize-4\.5\b/);
  });

  it("merges user-supplied className", () => {
    render(<Switch aria-label="custom" className="custom-sw" />);
    expect(screen.getByRole("switch").className).toMatch(/custom-sw/);
  });

  it("composes with Label via htmlFor/id", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Switch id="notifications" />
        <Label htmlFor="notifications">Enable notifications</Label>
      </div>
    );

    const label = screen.getByText(/enable notifications/i);
    await user.click(label);
    expect(screen.getByRole("switch")).toHaveAttribute("data-state", "checked");
  });

  it("passes aria-invalid through to the root", () => {
    render(<Switch aria-label="invalid" aria-invalid="true" />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-invalid", "true");
  });

  it("has no axe violations — off, on, disabled", async () => {
    const { container: off } = render(<Switch aria-label="off" />);
    expect(await axe(off)).toHaveNoViolations();

    const { container: on } = render(<Switch aria-label="on" defaultChecked />);
    expect(await axe(on)).toHaveNoViolations();

    const { container: disabled } = render(
      <Switch aria-label="disabled" disabled />
    );
    expect(await axe(disabled)).toHaveNoViolations();
  });
});
