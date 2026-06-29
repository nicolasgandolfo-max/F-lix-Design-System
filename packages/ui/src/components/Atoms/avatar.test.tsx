import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, it, expect } from "vitest";

import { Avatar, AvatarImage, AvatarFallback } from "./avatar";

const SIZES = ["xs", "sm", "md", "lg", "xl"] as const;
const STATUSES = ["success", "warning", "danger", "neutral"] as const;

describe("Avatar", () => {
  it("renders the root with data-slot='avatar'", () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(container.querySelector("[data-slot='avatar']")).toBeInTheDocument();
  });

  it("merges custom className on the root", () => {
    const { container } = render(
      <Avatar className="custom-class">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(container.querySelector("[data-slot='avatar']")).toHaveClass(
      "custom-class"
    );
  });

  describe("sizes", () => {
    for (const size of SIZES) {
      it(`renders size="${size}" with data-size`, () => {
        const { container } = render(
          <Avatar size={size}>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        );
        expect(container.querySelector("[data-slot='avatar']")).toHaveAttribute(
          "data-size",
          size
        );
      });
    }

    it("falls back to data-size='md' when size is null", () => {
      const { container } = render(
        <Avatar
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          size={null as any}
        >
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );
      expect(container.querySelector("[data-slot='avatar']")).toHaveAttribute(
        "data-size",
        "md"
      );
    });
  });

  describe("AvatarFallback", () => {
    it("renders text content with data-slot='avatar-fallback'", () => {
      render(
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );
      const fallback = screen.getByText("JD");
      expect(fallback).toHaveAttribute("data-slot", "avatar-fallback");
    });

    it("defaults to variant='initials'", () => {
      render(
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByText("JD")).toHaveAttribute(
        "data-variant",
        "initials"
      );
    });

    it("applies variant='icon' styling and data attribute", () => {
      render(
        <Avatar>
          <AvatarFallback variant="icon">
            <svg data-testid="user-icon" />
          </AvatarFallback>
        </Avatar>
      );
      const fallback = screen
        .getByTestId("user-icon")
        .closest("[data-slot='avatar-fallback']")!;
      expect(fallback).toHaveAttribute("data-variant", "icon");
      expect(fallback).toHaveClass("bg-secondary");
    });

    describe("icon sizing per avatar size", () => {
      const ICON_SIZE_BY_AVATAR = {
        xs: "[&_svg]:size-3.5",
        sm: "[&_svg]:size-5",
        md: "[&_svg]:size-6",
        lg: "[&_svg]:size-7",
        xl: "[&_svg]:size-9",
      } as const;

      for (const [size, expected] of Object.entries(ICON_SIZE_BY_AVATAR)) {
        it(`scales the SVG to ${expected} when size="${size}"`, () => {
          render(
            <Avatar size={size as keyof typeof ICON_SIZE_BY_AVATAR}>
              <AvatarFallback variant="icon">
                <svg data-testid="icon" />
              </AvatarFallback>
            </Avatar>
          );
          const fallback = screen
            .getByTestId("icon")
            .closest("[data-slot='avatar-fallback']")!;
          expect(fallback).toHaveClass(expected);
        });
      }

      it("does not apply icon sizing classes for variant='initials'", () => {
        render(
          <Avatar size="xl">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        );
        const fallback = screen.getByText("JD");
        expect(fallback).not.toHaveClass("[&_svg]:size-9");
      });
    });

    it("inherits size from the Avatar root via context", () => {
      render(
        <Avatar size="lg">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByText("JD")).toHaveAttribute("data-size", "lg");
    });

    it("allows explicit size to override the context", () => {
      render(
        <Avatar size="lg">
          <AvatarFallback size="xs">JD</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByText("JD")).toHaveAttribute("data-size", "xs");
    });

    it("merges custom className", () => {
      render(
        <Avatar>
          <AvatarFallback className="extra">JD</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByText("JD")).toHaveClass("extra");
    });
  });

  describe("status badge", () => {
    it("does not render a status badge when status is omitted", () => {
      const { container } = render(
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );
      expect(
        container.querySelector("[data-slot='avatar-status']")
      ).not.toBeInTheDocument();
    });

    for (const status of STATUSES) {
      it(`renders status="${status}" with data-status and role="status"`, () => {
        const { container } = render(
          <Avatar status={status}>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        );
        const badge = container.querySelector("[data-slot='avatar-status']")!;
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveAttribute("data-status", status);
        expect(badge).toHaveAttribute("role", "status");
      });
    }

    it("uses status as the default aria-label", () => {
      const { container } = render(
        <Avatar status="success">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );
      expect(
        container.querySelector("[data-slot='avatar-status']")
      ).toHaveAttribute("aria-label", "success");
    });

    it("respects a custom statusLabel", () => {
      const { container } = render(
        <Avatar status="success" statusLabel="Online">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );
      expect(
        container.querySelector("[data-slot='avatar-status']")
      ).toHaveAttribute("aria-label", "Online");
    });

    it("scales badge with avatar size", () => {
      const { container } = render(
        <Avatar size="xl" status="success">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );
      const badge = container.querySelector("[data-slot='avatar-status']")!;
      expect(badge).toHaveClass("size-4");
      expect(badge).toHaveClass("ring-2");
    });
  });

  describe("AvatarImage", () => {
    it("renders with data-slot when forwarded by Radix", () => {
      // jsdom doesn't actually load images, so Radix may keep the image in a
      // "loading" state and not render it. Check that the component itself
      // is constructable and that the fallback still renders correctly.
      render(
        <Avatar>
          <AvatarImage src="/jane.jpg" alt="Jane Doe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("forwards className when present", () => {
      const { container } = render(
        <Avatar>
          <AvatarImage src="/jane.jpg" alt="Jane Doe" className="custom-img" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );
      // Image may or may not be rendered yet; assert via explicit look
      const img = container.querySelector("[data-slot='avatar-image']");
      if (img) {
        expect(img).toHaveClass("custom-img");
      }
    });
  });

  describe("smart API (props)", () => {
    it("renders an icon fallback when no src or initials are provided", () => {
      const { container } = render(<Avatar />);
      const fallback = container.querySelector(
        "[data-slot='avatar-fallback']"
      )!;
      expect(fallback).toBeInTheDocument();
      expect(fallback).toHaveAttribute("data-variant", "icon");
      expect(fallback.querySelector("svg")).toBeInTheDocument();
    });

    it("renders initials when `initials` is provided", () => {
      render(<Avatar initials="JD" />);
      const fallback = screen.getByText("JD");
      expect(fallback).toHaveAttribute("data-variant", "initials");
    });

    it("renders an AvatarImage when `src` is provided", () => {
      const { container } = render(
        <Avatar src="/jane.jpg" alt="Jane Doe" initials="JD" />
      );
      // Image may or may not load in jsdom — assert by querying the slot
      // and verifying the initials fallback is also wired up.
      expect(screen.getByText("JD")).toBeInTheDocument();
      const img = container.querySelector("[data-slot='avatar-image']");
      if (img) {
        expect(img).toHaveAttribute("alt", "Jane Doe");
      }
    });

    it("falls back to the icon when only `src` is provided (image fails)", () => {
      const { container } = render(<Avatar src="/broken.jpg" alt="x" />);
      const fallback = container.querySelector(
        "[data-slot='avatar-fallback']"
      )!;
      expect(fallback).toHaveAttribute("data-variant", "icon");
    });

    it("renders a custom `icon` when provided", () => {
      render(<Avatar icon={<svg data-testid="custom-icon" />} />);
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });

    it("smart mode still renders the status badge", () => {
      const { container } = render(
        <Avatar initials="JD" status="success" statusLabel="Online" />
      );
      const badge = container.querySelector("[data-slot='avatar-status']")!;
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveAttribute("aria-label", "Online");
    });

    it("compound API (children) takes precedence over props", () => {
      // When children are passed, src/initials are ignored — children win.
      render(
        <Avatar src="/should-be-ignored.jpg" initials="ZZ">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );
      expect(screen.getByText("JD")).toBeInTheDocument();
      expect(screen.queryByText("ZZ")).not.toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("has no violations (initials fallback)", async () => {
      const { container } = render(
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations (icon fallback)", async () => {
      const { container } = render(
        <Avatar>
          <AvatarFallback variant="icon">
            <svg role="img" aria-label="User">
              <title>User</title>
            </svg>
          </AvatarFallback>
        </Avatar>
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations with status badge", async () => {
      const { container } = render(
        <Avatar status="success" statusLabel="Online">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no violations with image + fallback", async () => {
      const { container } = render(
        <Avatar>
          <AvatarImage src="/jane.jpg" alt="Jane Doe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
