import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, it, expect, vi } from "vitest";
import { Textarea } from "./textarea";

describe("Textarea", () => {
  // ── Rendering ──────────────────────────────────────────────────────────────

  it("renders the label text", () => {
    render(<Textarea label="Your message" />);
    expect(screen.getByText("Your message")).toBeInTheDocument();
  });

  it("renders a native <textarea> element", () => {
    render(<Textarea label="Message" />);
    expect(
      screen.getByRole("textbox", { name: "Message" })
    ).toBeInTheDocument();
  });

  it("sets data-slot='textarea' on the native textarea", () => {
    render(<Textarea label="Message" />);
    expect(screen.getByLabelText("Message")).toHaveAttribute(
      "data-slot",
      "textarea"
    );
  });

  it("sets data-slot='textarea-field' on the wrapper", () => {
    render(<Textarea label="Message" />);
    const wrapper = screen
      .getByLabelText("Message")
      .closest("[data-slot='textarea-field']");
    expect(wrapper).toBeInTheDocument();
  });

  it("renders description text when provided", () => {
    render(<Textarea label="Message" description="Max 500 characters." />);
    expect(screen.getByText("Max 500 characters.")).toBeInTheDocument();
  });

  it("renders error text when error is set", () => {
    render(<Textarea label="Message" error="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("shows error text instead of description when both are provided", () => {
    render(
      <Textarea
        label="Message"
        description="Helper text"
        error="Something went wrong"
      />
    );
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.queryByText("Helper text")).not.toBeInTheDocument();
  });

  it("renders no helper text when neither description nor error is set", () => {
    const { container } = render(<Textarea label="Message" />);
    expect(container.querySelector("p")).not.toBeInTheDocument();
  });

  // ── ARIA / Accessibility ───────────────────────────────────────────────────

  it("sets aria-invalid on the textarea when error is provided", () => {
    render(<Textarea label="Message" error="Required" />);
    expect(screen.getByLabelText("Message")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  it("does not set aria-invalid when there is no error", () => {
    render(<Textarea label="Message" />);
    expect(screen.getByLabelText("Message")).not.toHaveAttribute(
      "aria-invalid"
    );
  });

  it("links textarea to description via aria-describedby", () => {
    render(<Textarea label="Message" description="Enter your message" />);
    const textarea = screen.getByLabelText("Message");
    const describedById = textarea.getAttribute("aria-describedby");
    expect(describedById).toBeTruthy();
    expect(document.getElementById(describedById!)).toHaveTextContent(
      "Enter your message"
    );
  });

  it("links textarea to error message via aria-describedby", () => {
    render(<Textarea label="Message" error="Invalid" />);
    const textarea = screen.getByLabelText("Message");
    const describedById = textarea.getAttribute("aria-describedby");
    expect(describedById).toBeTruthy();
    expect(document.getElementById(describedById!)).toHaveTextContent(
      "Invalid"
    );
  });

  it("does not set aria-describedby when no description or error", () => {
    render(<Textarea label="Message" />);
    expect(screen.getByLabelText("Message")).not.toHaveAttribute(
      "aria-describedby"
    );
  });

  // ── Disabled state ─────────────────────────────────────────────────────────

  it("passes disabled to the native textarea", () => {
    render(<Textarea label="Message" disabled />);
    expect(screen.getByLabelText("Message")).toBeDisabled();
  });

  // ── Native props / forwarding ──────────────────────────────────────────────

  it("forwards a custom id to the textarea", () => {
    render(<Textarea label="Message" id="my-textarea" />);
    expect(screen.getByLabelText("Message")).toHaveAttribute(
      "id",
      "my-textarea"
    );
  });

  it("forwards rows prop to the textarea", () => {
    render(<Textarea label="Message" rows={6} />);
    expect(screen.getByLabelText("Message")).toHaveAttribute("rows", "6");
  });

  it("merges custom className onto the native textarea", () => {
    render(<Textarea label="Message" className="my-custom-class" />);
    expect(screen.getByLabelText("Message")).toHaveClass("my-custom-class");
  });

  it("applies wrapperClassName to the outer wrapper", () => {
    render(<Textarea label="Message" wrapperClassName="my-wrapper" />);
    const wrapper = screen
      .getByLabelText("Message")
      .closest("[data-slot='textarea-field']");
    expect(wrapper).toHaveClass("my-wrapper");
  });

  it("calls onChange when user types", async () => {
    const handleChange = vi.fn();
    render(<Textarea label="Message" onChange={handleChange} />);
    await userEvent.type(screen.getByLabelText("Message"), "Hello");
    expect(handleChange).toHaveBeenCalled();
  });

  it("forwards data attributes", () => {
    render(<Textarea label="Message" data-testid="my-textarea" />);
    expect(screen.getByTestId("my-textarea")).toBeInTheDocument();
  });

  // ── Ref forwarding ─────────────────────────────────────────────────────────

  it("forwards ref to the native textarea element", () => {
    const ref = vi.fn();
    render(<Textarea label="Message" ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLTextAreaElement));
  });

  // ── Accessibility (axe) ───────────────────────────────────────────────────

  it("has no accessibility violations (default)", async () => {
    const { container } = render(
      <Textarea label="Your message" description="Enter your message" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no accessibility violations (error state)", async () => {
    const { container } = render(
      <Textarea label="Your message" error="This field is required" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no accessibility violations (disabled)", async () => {
    const { container } = render(<Textarea label="Your message" disabled />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
