import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, it, expect } from "vitest";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "./navigation-menu";

function BasicMenu({
  withDropdown = true,
  disableSecond = false,
}: {
  withDropdown?: boolean;
  disableSecond?: boolean;
}) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#products" active>
            Products
          </NavigationMenuLink>
        </NavigationMenuItem>
        {withDropdown ? (
          <NavigationMenuItem>
            <NavigationMenuTrigger disabled={disableSecond}>
              Solutions
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-2 p-2">
                <li>
                  <NavigationMenuLink href="#a">Solution A</NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="#b">Solution B</NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ) : null}
        <NavigationMenuItem>
          <NavigationMenuLink href="#about">About</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

describe("NavigationMenu", () => {
  describe("rendering", () => {
    it("renders the root, list and items with data-slot attributes", () => {
      const { container } = render(<BasicMenu />);

      expect(
        container.querySelector("[data-slot='navigation-menu']")
      ).toBeInTheDocument();
      expect(
        container.querySelector("[data-slot='navigation-menu-list']")
      ).toBeInTheDocument();
      expect(
        container.querySelectorAll("[data-slot='navigation-menu-item']").length
      ).toBeGreaterThanOrEqual(2);
      expect(
        container.querySelector("[data-slot='navigation-menu-trigger']")
      ).toBeInTheDocument();
    });

    it("renders the built-in viewport wrapper by default", () => {
      const { container } = render(<BasicMenu />);
      // Radix only renders the inner Viewport when there's open content,
      // but our wrapper is always present so the panel can portal in.
      expect(
        container.querySelector(
          "[data-slot='navigation-menu-viewport-wrapper']"
        )
      ).toBeInTheDocument();
    });

    it("does not render the viewport when viewport={false}", () => {
      const { container } = render(
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="#a">Item</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      );
      expect(
        container.querySelector(
          "[data-slot='navigation-menu-viewport-wrapper']"
        )
      ).not.toBeInTheDocument();
    });

    it("marks the active link via data-active (Radix Link.active)", () => {
      const { container } = render(<BasicMenu />);
      const active = container.querySelector(
        "[data-slot='navigation-menu-link'][data-active]"
      );
      expect(active).toBeInTheDocument();
      expect(active).toHaveTextContent("Products");
    });
  });

  describe("interaction", () => {
    it("opens the dropdown content when the trigger is clicked", async () => {
      const user = userEvent.setup();
      render(<BasicMenu />);

      // Content is not in the DOM until the trigger is activated.
      expect(
        document.querySelector("[data-slot='navigation-menu-content']")
      ).not.toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: "Solutions" }));

      await waitFor(() => {
        expect(
          document.querySelector("[data-slot='navigation-menu-content']")
        ).toBeInTheDocument();
      });
    });

    it("closes the dropdown when Escape is pressed", async () => {
      const user = userEvent.setup();
      render(<BasicMenu />);

      await user.click(screen.getByRole("button", { name: "Solutions" }));
      await waitFor(() => {
        expect(
          document.querySelector("[data-slot='navigation-menu-content']")
        ).toBeInTheDocument();
      });

      await user.keyboard("{Escape}");
      await waitFor(() => {
        expect(
          document.querySelector("[data-slot='navigation-menu-content']")
        ).not.toBeInTheDocument();
      });
    });

    it("does not open when the trigger is disabled", async () => {
      const user = userEvent.setup();
      render(<BasicMenu disableSecond />);

      const trigger = screen.getByRole("button", { name: "Solutions" });
      expect(trigger).toBeDisabled();

      await user.click(trigger);
      expect(
        document.querySelector("[data-slot='navigation-menu-content']")
      ).not.toBeInTheDocument();
    });
  });

  describe("a11y", () => {
    it("has no axe violations in default state", async () => {
      const { container } = render(<BasicMenu />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no axe violations without dropdowns", async () => {
      const { container } = render(<BasicMenu withDropdown={false} />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
