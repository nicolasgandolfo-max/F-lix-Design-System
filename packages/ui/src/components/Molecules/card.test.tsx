import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, it, expect } from "vitest";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

describe("Card", () => {
  describe("variants", () => {
    it("renders default variant with bg-card + border, no shadow", () => {
      const { container } = render(<Card>Body</Card>);
      const root = container.querySelector("[data-slot='card']")!;
      expect(root).toBeInTheDocument();
      expect(root).toHaveAttribute("data-variant", "default");
      expect(root).toHaveClass("bg-card");
      expect(root).toHaveClass("border");
      expect(root).toHaveClass("border-border");
      expect(root).not.toHaveClass("shadow-lg");
    });

    it("renders elevated variant with shadow-lg", () => {
      const { container } = render(<Card variant="elevated">Body</Card>);
      const root = container.querySelector("[data-slot='card']")!;
      expect(root).toHaveAttribute("data-variant", "elevated");
      expect(root).toHaveClass("bg-card");
      expect(root).toHaveClass("border");
      expect(root).toHaveClass("shadow-lg");
    });

    it("renders ghost variant with no border, no bg-card", () => {
      const { container } = render(<Card variant="ghost">Body</Card>);
      const root = container.querySelector("[data-slot='card']")!;
      expect(root).toHaveAttribute("data-variant", "ghost");
      expect(root).toHaveClass("bg-transparent");
      expect(root).not.toHaveClass("bg-card");
      expect(root).not.toHaveClass("border-border");
      expect(root).not.toHaveClass("shadow-lg");
    });

    it("falls back to default when variant is null", () => {
      const { container } = render(
        <Card
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          variant={null as any}
        >
          Body
        </Card>
      );
      const root = container.querySelector("[data-slot='card']")!;
      expect(root).toHaveAttribute("data-variant", "default");
    });
  });

  describe("structure / slots", () => {
    it("composes the full card with all sub-components", () => {
      const { container } = render(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
            <CardDescription>Subtitle</CardDescription>
          </CardHeader>
          <CardContent>Body</CardContent>
          <CardFooter>Footer</CardFooter>
        </Card>
      );

      expect(container.querySelector("[data-slot='card']")).toBeInTheDocument();
      expect(
        container.querySelector("[data-slot='card-header']")
      ).toBeInTheDocument();
      expect(
        container.querySelector("[data-slot='card-title']")
      ).toBeInTheDocument();
      expect(
        container.querySelector("[data-slot='card-description']")
      ).toBeInTheDocument();
      expect(
        container.querySelector("[data-slot='card-content']")
      ).toBeInTheDocument();
      expect(
        container.querySelector("[data-slot='card-footer']")
      ).toBeInTheDocument();
    });

    it("renders CardTitle as an <h3>", () => {
      render(<CardTitle>Title</CardTitle>);
      const title = screen.getByRole("heading", { level: 3, name: "Title" });
      expect(title).toHaveAttribute("data-slot", "card-title");
    });

    it("renders CardDescription as a <p>", () => {
      render(<CardDescription>Subtitle</CardDescription>);
      const desc = screen.getByText("Subtitle");
      expect(desc.tagName).toBe("P");
      expect(desc).toHaveAttribute("data-slot", "card-description");
    });

    it("renders CardHeader / Content / Footer as <div>s with their slots", () => {
      const { container } = render(
        <>
          <CardHeader>H</CardHeader>
          <CardContent>C</CardContent>
          <CardFooter>F</CardFooter>
        </>
      );

      const header = container.querySelector("[data-slot='card-header']")!;
      const content = container.querySelector("[data-slot='card-content']")!;
      const footer = container.querySelector("[data-slot='card-footer']")!;

      expect(header.tagName).toBe("DIV");
      expect(content.tagName).toBe("DIV");
      expect(footer.tagName).toBe("DIV");
    });
  });

  describe("className merging", () => {
    it("merges custom className on Card root", () => {
      const { container } = render(<Card className="my-custom" />);
      expect(container.querySelector("[data-slot='card']")).toHaveClass(
        "my-custom"
      );
    });

    it.each([
      ["card-header", CardHeader],
      ["card-title", CardTitle],
      ["card-description", CardDescription],
      ["card-content", CardContent],
      ["card-footer", CardFooter],
    ] as const)("merges custom className on %s", (slot, Component) => {
      const { container } = render(<Component className="extra" />);
      expect(container.querySelector(`[data-slot='${slot}']`)).toHaveClass(
        "extra"
      );
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref on Card", () => {
      const ref = createRef<HTMLDivElement>();
      render(<Card ref={ref}>Body</Card>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveAttribute("data-slot", "card");
    });

    it("forwards ref on CardTitle", () => {
      const ref = createRef<HTMLHeadingElement>();
      render(<CardTitle ref={ref}>Title</CardTitle>);
      expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    });

    it("forwards ref on CardDescription", () => {
      const ref = createRef<HTMLParagraphElement>();
      render(<CardDescription ref={ref}>Subtitle</CardDescription>);
      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });

    it("forwards ref on CardContent", () => {
      const ref = createRef<HTMLDivElement>();
      render(<CardContent ref={ref}>Body</CardContent>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("accessibility", () => {
    it("has no violations for the full composition", async () => {
      const { container } = render(
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card subtitle text goes here.</CardDescription>
          </CardHeader>
          <CardContent>
            This is the card content area. Use it to display any relevant
            information or actions.
          </CardContent>
          <CardFooter>
            <button type="button">Confirm</button>
          </CardFooter>
        </Card>
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations for ghost minimal card", async () => {
      const { container } = render(
        <Card variant="ghost">
          <CardContent>Just some content.</CardContent>
        </Card>
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
