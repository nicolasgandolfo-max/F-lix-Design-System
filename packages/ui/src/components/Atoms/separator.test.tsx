import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, it, expect } from "vitest";

import { Separator } from "./separator";

describe("Separator", () => {
  describe("plain (no label)", () => {
    it("defaults to a horizontal hairline with data-slot and data-orientation", () => {
      const { container } = render(<Separator />);
      const root = container.querySelector("[data-slot='separator']")!;
      expect(root).toBeInTheDocument();
      expect(root).toHaveAttribute("data-orientation", "horizontal");
      expect(root).toHaveClass("h-px");
      expect(root).toHaveClass("w-full");
      expect(root).toHaveClass("bg-border");
    });

    it("renders a vertical line when orientation='vertical'", () => {
      const { container } = render(<Separator orientation="vertical" />);
      const root = container.querySelector("[data-slot='separator']")!;
      expect(root).toHaveAttribute("data-orientation", "vertical");
      expect(root).toHaveClass("w-px");
      expect(root).toHaveClass("h-full");
    });

    it("uses role='none' by default (decorative)", () => {
      const { container } = render(<Separator />);
      const root = container.querySelector("[data-slot='separator']")!;
      expect(root).toHaveAttribute("role", "none");
    });

    it("uses role='separator' when decorative={false}", () => {
      const { container } = render(<Separator decorative={false} />);
      const root = container.querySelector("[data-slot='separator']")!;
      expect(root).toHaveAttribute("role", "separator");
    });

    it("merges a custom className on the root", () => {
      const { container } = render(<Separator className="my-extra" />);
      const root = container.querySelector("[data-slot='separator']")!;
      expect(root).toHaveClass("my-extra");
    });
  });

  describe("with label (horizontal only)", () => {
    it("renders the labeled layout with two flanking hairlines", () => {
      const { container } = render(<Separator label="Section" />);
      const root = container.querySelector("[data-slot='separator']")!;
      expect(root).toHaveAttribute("data-with-label");
      expect(root).toHaveAttribute("data-orientation", "horizontal");
      expect(screen.getByText("Section")).toBeInTheDocument();
      // two aria-hidden spans flanking the label
      const lines = root.querySelectorAll("[aria-hidden='true']");
      expect(lines).toHaveLength(2);
      lines.forEach((line) => {
        expect(line).toHaveClass("bg-border");
        expect(line).toHaveClass("h-px");
        expect(line).toHaveClass("flex-1");
      });
    });

    it("accepts the label via children", () => {
      render(<Separator>Other</Separator>);
      expect(screen.getByText("Other")).toBeInTheDocument();
    });

    it("prefers the `label` prop over children when both are provided", () => {
      render(<Separator label="Win">Lose</Separator>);
      expect(screen.getByText("Win")).toBeInTheDocument();
      expect(screen.queryByText("Lose")).not.toBeInTheDocument();
    });

    it("ignores label when orientation='vertical' (renders plain line)", () => {
      const { container } = render(
        <Separator orientation="vertical" label="Section" />
      );
      const root = container.querySelector("[data-slot='separator']")!;
      expect(root).not.toHaveAttribute("data-with-label");
      expect(screen.queryByText("Section")).not.toBeInTheDocument();
      expect(root).toHaveClass("w-px");
    });

    it("uses role='none' on the labeled wrapper by default", () => {
      const { container } = render(<Separator label="Section" />);
      const root = container.querySelector("[data-slot='separator']")!;
      expect(root).toHaveAttribute("role", "none");
    });

    it("uses role='separator' on the labeled wrapper when decorative={false}", () => {
      const { container } = render(
        <Separator label="Section" decorative={false} />
      );
      const root = container.querySelector("[data-slot='separator']")!;
      expect(root).toHaveAttribute("role", "separator");
      expect(root).toHaveAttribute("aria-orientation", "horizontal");
    });

    it("merges a custom className on the labeled wrapper", () => {
      const { container } = render(
        <Separator label="Section" className="my-8" />
      );
      const root = container.querySelector("[data-slot='separator']")!;
      expect(root).toHaveClass("my-8");
      expect(root).toHaveClass("flex");
    });
  });

  describe("accessibility", () => {
    it("has no violations (plain horizontal)", async () => {
      const { container } = render(<Separator />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations (plain vertical)", async () => {
      const { container } = render(<Separator orientation="vertical" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations (with label)", async () => {
      const { container } = render(<Separator label="Section" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations (semantic separator with label)", async () => {
      const { container } = render(
        <Separator label="Section" decorative={false} />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
