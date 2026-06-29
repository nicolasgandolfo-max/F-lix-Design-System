import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, it, expect, vi } from "vitest";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";

// ─── Helpers ──────────────────────────────────────────────────────────────────

type DrawerDirection = "top" | "bottom" | "left" | "right";

function renderDrawer(
  props: {
    direction?: DrawerDirection;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  } = {}
) {
  return render(
    <Drawer
      direction={props.direction}
      defaultOpen={props.defaultOpen}
      onOpenChange={props.onOpenChange}
    >
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Move goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <div data-testid="drawer-body" className="p-4">
          Body content
        </div>
        <DrawerFooter>
          <button type="button">Submit</button>
          <DrawerClose>Cancel</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("Drawer", () => {
  describe("rendering", () => {
    it("does not render content when closed", () => {
      renderDrawer();
      expect(screen.queryByText("Move goal")).not.toBeInTheDocument();
    });

    it("renders title, description, body and footer when open", () => {
      renderDrawer({ defaultOpen: true });
      expect(screen.getByText("Move goal")).toBeInTheDocument();
      expect(
        screen.getByText("Set your daily activity goal.")
      ).toBeInTheDocument();
      expect(screen.getByTestId("drawer-body")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Submit" })
      ).toBeInTheDocument();
      expect(screen.getByText("Cancel")).toBeInTheDocument();
    });

    it("sets data-slot on the trigger, content, header, footer, title and description", () => {
      renderDrawer({ defaultOpen: true });
      expect(screen.getByText("Open")).toHaveAttribute(
        "data-slot",
        "drawer-trigger"
      );
      expect(
        document.querySelector("[data-slot='drawer-content']")
      ).toBeInTheDocument();
      expect(
        document.querySelector("[data-slot='drawer-header']")
      ).toBeInTheDocument();
      expect(
        document.querySelector("[data-slot='drawer-footer']")
      ).toBeInTheDocument();
      expect(
        document.querySelector("[data-slot='drawer-title']")
      ).toBeInTheDocument();
      expect(
        document.querySelector("[data-slot='drawer-description']")
      ).toBeInTheDocument();
    });

    it("renders an overlay with the drawer-overlay slot when open", () => {
      renderDrawer({ defaultOpen: true });
      expect(
        document.querySelector("[data-slot='drawer-overlay']")
      ).toBeInTheDocument();
    });
  });

  describe("directions", () => {
    it.each<DrawerDirection>(["top", "bottom", "left", "right"])(
      "passes direction=%s through to the content via data-vaul-drawer-direction",
      (direction) => {
        renderDrawer({ defaultOpen: true, direction });
        const content = document.querySelector(
          "[data-slot='drawer-content']"
        ) as HTMLElement;
        expect(content).not.toBeNull();
        expect(content.getAttribute("data-vaul-drawer-direction")).toBe(
          direction
        );
      }
    );

    it("renders the drag handle with the drawer-handle slot", () => {
      renderDrawer({ defaultOpen: true, direction: "bottom" });
      const handle = document.querySelector("[data-slot='drawer-handle']");
      expect(handle).toBeInTheDocument();
      // The handle is always rendered but visually gated by Tailwind data-state
      // selectors; assert it inherits the `hidden` base class.
      expect(handle?.className).toMatch(/\bhidden\b/);
      expect(handle?.getAttribute("aria-hidden")).toBe("true");
    });

    it("makes the drag handle visible for the top direction (rendered last via order utility)", () => {
      renderDrawer({ defaultOpen: true, direction: "top" });
      const handle = document.querySelector("[data-slot='drawer-handle']");
      expect(handle).toBeInTheDocument();
      // CSS gating uses the parent's data-vaul-drawer-direction attribute, which
      // jsdom does not resolve. We assert the *intent* via the Tailwind classes
      // that move the handle to the bottom edge and reveal it for `top`.
      expect(handle?.className).toMatch(
        /group-data-\[vaul-drawer-direction=top\]\/drawer-content:block/
      );
      expect(handle?.className).toMatch(
        /group-data-\[vaul-drawer-direction=top\]\/drawer-content:order-last/
      );
    });
  });

  describe("interactions", () => {
    it("opens when the trigger is clicked", async () => {
      const user = userEvent.setup();
      renderDrawer();

      expect(screen.queryByText("Move goal")).not.toBeInTheDocument();

      await user.click(screen.getByText("Open"));

      await waitFor(() => {
        expect(screen.getByText("Move goal")).toBeInTheDocument();
      });
    });

    it("closes when the DrawerClose button is clicked", async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();
      renderDrawer({ defaultOpen: true, onOpenChange });

      await user.click(screen.getByText("Cancel"));

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(false);
      });
    });

    it("closes when Escape is pressed", async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();
      renderDrawer({ defaultOpen: true, onOpenChange });

      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(onOpenChange).toHaveBeenCalledWith(false);
      });
    });
  });

  describe("className merging", () => {
    it("forwards custom className onto content, header and footer", () => {
      render(
        <Drawer defaultOpen>
          <DrawerContent className="custom-content">
            <DrawerHeader className="custom-header">
              <DrawerTitle className="custom-title">Title</DrawerTitle>
              <DrawerDescription className="custom-description">
                Description
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="custom-footer">
              <DrawerClose>Close</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      );

      expect(
        document.querySelector("[data-slot='drawer-content']")
      ).toHaveClass("custom-content");
      expect(document.querySelector("[data-slot='drawer-header']")).toHaveClass(
        "custom-header"
      );
      expect(document.querySelector("[data-slot='drawer-footer']")).toHaveClass(
        "custom-footer"
      );
      expect(document.querySelector("[data-slot='drawer-title']")).toHaveClass(
        "custom-title"
      );
      expect(
        document.querySelector("[data-slot='drawer-description']")
      ).toHaveClass("custom-description");
    });
  });

  describe("styling tokens", () => {
    it("uses semantic background tokens on the content, not raw colors", () => {
      renderDrawer({ defaultOpen: true });
      const content = document.querySelector(
        "[data-slot='drawer-content']"
      ) as HTMLElement;
      expect(content.className).toMatch(/\bbg-background\b/);
      expect(content.className).toMatch(/\btext-foreground\b/);
    });

    it("uses a mode-invariant scrim on the overlay", () => {
      renderDrawer({ defaultOpen: true });
      const overlay = document.querySelector(
        "[data-slot='drawer-overlay']"
      ) as HTMLElement;
      expect(overlay.className).toMatch(/bg-slate-900\/50/);
    });

    it("separates header and footer from the body with token-based borders", () => {
      renderDrawer({ defaultOpen: true });
      const header = document.querySelector(
        "[data-slot='drawer-header']"
      ) as HTMLElement;
      const footer = document.querySelector(
        "[data-slot='drawer-footer']"
      ) as HTMLElement;
      expect(header.className).toMatch(/\bborder-b\b/);
      expect(header.className).toMatch(/\bborder-border\b/);
      expect(footer.className).toMatch(/\bborder-t\b/);
      expect(footer.className).toMatch(/\bborder-border\b/);
    });
  });

  describe("accessibility", () => {
    it("has no axe violations when open", async () => {
      const { container } = renderDrawer({ defaultOpen: true });
      // Wait a tick for vaul to finalize aria attributes
      await act(async () => {});
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("labels the dialog via DrawerTitle (aria-labelledby)", () => {
      renderDrawer({ defaultOpen: true });
      const content = document.querySelector(
        "[data-slot='drawer-content']"
      ) as HTMLElement;
      const title = document.querySelector(
        "[data-slot='drawer-title']"
      ) as HTMLElement;
      expect(content.getAttribute("aria-labelledby")).toBe(title.id);
    });
  });
});
