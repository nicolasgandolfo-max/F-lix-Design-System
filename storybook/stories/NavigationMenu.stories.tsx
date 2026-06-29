import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Logo,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@felix/ui";

/**
 * **NavigationMenu** — a horizontal navigation surface with optional dropdown
 * panels. Built on `@radix-ui/react-navigation-menu` and adapted to the Felix
 * Figma spec (Navigation Menu showcase, node `973:2828`).
 *
 * **Composition**
 *
 * - `NavigationMenu` — the root container. Renders the built-in
 *   `Viewport` for dropdown panels by default; pass `viewport={false}` for
 *   link-only navbars.
 * - `NavigationMenuList` — flex row of items with 8 px spacing.
 * - `NavigationMenuItem` — wraps a single trigger or link.
 * - `NavigationMenuTrigger` — `Products`-style item with a built-in 18 px
 *   chevron that rotates on open.
 * - `NavigationMenuContent` — the dropdown panel rendered inside the
 *   `Viewport`.
 * - `NavigationMenuLink` — a plain link. Pass `active` (or `aria-current`)
 *   to apply the Figma "selected" pill (`bg-primary`).
 *
 * **States** (per Figma)
 * - **Default** — `text-foreground`, transparent background.
 * - **Hover / Open** — `bg-accent`.
 * - **Active** — `bg-primary` + `text-accent-foreground`.
 * - **Disabled** — `text-(--neutral-300)` + `pointer-events-none`.
 */
const meta = {
  title: "Components/Molecules/NavigationMenu",
  component: NavigationMenu,
  subcomponents: {
    NavigationMenuList: NavigationMenuList as React.ComponentType<unknown>,
    NavigationMenuItem: NavigationMenuItem as React.ComponentType<unknown>,
    NavigationMenuTrigger:
      NavigationMenuTrigger as React.ComponentType<unknown>,
    NavigationMenuContent:
      NavigationMenuContent as React.ComponentType<unknown>,
    NavigationMenuLink: NavigationMenuLink as React.ComponentType<unknown>,
  },
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    viewport: {
      description:
        "Whether to render the built-in Viewport for dropdown content panels.",
      control: { type: "boolean" },
      table: { defaultValue: { summary: "true" } },
    },
    defaultValue: {
      description: "Uncontrolled value of the open menu (Radix prop).",
      control: { type: "text" },
    },
    value: {
      description: "Controlled value of the open menu (Radix prop).",
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[240px] gap-1 p-2">
              <li>
                <NavigationMenuLink href="#payments">Payments</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#payouts">Payouts</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#cards">Cards</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[240px] gap-1 p-2">
              <li>
                <NavigationMenuLink href="#smb">For SMBs</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#enterprise">
                  For Enterprise
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

// ─── WithActiveLink ──────────────────────────────────────────────────────────

export const WithActiveLink: Story = {
  render: () => (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#products" active>
            Products
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#docs">Docs</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#pricing">Pricing</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use the `active` prop on `NavigationMenuLink` (or `aria-current=\"page\"`) to render the selected pill (`bg-primary`).",
      },
    },
  },
};

// ─── Disabled ────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#docs">Docs</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger disabled>Coming soon</NavigationMenuTrigger>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

// ─── AsHorizontalBar ─────────────────────────────────────────────────────────

/**
 * The full assembled bar from Figma node `956:47` — 640 px pill with the Felix
 * logotype on the left and the navigation items aligned to the right. The
 * outer pill (border, rounded-xl, padding) is a consumer-owned wrapper so
 * apps stay flexible; the navigation primitives provide the inner surface.
 */
export const AsHorizontalBar: Story = {
  render: () => (
    <div
      className="
        flex w-[640px] items-center justify-between
        rounded-xl border border-border bg-background
        px-4 py-3
      "
    >
      <Logo type="logotype" className="h-7 w-auto" />
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-1 p-2">
                <li>
                  <NavigationMenuLink href="#a">Payments</NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="#b">Cards</NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-1 p-2">
                <li>
                  <NavigationMenuLink href="#smb">SMBs</NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="#ent">Enterprise</NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
};

// ─── DarkMode ────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <div className="dark rounded-md bg-background p-6">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#docs" active>
              Docs
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[220px] gap-1 p-2">
                <li>
                  <NavigationMenuLink href="#a">Payments</NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="#b">Cards</NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#about">About</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
};
