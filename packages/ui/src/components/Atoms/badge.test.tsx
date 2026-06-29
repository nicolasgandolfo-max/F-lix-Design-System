import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, it, expect, vi } from "vitest";
import { Badge } from "./badge";

const VARIANTS = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "ghost",
  "link",
  "dark",
] as const;

const SIZES = ["sm", "md", "lg"] as const;

const SHAPES = ["badge", "chip"] as const;

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>Status</Badge>);
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("renders all variants without crashing", () => {
    for (const variant of VARIANTS) {
      const { unmount } = render(<Badge variant={variant}>Label</Badge>);
      expect(screen.getByText("Label")).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all shapes without crashing", () => {
    for (const shape of SHAPES) {
      const { unmount } = render(<Badge shape={shape}>Label</Badge>);
      expect(screen.getByText("Label")).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all sizes without crashing", () => {
    for (const size of SIZES) {
      const { unmount } = render(<Badge size={size}>Label</Badge>);
      expect(screen.getByText("Label")).toBeInTheDocument();
      unmount();
    }
  });

  it("renders iconLeft before the label", () => {
    render(<Badge iconLeft={<span data-testid="icon-left" />}>Label</Badge>);
    const badge = screen
      .getByTestId("icon-left")
      .closest("[data-slot='badge']")!;
    expect(badge.firstElementChild).toBe(screen.getByTestId("icon-left"));
  });

  it("renders iconRight after the label", () => {
    render(<Badge iconRight={<span data-testid="icon-right" />}>Label</Badge>);
    const badge = screen
      .getByTestId("icon-right")
      .closest("[data-slot='badge']")!;
    expect(badge.lastElementChild).toBe(screen.getByTestId("icon-right"));
  });

  it("renders both icons with the label between them", () => {
    render(
      <Badge
        iconLeft={<span data-testid="icon-left" />}
        iconRight={<span data-testid="icon-right" />}
      >
        Label
      </Badge>
    );
    // children: [icon-left, label-span, icon-right]
    const badge = screen
      .getByTestId("icon-left")
      .closest("[data-slot='badge']")!;
    const children = Array.from(badge.children);
    expect(children[0]).toBe(screen.getByTestId("icon-left"));
    expect(children[2]).toBe(screen.getByTestId("icon-right"));
  });

  it("does not render icon slots when not provided", () => {
    render(<Badge>Label</Badge>);
    // Only the label <span> wrapper inside the badge, no icon elements
    const badge = screen.getByText("Label").closest("[data-slot='badge']")!;
    expect(badge.children).toHaveLength(1);
  });

  it("renders an icon-only pill (no inner label span) when children are empty", () => {
    const { container } = render(
      <Badge iconLeft={<span data-testid="icon-left" />} />
    );
    const badge = container.querySelector('[data-slot="badge"]')!;
    expect(badge).not.toBeNull();
    // Only the icon — no empty label wrapper that would inflate height via
    // line-height (Figma node 682-15286 specifies a 18 px tall icon-only
    // pill, not the ~19 px we'd otherwise get from text-xs leading-tight).
    expect(badge.children).toHaveLength(1);
    expect(badge.firstElementChild).toBe(screen.getByTestId("icon-left"));
  });

  it("renders an icon-only pill with iconRight too", () => {
    const { container } = render(
      <Badge iconRight={<span data-testid="icon-right" />} />
    );
    const badge = container.querySelector('[data-slot="badge"]')!;
    expect(badge.children).toHaveLength(1);
    expect(badge.firstElementChild).toBe(screen.getByTestId("icon-right"));
  });

  it("merges custom className", () => {
    render(<Badge className="custom-class">Label</Badge>);
    const badge = screen.getByText("Label").closest("[data-slot='badge']")!;
    expect(badge).toHaveClass("custom-class");
  });

  it("forwards native HTML attributes", () => {
    render(
      <Badge data-testid="badge-el" aria-label="active status">
        Label
      </Badge>
    );
    expect(screen.getByTestId("badge-el")).toHaveAttribute(
      "aria-label",
      "active status"
    );
  });

  it("sets data-slot='badge'", () => {
    render(<Badge data-testid="badge-el">Label</Badge>);
    expect(screen.getByTestId("badge-el")).toHaveAttribute(
      "data-slot",
      "badge"
    );
  });

  it("sets data-variant to the active variant", () => {
    render(
      <Badge data-testid="badge-el" variant="destructive">
        Label
      </Badge>
    );
    expect(screen.getByTestId("badge-el")).toHaveAttribute(
      "data-variant",
      "destructive"
    );
  });

  it("sets data-shape to the active shape", () => {
    render(
      <Badge data-testid="badge-el" shape="chip">
        Label
      </Badge>
    );
    expect(screen.getByTestId("badge-el")).toHaveAttribute(
      "data-shape",
      "chip"
    );
  });

  it("sets data-size to the active size", () => {
    render(
      <Badge data-testid="badge-el" size="lg">
        Label
      </Badge>
    );
    expect(screen.getByTestId("badge-el")).toHaveAttribute("data-size", "lg");
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(
      <Badge data-testid="badge-el" onClick={handleClick}>
        Label
      </Badge>
    );
    await userEvent.click(screen.getByTestId("badge-el"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Badge>New</Badge>);
    expect(await axe(container)).toHaveNoViolations();
  });

  describe("all variants pass accessibility check", () => {
    for (const variant of VARIANTS) {
      it(`variant="${variant}" has no violations`, async () => {
        const { container } = render(<Badge variant={variant}>Label</Badge>);
        expect(await axe(container)).toHaveNoViolations();
      });
    }
  });
});
