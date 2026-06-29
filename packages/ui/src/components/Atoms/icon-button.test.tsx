import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, it, expect, vi } from "vitest";
import { IconButton } from "./icon-button";

const VARIANTS = ["primary", "secondary", "ghost", "danger", "line"] as const;
const SIZES = ["sm", "md", "lg"] as const;

const TestIcon = () => <svg data-testid="test-icon" aria-hidden />;

describe("IconButton", () => {
  // ── Rendering ──────────────────────────────────────────────────────────────

  it("renders the icon", () => {
    render(<IconButton icon={<TestIcon />} aria-label="Add item" />);
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("sets data-slot='icon-button' on the element", () => {
    render(<IconButton icon={<TestIcon />} aria-label="Add item" />);
    expect(screen.getByRole("button")).toHaveAttribute(
      "data-slot",
      "icon-button"
    );
  });

  it("forwards aria-label to the button", () => {
    render(<IconButton icon={<TestIcon />} aria-label="Delete item" />);
    expect(
      screen.getByRole("button", { name: "Delete item" })
    ).toBeInTheDocument();
  });

  // ── Variants ───────────────────────────────────────────────────────────────

  it.each(VARIANTS)("renders variant '%s' without crashing", (variant) => {
    const { unmount } = render(
      <IconButton icon={<TestIcon />} aria-label="Action" variant={variant} />
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
    unmount();
  });

  // ── Sizes ──────────────────────────────────────────────────────────────────

  it.each(SIZES)("renders size '%s' without crashing", (size) => {
    const { unmount } = render(
      <IconButton icon={<TestIcon />} aria-label="Action" size={size} />
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
    unmount();
  });

  // ── Disabled state ─────────────────────────────────────────────────────────

  it("passes disabled to the native button", () => {
    render(<IconButton icon={<TestIcon />} aria-label="Add item" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("does not fire onClick when disabled", async () => {
    const handleClick = vi.fn();
    render(
      <IconButton
        icon={<TestIcon />}
        aria-label="Add item"
        disabled
        onClick={handleClick}
      />
    );
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // ── onClick ────────────────────────────────────────────────────────────────

  it("fires onClick when enabled", async () => {
    const handleClick = vi.fn();
    render(
      <IconButton
        icon={<TestIcon />}
        aria-label="Add item"
        onClick={handleClick}
      />
    );
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // ── asChild ────────────────────────────────────────────────────────────────

  it("renders as child element when asChild is set", () => {
    render(
      <IconButton icon={<TestIcon />} aria-label="Go home" asChild>
        <a href="/home" />
      </IconButton>
    );
    const link = screen.getByRole("link", { name: "Go home" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/home");
    expect(link).toHaveAttribute("data-slot", "icon-button");
  });

  // ── Ref forwarding ─────────────────────────────────────────────────────────

  it("forwards ref to the HTMLButtonElement", () => {
    const ref = vi.fn();
    render(<IconButton icon={<TestIcon />} aria-label="Add item" ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
  });

  // ── className ──────────────────────────────────────────────────────────────

  it("merges custom className", () => {
    render(
      <IconButton
        icon={<TestIcon />}
        aria-label="Add item"
        className="my-custom-class"
      />
    );
    expect(screen.getByRole("button")).toHaveClass("my-custom-class");
  });

  // ── Accessibility (axe) ───────────────────────────────────────────────────

  it("has no accessibility violations (default)", async () => {
    const { container } = render(
      <IconButton icon={<TestIcon />} aria-label="Add item" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no accessibility violations (disabled)", async () => {
    const { container } = render(
      <IconButton icon={<TestIcon />} aria-label="Add item" disabled />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no accessibility violations (asChild)", async () => {
    const { container } = render(
      <IconButton icon={<TestIcon />} aria-label="Go home" asChild>
        <a href="/home" />
      </IconButton>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
