import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@felix/ui";
import {
  CircleIcon,
  ArrowUpRightIcon,
  ThumbsUpIcon,
} from "@phosphor-icons/react";

/**
 * **Badge / Chip** — Small inline labels used to surface status, categories,
 * or metadata at a glance.
 *
 * Two dimensions control appearance:
 * - **`variant`** — colour intent (Default, Secondary, Destructive, Outline, Ghost, Link, Dark)
 * - **`size`** — scale (`sm` 11 px / `md` 12 px default / `lg` 14 px text)
 * - **`shape`** — container shape (`badge` = pill, `chip` = rounded square)
 *
 * Both `iconLeft` and `iconRight` are optional ReactNode slots.
 */
const meta = {
  title: "Components/Atoms/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description:
        "Colour intent. `default` uses the primary brand colour (turquoise), `secondary` uses the accent lime, `destructive` surfaces errors with an orange tint, `outline` is the lowest-weight option, `ghost` uses the muted surface, `link` renders inline with primary text colour, and `dark` is a high-contrast inverted pill (bg-foreground / text-background) that auto-inverts in dark mode.",
      control: { type: "select" },
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
        "dark",
      ],
      table: {
        defaultValue: { summary: "default" },
        type: { summary: "enum" },
      },
    },
    size: {
      description:
        "Vertical scale per Figma. `sm` (11 px text, 8 px icons), `md` (12 px text, 8 px icons — default), `lg` (14 px text, 12 px icons, larger padding).",
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      table: {
        defaultValue: { summary: "md" },
        type: { summary: '"sm" | "md" | "lg"' },
      },
    },
    shape: {
      description:
        "Container shape. `badge` is a fully rounded pill; `chip` has a subtle corner radius for a more compact, tag-like feel.",
      control: { type: "radio" },
      options: ["badge", "chip"],
      table: {
        defaultValue: { summary: "badge" },
        type: { summary: '"badge" | "chip"' },
      },
    },
    iconLeft: {
      description: "Icon rendered before the label. Accepts any ReactNode.",
      control: false,
      table: { type: { summary: "ReactNode" } },
    },
    iconRight: {
      description: "Icon rendered after the label. Accepts any ReactNode.",
      control: false,
      table: { type: { summary: "ReactNode" } },
    },
    children: {
      description: "Badge label text.",
      control: "text",
      table: { type: { summary: "ReactNode" } },
    },
    className: {
      description: "Merged with internal styles via `cn()`.",
      control: "text",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ──────────────────────────────────────────────────────────────────

/**
 * Primary brand badge using the turquoise colour.
 */
export const Default: Story = {
  args: { children: "Label", variant: "default", shape: "badge" },
};

// ─── Variants ─────────────────────────────────────────────────────────────────

/**
 * All colour variants — pill shape (Figma source of truth).
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Badge
          variant="default"
          iconLeft={<CircleIcon />}
          iconRight={<ArrowUpRightIcon />}
        >
          Label
        </Badge>
        <Badge
          variant="secondary"
          iconLeft={<CircleIcon />}
          iconRight={<ArrowUpRightIcon />}
        >
          Label
        </Badge>
        <Badge
          variant="destructive"
          iconLeft={<CircleIcon />}
          iconRight={<ArrowUpRightIcon />}
        >
          Label
        </Badge>
        <Badge
          variant="outline"
          iconLeft={<CircleIcon />}
          iconRight={<ArrowUpRightIcon />}
        >
          Label
        </Badge>
        <Badge
          variant="ghost"
          iconLeft={<CircleIcon />}
          iconRight={<ArrowUpRightIcon />}
        >
          Label
        </Badge>
        <Badge
          variant="link"
          iconLeft={<CircleIcon />}
          iconRight={<ArrowUpRightIcon />}
        >
          Label
        </Badge>
        <Badge
          variant="dark"
          iconLeft={<CircleIcon />}
          iconRight={<ArrowUpRightIcon />}
        >
          Label
        </Badge>
      </div>
    </div>
  ),
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

/**
 * Three sizes per Figma: `sm` (11 px text, 8 px icons), `md` (12 px text,
 * 8 px icons — default), `lg` (14 px text, 12 px icons).
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(
        [
          "default",
          "secondary",
          "destructive",
          "outline",
          "ghost",
          "link",
          "dark",
        ] as const
      ).map((variant) => (
        <div key={variant} className="flex items-center gap-6">
          <span className="w-24 text-right text-[9px] font-medium uppercase tracking-widest text-muted-foreground">
            {variant}
          </span>
          <div className="flex flex-wrap items-center gap-4">
            <Badge
              variant={variant}
              size="sm"
              iconLeft={<CircleIcon />}
              iconRight={<ArrowUpRightIcon />}
            >
              SM
            </Badge>
            <Badge
              variant={variant}
              size="md"
              iconLeft={<CircleIcon />}
              iconRight={<ArrowUpRightIcon />}
            >
              MD
            </Badge>
            <Badge
              variant={variant}
              size="lg"
              iconLeft={<CircleIcon />}
              iconRight={<ArrowUpRightIcon />}
            >
              LG
            </Badge>
          </div>
        </div>
      ))}
    </div>
  ),
};

// ─── Shapes ───────────────────────────────────────────────────────────────────

/**
 * `badge` (pill) vs `chip` (rounded square) — side by side across all variants.
 * Mirrors the Badge/Chip showcase from Figma.
 */
export const Shapes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(
        [
          "default",
          "secondary",
          "destructive",
          "outline",
          "ghost",
          "link",
          "dark",
        ] as const
      ).map((variant) => (
        <div key={variant} className="flex items-center gap-6">
          <span className="w-24 text-right text-[9px] font-medium uppercase tracking-widest text-muted-foreground">
            {variant}
          </span>
          <div className="flex items-center gap-3">
            <Badge
              variant={variant}
              shape="badge"
              iconLeft={<CircleIcon />}
              iconRight={<ArrowUpRightIcon />}
            >
              Label
            </Badge>
            <Badge
              variant={variant}
              shape="chip"
              iconLeft={<CircleIcon />}
              iconRight={<ArrowUpRightIcon />}
            >
              Label
            </Badge>
          </div>
        </div>
      ))}
    </div>
  ),
};

