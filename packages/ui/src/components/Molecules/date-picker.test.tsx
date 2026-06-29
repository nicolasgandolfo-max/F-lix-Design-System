import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { axe } from "jest-axe";

import { DatePicker } from "./date-picker";

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Find the trigger by its data-slot (unambiguous even when calendar is open)
function getTrigger(container: HTMLElement) {
  return container.querySelector<HTMLButtonElement>(
    "[data-slot='date-picker-trigger']"
  )!;
}

// Find a day button in the open calendar by matching text content (= day number)
function getDayButtonInCalendar(dayNumber: number) {
  return screen.getAllByRole("button").find((btn) => {
    const text = btn.textContent ?? "";
    return (
      text === String(dayNumber) &&
      btn.getAttribute("data-slot") !== "date-picker-trigger"
    );
  });
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("DatePicker", () => {
  describe("rendering", () => {
    it("renders the trigger button", () => {
      const { container } = render(<DatePicker />);
      expect(getTrigger(container)).toBeInTheDocument();
    });

    it("shows the placeholder when no date is selected", () => {
      render(<DatePicker placeholder="Pick a date" />);
      expect(screen.getByText("Pick a date")).toBeInTheDocument();
    });

    it("shows a custom placeholder", () => {
      render(<DatePicker placeholder="Select date…" />);
      expect(screen.getByText("Select date…")).toBeInTheDocument();
    });

    it("shows the formatted selected date in the trigger", () => {
      const date = new Date(2026, 3, 15); // April 15, 2026
      render(<DatePicker value={date} />);
      expect(screen.getByText("Apr 15, 2026")).toBeInTheDocument();
    });

    it("has data-slot='date-picker' on the outer wrapper", () => {
      const { container } = render(<DatePicker />);
      expect(
        container.querySelector("[data-slot='date-picker']")
      ).toBeInTheDocument();
    });

    it("has data-slot='date-picker-trigger' on the trigger button", () => {
      const { container } = render(<DatePicker />);
      expect(getTrigger(container)).toBeInTheDocument();
    });

    it("renders the calendar icon inside the trigger", () => {
      const { container } = render(<DatePicker />);
      expect(getTrigger(container).querySelector("svg")).toBeInTheDocument();
    });

    it("sets aria-haspopup='dialog' on the trigger", () => {
      const { container } = render(<DatePicker />);
      expect(getTrigger(container)).toHaveAttribute("aria-haspopup", "dialog");
    });

    it("sets aria-expanded=false on the trigger initially", () => {
      const { container } = render(<DatePicker />);
      expect(getTrigger(container)).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("opening and closing", () => {
    it("opens the calendar when the trigger is clicked", async () => {
      const user = userEvent.setup();
      const { container } = render(<DatePicker />);

      expect(screen.queryByRole("grid")).not.toBeInTheDocument();
      await user.click(getTrigger(container));
      expect(screen.getByRole("grid")).toBeInTheDocument();
    });

    it("sets aria-expanded=true when the calendar is open", async () => {
      const user = userEvent.setup();
      const { container } = render(<DatePicker />);

      await user.click(getTrigger(container));
      expect(getTrigger(container)).toHaveAttribute("aria-expanded", "true");
    });

    it("closes the calendar when Escape is pressed", async () => {
      const user = userEvent.setup();
      const { container } = render(<DatePicker />);

      await user.click(getTrigger(container));
      expect(screen.getByRole("grid")).toBeInTheDocument();

      await user.keyboard("{Escape}");
      expect(screen.queryByRole("grid")).not.toBeInTheDocument();
    });
  });

  describe("date selection", () => {
    it("calls onChange with the selected date and closes the calendar", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      const { container } = render(
        <DatePicker value={new Date(2026, 3, 1)} onChange={onChange} />
      );

      await user.click(getTrigger(container));

      // Find and click April 15 in the opened calendar
      const day15 = getDayButtonInCalendar(15);
      expect(day15).toBeInTheDocument();
      await user.click(day15!);

      expect(onChange).toHaveBeenCalledTimes(1);
      const arg: Date = onChange.mock.calls[0][0];
      expect(arg.getDate()).toBe(15);
      expect(arg.getMonth()).toBe(3);
      expect(arg.getFullYear()).toBe(2026);

      // Calendar should close after selection
      expect(screen.queryByRole("grid")).not.toBeInTheDocument();
    });

    it("formats and displays the selected date after selection", async () => {
      const user = userEvent.setup();

      function Controlled() {
        const [date, setDate] = React.useState<Date | undefined>(
          new Date(2026, 3, 1)
        );
        return <DatePicker value={date} onChange={setDate} />;
      }

      const { container } = render(<Controlled />);
      await user.click(getTrigger(container));

      const day15 = getDayButtonInCalendar(15);
      await user.click(day15!);

      expect(screen.getByText("Apr 15, 2026")).toBeInTheDocument();
    });
  });

  describe("disabled state", () => {
    it("renders the trigger as disabled", () => {
      const { container } = render(<DatePicker disabled />);
      expect(getTrigger(container)).toBeDisabled();
    });

    it("does not open the calendar when disabled", async () => {
      const user = userEvent.setup();
      const { container } = render(<DatePicker disabled />);

      await user.click(getTrigger(container));
      expect(screen.queryByRole("grid")).not.toBeInTheDocument();
    });
  });

  describe("error state", () => {
    it("shows the error message below the trigger", () => {
      render(<DatePicker error="Date is required" />);
      expect(screen.getByText("Date is required")).toBeInTheDocument();
    });

    it("links the trigger to the error message via aria-describedby when error is set", () => {
      const { container } = render(<DatePicker error="Required" />);
      const trigger = getTrigger(container);
      const errorId = trigger.getAttribute("aria-describedby");
      expect(errorId).toBeTruthy();
      expect(container.querySelector(`#${errorId}`)).toHaveTextContent(
        "Required"
      );
    });

    it("applies destructive border class when error is set", () => {
      const { container } = render(<DatePicker error="Required" />);
      expect(getTrigger(container)).toHaveClass("border-destructive");
    });

    it("renders the formatted date in destructive colour when a date is selected and an error is set", () => {
      const { container } = render(
        <DatePicker value={new Date(2026, 3, 15)} error="Required" />
      );
      const span = getTrigger(container).querySelector("span");
      expect(span).toHaveClass("text-destructive");
    });
  });

  describe("size variants", () => {
    it("applies h-10 for md size (default)", () => {
      const { container } = render(<DatePicker size="md" />);
      expect(getTrigger(container)).toHaveClass("h-10");
    });

    it("applies h-8 for sm size", () => {
      const { container } = render(<DatePicker size="sm" />);
      expect(getTrigger(container)).toHaveClass("h-8");
    });
  });

  describe("prop forwarding", () => {
    it("forwards the id to the trigger button", () => {
      const { container } = render(<DatePicker id="my-date" />);
      expect(getTrigger(container)).toHaveAttribute("id", "my-date");
    });

    it("merges custom className onto the trigger", () => {
      const { container } = render(<DatePicker className="extra-class" />);
      expect(getTrigger(container)).toHaveClass("extra-class");
    });

    it("merges wrapperClassName onto the outer wrapper", () => {
      const { container } = render(
        <DatePicker wrapperClassName="wrapper-class" />
      );
      expect(container.querySelector("[data-slot='date-picker']")).toHaveClass(
        "wrapper-class"
      );
    });
  });

  describe("accessibility", () => {
    it("has no axe violations in default state", async () => {
      const { container } = render(<DatePicker />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has no axe violations in error state", async () => {
      const { container } = render(<DatePicker error="Date is required" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has no axe violations when the calendar is open", async () => {
      const user = userEvent.setup();
      const { container } = render(<DatePicker value={new Date(2026, 3, 1)} />);
      await user.click(getTrigger(container));
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
