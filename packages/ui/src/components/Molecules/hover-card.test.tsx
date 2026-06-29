import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, it, expect, vi } from "vitest";

import {
  HoverCard,
  HoverCardArrow,
  HoverCardBody,
  HoverCardContent,
  HoverCardDescription,
  HoverCardFooter,
  HoverCardHeader,
  HoverCardTitle,
  HoverCardTrigger,
} from "./hover-card";

interface BasicHoverCardProps {
  arrow?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  openDelay?: number;
  closeDelay?: number;
  contentClassName?: string;
  triggerAsChild?: boolean;
}

function BasicHoverCard({
  arrow,
  side,
  sideOffset,
  open,
  onOpenChange,
  defaultOpen,
  openDelay = 0,
  closeDelay = 0,
  contentClassName,
  triggerAsChild,
}: BasicHoverCardProps) {
  return (
    <HoverCard
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
      openDelay={openDelay}
      closeDelay={closeDelay}
    >
      {triggerAsChild ? (
        <HoverCardTrigger asChild>
          <a href="#">@felixpago</a>
        </HoverCardTrigger>
      ) : (
        <HoverCardTrigger>@felixpago</HoverCardTrigger>
      )}
      <HoverCardContent
        side={side}
        sideOffset={sideOffset}
        className={contentClassName}
      >
        <HoverCardHeader>
          <HoverCardTitle>Felix Pago</HoverCardTitle>
        </HoverCardHeader>
        <HoverCardBody>
          <HoverCardDescription>
            Payments made simple across Latin America.
          </HoverCardDescription>
        </HoverCardBody>
        <HoverCardFooter>
          <span>1.2M Transfers</span>
          <span>14 Countries</span>
        </HoverCardFooter>
        {arrow && <HoverCardArrow />}
      </HoverCardContent>
    </HoverCard>
  );
}