// ─── Icons ────────────────────────────────────────────────────────────────────

/**
 * Badges with only a left icon, only a right icon, and both.
 */
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="default" iconLeft={<CircleIcon />}>
          Left icon
        </Badge>
        <Badge variant="secondary" iconRight={<ArrowUpRightIcon />}>
          Right icon
        </Badge>
        <Badge
          variant="destructive"
          iconLeft={<CircleIcon />}
          iconRight={<ArrowUpRightIcon />}
        >
          Both icons
        </Badge>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Badge
          variant="outline"
          iconLeft={<CircleIcon />}
          iconRight={<ArrowUpRightIcon />}
        >
          Outline
        </Badge>
        <Badge
          variant="ghost"
          iconLeft={<CircleIcon />}
          iconRight={<ArrowUpRightIcon />}
        >
          Ghost
        </Badge>
        <Badge
          variant="link"
          iconLeft={<CircleIcon />}
          iconRight={<ArrowUpRightIcon />}
        >
          Link
        </Badge>
        <Badge
          variant="dark"
          iconLeft={<CircleIcon />}
          iconRight={<ArrowUpRightIcon />}
        >
          Dark
        </Badge>
      </div>
    </div>
  ),
};

// ─── Icon Only ────────────────────────────────────────────────────────────────

/**
 * **Icon-only pill** — pass `iconLeft` (or `iconRight`) without `children`
 * to render a compact promo/status mark. No empty inner label span is
 * rendered, so the pill collapses cleanly to icon + horizontal padding.
 * `size="md"` (default) keeps an 18 px floor that matches Figma node
 * 682-15286 (the lime thumbs-up tag on the white ChoiceCard variant);
 * `lg` scales icons up to 12 px, `sm` is the most compact.
 *
 * Useful for things like a "recommended" thumbs-up, a status dot, or
 * any glyph-only mark where text would be redundant.
 */
