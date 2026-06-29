import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, it, expect, vi } from "vitest";
import { CircleIcon } from "@phosphor-icons/react";

import { Avatar } from "../Atoms/avatar";
import { SidebarFooter } from "../Molecules/sidebar-footer";
import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarNavItem,
  SidebarSection,
  SidebarSectionTitle,
} from "./sidebar";

function FullSidebar({
  activeHref = "/payments",
  disabledHref,
}: {
  activeHref?: string;
  disabledHref?: string;
}) {
  return (
    <Sidebar className="h-[480px] w-[220px]">
      <SidebarHeader>
        <span data-testid="logo">Logo</span>
      </SidebarHeader>
      <SidebarBody>
        <SidebarSection title="Main">
          <SidebarNavItem
            href="/payments"
            icon={<CircleIcon weight="regular" />}
            active={activeHref === "/payments"}
          >
            Payments
          </SidebarNavItem>
          <SidebarNavItem
            href="/cards"
            icon={<CircleIcon weight="regular" />}
            active={activeHref === "/cards"}
            disabled={disabledHref === "/cards"}
          >
            Cards
          </SidebarNavItem>
        </SidebarSection>
      </SidebarBody>
      <SidebarFooter
        name="Felix User"
        email="user@felixpago.com"
        avatar={<Avatar size="sm" initials="F" status="success" />}
      />
    </Sidebar>
  );
}

describe("Sidebar", () => {
  describe("rendering", () => {
    it("renders all primary slots with the right data-slot", () => {
      const { container } = render(<FullSidebar />);

      expect(
        container.querySelector("[data-slot='sidebar']")
      ).toBeInTheDocument();
      expect(
        container.querySelector("[data-slot='sidebar-header']")
      ).toBeInTheDocument();
      expect(
        container.querySelector("[data-slot='sidebar-body']")
      ).toBeInTheDocument();
      expect(
        container.querySelector("[data-slot='sidebar-section']")
      ).toBeInTheDocument();
      expect(
        container.querySelector("[data-slot='sidebar-section-title']")
      ).toBeInTheDocument();
      expect(
        container.querySelectorAll("[data-slot='sidebar-nav-item']").length
      ).toBe(2);
      expect(
        container.querySelector("[data-slot='sidebar-footer']")
      ).toBeInTheDocument();
    });

    it("renders the section title text from the `title` prop", () => {
      render(<FullSidebar />);
      expect(screen.getByText("Main")).toBeInTheDocument();
    });

    it("renders an `<aside>` by default", () => {
      const { container } = render(
        <Sidebar>
          <SidebarBody>body</SidebarBody>
        </Sidebar>
      );
      expect(container.querySelector("aside")).toBeInTheDocument();
    });

    it("respects the `as` prop", () => {
      const { container } = render(
        <Sidebar as="nav" aria-label="Primary">
          <SidebarBody>body</SidebarBody>
        </Sidebar>
      );
      expect(container.querySelector("nav")).toBeInTheDocument();
    });

    it("renders the leading icon when provided", () => {
      const { container } = render(
        <SidebarNavItem href="/x" icon={<svg data-testid="leading-icon" />}>
          Item
        </SidebarNavItem>
      );
      expect(
        container.querySelector("[data-slot='sidebar-nav-item-icon']")
      ).toBeInTheDocument();
    });
  });

  describe("active state", () => {
    it("sets aria-current='page' on the active item", () => {
      render(<FullSidebar activeHref="/payments" />);
      const active = screen.getByRole("link", { name: /payments/i });
      expect(active).toHaveAttribute("aria-current", "page");
    });

    it("does not set aria-current on inactive items", () => {
      render(<FullSidebar activeHref="/payments" />);
      const inactive = screen.getByRole("link", { name: /cards/i });
      expect(inactive).not.toHaveAttribute("aria-current");
    });
  });

  describe("disabled state", () => {
    it("marks anchors with aria-disabled and the disabled tailwind classes", () => {
      render(
        <SidebarNavItem href="/x" disabled>
          Item
        </SidebarNavItem>
      );
      const link = screen.getByRole("link", { name: "Item" });
      expect(link).toHaveAttribute("aria-disabled", "true");
      // The runtime visual suppression (pointer-events:none + muted text) is
      // applied via Tailwind aria-disabled variants. We assert the classes are
      // emitted so a CSS regression would fail the test.
      expect(link.className).toMatch(/aria-disabled:pointer-events-none/);
    });

    it("sets the native `disabled` attribute on buttons", () => {
      render(
        <SidebarNavItem as="button" disabled>
          Item
        </SidebarNavItem>
      );
      const btn = screen.getByRole("button", { name: "Item" });
      expect(btn).toBeDisabled();
    });

    it("does not fire onClick on a disabled button", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <SidebarNavItem as="button" disabled onClick={onClick}>
          Item
        </SidebarNavItem>
      );
      await user.click(screen.getByRole("button", { name: "Item" }));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("polymorphism", () => {
    it("renders an `<a>` by default and a `<button>` with as='button'", () => {
      const { rerender, container } = render(
        <SidebarNavItem href="/x">Anchor</SidebarNavItem>
      );
      expect(container.querySelector("a")).toBeInTheDocument();
      expect(container.querySelector("button")).not.toBeInTheDocument();

      rerender(<SidebarNavItem as="button">Button</SidebarNavItem>);
      expect(container.querySelector("button")).toBeInTheDocument();
    });

    it("forwards through asChild via Radix Slot", () => {
      const { container } = render(
        <SidebarNavItem asChild active>
          <a href="/custom" data-testid="custom-link">
            <span data-testid="custom-content">Payments</span>
          </a>
        </SidebarNavItem>
      );
      const link = screen.getByTestId("custom-link");
      expect(link).toHaveAttribute("aria-current", "page");
      expect(link).toHaveAttribute("data-slot", "sidebar-nav-item");
      // Consumer-supplied content is preserved.
      expect(
        container.querySelector('[data-testid="custom-content"]')
      ).toBeInTheDocument();
    });
  });

  describe("a11y", () => {
    it("has no axe violations in the full assembled sidebar", async () => {
      const { container } = render(<FullSidebar />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no axe violations with a disabled item", async () => {
      const { container } = render(
        <FullSidebar activeHref="/payments" disabledHref="/cards" />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});

describe("SidebarSectionTitle", () => {
  it("renders the muted token text style", () => {
    const { container } = render(
      <SidebarSectionTitle>Section</SidebarSectionTitle>
    );
    const node = container.querySelector("[data-slot='sidebar-section-title']");
    expect(node).toBeInTheDocument();
    expect(node).toHaveClass("text-muted-foreground");
  });
});
