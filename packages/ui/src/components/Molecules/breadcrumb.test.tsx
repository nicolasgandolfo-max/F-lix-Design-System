import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, it, expect } from "vitest";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";

function BasicTrail() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/library">Library</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Components</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

describe("Breadcrumb", () => {
  describe("rendering", () => {
    it("renders a <nav> with aria-label='breadcrumb' and data-slot", () => {
      render(<BasicTrail />);
      const nav = screen.getByRole("navigation", { name: /breadcrumb/i });
      expect(nav).toHaveAttribute("data-slot", "breadcrumb");
    });

    it("renders an <ol> list with the right data-slot", () => {
      const { container } = render(<BasicTrail />);
      const list = container.querySelector("ol[data-slot='breadcrumb-list']");
      expect(list).toBeInTheDocument();
    });

    it("renders all items, links, separators and the page", () => {
      const { container } = render(<BasicTrail />);
      expect(
        container.querySelectorAll("[data-slot='breadcrumb-item']")
      ).toHaveLength(3);
      expect(
        container.querySelectorAll("[data-slot='breadcrumb-link']")
      ).toHaveLength(2);
      expect(
        container.querySelectorAll("[data-slot='breadcrumb-separator']")
      ).toHaveLength(2);
      expect(
        container.querySelector("[data-slot='breadcrumb-page']")
      ).toBeInTheDocument();
    });
  });

  describe("BreadcrumbPage", () => {
    it("sets aria-current='page' on the active segment", () => {
      render(<BasicTrail />);
      const page = screen.getByText("Components");
      expect(page).toHaveAttribute("aria-current", "page");
    });

    it("is not focusable (aria-disabled='true', role='link')", () => {
      render(<BasicTrail />);
      const page = screen.getByText("Components");
      expect(page).toHaveAttribute("aria-disabled", "true");
      expect(page).toHaveAttribute("role", "link");
    });

    it("renders with the bold semibold style", () => {
      render(<BasicTrail />);
      const page = screen.getByText("Components");
      expect(page.className).toMatch(/font-semibold/);
      expect(page.className).toMatch(/text-foreground/);
    });
  });

  describe("BreadcrumbLink", () => {
    it("renders an <a> with the muted text-secondary style by default", () => {
      render(<BasicTrail />);
      const link = screen.getByRole("link", { name: "Home" });
      expect(link.tagName).toBe("A");
      expect(link.className).toMatch(/text-secondary/);
    });

    it("forwards through asChild via Radix Slot", () => {
      const { container } = render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <button type="button" data-testid="custom">
                  Custom
                </button>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
      const button = screen.getByTestId("custom");
      expect(button.tagName).toBe("BUTTON");
      expect(button).toHaveAttribute("data-slot", "breadcrumb-link");
      expect(
        container.querySelector("a[data-slot='breadcrumb-link']")
      ).not.toBeInTheDocument();
    });
  });

  describe("BreadcrumbSeparator", () => {
    it("is hidden from assistive tech and decorative by default", () => {
      const { container } = render(<BasicTrail />);
      const sep = container.querySelector("[data-slot='breadcrumb-separator']");
      expect(sep).toHaveAttribute("aria-hidden", "true");
      expect(sep).toHaveAttribute("role", "presentation");
    });

    it("renders a default caret-right icon", () => {
      const { container } = render(<BasicTrail />);
      const sep = container.querySelector("[data-slot='breadcrumb-separator']");
      expect(sep?.querySelector("svg")).toBeInTheDocument();
    });

    it("renders custom children when provided", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Page</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
      expect(screen.getByText("/")).toBeInTheDocument();
    });
  });

  describe("BreadcrumbEllipsis", () => {
    it("renders the default Spanish screen-reader label", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
      expect(screen.getByText("Más")).toBeInTheDocument();
    });

    it("lets consumers override the screen-reader label for i18n", () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis srLabel="More" />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
      expect(screen.getByText("More")).toBeInTheDocument();
      expect(screen.queryByText("Más")).not.toBeInTheDocument();
    });

    it("uses the muted pill background and is hidden from AT", () => {
      const { container } = render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
      const ellipsis = container.querySelector(
        "[data-slot='breadcrumb-ellipsis']"
      );
      expect(ellipsis).toHaveAttribute("aria-hidden", "true");
      expect(ellipsis?.className).toMatch(/bg-muted/);
    });
  });

  describe("a11y", () => {
    it("has no axe violations in a typical trail", async () => {
      const { container } = render(<BasicTrail />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no axe violations with an ellipsis", async () => {
      const { container } = render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Final</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