export const IconOnly: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-[11px] font-semibold text-secondary uppercase tracking-wide mb-2">
          Across variants
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="default" iconLeft={<ThumbsUpIcon />} aria-label="Liked" />
          <Badge
            variant="secondary"
            iconLeft={<ThumbsUpIcon />}
            aria-label="Recommended"
          />
          <Badge
            variant="destructive"
            iconLeft={<CircleIcon />}
            aria-label="Alert"
          />
          <Badge variant="outline" iconLeft={<CircleIcon />} aria-label="Tag" />
          <Badge variant="ghost" iconLeft={<CircleIcon />} aria-label="Tag" />
          <Badge variant="link" iconLeft={<CircleIcon />} aria-label="Tag" />
          <Badge variant="dark" iconLeft={<CircleIcon />} aria-label="Tag" />
        </div>
      </div>

      <div>
        <p className="text-[11px] font-semibold text-secondary uppercase tracking-wide mb-2">
          Side-by-side with text variants (proportions match)
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="secondary" iconLeft={<ThumbsUpIcon />} aria-label="Recommended" />
          <Badge variant="secondary" iconLeft={<ThumbsUpIcon />}>
            Recommended
          </Badge>
          <Badge variant="secondary">Recommended</Badge>
        </div>
      </div>

      <div>
        <p className="text-[11px] font-semibold text-secondary uppercase tracking-wide mb-2">
          Both shapes (pill vs chip)
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Badge
            variant="secondary"
            shape="badge"
            iconLeft={<ThumbsUpIcon />}
            aria-label="Recommended"
          />
          <Badge
            variant="secondary"
            shape="chip"
            iconLeft={<ThumbsUpIcon />}
            aria-label="Recommended"
          />
        </div>
      </div>
    </div>
  ),
};

// ─── No Icons ─────────────────────────────────────────────────────────────────

/**
 * Label-only badges — no icons on either side.
 */
export const LabelOnly: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
      <Badge variant="dark">Dark</Badge>
    </div>
  ),
};

// ─── Overflow / Truncation ────────────────────────────────────────────────────

/**
 * When a badge is placed inside a narrow container it clips overflowing text
 * with an ellipsis. The badge itself stays on one line — no wrapping, no
 * layout shift. Resize the canvas to see the effect at different widths.
 */
export const Overflow: Story = {
  parameters: { mobileFrame: false },
  render: () => (
    <div className="flex flex-col gap-6">
      {(
        [
          "default",
          "secondary",
          "destructive",
          "outline",
          "ghost",
          "link",
          "dark",
        ] as const
      ).map((variant) => (
        <div key={variant} className="flex items-center gap-4">
          <span className="w-24 shrink-0 text-right text-[9px] font-medium uppercase tracking-widest text-muted-foreground">
            {variant}
          </span>
          <div className="flex items-center gap-6">
            {/* Narrow container — label clips with ellipsis */}
            <div className="w-40 border border-dashed border-border rounded p-1">
              <Badge
                variant={variant}
                shape="badge"
                iconLeft={<CircleIcon />}
                iconRight={<ArrowUpRightIcon />}
              >
                This is a really long badge label
              </Badge>
            </div>
            {/* Unconstrained — label fits, no clipping */}
            <Badge variant={variant} shape="badge">
              Short label
            </Badge>
          </div>
        </div>
      ))}
    </div>
  ),
};

// ─── Dark Mode ────────────────────────────────────────────────────────────────

/**
 * Dark mode — toggle the theme in the Storybook toolbar.
 */
export const DarkMode: Story = {
  parameters: { backgrounds: { default: "dark" } },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="flex flex-col gap-6 rounded-xl bg-background p-8">
      {(
        [
          "default",
          "secondary",
          "destructive",
          "outline",
          "ghost",
          "link",
          "dark",
        ] as const
      ).map((variant) => (
        <div key={variant} className="flex items-center gap-6">
          <span className="w-24 text-right text-[9px] font-medium uppercase tracking-widest text-muted-foreground">
            {variant}
          </span>
          <div className="flex items-center gap-3">
            <Badge
              variant={variant}
              shape="badge"
              iconLeft={<CircleIcon />}
              iconRight={<ArrowUpRightIcon />}
            >
              Label
            </Badge>
            <Badge
              variant={variant}
              shape="chip"
              iconLeft={<CircleIcon />}
              iconRight={<ArrowUpRightIcon />}
            >
              Label
            </Badge>
          </div>
        </div>
      ))}
    </div>
  ),
};
