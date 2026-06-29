import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, it, expect } from "vitest";

import {
  Alert,
  AlertDescription,
  AlertTitle,
  type AlertVariant,
} from "./alert";

const VARIANTS: AlertVariant[] = [
  "default",
  "success",
  "warning",
  "error",
  "destructive",
  "general",
];

function renderAlert(variant: AlertVariant = "default") {
  return render(
    <Alert variant={variant}>
      <AlertTitle>Alert Title</AlertTitle>
      <AlertDescription>Introduce here the alert description</AlertDescription>
    </Alert>
  );
}

describe("Alert", () => {
  it("renders title and description", () => {
    renderAlert();
    expect(screen.getByText("Alert Title")).toBeInTheDocument();
    expect(
      screen.getByText("Introduce here the alert description")
    ).toBeInTheDocument();
  });

  it("renders with role='alert' by default", () => {
    renderAlert();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("allows overriding role (e.g. 'status' for non-urgent messages)", () => {
    render(
      <Alert variant="success" role="status">
        <AlertTitle>Saved</AlertTitle>
      </Alert>
    );
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it.each(VARIANTS)("sets data-variant='%s' on the root", (variant) => {
    renderAlert(variant);
    expect(screen.getByRole("alert")).toHaveAttribute("data-variant", variant);
  });

  it.each(VARIANTS)("renders the default icon for variant '%s'", (variant) => {
    const { container } = renderAlert(variant);
    const icon = container.querySelector("[data-slot='alert-icon']");
    expect(icon).toBeInTheDocument();
    expect(icon!.querySelector("svg")).toBeInTheDocument();
  });

  it("default icons are aria-hidden (decorative)", () => {
    const { container } = renderAlert("success");
    const icon = container.querySelector("[data-slot='alert-icon']")!;
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });

  it("renders a custom icon when `icon` prop is provided", () => {
    const { container } = render(
      <Alert variant="default" icon={<svg data-testid="custom-icon" />}>
        <AlertTitle>Hi</AlertTitle>
      </Alert>
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    // and only one icon container exists
    expect(container.querySelectorAll("[data-slot='alert-icon']")).toHaveLength(
      1
    );
  });

  it("omits the icon entirely when `icon={null}`", () => {
    const { container } = render(
      <Alert variant="default" icon={null}>
        <AlertTitle>Hi</AlertTitle>
      </Alert>
    );
    expect(container.querySelector("[data-slot='alert-icon']")).toBeNull();
  });

  it("merges custom className on the root", () => {
    render(
      <Alert variant="default" className="custom-root">
        <AlertTitle>Hi</AlertTitle>
      </Alert>
    );
    expect(screen.getByRole("alert")).toHaveClass("custom-root");
  });

  it("merges custom className on AlertTitle and AlertDescription", () => {
    const { container } = render(
      <Alert>
        <AlertTitle className="custom-title">Hi</AlertTitle>
        <AlertDescription className="custom-desc">There</AlertDescription>
      </Alert>
    );
    expect(container.querySelector("[data-slot='alert-title']")).toHaveClass(
      "custom-title"
    );
    expect(
      container.querySelector("[data-slot='alert-description']")
    ).toHaveClass("custom-desc");
  });

  it("forwards native HTML attributes on the root", () => {
    render(
      <Alert data-testid="root" aria-label="Important">
        <AlertTitle>Hi</AlertTitle>
      </Alert>
    );
    const root = screen.getByTestId("root");
    expect(root).toHaveAttribute("aria-label", "Important");
  });

  it("sets expected data-slot values", () => {
    const { container } = renderAlert("success");
    expect(container.querySelector("[data-slot='alert']")).toBeInTheDocument();
    expect(
      container.querySelector("[data-slot='alert-icon']")
    ).toBeInTheDocument();
    expect(
      container.querySelector("[data-slot='alert-content']")
    ).toBeInTheDocument();
    expect(
      container.querySelector("[data-slot='alert-title']")
    ).toBeInTheDocument();
    expect(
      container.querySelector("[data-slot='alert-description']")
    ).toBeInTheDocument();
  });

  it("renders without a title or description (icon-only)", () => {
    render(<Alert variant="warning" aria-label="Warning" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  describe("accessibility", () => {
    it.each(VARIANTS)(
      "has no a11y violations for variant '%s'",
      async (variant) => {
        const { container } = renderAlert(variant);
        expect(await axe(container)).toHaveNoViolations();
      }
    );
  });
});
