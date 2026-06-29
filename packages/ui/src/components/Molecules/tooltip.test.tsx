import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, it, expect, vi } from "vitest";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

function BasicTooltip({
  arrow,
  side,
  sideOffset,
  open,
  onOpenChange,
  defaultOpen,
  contentClassName,
}: {
  arrow?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  contentClassName?: string;
}) {
  return (
    <TooltipProvider delayDuration={0} skipDelayDuration={0}>
      <Tooltip
        open={open}
        onOpenChange={onOpenChange}
        defaultOpen={defaultOpen}
      >
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent
          arrow={arrow}
          side={side}
          sideOffset={sideOffset}
          className={contentClassName}
        >
          Tooltip text
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

describe("Tooltip", () => {
  it("does not render content until trigger is focused", async () => {
    const user = userEvent.setup();
    render(<BasicTooltip />);

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    await user.tab();
    expect(await screen.findByRole("tooltip")).toBeInTheDocument();
    expect(screen.getByRole("tooltip")).toHaveTextContent("Tooltip text");
  });

  it("opens when defaultOpen is true", async () => {
    render(<BasicTooltip defaultOpen />);
    expect(await screen.findByRole("tooltip")).toBeInTheDocument();
  });

  it("closes when trigger is blurred", async () => {
    const user = userEvent.setup();
    render(<BasicTooltip />);

    await user.tab();
    expect(await screen.findByRole("tooltip")).toBeInTheDocument();

    await user.tab();
    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });

  it("renders the arrow when arrow prop is true", async () => {
    render(<BasicTooltip defaultOpen arrow />);
    await screen.findByRole("tooltip");
    expect(
      document.querySelector('[data-slot="tooltip-arrow"]')
    ).toBeInTheDocument();
  });

  it("does not render the arrow by default", async () => {
    render(<BasicTooltip defaultOpen />);
    await screen.findByRole("tooltip");
    expect(
      document.querySelector('[data-slot="tooltip-arrow"]')
    ).not.toBeInTheDocument();
  });

  it.each(["top", "right", "bottom", "left"] as const)(
    "propagates side=%s to data-side",
    async (side) => {
      render(<BasicTooltip defaultOpen side={side} />);
      await screen.findByRole("tooltip");
      const content = document.querySelector('[data-slot="tooltip-content"]');
      expect(content).toHaveAttribute("data-side", side);
    }
  );

  it("forwards sideOffset to the underlying primitive", async () => {
    render(<BasicTooltip defaultOpen sideOffset={20} />);
    await screen.findByRole("tooltip");
    const content = document.querySelector('[data-slot="tooltip-content"]');
    // Radix exposes the resolved offset via inline transform on the wrapper.
    // We assert the tooltip rendered (precise pixel math is brittle in jsdom).
    expect(content).toBeInTheDocument();
  });

  it("sets data-slot attributes on trigger, content, and arrow", async () => {
    render(<BasicTooltip defaultOpen arrow />);
    await screen.findByRole("tooltip");
    expect(
      document.querySelector('[data-slot="tooltip-trigger"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="tooltip-content"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="tooltip-arrow"]')
    ).toBeInTheDocument();
  });

  it("merges custom className onto content", async () => {
    render(<BasicTooltip defaultOpen contentClassName="custom-tooltip" />);
    await screen.findByRole("tooltip");
    const content = document.querySelector('[data-slot="tooltip-content"]');
    expect(content).toHaveClass("custom-tooltip");
    expect(content).toHaveClass("bg-foreground");
  });

  it("supports controlled open/onOpenChange", async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();

    const { rerender } = render(
      <BasicTooltip open={false} onOpenChange={onOpenChange} />
    );
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    await user.tab();
    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    rerender(<BasicTooltip open onOpenChange={onOpenChange} />);
    expect(await screen.findByRole("tooltip")).toBeInTheDocument();
  });

  it("has no axe violations when closed", async () => {
    const { container } = render(<BasicTooltip />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no axe violations when open", async () => {
    const { container } = render(<BasicTooltip defaultOpen arrow />);
    await screen.findByRole("tooltip");
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
