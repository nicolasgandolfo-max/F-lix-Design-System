import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarFallback, AvatarImage } from "@felix/ui";
import { User } from "@phosphor-icons/react";

/**
 * **Avatar** — A circular user portrait with a graceful fallback chain:
 * **Photo → Initials → Icon**.
 *
 * The default API is a single component that takes `src`, `initials`, and
 * (optionally) a custom `icon`. Radix automatically falls back through the
 * chain if the image fails to load (or no `src` is provided), and a Phosphor
 * `User` icon is used when no `initials` are passed.
 *
 * ```tsx
 * <Avatar src="/jane.jpg" alt="Jane" initials="JD" />
 * <Avatar initials="JD" />
 * <Avatar /> // → User icon
 * ```
 *
 * For advanced layouts, you can still compose `<AvatarImage>` and
 * `<AvatarFallback>` as children — when children are provided they take
 * precedence over the smart props.
 *
 * Sizes: `xs` (24), `sm` (32), `md` (40, default), `lg` (48), `xl` (64).
 *
 * The optional `status` prop renders a coloured dot in the bottom-right
 * corner — useful for online/offline/away/busy presence indicators.
 */
const meta = {
  title: "Components/Atoms/Avatar",
  component: Avatar,
  subcomponents: {
    AvatarImage: AvatarImage as React.ComponentType<unknown>,
    AvatarFallback: AvatarFallback as React.ComponentType<unknown>,
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Pass `src` / `initials` to `<Avatar>` and the fallback chain (Photo → Initials → Icon) is wired up automatically. `<AvatarImage>` and `<AvatarFallback>` are exported as escape hatches for custom layouts.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    src: {
      description: "Photo URL. Falls back to initials or icon if it fails.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    alt: {
      description: "Alt text for the photo (required when `src` is provided).",
      control: "text",
      table: { type: { summary: "string" } },
    },
    initials: {
      description:
        "Initials shown when no photo is available. If omitted, the icon fallback is used.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    size: {
      description: "Diameter of the avatar circle.",
      control: { type: "radio" },
      options: ["xs", "sm", "md", "lg", "xl"],
      table: {
        defaultValue: { summary: "md" },
        type: { summary: '"xs" | "sm" | "md" | "lg" | "xl"' },
      },
    },
    status: {
      description:
        "Optional status badge in the bottom-right corner. Omit to hide the badge.",
      control: { type: "radio" },
      options: [undefined, "success", "warning", "danger", "neutral"],
      table: {
        type: {
          summary: '"success" | "warning" | "danger" | "neutral" | undefined',
        },
      },
    },
    statusLabel: {
      description:
        "Custom accessible label for the status badge (e.g. `Online`). Defaults to the value of `status`.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    icon: { control: false, table: { disable: true } },
    children: { control: false, table: { disable: true } },
  },
  args: {
    size: "md",
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

const PHOTO_URL =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop";

// ─── Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { size: "md", initials: "JD" },
};

// ─── Sizes ──────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="xs" initials="JD" />
      <Avatar size="sm" initials="JD" />
      <Avatar size="md" initials="JD" />
      <Avatar size="lg" initials="JD" />
      <Avatar size="xl" initials="JD" />
    </div>
  ),
};

// ─── Types (Photo / Initials / Icon) ────────────────────────────────────────

/**
 * The same `<Avatar>` component handles all three types — just change the
 * props you pass.
 */
export const Types: Story = {
  render: () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    return (
      <div className="grid grid-cols-3 items-center gap-x-10 gap-y-6">
        <p className="text-muted-foreground text-xxs">Initials</p>
        <p className="text-muted-foreground text-xxs">Icon</p>
        <p className="text-muted-foreground text-xxs">Photo</p>
        {sizes.map((size) => (
          <div key={size} className="contents">
            <Avatar size={size} initials="JD" />
            <Avatar size={size} />
            <Avatar size={size} src={PHOTO_URL} alt="Jane Doe" initials="JD" />
          </div>
        ))}
      </div>
    );
  },
};

// ─── With image ─────────────────────────────────────────────────────────────

export const WithImage: Story = {
  args: { size: "lg", src: PHOTO_URL, alt: "Jane Doe", initials: "JD" },
};

// ─── Broken image (auto-fallback) ───────────────────────────────────────────

/**
 * If the image URL fails to load, the avatar automatically falls back to the
 * initials (or icon if no initials are provided). No extra error handling
 * required.
 */
export const BrokenImage: Story = {
  args: {
    size: "lg",
    src: "https://broken.invalid/image.jpg",
    alt: "Jane Doe",
    initials: "JD",
  },
};

// ─── Icon fallback ──────────────────────────────────────────────────────────

/**
 * Pass nothing — or only `src` without `initials` — and you get the default
 * Phosphor `User` icon as the fallback.
 */
export const IconFallback: Story = {
  args: { size: "lg" },
};

// ─── Custom icon ────────────────────────────────────────────────────────────

/**
 * Override the default icon with any React node via the `icon` prop.
 */
export const CustomIcon: Story = {
  args: { size: "lg" },
  render: (args) => <Avatar {...args} icon={<User weight="bold" />} />,
};

// ─── With status ────────────────────────────────────────────────────────────

export const WithStatus: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <Avatar size="lg" initials="JD" status="success" statusLabel="Online" />
      <Avatar size="lg" initials="JD" status="warning" statusLabel="Away" />
      <Avatar size="lg" initials="JD" status="danger" statusLabel="Busy" />
      <Avatar size="lg" initials="JD" status="neutral" statusLabel="Offline" />
    </div>
  ),
};

// ─── Status across sizes ────────────────────────────────────────────────────

export const StatusSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="xs" initials="JD" status="success" />
      <Avatar size="sm" initials="JD" status="success" />
      <Avatar size="md" initials="JD" status="success" />
      <Avatar size="lg" initials="JD" status="success" />
      <Avatar size="xl" initials="JD" status="success" />
    </div>
  ),
};

// ─── Compound API (escape hatch) ────────────────────────────────────────────

/**
 * For advanced layouts you can still compose `<AvatarImage>` and
 * `<AvatarFallback>` directly. When children are passed, the smart props
 * (`src`, `initials`, `icon`) are ignored.
 */
export const CompoundAPI: Story = {
  render: () => (
    <Avatar size="lg">
      <AvatarImage src={PHOTO_URL} alt="Jane Doe" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

// ─── Figma showcase ─────────────────────────────────────────────────────────

/**
 * Pixel-faithful recreation of the Figma frame **Avatar** (node `346:201`):
 * a soft white card with a heading, subtitle, divider, and a 3-column grid
 * showing each size in all three types.
 */
export const FigmaShowcase: Story = {
  parameters: { layout: "centered" },
  render: () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    return (
      <div className="bg-background w-100 rounded-2xl p-12 shadow-lg">
        <h3 className="text-foreground text-xl font-semibold">Avatar</h3>
        <p className="text-muted-foreground mt-1 text-sm">
          5 sizes · 3 types · all tokens bound to DS Felix
        </p>
        <div className="bg-border my-4 h-px w-full" />
        <div className="border-border/60 mt-6 grid grid-cols-3 items-center gap-y-7 rounded-xl border border-dashed p-6">
          {sizes.map((size) => (
            <div key={size} className="contents">
              <div className="flex justify-center">
                <Avatar size={size} initials="A" status="success" />
              </div>
              <div className="flex justify-center">
                <Avatar size={size} status="success" />
              </div>
              <div className="flex justify-center">
                <Avatar
                  size={size}
                  src={PHOTO_URL}
                  alt="Jane"
                  initials="JD"
                  status="success"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
