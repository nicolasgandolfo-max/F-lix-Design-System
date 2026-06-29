import type { Meta, StoryObj } from "@storybook/react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@felix/ui";

/**
 * **Card** — A content container with a title, subtitle, body, and optional
 * footer. Composed via sub-components (`CardHeader`, `CardTitle`,
 * `CardDescription`, `CardContent`, `CardFooter`).
 *
 * Three variants matching Figma node `515:36`:
 *
 * - **default** — soft white background, 1 px border, no shadow
 * - **elevated** — same as default plus `shadow-lg`
 * - **ghost** — transparent, no border (use inside other surfaces)
 *
 * The Figma design shows a divider between the header and the body — that is
 * intentionally **not** baked into the Card. Add a divider explicitly when
 * you need one (a `Separator` atom or a thin `<div className="h-px bg-border" />`).
 */
const meta = {
  title: "Components/Molecules/Card",
  component: Card,
  subcomponents: {
    CardHeader: CardHeader as React.ComponentType<unknown>,
    CardTitle: CardTitle as React.ComponentType<unknown>,
    CardDescription: CardDescription as React.ComponentType<unknown>,
    CardContent: CardContent as React.ComponentType<unknown>,
    CardFooter: CardFooter as React.ComponentType<unknown>,
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Compose `<Card>` with `<CardHeader>` (containing `<CardTitle>` + `<CardDescription>`), `<CardContent>`, and an optional `<CardFooter>`. Pick the visual treatment via the `variant` prop.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "Visual treatment of the card surface.",
      control: { type: "radio" },
      options: ["default", "elevated", "ghost"],
      table: {
        defaultValue: { summary: "default" },
        type: { summary: '"default" | "elevated" | "ghost"' },
      },
    },
    children: { control: false, table: { disable: true } },
  },
  args: {
    variant: "default",
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

// A small reusable divider that mirrors the Felix `border` token. Replace
// with the `Separator` atom once both PRs are merged.
const Divider = () => <div aria-hidden="true" className="h-px w-full bg-border" />;

// ─── Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card subtitle text goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        This is the card content area. Use it to display any relevant
        information or actions.
      </CardContent>
    </Card>
  ),
};

// ─── Variants ───────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      {(["default", "elevated", "ghost"] as const).map((variant) => (
        <Card key={variant} variant={variant} className="w-64">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card subtitle text goes here.</CardDescription>
          </CardHeader>
          <CardContent>
            This is the card content area. Use it to display any relevant
            information or actions.
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};

// ─── With separator (Figma "with divider" pattern) ──────────────────────────

/**
 * The Figma design shows a thin divider between the header and the body.
 * Drop in a `Separator` atom — or any thin `<div className="h-px bg-border"/>` —
 * between the sections.
 */
export const WithSeparator: Story = {
  render: () => (
    <Card variant="elevated" className="max-w-sm">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card subtitle text goes here.</CardDescription>
      </CardHeader>
      <Divider />
      <CardContent>
        This is the card content area. Use it to display any relevant
        information or actions.
      </CardContent>
    </Card>
  ),
};

// ─── With footer ────────────────────────────────────────────────────────────

export const WithFooter: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Confirm payment</CardTitle>
        <CardDescription>
          You are about to send $250.00 to Maria Lopez.
        </CardDescription>
      </CardHeader>
      <CardContent>
        Once confirmed, the transfer cannot be reverted from this screen.
      </CardContent>
      <CardFooter className="justify-end">
        <Button variant="ghost">Cancel</Button>
        <Button>Confirm</Button>
      </CardFooter>
    </Card>
  ),
};

// ─── Minimal (content only) ─────────────────────────────────────────────────

export const Minimal: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardContent>
        Just a plain content card — no header, no footer.
      </CardContent>
    </Card>
  ),
};

// ─── Interactive (full assembly) ────────────────────────────────────────────

export const Interactive: Story = {
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <CardHeader>
        <CardTitle>Account verification</CardTitle>
        <CardDescription>
          We need a few more details to confirm your identity.
        </CardDescription>
      </CardHeader>
      <Divider />
      <CardContent>
        Once verified, you will be able to send and receive payments without
        limits.
      </CardContent>
      <CardFooter className="justify-end">
        <Button variant="ghost">Later</Button>
        <Button>Continue</Button>
      </CardFooter>
    </Card>
  ),
};

// ─── Figma showcase ─────────────────────────────────────────────────────────

/**
 * Pixel-faithful recreation of the Figma frame **Card · Showcase** (node
 * `515:36`): a soft white card with a heading, subtitle, divider, and a
 * column of the three Card variants — each rendered with the same content.
 */
export const FigmaShowcase: Story = {
  parameters: { layout: "centered" },
  render: () => (
    <div className="bg-background w-127 rounded-2xl p-8 shadow-lg">
      <h3 className="text-foreground text-xl font-semibold">Card</h3>
      <p className="text-muted-foreground mt-1 text-sm">
        Content container with title, subtitle and body.
      </p>
      <Divider />
      <div className="mt-6 grid grid-cols-[80px_1fr] items-start gap-x-6 gap-y-8">
        {(["default", "elevated", "ghost"] as const).map((variant) => (
          <div key={variant} className="contents">
            <span className="text-muted-foreground pt-4 text-right text-xs capitalize">
              {variant}
            </span>
            <Card variant={variant} className="w-64">
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card subtitle text goes here.</CardDescription>
              </CardHeader>
              <Divider />
              <CardContent>
                This is the card content area. Use it to display any relevant
                information or actions.
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  ),
};
