import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, it, expect, vi } from "vitest";

import { Stepper } from "./stepper";

function renderSteps(activeIndex: number, labels: string[]) {
  return render(
    <Stepper activeIndex={activeIndex}>
      {labels.map((label) => (
        <Stepper.Step key={label}>{label}</Stepper.Step>
      ))}
    </Stepper>
  );
}

describe("Stepper", () => {
  it("renders all step labels", () => {
    renderSteps(1, ["Account", "Profile", "Review"]);
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Review")).toBeInTheDocument();
  });

  it("derives correct data-state from activeIndex", () => {
    renderSteps(1, ["One", "Two", "Three"]);
    const steps = screen.getAllByRole("listitem");
    expect(steps[0]).toHaveAttribute("data-state", "completed");
    expect(steps[1]).toHaveAttribute("data-state", "active");
    expect(steps[2]).toHaveAttribute("data-state", "upcoming");
  });

  it("sets aria-current='step' on the active step only", () => {
    renderSteps(1, ["One", "Two", "Three"]);
    const steps = screen.getAllByRole("listitem");
    expect(steps[0]).not.toHaveAttribute("aria-current");
    expect(steps[1]).toHaveAttribute("aria-current", "step");
    expect(steps[2]).not.toHaveAttribute("aria-current");
  });

  it("renders 2*(n-1) divider halves for n steps", () => {
    const { container } = renderSteps(0, ["A", "B", "C", "D"]);
    const dividers = container.querySelectorAll(
      "[data-slot='stepper-divider']"
    );
    // first step: right only, last step: left only, middles: both
    expect(dividers).toHaveLength(2 * (4 - 1));
  });

  it("colors connector halves to track progression (completed = primary)", () => {
    renderSteps(2, ["One", "Two", "Three", "Four"]);
    const steps = screen.getAllByRole("listitem");

    // Step 0 (completed): right half connects to step 1 → primary
    const s0Right = steps[0].querySelector<HTMLElement>(
      "[data-slot='stepper-divider'][data-position='right']"
    )!;
    expect(s0Right).toHaveAttribute("data-state", "completed");
    expect(s0Right).toHaveClass("bg-primary");

    // Step 1 (completed): both halves primary
    const s1Left = steps[1].querySelector<HTMLElement>(
      "[data-slot='stepper-divider'][data-position='left']"
    )!;
    const s1Right = steps[1].querySelector<HTMLElement>(
      "[data-slot='stepper-divider'][data-position='right']"
    )!;
    expect(s1Left).toHaveClass("bg-primary");
    expect(s1Right).toHaveClass("bg-primary");

    // Step 2 (active): left half reaches primary, right half upcoming → border
    const s2Left = steps[2].querySelector<HTMLElement>(
      "[data-slot='stepper-divider'][data-position='left']"
    )!;
    const s2Right = steps[2].querySelector<HTMLElement>(
      "[data-slot='stepper-divider'][data-position='right']"
    )!;
    expect(s2Left).toHaveClass("bg-primary");
    expect(s2Right).toHaveClass("bg-border");

    // Step 3 (upcoming last): left only, border
    const s3Left = steps[3].querySelector<HTMLElement>(
      "[data-slot='stepper-divider'][data-position='left']"
    )!;
    expect(s3Left).toHaveClass("bg-border");
    expect(
      steps[3].querySelector(
        "[data-slot='stepper-divider'][data-position='right']"
      )
    ).toBeNull();
  });

  it("ignores non-element children (booleans, null, strings)", () => {
    const { container } = render(
      <Stepper activeIndex={0}>
        {false}
        {null}
        <Stepper.Step>One</Stepper.Step>
        {"plain text"}
        <Stepper.Step>Two</Stepper.Step>
      </Stepper>
    );
    const steps = screen.getAllByRole("listitem");
    expect(steps).toHaveLength(2);
    // active index still resolves correctly against the filtered list
    expect(steps[0]).toHaveAttribute("data-state", "active");
    expect(steps[1]).toHaveAttribute("data-state", "upcoming");
    expect(container.textContent).not.toContain("plain text");
  });

  it("preserves explicit child keys on the wrapping context provider", () => {
    // Re-rendering with the same explicit keys should not unmount/remount
    // any step. We assert this indirectly: the markup remains stable.
    const { rerender, container } = render(
      <Stepper activeIndex={0}>
        <Stepper.Step key="account">Account</Stepper.Step>
        <Stepper.Step key="profile">Profile</Stepper.Step>
      </Stepper>
    );
    const beforeHTML = container.innerHTML;
    rerender(
      <Stepper activeIndex={0}>
        <Stepper.Step key="account">Account</Stepper.Step>
        <Stepper.Step key="profile">Profile</Stepper.Step>
      </Stepper>
    );
    expect(container.innerHTML).toBe(beforeHTML);
  });

  it("does not render any connector halves for a single step", () => {
    const { container } = renderSteps(0, ["Only"]);
    const dividers = container.querySelectorAll(
      "[data-slot='stepper-divider']"
    );
    expect(dividers).toHaveLength(0);
  });

  it("allows labels to wrap (no whitespace-nowrap)", () => {
    renderSteps(0, ["A very long multi-word step label"]);
    const label = screen
      .getByText("A very long multi-word step label")
      .closest("[data-slot='stepper-label']")!;
    expect(label).not.toHaveClass("whitespace-nowrap");
    expect(label).toHaveClass("wrap-break-word");
  });

  it("renders a check icon (not a number) inside completed indicator", () => {
    renderSteps(2, ["One", "Two", "Three"]);
    const steps = screen.getAllByRole("listitem");
    const firstIndicator = steps[0].querySelector(
      "[data-slot='stepper-indicator']"
    )!;
    expect(firstIndicator.querySelector("svg")).toBeInTheDocument();
    expect(firstIndicator.textContent).toBe("");

    const activeIndicator = steps[2].querySelector(
      "[data-slot='stepper-indicator']"
    )!;
    expect(activeIndicator.querySelector("svg")).toBeNull();
    expect(activeIndicator.textContent).toBe("3");
  });

  it("renders the step number for upcoming and active states", () => {
    renderSteps(0, ["One", "Two"]);
    const steps = screen.getAllByRole("listitem");
    const active = steps[0].querySelector("[data-slot='stepper-indicator']")!;
    const upcoming = steps[1].querySelector("[data-slot='stepper-indicator']")!;
    expect(active.textContent).toBe("1");
    expect(upcoming.textContent).toBe("2");
  });

  it("allows Stepper.Step `state` prop to override derived state", () => {
    render(
      <Stepper activeIndex={0}>
        <Stepper.Step>One</Stepper.Step>
        <Stepper.Step state="completed">Two</Stepper.Step>
        <Stepper.Step state="active">Three</Stepper.Step>
      </Stepper>
    );
    const steps = screen.getAllByRole("listitem");
    expect(steps[0]).toHaveAttribute("data-state", "active");
    expect(steps[1]).toHaveAttribute("data-state", "completed");
    expect(steps[2]).toHaveAttribute("data-state", "active");
  });

  it("does not advance dividers when only `state` overrides change (dividers track activeIndex)", () => {
    // Documented contract: per-step `state` overrides only affect the step's
    // own indicator/label. Connector ("divider") colors continue to track the
    // parent <Stepper>'s activeIndex.
    render(
      <Stepper activeIndex={0}>
        <Stepper.Step>One</Stepper.Step>
        <Stepper.Step state="completed">Two</Stepper.Step>
        <Stepper.Step>Three</Stepper.Step>
      </Stepper>
    );
    const steps = screen.getAllByRole("listitem");

    // Step 1 is visually completed, but activeIndex is still 0, so the
    // connector between step 0 and step 1 (step 1's left half) should remain
    // pending/border, NOT primary.
    const s1Left = steps[1].querySelector<HTMLElement>(
      "[data-slot='stepper-divider'][data-position='left']"
    )!;
    expect(s1Left).toHaveAttribute("data-state", "pending");
    expect(s1Left).toHaveClass("bg-border");
  });

  it("merges custom className on the root", () => {
    render(
      <Stepper activeIndex={0} className="custom-root" data-testid="root">
        <Stepper.Step>Only</Stepper.Step>
      </Stepper>
    );
    expect(screen.getByTestId("root")).toHaveClass("custom-root");
  });

  it("merges custom className on Stepper.Step", () => {
    render(
      <Stepper activeIndex={0}>
        <Stepper.Step className="custom-step">Only</Stepper.Step>
      </Stepper>
    );
    expect(screen.getByRole("listitem")).toHaveClass("custom-step");
  });

  it("forwards native HTML attributes on root", () => {
    render(
      <Stepper
        activeIndex={0}
        data-testid="root"
        aria-label="Checkout progress"
      >
        <Stepper.Step>Only</Stepper.Step>
      </Stepper>
    );
    expect(screen.getByTestId("root")).toHaveAttribute(
      "aria-label",
      "Checkout progress"
    );
  });

  it("defaults aria-label to 'Progress' when neither aria-label nor aria-labelledby is provided", () => {
    render(
      <Stepper activeIndex={0} data-testid="root">
        <Stepper.Step>Only</Stepper.Step>
      </Stepper>
    );
    expect(screen.getByTestId("root")).toHaveAttribute(
      "aria-label",
      "Progress"
    );
  });

  it("does not apply default aria-label when aria-labelledby is provided", () => {
    render(
      <>
        <h2 id="checkout-heading">Checkout</h2>
        <Stepper
          activeIndex={0}
          data-testid="root"
          aria-labelledby="checkout-heading"
        >
          <Stepper.Step>Only</Stepper.Step>
        </Stepper>
      </>
    );
    const root = screen.getByTestId("root");
    expect(root).not.toHaveAttribute("aria-label");
    expect(root).toHaveAttribute("aria-labelledby", "checkout-heading");
  });

  it("forwards native HTML attributes on Stepper.Step", () => {
    render(
      <Stepper activeIndex={0}>
        <Stepper.Step data-testid="step" data-custom="yes">
          Only
        </Stepper.Step>
      </Stepper>
    );
    expect(screen.getByTestId("step")).toHaveAttribute("data-custom", "yes");
  });

  it("sets expected data-slot values", () => {
    const { container } = renderSteps(1, ["One", "Two"]);
    expect(container.querySelector("[data-slot='stepper']")).toBeTruthy();
    expect(container.querySelector("[data-slot='stepper-step']")).toBeTruthy();
    expect(
      container.querySelector("[data-slot='stepper-indicator']")
    ).toBeTruthy();
    expect(container.querySelector("[data-slot='stepper-label']")).toBeTruthy();
    expect(
      container.querySelector("[data-slot='stepper-divider']")
    ).toBeTruthy();
  });

  it("throws a descriptive error when Stepper.Step is used without a Stepper parent", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    expect(() => render(<Stepper.Step>Orphan</Stepper.Step>)).toThrow(
      /Stepper\.Step/
    );
    spy.mockRestore();
  });

  describe("accessibility", () => {
    it("has no violations for a 3-step configuration", async () => {
      const { container } = renderSteps(1, ["One", "Two", "Three"]);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations for a 5-step configuration", async () => {
      const { container } = renderSteps(2, [
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
      ]);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
