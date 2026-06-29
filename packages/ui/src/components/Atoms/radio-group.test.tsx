import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, it, expect, vi } from "vitest";

import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Label } from "./label";

function renderBasicGroup(props: React.ComponentProps<typeof RadioGroup> = {}) {
  return render(
    <RadioGroup aria-label="Channel" {...props}>
      <RadioGroupItem value="a" aria-label="A" />
      <RadioGroupItem value="b" aria-label="B" />
      <RadioGroupItem value="c" aria-label="C" />
    </RadioGroup>
  );
}

describe("RadioGroup", () => {
  it("renders group and items with the correct roles and slots", () => {
    renderBasicGroup();
    expect(screen.getByRole("radiogroup")).toHaveAttribute(
      "data-slot",
      "radio-group"
    );
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(3);
    radios.forEach((radio) => {
      expect(radio).toHaveAttribute("data-slot", "radio-group-item");
      expect(radio).toHaveAttribute("data-state", "unchecked");
      expect(radio).toHaveAttribute("data-size", "md");
    });
  });

  it("selects a single item at a time (uncontrolled)", async () => {
    const user = userEvent.setup();
    renderBasicGroup();
    const [a, b] = screen.getAllByRole("radio");

    await user.click(a);
    expect(a).toHaveAttribute("data-state", "checked");
    expect(b).toHaveAttribute("data-state", "unchecked");

    await user.click(b);
    expect(a).toHaveAttribute("data-state", "unchecked");
    expect(b).toHaveAttribute("data-state", "checked");
  });

  it("honors defaultValue", () => {
    renderBasicGroup({ defaultValue: "b" });
    const [a, b, c] = screen.getAllByRole("radio");
    expect(a).toHaveAttribute("data-state", "unchecked");
    expect(b).toHaveAttribute("data-state", "checked");
    expect(c).toHaveAttribute("data-state", "unchecked");
  });

  it("is controllable via value + onValueChange", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    function Controlled() {
      const [value, setValue] = React.useState<string>("a");
      return (
        <RadioGroup
          aria-label="Channel"
          value={value}
          onValueChange={(next) => {
            onValueChange(next);
            setValue(next);
          }}
        >
          <RadioGroupItem value="a" aria-label="A" />
          <RadioGroupItem value="b" aria-label="B" />
        </RadioGroup>
      );
    }

    render(<Controlled />);
    const [a, b] = screen.getAllByRole("radio");
    expect(a).toHaveAttribute("data-state", "checked");

    await user.click(b);
    expect(onValueChange).toHaveBeenCalledWith("b");
    expect(b).toHaveAttribute("data-state", "checked");
    expect(a).toHaveAttribute("data-state", "unchecked");
  });

  it("does not select any item when the group is disabled", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <RadioGroup aria-label="Channel" disabled onValueChange={onValueChange}>
        <RadioGroupItem value="a" aria-label="A" />
        <RadioGroupItem value="b" aria-label="B" />
      </RadioGroup>
    );

    const [a, b] = screen.getAllByRole("radio");
    expect(a).toBeDisabled();
    expect(b).toBeDisabled();

    await user.click(a);
    expect(onValueChange).not.toHaveBeenCalled();
    expect(a).toHaveAttribute("data-state", "unchecked");
  });

  it("skips a single disabled item while leaving others selectable", async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup aria-label="Channel">
        <RadioGroupItem value="a" aria-label="A" disabled />
        <RadioGroupItem value="b" aria-label="B" />
      </RadioGroup>
    );
    const [a, b] = screen.getAllByRole("radio");

    await user.click(a);
    expect(a).toHaveAttribute("data-state", "unchecked");

    await user.click(b);
    expect(b).toHaveAttribute("data-state", "checked");
  });

  it("ArrowDown roves focus between items", async () => {
    const user = userEvent.setup();
    renderBasicGroup();
    const [a, b, c] = screen.getAllByRole("radio");

    a.focus();
    expect(a).toHaveFocus();

    await user.keyboard("{ArrowDown}");
    expect(b).toHaveFocus();

    await user.keyboard("{ArrowDown}");
    expect(c).toHaveFocus();
  });

  it("Space selects the focused item", async () => {
    const user = userEvent.setup();
    renderBasicGroup();
    const [a, b] = screen.getAllByRole("radio");

    b.focus();
    await user.keyboard(" ");
    expect(b).toHaveAttribute("data-state", "checked");
    expect(a).toHaveAttribute("data-state", "unchecked");
  });

  it("applies the correct size classes at the item level", () => {
    render(
      <RadioGroup aria-label="Channel">
        <RadioGroupItem value="a" aria-label="A" size="md" />
        <RadioGroupItem value="b" aria-label="B" size="sm" />
      </RadioGroup>
    );
    const [a, b] = screen.getAllByRole("radio");
    expect(a).toHaveClass("size-5");
    expect(a).toHaveAttribute("data-size", "md");
    expect(b).toHaveClass("size-4");
    expect(b).toHaveAttribute("data-size", "sm");
  });

  it("propagates size from RadioGroup to items via context", () => {
    render(
      <RadioGroup aria-label="Channel" size="sm">
        <RadioGroupItem value="a" aria-label="A" />
        <RadioGroupItem value="b" aria-label="B" />
      </RadioGroup>
    );
    screen.getAllByRole("radio").forEach((radio) => {
      expect(radio).toHaveClass("size-4");
      expect(radio).toHaveAttribute("data-size", "sm");
    });
  });

  it("lets an explicit item-level size override the group context", () => {
    render(
      <RadioGroup aria-label="Channel" size="sm">
        <RadioGroupItem value="a" aria-label="A" />
        <RadioGroupItem value="b" aria-label="B" size="md" />
      </RadioGroup>
    );
    const [a, b] = screen.getAllByRole("radio");
    expect(a).toHaveClass("size-4");
    expect(b).toHaveClass("size-5");
  });

  it("falls back to md when size is explicitly null on the item", () => {
    render(
      <RadioGroup aria-label="Channel">
        <RadioGroupItem
          value="a"
          aria-label="A"
          defaultChecked
          size={null as unknown as undefined}
        />
      </RadioGroup>
    );
    const radio = screen.getByRole("radio");
    expect(radio).toHaveClass("size-5");
    expect(radio).toHaveAttribute("data-size", "md");
  });

  it("composes with Label via htmlFor/id", async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup aria-label="Channel">
        <div>
          <RadioGroupItem id="r-email" value="email" />
          <Label htmlFor="r-email">Email</Label>
        </div>
      </RadioGroup>
    );

    await user.click(screen.getByText("Email"));
    expect(screen.getByRole("radio")).toHaveAttribute("data-state", "checked");
  });

  it("passes aria-invalid through on the item", () => {
    render(
      <RadioGroup aria-label="Channel">
        <RadioGroupItem value="a" aria-label="A" aria-invalid="true" />
      </RadioGroup>
    );
    expect(screen.getByRole("radio")).toHaveAttribute("aria-invalid", "true");
  });

  it("has no a11y violations (unselected)", async () => {
    const { container } = render(
      <RadioGroup aria-label="Channel">
        <div>
          <RadioGroupItem id="u-a" value="a" />
          <Label htmlFor="u-a">A</Label>
        </div>
        <div>
          <RadioGroupItem id="u-b" value="b" />
          <Label htmlFor="u-b">B</Label>
        </div>
      </RadioGroup>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no a11y violations (selected)", async () => {
    const { container } = render(
      <RadioGroup aria-label="Channel" defaultValue="a">
        <div>
          <RadioGroupItem id="s-a" value="a" />
          <Label htmlFor="s-a">A</Label>
        </div>
        <div>
          <RadioGroupItem id="s-b" value="b" />
          <Label htmlFor="s-b">B</Label>
        </div>
      </RadioGroup>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no a11y violations (disabled)", async () => {
    const { container } = render(
      <RadioGroup aria-label="Channel" disabled>
        <div>
          <RadioGroupItem id="d-a" value="a" />
          <Label htmlFor="d-a">A</Label>
        </div>
        <div>
          <RadioGroupItem id="d-b" value="b" />
          <Label htmlFor="d-b">B</Label>
        </div>
      </RadioGroup>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
