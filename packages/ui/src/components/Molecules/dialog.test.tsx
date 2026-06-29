import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, it, expect, vi } from "vitest";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./dialog";

function BasicDialog({
  hideCloseButton,
  align,
  defaultOpen,
}: {
  hideCloseButton?: boolean;
  align?: "start" | "end" | "between";
  defaultOpen?: boolean;
}) {
  return (
    <Dialog defaultOpen={defaultOpen}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent hideCloseButton={hideCloseButton}>
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogDescription>
            Are you sure you want to continue?
          </DialogDescription>
        </DialogHeader>
        <DialogBody>Body content</DialogBody>
        <DialogFooter align={align}>
          <DialogClose>Cancel</DialogClose>
          <button type="button">Save changes</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

describe("Dialog", () => {
  it("opens via trigger and closes via DialogClose", async () => {
    const user = userEvent.setup();
    render(<BasicDialog />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Cancel" }));
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("closes when Escape is pressed", async () => {
    const user = userEvent.setup();
    render(<BasicDialog defaultOpen />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("closes when the overlay is clicked", async () => {
    const user = userEvent.setup();
    render(<BasicDialog defaultOpen />);

    const overlay = document.querySelector('[data-slot="dialog-overlay"]');
    expect(overlay).not.toBeNull();

    await user.click(overlay!);
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("returns focus to trigger when closed", async () => {
    const user = userEvent.setup();
    render(<BasicDialog />);

    const trigger = screen.getByRole("button", { name: "Open" });
    await user.click(trigger);

    await screen.findByRole("dialog");

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });

  it("wires aria-labelledby to DialogTitle and aria-describedby to DialogDescription", async () => {
    render(<BasicDialog defaultOpen />);

    const dialog = screen.getByRole("dialog");
    const labelledBy = dialog.getAttribute("aria-labelledby");
    const describedBy = dialog.getAttribute("aria-describedby");

    expect(labelledBy).toBeTruthy();
    expect(describedBy).toBeTruthy();

    expect(document.getElementById(labelledBy!)).toHaveTextContent(
      "Confirm Action"
    );
    expect(document.getElementById(describedBy!)).toHaveTextContent(
      /are you sure/i
    );
  });

  it("renders the built-in close (X) button by default", () => {
    render(<BasicDialog defaultOpen />);
    const closes = screen.getAllByRole("button", { name: /close/i });
    expect(closes.length).toBeGreaterThan(0);
  });

  it("hides the built-in close (X) button when hideCloseButton is true", () => {
    render(<BasicDialog defaultOpen hideCloseButton />);
    const closes = screen.queryAllByRole("button", { name: /^close$/i });
    expect(closes.length).toBe(0);
  });

  it.each([
    ["start", "justify-start", "pl-3"],
    ["end", "justify-end", "pr-3"],
    ["between", "justify-between", "px-3"],
  ] as const)(
    "applies correct classes for DialogFooter align=%s",
    (align, justifyClass, paddingClass) => {
      render(<BasicDialog defaultOpen align={align} />);
      const footer = document.querySelector('[data-slot="dialog-footer"]');
      expect(footer).not.toBeNull();
      expect(footer).toHaveAttribute("data-align", align);
      expect(footer!.className).toContain(justifyClass);
      expect(footer!.className).toContain(paddingClass);
    }
  );

  it("supports controlled mode with open + onOpenChange", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    function Controlled() {
      const [open, setOpen] = React.useState(false);
      return (
        <Dialog
          open={open}
          onOpenChange={(next) => {
            onOpenChange(next);
            setOpen(next);
          }}
        >
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled</DialogTitle>
              <DialogDescription>Controlled dialog</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    }

    render(<Controlled />);
    await user.click(screen.getByRole("button", { name: "Open" }));

    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  it("sets data-slot on all rendered parts", () => {
    render(<BasicDialog defaultOpen />);

    const slots = [
      "dialog-trigger",
      "dialog-overlay",
      "dialog-content",
      "dialog-header",
      "dialog-body",
      "dialog-footer",
      "dialog-title",
      "dialog-description",
      "dialog-close",
    ];

    for (const slot of slots) {
      expect(document.querySelector(`[data-slot="${slot}"]`)).not.toBeNull();
    }
  });

  it("merges custom className on every part", () => {
    render(
      <Dialog defaultOpen>
        <DialogTrigger className="custom-trigger">Open</DialogTrigger>
        <DialogContent className="custom-content">
          <DialogHeader className="custom-header">
            <DialogTitle className="custom-title">Title</DialogTitle>
            <DialogDescription className="custom-description">
              Desc
            </DialogDescription>
          </DialogHeader>
          <DialogBody className="custom-body">Body</DialogBody>
          <DialogFooter className="custom-footer">
            <DialogClose className="custom-close">Cancel</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    expect(
      document.querySelector('[data-slot="dialog-trigger"]')?.className
    ).toContain("custom-trigger");
    expect(
      document.querySelector('[data-slot="dialog-content"]')?.className
    ).toContain("custom-content");
    expect(
      document.querySelector('[data-slot="dialog-header"]')?.className
    ).toContain("custom-header");
    expect(
      document.querySelector('[data-slot="dialog-title"]')?.className
    ).toContain("custom-title");
    expect(
      document.querySelector('[data-slot="dialog-description"]')?.className
    ).toContain("custom-description");
    expect(
      document.querySelector('[data-slot="dialog-body"]')?.className
    ).toContain("custom-body");
    expect(
      document.querySelector('[data-slot="dialog-footer"]')?.className
    ).toContain("custom-footer");
    const closes = document.querySelectorAll('[data-slot="dialog-close"]');
    const hasCustomClose = Array.from(closes).some((el) =>
      el.className.includes("custom-close")
    );
    expect(hasCustomClose).toBe(true);
  });

  it("has no axe violations when open", async () => {
    const { container } = render(<BasicDialog defaultOpen />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
