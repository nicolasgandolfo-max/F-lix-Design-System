import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, IconButton, SidebarFooter } from "@felix/ui";
import { DotsThreeIcon, UserIcon } from "@phosphor-icons/react";

/**
 * **SidebarFooter** — the user/account row anchored at the bottom of a
 * `Sidebar`. Composes an `Avatar` (or any leading slot) with a name + email
 * block. Maps to Figma `Molecule/SidebarFooter` (node `996:5538`).
 */
const meta = {
  title: "Components/Molecules/SidebarFooter",
  component: SidebarFooter,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    name: {
      description: "Primary line — display name.",
      control: "text",
    },
    email: {
      description: "Optional secondary line — email or handle.",
      control: "text",
    },
  },
  args: {
    name: "Felix User",
    email: "user@felixpago.com",
  },
} satisfies Meta<typeof SidebarFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => (
    <div className="w-[260px]">
      <SidebarFooter
        {...args}
        avatar={<Avatar size="sm" initials="F" status="success" />}
      />
    </div>
  ),
};

// ─── WithoutEmail ────────────────────────────────────────────────────────────

export const WithoutEmail: Story = {
  args: { email: undefined },
  render: (args) => (
    <div className="w-[260px]">
      <SidebarFooter
        {...args}
        avatar={<Avatar size="sm" initials="F" status="success" />}
      />
    </div>
  ),
};

// ─── IconAvatar ──────────────────────────────────────────────────────────────

export const IconAvatar: Story = {
  render: (args) => (
    <div className="w-[260px]">
      <SidebarFooter
        {...args}
        avatar={<Avatar size="sm" icon={<UserIcon weight="fill" />} />}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "When the user has no photo or initials, fall through to the icon variant of `Avatar`.",
      },
    },
  },
};

// ─── WithTrailing ────────────────────────────────────────────────────────────

export const WithTrailing: Story = {
  render: (args) => (
    <div className="w-[260px]">
      <SidebarFooter
        {...args}
        avatar={<Avatar size="sm" initials="F" status="success" />}
        trailing={
          <IconButton
            variant="ghost"
            size="sm"
            aria-label="Account menu"
            icon={<DotsThreeIcon weight="bold" />}
          />
        }
      />
    </div>
  ),
};

// ─── DarkMode ────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: (args) => (
    <div className="dark w-[280px] bg-background p-2">
      <SidebarFooter
        {...args}
        avatar={<Avatar size="sm" initials="F" status="success" />}
      />
    </div>
  ),
};

// ─── LongEmailTruncates ──────────────────────────────────────────────────────

export const LongEmailTruncates: Story = {
  args: {
    name: "Felix Pago",
    email: "very.long.address.for.an.example@subdomain.felixpago.com",
  },
  render: (args) => (
    <div className="w-[220px]">
      <SidebarFooter
        {...args}
        avatar={<Avatar size="sm" initials="F" status="success" />}
      />
    </div>
  ),
};
