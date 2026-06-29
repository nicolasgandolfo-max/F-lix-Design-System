import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, it, expect, vi } from "vitest";
import { ChoiceCard, ChoiceCardGroup, ChoiceCardLink } from "./choice-card";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function renderGroup(
  props?: Partial<React.ComponentProps<typeof ChoiceCardGroup>>
) {
  return render(
    <ChoiceCardGroup {...props}>
      <ChoiceCard value="a" title="Option A" description="Desc A" />
      <ChoiceCard value="b" title="Option B" description="Desc B" />
      <ChoiceCard value="c" title="Option C" description="Desc C" disabled />
    </ChoiceCardGroup>
  );
}

// ─── ChoiceCardGroup ──────────────────────────────────────────────────────────

describe("ChoiceCardGroup", () => {
  it("renders a radiogroup role", () => {
    renderGroup();
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });

  it("renders all child radio buttons", () => {
    renderGroup();
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(3);
  });

  it("applies data-slot attribute", () => {
    renderGroup();
    expect(screen.getByRole("radiogroup")).toHaveAttribute(
      "data-slot",
      "choice-card-group"
    );
  });
});

// ─── ChoiceCard ───────────────────────────────────────────────────────────────

describe("ChoiceCard", () => {
  it("renders title text", () => {
    renderGroup();
    expect(screen.getByText("Option A")).toBeInTheDocument();
  });

  it("renders description text", () => {
    renderGroup();
    expect(screen.getByText("Desc A")).toBeInTheDocument();
  });

  it("is unchecked by default", () => {
    renderGroup();
    const radio = screen.getByRole("radio", { name: /option a/i });
    expect(radio).not.toBeChecked();
  });

  it("becomes checked when clicked", async () => {
    renderGroup();
    const radio = screen.getByRole("radio", { name: /option a/i });
    await userEvent.click(radio);
    expect(radio).toBeChecked();
  });

  it("reflects a controlled value", () => {
    renderGroup({ value: "b" });
    expect(screen.getByRole("radio", { name: /option b/i })).toBeChecked();
    expect(screen.getByRole("radio", { name: /option a/i })).not.toBeChecked();
  });

  it("calls onValueChange with the selected value", async () => {
    const onValueChange = vi.fn();
    renderGroup({ onValueChange });
    await userEvent.click(screen.getByRole("radio", { name: /option a/i }));
    expect(onValueChange).toHaveBeenCalledOnce();
    expect(onValueChange).toHaveBeenCalledWith("a");
  });

  it("only allows one selection at a time", async () => {
    renderGroup();
    await userEvent.click(screen.getByRole("radio", { name: /option a/i }));
    await userEvent.click(screen.getByRole("radio", { name: /option b/i }));
    expect(screen.getByRole("radio", { name: /option a/i })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: /option b/i })).toBeChecked();
  });

  it("disabled card is not interactive", async () => {
    const onValueChange = vi.fn();
    renderGroup({ onValueChange });
    const disabledRadio = screen.getByRole("radio", { name: /option c/i });
    expect(disabledRadio).toBeDisabled();
    await userEvent.click(disabledRadio);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("applies data-slot and data-variant attributes", () => {
    render(
      <ChoiceCardGroup>
        <ChoiceCard value="x" title="X" variant="white" />
        <ChoiceCard value="y" title="Y" variant="primary" />
      </ChoiceCardGroup>
    );
    const [cardX, cardY] = screen.getAllByRole("radio");
    expect(cardX).toHaveAttribute("data-slot", "choice-card");
    expect(cardX).toHaveAttribute("data-variant", "white");
    expect(cardY).toHaveAttribute("data-variant", "primary");
  });

  it("group-level disabled disables all cards", () => {
    renderGroup({ disabled: true });
    const radios = screen.getAllByRole("radio");
    radios.forEach((r) => expect(r).toBeDisabled());
  });

  it("renders icon when provided", () => {
    render(
      <ChoiceCardGroup>
        <ChoiceCard value="a" title="A" icon={<span data-testid="icon" />} />
      </ChoiceCardGroup>
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders icon inside a disabled primary card", () => {
    render(
      <ChoiceCardGroup>
        <ChoiceCard
          value="a"
          title="A"
          variant="primary"
          icon={<span data-testid="primary-icon" />}
          disabled
        />
      </ChoiceCardGroup>
    );
    const icon = screen.getByTestId("primary-icon");
    expect(icon).toBeInTheDocument();
    expect(screen.getByRole("radio")).toBeDisabled();
  });
});

describe("ChoiceCard — keyboard navigation", () => {
  it("cards are focusable via the DOM", () => {
    renderGroup();
    const radioA = screen.getByRole("radio", { name: /option a/i });
    radioA.focus();
    expect(document.activeElement).toBe(radioA);
  });

  it("radiogroup has correct aria structure for keyboard access", () => {
    renderGroup();
    const group = screen.getByRole("radiogroup");
    const radios = screen.getAllByRole("radio");
    radios.forEach((r) => expect(group).toContainElement(r));
  });
});

describe("ChoiceCard — size variant", () => {
  it("defaults to data-size='sm'", () => {
    render(
      <ChoiceCardGroup>
        <ChoiceCard value="a" title="A" />
      </ChoiceCardGroup>
    );
    expect(screen.getByRole("radio")).toHaveAttribute("data-size", "sm");
  });

  it("applies data-size='md' when set", () => {
    render(
      <ChoiceCardGroup>
        <ChoiceCard value="a" title="A" size="md" />
      </ChoiceCardGroup>
    );
    expect(screen.getByRole("radio")).toHaveAttribute("data-size", "md");
  });

  it("renders icon inside an md card", () => {
    render(
      <ChoiceCardGroup>
        <ChoiceCard
          value="a"
          title="A"
          size="md"
          icon={<span data-testid="md-icon" />}
        />
      </ChoiceCardGroup>
    );
    expect(screen.getByTestId("md-icon")).toBeInTheDocument();
  });
});

describe("ChoiceCard — accessibility", () => {
  it("has no axe violations (white variant)", async () => {
    const { container } = renderGroup();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations (primary variant)", async () => {
    const { container } = render(
      <ChoiceCardGroup>
        <ChoiceCard
          value="a"
          title="Option A"
          description="Desc A"
          variant="primary"
        />
        <ChoiceCard
          value="b"
          title="Option B"
          description="Desc B"
          variant="primary"
        />
      </ChoiceCardGroup>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations when a value is selected", async () => {
    const { container } = renderGroup({ value: "a" });
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations (md × white)", async () => {
    const { container } = render(
      <ChoiceCardGroup>
        <ChoiceCard value="a" title="Option A" description="Desc A" size="md" />
        <ChoiceCard value="b" title="Option B" description="Desc B" size="md" />
      </ChoiceCardGroup>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations (md × primary)", async () => {
    const { container } = render(
      <ChoiceCardGroup value="a">
        <ChoiceCard
          value="a"
          title="Option A"
          description="Desc A"
          size="md"
          variant="primary"
        />
        <ChoiceCard
          value="b"
          title="Option B"
          description="Desc B"
          size="md"
          variant="primary"
        />
      </ChoiceCardGroup>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

// ─── ChoiceCardLink ───────────────────────────────────────────────────────────

describe("ChoiceCardLink", () => {
  it("renders as an <a> element by default", () => {
    render(
      <ChoiceCardLink href="/checkout" title="Checkout" description="Pay now" />
    );
    const link = screen.getByRole("link", { name: /checkout/i });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/checkout");
  });

  it("renders title and description", () => {
    render(
      <ChoiceCardLink
        href="/x"
        title="Credit card"
        description="Visa & Mastercard"
      />
    );
    expect(screen.getByText("Credit card")).toBeInTheDocument();
    expect(screen.getByText("Visa & Mastercard")).toBeInTheDocument();
  });

  it("renders icon when provided", () => {
    render(
      <ChoiceCardLink
        href="/x"
        title="Bank"
        icon={<span data-testid="nav-icon" />}
      />
    );
    expect(screen.getByTestId("nav-icon")).toBeInTheDocument();
  });

  it("applies data-slot, data-variant, and data-state attributes", () => {
    render(
      <ChoiceCardLink
        href="/x"
        title="Default"
        variant="white"
        data-testid="link"
      />
    );
    const link = screen.getByTestId("link");
    expect(link).toHaveAttribute("data-slot", "choice-card-link");
    expect(link).toHaveAttribute("data-variant", "white");
    expect(link).toHaveAttribute("data-state", "unchecked");
  });

  it("sets data-state='checked' when selected", () => {
    render(
      <ChoiceCardLink
        href="/x"
        title="Active route"
        selected
        data-testid="link"
      />
    );
    expect(screen.getByTestId("link")).toHaveAttribute("data-state", "checked");
  });

  it("forwards arbitrary anchor props like onClick", async () => {
    const onClick = vi.fn();
    render(<ChoiceCardLink href="#test" title="Click me" onClick={onClick} />);
    await userEvent.click(screen.getByRole("link", { name: /click me/i }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  describe("when disabled", () => {
    it("applies aria-disabled and data-disabled", () => {
      render(
        <ChoiceCardLink
          href="/x"
          title="Unavailable"
          disabled
          data-testid="link"
        />
      );
      const link = screen.getByTestId("link");
      expect(link).toHaveAttribute("aria-disabled", "true");
      expect(link).toHaveAttribute("data-disabled", "");
    });

    it("is removed from the tab order", () => {
      render(
        <ChoiceCardLink
          href="/x"
          title="Unavailable"
          disabled
          data-testid="link"
        />
      );
      expect(screen.getByTestId("link")).toHaveAttribute("tabindex", "-1");
    });

    it("suppresses click navigation via pointer-events-none class", () => {
      render(
        <ChoiceCardLink
          href="/x"
          title="Unavailable"
          disabled
          data-testid="link"
        />
      );
      expect(screen.getByTestId("link").className).toMatch(
        /pointer-events-none/
      );
    });
  });

  describe("asChild", () => {
    it("renders the slotted child element as the root", () => {
      render(
        <ChoiceCardLink asChild title="Next" description="Next page">
          <a href="/next" data-testid="slotted" data-custom="x">
            ignored
          </a>
        </ChoiceCardLink>
      );
      const slotted = screen.getByTestId("slotted");
      expect(slotted.tagName).toBe("A");
      expect(slotted).toHaveAttribute("href", "/next");
      expect(slotted).toHaveAttribute("data-custom", "x");
    });

    it("merges data-slot and data-state onto the slotted element", () => {
      render(
        <ChoiceCardLink asChild selected title="Active">
          <a href="/a" data-testid="slotted">
            ignored
          </a>
        </ChoiceCardLink>
      );
      const slotted = screen.getByTestId("slotted");
      expect(slotted).toHaveAttribute("data-slot", "choice-card-link");
      expect(slotted).toHaveAttribute("data-state", "checked");
    });

    it("injects title, description, and icon into the slotted element", () => {
      render(
        <ChoiceCardLink
          asChild
          title="Shipping"
          description="Express"
          icon={<span data-testid="inner-icon" />}
        >
          <a href="/ship" data-testid="slotted">
            ignored
          </a>
        </ChoiceCardLink>
      );
      const slotted = screen.getByTestId("slotted");
      expect(slotted).toContainElement(screen.getByTestId("inner-icon"));
      expect(slotted).toHaveTextContent("Shipping");
      expect(slotted).toHaveTextContent("Express");
    });

    it("works with a forwardRef custom Link component", () => {
      const CustomLink = React.forwardRef<
        HTMLAnchorElement,
        React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }
      >(({ to, children, ...rest }, ref) => (
        <a ref={ref} href={to} data-testid="custom-link" {...rest}>
          {children}
        </a>
      ));
      CustomLink.displayName = "CustomLink";

      render(
        <ChoiceCardLink asChild title="Custom" description="Routed">
          <CustomLink to="/routed" />
        </ChoiceCardLink>
      );
      const link = screen.getByTestId("custom-link");
      expect(link).toHaveAttribute("href", "/routed");
      expect(link).toHaveTextContent("Custom");
    });
  });

  describe("size variant", () => {
    it("defaults to data-size='sm'", () => {
      render(
        <ChoiceCardLink href="/x" title="Default size" data-testid="link" />
      );
      expect(screen.getByTestId("link")).toHaveAttribute("data-size", "sm");
    });

    it("applies data-size='md' when set", () => {
      render(
        <ChoiceCardLink href="/x" title="Bigger" size="md" data-testid="link" />
      );
      expect(screen.getByTestId("link")).toHaveAttribute("data-size", "md");
    });

    it("forwards size through asChild slotted element", () => {
      render(
        <ChoiceCardLink asChild size="md" title="Routed">
          <a href="/routed" data-testid="slotted">
            ignored
          </a>
        </ChoiceCardLink>
      );
      expect(screen.getByTestId("slotted")).toHaveAttribute("data-size", "md");
    });
  });

  describe("accessibility", () => {
    it("has no axe violations (default)", async () => {
      const { container } = render(
        <nav aria-label="Test nav">
          <ChoiceCardLink
            href="/a"
            title="Credit card"
            description="Pay with card"
          />
          <ChoiceCardLink
            href="/b"
            title="Bank"
            description="Direct debit"
            selected
          />
        </nav>
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no axe violations (primary + disabled)", async () => {
      const { container } = render(
        <nav aria-label="Test nav">
          <ChoiceCardLink
            href="/a"
            variant="primary"
            title="Express"
            description="Next day"
          />
          <ChoiceCardLink
            href="/b"
            variant="primary"
            title="Unavailable"
            description="Sold out"
            disabled
          />
        </nav>
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no axe violations (md × white)", async () => {
      const { container } = render(
        <nav aria-label="Test nav">
          <ChoiceCardLink
            href="/a"
            size="md"
            title="Credit card"
            description="Pay with card"
          />
          <ChoiceCardLink
            href="/b"
            size="md"
            title="Bank"
            description="Direct debit"
            selected
          />
        </nav>
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it("has no axe violations (md × primary)", async () => {
      const { container } = render(
        <nav aria-label="Test nav">
          <ChoiceCardLink
            href="/a"
            size="md"
            variant="primary"
            title="Express"
            description="Next day"
          />
          <ChoiceCardLink
            href="/b"
            size="md"
            variant="primary"
            title="Insured"
            description="Tracked"
            selected
          />
        </nav>
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});

// ─── Badge slot ───────────────────────────────────────────────────────────────

describe("ChoiceCard badge slot", () => {
  it("renders no badge by default", () => {
    const { container } = render(
      <ChoiceCardGroup>
        <ChoiceCard value="a" title="Option A" />
      </ChoiceCardGroup>
    );
    expect(
      container.querySelector('[data-slot="choice-card-badge"]')
    ).toBeNull();
  });

  it("renders a badge when `badge` prop is provided", () => {
    const { container } = render(
      <ChoiceCardGroup>
        <ChoiceCard value="a" title="Option A" badge="Faster" />
      </ChoiceCardGroup>
    );
    expect(screen.getByText("Faster")).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="choice-card-badge"]')
    ).not.toBeNull();
  });

  it("auto-picks the `secondary` badge variant on white cards (lime pill)", () => {
    const { container } = render(
      <ChoiceCardGroup>
        <ChoiceCard value="a" title="Option A" badge="Faster" />
      </ChoiceCardGroup>
    );
    const badge = container.querySelector('[data-slot="choice-card-badge"]');
    expect(badge).toHaveAttribute("data-variant", "secondary");
    expect(badge).toHaveClass("bg-accent");
  });

  it("auto-picks the `link` badge variant on primary cards (beige pill, turquoise text)", () => {
    const { container } = render(
      <ChoiceCardGroup>
        <ChoiceCard
          value="a"
          title="Option A"
          badge="Label"
          variant="primary"
        />
      </ChoiceCardGroup>
    );
    const badge = container.querySelector('[data-slot="choice-card-badge"]');
    expect(badge).toHaveAttribute("data-variant", "link");
    expect(badge).toHaveClass("bg-background");
    expect(badge).toHaveClass("text-primary");
  });

  it("honors an explicit `badgeVariant` override", () => {
    const { container } = render(
      <ChoiceCardGroup>
        <ChoiceCard
          value="a"
          title="Option A"
          badge="Label"
          variant="white"
          badgeVariant="link"
        />
      </ChoiceCardGroup>
    );
    const badge = container.querySelector('[data-slot="choice-card-badge"]');
    expect(badge).toHaveAttribute("data-variant", "link");
    expect(badge).toHaveClass("bg-background");
  });

  it("propagates through ChoiceCardLink too", () => {
    const { container } = render(
      <ChoiceCardLink href="/a" title="Link A" badge="New" />
    );
    const badge = container.querySelector('[data-slot="choice-card-badge"]');
    expect(badge).not.toBeNull();
    expect(screen.getByText("New")).toBeInTheDocument();
    expect(badge).toHaveAttribute("data-variant", "secondary");
  });
});

// ─── Badge icon (Figma node 682-15286 update) ─────────────────────────────────

describe("ChoiceCard badge icon", () => {
  it("renders the badge with both icon and label when both are provided", () => {
    const { container } = render(
      <ChoiceCardGroup>
        <ChoiceCard
          value="a"
          title="Option A"
          badge="Open"
          badgeIcon={<svg data-testid="thumbs-up" aria-hidden />}
        />
      </ChoiceCardGroup>
    );
    const badge = container.querySelector('[data-slot="choice-card-badge"]');
    expect(badge).not.toBeNull();
    expect(screen.getByText("Open")).toBeInTheDocument();
    expect(screen.getByTestId("thumbs-up")).toBeInTheDocument();
    expect(badge).toContainElement(screen.getByTestId("thumbs-up"));
  });

  it("renders an icon-only badge when `badge` is omitted but `badgeIcon` is set", () => {
    const { container } = render(
      <ChoiceCardGroup>
        <ChoiceCard
          value="a"
          title="Option A"
          badgeIcon={<svg data-testid="thumbs-up" aria-hidden />}
        />
      </ChoiceCardGroup>
    );
    const badge = container.querySelector('[data-slot="choice-card-badge"]');
    expect(badge).not.toBeNull();
    expect(screen.getByTestId("thumbs-up")).toBeInTheDocument();
    // No label text rendered.
    expect(badge?.textContent).toBe("");
  });

  it("does not render a badge when neither `badge` nor `badgeIcon` is provided", () => {
    const { container } = render(
      <ChoiceCardGroup>
        <ChoiceCard value="a" title="Option A" />
      </ChoiceCardGroup>
    );
    expect(
      container.querySelector('[data-slot="choice-card-badge"]')
    ).toBeNull();
  });

  it("places the icon BEFORE the label in DOM order (acts as iconLeft)", () => {
    const { container } = render(
      <ChoiceCardGroup>
        <ChoiceCard
          value="a"
          title="Option A"
          badge="Open"
          badgeIcon={<svg data-testid="thumbs-up" aria-hidden />}
        />
      </ChoiceCardGroup>
    );
    const badge = container.querySelector('[data-slot="choice-card-badge"]');
    const icon = screen.getByTestId("thumbs-up");
    const label = screen.getByText("Open");
    // The icon should come first, then the label span.
    const children = Array.from(badge?.children ?? []);
    expect(children.indexOf(icon)).toBeLessThan(children.indexOf(label));
  });

  it("propagates `badgeIcon` through ChoiceCardLink too", () => {
    const { container } = render(
      <ChoiceCardLink
        href="/a"
        title="Link A"
        badge="New"
        badgeIcon={<svg data-testid="link-icon" aria-hidden />}
      />
    );
    const badge = container.querySelector('[data-slot="choice-card-badge"]');
    expect(badge).not.toBeNull();
    expect(screen.getByTestId("link-icon")).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("supports an icon-only badge on ChoiceCardLink", () => {
    const { container } = render(
      <ChoiceCardLink
        href="/a"
        title="Link A"
        badgeIcon={<svg data-testid="link-icon" aria-hidden />}
      />
    );
    const badge = container.querySelector('[data-slot="choice-card-badge"]');
    expect(badge).not.toBeNull();
    expect(screen.getByTestId("link-icon")).toBeInTheDocument();
  });
});

// ─── Primary indicator by size ────────────────────────────────────────────────

describe("ChoiceCard primary-selected indicator", () => {
  it("uses lime (bg-accent) on the `sm` size", () => {
    const { container } = render(
      <ChoiceCardGroup defaultValue="a">
        <ChoiceCard value="a" title="A" variant="primary" size="sm" />
      </ChoiceCardGroup>
    );
    const indicator = container.querySelector(
      '[data-slot="choice-card-indicator"]'
    );
    expect(indicator).toHaveAttribute("data-size", "sm");
    expect(indicator).toHaveClass("bg-accent");
    expect(indicator).not.toHaveClass("bg-background");
  });

  it("uses beige (bg-background) on the `md` size", () => {
    const { container } = render(
      <ChoiceCardGroup defaultValue="a">
        <ChoiceCard value="a" title="A" variant="primary" size="md" />
      </ChoiceCardGroup>
    );
    const indicator = container.querySelector(
      '[data-slot="choice-card-indicator"]'
    );
    expect(indicator).toHaveAttribute("data-size", "md");
    expect(indicator).toHaveClass("bg-background");
    expect(indicator).not.toHaveClass("bg-accent");
  });
});

// ─── Compress variant ─────────────────────────────────────────────────────────

function renderCompressGroup(
  props?: Partial<React.ComponentProps<typeof ChoiceCardGroup>>
) {
  return render(
    <ChoiceCardGroup {...props}>
      <ChoiceCard
        value="a"
        variant="compress"
        title="7-Eleven"
        description="3300 N Lamar Blvd"
        icon={<span data-testid="avatar-a">7E</span>}
        distance="0.5 mi"
        status={{ label: "Abierto", tone: "open" }}
        estimatedTime="~2 min."
      />
      <ChoiceCard
        value="b"
        variant="compress"
        title="CVS"
        description="2900 Guadalupe St, Austin"
        icon={<span data-testid="avatar-b">CV</span>}
        distance="0.4 mi"
        status={{ label: "Abierto", tone: "open" }}
        estimatedTime="~2 min."
      />
      <ChoiceCard
        value="c"
        variant="compress"
        title="7-Eleven"
        description="3300 N Lamar Blvd"
        icon={<span data-testid="avatar-c">7E</span>}
        distance="0.5 mi"
        status={{ label: "Cerrado", tone: "closed" }}
        estimatedTime="~2 min."
        disabled
      />
    </ChoiceCardGroup>
  );
}

describe("ChoiceCard — compress variant", () => {
  it("renders the avatar slot", () => {
    renderCompressGroup();
    expect(screen.getByTestId("avatar-a")).toBeInTheDocument();
  });

  it("renders title and address (description)", () => {
    renderCompressGroup();
    expect(screen.getAllByText("7-Eleven")).toHaveLength(2);
    expect(screen.getByText("CVS")).toBeInTheDocument();
    expect(screen.getAllByText("3300 N Lamar Blvd")).toHaveLength(2);
  });

  it("renders distance and ETA text in the footer", () => {
    renderCompressGroup();
    // Two of the three cards use "0.5 mi" (default + disabled).
    expect(screen.getAllByText("0.5 mi")).toHaveLength(2);
    expect(screen.getByText("0.4 mi")).toBeInTheDocument();
    expect(screen.getAllByText("~2 min.")).toHaveLength(3);
  });

  it("renders status pills with the tone reflected via data-tone", () => {
    const { container } = renderCompressGroup();
    const statuses = container.querySelectorAll(
      '[data-slot="choice-card-status"]'
    );
    expect(statuses).toHaveLength(3);
    expect(statuses[0]).toHaveAttribute("data-tone", "open");
    expect(statuses[2]).toHaveAttribute("data-tone", "closed");
  });

  it("applies data-variant='compress' to the radio item", () => {
    renderCompressGroup();
    screen.getAllByRole("radio").forEach((r) => {
      expect(r).toHaveAttribute("data-variant", "compress");
    });
  });

  it("becomes checked when clicked", async () => {
    renderCompressGroup();
    const radio = screen.getByRole("radio", { name: /cvs/i });
    await userEvent.click(radio);
    expect(radio).toBeChecked();
  });

  it("renders the selected indicator only on the active card", () => {
    const { container } = renderCompressGroup({ defaultValue: "b" });
    const indicators = container.querySelectorAll(
      '[data-slot="choice-card-indicator"]'
    );
    // One indicator per card, but only the selected one is opacity-100.
    expect(indicators).toHaveLength(3);
    expect(indicators[1].className).toMatch(/opacity-0/); // base class
  });

  it("disabled compress card is not interactive", async () => {
    const onValueChange = vi.fn();
    renderCompressGroup({ onValueChange });
    const disabled = screen.getAllByRole("radio").at(-1)!;
    expect(disabled).toBeDisabled();
    await userEvent.click(disabled);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("omits the footer separator when no footer fields are provided", () => {
    const { container } = render(
      <ChoiceCardGroup>
        <ChoiceCard
          value="a"
          variant="compress"
          title="7-Eleven"
          description="3300 N Lamar Blvd"
          icon={<span>7E</span>}
        />
      </ChoiceCardGroup>
    );
    expect(
      container.querySelector('[data-slot="choice-card-compress-footer"]')
    ).toBeNull();
    expect(container.querySelector('[data-slot="separator"]')).toBeNull();
  });

  it("renders the footer separator when at least one footer field is set", () => {
    const { container } = render(
      <ChoiceCardGroup>
        <ChoiceCard
          value="a"
          variant="compress"
          title="7-Eleven"
          description="3300 N Lamar Blvd"
          icon={<span>7E</span>}
          estimatedTime="~2 min."
        />
      </ChoiceCardGroup>
    );
    expect(
      container.querySelector('[data-slot="choice-card-compress-footer"]')
    ).not.toBeNull();
    expect(container.querySelector('[data-slot="separator"]')).not.toBeNull();
  });

  it("supports the md size with bigger avatar slot", () => {
    const { container } = render(
      <ChoiceCardGroup>
        <ChoiceCard
          value="a"
          variant="compress"
          size="md"
          title="7-Eleven"
          description="3300 N Lamar Blvd"
          icon={<span>7E</span>}
        />
      </ChoiceCardGroup>
    );
    const avatar = container.querySelector('[data-slot="choice-card-avatar"]');
    expect(avatar).not.toBeNull();
    expect(avatar?.className).toMatch(/size-10/);
  });

  it("uses size-8 avatar on the sm size", () => {
    const { container } = render(
      <ChoiceCardGroup>
        <ChoiceCard
          value="a"
          variant="compress"
          title="7-Eleven"
          description="3300 N Lamar Blvd"
          icon={<span>7E</span>}
        />
      </ChoiceCardGroup>
    );
    const avatar = container.querySelector('[data-slot="choice-card-avatar"]');
    expect(avatar?.className).toMatch(/size-8/);
  });

  it("has no axe violations (compress × sm)", async () => {
    const { container } = renderCompressGroup({ defaultValue: "a" });
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe violations (compress × md)", async () => {
    const { container } = render(
      <ChoiceCardGroup defaultValue="a">
        <ChoiceCard
          value="a"
          variant="compress"
          size="md"
          title="7-Eleven"
          description="3300 N Lamar Blvd"
          icon={<span>7E</span>}
          distance="0.5 mi"
          status={{ label: "Abierto", tone: "open" }}
          estimatedTime="~2 min."
        />
        <ChoiceCard
          value="b"
          variant="compress"
          size="md"
          title="CVS"
          description="2900 Guadalupe St, Austin"
          icon={<span>CV</span>}
          distance="0.4 mi"
          status={{ label: "Cerrado", tone: "closed" }}
          estimatedTime="~2 min."
        />
      </ChoiceCardGroup>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

// ─── Details chip row (Figma node 1033-8355) ─────────────────────────────────

describe("ChoiceCard — details chips", () => {
  it("renders one chip per entry on the white variant", () => {
    const { container } = render(
      <ChoiceCardGroup>
        <ChoiceCard
          value="a"
          title="Option A"
          details={["Faster", "Free", "Insured"]}
        />
      </ChoiceCardGroup>
    );
    const chips = container.querySelectorAll(
      '[data-slot="choice-card-detail"]'
    );
    expect(chips).toHaveLength(3);
    expect(screen.getByText("Faster")).toBeInTheDocument();
    expect(screen.getByText("Free")).toBeInTheDocument();
    expect(screen.getByText("Insured")).toBeInTheDocument();
  });

  it("renders no chip row when details is omitted", () => {
    const { container } = render(
      <ChoiceCardGroup>
        <ChoiceCard value="a" title="Option A" />
      </ChoiceCardGroup>
    );
    expect(
      container.querySelector('[data-slot="choice-card-details"]')
    ).toBeNull();
  });

  it("renders no chip row when details is an empty array", () => {
    const { container } = render(
      <ChoiceCardGroup>
        <ChoiceCard value="a" title="Option A" details={[]} />
      </ChoiceCardGroup>
    );
    expect(
      container.querySelector('[data-slot="choice-card-details"]')
    ).toBeNull();
  });

  it("does not render chips on the primary variant", () => {
    const { container } = render(
      <ChoiceCardGroup>
        <ChoiceCard
          value="a"
          variant="primary"
          title="Option A"
          details={["Faster"]}
        />
      </ChoiceCardGroup>
    );
    expect(
      container.querySelector('[data-slot="choice-card-details"]')
    ).toBeNull();
    expect(screen.queryByText("Faster")).not.toBeInTheDocument();
  });

  it("does not render chips on the compress variant", () => {
    const { container } = render(
      <ChoiceCardGroup>
        <ChoiceCard
          value="a"
          variant="compress"
          title="7-Eleven"
          description="3300 N Lamar Blvd"
          icon={<span>7E</span>}
          details={["Faster"]}
        />
      </ChoiceCardGroup>
    );
    expect(
      container.querySelector('[data-slot="choice-card-details"]')
    ).toBeNull();
    expect(screen.queryByText("Faster")).not.toBeInTheDocument();
  });

  it("propagates through ChoiceCardLink on the white variant", () => {
    const { container } = render(
      <ChoiceCardLink
        href="/x"
        title="Standard"
        details={["Free", "Tracked"]}
      />
    );
    const chips = container.querySelectorAll(
      '[data-slot="choice-card-detail"]'
    );
    expect(chips).toHaveLength(2);
  });

  it("does not render chips on a compress ChoiceCardLink", () => {
    const { container } = render(
      <ChoiceCardLink
        href="/x"
        variant="compress"
        title="7-Eleven"
        description="3300 N Lamar Blvd"
        icon={<span>7E</span>}
        details={["Faster"]}
      />
    );
    expect(
      container.querySelector('[data-slot="choice-card-details"]')
    ).toBeNull();
  });

  it("has no axe violations with details rendered", async () => {
    const { container } = render(
      <ChoiceCardGroup>
        <ChoiceCard
          value="a"
          title="Option A"
          description="Brief description"
          details={["Faster", "Free"]}
        />
      </ChoiceCardGroup>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

// ─── Delete option (Figma node 1033-8355) ────────────────────────────────────

describe("ChoiceCard — onDelete", () => {
  it("renders a delete button when onDelete is provided on white", () => {
    const { container } = render(
      <ChoiceCardGroup>
        <ChoiceCard value="a" title="Saved card" onDelete={() => {}} />
      </ChoiceCardGroup>
    );
    expect(
      container.querySelector('[data-slot="choice-card-delete"]')
    ).not.toBeNull();
  });

  it("does not render a delete button when onDelete is omitted", () => {
    const { container } = render(
      <ChoiceCardGroup>
        <ChoiceCard value="a" title="Saved card" />
      </ChoiceCardGroup>
    );
    expect(
      container.querySelector('[data-slot="choice-card-delete"]')
    ).toBeNull();
  });

  it("does not render a delete button on the primary variant", () => {
    const { container } = render(
      <ChoiceCardGroup>
        <ChoiceCard
          value="a"
          variant="primary"
          title="Option A"
          onDelete={() => {}}
        />
      </ChoiceCardGroup>
    );
    expect(
      container.querySelector('[data-slot="choice-card-delete"]')
    ).toBeNull();
  });

  it("does not render a delete button on the compress variant", () => {
    const { container } = render(
      <ChoiceCardGroup>
        <ChoiceCard
          value="a"
          variant="compress"
          title="7-Eleven"
          description="3300 N Lamar Blvd"
          icon={<span>7E</span>}
          onDelete={() => {}}
        />
      </ChoiceCardGroup>
    );
    expect(
      container.querySelector('[data-slot="choice-card-delete"]')
    ).toBeNull();
  });

  it("does not render a delete button when the card is disabled", () => {
    const { container } = render(
      <ChoiceCardGroup>
        <ChoiceCard value="a" title="Saved card" onDelete={() => {}} disabled />
      </ChoiceCardGroup>
    );
    expect(
      container.querySelector('[data-slot="choice-card-delete"]')
    ).toBeNull();
  });

  it("calls onDelete when the trash button is clicked", async () => {
    const onDelete = vi.fn();
    render(
      <ChoiceCardGroup>
        <ChoiceCard value="a" title="Saved card" onDelete={onDelete} />
      </ChoiceCardGroup>
    );
    const trash = screen.getByRole("button", { name: /delete/i });
    await userEvent.click(trash);
    expect(onDelete).toHaveBeenCalledOnce();
  });

  it("clicking the trash button does not select the radio", async () => {
    const onValueChange = vi.fn();
    render(
      <ChoiceCardGroup onValueChange={onValueChange}>
        <ChoiceCard value="a" title="Saved card" onDelete={() => {}} />
        <ChoiceCard value="b" title="Other" />
      </ChoiceCardGroup>
    );
    const trash = screen.getByRole("button", { name: /delete/i });
    await userEvent.click(trash);
    expect(onValueChange).not.toHaveBeenCalled();
    expect(
      screen.getByRole("radio", { name: /saved card/i })
    ).not.toBeChecked();
  });

  it("uses the deleteLabel prop for the accessible name", () => {
    render(
      <ChoiceCardGroup>
        <ChoiceCard
          value="a"
          title="Saved card"
          onDelete={() => {}}
          deleteLabel="Remove card"
        />
      </ChoiceCardGroup>
    );
    expect(
      screen.getByRole("button", { name: /remove card/i })
    ).toBeInTheDocument();
  });

  it("ChoiceCardLink: keeps the delete button visible when selected", () => {
    const { container, rerender } = render(
      <ChoiceCardLink
        href="/x"
        title="Saved"
        onDelete={() => {}}
        data-testid="link"
      />
    );
    expect(
      container.querySelector('[data-slot="choice-card-delete"]')
    ).not.toBeNull();

    rerender(
      <ChoiceCardLink
        href="/x"
        title="Saved"
        onDelete={() => {}}
        selected
        data-testid="link"
      />
    );
    // The Figma node renders the trash alongside the indicator on
    // selected items so the user can still remove an active row.
    expect(
      container.querySelector('[data-slot="choice-card-delete"]')
    ).not.toBeNull();
    expect(
      container.querySelector('[data-slot="choice-card-indicator"]')
    ).not.toBeNull();
  });

  it("ChoiceCard: keeps the delete button visible after the radio is selected", async () => {
    const onDelete = vi.fn();
    const { container } = render(
      <ChoiceCardGroup>
        <ChoiceCard value="a" title="Saved" onDelete={onDelete} />
      </ChoiceCardGroup>
    );
    const radio = screen.getByRole("radio", { name: /saved/i });
    await userEvent.click(radio);
    expect(radio).toBeChecked();
    // Trash is still in the DOM and clickable after selection.
    const trash = screen.getByRole("button", { name: /delete/i });
    expect(trash).toBeInTheDocument();
    await userEvent.click(trash);
    expect(onDelete).toHaveBeenCalledOnce();
    expect(
      container.querySelector('[data-slot="choice-card-indicator"]')
    ).not.toBeNull();
  });

  it("ChoiceCardLink: clicking the trash does not navigate", async () => {
    const onClick = vi.fn();
    const onDelete = vi.fn();
    render(
      <ChoiceCardLink
        href="#nav"
        title="Saved"
        onClick={onClick}
        onDelete={onDelete}
      />
    );
    const trash = screen.getByRole("button", { name: /delete/i });
    await userEvent.click(trash);
    expect(onDelete).toHaveBeenCalledOnce();
    expect(onClick).not.toHaveBeenCalled();
  });

  it("has no axe violations with the delete button rendered", async () => {
    const { container } = render(
      <ChoiceCardGroup>
        <ChoiceCard
          value="a"
          title="Saved card"
          description="Visa •••• 4242"
          onDelete={() => {}}
        />
      </ChoiceCardGroup>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

// ─── White selected halo (Figma node 1033-8355) ──────────────────────────────

describe("ChoiceCard — white selected halo", () => {
  it("applies a turquoise glow shadow when selected on the white variant", () => {
    render(
      <ChoiceCardGroup defaultValue="a">
        <ChoiceCard value="a" title="A" />
      </ChoiceCardGroup>
    );
    const radio = screen.getByRole("radio", { name: /a/i });
    expect(radio).toHaveAttribute("data-state", "checked");
    // The halo class is keyed off `data-[state=checked]`; assert the
    // `shadow-selection` token utility is in the className list
    // (Tailwind compiles it to the 6px rgba turquoise shadow defined
    // in tokens.ts → theme.css).
    expect(radio.className).toMatch(/shadow-selection/);
  });

  it("does not apply the halo when the card is unselected", () => {
    render(
      <ChoiceCardGroup>
        <ChoiceCard value="a" title="A" />
      </ChoiceCardGroup>
    );
    const radio = screen.getByRole("radio", { name: /a/i });
    expect(radio).toHaveAttribute("data-state", "unchecked");
  });

  it("suppresses the halo when both selected and disabled", () => {
    render(
      <ChoiceCardGroup defaultValue="a">
        <ChoiceCard value="a" title="A" disabled />
      </ChoiceCardGroup>
    );
    const radio = screen.getByRole("radio", { name: /a/i });
    // Suppression is implemented via the
    // `[&[data-disabled][data-state=checked]]:shadow-none` utility.
    expect(radio.className).toMatch(
      /\[&\[data-disabled\]\[data-state=checked\]\]:shadow-none/
    );
  });
});
