import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Avatar,
  Logo,
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarNavItem,
  SidebarSection,
} from "@felix/ui";
import {
  ChartBarIcon,
  CircleIcon,
  CreditCardIcon,
  GearIcon,
  HouseIcon,
  UsersIcon,
} from "@phosphor-icons/react";

/**
 * **Sidebar** — a vertical navigation surface for app shells. Maps to Figma
 * `Organism/Sidebar` (node `996:5539`).
 *
 * **Composition**
 *
 * - `Sidebar` — the framed `<aside>` container. Pass `as="nav"` for a raw
 *   nav landmark, or wrap with your own.
 * - `SidebarHeader` — top region with a bottom border. Drop a `Logo` here.
 * - `SidebarBody` — scrollable middle region containing one or more
 *   `SidebarSection`s.
 * - `SidebarSection` — labelled (or unlabelled) group of nav items.
 * - `SidebarSectionTitle` — small muted heading; used by `SidebarSection`
 *   when you pass `title`. Also exported for custom layouts.
 * - `SidebarNavItem` — the nav link. Renders as `<a>` by default, supports
 *   `as="button"` for non-navigating actions, and `asChild` for routing
 *   integrations (`next/link`, etc.).
 * - `SidebarFooter` — re-use the `Molecules/SidebarFooter` row at the bottom.
 *
 * **NavItem states**
 *
 * - **Default** — `text-foreground`, transparent.
 * - **Hover** — `bg-accent`.
 * - **Active** — `aria-current="page"` → `bg-primary` + `text-accent-foreground`.
 * - **Disabled** — `aria-disabled="true"` → `text-(--neutral-300)` + no
 *   pointer events.
 */
const meta = {
  title: "Components/Organisms/Sidebar",
  component: Sidebar,
  subcomponents: {
    SidebarHeader: SidebarHeader as React.ComponentType<unknown>,
    SidebarBody: SidebarBody as React.ComponentType<unknown>,
    SidebarSection: SidebarSection as React.ComponentType<unknown>,
    SidebarNavItem: SidebarNavItem as React.ComponentType<unknown>,
    SidebarFooter: SidebarFooter as React.ComponentType<unknown>,
  },
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    as: {
      description: "Underlying element. Defaults to `aside`.",
      control: { type: "inline-radio" },
      options: ["aside", "nav", "div"],
    },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <Sidebar className="h-[480px] w-[220px]">
      <SidebarHeader>
        <Logo type="logotype" className="h-7 w-auto" />
      </SidebarHeader>
      <SidebarBody>
        <SidebarSection title="Section">
          <SidebarNavItem
            href="#nav"
            icon={<CircleIcon weight="regular" />}
            active
          >
            Nav item
          </SidebarNavItem>
        </SidebarSection>
      </SidebarBody>
    </Sidebar>
  ),
};

// ─── States ──────────────────────────────────────────────────────────────────

/**
 * Default / Hover / Active / Disabled — the four `SidebarNavItem` states
 * from the Figma "Nav Item" symbol (node `956:20`).
 */
export const States: Story = {
  render: () => (
    <Sidebar className="w-[260px]">
      <SidebarBody>
        <SidebarSection>
          <SidebarNavItem href="#a" icon={<CircleIcon weight="regular" />}>
            Default
          </SidebarNavItem>
          <SidebarNavItem
            href="#b"
            icon={<CircleIcon weight="regular" />}
            className="bg-interactive-ghost-hover"
          >
            Hover (forced)
          </SidebarNavItem>
          <SidebarNavItem
            href="#c"
            icon={<CircleIcon weight="regular" />}
            active
          >
            Active
          </SidebarNavItem>
          <SidebarNavItem
            href="#d"
            icon={<CircleIcon weight="regular" />}
            disabled
          >
            Disabled
          </SidebarNavItem>
        </SidebarSection>
      </SidebarBody>
    </Sidebar>
  ),
};

// ─── WithMultipleSections ────────────────────────────────────────────────────

export const WithMultipleSections: Story = {
  render: () => (
    <Sidebar className="h-[520px] w-[240px]">
      <SidebarHeader>
        <Logo type="logotype" className="h-7 w-auto" />
      </SidebarHeader>
      <SidebarBody>
        <SidebarSection title="Workspace">
          <SidebarNavItem href="#dash" icon={<HouseIcon weight="regular" />}>
            Dashboard
          </SidebarNavItem>
          <SidebarNavItem
            href="#payments"
            icon={<CreditCardIcon weight="regular" />}
            active
          >
            Payments
          </SidebarNavItem>
          <SidebarNavItem
            href="#analytics"
            icon={<ChartBarIcon weight="regular" />}
          >
            Analytics
          </SidebarNavItem>
        </SidebarSection>
        <SidebarSection title="Team">
          <SidebarNavItem href="#users" icon={<UsersIcon weight="regular" />}>
            Members
          </SidebarNavItem>
          <SidebarNavItem
            href="#settings"
            icon={<GearIcon weight="regular" />}
            disabled
          >
            Settings
          </SidebarNavItem>
        </SidebarSection>
      </SidebarBody>
    </Sidebar>
  ),
};

// ─── FullExample ─────────────────────────────────────────────────────────────

/**
 * Reproduces the full Figma showcase (node `996:5539`) — header logo, a
 * single labelled section with one active nav item, and the
 * `SidebarFooter` molecule at the bottom.
 */
export const FullExample: Story = {
  render: () => (
    <Sidebar className="h-[480px] w-[220px]">
      <SidebarHeader>
        <Logo type="logotype" className="h-7 w-auto" />
      </SidebarHeader>
      <SidebarBody>
        <SidebarSection title="Section">
          <SidebarNavItem
            href="#nav"
            icon={<CircleIcon weight="regular" />}
            active
          >
            Nav item
          </SidebarNavItem>
        </SidebarSection>
      </SidebarBody>
      <SidebarFooter
        name="Felix User"
        email="user@felixpago.com"
        avatar={<Avatar size="sm" initials="F" status="success" />}
      />
    </Sidebar>
  ),
};

// ─── DarkMode ────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <div className="dark p-4">
      <Sidebar className="h-[480px] w-[220px]">
        <SidebarHeader>
          <Logo type="logotype" className="h-7 w-auto" />
        </SidebarHeader>
        <SidebarBody>
          <SidebarSection title="Section">
            <SidebarNavItem
              href="#dash"
              icon={<HouseIcon weight="regular" />}
              active
            >
              Dashboard
            </SidebarNavItem>
            <SidebarNavItem
              href="#payments"
              icon={<CreditCardIcon weight="regular" />}
            >
              Payments
            </SidebarNavItem>
          </SidebarSection>
        </SidebarBody>
        <SidebarFooter
          name="Felix User"
          email="user@felixpago.com"
          avatar={<Avatar size="sm" initials="F" status="success" />}
        />
      </Sidebar>
    </div>
  ),
};
