import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, it, expect, vi } from "vitest";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu";

function BasicMenu({
  defaultOpen,
  open,
  onOpenChange,
  contentClassName,
  onSelectFirst,
  side,
  align,
  sideOffset,
}: {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (next: boolean) => void;
  contentClassName?: string;
  onSelectFirst?: (event: Event) => void;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}) {
  return (
    <DropdownMenu
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
    >
      <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
      <DropdownMenuContent
        className={contentClassName}
        side={side}
        align={align}
        sideOffset={sideOffset}
      >
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={onSelectFirst}>Profile</DropdownMenuItem>
          <DropdownMenuItem inset>Settings</DropdownMenuItem>
          <DropdownMenuItem variant="danger">Delete</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

describe("DropdownMenu", () => {
  it("does not render content until trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<BasicMenu />);

    expect(
      document.querySelector('[data-slot="dropdown-menu-content"]')
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(await screen.findByRole("menu")).toBeInTheDocument();
  });

  it("opens when defaultOpen is true", async () => {
    render(<BasicMenu defaultOpen />);
    expect(await screen.findByRole("menu")).toBeInTheDocument();
  });

  it("closes when Escape is pressed", async () => {
    const user = userEvent.setup();
    render(<BasicMenu defaultOpen />);

    await screen.findByRole("menu");

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  it("fires onSelect when an item is activated and closes the menu", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<BasicMenu defaultOpen onSelectFirst={onSelect} />);

    await screen.findByRole("menu");
    await user.click(screen.getByRole("menuitem", { name: "Profile" }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  it("sets data-variant on items", async () => {
    render(<BasicMenu defaultOpen />);
    await screen.findByRole("menu");

    const profile = screen.getByRole("menuitem", { name: "Profile" });
    const danger = screen.getByRole("menuitem", { name: "Delete" });

    expect(profile).toHaveAttribute("data-variant", "default");
    expect(danger).toHaveAttribute("data-variant", "danger");
  });

  it("sets data-inset only when inset is true", async () => {
    render(<BasicMenu defaultOpen />);
    await screen.findByRole("menu");

    const profile = screen.getByRole("menuitem", { name: "Profile" });
    const settings = screen.getByRole("menuitem", { name: "Settings" });

    expect(profile).not.toHaveAttribute("data-inset");
    expect(settings).toHaveAttribute("data-inset", "");
  });

  it("renders a separator between sections", async () => {
    render(<BasicMenu defaultOpen />);
    await screen.findByRole("menu");
    expect(
      document.querySelector('[data-slot="dropdown-menu-separator"]')
    ).toBeInTheDocument();
  });

  it.each(["top", "right", "bottom", "left"] as const)(
    "propagates side=%s to data-side",
    async (side) => {
      render(<BasicMenu defaultOpen side={side} />);
      await screen.findByRole("menu");
      const content = document.querySelector(
        '[data-slot="dropdown-menu-content"]'
      );
      expect(content).toHaveAttribute("data-side", side);
    }
  );

  it.each(["start", "center", "end"] as const)(
    "propagates align=%s to data-align",
    async (align) => {
      render(<BasicMenu defaultOpen align={align} />);
      await screen.findByRole("menu");
      const content = document.querySelector(
        '[data-slot="dropdown-menu-content"]'
      );
      expect(content).toHaveAttribute("data-align", align);
    }
  );

  it("forwards sideOffset to the underlying primitive", async () => {
    render(<BasicMenu defaultOpen sideOffset={20} />);
    await screen.findByRole("menu");
    expect(
      document.querySelector('[data-slot="dropdown-menu-content"]')
    ).toBeInTheDocument();
  });

  it("merges custom className onto content", async () => {
    render(<BasicMenu defaultOpen contentClassName="custom-content" />);
    await screen.findByRole("menu");
    const content = document.querySelector(
      '[data-slot="dropdown-menu-content"]'
    );
    expect(content).toHaveClass("custom-content");
    expect(content).toHaveClass("bg-popover");
  });

  it("supports controlled mode with open + onOpenChange", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    function Controlled() {
      const [open, setOpen] = React.useState(false);
      return (
        <DropdownMenu
          open={open}
          onOpenChange={(next) => {
            onOpenChange(next);
            setOpen(next);
          }}
        >
          <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>One</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    render(<Controlled />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));

    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(await screen.findByRole("menu")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  it("supports DropdownMenuCheckboxItem with onCheckedChange", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();

    function CheckboxMenu() {
      const [checked, setChecked] = React.useState(false);
      return (
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem
              checked={checked}
              onCheckedChange={(next) => {
                onCheckedChange(next);
                setChecked(next);
              }}
            >
              Show panel
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    render(<CheckboxMenu />);
    const item = await screen.findByRole("menuitemcheckbox", {
      name: "Show panel",
    });
    expect(item).toHaveAttribute("aria-checked", "false");

    await user.click(item);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("supports DropdownMenuRadioGroup with onValueChange", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    function RadioMenu() {
      const [value, setValue] = React.useState("a");
      return (
        <DropdownMenu defaultOpen>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup
              value={value}
              onValueChange={(next) => {
                onValueChange(next);
                setValue(next);
              }}
            >
              <DropdownMenuRadioItem value="a">A</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="b">B</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    render(<RadioMenu />);
    const items = await screen.findAllByRole("menuitemradio");
    expect(items[0]).toHaveAttribute("aria-checked", "true");
    expect(items[1]).toHaveAttribute("aria-checked", "false");

    await user.click(items[1]);
    expect(onValueChange).toHaveBeenCalledWith("b");
  });

  it("renders a submenu via DropdownMenuSub", async () => {
    const user = userEvent.setup();

    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Nested item</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = await screen.findByRole("menuitem", { name: /More/ });
    expect(trigger).toHaveAttribute("data-slot", "dropdown-menu-sub-trigger");

    await user.click(trigger);
    await waitFor(() => {
      expect(
        document.querySelector('[data-slot="dropdown-menu-sub-content"]')
      ).toBeInTheDocument();
    });
  });

  it("sets data-inset on DropdownMenuLabel and DropdownMenuSubTrigger when inset is true", async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel inset>Inset label</DropdownMenuLabel>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger inset>Inset sub</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Nested</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await screen.findByRole("menu");
    expect(
      document.querySelector('[data-slot="dropdown-menu-label"]')
    ).toHaveAttribute("data-inset", "");
    expect(
      document.querySelector('[data-slot="dropdown-menu-sub-trigger"]')
    ).toHaveAttribute("data-inset", "");
  });

  it("renders content through DropdownMenuPortal explicitly", async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuPortal>
          <div data-testid="portal-child">portaled content</div>
        </DropdownMenuPortal>
      </DropdownMenu>
    );

    expect(await screen.findByTestId("portal-child")).toBeInTheDocument();
  });

  it("renders DropdownMenuShortcut as a span with the slot", async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            Cut
            <DropdownMenuShortcut>⌘X</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await screen.findByRole("menu");
    const shortcut = document.querySelector(
      '[data-slot="dropdown-menu-shortcut"]'
    );
    expect(shortcut).toBeInTheDocument();
    expect(shortcut?.tagName).toBe("SPAN");
    expect(shortcut?.textContent).toBe("⌘X");
  });

  it("renders the separator with inner padding by default and supports edge-to-edge bleed via inset={false}", async () => {
    const { rerender } = render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Label</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>One</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await screen.findByRole("menu");

    const padded = document.querySelector(
      '[data-slot="dropdown-menu-separator"]'
    );
    expect(padded).not.toBeNull();
    expect(padded).toHaveAttribute("data-inset", "");
    expect(padded?.className).not.toMatch(/-mx-1/);

    rerender(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Label</DropdownMenuLabel>
          <DropdownMenuSeparator inset={false} />
          <DropdownMenuItem>One</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await screen.findByRole("menu");

    const flush = document.querySelector(
      '[data-slot="dropdown-menu-separator"]'
    );
    expect(flush).not.toBeNull();
    expect(flush).not.toHaveAttribute("data-inset");
    expect(flush?.className).toMatch(/-mx-1/);
  });

  it("sets data-slot on all rendered parts", async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Label</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>Item</DropdownMenuItem>
            <DropdownMenuCheckboxItem checked>Box</DropdownMenuCheckboxItem>
            <DropdownMenuRadioGroup value="x">
              <DropdownMenuRadioItem value="x">Radio</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Has shortcut
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await screen.findByRole("menu");

    const slots = [
      "dropdown-menu-trigger",
      "dropdown-menu-content",
      "dropdown-menu-label",
      "dropdown-menu-group",
      "dropdown-menu-item",
      "dropdown-menu-checkbox-item",
      "dropdown-menu-radio-group",
      "dropdown-menu-radio-item",
      "dropdown-menu-separator",
      "dropdown-menu-shortcut",
    ];

    for (const slot of slots) {
      expect(document.querySelector(`[data-slot="${slot}"]`)).not.toBeNull();
    }
  });

  it("merges custom className on every part", async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger className="custom-trigger">
          Open
        </DropdownMenuTrigger>
        <DropdownMenuContent className="custom-content">
          <DropdownMenuLabel className="custom-label">Lbl</DropdownMenuLabel>
          <DropdownMenuGroup className="custom-group">
            <DropdownMenuItem className="custom-item">Item</DropdownMenuItem>
            <DropdownMenuCheckboxItem className="custom-checkbox" checked>
              Box
            </DropdownMenuCheckboxItem>
            <DropdownMenuRadioGroup className="custom-radio-group" value="x">
              <DropdownMenuRadioItem className="custom-radio-item" value="x">
                Radio
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="custom-separator" />
          <DropdownMenuItem>
            Tail
            <DropdownMenuShortcut className="custom-shortcut">
              ⌘K
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await screen.findByRole("menu");

    const expectations: Array<[string, string]> = [
      ["dropdown-menu-trigger", "custom-trigger"],
      ["dropdown-menu-content", "custom-content"],
      ["dropdown-menu-label", "custom-label"],
      ["dropdown-menu-group", "custom-group"],
      ["dropdown-menu-item", "custom-item"],
      ["dropdown-menu-checkbox-item", "custom-checkbox"],
      ["dropdown-menu-radio-group", "custom-radio-group"],
      ["dropdown-menu-radio-item", "custom-radio-item"],
      ["dropdown-menu-separator", "custom-separator"],
      ["dropdown-menu-shortcut", "custom-shortcut"],
    ];

    for (const [slot, klass] of expectations) {
      expect(
        document.querySelector(`[data-slot="${slot}"]`)?.className
      ).toContain(klass);
    }
  });

  it("has no axe violations when closed", async () => {
    const { container } = render(<BasicMenu />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no axe violations when open", async () => {
    const { container } = render(<BasicMenu defaultOpen />);
    await screen.findByRole("menu");
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
