import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, it, expect, vi } from "vitest";
import { Input } from "./input";

const SIZES = ["md", "sm"] as const;

describe("Input", () => {
  // ── Rendering ──────────────────────────────────────────────────────────────

  it("renders the label text", () => {
    render(<Input label="Email address" />);
    expect(screen.getByText("Email address")).toBeInTheDocument();
  });

  it("renders a native <input> element", () => {
    render(<Input label="Name" />);
    // label association — label's htmlFor targets the input
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("sets data-slot='input' on the native input", () => {
    render(<Input label="Name" />);
    expect(screen.getByLabelText("Name")).toHaveAttribute("data-slot", "input");
  });

  it("sets data-slot='input-field' on the wrapper", () => {
    render(<Input label="Name" />);
    const wrapper = screen
      .getByLabelText("Name")
      .closest("[data-slot='input-field']");
    expect(wrapper).toBeInTheDocument();
  });

  it("renders description text when provided", () => {
    render(<Input label="Email" description="We'll never share your email." />);
    expect(
      screen.getByText("We'll never share your email.")
    ).toBeInTheDocument();
  });

  it("renders error text when error is set", () => {
    render(<Input label="Email" error="Invalid email address" />);
    expect(screen.getByText("Invalid email address")).toBeInTheDocument();
  });

  it("shows error text instead of description when both are provided", () => {
    render(
      <Input
        label="Email"
        description="Helper text"
        error="Something went wrong"
      />
    );
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.queryByText("Helper text")).not.toBeInTheDocument();
  });

  it("renders no helper text when neither description nor error is set", () => {
    const { container } = render(<Input label="Name" />);
    expect(container.querySelector("p")).not.toBeInTheDocument();
  });

  // ── ARIA / Accessibility ───────────────────────────────────────────────────

  it("sets aria-invalid on the input when error is provided", () => {
    render(<Input label="Email" error="Required" />);
    expect(screen.getByLabelText("Email")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  it("does not set aria-invalid when there is no error", () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText("Email")).not.toHaveAttribute("aria-invalid");
  });

  it("links input to description via aria-describedby", () => {
    render(<Input label="Email" description="Enter your work email" />);
    const input = screen.getByLabelText("Email");
    const describedById = input.getAttribute("aria-describedby");
    expect(describedById).toBeTruthy();
    expect(document.getElementById(describedById!)).toHaveTextContent(
      "Enter your work email"
    );
  });

  it("links input to error message via aria-describedby", () => {
    render(<Input label="Email" error="Invalid" />);
    const input = screen.getByLabelText("Email");
    const describedById = input.getAttribute("aria-describedby");
    expect(describedById).toBeTruthy();
    expect(document.getElementById(describedById!)).toHaveTextContent(
      "Invalid"
    );
  });

  it("does not set aria-describedby when no description or error", () => {
    render(<Input label="Name" />);
    expect(screen.getByLabelText("Name")).not.toHaveAttribute(
      "aria-describedby"
    );
  });

  // ── Disabled state ─────────────────────────────────────────────────────────

  it("passes disabled to the native input", () => {
    render(<Input label="Name" disabled />);
    expect(screen.getByLabelText("Name")).toBeDisabled();
  });

  // ── Sizes ──────────────────────────────────────────────────────────────────

  it("renders all sizes without crashing", () => {
    for (const size of SIZES) {
      const { unmount } = render(<Input label="Field" size={size} />);
      expect(screen.getByLabelText("Field")).toBeInTheDocument();
      unmount();
    }
  });

  // ── Trailing icon ──────────────────────────────────────────────────────────

  it("renders no icon when icon prop is omitted", () => {
    const { container } = render(<Input label="Name" />);
    expect(
      container.querySelector("[data-slot='input-field'] svg")
    ).not.toBeInTheDocument();
  });

  it("renders the icon when icon prop is provided", () => {
    render(
      <Input label="Name" icon={<span data-testid="custom-icon">★</span>} />
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("does not render the trailing-icon wrapper when icon is omitted", () => {
    const { container } = render(<Input label="Name" />);
    expect(
      container.querySelector("[data-slot='input-right-icon']")
    ).not.toBeInTheDocument();
  });

  it("renders the trailing-icon wrapper when icon is provided", () => {
    const { container } = render(
      <Input label="Name" icon={<span data-testid="custom-icon">★</span>} />
    );
    expect(
      container.querySelector("[data-slot='input-right-icon']")
    ).toBeInTheDocument();
  });

  // ── Leading icon ───────────────────────────────────────────────────────────

  it("renders the leading icon when leftIcon prop is provided", () => {
    render(
      <Input label="Name" leftIcon={<span data-testid="lead-icon">✓</span>} />
    );
    expect(screen.getByTestId("lead-icon")).toBeInTheDocument();
  });

  it("does not render the leading-icon wrapper when leftIcon is omitted", () => {
    const { container } = render(<Input label="Name" />);
    expect(
      container.querySelector("[data-slot='input-left-icon']")
    ).not.toBeInTheDocument();
  });

  it("renders the leading-icon wrapper when leftIcon is provided", () => {
    const { container } = render(
      <Input label="Name" leftIcon={<span data-testid="lead-icon">✓</span>} />
    );
    expect(
      container.querySelector("[data-slot='input-left-icon']")
    ).toBeInTheDocument();
  });

  it("shifts the placeholder-position label past the leading icon", () => {
    render(
      <Input label="Search" leftIcon={<span data-testid="lead-icon">✓</span>} />
    );
    // Default position must clear the icon …
    expect(screen.getByText("Search")).toHaveClass("left-9");
  });

  it("snaps the floated label back to the top-left when leftIcon is set", () => {
    render(
      <Input label="Search" leftIcon={<span data-testid="lead-icon">✓</span>} />
    );
    // … but once floated (peer-focus / not(:placeholder-shown)), the label
    // must return to `left-3` so the notch lands at the box corner.
    const label = screen.getByText("Search");
    expect(label).toHaveClass("peer-focus:left-3");
    expect(label).toHaveClass("peer-[&:not(:placeholder-shown)]:left-3");
  });

  it("keeps the label at left-3 when leftIcon is omitted", () => {
    render(<Input label="Search" />);
    const label = screen.getByText("Search");
    expect(label).toHaveClass("left-3");
    expect(label).not.toHaveClass("left-9");
  });

  it("renders both leading and trailing icons simultaneously", () => {
    render(
      <Input
        label="Search"
        leftIcon={<span data-testid="lead-icon">✓</span>}
        icon={<span data-testid="trail-icon">i</span>}
      />
    );
    expect(screen.getByTestId("lead-icon")).toBeInTheDocument();
    expect(screen.getByTestId("trail-icon")).toBeInTheDocument();
  });

  // ── Native props / forwarding ──────────────────────────────────────────────

  it("forwards native input props (type)", () => {
    render(<Input label="Password" type="password" />);
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "type",
      "password"
    );
  });

  it("merges custom className onto the native input", () => {
    render(<Input label="Name" className="custom-input-class" />);
    expect(screen.getByLabelText("Name")).toHaveClass("custom-input-class");
  });

  it("applies wrapperClassName to the outer wrapper", () => {
    render(<Input label="Name" wrapperClassName="custom-wrapper" />);
    const wrapper = screen
      .getByLabelText("Name")
      .closest("[data-slot='input-field']");
    expect(wrapper).toHaveClass("custom-wrapper");
  });

  it("forwards a custom id to the input", () => {
    render(<Input label="Name" id="my-custom-id" />);
    expect(screen.getByLabelText("Name")).toHaveAttribute("id", "my-custom-id");
  });

  it("calls onChange when user types", async () => {
    const handleChange = vi.fn();
    render(<Input label="Name" onChange={handleChange} />);
    await userEvent.type(screen.getByLabelText("Name"), "Felix");
    expect(handleChange).toHaveBeenCalled();
  });

  it("forwards data attributes", () => {
    render(<Input label="Name" data-testid="my-input" />);
    expect(screen.getByTestId("my-input")).toBeInTheDocument();
  });

  // ── Ref forwarding ─────────────────────────────────────────────────────────

  it("forwards ref to the native input element", () => {
    const ref = vi.fn();
    render(<Input label="Name" ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
  });

  // ── Accessibility (axe) ───────────────────────────────────────────────────

  it("has no accessibility violations (default)", async () => {
    const { container } = render(
      <Input label="Email address" description="Enter your email" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no accessibility violations (error state)", async () => {
    const { container } = render(
      <Input label="Email address" error="Invalid email" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no accessibility violations (disabled)", async () => {
    const { container } = render(<Input label="Email address" disabled />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no accessibility violations (with leading and trailing icons)", async () => {
    const { container } = render(
      <Input
        label="Search"
        description="Field description"
        leftIcon={<span aria-hidden>✓</span>}
        icon={<span aria-hidden>i</span>}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
