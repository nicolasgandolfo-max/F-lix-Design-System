import * as React from "react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, it, expect, vi } from "vitest";

import { Logo } from "./logo";

describe("Logo", () => {
  it("renders the logotype variant by default with the wordmark viewBox", () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector("[data-slot='logo']");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("data-type", "logotype");
    expect(svg).toHaveAttribute("viewBox", "0 0 218 78");
  });

  it("renders the symbol variant on the square viewBox", () => {
    const { container } = render(<Logo type="symbol" />);
    const svg = container.querySelector("[data-slot='logo']");
    expect(svg).toHaveAttribute("data-type", "symbol");
    expect(svg).toHaveAttribute("viewBox", "0 0 78 78");
  });

  it("renders the symbol-circular variant including the brand teal background circle", () => {
    const { container } = render(<Logo type="symbol-circular" />);
    const svg = container.querySelector("[data-slot='logo']");
    expect(svg).toHaveAttribute("data-type", "symbol-circular");
    expect(svg).toHaveAttribute("viewBox", "0 0 78 78");
    // The first <path> in this variant is the brand teal circle backdrop —
    // intentionally a literal hex (not a theme token) per Felix brand spec.
    const tealPath = svg?.querySelector("path[fill='#2BF2F1']");
    expect(tealPath).toBeInTheDocument();
  });

  it("uses currentColor for the foreground paths so consumers can theme via text color", () => {
    const { container } = render(<Logo type="symbol" />);
    const svg = container.querySelector("[data-slot='logo']");
    const fgPaths = svg?.querySelectorAll("path[fill='currentColor']");
    expect(fgPaths?.length).toBeGreaterThan(0);
  });

  it("when title is provided, renders <title> + role='img' + aria-labelledby", () => {
    const { container } = render(<Logo title="Felix" />);
    const svg = container.querySelector("[data-slot='logo']") as SVGSVGElement;
    expect(svg).toHaveAttribute("role", "img");
    expect(svg).not.toHaveAttribute("aria-hidden");

    const titleEl = svg.querySelector("title");
    expect(titleEl).toBeInTheDocument();
    expect(titleEl).toHaveTextContent("Felix");

    const labelledBy = svg.getAttribute("aria-labelledby");
    expect(labelledBy).toBeTruthy();
    expect(titleEl).toHaveAttribute("id", labelledBy!);
    expect(screen.getByRole("img", { name: "Felix" })).toBeInTheDocument();
  });

  it("when title is omitted, marks the SVG decorative (aria-hidden + role=presentation)", () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector("[data-slot='logo']");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("role", "presentation");
    expect(svg?.querySelector("title")).toBeNull();
  });

  it("keeps the default text-foreground when no text color is overridden", () => {
    const { container } = render(<Logo className="size-12" />);
    const svg = container.querySelector("[data-slot='logo']");
    expect(svg).toHaveClass("text-foreground");
    expect(svg).toHaveClass("size-12");
  });

  it("lets a consumer-provided text color override the default via tailwind-merge", () => {
    const { container } = render(<Logo className="text-interactive-primary" />);
    const svg = container.querySelector("[data-slot='logo']");
    // tailwind-merge inside `cn()` intentionally drops the conflicting
    // `text-foreground` so the consumer's color wins.
    expect(svg).not.toHaveClass("text-foreground");
    expect(svg).toHaveClass("text-interactive-primary");
  });

  it("forwards arbitrary SVG props (data-testid, onClick) to the root <svg>", () => {
    const handler = vi.fn();
    const { container } = render(
      <Logo data-testid="brand" onClick={handler} type="symbol" />
    );
    const svg = container.querySelector(
      "[data-testid='brand']"
    ) as SVGSVGElement;
    expect(svg).toBeInTheDocument();
    svg.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("forwards ref to the underlying <svg> element", () => {
    const ref = React.createRef<SVGSVGElement>();
    render(<Logo ref={ref} />);
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
    expect(ref.current).toHaveAttribute("data-slot", "logo");
  });

  describe("accessibility", () => {
    it("has no a11y violations when labeled", async () => {
      const { container } = render(<Logo title="Felix" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no a11y violations when decorative", async () => {
      const { container } = render(<Logo />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no a11y violations across all variants", async () => {
      const { container } = render(
        <div>
          <Logo type="logotype" title="Felix logotype" />
          <Logo type="symbol" title="Felix symbol" />
          <Logo type="symbol-circular" title="Felix circular symbol" />
        </div>
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
