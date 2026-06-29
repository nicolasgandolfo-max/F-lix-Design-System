import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, it, expect } from "vitest";
import { Label } from "./label";

const VARIANTS = ["default", "required", "optional", "disabled"] as const;

describe("Label", () => {
  it("renders children", () => {
    render(<Label>Email address</Label>);
    expect(screen.getByText("Email address")).toBeInTheDocument();
  });

  it("sets data-slot='label'", () => {
    render(<Label>Name</Label>);
    expect(screen.getByText("Name")).toHaveAttribute("data-slot", "label");
  });

  it("renders all variants without crashing", () => {
    for (const variant of VARIANTS) {
      const { unmount } = render(<Label variant={variant}>Label</Label>);
      expect(screen.getByText("Label")).toBeInTheDocument();
      unmount();
    }
  });

  it("required variant shows a visual asterisk", () => {
    render(<Label variant="required">Email</Label>);
    expect(screen.getByText("Email")).toBeInTheDocument();
    const root = screen.getByText("Email").parentElement;
    expect(root?.textContent).toContain("*");
  });

  it("optional variant shows optional suffix", () => {
    render(<Label variant="optional">Phone</Label>);
    expect(screen.getByText(/\(optional\)/)).toBeInTheDocument();
  });

  it("associates with a control via htmlFor", () => {
    render(
      <>
        <Label htmlFor="field-email">Email</Label>
        <input id="field-email" />
      </>
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("has no axe violations for common variants", async () => {
    const { container } = render(
      <div>
        <Label>Default</Label>
        <Label variant="required">Required</Label>
        <Label variant="optional">Optional</Label>
        <Label variant="disabled">Disabled</Label>
      </div>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