describe("HoverCard", () => {
  it("does not render content until trigger is hovered", async () => {
    const user = userEvent.setup();
    render(<BasicHoverCard />);

    expect(
      document.querySelector('[data-slot="hover-card-content"]')
    ).not.toBeInTheDocument();

    await user.hover(screen.getByText("@felixpago"));

    await waitFor(() => {
      expect(
        document.querySelector('[data-slot="hover-card-content"]')
      ).toBeInTheDocument();
    });
  });

  it("opens when defaultOpen is true", async () => {
    render(<BasicHoverCard defaultOpen />);
    expect(
      await screen.findByText("Payments made simple across Latin America.")
    ).toBeInTheDocument();
  });

  it("closes when pointer leaves the trigger", async () => {
    const user = userEvent.setup();
    render(<BasicHoverCard />);

    const trigger = screen.getByText("@felixpago");
    await user.hover(trigger);

    await waitFor(() => {
      expect(
        document.querySelector('[data-slot="hover-card-content"]')
      ).toBeInTheDocument();
    });

    await user.unhover(trigger);
    fireEvent.blur(trigger);

    await waitFor(() => {
      expect(
        document.querySelector('[data-slot="hover-card-content"]')
      ).not.toBeInTheDocument();
    });
  });

  it("opens when trigger is focused via keyboard", async () => {
    const user = userEvent.setup();
    render(<BasicHoverCard triggerAsChild />);

    await user.tab();

    await waitFor(() => {
      expect(
        document.querySelector('[data-slot="hover-card-content"]')
      ).toBeInTheDocument();
    });
  });

  it("renders the arrow when included", async () => {
    render(<BasicHoverCard defaultOpen arrow />);
    await screen.findByText("Felix Pago");
    expect(
      document.querySelector('[data-slot="hover-card-arrow"]')
    ).toBeInTheDocument();
  });

  it("does not render the arrow by default", async () => {
    render(<BasicHoverCard defaultOpen />);
    await screen.findByText("Felix Pago");
    expect(
      document.querySelector('[data-slot="hover-card-arrow"]')
    ).not.toBeInTheDocument();
  });

  it.each(["top", "right", "bottom", "left"] as const)(
    "propagates side=%s to data-side",
    async (side) => {
      render(<BasicHoverCard defaultOpen side={side} />);
      await screen.findByText("Felix Pago");
      const content = document.querySelector(
        '[data-slot="hover-card-content"]'
      );
      expect(content).toHaveAttribute("data-side", side);
    }
  );

  it("forwards sideOffset to the underlying primitive", async () => {
    render(<BasicHoverCard defaultOpen sideOffset={20} />);
    await screen.findByText("Felix Pago");
    const content = document.querySelector('[data-slot="hover-card-content"]');
    expect(content).toBeInTheDocument();
  });

  it("renders all data-slot attributes when open", async () => {
    render(<BasicHoverCard defaultOpen arrow />);
    await screen.findByText("Felix Pago");

    expect(
      document.querySelector('[data-slot="hover-card-trigger"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="hover-card-content"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="hover-card-arrow"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="hover-card-header"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="hover-card-body"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="hover-card-footer"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="hover-card-title"]')
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="hover-card-description"]')
    ).toBeInTheDocument();
  });

  it("merges custom className onto content", async () => {
    render(<BasicHoverCard defaultOpen contentClassName="custom-hover-card" />);
    await screen.findByText("Felix Pago");
    const content = document.querySelector('[data-slot="hover-card-content"]');
    expect(content).toHaveClass("custom-hover-card");
    expect(content).toHaveClass("bg-card");
    expect(content).toHaveClass("border-border");
  });

  it("merges custom className onto each sub-part", async () => {
    render(
      <HoverCard defaultOpen openDelay={0} closeDelay={0}>
        <HoverCardTrigger className="trigger-custom">@user</HoverCardTrigger>
        <HoverCardContent>
          <HoverCardHeader className="header-custom">
            <HoverCardTitle className="title-custom">Title</HoverCardTitle>
          </HoverCardHeader>
          <HoverCardBody className="body-custom">
            <HoverCardDescription className="desc-custom">
              Description
            </HoverCardDescription>
          </HoverCardBody>
          <HoverCardFooter className="footer-custom">
            <span>Stat</span>
          </HoverCardFooter>
          <HoverCardArrow className="arrow-custom" />
        </HoverCardContent>
      </HoverCard>
    );
    await screen.findByText("Title");

    expect(
      document.querySelector('[data-slot="hover-card-trigger"]')
    ).toHaveClass("trigger-custom");
    expect(
      document.querySelector('[data-slot="hover-card-header"]')
    ).toHaveClass("header-custom");
    expect(
      document.querySelector('[data-slot="hover-card-title"]')
    ).toHaveClass("title-custom");
    expect(document.querySelector('[data-slot="hover-card-body"]')).toHaveClass(
      "body-custom"
    );
    expect(
      document.querySelector('[data-slot="hover-card-description"]')
    ).toHaveClass("desc-custom");
    expect(
      document.querySelector('[data-slot="hover-card-footer"]')
    ).toHaveClass("footer-custom");
    expect(
      document.querySelector('[data-slot="hover-card-arrow"]')
    ).toHaveClass("arrow-custom");
  });

  it("supports asChild on the trigger", async () => {
    render(<BasicHoverCard triggerAsChild />);
    const trigger = screen.getByRole("link", { name: "@felixpago" });
    expect(trigger).toBeInTheDocument();
    expect(trigger.tagName).toBe("A");
    expect(trigger).toHaveAttribute("data-slot", "hover-card-trigger");
  });

  it("supports controlled open/onOpenChange", async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();

    const { rerender } = render(
      <BasicHoverCard open={false} onOpenChange={onOpenChange} />
    );
    expect(
      document.querySelector('[data-slot="hover-card-content"]')
    ).not.toBeInTheDocument();

    await user.hover(screen.getByText("@felixpago"));
    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    rerender(<BasicHoverCard open onOpenChange={onOpenChange} />);
    await waitFor(() => {
      expect(
        document.querySelector('[data-slot="hover-card-content"]')
      ).toBeInTheDocument();
    });
  });

  it("respects custom openDelay", async () => {
    vi.useFakeTimers();
    try {
      render(<BasicHoverCard openDelay={500} closeDelay={0} />);

      const trigger = screen.getByText("@felixpago");
      fireEvent.pointerEnter(trigger, { pointerType: "mouse" });

      vi.advanceTimersByTime(100);
      expect(
        document.querySelector('[data-slot="hover-card-content"]')
      ).not.toBeInTheDocument();

      vi.advanceTimersByTime(500);
      await vi.waitFor(() => {
        expect(
          document.querySelector('[data-slot="hover-card-content"]')
        ).toBeInTheDocument();
      });
    } finally {
      vi.useRealTimers();
    }
  });

  it("has no axe violations when closed", async () => {
    const { container } = render(<BasicHoverCard />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no axe violations when open", async () => {
    const { container } = render(<BasicHoverCard defaultOpen arrow />);
    await screen.findByText("Felix Pago");
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
