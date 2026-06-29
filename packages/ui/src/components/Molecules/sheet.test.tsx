import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, it, expect, vi } from "vitest";

import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
  type SheetSide,
} from "./sheet";

interface BasicSheetProps {
  side?: SheetSide;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideCloseButton?: boolean;
  contentClassName?: string;
  footerAlign?: "start" | "center" | "end" | "between" | "stretch";
}

function BasicSheet({
  side,
  defaultOpen,
  open,
  onOpenChange,
  hideCloseButton,
  contentClassName,
  footerAlign,
}: BasicSheetProps) {
  return (
    <Sheet defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange}>
      <SheetTrigger>Open sheet</SheetTrigger>
      <SheetContent
        side={side}
        hideCloseButton={hideCloseButton}
        className={contentClassName}
      >
        <SheetHeader>
          <SheetTitle>Panel Title</SheetTitle>
        </SheetHeader>
        <SheetBody>
          <SheetDescription>General content</SheetDescription>
        </SheetBody>
        <SheetFooter align={footerAlign}>
          <SheetClose>Cancel</SheetClose>
          <button type="button">Send</button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

describe("Sheet", () => {
  it("does not render content when closed", () => {
    render(<BasicSheet />);
    expect(
      document.querySelector('[data-slot="sheet-content"]')
    ).not.toBeInTheDocument();
  });

  it("opens via trigger and closes via SheetClose", async () => {
    const user = userEvent.setup();
    render(<BasicSheet />);

    await user.click(screen.getByText("Open sheet"));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    await user.click(screen.getByText("Cancel"));
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("opens when defaultOpen is true", async () => {
    render(<BasicSheet defaultOpen />);
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  it("closes when Escape is pressed", async () => {
    const user = userEvent.setup();
    render(<BasicSheet defaultOpen />);

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("closes when the overlay is clicked", async () => {
    const user = userEvent.setup();
    render(<BasicSheet defaultOpen />);

    const overlay = document.querySelector('[data-slot="sheet-overlay"]');
    expect(overlay).toBeInTheDocument();
    await user.click(overlay!);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("renders the built-in close (X) button by default", async () => {
    render(<BasicSheet defaultOpen />);
    await screen.findByRole("dialog");
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("hides the built-in close (X) button when hideCloseButton is true", async () => {
    render(<BasicSheet defaultOpen hideCloseButton />);
    await screen.findByRole("dialog");
    expect(
      screen.queryByRole("button", { name: "Close" })
    ).not.toBeInTheDocument();
  });

  it("the built-in close (X) button dismisses the sheet", async () => {
    const user = userEvent.setup();
    render(<BasicSheet defaultOpen />);
    await screen.findByRole("dialog");

    await user.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it.each(["right", "left", "top", "bottom"] as const)(
    "applies the %s side variant",
    async (side) => {
      render(<BasicSheet defaultOpen side={side} />);
      const content = await screen.findByRole("dialog");
      expect(content).toHaveAttribute("data-side", side);
    }
  );

  it("defaults the side to right when not specified", async () => {
    render(<BasicSheet defaultOpen />);
    const content = await screen.findByRole("dialog");
    expect(content).toHaveAttribute("data-side", "right");
  });

  it.each([
    ["start", "justify-start"],
    ["center", "justify-center"],
    ["end", "justify-end"],
    ["between", "justify-between"],
    ["stretch", "[&>*]:flex-1"],
  ] as const)("applies footer align=%s", async (align, expectedClass) => {
    render(<BasicSheet defaultOpen footerAlign={align} />);
    await screen.findByRole("dialog");
    const footer = document.querySelector('[data-slot="sheet-footer"]');
    expect(footer).toHaveAttribute("data-align", align);
    expect(footer).toHaveClass(expectedClass);
  });

  it("supports controlled mode with open + onOpenChange", async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();

    const { rerender } = render(
      <BasicSheet open={false} onOpenChange={onOpenChange} />
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByText("Open sheet"));
    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    rerender(<BasicSheet open onOpenChange={onOpenChange} />);
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  it("merges custom className on SheetOverlay", async () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetOverlay className="overlay-x" />
        <SheetContent>
          <SheetTitle>T</SheetTitle>
          <SheetDescription>D</SheetDescription>
        </SheetContent>
      </Sheet>
    );
    await screen.findByRole("dialog");
    const overlays = document.querySelectorAll('[data-slot="sheet-overlay"]');
    const overlay = Array.from(overlays).find((el) =>
      el.classList.contains("overlay-x")
    );
    expect(overlay).toBeDefined();
    expect(overlay).toHaveClass("fixed", "inset-0");
  });

  it("sets data-slot on all rendered parts", async () => {
    render(<BasicSheet defaultOpen />);
    await screen.findByRole("dialog");

    expect(
      document.querySelector('[data-slot="sheet-trigger"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="sheet-overlay"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="sheet-content"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="sheet-header"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="sheet-body"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="sheet-footer"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="sheet-title"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="sheet-description"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="sheet-close"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="sheet-close-x"]')
    ).toBeInTheDocument();
  });

  it("merges custom className on every part", async () => {
    render(
      <Sheet defaultOpen>
        <SheetTrigger className="trigger-x">Open</SheetTrigger>
        <SheetContent side="left" className="content-x">
          <SheetHeader className="header-x">
            <SheetTitle className="title-x">Title</SheetTitle>
          </SheetHeader>
          <SheetBody className="body-x">
            <SheetDescription className="desc-x">Desc</SheetDescription>
          </SheetBody>
          <SheetFooter className="footer-x">
            <SheetClose className="close-x">Cancel</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
    await screen.findByRole("dialog");

    expect(document.querySelector('[data-slot="sheet-trigger"]')).toHaveClass(
      "trigger-x"
    );
    expect(document.querySelector('[data-slot="sheet-content"]')).toHaveClass(
      "content-x"
    );
    expect(document.querySelector('[data-slot="sheet-header"]')).toHaveClass(
      "header-x"
    );
    expect(document.querySelector('[data-slot="sheet-title"]')).toHaveClass(
      "title-x"
    );
    expect(document.querySelector('[data-slot="sheet-body"]')).toHaveClass(
      "body-x"
    );
    expect(
      document.querySelector('[data-slot="sheet-description"]')
    ).toHaveClass("desc-x");
    expect(document.querySelector('[data-slot="sheet-footer"]')).toHaveClass(
      "footer-x"
    );
    expect(document.querySelector('[data-slot="sheet-close"]')).toHaveClass(
      "close-x"
    );
  });

  it("wires aria-labelledby to SheetTitle and aria-describedby to SheetDescription", async () => {
    render(<BasicSheet defaultOpen />);
    const dialog = await screen.findByRole("dialog");

    const labelledBy = dialog.getAttribute("aria-labelledby");
    const describedBy = dialog.getAttribute("aria-describedby");

    expect(labelledBy).toBeTruthy();
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(labelledBy!)).toHaveTextContent(
      "Panel Title"
    );
    expect(document.getElementById(describedBy!)).toHaveTextContent(
      "General content"
    );
  });

  it("has no axe violations when closed", async () => {
    const { container } = render(<BasicSheet />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no axe violations when open", async () => {
    render(<BasicSheet defaultOpen />);
    const dialog = await screen.findByRole("dialog");
    const results = await axe(dialog);
    expect(results).toHaveNoViolations();
  });
});
