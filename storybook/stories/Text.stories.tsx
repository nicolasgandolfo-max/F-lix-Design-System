import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@felix/ui";

/**
 * A single component covering the full Felix typography scale.
 * Every variant maps directly to a theme token — no arbitrary sizes needed.
 *
 * Each variant has a semantic default HTML tag (`heading-2` → `<h2>`, `body` → `<p>`, etc.).
 * Override it with the `as` prop when the visual style and semantic role differ.
 */
const meta = {
  title: "Components/Atoms/Text",
  component: Text,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description:
        "Typography scale — each maps to a design token (size, weight, line height).",
      control: { type: "select" },
      options: [
        "display-xl",
        "display-lg",
        "display-md",
        "heading-1",
        "heading-2",
        "heading-3",
        "heading-4",
        "body-lg",
        "body",
        "body-sm",
        "caption",
      ],
      table: {
        defaultValue: { summary: "body" },
        type: { summary: "enum" },
      },
    },
    as: {
      description:
        "Override the rendered element when semantics should differ from the default for this variant (e.g. `heading-3` as `h2`).",
      control: "text",
      table: { type: { summary: "ElementType" } },
    },
    children: {
      description: "Text or inline content",
      control: "text",
      table: { type: { summary: "ReactNode" } },
    },
    className: {
      description: "Additional utility classes",
      control: "text",
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Full scale — all variants from display to caption.
 */
export const Scale: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-1">
        <Text variant="caption" className="text-muted-foreground">
          Display
        </Text>
        <Text variant="display-xl">Display XL · 4.5rem</Text>
        <Text variant="display-lg">Display LG · 3.75rem</Text>
        <Text variant="display-md">Display MD · 3rem</Text>
      </div>

      <div className="space-y-1">
        <Text variant="caption" className="text-muted-foreground">
          Headings
        </Text>
        <Text variant="heading-1">Heading 1 · 2.25rem</Text>
        <Text variant="heading-2">Heading 2 · 1.875rem</Text>
        <Text variant="heading-3">Heading 3 · 1.5rem</Text>
        <Text variant="heading-4">Heading 4 · 1.25rem</Text>
      </div>

      <div className="space-y-1">
        <Text variant="caption" className="text-muted-foreground">
          Body
        </Text>
        <Text variant="body-lg">
          Body Large · 1.125rem — Supporting text or introductions.
        </Text>
        <Text variant="body">
          Body · 1rem — Main content, descriptions, and UI copy.
        </Text>
        <Text variant="body-sm">
          Body Small · 0.875rem — Secondary information and metadata.
        </Text>
      </div>

      <div>
        <Text variant="caption" className="text-muted-foreground">
          Caption
        </Text>
        <Text variant="caption" as="p">
          Caption · 0.75rem — Labels, footnotes, and helper text.
        </Text>
      </div>
    </div>
  ),
};

/**
 * Single variant — use the controls to explore.
 */
export const Default: Story = {
  args: {
    variant: "heading-1",
    children: "Send money instantly",
  },
};

/**
 * `as` prop — override the HTML tag without changing the visual style.
 * Here `heading-3` renders as an `<h2>` for correct document outline.
 */
export const SemanticOverride: Story = {
  render: () => (
    <div className="space-y-2">
      <Text variant="caption" className="text-muted-foreground">
        Both look like heading-3 but render different tags ↓
      </Text>
      <Text variant="heading-3">Default → renders as h3</Text>
      <Text variant="heading-3" as="h2">
        Override → renders as h2
      </Text>
    </div>
  ),
};

/**
 * Real-world composition — a typical marketing hero block.
 */
export const HeroExample: Story = {
  render: () => (
    <div className="max-w-xl space-y-4">
      <Text variant="display-md" className="text-(--slate)">
        Banking built for real life
      </Text>
      <Text variant="body-lg" className="text-(--mocha)">
        Send money, build credit, and manage your finances — all in one place,
        with no hidden fees.
      </Text>
      <Text variant="caption" className="text-(--mocha)">
        Available in the US · FDIC insured · No credit check required
      </Text>
    </div>
  ),
};
