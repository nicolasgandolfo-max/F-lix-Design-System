import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, it, expect, vi } from "vitest";

import { Collapse, CollapseContent, CollapseTrigger } from "./collapse";

function BasicCollapse(props: React.ComponentProps<typeof Collapse> = {}) {
  return (
    <Collapse {...props}>
      <CollapseTrigger>Is it accessible?</CollapseTrigger>
      <CollapseContent>Yes. Built on Radix Collapsible.</CollapseContent>
    </Collapse>
  );
}

describe("Collapse", () => {
  it("renders a trigger and starts closed", () => {
    render(<BasicCollapse />);
    const trigger = screen.getByRole("button", { name: "Is it accessible?" });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("opens the content when the trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<BasicCollapse />);
    const trigger = screen.getByRole("button", { name: "Is it accessible?" });

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText("Yes. Built on Radix Collapsible.")
    ).toBeInTheDocument();
  });

  it("toggles closed on a second click", async () => {
    const user = userEvent.setup();
    render(<BasicCollapse />);
    const trigger = screen.getByRole("button", { name: "Is it accessible?" });

    await user.click(trigger);
    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("respects defaultOpen (uncontrolled)", () => {
    render(<BasicCollapse defaultOpen />);
    const trigger = screen.getByRole("button", { name: "Is it accessible?" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText("Yes. Built on Radix Collapsible.")
    ).toBeInTheDocument();
  });

  it("supports controlled mode via open + onOpenChange", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    function Controlled() {
      const [open, setOpen] = React.useState(false);
      return (
        <BasicCollapse
          open={open}
          onOpenChange={(next) => {
            onOpenChange(next);
            setOpen(next);
          }}
        />
      );
    }

    render(<Controlled />);
    const trigger = screen.getByRole("button", { name: "Is it accessible?" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.click(trigger);
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("supports keyboard activation (Enter and Space)", async () => {
    const user = userEvent.setup();
    render(<BasicCollapse />);
    const trigger = screen.getByRole("button", { name: "Is it accessible?" });

    trigger.focus();
    await user.keyboard("{Enter}");
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.keyboard(" ");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("renders the default chevron indicator with the right slot", () => {
    render(<BasicCollapse />);
    const trigger = screen.getByRole("button", { name: "Is it accessible?" });
    const indicator = trigger.querySelector("[data-slot='collapse-indicator']");
    expect(indicator).toBeInTheDocument();
    expect(indicator?.querySelector("svg")).toBeInTheDocument();
  });

  it("flips the chevron when open via the data-state selector", async () => {
    const user = userEvent.setup();
    render(<BasicCollapse />);
    const trigger = screen.getByRole("button", { name: "Is it accessible?" });

    expect(trigger).toHaveAttribute("data-state", "closed");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("data-state", "open");
    expect(trigger).toHaveClass("[&[data-state=open]>span>svg]:rotate-180");
  });

  it("allows replacing the indicator via the `indicator` prop", () => {
    render(
      <Collapse>
        <CollapseTrigger indicator={<span data-testid="custom" />}>
          Title
        </CollapseTrigger>
        <CollapseContent>Body</CollapseContent>
      </Collapse>
    );
    expect(screen.getByTestId("custom")).toBeInTheDocument();
  });

  it("omits the indicator when `indicator={null}`", () => {
    render(
      <Collapse>
        <CollapseTrigger indicator={null}>Title</CollapseTrigger>
        <CollapseContent>Body</CollapseContent>
      </Collapse>
    );
    const trigger = screen.getByRole("button", { name: "Title" });
    expect(
      trigger.querySelector("[data-slot='collapse-indicator']")
    ).toBeNull();
  });

  it("does not toggle when the root is disabled", async () => {
    const user = userEvent.setup();
    render(<BasicCollapse disabled />);
    const trigger = screen.getByRole("button", { name: "Is it accessible?" });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("merges custom className on every part", () => {
    const { container } = render(
      <Collapse defaultOpen className="root-x">
        <CollapseTrigger className="trigger-x">Title</CollapseTrigger>
        <CollapseContent className="content-x">Body</CollapseContent>
      </Collapse>
    );
    expect(container.querySelector("[data-slot='collapse']")).toHaveClass(
      "root-x"
    );
    expect(
      container.querySelector("[data-slot='collapse-trigger']")
    ).toHaveClass("trigger-x");
    // CollapseContent forwards className to the inner card-tinted body div
    // so consumers can swap padding / colors without losing the animation
    // wrapper that bridges --radix-collapsible-content-height.
    expect(
      container.querySelector("[data-slot='collapse-content'] > div")
    ).toHaveClass("content-x");
  });

  it("forwards extra style on CollapseContent without dropping the height var", () => {
    const { container } = render(
      <Collapse defaultOpen>
        <CollapseTrigger>Title</CollapseTrigger>
        <CollapseContent style={{ color: "red" }}>Body</CollapseContent>
      </Collapse>
    );
    const content = container.querySelector(
      "[data-slot='collapse-content']"
    ) as HTMLElement;
    expect(content).toBeInTheDocument();
    expect(content.style.color).toBe("red");
    expect(content.style.getPropertyValue("--collapse-content-height")).toBe(
      "var(--radix-collapsible-content-height)"
    );
  });

  it("sets expected data-slot values on root, trigger, content, indicator", () => {
    const { container } = render(
      <Collapse defaultOpen>
        <CollapseTrigger>Title</CollapseTrigger>
        <CollapseContent>Body</CollapseContent>
      </Collapse>
    );
    expect(
      container.querySelector("[data-slot='collapse']")
    ).toBeInTheDocument();
    expect(
      container.querySelector("[data-slot='collapse-trigger']")
    ).toBeInTheDocument();
    expect(
      container.querySelector("[data-slot='collapse-content']")
    ).toBeInTheDocument();
    expect(
      container.querySelector("[data-slot='collapse-indicator']")
    ).toBeInTheDocument();
  });

  describe("accessibility", () => {
    it("has no a11y violations (closed)", async () => {
      const { container } = render(<BasicCollapse />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no a11y violations (open)", async () => {
      const user = userEvent.setup();
      const { container } = render(<BasicCollapse />);
      await user.click(
        screen.getByRole("button", { name: "Is it accessible?" })
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
