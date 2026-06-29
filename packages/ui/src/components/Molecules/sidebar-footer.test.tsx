import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, it, expect } from "vitest";

import { Avatar } from "../Atoms/avatar";
import { SidebarFooter } from "./sidebar-footer";

describe("SidebarFooter", () => {
  describe("rendering", () => {
    it("renders the name and email slots", () => {
      render(<SidebarFooter name="Felix User" email="user@felixpago.com" />);
      expect(screen.getByText("Felix User")).toBeInTheDocument();
      expect(screen.getByText("user@felixpago.com")).toBeInTheDocument();
    });

    it("omits the email slot when not provided", () => {
      const { container } = render(<SidebarFooter name="Solo" />);
      expect(
        container.querySelector("[data-slot='sidebar-footer-email']")
      ).not.toBeInTheDocument();
    });

    it("renders the avatar slot when provided", () => {
      const { container } = render(
        <SidebarFooter
          name="Felix User"
          avatar={<Avatar size="sm" initials="F" status="success" />}
        />
      );
      expect(
        container.querySelector("[data-slot='sidebar-footer-avatar']")
      ).toBeInTheDocument();
      expect(
        container.querySelector("[data-slot='avatar']")
      ).toBeInTheDocument();
    });

    it("renders a trailing slot when provided", () => {
      render(
        <SidebarFooter
          name="Felix User"
          trailing={<button type="button">More</button>}
        />
      );
      expect(screen.getByRole("button", { name: "More" })).toBeInTheDocument();
    });

    it("merges custom className on the root", () => {
      const { container } = render(
        <SidebarFooter className="custom" name="Felix User" />
      );
      expect(
        container.querySelector("[data-slot='sidebar-footer']")
      ).toHaveClass("custom");
    });
  });

  describe("a11y", () => {
    it("has no axe violations with name + email + avatar", async () => {
      const { container } = render(
        <SidebarFooter
          name="Felix User"
          email="user@felixpago.com"
          avatar={
            <Avatar
              size="sm"
              initials="F"
              status="success"
              statusLabel="Online"
            />
          }
        />
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
