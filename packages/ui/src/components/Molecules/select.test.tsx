import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, it, expect, vi } from "vitest";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select";

function BasicSelect(
  props: {
    defaultValue?: string;
    value?: string;
    onValueChange?: (v: string) => void;
    disabled?: boolean;
    triggerClassName?: string;
    contentClassName?: string;
    itemClassName?: string;
  } = {}
) {
  const { triggerClassName, contentClassName, itemClassName, ...rootProps } =
    props;
  return (
    <Select {...rootProps}>
      <SelectTrigger className={triggerClassName} aria-label="Choose fruit">
        <SelectValue placeholder="Pick a fruit" />
      </SelectTrigger>
      <SelectContent className={contentClassName}>
        <SelectItem value="apple" className={itemClassName}>
          Apple
        </SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry" disabled>
          Cherry
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

describe("Select", () => {
  it("renders a closed trigger by default with the placeholder", () => {
    render(<BasicSelect />);
    const trigger = screen.getByRole("combobox", { name: "Choose fruit" });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("data-placeholder");
    expect(trigger).toHaveTextContent("Pick a fruit");
  });

  it("opens the listbox on click and exposes data-state=open", async () => {
    const user = userEvent.setup();
    render(<BasicSelect />);
    const trigger = screen.getByRole("combobox", { name: "Choose fruit" });

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("data-state", "open");
    expect(await screen.findByRole("listbox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });

  it("selects an option on click and updates the trigger label", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<BasicSelect onValueChange={onValueChange} />);

    await user.click(screen.getByRole("combobox", { name: "Choose fruit" }));
    await user.click(await screen.findByRole("option", { name: "Apple" }));

    expect(onValueChange).toHaveBeenCalledWith("apple");
    expect(
      screen.getByRole("combobox", { name: "Choose fruit" })
    ).toHaveTextContent("Apple");
  });

  it("respects defaultValue (uncontrolled)", () => {
    render(<BasicSelect defaultValue="banana" />);
    const trigger = screen.getByRole("combobox", { name: "Choose fruit" });
    expect(trigger).not.toHaveAttribute("data-placeholder");
    expect(trigger).toHaveTextContent("Banana");
  });

  it("supports controlled mode via value + onValueChange", async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [value, setValue] = React.useState<string | undefined>(undefined);
      return (
        <>
          <span data-testid="external">{value ?? "none"}</span>
          <BasicSelect value={value} onValueChange={setValue} />
        </>
      );
    }
    render(<Controlled />);

    await user.click(screen.getByRole("combobox", { name: "Choose fruit" }));
    await user.click(await screen.findByRole("option", { name: "Banana" }));

    expect(screen.getByTestId("external")).toHaveTextContent("banana");
  });

  it("does not open when disabled", async () => {
    const user = userEvent.setup();
    render(<BasicSelect disabled />);
    const trigger = screen.getByRole("combobox", { name: "Choose fruit" });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("marks per-item disabled options correctly", async () => {
    const user = userEvent.setup();
    render(<BasicSelect />);
    await user.click(screen.getByRole("combobox", { name: "Choose fruit" }));
    const cherry = await screen.findByRole("option", { name: "Cherry" });
    expect(cherry).toHaveAttribute("data-disabled");
  });

  it("opens via Space and selects via Enter", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<BasicSelect onValueChange={onValueChange} />);

    const trigger = screen.getByRole("combobox", { name: "Choose fruit" });
    trigger.focus();
    await user.keyboard("{ }");
    expect(await screen.findByRole("listbox")).toBeInTheDocument();

    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Enter}");

    expect(onValueChange).toHaveBeenCalledTimes(1);
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<BasicSelect />);
    const trigger = screen.getByRole("combobox", { name: "Choose fruit" });
    await user.click(trigger);
    expect(await screen.findByRole("listbox")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("merges custom className on Trigger / Content / Item", async () => {
    const user = userEvent.setup();
    render(
      <BasicSelect
        triggerClassName="trigger-x"
        contentClassName="content-x"
        itemClassName="item-x"
      />
    );
    expect(screen.getByRole("combobox", { name: "Choose fruit" })).toHaveClass(
      "trigger-x"
    );

    await user.click(screen.getByRole("combobox", { name: "Choose fruit" }));
    expect(document.querySelector("[data-slot='select-content']")).toHaveClass(
      "content-x"
    );
    expect(document.querySelector("[data-slot='select-item']")).toHaveClass(
      "item-x"
    );
  });

  it("sets data-slot on every DOM-rendering part", () => {
    render(
      <Select defaultOpen>
        <SelectTrigger>
          <SelectValue placeholder="x" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruit</SelectLabel>
            <SelectItem value="a">A</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectItem value="b">B</SelectItem>
        </SelectContent>
      </Select>
    );

    // Root + Portal are logical FCs (no DOM), so we don't assert data-slot
    // on them. Every DOM-rendering part must carry its slot:
    expect(
      document.querySelector("[data-slot='select-trigger']")
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='select-value']")
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='select-content']")
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='select-viewport']")
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='select-group']")
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='select-label']")
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='select-item']")
    ).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='select-separator']")
    ).toBeInTheDocument();
    // Listbox surfaces and the trigger reports the open state.
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(
      document.querySelector("[data-slot='select-trigger']")
    ).toHaveAttribute("data-state", "open");
  });

  it("renders the scroll button wrappers (Radix only injects DOM when overflow is real, but the wrapper functions still execute for coverage)", () => {
    // Covers SelectScrollUpButton / SelectScrollDownButton branches by
    // exercising them as standalone JSX. In jsdom there's no real overflow
    // so Radix returns null at runtime — the *component functions* still
    // run, which is what coverage tracks.
    render(
      <Select defaultOpen>
        <SelectTrigger>
          <SelectValue placeholder="x" />
        </SelectTrigger>
        <SelectContent>
          <SelectScrollUpButton className="scroll-up-x" />
          <SelectItem value="a">A</SelectItem>
          <SelectScrollDownButton className="scroll-down-x" />
        </SelectContent>
      </Select>
    );
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  describe("accessibility", () => {
    it("has no a11y violations when closed", async () => {
      const { container } = render(<BasicSelect />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no a11y violations when open", async () => {
      const user = userEvent.setup();
      const { container } = render(<BasicSelect />);
      await user.click(screen.getByRole("combobox", { name: "Choose fruit" }));
      await screen.findByRole("listbox");
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
