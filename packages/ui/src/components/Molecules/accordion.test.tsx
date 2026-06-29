import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, it, expect } from "vitest";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

function renderBasic(
  type: "single" | "multiple" = "single",
  collapsible = true
) {
  const props =
    type === "single"
      ? ({ type: "single", collapsible } as const)
      : ({ type: "multiple" } as const);

  return render(
    <Accordion {...props}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. WAI-ARIA compliant.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. Matches the Felix design system.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. Subtle expand/collapse animation.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

describe("Accordion", () => {
  it("renders all triggers", () => {
    renderBasic();
    expect(
      screen.getByRole("button", { name: "Is it accessible?" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Is it styled?" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Is it animated?" })
    ).toBeInTheDocument();
  });

  it("starts with all panels closed (aria-expanded='false')", () => {
    renderBasic();
    const triggers = screen.getAllByRole("button");
    triggers.forEach((t) =>
      expect(t).toHaveAttribute("aria-expanded", "false")
    );
  });

  it("opens a panel on trigger click", async () => {
    const user = userEvent.setup();
    renderBasic();
    const trigger = screen.getByRole("button", { name: "Is it accessible?" });

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("region", { name: "Is it accessible?" })
    ).toBeInTheDocument();
  });

  it("closes a panel on second click when collapsible", async () => {
    const user = userEvent.setup();
    renderBasic("single", true);
    const trigger = screen.getByRole("button", { name: "Is it accessible?" });

    await user.click(trigger);
    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("type='single' closes the previously open panel when another opens", async () => {
    const user = userEvent.setup();
    renderBasic("single");
    const t1 = screen.getByRole("button", { name: "Is it accessible?" });
    const t2 = screen.getByRole("button", { name: "Is it styled?" });

    await user.click(t1);
    expect(t1).toHaveAttribute("aria-expanded", "true");

    await user.click(t2);
    expect(t1).toHaveAttribute("aria-expanded", "false");
    expect(t2).toHaveAttribute("aria-expanded", "true");
  });

  it("type='multiple' allows multiple panels open simultaneously", async () => {
    const user = userEvent.setup();
    renderBasic("multiple");
    const t1 = screen.getByRole("button", { name: "Is it accessible?" });
    const t2 = screen.getByRole("button", { name: "Is it styled?" });

    await user.click(t1);
    await user.click(t2);

    expect(t1).toHaveAttribute("aria-expanded", "true");
    expect(t2).toHaveAttribute("aria-expanded", "true");
  });

  it("supports keyboard activation (Enter and Space)", async () => {
    const user = userEvent.setup();
    renderBasic();
    const trigger = screen.getByRole("button", { name: "Is it accessible?" });

    trigger.focus();
    await user.keyboard("{Enter}");
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.keyboard(" ");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("renders the default chevron indicator", () => {
    renderBasic();
    const trigger = screen.getByRole("button", { name: "Is it accessible?" });
    expect(
      trigger.querySelector("[data-slot='accordion-indicator']")
    ).toBeInTheDocument();
  });

  it("allows replacing the indicator via the `indicator` prop", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="x">
          <AccordionTrigger indicator={<span data-testid="custom" />}>
            Title
          </AccordionTrigger>
          <AccordionContent>Body</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByTestId("custom")).toBeInTheDocument();
  });

  it("omits the indicator when `indicator={null}`", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="x">
          <AccordionTrigger indicator={null}>Title</AccordionTrigger>
          <AccordionContent>Body</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    const trigger = screen.getByRole("button", { name: "Title" });
    expect(
      trigger.querySelector("[data-slot='accordion-indicator']")
    ).toBeNull();
  });

  it("respects defaultValue (uncontrolled)", () => {
    render(
      <Accordion type="single" collapsible defaultValue="item-2">
        <AccordionItem value="item-1">
          <AccordionTrigger>One</AccordionTrigger>
          <AccordionContent>1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Two</AccordionTrigger>
          <AccordionContent>2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByRole("button", { name: "One" })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
    expect(screen.getByRole("button", { name: "Two" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
  });

  it("does not toggle when an item is disabled", async () => {
    const user = userEvent.setup();
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="x" disabled>
          <AccordionTrigger>Locked</AccordionTrigger>
          <AccordionContent>Hidden</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    const trigger = screen.getByRole("button", { name: "Locked" });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("merges custom className on every part", () => {
    const { container } = render(
      <Accordion type="single" collapsible className="root-x">
        <AccordionItem value="a" className="item-x">
          <AccordionTrigger className="trigger-x">Title</AccordionTrigger>
          <AccordionContent className="content-x">Body</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(container.querySelector("[data-slot='accordion']")).toHaveClass(
      "root-x"
    );
    expect(container.querySelector("[data-slot='accordion-item']")).toHaveClass(
      "item-x"
    );
    expect(
      container.querySelector("[data-slot='accordion-trigger']")
    ).toHaveClass("trigger-x");
  });

  it("sets expected data-slot values", () => {
    const { container } = render(
      <Accordion type="single" collapsible defaultValue="a">
        <AccordionItem value="a">
          <AccordionTrigger>Title</AccordionTrigger>
          <AccordionContent>Body</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(
      container.querySelector("[data-slot='accordion']")
    ).toBeInTheDocument();
    expect(
      container.querySelector("[data-slot='accordion-item']")
    ).toBeInTheDocument();
    expect(
      container.querySelector("[data-slot='accordion-trigger']")
    ).toBeInTheDocument();
    expect(
      container.querySelector("[data-slot='accordion-content']")
    ).toBeInTheDocument();
    expect(
      container.querySelector("[data-slot='accordion-indicator']")
    ).toBeInTheDocument();
  });

  describe("accessibility", () => {
    it("has no a11y violations (closed)", async () => {
      const { container } = renderBasic();
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no a11y violations (open)", async () => {
      const user = userEvent.setup();
      const { container } = renderBasic();
      await user.click(
        screen.getByRole("button", { name: "Is it accessible?" })
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
