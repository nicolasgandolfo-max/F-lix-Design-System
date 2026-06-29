import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./button";

const VARIANTS = ["primary", "secondary", "ghost", "danger", "line"] as const;
const SIZES = ["sm", "md", "lg"] as const;

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  it("renders all variants without crashing", () => {
    for (const variant of VARIANTS) {
      const { unmount } = render(<Button variant={variant}>Button</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all sizes without crashing", () => {
    for (const size of SIZES) {
      const { unmount } = render(<Button size={size}>Button</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
      unmount();
    }
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("does not call onClick when disabled", async () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("stretches to full width when fullWidth is true", () => {
    render(<Button fullWidth>Full width</Button>);
    expect(screen.getByRole("button")).toHaveClass("w-full");
  });

  it("renders as child element with asChild prop", () => {
    render(
      <Button asChild>
        <a href="/test">Link button</a>
      </Button>
    );
    expect(
      screen.getByRole("link", { name: /link button/i })
    ).toBeInTheDocument();
  });

  it("merges custom className", () => {
    render(<Button className="custom-class">Button</Button>);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("forwards native HTML attributes", () => {
    render(
      <Button data-testid="btn" aria-describedby="desc">
        Button
      </Button>
    );
    expect(screen.getByTestId("btn")).toHaveAttribute(
      "aria-describedby",
      "desc"
    );
  });

  it("sets data-slot='button'", () => {
    render(<Button>Button</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("data-slot", "button");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Button>Accessible button</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
