import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, it, expect } from "vitest";
import { Text } from "./text";

const VARIANTS = [
  "display-xl",
  "display-lg",
  "display-md",
  "heading-1",
  "heading-2",
  "heading-3",
  "heading-4",
  "body-lg",
  "body",
  "body-sm",
  "caption",
] as const;

const DEFAULT_TAGS: Record<string, string> = {
  "display-xl": "H1",
  "display-lg": "H1",
  "display-md": "H1",
  "heading-1": "H1",
  "heading-2": "H2",
  "heading-3": "H3",
  "heading-4": "H4",
  "body-lg": "P",
  body: "P",
  "body-sm": "P",
  caption: "SPAN",
};

describe("Text", () => {
  it("renders body variant by default as a <p>", () => {
    render(<Text>Hello</Text>);
    const el = screen.getByText("Hello");
    expect(el.tagName).toBe("P");
  });

  it("renders all variants without crashing", () => {
    for (const variant of VARIANTS) {
      const { unmount } = render(<Text variant={variant}>Content</Text>);
      expect(screen.getByText("Content")).toBeInTheDocument();
      unmount();
    }
  });

  it("uses the correct default HTML tag per variant", () => {
    for (const variant of VARIANTS) {
      const { unmount } = render(<Text variant={variant}>Content</Text>);
      expect(screen.getByText("Content").tagName).toBe(DEFAULT_TAGS[variant]);
      unmount();
    }
  });

  it("overrides the tag with the 'as' prop", () => {
    render(<Text as="span">Span text</Text>);
    expect(screen.getByText("Span text").tagName).toBe("SPAN");
  });

  it("falls back to <p> when variant has no DEFAULT_TAG entry", () => {
    render(
      <Text variant={"unknown-variant" as unknown as (typeof VARIANTS)[number]}>
        Fallback
      </Text>
    );
    expect(screen.getByText("Fallback").tagName).toBe("P");
  });

  it("sets data-slot='text'", () => {
    render(<Text>Content</Text>);
    expect(screen.getByText("Content")).toHaveAttribute("data-slot", "text");
  });

  it("sets data-variant", () => {
    render(<Text variant="heading-2">Title</Text>);
    expect(screen.getByText("Title")).toHaveAttribute(
      "data-variant",
      "heading-2"
    );
  });

  it("merges custom className", () => {
    render(<Text className="extra">Text</Text>);
    expect(screen.getByText("Text")).toHaveClass("extra");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Text variant="body">Accessible text</Text>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
