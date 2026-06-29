import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, it, expect, vi } from "vitest";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function renderBasic({
  defaultValue = "overview",
  disabledTab,
}: { defaultValue?: string; disabledTab?: string } = {}) {
  return render(
    <Tabs defaultValue={defaultValue}>
      <TabsList>
        <TabsTrigger value="overview" disabled={disabledTab === "overview"}>
          Overview
        </TabsTrigger>
        <TabsTrigger value="activity" disabled={disabledTab === "activity"}>
          Activity
        </TabsTrigger>
        <TabsTrigger value="settings" disabled={disabledTab === "settings"}>
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview panel</TabsContent>
      <TabsContent value="activity">Activity panel</TabsContent>
      <TabsContent value="settings">Settings panel</TabsContent>
    </Tabs>
  );
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("Tabs", () => {
  describe("rendering", () => {
    it("renders all triggers as tabs", () => {
      renderBasic();
      expect(screen.getByRole("tab", { name: "Overview" })).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "Activity" })).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "Settings" })).toBeInTheDocument();
    });

    it("shows the panel matching the default value", () => {
      renderBasic();
      expect(
        screen.getByRole("tabpanel", { name: "Overview" })
      ).toHaveTextContent("Overview panel");
      expect(screen.queryByText("Activity panel")).not.toBeInTheDocument();
      expect(screen.queryByText("Settings panel")).not.toBeInTheDocument();
    });

    it("marks the active trigger with data-state='active'", () => {
      renderBasic();
      expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute(
        "data-state",
        "active"
      );
      expect(screen.getByRole("tab", { name: "Activity" })).toHaveAttribute(
        "data-state",
        "inactive"
      );
    });

    it("exposes data-slot attributes on every part", () => {
      const { container } = renderBasic();
      expect(container.querySelector("[data-slot='tabs']")).toBeInTheDocument();
      expect(
        container.querySelector("[data-slot='tabs-list']")
      ).toBeInTheDocument();
      expect(
        container.querySelectorAll("[data-slot='tabs-trigger']")
      ).toHaveLength(3);
      expect(
        container.querySelector("[data-slot='tabs-content']")
      ).toBeInTheDocument();
    });

    it("renders icon slots before and after the label", () => {
      render(
        <Tabs defaultValue="a">
          <TabsList>
            <TabsTrigger
              value="a"
              iconLeft={<span data-testid="left" />}
              iconRight={<span data-testid="right" />}
            >
              Tab A
            </TabsTrigger>
          </TabsList>
        </Tabs>
      );
      const trigger = screen.getByRole("tab", { name: /Tab A/i });
      expect(trigger.firstElementChild).toBe(screen.getByTestId("left"));
      expect(trigger.lastElementChild).toBe(screen.getByTestId("right"));
    });
  });

  describe("interaction", () => {
    it("switches to the matching panel on click", async () => {
      const user = userEvent.setup();
      renderBasic();

      await user.click(screen.getByRole("tab", { name: "Activity" }));

      expect(screen.getByRole("tab", { name: "Activity" })).toHaveAttribute(
        "data-state",
        "active"
      );
      expect(
        screen.getByRole("tabpanel", { name: "Activity" })
      ).toHaveTextContent("Activity panel");
      expect(screen.queryByText("Overview panel")).not.toBeInTheDocument();
    });

    it("moves focus with ArrowRight / ArrowLeft", async () => {
      const user = userEvent.setup();
      renderBasic();

      const overview = screen.getByRole("tab", { name: "Overview" });
      const activity = screen.getByRole("tab", { name: "Activity" });
      const settings = screen.getByRole("tab", { name: "Settings" });

      overview.focus();
      expect(overview).toHaveFocus();

      await user.keyboard("{ArrowRight}");
      expect(activity).toHaveFocus();

      await user.keyboard("{ArrowRight}");
      expect(settings).toHaveFocus();

      await user.keyboard("{ArrowLeft}");
      expect(activity).toHaveFocus();
    });

    it("jumps to first / last trigger with Home / End", async () => {
      const user = userEvent.setup();
      renderBasic({ defaultValue: "activity" });

      screen.getByRole("tab", { name: "Activity" }).focus();

      await user.keyboard("{End}");
      expect(screen.getByRole("tab", { name: "Settings" })).toHaveFocus();

      await user.keyboard("{Home}");
      expect(screen.getByRole("tab", { name: "Overview" })).toHaveFocus();
    });
  });

  describe("disabled state", () => {
    it("renders disabled triggers with the disabled attribute", () => {
      renderBasic({ disabledTab: "activity" });
      expect(screen.getByRole("tab", { name: "Activity" })).toBeDisabled();
    });

    it("does not activate a disabled trigger on click", async () => {
      const user = userEvent.setup();
      renderBasic({ disabledTab: "activity" });

      await user.click(screen.getByRole("tab", { name: "Activity" }));

      expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute(
        "data-state",
        "active"
      );
      expect(screen.queryByText("Activity panel")).not.toBeInTheDocument();
    });

    it("skips a disabled trigger during keyboard navigation", async () => {
      const user = userEvent.setup();
      renderBasic({ disabledTab: "activity" });

      const overview = screen.getByRole("tab", { name: "Overview" });
      const settings = screen.getByRole("tab", { name: "Settings" });

      overview.focus();
      await user.keyboard("{ArrowRight}");

      // Activity is disabled — focus should land on Settings instead.
      expect(settings).toHaveFocus();
    });
  });

  describe("controlled mode", () => {
    it("calls onValueChange and reflects external value updates", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      function Controlled() {
        const [value, setValue] = React.useState("overview");
        return (
          <Tabs
            value={value}
            onValueChange={(next) => {
              onValueChange(next);
              setValue(next);
            }}
          >
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">Overview panel</TabsContent>
            <TabsContent value="activity">Activity panel</TabsContent>
          </Tabs>
        );
      }

      render(<Controlled />);

      await user.click(screen.getByRole("tab", { name: "Activity" }));

      expect(onValueChange).toHaveBeenCalledWith("activity");
      expect(
        screen.getByRole("tabpanel", { name: "Activity" })
      ).toHaveTextContent("Activity panel");
    });
  });

  describe("a11y", () => {
    it("has no axe violations in the default state", async () => {
      const { container } = renderBasic();
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no axe violations with a disabled trigger", async () => {
      const { container } = renderBasic({ disabledTab: "settings" });
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
