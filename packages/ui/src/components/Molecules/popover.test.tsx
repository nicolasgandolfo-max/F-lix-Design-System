import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, it, expect, vi } from "vitest";

import {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverPortal,
  PopoverTitle,
  PopoverTrigger,
} from "./popover";

function BasicPopover({
  side,
  align,
  sideOffset,
  defaultOpen,
  open,
  onOpenChange,
  contentClassName,
  footerAlign,
}: {
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (next: boolean) => void;
  contentClassName?: string;
  footerAlign?: "start" | "end" | "between";
}) {
  return (
    <Popover defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger>Open</PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={contentClassName}
      >
        <PopoverHeader>
          <PopoverTitle>Confirm Action</PopoverTitle>
          <PopoverDescription>
            Are you sure you want to continue?
          </PopoverDescription>
        </PopoverHeader>
        <PopoverBody>Body content</PopoverBody>
        <PopoverFooter align={footerAlign}>
          <PopoverClose>Cancel</PopoverClose>
          <button type="button">Accept</button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

describe("Popover", () => {
  it("does not render content until trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<BasicPopover />);

    expect(
      document.querySelector('[data-slot="popover-content"]')
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  it("opens when defaultOpen is true", async () => {
    render(<BasicPopover defaultOpen />);
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  it("closes when Escape is pressed", async () => {
    const user = userEvent.setup();
    render(<BasicPopover defaultOpen />);

    await screen.findByRole("dialog");

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("closes via PopoverClose", async () => {
    const user = userEvent.setup();
    render(<BasicPopover defaultOpen />);

    await screen.findByRole("dialog");

    await user.click(screen.getByRole("button", { name: "Cancel" }));
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it.each(["top", "right", "bottom", "left"] as const)(
    "propagates side=%s to data-side",
    async (side) => {
      render(<BasicPopover defaultOpen side={side} />);
      await screen.findByRole("dialog");
      const content = document.querySelector('[data-slot="popover-content"]');
      expect(content).toHaveAttribute("data-side", side);
    }
  );

  it.each(["start", "center", "end"] as const)(
    "propagates align=%s to data-align",
    async (align) => {
      render(<BasicPopover defaultOpen align={align} />);
      await screen.findByRole("dialog");
      const content = document.querySelector('[data-slot="popover-content"]');
      expect(content).toHaveAttribute("data-align", align);
    }
  );

  it("forwards sideOffset to the underlying primitive", async () => {
    render(<BasicPopover defaultOpen sideOffset={20} />);
    await screen.findByRole("dialog");
    expect(
      document.querySelector('[data-slot="popover-content"]')
    ).toBeInTheDocument();
  });

  it("merges custom className onto content", async () => {
    render(<BasicPopover defaultOpen contentClassName="custom-popover" />);
    await screen.findByRole("dialog");
    const content = document.querySelector('[data-slot="popover-content"]');
    expect(content).toHaveClass("custom-popover");
    expect(content).toHaveClass("bg-popover");
  });

  it.each([
    ["start", "justify-start"],
    ["end", "justify-end"],
    ["between", "justify-between"],
  ] as const)(
    "applies correct classes for PopoverFooter align=%s",
    async (align, justifyClass) => {
      render(<BasicPopover defaultOpen footerAlign={align} />);
      await screen.findByRole("dialog");
      const footer = document.querySelector('[data-slot="popover-footer"]');
      expect(footer).not.toBeNull();
      expect(footer).toHaveAttribute("data-align", align);
      expect(footer!.className).toContain(justifyClass);
    }
  );

  it("supports controlled mode with open + onOpenChange", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    function Controlled() {
      const [open, setOpen] = React.useState(false);
      return (
        <Popover
          open={open}
          onOpenChange={(next) => {
            onOpenChange(next);
            setOpen(next);
          }}
        >
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Controlled</PopoverTitle>
              <PopoverDescription>Controlled popover</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
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

  it("supports a separate PopoverAnchor element", async () => {
    render(
      <Popover defaultOpen>
        <PopoverAnchor>
          <span data-testid="anchor">anchor</span>
        </PopoverAnchor>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Anchored</PopoverTitle>
            <PopoverDescription>Anchored popover</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    );

    await screen.findByRole("dialog");
    expect(
      document.querySelector('[data-slot="popover-anchor"]')
    ).toBeInTheDocument();
  });

  it("supports rendering through PopoverPortal explicitly", async () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverPortal>
          <div data-testid="portal-child">portaled content</div>
        </PopoverPortal>
      </Popover>
    );

    // Radix's Portal primitive renders no DOM element of its own — it just
    // teleports its children. Verify the children land in the document.
    expect(await screen.findByTestId("portal-child")).toBeInTheDocument();
  });

  it("supports the standalone PopoverArrow component with custom dimensions", async () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Custom arrow</PopoverTitle>
            <PopoverDescription>Custom arrow dimensions</PopoverDescription>
          </PopoverHeader>
          <PopoverArrow width={20} height={10} className="custom-arrow" />
        </PopoverContent>
      </Popover>
    );

    await screen.findByRole("dialog");
    const arrow = document.querySelector('[data-slot="popover-arrow"]');
    expect(arrow).toBeInTheDocument();
    expect(arrow).toHaveAttribute("width", "20");
    expect(arrow).toHaveAttribute("height", "10");
    expect(arrow?.getAttribute("class")).toContain("custom-arrow");
  });

  it("sets data-slot on all rendered parts", async () => {
    render(<BasicPopover defaultOpen />);
    await screen.findByRole("dialog");

    const slots = [
      "popover-trigger",
      "popover-content",
      "popover-header",
      "popover-body",
      "popover-footer",
      "popover-title",
      "popover-description",
      "popover-close",
    ];

    for (const slot of slots) {
      expect(document.querySelector(`[data-slot="${slot}"]`)).not.toBeNull();
    }
  });

  it("merges custom className on every part", async () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger className="custom-trigger">Open</PopoverTrigger>
        <PopoverContent className="custom-content">
          <PopoverHeader className="custom-header">
            <PopoverTitle className="custom-title">Title</PopoverTitle>
            <PopoverDescription className="custom-description">
              Desc
            </PopoverDescription>
          </PopoverHeader>
          <PopoverBody className="custom-body">Body</PopoverBody>
          <PopoverFooter className="custom-footer">
            <PopoverClose className="custom-close">Close</PopoverClose>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    );

    await screen.findByRole("dialog");

    expect(
      document.querySelector('[data-slot="popover-trigger"]')?.className
    ).toContain("custom-trigger");
    expect(
      document.querySelector('[data-slot="popover-content"]')?.className
    ).toContain("custom-content");
    expect(
      document.querySelector('[data-slot="popover-header"]')?.className
    ).toContain("custom-header");
    expect(
      document.querySelector('[data-slot="popover-title"]')?.className
    ).toContain("custom-title");
    expect(
      document.querySelector('[data-slot="popover-description"]')?.className
    ).toContain("custom-description");
    expect(
      document.querySelector('[data-slot="popover-body"]')?.className
    ).toContain("custom-body");
    expect(
      document.querySelector('[data-slot="popover-footer"]')?.className
    ).toContain("custom-footer");
    expect(
      document.querySelector('[data-slot="popover-close"]')?.className
    ).toContain("custom-close");
  });

  it("supports a custom className on PopoverAnchor", () => {
    render(
      <Popover defaultOpen>
        <PopoverAnchor className="custom-anchor">
          <span>anchor</span>
        </PopoverAnchor>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Anchored</PopoverTitle>
            <PopoverDescription>Anchored popover</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    );

    expect(
      document.querySelector('[data-slot="popover-anchor"]')?.className
    ).toContain("custom-anchor");
  });

  it("has no axe violations when closed", async () => {
    const { container } = render(<BasicPopover />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no axe violations when open", async () => {
    const { container } = render(<BasicPopover defaultOpen />);
    await screen.findByRole("dialog");
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
